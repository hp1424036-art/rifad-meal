import React from 'react';
import { 
  Megaphone, Monitor, HandMetal, ClipboardCheck, 
  CalendarDays, BarChart3, FileText, CheckCircle, Trophy 
} from 'lucide-react';

const TileGrid = () => {
  const tiles = [
    { id: 'announce', label: 'Announce', icon: Megaphone, badge: '13' },
    { id: 'edu', label: 'Edu Revolution', icon: Monitor, highlight: true },
    { id: 'fee', label: 'Fee Statement', icon: HandMetal },
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck, badge: '80%' },
    { id: 'assignment', label: 'Assignment', icon: CalendarDays, badge: '4' },
    { id: 'results', label: 'Results', icon: BarChart3 },
    { id: 'exams', label: 'Exams', icon: FileText, badge: '0' },
    { id: 'rms', label: 'RMS Status', icon: CheckCircle },
    { id: 'events', label: 'Events', icon: Trophy }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {tiles.map((tile) => {
        const Icon = tile.icon;
        return (
          <div 
            key={tile.id}
            className={`
              relative flex flex-col items-center justify-center p-3 
              bg-[#FFF8F0] rounded-xl shadow-sm border 
              ${tile.highlight ? 'border-[#F26522]' : 'border-gray-100'}
            `}
          >
            {tile.badge && (
              <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-[#F26522] rounded-full">
                {tile.badge}
              </div>
            )}
            <div className={`p-3 rounded-full mb-2 ${tile.highlight ? 'bg-[#F26522] text-white' : 'bg-white text-gray-600 shadow-sm'}`}>
              <Icon size={24} />
            </div>
            <span className="text-[11px] font-medium text-center text-gray-700 leading-tight">
              {tile.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TileGrid;
