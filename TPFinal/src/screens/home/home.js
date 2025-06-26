import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../utils/themeContext";
import { Sun, Moon, Play, LogOut, CheckCircle } from 'lucide-react-native';
import { handleLogout, checkUserSession } from "../../utils/auth";

export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const navigation = useNavigation();
  const { colors, isDark, toggleTheme, themeMode } = useTheme();

  const styles = createStyles(colors);

  useEffect(() => {
    const loadUserSession = async () => {
      const session = await checkUserSession();
      if (session) {
        setUserEmail(session.email);
      }
    };
    loadUserSession();
  }, []);

  const onLogout = async () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar Sesión",
          onPress: async () => {
            const success = await handleLogout();
            if (success) {
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      
      {/* Header con botón de tema */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.appTitle}>Wordle Argentino</Text>
        </View>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={toggleTheme}
        >
          {isDark ? (
            <Sun size={20} color={colors.textSecondary} />
          ) : (
            <Moon size={20} color={colors.textSecondary} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>¡Bienvenido!</Text>
          {userEmail ? (
            <Text style={styles.subtitle}>
              Hola, {userEmail}
            </Text>
          ) : null}
          
          <Text style={styles.description}>
            Bienvenido a Wordle Argentino
          </Text>
          
          <View style={styles.statusContainer}>
            <CheckCircle size={16} color={colors.success} />
            <Text style={styles.statusText}>
              Autenticado con Firebase
            </Text>
          </View>
        </View>

        <View style={styles.buttonSection}>
          {/* Botón principal para jugar */}
          <TouchableOpacity
            style={[styles.button, styles.playButton]}
            onPress={() => navigation.navigate('WordleArgentino')}
          >
            <Play size={18} color={colors.background} style={{ marginRight: 8 }} />
            <Text style={styles.playButtonText}>Jugar Wordle Argentino</Text>
          </TouchableOpacity>

          {/* Información sobre el tema */}
          <View style={styles.themeInfo}>
            <Text style={styles.themeInfoText}>
              Tema: {themeMode === 'system' ? 'Sistema' : isDark ? 'Oscuro' : 'Claro'}
            </Text>
          </View>

          {/* Botón de cerrar sesión */}
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={onLogout}
          >
            <LogOut size={16} color={colors.background} style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.card,
  },
  headerLeft: {
    flex: 1,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  themeButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
    marginLeft: 6,
  },
  buttonSection: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  playButton: {
    backgroundColor: colors.primary,
    marginBottom: 25,
  },
  playButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  themeInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  themeInfoText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
