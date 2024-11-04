import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from '../services/countries.service';
import { Country, CountryInfo } from '../../domain/entities/countries.entity';

@Controller('')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('countries')
  async getAvailableCountries(): Promise<Country[]> {
    return await this.countriesService.getAvailableCountries();
  }

  @Get('countryInfo/:countryCode')
  async getCountryInfo(
    @Param() param: { countryCode: string },
  ): Promise<CountryInfo> {
    return await this.countriesService.getCountryInfo(param.countryCode);
  }
}
