module.exports = {
  // root: true,
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      "jsx": true,
      "modules": true
    },
    sourceType: "module",
    allowImportExportEverywhere: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  // settings: {
  //   'import/resolver': {
  //      alias: {
  //        map: [['~/*', '../*']],
  //        extensions: ['.ts'],
  //      },
  //    },
  // },
};
