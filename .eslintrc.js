module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 'off'
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}
