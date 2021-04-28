import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { WeatherResponse } from '../dto/weather.response.dto';
import { WeatherService } from '../service/weather.service';
import { Observable } from 'rxjs';

@Controller('weather')
export class WeatherController {
    constructor(private weatherService: WeatherService) {}

    @Get()
    getWeather(@Query('location') location): Observable<WeatherResponse> {
        // What to ensure location string follow the format of {city, state?, country?}
        if (!/^(?!,)[^,\n]*((,[^,\n]*){2}$)/.test(location))
            throw new BadRequestException(
                'Please ensure location is in the format {city, state?, country?}',
            );

        return this.weatherService.getWeather(location);
    }
}
