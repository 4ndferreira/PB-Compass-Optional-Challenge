const styles = {
  container: [
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
    'text-center'
  ].join(' ')
}

export default function ErrorPage(props: {children: string}) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        {props.children}
      </p>
    </div>
  )
}