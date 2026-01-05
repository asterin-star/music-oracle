// Esoteric Music Analysis Engine
// Implements mystical interpretation of musical characteristics

/**
 * Tarot Major Arcana mapping
 */
const MAJOR_ARCANA = {
  0: { name: 'El Loco', element: 'Air', meaning: 'Inicio del viaje, espontaneidad, fe ciega' },
  1: { name: 'El Mago', element: 'Air', meaning: 'Manifestación, poder de voluntad, recursos' },
  2: { name: 'La Sacerdotisa', element: 'Water', meaning: 'Intuición, misterio, sabiduría oculta' },
  3: { name: 'La Emperatriz', element: 'Earth', meaning: 'Abundancia, fertilidad, belleza' },
  4: { name: 'El Emperador', element: 'Fire', meaning: 'Autoridad, estructura, paternidad' },
  5: { name: 'El Hierofante', element: 'Earth', meaning: 'Tradición, enseñanza, conformidad' },
  6: { name: 'Los Enamorados', element: 'Air', meaning: 'Elección, unión, dualidad' },
  7: { name: 'El Carro', element: 'Water', meaning: 'Voluntad, triunfo, dirección' },
  8: { name: 'La Fuerza', element: 'Fire', meaning: 'Coraje, compasión, control interno' },
  9: { name: 'El Ermitaño', element: 'Earth', meaning: 'Introspección, sabiduría, soledad' },
  10: { name: 'La Rueda de la Fortuna', element: 'Fire', meaning: 'Ciclos, destino, cambio' },
  11: { name: 'La Justicia', element: 'Air', meaning: 'Equilibrio, causa-efecto, verdad' },
  12: { name: 'El Colgado', element: 'Water', meaning: 'Sacrificio, nueva perspectiva, pausa' },
  13: { name: 'La Muerte', element: 'Water', meaning: 'Transformación, final, renacimiento' },
  14: { name: 'La Templanza', element: 'Fire', meaning: 'Moderación, alquimia, paciencia' },
  15: { name: 'El Diablo', element: 'Earth', meaning: 'Atadura, materialismo, sombra' },
  16: { name: 'La Torre', element: 'Fire', meaning: 'Revelación súbita, colapso, liberación' },
  17: { name: 'La Estrella', element: 'Air', meaning: 'Esperanza, inspiración, serenidad' },
  18: { name: 'La Luna', element: 'Water', meaning: 'Ilusión, subconsciente, misterio' },
  19: { name: 'El Sol', element: 'Fire', meaning: 'Alegría, éxito, vitalidad' },
  20: { name: 'El Juicio', element: 'Fire', meaning: 'Renacer, llamado, absolución' },
  21: { name: 'El Mundo', element: 'Earth', meaning: 'Completitud, logro, integración' }
};

/**
 * Musical key to chakra/color mapping
 */
const KEY_TO_CHAKRA = {
  0: { note: 'C', chakra: 'Root', color: 'Rojo', frequency: 256 },
  1: { note: 'C#', chakra: 'Root-Sacral', color: 'Coral', frequency: 271 },
  2: { note: 'D', chakra: 'Sacral', color: 'Naranja', frequency: 288 },
  3: { note: 'D#', chakra: 'Sacral-Solar', color: 'Ámbar', frequency: 305 },
  4: { note: 'E', chakra: 'Solar Plexus', color: 'Amarillo', frequency: 323 },
  5: { note: 'F', chakra: 'Heart', color: 'Verde Claro', frequency: 342 },
  6: { note: 'F#', chakra: 'Heart-Throat', color: 'Turquesa', frequency: 362 },
  7: { note: 'G', chakra: 'Throat', color: 'Azul', frequency: 384 },
  8: { note: 'G#', chakra: 'Throat-Third Eye', color: 'Índigo', frequency: 407 },
  9: { note: 'A', chakra: 'Third Eye', color: 'Violeta', frequency: 432 },
  10: { note: 'A#', chakra: 'Third Eye-Crown', color: 'Púrpura', frequency: 457 },
  11: { note: 'B', chakra: 'Crown', color: 'Blanco', frequency: 484 }
};

/**
 * Determine elemental association from tempo (BPM)
 */
export function tempoToElement(bpm) {
  if (bpm < 90) {
    return {
      element: 'Earth',
      suit: 'Pentáculos',
      quality: 'Grounded, meditative, introspective'
    };
  } else if (bpm < 110) {
    return {
      element: 'Water',
      suit: 'Copas',
      quality: 'Emotional, flowing, reflective'
    };
  } else if (bpm < 130) {
    return {
      element: 'Air',
      suit: 'Espadas',
      quality: 'Mental, balanced, communicative'
    };
  } else {
    return {
      element: 'Fire',
      suit: 'Bastos',
      quality: 'Energetic, passionate, dynamic'
    };
  }
}

/**
 * Map energy and valence to Tarot card
 */
