
import { WeatherData, ForecastData } from "../api/weatherApi";

// Get weather icon URL
export const getWeatherIconUrl = (iconCode: string, size: 'small' | 'large' = 'large'): string => {
  return `https://openweathermap.org/img/wn/${iconCode}${size === 'large' ? '@2x' : ''}.png`;
};

// Format temperature
export const formatTemp = (temp: number): string => {
  return `${Math.round(temp)}°`;
};

// Date formatting utilities
export const formatDate = (timestamp: number, timezone: number = 0): string => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (timestamp: number, timezone: number = 0): string => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Get weather description with proper capitalization
export const formatWeatherDescription = (description: string): string => {
  return description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Get the appropriate weather background class based on weather condition
export const getWeatherBackgroundClass = (weatherId: number): string => {
  // Weather condition codes: https://openweathermap.org/weather-conditions
  if (weatherId >= 200 && weatherId < 300) {
    return 'bg-gradient-to-br from-gray-700 to-gray-900'; // Thunderstorm
  } else if (weatherId >= 300 && weatherId < 400) {
    return 'bg-gradient-to-br from-blue-400 to-blue-600'; // Drizzle
  } else if (weatherId >= 500 && weatherId < 600) {
    return 'bg-gradient-to-br from-blue-500 to-blue-700'; // Rain
  } else if (weatherId >= 600 && weatherId < 700) {
    return 'bg-gradient-to-br from-blue-100 to-blue-300'; // Snow
  } else if (weatherId >= 700 && weatherId < 800) {
    return 'bg-gradient-to-br from-gray-300 to-gray-500'; // Atmosphere (fog, mist, etc.)
  } else if (weatherId === 800) {
    return 'bg-gradient-to-br from-blue-400 to-blue-600'; // Clear sky
  } else if (weatherId > 800) {
    return 'bg-gradient-to-br from-blue-300 to-blue-500'; // Clouds
  }
  return 'bg-gradient-to-br from-blue-400 to-blue-600'; // Default
};

// Get 5-day forecast from raw forecast data
export const getFormattedForecast = (forecastData: ForecastData) => {
  const dailyForecasts: Array<{
    date: string;
    dayName: string;
    temp: number;
    weatherId: number;
    weatherDescription: string;
    iconCode: string;
  }> = [];
  
  // Group by day and take midday forecast for each day
  const dailyMap = new Map();
  
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toISOString().split('T')[0];
    const hours = date.getHours();
    
    // Target forecast around noon (11am-2pm) for daily representation
    if (hours >= 11 && hours <= 14 && !dailyMap.has(dateStr)) {
      dailyMap.set(dateStr, {
        date: dateStr,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        temp: item.main.temp,
        weatherId: item.weather[0].id,
        weatherDescription: item.weather[0].description,
        iconCode: item.weather[0].icon
      });
    }
  });
  
  // Convert map to array and sort by date
  return Array.from(dailyMap.values())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5); // Only take 5 days
};

// Local storage utilities for favorites
export const getFavorites = (): string[] => {
  const favorites = localStorage.getItem('weatherFavorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (city: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }
};

export const removeFavorite = (city: string): void => {
  const favorites = getFavorites();
  const index = favorites.indexOf(city);
  if (index !== -1) {
    favorites.splice(index, 1);
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }
};

export const isFavorite = (city: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(city);
};
