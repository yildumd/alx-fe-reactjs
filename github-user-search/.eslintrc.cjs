module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn"
  }
};