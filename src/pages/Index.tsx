
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import DateSelector from "@/components/DateSelector";
import RouteSelector from "@/components/RouteSelector";
import BusScheduleCard from "@/components/BusScheduleCard";
import QRCodeModal from "@/components/QRCodeModal";
import MiniProfile from "@/components/MiniProfile";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/LoginForm";
import { format, isSameDay, startOfToday } from "date-fns";

// Mock data
const routes = [
  { id: "route1", from: "Khayalethu Residence", to: "TUT Emalahleni Campus" },
  { id: "route2", from: "TUT Emalahleni Campus", to: "Khayalethu Residence" },
  { id: "route3", from: "Corridor Hill Residence", to: "TUT Emalahleni Campus" },
  { id: "route4", from: "TUT Emalahleni Campus", to: "Corridor Hill Residence" },
];

// Mock student data
const studentData = {
  studentNumber: "219012345",
  fullName: "Boikanyo Mohlamonyane",
  course: "Computer Science"
};

// Bus schedule times - updated to match specific times
const getScheduleTimes = (routeId: string) => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
  
  // Weekend schedule (Saturday)
  if (dayOfWeek === 6) {
    if (routeId === "route1" || routeId === "route3") { // Residence to Campus
      return ["08:00", "10:00", "12:00"];
    } else { // Campus to Residence
      return ["09:00", "11:00", "14:10"];
    }
  } 
  // Weekday schedule (Monday to Friday)
  else if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    if (routeId === "route1" || routeId === "route3") { // Residence to Campus (quarter to the hour)
      return [
        "07:45", "08:45", "09:45", "10:45", "11:45", 
        "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", 
        "18:45", "19:45", "20:45", "21:45"
      ];
    } else { // Campus to Residence (10 past the hour)
      return [
        "08:10", "09:10", "10:10", "11:10", "12:10", "13:10", 
        "14:10", "15:10", "16:10", "17:10", "18:10", "19:10", 
        "20:10", "21:10", "22:10"
      ];
    }
  }
  // Sunday (no service)
  else {
    return [];
  }
};

// Generate random number of available seats
const getRandomSeats = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};

// Filter schedules for current time and later
const filterCurrentSchedules = (schedules: any[]) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  return schedules.filter(schedule => {
    const [hour, minute] = schedule.time.split(':').map(Number);
    return (hour > currentHour) || (hour === currentHour && minute >= currentMinute);
  });
};

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRoute, setSelectedRoute] = useState<string>("route1");
  const [busSchedules, setBusSchedules] = useState<any[]>([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const { toast } = useToast();

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleReserveSeat = (schedule: any) => {
    // In a real app, this would make an API call to reserve the seat
    setSelectedBooking({
      bookingId: `BK${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      time: schedule.time,
      from: schedule.from,
      to: schedule.to
    });
    
    setShowQRModal(true);
    
    toast({
      title: "Seat Reserved!",
      description: `Your seat has been reserved for ${schedule.time}`
    });
  };
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Load bus schedules based on selected route and date
  useEffect(() => {
    // Only show schedules for the current day
    if (!isSameDay(selectedDate, new Date())) {
      setBusSchedules([]);
      return;
    }
    
    // In a real app, this would be an API call
    const times = getScheduleTimes(selectedRoute);
    const route = routes.find(r => r.id === selectedRoute);
    
    if (!route) return;
    
    const schedules = times.map(time => ({
      id: `${selectedRoute}-${time}`,
      time,
      from: route.from,
      to: route.to,
      availableSeats: getRandomSeats(40),
      totalSeats: 40
    }));
    
    // Only show schedules for the current time and later
    const filteredSchedules = filterCurrentSchedules(schedules);
    
    setBusSchedules(filteredSchedules);
  }, [selectedRoute, selectedDate, currentTime]);

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const today = new Date();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="pt-24 px-4 max-w-lg mx-auto">
        <MiniProfile 
          studentNumber={studentData.studentNumber}
          fullName={studentData.fullName}
          course={studentData.course}
        />
        
        <RouteSelector routes={routes} onRouteSelect={handleRouteSelect} />
        
        <DateSelector onDateSelect={handleDateSelect} />
        
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-3">
            Available Buses - {format(today, 'EEEE, MMMM d')}
          </h2>
          
          {busSchedules.length > 0 ? (
            <div className="space-y-3">
              {busSchedules.map((schedule) => (
                <BusScheduleCard
                  key={schedule.id}
                  time={schedule.time}
                  from={schedule.from}
                  to={schedule.to}
                  availableSeats={schedule.availableSeats}
                  totalSeats={schedule.totalSeats}
                  onReserve={() => handleReserveSeat(schedule)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No buses available for this route and date.</p>
            </div>
          )}
        </div>
      </main>
      
      <Navigation />
      
      {selectedBooking && (
        <QRCodeModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          bookingId={selectedBooking.bookingId}
          time={selectedBooking.time}
          from={selectedBooking.from}
          to={selectedBooking.to}
        />
      )}
    </div>
  );
};

export default Index;
