import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
const noop = () => undefined;
export class Logger {
    info;
    warn;
    error;
}
export class LoggerService {
    info;
    warn;
    error;
    invokeConsoleMethod(type, args) { }
    static ɵfac = function LoggerService_Factory(t) { return new (t || LoggerService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LoggerService, factory: LoggerService.ɵfac, providedIn: 'root' });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoggerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wYXltZW50LWxpYi9zcmMvbGliL3NlcnZpY2VzL3NoYXJlZC9sb2dnZXIvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFM0MsTUFBTSxJQUFJLEdBQUcsR0FBUSxFQUFFLENBQUMsU0FBUyxDQUFDO0FBRWxDLE1BQU0sT0FBZ0IsTUFBTTtJQUUxQixJQUFJLENBQU07SUFDVixJQUFJLENBQU07SUFDVixLQUFLLENBQU07Q0FDWjtBQUtELE1BQU0sT0FBTyxhQUFhO0lBRXhCLElBQUksQ0FBTTtJQUNWLElBQUksQ0FBTTtJQUNWLEtBQUssQ0FBTTtJQUVYLG1CQUFtQixDQUFDLElBQVksRUFBRSxJQUFVLElBQVMsQ0FBQzt1RUFOM0MsYUFBYTtnRUFBYixhQUFhLFdBQWIsYUFBYSxtQkFGWixNQUFNOzt1RkFFUCxhQUFhO2NBSHpCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3Qgbm9vcCA9ICgpOiBhbnkgPT4gdW5kZWZpbmVkO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTG9nZ2VyIHtcblxuICBpbmZvOiBhbnk7XG4gIHdhcm46IGFueTtcbiAgZXJyb3I6IGFueTtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTG9nZ2VyU2VydmljZSBpbXBsZW1lbnRzIExvZ2dlciB7XG5cbiAgaW5mbzogYW55O1xuICB3YXJuOiBhbnk7XG4gIGVycm9yOiBhbnk7XG5cbiAgaW52b2tlQ29uc29sZU1ldGhvZCh0eXBlOiBzdHJpbmcsIGFyZ3M/OiBhbnkpOiB2b2lkIHt9XG59XG4iXX0=