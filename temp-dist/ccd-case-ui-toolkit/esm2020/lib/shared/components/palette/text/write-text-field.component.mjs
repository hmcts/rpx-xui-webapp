import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "../utils/field-label.pipe";
import * as i4 from "../utils/first-error.pipe";
import * as i5 from "rpx-xui-translation";
function WriteTextFieldComponent_span_2_Template(rf, ctx) { if (rf & 1) {
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
function WriteTextFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WriteTextFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r2.textControl.errors, ctx_r2.caseField.label)), " ");
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
const _c1 = function (a0) { return { "govuk-input--error": a0 }; };
export class WriteTextFieldComponent extends AbstractFieldWriteComponent {
    ngOnInit() {
        this.textControl = this.registerControl(new FormControl(this.caseField.value));
    }
    onBlur($event) {
        $event.target.value = $event.target.value.trim();
    }
}
WriteTextFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteTextFieldComponent_BaseFactory; return function WriteTextFieldComponent_Factory(t) { return (ɵWriteTextFieldComponent_BaseFactory || (ɵWriteTextFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteTextFieldComponent)))(t || WriteTextFieldComponent); }; }();
WriteTextFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteTextFieldComponent, selectors: [["ccd-write-text-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 6, vars: 12, consts: [[1, "form-group", 3, "ngClass"], [3, "for"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["type", "text", 1, "form-control", "bottom-30", 3, "ngClass", "id", "formControl", "blur"], [1, "form-label"], [1, "form-hint"], [1, "error-message"]], template: function WriteTextFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "label", 1);
        i0.ɵɵtemplate(2, WriteTextFieldComponent_span_2_Template, 4, 5, "span", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, WriteTextFieldComponent_span_3_Template, 3, 3, "span", 3);
        i0.ɵɵtemplate(4, WriteTextFieldComponent_span_4_Template, 4, 6, "span", 4);
        i0.ɵɵelementStart(5, "input", 5);
        i0.ɵɵlistener("blur", function WriteTextFieldComponent_Template_input_blur_5_listener($event) { return ctx.onBlur($event); });
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c0, !!ctx.textControl && !ctx.textControl.valid && (ctx.textControl.dirty || ctx.textControl.touched)));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("for", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.textControl == null ? null : ctx.textControl.errors) && (ctx.textControl.dirty || ctx.textControl.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c1, (ctx.textControl == null ? null : ctx.textControl.errors) && (ctx.textControl.dirty || ctx.textControl.touched)))("id", ctx.id())("formControl", ctx.textControl);
    } }, dependencies: [i1.NgClass, i1.NgIf, i2.DefaultValueAccessor, i2.NgControlStatus, i2.FormControlDirective, i3.FieldLabelPipe, i4.FirstErrorPipe, i5.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteTextFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-text-field', template: "<div class=\"form-group\" [ngClass]=\"{'form-group-error': !!textControl && !textControl.valid && (textControl.dirty || textControl.touched)}\">\n  <label [for]=\"id()\">\n    <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel | rpxTranslate}}</span>\n  </label>\n  <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate}}</span>\n  <span class=\"error-message\" *ngIf=\"textControl?.errors && (textControl.dirty || textControl.touched)\">\n    {{textControl.errors | ccdFirstError:caseField.label | rpxTranslate}}\n  </span>\n  <input class=\"form-control bottom-30\" [ngClass]=\"{'govuk-input--error': textControl?.errors && (textControl.dirty || textControl.touched)}\"\n  [id]=\"id()\" type=\"text\" [formControl]=\"textControl\" (blur)=\"onBlur($event)\">\n</div>\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtdGV4dC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS90ZXh0L3dyaXRlLXRleHQtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvdGV4dC93cml0ZS10ZXh0LWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOENBQThDLENBQUM7Ozs7Ozs7O0lDQXZGLCtCQUFpRDtJQUFBLFlBQTRDOzs7SUFBQSxpQkFBTzs7O0lBQW5ELGVBQTRDO0lBQTVDLGtGQUE0Qzs7O0lBRS9GLCtCQUFvRDtJQUFBLFlBQXNDOztJQUFBLGlCQUFPOzs7SUFBN0MsZUFBc0M7SUFBdEMsc0VBQXNDOzs7SUFDMUYsK0JBQXNHO0lBQ3BHLFlBQ0Y7OztJQUFBLGlCQUFPOzs7SUFETCxlQUNGO0lBREUsOEhBQ0Y7Ozs7QURDRixNQUFNLE9BQU8sdUJBQXdCLFNBQVEsMkJBQTJCO0lBSS9ELFFBQVE7UUFDYixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBZ0IsQ0FBQztJQUNoRyxDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU07UUFDakIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEQsQ0FBQzs7MlFBVlUsdUJBQXVCLFNBQXZCLHVCQUF1QjswRUFBdkIsdUJBQXVCO1FDUnBDLDhCQUE0SSxlQUFBO1FBRXhJLDBFQUFvRztRQUN0RyxpQkFBUTtRQUNSLDBFQUFpRztRQUNqRywwRUFFTztRQUNQLGdDQUM0RTtRQUF4Qix1R0FBUSxrQkFBYyxJQUFDO1FBRDNFLGlCQUM0RSxFQUFBOztRQVR0RCx1SkFBbUg7UUFDbEksZUFBWTtRQUFaLDhCQUFZO1FBQ1MsZUFBcUI7UUFBckIsMENBQXFCO1FBRXhCLGVBQXlCO1FBQXpCLDhDQUF5QjtRQUNyQixlQUF1RTtRQUF2RSxzSUFBdUU7UUFHOUQsZUFBcUc7UUFBckcsc0tBQXFHLGdCQUFBLGdDQUFBOzt1RkRBaEksdUJBQXVCO2NBSm5DLFNBQVM7MkJBQ0Usc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC13cml0ZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2Qtd3JpdGUtdGV4dC1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93cml0ZS10ZXh0LWZpZWxkLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFdyaXRlVGV4dEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgdGV4dENvbnRyb2w6IEZvcm1Db250cm9sO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRleHRDb250cm9sID0gdGhpcy5yZWdpc3RlckNvbnRyb2wobmV3IEZvcm1Db250cm9sKHRoaXMuY2FzZUZpZWxkLnZhbHVlKSkgYXMgRm9ybUNvbnRyb2w7XG4gIH1cblxuICBwdWJsaWMgb25CbHVyKCRldmVudCkge1xuICAgICAkZXZlbnQudGFyZ2V0LnZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZS50cmltKCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgW25nQ2xhc3NdPVwieydmb3JtLWdyb3VwLWVycm9yJzogISF0ZXh0Q29udHJvbCAmJiAhdGV4dENvbnRyb2wudmFsaWQgJiYgKHRleHRDb250cm9sLmRpcnR5IHx8IHRleHRDb250cm9sLnRvdWNoZWQpfVwiPlxuICA8bGFiZWwgW2Zvcl09XCJpZCgpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCJjYXNlRmllbGQubGFiZWxcIj57e2Nhc2VGaWVsZCB8IGNjZEZpZWxkTGFiZWwgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgPC9sYWJlbD5cbiAgPHNwYW4gY2xhc3M9XCJmb3JtLWhpbnRcIiAqbmdJZj1cImNhc2VGaWVsZC5oaW50X3RleHRcIj57e2Nhc2VGaWVsZC5oaW50X3RleHQgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgPHNwYW4gY2xhc3M9XCJlcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJ0ZXh0Q29udHJvbD8uZXJyb3JzICYmICh0ZXh0Q29udHJvbC5kaXJ0eSB8fCB0ZXh0Q29udHJvbC50b3VjaGVkKVwiPlxuICAgIHt7dGV4dENvbnRyb2wuZXJyb3JzIHwgY2NkRmlyc3RFcnJvcjpjYXNlRmllbGQubGFiZWwgfCBycHhUcmFuc2xhdGV9fVxuICA8L3NwYW4+XG4gIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBib3R0b20tMzBcIiBbbmdDbGFzc109XCJ7J2dvdnVrLWlucHV0LS1lcnJvcic6IHRleHRDb250cm9sPy5lcnJvcnMgJiYgKHRleHRDb250cm9sLmRpcnR5IHx8IHRleHRDb250cm9sLnRvdWNoZWQpfVwiXG4gIFtpZF09XCJpZCgpXCIgdHlwZT1cInRleHRcIiBbZm9ybUNvbnRyb2xdPVwidGV4dENvbnRyb2xcIiAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiPlxuPC9kaXY+XG4iXX0=