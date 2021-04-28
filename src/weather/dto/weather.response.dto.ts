import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WeatherResponse {
    @IsString()
    name: string;

    @IsString()
    country: string;

    @IsNumber()
    temperature: Number;

    @IsString()
    weatherIcon: string;

    @IsString()
    weatherDescription: string;

    constructor(
        name: string,
        country: string,
        temperature: Number,
        weatherIcon: string,
        weatherDescription: string,
    ) {
        this.name = name;
        this.country = country;
        this.temperature = temperature;
        this.weatherIcon = weatherIcon;
        this.weatherDescription = weatherDescription;
    }
}
