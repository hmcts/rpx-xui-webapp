import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RouterHelperService {
    getUrlSegmentsFromRoot(route) {
        return route.pathFromRoot
            .filter(r => r.url && r.url.length)
            .reduce((acc, r) => {
            r.url.forEach(url => {
                acc.push(url.path);
            });
            return acc;
        }, []);
    }
}
RouterHelperService.ɵfac = function RouterHelperService_Factory(t) { return new (t || RouterHelperService)(); };
RouterHelperService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: RouterHelperService, factory: RouterHelperService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RouterHelperService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWhlbHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9yb3V0ZXIvcm91dGVyLWhlbHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSTNDLE1BQU0sT0FBTyxtQkFBbUI7SUFDdkIsc0JBQXNCLENBQUMsS0FBNkI7UUFDekQsT0FBTyxLQUFLLENBQUMsWUFBWTthQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO2FBQ2xDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQixDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUM7O3NGQVZVLG1CQUFtQjt5RUFBbkIsbUJBQW1CLFdBQW5CLG1CQUFtQjt1RkFBbkIsbUJBQW1CO2NBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvdXRlckhlbHBlclNlcnZpY2Uge1xuICBwdWJsaWMgZ2V0VXJsU2VnbWVudHNGcm9tUm9vdChyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gcm91dGUucGF0aEZyb21Sb290XG4gICAgICAuZmlsdGVyKHIgPT4gci51cmwgJiYgci51cmwubGVuZ3RoKVxuICAgICAgLnJlZHVjZSgoYWNjLCByKSA9PiB7XG4gICAgICAgIHIudXJsLmZvckVhY2godXJsID0+IHtcbiAgICAgICAgICBhY2MucHVzaCh1cmwucGF0aCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwgW10pO1xuICB9XG59XG4iXX0=