import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export let isDebugMode = false;
const noop = () => undefined;
export class ConsoleLoggerService {
    get info() {
        if (isDebugMode) {
            return console.info.bind(console);
        }
        else {
            return noop;
        }
    }
    get warn() {
        if (isDebugMode) {
            return console.warn.bind(console);
        }
        else {
            return noop;
        }
    }
    get error() {
        if (isDebugMode) {
            return console.error.bind(console);
        }
        else {
            return noop;
        }
    }
    invokeConsoleMethod(type, args) {
        const logFn = (console)[type] || console.log || noop;
        logFn.apply(console, [args]);
    }
    static ɵfac = function ConsoleLoggerService_Factory(t) { return new (t || ConsoleLoggerService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ConsoleLoggerService, factory: ConsoleLoggerService.ɵfac, providedIn: 'root' });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConsoleLoggerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS1sb2dnZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvc2VydmljZXMvc2hhcmVkL2xvZ2dlci9jb25zb2xlLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRzNDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFFL0IsTUFBTSxJQUFJLEdBQUcsR0FBUSxFQUFFLENBQUMsU0FBUyxDQUFDO0FBS2xDLE1BQU0sT0FBTyxvQkFBb0I7SUFFL0IsSUFBSSxJQUFJO1FBQ04sSUFBSSxXQUFXLEVBQUU7WUFDZixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25DO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLElBQUksV0FBVyxFQUFFO1lBQ2YsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxJQUFJLFdBQVcsRUFBRTtZQUNmLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsSUFBWSxFQUFFLElBQVU7UUFDMUMsTUFBTSxLQUFLLEdBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQztRQUMvRCxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs4RUE3QlUsb0JBQW9CO2dFQUFwQixvQkFBb0IsV0FBcEIsb0JBQW9CLG1CQUZuQixNQUFNOzt1RkFFUCxvQkFBb0I7Y0FIaEMsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXIuc2VydmljZSc7XG5cbmV4cG9ydCBsZXQgaXNEZWJ1Z01vZGUgPSBmYWxzZTtcblxuY29uc3Qgbm9vcCA9ICgpOiBhbnkgPT4gdW5kZWZpbmVkO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBDb25zb2xlTG9nZ2VyU2VydmljZSBpbXBsZW1lbnRzIExvZ2dlciB7XG5cbiAgZ2V0IGluZm8oKSB7XG4gICAgaWYgKGlzRGVidWdNb2RlKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5pbmZvLmJpbmQoY29uc29sZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBub29wO1xuICAgIH1cbiAgfVxuXG4gIGdldCB3YXJuKCkge1xuICAgIGlmIChpc0RlYnVnTW9kZSkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUud2Fybi5iaW5kKGNvbnNvbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9XG4gIH1cblxuICBnZXQgZXJyb3IoKSB7XG4gICAgaWYgKGlzRGVidWdNb2RlKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9XG4gIH1cblxuICBpbnZva2VDb25zb2xlTWV0aG9kKHR5cGU6IHN0cmluZywgYXJncz86IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGxvZ0ZuOiBGdW5jdGlvbiA9IChjb25zb2xlKVt0eXBlXSB8fCBjb25zb2xlLmxvZyB8fCBub29wO1xuICAgIGxvZ0ZuLmFwcGx5KGNvbnNvbGUsIFthcmdzXSk7XG4gIH1cbn1cbiJdfQ==