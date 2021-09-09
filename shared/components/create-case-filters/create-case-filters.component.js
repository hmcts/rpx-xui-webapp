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
var forms_1 = require("@angular/forms");
var access_types_model_1 = require("../../domain/case-view/access-types.model");
var services_1 = require("../../services");
var CreateCaseFiltersComponent = /** @class */ (function () {
    function CreateCaseFiltersComponent(orderService, definitionsService, sessionStorageService) {
        this.orderService = orderService;
        this.definitionsService = definitionsService;
        this.sessionStorageService = sessionStorageService;
        this.selectionSubmitted = new core_1.EventEmitter();
        this.selectionChanged = new core_1.EventEmitter();
        this.formGroup = new forms_1.FormGroup({});
    }
    CreateCaseFiltersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selected = {};
        this.initControls();
        this.definitionsService.getJurisdictions(access_types_model_1.CREATE_ACCESS)
            .subscribe(function (jurisdictions) {
            _this.jurisdictions = jurisdictions;
            _this.selectJurisdiction(_this.jurisdictions, _this.filterJurisdictionControl);
        });
        if (document.getElementById('cc-jurisdiction')) {
            document.getElementById('cc-jurisdiction').focus();
        }
    };
    CreateCaseFiltersComponent.prototype.onJurisdictionIdChange = function () {
        this.resetCaseType();
        this.resetEvent();
        if (this.filterJurisdictionControl.value !== '') {
            this.formGroup.controls['caseType'].enable();
            this.selected.jurisdiction = this.findJurisdiction(this.jurisdictions, this.filterJurisdictionControl.value);
            this.selectedJurisdictionCaseTypes = this.selected.jurisdiction.caseTypes;
            this.selectCaseType(this.selectedJurisdictionCaseTypes, this.filterCaseTypeControl);
        }
    };
    CreateCaseFiltersComponent.prototype.onCaseTypeIdChange = function () {
        this.resetEvent();
        if (this.filterCaseTypeControl.value !== '') {
            this.selected.caseType = this.findCaseType(this.selectedJurisdictionCaseTypes, this.filterCaseTypeControl.value);
            this.formGroup.controls['event'].enable();
            this.selectedCaseTypeEvents = this.sortEvents(this.selected.caseType.events);
            this.selectEvent(this.selectedCaseTypeEvents, this.filterEventControl);
        }
    };
    CreateCaseFiltersComponent.prototype.onEventIdChange = function () {
        this.emitChange();
        if (this.filterEventControl.value !== '') {
            this.selected.event = this.findEvent(this.selectedCaseTypeEvents, this.filterEventControl.value);
        }
        else {
            this.selected.event = null;
        }
    };
    CreateCaseFiltersComponent.prototype.isCreatable = function () {
        return !this.isEmpty(this.selected) &&
            !this.isEmpty(this.selected.jurisdiction) &&
            !this.isEmpty(this.selected.caseType) &&
            !this.isEmpty(this.selected.event) &&
            !this.isDisabled;
    };
    CreateCaseFiltersComponent.prototype.apply = function () {
        this.selectionSubmitted.emit({
            jurisdictionId: this.selected.jurisdiction.id,
            caseTypeId: this.selected.caseType.id,
            eventId: this.selected.event.id
        });
    };
    CreateCaseFiltersComponent.prototype.sortEvents = function (events) {
        return this.orderService.sort(this.retainEventsWithCreateRights(this.retainEventsWithNoPreStates(events)));
    };
    CreateCaseFiltersComponent.prototype.retainEventsWithNoPreStates = function (events) {
        return events.filter(function (event) { return event.pre_states.length === 0; });
    };
    CreateCaseFiltersComponent.prototype.retainEventsWithCreateRights = function (events) {
        var _this = this;
        var userProfile = JSON.parse(this.sessionStorageService.getItem('userDetails'));
        return events.filter(function (event) { return userProfile && userProfile.roles &&
            !!userProfile.roles.find(function (role) { return _this.hasCreateAccess(event, role); }); });
    };
    CreateCaseFiltersComponent.prototype.hasCreateAccess = function (caseEvent, role) {
        return !!caseEvent.acls.find(function (acl) { return acl.role === role && acl.create === true; });
    };
    CreateCaseFiltersComponent.prototype.selectJurisdiction = function (jurisdictions, filterJurisdictionControl) {
        if (jurisdictions.length === 1) {
            filterJurisdictionControl.setValue(jurisdictions[0].id);
            this.onJurisdictionIdChange();
        }
    };
    CreateCaseFiltersComponent.prototype.selectCaseType = function (caseTypes, filterCaseTypeControl) {
        if (caseTypes.length === 1) {
            filterCaseTypeControl.setValue(caseTypes[0].id);
            this.onCaseTypeIdChange();
        }
    };
    CreateCaseFiltersComponent.prototype.selectEvent = function (events, filterEventControl) {
        if (events.length === 1) {
            filterEventControl.setValue(events[0].id);
            this.onEventIdChange();
        }
    };
    CreateCaseFiltersComponent.prototype.findJurisdiction = function (jurisdictions, id) {
        return jurisdictions.find(function (j) { return j.id === id; });
    };
    CreateCaseFiltersComponent.prototype.findCaseType = function (caseTypes, id) {
        return caseTypes.find(function (caseType) { return caseType.id === id; });
    };
    CreateCaseFiltersComponent.prototype.findEvent = function (events, id) {
        return events.find(function (event) { return event.id === id; });
    };
    CreateCaseFiltersComponent.prototype.initControls = function () {
        this.filterJurisdictionControl = new forms_1.FormControl('');
        this.formGroup.addControl('jurisdiction', this.filterJurisdictionControl);
        this.filterCaseTypeControl = new forms_1.FormControl({ value: '', disabled: true });
        this.formGroup.addControl('caseType', this.filterCaseTypeControl);
        this.filterEventControl = new forms_1.FormControl({ value: '', disabled: true });
        this.formGroup.addControl('event', this.filterEventControl);
    };
    CreateCaseFiltersComponent.prototype.resetCaseType = function () {
        this.emitChange();
        this.filterCaseTypeControl.setValue('');
        this.selected.caseType = null;
        this.selectedJurisdictionCaseTypes = [];
        this.formGroup.controls['caseType'].disable();
    };
    CreateCaseFiltersComponent.prototype.resetEvent = function () {
        this.emitChange();
        this.filterEventControl.setValue('');
        this.selected.event = null;
        this.selectedCaseTypeEvents = [];
        this.formGroup.controls['event'].disable();
    };
    CreateCaseFiltersComponent.prototype.emitChange = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.selectionChanged) {
                _this.selectionChanged.emit();
            }
        }, 0);
    };
    CreateCaseFiltersComponent.prototype.isEmpty = function (value) {
        return value === null || value === undefined;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CreateCaseFiltersComponent.prototype, "isDisabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CreateCaseFiltersComponent.prototype, "startButtonText", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CreateCaseFiltersComponent.prototype, "selectionSubmitted", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CreateCaseFiltersComponent.prototype, "selectionChanged", void 0);
    CreateCaseFiltersComponent = __decorate([
        core_1.Component({
            selector: 'ccd-create-case-filters',
            template: "\n    <form  (ngSubmit)=\"apply()\">\n      <div class=\"form-group\">\n        <label class=\"form-label\" for=\"cc-jurisdiction\">Jurisdiction</label>\n        <select class=\"form-control ccd-dropdown\" id=\"cc-jurisdiction\" name=\"jurisdiction\" [formControl]=\"filterJurisdictionControl\" (change)=\"onJurisdictionIdChange()\">\n          <option value=\"\">--Select a value--</option>\n          <option *ngFor=\"let j of jurisdictions\" [value]=\"j.id\">{{j.name}}</option>\n        </select>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"form-label\" for=\"cc-case-type\">Case type</label>\n        <select class=\"form-control ccd-dropdown\" id=\"cc-case-type\" name=\"case-type\" [formControl]=\"filterCaseTypeControl\" (change)=\"onCaseTypeIdChange()\">\n          <option value=\"\">--Select a value--</option>\n          <option *ngFor=\"let ct of selectedJurisdictionCaseTypes\" [value]=\"ct.id\">{{ct.name}}</option>\n        </select>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"form-label\" for=\"cc-event\">Event</label>\n        <select class=\"form-control ccd-dropdown\" id=\"cc-event\" name=\"event\" [formControl]=\"filterEventControl\" (change)=\"onEventIdChange()\">\n          <option value=\"\">--Select a value--</option>\n          <option *ngFor=\"let e of selectedCaseTypeEvents\" [value]=\"e.id\">{{e.name}}</option>\n        </select>\n      </div>\n\n      <button type=\"submit\" class=\"button\" [disabled]=\"!isCreatable()\">{{startButtonText}}</button>\n    </form>\n  "
        }),
        __metadata("design:paramtypes", [services_1.OrderService,
            services_1.DefinitionsService,
            services_1.SessionStorageService])
    ], CreateCaseFiltersComponent);
    return CreateCaseFiltersComponent;
}());
exports.CreateCaseFiltersComponent = CreateCaseFiltersComponent;
//# sourceMappingURL=create-case-filters.component.js.map