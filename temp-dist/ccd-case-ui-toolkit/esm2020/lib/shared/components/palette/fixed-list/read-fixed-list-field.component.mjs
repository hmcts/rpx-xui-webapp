import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
import * as i2 from "./fixed-list.pipe";
export class ReadFixedListFieldComponent extends AbstractFieldReadComponent {
}
ReadFixedListFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadFixedListFieldComponent_BaseFactory; return function ReadFixedListFieldComponent_Factory(t) { return (ɵReadFixedListFieldComponent_BaseFactory || (ɵReadFixedListFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadFixedListFieldComponent)))(t || ReadFixedListFieldComponent); }; }();
ReadFixedListFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadFixedListFieldComponent, selectors: [["ccd-read-fixed-list-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "text-16"]], template: function ReadFixedListFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "rpxTranslate");
        i0.ɵɵpipe(3, "ccdFixedList");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx.caseField.value, ctx.caseField.list_items)));
    } }, dependencies: [i1.RpxTranslatePipe, i2.FixedListPipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadFixedListFieldComponent, [{
        type: Component,
        args: [{
                selector: 'ccd-read-fixed-list-field',
                template: '<span class="text-16">{{caseField.value | ccdFixedList:caseField.list_items | rpxTranslate}}</span>',
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1maXhlZC1saXN0LWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2ZpeGVkLWxpc3QvcmVhZC1maXhlZC1saXN0LWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7O0FBTXpGLE1BQU0sT0FBTywyQkFBNEIsU0FBUSwwQkFBMEI7OytSQUE5RCwyQkFBMkIsU0FBM0IsMkJBQTJCOzhFQUEzQiwyQkFBMkI7UUFGM0IsK0JBQXNCO1FBQUEsWUFBc0U7OztRQUFBLGlCQUFPOztRQUE3RSxlQUFzRTtRQUF0RSwrR0FBc0U7O3VGQUU1RiwyQkFBMkI7Y0FKdkMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLFFBQVEsRUFBRSxxR0FBcUc7YUFDaEgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC1yZWFkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1yZWFkLWZpeGVkLWxpc3QtZmllbGQnLFxuICB0ZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7Y2FzZUZpZWxkLnZhbHVlIHwgY2NkRml4ZWRMaXN0OmNhc2VGaWVsZC5saXN0X2l0ZW1zIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVhZEZpeGVkTGlzdEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQge1xuXG59XG4iXX0=