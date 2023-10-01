import WeatherInfoCard from "./WeatherInfoCard";
import {HumidityIcon, UmbrellaIcon, WindIcon} from "./Icons"

export default function WeatherInfos(props: { 
  rain: number | undefined;
  windSpeed: string | null;
  humidity: number | undefined; 
}) {
  const weatherInfo = [
    {
      id: 1,
      icon: <UmbrellaIcon />,
      text: "Rain probability",
      value: `${props.rain}%`,
    },
    {
      id: 2,
      icon: <WindIcon />,
      text: "Wind",
      value: `${props.windSpeed} km/h`,
    },
    {
      id: 3,
      icon: <HumidityIcon />,
      text: "Humidity",
      value: `${props.humidity}%`,
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
}