module.exports = {
  env: {
    browser: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'no-console': [
      'error',
      {
        allow: ['warn', 'error']
      }
    ]
  }
};
