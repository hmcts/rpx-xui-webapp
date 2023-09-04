import { Injectable } from '@angular/core';
import { ShowCondition } from '../../../directives/conditional-show/domain/conditional-show.model';
import { CaseFieldService } from '../../../services/case-fields/case-field.service';
import { FieldsUtils } from '../../../services/fields';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/case-fields/case-field.service";
export class PageValidationService {
    constructor(caseFieldService) {
        this.caseFieldService = caseFieldService;
    }
    isPageValid(page, editForm) {
        return page.case_fields
            .filter(caseField => !this.caseFieldService.isReadOnly(caseField))
            .filter(caseField => !this.isHidden(caseField, editForm))
            .every(caseField => {
            const theControl = FieldsUtils.isCaseFieldOfType(caseField, ['JudicialUser'])
                ? editForm.controls['data'].get(`${caseField.id}_judicialUserControl`)
                : editForm.controls['data'].get(caseField.id);
            return this.checkDocumentField(caseField, theControl) && this.checkOptionalField(caseField, theControl);
        });
    }
    isHidden(caseField, editForm, path) {
        const formFields = editForm.getRawValue();
        const condition = ShowCondition.getInstance(caseField.show_condition);
        if (path && path.indexOf(`_${caseField.id}_`) === -1) {
            path = `${path}${caseField.id}`;
        }
        return !condition.match(formFields.data, path);
    }
    checkDocumentField(caseField, theControl) {
        if (caseField.field_type.id !== 'Document') {
            return true;
        }
        return !(this.checkMandatoryField(caseField, theControl));
    }
    checkOptionalField(caseField, theControl) {
        if (!theControl) {
            return this.caseFieldService.isOptional(caseField);
        }
        else {
            return theControl.valid || theControl.disabled;
        }
    }
    checkMandatoryField(caseField, theControl) {
        return this.caseFieldService.isMandatory(caseField) && theControl === null;
    }
}
PageValidationService.ɵfac = function PageValidationService_Factory(t) { return new (t || PageValidationService)(i0.ɵɵinject(i1.CaseFieldService)); };
PageValidationService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PageValidationService, factory: PageValidationService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PageValidationService, [{
        type: Injectable
    }], function () { return [{ type: i1.CaseFieldService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS12YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS1lZGl0b3Ivc2VydmljZXMvcGFnZS12YWxpZGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFFbkcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDcEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7QUFJdkQsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUE2QixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFJLENBQUM7SUFFN0QsV0FBVyxDQUFDLElBQWdCLEVBQUUsUUFBMEI7UUFDN0QsT0FBTyxJQUFJLENBQUMsV0FBVzthQUNwQixNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDakUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN4RCxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDakIsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsRUFBRSxzQkFBc0IsQ0FBQztnQkFDdEUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxRyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxRQUFRLENBQUMsU0FBb0IsRUFBRSxRQUEwQixFQUFFLElBQWE7UUFDN0UsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNwRCxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU8sa0JBQWtCLENBQUMsU0FBb0IsRUFBRSxVQUEyQjtRQUMxRSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLFVBQVUsRUFBRTtZQUMxQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxTQUFvQixFQUFFLFVBQTJCO1FBQzFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEQ7YUFBTTtZQUNMLE9BQU8sVUFBVSxDQUFDLEtBQUssSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVPLG1CQUFtQixDQUFDLFNBQW9CLEVBQUUsVUFBMkI7UUFDM0UsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFVBQVUsS0FBSyxJQUFJLENBQUM7SUFDN0UsQ0FBQzs7MEZBekNVLHFCQUFxQjsyRUFBckIscUJBQXFCLFdBQXJCLHFCQUFxQjt1RkFBckIscUJBQXFCO2NBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFNob3dDb25kaXRpb24gfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL2NvbmRpdGlvbmFsLXNob3cvZG9tYWluL2NvbmRpdGlvbmFsLXNob3cubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS1maWVsZC5tb2RlbCc7XG5pbXBvcnQgeyBDYXNlRmllbGRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvY2FzZS1maWVsZHMvY2FzZS1maWVsZC5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkc1V0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvZmllbGRzJztcbmltcG9ydCB7IFdpemFyZFBhZ2UgfSBmcm9tICcuLi9kb21haW4vd2l6YXJkLXBhZ2UubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFnZVZhbGlkYXRpb25TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBjYXNlRmllbGRTZXJ2aWNlOiBDYXNlRmllbGRTZXJ2aWNlKSB7IH1cblxuICBwdWJsaWMgaXNQYWdlVmFsaWQocGFnZTogV2l6YXJkUGFnZSwgZWRpdEZvcm06IFVudHlwZWRGb3JtR3JvdXApOiBib29sZWFuIHtcbiAgICByZXR1cm4gcGFnZS5jYXNlX2ZpZWxkc1xuICAgICAgLmZpbHRlcihjYXNlRmllbGQgPT4gIXRoaXMuY2FzZUZpZWxkU2VydmljZS5pc1JlYWRPbmx5KGNhc2VGaWVsZCkpXG4gICAgICAuZmlsdGVyKGNhc2VGaWVsZCA9PiAhdGhpcy5pc0hpZGRlbihjYXNlRmllbGQsIGVkaXRGb3JtKSlcbiAgICAgIC5ldmVyeShjYXNlRmllbGQgPT4ge1xuICAgICAgICBjb25zdCB0aGVDb250cm9sID0gRmllbGRzVXRpbHMuaXNDYXNlRmllbGRPZlR5cGUoY2FzZUZpZWxkLCBbJ0p1ZGljaWFsVXNlciddKVxuICAgICAgICAgID8gZWRpdEZvcm0uY29udHJvbHNbJ2RhdGEnXS5nZXQoYCR7Y2FzZUZpZWxkLmlkfV9qdWRpY2lhbFVzZXJDb250cm9sYClcbiAgICAgICAgICA6IGVkaXRGb3JtLmNvbnRyb2xzWydkYXRhJ10uZ2V0KGNhc2VGaWVsZC5pZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrRG9jdW1lbnRGaWVsZChjYXNlRmllbGQsIHRoZUNvbnRyb2wpICYmIHRoaXMuY2hlY2tPcHRpb25hbEZpZWxkKGNhc2VGaWVsZCwgdGhlQ29udHJvbCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpc0hpZGRlbihjYXNlRmllbGQ6IENhc2VGaWVsZCwgZWRpdEZvcm06IFVudHlwZWRGb3JtR3JvdXAsIHBhdGg/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBmb3JtRmllbGRzID0gZWRpdEZvcm0uZ2V0UmF3VmFsdWUoKTtcbiAgICBjb25zdCBjb25kaXRpb24gPSBTaG93Q29uZGl0aW9uLmdldEluc3RhbmNlKGNhc2VGaWVsZC5zaG93X2NvbmRpdGlvbik7XG4gICAgaWYgKHBhdGggJiYgcGF0aC5pbmRleE9mKGBfJHtjYXNlRmllbGQuaWR9X2ApID09PSAtMSkge1xuICAgICAgcGF0aCA9IGAke3BhdGh9JHtjYXNlRmllbGQuaWR9YDtcbiAgICB9XG4gICAgcmV0dXJuICFjb25kaXRpb24ubWF0Y2goZm9ybUZpZWxkcy5kYXRhLCBwYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tEb2N1bWVudEZpZWxkKGNhc2VGaWVsZDogQ2FzZUZpZWxkLCB0aGVDb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBib29sZWFuIHtcbiAgICBpZiAoY2FzZUZpZWxkLmZpZWxkX3R5cGUuaWQgIT09ICdEb2N1bWVudCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gISh0aGlzLmNoZWNrTWFuZGF0b3J5RmllbGQoY2FzZUZpZWxkLCB0aGVDb250cm9sKSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrT3B0aW9uYWxGaWVsZChjYXNlRmllbGQ6IENhc2VGaWVsZCwgdGhlQ29udHJvbDogQWJzdHJhY3RDb250cm9sKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGVDb250cm9sKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYXNlRmllbGRTZXJ2aWNlLmlzT3B0aW9uYWwoY2FzZUZpZWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoZUNvbnRyb2wudmFsaWQgfHwgdGhlQ29udHJvbC5kaXNhYmxlZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoZWNrTWFuZGF0b3J5RmllbGQoY2FzZUZpZWxkOiBDYXNlRmllbGQsIHRoZUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNhc2VGaWVsZFNlcnZpY2UuaXNNYW5kYXRvcnkoY2FzZUZpZWxkKSAmJiB0aGVDb250cm9sID09PSBudWxsO1xuICB9XG59XG4iXX0=