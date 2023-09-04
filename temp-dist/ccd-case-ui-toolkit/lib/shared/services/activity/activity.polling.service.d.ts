import { NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { Activity } from '../../domain/activity/activity.model';
import { ActivityService } from './activity.service';
import * as i0 from "@angular/core";
export declare class ActivityPollingService {
    private readonly activityService;
    private readonly ngZone;
    private readonly config;
    private readonly pendingRequests;
    private currentTimeoutHandle;
    private pollActivitiesSubscription;
    private readonly pollConfig;
    private readonly batchCollectionDelayMs;
    private readonly maxRequestsPerBatch;
    constructor(activityService: ActivityService, ngZone: NgZone, config: AbstractAppConfig);
    get isEnabled(): boolean;
    subscribeToActivity(caseId: string, done: (activity: Activity) => void): Subject<Activity>;
    stopPolling(): void;
    flushRequests(): void;
    pollActivities(...caseIds: string[]): Observable<Activity[]>;
    postViewActivity(caseId: string): Observable<Activity[]>;
    postEditActivity(caseId: string): Observable<Activity[]>;
    protected performBatchRequest(requests: Map<string, Subject<Activity>>): void;
    private postActivity;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActivityPollingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ActivityPollingService>;
}
//# sourceMappingURL=activity.polling.service.d.ts.map