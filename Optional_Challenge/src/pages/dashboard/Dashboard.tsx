//React Hooks
import { useEffect, useState } from "react";
//React Router
import { useParams } from "react-router-dom";
//Hook
import useGetWeather from "../../hooks/useGetWeather";
//Components
import Header from "../../components/Header";
import CurrentDate from "../../components/CurrentDate";
import CurrentWeather from "../../components/CurrentWeather";
import WeatherInfos from "../../components/WeatherInfos";
import Loader from "../../components/Loader";
import ErrorPage from "../../components/ErrorPage";

const styles = {
  background: [
    "bg-gradient-to-b",
    "z-0",
    "fixed",
    "top-0",
    "left-0",
    "w-full",
    "h-full",
    "overflow-hidden",
  ].join(" "),
  colorDay: [
    "from-blue-0077FF", 
    "via-blue-70B7FF", 
    "to-blue-B1E2FF"
  ].join(" "),
  colorNight: [
    "from-purple-1C0E2B",
    "via-purple-0E2354",
    "to-purple-343B6B",
  ].join(" "),
  container: [
    "px-6",
    "py-3",
    "max-w-md",
    "h-full",
    "space-y-2",
    "container",
    "mx-auto",
  ].join(" "),
};

export default function Dashboard() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const { coordinates } = useParams();
  const { weather, loading, error } = useGetWeather(lat, lon);

  const isNight = weather?.icon.includes("n");

  useEffect(() => {
    if (coordinates) {
      const arrayOfCoordinates = coordinates.split("&");
      setLat(parseFloat(arrayOfCoordinates[0]));
      setLon(parseFloat(arrayOfCoordinates[1]));
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
    } else {
      console.error(Error);
    }
  }, [coordinates, lat, lon]);

  return loading ? (
    <Loader />
  ) : error ? (
    <ErrorPage children={error} />
  ) : (
    <div
      className={`${styles.background} ${
        isNight ? styles.colorNight : styles.colorDay
      }`}
    >
      <Header />
      {weather && (
        <main className={styles.container}>
          <section>
            <h1
              className={`text-3xl ${
                isNight ? "text-white" : "text-grey-303345"
              }`}
            >
              {weather.city},<br />
              {weather.country}
            </h1>
            <CurrentDate />
          </section>
          <CurrentWeather
            icon={weather.icon}
            temperature={weather.temperature}
            description={weather.description}
            isNight={isNight}
          />
          <WeatherInfos
            rain={weather.rainProbability}
            windSpeed={weather.windSpeed}
            humidity={weather.humidity}
          />
        </main>
      )}
    </div>
  );
}
