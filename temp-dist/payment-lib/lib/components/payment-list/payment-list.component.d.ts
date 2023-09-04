import { OnInit } from '@angular/core';
import { PaymentListService } from '../../services/payment-list/payment-list.service';
import { IPayments } from '../../interfaces/IPayments';
import { PaymentLibComponent } from '../../payment-lib.component';
import * as i0 from "@angular/core";
export declare class PaymentListComponent implements OnInit {
    private paymentListService;
    private paymentLibComponent;
    payments: IPayments;
    errorMessage: string;
    code: string;
    constructor(paymentListService: PaymentListService, paymentLibComponent: PaymentLibComponent);
    ngOnInit(): void;
    loadPaymentViewComponent(paymentGroupReference: string, paymentReference: string, paymentMethod: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaymentListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PaymentListComponent, "ccpay-payment-list", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=payment-list.component.d.ts.map