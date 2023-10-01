const styles = {
  wrapper: [
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'h-screen',
    'space-y-4',
    'm-auto'
  ].join(' '),
  text: [
    'text-3xl',
    'text-customDarkGray',
    'animate-pulse'
  ].join(' '),
  loader: [
    'inline-block',
    'h-14', 
    'w-14', 
    'animate-spin', 
    'rounded-full', 
    'border', 
    'border-customDarkGray', 
    'border-solid', 
    'border-current', 
    'border-r-transparent', 
    'align-[-0.125em]', 
    'motion-reduce:animate-[spin_1.5s_linear_infinite]'
  ].join(' ')
}

export default function Loader() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        Loading...
      </p>  
      <div 
        className={styles.loader}
        role="status">
      </div>
    </div>
  )
}