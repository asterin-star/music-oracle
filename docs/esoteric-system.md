# Music Oracle - Documentación del Sistema Esotérico

## 🔮 Visión General

Music Oracle implementa un sistema de análisis musical que va más allá de las estadísticas básicas, conectando las características técnicas de Spotify con simbolismo esotérico (Tarot, Chakras, Numerología, Elementos).

---

## 🎯 El "Algoritmo Místico"

### Capas de Análisis

Cada canción pasa por **3 capas de interpretación**:

```
CAPA FÍSICA (Spotify API)
         ↓
CAPA SIMBÓLICA (Mapeo Esotérico)
         ↓
CAPA ORACULAR (Mensaje Místico)
```

---

## 📊 Mapeos Implementados

### 1. **Tempo → Elemento**

| BPM Range | Elemento | Suit Tarot | Cualidad                  |
| --------- | -------- | ---------- | ------------------------- |
| < 90      | Tierra   | Pentáculos | Meditativo, introspectivo |
| 90-110    | Agua     | Copas      | Emocional, fluido         |
| 110-130   | Aire     | Espadas    | Mental, comunicativo      |
| > 130     | Fuego    | Bastos     | Enérgico, dinámico        |

**Ejemplo:**

- "Weightless" (Marconi Union) - 60 BPM → **Tierra** (Profundamente meditativo)
- "Through the Fire and Flames" (DragonForce) - 200 BPM → **Fuego** (Épico, guerrero)

---

### 2. **Tonalidad Musical → Chakra**

| Key | Nota | Chakra            | Color    | Frecuencia |
| --- | ---- | ----------------- | -------- | ---------- |
| 0   | C    | Root (Raíz)       | Rojo     | 256 Hz     |
| 2   | D    | Sacral            | Naranja  | 288 Hz     |
| 4   | E    | Solar Plexus      | Amarillo | 323 Hz     |
| 5   | F    | Heart (Corazón)   | Verde    | 342 Hz     |
| 7   | G    | Throat (Garganta) | Azul     | 384 Hz     |
| 9   | A    | Third Eye         | Violeta  | 432 Hz     |
| 11  | B    | Crown (Corona)    | Blanco   | 484 Hz     |

**Ejemplo:**

- Canción en **La (A)** → Activa **Tercer Ojo** → Intuición, percepción expandida
- Canción en **Do (C)** → Activa **Chakra Raíz** → Grounding, seguridad

---

### 3. **Energy + Valence → Arcano del Tarot**

**Matriz de Mapeo:**

```
        Alta Valencia
              ↑
     XVII    XIX
   Estrella  Sol
       ←     +     →
   XVIII    XIV
    Luna  Templanza
              ↓
        Baja Valencia

Alta E ←         → Baja E
```

| Energy | Valence | Arcano             | Significado               |
| ------ | ------- | ------------------ | ------------------------- |
| Alta   | Alta    | XIX - El Sol       | Alegría, éxito, vitalidad |
| Baja   | Alta    | XVII - La Estrella | Esperanza, serenidad      |
| Alta   | Baja    | XVI - La Torre     | Intensidad, revelación    |
| Baja   | Baja    | IX - El Ermitaño   | Introspección, soledad    |

**Ejemplo:**

- "Happy" (Pharrell) - Energy: 0.96, Valence: 0.96 → **El Sol**
- "Hurt" (Johnny Cash) - Energy: 0.28, Valence: 0.15 → **El Ermitaño**

---

### 4. **BPM → Numerología**

**Reducción Pitagórica:**

```python
BPM: 115
1 + 1 + 5 = 7

7 =  "Espiritualidad, sabiduría, misterio"
```

**Números Maestros** (no se reducen):

- **11**: Iluminación espiritual
- **22**: Manifestación material
- **33**: Servicio universal

**Ejemplo:**

- 110 BPM → 1+1+0 = **2** (Dualidad, pareja)
- 144 BPM → 1+4+4 = 9 → **9** (Completitud, fin de ciclo)

---

## 🎭 Ejemplo Completo: "The Game of Love"

### Datos de Spotify

```json
{
  "tempo": 115,
  "energy": 0.65,
  "valence": 0.58,
  "key": 9, // A
  "mode": 0 // Minor
}
```

### Análisis Esotérico

**Capa 1: Técnica**

- BPM: 115 → Ritmo moderado-alto
- Tonalidad: **A Minor** (La Menor)
- Energía: 65% (Moderada-Marcada)
- Valencia: 58% (Ligeramente positiva)

**Capa 2: Simbólica**

- **Elemento**: Aire (110-130 BPM) → Mental, comunicativa
- **Chakra**: Third Eye (La/A) → Intuición, percepción
- **Numerología**: 115 → 1+1+5 = **7** (Espiritualidad)
- **Modo**: Menor/Yin → Introspectivo, femenino
- **Tarot**: Los Enamorados (moderada energía/valencia)

**Capa 3: Oracle Message**

