import { IPayment } from './IPayment';
import { IRefundContactDetails } from './IRefundContactDetails';
export declare class NotificationPreviewRequest {
    notification_type?: string;
    payment_channel?: string;
    payment_method?: string;
    payment_reference?: string;
    personalisation?: {
        ccd_case_number?: string;
        refund_amount?: number;
        refund_reason?: string;
        refund_reference?: string;
    };
    recipient_email_address?: string;
    recipient_postal_address?: {
        address_line?: string;
        city?: string;
        county?: string;
        country?: string;
        postal_code?: string;
    };
    service_name?: string;
    constructor(payment: IPayment, contactDetails: IRefundContactDetails, refund_reason: string, refund_amount: number, refund_reference: string, payment_reference: string);
}
//# sourceMappingURL=NotificationPreviewRequest.d.ts.map