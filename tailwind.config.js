module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Incluir arquivos .js, .ts, .jsx, .tsx na pasta src
    './src/app/**/*.{js,ts,jsx,tsx}', // Incluir arquivos dentro da pasta app
    './src/components/**/*.{js,ts,jsx,tsx}', // Incluir componentes
    './src/styles/**/*.css',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
