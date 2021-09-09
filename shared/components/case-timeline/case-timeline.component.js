"use strict";
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
var core_1 = require("@angular/core");
var case_editor_1 = require("../case-editor");
var services_1 = require("../../services");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var CaseTimelineComponent = /** @class */ (function () {
    function CaseTimelineComponent(caseNotifier, casesService, alertService) {
        this.caseNotifier = caseNotifier;
        this.casesService = casesService;
        this.alertService = alertService;
        this.dspMode = CaseTimelineDisplayMode;
        this.displayMode = CaseTimelineDisplayMode.TIMELINE;
    }
    CaseTimelineComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.casesService
            .getCaseViewV2(this.case)
            .pipe(operators_1.map(function (caseView) {
            _this.events = caseView.events;
            _this.caseNotifier.announceCase(caseView);
        }))
            .toPromise()
            .catch(function (error) {
            _this.alertService.error(error.message);
            return rxjs_1.throwError(error);
        });
    };
    CaseTimelineComponent.prototype.isDataLoaded = function () {
        return this.events ? true : false;
    };
    CaseTimelineComponent.prototype.caseHistoryClicked = function (eventId) {
        this.displayMode = CaseTimelineDisplayMode.DETAILS;
        this.selectedEventId = eventId;
    };
    CaseTimelineComponent.prototype.goToCaseTimeline = function () {
        this.displayMode = CaseTimelineDisplayMode.TIMELINE;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CaseTimelineComponent.prototype, "case", void 0);
    CaseTimelineComponent = __decorate([
        core_1.Component({
            selector: 'ccd-case-timeline',
            template: "\n    <div *ngIf=\"isDataLoaded()\">\n        <ng-container [ngSwitch]=\"displayMode\">\n            <ng-container *ngSwitchCase=\"dspMode.TIMELINE\">\n                <ccd-event-log [events]=\"events\" (onCaseHistory)=\"caseHistoryClicked($event)\" *ngIf=\"displayMode === dspMode.TIMELINE\"></ccd-event-log>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"dspMode.DETAILS\">\n                <div class=\"govuk-breadcrumbs\">\n                    <ol class=\"govuk-breadcrumbs__list\">\n                        <li class=\"govuk-breadcrumbs__list-item\">\n                            <a href=\"javascript:void(0)\" (click)=\"goToCaseTimeline()\" class=\"govuk-back-link\">Back to case timeline</a>\n                        </li>\n                    </ol>\n                </div>\n                <ccd-case-history [event]=\"selectedEventId\"></ccd-case-history>\n            </ng-container>\n        </ng-container>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [case_editor_1.CaseNotifier,
            case_editor_1.CasesService,
            services_1.AlertService])
    ], CaseTimelineComponent);
    return CaseTimelineComponent;
}());
exports.CaseTimelineComponent = CaseTimelineComponent;
var CaseTimelineDisplayMode;
(function (CaseTimelineDisplayMode) {
    CaseTimelineDisplayMode[CaseTimelineDisplayMode["TIMELINE"] = 0] = "TIMELINE";
    CaseTimelineDisplayMode[CaseTimelineDisplayMode["DETAILS"] = 1] = "DETAILS";
})(CaseTimelineDisplayMode = exports.CaseTimelineDisplayMode || (exports.CaseTimelineDisplayMode = {}));
//# sourceMappingURL=case-timeline.component.js.map