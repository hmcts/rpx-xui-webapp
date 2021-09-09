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
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/do");
var services_1 = require("../../services");
var FORM_GROUP_VAL_LOC_STORAGE = 'workbasket-filter-form-group-value';
var SAVED_QUERY_PARAM_LOC_STORAGE = 'savedQueryParams';
var WorkbasketFiltersComponent = /** @class */ (function () {
    function WorkbasketFiltersComponent(route, workbasketInputFilterService, orderService, jurisdictionService, alertService, windowService) {
        this.route = route;
        this.workbasketInputFilterService = workbasketInputFilterService;
        this.orderService = orderService;
        this.jurisdictionService = jurisdictionService;
        this.alertService = alertService;
        this.windowService = windowService;
        this.onApply = new core_1.EventEmitter();
        this.onReset = new core_1.EventEmitter();
        this.formGroup = new forms_1.FormGroup({});
        this.initialised = false;
    }
    WorkbasketFiltersComponent_1 = WorkbasketFiltersComponent;
    WorkbasketFiltersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selected = {};
        this.route.queryParams.subscribe(function (params) {
            if (!_this.initialised || !params || !Object.keys(params).length) {
                _this.initFilters(false);
                _this.initialised = true;
            }
        });
    };
    WorkbasketFiltersComponent.prototype.apply = function (init) {
        // Save filters as query parameters for current route
        var queryParams = {};
        if (this.selected.jurisdiction) {
            queryParams[WorkbasketFiltersComponent_1.PARAM_JURISDICTION] = this.selected.jurisdiction.id;
        }
        if (this.selected.caseType) {
            queryParams[WorkbasketFiltersComponent_1.PARAM_CASE_TYPE] = this.selected.caseType.id;
        }
        if (this.selected.caseState) {
            queryParams[WorkbasketFiltersComponent_1.PARAM_CASE_STATE] = this.selected.caseState.id;
        }
        // without explicitly preserving alerts any message on the page
        // would be cleared out because of this initial navigation.
        // The above is only true if no alerts were set prior to loading case list page.
        if (!this.alertService.isPreserveAlerts()) {
            this.alertService.setPreserveAlerts(!this.initialised);
        }
        if (Object.keys(this.formGroup.controls).length === 0) {
            this.selected.formGroup = JSON.parse(localStorage.getItem(FORM_GROUP_VAL_LOC_STORAGE));
        }
        else {
            this.selected.formGroup = this.formGroup;
        }
        this.selected.init = init;
        this.selected.page = 1;
        this.selected.metadataFields = this.getMetadataFields();
        if (init) {
            this.windowService.setLocalStorage(SAVED_QUERY_PARAM_LOC_STORAGE, JSON.stringify(queryParams));
            if (Object.keys(this.formGroup.controls).length > 0) {
                this.windowService.setLocalStorage(FORM_GROUP_VAL_LOC_STORAGE, JSON.stringify(this.formGroup.value));
            }
        }
        // Apply filters
        this.onApply.emit({ selected: this.selected, queryParams: queryParams });
        this.setFocusToTop();
    };
    WorkbasketFiltersComponent.prototype.reset = function () {
        var _this = this;
        this.windowService.removeLocalStorage(FORM_GROUP_VAL_LOC_STORAGE);
        this.windowService.removeLocalStorage(SAVED_QUERY_PARAM_LOC_STORAGE);
        setTimeout(function () {
            _this.resetFieldsWhenNoDefaults();
            _this.onReset.emit(true);
        }, 500);
    };
    WorkbasketFiltersComponent.prototype.getMetadataFields = function () {
        if (this.workbasketInputs) {
            return this.workbasketInputs
                .filter(function (workbasketInput) { return workbasketInput.field.metadata === true; })
                .map(function (workbasketInput) { return workbasketInput.field.id; });
        }
    };
    WorkbasketFiltersComponent.prototype.onJurisdictionIdChange = function () {
        if (this.selected.jurisdiction) {
            this.jurisdictionService.announceSelectedJurisdiction(this.selected.jurisdiction);
            this.selectedJurisdictionCaseTypes = this.selected.jurisdiction.caseTypes.length > 0 ? this.selected.jurisdiction.caseTypes : null;
            // Line was too long for linting so refactored it.
            if (this.workbasketDefaults && this.selectedJurisdictionCaseTypes) {
                this.selected.caseType = this.selectedJurisdictionCaseTypes[0];
            }
            else {
                this.selected.caseType = null;
            }
            this.selected.caseState = null;
            this.clearWorkbasketInputs();
            if (!this.isApplyButtonDisabled()) {
                this.onCaseTypeIdChange();
            }
        }
        else {
            this.resetCaseType();
            this.resetCaseState();
        }
    };
    WorkbasketFiltersComponent.prototype.onCaseTypeIdChange = function () {
        var _this = this;
        if (this.selected.caseType) {
            this.selectedCaseTypeStates = this.sortStates(this.selected.caseType.states);
            this.selected.caseState = null;
            this.formGroup = new forms_1.FormGroup({});
            this.clearWorkbasketInputs();
            if (!this.isApplyButtonDisabled()) {
                this.workbasketInputFilterService.getWorkbasketInputs(this.selected.jurisdiction.id, this.selected.caseType.id)
                    .subscribe(function (workbasketInputs) {
                    _this.workbasketInputsReady = true;
                    _this.workbasketInputs = workbasketInputs
                        .sort(_this.orderService.sortAsc);
                    var formValue = _this.windowService.getLocalStorage(FORM_GROUP_VAL_LOC_STORAGE);
                    workbasketInputs.forEach(function (item) {
                        if (item.field.elementPath) {
                            item.field.id = item.field.id + '.' + item.field.elementPath;
                        }
                        item.field.label = item.label;
                        if (formValue) {
                            var searchFormValueObject = JSON.parse(formValue);
                            item.field.value = searchFormValueObject[item.field.id];
                        }
                    });
                    _this.getCaseFields();
                }, function (error) {
                    console.log('Workbasket input fields request will be discarded reason: ', error.message);
                });
            }
        }
        else {
            this.resetCaseState();
        }
    };
    WorkbasketFiltersComponent.prototype.isCaseTypesDropdownDisabled = function () {
        return !this.selectedJurisdictionCaseTypes;
    };
    WorkbasketFiltersComponent.prototype.isCaseStatesDropdownDisabled = function () {
        return !this.selected.caseType || !(this.selected.caseType.states && this.selected.caseType.states.length > 0);
    };
    WorkbasketFiltersComponent.prototype.isApplyButtonDisabled = function () {
        return !(this.selected.jurisdiction && this.selected.caseType);
    };
    WorkbasketFiltersComponent.prototype.sortStates = function (states) {
        return states.sort(this.orderService.sortAsc);
    };
    /**
     * Try to initialise filters based on query parameters or workbasket defaults.
     * Query parameters, when available, take precedence over workbasket defaults.
     */
    WorkbasketFiltersComponent.prototype.initFilters = function (init) {
        var savedQueryParams = this.windowService.getLocalStorage(SAVED_QUERY_PARAM_LOC_STORAGE);
        var routeSnapshot = this.route.snapshot;
        if (savedQueryParams) {
            routeSnapshot.queryParams = JSON.parse(savedQueryParams);
        }
        var selectedJurisdictionId = routeSnapshot.queryParams[WorkbasketFiltersComponent_1.PARAM_JURISDICTION] ||
            (this.defaults && this.defaults.jurisdiction_id);
        if (selectedJurisdictionId) {
            this.selected.jurisdiction = this.jurisdictions.find(function (j) { return selectedJurisdictionId === j.id; });
            if (this.selected.jurisdiction && this.selected.jurisdiction.caseTypes.length > 0) {
                this.selectedJurisdictionCaseTypes = this.selected.jurisdiction.caseTypes;
                this.selected.caseType = this.selectCaseType(this.selected, this.selectedJurisdictionCaseTypes, routeSnapshot);
                if (this.selected.caseType) {
                    this.onCaseTypeIdChange();
                    this.selected.caseState = this.selectCaseState(this.selected.caseType, routeSnapshot);
                }
                this.workbasketDefaults = true;
            }
        }
        else {
            this.selected.jurisdiction = null;
        }
        this.apply(init);
    };
    WorkbasketFiltersComponent.prototype.selectCaseState = function (caseType, routeSnapshot) {
        var caseState;
        if (caseType) {
            var selectedCaseStateId_1 = this.selectCaseStateIdFromQueryOrDefaults(routeSnapshot, (this.defaults && this.defaults.state_id));
            caseState = caseType.states.find(function (ct) { return selectedCaseStateId_1 === ct.id; });
        }
        return caseState ? caseState : null;
    };
    WorkbasketFiltersComponent.prototype.selectCaseStateIdFromQueryOrDefaults = function (routeSnapshot, defaultCaseStateId) {
        return routeSnapshot.queryParams[WorkbasketFiltersComponent_1.PARAM_CASE_STATE] || defaultCaseStateId;
    };
    WorkbasketFiltersComponent.prototype.selectCaseType = function (selected, caseTypes, routeSnapshot) {
        var caseType;
        if (selected.jurisdiction) {
            var selectedCaseTypeId_1 = this.selectCaseTypeIdFromQueryOrDefaults(routeSnapshot, (this.defaults && this.defaults.case_type_id));
            caseType = caseTypes.find(function (ct) { return selectedCaseTypeId_1 === ct.id; });
        }
        return caseType ? caseType : caseTypes[0];
    };
    WorkbasketFiltersComponent.prototype.selectCaseTypeIdFromQueryOrDefaults = function (routeSnapshot, defaultCaseTypeId) {
        return routeSnapshot.queryParams[WorkbasketFiltersComponent_1.PARAM_CASE_TYPE] || defaultCaseTypeId;
    };
    WorkbasketFiltersComponent.prototype.isSearchableAndWorkbasketInputsReady = function () {
        return this.selected.jurisdiction && this.selected.caseType && this.workbasketInputsReady;
    };
    WorkbasketFiltersComponent.prototype.resetFieldsWhenNoDefaults = function () {
        this.resetCaseState();
        this.resetCaseType();
        this.clearWorkbasketInputs();
        this.workbasketDefaults = false;
        this.selected.jurisdiction = null;
        this.initialised = false;
        this.initFilters(true);
    };
    WorkbasketFiltersComponent.prototype.clearWorkbasketInputs = function () {
        this.workbasketInputsReady = false;
        this.workbasketInputs = [];
    };
    WorkbasketFiltersComponent.prototype.resetCaseState = function () {
        this.defaults.state_id = null;
        this.selected.caseState = null;
        this.selectedCaseTypeStates = null;
    };
    WorkbasketFiltersComponent.prototype.resetCaseType = function () {
        this.selected.caseType = undefined; // option should be blank rather than "Select a value" in case of reset.
        this.selectedJurisdictionCaseTypes = null;
    };
    WorkbasketFiltersComponent.prototype.setFocusToTop = function () {
        window.scrollTo(0, 0);
        var topContainer = document.getElementById('search-result-heading__text');
        if (topContainer) {
            topContainer.focus();
        }
    };
    WorkbasketFiltersComponent.prototype.getCaseFields = function () {
        if (this.workbasketInputs) {
            this.caseFields = this.workbasketInputs.map(function (item) { return services_1.FieldsUtils.convertToCaseField(item.field); });
        }
    };
    var WorkbasketFiltersComponent_1;
    WorkbasketFiltersComponent.PARAM_JURISDICTION = 'jurisdiction';
    WorkbasketFiltersComponent.PARAM_CASE_TYPE = 'case-type';
    WorkbasketFiltersComponent.PARAM_CASE_STATE = 'case-state';
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WorkbasketFiltersComponent.prototype, "jurisdictions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WorkbasketFiltersComponent.prototype, "defaults", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WorkbasketFiltersComponent.prototype, "onApply", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WorkbasketFiltersComponent.prototype, "onReset", void 0);
    WorkbasketFiltersComponent = WorkbasketFiltersComponent_1 = __decorate([
        core_1.Component({
            selector: 'ccd-workbasket-filters',
            template: "\n\n    <h2 class=\"heading-h2\" aria-label=\"Filters\">Filters</h2>\n    <form class=\"global-display\">\n      <div class=\"form-group\">\n        <label class=\"form-label\" for=\"wb-jurisdiction\">Jurisdiction</label>\n        <select class=\"form-control form-control-3-4 ccd-dropdown\" id=\"wb-jurisdiction\"\n                name=\"jurisdiction\" [(ngModel)]=\"selected.jurisdiction\" aria-controls=\"search-result\"\n                (change)=\"onJurisdictionIdChange()\">\n          <option *ngIf=\"!workbasketDefaults\" [ngValue]=\"null\">Select a value</option>\n          <option *ngFor=\"let j of jurisdictions\" [ngValue]=\"j\">{{j.name}}</option>\n        </select>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"form-label\" for=\"wb-case-type\">Case type</label>\n        <select class=\"form-control form-control-3-4 ccd-dropdown\" id=\"wb-case-type\"\n                name=\"case-type\" [(ngModel)]=\"selected.caseType\" [disabled]=\"isCaseTypesDropdownDisabled()\"\n                (change)=\"onCaseTypeIdChange()\" aria-controls=\"search-result\">\n          <option *ngIf=\"!workbasketDefaults\" [ngValue]=\"null\">Select a value</option>\n          <option *ngFor=\"let ct of selectedJurisdictionCaseTypes\" [ngValue]=\"ct\">{{ct.name}}</option>\n        </select>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"form-label\" for=\"wb-case-state\">State</label>\n        <select class=\"form-control form-control-3-4 ccd-dropdown\" id=\"wb-case-state\"\n                name=\"state\" [(ngModel)]=\"selected.caseState\" [disabled]=\"isCaseStatesDropdownDisabled()\"\n                aria-controls=\"search-result\">\n          <option [ngValue]=\"null\">Any</option>\n          <option *ngFor=\"let cs of selectedCaseTypeStates\" [ngValue]=\"cs\">{{cs.name}}</option>\n        </select>\n      </div>\n\n      <ng-container ccdConditionalShowForm *ngIf=\"isSearchableAndWorkbasketInputsReady()\" [formGroup]=\"formGroup\" [contextFields]=\"caseFields\">\n        <div id=\"dynamicFilters\">\n          <div class=\"form-group\" *ngFor=\"let workbasketInput of workbasketInputs\">\n            <ccd-field-write [caseField]=\"workbasketInput.field\" [formGroup]=\"formGroup\" [isExpanded]=\"true\" [isInSearchBlock]=\"true\" (keyup.enter)=\"apply(null)\"></ccd-field-write>\n          </div>\n        </div>\n      </ng-container>\n\n      <button type=\"button\" class=\"button\" (click)=\"apply(true)\" [disabled]=\"isApplyButtonDisabled()\" title=\"Apply filter\" aria-label=\"Apply filter\">Apply</button> &nbsp;&nbsp;&nbsp;\n      <button type=\"button\" (click)=\"reset()\" class=\"button button-secondary\" title=\"Reset filter\" aria-label=\"Reset filter\">Reset</button>\n    </form>\n  ",
            styles: ["\n    div select{font-family:\"nta\",Arial,sans-serif;font-weight:400;text-transform:none;font-size:11pt;line-height:1.27273}@media (min-width: 641px){div select{font-size:12pt;line-height:1.33333}}.form-group{margin-bottom:7px}.ccd-dropdown{width:100%}span.heading-medium{margin-top:0}\n  "]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            services_1.WorkbasketInputFilterService,
            services_1.OrderService,
            services_1.JurisdictionService,
            services_1.AlertService,
            services_1.WindowService])
    ], WorkbasketFiltersComponent);
    return WorkbasketFiltersComponent;
}());
exports.WorkbasketFiltersComponent = WorkbasketFiltersComponent;
//# sourceMappingURL=workbasket-filters.component.js.map