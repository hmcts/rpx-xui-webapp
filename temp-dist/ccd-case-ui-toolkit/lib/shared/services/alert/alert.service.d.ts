import { Router } from '@angular/router';
import { RpxTranslationService } from 'rpx-xui-translation';
import { ConnectableObservable } from 'rxjs';
import { AlertLevel } from '../../domain/alert/alert-level.model';
import { AlertStatusParams } from '../../domain/alert/alert-status-params.model';
import { Alert } from '../../domain/alert/alert.model';
import * as i0 from "@angular/core";
export declare class AlertService {
    private readonly router;
    private readonly rpxTranslationService;
    preservedError: string;
    preservedWarning: string;
    preservedSuccess: string;
    message: string;
    level: AlertLevel;
    successes: ConnectableObservable<Alert>;
    errors: ConnectableObservable<Alert>;
    warnings: ConnectableObservable<Alert>;
    alerts: ConnectableObservable<Alert>;
    private successObserver;
    private errorObserver;
    private warningObserver;
    private alertObserver;
    private preserveAlerts;
    constructor(router: Router, rpxTranslationService: RpxTranslationService);
    clear(): void;
    error({ phrase, replacements }: Omit<AlertStatusParams, 'preserve'>): void;
    warning({ phrase, replacements }: Omit<AlertStatusParams, 'preserve'>): void;
    success({ preserve, phrase, replacements }: AlertStatusParams): void;
    private getTranslationWithReplacements;
    setPreserveAlerts(preserve: boolean, urlInfo?: string[]): void;
    currentUrlIncludesInfo(preserve: boolean, urlInfo: string[]): boolean;
    isPreserveAlerts(): boolean;
    preserveMessages(message: string): string;
    push(msgObject: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AlertService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AlertService>;
}
//# sourceMappingURL=alert.service.d.ts.map