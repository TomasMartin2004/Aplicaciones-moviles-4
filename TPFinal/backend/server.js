const express = require('express');
const cors = require('cors');
const { 
  PALABRAS_ARGENTINAS, 
  PALABRAS_FACILES, 
  FRASES_MOTIVACIONALES, 
  FRASES_DERROTA, 
  DEFINICIONES 
} = require('./data/diccionarioArgentino');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Función para obtener elemento aleatorio de un array
const obtenerElementoAleatorio = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: '¡Bienvenido al API del Wordle Argentino!',
    endpoints: {
      '/api/palabra-aleatoria': 'Obtiene una palabra aleatoria del diccionario completo',
      '/api/palabra-facil': 'Obtiene una palabra fácil para principiantes',
      '/api/frase-motivacional': 'Obtiene una frase motivacional argentina',
      '/api/frase-derrota': 'Obtiene una frase de ánimo para cuando se pierde',
      '/api/definicion/:palabra': 'Obtiene la definición de una palabra específica',
      '/api/estadisticas': 'Obtiene estadísticas del diccionario',
      '/api/todas-palabras': 'Obtiene todas las palabras disponibles'
    }
  });
});

// Endpoint principal: palabra aleatoria del diccionario completo
app.get('/api/palabra-aleatoria', (req, res) => {
  try {
    const palabraAleatoria = obtenerElementoAleatorio(PALABRAS_ARGENTINAS);
    res.json({
      palabra: palabraAleatoria,
      definicion: DEFINICIONES[palabraAleatoria] || 'Definición no disponible',
      dificultad: PALABRAS_FACILES.includes(palabraAleatoria) ? 'fácil' : 'normal'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener palabra aleatoria' });
  }
});

// Endpoint para palabras fáciles
app.get('/api/palabra-facil', (req, res) => {
  try {
    const palabraFacil = obtenerElementoAleatorio(PALABRAS_FACILES);
    res.json({
      palabra: palabraFacil,
      definicion: DEFINICIONES[palabraFacil] || 'Definición no disponible',
      dificultad: 'fácil'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener palabra fácil' });
  }
});

// Endpoint para frases motivacionales
app.get('/api/frase-motivacional', (req, res) => {
  try {
    const frase = obtenerElementoAleatorio(FRASES_MOTIVACIONALES);
    res.json({
      frase: frase,
      tipo: 'motivacional'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener frase motivacional' });
  }
});

// Endpoint para frases de derrota
app.get('/api/frase-derrota', (req, res) => {
  try {
    const frase = obtenerElementoAleatorio(FRASES_DERROTA);
    res.json({
      frase: frase,
      tipo: 'derrota'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener frase de derrota' });
  }
});

// Endpoint para obtener definición de una palabra específica
app.get('/api/definicion/:palabra', (req, res) => {
  try {
    const palabra = req.params.palabra.toUpperCase();
    const definicion = DEFINICIONES[palabra];
    
    if (definicion) {
      res.json({
        palabra: palabra,
        definicion: definicion,
        disponible: true
      });
    } else {
      res.json({
        palabra: palabra,
        definicion: 'Definición no disponible',
        disponible: false
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener definición' });
  }
});

// Endpoint para estadísticas del diccionario
app.get('/api/estadisticas', (req, res) => {
  try {
    res.json({
      totalPalabras: PALABRAS_ARGENTINAS.length,
      palabrasFaciles: PALABRAS_FACILES.length,
      frasesMotivacionales: FRASES_MOTIVACIONALES.length,
      frasesDerrota: FRASES_DERROTA.length,
      definicionesDisponibles: Object.keys(DEFINICIONES).length,
      porcentajeDefiniciones: Math.round((Object.keys(DEFINICIONES).length / PALABRAS_ARGENTINAS.length) * 100)
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

// Endpoint para obtener todas las palabras (útil para debugging o administración)
app.get('/api/todas-palabras', (req, res) => {
  try {
    res.json({
      palabrasCompletas: PALABRAS_ARGENTINAS,
      palabrasFaciles: PALABRAS_FACILES,
      total: PALABRAS_ARGENTINAS.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todas las palabras' });
  }
});

// Endpoint para validar si una palabra existe en el diccionario
app.get('/api/validar/:palabra', (req, res) => {
  try {
    const palabra = req.params.palabra.toUpperCase();
    const existe = PALABRAS_ARGENTINAS.includes(palabra);
    
    res.json({
      palabra: palabra,
      existe: existe,
      esFacil: PALABRAS_FACILES.includes(palabra),
      definicion: DEFINICIONES[palabra] || null
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al validar palabra' });
  }
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: 'Visitá / para ver los endpoints disponibles'
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor del Wordle Argentino ejecutándose en puerto ${PORT}`);
  console.log(`📚 Diccionario cargado con ${PALABRAS_ARGENTINAS.length} palabras`);
  console.log(`🌐 Visitá http://localhost:${PORT} para ver los endpoints disponibles`);
});

module.exports = app; 