import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ReadEmailFieldComponent_a_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 1);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate1("href", "mailto:", ctx_r0.caseField.value, "", i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.caseField.value);
} }
export class ReadEmailFieldComponent extends AbstractFieldReadComponent {
    isFieldValueEmpty() {
        return (!this.caseField.value);
    }
}
ReadEmailFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadEmailFieldComponent_BaseFactory; return function ReadEmailFieldComponent_Factory(t) { return (ɵReadEmailFieldComponent_BaseFactory || (ɵReadEmailFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadEmailFieldComponent)))(t || ReadEmailFieldComponent); }; }();
ReadEmailFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadEmailFieldComponent, selectors: [["ccd-read-email-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "href", 4, "ngIf"], [3, "href"]], template: function ReadEmailFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ReadEmailFieldComponent_a_0_Template, 2, 2, "a", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.isFieldValueEmpty());
    } }, dependencies: [i1.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadEmailFieldComponent, [{
        type: Component,
        args: [{
                selector: 'ccd-read-email-field',
                template: `
    <a *ngIf="!isFieldValueEmpty()" href=\"mailto:{{caseField.value}}\">{{caseField.value}}</a>
  `
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1lbWFpbC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9lbWFpbC9yZWFkLWVtYWlsLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7O0lBS3JGLDRCQUFvRTtJQUFBLFlBQW1CO0lBQUEsaUJBQUk7OztJQUEzRCwwRkFBbUM7SUFBQyxlQUFtQjtJQUFuQiw0Q0FBbUI7O0FBRzNGLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSwwQkFBMEI7SUFFOUQsaUJBQWlCO1FBQ3RCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7MlFBSlUsdUJBQXVCLFNBQXZCLHVCQUF1QjswRUFBdkIsdUJBQXVCO1FBSGhDLG9FQUEyRjs7UUFBdkYsK0NBQTBCOzt1RkFHckIsdUJBQXVCO2NBTm5DLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUU7O0dBRVQ7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL2Fic3RyYWN0LWZpZWxkLXJlYWQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXJlYWQtZW1haWwtZmllbGQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxhICpuZ0lmPVwiIWlzRmllbGRWYWx1ZUVtcHR5KClcIiBocmVmPVxcXCJtYWlsdG86e3tjYXNlRmllbGQudmFsdWV9fVxcXCI+e3tjYXNlRmllbGQudmFsdWV9fTwvYT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBSZWFkRW1haWxGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IHtcblxuICBwdWJsaWMgaXNGaWVsZFZhbHVlRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICghdGhpcy5jYXNlRmllbGQudmFsdWUpO1xuICB9XG5cbn1cbiJdfQ==