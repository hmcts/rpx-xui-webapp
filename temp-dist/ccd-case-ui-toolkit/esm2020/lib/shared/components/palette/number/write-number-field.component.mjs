import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "../utils/field-label.pipe";
import * as i4 from "../utils/first-error.pipe";
import * as i5 from "rpx-xui-translation";
function WriteNumberFieldComponent_span_2_Template(rf, ctx) { if (rf & 1) {
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
function WriteNumberFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WriteNumberFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r2.numberControl.errors, ctx_r2.caseField.label)), " ");
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
const _c1 = function (a0) { return { "govuk-input--error": a0 }; };
export class WriteNumberFieldComponent extends AbstractFieldWriteComponent {
    ngOnInit() {
        this.numberControl = this.registerControl(new FormControl(this.caseField.value));
    }
}
WriteNumberFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteNumberFieldComponent_BaseFactory; return function WriteNumberFieldComponent_Factory(t) { return (ɵWriteNumberFieldComponent_BaseFactory || (ɵWriteNumberFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteNumberFieldComponent)))(t || WriteNumberFieldComponent); }; }();
WriteNumberFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteNumberFieldComponent, selectors: [["ccd-write-number-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 6, vars: 12, consts: [[1, "form-group", 3, "ngClass"], [3, "for"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["type", "number", 1, "form-control", "bottom-30", 3, "ngClass", "id", "formControl"], [1, "form-label"], [1, "form-hint"], [1, "error-message"]], template: function WriteNumberFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "label", 1);
        i0.ɵɵtemplate(2, WriteNumberFieldComponent_span_2_Template, 4, 5, "span", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, WriteNumberFieldComponent_span_3_Template, 3, 3, "span", 3);
        i0.ɵɵtemplate(4, WriteNumberFieldComponent_span_4_Template, 4, 6, "span", 4);
        i0.ɵɵelement(5, "input", 5);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c0, !ctx.numberControl.valid && ctx.numberControl.dirty));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("for", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.numberControl.errors && ctx.numberControl.dirty);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c1, ctx.numberControl.errors && ctx.numberControl.dirty))("id", ctx.id())("formControl", ctx.numberControl);
    } }, dependencies: [i1.NgClass, i1.NgIf, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.NgControlStatus, i2.FormControlDirective, i3.FieldLabelPipe, i4.FirstErrorPipe, i5.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteNumberFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-number-field', template: "<div class=\"form-group\" [ngClass]=\"{'form-group-error': !numberControl.valid && numberControl.dirty}\">\n  <label [for]=\"id()\">\n    <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel | rpxTranslate}}</span>\n  </label>\n  <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate}}</span>\n  <span class=\"error-message\" *ngIf=\"numberControl.errors && numberControl.dirty\">\n    {{ numberControl.errors | ccdFirstError:caseField.label | rpxTranslate}}\n  </span>\n\n  <input class=\"form-control bottom-30\" [ngClass]=\"{'govuk-input--error': numberControl.errors && numberControl.dirty}\"\n   [id]=\"id()\" type=\"number\" [formControl]=\"numberControl\">\n</div>\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtbnVtYmVyLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL251bWJlci93cml0ZS1udW1iZXItZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbnVtYmVyL3dyaXRlLW51bWJlci1maWVsZC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOzs7Ozs7OztJQ0F2RiwrQkFBaUQ7SUFBQSxZQUE0Qzs7O0lBQUEsaUJBQU87OztJQUFuRCxlQUE0QztJQUE1QyxrRkFBNEM7OztJQUUvRiwrQkFBb0Q7SUFBQSxZQUFzQzs7SUFBQSxpQkFBTzs7O0lBQTdDLGVBQXNDO0lBQXRDLHNFQUFzQzs7O0lBQzFGLCtCQUFnRjtJQUM5RSxZQUNGOzs7SUFBQSxpQkFBTzs7O0lBREwsZUFDRjtJQURFLGdJQUNGOzs7O0FEQ0YsTUFBTSxPQUFPLHlCQUEwQixTQUFRLDJCQUEyQjtJQUlqRSxRQUFRO1FBQ2IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQWdCLENBQUM7SUFDbEcsQ0FBQzs7cVJBTlUseUJBQXlCLFNBQXpCLHlCQUF5Qjs0RUFBekIseUJBQXlCO1FDUnRDLDhCQUFzRyxlQUFBO1FBRWxHLDRFQUFvRztRQUN0RyxpQkFBUTtRQUNSLDRFQUFpRztRQUNqRyw0RUFFTztRQUVQLDJCQUN5RDtRQUMzRCxpQkFBTTs7UUFYa0IseUdBQTZFO1FBQzVGLGVBQVk7UUFBWiw4QkFBWTtRQUNTLGVBQXFCO1FBQXJCLDBDQUFxQjtRQUV4QixlQUF5QjtRQUF6Qiw4Q0FBeUI7UUFDckIsZUFBaUQ7UUFBakQsMEVBQWlEO1FBSXhDLGVBQStFO1FBQS9FLDBHQUErRSxnQkFBQSxrQ0FBQTs7dUZERDFHLHlCQUF5QjtjQUpyQyxTQUFTOzJCQUNFLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtd3JpdGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXdyaXRlLW51bWJlci1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93cml0ZS1udW1iZXItZmllbGQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgV3JpdGVOdW1iZXJGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIG51bWJlckNvbnRyb2w6IEZvcm1Db250cm9sO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm51bWJlckNvbnRyb2wgPSB0aGlzLnJlZ2lzdGVyQ29udHJvbChuZXcgRm9ybUNvbnRyb2wodGhpcy5jYXNlRmllbGQudmFsdWUpKSBhcyBGb3JtQ29udHJvbDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBbbmdDbGFzc109XCJ7J2Zvcm0tZ3JvdXAtZXJyb3InOiAhbnVtYmVyQ29udHJvbC52YWxpZCAmJiBudW1iZXJDb250cm9sLmRpcnR5fVwiPlxuICA8bGFiZWwgW2Zvcl09XCJpZCgpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCJjYXNlRmllbGQubGFiZWxcIj57e2Nhc2VGaWVsZCB8IGNjZEZpZWxkTGFiZWwgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgPC9sYWJlbD5cbiAgPHNwYW4gY2xhc3M9XCJmb3JtLWhpbnRcIiAqbmdJZj1cImNhc2VGaWVsZC5oaW50X3RleHRcIj57e2Nhc2VGaWVsZC5oaW50X3RleHQgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgPHNwYW4gY2xhc3M9XCJlcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJudW1iZXJDb250cm9sLmVycm9ycyAmJiBudW1iZXJDb250cm9sLmRpcnR5XCI+XG4gICAge3sgbnVtYmVyQ29udHJvbC5lcnJvcnMgfCBjY2RGaXJzdEVycm9yOmNhc2VGaWVsZC5sYWJlbCB8IHJweFRyYW5zbGF0ZX19XG4gIDwvc3Bhbj5cblxuICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYm90dG9tLTMwXCIgW25nQ2xhc3NdPVwieydnb3Z1ay1pbnB1dC0tZXJyb3InOiBudW1iZXJDb250cm9sLmVycm9ycyAmJiBudW1iZXJDb250cm9sLmRpcnR5fVwiXG4gICBbaWRdPVwiaWQoKVwiIHR5cGU9XCJudW1iZXJcIiBbZm9ybUNvbnRyb2xdPVwibnVtYmVyQ29udHJvbFwiPlxuPC9kaXY+XG4iXX0=