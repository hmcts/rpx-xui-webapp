import { IFee } from './IFee';
import { IPayment } from './IPayment';
import { IRemission } from './IRemission';
export interface IPaymentGroup {
    payment_group_reference: string;
    payments: IPayment[];
    remissions: IRemission[];
    fees: IFee[];
}
//# sourceMappingURL=IPaymentGroup.d.ts.map