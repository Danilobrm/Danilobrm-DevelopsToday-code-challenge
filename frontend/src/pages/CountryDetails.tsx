import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CountryInfo } from "../models/countries.interface";
import { getCountryInfo } from "../services/api";
import Loading from "../components/Loading";
import CountryInfoComponent from "../components/CountryInfoComponent";

export default function CountryDetails() {
  const { countryCode } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [country, setCountryInfo] = useState<CountryInfo | null>(() => {
    // Check if there's cached data for the specific country in localStorage
    const cachedCountryInfo = localStorage.getItem(`${countryCode}`);
    return cachedCountryInfo ? JSON.parse(cachedCountryInfo) : null; // Parse and return cached data or null
  });

  useEffect(() => {
    if (!country) fetchCountryInfo();
  }, []);

  async function fetchCountryInfo() {
    setIsLoading(true);
    if (countryCode) {
      const country = await getCountryInfo(countryCode);

      if (country) {
        setCountryInfo(country);
        localStorage.setItem(`${countryCode}`, JSON.stringify(country));
      }
      setIsLoading(false);
    }
  }

  return (
    <div style={{ margin: "0 auto", width: "80%" }}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            margin: "0",
          }}
        >
          <Loading />
        </div>
      ) : (
        <CountryInfoComponent country={country} />
      )}
    </div>
  );
}
