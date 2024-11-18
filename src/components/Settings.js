
import React, { useState } from 'react';
import BackgroundSettings from './BackgroundSettings';

const Settings = ({ theme, onThemeChange, onBackgroundChange, currentBackground, config, onConfigChange }) => {
  const [activeTab, setActiveTab] = useState('appearance');

  const tabs = {
    appearance: {
      label: 'Appearance',
      icon: '🎨',
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Theme</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onThemeChange('light')}
                className={`px-4 py-2 rounded ${
                  theme === 'light' ? 'bg-blue-500 text-white' : 'bg-[var(--win-window-bg)] border'
                }`}
              >
                Light ☀️
              </button>
              <button
                onClick={() => onThemeChange('dark')}
                className={`px-4 py-2 rounded ${
                  theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-[var(--win-window-bg)] border'
                }`}
              >
                Dark 🌙
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Font Settings</h3>
            <div className="grid gap-4">
              <div>
                <label className="block mb-2">Font Family</label>
                <select
                  value={config.fontFamily}
                  onChange={(e) => onConfigChange('fontFamily', e.target.value)}
                  className="w-full p-2 rounded bg-[var(--win-window-bg)] border"
                >
                  <option value="segoe">Segoe UI</option>
                  <option value="arial">Arial</option>
                  <option value="helvetica">Helvetica</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Font Size</label>
                <input
                  type="range"
                  min="12"
                  max="20"
                  value={config.fontSize}
                  onChange={(e) => onConfigChange('fontSize', e.target.value)}
                  className="w-full"
                />
                <span className="text-sm">{config.fontSize}px</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Icon Size</h3>
            <input
              type="range"
              min="32"
              max="64"
              value={config.iconSize}
              onChange={(e) => onConfigChange('iconSize', e.target.value)}
              className="w-full"
            />
            <span className="text-sm">{config.iconSize}px</span>
          </div>
        </div>
      )
    },
    background: {
      label: 'Background',
      icon: '🖼️',
      component: <BackgroundSettings onSelectBackground={onBackgroundChange} currentBackground={currentBackground} />
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 border-r border-[var(--win-border)] p-2">
        {Object.entries(tabs).map(([key, { label, icon }]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 
              ${activeTab === key ? 'bg-blue-500 text-white' : 'hover:bg-[var(--win-hover)]'}`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default Settings;