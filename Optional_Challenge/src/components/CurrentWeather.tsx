const CurrentWeather: React.FC<{
  icon: string | undefined;
  temperature: number | null;
  description: string | undefined;
}> = ({ icon, temperature, description }) => {
  return (
    <section className="flex justify-between space-x-3">
      <picture>
        <img
          className="h-30 w-30"
          src={`http://openweathermap.org/img/wn/${icon}@4x.png`}
          alt="icon representing the current weather"
        />
      </picture>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-7xl font-bold flex items-start text-customDarkGray">
          {temperature}
          <sup className="text-lg font-light">°C</sup>
        </h2>
        <h3 className="text-customDarkGray font-normal mr-5 text-center">
          {description}
        </h3>
      </div>
    </section>
  );
};

export default CurrentWeather;
