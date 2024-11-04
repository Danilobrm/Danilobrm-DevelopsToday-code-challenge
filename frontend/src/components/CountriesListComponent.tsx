import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Country } from "../models/countries.interface";
import { getCountries } from "../services/api";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export const CountriesListComponent: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>(() => {
    const cachedCountries = localStorage.getItem("countries");
    return cachedCountries ? JSON.parse(cachedCountries) : [];
  });

  useEffect(() => {
    if (countries.length === 0) {
      fetchCountries();
    }
  }, []);

  async function fetchCountries() {
    const countries = await getCountries();
    if (countries) {
      setCountries(countries);
      localStorage.setItem("countries", JSON.stringify(countries));
    }
  }

  return (
    <ListGroup style={{ width: "60%", margin: "0 auto" }}>
      <h1 className="">Country List</h1>
      {countries.map((country: Country) => (
        <CountryItem key={country.countryCode} country={country} />
      ))}
    </ListGroup>
  );
};

export const CountryItem = React.memo(({ country }: { country: Country }) => {
  const navigate = useNavigate();

  const changeRoute = React.useCallback((countryCodeValue: string) => {
    navigate(`/country/${countryCodeValue}`);
  }, []);

  return (
    <ListGroup.Item
      onClick={() => changeRoute(country.countryCode)}
      action
      style={{ cursor: "pointer" }}
    >
      {country.name}
    </ListGroup.Item>
  );
});
