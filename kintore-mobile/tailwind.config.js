/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // ✅ 「./app」から始める
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ ここはOK
    "./screens/**/*.{js,ts,jsx,tsx}",    // ✅ 画面ファイルが screens にあるなら追加！
    "./App.{js,ts,jsx,tsx}",             // ✅ App.js/ts にもclassName使うなら追加！
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
