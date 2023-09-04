import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "../utils/field-label.pipe";
import * as i4 from "../utils/first-error.pipe";
import * as i5 from "rpx-xui-translation";
function WriteFixedRadioListFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
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
function WriteFixedRadioListFieldComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WriteFixedRadioListFieldComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r2.fixedRadioListControl.errors, ctx_r2.caseField.label)));
} }
const _c0 = function (a0) { return { selected: a0 }; };
function WriteFixedRadioListFieldComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelement(1, "input", 10);
    i0.ɵɵelementStart(2, "label", 11);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const radioButton_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c0, ctx_r3.fixedRadioListControl.value === radioButton_r4.code));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("id", ctx_r3.id() + "-" + radioButton_r4.code)("name", ctx_r3.id())("formControl", ctx_r3.fixedRadioListControl)("value", radioButton_r4.code);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("for", ctx_r3.id() + "-" + radioButton_r4.code);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 7, radioButton_r4.label));
} }
const _c1 = function (a0) { return { "form-group-error": a0 }; };
export class WriteFixedRadioListFieldComponent extends AbstractFieldWriteComponent {
    ngOnInit() {
        const notEmpty = this.caseField.value !== null && this.caseField.value !== undefined;
        this.fixedRadioListControl = this.registerControl(new FormControl(notEmpty ? this.caseField.value : null));
    }
}
WriteFixedRadioListFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteFixedRadioListFieldComponent_BaseFactory; return function WriteFixedRadioListFieldComponent_Factory(t) { return (ɵWriteFixedRadioListFieldComponent_BaseFactory || (ɵWriteFixedRadioListFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteFixedRadioListFieldComponent)))(t || WriteFixedRadioListFieldComponent); }; }();
WriteFixedRadioListFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteFixedRadioListFieldComponent, selectors: [["ccd-write-fixed-radio-list-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 9, vars: 9, consts: [[1, "form-group", "bottom-30", 3, "ngClass", "id"], [3, "for"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["class", "multiple-choice", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "form-label"], [1, "form-hint"], [1, "error-message"], [1, "multiple-choice", 3, "ngClass"], ["type", "radio", 1, "form-control", 3, "id", "name", "formControl", "value"], [1, "form-label", 3, "for"]], template: function WriteFixedRadioListFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "fieldset")(2, "legend")(3, "label", 1);
        i0.ɵɵtemplate(4, WriteFixedRadioListFieldComponent_span_4_Template, 4, 5, "span", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(5, WriteFixedRadioListFieldComponent_span_5_Template, 3, 3, "span", 3);
        i0.ɵɵtemplate(6, WriteFixedRadioListFieldComponent_span_6_Template, 4, 6, "span", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementContainerStart(7);
        i0.ɵɵtemplate(8, WriteFixedRadioListFieldComponent_div_8_Template, 5, 11, "div", 5);
        i0.ɵɵelementContainerEnd();
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c1, !ctx.fixedRadioListControl.valid && (ctx.fixedRadioListControl.dirty || ctx.fixedRadioListControl.touched)))("id", ctx.id());
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("for", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.fixedRadioListControl.errors && (ctx.fixedRadioListControl.dirty || ctx.fixedRadioListControl.touched));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.caseField.field_type.fixed_list_items);
    } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i2.DefaultValueAccessor, i2.RadioControlValueAccessor, i2.NgControlStatus, i2.FormControlDirective, i3.FieldLabelPipe, i4.FirstErrorPipe, i5.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteFixedRadioListFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-fixed-radio-list-field', template: "<div class=\"form-group bottom-30\" [ngClass]=\"{'form-group-error': !fixedRadioListControl.valid && (fixedRadioListControl.dirty || fixedRadioListControl.touched)}\" [id]=\"id()\">\n  <fieldset>\n    <legend>\n      <label [for]=\"id()\">\n        <span class=\"form-label\" *ngIf=\"caseField.label\">{{(caseField | ccdFieldLabel) | rpxTranslate}}</span>\n      </label>\n      <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate }}</span>\n      <span class=\"error-message\" *ngIf=\"fixedRadioListControl.errors && (fixedRadioListControl.dirty || fixedRadioListControl.touched)\">{{(fixedRadioListControl.errors | ccdFirstError:caseField.label) | rpxTranslate}}</span>\n    </legend>\n    <ng-container>\n      <div class=\"multiple-choice\" *ngFor=\"let radioButton of caseField.field_type.fixed_list_items\" [ngClass]=\"{selected: fixedRadioListControl.value === radioButton.code}\">\n        <input class=\"form-control\" [id]=\"id()+'-'+radioButton.code\" [name]=\"id()\" type=\"radio\" [formControl]=\"fixedRadioListControl\" [value]=\"radioButton.code\">\n        <label class=\"form-label\" [for]=\"id()+'-'+radioButton.code\">{{radioButton.label | rpxTranslate}}</label>\n      </div>\n    </ng-container>\n  </fieldset>\n</div>\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtZml4ZWQtcmFkaW8tbGlzdC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9maXhlZC1yYWRpby1saXN0L3dyaXRlLWZpeGVkLXJhZGlvLWxpc3QtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZml4ZWQtcmFkaW8tbGlzdC93cml0ZS1maXhlZC1yYWRpby1saXN0LWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOENBQThDLENBQUM7Ozs7Ozs7O0lDRW5GLCtCQUFpRDtJQUFBLFlBQThDOzs7SUFBQSxpQkFBTzs7O0lBQXJELGVBQThDO0lBQTlDLGtGQUE4Qzs7O0lBRWpHLCtCQUFvRDtJQUFBLFlBQXVDOztJQUFBLGlCQUFPOzs7SUFBOUMsZUFBdUM7SUFBdkMsc0VBQXVDOzs7SUFDM0YsK0JBQW1JO0lBQUEsWUFBaUY7OztJQUFBLGlCQUFPOzs7SUFBeEYsZUFBaUY7SUFBakYsNkhBQWlGOzs7O0lBR3BOLDhCQUF3SztJQUN0Syw0QkFBeUo7SUFDekosaUNBQTREO0lBQUEsWUFBb0M7O0lBQUEsaUJBQVEsRUFBQTs7OztJQUZYLGdIQUF3RTtJQUN6SSxlQUFnQztJQUFoQyw0REFBZ0MscUJBQUEsNkNBQUEsOEJBQUE7SUFDbEMsZUFBaUM7SUFBakMsNkRBQWlDO0lBQUMsZUFBb0M7SUFBcEMsZ0VBQW9DOzs7QURKeEcsTUFBTSxPQUFPLGlDQUFrQyxTQUFRLDJCQUEyQjtJQUl6RSxRQUFRO1FBQ2IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztRQUNyRixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBZ0IsQ0FBQztJQUM1SCxDQUFDOzs2VEFQVSxpQ0FBaUMsU0FBakMsaUNBQWlDO29GQUFqQyxpQ0FBaUM7UUNSOUMsOEJBQStLLGVBQUEsYUFBQSxlQUFBO1FBSXZLLG9GQUFzRztRQUN4RyxpQkFBUTtRQUNSLG9GQUFrRztRQUNsRyxvRkFBMk47UUFDN04saUJBQVM7UUFDVCw2QkFBYztRQUNaLG1GQUdNO1FBQ1IsMEJBQWU7UUFDakIsaUJBQVcsRUFBQTs7UUFmcUIsZ0tBQWdJLGdCQUFBO1FBR3JKLGVBQVk7UUFBWiw4QkFBWTtRQUNTLGVBQXFCO1FBQXJCLDBDQUFxQjtRQUV4QixlQUF5QjtRQUF6Qiw4Q0FBeUI7UUFDckIsZUFBb0c7UUFBcEcsaUlBQW9HO1FBRzVFLGVBQXdDO1FBQXhDLG1FQUF3Qzs7dUZERnRGLGlDQUFpQztjQUo3QyxTQUFTOzJCQUNFLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtd3JpdGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXdyaXRlLWZpeGVkLXJhZGlvLWxpc3QtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vd3JpdGUtZml4ZWQtcmFkaW8tbGlzdC1maWVsZC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBXcml0ZUZpeGVkUmFkaW9MaXN0RmllbGRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBmaXhlZFJhZGlvTGlzdENvbnRyb2w6IEZvcm1Db250cm9sO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBub3RFbXB0eSA9IHRoaXMuY2FzZUZpZWxkLnZhbHVlICE9PSBudWxsICYmIHRoaXMuY2FzZUZpZWxkLnZhbHVlICE9PSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maXhlZFJhZGlvTGlzdENvbnRyb2wgPSB0aGlzLnJlZ2lzdGVyQ29udHJvbChuZXcgRm9ybUNvbnRyb2wobm90RW1wdHkgPyB0aGlzLmNhc2VGaWVsZC52YWx1ZSA6IG51bGwpKSBhcyBGb3JtQ29udHJvbDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgYm90dG9tLTMwXCIgW25nQ2xhc3NdPVwieydmb3JtLWdyb3VwLWVycm9yJzogIWZpeGVkUmFkaW9MaXN0Q29udHJvbC52YWxpZCAmJiAoZml4ZWRSYWRpb0xpc3RDb250cm9sLmRpcnR5IHx8IGZpeGVkUmFkaW9MaXN0Q29udHJvbC50b3VjaGVkKX1cIiBbaWRdPVwiaWQoKVwiPlxuICA8ZmllbGRzZXQ+XG4gICAgPGxlZ2VuZD5cbiAgICAgIDxsYWJlbCBbZm9yXT1cImlkKClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCJjYXNlRmllbGQubGFiZWxcIj57eyhjYXNlRmllbGQgfCBjY2RGaWVsZExhYmVsKSB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1oaW50XCIgKm5nSWY9XCJjYXNlRmllbGQuaGludF90ZXh0XCI+e3tjYXNlRmllbGQuaGludF90ZXh0IHwgcnB4VHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJlcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJmaXhlZFJhZGlvTGlzdENvbnRyb2wuZXJyb3JzICYmIChmaXhlZFJhZGlvTGlzdENvbnRyb2wuZGlydHkgfHwgZml4ZWRSYWRpb0xpc3RDb250cm9sLnRvdWNoZWQpXCI+e3soZml4ZWRSYWRpb0xpc3RDb250cm9sLmVycm9ycyB8IGNjZEZpcnN0RXJyb3I6Y2FzZUZpZWxkLmxhYmVsKSB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICAgIDwvbGVnZW5kPlxuICAgIDxuZy1jb250YWluZXI+XG4gICAgICA8ZGl2IGNsYXNzPVwibXVsdGlwbGUtY2hvaWNlXCIgKm5nRm9yPVwibGV0IHJhZGlvQnV0dG9uIG9mIGNhc2VGaWVsZC5maWVsZF90eXBlLmZpeGVkX2xpc3RfaXRlbXNcIiBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6IGZpeGVkUmFkaW9MaXN0Q29udHJvbC52YWx1ZSA9PT0gcmFkaW9CdXR0b24uY29kZX1cIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW2lkXT1cImlkKCkrJy0nK3JhZGlvQnV0dG9uLmNvZGVcIiBbbmFtZV09XCJpZCgpXCIgdHlwZT1cInJhZGlvXCIgW2Zvcm1Db250cm9sXT1cImZpeGVkUmFkaW9MaXN0Q29udHJvbFwiIFt2YWx1ZV09XCJyYWRpb0J1dHRvbi5jb2RlXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIiBbZm9yXT1cImlkKCkrJy0nK3JhZGlvQnV0dG9uLmNvZGVcIj57e3JhZGlvQnV0dG9uLmxhYmVsIHwgcnB4VHJhbnNsYXRlfX08L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZmllbGRzZXQ+XG48L2Rpdj5cbiJdfQ==