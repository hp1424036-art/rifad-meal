import React from 'react';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { useStudent } from '../context/StudentContext';

const VideoResult = () => {
  const navigate = useNavigate();
  const { videoUrl } = useStudent();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="h-screen w-full bg-black">
      <VideoPlayer videoUrl={videoUrl} onClose={handleClose} />
    </div>
  );
};

export default VideoResult;
