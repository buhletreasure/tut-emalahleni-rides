
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // This would be an API call in a real app
    // For demo purposes, we're just simulating a login
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo, we'll accept any credentials
      toast({
        title: "Login successful",
        description: `Welcome to TUT SmartRide (${role})`
      });
      
      onLogin();
    }, 1500);
  };

  const getPlaceholder = () => {
    switch (role) {
      case "student":
        return "Enter your student ID";
      case "driver":
        return "Enter your driver ID";
      case "admin":
        return "Enter your admin ID";
      case "campusAdmin":
        return "Enter your campus admin ID";
      default:
        return "Enter your ID";
    }
  };

  const getIdLabel = () => {
    switch (role) {
      case "student":
        return "Student ID";
      case "driver":
        return "Driver ID";
      case "admin":
        return "Admin ID";
      case "campusAdmin":
        return "Campus Admin ID";
      default:
        return "User ID";
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/67b1ff7c-a343-410f-a844-32685f502c81.png" 
          alt="TUT Logo" 
          className="w-24 h-24" 
        />
      </div>
      
      <h2 className="text-2xl font-bold text-center text-tut-blue mb-6">
        TUT SmartRide
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Login as
          </Label>
          <Select
            value={role}
            onValueChange={setRole}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="driver">Driver</SelectItem>
              <SelectItem value="admin">System Admin</SelectItem>
              <SelectItem value="campusAdmin">Campus Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
            {getIdLabel()}
          </Label>
          <Input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder={getPlaceholder()}
            className="w-full"
          />
        </div>
        
        <div>
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-tut-blue hover:bg-tut-blue/90"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Forgot your password? <a href="#" className="text-tut-blue hover:underline">Reset it here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
