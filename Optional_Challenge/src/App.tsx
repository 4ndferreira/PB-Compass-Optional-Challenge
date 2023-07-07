import { useEffect, useState } from 'react'
import countryList from 'react-select-country-list'
import axios from 'axios'
import { API_KEY } from './config/env'
import './App.css'

interface Data {
  name: string;
  sys: { 
    country: string 
  };
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
}

const App = () => {
  const [weatherData, setWeatherData] = useState<Data | null>(null)

  useEffect(() => {
    if ('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeather(lat, lon)
      })
    }else{
      console.error(Error);
    }
  }, []);
  
  const getWeather = (lat: number, lon: number) => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=en&units=metric`)
    .then((res) => setWeatherData(res.data))
    .catch((err) => console.error(err));
  };
  //console.log(weatherData)
  
  const weatherForecast = weatherData && {
    icon: weatherData.weather[0].icon,
    temperature: Math.round(weatherData.main.temp),
    description: weatherData.weather[0].main,
    windSpeed: (weatherData.wind.speed * 3.6).toFixed(2),
    humidity: weatherData.main.humidity,
    city: weatherData.name,
    country: countryList().getLabel(weatherData.sys.country)
  }

  const formatDate: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "2-digit",
  };

  const today = new Date();
  const showDate = today.toLocaleDateString("en-US", formatDate);
  //console.log(showDate);

  if (!weatherForecast) return <div>Loading...</div>;
  
  if (weatherForecast) return (
    <main className='px-6 py-3 max-w-md h-full space-y-2 container mx-auto'>
      <nav className='h-[3rem]'></nav>
      <header className=''>
        <h1 className='text-3xl text-gray-800'>
          {weatherForecast.city},<br />
          {weatherForecast.country}
        </h1>
        <p className='text-sm text-customGray'>{showDate}</p>
      </header>
      <section className='flex justify-between space-x-3'>
        <div>
          <img
            className='h-30 w-30'
            src={`http://openweathermap.org/img/wn/${weatherForecast.icon}@4x.png`}
            alt=""
          />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-7xl font-bold flex items-start text-gray-800'>
            {weatherForecast.temperature} 
            <sup className='text-lg font-light'>°C</sup>
          </h2>
          <h3 className='text-gray-800 font-normal'>{weatherForecast.description}</h3>
        </div>
      </section>
      <section>
        <ul className='space-y-2 flex flex-col'>
          <li className='px-5 py-3 max-w-full bg-white bg-opacity-40 rounded-2xl flex justify-between items-center'>
            <div className='flex items-center space-x-3'>
              <div className='h-9 w-9 bg-white rounded-xl flex justify-center items-center'>
                <img className='h-6 w-6'src='assets/Wind.svg' alt='' />
              </div>
              <p className='text-xs'>Wind</p>
            </div>
            <p className='text-xs'>{weatherForecast.windSpeed} km/h</p>
          </li>
          <li className='px-5 py-3 max-w-full bg-white bg-opacity-40 rounded-2xl flex justify-between items-center'>
            <div className='flex items-center space-x-3'>
              <div className='h-9 w-9 bg-white rounded-xl flex justify-center items-center'>
                <img className='h-5 w-5' src='assets/Humidity.svg' alt='' />
              </div>
              <p className='text-xs'>Humidity</p>
            </div>
            <p className='text-xs'>{weatherForecast.humidity}%</p>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default App