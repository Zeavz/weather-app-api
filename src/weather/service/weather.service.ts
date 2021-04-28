import {
    HttpException,
    HttpService,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { catchError, filter, map, pluck, take } from 'rxjs/operators';
import { WeatherResponse } from '../dto/weather.response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
    private weatherApiUrl: string = this.configService.get<string>(
        'WEATHER_API_URL',
    );
    private weatherApiKey: string = this.configService.get<string>(
        'WEATHER_API_KEY',
    );

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    getWeather(city: string): Observable<WeatherResponse> {
        return this.httpService
            .get(this.weatherApiUrl, {
                params: {
                    q: city,
                    units: 'metric',
                    appid: this.weatherApiKey,
                },
            })
            .pipe(
                filter((data) => !!data),
                take(1),
                pluck('data'),
                map((data) => {
                    return new WeatherResponse(
                        data.name,
                        data.sys.country,
                        data.main.temp,
                        data.weather[0].icon,
                        data.weather[0].description,
                    );
                }),
                catchError((err) => {
                    // Ideally print this to some logging system as well
                    console.log(err);
                    throw new HttpException(
                        'Bummer... something went wrong',
                        HttpStatus.I_AM_A_TEAPOT,
                    );
                }),
            );
    }
}
