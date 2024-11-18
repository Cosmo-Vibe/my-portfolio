import React from 'react';
import { SystemIcons } from './WindowsIcons';

const DesktopIcon = ({ icon, label, onDoubleClick }) => {
  const Icon = SystemIcons[icon] || (() => <div className="text-4xl">{icon}</div>);
  
  return (
    <div 
      className="flex flex-col items-center p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer"
      onDoubleClick={onDoubleClick}
    >
      <Icon />
      <span className="text-sm mt-1 text-center text-inherit select-none break-words">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
