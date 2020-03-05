import { WeatherApi } from '../../../services/weather-api';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router, RouterEvent } from 'aurelia-router';

@inject(WeatherApi, EventAggregator, Router)
export class MarketMain {
  cities = [];
  activePage = 1;
  overallPageLinks = 1;
  visiblePageLinks = '10';

  constructor(weatherApi, eventAggregator, router) {
    this.weatherApi = weatherApi;
    this.ea = eventAggregator;
    this.router = router;

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

    this.ea.subscribe(RouterEvent.Complete, event => {
      const routeName = event.instruction.config.name;
      if (routeName === 'pagination') {
        const activePageNumber = +event.instruction.params.id;
        if (activePageNumber <= this.overallPageLinks) {
          this.activePage = activePageNumber;
        } else {
          this.router.navigateToRoute('pagination', { id: this.activePage });
        }
      }
    });
  }

  attached() {
    this._updatePageCounter();
  }

  onPageChanged(event) {
    this.activePage = event.detail;
    this.router.navigateToRoute('pagination', { id: event.detail });
  }

  _updatePageCounter() {
    setTimeout(() => {
      const maxPages = Math.ceil(this.cities.length / +this.visiblePageLinks);
      this.overallPageLinks = maxPages ? maxPages : 1;
      // eslint-disable-next-line no-console
      console.log('PageLinks: ', this.overallPageLinks);
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
      timeZone: city.timezone,
      class: ''
    });
  }
}
