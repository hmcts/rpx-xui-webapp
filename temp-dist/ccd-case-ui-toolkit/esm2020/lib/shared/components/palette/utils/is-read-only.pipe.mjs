import { Pipe } from '@angular/core';
import { CaseFieldService } from '../../../services/case-fields/case-field.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/case-fields/case-field.service";
export class IsReadOnlyPipe {
    constructor(caseFieldService) {
        this.caseFieldService = caseFieldService;
    }
    transform(field) {
        return this.caseFieldService.isReadOnly(field);
    }
}
IsReadOnlyPipe.ɵfac = function IsReadOnlyPipe_Factory(t) { return new (t || IsReadOnlyPipe)(i0.ɵɵdirectiveInject(i1.CaseFieldService, 16)); };
IsReadOnlyPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdIsReadOnly", type: IsReadOnlyPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IsReadOnlyPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdIsReadOnly'
            }]
    }], function () { return [{ type: i1.CaseFieldService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtcmVhZC1vbmx5LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS91dGlscy9pcy1yZWFkLW9ubHkucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQzs7O0FBS3BGLE1BQU0sT0FBTyxjQUFjO0lBRXpCLFlBQTZCLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQztJQUU1RCxTQUFTLENBQUMsS0FBZ0I7UUFDL0IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7OzRFQU5VLGNBQWM7b0ZBQWQsY0FBYzt1RkFBZCxjQUFjO2NBSDFCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsZUFBZTthQUN0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhc2VGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2Nhc2UtZmllbGQubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2Nhc2UtZmllbGRzL2Nhc2UtZmllbGQuc2VydmljZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NjZElzUmVhZE9ubHknXG59KVxuZXhwb3J0IGNsYXNzIElzUmVhZE9ubHlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBjYXNlRmllbGRTZXJ2aWNlOiBDYXNlRmllbGRTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyB0cmFuc2Zvcm0oZmllbGQ6IENhc2VGaWVsZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNhc2VGaWVsZFNlcnZpY2UuaXNSZWFkT25seShmaWVsZCk7XG4gIH1cbn1cbiJdfQ==