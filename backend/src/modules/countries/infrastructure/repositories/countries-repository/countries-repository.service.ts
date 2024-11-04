import { Injectable } from '@nestjs/common';
import {
  Country,
  CountryFlag,
  CountryInfo,
  CountryPopulation,
} from '../../../domain/entities/countries.entity';
import { AppError } from '../../../../../common/errors/AppError';

@Injectable()
export class CountriesRepositoryService {
  async getAvailableCountries(): Promise<Country[]> {
    try {
      return await fetch('https://date.nager.at/api/v3/AvailableCountries', {
        method: 'GET',
      }).then((response) => response.json());
    } catch (error) {
      throw new AppError(error);
    }
  }

  async getCountryInfo(countryCode: string): Promise<CountryInfo> {
    try {
      return await fetch(
        `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
        {
          method: 'GET',
        },
      ).then((response) => response.json());
    } catch (error) {
      throw new AppError(error);
    }
  }

  async getCountriesPopulation(): Promise<{
    error: boolean;
    msg: string;
    data: CountryPopulation[];
  }> {
    try {
      const population = await fetch(
        `https://countriesnow.space/api/v0.1/countries/population`,
        {
          method: 'GET',
        },
      ).then((response) => response.json());
      return population;
    } catch (error) {
      throw new AppError(error);
    }
  }

  async getCountriesFlag(): Promise<{
    error: boolean;
    msg: string;
    data: CountryFlag[];
  }> {
    try {
      const flags = await fetch(
        `https://countriesnow.space/api/v0.1/countries/flag/images`,
        {
          method: 'GET',
        },
      ).then((response) => response.json());

      return flags;
    } catch (error) {
      throw new AppError(error);
    }
  }
}
