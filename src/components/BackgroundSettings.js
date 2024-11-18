import React, { useState } from 'react';

const defaultBackgrounds = [
  { type: 'image', url: '/backgrounds/default1.jpg', label: 'Default 1' },
  { type: 'image', url: '/backgrounds/default2.jpg', label: 'Default 2' },
  { 
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    label: 'Sample YouTube Video',
    videoType: 'youtube'
  },
];

const BackgroundSettings = ({ onSelectBackground, currentBackground }) => {
  const [customUrl, setCustomUrl] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fitOption, setFitOption] = useState('cover');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoType, setVideoType] = useState('youtube');

  const validateMedia = async (url, type) => {
    if (type === 'image') {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => reject(new Error('Invalid image URL'));
        img.src = url;
      });
    }
    return Promise.resolve(true); // No validation for embedded videos
  };

  const getVideoEmbedUrl = (url, type) => {
    if (type === 'youtube') {
      const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]+/;
      const match = url.match(youtubeUrlPattern);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${match[1]}`;
      }
    } else if (type === 'dailymotion') {
      const dailymotionRegex = /(?:dailymotion\.com(?:\/video|\/hub)|dai\.ly)\/([0-9a-z]+)(?:[-_](?:[a-z0-9]+)?)?/i;
      const match = url.match(dailymotionRegex);
      if (match) {
        return `https://www.dailymotion.com/embed/video/${match[1]}?autoplay=1&mute=1&controls=0&loop=1`;
      }
    }
    throw new Error('Invalid video URL');
  };

  const handleCustomBackground = async (e) => {
    e.preventDefault();
    const url = videoType === 'image' ? customUrl : videoUrl;
    if (!url) return;

    setError(null);
    setIsLoading(true);

    try {
      if (videoType === 'image') {
        await validateMedia(url, 'image');
        onSelectBackground({ 
          type: 'image', 
          url,
          fit: fitOption,
          loadingPriority: 'eager'
        });
      } else {
        const embedUrl = getVideoEmbedUrl(url, videoType);
        onSelectBackground({
          type: 'video',
          url: embedUrl,
          videoType,
          fit: fitOption,
          loadingPriority: 'lazy'
        });
      }
      setCustomUrl('');
      setVideoUrl('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[var(--win-window-bg)] p-4 rounded-lg">
      <h3 className="text-lg mb-4">Desktop Background</h3>
      
      {/* Fit options */}
      <div className="mb-4">
        <label className="block mb-2">Background Fit:</label>
        <select 
          value={fitOption}
          onChange={(e) => setFitOption(e.target.value)}
          className="w-full p-2 rounded bg-[var(--win-window-bg)] border border-[var(--win-border)]"
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
          <option value="center">Center</option>
        </select>
      </div>

      {/* Existing backgrounds grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {defaultBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 
              ${currentBackground?.url === bg.url ? 'border-blue-500' : 'border-transparent'}
              transition-all duration-200 hover:scale-105`}
            onClick={() => onSelectBackground({ ...bg, fit: fitOption })}
          >
            {bg.type === 'image' ? (
              <img src={bg.url} alt={bg.label} className="w-full h-24 object-cover" />
            ) : (
              <video 
                src={bg.url} 
                className="w-full h-24 object-cover"
                loading="lazy"
                muted 
              />
            )}
            <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1">
              {bg.label}
            </span>
          </div>
        ))}
      </div>

      {/* Custom URL form */}
      <form onSubmit={handleCustomBackground} className="space-y-4">
        <div>
          <select
            value={videoType}
            onChange={(e) => setVideoType(e.target.value)}
            className="w-full p-2 mb-2 rounded bg-[var(--win-window-bg)] border border-[var(--win-border)]"
          >
            <option value="image">Image</option>
            <option value="youtube">YouTube Video</option>
            <option value="dailymotion">Dailymotion Video</option>
          </select>

          {videoType === 'image' ? (
            <input
              type="text"
              placeholder="Enter image URL"
              value={customUrl}
              onChange={(e) => {
                setCustomUrl(e.target.value);
                setError(null);
              }}
              className={`w-full px-2 py-1 border rounded bg-[var(--win-window-bg)] text-[var(--win-text)]
                ${error ? 'border-red-500' : ''}`}
            />
          ) : (
            <input
              type="text"
              placeholder={`Enter ${videoType} video URL`}
              value={videoUrl}
              onChange={(e) => {
                setVideoUrl(e.target.value);
                setError(null);
              }}
              className={`w-full px-2 py-1 border rounded bg-[var(--win-window-bg)] text-[var(--win-text)]
                ${error ? 'border-red-500' : ''}`}
            />
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600
              disabled:opacity-50 disabled:cursor-not-allowed flex items-center`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⭘</span>
                Loading...
              </>
            ) : (
              'Apply'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BackgroundSettings;