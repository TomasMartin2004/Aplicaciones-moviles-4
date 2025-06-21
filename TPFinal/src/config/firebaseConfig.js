import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  initializeAuth, 
  getReactNativePersistence
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCU9Oz2yphrd_Z4c38bfJcgVPlOsV4XD4w",
  authDomain: "tpfinal-a323d.firebaseapp.com",
  projectId: "tpfinal-a323d",
  storageBucket: "tpfinal-a323d.appspot.com",
  messagingSenderId: "555736246531",
  appId: "1:123456789012:web:1234567890123456789012",
};

// Variables para almacenar la app y auth una vez inicializados
let app = null;
let auth = null;
let initializationAttempted = false;

// Función para inicializar Firebase de manera lazy
export const initializeFirebase = () => {
  if (initializationAttempted) {
    return { app, auth, success: auth !== null };
  }

  initializationAttempted = true;

  try {
    // Inicializar Firebase App solo si no existe
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }

    // Inicializar Auth con manejo de errores
    try {
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
      });
    } catch (error) {
      if (error.code === 'auth/already-initialized') {
        auth = getAuth(app);
      } else {
        auth = getAuth(app);
      }
    }

    return { app, auth, success: true };

  } catch (error) {
    app = null;
    auth = null;
    return { app: null, auth: null, success: false, error };
  }
};

// Función para obtener Firebase Auth (con inicialización lazy)
export const getFirebaseAuth = () => {
  const { auth, success } = initializeFirebase();
  if (!success) {
    throw new Error('Firebase no se pudo inicializar');
  }
  return auth;
};

// Función para verificar si Firebase está disponible
export const isFirebaseAvailable = () => {
  const { success } = initializeFirebase();
  return success;
}; 