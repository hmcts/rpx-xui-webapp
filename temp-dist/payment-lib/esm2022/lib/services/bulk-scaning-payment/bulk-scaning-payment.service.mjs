import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { WebComponentHttpClient } from '../shared/httpclient/webcomponent.http.client';
import { PaymentLibService } from '../../payment-lib.service';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../shared/httpclient/webcomponent.http.client";
import * as i3 from "../shared/error-handler.service";
import * as i4 from "../../payment-lib.service";
export class BulkScaningPaymentService {
    http;
    https;
    errorHandlerService;
    paymentLibService;
    constructor(http, https, errorHandlerService, paymentLibService) {
        this.http = http;
        this.https = https;
        this.errorHandlerService = errorHandlerService;
        this.paymentLibService = paymentLibService;
    }
    getBSPaymentsByCCD(ccdCaseNumber) {
        return this.http.get(`${this.paymentLibService.BULKSCAN_API_ROOT}/cases/${ccdCaseNumber}`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    getBSPaymentsByDCN(dcn) {
        return this.http.get(`${this.paymentLibService.BULKSCAN_API_ROOT}/cases?document_control_number=${dcn}`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    postBSAllocatePayment(body, paymentRef) {
        return this.https.post(`${this.paymentLibService.API_ROOT}/payment-groups/${paymentRef}/bulk-scan-payments`, body).pipe(catchError(this.errorHandlerService.handleError));
    }
    postBSPaymentStrategic(body, paymentGroupRef) {
        return this.https.post(`${this.paymentLibService.API_ROOT}/payment-groups/${paymentGroupRef}/bulk-scan-payments-strategic`, body).pipe(catchError(this.errorHandlerService.handleError));
    }
    postBSWoPGStrategic(body) {
        return this.https.post(`${this.paymentLibService.API_ROOT}/payment-groups/bulk-scan-payments-strategic`, body).pipe(catchError(this.errorHandlerService.handleError));
    }
    patchBSChangeStatus(dcnNumber, status) {
        return this.https.patch(`${this.paymentLibService.API_ROOT}/bulk-scan-payments/${dcnNumber}/status/${status}`, status).pipe(catchError(this.errorHandlerService.handleError));
    }
    calculateOutStandingAmount(paymentGroup) {
        let feesTotal = 0.00, paymentsTotal = 0.00, remissionsTotal = 0.00;
        if (paymentGroup.fees) {
            paymentGroup.fees.forEach(fee => {
                feesTotal = feesTotal + fee.calculated_amount;
            });
        }
        if (paymentGroup.payments) {
            paymentGroup.payments.forEach(payment => {
                if (payment.status.toUpperCase() === 'SUCCESS') {
                    paymentsTotal = paymentsTotal + payment.amount;
                }
            });
        }
        if (paymentGroup.remissions) {
            paymentGroup.remissions.forEach(remission => {
                remissionsTotal = remissionsTotal + remission.hwf_amount;
            });
        }
        return (feesTotal - remissionsTotal) - paymentsTotal;
    }
    removeUnwantedString(input, replaceText) {
        const pattern = /[\_]/gi;
        return input.replace(pattern, replaceText);
    }
    downloadSelectedReport(reportName, startDate, endDate) {
        return this.https.get(`${this.paymentLibService.BULKSCAN_API_ROOT}/report/data?date_from=${startDate}&date_to=${endDate}&report_type=${reportName}`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    static ɵfac = function BulkScaningPaymentService_Factory(t) { return new (t || BulkScaningPaymentService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.WebComponentHttpClient), i0.ɵɵinject(i3.ErrorHandlerService), i0.ɵɵinject(i4.PaymentLibService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: BulkScaningPaymentService, factory: BulkScaningPaymentService.ɵfac, providedIn: 'root' });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BulkScaningPaymentService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.WebComponentHttpClient }, { type: i3.ErrorHandlerService }, { type: i4.PaymentLibService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVsay1zY2FuaW5nLXBheW1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvc2VydmljZXMvYnVsay1zY2FuaW5nLXBheW1lbnQvYnVsay1zY2FuaW5nLXBheW1lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN2RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQVM1QyxNQUFNLE9BQU8seUJBQXlCO0lBRWhCO0lBQ1Y7SUFDQTtJQUNBO0lBSFYsWUFBb0IsSUFBZ0IsRUFDMUIsS0FBNkIsRUFDN0IsbUJBQXdDLEVBQ3hDLGlCQUFvQztRQUgxQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQzFCLFVBQUssR0FBTCxLQUFLLENBQXdCO1FBQzdCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUMxQyxDQUFDO0lBRUwsa0JBQWtCLENBQUMsYUFBcUI7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsVUFBVSxhQUFhLEVBQUUsRUFBRTtZQUN0RyxlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFDO2FBQ0MsSUFBSSxDQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQW1C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QUFDO0lBQ3ZELENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxLQUFhLEVBQUUsV0FBbUI7UUFDckQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELHNCQUFzQixDQUFDLFVBQWtCLEVBQUUsU0FBaUIsRUFBRSxPQUFlO1FBQzNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLDBCQUEwQixTQUFTLFlBQVksT0FBTyxnQkFBZ0IsVUFBVSxFQUFFLEVBQUU7WUFDbkosZUFBZSxFQUFFLElBQUk7U0FDdEIsQ0FBQzthQUNDLElBQUksQ0FDSCxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUNqRCxDQUFDO0lBQ04sQ0FBQzttRkFuRlUseUJBQXlCO2dFQUF6Qix5QkFBeUIsV0FBekIseUJBQXlCLG1CQUZ4QixNQUFNOzt1RkFFUCx5QkFBeUI7Y0FIckMsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEVycm9ySGFuZGxlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvZXJyb3ItaGFuZGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYkNvbXBvbmVudEh0dHBDbGllbnQgfSBmcm9tICcuLi9zaGFyZWQvaHR0cGNsaWVudC93ZWJjb21wb25lbnQuaHR0cC5jbGllbnQnO1xuaW1wb3J0IHsgUGF5bWVudExpYlNlcnZpY2UgfSBmcm9tICcuLi8uLi9wYXltZW50LWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJQlNQYXltZW50cyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSUJTUGF5bWVudHMnO1xuaW1wb3J0IHsgQWxsb2NhdGVQYXltZW50UmVxdWVzdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvQWxsb2NhdGVQYXltZW50UmVxdWVzdCc7XG5pbXBvcnQgeyBJUGF5bWVudEdyb3VwIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUGF5bWVudEdyb3VwJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBCdWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBodHRwczogV2ViQ29tcG9uZW50SHR0cENsaWVudCxcbiAgICBwcml2YXRlIGVycm9ySGFuZGxlclNlcnZpY2U6IEVycm9ySGFuZGxlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYXltZW50TGliU2VydmljZTogUGF5bWVudExpYlNlcnZpY2VcbiAgKSB7IH1cblxuICBnZXRCU1BheW1lbnRzQnlDQ0QoY2NkQ2FzZU51bWJlcjogc3RyaW5nKTogT2JzZXJ2YWJsZTxJQlNQYXltZW50cz4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PElCU1BheW1lbnRzPihgJHt0aGlzLnBheW1lbnRMaWJTZXJ2aWNlLkJVTEtTQ0FOX0FQSV9ST09UfS9jYXNlcy8ke2NjZENhc2VOdW1iZXJ9YCwge1xuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gIH1cbiAgZ2V0QlNQYXltZW50c0J5RENOKGRjbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxJQlNQYXltZW50cz4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PElCU1BheW1lbnRzPihgJHt0aGlzLnBheW1lbnRMaWJTZXJ2aWNlLkJVTEtTQ0FOX0FQSV9ST09UfS9jYXNlcz9kb2N1bWVudF9jb250cm9sX251bWJlcj0ke2Rjbn1gLCB7XG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5lcnJvckhhbmRsZXJTZXJ2aWNlLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgfVxuICBwb3N0QlNBbGxvY2F0ZVBheW1lbnQoYm9keTogQWxsb2NhdGVQYXltZW50UmVxdWVzdCwgcGF5bWVudFJlZjogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwcy5wb3N0KGAke3RoaXMucGF5bWVudExpYlNlcnZpY2UuQVBJX1JPT1R9L3BheW1lbnQtZ3JvdXBzLyR7cGF5bWVudFJlZn0vYnVsay1zY2FuLXBheW1lbnRzYCwgYm9keSkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5lcnJvckhhbmRsZXJTZXJ2aWNlLmhhbmRsZUVycm9yKVxuICAgICk7XG4gIH1cbiAgcG9zdEJTUGF5bWVudFN0cmF0ZWdpYyhib2R5OiBBbGxvY2F0ZVBheW1lbnRSZXF1ZXN0LCBwYXltZW50R3JvdXBSZWY6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cHMucG9zdChgJHt0aGlzLnBheW1lbnRMaWJTZXJ2aWNlLkFQSV9ST09UfS9wYXltZW50LWdyb3Vwcy8ke3BheW1lbnRHcm91cFJlZn0vYnVsay1zY2FuLXBheW1lbnRzLXN0cmF0ZWdpY2AsIGJvZHkpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGVFcnJvcilcbiAgICApO1xuICB9XG4gIHBvc3RCU1dvUEdTdHJhdGVnaWMoYm9keTogQWxsb2NhdGVQYXltZW50UmVxdWVzdCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cHMucG9zdChgJHt0aGlzLnBheW1lbnRMaWJTZXJ2aWNlLkFQSV9ST09UfS9wYXltZW50LWdyb3Vwcy9idWxrLXNjYW4tcGF5bWVudHMtc3RyYXRlZ2ljYCwgYm9keSkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5lcnJvckhhbmRsZXJTZXJ2aWNlLmhhbmRsZUVycm9yKVxuICAgICk7XG4gIH1cbiAgcGF0Y2hCU0NoYW5nZVN0YXR1cyhkY25OdW1iZXI6IHN0cmluZywgc3RhdHVzOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBzLnBhdGNoKGAke3RoaXMucGF5bWVudExpYlNlcnZpY2UuQVBJX1JPT1R9L2J1bGstc2Nhbi1wYXltZW50cy8ke2Rjbk51bWJlcn0vc3RhdHVzLyR7c3RhdHVzfWAsIHN0YXR1cykucGlwZShcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5lcnJvckhhbmRsZXJTZXJ2aWNlLmhhbmRsZUVycm9yKVxuICAgICk7XG4gIH1cbiAgY2FsY3VsYXRlT3V0U3RhbmRpbmdBbW91bnQocGF5bWVudEdyb3VwOiBJUGF5bWVudEdyb3VwKTogbnVtYmVyIHtcbiAgICBsZXQgZmVlc1RvdGFsID0gMC4wMCxcbiAgICAgIHBheW1lbnRzVG90YWwgPSAwLjAwLFxuICAgICAgcmVtaXNzaW9uc1RvdGFsID0gMC4wMDtcblxuICAgIGlmIChwYXltZW50R3JvdXAuZmVlcykge1xuICAgICAgcGF5bWVudEdyb3VwLmZlZXMuZm9yRWFjaChmZWUgPT4ge1xuICAgICAgICBmZWVzVG90YWwgPSBmZWVzVG90YWwgKyBmZWUuY2FsY3VsYXRlZF9hbW91bnQ7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocGF5bWVudEdyb3VwLnBheW1lbnRzKSB7XG4gICAgICBwYXltZW50R3JvdXAucGF5bWVudHMuZm9yRWFjaChwYXltZW50ID0+IHtcbiAgICAgICAgaWYgKHBheW1lbnQuc3RhdHVzLnRvVXBwZXJDYXNlKCkgPT09ICdTVUNDRVNTJykge1xuICAgICAgICAgIHBheW1lbnRzVG90YWwgPSBwYXltZW50c1RvdGFsICsgcGF5bWVudC5hbW91bnQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChwYXltZW50R3JvdXAucmVtaXNzaW9ucykge1xuICAgICAgcGF5bWVudEdyb3VwLnJlbWlzc2lvbnMuZm9yRWFjaChyZW1pc3Npb24gPT4ge1xuICAgICAgICByZW1pc3Npb25zVG90YWwgPSByZW1pc3Npb25zVG90YWwgKyByZW1pc3Npb24uaHdmX2Ftb3VudDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gKGZlZXNUb3RhbCAtIHJlbWlzc2lvbnNUb3RhbCkgLSBwYXltZW50c1RvdGFsO1xuICB9XG5cbiAgcmVtb3ZlVW53YW50ZWRTdHJpbmcoaW5wdXQ6IHN0cmluZywgcmVwbGFjZVRleHQ6IHN0cmluZykge1xuICAgIGNvbnN0IHBhdHRlcm4gPSAvW1xcX10vZ2k7XG4gICAgcmV0dXJuIGlucHV0LnJlcGxhY2UocGF0dGVybiwgcmVwbGFjZVRleHQpO1xuICB9XG5cbiAgZG93bmxvYWRTZWxlY3RlZFJlcG9ydChyZXBvcnROYW1lOiBzdHJpbmcsIHN0YXJ0RGF0ZTogc3RyaW5nLCBlbmREYXRlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBzLmdldChgJHt0aGlzLnBheW1lbnRMaWJTZXJ2aWNlLkJVTEtTQ0FOX0FQSV9ST09UfS9yZXBvcnQvZGF0YT9kYXRlX2Zyb209JHtzdGFydERhdGV9JmRhdGVfdG89JHtlbmREYXRlfSZyZXBvcnRfdHlwZT0ke3JlcG9ydE5hbWV9YCwge1xuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==