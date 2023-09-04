import { OnInit } from '@angular/core';
import { IStatusHistories } from '../../interfaces/IStatusHistories';
import { StatusHistoryService } from '../../services/status-history/status-history.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import * as i0 from "@angular/core";
export declare class StatusHistoryComponent implements OnInit {
    private statusHistoryService;
    private paymentLibComponent;
    isTakePayment: boolean;
    pageTitle: string;
    statuses: IStatusHistories;
    errorMessage: string;
    constructor(statusHistoryService: StatusHistoryService, paymentLibComponent: PaymentLibComponent);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StatusHistoryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StatusHistoryComponent, "ccpay-payment-statuses", never, { "isTakePayment": { "alias": "isTakePayment"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=status-history.component.d.ts.map