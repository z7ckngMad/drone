/** REFLY FPV — Tailwind config. Colours and fonts point at the CSS tokens in src/styles.css. */
module.exports = {
  content: ['./src/body.html', './src/main.js', './src/viewer3d.js'],
  theme: {
    extend: {
      colors: {
        carbon: 'var(--carbon)',
        airframe: 'var(--airframe)',
        rotor: 'var(--rotor)',
        ghost: 'var(--ghost)',
        haze: 'var(--haze)',
        strobe: 'var(--strobe)',
        card: 'var(--card)',
        ink: 'var(--ink)',
        ember: 'var(--ember)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      maxWidth: { page: '1320px' },
    },
  },
  plugins: [],
};
