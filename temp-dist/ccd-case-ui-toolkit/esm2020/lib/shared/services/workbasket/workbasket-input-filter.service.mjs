import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AbstractAppConfig } from '../../../app.config';
import { HttpService } from '../http/http.service';
import * as i0 from "@angular/core";
import * as i1 from "../http/http.service";
import * as i2 from "../../../app.config";
export class WorkbasketInputFilterService {
    constructor(httpService, appConfig) {
        this.httpService = httpService;
        this.appConfig = appConfig;
    }
    getWorkbasketInputUrl(caseTypeId) {
        return `${this.appConfig.getCaseDataUrl()}/internal/case-types/${caseTypeId}/work-basket-inputs`;
    }
    getWorkbasketInputs(jurisdictionId, caseTypeId) {
        const url = this.getWorkbasketInputUrl(caseTypeId);
        const headers = new HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', WorkbasketInputFilterService.V2_MEDIATYPE_WORKBASKET_INPUT_DETAILS)
            .set('Content-Type', 'application/json');
        this.currentJurisdiction = jurisdictionId;
        this.currentCaseType = caseTypeId;
        return this.httpService
            .get(url, { headers, observe: 'body' })
            .pipe(map(body => {
            const workbasketInputs = body.workbasketInputs;
            if (this.isDataValid(jurisdictionId, caseTypeId)) {
                workbasketInputs.forEach(item => {
                    item.field.label = item.label;
                    if (item.display_context_parameter) {
                        item.field.display_context_parameter = item.display_context_parameter;
                    }
                });
            }
            else {
                throw new Error('Response expired');
            }
            return workbasketInputs;
        }));
    }
    isDataValid(jurisdictionId, caseTypeId) {
        return this.currentJurisdiction === jurisdictionId && this.currentCaseType === caseTypeId;
    }
}
WorkbasketInputFilterService.V2_MEDIATYPE_WORKBASKET_INPUT_DETAILS = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-workbasket-input-details.v2+json;charset=UTF-8';
WorkbasketInputFilterService.ɵfac = function WorkbasketInputFilterService_Factory(t) { return new (t || WorkbasketInputFilterService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AbstractAppConfig)); };
WorkbasketInputFilterService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WorkbasketInputFilterService, factory: WorkbasketInputFilterService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkbasketInputFilterService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Jhc2tldC1pbnB1dC1maWx0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvd29ya2Jhc2tldC93b3JrYmFza2V0LWlucHV0LWZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFHbkQsTUFBTSxPQUFPLDRCQUE0QjtJQU92QyxZQUE2QixXQUF3QixFQUFtQixTQUE0QjtRQUF2RSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFtQixjQUFTLEdBQVQsU0FBUyxDQUFtQjtJQUNwRyxDQUFDO0lBRU0scUJBQXFCLENBQUMsVUFBa0I7UUFDN0MsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLHdCQUF3QixVQUFVLHFCQUFxQixDQUFDO0lBQ25HLENBQUM7SUFFTSxtQkFBbUIsQ0FBQyxjQUFzQixFQUFFLFVBQWtCO1FBQ25FLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRCxNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRTthQUM5QixHQUFHLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQzthQUMzQixHQUFHLENBQUMsUUFBUSxFQUFFLDRCQUE0QixDQUFDLHFDQUFxQyxDQUFDO2FBQ2pGLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsY0FBYyxDQUFDO1FBQzFDLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLFdBQVc7YUFDcEIsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUM7YUFDcEMsSUFBSSxDQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQy9DLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLEVBQUU7Z0JBQ2hELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDOUIsSUFBSSxJQUFJLENBQUMseUJBQXlCLEVBQUU7d0JBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDO3FCQUN2RTtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUNyQztZQUNELE9BQU8sZ0JBQWdCLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7SUFFTSxXQUFXLENBQUMsY0FBc0IsRUFBRSxVQUFrQjtRQUMzRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxjQUFjLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxVQUFVLENBQUM7SUFDNUYsQ0FBQzs7QUE1Q3NCLGtFQUFxQyxHQUM1RCxtR0FBbUcsQ0FBQzt3R0FGekYsNEJBQTRCO2tGQUE1Qiw0QkFBNEIsV0FBNUIsNEJBQTRCO3VGQUE1Qiw0QkFBNEI7Y0FEeEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWJzdHJhY3RBcHBDb25maWcgfSBmcm9tICcuLi8uLi8uLi9hcHAuY29uZmlnJztcbmltcG9ydCB7IFdvcmtiYXNrZXRJbnB1dE1vZGVsIH0gZnJvbSAnLi4vLi4vZG9tYWluJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vaHR0cC9odHRwLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV29ya2Jhc2tldElucHV0RmlsdGVyU2VydmljZSB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVjJfTUVESUFUWVBFX1dPUktCQVNLRVRfSU5QVVRfREVUQUlMUyA9XG4gICdhcHBsaWNhdGlvbi92bmQudWsuZ292LmhtY3RzLmNjZC1kYXRhLXN0b3JlLWFwaS51aS13b3JrYmFza2V0LWlucHV0LWRldGFpbHMudjIranNvbjtjaGFyc2V0PVVURi04JztcblxuICBwcml2YXRlIGN1cnJlbnRKdXJpc2RpY3Rpb246IHN0cmluZztcbiAgcHJpdmF0ZSBjdXJyZW50Q2FzZVR5cGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGh0dHBTZXJ2aWNlOiBIdHRwU2VydmljZSwgcHJpdmF0ZSByZWFkb25seSBhcHBDb25maWc6IEFic3RyYWN0QXBwQ29uZmlnKSB7XG4gIH1cblxuICBwdWJsaWMgZ2V0V29ya2Jhc2tldElucHV0VXJsKGNhc2VUeXBlSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuYXBwQ29uZmlnLmdldENhc2VEYXRhVXJsKCl9L2ludGVybmFsL2Nhc2UtdHlwZXMvJHtjYXNlVHlwZUlkfS93b3JrLWJhc2tldC1pbnB1dHNgO1xuICB9XG5cbiAgcHVibGljIGdldFdvcmtiYXNrZXRJbnB1dHMoanVyaXNkaWN0aW9uSWQ6IHN0cmluZywgY2FzZVR5cGVJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxXb3JrYmFza2V0SW5wdXRNb2RlbFtdPiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRXb3JrYmFza2V0SW5wdXRVcmwoY2FzZVR5cGVJZCk7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXG4gICAgICAuc2V0KCdleHBlcmltZW50YWwnLCAndHJ1ZScpXG4gICAgICAuc2V0KCdBY2NlcHQnLCBXb3JrYmFza2V0SW5wdXRGaWx0ZXJTZXJ2aWNlLlYyX01FRElBVFlQRV9XT1JLQkFTS0VUX0lOUFVUX0RFVEFJTFMpXG4gICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgdGhpcy5jdXJyZW50SnVyaXNkaWN0aW9uID0ganVyaXNkaWN0aW9uSWQ7XG4gICAgdGhpcy5jdXJyZW50Q2FzZVR5cGUgPSBjYXNlVHlwZUlkO1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlXG4gICAgICAuZ2V0KHVybCwge2hlYWRlcnMsIG9ic2VydmU6ICdib2R5J30pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKGJvZHkgPT4ge1xuICAgICAgICAgIGNvbnN0IHdvcmtiYXNrZXRJbnB1dHMgPSBib2R5LndvcmtiYXNrZXRJbnB1dHM7XG4gICAgICAgICAgaWYgKHRoaXMuaXNEYXRhVmFsaWQoanVyaXNkaWN0aW9uSWQsIGNhc2VUeXBlSWQpKSB7XG4gICAgICAgICAgICB3b3JrYmFza2V0SW5wdXRzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgIGl0ZW0uZmllbGQubGFiZWwgPSBpdGVtLmxhYmVsO1xuICAgICAgICAgICAgICBpZiAoaXRlbS5kaXNwbGF5X2NvbnRleHRfcGFyYW1ldGVyKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5maWVsZC5kaXNwbGF5X2NvbnRleHRfcGFyYW1ldGVyID0gaXRlbS5kaXNwbGF5X2NvbnRleHRfcGFyYW1ldGVyO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXNwb25zZSBleHBpcmVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB3b3JrYmFza2V0SW5wdXRzO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0RhdGFWYWxpZChqdXJpc2RpY3Rpb25JZDogc3RyaW5nLCBjYXNlVHlwZUlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50SnVyaXNkaWN0aW9uID09PSBqdXJpc2RpY3Rpb25JZCAmJiB0aGlzLmN1cnJlbnRDYXNlVHlwZSA9PT0gY2FzZVR5cGVJZDtcbiAgfVxufVxuIl19