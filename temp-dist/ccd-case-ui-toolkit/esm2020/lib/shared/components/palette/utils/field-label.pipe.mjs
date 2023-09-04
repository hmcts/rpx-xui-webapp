import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class FieldLabelPipe {
    transform(field) {
        if (!field || !field.label) {
            return '';
        }
        else if (!field.display_context) {
            return field.label;
        }
        return field.label + (field.display_context.toUpperCase() === 'OPTIONAL' ? ' (Optional)' : '');
    }
}
FieldLabelPipe.ɵfac = function FieldLabelPipe_Factory(t) { return new (t || FieldLabelPipe)(); };
FieldLabelPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdFieldLabel", type: FieldLabelPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FieldLabelPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdFieldLabel'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtbGFiZWwucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL3V0aWxzL2ZpZWxkLWxhYmVsLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBTXBELE1BQU0sT0FBTyxjQUFjO0lBRWxCLFNBQVMsQ0FBRSxLQUFnQjtRQUNoQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUMxQixPQUFPLEVBQUUsQ0FBQztTQUNYO2FBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDakMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakcsQ0FBQzs7NEVBVFUsY0FBYztvRkFBZCxjQUFjO3VGQUFkLGNBQWM7Y0FIMUIsSUFBSTtlQUFDO2dCQUNKLElBQUksRUFBRSxlQUFlO2FBQ3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS1maWVsZC5tb2RlbCc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NjZEZpZWxkTGFiZWwnXG59KVxuZXhwb3J0IGNsYXNzIEZpZWxkTGFiZWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgcHVibGljIHRyYW5zZm9ybSAoZmllbGQ6IENhc2VGaWVsZCk6IHN0cmluZyB7XG4gICAgaWYgKCFmaWVsZCB8fCAhZmllbGQubGFiZWwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKCFmaWVsZC5kaXNwbGF5X2NvbnRleHQpIHtcbiAgICAgIHJldHVybiBmaWVsZC5sYWJlbDtcbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkLmxhYmVsICsgKGZpZWxkLmRpc3BsYXlfY29udGV4dC50b1VwcGVyQ2FzZSgpID09PSAnT1BUSU9OQUwnID8gJyAoT3B0aW9uYWwpJyA6ICcnKTtcbiAgfVxufVxuIl19