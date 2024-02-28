//React Router
import { useNavigate } from "react-router-dom";
//Icons
import { MenuIcon, SearchIcon } from "./Icons";

const styles = {
  container: [
    "flex",
    "justify-between",
    "h-[3.5rem]",
    "w-full",
    "p-4",
    "max-w-md",
    "mx-auto",
  ].join(" "),
  buttom: [
    "border-0", 
    "rounded-full",
    "h-6",
    "w-6", 
    "p-0", 
    "bg-transparent"
  ].join(" ")
};

export default function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <nav className={styles.container}>
        <button
          className={styles.buttom}
          type="button"
          onClick={() => navigate("/search")}
        >
          <SearchIcon />
        </button>
        <button className={styles.buttom} type="button">
          <MenuIcon />
        </button>
      </nav>
    </header>
  );
}
