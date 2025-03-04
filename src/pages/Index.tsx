
import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { WeatherData, ForecastData, fetchWeatherByCity, fetchForecastByCity, fetchWeatherByCoords } from '@/api/weatherApi';
import { getFavorites } from '@/utils/weatherUtils';

import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import WeatherForecast from '@/components/WeatherForecast';
import FavoritesList from '@/components/FavoritesList';
import LocationButton from '@/components/LocationButton';

const Index = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<string>('');
  
  // Fetch weather data for a city
  const fetchWeatherData = async (city: string) => {
    if (!city) return;
    
    setLoading(true);
    setCurrentCity(city);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecastByCity(city)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      toast.error(`Could not find weather data for ${city}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch weather data by coordinates
  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    setLoading(true);
    
    try {
      const weatherData = await fetchWeatherByCoords(lat, lon);
      setCurrentCity(weatherData.name);
      setCurrentWeather(weatherData);
      
      // Now that we have the city name, fetch the forecast
      const forecastData = await fetchForecastByCity(weatherData.name);
      setForecast(forecastData);
      
      toast.success(`Weather loaded for ${weatherData.name}`);
    } catch (error) {
      console.error('Error fetching weather data by location:', error);
      toast.error('Could not load weather for your location');
    } finally {
      setLoading(false);
    }
  };
  
  // Load default city or user's favorites on initial load
  useEffect(() => {
    const favorites = getFavorites();
    if (favorites.length > 0) {
      fetchWeatherData(favorites[0]);
    } else {
      fetchWeatherData('London'); // Default city
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container px-4 py-8 mx-auto max-w-6xl">
        <header className="flex flex-col items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-light text-center mb-6 animate-fade-in">
            <span className="font-normal">Weather</span>App
          </h1>
          
          <div className="w-full max-w-md">
            <SearchBar 
              onSearch={fetchWeatherData} 
              className="mb-4"
            />
            
            <div className="flex justify-center">
              <LocationButton 
                onGetLocation={fetchWeatherByLocation}
                className="animate-fade-in animate-delay-200"
              />
            </div>
          </div>
        </header>
        
        <FavoritesList 
          onSelectCity={fetchWeatherData} 
          className="mb-8"
        />
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-lg text-muted-foreground">Loading weather data...</div>
          </div>
        ) : (
          <>
            {currentWeather && (
              <CurrentWeather data={currentWeather} className="mb-8" />
            )}
            
            {forecast && (
              <WeatherForecast data={forecast} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
