import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
import * as i2 from "./dynamic-radio-list.pipe";
export class ReadDynamicRadioListFieldComponent extends AbstractFieldReadComponent {
    ngOnInit() {
        /**
         *
         * Reassigning list_items from formatted_list when list_items is empty
         */
        if (!this.caseField.list_items && this.caseField.formatted_value && this.caseField.formatted_value.list_items) {
            this.caseField.list_items = this.caseField.formatted_value.list_items;
        }
        /**
         *
         * Seems formatted_value can also be empty for DynamicRadioList's. Reassigning list_items from value.list_items in that case
         */
        if (!this.caseField.list_items && this.caseField.value && this.caseField.value.list_items) {
            this.caseField.list_items = this.caseField.value.list_items;
        }
    }
}
ReadDynamicRadioListFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadDynamicRadioListFieldComponent_BaseFactory; return function ReadDynamicRadioListFieldComponent_Factory(t) { return (ɵReadDynamicRadioListFieldComponent_BaseFactory || (ɵReadDynamicRadioListFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadDynamicRadioListFieldComponent)))(t || ReadDynamicRadioListFieldComponent); }; }();
ReadDynamicRadioListFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadDynamicRadioListFieldComponent, selectors: [["ccd-read-dynamic-radio-list-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "text-16"]], template: function ReadDynamicRadioListFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "rpxTranslate");
        i0.ɵɵpipe(3, "ccdDynamicRadioList");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx.caseField.value, ctx.caseField.list_items)));
    } }, dependencies: [i1.RpxTranslatePipe, i2.DynamicRadioListPipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadDynamicRadioListFieldComponent, [{
        type: Component,
        args: [{
                selector: 'ccd-read-dynamic-radio-list-field',
                template: '<span class="text-16">{{caseField.value | ccdDynamicRadioList:caseField.list_items | rpxTranslate}}</span>',
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1keW5hbWljLXJhZGlvLWxpc3QtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZHluYW1pYy1yYWRpby1saXN0L3JlYWQtZHluYW1pYy1yYWRpby1saXN0LWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7O0FBTXpGLE1BQU0sT0FBTyxrQ0FBbUMsU0FBUSwwQkFBMEI7SUFFekUsUUFBUTtRQUNiOzs7V0FHRztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUU7WUFDN0csSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1NBQ3ZFO1FBRUQ7OztXQUdHO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUN6RixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7U0FDN0Q7SUFDSCxDQUFDOztrVUFsQlUsa0NBQWtDLFNBQWxDLGtDQUFrQztxRkFBbEMsa0NBQWtDO1FBRmxDLCtCQUFzQjtRQUFBLFlBQTZFOzs7UUFBQSxpQkFBTzs7UUFBcEYsZUFBNkU7UUFBN0UsK0dBQTZFOzt1RkFFbkcsa0NBQWtDO2NBSjlDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsbUNBQW1DO2dCQUM3QyxRQUFRLEVBQUUsNEdBQTRHO2FBQ3ZIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC1yZWFkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1yZWFkLWR5bmFtaWMtcmFkaW8tbGlzdC1maWVsZCcsXG4gIHRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCI+e3tjYXNlRmllbGQudmFsdWUgfCBjY2REeW5hbWljUmFkaW9MaXN0OmNhc2VGaWVsZC5saXN0X2l0ZW1zIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVhZER5bmFtaWNSYWRpb0xpc3RGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZWFzc2lnbmluZyBsaXN0X2l0ZW1zIGZyb20gZm9ybWF0dGVkX2xpc3Qgd2hlbiBsaXN0X2l0ZW1zIGlzIGVtcHR5XG4gICAgICovXG4gICAgaWYgKCF0aGlzLmNhc2VGaWVsZC5saXN0X2l0ZW1zICYmIHRoaXMuY2FzZUZpZWxkLmZvcm1hdHRlZF92YWx1ZSAmJiB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUubGlzdF9pdGVtcykge1xuICAgICAgdGhpcy5jYXNlRmllbGQubGlzdF9pdGVtcyA9IHRoaXMuY2FzZUZpZWxkLmZvcm1hdHRlZF92YWx1ZS5saXN0X2l0ZW1zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlbXMgZm9ybWF0dGVkX3ZhbHVlIGNhbiBhbHNvIGJlIGVtcHR5IGZvciBEeW5hbWljUmFkaW9MaXN0J3MuIFJlYXNzaWduaW5nIGxpc3RfaXRlbXMgZnJvbSB2YWx1ZS5saXN0X2l0ZW1zIGluIHRoYXQgY2FzZVxuICAgICAqL1xuICAgIGlmICghdGhpcy5jYXNlRmllbGQubGlzdF9pdGVtcyAmJiB0aGlzLmNhc2VGaWVsZC52YWx1ZSAmJiB0aGlzLmNhc2VGaWVsZC52YWx1ZS5saXN0X2l0ZW1zKSB7XG4gICAgICB0aGlzLmNhc2VGaWVsZC5saXN0X2l0ZW1zID0gdGhpcy5jYXNlRmllbGQudmFsdWUubGlzdF9pdGVtcztcbiAgICB9XG4gIH1cbn1cbiJdfQ==