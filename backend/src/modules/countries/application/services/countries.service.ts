import { Injectable } from '@nestjs/common';
import { Country, CountryInfo } from '../../domain/entities/countries.entity';
import { CountriesRepositoryService } from '../../infrastructure/repositories/countries-repository/countries-repository.service';

@Injectable()
export class CountriesService {
  constructor(
    private readonly countriesRepository: CountriesRepositoryService,
  ) {}

  async getAvailableCountries(): Promise<Country[]> {
    return this.countriesRepository.getAvailableCountries();
  }

  async getCountryInfo(countryCode: string): Promise<CountryInfo> {
    const countryInfo =
      await this.countriesRepository.getCountryInfo(countryCode);

    const countryFlagData = await this.countriesRepository
      .getCountriesFlag()
      .then((countriesFlag) =>
        countriesFlag.data.find(
          (country) =>
            country && 
            (country.iso2 === countryInfo.countryCode ||
              country.iso3 === countryInfo.countryCode),
        ),
      );
    const countryFlag = countryFlagData ? countryFlagData.flag : '';


    const countryPopulationData = await this.countriesRepository
      .getCountriesPopulation()
      .then((countryPopulation) =>
        countryPopulation.data.find(
          (country) => country && country.code === countryInfo.countryCode,
        ),
      );
    const countryPopulation = countryPopulationData
      ? countryPopulationData.populationCounts
      : [];

    return {
      ...countryInfo,
      countryFlag,
      countryPopulation,
    };
  }
}
