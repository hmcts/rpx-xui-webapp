import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { WebComponentHttpClient } from '../shared/httpclient/webcomponent.http.client';
import { PaymentLibService } from '../../payment-lib.service';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../shared/httpclient/webcomponent.http.client";
import * as i3 from "../shared/error-handler.service";
import * as i4 from "../../payment-lib.service";
import * as i5 from "@angular/platform-browser";
export class RefundsService {
    http;
    https;
    errorHandlerService;
    paymentLibService;
    meta;
    constructor(http, https, errorHandlerService, paymentLibService, meta) {
        this.http = http;
        this.https = https;
        this.errorHandlerService = errorHandlerService;
        this.paymentLibService = paymentLibService;
        this.meta = meta;
    }
    getRefundReasons() {
        return this.http.get(`${this.paymentLibService.REFUNDS_API_ROOT}/reasons`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    getRefundRejectReasons() {
        return this.http.get(`${this.paymentLibService.REFUNDS_API_ROOT}/rejection-reasons`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    getRefundActions(refundReference) {
        return this.http.get(`${this.paymentLibService.REFUNDS_API_ROOT}/${refundReference}/actions`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    patchRefundActions(body, refundReference, reviewerAction) {
        // const opts = this.addHeaders({});
        return this.https.patch(`${this.paymentLibService.REFUNDS_API_ROOT}/${refundReference}/action/${reviewerAction}`, body)
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    getRefundList(refundstatus, selfexclusive) {
        return this.http.get(`${this.paymentLibService.REFUNDS_API_ROOT}?status=${refundstatus}&excludeCurrentUser=${selfexclusive}`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    getRefundStatusHistory(reference) {
        return this.http.get(`${this.paymentLibService.REFUNDS_API_ROOT}/${reference}/status-history`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    getRefundStatusList(ccdCaseNumber) {
        return this.http.get(`${this.paymentLibService.REFUNDS_API_ROOT}?ccdCaseNumber=${ccdCaseNumber}`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    getUserDetails() {
        return this.http.get(`${this.paymentLibService.REFUNDS_API_ROOT}/get-user-details`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    postIssueRefund(body) {
        return this.https.post(`${this.paymentLibService.REFUNDS_API_ROOT}/refund`, body).pipe(catchError(this.errorHandlerService.handleError));
    }
    putResendOrEdit(body, refundRef, notificationType) {
        return this.https.put(`${this.paymentLibService.REFUNDS_API_ROOT}/resend/notification/${refundRef}?notificationType=${notificationType}`, body).pipe(catchError(this.errorHandlerService.handleError));
    }
    patchResubmitRefund(body, refund_reference) {
        // const opts = this.addHeaders({});
        return this.https.patch(`${this.paymentLibService.REFUNDS_API_ROOT}/resubmit/${refund_reference}`, body).pipe(catchError(this.errorHandlerService.handleError));
    }
    addHeaders(options) {
        const csrfToken = this.meta.getTag('name=csrf-token');
        const headers = {};
        if (options.headers) {
            options.headers.forEach(element => {
                headers[element] = options.headers.get(element);
            });
        }
        headers['X-Requested-With'] = 'XMLHttpRequest';
        if (csrfToken.content === null) {
            if (document.cookie.split(';').find(row => row.startsWith('XSRF-TOKEN')) !== undefined) {
                headers['CSRF-Token'] = document.cookie.split(';').find(row => row.startsWith('XSRF-TOKEN')).split('=')[1];
            }
            else {
                headers['CSRF-Token'] = document.cookie.split(';').find(row => row.startsWith(' XSRF-TOKEN')).split('=')[1];
            }
        }
        else {
            headers['CSRF-Token'] = csrfToken.content;
        }
        options.headers = new HttpHeaders(headers);
        options.responseType = 'text';
        return options;
    }
    static ɵfac = function RefundsService_Factory(t) { return new (t || RefundsService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.WebComponentHttpClient), i0.ɵɵinject(i3.ErrorHandlerService), i0.ɵɵinject(i4.PaymentLibService), i0.ɵɵinject(i5.Meta)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: RefundsService, factory: RefundsService.ɵfac, providedIn: 'root' });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RefundsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.WebComponentHttpClient }, { type: i3.ErrorHandlerService }, { type: i4.PaymentLibService }, { type: i5.Meta }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmdW5kcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9zZXJ2aWNlcy9yZWZ1bmRzL3JlZnVuZHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQVk1QyxNQUFNLE9BQU8sY0FBYztJQUVMO0lBQ1Y7SUFDQTtJQUNBO0lBQ0E7SUFKVixZQUFvQixJQUFnQixFQUMxQixLQUE2QixFQUM3QixtQkFBd0MsRUFDeEMsaUJBQW9DLEVBQ3BDLElBQVU7UUFKQSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQzFCLFVBQUssR0FBTCxLQUFLLENBQXdCO1FBQzdCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxTQUFJLEdBQUosSUFBSSxDQUFNO0lBQ2hCLENBQUM7SUFFTCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFtQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsVUFBVSxFQUFFO1lBQzNGLGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUM7YUFDQyxJQUFJ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J0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBNZXRhIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBFcnJvckhhbmRsZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2Vycm9yLWhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBXZWJDb21wb25lbnRIdHRwQ2xpZW50IH0gZnJvbSAnLi4vc2hhcmVkL2h0dHBjbGllbnQvd2ViY29tcG9uZW50Lmh0dHAuY2xpZW50JztcbmltcG9ydCB7IFBheW1lbnRMaWJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcGF5bWVudC1saWIuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSVJlZnVuZFJlYXNvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lSZWZ1bmRSZWFzb25zJztcbmltcG9ydCB7IElQYXRjaFJlZnVuZEFjdGlvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVBhdGNoUmVmdW5kQWN0aW9uJztcbmltcG9ydCB7IElSZWZ1bmRMaXN0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUmVmdW5kTGlzdCc7XG5pbXBvcnQgeyBJc3N1ZVJlZnVuZFJlcXVlc3QgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lzc3VlUmVmdW5kUmVxdWVzdCc7XG5pbXBvcnQgeyBJUmVzdWJtaXRSZWZ1bmRSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUmVzdWJtaXRSZWZ1bmRSZXF1ZXN0JztcbmltcG9ydCB7IElSZWZ1bmRTdGF0dXNIaXN0b3J5IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUmVmdW5kU3RhdHVzSGlzdG9yeSc7XG5pbXBvcnQgeyBJUHV0Tm90aWZpY2F0aW9uUmVxdWVzdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVB1dE5vdGlmaWNhdGlvblJlcXVlc3QnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZWZ1bmRzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgaHR0cHM6IFdlYkNvbXBvbmVudEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBlcnJvckhhbmRsZXJTZXJ2aWNlOiBFcnJvckhhbmRsZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGF5bWVudExpYlNlcnZpY2U6IFBheW1lbnRMaWJTZXJ2aWNlLFxuICAgIHByaXZhdGUgbWV0YTogTWV0YVxuICApIHsgfVxuXG4gIGdldFJlZnVuZFJlYXNvbnMoKTogT2JzZXJ2YWJsZTxJUmVmdW5kUmVhc29uc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8SVJlZnVuZFJlYXNvbnNbXT4oYCR7dGhpcy5wYXltZW50TGliU2VydmljZS5SRUZVTkRTX0FQSV9ST09UfS9yZWFzb25zYCwge1xuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gIH1cblxuICBnZXRSZWZ1bmRSZWplY3RSZWFzb25zKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLnBheW1lbnRMaWJTZXJ2aWNlLlJFRlVORFNfQVBJX1JPT1R9L3JlamVjdGlvbi1yZWFzb25zYCwge1xuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gIH1cblxuICBnZXRSZWZ1bmRBY3Rpb25zKHJlZnVuZFJlZmVyZW5jZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMucGF5bWVudExpYlNlcnZpY2UuUkVGVU5EU19BUElfUk9PVH0vJHtyZWZ1bmRSZWZlcmVuY2V9L2FjdGlvbnNgLCB7XG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5lcnJvckhhbmRsZXJTZXJ2aWNlLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgfVxuXG4gIHBhdGNoUmVmdW5kQWN0aW9ucyhib2R5OiBJUGF0Y2hSZWZ1bmRBY3Rpb24sIHJlZnVuZFJlZmVyZW5jZTogc3RyaW5nLCByZXZpZXdlckFjdGlvbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAvLyBjb25zdCBvcHRzID0gdGhpcy5hZGRIZWFkZXJzKHt9KTtcbiAgICByZXR1cm4gdGhpcy5odHRwcy5wYXRjaChgJHt0aGlzLnBheW1lbnRMaWJTZXJ2aWNlLlJFRlVORFNfQVBJX1JPT1R9LyR7cmVmdW5kUmVmZXJlbmNlfS9hY3Rpb24vJHtyZXZpZXdlckFjdGlvbn1gLCBib2R5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5lcnJvckhhbmRsZXJTZXJ2aWNlLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgfVxuXG4gIGdldFJlZnVuZExpc3QocmVmdW5kc3RhdHVzPzogc3RyaW5nLCBzZWxmZXhjbHVzaXZlPzogYm9vbGVhbik6IE9ic2VydmFibGU8SVJlZnVuZExpc3RbXT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PElSZWZ1bmRMaXN0W10+KGAke3RoaXMucGF5bWVudExpYlNlcnZpY2UuUkVGVU5EU19BUElfUk9PVH0/c3RhdHVzPSR7cmVmdW5kc3RhdHVzfSZleGNsdWRlQ3VycmVudFVzZXI9JHtzZWxmZXhjbHVzaXZlfWAsXG4gICAgICB7XG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gIH1cblxuICBnZXRSZWZ1bmRTdGF0dXNIaXN0b3J5KHJlZmVyZW5jZT86IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PElSZWZ1bmRTdGF0dXNIaXN0b3J5PihgJHt0aGlzLnBheW1lbnRMaWJTZXJ2aWNlLlJFRlVORFNfQVBJX1JPT1R9LyR7cmVmZXJlbmNlfS9zdGF0dXMtaGlzdG9yeWAsXG4gICAgICB7XG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gIH1cblxuICBnZXRSZWZ1bmRTdGF0dXNMaXN0KGNjZENhc2VOdW1iZXI6IHN0cmluZyk6IE9ic2VydmFibGU8SVJlZnVuZExpc3RbXT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PElSZWZ1bmRMaXN0W10+KGAke3RoaXMucGF5bWVudExpYlNlcnZpY2UuUkVGVU5EU19BUElfUk9PVH0/Y2NkQ2FzZU51bWJlcj0ke2NjZENhc2VOdW1iZXJ9YCwge1xuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gIH1cblxuICBnZXRVc2VyRGV0YWlscygpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5wYXltZW50TGliU2VydmljZS5SRUZVTkRTX0FQSV9ST09UfS9nZXQtdXNlci1kZXRhaWxzYCwge1xuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gIH1cblxuICBwb3N0SXNzdWVSZWZ1bmQoYm9keTogSXNzdWVSZWZ1bmRSZXF1ZXN0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwcy5wb3N0KGAke3RoaXMucGF5bWVudExpYlNlcnZpY2UuUkVGVU5EU19BUElfUk9PVH0vcmVmdW5kYCwgYm9keSkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5lcnJvckhhbmRsZXJTZXJ2aWNlLmhhbmRsZUVycm9yKVxuICAgICk7XG4gIH1cblxuICBwdXRSZXNlbmRPckVkaXQoYm9keTogSVB1dE5vdGlmaWNhdGlvblJlcXVlc3QsIHJlZnVuZFJlZjogc3RyaW5nLCBub3RpZmljYXRpb25UeXBlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBzLnB1dChgJHt0aGlzLnBheW1lbnRMaWJTZXJ2aWNlLlJFRlVORFNfQVBJX1JPT1R9L3Jlc2VuZC9ub3RpZmljYXRpb24vJHtyZWZ1bmRSZWZ9P25vdGlmaWNhdGlvblR5cGU9JHtub3RpZmljYXRpb25UeXBlfWAsIGJvZHkpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGVFcnJvcilcbiAgICApO1xuICB9XG5cbiAgcGF0Y2hSZXN1Ym1pdFJlZnVuZChib2R5OiBJUmVzdWJtaXRSZWZ1bmRSZXF1ZXN0LCByZWZ1bmRfcmVmZXJlbmNlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIGNvbnN0IG9wdHMgPSB0aGlzLmFkZEhlYWRlcnMoe30pO1xuICAgIHJldHVybiB0aGlzLmh0dHBzLnBhdGNoKGAke3RoaXMucGF5bWVudExpYlNlcnZpY2UuUkVGVU5EU19BUElfUk9PVH0vcmVzdWJtaXQvJHtyZWZ1bmRfcmVmZXJlbmNlfWAsIGJvZHkpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGVFcnJvcilcbiAgICApO1xuICB9XG5cbiAgYWRkSGVhZGVycyhvcHRpb25zOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGNzcmZUb2tlbiA9IHRoaXMubWV0YS5nZXRUYWcoJ25hbWU9Y3NyZi10b2tlbicpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICBvcHRpb25zLmhlYWRlcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgaGVhZGVyc1tlbGVtZW50XSA9IG9wdGlvbnMuaGVhZGVycy5nZXQoZWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaGVhZGVyc1snWC1SZXF1ZXN0ZWQtV2l0aCddID0gJ1hNTEh0dHBSZXF1ZXN0JztcbiAgICBpZiAoY3NyZlRva2VuLmNvbnRlbnQgPT09IG51bGwpIHtcbiAgICAgIGlmIChkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKS5maW5kKHJvdyA9PiByb3cuc3RhcnRzV2l0aCgnWFNSRi1UT0tFTicpKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGhlYWRlcnNbJ0NTUkYtVG9rZW4nXSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpLmZpbmQocm93ID0+IHJvdy5zdGFydHNXaXRoKCdYU1JGLVRPS0VOJykpLnNwbGl0KCc9JylbMV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoZWFkZXJzWydDU1JGLVRva2VuJ10gPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKS5maW5kKHJvdyA9PiByb3cuc3RhcnRzV2l0aCgnIFhTUkYtVE9LRU4nKSkuc3BsaXQoJz0nKVsxXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyc1snQ1NSRi1Ub2tlbiddID0gY3NyZlRva2VuLmNvbnRlbnQ7XG4gICAgfVxuICAgIG9wdGlvbnMuaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyhoZWFkZXJzKTtcbiAgICBvcHRpb25zLnJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxufVxuIl19