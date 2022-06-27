/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Upheaval", ...defaultTheme.fontFamily.sans],
        sans: ["Helvetica", "Arial", ...defaultTheme.fontFamily.sans],
        body: ["Helvetica", "Arial", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "theme-light-gray": "#FAFAFA",
        "theme-red": "#D8293E",
        "theme-orange": "#FFBE00",
        "theme-dark-orange": "#FFBE00",
        "theme-green": "#2CCB7B",
        "theme-dark-green": "#24965C",
        "theme-blue": "#0B9AD9",
        "theme-dark-blue": "#1887A8",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
