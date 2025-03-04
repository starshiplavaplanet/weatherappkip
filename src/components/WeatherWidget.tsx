
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { WeatherData, ForecastData } from '@/api/weatherApi';
import { formatTemp, getWeatherIconUrl, formatWeatherDescription } from '@/utils/weatherUtils';
import FavoriteButton from './FavoriteButton';

interface WeatherWidgetProps {
  city: string;
  data: WeatherData | null;
  isLoading: boolean;
  onClick?: () => void;
  className?: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ 
  city, 
  data, 
  isLoading, 
  onClick,
  className 
}) => {
  
  return (
    <div 
      className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 animate-fade-in ${className}`}
      onClick={onClick}
    >
      <div className="relative p-4 flex items-center">
        {isLoading ? (
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-32" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-10 w-16" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <Skeleton className="h-3 w-24" />
          </div>
        ) : data ? (
          <>
            <div className="flex-1">
              <h3 className="font-medium text-lg">{data.name}</h3>
              <div className="flex items-baseline mt-1">
                <span className="text-3xl font-light">
                  {formatTemp(data.main.temp)}
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                  {formatWeatherDescription(data.weather[0].description)}
                </span>
              </div>
            </div>
            <div className="relative">
              <img 
                src={getWeatherIconUrl(data.weather[0].icon, 'small')} 
                alt={data.weather[0].description}
                className="w-16 h-16"
              />
              <div className="absolute top-0 right-0">
                <FavoriteButton city={data.name} size="sm" />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full text-center text-muted-foreground">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
