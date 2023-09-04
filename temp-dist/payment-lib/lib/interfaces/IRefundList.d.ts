import { IRefundContactDetails } from './IRefundContactDetails';
export interface IRefundList {
    amount: number;
    ccd_case_number: string;
    date_created: string;
    date_updated: string;
    payment_reference: string;
    reason: string;
    reason_code: string;
    refund_reference: string;
    refund_status: {
        description: string;
        name: string;
    };
    contact_details: IRefundContactDetails;
    user_full_name: string;
    service_type: string;
    code: string;
}
//# sourceMappingURL=IRefundList.d.ts.map