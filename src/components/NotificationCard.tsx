
import { Bell, Bus, Info } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NotificationCardProps {
  type: 'delay' | 'reminder' | 'info';
  message: string;
  timestamp: Date;
  isRead: boolean;
}

const NotificationCard = ({
  type,
  message,
  timestamp,
  isRead
}: NotificationCardProps) => {
  const getIcon = () => {
    switch(type) {
      case 'delay':
        return <Bus size={20} className="text-tut-red" />;
      case 'reminder':
        return <Bell size={20} className="text-tut-yellow" />;
      case 'info':
        return <Info size={20} className="text-tut-blue" />;
      default:
        return <Info size={20} className="text-tut-blue" />;
    }
  };
  
  return (
    <div className={`p-4 mb-2 border-l-4 ${
      isRead ? 'border-gray-300 bg-white' : 'border-tut-blue bg-blue-50'
    } rounded-r-lg shadow-sm`}>
      <div className="flex">
        <div className="mr-3 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-gray-800">{message}</p>
          <p className="text-xs text-gray-500 mt-1">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
