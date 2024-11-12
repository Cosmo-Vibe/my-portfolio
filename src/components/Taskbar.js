import React from 'react';
import { WindowsLogo, SystemIcons } from './WindowsIcons';

const Taskbar = ({ 
  apps, 
  pinnedApps, 
  onAppClick, 
  onPinnedAppClick,
  isStartMenuOpen, 
  onStartClick,
  theme,
  onThemeToggle 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-win-taskbar bg-opacity-85 text-white flex items-center justify-between p-1 h-12">
      <div className="flex items-center">
        <button 
          className={`px-4 hover:bg-white/10 h-full flex items-center ${
            isStartMenuOpen ? 'bg-white/10' : ''
          }`}
          onClick={onStartClick}
        >
          <WindowsLogo />
        </button>
        
        {/* Pinned Apps */}
        {pinnedApps.map((app, index) => (
          <button 
            key={`pinned-${index}`}
            className="px-4 hover:bg-white/10 h-full flex items-center"
            onClick={() => onPinnedAppClick(app)}
            title={app.title}
          >
            <span>{app.icon}</span>
          </button>
        ))}
        
        <div className="w-px h-6 bg-white/20 mx-2" />
        
        {/* Open Windows */}
        {apps.map((app, index) => (
          <button 
            key={`window-${index}`}
            className={`px-4 h-full flex items-center text-sm font-segoe ${
              app.isMinimized ? 'opacity-50' : 'bg-white/10'
            }`}
            onClick={() => onAppClick(app.title)}
          >
            <span className="mr-2">{app.icon}</span>
            <span className="hidden sm:inline">{app.title}</span>
          </button>
        ))}
      </div>
      
      {/* Theme Toggle */}
      <button 
        onClick={onThemeToggle}
        className="px-4 hover:bg-white/10 h-full flex items-center"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default Taskbar;
