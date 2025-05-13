
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface RouteSelectorProps {
  routes: {
    id: string;
    from: string;
    to: string;
  }[];
  onRouteSelect: (routeId: string) => void;
}

const RouteSelector = ({ routes, onRouteSelect }: RouteSelectorProps) => {
  const [selectedRoute, setSelectedRoute] = useState<string>(routes[0]?.id || "");
  
  const handleRouteChange = (routeId: string) => {
    setSelectedRoute(routeId);
    onRouteSelect(routeId);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Select Route</h3>
      
      <div className="space-y-2">
        {routes.map((route) => (
          <button
            key={route.id}
            onClick={() => handleRouteChange(route.id)}
            className={`flex items-center justify-between w-full p-3 rounded-lg border ${
              selectedRoute === route.id 
                ? 'border-tut-blue bg-blue-50' 
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center">
              <span className="font-medium">{route.from}</span>
              <ArrowRight size={16} className="mx-2 text-gray-500" />
              <span className="font-medium">{route.to}</span>
            </div>
            
            <div className={`w-4 h-4 rounded-full border ${
              selectedRoute === route.id 
                ? 'bg-tut-blue border-tut-blue' 
                : 'border-gray-400'
            }`}>
              {selectedRoute === route.id && (
                <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RouteSelector;
