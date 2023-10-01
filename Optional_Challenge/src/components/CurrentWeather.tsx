const styles = {
  container: [
    'flex', 
    'justify-between', 
    'space-x-3'
  ].join(' '),
  image: [
    'h-30', 
    'w-30'
  ].join(' '),
  wrapper: [
    'flex',
    'flex-col', 
    'justify-center', 
    'items-center'
  ].join(' '),
  temperature: [
    'text-7xl', 
    'font-bold', 
    'flex', 
    'items-start', 
    'text-customDarkGray'
  ].join(' '),
  unit: [
    'text-lg', 
    'font-light'
  ].join(' '),
  description: [
    'text-customDarkGray', 
    'font-normal', 
    'mr-5', 
    'text-center'
  ].join(' ')
}

export default function CurrentWeather(props: {
  icon: string | undefined;
  temperature: number | null;
  description: string | undefined;
}) {
  return (
    <section className={styles.container}>
      <picture>
        <img
          className={styles.image}
          src={`http://openweathermap.org/img/wn/${props.icon}@4x.png`}
          alt="icon representing the current weather"
        />
      </picture>
      <div className={styles.wrapper}>
        <h2 className={styles.temperature}>
          {props.temperature}
          <sup className={styles.unit}>°C</sup>
        </h2>
        <h3 className={styles.description}>
          {props.description}
        </h3>
      </div>
    </section>
  );
}