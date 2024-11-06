import React from "react";
import { CountryInfo } from "../models/countries.interface";
import { Button, Image, ListGroup } from "react-bootstrap";
import { CountryItem } from "./CountriesListComponent";
import PopulationChart from "./PopulationChart";
import { useNavigate } from "react-router-dom";
export default function CountryInfoComponent({
  country,
}: {
  country: CountryInfo | null;
}) {
  const navigate = useNavigate();
  const changeRoute = React.useCallback(() => {
    navigate(`/`);
  }, []);

  return (
    <div style={{ margin: "20px auto 100px auto", width: "80%" }}>
      {/* condition to render country info */}
      {country ? (
        <div>
          <Button
            style={{
              margin: "20px 0",
            }}
            variant="outline-dark"
            onClick={() => changeRoute()}
          >
            GO BACK
          </Button>
          <h1>{country.commonName}</h1>

          {/* condition to render flag */}
          {country.countryFlag ? (
            <Image
              src={country.countryFlag}
              style={{
                margin: "0 auto",
                display: "flex",
                maxWidth: "100%",
                minWidth: "50%",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: 8,
              }}
            />
          ) : (
            <p>No flag image found.</p>
          )}

          <h3 style={{ padding: "20px 0" }}>Border Countries:</h3>

          {/* condition to render borders */}
          {country.borders.length ? (
            <ListGroup>
              {country.borders.map((borderCountry) => (
                <CountryItem
                  key={borderCountry.countryCode}
                  country={{
                    name: borderCountry.commonName,
                    countryCode: borderCountry.countryCode,
                  }}
                />
              ))}
              <p style={{ padding: "10px 0", fontStyle: "italic" }}>
                *didn't had time to implement this, please update the page after
                selecting one country.
              </p>
            </ListGroup>
          ) : (
            <p>border countries not found.</p>
          )}

          <h3 style={{ padding: "20px 0" }}>Population Chart:</h3>
          {/* condition to render chart */}
          {country.populationCounts.length ? (
            <PopulationChart countryPopulation={country.populationCounts} />
          ) : (
            <p>No population data available.</p>
          )}
        </div>
      ) : (
        <h1>no country found.</h1>
      )}
    </div>
  );
}
