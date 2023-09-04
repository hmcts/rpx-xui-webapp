import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { Activity } from '../../domain/activity/activity.model';
import { HttpService, OptionsType } from '../http';
import { SessionStorageService } from '../session';
import * as i0 from "@angular/core";
export declare class ActivityService {
    private readonly http;
    private readonly appConfig;
    private readonly sessionStorageService;
    static get ACTIVITY_VIEW(): string;
    static get ACTIVITY_EDIT(): string;
    constructor(http: HttpService, appConfig: AbstractAppConfig, sessionStorageService: SessionStorageService);
    get isEnabled(): boolean;
    static readonly DUMMY_CASE_REFERENCE = "0";
    private userAuthorised;
    private static handleHttpError;
    getOptions(): OptionsType;
    getActivities(...caseId: string[]): Observable<Activity[]>;
    postActivity(caseId: string, activity: string): Observable<Activity[]>;
    verifyUserIsAuthorized(): void;
    private activityUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActivityService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ActivityService>;
}
//# sourceMappingURL=activity.service.d.ts.map