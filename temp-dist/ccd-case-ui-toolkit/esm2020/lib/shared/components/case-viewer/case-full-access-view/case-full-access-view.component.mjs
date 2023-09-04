import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Input, NgZone, ViewChild } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { plainToClass } from 'class-transformer';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotificationBannerHeaderClass, NotificationBannerType } from '../../../../components/banners/notification-banner';
import { ShowCondition } from '../../../directives';
import { CaseField, CaseView, CaseViewTrigger, DRAFT_QUERY_PARAM, DisplayMode, Draft } from '../../../domain';
import { ActivityPollingService, AlertService, DraftService, ErrorNotifierService, FieldsUtils, NavigationNotifierService, NavigationOrigin, OrderService, SessionStorageService } from '../../../services';
import { ConvertHrefToRouterService } from '../../case-editor/services/convert-href-to-router.service';
import { DeleteOrCancelDialogComponent } from '../../dialogs';
import { initDialog } from '../../helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../services";
import * as i3 from "@angular/material/dialog";
import * as i4 from "../../case-editor/services/convert-href-to-router.service";
import * as i5 from "@angular/common";
const _c0 = ["tabGroup"];
function CaseFullAccessViewComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11)(1, "h1", 12);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 13)(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p")(9, "a", 14);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "rpxTranslate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 4, "Something went wrong"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 6, "We're working to fix the problem. Try again shortly."));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(11, 8, "Contact us"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(13, 10, "if you're still having problems."), " ");
} }
function CaseFullAccessViewComponent_div_1_ul_7_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fieldError_r8 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, fieldError_r8.message), " ");
} }
function CaseFullAccessViewComponent_div_1_ul_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 17);
    i0.ɵɵtemplate(1, CaseFullAccessViewComponent_div_1_ul_7_li_1_Template, 3, 3, "li", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r6.error.details.field_errors);
} }
function CaseFullAccessViewComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11)(1, "h2", 15);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, CaseFullAccessViewComponent_div_1_ul_7_Template, 2, 1, "ul", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 3, "The callback data failed validation"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 5, ctx_r1.error.message));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.error.details == null ? null : ctx_r1.error.details.field_errors);
} }
function CaseFullAccessViewComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "a", 20);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "Print"));
} }
function CaseFullAccessViewComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "ccd-event-trigger", 21);
    i0.ɵɵlistener("onTriggerChange", function CaseFullAccessViewComponent_div_8_Template_ccd_event_trigger_onTriggerChange_1_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.clearErrorsAndWarnings()); })("onTriggerSubmit", function CaseFullAccessViewComponent_div_8_Template_ccd_event_trigger_onTriggerSubmit_1_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.applyTrigger($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("isDisabled", ctx_r3.isTriggerButtonDisabled())("triggers", ctx_r3.caseDetails.triggers)("triggerText", ctx_r3.triggerText);
} }
function CaseFullAccessViewComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3)(1, "div", 9)(2, "ccd-notification-banner", 22);
    i0.ɵɵlistener("linkClicked", function CaseFullAccessViewComponent_div_9_Template_ccd_notification_banner_linkClicked_2_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r12.onLinkClicked($event)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("notificationBannerConfig", ctx_r4.notificationBannerConfig);
} }
function CaseFullAccessViewComponent_ng_container_12_mat_tab_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-tab", 26);
    i0.ɵɵpipe(1, "rpxTranslate");
} if (rf & 2) {
    const tab_r19 = ctx.$implicit;
    i0.ɵɵproperty("id", tab_r19.id)("label", i0.ɵɵpipeBind1(1, 2, tab_r19.label));
} }
function CaseFullAccessViewComponent_ng_container_12_mat_tab_4_ng_template_2_ng_container_3_tr_4_th_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 36)(1, "div", 37);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const field_r24 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 1, field_r24.label), "");
} }
function CaseFullAccessViewComponent_ng_container_12_mat_tab_4_ng_template_2_ng_container_3_tr_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, CaseFullAccessViewComponent_ng_container_12_mat_tab_4_ng_template_2_ng_container_3_tr_4_th_1_Template, 4, 3, "th", 32);
    i0.ɵɵelementStart(2, "td", 33)(3, "span", 34);
    i0.ɵɵelement(4, "ccd-field-read", 35);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const field_r24 = i0.ɵɵnextContext().$implicit;
    const ctx_r25 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r25.isFieldToHaveNoLabel(field_r24));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("id", "case-viewer-field-read--" + field_r24.id);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("topLevelFormGroup", ctx_r25.formGroup.controls["data"])("caseField", field_r24)("caseReference", ctx_r25.caseDetails.case_id)("markdownUseHrefAsRouterLink", ctx_r25.markdownUseHrefAsRouterLink);
} }
function CaseFullAccessViewComponent_ng_container_12_mat_tab_4_ng_template_2_ng_container_3_tr_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 38)(1, "th", 33)(2, "span", 34);
    i0.ɵɵelement(3, "ccd-field-read", 35);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const field_r24 = i0.ɵɵnextContext().$implicit;
    const ctx_r26 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("id", "case-viewer-field-read--" + field_r24.id);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("topLevelFormGroup", ctx_r26.formGroup.controls["data"])("caseField", field_r24)("caseReference", ctx_r26.caseDetails.case_id)("markdownUseHrefAsRouterLink", ctx_r26.markdownUseHrefAsRouterLink);
} }
function CaseFullAccessViewComponent_ng_container_12_mat_tab_4_ng_template_2_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 28);
    i0.ɵɵelementContainerStart(2, 29);
    i0.ɵɵpipe(3, "ccdIsCompound");
    i0.ɵɵtemplate(4, CaseFullAccessViewComponent_ng_container_12_mat_tab_4_ng_template_2_ng_container_3_tr_4_Template, 5, 6, "tr", 30);
    i0.ɵɵtemplate(5, CaseFullAccessViewComponent_ng_container_12_mat_tab_4_ng_template_2_ng_container_3_tr_5_Template, 4, 5, "tr", 31);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const field_r24 = ctx.$implicit;
    const ctx_r23 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", field_r24)("contextFields", ctx_r23.caseFields)("hidden", field_r24.hidden);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitch", !i0.ɵɵpipeBind1(3, 6, field_r24));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngSwitchCase", true);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", false);
} }
const _c1 = function (a0, a4) { return [a0, false, undefined, true, a4]; };
function CaseFullAccessViewComponent_ng_container_12_mat_tab_4_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table");
    i0.ɵɵpipe(1, "rpxTranslate");
    i0.ɵɵelementStart(2, "tbody");
    i0.ɵɵtemplate(3, CaseFullAccessViewComponent_ng_container_12_mat_tab_4_ng_template_2_ng_container_3_Template, 6, 8, "ng-container", 18);
    i0.ɵɵpipe(4, "ccdReadFieldsFilter");
    i0.ɵɵpipe(5, "ccdTabFields");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const tab_r20 = i0.ɵɵnextContext().$implicit;
    const ctx_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(tab_r20.id);
    i0.ɵɵattribute("aria-describedby", i0.ɵɵpipeBind1(1, 4, "case viewer table"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBindV(4, 6, i0.ɵɵpureFunction2(14, _c1, i0.ɵɵpipeBind1(5, 12, tab_r20), ctx_r22.formGroup.controls["data"])));
} }
function CaseFullAccessViewComponent_ng_container_12_mat_tab_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-tab", 26);
    i0.ɵɵpipe(1, "rpxTranslate");
    i0.ɵɵtemplate(2, CaseFullAccessViewComponent_ng_container_12_mat_tab_4_ng_template_2_Template, 6, 17, "ng-template", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tab_r20 = ctx.$implicit;
    i0.ɵɵproperty("id", tab_r20.id)("label", i0.ɵɵpipeBind1(1, 2, tab_r20.label));
} }
function CaseFullAccessViewComponent_ng_container_12_mat_tab_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-tab", 26);
    i0.ɵɵpipe(1, "rpxTranslate");
} if (rf & 2) {
    const tab_r32 = ctx.$implicit;
    i0.ɵɵproperty("id", tab_r32.id)("label", i0.ɵɵpipeBind1(1, 2, tab_r32.label));
} }
function CaseFullAccessViewComponent_ng_container_12_router_outlet_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "router-outlet");
} }
function CaseFullAccessViewComponent_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    const _r34 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "mat-tab-group", 23, 24);
    i0.ɵɵlistener("selectedIndexChange", function CaseFullAccessViewComponent_ng_container_12_Template_mat_tab_group_selectedIndexChange_1_listener($event) { i0.ɵɵrestoreView(_r34); const ctx_r33 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r33.tabChanged($event)); });
    i0.ɵɵtemplate(3, CaseFullAccessViewComponent_ng_container_12_mat_tab_3_Template, 2, 4, "mat-tab", 25);
    i0.ɵɵtemplate(4, CaseFullAccessViewComponent_ng_container_12_mat_tab_4_Template, 3, 4, "mat-tab", 25);
    i0.ɵɵtemplate(5, CaseFullAccessViewComponent_ng_container_12_mat_tab_5_Template, 2, 4, "mat-tab", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CaseFullAccessViewComponent_ng_container_12_router_outlet_6_Template, 1, 0, "router-outlet", 10);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disableRipple", true)("selectedIndex", ctx_r5.selectedTabIndex);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r5.prependedTabs);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r5.sortedTabs);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r5.appendedTabs);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.prependedTabs && ctx_r5.prependedTabs.length || ctx_r5.appendedTabs && ctx_r5.appendedTabs.length);
} }
export class CaseFullAccessViewComponent {
    constructor(ngZone, route, router, navigationNotifierService, orderService, activityPollingService, dialog, alertService, draftService, errorNotifierService, convertHrefToRouterService, location, crf, sessionStorageService) {
        this.ngZone = ngZone;
        this.route = route;
        this.router = router;
        this.navigationNotifierService = navigationNotifierService;
        this.orderService = orderService;
        this.activityPollingService = activityPollingService;
        this.dialog = dialog;
        this.alertService = alertService;
        this.draftService = draftService;
        this.errorNotifierService = errorNotifierService;
        this.convertHrefToRouterService = convertHrefToRouterService;
        this.location = location;
        this.crf = crf;
        this.sessionStorageService = sessionStorageService;
        this.HEARINGS_TAB_LABEL = 'Hearings';
        this.hasPrint = true;
        this.hasEventSelector = true;
        this.prependedTabs = [];
        this.appendedTabs = [];
        this.BANNER = DisplayMode.BANNER;
        this.triggerTextStart = CaseFullAccessViewComponent.TRIGGER_TEXT_START;
        this.triggerTextIgnoreWarnings = CaseFullAccessViewComponent.TRIGGER_TEXT_CONTINUE;
        this.triggerText = CaseFullAccessViewComponent.TRIGGER_TEXT_START;
        this.ignoreWarning = false;
        this.selectedTabIndex = 0;
        this.activeCaseFlags = false;
        this.subs = [];
        this.callbackErrorsSubject = new Subject();
    }
    ngOnInit() {
        initDialog();
        this.init();
        this.callbackErrorsSubject.subscribe(errorEvent => {
            this.error = errorEvent;
        });
        this.errorSubscription = this.errorNotifierService.error.subscribe(error => {
            if (error && error.status !== 401 && error.status !== 403) {
                this.error = error;
                this.callbackErrorsSubject.next(this.error);
            }
        });
        this.markdownUseHrefAsRouterLink = true;
        this.sessionStorageService.removeItem('eventUrl');
        this.subscription = this.convertHrefToRouterService.getHrefMarkdownLinkContent().subscribe((hrefMarkdownLinkContent) => {
            // do not convert router with initial default value; convert to router only on updated link content
            if (hrefMarkdownLinkContent !== 'Default') {
                this.convertHrefToRouterService.callAngularRouter(hrefMarkdownLinkContent);
            }
        });
        if (this.activityPollingService.isEnabled && !this.activitySubscription) {
            this.ngZone.runOutsideAngular(() => {
                this.activitySubscription = this.postViewActivity().subscribe();
            });
        }
        this.checkRouteAndSetCaseViewTab();
        // Check for active Case Flags
        this.activeCaseFlags = this.hasActiveCaseFlags();
    }
    ngOnChanges(changes) {
        if (changes && changes.prependedTabs && !changes.prependedTabs.firstChange) {
            this.init();
            this.crf.detectChanges();
            this.organiseTabPosition();
        }
    }
    isPrintEnabled() {
        return this.caseDetails.case_type.printEnabled;
    }
    ngOnDestroy() {
        if (this.activityPollingService.isEnabled) {
            this.unsubscribe(this.activitySubscription);
        }
        if (!this.route.snapshot.data.case) {
            this.unsubscribe(this.caseSubscription);
        }
        this.unsubscribe(this.callbackErrorsSubject);
        this.unsubscribe(this.errorSubscription);
        this.unsubscribe(this.subscription);
        this.subs.forEach(s => s.unsubscribe());
    }
    unsubscribe(subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    }
    checkRouteAndSetCaseViewTab() {
        this.subs.push(this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event) => {
            const url = event && event.url;
            if (url) {
                const tabUrl = url ? url.split('#') : null;
                const tab = tabUrl && tabUrl.length > 1 ? tabUrl[tabUrl.length - 1].replaceAll('%20', ' ') : '';
                const matTab = this.tabGroup._tabs.find((x) => x.textLabel.toLowerCase() === tab.toLowerCase());
                if (matTab && matTab.position) {
                    this.tabGroup.selectedIndex = matTab.position;
                }
            }
        }));
    }
    postViewActivity() {
        return this.activityPollingService.postViewActivity(this.caseDetails.case_id);
    }
    clearErrorsAndWarnings() {
        this.resetErrors();
        this.ignoreWarning = false;
        this.triggerText = CaseFullAccessViewComponent.TRIGGER_TEXT_START;
    }
    applyTrigger(trigger) {
        this.error = null;
        const theQueryParams = {};
        if (this.ignoreWarning) {
            theQueryParams['ignoreWarning'] = this.ignoreWarning;
        }
        // we may need to take care of different triggers in the future
        if (trigger.id === CaseViewTrigger.DELETE) {
            const dialogRef = this.dialog.open(DeleteOrCancelDialogComponent, this.dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
                if (result === 'Delete') {
                    this.draftService.deleteDraft(this.caseDetails.case_id)
                        .subscribe(_ => {
                        this.navigationNotifierService.announceNavigation({ action: NavigationOrigin.DRAFT_DELETED });
                    }, _ => {
                        this.navigationNotifierService.announceNavigation({ action: NavigationOrigin.ERROR_DELETING_DRAFT });
                    });
                }
            });
        }
        else if (this.isDraft() && trigger.id !== CaseViewTrigger.DELETE) {
            theQueryParams[DRAFT_QUERY_PARAM] = this.caseDetails.case_id;
            theQueryParams[CaseFullAccessViewComponent.ORIGIN_QUERY_PARAM] = 'viewDraft';
            this.navigationNotifierService.announceNavigation({
                action: NavigationOrigin.DRAFT_RESUMED,
                jid: this.caseDetails.case_type.jurisdiction.id,
                ctid: this.caseDetails.case_type.id,
                etid: trigger.id,
                queryParams: theQueryParams
            });
        }
        else {
            this.navigationNotifierService.announceNavigation({
                action: NavigationOrigin.EVENT_TRIGGERED,
                queryParams: theQueryParams,
                etid: trigger.id,
                relativeTo: this.route
            });
        }
    }
    hasTabsPresent() {
        return this.sortedTabs.length > 0 || this.prependedTabs.length > 0 || this.appendedTabs.length > 0;
    }
    callbackErrorsNotify(callbackErrorsContext) {
        this.ignoreWarning = callbackErrorsContext.ignoreWarning;
        this.triggerText = callbackErrorsContext.triggerText;
    }
    isDraft() {
        return Draft.isDraft(this.caseDetails.case_id);
    }
    isTriggerButtonDisabled() {
        return (this.error
            && this.error.callbackErrors
            && this.error.callbackErrors.length)
            || (this.error
                && this.error.details
                && this.error.details.field_errors
                && this.error.details.field_errors.length);
    }
    organiseTabPosition() {
        let matTab;
        const url = this.location.path(true);
        let hashValue = url.substring(url.indexOf('#') + 1);
        if (!url.includes('#') && !url.includes('roles-and-access') && !url.includes('tasks') && !url.includes('hearings')) {
            const paths = url.split('/');
            // lastPath can be /caseId, or the tabs /tasks, /hearings etc.
            const lastPath = decodeURIComponent(paths[paths.length - 1]);
            let foundTab = null;
            if (!this.prependedTabs) {
                this.prependedTabs = [];
            }
            const additionalTabs = [...this.prependedTabs, ...this.appendedTabs];
            if (additionalTabs && additionalTabs.length) {
                foundTab = additionalTabs.find((caseTab) => caseTab.id.toLowerCase() === lastPath.toLowerCase());
            }
            // found tasks or hearing tab
            if (foundTab) {
                this.router.navigate(['cases', 'case-details', this.caseDetails.case_id, foundTab.id]).then(() => {
                    matTab = this.tabGroup._tabs.find((x) => x.textLabel === foundTab.label);
                    this.tabGroup.selectedIndex = matTab.position;
                });
                // last path is caseId
            }
            else {
                // sort with the order of CCD predefined tabs
                this.caseDetails.tabs.sort((aTab, bTab) => aTab.order > bTab.order ? 1 : (bTab.order > aTab.order ? -1 : 0));
                // preselect the 1st order of CCD predefined tabs
                const preSelectTab = this.caseDetails.tabs[0];
                this.router.navigate(['cases', 'case-details', this.caseDetails.case_id], { fragment: preSelectTab.label }).then(() => {
                    matTab = this.tabGroup._tabs.find((x) => x.textLabel === preSelectTab.label);
                    this.tabGroup.selectedIndex = matTab.position;
                });
            }
        }
        else {
            const regExp = new RegExp(CaseFullAccessViewComponent.UNICODE_SPACE, 'g');
            hashValue = hashValue.replace(regExp, CaseFullAccessViewComponent.EMPTY_SPACE);
            if (hashValue.includes('hearings')) {
                hashValue = 'hearings';
            }
            else {
                if (hashValue.includes('roles-and-access') || hashValue.includes('tasks')) {
                    hashValue = hashValue.includes('roles-and-access') ? 'roles and access' : 'tasks';
                }
            }
            matTab = this.tabGroup._tabs.find((x) => x.textLabel.replace(CaseFullAccessViewComponent.EMPTY_SPACE, '').toLowerCase() ===
                hashValue.replace(CaseFullAccessViewComponent.EMPTY_SPACE, '').toLowerCase());
            if (matTab && matTab.position) {
                this.tabGroup.selectedIndex = matTab.position;
            }
        }
    }
    // Refactored under EXUI-110 to address infinite tab loop to use tabIndexChanged instead
    tabChanged(tabIndexChanged) {
        const matTab = this.tabGroup._tabs.find(tab => tab.isActive);
        const tabLabel = matTab.textLabel;
        // sortedTabs are fragments
        // appended/prepepended tabs use router navigation
        if ((tabIndexChanged <= 1 && this.prependedTabs && this.prependedTabs.length) ||
            (this.appendedTabs && this.appendedTabs.length && tabLabel === this.HEARINGS_TAB_LABEL)) {
            // Hack to get ID from tab as it's not easily achieved through Angular Material Tabs
            const tab = matTab['_viewContainerRef'];
            const id = tab.element.nativeElement.id;
            // cases/case-details/:caseId/hearings
            // cases/case-details/:caseId/roles-and-access
            this.router.navigate([id], { relativeTo: this.route });
        }
        else {
            // Routing here is based on tab label, not ideal
            // cases/case-details/:caseId#tabLabel
            this.router.navigate(['cases', 'case-details', this.caseDetails.case_id], { fragment: tabLabel });
        }
    }
    onLinkClicked(triggerOutputEventText) {
        // Get the *absolute* (not relative) index of the target tab and set as the active tab, using the selectedIndex input
        // of mat-tab-group (bound to selectedTabIndex)
        const targetTabIndex = this.tabGroup._tabs.toArray().findIndex(tab => tab.textLabel === triggerOutputEventText);
        if (targetTabIndex > -1) {
            this.selectedTabIndex = targetTabIndex;
        }
    }
    hasActiveCaseFlags() {
        // Determine which tab contains the FlagLauncher CaseField type, from the CaseView object in the snapshot data
        const caseFlagsTab = this.caseDetails.tabs
            ? (this.caseDetails.tabs).filter(tab => tab.fields && tab.fields.some(caseField => FieldsUtils.isFlagLauncherCaseField(caseField)))[0]
            : null;
        if (caseFlagsTab) {
            // Get the active case flags count
            // Cannot filter out anything other than to remove the FlagLauncher CaseField because Flags fields may be
            // contained in other CaseField instances, either as a sub-field of a Complex field, or fields in a collection
            // (or sub-fields of Complex fields in a collection)
            const activeCaseFlags = caseFlagsTab.fields
                .filter(caseField => !FieldsUtils.isFlagLauncherCaseField(caseField) && caseField.value)
                .reduce((active, caseFlag) => {
                return FieldsUtils.countActiveFlagsInCaseField(active, caseFlag);
            }, 0);
            if (activeCaseFlags > 0) {
                const description = activeCaseFlags > 1
                    ? `There are ${activeCaseFlags} active flags on this case.` : 'There is 1 active flag on this case.';
                // Initialise and display notification banner
                this.notificationBannerConfig = {
                    bannerType: NotificationBannerType.INFORMATION,
                    headingText: 'Important',
                    description,
                    showLink: true,
                    linkText: 'View case flags',
                    triggerOutputEvent: true,
                    triggerOutputEventText: caseFlagsTab.label,
                    headerClass: NotificationBannerHeaderClass.INFORMATION
                };
                return true;
            }
        }
        return false;
    }
    /**
     * Indicates that a CaseField is to be displayed without a label, as is expected for all ComponentLauncher-type
     * fields.
     * @param caseField The `CaseField` instance to check
     * @returns `true` if it should not have a label; `false` otherwise
     */
    isFieldToHaveNoLabel(caseField) {
        return caseField.field_type.type === 'ComponentLauncher'
            && caseField.display_context_parameter === '#ARGUMENT(CaseFileView)';
    }
    init() {
        // Clone and sort tabs array
        this.sortedTabs = this.orderService.sort(this.caseDetails.tabs);
        this.caseFields = this.getTabFields();
        this.sortedTabs = this.sortTabFieldsAndFilterTabs(this.sortedTabs);
        this.formGroup = this.buildFormGroup(this.caseFields);
        if (this.caseDetails.triggers && this.error) {
            this.resetErrors();
        }
    }
    sortTabFieldsAndFilterTabs(tabs) {
        return tabs
            .map(tab => Object.assign({}, tab, { fields: this.orderService.sort(tab.fields) }))
            .filter(tab => ShowCondition.getInstance(tab.show_condition).matchByContextFields(this.caseFields));
    }
    getTabFields() {
        const caseDataFields = this.sortedTabs.reduce((acc, tab) => {
            return acc.concat(plainToClass(CaseField, tab.fields));
        }, []);
        return caseDataFields.concat(this.caseDetails.metadataFields);
    }
    /**
     * For EUI-3825:
     * Builds a UntypedFormGroup from all the CaseFields contained within the view.
     * This UntypedFormGroup is necessary for evaluation the show/hide conditions of
     * fields that are dependent on a field only available on a DIFFERENT tab.
     */
    buildFormGroup(caseFields) {
        let value = {};
        if (caseFields) {
            caseFields.forEach(caseField => {
                value = {
                    ...value,
                    [caseField.id]: caseField.value
                };
            });
        }
        return new UntypedFormGroup({ data: new FormControl(value) });
    }
    resetErrors() {
        this.error = null;
        this.callbackErrorsSubject.next(null);
        this.alertService.clear();
    }
    getUrlFragment(url) {
        return url.split('#')[url.split('#').length - 1];
    }
    getTabIndexByTabLabel(tabGroup, tabLabel) {
        return tabGroup._tabs.toArray().findIndex((t) => t.textLabel.toLowerCase() === tabLabel.toLowerCase());
    }
}
CaseFullAccessViewComponent.ORIGIN_QUERY_PARAM = 'origin';
CaseFullAccessViewComponent.TRIGGER_TEXT_START = 'Go';
CaseFullAccessViewComponent.TRIGGER_TEXT_CONTINUE = 'Ignore Warning and Go';
CaseFullAccessViewComponent.UNICODE_SPACE = '%20';
CaseFullAccessViewComponent.EMPTY_SPACE = ' ';
CaseFullAccessViewComponent.ɵfac = function CaseFullAccessViewComponent_Factory(t) { return new (t || CaseFullAccessViewComponent)(i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.NavigationNotifierService), i0.ɵɵdirectiveInject(i2.OrderService), i0.ɵɵdirectiveInject(i2.ActivityPollingService), i0.ɵɵdirectiveInject(i3.MatDialog), i0.ɵɵdirectiveInject(i2.AlertService), i0.ɵɵdirectiveInject(i2.DraftService), i0.ɵɵdirectiveInject(i2.ErrorNotifierService), i0.ɵɵdirectiveInject(i4.ConvertHrefToRouterService), i0.ɵɵdirectiveInject(i5.Location), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.SessionStorageService)); };
CaseFullAccessViewComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseFullAccessViewComponent, selectors: [["ccd-case-full-access-view"]], viewQuery: function CaseFullAccessViewComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.tabGroup = _t.first);
    } }, inputs: { hasPrint: "hasPrint", hasEventSelector: "hasEventSelector", caseDetails: "caseDetails", prependedTabs: "prependedTabs", appendedTabs: "appendedTabs" }, features: [i0.ɵɵNgOnChangesFeature], decls: 13, vars: 12, consts: [["class", "error-summary", "role", "group", "aria-labelledby", "edit-case-event_error-summary-heading", "tabindex", "-1", 4, "ngIf"], [3, "triggerTextContinue", "triggerTextIgnore", "callbackErrorsSubject", "callbackErrorsContext"], [3, "caseId", "displayMode"], [1, "grid-row"], [1, "column-one-half"], [3, "caseDetails"], ["class", "case-viewer-controls", 4, "ngIf"], ["class", "column-one-half", 4, "ngIf"], ["class", "grid-row", 4, "ngIf"], [1, "column-full"], [4, "ngIf"], ["role", "group", "aria-labelledby", "edit-case-event_error-summary-heading", "tabindex", "-1", 1, "error-summary"], ["id", "edit-case-event_error-summary-heading", 1, "heading-h1", "error-summary-heading"], ["id", "edit-case-event_error-summary-body", 1, "govuk-error-summary__body"], ["href", "get-help", "target", "_blank"], ["id", "edit-case-event_error-summary-heading", 1, "heading-h2", "error-summary-heading"], ["class", "error-summary-list", 4, "ngIf"], [1, "error-summary-list"], [4, "ngFor", "ngForOf"], [1, "case-viewer-controls"], ["id", "case-viewer-control-print", "routerLink", "print", 1, "button", "button-secondary"], [3, "isDisabled", "triggers", "triggerText", "onTriggerChange", "onTriggerSubmit"], [3, "notificationBannerConfig", "linkClicked"], ["animationDuration", "0ms", 3, "disableRipple", "selectedIndex", "selectedIndexChange"], ["tabGroup", ""], [3, "id", "label", 4, "ngFor", "ngForOf"], [3, "id", "label"], ["matTabContent", ""], ["ccdLabelSubstitutor", "", 3, "caseField", "contextFields", "hidden"], [3, "ngSwitch"], [4, "ngSwitchCase"], ["class", "compound-field", 4, "ngSwitchCase"], ["id", "case-viewer-field-label", 4, "ngIf"], ["scope", "col", 3, "id"], [1, "text-16"], [3, "topLevelFormGroup", "caseField", "caseReference", "markdownUseHrefAsRouterLink"], ["id", "case-viewer-field-label"], [1, "case-viewer-label", "text-16"], [1, "compound-field"]], template: function CaseFullAccessViewComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseFullAccessViewComponent_div_0_Template, 14, 12, "div", 0);
        i0.ɵɵtemplate(1, CaseFullAccessViewComponent_div_1_Template, 8, 7, "div", 0);
        i0.ɵɵelementStart(2, "ccd-callback-errors", 1);
        i0.ɵɵlistener("callbackErrorsContext", function CaseFullAccessViewComponent_Template_ccd_callback_errors_callbackErrorsContext_2_listener($event) { return ctx.callbackErrorsNotify($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelement(3, "ccd-activity", 2);
        i0.ɵɵelementStart(4, "div", 3)(5, "div", 4);
        i0.ɵɵelement(6, "ccd-case-header", 5);
        i0.ɵɵtemplate(7, CaseFullAccessViewComponent_div_7_Template, 4, 3, "div", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(8, CaseFullAccessViewComponent_div_8_Template, 2, 3, "div", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(9, CaseFullAccessViewComponent_div_9_Template, 3, 1, "div", 8);
        i0.ɵɵelementStart(10, "div", 3)(11, "div", 9);
        i0.ɵɵtemplate(12, CaseFullAccessViewComponent_ng_container_12_Template, 7, 6, "ng-container", 10);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.error && !(ctx.error.callbackErrors || ctx.error.callbackWarnings || ctx.error.details));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.error && ctx.error.details);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("triggerTextContinue", ctx.triggerTextStart)("triggerTextIgnore", ctx.triggerTextIgnoreWarnings)("callbackErrorsSubject", ctx.callbackErrorsSubject);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("caseId", ctx.caseDetails.case_id)("displayMode", ctx.BANNER);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("caseDetails", ctx.caseDetails);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.hasPrint && !ctx.isDraft() && ctx.isPrintEnabled());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.hasEventSelector);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.activeCaseFlags);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.hasTabsPresent());
    } }, styles: ["th[_ngcontent-%COMP%]{width:1%;white-space:nowrap;vertical-align:top}.compound-field[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:0}.case-viewer-controls[_ngcontent-%COMP%]{margin-top:47px;margin-bottom:20px}ccd-case-header[_ngcontent-%COMP%]{float:left;margin-right:10px}ccd-event-trigger[_ngcontent-%COMP%]{float:right}.case-viewer-label[_ngcontent-%COMP%]{min-width:300px;white-space:normal}.markdown[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-bottom:0}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseFullAccessViewComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-full-access-view', template: "<!-- Generic error heading and error message to be displayed only if there are no specific callback errors or warnings, or no error details -->\n<div *ngIf=\"error && !(error.callbackErrors || error.callbackWarnings || error.details)\" class=\"error-summary\"\n     role=\"group\" aria-labelledby=\"edit-case-event_error-summary-heading\" tabindex=\"-1\">\n  <h1 class=\"heading-h1 error-summary-heading\" id=\"edit-case-event_error-summary-heading\">\n    {{'Something went wrong' | rpxTranslate}}\n  </h1>\n  <div class=\"govuk-error-summary__body\" id=\"edit-case-event_error-summary-body\">\n    <p>{{\"We're working to fix the problem. Try again shortly.\" | rpxTranslate}}</p>\n    <p>\n      <a href=\"get-help\" target=\"_blank\">\n        {{\"Contact us\" | rpxTranslate}}</a> {{\"if you're still having problems.\" | rpxTranslate}}\n    </p>\n  </div>\n</div>\n<!-- Callback error heading and error message to be displayed if there are specific error details -->\n<div *ngIf=\"error && error.details\" class=\"error-summary\" role=\"group\"\n     aria-labelledby=\"edit-case-event_error-summary-heading\" tabindex=\"-1\">\n  <h2 class=\"heading-h2 error-summary-heading\" id=\"edit-case-event_error-summary-heading\">\n    {{'The callback data failed validation' | rpxTranslate}}\n  </h2>\n  <p>{{error.message | rpxTranslate}}</p>\n  <ul *ngIf=\"error.details?.field_errors\" class=\"error-summary-list\">\n    <li *ngFor=\"let fieldError of error.details.field_errors\">\n      {{fieldError.message | rpxTranslate}}\n    </li>\n  </ul>\n</div>\n<ccd-callback-errors\n  [triggerTextContinue]=\"triggerTextStart\"\n  [triggerTextIgnore]=\"triggerTextIgnoreWarnings\"\n  [callbackErrorsSubject]=\"callbackErrorsSubject\"\n  (callbackErrorsContext)=\"callbackErrorsNotify($event)\">\n</ccd-callback-errors>\n<ccd-activity [caseId]=\"caseDetails.case_id\" [displayMode]=\"BANNER\"></ccd-activity>\n<div class=\"grid-row\">\n  <div class=\"column-one-half\">\n    <ccd-case-header [caseDetails]=\"caseDetails\"></ccd-case-header>\n    <div class=\"case-viewer-controls\" *ngIf=\"hasPrint && !isDraft() && isPrintEnabled()\">\n      <a id=\"case-viewer-control-print\" routerLink=\"print\" class=\"button button-secondary\">{{'Print' | rpxTranslate}}</a>\n    </div>\n  </div>\n  <div *ngIf=\"hasEventSelector\" class=\"column-one-half\">\n    <ccd-event-trigger [isDisabled]=\"isTriggerButtonDisabled()\" [triggers]=\"caseDetails.triggers\"\n                       [triggerText]=\"triggerText\" (onTriggerChange)=\"clearErrorsAndWarnings()\"\n                       (onTriggerSubmit)=\"applyTrigger($event)\"></ccd-event-trigger>\n  </div>\n</div>\n<div class=\"grid-row\" *ngIf=\"activeCaseFlags\">\n  <div class=\"column-full\">\n    <ccd-notification-banner [notificationBannerConfig]=\"notificationBannerConfig\" (linkClicked)=\"onLinkClicked($event)\">\n    </ccd-notification-banner>\n  </div>\n</div>\n<div class=\"grid-row\">\n  <div class=\"column-full\">\n    <ng-container *ngIf=\"hasTabsPresent()\">\n      <mat-tab-group #tabGroup animationDuration=\"0ms\" (selectedIndexChange)=\"tabChanged($event)\" [disableRipple]=\"true\"\n        [selectedIndex]=\"selectedTabIndex\">\n        <mat-tab *ngFor=\"let tab of prependedTabs\" [id]=\"tab.id\" [label]=\"tab.label | rpxTranslate\">\n        </mat-tab>\n        <mat-tab *ngFor=\"let tab of sortedTabs; let curIdx=index\" [id]=\"tab.id\" [label]=\"tab.label | rpxTranslate\">\n          <ng-template matTabContent>\n            <table [class]=\"tab.id\" [attr.aria-describedby]=\"'case viewer table' | rpxTranslate\">\n              <tbody>\n              <ng-container *ngFor=\"let field of tab | ccdTabFields | ccdReadFieldsFilter:false :undefined :true : formGroup.controls['data']\">\n                <div ccdLabelSubstitutor [caseField]=\"field\" [contextFields]=\"caseFields\" [hidden]=\"field.hidden\">\n                  <ng-container [ngSwitch]=\"!(field | ccdIsCompound)\">\n                    <tr *ngSwitchCase=\"true\">\n                      <th id=\"case-viewer-field-label\" *ngIf=\"!isFieldToHaveNoLabel(field)\">\n                        <div class=\"case-viewer-label text-16\">\n                          {{field.label | rpxTranslate}}</div>\n                      </th>\n                      <td [id]=\"'case-viewer-field-read--' + field.id\" scope=\"col\">\n                        <span class=\"text-16\">\n                          <ccd-field-read [topLevelFormGroup]=\"formGroup.controls['data']\"\n                                          [caseField]=\"field\" [caseReference]=\"caseDetails.case_id\"\n                                          [markdownUseHrefAsRouterLink]=\"markdownUseHrefAsRouterLink\">\n                          </ccd-field-read>\n                        </span>\n                      </td>\n                    </tr>\n                    <tr *ngSwitchCase=\"false\" class=\"compound-field\">\n                      <th [id]=\"'case-viewer-field-read--' + field.id\" scope=\"col\">\n                        <span class=\"text-16\">\n                          <ccd-field-read [topLevelFormGroup]=\"formGroup.controls['data']\"\n                                          [caseField]=\"field\" [caseReference]=\"caseDetails.case_id\"\n                                          [markdownUseHrefAsRouterLink]=\"markdownUseHrefAsRouterLink\">\n                          </ccd-field-read>\n                        </span>\n                      </th>\n                    </tr>\n                  </ng-container>\n                </div>\n              </ng-container>\n              </tbody>\n            </table>\n          </ng-template>\n        </mat-tab>\n        <mat-tab *ngFor=\"let tab of appendedTabs\" [id]=\"tab.id\" [label]=\"tab.label | rpxTranslate\">\n        </mat-tab>\n      </mat-tab-group>\n      <router-outlet *ngIf=\"(prependedTabs && prependedTabs.length) || (appendedTabs && appendedTabs.length)\"></router-outlet>\n    </ng-container>\n  </div>\n</div>\n", styles: ["th{width:1%;white-space:nowrap;vertical-align:top}.compound-field th{padding:0}.case-viewer-controls{margin-top:47px;margin-bottom:20px}ccd-case-header{float:left;margin-right:10px}ccd-event-trigger{float:right}.case-viewer-label{min-width:300px;white-space:normal}.markdown h3{margin-bottom:0}\n"] }]
    }], function () { return [{ type: i0.NgZone }, { type: i1.ActivatedRoute }, { type: i1.Router }, { type: i2.NavigationNotifierService }, { type: i2.OrderService }, { type: i2.ActivityPollingService }, { type: i3.MatDialog }, { type: i2.AlertService }, { type: i2.DraftService }, { type: i2.ErrorNotifierService }, { type: i4.ConvertHrefToRouterService }, { type: i5.Location }, { type: i0.ChangeDetectorRef }, { type: i2.SessionStorageService }]; }, { hasPrint: [{
            type: Input
        }], hasEventSelector: [{
            type: Input
        }], caseDetails: [{
            type: Input
        }], prependedTabs: [{
            type: Input
        }], appendedTabs: [{
            type: Input
        }], tabGroup: [{
            type: ViewChild,
            args: ['tabGroup', { static: false }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1mdWxsLWFjY2Vzcy12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLWZ1bGwtYWNjZXNzLXZpZXcvY2FzZS1mdWxsLWFjY2Vzcy12aWV3LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLWZ1bGwtYWNjZXNzLXZpZXcvY2FzZS1mdWxsLWFjY2Vzcy12aWV3LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQzVCLFNBQVMsRUFDekIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxTQUFTLEVBQW1CLE1BQU0sMEJBQTBCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFVLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBRUwsNkJBQTZCLEVBQzdCLHNC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QXRCLDJDQUFzQjs7dUZEZDVCLDJCQUEyQjtjQUx2QyxTQUFTOzJCQUNFLDJCQUEyQjt3Y0FZckIsUUFBUTtrQkFBdkIsS0FBSztZQUNVLGdCQUFnQjtrQkFBL0IsS0FBSztZQUNVLFdBQVc7a0JBQTFCLEtBQUs7WUFDVSxhQUFhO2tCQUE1QixLQUFLO1lBQ1UsWUFBWTtrQkFBM0IsS0FBSztZQXdCMkMsUUFBUTtrQkFBeEQsU0FBUzttQkFBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIE5nWm9uZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBNYXRUYWJHcm91cCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FbmQsIFBhcmFtcywgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IHBsYWluVG9DbGFzcyB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIE5vdGlmaWNhdGlvbkJhbm5lckNvbmZpZyxcbiAgTm90aWZpY2F0aW9uQmFubmVySGVhZGVyQ2xhc3MsXG4gIE5vdGlmaWNhdGlvbkJhbm5lclR5cGVcbn0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9iYW5uZXJzL25vdGlmaWNhdGlvbi1iYW5uZXInO1xuaW1wb3J0IHsgU2hvd0NvbmRpdGlvbiB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgQWN0aXZpdHksIENhc2VGaWVsZCwgQ2FzZVRhYiwgQ2FzZVZpZXcsIENhc2VWaWV3VHJpZ2dlciwgRFJBRlRfUVVFUllfUEFSQU0sIERpc3BsYXlNb2RlLCBEcmFmdCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbic7XG5pbXBvcnQge1xuICBBY3Rpdml0eVBvbGxpbmdTZXJ2aWNlLFxuICBBbGVydFNlcnZpY2UsXG4gIERyYWZ0U2VydmljZSxcbiAgRXJyb3JOb3RpZmllclNlcnZpY2UsXG4gIEZpZWxkc1V0aWxzLFxuICBOYXZpZ2F0aW9uTm90aWZpZXJTZXJ2aWNlLFxuICBOYXZpZ2F0aW9uT3JpZ2luLFxuICBPcmRlclNlcnZpY2UsXG4gIFNlc3Npb25TdG9yYWdlU2VydmljZVxufSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBDb252ZXJ0SHJlZlRvUm91dGVyU2VydmljZSB9IGZyb20gJy4uLy4uL2Nhc2UtZWRpdG9yL3NlcnZpY2VzL2NvbnZlcnQtaHJlZi10by1yb3V0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEZWxldGVPckNhbmNlbERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uLy4uL2RpYWxvZ3MnO1xuaW1wb3J0IHsgQ2FsbGJhY2tFcnJvcnNDb250ZXh0IH0gZnJvbSAnLi4vLi4vZXJyb3InO1xuaW1wb3J0IHsgaW5pdERpYWxvZyB9IGZyb20gJy4uLy4uL2hlbHBlcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY2FzZS1mdWxsLWFjY2Vzcy12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhc2UtZnVsbC1hY2Nlc3Mtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhc2UtZnVsbC1hY2Nlc3Mtdmlldy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhc2VGdWxsQWNjZXNzVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE9SSUdJTl9RVUVSWV9QQVJBTSA9ICdvcmlnaW4nO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFRSSUdHRVJfVEVYVF9TVEFSVCA9ICdHbyc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVFJJR0dFUl9URVhUX0NPTlRJTlVFID0gJ0lnbm9yZSBXYXJuaW5nIGFuZCBHbyc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVU5JQ09ERV9TUEFDRSA9ICclMjAnO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVNUFRZX1NQQUNFID0gJyAnO1xuICBwcml2YXRlIHJlYWRvbmx5IEhFQVJJTkdTX1RBQl9MQUJFTCA9ICdIZWFyaW5ncyc7XG5cbiAgQElucHV0KCkgcHVibGljIGhhc1ByaW50ID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIGhhc0V2ZW50U2VsZWN0b3IgPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgY2FzZURldGFpbHM6IENhc2VWaWV3O1xuICBASW5wdXQoKSBwdWJsaWMgcHJlcGVuZGVkVGFiczogQ2FzZVRhYltdID0gW107XG4gIEBJbnB1dCgpIHB1YmxpYyBhcHBlbmRlZFRhYnM6IENhc2VUYWJbXSA9IFtdO1xuXG4gIHB1YmxpYyBCQU5ORVIgPSBEaXNwbGF5TW9kZS5CQU5ORVI7XG4gIHB1YmxpYyBzb3J0ZWRUYWJzOiBDYXNlVGFiW107XG4gIHB1YmxpYyBjYXNlRmllbGRzOiBDYXNlRmllbGRbXTtcbiAgcHVibGljIGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cDtcbiAgcHVibGljIGVycm9yOiBhbnk7XG4gIHB1YmxpYyB0cmlnZ2VyVGV4dFN0YXJ0ID0gQ2FzZUZ1bGxBY2Nlc3NWaWV3Q29tcG9uZW50LlRSSUdHRVJfVEVYVF9TVEFSVDtcbiAgcHVibGljIHRyaWdnZXJUZXh0SWdub3JlV2FybmluZ3MgPSBDYXNlRnVsbEFjY2Vzc1ZpZXdDb21wb25lbnQuVFJJR0dFUl9URVhUX0NPTlRJTlVFO1xuICBwdWJsaWMgdHJpZ2dlclRleHQ6IHN0cmluZyA9IENhc2VGdWxsQWNjZXNzVmlld0NvbXBvbmVudC5UUklHR0VSX1RFWFRfU1RBUlQ7XG4gIHB1YmxpYyBpZ25vcmVXYXJuaW5nID0gZmFsc2U7XG4gIHB1YmxpYyBhY3Rpdml0eVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwdWJsaWMgY2FzZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwdWJsaWMgZXJyb3JTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIGRpYWxvZ0NvbmZpZzogTWF0RGlhbG9nQ29uZmlnO1xuICBwdWJsaWMgbWFya2Rvd25Vc2VIcmVmQXNSb3V0ZXJMaW5rOiBib29sZWFuO1xuICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICBwdWJsaWMgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBub3RpZmljYXRpb25CYW5uZXJDb25maWc6IE5vdGlmaWNhdGlvbkJhbm5lckNvbmZpZztcbiAgcHVibGljIHNlbGVjdGVkVGFiSW5kZXggPSAwO1xuICBwdWJsaWMgYWN0aXZlQ2FzZUZsYWdzID0gZmFsc2U7XG4gIHByaXZhdGUgc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBwdWJsaWMgY2FsbGJhY2tFcnJvcnNTdWJqZWN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICBAVmlld0NoaWxkKCd0YWJHcm91cCcsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgdGFiR3JvdXA6IE1hdFRhYkdyb3VwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IG5hdmlnYXRpb25Ob3RpZmllclNlcnZpY2U6IE5hdmlnYXRpb25Ob3RpZmllclNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBvcmRlclNlcnZpY2U6IE9yZGVyU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFjdGl2aXR5UG9sbGluZ1NlcnZpY2U6IEFjdGl2aXR5UG9sbGluZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFsZXJ0U2VydmljZTogQWxlcnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHJhZnRTZXJ2aWNlOiBEcmFmdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBlcnJvck5vdGlmaWVyU2VydmljZTogRXJyb3JOb3RpZmllclNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb252ZXJ0SHJlZlRvUm91dGVyU2VydmljZTogQ29udmVydEhyZWZUb1JvdXRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgcHJpdmF0ZSByZWFkb25seSBjcmY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlOiBTZXNzaW9uU3RvcmFnZVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaW5pdERpYWxvZygpO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuY2FsbGJhY2tFcnJvcnNTdWJqZWN0LnN1YnNjcmliZShlcnJvckV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZXJyb3IgPSBlcnJvckV2ZW50O1xuICAgIH0pO1xuICAgIHRoaXMuZXJyb3JTdWJzY3JpcHRpb24gPSB0aGlzLmVycm9yTm90aWZpZXJTZXJ2aWNlLmVycm9yLnN1YnNjcmliZShlcnJvciA9PiB7XG4gICAgICBpZiAoZXJyb3IgJiYgZXJyb3Iuc3RhdHVzICE9PSA0MDEgJiYgZXJyb3Iuc3RhdHVzICE9PSA0MDMpIHtcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aGlzLmNhbGxiYWNrRXJyb3JzU3ViamVjdC5uZXh0KHRoaXMuZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubWFya2Rvd25Vc2VIcmVmQXNSb3V0ZXJMaW5rID0gdHJ1ZTtcblxuICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLnJlbW92ZUl0ZW0oJ2V2ZW50VXJsJyk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuY29udmVydEhyZWZUb1JvdXRlclNlcnZpY2UuZ2V0SHJlZk1hcmtkb3duTGlua0NvbnRlbnQoKS5zdWJzY3JpYmUoKGhyZWZNYXJrZG93bkxpbmtDb250ZW50OiBzdHJpbmcpID0+IHtcbiAgICAgIC8vIGRvIG5vdCBjb252ZXJ0IHJvdXRlciB3aXRoIGluaXRpYWwgZGVmYXVsdCB2YWx1ZTsgY29udmVydCB0byByb3V0ZXIgb25seSBvbiB1cGRhdGVkIGxpbmsgY29udGVudFxuICAgICAgaWYgKGhyZWZNYXJrZG93bkxpbmtDb250ZW50ICE9PSAnRGVmYXVsdCcpIHtcbiAgICAgICAgdGhpcy5jb252ZXJ0SHJlZlRvUm91dGVyU2VydmljZS5jYWxsQW5ndWxhclJvdXRlcihocmVmTWFya2Rvd25MaW5rQ29udGVudCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5hY3Rpdml0eVBvbGxpbmdTZXJ2aWNlLmlzRW5hYmxlZCAmJiAhdGhpcy5hY3Rpdml0eVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2aXR5U3Vic2NyaXB0aW9uID0gdGhpcy5wb3N0Vmlld0FjdGl2aXR5KCkuc3Vic2NyaWJlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmNoZWNrUm91dGVBbmRTZXRDYXNlVmlld1RhYigpO1xuXG4gICAgLy8gQ2hlY2sgZm9yIGFjdGl2ZSBDYXNlIEZsYWdzXG4gICAgdGhpcy5hY3RpdmVDYXNlRmxhZ3MgPSB0aGlzLmhhc0FjdGl2ZUNhc2VGbGFncygpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcyAmJiBjaGFuZ2VzLnByZXBlbmRlZFRhYnMgJiYgIWNoYW5nZXMucHJlcGVuZGVkVGFicy5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB0aGlzLmNyZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLm9yZ2FuaXNlVGFiUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNQcmludEVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FzZURldGFpbHMuY2FzZV90eXBlLnByaW50RW5hYmxlZDtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hY3Rpdml0eVBvbGxpbmdTZXJ2aWNlLmlzRW5hYmxlZCkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZSh0aGlzLmFjdGl2aXR5U3Vic2NyaXB0aW9uKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnJvdXRlLnNuYXBzaG90LmRhdGEuY2FzZSkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZSh0aGlzLmNhc2VTdWJzY3JpcHRpb24pO1xuICAgIH1cbiAgICB0aGlzLnVuc3Vic2NyaWJlKHRoaXMuY2FsbGJhY2tFcnJvcnNTdWJqZWN0KTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKHRoaXMuZXJyb3JTdWJzY3JpcHRpb24pO1xuICAgIHRoaXMudW5zdWJzY3JpYmUodGhpcy5zdWJzY3JpcHRpb24pO1xuICAgIHRoaXMuc3Vicy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHB1YmxpYyB1bnN1YnNjcmliZShzdWJzY3JpcHRpb246IGFueSkge1xuICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tSb3V0ZUFuZFNldENhc2VWaWV3VGFiKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vicy5wdXNoKHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgLnBpcGUoZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBOYXZpZ2F0aW9uRW5kKSA9PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IGV2ZW50ICYmIChldmVudCBhcyBhbnkpLnVybDtcbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgIGNvbnN0IHRhYlVybCA9IHVybCA/IHVybC5zcGxpdCgnIycpIDogbnVsbDtcbiAgICAgICAgICBjb25zdCB0YWIgPSB0YWJVcmwgJiYgdGFiVXJsLmxlbmd0aCA+IDEgPyB0YWJVcmxbdGFiVXJsLmxlbmd0aCAtIDFdLnJlcGxhY2VBbGwoJyUyMCcsICcgJykgOiAnJztcbiAgICAgICAgICBjb25zdCBtYXRUYWIgPSB0aGlzLnRhYkdyb3VwLl90YWJzLmZpbmQoKHgpID0+IHgudGV4dExhYmVsLnRvTG93ZXJDYXNlKCkgPT09IHRhYi50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICBpZiAobWF0VGFiICYmIG1hdFRhYi5wb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy50YWJHcm91cC5zZWxlY3RlZEluZGV4ID0gbWF0VGFiLnBvc2l0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkpO1xuICB9XG5cbiAgcHVibGljIHBvc3RWaWV3QWN0aXZpdHkoKTogT2JzZXJ2YWJsZTxBY3Rpdml0eVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZpdHlQb2xsaW5nU2VydmljZS5wb3N0Vmlld0FjdGl2aXR5KHRoaXMuY2FzZURldGFpbHMuY2FzZV9pZCk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJFcnJvcnNBbmRXYXJuaW5ncygpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0RXJyb3JzKCk7XG4gICAgdGhpcy5pZ25vcmVXYXJuaW5nID0gZmFsc2U7XG4gICAgdGhpcy50cmlnZ2VyVGV4dCA9IENhc2VGdWxsQWNjZXNzVmlld0NvbXBvbmVudC5UUklHR0VSX1RFWFRfU1RBUlQ7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlUcmlnZ2VyKHRyaWdnZXI6IENhc2VWaWV3VHJpZ2dlcik6IHZvaWQge1xuICAgIHRoaXMuZXJyb3IgPSBudWxsO1xuXG4gICAgY29uc3QgdGhlUXVlcnlQYXJhbXM6IFBhcmFtcyA9IHt9O1xuXG4gICAgaWYgKHRoaXMuaWdub3JlV2FybmluZykge1xuICAgICAgdGhlUXVlcnlQYXJhbXNbJ2lnbm9yZVdhcm5pbmcnXSA9IHRoaXMuaWdub3JlV2FybmluZztcbiAgICB9XG5cbiAgICAvLyB3ZSBtYXkgbmVlZCB0byB0YWtlIGNhcmUgb2YgZGlmZmVyZW50IHRyaWdnZXJzIGluIHRoZSBmdXR1cmVcbiAgICBpZiAodHJpZ2dlci5pZCA9PT0gQ2FzZVZpZXdUcmlnZ2VyLkRFTEVURSkge1xuICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihEZWxldGVPckNhbmNlbERpYWxvZ0NvbXBvbmVudCwgdGhpcy5kaWFsb2dDb25maWcpO1xuICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgPT09ICdEZWxldGUnKSB7XG4gICAgICAgICAgdGhpcy5kcmFmdFNlcnZpY2UuZGVsZXRlRHJhZnQodGhpcy5jYXNlRGV0YWlscy5jYXNlX2lkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShfID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uTm90aWZpZXJTZXJ2aWNlLmFubm91bmNlTmF2aWdhdGlvbih7IGFjdGlvbjogTmF2aWdhdGlvbk9yaWdpbi5EUkFGVF9ERUxFVEVEIH0pO1xuICAgICAgICAgICAgfSwgXyA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvbk5vdGlmaWVyU2VydmljZS5hbm5vdW5jZU5hdmlnYXRpb24oeyBhY3Rpb246IE5hdmlnYXRpb25PcmlnaW4uRVJST1JfREVMRVRJTkdfRFJBRlQgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRHJhZnQoKSAmJiB0cmlnZ2VyLmlkICE9PSBDYXNlVmlld1RyaWdnZXIuREVMRVRFKSB7XG4gICAgICB0aGVRdWVyeVBhcmFtc1tEUkFGVF9RVUVSWV9QQVJBTV0gPSB0aGlzLmNhc2VEZXRhaWxzLmNhc2VfaWQ7XG4gICAgICB0aGVRdWVyeVBhcmFtc1tDYXNlRnVsbEFjY2Vzc1ZpZXdDb21wb25lbnQuT1JJR0lOX1FVRVJZX1BBUkFNXSA9ICd2aWV3RHJhZnQnO1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uTm90aWZpZXJTZXJ2aWNlLmFubm91bmNlTmF2aWdhdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIGFjdGlvbjogTmF2aWdhdGlvbk9yaWdpbi5EUkFGVF9SRVNVTUVELFxuICAgICAgICAgIGppZDogdGhpcy5jYXNlRGV0YWlscy5jYXNlX3R5cGUuanVyaXNkaWN0aW9uLmlkLFxuICAgICAgICAgIGN0aWQ6IHRoaXMuY2FzZURldGFpbHMuY2FzZV90eXBlLmlkLFxuICAgICAgICAgIGV0aWQ6IHRyaWdnZXIuaWQsXG4gICAgICAgICAgcXVlcnlQYXJhbXM6IHRoZVF1ZXJ5UGFyYW1zXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5hdmlnYXRpb25Ob3RpZmllclNlcnZpY2UuYW5ub3VuY2VOYXZpZ2F0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgYWN0aW9uOiBOYXZpZ2F0aW9uT3JpZ2luLkVWRU5UX1RSSUdHRVJFRCxcbiAgICAgICAgICBxdWVyeVBhcmFtczogdGhlUXVlcnlQYXJhbXMsXG4gICAgICAgICAgZXRpZDogdHJpZ2dlci5pZCxcbiAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYXNUYWJzUHJlc2VudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zb3J0ZWRUYWJzLmxlbmd0aCA+IDAgfHwgdGhpcy5wcmVwZW5kZWRUYWJzLmxlbmd0aCA+IDAgfHwgdGhpcy5hcHBlbmRlZFRhYnMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIHB1YmxpYyBjYWxsYmFja0Vycm9yc05vdGlmeShjYWxsYmFja0Vycm9yc0NvbnRleHQ6IENhbGxiYWNrRXJyb3JzQ29udGV4dCk6IHZvaWQge1xuICAgIHRoaXMuaWdub3JlV2FybmluZyA9IGNhbGxiYWNrRXJyb3JzQ29udGV4dC5pZ25vcmVXYXJuaW5nO1xuICAgIHRoaXMudHJpZ2dlclRleHQgPSBjYWxsYmFja0Vycm9yc0NvbnRleHQudHJpZ2dlclRleHQ7XG4gIH1cblxuICBwdWJsaWMgaXNEcmFmdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gRHJhZnQuaXNEcmFmdCh0aGlzLmNhc2VEZXRhaWxzLmNhc2VfaWQpO1xuICB9XG5cbiAgcHVibGljIGlzVHJpZ2dlckJ1dHRvbkRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5lcnJvclxuICAgICAgJiYgdGhpcy5lcnJvci5jYWxsYmFja0Vycm9yc1xuICAgICAgJiYgdGhpcy5lcnJvci5jYWxsYmFja0Vycm9ycy5sZW5ndGgpXG4gICAgICB8fCAodGhpcy5lcnJvclxuICAgICAgICAmJiB0aGlzLmVycm9yLmRldGFpbHNcbiAgICAgICAgJiYgdGhpcy5lcnJvci5kZXRhaWxzLmZpZWxkX2Vycm9yc1xuICAgICAgICAmJiB0aGlzLmVycm9yLmRldGFpbHMuZmllbGRfZXJyb3JzLmxlbmd0aCk7XG4gIH1cblxuICBwdWJsaWMgb3JnYW5pc2VUYWJQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBsZXQgbWF0VGFiO1xuICAgIGNvbnN0IHVybCA9IHRoaXMubG9jYXRpb24ucGF0aCh0cnVlKTtcbiAgICBsZXQgaGFzaFZhbHVlID0gdXJsLnN1YnN0cmluZyh1cmwuaW5kZXhPZignIycpICsgMSk7XG4gICAgaWYgKCF1cmwuaW5jbHVkZXMoJyMnKSAmJiAhdXJsLmluY2x1ZGVzKCdyb2xlcy1hbmQtYWNjZXNzJykgJiYgIXVybC5pbmNsdWRlcygndGFza3MnKSAmJiAhdXJsLmluY2x1ZGVzKCdoZWFyaW5ncycpKSB7XG4gICAgICBjb25zdCBwYXRocyA9IHVybC5zcGxpdCgnLycpO1xuICAgICAgLy8gbGFzdFBhdGggY2FuIGJlIC9jYXNlSWQsIG9yIHRoZSB0YWJzIC90YXNrcywgL2hlYXJpbmdzIGV0Yy5cbiAgICAgIGNvbnN0IGxhc3RQYXRoID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhdGhzW3BhdGhzLmxlbmd0aCAtIDFdKTtcbiAgICAgIGxldCBmb3VuZFRhYjogQ2FzZVRhYiA9IG51bGw7XG4gICAgICBpZiAoIXRoaXMucHJlcGVuZGVkVGFicykge1xuICAgICAgICB0aGlzLnByZXBlbmRlZFRhYnMgPSBbXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFkZGl0aW9uYWxUYWJzID0gWy4uLnRoaXMucHJlcGVuZGVkVGFicywgLi4udGhpcy5hcHBlbmRlZFRhYnNdO1xuICAgICAgaWYgKGFkZGl0aW9uYWxUYWJzICYmIGFkZGl0aW9uYWxUYWJzLmxlbmd0aCkge1xuICAgICAgICBmb3VuZFRhYiA9IGFkZGl0aW9uYWxUYWJzLmZpbmQoKGNhc2VUYWI6IENhc2VUYWIpID0+IGNhc2VUYWIuaWQudG9Mb3dlckNhc2UoKSA9PT0gbGFzdFBhdGgudG9Mb3dlckNhc2UoKSk7XG4gICAgICB9XG4gICAgICAvLyBmb3VuZCB0YXNrcyBvciBoZWFyaW5nIHRhYlxuICAgICAgaWYgKGZvdW5kVGFiKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnY2FzZXMnLCAnY2FzZS1kZXRhaWxzJywgdGhpcy5jYXNlRGV0YWlscy5jYXNlX2lkLCBmb3VuZFRhYi5pZF0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIG1hdFRhYiA9IHRoaXMudGFiR3JvdXAuX3RhYnMuZmluZCgoeCkgPT4geC50ZXh0TGFiZWwgPT09IGZvdW5kVGFiLmxhYmVsKTtcbiAgICAgICAgICB0aGlzLnRhYkdyb3VwLnNlbGVjdGVkSW5kZXggPSBtYXRUYWIucG9zaXRpb247XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBsYXN0IHBhdGggaXMgY2FzZUlkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzb3J0IHdpdGggdGhlIG9yZGVyIG9mIENDRCBwcmVkZWZpbmVkIHRhYnNcbiAgICAgICAgdGhpcy5jYXNlRGV0YWlscy50YWJzLnNvcnQoKGFUYWIsIGJUYWIpID0+IGFUYWIub3JkZXIgPiBiVGFiLm9yZGVyID8gMSA6IChiVGFiLm9yZGVyID4gYVRhYi5vcmRlciA/IC0xIDogMCkpO1xuICAgICAgICAvLyBwcmVzZWxlY3QgdGhlIDFzdCBvcmRlciBvZiBDQ0QgcHJlZGVmaW5lZCB0YWJzXG4gICAgICAgIGNvbnN0IHByZVNlbGVjdFRhYjogQ2FzZVRhYiA9IHRoaXMuY2FzZURldGFpbHMudGFic1swXTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydjYXNlcycsICdjYXNlLWRldGFpbHMnLCB0aGlzLmNhc2VEZXRhaWxzLmNhc2VfaWRdLCB7IGZyYWdtZW50OiBwcmVTZWxlY3RUYWIubGFiZWwgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgbWF0VGFiID0gdGhpcy50YWJHcm91cC5fdGFicy5maW5kKCh4KSA9PiB4LnRleHRMYWJlbCA9PT0gcHJlU2VsZWN0VGFiLmxhYmVsKTtcbiAgICAgICAgICB0aGlzLnRhYkdyb3VwLnNlbGVjdGVkSW5kZXggPSBtYXRUYWIucG9zaXRpb247XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKENhc2VGdWxsQWNjZXNzVmlld0NvbXBvbmVudC5VTklDT0RFX1NQQUNFLCAnZycpO1xuICAgICAgaGFzaFZhbHVlID0gaGFzaFZhbHVlLnJlcGxhY2UocmVnRXhwLCBDYXNlRnVsbEFjY2Vzc1ZpZXdDb21wb25lbnQuRU1QVFlfU1BBQ0UpO1xuICAgICAgaWYgKGhhc2hWYWx1ZS5pbmNsdWRlcygnaGVhcmluZ3MnKSkge1xuICAgICAgICBoYXNoVmFsdWUgPSAnaGVhcmluZ3MnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGhhc2hWYWx1ZS5pbmNsdWRlcygncm9sZXMtYW5kLWFjY2VzcycpIHx8IGhhc2hWYWx1ZS5pbmNsdWRlcygndGFza3MnKSkge1xuICAgICAgICAgIGhhc2hWYWx1ZSA9IGhhc2hWYWx1ZS5pbmNsdWRlcygncm9sZXMtYW5kLWFjY2VzcycpID8gJ3JvbGVzIGFuZCBhY2Nlc3MnIDogJ3Rhc2tzJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbWF0VGFiID0gdGhpcy50YWJHcm91cC5fdGFicy5maW5kKCh4KSA9PlxuICAgICAgICB4LnRleHRMYWJlbC5yZXBsYWNlKENhc2VGdWxsQWNjZXNzVmlld0NvbXBvbmVudC5FTVBUWV9TUEFDRSwgJycpLnRvTG93ZXJDYXNlKCkgPT09XG4gICAgICAgIGhhc2hWYWx1ZS5yZXBsYWNlKENhc2VGdWxsQWNjZXNzVmlld0NvbXBvbmVudC5FTVBUWV9TUEFDRSwgJycpLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgaWYgKG1hdFRhYiAmJiBtYXRUYWIucG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy50YWJHcm91cC5zZWxlY3RlZEluZGV4ID0gbWF0VGFiLnBvc2l0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFJlZmFjdG9yZWQgdW5kZXIgRVhVSS0xMTAgdG8gYWRkcmVzcyBpbmZpbml0ZSB0YWIgbG9vcCB0byB1c2UgdGFiSW5kZXhDaGFuZ2VkIGluc3RlYWRcbiAgcHVibGljIHRhYkNoYW5nZWQodGFiSW5kZXhDaGFuZ2VkOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBtYXRUYWIgPSB0aGlzLnRhYkdyb3VwLl90YWJzLmZpbmQodGFiID0+IHRhYi5pc0FjdGl2ZSk7XG4gICAgY29uc3QgdGFiTGFiZWwgPSBtYXRUYWIudGV4dExhYmVsO1xuICAgIC8vIHNvcnRlZFRhYnMgYXJlIGZyYWdtZW50c1xuICAgIC8vIGFwcGVuZGVkL3ByZXBlcGVuZGVkIHRhYnMgdXNlIHJvdXRlciBuYXZpZ2F0aW9uXG4gICAgaWYgKCh0YWJJbmRleENoYW5nZWQgPD0gMSAmJiB0aGlzLnByZXBlbmRlZFRhYnMgJiYgdGhpcy5wcmVwZW5kZWRUYWJzLmxlbmd0aCkgfHxcbiAgICAgICh0aGlzLmFwcGVuZGVkVGFicyAmJiB0aGlzLmFwcGVuZGVkVGFicy5sZW5ndGggJiYgdGFiTGFiZWwgPT09IHRoaXMuSEVBUklOR1NfVEFCX0xBQkVMKSkge1xuICAgICAgLy8gSGFjayB0byBnZXQgSUQgZnJvbSB0YWIgYXMgaXQncyBub3QgZWFzaWx5IGFjaGlldmVkIHRocm91Z2ggQW5ndWxhciBNYXRlcmlhbCBUYWJzXG4gICAgICBjb25zdCB0YWIgPSBtYXRUYWJbJ192aWV3Q29udGFpbmVyUmVmJ10gYXMgVmlld0NvbnRhaW5lclJlZjtcbiAgICAgIGNvbnN0IGlkID0gKHRhYi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmlkO1xuICAgICAgLy8gY2FzZXMvY2FzZS1kZXRhaWxzLzpjYXNlSWQvaGVhcmluZ3NcbiAgICAgIC8vIGNhc2VzL2Nhc2UtZGV0YWlscy86Y2FzZUlkL3JvbGVzLWFuZC1hY2Nlc3NcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtpZF0sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUm91dGluZyBoZXJlIGlzIGJhc2VkIG9uIHRhYiBsYWJlbCwgbm90IGlkZWFsXG4gICAgICAvLyBjYXNlcy9jYXNlLWRldGFpbHMvOmNhc2VJZCN0YWJMYWJlbFxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydjYXNlcycsICdjYXNlLWRldGFpbHMnLCB0aGlzLmNhc2VEZXRhaWxzLmNhc2VfaWRdLCB7IGZyYWdtZW50OiB0YWJMYWJlbCB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25MaW5rQ2xpY2tlZCh0cmlnZ2VyT3V0cHV0RXZlbnRUZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBHZXQgdGhlICphYnNvbHV0ZSogKG5vdCByZWxhdGl2ZSkgaW5kZXggb2YgdGhlIHRhcmdldCB0YWIgYW5kIHNldCBhcyB0aGUgYWN0aXZlIHRhYiwgdXNpbmcgdGhlIHNlbGVjdGVkSW5kZXggaW5wdXRcbiAgICAvLyBvZiBtYXQtdGFiLWdyb3VwIChib3VuZCB0byBzZWxlY3RlZFRhYkluZGV4KVxuICAgIGNvbnN0IHRhcmdldFRhYkluZGV4ID0gdGhpcy50YWJHcm91cC5fdGFicy50b0FycmF5KCkuZmluZEluZGV4KHRhYiA9PiB0YWIudGV4dExhYmVsID09PSB0cmlnZ2VyT3V0cHV0RXZlbnRUZXh0KTtcbiAgICBpZiAodGFyZ2V0VGFiSW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5zZWxlY3RlZFRhYkluZGV4ID0gdGFyZ2V0VGFiSW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGhhc0FjdGl2ZUNhc2VGbGFncygpOiBib29sZWFuIHtcbiAgICAvLyBEZXRlcm1pbmUgd2hpY2ggdGFiIGNvbnRhaW5zIHRoZSBGbGFnTGF1bmNoZXIgQ2FzZUZpZWxkIHR5cGUsIGZyb20gdGhlIENhc2VWaWV3IG9iamVjdCBpbiB0aGUgc25hcHNob3QgZGF0YVxuICAgIGNvbnN0IGNhc2VGbGFnc1RhYiA9IHRoaXMuY2FzZURldGFpbHMudGFic1xuICAgICAgPyAodGhpcy5jYXNlRGV0YWlscy50YWJzKS5maWx0ZXIoXG4gICAgICAgIHRhYiA9PiB0YWIuZmllbGRzICYmIHRhYi5maWVsZHMuc29tZShjYXNlRmllbGQgPT4gRmllbGRzVXRpbHMuaXNGbGFnTGF1bmNoZXJDYXNlRmllbGQoY2FzZUZpZWxkKSkpWzBdXG4gICAgICA6IG51bGw7XG5cbiAgICBpZiAoY2FzZUZsYWdzVGFiKSB7XG4gICAgICAvLyBHZXQgdGhlIGFjdGl2ZSBjYXNlIGZsYWdzIGNvdW50XG4gICAgICAvLyBDYW5ub3QgZmlsdGVyIG91dCBhbnl0aGluZyBvdGhlciB0aGFuIHRvIHJlbW92ZSB0aGUgRmxhZ0xhdW5jaGVyIENhc2VGaWVsZCBiZWNhdXNlIEZsYWdzIGZpZWxkcyBtYXkgYmVcbiAgICAgIC8vIGNvbnRhaW5lZCBpbiBvdGhlciBDYXNlRmllbGQgaW5zdGFuY2VzLCBlaXRoZXIgYXMgYSBzdWItZmllbGQgb2YgYSBDb21wbGV4IGZpZWxkLCBvciBmaWVsZHMgaW4gYSBjb2xsZWN0aW9uXG4gICAgICAvLyAob3Igc3ViLWZpZWxkcyBvZiBDb21wbGV4IGZpZWxkcyBpbiBhIGNvbGxlY3Rpb24pXG4gICAgICBjb25zdCBhY3RpdmVDYXNlRmxhZ3MgPSBjYXNlRmxhZ3NUYWIuZmllbGRzXG4gICAgICAgIC5maWx0ZXIoY2FzZUZpZWxkID0+ICFGaWVsZHNVdGlscy5pc0ZsYWdMYXVuY2hlckNhc2VGaWVsZChjYXNlRmllbGQpICYmIGNhc2VGaWVsZC52YWx1ZSlcbiAgICAgICAgLnJlZHVjZSgoYWN0aXZlLCBjYXNlRmxhZykgPT4ge1xuICAgICAgICAgIHJldHVybiBGaWVsZHNVdGlscy5jb3VudEFjdGl2ZUZsYWdzSW5DYXNlRmllbGQoYWN0aXZlLCBjYXNlRmxhZyk7XG4gICAgICAgIH0sIDApO1xuXG4gICAgICBpZiAoYWN0aXZlQ2FzZUZsYWdzID4gMCkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGFjdGl2ZUNhc2VGbGFncyA+IDFcbiAgICAgICAgICA/IGBUaGVyZSBhcmUgJHthY3RpdmVDYXNlRmxhZ3N9IGFjdGl2ZSBmbGFncyBvbiB0aGlzIGNhc2UuYCA6ICdUaGVyZSBpcyAxIGFjdGl2ZSBmbGFnIG9uIHRoaXMgY2FzZS4nO1xuICAgICAgICAvLyBJbml0aWFsaXNlIGFuZCBkaXNwbGF5IG5vdGlmaWNhdGlvbiBiYW5uZXJcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25CYW5uZXJDb25maWcgPSB7XG4gICAgICAgICAgYmFubmVyVHlwZTogTm90aWZpY2F0aW9uQmFubmVyVHlwZS5JTkZPUk1BVElPTixcbiAgICAgICAgICBoZWFkaW5nVGV4dDogJ0ltcG9ydGFudCcsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgc2hvd0xpbms6IHRydWUsXG4gICAgICAgICAgbGlua1RleHQ6ICdWaWV3IGNhc2UgZmxhZ3MnLFxuICAgICAgICAgIHRyaWdnZXJPdXRwdXRFdmVudDogdHJ1ZSxcbiAgICAgICAgICB0cmlnZ2VyT3V0cHV0RXZlbnRUZXh0OiBjYXNlRmxhZ3NUYWIubGFiZWwsXG4gICAgICAgICAgaGVhZGVyQ2xhc3M6IE5vdGlmaWNhdGlvbkJhbm5lckhlYWRlckNsYXNzLklORk9STUFUSU9OXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGF0IGEgQ2FzZUZpZWxkIGlzIHRvIGJlIGRpc3BsYXllZCB3aXRob3V0IGEgbGFiZWwsIGFzIGlzIGV4cGVjdGVkIGZvciBhbGwgQ29tcG9uZW50TGF1bmNoZXItdHlwZVxuICAgKiBmaWVsZHMuXG4gICAqIEBwYXJhbSBjYXNlRmllbGQgVGhlIGBDYXNlRmllbGRgIGluc3RhbmNlIHRvIGNoZWNrXG4gICAqIEByZXR1cm5zIGB0cnVlYCBpZiBpdCBzaG91bGQgbm90IGhhdmUgYSBsYWJlbDsgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIHB1YmxpYyBpc0ZpZWxkVG9IYXZlTm9MYWJlbChjYXNlRmllbGQ6IENhc2VGaWVsZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjYXNlRmllbGQuZmllbGRfdHlwZS50eXBlID09PSAnQ29tcG9uZW50TGF1bmNoZXInXG4gICAgICAmJiBjYXNlRmllbGQuZGlzcGxheV9jb250ZXh0X3BhcmFtZXRlciA9PT0gJyNBUkdVTUVOVChDYXNlRmlsZVZpZXcpJztcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICAvLyBDbG9uZSBhbmQgc29ydCB0YWJzIGFycmF5XG4gICAgdGhpcy5zb3J0ZWRUYWJzID0gdGhpcy5vcmRlclNlcnZpY2Uuc29ydCh0aGlzLmNhc2VEZXRhaWxzLnRhYnMpO1xuICAgIHRoaXMuY2FzZUZpZWxkcyA9IHRoaXMuZ2V0VGFiRmllbGRzKCk7XG4gICAgdGhpcy5zb3J0ZWRUYWJzID0gdGhpcy5zb3J0VGFiRmllbGRzQW5kRmlsdGVyVGFicyh0aGlzLnNvcnRlZFRhYnMpO1xuICAgIHRoaXMuZm9ybUdyb3VwID0gdGhpcy5idWlsZEZvcm1Hcm91cCh0aGlzLmNhc2VGaWVsZHMpO1xuXG4gICAgaWYgKHRoaXMuY2FzZURldGFpbHMudHJpZ2dlcnMgJiYgdGhpcy5lcnJvcikge1xuICAgICAgdGhpcy5yZXNldEVycm9ycygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc29ydFRhYkZpZWxkc0FuZEZpbHRlclRhYnModGFiczogQ2FzZVRhYltdKTogQ2FzZVRhYltdIHtcbiAgICByZXR1cm4gdGFic1xuICAgICAgLm1hcCh0YWIgPT4gT2JqZWN0LmFzc2lnbih7fSwgdGFiLCB7IGZpZWxkczogdGhpcy5vcmRlclNlcnZpY2Uuc29ydCh0YWIuZmllbGRzKSB9KSlcbiAgICAgIC5maWx0ZXIodGFiID0+IFNob3dDb25kaXRpb24uZ2V0SW5zdGFuY2UodGFiLnNob3dfY29uZGl0aW9uKS5tYXRjaEJ5Q29udGV4dEZpZWxkcyh0aGlzLmNhc2VGaWVsZHMpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGFiRmllbGRzKCk6IENhc2VGaWVsZFtdIHtcbiAgICBjb25zdCBjYXNlRGF0YUZpZWxkcyA9IHRoaXMuc29ydGVkVGFicy5yZWR1Y2UoKGFjYywgdGFiKSA9PiB7XG4gICAgICByZXR1cm4gYWNjLmNvbmNhdChwbGFpblRvQ2xhc3MoQ2FzZUZpZWxkLCB0YWIuZmllbGRzKSk7XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIGNhc2VEYXRhRmllbGRzLmNvbmNhdCh0aGlzLmNhc2VEZXRhaWxzLm1ldGFkYXRhRmllbGRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgRVVJLTM4MjU6XG4gICAqIEJ1aWxkcyBhIFVudHlwZWRGb3JtR3JvdXAgZnJvbSBhbGwgdGhlIENhc2VGaWVsZHMgY29udGFpbmVkIHdpdGhpbiB0aGUgdmlldy5cbiAgICogVGhpcyBVbnR5cGVkRm9ybUdyb3VwIGlzIG5lY2Vzc2FyeSBmb3IgZXZhbHVhdGlvbiB0aGUgc2hvdy9oaWRlIGNvbmRpdGlvbnMgb2ZcbiAgICogZmllbGRzIHRoYXQgYXJlIGRlcGVuZGVudCBvbiBhIGZpZWxkIG9ubHkgYXZhaWxhYmxlIG9uIGEgRElGRkVSRU5UIHRhYi5cbiAgICovXG4gIHByaXZhdGUgYnVpbGRGb3JtR3JvdXAoY2FzZUZpZWxkczogQ2FzZUZpZWxkW10pOiBVbnR5cGVkRm9ybUdyb3VwIHtcbiAgICBsZXQgdmFsdWU6IG9iamVjdCA9IHt9O1xuICAgIGlmIChjYXNlRmllbGRzKSB7XG4gICAgICBjYXNlRmllbGRzLmZvckVhY2goY2FzZUZpZWxkID0+IHtcbiAgICAgICAgdmFsdWUgPSB7XG4gICAgICAgICAgLi4udmFsdWUsXG4gICAgICAgICAgW2Nhc2VGaWVsZC5pZF06IGNhc2VGaWVsZC52YWx1ZVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgVW50eXBlZEZvcm1Hcm91cCh7IGRhdGE6IG5ldyBGb3JtQ29udHJvbCh2YWx1ZSkgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RXJyb3JzKCk6IHZvaWQge1xuICAgIHRoaXMuZXJyb3IgPSBudWxsO1xuICAgIHRoaXMuY2FsbGJhY2tFcnJvcnNTdWJqZWN0Lm5leHQobnVsbCk7XG4gICAgdGhpcy5hbGVydFNlcnZpY2UuY2xlYXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VXJsRnJhZ21lbnQodXJsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdXJsLnNwbGl0KCcjJylbdXJsLnNwbGl0KCcjJykubGVuZ3RoIC0gMV07XG4gIH1cblxuICBwcml2YXRlIGdldFRhYkluZGV4QnlUYWJMYWJlbCh0YWJHcm91cDogTWF0VGFiR3JvdXAsIHRhYkxhYmVsKSB7XG4gICAgcmV0dXJuIHRhYkdyb3VwLl90YWJzLnRvQXJyYXkoKS5maW5kSW5kZXgoKHQpID0+IHQudGV4dExhYmVsLnRvTG93ZXJDYXNlKCkgPT09IHRhYkxhYmVsLnRvTG93ZXJDYXNlKCkpO1xuICB9XG5cbn1cbiIsIjwhLS0gR2VuZXJpYyBlcnJvciBoZWFkaW5nIGFuZCBlcnJvciBtZXNzYWdlIHRvIGJlIGRpc3BsYXllZCBvbmx5IGlmIHRoZXJlIGFyZSBubyBzcGVjaWZpYyBjYWxsYmFjayBlcnJvcnMgb3Igd2FybmluZ3MsIG9yIG5vIGVycm9yIGRldGFpbHMgLS0+XG48ZGl2ICpuZ0lmPVwiZXJyb3IgJiYgIShlcnJvci5jYWxsYmFja0Vycm9ycyB8fCBlcnJvci5jYWxsYmFja1dhcm5pbmdzIHx8IGVycm9yLmRldGFpbHMpXCIgY2xhc3M9XCJlcnJvci1zdW1tYXJ5XCJcbiAgICAgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZWRpdC1jYXNlLWV2ZW50X2Vycm9yLXN1bW1hcnktaGVhZGluZ1wiIHRhYmluZGV4PVwiLTFcIj5cbiAgPGgxIGNsYXNzPVwiaGVhZGluZy1oMSBlcnJvci1zdW1tYXJ5LWhlYWRpbmdcIiBpZD1cImVkaXQtY2FzZS1ldmVudF9lcnJvci1zdW1tYXJ5LWhlYWRpbmdcIj5cbiAgICB7eydTb21ldGhpbmcgd2VudCB3cm9uZycgfCBycHhUcmFuc2xhdGV9fVxuICA8L2gxPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fYm9keVwiIGlkPVwiZWRpdC1jYXNlLWV2ZW50X2Vycm9yLXN1bW1hcnktYm9keVwiPlxuICAgIDxwPnt7XCJXZSdyZSB3b3JraW5nIHRvIGZpeCB0aGUgcHJvYmxlbS4gVHJ5IGFnYWluIHNob3J0bHkuXCIgfCBycHhUcmFuc2xhdGV9fTwvcD5cbiAgICA8cD5cbiAgICAgIDxhIGhyZWY9XCJnZXQtaGVscFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICB7e1wiQ29udGFjdCB1c1wiIHwgcnB4VHJhbnNsYXRlfX08L2E+IHt7XCJpZiB5b3UncmUgc3RpbGwgaGF2aW5nIHByb2JsZW1zLlwiIHwgcnB4VHJhbnNsYXRlfX1cbiAgICA8L3A+XG4gIDwvZGl2PlxuPC9kaXY+XG48IS0tIENhbGxiYWNrIGVycm9yIGhlYWRpbmcgYW5kIGVycm9yIG1lc3NhZ2UgdG8gYmUgZGlzcGxheWVkIGlmIHRoZXJlIGFyZSBzcGVjaWZpYyBlcnJvciBkZXRhaWxzIC0tPlxuPGRpdiAqbmdJZj1cImVycm9yICYmIGVycm9yLmRldGFpbHNcIiBjbGFzcz1cImVycm9yLXN1bW1hcnlcIiByb2xlPVwiZ3JvdXBcIlxuICAgICBhcmlhLWxhYmVsbGVkYnk9XCJlZGl0LWNhc2UtZXZlbnRfZXJyb3Itc3VtbWFyeS1oZWFkaW5nXCIgdGFiaW5kZXg9XCItMVwiPlxuICA8aDIgY2xhc3M9XCJoZWFkaW5nLWgyIGVycm9yLXN1bW1hcnktaGVhZGluZ1wiIGlkPVwiZWRpdC1jYXNlLWV2ZW50X2Vycm9yLXN1bW1hcnktaGVhZGluZ1wiPlxuICAgIHt7J1RoZSBjYWxsYmFjayBkYXRhIGZhaWxlZCB2YWxpZGF0aW9uJyB8IHJweFRyYW5zbGF0ZX19XG4gIDwvaDI+XG4gIDxwPnt7ZXJyb3IubWVzc2FnZSB8IHJweFRyYW5zbGF0ZX19PC9wPlxuICA8dWwgKm5nSWY9XCJlcnJvci5kZXRhaWxzPy5maWVsZF9lcnJvcnNcIiBjbGFzcz1cImVycm9yLXN1bW1hcnktbGlzdFwiPlxuICAgIDxsaSAqbmdGb3I9XCJsZXQgZmllbGRFcnJvciBvZiBlcnJvci5kZXRhaWxzLmZpZWxkX2Vycm9yc1wiPlxuICAgICAge3tmaWVsZEVycm9yLm1lc3NhZ2UgfCBycHhUcmFuc2xhdGV9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L2Rpdj5cbjxjY2QtY2FsbGJhY2stZXJyb3JzXG4gIFt0cmlnZ2VyVGV4dENvbnRpbnVlXT1cInRyaWdnZXJUZXh0U3RhcnRcIlxuICBbdHJpZ2dlclRleHRJZ25vcmVdPVwidHJpZ2dlclRleHRJZ25vcmVXYXJuaW5nc1wiXG4gIFtjYWxsYmFja0Vycm9yc1N1YmplY3RdPVwiY2FsbGJhY2tFcnJvcnNTdWJqZWN0XCJcbiAgKGNhbGxiYWNrRXJyb3JzQ29udGV4dCk9XCJjYWxsYmFja0Vycm9yc05vdGlmeSgkZXZlbnQpXCI+XG48L2NjZC1jYWxsYmFjay1lcnJvcnM+XG48Y2NkLWFjdGl2aXR5IFtjYXNlSWRdPVwiY2FzZURldGFpbHMuY2FzZV9pZFwiIFtkaXNwbGF5TW9kZV09XCJCQU5ORVJcIj48L2NjZC1hY3Rpdml0eT5cbjxkaXYgY2xhc3M9XCJncmlkLXJvd1wiPlxuICA8ZGl2IGNsYXNzPVwiY29sdW1uLW9uZS1oYWxmXCI+XG4gICAgPGNjZC1jYXNlLWhlYWRlciBbY2FzZURldGFpbHNdPVwiY2FzZURldGFpbHNcIj48L2NjZC1jYXNlLWhlYWRlcj5cbiAgICA8ZGl2IGNsYXNzPVwiY2FzZS12aWV3ZXItY29udHJvbHNcIiAqbmdJZj1cImhhc1ByaW50ICYmICFpc0RyYWZ0KCkgJiYgaXNQcmludEVuYWJsZWQoKVwiPlxuICAgICAgPGEgaWQ9XCJjYXNlLXZpZXdlci1jb250cm9sLXByaW50XCIgcm91dGVyTGluaz1cInByaW50XCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLXNlY29uZGFyeVwiPnt7J1ByaW50JyB8IHJweFRyYW5zbGF0ZX19PC9hPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cImhhc0V2ZW50U2VsZWN0b3JcIiBjbGFzcz1cImNvbHVtbi1vbmUtaGFsZlwiPlxuICAgIDxjY2QtZXZlbnQtdHJpZ2dlciBbaXNEaXNhYmxlZF09XCJpc1RyaWdnZXJCdXR0b25EaXNhYmxlZCgpXCIgW3RyaWdnZXJzXT1cImNhc2VEZXRhaWxzLnRyaWdnZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3RyaWdnZXJUZXh0XT1cInRyaWdnZXJUZXh0XCIgKG9uVHJpZ2dlckNoYW5nZSk9XCJjbGVhckVycm9yc0FuZFdhcm5pbmdzKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAob25UcmlnZ2VyU3VibWl0KT1cImFwcGx5VHJpZ2dlcigkZXZlbnQpXCI+PC9jY2QtZXZlbnQtdHJpZ2dlcj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJncmlkLXJvd1wiICpuZ0lmPVwiYWN0aXZlQ2FzZUZsYWdzXCI+XG4gIDxkaXYgY2xhc3M9XCJjb2x1bW4tZnVsbFwiPlxuICAgIDxjY2Qtbm90aWZpY2F0aW9uLWJhbm5lciBbbm90aWZpY2F0aW9uQmFubmVyQ29uZmlnXT1cIm5vdGlmaWNhdGlvbkJhbm5lckNvbmZpZ1wiIChsaW5rQ2xpY2tlZCk9XCJvbkxpbmtDbGlja2VkKCRldmVudClcIj5cbiAgICA8L2NjZC1ub3RpZmljYXRpb24tYmFubmVyPlxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImdyaWQtcm93XCI+XG4gIDxkaXYgY2xhc3M9XCJjb2x1bW4tZnVsbFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNUYWJzUHJlc2VudCgpXCI+XG4gICAgICA8bWF0LXRhYi1ncm91cCAjdGFiR3JvdXAgYW5pbWF0aW9uRHVyYXRpb249XCIwbXNcIiAoc2VsZWN0ZWRJbmRleENoYW5nZSk9XCJ0YWJDaGFuZ2VkKCRldmVudClcIiBbZGlzYWJsZVJpcHBsZV09XCJ0cnVlXCJcbiAgICAgICAgW3NlbGVjdGVkSW5kZXhdPVwic2VsZWN0ZWRUYWJJbmRleFwiPlxuICAgICAgICA8bWF0LXRhYiAqbmdGb3I9XCJsZXQgdGFiIG9mIHByZXBlbmRlZFRhYnNcIiBbaWRdPVwidGFiLmlkXCIgW2xhYmVsXT1cInRhYi5sYWJlbCB8IHJweFRyYW5zbGF0ZVwiPlxuICAgICAgICA8L21hdC10YWI+XG4gICAgICAgIDxtYXQtdGFiICpuZ0Zvcj1cImxldCB0YWIgb2Ygc29ydGVkVGFiczsgbGV0IGN1cklkeD1pbmRleFwiIFtpZF09XCJ0YWIuaWRcIiBbbGFiZWxdPVwidGFiLmxhYmVsIHwgcnB4VHJhbnNsYXRlXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIG1hdFRhYkNvbnRlbnQ+XG4gICAgICAgICAgICA8dGFibGUgW2NsYXNzXT1cInRhYi5pZFwiIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2Nhc2Ugdmlld2VyIHRhYmxlJyB8IHJweFRyYW5zbGF0ZVwiPlxuICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpZWxkIG9mIHRhYiB8IGNjZFRhYkZpZWxkcyB8IGNjZFJlYWRGaWVsZHNGaWx0ZXI6ZmFsc2UgOnVuZGVmaW5lZCA6dHJ1ZSA6IGZvcm1Hcm91cC5jb250cm9sc1snZGF0YSddXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjY2RMYWJlbFN1YnN0aXR1dG9yIFtjYXNlRmllbGRdPVwiZmllbGRcIiBbY29udGV4dEZpZWxkc109XCJjYXNlRmllbGRzXCIgW2hpZGRlbl09XCJmaWVsZC5oaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIiEoZmllbGQgfCBjY2RJc0NvbXBvdW5kKVwiPlxuICAgICAgICAgICAgICAgICAgICA8dHIgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggaWQ9XCJjYXNlLXZpZXdlci1maWVsZC1sYWJlbFwiICpuZ0lmPVwiIWlzRmllbGRUb0hhdmVOb0xhYmVsKGZpZWxkKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhc2Utdmlld2VyLWxhYmVsIHRleHQtMTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3tmaWVsZC5sYWJlbCB8IHJweFRyYW5zbGF0ZX19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgW2lkXT1cIidjYXNlLXZpZXdlci1maWVsZC1yZWFkLS0nICsgZmllbGQuaWRcIiBzY29wZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxjY2QtZmllbGQtcmVhZCBbdG9wTGV2ZWxGb3JtR3JvdXBdPVwiZm9ybUdyb3VwLmNvbnRyb2xzWydkYXRhJ11cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Nhc2VGaWVsZF09XCJmaWVsZFwiIFtjYXNlUmVmZXJlbmNlXT1cImNhc2VEZXRhaWxzLmNhc2VfaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21hcmtkb3duVXNlSHJlZkFzUm91dGVyTGlua109XCJtYXJrZG93blVzZUhyZWZBc1JvdXRlckxpbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9jY2QtZmllbGQtcmVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8dHIgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCIgY2xhc3M9XCJjb21wb3VuZC1maWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDx0aCBbaWRdPVwiJ2Nhc2Utdmlld2VyLWZpZWxkLXJlYWQtLScgKyBmaWVsZC5pZFwiIHNjb3BlPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtMTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGNjZC1maWVsZC1yZWFkIFt0b3BMZXZlbEZvcm1Hcm91cF09XCJmb3JtR3JvdXAuY29udHJvbHNbJ2RhdGEnXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2FzZUZpZWxkXT1cImZpZWxkXCIgW2Nhc2VSZWZlcmVuY2VdPVwiY2FzZURldGFpbHMuY2FzZV9pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWFya2Rvd25Vc2VIcmVmQXNSb3V0ZXJMaW5rXT1cIm1hcmtkb3duVXNlSHJlZkFzUm91dGVyTGlua1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2NjZC1maWVsZC1yZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbWF0LXRhYj5cbiAgICAgICAgPG1hdC10YWIgKm5nRm9yPVwibGV0IHRhYiBvZiBhcHBlbmRlZFRhYnNcIiBbaWRdPVwidGFiLmlkXCIgW2xhYmVsXT1cInRhYi5sYWJlbCB8IHJweFRyYW5zbGF0ZVwiPlxuICAgICAgICA8L21hdC10YWI+XG4gICAgICA8L21hdC10YWItZ3JvdXA+XG4gICAgICA8cm91dGVyLW91dGxldCAqbmdJZj1cIihwcmVwZW5kZWRUYWJzICYmIHByZXBlbmRlZFRhYnMubGVuZ3RoKSB8fCAoYXBwZW5kZWRUYWJzICYmIGFwcGVuZGVkVGFicy5sZW5ndGgpXCI+PC9yb3V0ZXItb3V0bGV0PlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19