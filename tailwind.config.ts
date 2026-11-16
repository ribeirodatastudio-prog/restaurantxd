import type { Config } from 'tailwindcss'

// Cores do tema vêm das variáveis CSS em app/globals.css
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      colors: {
        bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
        surface: 'var(--surface)',
        line: 'var(--border)',
        'line-strong': 'var(--border-strong)',
        ink: 'var(--text)',
        soft: 'var(--text-soft)',
        muted: 'var(--muted)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
      },
    },
  },
}

export default config
