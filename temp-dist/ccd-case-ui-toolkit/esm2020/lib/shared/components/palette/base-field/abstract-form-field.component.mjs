import { Directive, Input } from '@angular/core';
import { FormArray, UntypedFormGroup } from '@angular/forms';
import { CaseField } from '../../../domain/definition/case-field.model';
import { FieldsUtils } from '../../../services/fields/fields.utils';
import * as i0 from "@angular/core";
export class AbstractFormFieldComponent {
    constructor() {
        this.idPrefix = '';
    }
    id() {
        return this.idPrefix + this.caseField.id;
    }
    registerControl(control, replace = false) {
        const container = this.parent || this.formGroup;
        if (!container) {
            return control;
        }
        const existing = container.controls[this.caseField.id];
        if (existing) {
            if (replace) {
                // Set the validators on the replacement with what already exists.
                control.setValidators(existing.validator);
            }
            else {
                return existing;
            }
        }
        this.addValidators(this.caseField, control);
        FieldsUtils.addCaseFieldAndComponentReferences(control, this.caseField, this);
        return this.addControlToParent(control, container, replace);
    }
    addValidators(caseField, control) {
        // No validators by default, override this method to add validators to the form control
    }
    addControlToParent(control, parent, replace) {
        if (parent instanceof FormArray) {
            return this.addControlToFormArray(control, parent, replace);
        }
        return this.addControlToFormGroup(control, parent, replace);
    }
    addControlToFormArray(control, parent, replace) {
        const index = parseInt(this.caseField.id, 10);
        if (replace && !isNaN(index)) {
            parent.setControl(index, control);
        }
        else {
            parent.push(control);
        }
        return control;
    }
    addControlToFormGroup(control, parent, replace) {
        if (replace) {
            if (this.caseField.field_type && this.caseField.field_type.id === 'CaseLink' && this.caseField.field_type.type === 'Complex' && /^-?\d+$/.test(this.caseField.id)) {
                parent.setControl('CaseReference', control['controls']['CaseReference']);
            }
            else {
                parent.setControl(this.caseField.id, control);
            }
        }
        else {
            parent.addControl(this.caseField.id, control);
        }
        return control;
    }
}
AbstractFormFieldComponent.ɵfac = function AbstractFormFieldComponent_Factory(t) { return new (t || AbstractFormFieldComponent)(); };
AbstractFormFieldComponent.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AbstractFormFieldComponent, inputs: { caseField: "caseField", formGroup: "formGroup", parent: "parent", idPrefix: "idPrefix" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AbstractFormFieldComponent, [{
        type: Directive
    }], null, { caseField: [{
            type: Input
        }], formGroup: [{
            type: Input
        }], parent: [{
            type: Input
        }], idPrefix: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtZm9ybS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9iYXNlLWZpZWxkL2Fic3RyYWN0LWZvcm0tZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBbUIsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFNcEUsTUFBTSxPQUFnQiwwQkFBMEI7SUFEaEQ7UUFZUyxhQUFRLEdBQUcsRUFBRSxDQUFDO0tBMER0QjtJQXhEUSxFQUFFO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFUyxlQUFlLENBQTRCLE9BQVUsRUFBRSxPQUFPLEdBQUcsS0FBSztRQUM5RSxNQUFNLFNBQVMsR0FBa0IsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9ELElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUNELE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksT0FBTyxFQUFFO2dCQUNYLGtFQUFrRTtnQkFDbEUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDM0M7aUJBQU07Z0JBQ0wsT0FBTyxRQUFRLENBQUM7YUFDakI7U0FDRjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QyxXQUFXLENBQUMsa0NBQWtDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUUsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRVMsYUFBYSxDQUFDLFNBQW9CLEVBQUUsT0FBd0I7UUFDcEUsdUZBQXVGO0lBQ3pGLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxPQUF3QixFQUFFLE1BQXFCLEVBQUUsT0FBZ0I7UUFDMUYsSUFBSSxNQUFNLFlBQVksU0FBUyxFQUFFO1lBQy9CLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxPQUF3QixFQUFFLE1BQWlCLEVBQUUsT0FBZ0I7UUFDekYsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ25DO2FBQU07WUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVPLHFCQUFxQixDQUFDLE9BQXdCLEVBQUUsTUFBd0IsRUFBRSxPQUFnQjtRQUNoRyxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDakssTUFBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7YUFDMUU7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUMvQztTQUNGO2FBQU07WUFDTCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7b0dBcEVtQiwwQkFBMEI7NkVBQTFCLDBCQUEwQjt1RkFBMUIsMEJBQTBCO2NBRC9DLFNBQVM7Z0JBR0QsU0FBUztrQkFEZixLQUFLO1lBSUMsU0FBUztrQkFEZixLQUFLO1lBSUMsTUFBTTtrQkFEWixLQUFLO1lBSUMsUUFBUTtrQkFEZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQXJyYXksIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENhc2VGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2Nhc2UtZmllbGQubW9kZWwnO1xuaW1wb3J0IHsgRmllbGRzVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9maWVsZHMvZmllbGRzLnV0aWxzJztcblxuXG50eXBlIEZvcm1Db250YWluZXIgPSBVbnR5cGVkRm9ybUdyb3VwIHwgRm9ybUFycmF5O1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZvcm1GaWVsZENvbXBvbmVudCB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlRmllbGQ6IENhc2VGaWVsZDtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBwYXJlbnQ/OiBGb3JtQ29udGFpbmVyO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpZFByZWZpeCA9ICcnO1xuXG4gIHB1YmxpYyBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pZFByZWZpeCArIHRoaXMuY2FzZUZpZWxkLmlkO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyQ29udHJvbDxUIGV4dGVuZHMgQWJzdHJhY3RDb250cm9sPihjb250cm9sOiBULCByZXBsYWNlID0gZmFsc2UpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGNvbnN0IGNvbnRhaW5lcjogRm9ybUNvbnRhaW5lciA9IHRoaXMucGFyZW50IHx8IHRoaXMuZm9ybUdyb3VwO1xuICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICByZXR1cm4gY29udHJvbDtcbiAgICB9XG4gICAgY29uc3QgZXhpc3RpbmcgPSBjb250YWluZXIuY29udHJvbHNbdGhpcy5jYXNlRmllbGQuaWRdO1xuICAgIGlmIChleGlzdGluZykge1xuICAgICAgaWYgKHJlcGxhY2UpIHtcbiAgICAgICAgLy8gU2V0IHRoZSB2YWxpZGF0b3JzIG9uIHRoZSByZXBsYWNlbWVudCB3aXRoIHdoYXQgYWxyZWFkeSBleGlzdHMuXG4gICAgICAgIGNvbnRyb2wuc2V0VmFsaWRhdG9ycyhleGlzdGluZy52YWxpZGF0b3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmFkZFZhbGlkYXRvcnModGhpcy5jYXNlRmllbGQsIGNvbnRyb2wpO1xuICAgIEZpZWxkc1V0aWxzLmFkZENhc2VGaWVsZEFuZENvbXBvbmVudFJlZmVyZW5jZXMoY29udHJvbCwgdGhpcy5jYXNlRmllbGQsIHRoaXMpO1xuICAgIHJldHVybiB0aGlzLmFkZENvbnRyb2xUb1BhcmVudChjb250cm9sLCBjb250YWluZXIsIHJlcGxhY2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZFZhbGlkYXRvcnMoY2FzZUZpZWxkOiBDYXNlRmllbGQsIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHZvaWQge1xuICAgIC8vIE5vIHZhbGlkYXRvcnMgYnkgZGVmYXVsdCwgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gYWRkIHZhbGlkYXRvcnMgdG8gdGhlIGZvcm0gY29udHJvbFxuICB9XG5cbiAgcHJpdmF0ZSBhZGRDb250cm9sVG9QYXJlbnQoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBwYXJlbnQ6IEZvcm1Db250YWluZXIsIHJlcGxhY2U6IGJvb2xlYW4pOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZENvbnRyb2xUb0Zvcm1BcnJheShjb250cm9sLCBwYXJlbnQsIHJlcGxhY2UpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hZGRDb250cm9sVG9Gb3JtR3JvdXAoY29udHJvbCwgcGFyZW50LCByZXBsYWNlKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29udHJvbFRvRm9ybUFycmF5KGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgcGFyZW50OiBGb3JtQXJyYXksIHJlcGxhY2U6IGJvb2xlYW4pOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQodGhpcy5jYXNlRmllbGQuaWQsIDEwKTtcbiAgICBpZiAocmVwbGFjZSAmJiAhaXNOYU4oaW5kZXgpKSB7XG4gICAgICBwYXJlbnQuc2V0Q29udHJvbChpbmRleCwgY29udHJvbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmVudC5wdXNoKGNvbnRyb2wpO1xuICAgIH1cbiAgICByZXR1cm4gY29udHJvbDtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29udHJvbFRvRm9ybUdyb3VwKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgcGFyZW50OiBVbnR5cGVkRm9ybUdyb3VwLCByZXBsYWNlOiBib29sZWFuKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICBpZiAocmVwbGFjZSkge1xuICAgICAgaWYgKHRoaXMuY2FzZUZpZWxkLmZpZWxkX3R5cGUgJiYgdGhpcy5jYXNlRmllbGQuZmllbGRfdHlwZS5pZCA9PT0gJ0Nhc2VMaW5rJyAmJiB0aGlzLmNhc2VGaWVsZC5maWVsZF90eXBlLnR5cGUgPT09ICdDb21wbGV4JyAmJiAvXi0/XFxkKyQvLnRlc3QodGhpcy5jYXNlRmllbGQuaWQpKSB7XG4gICAgICAgIHBhcmVudC5zZXRDb250cm9sKCdDYXNlUmVmZXJlbmNlJywgY29udHJvbFsnY29udHJvbHMnXVsnQ2FzZVJlZmVyZW5jZSddKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmVudC5zZXRDb250cm9sKHRoaXMuY2FzZUZpZWxkLmlkLCBjb250cm9sKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyZW50LmFkZENvbnRyb2wodGhpcy5jYXNlRmllbGQuaWQsIGNvbnRyb2wpO1xuICAgIH1cbiAgICByZXR1cm4gY29udHJvbDtcbiAgfVxufVxuIl19