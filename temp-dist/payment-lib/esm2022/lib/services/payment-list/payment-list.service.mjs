import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentLibService } from '../../payment-lib.service';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { LoggerService } from '../shared/logger/logger.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../shared/logger/logger.service";
import * as i3 from "../shared/error-handler.service";
import * as i4 from "../../payment-lib.service";
export class PaymentListService {
    http;
    logger;
    errorHandlerService;
    paymentLibService;
    payments;
    constructor(http, logger, errorHandlerService, paymentLibService) {
        this.http = http;
        this.logger = logger;
        this.errorHandlerService = errorHandlerService;
        this.paymentLibService = paymentLibService;
    }
    getPaymentByCcdCaseNumber(ccdCaseNumber, paymentMethod) {
        this.logger.info('Payment-list-service getPaymentByCcdCaseNumber for: ', ccdCaseNumber);
        return this.http.get(`${this.paymentLibService.API_ROOT}/cases/${ccdCaseNumber}/payments`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    static ɵfac = function PaymentListService_Factory(t) { return new (t || PaymentListService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.LoggerService), i0.ɵɵinject(i3.ErrorHandlerService), i0.ɵɵinject(i4.PaymentLibService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PaymentListService, factory: PaymentListService.ɵfac, providedIn: 'root' });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaymentListService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.LoggerService }, { type: i3.ErrorHandlerService }, { type: i4.PaymentLibService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wYXltZW50LWxpYi9zcmMvbGliL3NlcnZpY2VzL3BheW1lbnQtbGlzdC9wYXltZW50LWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdsRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7QUFLaEUsTUFBTSxPQUFPLGtCQUFrQjtJQUdUO0lBQ0E7SUFDQTtJQUNBO0lBTHBCLFFBQVEsQ0FBWTtJQUVwQixZQUFvQixJQUFnQixFQUNoQixNQUFxQixFQUNyQixtQkFBd0MsRUFDeEMsaUJBQW9DO1FBSHBDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFBSSxDQUFDO0lBRzdELHlCQUF5QixDQUFDLGFBQXFCLEVBQUUsYUFBcUI7UUFDcEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0RBQXNELEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFeEYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLFVBQVUsYUFBYSxXQUFXLEVBQUU7WUFDbEcsZUFBZSxFQUFFLElBQUk7U0FDdEIsQ0FBQzthQUNELElBQUksQ0FDSCxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUNqRCxDQUFDO0lBQ04sQ0FBQzs0RUFsQlUsa0JBQWtCO2dFQUFsQixrQkFBa0IsV0FBbEIsa0JBQWtCLG1CQUZqQixNQUFNOzt1RkFFUCxrQkFBa0I7Y0FIOUIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvaW50ZXJuYWwvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1BheW1lbnRMaWJTZXJ2aWNlfSBmcm9tICcuLi8uLi9wYXltZW50LWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IElQYXltZW50cyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVBheW1lbnRzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBFcnJvckhhbmRsZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2Vycm9yLWhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2xvZ2dlci9sb2dnZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFBheW1lbnRMaXN0U2VydmljZSB7XG4gIHBheW1lbnRzOiBJUGF5bWVudHM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlcnJvckhhbmRsZXJTZXJ2aWNlOiBFcnJvckhhbmRsZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHBheW1lbnRMaWJTZXJ2aWNlOiBQYXltZW50TGliU2VydmljZSkgeyB9XG5cblxuICBnZXRQYXltZW50QnlDY2RDYXNlTnVtYmVyKGNjZENhc2VOdW1iZXI6IHN0cmluZywgcGF5bWVudE1ldGhvZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxJUGF5bWVudHM+IHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdQYXltZW50LWxpc3Qtc2VydmljZSBnZXRQYXltZW50QnlDY2RDYXNlTnVtYmVyIGZvcjogJywgY2NkQ2FzZU51bWJlcik7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxJUGF5bWVudHM+KGAke3RoaXMucGF5bWVudExpYlNlcnZpY2UuQVBJX1JPT1R9L2Nhc2VzLyR7Y2NkQ2FzZU51bWJlcn0vcGF5bWVudHNgLCB7XG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==