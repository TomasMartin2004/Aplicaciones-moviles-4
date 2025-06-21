const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Agregar soporte para archivos .cjs (requerido por Firebase)
defaultConfig.resolver.sourceExts.push('cjs');

// Deshabilitar package exports que pueden causar problemas con Firebase
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig; 