import { Location } from '@angular/common';
import { AfterViewInit, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Activity, CaseField, CaseTab, CaseView, CaseViewTrigger, DisplayMode } from '../../domain';
import { ActivityPollingService, AlertService, DraftService, ErrorNotifierService, NavigationNotifierService, OrderService } from '../../services';
import { CaseNotifier } from '../case-editor';
import { CallbackErrorsContext } from '../error/domain';
export declare class CaseViewerComponent implements OnInit, OnDestroy, AfterViewInit {
    private readonly ngZone;
    private readonly route;
    private readonly navigationNotifierService;
    private readonly orderService;
    private readonly activityPollingService;
    private readonly dialog;
    private readonly alertService;
    private readonly draftService;
    private readonly caseNotifier;
    private readonly errorNotifierService;
    private readonly location;
    static readonly ORIGIN_QUERY_PARAM = "origin";
    static readonly TRIGGER_TEXT_START = "Go";
    static readonly TRIGGER_TEXT_CONTINUE = "Ignore Warning and Go";
    static readonly space = "%20";
    hasPrint: boolean;
    hasEventSelector: boolean;
    BANNER: DisplayMode;
    caseDetails: CaseView;
    sortedTabs: CaseTab[];
    caseFields: CaseField[];
    formGroup: FormGroup;
    error: any;
    triggerTextStart: string;
    triggerTextIgnoreWarnings: string;
    triggerText: string;
    ignoreWarning: boolean;
    activitySubscription: Subscription;
    caseSubscription: Subscription;
    errorSubscription: Subscription;
    dialogConfig: MatDialogConfig;
    callbackErrorsSubject: Subject<any>;
    tabGroup: MatTabGroup;
    constructor(ngZone: NgZone, route: ActivatedRoute, navigationNotifierService: NavigationNotifierService, orderService: OrderService, activityPollingService: ActivityPollingService, dialog: MatDialog, alertService: AlertService, draftService: DraftService, caseNotifier: CaseNotifier, errorNotifierService: ErrorNotifierService, location: Location);
    ngOnInit(): void;
    isPrintEnabled(): boolean;
    ngOnDestroy(): void;
    postViewActivity(): Observable<Activity[]>;
    clearErrorsAndWarnings(): void;
    applyTrigger(trigger: CaseViewTrigger): void;
    isDataLoaded(): boolean;
    hasTabsPresent(): boolean;
    callbackErrorsNotify(callbackErrorsContext: CallbackErrorsContext): void;
    isDraft(): boolean;
    isTriggerButtonDisabled(): boolean;
    ngAfterViewInit(): void;
    tabChanged(tabChangeEvent: MatTabChangeEvent): void;
    private init;
    private sortTabFieldsAndFilterTabs;
    private getTabFields;
    /**
     * For EUI-3825:
     * Builds a FormGroup from all the CaseFields contained within the view.
     * This FormGroup is necessary for evaluation the show/hide conditions of
     * fields that are dependent on a field only available on a DIFFERENT tab.
     */
    private buildFormGroup;
    private initDialog;
    private resetErrors;
}
