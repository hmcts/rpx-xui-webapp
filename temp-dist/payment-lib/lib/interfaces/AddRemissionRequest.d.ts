import { IFee } from './IFee';
export declare class AddRemissionRequest {
    beneficiary_name: string;
    ccd_case_number: string;
    fee: IFee;
    hwf_amount: number;
    hwf_reference: string;
    payment_group_reference: string;
    case_type: string;
    constructor(ccd_case_number: string, fee: IFee, hwf_amount: number, hwf_reference: string, caseType: string);
}
//# sourceMappingURL=AddRemissionRequest.d.ts.map