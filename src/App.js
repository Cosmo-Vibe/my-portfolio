import React, { useState } from 'react';
import './App.css';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import DesktopIcon from './components/DesktopIcon';

function App() {
  const [windows, setWindows] = useState([]);
  const [theme, setTheme] = useState('light');
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [lastWindowPosition, setLastWindowPosition] = useState({ x: 50, y: 50 });
  const [pinnedApps] = useState([
    { title: 'File Explorer', icon: 'Folder', type: 'folder', showLabel: false },
    { title: 'Browser', icon: 'Browser', showLabel: false }
  ]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [maxZIndex, setMaxZIndex] = useState(1);

  const folderStructure = {
    'This PC': {
      type: 'folder',
      children: {
        'Desktop': {
          type: 'folder',
          children: {
            'workspace': { type: 'folder', children: {} },
            'shortcuts': { type: 'folder', children: {} }
          }
        },
        'Documents': {
          type: 'folder',
          children: {
            'Projects': {
              type: 'folder',
              children: {
                'React': { type: 'folder', children: {} },
                'portfolio.md': { type: 'file', content: '# Portfolio\n\nMy web development journey...' }
              }
            },
            'Work': { 
              type: 'folder',
              children: {
                'reports': { type: 'folder', children: {} },
                'presentations': { type: 'folder', children: {} }
              }
            }
          }
        },
        'Pictures': {
          type: 'folder',
          children: {
            'Screenshots': { type: 'folder', children: {} },
            'Wallpapers': { type: 'folder', children: {} }
          }
        },
        'Downloads': {
          type: 'folder',
          children: {
            'setup.exe': { type: 'file', content: 'Application installer' },
            'document.pdf': { type: 'file', content: 'PDF Document' }
          }
        },
        'Music': {
          type: 'folder',
          children: {
            'Playlists': { type: 'folder', children: {} },
            'Albums': { type: 'folder', children: {} }
          }
        },
        'Videos': {
          type: 'folder',
          children: {
            'Recordings': { type: 'folder', children: {} },
            'Movies': { type: 'folder', children: {} }
          }
        }
      }
    }
  };

  const openWindow = (app, parentPosition = null) => {
    if (app.title === 'Browser') {
      window.open('https://www.google.com', '_blank');
      return;
    }

    // Check if window already exists
    const existingWindow = windows.find(w => w.title === app.title);
    if (existingWindow) {
      focusWindow(app.title);
      return;
    }

    const offset = 30;
    const newPosition = parentPosition 
      ? { 
          x: parentPosition.x + offset, 
          y: parentPosition.y + offset 
        }
      : { 
          x: lastWindowPosition.x + offset, 
          y: lastWindowPosition.y + offset 
        };

    // Ensure window stays in viewport
    const maxX = window.innerWidth - 400; // 400 is default window width
    const maxY = window.innerHeight - 300; // 300 is default window height
    
    newPosition.x = Math.min(newPosition.x, maxX);
    newPosition.y = Math.min(newPosition.y, maxY);

    if (newPosition.x > maxX - 100) newPosition.x = 50;
    if (newPosition.y > maxY - 100) newPosition.y = 50;

    setLastWindowPosition(newPosition);

    const maxZ = Math.max(...windows.map(w => w.zIndex || 0));
    const newWindow = {
      title: app.title,
      type: app.type,
      icon: app.icon,
      position: newPosition,
      zIndex: maxZ + 1,
      isMinimized: false
    };

    if (app.type === 'folder') {
      newWindow.content = (
        <FolderView 
          structure={app.children} 
          onOpen={(childApp) => openWindow(childApp, newPosition)} 
        />
      );
    } else if (app.type === 'file') {
      newWindow.content = <FileView content={app.content} />;
    }

    setWindows(prev => [...prev, newWindow]);
    setActiveWindow(app.title);
  };

  const focusWindow = (title) => {
    setMaxZIndex(prev => prev + 1);
    setWindows(prev => prev.map(w => ({
      ...w,
      zIndex: w.title === title ? maxZIndex + 1 : w.zIndex,
      isMinimized: w.title === title ? false : w.isMinimized
    })));
    setActiveWindow(title);
  };

  const closeWindow = (index) => {
    setWindows(prev => prev.filter((_, i) => i !== index));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleWindow = (title) => {
    setWindows(prev => {
      const targetWindow = prev.find(w => w.title === title);
      if (targetWindow?.isMinimized) {
        // When restoring, bring to front
        const maxZ = Math.max(...prev.map(w => w.zIndex || 0));
        return prev.map(w => ({
          ...w,
          isMinimized: w.title === title ? false : w.isMinimized,
          zIndex: w.title === title ? maxZ + 1 : w.zIndex
        }));
      }
      return prev.map(w => ({
        ...w,
        isMinimized: w.title === title ? true : w.isMinimized
      }));
    });
    setActiveWindow(prev => prev === title ? null : title);
  };

  return (
    <div className={`App ${theme}`}>
      <div className="desktop">
        <div className="icons-container">
          <DesktopIcon 
            icon="PC" 
            label="This PC" 
            onDoubleClick={() => openWindow({ 
              title: 'This PC', 
              type: 'folder',
              children: folderStructure['This PC'].children
            })} 
          />
          <DesktopIcon 
            icon="Trash" 
            label="Recycle Bin" 
            onDoubleClick={() => openWindow({ 
              title: 'Recycle Bin',
              type: 'folder',
              children: {}
            })} 
          />
        </div>
        {windows.map((window, index) => (
          <Window 
            key={index} 
            {...window} 
            onClose={() => closeWindow(index)} 
            theme={theme}
            isActive={activeWindow === window.title}
            onFocus={() => focusWindow(window.title)}
          />
        ))}
      </div>
      {isStartMenuOpen && (
        <div className="fixed bottom-12 left-0 w-64 bg-win-taskbar text-white p-4 rounded-t-lg shadow-lg z-50">
          <div className="space-y-2">
            {pinnedApps.map((app, index) => (
              <button 
                key={index}
                className="w-full text-left px-4 py-2 hover:bg-white/10 rounded flex items-center"
                onClick={() => {
                  openWindow(app);
                  setIsStartMenuOpen(false);
                }}
              >
                <span className="mr-2">{app.icon}</span>
                {app.title}
              </button>
            ))}
            <hr className="border-white/20 my-2" />
            <button className="w-full text-left px-4 py-2 hover:bg-white/10 rounded">
              Settings
            </button>
          </div>
        </div>
      )}
      <Taskbar 
        apps={windows}
        pinnedApps={pinnedApps}
        isStartMenuOpen={isStartMenuOpen}
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        onAppClick={toggleWindow}
        onPinnedAppClick={openWindow}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
    </div>
  );
}

const FolderView = ({ structure, onOpen }) => {
  if (!structure || typeof structure !== 'object') {
    return <div>Empty folder</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {Object.entries(structure).map(([name, item]) => (
        <DesktopIcon 
          key={name}
          icon={item.type === 'folder' ? 'Folder' : 'File'}
          label={name}
          onDoubleClick={() => onOpen({ 
            title: name, 
            type: item.type,
            children: item.children,
            content: item.content
          })}
        />
      ))}
    </div>
  );
};

const FileView = ({ content }) => (
  <div className="p-4 whitespace-pre-wrap">
    {content}
  </div>
);

export default App;
