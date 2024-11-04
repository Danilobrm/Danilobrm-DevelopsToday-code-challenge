import { Injectable } from '@nestjs/common';
import {
  Country,
  CountryFlag,
  CountryInfo,
  CountryPopulation,
} from '../../domain/entities/countries.entity';
import { CountriesRepositoryService } from '../../infrastructure/repositories/countries-repository/countries-repository.service';
import { AppError } from 'src/common/errors/AppError';

@Injectable()
export class CountriesService {
  constructor(
    private readonly countriesRepository: CountriesRepositoryService,
  ) {}

  async getAvailableCountries(): Promise<Country[]> {
    return this.countriesRepository.getAvailableCountries(); //iso2
  }

  async getCountryInfo(countryCode: string): Promise<CountryInfo> {
    return await this.countriesRepository.getCountryInfo(countryCode);
  }

  async getCountriesFlag(): Promise<CountryFlag[]> {
    return await this.countriesRepository.getCountriesFlag();
  }

  async getCountriesPopulation(): Promise<CountryPopulation[]> {
    return await this.countriesRepository.getCountriesPopulation();
  }
}

// .then((countriesFlag) =>
//   countriesFlag.data.find(
//     (country) =>
//       country &&
//       (country.iso2 === countryInfo.countryCode ||
//         country.iso3 === countryInfo.countryCode),
//   ),
// );
// const countryFlag = countryFlagData ? countryFlagData.flag : '';

// .then((countryPopulation) =>
//   countryPopulation.data.find(
//     (country) => country && country.code === countryInfo.countryCode,
//   ),
// );
// const countryPopulation = countryPopulationData
// ? countryPopulationData.populationCounts
// : [];
