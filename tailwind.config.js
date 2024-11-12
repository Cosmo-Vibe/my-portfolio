module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { 
    extend: {
      colors: {
        'win-primary': '#0078D4',
        'win-taskbar': '#1E1E1E',
        'win-background': '#F3F3F3',
        'win-text': '#000000',
        'win-inactive': '#666666',
      },
      fontFamily: {
        'segoe': ['Segoe UI', 'Arial', 'sans-serif'],
      },
      opacity: {
        '85': '0.85',
      }
    } 
  },
  plugins: [],
}
