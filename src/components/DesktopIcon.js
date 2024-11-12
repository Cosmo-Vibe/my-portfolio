import React from 'react';
import { SystemIcons } from './WindowsIcons';

const DesktopIcon = ({ icon, label, onDoubleClick }) => {
  const Icon = SystemIcons[icon] || (() => <div className="text-4xl">{icon}</div>);
  
  return (
    <div 
      className="flex flex-col items-center m-4 p-2 hover:bg-black/5 rounded"
      onDoubleClick={onDoubleClick}
    >
      <Icon />
      <span className="text-sm mt-1 text-center text-win-text">{label}</span>
    </div>
  );
};

export default DesktopIcon;
