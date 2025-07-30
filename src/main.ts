import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ENVIRONMENT_CONFIG } from './models/environmentConfig.model';

const meta = document.querySelector<HTMLMetaElement>('meta[name="csp-nonce"]');
if (meta?.content) {
  new MutationObserver((records) => {
    for (const rec of records) {
      rec.addedNodes.forEach((node) => {
        if (node.nodeName === 'STYLE') {
          (node as HTMLStyleElement).setAttribute('nonce', meta.content);
        }
      });
    }
  }).observe(document.head, { childList: true });
}

if (environment.production) {
  enableProdMode();
}

fetch('/external/configuration-ui/').then(async (response) => {
  let config = await response.json();
  config = config || {};
  platformBrowserDynamic([{ provide: ENVIRONMENT_CONFIG, useValue: config }])
    .bootstrapModule(AppModule)
    .catch((err) => console.log(err));
});
