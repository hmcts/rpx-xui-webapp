import { enableProdMode, CSP_NONCE } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ENVIRONMENT_CONFIG } from './models/environmentConfig.model';

// @hmcts/media-viewer 4.2.30 points at a .js file that is not included in the
// package. Use the shipped ES module worker before the application bootstraps.
GlobalWorkerOptions.workerSrc = '/assets/build/pdf.worker.min.mjs';

/* ①  Read the <meta name="csp-nonce"> placed by the server template */
const nonce = document.querySelector<HTMLMetaElement>('meta[name="csp-nonce"]')?.content || '';

if (environment.production) {
  enableProdMode();
}

/* ②  Fetch runtime config, then bootstrap with the nonce providers */
fetch('/external/config/ui/')
  .then(async (res) => (await res.json()) || {})
  .then((config) =>
    platformBrowserDynamic([
      { provide: ENVIRONMENT_CONFIG, useValue: config },
      { provide: CSP_NONCE, useValue: nonce },
    ]).bootstrapModule(AppModule)
  )
  .catch((err) => console.error(err));
