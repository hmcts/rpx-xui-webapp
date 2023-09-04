import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { WebComponentHttpClient } from '../shared/httpclient/webcomponent.http.client';
import { PaymentLibService } from '../../payment-lib.service';
import { Observable } from 'rxjs';
import { IRefundsNotifications } from '../../interfaces/IRefundsNotifications';
import { NotificationPreviewRequest } from '../../interfaces/NotificationPreviewRequest';
import * as i0 from "@angular/core";
export declare class NotificationService {
    private http;
    private https;
    private errorHandlerService;
    private paymentLibService;
    constructor(http: HttpClient, https: WebComponentHttpClient, errorHandlerService: ErrorHandlerService, paymentLibService: PaymentLibService);
    getRefundNotification(reference: string): Observable<IRefundsNotifications>;
    getAddressByPostcode(postcode: string): Observable<any>;
    getNotificationPreview(body: NotificationPreviewRequest): Observable<any>;
    getNotificationInstructionType(paymentChannel: string, paymentMethod: string): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotificationService>;
}
//# sourceMappingURL=notification.service.d.ts.map