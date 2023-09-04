import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractAppConfig } from '../../../../app.config';
import { HttpErrorService } from '../../../services/http/http-error.service';
import { HttpService } from '../../../services/http/http.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/http/http.service";
import * as i2 from "../../../../app.config";
import * as i3 from "../../../services/http/http-error.service";
export class CaseworkerService {
    constructor(http, appConfig, errorService) {
        this.http = http;
        this.appConfig = appConfig;
        this.errorService = errorService;
    }
    getCaseworkers(serviceId) {
        const url = `${this.appConfig.getWorkAllocationApiUrl()}/retrieveCaseWorkersForServices`;
        return this.http
            .post(url, { serviceIds: [serviceId] })
            .pipe(catchError(error => {
            this.errorService.setError(error);
            return throwError(error);
        }));
    }
}
CaseworkerService.ɵfac = function CaseworkerService_Factory(t) { return new (t || CaseworkerService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AbstractAppConfig), i0.ɵɵinject(i3.HttpErrorService)); };
CaseworkerService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CaseworkerService, factory: CaseworkerService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseworkerService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.AbstractAppConfig }, { type: i3.HttpErrorService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS13b3JrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9zZXJ2aWNlcy9jYXNlLXdvcmtlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7OztBQUdsRSxNQUFNLE9BQU8saUJBQWlCO0lBRTVCLFlBQ21CLElBQWlCLEVBQ2pCLFNBQTRCLEVBQzVCLFlBQThCO1FBRjlCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBbUI7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWtCO0lBRWpELENBQUM7SUFFTSxjQUFjLENBQUMsU0FBUztRQUM3QixNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsaUNBQWlDLENBQUM7UUFDekYsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBQyxDQUFDO2FBQ3JDLElBQUksQ0FDSCxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7O2tGQW5CVSxpQkFBaUI7dUVBQWpCLGlCQUFpQixXQUFqQixpQkFBaUI7dUZBQWpCLGlCQUFpQjtjQUQ3QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFic3RyYWN0QXBwQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vYXBwLmNvbmZpZyc7XG5pbXBvcnQgeyBDYXNld29ya2Vyc0J5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi93b3JrLWFsbG9jYXRpb24vY2FzZS13b3JrZXIubW9kZWwnO1xuaW1wb3J0IHsgSHR0cEVycm9yU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2h0dHAvaHR0cC1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvaHR0cC9odHRwLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FzZXdvcmtlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgaHR0cDogSHR0cFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBhcHBDb25maWc6IEFic3RyYWN0QXBwQ29uZmlnLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZXJyb3JTZXJ2aWNlOiBIdHRwRXJyb3JTZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgcHVibGljIGdldENhc2V3b3JrZXJzKHNlcnZpY2VJZCk6IE9ic2VydmFibGU8Q2FzZXdvcmtlcnNCeVNlcnZpY2VbXT4ge1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYXBwQ29uZmlnLmdldFdvcmtBbGxvY2F0aW9uQXBpVXJsKCl9L3JldHJpZXZlQ2FzZVdvcmtlcnNGb3JTZXJ2aWNlc2A7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3QodXJsLCB7IHNlcnZpY2VJZHM6IFtzZXJ2aWNlSWRdfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5zZXRFcnJvcihlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxufVxuIl19