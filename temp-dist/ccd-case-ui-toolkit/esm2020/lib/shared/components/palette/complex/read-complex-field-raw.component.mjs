import { Component, Input } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
function ReadComplexFieldRawComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "dt", 2)(2, "span", 3);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "dd", 2);
    i0.ɵɵelement(6, "ccd-field-read", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const field_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("hidden", field_r1.hidden || field_r1.field_type.type === "Label");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 8, field_r1.label));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("hidden", field_r1.hidden);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", field_r1)("context", ctx_r0.context)("caseFields", ctx_r0.caseFields)("topLevelFormGroup", ctx_r0.topLevelFormGroup)("idPrefix", ctx_r0.idPrefix);
} }
const _c0 = function (a0, a4, a5) { return [a0, false, undefined, true, a4, a5]; };
/**
 * Display a complex type fields as a list of values without labels.
 * This is intended for rendering of Check Your Answer page.
 */
export class ReadComplexFieldRawComponent extends AbstractFieldReadComponent {
    constructor() {
        super(...arguments);
        this.caseFields = [];
    }
}
ReadComplexFieldRawComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadComplexFieldRawComponent_BaseFactory; return function ReadComplexFieldRawComponent_Factory(t) { return (ɵReadComplexFieldRawComponent_BaseFactory || (ɵReadComplexFieldRawComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadComplexFieldRawComponent)))(t || ReadComplexFieldRawComponent); }; }();
ReadComplexFieldRawComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadComplexFieldRawComponent, selectors: [["ccd-read-complex-field-raw"]], inputs: { caseFields: "caseFields" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 12, consts: [[1, "complex-raw"], [4, "ngFor", "ngForOf"], [3, "hidden"], [1, "text-16"], [3, "caseField", "context", "caseFields", "topLevelFormGroup", "idPrefix"]], template: function ReadComplexFieldRawComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "dl", 0);
        i0.ɵɵtemplate(1, ReadComplexFieldRawComponent_ng_container_1_Template, 7, 10, "ng-container", 1);
        i0.ɵɵpipe(2, "ccdReadFieldsFilter");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBindV(2, 1, i0.ɵɵpureFunction3(8, _c0, ctx.caseField, ctx.topLevelFormGroup, ctx.id())));
    } }, styles: ["dl.complex-raw[_ngcontent-%COMP%]{list-style-type:none;margin:5px 0 10px}dl.complex-raw[_ngcontent-%COMP%]   dl.complex-raw[_ngcontent-%COMP%]{padding-left:2ch}dl.complex-raw[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%]{font-weight:700}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadComplexFieldRawComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-complex-field-raw', template: "<dl class=\"complex-raw\">\n  <ng-container *ngFor=\"let field of caseField | ccdReadFieldsFilter:false :undefined :true :topLevelFormGroup :id()\">\n    <dt [hidden]=\"field.hidden || field.field_type.type === 'Label'\"><span class=\"text-16\">{{field.label | rpxTranslate}}</span></dt>\n    <dd [hidden]=\"field.hidden\">\n      <ccd-field-read [caseField]=\"field\" [context]=\"context\" [caseFields]=\"caseFields\" [topLevelFormGroup]=\"topLevelFormGroup\" [idPrefix]=\"idPrefix\"></ccd-field-read>\n    </dd>\n  </ng-container>\n</dl>\n", styles: ["dl.complex-raw{list-style-type:none;margin:5px 0 10px}dl.complex-raw dl.complex-raw{padding-left:2ch}dl.complex-raw dt{font-weight:700}\n"] }]
    }], null, { caseFields: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1jb21wbGV4LWZpZWxkLXJhdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9jb21wbGV4L3JlYWQtY29tcGxleC1maWVsZC1yYXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY29tcGxleC9yZWFkLWNvbXBsZXgtZmllbGQtcmF3Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7OztJQ0R2Riw2QkFBb0g7SUFDbEgsNkJBQWlFLGNBQUE7SUFBc0IsWUFBOEI7O0lBQUEsaUJBQU8sRUFBQTtJQUM1SCw2QkFBNEI7SUFDMUIsb0NBQWlLO0lBQ25LLGlCQUFLO0lBQ1AsMEJBQWU7Ozs7SUFKVCxlQUE0RDtJQUE1RCxnRkFBNEQ7SUFBdUIsZUFBOEI7SUFBOUIsMERBQThCO0lBQ2pILGVBQXVCO0lBQXZCLHdDQUF1QjtJQUNULGVBQW1CO0lBQW5CLG9DQUFtQiwyQkFBQSxpQ0FBQSwrQ0FBQSw2QkFBQTs7O0FEQXpDOzs7R0FHRztBQVFILE1BQU0sT0FBTyw0QkFBNkIsU0FBUSwwQkFBMEI7SUFQNUU7O1FBVVMsZUFBVSxHQUFnQixFQUFFLENBQUM7S0FDckM7O29TQUpZLDRCQUE0QixTQUE1Qiw0QkFBNEI7K0VBQTVCLDRCQUE0QjtRQ2Z6Qyw2QkFBd0I7UUFDdEIsZ0dBS2U7O1FBQ2pCLGlCQUFLOztRQU42QixlQUFrRjtRQUFsRiwwSEFBa0Y7O3VGRGN2Ryw0QkFBNEI7Y0FQeEMsU0FBUzsyQkFDRSw0QkFBNEI7Z0JBUy9CLFVBQVU7a0JBRGhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL2Fic3RyYWN0LWZpZWxkLXJlYWQuY29tcG9uZW50JztcblxuLyoqXG4gKiBEaXNwbGF5IGEgY29tcGxleCB0eXBlIGZpZWxkcyBhcyBhIGxpc3Qgb2YgdmFsdWVzIHdpdGhvdXQgbGFiZWxzLlxuICogVGhpcyBpcyBpbnRlbmRlZCBmb3IgcmVuZGVyaW5nIG9mIENoZWNrIFlvdXIgQW5zd2VyIHBhZ2UuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1yZWFkLWNvbXBsZXgtZmllbGQtcmF3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlYWQtY29tcGxleC1maWVsZC1yYXcuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICcuL3JlYWQtY29tcGxleC1maWVsZC1yYXcuc2NzcydcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUmVhZENvbXBsZXhGaWVsZFJhd0NvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgY2FzZUZpZWxkczogQ2FzZUZpZWxkW10gPSBbXTtcbn1cbiIsIjxkbCBjbGFzcz1cImNvbXBsZXgtcmF3XCI+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpZWxkIG9mIGNhc2VGaWVsZCB8IGNjZFJlYWRGaWVsZHNGaWx0ZXI6ZmFsc2UgOnVuZGVmaW5lZCA6dHJ1ZSA6dG9wTGV2ZWxGb3JtR3JvdXAgOmlkKClcIj5cbiAgICA8ZHQgW2hpZGRlbl09XCJmaWVsZC5oaWRkZW4gfHwgZmllbGQuZmllbGRfdHlwZS50eXBlID09PSAnTGFiZWwnXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCI+e3tmaWVsZC5sYWJlbCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPjwvZHQ+XG4gICAgPGRkIFtoaWRkZW5dPVwiZmllbGQuaGlkZGVuXCI+XG4gICAgICA8Y2NkLWZpZWxkLXJlYWQgW2Nhc2VGaWVsZF09XCJmaWVsZFwiIFtjb250ZXh0XT1cImNvbnRleHRcIiBbY2FzZUZpZWxkc109XCJjYXNlRmllbGRzXCIgW3RvcExldmVsRm9ybUdyb3VwXT1cInRvcExldmVsRm9ybUdyb3VwXCIgW2lkUHJlZml4XT1cImlkUHJlZml4XCI+PC9jY2QtZmllbGQtcmVhZD5cbiAgICA8L2RkPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGw+XG4iXX0=