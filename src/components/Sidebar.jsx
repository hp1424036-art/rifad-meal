import React, { useState } from 'react';
import { Search, X, LayoutGrid, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose, studentData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const showMessItem = 'mess food scanner'.includes(searchQuery.toLowerCase());

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative flex flex-col w-[80%] max-w-[320px] h-full bg-white shadow-xl animate-in slide-in-from-left">
        
        {/* Header Section */}
        <div className="p-6 text-white bg-gradient-to-br from-[#FF6B6B] to-[#F26522]">
          <div className="flex flex-col items-center mt-4">
            <div className="w-20 h-20 mb-3 overflow-hidden bg-gray-200 border-2 border-white rounded-full">
              {studentData?.photo ? (
                <img src={studentData.photo} alt="Student" className="object-cover w-full h-full" />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-100">
                  <User size={40} />
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold">{studentData?.name || 'Student Name'}</h2>
            <p className="text-sm opacity-90">{studentData?.regNo || 'Registration No'}</p>
            <p className="mt-1 text-xs text-center opacity-80">{studentData?.program || 'Program Name'}</p>
          </div>
        </div>

        {/* Search Section */}
        <div className="p-4 border-b">
          <div className="relative flex items-center">
            <Search size={18} className="absolute text-gray-400 left-3" />
            <input
              type="text"
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-10 text-sm bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-[#F26522]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute text-gray-400 right-3 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          {showMessItem && (
            <button
              onClick={() => handleNavigate('/mess')}
              className="flex items-center w-full px-6 py-4 space-x-4 text-left transition-colors hover:bg-gray-50 text-gray-700"
            >
              <LayoutGrid size={20} className="text-[#F26522]" />
              <span className="font-medium">Mess Food Scanner</span>
            </button>
          )}
          {searchQuery && !showMessItem && (
            <div className="p-6 text-sm text-center text-gray-500">
              No results found
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t">
          <button className="flex items-center justify-center w-full py-3 space-x-2 font-bold text-white bg-gradient-to-r from-[#F26522] to-[#FFD54F] rounded-xl hover:opacity-90 transition-opacity">
            <LogOut size={20} />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
