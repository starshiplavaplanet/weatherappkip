
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { addFavorite, removeFavorite, isFavorite } from '@/utils/weatherUtils';

interface FavoriteButtonProps {
  city: string;
  size?: 'default' | 'sm' | 'lg';
  showText?: boolean;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  city, 
  size = 'default', 
  showText = false,
  className = ''
}) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(city));
  }, [city]);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(city);
      toast(`Removed ${city} from favorites`);
    } else {
      addFavorite(city);
      toast(`Added ${city} to favorites`);
    }
    setFavorite(!favorite);
  };

  const iconSize = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';
  const padding = size === 'sm' ? 'p-1' : size === 'lg' ? 'p-3' : 'p-2';

  return (
    <Button
      onClick={toggleFavorite}
      variant="ghost"
      size={showText ? 'default' : 'icon'}
      className={`group ${padding} rounded-full hover:bg-amber-50 ${className}`}
    >
      <Star
        className={`${iconSize} ${
          favorite 
            ? 'fill-amber-400 text-amber-400' 
            : 'text-muted-foreground group-hover:text-amber-400'
        } transition-colors duration-200`}
      />
      {showText && (
        <span className="ml-2">
          {favorite ? 'Remove from favorites' : 'Add to favorites'}
        </span>
      )}
    </Button>
  );
};

export default FavoriteButton;
