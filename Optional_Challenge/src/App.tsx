import { useEffect, useState } from 'react'
import countryList from 'react-select-country-list'
import axios from 'axios'
//Import Components
import NavBar from './components/NavBar'
import CurrentDate from './components/CurrentDate'
import CurrentWeather from './components/CurrentWeather'
import WeatherInfos from './components/WeatherInfos'
import Loader from './components/Loader'
import ErrorPage from './components/ErrorPage'

const apiKey = process.env.API_KEY

const styles = {
  container: [
    'px-6', 
    'py-3', 
    'max-w-md', 
    'h-full', 
    'space-y-2', 
    'container', 
    'mx-auto'
  ].join(' '),
  title: [
    'text-3xl', 
    'text-gray-800'
  ].join(' ')
}

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

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState (true)
  const [error, setError] = useState<string | null> (null);

  useEffect(() => {
    if ('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        getWeather(lat, lon)
      })
    }else{
      console.error(Error);
    }
  }, []);

  const getWeather = (lat: number, lon: number) => {
    const currentWeatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=en&units=metric`;
    const dailyForecastData = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=en&units=metric`;
    setIsLoading(true)
    axios
    .all([
      axios.get(currentWeatherData),
      axios.get(dailyForecastData)
    ])
    .then(axios.spread((res1, res2) => {
      const currentWeather = res1.data;
      const forecast = res2.data;
      console.log(currentWeather)

      const weatherData = {
        icon: currentWeather.weather[0].icon,
        temperature: Math.round(currentWeather.main.temp),
        description: currentWeather.weather[0].main,
        windSpeed: (currentWeather.wind.speed * 3.6).toFixed(2),
        humidity: currentWeather.main.humidity,
        city: currentWeather.name,
        country: countryList().getLabel(currentWeather.sys.country),
        rainProbability: forecast.list[0].pop
      }
      setWeather(weatherData)
      setIsLoading(false)
      setError(null)
    }))
    .catch((err) => console.error(err));
    setError('An error occurred. Awkward...')
  };

  if (isLoading) return (
    <Loader />
  );

  if (error) return (
    <ErrorPage>
      {error}
    </ErrorPage>
  );
  
  return (
    <>
      <NavBar />
      <main className={styles.container}>
        <header>
          {weather && 
          <h1 className={styles.title}>
            {weather.city},<br />
            {weather.country}
          </h1>}
          <CurrentDate />
        </header>
        {weather && 
        <CurrentWeather
          icon={weather.icon}
          temperature={weather.temperature}
          description={weather.description}
        />}
        {weather && 
        <WeatherInfos
          rain={weather.rainProbability}
          windSpeed={weather.windSpeed}
          humidity={weather.humidity}
        />}
      </main>
    </>
  );
}