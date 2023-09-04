import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class BrowserService {
    isFirefox() {
        return window.navigator.userAgent.indexOf('Firefox') > -1;
    }
    isSafari() {
        const isSafariAgent = window.navigator.userAgent.indexOf('Safari') > -1;
        const isChromeAgent = window.navigator.userAgent.indexOf('Chrome') > -1;
        if ((isChromeAgent) && (isSafariAgent)) {
            return false;
        }
        return isSafariAgent;
    }
    isIEOrEdge() {
        return /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    }
}
BrowserService.ɵfac = function BrowserService_Factory(t) { return new (t || BrowserService)(); };
BrowserService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: BrowserService, factory: BrowserService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BrowserService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9icm93c2VyL2Jyb3dzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQyxNQUFNLE9BQU8sY0FBYztJQUNsQixTQUFTO1FBQ2QsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUNNLFFBQVE7UUFDYixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEUsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ00sVUFBVTtRQUNmLE9BQU8sMEJBQTBCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckUsQ0FBQzs7NEVBZFUsY0FBYztvRUFBZCxjQUFjLFdBQWQsY0FBYzt1RkFBZCxjQUFjO2NBRDFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcm93c2VyU2VydmljZSB7XG4gIHB1YmxpYyBpc0ZpcmVmb3goKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSA+IC0xO1xuICB9XG4gIHB1YmxpYyBpc1NhZmFyaSgpOiBib29sZWFuIHtcbiAgICBjb25zdCBpc1NhZmFyaUFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgPiAtMTtcbiAgICBjb25zdCBpc0Nocm9tZUFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPiAtMTtcbiAgICBpZiAoKGlzQ2hyb21lQWdlbnQpICYmIChpc1NhZmFyaUFnZW50KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNTYWZhcmlBZ2VudDtcbiAgfVxuICBwdWJsaWMgaXNJRU9yRWRnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gL21zaWVcXHN8dHJpZGVudFxcL3xlZGdlXFwvL2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIH1cbn1cbiJdfQ==