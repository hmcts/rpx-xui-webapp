import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AbstractAppConfig } from '../../../../app.config';
import { HttpErrorService } from '../../../services/http/http-error.service';
import { HttpService } from '../../../services/http/http.service';
import { CaseHistory } from '../domain/case-history.model';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/http/http.service";
import * as i2 from "../../../services/http/http-error.service";
import * as i3 from "../../../../app.config";
export class CaseHistoryService {
    constructor(httpService, httpErrorService, appConfig) {
        this.httpService = httpService;
        this.httpErrorService = httpErrorService;
        this.appConfig = appConfig;
    }
    get(caseId, eventId) {
        const url = this.appConfig.getCaseHistoryUrl(caseId, eventId);
        const headers = new HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', CaseHistoryService.V2_MEDIATYPE_CASE_EVENT_VIEW)
            .set('Content-Type', 'application/json');
        return this.httpService
            .get(url, { headers, observe: 'body' })
            .pipe(map((caseHistory) => plainToClass(CaseHistory, caseHistory)), catchError((error) => {
            this.httpErrorService.setError(error);
            return throwError(error);
        }));
    }
}
CaseHistoryService.V2_MEDIATYPE_CASE_EVENT_VIEW = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-event-view.v2+json;charset=UTF-8';
CaseHistoryService.ɵfac = function CaseHistoryService_Factory(t) { return new (t || CaseHistoryService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.HttpErrorService), i0.ɵɵinject(i3.AbstractAppConfig)); };
CaseHistoryService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CaseHistoryService, factory: CaseHistoryService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseHistoryService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.HttpErrorService }, { type: i3.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1oaXN0b3J5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS1oaXN0b3J5L3NlcnZpY2VzL2Nhc2UtaGlzdG9yeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7QUFHM0QsTUFBTSxPQUFPLGtCQUFrQjtJQUk3QixZQUE2QixXQUF3QixFQUN4QixnQkFBa0MsRUFDbEMsU0FBNEI7UUFGNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxjQUFTLEdBQVQsU0FBUyxDQUFtQjtJQUFHLENBQUM7SUFFdEQsR0FBRyxDQUFDLE1BQWMsRUFBRSxPQUFlO1FBQ3hDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFO2FBQzlCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDO2FBQzNCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsNEJBQTRCLENBQUM7YUFDOUQsR0FBRyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRTNDLE9BQU8sSUFBSSxDQUFDLFdBQVc7YUFDcEIsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUM7YUFDcEMsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLFdBQW1CLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFDcEUsVUFBVSxDQUNWLENBQUMsS0FBVSxFQUFPLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQ0YsQ0FBNEIsQ0FBQztJQUNsQyxDQUFDOztBQXhCc0IsK0NBQTRCLEdBQ2pELHFGQUFxRixDQUFDO29GQUY3RSxrQkFBa0I7d0VBQWxCLGtCQUFrQixXQUFsQixrQkFBa0I7dUZBQWxCLGtCQUFrQjtjQUQ5QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwbGFpblRvQ2xhc3MgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBYnN0cmFjdEFwcENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgSHR0cEVycm9yU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2h0dHAvaHR0cC1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvaHR0cC9odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FzZUhpc3RvcnkgfSBmcm9tICcuLi9kb21haW4vY2FzZS1oaXN0b3J5Lm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhc2VIaXN0b3J5U2VydmljZSB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVjJfTUVESUFUWVBFX0NBU0VfRVZFTlRfVklFVyA9XG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC51ay5nb3YuaG1jdHMuY2NkLWRhdGEtc3RvcmUtYXBpLnVpLWV2ZW50LXZpZXcudjIranNvbjtjaGFyc2V0PVVURi04JztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGh0dHBTZXJ2aWNlOiBIdHRwU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBodHRwRXJyb3JTZXJ2aWNlOiBIdHRwRXJyb3JTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGFwcENvbmZpZzogQWJzdHJhY3RBcHBDb25maWcpIHt9XG5cbiAgcHVibGljIGdldChjYXNlSWQ6IHN0cmluZywgZXZlbnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxDYXNlSGlzdG9yeT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuYXBwQ29uZmlnLmdldENhc2VIaXN0b3J5VXJsKGNhc2VJZCwgZXZlbnRJZCk7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXG4gICAgICAuc2V0KCdleHBlcmltZW50YWwnLCAndHJ1ZScpXG4gICAgICAuc2V0KCdBY2NlcHQnLCBDYXNlSGlzdG9yeVNlcnZpY2UuVjJfTUVESUFUWVBFX0NBU0VfRVZFTlRfVklFVylcbiAgICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZVxuICAgICAgLmdldCh1cmwsIHtoZWFkZXJzLCBvYnNlcnZlOiAnYm9keSd9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoY2FzZUhpc3Rvcnk6IG9iamVjdCkgPT4gcGxhaW5Ub0NsYXNzKENhc2VIaXN0b3J5LCBjYXNlSGlzdG9yeSkpLFxuICAgICAgICBjYXRjaEVycm9yKFxuICAgICAgICAoZXJyb3I6IGFueSk6IGFueSA9PiB7XG4gICAgICAgICAgdGhpcy5odHRwRXJyb3JTZXJ2aWNlLnNldEVycm9yKGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICkpIGFzIE9ic2VydmFibGU8Q2FzZUhpc3Rvcnk+O1xuICB9XG59XG4iXX0=