
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ForecastData } from '@/api/weatherApi';
import { formatTemp, getFormattedForecast, getWeatherIconUrl } from '@/utils/weatherUtils';

interface WeatherForecastProps {
  data: ForecastData;
  className?: string;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ data, className }) => {
  if (!data) return null;
  
  const forecastItems = getFormattedForecast(data);

  return (
    <Card className={`glass-card animate-fade-up animate-delay-200 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {forecastItems.map((item, index) => (
            <div 
              key={item.date} 
              className="weather-card-sm animate-fade-in"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <span className="text-sm font-medium">{item.dayName}</span>
              <img 
                src={getWeatherIconUrl(item.iconCode, 'small')} 
                alt={item.weatherDescription}
                className="w-12 h-12"
              />
              <span className="text-xl font-light">{formatTemp(item.temp)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
