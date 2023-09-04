import { OnInit } from '@angular/core';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import * as i0 from "@angular/core";
export declare class PbaPaymentComponent implements OnInit {
    private paymentLibComponent;
    private paymentViewService;
    pbaPayOrderRef: any;
    viewStatus: string;
    pbaAccountList: string[];
    isPBAAccountHold: boolean;
    errorMsg: any;
    isCardPaymentSuccess: boolean;
    isInSufficiantFund: boolean;
    isPBAAccountNotExist: boolean;
    isPBAServerError: boolean;
    isGetPBAAccountSucceed: boolean;
    selectedPbaAccount: string;
    pbaAccountRef: string;
    isPbaAccountSelected: boolean;
    isCardPaymentSelected: boolean;
    isPBADropdownSelected: boolean;
    isContinueButtondisabled: boolean;
    isPBAAccountPaymentSuccess: boolean;
    pbaAccountrPaymentResult: any;
    orgName: string;
    constructor(paymentLibComponent: PaymentLibComponent, paymentViewService: PaymentViewService);
    ngOnInit(): void;
    selectpbaaccount(args: any): void;
    saveAndContinue(): void;
    cardPayment(): void;
    selectPaymentMethod(type: string): void;
    gotoCasetransationPage(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PbaPaymentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PbaPaymentComponent, "ccpay-pba-payment", never, { "pbaPayOrderRef": { "alias": "pbaPayOrderRef"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=pba-payment.component.d.ts.map