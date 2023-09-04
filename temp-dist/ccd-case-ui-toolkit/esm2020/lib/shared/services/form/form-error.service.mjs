import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import * as i0 from "@angular/core";
export class FormErrorService {
    mapFieldErrors(errors, form, errorKey) {
        errors.forEach(error => {
            const formControl = this.getFormControl(form, error.id);
            if (formControl) {
                formControl.setErrors({
                    [errorKey]: error.message
                });
            }
        });
    }
    getFormControl(form, fieldId) {
        const fields = fieldId.split('.');
        let group = form;
        let inArray = false;
        let control;
        fields.every((field, index) => {
            if (index === fields.length - 1) {
                control = group.controls[field];
            }
            else {
                group = group.controls[field];
                if (inArray && group.controls['value']) {
                    group = group.controls['value'];
                }
                if (group && group.constructor && FormArray.name === group.constructor.name) {
                    inArray = true;
                }
                else {
                    inArray = false;
                }
            }
            return !!group;
        });
        return control;
    }
}
FormErrorService.ɵfac = function FormErrorService_Factory(t) { return new (t || FormErrorService)(); };
FormErrorService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FormErrorService, factory: FormErrorService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FormErrorService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lcnJvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9mb3JtL2Zvcm0tZXJyb3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQWlDLE1BQU0sZ0JBQWdCLENBQUM7O0FBRzFFLE1BQU0sT0FBTyxnQkFBZ0I7SUFFcEIsY0FBYyxDQUFDLE1BQXlDLEVBQUUsSUFBc0IsRUFBRSxRQUFnQjtRQUV2RyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUV4RCxJQUFJLFdBQVcsRUFBRTtnQkFDZixXQUFXLENBQUMsU0FBUyxDQUFDO29CQUNwQixDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPO2lCQUMxQixDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGNBQWMsQ0FBQyxJQUFzQixFQUFFLE9BQWU7UUFDNUQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVsQyxJQUFJLEtBQUssR0FBcUIsSUFBSSxDQUFDO1FBQ25DLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLE9BQW9CLENBQUM7UUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM1QixJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDL0IsT0FBTyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFnQixDQUFDO2FBQ2hEO2lCQUFNO2dCQUNMLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBcUIsQ0FBQztnQkFFbEQsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDdEMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFxQixDQUFDO2lCQUNyRDtnQkFFRCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7b0JBQzNFLE9BQU8sR0FBRyxJQUFJLENBQUM7aUJBQ2hCO3FCQUFNO29CQUNMLE9BQU8sR0FBRyxLQUFLLENBQUM7aUJBQ2pCO2FBQ0Y7WUFDRCxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOztnRkF6Q1UsZ0JBQWdCO3NFQUFoQixnQkFBZ0IsV0FBaEIsZ0JBQWdCO3VGQUFoQixnQkFBZ0I7Y0FENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1BcnJheSwgRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtRXJyb3JTZXJ2aWNlIHtcblxuICBwdWJsaWMgbWFwRmllbGRFcnJvcnMoZXJyb3JzOiB7IGlkOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZyB9W10sIGZvcm06IFVudHlwZWRGb3JtR3JvdXAsIGVycm9yS2V5OiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGVycm9ycy5mb3JFYWNoKGVycm9yID0+IHtcbiAgICAgIGNvbnN0IGZvcm1Db250cm9sID0gdGhpcy5nZXRGb3JtQ29udHJvbChmb3JtLCBlcnJvci5pZCk7XG5cbiAgICAgIGlmIChmb3JtQ29udHJvbCkge1xuICAgICAgICBmb3JtQ29udHJvbC5zZXRFcnJvcnMoe1xuICAgICAgICAgIFtlcnJvcktleV06IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldEZvcm1Db250cm9sKGZvcm06IFVudHlwZWRGb3JtR3JvdXAsIGZpZWxkSWQ6IHN0cmluZyk6IEZvcm1Db250cm9sIHtcbiAgICBjb25zdCBmaWVsZHMgPSBmaWVsZElkLnNwbGl0KCcuJyk7XG5cbiAgICBsZXQgZ3JvdXA6IFVudHlwZWRGb3JtR3JvdXAgPSBmb3JtO1xuICAgIGxldCBpbkFycmF5ID0gZmFsc2U7XG4gICAgbGV0IGNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIGZpZWxkcy5ldmVyeSgoZmllbGQsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoaW5kZXggPT09IGZpZWxkcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNvbnRyb2wgPSBncm91cC5jb250cm9sc1tmaWVsZF0gYXMgRm9ybUNvbnRyb2w7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncm91cCA9IGdyb3VwLmNvbnRyb2xzW2ZpZWxkXSBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuXG4gICAgICAgIGlmIChpbkFycmF5ICYmIGdyb3VwLmNvbnRyb2xzWyd2YWx1ZSddKSB7XG4gICAgICAgICAgZ3JvdXAgPSBncm91cC5jb250cm9sc1sndmFsdWUnXSBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdyb3VwICYmIGdyb3VwLmNvbnN0cnVjdG9yICYmIEZvcm1BcnJheS5uYW1lID09PSBncm91cC5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICAgICAgaW5BcnJheSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5BcnJheSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gISFncm91cDtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb250cm9sO1xuICB9XG59XG4iXX0=