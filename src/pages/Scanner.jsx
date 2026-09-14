import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import QrScanner from '../components/QrScanner';

const Scanner = () => {
  const navigate = useNavigate();

  const handleScan = () => {
    navigate('/video');
  };

  return (
    <div className="h-screen w-full bg-black relative">
      <div className="absolute top-0 left-0 w-full p-4 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="bg-black/50 text-white p-2 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft size={24} />
        </button>
      </div>
      
      <QrScanner onScan={handleScan} />
    </div>
  );
};

export default Scanner;
