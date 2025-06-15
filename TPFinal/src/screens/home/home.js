import React from "react";
import { View, Text } from "react-native";
import { authStyles } from "../../styles/authStyles";

export default function Home() {
  return (
    <View style={authStyles.container}>
      <View
        style={[
          authStyles.formContainer,
          { justifyContent: "flex-start", paddingTop: 50 },
        ]}
      >
        <Text style={authStyles.title}>Bienvenido al Home</Text>
      </View>
    </View>
  );
}
