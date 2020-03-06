import { WeatherApi } from '../../../../services/weather-api';
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { MdToastService } from "aurelia-materialize-bridge";

@inject(WeatherApi, EventAggregator, MdToastService)
export class AddCity {
  @bindable weatherData = [];
  @bindable city = '';
  constructor(weatherApi, ea, mdToastService) {
    this.ea = ea;
    this.toast = mdToastService;
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
      this.toast.show('Incorrect city', 3000, 'red');
    } else {
      this.ea.publish('cityAdd', this.weatherData);
    }
  }
}
