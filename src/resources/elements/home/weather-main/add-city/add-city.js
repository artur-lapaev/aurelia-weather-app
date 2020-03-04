import { WeatherApi } from '../../../../services/weather-api';
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(WeatherApi, EventAggregator)
export class AddCity {
  @bindable weatherData = [];
  @bindable city = '';
  constructor(weatherApi, ea) {
    this.ea = ea;
    this.weatherApi = weatherApi;
  }
  addCity(city) {
    if (!!city.length) {
      const weather = this.weatherApi.getWeatherByCity(city);
      weather.then(data => this.weatherData = data);
    }
  }

  weatherDataChanged(weatherData) {
    if (weatherData.message) {
      // eslint-disable-next-line no-debugger
      debugger;
    } else {
      this.ea.publish('cityAdd', this.weatherData);
    }
  }
}
