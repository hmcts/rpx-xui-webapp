import { MonitoringService } from './monitoring.service';
import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { environment as config } from '../../../environments/environment';
import { CryptoWrapper } from './cryptoWrapper';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { UserInfo } from '../../models/user-details.model';

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

@Injectable()

export class LoggerService implements ILoggerService {
    COOKIE_KEYS;
    constructor(private monitoringService: MonitoringService,
                private ngxLogger: NGXLogger,
                private sessionStorageService: SessionStorageService,
                private cryptoWrapper: CryptoWrapper) {
                    this.COOKIE_KEYS = {
                        TOKEN: config.cookies.token,
                        USER: config.cookies.userId
                      };
    }

    trace(message: any, ...additional: any[]): void {
        const formattedMessage = this.getMessage(message);
        this.ngxLogger.trace(formattedMessage);
        this.monitoringService.logEvent(message);
    }
    debug(message: any, ...additional: any[]): void {
        const formattedMessage = this.getMessage(message);
        this.ngxLogger.debug(formattedMessage);
        this.monitoringService.logEvent(message);
    }
    info(message: any, ...additional: any[]): void {
        const formattedMessage = this.getMessage(message);
        this.ngxLogger.info(formattedMessage);
        this.monitoringService.logEvent(message);
    }
    log(message: any, ...additional: any[]): void {
        const formattedMessage = this.getMessage(message);
        this.ngxLogger.log(formattedMessage);
        this.monitoringService.logEvent(message);
    }
    warn(message: any, ...additional: any[]): void {
        const formattedMessage = this.getMessage(message);
        this.ngxLogger.warn(formattedMessage);
        this.monitoringService.logEvent(message);
    }
    error(message: any, ...additional: any[]): void {
       this.ngxLogger.error(message);
       const formattedMessage = this.getMessage(message);
       const error = new Error(formattedMessage);
       this.monitoringService.logException(error);
    }
    fatal(message: any, ...additional: any[]): void {
        this.ngxLogger.fatal(message);
        const formattedMessage = this.getMessage(message);
        const error = new Error(formattedMessage);
        this.monitoringService.logException(error);
    }
    getMessage(message: any): string {
        const userInfoStr = this.sessionStorageService.getItem('userDetails');
        if (userInfoStr) {
            const userInfo: UserInfo = JSON.parse(userInfoStr);
            if (userInfo && userInfo.email) {
                const userIdEncrypted = this.cryptoWrapper.encrypt(userInfo.email);
                const encryptedMessage = `User - ${userIdEncrypted.toString()}, Message - ${message}, Timestamp - ${Date.now()}`
                return encryptedMessage;
            }
        }
        return `Message - ${message}, Timestamp - ${Date.now()}`;
    }
}
