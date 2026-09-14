import React from 'react';
import { ArrowRight } from 'lucide-react';

const MealButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full p-4 text-white transition-transform transform bg-gradient-to-r from-[#F26522] to-[#FFD54F] rounded-xl shadow-sm hover:scale-105 active:scale-95"
    >
      <span className="font-bold">{label}</span>
      <ArrowRight size={20} className="opacity-80" />
    </button>
  );
};

export default MealButton;
