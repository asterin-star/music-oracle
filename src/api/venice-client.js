// Venice.ai Integration
// Generates mystical music insights using AI

const VENICE_API_ENDPOINT = "https://api.venice.ai/api/v1/chat/completions";

/**
 * Call Venice.ai API
 */
async function callVeniceAI(prompt) {
  const apiKey = import.meta.env.VITE_VENICE_API_KEY;
  const model = import.meta.env.VITE_VENICE_MODEL || "llama-3.3-70b";

  if (!apiKey) {
    console.warn("Venice API key not configured, using fallback response");
    return generateFallbackResponse();
  }

  try {
    const response = await fetch(VENICE_API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content:
              "Eres un oráculo místico-científico que interpreta preferencias musicales. Combinas datos técnicos con sabiduría espiritual en un estilo poético pero fundamentado.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error("Venice API request failed");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Venice AI error:", error);
    return generateFallbackResponse();
  }
}

/**
 * Fallback response when AI is unavailable
 */
function generateFallbackResponse() {
  return {
    title: "El Viajero de Frecuencias",
    interpretation:
      "Tu universo sonoro revela una búsqueda constante de resonancia. Las ondas que eliges no son casuales: son el mapa de tu alma traducido a vibraciones. Cada canción es un portal, cada frecuencia un mensaje cifrado de tu ser interior.",
    advice:
      "Explora conscientemente las frecuencias que te llaman. La música que amas es la llave para comprender quién eres realmente.",
  };
}

/**
 * Generate mystical music soul analysis
 */
export async function analyzeMusicSoul(analysis, frequencyData) {
  const {
    avgFeatures,
    dominantKey,
    element,
    topGenres,
    topTracks,
    topArtists,
  } = analysis;

  const topTracksList = topTracks
    .slice(0, 10)
    .map((t, i) => `${i + 1}. "${t.name}" - ${t.artists[0].name}`)
    .join("\n");

  const topArtistsList = topArtists
    .slice(0, 5)
    .map((a, i) => `${i + 1}. ${a.name}`)
    .join("\n");

  const prompt = `Eres un oráculo místico-científico. Analiza este perfil musical y genera una lectura profunda.

DATOS TÉCNICOS:
━━━━━━━━━━━━━━━
🎵 TOP 10 CANCIONES:
${topTracksList}

👤 TOP 5 ARTISTAS:
${topArtistsList}

📊 CARACTERÍSTICAS PROMEDIO:
• Tempo: ${avgFeatures.tempo} BPM
• Energía: ${(avgFeatures.energy * 100).toFixed(0)}%
• Valencia (Positividad): ${(avgFeatures.valence * 100).toFixed(0)}%
• Bailabilidad: ${(avgFeatures.danceability * 100).toFixed(0)}%
• Acústico: ${(avgFeatures.acousticness * 100).toFixed(0)}%
• Instrumental: ${(avgFeatures.instrumentalness * 100).toFixed(0)}%

🎹 TONALIDAD DOMINANTE: ${dominantKey.fullName}
🌟 ELEMENTO: ${element.name} ${element.icon}
🎭 GÉNEROS: ${topGenres.join(", ")}
📡 FRECUENCIA DEL ALMA: ${frequencyData.sacred.frequency} Hz
   ${frequencyData.sacred.meaning}

GENERA (formato JSON):
{
  "title": "Título místico del perfil (3-5 palabras, ej: 'El Arquitecto de Frecuencias Bajas')",
  "interpretation": "Interpretación profunda de 120-150 palabras explicando POR QUÉ estas canciones resuenan con esta persona. Conecta los datos técnicos con arquetipos, emociones y búsquedas existenciales. Usa metáforas poéticas pero mantén conexión con los datos.",
  "advice": "Consejo evolutivo musical de 40-50 palabras: qué frecuencias o estilos explorar para expandir consciencia."
}

IMPORTANTE: Responde SOLO con el JSON, sin texto adicional.`;

  try {
    const response = await callVeniceAI(prompt);

    // Try to parse JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // If no JSON found, return fallback
    return generateFallbackResponse();
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return generateFallbackResponse();
  }
}
