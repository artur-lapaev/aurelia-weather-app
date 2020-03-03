import { WeatherApi } from '../../../services/weather-api';
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(WeatherApi, EventAggregator)
export class MarketMain {
    @bindable cities = []

    constructor(weatherApi) {
      this.weatherApi = weatherApi;
      const weather = this.weatherApi._getInitWeather();
      weather.forEach(element => {
        element.then(city => {
          this.cities.push({
            name: city.name,
            weather: city.weather[0].main,
            temperature: city.main.temp > 0 ? `+${Math.round(city.main.temp)}` : Math.round(city.main.temp)
          });
        });
      });
    }
}

