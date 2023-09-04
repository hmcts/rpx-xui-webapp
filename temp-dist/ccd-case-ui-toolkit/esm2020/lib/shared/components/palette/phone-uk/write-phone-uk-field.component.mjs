import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "../utils/field-label.pipe";
import * as i4 from "../utils/first-error.pipe";
import * as i5 from "rpx-xui-translation";
function WritePhoneUKFieldComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFieldLabel");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind1(3, 3, ctx_r0.caseField)));
} }
function WritePhoneUKFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WritePhoneUKFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r2.phoneUkControl.errors, ctx_r2.caseField.label)), " ");
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
const _c1 = function (a0) { return { "govuk-input--error": a0 }; };
export class WritePhoneUKFieldComponent extends AbstractFieldWriteComponent {
    ngOnInit() {
        this.phoneUkControl = this.registerControl(new FormControl(this.caseField.value));
    }
}
WritePhoneUKFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWritePhoneUKFieldComponent_BaseFactory; return function WritePhoneUKFieldComponent_Factory(t) { return (ɵWritePhoneUKFieldComponent_BaseFactory || (ɵWritePhoneUKFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WritePhoneUKFieldComponent)))(t || WritePhoneUKFieldComponent); }; }();
WritePhoneUKFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WritePhoneUKFieldComponent, selectors: [["ccd-write-phone-uk-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 6, vars: 12, consts: [[1, "form-group", 3, "ngClass"], [3, "for"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["type", "tel", 1, "form-control", "bottom-30", 3, "ngClass", "id", "formControl"], [1, "form-label"], [1, "form-hint"], [1, "error-message"]], template: function WritePhoneUKFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "label", 1);
        i0.ɵɵtemplate(2, WritePhoneUKFieldComponent_span_2_Template, 4, 5, "span", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, WritePhoneUKFieldComponent_span_3_Template, 3, 3, "span", 3);
        i0.ɵɵtemplate(4, WritePhoneUKFieldComponent_span_4_Template, 4, 6, "span", 4);
        i0.ɵɵelement(5, "input", 5);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c0, !ctx.phoneUkControl.valid && (ctx.phoneUkControl.dirty || ctx.phoneUkControl.touched)));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("for", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.phoneUkControl.errors && (ctx.phoneUkControl.dirty || ctx.phoneUkControl.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c1, ctx.phoneUkControl.errors && ctx.phoneUkControl.dirty))("id", ctx.id())("formControl", ctx.phoneUkControl);
    } }, dependencies: [i1.NgClass, i1.NgIf, i2.DefaultValueAccessor, i2.NgControlStatus, i2.FormControlDirective, i3.FieldLabelPipe, i4.FirstErrorPipe, i5.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WritePhoneUKFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-phone-uk-field', template: "<div class=\"form-group\" [ngClass]=\"{'form-group-error': !phoneUkControl.valid && (phoneUkControl.dirty || phoneUkControl.touched)}\">\n  <label [for]=\"id()\">\n    <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel | rpxTranslate}}</span>\n  </label>\n  <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate}}</span>\n  <span class=\"error-message\" *ngIf=\"phoneUkControl.errors && (phoneUkControl.dirty || phoneUkControl.touched)\">\n    {{ phoneUkControl.errors | ccdFirstError:caseField.label | rpxTranslate}}\n  </span>\n  <input class=\"form-control bottom-30\" [ngClass]=\"{'govuk-input--error': phoneUkControl.errors && phoneUkControl.dirty}\"\n   [id]=\"id()\" type=\"tel\" [formControl]=\"phoneUkControl\">\n</div>\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtcGhvbmUtdWstZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvcGhvbmUtdWsvd3JpdGUtcGhvbmUtdWstZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvcGhvbmUtdWsvd3JpdGUtcGhvbmUtdWstZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQzs7Ozs7Ozs7SUNBdkYsK0JBQWlEO0lBQUEsWUFBNEM7OztJQUFBLGlCQUFPOzs7SUFBbkQsZUFBNEM7SUFBNUMsa0ZBQTRDOzs7SUFFL0YsK0JBQW9EO0lBQUEsWUFBc0M7O0lBQUEsaUJBQU87OztJQUE3QyxlQUFzQztJQUF0QyxzRUFBc0M7OztJQUMxRiwrQkFBOEc7SUFDNUcsWUFDRjs7O0lBQUEsaUJBQU87OztJQURMLGVBQ0Y7SUFERSxpSUFDRjs7OztBRENGLE1BQU0sT0FBTywwQkFBMkIsU0FBUSwyQkFBMkI7SUFJbEUsUUFBUTtRQUNiLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFnQixDQUFDO0lBQ25HLENBQUM7OzBSQU5VLDBCQUEwQixTQUExQiwwQkFBMEI7NkVBQTFCLDBCQUEwQjtRQ1J2Qyw4QkFBb0ksZUFBQTtRQUVoSSw2RUFBb0c7UUFDdEcsaUJBQVE7UUFDUiw2RUFBaUc7UUFDakcsNkVBRU87UUFDUCwyQkFDdUQ7UUFDekQsaUJBQU07O1FBVmtCLDJJQUEyRztRQUMxSCxlQUFZO1FBQVosOEJBQVk7UUFDUyxlQUFxQjtRQUFyQiwwQ0FBcUI7UUFFeEIsZUFBeUI7UUFBekIsOENBQXlCO1FBQ3JCLGVBQStFO1FBQS9FLDRHQUErRTtRQUd0RSxlQUFpRjtRQUFqRiw0R0FBaUYsZ0JBQUEsbUNBQUE7O3VGREE1RywwQkFBMEI7Y0FKdEMsU0FBUzsyQkFDRSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL2Fic3RyYWN0LWZpZWxkLXdyaXRlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC13cml0ZS1waG9uZS11ay1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93cml0ZS1waG9uZS11ay1maWVsZC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBXcml0ZVBob25lVUtGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIHBob25lVWtDb250cm9sOiBGb3JtQ29udHJvbDtcblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5waG9uZVVrQ29udHJvbCA9IHRoaXMucmVnaXN0ZXJDb250cm9sKG5ldyBGb3JtQ29udHJvbCh0aGlzLmNhc2VGaWVsZC52YWx1ZSkpIGFzIEZvcm1Db250cm9sO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIFtuZ0NsYXNzXT1cInsnZm9ybS1ncm91cC1lcnJvcic6ICFwaG9uZVVrQ29udHJvbC52YWxpZCAmJiAocGhvbmVVa0NvbnRyb2wuZGlydHkgfHwgcGhvbmVVa0NvbnRyb2wudG91Y2hlZCl9XCI+XG4gIDxsYWJlbCBbZm9yXT1cImlkKClcIj5cbiAgICA8c3BhbiBjbGFzcz1cImZvcm0tbGFiZWxcIiAqbmdJZj1cImNhc2VGaWVsZC5sYWJlbFwiPnt7Y2FzZUZpZWxkIHwgY2NkRmllbGRMYWJlbCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8L2xhYmVsPlxuICA8c3BhbiBjbGFzcz1cImZvcm0taGludFwiICpuZ0lmPVwiY2FzZUZpZWxkLmhpbnRfdGV4dFwiPnt7Y2FzZUZpZWxkLmhpbnRfdGV4dCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cInBob25lVWtDb250cm9sLmVycm9ycyAmJiAocGhvbmVVa0NvbnRyb2wuZGlydHkgfHwgcGhvbmVVa0NvbnRyb2wudG91Y2hlZClcIj5cbiAgICB7eyBwaG9uZVVrQ29udHJvbC5lcnJvcnMgfCBjY2RGaXJzdEVycm9yOmNhc2VGaWVsZC5sYWJlbCB8IHJweFRyYW5zbGF0ZX19XG4gIDwvc3Bhbj5cbiAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIGJvdHRvbS0zMFwiIFtuZ0NsYXNzXT1cInsnZ292dWstaW5wdXQtLWVycm9yJzogcGhvbmVVa0NvbnRyb2wuZXJyb3JzICYmIHBob25lVWtDb250cm9sLmRpcnR5fVwiXG4gICBbaWRdPVwiaWQoKVwiIHR5cGU9XCJ0ZWxcIiBbZm9ybUNvbnRyb2xdPVwicGhvbmVVa0NvbnRyb2xcIj5cbjwvZGl2PlxuIl19