
import { Bus, Clock, MapPin, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingCardProps {
  date: string;
  time: string;
  from: string;
  to: string;
  status: 'upcoming' | 'completed' | 'canceled';
  bookingId: string;
  onViewQR: () => void;
  onCancel?: () => void;
}

const BookingCard = ({
  date,
  time,
  from,
  to,
  status,
  bookingId,
  onViewQR,
  onCancel
}: BookingCardProps) => {
  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    canceled: 'bg-gray-100 text-gray-800'
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-bold">{date}</div>
          <div className="flex items-center text-gray-600">
            <Clock size={14} className="mr-1" />
            <span className="text-sm">{time}</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
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
      
      <div className="text-xs text-gray-500 mb-3">
        Booking ID: {bookingId}
      </div>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={onViewQR} 
          className="flex-1 flex items-center justify-center"
        >
          <QrCode size={16} className="mr-1" />
          View QR Code
        </Button>
        
        {status === 'upcoming' && onCancel && (
          <Button 
            variant="outline" 
            onClick={onCancel} 
            className="flex-1 text-tut-red border-tut-red hover:bg-tut-red/10"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
