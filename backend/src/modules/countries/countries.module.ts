import { Module } from '@nestjs/common';
import { CountriesController } from './application/controllers/countries.controller';
import { CountriesService } from './application/services/countries.service';
import { CountriesRepositoryService } from './infrastructure/repositories/countries-repository/countries-repository.service';

@Module({
  imports: [],
  controllers: [CountriesController],
  providers: [CountriesService, CountriesRepositoryService],
})
export class CountriesModule {}
