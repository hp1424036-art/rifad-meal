import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import StudentCard from '../components/StudentCard';
import MealButton from '../components/MealButton';

const MessCoupon = () => {
  const navigate = useNavigate();
  const { studentData } = useStudent();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white border-b border-gray-100">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 text-gray-700">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Mess Coupon</h1>
        <button className="text-sm font-medium text-[#F26522]">Meal History</button>
      </div>

      <div className="p-4 flex flex-col items-center">
        {studentData && <StudentCard studentData={studentData} />}

        <h2 className="text-center text-lg font-medium text-gray-700 my-8 px-4">
          Tap on the meal name to scan and avail food.
        </h2>

        <button className="mb-8 border border-gray-300 rounded-full px-6 py-2 text-gray-600 font-medium text-sm flex items-center gap-2">
          <span className="text-yellow-400">⭐</span> RATE US
        </button>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <MealButton label="BreakFast" onClick={() => navigate('/scanner')} />
          <MealButton label="Lunch" onClick={() => navigate('/scanner')} />
          <MealButton label="Dinner" onClick={() => navigate('/scanner')} />
          <MealButton label="Tea" onClick={() => navigate('/scanner')} />
        </div>
      </div>
    </div>
  );
};

export default MessCoupon;
