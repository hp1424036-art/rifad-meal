import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Video, Save, User, Users, BookOpen, Clock } from 'lucide-react';
import { saveStudentData, saveVideo } from '../utils/storage';
import { useStudent } from '../context/StudentContext';

const Setup = () => {
  const navigate = useNavigate();
  const { studentData, setStudentData, loadVideo } = useStudent();

  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    photo: '',
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    motherPhone: '',
    program: '',
    hostel: '',
    subject1Code: '',
    subject1Room: '',
    subject1Time: '',
    subject2Code: '',
    subject2Room: '',
    subject2Time: ''
  });

  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  useEffect(() => {
    if (studentData && Object.keys(studentData).length > 0) {
      setFormData(studentData);
    }
  }, [studentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveStudentData(formData);
    setStudentData(formData);
    if (videoFile) {
      await saveVideo(videoFile);
      await loadVideo();
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-10">
      <div className="bg-[#F26522] text-white p-6 rounded-b-[2rem] shadow-md">
        <h1 className="text-3xl font-bold">LPU Touch</h1>
        <p className="text-orange-100 mt-1">Setup your profile</p>
      </div>

      <form onSubmit={handleSubmit} className="px-4 mt-6 space-y-6">
        {/* Personal Info */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
          <div className="flex items-center gap-2 mb-4 text-[#F26522]">
            <User size={20} />
            <h2 className="font-semibold text-lg">Personal Info</h2>
          </div>
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-[#F26522] flex items-center justify-center overflow-hidden mb-2">
              {formData.photo ? (
                <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera className="text-gray-400" size={32} />
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-xs text-gray-500">Tap to upload photo</span>
          </div>
          
          <div className="space-y-3">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" required />
            <input type="text" name="regNo" value={formData.regNo} onChange={handleChange} placeholder="Registration Number" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" required />
          </div>
        </div>

        {/* Family Info */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
          <div className="flex items-center gap-2 mb-4 text-[#F26522]">
            <Users size={20} />
            <h2 className="font-semibold text-lg">Family Info</h2>
          </div>
          <div className="space-y-3">
            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Father's Name" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" />
            <input type="tel" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} placeholder="Father's Phone" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" />
            <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} placeholder="Mother's Name" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" />
            <input type="tel" name="motherPhone" value={formData.motherPhone} onChange={handleChange} placeholder="Mother's Phone" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" />
          </div>
        </div>

        {/* Academic Info */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
          <div className="flex items-center gap-2 mb-4 text-[#F26522]">
            <BookOpen size={20} />
            <h2 className="font-semibold text-lg">Academic Info</h2>
          </div>
          <div className="space-y-3">
            <input type="text" name="program" value={formData.program} onChange={handleChange} placeholder="Program Name (e.g. B.Tech CSE)" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" />
            <input type="text" name="hostel" value={formData.hostel} onChange={handleChange} placeholder="Hostel Details (e.g. BH-1, Room 101)" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" />
          </div>
        </div>

        {/* Timetable */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
          <div className="flex items-center gap-2 mb-4 text-[#F26522]">
            <Clock size={20} />
            <h2 className="font-semibold text-lg">Timetable</h2>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Subject 1</h3>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input type="text" name="subject1Code" value={formData.subject1Code} onChange={handleChange} placeholder="Code" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" />
              <input type="text" name="subject1Room" value={formData.subject1Room} onChange={handleChange} placeholder="Room" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" />
            </div>
            <input type="text" name="subject1Time" value={formData.subject1Time} onChange={handleChange} placeholder="Time (e.g. 09:00 AM - 10:00 AM)" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" />
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Subject 2</h3>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input type="text" name="subject2Code" value={formData.subject2Code} onChange={handleChange} placeholder="Code" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" />
              <input type="text" name="subject2Room" value={formData.subject2Room} onChange={handleChange} placeholder="Room" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" />
            </div>
            <input type="text" name="subject2Time" value={formData.subject2Time} onChange={handleChange} placeholder="Time (e.g. 10:00 AM - 11:00 AM)" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F26522]" />
          </div>
        </div>

        {/* Scanner Video */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
          <div className="flex items-center gap-2 mb-4 text-[#F26522]">
            <Video size={20} />
            <h2 className="font-semibold text-lg">Scanner Video</h2>
          </div>
          <div className="relative w-full h-40 bg-gray-100 rounded-lg border-2 border-dashed border-[#F26522] flex flex-col items-center justify-center overflow-hidden">
            {videoPreview ? (
              <video src={videoPreview} className="w-full h-full object-cover" controls muted />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <Video size={32} className="mb-2" />
                <span className="text-sm">Upload MP4 Video</span>
              </div>
            )}
            <input 
              type="file" 
              accept="video/mp4" 
              onChange={handleVideoChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-[#F26522] to-[#FFD54F] text-white font-bold text-lg py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Save size={24} />
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default Setup;
