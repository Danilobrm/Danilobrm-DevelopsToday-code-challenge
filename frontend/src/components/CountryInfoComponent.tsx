import React, { Suspense, useEffect, useRef } from "react";
import { CountryInfo } from "../models/countries.interface";
import { Button, Image, ListGroup } from "react-bootstrap";
import { CountryItem } from "./CountriesListComponent";
import PopulationChart from "./PopulationChart";
import { useNavigate } from "react-router-dom";

export default function CountryInfoComponent({
  countryInfo,
}: {
  countryInfo: CountryInfo | null;
}) {
  const navigate = useNavigate();
  const changeRoute = React.useCallback(() => {
    navigate(`/`);
  }, []);

  return (
    <div style={{ margin: "20px auto", maxWidth: "80%" }}>
      {countryInfo?.commonName ? (
        <Suspense>
          <div>
            <Button variant="dark" onClick={() => changeRoute()}>
              Go back to countries list
            </Button>

            <h1>{countryInfo.commonName}</h1>
            {countryInfo.countryFlag ? (
              <Image
                style={{ maxWidth: "100%" }}
                src={countryInfo.countryFlag}
              />
            ) : (
              <p>No flag image found.</p>
            )}
            <h3 style={{ padding: "20px 0" }}>Border Countries:</h3>

            {countryInfo.borders.length ? (
              <>
                <ListGroup>
                  {countryInfo.borders.map((borderCountry) => (
                    <CountryItem
                      key={borderCountry.countryCode}
                      country={{
                        name: borderCountry.commonName,
                        countryCode: borderCountry.countryCode,
                      }}
                    />
                  ))}
                </ListGroup>
                <p>
                  *didn't had time to implement this, please update the page
                  after selecting one country.
                </p>
              </>
            ) : (
              <p>border country not found.</p>
            )}
            <h3 style={{ padding: "20px 0" }}>Population Chart:</h3>
            {countryInfo.countryPopulation.length ? (
              <PopulationChart data={countryInfo.countryPopulation} />
            ) : (
              <p>no chart available.</p>
            )}
          </div>
        </Suspense>
      ) : (
        <h1>nenhum país encontrado.</h1>
      )}
    </div>
  );
}
