import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
  StatusBar,
  Modal,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../utils/themeContext';
import { 
  ArrowLeft,
  HelpCircle,
  RotateCcw,
  Sun,
  Moon,
  Delete
} from 'lucide-react-native';
import { 
  obtenerPalabraAleatoria,
  obtenerFraseMotivacional,
  obtenerFraseDerrota,
  obtenerDefinicion,
  validarPalabra
} from '../../services/wordleAPI';

const { width } = Dimensions.get('window');

const TECLADO_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

const WordleArgentino = () => {
  const navigation = useNavigation();
  const { colors, isDark, toggleTheme } = useTheme();
  
  const [palabraObjetivo, setPalabraObjetivo] = useState('');
  const [palabraData, setPalabraData] = useState(null);
  const [cargandoPalabra, setCargandoPalabra] = useState(false);
  const [intentoActual, setIntentoActual] = useState('');
  const [intentos, setIntentos] = useState([]);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [ganado, setGanado] = useState(false);
  const [letrasUsadas, setLetrasUsadas] = useState({});
  const [mostrarAyuda, setMostrarAyuda] = useState(false);
  const [estadisticas, setEstadisticas] = useState({
    jugadas: 0,
    ganadas: 0,
    rachaActual: 0,
    mejorRacha: 0
  });

  const styles = createStyles(colors, isDark);

  useEffect(() => {
    iniciarJuego();
  }, []);

  const iniciarJuego = async () => {
    setCargandoPalabra(true);
    const data = await obtenerPalabraAleatoria();
    setPalabraObjetivo(data.palabra);
    setPalabraData(data);
    console.log('Nueva palabra obtenida del backend:', data.palabra);

    setCargandoPalabra(false);
    setIntentoActual('');
    setIntentos([]);
    setJuegoTerminado(false);
    setGanado(false);
    setLetrasUsadas({});
  };

  const manejarTecla = (tecla) => {
    if (juegoTerminado || cargandoPalabra) return;

    if (tecla === 'ENTER') {
      if (intentoActual.length === 5) {
        procesarIntento();
      } else {
        Alert.alert('¡Che!', 'La palabra debe tener 5 letras, boludo.');
      }
    } else if (tecla === '⌫') {
      setIntentoActual(prev => prev.slice(0, -1));
    } else if (intentoActual.length < 5) {
      setIntentoActual(prev => prev + tecla);
    }
  };

  const procesarIntento = async () => {
    const esValida = await validarPalabra(intentoActual);
    if (!esValida) {
      Alert.alert('¡Esa no va!', 'Esa palabra no está en nuestro diccionario argentino, che.');
      return;
    }

    const resultado = evaluarIntento(intentoActual, palabraObjetivo);
    const nuevoIntento = {
      palabra: intentoActual,
      resultado: resultado
    };

    const nuevosIntentos = [...intentos, nuevoIntento];
    setIntentos(nuevosIntentos);

    // Actualizar estado de las letras
    const nuevasLetrasUsadas = { ...letrasUsadas };
    for (let i = 0; i < intentoActual.length; i++) {
      const letra = intentoActual[i];
      const estado = resultado[i];
      
      if (!nuevasLetrasUsadas[letra] || estado === 'correct' || 
          (estado === 'present' && nuevasLetrasUsadas[letra] === 'absent')) {
        nuevasLetrasUsadas[letra] = estado;
      }
    }
    setLetrasUsadas(nuevasLetrasUsadas);

    if (intentoActual === palabraObjetivo) {
      setGanado(true);
      setJuegoTerminado(true);
      
      // Obtener frase motivacional y definición del backend
      const fraseVictoria = await obtenerFraseMotivacional();
      const definicion = palabraData?.definicion || await obtenerDefinicion(palabraObjetivo);
      
      setTimeout(() => {
        const textoDefinicion = definicion && definicion !== 'Definición no disponible' ? 
          `\n\n"${palabraObjetivo}": ${definicion}` : '';
        Alert.alert(
          fraseVictoria, 
          `¡La pegaste en ${nuevosIntentos.length} intentos! 🎉${textoDefinicion}`
        );
      }, 500);
    } else if (nuevosIntentos.length >= 6) {
      setJuegoTerminado(true);
      
      // Obtener frase de derrota y definición del backend
      const fraseDerrota = await obtenerFraseDerrota();
      const definicion = palabraData?.definicion || await obtenerDefinicion(palabraObjetivo);
      
      setTimeout(() => {
        const textoDefinicion = definicion && definicion !== 'Definición no disponible' ? 
          `\n\n"${palabraObjetivo}": ${definicion}` : '';
        Alert.alert(
          fraseDerrota, 
          `La palabra era: ${palabraObjetivo}${textoDefinicion}`
        );
      }, 500);
    }

    setIntentoActual('');
  };

  const evaluarIntento = (intento, objetivo) => {
    const resultado = new Array(5).fill('absent');
    const objetivoArray = objetivo.split('');
    const intentoArray = intento.split('');

    // Marcar letras correctas primero
    for (let i = 0; i < 5; i++) {
      if (intentoArray[i] === objetivoArray[i]) {
        resultado[i] = 'correct';
        objetivoArray[i] = null;
        intentoArray[i] = null;
      }
    }

    // Marcar letras presentes pero en posición incorrecta
    for (let i = 0; i < 5; i++) {
      if (intentoArray[i] !== null) {
        const indiceEnObjetivo = objetivoArray.indexOf(intentoArray[i]);
        if (indiceEnObjetivo !== -1) {
          resultado[i] = 'present';
          objetivoArray[indiceEnObjetivo] = null;
        }
      }
    }

    return resultado;
  };

  const obtenerColorCelda = (estado) => {
    switch (estado) {
      case 'correct': return colors.correct;
      case 'present': return colors.present;
      case 'absent': return colors.absent;
      default: return colors.surface;
    }
  };

  const obtenerColorTecla = (letra) => {
    const estado = letrasUsadas[letra];
    if (estado === 'correct') return colors.correct;
    if (estado === 'present') return colors.present;
    if (estado === 'absent') return colors.absent;
    return colors.keyBackground;
  };

  const renderizarCelda = (letra, estado, indice) => (
    <View
      key={indice}
      style={[
        styles.celda,
        { backgroundColor: obtenerColorCelda(estado) }
      ]}
    >
      <Text style={styles.letraCelda}>{letra}</Text>
    </View>
  );

  const renderizarFila = (intento, indice) => {
    const celdas = [];
    
    if (intento) {
      for (let i = 0; i < 5; i++) {
        celdas.push(renderizarCelda(
          intento.palabra[i],
          intento.resultado[i],
          i
        ));
      }
    } else if (indice === intentos.length) {
      // Fila actual
      for (let i = 0; i < 5; i++) {
        celdas.push(renderizarCelda(
          intentoActual[i] || '',
          null,
          i
        ));
      }
    } else {
      // Filas vacías
      for (let i = 0; i < 5; i++) {
        celdas.push(renderizarCelda('', null, i));
      }
    }

    return (
      <View key={indice} style={styles.fila}>
        {celdas}
      </View>
    );
  };

  const renderizarTecla = (tecla) => {
    const esEspecial = tecla === 'ENTER' || tecla === '⌫';
    
    return (
      <TouchableOpacity
        key={tecla}
        style={[
          styles.tecla,
          esEspecial && styles.teclaEspecial,
          { backgroundColor: obtenerColorTecla(tecla) }
        ]}
        onPress={() => manejarTecla(tecla)}
      >
        {tecla === '⌫' ? (
          <Delete size={16} color={colors.text} />
        ) : (
          <Text style={[
            styles.textoTecla,
            esEspecial && styles.textoTeclaEspecial
          ]}>
            {tecla}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.botonVolver}
        >
          <ArrowLeft size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <Text style={styles.titulo}>Wordle Argentino</Text>
        
        <View style={styles.botonesHeader}>
          <TouchableOpacity
            onPress={() => setMostrarAyuda(true)}
            style={styles.botonAyuda}
          >
            <HelpCircle size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={toggleTheme}
            style={styles.botonTema}
          >
            {isDark ? (
              <Sun size={20} color={colors.textSecondary} />
            ) : (
              <Moon size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={iniciarJuego}
            style={styles.botonReiniciar}
          >
            <RotateCcw size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tablero */}
      <View style={styles.tablero}>
        {Array.from({ length: 6 }, (_, indice) =>
          renderizarFila(intentos[indice], indice)
        )}
      </View>

      {/* Teclado */}
      <View style={styles.teclado}>
        {TECLADO_LAYOUT.map((fila, indice) => (
          <View key={indice} style={styles.filaTeclado}>
            {fila.map(renderizarTecla)}
          </View>
        ))}
      </View>

      {/* Info del juego */}
      <View style={styles.info}>
        <Text style={styles.textoInfo}>
          Adiviná la palabra argentina en 6 intentos
        </Text>
        <Text style={styles.textoInfo}>
          Intentos: {intentos.length}/6
        </Text>
        {cargandoPalabra && (
          <Text style={[styles.textoInfo, { color: colors.primary }]}>
            Obteniendo nueva palabra del servidor...
          </Text>
        )}
        {palabraData?.dificultad && (
          <Text style={[styles.textoInfo, { fontSize: 10 }]}>
            Dificultad: {palabraData.dificultad}
          </Text>
        )}
      </View>

      {/* Modal de ayuda */}
      <Modal
        visible={mostrarAyuda}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMostrarAyuda(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.tituloModal}>¿Cómo jugar?</Text>
              
              <Text style={styles.textoModal}>
                🎯 <Text style={styles.textoModalBold}>Objetivo:</Text> Adiviná la palabra argentina en 6 intentos o menos.
              </Text>
              
              <Text style={styles.textoModal}>
                🔤 <Text style={styles.textoModalBold}>Reglas:</Text>
                {'\n'}• Cada intento debe ser una palabra de 5 letras
                {'\n'}• Las palabras son argentinismos y lunfardo
                {'\n'}• Después de cada intento, los colores te guían:
              </Text>
              
              <View style={styles.ejemploColores}>
                <View style={[styles.ejemploCelda, { backgroundColor: colors.correct }]}>
                  <Text style={styles.ejemploLetra}>T</Text>
                </View>
                <Text style={styles.textoEjemplo}>Verde: Letra correcta en posición correcta</Text>
              </View>
              
              <View style={styles.ejemploColores}>
                <View style={[styles.ejemploCelda, { backgroundColor: colors.present }]}>
                  <Text style={styles.ejemploLetra}>A</Text>
                </View>
                <Text style={styles.textoEjemplo}>Amarillo: Letra correcta en posición incorrecta</Text>
              </View>
              
              <View style={styles.ejemploColores}>
                <View style={[styles.ejemploCelda, { backgroundColor: colors.absent }]}>
                  <Text style={styles.ejemploLetra}>R</Text>
                </View>
                <Text style={styles.textoEjemplo}>Gris: Letra no está en la palabra</Text>
              </View>
              
              <Text style={styles.textoModal}>
                🇦🇷 <Text style={styles.textoModalBold}>Ejemplos de palabras:</Text>
                {'\n'}TANGO, ASADO, BIRRA, PIBE, MINA, BONDI, LABUR, GUITA, MATE, DULCE
              </Text>
              
              <Text style={styles.textoModalPequeno}>
                💡 Consejo: Si no conocés una palabra, ¡jugá igual! Así aprendés lunfardo argentino.
              </Text>
            </ScrollView>
            
            <TouchableOpacity
              onPress={() => setMostrarAyuda(false)}
              style={styles.botonCerrarModal}
            >
              <Text style={styles.textoCerrarModal}>¡Dale, a jugar!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (colors, isDark) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    flex: 1,
  },
  botonVolver: {
    padding: 8,
    width: 40,
  },
  botonesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    justifyContent: 'flex-end',
  },
  botonAyuda: {
    padding: 8,
    marginRight: 8,
  },
  botonTema: {
    padding: 8,
    marginRight: 8,
  },
  botonReiniciar: {
    padding: 8,
  },
  tablero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 350,
    marginBottom: 25,
    paddingTop: 10,
  },
  fila: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  celda: {
    width: (width - 60) / 5,
    height: (width - 60) / 5,
    maxWidth: 60,
    maxHeight: 60,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3b4252',
    borderRadius: 4,
  },
  letraCelda: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDark ? '#ffffff' : '#2e3440',
  },
  teclado: {
    paddingHorizontal: 8,
    paddingBottom: 30,
    paddingTop: 20,
  },
  filaTeclado: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  tecla: {
    minWidth: Math.max(32, (width - 80) / 11),
    height: 50,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  teclaEspecial: {
    minWidth: Math.max(60, (width - 80) / 7),
    paddingHorizontal: 12,
  },
  textoTecla: {
    fontSize: 16,
    fontWeight: '700',
    color: isDark ? '#ffffff' : '#2e3440',
  },
  textoTeclaEspecial: {
    fontSize: 13,
    fontWeight: '600',
  },
  info: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  textoInfo: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 5,
  },
  // Estilos del modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  tituloModal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  textoModal: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 15,
    lineHeight: 24,
  },
  textoModalBold: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  textoModalPequeno: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 10,
  },
  ejemploColores: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ejemploCelda: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 10,
  },
  ejemploLetra: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e3440',
  },
  textoEjemplo: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  botonCerrarModal: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  textoCerrarModal: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WordleArgentino;
