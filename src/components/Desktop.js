import React from 'react';
import DesktopIcon from './DesktopIcon';

const desktopItems = [
  {
    type: 'folder',
    label: 'My Projects',
    content: [
      {
        type: 'code',
        label: 'React Project.js',
        language: 'javascript',
        content: `// My React Project
import React from 'react';

const App = () => {
  return (
    <div>Hello World</div>
  );
};

export default App;`
      },
      {
        type: 'pdf',
        label: 'Resume.pdf',
        content: '/path/to/your/resume.pdf' // Add your actual PDF file path
      },
      { type: 'file', label: 'Portfolio.pdf' },
      { type: 'folder', label: 'Source Code', content: [
        { type: 'file', label: 'main.js' },
        { type: 'file', label: 'styles.css' }
      ]}
    ]
  },
  {
    type: 'folder',
    label: 'About Me',
    content: [
      { type: 'file', label: 'Resume.pdf' },
      { type: 'file', label: 'Contact.txt' }
    ]
  },
  {
    type: 'folder',
    label: 'Skills',
    content: [
      { type: 'file', label: 'Programming.txt' },
      { type: 'file', label: 'Tools.txt' },
      { type: 'file', label: 'Languages.txt' }
    ]
  },
  {
    type: 'file',
    label: 'Welcome.txt'
  },
  {
    type: 'file',
    label: 'Contact Me.txt'
  }
];

const Desktop = ({ icons, handleIconClick }) => {
  return (
    <div className="desktop relative">
      <div className="icons-container">
        {icons.map((icon, index) => (
          <DesktopIcon
            key={`desktop-icon-${index}`}
            icon={icon.type}
            label={icon.label}
            onDoubleClick={() => handleIconClick(icon)}
          />
        ))}
      </div>
    </div>
  );
};

export default Desktop;