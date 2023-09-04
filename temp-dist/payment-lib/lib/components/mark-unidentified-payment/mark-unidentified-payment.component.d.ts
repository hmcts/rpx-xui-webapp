import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentLibComponent } from '../../payment-lib.component';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { IBSPayments } from '../../interfaces/IBSPayments';
import * as i0 from "@angular/core";
export declare class MarkUnidentifiedPaymentComponent implements OnInit {
    private formBuilder;
    private paymentViewService;
    private paymentLibComponent;
    private bulkScaningPaymentService;
    caseType: string;
    markPaymentUnidentifiedForm: FormGroup;
    viewStatus: string;
    ccdCaseNumber: string;
    bspaymentdcn: string;
    isInvesticationDetailEmpty: boolean;
    investicationDetailHasError: boolean;
    investicationDetailMinHasError: boolean;
    investicationDetailMaxHasError: boolean;
    errorMessage: {
        title: string;
        body: string;
        showError: any;
    };
    unassignedRecord: IBSPayments;
    siteID: string;
    investigationComment: string;
    isConfirmButtondisabled: Boolean;
    ccdReference: string;
    exceptionReference: string;
    isStrategicFixEnable: boolean;
    constructor(formBuilder: FormBuilder, paymentViewService: PaymentViewService, paymentLibComponent: PaymentLibComponent, bulkScaningPaymentService: BulkScaningPaymentService);
    ngOnInit(): void;
    getUnassignedPayment(): void;
    trimUnderscore(method: string): string;
    saveAndContinue(): void;
    resetForm(val: any): void;
    confirmPayments(): void;
    cancelMarkUnidentifiedPayments(type?: string): void;
    gotoCasetransationPage(): void;
    getErrorMessage(isErrorExist: any): {
        title: string;
        body: string;
        showError: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<MarkUnidentifiedPaymentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MarkUnidentifiedPaymentComponent, "app-mark-unidentified-payment", never, { "caseType": { "alias": "caseType"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=mark-unidentified-payment.component.d.ts.map