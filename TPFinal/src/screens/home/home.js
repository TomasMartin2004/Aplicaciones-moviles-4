import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { authStyles } from "../../styles/authStyles";
import { handleLogout, checkUserSession } from "../../utils/auth";

export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const navigation = useNavigation();

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
    <View style={authStyles.container}>
      <View
        style={[
          authStyles.formContainer,
          { justifyContent: "flex-start", paddingTop: 50 },
        ]}
      >
        <Text style={authStyles.title}>¡Bienvenido!</Text>
        {userEmail ? (
          <Text style={authStyles.subtitle}>
            Hola, {userEmail}
          </Text>
        ) : null}
        
        <Text style={[authStyles.subtitle, { marginTop: 20, fontSize: 16 }]}>
          Bienvenido a la aplicación de TP Final
        </Text>
        
        <Text style={[authStyles.subtitle, { marginTop: 20, fontSize: 14, color: "#27ae60" }]}>
          ✅ Autenticado con Firebase
        </Text>

        <TouchableOpacity
          style={[authStyles.button, { marginTop: 40, backgroundColor: "#e74c3c" }]}
          onPress={onLogout}
        >
          <Text style={authStyles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
