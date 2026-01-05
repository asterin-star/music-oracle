// Spotify Web API Client
// Wrapper for fetching user's music data

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

/**
 * Make authenticated request to Spotify API
 */
async function spotifyFetch(endpoint, accessToken) {
  const response = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `Spotify API error: ${error.error?.message || response.statusText}`
    );
  }

  return response.json();
}

/**
 * Get user's top tracks
 * @param {string} timeRange - 'short_term' (4 weeks), 'medium_term' (6 months), 'long_term' (years)
 * @param {number} limit - Max 50
 */
export async function getTopTracks(
  accessToken,
  timeRange = "medium_term",
  limit = 50
) {
  const endpoint = `/me/top/tracks?time_range=${timeRange}&limit=${limit}`;
  return spotifyFetch(endpoint, accessToken);
}

/**
 * Get user's top artists
 */
export async function getTopArtists(
  accessToken,
  timeRange = "medium_term",
  limit = 10
) {
  const endpoint = `/me/top/artists?time_range=${timeRange}&limit=${limit}`;
  return spotifyFetch(endpoint, accessToken);
}

/**
 * Get audio features for multiple tracks
 * Returns tempo, key, mode, energy, valence, etc.
 */
export async function getAudioFeatures(accessToken, trackIds) {
  const ids = trackIds.join(",");
  const endpoint = `/audio-features?ids=${ids}`;
  return spotifyFetch(endpoint, accessToken);
}

/**
 * Get detailed audio analysis for a single track
 * Includes segment-level analysis
 */
export async function getTrackAnalysis(accessToken, trackId) {
  const endpoint = `/audio-analysis/${trackId}`;
  return spotifyFetch(endpoint, accessToken);
}

/**
 * Get user's profile
 */
export async function getUserProfile(accessToken) {
  return spotifyFetch("/me", accessToken);
}

/**
 * Batch fetch: top tracks + audio features
 */
export async function getCompleteMusicProfile(accessToken) {
  try {
    // Fetch top tracks
    const topTracksData = await getTopTracks(accessToken, "medium_term", 50);
    const topTracks = topTracksData.items;

    // Extract track IDs
    const trackIds = topTracks.map((track) => track.id);

    // Fetch audio features in batches (max 100 per request, but we have 50)
    const audioFeaturesData = await getAudioFeatures(accessToken, trackIds);

    // Fetch top artists
    const topArtistsData = await getTopArtists(accessToken, "medium_term", 10);

    // Combine data
    return {
      tracks: topTracks,
      audioFeatures: audioFeaturesData.audio_features,
      artists: topArtistsData.items,
    };
  } catch (error) {
    console.error("Error fetching music profile:", error);
    throw error;
  }
}
