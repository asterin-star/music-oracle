// Music Analysis Engine
// Processes Spotify audio features into mystical insights

/**
 * Musical key mapping (Pitch Class Notation)
 */
const KEY_MAP = {
  0: "C",
  1: "C#",
  2: "D",
  3: "D#",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "G#",
  9: "A",
  10: "A#",
  11: "B",
};

/**
 * Mode mapping
 */
const MODE_MAP = {
  0: "Minor",
  1: "Major",
};

/**
 * Calculate average of audio features
 */
export function calculateAverageFeatures(audioFeatures) {
  const features = audioFeatures.filter((f) => f !== null);

  if (features.length === 0) {
    return null;
  }

  const sum = features.reduce(
    (acc, feature) => ({
      tempo: acc.tempo + feature.tempo,
      energy: acc.energy + feature.energy,
      valence: acc.valence + feature.valence,
      danceability: acc.danceability + feature.danceability,
      acousticness: acc.acousticness + feature.acousticness,
      instrumentalness: acc.instrumentalness + feature.instrumentalness,
      speechiness: acc.speechiness + feature.speechiness,
      liveness: acc.liveness + feature.liveness,
      loudness: acc.loudness + feature.loudness,
    }),
    {
      tempo: 0,
      energy: 0,
      valence: 0,
      danceability: 0,
      acousticness: 0,
      instrumentalness: 0,
      speechiness: 0,
      liveness: 0,
      loudness: 0,
    }
  );

  const count = features.length;

  return {
    tempo: Math.round(sum.tempo / count),
    energy: (sum.energy / count).toFixed(2),
    valence: (sum.valence / count).toFixed(2),
    danceability: (sum.danceability / count).toFixed(2),
    acousticness: (sum.acousticness / count).toFixed(2),
    instrumentalness: (sum.instrumentalness / count).toFixed(2),
    speechiness: (sum.speechiness / count).toFixed(2),
    liveness: (sum.liveness / count).toFixed(2),
    loudness: (sum.loudness / count).toFixed(1),
  };
}

/**
 * Find dominant musical key
 */
export function findDominantKey(audioFeatures) {
  const features = audioFeatures.filter((f) => f !== null);

  // Count occurrences of each key
  const keyCounts = {};
  features.forEach((feature) => {
    const key = feature.key;
    keyCounts[key] = (keyCounts[key] || 0) + 1;
  });

  // Find most common key
  let dominantKey = 0;
  let maxCount = 0;

  Object.entries(keyCounts).forEach(([key, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantKey = parseInt(key);
    }
  });

  // Find dominant mode for that key
  const keyFeatures = features.filter((f) => f.key === dominantKey);
  const modeSum = keyFeatures.reduce((sum, f) => sum + f.mode, 0);
  const dominantMode = modeSum > keyFeatures.length / 2 ? 1 : 0;

  return {
    key: dominantKey,
    keyName: KEY_MAP[dominantKey],
    mode: dominantMode,
    modeName: MODE_MAP[dominantMode],
    fullName: `${KEY_MAP[dominantKey]} ${MODE_MAP[dominantMode]}`,
  };
}

/**
 * Determine elemental archetype based on energy/valence
 * Inspired by musical temperament theory
 */
export function determineElement(avgEnergy, avgValence) {
  const energy = parseFloat(avgEnergy);
  const valence = parseFloat(avgValence);

  // Quadrant mapping:
  // High Energy + High Valence = Fire (passionate, uplifting)
  // Low Energy + High Valence = Water (calm, positive)
  // High Energy + Low Valence = Air (intense, dramatic)
  // Low Energy + Low Valence = Earth (melancholic, grounded)

  if (energy >= 0.5 && valence >= 0.5) {
    return {
      name: "Fuego",
      icon: "🔥",
      description: "Pasión ardiente y energía vital",
      traits: ["Entusiasta", "Motivador", "Explosivo"],
    };
  } else if (energy < 0.5 && valence >= 0.5) {
    return {
      name: "Agua",
      icon: "💧",
      description: "Fluidez emocional y serenidad",
      traits: ["Calmado", "Reflexivo", "Sanador"],
    };
  } else if (energy >= 0.5 && valence < 0.5) {
    return {
      name: "Aire",
      icon: "🌪️",
      description: "Intensidad mental y transformación",
      traits: ["Dramático", "Intelectual", "Revolucionario"],
    };
  } else {
    return {
      name: "Tierra",
      icon: "🌍",
      description: "Profundidad introspectiva y raíces",
      traits: ["Melancólico", "Filosófico", "Auténtico"],
    };
  }
}

/**
 * Extract top genres from artists
 */
export function extractTopGenres(artists, limit = 3) {
  const genreCounts = {};

  artists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });

  return Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([genre]) => genre);
}

/**
 * Comprehensive music analysis
 */
export function analyzeMusicProfile(musicData) {
  const { tracks, audioFeatures, artists } = musicData;

  const avgFeatures = calculateAverageFeatures(audioFeatures);
  const dominantKey = findDominantKey(audioFeatures);
  const element = determineElement(avgFeatures.energy, avgFeatures.valence);
  const topGenres = extractTopGenres(artists);

  return {
    avgFeatures,
    dominantKey,
    element,
    topGenres,
    topTracks: tracks.slice(0, 10),
    topArtists: artists.slice(0, 5),
  };
}
