import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { Store } from '@ngrx/store';
import { LoggerState } from './reducers';
import {  Debug, Trace, Info, Warning, Error, Fatal } from '../../store/actions/logger-state.actions';

const now = Date();

@Injectable({
  providedIn: 'root'
})

export class ConsoleLoggerService implements Logger {
  user: string;
  COOKIE_KEYS;

 constructor(
   private cookieService: CookieService,
   private store: Store<LoggerState>) {
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
    this.store.dispatch(new Debug(loggerMessage));
  }

  trace(message: string): void {
    const loggerMessage = this.getLoggerMessage(message);
    this.store.dispatch(new Trace(loggerMessage));
  }

  info(message: string): void {
    const loggerMessage = `${message} ${this.user} ${now}`;
    this.store.dispatch(new Info(loggerMessage));
  }

  warn(message: string): void {
    const loggerMessage = this.getLoggerMessage(message);
    this.store.dispatch(new Warning(loggerMessage));
  }

  error(message: string): void {
    const loggerMessage = this.getLoggerMessage(message);
    this.store.dispatch(new Error(loggerMessage));
  }
  fatal(message: string): void {
    const loggerMessage = this.getLoggerMessage(message);
    this.store.dispatch(new Fatal(loggerMessage));
  }
  getLoggerMessage(message): string {
    return `${message} ${this.user} ${now}`;
  }
}
