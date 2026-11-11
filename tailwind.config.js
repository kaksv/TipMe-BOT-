/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bot: {
          background: 'rgb(var(--bot-background) / <alpha-value>)',
          surface: 'rgb(var(--bot-surface) / <alpha-value>)',
          elevated: 'rgb(var(--bot-elevated) / <alpha-value>)',
          border: 'rgb(var(--bot-border) / <alpha-value>)',
          foreground: 'rgb(var(--bot-foreground) / <alpha-value>)',
          muted: 'rgb(var(--bot-muted) / <alpha-value>)',
          accent: 'rgb(var(--bot-accent) / <alpha-value>)',
          'accent-foreground': 'rgb(var(--bot-accent-foreground) / <alpha-value>)',
          danger: 'rgb(var(--bot-danger) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
};