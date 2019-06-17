import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { Store } from '@ngrx/store';
import {  Debug, Trace, Info, Warning, Error, Fatal } from '../../store/actions/logger-state.actions';
import { NGXLogger } from 'ngx-logger';

const now = Date();

@Injectable({
  providedIn: 'root'
})

export class ConsoleLoggerService implements Logger {
  user: string;
  COOKIE_KEYS;

 constructor(
   private cookieService: CookieService,
   private ngxLogger: NGXLogger) {
    this.COOKIE_KEYS = {
      TOKEN: environment.cookies.token,
      USER: environment.cookies.userId
    };

    const userId = this.cookieService.get(this.COOKIE_KEYS.USER);
    if (!userId) {
      this.user = 'dummy@user.com';
    } else {
      this.user = userId;
    }
  }

  debug(message: string): void {
    const loggerMessage = this.getLoggerMessage(message);
    this.ngxLogger.debug(loggerMessage);
  }

  trace(message: string): void {
    const loggerMessage = this.getLoggerMessage(message);
    this.ngxLogger.trace(loggerMessage);
  }

  info(message: string): void {
    const loggerMessage = `${message} ${this.user} ${now}`;
    this.ngxLogger.info(loggerMessage);
  }

  warn(message: string): void {
    const loggerMessage = this.getLoggerMessage(message);
    this.ngxLogger.warn(loggerMessage);
  }

  error(message: string): void {
    const loggerMessage = this.getLoggerMessage(message);
    this.ngxLogger.error(loggerMessage);
  }
  fatal(message: string): void {
    const loggerMessage = this.getLoggerMessage(message);
    this.ngxLogger.fatal(loggerMessage);
  }
  getLoggerMessage(message): string {
    return `${message} ${this.user} ${now}`;
  }
}
