module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/utils': './src/utils',
          '@/components': './src/components',
          '@/pages': './src/pages',
          '@/models': './src/models',
          '@/assets': './src/assets',
          '@/navigator': './src/navigator',
          '@/config': './src/config',
        },
      },
    ],
  ],
};
