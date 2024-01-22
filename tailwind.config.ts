import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        navy: {
          700: "#1f3641",
          900: '#1a2a33'
        },
        silver: {
          100: '#a8bfc9',
          "hover": '#dbe8ed'
        },
        primary: "#31c3bd",
        primaryHover: "#65e9e4",
        secondary: "#f2b137",
        secondaryHover: "#ffc860"
      }
    },
  },
  plugins: [],
}
export default config
