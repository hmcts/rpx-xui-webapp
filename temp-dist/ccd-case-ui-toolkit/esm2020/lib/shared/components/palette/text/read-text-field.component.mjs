import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class ReadTextFieldComponent extends AbstractFieldReadComponent {
}
ReadTextFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadTextFieldComponent_BaseFactory; return function ReadTextFieldComponent_Factory(t) { return (ɵReadTextFieldComponent_BaseFactory || (ɵReadTextFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadTextFieldComponent)))(t || ReadTextFieldComponent); }; }();
ReadTextFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadTextFieldComponent, selectors: [["ccd-read-text-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 3, consts: [[1, "text-16"]], template: function ReadTextFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "rpxTranslate");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx.caseField.value));
    } }, dependencies: [i1.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadTextFieldComponent, [{
        type: Component,
        args: [{
                selector: 'ccd-read-text-field',
                template: `<span class="text-16">{{caseField.value | rpxTranslate}}</span>`
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC10ZXh0LWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL3RleHQvcmVhZC10ZXh0LWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7QUFNekYsTUFBTSxPQUFPLHNCQUF1QixTQUFRLDBCQUEwQjs7c1FBQXpELHNCQUFzQixTQUF0QixzQkFBc0I7eUVBQXRCLHNCQUFzQjtRQUZ0QiwrQkFBc0I7UUFBQSxZQUFrQzs7UUFBQSxpQkFBTzs7UUFBekMsZUFBa0M7UUFBbEMsK0RBQWtDOzt1RkFFeEQsc0JBQXNCO2NBSmxDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUsaUVBQWlFO2FBQzVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtcmVhZC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtcmVhZC10ZXh0LWZpZWxkJyxcbiAgdGVtcGxhdGU6IGA8c3BhbiBjbGFzcz1cInRleHQtMTZcIj57e2Nhc2VGaWVsZC52YWx1ZSB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPmBcbn0pXG5leHBvcnQgY2xhc3MgUmVhZFRleHRGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IHt9XG4iXX0=