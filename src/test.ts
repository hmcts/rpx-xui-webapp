/* eslint-disable-next-line */
import 'zone.js/dist/zone-testing';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { addMatchers, getTestScheduler, initTestScheduler, resetTestScheduler } from 'jasmine-marbles';


declare const require: any;

// REMOVE AFTER UPGRADING to jasmine-marbles 0.6.0
jasmine.getEnv().beforeAll(() => {
  return addMatchers();
});
jasmine.getEnv().beforeEach(() => {
 initTestScheduler();
});
jasmine.getEnv().afterEach(() => {
 getTestScheduler().flush();
 resetTestScheduler();
});

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);


