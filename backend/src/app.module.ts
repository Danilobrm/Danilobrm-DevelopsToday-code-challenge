import { Module } from '@nestjs/common';
import { CountriesModule } from './modules/countries/countries.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CountriesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
