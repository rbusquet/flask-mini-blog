module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "import"],
  overrides: [
    {
      files: ["*store.js"],
      rules: {
        "no-param-reassign": [
          "error",
          {
            props: true,
            ignorePropertyModificationsFor: ["state"]
          }
        ]
      }
    }
  ]
};
