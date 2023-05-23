import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { environment as config } from '../../../environments/environment';
import { UserInfo } from '../../models';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { CryptoWrapper } from './cryptoWrapper';
import { MonitoringService } from './monitoring.service';

export interface ILoggerService {
  trace(message: any, ...additional: any[]): void;
  debug(message: any, ...additional: any[]): void;
  info(message: any, ...additional: any[]): void;
  log(message: any, ...additional: any[]): void;
  warn(message: any, ...additional: any[]): void;
  error(message: any, ...additional: any[]): void;
  fatal(message: any, ...additional: any[]): void;
  getMessage(message: any): string;
}

@Injectable({ providedIn: 'root' })
export class LoggerService implements ILoggerService {
  public COOKIE_KEYS;
  constructor(private readonly monitoringService: MonitoringService,
              private readonly ngxLogger: NGXLogger,
              private readonly sessionStorageService: SessionStorageService,
              private readonly cryptoWrapper: CryptoWrapper) {
    this.COOKIE_KEYS = {
      TOKEN: config.cookies.token,
      USER: config.cookies.userId
    };
  }

  public trace(message: any, ... additional: any[]): void {
    const formattedMessage = this.getMessage(message);
    this.ngxLogger.trace(formattedMessage, ...additional);
    this.monitoringService.logEvent(message);
  }

  public debug(message: any, ...additional: any[]): void {
    const formattedMessage = this.getMessage(message);
    this.ngxLogger.debug(formattedMessage, ...additional);
    this.monitoringService.logEvent(message);
  }

  public info(message: any, ...additional: any[]): void {
    const formattedMessage = this.getMessage(message);
    this.ngxLogger.info(formattedMessage, ...additional);
    this.monitoringService.logEvent(message);
  }

  public log(message: any, ...additional: any[]): void {
    const formattedMessage = this.getMessage(message);
    this.ngxLogger.log(formattedMessage, ...additional);
    this.monitoringService.logEvent(message);
  }

  public warn(message: any, ...additional: any[]): void {
    const formattedMessage = this.getMessage(message);
    this.ngxLogger.warn(formattedMessage, ...additional);
    this.monitoringService.logEvent(message);
  }

  public error(message: any, ...additional: any[]): void {
    this.ngxLogger.error(message, ...additional);
    const formattedMessage = this.getMessage(message);
    const error = new Error(formattedMessage);
    this.monitoringService.logException(error);
  }

  public fatal(message: any, ...additional: any[]): void {
    this.ngxLogger.fatal(message, ...additional);
    const formattedMessage = this.getMessage(message);
    const error = new Error(formattedMessage);
    this.monitoringService.logException(error);
  }

  public getMessage(message: any, ...additional: any[]): string {
    if (additional.length > 0) {
      message += `, \n${additional}\n`;
    }
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      if (userInfo && userInfo.email) {
        const userIdEncrypted = this.cryptoWrapper.encrypt(userInfo.email);
        return `User - ${userIdEncrypted.toString()}, Message - ${message}, Timestamp - ${Date.now()}`;
      }
    }
    return `Message - ${message}, Timestamp - ${Date.now()}`;
  }

  public enableCookies(): void {
    this.monitoringService.enableCookies();
  }
}
