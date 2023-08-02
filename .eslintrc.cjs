module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/vue3-strongly-recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', '.eslintrc-auto-import.json', '.eslintrc-global.json', '@unocss'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 0, // 关闭 any 验证
    'vue/multi-word-component-names': 0 // 关闭组建命名校验
  }
}
