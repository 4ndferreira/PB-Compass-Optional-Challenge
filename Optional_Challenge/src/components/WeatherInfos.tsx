import WeatherInfoCard from "./WeatherInfoCard";

const WeatherInfos: React.FC<{
  rain: number | undefined;
  windSpeed: string | null;
  humidity: number | undefined;
}> = ({ rain, windSpeed, humidity }) => {
  const weatherInfo = [
    {
      id: 1,
      icon: "Umbrella.svg",
      text: "Rain probability",
      value: `${rain}%`,
    },
    {
      id: 2,
      icon: "Wind.svg",
      text: "Wind",
      value: `${windSpeed} km/h`,
    },
    {
      id: 3,
      icon: "Humidity.svg",
      text: "Humidity",
      value: `${humidity}%`,
    },
  ];
  return <section>
  <ul className="space-y-2 flex flex-col">
    {weatherInfo.map((card) => (
      <WeatherInfoCard
        key={card.id}
        icon={card.icon}
        text={card.text}
        value={card.value}
      />
    ))}
  </ul>
</section>;
};

export default WeatherInfos;
