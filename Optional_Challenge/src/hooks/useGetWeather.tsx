//React Hooks
import { useEffect, useState } from "react";
//Utils
import { fetchWeather } from "../utils/fetchWeather";

interface WeatherData {
  icon: string;
  temperature: number;
  description: string;
  windSpeed: string;
  humidity: number;
  city: string;
  country: string;
  rainProbability: number;
}

export default function useGetWeather(lat: number, lon: number) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    setLoading(true);
  
    fetchWeather(lat, lon)
      .then((weatherData) => {
          setWeather(weatherData);
          setLoading(false);
          setError(null)
        })
      .catch((err) => {
        if(err.response) {
          if(err.response.status === 404)
          setError("Location not found. Check the coordinates provided.")
          console.error(error, err.response.data);
        } else if(err.response.status === 401 ) {
          setError("Unauthenticated request.")
          console.error(error, err.response.data);
        } else if(err.response.status === 429 ) {
          setError("Too Many Requests: You've reached the API call rate limit")
          console.error(error, err.response.data);
        } else {
          setError("An unknown error occurred. Awkward...");
          console.error(error, err);
        }
        setLoading(false)
      })
  },[error, lat, lon])

  return { weather, loading, error };
}