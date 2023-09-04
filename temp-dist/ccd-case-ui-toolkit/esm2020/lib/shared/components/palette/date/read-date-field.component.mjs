import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "../utils/date.pipe";
export class ReadDateFieldComponent extends AbstractFieldReadComponent {
    constructor() {
        super(...arguments);
        this.timeZone = 'utc';
    }
}
ReadDateFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadDateFieldComponent_BaseFactory; return function ReadDateFieldComponent_Factory(t) { return (ɵReadDateFieldComponent_BaseFactory || (ɵReadDateFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadDateFieldComponent)))(t || ReadDateFieldComponent); }; }();
ReadDateFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadDateFieldComponent, selectors: [["ccd-read-date-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 5, consts: [[1, "text-16"]], template: function ReadDateFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "ccdDate");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind3(2, 1, ctx.caseField.value, "utc", ctx.caseField.dateTimeDisplayFormat));
    } }, dependencies: [i1.DatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadDateFieldComponent, [{
        type: Component,
        args: [{
                selector: 'ccd-read-date-field',
                template: `<span class="text-16">{{caseField.value | ccdDate:'utc':caseField.dateTimeDisplayFormat}}</span>`
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1kYXRlLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2RhdGUvcmVhZC1kYXRlLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7QUFNekYsTUFBTSxPQUFPLHNCQUF1QixTQUFRLDBCQUEwQjtJQUp0RTs7UUFLUyxhQUFRLEdBQUcsS0FBSyxDQUFDO0tBQ3pCOztzUUFGWSxzQkFBc0IsU0FBdEIsc0JBQXNCO3lFQUF0QixzQkFBc0I7UUFGdEIsK0JBQXNCO1FBQUEsWUFBbUU7O1FBQUEsaUJBQU87O1FBQTFFLGVBQW1FO1FBQW5FLDJHQUFtRTs7dUZBRXpGLHNCQUFzQjtjQUpsQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFLGtHQUFrRzthQUM3RyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL2Fic3RyYWN0LWZpZWxkLXJlYWQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXJlYWQtZGF0ZS1maWVsZCcsXG4gIHRlbXBsYXRlOiBgPHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCI+e3tjYXNlRmllbGQudmFsdWUgfCBjY2REYXRlOid1dGMnOmNhc2VGaWVsZC5kYXRlVGltZURpc3BsYXlGb3JtYXR9fTwvc3Bhbj5gXG59KVxuZXhwb3J0IGNsYXNzIFJlYWREYXRlRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB7XG4gIHB1YmxpYyB0aW1lWm9uZSA9ICd1dGMnO1xufVxuIl19