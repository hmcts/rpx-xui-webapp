import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "../utils/field-label.pipe";
import * as i4 from "../utils/first-error.pipe";
import * as i5 from "rpx-xui-translation";
function WriteFixedListFieldComponent_span_2_Template(rf, ctx) { if (rf & 1) {
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
function WriteFixedListFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WriteFixedListFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r2.fixedListFormControl.errors, ctx_r2.caseField.label)), " ");
} }
function WriteFixedListFieldComponent_option_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 6);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", type_r4.code);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, type_r4.label));
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
export class WriteFixedListFieldComponent extends AbstractFieldWriteComponent {
    get listItems() {
        if (this.caseField) {
            if (this.caseField.list_items) {
                return this.caseField.list_items;
            }
            if (this.caseField.formatted_value && this.caseField.formatted_value.list_items) {
                return this.caseField.formatted_value.list_items;
            }
        }
        return [];
    }
    ngOnInit() {
        const isNull = this.caseField.value === undefined || this.caseField.value === '';
        if (isNull) {
            this.caseField.value = null;
        }
        this.fixedListFormControl = this.registerControl(new FormControl(this.caseField.value));
        this.fixedListFormControl.setValue(this.caseField.value);
    }
}
WriteFixedListFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteFixedListFieldComponent_BaseFactory; return function WriteFixedListFieldComponent_Factory(t) { return (ɵWriteFixedListFieldComponent_BaseFactory || (ɵWriteFixedListFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteFixedListFieldComponent)))(t || WriteFixedListFieldComponent); }; }();
WriteFixedListFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteFixedListFieldComponent, selectors: [["ccd-write-fixed-list-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 9, vars: 11, consts: [[1, "form-group", 3, "ngClass"], [3, "for"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [1, "form-control", "ccd-dropdown", "bottom-30", 3, "id", "formControl"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "form-label"], [1, "form-hint"], [1, "error-message"]], template: function WriteFixedListFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "label", 1);
        i0.ɵɵtemplate(2, WriteFixedListFieldComponent_span_2_Template, 4, 5, "span", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, WriteFixedListFieldComponent_span_3_Template, 3, 3, "span", 3);
        i0.ɵɵtemplate(4, WriteFixedListFieldComponent_span_4_Template, 4, 6, "span", 4);
        i0.ɵɵelementStart(5, "select", 5)(6, "option", 6);
        i0.ɵɵtext(7, "--Select a value--");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(8, WriteFixedListFieldComponent_option_8_Template, 3, 4, "option", 7);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c0, !ctx.fixedListFormControl.valid && (ctx.fixedListFormControl.dirty || ctx.fixedListFormControl.touched)));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("for", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.fixedListFormControl.errors && (ctx.fixedListFormControl.dirty || ctx.fixedListFormControl.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("id", ctx.id())("formControl", ctx.fixedListFormControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngValue", null);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.listItems);
    } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.FormControlDirective, i3.FieldLabelPipe, i4.FirstErrorPipe, i5.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteFixedListFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-fixed-list-field', template: "<div class=\"form-group\" [ngClass]=\"{'form-group-error': !fixedListFormControl.valid && (fixedListFormControl.dirty || fixedListFormControl.touched)}\">\n\n  <label [for]=\"id()\">\n    <span class=\"form-label\" *ngIf=\"caseField.label\">{{(caseField | ccdFieldLabel) | rpxTranslate}}</span>\n  </label>\n  <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate}}</span>\n  <span class=\"error-message\" *ngIf=\"fixedListFormControl.errors && (fixedListFormControl.dirty || fixedListFormControl.touched)\">\n    {{ (fixedListFormControl.errors | ccdFirstError:caseField.label ) | rpxTranslate}}\n  </span>\n\n  <select class=\"form-control ccd-dropdown bottom-30\" [id]=\"id()\" [formControl]=\"fixedListFormControl\">\n    <option [ngValue]=null>--Select a value--</option>\n    <option [ngValue]=\"type.code\" *ngFor=\"let type of listItems\">{{type.label | rpxTranslate}}</option>\n  </select>\n\n</div>\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtZml4ZWQtbGlzdC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9maXhlZC1saXN0L3dyaXRlLWZpeGVkLWxpc3QtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZml4ZWQtbGlzdC93cml0ZS1maXhlZC1saXN0LWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOENBQThDLENBQUM7Ozs7Ozs7O0lDQ3ZGLCtCQUFpRDtJQUFBLFlBQThDOzs7SUFBQSxpQkFBTzs7O0lBQXJELGVBQThDO0lBQTlDLGtGQUE4Qzs7O0lBRWpHLCtCQUFvRDtJQUFBLFlBQXNDOztJQUFBLGlCQUFPOzs7SUFBN0MsZUFBc0M7SUFBdEMsc0VBQXNDOzs7SUFDMUYsZ0NBQWdJO0lBQzlILFlBQ0Y7OztJQUFBLGlCQUFPOzs7SUFETCxlQUNGO0lBREUsdUlBQ0Y7OztJQUlFLGlDQUE2RDtJQUFBLFlBQTZCOztJQUFBLGlCQUFTOzs7SUFBM0Ysc0NBQXFCO0lBQWdDLGVBQTZCO0lBQTdCLHlEQUE2Qjs7O0FESjlGLE1BQU0sT0FBTyw0QkFBNkIsU0FBUSwyQkFBMkI7SUFJM0UsSUFBVyxTQUFTO1FBQ2xCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO2dCQUM3QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO2FBQ2xDO1lBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUU7Z0JBQy9FLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO2FBQ2xEO1NBQ0Y7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFTSxRQUFRO1FBQ2IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQztRQUVqRixJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUM3QjtRQUVELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQWdCLENBQUM7UUFDdkcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNELENBQUM7O29TQXpCVSw0QkFBNEIsU0FBNUIsNEJBQTRCOytFQUE1Qiw0QkFBNEI7UUNSekMsOEJBQXNKLGVBQUE7UUFHbEosK0VBQXNHO1FBQ3hHLGlCQUFRO1FBQ1IsK0VBQWlHO1FBQ2pHLCtFQUVPO1FBRVAsaUNBQXFHLGdCQUFBO1FBQzVFLGtDQUFrQjtRQUFBLGlCQUFTO1FBQ2xELG1GQUFtRztRQUNyRyxpQkFBUyxFQUFBOztRQWJhLDZKQUE2SDtRQUU1SSxlQUFZO1FBQVosOEJBQVk7UUFDUyxlQUFxQjtRQUFyQiwwQ0FBcUI7UUFFeEIsZUFBeUI7UUFBekIsOENBQXlCO1FBQ3JCLGVBQWlHO1FBQWpHLDhIQUFpRztRQUkxRSxlQUFXO1FBQVgsNkJBQVcseUNBQUE7UUFDckQsZUFBYztRQUFkLDhCQUFjO1FBQ3lCLGVBQVk7UUFBWix1Q0FBWTs7dUZESmxELDRCQUE0QjtjQUp4QyxTQUFTOzJCQUNFLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtd3JpdGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXdyaXRlLWZpeGVkLWxpc3QtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vd3JpdGUtZml4ZWQtbGlzdC1maWVsZC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBXcml0ZUZpeGVkTGlzdEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgZml4ZWRMaXN0Rm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuXG4gIHB1YmxpYyBnZXQgbGlzdEl0ZW1zKCk6IGFueVtdIHtcbiAgICBpZiAodGhpcy5jYXNlRmllbGQpIHtcbiAgICAgIGlmICh0aGlzLmNhc2VGaWVsZC5saXN0X2l0ZW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhc2VGaWVsZC5saXN0X2l0ZW1zO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY2FzZUZpZWxkLmZvcm1hdHRlZF92YWx1ZSAmJiB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUubGlzdF9pdGVtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXNlRmllbGQuZm9ybWF0dGVkX3ZhbHVlLmxpc3RfaXRlbXM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBpc051bGwgPSB0aGlzLmNhc2VGaWVsZC52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY2FzZUZpZWxkLnZhbHVlID09PSAnJztcblxuICAgIGlmIChpc051bGwpIHtcbiAgICAgIHRoaXMuY2FzZUZpZWxkLnZhbHVlID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLmZpeGVkTGlzdEZvcm1Db250cm9sID0gdGhpcy5yZWdpc3RlckNvbnRyb2wobmV3IEZvcm1Db250cm9sKHRoaXMuY2FzZUZpZWxkLnZhbHVlKSkgYXMgRm9ybUNvbnRyb2w7XG4gICAgdGhpcy5maXhlZExpc3RGb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLmNhc2VGaWVsZC52YWx1ZSk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgW25nQ2xhc3NdPVwieydmb3JtLWdyb3VwLWVycm9yJzogIWZpeGVkTGlzdEZvcm1Db250cm9sLnZhbGlkICYmIChmaXhlZExpc3RGb3JtQ29udHJvbC5kaXJ0eSB8fCBmaXhlZExpc3RGb3JtQ29udHJvbC50b3VjaGVkKX1cIj5cblxuICA8bGFiZWwgW2Zvcl09XCJpZCgpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCJjYXNlRmllbGQubGFiZWxcIj57eyhjYXNlRmllbGQgfCBjY2RGaWVsZExhYmVsKSB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8L2xhYmVsPlxuICA8c3BhbiBjbGFzcz1cImZvcm0taGludFwiICpuZ0lmPVwiY2FzZUZpZWxkLmhpbnRfdGV4dFwiPnt7Y2FzZUZpZWxkLmhpbnRfdGV4dCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImZpeGVkTGlzdEZvcm1Db250cm9sLmVycm9ycyAmJiAoZml4ZWRMaXN0Rm9ybUNvbnRyb2wuZGlydHkgfHwgZml4ZWRMaXN0Rm9ybUNvbnRyb2wudG91Y2hlZClcIj5cbiAgICB7eyAoZml4ZWRMaXN0Rm9ybUNvbnRyb2wuZXJyb3JzIHwgY2NkRmlyc3RFcnJvcjpjYXNlRmllbGQubGFiZWwgKSB8IHJweFRyYW5zbGF0ZX19XG4gIDwvc3Bhbj5cblxuICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGNjZC1kcm9wZG93biBib3R0b20tMzBcIiBbaWRdPVwiaWQoKVwiIFtmb3JtQ29udHJvbF09XCJmaXhlZExpc3RGb3JtQ29udHJvbFwiPlxuICAgIDxvcHRpb24gW25nVmFsdWVdPW51bGw+LS1TZWxlY3QgYSB2YWx1ZS0tPC9vcHRpb24+XG4gICAgPG9wdGlvbiBbbmdWYWx1ZV09XCJ0eXBlLmNvZGVcIiAqbmdGb3I9XCJsZXQgdHlwZSBvZiBsaXN0SXRlbXNcIj57e3R5cGUubGFiZWwgfCBycHhUcmFuc2xhdGV9fTwvb3B0aW9uPlxuICA8L3NlbGVjdD5cblxuPC9kaXY+XG4iXX0=