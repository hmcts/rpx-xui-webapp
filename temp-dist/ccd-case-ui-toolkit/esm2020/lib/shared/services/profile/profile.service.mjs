import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { AbstractAppConfig } from '../../../app.config';
import { Profile } from '../../domain/profile/profile.model';
import { HttpService } from '../http/http.service';
import * as i0 from "@angular/core";
import * as i1 from "../http/http.service";
import * as i2 from "../../../app.config";
export class ProfileService {
    constructor(httpService, appConfig) {
        this.httpService = httpService;
        this.appConfig = appConfig;
    }
    get() {
        const url = this.appConfig.getCaseDataUrl() + ProfileService.URL;
        const headers = new HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', ProfileService.V2_MEDIATYPE_USER_PROFILE)
            .set('Content-Type', 'application/json');
        return this.httpService
            .get(url, { headers, observe: 'body' })
            .pipe(map((p) => plainToClass(Profile, p)));
    }
}
ProfileService.V2_MEDIATYPE_USER_PROFILE = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-user-profile.v2+json;charset=UTF-8';
ProfileService.URL = '/internal/profile';
ProfileService.ɵfac = function ProfileService_Factory(t) { return new (t || ProfileService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AbstractAppConfig)); };
ProfileService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ProfileService, factory: ProfileService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProfileService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9wcm9maWxlL3Byb2ZpbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFHbkQsTUFBTSxPQUFPLGNBQWM7SUFNekIsWUFBNkIsV0FBd0IsRUFBbUIsU0FBNEI7UUFBdkUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBbUIsY0FBUyxHQUFULFNBQVMsQ0FBbUI7SUFBRyxDQUFDO0lBRWpHLEdBQUc7UUFDUixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7UUFDakUsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUU7YUFDOUIsR0FBRyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUM7YUFDM0IsR0FBRyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMseUJBQXlCLENBQUM7YUFDdkQsR0FBRyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRTNDLE9BQU8sSUFBSSxDQUFDLFdBQVc7YUFDcEIsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUM7YUFDcEMsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUM3QyxDQUFDO0lBQ04sQ0FBQzs7QUFsQnNCLHdDQUF5QixHQUM5Qyx1RkFBdUYsQ0FBQztBQUNsRSxrQkFBRyxHQUFHLG1CQUFtQixDQUFDOzRFQUp2QyxjQUFjO29FQUFkLGNBQWMsV0FBZCxjQUFjO3VGQUFkLGNBQWM7Y0FEMUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcGxhaW5Ub0NsYXNzIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWJzdHJhY3RBcHBDb25maWcgfSBmcm9tICcuLi8uLi8uLi9hcHAuY29uZmlnJztcbmltcG9ydCB7IFByb2ZpbGUgfSBmcm9tICcuLi8uLi9kb21haW4vcHJvZmlsZS9wcm9maWxlLm1vZGVsJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vaHR0cC9odHRwLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJvZmlsZVNlcnZpY2Uge1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVjJfTUVESUFUWVBFX1VTRVJfUFJPRklMRSA9XG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC51ay5nb3YuaG1jdHMuY2NkLWRhdGEtc3RvcmUtYXBpLnVpLXVzZXItcHJvZmlsZS52Mitqc29uO2NoYXJzZXQ9VVRGLTgnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBVUkwgPSAnL2ludGVybmFsL3Byb2ZpbGUnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaHR0cFNlcnZpY2U6IEh0dHBTZXJ2aWNlLCBwcml2YXRlIHJlYWRvbmx5IGFwcENvbmZpZzogQWJzdHJhY3RBcHBDb25maWcpIHt9XG5cbiAgcHVibGljIGdldCgpOiBPYnNlcnZhYmxlPFByb2ZpbGU+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmFwcENvbmZpZy5nZXRDYXNlRGF0YVVybCgpICsgUHJvZmlsZVNlcnZpY2UuVVJMO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICAgLnNldCgnZXhwZXJpbWVudGFsJywgJ3RydWUnKVxuICAgICAgLnNldCgnQWNjZXB0JywgUHJvZmlsZVNlcnZpY2UuVjJfTUVESUFUWVBFX1VTRVJfUFJPRklMRSlcbiAgICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZVxuICAgICAgLmdldCh1cmwsIHtoZWFkZXJzLCBvYnNlcnZlOiAnYm9keSd9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocDogb2JqZWN0KSA9PiBwbGFpblRvQ2xhc3MoUHJvZmlsZSwgcCkpXG4gICAgICApO1xuICB9XG5cbn1cbiJdfQ==