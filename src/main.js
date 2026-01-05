// Music Oracle - Main Application
// Orchestrates the entire user flow

import * as SpotifyAuth from "./auth/spotify-auth.js";
import * as SpotifyClient from "./api/spotify-client.js";
import * as MusicAnalyzer from "./engines/music-analyzer.js";
import * as HzEstimator from "./engines/hz-estimator.js";
import * as VeniceClient from "./api/venice-client.js";

// New modules
import { SpotifySearch } from "./modules/spotify-search.js";
import { esotericAnalysis } from "./engines/esoteric-analyzer.js";
import { AIOracle } from "./services/ai-oracle.js";

// ========== STATE ==========
let currentAnalysis = null;
let currentAIInsights = null;
let currentFrequency = null;
let currentTrack = null; // For manual selection flow

// ========== VIEW MANAGEMENT ==========
function showView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.add("hidden");
  });
  document.getElementById(viewId).classList.remove("hidden");
}

function updateProgressText(text) {
  document.getElementById("progress-text").textContent = text;
}

// ========== SPOTIFY FLOW ==========
// ========== SPOTIFY FLOW ==========
async function handleSpotifyConnect() {
  try {
    await SpotifyAuth.initiateSpotifyAuth();
  } catch (error) {
    console.error("Spotify auth error:", error);
    alert("Error conectando con Spotify. Verifica tu configuración.");
  }
}

// Manual Track Selection Handler
async function handleTrackSelection(track) {
  showView("loading-view");
  updateProgressText(`Analizando "${track.name}"...`);

  try {
    // 1. Get Audio Features
    const audioFeatures = await SpotifySearch.fetchAudioFeatures(track.id);

    // 2. Perform Esoteric Analysis
    const analysis = esotericAnalysis(track, audioFeatures);
    currentAnalysis = analysis;
    currentTrack = track;

    // 3. Get AI Interpretation
    updateProgressText("Consultando al Oráculo...");
    const aiInsights = await AIOracle.interpretEsotericAnalysis(analysis);
    currentAIInsights = aiInsights;

    // 4. Render Results
    renderEsotericResults(analysis, aiInsights);
  } catch (error) {
    console.error("Analysis failed:", error);
    alert("Error al analizar la canción. Intenta de nuevo.");
    showView("landing-view");
  }
}

async function processSpotifyData() {
  const accessToken = SpotifyAuth.getAccessToken();

  if (!accessToken) return;

  // We are authenticated.
  // Stay on landing to allow Manual Search OR Profile Analysis.
  showView("landing-view");

  // Enable search
  const searchInput = document.getElementById("song-search");
  searchInput.placeholder = "Token listo! Busca una canción...";

  // Initialize Search Module
  SpotifySearch.init(handleTrackSelection);
}

// ========== RESULTS DISPLAY ==========
function displayResults() {
  // Set title
  document.getElementById("profile-title").textContent =
    currentAIInsights.title;

  // Build stats grid
  const statsGrid = document.getElementById("stats-grid");
  statsGrid.innerHTML = `
    <div class="stat-card">
      <div class="stat-icon">${currentAnalysis.element.icon}</div>
      <div class="stat-label">Elemento</div>
      <div class="stat-value">${currentAnalysis.element.name}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">📡</div>
      <div class="stat-label">Frecuencia</div>
      <div class="stat-value">${currentFrequency.sacred.frequency} Hz</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">⚡</div>
      <div class="stat-label">Energía</div>
      <div class="stat-value">${(
        currentAnalysis.avgFeatures.energy * 100
      ).toFixed(0)}%</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">💜</div>
      <div class="stat-label">Valencia</div>
      <div class="stat-value">${(
        currentAnalysis.avgFeatures.valence * 100
      ).toFixed(0)}%</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">🎹</div>
      <div class="stat-label">Tonalidad</div>
      <div class="stat-value">${currentAnalysis.dominantKey.fullName}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">🎵</div>
      <div class="stat-label">Tempo</div>
      <div class="stat-value">${currentAnalysis.avgFeatures.tempo} BPM</div>
    </div>
  `;

  // Build insights text
  const insightsDiv = document.getElementById("insights");
  insightsDiv.innerHTML = `
    <h3 style="margin-bottom: var(--space-md); color: var(--color-text);">
      ${currentAnalysis.element.description}
    </h3>
    
    <p style="margin-bottom: var(--space-md); font-size: 1.05rem; line-height: 1.8;">
      ${currentAIInsights.interpretation}
    </p>
    
    <div style="background: hsla(var(--hue-primary), 70%, 60%, 0.1); 
                padding: var(--space-md); 
                border-radius: var(--radius-md); 
                border-left: 3px solid var(--color-primary);
                margin-top: var(--space-lg);">
      <strong style="color: var(--color-primary);">📬 Consejo Evolutivo:</strong><br>
      ${currentAIInsights.advice}
    </div>
    
    <div style="margin-top: var(--space-lg); padding-top: var(--space-lg); border-top: 1px solid var(--glass-border);">
      <h4 style="margin-bottom: var(--space-sm); color: var(--color-text-dim); font-size: 0.875rem;">
        TU FRECUENCIA DEL ALMA: ${currentFrequency.sacred.frequency} Hz
      </h4>
      <p style="font-size: 0.95rem; color: var(--color-text-dim);">
        ${currentFrequency.interpretation}
      </p>
    </div>
    
    <div style="margin-top: var(--space-md); font-size: 0.875rem; color: var(--color-text-dim);">
      <strong>Top Géneros:</strong> ${
        currentAnalysis.topGenres.join(", ") || "Diversos"
      }
    </div>
  `;

  showView("results-view");
}

