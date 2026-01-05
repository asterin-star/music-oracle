/**
 * AI Oracle Service
 * Powered by Google Gemini 1.5 Pro
 */

export const AIOracle = {
  async interpretEsotericAnalysis(analysisData) {
    const prompt = this.constructPrompt(analysisData);

    try {
      const interpretation = await this.callGeminiAI(prompt);
      return interpretation;
    } catch (error) {
      console.error("Gemini AI Error:", error);
      return this.getFallbackInterpretation(analysisData);
    }
  },

  constructPrompt(data) {
    const { track, esoteric, technical } = data;

    return `
      Eres el Oráculo Musical, una entidad mística y sofisticada. 
      Analiza la "Frecuencia del Alma" de esta canción: "${track.name}" de "${
      track.artist
    }".
      
      SIGNOS MÍSTICOS DETECTADOS:
      - 🔮 Tarot: ${esoteric.tarotCard.name} (${esoteric.tarotCard.meaning})
      - 🌊 Elemento: ${esoteric.element.element} (${
      esoteric.element.suit
    }) - Cualidad: ${esoteric.element.quality}
      - 🧘 Chakra: ${esoteric.chakra.chakra} (Nota ${esoteric.chakra.note}, ${
      esoteric.chakra.color
    })
      - 🔢 Numerología: ${esoteric.numerology.number} (${
      esoteric.numerology.meaning
    })
      - ⚡ Energía Técnica: ${technical.energy * 100}%
      
      TU TAREA:
      Genera una interpretación breve, profunda y poética (estilo "clásico de Instagram" o místico moderno).
      Dime qué revela esta canción sobre el momento actual de mi vida.
      
      FORMATO JSON REQUERIDO:
      {
        "interpretation": "Tu interpretación poética y directa aquí...",
        "advice": "Un consejo corto y poderoso (estilo frase de galleta de la fortuna mística).",
        "vibe_tags": ["#tag1", "#tag2", "#tag3"]
      }
    `;
  },

  async callGeminiAI(prompt) {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

    if (!apiKey) {
      throw new Error("Google API Key not found");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;

    // Clean code blocks if present
    const cleanedContent = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleanedContent);
    } catch (e) {
      console.warn(
        "Failed to parse JSON directly, returning text wrap",
        cleanedContent
      );
      return {
        interpretation: cleanedContent,
        advice: "Escucha con el corazón.",
        vibe_tags: ["#MusicOracle", "#GeminiAI"],
      };
    }
  },

  getFallbackInterpretation(data) {
    return {
      interpretation: `La energía de ${
        data.esoteric.element.element
      } fluye a través de ${
        data.esoteric.tarotCard.name
      }. Es un momento para ${data.esoteric.tarotCard.meaning.toLowerCase()}.`,
      advice: `Conecta con tu chakra ${data.esoteric.chakra.chakra} a través del sonido.`,
      vibe_tags: ["#OfflineOracle", "#Mystic"],
    };
  },
};
