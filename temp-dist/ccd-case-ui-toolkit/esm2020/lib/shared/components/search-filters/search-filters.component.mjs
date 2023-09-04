import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { FieldsUtils } from '../../services/fields/fields.utils';
import { JurisdictionService } from '../../services/jurisdiction/jurisdiction.service';
import { OrderService } from '../../services/order/order.service';
import { SearchService } from '../../services/search/search.service';
import { WindowService } from '../../services/window/window.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/search/search.service";
import * as i2 from "../../services/order/order.service";
import * as i3 from "../../services/jurisdiction/jurisdiction.service";
import * as i4 from "../../services/window/window.service";
function SearchFiltersComponent_option_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const j_r3 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", j_r3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, j_r3.name));
} }
function SearchFiltersComponent_option_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ct_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", ct_r4);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, ct_r4.name));
} }
function SearchFiltersComponent_ng_container_16_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "ccd-field-write", 16);
    i0.ɵɵlistener("keyup.enter", function SearchFiltersComponent_ng_container_16_div_2_Template_ccd_field_write_keyup_enter_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r7.apply()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const searchInput_r6 = ctx.$implicit;
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", searchInput_r6.field)("formGroup", ctx_r5.formGroup)("isExpanded", true);
} }
function SearchFiltersComponent_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 13);
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵtemplate(2, SearchFiltersComponent_ng_container_16_div_2_Template, 2, 3, "div", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r2.formGroup)("contextFields", ctx_r2.caseFields);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.searchInputs);
} }
const JURISDICTION_LOC_STORAGE = 'search-jurisdiction';
const META_FIELDS_LOC_STORAGE = 'search-metadata-fields';
const FORM_GROUP_VALUE_LOC_STORAGE = 'search-form-group-value';
const CASE_TYPE_LOC_STORAGE = 'search-caseType';
export class SearchFiltersComponent {
    constructor(searchService, orderService, jurisdictionService, windowService) {
        this.searchService = searchService;
        this.orderService = orderService;
        this.jurisdictionService = jurisdictionService;
        this.windowService = windowService;
        this.PARAM_JURISDICTION = 'jurisdiction';
        this.PARAM_CASE_TYPE = 'case-type';
        this.PARAM_CASE_STATE = 'case-state';
        this.onApply = new EventEmitter();
        this.onReset = new EventEmitter();
        this.onJurisdiction = new EventEmitter();
        this.formGroup = new UntypedFormGroup({});
    }
    ngOnInit() {
        this.selected = {};
        const jurisdiction = this.windowService.getLocalStorage(JURISDICTION_LOC_STORAGE);
        if (this.jurisdictions.length === 1 || jurisdiction) {
            this.selected.jurisdiction = this.jurisdictions[0];
            if (jurisdiction) {
                const localStorageJurisdiction = JSON.parse(jurisdiction);
                this.selected.jurisdiction = this.jurisdictions.filter(j => j.id === localStorageJurisdiction.id)[0];
            }
            this.onJurisdictionIdChange();
        }
        this.selected.formGroup = this.formGroup;
        this.selected.page = 1;
        this.selected.metadataFields = this.getMetadataFields();
        this.onApply.emit({
            selected: this.selected,
            queryParams: this.getQueryParams()
        });
    }
    reset() {
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
    }
    apply() {
        this.selected.formGroup = this.formGroup;
        this.selected.page = 1;
        this.selected.metadataFields = this.getMetadataFields();
        this.populateValuesInLocalStorage();
        this.onApply.emit({
            selected: this.selected,
            queryParams: this.getQueryParams()
        });
        this.setFocusToTop();
    }
    populateValuesInLocalStorage() {
        this.windowService.setLocalStorage(FORM_GROUP_VALUE_LOC_STORAGE, JSON.stringify(this.selected.formGroup.value));
        this.windowService.setLocalStorage(META_FIELDS_LOC_STORAGE, JSON.stringify(this.selected.metadataFields));
        this.windowService.setLocalStorage(JURISDICTION_LOC_STORAGE, JSON.stringify(this.selected.jurisdiction));
        if (this.selected.caseType) {
            this.windowService.setLocalStorage(CASE_TYPE_LOC_STORAGE, JSON.stringify(this.selected.caseType));
        }
    }
    getMetadataFields() {
        if (this.searchInputs) {
            return this.searchInputs
                .filter(searchInput => searchInput.field.metadata === true)
                .map(searchInput => searchInput.field.id);
        }
    }
    isSearchable() {
        let result;
        result = this.selected.jurisdiction !== undefined && this.selected.jurisdiction !== null;
        result = result && this.selected.caseType !== undefined && this.selected.caseType !== null;
        return result;
    }
    isSearchableAndSearchInputsReady() {
        return this.isSearchable() && this.searchInputsReady;
    }
    onJurisdictionIdChange() {
        this.selected.caseType = null;
        this.jurisdictionService.announceSelectedJurisdiction(this.selected.jurisdiction);
        this.selectedJurisdictionCaseTypes = this.selected.jurisdiction.caseTypes;
        this.selectCaseType(this.selectedJurisdictionCaseTypes);
        this.onJurisdiction.emit(this.selected.jurisdiction);
    }
    onCaseTypeIdChange() {
        this.formGroup = new UntypedFormGroup({});
        this.searchInputsReady = false;
        this.searchInputs = [];
        this.searchService.getSearchInputs(this.selected.jurisdiction.id, this.selected.caseType.id).pipe(tap(() => this.searchInputsReady = true)).subscribe(searchInputs => {
            this.searchInputs = searchInputs.sort(this.orderService.sortAsc);
            const formValue = this.windowService.getLocalStorage(FORM_GROUP_VALUE_LOC_STORAGE);
            let formValueObject = null;
            if (formValue) {
                formValueObject = JSON.parse(formValue);
            }
            searchInputs.forEach(item => {
                if (item.field.elementPath) {
                    item.field.id = `${item.field.id}.${item.field.elementPath}`;
                }
                item.field.label = item.label;
                if (formValueObject) {
                    item.field.value = formValueObject[item.field.id];
                }
            });
            this.getCaseFields();
        }, error => {
            console.log('Search input fields request will be discarded reason: ', error.message);
        });
    }
    isJurisdictionSelected() {
        return this.selected.jurisdiction === null ||
            this.selected.jurisdiction === undefined;
    }
    getQueryParams() {
        // Save filters as query parameters for current route
        const queryParams = {};
        if (this.selected.jurisdiction) {
            queryParams[this.PARAM_JURISDICTION] = this.selected.jurisdiction.id;
        }
        if (this.selected.caseType) {
            queryParams[this.PARAM_CASE_TYPE] = this.selected.caseType.id;
        }
        if (this.selected.caseState) {
            queryParams[this.PARAM_CASE_STATE] = this.selected.caseState.id;
        }
        return queryParams;
    }
    selectCaseType(caseTypes) {
        if (caseTypes && caseTypes.length > 0) {
            this.selected.caseType = caseTypes[0];
            const caseType = this.windowService.getLocalStorage(CASE_TYPE_LOC_STORAGE);
            if (caseType) {
                const caseTypeObject = JSON.parse(caseType);
                const result = caseTypes.filter(c => c.id === caseTypeObject.id);
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
    }
    setFocusToTop() {
        window.scrollTo(0, 0);
        const topContainer = document.getElementById('search-result-heading__text');
        if (topContainer) {
            topContainer.focus();
        }
    }
    getCaseFields() {
        if (this.searchInputs) {
            this.caseFields = this.searchInputs.map(item => FieldsUtils.convertToCaseField(item.field));
        }
    }
}
SearchFiltersComponent.ɵfac = function SearchFiltersComponent_Factory(t) { return new (t || SearchFiltersComponent)(i0.ɵɵdirectiveInject(i1.SearchService), i0.ɵɵdirectiveInject(i2.OrderService), i0.ɵɵdirectiveInject(i3.JurisdictionService), i0.ɵɵdirectiveInject(i4.WindowService)); };
SearchFiltersComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SearchFiltersComponent, selectors: [["ccd-search-filters"]], inputs: { jurisdictions: "jurisdictions", autoApply: "autoApply" }, outputs: { onApply: "onApply", onReset: "onReset", onJurisdiction: "onJurisdiction" }, decls: 28, vars: 34, consts: [["aria-label", "Filters", 1, "heading-h2"], [1, "global-display"], [1, "form-group", 2, "margin-top", "13px"], ["for", "s-jurisdiction", 1, "form-label"], ["id", "s-jurisdiction", "name", "jurisdiction", "aria-controls", "search-result", 1, "form-control", "form-control-3-4", "ccd-dropdown", 3, "ngModel", "ngModelChange", "change"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "form-group"], ["for", "s-case-type", 1, "form-label"], ["id", "s-case-type", "name", "case-type", "aria-controls", "search-result", 1, "form-control", "form-control-3-4", "ccd-dropdown", 3, "disabled", "ngModel", "ngModelChange", "change"], ["ccdConditionalShowForm", "", 3, "formGroup", "contextFields", 4, "ngIf"], ["type", "button", 1, "button", 3, "disabled", "title", "click", "keyup.enter"], ["id", "reset", "type", "button", 1, "button", "button-secondary", 3, "title", "click"], [3, "ngValue"], ["ccdConditionalShowForm", "", 3, "formGroup", "contextFields"], ["id", "dynamicFilters"], ["class", "form-group", 4, "ngFor", "ngForOf"], [3, "caseField", "formGroup", "isExpanded", "keyup.enter"]], template: function SearchFiltersComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "h2", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "form", 1)(4, "div", 2)(5, "label", 3);
        i0.ɵɵtext(6);
        i0.ɵɵpipe(7, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "select", 4);
        i0.ɵɵlistener("ngModelChange", function SearchFiltersComponent_Template_select_ngModelChange_8_listener($event) { return ctx.selected.jurisdiction = $event; })("change", function SearchFiltersComponent_Template_select_change_8_listener() { return ctx.onJurisdictionIdChange(); });
        i0.ɵɵtemplate(9, SearchFiltersComponent_option_9_Template, 3, 4, "option", 5);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(10, "div", 6)(11, "label", 7);
        i0.ɵɵtext(12);
        i0.ɵɵpipe(13, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "select", 8);
        i0.ɵɵlistener("ngModelChange", function SearchFiltersComponent_Template_select_ngModelChange_14_listener($event) { return ctx.selected.caseType = $event; })("change", function SearchFiltersComponent_Template_select_change_14_listener() { return ctx.onCaseTypeIdChange(); });
        i0.ɵɵtemplate(15, SearchFiltersComponent_option_15_Template, 3, 4, "option", 5);
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(16, SearchFiltersComponent_ng_container_16_Template, 3, 3, "ng-container", 9);
        i0.ɵɵelementStart(17, "button", 10);
        i0.ɵɵlistener("click", function SearchFiltersComponent_Template_button_click_17_listener() { return ctx.apply(); })("keyup.enter", function SearchFiltersComponent_Template_button_keyup_enter_17_listener() { return ctx.apply(); });
        i0.ɵɵpipe(18, "rpxTranslate");
        i0.ɵɵpipe(19, "rpxTranslate");
        i0.ɵɵtext(20);
        i0.ɵɵpipe(21, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtext(22, " \u00A0\u00A0\u00A0 ");
        i0.ɵɵelementStart(23, "button", 11);
        i0.ɵɵlistener("click", function SearchFiltersComponent_Template_button_click_23_listener() { return ctx.reset(); });
        i0.ɵɵpipe(24, "rpxTranslate");
        i0.ɵɵpipe(25, "rpxTranslate");
        i0.ɵɵtext(26);
        i0.ɵɵpipe(27, "rpxTranslate");
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 16, "Filters"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(7, 18, "Jurisdiction"), "*");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngModel", ctx.selected.jurisdiction);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.jurisdictions);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 20, "Case type*"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isJurisdictionSelected())("ngModel", ctx.selected.caseType);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.selectedJurisdictionCaseTypes);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isSearchableAndSearchInputsReady());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", !ctx.isSearchableAndSearchInputsReady())("title", i0.ɵɵpipeBind1(18, 22, "Apply filter"));
        i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(19, 24, "Apply filter"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(21, 26, "Apply"), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("title", i0.ɵɵpipeBind1(24, 28, "Reset filter"));
        i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(25, 30, "Reset filter"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(27, 32, "Reset"), " ");
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchFiltersComponent, [{
        type: Component,
        args: [{ selector: 'ccd-search-filters', template: "<h2 class=\"heading-h2\" aria-label=\"Filters\">{{'Filters' | rpxTranslate}}</h2>\n<form class=\"global-display\">\n  <div class=\"form-group\" style=\"margin-top: 13px;\">\n    <label class=\"form-label\" for=\"s-jurisdiction\">{{'Jurisdiction' | rpxTranslate}}*</label>\n    <select class=\"form-control form-control-3-4 ccd-dropdown\" id=\"s-jurisdiction\"\n            name=\"jurisdiction\" [(ngModel)]=\"selected.jurisdiction\" aria-controls=\"search-result\"\n            (change)=\"onJurisdictionIdChange()\">\n      <option *ngFor=\"let j of jurisdictions\" [ngValue]=\"j\">{{j.name | rpxTranslate}}</option>\n    </select>\n  </div>\n  <div class=\"form-group\">\n    <label class=\"form-label\" for=\"s-case-type\">{{'Case type*' | rpxTranslate}}</label>\n    <select [disabled]=\"isJurisdictionSelected()\" class=\"form-control form-control-3-4 ccd-dropdown\"\n            id=\"s-case-type\" name=\"case-type\" [(ngModel)]=\"selected.caseType\" aria-controls=\"search-result\"\n            (change)=\"onCaseTypeIdChange()\">\n      <option *ngFor=\"let ct of selectedJurisdictionCaseTypes\" [ngValue]=\"ct\">{{ct.name | rpxTranslate}}</option>\n    </select>\n  </div>\n\n  <ng-container ccdConditionalShowForm *ngIf=\"isSearchableAndSearchInputsReady()\" [formGroup]=\"formGroup\" [contextFields]=\"caseFields\">\n    <div id=\"dynamicFilters\">\n      <div class=\"form-group\" *ngFor=\"let searchInput of searchInputs\">\n        <ccd-field-write [caseField]=\"searchInput.field\" [formGroup]=\"formGroup\" [isExpanded]=\"true\" (keyup.enter)=\"apply()\">\n        </ccd-field-write>\n      </div>\n    </div>\n  </ng-container>\n\n  <button [disabled]=\"!isSearchableAndSearchInputsReady()\" type=\"button\" class=\"button\" (click)=\"apply()\" (keyup.enter)=\"apply()\" [title]=\"'Apply filter' | rpxTranslate\"\n          [attr.aria-label]=\"'Apply filter' | rpxTranslate\">\n    {{'Apply' | rpxTranslate}}\n  </button> &nbsp;&nbsp;&nbsp;\n  <button id=\"reset\" type=\"button\" (click)=\"reset()\" class=\"button button-secondary\"\n          [title]=\"'Reset filter' | rpxTranslate\" [attr.aria-label]=\"'Reset filter' | rpxTranslate\">\n    {{'Reset' | rpxTranslate}}\n  </button>\n</form>\n" }]
    }], function () { return [{ type: i1.SearchService }, { type: i2.OrderService }, { type: i3.JurisdictionService }, { type: i4.WindowService }]; }, { jurisdictions: [{
            type: Input
        }], autoApply: [{
            type: Input
        }], onApply: [{
            type: Output
        }], onReset: [{
            type: Output
        }], onJurisdiction: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZpbHRlcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3NlYXJjaC1maWx0ZXJzL3NlYXJjaC1maWx0ZXJzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9zZWFyY2gtZmlsdGVycy9zZWFyY2gtZmlsdGVycy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU1yQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDdkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7Ozs7SUNML0Qsa0NBQXNEO0lBQUEsWUFBeUI7O0lBQUEsaUJBQVM7OztJQUFoRCw4QkFBYTtJQUFDLGVBQXlCO0lBQXpCLHFEQUF5Qjs7O0lBUS9FLGtDQUF3RTtJQUFBLFlBQTBCOztJQUFBLGlCQUFTOzs7SUFBbEQsK0JBQWM7SUFBQyxlQUEwQjtJQUExQixzREFBMEI7Ozs7SUFNbEcsOEJBQWlFLDBCQUFBO0lB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O1FBR3JCLGVBQWtDO1FBQWxDLHFFQUFrQztRQUVyRCxlQUFtQztRQUFuQyxtREFBbUM7UUFFdkMsZUFBZ0I7UUFBaEIsMkNBQWdCO1FBSUksZUFBK0I7UUFBL0IsMERBQStCO1FBQ25FLGVBQXFDO1FBQXJDLHVEQUFxQyxrQ0FBQTtRQUdwQixlQUFnQztRQUFoQywyREFBZ0M7UUFJckIsZUFBd0M7UUFBeEMsNkRBQXdDO1FBU3RFLGVBQWdEO1FBQWhELGtFQUFnRCxpREFBQTtRQUNoRCxvRUFBaUQ7UUFDdkQsZUFDRjtRQURFLGdFQUNGO1FBRVEsZUFBdUM7UUFBdkMsOERBQXVDO1FBQUMsb0VBQWlEO1FBQy9GLGVBQ0Y7UUFERSxnRUFDRjs7dUZEWFcsc0JBQXNCO2NBTGxDLFNBQVM7MkJBQ0Usb0JBQW9CO3lKQVd2QixhQUFhO2tCQURuQixLQUFLO1lBSUMsU0FBUztrQkFEZixLQUFLO1lBSUMsT0FBTztrQkFEYixNQUFNO1lBSUEsT0FBTztrQkFEYixNQUFNO1lBSUEsY0FBYztrQkFEcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENhc2VGaWVsZCB9IGZyb20gJy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2Nhc2UtZmllbGQubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZVN0YXRlIH0gZnJvbSAnLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS1zdGF0ZS5tb2RlbCc7XG5pbXBvcnQgeyBDYXNlVHlwZUxpdGUgfSBmcm9tICcuLi8uLi9kb21haW4vZGVmaW5pdGlvbi9jYXNlLXR5cGUtbGl0ZS5tb2RlbCc7XG5pbXBvcnQgeyBKdXJpc2RpY3Rpb24gfSBmcm9tICcuLi8uLi9kb21haW4vZGVmaW5pdGlvbi9qdXJpc2RpY3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgRmllbGRzVXRpbHMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9maWVsZHMvZmllbGRzLnV0aWxzJztcbmltcG9ydCB7IEp1cmlzZGljdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9qdXJpc2RpY3Rpb24vanVyaXNkaWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3JkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvb3JkZXIvb3JkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc2VhcmNoL3NlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IFdpbmRvd1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy93aW5kb3cvd2luZG93LnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoSW5wdXQgfSBmcm9tICcuL2RvbWFpbi9zZWFyY2gtaW5wdXQubW9kZWwnO1xuXG5jb25zdCBKVVJJU0RJQ1RJT05fTE9DX1NUT1JBR0UgPSAnc2VhcmNoLWp1cmlzZGljdGlvbic7XG5jb25zdCBNRVRBX0ZJRUxEU19MT0NfU1RPUkFHRSA9ICdzZWFyY2gtbWV0YWRhdGEtZmllbGRzJztcbmNvbnN0IEZPUk1fR1JPVVBfVkFMVUVfTE9DX1NUT1JBR0UgPSAnc2VhcmNoLWZvcm0tZ3JvdXAtdmFsdWUnO1xuY29uc3QgQ0FTRV9UWVBFX0xPQ19TVE9SQUdFID0gJ3NlYXJjaC1jYXNlVHlwZSc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2Qtc2VhcmNoLWZpbHRlcnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLWZpbHRlcnMuY29tcG9uZW50Lmh0bWwnLFxufSlcblxuZXhwb3J0IGNsYXNzIFNlYXJjaEZpbHRlcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgcmVhZG9ubHkgUEFSQU1fSlVSSVNESUNUSU9OID0gJ2p1cmlzZGljdGlvbic7XG4gIHB1YmxpYyByZWFkb25seSBQQVJBTV9DQVNFX1RZUEUgPSAnY2FzZS10eXBlJztcbiAgcHVibGljIHJlYWRvbmx5IFBBUkFNX0NBU0VfU1RBVEUgPSAnY2FzZS1zdGF0ZSc7XG4gIHB1YmxpYyBjYXNlRmllbGRzOiBDYXNlRmllbGRbXTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMganVyaXNkaWN0aW9uczogSnVyaXNkaWN0aW9uW107XG5cbiAgQElucHV0KClcbiAgcHVibGljIGF1dG9BcHBseTogYm9vbGVhbjtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uQXBwbHk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25SZXNldDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvbkp1cmlzZGljdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIHNlYXJjaElucHV0czogU2VhcmNoSW5wdXRbXTtcbiAgcHVibGljIHNlYXJjaElucHV0c1JlYWR5OiBib29sZWFuO1xuXG4gIHB1YmxpYyBzZWxlY3RlZDoge1xuICAgIGp1cmlzZGljdGlvbj86IEp1cmlzZGljdGlvbixcbiAgICBjYXNlVHlwZT86IENhc2VUeXBlTGl0ZSxcbiAgICBmb3JtR3JvdXA/OiBVbnR5cGVkRm9ybUdyb3VwLFxuICAgIGNhc2VTdGF0ZT86IENhc2VTdGF0ZSxcbiAgICBwYWdlPzogbnVtYmVyLFxuICAgIG1ldGFkYXRhRmllbGRzPzogc3RyaW5nW11cbiAgfTtcblxuICBwdWJsaWMgc2VsZWN0ZWRKdXJpc2RpY3Rpb25DYXNlVHlwZXM/OiBDYXNlVHlwZUxpdGVbXTtcblxuICBwdWJsaWMgZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoe30pO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IG9yZGVyU2VydmljZTogT3JkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkganVyaXNkaWN0aW9uU2VydmljZTogSnVyaXNkaWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdpbmRvd1NlcnZpY2U6IFdpbmRvd1NlcnZpY2UpIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkID0ge307XG4gICAgY29uc3QganVyaXNkaWN0aW9uID0gdGhpcy53aW5kb3dTZXJ2aWNlLmdldExvY2FsU3RvcmFnZShKVVJJU0RJQ1RJT05fTE9DX1NUT1JBR0UpO1xuICAgIGlmICh0aGlzLmp1cmlzZGljdGlvbnMubGVuZ3RoID09PSAxIHx8IGp1cmlzZGljdGlvbikge1xuICAgICAgdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24gPSB0aGlzLmp1cmlzZGljdGlvbnNbMF07XG4gICAgICBpZiAoanVyaXNkaWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsU3RvcmFnZUp1cmlzZGljdGlvbiA9IEpTT04ucGFyc2UoanVyaXNkaWN0aW9uKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24gPSB0aGlzLmp1cmlzZGljdGlvbnMuZmlsdGVyKGogPT4gai5pZCA9PT0gbG9jYWxTdG9yYWdlSnVyaXNkaWN0aW9uLmlkKVswXTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25KdXJpc2RpY3Rpb25JZENoYW5nZSgpO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWQuZm9ybUdyb3VwID0gdGhpcy5mb3JtR3JvdXA7XG4gICAgdGhpcy5zZWxlY3RlZC5wYWdlID0gMTtcbiAgICB0aGlzLnNlbGVjdGVkLm1ldGFkYXRhRmllbGRzID0gdGhpcy5nZXRNZXRhZGF0YUZpZWxkcygpO1xuICAgIHRoaXMub25BcHBseS5lbWl0KHtcbiAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkLFxuICAgICAgcXVlcnlQYXJhbXM6IHRoaXMuZ2V0UXVlcnlQYXJhbXMoKVxuICAgIH0pO1xuXG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy53aW5kb3dTZXJ2aWNlLnJlbW92ZUxvY2FsU3RvcmFnZShGT1JNX0dST1VQX1ZBTFVFX0xPQ19TVE9SQUdFKTtcbiAgICB0aGlzLndpbmRvd1NlcnZpY2UucmVtb3ZlTG9jYWxTdG9yYWdlKENBU0VfVFlQRV9MT0NfU1RPUkFHRSk7XG4gICAgdGhpcy53aW5kb3dTZXJ2aWNlLnJlbW92ZUxvY2FsU3RvcmFnZShKVVJJU0RJQ1RJT05fTE9DX1NUT1JBR0UpO1xuICAgIHRoaXMud2luZG93U2VydmljZS5yZW1vdmVMb2NhbFN0b3JhZ2UoTUVUQV9GSUVMRFNfTE9DX1NUT1JBR0UpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB7fTtcbiAgICBpZiAodGhpcy5qdXJpc2RpY3Rpb25zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24gPSB0aGlzLmp1cmlzZGljdGlvbnNbMF07XG4gICAgICB0aGlzLm9uSnVyaXNkaWN0aW9uSWRDaGFuZ2UoKTtcbiAgICB9XG4gICAgdGhpcy5vblJlc2V0LmVtaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseSgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkLmZvcm1Hcm91cCA9IHRoaXMuZm9ybUdyb3VwO1xuICAgIHRoaXMuc2VsZWN0ZWQucGFnZSA9IDE7XG4gICAgdGhpcy5zZWxlY3RlZC5tZXRhZGF0YUZpZWxkcyA9IHRoaXMuZ2V0TWV0YWRhdGFGaWVsZHMoKTtcbiAgICB0aGlzLnBvcHVsYXRlVmFsdWVzSW5Mb2NhbFN0b3JhZ2UoKTtcbiAgICB0aGlzLm9uQXBwbHkuZW1pdCh7XG4gICAgICBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZCxcbiAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLmdldFF1ZXJ5UGFyYW1zKClcbiAgICB9KTtcbiAgICB0aGlzLnNldEZvY3VzVG9Ub3AoKTtcbiAgfVxuXG4gIHB1YmxpYyBwb3B1bGF0ZVZhbHVlc0luTG9jYWxTdG9yYWdlKCk6IHZvaWQge1xuICAgIHRoaXMud2luZG93U2VydmljZS5zZXRMb2NhbFN0b3JhZ2UoRk9STV9HUk9VUF9WQUxVRV9MT0NfU1RPUkFHRSxcbiAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuc2VsZWN0ZWQuZm9ybUdyb3VwLnZhbHVlKSk7XG4gICAgdGhpcy53aW5kb3dTZXJ2aWNlLnNldExvY2FsU3RvcmFnZShNRVRBX0ZJRUxEU19MT0NfU1RPUkFHRSwgSlNPTi5zdHJpbmdpZnkodGhpcy5zZWxlY3RlZC5tZXRhZGF0YUZpZWxkcykpO1xuICAgIHRoaXMud2luZG93U2VydmljZS5zZXRMb2NhbFN0b3JhZ2UoSlVSSVNESUNUSU9OX0xPQ19TVE9SQUdFLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlbGVjdGVkLmp1cmlzZGljdGlvbikpO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkLmNhc2VUeXBlKSB7XG4gICAgICB0aGlzLndpbmRvd1NlcnZpY2Uuc2V0TG9jYWxTdG9yYWdlKENBU0VfVFlQRV9MT0NfU1RPUkFHRSwgSlNPTi5zdHJpbmdpZnkodGhpcy5zZWxlY3RlZC5jYXNlVHlwZSkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRNZXRhZGF0YUZpZWxkcygpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoSW5wdXRzKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWFyY2hJbnB1dHNcbiAgICAgICAgLmZpbHRlcihzZWFyY2hJbnB1dCA9PiBzZWFyY2hJbnB1dC5maWVsZC5tZXRhZGF0YSA9PT0gdHJ1ZSlcbiAgICAgICAgLm1hcChzZWFyY2hJbnB1dCA9PiBzZWFyY2hJbnB1dC5maWVsZC5pZCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzU2VhcmNoYWJsZSgpOiBib29sZWFuIHtcbiAgICBsZXQgcmVzdWx0OiBib29sZWFuO1xuICAgIHJlc3VsdCA9IHRoaXMuc2VsZWN0ZWQuanVyaXNkaWN0aW9uICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24gIT09IG51bGw7XG4gICAgcmVzdWx0ID0gcmVzdWx0ICYmIHRoaXMuc2VsZWN0ZWQuY2FzZVR5cGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNlbGVjdGVkLmNhc2VUeXBlICE9PSBudWxsO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgaXNTZWFyY2hhYmxlQW5kU2VhcmNoSW5wdXRzUmVhZHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNTZWFyY2hhYmxlKCkgJiYgdGhpcy5zZWFyY2hJbnB1dHNSZWFkeTtcbiAgfVxuXG4gIHB1YmxpYyBvbkp1cmlzZGljdGlvbklkQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWQuY2FzZVR5cGUgPSBudWxsO1xuICAgIHRoaXMuanVyaXNkaWN0aW9uU2VydmljZS5hbm5vdW5jZVNlbGVjdGVkSnVyaXNkaWN0aW9uKHRoaXMuc2VsZWN0ZWQuanVyaXNkaWN0aW9uKTtcbiAgICB0aGlzLnNlbGVjdGVkSnVyaXNkaWN0aW9uQ2FzZVR5cGVzID0gdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24uY2FzZVR5cGVzO1xuICAgIHRoaXMuc2VsZWN0Q2FzZVR5cGUodGhpcy5zZWxlY3RlZEp1cmlzZGljdGlvbkNhc2VUeXBlcyk7XG4gICAgdGhpcy5vbkp1cmlzZGljdGlvbi5lbWl0KHRoaXMuc2VsZWN0ZWQuanVyaXNkaWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNhc2VUeXBlSWRDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5mb3JtR3JvdXAgPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSk7XG4gICAgdGhpcy5zZWFyY2hJbnB1dHNSZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMuc2VhcmNoSW5wdXRzID0gW107XG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLmdldFNlYXJjaElucHV0cyhcbiAgICAgIHRoaXMuc2VsZWN0ZWQuanVyaXNkaWN0aW9uLmlkLFxuICAgICAgdGhpcy5zZWxlY3RlZC5jYXNlVHlwZS5pZFxuICAgICkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB0aGlzLnNlYXJjaElucHV0c1JlYWR5ID0gdHJ1ZSlcbiAgICApLnN1YnNjcmliZShzZWFyY2hJbnB1dHMgPT4ge1xuICAgICAgdGhpcy5zZWFyY2hJbnB1dHMgPSBzZWFyY2hJbnB1dHMuc29ydCh0aGlzLm9yZGVyU2VydmljZS5zb3J0QXNjKTtcblxuICAgICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy53aW5kb3dTZXJ2aWNlLmdldExvY2FsU3RvcmFnZShGT1JNX0dST1VQX1ZBTFVFX0xPQ19TVE9SQUdFKTtcbiAgICAgIGxldCBmb3JtVmFsdWVPYmplY3QgPSBudWxsO1xuICAgICAgaWYgKGZvcm1WYWx1ZSkge1xuICAgICAgICBmb3JtVmFsdWVPYmplY3QgPSBKU09OLnBhcnNlKGZvcm1WYWx1ZSk7XG4gICAgICB9XG4gICAgICBzZWFyY2hJbnB1dHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uZmllbGQuZWxlbWVudFBhdGgpIHtcbiAgICAgICAgICBpdGVtLmZpZWxkLmlkID0gYCR7aXRlbS5maWVsZC5pZH0uJHtpdGVtLmZpZWxkLmVsZW1lbnRQYXRofWA7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5maWVsZC5sYWJlbCA9IGl0ZW0ubGFiZWw7XG4gICAgICAgIGlmIChmb3JtVmFsdWVPYmplY3QpIHtcbiAgICAgICAgICBpdGVtLmZpZWxkLnZhbHVlID0gZm9ybVZhbHVlT2JqZWN0W2l0ZW0uZmllbGQuaWRdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZ2V0Q2FzZUZpZWxkcygpO1xuICAgIH0sIGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdTZWFyY2ggaW5wdXQgZmllbGRzIHJlcXVlc3Qgd2lsbCBiZSBkaXNjYXJkZWQgcmVhc29uOiAnLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpc0p1cmlzZGljdGlvblNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkLmp1cmlzZGljdGlvbiA9PT0gbnVsbCB8fFxuICAgICAgdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24gPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UXVlcnlQYXJhbXMoKSB7XG4gICAgLy8gU2F2ZSBmaWx0ZXJzIGFzIHF1ZXJ5IHBhcmFtZXRlcnMgZm9yIGN1cnJlbnQgcm91dGVcbiAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHt9O1xuICAgIGlmICh0aGlzLnNlbGVjdGVkLmp1cmlzZGljdGlvbikge1xuICAgICAgcXVlcnlQYXJhbXNbdGhpcy5QQVJBTV9KVVJJU0RJQ1RJT05dID0gdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24uaWQ7XG4gICAgfVxuICAgIGlmICh0aGlzLnNlbGVjdGVkLmNhc2VUeXBlKSB7XG4gICAgICBxdWVyeVBhcmFtc1t0aGlzLlBBUkFNX0NBU0VfVFlQRV0gPSB0aGlzLnNlbGVjdGVkLmNhc2VUeXBlLmlkO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZWxlY3RlZC5jYXNlU3RhdGUpIHtcbiAgICAgIHF1ZXJ5UGFyYW1zW3RoaXMuUEFSQU1fQ0FTRV9TVEFURV0gPSB0aGlzLnNlbGVjdGVkLmNhc2VTdGF0ZS5pZDtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5UGFyYW1zO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RDYXNlVHlwZShjYXNlVHlwZXM6IENhc2VUeXBlTGl0ZVtdKSB7XG4gICAgaWYgKGNhc2VUeXBlcyAmJiBjYXNlVHlwZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZWxlY3RlZC5jYXNlVHlwZSA9IGNhc2VUeXBlc1swXTtcbiAgICAgIGNvbnN0IGNhc2VUeXBlID0gdGhpcy53aW5kb3dTZXJ2aWNlLmdldExvY2FsU3RvcmFnZShDQVNFX1RZUEVfTE9DX1NUT1JBR0UpO1xuICAgICAgaWYgKGNhc2VUeXBlKSB7XG4gICAgICAgIGNvbnN0IGNhc2VUeXBlT2JqZWN0ID0gSlNPTi5wYXJzZShjYXNlVHlwZSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNhc2VUeXBlcy5maWx0ZXIoYyA9PiBjLmlkID09PSBjYXNlVHlwZU9iamVjdC5pZCk7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuY2FzZVR5cGUgPSByZXN1bHRbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZC5jYXNlVHlwZSA9IGNhc2VUeXBlc1swXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5jYXNlVHlwZSA9IGNhc2VUeXBlc1swXTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25DYXNlVHlwZUlkQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRGb2N1c1RvVG9wKCkge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcblxuICAgIGNvbnN0IHRvcENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtcmVzdWx0LWhlYWRpbmdfX3RleHQnKTtcbiAgICBpZiAodG9wQ29udGFpbmVyKSB7XG4gICAgICB0b3BDb250YWluZXIuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldENhc2VGaWVsZHMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VhcmNoSW5wdXRzKSB7XG4gICAgICB0aGlzLmNhc2VGaWVsZHMgPSB0aGlzLnNlYXJjaElucHV0cy5tYXAoaXRlbSA9PiBGaWVsZHNVdGlscy5jb252ZXJ0VG9DYXNlRmllbGQoaXRlbS5maWVsZCkpO1xuICAgIH1cbiAgfVxufVxuIiwiPGgyIGNsYXNzPVwiaGVhZGluZy1oMlwiIGFyaWEtbGFiZWw9XCJGaWx0ZXJzXCI+e3snRmlsdGVycycgfCBycHhUcmFuc2xhdGV9fTwvaDI+XG48Zm9ybSBjbGFzcz1cImdsb2JhbC1kaXNwbGF5XCI+XG4gIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAxM3B4O1wiPlxuICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIiBmb3I9XCJzLWp1cmlzZGljdGlvblwiPnt7J0p1cmlzZGljdGlvbicgfCBycHhUcmFuc2xhdGV9fSo8L2xhYmVsPlxuICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLTMtNCBjY2QtZHJvcGRvd25cIiBpZD1cInMtanVyaXNkaWN0aW9uXCJcbiAgICAgICAgICAgIG5hbWU9XCJqdXJpc2RpY3Rpb25cIiBbKG5nTW9kZWwpXT1cInNlbGVjdGVkLmp1cmlzZGljdGlvblwiIGFyaWEtY29udHJvbHM9XCJzZWFyY2gtcmVzdWx0XCJcbiAgICAgICAgICAgIChjaGFuZ2UpPVwib25KdXJpc2RpY3Rpb25JZENoYW5nZSgpXCI+XG4gICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBqIG9mIGp1cmlzZGljdGlvbnNcIiBbbmdWYWx1ZV09XCJqXCI+e3tqLm5hbWUgfCBycHhUcmFuc2xhdGV9fTwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCIgZm9yPVwicy1jYXNlLXR5cGVcIj57eydDYXNlIHR5cGUqJyB8IHJweFRyYW5zbGF0ZX19PC9sYWJlbD5cbiAgICA8c2VsZWN0IFtkaXNhYmxlZF09XCJpc0p1cmlzZGljdGlvblNlbGVjdGVkKClcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtMy00IGNjZC1kcm9wZG93blwiXG4gICAgICAgICAgICBpZD1cInMtY2FzZS10eXBlXCIgbmFtZT1cImNhc2UtdHlwZVwiIFsobmdNb2RlbCldPVwic2VsZWN0ZWQuY2FzZVR5cGVcIiBhcmlhLWNvbnRyb2xzPVwic2VhcmNoLXJlc3VsdFwiXG4gICAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2FzZVR5cGVJZENoYW5nZSgpXCI+XG4gICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBjdCBvZiBzZWxlY3RlZEp1cmlzZGljdGlvbkNhc2VUeXBlc1wiIFtuZ1ZhbHVlXT1cImN0XCI+e3tjdC5uYW1lIHwgcnB4VHJhbnNsYXRlfX08L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgPC9kaXY+XG5cbiAgPG5nLWNvbnRhaW5lciBjY2RDb25kaXRpb25hbFNob3dGb3JtICpuZ0lmPVwiaXNTZWFyY2hhYmxlQW5kU2VhcmNoSW5wdXRzUmVhZHkoKVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCIgW2NvbnRleHRGaWVsZHNdPVwiY2FzZUZpZWxkc1wiPlxuICAgIDxkaXYgaWQ9XCJkeW5hbWljRmlsdGVyc1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiAqbmdGb3I9XCJsZXQgc2VhcmNoSW5wdXQgb2Ygc2VhcmNoSW5wdXRzXCI+XG4gICAgICAgIDxjY2QtZmllbGQtd3JpdGUgW2Nhc2VGaWVsZF09XCJzZWFyY2hJbnB1dC5maWVsZFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCIgW2lzRXhwYW5kZWRdPVwidHJ1ZVwiIChrZXl1cC5lbnRlcik9XCJhcHBseSgpXCI+XG4gICAgICAgIDwvY2NkLWZpZWxkLXdyaXRlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxidXR0b24gW2Rpc2FibGVkXT1cIiFpc1NlYXJjaGFibGVBbmRTZWFyY2hJbnB1dHNSZWFkeSgpXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgKGNsaWNrKT1cImFwcGx5KClcIiAoa2V5dXAuZW50ZXIpPVwiYXBwbHkoKVwiIFt0aXRsZV09XCInQXBwbHkgZmlsdGVyJyB8IHJweFRyYW5zbGF0ZVwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInQXBwbHkgZmlsdGVyJyB8IHJweFRyYW5zbGF0ZVwiPlxuICAgIHt7J0FwcGx5JyB8IHJweFRyYW5zbGF0ZX19XG4gIDwvYnV0dG9uPiAmbmJzcDsmbmJzcDsmbmJzcDtcbiAgPGJ1dHRvbiBpZD1cInJlc2V0XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJyZXNldCgpXCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLXNlY29uZGFyeVwiXG4gICAgICAgICAgW3RpdGxlXT1cIidSZXNldCBmaWx0ZXInIHwgcnB4VHJhbnNsYXRlXCIgW2F0dHIuYXJpYS1sYWJlbF09XCInUmVzZXQgZmlsdGVyJyB8IHJweFRyYW5zbGF0ZVwiPlxuICAgIHt7J1Jlc2V0JyB8IHJweFRyYW5zbGF0ZX19XG4gIDwvYnV0dG9uPlxuPC9mb3JtPlxuIl19