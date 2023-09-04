import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Activity, ActivityInfo, DisplayMode } from '../../domain/activity/activity.model';
import { ActivityPollingService } from '../../services/activity/activity.polling.service';
import * as i0 from "@angular/core";
export declare class ActivityComponent implements OnInit, OnDestroy {
    private readonly activityPollingService;
    activity: Activity;
    dspMode: typeof DisplayMode;
    viewersText: string;
    editorsText: string;
    subscription: Subject<Activity>;
    caseId: string;
    displayMode: DisplayMode;
    private readonly VIEWERS_PREFIX;
    private readonly VIEWERS_SUFFIX;
    private readonly EDITORS_PREFIX;
    private readonly EDITORS_SUFFIX;
    constructor(activityPollingService: ActivityPollingService);
    ngOnInit(): void;
    onActivityChange(newActivity: Activity): void;
    isActivityEnabled(): boolean;
    isActiveCase(): number;
    viewersPresent(): boolean;
    editorsPresent(): boolean;
    ngOnDestroy(): void;
    generateDescription(prefix: string, suffix: string, namesArray: ActivityInfo[], unknownCount: any): string;
    private replaceLastCommaWithAnd;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActivityComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ActivityComponent, "ccd-activity", never, { "caseId": "caseId"; "displayMode": "displayMode"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=activity.component.d.ts.map