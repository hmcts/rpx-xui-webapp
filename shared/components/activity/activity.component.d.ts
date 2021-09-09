import { OnInit, OnDestroy } from '@angular/core';
import { ActivityPollingService } from '../../services/activity/activity.polling.service';
import { Activity, ActivityInfo } from '../../domain/activity/activity.model';
import { DisplayMode } from '../../domain/activity/activity.model';
import { Subject } from 'rxjs';
export declare class ActivityComponent implements OnInit, OnDestroy {
    private activityPollingService;
    private VIEWERS_PREFIX;
    private VIEWERS_SUFFIX;
    private EDITORS_PREFIX;
    private EDITORS_SUFFIX;
    activity: Activity;
    dspMode: typeof DisplayMode;
    viewersText: string;
    editorsText: string;
    subscription: Subject<Activity>;
    caseId: string;
    displayMode: DisplayMode;
    constructor(activityPollingService: ActivityPollingService);
    ngOnInit(): void;
    onActivityChange(newActivity: Activity): void;
    isActivityEnabled(): boolean;
    isActiveCase(): number;
    viewersPresent(): boolean;
    editorsPresent(): boolean;
    ngOnDestroy(): void;
    generateDescription(prefix: string, suffix: string, namesArray: Array<ActivityInfo>, unknownCount: any): string;
    private replaceLastCommaWithAnd;
}
