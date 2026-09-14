import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStudentData, saveStudentData as saveToStorage, getVideo } from '../utils/storage';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [studentData, setStudentState] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const loadData = () => {
      const data = getStudentData();
      if (data) {
        setStudentState(data);
      }
    };
    loadData();
    loadVideo();
  }, []);

  const loadVideo = async () => {
    const videoBlob = await getVideo();
    if (videoBlob) {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
      const url = URL.createObjectURL(videoBlob);
      setVideoUrl(url);
    } else {
      setVideoUrl(null);
    }
  };

  const setStudentData = (data) => {
    setStudentState(data);
    saveToStorage(data);
  };

  return (
    <StudentContext.Provider value={{ studentData, setStudentData, videoUrl, loadVideo }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
