module.exports = {
  parser: "babel-eslint",
  extends: [
    "airbnb-base",
    "plugin:jest/recommended",
    "plugin:you-dont-need-momentjs/recommended"
  ],
  plugins: [
    "import",
    "jest",
    "babel",
    "spellcheck",
    "html",
    "no-async-without-await"
  ],
  env: {
    node: true,
    "jest/globals": true
  },
  rules: {
    "no-unused-expressions": 0,
    "babel/no-unused-expressions": 2,
    "no-async-without-await/no-async-without-await": 2,
    "no-unused-vars": 0
  }
};
