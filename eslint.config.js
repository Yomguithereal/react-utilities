module.exports = {
  extends: [
    '@yomguithereal/eslint-config/es6',
    '@yomguithereal/eslint-config/react'
  ].map(require.resolve)
};
