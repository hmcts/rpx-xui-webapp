import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { AlertService } from '../../services/alert/alert.service';
import { FieldsUtils } from '../../services/fields/fields.utils';
import { JurisdictionService } from '../../services/jurisdiction/jurisdiction.service';
import { OrderService } from '../../services/order/order.service';
import { WindowService } from '../../services/window/window.service';
import { WorkbasketInputFilterService } from '../../services/workbasket/workbasket-input-filter.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../services/workbasket/workbasket-input-filter.service";
import * as i3 from "../../services/order/order.service";
import * as i4 from "../../services/jurisdiction/jurisdiction.service";
import * as i5 from "../../services/alert/alert.service";
import * as i6 from "../../services/window/window.service";
function WorkbasketFiltersComponent_option_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "Select a value"));
} }
function WorkbasketFiltersComponent_option_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const j_r6 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", j_r6);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, j_r6.name));
} }
function WorkbasketFiltersComponent_option_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "Select a value"));
} }
function WorkbasketFiltersComponent_option_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ct_r7 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", ct_r7);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, ct_r7.name));
} }
function WorkbasketFiltersComponent_option_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cs_r8 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", cs_r8);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, cs_r8.name));
} }
function WorkbasketFiltersComponent_ng_container_27_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2)(1, "ccd-field-write", 18);
    i0.ɵɵlistener("keyup.enter", function WorkbasketFiltersComponent_ng_container_27_div_2_Template_ccd_field_write_keyup_enter_1_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r11.apply(null)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const workbasketInput_r10 = ctx.$implicit;
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", workbasketInput_r10.field)("formGroup", ctx_r9.formGroup)("isExpanded", true)("isInSearchBlock", true);
} }
function WorkbasketFiltersComponent_ng_container_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 15);
    i0.ɵɵelementStart(1, "div", 16);
    i0.ɵɵtemplate(2, WorkbasketFiltersComponent_ng_container_27_div_2_Template, 2, 4, "div", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r5.formGroup)("contextFields", ctx_r5.caseFields);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r5.workbasketInputs);
} }
const FORM_GROUP_VAL_LOC_STORAGE = 'workbasket-filter-form-group-value';
const SAVED_QUERY_PARAM_LOC_STORAGE = 'savedQueryParams';
const REGION_LIST_AND_FRC_FILTER = 'regionList';
export class WorkbasketFiltersComponent {
    constructor(route, workbasketInputFilterService, orderService, jurisdictionService, alertService, windowService) {
        this.route = route;
        this.workbasketInputFilterService = workbasketInputFilterService;
        this.orderService = orderService;
        this.jurisdictionService = jurisdictionService;
        this.alertService = alertService;
        this.windowService = windowService;
        this.onApply = new EventEmitter();
        this.onReset = new EventEmitter();
        this.formGroup = new UntypedFormGroup({});
        this.initialised = false;
    }
    ngOnInit() {
        this.selected = {};
        this.route.queryParams.subscribe(params => {
            if (!this.initialised || !params || !Object.keys(params).length) {
                this.initFilters(false);
                this.initialised = true;
            }
        });
    }
    apply(init) {
        // Save filters as query parameters for current route
        const queryParams = {};
        if (this.selected.jurisdiction) {
            queryParams[WorkbasketFiltersComponent.PARAM_JURISDICTION] = this.selected.jurisdiction.id;
        }
        if (this.selected.caseType) {
            queryParams[WorkbasketFiltersComponent.PARAM_CASE_TYPE] = this.selected.caseType.id;
        }
        if (this.selected.caseState) {
            queryParams[WorkbasketFiltersComponent.PARAM_CASE_STATE] = this.selected.caseState.id;
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
            // Update form group filters
            this.updateFormGroupFilters();
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
        this.onApply.emit({ selected: this.selected, queryParams });
        this.setFocusToTop();
    }
    reset() {
        this.windowService.removeLocalStorage(FORM_GROUP_VAL_LOC_STORAGE);
        this.windowService.removeLocalStorage(SAVED_QUERY_PARAM_LOC_STORAGE);
        setTimeout(() => {
            this.resetFieldsWhenNoDefaults();
            this.onReset.emit(true);
        }, 500);
    }
    getMetadataFields() {
        if (this.workbasketInputs) {
            return this.workbasketInputs
                .filter(workbasketInput => workbasketInput.field.metadata === true)
                .map(workbasketInput => workbasketInput.field.id);
        }
    }
    onJurisdictionIdChange() {
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
    }
    onCaseTypeIdChange() {
        if (this.selected.caseType) {
            this.selectedCaseTypeStates = this.sortStates(this.selected.caseType.states);
            this.selected.caseState = null;
            this.formGroup = new UntypedFormGroup({});
            this.clearWorkbasketInputs();
            if (!this.isApplyButtonDisabled()) {
                this.workbasketInputFilterService.getWorkbasketInputs(this.selected.jurisdiction.id, this.selected.caseType.id).pipe(take(1)).subscribe(workbasketInputs => {
                    this.workbasketInputsReady = true;
                    this.workbasketInputs = workbasketInputs
                        .sort(this.orderService.sortAsc);
                    const formValue = this.windowService.getLocalStorage(FORM_GROUP_VAL_LOC_STORAGE);
                    workbasketInputs.forEach(item => {
                        if (item.field.elementPath) {
                            item.field.id = `${item.field.id}.${item.field.elementPath}`;
                        }
                        item.field.label = item.label;
                        if (formValue) {
                            const searchFormValueObject = JSON.parse(formValue);
                            item.field.value = searchFormValueObject[item.field.id];
                        }
                    });
                    this.getCaseFields();
                }, error => {
                    console.log('Workbasket input fields request will be discarded reason: ', error.message);
                });
            }
        }
        else {
            this.resetCaseState();
        }
    }
    isCaseTypesDropdownDisabled() {
        return !this.selectedJurisdictionCaseTypes;
    }
    isCaseStatesDropdownDisabled() {
        return !this.selected.caseType || !(this.selected.caseType.states && this.selected.caseType.states.length > 0);
    }
    isApplyButtonDisabled() {
        return !(this.selected.jurisdiction && this.selected.caseType);
    }
    isSearchableAndWorkbasketInputsReady() {
        return this.selected.jurisdiction && this.selected.caseType && this.workbasketInputsReady;
    }
    /**
     * This method is used to clear the previously used
     * form group control filter values to make sure only the
     * currently selected form group control filter values are present.
     *
     * Has been implemented for 'Region and FRC filters' and can be extended
     * in future to incorporate other dynamic filters.
     */
    updateFormGroupFilters() {
        // Read the form group local storage
        const formGroupLS = JSON.parse(this.windowService.getLocalStorage(FORM_GROUP_VAL_LOC_STORAGE));
        // Form group local storage is available and contains regionList property
        if (!!formGroupLS && formGroupLS.hasOwnProperty(REGION_LIST_AND_FRC_FILTER)) {
            if (this.formGroup.get(REGION_LIST_AND_FRC_FILTER)) {
                // If regionList value does not match between local storage and form group
                // then the filter value has been changed and we need to clear the old filter values
                if (formGroupLS[REGION_LIST_AND_FRC_FILTER] !== this.formGroup.get(REGION_LIST_AND_FRC_FILTER).value) {
                    for (const key in formGroupLS) {
                        if (formGroupLS.hasOwnProperty(key)) {
                            const value = formGroupLS[key];
                            // Clear the filter form group control values if it has a value in local storage
                            // The regionList form group control value should be ignored as it always contain the latest value
                            if (key !== REGION_LIST_AND_FRC_FILTER && value !== null) {
                                this.formGroup.get(key).setValue(null);
                            }
                        }
                    }
                }
            }
        }
    }
    sortStates(states) {
        return states.sort(this.orderService.sortAsc);
    }
    /**
     * Try to initialise filters based on query parameters or workbasket defaults.
     * Query parameters, when available, take precedence over workbasket defaults.
     */
    initFilters(init) {
        const savedQueryParams = this.windowService.getLocalStorage(SAVED_QUERY_PARAM_LOC_STORAGE);
        const routeSnapshot = this.route.snapshot;
        if (savedQueryParams) {
            routeSnapshot.queryParams = JSON.parse(savedQueryParams);
        }
        const selectedJurisdictionId = routeSnapshot.queryParams[WorkbasketFiltersComponent.PARAM_JURISDICTION] ||
            (this.defaults && this.defaults.jurisdiction_id);
        if (selectedJurisdictionId) {
            this.selected.jurisdiction = this.jurisdictions.find(j => selectedJurisdictionId === j.id);
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
    }
    selectCaseState(caseType, routeSnapshot) {
        let caseState;
        if (caseType) {
            const selectedCaseStateId = this.selectCaseStateIdFromQueryOrDefaults(routeSnapshot, (this.defaults && this.defaults.state_id));
            caseState = caseType.states.find(ct => selectedCaseStateId === ct.id);
        }
        return caseState ? caseState : null;
    }
    selectCaseStateIdFromQueryOrDefaults(routeSnapshot, defaultCaseStateId) {
        return routeSnapshot.queryParams[WorkbasketFiltersComponent.PARAM_CASE_STATE] || defaultCaseStateId;
    }
    selectCaseType(selected, caseTypes, routeSnapshot) {
        let caseType;
        if (selected.jurisdiction) {
            const selectedCaseTypeId = this.selectCaseTypeIdFromQueryOrDefaults(routeSnapshot, (this.defaults && this.defaults.case_type_id));
            caseType = caseTypes.find(ct => selectedCaseTypeId === ct.id);
        }
        return caseType ? caseType : caseTypes[0];
    }
    selectCaseTypeIdFromQueryOrDefaults(routeSnapshot, defaultCaseTypeId) {
        return routeSnapshot.queryParams[WorkbasketFiltersComponent.PARAM_CASE_TYPE] || defaultCaseTypeId;
    }
    resetFieldsWhenNoDefaults() {
        this.resetCaseState();
        this.resetCaseType();
        this.clearWorkbasketInputs();
        this.workbasketDefaults = false;
        this.selected.jurisdiction = null;
        this.initialised = false;
        this.initFilters(true);
    }
    clearWorkbasketInputs() {
        this.workbasketInputsReady = false;
        this.workbasketInputs = [];
    }
    resetCaseState() {
        this.defaults.state_id = null;
        this.selected.caseState = null;
        this.selectedCaseTypeStates = null;
    }
    resetCaseType() {
        this.selected.caseType = undefined; // option should be blank rather than "Select a value" in case of reset.
        this.selectedJurisdictionCaseTypes = null;
    }
    setFocusToTop() {
        window.scrollTo(0, 0);
        const topContainer = document.getElementById('search-result-heading__text');
        if (topContainer) {
            topContainer.focus();
        }
    }
    getCaseFields() {
        if (this.workbasketInputs) {
            this.caseFields = this.workbasketInputs.map(item => FieldsUtils.convertToCaseField(item.field));
        }
    }
}
WorkbasketFiltersComponent.PARAM_JURISDICTION = 'jurisdiction';
WorkbasketFiltersComponent.PARAM_CASE_TYPE = 'case-type';
WorkbasketFiltersComponent.PARAM_CASE_STATE = 'case-state';
WorkbasketFiltersComponent.ɵfac = function WorkbasketFiltersComponent_Factory(t) { return new (t || WorkbasketFiltersComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.WorkbasketInputFilterService), i0.ɵɵdirectiveInject(i3.OrderService), i0.ɵɵdirectiveInject(i4.JurisdictionService), i0.ɵɵdirectiveInject(i5.AlertService), i0.ɵɵdirectiveInject(i6.WindowService)); };
WorkbasketFiltersComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WorkbasketFiltersComponent, selectors: [["ccd-workbasket-filters"]], inputs: { jurisdictions: "jurisdictions", defaults: "defaults" }, outputs: { onApply: "onApply", onReset: "onReset" }, decls: 39, vars: 46, consts: [["aria-label", "Filters", 1, "heading-h2"], [1, "global-display"], [1, "form-group"], ["for", "wb-jurisdiction", 1, "form-label"], ["id", "wb-jurisdiction", "name", "jurisdiction", "aria-controls", "search-result", 1, "form-control", "form-control-3-4", "ccd-dropdown", 3, "ngModel", "ngModelChange", "change"], [3, "ngValue", 4, "ngIf"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["for", "wb-case-type", 1, "form-label"], ["id", "wb-case-type", "name", "case-type", "aria-controls", "search-result", 1, "form-control", "form-control-3-4", "ccd-dropdown", 3, "ngModel", "disabled", "ngModelChange", "change"], ["for", "wb-case-state", 1, "form-label"], ["id", "wb-case-state", "name", "state", "aria-controls", "search-result", 1, "form-control", "form-control-3-4", "ccd-dropdown", 3, "ngModel", "disabled", "ngModelChange"], [3, "ngValue"], ["ccdConditionalShowForm", "", 3, "formGroup", "contextFields", 4, "ngIf"], ["type", "button", 1, "button", "workbasket-filters-apply", 3, "disabled", "title", "click"], ["type", "button", 1, "button", "button-secondary", 3, "title", "click"], ["ccdConditionalShowForm", "", 3, "formGroup", "contextFields"], ["id", "dynamicFilters"], ["class", "form-group", 4, "ngFor", "ngForOf"], [3, "caseField", "formGroup", "isExpanded", "isInSearchBlock", "keyup.enter"]], template: function WorkbasketFiltersComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "h2", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "form", 1)(4, "div", 2)(5, "label", 3);
        i0.ɵɵtext(6);
        i0.ɵɵpipe(7, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "select", 4);
        i0.ɵɵlistener("ngModelChange", function WorkbasketFiltersComponent_Template_select_ngModelChange_8_listener($event) { return ctx.selected.jurisdiction = $event; })("change", function WorkbasketFiltersComponent_Template_select_change_8_listener() { return ctx.onJurisdictionIdChange(); });
        i0.ɵɵtemplate(9, WorkbasketFiltersComponent_option_9_Template, 3, 4, "option", 5);
        i0.ɵɵtemplate(10, WorkbasketFiltersComponent_option_10_Template, 3, 4, "option", 6);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(11, "div", 2)(12, "label", 7);
        i0.ɵɵtext(13);
        i0.ɵɵpipe(14, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "select", 8);
        i0.ɵɵlistener("ngModelChange", function WorkbasketFiltersComponent_Template_select_ngModelChange_15_listener($event) { return ctx.selected.caseType = $event; })("change", function WorkbasketFiltersComponent_Template_select_change_15_listener() { return ctx.onCaseTypeIdChange(); });
        i0.ɵɵtemplate(16, WorkbasketFiltersComponent_option_16_Template, 3, 4, "option", 5);
        i0.ɵɵtemplate(17, WorkbasketFiltersComponent_option_17_Template, 3, 4, "option", 6);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(18, "div", 2)(19, "label", 9);
        i0.ɵɵtext(20);
        i0.ɵɵpipe(21, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "select", 10);
        i0.ɵɵlistener("ngModelChange", function WorkbasketFiltersComponent_Template_select_ngModelChange_22_listener($event) { return ctx.selected.caseState = $event; });
        i0.ɵɵelementStart(23, "option", 11);
        i0.ɵɵtext(24);
        i0.ɵɵpipe(25, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(26, WorkbasketFiltersComponent_option_26_Template, 3, 4, "option", 6);
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(27, WorkbasketFiltersComponent_ng_container_27_Template, 3, 3, "ng-container", 12);
        i0.ɵɵelementStart(28, "button", 13);
        i0.ɵɵlistener("click", function WorkbasketFiltersComponent_Template_button_click_28_listener() { return ctx.apply(true); });
        i0.ɵɵpipe(29, "rpxTranslate");
        i0.ɵɵpipe(30, "rpxTranslate");
        i0.ɵɵtext(31);
        i0.ɵɵpipe(32, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtext(33, " \u00A0\u00A0\u00A0 ");
        i0.ɵɵelementStart(34, "button", 14);
        i0.ɵɵlistener("click", function WorkbasketFiltersComponent_Template_button_click_34_listener() { return ctx.reset(); });
        i0.ɵɵpipe(35, "rpxTranslate");
        i0.ɵɵpipe(36, "rpxTranslate");
        i0.ɵɵtext(37);
        i0.ɵɵpipe(38, "rpxTranslate");
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 24, "Filters"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 26, "Jurisdiction"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngModel", ctx.selected.jurisdiction);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.workbasketDefaults);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.jurisdictions);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 28, "Case type"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngModel", ctx.selected.caseType)("disabled", ctx.isCaseTypesDropdownDisabled());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.workbasketDefaults);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.selectedJurisdictionCaseTypes);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 30, "State"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngModel", ctx.selected.caseState)("disabled", ctx.isCaseStatesDropdownDisabled());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngValue", null);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(25, 32, "Any"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.selectedCaseTypeStates);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isSearchableAndWorkbasketInputsReady());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx.isApplyButtonDisabled())("title", i0.ɵɵpipeBind1(29, 34, "Apply filter"));
        i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(30, 36, "Apply filter"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(32, 38, "Apply"), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("title", i0.ɵɵpipeBind1(35, 40, "Reset filter"));
        i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(36, 42, "Reset filter"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(38, 44, "Reset"), " ");
    } }, styles: ["div[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{font-family:nta,Arial,sans-serif;font-weight:400;text-transform:none;font-size:11pt;line-height:1.2727272727}@media (min-width: 641px){div[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{font-size:12pt;line-height:1.3333333333}}.form-group[_ngcontent-%COMP%]{margin-bottom:7px}.ccd-dropdown[_ngcontent-%COMP%]{width:100%}span.heading-medium[_ngcontent-%COMP%]{margin-top:0}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkbasketFiltersComponent, [{
        type: Component,
        args: [{ selector: 'ccd-workbasket-filters', template: "<h2 class=\"heading-h2\" aria-label=\"Filters\">{{'Filters' | rpxTranslate }}</h2>\n\n<form class=\"global-display\">\n  <div class=\"form-group\">\n    <label class=\"form-label\" for=\"wb-jurisdiction\">{{'Jurisdiction' | rpxTranslate}}</label>\n    <select class=\"form-control form-control-3-4 ccd-dropdown\" id=\"wb-jurisdiction\"\n            name=\"jurisdiction\" [(ngModel)]=\"selected.jurisdiction\" aria-controls=\"search-result\"\n            (change)=\"onJurisdictionIdChange()\">\n      <option *ngIf=\"!workbasketDefaults\" [ngValue]=\"null\">{{'Select a value' | rpxTranslate}}</option>\n      <option *ngFor=\"let j of jurisdictions\" [ngValue]=\"j\">{{j.name | rpxTranslate}}</option>\n    </select>\n  </div>\n\n  <div class=\"form-group\">\n    <label class=\"form-label\" for=\"wb-case-type\">{{'Case type' | rpxTranslate}}</label>\n    <select class=\"form-control form-control-3-4 ccd-dropdown\" id=\"wb-case-type\"\n            name=\"case-type\" [(ngModel)]=\"selected.caseType\" [disabled]=\"isCaseTypesDropdownDisabled()\"\n            (change)=\"onCaseTypeIdChange()\" aria-controls=\"search-result\">\n      <option *ngIf=\"!workbasketDefaults\" [ngValue]=\"null\">{{'Select a value' | rpxTranslate}}</option>\n      <option *ngFor=\"let ct of selectedJurisdictionCaseTypes\" [ngValue]=\"ct\">{{ct.name | rpxTranslate}}</option>\n    </select>\n  </div>\n\n  <div class=\"form-group\">\n    <label class=\"form-label\" for=\"wb-case-state\">{{'State' | rpxTranslate}}</label>\n    <select class=\"form-control form-control-3-4 ccd-dropdown\" id=\"wb-case-state\"\n            name=\"state\" [(ngModel)]=\"selected.caseState\" [disabled]=\"isCaseStatesDropdownDisabled()\"\n            aria-controls=\"search-result\">\n      <option [ngValue]=\"null\">{{'Any' | rpxTranslate}}</option>\n      <option *ngFor=\"let cs of selectedCaseTypeStates\" [ngValue]=\"cs\">{{cs.name | rpxTranslate}}</option>\n    </select>\n  </div>\n\n  <ng-container ccdConditionalShowForm *ngIf=\"isSearchableAndWorkbasketInputsReady()\" [formGroup]=\"formGroup\" [contextFields]=\"caseFields\">\n    <div id=\"dynamicFilters\">\n      <div class=\"form-group\" *ngFor=\"let workbasketInput of workbasketInputs\">\n        <ccd-field-write [caseField]=\"workbasketInput.field\" [formGroup]=\"formGroup\" [isExpanded]=\"true\" [isInSearchBlock]=\"true\" (keyup.enter)=\"apply(null)\">\n        </ccd-field-write>\n      </div>\n    </div>\n  </ng-container>\n\n  <button type=\"button\" class=\"button workbasket-filters-apply\" (click)=\"apply(true)\" [disabled]=\"isApplyButtonDisabled()\"\n          [title]=\"'Apply filter' | rpxTranslate\" [attr.aria-label]=\"'Apply filter' | rpxTranslate\">\n    {{'Apply' | rpxTranslate}}\n  </button> &nbsp;&nbsp;&nbsp;\n  <button type=\"button\" (click)=\"reset()\" class=\"button button-secondary\"\n          [title]=\"'Reset filter' | rpxTranslate\" [attr.aria-label]=\"'Reset filter' | rpxTranslate\">\n    {{'Reset' | rpxTranslate}}\n  </button>\n</form>\n", styles: ["div select{font-family:nta,Arial,sans-serif;font-weight:400;text-transform:none;font-size:11pt;line-height:1.2727272727}@media (min-width: 641px){div select{font-size:12pt;line-height:1.3333333333}}.form-group{margin-bottom:7px}.ccd-dropdown{width:100%}span.heading-medium{margin-top:0}\n"] }]
    }], function () { return [{ type: i1.ActivatedRoute }, { type: i2.WorkbasketInputFilterService }, { type: i3.OrderService }, { type: i4.JurisdictionService }, { type: i5.AlertService }, { type: i6.WindowService }]; }, { jurisdictions: [{
            type: Input
        }], defaults: [{
            type: Input
        }], onApply: [{
            type: Output
        }], onReset: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Jhc2tldC1maWx0ZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy93b3JrYmFza2V0LWZpbHRlcnMvd29ya2Jhc2tldC1maWx0ZXJzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy93b3JrYmFza2V0LWZpbHRlcnMvd29ya2Jhc2tldC1maWx0ZXJzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGNBQWMsRUFBMEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFNdEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDJEQUEyRCxDQUFDOzs7Ozs7Ozs7SUNObkcsa0NBQXFEO0lBQUEsWUFBbUM7O0lBQUEsaUJBQVM7O0lBQTdELDhCQUFnQjtJQUFDLGVBQW1DO0lB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aUM7UUFFckQsZUFBbUM7UUFBbkMsbURBQW1DO1FBRXBELGVBQXlCO1FBQXpCLDhDQUF5QjtRQUNaLGVBQWdCO1FBQWhCLDJDQUFnQjtRQUtLLGVBQThCO1FBQTlCLHlEQUE4QjtRQUVsRCxlQUErQjtRQUEvQiwrQ0FBK0IsK0NBQUE7UUFFN0MsZUFBeUI7UUFBekIsOENBQXlCO1FBQ1gsZUFBZ0M7UUFBaEMsMkRBQWdDO1FBS1gsZUFBMEI7UUFBMUIscURBQTBCO1FBRW5ELGVBQWdDO1FBQWhDLGdEQUFnQyxnREFBQTtRQUUzQyxlQUFnQjtRQUFoQiw4QkFBZ0I7UUFBQyxlQUF3QjtRQUF4QixtREFBd0I7UUFDMUIsZUFBeUI7UUFBekIsb0RBQXlCO1FBSWQsZUFBNEM7UUFBNUMsaUVBQTRDO1FBU0UsZUFBb0M7UUFBcEMsc0RBQW9DLGlEQUFBO1FBQ3hFLG9FQUFpRDtRQUMvRixlQUNGO1FBREUsZ0VBQ0Y7UUFFUSxlQUF1QztRQUF2Qyw4REFBdUM7UUFBQyxvRUFBaUQ7UUFDL0YsZUFDRjtRQURFLGdFQUNGOzt1RkR4QlcsMEJBQTBCO2NBTHRDLFNBQVM7MkJBQ0Usd0JBQXdCO2dPQVczQixhQUFhO2tCQURuQixLQUFLO1lBSUMsUUFBUTtrQkFEZCxLQUFLO1lBSUMsT0FBTztrQkFEYixNQUFNO1lBSUEsT0FBTztrQkFEYixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi9kb21haW4vZGVmaW5pdGlvbi9jYXNlLWZpZWxkLm1vZGVsJztcbmltcG9ydCB7IENhc2VTdGF0ZSB9IGZyb20gJy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2Nhc2Utc3RhdGUubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZVR5cGVMaXRlIH0gZnJvbSAnLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS10eXBlLWxpdGUubW9kZWwnO1xuaW1wb3J0IHsgSnVyaXNkaWN0aW9uIH0gZnJvbSAnLi4vLi4vZG9tYWluL2RlZmluaXRpb24vanVyaXNkaWN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFdvcmtiYXNrZXRJbnB1dE1vZGVsIH0gZnJvbSAnLi4vLi4vZG9tYWluL3dvcmtiYXNrZXQvd29ya2Jhc2tldC1pbnB1dC5tb2RlbCc7XG5pbXBvcnQgeyBBbGVydFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbGVydC9hbGVydC5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkc1V0aWxzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmllbGRzL2ZpZWxkcy51dGlscyc7XG5pbXBvcnQgeyBKdXJpc2RpY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvanVyaXNkaWN0aW9uL2p1cmlzZGljdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29yZGVyL29yZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2luZG93U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3dpbmRvdy93aW5kb3cuc2VydmljZSc7XG5pbXBvcnQgeyBXb3JrYmFza2V0SW5wdXRGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvd29ya2Jhc2tldC93b3JrYmFza2V0LWlucHV0LWZpbHRlci5zZXJ2aWNlJztcblxuY29uc3QgRk9STV9HUk9VUF9WQUxfTE9DX1NUT1JBR0UgPSAnd29ya2Jhc2tldC1maWx0ZXItZm9ybS1ncm91cC12YWx1ZSc7XG5jb25zdCBTQVZFRF9RVUVSWV9QQVJBTV9MT0NfU1RPUkFHRSA9ICdzYXZlZFF1ZXJ5UGFyYW1zJztcbmNvbnN0IFJFR0lPTl9MSVNUX0FORF9GUkNfRklMVEVSID0gJ3JlZ2lvbkxpc3QnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2Qtd29ya2Jhc2tldC1maWx0ZXJzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtiYXNrZXQtZmlsdGVycy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtiYXNrZXQtZmlsdGVycy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtiYXNrZXRGaWx0ZXJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBQQVJBTV9KVVJJU0RJQ1RJT04gPSAnanVyaXNkaWN0aW9uJztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBQQVJBTV9DQVNFX1RZUEUgPSAnY2FzZS10eXBlJztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBQQVJBTV9DQVNFX1NUQVRFID0gJ2Nhc2Utc3RhdGUnO1xuICBwdWJsaWMgY2FzZUZpZWxkczogQ2FzZUZpZWxkW107XG5cbiAgQElucHV0KClcbiAgcHVibGljIGp1cmlzZGljdGlvbnM6IEp1cmlzZGljdGlvbltdO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBkZWZhdWx0cztcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uQXBwbHk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25SZXNldDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIHdvcmtiYXNrZXRJbnB1dHM6IFdvcmtiYXNrZXRJbnB1dE1vZGVsW107XG4gIHB1YmxpYyB3b3JrYmFza2V0SW5wdXRzUmVhZHk6IGJvb2xlYW47XG5cbiAgcHVibGljIHdvcmtiYXNrZXREZWZhdWx0czogYm9vbGVhbjtcblxuICBwdWJsaWMgc2VsZWN0ZWQ6IHtcbiAgICBpbml0PzogYm9vbGVhbixcbiAgICBqdXJpc2RpY3Rpb24/OiBKdXJpc2RpY3Rpb24sXG4gICAgY2FzZVR5cGU/OiBDYXNlVHlwZUxpdGUsXG4gICAgY2FzZVN0YXRlPzogQ2FzZVN0YXRlLFxuICAgIGZvcm1Hcm91cD86IFVudHlwZWRGb3JtR3JvdXAsXG4gICAgcGFnZT86IG51bWJlcixcbiAgICBtZXRhZGF0YUZpZWxkcz86IHN0cmluZ1tdXG4gIH07XG5cbiAgcHVibGljIGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cCA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KTtcblxuICBwdWJsaWMgc2VsZWN0ZWRKdXJpc2RpY3Rpb25DYXNlVHlwZXM/OiBDYXNlVHlwZUxpdGVbXTtcbiAgcHVibGljIHNlbGVjdGVkQ2FzZVR5cGVTdGF0ZXM/OiBDYXNlU3RhdGVbXTtcblxuICBwdWJsaWMgaW5pdGlhbGlzZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdvcmtiYXNrZXRJbnB1dEZpbHRlclNlcnZpY2U6IFdvcmtiYXNrZXRJbnB1dEZpbHRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBvcmRlclNlcnZpY2U6IE9yZGVyU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGp1cmlzZGljdGlvblNlcnZpY2U6IEp1cmlzZGljdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBhbGVydFNlcnZpY2U6IEFsZXJ0U2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdpbmRvd1NlcnZpY2U6IFdpbmRvd1NlcnZpY2UpIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkID0ge307XG4gICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgIGlmICghdGhpcy5pbml0aWFsaXNlZCB8fCAhcGFyYW1zIHx8ICFPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmluaXRGaWx0ZXJzKGZhbHNlKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXNlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXBwbHkoaW5pdCk6IHZvaWQge1xuICAgIC8vIFNhdmUgZmlsdGVycyBhcyBxdWVyeSBwYXJhbWV0ZXJzIGZvciBjdXJyZW50IHJvdXRlXG4gICAgY29uc3QgcXVlcnlQYXJhbXMgPSB7fTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24pIHtcbiAgICAgIHF1ZXJ5UGFyYW1zW1dvcmtiYXNrZXRGaWx0ZXJzQ29tcG9uZW50LlBBUkFNX0pVUklTRElDVElPTl0gPSB0aGlzLnNlbGVjdGVkLmp1cmlzZGljdGlvbi5pZDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQuY2FzZVR5cGUpIHtcbiAgICAgIHF1ZXJ5UGFyYW1zW1dvcmtiYXNrZXRGaWx0ZXJzQ29tcG9uZW50LlBBUkFNX0NBU0VfVFlQRV0gPSB0aGlzLnNlbGVjdGVkLmNhc2VUeXBlLmlkO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZWxlY3RlZC5jYXNlU3RhdGUpIHtcbiAgICAgIHF1ZXJ5UGFyYW1zW1dvcmtiYXNrZXRGaWx0ZXJzQ29tcG9uZW50LlBBUkFNX0NBU0VfU1RBVEVdID0gdGhpcy5zZWxlY3RlZC5jYXNlU3RhdGUuaWQ7XG4gICAgfVxuICAgIC8vIHdpdGhvdXQgZXhwbGljaXRseSBwcmVzZXJ2aW5nIGFsZXJ0cyBhbnkgbWVzc2FnZSBvbiB0aGUgcGFnZVxuICAgIC8vIHdvdWxkIGJlIGNsZWFyZWQgb3V0IGJlY2F1c2Ugb2YgdGhpcyBpbml0aWFsIG5hdmlnYXRpb24uXG4gICAgLy8gVGhlIGFib3ZlIGlzIG9ubHkgdHJ1ZSBpZiBubyBhbGVydHMgd2VyZSBzZXQgcHJpb3IgdG8gbG9hZGluZyBjYXNlIGxpc3QgcGFnZS5cbiAgICBpZiAoIXRoaXMuYWxlcnRTZXJ2aWNlLmlzUHJlc2VydmVBbGVydHMoKSkge1xuICAgICAgdGhpcy5hbGVydFNlcnZpY2Uuc2V0UHJlc2VydmVBbGVydHMoIXRoaXMuaW5pdGlhbGlzZWQpO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5mb3JtR3JvdXAuY29udHJvbHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5zZWxlY3RlZC5mb3JtR3JvdXAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKEZPUk1fR1JPVVBfVkFMX0xPQ19TVE9SQUdFKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVwZGF0ZSBmb3JtIGdyb3VwIGZpbHRlcnNcbiAgICAgIHRoaXMudXBkYXRlRm9ybUdyb3VwRmlsdGVycygpO1xuXG4gICAgICB0aGlzLnNlbGVjdGVkLmZvcm1Hcm91cCA9IHRoaXMuZm9ybUdyb3VwO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkLmluaXQgPSBpbml0O1xuICAgIHRoaXMuc2VsZWN0ZWQucGFnZSA9IDE7XG4gICAgdGhpcy5zZWxlY3RlZC5tZXRhZGF0YUZpZWxkcyA9IHRoaXMuZ2V0TWV0YWRhdGFGaWVsZHMoKTtcbiAgICBpZiAoaW5pdCkge1xuICAgICAgdGhpcy53aW5kb3dTZXJ2aWNlLnNldExvY2FsU3RvcmFnZShTQVZFRF9RVUVSWV9QQVJBTV9MT0NfU1RPUkFHRSwgSlNPTi5zdHJpbmdpZnkocXVlcnlQYXJhbXMpKTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmZvcm1Hcm91cC5jb250cm9scykubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLndpbmRvd1NlcnZpY2Uuc2V0TG9jYWxTdG9yYWdlKEZPUk1fR1JPVVBfVkFMX0xPQ19TVE9SQUdFLCBKU09OLnN0cmluZ2lmeSh0aGlzLmZvcm1Hcm91cC52YWx1ZSkpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBBcHBseSBmaWx0ZXJzXG4gICAgdGhpcy5vbkFwcGx5LmVtaXQoeyBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZCwgcXVlcnlQYXJhbXMgfSk7XG4gICAgdGhpcy5zZXRGb2N1c1RvVG9wKCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy53aW5kb3dTZXJ2aWNlLnJlbW92ZUxvY2FsU3RvcmFnZShGT1JNX0dST1VQX1ZBTF9MT0NfU1RPUkFHRSk7XG4gICAgdGhpcy53aW5kb3dTZXJ2aWNlLnJlbW92ZUxvY2FsU3RvcmFnZShTQVZFRF9RVUVSWV9QQVJBTV9MT0NfU1RPUkFHRSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlc2V0RmllbGRzV2hlbk5vRGVmYXVsdHMoKTtcbiAgICAgIHRoaXMub25SZXNldC5lbWl0KHRydWUpO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWV0YWRhdGFGaWVsZHMoKTogc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLndvcmtiYXNrZXRJbnB1dHMpIHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtiYXNrZXRJbnB1dHNcbiAgICAgICAgLmZpbHRlcih3b3JrYmFza2V0SW5wdXQgPT4gd29ya2Jhc2tldElucHV0LmZpZWxkLm1ldGFkYXRhID09PSB0cnVlKVxuICAgICAgICAubWFwKHdvcmtiYXNrZXRJbnB1dCA9PiB3b3JrYmFza2V0SW5wdXQuZmllbGQuaWQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkp1cmlzZGljdGlvbklkQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkLmp1cmlzZGljdGlvbikge1xuICAgICAgdGhpcy5qdXJpc2RpY3Rpb25TZXJ2aWNlLmFubm91bmNlU2VsZWN0ZWRKdXJpc2RpY3Rpb24odGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24pO1xuICAgICAgdGhpcy5zZWxlY3RlZEp1cmlzZGljdGlvbkNhc2VUeXBlcyA9IHRoaXMuc2VsZWN0ZWQuanVyaXNkaWN0aW9uLmNhc2VUeXBlcy5sZW5ndGggPiAwID8gdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24uY2FzZVR5cGVzIDogbnVsbDtcbiAgICAgIC8vIExpbmUgd2FzIHRvbyBsb25nIGZvciBsaW50aW5nIHNvIHJlZmFjdG9yZWQgaXQuXG4gICAgICBpZiAodGhpcy53b3JrYmFza2V0RGVmYXVsdHMgJiYgdGhpcy5zZWxlY3RlZEp1cmlzZGljdGlvbkNhc2VUeXBlcykge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLmNhc2VUeXBlID0gdGhpcy5zZWxlY3RlZEp1cmlzZGljdGlvbkNhc2VUeXBlc1swXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQuY2FzZVR5cGUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNlbGVjdGVkLmNhc2VTdGF0ZSA9IG51bGw7XG4gICAgICB0aGlzLmNsZWFyV29ya2Jhc2tldElucHV0cygpO1xuXG4gICAgICBpZiAoIXRoaXMuaXNBcHBseUJ1dHRvbkRpc2FibGVkKCkpIHtcbiAgICAgICAgdGhpcy5vbkNhc2VUeXBlSWRDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXNldENhc2VUeXBlKCk7XG4gICAgICB0aGlzLnJlc2V0Q2FzZVN0YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQ2FzZVR5cGVJZENoYW5nZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZC5jYXNlVHlwZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZENhc2VUeXBlU3RhdGVzID0gdGhpcy5zb3J0U3RhdGVzKHRoaXMuc2VsZWN0ZWQuY2FzZVR5cGUuc3RhdGVzKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWQuY2FzZVN0YXRlID0gbnVsbDtcbiAgICAgIHRoaXMuZm9ybUdyb3VwID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoe30pO1xuICAgICAgdGhpcy5jbGVhcldvcmtiYXNrZXRJbnB1dHMoKTtcbiAgICAgIGlmICghdGhpcy5pc0FwcGx5QnV0dG9uRGlzYWJsZWQoKSkge1xuICAgICAgICB0aGlzLndvcmtiYXNrZXRJbnB1dEZpbHRlclNlcnZpY2UuZ2V0V29ya2Jhc2tldElucHV0cyh0aGlzLnNlbGVjdGVkLmp1cmlzZGljdGlvbi5pZCwgdGhpcy5zZWxlY3RlZC5jYXNlVHlwZS5pZCkucGlwZShcbiAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICkuc3Vic2NyaWJlKHdvcmtiYXNrZXRJbnB1dHMgPT4ge1xuICAgICAgICAgIHRoaXMud29ya2Jhc2tldElucHV0c1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLndvcmtiYXNrZXRJbnB1dHMgPSB3b3JrYmFza2V0SW5wdXRzXG4gICAgICAgICAgICAuc29ydCh0aGlzLm9yZGVyU2VydmljZS5zb3J0QXNjKTtcbiAgICAgICAgICBjb25zdCBmb3JtVmFsdWUgPSB0aGlzLndpbmRvd1NlcnZpY2UuZ2V0TG9jYWxTdG9yYWdlKEZPUk1fR1JPVVBfVkFMX0xPQ19TVE9SQUdFKTtcblxuICAgICAgICAgIHdvcmtiYXNrZXRJbnB1dHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmZpZWxkLmVsZW1lbnRQYXRoKSB7XG4gICAgICAgICAgICAgIGl0ZW0uZmllbGQuaWQgPSBgJHtpdGVtLmZpZWxkLmlkfS4ke2l0ZW0uZmllbGQuZWxlbWVudFBhdGh9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW0uZmllbGQubGFiZWwgPSBpdGVtLmxhYmVsO1xuICAgICAgICAgICAgaWYgKGZvcm1WYWx1ZSkge1xuICAgICAgICAgICAgICBjb25zdCBzZWFyY2hGb3JtVmFsdWVPYmplY3QgPSBKU09OLnBhcnNlKGZvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgIGl0ZW0uZmllbGQudmFsdWUgPSBzZWFyY2hGb3JtVmFsdWVPYmplY3RbaXRlbS5maWVsZC5pZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5nZXRDYXNlRmllbGRzKCk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnV29ya2Jhc2tldCBpbnB1dCBmaWVsZHMgcmVxdWVzdCB3aWxsIGJlIGRpc2NhcmRlZCByZWFzb246ICcsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXNldENhc2VTdGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0Nhc2VUeXBlc0Ryb3Bkb3duRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLnNlbGVjdGVkSnVyaXNkaWN0aW9uQ2FzZVR5cGVzO1xuICB9XG5cbiAgcHVibGljIGlzQ2FzZVN0YXRlc0Ryb3Bkb3duRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLnNlbGVjdGVkLmNhc2VUeXBlIHx8ICEodGhpcy5zZWxlY3RlZC5jYXNlVHlwZS5zdGF0ZXMgJiYgdGhpcy5zZWxlY3RlZC5jYXNlVHlwZS5zdGF0ZXMubGVuZ3RoID4gMCk7XG4gIH1cblxuICBwdWJsaWMgaXNBcHBseUJ1dHRvbkRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKHRoaXMuc2VsZWN0ZWQuanVyaXNkaWN0aW9uICYmIHRoaXMuc2VsZWN0ZWQuY2FzZVR5cGUpO1xuICB9XG5cbiAgcHVibGljIGlzU2VhcmNoYWJsZUFuZFdvcmtiYXNrZXRJbnB1dHNSZWFkeSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24gJiYgdGhpcy5zZWxlY3RlZC5jYXNlVHlwZSAmJiB0aGlzLndvcmtiYXNrZXRJbnB1dHNSZWFkeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIGNsZWFyIHRoZSBwcmV2aW91c2x5IHVzZWRcbiAgICogZm9ybSBncm91cCBjb250cm9sIGZpbHRlciB2YWx1ZXMgdG8gbWFrZSBzdXJlIG9ubHkgdGhlXG4gICAqIGN1cnJlbnRseSBzZWxlY3RlZCBmb3JtIGdyb3VwIGNvbnRyb2wgZmlsdGVyIHZhbHVlcyBhcmUgcHJlc2VudC5cbiAgICpcbiAgICogSGFzIGJlZW4gaW1wbGVtZW50ZWQgZm9yICdSZWdpb24gYW5kIEZSQyBmaWx0ZXJzJyBhbmQgY2FuIGJlIGV4dGVuZGVkXG4gICAqIGluIGZ1dHVyZSB0byBpbmNvcnBvcmF0ZSBvdGhlciBkeW5hbWljIGZpbHRlcnMuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlRm9ybUdyb3VwRmlsdGVycygpOiB2b2lkIHtcbiAgICAvLyBSZWFkIHRoZSBmb3JtIGdyb3VwIGxvY2FsIHN0b3JhZ2VcbiAgICBjb25zdCBmb3JtR3JvdXBMUyA9IEpTT04ucGFyc2UodGhpcy53aW5kb3dTZXJ2aWNlLmdldExvY2FsU3RvcmFnZShGT1JNX0dST1VQX1ZBTF9MT0NfU1RPUkFHRSkpO1xuXG4gICAgLy8gRm9ybSBncm91cCBsb2NhbCBzdG9yYWdlIGlzIGF2YWlsYWJsZSBhbmQgY29udGFpbnMgcmVnaW9uTGlzdCBwcm9wZXJ0eVxuICAgIGlmICghIWZvcm1Hcm91cExTICYmIGZvcm1Hcm91cExTLmhhc093blByb3BlcnR5KFJFR0lPTl9MSVNUX0FORF9GUkNfRklMVEVSKSkge1xuICAgICAgaWYgKHRoaXMuZm9ybUdyb3VwLmdldChSRUdJT05fTElTVF9BTkRfRlJDX0ZJTFRFUikpIHtcbiAgICAgICAgLy8gSWYgcmVnaW9uTGlzdCB2YWx1ZSBkb2VzIG5vdCBtYXRjaCBiZXR3ZWVuIGxvY2FsIHN0b3JhZ2UgYW5kIGZvcm0gZ3JvdXBcbiAgICAgICAgLy8gdGhlbiB0aGUgZmlsdGVyIHZhbHVlIGhhcyBiZWVuIGNoYW5nZWQgYW5kIHdlIG5lZWQgdG8gY2xlYXIgdGhlIG9sZCBmaWx0ZXIgdmFsdWVzXG4gICAgICAgIGlmIChmb3JtR3JvdXBMU1tSRUdJT05fTElTVF9BTkRfRlJDX0ZJTFRFUl0gIT09IHRoaXMuZm9ybUdyb3VwLmdldChSRUdJT05fTElTVF9BTkRfRlJDX0ZJTFRFUikudmFsdWUpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtR3JvdXBMUykge1xuICAgICAgICAgICAgaWYgKGZvcm1Hcm91cExTLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBmb3JtR3JvdXBMU1trZXldO1xuICAgICAgICAgICAgICAvLyBDbGVhciB0aGUgZmlsdGVyIGZvcm0gZ3JvdXAgY29udHJvbCB2YWx1ZXMgaWYgaXQgaGFzIGEgdmFsdWUgaW4gbG9jYWwgc3RvcmFnZVxuICAgICAgICAgICAgICAvLyBUaGUgcmVnaW9uTGlzdCBmb3JtIGdyb3VwIGNvbnRyb2wgdmFsdWUgc2hvdWxkIGJlIGlnbm9yZWQgYXMgaXQgYWx3YXlzIGNvbnRhaW4gdGhlIGxhdGVzdCB2YWx1ZVxuICAgICAgICAgICAgICBpZiAoa2V5ICE9PSBSRUdJT05fTElTVF9BTkRfRlJDX0ZJTFRFUiAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLmdldChrZXkpLnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzb3J0U3RhdGVzKHN0YXRlczogQ2FzZVN0YXRlW10pIHtcbiAgICByZXR1cm4gc3RhdGVzLnNvcnQodGhpcy5vcmRlclNlcnZpY2Uuc29ydEFzYyk7XG4gIH1cblxuICAvKipcbiAgICogVHJ5IHRvIGluaXRpYWxpc2UgZmlsdGVycyBiYXNlZCBvbiBxdWVyeSBwYXJhbWV0ZXJzIG9yIHdvcmtiYXNrZXQgZGVmYXVsdHMuXG4gICAqIFF1ZXJ5IHBhcmFtZXRlcnMsIHdoZW4gYXZhaWxhYmxlLCB0YWtlIHByZWNlZGVuY2Ugb3ZlciB3b3JrYmFza2V0IGRlZmF1bHRzLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0RmlsdGVycyhpbml0OiBib29sZWFuKSB7XG4gICAgY29uc3Qgc2F2ZWRRdWVyeVBhcmFtcyA9IHRoaXMud2luZG93U2VydmljZS5nZXRMb2NhbFN0b3JhZ2UoU0FWRURfUVVFUllfUEFSQU1fTE9DX1NUT1JBR0UpO1xuICAgIGNvbnN0IHJvdXRlU25hcHNob3Q6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QgPSB0aGlzLnJvdXRlLnNuYXBzaG90O1xuICAgIGlmIChzYXZlZFF1ZXJ5UGFyYW1zKSB7XG4gICAgICByb3V0ZVNuYXBzaG90LnF1ZXJ5UGFyYW1zID0gSlNPTi5wYXJzZShzYXZlZFF1ZXJ5UGFyYW1zKTtcbiAgICB9XG4gICAgY29uc3Qgc2VsZWN0ZWRKdXJpc2RpY3Rpb25JZCA9IHJvdXRlU25hcHNob3QucXVlcnlQYXJhbXNbV29ya2Jhc2tldEZpbHRlcnNDb21wb25lbnQuUEFSQU1fSlVSSVNESUNUSU9OXSB8fFxuICAgICAgKHRoaXMuZGVmYXVsdHMgJiYgdGhpcy5kZWZhdWx0cy5qdXJpc2RpY3Rpb25faWQpO1xuICAgIGlmIChzZWxlY3RlZEp1cmlzZGljdGlvbklkKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkLmp1cmlzZGljdGlvbiA9IHRoaXMuanVyaXNkaWN0aW9ucy5maW5kKGogPT4gc2VsZWN0ZWRKdXJpc2RpY3Rpb25JZCA9PT0gai5pZCk7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24gJiYgdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24uY2FzZVR5cGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEp1cmlzZGljdGlvbkNhc2VUeXBlcyA9IHRoaXMuc2VsZWN0ZWQuanVyaXNkaWN0aW9uLmNhc2VUeXBlcztcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5jYXNlVHlwZSA9IHRoaXMuc2VsZWN0Q2FzZVR5cGUodGhpcy5zZWxlY3RlZCwgdGhpcy5zZWxlY3RlZEp1cmlzZGljdGlvbkNhc2VUeXBlcywgcm91dGVTbmFwc2hvdCk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkLmNhc2VUeXBlKSB7XG4gICAgICAgICAgdGhpcy5vbkNhc2VUeXBlSWRDaGFuZ2UoKTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkLmNhc2VTdGF0ZSA9IHRoaXMuc2VsZWN0Q2FzZVN0YXRlKHRoaXMuc2VsZWN0ZWQuY2FzZVR5cGUsIHJvdXRlU25hcHNob3QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud29ya2Jhc2tldERlZmF1bHRzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24gPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmFwcGx5KGluaXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RDYXNlU3RhdGUoY2FzZVR5cGU6IENhc2VUeXBlTGl0ZSwgcm91dGVTbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IENhc2VTdGF0ZSB7XG4gICAgbGV0IGNhc2VTdGF0ZTtcbiAgICBpZiAoY2FzZVR5cGUpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkQ2FzZVN0YXRlSWQgPSB0aGlzLnNlbGVjdENhc2VTdGF0ZUlkRnJvbVF1ZXJ5T3JEZWZhdWx0cyhyb3V0ZVNuYXBzaG90LCAodGhpcy5kZWZhdWx0cyAmJiB0aGlzLmRlZmF1bHRzLnN0YXRlX2lkKSk7XG4gICAgICBjYXNlU3RhdGUgPSBjYXNlVHlwZS5zdGF0ZXMuZmluZChjdCA9PiBzZWxlY3RlZENhc2VTdGF0ZUlkID09PSBjdC5pZCk7XG4gICAgfVxuICAgIHJldHVybiBjYXNlU3RhdGUgPyBjYXNlU3RhdGUgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RDYXNlU3RhdGVJZEZyb21RdWVyeU9yRGVmYXVsdHMocm91dGVTbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgZGVmYXVsdENhc2VTdGF0ZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiByb3V0ZVNuYXBzaG90LnF1ZXJ5UGFyYW1zW1dvcmtiYXNrZXRGaWx0ZXJzQ29tcG9uZW50LlBBUkFNX0NBU0VfU1RBVEVdIHx8IGRlZmF1bHRDYXNlU3RhdGVJZDtcbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0Q2FzZVR5cGUoc2VsZWN0ZWQ6IGFueSwgY2FzZVR5cGVzOiBDYXNlVHlwZUxpdGVbXSwgcm91dGVTbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IENhc2VUeXBlTGl0ZSB7XG4gICAgbGV0IGNhc2VUeXBlO1xuICAgIGlmIChzZWxlY3RlZC5qdXJpc2RpY3Rpb24pIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkQ2FzZVR5cGVJZCA9IHRoaXMuc2VsZWN0Q2FzZVR5cGVJZEZyb21RdWVyeU9yRGVmYXVsdHMocm91dGVTbmFwc2hvdCwgKHRoaXMuZGVmYXVsdHMgJiYgdGhpcy5kZWZhdWx0cy5jYXNlX3R5cGVfaWQpKTtcbiAgICAgIGNhc2VUeXBlID0gY2FzZVR5cGVzLmZpbmQoY3QgPT4gc2VsZWN0ZWRDYXNlVHlwZUlkID09PSBjdC5pZCk7XG4gICAgfVxuICAgIHJldHVybiBjYXNlVHlwZSA/IGNhc2VUeXBlIDogY2FzZVR5cGVzWzBdO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RDYXNlVHlwZUlkRnJvbVF1ZXJ5T3JEZWZhdWx0cyhyb3V0ZVNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBkZWZhdWx0Q2FzZVR5cGVJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcm91dGVTbmFwc2hvdC5xdWVyeVBhcmFtc1tXb3JrYmFza2V0RmlsdGVyc0NvbXBvbmVudC5QQVJBTV9DQVNFX1RZUEVdIHx8IGRlZmF1bHRDYXNlVHlwZUlkO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEZpZWxkc1doZW5Ob0RlZmF1bHRzKCkge1xuICAgIHRoaXMucmVzZXRDYXNlU3RhdGUoKTtcbiAgICB0aGlzLnJlc2V0Q2FzZVR5cGUoKTtcbiAgICB0aGlzLmNsZWFyV29ya2Jhc2tldElucHV0cygpO1xuICAgIHRoaXMud29ya2Jhc2tldERlZmF1bHRzID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuaW5pdGlhbGlzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmluaXRGaWx0ZXJzKHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhcldvcmtiYXNrZXRJbnB1dHMoKSB7XG4gICAgdGhpcy53b3JrYmFza2V0SW5wdXRzUmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLndvcmtiYXNrZXRJbnB1dHMgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRDYXNlU3RhdGUoKSB7XG4gICAgdGhpcy5kZWZhdWx0cy5zdGF0ZV9pZCA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3RlZC5jYXNlU3RhdGUgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0ZWRDYXNlVHlwZVN0YXRlcyA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0Q2FzZVR5cGUoKSB7XG4gICAgdGhpcy5zZWxlY3RlZC5jYXNlVHlwZSA9IHVuZGVmaW5lZDsgLy8gb3B0aW9uIHNob3VsZCBiZSBibGFuayByYXRoZXIgdGhhbiBcIlNlbGVjdCBhIHZhbHVlXCIgaW4gY2FzZSBvZiByZXNldC5cbiAgICB0aGlzLnNlbGVjdGVkSnVyaXNkaWN0aW9uQ2FzZVR5cGVzID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Rm9jdXNUb1RvcCgpIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG5cbiAgICBjb25zdCB0b3BDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLXJlc3VsdC1oZWFkaW5nX190ZXh0Jyk7XG4gICAgaWYgKHRvcENvbnRhaW5lcikge1xuICAgICAgdG9wQ29udGFpbmVyLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDYXNlRmllbGRzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLndvcmtiYXNrZXRJbnB1dHMpIHtcbiAgICAgIHRoaXMuY2FzZUZpZWxkcyA9IHRoaXMud29ya2Jhc2tldElucHV0cy5tYXAoaXRlbSA9PiBGaWVsZHNVdGlscy5jb252ZXJ0VG9DYXNlRmllbGQoaXRlbS5maWVsZCkpO1xuICAgIH1cbiAgfVxufVxuIiwiPGgyIGNsYXNzPVwiaGVhZGluZy1oMlwiIGFyaWEtbGFiZWw9XCJGaWx0ZXJzXCI+e3snRmlsdGVycycgfCBycHhUcmFuc2xhdGUgfX08L2gyPlxuXG48Zm9ybSBjbGFzcz1cImdsb2JhbC1kaXNwbGF5XCI+XG4gIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiIGZvcj1cIndiLWp1cmlzZGljdGlvblwiPnt7J0p1cmlzZGljdGlvbicgfCBycHhUcmFuc2xhdGV9fTwvbGFiZWw+XG4gICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtMy00IGNjZC1kcm9wZG93blwiIGlkPVwid2ItanVyaXNkaWN0aW9uXCJcbiAgICAgICAgICAgIG5hbWU9XCJqdXJpc2RpY3Rpb25cIiBbKG5nTW9kZWwpXT1cInNlbGVjdGVkLmp1cmlzZGljdGlvblwiIGFyaWEtY29udHJvbHM9XCJzZWFyY2gtcmVzdWx0XCJcbiAgICAgICAgICAgIChjaGFuZ2UpPVwib25KdXJpc2RpY3Rpb25JZENoYW5nZSgpXCI+XG4gICAgICA8b3B0aW9uICpuZ0lmPVwiIXdvcmtiYXNrZXREZWZhdWx0c1wiIFtuZ1ZhbHVlXT1cIm51bGxcIj57eydTZWxlY3QgYSB2YWx1ZScgfCBycHhUcmFuc2xhdGV9fTwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgaiBvZiBqdXJpc2RpY3Rpb25zXCIgW25nVmFsdWVdPVwialwiPnt7ai5uYW1lIHwgcnB4VHJhbnNsYXRlfX08L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCIgZm9yPVwid2ItY2FzZS10eXBlXCI+e3snQ2FzZSB0eXBlJyB8IHJweFRyYW5zbGF0ZX19PC9sYWJlbD5cbiAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC0zLTQgY2NkLWRyb3Bkb3duXCIgaWQ9XCJ3Yi1jYXNlLXR5cGVcIlxuICAgICAgICAgICAgbmFtZT1cImNhc2UtdHlwZVwiIFsobmdNb2RlbCldPVwic2VsZWN0ZWQuY2FzZVR5cGVcIiBbZGlzYWJsZWRdPVwiaXNDYXNlVHlwZXNEcm9wZG93bkRpc2FibGVkKClcIlxuICAgICAgICAgICAgKGNoYW5nZSk9XCJvbkNhc2VUeXBlSWRDaGFuZ2UoKVwiIGFyaWEtY29udHJvbHM9XCJzZWFyY2gtcmVzdWx0XCI+XG4gICAgICA8b3B0aW9uICpuZ0lmPVwiIXdvcmtiYXNrZXREZWZhdWx0c1wiIFtuZ1ZhbHVlXT1cIm51bGxcIj57eydTZWxlY3QgYSB2YWx1ZScgfCBycHhUcmFuc2xhdGV9fTwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgY3Qgb2Ygc2VsZWN0ZWRKdXJpc2RpY3Rpb25DYXNlVHlwZXNcIiBbbmdWYWx1ZV09XCJjdFwiPnt7Y3QubmFtZSB8IHJweFRyYW5zbGF0ZX19PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiIGZvcj1cIndiLWNhc2Utc3RhdGVcIj57eydTdGF0ZScgfCBycHhUcmFuc2xhdGV9fTwvbGFiZWw+XG4gICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtMy00IGNjZC1kcm9wZG93blwiIGlkPVwid2ItY2FzZS1zdGF0ZVwiXG4gICAgICAgICAgICBuYW1lPVwic3RhdGVcIiBbKG5nTW9kZWwpXT1cInNlbGVjdGVkLmNhc2VTdGF0ZVwiIFtkaXNhYmxlZF09XCJpc0Nhc2VTdGF0ZXNEcm9wZG93bkRpc2FibGVkKClcIlxuICAgICAgICAgICAgYXJpYS1jb250cm9scz1cInNlYXJjaC1yZXN1bHRcIj5cbiAgICAgIDxvcHRpb24gW25nVmFsdWVdPVwibnVsbFwiPnt7J0FueScgfCBycHhUcmFuc2xhdGV9fTwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgY3Mgb2Ygc2VsZWN0ZWRDYXNlVHlwZVN0YXRlc1wiIFtuZ1ZhbHVlXT1cImNzXCI+e3tjcy5uYW1lIHwgcnB4VHJhbnNsYXRlfX08L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgPC9kaXY+XG5cbiAgPG5nLWNvbnRhaW5lciBjY2RDb25kaXRpb25hbFNob3dGb3JtICpuZ0lmPVwiaXNTZWFyY2hhYmxlQW5kV29ya2Jhc2tldElucHV0c1JlYWR5KClcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIFtjb250ZXh0RmllbGRzXT1cImNhc2VGaWVsZHNcIj5cbiAgICA8ZGl2IGlkPVwiZHluYW1pY0ZpbHRlcnNcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgKm5nRm9yPVwibGV0IHdvcmtiYXNrZXRJbnB1dCBvZiB3b3JrYmFza2V0SW5wdXRzXCI+XG4gICAgICAgIDxjY2QtZmllbGQtd3JpdGUgW2Nhc2VGaWVsZF09XCJ3b3JrYmFza2V0SW5wdXQuZmllbGRcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIFtpc0V4cGFuZGVkXT1cInRydWVcIiBbaXNJblNlYXJjaEJsb2NrXT1cInRydWVcIiAoa2V5dXAuZW50ZXIpPVwiYXBwbHkobnVsbClcIj5cbiAgICAgICAgPC9jY2QtZmllbGQtd3JpdGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gd29ya2Jhc2tldC1maWx0ZXJzLWFwcGx5XCIgKGNsaWNrKT1cImFwcGx5KHRydWUpXCIgW2Rpc2FibGVkXT1cImlzQXBwbHlCdXR0b25EaXNhYmxlZCgpXCJcbiAgICAgICAgICBbdGl0bGVdPVwiJ0FwcGx5IGZpbHRlcicgfCBycHhUcmFuc2xhdGVcIiBbYXR0ci5hcmlhLWxhYmVsXT1cIidBcHBseSBmaWx0ZXInIHwgcnB4VHJhbnNsYXRlXCI+XG4gICAge3snQXBwbHknIHwgcnB4VHJhbnNsYXRlfX1cbiAgPC9idXR0b24+ICZuYnNwOyZuYnNwOyZuYnNwO1xuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwicmVzZXQoKVwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1zZWNvbmRhcnlcIlxuICAgICAgICAgIFt0aXRsZV09XCInUmVzZXQgZmlsdGVyJyB8IHJweFRyYW5zbGF0ZVwiIFthdHRyLmFyaWEtbGFiZWxdPVwiJ1Jlc2V0IGZpbHRlcicgfCBycHhUcmFuc2xhdGVcIj5cbiAgICB7eydSZXNldCcgfCBycHhUcmFuc2xhdGV9fVxuICA8L2J1dHRvbj5cbjwvZm9ybT5cbiJdfQ==