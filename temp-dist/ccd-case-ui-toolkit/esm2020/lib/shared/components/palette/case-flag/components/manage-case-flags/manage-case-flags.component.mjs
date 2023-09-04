import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { CaseFlagFieldState, CaseFlagWizardStepTitle, SelectFlagErrorMessage } from '../../enums';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "rpx-xui-translation";
function ManageCaseFlagsComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "span", 10);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "Error:"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 4, ctx_r0.manageCaseFlagSelectedErrorMessage), " ");
} }
function ManageCaseFlagsComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "input", 12)(2, "label", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const flagDisplay_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("id", "flag-selection-", i_r4, "");
    i0.ɵɵproperty("name", ctx_r1.selectedControlName)("value", flagDisplay_r3)("formControlName", ctx_r1.selectedControlName);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("for", "flag-selection-", i_r4, "");
    i0.ɵɵproperty("innerHtml", flagDisplay_r3.label, i0.ɵɵsanitizeHtml);
} }
function ManageCaseFlagsComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14)(1, "button", 15);
    i0.ɵɵlistener("click", function ManageCaseFlagsComponent_div_10_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.onNext()); });
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "Next"));
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
export class ManageCaseFlagsComponent {
    constructor() {
        this.caseFlagStateEmitter = new EventEmitter();
        this.errorMessages = [];
        this.manageCaseFlagSelectedErrorMessage = null;
        this.noFlagsError = false;
        this.selectedControlName = 'selectedManageCaseLocation';
    }
    ngOnInit() {
        this.manageCaseFlagTitle = CaseFlagWizardStepTitle.MANAGE_CASE_FLAGS;
        // Map flags instances to objects for display
        if (this.flagsData) {
            this.flagsDisplayData = this.flagsData.reduce((displayData, flagsInstance) => {
                if (flagsInstance.flags.details && flagsInstance.flags.details.length > 0) {
                    displayData = [
                        ...displayData,
                        ...flagsInstance.flags.details.map(detail => this.mapFlagDetailForDisplay(detail, flagsInstance))
                    ];
                }
                return displayData;
            }, []);
            this.flagsDisplayData.forEach(flagDisplayData => {
                flagDisplayData.label = this.processLabel(flagDisplayData);
            });
        }
        // Add a FormControl for the selected case flag if there is at least one flags instance remaining after mapping
        if (this.flagsDisplayData && this.flagsDisplayData.length > 0) {
            this.formGroup.addControl(this.selectedControlName, new FormControl(null));
        }
        else {
            // No flags display data means there are no flags to select from. The user cannot proceed with a flag update.
            // (Will need to be extended to check for case-level flags in future)
            this.onNoFlagsError();
        }
    }
    mapFlagDetailForDisplay(flagDetail, flagsInstance) {
        return {
            flagDetailDisplay: {
                partyName: flagsInstance.flags.partyName,
                flagDetail,
                flagsCaseFieldId: flagsInstance.caseField.id
            },
            pathToFlagsFormGroup: flagsInstance.pathToFlagsFormGroup,
            caseField: flagsInstance.caseField,
            roleOnCase: flagsInstance.flags.roleOnCase
        };
    }
    processLabel(flagDisplay) {
        const flagDetail = flagDisplay.flagDetailDisplay.flagDetail;
        const partyName = this.getPartyName(flagDisplay);
        const flagName = this.getFlagName(flagDetail);
        const flagDescription = this.getFlagDescription(flagDetail);
        const roleOnCase = this.getRoleOnCase(flagDisplay);
        const flagComment = this.getFlagComments(flagDetail);
        return flagName === flagDescription
            ? `${partyName}${roleOnCase} - <span class="flag-name-and-description">${flagDescription}</span>${flagComment}`
            : `${partyName}${roleOnCase} - <span class="flag-name-and-description">${flagName}, ${flagDescription}</span>${flagComment}`;
    }
    getPartyName(flagDisplay) {
        if (flagDisplay.pathToFlagsFormGroup && flagDisplay.pathToFlagsFormGroup === ManageCaseFlagsComponent.CASE_LEVEL_CASE_FLAGS_FIELD_ID) {
            return 'Case level';
        }
        if (flagDisplay.flagDetailDisplay.partyName) {
            return `${flagDisplay.flagDetailDisplay.partyName}`;
        }
        return '';
    }
    getFlagName(flagDetail) {
        if (flagDetail && flagDetail.path && flagDetail.path.length > 1) {
            return flagDetail.path[1].value;
        }
        if (flagDetail.subTypeKey && flagDetail.subTypeValue) {
            return flagDetail.subTypeValue;
        }
        return flagDetail.name;
    }
    getFlagDescription(flagDetail) {
        if (flagDetail && flagDetail.name) {
            if (flagDetail.name === 'Other' && flagDetail.otherDescription) {
                return flagDetail.otherDescription;
            }
            if (flagDetail.subTypeKey && flagDetail.subTypeValue) {
                return flagDetail.subTypeValue;
            }
            return flagDetail.name;
        }
        return '';
    }
    getRoleOnCase(flagDisplay) {
        if (flagDisplay && flagDisplay.roleOnCase) {
            return ` (${flagDisplay.roleOnCase})`;
        }
        return '';
    }
    getFlagComments(flagDetail) {
        if (flagDetail.flagComment) {
            return ` (${flagDetail.flagComment})`;
        }
        return '';
    }
    onNext() {
        // Validate flag selection
        this.validateSelection();
        // Return case flag field state, error messages, and flag selection to the parent
        this.caseFlagStateEmitter.emit({
            currentCaseFlagFieldState: CaseFlagFieldState.FLAG_MANAGE_CASE_FLAGS,
            errorMessages: this.errorMessages,
            selectedFlag: this.formGroup.get(this.selectedControlName).value
                ? this.formGroup.get(this.selectedControlName).value
                : null
        });
    }
    validateSelection() {
        this.manageCaseFlagSelectedErrorMessage = null;
        this.errorMessages = [];
        if (!this.formGroup.get(this.selectedControlName).value) {
            this.manageCaseFlagSelectedErrorMessage = SelectFlagErrorMessage.FLAG_NOT_SELECTED;
            this.errorMessages.push({
                title: '',
                description: SelectFlagErrorMessage.FLAG_NOT_SELECTED,
                fieldId: 'conditional-radios-list'
            });
        }
    }
    onNoFlagsError() {
        // Set error flag on component to remove the "Next" button (user cannot proceed with flag creation)
        this.noFlagsError = true;
        this.errorMessages = [];
        this.errorMessages.push({ title: '', description: SelectFlagErrorMessage.NO_FLAGS, fieldId: 'conditional-radios-list' });
        // Return case flag field state and error messages to the parent
        this.caseFlagStateEmitter.emit({
            currentCaseFlagFieldState: CaseFlagFieldState.FLAG_MANAGE_CASE_FLAGS,
            errorMessages: this.errorMessages
        });
    }
}
ManageCaseFlagsComponent.CASE_LEVEL_CASE_FLAGS_FIELD_ID = 'caseFlags';
ManageCaseFlagsComponent.ɵfac = function ManageCaseFlagsComponent_Factory(t) { return new (t || ManageCaseFlagsComponent)(); };
ManageCaseFlagsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ManageCaseFlagsComponent, selectors: [["ccd-manage-case-flags"]], inputs: { formGroup: "formGroup", flagsData: "flagsData", caseTitle: "caseTitle" }, outputs: { caseFlagStateEmitter: "caseFlagStateEmitter" }, decls: 11, vars: 10, consts: [[1, "form-group", 3, "formGroup"], [1, "govuk-form-group", 3, "ngClass"], ["aria-describedby", "manage-case-flag-heading", 1, "govuk-fieldset"], [1, "govuk-fieldset__legend", "govuk-fieldset__legend--l"], ["id", "manage-case-flag-heading", 1, "govuk-fieldset__heading"], ["id", "manage-case-flag-not-selected-error-message", "class", "govuk-error-message", 4, "ngIf"], ["data-module", "govuk-radios", "id", "conditional-radios-list", 1, "govuk-radios", "govuk-radios--conditional"], ["class", "govuk-radios__item", 4, "ngFor", "ngForOf"], ["class", "govuk-button-group", 4, "ngIf"], ["id", "manage-case-flag-not-selected-error-message", 1, "govuk-error-message"], [1, "govuk-visually-hidden"], [1, "govuk-radios__item"], ["type", "radio", 1, "govuk-radios__input", 3, "id", "name", "value", "formControlName"], [1, "govuk-label", "govuk-radios__label", 3, "for", "innerHtml"], [1, "govuk-button-group"], ["type", "button", 1, "button", "button-primary", 3, "click"]], template: function ManageCaseFlagsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "fieldset", 2)(3, "legend", 3)(4, "h1", 4);
        i0.ɵɵtext(5);
        i0.ɵɵpipe(6, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(7, ManageCaseFlagsComponent_div_7_Template, 6, 6, "div", 5);
        i0.ɵɵelementStart(8, "div", 6);
        i0.ɵɵtemplate(9, ManageCaseFlagsComponent_div_9_Template, 3, 6, "div", 7);
        i0.ɵɵelementEnd()()();
        i0.ɵɵtemplate(10, ManageCaseFlagsComponent_div_10_Template, 4, 3, "div", 8);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.formGroup);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c0, ctx.errorMessages.length > 0));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 6, ctx.manageCaseFlagTitle), " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.manageCaseFlagSelectedErrorMessage);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.flagsDisplayData);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.noFlagsError);
    } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i2.DefaultValueAccessor, i2.RadioControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, i3.RpxTranslatePipe], styles: [".flag-name-and-description{font-weight:700}\n"], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ManageCaseFlagsComponent, [{
        type: Component,
        args: [{ selector: 'ccd-manage-case-flags', encapsulation: ViewEncapsulation.None, template: "<div class=\"form-group\" [formGroup]=\"formGroup\">\n  <div class=\"govuk-form-group\" [ngClass]=\"{'form-group-error': errorMessages.length > 0}\">\n    <fieldset class=\"govuk-fieldset\" aria-describedby=\"manage-case-flag-heading\">\n      <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--l\">\n        <h1 id=\"manage-case-flag-heading\" class=\"govuk-fieldset__heading\">\n          {{manageCaseFlagTitle | rpxTranslate}}\n        </h1>\n      </legend>\n      <div id=\"manage-case-flag-not-selected-error-message\" class=\"govuk-error-message\"\n        *ngIf=\"manageCaseFlagSelectedErrorMessage\">\n        <span class=\"govuk-visually-hidden\">{{'Error:' | rpxTranslate}}</span> {{manageCaseFlagSelectedErrorMessage | rpxTranslate}}\n      </div>\n      <div class=\"govuk-radios govuk-radios--conditional\" data-module=\"govuk-radios\" id=\"conditional-radios-list\">\n        <div class=\"govuk-radios__item\" *ngFor=\"let flagDisplay of flagsDisplayData; index as i\">\n          <input class=\"govuk-radios__input\" id=\"flag-selection-{{i}}\" [name]=\"selectedControlName\"\n            type=\"radio\" [value]=\"flagDisplay\" [formControlName]=\"selectedControlName\"/>\n          <label class=\"govuk-label govuk-radios__label\" for=\"flag-selection-{{i}}\" [innerHtml]=\"flagDisplay.label\"></label>\n        </div>\n      </div>\n    </fieldset>\n  </div>\n  <div class=\"govuk-button-group\" *ngIf=\"!noFlagsError\">\n    <button class=\"button button-primary\" type=\"button\" (click)=\"onNext()\">{{'Next' | rpxTranslate}}</button>\n  </div>\n</div>\n", styles: [".flag-name-and-description{font-weight:700}\n"] }]
    }], null, { formGroup: [{
            type: Input
        }], flagsData: [{
            type: Input
        }], caseTitle: [{
            type: Input
        }], caseFlagStateEmitter: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWNhc2UtZmxhZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL2NvbXBvbmVudHMvbWFuYWdlLWNhc2UtZmxhZ3MvbWFuYWdlLWNhc2UtZmxhZ3MuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL2NvbXBvbmVudHMvbWFuYWdlLWNhc2UtZmxhZ3MvbWFuYWdlLWNhc2UtZmxhZ3MuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHVCQUF1QixFQUFFLHNCQUFzQixFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7SUNJNUYsOEJBQzZDLGVBQUE7SUFDUCxZQUEyQjs7SUFBQSxpQkFBTztJQUFDLFlBQ3pFOztJQUFBLGlCQUFNOzs7SUFEZ0MsZUFBMkI7SUFBM0Isb0RBQTJCO0lBQVEsZUFDekU7SUFEeUUsZ0dBQ3pFOzs7SUFFRSwrQkFBeUY7SUFDdkYsNEJBQzhFLGdCQUFBO0lBRWhGLGlCQUFNOzs7OztJQUgrQixlQUF5QjtJQUF6Qiw0REFBeUI7SUFBQyxpREFBNEIseUJBQUEsK0NBQUE7SUFFMUMsZUFBMEI7SUFBMUIsNkRBQTBCO0lBQUMsbUVBQStCOzs7O0lB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LGVBQTBEO1FBQTFELGtGQUEwRDtRQUloRixlQUNGO1FBREUsOEVBQ0Y7UUFHQyxlQUF3QztRQUF4Qyw2REFBd0M7UUFJZSxlQUFxQjtRQUFyQiw4Q0FBcUI7UUFRbEQsZUFBbUI7UUFBbkIsd0NBQW1COzt1RkRUekMsd0JBQXdCO2NBTnBDLFNBQVM7MkJBQ0UsdUJBQXVCLGlCQUdsQixpQkFBaUIsQ0FBQyxJQUFJO2dCQU1yQixTQUFTO2tCQUF4QixLQUFLO1lBQ1UsU0FBUztrQkFBeEIsS0FBSztZQUNVLFNBQVM7a0JBQXhCLEtBQUs7WUFDVyxvQkFBb0I7a0JBQXBDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQ2FzZUZsYWdTdGF0ZSwgRmxhZ0RldGFpbCwgRmxhZ0RldGFpbERpc3BsYXlXaXRoRm9ybUdyb3VwUGF0aCwgRmxhZ3MsIEZsYWdzV2l0aEZvcm1Hcm91cFBhdGggfSBmcm9tICcuLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQ2FzZUZsYWdGaWVsZFN0YXRlLCBDYXNlRmxhZ1dpemFyZFN0ZXBUaXRsZSwgU2VsZWN0RmxhZ0Vycm9yTWVzc2FnZSB9IGZyb20gJy4uLy4uL2VudW1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLW1hbmFnZS1jYXNlLWZsYWdzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hbmFnZS1jYXNlLWZsYWdzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWFuYWdlLWNhc2UtZmxhZ3MuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNYW5hZ2VDYXNlRmxhZ3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENBU0VfTEVWRUxfQ0FTRV9GTEFHU19GSUVMRF9JRCA9ICdjYXNlRmxhZ3MnO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIHB1YmxpYyBmbGFnc0RhdGE6IEZsYWdzV2l0aEZvcm1Hcm91cFBhdGhbXTtcbiAgQElucHV0KCkgcHVibGljIGNhc2VUaXRsZTogc3RyaW5nO1xuICBAT3V0cHV0KCkgcHVibGljIGNhc2VGbGFnU3RhdGVFbWl0dGVyOiBFdmVudEVtaXR0ZXI8Q2FzZUZsYWdTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPENhc2VGbGFnU3RhdGU+KCk7XG5cbiAgcHVibGljIG1hbmFnZUNhc2VGbGFnVGl0bGU6IENhc2VGbGFnV2l6YXJkU3RlcFRpdGxlO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlczogRXJyb3JNZXNzYWdlW10gPSBbXTtcbiAgcHVibGljIG1hbmFnZUNhc2VGbGFnU2VsZWN0ZWRFcnJvck1lc3NhZ2U6IFNlbGVjdEZsYWdFcnJvck1lc3NhZ2UgPSBudWxsO1xuICBwdWJsaWMgZmxhZ3NEaXNwbGF5RGF0YTogRmxhZ0RldGFpbERpc3BsYXlXaXRoRm9ybUdyb3VwUGF0aFtdO1xuICBwdWJsaWMgZmxhZ3M6IEZsYWdzO1xuICBwdWJsaWMgbm9GbGFnc0Vycm9yID0gZmFsc2U7XG4gIHB1YmxpYyByZWFkb25seSBzZWxlY3RlZENvbnRyb2xOYW1lID0gJ3NlbGVjdGVkTWFuYWdlQ2FzZUxvY2F0aW9uJztcblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5tYW5hZ2VDYXNlRmxhZ1RpdGxlID0gQ2FzZUZsYWdXaXphcmRTdGVwVGl0bGUuTUFOQUdFX0NBU0VfRkxBR1M7XG5cbiAgICAvLyBNYXAgZmxhZ3MgaW5zdGFuY2VzIHRvIG9iamVjdHMgZm9yIGRpc3BsYXlcbiAgICBpZiAodGhpcy5mbGFnc0RhdGEpIHtcbiAgICAgIHRoaXMuZmxhZ3NEaXNwbGF5RGF0YSA9IHRoaXMuZmxhZ3NEYXRhLnJlZHVjZSgoZGlzcGxheURhdGEsIGZsYWdzSW5zdGFuY2UpID0+IHtcbiAgICAgICAgaWYgKGZsYWdzSW5zdGFuY2UuZmxhZ3MuZGV0YWlscyAmJiBmbGFnc0luc3RhbmNlLmZsYWdzLmRldGFpbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGRpc3BsYXlEYXRhID0gW1xuICAgICAgICAgICAgLi4uZGlzcGxheURhdGEsXG4gICAgICAgICAgICAuLi5mbGFnc0luc3RhbmNlLmZsYWdzLmRldGFpbHMubWFwKGRldGFpbCA9PlxuICAgICAgICAgICAgICB0aGlzLm1hcEZsYWdEZXRhaWxGb3JEaXNwbGF5KGRldGFpbCwgZmxhZ3NJbnN0YW5jZSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaXNwbGF5RGF0YTtcbiAgICAgIH0sIFtdKTtcblxuICAgICAgdGhpcy5mbGFnc0Rpc3BsYXlEYXRhLmZvckVhY2goZmxhZ0Rpc3BsYXlEYXRhID0+IHtcbiAgICAgICAgZmxhZ0Rpc3BsYXlEYXRhLmxhYmVsID0gdGhpcy5wcm9jZXNzTGFiZWwoZmxhZ0Rpc3BsYXlEYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCBhIEZvcm1Db250cm9sIGZvciB0aGUgc2VsZWN0ZWQgY2FzZSBmbGFnIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSBmbGFncyBpbnN0YW5jZSByZW1haW5pbmcgYWZ0ZXIgbWFwcGluZ1xuICAgIGlmICh0aGlzLmZsYWdzRGlzcGxheURhdGEgJiYgdGhpcy5mbGFnc0Rpc3BsYXlEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2wodGhpcy5zZWxlY3RlZENvbnRyb2xOYW1lLCBuZXcgRm9ybUNvbnRyb2wobnVsbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyBmbGFncyBkaXNwbGF5IGRhdGEgbWVhbnMgdGhlcmUgYXJlIG5vIGZsYWdzIHRvIHNlbGVjdCBmcm9tLiBUaGUgdXNlciBjYW5ub3QgcHJvY2VlZCB3aXRoIGEgZmxhZyB1cGRhdGUuXG4gICAgICAvLyAoV2lsbCBuZWVkIHRvIGJlIGV4dGVuZGVkIHRvIGNoZWNrIGZvciBjYXNlLWxldmVsIGZsYWdzIGluIGZ1dHVyZSlcbiAgICAgIHRoaXMub25Ob0ZsYWdzRXJyb3IoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbWFwRmxhZ0RldGFpbEZvckRpc3BsYXkoZmxhZ0RldGFpbDogRmxhZ0RldGFpbCwgZmxhZ3NJbnN0YW5jZTogRmxhZ3NXaXRoRm9ybUdyb3VwUGF0aCk6IEZsYWdEZXRhaWxEaXNwbGF5V2l0aEZvcm1Hcm91cFBhdGgge1xuICAgIHJldHVybiB7XG4gICAgICBmbGFnRGV0YWlsRGlzcGxheToge1xuICAgICAgICBwYXJ0eU5hbWU6IGZsYWdzSW5zdGFuY2UuZmxhZ3MucGFydHlOYW1lLFxuICAgICAgICBmbGFnRGV0YWlsLFxuICAgICAgICBmbGFnc0Nhc2VGaWVsZElkOiBmbGFnc0luc3RhbmNlLmNhc2VGaWVsZC5pZFxuICAgICAgfSxcbiAgICAgIHBhdGhUb0ZsYWdzRm9ybUdyb3VwOiBmbGFnc0luc3RhbmNlLnBhdGhUb0ZsYWdzRm9ybUdyb3VwLFxuICAgICAgY2FzZUZpZWxkOiBmbGFnc0luc3RhbmNlLmNhc2VGaWVsZCxcbiAgICAgIHJvbGVPbkNhc2U6IGZsYWdzSW5zdGFuY2UuZmxhZ3Mucm9sZU9uQ2FzZVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgcHJvY2Vzc0xhYmVsKGZsYWdEaXNwbGF5OiBGbGFnRGV0YWlsRGlzcGxheVdpdGhGb3JtR3JvdXBQYXRoKTogc3RyaW5nIHtcbiAgICBjb25zdCBmbGFnRGV0YWlsID0gZmxhZ0Rpc3BsYXkuZmxhZ0RldGFpbERpc3BsYXkuZmxhZ0RldGFpbDtcbiAgICBjb25zdCBwYXJ0eU5hbWUgPSB0aGlzLmdldFBhcnR5TmFtZShmbGFnRGlzcGxheSk7XG4gICAgY29uc3QgZmxhZ05hbWUgPSB0aGlzLmdldEZsYWdOYW1lKGZsYWdEZXRhaWwpO1xuICAgIGNvbnN0IGZsYWdEZXNjcmlwdGlvbiA9IHRoaXMuZ2V0RmxhZ0Rlc2NyaXB0aW9uKGZsYWdEZXRhaWwpO1xuICAgIGNvbnN0IHJvbGVPbkNhc2UgPSB0aGlzLmdldFJvbGVPbkNhc2UoZmxhZ0Rpc3BsYXkpO1xuICAgIGNvbnN0IGZsYWdDb21tZW50ID0gdGhpcy5nZXRGbGFnQ29tbWVudHMoZmxhZ0RldGFpbCk7XG5cbiAgICByZXR1cm4gZmxhZ05hbWUgPT09IGZsYWdEZXNjcmlwdGlvblxuICAgICAgPyBgJHtwYXJ0eU5hbWV9JHtyb2xlT25DYXNlfSAtIDxzcGFuIGNsYXNzPVwiZmxhZy1uYW1lLWFuZC1kZXNjcmlwdGlvblwiPiR7ZmxhZ0Rlc2NyaXB0aW9ufTwvc3Bhbj4ke2ZsYWdDb21tZW50fWBcbiAgICAgIDogYCR7cGFydHlOYW1lfSR7cm9sZU9uQ2FzZX0gLSA8c3BhbiBjbGFzcz1cImZsYWctbmFtZS1hbmQtZGVzY3JpcHRpb25cIj4ke2ZsYWdOYW1lfSwgJHtmbGFnRGVzY3JpcHRpb259PC9zcGFuPiR7ZmxhZ0NvbW1lbnR9YDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQYXJ0eU5hbWUoZmxhZ0Rpc3BsYXk6IEZsYWdEZXRhaWxEaXNwbGF5V2l0aEZvcm1Hcm91cFBhdGgpOiBzdHJpbmcge1xuICAgIGlmIChmbGFnRGlzcGxheS5wYXRoVG9GbGFnc0Zvcm1Hcm91cCAmJiBmbGFnRGlzcGxheS5wYXRoVG9GbGFnc0Zvcm1Hcm91cCA9PT0gTWFuYWdlQ2FzZUZsYWdzQ29tcG9uZW50LkNBU0VfTEVWRUxfQ0FTRV9GTEFHU19GSUVMRF9JRCkge1xuICAgICAgcmV0dXJuICdDYXNlIGxldmVsJztcbiAgICB9XG4gICAgaWYgKGZsYWdEaXNwbGF5LmZsYWdEZXRhaWxEaXNwbGF5LnBhcnR5TmFtZSkge1xuICAgICAgcmV0dXJuIGAke2ZsYWdEaXNwbGF5LmZsYWdEZXRhaWxEaXNwbGF5LnBhcnR5TmFtZX1gO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmxhZ05hbWUoZmxhZ0RldGFpbDogRmxhZ0RldGFpbCk6IHN0cmluZyB7XG4gICAgaWYgKGZsYWdEZXRhaWwgJiYgZmxhZ0RldGFpbC5wYXRoICYmIGZsYWdEZXRhaWwucGF0aC5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gZmxhZ0RldGFpbC5wYXRoWzFdLnZhbHVlO1xuICAgIH1cbiAgICBpZiAoZmxhZ0RldGFpbC5zdWJUeXBlS2V5ICYmIGZsYWdEZXRhaWwuc3ViVHlwZVZhbHVlKSB7XG4gICAgICByZXR1cm4gZmxhZ0RldGFpbC5zdWJUeXBlVmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBmbGFnRGV0YWlsLm5hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmxhZ0Rlc2NyaXB0aW9uKGZsYWdEZXRhaWw6IEZsYWdEZXRhaWwpOiBzdHJpbmcge1xuICAgIGlmIChmbGFnRGV0YWlsICYmIGZsYWdEZXRhaWwubmFtZSkge1xuICAgICAgaWYgKGZsYWdEZXRhaWwubmFtZSA9PT0gJ090aGVyJyAmJiBmbGFnRGV0YWlsLm90aGVyRGVzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIGZsYWdEZXRhaWwub3RoZXJEZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICAgIGlmIChmbGFnRGV0YWlsLnN1YlR5cGVLZXkgJiYgZmxhZ0RldGFpbC5zdWJUeXBlVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZsYWdEZXRhaWwuc3ViVHlwZVZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZsYWdEZXRhaWwubmFtZTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcHVibGljIGdldFJvbGVPbkNhc2UoZmxhZ0Rpc3BsYXk6IEZsYWdEZXRhaWxEaXNwbGF5V2l0aEZvcm1Hcm91cFBhdGgpOiBzdHJpbmcge1xuICAgIGlmIChmbGFnRGlzcGxheSAmJiBmbGFnRGlzcGxheS5yb2xlT25DYXNlKSB7XG4gICAgICByZXR1cm4gYCAoJHtmbGFnRGlzcGxheS5yb2xlT25DYXNlfSlgO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmxhZ0NvbW1lbnRzKGZsYWdEZXRhaWw6IEZsYWdEZXRhaWwpOiBzdHJpbmcge1xuICAgIGlmIChmbGFnRGV0YWlsLmZsYWdDb21tZW50KSB7XG4gICAgICByZXR1cm4gYCAoJHtmbGFnRGV0YWlsLmZsYWdDb21tZW50fSlgO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBwdWJsaWMgb25OZXh0KCk6IHZvaWQge1xuICAgIC8vIFZhbGlkYXRlIGZsYWcgc2VsZWN0aW9uXG4gICAgdGhpcy52YWxpZGF0ZVNlbGVjdGlvbigpO1xuICAgIC8vIFJldHVybiBjYXNlIGZsYWcgZmllbGQgc3RhdGUsIGVycm9yIG1lc3NhZ2VzLCBhbmQgZmxhZyBzZWxlY3Rpb24gdG8gdGhlIHBhcmVudFxuICAgIHRoaXMuY2FzZUZsYWdTdGF0ZUVtaXR0ZXIuZW1pdCh7XG4gICAgICBjdXJyZW50Q2FzZUZsYWdGaWVsZFN0YXRlOiBDYXNlRmxhZ0ZpZWxkU3RhdGUuRkxBR19NQU5BR0VfQ0FTRV9GTEFHUyxcbiAgICAgIGVycm9yTWVzc2FnZXM6IHRoaXMuZXJyb3JNZXNzYWdlcyxcbiAgICAgIHNlbGVjdGVkRmxhZzogdGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMuc2VsZWN0ZWRDb250cm9sTmFtZSkudmFsdWVcbiAgICAgICAgPyB0aGlzLmZvcm1Hcm91cC5nZXQodGhpcy5zZWxlY3RlZENvbnRyb2xOYW1lKS52YWx1ZSBhcyBGbGFnRGV0YWlsRGlzcGxheVdpdGhGb3JtR3JvdXBQYXRoXG4gICAgICAgIDogbnVsbFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZVNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLm1hbmFnZUNhc2VGbGFnU2VsZWN0ZWRFcnJvck1lc3NhZ2UgPSBudWxsO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IFtdO1xuICAgIGlmICghdGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMuc2VsZWN0ZWRDb250cm9sTmFtZSkudmFsdWUpIHtcbiAgICAgIHRoaXMubWFuYWdlQ2FzZUZsYWdTZWxlY3RlZEVycm9yTWVzc2FnZSA9IFNlbGVjdEZsYWdFcnJvck1lc3NhZ2UuRkxBR19OT1RfU0VMRUNURUQ7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFNlbGVjdEZsYWdFcnJvck1lc3NhZ2UuRkxBR19OT1RfU0VMRUNURUQsXG4gICAgICAgIGZpZWxkSWQ6ICdjb25kaXRpb25hbC1yYWRpb3MtbGlzdCdcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25Ob0ZsYWdzRXJyb3IoKTogdm9pZCB7XG4gICAgLy8gU2V0IGVycm9yIGZsYWcgb24gY29tcG9uZW50IHRvIHJlbW92ZSB0aGUgXCJOZXh0XCIgYnV0dG9uICh1c2VyIGNhbm5vdCBwcm9jZWVkIHdpdGggZmxhZyBjcmVhdGlvbilcbiAgICB0aGlzLm5vRmxhZ3NFcnJvciA9IHRydWU7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gW107XG4gICAgdGhpcy5lcnJvck1lc3NhZ2VzLnB1c2goeyB0aXRsZTogJycsIGRlc2NyaXB0aW9uOiBTZWxlY3RGbGFnRXJyb3JNZXNzYWdlLk5PX0ZMQUdTLCBmaWVsZElkOiAnY29uZGl0aW9uYWwtcmFkaW9zLWxpc3QnIH0pO1xuICAgIC8vIFJldHVybiBjYXNlIGZsYWcgZmllbGQgc3RhdGUgYW5kIGVycm9yIG1lc3NhZ2VzIHRvIHRoZSBwYXJlbnRcbiAgICB0aGlzLmNhc2VGbGFnU3RhdGVFbWl0dGVyLmVtaXQoe1xuICAgICAgY3VycmVudENhc2VGbGFnRmllbGRTdGF0ZTogQ2FzZUZsYWdGaWVsZFN0YXRlLkZMQUdfTUFOQUdFX0NBU0VfRkxBR1MsXG4gICAgICBlcnJvck1lc3NhZ2VzOiB0aGlzLmVycm9yTWVzc2FnZXNcbiAgICB9KTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiIFtuZ0NsYXNzXT1cInsnZm9ybS1ncm91cC1lcnJvcic6IGVycm9yTWVzc2FnZXMubGVuZ3RoID4gMH1cIj5cbiAgICA8ZmllbGRzZXQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJtYW5hZ2UtY2FzZS1mbGFnLWhlYWRpbmdcIj5cbiAgICAgIDxsZWdlbmQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldF9fbGVnZW5kIGdvdnVrLWZpZWxkc2V0X19sZWdlbmQtLWxcIj5cbiAgICAgICAgPGgxIGlkPVwibWFuYWdlLWNhc2UtZmxhZy1oZWFkaW5nXCIgY2xhc3M9XCJnb3Z1ay1maWVsZHNldF9faGVhZGluZ1wiPlxuICAgICAgICAgIHt7bWFuYWdlQ2FzZUZsYWdUaXRsZSB8IHJweFRyYW5zbGF0ZX19XG4gICAgICAgIDwvaDE+XG4gICAgICA8L2xlZ2VuZD5cbiAgICAgIDxkaXYgaWQ9XCJtYW5hZ2UtY2FzZS1mbGFnLW5vdC1zZWxlY3RlZC1lcnJvci1tZXNzYWdlXCIgY2xhc3M9XCJnb3Z1ay1lcnJvci1tZXNzYWdlXCJcbiAgICAgICAgKm5nSWY9XCJtYW5hZ2VDYXNlRmxhZ1NlbGVjdGVkRXJyb3JNZXNzYWdlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstdmlzdWFsbHktaGlkZGVuXCI+e3snRXJyb3I6JyB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPiB7e21hbmFnZUNhc2VGbGFnU2VsZWN0ZWRFcnJvck1lc3NhZ2UgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zIGdvdnVrLXJhZGlvcy0tY29uZGl0aW9uYWxcIiBkYXRhLW1vZHVsZT1cImdvdnVrLXJhZGlvc1wiIGlkPVwiY29uZGl0aW9uYWwtcmFkaW9zLWxpc3RcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19faXRlbVwiICpuZ0Zvcj1cImxldCBmbGFnRGlzcGxheSBvZiBmbGFnc0Rpc3BsYXlEYXRhOyBpbmRleCBhcyBpXCI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstcmFkaW9zX19pbnB1dFwiIGlkPVwiZmxhZy1zZWxlY3Rpb24te3tpfX1cIiBbbmFtZV09XCJzZWxlY3RlZENvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiIFt2YWx1ZV09XCJmbGFnRGlzcGxheVwiIFtmb3JtQ29udHJvbE5hbWVdPVwic2VsZWN0ZWRDb250cm9sTmFtZVwiLz5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1yYWRpb3NfX2xhYmVsXCIgZm9yPVwiZmxhZy1zZWxlY3Rpb24te3tpfX1cIiBbaW5uZXJIdG1sXT1cImZsYWdEaXNwbGF5LmxhYmVsXCI+PC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2ZpZWxkc2V0PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi1ncm91cFwiICpuZ0lmPVwiIW5vRmxhZ3NFcnJvclwiPlxuICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9uTmV4dCgpXCI+e3snTmV4dCcgfCBycHhUcmFuc2xhdGV9fTwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19