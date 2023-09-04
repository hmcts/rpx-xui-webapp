import { NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Activity, CaseEventData, CaseEventTrigger, CaseView, DisplayMode } from '../../../domain';
import { CaseReferencePipe } from '../../../pipes';
import { ActivityPollingService, AlertService } from '../../../services';
import { CaseNotifier, CasesService } from '../../case-editor';
import * as i0 from "@angular/core";
export declare class CaseEventTriggerComponent implements OnInit, OnDestroy {
    private readonly ngZone;
    private readonly casesService;
    private readonly caseNotifier;
    private readonly router;
    private readonly alertService;
    private readonly route;
    private readonly caseReferencePipe;
    private readonly activityPollingService;
    BANNER: DisplayMode;
    eventTrigger: CaseEventTrigger;
    caseDetails: CaseView;
    activitySubscription: Subscription;
    caseSubscription: Subscription;
    parentUrl: string;
    constructor(ngZone: NgZone, casesService: CasesService, caseNotifier: CaseNotifier, router: Router, alertService: AlertService, route: ActivatedRoute, caseReferencePipe: CaseReferencePipe, activityPollingService: ActivityPollingService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    postEditActivity(): Observable<Activity[]>;
    submit(): (sanitizedEditForm: CaseEventData) => Observable<object>;
    validate(): (sanitizedEditForm: CaseEventData, pageId: string) => Observable<object>;
    submitted(event: any): void;
    cancel(): Promise<boolean>;
    isDataLoaded(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseEventTriggerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseEventTriggerComponent, "ccd-case-event-trigger", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=case-event-trigger.component.d.ts.map