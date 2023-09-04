import { Pipe } from '@angular/core';
import { RpxTranslatePipe } from 'rpx-xui-translation';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class FirstErrorPipe {
    constructor(rpxTranslationPipe) {
        this.rpxTranslationPipe = rpxTranslationPipe;
    }
    transform(value, args) {
        if (!value) {
            return '';
        }
        if (!args) {
            args = 'Field';
        }
        const keys = Object.keys(value);
        if (!keys.length) {
            return '';
        }
        const fieldLabel = this.rpxTranslationPipe.transform(args);
        let errorMessage;
        if (keys[0] === 'required') {
            errorMessage = '%FIELDLABEL% is required';
        }
        else if (keys[0] === 'pattern') {
            errorMessage = 'The data entered is not valid for %FIELDLABEL%';
        }
        else if (keys[0] === 'minlength') {
            errorMessage = '%FIELDLABEL% is below the minimum length';
        }
        else if (keys[0] === 'maxlength') {
            errorMessage = '%FIELDLABEL% exceeds the maximum length';
        }
        else if (value.hasOwnProperty('matDatetimePickerParse')) {
            errorMessage = 'The date entered is not valid. Please provide a valid date';
        }
        else {
            errorMessage = value[keys[0]];
        }
        return this.rpxTranslationPipe.transform(errorMessage, { FIELDLABEL: fieldLabel });
    }
}
FirstErrorPipe.ɵfac = function FirstErrorPipe_Factory(t) { return new (t || FirstErrorPipe)(i0.ɵɵdirectiveInject(i1.RpxTranslatePipe, 16)); };
FirstErrorPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdFirstError", type: FirstErrorPipe, pure: false });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FirstErrorPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdFirstError',
                pure: false
            }]
    }], function () { return [{ type: i1.RpxTranslatePipe }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyc3QtZXJyb3IucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL3V0aWxzL2ZpcnN0LWVycm9yLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQU12RCxNQUFNLE9BQU8sY0FBYztJQUN6QixZQUNtQixrQkFBb0M7UUFBcEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFrQjtJQUNwRCxDQUFDO0lBRUcsU0FBUyxDQUFDLEtBQXVCLEVBQUUsSUFBYTtRQUNyRCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ2hCO1FBRUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzRCxJQUFJLFlBQW9CLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO1lBQzFCLFlBQVksR0FBRywwQkFBMEIsQ0FBQztTQUMzQzthQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNoQyxZQUFZLEdBQUcsZ0RBQWdELENBQUM7U0FDakU7YUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDbEMsWUFBWSxHQUFHLDBDQUEwQyxDQUFDO1NBQzNEO2FBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQ2xDLFlBQVksR0FBRyx5Q0FBeUMsQ0FBQztTQUMxRDthQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1lBQ3pELFlBQVksR0FBRyw0REFBNEQsQ0FBQztTQUM3RTthQUFNO1lBQ0wsWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQjtRQUVELE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNyRixDQUFDOzs0RUF0Q1UsY0FBYztvRkFBZCxjQUFjO3VGQUFkLGNBQWM7Y0FKMUIsSUFBSTtlQUFDO2dCQUNKLElBQUksRUFBRSxlQUFlO2dCQUNyQixJQUFJLEVBQUUsS0FBSzthQUNaIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJweFRyYW5zbGF0ZVBpcGUgfSBmcm9tICdycHgteHVpLXRyYW5zbGF0aW9uJztcblxuQFBpcGUoe1xuICBuYW1lOiAnY2NkRmlyc3RFcnJvcicsXG4gIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIEZpcnN0RXJyb3JQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcnB4VHJhbnNsYXRpb25QaXBlOiBScHhUcmFuc2xhdGVQaXBlLFxuICApIHt9XG5cbiAgcHVibGljIHRyYW5zZm9ybSh2YWx1ZTogVmFsaWRhdGlvbkVycm9ycywgYXJncz86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGlmICghYXJncykge1xuICAgICAgYXJncyA9ICdGaWVsZCc7XG4gICAgfVxuXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcblxuICAgIGlmICgha2V5cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBjb25zdCBmaWVsZExhYmVsID0gdGhpcy5ycHhUcmFuc2xhdGlvblBpcGUudHJhbnNmb3JtKGFyZ3MpO1xuXG4gICAgbGV0IGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICAgIGlmIChrZXlzWzBdID09PSAncmVxdWlyZWQnKSB7XG4gICAgICBlcnJvck1lc3NhZ2UgPSAnJUZJRUxETEFCRUwlIGlzIHJlcXVpcmVkJztcbiAgICB9IGVsc2UgaWYgKGtleXNbMF0gPT09ICdwYXR0ZXJuJykge1xuICAgICAgZXJyb3JNZXNzYWdlID0gJ1RoZSBkYXRhIGVudGVyZWQgaXMgbm90IHZhbGlkIGZvciAlRklFTERMQUJFTCUnO1xuICAgIH0gZWxzZSBpZiAoa2V5c1swXSA9PT0gJ21pbmxlbmd0aCcpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9ICclRklFTERMQUJFTCUgaXMgYmVsb3cgdGhlIG1pbmltdW0gbGVuZ3RoJztcbiAgICB9IGVsc2UgaWYgKGtleXNbMF0gPT09ICdtYXhsZW5ndGgnKSB7XG4gICAgICBlcnJvck1lc3NhZ2UgPSAnJUZJRUxETEFCRUwlIGV4Y2VlZHMgdGhlIG1heGltdW0gbGVuZ3RoJztcbiAgICB9IGVsc2UgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KCdtYXREYXRldGltZVBpY2tlclBhcnNlJykpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9ICdUaGUgZGF0ZSBlbnRlcmVkIGlzIG5vdCB2YWxpZC4gUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBkYXRlJztcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3JNZXNzYWdlID0gdmFsdWVba2V5c1swXV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucnB4VHJhbnNsYXRpb25QaXBlLnRyYW5zZm9ybShlcnJvck1lc3NhZ2UsIHsgRklFTERMQUJFTDogZmllbGRMYWJlbCB9KTtcbiAgfVxufVxuIl19