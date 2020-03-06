import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class WeatherApi {
    BASE_API_URL = 'http://api.openweathermap.org';
    API_KEY = 'b802e80197c2f4d8e82b8d0b2b40574b';
    INIT_CITIES = ['London', 'Minsk', 'Paris', 'New York', 'Sydney', 'Tokyo'];

    constructor(http) {
      this.http = http;
    }

    getWeatherByCity(city) {
      return this.http.fetch(`${this.BASE_API_URL}/data/2.5/weather?q=${city}&units=metric&APPID=${this.API_KEY}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
          console.error('Error city not found.');
          return [];
        });
    }

    getIconUrl(icon) {
      const url = `http://openweathermap.org/img/w/${icon}.png`;
      return url;
    }

    _getInitWeather() {
      const weather = [];
      this.INIT_CITIES.forEach(element => {
        weather.push(this.getWeatherByCity(element));
      });

      return weather;
    }

    getModeDay(mode) {
      const day = mode[mode.length - 1];
      return day === 'n' ? 'night' : 'day';
    }
}