export function mapToTarotCard(energy, valence, tempo) {
  const energyLevel = parseFloat(energy);
  const valenceLevel = parseFloat(valence);
  
  // High energy + High valence = Joyful cards
  if (energyLevel >= 0.7 && valenceLevel >= 0.7) {
    return MAJOR_ARCANA[19]; // El Sol
  }
  
  // Low energy + High valence = Peaceful cards
  if (energyLevel < 0.5 && valenceLevel >= 0.6) {
    return MAJOR_ARCANA[17]; // La Estrella
  }
  
  // High energy + Low valence = Intense cards
  if (energyLevel >= 0.7 && valenceLevel < 0.4) {
    return MAJOR_ARCANA[16]; // La Torre
  }
  
  // Low energy + Low valence = Introspective cards
  if (energyLevel < 0.5 && valenceLevel < 0.4) {
    return MAJOR_ARCANA[9]; // El Ermitaño
  }
  
  // Moderate energy, cyclical feel
  if (tempo >= 100 && tempo <= 120) {
    return MAJOR_ARCANA[10]; // Rueda de la Fortuna
  }
  
  // Balanced
  if (Math.abs(energyLevel - 0.5) < 0.2 && Math.abs(valenceLevel - 0.5) < 0.2) {
    return MAJOR_ARCANA[14]; // La Templanza
  }
  
  // Romantic/Dual
  if (valenceLevel >= 0.5 && valenceLevel < 0.7) {
    return MAJOR_ARCANA[6]; // Los Enamorados
  }
  
  // Mysterious/Deep
  if (energyLevel < 0.6 && valenceLevel < 0.5) {
    return MAJOR_ARCANA[18]; // La Luna
  }
  
  // Default: The Fool (journey begins)
  return MAJOR_ARCANA[0];
}

/**
 * Generate esoteric numerology from BPM
 */
export function bpmNumerology(bpm) {
  const digits = bpm.toString().split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  
  // Reduce to single digit or master number
  while (sum > 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  
  const meanings = {
    1: 'Individualidad, liderazgo, inicio',
    2: 'Dualidad, pareja, equilibrio',
    3: 'Trinidad, creatividad, expresión',
    4: 'Estabilidad, fundación, orden',
    5: 'Cambio, libertad, aventura',
    6: 'Armonía, amor, responsabilidad',
    7: 'Espiritualidad, sabiduría, misterio',
    8: 'Poder, manifestación, infinito',
    9: 'Completitud, humanitarismo, final de ciclo',
    11: 'Maestro espiritual, iluminación',
    22: 'Maestro constructor, visión materializada',
    33: 'Maestro sanador, servicio universal'
  };
  
  return {
    number: sum,
    meaning: meanings[sum] || 'Ciclo de transformación'
  };
}

/**
 * Full esoteric analysis of a track
 */
export function esoter icAnalysis(track, audioFeatures) {
  const tempo = Math.round(audioFeatures.tempo);
  const energy = audioFeatures.energy;
  const valence = audioFeatures.valence;
  const key = audioFeatures.key;
  const mode = audioFeatures.mode;
  
  // Elemental correspondence
  const element = tempoToElement(tempo);
  
  // Tarot card
  const tarotCard = mapToTarotCard(energy, valence, tempo);
  
  // Chakra/Color
  const chakraInfo = KEY_TO_CHAKRA[key];
  
  // Numerology
  const numerology = bpmNumerology(tempo);
  
  // Mode interpretation
  const modeInterpretation = mode === 1 
    ? 'Mayor (Yang, expansivo, externo)'
    : 'Menor (Yin, introspectivo, interno)';
  
  // Generate oracle message
  const oracleMessage = generateOracleMessage(tarotCard, element, chakraInfo, numerology);
  
  return {
    track: {
      name: track.name,
      artist: track.artists[0].name
    },
    esoteric: {
      tarotCard: {
        name: tarotCard.name,
        element: tarotCard.element,
        meaning: tarotCard.meaning
      },
      element: element,
      chakra: chakraInfo,
      numerology: numerology,
      mode: modeInterpretation,
      oracleMessage: oracleMessage
    },
    technical: {
      tempo: tempo,
      energy: (energy * 100).toFixed(0) + '%',
      valence: (valence * 100).toFixed(0) + '%',
      key: chakraInfo.note,
      mode: mode === 1 ? 'Major' : 'Minor'
    }
  };
}

/**
 * Generate cryptic oracle message
 */
function generateOracleMessage(tarot, element, chakra, numerology) {
  const messages = [
    `${tarot.name} resuena en el chakra ${chakra.chakra}. ${tarot.meaning}.`,
    `El camino del ${numerology.number} (${numerology.meaning}) te llama a través del ${element.element}.`,
    `Esta frecuencia vibra en ${chakra.color}, activando ${chakra.chakra}. ${tarot.meaning}.`,
    `${element.suit} del ${element.element}: ${tarot.name} te guía hacia ${tarot.meaning.toLowerCase()}.`
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
}
