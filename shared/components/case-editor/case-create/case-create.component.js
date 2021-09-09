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
var CaseCreateComponent = /** @class */ (function () {
    function CaseCreateComponent(casesService, alertService, draftService, eventTriggerService) {
        this.casesService = casesService;
        this.alertService = alertService;
        this.draftService = draftService;
        this.eventTriggerService = eventTriggerService;
        this.cancelled = new core_1.EventEmitter();
        this.submitted = new core_1.EventEmitter();
    }
    CaseCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.casesService.getEventTrigger(this.caseType, this.event).toPromise()
            .then(function (eventTrigger) {
            _this.eventTrigger = eventTrigger;
            _this.eventTriggerService.announceEventTrigger(eventTrigger);
        })
            .catch(function (error) {
            _this.alertService.error(error.message);
            return rxjs_1.throwError(error);
        });
    };
    CaseCreateComponent.prototype.submit = function () {
        var _this = this;
        return function (sanitizedEditForm) {
            sanitizedEditForm.draft_id = _this.eventTrigger.case_id;
            return _this.casesService.createCase(_this.caseType, sanitizedEditForm);
        };
    };
    CaseCreateComponent.prototype.validate = function () {
        var _this = this;
        return function (sanitizedEditForm, pageId) { return _this.casesService
            .validateCase(_this.caseType, sanitizedEditForm, pageId); };
    };
    CaseCreateComponent.prototype.saveDraft = function () {
        var _this = this;
        if (this.eventTrigger.can_save_draft) {
            return function (caseEventData) { return _this.draftService.createOrUpdateDraft(_this.caseType, _this.eventTrigger.case_id, caseEventData); };
        }
    };
    CaseCreateComponent.prototype.emitCancelled = function (event) {
        this.cancelled.emit(event);
    };
    CaseCreateComponent.prototype.emitSubmitted = function (event) {
        this.submitted.emit(event);
    };
    CaseCreateComponent.prototype.isDataLoaded = function () {
        return this.eventTrigger ? true : false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CaseCreateComponent.prototype, "jurisdiction", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CaseCreateComponent.prototype, "caseType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CaseCreateComponent.prototype, "event", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CaseCreateComponent.prototype, "cancelled", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CaseCreateComponent.prototype, "submitted", void 0);
    CaseCreateComponent = __decorate([
        core_1.Component({
            selector: 'ccd-case-create',
            template: "\n    <div *ngIf=\"isDataLoaded()\">\n        <ccd-case-edit [submit]=\"submit()\"\n                       [validate]=\"validate()\"\n                       [saveDraft]=\"saveDraft()\"\n                       [eventTrigger]=\"eventTrigger\"\n                       (cancelled)=\"emitCancelled($event)\"\n                       (submitted)=\"emitSubmitted($event)\"></ccd-case-edit>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [services_2.CasesService,
            services_1.AlertService,
            services_1.DraftService,
            services_2.EventTriggerService])
    ], CaseCreateComponent);
    return CaseCreateComponent;
}());
exports.CaseCreateComponent = CaseCreateComponent;
//# sourceMappingURL=case-create.component.js.map