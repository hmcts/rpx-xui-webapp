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
var rxjs_1 = require("rxjs");
var services_1 = require("../../../services");
var services_2 = require("../services");
var CaseProgressComponent = /** @class */ (function () {
    function CaseProgressComponent(casesService, alertService, eventTriggerService) {
        this.casesService = casesService;
        this.alertService = alertService;
        this.eventTriggerService = eventTriggerService;
        this.cancelled = new core_1.EventEmitter();
        this.submitted = new core_1.EventEmitter();
    }
    CaseProgressComponent.prototype.ngOnInit = function () {
        var _this = this;
        var caseTypeId = undefined;
        this.casesService.getCaseViewV2(this.case).toPromise()
            .then(function (caseView) { return _this.caseDetails = caseView; })
            .then(function (caseView) { return _this.casesService.getEventTrigger(caseTypeId, _this.event, caseView.case_id)
            .toPromise(); })
            .then(function (eventTrigger) {
            _this.eventTriggerService.announceEventTrigger(eventTrigger);
            _this.eventTrigger = eventTrigger;
        })
            .catch(function (error) {
            _this.alertService.error(error.message);
            return rxjs_1.throwError(error);
        });
    };
    CaseProgressComponent.prototype.submit = function () {
        var _this = this;
        return function (sanitizedEditForm) {
            return _this.casesService.createEvent(_this.caseDetails, sanitizedEditForm);
        };
    };
    CaseProgressComponent.prototype.validate = function () {
        var _this = this;
        return function (sanitizedEditForm, pageId) { return _this.casesService.validateCase(_this.caseDetails.case_type.id, sanitizedEditForm, pageId); };
    };
    CaseProgressComponent.prototype.emitCancelled = function (event) {
        this.cancelled.emit(event);
    };
    CaseProgressComponent.prototype.emitSubmitted = function (event) {
        this.submitted.emit(event);
    };
    CaseProgressComponent.prototype.isDataLoaded = function () {
        return this.eventTrigger && this.caseDetails ? true : false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CaseProgressComponent.prototype, "case", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CaseProgressComponent.prototype, "event", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CaseProgressComponent.prototype, "cancelled", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CaseProgressComponent.prototype, "submitted", void 0);
    CaseProgressComponent = __decorate([
        core_1.Component({
            selector: 'ccd-case-progress',
            template: "\n    <div *ngIf=\"isDataLoaded()\">\n        <ccd-case-edit [submit]=\"submit()\"\n                       [validate]=\"validate()\"\n                       [caseDetails]=\"caseDetails\"\n                       [eventTrigger]=\"eventTrigger\"\n                       (cancelled)=\"emitCancelled($event)\"\n                       (submitted)=\"emitSubmitted($event)\"></ccd-case-edit>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [services_2.CasesService,
            services_1.AlertService,
            services_2.EventTriggerService])
    ], CaseProgressComponent);
    return CaseProgressComponent;
}());
exports.CaseProgressComponent = CaseProgressComponent;
//# sourceMappingURL=case-progress.component.js.map