import React, { useState } from 'react';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';

const App = () => {
  const [windows, setWindows] = useState([]);

  const openWindow = (app) => {
    setWindows([...windows, app]);
  };

  const closeWindow = (index) => {
    setWindows(windows.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen bg-blue-100">
      <div className="flex flex-wrap">
        <DesktopIcon icon="📁" label="My Documents" onDoubleClick={() => openWindow({ title: 'My Documents' })} />
        <DesktopIcon icon="🌐" label="Browser" onDoubleClick={() => openWindow({ title: 'Browser' })} />
      </div>
      {windows.map((window, index) => (
        <Window key={index} title={window.title} onClose={() => closeWindow(index)}>
          <div>{window.title} content</div>
        </Window>
      ))}
      <Taskbar apps={windows} onAppClick={(app) => openWindow(app)} />
    </div>
  );
};

export default App;
