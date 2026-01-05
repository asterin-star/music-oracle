import { describe, it, expect, beforeEach, vi } from "vitest";
import { SpotifySearch } from "./spotify-search.js";

describe("SpotifySearch.renderResults", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="song-search" />
      <div id="search-results"></div>
    `;
  });

  it("renders track results and triggers selection callback", () => {
    const container = document.getElementById("search-results");
    const callback = vi.fn();
    const track = {
      id: "track-1",
      name: "Mystic Song",
      artists: [{ name: "Oracle" }],
      album: { images: [{ url: "big.jpg" }, {}, { url: "thumb.jpg" }] },
    };

    SpotifySearch.renderResults([track], container, callback);

    const items = container.querySelectorAll(".search-result-item");
    expect(items.length).toBe(1);
    items[0].dispatchEvent(new Event("click", { bubbles: true }));

    expect(callback).toHaveBeenCalledWith(track);
    expect(document.getElementById("song-search").value).toContain(track.name);
  });

  it("shows empty state when no tracks are returned", () => {
    const container = document.getElementById("search-results");

    SpotifySearch.renderResults([], container, vi.fn());

    expect(container.textContent).toContain("No se encontraron canciones");
  });
});
