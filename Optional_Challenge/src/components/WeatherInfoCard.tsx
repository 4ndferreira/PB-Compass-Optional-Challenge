import { ReactElement } from "react";

const styles = {
  container: [
    'px-5', 
    'py-3', 
    'max-w-full', 
    'bg-white', 
    'bg-opacity-40', 
    'rounded-2xl', 
    'flex', 
    'justify-between', 
    'items-center'
  ].join(' '),
  wrapper: [
    'flex', 
    'items-center', 
    'space-x-3'
  ].join(' '),
  icon: [
    'h-9',
    'w-9', 
    'bg-white', 
    'rounded-xl', 
    'flex', 
    'justify-center', 
    'items-center'
  ].join(' '),
  text: [
    'text-xs', 
    'text-customDarkGray'
  ].join(' ')
}

export default function WeatherInfoCard(props: {
  icon: ReactElement;
  text: string;
  value: string;
}) {
  return (
    <li className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.icon}>
          {props.icon}
        </div>
        <p className={styles.text}>{props.text}</p>
      </div>
      <p className={styles.text}>{props.value}</p>
    </li>
  );
}