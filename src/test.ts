import 'zone.js';
import 'zone.js/testing';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Preserve Zone.js-based test behavior when Angular 21 TestBed defaults to zoneless.
@NgModule({ providers: [provideZoneChangeDetection()] })
class ZoneTestModule {}

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment([BrowserDynamicTestingModule, ZoneTestModule], platformBrowserDynamicTesting());
(globalThis as any).process = { env: { DEBUG: undefined } };
