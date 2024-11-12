import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { WindowControls } from './WindowsIcons';

const Window = ({ title, children, content, onClose, theme, position, zIndex, isActive, onFocus }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const windowRef = useRef(null);

  const defaultPosition = position || {
    x: 50,
    y: 50,
    width: 400,
    height: 300
  };

  const handleMaximize = () => {
    if (!isMaximized && windowRef.current) {
      const element = windowRef.current.resizableElement.current;
      const rect = element.getBoundingClientRect();
      setIsMaximized(true);
    } else {
      setIsMaximized(false);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Rnd
      ref={windowRef}
      default={defaultPosition}
      style={{ 
        display: isMinimized ? 'none' : 'block',
        zIndex: isActive ? 9999 : zIndex || 1
      }}
      onMouseDown={() => onFocus && onFocus()}
      size={isMaximized ? { width: '100%', height: 'calc(100vh - 48px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      minWidth={200}
      minHeight={100}
      bounds="window"
      dragHandleClassName="window-header"
      resizeHandleStyles={{
        top: { cursor: 'n-resize' },
        right: { cursor: 'e-resize' },
        bottom: { cursor: 's-resize' },
        left: { cursor: 'w-resize' },
        topRight: { cursor: 'ne-resize' },
        bottomRight: { cursor: 'se-resize' },
        bottomLeft: { cursor: 'sw-resize' },
        topLeft: { cursor: 'nw-resize' }
      }}
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true
      }}
    >
      <div className={`h-full border border-[var(--win-border)] bg-[var(--win-window-bg)] shadow-lg 
        ${isActive ? 'ring-1 ring-blue-500' : ''}`}>
        <div className={`window-header flex justify-between items-center 
          ${isActive ? 'bg-win-primary' : 'bg-win-inactive'} 
          text-white p-1 cursor-move`}>
          <span className="text-sm font-segoe ml-2">{title}</span>
          <div className="flex">
            <button onClick={handleMinimize} className="px-3 py-1.5 hover:bg-white/10 transition-colors">
              <WindowControls.Minimize />
            </button>
            <button onClick={handleMaximize} className="px-3 py-1.5 hover:bg-white/10 transition-colors">
              <WindowControls.Maximize />
            </button>
            <button 
              onClick={onClose} 
              className="px-3 py-1.5 hover:bg-red-500 transition-colors"
            >
              <WindowControls.Close />
            </button>
          </div>
        </div>
        <div className={`p-4 overflow-auto h-[calc(100%-2rem)] text-[var(--win-text)]`}>
          {content || children}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;
