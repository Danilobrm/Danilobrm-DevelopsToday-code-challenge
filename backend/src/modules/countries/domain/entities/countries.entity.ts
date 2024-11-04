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
  countryPopulation: CountryPopulation['populationCounts'];
  countryFlag: CountryFlag['flag'];
}

export interface CountryPopulation {
  country: string;
  code: string;
  iso3: string;
  populationCounts: {
    year: number;
    value: number;
  }[];
}

export interface CountryFlag {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}
