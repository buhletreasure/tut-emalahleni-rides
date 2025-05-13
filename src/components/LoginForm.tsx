
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId || !password) {
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
        description: "Welcome to TUT SmartRide"
      });
      
      onLogin();
    }, 1500);
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
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
            Student ID
          </label>
          <Input
            id="studentId"
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter your student ID"
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
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
