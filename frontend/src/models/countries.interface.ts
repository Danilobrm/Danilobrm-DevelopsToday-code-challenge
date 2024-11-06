export interface Country {
  countryCode: string;
  name: string;
}

export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryInfo[];
  countryFlag: string;
  populationCounts: {
    year: number;
    value: number;
  }[];
}