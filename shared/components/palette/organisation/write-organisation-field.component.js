"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var forms_1 = require("@angular/forms");
var organisation_1 = require("../../../domain/organisation");
var rxjs_1 = require("rxjs");
var organisation_2 = require("../../../services/organisation");
var operators_1 = require("rxjs/operators");
var services_1 = require("../../../services");
var WriteOrganisationFieldComponent = /** @class */ (function (_super) {
    __extends(WriteOrganisationFieldComponent, _super);
    function WriteOrganisationFieldComponent(organisationService, organisationConverter, windowService) {
        var _this = _super.call(this) || this;
        _this.organisationService = organisationService;
        _this.organisationConverter = organisationConverter;
        _this.windowService = windowService;
        _this.defaultOrg = JSON.parse(_this.windowService.getSessionStorage(WriteOrganisationFieldComponent_1.ORGANISATION_DETAILS));
        return _this;
    }
    WriteOrganisationFieldComponent_1 = WriteOrganisationFieldComponent;
    WriteOrganisationFieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.organisations$ = this.organisationService.getActiveOrganisations();
        this.searchOrgTextFormControl = new forms_1.FormControl('');
        this.searchOrgValue$ = this.searchOrgTextFormControl.valueChanges;
        this.searchOrgValue$.subscribe(function (value) { return _this.onSearchOrg(value); });
        this.organisationFormGroup = this.registerControl(new forms_1.FormGroup({}), true);
        if (this.parent.controls && this.parent.controls.hasOwnProperty(WriteOrganisationFieldComponent_1.PRE_POPULATE_TO_USERS_ORGANISATION)
            && this.parent.controls[WriteOrganisationFieldComponent_1.PRE_POPULATE_TO_USERS_ORGANISATION].value
            && this.parent.controls[WriteOrganisationFieldComponent_1.PRE_POPULATE_TO_USERS_ORGANISATION].value.toUpperCase()
                === WriteOrganisationFieldComponent_1.YES) {
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
            for (var _i = 0, _a = this.caseField.field_type.complex_fields; _i < _a.length; _i++) {
                var organisationSubField = _a[_i];
                organisationSubField.retain_hidden_value = this.caseField.retain_hidden_value;
            }
        }
    };
    WriteOrganisationFieldComponent.prototype.preSelectDefaultOrg = function () {
        var _this = this;
        this.instantiateOrganisationFormGroup(this.caseField.value.OrganisationID, this.caseField.value.OrganisationName);
        this.selectedOrg$ = this.organisations$.pipe(operators_1.map(function (organisations) {
            return organisations.filter(function (findOrg) { return findOrg.organisationIdentifier === _this.caseField.value.OrganisationID; })
                .map(function (organisation) { return _this.organisationConverter.toSimpleOrganisationModel(organisation); })[0];
        }));
        if (this.caseField.value && this.caseField.value.OrganisationID) {
            this.searchOrgTextFormControl.disable();
        }
    };
    WriteOrganisationFieldComponent.prototype.preSelectEmptyOrg = function () {
        this.instantiateOrganisationFormGroup(null, null);
        this.selectedOrg$ = rxjs_1.of(WriteOrganisationFieldComponent_1.EMPTY_SIMPLE_ORG);
    };
    WriteOrganisationFieldComponent.prototype.instantiateOrganisationFormGroup = function (orgIDState, orgNameState) {
        this.organisationIDFormControl = new forms_1.FormControl(orgIDState);
        this.addOrganisationValidators(this.caseField, this.organisationIDFormControl);
        this.organisationFormGroup.addControl(WriteOrganisationFieldComponent_1.ORGANISATION_ID, this.organisationIDFormControl);
        this.organisationNameFormControl = new forms_1.FormControl(orgNameState);
        this.organisationFormGroup.addControl(WriteOrganisationFieldComponent_1.ORGANISATION_NAME, this.organisationNameFormControl);
    };
    WriteOrganisationFieldComponent.prototype.addOrganisationValidators = function (caseField, control) {
        if (caseField.field_type && caseField.field_type.complex_fields) {
            var organisationIdField = caseField.field_type.complex_fields
                .find(function (field) { return field.id === WriteOrganisationFieldComponent_1.ORGANISATION_ID; });
            this.addValidators(organisationIdField, control);
        }
    };
    WriteOrganisationFieldComponent.prototype.onSearchOrg = function (orgSearchText) {
        var _this = this;
        if (orgSearchText && orgSearchText.length >= 2) {
            var lowerOrgSearchText_1 = orgSearchText.toLowerCase();
            this.simpleOrganisations$ = this.organisations$.pipe(operators_1.switchMap(function (organisations) { return rxjs_1.of(_this.searchOrg(organisations, lowerOrgSearchText_1)); }));
        }
        else {
            this.simpleOrganisations$ = rxjs_1.of([]);
        }
    };
    WriteOrganisationFieldComponent.prototype.searchOrg = function (organisations, lowerOrgSearchText) {
        var _this = this;
        return organisations.filter(function (organisation) {
            return _this.searchCriteria(organisation, lowerOrgSearchText) || _this.searchWithSpace(organisation, lowerOrgSearchText);
        })
            .map(function (organisation) { return _this.organisationConverter.toSimpleOrganisationModel(organisation); })
            .slice(0, WriteOrganisationFieldComponent_1.MAX_RESULT_COUNT);
    };
    WriteOrganisationFieldComponent.prototype.searchCriteria = function (organisation, lowerOrgSearchText) {
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
    };
    WriteOrganisationFieldComponent.prototype.searchWithSpace = function (organisation, lowerOrgSearchText) {
        var searchTextArray = lowerOrgSearchText.split(/\s+/g);
        for (var _i = 0, searchTextArray_1 = searchTextArray; _i < searchTextArray_1.length; _i++) {
            var singleSearchText = searchTextArray_1[_i];
            if (singleSearchText && this.searchCriteria(organisation, singleSearchText)) {
                return true;
            }
        }
    };
    WriteOrganisationFieldComponent.prototype.trimAll = function (oldText) {
        return oldText.replace(/\s+/g, '');
    };
    WriteOrganisationFieldComponent.prototype.selectOrg = function (selectedOrg) {
        this.organisationIDFormControl.setValue(selectedOrg.organisationIdentifier);
        this.organisationNameFormControl.setValue(selectedOrg.name);
        this.selectedOrg$ = rxjs_1.of(selectedOrg);
        this.simpleOrganisations$ = rxjs_1.of([].concat([selectedOrg]));
        this.searchOrgTextFormControl.setValue('');
        this.searchOrgTextFormControl.disable();
        this.caseField.value = {
            OrganisationID: selectedOrg.organisationIdentifier,
            OrganisationName: selectedOrg.name
        };
        this.organisationFormGroup.setValue(this.caseField.value);
    };
    WriteOrganisationFieldComponent.prototype.deSelectOrg = function () {
        this.organisationIDFormControl.reset();
        this.organisationNameFormControl.reset();
        this.selectedOrg$ = rxjs_1.of(WriteOrganisationFieldComponent_1.EMPTY_SIMPLE_ORG);
        this.simpleOrganisations$ = rxjs_1.of([]);
        this.searchOrgTextFormControl.setValue('');
        this.searchOrgTextFormControl.enable();
        this.caseField.value = { OrganisationID: null, OrganisationName: null };
        this.organisationFormGroup.setValue(this.caseField.value);
    };
    var WriteOrganisationFieldComponent_1;
    WriteOrganisationFieldComponent.EMPTY_SIMPLE_ORG = { organisationIdentifier: '', name: '', address: '' };
    WriteOrganisationFieldComponent.MAX_RESULT_COUNT = 100;
    WriteOrganisationFieldComponent.ORGANISATION_ID = 'OrganisationID';
    WriteOrganisationFieldComponent.ORGANISATION_NAME = 'OrganisationName';
    WriteOrganisationFieldComponent.PRE_POPULATE_TO_USERS_ORGANISATION = 'PrepopulateToUsersOrganisation';
    WriteOrganisationFieldComponent.ORGANISATION_DETAILS = 'organisationDetails';
    WriteOrganisationFieldComponent.YES = 'YES';
    WriteOrganisationFieldComponent.MANDATORY = 'MANDATORY';
    WriteOrganisationFieldComponent = WriteOrganisationFieldComponent_1 = __decorate([
        core_1.Component({
            selector: 'ccd-write-organisation-field',
            template: "\n    <div class=\"form-group\" [formGroup]=\"organisationFormGroup\">\n      <fieldset *ngIf=\"(organisations$ | async)?.length === 0\" class=\"govuk-fieldset\">\n        <div class=\"hmcts-banner\">\n          <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\">\n            <path d=\"M13.7,18.5h-2.4v-2.4h2.4V18.5z M12.5,13.7c-0.7,0-1.2-0.5-1.2-1.2V7.7c0-0.7,0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2v4.8\n      C13.7,13.2,13.2,13.7,12.5,13.7z M12.5,0.5c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S19.1,0.5,12.5,0.5z\" /></svg>\n          <div class=\"hmcts-banner__message\">\n            <span class=\"hmcts-banner__assistive\">information</span>\n              <p class=\"warning-message\">Organisation search is currently unavailable.</p>\n          </div>\n        </div>\n        <div class=\"warning-panel\">\n          <div class=\"warning-message\">\n            We are working to fix the issue. You can try again later.\n          </div>\n        </div>\n      </fieldset>\n      <fieldset *ngIf=\"(organisations$ | async)?.length > 0\" class=\"govuk-fieldset\">\n        <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--l\">\n          <h2 class=\"heading-h2\">\n            Search for an organisation\n          </h2>\n        </legend>\n        <div class=\"govuk-form-group\">\n          <label class=\"govuk-label\" for=\"search-org-text\">\n            <span id=\"search-org-hint\" class=\"govuk-hint\">\n              You can only search for organisations already registered with MyHMCTS. For example, you can search by organisation name or address.\n            </span>\n          </label>\n          <input id=\"search-org-text\" class=\"form-control\" type=\"text\" [formControl]=\"searchOrgTextFormControl\" />\n        </div>\n        <div class=\"govuk-form-group\">\n          <label class=\"govuk-label\" for=\"organisation-table\">\n            <h2 class=\"heading-h2\">Organisation name and address</h2>\n          </label>\n          <hr class=\"govuk-section-break govuk-section-break--visible\">\n          <div *ngIf=\"!(selectedOrg$ | async)?.organisationIdentifier; else selectedOrganisation\" [ngClass]=\"{'scroll-container ': (simpleOrganisations$ | async)?.length > 10}\">\n            <table id=\"organisation-table\" *ngFor=\"let organisation of (simpleOrganisations$ | async)\">\n              <caption><h3 class=\"name-header\">{{organisation.name}}</h3></caption>\n              <tbody>\n              <tr>\n                <td class=\"td-address\">\n                  <ccd-markdown [content]=\"organisation.address\"></ccd-markdown>\n                </td>\n                <td class=\"td-select\">\n                  <a href=\"javascript:void(0);\" (click)=\"selectOrg(organisation)\" title=\"Select the organisation {{organisation.name}}\">Select</a>\n                </td>\n              </tr>\n              </tbody>\n            </table>\n            <div *ngIf=\"(simpleOrganisations$ | async)?.length === 0 && (searchOrgValue$ | async)?.length > 2\">\n              <div class=\"no-result-message\">\n                No results found.\n              </div>\n            </div>\n          </div>\n          <ng-template #selectedOrganisation>\n            <table id=\"organisation-selected-table\" *ngIf=\"(selectedOrg$ | async) as selectedOrg\">\n              <caption><h3 class=\"name-header\">{{selectedOrg.name}}</h3></caption>\n              <tbody>\n              <tr>\n                <td class=\"td-address\">\n                  <ccd-markdown [content]=\"selectedOrg.address\"></ccd-markdown>\n                </td>\n                <td class=\"td-select\">\n                  <a href=\"javascript:void(0);\" (click)=\"deSelectOrg(selectedOrg)\" title=\"Clear organisation selection for {{selectedOrg.name}}\">Clear</a>\n                </td>\n              </tr>\n              </tbody>\n            </table>\n          </ng-template>\n        </div>\n        <ccd-write-organisation-complex-field [caseField]=\"caseField\"\n                                              [formGroup]=\"formGroup\"\n                                              [selectedOrg$]=\"selectedOrg$\">\n        </ccd-write-organisation-complex-field>\n        <details id=\"find-organisation-help\" class=\"govuk-details\" data-module=\"govuk-details\">\n          <summary class=\"govuk-details__summary\">\n          <span id=\"content-why-can-not-find-organisation\" class=\"govuk-details__summary-text\">\n            Can\u2019t find the organisation you are looking for?\n          </span>\n          </summary>\n          <div id=\"content-reason-can-not-find-organisation\" class=\"govuk-details__text\">\n            If you know that the solicitor is already registered with MyHMCTS, check that you have entered their details correctly.\n            Remember that organisations can only register one office address. This means that the details could be slightly different from what you're expecting. Contact the solicitor directly if you have any concerns.\n          </div>\n        </details>\n      </fieldset>\n    </div>\n  ",
            styles: ["\n    .hmcts-banner{border:0 solid;margin-bottom:10px;color:#000000}.hmcts-banner .warning-message{font-weight:bold}.govuk-hint{font-size:1.1rem}.name-header{font-weight:bold;margin-top:10px;font-size:18px}.td-address{width:90%;padding-top:2px}.td-select{width:10%}.warning-panel{background-color:#e7ebef;height:40px;margin-bottom:0;align-items:center;display:flex}.warning-panel .warning-message{padding-left:15px}.complex-field-table>tbody>tr>th{border:none}.complex-field-table>tbody>tr:last-child>th,.complex-field-table>tbody>tr:last-child>td{border-bottom:none}.complex-field-title{width:300px}.label-width-small{width:100px}.label-width-medium{width:150px}.scroll-container{height:600px;overflow-y:scroll}.no-result-message{margin-top:15px}\n  "]
        }),
        __metadata("design:paramtypes", [organisation_2.OrganisationService,
            organisation_1.OrganisationConverter,
            services_1.WindowService])
    ], WriteOrganisationFieldComponent);
    return WriteOrganisationFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteOrganisationFieldComponent = WriteOrganisationFieldComponent;
//# sourceMappingURL=write-organisation-field.component.js.map