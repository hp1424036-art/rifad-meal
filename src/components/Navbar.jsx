import React from 'react';
import { Menu, Bell, Settings } from 'lucide-react';

const Navbar = ({ title, onMenuClick, showGear, onGearClick }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <button onClick={onMenuClick} className="p-2 text-[#F26522] rounded-full hover:bg-gray-100">
        <Menu size={24} />
      </button>
      
      <h1 className="text-lg font-bold text-gray-800">{title}</h1>
      
      <div className="flex items-center gap-2">
        {showGear && (
          <button onClick={onGearClick} className="p-2 text-gray-600 rounded-full hover:bg-gray-100">
            <Settings size={20} />
          </button>
        )}
        <div className="relative p-2 text-gray-600 cursor-pointer">
          <Bell size={24} />
          <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full">
            8
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
