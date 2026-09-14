import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import VideoPlayer from '../components/VideoPlayer';

const VideoResult = () => {
  const navigate = useNavigate();
  const { videoUrl, loadVideo } = useStudent();

  useEffect(() => {
    loadVideo();
  }, [loadVideo]);

  const handleClose = () => {
    navigate('/');
  };

  if (!videoUrl) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-white text-center">
        <h2 className="text-xl font-bold mb-4">No Video Found</h2>
        <p className="text-gray-400 mb-6">Please upload a scanner video in the setup page.</p>
        <Link 
          to="/setup" 
          className="bg-[#F26522] text-white px-6 py-3 rounded-full font-bold"
        >
          Go to Setup
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black">
      <VideoPlayer videoUrl={videoUrl} onClose={handleClose} />
    </div>
  );
};

export default VideoResult;