// ========== THEME MANAGEMENT ==========
function initTheme() {
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  icon.textContent = theme === "dark" ? "☀️" : "🌙";
}

// ========== IMAGE UPLOAD ==========
let uploadedImageData = null;

function handleImageUpload(file) {
  if (!file || !file.type.startsWith("image/")) {
    alert("Por favor sube una imagen válida");
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    uploadedImageData = e.target.result;

    // Show preview
    const preview = document.getElementById("preview-image");
    const container = document.getElementById("preview-container");

    preview.src = uploadedImageData;
    container.classList.add("visible");
  };

  reader.readAsDataURL(file);
}

function removeImage() {
  uploadedImageData = null;
  document.getElementById("preview-container").classList.remove("visible");
  document.getElementById("file-input").value = "";
}

async function analyzeImageWithGoogle() {
  if (!uploadedImageData) {
    alert("Por favor sube una imagen primero");
    return;
  }

  showView("loading-view");
  updateProgressText("Analizando imagen con Google Vision AI...");

  // TODO: Implement Google Vision API integration
  // For now, show placeholder
  setTimeout(() => {
    alert(
      "Análisis de imagen próximamente! 🔮\n\nEsta función utilizará Google Vision API para analizar la imagen de tu playlist y generar insights visuales."
    );
    showView("landing-view");
  }, 2000);
}

// ========== RENDER ESOTERIC RESULTS ==========
function renderEsotericResults(analysis, insights) {
  // Update Profile Title
  const titles = [
    "El Alquimista Sonoro",
    "El Viajero del Tiempo",
    "El Guardián de la Frecuencia",
    "El Oráculo Rítmico",
  ];
  document.getElementById("profile-title").textContent =
    titles[Math.floor(Math.random() * titles.length)];

  // Stats Grid
  const grid = document.getElementById("stats-grid");
  grid.innerHTML = `
    <div class="stat-card">
      <div class="stat-icon">🔮</div>
      <div class="stat-label">Arcano</div>
      <div class="stat-value" style="font-size: 1rem;">${analysis.esoteric.tarotCard.name}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">🌊</div>
      <div class="stat-label">Elemento</div>
      <div class="stat-value">${analysis.esoteric.element.element}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">🧘</div>
      <div class="stat-label">Chakra</div>
      <div class="stat-value">${analysis.esoteric.chakra.chakra}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">🔢</div>
      <div class="stat-label">Numerología</div>
      <div class="stat-value">${analysis.esoteric.numerology.number}</div>
    </div>
  `;

  // Insights
  const insightsDiv = document.getElementById("insights");
  insightsDiv.innerHTML = `
    <h3 style="margin-bottom: var(--space-md); color: var(--color-primary); display: flex; align-items: center; gap: 0.5rem;">
      <span style="font-size: 1.5rem;">🎵</span> ${analysis.track.name}
    </h3>
    
    <p style="margin-bottom: var(--space-md); font-size: 1.1rem; line-height: 1.6; font-style: italic;">
      "${insights.interpretation}"
    </p>
    
    <div style="background: hsla(var(--hue-primary), 70%, 60%, 0.1); 
                padding: var(--space-md); 
                border-radius: var(--radius-md); 
                border-left: 3px solid var(--color-primary);
                margin-top: var(--space-lg);">
      <strong style="color: var(--color-primary);">✨ Consejo del Oráculo:</strong><br>
      ${insights.advice}
    </div>
    
    <div style="margin-top: var(--space-lg); padding-top: var(--space-md); border-top: 1px solid var(--glass-border); font-size: 0.9rem; color: var(--color-text-dim);">
      Frecuencia Base: <strong>${analysis.esoteric.chakra.frequency} Hz</strong> (${analysis.esoteric.chakra.color}) | ${analysis.technical.tempo} BPM
    </div>
  `;

  showView("results-view");
}

// ========== INITIALIZATION ==========
async function init() {
  let sessionRestored = false;

  // Check for OAuth callback
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("code")) {
    try {
      const handled = await SpotifyAuth.handleCallback();
      if (handled) {
        await processSpotifyData();
        sessionRestored = true;
      }
    } catch (error) {
      console.error("Callback error:", error);
      showView("landing-view");
    }
  }

  // Initialize theme
  initTheme();

  // Check if already authenticated
  if (!sessionRestored && SpotifyAuth.isAuthenticated()) {
    try {
      await processSpotifyData();
      sessionRestored = true;
    } catch (error) {
      console.error("Error restoring session:", error);
      alert("No pudimos restaurar tu sesión de Spotify. Conéctate de nuevo.");
      showView("landing-view");
    }
  }

  // Setup event listeners
  document
    .getElementById("connect-spotify")
    .addEventListener("click", handleSpotifyConnect);

  // Theme toggle
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);

  // Image upload listeners
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("file-input");

  dropzone.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleImageUpload(e.target.files[0]);
    }
  });

  // Drag and drop
  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragover");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragover");

    if (e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  });

  document
    .getElementById("remove-image")
    .addEventListener("click", removeImage);

  document.getElementById("generate-image").addEventListener("click", () => {
    alert("Generación de imágenes próximamente! 📸");
  });

  document.getElementById("analyze-again").addEventListener("click", () => {
    SpotifyAuth.logout();
    location.reload();
  });

  document.getElementById("download-image").addEventListener("click", () => {
    alert("Descarga próximamente! 💾");
  });

  document.getElementById("back-to-results").addEventListener("click", () => {
    showView("results-view");
  });
}

// Start app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
