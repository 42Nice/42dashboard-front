/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        "background": "#252525",
        "dark-background": "#111111",
        "light-background": "#515151",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
