import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Weathers } from './weather.enum';
import { CanvasBgCreater } from './canvas-creater';

@inject(EventAggregator, Weathers)
export class WeatherBackground {
    CreateBackground = CanvasBgCreater;
    constructor(ea, weather) {
      this.ea = ea;
      this.weather = weather;
    }

    attached() {
      this.ea.subscribe('weatherData', data => {
        const srcWeatherBackground = this.weather[data.weather][data.mode];
        const createBg = new this.CreateBackground(srcWeatherBackground, this.canvas, this.img);
      });
    }
}
