const API_BASE_URL = 'http://192.168.0.5:3001/api';

// Función auxiliar para manejar las peticiones fetch
const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      timeout: 5000, // 5 segundos de timeout
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en petición API:', error);
    throw error;
  }
};

// Función para obtener palabra aleatoria desde el backend
export const obtenerPalabraAleatoria = async () => {
  try {
    const data = await fetchWithErrorHandling(`${API_BASE_URL}/palabra-aleatoria`);
    return {
      palabra: data.palabra,
      definicion: data.definicion,
      dificultad: data.dificultad
    };
  } catch (error) {
    console.error('Error al obtener palabra aleatoria:', error);
    // Palabra de fallback en caso de error
    return {
      palabra: 'TANGO',
      definicion: 'Baile típico argentino',
      dificultad: 'fácil'
    };
  }
};

// Función para obtener palabra fácil
export const obtenerPalabraFacil = async () => {
  try {
    const data = await fetchWithErrorHandling(`${API_BASE_URL}/palabra-facil`);
    return {
      palabra: data.palabra,
      definicion: data.definicion,
      dificultad: data.dificultad
    };
  } catch (error) {
    console.error('Error al obtener palabra fácil:', error);
    return { 
      palabra: 'MATES', 
      definicion: 'Infusión típica argentina', 
      dificultad: 'fácil' 
    };
  }
};

// Función para obtener frase motivacional
export const obtenerFraseMotivacional = async () => {
  try {
    const data = await fetchWithErrorHandling(`${API_BASE_URL}/frase-motivacional`);
    return data.frase;
  } catch (error) {
    console.error('Error al obtener frase motivacional:', error);
    // Frases de fallback
    const frasesFallback = [
      '¡Dale que podés!',
      '¡Bárbaro, loco!',
      '¡Vamos que falta poco!',
      '¡Sos un genio, viejo!'
    ];
    return frasesFallback[Math.floor(Math.random() * frasesFallback.length)];
  }
};

// Función para obtener frase de derrota
export const obtenerFraseDerrota = async () => {
  try {
    const data = await fetchWithErrorHandling(`${API_BASE_URL}/frase-derrota`);
    return data.frase;
  } catch (error) {
    console.error('Error al obtener frase de derrota:', error);
    // Frases de fallback
    const frasesFallback = [
      '¡La próxima la pegás!',
      '¡No te hagas drama!',
      '¡Tranqui, che!',
      '¡Otra vez será!'
    ];
    return frasesFallback[Math.floor(Math.random() * frasesFallback.length)];
  }
};

// Función para validar palabra
export const validarPalabra = async (palabra) => {
  try {
    const data = await fetchWithErrorHandling(`${API_BASE_URL}/validar/${palabra.toUpperCase()}`);
    return data.existe;
  } catch (error) {
    console.error('Error al validar palabra:', error);
    // En caso de error, usar validación local como fallback
    const palabrasFallback = [
      'TANGO', 'ASADO', 'MATES', 'BIRRA', 'BONDI', 'GUITA',
      'MORFI', 'CHETO', 'GARCA', 'FIACA', 'CHORI'
    ];
    return palabrasFallback.includes(palabra.toUpperCase());
  }
};

// Función para obtener definición
export const obtenerDefinicion = async (palabra) => {
  try {
    const data = await fetchWithErrorHandling(`${API_BASE_URL}/definicion/${palabra.toUpperCase()}`);
    return data.definicion;
  } catch (error) {
    console.error('Error al obtener definición:', error);
    return 'Definición no disponible';
  }
};

// Función para obtener estadísticas del diccionario
export const obtenerEstadisticas = async () => {
  try {
    const data = await fetchWithErrorHandling(`${API_BASE_URL}/estadisticas`);
    return data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return {
      totalPalabras: 115,
      palabrasFaciles: 16,
      frasesMotivacionales: 8,
      frasesDerrota: 8,
      definicionesDisponibles: 27,
      porcentajeDefiniciones: 23
    };
  }
};

// Función para verificar conectividad con el backend
export const verificarConectividad = async () => {
  try {
    await fetchWithErrorHandling(API_BASE_URL.replace('/api', '/'));
    return true;
  } catch (error) {
    console.warn('Backend no disponible, usando modo offline');
    return false;
  }
};

// Función para obtener todas las palabras (útil para debugging)
export const obtenerTodasLasPalabras = async () => {
  try {
    const data = await fetchWithErrorHandling(`${API_BASE_URL}/todas-palabras`);
    return data.palabrasCompletas;
  } catch (error) {
    console.error('Error al obtener todas las palabras:', error);
    // Palabras de fallback básicas
    return [
      'TANGO', 'ASADO', 'MATES', 'BIRRA', 'BONDI', 'GUITA',
      'MORFI', 'CHETO', 'GARCA', 'FIACA', 'CHORI',
      'DULCE', 'PIZZA', 'QUESO', 'NEGRO', 'LOCO'
    ];
  }
}; 