import { IBSPayments } from "./IBSPayments";
export declare class AllocatePaymentRequest {
    amount: Number;
    banked_date: String;
    ccd_case_number: String;
    exception_record: string;
    currency: String;
    document_control_number: String;
    external_provider: String;
    giro_slip_no: String;
    payer_name: String;
    payment_channel: Object;
    payment_status: Object;
    payment_method: String;
    case_type: String;
    payment_allocation_dto?: {
        allocation_reason: String;
        allocation_status: String;
        explanation: String;
        payment_allocation_status: Object;
        payment_group_reference: String;
        payment_reference: String;
        reason: String;
        receiving_office: String;
        unidentified_reason: String;
        user_id: String;
        user_name: String;
        case_type: String;
    };
    constructor(ccd_case_number: string, unAllocatedPayment: IBSPayments, caseType: string, exceptionRecord: string, allocatedRequest?: any);
}
//# sourceMappingURL=AllocatePaymentRequest.d.ts.map