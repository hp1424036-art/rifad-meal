import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const VideoPlayer = ({ videoUrl, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.play().catch(console.error);
    }
  }, [videoUrl]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <button 
        onClick={onClose}
        className="absolute top-6 left-6 p-2 z-10 text-white bg-black/50 rounded-full hover:bg-black/70 backdrop-blur-sm"
      >
        <X size={28} />
      </button>

      {videoUrl ? (
        <video 
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          controls
          autoPlay
          playsInline
          onEnded={onClose}
        />
      ) : (
        <div className="text-center text-white px-6">
          <p className="text-lg">No video configured.</p>
          <p className="text-sm text-gray-400 mt-2">Please upload a video in Setup.</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
