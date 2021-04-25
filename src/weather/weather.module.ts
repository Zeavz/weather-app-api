import { Module } from '@nestjs/common';
import { WeatherController } from './controller/weather.controller';
import { WeatherService } from './service/weather.service';

@Module({
    controllers: [WeatherController],
    providers: [WeatherService],
})
export class WeatherModule {}
