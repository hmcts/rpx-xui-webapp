import { IRefundContactDetails } from "./IRefundContactDetails";
export declare class PostRefundRetroRemission {
    ccd_case_number: string;
    payment_reference: string;
    refund_reason: string;
    total_refund_amount: any;
    fees: any[];
    is_over_payment: boolean;
    contact_details: IRefundContactDetails;
    constructor(contact_details: any, fees: any[], payment_reference: string, refund_reason: string, total_refund_amount: any, is_over_payment: string);
}
//# sourceMappingURL=PostRefundRetroRemission.d.ts.map