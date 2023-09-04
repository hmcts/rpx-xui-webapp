import { Injectable } from '@angular/core';
import { PaymentLibService } from '../../payment-lib.service';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../shared/logger/logger.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../shared/logger/logger.service";
import * as i3 from "../shared/error-handler.service";
import * as i4 from "../../payment-lib.service";
export class StatusHistoryService {
    http;
    logger;
    errorHandlerService;
    paymentLibService;
    constructor(http, logger, errorHandlerService, paymentLibService) {
        this.http = http;
        this.logger = logger;
        this.errorHandlerService = errorHandlerService;
        this.paymentLibService = paymentLibService;
    }
    getPaymentStatusesByReference(paymentReference, paymentMethod) {
        this.logger.info('Status-history-service getPaymentStatusesByReference for: ', paymentReference);
        return this.http.get(paymentMethod === 'card' || paymentMethod === 'cash' || paymentMethod === 'cheque' || paymentMethod === 'postal order' ?
            `${this.paymentLibService.API_ROOT}/card-payments/${paymentReference}/statuses` :
            `${this.paymentLibService.API_ROOT}/credit-account-payments/${paymentReference}/statuses`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    static ɵfac = function StatusHistoryService_Factory(t) { return new (t || StatusHistoryService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.LoggerService), i0.ɵɵinject(i3.ErrorHandlerService), i0.ɵɵinject(i4.PaymentLibService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: StatusHistoryService, factory: StatusHistoryService.ɵfac, providedIn: 'root' });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StatusHistoryService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.LoggerService }, { type: i3.ErrorHandlerService }, { type: i4.PaymentLibService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWhpc3Rvcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvc2VydmljZXMvc3RhdHVzLWhpc3Rvcnkvc3RhdHVzLWhpc3Rvcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7QUFNaEUsTUFBTSxPQUFPLG9CQUFvQjtJQUVYO0lBQ0E7SUFDQTtJQUNBO0lBSHBCLFlBQW9CLElBQWdCLEVBQ2hCLE1BQXFCLEVBQ3JCLG1CQUF3QyxFQUN4QyxpQkFBb0M7UUFIcEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUFJLENBQUM7SUFFN0QsNkJBQTZCLENBQUMsZ0JBQXdCLEVBQUUsYUFBcUI7UUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNERBQTRELEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUVqRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFtQixhQUFhLEtBQUssTUFBTSxJQUFJLGFBQWEsS0FBSyxNQUFNLElBQUksYUFBYSxLQUFLLFFBQVEsSUFBSSxhQUFhLEtBQUssY0FBYyxDQUFDLENBQUM7WUFDekosR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxrQkFBa0IsZ0JBQWdCLFdBQVcsQ0FBQyxDQUFDO1lBQ2pGLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsNEJBQTRCLGdCQUFnQixXQUFXLEVBQUU7WUFDN0YsZUFBZSxFQUFFLElBQUk7U0FDdEIsQ0FBQzthQUNELElBQUksQ0FDSCxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUNqRCxDQUFDO0lBQ04sQ0FBQzs4RUFsQlUsb0JBQW9CO2dFQUFwQixvQkFBb0IsV0FBcEIsb0JBQW9CLG1CQUZuQixNQUFNOzt1RkFFUCxvQkFBb0I7Y0FIaEMsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGF5bWVudExpYlNlcnZpY2UgfSBmcm9tICcuLi8uLi9wYXltZW50LWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJU3RhdHVzSGlzdG9yaWVzIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JU3RhdHVzSGlzdG9yaWVzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL2ludGVybmFsL09ic2VydmFibGUnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9lcnJvci1oYW5kbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbG9nZ2VyL2xvZ2dlci5zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTdGF0dXNIaXN0b3J5U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlcnJvckhhbmRsZXJTZXJ2aWNlOiBFcnJvckhhbmRsZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHBheW1lbnRMaWJTZXJ2aWNlOiBQYXltZW50TGliU2VydmljZSkgeyB9XG5cbiAgZ2V0UGF5bWVudFN0YXR1c2VzQnlSZWZlcmVuY2UocGF5bWVudFJlZmVyZW5jZTogc3RyaW5nLCBwYXltZW50TWV0aG9kOiBzdHJpbmcpOiBPYnNlcnZhYmxlPElTdGF0dXNIaXN0b3JpZXM+IHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdTdGF0dXMtaGlzdG9yeS1zZXJ2aWNlIGdldFBheW1lbnRTdGF0dXNlc0J5UmVmZXJlbmNlIGZvcjogJywgcGF5bWVudFJlZmVyZW5jZSk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxJU3RhdHVzSGlzdG9yaWVzPihwYXltZW50TWV0aG9kID09PSAnY2FyZCcgfHwgcGF5bWVudE1ldGhvZCA9PT0gJ2Nhc2gnIHx8IHBheW1lbnRNZXRob2QgPT09ICdjaGVxdWUnIHx8IHBheW1lbnRNZXRob2QgPT09ICdwb3N0YWwgb3JkZXInID9cbiAgICAgICAgICBgJHt0aGlzLnBheW1lbnRMaWJTZXJ2aWNlLkFQSV9ST09UfS9jYXJkLXBheW1lbnRzLyR7cGF5bWVudFJlZmVyZW5jZX0vc3RhdHVzZXNgIDpcbiAgICAgICAgICBgJHt0aGlzLnBheW1lbnRMaWJTZXJ2aWNlLkFQSV9ST09UfS9jcmVkaXQtYWNjb3VudC1wYXltZW50cy8ke3BheW1lbnRSZWZlcmVuY2V9L3N0YXR1c2VzYCwge1xuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmVycm9ySGFuZGxlclNlcnZpY2UuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICB9XG59XG4iXX0=