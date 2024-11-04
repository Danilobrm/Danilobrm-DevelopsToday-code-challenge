import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from '../services/countries.service';
import {
  Country,
  CountryFlag,
  CountryInfo,
  CountryPopulation,
} from '../../domain/entities/countries.entity';
import { AppError } from 'src/common/errors/AppError';

interface CountryInfoTest {
  countryInfo: CountryInfo;
  countryFlag: string | '';
  populationCounts: CountryPopulation['populationCounts'];
}

@Controller('')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('countries')
  async getAvailableCountries(): Promise<Country[]> {
    const countries = await this.countriesService.getAvailableCountries();
    //set a map with countries code

    console.log(countries.length);
    return countries;
  }

  @Get('country/:countryCode')
  async getCountryInfo(
    @Param() param: { countryCode: string },
  ): Promise<CountryInfoTest | AppError> {
    const { countryCode } = param;

    const countryInfo = await this.countriesService.getCountryInfo(countryCode); //iso2
    const countriesFlag = await this.countriesService.getCountriesFlag(); //iso2, iso3
    const countriesPopulation =
      await this.countriesService.getCountriesPopulation(); //iso3

    // this code above is made to improve query time
    const countriesCodesMap = new Map<string, string>();
    const countriesFlagMap = new Map<string, string>();
    for (const i in countriesFlag) {
      const iso2 = countriesFlag[i].iso2.toLowerCase();

      // map iso2 and iso3
      countriesCodesMap.set(iso2, countriesFlag[i].iso3);
      // map iso2 and flags
      countriesFlagMap.set(iso2, countriesFlag[i].flag);
    }

    const countryIso3 = countriesCodesMap.get(countryCode);

    //get countryFlag and countryPopulation
    const countryFlag = countriesFlagMap.get(countryCode);
    const countryPopulation = countriesPopulation.find(
      (countryPopulation) => countryPopulation.iso3 === countryIso3,
    );

    return {
      countryInfo,
      countryFlag: countryFlag || '',
      populationCounts: countryPopulation?.populationCounts || [],
    };
  }
}
