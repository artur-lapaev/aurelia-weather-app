import { PLATFORM } from 'aurelia-pal';
export class App {
  configureRouter(config, router) {
    config.title = 'Weather';
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('./resources/elements/home/home'), title: 'Home' }
    ]);

    this.router = router;
  }
}
