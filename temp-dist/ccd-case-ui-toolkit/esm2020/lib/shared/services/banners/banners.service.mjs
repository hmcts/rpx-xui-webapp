import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AbstractAppConfig } from '../../../app.config';
import { HttpService } from '../http/http.service';
import * as i0 from "@angular/core";
import * as i1 from "../http/http.service";
import * as i2 from "../../../app.config";
export class BannersService {
    constructor(httpService, appConfig) {
        this.httpService = httpService;
        this.appConfig = appConfig;
    }
    getBanners(jurisdictionReferences) {
        const url = this.appConfig.getBannersUrl();
        const headers = new HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', BannersService.V2_MEDIATYPE_BANNERS)
            .set('Content-Type', 'application/json');
        let params = new HttpParams();
        jurisdictionReferences.forEach(reference => params = params.append('ids', reference));
        return this.httpService
            .get(url, { params, headers, observe: 'body' })
            .pipe(map(body => body.banners));
    }
}
BannersService.V2_MEDIATYPE_BANNERS = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-banners.v2+json;charset=UTF-8';
BannersService.ɵfac = function BannersService_Factory(t) { return new (t || BannersService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AbstractAppConfig)); };
BannersService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: BannersService, factory: BannersService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BannersService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVycy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9iYW5uZXJzL2Jhbm5lcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQUduRCxNQUFNLE9BQU8sY0FBYztJQUd6QixZQUE2QixXQUF3QixFQUFtQixTQUE0QjtRQUF2RSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFtQixjQUFTLEdBQVQsU0FBUyxDQUFtQjtJQUNwRyxDQUFDO0lBRU0sVUFBVSxDQUFDLHNCQUFnQztRQUNoRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNDLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFO2FBQzlCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDO2FBQzNCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLG9CQUFvQixDQUFDO2FBQ2xELEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUMzQyxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzlCLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLE9BQU8sSUFBSSxDQUFDLFdBQVc7YUFDcEIsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQyxDQUFDO2FBQzVDLElBQUksQ0FDSCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQzFCLENBQUM7SUFDTixDQUFDOztBQWxCc0IsbUNBQW9CLEdBQUcsa0ZBQWtGLENBQUM7NEVBRHRILGNBQWM7b0VBQWQsY0FBYyxXQUFkLGNBQWM7dUZBQWQsY0FBYztjQUQxQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBYnN0cmFjdEFwcENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgQmFubmVyIH0gZnJvbSAnLi4vLi4vZG9tYWluL2RlZmluaXRpb24vYmFubmVyLm1vZGVsJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vaHR0cC9odHRwLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFubmVyc1NlcnZpY2Uge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFYyX01FRElBVFlQRV9CQU5ORVJTID0gJ2FwcGxpY2F0aW9uL3ZuZC51ay5nb3YuaG1jdHMuY2NkLWRhdGEtc3RvcmUtYXBpLnVpLWJhbm5lcnMudjIranNvbjtjaGFyc2V0PVVURi04JztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGh0dHBTZXJ2aWNlOiBIdHRwU2VydmljZSwgcHJpdmF0ZSByZWFkb25seSBhcHBDb25maWc6IEFic3RyYWN0QXBwQ29uZmlnKSB7XG4gIH1cblxuICBwdWJsaWMgZ2V0QmFubmVycyhqdXJpc2RpY3Rpb25SZWZlcmVuY2VzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8QmFubmVyW10+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmFwcENvbmZpZy5nZXRCYW5uZXJzVXJsKCk7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXG4gICAgICAuc2V0KCdleHBlcmltZW50YWwnLCAndHJ1ZScpXG4gICAgICAuc2V0KCdBY2NlcHQnLCBCYW5uZXJzU2VydmljZS5WMl9NRURJQVRZUEVfQkFOTkVSUylcbiAgICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAganVyaXNkaWN0aW9uUmVmZXJlbmNlcy5mb3JFYWNoKHJlZmVyZW5jZSA9PiBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdpZHMnLCByZWZlcmVuY2UpKTtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZVxuICAgICAgLmdldCh1cmwsIHtwYXJhbXMsIGhlYWRlcnMsIG9ic2VydmU6ICdib2R5J30pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKGJvZHkgPT4gYm9keS5iYW5uZXJzKVxuICAgICAgKTtcbiAgfVxufVxuIl19