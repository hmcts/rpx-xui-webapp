import { Component } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrganisationConverter } from '../../../domain/organisation/organisation-converter';
import { OrganisationService } from '../../../services/organisation/organisation.service';
import { WindowService } from '../../../services/window/window.service';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/organisation/organisation.service";
import * as i2 from "../../../domain/organisation/organisation-converter";
import * as i3 from "../../../services/window/window.service";
function WriteOrganisationFieldComponent_fieldset_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "fieldset", 2);
    i0.ɵɵelement(1, "legend", 3);
    i0.ɵɵelementStart(2, "div", 4);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 5);
    i0.ɵɵelement(4, "path", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "div", 7)(6, "span", 8);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 9);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "rpxTranslate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 10)(13, "div", 9);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "rpxTranslate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 3, "information"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 5, "Organisation search is currently unavailable."));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(15, 7, "We are working to fix the issue.You can try again later."), " ");
} }
function WriteOrganisationFieldComponent_fieldset_3_div_17_table_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "table", 29)(1, "caption")(2, "h3", 30);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "tbody")(5, "tr");
    i0.ɵɵelement(6, "th", 3);
    i0.ɵɵelementStart(7, "td", 31);
    i0.ɵɵelement(8, "ccd-markdown", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 33)(10, "a", 34);
    i0.ɵɵlistener("click", function WriteOrganisationFieldComponent_fieldset_3_div_17_table_2_Template_a_click_10_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const organisation_r7 = restoredCtx.$implicit; const ctx_r8 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r8.selectOrg(organisation_r7)); });
    i0.ɵɵpipe(11, "rpxTranslate");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "rpxTranslate");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const organisation_r7 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(organisation_r7.name);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("content", organisation_r7.address);
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate2("title", "", i0.ɵɵpipeBind1(11, 5, "Select the organisation"), " ", organisation_r7.name, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(13, 7, "Select"), " ");
} }
function WriteOrganisationFieldComponent_fieldset_3_div_17_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 35);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 1, "No results found."), " ");
} }
const _c0 = function (a0) { return { "scroll-container ": a0 }; };
function WriteOrganisationFieldComponent_fieldset_3_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵpipe(1, "async");
    i0.ɵɵtemplate(2, WriteOrganisationFieldComponent_fieldset_3_div_17_table_2_Template, 14, 9, "table", 27);
    i0.ɵɵpipe(3, "async");
    i0.ɵɵtemplate(4, WriteOrganisationFieldComponent_fieldset_3_div_17_div_4_Template, 4, 3, "div", 28);
    i0.ɵɵpipe(5, "async");
    i0.ɵɵpipe(6, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    let tmp_0_0;
    let tmp_2_0;
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(11, _c0, ((tmp_0_0 = i0.ɵɵpipeBind1(1, 3, ctx_r2.simpleOrganisations$)) == null ? null : tmp_0_0.length) > 10));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(3, 5, ctx_r2.simpleOrganisations$));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ((tmp_2_0 = i0.ɵɵpipeBind1(5, 7, ctx_r2.simpleOrganisations$)) == null ? null : tmp_2_0.length) === 0 && ((tmp_2_0 = i0.ɵɵpipeBind1(6, 9, ctx_r2.searchOrgValue$)) == null ? null : tmp_2_0.length) > 2);
} }
function WriteOrganisationFieldComponent_fieldset_3_ng_template_19_table_0_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "table", 37)(1, "caption")(2, "h3", 30);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "tbody")(5, "tr");
    i0.ɵɵelement(6, "th", 3);
    i0.ɵɵelementStart(7, "td", 31);
    i0.ɵɵelement(8, "ccd-markdown", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 33)(10, "a", 34);
    i0.ɵɵlistener("click", function WriteOrganisationFieldComponent_fieldset_3_ng_template_19_table_0_Template_a_click_10_listener() { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r12.deSelectOrg()); });
    i0.ɵɵpipe(11, "rpxTranslate");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "rpxTranslate");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const selectedOrg_r11 = ctx.ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(selectedOrg_r11.name);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("content", selectedOrg_r11.address);
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate2("title", "", i0.ɵɵpipeBind1(11, 5, "Clear organisation selection for"), " ", selectedOrg_r11.name, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(13, 7, "Clear"), " ");
} }
function WriteOrganisationFieldComponent_fieldset_3_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, WriteOrganisationFieldComponent_fieldset_3_ng_template_19_table_0_Template, 14, 9, "table", 36);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx_r4.selectedOrg$));
} }
function WriteOrganisationFieldComponent_fieldset_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "fieldset", 2)(1, "legend", 11)(2, "h2", 12);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 13)(6, "label", 14)(7, "span", 15);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(10, "input", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 13)(12, "label", 17)(13, "h2", 12);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(16, "hr", 18);
    i0.ɵɵtemplate(17, WriteOrganisationFieldComponent_fieldset_3_div_17_Template, 7, 13, "div", 19);
    i0.ɵɵpipe(18, "async");
    i0.ɵɵtemplate(19, WriteOrganisationFieldComponent_fieldset_3_ng_template_19_Template, 2, 3, "ng-template", null, 20, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "ccd-write-organisation-complex-field", 21);
    i0.ɵɵelementStart(22, "details", 22)(23, "summary", 23)(24, "span", 24);
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 25);
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "rpxTranslate");
    i0.ɵɵpipe(30, "rpxTranslate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const _r3 = i0.ɵɵreference(20);
    const ctx_r1 = i0.ɵɵnextContext();
    let tmp_4_0;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 12, "Search for an organisation"), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 14, "You can only search for organisations already registered with MyHMCTS. For example, you can search by organisation name or address."), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formControl", ctx_r1.searchOrgTextFormControl);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 16, "Organisation name and address"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !((tmp_4_0 = i0.ɵɵpipeBind1(18, 18, ctx_r1.selectedOrg$)) == null ? null : tmp_4_0.organisationIdentifier))("ngIfElse", _r3);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("caseField", ctx_r1.caseField)("formGroup", ctx_r1.formGroup)("selectedOrg$", ctx_r1.selectedOrg$);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(26, 20, "Can\u2019t find the organisation you are looking for?"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", i0.ɵɵpipeBind1(29, 22, "If you know that the solicitor is already registered with MyHMCTS, check that you have entered their details correctly."), " ", i0.ɵɵpipeBind1(30, 24, "Remember that organisations can only register one office address. This means that the details could be slightly different from what you're expecting. Contact the solicitor directly if you have any concerns."), " ");
} }
export class WriteOrganisationFieldComponent extends AbstractFieldWriteComponent {
    constructor(organisationService, organisationConverter, windowService) {
        super();
        this.organisationService = organisationService;
        this.organisationConverter = organisationConverter;
        this.windowService = windowService;
        this.defaultOrg = JSON.parse(this.windowService.getSessionStorage(WriteOrganisationFieldComponent.ORGANISATION_DETAILS));
    }
    ngOnInit() {
        this.organisations$ = this.organisationService.getActiveOrganisations();
        this.searchOrgTextFormControl = new FormControl('');
        this.searchOrgValue$ = this.searchOrgTextFormControl.valueChanges;
        this.searchOrgValue$.subscribe(value => this.onSearchOrg(value));
        this.organisationFormGroup = this.registerControl(new UntypedFormGroup({}), true);
        if (this.parent && this.parent.controls && this.parent.controls.hasOwnProperty(WriteOrganisationFieldComponent.PRE_POPULATE_TO_USERS_ORGANISATION)
            && this.parent.controls[WriteOrganisationFieldComponent.PRE_POPULATE_TO_USERS_ORGANISATION].value
            && this.parent.controls[WriteOrganisationFieldComponent.PRE_POPULATE_TO_USERS_ORGANISATION].value.toUpperCase()
                === WriteOrganisationFieldComponent.YES) {
            if (this.caseField && !this.caseField.value) {
                this.caseField.value = {
                    OrganisationID: this.defaultOrg ? this.defaultOrg.organisationIdentifier : null,
                    OrganisationName: this.defaultOrg ? this.defaultOrg.name : null
                };
            }
            this.preSelectDefaultOrg();
        }
        else {
            if (this.caseField && this.caseField.value && this.caseField.value.OrganisationID) {
                this.preSelectDefaultOrg();
            }
            else {
                this.preSelectEmptyOrg();
            }
        }
        // Ensure that all sub-fields inherit the same value for retain_hidden_value as this parent; although an
        // Organisation field uses the Complex type, it is meant to be treated as one field
        if (this.caseField && this.caseField.field_type.type === 'Complex') {
            for (const organisationSubField of this.caseField.field_type.complex_fields) {
                organisationSubField.retain_hidden_value = this.caseField.retain_hidden_value;
            }
        }
    }
    onSearchOrg(orgSearchText) {
        if (orgSearchText && orgSearchText.length >= 2) {
            const lowerOrgSearchText = orgSearchText.toLowerCase();
            this.simpleOrganisations$ = this.organisations$.pipe(switchMap(organisations => of(this.searchOrg(organisations, lowerOrgSearchText))));
        }
        else {
            this.simpleOrganisations$ = of([]);
        }
    }
    // The way the search works divide into two phases
    // 1. go through collection of org items one by one by doing the comparsion of search string using includes to all the address fields
    // 2. split the search string into arrays and apply the each array item into the address fields
    // 3. both step 1, 2 will go until max count result reaches, and finally combine both result sets into final collection
    searchOrg(organisations, lowerOrgSearchText) {
        const partMatchingResultSet = [];
        const withSpaceMatchingResultSet = [];
        const MAX_RESULT_COUNT = WriteOrganisationFieldComponent.MAX_RESULT_COUNT;
        organisations.forEach((organisation) => {
            if (partMatchingResultSet.length < MAX_RESULT_COUNT && this.searchCriteria(organisation, lowerOrgSearchText)) {
                partMatchingResultSet.push(organisation);
            }
        });
        organisations.forEach((org) => {
            const resultSet = [...partMatchingResultSet, ...withSpaceMatchingResultSet];
            const hasMatchingOrganisation = resultSet.find(item => item.organisationIdentifier === org.organisationIdentifier);
            const searchHasSpace = this.searchWithSpace(org, lowerOrgSearchText);
            const hasResultSetBelowMaxCount = resultSet.length < MAX_RESULT_COUNT;
            if (!hasMatchingOrganisation && partMatchingResultSet.length === 0 && hasResultSetBelowMaxCount && searchHasSpace) {
                withSpaceMatchingResultSet.push(org);
            }
        });
        return [...partMatchingResultSet, ...withSpaceMatchingResultSet].map((organisation) => this.organisationConverter.toSimpleOrganisationModel(organisation));
    }
    trimAll(oldText) {
        return oldText.replace(/\s+/g, '');
    }
    selectOrg(selectedOrg) {
        this.organisationIDFormControl.setValue(selectedOrg.organisationIdentifier);
        this.organisationNameFormControl.setValue(selectedOrg.name);
        this.selectedOrg$ = of(selectedOrg);
        this.simpleOrganisations$ = of([...[], selectedOrg]);
        this.searchOrgTextFormControl.setValue('');
        this.searchOrgTextFormControl.disable();
        this.caseField.value = {
            OrganisationID: selectedOrg.organisationIdentifier,
            OrganisationName: selectedOrg.name
        };
        this.organisationFormGroup.setValue(this.caseField.value);
    }
    deSelectOrg() {
        this.organisationIDFormControl.reset();
        this.organisationNameFormControl.reset();
        this.selectedOrg$ = of(WriteOrganisationFieldComponent.EMPTY_SIMPLE_ORG);
        this.simpleOrganisations$ = of([]);
        this.searchOrgTextFormControl.setValue('');
        this.searchOrgTextFormControl.enable();
        this.caseField.value = { OrganisationID: null, OrganisationName: null };
        this.organisationFormGroup.setValue(this.caseField.value);
    }
    preSelectDefaultOrg() {
        this.instantiateOrganisationFormGroup(this.caseField.value.OrganisationID, this.caseField.value.OrganisationName);
        this.selectedOrg$ = this.organisations$.pipe(map(organisations => organisations.filter(findOrg => {
            return findOrg.organisationIdentifier === this.caseField.value.OrganisationID;
        })
            .map(organisation => this.organisationConverter.toSimpleOrganisationModel(organisation))[0]));
        if (this.caseField.value && this.caseField.value.OrganisationID) {
            this.searchOrgTextFormControl.disable();
        }
    }
    preSelectEmptyOrg() {
        this.instantiateOrganisationFormGroup(null, null);
        this.selectedOrg$ = of(WriteOrganisationFieldComponent.EMPTY_SIMPLE_ORG);
    }
    instantiateOrganisationFormGroup(orgIDState, orgNameState) {
        this.organisationIDFormControl = new FormControl(orgIDState);
        this.addOrganisationValidators(this.caseField, this.organisationIDFormControl);
        this.organisationFormGroup.addControl(WriteOrganisationFieldComponent.ORGANISATION_ID, this.organisationIDFormControl);
        this.organisationNameFormControl = new FormControl(orgNameState);
        this.organisationFormGroup.addControl(WriteOrganisationFieldComponent.ORGANISATION_NAME, this.organisationNameFormControl);
    }
    addOrganisationValidators(caseField, control) {
        if (caseField.field_type && caseField.field_type.complex_fields) {
            const organisationIdField = caseField.field_type.complex_fields
                .find(field => field.id === WriteOrganisationFieldComponent.ORGANISATION_ID);
            this.addValidators(organisationIdField, control);
        }
    }
    searchCriteria(organisation, lowerOrgSearchText) {
        if (organisation.postCode && organisation.postCode.toLowerCase().includes(lowerOrgSearchText)) {
            return true;
        }
        if (organisation.postCode && this.trimAll(organisation.postCode).toLowerCase().includes(lowerOrgSearchText)) {
            return true;
        }
        if (organisation.postCode && organisation.postCode.toLowerCase().includes(this.trimAll(lowerOrgSearchText))) {
            return true;
        }
        if (organisation.name && organisation.name.toLowerCase().includes(lowerOrgSearchText)) {
            return true;
        }
        if (organisation.addressLine1 && organisation.addressLine1.toLowerCase().includes(lowerOrgSearchText)) {
            return true;
        }
        if (organisation.addressLine2 && organisation.addressLine2.toLowerCase().includes(lowerOrgSearchText)) {
            return true;
        }
        if (organisation.addressLine3 && organisation.addressLine3.toLowerCase().includes(lowerOrgSearchText)) {
            return true;
        }
        if (organisation.townCity && organisation.townCity.toLowerCase().includes(lowerOrgSearchText)) {
            return true;
        }
        if (organisation.county && organisation.county.toLowerCase().includes(lowerOrgSearchText)) {
            return true;
        }
        // noinspection RedundantIfStatementJS
        if (organisation.country && organisation.country.toLowerCase().includes(lowerOrgSearchText)) {
            return true;
        }
        return false;
    }
    searchWithSpace(organisation, lowerOrgSearchText) {
        const searchTextArray = lowerOrgSearchText.split(/\s+/g);
        for (const singleSearchText of searchTextArray) {
            if (singleSearchText && this.searchCriteria(organisation, singleSearchText)) {
                return true;
            }
        }
    }
}
WriteOrganisationFieldComponent.EMPTY_SIMPLE_ORG = { organisationIdentifier: '', name: '', address: '' };
WriteOrganisationFieldComponent.MAX_RESULT_COUNT = 100;
WriteOrganisationFieldComponent.ORGANISATION_ID = 'OrganisationID';
WriteOrganisationFieldComponent.ORGANISATION_NAME = 'OrganisationName';
WriteOrganisationFieldComponent.PRE_POPULATE_TO_USERS_ORGANISATION = 'PrepopulateToUsersOrganisation';
WriteOrganisationFieldComponent.ORGANISATION_DETAILS = 'organisationDetails';
WriteOrganisationFieldComponent.YES = 'YES';
WriteOrganisationFieldComponent.MANDATORY = 'MANDATORY';
WriteOrganisationFieldComponent.ɵfac = function WriteOrganisationFieldComponent_Factory(t) { return new (t || WriteOrganisationFieldComponent)(i0.ɵɵdirectiveInject(i1.OrganisationService), i0.ɵɵdirectiveInject(i2.OrganisationConverter), i0.ɵɵdirectiveInject(i3.WindowService)); };
WriteOrganisationFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteOrganisationFieldComponent, selectors: [["ccd-write-organisation-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 5, vars: 7, consts: [[1, "form-group", 3, "formGroup"], ["class", "govuk-fieldset", 4, "ngIf"], [1, "govuk-fieldset"], [2, "display", "none"], [1, "hmcts-banner"], ["fill", "currentColor", "role", "presentation", "focusable", "false", "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 25 25", "height", "25", "width", "25", 1, "hmcts-banner__icon"], ["d", "M13.7,18.5h-2.4v-2.4h2.4V18.5z M12.5,13.7c-0.7,0-1.2-0.5-1.2-1.2V7.7c0-0.7,0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2v4.8\n  C13.7,13.2,13.2,13.7,12.5,13.7z M12.5,0.5c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S19.1,0.5,12.5,0.5z"], [1, "hmcts-banner__message"], [1, "hmcts-banner__assistive"], [1, "warning-message"], [1, "warning-panel"], [1, "govuk-fieldset__legend", "govuk-fieldset__legend--l"], [1, "heading-h2"], [1, "govuk-form-group"], ["for", "search-org-text", 1, "govuk-label"], ["id", "search-org-hint", 1, "govuk-hint"], ["id", "search-org-text", "type", "text", 1, "form-control", 3, "formControl"], ["for", "organisation-table", 1, "govuk-label"], [1, "govuk-section-break", "govuk-section-break--visible"], [3, "ngClass", 4, "ngIf", "ngIfElse"], ["selectedOrganisation", ""], [3, "caseField", "formGroup", "selectedOrg$"], ["id", "find-organisation-help", "data-module", "govuk-details", 1, "govuk-details"], [1, "govuk-details__summary"], ["id", "content-why-can-not-find-organisation", 1, "govuk-details__summary-text"], ["id", "content-reason-can-not-find-organisation", 1, "govuk-details__text"], [3, "ngClass"], ["id", "organisation-table", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["id", "organisation-table"], [1, "name-header"], [1, "td-address"], [3, "content"], [1, "td-select"], ["href", "javascript:void(0);", 3, "title", "click"], [1, "no-result-message"], ["id", "organisation-selected-table", 4, "ngIf"], ["id", "organisation-selected-table"]], template: function WriteOrganisationFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, WriteOrganisationFieldComponent_fieldset_1_Template, 16, 9, "fieldset", 1);
        i0.ɵɵpipe(2, "async");
        i0.ɵɵtemplate(3, WriteOrganisationFieldComponent_fieldset_3_Template, 31, 26, "fieldset", 1);
        i0.ɵɵpipe(4, "async");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        i0.ɵɵproperty("formGroup", ctx.organisationFormGroup);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ((tmp_1_0 = i0.ɵɵpipeBind1(2, 3, ctx.organisations$)) == null ? null : tmp_1_0.length) === 0);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ((tmp_2_0 = i0.ɵɵpipeBind1(4, 5, ctx.organisations$)) == null ? null : tmp_2_0.length) > 0);
    } }, styles: [".hmcts-banner[_ngcontent-%COMP%]{border:0 solid;margin-bottom:10px;color:#000}.hmcts-banner[_ngcontent-%COMP%]   .warning-message[_ngcontent-%COMP%]{font-weight:700}.govuk-hint[_ngcontent-%COMP%]{font-size:1.1rem}.name-header[_ngcontent-%COMP%]{font-weight:700;margin-top:10px;font-size:18px}.td-address[_ngcontent-%COMP%]{width:90%;padding-top:2px}.td-select[_ngcontent-%COMP%]{width:10%}.warning-panel[_ngcontent-%COMP%]{background-color:#e7ebef;height:40px;margin-bottom:0;align-items:center;display:flex}.warning-panel[_ngcontent-%COMP%]   .warning-message[_ngcontent-%COMP%]{padding-left:15px}.complex-field-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{border:none}.complex-field-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > th[_ngcontent-%COMP%], .complex-field-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > td[_ngcontent-%COMP%]{border-bottom:none}.complex-field-title[_ngcontent-%COMP%]{width:300px}.label-width-small[_ngcontent-%COMP%]{width:100px}.label-width-medium[_ngcontent-%COMP%]{width:150px}.scroll-container[_ngcontent-%COMP%]{height:600px;overflow-y:scroll}.no-result-message[_ngcontent-%COMP%]{margin-top:15px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteOrganisationFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-organisation-field', template: "<div class=\"form-group\" [formGroup]=\"organisationFormGroup\">\n  <fieldset *ngIf=\"(organisations$ | async)?.length === 0\" class=\"govuk-fieldset\">\n    <legend style=\"display: none;\"></legend>\n    <div class=\"hmcts-banner\">\n      <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\">\n        <path d=\"M13.7,18.5h-2.4v-2.4h2.4V18.5z M12.5,13.7c-0.7,0-1.2-0.5-1.2-1.2V7.7c0-0.7,0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2v4.8\n  C13.7,13.2,13.2,13.7,12.5,13.7z M12.5,0.5c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S19.1,0.5,12.5,0.5z\" /></svg>\n      <div class=\"hmcts-banner__message\">\n        <span class=\"hmcts-banner__assistive\">{{'information' | rpxTranslate}}</span>\n          <p class=\"warning-message\">{{'Organisation search is currently unavailable.' | rpxTranslate}}</p>\n      </div>\n    </div>\n    <div class=\"warning-panel\">\n      <div class=\"warning-message\">\n        {{'We are working to fix the issue.You can try again later.' | rpxTranslate}}\n      </div>\n    </div>\n  </fieldset>\n  <fieldset *ngIf=\"(organisations$ | async)?.length > 0\" class=\"govuk-fieldset\">\n    <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--l\">\n      <h2 class=\"heading-h2\">\n        {{'Search for an organisation' | rpxTranslate}}\n      </h2>\n    </legend>\n    <div class=\"govuk-form-group\">\n      <label class=\"govuk-label\" for=\"search-org-text\">\n        <span id=\"search-org-hint\" class=\"govuk-hint\">\n          {{'You can only search for organisations already registered with MyHMCTS. For example, you can search by organisation name or address.' | rpxTranslate}}\n        </span>\n      </label>\n      <input id=\"search-org-text\" class=\"form-control\" type=\"text\" [formControl]=\"searchOrgTextFormControl\"/>\n    </div>\n    <div class=\"govuk-form-group\">\n      <label class=\"govuk-label\" for=\"organisation-table\">\n        <h2 class=\"heading-h2\">{{'Organisation name and address' | rpxTranslate}}</h2>\n      </label>\n      <hr class=\"govuk-section-break govuk-section-break--visible\">\n      <div *ngIf=\"!(selectedOrg$ | async)?.organisationIdentifier; else selectedOrganisation\" [ngClass]=\"{'scroll-container ': (simpleOrganisations$ | async)?.length > 10}\">\n        <table id=\"organisation-table\" *ngFor=\"let organisation of (simpleOrganisations$ | async)\">\n          <caption><h3 class=\"name-header\">{{organisation.name}}</h3></caption>\n          <tbody>\n            <tr>\n              <th style=\"display: none;\"></th>\n              <td class=\"td-address\">\n                <ccd-markdown [content]=\"organisation.address\"></ccd-markdown>\n              </td>\n              <td class=\"td-select\">\n                <a href=\"javascript:void(0);\" (click)=\"selectOrg(organisation)\" title=\"{{'Select the organisation' | rpxTranslate}} {{organisation.name}}\">\n                  {{'Select' | rpxTranslate}}\n                </a>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <div *ngIf=\"(simpleOrganisations$ | async)?.length === 0 && (searchOrgValue$ | async)?.length > 2\">\n          <div class=\"no-result-message\">\n            {{'No results found.' | rpxTranslate}}\n          </div>\n        </div>\n      </div>\n      <ng-template #selectedOrganisation>\n        <table id=\"organisation-selected-table\" *ngIf=\"(selectedOrg$ | async) as selectedOrg\">\n          <caption><h3 class=\"name-header\">{{selectedOrg.name}}</h3></caption>\n          <tbody>\n            <tr>\n              <th style=\"display: none;\"></th>\n              <td class=\"td-address\">\n                <ccd-markdown [content]=\"selectedOrg.address\"></ccd-markdown>\n              </td>\n              <td class=\"td-select\">\n                <a href=\"javascript:void(0);\" (click)=\"deSelectOrg()\"\n                   title=\"{{'Clear organisation selection for' | rpxTranslate}} {{selectedOrg.name}}\">\n                  {{'Clear' | rpxTranslate}}\n                </a>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </ng-template>\n    </div>\n    <ccd-write-organisation-complex-field [caseField]=\"caseField\"\n                                          [formGroup]=\"formGroup\"\n                                          [selectedOrg$]=\"selectedOrg$\">\n    </ccd-write-organisation-complex-field>\n    <details id=\"find-organisation-help\" class=\"govuk-details\" data-module=\"govuk-details\">\n      <summary class=\"govuk-details__summary\">\n      <span id=\"content-why-can-not-find-organisation\" class=\"govuk-details__summary-text\">\n        {{\"Can\u2019t find the organisation you are looking for?\" | rpxTranslate}}\n      </span>\n      </summary>\n      <div id=\"content-reason-can-not-find-organisation\" class=\"govuk-details__text\">\n        {{'If you know that the solicitor is already registered with MyHMCTS, check that you have entered their details correctly.' | rpxTranslate}}\n        {{\"Remember that organisations can only register one office address. This means that the details could be slightly different from what you're expecting. Contact the solicitor directly if you have any concerns.\" | rpxTranslate}}\n      </div>\n    </details>\n  </fieldset>\n</div>\n", styles: [".hmcts-banner{border:0 solid;margin-bottom:10px;color:#000}.hmcts-banner .warning-message{font-weight:700}.govuk-hint{font-size:1.1rem}.name-header{font-weight:700;margin-top:10px;font-size:18px}.td-address{width:90%;padding-top:2px}.td-select{width:10%}.warning-panel{background-color:#e7ebef;height:40px;margin-bottom:0;align-items:center;display:flex}.warning-panel .warning-message{padding-left:15px}.complex-field-table>tbody>tr>th{border:none}.complex-field-table>tbody>tr:last-child>th,.complex-field-table>tbody>tr:last-child>td{border-bottom:none}.complex-field-title{width:300px}.label-width-small{width:100px}.label-width-medium{width:150px}.scroll-container{height:600px;overflow-y:scroll}.no-result-message{margin-top:15px}\n"] }]
    }], function () { return [{ type: i1.OrganisationService }, { type: i2.OrganisationConverter }, { type: i3.WindowService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtb3JnYW5pc2F0aW9uLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL29yZ2FuaXNhdGlvbi93cml0ZS1vcmdhbmlzYXRpb24tZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvb3JnYW5pc2F0aW9uL3dyaXRlLW9yZ2FuaXNhdGlvbi1maWVsZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBbUIsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEYsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBRTVGLE9BQU8sRUFBRSxtQkFBbUIsRUFBa0IsTUFBTSxxREFBcUQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFeEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOENBQThDLENBQUM7Ozs7OztJQ1R6RixtQ0FBZ0Y7SUFDOUUsNEJBQXdDO0lBQ3hDLDhCQUEwQjtJQUN4QixtQkFBd0s7SUFBeEssOEJBQXdLO0lBQ3RLLDBCQUN3RztJQUFBLGlCQUFNO0lBQ2hILG9CQUFtQztJQUFuQyw4QkFBbUMsY0FBQTtJQUNLLFlBQWdDOztJ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QUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBQ2xHLGdEQUFnQixHQUFXLEdBQUcsQ0FBQztBQUMvQiwrQ0FBZSxHQUFXLGdCQUFnQixDQUFDO0FBQzNDLGlEQUFpQixHQUFXLGtCQUFrQixDQUFDO0FBQy9DLGtFQUFrQyxHQUFXLGdDQUFnQyxDQUFDO0FBQzlFLG9EQUFvQixHQUFXLHFCQUFxQixDQUFDO0FBQ3JELG1DQUFHLEdBQVcsS0FBSyxDQUFDO0FBQ3BCLHlDQUFTLEdBQVcsV0FBVyxDQUFDOzhHQVQ3QywrQkFBK0I7a0ZBQS9CLCtCQUErQjtRQ2pCNUMsOEJBQTREO1FBQzFELDJGQWdCVzs7UUFDWCw0RkE2RVc7O1FBQ2IsaUJBQU07Ozs7UUFoR2tCLHFEQUFtQztRQUM5QyxlQUE0QztRQUE1QyxtSEFBNEM7UUFpQjVDLGVBQTBDO1FBQTFDLGlIQUEwQzs7dUZERDFDLCtCQUErQjtjQUwzQyxTQUFTOzJCQUNFLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS1maWVsZC5tb2RlbCc7XG5pbXBvcnQgeyBPcmdhbmlzYXRpb25Db252ZXJ0ZXIgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vb3JnYW5pc2F0aW9uL29yZ2FuaXNhdGlvbi1jb252ZXJ0ZXInO1xuaW1wb3J0IHsgU2ltcGxlT3JnYW5pc2F0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vb3JnYW5pc2F0aW9uL3NpbXBsZS1vcmdhbmlzYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgT3JnYW5pc2F0aW9uU2VydmljZSwgT3JnYW5pc2F0aW9uVm0gfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9vcmdhbmlzYXRpb24vb3JnYW5pc2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2luZG93U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3dpbmRvdy93aW5kb3cuc2VydmljZSc7XG5cbmltcG9ydCB7IEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtd3JpdGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXdyaXRlLW9yZ2FuaXNhdGlvbi1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93cml0ZS1vcmdhbmlzYXRpb24tZmllbGQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9vcmdhbmlzYXRpb24tZmllbGQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdyaXRlT3JnYW5pc2F0aW9uRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVNUFRZX1NJTVBMRV9PUkc6IFNpbXBsZU9yZ2FuaXNhdGlvbk1vZGVsID0geyBvcmdhbmlzYXRpb25JZGVudGlmaWVyOiAnJywgbmFtZTogJycsIGFkZHJlc3M6ICcnIH07XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE1BWF9SRVNVTFRfQ09VTlQ6IG51bWJlciA9IDEwMDtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgT1JHQU5JU0FUSU9OX0lEOiBzdHJpbmcgPSAnT3JnYW5pc2F0aW9uSUQnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBPUkdBTklTQVRJT05fTkFNRTogc3RyaW5nID0gJ09yZ2FuaXNhdGlvbk5hbWUnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBQUkVfUE9QVUxBVEVfVE9fVVNFUlNfT1JHQU5JU0FUSU9OOiBzdHJpbmcgPSAnUHJlcG9wdWxhdGVUb1VzZXJzT3JnYW5pc2F0aW9uJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgT1JHQU5JU0FUSU9OX0RFVEFJTFM6IHN0cmluZyA9ICdvcmdhbmlzYXRpb25EZXRhaWxzJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgWUVTOiBzdHJpbmcgPSAnWUVTJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTUFOREFUT1JZOiBzdHJpbmcgPSAnTUFOREFUT1JZJztcbiAgcHVibGljIGRlZmF1bHRPcmc6IGFueTtcblxuICBwdWJsaWMgb3JnYW5pc2F0aW9uRm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBwdWJsaWMgc2VhcmNoT3JnVGV4dEZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcbiAgcHVibGljIG9yZ2FuaXNhdGlvbklERm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICBwdWJsaWMgb3JnYW5pc2F0aW9uTmFtZUZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcblxuICBwdWJsaWMgb3JnYW5pc2F0aW9ucyQ6IE9ic2VydmFibGU8T3JnYW5pc2F0aW9uVm1bXT47XG4gIHB1YmxpYyBzZWFyY2hPcmdWYWx1ZSQ6IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgcHVibGljIHNpbXBsZU9yZ2FuaXNhdGlvbnMkOiBPYnNlcnZhYmxlPFNpbXBsZU9yZ2FuaXNhdGlvbk1vZGVsW10+O1xuICBwdWJsaWMgc2VsZWN0ZWRPcmckOiBPYnNlcnZhYmxlPFNpbXBsZU9yZ2FuaXNhdGlvbk1vZGVsPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IG9yZ2FuaXNhdGlvblNlcnZpY2U6IE9yZ2FuaXNhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBvcmdhbmlzYXRpb25Db252ZXJ0ZXI6IE9yZ2FuaXNhdGlvbkNvbnZlcnRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdpbmRvd1NlcnZpY2U6IFdpbmRvd1NlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZGVmYXVsdE9yZyA9IEpTT04ucGFyc2UodGhpcy53aW5kb3dTZXJ2aWNlLmdldFNlc3Npb25TdG9yYWdlKFdyaXRlT3JnYW5pc2F0aW9uRmllbGRDb21wb25lbnQuT1JHQU5JU0FUSU9OX0RFVEFJTFMpKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm9yZ2FuaXNhdGlvbnMkID0gdGhpcy5vcmdhbmlzYXRpb25TZXJ2aWNlLmdldEFjdGl2ZU9yZ2FuaXNhdGlvbnMoKTtcblxuICAgIHRoaXMuc2VhcmNoT3JnVGV4dEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnKTtcbiAgICB0aGlzLnNlYXJjaE9yZ1ZhbHVlJCA9IHRoaXMuc2VhcmNoT3JnVGV4dEZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcztcbiAgICB0aGlzLnNlYXJjaE9yZ1ZhbHVlJC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5vblNlYXJjaE9yZyh2YWx1ZSkpO1xuXG4gICAgdGhpcy5vcmdhbmlzYXRpb25Gb3JtR3JvdXAgPSB0aGlzLnJlZ2lzdGVyQ29udHJvbChuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSksIHRydWUpIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgaWYgKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmNvbnRyb2xzICYmIHRoaXMucGFyZW50LmNvbnRyb2xzLmhhc093blByb3BlcnR5KFdyaXRlT3JnYW5pc2F0aW9uRmllbGRDb21wb25lbnQuUFJFX1BPUFVMQVRFX1RPX1VTRVJTX09SR0FOSVNBVElPTilcbiAgICAgICYmIHRoaXMucGFyZW50LmNvbnRyb2xzW1dyaXRlT3JnYW5pc2F0aW9uRmllbGRDb21wb25lbnQuUFJFX1BPUFVMQVRFX1RPX1VTRVJTX09SR0FOSVNBVElPTl0udmFsdWVcbiAgICAgICYmIHRoaXMucGFyZW50LmNvbnRyb2xzW1dyaXRlT3JnYW5pc2F0aW9uRmllbGRDb21wb25lbnQuUFJFX1BPUFVMQVRFX1RPX1VTRVJTX09SR0FOSVNBVElPTl0udmFsdWUudG9VcHBlckNhc2UoKVxuICAgICAgPT09IFdyaXRlT3JnYW5pc2F0aW9uRmllbGRDb21wb25lbnQuWUVTKSB7XG4gICAgICBpZiAodGhpcy5jYXNlRmllbGQgJiYgIXRoaXMuY2FzZUZpZWxkLnZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2FzZUZpZWxkLnZhbHVlID0ge1xuICAgICAgICAgIE9yZ2FuaXNhdGlvbklEOiB0aGlzLmRlZmF1bHRPcmcgPyB0aGlzLmRlZmF1bHRPcmcub3JnYW5pc2F0aW9uSWRlbnRpZmllciA6IG51bGwsXG4gICAgICAgICAgT3JnYW5pc2F0aW9uTmFtZTogdGhpcy5kZWZhdWx0T3JnID8gdGhpcy5kZWZhdWx0T3JnLm5hbWUgOiBudWxsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB0aGlzLnByZVNlbGVjdERlZmF1bHRPcmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY2FzZUZpZWxkICYmIHRoaXMuY2FzZUZpZWxkLnZhbHVlICYmIHRoaXMuY2FzZUZpZWxkLnZhbHVlLk9yZ2FuaXNhdGlvbklEKSB7XG4gICAgICAgIHRoaXMucHJlU2VsZWN0RGVmYXVsdE9yZygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wcmVTZWxlY3RFbXB0eU9yZygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGF0IGFsbCBzdWItZmllbGRzIGluaGVyaXQgdGhlIHNhbWUgdmFsdWUgZm9yIHJldGFpbl9oaWRkZW5fdmFsdWUgYXMgdGhpcyBwYXJlbnQ7IGFsdGhvdWdoIGFuXG4gICAgLy8gT3JnYW5pc2F0aW9uIGZpZWxkIHVzZXMgdGhlIENvbXBsZXggdHlwZSwgaXQgaXMgbWVhbnQgdG8gYmUgdHJlYXRlZCBhcyBvbmUgZmllbGRcbiAgICBpZiAodGhpcy5jYXNlRmllbGQgJiYgdGhpcy5jYXNlRmllbGQuZmllbGRfdHlwZS50eXBlID09PSAnQ29tcGxleCcpIHtcbiAgICAgIGZvciAoY29uc3Qgb3JnYW5pc2F0aW9uU3ViRmllbGQgb2YgdGhpcy5jYXNlRmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcykge1xuICAgICAgICBvcmdhbmlzYXRpb25TdWJGaWVsZC5yZXRhaW5faGlkZGVuX3ZhbHVlID0gdGhpcy5jYXNlRmllbGQucmV0YWluX2hpZGRlbl92YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25TZWFyY2hPcmcob3JnU2VhcmNoVGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKG9yZ1NlYXJjaFRleHQgJiYgb3JnU2VhcmNoVGV4dC5sZW5ndGggPj0gMikge1xuICAgICAgY29uc3QgbG93ZXJPcmdTZWFyY2hUZXh0ID0gb3JnU2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgdGhpcy5zaW1wbGVPcmdhbmlzYXRpb25zJCA9IHRoaXMub3JnYW5pc2F0aW9ucyQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKG9yZ2FuaXNhdGlvbnMgPT4gb2YoXG4gICAgICAgICAgdGhpcy5zZWFyY2hPcmcob3JnYW5pc2F0aW9ucywgbG93ZXJPcmdTZWFyY2hUZXh0KVxuICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2ltcGxlT3JnYW5pc2F0aW9ucyQgPSBvZihbXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVGhlIHdheSB0aGUgc2VhcmNoIHdvcmtzIGRpdmlkZSBpbnRvIHR3byBwaGFzZXNcbiAgLy8gMS4gZ28gdGhyb3VnaCBjb2xsZWN0aW9uIG9mIG9yZyBpdGVtcyBvbmUgYnkgb25lIGJ5IGRvaW5nIHRoZSBjb21wYXJzaW9uIG9mIHNlYXJjaCBzdHJpbmcgdXNpbmcgaW5jbHVkZXMgdG8gYWxsIHRoZSBhZGRyZXNzIGZpZWxkc1xuICAvLyAyLiBzcGxpdCB0aGUgc2VhcmNoIHN0cmluZyBpbnRvIGFycmF5cyBhbmQgYXBwbHkgdGhlIGVhY2ggYXJyYXkgaXRlbSBpbnRvIHRoZSBhZGRyZXNzIGZpZWxkc1xuICAvLyAzLiBib3RoIHN0ZXAgMSwgMiB3aWxsIGdvIHVudGlsIG1heCBjb3VudCByZXN1bHQgcmVhY2hlcywgYW5kIGZpbmFsbHkgY29tYmluZSBib3RoIHJlc3VsdCBzZXRzIGludG8gZmluYWwgY29sbGVjdGlvblxuICBwdWJsaWMgc2VhcmNoT3JnKG9yZ2FuaXNhdGlvbnM6IE9yZ2FuaXNhdGlvblZtW10sIGxvd2VyT3JnU2VhcmNoVGV4dDogc3RyaW5nKTogU2ltcGxlT3JnYW5pc2F0aW9uTW9kZWxbXSB7XG4gICAgY29uc3QgcGFydE1hdGNoaW5nUmVzdWx0U2V0ID0gW107XG4gICAgY29uc3Qgd2l0aFNwYWNlTWF0Y2hpbmdSZXN1bHRTZXQgPSBbXTtcbiAgICBjb25zdCBNQVhfUkVTVUxUX0NPVU5UID0gV3JpdGVPcmdhbmlzYXRpb25GaWVsZENvbXBvbmVudC5NQVhfUkVTVUxUX0NPVU5UO1xuICAgIG9yZ2FuaXNhdGlvbnMuZm9yRWFjaCgob3JnYW5pc2F0aW9uKSA9PiB7XG4gICAgICBpZiAocGFydE1hdGNoaW5nUmVzdWx0U2V0Lmxlbmd0aCA8IE1BWF9SRVNVTFRfQ09VTlQgJiYgdGhpcy5zZWFyY2hDcml0ZXJpYShvcmdhbmlzYXRpb24sIGxvd2VyT3JnU2VhcmNoVGV4dCkpIHtcbiAgICAgICAgcGFydE1hdGNoaW5nUmVzdWx0U2V0LnB1c2gob3JnYW5pc2F0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG9yZ2FuaXNhdGlvbnMuZm9yRWFjaCgob3JnKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHRTZXQgPSBbLi4ucGFydE1hdGNoaW5nUmVzdWx0U2V0LCAuLi53aXRoU3BhY2VNYXRjaGluZ1Jlc3VsdFNldF07XG4gICAgICBjb25zdCBoYXNNYXRjaGluZ09yZ2FuaXNhdGlvbiA9IHJlc3VsdFNldC5maW5kKGl0ZW0gPT4gaXRlbS5vcmdhbmlzYXRpb25JZGVudGlmaWVyID09PSBvcmcub3JnYW5pc2F0aW9uSWRlbnRpZmllcik7XG4gICAgICBjb25zdCBzZWFyY2hIYXNTcGFjZSA9IHRoaXMuc2VhcmNoV2l0aFNwYWNlKG9yZywgbG93ZXJPcmdTZWFyY2hUZXh0KTtcbiAgICAgIGNvbnN0IGhhc1Jlc3VsdFNldEJlbG93TWF4Q291bnQgPSByZXN1bHRTZXQubGVuZ3RoIDwgTUFYX1JFU1VMVF9DT1VOVDtcblxuICAgICAgaWYgKCFoYXNNYXRjaGluZ09yZ2FuaXNhdGlvbiAmJiBwYXJ0TWF0Y2hpbmdSZXN1bHRTZXQubGVuZ3RoID09PSAwICYmIGhhc1Jlc3VsdFNldEJlbG93TWF4Q291bnQgJiYgc2VhcmNoSGFzU3BhY2UpIHtcbiAgICAgICAgd2l0aFNwYWNlTWF0Y2hpbmdSZXN1bHRTZXQucHVzaChvcmcpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBbLi4ucGFydE1hdGNoaW5nUmVzdWx0U2V0LCAuLi53aXRoU3BhY2VNYXRjaGluZ1Jlc3VsdFNldF0ubWFwKChvcmdhbmlzYXRpb24pID0+XG4gICAgICB0aGlzLm9yZ2FuaXNhdGlvbkNvbnZlcnRlci50b1NpbXBsZU9yZ2FuaXNhdGlvbk1vZGVsKG9yZ2FuaXNhdGlvbilcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHRyaW1BbGwob2xkVGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gb2xkVGV4dC5yZXBsYWNlKC9cXHMrL2csICcnKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RPcmcoc2VsZWN0ZWRPcmc6IFNpbXBsZU9yZ2FuaXNhdGlvbk1vZGVsKTogdm9pZCB7XG4gICAgdGhpcy5vcmdhbmlzYXRpb25JREZvcm1Db250cm9sLnNldFZhbHVlKHNlbGVjdGVkT3JnLm9yZ2FuaXNhdGlvbklkZW50aWZpZXIpO1xuICAgIHRoaXMub3JnYW5pc2F0aW9uTmFtZUZvcm1Db250cm9sLnNldFZhbHVlKHNlbGVjdGVkT3JnLm5hbWUpO1xuICAgIHRoaXMuc2VsZWN0ZWRPcmckID0gb2Yoc2VsZWN0ZWRPcmcpO1xuICAgIHRoaXMuc2ltcGxlT3JnYW5pc2F0aW9ucyQgPSBvZihbLi4uW10sIHNlbGVjdGVkT3JnXSk7XG4gICAgdGhpcy5zZWFyY2hPcmdUZXh0Rm9ybUNvbnRyb2wuc2V0VmFsdWUoJycpO1xuICAgIHRoaXMuc2VhcmNoT3JnVGV4dEZvcm1Db250cm9sLmRpc2FibGUoKTtcbiAgICB0aGlzLmNhc2VGaWVsZC52YWx1ZSA9IHtcbiAgICAgIE9yZ2FuaXNhdGlvbklEOiBzZWxlY3RlZE9yZy5vcmdhbmlzYXRpb25JZGVudGlmaWVyLFxuICAgICAgT3JnYW5pc2F0aW9uTmFtZTogc2VsZWN0ZWRPcmcubmFtZVxuICAgIH07XG4gICAgdGhpcy5vcmdhbmlzYXRpb25Gb3JtR3JvdXAuc2V0VmFsdWUodGhpcy5jYXNlRmllbGQudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGRlU2VsZWN0T3JnKCk6IHZvaWQge1xuICAgIHRoaXMub3JnYW5pc2F0aW9uSURGb3JtQ29udHJvbC5yZXNldCgpO1xuICAgIHRoaXMub3JnYW5pc2F0aW9uTmFtZUZvcm1Db250cm9sLnJlc2V0KCk7XG4gICAgdGhpcy5zZWxlY3RlZE9yZyQgPSBvZihXcml0ZU9yZ2FuaXNhdGlvbkZpZWxkQ29tcG9uZW50LkVNUFRZX1NJTVBMRV9PUkcpO1xuICAgIHRoaXMuc2ltcGxlT3JnYW5pc2F0aW9ucyQgPSBvZihbXSk7XG4gICAgdGhpcy5zZWFyY2hPcmdUZXh0Rm9ybUNvbnRyb2wuc2V0VmFsdWUoJycpO1xuICAgIHRoaXMuc2VhcmNoT3JnVGV4dEZvcm1Db250cm9sLmVuYWJsZSgpO1xuICAgIHRoaXMuY2FzZUZpZWxkLnZhbHVlID0geyBPcmdhbmlzYXRpb25JRDogbnVsbCwgT3JnYW5pc2F0aW9uTmFtZTogbnVsbCB9O1xuICAgIHRoaXMub3JnYW5pc2F0aW9uRm9ybUdyb3VwLnNldFZhbHVlKHRoaXMuY2FzZUZpZWxkLnZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlU2VsZWN0RGVmYXVsdE9yZygpOiB2b2lkIHtcbiAgICB0aGlzLmluc3RhbnRpYXRlT3JnYW5pc2F0aW9uRm9ybUdyb3VwKHRoaXMuY2FzZUZpZWxkLnZhbHVlLk9yZ2FuaXNhdGlvbklELCB0aGlzLmNhc2VGaWVsZC52YWx1ZS5PcmdhbmlzYXRpb25OYW1lKTtcbiAgICB0aGlzLnNlbGVjdGVkT3JnJCA9IHRoaXMub3JnYW5pc2F0aW9ucyQucGlwZShcbiAgICAgIG1hcChvcmdhbmlzYXRpb25zID0+XG4gICAgICAgIG9yZ2FuaXNhdGlvbnMuZmlsdGVyKGZpbmRPcmcgPT4ge1xuICAgICAgICAgIHJldHVybiBmaW5kT3JnLm9yZ2FuaXNhdGlvbklkZW50aWZpZXIgPT09IHRoaXMuY2FzZUZpZWxkLnZhbHVlLk9yZ2FuaXNhdGlvbklEO1xuICAgICAgICB9KVxuICAgICAgICAgIC5tYXAob3JnYW5pc2F0aW9uID0+IHRoaXMub3JnYW5pc2F0aW9uQ29udmVydGVyLnRvU2ltcGxlT3JnYW5pc2F0aW9uTW9kZWwob3JnYW5pc2F0aW9uKSlbMF0pLFxuICAgICk7XG4gICAgaWYgKHRoaXMuY2FzZUZpZWxkLnZhbHVlICYmIHRoaXMuY2FzZUZpZWxkLnZhbHVlLk9yZ2FuaXNhdGlvbklEKSB7XG4gICAgICB0aGlzLnNlYXJjaE9yZ1RleHRGb3JtQ29udHJvbC5kaXNhYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcmVTZWxlY3RFbXB0eU9yZygpOiB2b2lkIHtcbiAgICB0aGlzLmluc3RhbnRpYXRlT3JnYW5pc2F0aW9uRm9ybUdyb3VwKG51bGwsIG51bGwpO1xuICAgIHRoaXMuc2VsZWN0ZWRPcmckID0gb2YoV3JpdGVPcmdhbmlzYXRpb25GaWVsZENvbXBvbmVudC5FTVBUWV9TSU1QTEVfT1JHKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5zdGFudGlhdGVPcmdhbmlzYXRpb25Gb3JtR3JvdXAob3JnSURTdGF0ZTogYW55LCBvcmdOYW1lU3RhdGU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMub3JnYW5pc2F0aW9uSURGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChvcmdJRFN0YXRlKTtcbiAgICB0aGlzLmFkZE9yZ2FuaXNhdGlvblZhbGlkYXRvcnModGhpcy5jYXNlRmllbGQsIHRoaXMub3JnYW5pc2F0aW9uSURGb3JtQ29udHJvbCk7XG4gICAgdGhpcy5vcmdhbmlzYXRpb25Gb3JtR3JvdXAuYWRkQ29udHJvbChXcml0ZU9yZ2FuaXNhdGlvbkZpZWxkQ29tcG9uZW50Lk9SR0FOSVNBVElPTl9JRCwgdGhpcy5vcmdhbmlzYXRpb25JREZvcm1Db250cm9sKTtcbiAgICB0aGlzLm9yZ2FuaXNhdGlvbk5hbWVGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChvcmdOYW1lU3RhdGUpO1xuICAgIHRoaXMub3JnYW5pc2F0aW9uRm9ybUdyb3VwLmFkZENvbnRyb2woV3JpdGVPcmdhbmlzYXRpb25GaWVsZENvbXBvbmVudC5PUkdBTklTQVRJT05fTkFNRSwgdGhpcy5vcmdhbmlzYXRpb25OYW1lRm9ybUNvbnRyb2wpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRPcmdhbmlzYXRpb25WYWxpZGF0b3JzKGNhc2VGaWVsZDogQ2FzZUZpZWxkLCBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB2b2lkIHtcbiAgICBpZiAoY2FzZUZpZWxkLmZpZWxkX3R5cGUgJiYgY2FzZUZpZWxkLmZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMpIHtcbiAgICAgIGNvbnN0IG9yZ2FuaXNhdGlvbklkRmllbGQgPSBjYXNlRmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkc1xuICAgICAgICAuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gV3JpdGVPcmdhbmlzYXRpb25GaWVsZENvbXBvbmVudC5PUkdBTklTQVRJT05fSUQpO1xuICAgICAgdGhpcy5hZGRWYWxpZGF0b3JzKG9yZ2FuaXNhdGlvbklkRmllbGQsIGNvbnRyb2wpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VhcmNoQ3JpdGVyaWEob3JnYW5pc2F0aW9uOiBPcmdhbmlzYXRpb25WbSwgbG93ZXJPcmdTZWFyY2hUZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAob3JnYW5pc2F0aW9uLnBvc3RDb2RlICYmIG9yZ2FuaXNhdGlvbi5wb3N0Q29kZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGxvd2VyT3JnU2VhcmNoVGV4dCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAob3JnYW5pc2F0aW9uLnBvc3RDb2RlICYmIHRoaXMudHJpbUFsbChvcmdhbmlzYXRpb24ucG9zdENvZGUpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobG93ZXJPcmdTZWFyY2hUZXh0KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChvcmdhbmlzYXRpb24ucG9zdENvZGUgJiYgb3JnYW5pc2F0aW9uLnBvc3RDb2RlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGhpcy50cmltQWxsKGxvd2VyT3JnU2VhcmNoVGV4dCkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9yZ2FuaXNhdGlvbi5uYW1lICYmIG9yZ2FuaXNhdGlvbi5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobG93ZXJPcmdTZWFyY2hUZXh0KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChvcmdhbmlzYXRpb24uYWRkcmVzc0xpbmUxICYmIG9yZ2FuaXNhdGlvbi5hZGRyZXNzTGluZTEudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhsb3dlck9yZ1NlYXJjaFRleHQpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9yZ2FuaXNhdGlvbi5hZGRyZXNzTGluZTIgJiYgb3JnYW5pc2F0aW9uLmFkZHJlc3NMaW5lMi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGxvd2VyT3JnU2VhcmNoVGV4dCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAob3JnYW5pc2F0aW9uLmFkZHJlc3NMaW5lMyAmJiBvcmdhbmlzYXRpb24uYWRkcmVzc0xpbmUzLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobG93ZXJPcmdTZWFyY2hUZXh0KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChvcmdhbmlzYXRpb24udG93bkNpdHkgJiYgb3JnYW5pc2F0aW9uLnRvd25DaXR5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobG93ZXJPcmdTZWFyY2hUZXh0KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChvcmdhbmlzYXRpb24uY291bnR5ICYmIG9yZ2FuaXNhdGlvbi5jb3VudHkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhsb3dlck9yZ1NlYXJjaFRleHQpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIFJlZHVuZGFudElmU3RhdGVtZW50SlNcbiAgICBpZiAob3JnYW5pc2F0aW9uLmNvdW50cnkgJiYgb3JnYW5pc2F0aW9uLmNvdW50cnkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhsb3dlck9yZ1NlYXJjaFRleHQpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hXaXRoU3BhY2Uob3JnYW5pc2F0aW9uOiBPcmdhbmlzYXRpb25WbSwgbG93ZXJPcmdTZWFyY2hUZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBzZWFyY2hUZXh0QXJyYXk6IHN0cmluZ1tdID0gbG93ZXJPcmdTZWFyY2hUZXh0LnNwbGl0KC9cXHMrL2cpO1xuICAgIGZvciAoY29uc3Qgc2luZ2xlU2VhcmNoVGV4dCBvZiBzZWFyY2hUZXh0QXJyYXkpIHtcbiAgICAgIGlmIChzaW5nbGVTZWFyY2hUZXh0ICYmIHRoaXMuc2VhcmNoQ3JpdGVyaWEob3JnYW5pc2F0aW9uLCBzaW5nbGVTZWFyY2hUZXh0KSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgW2Zvcm1Hcm91cF09XCJvcmdhbmlzYXRpb25Gb3JtR3JvdXBcIj5cbiAgPGZpZWxkc2V0ICpuZ0lmPVwiKG9yZ2FuaXNhdGlvbnMkIHwgYXN5bmMpPy5sZW5ndGggPT09IDBcIiBjbGFzcz1cImdvdnVrLWZpZWxkc2V0XCI+XG4gICAgPGxlZ2VuZCBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+PC9sZWdlbmQ+XG4gICAgPGRpdiBjbGFzcz1cImhtY3RzLWJhbm5lclwiPlxuICAgICAgPHN2ZyBjbGFzcz1cImhtY3RzLWJhbm5lcl9faWNvblwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNSAyNVwiIGhlaWdodD1cIjI1XCIgd2lkdGg9XCIyNVwiPlxuICAgICAgICA8cGF0aCBkPVwiTTEzLjcsMTguNWgtMi40di0yLjRoMi40VjE4LjV6IE0xMi41LDEzLjdjLTAuNywwLTEuMi0wLjUtMS4yLTEuMlY3LjdjMC0wLjcsMC41LTEuMiwxLjItMS4yczEuMiwwLjUsMS4yLDEuMnY0LjhcbiAgQzEzLjcsMTMuMiwxMy4yLDEzLjcsMTIuNSwxMy43eiBNMTIuNSwwLjVjLTYuNiwwLTEyLDUuNC0xMiwxMnM1LjQsMTIsMTIsMTJzMTItNS40LDEyLTEyUzE5LjEsMC41LDEyLjUsMC41elwiIC8+PC9zdmc+XG4gICAgICA8ZGl2IGNsYXNzPVwiaG1jdHMtYmFubmVyX19tZXNzYWdlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaG1jdHMtYmFubmVyX19hc3Npc3RpdmVcIj57eydpbmZvcm1hdGlvbicgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgICAgICAgICA8cCBjbGFzcz1cIndhcm5pbmctbWVzc2FnZVwiPnt7J09yZ2FuaXNhdGlvbiBzZWFyY2ggaXMgY3VycmVudGx5IHVuYXZhaWxhYmxlLicgfCBycHhUcmFuc2xhdGV9fTwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ3YXJuaW5nLXBhbmVsXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwid2FybmluZy1tZXNzYWdlXCI+XG4gICAgICAgIHt7J1dlIGFyZSB3b3JraW5nIHRvIGZpeCB0aGUgaXNzdWUuWW91IGNhbiB0cnkgYWdhaW4gbGF0ZXIuJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9maWVsZHNldD5cbiAgPGZpZWxkc2V0ICpuZ0lmPVwiKG9yZ2FuaXNhdGlvbnMkIHwgYXN5bmMpPy5sZW5ndGggPiAwXCIgY2xhc3M9XCJnb3Z1ay1maWVsZHNldFwiPlxuICAgIDxsZWdlbmQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldF9fbGVnZW5kIGdvdnVrLWZpZWxkc2V0X19sZWdlbmQtLWxcIj5cbiAgICAgIDxoMiBjbGFzcz1cImhlYWRpbmctaDJcIj5cbiAgICAgICAge3snU2VhcmNoIGZvciBhbiBvcmdhbmlzYXRpb24nIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgIDwvaDI+XG4gICAgPC9sZWdlbmQ+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIj5cbiAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsXCIgZm9yPVwic2VhcmNoLW9yZy10ZXh0XCI+XG4gICAgICAgIDxzcGFuIGlkPVwic2VhcmNoLW9yZy1oaW50XCIgY2xhc3M9XCJnb3Z1ay1oaW50XCI+XG4gICAgICAgICAge3snWW91IGNhbiBvbmx5IHNlYXJjaCBmb3Igb3JnYW5pc2F0aW9ucyBhbHJlYWR5IHJlZ2lzdGVyZWQgd2l0aCBNeUhNQ1RTLiBGb3IgZXhhbXBsZSwgeW91IGNhbiBzZWFyY2ggYnkgb3JnYW5pc2F0aW9uIG5hbWUgb3IgYWRkcmVzcy4nIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxpbnB1dCBpZD1cInNlYXJjaC1vcmctdGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBbZm9ybUNvbnRyb2xdPVwic2VhcmNoT3JnVGV4dEZvcm1Db250cm9sXCIvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbFwiIGZvcj1cIm9yZ2FuaXNhdGlvbi10YWJsZVwiPlxuICAgICAgICA8aDIgY2xhc3M9XCJoZWFkaW5nLWgyXCI+e3snT3JnYW5pc2F0aW9uIG5hbWUgYW5kIGFkZHJlc3MnIHwgcnB4VHJhbnNsYXRlfX08L2gyPlxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxociBjbGFzcz1cImdvdnVrLXNlY3Rpb24tYnJlYWsgZ292dWstc2VjdGlvbi1icmVhay0tdmlzaWJsZVwiPlxuICAgICAgPGRpdiAqbmdJZj1cIiEoc2VsZWN0ZWRPcmckIHwgYXN5bmMpPy5vcmdhbmlzYXRpb25JZGVudGlmaWVyOyBlbHNlIHNlbGVjdGVkT3JnYW5pc2F0aW9uXCIgW25nQ2xhc3NdPVwieydzY3JvbGwtY29udGFpbmVyICc6IChzaW1wbGVPcmdhbmlzYXRpb25zJCB8IGFzeW5jKT8ubGVuZ3RoID4gMTB9XCI+XG4gICAgICAgIDx0YWJsZSBpZD1cIm9yZ2FuaXNhdGlvbi10YWJsZVwiICpuZ0Zvcj1cImxldCBvcmdhbmlzYXRpb24gb2YgKHNpbXBsZU9yZ2FuaXNhdGlvbnMkIHwgYXN5bmMpXCI+XG4gICAgICAgICAgPGNhcHRpb24+PGgzIGNsYXNzPVwibmFtZS1oZWFkZXJcIj57e29yZ2FuaXNhdGlvbi5uYW1lfX08L2gzPjwvY2FwdGlvbj5cbiAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0aCBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+PC90aD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGQtYWRkcmVzc1wiPlxuICAgICAgICAgICAgICAgIDxjY2QtbWFya2Rvd24gW2NvbnRlbnRdPVwib3JnYW5pc2F0aW9uLmFkZHJlc3NcIj48L2NjZC1tYXJrZG93bj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGQtc2VsZWN0XCI+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIiAoY2xpY2spPVwic2VsZWN0T3JnKG9yZ2FuaXNhdGlvbilcIiB0aXRsZT1cInt7J1NlbGVjdCB0aGUgb3JnYW5pc2F0aW9uJyB8IHJweFRyYW5zbGF0ZX19IHt7b3JnYW5pc2F0aW9uLm5hbWV9fVwiPlxuICAgICAgICAgICAgICAgICAge3snU2VsZWN0JyB8IHJweFRyYW5zbGF0ZX19XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiKHNpbXBsZU9yZ2FuaXNhdGlvbnMkIHwgYXN5bmMpPy5sZW5ndGggPT09IDAgJiYgKHNlYXJjaE9yZ1ZhbHVlJCB8IGFzeW5jKT8ubGVuZ3RoID4gMlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuby1yZXN1bHQtbWVzc2FnZVwiPlxuICAgICAgICAgICAge3snTm8gcmVzdWx0cyBmb3VuZC4nIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjc2VsZWN0ZWRPcmdhbmlzYXRpb24+XG4gICAgICAgIDx0YWJsZSBpZD1cIm9yZ2FuaXNhdGlvbi1zZWxlY3RlZC10YWJsZVwiICpuZ0lmPVwiKHNlbGVjdGVkT3JnJCB8IGFzeW5jKSBhcyBzZWxlY3RlZE9yZ1wiPlxuICAgICAgICAgIDxjYXB0aW9uPjxoMyBjbGFzcz1cIm5hbWUtaGVhZGVyXCI+e3tzZWxlY3RlZE9yZy5uYW1lfX08L2gzPjwvY2FwdGlvbj5cbiAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0aCBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+PC90aD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGQtYWRkcmVzc1wiPlxuICAgICAgICAgICAgICAgIDxjY2QtbWFya2Rvd24gW2NvbnRlbnRdPVwic2VsZWN0ZWRPcmcuYWRkcmVzc1wiPjwvY2NkLW1hcmtkb3duPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0ZC1zZWxlY3RcIj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiIChjbGljayk9XCJkZVNlbGVjdE9yZygpXCJcbiAgICAgICAgICAgICAgICAgICB0aXRsZT1cInt7J0NsZWFyIG9yZ2FuaXNhdGlvbiBzZWxlY3Rpb24gZm9yJyB8IHJweFRyYW5zbGF0ZX19IHt7c2VsZWN0ZWRPcmcubmFtZX19XCI+XG4gICAgICAgICAgICAgICAgICB7eydDbGVhcicgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gICAgPGNjZC13cml0ZS1vcmdhbmlzYXRpb24tY29tcGxleC1maWVsZCBbY2FzZUZpZWxkXT1cImNhc2VGaWVsZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2VsZWN0ZWRPcmckXT1cInNlbGVjdGVkT3JnJFwiPlxuICAgIDwvY2NkLXdyaXRlLW9yZ2FuaXNhdGlvbi1jb21wbGV4LWZpZWxkPlxuICAgIDxkZXRhaWxzIGlkPVwiZmluZC1vcmdhbmlzYXRpb24taGVscFwiIGNsYXNzPVwiZ292dWstZGV0YWlsc1wiIGRhdGEtbW9kdWxlPVwiZ292dWstZGV0YWlsc1wiPlxuICAgICAgPHN1bW1hcnkgY2xhc3M9XCJnb3Z1ay1kZXRhaWxzX19zdW1tYXJ5XCI+XG4gICAgICA8c3BhbiBpZD1cImNvbnRlbnQtd2h5LWNhbi1ub3QtZmluZC1vcmdhbmlzYXRpb25cIiBjbGFzcz1cImdvdnVrLWRldGFpbHNfX3N1bW1hcnktdGV4dFwiPlxuICAgICAgICB7e1wiQ2Fu4oCZdCBmaW5kIHRoZSBvcmdhbmlzYXRpb24geW91IGFyZSBsb29raW5nIGZvcj9cIiB8IHJweFRyYW5zbGF0ZX19XG4gICAgICA8L3NwYW4+XG4gICAgICA8L3N1bW1hcnk+XG4gICAgICA8ZGl2IGlkPVwiY29udGVudC1yZWFzb24tY2FuLW5vdC1maW5kLW9yZ2FuaXNhdGlvblwiIGNsYXNzPVwiZ292dWstZGV0YWlsc19fdGV4dFwiPlxuICAgICAgICB7eydJZiB5b3Uga25vdyB0aGF0IHRoZSBzb2xpY2l0b3IgaXMgYWxyZWFkeSByZWdpc3RlcmVkIHdpdGggTXlITUNUUywgY2hlY2sgdGhhdCB5b3UgaGF2ZSBlbnRlcmVkIHRoZWlyIGRldGFpbHMgY29ycmVjdGx5LicgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgICB7e1wiUmVtZW1iZXIgdGhhdCBvcmdhbmlzYXRpb25zIGNhbiBvbmx5IHJlZ2lzdGVyIG9uZSBvZmZpY2UgYWRkcmVzcy4gVGhpcyBtZWFucyB0aGF0IHRoZSBkZXRhaWxzIGNvdWxkIGJlIHNsaWdodGx5IGRpZmZlcmVudCBmcm9tIHdoYXQgeW91J3JlIGV4cGVjdGluZy4gQ29udGFjdCB0aGUgc29saWNpdG9yIGRpcmVjdGx5IGlmIHlvdSBoYXZlIGFueSBjb25jZXJucy5cIiB8IHJweFRyYW5zbGF0ZX19XG4gICAgICA8L2Rpdj5cbiAgICA8L2RldGFpbHM+XG4gIDwvZmllbGRzZXQ+XG48L2Rpdj5cbiJdfQ==