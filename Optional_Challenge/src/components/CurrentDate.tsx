const styles = {
  date: [
    'text-sm', 
    'text-grey-9A938C'
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
  return (
    <p className={styles.date}>{showCurrentDate}</p>
  )
}