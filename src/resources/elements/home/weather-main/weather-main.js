import { WeatherApi } from '../../../services/weather-api';
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(WeatherApi, EventAggregator)
export class MarketMain {
    @bindable cities = []

    constructor(weatherApi, eventAggregator) {
      this.weatherApi = weatherApi;
      this.ea = eventAggregator;

      const weather = this.weatherApi._getInitWeather();
      weather.forEach(element => {
        element.then(city => {
          this._addCity(city);
        });
      });
    }

    created() {
      this.ea.subscribe('cityAdd', city => {
        this._addCity(city);
      });
    }

    _addCity(city) {
      this.cities.push({
        name: city.name,
        weather: city.weather[0].main,
        temperature: city.main.temp > 0 ? `+${Math.round(city.main.temp)}` : Math.round(city.main.temp),
        icon: this.weatherApi.getIconUrl(city.weather[0].icon),
        mode: this.weatherApi.getModeDay(city.weather[0].icon)
      });
    }
}

