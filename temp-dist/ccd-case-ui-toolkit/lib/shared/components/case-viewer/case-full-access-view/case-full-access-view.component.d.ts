import { Location } from '@angular/common';
import { ChangeDetectorRef, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { NotificationBannerConfig } from '../../../../components/banners/notification-banner';
import { Activity, CaseField, CaseTab, CaseView, CaseViewTrigger, DisplayMode } from '../../../domain';
import { ActivityPollingService, AlertService, DraftService, ErrorNotifierService, NavigationNotifierService, OrderService, SessionStorageService } from '../../../services';
import { ConvertHrefToRouterService } from '../../case-editor/services/convert-href-to-router.service';
import { CallbackErrorsContext } from '../../error';
import * as i0 from "@angular/core";
export declare class CaseFullAccessViewComponent implements OnInit, OnDestroy, OnChanges {
    private readonly ngZone;
    private readonly route;
    private readonly router;
    private readonly navigationNotifierService;
    private readonly orderService;
    private readonly activityPollingService;
    private readonly dialog;
    private readonly alertService;
    private readonly draftService;
    private readonly errorNotifierService;
    private readonly convertHrefToRouterService;
    private readonly location;
    private readonly crf;
    private readonly sessionStorageService;
    static readonly ORIGIN_QUERY_PARAM = "origin";
    static readonly TRIGGER_TEXT_START = "Go";
    static readonly TRIGGER_TEXT_CONTINUE = "Ignore Warning and Go";
    static readonly UNICODE_SPACE = "%20";
    static readonly EMPTY_SPACE = " ";
    private readonly HEARINGS_TAB_LABEL;
    hasPrint: boolean;
    hasEventSelector: boolean;
    caseDetails: CaseView;
    prependedTabs: CaseTab[];
    appendedTabs: CaseTab[];
    BANNER: DisplayMode;
    sortedTabs: CaseTab[];
    caseFields: CaseField[];
    formGroup: UntypedFormGroup;
    error: any;
    triggerTextStart: string;
    triggerTextIgnoreWarnings: string;
    triggerText: string;
    ignoreWarning: boolean;
    activitySubscription: Subscription;
    caseSubscription: Subscription;
    errorSubscription: Subscription;
    dialogConfig: MatDialogConfig;
    markdownUseHrefAsRouterLink: boolean;
    message: string;
    subscription: Subscription;
    notificationBannerConfig: NotificationBannerConfig;
    selectedTabIndex: number;
    activeCaseFlags: boolean;
    private subs;
    callbackErrorsSubject: Subject<any>;
    tabGroup: MatTabGroup;
    constructor(ngZone: NgZone, route: ActivatedRoute, router: Router, navigationNotifierService: NavigationNotifierService, orderService: OrderService, activityPollingService: ActivityPollingService, dialog: MatDialog, alertService: AlertService, draftService: DraftService, errorNotifierService: ErrorNotifierService, convertHrefToRouterService: ConvertHrefToRouterService, location: Location, crf: ChangeDetectorRef, sessionStorageService: SessionStorageService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    isPrintEnabled(): boolean;
    ngOnDestroy(): void;
    unsubscribe(subscription: any): void;
    private checkRouteAndSetCaseViewTab;
    postViewActivity(): Observable<Activity[]>;
    clearErrorsAndWarnings(): void;
    applyTrigger(trigger: CaseViewTrigger): void;
    hasTabsPresent(): boolean;
    callbackErrorsNotify(callbackErrorsContext: CallbackErrorsContext): void;
    isDraft(): boolean;
    isTriggerButtonDisabled(): boolean;
    organiseTabPosition(): void;
    tabChanged(tabIndexChanged: number): void;
    onLinkClicked(triggerOutputEventText: string): void;
    hasActiveCaseFlags(): boolean;
    /**
     * Indicates that a CaseField is to be displayed without a label, as is expected for all ComponentLauncher-type
     * fields.
     * @param caseField The `CaseField` instance to check
     * @returns `true` if it should not have a label; `false` otherwise
     */
    isFieldToHaveNoLabel(caseField: CaseField): boolean;
    private init;
    private sortTabFieldsAndFilterTabs;
    private getTabFields;
    /**
     * For EUI-3825:
     * Builds a UntypedFormGroup from all the CaseFields contained within the view.
     * This UntypedFormGroup is necessary for evaluation the show/hide conditions of
     * fields that are dependent on a field only available on a DIFFERENT tab.
     */
    private buildFormGroup;
    private resetErrors;
    private getUrlFragment;
    private getTabIndexByTabLabel;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseFullAccessViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseFullAccessViewComponent, "ccd-case-full-access-view", never, { "hasPrint": "hasPrint"; "hasEventSelector": "hasEventSelector"; "caseDetails": "caseDetails"; "prependedTabs": "prependedTabs"; "appendedTabs": "appendedTabs"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=case-full-access-view.component.d.ts.map