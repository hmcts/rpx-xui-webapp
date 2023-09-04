import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SessionStorageService } from '../../../services/session/session-storage.service';
import { WorkAllocationService } from '../../case-editor/services/work-allocation.service';
import * as i0 from "@angular/core";
import * as i1 from "../../case-editor/services/work-allocation.service";
import * as i2 from "../../../services/session/session-storage.service";
export class EventTasksResolverService {
    constructor(service, sessionStorageService) {
        this.service = service;
        this.sessionStorageService = sessionStorageService;
    }
    resolve(route) {
        const eventId = route.queryParamMap.get('eventId');
        const caseId = route.queryParamMap.get('caseId');
        const caseInfoStr = this.sessionStorageService.getItem('caseInfo');
        const caseInfo = JSON.parse(caseInfoStr);
        if (caseInfo) {
            return this.service.getTasksByCaseIdAndEventId(eventId, caseId, caseInfo.caseType, caseInfo.jurisdiction)
                .pipe(map((payload) => payload.tasks));
        }
    }
}
EventTasksResolverService.ɵfac = function EventTasksResolverService_Factory(t) { return new (t || EventTasksResolverService)(i0.ɵɵinject(i1.WorkAllocationService), i0.ɵɵinject(i2.SessionStorageService)); };
EventTasksResolverService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EventTasksResolverService, factory: EventTasksResolverService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventTasksResolverService, [{
        type: Injectable
    }], function () { return [{ type: i1.WorkAllocationService }, { type: i2.SessionStorageService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtdGFza3MtcmVzb2x2ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9ldmVudC1zdGFydC9yZXNvbHZlcnMvZXZlbnQtdGFza3MtcmVzb2x2ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdyQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUMxRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQzs7OztBQUczRixNQUFNLE9BQU8seUJBQXlCO0lBRXBDLFlBQTZCLE9BQThCLEVBQzlCLHFCQUE0QztRQUQ1QyxZQUFPLEdBQVAsT0FBTyxDQUF1QjtRQUM5QiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO0lBQ3pFLENBQUM7SUFFTSxPQUFPLENBQUMsS0FBNkI7UUFDMUMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksUUFBUSxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDO2lCQUN4RyxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsT0FBb0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUM3QyxDQUFDO1NBQ0g7SUFDSCxDQUFDOztrR0FqQlUseUJBQXlCOytFQUF6Qix5QkFBeUIsV0FBekIseUJBQXlCO3VGQUF6Qix5QkFBeUI7Y0FEckMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJlc29sdmUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi93b3JrLWFsbG9jYXRpb24vVGFzayc7XG5pbXBvcnQgeyBUYXNrUGF5bG9hZCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi93b3JrLWFsbG9jYXRpb24vVGFza1BheWxvYWQnO1xuaW1wb3J0IHsgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvc2Vzc2lvbi9zZXNzaW9uLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBXb3JrQWxsb2NhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jYXNlLWVkaXRvci9zZXJ2aWNlcy93b3JrLWFsbG9jYXRpb24uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFdmVudFRhc2tzUmVzb2x2ZXJTZXJ2aWNlIGltcGxlbWVudHMgUmVzb2x2ZTxUYXNrW10+IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHNlcnZpY2U6IFdvcmtBbGxvY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBzZXNzaW9uU3RvcmFnZVNlcnZpY2U6IFNlc3Npb25TdG9yYWdlU2VydmljZSkge1xuICB9XG5cbiAgcHVibGljIHJlc29sdmUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPFRhc2tbXT4ge1xuICAgIGNvbnN0IGV2ZW50SWQgPSByb3V0ZS5xdWVyeVBhcmFtTWFwLmdldCgnZXZlbnRJZCcpO1xuICAgIGNvbnN0IGNhc2VJZCA9IHJvdXRlLnF1ZXJ5UGFyYW1NYXAuZ2V0KCdjYXNlSWQnKTtcbiAgICBjb25zdCBjYXNlSW5mb1N0ciA9IHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLmdldEl0ZW0oJ2Nhc2VJbmZvJyk7XG4gICAgY29uc3QgY2FzZUluZm8gPSBKU09OLnBhcnNlKGNhc2VJbmZvU3RyKTtcbiAgICBpZiAoY2FzZUluZm8pIHtcbiAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0VGFza3NCeUNhc2VJZEFuZEV2ZW50SWQoZXZlbnRJZCwgY2FzZUlkLCBjYXNlSW5mby5jYXNlVHlwZSwgY2FzZUluZm8uanVyaXNkaWN0aW9uKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocGF5bG9hZDogVGFza1BheWxvYWQpID0+IHBheWxvYWQudGFza3MpXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19