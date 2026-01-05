// Hz Frequency Estimator
// Estimates fundamental frequencies based on musical key and tempo

/**
 * Base frequencies for each pitch class (in Hz)
 * Using scientific pitch notation (middle C = C4)
 */
const BASE_FREQUENCIES = {
  0: 261.63, // C4
  1: 277.18, // C#4
  2: 293.66, // D4
  3: 311.13, // D#4
  4: 329.63, // E4
  5: 349.23, // F4
  6: 369.99, // F#4
  7: 392.0, // G4
  8: 415.3, // G#4
  9: 440.0, // A4 (concert pitch)
  10: 466.16, // A#4
  11: 493.88, // B4
};

/**
 * Sacred frequencies and their meanings
 */
const SACRED_FREQUENCIES = {
  174: "Fundación y alivio del dolor",
  285: "Influencia energética y sanación tisular",
  396: "Liberación de culpa y miedo",
  417: "Facilitación del cambio",
  432: "Frecuencia natural del universo",
  528: "Transformación y milagros (ADN)",
  639: "Relaciones armoniosas",
  741: "Despertar de la intuición",
  852: "Retorno al orden espiritual",
  963: "Conexión con la consciencia superior",
};

/**
 * Find nearest sacred frequency
 */
function findNearestSacredFrequency(frequency) {
  let nearest = 432;
  let minDiff = Math.abs(frequency - 432);

  Object.keys(SACRED_FREQUENCIES).forEach((sacredFreq) => {
    const freq = parseInt(sacredFreq);
    const diff = Math.abs(frequency - freq);
    if (diff < minDiff) {
      minDiff = diff;
      nearest = freq;
    }
  });

  return {
    frequency: nearest,
    meaning: SACRED_FREQUENCIES[nearest],
    distance: minDiff,
  };
}

/**
 * Estimate soul frequency based on musical key and tempo
 * This is an artistic interpretation, not scientific measurement
 */
export function estimateSoulFrequency(dominantKey, avgTempo) {
  // Get base frequency for the dominant key
  const baseFreq = BASE_FREQUENCIES[dominantKey.key];

  // Adjust based on tempo (faster = higher perceived frequency)
  // Normalize tempo to a multiplier (60-180 BPM typical range)
  const tempoMultiplier = 1 + (avgTempo - 120) / 240;

  // Calculate estimated frequency
  const estimatedFreq = Math.round(baseFreq * tempoMultiplier);

  // Find nearest sacred frequency
  const sacred = findNearestSacredFrequency(estimatedFreq);

  return {
    estimated: estimatedFreq,
    baseNote: dominantKey.keyName,
    sacred: sacred,
    interpretation: generateFrequencyInterpretation(estimatedFreq, sacred),
  };
}

/**
 * Generate mystical interpretation of the frequency
 */
function generateFrequencyInterpretation(freq, sacred) {
  if (sacred.distance < 20) {
    return `Tu frecuencia resuena cerca de ${
      sacred.frequency
    } Hz, conocida por ${sacred.meaning.toLowerCase()}. Esta sincronía revela una conexión natural con estas vibraciones.`;
  } else if (freq < 400) {
    return `Tu frecuencia gravitacional refleja una conexión con las octavas bajas, donde habita la profundidad y la introspección.`;
  } else if (freq > 500) {
    return `Tu frecuencia celestial se eleva hacia el espectro alto, revelando una tendencia hacia la claridad y la iluminación.`;
  } else {
    return `Tu frecuencia del corazón equilibra entre tierra y cielo, una danza perfecta de dualidades.`;
  }
}

/**
 * Get frequency color (visual representation)
 * Maps Hz to hue in HSL color space
 */
export function frequencyToColor(frequency) {
  // Map 200-1000 Hz to 0-360 hue
  const normalizedFreq = Math.max(200, Math.min(1000, frequency));
  const hue = Math.round(((normalizedFreq - 200) / 800) * 360);

  return {
    hsl: `hsl(${hue}, 70%, 60%)`,
    hue: hue,
  };
}
