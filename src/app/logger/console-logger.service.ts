import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Logger } from './logger.service';

export let isDebugMode = environment.isDebugMode;

const noop = (): any => undefined;

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggerService implements Logger {

  get info() {
    if (isDebugMode === 'INFO') {
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  get warn() {
    if (isDebugMode === 'INFO' || isDebugMode === 'WARN') {
      return console.warn.bind(console);
    } else {
      return noop;
    }
  }

  get error() {
    if (isDebugMode === 'ERROR' || isDebugMode === 'WARN' || isDebugMode === 'INFO') {
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
