import { OnInit } from '@angular/core';
import { IPayment } from '../../interfaces/IPayment';
import { INotificationPreview } from '../../interfaces/INotificationPreview';
import { IRefundContactDetails } from '../../interfaces/IRefundContactDetails';
import { NotificationPreviewRequest } from '../../interfaces/NotificationPreviewRequest';
import { NotificationService } from '../../services/notification/notification.service';
import { ErrorHandlerService } from '../../services/shared/error-handler.service';
import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NotificationPreviewComponent implements OnInit {
    private errorHandlerService;
    private notificationService;
    payment: IPayment;
    contactDetails: IRefundContactDetails;
    refundReason: string;
    refundAmount: number;
    paymentReference: string;
    refundReference: string;
    previewJourney: string;
    notificationSent: INotificationPreview;
    notificationPreviewEvent: EventEmitter<INotificationPreview>;
    notification: INotificationPreview;
    notificationPreviewRequest: NotificationPreviewRequest;
    today: number;
    errorMessage: any;
    constructor(errorHandlerService: ErrorHandlerService, notificationService: NotificationService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationPreviewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NotificationPreviewComponent, "app-notification-preview", never, { "payment": { "alias": "payment"; "required": false; }; "contactDetails": { "alias": "contactDetails"; "required": false; }; "refundReason": { "alias": "refundReason"; "required": false; }; "refundAmount": { "alias": "refundAmount"; "required": false; }; "paymentReference": { "alias": "paymentReference"; "required": false; }; "refundReference": { "alias": "refundReference"; "required": false; }; "previewJourney": { "alias": "previewJourney"; "required": false; }; "notificationSent": { "alias": "notificationSent"; "required": false; }; }, { "notificationPreviewEvent": "notificationPreviewEvent"; }, never, never, false, never>;
}
//# sourceMappingURL=notification-preview.component.d.ts.map