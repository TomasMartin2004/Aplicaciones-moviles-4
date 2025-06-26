import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system'); // 'light', 'dark', 'system'
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    if (themeMode === 'system') {
      setIsDark(systemColorScheme === 'dark');
    } else {
      setIsDark(themeMode === 'dark');
    }
  }, [themeMode, systemColorScheme]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme_preference');
      if (savedTheme) {
        setThemeMode(savedTheme);
      }
    } catch (error) {
      console.log('Error loading theme preference:', error);
    }
  };

  const saveThemePreference = async (theme) => {
    try {
      await AsyncStorage.setItem('theme_preference', theme);
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newMode = isDark ? 'light' : 'dark';
    setThemeMode(newMode);
    saveThemePreference(newMode);
  };

  const setSystemTheme = () => {
    setThemeMode('system');
    saveThemePreference('system');
  };

  // Paleta de colores Nord
  const colors = {
    // Nord Polar Night (oscuro)
    background: isDark ? '#2e3440' : '#eceff4',
    surface: isDark ? '#3b4252' : '#e5e9f0',
    card: isDark ? '#434c5e' : '#d8dee9',
    text: isDark ? '#eceff4' : '#2e3440',
    textSecondary: isDark ? '#d8dee9' : '#4c566a',
    
    // Nord Aurora (acentos)
    correct: '#a3be8c', // Verde
    present: '#ebcb8b', // Amarillo
    absent: isDark ? '#4c566a' : '#d8dee9', // Gris
    
    // Nord Frost (azules)
    primary: '#5e81ac',
    secondary: '#81a1c1',
    accent: '#88c0d0',
    
    // Colores especiales
    success: '#a3be8c',
    warning: '#ebcb8b',
    error: '#bf616a',
    
    // Teclado
    keyBackground: isDark ? '#4c566a' : '#e5e9f0',
    keyPressed: isDark ? '#5e81ac' : '#81a1c1',
  };

  const value = {
    isDark,
    themeMode,
    colors,
    toggleTheme,
    setSystemTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
