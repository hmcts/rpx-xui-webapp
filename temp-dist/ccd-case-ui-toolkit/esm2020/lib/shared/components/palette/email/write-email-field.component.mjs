import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "../utils/field-label.pipe";
import * as i4 from "../utils/first-error.pipe";
import * as i5 from "rpx-xui-translation";
function WriteEmailFieldComponent_span_2_Template(rf, ctx) { if (rf & 1) {
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
function WriteEmailFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WriteEmailFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r2.emailControl.errors, ctx_r2.caseField.label)));
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
const _c1 = function (a0) { return { "govuk-input--error": a0 }; };
export class WriteEmailFieldComponent extends AbstractFieldWriteComponent {
    ngOnInit() {
        this.emailControl = this.registerControl(new FormControl(this.caseField.value));
    }
}
WriteEmailFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteEmailFieldComponent_BaseFactory; return function WriteEmailFieldComponent_Factory(t) { return (ɵWriteEmailFieldComponent_BaseFactory || (ɵWriteEmailFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteEmailFieldComponent)))(t || WriteEmailFieldComponent); }; }();
WriteEmailFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteEmailFieldComponent, selectors: [["ccd-write-email-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 6, vars: 12, consts: [[1, "form-group", "bottom-30", 3, "ngClass"], [3, "for"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["type", "email", 1, "form-control", 3, "ngClass", "id", "formControl"], [1, "form-label"], [1, "form-hint"], [1, "error-message"]], template: function WriteEmailFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "label", 1);
        i0.ɵɵtemplate(2, WriteEmailFieldComponent_span_2_Template, 4, 5, "span", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, WriteEmailFieldComponent_span_3_Template, 3, 3, "span", 3);
        i0.ɵɵtemplate(4, WriteEmailFieldComponent_span_4_Template, 4, 6, "span", 4);
        i0.ɵɵelement(5, "input", 5);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c0, !ctx.emailControl.valid && (ctx.emailControl.dirty || ctx.emailControl.touched)));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("for", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.emailControl.errors && (ctx.emailControl.dirty || ctx.emailControl.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c1, ctx.emailControl.errors && (ctx.emailControl.dirty || ctx.emailControl.touched)))("id", ctx.id())("formControl", ctx.emailControl);
    } }, dependencies: [i1.NgClass, i1.NgIf, i2.DefaultValueAccessor, i2.NgControlStatus, i2.FormControlDirective, i3.FieldLabelPipe, i4.FirstErrorPipe, i5.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteEmailFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-email-field', template: "<div class=\"form-group bottom-30\" [ngClass]=\"{'form-group-error': !emailControl.valid && (emailControl.dirty || emailControl.touched)}\">\n\n  <label [for]=\"id()\">\n    <span class=\"form-label\" *ngIf=\"caseField.label\">{{(caseField | ccdFieldLabel) | rpxTranslate}}</span>\n  </label>\n  <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate}}</span>\n  <span class=\"error-message\" *ngIf=\"emailControl.errors && (emailControl.dirty || emailControl.touched)\">{{(emailControl.errors | ccdFirstError:caseField.label) | rpxTranslate}}</span>\n\n  <input class=\"form-control\" [ngClass]=\"{'govuk-input--error': emailControl.errors && (emailControl.dirty || emailControl.touched)}\"\n    [id]=\"id()\" type=\"email\" [formControl]=\"emailControl\">\n\n</div>\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtZW1haWwtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZW1haWwvd3JpdGUtZW1haWwtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZW1haWwvd3JpdGUtZW1haWwtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQzs7Ozs7Ozs7SUNDdkYsK0JBQWlEO0lBQUEsWUFBOEM7OztJQUFBLGlCQUFPOzs7SUFBckQsZUFBOEM7SUFBOUMsa0ZBQThDOzs7SUFFakcsK0JBQW9EO0lBQUEsWUFBc0M7O0lBQUEsaUJBQU87OztJQUE3QyxlQUFzQztJQUF0QyxzRUFBc0M7OztJQUMxRiwrQkFBd0c7SUFBQSxZQUF3RTs7O0lBQUEsaUJBQU87OztJQUEvRSxlQUF3RTtJQUF4RSxvSEFBd0U7Ozs7QURFbEwsTUFBTSxPQUFPLHdCQUF5QixTQUFRLDJCQUEyQjtJQUloRSxRQUFRO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQWdCLENBQUM7SUFDakcsQ0FBQzs7Z1JBTlUsd0JBQXdCLFNBQXhCLHdCQUF3QjsyRUFBeEIsd0JBQXdCO1FDUnJDLDhCQUF3SSxlQUFBO1FBR3BJLDJFQUFzRztRQUN4RyxpQkFBUTtRQUNSLDJFQUFpRztRQUNqRywyRUFBdUw7UUFFdkwsMkJBQ3dEO1FBRTFELGlCQUFNOztRQVg0QixxSUFBcUc7UUFFOUgsZUFBWTtRQUFaLDhCQUFZO1FBQ1MsZUFBcUI7UUFBckIsMENBQXFCO1FBRXhCLGVBQXlCO1FBQXpCLDhDQUF5QjtRQUNyQixlQUF5RTtRQUF6RSxzR0FBeUU7UUFFMUUsZUFBdUc7UUFBdkcsc0lBQXVHLGdCQUFBLGlDQUFBOzt1RkRBeEgsd0JBQXdCO2NBSnBDLFNBQVM7MkJBQ0UsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC13cml0ZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2Qtd3JpdGUtZW1haWwtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJ3dyaXRlLWVtYWlsLWZpZWxkLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFdyaXRlRW1haWxGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIGVtYWlsQ29udHJvbDogRm9ybUNvbnRyb2w7XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZW1haWxDb250cm9sID0gdGhpcy5yZWdpc3RlckNvbnRyb2wobmV3IEZvcm1Db250cm9sKHRoaXMuY2FzZUZpZWxkLnZhbHVlKSkgYXMgRm9ybUNvbnRyb2w7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJvdHRvbS0zMFwiIFtuZ0NsYXNzXT1cInsnZm9ybS1ncm91cC1lcnJvcic6ICFlbWFpbENvbnRyb2wudmFsaWQgJiYgKGVtYWlsQ29udHJvbC5kaXJ0eSB8fCBlbWFpbENvbnRyb2wudG91Y2hlZCl9XCI+XG5cbiAgPGxhYmVsIFtmb3JdPVwiaWQoKVwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1sYWJlbFwiICpuZ0lmPVwiY2FzZUZpZWxkLmxhYmVsXCI+e3soY2FzZUZpZWxkIHwgY2NkRmllbGRMYWJlbCkgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgPC9sYWJlbD5cbiAgPHNwYW4gY2xhc3M9XCJmb3JtLWhpbnRcIiAqbmdJZj1cImNhc2VGaWVsZC5oaW50X3RleHRcIj57e2Nhc2VGaWVsZC5oaW50X3RleHQgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgPHNwYW4gY2xhc3M9XCJlcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJlbWFpbENvbnRyb2wuZXJyb3JzICYmIChlbWFpbENvbnRyb2wuZGlydHkgfHwgZW1haWxDb250cm9sLnRvdWNoZWQpXCI+e3soZW1haWxDb250cm9sLmVycm9ycyB8IGNjZEZpcnN0RXJyb3I6Y2FzZUZpZWxkLmxhYmVsKSB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuXG4gIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIFtuZ0NsYXNzXT1cInsnZ292dWstaW5wdXQtLWVycm9yJzogZW1haWxDb250cm9sLmVycm9ycyAmJiAoZW1haWxDb250cm9sLmRpcnR5IHx8IGVtYWlsQ29udHJvbC50b3VjaGVkKX1cIlxuICAgIFtpZF09XCJpZCgpXCIgdHlwZT1cImVtYWlsXCIgW2Zvcm1Db250cm9sXT1cImVtYWlsQ29udHJvbFwiPlxuXG48L2Rpdj5cbiJdfQ==