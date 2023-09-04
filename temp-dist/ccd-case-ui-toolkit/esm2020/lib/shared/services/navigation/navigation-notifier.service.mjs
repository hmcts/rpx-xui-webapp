import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class NavigationNotifierService {
    constructor() {
        this.navigationSource = new BehaviorSubject({});
        this.navigation = this.navigationSource.asObservable();
    }
    announceNavigation(origin) {
        this.navigationSource.next(origin);
    }
}
NavigationNotifierService.ɵfac = function NavigationNotifierService_Factory(t) { return new (t || NavigationNotifierService)(); };
NavigationNotifierService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NavigationNotifierService, factory: NavigationNotifierService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NavigationNotifierService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1ub3RpZmllci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9uYXZpZ2F0aW9uL25hdmlnYXRpb24tbm90aWZpZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBR3ZDLE1BQU0sT0FBTyx5QkFBeUI7SUFEdEM7UUFFUyxxQkFBZ0IsR0FBeUIsSUFBSSxlQUFlLENBQU0sRUFBRSxDQUFDLENBQUM7UUFDdEUsZUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUsxRDtJQUhRLGtCQUFrQixDQUFDLE1BQVc7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDOztrR0FOVSx5QkFBeUI7K0VBQXpCLHlCQUF5QixXQUF6Qix5QkFBeUI7dUZBQXpCLHlCQUF5QjtjQURyQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uTm90aWZpZXJTZXJ2aWNlIHtcbiAgcHVibGljIG5hdmlnYXRpb25Tb3VyY2U6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHt9KTtcbiAgcHVibGljIG5hdmlnYXRpb24gPSB0aGlzLm5hdmlnYXRpb25Tb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHVibGljIGFubm91bmNlTmF2aWdhdGlvbihvcmlnaW46IGFueSkge1xuICAgIHRoaXMubmF2aWdhdGlvblNvdXJjZS5uZXh0KG9yaWdpbik7XG4gIH1cbn1cbiJdfQ==