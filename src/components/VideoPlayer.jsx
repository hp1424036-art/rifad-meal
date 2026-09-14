import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import defaultVideo from '../assets/video.mp4';

const VideoPlayer = ({ videoUrl, onClose }) => {
  const videoRef = useRef(null);
  const sourceToPlay = videoUrl || defaultVideo;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If auto-play with audio is restricted by WebView, mute and play
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(console.error);
          }
        });
      }
    }
  }, [sourceToPlay]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <button 
        onClick={onClose}
        className="absolute top-6 left-6 p-3 z-20 text-white bg-black/60 rounded-full hover:bg-black/80 backdrop-blur-md"
      >
        <X size={26} />
      </button>

      <video 
        ref={videoRef}
        src={sourceToPlay}
        className="w-full h-full object-contain"
        controls
        autoPlay
        playsInline
        webkit-playsinline="true"
        onEnded={onClose}
      />
    </div>
  );
};

export default VideoPlayer;
