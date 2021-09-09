"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var router_1 = require("@angular/router");
var class_transformer_1 = require("class-transformer");
var Subject_1 = require("rxjs/Subject");
var dialogs_1 = require("../../components/dialogs");
var domain_1 = require("../../directives/conditional-show/domain");
var domain_2 = require("../../domain");
var services_1 = require("../../services");
var case_editor_1 = require("../case-editor");
var CaseViewerComponent = /** @class */ (function () {
    function CaseViewerComponent(ngZone, route, navigationNotifierService, orderService, activityPollingService, dialog, alertService, draftService, caseNotifier, errorNotifierService, location) {
        this.ngZone = ngZone;
        this.route = route;
        this.navigationNotifierService = navigationNotifierService;
        this.orderService = orderService;
        this.activityPollingService = activityPollingService;
        this.dialog = dialog;
        this.alertService = alertService;
        this.draftService = draftService;
        this.caseNotifier = caseNotifier;
        this.errorNotifierService = errorNotifierService;
        this.location = location;
        this.hasPrint = true;
        this.hasEventSelector = true;
        this.BANNER = domain_2.DisplayMode.BANNER;
        this.triggerTextStart = CaseViewerComponent_1.TRIGGER_TEXT_START;
        this.triggerTextIgnoreWarnings = CaseViewerComponent_1.TRIGGER_TEXT_CONTINUE;
        this.triggerText = CaseViewerComponent_1.TRIGGER_TEXT_START;
        this.ignoreWarning = false;
        this.callbackErrorsSubject = new Subject_1.Subject();
    }
    CaseViewerComponent_1 = CaseViewerComponent;
    CaseViewerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initDialog();
        if (!this.route.snapshot.data.case) {
            this.caseSubscription = this.caseNotifier.caseView.subscribe(function (caseDetails) {
                _this.caseDetails = caseDetails;
                _this.init();
            });
        }
        else {
            this.caseDetails = this.route.snapshot.data.case;
            this.init();
        }
        this.callbackErrorsSubject.subscribe(function (errorEvent) {
            _this.error = errorEvent;
        });
        this.errorSubscription = this.errorNotifierService.error.subscribe(function (error) {
            if (error && error.status !== 401 && error.status !== 403) {
                _this.error = error;
                _this.callbackErrorsSubject.next(_this.error);
            }
        });
    };
    CaseViewerComponent.prototype.isPrintEnabled = function () {
        return this.caseDetails.case_type.printEnabled;
    };
    CaseViewerComponent.prototype.ngOnDestroy = function () {
        if (this.activityPollingService.isEnabled) {
            this.activitySubscription.unsubscribe();
        }
        this.callbackErrorsSubject.unsubscribe();
        if (!this.route.snapshot.data.case) {
            this.caseSubscription.unsubscribe();
        }
        if (!!this.errorSubscription) {
            this.errorSubscription.unsubscribe();
        }
    };
    CaseViewerComponent.prototype.postViewActivity = function () {
        return this.activityPollingService.postViewActivity(this.caseDetails.case_id);
    };
    CaseViewerComponent.prototype.clearErrorsAndWarnings = function () {
        this.resetErrors();
        this.ignoreWarning = false;
        this.triggerText = CaseViewerComponent_1.TRIGGER_TEXT_START;
    };
    CaseViewerComponent.prototype.applyTrigger = function (trigger) {
        var _this = this;
        this.error = null;
        var theQueryParams = {};
        if (this.ignoreWarning) {
            theQueryParams['ignoreWarning'] = this.ignoreWarning;
        }
        // we may need to take care of different triggers in the future
        if (trigger.id === domain_2.CaseViewTrigger.DELETE) {
            var dialogRef = this.dialog.open(dialogs_1.DeleteOrCancelDialogComponent, this.dialogConfig);
            dialogRef.afterClosed().subscribe(function (result) {
                if (result === 'Delete') {
                    _this.draftService.deleteDraft(_this.caseDetails.case_id)
                        .subscribe(function (_) {
                        _this.navigationNotifierService.announceNavigation({ action: services_1.NavigationOrigin.DRAFT_DELETED });
                    }, function (_) {
                        _this.navigationNotifierService.announceNavigation({ action: services_1.NavigationOrigin.ERROR_DELETING_DRAFT });
                    });
                }
            });
        }
        else if (this.isDraft() && trigger.id !== domain_2.CaseViewTrigger.DELETE) {
            theQueryParams[domain_2.DRAFT_QUERY_PARAM] = this.caseDetails.case_id;
            theQueryParams[CaseViewerComponent_1.ORIGIN_QUERY_PARAM] = 'viewDraft';
            this.navigationNotifierService.announceNavigation({
                action: services_1.NavigationOrigin.DRAFT_RESUMED,
                jid: this.caseDetails.case_type.jurisdiction.id,
                ctid: this.caseDetails.case_type.id,
                etid: trigger.id,
                queryParams: theQueryParams
            });
        }
        else {
            this.navigationNotifierService.announceNavigation({
                action: services_1.NavigationOrigin.EVENT_TRIGGERED,
                queryParams: theQueryParams,
                etid: trigger.id,
                relativeTo: this.route
            });
        }
    };
    CaseViewerComponent.prototype.isDataLoaded = function () {
        return !!this.caseDetails;
    };
    CaseViewerComponent.prototype.hasTabsPresent = function () {
        return this.sortedTabs.length > 0;
    };
    CaseViewerComponent.prototype.callbackErrorsNotify = function (callbackErrorsContext) {
        this.ignoreWarning = callbackErrorsContext.ignore_warning;
        this.triggerText = callbackErrorsContext.trigger_text;
    };
    CaseViewerComponent.prototype.isDraft = function () {
        return domain_2.Draft.isDraft(this.caseDetails.case_id);
    };
    CaseViewerComponent.prototype.isTriggerButtonDisabled = function () {
        return (this.error
            && this.error.callbackErrors
            && this.error.callbackErrors.length)
            || (this.error
                && this.error.details
                && this.error.details.field_errors
                && this.error.details.field_errors.length);
    };
    CaseViewerComponent.prototype.ngAfterViewInit = function () {
        var url = this.location.path(true);
        var hashValue = url.substring(url.indexOf('#') + 1);
        var reguarExp = new RegExp(CaseViewerComponent_1.space, 'g');
        hashValue = hashValue.replace(reguarExp, ' ');
        var matTab = this.tabGroup._tabs.find(function (x) { return x.textLabel === hashValue; });
        if (matTab && matTab.position) {
            this.tabGroup.selectedIndex = matTab.position;
        }
    };
    CaseViewerComponent.prototype.tabChanged = function (tabChangeEvent) {
        window.location.hash = tabChangeEvent.tab.textLabel;
    };
    CaseViewerComponent.prototype.init = function () {
        var _this = this;
        // Clone and sort tabs array
        this.sortedTabs = this.orderService.sort(this.caseDetails.tabs);
        this.caseFields = this.getTabFields();
        this.sortedTabs = this.sortTabFieldsAndFilterTabs(this.sortedTabs);
        this.formGroup = this.buildFormGroup(this.caseFields);
        if (this.activityPollingService.isEnabled) {
            this.ngZone.runOutsideAngular(function () {
                _this.activitySubscription = _this.postViewActivity().subscribe(function (_resolved) {
                    // console.log('Posted VIEW activity and result is: ' + JSON.stringify(_resolved));
                });
            });
        }
        if (this.caseDetails.triggers && this.error) {
            this.resetErrors();
        }
    };
    CaseViewerComponent.prototype.sortTabFieldsAndFilterTabs = function (tabs) {
        var _this = this;
        return tabs
            .map(function (tab) { return Object.assign({}, tab, { fields: _this.orderService.sort(tab.fields) }); })
            .filter(function (tab) { return domain_1.ShowCondition.getInstance(tab.show_condition).matchByContextFields(_this.caseFields); });
    };
    CaseViewerComponent.prototype.getTabFields = function () {
        var caseDataFields = this.sortedTabs.reduce(function (acc, tab) {
            return acc.concat(class_transformer_1.plainToClass(domain_2.CaseField, tab.fields));
        }, []);
        return caseDataFields.concat(this.caseDetails.metadataFields);
    };
    /**
     * For EUI-3825:
     * Builds a FormGroup from all the CaseFields contained within the view.
     * This FormGroup is necessary for evaluation the show/hide conditions of
     * fields that are dependent on a field only available on a DIFFERENT tab.
     */
    CaseViewerComponent.prototype.buildFormGroup = function (caseFields) {
        var value = {};
        if (caseFields) {
            caseFields.forEach(function (caseField) {
                var _a;
                value = __assign({}, value, (_a = {}, _a[caseField.id] = caseField.value, _a));
            });
        }
        return new forms_1.FormGroup({ data: new forms_1.FormControl(value) });
    };
    CaseViewerComponent.prototype.initDialog = function () {
        this.dialogConfig = new material_1.MatDialogConfig();
        this.dialogConfig.disableClose = true;
        this.dialogConfig.autoFocus = true;
        this.dialogConfig.ariaLabel = 'Label';
        this.dialogConfig.height = '245px';
        this.dialogConfig.width = '550px';
        this.dialogConfig.panelClass = 'dialog';
        this.dialogConfig.closeOnNavigation = false;
        this.dialogConfig.position = {
            top: window.innerHeight / 2 - 120 + 'px', left: window.innerWidth / 2 - 275 + 'px'
        };
    };
    CaseViewerComponent.prototype.resetErrors = function () {
        this.error = null;
        this.callbackErrorsSubject.next(null);
        this.alertService.clear();
    };
    var CaseViewerComponent_1;
    CaseViewerComponent.ORIGIN_QUERY_PARAM = 'origin';
    CaseViewerComponent.TRIGGER_TEXT_START = 'Go';
    CaseViewerComponent.TRIGGER_TEXT_CONTINUE = 'Ignore Warning and Go';
    CaseViewerComponent.space = '%20';
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CaseViewerComponent.prototype, "hasPrint", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CaseViewerComponent.prototype, "hasEventSelector", void 0);
    __decorate([
        core_1.ViewChild('tabGroup'),
        __metadata("design:type", material_1.MatTabGroup)
    ], CaseViewerComponent.prototype, "tabGroup", void 0);
    CaseViewerComponent = CaseViewerComponent_1 = __decorate([
        core_1.Component({
            selector: 'ccd-case-viewer',
            template: "\n    <div *ngIf=\"isDataLoaded()\">\n      <!-- Generic error heading and error message to be displayed only if there are no specific callback errors or warnings, or no error details -->\n      <div *ngIf=\"error && !(error.callbackErrors || error.callbackWarnings || error.details)\" class=\"error-summary\"\n           role=\"group\" aria-labelledby=\"edit-case-event_error-summary-heading\" tabindex=\"-1\">\n        <h1 class=\"heading-h1 error-summary-heading\" id=\"edit-case-event_error-summary-heading\">\n          Something went wrong\n        </h1>\n        <div class=\"govuk-error-summary__body\" id=\"edit-case-event_error-summary-body\">\n          <p>We're working to fix the problem. Try again shortly.</p>\n          <p><a href=\"get-help\" target=\"_blank\">Contact us</a> if you're still having problems.</p>\n        </div>\n      </div>\n      <!-- Callback error heading and error message to be displayed if there are specific error details -->\n      <div *ngIf=\"error && error.details\" class=\"error-summary\" role=\"group\"\n           aria-labelledby=\"edit-case-event_error-summary-heading\" tabindex=\"-1\">\n        <h2 class=\"heading-h2 error-summary-heading\" id=\"edit-case-event_error-summary-heading\">\n          The callback data failed validation\n        </h2>\n        <p>{{error.message}}</p>\n        <ul *ngIf=\"error.details?.field_errors\" class=\"error-summary-list\">\n          <li *ngFor=\"let fieldError of error.details.field_errors\">\n            {{fieldError.message}}\n          </li>\n        </ul>\n      </div>\n      <ccd-callback-errors\n        [triggerTextContinue]=\"triggerTextStart\"\n        [triggerTextIgnore]=\"triggerTextIgnoreWarnings\"\n        [callbackErrorsSubject]=\"callbackErrorsSubject\"\n        (callbackErrorsContext)=\"callbackErrorsNotify($event)\">\n      </ccd-callback-errors>\n      <ccd-activity [caseId]=\"caseDetails.case_id\" [displayMode]=\"BANNER\"></ccd-activity>\n      <div class=\"grid-row\">\n        <div class=\"column-one-half\">\n          <ccd-case-header [caseDetails]=\"caseDetails\"></ccd-case-header>\n          <div class=\"case-viewer-controls\" *ngIf=\"hasPrint && !isDraft() && isPrintEnabled()\">\n            <a id=\"case-viewer-control-print\" routerLink=\"print\" class=\"button button-secondary\">Print</a>\n          </div>\n        </div>\n        <div *ngIf=\"hasEventSelector\" class=\"column-one-half\">\n          <ccd-event-trigger [isDisabled]=\"isTriggerButtonDisabled()\" [triggers]=\"caseDetails.triggers\"\n                             [triggerText]=\"triggerText\" (onTriggerChange)=\"clearErrorsAndWarnings()\"\n                             (onTriggerSubmit)=\"applyTrigger($event)\"></ccd-event-trigger>\n        </div>\n      </div>\n      <div class=\"grid-row\">\n        <div class=\"column-full\">\n          <ng-container *ngIf=\"hasTabsPresent()\">\n            <mat-tab-group #tabGroup animationDuration=\"0ms\" (selectedTabChange)=\"tabChanged($event)\"\n                           [disableRipple]=\"true\">\n              <mat-tab *ngFor=\"let tab of sortedTabs; let curIdx=index\" [id]=\"tab.id\" [label]=\"tab.label\">\n                <ng-template matTabContent>\n                  <table [class]=\"tab.id\">\n                    <tbody>\n                    <ng-container *ngFor=\"let field of tab | ccdTabFields | ccdReadFieldsFilter:false :undefined :true :formGroup.controls['data']\">\n                      <div ccdLabelSubstitutor [caseField]=\"field\" [contextFields]=\"caseFields\" [hidden]=\"field.hidden\">\n                        <ng-container [ngSwitch]=\"!(field | ccdIsCompound)\">\n                          <tr *ngSwitchCase=\"true\">\n                            <th>\n                              <div class=\"case-viewer-label text-16\">{{field.label}}</div>\n                            </th>\n                            <td>\n                              <span class=\"text-16\">\n                                <ccd-field-read [topLevelFormGroup]=\"formGroup.controls['data']\"\n                                  [caseField]=\"field\" [caseReference]=\"caseDetails.case_id\">\n                                </ccd-field-read>\n                              </span>\n                            </td>\n                          </tr>\n                          <tr *ngSwitchCase=\"false\" class=\"compound-field\">\n                            <th>\n                              <span class=\"text-16\">\n                                <ccd-field-read [topLevelFormGroup]=\"formGroup.controls['data']\"\n                                  [caseField]=\"field\" [caseReference]=\"caseDetails.case_id\">\n                                </ccd-field-read>\n                              </span>\n                            </th>\n                          </tr>\n                        </ng-container>\n                      </div>\n                    </ng-container>\n                    </tbody>\n                  </table>\n                </ng-template>\n              </mat-tab>\n            </mat-tab-group>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  ",
            styles: ["\n    th{width:1%;white-space:nowrap;vertical-align:top}.compound-field th{padding:0}.case-viewer-controls{margin-top:47px;margin-bottom:20px}ccd-case-header{float:left;margin-right:10px}ccd-event-trigger{float:right}.case-viewer-label{min-width:300px;white-space:normal}.markdown h3{margin-bottom:0px}\n  "]
        }),
        __metadata("design:paramtypes", [core_1.NgZone,
            router_1.ActivatedRoute,
            services_1.NavigationNotifierService,
            services_1.OrderService,
            services_1.ActivityPollingService,
            material_1.MatDialog,
            services_1.AlertService,
            services_1.DraftService,
            case_editor_1.CaseNotifier,
            services_1.ErrorNotifierService,
            common_1.Location])
    ], CaseViewerComponent);
    return CaseViewerComponent;
}());
exports.CaseViewerComponent = CaseViewerComponent;
//# sourceMappingURL=case-viewer.component.js.map