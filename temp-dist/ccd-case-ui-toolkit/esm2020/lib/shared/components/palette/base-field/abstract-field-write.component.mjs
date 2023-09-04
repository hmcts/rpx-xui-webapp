import { Directive, Input } from '@angular/core';
import { plainToClassFromExist } from 'class-transformer';
import { CaseField } from '../../../domain/definition/case-field.model';
import { FormValidatorsService } from '../../../services/form/form-validators.service';
import { AbstractFormFieldComponent } from './abstract-form-field.component';
import * as i0 from "@angular/core";
export class AbstractFieldWriteComponent extends AbstractFormFieldComponent {
    constructor() {
        super();
        this.isExpanded = false;
        this.isInSearchBlock = false;
        this.fixCaseField();
    }
    ngOnChanges(changes) {
        const change = changes['caseField'];
        if (change) {
            const cfNew = change.currentValue;
            if (!(cfNew instanceof CaseField)) {
                this.fixCaseField();
            }
        }
    }
    createElementId(elementId) {
        return `${this.id()}_${elementId}`;
    }
    addValidators(caseField, control) {
        FormValidatorsService.addValidators(caseField, control);
    }
    fixCaseField() {
        if (this.caseField && !(this.caseField instanceof CaseField)) {
            this.caseField = plainToClassFromExist(new CaseField(), this.caseField);
        }
    }
}
AbstractFieldWriteComponent.ɵfac = function AbstractFieldWriteComponent_Factory(t) { return new (t || AbstractFieldWriteComponent)(); };
AbstractFieldWriteComponent.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AbstractFieldWriteComponent, inputs: { isExpanded: "isExpanded", isInSearchBlock: "isInSearchBlock" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AbstractFieldWriteComponent, [{
        type: Directive
    }], function () { return []; }, { isExpanded: [{
            type: Input
        }], isInSearchBlock: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtZmllbGQtd3JpdGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC13cml0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRTNFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUV4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFHN0UsTUFBTSxPQUFnQiwyQkFBNEIsU0FBUSwwQkFBMEI7SUFRbEY7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQU5ILGVBQVUsR0FBRyxLQUFLLENBQUM7UUFHbkIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFJN0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxXQUFXLENBQUMsT0FBc0I7UUFDdkMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUNsQyxJQUFJLENBQUMsQ0FBQyxLQUFLLFlBQVksU0FBUyxDQUFDLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtTQUNGO0lBQ0gsQ0FBQztJQUVNLGVBQWUsQ0FBQyxTQUFpQjtRQUN0QyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFUyxhQUFhLENBQUMsU0FBb0IsRUFBRSxPQUF3QjtRQUNwRSxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTyxZQUFZO1FBQ2xCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsWUFBWSxTQUFTLENBQUMsRUFBRTtZQUM1RCxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLElBQUksU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3pFO0lBQ0gsQ0FBQzs7c0dBbkNtQiwyQkFBMkI7OEVBQTNCLDJCQUEyQjt1RkFBM0IsMkJBQTJCO2NBRGhELFNBQVM7c0NBSUQsVUFBVTtrQkFEaEIsS0FBSztZQUlDLGVBQWU7a0JBRHJCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IHBsYWluVG9DbGFzc0Zyb21FeGlzdCB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IENhc2VGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2Nhc2UtZmllbGQubW9kZWwnO1xuXG5pbXBvcnQgeyBGb3JtVmFsaWRhdG9yc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9mb3JtL2Zvcm0tdmFsaWRhdG9ycy5zZXJ2aWNlJztcbmltcG9ydCB7IEFic3RyYWN0Rm9ybUZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi9hYnN0cmFjdC1mb3JtLWZpZWxkLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgaXNFeHBhbmRlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpc0luU2VhcmNoQmxvY2sgPSBmYWxzZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmZpeENhc2VGaWVsZCgpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCBjaGFuZ2UgPSBjaGFuZ2VzWydjYXNlRmllbGQnXTtcbiAgICBpZiAoY2hhbmdlKSB7XG4gICAgICBjb25zdCBjZk5ldyA9IGNoYW5nZS5jdXJyZW50VmFsdWU7XG4gICAgICBpZiAoIShjZk5ldyBpbnN0YW5jZW9mIENhc2VGaWVsZCkpIHtcbiAgICAgICAgdGhpcy5maXhDYXNlRmllbGQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlRWxlbWVudElkKGVsZW1lbnRJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5pZCgpfV8ke2VsZW1lbnRJZH1gO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZFZhbGlkYXRvcnMoY2FzZUZpZWxkOiBDYXNlRmllbGQsIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHZvaWQge1xuICAgIEZvcm1WYWxpZGF0b3JzU2VydmljZS5hZGRWYWxpZGF0b3JzKGNhc2VGaWVsZCwgY29udHJvbCk7XG4gIH1cblxuICBwcml2YXRlIGZpeENhc2VGaWVsZCgpIHtcbiAgICBpZiAodGhpcy5jYXNlRmllbGQgJiYgISh0aGlzLmNhc2VGaWVsZCBpbnN0YW5jZW9mIENhc2VGaWVsZCkpIHtcbiAgICAgIHRoaXMuY2FzZUZpZWxkID0gcGxhaW5Ub0NsYXNzRnJvbUV4aXN0KG5ldyBDYXNlRmllbGQoKSwgdGhpcy5jYXNlRmllbGQpO1xuICAgIH1cbiAgfVxufVxuIl19