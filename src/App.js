import React from 'react';
import './App.css';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import DesktopIcon from './components/DesktopIcon';

function App() {
  return (
    <div className="App">
      <div className="desktop">
        <DesktopIcon />
        <Window />
      </div>
      <Taskbar />
    </div>
  );
}

export default App;
