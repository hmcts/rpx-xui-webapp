import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class ReadTextAreaFieldComponent extends AbstractFieldReadComponent {
}
ReadTextAreaFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadTextAreaFieldComponent_BaseFactory; return function ReadTextAreaFieldComponent_Factory(t) { return (ɵReadTextAreaFieldComponent_BaseFactory || (ɵReadTextAreaFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadTextAreaFieldComponent)))(t || ReadTextAreaFieldComponent); }; }();
ReadTextAreaFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadTextAreaFieldComponent, selectors: [["ccd-read-text-area-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 3, consts: [[2, "white-space", "pre-wrap"]], template: function ReadTextAreaFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "rpxTranslate");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx.caseField.value));
    } }, dependencies: [i1.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadTextAreaFieldComponent, [{
        type: Component,
        args: [{
                selector: 'ccd-read-text-area-field',
                template: `<span style="white-space: pre-wrap">{{caseField.value | rpxTranslate}}</span>`
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC10ZXh0LWFyZWEtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvdGV4dC1hcmVhL3JlYWQtdGV4dC1hcmVhLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7QUFNekYsTUFBTSxPQUFPLDBCQUEyQixTQUFRLDBCQUEwQjs7MFJBQTdELDBCQUEwQixTQUExQiwwQkFBMEI7NkVBQTFCLDBCQUEwQjtRQUYxQiwrQkFBb0M7UUFBQSxZQUFrQzs7UUFBQSxpQkFBTzs7UUFBekMsZUFBa0M7UUFBbEMsK0RBQWtDOzt1RkFFdEUsMEJBQTBCO2NBSnRDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxRQUFRLEVBQUUsK0VBQStFO2FBQzFGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtcmVhZC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtcmVhZC10ZXh0LWFyZWEtZmllbGQnLFxuICB0ZW1wbGF0ZTogYDxzcGFuIHN0eWxlPVwid2hpdGUtc3BhY2U6IHByZS13cmFwXCI+e3tjYXNlRmllbGQudmFsdWUgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5gXG59KVxuZXhwb3J0IGNsYXNzIFJlYWRUZXh0QXJlYUZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQge31cbiJdfQ==