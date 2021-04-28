import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { cold } from 'jest-marbles';
import { HttpService } from '@nestjs/common';
import { of } from 'rxjs';
import { WeatherResponse } from '../dto/weather.response.dto';
import { ConfigService } from '@nestjs/config';

describe('WeatherService', () => {
    let service: WeatherService;
    const openWeatherResponse = {
        coord: {
            lon: -68.5219,
            lat: 63.7494,
        },
        weather: [
            {
                id: 800,
                main: 'Clear',
                description: 'clear sky',
                icon: '01n',
            },
        ],
        base: 'stations',
        main: {
            temp: -6,
            feels_like: -6,
            temp_min: -6,
            temp_max: -6,
            pressure: 1034,
            humidity: 79,
        },
        visibility: 10000,
        wind: {
            speed: 1.03,
            deg: 280,
        },
        clouds: {
            all: 1,
        },
        dt: 1619575186,
        sys: {
            type: 1,
            id: 797,
            country: 'CA',
            sunrise: 1619511683,
            sunset: 1619570502,
        },
        timezone: -14400,
        id: 5983720,
        name: 'Iqaluit',
        cod: 200,
    };
    const response: WeatherResponse = {
        name: 'Iqaluit',
        country: 'CA',
        temperature: -6,
        weatherIcon: '01n',
        weatherDescription: 'clear sky',
    };

    let mockHttpService = {
        get: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: HttpService,
                    useValue: mockHttpService,
                },
                WeatherService,
                ConfigService,
            ],
        }).compile();

        service = module.get<WeatherService>(WeatherService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should emit weather response', () => {
        jest.spyOn(mockHttpService, 'get').mockReturnValue(
            of({ data: openWeatherResponse }),
        );
        const expected = { a: response };

        expect(service.getWeather('test')).toBeObservable(
            cold('(a|', expected),
        );
    });

    it('should do nothing', () => {
        jest.spyOn(mockHttpService, 'get').mockReturnValue(of(null));
        const expected = { a: null };

        expect(service.getWeather('test')).toBeObservable(cold('|', expected));
    });
});
