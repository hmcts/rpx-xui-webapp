import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { environment } from '../../../environments/environment';

enum IsDebugMode {
  OFF,
  ERROR,
  WARN,
  DEBUG
}

export let isDebugMode = IsDebugMode[environment.loggingLevel];
const noop = (): any => undefined;

const now = Date();
const user = 'dummy@user.com';

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggerService implements Logger {

  /* tslint:disable:no-console */
  get info() {
    if (isDebugMode !== 0 && isDebugMode !== 1 && isDebugMode !== 2) {
      return console.warn.bind(console, [user, now]);
    } else {
      return noop;
    }
  }

  get warn() {
    if (isDebugMode !== 0 && isDebugMode !== 1) {
      return console.warn.bind(console, [user, now]);
    } else {
      return noop;
    }
  }

  get error() {
    if (isDebugMode !== 0) {
      return console.error.bind(console, [user, now]);
    } else {
      return noop;
    }
  }

}
