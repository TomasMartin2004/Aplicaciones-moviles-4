import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../utils/themeContext";
import { Sun, Moon } from 'lucide-react-native';
import { handleRegister } from "../../utils/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const { colors, isDark, toggleTheme } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      
      {/* Botón de cambio de tema */}
      <View style={styles.themeButtonContainer}>
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

      <View style={styles.formContainer}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Regístrate para comenzar</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Correo electrónico"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors((prev) => ({ ...prev, email: null }));
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Contraseña"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors((prev) => ({ ...prev, password: null }));
            }}
            secureTextEntry
            editable={!loading}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              errors.confirmPassword && styles.inputError,
            ]}
            placeholder="Confirmar Contraseña"
            placeholderTextColor={colors.textSecondary}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrors((prev) => ({ ...prev, confirmPassword: null }));
            }}
            secureTextEntry
            editable={!loading}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        {errors.password && (
          <Text style={styles.passwordRequirements}>
            La contraseña debe contener:{"\n"}• Al menos 6 caracteres{"\n"}• Una
            letra mayúscula{"\n"}• Un número
          </Text>
        )}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={() =>
            handleRegister(
              email,
              password,
              confirmPassword,
              setErrors,
              setLoading,
              navigation
            )
          }
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("Login")}
          disabled={loading}
        >
          <Text style={styles.linkText}>
            ¿Ya tienes una cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  themeButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  themeButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
  },
  passwordRequirements: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 15,
    marginLeft: 5,
    lineHeight: 18,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  linkText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});
