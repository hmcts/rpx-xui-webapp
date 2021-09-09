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
var services_1 = require("../../services");
var JURISDICTION_LOC_STORAGE = 'search-jurisdiction';
var META_FIELDS_LOC_STORAGE = 'search-metadata-fields';
var FORM_GROUP_VALUE_LOC_STORAGE = 'search-form-group-value';
var CASE_TYPE_LOC_STORAGE = 'search-caseType';
var SearchFiltersComponent = /** @class */ (function () {
    function SearchFiltersComponent(searchService, orderService, jurisdictionService, windowService) {
        this.searchService = searchService;
        this.orderService = orderService;
        this.jurisdictionService = jurisdictionService;
        this.windowService = windowService;
        this.onApply = new core_1.EventEmitter();
        this.onReset = new core_1.EventEmitter();
        this.onJurisdiction = new core_1.EventEmitter();
        this.formGroup = new forms_1.FormGroup({});
    }
    SearchFiltersComponent_1 = SearchFiltersComponent;
    SearchFiltersComponent.prototype.ngOnInit = function () {
        this.selected = {};
        var jurisdiction = this.windowService.getLocalStorage(JURISDICTION_LOC_STORAGE);
        if (this.jurisdictions.length === 1 || jurisdiction) {
            this.selected.jurisdiction = this.jurisdictions[0];
            if (jurisdiction) {
                var localStorageJurisdiction_1 = JSON.parse(jurisdiction);
                this.selected.jurisdiction = this.jurisdictions.filter(function (j) { return j.id === localStorageJurisdiction_1.id; })[0];
            }
            this.onJurisdictionIdChange();
        }
        if (this.autoApply === true) {
            this.selected.formGroup = this.formGroup;
            this.selected.page = 1;
            this.selected.metadataFields = this.getMetadataFields();
            this.onApply.emit({
                selected: this.selected,
                queryParams: this.getQueryParams()
            });
        }
    };
    SearchFiltersComponent.prototype.getQueryParams = function () {
        // Save filters as query parameters for current route
        var queryParams = {};
        if (this.selected.jurisdiction) {
            queryParams[SearchFiltersComponent_1.PARAM_JURISDICTION] = this.selected.jurisdiction.id;
        }
        if (this.selected.caseType) {
            queryParams[SearchFiltersComponent_1.PARAM_CASE_TYPE] = this.selected.caseType.id;
        }
        if (this.selected.caseState) {
            queryParams[SearchFiltersComponent_1.PARAM_CASE_STATE] = this.selected.caseState.id;
        }
        return queryParams;
    };
    SearchFiltersComponent.prototype.reset = function () {
        this.windowService.removeLocalStorage(FORM_GROUP_VALUE_LOC_STORAGE);
        this.windowService.removeLocalStorage(CASE_TYPE_LOC_STORAGE);
        this.windowService.removeLocalStorage(JURISDICTION_LOC_STORAGE);
        this.windowService.removeLocalStorage(META_FIELDS_LOC_STORAGE);
        this.selected = {};
        if (this.jurisdictions.length === 1) {
            this.selected.jurisdiction = this.jurisdictions[0];
            this.onJurisdictionIdChange();
        }
        this.onReset.emit();
    };
    SearchFiltersComponent.prototype.apply = function () {
        this.selected.formGroup = this.formGroup;
        this.selected.page = 1;
        this.selected.metadataFields = this.getMetadataFields();
        this.populateValuesInLocalStorage();
        this.onApply.emit({
            selected: this.selected,
            queryParams: this.getQueryParams()
        });
        this.setFocusToTop();
    };
    SearchFiltersComponent.prototype.populateValuesInLocalStorage = function () {
        this.windowService.setLocalStorage(FORM_GROUP_VALUE_LOC_STORAGE, JSON.stringify(this.selected.formGroup.value));
        this.windowService.setLocalStorage(META_FIELDS_LOC_STORAGE, JSON.stringify(this.selected.metadataFields));
        this.windowService.setLocalStorage(JURISDICTION_LOC_STORAGE, JSON.stringify(this.selected.jurisdiction));
        if (this.selected.caseType) {
            this.windowService.setLocalStorage(CASE_TYPE_LOC_STORAGE, JSON.stringify(this.selected.caseType));
        }
    };
    SearchFiltersComponent.prototype.getMetadataFields = function () {
        if (this.searchInputs) {
            return this.searchInputs
                .filter(function (searchInput) { return searchInput.field.metadata === true; })
                .map(function (searchInput) { return searchInput.field.id; });
        }
    };
    SearchFiltersComponent.prototype.isSearchable = function () {
        var result;
        result = this.selected.jurisdiction !== undefined && this.selected.jurisdiction !== null;
        result = result && this.selected.caseType !== undefined && this.selected.caseType !== null;
        return result;
    };
    SearchFiltersComponent.prototype.isSearchableAndSearchInputsReady = function () {
        return this.isSearchable() && this.searchInputsReady;
    };
    SearchFiltersComponent.prototype.onJurisdictionIdChange = function () {
        this.selected.caseType = null;
        this.jurisdictionService.announceSelectedJurisdiction(this.selected.jurisdiction);
        this.selectedJurisdictionCaseTypes = this.selected.jurisdiction.caseTypes;
        this.selectCaseType(this.selectedJurisdictionCaseTypes);
        this.onJurisdiction.emit(this.selected.jurisdiction);
    };
    SearchFiltersComponent.prototype.onCaseTypeIdChange = function () {
        var _this = this;
        this.formGroup = new forms_1.FormGroup({});
        this.searchInputsReady = false;
        this.searchInputs = [];
        this.searchService.getSearchInputs(this.selected.jurisdiction.id, this.selected.caseType.id)
            .do(function () { return _this.searchInputsReady = true; })
            .subscribe(function (searchInputs) {
            _this.searchInputs = searchInputs
                .sort(_this.orderService.sortAsc);
            var formValue = _this.windowService.getLocalStorage(FORM_GROUP_VALUE_LOC_STORAGE);
            var formValueObject = null;
            if (formValue) {
                formValueObject = JSON.parse(formValue);
            }
            searchInputs.forEach(function (item) {
                if (item.field.elementPath) {
                    item.field.id = item.field.id + '.' + item.field.elementPath;
                }
                item.field.label = item.label;
                if (formValueObject) {
                    item.field.value = formValueObject[item.field.id];
                }
            });
            _this.getCaseFields();
        }, function (error) {
            console.log('Search input fields request will be discarded reason: ', error.message);
        });
    };
    SearchFiltersComponent.prototype.isJurisdictionSelected = function () {
        return this.selected.jurisdiction === null ||
            this.selected.jurisdiction === undefined;
    };
    SearchFiltersComponent.prototype.selectCaseType = function (caseTypes) {
        if (caseTypes && caseTypes.length > 0) {
            this.selected.caseType = caseTypes[0];
            var caseType = this.windowService.getLocalStorage(CASE_TYPE_LOC_STORAGE);
            if (caseType) {
                var caseTypeObject_1 = JSON.parse(caseType);
                var result = caseTypes.filter(function (c) { return c.id === caseTypeObject_1.id; });
                if (result !== undefined && result.length > 0) {
                    this.selected.caseType = result[0];
                }
                else {
                    this.selected.caseType = caseTypes[0];
                }
            }
            else {
                this.selected.caseType = caseTypes[0];
            }
            this.onCaseTypeIdChange();
        }
    };
    SearchFiltersComponent.prototype.setFocusToTop = function () {
        window.scrollTo(0, 0);
        var topContainer = document.getElementById('search-result-heading__text');
        if (topContainer) {
            topContainer.focus();
        }
    };
    SearchFiltersComponent.prototype.getCaseFields = function () {
        if (this.searchInputs) {
            this.caseFields = this.searchInputs.map(function (item) { return services_1.FieldsUtils.convertToCaseField(item.field); });
        }
    };
    var SearchFiltersComponent_1;
    SearchFiltersComponent.PARAM_JURISDICTION = 'jurisdiction';
    SearchFiltersComponent.PARAM_CASE_TYPE = 'case-type';
    SearchFiltersComponent.PARAM_CASE_STATE = 'case-state';
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], SearchFiltersComponent.prototype, "jurisdictions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SearchFiltersComponent.prototype, "autoApply", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SearchFiltersComponent.prototype, "onApply", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SearchFiltersComponent.prototype, "onReset", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SearchFiltersComponent.prototype, "onJurisdiction", void 0);
    SearchFiltersComponent = SearchFiltersComponent_1 = __decorate([
        core_1.Component({
            selector: 'ccd-search-filters',
            template: "\n    <h2 class=\"heading-h2\" aria-label=\"Filters\">Filters</h2>\n    <form class=\"global-display\">\n      <div class=\"form-group\" style=\"margin-top: 13px;\">\n        <label class=\"form-label\" for=\"s-jurisdiction\">Jurisdiction*</label>\n        <select class=\"form-control form-control-3-4 ccd-dropdown\" id=\"s-jurisdiction\"\n                name=\"jurisdiction\" [(ngModel)]=\"selected.jurisdiction\" aria-controls=\"search-result\"\n                (change)=\"onJurisdictionIdChange()\">\n          <option *ngFor=\"let j of jurisdictions\" [ngValue]=\"j\">{{j.name}}</option>\n        </select>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"form-label\" for=\"s-case-type\">Case type*</label>\n        <select [disabled]=\"isJurisdictionSelected()\" class=\"form-control form-control-3-4 ccd-dropdown\"\n                id=\"s-case-type\" name=\"case-type\" [(ngModel)]=\"selected.caseType\" aria-controls=\"search-result\"\n                (change)=\"onCaseTypeIdChange()\">\n          <option *ngFor=\"let ct of selectedJurisdictionCaseTypes\" [ngValue]=\"ct\">{{ct.name}}</option>\n        </select>\n      </div>\n\n      <ng-container ccdConditionalShowForm *ngIf=\"isSearchableAndSearchInputsReady()\" [formGroup]=\"formGroup\" [contextFields]=\"caseFields\">\n        <div id=\"dynamicFilters\">\n          <div class=\"form-group\" *ngFor=\"let searchInput of searchInputs\">\n            <ccd-field-write [caseField]=\"searchInput.field\" [formGroup]=\"formGroup\" [isExpanded]=\"true\" (keyup.enter)=\"apply()\"></ccd-field-write>\n          </div>\n        </div>\n      </ng-container>\n\n      <button [disabled]=\"!isSearchableAndSearchInputsReady()\" type=\"button\" class=\"button\" (click)=\"apply()\" (keyup.enter)=\"apply()\" title=\"Apply filter\" aria-label=\"Apply filter\">Apply</button> &nbsp;&nbsp;&nbsp;\n      <button id=\"reset\" type=\"button\" (click)=\"reset()\" class=\"button button-secondary\" title=\"Reset filter\" aria-label=\"Reset filter\">Reset</button>\n    </form>\n  ",
        }),
        __metadata("design:paramtypes", [services_1.SearchService,
            services_1.OrderService,
            services_1.JurisdictionService,
            services_1.WindowService])
    ], SearchFiltersComponent);
    return SearchFiltersComponent;
}());
exports.SearchFiltersComponent = SearchFiltersComponent;
//# sourceMappingURL=search-filters.component.js.map