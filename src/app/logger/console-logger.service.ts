import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { environment } from '../../environments/environment';

enum IsDebugMode {
  OFF,
  ERROR,
  WARN,
  DEBUG
}

export let isDebugMode = IsDebugMode[environment.loggingLevel];
const noop = (): any => undefined;

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggerService implements Logger {

  get info() {
    if (isDebugMode !== 0 && isDebugMode !== 1 && isDebugMode !== 2) {
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  get warn() {
    if (isDebugMode !== 0 && isDebugMode !== 1) {
      return console.warn.bind(console);
    } else {
      return noop;
    }
  }

  get error() {
    if (isDebugMode !== 0) {
      return console.error.bind(console);
    } else {
      return noop;
    }
  }

  invokeConsoleMethod(type: string, args?: any): void {
    type func = (name: string) => void;
    const logFn: func = (console)[type] || console.log || noop;
    logFn.apply(console, [args]);
  }
}
