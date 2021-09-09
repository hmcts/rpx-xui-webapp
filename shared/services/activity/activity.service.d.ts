import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { Activity } from '../../domain/activity';
import { HttpService, OptionsType } from '../http';
import { SessionStorageService } from '../session';
export declare class ActivityService {
    private readonly http;
    private readonly appConfig;
    private readonly sessionStorageService;
    static readonly DUMMY_CASE_REFERENCE = "0";
    static readonly ACTIVITY_VIEW: string;
    static readonly ACTIVITY_EDIT: string;
    private userAuthorised;
    readonly isEnabled: boolean;
    private static handleHttpError;
    constructor(http: HttpService, appConfig: AbstractAppConfig, sessionStorageService: SessionStorageService);
    getOptions(): OptionsType;
    getActivities(...caseId: string[]): Observable<Activity[]>;
    postActivity(caseId: string, activity: string): Observable<Activity[]>;
    verifyUserIsAuthorized(): void;
    private activityUrl;
}
