import { useState, useEffect } from "react";
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city";
import { useNavigate } from "react-router-dom";
import SearchForPlace from "../../components/searchForPlace/SearchForPlace";

const styles = {
  container: [
    "flex",
    "flex-col",
    "px-6",
    "max-w-md",
    "h-screen",
    "space-y-2",
    "container",
    "mx-auto",
  ].join(" "),
  wrapperInputs: ["flex", "flex-col", "h-full", "gap-6"].join(" "),
};

export default function Search() {
  //States to control datas of each region chosed
  const countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState<IState[]>();
  const [cityData, setCityData] = useState<ICity[]>();
  //States to control objects of each region chosed
  const [country, setCountry] = useState<ICountry>();
  const [state, setState] = useState<IState>();
  //States to control inputs of region names
  const [nameOfCountry, setNameOfCountry] = useState<string>("");
  const [nameOfState, setNameOfState] = useState<string>("");
  const [nameOfCity, setNameOfCity] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    country && setStateData(State.getStatesOfCountry(country.isoCode));
  }, [country]);

  useEffect(() => {
    country &&
      state &&
      setCityData(City.getCitiesOfState(country.isoCode, state.isoCode));
  }, [country, state]);
  //Handlers on Searches
  const handleOnSearchForCountry = (value: string) => setNameOfCountry(value);

  const handleOnSearchForState = (value: string) => setNameOfState(value);

  const handleOnSearchForCity = (value: string) => setNameOfCity(value);
  //Handlers on Clicks
  const handlerOnClickOnCountryOption = (place: ICountry) => {
    setNameOfCountry(place.name);
    setCountry(Country.getCountryByCode(place.isoCode));
  };

  const handlerOnClickOnStateOption = (place: IState) => {
    setNameOfState(place.name);
    country &&
      setState(State.getStateByCodeAndCountry(place.isoCode, country.isoCode));
  };

  const handlerOnClickOnCityOption = (place: ICity) => {
    setNameOfCity(place.name);
    const coordinates = `${place.latitude}&${place.longitude}`;
    navigate(`/${coordinates}`);
  };

  return (
    <main className={styles.container}>
      <ul className={styles.wrapperInputs}>
        <SearchForPlace
          data={countryData}
          region={"Country"}
          nameOfRegion={nameOfCountry}
          handleOnClick={handlerOnClickOnCountryOption}
          onInput={handleOnSearchForCountry}
          onFocus={() => {
            setCountry(undefined);
            setState(undefined);
          }}
        />
        {country !== undefined && (
          <SearchForPlace
            data={stateData}
            region={"State"}
            nameOfRegion={nameOfState}
            handleOnClick={handlerOnClickOnStateOption}
            onInput={handleOnSearchForState}
            onFocus={() => setState(undefined)}
          />
        )}
        {state !== undefined && (
          <SearchForPlace
            data={cityData}
            region={"City"}
            nameOfRegion={nameOfCity}
            handleOnClick={handlerOnClickOnCityOption}
            onInput={handleOnSearchForCity}
            onFocus={() => undefined}
          />
        )}
      </ul>
    </main>
  );
}