import { API_URL } from "../constants/env";
import { Country, CountryInfo } from "../models/countries.interface";

export const getCountries = async (): Promise<Country[] | null> => {
  try {
    const response = await fetch(`${API_URL}/countries`, {
      method: "GET",
    }).then((countries) => countries);

    console.log(response);

    return await response.json();
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
};

export const getCountryInfo = async (
  countryCode: string
): Promise<CountryInfo | null> => {
  try {
    const response = await fetch(`${API_URL}/country/${countryCode}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error: unknown) {
    return null;
  }
};
