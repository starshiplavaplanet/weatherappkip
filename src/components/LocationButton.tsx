
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface LocationButtonProps {
  onGetLocation: (lat: number, lon: number) => void;
  className?: string;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onGetLocation, className }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetLocation = () => {
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onGetLocation(latitude, longitude);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        let message = 'Failed to get your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out.';
            break;
        }
        
        toast.error(message);
        setIsLoading(false);
      },
      { timeout: 10000 }
    );
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleGetLocation}
      disabled={isLoading}
      className={`rounded-full bg-white/70 hover:bg-white border-white/30 ${className}`}
    >
      <MapPin className="h-4 w-4 mr-1" />
      {isLoading ? 'Getting location...' : 'Use my location'}
    </Button>
  );
};

export default LocationButton;
