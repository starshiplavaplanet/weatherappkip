
import React from 'react';
import { WeatherData } from '@/api/weatherApi';
import { 
  formatTemp, 
  formatDate, 
  formatTime,
  formatWeatherDescription,
  getWeatherIconUrl
} from '@/utils/weatherUtils';
import { Wind, Droplets, ArrowDown, ArrowUp, Thermometer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import FavoriteButton from './FavoriteButton';

interface CurrentWeatherProps {
  data: WeatherData;
  className?: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, className }) => {
  if (!data) return null;

  const {
    name,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    weather,
    wind,
    sys,
    dt,
    timezone
  } = data;

  const weatherDescription = formatWeatherDescription(weather[0].description);
  
  return (
    <Card className={`glass-card overflow-hidden animate-fade-up ${className}`}>
      <div className="relative">
        <div className="flex justify-between items-start p-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary animate-fade-in">
                Current Weather
              </span>
              <span className="text-sm text-muted-foreground">
                {formatDate(dt, timezone)}
              </span>
            </div>
            <div className="mt-2 flex items-center">
              <h2 className="text-2xl font-semibold">{name}</h2>
              {sys.country && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {sys.country}
                </span>
              )}
              <div className="ml-auto">
                <FavoriteButton city={name} />
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex items-center justify-center p-4 md:p-6 w-full md:w-1/2">
              <div className="flex flex-col items-center">
                <img 
                  src={getWeatherIconUrl(weather[0].icon)} 
                  alt={weather[0].description}
                  className="weather-icon"
                />
                <div className="text-center mt-2">
                  <h3 className="text-5xl font-light">{formatTemp(temp)}</h3>
                  <p className="text-muted-foreground mt-1">{weatherDescription}</p>
                </div>
              </div>
            </div>
            
            <Separator className="hidden md:block h-32 mx-6" orientation="vertical" />
            
            <div className="grid grid-cols-2 gap-4 p-6 w-full md:w-1/2">
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Feels Like</p>
                  <p className="text-lg">{formatTemp(feels_like)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Wind</p>
                  <p className="text-lg">{Math.round(wind.speed)} m/s</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <ArrowDown className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Min</p>
                  <p className="text-lg">{formatTemp(temp_min)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <ArrowUp className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Max</p>
                  <p className="text-lg">{formatTemp(temp_max)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-lg">{humidity}%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default CurrentWeather;
