import { IFee } from "./IFee";
import { IRefundContactDetails } from "./IRefundContactDetails";
export declare class IResubmitRefundRequest {
    refund_reason: string;
    amount: number;
    contact_details: IRefundContactDetails;
    refund_fees: IFee[];
    constructor(refund_reason: string, amount: number, contact_details: any, refund_fees: any[]);
}
//# sourceMappingURL=IResubmitRefundRequest.d.ts.map