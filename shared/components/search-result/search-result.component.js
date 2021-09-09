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
var app_config_1 = require("../../../app.config");
var directives_1 = require("../../directives");
var domain_1 = require("../../domain");
var pipes_1 = require("../../pipes");
var services_1 = require("../../services");
var SearchResultComponent = /** @class */ (function () {
    function SearchResultComponent(searchResultViewItemComparatorFactory, appConfig, activityService, caseReferencePipe, placeholderService, browserService) {
        this.activityService = activityService;
        this.caseReferencePipe = caseReferencePipe;
        this.placeholderService = placeholderService;
        this.browserService = browserService;
        this.ICON = domain_1.DisplayMode.ICON;
        this.selectionEnabled = false;
        this.showOnlySelected = false;
        this.preSelectedCases = [];
        this.consumerSortingEnabled = false;
        this.selection = new core_1.EventEmitter();
        this.changePage = new core_1.EventEmitter();
        this.clickCase = new core_1.EventEmitter();
        this.sortHandler = new core_1.EventEmitter();
        this.selected = {};
        this.consumerSortParameters = { column: null, order: null, type: null };
        this.selectedCases = [];
        this.searchResultViewItemComparatorFactory = searchResultViewItemComparatorFactory;
        this.paginationPageSize = appConfig.getPaginationPageSize();
        this.hideRows = false;
    }
    SearchResultComponent_1 = SearchResultComponent;
    SearchResultComponent.prototype.ngOnInit = function () {
        if (this.preSelectedCases) {
            var _loop_1 = function (preSelectedCase) {
                if (this_1.selectedCases && !this_1.selectedCases.some(function (aCase) { return aCase.case_id === preSelectedCase.case_id; })) {
                    this_1.selectedCases.push(preSelectedCase);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = this.preSelectedCases; _i < _a.length; _i++) {
                var preSelectedCase = _a[_i];
                _loop_1(preSelectedCase);
            }
        }
        this.selection.emit(this.selectedCases);
    };
    SearchResultComponent.prototype.ngOnChanges = function (changes) {
        if (changes['resultView']) {
            this.hideRows = false;
            this.sortParameters = undefined;
            // Clone `resultView` to prevent sorting the external variable
            this.resultView = {
                columns: this.resultView.columns.slice(0),
                results: this.resultView.results.slice(0),
                hasDrafts: this.resultView.hasDrafts
            };
            this.resultView.columns = this.resultView.columns.sort(function (a, b) {
                return a.order - b.order;
            });
            this.hydrateResultView();
            this.draftsCount = this.draftsCount ? this.draftsCount : this.numberOfDrafts();
        }
        if (changes['page']) {
            this.selected.page = (changes['page']).currentValue;
        }
    };
    SearchResultComponent.prototype.clearSelection = function () {
        this.selectedCases = [];
        this.selection.emit(this.selectedCases);
    };
    SearchResultComponent.prototype.canBeShared = function (caseView) {
        return caseView.supplementary_data && caseView.supplementary_data.hasOwnProperty('orgs_assigned_users');
    };
    SearchResultComponent.prototype.canAnyBeShared = function () {
        for (var i = 0, l = this.resultView.results.length; i < l; i++) {
            if (this.canBeShared(this.resultView.results[i])) {
                return true;
            }
        }
        return false;
    };
    SearchResultComponent.prototype.selectAll = function () {
        var _this = this;
        if (this.allOnPageSelected()) {
            // all cases already selected, so unselect all on this page
            this.resultView.results.forEach(function (c) {
                _this.selectedCases.forEach(function (s, i) {
                    if (c.case_id === s.case_id) {
                        _this.selectedCases.splice(i, 1);
                    }
                });
            });
        }
        else {
            this.resultView.results.forEach(function (c) {
                if (!_this.isSelected(c) && _this.canBeShared(c)) {
                    _this.selectedCases.push(c);
                }
            });
        }
        this.selection.emit(this.selectedCases);
    };
    SearchResultComponent.prototype.changeSelection = function (c) {
        var _this = this;
        if (this.isSelected(c)) {
            this.selectedCases.forEach(function (s, i) {
                if (c.case_id === s.case_id) {
                    _this.selectedCases.splice(i, 1);
                }
            });
        }
        else {
            if (this.canBeShared(c)) {
                this.selectedCases.push(c);
            }
        }
        this.selection.emit(this.selectedCases);
    };
    SearchResultComponent.prototype.isSelected = function (c) {
        for (var i = 0, l = this.selectedCases.length; i < l; i++) {
            if (c.case_id === this.selectedCases[i].case_id) {
                return true;
            }
        }
        return false;
    };
    SearchResultComponent.prototype.allOnPageSelected = function () {
        var canBeSharedCount = 0;
        for (var i = 0, l = this.resultView.results.length; i < l; i++) {
            var r = this.resultView.results[i];
            if (this.canBeShared(r)) {
                canBeSharedCount++;
            }
            if (!this.isSelected(r) && this.canBeShared(r)) {
                return false;
            }
        }
        if (canBeSharedCount === 0) {
            return false;
        }
        return true;
    };
    /**
     * Hydrates result view with case field definitions.
     */
    // A longer term resolution is to move this piece of logic to the backend
    SearchResultComponent.prototype.hydrateResultView = function () {
        var _this = this;
        this.resultView.results.forEach(function (result) {
            var caseFields = [];
            Object.keys(result.case_fields).forEach(function (fieldId) {
                var field = result.case_fields[fieldId];
                caseFields.push(Object.assign(new domain_1.CaseField(), {
                    id: fieldId,
                    label: null,
                    field_type: {},
                    value: field,
                    display_context: null,
                }));
            });
            result.hydrated_case_fields = caseFields;
            result.columns = {};
            _this.resultView.columns.forEach(function (col) {
                result.columns[col.case_field_id] = _this.buildCaseField(col, result);
            });
        });
    };
    SearchResultComponent.prototype.goToPage = function (page) {
        this.hideRows = true;
        this.selected.init = false;
        this.selected.jurisdiction = this.jurisdiction;
        this.selected.caseType = this.caseType;
        this.selected.caseState = this.caseState;
        this.selected.formGroup = this.caseFilterFG;
        this.selected.metadataFields = this.metadataFields;
        this.selected.page = page;
        // Apply filters
        var queryParams = {};
        queryParams[SearchResultComponent_1.PARAM_JURISDICTION] = this.selected.jurisdiction ? this.selected.jurisdiction.id : null;
        queryParams[SearchResultComponent_1.PARAM_CASE_TYPE] = this.selected.caseType ? this.selected.caseType.id : null;
        queryParams[SearchResultComponent_1.PARAM_CASE_STATE] = this.selected.caseState ? this.selected.caseState.id : null;
        this.changePage.emit({
            selected: this.selected,
            queryParams: queryParams
        });
        var topContainer = document.getElementById('top');
        if (topContainer) {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            topContainer.focus();
        }
    };
    SearchResultComponent.prototype.buildCaseField = function (col, result) {
        return Object.assign(new domain_1.CaseField(), {
            id: col.case_field_id,
            label: col.label,
            field_type: col.case_field_type,
            value: result.case_fields[col.case_field_id],
            display_context_parameter: col.display_context_parameter,
            display_context: col.display_context,
        });
    };
    SearchResultComponent.prototype.getColumnsWithPrefix = function (col, result) {
        col.value = this.draftPrefixOrGet(col, result);
        col.value = this.placeholderService.resolvePlaceholders(result.case_fields, col.value);
        return col;
    };
    SearchResultComponent.prototype.hasResults = function () {
        return this.resultView.results.length && this.paginationMetadata.total_pages_count;
    };
    SearchResultComponent.prototype.hasDrafts = function () {
        return this.resultView.hasDrafts();
    };
    SearchResultComponent.prototype.comparator = function (column) {
        return this.searchResultViewItemComparatorFactory.createSearchResultViewItemComparator(column);
    };
    SearchResultComponent.prototype.sort = function (column) {
        if (this.consumerSortingEnabled) {
            if (column.case_field_id !== this.consumerSortParameters.column) {
                this.consumerSortParameters.order = domain_1.SortOrder.DESCENDING;
            }
            else {
                this.consumerSortParameters.order = this.consumerSortParameters.order === domain_1.SortOrder.DESCENDING ?
                    domain_1.SortOrder.ASCENDING :
                    domain_1.SortOrder.DESCENDING;
            }
            this.consumerSortParameters.column = column.case_field_id;
            this.consumerSortParameters.type = column.case_field_type.type;
            this.sortHandler.emit(this.consumerSortParameters);
        }
        else {
            if (this.comparator(column) === undefined) {
                return;
            }
            else if (this.isSortAscending(column)) {
                this.sortParameters = new domain_1.SortParameters(this.comparator(column), domain_1.SortOrder.ASCENDING);
            }
            else {
                this.sortParameters = new domain_1.SortParameters(this.comparator(column), domain_1.SortOrder.DESCENDING);
            }
        }
    };
    SearchResultComponent.prototype.sortWidget = function (column) {
        var condition = false;
        if (this.consumerSortingEnabled) {
            var isColumn = column.case_field_id === this.consumerSortParameters.column;
            var isAscending = this.consumerSortParameters.order === domain_1.SortOrder.ASCENDING;
            condition = !isColumn || (isColumn && isAscending);
        }
        else {
            condition = this.isSortAscending(column);
        }
        return condition ? '&#9660;' : '&#9650;';
    };
    SearchResultComponent.prototype.activityEnabled = function () {
        return this.activityService.isEnabled;
    };
    SearchResultComponent.prototype.hyphenateIfCaseReferenceOrGet = function (col, result) {
        if (col.case_field_id === '[CASE_REFERENCE]') {
            return this.caseReferencePipe.transform(result.case_fields[col.case_field_id]);
        }
        else {
            if (col.id) {
                if (col.id === '[CASE_REFERENCE]') {
                    return this.caseReferencePipe.transform(result.case_fields[col.id]);
                }
                else {
                    return result.case_fields[col.id];
                }
            }
            else {
                return result.case_fields[col.case_field_id];
            }
        }
    };
    SearchResultComponent.prototype.draftPrefixOrGet = function (col, result) {
        return result.case_id.startsWith(domain_1.DRAFT_PREFIX) ? domain_1.DRAFT_PREFIX : this.hyphenateIfCaseReferenceOrGet(col, result);
    };
    SearchResultComponent.prototype.isSortAscending = function (column) {
        var currentSortOrder = this.currentSortOrder(column);
        return currentSortOrder === domain_1.SortOrder.UNSORTED || currentSortOrder === domain_1.SortOrder.DESCENDING;
    };
    SearchResultComponent.prototype.currentSortOrder = function (column) {
        var isAscending = true;
        var isDescending = true;
        if (this.comparator(column) === undefined) {
            return domain_1.SortOrder.UNSORTED;
        }
        for (var i = 0; i < this.resultView.results.length - 1; i++) {
            var comparison = this.comparator(column).compare(this.resultView.results[i], this.resultView.results[i + 1]);
            isDescending = isDescending && comparison <= 0;
            isAscending = isAscending && comparison >= 0;
            if (!isAscending && !isDescending) {
                break;
            }
        }
        return isAscending ? domain_1.SortOrder.ASCENDING : isDescending ? domain_1.SortOrder.DESCENDING : domain_1.SortOrder.UNSORTED;
    };
    SearchResultComponent.prototype.getFirstResult = function () {
        var currentPage = (this.selected.page ? this.selected.page : 1);
        return ((currentPage - 1) * this.paginationPageSize) + 1 + this.getDraftsCountIfNotPageOne(currentPage);
    };
    SearchResultComponent.prototype.getLastResult = function () {
        var currentPage = (this.selected.page ? this.selected.page : 1);
        return ((currentPage - 1) * this.paginationPageSize) + this.resultView.results.length + this.getDraftsCountIfNotPageOne(currentPage);
    };
    SearchResultComponent.prototype.getTotalResults = function () {
        return this.paginationMetadata.total_results_count + this.draftsCount;
    };
    SearchResultComponent.prototype.prepareCaseLinkUrl = function (caseId) {
        var url = this.caseLinkUrlTemplate;
        url = url.replace('jurisdiction_id', this.jurisdiction.id);
        url = url.replace('caseType_id', this.caseType.id);
        url = url.replace('case_id', caseId);
        return url;
    };
    SearchResultComponent.prototype.getDraftsCountIfNotPageOne = function (currentPage) {
        return currentPage > 1 ? this.draftsCount : 0;
    };
    SearchResultComponent.prototype.numberOfDrafts = function () {
        return this.resultView.results.filter(function (_) { return _.case_id.startsWith(domain_1.DRAFT_PREFIX); }).length;
    };
    SearchResultComponent.prototype.goToCase = function (caseId) {
        this.clickCase.emit({
            caseId: caseId
        });
    };
    SearchResultComponent.prototype.onKeyUp = function ($event, c) {
        if ($event.key === 'Space') {
            if (this.browserService.isFirefox || this.browserService.isSafari || this.browserService.isIEOrEdge) {
                this.changeSelection(c);
            }
        }
    };
    var SearchResultComponent_1;
    SearchResultComponent.PARAM_JURISDICTION = 'jurisdiction';
    SearchResultComponent.PARAM_CASE_TYPE = 'case-type';
    SearchResultComponent.PARAM_CASE_STATE = 'case-state';
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SearchResultComponent.prototype, "caseLinkUrlTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", domain_1.Jurisdiction)
    ], SearchResultComponent.prototype, "jurisdiction", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", domain_1.CaseType)
    ], SearchResultComponent.prototype, "caseType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", domain_1.CaseState)
    ], SearchResultComponent.prototype, "caseState", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], SearchResultComponent.prototype, "caseFilterFG", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", domain_1.SearchResultView)
    ], SearchResultComponent.prototype, "resultView", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SearchResultComponent.prototype, "page", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", domain_1.PaginationMetadata)
    ], SearchResultComponent.prototype, "paginationMetadata", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], SearchResultComponent.prototype, "metadataFields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SearchResultComponent.prototype, "selectionEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SearchResultComponent.prototype, "showOnlySelected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], SearchResultComponent.prototype, "preSelectedCases", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SearchResultComponent.prototype, "consumerSortingEnabled", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SearchResultComponent.prototype, "selection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SearchResultComponent.prototype, "changePage", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SearchResultComponent.prototype, "clickCase", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SearchResultComponent.prototype, "sortHandler", void 0);
    SearchResultComponent = SearchResultComponent_1 = __decorate([
        core_1.Component({
            selector: 'ccd-search-result',
            template: "\n    <table *ngIf=\"hasResults() || hasDrafts()\">\n      <caption>\n        <h2 class=\"heading-h2\" id=\"search-result-heading__text\" tabindex=\"-1\">{{ caseState ? 'Your cases' : 'Search result' }}</h2>\n        <div *ngIf=\"(hasResults() || hasDrafts())\" class=\"pagination-top\"\n          attr.aria-label=\"{{ getTotalResults() }} results have been found\" role=\"status\">\n          <span class=\"text-16\" id=\"search-result-summary__text\">Showing \n            <span class=\"govuk-!-font-weight-bold\">{{ getFirstResult() }}</span>\n            to\n            <span class=\"govuk-!-font-weight-bold\">{{ getLastResult() }}</span>\n            of\n            <span class=\"govuk-!-font-weight-bold\">{{ getTotalResults() }}</span> results</span>\n        </div>\n        <div *ngIf=\"(hasResults() || hasDrafts()) && selectionEnabled\" class=\"reset-selection\"\n          attr.aria-label=\"Reset selection\">\n          <span><a class=\"search-result-reset-link\" href=\"javascript:void()\" (click)=\"clearSelection()\">Reset case selection</a></span>\n        </div>\n      </caption>\n      <thead>\n        <tr scope=\"row\">\n          <th *ngIf=\"selectionEnabled\" class=\"govuk-table__checkbox\" scope=\"col\">\n            <div class=\"govuk-checkboxes__item\">\n              <input class=\"govuk-checkboxes__input\" id=\"select-all\" name=\"select-all\" type=\"checkbox\" (change)=\"selectAll()\" [checked]=\"allOnPageSelected()\" [disabled]=\"!canAnyBeShared()\" />\n              <label class=\"govuk-label govuk-checkboxes__label\" for=\"select-all\">\n              </label>\n            </div>\n          </th>\n          <th *ngFor=\"let col of resultView.columns\">\n            <table class=\"search-result-column-header\"\n              attr.aria-label=\"Sort by {{col.label}} {{ isSortAscending(col)? 'ascending' : 'descending' }}\">\n              <tr>\n                <div class=\"search-result-column-label\" (click)=\"sort(col)\">{{col.label}}</div>\n                <div *ngIf=\"comparator(col)\" class=\"search-result-column-sort\">\n                  <a (click)=\"sort(col)\" class=\"sort-widget\" [innerHTML]=\"sortWidget(col)\" href=\"javascript:void(0)\"></a>\n                </div>\n              </tr>\n            </table>\n          </th>\n          <th *ngIf=\"activityEnabled()\" style=\"width: 110px;\"></th>\n        </tr>\n      </thead>\n      <tbody>\n\n        <!-- sorted by consumer -->\n        <ng-container *ngIf=\"consumerSortingEnabled\">\n          <tr *ngFor=\"let result of resultView.results | paginate: { itemsPerPage: paginationPageSize, currentPage: selected.page, totalItems: paginationMetadata.total_results_count }\">\n            <td *ngIf=\"selectionEnabled\" class=\"govuk-table__checkbox\" scope=\"col\">\n              <div class=\"govuk-checkboxes__item\">\n                <input class=\"govuk-checkboxes__input\" id=\"select-{{ result.case_id }}\" name=\"select-{{ result.case_id }}\"\n                  type=\"checkbox\" (change)=\"changeSelection(result)\" [checked]=\"isSelected(result)\" [disabled]=\"!canBeShared(result)\" />\n                <label class=\"govuk-label govuk-checkboxes__label\" for=\"select-{{ result.case_id }}\">\n                </label>\n              </div>\n            </td>\n            <td class=\"search-result-column-cell\" *ngFor=\"let col of resultView.columns; let colIndex = index\" scope=\"row\">\n              <a *ngIf=\"colIndex == 0\" [routerLink]=\"prepareCaseLinkUrl(result.case_id)\"\n                attr.aria-label=\"go to case with Case reference:{{ result.case_id | ccdCaseReference }}\" class=\"govuk-link\">\n                <ng-container class=\"text-16\" *ngIf=\"!hideRows\">\n                  <ccd-field-read *ngIf=\"draftPrefixOrGet(col, result); else case_reference\"\n                                  ccdLabelSubstitutor [caseField]=\"getColumnsWithPrefix(result.columns[col.case_field_id], result)\"\n                                  [contextFields]=\"result.hydrated_case_fields\"\n                                  [elementsToSubstitute]=\"['value']\"></ccd-field-read>\n                  <ng-template #case_reference>{{result.case_id | ccdCaseReference}}</ng-template>\n                </ng-container>\n              </a>\n              <div *ngIf=\"colIndex != 0\" class=\"text-16\" [style.visibility]=\"hideRows ? 'hidden' : 'visible'\">\n                <ccd-field-read ccdLabelSubstitutor\n                                [caseField]=\"result.columns[col.case_field_id]\"\n                                [contextFields]=\"result.hydrated_case_fields\"\n                                [elementsToSubstitute]=\"['value']\"></ccd-field-read>\n              </div>\n            </td>\n            <td *ngIf=\"activityEnabled()\">\n              <div [style.visibility]=\"hideRows ? 'hidden' : 'visible'\">\n                <ccd-activity [caseId]=\"result.case_id\" [displayMode]=\"ICON\"></ccd-activity>\n              </div>\n            </td>\n          </tr>\n        </ng-container>\n        <!-- sorted by toolkit -->\n        <ng-container *ngIf=\"!consumerSortingEnabled\">\n          <tr *ngFor=\"let result of resultView.results | ccdSortSearchResult : sortParameters | paginate: { itemsPerPage: paginationPageSize, currentPage: selected.page, totalItems: paginationMetadata.total_results_count }\">\n            <td *ngIf=\"selectionEnabled\" class=\"govuk-table__checkbox\" scope=\"col\">\n              <div class=\"govuk-checkboxes__item\">\n                <input class=\"govuk-checkboxes__input\" id=\"select-{{ result.case_id }}\" name=\"select-{{ result.case_id }}\"\n                  type=\"checkbox\" (change)=\"changeSelection(result)\" [checked]=\"isSelected(result)\" [disabled]=\"!canBeShared(result)\" (keyup)=\"onKeyUp($event, result)\" />\n                <label class=\"govuk-label govuk-checkboxes__label\" for=\"select-{{ result.case_id }}\">\n                </label>\n              </div>\n            </td>\n            <td class=\"search-result-column-cell\" *ngFor=\"let col of resultView.columns; let colIndex = index\" scope=\"row\">\n\n              <a *ngIf=\"colIndex == 0\" [routerLink]=\"prepareCaseLinkUrl(result.case_id)\"\n                attr.aria-label=\"go to case with Case reference:{{ result.case_id | ccdCaseReference }}\" class=\"govuk-link\">\n                <ng-container class=\"text-16\" *ngIf=\"!hideRows\">\n                  <ccd-field-read *ngIf=\"draftPrefixOrGet(col, result); else case_reference\"\n                                  ccdLabelSubstitutor [caseField]=\"getColumnsWithPrefix(result.columns[col.case_field_id], result)\"\n                                  [contextFields]=\"result.hydrated_case_fields\"\n                                  [elementsToSubstitute]=\"['value']\"></ccd-field-read>\n                  <ng-template #case_reference>{{result.case_id | ccdCaseReference}}</ng-template>\n                </ng-container>\n              </a>\n              <div *ngIf=\"colIndex != 0\" class=\"text-16\" [style.visibility]=\"hideRows ? 'hidden' : 'visible'\">\n                <ccd-field-read ccdLabelSubstitutor\n                                [caseField]=\"result.columns[col.case_field_id]\"\n                                [contextFields]=\"result.hydrated_case_fields\"\n                                [elementsToSubstitute]=\"['value']\"></ccd-field-read>\n              </div>\n            </td>\n            <td *ngIf=\"activityEnabled()\">\n              <div [style.visibility]=\"hideRows ? 'hidden' : 'visible'\">\n                <ccd-activity [caseId]=\"result.case_id\" [displayMode]=\"ICON\"></ccd-activity>\n              </div>\n            </td>\n          </tr>\n        </ng-container>\n\n      </tbody>\n    </table>\n\n    <ccd-pagination \n      *ngIf=\"hasResults()\"\n      (pageChange)=\"goToPage($event)\"\n      [visibilityLabel]=\"hideRows ? 'hidden' : 'visible'\" \n      [autoHide]=\"true\"\n      [maxSize]=\"8\"\n      [screenReaderPaginationLabel]=\"Pagination\"\n      [screenReaderPageLabel]=\"page\"\n      [screenReaderCurrentLabel]=\"'You\\'re on page'\"></ccd-pagination>\n\n    <div *ngIf=\"!(hasResults() || hasDrafts())\" class=\"notification\"\n      aria-label=\"No cases found. Try using different filters.\">\n      No cases found. Try using different filters.\n    </div>\n  ",
            styles: ["\n    table thead tr th{vertical-align:top}table tbody tr td{font-size:16px;word-wrap:break-word}table tbody tr td a{float:left}table .caseid-col{white-space:nowrap}.notification{text-align:center;padding:30px 0px 30px 0px;margin-top:75px}a:hover{color:#005ea5}.search-result-reset-link{padding-right:15px;padding-left:15px}.search-result-column-header{width:unset;table-layout:normal}.search-result-column-header div{display:table-cell;width:auto}@media screen and (max-width: 379px){.search-result-column-header div{display:block;float:right}}.search-result-column-label{font-size:16px;font-weight:bold;word-wrap:break-word;cursor:pointer;padding-right:15px}.search-result-column-sort{font-size:16px}.sort-widget{cursor:pointer;text-decoration:none;color:#231F20}span.heading-medium{margin-top:-20px}.govuk-table__checkbox{vertical-align:middle;padding-left:3px}#search-result-heading__text:focus{outline:none}\n  "]
        }),
        __metadata("design:paramtypes", [services_1.SearchResultViewItemComparatorFactory,
            app_config_1.AbstractAppConfig,
            services_1.ActivityService,
            pipes_1.CaseReferencePipe,
            directives_1.PlaceholderService,
            services_1.BrowserService])
    ], SearchResultComponent);
    return SearchResultComponent;
}());
exports.SearchResultComponent = SearchResultComponent;
//# sourceMappingURL=search-result.component.js.map