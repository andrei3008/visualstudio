import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2rem',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: {
          50: '#eef9ff',
          100: '#d8f1ff',
          200: '#b6e6ff',
          300: '#84d6ff',
          400: '#40bfff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e'
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f8fafc',
          border: '#e2e8f0'
        }
      },
      borderRadius: {
        lg: '14px',
        xl: '18px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.1)',
        card: '0 1px 2px rgba(16,24,40,.06), 0 8px 24px rgba(16,24,40,.08)'
      }
    }
  }
}
