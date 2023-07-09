import { useEffect, useState } from 'react'
import countryList from 'react-select-country-list'
import axios from 'axios'
//Import Components
import NavBar from './components/NavBar'
import CurrentDate from './components/CurrentDate'
import CurrentWeather from './components/CurrentWeather'
import WeatherInfos from './components/WeatherInfos'

const apiKey = process.env.API_KEY

interface WeatherData {
  name: string;
  sys: {
    country: string;
  }
  main: {
    humidity: number;
    temp: number;
  };
  weather: [
    {
      icon: string;
      main: string;
    }
  ];
  wind: {
    speed: number;
  }; 
  forecast: [
    {
      pop: number,
    }
  ]
}

interface ForecastData {
  list: [{
    pop: number
  }]
}

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [isLoading, setIsLoading] = useState (true)

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
      setWeatherData(res1.data);
      setForecastData(res2.data)
      setIsLoading(false)
    }))
    .catch((err) => console.error(err));
    setIsLoading(false)
  };

  //console.log(weatherData)
  //console.log(forecastData)
  
  const weatherForecast = {
    icon: weatherData?.weather[0].icon,
    temperature: weatherData && Math.round(weatherData?.main.temp),
    description: weatherData?.weather[0].main,
    windSpeed: weatherData && (weatherData.wind.speed * 3.6).toFixed(2),
    humidity: weatherData?.main.humidity,
    city: weatherData?.name,
    country: weatherData && countryList().getLabel(weatherData?.sys.country),
    rainProbability: forecastData?.list[0].pop
  }

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4 m-auto">
      <p className='text-3xl text-customDarkGray animate-pulse'>
        Loading...
      </p>  
      <div 
        className="inline-block h-14 w-14 animate-spin rounded-full border border-customDarkGray border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
      </div>
    </div>
  );
  
  return (
    <>
      <NavBar />
      <main className="px-6 py-3 max-w-md h-full space-y-2 container mx-auto">
        <header>
          {<h1 className="text-3xl text-gray-800">
            {weatherForecast.city},<br />
            {weatherForecast.country}
          </h1>}
          <CurrentDate />
        </header>
        <CurrentWeather
          icon={weatherForecast.icon}
          temperature={weatherForecast.temperature}
          description={weatherForecast.description}
        />
        <WeatherInfos
          rain={weatherForecast?.rainProbability}
          windSpeed={weatherForecast?.windSpeed}
          humidity={weatherForecast?.humidity}
        />
      </main>
    </>
  );
}

export default App