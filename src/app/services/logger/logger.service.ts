import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { environment as config } from '../../../environments/environment';
import { UserInfo } from '../../models/user-details.model';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { CryptoWrapper } from './cryptoWrapper';
import { EnvironmentService } from '../../shared/services/environment.service';

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

  public static NOOP_FUNCTION_FOR_LOGGING = () => {
    // Do nothing.
  };

  constructor(private readonly ngxLogger: NGXLogger,
    private readonly sessionStorageService: SessionStorageService,
    private readonly cryptoWrapper: CryptoWrapper,
    private readonly environmentService: EnvironmentService) {
    this.COOKIE_KEYS = {
      TOKEN: config.cookies.token,
      USER: config.cookies.userId
    };
    this.setupSwitcherForConsoleLogs();
  }

  private setupSwitcherForConsoleLogs() {
    this.environmentService.config$.subscribe((config) => {
      console.info(`Environment is ${this.environmentService.isProd() ? 'prod' : 'non-prod'}.`);
      LoggerService.switchConsoleLogs({ switchOffAll: false });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public trace(message: any, ...additional: any[]): void {
    const formattedMessage = this.getMessage(message);
    this.ngxLogger.trace(formattedMessage);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public debug(message: any, ...additional: any[]): void {
    const formattedMessage = this.getMessage(message);
    this.ngxLogger.debug(formattedMessage);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public info(message: any, ...additional: any[]): void {
    const formattedMessage = this.getMessage(message);
    this.ngxLogger.info(formattedMessage);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public log(message: any, ...additional: any[]): void {
    const formattedMessage = this.getMessage(message);
    this.ngxLogger.log(formattedMessage, ...additional);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public warn(message: any, ...additional: any[]): void {
    const formattedMessage = this.getMessage(message);
    this.ngxLogger.warn(formattedMessage);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public error(message: any, ...additional: any[]): void {
    this.ngxLogger.error(message);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public fatal(message: any, ...additional: any[]): void {
    this.ngxLogger.fatal(message);
  }

  public getMessage(message: any): string {
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
    // do nothing.
  }

  public static switchConsoleLogs(consoleConfig: any): void {
    console.info(`consoleConfig.switchOffAll = ${consoleConfig.switchOffAll}`);
    if (consoleConfig.switchOffAll === true) {
      console.warn('Console logs are disabled. No more log lines will be printed to console.');
      console.log = this.NOOP_FUNCTION_FOR_LOGGING;
      console.debug = this.NOOP_FUNCTION_FOR_LOGGING;
      console.trace = this.NOOP_FUNCTION_FOR_LOGGING;
      console.info = this.NOOP_FUNCTION_FOR_LOGGING;
      console.warn = this.NOOP_FUNCTION_FOR_LOGGING;
      console.error = this.NOOP_FUNCTION_FOR_LOGGING;
    }
  }
}
