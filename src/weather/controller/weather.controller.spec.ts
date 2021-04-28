import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from '../service/weather.service';
import { BadRequestException } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { WeatherResponse } from '../dto/weather.response.dto';

describe('WeatherController', () => {
    let controller: WeatherController;
    const mockResponse: Observable<WeatherResponse> = of(
        new WeatherResponse('test', 'test', 12, 'test', 'test'),
    );

    let weatherServiceMock = {
        getWeather: jest.fn(),
    };

    function expectBadRequestHelper(location) {
        expect(() => {
            controller.getWeather(location);
        }).toThrow(BadRequestException);
    }

    beforeEach(async () => {
        jest.spyOn(weatherServiceMock, 'getWeather').mockReturnValue(
            mockResponse,
        );
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: WeatherService,
                    useValue: weatherServiceMock,
                },
            ],
            controllers: [WeatherController],
        }).compile();

        controller = module.get<WeatherController>(WeatherController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('should validate ', () => {
        it('false for x', function () {
            expectBadRequestHelper('x');
        });

        it('false for x,,,', function () {
            expectBadRequestHelper('x,,,');
        });

        it('false for ,x,,', function () {
            expectBadRequestHelper('x,,,');
        });

        it('false for ,,,', function () {
            expectBadRequestHelper(',,,');
        });

        it('false for ,,,', function () {
            expectBadRequestHelper(',,,');
        });

        it('false for blank', function () {
            expectBadRequestHelper('');
        });

        it('true for x,y,z', function () {
            expect(controller.getWeather('x,y,z')).toBe(mockResponse);
        });

        it('true for x,,', function () {
            expect(controller.getWeather('x,,')).toBe(mockResponse);
        });
    });
});
