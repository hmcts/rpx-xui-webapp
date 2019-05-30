import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { environment } from '../../../environments/environment';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from '../auth/auth.service';
import { CookieService } from 'ngx-cookie';

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

    let userId = this.cookieService.get(this.COOKIE_KEYS.USER);
    if (!userId) {
      this.user = 'dummy@user.com';
    } 
    else{
      this.user = userId;
    }
  }

  debug(message: string): void{
    this.ngxLogger.debug(message, [this.user, now]);
  }

  trace(message: string): void{
      this.ngxLogger.trace(message, [this.user, now]);
  }  

  info(message: string) : void {
      this.ngxLogger.info(message, [this.user, now]);
  }

  warn(message: string) : void {
      this.ngxLogger.warn(message, [this.user, now]);
  }

  error(message: string) : void {
      this.ngxLogger.error(message, [this.user, now]);
  }
  fatal(message: string) : void {
    this.ngxLogger.fatal(message, [this.user, now]);
  }
}
