import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "../utils/field-label.pipe";
import * as i4 from "../utils/first-error.pipe";
import * as i5 from "rpx-xui-translation";
function WriteDynamicListFieldComponent_span_2_Template(rf, ctx) { if (rf & 1) {
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
function WriteDynamicListFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WriteDynamicListFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "Select an option from the dropdown"));
} }
function WriteDynamicListFieldComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r3.dynamicListFormControl.errors, ctx_r3.caseField.label)));
} }
function WriteDynamicListFieldComponent_option_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r5 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", type_r5.code);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, type_r5.label));
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
export class WriteDynamicListFieldComponent extends AbstractFieldWriteComponent {
    ngOnInit() {
        /**
         * Reassigning list_items from formatted_value when list_items is empty
         */
        if (!this.caseField.list_items && this.caseField.formatted_value && this.caseField.formatted_value.list_items) {
            this.caseField.list_items = this.caseField.formatted_value.list_items;
        }
        /**
         * Reassigning value from formatted_value when value is empty
         */
        if (!this.caseField.value) {
            if (this.caseField.formatted_value && this.caseField.formatted_value.value && this.caseField.formatted_value.value.code) {
                this.caseField.value = this.caseField.formatted_value.value.code;
            }
        }
        const isNull = this.caseField.value === undefined || this.caseField.value === '';
        if (isNull || typeof this.caseField.value === 'object') {
            this.caseField.value = null;
        }
        this.dynamicListFormControl = this.registerControl(new FormControl(this.caseField.value));
        this.dynamicListFormControl.setValue(this.caseField.value);
    }
}
WriteDynamicListFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteDynamicListFieldComponent_BaseFactory; return function WriteDynamicListFieldComponent_Factory(t) { return (ɵWriteDynamicListFieldComponent_BaseFactory || (ɵWriteDynamicListFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteDynamicListFieldComponent)))(t || WriteDynamicListFieldComponent); }; }();
WriteDynamicListFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteDynamicListFieldComponent, selectors: [["ccd-write-dynamic-list-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 11, vars: 15, consts: [[1, "form-group", 3, "ngClass"], [3, "for"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [1, "form-control", "ccd-dropdown", "bottom-30", 3, "id", "formControl"], [3, "ngValue"], ["role", "option", 3, "ngValue", 4, "ngFor", "ngForOf"], [1, "form-label"], [1, "form-hint"], [1, "error-message"], ["role", "option", 3, "ngValue"]], template: function WriteDynamicListFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "label", 1);
        i0.ɵɵtemplate(2, WriteDynamicListFieldComponent_span_2_Template, 4, 5, "span", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, WriteDynamicListFieldComponent_span_3_Template, 3, 3, "span", 3);
        i0.ɵɵtemplate(4, WriteDynamicListFieldComponent_span_4_Template, 3, 3, "span", 2);
        i0.ɵɵtemplate(5, WriteDynamicListFieldComponent_span_5_Template, 4, 6, "span", 4);
        i0.ɵɵelementStart(6, "select", 5)(7, "option", 6);
        i0.ɵɵtext(8);
        i0.ɵɵpipe(9, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(10, WriteDynamicListFieldComponent_option_10_Template, 3, 4, "option", 7);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(13, _c0, !ctx.dynamicListFormControl.valid && (ctx.dynamicListFormControl.dirty || ctx.dynamicListFormControl.touched)));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("for", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.caseField.label && !ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.dynamicListFormControl.errors && ctx.dynamicListFormControl.dirty);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("id", ctx.id())("formControl", ctx.dynamicListFormControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngValue", null);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 11, "--Select a value--"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.caseField.list_items);
    } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.FormControlDirective, i3.FieldLabelPipe, i4.FirstErrorPipe, i5.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteDynamicListFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-dynamic-list-field', template: "<div class=\"form-group\"\n  [ngClass]=\"{'form-group-error': !dynamicListFormControl.valid && (dynamicListFormControl.dirty || dynamicListFormControl.touched)}\">\n\n  <label [for]=\"id()\">\n    <span class=\"form-label\" *ngIf=\"caseField.label\">{{(caseField | ccdFieldLabel) | rpxTranslate}}</span>\n  </label>\n  <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate}}</span>\n  <span class=\"form-label\" *ngIf=\"!caseField.label && !caseField.hint_text\">{{'Select an option from the dropdown' | rpxTranslate}}</span>\n  <span class=\"error-message\"\n    *ngIf=\"dynamicListFormControl.errors && dynamicListFormControl.dirty\">{{(dynamicListFormControl.errors |\n    ccdFirstError:caseField.label) | rpxTranslate}}</span>\n\n  <select class=\"form-control ccd-dropdown bottom-30\" [id]=\"id()\"\n    [formControl]=\"dynamicListFormControl\">\n    <option [ngValue]=null>{{'--Select a value--' | rpxTranslate}}</option>\n    <option [ngValue]=\"type.code\" *ngFor=\"let type of caseField.list_items\" role=\"option\">{{type.label | rpxTranslate}}</option>\n  </select>\n</div>\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtZHluYW1pYy1saXN0LWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2R5bmFtaWMtbGlzdC93cml0ZS1keW5hbWljLWxpc3QtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZHluYW1pYy1saXN0L3dyaXRlLWR5bmFtaWMtbGlzdC1maWVsZC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOzs7Ozs7OztJQ0V2RiwrQkFBaUQ7SUFBQSxZQUE4Qzs7O0lBQUEsaUJBQU87OztJQUFyRCxlQUE4QztJQUE5QyxrRkFBOEM7OztJQUVqRywrQkFBb0Q7SUFBQSxZQUFzQzs7SUFBQSxpQkFBTzs7O0lBQTdDLGVBQXNDO0lBQXRDLHNFQUFzQzs7O0lBQzFGLCtCQUEwRTtJQUFBLFlBQXVEOztJQUFBLGlCQUFPOztJQUE5RCxlQUF1RDtJQUF2RCxnRkFBdUQ7OztJQUNqSSxnQ0FDd0U7SUFBQSxZQUN2Qjs7O0lBQUEsaUJBQU87OztJQURnQixlQUN2QjtJQUR1Qiw4SEFDdkI7OztJQUsvQyxrQ0FBc0Y7SUFBQSxZQUE2Qjs7SUFBQSxpQkFBUzs7O0lBQXBILHNDQUFxQjtJQUF5RCxlQUE2QjtJQUE3Qix5REFBNkI7OztBRFB2SCxNQUFNLE9BQU8sOEJBQStCLFNBQVEsMkJBQTJCO0lBSXRFLFFBQVE7UUFDYjs7V0FFRztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUU7WUFDN0csSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1NBQ3ZFO1FBRUQ7O1dBRUc7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDdkgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNsRTtTQUNGO1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQztRQUVqRixJQUFJLE1BQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDN0I7UUFFRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFnQixDQUFDO1FBQ3pHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs4U0E3QlUsOEJBQThCLFNBQTlCLDhCQUE4QjtpRkFBOUIsOEJBQThCO1FDUjNDLDhCQUNzSSxlQUFBO1FBR2xJLGlGQUFzRztRQUN4RyxpQkFBUTtRQUNSLGlGQUFpRztRQUNqRyxpRkFBd0k7UUFDeEksaUZBRXdEO1FBRXhELGlDQUN5QyxnQkFBQTtRQUNoQixZQUF1Qzs7UUFBQSxpQkFBUztRQUN2RSx1RkFBNEg7UUFDOUgsaUJBQVMsRUFBQTs7UUFmVCxvS0FBbUk7UUFFNUgsZUFBWTtRQUFaLDhCQUFZO1FBQ1MsZUFBcUI7UUFBckIsMENBQXFCO1FBRXhCLGVBQXlCO1FBQXpCLDhDQUF5QjtRQUN4QixlQUE4QztRQUE5Qyx1RUFBOEM7UUFFckUsZUFBbUU7UUFBbkUsNEZBQW1FO1FBR2xCLGVBQVc7UUFBWCw2QkFBVywyQ0FBQTtRQUVyRCxlQUFjO1FBQWQsOEJBQWM7UUFBQyxlQUF1QztRQUF2QyxpRUFBdUM7UUFDZixlQUF1QjtRQUF2QixrREFBdUI7O3VGRFA3RCw4QkFBOEI7Y0FKMUMsU0FBUzsyQkFDRSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL2Fic3RyYWN0LWZpZWxkLXdyaXRlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC13cml0ZS1keW5hbWljLWxpc3QtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vd3JpdGUtZHluYW1pYy1saXN0LWZpZWxkLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFdyaXRlRHluYW1pY0xpc3RGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIGR5bmFtaWNMaXN0Rm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAvKipcbiAgICAgKiBSZWFzc2lnbmluZyBsaXN0X2l0ZW1zIGZyb20gZm9ybWF0dGVkX3ZhbHVlIHdoZW4gbGlzdF9pdGVtcyBpcyBlbXB0eVxuICAgICAqL1xuICAgIGlmICghdGhpcy5jYXNlRmllbGQubGlzdF9pdGVtcyAmJiB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUgJiYgdGhpcy5jYXNlRmllbGQuZm9ybWF0dGVkX3ZhbHVlLmxpc3RfaXRlbXMpIHtcbiAgICAgIHRoaXMuY2FzZUZpZWxkLmxpc3RfaXRlbXMgPSB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUubGlzdF9pdGVtcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFzc2lnbmluZyB2YWx1ZSBmcm9tIGZvcm1hdHRlZF92YWx1ZSB3aGVuIHZhbHVlIGlzIGVtcHR5XG4gICAgICovXG4gICAgaWYgKCF0aGlzLmNhc2VGaWVsZC52YWx1ZSkge1xuICAgICAgaWYgKHRoaXMuY2FzZUZpZWxkLmZvcm1hdHRlZF92YWx1ZSAmJiB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUudmFsdWUgJiYgdGhpcy5jYXNlRmllbGQuZm9ybWF0dGVkX3ZhbHVlLnZhbHVlLmNvZGUpIHtcbiAgICAgICAgdGhpcy5jYXNlRmllbGQudmFsdWUgPSB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUudmFsdWUuY29kZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc051bGwgPSB0aGlzLmNhc2VGaWVsZC52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY2FzZUZpZWxkLnZhbHVlID09PSAnJztcblxuICAgIGlmIChpc051bGwgfHwgdHlwZW9mIHRoaXMuY2FzZUZpZWxkLnZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5jYXNlRmllbGQudmFsdWUgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuZHluYW1pY0xpc3RGb3JtQ29udHJvbCA9IHRoaXMucmVnaXN0ZXJDb250cm9sKG5ldyBGb3JtQ29udHJvbCh0aGlzLmNhc2VGaWVsZC52YWx1ZSkpIGFzIEZvcm1Db250cm9sO1xuICAgIHRoaXMuZHluYW1pY0xpc3RGb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLmNhc2VGaWVsZC52YWx1ZSk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCJcbiAgW25nQ2xhc3NdPVwieydmb3JtLWdyb3VwLWVycm9yJzogIWR5bmFtaWNMaXN0Rm9ybUNvbnRyb2wudmFsaWQgJiYgKGR5bmFtaWNMaXN0Rm9ybUNvbnRyb2wuZGlydHkgfHwgZHluYW1pY0xpc3RGb3JtQ29udHJvbC50b3VjaGVkKX1cIj5cblxuICA8bGFiZWwgW2Zvcl09XCJpZCgpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCJjYXNlRmllbGQubGFiZWxcIj57eyhjYXNlRmllbGQgfCBjY2RGaWVsZExhYmVsKSB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8L2xhYmVsPlxuICA8c3BhbiBjbGFzcz1cImZvcm0taGludFwiICpuZ0lmPVwiY2FzZUZpZWxkLmhpbnRfdGV4dFwiPnt7Y2FzZUZpZWxkLmhpbnRfdGV4dCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImZvcm0tbGFiZWxcIiAqbmdJZj1cIiFjYXNlRmllbGQubGFiZWwgJiYgIWNhc2VGaWVsZC5oaW50X3RleHRcIj57eydTZWxlY3QgYW4gb3B0aW9uIGZyb20gdGhlIGRyb3Bkb3duJyB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIlxuICAgICpuZ0lmPVwiZHluYW1pY0xpc3RGb3JtQ29udHJvbC5lcnJvcnMgJiYgZHluYW1pY0xpc3RGb3JtQ29udHJvbC5kaXJ0eVwiPnt7KGR5bmFtaWNMaXN0Rm9ybUNvbnRyb2wuZXJyb3JzIHxcbiAgICBjY2RGaXJzdEVycm9yOmNhc2VGaWVsZC5sYWJlbCkgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cblxuICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGNjZC1kcm9wZG93biBib3R0b20tMzBcIiBbaWRdPVwiaWQoKVwiXG4gICAgW2Zvcm1Db250cm9sXT1cImR5bmFtaWNMaXN0Rm9ybUNvbnRyb2xcIj5cbiAgICA8b3B0aW9uIFtuZ1ZhbHVlXT1udWxsPnt7Jy0tU2VsZWN0IGEgdmFsdWUtLScgfCBycHhUcmFuc2xhdGV9fTwvb3B0aW9uPlxuICAgIDxvcHRpb24gW25nVmFsdWVdPVwidHlwZS5jb2RlXCIgKm5nRm9yPVwibGV0IHR5cGUgb2YgY2FzZUZpZWxkLmxpc3RfaXRlbXNcIiByb2xlPVwib3B0aW9uXCI+e3t0eXBlLmxhYmVsIHwgcnB4VHJhbnNsYXRlfX08L29wdGlvbj5cbiAgPC9zZWxlY3Q+XG48L2Rpdj5cbiJdfQ==