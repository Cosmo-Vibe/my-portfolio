# Windows-Style Portfolio

A React-based portfolio website that mimics the Windows operating system interface. Features a fully functional window management system, file explorer, and theme switching capabilities.

## 🖥️ Features

- Windows-like GUI interface
- Draggable and resizable windows
- File system navigation
- Light/Dark theme toggle
- Taskbar with pinned apps
- Start menu
- Window management (minimize, maximize, close)
- Z-index priority handling

## 🛠️ Built With

- React
- Tailwind CSS
- React-Rnd (for draggable/resizable windows)
- Windows UI Fabric (for styling)

## ⚙️ Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## 🚀 Installation

1. Clone the repository

```sh
git clone https://github.com/your-username/windows-style-portfolio.git
cd windows-style-portfolio
```

2. Install dependencies:

```sh
npm install
npm install react-rnd
npm install -D tailwindcss postcss autoprefixer
npm install --save-dev @babel/plugin-proposal-private-property-in-object
```

3. Initialize Tailwind CSS:

```sh
npx tailwindcss init -p
```

4. Create or update your tailwind.config.js:

```js
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
      }
    }
  }
}
```

5. Start the development server:

```sh
npm start
```

## 🎯 Features

- Fully functional window management system
- Draggable and resizable windows
- File system navigation
- Light/Dark theme toggle
- Taskbar with pinned apps
- Start menu
- Window controls (minimize, maximize, close)
- Z-index priority handling

## 🔧 Customization

Adding New Folders
Modify the `folderStructure` object in `App.js` :
```js
const folderStructure = {
  'Your Folder': {
    type: 'folder',
    children: {
      'Your File.txt': { 
        type: 'file', 
        content: 'Your content' 
      }
    }
  }
};
```

Modifying Theme Colors
Update theme variables in `App.css` :
```css
.App.light {
  --win-background: #your-color;
}
```

📱 Responsive Design
The application is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile devices (with limited functionality)

## 🐛 Known Issues

- Some SVG icons might not load properly in older browsers
- Window maximize behavior might vary across different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

N Dramsy Shahm - cosmo_sama@outlook.com Project Link: https://github.com/Cosmo-Vibe/my-portfolio

## 🙏 Acknowledgments

- React Team
- TailwindCSS Team
- React-Rnd library
- Windows UI Design Team for inspiration