import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../pipes/case-reference/case-reference.pipe";
export class ReadNumberFieldComponent extends AbstractFieldReadComponent {
}
ReadNumberFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadNumberFieldComponent_BaseFactory; return function ReadNumberFieldComponent_Factory(t) { return (ɵReadNumberFieldComponent_BaseFactory || (ɵReadNumberFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadNumberFieldComponent)))(t || ReadNumberFieldComponent); }; }();
ReadNumberFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadNumberFieldComponent, selectors: [["ccd-read-number-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 3, consts: [[1, "text-16"]], template: function ReadNumberFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "ccdCaseReference");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx.caseField.value));
    } }, dependencies: [i1.CaseReferencePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadNumberFieldComponent, [{
        type: Component,
        args: [{
                selector: 'ccd-read-number-field',
                template: `<span class="text-16">{{caseField.value | ccdCaseReference}}</span>`
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1udW1iZXItZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbnVtYmVyL3JlYWQtbnVtYmVyLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7QUFNekYsTUFBTSxPQUFPLHdCQUF5QixTQUFRLDBCQUEwQjs7Z1JBQTNELHdCQUF3QixTQUF4Qix3QkFBd0I7MkVBQXhCLHdCQUF3QjtRQUZ4QiwrQkFBc0I7UUFBQSxZQUFzQzs7UUFBQSxpQkFBTzs7UUFBN0MsZUFBc0M7UUFBdEMsK0RBQXNDOzt1RkFFNUQsd0JBQXdCO2NBSnBDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUUscUVBQXFFO2FBQ2hGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtcmVhZC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtcmVhZC1udW1iZXItZmllbGQnLFxuICB0ZW1wbGF0ZTogYDxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7Y2FzZUZpZWxkLnZhbHVlIHwgY2NkQ2FzZVJlZmVyZW5jZX19PC9zcGFuPmBcbn0pXG5leHBvcnQgY2xhc3MgUmVhZE51bWJlckZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQge31cbiJdfQ==