import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { AbstractAppConfig } from '../../../app.config';
import { HttpService } from '../http/http.service';
import { LoadingService } from '../loading/loading.service';
import { RequestOptionsBuilder } from '../request/request.options.builder';
import * as i0 from "@angular/core";
import * as i1 from "../../../app.config";
import * as i2 from "../http/http.service";
import * as i3 from "../request/request.options.builder";
import * as i4 from "../loading/loading.service";
export class SearchService {
    constructor(appConfig, httpService, requestOptionsBuilder, loadingService) {
        this.appConfig = appConfig;
        this.httpService = httpService;
        this.requestOptionsBuilder = requestOptionsBuilder;
        this.loadingService = loadingService;
    }
    search(jurisdictionId, caseTypeId, metaCriteria, caseCriteria, view) {
        const url = `${this.appConfig.getApiUrl()}/caseworkers/:uid/jurisdictions/${jurisdictionId}/case-types/${caseTypeId}/cases`;
        const options = this.requestOptionsBuilder.buildOptions(metaCriteria, caseCriteria, view);
        const loadingToken = this.loadingService.register();
        return this.httpService
            .get(url, options)
            .pipe(map(response => response), finalize(() => this.loadingService.unregister(loadingToken)));
    }
    searchCasesByIds(caseTypeId, filter, view, sort) {
        const url = `${this.appConfig.getCaseDataUrl()}/internal/searchCases?ctid=${caseTypeId}&use_case=${view}`;
        const body = {
            sort,
            ...filter,
            size: this.appConfig.getPaginationPageSize(),
        };
        const loadingToken = this.loadingService.register();
        return this.httpService.post(url, body).pipe(map((response) => response), finalize(() => this.loadingService.unregister(loadingToken)));
    }
    searchCases(caseTypeId, metaCriteria, caseCriteria, view, sort) {
        const url = `${this.appConfig.getCaseDataUrl()}/internal/searchCases?ctid=${caseTypeId}&use_case=${view}`;
        const options = this.requestOptionsBuilder.buildOptions(metaCriteria, caseCriteria, view);
        const body = {
            sort,
            size: this.appConfig.getPaginationPageSize()
        };
        const loadingToken = this.loadingService.register();
        return this.httpService
            .post(url, body, options)
            .pipe(map(response => response), finalize(() => this.loadingService.unregister(loadingToken)));
    }
    getSearchInputUrl(caseTypeId) {
        return `${this.appConfig.getCaseDataUrl()}/internal/case-types/${caseTypeId}/search-inputs`;
    }
    getSearchInputs(jurisdictionId, caseTypeId) {
        const url = this.getSearchInputUrl(caseTypeId);
        const headers = new HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', SearchService.V2_MEDIATYPE_SEARCH_INPUTS)
            .set('Content-Type', 'application/json');
        this.currentJurisdiction = jurisdictionId;
        this.currentCaseType = caseTypeId;
        return this.httpService
            .get(url, { headers, observe: 'body' })
            .pipe(map(body => {
            const searchInputs = body.searchInputs;
            if (this.isDataValid(jurisdictionId, caseTypeId)) {
                searchInputs.forEach(item => {
                    item.field.label = item.label;
                    item.field.display_context_parameter = item.display_context_parameter;
                });
            }
            else {
                throw new Error('Response expired');
            }
            return searchInputs;
        }));
    }
    isDataValid(jurisdictionId, caseTypeId) {
        return this.currentJurisdiction === jurisdictionId && this.currentCaseType === caseTypeId;
    }
}
SearchService.V2_MEDIATYPE_SEARCH_INPUTS = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-search-input-details.v2+json;charset=UTF-8';
// public static readonly VIEW_SEARCH = 'SEARCH';
SearchService.VIEW_WORKBASKET = 'WORKBASKET';
SearchService.ɵfac = function SearchService_Factory(t) { return new (t || SearchService)(i0.ɵɵinject(i1.AbstractAppConfig), i0.ɵɵinject(i2.HttpService), i0.ɵɵinject(i3.RequestOptionsBuilder), i0.ɵɵinject(i4.LoadingService)); };
SearchService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SearchService, factory: SearchService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchService, [{
        type: Injectable
    }], function () { return [{ type: i1.AbstractAppConfig }, { type: i2.HttpService }, { type: i3.RequestOptionsBuilder }, { type: i4.LoadingService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL3NlcnZpY2VzL3NlYXJjaC9zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3hELE9BQU8sRUFBRSxXQUFXLEVBQWUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFjLE1BQU0sb0NBQW9DLENBQUM7Ozs7OztBQUd2RixNQUFNLE9BQU8sYUFBYTtJQVN4QixZQUE2QixTQUE0QixFQUM1QixXQUF3QixFQUN4QixxQkFBNEMsRUFDNUMsY0FBOEI7UUFIOUIsY0FBUyxHQUFULFNBQVMsQ0FBbUI7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFBSSxDQUFDO0lBRXpELE1BQU0sQ0FBQyxjQUFzQixFQUN0QixVQUFrQixFQUNsQixZQUFvQixFQUNwQixZQUFvQixFQUNwQixJQUFpQjtRQUM3QixNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLG1DQUFtQyxjQUFjLGVBQWUsVUFBVSxRQUFRLENBQUM7UUFFNUgsTUFBTSxPQUFPLEdBQWlCLElBQUksQ0FBQyxx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SGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbmFsaXplLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBYnN0cmFjdEFwcENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgU2VhcmNoSW5wdXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NlYXJjaC1maWx0ZXJzJztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdFZpZXcgfSBmcm9tICcuLi8uLi9kb21haW4vc2VhcmNoL3NlYXJjaC1yZXN1bHQtdmlldy5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwU2VydmljZSwgT3B0aW9uc1R5cGUgfSBmcm9tICcuLi9odHRwL2h0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBMb2FkaW5nU2VydmljZSB9IGZyb20gJy4uL2xvYWRpbmcvbG9hZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RPcHRpb25zQnVpbGRlciwgU2VhcmNoVmlldyB9IGZyb20gJy4uL3JlcXVlc3QvcmVxdWVzdC5vcHRpb25zLmJ1aWxkZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VydmljZSB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVjJfTUVESUFUWVBFX1NFQVJDSF9JTlBVVFMgPVxuICAgICdhcHBsaWNhdGlvbi92bmQudWsuZ292LmhtY3RzLmNjZC1kYXRhLXN0b3JlLWFwaS51aS1zZWFyY2gtaW5wdXQtZGV0YWlscy52Mitqc29uO2NoYXJzZXQ9VVRGLTgnO1xuICAvLyBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFZJRVdfU0VBUkNIID0gJ1NFQVJDSCc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVklFV19XT1JLQkFTS0VUID0gJ1dPUktCQVNLRVQnO1xuICAvLyBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEZJRUxEX1BSRUZJWCA9ICdjYXNlLic7XG4gIHByaXZhdGUgY3VycmVudEp1cmlzZGljdGlvbjogc3RyaW5nO1xuICBwcml2YXRlIGN1cnJlbnRDYXNlVHlwZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYXBwQ29uZmlnOiBBYnN0cmFjdEFwcENvbmZpZyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBodHRwU2VydmljZTogSHR0cFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcmVxdWVzdE9wdGlvbnNCdWlsZGVyOiBSZXF1ZXN0T3B0aW9uc0J1aWxkZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbG9hZGluZ1NlcnZpY2U6IExvYWRpbmdTZXJ2aWNlKSB7IH1cblxuICBwdWJsaWMgc2VhcmNoKGp1cmlzZGljdGlvbklkOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgY2FzZVR5cGVJZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIG1ldGFDcml0ZXJpYTogb2JqZWN0LFxuICAgICAgICAgICAgICAgIGNhc2VDcml0ZXJpYTogb2JqZWN0LFxuICAgICAgICAgICAgICAgIHZpZXc/OiBTZWFyY2hWaWV3KTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHRWaWV3PiB7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5hcHBDb25maWcuZ2V0QXBpVXJsKCl9L2Nhc2V3b3JrZXJzLzp1aWQvanVyaXNkaWN0aW9ucy8ke2p1cmlzZGljdGlvbklkfS9jYXNlLXR5cGVzLyR7Y2FzZVR5cGVJZH0vY2FzZXNgO1xuXG4gICAgY29uc3Qgb3B0aW9uczogT3B0aW9uc1R5cGUgID0gdGhpcy5yZXF1ZXN0T3B0aW9uc0J1aWxkZXIuYnVpbGRPcHRpb25zKG1ldGFDcml0ZXJpYSwgY2FzZUNyaXRlcmlhLCB2aWV3KTtcbiAgICBjb25zdCBsb2FkaW5nVG9rZW4gPSB0aGlzLmxvYWRpbmdTZXJ2aWNlLnJlZ2lzdGVyKCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2VcbiAgICAgIC5nZXQodXJsLCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChyZXNwb25zZSA9PiByZXNwb25zZSksXG4gICAgICAgIGZpbmFsaXplKCgpID0+IHRoaXMubG9hZGluZ1NlcnZpY2UudW5yZWdpc3Rlcihsb2FkaW5nVG9rZW4pKVxuICAgICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWFyY2hDYXNlc0J5SWRzKGNhc2VUeXBlSWQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc/OiBTZWFyY2hWaWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0PzogeyBjb2x1bW46IHN0cmluZzsgb3JkZXI6IG51bWJlciB9KTogT2JzZXJ2YWJsZTx7fT4ge1xuICAgIGNvbnN0IHVybCA9XG4gICAgICBgJHt0aGlzLmFwcENvbmZpZy5nZXRDYXNlRGF0YVVybCgpfS9pbnRlcm5hbC9zZWFyY2hDYXNlcz9jdGlkPSR7Y2FzZVR5cGVJZH0mdXNlX2Nhc2U9JHt2aWV3fWA7XG5cbiAgICBjb25zdCBib2R5OiB7fSA9IHtcbiAgICAgIHNvcnQsXG4gICAgICAuLi5maWx0ZXIsXG4gICAgICBzaXplOiB0aGlzLmFwcENvbmZpZy5nZXRQYWdpbmF0aW9uUGFnZVNpemUoKSxcbiAgICB9O1xuICAgIGNvbnN0IGxvYWRpbmdUb2tlbiA9IHRoaXMubG9hZGluZ1NlcnZpY2UucmVnaXN0ZXIoKTtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5wb3N0KHVybCwgYm9keSkucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2UpID0+IHJlc3BvbnNlKSxcbiAgICAgIGZpbmFsaXplKCgpID0+IHRoaXMubG9hZGluZ1NlcnZpY2UudW5yZWdpc3Rlcihsb2FkaW5nVG9rZW4pKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgc2VhcmNoQ2FzZXMoY2FzZVR5cGVJZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgbWV0YUNyaXRlcmlhOiBvYmplY3QsXG4gICAgICAgICAgICAgICAgICAgICBjYXNlQ3JpdGVyaWE6IG9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgIHZpZXc/OiBTZWFyY2hWaWV3LFxuICAgICAgICAgICAgICAgICAgICAgc29ydD86IHtjb2x1bW46IHN0cmluZywgb3JkZXI6IG51bWJlcn0pOiBPYnNlcnZhYmxlPHt9PiB7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5hcHBDb25maWcuZ2V0Q2FzZURhdGFVcmwoKX0vaW50ZXJuYWwvc2VhcmNoQ2FzZXM/Y3RpZD0ke2Nhc2VUeXBlSWR9JnVzZV9jYXNlPSR7dmlld31gO1xuXG4gICAgY29uc3Qgb3B0aW9uczogT3B0aW9uc1R5cGUgPSB0aGlzLnJlcXVlc3RPcHRpb25zQnVpbGRlci5idWlsZE9wdGlvbnMobWV0YUNyaXRlcmlhLCBjYXNlQ3JpdGVyaWEsIHZpZXcpO1xuICAgIGNvbnN0IGJvZHk6IHt9ID0ge1xuICAgICAgc29ydCxcbiAgICAgIHNpemU6IHRoaXMuYXBwQ29uZmlnLmdldFBhZ2luYXRpb25QYWdlU2l6ZSgpXG4gICAgfTtcbiAgICBjb25zdCBsb2FkaW5nVG9rZW4gPSB0aGlzLmxvYWRpbmdTZXJ2aWNlLnJlZ2lzdGVyKCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2VcbiAgICAgIC5wb3N0KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UpLFxuICAgICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLmxvYWRpbmdTZXJ2aWNlLnVucmVnaXN0ZXIobG9hZGluZ1Rva2VuKSlcbiAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2VhcmNoSW5wdXRVcmwoY2FzZVR5cGVJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5hcHBDb25maWcuZ2V0Q2FzZURhdGFVcmwoKX0vaW50ZXJuYWwvY2FzZS10eXBlcy8ke2Nhc2VUeXBlSWR9L3NlYXJjaC1pbnB1dHNgO1xuICB9XG5cbiAgcHVibGljIGdldFNlYXJjaElucHV0cyhqdXJpc2RpY3Rpb25JZDogc3RyaW5nLCBjYXNlVHlwZUlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFNlYXJjaElucHV0W10+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldFNlYXJjaElucHV0VXJsKGNhc2VUeXBlSWQpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICAgLnNldCgnZXhwZXJpbWVudGFsJywgJ3RydWUnKVxuICAgICAgLnNldCgnQWNjZXB0JywgU2VhcmNoU2VydmljZS5WMl9NRURJQVRZUEVfU0VBUkNIX0lOUFVUUylcbiAgICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgdGhpcy5jdXJyZW50SnVyaXNkaWN0aW9uID0ganVyaXNkaWN0aW9uSWQ7XG4gICAgdGhpcy5jdXJyZW50Q2FzZVR5cGUgPSBjYXNlVHlwZUlkO1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlXG4gICAgICAuZ2V0KHVybCwgeyBoZWFkZXJzLCBvYnNlcnZlOiAnYm9keScgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoYm9keSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2VhcmNoSW5wdXRzID0gYm9keS5zZWFyY2hJbnB1dHM7XG4gICAgICAgICAgaWYgKHRoaXMuaXNEYXRhVmFsaWQoanVyaXNkaWN0aW9uSWQsIGNhc2VUeXBlSWQpKSB7XG4gICAgICAgICAgICBzZWFyY2hJbnB1dHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgaXRlbS5maWVsZC5sYWJlbCA9IGl0ZW0ubGFiZWw7XG4gICAgICAgICAgICAgIGl0ZW0uZmllbGQuZGlzcGxheV9jb250ZXh0X3BhcmFtZXRlciA9IGl0ZW0uZGlzcGxheV9jb250ZXh0X3BhcmFtZXRlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Jlc3BvbnNlIGV4cGlyZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHNlYXJjaElucHV0cztcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgaXNEYXRhVmFsaWQoanVyaXNkaWN0aW9uSWQ6IHN0cmluZywgY2FzZVR5cGVJZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEp1cmlzZGljdGlvbiA9PT0ganVyaXNkaWN0aW9uSWQgJiYgdGhpcy5jdXJyZW50Q2FzZVR5cGUgPT09IGNhc2VUeXBlSWQ7XG4gIH1cbn1cbiJdfQ==