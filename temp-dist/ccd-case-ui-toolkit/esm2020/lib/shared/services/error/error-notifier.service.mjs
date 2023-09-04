import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class ErrorNotifierService {
    constructor() {
        this.errorSource = new Subject();
        this.error = this.errorSource.asObservable();
    }
    announceError(error) {
        this.errorSource.next(error);
    }
}
ErrorNotifierService.ɵfac = function ErrorNotifierService_Factory(t) { return new (t || ErrorNotifierService)(); };
ErrorNotifierService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ErrorNotifierService, factory: ErrorNotifierService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ErrorNotifierService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itbm90aWZpZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvZXJyb3IvZXJyb3Itbm90aWZpZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBRy9CLE1BQU0sT0FBTyxvQkFBb0I7SUFEakM7UUFFUyxnQkFBVyxHQUFpQixJQUFJLE9BQU8sRUFBTyxDQUFDO1FBQy9DLFVBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBS2hEO0lBSFEsYUFBYSxDQUFDLEtBQVU7UUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7d0ZBTlUsb0JBQW9COzBFQUFwQixvQkFBb0IsV0FBcEIsb0JBQW9CO3VGQUFwQixvQkFBb0I7Y0FEaEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVycm9yTm90aWZpZXJTZXJ2aWNlIHtcbiAgcHVibGljIGVycm9yU291cmNlOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBlcnJvciA9IHRoaXMuZXJyb3JTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHVibGljIGFubm91bmNlRXJyb3IoZXJyb3I6IGFueSkge1xuICAgIHRoaXMuZXJyb3JTb3VyY2UubmV4dChlcnJvcik7XG4gIH1cbn1cbiJdfQ==