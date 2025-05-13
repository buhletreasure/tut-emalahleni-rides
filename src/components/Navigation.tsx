
import { Bus, Calendar, User, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-50">
      <div className="flex justify-around items-center">
        <Link to="/" className="flex flex-col items-center px-3 py-2 text-tut-blue">
          <Bus size={24} />
          <span className="text-xs mt-1">Buses</span>
        </Link>
        <Link to="/bookings" className="flex flex-col items-center px-3 py-2 text-gray-600">
          <Calendar size={24} />
          <span className="text-xs mt-1">Bookings</span>
        </Link>
        <Link to="/notifications" className="flex flex-col items-center px-3 py-2 text-gray-600">
          <Bell size={24} />
          <span className="text-xs mt-1">Alerts</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center px-3 py-2 text-gray-600">
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
