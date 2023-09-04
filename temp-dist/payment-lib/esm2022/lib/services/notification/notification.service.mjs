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
export class NotificationService {
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
    getRefundNotification(reference) {
        return this.http.get(`${this.paymentLibService.NOTIFICATION_API_ROOT}/${reference}`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    getAddressByPostcode(postcode) {
        return this.http.get(`${this.paymentLibService.NOTIFICATION_API_ROOT}/postcode-lookup/${postcode}`, {
            withCredentials: true
        })
            .pipe(catchError(this.errorHandlerService.handleError));
    }
    getNotificationPreview(body) {
        return this.https.post(`${this.paymentLibService.NOTIFICATION_API_ROOT}/doc-preview`, body).pipe(catchError(this.errorHandlerService.handleError));
    }
    getNotificationInstructionType(paymentChannel, paymentMethod) {
        if (paymentChannel === 'bulk scan' && paymentMethod === 'postal order') {
            return 'RefundWhenContacted';
        }
        else if (paymentChannel === 'bulk scan' && paymentMethod === 'cash') {
            return 'RefundWhenContacted';
        }
        else if (paymentChannel === 'online' && paymentMethod === 'card') {
            return 'SendRefund';
        }
        else if (paymentChannel === 'telephony' && paymentMethod === 'card') {
            return 'SendRefund';
        }
        else if (paymentChannel === 'online' && paymentMethod === 'payment by account') {
            return 'SendRefund';
        }
        else if (paymentChannel === 'bulk scan' && paymentMethod === 'cheque') {
            return 'SendRefund';
        }
        else {
            return 'Template';
        }
    }
    static ɵfac = function NotificationService_Factory(t) { return new (t || NotificationService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.WebComponentHttpClient), i0.ɵɵinject(i3.ErrorHandlerService), i0.ɵɵinject(i4.PaymentLibService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NotificationService, factory: NotificationService.ɵfac, providedIn: 'root' });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.WebComponentHttpClient }, { type: i3.ErrorHandlerService }, { type: i4.PaymentLibService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wYXltZW50LWxpYi9zcmMvbGliL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN2RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQU81QyxNQUFNLE9BQU8sbUJBQW1CO0lBRVY7SUFDVjtJQUNBO0lBQ0E7SUFIVixZQUFvQixJQUFnQixFQUMxQixLQUE2QixFQUM3QixtQkFBd0MsRUFDeEMsaUJBQW9DO1FBSDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDMUIsVUFBSyxHQUFMLEtBQUssQ0FBd0I7UUFDN0Isd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQzFDLENBQUM7SUFFTCxxQkFBcUIsQ0FBQyxTQUFpQjtRQUNyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUF3QixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUMxRyxlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFDO2FBQ0MsSUFBSSxDQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQ2pELENBQUM7SUFDTixDQUFDO0lBRUQsb0JBQW9CLENBQUMsUUFBZ0I7UUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsb0JBQW9CLFFBQVEsRUFBRSxFQUFFO1lBQ3ZHLGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUM7YUFDQyxJQUFJLENBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FDakQsQ0FBQztJQUNOLENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxJQUFnQztRQUNyRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUM5RixVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELDhCQUE4QixDQUFDLGNBQXNCLEVBQUUsYUFBcUI7UUFDMUUsSUFBSSxjQUFjLEtBQUssV0FBVyxJQUFJLGFBQWEsS0FBSyxjQUFjLEVBQUU7WUFDdEUsT0FBTyxxQkFBcUIsQ0FBQztTQUM5QjthQUFNLElBQUksY0FBYyxLQUFLLFdBQVcsSUFBSSxhQUFhLEtBQUssTUFBTSxFQUFFO1lBQ3JFLE9BQU8scUJBQXFCLENBQUM7U0FDOUI7YUFBTSxJQUFJLGNBQWMsS0FBSyxRQUFRLElBQUksYUFBYSxLQUFLLE1BQU0sRUFBRTtZQUNsRSxPQUFPLFlBQVksQ0FBQztTQUNyQjthQUFNLElBQUksY0FBYyxLQUFLLFdBQVcsSUFBSSxhQUFhLEtBQUssTUFBTSxFQUFFO1lBQ3JFLE9BQU8sWUFBWSxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxjQUFjLEtBQUssUUFBUSxJQUFJLGFBQWEsS0FBSyxvQkFBb0IsRUFBRTtZQUNoRixPQUFPLFlBQVksQ0FBQztTQUNyQjthQUFNLElBQUksY0FBYyxLQUFLLFdBQVcsSUFBSSxhQUFhLEtBQUssUUFBUSxFQUFFO1lBQ3ZFLE9BQU8sWUFBWSxDQUFDO1NBQ3JCO2FBQU07WUFDTCxPQUFPLFVBQVUsQ0FBQTtTQUNsQjtJQUNILENBQUM7NkVBL0NVLG1CQUFtQjtnRUFBbkIsbUJBQW1CLFdBQW5CLG1CQUFtQixtQkFGbEIsTUFBTTs7dUZBRVAsbUJBQW1CO2NBSC9CLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBFcnJvckhhbmRsZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2Vycm9yLWhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBXZWJDb21wb25lbnRIdHRwQ2xpZW50IH0gZnJvbSAnLi4vc2hhcmVkL2h0dHBjbGllbnQvd2ViY29tcG9uZW50Lmh0dHAuY2xpZW50JztcbmltcG9ydCB7IFBheW1lbnRMaWJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcGF5bWVudC1saWIuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSVJlZnVuZHNOb3RpZmljYXRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUmVmdW5kc05vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uUHJldmlld1JlcXVlc3QgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL05vdGlmaWNhdGlvblByZXZpZXdSZXF1ZXN0JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgaHR0cHM6IFdlYkNvbXBvbmVudEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBlcnJvckhhbmRsZXJTZXJ2aWNlOiBFcnJvckhhbmRsZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGF5bWVudExpYlNlcnZpY2U6IFBheW1lbnRMaWJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgZ2V0UmVmdW5kTm90aWZpY2F0aW9uKHJlZmVyZW5jZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxJUmVmdW5kc05vdGlmaWNhdGlvbnM+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxJUmVmdW5kc05vdGlmaWNhdGlvbnM+KGAke3RoaXMucGF5bWVudExpYlNlcnZpY2UuTk9USUZJQ0FUSU9OX0FQSV9ST09UfS8ke3JlZmVyZW5jZX1gLCB7XG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5lcnJvckhhbmRsZXJTZXJ2aWNlLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgfVxuXG4gIGdldEFkZHJlc3NCeVBvc3Rjb2RlKHBvc3Rjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5wYXltZW50TGliU2VydmljZS5OT1RJRklDQVRJT05fQVBJX1JPT1R9L3Bvc3Rjb2RlLWxvb2t1cC8ke3Bvc3Rjb2RlfWAsIHtcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmVycm9ySGFuZGxlclNlcnZpY2UuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICB9XG5cbiAgZ2V0Tm90aWZpY2F0aW9uUHJldmlldyhib2R5OiBOb3RpZmljYXRpb25QcmV2aWV3UmVxdWVzdCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cHMucG9zdChgJHt0aGlzLnBheW1lbnRMaWJTZXJ2aWNlLk5PVElGSUNBVElPTl9BUElfUk9PVH0vZG9jLXByZXZpZXdgLCBib2R5KS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmVycm9ySGFuZGxlclNlcnZpY2UuaGFuZGxlRXJyb3IpKTtcbiAgfVxuXG4gIGdldE5vdGlmaWNhdGlvbkluc3RydWN0aW9uVHlwZShwYXltZW50Q2hhbm5lbDogc3RyaW5nLCBwYXltZW50TWV0aG9kOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChwYXltZW50Q2hhbm5lbCA9PT0gJ2J1bGsgc2NhbicgJiYgcGF5bWVudE1ldGhvZCA9PT0gJ3Bvc3RhbCBvcmRlcicpIHtcbiAgICAgIHJldHVybiAnUmVmdW5kV2hlbkNvbnRhY3RlZCc7XG4gICAgfSBlbHNlIGlmIChwYXltZW50Q2hhbm5lbCA9PT0gJ2J1bGsgc2NhbicgJiYgcGF5bWVudE1ldGhvZCA9PT0gJ2Nhc2gnKSB7XG4gICAgICByZXR1cm4gJ1JlZnVuZFdoZW5Db250YWN0ZWQnO1xuICAgIH0gZWxzZSBpZiAocGF5bWVudENoYW5uZWwgPT09ICdvbmxpbmUnICYmIHBheW1lbnRNZXRob2QgPT09ICdjYXJkJykge1xuICAgICAgcmV0dXJuICdTZW5kUmVmdW5kJztcbiAgICB9IGVsc2UgaWYgKHBheW1lbnRDaGFubmVsID09PSAndGVsZXBob255JyAmJiBwYXltZW50TWV0aG9kID09PSAnY2FyZCcpIHtcbiAgICAgIHJldHVybiAnU2VuZFJlZnVuZCc7XG4gICAgfSBlbHNlIGlmIChwYXltZW50Q2hhbm5lbCA9PT0gJ29ubGluZScgJiYgcGF5bWVudE1ldGhvZCA9PT0gJ3BheW1lbnQgYnkgYWNjb3VudCcpIHtcbiAgICAgIHJldHVybiAnU2VuZFJlZnVuZCc7XG4gICAgfSBlbHNlIGlmIChwYXltZW50Q2hhbm5lbCA9PT0gJ2J1bGsgc2NhbicgJiYgcGF5bWVudE1ldGhvZCA9PT0gJ2NoZXF1ZScpIHtcbiAgICAgIHJldHVybiAnU2VuZFJlZnVuZCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnVGVtcGxhdGUnXG4gICAgfVxuICB9XG5cbn1cbiJdfQ==