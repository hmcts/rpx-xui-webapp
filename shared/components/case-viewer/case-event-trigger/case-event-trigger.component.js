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
var router_1 = require("@angular/router");
var domain_1 = require("../../../domain");
var pipes_1 = require("../../../pipes");
var services_1 = require("../../../services");
var case_editor_1 = require("../../case-editor");
var CaseEventTriggerComponent = /** @class */ (function () {
    function CaseEventTriggerComponent(ngZone, casesService, caseNotifier, router, alertService, route, caseReferencePipe, activityPollingService) {
        this.ngZone = ngZone;
        this.casesService = casesService;
        this.caseNotifier = caseNotifier;
        this.router = router;
        this.alertService = alertService;
        this.route = route;
        this.caseReferencePipe = caseReferencePipe;
        this.activityPollingService = activityPollingService;
        this.BANNER = domain_1.DisplayMode.BANNER;
    }
    CaseEventTriggerComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.route.snapshot.data.case) {
            this.caseDetails = this.route.snapshot.data.case;
        }
        else {
            this.caseSubscription = this.caseNotifier.caseView.subscribe(function (caseDetails) {
                _this.caseDetails = caseDetails;
            });
        }
        this.eventTrigger = this.route.snapshot.data.eventTrigger;
        if (this.activityPollingService.isEnabled) {
            this.ngZone.runOutsideAngular(function () {
                _this.activitySubscription = _this.postEditActivity().subscribe(function (_resolved) {
                    // console.log('Posted EDIT activity and result is: ' + JSON.stringify(_resolved));
                });
            });
        }
        this.route.parent.url.subscribe(function (path) {
            _this.parentUrl = "/" + path.join('/');
        });
    };
    CaseEventTriggerComponent.prototype.ngOnDestroy = function () {
        if (this.activityPollingService.isEnabled) {
            this.activitySubscription.unsubscribe();
        }
        if (!this.route.snapshot.data.case) {
            this.caseSubscription.unsubscribe();
        }
    };
    CaseEventTriggerComponent.prototype.postEditActivity = function () {
        return this.activityPollingService.postEditActivity(this.caseDetails.case_id);
    };
    CaseEventTriggerComponent.prototype.submit = function () {
        var _this = this;
        return function (sanitizedEditForm) {
            return _this.casesService.createEvent(_this.caseDetails, sanitizedEditForm);
        };
    };
    CaseEventTriggerComponent.prototype.validate = function () {
        var _this = this;
        return function (sanitizedEditForm, pageId) { return _this.casesService.validateCase(_this.caseDetails.case_type.id, sanitizedEditForm, pageId); };
    };
    CaseEventTriggerComponent.prototype.submitted = function (event) {
        var _this = this;
        var eventStatus = event['status'];
        this.router
            .navigate([this.parentUrl])
            .then(function () {
            var caseReference = _this.caseReferencePipe.transform(_this.caseDetails.case_id.toString());
            if (services_1.EventStatusService.isIncomplete(eventStatus)) {
                _this.alertService.warning("Case #" + caseReference + " has been updated with event: " + _this.eventTrigger.name + " "
                    + "but the callback service cannot be completed");
            }
            else {
                _this.alertService.success("Case #" + caseReference + " has been updated with event: " + _this.eventTrigger.name);
            }
        });
    };
    CaseEventTriggerComponent.prototype.cancel = function () {
        return this.router.navigate([this.parentUrl]);
    };
    CaseEventTriggerComponent.prototype.isDataLoaded = function () {
        return !!(this.eventTrigger && this.caseDetails);
    };
    CaseEventTriggerComponent = __decorate([
        core_1.Component({
            selector: 'ccd-case-event-trigger',
            template: "\n    <div *ngIf=\"isDataLoaded()\" class=\"screen-990\">\n      <ccd-activity [caseId]=\"caseDetails.case_id\" [displayMode]=\"BANNER\"></ccd-activity>\n      <ccd-case-edit [caseDetails]=\"caseDetails\"\n                     [submit]=\"submit()\"\n                     [validate]=\"validate()\"\n                     [eventTrigger]=\"eventTrigger\"\n                     (cancelled)=\"cancel()\"\n                     (submitted)=\"submitted($event)\"></ccd-case-edit>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.NgZone,
            case_editor_1.CasesService,
            case_editor_1.CaseNotifier,
            router_1.Router,
            services_1.AlertService,
            router_1.ActivatedRoute,
            pipes_1.CaseReferencePipe,
            services_1.ActivityPollingService])
    ], CaseEventTriggerComponent);
    return CaseEventTriggerComponent;
}());
exports.CaseEventTriggerComponent = CaseEventTriggerComponent;
//# sourceMappingURL=case-event-trigger.component.js.map