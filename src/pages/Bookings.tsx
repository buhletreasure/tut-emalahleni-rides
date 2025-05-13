
import { useState } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import BookingCard from "@/components/BookingCard";
import QRCodeModal from "@/components/QRCodeModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock data for bookings
const upcomingBookings = [
  {
    id: "BK123456",
    date: "Today, 13 May",
    time: "07:45",
    from: "Khayalethu Residence",
    to: "TUT Emalahleni Campus",
    status: "upcoming" as const
  },
  {
    id: "BK123457",
    date: "Tomorrow, 14 May",
    time: "08:45",
    from: "Khayalethu Residence",
    to: "TUT Emalahleni Campus",
    status: "upcoming" as const
  }
];

const pastBookings = [
  {
    id: "BK123450",
    date: "Yesterday, 12 May",
    time: "07:45",
    from: "Khayalethu Residence",
    to: "TUT Emalahleni Campus",
    status: "completed" as const
  },
  {
    id: "BK123445",
    date: "10 May 2023",
    time: "15:45",
    from: "TUT Emalahleni Campus",
    to: "Corridor Hill Residence",
    status: "completed" as const
  },
  {
    id: "BK123440",
    date: "9 May 2023",
    time: "08:45",
    from: "Corridor Hill Residence",
    to: "TUT Emalahleni Campus",
    status: "canceled" as const
  }
];

const Bookings = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [myUpcomingBookings, setMyUpcomingBookings] = useState(upcomingBookings);
  
  const { toast } = useToast();

  const handleViewQR = (booking: any) => {
    setSelectedBooking(booking);
    setShowQRModal(true);
  };

  const handleCancelBooking = (bookingId: string) => {
    // In a real app, this would be an API call
    setMyUpcomingBookings(bookings => 
      bookings.filter(b => b.id !== bookingId)
    );
    
    toast({
      title: "Booking Canceled",
      description: `Your booking ${bookingId} has been canceled`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="pt-24 px-4 max-w-lg mx-auto">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {myUpcomingBookings.length > 0 ? (
              <div className="space-y-3">
                {myUpcomingBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    date={booking.date}
                    time={booking.time}
                    from={booking.from}
                    to={booking.to}
                    status={booking.status}
                    bookingId={booking.id}
                    onViewQR={() => handleViewQR(booking)}
                    onCancel={() => handleCancelBooking(booking.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No upcoming bookings.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            <div className="space-y-3">
              {pastBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  date={booking.date}
                  time={booking.time}
                  from={booking.from}
                  to={booking.to}
                  status={booking.status}
                  bookingId={booking.id}
                  onViewQR={() => handleViewQR(booking)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Navigation />
      
      {selectedBooking && (
        <QRCodeModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          bookingId={selectedBooking.id}
          time={selectedBooking.time}
          from={selectedBooking.from}
          to={selectedBooking.to}
        />
      )}
    </div>
  );
};

export default Bookings;
