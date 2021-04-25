import { IsNumber, IsString } from 'class-validator';

export class WeatherResponse {
    @IsString()
    name: String;

    @IsString()
    country: String;

    @IsNumber()
    temperature: Number;

    @IsString()
    weather: String;

    @IsString()
    weatherDescription: String;
}
