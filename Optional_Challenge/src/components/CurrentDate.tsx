const CurrentDate = () => {
  const formatDate: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "2-digit",
  };

  const today = new Date();
  const showCurrentDate = today.toLocaleDateString("en-US", formatDate);
  //console.log(showCurrentDate);
  return (
    <p className='text-sm text-customGray'>{showCurrentDate}</p>
  )
}

export default CurrentDate