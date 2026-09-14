import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import QrScanner from '../components/QrScanner';
import VideoPlayer from '../components/VideoPlayer';
import { useStudent } from '../context/StudentContext';

const Scanner = () => {
  const navigate = useNavigate();
  const { videoUrl } = useStudent();
  const [showVideo, setShowVideo] = useState(false);

  const handleScan = () => {
    // When ANY QR is scanned, immediately show the video player in-place
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    navigate('/');
  };

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
      {!showVideo && (
        <>
          <div className="absolute top-0 left-0 w-full p-4 z-20">
            <button 
              onClick={() => navigate(-1)} 
              className="bg-black/50 text-white p-2 rounded-full backdrop-blur-sm"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          
          <QrScanner onScan={handleScan} />
        </>
      )}

      {showVideo && (
        <VideoPlayer 
          videoUrl={videoUrl} 
          onClose={handleCloseVideo} 
        />
      )}
    </div>
  );
};

export default Scanner;
