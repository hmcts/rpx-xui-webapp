import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "./money-gbp-input.component";
import * as i4 from "../utils/field-label.pipe";
import * as i5 from "../utils/first-error.pipe";
import * as i6 from "../utils/is-mandatory.pipe";
import * as i7 from "rpx-xui-translation";
function WriteMoneyGbpFieldComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFieldLabel");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind1(3, 3, ctx_r0.caseField)));
} }
function WriteMoneyGbpFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WriteMoneyGbpFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r2.moneyGbpControl.errors, ctx_r2.caseField.label)));
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
export class WriteMoneyGbpFieldComponent extends AbstractFieldWriteComponent {
    ngOnInit() {
        this.moneyGbpControl = this.registerControl(new FormControl(this.caseField.value));
    }
}
WriteMoneyGbpFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteMoneyGbpFieldComponent_BaseFactory; return function WriteMoneyGbpFieldComponent_Factory(t) { return (ɵWriteMoneyGbpFieldComponent_BaseFactory || (ɵWriteMoneyGbpFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteMoneyGbpFieldComponent)))(t || WriteMoneyGbpFieldComponent); }; }();
WriteMoneyGbpFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteMoneyGbpFieldComponent, selectors: [["ccd-write-money-gbp-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 10, vars: 13, consts: [[1, "form-group", "bottom-30", 3, "ngClass"], [3, "for"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [1, "form-money"], [1, "form-currency"], [3, "id", "name", "mandatory", "formControl"], [1, "form-label"], [1, "form-hint"], [1, "error-message"]], template: function WriteMoneyGbpFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "label", 1);
        i0.ɵɵtemplate(2, WriteMoneyGbpFieldComponent_span_2_Template, 4, 5, "span", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, WriteMoneyGbpFieldComponent_span_3_Template, 3, 3, "span", 3);
        i0.ɵɵtemplate(4, WriteMoneyGbpFieldComponent_span_4_Template, 4, 6, "span", 4);
        i0.ɵɵelementStart(5, "div", 5)(6, "span", 6);
        i0.ɵɵtext(7, "\u00A3");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(8, "ccd-money-gbp-input", 7);
        i0.ɵɵpipe(9, "ccdIsMandatory");
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(11, _c0, !ctx.moneyGbpControl.valid && (ctx.moneyGbpControl.dirty || ctx.moneyGbpControl.touched)));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("for", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.moneyGbpControl.errors && (ctx.moneyGbpControl.dirty || ctx.moneyGbpControl.touched));
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("id", ctx.id())("name", ctx.id())("mandatory", i0.ɵɵpipeBind1(9, 9, ctx.caseField))("formControl", ctx.moneyGbpControl);
    } }, dependencies: [i1.NgClass, i1.NgIf, i2.NgControlStatus, i2.FormControlDirective, i3.MoneyGbpInputComponent, i4.FieldLabelPipe, i5.FirstErrorPipe, i6.IsMandatoryPipe, i7.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteMoneyGbpFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-money-gbp-field', template: "<div class=\"form-group bottom-30\" [ngClass]=\"{'form-group-error': !moneyGbpControl.valid && (moneyGbpControl.dirty || moneyGbpControl.touched)}\">\n\n  <label [for]=\"id()\">\n    <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel | rpxTranslate}}</span>\n  </label>\n  <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate}}</span>\n  <span class=\"error-message\" *ngIf=\"moneyGbpControl.errors && (moneyGbpControl.dirty || moneyGbpControl.touched)\">{{moneyGbpControl.errors | ccdFirstError:caseField.label | rpxTranslate}}</span>\n\n  <div class=\"form-money\">\n    <span class=\"form-currency\">&#163;</span>\n    <ccd-money-gbp-input [id]=\"id()\"\n                         [name]=\"id()\"\n                         [mandatory]=\"caseField | ccdIsMandatory\"\n                         [formControl]=\"moneyGbpControl\"></ccd-money-gbp-input>\n  </div>\n\n</div>\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtbW9uZXktZ2JwLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL21vbmV5LWdicC93cml0ZS1tb25leS1nYnAtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbW9uZXktZ2JwL3dyaXRlLW1vbmV5LWdicC1maWVsZC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOzs7Ozs7Ozs7O0lDQ3ZGLCtCQUFpRDtJQUFBLFlBQTRDOzs7SUFBQSxpQkFBTzs7O0lBQW5ELGVBQTRDO0lBQTVDLGtGQUE0Qzs7O0lBRS9GLCtCQUFvRDtJQUFBLFlBQXNDOztJQUFBLGlCQUFPOzs7SUFBN0MsZUFBc0M7SUFBdEMsc0VBQXNDOzs7SUFDMUYsZ0NBQWlIO0lBQUEsWUFBeUU7OztJQUFBLGlCQUFPOzs7SUFBaEYsZUFBeUU7SUFBekUsdUhBQXlFOzs7QURFNUwsTUFBTSxPQUFPLDJCQUE0QixTQUFRLDJCQUEyQjtJQUluRSxRQUFRO1FBQ2IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQWdCLENBQUM7SUFDcEcsQ0FBQzs7K1JBTlUsMkJBQTJCLFNBQTNCLDJCQUEyQjs4RUFBM0IsMkJBQTJCO1FDUnhDLDhCQUFpSixlQUFBO1FBRzdJLDhFQUFvRztRQUN0RyxpQkFBUTtRQUNSLDhFQUFpRztRQUNqRyw4RUFBaU07UUFFak0sOEJBQXdCLGNBQUE7UUFDTSxzQkFBTTtRQUFBLGlCQUFPO1FBQ3pDLHlDQUcyRTs7UUFDN0UsaUJBQU0sRUFBQTs7UUFkMEIsK0lBQThHO1FBRXZJLGVBQVk7UUFBWiw4QkFBWTtRQUNTLGVBQXFCO1FBQXJCLDBDQUFxQjtRQUV4QixlQUF5QjtRQUF6Qiw4Q0FBeUI7UUFDckIsZUFBa0Y7UUFBbEYsK0dBQWtGO1FBSXhGLGVBQVc7UUFBWCw2QkFBVyxrQkFBQSxrREFBQSxvQ0FBQTs7dUZERnZCLDJCQUEyQjtjQUp2QyxTQUFTOzJCQUNFLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtd3JpdGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXdyaXRlLW1vbmV5LWdicC1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93cml0ZS1tb25leS1nYnAtZmllbGQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgV3JpdGVNb25leUdicEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgbW9uZXlHYnBDb250cm9sOiBGb3JtQ29udHJvbDtcblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5tb25leUdicENvbnRyb2wgPSB0aGlzLnJlZ2lzdGVyQ29udHJvbChuZXcgRm9ybUNvbnRyb2wodGhpcy5jYXNlRmllbGQudmFsdWUpKSBhcyBGb3JtQ29udHJvbDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgYm90dG9tLTMwXCIgW25nQ2xhc3NdPVwieydmb3JtLWdyb3VwLWVycm9yJzogIW1vbmV5R2JwQ29udHJvbC52YWxpZCAmJiAobW9uZXlHYnBDb250cm9sLmRpcnR5IHx8IG1vbmV5R2JwQ29udHJvbC50b3VjaGVkKX1cIj5cblxuICA8bGFiZWwgW2Zvcl09XCJpZCgpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCJjYXNlRmllbGQubGFiZWxcIj57e2Nhc2VGaWVsZCB8IGNjZEZpZWxkTGFiZWwgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgPC9sYWJlbD5cbiAgPHNwYW4gY2xhc3M9XCJmb3JtLWhpbnRcIiAqbmdJZj1cImNhc2VGaWVsZC5oaW50X3RleHRcIj57e2Nhc2VGaWVsZC5oaW50X3RleHQgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgPHNwYW4gY2xhc3M9XCJlcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJtb25leUdicENvbnRyb2wuZXJyb3JzICYmIChtb25leUdicENvbnRyb2wuZGlydHkgfHwgbW9uZXlHYnBDb250cm9sLnRvdWNoZWQpXCI+e3ttb25leUdicENvbnRyb2wuZXJyb3JzIHwgY2NkRmlyc3RFcnJvcjpjYXNlRmllbGQubGFiZWwgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cblxuICA8ZGl2IGNsYXNzPVwiZm9ybS1tb25leVwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1jdXJyZW5jeVwiPiYjMTYzOzwvc3Bhbj5cbiAgICA8Y2NkLW1vbmV5LWdicC1pbnB1dCBbaWRdPVwiaWQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW25hbWVdPVwiaWQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW21hbmRhdG9yeV09XCJjYXNlRmllbGQgfCBjY2RJc01hbmRhdG9yeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cIm1vbmV5R2JwQ29udHJvbFwiPjwvY2NkLW1vbmV5LWdicC1pbnB1dD5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuIl19