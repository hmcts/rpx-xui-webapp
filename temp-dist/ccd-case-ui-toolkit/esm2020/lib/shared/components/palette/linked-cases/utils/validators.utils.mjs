import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ValidatorsUtils {
    numberLengthValidator(inputLength) {
        return (control) => {
            return control.value.length !== inputLength ? { isValid: false } : null;
        };
    }
    formArraySelectedValidator() {
        return (control) => {
            return control.value.every((option) => !option.selected) ? { isValid: false } : null;
        };
    }
    regexPattern(regexPattern) {
        return (control) => {
            const regex = new RegExp(regexPattern);
            return regex.test(control.value) ? null : { isValid: false };
        };
    }
}
ValidatorsUtils.ɵfac = function ValidatorsUtils_Factory(t) { return new (t || ValidatorsUtils)(); };
ValidatorsUtils.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ValidatorsUtils, factory: ValidatorsUtils.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ValidatorsUtils, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy51dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2xpbmtlZC1jYXNlcy91dGlscy92YWxpZGF0b3JzLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSTNDLE1BQU0sT0FBTyxlQUFlO0lBQ25CLHFCQUFxQixDQUFDLFdBQW1CO1FBQzlDLE9BQU8sQ0FBQyxPQUF3QixFQUFpQyxFQUFFO1lBQ2pFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFFLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDTSwwQkFBMEI7UUFDL0IsT0FBTyxDQUFDLE9BQXdCLEVBQWlDLEVBQUU7WUFDakUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDdkYsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNNLFlBQVksQ0FBQyxZQUFvQjtRQUN0QyxPQUFPLENBQUMsT0FBd0IsRUFBaUMsRUFBRTtZQUNqRSxNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2QyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQy9ELENBQUMsQ0FBQztJQUNKLENBQUM7OzhFQWhCVSxlQUFlO3FFQUFmLGVBQWUsV0FBZixlQUFlLG1CQURGLE1BQU07dUZBQ25CLGVBQWU7Y0FEM0IsVUFBVTtlQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yc1V0aWxzIHtcbiAgcHVibGljIG51bWJlckxlbmd0aFZhbGlkYXRvcihpbnB1dExlbmd0aDogbnVtYmVyKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB8IG51bGwgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRyb2wudmFsdWUubGVuZ3RoICE9PSBpbnB1dExlbmd0aCA/IHsgaXNWYWxpZDogZmFsc2UgfSA6IG51bGw7XG4gICAgfTtcbiAgfVxuICBwdWJsaWMgZm9ybUFycmF5U2VsZWN0ZWRWYWxpZGF0b3IoKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB8IG51bGwgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRyb2wudmFsdWUuZXZlcnkoKG9wdGlvbikgPT4gIW9wdGlvbi5zZWxlY3RlZCkgPyB7IGlzVmFsaWQ6IGZhbHNlIH0gOiBudWxsO1xuICAgIH07XG4gIH1cbiAgcHVibGljIHJlZ2V4UGF0dGVybihyZWdleFBhdHRlcm46IHN0cmluZyk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChyZWdleFBhdHRlcm4pO1xuICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QoY29udHJvbC52YWx1ZSkgPyBudWxsIDogeyBpc1ZhbGlkOiBmYWxzZSB9O1xuICAgIH07XG4gIH1cbn1cbiJdfQ==