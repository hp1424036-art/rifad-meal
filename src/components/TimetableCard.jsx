import React from 'react';
import { BookOpen } from 'lucide-react';

const TimetableCard = ({ code, room, time, status }) => {
  const isUpcoming = status === 'Upcoming';
  const dotColor = isUpcoming ? 'bg-[#FFD54F]' : 'bg-[#FF6B6B]';

  return (
    <div className="flex flex-col min-w-[180px] bg-gradient-to-br from-[#F26522] to-orange-300 rounded-xl shadow-md overflow-hidden text-white flex-shrink-0">
      <div className="p-4 pb-2 relative">
        <div className="absolute top-3 right-3 opacity-20">
          <BookOpen size={40} />
        </div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold">{code}</h3>
          <p className="text-sm opacity-90 mt-1">{room}</p>
          <div className="flex items-center mt-3 bg-white/20 inline-flex px-2 py-1 rounded-full backdrop-blur-sm">
            <div className={`w-2 h-2 rounded-full mr-2 ${dotColor}`} />
            <span className="text-xs font-medium">{status}</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-2 bg-black/10 mt-auto">
        <p className="text-sm font-medium">{time}</p>
      </div>
    </div>
  );
};

export default TimetableCard;
