/** @type {import('prettier').Config;} */
module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  trailingComma: 'none',
  printWidth: 100,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve('prettier-plugin-tailwindcss')]
}
