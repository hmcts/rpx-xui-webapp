import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { environment } from '../../../environments/environment';
import { NGXLogger } from 'ngx-logger';

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

 constructor(private ngxLogger: NGXLogger){
  }

  info(message: string) : void {
    if (isDebugMode !== 0 && isDebugMode !== 1 && isDebugMode !== 2) {
      this.ngxLogger.info(message, [user, now]);
    }
  }

  warn(message: string) : void {
    if (isDebugMode !== 0 && isDebugMode !== 1) {
      this.ngxLogger.warn(message, [user, now]);
    }
  }

  error(message: string) : void {
    if (isDebugMode !== 0) {
      this.ngxLogger.warn(message, [user, now]);
    }
  }

}
