module.exports = {
  env: {
    browser: true
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error']
      }
    ]
  }
};
