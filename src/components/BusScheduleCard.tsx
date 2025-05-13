
import { Bus, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BusScheduleCardProps {
  time: string;
  from: string;
  to: string;
  availableSeats: number;
  totalSeats: number;
  onReserve: () => void;
}

const BusScheduleCard = ({
  time,
  from,
  to,
  availableSeats,
  totalSeats,
  onReserve
}: BusScheduleCardProps) => {
  const isAlmostFull = availableSeats <= 5;
  const isFull = availableSeats === 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <Clock size={18} className="text-gray-600 mr-1" />
          <span className="font-bold">{time}</span>
        </div>
        <div 
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isFull 
              ? 'bg-red-100 text-red-800' 
              : isAlmostFull 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
          }`}
        >
          {isFull 
            ? 'Full' 
            : isAlmostFull 
              ? `${availableSeats} seats left` 
              : `${availableSeats}/${totalSeats} seats available`
          }
        </div>
      </div>
      
      <div className="flex items-start mb-3">
        <div className="mr-2 mt-1">
          <Bus size={16} className="text-tut-blue" />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-tut-blue mr-2"></div>
            <div className="text-sm">{from}</div>
          </div>
          <div className="w-0.5 h-4 bg-gray-300 ml-1.5 my-1"></div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full border-2 border-tut-red mr-2"></div>
            <div className="text-sm">{to}</div>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onReserve} 
        disabled={isFull} 
        className={`w-full ${isFull ? 'bg-gray-300' : 'bg-tut-blue hover:bg-tut-blue/90'}`}
      >
        {isFull ? 'Bus Full' : 'Reserve Seat'}
      </Button>
    </div>
  );
};

export default BusScheduleCard;
