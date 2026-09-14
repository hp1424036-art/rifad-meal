import React from 'react';
import { LayoutGrid, BookOpen, FileEdit, List } from 'lucide-react';

const BottomNav = () => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, active: true },
    { id: 'happenings', label: 'Happenings', icon: BookOpen, active: false },
    { id: 'rms', label: 'RMS', icon: FileEdit, active: false },
    { id: 'marks', label: 'View Marks', icon: List, active: false }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex justify-around items-center bg-white border-t border-gray-200 py-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <div 
            key={tab.id}
            className={`flex flex-col items-center justify-center w-full py-2 cursor-pointer ${tab.active ? 'text-[#F26522]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Icon size={24} className="mb-1" />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BottomNav;
