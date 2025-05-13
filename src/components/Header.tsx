
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState("TUT SmartRide");
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Update title based on route
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setTitle('TUT SmartRide');
        break;
      case '/bookings':
        setTitle('My Bookings');
        break;
      case '/notifications':
        setTitle('Notifications');
        break;
      case '/profile':
        setTitle('My Profile');
        break;
      default:
        setTitle('TUT SmartRide');
    }
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-tut-blue text-white p-4 shadow-md z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/67b1ff7c-a343-410f-a844-32685f502c81.png" 
            alt="TUT Logo" 
            className="w-10 h-10 mr-2" 
          />
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="text-sm font-medium">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </header>
  );
};

export default Header;
