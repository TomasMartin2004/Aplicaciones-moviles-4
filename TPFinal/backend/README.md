# 🇦🇷 Backend Wordle Argentino

API REST para el juego Wordle Argentino que proporciona palabras del diccionario argentino y lunfardo.

## 🚀 Instalación y Ejecución

### Instalar dependencias
```bash
cd backend
npm install
```

### Ejecutar en modo desarrollo
```bash
npm run dev
```

### Ejecutar en producción
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000` por defecto.

## 📋 Endpoints Disponibles

### GET `/`
Página principal con información de la API y lista de endpoints.

### GET `/api/palabra-aleatoria`
Obtiene una palabra aleatoria del diccionario completo.

**Respuesta:**
```json
{
  "palabra": "TANGO",
  "definicion": "Baile típico argentino",
  "dificultad": "fácil"
}
```

### GET `/api/palabra-facil`
Obtiene una palabra fácil para principiantes.

**Respuesta:**
```json
{
  "palabra": "ASADO",
  "definicion": "Parrillada argentina",
  "dificultad": "fácil"
}
```

### GET `/api/frase-motivacional`
Obtiene una frase motivacional argentina aleatoria.

**Respuesta:**
```json
{
  "frase": "¡Bárbaro, loco!",
  "tipo": "motivacional"
}
```

### GET `/api/frase-derrota`
Obtiene una frase de ánimo para cuando se pierde.

**Respuesta:**
```json
{
  "frase": "¡La próxima la pegás!",
  "tipo": "derrota"
}
```

### GET `/api/definicion/:palabra`
Obtiene la definición de una palabra específica.

**Ejemplo:** `/api/definicion/BIRRA`

**Respuesta:**
```json
{
  "palabra": "BIRRA",
  "definicion": "Cerveza",
  "disponible": true
}
```

### GET `/api/estadisticas`
Obtiene estadísticas del diccionario.

**Respuesta:**
```json
{
  "totalPalabras": 120,
  "palabrasFaciles": 16,
  "frasesMotivacionales": 8,
  "frasesDerrota": 8,
  "definicionesDisponibles": 27,
  "porcentajeDefiniciones": 23
}
```

### GET `/api/validar/:palabra`
Valida si una palabra existe en el diccionario.

**Ejemplo:** `/api/validar/MATES`

**Respuesta:**
```json
{
  "palabra": "MATES",
  "existe": true,
  "esFacil": true,
  "definicion": "Infusión típica argentina"
}
```

### GET `/api/todas-palabras`
Obtiene todas las palabras disponibles (útil para debugging).

## 🔧 Configuración

### Variables de Entorno
- `PORT`: Puerto del servidor (por defecto: 3000)

### CORS
El servidor tiene CORS habilitado para permitir conexiones desde cualquier origen.


## 🛠️ Tecnologías Utilizadas

- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web
- **CORS**: Manejo de Cross-Origin Resource Sharing

## 📊 Datos Incluidos

- **120+ palabras** del lunfardo y argentinismos
- **16 palabras fáciles** para principiantes
- **8 frases motivacionales** argentinas
- **8 frases de ánimo** para derrotas
- **27 definiciones** de palabras comunes 