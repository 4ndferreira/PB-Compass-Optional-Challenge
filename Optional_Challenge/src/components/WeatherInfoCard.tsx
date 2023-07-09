const WeatherInfoCard: React.FC<{icon: string, text: string, value: string}> = ({ icon, text, value }) => {
  return <li className='px-5 py-3 max-w-full bg-white bg-opacity-40 rounded-2xl flex justify-between items-center'>
    <div className='flex items-center space-x-3'>
      <picture className='h-9 w-9 bg-white rounded-xl flex justify-center items-center'>
        <img 
          className='h-5 w-5' 
          src={`assets/${icon}`}
          alt='drop icon representing humidity' 
        />
      </picture>
      <p className='text-xs text-customDarkGray'>{text}</p>
    </div>
    <p className='text-xs text-customDarkGray'>{value}</p>
  </li>
}

export default WeatherInfoCard
