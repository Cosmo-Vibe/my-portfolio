import React from 'react';

const Taskbar = ({ apps, onAppClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex items-center p-2">
      <button className="mr-2">Start</button>
      {apps.map((app, index) => (
        <button key={index} className="mr-2" onClick={() => onAppClick(app)}>
          {app.icon}
        </button>
      ))}
    </div>
  );
};

export default Taskbar;
