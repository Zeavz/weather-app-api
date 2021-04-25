import { Weather } from './weather.dto';

describe('WeatherDto', () => {
    it('should be defined', () => {
        expect(new Weather()).toBeDefined();
    });
});
