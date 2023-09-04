import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../shared/logger/logger.service';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { PaymentLibService } from '../../payment-lib.service';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../shared/logger/logger.service";
import * as i3 from "../shared/error-handler.service";
import * as i4 from "../../payment-lib.service";
export class CaseTransactionsService {
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
    getPaymentGroups(ccdCaseNumber) {
        this.logger.info('Case-transactions-service getPaymentGroups for: ', ccdCaseNumber);
        return this.http.get(`${this.paymentLibService.API_ROOT}/cases/${ccdCaseNumber}/paymentgroups`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    static ɵfac = function CaseTransactionsService_Factory(t) { return new (t || CaseTransactionsService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.LoggerService), i0.ɵɵinject(i3.ErrorHandlerService), i0.ɵɵinject(i4.PaymentLibService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CaseTransactionsService, factory: CaseTransactionsService.ɵfac, providedIn: 'root' });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseTransactionsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.LoggerService }, { type: i3.ErrorHandlerService }, { type: i4.PaymentLibService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS10cmFuc2FjdGlvbnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvc2VydmljZXMvY2FzZS10cmFuc2FjdGlvbnMvY2FzZS10cmFuc2FjdGlvbnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFLNUMsTUFBTSxPQUFPLHVCQUF1QjtJQUVkO0lBQ1Y7SUFDQTtJQUNBO0lBSFYsWUFBb0IsSUFBZ0IsRUFDMUIsTUFBcUIsRUFDckIsbUJBQXdDLEVBQ3hDLGlCQUFvQztRQUgxQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQzFDLENBQUM7SUFFTCxnQkFBZ0IsQ0FBQyxhQUFxQjtRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrREFBa0QsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVwRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFrQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLFVBQVUsYUFBYSxnQkFBZ0IsRUFBRTtZQUMvRyxlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFDO2FBQ0MsSUFBSSxDQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQ2pELENBQUM7SUFDTixDQUFDO2lGQWpCVSx1QkFBdUI7Z0VBQXZCLHVCQUF1QixXQUF2Qix1QkFBdUIsbUJBRnRCLE1BQU07O3VGQUVQLHVCQUF1QjtjQUhuQyxVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9sb2dnZXIvbG9nZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9lcnJvci1oYW5kbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGF5bWVudExpYlNlcnZpY2UgfSBmcm9tICcuLi8uLi9wYXltZW50LWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElQYXltZW50R3JvdXAgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lQYXltZW50R3JvdXAnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZVRyYW5zYWN0aW9uc1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyU2VydmljZSxcbiAgICBwcml2YXRlIGVycm9ySGFuZGxlclNlcnZpY2U6IEVycm9ySGFuZGxlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYXltZW50TGliU2VydmljZTogUGF5bWVudExpYlNlcnZpY2VcbiAgKSB7IH1cblxuICBnZXRQYXltZW50R3JvdXBzKGNjZENhc2VOdW1iZXI6IHN0cmluZyk6IE9ic2VydmFibGU8SVBheW1lbnRHcm91cFtdPiB7XG4gICAgdGhpcy5sb2dnZXIuaW5mbygnQ2FzZS10cmFuc2FjdGlvbnMtc2VydmljZSBnZXRQYXltZW50R3JvdXBzIGZvcjogJywgY2NkQ2FzZU51bWJlcik7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxJUGF5bWVudEdyb3VwW10+KGAke3RoaXMucGF5bWVudExpYlNlcnZpY2UuQVBJX1JPT1R9L2Nhc2VzLyR7Y2NkQ2FzZU51bWJlcn0vcGF5bWVudGdyb3Vwc2AsIHtcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmVycm9ySGFuZGxlclNlcnZpY2UuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICB9XG59XG4iXX0=