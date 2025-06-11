# TPFinal - Aplicación React Native con Expo

## Descripción

Aplicación móvil desarrollada con React Native y Expo para el trabajo práctico final.

## Requisitos previos

- Node.js (versión 18 o superior)
- npm o yarn
- Expo CLI (se instalará automáticamente)
- Para pruebas en dispositivo físico: Expo Go app

## Instalación

### 1. Clonar el repositorio

```bash
git clone <https://github.com/TomasMartin2004/Aplicaciones-moviles-4.git>
cd TPFinal
```

### 2. Instalar dependencias

```bash
npm install
```

## Ejecutar la aplicación

### Opción 1: Servidor de desarrollo

```bash
npm start
```

Este comando abrirá Expo DevTools en el navegador con un código QR.

### Opción 2: Ejecutar en plataforma específica

```bash
# Para Android
npm run android

# Para iOS (solo en macOS)
npm run ios

# Para web
npm run web
```

## Probar en dispositivo móvil

### Android/iOS

1. Instala la app "Expo Go" desde Google Play Store o App Store
2. Ejecuta `npm start` en la terminal
3. Escanea el código QR que aparece en la terminal o en el navegador
4. La app se cargará automáticamente

### Emulador

- **Android**: Asegurar de tener Android Studio instalado y un emulador configurado
- **iOS**: Requiere Xcode en macOS
