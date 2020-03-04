import { WeatherApi } from '../../../services/weather-api';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(WeatherApi, EventAggregator)
export class MarketMain {
    cities = [];
    activePage = 1;
    overallPageLinks = 1;
    visiblePageLinks = '10';

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
        this._updatePageCounter();
      });
    }


    attached() {
      this._updatePageCounter();
    }

    onPageChanged(event) {
      this.activePage = event.detail;
    }

    _updatePageCounter() {
      setTimeout(() => {
        this.overallPageLinks = Math.ceil(this.cities.length / +this.visiblePageLinks);
      }, 100);
    }

    _addCity(city) {
      const icon = this.weatherApi.getIconUrl(city.weather[0].icon);
      const mode = this.weatherApi.getModeDay(city.weather[0].icon);
      this.cities.push({
        name: city.name,
        country: city.sys.country,
        weather: city.weather[0].main,
        temperature: city.main.temp > 0 ? `+${Math.round(city.main.temp)}` : Math.round(city.main.temp),
        icon: icon,
        mode: mode,
        class: ''
      });
    }
}

