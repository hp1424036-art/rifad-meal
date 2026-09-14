import React from 'react';
import { User } from 'lucide-react';

const StudentCard = ({ studentData }) => {
  if (!studentData) return null;

  const details = [
    { 
      label: "Father's Name", 
      value: studentData.fatherName ? 
        `${studentData.fatherName}${studentData.fatherPhone ? ` (${studentData.fatherPhone})` : ''}` : null
    },
    { 
      label: "Mother's Name", 
      value: studentData.motherName ? 
        `${studentData.motherName}${studentData.motherPhone ? ` (${studentData.motherPhone})` : ''}` : null
    },
    { label: "Program Name", value: studentData.program },
    { label: "Hostel", value: studentData.hostel },
  ];

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden bg-gradient-to-b from-[#FFF8F0] to-white shadow-lg rounded-2xl border border-gray-100">
      <div className="p-6">
        <div className="flex flex-col items-center">
          <div className="w-28 h-36 mb-4 overflow-hidden bg-gray-200 rounded-lg shadow-sm">
            {studentData.photo ? (
              <img 
                src={studentData.photo} 
                alt="Student" 
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-100">
                <User size={48} />
              </div>
            )}
          </div>
          
          <h2 className="text-lg font-bold text-gray-800 text-center">
            {studentData.name} {studentData.regNo}
          </h2>
        </div>

        <div className="mt-4 space-y-3">
          {details.map((detail, index) => (
            detail.value && (
              <div key={index} className="text-sm border-b border-gray-100 pb-2 last:border-0">
                <span className="font-bold text-[#F26522]">
                  {detail.label}
                </span>
                <p className="text-gray-700 mt-0.5">
                  {detail.value}
                </p>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
