import { Component, ViewChild } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { WriteComplexFieldComponent } from '../complex/write-complex-field.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "../utils/field-label.pipe";
import * as i4 from "../utils/first-error.pipe";
import * as i5 from "rpx-xui-translation";
const _c0 = ["writeComplexFieldComponent"];
function WriteCaseLinkFieldComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFieldLabel");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind1(3, 3, ctx_r0.caseField)));
} }
function WriteCaseLinkFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WriteCaseLinkFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r2.caseReferenceControl.errors, ctx_r2.caseField.label)), " ");
} }
const _c1 = function (a0) { return { "form-group-error": a0 }; };
export class WriteCaseLinkFieldComponent extends AbstractFieldWriteComponent {
    ngOnInit() {
        if (this.caseField.value) {
            this.caseLinkGroup = this.registerControl(new UntypedFormGroup({
                CaseReference: new FormControl(this.caseField.value.CaseReference, Validators.required),
            }), true);
        }
        else {
            this.caseLinkGroup = this.registerControl(new UntypedFormGroup({
                CaseReference: new FormControl(null, Validators.required),
            }), true);
        }
        this.caseReferenceControl = this.caseLinkGroup.controls['CaseReference'];
        this.caseReferenceControl.setValidators(this.caseReferenceValidator());
        // Ensure that all sub-fields inherit the same value for retain_hidden_value as this parent; although a CaseLink
        // field uses the Complex type, it is meant to be treated as one field
        if (this.caseField && this.caseField.field_type.type === 'Complex') {
            for (const caseLinkSubField of this.caseField.field_type.complex_fields) {
                caseLinkSubField.retain_hidden_value = this.caseField.retain_hidden_value;
            }
        }
    }
    caseReferenceValidator() {
        return (control) => {
            if (control.value) {
                if (this.validCaseReference(control.value)) {
                    return null;
                }
                return { error: 'Please use a valid 16 Digit Case Reference' };
            }
            else {
                if (control.touched) {
                    return { error: 'Please use a valid 16 Digit Case Reference' };
                }
            }
            return null;
        };
    }
    validCaseReference(valueString) {
        if (!valueString) {
            return false;
        }
        return new RegExp('^\\b\\d{4}[ -]?\\d{4}[ -]?\\d{4}[ -]?\\d{4}\\b$').test(valueString.trim());
    }
}
WriteCaseLinkFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteCaseLinkFieldComponent_BaseFactory; return function WriteCaseLinkFieldComponent_Factory(t) { return (ɵWriteCaseLinkFieldComponent_BaseFactory || (ɵWriteCaseLinkFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteCaseLinkFieldComponent)))(t || WriteCaseLinkFieldComponent); }; }();
WriteCaseLinkFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteCaseLinkFieldComponent, selectors: [["ccd-write-case-link-field"]], viewQuery: function WriteCaseLinkFieldComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.writeComplexFieldComponent = _t.first);
    } }, features: [i0.ɵɵInheritDefinitionFeature], decls: 6, vars: 9, consts: [[1, "form-group", 3, "ngClass"], [3, "for"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["type", "text", 1, "form-control", "bottom-30", 3, "id", "formControl"], [1, "form-label"], [1, "form-hint"], [1, "error-message"]], template: function WriteCaseLinkFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "label", 1);
        i0.ɵɵtemplate(2, WriteCaseLinkFieldComponent_span_2_Template, 4, 5, "span", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, WriteCaseLinkFieldComponent_span_3_Template, 3, 3, "span", 3);
        i0.ɵɵtemplate(4, WriteCaseLinkFieldComponent_span_4_Template, 4, 6, "span", 4);
        i0.ɵɵelement(5, "input", 5);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c1, !ctx.caseReferenceControl.valid && (ctx.caseReferenceControl.dirty || ctx.caseReferenceControl.touched)));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("for", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseReferenceControl.errors && (ctx.caseReferenceControl.dirty || ctx.caseReferenceControl.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("id", ctx.id())("formControl", ctx.caseReferenceControl);
    } }, dependencies: [i1.NgClass, i1.NgIf, i2.DefaultValueAccessor, i2.NgControlStatus, i2.FormControlDirective, i3.FieldLabelPipe, i4.FirstErrorPipe, i5.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteCaseLinkFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-case-link-field', template: "<div class=\"form-group\" [ngClass]=\"{'form-group-error': !caseReferenceControl.valid && (caseReferenceControl.dirty || caseReferenceControl.touched)}\">\n  <label [for]=\"id()\">\n    <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel | rpxTranslate}}</span>\n  </label>\n  <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate}}</span>\n  <span class=\"error-message\" *ngIf=\"caseReferenceControl.errors && (caseReferenceControl.dirty || caseReferenceControl.touched)\">\n    {{ caseReferenceControl.errors | ccdFirstError:caseField.label | rpxTranslate}}\n  </span>\n  <input class=\"form-control bottom-30\" [id]=\"id()\" type=\"text\" [formControl]=\"caseReferenceControl\">\n</div>\n" }]
    }], null, { writeComplexFieldComponent: [{
            type: ViewChild,
            args: ['writeComplexFieldComponent']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtY2FzZS1saW5rLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2Nhc2UtbGluay93cml0ZS1jYXNlLWxpbmstZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1saW5rL3dyaXRlLWNhc2UtbGluay1maWVsZC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBbUIsV0FBVyxFQUFFLGdCQUFnQixFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpHLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzNGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7Ozs7SUNGbEYsK0JBQWlEO0lBQUEsWUFBNEM7OztJQUFBLGlCQUFPOzs7SUFBbkQsZUFBNEM7SUFBNUMsa0ZBQTRDOzs7SUFFL0YsK0JBQW9EO0lBQUEsWUFBc0M7O0lBQUEsaUJBQU87OztJQUE3QyxlQUFzQztJQUF0QyxzRUFBc0M7OztJQUMxRiwrQkFBZ0k7SUFDOUgsWUFDRjs7O0lBQUEsaUJBQU87OztJQURMLGVBQ0Y7SUFERSx1SUFDRjs7O0FER0YsTUFBTSxPQUFPLDJCQUE0QixTQUFRLDJCQUEyQjtJQVFuRSxRQUFRO1FBQ2IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQztnQkFDN0QsYUFBYSxFQUFFLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO2FBQ3hGLENBQUMsRUFBRSxJQUFJLENBQXFCLENBQUM7U0FDL0I7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLGdCQUFnQixDQUFDO2dCQUM3RCxhQUFhLEVBQUUsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7YUFDMUQsQ0FBQyxFQUFFLElBQUksQ0FBcUIsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7UUFFdkUsZ0hBQWdIO1FBQ2hILHNFQUFzRTtRQUN0RSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNsRSxLQUFLLE1BQU0sZ0JBQWdCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFO2dCQUN2RSxnQkFBZ0IsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDO2FBQzNFO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sc0JBQXNCO1FBQzVCLE9BQU8sQ0FBQyxPQUF3QixFQUEwQixFQUFFO1lBQzFELElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDakIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMxQyxPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCxPQUFPLEVBQUUsS0FBSyxFQUFFLDRDQUE0QyxFQUFFLENBQUM7YUFDaEU7aUJBQU07Z0JBQ0wsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUNuQixPQUFPLEVBQUUsS0FBSyxFQUFFLDRDQUE0QyxFQUFFLENBQUM7aUJBQ2hFO2FBQ0Y7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxXQUFtQjtRQUM1QyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksTUFBTSxDQUFDLGlEQUFpRCxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7OytSQW5EVSwyQkFBMkIsU0FBM0IsMkJBQTJCOzhFQUEzQiwyQkFBMkI7Ozs7OztRQ1Z4Qyw4QkFBc0osZUFBQTtRQUVsSiw4RUFBb0c7UUFDdEcsaUJBQVE7UUFDUiw4RUFBaUc7UUFDakcsOEVBRU87UUFDUCwyQkFBbUc7UUFDckcsaUJBQU07O1FBVGtCLDZKQUE2SDtRQUM1SSxlQUFZO1FBQVosOEJBQVk7UUFDUyxlQUFxQjtRQUFyQiwwQ0FBcUI7UUFFeEIsZUFBeUI7UUFBekIsOENBQXlCO1FBQ3JCLGVBQWlHO1FBQWpHLDhIQUFpRztRQUd4RixlQUFXO1FBQVgsNkJBQVcseUNBQUE7O3VGREV0QywyQkFBMkI7Y0FKdkMsU0FBUzsyQkFDRSwyQkFBMkI7Z0JBUzlCLDBCQUEwQjtrQkFEaEMsU0FBUzttQkFBQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC13cml0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV3JpdGVDb21wbGV4RmllbGRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wbGV4L3dyaXRlLWNvbXBsZXgtZmllbGQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXdyaXRlLWNhc2UtbGluay1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnd3JpdGUtY2FzZS1saW5rLWZpZWxkLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFdyaXRlQ2FzZUxpbmtGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIGNhc2VSZWZlcmVuY2VDb250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG4gIHB1YmxpYyBjYXNlTGlua0dyb3VwOiBVbnR5cGVkRm9ybUdyb3VwO1xuXG4gIEBWaWV3Q2hpbGQoJ3dyaXRlQ29tcGxleEZpZWxkQ29tcG9uZW50JylcbiAgcHVibGljIHdyaXRlQ29tcGxleEZpZWxkQ29tcG9uZW50OiBXcml0ZUNvbXBsZXhGaWVsZENvbXBvbmVudDtcblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FzZUZpZWxkLnZhbHVlKSB7XG4gICAgICB0aGlzLmNhc2VMaW5rR3JvdXAgPSB0aGlzLnJlZ2lzdGVyQ29udHJvbChuZXcgVW50eXBlZEZvcm1Hcm91cCh7XG4gICAgICAgIENhc2VSZWZlcmVuY2U6IG5ldyBGb3JtQ29udHJvbCh0aGlzLmNhc2VGaWVsZC52YWx1ZS5DYXNlUmVmZXJlbmNlLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcbiAgICAgIH0pLCB0cnVlKSBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhc2VMaW5rR3JvdXAgPSB0aGlzLnJlZ2lzdGVyQ29udHJvbChuZXcgVW50eXBlZEZvcm1Hcm91cCh7XG4gICAgICAgIENhc2VSZWZlcmVuY2U6IG5ldyBGb3JtQ29udHJvbChudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcbiAgICAgIH0pLCB0cnVlKSBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgIH1cbiAgICB0aGlzLmNhc2VSZWZlcmVuY2VDb250cm9sID0gdGhpcy5jYXNlTGlua0dyb3VwLmNvbnRyb2xzWydDYXNlUmVmZXJlbmNlJ107XG4gICAgdGhpcy5jYXNlUmVmZXJlbmNlQ29udHJvbC5zZXRWYWxpZGF0b3JzKHRoaXMuY2FzZVJlZmVyZW5jZVZhbGlkYXRvcigpKTtcblxuICAgIC8vIEVuc3VyZSB0aGF0IGFsbCBzdWItZmllbGRzIGluaGVyaXQgdGhlIHNhbWUgdmFsdWUgZm9yIHJldGFpbl9oaWRkZW5fdmFsdWUgYXMgdGhpcyBwYXJlbnQ7IGFsdGhvdWdoIGEgQ2FzZUxpbmtcbiAgICAvLyBmaWVsZCB1c2VzIHRoZSBDb21wbGV4IHR5cGUsIGl0IGlzIG1lYW50IHRvIGJlIHRyZWF0ZWQgYXMgb25lIGZpZWxkXG4gICAgaWYgKHRoaXMuY2FzZUZpZWxkICYmIHRoaXMuY2FzZUZpZWxkLmZpZWxkX3R5cGUudHlwZSA9PT0gJ0NvbXBsZXgnKSB7XG4gICAgICBmb3IgKGNvbnN0IGNhc2VMaW5rU3ViRmllbGQgb2YgdGhpcy5jYXNlRmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcykge1xuICAgICAgICBjYXNlTGlua1N1YkZpZWxkLnJldGFpbl9oaWRkZW5fdmFsdWUgPSB0aGlzLmNhc2VGaWVsZC5yZXRhaW5faGlkZGVuX3ZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FzZVJlZmVyZW5jZVZhbGlkYXRvcigpOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcbiAgICAgIGlmIChjb250cm9sLnZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkQ2FzZVJlZmVyZW5jZShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGVycm9yOiAnUGxlYXNlIHVzZSBhIHZhbGlkIDE2IERpZ2l0IENhc2UgUmVmZXJlbmNlJyB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNvbnRyb2wudG91Y2hlZCkge1xuICAgICAgICAgIHJldHVybiB7IGVycm9yOiAnUGxlYXNlIHVzZSBhIHZhbGlkIDE2IERpZ2l0IENhc2UgUmVmZXJlbmNlJyB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZENhc2VSZWZlcmVuY2UodmFsdWVTdHJpbmc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghdmFsdWVTdHJpbmcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJ15cXFxcYlxcXFxkezR9WyAtXT9cXFxcZHs0fVsgLV0/XFxcXGR7NH1bIC1dP1xcXFxkezR9XFxcXGIkJykudGVzdCh2YWx1ZVN0cmluZy50cmltKCkpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIFtuZ0NsYXNzXT1cInsnZm9ybS1ncm91cC1lcnJvcic6ICFjYXNlUmVmZXJlbmNlQ29udHJvbC52YWxpZCAmJiAoY2FzZVJlZmVyZW5jZUNvbnRyb2wuZGlydHkgfHwgY2FzZVJlZmVyZW5jZUNvbnRyb2wudG91Y2hlZCl9XCI+XG4gIDxsYWJlbCBbZm9yXT1cImlkKClcIj5cbiAgICA8c3BhbiBjbGFzcz1cImZvcm0tbGFiZWxcIiAqbmdJZj1cImNhc2VGaWVsZC5sYWJlbFwiPnt7Y2FzZUZpZWxkIHwgY2NkRmllbGRMYWJlbCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8L2xhYmVsPlxuICA8c3BhbiBjbGFzcz1cImZvcm0taGludFwiICpuZ0lmPVwiY2FzZUZpZWxkLmhpbnRfdGV4dFwiPnt7Y2FzZUZpZWxkLmhpbnRfdGV4dCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImNhc2VSZWZlcmVuY2VDb250cm9sLmVycm9ycyAmJiAoY2FzZVJlZmVyZW5jZUNvbnRyb2wuZGlydHkgfHwgY2FzZVJlZmVyZW5jZUNvbnRyb2wudG91Y2hlZClcIj5cbiAgICB7eyBjYXNlUmVmZXJlbmNlQ29udHJvbC5lcnJvcnMgfCBjY2RGaXJzdEVycm9yOmNhc2VGaWVsZC5sYWJlbCB8IHJweFRyYW5zbGF0ZX19XG4gIDwvc3Bhbj5cbiAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIGJvdHRvbS0zMFwiIFtpZF09XCJpZCgpXCIgdHlwZT1cInRleHRcIiBbZm9ybUNvbnRyb2xdPVwiY2FzZVJlZmVyZW5jZUNvbnRyb2xcIj5cbjwvZGl2PlxuIl19