import { Pipe } from '@angular/core';
import { CaseFieldService } from '../../../services/case-fields/case-field.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/case-fields/case-field.service";
export class IsMandatoryPipe {
    constructor(caseFieldService) {
        this.caseFieldService = caseFieldService;
    }
    transform(field) {
        return this.caseFieldService.isMandatory(field);
    }
}
IsMandatoryPipe.ɵfac = function IsMandatoryPipe_Factory(t) { return new (t || IsMandatoryPipe)(i0.ɵɵdirectiveInject(i1.CaseFieldService, 16)); };
IsMandatoryPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdIsMandatory", type: IsMandatoryPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IsMandatoryPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdIsMandatory'
            }]
    }], function () { return [{ type: i1.CaseFieldService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtbWFuZGF0b3J5LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS91dGlscy9pcy1tYW5kYXRvcnkucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQzs7O0FBS3BGLE1BQU0sT0FBTyxlQUFlO0lBRTFCLFlBQThCLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQztJQUU3RCxTQUFTLENBQUMsS0FBZ0I7UUFDL0IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7OzhFQU5VLGVBQWU7c0ZBQWYsZUFBZTt1RkFBZixlQUFlO2NBSDNCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsZ0JBQWdCO2FBQ3ZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS1maWVsZC5tb2RlbCc7XG5pbXBvcnQgeyBDYXNlRmllbGRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvY2FzZS1maWVsZHMvY2FzZS1maWVsZC5zZXJ2aWNlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnY2NkSXNNYW5kYXRvcnknXG59KVxuZXhwb3J0IGNsYXNzIElzTWFuZGF0b3J5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgIGNhc2VGaWVsZFNlcnZpY2U6IENhc2VGaWVsZFNlcnZpY2UpIHt9XG5cbiAgcHVibGljIHRyYW5zZm9ybShmaWVsZDogQ2FzZUZpZWxkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FzZUZpZWxkU2VydmljZS5pc01hbmRhdG9yeShmaWVsZCk7XG4gIH1cbn1cbiJdfQ==