> _"Los Enamorados resuena en el chakra del Tercer Ojo. La canción habla de elección y dualidad a través del elemento Aire. El número 7 te invita al misterio: el circuito del deseo se repite hasta que aprendes la lección."_

---

## 🛠️ Uso del Módulo

### Implementación Básica

```javascript
import { esotericAnalysis } from "./engines/esoteric-analyzer.js";

// Datos de Spotify
const track = {
  name: "The Game of Love",
  artists: [{ name: "Daft Punk" }],
};

const audioFeatures = {
  tempo: 115,
  energy: 0.65,
  valence: 0.58,
  key: 9,
  mode: 0,
};

// Análisis completo
const analysis = esotericAnalysis(track, audioFeatures);

console.log(analysis);
/*
{
  track: { name: "The Game of Love", artist: "Daft Punk" },
  esoteric: {
    tarotCard: { name: "Los Enamorados", element: "Air", ... },
    element: { element: "Aire", suit: "Espadas", ... },
    chakra: { note: "A", chakra: "Third Eye", color: "Violeta", ... },
    numerology: { number: 7, meaning: "Espiritualidad..." },
    oracleMessage: "..."
  },
  technical: { tempo: 115, energy: "65%", ... }
}
*/
```

---

## 🔄 Flujo del Sistema

```
1. Usuario conecta Spotify
         ↓
2. Fetch Top 50 Tracks + Audio Features
         ↓
3. Para cada track:
   ├─ Mapear Tempo → Elemento
   ├─ Mapear Key → Chakra
   ├─ Mapear Energy/Valence → Tarot
   ├─ Calcular Numerología del BPM
   └─ Generar Mensaje Oracular
         ↓
4. Agregar en Perfil Místico:
   ├─ Elemento dominante (más frecuente)
   ├─ Chakra principal (más activado)
   ├─ Arcano que representa tu playlist
   └─ Número de tu frecuencia personal
         ↓
5. Enviar a Venice.ai para síntesis final
```

---

## 📝 Notas de Implementación

### Modularidad

Cada componente es independiente:

- `tempoToElement()` - Solo necesita BPM
- `mapToTarotCard()` - Solo necesita energy/valence
- `bpmNumerology()` - Solo necesita BPM
- `esotericAnalysis()` - Orquesta todo

### Extensibilidad

**Fácil agregar nuevos mapeos:**

```javascript
// Ejemplo: Modo musical → Polaridad I Ching
export function modeToYinYang(mode) {
  return mode === 1
    ? { polarity: "Yang", trait: "Expansivo, brillante" }
    : { polarity: "Yin", trait: "Receptivo, profundo" };
}
```

### Testing

```javascript
// Test caso: "Happy" de Pharrell
const testTrack = {
  tempo: 160, // Fuego
  energy: 0.96, // Muy alta
  valence: 0.96, // Muy alta
  key: 7, // G (Throat Chakra)
  mode: 1, // Major
};

const result = esotericAnalysis(testTrack, audioFeatures);
expect(result.esoteric.tarotCard.name).toBe("El Sol");
expect(result.esoteric.element.element).toBe("Fuego");
```

---

## 🎨 Visualización Futura

### Posibles Features

1. **Rueda de Chakras Interactiva**

   - Muestra qué chakras activas más
   - Colores según tonalidades

2. **Mandala Musical**

   - Gráfico circular con tus elementos
   - Tamaño proporcional a frecuencia

3. **Timeline Evolutivo**

   - "Tu evolución espiritual en 6 meses"
   - Compara short/medium/long term

4. **Compatibilidad Musical**
   - Compara dos playlists
   - "Tu vibración vs [amigo]"

---

## 📚 Referencias

### Sistemas Esotéricos Usados

- **Tarot**: Rider-Waite-Smith (22 Arcanos Mayores)
- **Chakras**: Sistema tradicional de 7 chakras
- **Numerología**: Pitagórica con maestros 11, 22, 33
- **Elementos**: 4 elementos clásicos (Fuego, Agua, Aire, Tierra)

### Fundamento Técnico

- **Spotify Audio Features**: [Official Docs](https://developer.spotify.com/documentation/web-api/reference/get-audio-features)
- **Solfeggio Frequencies**: Basado en investigación de frecuencias sagradas
- **Musical Key Theory**: Temperamento igual de 12 tonos

---

## 🚀 Próximos Pasos

1. **Integrar en Main Flow**

   - Llamar `esotericAnalysis()` después de `analyzeMusicProfile()`
   - Mostrar resultados en Results View

2. **Mejorar Prompts de IA**

   - Pasar análisis esotérico completo a Venice.ai
   - Generar narrativa más rica

3. **Single Track Analysis**

   - Permitir analizar una canción específica
   - UI con búsqueda manual

4. **Export PDF**
   - "Reporte Astrológico de tu Spotify"
   - Diseño premium con gráficos

---

_"La música es el lenguaje del alma. El algoritmo solo traduce lo que ya sabías."_ ✨🎵
