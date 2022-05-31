// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { addMatchers, getTestScheduler, initTestScheduler, resetTestScheduler } from 'jasmine-marbles';
import 'zone.js/dist/zone-testing';



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


