import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/common/http';
import { WeatherController } from './controller/weather.controller';
import { WeatherService } from './service/weather.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [HttpModule, ConfigModule],
    controllers: [WeatherController],
    providers: [WeatherService],
})
export class WeatherModule {}
