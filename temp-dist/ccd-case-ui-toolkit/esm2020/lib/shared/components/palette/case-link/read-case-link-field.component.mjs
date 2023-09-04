import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../pipes/case-reference/case-reference.pipe";
function ReadCaseLinkFieldComponent_a_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 1)(1, "span", 2);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "ccdCaseReference");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate1("href", "/v2/case/", ctx_r0.caseField.value.CaseReference, "", i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.caseField.value.CaseReference ? i0.ɵɵpipeBind1(3, 2, ctx_r0.caseField.value.CaseReference) : "");
} }
export class ReadCaseLinkFieldComponent extends AbstractFieldReadComponent {
    hasReference() {
        return this.caseField.value && this.caseField.value.CaseReference;
    }
}
ReadCaseLinkFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadCaseLinkFieldComponent_BaseFactory; return function ReadCaseLinkFieldComponent_Factory(t) { return (ɵReadCaseLinkFieldComponent_BaseFactory || (ɵReadCaseLinkFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadCaseLinkFieldComponent)))(t || ReadCaseLinkFieldComponent); }; }();
ReadCaseLinkFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadCaseLinkFieldComponent, selectors: [["ccd-read-case-link-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["target", "_blank", 3, "href", 4, "ngIf"], ["target", "_blank", 3, "href"], [1, "text-16"]], template: function ReadCaseLinkFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ReadCaseLinkFieldComponent_a_0_Template, 4, 4, "a", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.hasReference());
    } }, dependencies: [i1.NgIf, i2.CaseReferencePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadCaseLinkFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-case-link-field', template: "<a *ngIf=\"hasReference()\" href=\"/v2/case/{{caseField.value.CaseReference}}\" target=\"_blank\">\n  <span class=\"text-16\">{{caseField.value.CaseReference ? (caseField.value.CaseReference | ccdCaseReference) : ''}}</span>\n</a>\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1jYXNlLWxpbmstZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1saW5rL3JlYWQtY2FzZS1saW5rLWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2Nhc2UtbGluay9yZWFkLWNhc2UtbGluay1maWVsZC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7Ozs7O0lDRHpGLDRCQUE0RixjQUFBO0lBQ3BFLFlBQTJGOztJQUFBLGlCQUFPLEVBQUE7OztJQURoRywwR0FBaUQ7SUFDbkQsZUFBMkY7SUFBM0YsNEhBQTJGOztBRE1uSCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsMEJBQTBCO0lBRWpFLFlBQVk7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7SUFDcEUsQ0FBQzs7MFJBSlUsMEJBQTBCLFNBQTFCLDBCQUEwQjs2RUFBMUIsMEJBQTBCO1FDUHZDLHVFQUVJOztRQUZBLHlDQUFvQjs7dUZET1gsMEJBQTBCO2NBSnRDLFNBQVM7MkJBQ0UsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtcmVhZC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtcmVhZC1jYXNlLWxpbmstZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJ3JlYWQtY2FzZS1saW5rLWZpZWxkLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFJlYWRDYXNlTGlua0ZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQge1xuXG4gIHB1YmxpYyBoYXNSZWZlcmVuY2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FzZUZpZWxkLnZhbHVlICYmIHRoaXMuY2FzZUZpZWxkLnZhbHVlLkNhc2VSZWZlcmVuY2U7XG4gIH1cbn1cbiIsIjxhICpuZ0lmPVwiaGFzUmVmZXJlbmNlKClcIiBocmVmPVwiL3YyL2Nhc2Uve3tjYXNlRmllbGQudmFsdWUuQ2FzZVJlZmVyZW5jZX19XCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gIDxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7Y2FzZUZpZWxkLnZhbHVlLkNhc2VSZWZlcmVuY2UgPyAoY2FzZUZpZWxkLnZhbHVlLkNhc2VSZWZlcmVuY2UgfCBjY2RDYXNlUmVmZXJlbmNlKSA6ICcnfX08L3NwYW4+XG48L2E+XG4iXX0=