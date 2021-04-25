import { WeatherResponse } from './weather.response.dto';

describe('WeatherResponse.Dto', () => {
    it('should be defined', () => {
        expect(new WeatherResponse()).toBeDefined();
    });
});
