/**
 * Spotify Search Module
 * Handles manual song search and selection
 */

import * as SpotifyAuth from "../auth/spotify-auth.js";
import { esotericAnalysis } from "../engines/esoteric-analyzer.js";

export const SpotifySearch = {
  debounceTimer: null,

  init(onTrackSelect) {
    const searchInput = document.getElementById("song-search");
    const resultsContainer = document.getElementById("search-results");

    // Remove existing listeners to prevent duplicates
    const newInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newInput, searchInput);

    // Attach event listener
    newInput.addEventListener("input", (e) => {
      clearTimeout(this.debounceTimer);
      const query = e.target.value.trim();

      if (query.length < 2) {
        resultsContainer.classList.add("hidden");
        resultsContainer.innerHTML = "";
        return;
      }

      this.debounceTimer = setTimeout(() => {
        this.performSearch(query, resultsContainer, onTrackSelect);
      }, 500); // Debounce 500ms
    });

    // Close results on click outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-container")) {
        resultsContainer.classList.add("hidden");
      }
    });
  },

  async performSearch(query, container, callback) {
    const token = SpotifyAuth.getAccessToken();

    if (!token) {
      alert("Por favor conecta con Spotify primero para buscar canciones.");
      return;
    }

    try {
      container.classList.remove("hidden");
      container.innerHTML =
        '<div class="search-result-item" style="justify-content:center;">Buscando...</div>';

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=track&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          SpotifyAuth.logout(); // Token expired
          container.innerHTML =
            '<div class="search-result-item">Sesión expirada. Reconecta Spotify.</div>';
          return;
        }
        throw new Error("Search failed");
      }

      const data = await response.json();
      this.renderResults(data.tracks.items, container, callback);
    } catch (error) {
      console.error("Search error:", error);
      container.innerHTML =
        '<div class="search-result-item">Error al buscar. Intenta de nuevo.</div>';
    }
  },

  renderResults(tracks, container, callback) {
    container.innerHTML = "";

    if (tracks.length === 0) {
      container.innerHTML =
        '<div class="search-result-item">No se encontraron canciones.</div>';
      return;
    }

    tracks.forEach((track) => {
      const el = document.createElement("div");
      el.className = "search-result-item";

      const imgUrl = track.album.images[2]?.url || track.album.images[0]?.url;

      el.innerHTML = `
        <img src="${imgUrl}" class="track-thumb" alt="${track.album.name}">
        <div class="track-info">
          <div class="track-name">${track.name}</div>
          <div class="track-artist">${track.artists
            .map((a) => a.name)
            .join(", ")}</div>
        </div>
      `;

      el.addEventListener("click", () => {
        container.classList.add("hidden");
        document.getElementById(
          "song-search"
        ).value = `${track.name} - ${track.artists[0].name}`;
        callback(track);
      });

      container.appendChild(el);
    });
  },

  async fetchAudioFeatures(trackId) {
    const token = SpotifyAuth.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/audio-features/${trackId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return await response.json();
  },
};
