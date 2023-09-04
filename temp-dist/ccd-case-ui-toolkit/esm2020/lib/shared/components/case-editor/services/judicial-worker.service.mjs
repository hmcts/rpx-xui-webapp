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
export class JudicialworkerService {
    constructor(http, appConfig, errorService) {
        this.http = http;
        this.appConfig = appConfig;
        this.errorService = errorService;
    }
    getJudicialworkers(userIds, serviceId) {
        const url = `${this.appConfig.getWorkAllocationApiUrl()}/getJudicialUsers`;
        return this.http
            .post(url, { userIds, services: [serviceId] })
            .pipe(catchError(error => {
            this.errorService.setError(error);
            return throwError(error);
        }));
    }
}
JudicialworkerService.ɵfac = function JudicialworkerService_Factory(t) { return new (t || JudicialworkerService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AbstractAppConfig), i0.ɵɵinject(i3.HttpErrorService)); };
JudicialworkerService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: JudicialworkerService, factory: JudicialworkerService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(JudicialworkerService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.AbstractAppConfig }, { type: i3.HttpErrorService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVkaWNpYWwtd29ya2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS1lZGl0b3Ivc2VydmljZXMvanVkaWNpYWwtd29ya2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7O0FBR2xFLE1BQU0sT0FBTyxxQkFBcUI7SUFFaEMsWUFDbUIsSUFBaUIsRUFDakIsU0FBNEIsRUFDNUIsWUFBOEI7UUFGOUIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFtQjtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBa0I7SUFFakQsQ0FBQztJQUVNLGtCQUFrQixDQUFDLE9BQWlCLEVBQUUsU0FBaUI7UUFDNUQsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLG1CQUFtQixDQUFDO1FBQzNFLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUM7YUFDM0MsSUFBSSxDQUNILFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQzs7MEZBbkJVLHFCQUFxQjsyRUFBckIscUJBQXFCLFdBQXJCLHFCQUFxQjt1RkFBckIscUJBQXFCO2NBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWJzdHJhY3RBcHBDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9hcHAuY29uZmlnJztcbmltcG9ydCB7IEp1ZGljaWFsd29ya2VyIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL3dvcmstYWxsb2NhdGlvbi9qdWRpY2lhbC13b3JrZXIubW9kZWwnO1xuaW1wb3J0IHsgSHR0cEVycm9yU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2h0dHAvaHR0cC1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvaHR0cC9odHRwLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnVkaWNpYWx3b3JrZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IGh0dHA6IEh0dHBTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXBwQ29uZmlnOiBBYnN0cmFjdEFwcENvbmZpZyxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVycm9yU2VydmljZTogSHR0cEVycm9yU2VydmljZVxuICApIHtcbiAgfVxuXG4gIHB1YmxpYyBnZXRKdWRpY2lhbHdvcmtlcnModXNlcklkczogc3RyaW5nW10sIHNlcnZpY2VJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxKdWRpY2lhbHdvcmtlcltdPiB7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5hcHBDb25maWcuZ2V0V29ya0FsbG9jYXRpb25BcGlVcmwoKX0vZ2V0SnVkaWNpYWxVc2Vyc2A7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3QodXJsLCB7dXNlcklkcywgc2VydmljZXM6IFtzZXJ2aWNlSWRdfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5zZXRFcnJvcihlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxufVxuIl19