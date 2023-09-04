import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AbstractAppConfig as AppConfig } from '../../../app.config';
import { HttpService } from '../http/http.service';
import * as i0 from "@angular/core";
import * as i1 from "../http/http.service";
import * as i2 from "../../../app.config";
export class DefinitionsService {
    constructor(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    getCaseTypes(jurisdictionId, access) {
        const url = `${this.appConfig.getApiUrl()}/caseworkers/:uid/jurisdictions/${jurisdictionId}/case-types?access=${access}`;
        return this.http
            .get(url).pipe(map(response => response));
    }
    getJurisdictions(access) {
        const url = `${this.appConfig.getApiUrl()}/caseworkers/:uid/jurisdictions?access=${access}`;
        return this.http
            .get(url)
            .pipe(map(response => response));
    }
}
DefinitionsService.ɵfac = function DefinitionsService_Factory(t) { return new (t || DefinitionsService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AbstractAppConfig)); };
DefinitionsService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DefinitionsService, factory: DefinitionsService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DefinitionsService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvZGVmaW5pdGlvbnMvZGVmaW5pdGlvbnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLElBQUksU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBR25ELE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBNkIsSUFBaUIsRUFBbUIsU0FBb0I7UUFBeEQsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFtQixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUcsQ0FBQztJQUVsRixZQUFZLENBQUMsY0FBc0IsRUFBRSxNQUFjO1FBQ3hELE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsbUNBQW1DLGNBQWMsc0JBQXNCLE1BQU0sRUFBRSxDQUFDO1FBRXpILE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLGdCQUFnQixDQUFDLE1BQWM7UUFDcEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSwwQ0FBMEMsTUFBTSxFQUFFLENBQUM7UUFFNUYsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDOztvRkFoQlUsa0JBQWtCO3dFQUFsQixrQkFBa0IsV0FBbEIsa0JBQWtCO3VGQUFsQixrQkFBa0I7Y0FEOUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFic3RyYWN0QXBwQ29uZmlnIGFzIEFwcENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgQ2FzZVR5cGVMaXRlIH0gZnJvbSAnLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS10eXBlLWxpdGUubW9kZWwnO1xuaW1wb3J0IHsgSnVyaXNkaWN0aW9uIH0gZnJvbSAnLi4vLi4vZG9tYWluL2RlZmluaXRpb24vanVyaXNkaWN0aW9uLm1vZGVsJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vaHR0cC9odHRwLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVmaW5pdGlvbnNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBodHRwOiBIdHRwU2VydmljZSwgcHJpdmF0ZSByZWFkb25seSBhcHBDb25maWc6IEFwcENvbmZpZykge31cblxuICBwdWJsaWMgZ2V0Q2FzZVR5cGVzKGp1cmlzZGljdGlvbklkOiBzdHJpbmcsIGFjY2Vzczogc3RyaW5nKTogT2JzZXJ2YWJsZTxDYXNlVHlwZUxpdGVbXT4ge1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYXBwQ29uZmlnLmdldEFwaVVybCgpfS9jYXNld29ya2Vycy86dWlkL2p1cmlzZGljdGlvbnMvJHtqdXJpc2RpY3Rpb25JZH0vY2FzZS10eXBlcz9hY2Nlc3M9JHthY2Nlc3N9YDtcblxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQodXJsKS5waXBlKG1hcChyZXNwb25zZSA9PiByZXNwb25zZSkpO1xuICB9XG5cbiAgcHVibGljIGdldEp1cmlzZGljdGlvbnMoYWNjZXNzOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEp1cmlzZGljdGlvbltdPiB7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5hcHBDb25maWcuZ2V0QXBpVXJsKCl9L2Nhc2V3b3JrZXJzLzp1aWQvanVyaXNkaWN0aW9ucz9hY2Nlc3M9JHthY2Nlc3N9YDtcblxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQodXJsKVxuICAgICAgLnBpcGUobWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlKSk7XG4gIH1cbn1cbiJdfQ==