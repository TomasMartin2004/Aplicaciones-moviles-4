# Wordle Argentino 🇦🇷

Wordle con temática argentina, desarrollado en React Native para Expo.

## Características

### 🎯 Juego
- **Palabras argentinas**: Diccionario de argentinismos y lunfardo de 5 letras
- **Mecánica original**: Igual que Wordle - 6 intentos para adivinar la palabra
- **Feedback visual**: Sistema de colores Nord (verde, amarillo, gris)
- **Teclado virtual mejorado**: Teclas más grandes, incluye letra Ñ
- **Tema claro/oscuro**: Cambia manualmente con botón o sigue el sistema
- **Ayuda integrada**: Modal explicativo con ejemplos
- **Interfaz responsive**: Se adapta a diferentes tamaños de pantalla

### 🔧 Tecnología
- **React Native**: Compatible con Expo Go
- **Navigation**: Integrado con React Navigation
- **Firebase**: Sistema de autenticación completo
- **Paleta Nord**: Colores consistentes en tema claro y oscuro
- **Lucide React Native**: Iconos modernos y consistentes
- **AsyncStorage**: Persistencia de preferencias de tema
- **Cross-platform**: Funciona en iOS, Android y Web

## Cómo Jugar

1. **Objetivo**: Adivinar la palabra argentina en 6 intentos o menos
2. **Reglas**:
   - Cada intento debe ser una palabra de 5 letras
   - Las palabras son argentinismos y lunfardo
   - Después de cada intento, los colores te guían:
     - 🟩 **Verde**: Letra correcta en posición correcta
     - 🟨 **Amarillo**: Letra correcta en posición incorrecta
     - ⬜ **Gris**: Letra no está en la palabra

## Controles

### 🎮 En el Juego
- **Teclado virtual**: Toca las letras para escribir
- **ENTER**: Enviar intento
- **Icono Delete**: Eliminar última letra
- **Icono Refresh**: Empezar nueva partida
- **Icono Help**: Ver instrucciones y ejemplos
- **Icono Sun/Moon**: Cambiar entre modo claro y oscuro
- **Icono Arrow Left**: Volver a la pantalla principal

### 🏠 En la Pantalla Principal
- **Icono Sun/Moon**: Cambio manual de tema (claro/oscuro/sistema)
- **Icono Play**: Navegar al Wordle Argentino
- **Icono LogOut**: Cerrar sesión y volver al login

## Palabras Incluidas

### Ejemplos de Lunfardo:
- AFANO (robo), BIRRA (cerveza), BONDI (colectivo)
- CHETO (fifi), FIACA (pereza), GARCA (traidor)
- GUITA (dinero), LABUR (trabajo), MANGO (peso)
- PIBE (chico), TRUCHO (falso), YUTA (policía)

### Ejemplos de Cultura Argentina:
- ASADO, MATE, DULCE, EMPAN, TANGO
- DIEGO, MESSI, RIVER, BOCA

### Expresiones Típicas:
- CHABON, LOCO, NEGRO, FLACO, WACHO

## Instalación y Ejecución

### Requisitos Previos
- Node.js instalado
- Expo CLI global: `npm install -g @expo/cli`
- Expo Go app en tu dispositivo móvil

### Pasos para ejecutar:

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar la aplicación (COMANDO PRINCIPAL)
npx expo start

# Alternativas:
# Ejecutar directamente en Android
npx expo start --android

# Ejecutar directamente en iOS  
npx expo start --ios

# Ejecutar en web
npx expo start --web
```

### Notas importantes:
- **Usa `npx expo start`** como comando principal para ejecutar la app
- Compatible con **Expo Go** - escanea el QR code desde tu dispositivo

## Funcionalidades Implementadas

- [x] Lógica de juego completa
- [x] Diccionario de palabras argentinas
- [x] Interfaz minimalista con paleta Nord
- [x] Iconos modernos con Lucide React Native
- [x] Sistema de feedback visual
- [x] Cambio de tema claro/oscuro manual
- [x] Modal de ayuda
- [x] Integración con navegación existente
- [x] Compatibilidad con Firebase Auth
- [x] Responsive design
- [x] Compatible con Expo Go

## Mejoras Visuales Implementadas

### 🎨 Interfaz Mejorada
- **Separación clara**: El teclado ya no se superpone con las casillas del juego
- **Paleta Nord consistente**: Colores unificados en toda la aplicación
- **Pantalla de bienvenida renovada**: Diseño moderno con iconos y paleta Nord
- **Contraste mejorado**: Texto blanco en modo oscuro para mejor legibilidad

### 🌙 Sistema de Temas
- **Tema automático**: Sigue las preferencias del sistema
- **Cambio manual**: Iconos Sun/Moon para alternar entre claro y oscuro
- **Persistencia**: Recuerda tu preferencia de tema
- **Paleta Nord**: Colores profesionales y consistentes
- **Contraste optimizado**: Mejor visibilidad en ambos modos

### 📱 Responsive Design
- **Adaptable**: Funciona en diferentes tamaños de pantalla
- **Teclas escalables**: El teclado se ajusta automáticamente
- **Espaciado optimizado**: Mejor distribución del espacio
- **Iconos escalables**: Se adaptan al contexto y tamaño

## Tecnologías Utilizadas

- **React Native**: 0.79.4
- **Expo**: ~53.0.12
- **React Navigation**: ^6.1.6
- **Firebase**: ^9.6.11
- **Lucide React Native**: Para iconos modernos y consistentes
- **AsyncStorage**: Para persistencia local
- **Paleta Nord**: Sistema de colores profesional

## Licencia

Proyecto educativo - UTN FRLP - Aplicaciones Móviles
