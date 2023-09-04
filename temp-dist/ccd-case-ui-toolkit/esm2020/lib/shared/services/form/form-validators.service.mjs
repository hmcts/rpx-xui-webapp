import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Constants } from '../../commons/constants';
import * as i0 from "@angular/core";
export class FormValidatorsService {
    static addValidators(caseField, control) {
        if (caseField.display_context === Constants.MANDATORY &&
            FormValidatorsService.CUSTOM_VALIDATED_TYPES.indexOf(caseField.field_type.type) === -1) {
            const validators = [Validators.required];
            if (caseField.field_type.type === 'Text') {
                if (caseField.field_type.regular_expression) {
                    validators.push(Validators.pattern(caseField.field_type.regular_expression));
                }
                else {
                    validators.push(this.emptyValidator());
                }
                if (caseField.field_type.min && (typeof caseField.field_type.min === 'number')) {
                    validators.push(Validators.minLength(caseField.field_type.min));
                }
                if (caseField.field_type.max && (typeof caseField.field_type.max === 'number')) {
                    validators.push(Validators.maxLength(caseField.field_type.max));
                }
            }
            if (control.validator) {
                validators.push(control.validator);
            }
            control.setValidators(validators);
        }
        return control;
    }
    static emptyValidator() {
        const validator = (control) => {
            if (control && control.value && control.value.toString().trim().length === 0) {
                return { required: {} };
            }
            return null;
        };
        return validator;
    }
    // TODO: Strip this out as it's only here for the moment because
    // the service is being injected all over the place but it doesn't
    // need to be as FormValidatorsService.addValidators is perfectly
    // happy being static.
    addValidators(caseField, control) {
        return FormValidatorsService.addValidators(caseField, control);
    }
}
FormValidatorsService.CUSTOM_VALIDATED_TYPES = [
    'Date', 'MoneyGBP', 'Label', 'JudicialUser'
];
FormValidatorsService.ɵfac = function FormValidatorsService_Factory(t) { return new (t || FormValidatorsService)(); };
FormValidatorsService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FormValidatorsService, factory: FormValidatorsService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FormValidatorsService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS12YWxpZGF0b3JzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL3NlcnZpY2VzL2Zvcm0vZm9ybS12YWxpZGF0b3JzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWtELFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTVGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLHFCQUFxQjtJQUt6QixNQUFNLENBQUMsYUFBYSxDQUFDLFNBQW9CLEVBQUUsT0FBd0I7UUFDeEUsSUFDRSxTQUFTLENBQUMsZUFBZSxLQUFLLFNBQVMsQ0FBQyxTQUFTO1lBQ2pELHFCQUFxQixDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNwRjtZQUNGLE1BQU0sVUFBVSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO2dCQUN4QyxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUU7b0JBQzNDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztpQkFDOUU7cUJBQU07b0JBQ0wsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztpQkFDeEM7Z0JBQ0QsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssUUFBUSxDQUFDLEVBQUU7b0JBQzlFLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ2pFO2dCQUNELElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxFQUFFO29CQUM5RSxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNqRTthQUNGO1lBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUNyQixVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNwQztZQUNELE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbkM7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRU0sTUFBTSxDQUFDLGNBQWM7UUFDMUIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUF3QixFQUEwQixFQUFFO1lBQ3RFLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUMzRSxPQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO2FBQzFCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7UUFDRixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsZ0VBQWdFO0lBQ2hFLGtFQUFrRTtJQUNsRSxpRUFBaUU7SUFDakUsc0JBQXNCO0lBQ2YsYUFBYSxDQUFDLFNBQW9CLEVBQUUsT0FBd0I7UUFDakUsT0FBTyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7O0FBOUN1Qiw0Q0FBc0IsR0FBb0I7SUFDaEUsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsY0FBYztDQUM1QyxDQUFDOzBGQUpTLHFCQUFxQjsyRUFBckIscUJBQXFCLFdBQXJCLHFCQUFxQjt1RkFBckIscUJBQXFCO2NBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIFZhbGlkYXRpb25FcnJvcnMsIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi8uLi9jb21tb25zL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi9kb21haW4vZGVmaW5pdGlvbi9jYXNlLWZpZWxkLm1vZGVsJztcbmltcG9ydCB7IEZpZWxkVHlwZUVudW0gfSBmcm9tICcuLi8uLi9kb21haW4vZGVmaW5pdGlvbi9maWVsZC10eXBlLWVudW0ubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkYXRvcnNTZXJ2aWNlIHtcblxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDVVNUT01fVkFMSURBVEVEX1RZUEVTOiBGaWVsZFR5cGVFbnVtW10gPSBbXG4gICAgJ0RhdGUnLCAnTW9uZXlHQlAnLCAnTGFiZWwnLCAnSnVkaWNpYWxVc2VyJ1xuICBdO1xuICBwdWJsaWMgc3RhdGljIGFkZFZhbGlkYXRvcnMoY2FzZUZpZWxkOiBDYXNlRmllbGQsIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgaWYgKFxuICAgICAgY2FzZUZpZWxkLmRpc3BsYXlfY29udGV4dCA9PT0gQ29uc3RhbnRzLk1BTkRBVE9SWSAmJlxuICAgICAgRm9ybVZhbGlkYXRvcnNTZXJ2aWNlLkNVU1RPTV9WQUxJREFURURfVFlQRVMuaW5kZXhPZihjYXNlRmllbGQuZmllbGRfdHlwZS50eXBlKSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IFtWYWxpZGF0b3JzLnJlcXVpcmVkXTtcbiAgICAgIGlmIChjYXNlRmllbGQuZmllbGRfdHlwZS50eXBlID09PSAnVGV4dCcpIHtcbiAgICAgICAgaWYgKGNhc2VGaWVsZC5maWVsZF90eXBlLnJlZ3VsYXJfZXhwcmVzc2lvbikge1xuICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnBhdHRlcm4oY2FzZUZpZWxkLmZpZWxkX3R5cGUucmVndWxhcl9leHByZXNzaW9uKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKHRoaXMuZW1wdHlWYWxpZGF0b3IoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhc2VGaWVsZC5maWVsZF90eXBlLm1pbiAmJiAodHlwZW9mIGNhc2VGaWVsZC5maWVsZF90eXBlLm1pbiA9PT0gJ251bWJlcicpKSB7XG4gICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluTGVuZ3RoKGNhc2VGaWVsZC5maWVsZF90eXBlLm1pbikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYXNlRmllbGQuZmllbGRfdHlwZS5tYXggJiYgKHR5cGVvZiBjYXNlRmllbGQuZmllbGRfdHlwZS5tYXggPT09ICdudW1iZXInKSkge1xuICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aChjYXNlRmllbGQuZmllbGRfdHlwZS5tYXgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNvbnRyb2wudmFsaWRhdG9yKSB7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChjb250cm9sLnZhbGlkYXRvcik7XG4gICAgICB9XG4gICAgICBjb250cm9sLnNldFZhbGlkYXRvcnModmFsaWRhdG9ycyk7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbXB0eVZhbGlkYXRvcigpOiBWYWxpZGF0b3JGbiB7XG4gICAgY29uc3QgdmFsaWRhdG9yID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6VmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4gIHtcbiAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC52YWx1ZSAmJiBjb250cm9sLnZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gIHsgcmVxdWlyZWQ6IHt9IH07XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiB2YWxpZGF0b3I7XG4gIH1cblxuICAvLyBUT0RPOiBTdHJpcCB0aGlzIG91dCBhcyBpdCdzIG9ubHkgaGVyZSBmb3IgdGhlIG1vbWVudCBiZWNhdXNlXG4gIC8vIHRoZSBzZXJ2aWNlIGlzIGJlaW5nIGluamVjdGVkIGFsbCBvdmVyIHRoZSBwbGFjZSBidXQgaXQgZG9lc24ndFxuICAvLyBuZWVkIHRvIGJlIGFzIEZvcm1WYWxpZGF0b3JzU2VydmljZS5hZGRWYWxpZGF0b3JzIGlzIHBlcmZlY3RseVxuICAvLyBoYXBweSBiZWluZyBzdGF0aWMuXG4gIHB1YmxpYyBhZGRWYWxpZGF0b3JzKGNhc2VGaWVsZDogQ2FzZUZpZWxkLCBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIHJldHVybiBGb3JtVmFsaWRhdG9yc1NlcnZpY2UuYWRkVmFsaWRhdG9ycyhjYXNlRmllbGQsIGNvbnRyb2wpO1xuICB9XG59XG4iXX0=