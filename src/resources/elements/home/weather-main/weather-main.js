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
      const icon = this.weatherApi.getIconUrl(city.weather[0].icon);
      const mode = this.weatherApi.getModeDay(city.weather[0].icon);
      this.cities.push({
        name: city.name,
        weather: city.weather[0].main,
        temperature: city.main.temp > 0 ? `+${Math.round(city.main.temp)}` : Math.round(city.main.temp),
        icon: icon,
        mode: mode,
        class: this._getCssClass(mode, city.weather[0].main)
      });
    }

    _getCssClass(mode, weather) {
      let cssClass = '';
      switch (weather) {
      case 'Clouds':
        cssClass = `weather-cloud-${mode}`;
        break;
      case 'Clear':
        cssClass = `weather-clear-${mode}`;
        break;
      case 'Rain':
        cssClass = `weather-rain-${mode}`;
        break;
      case 'Fog':
      case 'Mist':
        cssClass = `weather-fog-${mode}`;
        break;
      default:
        break;
      }

      return cssClass;
    }
}

