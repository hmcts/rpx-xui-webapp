import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PaymentLibService } from './payment-lib.service';
import { OrderslistService } from './services/orderslist.service';
import * as i0 from "@angular/core";
import * as i1 from "./payment-lib.service";
import * as i2 from "./services/orderslist.service";
function PaymentLibComponent_ccpay_refund_list_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-refund-list", 11);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("USERID", ctx_r0.USERID)("LOGGEDINUSERROLES", ctx_r0.LOGGEDINUSERROLES)("LOGGEDINUSEREMAIL", ctx_r0.LOGGEDINUSEREMAIL);
} }
function PaymentLibComponent_ccpay_payment_list_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-payment-list");
} }
function PaymentLibComponent_ccpay_refund_status_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-refund-status", 12);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("LOGGEDINUSERROLES", ctx_r2.LOGGEDINUSERROLES)("API_ROOT", ctx_r2.API_ROOT);
} }
function PaymentLibComponent_ccpay_payment_view_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-payment-view", 13);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("LOGGEDINUSERROLES", ctx_r3.LOGGEDINUSERROLES)("isTurnOff", ctx_r3.ISTURNOFF)("isTakePayment", ctx_r3.TAKEPAYMENT)("caseType", ctx_r3.CASETYPE)("ISPAYMENTSTATUSENABLED", ctx_r3.ISPAYMENTSTATUSENABLED);
} }
function PaymentLibComponent_ccpay_process_refund_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-process-refund", 14);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("refundReference", ctx_r4.refundReference)("refundlistsource", ctx_r4.refundlistsource);
} }
function PaymentLibComponent_ccpay_pba_payment_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-pba-payment", 15);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("pbaPayOrderRef", ctx_r5.pbaPayOrderRef);
} }
function PaymentLibComponent_ccpay_case_transactions_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-case-transactions", 16);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵproperty("isTakePayment", ctx_r6.isTakePayment)("isFromServiceRequestPage", ctx_r6.isFromServiceRequestPage)("LOGGEDINUSERROLES", ctx_r6.LOGGEDINUSERROLES);
} }
function PaymentLibComponent_app_mark_unidentified_payment_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-mark-unidentified-payment", 17);
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseType", ctx_r7.CASETYPE);
} }
function PaymentLibComponent_app_mark_unsolicited_payment_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-mark-unsolicited-payment", 17);
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseType", ctx_r8.CASETYPE);
} }
function PaymentLibComponent_app_allocate_payments_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-allocate-payments", 18);
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵproperty("isTurnOff", ctx_r9.ISTURNOFF)("caseType", ctx_r9.CASETYPE);
} }
function PaymentLibComponent_ccpay_fee_summary_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-fee-summary", 19);
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ccdCaseNumber", ctx_r10.CCD_CASE_NUMBER)("paymentGroupRef", ctx_r10.paymentGroupReference)("isTurnOff", ctx_r10.ISTURNOFF)("caseType", ctx_r10.CASETYPE);
} }
function PaymentLibComponent_ccpay_reports_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-reports", 20);
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ISPAYMENTSTATUSENABLED", ctx_r11.ISPAYMENTSTATUSENABLED);
} }
export class PaymentLibComponent {
    paymentLibService;
    cd;
    OrderslistService;
    API_ROOT;
    BULKSCAN_API_ROOT;
    REFUNDS_API_ROOT;
    NOTIFICATION_API_ROOT;
    CARDPAYMENTRETURNURL;
    CCD_CASE_NUMBER;
    EXC_REFERENCE;
    PAYMENT_METHOD;
    VIEW;
    VIEWSERVICE;
    PAYMENT_GROUP_REF;
    TAKEPAYMENT;
    SERVICEREQUEST;
    DCN_NUMBER;
    SELECTED_OPTION;
    ISBSENABLE;
    ISSFENABLE;
    ISTURNOFF;
    CASETYPE;
    ISPAYMENTSTATUSENABLED;
    rootUrl;
    REFUNDLIST;
    USERID;
    LOGGEDINUSERROLES;
    LOGGEDINUSEREMAIL;
    isFromServiceRequestPage;
    paymentMethod;
    bspaymentdcn;
    unProcessedPaymentServiceId = null;
    paymentGroupReference;
    paymentReference;
    refundReference;
    isFromPayBubble = false;
    refundlistsource;
    viewName;
    isTurnOff;
    caseType;
    unProcessedPayment = null;
    isRefundStatusView;
    isRedirectFromCaseTransactionPage;
    isCallFromRefundList;
    isFromRefundStatusPage;
    iscancelClicked;
    isFromPaymentDetailPage;
    pbaPayOrderRef;
    isTakePayment;
    orderDetail;
    orderRef;
    orderStatus;
    orderParty;
    orderCreated;
    orderCCDEvent;
    serviceRequestValue;
    orderAddBtnEnable;
    orderFeesTotal = 0.00;
    orderRemissionTotal = 0.00;
    orderTotalPayments = 0.00;
    orderPendingPayments = 0.00;
    constructor(paymentLibService, cd, OrderslistService) {
        this.paymentLibService = paymentLibService;
        this.cd = cd;
        this.OrderslistService = OrderslistService;
    }
    ngAfterContentChecked() {
        this.cd.detectChanges();
    }
    ngOnInit() {
        this.paymentLibService.setApiRootUrl(this.API_ROOT);
        this.paymentLibService.setBulkScanApiRootUrl(this.BULKSCAN_API_ROOT);
        this.paymentLibService.setRefundndsApiRootUrl(this.REFUNDS_API_ROOT);
        this.paymentLibService.setNoticationApiRootUrl(this.NOTIFICATION_API_ROOT);
        this.paymentLibService.setCardPaymentReturnUrl(this.CARDPAYMENTRETURNURL);
        if (this.LOGGEDINUSERROLES.length > 0) {
            this.OrderslistService.setUserRolesList(this.LOGGEDINUSERROLES);
        }
        if (this.PAYMENT_GROUP_REF) {
            this.paymentGroupReference = this.PAYMENT_GROUP_REF;
        }
        if (this.DCN_NUMBER) {
            this.bspaymentdcn = this.DCN_NUMBER;
        }
        if (this.REFUNDLIST === "true") {
            this.VIEW = 'refund-list';
            this.viewName = this.VIEW;
        }
        if (this.VIEW === 'fee-summary') {
            this.viewName = 'fee-summary';
        }
        else if (this.VIEW !== 'reports' && this.VIEW !== 'refund-list') {
            this.viewName = 'case-transactions';
        }
        else {
            this.viewName = this.VIEW;
        }
        if (this.isTakePayment) {
            this.TAKEPAYMENT = true;
        }
        if (this.API_ROOT == 'api/payment-history') {
            this.isFromPayBubble = true;
        }
    }
    static ɵfac = function PaymentLibComponent_Factory(t) { return new (t || PaymentLibComponent)(i0.ɵɵdirectiveInject(i1.PaymentLibService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.OrderslistService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PaymentLibComponent, selectors: [["ccpay-payment-lib"]], inputs: { API_ROOT: "API_ROOT", BULKSCAN_API_ROOT: "BULKSCAN_API_ROOT", REFUNDS_API_ROOT: "REFUNDS_API_ROOT", NOTIFICATION_API_ROOT: "NOTIFICATION_API_ROOT", CARDPAYMENTRETURNURL: "CARDPAYMENTRETURNURL", CCD_CASE_NUMBER: "CCD_CASE_NUMBER", EXC_REFERENCE: "EXC_REFERENCE", PAYMENT_METHOD: "PAYMENT_METHOD", VIEW: "VIEW", VIEWSERVICE: "VIEWSERVICE", PAYMENT_GROUP_REF: "PAYMENT_GROUP_REF", TAKEPAYMENT: "TAKEPAYMENT", SERVICEREQUEST: "SERVICEREQUEST", DCN_NUMBER: "DCN_NUMBER", SELECTED_OPTION: "SELECTED_OPTION", ISBSENABLE: "ISBSENABLE", ISSFENABLE: "ISSFENABLE", ISTURNOFF: "ISTURNOFF", CASETYPE: "CASETYPE", ISPAYMENTSTATUSENABLED: "ISPAYMENTSTATUSENABLED", rootUrl: "rootUrl", REFUNDLIST: "REFUNDLIST", USERID: "USERID", LOGGEDINUSERROLES: "LOGGEDINUSERROLES", LOGGEDINUSEREMAIL: "LOGGEDINUSEREMAIL", isFromServiceRequestPage: "isFromServiceRequestPage" }, decls: 12, vars: 12, consts: [[3, "USERID", "LOGGEDINUSERROLES", "LOGGEDINUSEREMAIL", 4, "ngIf"], [4, "ngIf"], [3, "LOGGEDINUSERROLES", "API_ROOT", 4, "ngIf"], [3, "LOGGEDINUSERROLES", "isTurnOff", "isTakePayment", "caseType", "ISPAYMENTSTATUSENABLED", 4, "ngIf"], [3, "refundReference", "refundlistsource", 4, "ngIf"], [3, "pbaPayOrderRef", 4, "ngIf"], [3, "isTakePayment", "isFromServiceRequestPage", "LOGGEDINUSERROLES", 4, "ngIf"], [3, "caseType", 4, "ngIf"], [3, "isTurnOff", "caseType", 4, "ngIf"], [3, "ccdCaseNumber", "paymentGroupRef", "isTurnOff", "caseType", 4, "ngIf"], [3, "ISPAYMENTSTATUSENABLED", 4, "ngIf"], [3, "USERID", "LOGGEDINUSERROLES", "LOGGEDINUSEREMAIL"], [3, "LOGGEDINUSERROLES", "API_ROOT"], [3, "LOGGEDINUSERROLES", "isTurnOff", "isTakePayment", "caseType", "ISPAYMENTSTATUSENABLED"], [3, "refundReference", "refundlistsource"], [3, "pbaPayOrderRef"], [3, "isTakePayment", "isFromServiceRequestPage", "LOGGEDINUSERROLES"], [3, "caseType"], [3, "isTurnOff", "caseType"], [3, "ccdCaseNumber", "paymentGroupRef", "isTurnOff", "caseType"], [3, "ISPAYMENTSTATUSENABLED"]], template: function PaymentLibComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, PaymentLibComponent_ccpay_refund_list_0_Template, 1, 3, "ccpay-refund-list", 0);
            i0.ɵɵtemplate(1, PaymentLibComponent_ccpay_payment_list_1_Template, 1, 0, "ccpay-payment-list", 1);
            i0.ɵɵtemplate(2, PaymentLibComponent_ccpay_refund_status_2_Template, 1, 2, "ccpay-refund-status", 2);
            i0.ɵɵtemplate(3, PaymentLibComponent_ccpay_payment_view_3_Template, 1, 5, "ccpay-payment-view", 3);
            i0.ɵɵtemplate(4, PaymentLibComponent_ccpay_process_refund_4_Template, 1, 2, "ccpay-process-refund", 4);
            i0.ɵɵtemplate(5, PaymentLibComponent_ccpay_pba_payment_5_Template, 1, 1, "ccpay-pba-payment", 5);
            i0.ɵɵtemplate(6, PaymentLibComponent_ccpay_case_transactions_6_Template, 1, 3, "ccpay-case-transactions", 6);
            i0.ɵɵtemplate(7, PaymentLibComponent_app_mark_unidentified_payment_7_Template, 1, 1, "app-mark-unidentified-payment", 7);
            i0.ɵɵtemplate(8, PaymentLibComponent_app_mark_unsolicited_payment_8_Template, 1, 1, "app-mark-unsolicited-payment", 7);
            i0.ɵɵtemplate(9, PaymentLibComponent_app_allocate_payments_9_Template, 1, 2, "app-allocate-payments", 8);
            i0.ɵɵtemplate(10, PaymentLibComponent_ccpay_fee_summary_10_Template, 1, 4, "ccpay-fee-summary", 9);
            i0.ɵɵtemplate(11, PaymentLibComponent_ccpay_reports_11_Template, 1, 1, "ccpay-reports", 10);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.viewName === "refund-list");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "payment-list");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "refundstatuslist");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "payment-view");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "process-refund");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "pba-payment");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "case-transactions");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "unidentifiedPage");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "unsolicitedPage");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "allocate-payments");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "fee-summary");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "reports");
        } }, encapsulation: 2 });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaymentLibComponent, [{
        type: Component,
        args: [{
                selector: 'ccpay-payment-lib',
                template: `
  <ccpay-refund-list [USERID]="USERID" [LOGGEDINUSERROLES]="LOGGEDINUSERROLES" [LOGGEDINUSEREMAIL]="LOGGEDINUSEREMAIL" *ngIf="viewName === 'refund-list'"></ccpay-refund-list>
    <ccpay-payment-list *ngIf="viewName === 'payment-list'"></ccpay-payment-list>
    <ccpay-refund-status
    [LOGGEDINUSERROLES]="LOGGEDINUSERROLES"
    [API_ROOT]="API_ROOT"
    *ngIf="viewName === 'refundstatuslist'"> </ccpay-refund-status >
    <ccpay-payment-view [LOGGEDINUSERROLES]="LOGGEDINUSERROLES" *ngIf="viewName === 'payment-view'"
    [isTurnOff]="ISTURNOFF" [isTakePayment]="TAKEPAYMENT"  [caseType]="CASETYPE"
    [ISPAYMENTSTATUSENABLED] = "ISPAYMENTSTATUSENABLED"
    ></ccpay-payment-view>

    <ccpay-process-refund *ngIf="viewName === 'process-refund'"
    [refundReference]="refundReference"
    [refundlistsource]="refundlistsource"
    ></ccpay-process-refund>
    <ccpay-pba-payment *ngIf="viewName === 'pba-payment'"
    [pbaPayOrderRef]="pbaPayOrderRef"
    ></ccpay-pba-payment>
    <ccpay-case-transactions [isTakePayment]="isTakePayment" [isFromServiceRequestPage]="isFromServiceRequestPage" [LOGGEDINUSERROLES]="LOGGEDINUSERROLES" *ngIf="viewName === 'case-transactions'"></ccpay-case-transactions>
    <app-mark-unidentified-payment *ngIf="viewName === 'unidentifiedPage'"
    [caseType]="CASETYPE"></app-mark-unidentified-payment>
    <app-mark-unsolicited-payment *ngIf="viewName === 'unsolicitedPage'"
    [caseType]="CASETYPE"></app-mark-unsolicited-payment>
    <app-allocate-payments *ngIf="viewName === 'allocate-payments'"
    [isTurnOff]="ISTURNOFF"
    [caseType]="CASETYPE"
    ></app-allocate-payments>
    <ccpay-fee-summary *ngIf="viewName === 'fee-summary'"
      [ccdCaseNumber]="CCD_CASE_NUMBER"
      [paymentGroupRef]="paymentGroupReference"
      [isTurnOff]="ISTURNOFF"
      [caseType]="CASETYPE"
      ></ccpay-fee-summary>
    <ccpay-reports *ngIf="viewName === 'reports'"
    [ISPAYMENTSTATUSENABLED] = "ISPAYMENTSTATUSENABLED"
    ></ccpay-reports>
    `
            }]
    }], function () { return [{ type: i1.PaymentLibService }, { type: i0.ChangeDetectorRef }, { type: i2.OrderslistService }]; }, { API_ROOT: [{
            type: Input,
            args: ['API_ROOT']
        }], BULKSCAN_API_ROOT: [{
            type: Input,
            args: ['BULKSCAN_API_ROOT']
        }], REFUNDS_API_ROOT: [{
            type: Input,
            args: ['REFUNDS_API_ROOT']
        }], NOTIFICATION_API_ROOT: [{
            type: Input,
            args: ['NOTIFICATION_API_ROOT']
        }], CARDPAYMENTRETURNURL: [{
            type: Input,
            args: ['CARDPAYMENTRETURNURL']
        }], CCD_CASE_NUMBER: [{
            type: Input,
            args: ['CCD_CASE_NUMBER']
        }], EXC_REFERENCE: [{
            type: Input,
            args: ['EXC_REFERENCE']
        }], PAYMENT_METHOD: [{
            type: Input,
            args: ['PAYMENT_METHOD']
        }], VIEW: [{
            type: Input,
            args: ['VIEW']
        }], VIEWSERVICE: [{
            type: Input,
            args: ['VIEWSERVICE']
        }], PAYMENT_GROUP_REF: [{
            type: Input,
            args: ['PAYMENT_GROUP_REF']
        }], TAKEPAYMENT: [{
            type: Input,
            args: ['TAKEPAYMENT']
        }], SERVICEREQUEST: [{
            type: Input,
            args: ['SERVICEREQUEST']
        }], DCN_NUMBER: [{
            type: Input,
            args: ['DCN_NUMBER']
        }], SELECTED_OPTION: [{
            type: Input,
            args: ['SELECTED_OPTION']
        }], ISBSENABLE: [{
            type: Input,
            args: ['ISBSENABLE']
        }], ISSFENABLE: [{
            type: Input,
            args: ['ISSFENABLE']
        }], ISTURNOFF: [{
            type: Input,
            args: ['ISTURNOFF']
        }], CASETYPE: [{
            type: Input,
            args: ['CASETYPE']
        }], ISPAYMENTSTATUSENABLED: [{
            type: Input,
            args: ['ISPAYMENTSTATUSENABLED']
        }], rootUrl: [{
            type: Input,
            args: ['rootUrl']
        }], REFUNDLIST: [{
            type: Input,
            args: ['REFUNDLIST']
        }], USERID: [{
            type: Input,
            args: ['USERID']
        }], LOGGEDINUSERROLES: [{
            type: Input,
            args: ['LOGGEDINUSERROLES']
        }], LOGGEDINUSEREMAIL: [{
            type: Input,
            args: ['LOGGEDINUSEREMAIL']
        }], isFromServiceRequestPage: [{
            type: Input,
            args: ['isFromServiceRequestPage']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1saWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9wYXltZW50LWxpYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7O0lBTWhFLHdDQUE0Szs7O0lBQXpKLHNDQUFpQiwrQ0FBQSwrQ0FBQTs7O0lBQ2xDLHFDQUE2RTs7O0lBQzdFLDBDQUdnRTs7O0lBRmhFLDREQUF1Qyw2QkFBQTs7O0lBR3ZDLHlDQUdzQjs7O0lBSEYsNERBQXVDLCtCQUFBLHFDQUFBLDZCQUFBLHlEQUFBOzs7SUFLM0QsMkNBR3dCOzs7SUFGeEIsd0RBQW1DLDZDQUFBOzs7SUFHbkMsd0NBRXFCOzs7SUFEckIsc0RBQWlDOzs7SUFFakMsOENBQTBOOzs7SUFBak0sb0RBQStCLDZEQUFBLCtDQUFBOzs7SUFDeEQsb0RBQ3NEOzs7SUFBdEQsMENBQXFCOzs7SUFDckIsbURBQ3FEOzs7SUFBckQsMENBQXFCOzs7SUFDckIsNENBR3lCOzs7SUFGekIsNENBQXVCLDZCQUFBOzs7SUFHdkIsd0NBS3VCOzs7SUFKckIsdURBQWlDLGtEQUFBLGdDQUFBLDhCQUFBOzs7SUFLbkMsb0NBRWlCOzs7SUFEakIsdUVBQW1EOztBQUt2RCxNQUFNLE9BQU8sbUJBQW1CO0lBOERWO0lBQ1Y7SUFDQTtJQS9EUyxRQUFRLENBQVM7SUFDUixpQkFBaUIsQ0FBUztJQUMzQixnQkFBZ0IsQ0FBUztJQUNwQixxQkFBcUIsQ0FBUztJQUMvQixvQkFBb0IsQ0FBUztJQUNsQyxlQUFlLENBQVM7SUFDMUIsYUFB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QUMsd0JBQXdCO1lBQ2IsT0FBTztrQkFBeEIsS0FBSzttQkFBQyxTQUFTO1lBQ0ssVUFBVTtrQkFBOUIsS0FBSzttQkFBQyxZQUFZO1lBQ0YsTUFBTTtrQkFBdEIsS0FBSzttQkFBQyxRQUFRO1lBQ2EsaUJBQWlCO2tCQUE1QyxLQUFLO21CQUFDLG1CQUFtQjtZQUNFLGlCQUFpQjtrQkFBNUMsS0FBSzttQkFBQyxtQkFBbUI7WUFDUyx3QkFBd0I7a0JBQTFELEtBQUs7bUJBQUMsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGF5bWVudExpYlNlcnZpY2UgfSBmcm9tICcuL3BheW1lbnQtbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgSUJTUGF5bWVudHMgfSBmcm9tICcuL2ludGVyZmFjZXMvSUJTUGF5bWVudHMnO1xuaW1wb3J0IHsgT3JkZXJzbGlzdFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL29yZGVyc2xpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBJUGF5bWVudCB9IGZyb20gJy4vaW50ZXJmYWNlcy9JUGF5bWVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjcGF5LXBheW1lbnQtbGliJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGNjcGF5LXJlZnVuZC1saXN0IFtVU0VSSURdPVwiVVNFUklEXCIgW0xPR0dFRElOVVNFUlJPTEVTXT1cIkxPR0dFRElOVVNFUlJPTEVTXCIgW0xPR0dFRElOVVNFUkVNQUlMXT1cIkxPR0dFRElOVVNFUkVNQUlMXCIgKm5nSWY9XCJ2aWV3TmFtZSA9PT0gJ3JlZnVuZC1saXN0J1wiPjwvY2NwYXktcmVmdW5kLWxpc3Q+XG4gICAgPGNjcGF5LXBheW1lbnQtbGlzdCAqbmdJZj1cInZpZXdOYW1lID09PSAncGF5bWVudC1saXN0J1wiPjwvY2NwYXktcGF5bWVudC1saXN0PlxuICAgIDxjY3BheS1yZWZ1bmQtc3RhdHVzXG4gICAgW0xPR0dFRElOVVNFUlJPTEVTXT1cIkxPR0dFRElOVVNFUlJPTEVTXCJcbiAgICBbQVBJX1JPT1RdPVwiQVBJX1JPT1RcIlxuICAgICpuZ0lmPVwidmlld05hbWUgPT09ICdyZWZ1bmRzdGF0dXNsaXN0J1wiPiA8L2NjcGF5LXJlZnVuZC1zdGF0dXMgPlxuICAgIDxjY3BheS1wYXltZW50LXZpZXcgW0xPR0dFRElOVVNFUlJPTEVTXT1cIkxPR0dFRElOVVNFUlJPTEVTXCIgKm5nSWY9XCJ2aWV3TmFtZSA9PT0gJ3BheW1lbnQtdmlldydcIlxuICAgIFtpc1R1cm5PZmZdPVwiSVNUVVJOT0ZGXCIgW2lzVGFrZVBheW1lbnRdPVwiVEFLRVBBWU1FTlRcIiAgW2Nhc2VUeXBlXT1cIkNBU0VUWVBFXCJcbiAgICBbSVNQQVlNRU5UU1RBVFVTRU5BQkxFRF0gPSBcIklTUEFZTUVOVFNUQVRVU0VOQUJMRURcIlxuICAgID48L2NjcGF5LXBheW1lbnQtdmlldz5cblxuICAgIDxjY3BheS1wcm9jZXNzLXJlZnVuZCAqbmdJZj1cInZpZXdOYW1lID09PSAncHJvY2Vzcy1yZWZ1bmQnXCJcbiAgICBbcmVmdW5kUmVmZXJlbmNlXT1cInJlZnVuZFJlZmVyZW5jZVwiXG4gICAgW3JlZnVuZGxpc3Rzb3VyY2VdPVwicmVmdW5kbGlzdHNvdXJjZVwiXG4gICAgPjwvY2NwYXktcHJvY2Vzcy1yZWZ1bmQ+XG4gICAgPGNjcGF5LXBiYS1wYXltZW50ICpuZ0lmPVwidmlld05hbWUgPT09ICdwYmEtcGF5bWVudCdcIlxuICAgIFtwYmFQYXlPcmRlclJlZl09XCJwYmFQYXlPcmRlclJlZlwiXG4gICAgPjwvY2NwYXktcGJhLXBheW1lbnQ+XG4gICAgPGNjcGF5LWNhc2UtdHJhbnNhY3Rpb25zIFtpc1Rha2VQYXltZW50XT1cImlzVGFrZVBheW1lbnRcIiBbaXNGcm9tU2VydmljZVJlcXVlc3RQYWdlXT1cImlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZVwiIFtMT0dHRURJTlVTRVJST0xFU109XCJMT0dHRURJTlVTRVJST0xFU1wiICpuZ0lmPVwidmlld05hbWUgPT09ICdjYXNlLXRyYW5zYWN0aW9ucydcIj48L2NjcGF5LWNhc2UtdHJhbnNhY3Rpb25zPlxuICAgIDxhcHAtbWFyay11bmlkZW50aWZpZWQtcGF5bWVudCAqbmdJZj1cInZpZXdOYW1lID09PSAndW5pZGVudGlmaWVkUGFnZSdcIlxuICAgIFtjYXNlVHlwZV09XCJDQVNFVFlQRVwiPjwvYXBwLW1hcmstdW5pZGVudGlmaWVkLXBheW1lbnQ+XG4gICAgPGFwcC1tYXJrLXVuc29saWNpdGVkLXBheW1lbnQgKm5nSWY9XCJ2aWV3TmFtZSA9PT0gJ3Vuc29saWNpdGVkUGFnZSdcIlxuICAgIFtjYXNlVHlwZV09XCJDQVNFVFlQRVwiPjwvYXBwLW1hcmstdW5zb2xpY2l0ZWQtcGF5bWVudD5cbiAgICA8YXBwLWFsbG9jYXRlLXBheW1lbnRzICpuZ0lmPVwidmlld05hbWUgPT09ICdhbGxvY2F0ZS1wYXltZW50cydcIlxuICAgIFtpc1R1cm5PZmZdPVwiSVNUVVJOT0ZGXCJcbiAgICBbY2FzZVR5cGVdPVwiQ0FTRVRZUEVcIlxuICAgID48L2FwcC1hbGxvY2F0ZS1wYXltZW50cz5cbiAgICA8Y2NwYXktZmVlLXN1bW1hcnkgKm5nSWY9XCJ2aWV3TmFtZSA9PT0gJ2ZlZS1zdW1tYXJ5J1wiXG4gICAgICBbY2NkQ2FzZU51bWJlcl09XCJDQ0RfQ0FTRV9OVU1CRVJcIlxuICAgICAgW3BheW1lbnRHcm91cFJlZl09XCJwYXltZW50R3JvdXBSZWZlcmVuY2VcIlxuICAgICAgW2lzVHVybk9mZl09XCJJU1RVUk5PRkZcIlxuICAgICAgW2Nhc2VUeXBlXT1cIkNBU0VUWVBFXCJcbiAgICAgID48L2NjcGF5LWZlZS1zdW1tYXJ5PlxuICAgIDxjY3BheS1yZXBvcnRzICpuZ0lmPVwidmlld05hbWUgPT09ICdyZXBvcnRzJ1wiXG4gICAgW0lTUEFZTUVOVFNUQVRVU0VOQUJMRURdID0gXCJJU1BBWU1FTlRTVEFUVVNFTkFCTEVEXCJcbiAgICA+PC9jY3BheS1yZXBvcnRzPlxuICAgIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBQYXltZW50TGliQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCdBUElfUk9PVCcpIEFQSV9ST09UOiBzdHJpbmc7XG4gIEBJbnB1dCgnQlVMS1NDQU5fQVBJX1JPT1QnKSBCVUxLU0NBTl9BUElfUk9PVDogc3RyaW5nO1xuICBASW5wdXQoJ1JFRlVORFNfQVBJX1JPT1QnKSBSRUZVTkRTX0FQSV9ST09UOiBzdHJpbmc7XG4gIEBJbnB1dCgnTk9USUZJQ0FUSU9OX0FQSV9ST09UJykgTk9USUZJQ0FUSU9OX0FQSV9ST09UOiBzdHJpbmc7XG4gIEBJbnB1dCgnQ0FSRFBBWU1FTlRSRVRVUk5VUkwnKSBDQVJEUEFZTUVOVFJFVFVSTlVSTDogc3RyaW5nO1xuICBASW5wdXQoJ0NDRF9DQVNFX05VTUJFUicpIENDRF9DQVNFX05VTUJFUjogc3RyaW5nO1xuICBASW5wdXQoJ0VYQ19SRUZFUkVOQ0UnKSBFWENfUkVGRVJFTkNFOiBzdHJpbmc7XG4gIEBJbnB1dCgnUEFZTUVOVF9NRVRIT0QnKSBQQVlNRU5UX01FVEhPRDogc3RyaW5nO1xuICBASW5wdXQoJ1ZJRVcnKSBWSUVXOiBzdHJpbmc7XG4gIEBJbnB1dCgnVklFV1NFUlZJQ0UnKSBWSUVXU0VSVklDRTogc3RyaW5nO1xuICBASW5wdXQoJ1BBWU1FTlRfR1JPVVBfUkVGJykgUEFZTUVOVF9HUk9VUF9SRUY/OiBzdHJpbmc7XG4gIEBJbnB1dCgnVEFLRVBBWU1FTlQnKSBUQUtFUEFZTUVOVDogYm9vbGVhbjtcbiAgQElucHV0KCdTRVJWSUNFUkVRVUVTVCcpIFNFUlZJQ0VSRVFVRVNUOiBzdHJpbmc7XG4gIEBJbnB1dCgnRENOX05VTUJFUicpIERDTl9OVU1CRVI6IHN0cmluZztcbiAgQElucHV0KCdTRUxFQ1RFRF9PUFRJT04nKSBTRUxFQ1RFRF9PUFRJT046IHN0cmluZztcbiAgQElucHV0KCdJU0JTRU5BQkxFJykgSVNCU0VOQUJMRTogQm9vbGVhbjtcbiAgQElucHV0KCdJU1NGRU5BQkxFJykgSVNTRkVOQUJMRTogYm9vbGVhbjtcbiAgQElucHV0KCdJU1RVUk5PRkYnKSBJU1RVUk5PRkY6IGJvb2xlYW47XG4gIEBJbnB1dCgnQ0FTRVRZUEUnKSBDQVNFVFlQRTogc3RyaW5nO1xuICBASW5wdXQoJ0lTUEFZTUVOVFNUQVRVU0VOQUJMRUQnKSBJU1BBWU1FTlRTVEFUVVNFTkFCTEVEOiBib29sZWFuO1xuICBASW5wdXQoJ3Jvb3RVcmwnKSByb290VXJsOiBib29sZWFuO1xuICBASW5wdXQoJ1JFRlVORExJU1QnKSBSRUZVTkRMSVNUOiBzdHJpbmc7XG4gIEBJbnB1dCgnVVNFUklEJykgVVNFUklEOiBzdHJpbmc7XG4gIEBJbnB1dCgnTE9HR0VESU5VU0VSUk9MRVMnKSBMT0dHRURJTlVTRVJST0xFUzogYW55W107XG4gIEBJbnB1dCgnTE9HR0VESU5VU0VSRU1BSUwnKSBMT0dHRURJTlVTRVJFTUFJTDogc3RyaW5nO1xuICBASW5wdXQoJ2lzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZScpIGlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZTogYm9vbGVhbjtcblxuICBwYXltZW50TWV0aG9kOiBzdHJpbmc7XG4gIGJzcGF5bWVudGRjbjogc3RyaW5nO1xuICB1blByb2Nlc3NlZFBheW1lbnRTZXJ2aWNlSWQ6IHN0cmluZyA9IG51bGw7XG4gIHBheW1lbnRHcm91cFJlZmVyZW5jZTogc3RyaW5nO1xuICBwYXltZW50UmVmZXJlbmNlOiBzdHJpbmc7XG4gIHJlZnVuZFJlZmVyZW5jZTogc3RyaW5nO1xuICBpc0Zyb21QYXlCdWJibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVmdW5kbGlzdHNvdXJjZTogYW55O1xuICB2aWV3TmFtZTogc3RyaW5nO1xuICBpc1R1cm5PZmY6IGJvb2xlYW47XG4gIGNhc2VUeXBlOiBzdHJpbmc7XG4gIHVuUHJvY2Vzc2VkUGF5bWVudDogSUJTUGF5bWVudHMgPSBudWxsO1xuICBpc1JlZnVuZFN0YXR1c1ZpZXc6IGJvb2xlYW47XG4gIGlzUmVkaXJlY3RGcm9tQ2FzZVRyYW5zYWN0aW9uUGFnZTogc3RyaW5nO1xuICBpc0NhbGxGcm9tUmVmdW5kTGlzdDogYm9vbGVhbjtcbiAgaXNGcm9tUmVmdW5kU3RhdHVzUGFnZTogYm9vbGVhbjtcbiAgaXNjYW5jZWxDbGlja2VkIDogYm9vbGVhbjtcbiAgaXNGcm9tUGF5bWVudERldGFpbFBhZ2U6IGJvb2xlYW47XG4gIHBiYVBheU9yZGVyUmVmOiBJUGF5bWVudDtcbiAgaXNUYWtlUGF5bWVudDogYm9vbGVhbjtcblxuICBvcmRlckRldGFpbDogYW55W107XG4gIG9yZGVyUmVmOiBzdHJpbmc7XG4gIG9yZGVyU3RhdHVzOiBzdHJpbmc7XG4gIG9yZGVyUGFydHk6IHN0cmluZztcbiAgb3JkZXJDcmVhdGVkOiBEYXRlO1xuICBvcmRlckNDREV2ZW50OiBzdHJpbmc7XG4gIHNlcnZpY2VSZXF1ZXN0VmFsdWU6IHN0cmluZztcbiAgb3JkZXJBZGRCdG5FbmFibGU6IGJvb2xlYW47XG4gIG9yZGVyRmVlc1RvdGFsOiBudW1iZXIgPSAwLjAwO1xuICBvcmRlclJlbWlzc2lvblRvdGFsOiBudW1iZXIgPSAwLjAwO1xuICBvcmRlclRvdGFsUGF5bWVudHM6IG51bWJlciA9IDAuMDA7XG4gIG9yZGVyUGVuZGluZ1BheW1lbnRzOiBudW1iZXIgPSAwLjAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGF5bWVudExpYlNlcnZpY2U6IFBheW1lbnRMaWJTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgT3JkZXJzbGlzdFNlcnZpY2U6IE9yZGVyc2xpc3RTZXJ2aWNlKSB7IH1cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuIH1cblxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5wYXltZW50TGliU2VydmljZS5zZXRBcGlSb290VXJsKHRoaXMuQVBJX1JPT1QpO1xuICAgIHRoaXMucGF5bWVudExpYlNlcnZpY2Uuc2V0QnVsa1NjYW5BcGlSb290VXJsKHRoaXMuQlVMS1NDQU5fQVBJX1JPT1QpO1xuICAgIHRoaXMucGF5bWVudExpYlNlcnZpY2Uuc2V0UmVmdW5kbmRzQXBpUm9vdFVybCh0aGlzLlJFRlVORFNfQVBJX1JPT1QpO1xuICAgIHRoaXMucGF5bWVudExpYlNlcnZpY2Uuc2V0Tm90aWNhdGlvbkFwaVJvb3RVcmwodGhpcy5OT1RJRklDQVRJT05fQVBJX1JPT1QpO1xuICAgIHRoaXMucGF5bWVudExpYlNlcnZpY2Uuc2V0Q2FyZFBheW1lbnRSZXR1cm5VcmwodGhpcy5DQVJEUEFZTUVOVFJFVFVSTlVSTCk7XG5cbiAgICBpZih0aGlzLkxPR0dFRElOVVNFUlJPTEVTLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0VXNlclJvbGVzTGlzdCh0aGlzLkxPR0dFRElOVVNFUlJPTEVTKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuUEFZTUVOVF9HUk9VUF9SRUYpIHtcbiAgICAgIHRoaXMucGF5bWVudEdyb3VwUmVmZXJlbmNlID0gdGhpcy5QQVlNRU5UX0dST1VQX1JFRjtcbiAgICB9XG4gICAgaWYgKHRoaXMuRENOX05VTUJFUikge1xuICAgICAgdGhpcy5ic3BheW1lbnRkY24gPSB0aGlzLkRDTl9OVU1CRVI7XG4gICAgfVxuICAgIGlmICh0aGlzLlJFRlVORExJU1QgPT09IFwidHJ1ZVwiKSB7XG4gICAgICB0aGlzLlZJRVcgPSAncmVmdW5kLWxpc3QnO1xuICAgICAgdGhpcy52aWV3TmFtZSA9IHRoaXMuVklFVztcbiAgICB9XG4gICAgaWYgKHRoaXMuVklFVyA9PT0gJ2ZlZS1zdW1tYXJ5Jykge1xuICAgICAgdGhpcy52aWV3TmFtZSA9ICdmZWUtc3VtbWFyeSc7XG4gICAgfSBlbHNlIGlmICh0aGlzLlZJRVcgIT09ICdyZXBvcnRzJyAmJiB0aGlzLlZJRVcgIT09ICdyZWZ1bmQtbGlzdCcpIHtcbiAgICAgIHRoaXMudmlld05hbWUgPSAnY2FzZS10cmFuc2FjdGlvbnMnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdOYW1lID0gdGhpcy5WSUVXO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzVGFrZVBheW1lbnQpIHtcbiAgICAgIHRoaXMuVEFLRVBBWU1FTlQgPSB0cnVlO1xuICAgIH1cbiAgICBpZih0aGlzLkFQSV9ST09UID09ICdhcGkvcGF5bWVudC1oaXN0b3J5Jykge1xuICAgICAgdGhpcy5pc0Zyb21QYXlCdWJibGUgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19