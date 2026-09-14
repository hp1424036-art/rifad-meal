import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStudentData, saveStudentData as saveToStorage, getVideo } from '../utils/storage';

const defaultStudent = {
  name: "Hariprasad S",
  regNo: "12620066",
  photo: "",
  fatherName: "Sukunan K",
  fatherPhone: "9061152169",
  motherName: "Rathna N",
  motherPhone: "9895603769",
  program: "P132-NNL:B.Tech. (CSE - Software Product Engineering)(2026)",
  hostel: "Boys Studios 12- B624-Bed A (Studio Apartment Hot & Cold Air Conditioned 4 Seater (With Pantry))",
  subject1Code: "CSK130",
  subject1Room: "26-304X",
  subject1Time: "09:20-10:10 AM",
  subject2Code: "CSK102",
  subject2Room: "26-304X",
  subject2Time: "11:50-12:40 AM"
};

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [studentData, setStudentState] = useState(() => {
    const saved = getStudentData();
    return (saved && saved.name) ? saved : defaultStudent;
  });
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const saved = getStudentData();
    if (!saved || !saved.name) {
      saveToStorage(defaultStudent);
    }
    loadVideo();
  }, []);

  const loadVideo = async () => {
    try {
      const videoBlob = await getVideo();
      if (videoBlob) {
        if (videoUrl) {
          URL.revokeObjectURL(videoUrl);
        }
        const url = URL.createObjectURL(videoBlob);
        setVideoUrl(url);
      }
    } catch (e) {
      console.warn("Could not load stored video", e);
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
