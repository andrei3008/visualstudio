import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
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
        }
      }
    }
  }
}

