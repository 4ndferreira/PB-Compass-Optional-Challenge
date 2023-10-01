import { MenuIcon, SearchIcon } from "./Icons";

const styles = {
  container: [
    'flex', 
    'justify-between', 
    'h-[3.5rem]', 
    'w-full', 
    'p-4', 
    'max-w-md', 
    'mx-auto'
  ].join(' ')
}

export default function NavBar() {
  return (
    <nav className={styles.container}>
      <SearchIcon />
      <MenuIcon />
    </nav>
  );
}