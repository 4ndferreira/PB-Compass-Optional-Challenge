import axios from "axios";
import countryList from "react-select-country-list";

const apiKey = process.env.API_KEY;

export async function fetchWeather(lat:number, lon: number) {
  const currentWeatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=en&units=metric`;
  const dailyForecastData = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=en&units=metric`;

  const [res1, res2] = await Promise.all([
    axios.get(currentWeatherData),
    axios.get(dailyForecastData)
  ]);

  const currentWeather = res1.data;
  const forecast = res2.data;

  const weatherData = {
    icon: currentWeather.weather[0].icon,
    temperature: Math.round(currentWeather.main.temp),
    description: currentWeather.weather[0].main,
    windSpeed: (currentWeather.wind.speed * 3.6).toFixed(2),
    humidity: currentWeather.main.humidity,
    city: currentWeather.name,
    country: countryList().getLabel(currentWeather.sys.country),
    rainProbability: forecast.list[0].pop,
  };

  return weatherData;
}