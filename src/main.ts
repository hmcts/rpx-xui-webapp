import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ENVIRONMENT_CONFIG } from './models/environmentConfig.model';
// import 'core-js/es6/reflect';
// import 'core-js/es7/reflect';
// import "core-js/es/reflect";
// import "core-js/stable/reflect";
// import "core-js/features/reflect";

if (environment.production) {
  enableProdMode();
}

fetch('/external/configuration-ui/').then(async response => {
  let config = await response.json();
  config = config || {};
  platformBrowserDynamic([{ provide: ENVIRONMENT_CONFIG, useValue: config }])
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
});
