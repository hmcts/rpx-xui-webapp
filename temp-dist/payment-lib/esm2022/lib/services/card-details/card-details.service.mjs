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
export class CardDetailsService {
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
    getCardDetails(paymentReference) {
        this.logger.info('Card-detail-service getCardDetails for: ', paymentReference);
        return this.http.get(`${this.paymentLibService.API_ROOT}/card-payments/${paymentReference}/details`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    static ɵfac = function CardDetailsService_Factory(t) { return new (t || CardDetailsService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.LoggerService), i0.ɵɵinject(i3.ErrorHandlerService), i0.ɵɵinject(i4.PaymentLibService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CardDetailsService, factory: CardDetailsService.ɵfac, providedIn: 'root' });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CardDetailsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.LoggerService }, { type: i3.ErrorHandlerService }, { type: i4.PaymentLibService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1kZXRhaWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wYXltZW50LWxpYi9zcmMvbGliL3NlcnZpY2VzL2NhcmQtZGV0YWlscy9jYXJkLWRldGFpbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUloRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7QUFNaEUsTUFBTSxPQUFPLGtCQUFrQjtJQUVUO0lBQ0E7SUFDQTtJQUNBO0lBSHBCLFlBQW9CLElBQWdCLEVBQ2hCLE1BQXFCLEVBQ3JCLG1CQUF3QyxFQUN4QyxpQkFBb0M7UUFIcEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUFJLENBQUM7SUFFN0QsY0FBYyxDQUFDLGdCQUF3QjtRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywwQ0FBMEMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRS9FLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxrQkFBa0IsZ0JBQWdCLFVBQVUsRUFBRTtZQUMvRyxlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFDO2FBQ0QsSUFBSSxDQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQ2pELENBQUM7SUFDTixDQUFDOzRFQWhCVSxrQkFBa0I7Z0VBQWxCLGtCQUFrQixXQUFsQixrQkFBa0IsbUJBRmpCLE1BQU07O3VGQUVQLGtCQUFrQjtjQUg5QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9pbnRlcm5hbC9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHtJQ2FyZERldGFpbHN9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSUNhcmREZXRhaWxzJztcbmltcG9ydCB7UGF5bWVudExpYlNlcnZpY2V9IGZyb20gJy4uLy4uL3BheW1lbnQtbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEVycm9ySGFuZGxlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvZXJyb3ItaGFuZGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbG9nZ2VyL2xvZ2dlci5zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBDYXJkRGV0YWlsc1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBsb2dnZXI6IExvZ2dlclNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgZXJyb3JIYW5kbGVyU2VydmljZTogRXJyb3JIYW5kbGVyU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwYXltZW50TGliU2VydmljZTogUGF5bWVudExpYlNlcnZpY2UpIHsgfVxuXG4gIGdldENhcmREZXRhaWxzKHBheW1lbnRSZWZlcmVuY2U6IHN0cmluZyk6IE9ic2VydmFibGU8SUNhcmREZXRhaWxzPiB7XG4gICAgdGhpcy5sb2dnZXIuaW5mbygnQ2FyZC1kZXRhaWwtc2VydmljZSBnZXRDYXJkRGV0YWlscyBmb3I6ICcsIHBheW1lbnRSZWZlcmVuY2UpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8SUNhcmREZXRhaWxzPihgJHt0aGlzLnBheW1lbnRMaWJTZXJ2aWNlLkFQSV9ST09UfS9jYXJkLXBheW1lbnRzLyR7cGF5bWVudFJlZmVyZW5jZX0vZGV0YWlsc2AsIHtcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5lcnJvckhhbmRsZXJTZXJ2aWNlLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgfVxufVxuIl19