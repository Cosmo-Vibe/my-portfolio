import React from 'react';

const DesktopIcon = ({ icon, label, onDoubleClick }) => {
  return (
    <div className="flex flex-col items-center m-4" onDoubleClick={onDoubleClick}>
      <div className="text-4xl">{icon}</div>
      <span>{label}</span>
    </div>
  );
};

export default DesktopIcon;
