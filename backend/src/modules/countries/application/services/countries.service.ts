import { Injectable } from '@nestjs/common';
import {
  Country,
  CountryFlag,
  CountryInfo,
  CountryPopulation,
} from '../../domain/entities/countries.entity';
import { CountriesRepositoryService } from '../../infrastructure/repositories/countries-repository/countries-repository.service';

@Injectable()
export class CountriesService {
  constructor(
    private readonly countriesRepository: CountriesRepositoryService,
  ) {}

  async getAvailableCountries(): Promise<Country[]> {
    return await this.countriesRepository.getAvailableCountries(); //iso2
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