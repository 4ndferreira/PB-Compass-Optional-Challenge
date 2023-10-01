const styles = {
  date: [
    'text-sm', 
    'text-customGray'
  ].join(' ')
}

export default function CurrentDate() {
  const formatDate: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "2-digit",
  };

  const today = new Date();
  const showCurrentDate = today.toLocaleDateString("en-US", formatDate);
  //console.log(showCurrentDate);
  return (
    <p className={styles.date}>{showCurrentDate}</p>
  )
}