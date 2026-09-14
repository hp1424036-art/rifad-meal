import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';
import TimetableCard from '../components/TimetableCard';
import TileGrid from '../components/TileGrid';

const Dashboard = () => {
  const navigate = useNavigate();
  const { studentData } = useStudent();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!studentData || !studentData.name) {
      navigate('/setup');
    }
  }, [studentData, navigate]);

  if (!studentData || !studentData.name) {
    return null;
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-20">
      <Navbar 
        title="Dashboard" 
        onMenuClick={toggleSidebar} 
        showGear={true}
        onGearClick={() => navigate('/setup')} 
      />
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} studentData={studentData} />

      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Today's Timetable</h2>
          <button className="text-[#F26522] border border-[#F26522] px-3 py-1 rounded-full text-sm font-medium">
            Your Dost
          </button>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
          <TimetableCard 
            code={studentData.subject1Code || 'INT108'}
            room={studentData.subject1Room || '34-201'}
            time={studentData.subject1Time || '09:00 AM - 10:00 AM'}
            status="Not Marked"
          />
          <TimetableCard 
            code={studentData.subject2Code || 'CSE326'}
            room={studentData.subject2Room || '34-202'}
            time={studentData.subject2Time || '10:00 AM - 11:00 AM'}
            status="Upcoming"
          />
        </div>

        <div className="mt-6 mb-2 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Add More Tiles</h2>
          <button className="text-[#F26522] bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl">
            ⊕
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-4">Click on the plus button to add menu grids.</p>

        <TileGrid />
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
