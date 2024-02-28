const styles = {
  container: [
    'flex', 
    'justify-between', 
  ].join(' '),
  image: [
    'flex',
    'h-32'
  ].join(' '),
  wrapper: [
    "grid", 
    "grid-flow-col", 
    "auto-cols-auto",  
    "auto-rows-auto",
    "my-3"
  ].join(' '),
  temperature: [
    "col-start-1", 
    "font-bold", 
    "text-8xl", 
    "leading-none", 
    "flex", 
    "justify-center", 
    "items-center",
  ].join(' '),
  unit: [
    "col-start-2", 
    "text-lg",
    "flex", 
    "justify-center", 
    "items-start",
  ].join(' '),
  description: [
    "col-start-1", 
    "col-end-2", 
    "row-start-2", 
    "font-normal", 
    "leading-none", 
    "flex", 
    "justify-center", 
    "items-start",
  ].join(' ')
}

export default function CurrentWeather(props: {
  icon: string | undefined;
  temperature: number | null;
  description: string | undefined;
  isNight: boolean | undefined
}) {
  return (
    <section className={styles.container}>
      <picture>
        <img
          className={styles.image}
          // src={`http://openweathermap.org/img/wn/${props.icon}@4x.png`}
          src={`../../icons/white/128x128/${props.icon}.png`}
          alt="icon representing the current weather"
        />
      </picture>
      <p className={`${styles.wrapper} ${props.isNight ? "text-white" : "text-grey-303345"}`}>
        <span className={styles.temperature}>{props.temperature}</span>
        <span className={styles.unit}>°C</span>
        <span className={styles.description}>
          {props.description}
        </span>
      </p>
    </section>
  );
}