import { Activity } from '../../domain/activity/activity.model';
import { ActivityService } from './activity.service';
import { Observable, Subject } from 'rxjs';
import { NgZone } from '@angular/core';
import { AbstractAppConfig } from '../../../app.config';
export declare class ActivityPollingService {
    private activityService;
    private ngZone;
    private config;
    private pendingRequests;
    private currentTimeoutHandle;
    private pollActivitiesSubscription;
    private pollConfig;
    private batchCollectionDelayMs;
    private maxRequestsPerBatch;
    constructor(activityService: ActivityService, ngZone: NgZone, config: AbstractAppConfig);
    subscribeToActivity(caseId: string, done: (activity: Activity) => void): Subject<Activity>;
    stopPolling(): void;
    flushRequests(): void;
    pollActivities(...caseIds: string[]): Observable<Activity[]>;
    protected performBatchRequest(requests: Map<string, Subject<Activity>>): void;
    postViewActivity(caseId: string): Observable<Activity[]>;
    postEditActivity(caseId: string): Observable<Activity[]>;
    private postActivity;
    readonly isEnabled: boolean;
}
