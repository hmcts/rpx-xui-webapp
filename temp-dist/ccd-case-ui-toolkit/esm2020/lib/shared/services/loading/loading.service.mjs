import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class LoadingService {
    constructor() {
        this.registered = new Map();
        this.loading = new BehaviorSubject(false);
    }
    get isLoading() {
        return this.loading.pipe(distinctUntilChanged());
    }
    register() {
        const token = this.generateToken();
        console.info(`registering [${token}]`);
        this.registered.set(token, token);
        this.loading.next(true);
        console.info(`registered [${token}]`);
        return token;
    }
    unregister(token) {
        console.info(`unregistering [${token}]`);
        this.registered.delete(token);
        this.loading.next(this.registered.size > 0);
        console.info(`unregistered [${token}]`);
    }
    generateToken() {
        const timestamp = window.performance.now();
        return `toolkit-loading-${timestamp}`; // format: [source-library]-[unique incrementing number]
    }
}
LoadingService.ɵfac = function LoadingService_Factory(t) { return new (t || LoadingService)(); };
LoadingService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LoadingService, factory: LoadingService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoadingService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9sb2FkaW5nL2xvYWRpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBR3RELE1BQU0sT0FBTyxjQUFjO0lBRDNCO1FBRW1CLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUN2QyxZQUFPLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7S0EwQmhFO0lBeEJDLElBQVcsU0FBUztRQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sUUFBUTtRQUNiLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUN0QyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTSxVQUFVLENBQUMsS0FBYTtRQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLGFBQWE7UUFDbkIsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQyxPQUFPLG1CQUFtQixTQUFTLEVBQUUsQ0FBQyxDQUFDLHdEQUF3RDtJQUNqRyxDQUFDOzs0RUEzQlUsY0FBYztvRUFBZCxjQUFjLFdBQWQsY0FBYzt1RkFBZCxjQUFjO2NBRDFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9hZGluZ1NlcnZpY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IHJlZ2lzdGVyZWQgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IGxvYWRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBwdWJsaWMgZ2V0IGlzTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5sb2FkaW5nLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXIoKTogc3RyaW5nIHtcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMuZ2VuZXJhdGVUb2tlbigpO1xuICAgIGNvbnNvbGUuaW5mbyhgcmVnaXN0ZXJpbmcgWyR7dG9rZW59XWApO1xuICAgIHRoaXMucmVnaXN0ZXJlZC5zZXQodG9rZW4sIHRva2VuKTtcbiAgICB0aGlzLmxvYWRpbmcubmV4dCh0cnVlKTtcbiAgICBjb25zb2xlLmluZm8oYHJlZ2lzdGVyZWQgWyR7dG9rZW59XWApO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIHB1YmxpYyB1bnJlZ2lzdGVyKHRva2VuOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zb2xlLmluZm8oYHVucmVnaXN0ZXJpbmcgWyR7dG9rZW59XWApO1xuICAgIHRoaXMucmVnaXN0ZXJlZC5kZWxldGUodG9rZW4pO1xuICAgIHRoaXMubG9hZGluZy5uZXh0KHRoaXMucmVnaXN0ZXJlZC5zaXplID4gMCk7XG4gICAgY29uc29sZS5pbmZvKGB1bnJlZ2lzdGVyZWQgWyR7dG9rZW59XWApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZVRva2VuKCk6IHN0cmluZyB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgIHJldHVybiBgdG9vbGtpdC1sb2FkaW5nLSR7dGltZXN0YW1wfWA7IC8vIGZvcm1hdDogW3NvdXJjZS1saWJyYXJ5XS1bdW5pcXVlIGluY3JlbWVudGluZyBudW1iZXJdXG4gIH1cbn1cbiJdfQ==