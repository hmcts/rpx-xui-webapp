import { Pipe } from '@angular/core';
import { PlaceholderService } from '../../directives/substitutor/services/placeholder.service';
import { FieldsUtils } from '../../services/fields/fields.utils';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/substitutor/services/placeholder.service";
import * as i2 from "../../services/fields/fields.utils";
export class CcdCaseTitlePipe {
    constructor(placeholderService, fieldsUtils) {
        this.placeholderService = placeholderService;
        this.fieldsUtils = fieldsUtils;
    }
    transform(caseTitle, caseFields, values) {
        const caseFieldValues = this.getReadOnlyAndFormFields(values, caseFields);
        const result = this.placeholderService.resolvePlaceholders(caseFieldValues, caseTitle);
        return result;
    }
    getReadOnlyAndFormFields(formGroup, caseFields) {
        return this.fieldsUtils.mergeLabelCaseFieldsAndFormFields(caseFields, formGroup.getRawValue());
    }
}
CcdCaseTitlePipe.ɵfac = function CcdCaseTitlePipe_Factory(t) { return new (t || CcdCaseTitlePipe)(i0.ɵɵdirectiveInject(i1.PlaceholderService, 16), i0.ɵɵdirectiveInject(i2.FieldsUtils, 16)); };
CcdCaseTitlePipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdCaseTitle", type: CcdCaseTitlePipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CcdCaseTitlePipe, [{
        type: Pipe,
        args: [{
                name: 'ccdCaseTitle'
            }]
    }], function () { return [{ type: i1.PlaceholderService }, { type: i2.FieldsUtils }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2NkLWNhc2UtdGl0bGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvcGlwZXMvY2FzZS10aXRsZS9jY2QtY2FzZS10aXRsZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBRS9GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7OztBQUtqRSxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQTZCLGtCQUFzQyxFQUFtQixXQUF3QjtRQUFqRix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQW1CLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQzlHLENBQUM7SUFDTSxTQUFTLENBQUMsU0FBaUIsRUFBRSxVQUF1QixFQUFFLE1BQVc7UUFDdEUsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZGLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTyx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsVUFBdUI7UUFDakUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGlDQUFpQyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNqRyxDQUFDOztnRkFYVSxnQkFBZ0I7cUZBQWhCLGdCQUFnQjt1RkFBaEIsZ0JBQWdCO2NBSDVCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsY0FBYzthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBsYWNlaG9sZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvc3Vic3RpdHV0b3Ivc2VydmljZXMvcGxhY2Vob2xkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi9kb21haW4vZGVmaW5pdGlvbi9jYXNlLWZpZWxkLm1vZGVsJztcbmltcG9ydCB7IEZpZWxkc1V0aWxzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmllbGRzL2ZpZWxkcy51dGlscyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NjZENhc2VUaXRsZSdcbn0pXG5leHBvcnQgY2xhc3MgQ2NkQ2FzZVRpdGxlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHBsYWNlaG9sZGVyU2VydmljZTogUGxhY2Vob2xkZXJTZXJ2aWNlLCBwcml2YXRlIHJlYWRvbmx5IGZpZWxkc1V0aWxzOiBGaWVsZHNVdGlscykge1xuICB9XG4gIHB1YmxpYyB0cmFuc2Zvcm0oY2FzZVRpdGxlOiBzdHJpbmcsIGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdLCB2YWx1ZXM6IGFueSk6IGFueSB7XG4gICAgY29uc3QgY2FzZUZpZWxkVmFsdWVzID0gdGhpcy5nZXRSZWFkT25seUFuZEZvcm1GaWVsZHModmFsdWVzLCBjYXNlRmllbGRzKTtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnBsYWNlaG9sZGVyU2VydmljZS5yZXNvbHZlUGxhY2Vob2xkZXJzKGNhc2VGaWVsZFZhbHVlcywgY2FzZVRpdGxlKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZWFkT25seUFuZEZvcm1GaWVsZHMoZm9ybUdyb3VwLCBjYXNlRmllbGRzOiBDYXNlRmllbGRbXSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGRzVXRpbHMubWVyZ2VMYWJlbENhc2VGaWVsZHNBbmRGb3JtRmllbGRzKGNhc2VGaWVsZHMsIGZvcm1Hcm91cC5nZXRSYXdWYWx1ZSgpKTtcbiAgfVxuXG59XG4iXX0=