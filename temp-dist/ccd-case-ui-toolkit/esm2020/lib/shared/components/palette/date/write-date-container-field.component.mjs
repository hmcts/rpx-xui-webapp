import { Component } from '@angular/core';
import { AbstractFormFieldComponent } from '../base-field/abstract-form-field.component';
import * as i0 from "@angular/core";
function WriteDateContainerFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "ccd-datetime-picker", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", ctx_r0.caseField)("formGroup", ctx_r0.formGroup)("parent", ctx_r0.parent);
} }
function WriteDateContainerFieldComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-write-date-field", 2);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseField", ctx_r2.caseField)("formGroup", ctx_r2.formGroup)("parent", ctx_r2.parent);
} }
export class WriteDateContainerFieldComponent extends AbstractFormFieldComponent {
}
WriteDateContainerFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteDateContainerFieldComponent_BaseFactory; return function WriteDateContainerFieldComponent_Factory(t) { return (ɵWriteDateContainerFieldComponent_BaseFactory || (ɵWriteDateContainerFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteDateContainerFieldComponent)))(t || WriteDateContainerFieldComponent); }; }();
WriteDateContainerFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteDateContainerFieldComponent, selectors: [["ccd-write-date-container-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["nativeDatepicker", ""], [3, "caseField", "formGroup", "parent"]], template: function WriteDateContainerFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, WriteDateContainerFieldComponent_ng_container_0_Template, 2, 3, "ng-container", 0);
        i0.ɵɵtemplate(1, WriteDateContainerFieldComponent_ng_template_1_Template, 1, 3, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(2);
        i0.ɵɵproperty("ngIf", ctx.caseField.dateTimeEntryFormat)("ngIfElse", _r1);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteDateContainerFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-date-container-field', template: "<ng-container *ngIf=\"caseField.dateTimeEntryFormat; else nativeDatepicker\">\n  <ccd-datetime-picker\n    [caseField]=\"caseField\"\n    [formGroup]=\"formGroup\"\n    [parent]=\"parent\">\n  </ccd-datetime-picker>\n</ng-container>\n<ng-template #nativeDatepicker>\n  <ccd-write-date-field\n    [caseField]=\"caseField\"\n    [formGroup]=\"formGroup\"\n    [parent]=\"parent\"\n  ></ccd-write-date-field>\n</ng-template>\n\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtZGF0ZS1jb250YWluZXItZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZGF0ZS93cml0ZS1kYXRlLWNvbnRhaW5lci1maWVsZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9kYXRlL3dyaXRlLWRhdGUtY29udGFpbmVyLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7O0lDRHpGLDZCQUEyRTtJQUN6RSx5Q0FJc0I7SUFDeEIsMEJBQWU7OztJQUpYLGVBQXVCO0lBQXZCLDRDQUF1QiwrQkFBQSx5QkFBQTs7O0lBTXpCLDBDQUl3Qjs7O0lBSHRCLDRDQUF1QiwrQkFBQSx5QkFBQTs7QURGM0IsTUFBTSxPQUFPLGdDQUFpQyxTQUFRLDBCQUEwQjs7d1RBQW5FLGdDQUFnQyxTQUFoQyxnQ0FBZ0M7bUZBQWhDLGdDQUFnQztRQ1A3QyxtR0FNZTtRQUNmLGtJQU1jOzs7UUFiQyx3REFBcUMsaUJBQUE7O3VGRE92QyxnQ0FBZ0M7Y0FKNUMsU0FBUzsyQkFDRSxnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Rm9ybUZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1mb3JtLWZpZWxkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC13cml0ZS1kYXRlLWNvbnRhaW5lci1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93cml0ZS1kYXRlLWNvbnRhaW5lci1maWVsZC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBXcml0ZURhdGVDb250YWluZXJGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkQ29tcG9uZW50IHt9XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiY2FzZUZpZWxkLmRhdGVUaW1lRW50cnlGb3JtYXQ7IGVsc2UgbmF0aXZlRGF0ZXBpY2tlclwiPlxuICA8Y2NkLWRhdGV0aW1lLXBpY2tlclxuICAgIFtjYXNlRmllbGRdPVwiY2FzZUZpZWxkXCJcbiAgICBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiXG4gICAgW3BhcmVudF09XCJwYXJlbnRcIj5cbiAgPC9jY2QtZGF0ZXRpbWUtcGlja2VyPlxuPC9uZy1jb250YWluZXI+XG48bmctdGVtcGxhdGUgI25hdGl2ZURhdGVwaWNrZXI+XG4gIDxjY2Qtd3JpdGUtZGF0ZS1maWVsZFxuICAgIFtjYXNlRmllbGRdPVwiY2FzZUZpZWxkXCJcbiAgICBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiXG4gICAgW3BhcmVudF09XCJwYXJlbnRcIlxuICA+PC9jY2Qtd3JpdGUtZGF0ZS1maWVsZD5cbjwvbmctdGVtcGxhdGU+XG5cbiJdfQ==