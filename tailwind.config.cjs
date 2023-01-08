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
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'tv': '2304px',
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
