import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./src/utils/themeContext";
import AuthNavigator from "./src/navigation/AuthNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
