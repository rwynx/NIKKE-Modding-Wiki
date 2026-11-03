/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        epic: {
          bg: '#090a0f',
          surface: '#11131a',
          surfaceHover: '#161922',
          card: '#12141c',
          border: 'rgba(255, 255, 255, 0.08)',
          borderSubtle: 'rgba(255, 255, 255, 0.05)',
          borderHover: 'rgba(255, 255, 255, 0.2)',
          cyan: 'rgb(160, 225, 255)',
          mint: 'rgb(95, 227, 103)',
          crimson: '#ff3355',
          gold: '#ffd233',
          muted: '#8b92a5',
          subtext: '#687082'
        }
      },
      fontFamily: {
        sans: ['"SF Pro Display"', '"HarmonyOS Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"SF Pro Display"', '"HarmonyOS Sans"', 'sans-serif'],
        harmony: ['"HarmonyOS Sans"', 'sans-serif'],
        mono: ['"SF Pro Display"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
        epic: '-0.03em',
      }
    },
  },
  plugins: [],
}
