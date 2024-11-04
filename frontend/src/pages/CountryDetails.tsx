import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CountryInfo } from "../models/countries.interface";
import { getCountryInfo } from "../services/api";
import Loading from "../components/Loading";
import CountryInfoComponent from "../components/CountryInfoComponent";

export default function CountryDetails() {
  const { countryCode } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(() => {
    // Check if there's cached data for the specific country in localStorage
    const cachedCountryInfo = localStorage.getItem(
      `countryInfo_${countryCode}`
    );
    return cachedCountryInfo ? JSON.parse(cachedCountryInfo) : null; // Parse and return cached data or null
  });

  useEffect(() => {
    if (!countryInfo) fetchCountryInfo();
  }, []);

  async function fetchCountryInfo() {
    setLoading(true);
    if (countryCode) {
      const country = await getCountryInfo(countryCode);

      if (country) {
        console.log(country);
        setCountryInfo(country);
        localStorage.setItem(
          `countryInfo_${countryCode}`,
          JSON.stringify(country)
        );
      }
      setLoading(false);
    }
  }

  return (
    <div style={{ margin: "0 auto", width: "fit-content" }}>
      {loading ? (
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
        <>
          <CountryInfoComponent countryInfo={countryInfo} />
        </>
      )}
    </div>
  );
}
