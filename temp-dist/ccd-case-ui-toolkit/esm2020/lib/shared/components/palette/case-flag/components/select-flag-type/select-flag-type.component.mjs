import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { catchError, switchMap } from 'rxjs/operators';
import { CaseFlagRefdataService } from '../../../../../services';
import { RefdataCaseFlagType } from '../../../../../services/case-flag/refdata-case-flag-type.enum';
import { CaseFlagFieldState, CaseFlagWizardStepTitle, SelectFlagTypeErrorMessage } from '../../enums';
import * as i0 from "@angular/core";
import * as i1 from "../../../../../services";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
function SelectFlagTypeComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "span", 11);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.flagTypeNotSelectedErrorMessage, " ");
} }
function SelectFlagTypeComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 12)(1, "input", 13);
    i0.ɵɵlistener("change", function SelectFlagTypeComponent_div_8_Template_input_change_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r7); const flagType_r4 = restoredCtx.$implicit; const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.onFlagTypeChanged(flagType_r4)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 14);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const flagType_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("id", "flag-type-", i_r5, "");
    i0.ɵɵproperty("name", ctx_r1.flagTypeControlName)("value", flagType_r4.flagCode === "CATGRY" ? flagType_r4.flagCode + i_r5 : flagType_r4.flagCode)("formControlName", ctx_r1.flagTypeControlName);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("for", "flag-type-", i_r5, "");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(flagType_r4.name);
} }
function SelectFlagTypeComponent_div_9_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "span", 11);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r8.flagTypeErrorMessage, " ");
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
const _c1 = function (a0) { return { "govuk-input--error": a0 }; };
function SelectFlagTypeComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 1)(2, "label", 16);
    i0.ɵɵtext(3, "Enter a flag type");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, SelectFlagTypeComponent_div_9_div_4_Template, 4, 1, "div", 17);
    i0.ɵɵelement(5, "input", 18);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(5, _c0, ctx_r2.flagTypeErrorMessage.length > 0));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.flagTypeErrorMessage.length > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c1, ctx_r2.flagTypeErrorMessage.length > 0))("name", ctx_r2.descriptionControlName)("formControlName", ctx_r2.descriptionControlName);
} }
function SelectFlagTypeComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20)(1, "button", 21);
    i0.ɵɵlistener("click", function SelectFlagTypeComponent_div_10_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.onNext()); });
    i0.ɵɵtext(2, "Next");
    i0.ɵɵelementEnd()();
} }
export class SelectFlagTypeComponent {
    constructor(caseFlagRefdataService) {
        this.caseFlagRefdataService = caseFlagRefdataService;
        this.caseFlagStateEmitter = new EventEmitter();
        this.flagCommentsOptionalEmitter = new EventEmitter();
        this.flagTypeNotSelectedErrorMessage = '';
        this.flagTypeErrorMessage = '';
        this.otherFlagTypeSelected = false;
        this.refdataError = false;
        this.flagTypeControlName = 'flagType';
        this.descriptionControlName = 'otherFlagTypeDescription';
        this.maxCharactersForOtherFlagType = 80;
        // Code for "Other" flag type as defined in Reference Data
        this.otherFlagTypeCode = 'OT0001';
        this.caseLevelCaseFlagsFieldId = 'caseFlags';
    }
    get caseFlagWizardStepTitle() {
        return CaseFlagWizardStepTitle;
    }
    ngOnInit() {
        this.flagTypes = [];
        this.formGroup.addControl(this.flagTypeControlName, new FormControl(''));
        this.formGroup.addControl(this.descriptionControlName, new FormControl(''));
        const flagType = this.formGroup['caseField']
            && this.formGroup['caseField'].id
            && this.formGroup['caseField'].id === this.caseLevelCaseFlagsFieldId
            ? RefdataCaseFlagType.CASE
            : RefdataCaseFlagType.PARTY;
        // If hmctsServiceId is present, use this to retrieve the relevant list of flag types
        if (this.hmctsServiceId) {
            this.flagRefdata$ = this.caseFlagRefdataService.getCaseFlagsRefdata(this.hmctsServiceId, flagType)
                .subscribe({
                // First (and only) object in the returned array should be the top-level "Party" flag type
                next: flagTypes => this.flagTypes = flagTypes[0].childFlags,
                error: error => this.onRefdataError(error)
            });
        }
        else {
            // Else, HMCTS service code is required to retrieve the relevant list of flag types; attempt to obtain it by case type ID first
            this.flagRefdata$ = this.caseFlagRefdataService.getHmctsServiceDetailsByCaseType(this.caseTypeId)
                .pipe(
            // If an error occurs retrieving HMCTS service details by case type ID, try by service name instead
            catchError(_ => this.caseFlagRefdataService.getHmctsServiceDetailsByServiceName(this.jurisdiction)), 
            // Use switchMap to return an inner Observable of the flag types data, having received the service details
            // including service_code. This avoids having nested `subscribe`s, which is an anti-pattern!
            switchMap(serviceDetails => this.caseFlagRefdataService.getCaseFlagsRefdata(serviceDetails[0].service_code, flagType)))
                .subscribe({
                // First (and only) object in the returned array should be the top-level "Party" flag type
                next: flagTypes => this.flagTypes = flagTypes[0].childFlags,
                error: error => this.onRefdataError(error)
            });
        }
    }
    ngOnDestroy() {
        if (this.flagRefdata$) {
            this.flagRefdata$.unsubscribe();
        }
    }
    onFlagTypeChanged(flagType) {
        this.selectedFlagType = flagType;
        // Display description textbox if 'Other' flag type is selected
        this.otherFlagTypeSelected = this.selectedFlagType.flagCode === this.otherFlagTypeCode;
    }
    onNext() {
        // Validate form
        this.validateForm();
        // Return case flag field state, whether the selected flag type (if any) is a parent or not, error messages,
        // flag name, path, hearing relevant indicator, code, and "list of values" (if any) to the parent
        this.caseFlagStateEmitter.emit({
            currentCaseFlagFieldState: CaseFlagFieldState.FLAG_TYPE,
            isParentFlagType: this.selectedFlagType ? this.selectedFlagType.isParent : null,
            errorMessages: this.errorMessages,
            flagName: this.selectedFlagType ? this.selectedFlagType.name : null,
            flagPath: this.selectedFlagType ? this.selectedFlagType.Path.map(pathValue => Object.assign({ id: null, value: pathValue })) : null,
            hearingRelevantFlag: this.selectedFlagType ? this.selectedFlagType.hearingRelevant : null,
            flagCode: this.selectedFlagType ? this.selectedFlagType.flagCode : null,
            // Include the "list of values" (if any); currently applicable to language flag types
            listOfValues: this.selectedFlagType && this.selectedFlagType.listOfValues && this.selectedFlagType.listOfValues.length > 0
                ? this.selectedFlagType.listOfValues
                : null
        });
        // Emit "flag comments optional" event if the user selects a flag type where comments are not mandatory
        if (this.selectedFlagType && !this.selectedFlagType.flagComment) {
            this.flagCommentsOptionalEmitter.emit(null);
        }
        // If the selected flag type is a parent, load the list of child flag types and reset the current selection
        if (this.selectedFlagType && this.selectedFlagType.isParent) {
            this.flagTypes = this.selectedFlagType.childFlags;
            this.formGroup.get(this.flagTypeControlName).setValue('');
            this.selectedFlagType = null;
        }
    }
    validateForm() {
        this.flagTypeNotSelectedErrorMessage = '';
        this.flagTypeErrorMessage = '';
        this.errorMessages = [];
        if (!this.selectedFlagType) {
            this.flagTypeNotSelectedErrorMessage = SelectFlagTypeErrorMessage.FLAG_TYPE_NOT_SELECTED;
            this.errorMessages.push({ title: '', description: `${SelectFlagTypeErrorMessage.FLAG_TYPE_NOT_SELECTED}`, fieldId: 'conditional-radios-list' });
        }
        if (this.otherFlagTypeSelected) {
            const otherFlagTypeDescription = this.formGroup.get(this.descriptionControlName).value;
            if (!otherFlagTypeDescription) {
                this.flagTypeErrorMessage = SelectFlagTypeErrorMessage.FLAG_TYPE_NOT_ENTERED;
                this.errorMessages.push({ title: '', description: `${SelectFlagTypeErrorMessage.FLAG_TYPE_NOT_ENTERED}`, fieldId: 'other-flag-type-description' });
            }
            if (otherFlagTypeDescription.length > this.maxCharactersForOtherFlagType) {
                this.flagTypeErrorMessage = SelectFlagTypeErrorMessage.FLAG_TYPE_LIMIT_EXCEEDED;
                this.errorMessages.push({ title: '', description: `${SelectFlagTypeErrorMessage.FLAG_TYPE_LIMIT_EXCEEDED}`, fieldId: 'other-flag-type-description' });
            }
        }
    }
    onRefdataError(error) {
        // Set error flag on component to remove the "Next" button (user cannot proceed with flag creation)
        this.refdataError = true;
        this.errorMessages = [];
        this.errorMessages.push({ title: '', description: error.message, fieldId: 'conditional-radios-list' });
        // Return case flag field state and error messages to the parent
        this.caseFlagStateEmitter.emit({ currentCaseFlagFieldState: CaseFlagFieldState.FLAG_TYPE, errorMessages: this.errorMessages });
    }
}
SelectFlagTypeComponent.ɵfac = function SelectFlagTypeComponent_Factory(t) { return new (t || SelectFlagTypeComponent)(i0.ɵɵdirectiveInject(i1.CaseFlagRefdataService)); };
SelectFlagTypeComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SelectFlagTypeComponent, selectors: [["ccd-select-flag-type"]], inputs: { formGroup: "formGroup", jurisdiction: "jurisdiction", caseTypeId: "caseTypeId", hmctsServiceId: "hmctsServiceId" }, outputs: { caseFlagStateEmitter: "caseFlagStateEmitter", flagCommentsOptionalEmitter: "flagCommentsOptionalEmitter" }, decls: 11, vars: 9, consts: [[1, "form-group", 3, "formGroup"], [1, "govuk-form-group", 3, "ngClass"], ["aria-describedby", "flag-type-heading", 1, "govuk-fieldset"], [1, "govuk-fieldset__legend", "govuk-fieldset__legend--l"], ["id", "flag-type-heading", 1, "govuk-fieldset__heading"], ["id", "flag-type-not-selected-error-message", "class", "govuk-error-message", 4, "ngIf"], ["data-module", "govuk-radios", "id", "conditional-radios-list", 1, "govuk-radios", "govuk-radios--conditional"], ["class", "govuk-radios__item", 4, "ngFor", "ngForOf"], ["class", "govuk-radios__conditional", "id", "conditional-flagType", 4, "ngIf"], ["class", "govuk-button-group", 4, "ngIf"], ["id", "flag-type-not-selected-error-message", 1, "govuk-error-message"], [1, "govuk-visually-hidden"], [1, "govuk-radios__item"], ["type", "radio", 1, "govuk-radios__input", 3, "id", "name", "value", "formControlName", "change"], [1, "govuk-label", "govuk-radios__label", 3, "for"], ["id", "conditional-flagType", 1, "govuk-radios__conditional"], ["for", "other-flag-type-description", 1, "govuk-label"], ["id", "flag-type-error-message", "class", "govuk-error-message", 4, "ngIf"], ["id", "other-flag-type-description", "type", "text", 1, "govuk-input", "govuk-!-width-one-half", 3, "ngClass", "name", "formControlName"], ["id", "flag-type-error-message", 1, "govuk-error-message"], [1, "govuk-button-group"], ["type", "button", 1, "button", "button-primary", 3, "click"]], template: function SelectFlagTypeComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "fieldset", 2)(3, "legend", 3)(4, "h1", 4);
        i0.ɵɵtext(5);
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(6, SelectFlagTypeComponent_div_6_Template, 4, 1, "div", 5);
        i0.ɵɵelementStart(7, "div", 6);
        i0.ɵɵtemplate(8, SelectFlagTypeComponent_div_8_Template, 4, 6, "div", 7);
        i0.ɵɵtemplate(9, SelectFlagTypeComponent_div_9_Template, 6, 9, "div", 8);
        i0.ɵɵelementEnd()()();
        i0.ɵɵtemplate(10, SelectFlagTypeComponent_div_10_Template, 3, 0, "div", 9);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.formGroup);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c0, ctx.flagTypeNotSelectedErrorMessage.length > 0));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", ctx.caseFlagWizardStepTitle.SELECT_CASE_FLAG, " ");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.flagTypeNotSelectedErrorMessage.length > 0);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.flagTypes);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.otherFlagTypeSelected);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.refdataError);
    } }, dependencies: [i2.NgClass, i2.NgForOf, i2.NgIf, i3.DefaultValueAccessor, i3.RadioControlValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.FormGroupDirective, i3.FormControlName], styles: [".hidden[_ngcontent-%COMP%]{display:none}.validation-error[_ngcontent-%COMP%]{cursor:pointer;text-decoration:underline;color:#d4351c}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SelectFlagTypeComponent, [{
        type: Component,
        args: [{ selector: 'ccd-select-flag-type', template: "<div class=\"form-group\" [formGroup]=\"formGroup\">\n  <div class=\"govuk-form-group\" [ngClass]=\"{'form-group-error': flagTypeNotSelectedErrorMessage.length > 0}\">\n    <fieldset class=\"govuk-fieldset\" aria-describedby=\"flag-type-heading\">\n      <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--l\">\n        <h1 id=\"flag-type-heading\" class=\"govuk-fieldset__heading\">\n          {{caseFlagWizardStepTitle.SELECT_CASE_FLAG}}\n        </h1>\n      </legend>\n      <div id=\"flag-type-not-selected-error-message\" class=\"govuk-error-message\"\n        *ngIf=\"flagTypeNotSelectedErrorMessage.length > 0\">\n        <span class=\"govuk-visually-hidden\">Error:</span> {{flagTypeNotSelectedErrorMessage}}\n      </div>\n      <div class=\"govuk-radios govuk-radios--conditional\" data-module=\"govuk-radios\" id=\"conditional-radios-list\">\n        <div class=\"govuk-radios__item\" *ngFor=\"let flagType of flagTypes; index as i\">\n          <!-- All parent flag types have the same flagCode of \"CATGRY\", so each radio button value needs to be made\n            unique by appending the index - radio buttons shouldn't share the same value.\n            It is OK to amend flagCode this way because parent flag types cannot be selected as a final value -->\n          <input class=\"govuk-radios__input\" id=\"flag-type-{{i}}\" [name]=\"flagTypeControlName\"\n            type=\"radio\" [value]=\"flagType.flagCode === 'CATGRY' ? flagType.flagCode + i : flagType.flagCode\"\n            [formControlName]=\"flagTypeControlName\" (change)=\"onFlagTypeChanged(flagType)\"/>\n          <label class=\"govuk-label govuk-radios__label\" for=\"flag-type-{{i}}\">{{flagType.name}}</label>\n        </div>\n        <div class=\"govuk-radios__conditional\" *ngIf=\"otherFlagTypeSelected\" id=\"conditional-flagType\">\n          <div class=\"govuk-form-group\" [ngClass]=\"{'form-group-error': flagTypeErrorMessage.length > 0}\">\n            <label class=\"govuk-label\" for=\"other-flag-type-description\">Enter a flag type</label>\n            <div id=\"flag-type-error-message\" class=\"govuk-error-message\" *ngIf=\"flagTypeErrorMessage.length > 0\">\n              <span class=\"govuk-visually-hidden\">Error:</span> {{flagTypeErrorMessage}}\n            </div>\n            <input class=\"govuk-input govuk-!-width-one-half\"\n              [ngClass]=\"{'govuk-input--error': flagTypeErrorMessage.length > 0}\"\n              id=\"other-flag-type-description\" [name]=\"descriptionControlName\" type=\"text\"\n              [formControlName]=\"descriptionControlName\"/>\n          </div>\n        </div>\n      </div>\n    </fieldset>\n  </div>\n  <div class=\"govuk-button-group\" *ngIf=\"!refdataError\">\n    <button class=\"button button-primary\" type=\"button\" (click)=\"onNext()\">Next</button>\n  </div>\n</div>\n", styles: [".hidden{display:none}.validation-error{cursor:pointer;text-decoration:underline;color:#d4351c}\n"] }]
    }], function () { return [{ type: i1.CaseFlagRefdataService }]; }, { formGroup: [{
            type: Input
        }], jurisdiction: [{
            type: Input
        }], caseTypeId: [{
            type: Input
        }], hmctsServiceId: [{
            type: Input
        }], caseFlagStateEmitter: [{
            type: Output
        }], flagCommentsOptionalEmitter: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWZsYWctdHlwZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9jYXNlLWZsYWcvY29tcG9uZW50cy9zZWxlY3QtZmxhZy10eXBlL3NlbGVjdC1mbGFnLXR5cGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL2NvbXBvbmVudHMvc2VsZWN0LWZsYWctdHlwZS9zZWxlY3QtZmxhZy10eXBlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3ZELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBRXBHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSx1QkFBdUIsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7O0lDRGhHLCtCQUNxRCxlQUFBO0lBQ2Ysc0JBQU07SUFBQSxpQkFBTztJQUFDLFlBQ3BEO0lBQUEsaUJBQU07OztJQUQ4QyxlQUNwRDtJQURvRCx1RUFDcEQ7Ozs7SUFFRSwrQkFBK0UsZ0JBQUE7SUFNbkMsb09BQVUsZUFBQSxx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OzhGQXRKVSx1QkFBdUI7MEVBQXZCLHVCQUF1QjtRQ2hCcEMsOEJBQWdELGFBQUEsa0JBQUEsZ0JBQUEsWUFBQTtRQUt0QyxZQUNGO1FBQUEsaUJBQUssRUFBQTtRQUVQLHdFQUdNO1FBQ04sOEJBQTRHO1FBQzFHLHdFQVFNO1FBQ04sd0VBV007UUFDUixpQkFBTSxFQUFBLEVBQUE7UUFHViwwRUFFTTtRQUNSLGlCQUFNOztRQXhDa0IseUNBQXVCO1FBQ2YsZUFBNEU7UUFBNUUsb0dBQTRFO1FBSWxHLGVBQ0Y7UUFERSw2RUFDRjtRQUdDLGVBQWdEO1FBQWhELHFFQUFnRDtRQUlJLGVBQWM7UUFBZCx1Q0FBYztRQVMzQixlQUEyQjtRQUEzQixnREFBMkI7UUFleEMsZUFBbUI7UUFBbkIsd0NBQW1COzt1RkRyQnpDLHVCQUF1QjtjQUxuQyxTQUFTOzJCQUNFLHNCQUFzQjt5RUFPekIsU0FBUztrQkFEZixLQUFLO1lBSUMsWUFBWTtrQkFEbEIsS0FBSztZQUlDLFVBQVU7a0JBRGhCLEtBQUs7WUFJQyxjQUFjO2tCQURwQixLQUFLO1lBSUMsb0JBQW9CO2tCQUQxQixNQUFNO1lBSUEsMkJBQTJCO2tCQURqQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZG9tYWluJztcbmltcG9ydCB7IEZsYWdUeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZG9tYWluL2Nhc2UtZmxhZyc7XG5pbXBvcnQgeyBDYXNlRmxhZ1JlZmRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHsgUmVmZGF0YUNhc2VGbGFnVHlwZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NlcnZpY2VzL2Nhc2UtZmxhZy9yZWZkYXRhLWNhc2UtZmxhZy10eXBlLmVudW0nO1xuaW1wb3J0IHsgQ2FzZUZsYWdTdGF0ZSB9IGZyb20gJy4uLy4uL2RvbWFpbic7XG5pbXBvcnQgeyBDYXNlRmxhZ0ZpZWxkU3RhdGUsIENhc2VGbGFnV2l6YXJkU3RlcFRpdGxlLCBTZWxlY3RGbGFnVHlwZUVycm9yTWVzc2FnZSB9IGZyb20gJy4uLy4uL2VudW1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXNlbGVjdC1mbGFnLXR5cGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LWZsYWctdHlwZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlbGVjdC1mbGFnLXR5cGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RGbGFnVHlwZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBqdXJpc2RpY3Rpb246IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgY2FzZVR5cGVJZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBobWN0c1NlcnZpY2VJZDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgY2FzZUZsYWdTdGF0ZUVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxDYXNlRmxhZ1N0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FzZUZsYWdTdGF0ZT4oKTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIGZsYWdDb21tZW50c09wdGlvbmFsRW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGZsYWdUeXBlczogRmxhZ1R5cGVbXTtcbiAgcHVibGljIHNlbGVjdGVkRmxhZ1R5cGU6IEZsYWdUeXBlO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlczogRXJyb3JNZXNzYWdlW107XG4gIHB1YmxpYyBmbGFnVHlwZU5vdFNlbGVjdGVkRXJyb3JNZXNzYWdlID0gJyc7XG4gIHB1YmxpYyBmbGFnVHlwZUVycm9yTWVzc2FnZSA9ICcnO1xuICBwdWJsaWMgZmxhZ1JlZmRhdGEkOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBvdGhlckZsYWdUeXBlU2VsZWN0ZWQgPSBmYWxzZTtcbiAgcHVibGljIHJlZmRhdGFFcnJvciA9IGZhbHNlO1xuXG4gIHB1YmxpYyByZWFkb25seSBmbGFnVHlwZUNvbnRyb2xOYW1lID0gJ2ZsYWdUeXBlJztcbiAgcHVibGljIHJlYWRvbmx5IGRlc2NyaXB0aW9uQ29udHJvbE5hbWUgPSAnb3RoZXJGbGFnVHlwZURlc2NyaXB0aW9uJztcbiAgcHJpdmF0ZSByZWFkb25seSBtYXhDaGFyYWN0ZXJzRm9yT3RoZXJGbGFnVHlwZSA9IDgwO1xuICAvLyBDb2RlIGZvciBcIk90aGVyXCIgZmxhZyB0eXBlIGFzIGRlZmluZWQgaW4gUmVmZXJlbmNlIERhdGFcbiAgcHJpdmF0ZSByZWFkb25seSBvdGhlckZsYWdUeXBlQ29kZSA9ICdPVDAwMDEnO1xuICBwdWJsaWMgcmVhZG9ubHkgY2FzZUxldmVsQ2FzZUZsYWdzRmllbGRJZCA9ICdjYXNlRmxhZ3MnO1xuXG4gIHB1YmxpYyBnZXQgY2FzZUZsYWdXaXphcmRTdGVwVGl0bGUoKTogdHlwZW9mIENhc2VGbGFnV2l6YXJkU3RlcFRpdGxlIHtcbiAgICByZXR1cm4gQ2FzZUZsYWdXaXphcmRTdGVwVGl0bGU7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGNhc2VGbGFnUmVmZGF0YVNlcnZpY2U6IENhc2VGbGFnUmVmZGF0YVNlcnZpY2UpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmZsYWdUeXBlcyA9IFtdO1xuICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2wodGhpcy5mbGFnVHlwZUNvbnRyb2xOYW1lLCBuZXcgRm9ybUNvbnRyb2woJycpKTtcbiAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKHRoaXMuZGVzY3JpcHRpb25Db250cm9sTmFtZSwgbmV3IEZvcm1Db250cm9sKCcnKSk7XG5cbiAgICBjb25zdCBmbGFnVHlwZSA9IHRoaXMuZm9ybUdyb3VwWydjYXNlRmllbGQnXVxuICAgICAgJiYgdGhpcy5mb3JtR3JvdXBbJ2Nhc2VGaWVsZCddLmlkXG4gICAgICAmJiB0aGlzLmZvcm1Hcm91cFsnY2FzZUZpZWxkJ10uaWQgPT09IHRoaXMuY2FzZUxldmVsQ2FzZUZsYWdzRmllbGRJZFxuICAgICAgPyBSZWZkYXRhQ2FzZUZsYWdUeXBlLkNBU0VcbiAgICAgIDogUmVmZGF0YUNhc2VGbGFnVHlwZS5QQVJUWTtcblxuICAgIC8vIElmIGhtY3RzU2VydmljZUlkIGlzIHByZXNlbnQsIHVzZSB0aGlzIHRvIHJldHJpZXZlIHRoZSByZWxldmFudCBsaXN0IG9mIGZsYWcgdHlwZXNcbiAgICBpZiAodGhpcy5obWN0c1NlcnZpY2VJZCkge1xuICAgICAgdGhpcy5mbGFnUmVmZGF0YSQgPSB0aGlzLmNhc2VGbGFnUmVmZGF0YVNlcnZpY2UuZ2V0Q2FzZUZsYWdzUmVmZGF0YSh0aGlzLmhtY3RzU2VydmljZUlkLCBmbGFnVHlwZSlcbiAgICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgICAgLy8gRmlyc3QgKGFuZCBvbmx5KSBvYmplY3QgaW4gdGhlIHJldHVybmVkIGFycmF5IHNob3VsZCBiZSB0aGUgdG9wLWxldmVsIFwiUGFydHlcIiBmbGFnIHR5cGVcbiAgICAgICAgICBuZXh0OiBmbGFnVHlwZXMgPT4gdGhpcy5mbGFnVHlwZXMgPSBmbGFnVHlwZXNbMF0uY2hpbGRGbGFncyxcbiAgICAgICAgICBlcnJvcjogZXJyb3IgPT4gdGhpcy5vblJlZmRhdGFFcnJvcihlcnJvcilcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVsc2UsIEhNQ1RTIHNlcnZpY2UgY29kZSBpcyByZXF1aXJlZCB0byByZXRyaWV2ZSB0aGUgcmVsZXZhbnQgbGlzdCBvZiBmbGFnIHR5cGVzOyBhdHRlbXB0IHRvIG9idGFpbiBpdCBieSBjYXNlIHR5cGUgSUQgZmlyc3RcbiAgICAgIHRoaXMuZmxhZ1JlZmRhdGEkID0gdGhpcy5jYXNlRmxhZ1JlZmRhdGFTZXJ2aWNlLmdldEhtY3RzU2VydmljZURldGFpbHNCeUNhc2VUeXBlKHRoaXMuY2FzZVR5cGVJZClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgLy8gSWYgYW4gZXJyb3Igb2NjdXJzIHJldHJpZXZpbmcgSE1DVFMgc2VydmljZSBkZXRhaWxzIGJ5IGNhc2UgdHlwZSBJRCwgdHJ5IGJ5IHNlcnZpY2UgbmFtZSBpbnN0ZWFkXG4gICAgICAgICAgY2F0Y2hFcnJvcihfID0+IHRoaXMuY2FzZUZsYWdSZWZkYXRhU2VydmljZS5nZXRIbWN0c1NlcnZpY2VEZXRhaWxzQnlTZXJ2aWNlTmFtZSh0aGlzLmp1cmlzZGljdGlvbikpLFxuICAgICAgICAgIC8vIFVzZSBzd2l0Y2hNYXAgdG8gcmV0dXJuIGFuIGlubmVyIE9ic2VydmFibGUgb2YgdGhlIGZsYWcgdHlwZXMgZGF0YSwgaGF2aW5nIHJlY2VpdmVkIHRoZSBzZXJ2aWNlIGRldGFpbHNcbiAgICAgICAgICAvLyBpbmNsdWRpbmcgc2VydmljZV9jb2RlLiBUaGlzIGF2b2lkcyBoYXZpbmcgbmVzdGVkIGBzdWJzY3JpYmVgcywgd2hpY2ggaXMgYW4gYW50aS1wYXR0ZXJuIVxuICAgICAgICAgIHN3aXRjaE1hcChzZXJ2aWNlRGV0YWlscyA9PiB0aGlzLmNhc2VGbGFnUmVmZGF0YVNlcnZpY2UuZ2V0Q2FzZUZsYWdzUmVmZGF0YShzZXJ2aWNlRGV0YWlsc1swXS5zZXJ2aWNlX2NvZGUsIGZsYWdUeXBlKSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgICAvLyBGaXJzdCAoYW5kIG9ubHkpIG9iamVjdCBpbiB0aGUgcmV0dXJuZWQgYXJyYXkgc2hvdWxkIGJlIHRoZSB0b3AtbGV2ZWwgXCJQYXJ0eVwiIGZsYWcgdHlwZVxuICAgICAgICAgIG5leHQ6IGZsYWdUeXBlcyA9PiB0aGlzLmZsYWdUeXBlcyA9IGZsYWdUeXBlc1swXS5jaGlsZEZsYWdzLFxuICAgICAgICAgIGVycm9yOiBlcnJvciA9PiB0aGlzLm9uUmVmZGF0YUVycm9yKGVycm9yKVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZmxhZ1JlZmRhdGEkKSB7XG4gICAgICB0aGlzLmZsYWdSZWZkYXRhJC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkZsYWdUeXBlQ2hhbmdlZChmbGFnVHlwZTogRmxhZ1R5cGUpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkRmxhZ1R5cGUgPSBmbGFnVHlwZTtcbiAgICAvLyBEaXNwbGF5IGRlc2NyaXB0aW9uIHRleHRib3ggaWYgJ090aGVyJyBmbGFnIHR5cGUgaXMgc2VsZWN0ZWRcbiAgICB0aGlzLm90aGVyRmxhZ1R5cGVTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRGbGFnVHlwZS5mbGFnQ29kZSA9PT0gdGhpcy5vdGhlckZsYWdUeXBlQ29kZTtcbiAgfVxuXG4gIHB1YmxpYyBvbk5leHQoKTogdm9pZCB7XG4gICAgLy8gVmFsaWRhdGUgZm9ybVxuICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XG4gICAgLy8gUmV0dXJuIGNhc2UgZmxhZyBmaWVsZCBzdGF0ZSwgd2hldGhlciB0aGUgc2VsZWN0ZWQgZmxhZyB0eXBlIChpZiBhbnkpIGlzIGEgcGFyZW50IG9yIG5vdCwgZXJyb3IgbWVzc2FnZXMsXG4gICAgLy8gZmxhZyBuYW1lLCBwYXRoLCBoZWFyaW5nIHJlbGV2YW50IGluZGljYXRvciwgY29kZSwgYW5kIFwibGlzdCBvZiB2YWx1ZXNcIiAoaWYgYW55KSB0byB0aGUgcGFyZW50XG4gICAgdGhpcy5jYXNlRmxhZ1N0YXRlRW1pdHRlci5lbWl0KHtcbiAgICAgIGN1cnJlbnRDYXNlRmxhZ0ZpZWxkU3RhdGU6IENhc2VGbGFnRmllbGRTdGF0ZS5GTEFHX1RZUEUsXG4gICAgICBpc1BhcmVudEZsYWdUeXBlOiB0aGlzLnNlbGVjdGVkRmxhZ1R5cGUgPyB0aGlzLnNlbGVjdGVkRmxhZ1R5cGUuaXNQYXJlbnQgOiBudWxsLFxuICAgICAgZXJyb3JNZXNzYWdlczogdGhpcy5lcnJvck1lc3NhZ2VzLFxuICAgICAgZmxhZ05hbWU6IHRoaXMuc2VsZWN0ZWRGbGFnVHlwZSA/IHRoaXMuc2VsZWN0ZWRGbGFnVHlwZS5uYW1lIDogbnVsbCxcbiAgICAgIGZsYWdQYXRoOiB0aGlzLnNlbGVjdGVkRmxhZ1R5cGUgPyB0aGlzLnNlbGVjdGVkRmxhZ1R5cGUuUGF0aC5tYXAocGF0aFZhbHVlID0+IE9iamVjdC5hc3NpZ24oeyBpZDogbnVsbCwgdmFsdWU6IHBhdGhWYWx1ZSB9KSkgOiBudWxsLFxuICAgICAgaGVhcmluZ1JlbGV2YW50RmxhZzogdGhpcy5zZWxlY3RlZEZsYWdUeXBlID8gdGhpcy5zZWxlY3RlZEZsYWdUeXBlLmhlYXJpbmdSZWxldmFudCA6IG51bGwsXG4gICAgICBmbGFnQ29kZTogdGhpcy5zZWxlY3RlZEZsYWdUeXBlID8gdGhpcy5zZWxlY3RlZEZsYWdUeXBlLmZsYWdDb2RlIDogbnVsbCxcbiAgICAgIC8vIEluY2x1ZGUgdGhlIFwibGlzdCBvZiB2YWx1ZXNcIiAoaWYgYW55KTsgY3VycmVudGx5IGFwcGxpY2FibGUgdG8gbGFuZ3VhZ2UgZmxhZyB0eXBlc1xuICAgICAgbGlzdE9mVmFsdWVzOiB0aGlzLnNlbGVjdGVkRmxhZ1R5cGUgJiYgdGhpcy5zZWxlY3RlZEZsYWdUeXBlLmxpc3RPZlZhbHVlcyAmJiB0aGlzLnNlbGVjdGVkRmxhZ1R5cGUubGlzdE9mVmFsdWVzLmxlbmd0aCA+IDBcbiAgICAgICAgPyB0aGlzLnNlbGVjdGVkRmxhZ1R5cGUubGlzdE9mVmFsdWVzXG4gICAgICAgIDogbnVsbFxuICAgIH0pO1xuICAgIC8vIEVtaXQgXCJmbGFnIGNvbW1lbnRzIG9wdGlvbmFsXCIgZXZlbnQgaWYgdGhlIHVzZXIgc2VsZWN0cyBhIGZsYWcgdHlwZSB3aGVyZSBjb21tZW50cyBhcmUgbm90IG1hbmRhdG9yeVxuICAgIGlmICh0aGlzLnNlbGVjdGVkRmxhZ1R5cGUgJiYgIXRoaXMuc2VsZWN0ZWRGbGFnVHlwZS5mbGFnQ29tbWVudCkge1xuICAgICAgdGhpcy5mbGFnQ29tbWVudHNPcHRpb25hbEVtaXR0ZXIuZW1pdChudWxsKTtcbiAgICB9XG4gICAgLy8gSWYgdGhlIHNlbGVjdGVkIGZsYWcgdHlwZSBpcyBhIHBhcmVudCwgbG9hZCB0aGUgbGlzdCBvZiBjaGlsZCBmbGFnIHR5cGVzIGFuZCByZXNldCB0aGUgY3VycmVudCBzZWxlY3Rpb25cbiAgICBpZiAodGhpcy5zZWxlY3RlZEZsYWdUeXBlICYmIHRoaXMuc2VsZWN0ZWRGbGFnVHlwZS5pc1BhcmVudCkge1xuICAgICAgdGhpcy5mbGFnVHlwZXMgPSB0aGlzLnNlbGVjdGVkRmxhZ1R5cGUuY2hpbGRGbGFncztcbiAgICAgIHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLmZsYWdUeXBlQ29udHJvbE5hbWUpLnNldFZhbHVlKCcnKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRGbGFnVHlwZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZUZvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5mbGFnVHlwZU5vdFNlbGVjdGVkRXJyb3JNZXNzYWdlID0gJyc7XG4gICAgdGhpcy5mbGFnVHlwZUVycm9yTWVzc2FnZSA9ICcnO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IFtdO1xuXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkRmxhZ1R5cGUpIHtcbiAgICAgIHRoaXMuZmxhZ1R5cGVOb3RTZWxlY3RlZEVycm9yTWVzc2FnZSA9IFNlbGVjdEZsYWdUeXBlRXJyb3JNZXNzYWdlLkZMQUdfVFlQRV9OT1RfU0VMRUNURUQ7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZXMucHVzaCh7IHRpdGxlOiAnJywgZGVzY3JpcHRpb246IGAke1NlbGVjdEZsYWdUeXBlRXJyb3JNZXNzYWdlLkZMQUdfVFlQRV9OT1RfU0VMRUNURUR9YCwgZmllbGRJZDogJ2NvbmRpdGlvbmFsLXJhZGlvcy1saXN0JyB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3RoZXJGbGFnVHlwZVNlbGVjdGVkKSB7XG4gICAgICBjb25zdCBvdGhlckZsYWdUeXBlRGVzY3JpcHRpb24gPSB0aGlzLmZvcm1Hcm91cC5nZXQodGhpcy5kZXNjcmlwdGlvbkNvbnRyb2xOYW1lKS52YWx1ZTtcbiAgICAgIGlmICghb3RoZXJGbGFnVHlwZURlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuZmxhZ1R5cGVFcnJvck1lc3NhZ2UgPSBTZWxlY3RGbGFnVHlwZUVycm9yTWVzc2FnZS5GTEFHX1RZUEVfTk9UX0VOVEVSRUQ7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcy5wdXNoKHsgdGl0bGU6ICcnLCBkZXNjcmlwdGlvbjogYCR7U2VsZWN0RmxhZ1R5cGVFcnJvck1lc3NhZ2UuRkxBR19UWVBFX05PVF9FTlRFUkVEfWAsIGZpZWxkSWQ6ICdvdGhlci1mbGFnLXR5cGUtZGVzY3JpcHRpb24nIH0pO1xuICAgICAgfVxuICAgICAgaWYgKG90aGVyRmxhZ1R5cGVEZXNjcmlwdGlvbi5sZW5ndGggPiB0aGlzLm1heENoYXJhY3RlcnNGb3JPdGhlckZsYWdUeXBlKSB7XG4gICAgICAgIHRoaXMuZmxhZ1R5cGVFcnJvck1lc3NhZ2UgPSBTZWxlY3RGbGFnVHlwZUVycm9yTWVzc2FnZS5GTEFHX1RZUEVfTElNSVRfRVhDRUVERUQ7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcy5wdXNoKHsgdGl0bGU6ICcnLCBkZXNjcmlwdGlvbjogYCR7U2VsZWN0RmxhZ1R5cGVFcnJvck1lc3NhZ2UuRkxBR19UWVBFX0xJTUlUX0VYQ0VFREVEfWAsIGZpZWxkSWQ6ICdvdGhlci1mbGFnLXR5cGUtZGVzY3JpcHRpb24nIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25SZWZkYXRhRXJyb3IoZXJyb3I6IGFueSk6IHZvaWQge1xuICAgIC8vIFNldCBlcnJvciBmbGFnIG9uIGNvbXBvbmVudCB0byByZW1vdmUgdGhlIFwiTmV4dFwiIGJ1dHRvbiAodXNlciBjYW5ub3QgcHJvY2VlZCB3aXRoIGZsYWcgY3JlYXRpb24pXG4gICAgdGhpcy5yZWZkYXRhRXJyb3IgPSB0cnVlO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IFtdO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlcy5wdXNoKHsgdGl0bGU6ICcnLCBkZXNjcmlwdGlvbjogZXJyb3IubWVzc2FnZSwgZmllbGRJZDogJ2NvbmRpdGlvbmFsLXJhZGlvcy1saXN0JyB9KTtcbiAgICAvLyBSZXR1cm4gY2FzZSBmbGFnIGZpZWxkIHN0YXRlIGFuZCBlcnJvciBtZXNzYWdlcyB0byB0aGUgcGFyZW50XG4gICAgdGhpcy5jYXNlRmxhZ1N0YXRlRW1pdHRlci5lbWl0KHsgY3VycmVudENhc2VGbGFnRmllbGRTdGF0ZTogQ2FzZUZsYWdGaWVsZFN0YXRlLkZMQUdfVFlQRSwgZXJyb3JNZXNzYWdlczogdGhpcy5lcnJvck1lc3NhZ2VzIH0pO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCIgW25nQ2xhc3NdPVwieydmb3JtLWdyb3VwLWVycm9yJzogZmxhZ1R5cGVOb3RTZWxlY3RlZEVycm9yTWVzc2FnZS5sZW5ndGggPiAwfVwiPlxuICAgIDxmaWVsZHNldCBjbGFzcz1cImdvdnVrLWZpZWxkc2V0XCIgYXJpYS1kZXNjcmliZWRieT1cImZsYWctdHlwZS1oZWFkaW5nXCI+XG4gICAgICA8bGVnZW5kIGNsYXNzPVwiZ292dWstZmllbGRzZXRfX2xlZ2VuZCBnb3Z1ay1maWVsZHNldF9fbGVnZW5kLS1sXCI+XG4gICAgICAgIDxoMSBpZD1cImZsYWctdHlwZS1oZWFkaW5nXCIgY2xhc3M9XCJnb3Z1ay1maWVsZHNldF9faGVhZGluZ1wiPlxuICAgICAgICAgIHt7Y2FzZUZsYWdXaXphcmRTdGVwVGl0bGUuU0VMRUNUX0NBU0VfRkxBR319XG4gICAgICAgIDwvaDE+XG4gICAgICA8L2xlZ2VuZD5cbiAgICAgIDxkaXYgaWQ9XCJmbGFnLXR5cGUtbm90LXNlbGVjdGVkLWVycm9yLW1lc3NhZ2VcIiBjbGFzcz1cImdvdnVrLWVycm9yLW1lc3NhZ2VcIlxuICAgICAgICAqbmdJZj1cImZsYWdUeXBlTm90U2VsZWN0ZWRFcnJvck1lc3NhZ2UubGVuZ3RoID4gMFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXZpc3VhbGx5LWhpZGRlblwiPkVycm9yOjwvc3Bhbj4ge3tmbGFnVHlwZU5vdFNlbGVjdGVkRXJyb3JNZXNzYWdlfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvcyBnb3Z1ay1yYWRpb3MtLWNvbmRpdGlvbmFsXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1yYWRpb3NcIiBpZD1cImNvbmRpdGlvbmFsLXJhZGlvcy1saXN0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2l0ZW1cIiAqbmdGb3I9XCJsZXQgZmxhZ1R5cGUgb2YgZmxhZ1R5cGVzOyBpbmRleCBhcyBpXCI+XG4gICAgICAgICAgPCEtLSBBbGwgcGFyZW50IGZsYWcgdHlwZXMgaGF2ZSB0aGUgc2FtZSBmbGFnQ29kZSBvZiBcIkNBVEdSWVwiLCBzbyBlYWNoIHJhZGlvIGJ1dHRvbiB2YWx1ZSBuZWVkcyB0byBiZSBtYWRlXG4gICAgICAgICAgICB1bmlxdWUgYnkgYXBwZW5kaW5nIHRoZSBpbmRleCAtIHJhZGlvIGJ1dHRvbnMgc2hvdWxkbid0IHNoYXJlIHRoZSBzYW1lIHZhbHVlLlxuICAgICAgICAgICAgSXQgaXMgT0sgdG8gYW1lbmQgZmxhZ0NvZGUgdGhpcyB3YXkgYmVjYXVzZSBwYXJlbnQgZmxhZyB0eXBlcyBjYW5ub3QgYmUgc2VsZWN0ZWQgYXMgYSBmaW5hbCB2YWx1ZSAtLT5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2lucHV0XCIgaWQ9XCJmbGFnLXR5cGUte3tpfX1cIiBbbmFtZV09XCJmbGFnVHlwZUNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiIFt2YWx1ZV09XCJmbGFnVHlwZS5mbGFnQ29kZSA9PT0gJ0NBVEdSWScgPyBmbGFnVHlwZS5mbGFnQ29kZSArIGkgOiBmbGFnVHlwZS5mbGFnQ29kZVwiXG4gICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImZsYWdUeXBlQ29udHJvbE5hbWVcIiAoY2hhbmdlKT1cIm9uRmxhZ1R5cGVDaGFuZ2VkKGZsYWdUeXBlKVwiLz5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1yYWRpb3NfX2xhYmVsXCIgZm9yPVwiZmxhZy10eXBlLXt7aX19XCI+e3tmbGFnVHlwZS5uYW1lfX08L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19fY29uZGl0aW9uYWxcIiAqbmdJZj1cIm90aGVyRmxhZ1R5cGVTZWxlY3RlZFwiIGlkPVwiY29uZGl0aW9uYWwtZmxhZ1R5cGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiIFtuZ0NsYXNzXT1cInsnZm9ybS1ncm91cC1lcnJvcic6IGZsYWdUeXBlRXJyb3JNZXNzYWdlLmxlbmd0aCA+IDB9XCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbFwiIGZvcj1cIm90aGVyLWZsYWctdHlwZS1kZXNjcmlwdGlvblwiPkVudGVyIGEgZmxhZyB0eXBlPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJmbGFnLXR5cGUtZXJyb3ItbWVzc2FnZVwiIGNsYXNzPVwiZ292dWstZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwiZmxhZ1R5cGVFcnJvck1lc3NhZ2UubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXZpc3VhbGx5LWhpZGRlblwiPkVycm9yOjwvc3Bhbj4ge3tmbGFnVHlwZUVycm9yTWVzc2FnZX19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLWlucHV0IGdvdnVrLSEtd2lkdGgtb25lLWhhbGZcIlxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J2dvdnVrLWlucHV0LS1lcnJvcic6IGZsYWdUeXBlRXJyb3JNZXNzYWdlLmxlbmd0aCA+IDB9XCJcbiAgICAgICAgICAgICAgaWQ9XCJvdGhlci1mbGFnLXR5cGUtZGVzY3JpcHRpb25cIiBbbmFtZV09XCJkZXNjcmlwdGlvbkNvbnRyb2xOYW1lXCIgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImRlc2NyaXB0aW9uQ29udHJvbE5hbWVcIi8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9maWVsZHNldD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1idXR0b24tZ3JvdXBcIiAqbmdJZj1cIiFyZWZkYXRhRXJyb3JcIj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJvbk5leHQoKVwiPk5leHQ8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==