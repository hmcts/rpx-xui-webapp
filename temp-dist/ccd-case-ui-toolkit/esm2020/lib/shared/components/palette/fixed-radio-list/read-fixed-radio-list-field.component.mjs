import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
import * as i2 from "./fixed-radio-list.pipe";
export class ReadFixedRadioListFieldComponent extends AbstractFieldReadComponent {
}
ReadFixedRadioListFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadFixedRadioListFieldComponent_BaseFactory; return function ReadFixedRadioListFieldComponent_Factory(t) { return (ɵReadFixedRadioListFieldComponent_BaseFactory || (ɵReadFixedRadioListFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadFixedRadioListFieldComponent)))(t || ReadFixedRadioListFieldComponent); }; }();
ReadFixedRadioListFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadFixedRadioListFieldComponent, selectors: [["ccd-read-fixed-radio-list-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "text-16"]], template: function ReadFixedRadioListFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "rpxTranslate");
        i0.ɵɵpipe(3, "ccdFixedRadioList");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx.caseField.value, ctx.caseField.field_type.fixed_list_items)));
    } }, dependencies: [i1.RpxTranslatePipe, i2.FixedRadioListPipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadFixedRadioListFieldComponent, [{
        type: Component,
        args: [{
                selector: 'ccd-read-fixed-radio-list-field',
                template: '<span class="text-16">{{caseField.value | ccdFixedRadioList:caseField.field_type.fixed_list_items | rpxTranslate}}</span>',
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1maXhlZC1yYWRpby1saXN0LWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2ZpeGVkLXJhZGlvLWxpc3QvcmVhZC1maXhlZC1yYWRpby1saXN0LWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7O0FBTXpGLE1BQU0sT0FBTyxnQ0FBaUMsU0FBUSwwQkFBMEI7O3dUQUFuRSxnQ0FBZ0MsU0FBaEMsZ0NBQWdDO21GQUFoQyxnQ0FBZ0M7UUFGaEMsK0JBQXNCO1FBQUEsWUFBNEY7OztRQUFBLGlCQUFPOztRQUFuRyxlQUE0RjtRQUE1RixnSUFBNEY7O3VGQUVsSCxnQ0FBZ0M7Y0FKNUMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxpQ0FBaUM7Z0JBQzNDLFFBQVEsRUFBRSwySEFBMkg7YUFDdEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC1yZWFkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1yZWFkLWZpeGVkLXJhZGlvLWxpc3QtZmllbGQnLFxuICB0ZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7Y2FzZUZpZWxkLnZhbHVlIHwgY2NkRml4ZWRSYWRpb0xpc3Q6Y2FzZUZpZWxkLmZpZWxkX3R5cGUuZml4ZWRfbGlzdF9pdGVtcyB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPicsXG59KVxuZXhwb3J0IGNsYXNzIFJlYWRGaXhlZFJhZGlvTGlzdEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgeyB9XG4iXX0=