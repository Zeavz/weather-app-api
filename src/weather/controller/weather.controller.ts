import { Controller, Get } from '@nestjs/common';
import { WeatherResponse } from '../dto/weather.response.dto';

@Controller('weather')
export class WeatherController {
    @Get()
    getWeather(): WeatherResponse {
        return new WeatherResponse();
    }
}
