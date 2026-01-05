// Music Oracle - Spotify Authentication Module
// Uses PKCE flow (recommended for SPAs)

const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

// Required scopes for music analysis
const SCOPES = [
  "user-top-read", // Top tracks and artists
  "user-read-recently-played", // Recent listening history
].join(" ");

/**
 * Generate random string for PKCE challenge
 */
function generateRandomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

/**
 * Generate SHA256 hash for PKCE
 */
async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", data);
}

/**
 * Base64 URL encode for PKCE
 */
function base64urlencode(hash) {
  const str = String.fromCharCode.apply(null, new Uint8Array(hash));
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Initiate Spotify OAuth flow
 */
export async function initiateSpotifyAuth() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

  if (!clientId) {
    throw new Error("Spotify Client ID not configured");
  }

  // Generate PKCE codes
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64urlencode(hashed);

  // Store verifier for token exchange
  localStorage.setItem("spotify_code_verifier", codeVerifier);

  // Build authorization URL
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: SCOPES,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  // Redirect to Spotify auth
  window.location.href = `${SPOTIFY_AUTH_ENDPOINT}?${params.toString()}`;
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(code) {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const codeVerifier = localStorage.getItem("spotify_code_verifier");

  if (!codeVerifier) {
    throw new Error("Code verifier not found");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error("Failed to exchange code for token");
  }

  const data = await response.json();

  // Store token with expiration
  const expiresAt = Date.now() + data.expires_in * 1000;
  localStorage.setItem("spotify_access_token", data.access_token);
  localStorage.setItem("spotify_token_expires_at", expiresAt.toString());

  if (data.refresh_token) {
    localStorage.setItem("spotify_refresh_token", data.refresh_token);
  }

  // Clean up
  localStorage.removeItem("spotify_code_verifier");

  return data.access_token;
}

/**
 * Get current access token (with auto-refresh if needed)
 */
export function getAccessToken() {
  const token = localStorage.getItem("spotify_access_token");
  const expiresAt = parseInt(
    localStorage.getItem("spotify_token_expires_at") || "0"
  );

  if (!token || Date.now() >= expiresAt) {
    return null;
  }

  return token;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  return !!getAccessToken();
}

/**
 * Logout user
 */
export function logout() {
  localStorage.removeItem("spotify_access_token");
  localStorage.removeItem("spotify_token_expires_at");
  localStorage.removeItem("spotify_refresh_token");
  localStorage.removeItem("spotify_code_verifier");
}

/**
 * Handle OAuth callback
 */
export async function handleCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const error = params.get("error");

  if (error) {
    throw new Error(`Spotify auth error: ${error}`);
  }

  if (code) {
    await exchangeCodeForToken(code);
    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
    return true;
  }

  return false;
}
