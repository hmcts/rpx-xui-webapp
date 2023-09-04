import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { CaseFlagFieldState, CaseFlagWizardStepTitle, SelectFlagLocationErrorMessage } from '../../enums';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "rpx-xui-translation";
function SelectFlagLocationComponent_div_7_Template(rf, ctx) { if (rf & 1) {
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
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 4, ctx_r0.flagLocationNotSelectedErrorMessage), " ");
} }
function SelectFlagLocationComponent_div_9_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const flagsInstance_r3 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" (", i0.ɵɵpipeBind1(2, 1, flagsInstance_r3.flags.roleOnCase), ") ");
} }
function SelectFlagLocationComponent_div_9_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, SelectFlagLocationComponent_div_9_ng_container_3_ng_container_2_Template, 3, 3, "ng-container", 14);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const flagsInstance_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", flagsInstance_r3.flags.partyName, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", flagsInstance_r3.flags.roleOnCase);
} }
function SelectFlagLocationComponent_div_9_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, ctx_r6.caseLevelFlagLabel), " ");
} }
function SelectFlagLocationComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "input", 12);
    i0.ɵɵelementStart(2, "label", 13);
    i0.ɵɵtemplate(3, SelectFlagLocationComponent_div_9_ng_container_3_Template, 3, 2, "ng-container", 14);
    i0.ɵɵtemplate(4, SelectFlagLocationComponent_div_9_ng_container_4_Template, 3, 3, "ng-container", 14);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const flagsInstance_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("id", "flag-location-", i_r4, "");
    i0.ɵɵproperty("name", ctx_r1.selectedLocationControlName)("value", flagsInstance_r3)("formControlName", ctx_r1.selectedLocationControlName);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("for", "flag-location-", i_r4, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", flagsInstance_r3.flags.partyName);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !flagsInstance_r3.flags.partyName);
} }
function SelectFlagLocationComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "button", 16);
    i0.ɵɵlistener("click", function SelectFlagLocationComponent_div_10_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.onNext()); });
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "Next"));
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
export class SelectFlagLocationComponent {
    constructor() {
        this.caseFlagStateEmitter = new EventEmitter();
        this.errorMessages = [];
        this.flagLocationNotSelectedErrorMessage = null;
        this.caseFlagsConfigError = false;
        this.selectedLocationControlName = 'selectedLocation';
        this.caseLevelFlagLabel = 'Case level';
        this.caseLevelCaseFlagsFieldId = 'caseFlags';
    }
    ngOnInit() {
        this.flagLocationTitle = CaseFlagWizardStepTitle.SELECT_FLAG_LOCATION;
        // Filter out any flags instances that don't have a party name, unless the instance is for case-level flags (this
        // is expected not to have a party name)
        if (this.flagsData) {
            this.filteredFlagsData =
                this.flagsData.filter(f => f.flags.partyName !== null || f.pathToFlagsFormGroup === this.caseLevelCaseFlagsFieldId);
        }
        // Add a FormControl for the selected flag location if there is at least one flags instance remaining after filtering
        if (this.filteredFlagsData && this.filteredFlagsData.length > 0) {
            this.formGroup.addControl(this.selectedLocationControlName, new FormControl(null));
        }
        else {
            // No filtered flags instances mean there are no parties to select from. The case has not been configured properly
            // for case flags and the user cannot proceed with flag creation. (Will need to be extended to check for case-level
            // flags in future)
            this.onCaseFlagsConfigError();
        }
    }
    onNext() {
        // Validate flag location selection
        this.validateSelection();
        // Return case flag field state, error messages, and selected FlagsWithFormGroupPath instance (i.e. flag location) to
        // the parent
        this.caseFlagStateEmitter.emit({
            currentCaseFlagFieldState: CaseFlagFieldState.FLAG_LOCATION,
            errorMessages: this.errorMessages,
            selectedFlagsLocation: this.formGroup.get(this.selectedLocationControlName).value
                ? this.formGroup.get(this.selectedLocationControlName).value
                : null
        });
    }
    validateSelection() {
        this.flagLocationNotSelectedErrorMessage = null;
        this.errorMessages = [];
        if (!this.formGroup.get(this.selectedLocationControlName).value) {
            this.flagLocationNotSelectedErrorMessage = SelectFlagLocationErrorMessage.FLAG_LOCATION_NOT_SELECTED;
            this.errorMessages.push({
                title: '',
                description: SelectFlagLocationErrorMessage.FLAG_LOCATION_NOT_SELECTED,
                fieldId: 'conditional-radios-list'
            });
        }
    }
    onCaseFlagsConfigError() {
        // Set error flag on component to remove the "Next" button (user cannot proceed with flag creation)
        this.caseFlagsConfigError = true;
        this.errorMessages = [];
        this.errorMessages.push({ title: '', description: SelectFlagLocationErrorMessage.FLAGS_NOT_CONFIGURED, fieldId: 'conditional-radios-list' });
        // Return case flag field state and error messages to the parent
        this.caseFlagStateEmitter.emit({ currentCaseFlagFieldState: CaseFlagFieldState.FLAG_TYPE, errorMessages: this.errorMessages });
    }
}
SelectFlagLocationComponent.ɵfac = function SelectFlagLocationComponent_Factory(t) { return new (t || SelectFlagLocationComponent)(); };
SelectFlagLocationComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SelectFlagLocationComponent, selectors: [["ccd-select-flag-location"]], inputs: { formGroup: "formGroup", flagsData: "flagsData" }, outputs: { caseFlagStateEmitter: "caseFlagStateEmitter" }, decls: 11, vars: 10, consts: [[3, "formGroup"], [1, "govuk-form-group", 3, "ngClass"], ["aria-describedby", "flag-location-heading", 1, "govuk-fieldset"], [1, "govuk-fieldset__legend", "govuk-fieldset__legend--l"], ["id", "flag-location-heading", 1, "govuk-fieldset__heading"], ["id", "flag-location-not-selected-error-message", "class", "govuk-error-message", 4, "ngIf"], ["data-module", "govuk-radios", "id", "conditional-radios-list", 1, "govuk-radios", "govuk-radios--conditional"], ["class", "govuk-radios__item", 4, "ngFor", "ngForOf"], ["class", "govuk-button-group", 4, "ngIf"], ["id", "flag-location-not-selected-error-message", 1, "govuk-error-message"], [1, "govuk-visually-hidden"], [1, "govuk-radios__item"], ["type", "radio", 1, "govuk-radios__input", 3, "id", "name", "value", "formControlName"], [1, "govuk-label", "govuk-radios__label", 3, "for"], [4, "ngIf"], [1, "govuk-button-group"], ["type", "button", 1, "button", "button-primary", 3, "click"]], template: function SelectFlagLocationComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementContainerStart(0, 0);
        i0.ɵɵelementStart(1, "div", 1)(2, "fieldset", 2)(3, "legend", 3)(4, "h1", 4);
        i0.ɵɵtext(5);
        i0.ɵɵpipe(6, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(7, SelectFlagLocationComponent_div_7_Template, 6, 6, "div", 5);
        i0.ɵɵelementStart(8, "div", 6);
        i0.ɵɵtemplate(9, SelectFlagLocationComponent_div_9_Template, 5, 7, "div", 7);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementContainerEnd();
        i0.ɵɵtemplate(10, SelectFlagLocationComponent_div_10_Template, 4, 3, "div", 8);
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.formGroup);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c0, ctx.errorMessages.length > 0));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 6, ctx.flagLocationTitle), " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.flagLocationNotSelectedErrorMessage);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.filteredFlagsData);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.caseFlagsConfigError);
    } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i2.DefaultValueAccessor, i2.RadioControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, i3.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SelectFlagLocationComponent, [{
        type: Component,
        args: [{ selector: 'ccd-select-flag-location', template: "<ng-container [formGroup]=\"formGroup\">\n  <div class=\"govuk-form-group\" [ngClass]=\"{'form-group-error': errorMessages.length > 0}\">\n    <fieldset class=\"govuk-fieldset\" aria-describedby=\"flag-location-heading\">\n      <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--l\">\n        <h1 id=\"flag-location-heading\" class=\"govuk-fieldset__heading\">\n          {{flagLocationTitle | rpxTranslate}}\n        </h1>\n      </legend>\n      <div id=\"flag-location-not-selected-error-message\" class=\"govuk-error-message\"\n        *ngIf=\"flagLocationNotSelectedErrorMessage\">\n        <span class=\"govuk-visually-hidden\">{{'Error:' | rpxTranslate}}</span> {{flagLocationNotSelectedErrorMessage | rpxTranslate}}\n      </div>\n      <div class=\"govuk-radios govuk-radios--conditional\" data-module=\"govuk-radios\" id=\"conditional-radios-list\">\n        <div class=\"govuk-radios__item\" *ngFor=\"let flagsInstance of filteredFlagsData; index as i\">\n          <input class=\"govuk-radios__input\" id=\"flag-location-{{i}}\" [name]=\"selectedLocationControlName\"\n            type=\"radio\" [value]=\"flagsInstance\" [formControlName]=\"selectedLocationControlName\"/>\n          <label class=\"govuk-label govuk-radios__label\" for=\"flag-location-{{i}}\">\n            <ng-container *ngIf=\"flagsInstance.flags.partyName\">\n              {{flagsInstance.flags.partyName}}\n              <ng-container *ngIf=\"flagsInstance.flags.roleOnCase\">\n                ({{flagsInstance.flags.roleOnCase | rpxTranslate}})\n              </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"!flagsInstance.flags.partyName\">\n              {{caseLevelFlagLabel | rpxTranslate}}\n            </ng-container>\n          </label>\n        </div>\n      </div>\n    </fieldset>\n  </div>\n</ng-container>\n\n<div class=\"govuk-button-group\" *ngIf=\"!caseFlagsConfigError\">\n  <button class=\"button button-primary\" type=\"button\" (click)=\"onNext()\">{{'Next' | rpxTranslate}}</button>\n</div>\n" }]
    }], null, { formGroup: [{
            type: Input
        }], flagsData: [{
            type: Input
        }], caseFlagStateEmitter: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWZsYWctbG9jYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL2NvbXBvbmVudHMvc2VsZWN0LWZsYWctbG9jYXRpb24vc2VsZWN0LWZsYWctbG9jYXRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL2NvbXBvbmVudHMvc2VsZWN0LWZsYWctbG9jYXRpb24vc2VsZWN0LWZsYWctbG9jYXRpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHVCQUF1QixFQUFFLDhCQUE4QixFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7SUNJcEcsOEJBQzhDLGVBQUE7SUFDUixZQUEyQjs7SUFBQSxpQkFBTztJQUFDLFlBQ3pFOztJQUFBLGlCQUFNOzs7SUFEZ0MsZUFBMkI7SUFBM0Isb0RBQTJCO0lBQVEsZUFDekU7SUFEeUUsaUdBQ3pFOzs7SUFRUSw2QkFBcUQ7SUFDbkQsWUFDRjs7SUFBQSwwQkFBZTs7O0lBRGIsZUFDRjtJQURFLDBGQUNGOzs7SUFKRiw2QkFBb0Q7SUFDbEQsWUFDQTtJQUFBLG9IQUVlO0lBQ2pCLDBCQUFlOzs7SUFKYixlQUNBO0lBREEsaUVBQ0E7SUFBZSxl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cEIsU0FBUztrQkFBeEIsS0FBSztZQUNVLFNBQVM7a0JBQXhCLEtBQUs7WUFFVyxvQkFBb0I7a0JBQXBDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEVycm9yTWVzc2FnZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2RvbWFpbic7XG5pbXBvcnQgeyBDYXNlRmxhZ1N0YXRlLCBGbGFnc1dpdGhGb3JtR3JvdXBQYXRoIH0gZnJvbSAnLi4vLi4vZG9tYWluJztcbmltcG9ydCB7IENhc2VGbGFnRmllbGRTdGF0ZSwgQ2FzZUZsYWdXaXphcmRTdGVwVGl0bGUsIFNlbGVjdEZsYWdMb2NhdGlvbkVycm9yTWVzc2FnZSB9IGZyb20gJy4uLy4uL2VudW1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXNlbGVjdC1mbGFnLWxvY2F0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC1mbGFnLWxvY2F0aW9uLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RGbGFnTG9jYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwdWJsaWMgZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBASW5wdXQoKSBwdWJsaWMgZmxhZ3NEYXRhOiBGbGFnc1dpdGhGb3JtR3JvdXBQYXRoW107XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBjYXNlRmxhZ1N0YXRlRW1pdHRlcjogRXZlbnRFbWl0dGVyPENhc2VGbGFnU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxDYXNlRmxhZ1N0YXRlPigpO1xuXG4gIHB1YmxpYyBmbGFnTG9jYXRpb25UaXRsZTogQ2FzZUZsYWdXaXphcmRTdGVwVGl0bGU7XG4gIHB1YmxpYyBlcnJvck1lc3NhZ2VzOiBFcnJvck1lc3NhZ2VbXSA9IFtdO1xuICBwdWJsaWMgZmxhZ0xvY2F0aW9uTm90U2VsZWN0ZWRFcnJvck1lc3NhZ2U6IFNlbGVjdEZsYWdMb2NhdGlvbkVycm9yTWVzc2FnZSA9IG51bGw7XG4gIHB1YmxpYyBmaWx0ZXJlZEZsYWdzRGF0YTogRmxhZ3NXaXRoRm9ybUdyb3VwUGF0aFtdO1xuICBwdWJsaWMgY2FzZUZsYWdzQ29uZmlnRXJyb3IgPSBmYWxzZTtcbiAgcHVibGljIHJlYWRvbmx5IHNlbGVjdGVkTG9jYXRpb25Db250cm9sTmFtZSA9ICdzZWxlY3RlZExvY2F0aW9uJztcbiAgcHVibGljIHJlYWRvbmx5IGNhc2VMZXZlbEZsYWdMYWJlbCA9ICdDYXNlIGxldmVsJztcbiAgcHJpdmF0ZSByZWFkb25seSBjYXNlTGV2ZWxDYXNlRmxhZ3NGaWVsZElkID0gJ2Nhc2VGbGFncyc7XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZmxhZ0xvY2F0aW9uVGl0bGUgPSBDYXNlRmxhZ1dpemFyZFN0ZXBUaXRsZS5TRUxFQ1RfRkxBR19MT0NBVElPTjtcblxuICAgIC8vIEZpbHRlciBvdXQgYW55IGZsYWdzIGluc3RhbmNlcyB0aGF0IGRvbid0IGhhdmUgYSBwYXJ0eSBuYW1lLCB1bmxlc3MgdGhlIGluc3RhbmNlIGlzIGZvciBjYXNlLWxldmVsIGZsYWdzICh0aGlzXG4gICAgLy8gaXMgZXhwZWN0ZWQgbm90IHRvIGhhdmUgYSBwYXJ0eSBuYW1lKVxuICAgIGlmICh0aGlzLmZsYWdzRGF0YSkge1xuICAgICAgdGhpcy5maWx0ZXJlZEZsYWdzRGF0YSA9XG4gICAgICAgIHRoaXMuZmxhZ3NEYXRhLmZpbHRlcihmID0+IGYuZmxhZ3MucGFydHlOYW1lICE9PSBudWxsIHx8IGYucGF0aFRvRmxhZ3NGb3JtR3JvdXAgPT09IHRoaXMuY2FzZUxldmVsQ2FzZUZsYWdzRmllbGRJZCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGEgRm9ybUNvbnRyb2wgZm9yIHRoZSBzZWxlY3RlZCBmbGFnIGxvY2F0aW9uIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSBmbGFncyBpbnN0YW5jZSByZW1haW5pbmcgYWZ0ZXIgZmlsdGVyaW5nXG4gICAgaWYgKHRoaXMuZmlsdGVyZWRGbGFnc0RhdGEgJiYgdGhpcy5maWx0ZXJlZEZsYWdzRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKHRoaXMuc2VsZWN0ZWRMb2NhdGlvbkNvbnRyb2xOYW1lLCBuZXcgRm9ybUNvbnRyb2wobnVsbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyBmaWx0ZXJlZCBmbGFncyBpbnN0YW5jZXMgbWVhbiB0aGVyZSBhcmUgbm8gcGFydGllcyB0byBzZWxlY3QgZnJvbS4gVGhlIGNhc2UgaGFzIG5vdCBiZWVuIGNvbmZpZ3VyZWQgcHJvcGVybHlcbiAgICAgIC8vIGZvciBjYXNlIGZsYWdzIGFuZCB0aGUgdXNlciBjYW5ub3QgcHJvY2VlZCB3aXRoIGZsYWcgY3JlYXRpb24uIChXaWxsIG5lZWQgdG8gYmUgZXh0ZW5kZWQgdG8gY2hlY2sgZm9yIGNhc2UtbGV2ZWxcbiAgICAgIC8vIGZsYWdzIGluIGZ1dHVyZSlcbiAgICAgIHRoaXMub25DYXNlRmxhZ3NDb25maWdFcnJvcigpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbk5leHQoKTogdm9pZCB7XG4gICAgLy8gVmFsaWRhdGUgZmxhZyBsb2NhdGlvbiBzZWxlY3Rpb25cbiAgICB0aGlzLnZhbGlkYXRlU2VsZWN0aW9uKCk7XG4gICAgLy8gUmV0dXJuIGNhc2UgZmxhZyBmaWVsZCBzdGF0ZSwgZXJyb3IgbWVzc2FnZXMsIGFuZCBzZWxlY3RlZCBGbGFnc1dpdGhGb3JtR3JvdXBQYXRoIGluc3RhbmNlIChpLmUuIGZsYWcgbG9jYXRpb24pIHRvXG4gICAgLy8gdGhlIHBhcmVudFxuICAgIHRoaXMuY2FzZUZsYWdTdGF0ZUVtaXR0ZXIuZW1pdCh7XG4gICAgICBjdXJyZW50Q2FzZUZsYWdGaWVsZFN0YXRlOiBDYXNlRmxhZ0ZpZWxkU3RhdGUuRkxBR19MT0NBVElPTixcbiAgICAgIGVycm9yTWVzc2FnZXM6IHRoaXMuZXJyb3JNZXNzYWdlcyxcbiAgICAgIHNlbGVjdGVkRmxhZ3NMb2NhdGlvbjogdGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMuc2VsZWN0ZWRMb2NhdGlvbkNvbnRyb2xOYW1lKS52YWx1ZVxuICAgICAgICA/IHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLnNlbGVjdGVkTG9jYXRpb25Db250cm9sTmFtZSkudmFsdWUgYXMgRmxhZ3NXaXRoRm9ybUdyb3VwUGF0aFxuICAgICAgICA6IG51bGxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGVTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5mbGFnTG9jYXRpb25Ob3RTZWxlY3RlZEVycm9yTWVzc2FnZSA9IG51bGw7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gW107XG4gICAgaWYgKCF0aGlzLmZvcm1Hcm91cC5nZXQodGhpcy5zZWxlY3RlZExvY2F0aW9uQ29udHJvbE5hbWUpLnZhbHVlKSB7XG4gICAgICB0aGlzLmZsYWdMb2NhdGlvbk5vdFNlbGVjdGVkRXJyb3JNZXNzYWdlID0gU2VsZWN0RmxhZ0xvY2F0aW9uRXJyb3JNZXNzYWdlLkZMQUdfTE9DQVRJT05fTk9UX1NFTEVDVEVEO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzLnB1c2goe1xuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBTZWxlY3RGbGFnTG9jYXRpb25FcnJvck1lc3NhZ2UuRkxBR19MT0NBVElPTl9OT1RfU0VMRUNURUQsXG4gICAgICAgIGZpZWxkSWQ6ICdjb25kaXRpb25hbC1yYWRpb3MtbGlzdCdcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25DYXNlRmxhZ3NDb25maWdFcnJvcigpOiB2b2lkIHtcbiAgICAvLyBTZXQgZXJyb3IgZmxhZyBvbiBjb21wb25lbnQgdG8gcmVtb3ZlIHRoZSBcIk5leHRcIiBidXR0b24gKHVzZXIgY2Fubm90IHByb2NlZWQgd2l0aCBmbGFnIGNyZWF0aW9uKVxuICAgIHRoaXMuY2FzZUZsYWdzQ29uZmlnRXJyb3IgPSB0cnVlO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IFtdO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlcy5wdXNoKFxuICAgICAgeyB0aXRsZTogJycsIGRlc2NyaXB0aW9uOiBTZWxlY3RGbGFnTG9jYXRpb25FcnJvck1lc3NhZ2UuRkxBR1NfTk9UX0NPTkZJR1VSRUQsIGZpZWxkSWQ6ICdjb25kaXRpb25hbC1yYWRpb3MtbGlzdCcgfSk7XG4gICAgLy8gUmV0dXJuIGNhc2UgZmxhZyBmaWVsZCBzdGF0ZSBhbmQgZXJyb3IgbWVzc2FnZXMgdG8gdGhlIHBhcmVudFxuICAgIHRoaXMuY2FzZUZsYWdTdGF0ZUVtaXR0ZXIuZW1pdCh7IGN1cnJlbnRDYXNlRmxhZ0ZpZWxkU3RhdGU6IENhc2VGbGFnRmllbGRTdGF0ZS5GTEFHX1RZUEUsIGVycm9yTWVzc2FnZXM6IHRoaXMuZXJyb3JNZXNzYWdlcyB9KTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiIFtuZ0NsYXNzXT1cInsnZm9ybS1ncm91cC1lcnJvcic6IGVycm9yTWVzc2FnZXMubGVuZ3RoID4gMH1cIj5cbiAgICA8ZmllbGRzZXQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJmbGFnLWxvY2F0aW9uLWhlYWRpbmdcIj5cbiAgICAgIDxsZWdlbmQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldF9fbGVnZW5kIGdvdnVrLWZpZWxkc2V0X19sZWdlbmQtLWxcIj5cbiAgICAgICAgPGgxIGlkPVwiZmxhZy1sb2NhdGlvbi1oZWFkaW5nXCIgY2xhc3M9XCJnb3Z1ay1maWVsZHNldF9faGVhZGluZ1wiPlxuICAgICAgICAgIHt7ZmxhZ0xvY2F0aW9uVGl0bGUgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgICA8L2gxPlxuICAgICAgPC9sZWdlbmQ+XG4gICAgICA8ZGl2IGlkPVwiZmxhZy1sb2NhdGlvbi1ub3Qtc2VsZWN0ZWQtZXJyb3ItbWVzc2FnZVwiIGNsYXNzPVwiZ292dWstZXJyb3ItbWVzc2FnZVwiXG4gICAgICAgICpuZ0lmPVwiZmxhZ0xvY2F0aW9uTm90U2VsZWN0ZWRFcnJvck1lc3NhZ2VcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay12aXN1YWxseS1oaWRkZW5cIj57eydFcnJvcjonIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+IHt7ZmxhZ0xvY2F0aW9uTm90U2VsZWN0ZWRFcnJvck1lc3NhZ2UgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zIGdvdnVrLXJhZGlvcy0tY29uZGl0aW9uYWxcIiBkYXRhLW1vZHVsZT1cImdvdnVrLXJhZGlvc1wiIGlkPVwiY29uZGl0aW9uYWwtcmFkaW9zLWxpc3RcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19faXRlbVwiICpuZ0Zvcj1cImxldCBmbGFnc0luc3RhbmNlIG9mIGZpbHRlcmVkRmxhZ3NEYXRhOyBpbmRleCBhcyBpXCI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstcmFkaW9zX19pbnB1dFwiIGlkPVwiZmxhZy1sb2NhdGlvbi17e2l9fVwiIFtuYW1lXT1cInNlbGVjdGVkTG9jYXRpb25Db250cm9sTmFtZVwiXG4gICAgICAgICAgICB0eXBlPVwicmFkaW9cIiBbdmFsdWVdPVwiZmxhZ3NJbnN0YW5jZVwiIFtmb3JtQ29udHJvbE5hbWVdPVwic2VsZWN0ZWRMb2NhdGlvbkNvbnRyb2xOYW1lXCIvPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLXJhZGlvc19fbGFiZWxcIiBmb3I9XCJmbGFnLWxvY2F0aW9uLXt7aX19XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZmxhZ3NJbnN0YW5jZS5mbGFncy5wYXJ0eU5hbWVcIj5cbiAgICAgICAgICAgICAge3tmbGFnc0luc3RhbmNlLmZsYWdzLnBhcnR5TmFtZX19XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJmbGFnc0luc3RhbmNlLmZsYWdzLnJvbGVPbkNhc2VcIj5cbiAgICAgICAgICAgICAgICAoe3tmbGFnc0luc3RhbmNlLmZsYWdzLnJvbGVPbkNhc2UgfCBycHhUcmFuc2xhdGV9fSlcbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZmxhZ3NJbnN0YW5jZS5mbGFncy5wYXJ0eU5hbWVcIj5cbiAgICAgICAgICAgICAge3tjYXNlTGV2ZWxGbGFnTGFiZWwgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2ZpZWxkc2V0PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG48ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCIgKm5nSWY9XCIhY2FzZUZsYWdzQ29uZmlnRXJyb3JcIj5cbiAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwib25OZXh0KClcIj57eydOZXh0JyB8IHJweFRyYW5zbGF0ZX19PC9idXR0b24+XG48L2Rpdj5cbiJdfQ==