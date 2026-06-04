/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pips: {
          yellow: '#EDB31D',
          orange: '#C8391A',
          brown: '#4A1C00',
          shell: '#F5F0E8',
        },
        stefan: {
          dark: '#111110',
          charcoal: '#1A1A18',
          card: '#222220',
          muted: '#666660',
          text: '#F0EDE8',
        }
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
