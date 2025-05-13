
import { useState } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, LogOut, Settings, HelpCircle, Info } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock user data
  const userData = {
    name: "John Doe",
    studentId: "219012345",
    email: "219012345@tut.ac.za",
    residence: "Khayalethu Residence"
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
    
    // In a real app, this would clear auth tokens, etc.
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="pt-24 px-4 max-w-lg mx-auto">
        <Card className="mb-6">
          <CardHeader className="flex flex-col items-center pb-2">
            <Avatar className="w-20 h-20 mb-2 bg-tut-blue">
              <User size={40} className="text-white" />
            </Avatar>
            <CardTitle className="text-xl">{userData.name}</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between p-2 border-b">
                <span className="text-gray-600">Student ID</span>
                <span className="font-medium">{userData.studentId}</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{userData.email}</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="text-gray-600">Residence</span>
                <span className="font-medium">{userData.residence}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <h2 className="text-lg font-bold mb-2">Settings</h2>
        
        <Card className="mb-6">
          <CardContent className="p-0">
            <Button variant="ghost" className="flex justify-between w-full px-4 py-3 h-auto">
              <div className="flex items-center">
                <Settings size={18} className="mr-2" />
                <span>App Settings</span>
              </div>
              <span className="text-gray-400">→</span>
            </Button>
            
            <div className="border-t"></div>
            
            <Button variant="ghost" className="flex justify-between w-full px-4 py-3 h-auto">
              <div className="flex items-center">
                <HelpCircle size={18} className="mr-2" />
                <span>Help & Support</span>
              </div>
              <span className="text-gray-400">→</span>
            </Button>
            
            <div className="border-t"></div>
            
            <Button variant="ghost" className="flex justify-between w-full px-4 py-3 h-auto">
              <div className="flex items-center">
                <Info size={18} className="mr-2" />
                <span>About TUT SmartRide</span>
              </div>
              <span className="text-gray-400">→</span>
            </Button>
          </CardContent>
        </Card>
        
        <Button 
          variant="outline" 
          className="w-full text-red-500 border-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </main>
      
      <Navigation />
    </div>
  );
};

export default Profile;
