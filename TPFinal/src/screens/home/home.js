// src/screens/home/home.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "../../styles/homeStyles"; // crearemos esto ahora

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={homeStyles.container}>
      <Image
        source={require("../../../assets/logo.png")} // usá un logo simple por ahora
        style={homeStyles.logo}
        resizeMode="contain"
      />
      <Text style={homeStyles.title}>Wordle Argentino 🇦🇷</Text>
      <TouchableOpacity
        style={homeStyles.playButton}
        onPress={() => navigation.navigate("Game")}
      >
        <Text style={homeStyles.playButtonText}>¡Jugar!</Text>
      </TouchableOpacity>
    </View>
  );
}
