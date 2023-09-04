import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Constants } from '../../../commons/constants';
import { CaseFlagRefdataService, FieldsUtils, FormValidatorsService, JurisdictionService, SessionStorageService } from '../../../services';
import { WriteComplexFieldComponent } from '../complex/write-complex-field.component';
import { IsCompoundPipe } from '../utils/is-compound.pipe';
import * as i0 from "@angular/core";
import * as i1 from "../../../services";
import * as i2 from "../utils/is-compound.pipe";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/material/autocomplete";
import * as i6 from "@angular/material/core";
import * as i7 from "../utils/field-label.pipe";
import * as i8 from "../utils/first-error.pipe";
function WriteJudicialUserFieldComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdFieldLabel");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, ctx_r0.caseField), " ");
} }
function WriteJudicialUserFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.caseField.hint_text, " ");
} }
function WriteJudicialUserFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 12);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 1, ctx_r2.errors, ctx_r2.caseField.label), " ");
} }
const _c0 = function (a0) { return { "hide-autocomplete": a0 }; };
function WriteJudicialUserFieldComponent_mat_option_8_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-option", 13);
    i0.ɵɵlistener("onSelectionChange", function WriteJudicialUserFieldComponent_mat_option_8_Template_mat_option_onSelectionChange_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r8.onSelectionChange($event)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const judicialUser_r7 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c0, !ctx_r4.showAutocomplete))("value", judicialUser_r7);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2(" ", (judicialUser_r7 == null ? null : judicialUser_r7.fullName) ? judicialUser_r7.fullName : "", "", (judicialUser_r7 == null ? null : judicialUser_r7.emailId) ? " (" + judicialUser_r7.emailId + ")" : "", " ");
} }
function WriteJudicialUserFieldComponent_mat_option_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 14);
    i0.ɵɵtext(1, " No results found ");
    i0.ɵɵelementEnd();
} }
function WriteJudicialUserFieldComponent_mat_option_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 14);
    i0.ɵɵtext(1, " Invalid search term ");
    i0.ɵɵelementEnd();
} }
const _c1 = function (a0) { return { "form-group-error": a0 }; };
export class WriteJudicialUserFieldComponent extends WriteComplexFieldComponent {
    constructor(jurisdictionService, sessionStorageService, caseFlagRefDataService, compoundPipe, validatorsService) {
        super(compoundPipe, validatorsService);
        this.jurisdictionService = jurisdictionService;
        this.sessionStorageService = sessionStorageService;
        this.caseFlagRefDataService = caseFlagRefDataService;
        this.compoundPipe = compoundPipe;
        this.validatorsService = validatorsService;
        this.minSearchCharacters = 2;
        this.showAutocomplete = false;
        this.searchTerm = '';
        this.noResults = false;
        this.invalidSearchTerm = false;
        this.judicialUserSelected = false;
    }
    ngOnInit() {
        super.ngOnInit();
        this.judicialUserControl = new FormControl(this.caseField.value);
        // FormControl needs to be added to the main UntypedFormGroup so it can be picked up by the PageValidationService when
        // checking if the page is valid. formGroup.setControl() is used here to ensure any existing JudicialUser
        // FormControl is replaced when the component is re-initialised, for example, if the user navigates away then
        // back to the page containing the JudicialUser field
        this.formGroup.setControl(`${this.caseField.id}_judicialUserControl`, this.judicialUserControl);
        // Ensure that this FormControl has links to the JudicialUser case field and this component
        FieldsUtils.addCaseFieldAndComponentReferences(this.judicialUserControl, this.caseField, this);
        this.setupValidation();
        this.setJurisdictionAndCaseType();
        this.filteredJudicialUsers$ = this.judicialUserControl.valueChanges.pipe(tap(() => this.showAutocomplete = false), debounceTime(300), 
        // Need to check type of input because it changes to object (i.e. JudicialUser) when a value is selected from the
        // autocomplete panel, instead of string when a value is being typed in
        map(input => typeof input === 'string' ? input : input?.fullName), tap(searchTerm => {
            this.searchTerm = searchTerm;
            this.invalidSearchTerm = false;
        }), filter((searchTerm) => searchTerm && searchTerm.length > this.minSearchCharacters), switchMap((searchTerm) => this.filterJudicialUsers(searchTerm).pipe(tap((judicialUsers) => {
            this.showAutocomplete = true;
            this.noResults = !this.invalidSearchTerm && judicialUsers.length === 0;
        }))));
        if (this.caseField.value?.personalCode) {
            this.loadJudicialUser(this.caseField.value.personalCode);
        }
    }
    filterJudicialUsers(searchTerm) {
        return this.caseFlagRefDataService.getHmctsServiceDetailsByCaseType(this.caseType).pipe(
        // If an error occurs retrieving HMCTS service details by case type ID, try by service name instead
        catchError(_ => this.caseFlagRefDataService.getHmctsServiceDetailsByServiceName(this.jurisdiction)), 
        // Use switchMap to return an inner Observable of the judicial users data, having received the service details
        // including service_code. This avoids having nested `subscribe`s, which is an anti-pattern!
        switchMap(serviceDetails => {
            return this.jurisdictionService.searchJudicialUsers(searchTerm, serviceDetails[0].service_code).pipe(
            // Handle any errors here rather than outside of the function, so that the outer Observable is kept live
            catchError(_ => {
                this.invalidSearchTerm = true;
                return of(undefined);
            }));
        }));
    }
    loadJudicialUser(personalCode) {
        if (personalCode) {
            this.jurisdictionService.searchJudicialUsersByPersonalCodes([personalCode]).pipe(take(1)).subscribe(judicialUsers => {
                this.judicialUserControl.setValue(judicialUsers[0]);
            });
        }
    }
    setJurisdictionAndCaseType() {
        const caseInfoStr = this.sessionStorageService.getItem('caseInfo');
        if (caseInfoStr) {
            const caseInfo = JSON.parse(caseInfoStr);
            this.jurisdiction = caseInfo?.jurisdiction;
            this.caseType = caseInfo?.caseType;
        }
    }
    displayJudicialUser(judicialUser) {
        return judicialUser
            ? `${judicialUser.fullName ? judicialUser.fullName : ''}${judicialUser.emailId ? ` (${judicialUser.emailId})` : ''}`
            : undefined;
    }
    onSelectionChange(event) {
        // The event.source.value property is a JudicialUserModel object instance; use this to update both the caseField
        // value and the values of the two FormControls for the idamId and personalCode properties of the JudicialUser
        // complex field type (these values will appear in the data payload for validation and submission)
        this.caseField.value = {
            idamId: event.source.value.idamId,
            personalCode: event.source.value.personalCode
        };
        this.complexGroup.get('idamId')?.setValue(this.caseField.value.idamId);
        this.complexGroup.get('personalCode')?.setValue(this.caseField.value.personalCode);
        this.judicialUserSelected = true;
    }
    onBlur(event) {
        // If the user types into the JudicialUser field but doesn't select a value from the autocomplete list, reset the
        // FormControl value to null to ensure it fails validation (can check the event.relatedTarget property)
        if (event.relatedTarget?.role !== 'option' && !this.judicialUserSelected) {
            // If relatedTarget.role is not "option", it means the user didn't select a value
            this.judicialUserControl.setValue(null);
        }
        if (!this.judicialUserControl.value) {
            // If the user deletes the field value, set the caseField value and the values of the two FormControls for
            // idamId and personalCode to null. This is to avoid judicial user data being present in the data payload
            // unintentionally
            this.caseField.value = null;
            this.complexGroup.get('idamId')?.setValue(null);
            this.complexGroup.get('personalCode')?.setValue(null);
        }
    }
    setupValidation() {
        // Need to remove validators from the two FormControls, idamId and personalCode, for the JudicialUser complex
        // field type. This prevents these hidden fields being listed in an error message if there are validation errors
        this.complexGroup.get('idamId').clearValidators();
        this.complexGroup.get('personalCode').clearValidators();
        if (this.caseField.display_context === Constants.MANDATORY) {
            this.judicialUserControl.setValidators(Validators.required);
        }
    }
}
WriteJudicialUserFieldComponent.ɵfac = function WriteJudicialUserFieldComponent_Factory(t) { return new (t || WriteJudicialUserFieldComponent)(i0.ɵɵdirectiveInject(i1.JurisdictionService), i0.ɵɵdirectiveInject(i1.SessionStorageService), i0.ɵɵdirectiveInject(i1.CaseFlagRefdataService), i0.ɵɵdirectiveInject(i2.IsCompoundPipe), i0.ɵɵdirectiveInject(i1.FormValidatorsService)); };
WriteJudicialUserFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteJudicialUserFieldComponent, selectors: [["ccd-write-judicial-user-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 12, vars: 17, consts: [[1, "form-group", 3, "formGroup", "ngClass"], [3, "for"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [1, "form-control", "bottom-30", 3, "id", "formControl", "matAutocomplete", "blur"], ["autoActiveFirstOption", "", 3, "displayWith"], ["autoComplete", "matAutocomplete"], ["class", "select-option", 3, "ngClass", "value", "onSelectionChange", 4, "ngFor", "ngForOf"], ["class", "select-option", "disabled", "", 4, "ngIf"], [1, "form-label"], [1, "form-hint"], [1, "error-message"], [1, "select-option", 3, "ngClass", "value", "onSelectionChange"], ["disabled", "", 1, "select-option"]], template: function WriteJudicialUserFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "label", 1);
        i0.ɵɵtemplate(2, WriteJudicialUserFieldComponent_span_2_Template, 3, 3, "span", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, WriteJudicialUserFieldComponent_span_3_Template, 2, 1, "span", 3);
        i0.ɵɵtemplate(4, WriteJudicialUserFieldComponent_span_4_Template, 3, 4, "span", 4);
        i0.ɵɵelementStart(5, "input", 5);
        i0.ɵɵlistener("blur", function WriteJudicialUserFieldComponent_Template_input_blur_5_listener($event) { return ctx.onBlur($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "mat-autocomplete", 6, 7);
        i0.ɵɵtemplate(8, WriteJudicialUserFieldComponent_mat_option_8_Template, 2, 6, "mat-option", 8);
        i0.ɵɵpipe(9, "async");
        i0.ɵɵtemplate(10, WriteJudicialUserFieldComponent_mat_option_10_Template, 2, 0, "mat-option", 9);
        i0.ɵɵtemplate(11, WriteJudicialUserFieldComponent_mat_option_11_Template, 2, 0, "mat-option", 9);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        const _r3 = i0.ɵɵreference(7);
        i0.ɵɵproperty("formGroup", ctx.formGroup)("ngClass", i0.ɵɵpureFunction1(15, _c1, !!ctx.judicialUserControl && ctx.errors));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("for", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.errors);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("id", ctx.id())("formControl", ctx.judicialUserControl)("matAutocomplete", _r3);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("displayWith", ctx.displayJudicialUser);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(9, 13, ctx.filteredJudicialUsers$));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.noResults && ctx.searchTerm && ctx.searchTerm.length > ctx.minSearchCharacters && ctx.showAutocomplete);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.invalidSearchTerm);
    } }, dependencies: [i3.NgClass, i3.NgForOf, i3.NgIf, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgControlStatusGroup, i4.FormControlDirective, i4.FormGroupDirective, i5.MatAutocomplete, i6.MatOption, i5.MatAutocompleteTrigger, i3.AsyncPipe, i7.FieldLabelPipe, i8.FirstErrorPipe], styles: [".mat-option[_ngcontent-%COMP%]:hover{background:#2596be}.mat-option.select-option[_ngcontent-%COMP%]:hover{background:#1d70b8;color:#fff}.hide-autocomplete[_ngcontent-%COMP%]{display:none}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteJudicialUserFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-judicial-user-field', template: "<div class=\"form-group\" [formGroup]=\"formGroup\" [ngClass]=\"{'form-group-error': !!judicialUserControl && errors}\">\n  <label [for]=\"id()\">\n    <span *ngIf=\"caseField.label\" class=\"form-label\">\n      {{caseField | ccdFieldLabel}}\n    </span>\n  </label>\n  <span *ngIf=\"caseField.hint_text\" class=\"form-hint\">\n    {{caseField.hint_text}}\n  </span>\n  <span class=\"error-message\" *ngIf=\"errors\">\n    {{errors | ccdFirstError:caseField.label}}\n  </span>\n  <input class=\"form-control bottom-30\" [id]=\"id()\"\n    [formControl]=\"judicialUserControl\" [matAutocomplete]=\"autoComplete\" (blur)=\"onBlur($event)\">\n  <mat-autocomplete autoActiveFirstOption #autoComplete=\"matAutocomplete\" [displayWith]=\"displayJudicialUser\">\n    <mat-option *ngFor=\"let judicialUser of filteredJudicialUsers$ | async\"\n      class=\"select-option\" [ngClass]=\"{'hide-autocomplete': !showAutocomplete}\"\n      [value]=\"judicialUser\" (onSelectionChange)=\"onSelectionChange($event)\">\n      {{judicialUser?.fullName ? judicialUser.fullName : ''}}{{judicialUser?.emailId ? ' (' + judicialUser.emailId + ')' : ''}}\n    </mat-option>\n    <mat-option *ngIf=\"noResults && searchTerm && searchTerm.length > minSearchCharacters && showAutocomplete\" class=\"select-option\" disabled>\n      No results found\n    </mat-option>\n    <mat-option *ngIf=\"invalidSearchTerm\" class=\"select-option\" disabled>\n      Invalid search term\n    </mat-option>\n  </mat-autocomplete>\n</div>\n", styles: [".mat-option:hover{background:#2596be}.mat-option.select-option:hover{background:#1d70b8;color:#fff}.hide-autocomplete{display:none}\n"] }]
    }], function () { return [{ type: i1.JurisdictionService }, { type: i1.SessionStorageService }, { type: i1.CaseFlagRefdataService }, { type: i2.IsCompoundPipe }, { type: i1.FormValidatorsService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtanVkaWNpYWwtdXNlci1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9qdWRpY2lhbC11c2VyL3dyaXRlLWp1ZGljaWFsLXVzZXItZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvanVkaWNpYWwtdXNlci93cml0ZS1qdWRpY2lhbC11c2VyLWZpZWxkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFtQixXQUFXLEVBQW9CLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVGLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDM0ksT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7Ozs7OztJQ052RCxnQ0FBaUQ7SUFDL0MsWUFDRjs7SUFBQSxp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N0csZ0hBQWdIO1FBQ2hILElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEtBQUssU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUMxRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7OzhHQTdJVSwrQkFBK0I7a0ZBQS9CLCtCQUErQjtRQ2Y1Qyw4QkFBa0gsZUFBQTtRQUU5RyxrRkFFTztRQUNULGlCQUFRO1FBQ1Isa0ZBRU87UUFDUCxrRkFFTztRQUNQLGdDQUMrRjtRQUF4QiwrR0FBUSxrQkFBYyxJQUFDO1FBRDlGLGlCQUMrRjtRQUMvRiw4Q0FBNEc7UUFDMUcsOEZBSWE7O1FBQ2IsZ0dBRWE7UUFDYixnR0FFYTtRQUNmLGlCQUFtQixFQUFBOzs7UUExQkcseUNBQXVCLGlGQUFBO1FBQ3RDLGVBQVk7UUFBWiw4QkFBWTtRQUNWLGVBQXFCO1FBQXJCLDBDQUFxQjtRQUl2QixlQUF5QjtRQUF6Qiw4Q0FBeUI7UUFHSCxlQUFZO1FBQVosaUNBQVk7UUFHSCxlQUFXO1FBQVgsNkJBQVcsd0NBQUEsd0JBQUE7UUFFdUIsZUFBbUM7UUFBbkMscURBQW1DO1FBQ3BFLGVBQWlDO1FBQWpDLDJFQUFpQztRQUt6RCxlQUE0RjtRQUE1RixpSUFBNEY7UUFHNUYsZUFBdUI7UUFBdkIsNENBQXVCOzt1RkRSM0IsK0JBQStCO2NBTDNDLFNBQVM7MkJBQ0UsK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRpb25FcnJvcnMsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lLCBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi8uLi8uLi9jb21tb25zL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBKdWRpY2lhbFVzZXJNb2RlbCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9qdXJpc2RpY3Rpb24nO1xuaW1wb3J0IHsgQ2FzZUZsYWdSZWZkYXRhU2VydmljZSwgRmllbGRzVXRpbHMsIEZvcm1WYWxpZGF0b3JzU2VydmljZSwgSnVyaXNkaWN0aW9uU2VydmljZSwgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHsgV3JpdGVDb21wbGV4RmllbGRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wbGV4L3dyaXRlLWNvbXBsZXgtZmllbGQuY29tcG9uZW50JztcbmltcG9ydCB7IElzQ29tcG91bmRQaXBlIH0gZnJvbSAnLi4vdXRpbHMvaXMtY29tcG91bmQucGlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC13cml0ZS1qdWRpY2lhbC11c2VyLWZpZWxkJyxcbiAgc3R5bGVVcmxzOiBbJy4vd3JpdGUtanVkaWNpYWwtdXNlci1maWVsZC5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJy4vd3JpdGUtanVkaWNpYWwtdXNlci1maWVsZC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgV3JpdGVKdWRpY2lhbFVzZXJGaWVsZENvbXBvbmVudCBleHRlbmRzIFdyaXRlQ29tcGxleEZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgcmVhZG9ubHkgbWluU2VhcmNoQ2hhcmFjdGVycyA9IDI7XG5cbiAgcHVibGljIGp1ZGljaWFsVXNlckNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcbiAgcHVibGljIGp1cmlzZGljdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgY2FzZVR5cGU6IHN0cmluZztcbiAgcHVibGljIHNob3dBdXRvY29tcGxldGUgPSBmYWxzZTtcbiAgcHVibGljIGZpbHRlcmVkSnVkaWNpYWxVc2VycyQ6IE9ic2VydmFibGU8SnVkaWNpYWxVc2VyTW9kZWxbXT47XG4gIHB1YmxpYyBzZWFyY2hUZXJtID0gJyc7XG4gIHB1YmxpYyBub1Jlc3VsdHMgPSBmYWxzZTtcbiAgcHVibGljIGVycm9yczogVmFsaWRhdGlvbkVycm9ycztcbiAgcHVibGljIGludmFsaWRTZWFyY2hUZXJtID0gZmFsc2U7XG4gIHB1YmxpYyBqdWRpY2lhbFVzZXJTZWxlY3RlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkganVyaXNkaWN0aW9uU2VydmljZTogSnVyaXNkaWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlc3Npb25TdG9yYWdlU2VydmljZTogU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FzZUZsYWdSZWZEYXRhU2VydmljZTogQ2FzZUZsYWdSZWZkYXRhU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbXBvdW5kUGlwZTogSXNDb21wb3VuZFBpcGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSB2YWxpZGF0b3JzU2VydmljZTogRm9ybVZhbGlkYXRvcnNTZXJ2aWNlKSB7XG4gICAgc3VwZXIoY29tcG91bmRQaXBlLCB2YWxpZGF0b3JzU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB0aGlzLmp1ZGljaWFsVXNlckNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodGhpcy5jYXNlRmllbGQudmFsdWUpO1xuICAgIC8vIEZvcm1Db250cm9sIG5lZWRzIHRvIGJlIGFkZGVkIHRvIHRoZSBtYWluIFVudHlwZWRGb3JtR3JvdXAgc28gaXQgY2FuIGJlIHBpY2tlZCB1cCBieSB0aGUgUGFnZVZhbGlkYXRpb25TZXJ2aWNlIHdoZW5cbiAgICAvLyBjaGVja2luZyBpZiB0aGUgcGFnZSBpcyB2YWxpZC4gZm9ybUdyb3VwLnNldENvbnRyb2woKSBpcyB1c2VkIGhlcmUgdG8gZW5zdXJlIGFueSBleGlzdGluZyBKdWRpY2lhbFVzZXJcbiAgICAvLyBGb3JtQ29udHJvbCBpcyByZXBsYWNlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgcmUtaW5pdGlhbGlzZWQsIGZvciBleGFtcGxlLCBpZiB0aGUgdXNlciBuYXZpZ2F0ZXMgYXdheSB0aGVuXG4gICAgLy8gYmFjayB0byB0aGUgcGFnZSBjb250YWluaW5nIHRoZSBKdWRpY2lhbFVzZXIgZmllbGRcbiAgICB0aGlzLmZvcm1Hcm91cC5zZXRDb250cm9sKGAke3RoaXMuY2FzZUZpZWxkLmlkfV9qdWRpY2lhbFVzZXJDb250cm9sYCwgdGhpcy5qdWRpY2lhbFVzZXJDb250cm9sKTtcbiAgICAvLyBFbnN1cmUgdGhhdCB0aGlzIEZvcm1Db250cm9sIGhhcyBsaW5rcyB0byB0aGUgSnVkaWNpYWxVc2VyIGNhc2UgZmllbGQgYW5kIHRoaXMgY29tcG9uZW50XG4gICAgRmllbGRzVXRpbHMuYWRkQ2FzZUZpZWxkQW5kQ29tcG9uZW50UmVmZXJlbmNlcyh0aGlzLmp1ZGljaWFsVXNlckNvbnRyb2wsIHRoaXMuY2FzZUZpZWxkLCB0aGlzKTtcbiAgICB0aGlzLnNldHVwVmFsaWRhdGlvbigpO1xuXG4gICAgdGhpcy5zZXRKdXJpc2RpY3Rpb25BbmRDYXNlVHlwZSgpO1xuXG4gICAgdGhpcy5maWx0ZXJlZEp1ZGljaWFsVXNlcnMkID0gdGhpcy5qdWRpY2lhbFVzZXJDb250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgdGFwKCgpID0+IHRoaXMuc2hvd0F1dG9jb21wbGV0ZSA9IGZhbHNlKSxcbiAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgLy8gTmVlZCB0byBjaGVjayB0eXBlIG9mIGlucHV0IGJlY2F1c2UgaXQgY2hhbmdlcyB0byBvYmplY3QgKGkuZS4gSnVkaWNpYWxVc2VyKSB3aGVuIGEgdmFsdWUgaXMgc2VsZWN0ZWQgZnJvbSB0aGVcbiAgICAgIC8vIGF1dG9jb21wbGV0ZSBwYW5lbCwgaW5zdGVhZCBvZiBzdHJpbmcgd2hlbiBhIHZhbHVlIGlzIGJlaW5nIHR5cGVkIGluXG4gICAgICBtYXAoaW5wdXQgPT4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyA/IGlucHV0IDogaW5wdXQ/LmZ1bGxOYW1lKSxcbiAgICAgIHRhcChzZWFyY2hUZXJtID0+IHtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gc2VhcmNoVGVybTtcbiAgICAgICAgdGhpcy5pbnZhbGlkU2VhcmNoVGVybSA9IGZhbHNlO1xuICAgICAgfSksXG4gICAgICBmaWx0ZXIoKHNlYXJjaFRlcm06IHN0cmluZykgPT4gc2VhcmNoVGVybSAmJiBzZWFyY2hUZXJtLmxlbmd0aCA+IHRoaXMubWluU2VhcmNoQ2hhcmFjdGVycyksXG4gICAgICBzd2l0Y2hNYXAoKHNlYXJjaFRlcm06IHN0cmluZykgPT4gdGhpcy5maWx0ZXJKdWRpY2lhbFVzZXJzKHNlYXJjaFRlcm0pLnBpcGUoXG4gICAgICAgIHRhcCgoanVkaWNpYWxVc2VycykgPT4ge1xuICAgICAgICAgIHRoaXMuc2hvd0F1dG9jb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5ub1Jlc3VsdHMgPSAhdGhpcy5pbnZhbGlkU2VhcmNoVGVybSAmJiBqdWRpY2lhbFVzZXJzLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgfSlcbiAgICAgICkpXG4gICAgKTtcblxuICAgIGlmICh0aGlzLmNhc2VGaWVsZC52YWx1ZT8ucGVyc29uYWxDb2RlKSB7XG4gICAgICB0aGlzLmxvYWRKdWRpY2lhbFVzZXIodGhpcy5jYXNlRmllbGQudmFsdWUucGVyc29uYWxDb2RlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZmlsdGVySnVkaWNpYWxVc2VycyhzZWFyY2hUZXJtOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEp1ZGljaWFsVXNlck1vZGVsW10+IHtcbiAgICByZXR1cm4gdGhpcy5jYXNlRmxhZ1JlZkRhdGFTZXJ2aWNlLmdldEhtY3RzU2VydmljZURldGFpbHNCeUNhc2VUeXBlKHRoaXMuY2FzZVR5cGUpLnBpcGUoXG4gICAgICAvLyBJZiBhbiBlcnJvciBvY2N1cnMgcmV0cmlldmluZyBITUNUUyBzZXJ2aWNlIGRldGFpbHMgYnkgY2FzZSB0eXBlIElELCB0cnkgYnkgc2VydmljZSBuYW1lIGluc3RlYWRcbiAgICAgIGNhdGNoRXJyb3IoXyA9PiB0aGlzLmNhc2VGbGFnUmVmRGF0YVNlcnZpY2UuZ2V0SG1jdHNTZXJ2aWNlRGV0YWlsc0J5U2VydmljZU5hbWUodGhpcy5qdXJpc2RpY3Rpb24pKSxcbiAgICAgIC8vIFVzZSBzd2l0Y2hNYXAgdG8gcmV0dXJuIGFuIGlubmVyIE9ic2VydmFibGUgb2YgdGhlIGp1ZGljaWFsIHVzZXJzIGRhdGEsIGhhdmluZyByZWNlaXZlZCB0aGUgc2VydmljZSBkZXRhaWxzXG4gICAgICAvLyBpbmNsdWRpbmcgc2VydmljZV9jb2RlLiBUaGlzIGF2b2lkcyBoYXZpbmcgbmVzdGVkIGBzdWJzY3JpYmVgcywgd2hpY2ggaXMgYW4gYW50aS1wYXR0ZXJuIVxuICAgICAgc3dpdGNoTWFwKHNlcnZpY2VEZXRhaWxzID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuanVyaXNkaWN0aW9uU2VydmljZS5zZWFyY2hKdWRpY2lhbFVzZXJzKHNlYXJjaFRlcm0sIHNlcnZpY2VEZXRhaWxzWzBdLnNlcnZpY2VfY29kZSkucGlwZShcbiAgICAgICAgICAvLyBIYW5kbGUgYW55IGVycm9ycyBoZXJlIHJhdGhlciB0aGFuIG91dHNpZGUgb2YgdGhlIGZ1bmN0aW9uLCBzbyB0aGF0IHRoZSBvdXRlciBPYnNlcnZhYmxlIGlzIGtlcHQgbGl2ZVxuICAgICAgICAgIGNhdGNoRXJyb3IoXyA9PiB7XG4gICAgICAgICAgICB0aGlzLmludmFsaWRTZWFyY2hUZXJtID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgbG9hZEp1ZGljaWFsVXNlcihwZXJzb25hbENvZGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChwZXJzb25hbENvZGUpIHtcbiAgICAgIHRoaXMuanVyaXNkaWN0aW9uU2VydmljZS5zZWFyY2hKdWRpY2lhbFVzZXJzQnlQZXJzb25hbENvZGVzKFtwZXJzb25hbENvZGVdKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZShqdWRpY2lhbFVzZXJzID0+IHtcbiAgICAgICAgdGhpcy5qdWRpY2lhbFVzZXJDb250cm9sLnNldFZhbHVlKGp1ZGljaWFsVXNlcnNbMF0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldEp1cmlzZGljdGlvbkFuZENhc2VUeXBlKCk6IHZvaWQge1xuICAgIGNvbnN0IGNhc2VJbmZvU3RyID0gdGhpcy5zZXNzaW9uU3RvcmFnZVNlcnZpY2UuZ2V0SXRlbSgnY2FzZUluZm8nKTtcbiAgICBpZiAoY2FzZUluZm9TdHIpIHtcbiAgICAgIGNvbnN0IGNhc2VJbmZvID0gSlNPTi5wYXJzZShjYXNlSW5mb1N0cik7XG4gICAgICB0aGlzLmp1cmlzZGljdGlvbiA9IGNhc2VJbmZvPy5qdXJpc2RpY3Rpb247XG4gICAgICB0aGlzLmNhc2VUeXBlID0gY2FzZUluZm8/LmNhc2VUeXBlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkaXNwbGF5SnVkaWNpYWxVc2VyKGp1ZGljaWFsVXNlcj86IEp1ZGljaWFsVXNlck1vZGVsKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4ganVkaWNpYWxVc2VyXG4gICAgICA/IGAke2p1ZGljaWFsVXNlci5mdWxsTmFtZSA/IGp1ZGljaWFsVXNlci5mdWxsTmFtZSA6ICcnfSR7anVkaWNpYWxVc2VyLmVtYWlsSWQgPyBgICgke2p1ZGljaWFsVXNlci5lbWFpbElkfSlgIDogJyd9YFxuICAgICAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgb25TZWxlY3Rpb25DaGFuZ2UoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIC8vIFRoZSBldmVudC5zb3VyY2UudmFsdWUgcHJvcGVydHkgaXMgYSBKdWRpY2lhbFVzZXJNb2RlbCBvYmplY3QgaW5zdGFuY2U7IHVzZSB0aGlzIHRvIHVwZGF0ZSBib3RoIHRoZSBjYXNlRmllbGRcbiAgICAvLyB2YWx1ZSBhbmQgdGhlIHZhbHVlcyBvZiB0aGUgdHdvIEZvcm1Db250cm9scyBmb3IgdGhlIGlkYW1JZCBhbmQgcGVyc29uYWxDb2RlIHByb3BlcnRpZXMgb2YgdGhlIEp1ZGljaWFsVXNlclxuICAgIC8vIGNvbXBsZXggZmllbGQgdHlwZSAodGhlc2UgdmFsdWVzIHdpbGwgYXBwZWFyIGluIHRoZSBkYXRhIHBheWxvYWQgZm9yIHZhbGlkYXRpb24gYW5kIHN1Ym1pc3Npb24pXG4gICAgdGhpcy5jYXNlRmllbGQudmFsdWUgPSB7XG4gICAgICBpZGFtSWQ6IGV2ZW50LnNvdXJjZS52YWx1ZS5pZGFtSWQsXG4gICAgICBwZXJzb25hbENvZGU6IGV2ZW50LnNvdXJjZS52YWx1ZS5wZXJzb25hbENvZGVcbiAgICB9O1xuICAgIHRoaXMuY29tcGxleEdyb3VwLmdldCgnaWRhbUlkJyk/LnNldFZhbHVlKHRoaXMuY2FzZUZpZWxkLnZhbHVlLmlkYW1JZCk7XG4gICAgdGhpcy5jb21wbGV4R3JvdXAuZ2V0KCdwZXJzb25hbENvZGUnKT8uc2V0VmFsdWUodGhpcy5jYXNlRmllbGQudmFsdWUucGVyc29uYWxDb2RlKTtcbiAgICB0aGlzLmp1ZGljaWFsVXNlclNlbGVjdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBvbkJsdXIoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIC8vIElmIHRoZSB1c2VyIHR5cGVzIGludG8gdGhlIEp1ZGljaWFsVXNlciBmaWVsZCBidXQgZG9lc24ndCBzZWxlY3QgYSB2YWx1ZSBmcm9tIHRoZSBhdXRvY29tcGxldGUgbGlzdCwgcmVzZXQgdGhlXG4gICAgLy8gRm9ybUNvbnRyb2wgdmFsdWUgdG8gbnVsbCB0byBlbnN1cmUgaXQgZmFpbHMgdmFsaWRhdGlvbiAoY2FuIGNoZWNrIHRoZSBldmVudC5yZWxhdGVkVGFyZ2V0IHByb3BlcnR5KVxuICAgIGlmIChldmVudC5yZWxhdGVkVGFyZ2V0Py5yb2xlICE9PSAnb3B0aW9uJyAmJiAhdGhpcy5qdWRpY2lhbFVzZXJTZWxlY3RlZCkge1xuICAgICAgLy8gSWYgcmVsYXRlZFRhcmdldC5yb2xlIGlzIG5vdCBcIm9wdGlvblwiLCBpdCBtZWFucyB0aGUgdXNlciBkaWRuJ3Qgc2VsZWN0IGEgdmFsdWVcbiAgICAgIHRoaXMuanVkaWNpYWxVc2VyQ29udHJvbC5zZXRWYWx1ZShudWxsKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuanVkaWNpYWxVc2VyQ29udHJvbC52YWx1ZSkge1xuICAgICAgLy8gSWYgdGhlIHVzZXIgZGVsZXRlcyB0aGUgZmllbGQgdmFsdWUsIHNldCB0aGUgY2FzZUZpZWxkIHZhbHVlIGFuZCB0aGUgdmFsdWVzIG9mIHRoZSB0d28gRm9ybUNvbnRyb2xzIGZvclxuICAgICAgLy8gaWRhbUlkIGFuZCBwZXJzb25hbENvZGUgdG8gbnVsbC4gVGhpcyBpcyB0byBhdm9pZCBqdWRpY2lhbCB1c2VyIGRhdGEgYmVpbmcgcHJlc2VudCBpbiB0aGUgZGF0YSBwYXlsb2FkXG4gICAgICAvLyB1bmludGVudGlvbmFsbHlcbiAgICAgIHRoaXMuY2FzZUZpZWxkLnZhbHVlID0gbnVsbDtcbiAgICAgIHRoaXMuY29tcGxleEdyb3VwLmdldCgnaWRhbUlkJyk/LnNldFZhbHVlKG51bGwpO1xuICAgICAgdGhpcy5jb21wbGV4R3JvdXAuZ2V0KCdwZXJzb25hbENvZGUnKT8uc2V0VmFsdWUobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldHVwVmFsaWRhdGlvbigpOiB2b2lkIHtcbiAgICAvLyBOZWVkIHRvIHJlbW92ZSB2YWxpZGF0b3JzIGZyb20gdGhlIHR3byBGb3JtQ29udHJvbHMsIGlkYW1JZCBhbmQgcGVyc29uYWxDb2RlLCBmb3IgdGhlIEp1ZGljaWFsVXNlciBjb21wbGV4XG4gICAgLy8gZmllbGQgdHlwZS4gVGhpcyBwcmV2ZW50cyB0aGVzZSBoaWRkZW4gZmllbGRzIGJlaW5nIGxpc3RlZCBpbiBhbiBlcnJvciBtZXNzYWdlIGlmIHRoZXJlIGFyZSB2YWxpZGF0aW9uIGVycm9yc1xuICAgIHRoaXMuY29tcGxleEdyb3VwLmdldCgnaWRhbUlkJykuY2xlYXJWYWxpZGF0b3JzKCk7XG4gICAgdGhpcy5jb21wbGV4R3JvdXAuZ2V0KCdwZXJzb25hbENvZGUnKS5jbGVhclZhbGlkYXRvcnMoKTtcbiAgICBpZiAodGhpcy5jYXNlRmllbGQuZGlzcGxheV9jb250ZXh0ID09PSBDb25zdGFudHMuTUFOREFUT1JZKSB7XG4gICAgICB0aGlzLmp1ZGljaWFsVXNlckNvbnRyb2wuc2V0VmFsaWRhdG9ycyhWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIiBbbmdDbGFzc109XCJ7J2Zvcm0tZ3JvdXAtZXJyb3InOiAhIWp1ZGljaWFsVXNlckNvbnRyb2wgJiYgZXJyb3JzfVwiPlxuICA8bGFiZWwgW2Zvcl09XCJpZCgpXCI+XG4gICAgPHNwYW4gKm5nSWY9XCJjYXNlRmllbGQubGFiZWxcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj5cbiAgICAgIHt7Y2FzZUZpZWxkIHwgY2NkRmllbGRMYWJlbH19XG4gICAgPC9zcGFuPlxuICA8L2xhYmVsPlxuICA8c3BhbiAqbmdJZj1cImNhc2VGaWVsZC5oaW50X3RleHRcIiBjbGFzcz1cImZvcm0taGludFwiPlxuICAgIHt7Y2FzZUZpZWxkLmhpbnRfdGV4dH19XG4gIDwvc3Bhbj5cbiAgPHNwYW4gY2xhc3M9XCJlcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJlcnJvcnNcIj5cbiAgICB7e2Vycm9ycyB8IGNjZEZpcnN0RXJyb3I6Y2FzZUZpZWxkLmxhYmVsfX1cbiAgPC9zcGFuPlxuICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYm90dG9tLTMwXCIgW2lkXT1cImlkKClcIlxuICAgIFtmb3JtQ29udHJvbF09XCJqdWRpY2lhbFVzZXJDb250cm9sXCIgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvQ29tcGxldGVcIiAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiPlxuICA8bWF0LWF1dG9jb21wbGV0ZSBhdXRvQWN0aXZlRmlyc3RPcHRpb24gI2F1dG9Db21wbGV0ZT1cIm1hdEF1dG9jb21wbGV0ZVwiIFtkaXNwbGF5V2l0aF09XCJkaXNwbGF5SnVkaWNpYWxVc2VyXCI+XG4gICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGp1ZGljaWFsVXNlciBvZiBmaWx0ZXJlZEp1ZGljaWFsVXNlcnMkIHwgYXN5bmNcIlxuICAgICAgY2xhc3M9XCJzZWxlY3Qtb3B0aW9uXCIgW25nQ2xhc3NdPVwieydoaWRlLWF1dG9jb21wbGV0ZSc6ICFzaG93QXV0b2NvbXBsZXRlfVwiXG4gICAgICBbdmFsdWVdPVwianVkaWNpYWxVc2VyXCIgKG9uU2VsZWN0aW9uQ2hhbmdlKT1cIm9uU2VsZWN0aW9uQ2hhbmdlKCRldmVudClcIj5cbiAgICAgIHt7anVkaWNpYWxVc2VyPy5mdWxsTmFtZSA/IGp1ZGljaWFsVXNlci5mdWxsTmFtZSA6ICcnfX17e2p1ZGljaWFsVXNlcj8uZW1haWxJZCA/ICcgKCcgKyBqdWRpY2lhbFVzZXIuZW1haWxJZCArICcpJyA6ICcnfX1cbiAgICA8L21hdC1vcHRpb24+XG4gICAgPG1hdC1vcHRpb24gKm5nSWY9XCJub1Jlc3VsdHMgJiYgc2VhcmNoVGVybSAmJiBzZWFyY2hUZXJtLmxlbmd0aCA+IG1pblNlYXJjaENoYXJhY3RlcnMgJiYgc2hvd0F1dG9jb21wbGV0ZVwiIGNsYXNzPVwic2VsZWN0LW9wdGlvblwiIGRpc2FibGVkPlxuICAgICAgTm8gcmVzdWx0cyBmb3VuZFxuICAgIDwvbWF0LW9wdGlvbj5cbiAgICA8bWF0LW9wdGlvbiAqbmdJZj1cImludmFsaWRTZWFyY2hUZXJtXCIgY2xhc3M9XCJzZWxlY3Qtb3B0aW9uXCIgZGlzYWJsZWQ+XG4gICAgICBJbnZhbGlkIHNlYXJjaCB0ZXJtXG4gICAgPC9tYXQtb3B0aW9uPlxuICA8L21hdC1hdXRvY29tcGxldGU+XG48L2Rpdj5cbiJdfQ==