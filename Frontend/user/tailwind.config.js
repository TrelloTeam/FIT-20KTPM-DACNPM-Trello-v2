/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxHeight: {
        '90vh': '90vh',
      },

      width: {
        'w-104': '26rem',
        '256': '256px',
      },

      willChange: {
        'maxh': 'max-height',
      },

      boxShadow: {
        'main-card-highlight': '0px 1px 1px #091e4240, 0px 0px 1px #091e424f;',
      },

      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '50%': '50%',
        '16': '4rem',
        'card-highlight': '100% 40px, cover',
      },

      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'bg-5': '0.05s background-color',
        'comment-text-container': "height .2s ease-in-out",
      },

      borderRadius: {
        '50percent': '50%',
        '100percent': '100%',
      }


    }
  },
  plugins: []
}
