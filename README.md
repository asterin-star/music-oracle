# 🎵 Music Oracle

**Descubre la frecuencia espiritual de tu alma a través de tu música favorita**

Una aplicación mística que analiza tus preferencias musicales de Spotify para revelarte insights profundos sobre tu ser interior. Combina análisis de características de audio (frecuencias Hz, tempo, energía) con IA generativa para crear interpretaciones místico-científicas personalizadas.

## ✨ Características

- 🎧 **Integración con Spotify**: Accede a tus top canciones y artistas
- 📊 **Análisis de Audio**: Extrae características técnicas (tempo, energía, valencia, tonalidad)
- 📡 **Frecuencias del Alma**: Estima tu frecuencia espiritual basada en tus preferencias
- 🔮 **IA Mística**: Genera interpretaciones profundas usando Venice.ai
- 🌟 **Arquetipos Elementales**: Descubre tu elemento (Fuego, Agua, Aire, Tierra)
- 🎨 **iOS 26 Crystalmorphism**: Diseño premium con glassmorphism y liquid backgrounds

## 🚀 Inicio Rápido

### 1. Clonar e Instalar

```bash
cd music-oracle
npm install
```

### 2. Configurar Variables de Entorno

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
VITE_SPOTIFY_CLIENT_ID=tu_client_id_aqui
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/callback
VITE_VENICE_API_KEY=tu_venice_api_key_aqui
VITE_VENICE_MODEL=llama-3.3-70b
```

### 3. Obtener Credenciales

#### Spotify Developer

1. Ve a [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Crea una nueva app
3. Copia el **Client ID**
4. En Settings, añade `http://localhost:5173/callback` como Redirect URI

#### Venice.ai (Opcional pero recomendado)

1. Regístrate en [Venice.ai](https://venice.ai)
2. Genera una API key
3. Usa el modelo `llama-3.3-70b` (recomendado)

**Nota**: Sin Venice.ai, la app usará respuestas fallback genéricas.

### 4. Ejecutar

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## 📂 Estructura del Proyecto

```
music-oracle/
├── index.html              # SPA principal
├── public/
│   └── css/
│       └── design-system.css   # Sistema de diseño iOS 26
├── src/
│   ├── main.js             # Orquestador principal
│   ├── auth/
│   │   └── spotify-auth.js     # OAuth con PKCE
│   ├── api/
│   │   ├── spotify-client.js   # Cliente Spotify Web API
│   │   └── venice-client.js    # Integración Venice.ai
│   └── engines/
│       ├── music-analyzer.js   # Análisis de características
│       └── hz-estimator.js     # Estimación de frecuencias
└── package.json
```

## 🎨 Sistema de Diseño

El proyecto usa **iOS 26 Crystalmorphism**:

- **Glassmorphism**: Contenedores con frosted glass y backdrop blur
- **Liquid Backgrounds**: Gradientes animados tipo "blob"
- **Palette**: Violet místico + Cyan tecnológico
- **Typography**: SF Pro Display / Inter
- **Micro-animations**: Hover states y loading pulses

## 🔬 Cómo Funciona

1. **Autenticación**: OAuth 2.0 con PKCE (más seguro para SPAs)
2. **Extracción de Datos**:
   - Top 50 tracks (últimos 6 meses)
   - Audio features de cada track
   - Top artistas y géneros
3. **Análisis**:
   - Calcula promedios (energía, valencia, tempo, etc.)
   - Identifica tonalidad dominante
   - Determina arquetipo elemental
4. **Frecuencia del Alma**:
   - Mapea tonalidad musical → Hz base
   - Ajusta por tempo
   - Encuentra frecuencia sagrada más cercana (432 Hz, 528 Hz, etc.)
5. **IA Mística**:
   - Genera perfil único usando Venice.ai
   - Combina datos técnicos con interpretación espiritual

## 📊 Datos Analizados

| Característica   | Descripción                              |
| ---------------- | ---------------------------------------- |
| **Tempo**        | BPM promedio (energía rítmica)           |
| **Energía**      | Intensidad y actividad (0-1)             |
| **Valencia**     | Positividad musical (0-1)                |
| **Bailabilidad** | Qué tan bailable es (0-1)                |
| **Tonalidad**    | Clave musical dominante (C, D, E#, etc.) |
| **Modo**         | Major o Minor                            |
| **Frecuencia**   | Hz estimado → Frecuencia sagrada         |

## 🛠️ Tecnologías

- **Vite**: Build tool ultrarrápido
- **Vanilla JS**: Sin frameworks, máxima performance
- **Spotify Web API**: Datos musicales
- **Venice.ai**: IA generativa (Llama 3.3)
- **CSS Variables**: Sistema de diseño modular

## 🚧 Roadmap

- [x] MVP con análisis básico
- [ ] Google Sign-In + Numerología
- [ ] Generación de imágenes compartibles (Canvas)
- [ ] Formatos Instagram Story / Reddit Post
- [ ] Historial de análisis
- [ ] Comparación de "eras musicales" (short/medium/long term)

## 📝 Notas Técnicas

### Limitaciones de Spotify API

- No provee frecuencias Hz directas → se estiman basándose en tonalidad + tempo
- Rate limits: ~100 requests/30s (suficiente para MVP)
- Requiere que el usuario tenga cuenta Spotify (gratis funciona)

### Frecuencias Sagradas

El mapeo de Hz se basa en:

- **Solfeggio Frequencies**: 174, 285, 396, 417, 432, 528, 639, 741, 852, 963 Hz
- **Pythagorean Tuning**: Sistema de afinación natural
- **Cymatics**: Relación entre vibración y forma

## 📄 Licencia

MIT

## 🙏 Créditos

Construido con el **Antigravity Protocol** - donde la música y la magia se encuentran.

---

**¿Listo para descubrir la frecuencia de tu alma?** 🎵✨
