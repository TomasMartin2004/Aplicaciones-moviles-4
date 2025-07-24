// Diccionario extenso de argentinismos y lunfardo de 5 letras
const PALABRAS_ARGENTINAS = [
  // Lunfardo clásico
  'AFANO', 'BAGRE', 'BIABA', 'BIRRA', 'BOCHE', 'BONDI', 'BULTO',
  'CACHO', 'CAFUA', 'CAMBA', 'CANYO', 'CHAJA', 'CHETO', 'CHORI', 'COIMA',
  'CUEVA', 'CURDA', 'FALSO', 'FARDO', 'FICHE', 'FIDEO', 'FIACA', 'GARCA',
  'GUITA', 'INDIO', 'JERMU', 'LABUR', 'LANGA', 'MANGO', 'MERSA',
  'MORFI', 'PARDO', 'PIBE', 'PINGO', 'PLATA',
  'PUCHO', 'RANIO', 'RATIS', 'TANGO', 'TECA',
  'YEGUA', 'ZAFAR',
  
  // Comida argentina
  'ASADO', 'DULCE', 'FAINA', 'LOCRO', 'MATES', 'CHORI',
  'PIZZA', 'PROVO', 'QUESO', 'TARTA', 'BIFES', 'MORCI',
  
  // Deportes y cultura
  'DIEGO', 'GOLES', 'MESSI', 'RIVER',
  
  // Regionalismos
  'CHACA', 'GAITA', 'PAMPA', 'POSTA', 'SAUCE', 'TABLA',
  'UNION', 'VERSO', 'WACHO',
  
  // Expresiones típicas
  'BUENO', 'FACHA', 'GENIO', 'MACHO', 'NEGRO',
  
  // Más lunfardo
  'BERSA', 'BULIN', 'GRUPO', 'HINCHA', 'GORRA', 'BOTON',
  'MORBO', 'OVEJA', 'PINTA', 'QUEMA', 'ROCHO', 'TROLO',
  
  // Palabras del Río de la Plata
  'BARDO', 'FLACO', 'HORNO', 'LUNES',
  'MAMBO', 'NOCHE', 'POLLO', 'RESTO', 'SAQUE', 'TRAGO', 'VERDE',

];

// Palabras muy fáciles para empezar
const PALABRAS_FACILES = [
  'TANGO', 'ASADO', 'MANGO', 'MATE', 'DULCE', 'BIFES', 
  'QUESO', 'PIZZA', 'BONDI', 'BIRRA', 'PIBES', 'LOCOS', 'NEGRO', 'MATES'
];

// Frases motivacionales argentinas
const FRASES_MOTIVACIONALES = [
  "¡Bárbaro, loco!",
  "¡La pegaste de una!",
  "¡Qué crack que sos!",
  "¡Sos un genio, viejo!",
  "¡Dale que podés!",
  "¡Vamos que falta poco!",
  "¡No aflojés, che!",
  "¡Metele que va!"
];

const FRASES_DERROTA = [
  "¡Qué garrón!",
  "¡La próxima la pegás!",
  "¡No te hagas drama!",
  "¡Tranqui, che!",
  "¡Otra vez será!",
  "¡Dale una más!",
  "¡Ni en pedo te rindas!",
  "¡Vamo' de nuevo!"
];

// Definiciones de algunas palabras para ayuda
const DEFINICIONES = {
  'AFANO': 'Robo, hurto',
  'ASADO': 'Parrillada argentina',
  'BAGRE': 'Persona fea',
  'BIABA': 'Golpiza, paliza',
  'BIFES': 'Bistec, carne',
  'BIRRA': 'Cerveza',
  'BOCHE': 'Problema, lío',
  'BONDI': 'Autobús, colectivo',
  'CACHO': 'Pedazo, trozo',
  'CHETO': 'Persona de clase alta, fifi',
  'CHORI': 'Chorizo',
  'COIMA': 'Soborno',
  'CURDA': 'Borracho',
  'DULCE': 'Dulce de leche',
  'FIACA': 'Pereza, flojera',
  'GARCA': 'Traidor, desleal',
  'GUITA': 'Dinero',
  'JERMU': 'Mujer, novia',
  'LABUR': 'Trabajo',
  'MANGO': 'Peso (moneda)',
  'MATES': 'Infusión típica argentina',
  'MERSA': 'Persona ordinaria',
  'MORFI': 'Comida',
  'PINGO': 'Caballo',
  'PUCHO': 'Cigarrillo',
  'TANGO': 'Baile típico argentino',

};

module.exports = {
  PALABRAS_ARGENTINAS,
  PALABRAS_FACILES,
  FRASES_MOTIVACIONALES,
  FRASES_DERROTA,
  DEFINICIONES
}; 