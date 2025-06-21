import { Alert } from "react-native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { getFirebaseAuth } from "../config/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Funciones de validación
export const validateLoginForm = (email, password, setErrors) => {
  const newErrors = {};

  if (!email) {
    newErrors.email = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Por favor, ingresa un email válido";
  }

  if (!password) {
    newErrors.password = "La contraseña es obligatoria";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const validateRegisterForm = (
  email,
  password,
  confirmPassword,
  setErrors
) => {
  const newErrors = {};

  if (!email) {
    newErrors.email = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Por favor, ingresa un email válido";
  }

  if (!password) {
    newErrors.password = "La contraseña es obligatoria";
  } else if (password.length < 6) {
    newErrors.password = "La contraseña debe tener al menos 6 caracteres";
  } else if (!/[A-Z]/.test(password)) {
    newErrors.password =
      "La contraseña debe contener al menos una letra mayúscula";
  } else if (!/[0-9]/.test(password)) {
    newErrors.password = "La contraseña debe contener al menos un número";
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = "Por favor, confirma tu contraseña";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Las contraseñas no coinciden";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// Login con Firebase
export const handleLogin = async (
  email,
  password,
  setErrors,
  setLoading,
  navigation
) => {
  if (!validateLoginForm(email, password, setErrors)) {
    return;
  }

  try {
    setLoading(true);
    
    const auth = getFirebaseAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
    const user = userCredential.user;
    
    // Guardar información de sesión
    await AsyncStorage.setItem('userSession', JSON.stringify({ 
      email: user.email,
      uid: user.uid,
      provider: 'firebase'
    }));
    
    setErrors({});
    Alert.alert("Éxito", "Inicio de sesión exitoso");
    navigation.navigate("Home");
    
  } catch (error) {
    
    let errorMessage = "Ocurrió un error durante el inicio de sesión";
    
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "El email no es válido";
        setErrors({ email: errorMessage });
        break;
      case "auth/user-disabled":
        errorMessage = "Esta cuenta ha sido deshabilitada";
        break;
      case "auth/user-not-found":
        errorMessage = "No existe una cuenta con este email";
        setErrors({ email: errorMessage });
        break;
      case "auth/wrong-password":
        errorMessage = "Contraseña incorrecta";
        setErrors({ password: errorMessage });
        break;
      case "auth/invalid-credential":
      case "auth/invalid-login-credentials":
        errorMessage = "Email o contraseña incorrectos";
        setErrors({
          email: errorMessage,
          password: errorMessage,
        });
        break;
      case "auth/too-many-requests":
        errorMessage = "Demasiados intentos fallidos. Por favor, intenta más tarde";
        break;
      case "auth/network-request-failed":
        errorMessage = "Error de conexión. Verifica tu conexión a internet";
        break;
      default:
        errorMessage = "Error al iniciar sesión. Por favor, intenta de nuevo";
    }
    
    Alert.alert("Error", errorMessage);
  } finally {
    setLoading(false);
  }
};

// Registro con Firebase
export const handleRegister = async (
  email,
  password,
  confirmPassword,
  setErrors,
  setLoading,
  navigation
) => {
  if (!validateRegisterForm(email, password, confirmPassword, setErrors)) {
    return;
  }

  try {
    setLoading(true);
    
    const auth = getFirebaseAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const user = userCredential.user;
    
    setErrors({});
    Alert.alert("Éxito", "Registro exitoso. Ahora puedes iniciar sesión.");
    navigation.navigate("Login");
    
  } catch (error) {
    
    let errorMessage = "Ocurrió un error durante el registro";
    
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Este email ya está registrado";
        setErrors({ email: errorMessage });
        break;
      case "auth/invalid-email":
        errorMessage = "El email no es válido";
        setErrors({ email: errorMessage });
        break;
      case "auth/operation-not-allowed":
        errorMessage = "El registro con email y contraseña no está habilitado";
        break;
      case "auth/weak-password":
        errorMessage = "La contraseña es muy débil. Debe tener al menos 6 caracteres";
        setErrors({ password: errorMessage });
        break;
      case "auth/network-request-failed":
        errorMessage = "Error de conexión. Verifica tu conexión a internet";
        break;
      default:
        errorMessage = "Error al registrar usuario. Por favor, intenta de nuevo";
    }
    
    Alert.alert("Error", errorMessage);
  } finally {
    setLoading(false);
  }
};

// Logout con Firebase
export const handleLogout = async () => {
  try {
    const auth = getFirebaseAuth();
    
    if (auth.currentUser) {
      await signOut(auth);
    }
    
    await AsyncStorage.removeItem('userSession');
    return true;
  } catch (error) {
    // Aún así, limpiar la sesión local
    await AsyncStorage.removeItem('userSession');
    return true;
  }
};

// Verificación de sesión con Firebase
export const checkUserSession = async () => {
  try {
    
    // Primero verificar la sesión local
    const localSession = await AsyncStorage.getItem('userSession');
    
    if (localSession) {
      const session = JSON.parse(localSession);
      
      // Si hay una sesión de Firebase, verificar el usuario actual
      if (session.provider === 'firebase') {
        const auth = getFirebaseAuth();
        const currentUser = auth.currentUser;
        
        if (currentUser && currentUser.email === session.email) {
          return {
            ...session,
            firebaseUser: currentUser
          };
        }
      }
      
      return session;
    }
    
    // Si no hay sesión local pero Firebase tiene un usuario, sincronizar
    const auth = getFirebaseAuth();
    if (auth.currentUser) {
      const user = auth.currentUser;
      const session = {
        email: user.email,
        uid: user.uid,
        provider: 'firebase'
      };
      
      // Guardar la sesión localmente
      await AsyncStorage.setItem('userSession', JSON.stringify(session));
      
      return session;
    }
    
    return null;
  } catch (error) {
    return null;
  }
}; 