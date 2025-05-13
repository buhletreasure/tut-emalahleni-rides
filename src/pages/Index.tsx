
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import DateSelector from "@/components/DateSelector";
import RouteSelector from "@/components/RouteSelector";
import BusScheduleCard from "@/components/BusScheduleCard";
import QRCodeModal from "@/components/QRCodeModal";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/LoginForm";

// Mock data
const routes = [
  { id: "route1", from: "Khayalethu Residence", to: "TUT Emalahleni Campus" },
  { id: "route2", from: "TUT Emalahleni Campus", to: "Khayalethu Residence" },
  { id: "route3", from: "Corridor Hill Residence", to: "TUT Emalahleni Campus" },
  { id: "route4", from: "TUT Emalahleni Campus", to: "Corridor Hill Residence" },
];

// Bus schedule times (mock data)
const getScheduleTimes = (routeId: string) => {
  // These are the times from the specifications
  if (routeId === "route1" || routeId === "route3") { // Residence to Campus
    return [
      "07:15", "07:45", "08:45", "09:45", "10:45", "11:45", 
      "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", 
      "19:45", "21:45"
    ];
  } else { // Campus to Residence
    return [
      "08:10", "09:10", "10:10", "11:10", "12:10", "13:10", 
      "14:10", "15:10", "16:10", "17:10", "18:10", "20:10", 
      "22:10"
    ];
  }
};

// Generate random number of available seats
const getRandomSeats = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRoute, setSelectedRoute] = useState<string>("route1");
  const [busSchedules, setBusSchedules] = useState<any[]>([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  
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

  // Load bus schedules based on selected route and date
  useEffect(() => {
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
    
    setBusSchedules(schedules);
  }, [selectedRoute, selectedDate]);

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="pt-24 px-4 max-w-lg mx-auto">
        <RouteSelector routes={routes} onRouteSelect={handleRouteSelect} />
        
        <DateSelector onDateSelect={handleDateSelect} />
        
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-3">Available Buses</h2>
          
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
