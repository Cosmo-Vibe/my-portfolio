import React, { useState } from 'react';

const Background = ({ background }) => {
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);

  if (!background) return null;

  const commonClasses = `fixed inset-0 w-full h-full transition-opacity duration-300 z-0
    ${isMediaLoaded ? 'opacity-100' : 'opacity-0'}
    object-${background.fit || 'cover'}`;

  if (background.type === 'video') {
    return (
      <div className={commonClasses}>
        <iframe
          src={background.url}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsMediaLoaded(true)}
        />
      </div>
    );
  }

  return (
    <img
      src={background.url}
      alt="Desktop Background"
      loading={background.loadingPriority || 'eager'}
      onLoad={() => setIsMediaLoaded(true)}
      onError={() => setIsMediaLoaded(true)}
      className={commonClasses}
      style={{ 
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
        zIndex: 0
      }}
    />
  );
};

export default Background;