import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ENVIRONMENT_CONFIG } from './models/environmentConfig.model';

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
