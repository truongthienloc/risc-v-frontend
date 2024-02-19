import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'highlight': '#fff177',
        'highlight-s1': '#ef5350',
        'highlight-s2': '#fff177',
        'highlight-s3': '#66bb6a',
        'highlight-s4': '#29b6f6',
        'highlight-s5': '#ffa726'
      },
    },
  },
  plugins: [],
}
export default config
