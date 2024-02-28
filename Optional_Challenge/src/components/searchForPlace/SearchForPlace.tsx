//React Hook and Interfaces
import { ChangeEvent, FocusEventHandler, useState } from "react";
//Interfaces for country-state-city
import { ICity, ICountry, IState } from "country-state-city";

const styles = {
  wrapper: [
    "flex", 
    "flex-col", 
    "gap-2"
  ].join(" "),
  text: [
    "text-xs", 
    "text-grey-303345"
  ].join(" "),
  container: [
    "bg-white",
    "bg-opacity-40",
    "rounded-xl",
    "h-12",
    "border",
    "border-grey-303345",
    "px-4",
  ].join(" "),
};

interface PropsSearchForPlace {
  data: ICountry[] | IState[] | ICity[] | undefined;
  region: string;
  nameOfRegion: string;
  onInput: (newValue: string) => void;
  onFocus: FocusEventHandler<HTMLInputElement>;
  handleOnClick(place: ICountry | IState | ICity): void;
}

export default function SearchForPlace(props: PropsSearchForPlace) {
  const [value, setValue] = useState<string>("");
  const [showOptions, setShowOptions] = useState(false);

  const filteredSearch = props.data?.filter(
    (place: ICountry | IState | ICity) =>
      value && place.name.toLowerCase().includes(value.toLowerCase())
  );

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    props.onInput(newValue);
    setShowOptions(true);
  };

  const handleOnKeyDown = (e: { key: string }) => {
    if(e.key === "Enter" && filteredSearch) {
      const firstOption = filteredSearch[0];
      firstOption && props.handleOnClick(firstOption);
      setShowOptions(false)
    }
  };

  return (
    <li className={styles.wrapper}>
      <label htmlFor={props.region.toLowerCase()} className={styles.text}>
        Search for a {props.region}:{" "}
      </label>
      <input
        className={styles.container}
        id={props.region.toLowerCase()}
        type="text"
        value={props.nameOfRegion}
        placeholder={props.region}
        onInput={handleOnSearch}
        onFocus={props.onFocus}
        onKeyDown={handleOnKeyDown}
      />
      {showOptions && (
        <ul>
          {filteredSearch?.map((place: ICountry | IState | ICity) => (
            <li
              key={place.name}
              onClick={() => {
                props.handleOnClick(place);
                setShowOptions(false);
              }}
            >
              {place.name}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}