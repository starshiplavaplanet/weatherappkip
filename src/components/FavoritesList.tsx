
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getFavorites } from '@/utils/weatherUtils';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface FavoritesListProps {
  onSelectCity: (city: string) => void;
  className?: string;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ onSelectCity, className }) => {
  const favorites = getFavorites();

  const handleSelect = (city: string) => {
    onSelectCity(city);
    toast(`Loading weather for ${city}`);
  };

  if (favorites.length === 0) {
    return null;
  }

  return (
    <Card className={`glass-card animate-fade-up animate-delay-100 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Favorite Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {favorites.map((city, index) => (
            <Button
              key={city}
              variant="outline"
              className="rounded-full bg-white bg-opacity-60 hover:bg-opacity-90 border-white/30 animate-fade-in"
              style={{ animationDelay: `${100 + index * 50}ms` }}
              onClick={() => handleSelect(city)}
            >
              <MapPin className="h-3.5 w-3.5 mr-1 text-primary" />
              {city}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoritesList;
