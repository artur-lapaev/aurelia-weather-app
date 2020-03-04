export class SetClassByWeatherValueConverter {
  toView(value, city, weather, mode) {
    if (city) {
      let cssClass = '';
      switch (weather) {
      case 'Clouds':
        cssClass = `weather-cloud-${mode}`;
        break;
      case 'Clear':
        cssClass = `weather-clear-${mode}`;
        break;
      case 'Rain':
      case 'Drizzle':
        cssClass = `weather-rain-${mode}`;
        break;
      case 'Thunderstorm':
        cssClass = `weather-thunderstorm-${mode}`;
        break;
      case 'Snow':
        cssClass = `weather-snow-${mode}`;
        break;
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
      case 'Sand':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
        cssClass = `weather-fog-${mode}`;
        break;
      default:
        break;
      }
      city.class = cssClass;
      return city.class;
    }
  }
}
