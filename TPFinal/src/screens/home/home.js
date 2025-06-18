import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "../../styles/homeStyles";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={homeStyles.container}>
      <Image
        source={require("../../../assets/logo.png")}
        style={homeStyles.logo}
        resizeMode="contain"
      />

      <Text style={homeStyles.title}>Wordle Argentino 🇦🇷</Text>

      <TouchableOpacity
        style={homeStyles.playButton}
        onPress={() => navigation.navigate("Game")}
      >
        <Text style={homeStyles.playButtonText}>Jugar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[homeStyles.playButton, { marginTop: 20 }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={homeStyles.playButtonText}>¿Cómo jugar?</Text>
      </TouchableOpacity>

      {/* Modal con reglas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={homeStyles.modalOverlay}>
          <View style={homeStyles.modalContent}>
            <ScrollView>
              <Text style={homeStyles.modalTitle}>¿Cómo se juega?</Text>
              <Text style={homeStyles.modalText}>
                Wordle Argentino es un juego en el que debés adivinar una palabra secreta de 5 letras.
                Tenés hasta 6 intentos para lograrlo.
                {"\n\n"}
                🔤 Escribí una palabra y enviá tu intento. Cada letra se marcará con un color:
                {"\n\n"}
                🟩 Verde: letra correcta en el lugar correcto.
                {"\n"}
                🟨 Amarillo: letra correcta, pero en lugar incorrecto.
                {"\n"}
                ⬛ Gris: la letra no está en la palabra.
                {"\n\n"}
                🎯 Tu objetivo es descubrir la palabra con lógica y vocabulario.
                {"\n\n"}
                🇦🇷 En esta versión usamos palabras típicas del español. ¡Prestá atención!
              </Text>

              <TouchableOpacity
                style={homeStyles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={homeStyles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
