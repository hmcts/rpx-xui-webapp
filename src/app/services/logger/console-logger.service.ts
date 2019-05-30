import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { environment } from '../../../environments/environment';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from '../auth/auth.service';
import { CookieService } from 'ngx-cookie';

enum IsDebugMode {
  OFF,
  ERROR,
  WARN,
  DEBUG
}

export let isDebugMode = IsDebugMode[environment.loggingLevel];

const now = Date();


@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggerService implements Logger {
  user:string;
  COOKIE_KEYS;

 constructor(
   private ngxLogger: NGXLogger, 
  private authService: AuthService,
  private cookieService: CookieService){
    this.COOKIE_KEYS = {
      TOKEN: environment.cookies.token,
      USER: environment.cookies.userId
    };
    const userId = this.cookieService.get(this.COOKIE_KEYS.USER);
    if (!userId) {
      this.user = 'dummy@user.com';
    } 
    else{
      this.user = userId;
    }
  }

  info(message: string) : void {
    if (isDebugMode !== 0 && isDebugMode !== 1 && isDebugMode !== 2) {
      this.ngxLogger.info(message, [this.user, now]);
    }
  }

  warn(message: string) : void {
    if (isDebugMode !== 0 && isDebugMode !== 1) {
      this.ngxLogger.warn(message, [this.user, now]);
    }
  }

  error(message: string) : void {
    if (isDebugMode !== 0) {
      this.ngxLogger.warn(message, [this.user, now]);
    }
  }

}
