import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { MOCK_ENVIRONMENT_CONFIG } from './app/app.test-constants.spec';
import { ENVIRONMENT_CONFIG } from './models/environmentConfig.model';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting([
    { provide: ENVIRONMENT_CONFIG, useValue: MOCK_ENVIRONMENT_CONFIG },
    { provide: Window, useValue: window },
  ])
);

(window as any).process = { env: { DEBUG: undefined } };
