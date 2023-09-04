import { OnInit, EventEmitter } from '@angular/core';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { IPayment } from '../../interfaces/IPayment';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export declare class ProcessedPaymentsComponent implements OnInit {
    private router;
    private bulkScaningPaymentService;
    NONPAYMENTS: IPayment[];
    goToPaymentViewComponent: EventEmitter<any>;
    constructor(router: Router, bulkScaningPaymentService: BulkScaningPaymentService);
    ngOnInit(): void;
    trimUnderscore(method: string): string;
    redirectToPaymentViewPage(paymentGroupReference: string, paymentReference: string, paymentMethod: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProcessedPaymentsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProcessedPaymentsComponent, "ccpay-app-processed-payments", never, { "NONPAYMENTS": { "alias": "NONPAYMENTS"; "required": false; }; }, { "goToPaymentViewComponent": "goToPaymentViewComponent"; }, never, never, false, never>;
}
//# sourceMappingURL=processed-payments.component.d.ts.map