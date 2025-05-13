
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { format } from "date-fns";

interface MiniProfileProps {
  studentNumber: string;
  fullName: string;
  course: string;
}

const MiniProfile = ({ studentNumber, fullName, course }: MiniProfileProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Extract initials from the full name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('');
  };
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // update every minute
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-tut-blue text-white flex items-center justify-center font-bold text-lg">
            {getInitials(fullName)}
          </div>
          <div className="ml-3">
            <p className="font-semibold">{fullName}</p>
            <p className="text-sm text-gray-600">{studentNumber}</p>
            <p className="text-xs text-gray-500">{course}</p>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Clock size={16} className="mr-1" />
          <span className="text-sm">{format(currentTime, 'HH:mm')}</span>
        </div>
      </div>
    </div>
  );
};

export default MiniProfile;
