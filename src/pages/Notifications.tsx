
import { useState } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import NotificationCard from "@/components/NotificationCard";
import { Button } from "@/components/ui/button";

// Mock data for notifications
const notificationsData = [
  {
    id: "n1",
    type: "delay" as const,
    message: "The 07:45 bus from Khayalethu Residence is running 10 minutes late due to traffic.",
    timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
    isRead: false
  },
  {
    id: "n2",
    type: "reminder" as const,
    message: "Don't forget your upcoming trip tomorrow at 08:45 from Khayalethu Residence.",
    timestamp: new Date(Date.now() - 3 * 3600000), // 3 hours ago
    isRead: false
  },
  {
    id: "n3",
    type: "info" as const,
    message: "Additional buses have been added for Friday peak hours. Check the schedule for more details.",
    timestamp: new Date(Date.now() - 12 * 3600000), // 12 hours ago
    isRead: true
  },
  {
    id: "n4",
    type: "delay" as const,
    message: "The 17:45 bus from TUT Emalahleni Campus was delayed by 15 minutes yesterday due to maintenance.",
    timestamp: new Date(Date.now() - 28 * 3600000), // 28 hours ago
    isRead: true
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="pt-24 px-4 max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Notifications {unreadCount > 0 && `(${unreadCount})`}</h2>
          
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              onClick={markAllAsRead}
              className="text-sm text-tut-blue hover:text-tut-blue/90"
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                type={notification.type}
                message={notification.message}
                timestamp={notification.timestamp}
                isRead={notification.isRead}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No notifications yet.</p>
          </div>
        )}
      </main>
      
      <Navigation />
    </div>
  );
};

export default Notifications;
