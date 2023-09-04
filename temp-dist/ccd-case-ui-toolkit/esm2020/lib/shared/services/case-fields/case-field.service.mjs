import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CaseFieldService {
    isOptional(field) {
        if (!field || !field.display_context) {
            return false;
        }
        return field.display_context.toUpperCase() === 'OPTIONAL';
    }
    isReadOnly(field) {
        if (!field || !field.display_context) {
            return false;
        }
        return field.display_context.toUpperCase() === 'READONLY';
    }
    isMandatory(field) {
        if (!field || !field.display_context) {
            return false;
        }
        return field.display_context.toUpperCase() === 'MANDATORY';
    }
    isLabel(field) {
        if (!field || !field.field_type) {
            return false;
        }
        return field.field_type.type === 'Label';
    }
}
CaseFieldService.ɵfac = function CaseFieldService_Factory(t) { return new (t || CaseFieldService)(); };
CaseFieldService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CaseFieldService, factory: CaseFieldService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseFieldService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1maWVsZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9jYXNlLWZpZWxkcy9jYXNlLWZpZWxkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJM0MsTUFBTSxPQUFPLGdCQUFnQjtJQUVwQixVQUFVLENBQUUsS0FBZ0I7UUFDakMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDcEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sS0FBSyxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxVQUFVLENBQUM7SUFDNUQsQ0FBQztJQUVNLFVBQVUsQ0FBRSxLQUFnQjtRQUNqQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTtZQUNwQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxLQUFLLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxLQUFLLFVBQVUsQ0FBQztJQUM1RCxDQUFDO0lBRU0sV0FBVyxDQUFFLEtBQWdCO1FBQ2xDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ3BDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEtBQUssQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLEtBQUssV0FBVyxDQUFDO0lBQzdELENBQUM7SUFFTSxPQUFPLENBQUUsS0FBZ0I7UUFDOUIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDO0lBQzNDLENBQUM7O2dGQTVCVSxnQkFBZ0I7c0VBQWhCLGdCQUFnQixXQUFoQixnQkFBZ0I7dUZBQWhCLGdCQUFnQjtjQUQ1QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS1maWVsZC5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXNlRmllbGRTZXJ2aWNlIHtcblxuICBwdWJsaWMgaXNPcHRpb25hbCAoZmllbGQ6IENhc2VGaWVsZCkge1xuICAgIGlmICghZmllbGQgfHwgIWZpZWxkLmRpc3BsYXlfY29udGV4dCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZmllbGQuZGlzcGxheV9jb250ZXh0LnRvVXBwZXJDYXNlKCkgPT09ICdPUFRJT05BTCc7XG4gIH1cblxuICBwdWJsaWMgaXNSZWFkT25seSAoZmllbGQ6IENhc2VGaWVsZCkge1xuICAgIGlmICghZmllbGQgfHwgIWZpZWxkLmRpc3BsYXlfY29udGV4dCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZmllbGQuZGlzcGxheV9jb250ZXh0LnRvVXBwZXJDYXNlKCkgPT09ICdSRUFET05MWSc7XG4gIH1cblxuICBwdWJsaWMgaXNNYW5kYXRvcnkgKGZpZWxkOiBDYXNlRmllbGQpIHtcbiAgICBpZiAoIWZpZWxkIHx8ICFmaWVsZC5kaXNwbGF5X2NvbnRleHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkLmRpc3BsYXlfY29udGV4dC50b1VwcGVyQ2FzZSgpID09PSAnTUFOREFUT1JZJztcbiAgfVxuXG4gIHB1YmxpYyBpc0xhYmVsIChmaWVsZDogQ2FzZUZpZWxkKSB7XG4gICAgaWYgKCFmaWVsZCB8fCAhZmllbGQuZmllbGRfdHlwZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZmllbGQuZmllbGRfdHlwZS50eXBlID09PSAnTGFiZWwnO1xuICB9XG59XG4iXX0=