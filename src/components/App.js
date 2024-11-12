import React, { useState } from 'react';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import ThemeToggle from './ThemeToggle';

const App = () => {
  const [windows, setWindows] = useState([]);
  const [theme, setTheme] = useState('light');

  const openWindow = (app) => {
    setWindows([...windows, app]);
  };

  const closeWindow = (index) => {
    setWindows(windows.filter((_, i) => i !== index));
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="h-screen bg-win-background font-segoe">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div className="flex flex-wrap p-4">
        <DesktopIcon icon="Folder" label="My Documents" onDoubleClick={() => openWindow({ title: 'My Documents', icon: 'Folder' })} />
        <DesktopIcon icon="Browser" label="Browser" onDoubleClick={() => openWindow({ title: 'Browser', icon: 'Browser' })} />
      </div>
      {windows.map((window, index) => (
        <Window key={index} title={window.title} onClose={() => closeWindow(index)} theme={theme}>
          <div>{window.title} content</div>
        </Window>
      ))}
      <Taskbar apps={windows} onAppClick={openWindow} theme={theme} />
    </div>
  );
};

export default App;
