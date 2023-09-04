import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "../utils/field-label.pipe";
import * as i4 from "../utils/first-error.pipe";
import * as i5 from "rpx-xui-translation";
function WriteDynamicRadioListFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFieldLabel");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind1(3, 3, ctx_r0.caseField)));
} }
function WriteDynamicRadioListFieldComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WriteDynamicRadioListFieldComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "Select an option below"));
} }
function WriteDynamicRadioListFieldComponent_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind1(3, 3, ctx_r3.dynamicRadioListControl.errors)));
} }
const _c0 = function (a0) { return { selected: a0 }; };
function WriteDynamicRadioListFieldComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵelement(1, "input", 11);
    i0.ɵɵelementStart(2, "label", 12);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const radioButton_r5 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c0, ctx_r4.dynamicRadioListControl.value === radioButton_r5.code));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("id", ctx_r4.createElementId(radioButton_r5.code))("name", ctx_r4.id())("formControl", ctx_r4.dynamicRadioListControl)("value", radioButton_r5.code);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("for", ctx_r4.createElementId(radioButton_r5.code));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 7, radioButton_r5.label));
} }
const _c1 = function (a0) { return { "form-group-error": a0 }; };
export class WriteDynamicRadioListFieldComponent extends AbstractFieldWriteComponent {
    ngOnInit() {
        /**
         * Reassigning list_items from formatted_list when list_items is empty
         */
        if (!this.caseField.list_items && this.caseField.formatted_value && this.caseField.formatted_value.list_items) {
            this.caseField.list_items = this.caseField.formatted_value.list_items;
        }
        if (!this.caseField.value && this.caseField.formatted_value && this.caseField.formatted_value.value) {
            this.caseField.value = this.caseField.formatted_value.value.code;
        }
        const isNull = this.caseField.value === undefined || this.caseField.value === '';
        if (isNull || typeof this.caseField.value === 'object') {
            this.caseField.value = [];
        }
        this.dynamicRadioListControl = this.registerControl(new FormControl(this.caseField.value));
        this.dynamicRadioListControl.setValue(this.caseField.value);
    }
    createElementId(name) {
        return this.parent && this.parent.value ? this.parent.value.id + this.parent.value.value : super.createElementId(name);
    }
}
WriteDynamicRadioListFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteDynamicRadioListFieldComponent_BaseFactory; return function WriteDynamicRadioListFieldComponent_Factory(t) { return (ɵWriteDynamicRadioListFieldComponent_BaseFactory || (ɵWriteDynamicRadioListFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteDynamicRadioListFieldComponent)))(t || WriteDynamicRadioListFieldComponent); }; }();
WriteDynamicRadioListFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteDynamicRadioListFieldComponent, selectors: [["ccd-write-dynamic-radio-list-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 10, vars: 10, consts: [[1, "form-group", "bottom-30", 3, "ngClass", "id"], [2, "display", "none"], [3, "for"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["class", "multiple-choice", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "form-label"], [1, "form-hint"], [1, "error-message"], [1, "multiple-choice", 3, "ngClass"], ["type", "radio", 1, "form-control", 3, "id", "name", "formControl", "value"], [1, "form-label", 3, "for"]], template: function WriteDynamicRadioListFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "fieldset");
        i0.ɵɵelement(2, "legend", 1);
        i0.ɵɵelementStart(3, "label", 2);
        i0.ɵɵtemplate(4, WriteDynamicRadioListFieldComponent_span_4_Template, 4, 5, "span", 3);
        i0.ɵɵtemplate(5, WriteDynamicRadioListFieldComponent_span_5_Template, 3, 3, "span", 4);
        i0.ɵɵtemplate(6, WriteDynamicRadioListFieldComponent_span_6_Template, 3, 3, "span", 3);
        i0.ɵɵtemplate(7, WriteDynamicRadioListFieldComponent_span_7_Template, 4, 5, "span", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementContainerStart(8);
        i0.ɵɵtemplate(9, WriteDynamicRadioListFieldComponent_div_9_Template, 5, 11, "div", 6);
        i0.ɵɵelementContainerEnd();
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c1, !ctx.dynamicRadioListControl.valid && ctx.dynamicRadioListControl.dirty))("id", ctx.id());
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("for", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.caseField.label && !ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.dynamicRadioListControl.errors && ctx.dynamicRadioListControl.dirty);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.caseField.list_items);
    } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i2.DefaultValueAccessor, i2.RadioControlValueAccessor, i2.NgControlStatus, i2.FormControlDirective, i3.FieldLabelPipe, i4.FirstErrorPipe, i5.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteDynamicRadioListFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-dynamic-radio-list-field', template: "<div class=\"form-group bottom-30\"\n    [ngClass]=\"{'form-group-error': !dynamicRadioListControl.valid && dynamicRadioListControl.dirty}\" [id]=\"id()\">\n  <fieldset>\n    <legend style=\"display: none;\"></legend>\n    <label [for]=\"id()\">\n        <span class=\"form-label\" *ngIf=\"caseField.label\">{{(caseField | ccdFieldLabel) | rpxTranslate}}</span>\n        <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate}}</span>\n        <span class=\"form-label\" *ngIf=\"!caseField.label && !caseField.hint_text\">{{'Select an option below' | rpxTranslate}}</span>\n        <span class=\"error-message\"\n            *ngIf=\"dynamicRadioListControl.errors && dynamicRadioListControl.dirty\">{{(dynamicRadioListControl.errors |\n            ccdFirstError) | rpxTranslate}}</span>\n    </label>\n\n    <ng-container>\n      <div class=\"multiple-choice\" *ngFor=\"let radioButton of caseField.list_items\" [ngClass]=\"{selected: dynamicRadioListControl.value === radioButton.code}\">\n        <input class=\"form-control\" [id]=\"createElementId(radioButton.code)\" [name]=\"id()\" type=\"radio\" [formControl]=\"dynamicRadioListControl\" [value]=\"radioButton.code\">\n        <label class=\"form-label\" [for]=\"createElementId(radioButton.code)\">{{radioButton.label | rpxTranslate}}</label>\n      </div>\n    </ng-container>\n  </fieldset>\n</div>\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtZHluYW1pYy1yYWRpby1saXN0LWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2R5bmFtaWMtcmFkaW8tbGlzdC93cml0ZS1keW5hbWljLXJhZGlvLWxpc3QtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZHluYW1pYy1yYWRpby1saXN0L3dyaXRlLWR5bmFtaWMtcmFkaW8tbGlzdC1maWVsZC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDhDQUE4QyxDQUFDOzs7Ozs7OztJQ0dqRiwrQkFBaUQ7SUFBQSxZQUE4Qzs7O0lBQUEsaUJBQU87OztJQUFyRCxlQUE4QztJQUE5QyxrRkFBOEM7OztJQUMvRiwrQkFBb0Q7SUFBQSxZQUFzQzs7SUFBQSxpQkFBTzs7O0lBQTdDLGVBQXNDO0lBQXRDLHNFQUFzQzs7O0lBQzFGLCtCQUEwRTtJQUFBLFlBQTJDOztJQUFBLGlCQUFPOztJQUFsRCxlQUEyQztJQUEzQyxvRUFBMkM7OztJQUNySCwrQkFDNEU7SUFBQSxZQUN6Qzs7O0lBQUEsaUJBQU87OztJQURrQyxlQUN6QztJQUR5Qyx1R0FDekM7Ozs7SUFJckMsK0JBQXlKO0lBQ3ZKLDRCQUFtSztJQUNuSyxpQ0FBb0U7SUFBQSxZQUFvQzs7SUFBQSxpQkFBUSxFQUFBOzs7O0lBRnBDLGtIQUEwRTtJQUMxSCxlQUF3QztJQUF4QyxnRUFBd0MscUJBQUEsK0NBQUEsOEJBQUE7SUFDMUMsZUFBeUM7SUFBekMsaUVBQXlDO0lBQUMsZUFBb0M7SUFBcEMsZ0VBQW9DOzs7QURSaEgsTUFBTSxPQUFPLG1DQUFvQyxTQUFRLDJCQUEyQjtJQUkzRSxRQUFRO1FBQ2I7O1dBRUc7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFO1lBQzdHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztTQUN2RTtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUU7WUFDbkcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztTQUNsRTtRQUVELE1BQU0sTUFBTSxHQUFZLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUM7UUFFMUYsSUFBSSxNQUFNLElBQUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQzNCO1FBRUQsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBZ0IsQ0FBQztRQUMxRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVNLGVBQWUsQ0FBQyxJQUFZO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6SCxDQUFDOzt1VUE1QlUsbUNBQW1DLFNBQW5DLG1DQUFtQztzRkFBbkMsbUNBQW1DO1FDUmhELDhCQUNrSCxlQUFBO1FBRTlHLDRCQUF3QztRQUN4QyxnQ0FBb0I7UUFDaEIsc0ZBQXNHO1FBQ3RHLHNGQUFpRztRQUNqRyxzRkFBNEg7UUFDNUgsc0ZBRTBDO1FBQzlDLGlCQUFRO1FBRVIsNkJBQWM7UUFDWixxRkFHTTtRQUNSLDBCQUFlO1FBQ2pCLGlCQUFXLEVBQUE7O1FBbEJULDZIQUFpRyxnQkFBQTtRQUcxRixlQUFZO1FBQVosOEJBQVk7UUFDVyxlQUFxQjtRQUFyQiwwQ0FBcUI7UUFDdEIsZUFBeUI7UUFBekIsOENBQXlCO1FBQ3hCLGVBQThDO1FBQTlDLHVFQUE4QztRQUVuRSxlQUFxRTtRQUFyRSw4RkFBcUU7UUFLdkIsZUFBdUI7UUFBdkIsa0RBQXVCOzt1RkROckUsbUNBQW1DO2NBSi9DLFNBQVM7MkJBQ0Usb0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Fic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC13cml0ZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2Qtd3JpdGUtZHluYW1pYy1yYWRpby1saXN0LWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dyaXRlLWR5bmFtaWMtcmFkaW8tbGlzdC1maWVsZC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBXcml0ZUR5bmFtaWNSYWRpb0xpc3RGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIGR5bmFtaWNSYWRpb0xpc3RDb250cm9sOiBGb3JtQ29udHJvbDtcblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLyoqXG4gICAgICogUmVhc3NpZ25pbmcgbGlzdF9pdGVtcyBmcm9tIGZvcm1hdHRlZF9saXN0IHdoZW4gbGlzdF9pdGVtcyBpcyBlbXB0eVxuICAgICAqL1xuICAgIGlmICghdGhpcy5jYXNlRmllbGQubGlzdF9pdGVtcyAmJiB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUgJiYgdGhpcy5jYXNlRmllbGQuZm9ybWF0dGVkX3ZhbHVlLmxpc3RfaXRlbXMpIHtcbiAgICAgIHRoaXMuY2FzZUZpZWxkLmxpc3RfaXRlbXMgPSB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUubGlzdF9pdGVtcztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY2FzZUZpZWxkLnZhbHVlICYmIHRoaXMuY2FzZUZpZWxkLmZvcm1hdHRlZF92YWx1ZSAmJiB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUudmFsdWUpIHtcbiAgICAgIHRoaXMuY2FzZUZpZWxkLnZhbHVlID0gdGhpcy5jYXNlRmllbGQuZm9ybWF0dGVkX3ZhbHVlLnZhbHVlLmNvZGU7XG4gICAgfVxuXG4gICAgY29uc3QgaXNOdWxsOiBib29sZWFuID0gdGhpcy5jYXNlRmllbGQudmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNhc2VGaWVsZC52YWx1ZSA9PT0gJyc7XG5cbiAgICBpZiAoaXNOdWxsIHx8IHR5cGVvZiB0aGlzLmNhc2VGaWVsZC52YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuY2FzZUZpZWxkLnZhbHVlID0gW107XG4gICAgfVxuXG4gICAgdGhpcy5keW5hbWljUmFkaW9MaXN0Q29udHJvbCA9IHRoaXMucmVnaXN0ZXJDb250cm9sKG5ldyBGb3JtQ29udHJvbCh0aGlzLmNhc2VGaWVsZC52YWx1ZSkpIGFzIEZvcm1Db250cm9sO1xuICAgIHRoaXMuZHluYW1pY1JhZGlvTGlzdENvbnRyb2wuc2V0VmFsdWUodGhpcy5jYXNlRmllbGQudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUVsZW1lbnRJZChuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC52YWx1ZSA/IHRoaXMucGFyZW50LnZhbHVlLmlkICsgdGhpcy5wYXJlbnQudmFsdWUudmFsdWUgOiBzdXBlci5jcmVhdGVFbGVtZW50SWQobmFtZSk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJvdHRvbS0zMFwiXG4gICAgW25nQ2xhc3NdPVwieydmb3JtLWdyb3VwLWVycm9yJzogIWR5bmFtaWNSYWRpb0xpc3RDb250cm9sLnZhbGlkICYmIGR5bmFtaWNSYWRpb0xpc3RDb250cm9sLmRpcnR5fVwiIFtpZF09XCJpZCgpXCI+XG4gIDxmaWVsZHNldD5cbiAgICA8bGVnZW5kIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj48L2xlZ2VuZD5cbiAgICA8bGFiZWwgW2Zvcl09XCJpZCgpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1sYWJlbFwiICpuZ0lmPVwiY2FzZUZpZWxkLmxhYmVsXCI+e3soY2FzZUZpZWxkIHwgY2NkRmllbGRMYWJlbCkgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmb3JtLWhpbnRcIiAqbmdJZj1cImNhc2VGaWVsZC5oaW50X3RleHRcIj57e2Nhc2VGaWVsZC5oaW50X3RleHQgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCIhY2FzZUZpZWxkLmxhYmVsICYmICFjYXNlRmllbGQuaGludF90ZXh0XCI+e3snU2VsZWN0IGFuIG9wdGlvbiBiZWxvdycgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJlcnJvci1tZXNzYWdlXCJcbiAgICAgICAgICAgICpuZ0lmPVwiZHluYW1pY1JhZGlvTGlzdENvbnRyb2wuZXJyb3JzICYmIGR5bmFtaWNSYWRpb0xpc3RDb250cm9sLmRpcnR5XCI+e3soZHluYW1pY1JhZGlvTGlzdENvbnRyb2wuZXJyb3JzIHxcbiAgICAgICAgICAgIGNjZEZpcnN0RXJyb3IpIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+XG4gICAgPC9sYWJlbD5cblxuICAgIDxuZy1jb250YWluZXI+XG4gICAgICA8ZGl2IGNsYXNzPVwibXVsdGlwbGUtY2hvaWNlXCIgKm5nRm9yPVwibGV0IHJhZGlvQnV0dG9uIG9mIGNhc2VGaWVsZC5saXN0X2l0ZW1zXCIgW25nQ2xhc3NdPVwie3NlbGVjdGVkOiBkeW5hbWljUmFkaW9MaXN0Q29udHJvbC52YWx1ZSA9PT0gcmFkaW9CdXR0b24uY29kZX1cIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW2lkXT1cImNyZWF0ZUVsZW1lbnRJZChyYWRpb0J1dHRvbi5jb2RlKVwiIFtuYW1lXT1cImlkKClcIiB0eXBlPVwicmFkaW9cIiBbZm9ybUNvbnRyb2xdPVwiZHluYW1pY1JhZGlvTGlzdENvbnRyb2xcIiBbdmFsdWVdPVwicmFkaW9CdXR0b24uY29kZVwiPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCIgW2Zvcl09XCJjcmVhdGVFbGVtZW50SWQocmFkaW9CdXR0b24uY29kZSlcIj57e3JhZGlvQnV0dG9uLmxhYmVsIHwgcnB4VHJhbnNsYXRlfX08L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZmllbGRzZXQ+XG48L2Rpdj5cbiJdfQ==