import { Component, Input } from '@angular/core';
import { PaymentLibComponent } from '../../payment-lib.component';
import { CaseTransactionsService } from '../../services/case-transactions/case-transactions.service';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { OrderslistService } from '../../services/orderslist.service';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../services/payment-view/payment-view.service";
import * as i3 from "../../services/bulk-scaning-payment/bulk-scaning-payment.service";
import * as i4 from "../../services/case-transactions/case-transactions.service";
import * as i5 from "../../payment-lib.component";
import * as i6 from "../../services/orderslist.service";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
import * as i9 from "../unprocessed-payments/unprocessed-payments.component";
import * as i10 from "../add-remission/add-remission.component";
import * as i11 from "../refund-status/refund-status.component";
import * as i12 from "../service-request/service-request.component";
import * as i13 from "../../pipes/ccd-hyphens.pipe";
function CaseTransactionsComponent_ng_container_2_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 10)(2, "h1", 11);
    i0.ɵɵtext(3, "Case transactions");
    i0.ɵɵelementEnd()()();
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "h3", 26);
    i0.ɵɵtext(2, "CCD reference:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "ccdHyphens");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 1, ctx_r16.ccdCaseNumber), "");
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_2_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "h3", 26);
    i0.ɵɵtext(2, "Exception reference:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "ccdHyphens");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 1, ctx_r17.ccdCaseNumber), "");
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_2_td_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 27);
    i0.ɵɵtext(1, "Unallocated payments");
    i0.ɵɵelementEnd();
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_2_td_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 28);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r19.unprocessedRecordCount);
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_2_div_27_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 10)(1, "button", 29);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_2_div_1_div_2_div_27_Template_button_click_1_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r21 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r21.redirectToFeeSearchPage($event)); });
    i0.ɵɵtext(2, " Take telephony payment ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", !ctx_r20.isAddFeeBtnEnabled)("ngClass", !ctx_r20.isAddFeeBtnEnabled ? "govuk-button govuk-button--secondary govuk-button--disabled govuk-!-margin-right-1" : "govuk-button govuk-button--secondary govuk-!-margin-right-1");
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_2_div_1_div_2_div_1_Template, 6, 3, "div", 12);
    i0.ɵɵtemplate(2, CaseTransactionsComponent_ng_container_2_div_1_div_2_div_2_Template, 6, 3, "div", 12);
    i0.ɵɵelementStart(3, "div", 13);
    i0.ɵɵelement(4, "hr", 14);
    i0.ɵɵelementStart(5, "table", 15)(6, "thead", 16)(7, "tr", 17)(8, "td", 18);
    i0.ɵɵtext(9, "Total payments");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 18);
    i0.ɵɵtext(11, "Total remissions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 18);
    i0.ɵɵtext(13, "Amount due");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, CaseTransactionsComponent_ng_container_2_div_1_div_2_td_14_Template, 2, 0, "td", 19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "tbody", 20)(16, "tr", 21)(17, "td", 22);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "td", 22);
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "td", 22);
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(26, CaseTransactionsComponent_ng_container_2_div_1_div_2_td_26_Template, 2, 1, "td", 23);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(27, CaseTransactionsComponent_ng_container_2_div_1_div_2_div_27_Template, 3, 2, "div", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r14.isExceptionRecord);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r14.isExceptionRecord);
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("ngIf", ctx_r14.isBulkScanEnable);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(19, 8, ctx_r14.totalPayments, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(22, 13, ctx_r14.totalRemissions, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(25, 18, ctx_r14.clAmountDue, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r14.isBulkScanEnable);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r14.takePayment);
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_tr_1_td_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 40);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "currency");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const paymentGroup_r27 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r31 = i0.ɵɵnextContext(4);
    i0.ɵɵattribute("rowspan", paymentGroup_r27.fees.length);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(2, 2, ctx_r31.getGroupOutstandingAmount(paymentGroup_r27), "GBP", "symbol-narrow", "1.2-2"), "* ");
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_tr_1_td_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 37);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "currency");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r29 = i0.ɵɵnextContext().$implicit;
    const ctx_r32 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(2, 1, ctx_r32.calculateAmountDue(fee_r29), "GBP", "symbol-narrow", "1.2-2"), " ");
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_tr_1_td_15_Template(rf, ctx) { if (rf & 1) {
    const _r39 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 37)(1, "a", 41);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_tr_1_td_15_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r39); const fee_r29 = i0.ɵɵnextContext().$implicit; const ctx_r37 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r37.confirmRemoveFee(fee_r29.id)); });
    i0.ɵɵtext(2, "Remove");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const fee_r29 = i0.ɵɵnextContext().$implicit;
    const ctx_r33 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", !ctx_r33.isCheckAmountdueExist(fee_r29.amount_due) || fee_r29.remissions ? "disable-link" : "");
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_tr_1_td_16_Template(rf, ctx) { if (rf & 1) {
    const _r43 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 37)(1, "a", 41);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_tr_1_td_16_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r43); const fee_r29 = i0.ɵɵnextContext().$implicit; const ctx_r41 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r41.confirmRemoveFee(fee_r29.id)); });
    i0.ɵɵtext(2, "Remove");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const paymentGroup_r27 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", (paymentGroup_r27.payments == null ? null : paymentGroup_r27.payments.length) > 0 || (paymentGroup_r27.remissions == null ? null : paymentGroup_r27.remissions.length) > 0 ? "disable-link" : "");
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 17)(1, "td", 37);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 37);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 37);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 37);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 37);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_tr_1_td_13_Template, 3, 7, "td", 38);
    i0.ɵɵtemplate(14, CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_tr_1_td_14_Template, 3, 6, "td", 39);
    i0.ɵɵtemplate(15, CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_tr_1_td_15_Template, 3, 1, "td", 39);
    i0.ɵɵtemplate(16, CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_tr_1_td_16_Template, 3, 1, "td", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r29 = ctx.$implicit;
    const i_r30 = ctx.index;
    const paymentGroup_r27 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\t", fee_r29.code, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(fee_r29.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(fee_r29.volume ? fee_r29.volume : "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(9, 9, fee_r29.net_amount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(12, 14, fee_r29.calculated_amount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", paymentGroup_r27.old && i_r30 == 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !paymentGroup_r27.old);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !paymentGroup_r27.old);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", paymentGroup_r27.old);
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20);
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_tr_1_Template, 17, 19, "tr", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const paymentGroup_r27 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", paymentGroup_r27.fees);
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20)(1, "tr", 17)(2, "td", 42);
    i0.ɵɵtext(3, "No fees recorded");
    i0.ɵɵelementEnd()()();
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_div_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 44);
    i0.ɵɵelement(2, "path", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "div", 46)(4, "span", 47);
    i0.ɵɵtext(5, "information");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6, " * These fees have already been processed offline. Check the notes in CCD for more information. ");
    i0.ɵɵelementEnd()();
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_tbody_20_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r53 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 17)(1, "td", 51)(2, "a", 52);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_tbody_20_tr_1_Template_a_click_2_listener() { const restoredCtx = i0.ɵɵrestoreView(_r53); const payment_r51 = restoredCtx.$implicit; const ctx_r52 = i0.ɵɵnextContext(6); return i0.ɵɵresetView(ctx_r52.goToPayementView(payment_r51.paymentGroupReference, payment_r51.reference, payment_r51.method)); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td", 51);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 53);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "lowercase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 54);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "lowercase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 51);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 51);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td", 51);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const payment_r51 = ctx.$implicit;
    const ctx_r50 = i0.ɵɵnextContext(6);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(payment_r51.reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 7, payment_r51.date_created, "dd MMM yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 10, payment_r51.channel));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 12, payment_r51.method));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(15, 14, payment_r51.amount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r50.getAllocationStatus(payment_r51), "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(payment_r51.status);
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_tbody_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20);
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_tbody_20_tr_1_Template, 20, 19, "tr", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r46 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r46.allPayments);
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_tbody_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20)(1, "td", 42);
    i0.ɵɵtext(2, "No payments recorded");
    i0.ɵɵelementEnd()();
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_tbody_37_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 17)(1, "td", 51);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 51);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 51);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 51);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 51);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const remission_r55 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(remission_r55.remission_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 5, remission_r55.date_created, "dd MMM yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(remission_r55.hwf_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(remission_r55.fee_code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(12, 8, remission_r55.hwf_amount, "GBP", "symbol-narrow", "1.2-2"));
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_tbody_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20);
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_tbody_37_tr_1_Template, 13, 13, "tr", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r48 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r48.remissions);
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_tbody_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20)(1, "td", 55);
    i0.ɵɵtext(2, "No remissions recorded");
    i0.ɵɵelementEnd()();
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48)(1, "h3", 26);
    i0.ɵɵtext(2, "Payments");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "table", 15)(4, "thead", 16)(5, "tr", 17)(6, "td", 49);
    i0.ɵɵtext(7, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 18);
    i0.ɵɵtext(9, "Date created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 18);
    i0.ɵɵtext(11, "Channel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 18);
    i0.ɵɵtext(13, "Method");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 50);
    i0.ɵɵtext(15, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 18);
    i0.ɵɵtext(17, "Allocation status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td", 18);
    i0.ɵɵtext(19, "Payment status");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(20, CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_tbody_20_Template, 2, 1, "tbody", 33);
    i0.ɵɵtemplate(21, CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_tbody_21_Template, 3, 0, "tbody", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "h3", 26);
    i0.ɵɵtext(23, "Remissions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "table", 15)(25, "thead", 16)(26, "tr", 17)(27, "td", 18);
    i0.ɵɵtext(28, "Remission reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "td", 18);
    i0.ɵɵtext(30, "Date created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "td", 18);
    i0.ɵɵtext(32, "Remission code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "td", 18);
    i0.ɵɵtext(34, "Fee code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "td", 18);
    i0.ɵɵtext(36, "Remission amount");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(37, CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_tbody_37_Template, 2, 1, "tbody", 33);
    i0.ɵɵtemplate(38, CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_tbody_38_Template, 3, 0, "tbody", 33);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r26 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("ngIf", (ctx_r26.allPayments == null ? null : ctx_r26.allPayments.length) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r26.allPayments == null ? null : ctx_r26.allPayments.length) === 0);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngIf", (ctx_r26.remissions == null ? null : ctx_r26.remissions.length) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r26.remissions == null ? null : ctx_r26.remissions.length) === 0);
} }
function CaseTransactionsComponent_ng_container_2_div_1_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30)(1, "div", 8)(2, "div", 31)(3, "h3", 26);
    i0.ɵɵtext(4, "Fees");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 31)(6, "table", 15)(7, "thead", 16)(8, "tr", 17)(9, "td", 18);
    i0.ɵɵtext(10, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 18);
    i0.ɵɵtext(12, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 18);
    i0.ɵɵtext(14, "Volume");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 18);
    i0.ɵɵtext(16, "Fee amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 18);
    i0.ɵɵtext(18, "Calculated amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 18);
    i0.ɵɵtext(20, "Amount due");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 18);
    i0.ɵɵtext(22, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(23, CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_23_Template, 2, 1, "tbody", 32);
    i0.ɵɵtemplate(24, CaseTransactionsComponent_ng_container_2_div_1_div_4_tbody_24_Template, 4, 0, "tbody", 33);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(25, CaseTransactionsComponent_ng_container_2_div_1_div_4_div_25_Template, 7, 0, "div", 34);
    i0.ɵɵtemplate(26, CaseTransactionsComponent_ng_container_2_div_1_div_4_div_26_Template, 39, 4, "div", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(23);
    i0.ɵɵproperty("ngForOf", ctx_r15.paymentGroups);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r15.paymentGroups == null ? null : ctx_r15.paymentGroups.length) === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.isHistoricGroupAvailable);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r15.allPayments == null ? null : ctx_r15.allPayments.length) > 0 || (ctx_r15.remissions == null ? null : ctx_r15.remissions.length) > 0);
} }
function CaseTransactionsComponent_ng_container_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_2_div_1_div_1_Template, 4, 0, "div", 7);
    i0.ɵɵtemplate(2, CaseTransactionsComponent_ng_container_2_div_1_div_2_Template, 28, 23, "div", 7);
    i0.ɵɵelement(3, "div", 8);
    i0.ɵɵtemplate(4, CaseTransactionsComponent_ng_container_2_div_1_div_4_Template, 27, 4, "div", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.takePayment);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.takePayment);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r9.takePayment);
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 8)(2, "div", 31)(3, "span", 61);
    i0.ɵɵtext(4, "Existing fees");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 31)(6, "table", 15)(7, "thead", 16)(8, "tr", 17)(9, "td", 18);
    i0.ɵɵtext(10, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 18);
    i0.ɵɵtext(12, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 18);
    i0.ɵɵtext(14, "Volume");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 18);
    i0.ɵɵtext(16, "Fee amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 18);
    i0.ɵɵtext(18, "Calculated amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 18);
    i0.ɵɵtext(20, "Group amount outstanding");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "tbody", 20)(22, "tr", 17)(23, "td", 62);
    i0.ɵɵtext(24, "No fees recorded");
    i0.ɵɵelementEnd()()()()()()();
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_38_tr_26_td_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 73);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "currency");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const paymentGroup_r60 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r66 = i0.ɵɵnextContext(3);
    i0.ɵɵattribute("rowspan", paymentGroup_r60.fees.length);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(2, 2, ctx_r66.getGroupOutstandingAmount(paymentGroup_r60), "GBP", "symbol-narrow", "1.2-2"), " ");
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_38_tr_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 17)(1, "td", 67);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 68);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 69);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 70);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 71);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, CaseTransactionsComponent_ng_container_2_div_2_div_38_tr_26_td_13_Template, 3, 7, "td", 72);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r64 = ctx.$implicit;
    const i_r65 = ctx.index;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(fee_r64.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", fee_r64.description, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", fee_r64.volume ? fee_r64.volume : "-", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(9, 6, fee_r64.net_amount, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(12, 11, fee_r64.calculated_amount, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", i_r65 == 0);
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_38_tbody_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20)(1, "td", 62);
    i0.ɵɵtext(2, "No payments recorded");
    i0.ɵɵelementEnd()();
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_tbody_25_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r77 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 17)(1, "td", 51)(2, "a", 52);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_tbody_25_tr_1_Template_a_click_2_listener() { const restoredCtx = i0.ɵɵrestoreView(_r77); const payment_r74 = restoredCtx.$implicit; const paymentGroup_r60 = i0.ɵɵnextContext(3).$implicit; const ctx_r75 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r75.goToPayementView(paymentGroup_r60.payment_group_reference, payment_r74.reference, payment_r74.method)); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td", 51);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 53);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "lowercase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 54);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "lowercase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 51);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 51);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 51);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const payment_r74 = ctx.$implicit;
    const ctx_r73 = i0.ɵɵnextContext(6);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(payment_r74.reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 7, payment_r74.date_created, "dd MMM yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 10, payment_r74.channel));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 12, payment_r74.method));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(payment_r74.amount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r73.getAllocationStatus(payment_r74), "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(payment_r74.status);
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_tbody_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20);
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_tbody_25_tr_1_Template, 19, 14, "tr", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const paymentGroup_r60 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", paymentGroup_r60.payments);
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_tbody_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20)(1, "td", 62);
    i0.ɵɵtext(2, "No payments recorded");
    i0.ɵɵelementEnd()();
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_tbody_42_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 17)(1, "td", 51);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 51);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 51);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 51);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 51);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const remission_r80 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(remission_r80.remission_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 5, remission_r80.date_created, "dd MMM"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(remission_r80.hwf_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(remission_r80.fee_code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(remission_r80.hwf_amount);
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_tbody_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20);
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_tbody_42_tr_1_Template, 12, 8, "tr", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const paymentGroup_r60 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", paymentGroup_r60.remissions);
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_tbody_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20)(1, "td", 55);
    i0.ɵɵtext(2, "No remissions recorded");
    i0.ɵɵelementEnd()();
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_div_44_Template(rf, ctx) { if (rf & 1) {
    const _r84 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "button", 29);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_div_44_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r84); const paymentGroup_r60 = i0.ɵɵnextContext(2).$implicit; const ctx_r82 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r82.loadFeeSummaryPage(paymentGroup_r60)); });
    i0.ɵɵtext(2, " Add telephone payment ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const paymentGroup_r60 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r72 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r72.getGroupOutstandingAmount(paymentGroup_r60) <= 0 || ctx_r72.isUnprocessedRecordSelected)("ngClass", ctx_r72.getGroupOutstandingAmount(paymentGroup_r60) <= 0 || ctx_r72.isUnprocessedRecordSelected ? "govuk-button govuk-button--secondary govuk-button--disabled govuk-!-margin-right-1" : "govuk-button govuk-button--secondary govuk-!-margin-right-1");
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74)(1, "details")(2, "summary", 75)(3, "span", 76);
    i0.ɵɵtext(4, "Allocated payments and remissions");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 77)(6, "span", 26);
    i0.ɵɵtext(7, "Payments");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "table", 15)(9, "thead", 16)(10, "tr", 17)(11, "td", 18);
    i0.ɵɵtext(12, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 18);
    i0.ɵɵtext(14, "Date created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 18);
    i0.ɵɵtext(16, "Channel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 18);
    i0.ɵɵtext(18, "Method");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 18);
    i0.ɵɵtext(20, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 18);
    i0.ɵɵtext(22, "Allocation status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "td", 18);
    i0.ɵɵtext(24, "Status");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(25, CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_tbody_25_Template, 2, 1, "tbody", 33);
    i0.ɵɵtemplate(26, CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_tbody_26_Template, 3, 0, "tbody", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span", 26);
    i0.ɵɵtext(28, "Remissions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "table", 15)(30, "thead", 16)(31, "tr", 17)(32, "td", 18);
    i0.ɵɵtext(33, "Remission reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "td", 18);
    i0.ɵɵtext(35, "Date created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "td", 18);
    i0.ɵɵtext(37, "Remission code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "td", 18);
    i0.ɵɵtext(39, "Fee applied against");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "td", 18);
    i0.ɵɵtext(41, "Remission amount");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(42, CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_tbody_42_Template, 2, 1, "tbody", 33);
    i0.ɵɵtemplate(43, CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_tbody_43_Template, 3, 0, "tbody", 33);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(44, CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_div_44_Template, 3, 2, "div", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const paymentGroup_r60 = i0.ɵɵnextContext().$implicit;
    const ctx_r63 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(25);
    i0.ɵɵproperty("ngIf", (paymentGroup_r60.payments == null ? null : paymentGroup_r60.payments.length) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (paymentGroup_r60.payments == null ? null : paymentGroup_r60.payments.length) === 0);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngIf", (paymentGroup_r60.remissions == null ? null : paymentGroup_r60.remissions.length) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (paymentGroup_r60.remissions == null ? null : paymentGroup_r60.remissions.length) === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r63.takePayment);
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 8)(2, "div", 63)(3, "span", 26);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(5, "div", 8)(6, "div", 31)(7, "span", 61);
    i0.ɵɵtext(8, "Exisiting fees");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 64)(10, "table", 15)(11, "thead", 16)(12, "tr", 17)(13, "td", 18);
    i0.ɵɵtext(14, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 18);
    i0.ɵɵtext(16, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 18);
    i0.ɵɵtext(18, "Volume");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 18);
    i0.ɵɵtext(20, "Fee amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 18);
    i0.ɵɵtext(22, "Calculated amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "td", 65);
    i0.ɵɵtext(24, "Group amount outstanding");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "tbody", 20);
    i0.ɵɵtemplate(26, CaseTransactionsComponent_ng_container_2_div_2_div_38_tr_26_Template, 14, 16, "tr", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(27, CaseTransactionsComponent_ng_container_2_div_2_div_38_tbody_27_Template, 3, 0, "tbody", 33);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(28, CaseTransactionsComponent_ng_container_2_div_2_div_38_div_28_Template, 45, 5, "div", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const paymentGroup_r60 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Group reference: ", paymentGroup_r60.payment_group_reference, "");
    i0.ɵɵadvance(22);
    i0.ɵɵproperty("ngForOf", paymentGroup_r60.fees);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", paymentGroup_r60.fees.length == 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", paymentGroup_r60.payments || paymentGroup_r60.remissions);
} }
function CaseTransactionsComponent_ng_container_2_div_2_ccpay_app_unprocessed_payments_39_Template(rf, ctx) { if (rf & 1) {
    const _r88 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccpay-app-unprocessed-payments", 78);
    i0.ɵɵlistener("getUnprocessedFeeCount", function CaseTransactionsComponent_ng_container_2_div_2_ccpay_app_unprocessed_payments_39_Template_ccpay_app_unprocessed_payments_getUnprocessedFeeCount_0_listener($event) { i0.ɵɵrestoreView(_r88); const ctx_r87 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r87.getUnprocessedFeeCount($event)); })("selectedUnprocessedFeeEvent", function CaseTransactionsComponent_ng_container_2_div_2_ccpay_app_unprocessed_payments_39_Template_ccpay_app_unprocessed_payments_selectedUnprocessedFeeEvent_0_listener($event) { i0.ɵɵrestoreView(_r88); const ctx_r89 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r89.selectedUnprocessedFeeEvent($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r58 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("IS_BUTTON_ENABLE", ctx_r58.takePayment)("LEVEL", 5)("PAYMENTSLENGTH", ctx_r58.allPayments == null ? null : ctx_r58.allPayments.length)("PAYMENTREF", ctx_r58.paymentRef)("ISTURNOFF", ctx_r58.isTurnOff)("ISSFENABLE", ctx_r58.isStrategicFixEnable)("FEE_RECORDS_EXISTS", ctx_r58.isFeeRecordsExist)("IS_OS_AMT_AVAILABLE", ctx_r58.isGrpOutstandingAmtPositive);
} }
function CaseTransactionsComponent_ng_container_2_div_2_div_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 79)(1, "div", 80)(2, "h3", 26);
    i0.ɵɵtext(3, "Surplus payments");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 31);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r59 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" Total surplus payments received: ", i0.ɵɵpipeBind4(6, 1, ctx_r59.totalRefundAmount, "GBP", "symbol", "1.2-2"), " ");
} }
const _c0 = function (a0) { return { "disable": a0 }; };
function CaseTransactionsComponent_ng_container_2_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r91 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "div", 8)(2, "div", 10)(3, "h1", 11);
    i0.ɵɵtext(4, "Case transactions");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 56)(6, "a", 57);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_2_div_2_Template_a_click_6_listener($event) { i0.ɵɵrestoreView(_r91); const ctx_r90 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r90.redirectToFeeSearchPage($event)); });
    i0.ɵɵtext(7, "Add a new fee");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "div", 8)(9, "div", 58)(10, "h3", 26);
    i0.ɵɵtext(11, "CCD reference:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "ccdHyphens");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 13);
    i0.ɵɵelement(16, "hr", 14);
    i0.ɵɵelementStart(17, "table", 15)(18, "thead", 16)(19, "tr", 17)(20, "td", 18);
    i0.ɵɵtext(21, "Total payments");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td", 18);
    i0.ɵɵtext(23, "Total remissions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "td", 18);
    i0.ɵɵtext(25, "Amount due");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(26, "tbody", 20)(27, "tr", 21)(28, "td", 37);
    i0.ɵɵtext(29);
    i0.ɵɵpipe(30, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "td", 37);
    i0.ɵɵtext(32);
    i0.ɵɵpipe(33, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "td", 37);
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "currency");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵtemplate(37, CaseTransactionsComponent_ng_container_2_div_2_div_37_Template, 25, 0, "div", 0);
    i0.ɵɵtemplate(38, CaseTransactionsComponent_ng_container_2_div_2_div_38_Template, 29, 4, "div", 59);
    i0.ɵɵtemplate(39, CaseTransactionsComponent_ng_container_2_div_2_ccpay_app_unprocessed_payments_39_Template, 1, 8, "ccpay-app-unprocessed-payments", 60);
    i0.ɵɵtemplate(40, CaseTransactionsComponent_ng_container_2_div_2_div_40_Template, 7, 6, "div", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(26, _c0, !ctx_r10.isAddFeeBtnEnabled));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(14, 9, ctx_r10.ccdCaseNumber), "");
    i0.ɵɵadvance(16);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(30, 11, ctx_r10.totalPayments, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(33, 16, ctx_r10.totalRemissions, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(36, 21, ctx_r10.totalFees - ctx_r10.totalRemissions - ctx_r10.totalPayments, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", (ctx_r10.paymentGroups == null ? null : ctx_r10.paymentGroups.length) === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r10.paymentGroups);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.isBulkScanEnable);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.totalRefundAmount > 0 && ctx_r10.takePayment);
} }
function CaseTransactionsComponent_ng_container_2_div_3_ccpay_app_unprocessed_payments_1_Template(rf, ctx) { if (rf & 1) {
    const _r94 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccpay-app-unprocessed-payments", 82);
    i0.ɵɵlistener("getUnprocessedFeeCount", function CaseTransactionsComponent_ng_container_2_div_3_ccpay_app_unprocessed_payments_1_Template_ccpay_app_unprocessed_payments_getUnprocessedFeeCount_0_listener($event) { i0.ɵɵrestoreView(_r94); const ctx_r93 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r93.getUnprocessedFeeCount($event)); })("selectedUnprocessedFeeEvent", function CaseTransactionsComponent_ng_container_2_div_3_ccpay_app_unprocessed_payments_1_Template_ccpay_app_unprocessed_payments_selectedUnprocessedFeeEvent_0_listener($event) { i0.ɵɵrestoreView(_r94); const ctx_r95 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r95.selectedUnprocessedFeeEvent($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r92 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("IS_BUTTON_ENABLE", ctx_r92.takePayment)("LEVEL", 1)("ISTURNOFF", ctx_r92.isTurnOff)("ISSFENABLE", ctx_r92.isStrategicFixEnable)("FEE_RECORDS_EXISTS", ctx_r92.isFeeRecordsExist)("IS_OS_AMT_AVAILABLE", ctx_r92.isGrpOutstandingAmtPositive)("PAYMENTSLENGTH", ctx_r92.allPayments == null ? null : ctx_r92.allPayments.length)("PAYMENTREF", ctx_r92.paymentRef);
} }
function CaseTransactionsComponent_ng_container_2_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_2_div_3_ccpay_app_unprocessed_payments_1_Template, 1, 8, "ccpay-app-unprocessed-payments", 81);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.isBulkScanEnable && !ctx_r11.takePayment);
} }
function CaseTransactionsComponent_ng_container_2_div_4_tbody_17_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r101 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 17)(1, "td", 89);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 90);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 91);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 92);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "td", 89);
    i0.ɵɵelementStart(12, "td", 51)(13, "a", 52);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_2_div_4_tbody_17_tr_1_Template_a_click_13_listener() { const restoredCtx = i0.ɵɵrestoreView(_r101); const payment_r99 = restoredCtx.$implicit; const ctx_r100 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r100.goToPayementView(payment_r99.paymentGroupReference, payment_r99.reference, payment_r99.method)); });
    i0.ɵɵtext(14, "Review");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const payment_r99 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(payment_r99.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(5, 4, payment_r99.amount, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 9, payment_r99.date_created, "dd MMM yyyy HH:mm:ss"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(payment_r99.paymentGroupReference);
} }
function CaseTransactionsComponent_ng_container_2_div_4_tbody_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20);
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_2_div_4_tbody_17_tr_1_Template, 15, 12, "tr", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r96 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r96.allPayments);
} }
function CaseTransactionsComponent_ng_container_2_div_4_ccpay_app_unprocessed_payments_18_Template(rf, ctx) { if (rf & 1) {
    const _r103 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccpay-app-unprocessed-payments", 93);
    i0.ɵɵlistener("getUnprocessedFeeCount", function CaseTransactionsComponent_ng_container_2_div_4_ccpay_app_unprocessed_payments_18_Template_ccpay_app_unprocessed_payments_getUnprocessedFeeCount_0_listener($event) { i0.ɵɵrestoreView(_r103); const ctx_r102 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r102.getUnprocessedFeeCount($event)); })("selectedUnprocessedFeeEvent", function CaseTransactionsComponent_ng_container_2_div_4_ccpay_app_unprocessed_payments_18_Template_ccpay_app_unprocessed_payments_selectedUnprocessedFeeEvent_0_listener($event) { i0.ɵɵrestoreView(_r103); const ctx_r104 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r104.selectedUnprocessedFeeEvent($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r97 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("IS_BUTTON_ENABLE", ctx_r97.takePayment)("LEVEL", 2)("ISTURNOFF", ctx_r97.isTurnOff)("ISSFENABLE", ctx_r97.isStrategicFixEnable)("FEE_RECORDS_EXISTS", ctx_r97.isFeeRecordsExist)("IS_OS_AMT_AVAILABLE", ctx_r97.isGrpOutstandingAmtPositive)("PAYMENTSLENGTH", ctx_r97.allPayments == null ? null : ctx_r97.allPayments.length)("PAYMENTREF", ctx_r97.paymentRef);
} }
function CaseTransactionsComponent_ng_container_2_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 79)(1, "div", 31)(2, "span", 26);
    i0.ɵɵtext(3, "Payments");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "table", 15)(5, "thead", 16)(6, "tr", 17)(7, "td", 83);
    i0.ɵɵtext(8, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 84);
    i0.ɵɵtext(10, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 85);
    i0.ɵɵtext(12, "Date allocated");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 86);
    i0.ɵɵtext(14, "Request reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "td", 87)(16, "td", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(17, CaseTransactionsComponent_ng_container_2_div_4_tbody_17_Template, 2, 1, "tbody", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, CaseTransactionsComponent_ng_container_2_div_4_ccpay_app_unprocessed_payments_18_Template, 1, 8, "ccpay-app-unprocessed-payments", 88);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("ngIf", (ctx_r12.allPayments == null ? null : ctx_r12.allPayments.length) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r12.isBulkScanEnable && !ctx_r12.takePayment);
} }
function CaseTransactionsComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_2_div_1_Template, 5, 3, "div", 0);
    i0.ɵɵtemplate(2, CaseTransactionsComponent_ng_container_2_div_2_Template, 41, 28, "div", 0);
    i0.ɵɵtemplate(3, CaseTransactionsComponent_ng_container_2_div_3_Template, 2, 1, "div", 0);
    i0.ɵɵtemplate(4, CaseTransactionsComponent_ng_container_2_div_4_Template, 19, 2, "div", 6);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.viewStatus === "main1" && !ctx_r0.isTurnOff && ctx_r0.takePayment);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.takePayment && ctx_r0.isTurnOff);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.takePayment);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.takePayment);
} }
function CaseTransactionsComponent_ng_container_3_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 107);
    i0.ɵɵelementStart(1, "b");
    i0.ɵɵtext(2, " Case reference: ");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "ccdHyphens");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r105 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(4, 1, ctx_r105.ccdCaseNumber), " ");
} }
function CaseTransactionsComponent_ng_container_3_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 108);
    i0.ɵɵelementStart(1, "b");
    i0.ɵɵtext(2, " Exception reference:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "ccdHyphens");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r106 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(4, 1, ctx_r106.ccdCaseNumber), " ");
} }
function CaseTransactionsComponent_ng_container_3_td_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 109);
    i0.ɵɵtext(1, "Unallocated payments");
    i0.ɵɵelementEnd();
} }
function CaseTransactionsComponent_ng_container_3_td_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 28);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r108 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r108.unprocessedRecordCount);
} }
function CaseTransactionsComponent_ng_container_3_tbody_54_tr_1_td_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 51);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r119 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r119.cpoDetails["responsibleParty"]);
} }
function CaseTransactionsComponent_ng_container_3_tbody_54_tr_1_td_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "td", 51);
} }
function CaseTransactionsComponent_ng_container_3_tbody_54_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r122 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td", 51);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 51);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CaseTransactionsComponent_ng_container_3_tbody_54_tr_1_td_6_Template, 2, 1, "td", 110);
    i0.ɵɵtemplate(7, CaseTransactionsComponent_ng_container_3_tbody_54_tr_1_td_7_Template, 1, 0, "td", 110);
    i0.ɵɵelementStart(8, "td", 51);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 37)(11, "a", 52);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_3_tbody_54_tr_1_Template_a_click_11_listener() { const restoredCtx = i0.ɵɵrestoreView(_r122); const orderRef_r117 = restoredCtx.$implicit; const ctx_r121 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r121.goToOrderViewDetailSection(orderRef_r117)); });
    i0.ɵɵtext(12, "Review");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "td", 111)(14, "button", 29);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_3_tbody_54_tr_1_Template_button_click_14_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r122); const orderRef_r117 = restoredCtx.$implicit; const ctx_r123 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r123.redirectToOrderFeeSearchPage($event, orderRef_r117)); });
    i0.ɵɵtext(15, " Take telephony payment ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const orderRef_r117 = ctx.$implicit;
    const ctx_r116 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(orderRef_r117.orderStatus);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(5, 7, orderRef_r117.orderTotalFees, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r116.cpoDetails !== null);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r116.cpoDetails === null);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(orderRef_r117.orderRefId);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", !orderRef_r117.orderAddBtnEnable)("ngClass", !orderRef_r117.orderAddBtnEnable ? "govuk-button govuk-button--secondary govuk-button--disabled govuk-!-margin-right-1" : "govuk-button govuk-button--secondary govuk-!-margin-right-1");
} }
function CaseTransactionsComponent_ng_container_3_tbody_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20);
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_3_tbody_54_tr_1_Template, 16, 12, "tr", 59);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r110 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r110.orderLevelFees);
} }
function CaseTransactionsComponent_ng_container_3_tbody_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 112)(1, "td", 113);
    i0.ɵɵtext(2, "No service requests on this case.");
    i0.ɵɵelementEnd()();
} }
function CaseTransactionsComponent_ng_container_3_ccpay_app_unprocessed_payments_65_Template(rf, ctx) { if (rf & 1) {
    const _r125 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccpay-app-unprocessed-payments", 114);
    i0.ɵɵlistener("getUnprocessedFeeCount", function CaseTransactionsComponent_ng_container_3_ccpay_app_unprocessed_payments_65_Template_ccpay_app_unprocessed_payments_getUnprocessedFeeCount_0_listener($event) { i0.ɵɵrestoreView(_r125); const ctx_r124 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r124.getUnprocessedFeeCount($event)); })("selectedUnprocessedFeeEvent", function CaseTransactionsComponent_ng_container_3_ccpay_app_unprocessed_payments_65_Template_ccpay_app_unprocessed_payments_selectedUnprocessedFeeEvent_0_listener($event) { i0.ɵɵrestoreView(_r125); const ctx_r126 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r126.selectedUnprocessedFeeEvent($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r112 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("IS_BUTTON_ENABLE", ctx_r112.takePayment)("LEVEL", 3)("PAYMENTSLENGTH", ctx_r112.allPayments == null ? null : ctx_r112.allPayments.length)("ISTURNOFF", ctx_r112.isTurnOff)("ISSFENABLE", ctx_r112.isStrategicFixEnable)("PAYMENTREF", ctx_r112.paymentRef)("FEE_RECORDS_EXISTS", ctx_r112.isFeeRecordsExist)("IS_OS_AMT_AVAILABLE", ctx_r112.isGrpOutstandingAmtPositive);
} }
function CaseTransactionsComponent_ng_container_3_tbody_69_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r130 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 17)(1, "td", 115);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 90);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 91);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 92);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "td", 89);
    i0.ɵɵelementStart(12, "td", 51)(13, "a", 52);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_3_tbody_69_tr_1_Template_a_click_13_listener() { const restoredCtx = i0.ɵɵrestoreView(_r130); const payment_r128 = restoredCtx.$implicit; const ctx_r129 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r129.goToPayementView(payment_r128.paymentGroupReference, payment_r128.reference, payment_r128.method)); });
    i0.ɵɵtext(14, "Review");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const payment_r128 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(payment_r128.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(5, 4, payment_r128.amount, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 9, payment_r128.date_created, "dd MMM yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(payment_r128.paymentGroupReference);
} }
function CaseTransactionsComponent_ng_container_3_tbody_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20);
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_3_tbody_69_tr_1_Template, 15, 12, "tr", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r113 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r113.allPayments);
} }
function CaseTransactionsComponent_ng_container_3_tbody_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20)(1, "td", 113);
    i0.ɵɵtext(2, "No payments recorded");
    i0.ɵɵelementEnd()();
} }
function CaseTransactionsComponent_ng_container_3_div_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "span", 26);
    i0.ɵɵelement(2, "br");
    i0.ɵɵtext(3, "Refunds");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "ccpay-refund-status", 116);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r115 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ccdCaseNumber", ctx_r115.ccdCaseNumber)("isTurnOff", ctx_r115.isTurnOff)("orderParty", ctx_r115.orderParty)("LOGGEDINUSERROLES", ctx_r115.LOGGEDINUSERROLES);
} }
function CaseTransactionsComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r132 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div")(2, "div")(3, "h1", 94);
    i0.ɵɵtext(4, "Case transactions");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, CaseTransactionsComponent_ng_container_3_ng_container_5_Template, 5, 3, "ng-container", 95);
    i0.ɵɵtemplate(6, CaseTransactionsComponent_ng_container_3_ng_container_6_Template, 5, 3, "ng-container", 96);
    i0.ɵɵelementStart(7, "div")(8, "table", 15)(9, "thead", 16)(10, "tr", 17)(11, "td", 97);
    i0.ɵɵtext(12, "Total payments");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, CaseTransactionsComponent_ng_container_3_td_13_Template, 2, 0, "td", 98);
    i0.ɵɵelementStart(14, "td", 97);
    i0.ɵɵtext(15, "Total remissions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 86);
    i0.ɵɵtext(17, "Amount due");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td", 86);
    i0.ɵɵtext(19, "Over payment");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "tbody", 20)(21, "tr", 21)(22, "td", 22);
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, CaseTransactionsComponent_ng_container_3_td_25_Template, 2, 1, "td", 23);
    i0.ɵɵelementStart(26, "td", 22);
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "td", 22);
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "td", 22);
    i0.ɵɵtext(33);
    i0.ɵɵpipe(34, "currency");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelement(35, "input", 99, 2);
    i0.ɵɵelementStart(37, "div", 100)(38, "span", 26);
    i0.ɵɵtext(39, "Service requests");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerStart(40);
    i0.ɵɵelementStart(41, "table", 15)(42, "thead", 16)(43, "tr", 17)(44, "td", 85);
    i0.ɵɵtext(45, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "td", 84);
    i0.ɵɵtext(47, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "td", 101);
    i0.ɵɵtext(49, "Party");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "td", 102);
    i0.ɵɵtext(51, "Request reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(52, "td", 87)(53, "td", 103);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(54, CaseTransactionsComponent_ng_container_3_tbody_54_Template, 2, 1, "tbody", 33);
    i0.ɵɵtemplate(55, CaseTransactionsComponent_ng_container_3_tbody_55_Template, 3, 0, "tbody", 104);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementStart(56, "span");
    i0.ɵɵelement(57, "br");
    i0.ɵɵelementStart(58, "a", 105);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_3_Template_a_click_58_listener($event) { i0.ɵɵrestoreView(_r132); const ctx_r131 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r131.redirectToFeeSearchPage($event)); });
    i0.ɵɵtext(59, "Create service request and pay");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(60, "br");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(61, "div")(62, "span", 26);
    i0.ɵɵelement(63, "br");
    i0.ɵɵtext(64, "Payments");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(65, CaseTransactionsComponent_ng_container_3_ccpay_app_unprocessed_payments_65_Template, 1, 8, "ccpay-app-unprocessed-payments", 106);
    i0.ɵɵelementContainerStart(66);
    i0.ɵɵelementStart(67, "table", 15);
    i0.ɵɵelement(68, "thead", 16);
    i0.ɵɵtemplate(69, CaseTransactionsComponent_ng_container_3_tbody_69_Template, 2, 1, "tbody", 33);
    i0.ɵɵtemplate(70, CaseTransactionsComponent_ng_container_3_tbody_70_Template, 3, 0, "tbody", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(71, CaseTransactionsComponent_ng_container_3_div_71_Template, 5, 4, "div", 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", !ctx_r1.isExceptionRecord);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.isExceptionRecord);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r1.isBulkScanEnable);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(24, 16, ctx_r1.totalPayments, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.isBulkScanEnable);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(28, 21, ctx_r1.totalRemissions, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(31, 26, ctx_r1.clAmountDue, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(34, 31, ctx_r1.overPaymentAmount, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(21);
    i0.ɵɵproperty("ngIf", (ctx_r1.orderLevelFees == null ? null : ctx_r1.orderLevelFees.length) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r1.orderLevelFees == null ? null : ctx_r1.orderLevelFees.length) === 0);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("disable-link", !ctx_r1.isAddFeeBtnEnabled);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r1.isBulkScanEnable);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", (ctx_r1.allPayments == null ? null : ctx_r1.allPayments.length) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r1.allPayments == null ? null : ctx_r1.allPayments.length) === 0 && ctx_r1.unprocessedRecordCount <= 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r1.check4AllowedRoles2AccessPBApayment());
} }
function CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_14_tr_1_td_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 51);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r142 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r142.cpoDetails["responsibleParty"]);
} }
function CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_14_tr_1_td_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "td", 51);
} }
function CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_14_tr_1_a_11_Template(rf, ctx) { if (rf & 1) {
    const _r147 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 52);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_14_tr_1_a_11_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r147); const orderRef_r140 = i0.ɵɵnextContext().$implicit; const ctx_r145 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r145.loadPBAAccountPage(orderRef_r140)); });
    i0.ɵɵtext(1, " Pay now");
    i0.ɵɵelementEnd();
} }
function CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_14_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r149 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 17)(1, "td", 51);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 51);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_14_tr_1_td_6_Template, 2, 1, "td", 120);
    i0.ɵɵtemplate(7, CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_14_tr_1_td_7_Template, 1, 0, "td", 120);
    i0.ɵɵelementStart(8, "td", 51);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 121);
    i0.ɵɵtemplate(11, CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_14_tr_1_a_11_Template, 2, 0, "a", 122);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 37)(13, "a", 52);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_14_tr_1_Template_a_click_13_listener() { const restoredCtx = i0.ɵɵrestoreView(_r149); const orderRef_r140 = restoredCtx.$implicit; const ctx_r148 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r148.goToOrderViewDetailSection(orderRef_r140)); });
    i0.ɵɵtext(14, "Review");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const orderRef_r140 = ctx.$implicit;
    const ctx_r139 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(orderRef_r140.orderStatus);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(5, 6, orderRef_r140.orderTotalFees, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r139.cpoDetails !== null);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r139.cpoDetails === null);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(orderRef_r140.orderRefId);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r139.serviceRequestValue !== "false" && ctx_r139.check4AllowedRoles2AccessPBApayment() && orderRef_r140.orderStatus === "Not paid");
} }
function CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20);
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_14_tr_1_Template, 15, 11, "tr", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r137 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r137.orderLevelFees);
} }
function CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20)(1, "tr", 17)(2, "td", 123);
    i0.ɵɵtext(3, "No service requests on this case.");
    i0.ɵɵelementEnd()()();
} }
function CaseTransactionsComponent_ng_container_4_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "table", 15)(2, "thead", 16)(3, "tr", 17)(4, "td", 85);
    i0.ɵɵtext(5, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 101);
    i0.ɵɵtext(7, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 101);
    i0.ɵɵtext(9, "Party");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 119);
    i0.ɵɵtext(11, "Request reference\t");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "td", 87)(13, "td", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(14, CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_14_Template, 2, 1, "tbody", 33);
    i0.ɵɵtemplate(15, CaseTransactionsComponent_ng_container_4_ng_container_2_tbody_15_Template, 4, 0, "tbody", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r133 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngIf", (ctx_r133.orderLevelFees == null ? null : ctx_r133.orderLevelFees.length) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r133.orderLevelFees == null ? null : ctx_r133.orderLevelFees.length) === 0 && ctx_r133.serviceRequestValue === "false");
} }
function CaseTransactionsComponent_ng_container_4_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "h1", 124);
    i0.ɵɵtext(2, "If you are expecting to pay and are not able to see a service request,");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "please refresh and try in some time.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function CaseTransactionsComponent_ng_container_4_div_5_tbody_18_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r156 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 17)(1, "td", 51);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 51);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 51);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 51);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "td", 51);
    i0.ɵɵelementStart(12, "td", 51)(13, "a", 52);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_4_div_5_tbody_18_tr_1_Template_a_click_13_listener() { const restoredCtx = i0.ɵɵrestoreView(_r156); const payment_r154 = restoredCtx.$implicit; const ctx_r155 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r155.goToPayementView(payment_r154.paymentGroupReference, payment_r154.reference, payment_r154.method)); });
    i0.ɵɵtext(14, "Review");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const payment_r154 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(payment_r154.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(5, 4, payment_r154.amount, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 9, payment_r154.date_created, "dd MMM yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(payment_r154 == null ? null : payment_r154.reference);
} }
function CaseTransactionsComponent_ng_container_4_div_5_tbody_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20);
    i0.ɵɵtemplate(1, CaseTransactionsComponent_ng_container_4_div_5_tbody_18_tr_1_Template, 15, 12, "tr", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r150 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r150.allPayments);
} }
function CaseTransactionsComponent_ng_container_4_div_5_tbody_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 20)(1, "td", 113);
    i0.ɵɵtext(2, "No payments recorded");
    i0.ɵɵelementEnd()();
} }
function CaseTransactionsComponent_ng_container_4_div_5_ccpay_app_unprocessed_payments_20_Template(rf, ctx) { if (rf & 1) {
    const _r158 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccpay-app-unprocessed-payments", 127);
    i0.ɵɵlistener("getUnprocessedFeeCount", function CaseTransactionsComponent_ng_container_4_div_5_ccpay_app_unprocessed_payments_20_Template_ccpay_app_unprocessed_payments_getUnprocessedFeeCount_0_listener($event) { i0.ɵɵrestoreView(_r158); const ctx_r157 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r157.getUnprocessedFeeCount($event)); })("selectedUnprocessedFeeEvent", function CaseTransactionsComponent_ng_container_4_div_5_ccpay_app_unprocessed_payments_20_Template_ccpay_app_unprocessed_payments_selectedUnprocessedFeeEvent_0_listener($event) { i0.ɵɵrestoreView(_r158); const ctx_r159 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r159.selectedUnprocessedFeeEvent($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r152 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("IS_BUTTON_ENABLE", ctx_r152.takePayment)("LEVEL", 4)("ISTURNOFF", ctx_r152.isTurnOff)("ISSFENABLE", ctx_r152.isStrategicFixEnable)("PAYMENTSLENGTH", ctx_r152.allPayments == null ? null : ctx_r152.allPayments.length)("PAYMENTREF", ctx_r152.paymentRef)("FEE_RECORDS_EXISTS", ctx_r152.isAnyFeeGroupAvilable)("IS_OS_AMT_AVAILABLE", ctx_r152.isGrpOutstandingAmtPositive);
} }
function CaseTransactionsComponent_ng_container_4_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "span", 26);
    i0.ɵɵelement(2, "br");
    i0.ɵɵtext(3, "Payments");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerStart(4);
    i0.ɵɵelementStart(5, "table", 15)(6, "thead", 16)(7, "tr", 17)(8, "td", 85);
    i0.ɵɵtext(9, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 84);
    i0.ɵɵtext(11, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 125);
    i0.ɵɵtext(13, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 119);
    i0.ɵɵtext(15, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "td", 83)(17, "td", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(18, CaseTransactionsComponent_ng_container_4_div_5_tbody_18_Template, 2, 1, "tbody", 33);
    i0.ɵɵtemplate(19, CaseTransactionsComponent_ng_container_4_div_5_tbody_19_Template, 3, 0, "tbody", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, CaseTransactionsComponent_ng_container_4_div_5_ccpay_app_unprocessed_payments_20_Template, 1, 8, "ccpay-app-unprocessed-payments", 126);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r135 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("ngIf", (ctx_r135.allPayments == null ? null : ctx_r135.allPayments.length) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r135.allPayments == null ? null : ctx_r135.allPayments.length) === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r135.isBulkScanEnable && !ctx_r135.takePayment);
} }
function CaseTransactionsComponent_ng_container_4_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31)(1, "span", 26);
    i0.ɵɵelement(2, "br");
    i0.ɵɵtext(3, "Refunds");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "ccpay-refund-status", 128);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r136 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ccdCaseNumber", ctx_r136.ccdCaseNumber)("orderParty", ctx_r136.orderParty);
} }
function CaseTransactionsComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 117);
    i0.ɵɵtemplate(2, CaseTransactionsComponent_ng_container_4_ng_container_2_Template, 16, 2, "ng-container", 0);
    i0.ɵɵtemplate(3, CaseTransactionsComponent_ng_container_4_ng_container_3_Template, 5, 0, "ng-container", 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 31);
    i0.ɵɵtemplate(5, CaseTransactionsComponent_ng_container_4_div_5_Template, 21, 3, "div", 0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CaseTransactionsComponent_ng_container_4_div_6_Template, 5, 2, "div", 118);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r2.serviceRequestValue !== "false" ? "govuk-margin-btm-20px" : "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !((ctx_r2.orderLevelFees == null ? null : ctx_r2.orderLevelFees.length) === 0 && !ctx_r2.isAnyFeeGroupAvilable) && ctx_r2.serviceRequestValue !== "false");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r2.orderLevelFees == null ? null : ctx_r2.orderLevelFees.length) === 0 && ctx_r2.serviceRequestValue !== "false" && !ctx_r2.isAnyFeeGroupAvilable);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.serviceRequestValue === "false");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r2.check4AllowedRoles2AccessPBApayment());
} }
function CaseTransactionsComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r161 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccpay-service-request", 129);
    i0.ɵɵlistener("goToServiceRquestComponent", function CaseTransactionsComponent_ng_container_7_Template_ccpay_service_request_goToServiceRquestComponent_1_listener() { i0.ɵɵrestoreView(_r161); const ctx_r160 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r160.goToServiceRequestPage()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("viewStatus", ctx_r4.viewStatus)("orderRef", ctx_r4.orderRef)("orderStatus", ctx_r4.orderStatus)("orderCreated", ctx_r4.orderCreated)("orderParty", ctx_r4.orderParty)("orderCCDEvent", ctx_r4.orderCCDEvent)("orderDetail", ctx_r4.orderDetail)("paymentGroupList", ctx_r4.paymentGroups)("LOGGEDINUSERROLES", ctx_r4.LOGGEDINUSERROLES)("ccdCaseNumber", ctx_r4.ccdCaseNumber)("orderFeesTotal", ctx_r4.orderFeesTotal)("orderTotalPayments", ctx_r4.orderTotalPayments)("orderRemissionTotal", ctx_r4.orderRemissionTotal)("isServiceRequest", ctx_r4.serviceRequestValue);
} }
function CaseTransactionsComponent_ccpay_add_remission_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-add-remission", 130);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("isTurnOff", ctx_r5.isTurnOff)("isStrategicFixEnable", ctx_r5.isStrategicFixEnable)("viewCompStatus", ctx_r5.viewStatus)("fee", ctx_r5.feeId)("orderStatus", ctx_r5.orderStatus)("paidAmount", ctx_r5.orderTotalPayments)("isRefundRemission", ctx_r5.isRefundRemission)("caseType", ctx_r5.caseType)("paymentGroupRef", ctx_r5.orderRef)("isFromServiceRequestPage", true)("payment", ctx_r5.payment)("ccdCaseNumber", ctx_r5.ccdCaseNumber);
} }
function CaseTransactionsComponent_ccpay_add_remission_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-add-remission", 131);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵproperty("isTurnOff", ctx_r6.isTurnOff)("isStrategicFixEnable", ctx_r6.isStrategicFixEnable)("viewCompStatus", ctx_r6.viewStatus)("isFromServiceRequestPage", true)("payment", ctx_r6.payment)("orderStatus", ctx_r6.orderStatus)("paidAmount", ctx_r6.orderTotalPayments)("isRefundRemission", ctx_r6.isRefundRemission)("caseType", ctx_r6.caseType)("paymentGroupRef", ctx_r6.orderRef)("ccdCaseNumber", ctx_r6.ccdCaseNumber);
} }
function CaseTransactionsComponent_ccpay_add_remission_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-add-remission", 132);
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵproperty("isTurnOff", ctx_r7.isTurnOff)("isStrategicFixEnable", ctx_r7.isStrategicFixEnable)("viewCompStatus", ctx_r7.viewStatus)("payment", ctx_r7.payment)("orderStatus", ctx_r7.orderStatus)("paidAmount", ctx_r7.orderTotalPayments)("isRefundRemission", ctx_r7.isRefundRemission)("caseType", ctx_r7.caseType)("feeamount", ctx_r7.remissionFeeAmt)("remission", ctx_r7.remissions)("isFromServiceRequestPage", true)("ccdCaseNumber", ctx_r7.ccdCaseNumber);
} }
function CaseTransactionsComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    const _r163 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 133)(2, "span", 134);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong", 135)(5, "span", 136);
    i0.ɵɵtext(6, "Warning");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7, " Are you sure you want to delete this fee? ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 137)(9, "form", 138)(10, "button", 139);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_11_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r163); const ctx_r162 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r162.cancelRemoval()); });
    i0.ɵɵtext(11, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 140);
    i0.ɵɵlistener("click", function CaseTransactionsComponent_ng_container_11_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r163); const ctx_r164 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r164.removeFee(ctx_r164.feeId)); });
    i0.ɵɵtext(13, " Remove ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("disabled", ctx_r8.isRemoveBtnDisabled)("ngClass", ctx_r8.isRemoveBtnDisabled ? "button button--disabled govuk-!-margin-right-1" : "button govuk-!-margin-right-1");
} }
const BS_ENABLE_FLAG = 'bulk-scan-enabling-fe';
export class CaseTransactionsComponent {
    router;
    paymentViewService;
    bulkScaningPaymentService;
    caseTransactionsService;
    paymentLibComponent;
    OrderslistService;
    LOGGEDINUSERROLES;
    isTakePayment;
    isFromServiceRequestPage;
    takePayment;
    ccdCaseNumber;
    excReference;
    paymentGroups = [];
    payments = [];
    nonPayments = [];
    allPayments = [];
    remissions = [];
    fees = [];
    errorMessage;
    totalFees;
    totalPayments = 0;
    totalNonOffPayments;
    totalRemissions = 0;
    selectedOption;
    dcnNumber;
    paymentRef;
    isTurnOff;
    isRefundRemission = true;
    isStrategicFixEnable;
    isAddFeeBtnEnabled = true;
    isExceptionRecord = false;
    isUnprocessedRecordSelected = false;
    exceptionRecordReference;
    isAnyFeeGroupAvilable = true;
    isHistoricGroupAvailable = false;
    isBulkScanEnable;
    isRemissionsMatch;
    viewStatus = 'main';
    isRemoveBtnDisabled = false;
    feeId;
    clAmountDue = 0;
    overPaymentAmount = 0;
    unprocessedRecordCount;
    isFeeRecordsExist = false;
    isGrpOutstandingAmtPositive = false;
    totalRefundAmount;
    caseType;
    // lsCcdNumber: any = ls.get<any>('ccdNumber');
    payment;
    paymentGroup;
    paymentView;
    //Order changes
    orderDetail = [];
    isAddRemissionEnable = false;
    orderRemissionDetails = [];
    orderLevelFees = [];
    ispaymentGroupApisuccess = false;
    cpoDetails = null;
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
    isCPODown;
    test;
    isPBA = false;
    isIssueRefunfBtnEnable = false;
    isAddRemissionBtnEnabled = false;
    isRefundRemissionBtnEnable = false;
    allowedRolesToAccessRefund = ['payments-refund-approver', 'payments-refund'];
    isEligible4PBAPayment = ['pui-finance-manager', 'pui-user-manager', 'pui-organisation-manager', 'pui-case-manager'];
    currentDate = new Date();
    //isFromServiceRequestPage: boolean;
    navigationpage;
    remissionFeeAmt;
    constructor(router, paymentViewService, bulkScaningPaymentService, caseTransactionsService, paymentLibComponent, OrderslistService) {
        this.router = router;
        this.paymentViewService = paymentViewService;
        this.bulkScaningPaymentService = bulkScaningPaymentService;
        this.caseTransactionsService = caseTransactionsService;
        this.paymentLibComponent = paymentLibComponent;
        this.OrderslistService = OrderslistService;
    }
    ngOnInit() {
        this.navigationpage = '';
        if (this.OrderslistService.getpaymentPageView() !== null) {
            this.OrderslistService.getpaymentPageView().subscribe((data) => this.paymentView = data);
        }
        if ((this.LOGGEDINUSERROLES === undefined || this.LOGGEDINUSERROLES.length === 0) && this.OrderslistService.getUserRolesList() !== null) {
            this.OrderslistService.getUserRolesList().subscribe((data) => this.LOGGEDINUSERROLES = data);
        }
        if (this.OrderslistService.getnavigationPageValue() !== null) {
            this.OrderslistService.getnavigationPageValue().subscribe((data) => this.navigationpage = data);
        }
        if (this.paymentView !== undefined && this.paymentView !== null && this.paymentView.payment_group_reference !== undefined && this.navigationpage === 'paymentdetailspage') {
            this.goToPayementView(this.paymentView.payment_group_reference, this.paymentView.reference, this.paymentView.method);
        }
        this.isGrpOutstandingAmtPositive = false;
        this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
        this.caseType = this.paymentLibComponent.CASETYPE;
        if (this.paymentLibComponent.CCD_CASE_NUMBER === '') {
            this.ccdCaseNumber = this.paymentLibComponent.EXC_REFERENCE;
        }
        this.excReference = this.paymentLibComponent.EXC_REFERENCE;
        this.takePayment = this.paymentLibComponent.TAKEPAYMENT;
        const serviceRequest = this.paymentLibComponent.SERVICEREQUEST;
        if (serviceRequest !== undefined && serviceRequest.toString() === 'true') {
            this.serviceRequestValue = 'true';
        }
        else {
            this.serviceRequestValue = 'false';
            this.paymentLibComponent.isFromServiceRequestPage = false;
        }
        this.isBulkScanEnable = this.paymentLibComponent.ISBSENABLE;
        this.dcnNumber = this.paymentLibComponent.DCN_NUMBER;
        this.selectedOption = this.paymentLibComponent.SELECTED_OPTION.toLocaleLowerCase();
        this.isTurnOff = this.paymentLibComponent.ISTURNOFF;
        this.isStrategicFixEnable = this.paymentLibComponent.ISSFENABLE;
        if (!this.isTurnOff) {
            // if (this.lsCcdNumber !== this.ccdCaseNumber) {
            //   this.router.navigateByUrl(`/ccd-search?takePayment=true`);
            // }
            this.caseTransactionsService.getPaymentGroups(this.ccdCaseNumber).subscribe(paymentGroups => {
                this.isAnyFeeGroupAvilable = true;
                this.paymentGroups = paymentGroups['payment_groups'];
                this.calculateAmounts();
                this.calculateOrderFeesAmounts();
                this.calculateRefundAmount();
                if (this.isFromServiceRequestPage) {
                    this.OrderslistService.getSelectedOrderRefId().subscribe((data) => this.orderRef = data);
                    this.goToOrderViewDetailSection(this.orderRef);
                }
                else {
                    this.paymentViewService.getPartyDetails(this.ccdCaseNumber).subscribe(response => {
                        this.cpoDetails = JSON.parse(response).content[0];
                    }, (error) => {
                        this.errorMessage = error ? error.replace(/"/g, "") : "";
                        this.isCPODown = true;
                    });
                }
            }, (error) => {
                this.errorMessage = error ? error.replace(/"/g, "") : "";
                this.isAnyFeeGroupAvilable = false;
                this.setDefaults();
            });
        }
        else {
            this.caseTransactionsService.getPaymentGroups(this.ccdCaseNumber).subscribe(paymentGroups => {
                this.isAnyFeeGroupAvilable = true;
                this.paymentGroups = paymentGroups['payment_groups'];
                this.calculateAmounts();
                this.calculateOrderFeesAmounts();
                this.totalRefundAmount = this.calculateRefundAmount();
                this.paymentViewService.getPartyDetails(this.ccdCaseNumber).subscribe(response => {
                    this.cpoDetails = JSON.parse(response).content[0];
                }, (error) => {
                    this.errorMessage = error ? error.replace(/"/g, "") : "";
                    this.setDefaults();
                    this.isCPODown = true;
                });
            }, (error) => {
                this.errorMessage = error ? error.replace(/"/g, "") : "";
                this.isAnyFeeGroupAvilable = false;
                this.setDefaults();
            });
        }
        if (this.paymentGroups !== undefined) {
            this.checkForExceptionRecord();
        }
        if (this.OrderslistService.getisFromServiceRequestPages() !== null) {
            this.OrderslistService.getisFromServiceRequestPages().subscribe((data) => this.isFromServiceRequestPage = data);
        }
    }
    setDefaults() {
        this.totalPayments = 0.00;
        this.totalRemissions = 0.00;
        this.totalNonOffPayments = 0.00;
        this.totalFees = 0.00;
    }
    getAllocationStatus(payments) {
        let paymentAllocation = payments.payment_allocation, isAllocationStatusExist = paymentAllocation.length > 0;
        return isAllocationStatusExist ? paymentAllocation[0].allocation_status : '-';
        //return "-";
    }
    checkForExceptionRecord() {
        if (this.paymentGroups.length === 0 && (this.selectedOption.toLocaleLowerCase() === 'ccdorexception' || this.selectedOption.toLocaleLowerCase() === 'rc')) {
            this.bulkScaningPaymentService.getBSPaymentsByCCD(this.ccdCaseNumber).subscribe(recordData => {
                if (recordData['data'] && recordData['data'].exception_record_reference && recordData['data'].exception_record_reference.length > 0 && recordData['data'].ccd_reference > 0) {
                    this.isExceptionRecord = false;
                    this.isAddFeeBtnEnabled = true;
                }
                if (recordData['data'] && recordData['data'].exception_record_reference && recordData['data'].exception_record_reference.length > 0 && recordData['data'].ccd_reference === undefined) {
                    this.isExceptionRecord = true;
                    this.isAddFeeBtnEnabled = false;
                }
                if (recordData['data'] && recordData['data'].exception_record_reference && recordData['data'].exception_record_reference.length === undefined && recordData['data'].ccd_reference > 0) {
                    this.isExceptionRecord = false;
                    this.isAddFeeBtnEnabled = true;
                }
            });
        }
        if (this.paymentGroups.length === 0 && this.selectedOption.toLocaleLowerCase() === 'dcn') {
            if (this.paymentLibComponent.CCD_CASE_NUMBER.length > 0 && this.paymentLibComponent.EXC_REFERENCE.length > 0) {
                this.isExceptionRecord = false;
                this.isAddFeeBtnEnabled = true;
            }
            else if (this.paymentLibComponent.CCD_CASE_NUMBER.length === 0 && this.paymentLibComponent.EXC_REFERENCE.length > 0) {
                this.isExceptionRecord = true;
                this.isAddFeeBtnEnabled = false;
            }
            else {
                this.isExceptionRecord = false;
                this.isAddFeeBtnEnabled = true;
            }
        }
        if (this.paymentGroups.length > 0)
            this.paymentGroups.forEach(paymentGroup => {
                if (paymentGroup.payments) {
                    paymentGroup.payments.forEach(payment => {
                        if (payment.case_reference !== undefined && payment.ccd_case_number === undefined) {
                            this.isExceptionRecord = true;
                            this.isAddFeeBtnEnabled = false;
                        }
                        else {
                            this.isExceptionRecord = false;
                            this.isAddFeeBtnEnabled = true;
                        }
                    });
                }
            });
    }
    calculateOrderFeesAmounts() {
        let feesTotal = 0.00;
        this.paymentGroups.forEach(paymentGroup => {
            this.resetOrderVariables();
            if (paymentGroup.fees) {
                paymentGroup.fees.forEach(fee => {
                    this.orderFeesTotal = this.orderFeesTotal + fee.calculated_amount;
                    this.overPaymentAmount = this.overPaymentAmount + fee.over_payment;
                });
            }
            if (paymentGroup.remissions) {
                paymentGroup.remissions.forEach(remission => {
                    this.orderRemissionTotal = this.orderRemissionTotal + remission.hwf_amount;
                });
            }
            if (paymentGroup.payments) {
                const isFeeOverPaymentExist = this.overPaymentAmount === 0;
                paymentGroup.payments.forEach(payment => {
                    if (isFeeOverPaymentExist) {
                        this.overPaymentAmount = this.overPaymentAmount + payment.over_payment;
                    }
                    if (payment.status.toUpperCase() === 'SUCCESS') {
                        this.orderTotalPayments = this.orderTotalPayments + payment.amount;
                    }
                });
            }
            // this.orderPendingPayments = (this.orderFeesTotal - this.orderRemissionTotal) - this.orderTotalPayments;
            if (paymentGroup.service_request_status === 'Paid') {
                this.orderStatus = paymentGroup.service_request_status;
                this.orderAddBtnEnable = false;
            }
            else if (paymentGroup.service_request_status === 'Partially paid' || paymentGroup.service_request_status === 'Not paid') {
                this.orderStatus = paymentGroup.service_request_status;
                this.orderAddBtnEnable = true;
            }
            else if (paymentGroup.service_request_status === 'Disputed') {
                this.orderStatus = paymentGroup.service_request_status;
                this.orderAddBtnEnable = true;
            }
            //this.orderLevelFees.push({orderRefId:paymentGroup['payment_group_reference'],orderTotalFees: this.orderFeesTotal,orderStatus: this.orderStatus,orderParty:'Santosh', orderCCDEvent:'Case Creation',orderCreated: new Date(), orderAddBtnEnable: this.orderAddBtnEnable}); this.cpoDetails['createdTimestamp']
            if (this.cpoDetails !== null) {
                this.orderLevelFees.push({ orderRefId: paymentGroup['payment_group_reference'], orderTotalFees: this.orderFeesTotal, orderStatus: this.orderStatus, orderParty: this.cpoDetails['responsibleParty'], orderCCDEvent: this.cpoDetails['action'], orderCreated: paymentGroup['date_created'], orderAddBtnEnable: this.orderAddBtnEnable });
            }
            else {
                this.orderLevelFees.push({ orderRefId: paymentGroup['payment_group_reference'], orderTotalFees: this.orderFeesTotal, orderStatus: this.orderStatus, orderParty: '', orderCCDEvent: '', orderCreated: paymentGroup['date_created'], orderAddBtnEnable: this.orderAddBtnEnable });
            }
            if (this.orderStatus !== 'Paid') {
                this.OrderslistService.setOrdersList(this.orderLevelFees);
            }
        });
    }
    ;
    resetOrderVariables() {
        this.orderFeesTotal = 0.00;
        this.orderTotalPayments = 0.00;
        this.orderRemissionTotal = 0.00;
        this.orderPendingPayments = 0.00;
        this.isAddFeeBtnEnabled = true;
    }
    ;
    goToOrderViewDetailSection(orderReferenceObj) {
        if (this.isFromServiceRequestPage) {
            this.OrderslistService.setOrderRefId(orderReferenceObj);
            this.orderRef = orderReferenceObj;
        }
        else {
            this.OrderslistService.setOrderRefId(orderReferenceObj.orderRefId);
            this.orderRef = orderReferenceObj.orderRefId;
        }
        this.orderFeesTotal = 0.00;
        this.orderRemissionTotal = 0.00;
        this.orderTotalPayments = 0.00;
        this.orderPendingPayments = 0.00;
        this.orderDetail = this.paymentGroups.filter(x => x.payment_group_reference === this.orderRef);
        this.orderDetail.forEach(orderDetail => {
            if (orderDetail.fees) {
                orderDetail.fees.forEach(fee => {
                    this.orderFeesTotal = this.orderFeesTotal + fee.calculated_amount;
                });
            }
            if (orderDetail.remissions) {
                orderDetail.remissions.forEach(remission => {
                    this.orderRemissionTotal = this.orderRemissionTotal + remission.hwf_amount;
                });
                if (orderDetail.payments) {
                    this.payment = orderDetail.payments[0];
                    orderDetail.payments.forEach(payment => {
                        if (payment.status.toUpperCase() === 'SUCCESS') {
                            this.orderTotalPayments = this.orderTotalPayments + payment.amount;
                        }
                    });
                }
            }
            this.orderStatus = orderDetail.service_request_status;
        });
        //this.orderPendingPayments = (this.orderFeesTotal - this.orderRemissionTotal) - this.orderTotalPayments;
        // this.orderRef = orderReferenceObj.orderRefId;
        // if (this.orderPendingPayments <= 0.00) {
        //   this.orderStatus = 'Paid';
        // } else if (this.orderFeesTotal > 0 && (this.orderTotalPayments > 0 || this.orderRemissionTotal > 0) && (this.orderTotalPayments < this.orderPendingPayments)) {
        //   this.orderStatus = 'Partially paid'
        // } else {
        //   this.orderStatus = 'Not paid'
        // }
        if (this.cpoDetails !== null) {
            this.orderParty = this.cpoDetails['responsibleParty'];
            this.orderCreated = this.cpoDetails['createdTimestamp'];
            this.orderCCDEvent = this.cpoDetails['action'];
        }
        else {
            this.orderParty = '';
            this.orderCCDEvent = '';
            this.orderCreated = orderReferenceObj.orderCreated;
        }
        this.viewStatus = 'order-full-view';
    }
    redirectToOrderFeeSearchPage(event, orderef) {
        if (orderef.orderAddBtnEnable) {
            event.preventDefault();
            this.paymentLibComponent.bspaymentdcn = null;
            this.paymentLibComponent.paymentGroupReference = orderef.orderRefId;
            this.paymentLibComponent.isTurnOff = this.isTurnOff;
            this.paymentLibComponent.viewName = 'fee-summary';
        }
    }
    calculateAmounts() {
        let feesTotal = 0.00, paymentsTotal = 0.00, remissionsTotal = 0.00, nonOffLinePayment = 0.00;
        this.paymentGroups.forEach(paymentGroup => {
            if (paymentGroup.fees) {
                paymentGroup.fees.forEach(fee => {
                    // new feature Apportionment toggle changes
                    if (!this.isTurnOff) {
                        if (fee.date_created) {
                            let a = fee.amount_due === undefined;
                            let b = fee.amount_due <= 0;
                            this.clAmountDue = a ? this.clAmountDue + fee.net_amount : b ? this.clAmountDue + 0 : this.clAmountDue + fee.amount_due;
                        }
                        fee['payment_group_reference'] = paymentGroup['payment_group_reference'];
                        this.fees.push(fee);
                    }
                    else {
                        feesTotal = feesTotal + fee.calculated_amount;
                        this.fees.push(fee);
                    }
                });
            }
            if (this.isTurnOff) {
                this.totalFees = feesTotal;
            }
            if (paymentGroup.payments) {
                paymentGroup.payments.forEach(payment => {
                    // new feature Apportionment toggle changes
                    if (!this.isTurnOff) {
                        let allocationLen = payment.payment_allocation;
                        if (payment.status.toUpperCase() === 'SUCCESS') {
                            paymentsTotal = paymentsTotal + payment.amount;
                            if (allocationLen.length === 0 || allocationLen.length > 0 && allocationLen[0].allocation_status === 'Allocated') {
                                nonOffLinePayment = nonOffLinePayment + payment.amount;
                            }
                            if (allocationLen.length > 0) {
                                this.nonPayments.push(payment);
                            }
                        }
                        if (allocationLen.length === 0) {
                            this.payments.push(payment);
                        }
                        payment.paymentGroupReference = paymentGroup.payment_group_reference;
                        this.allPayments.push(payment);
                    }
                    else {
                        if (payment.status.toUpperCase() === 'SUCCESS') {
                            paymentsTotal = paymentsTotal + payment.amount;
                            this.payments.push(payment);
                        }
                        payment.paymentGroupReference = paymentGroup.payment_group_reference;
                        this.allPayments.push(payment);
                    }
                });
            }
            this.totalPayments = paymentsTotal;
            // new feature Apportionment toggle changes
            if (!this.isTurnOff) {
                this.totalNonOffPayments = nonOffLinePayment;
            }
            if (paymentGroup.remissions) {
                paymentGroup.remissions.forEach(remisison => {
                    remissionsTotal = remissionsTotal + remisison.hwf_amount;
                    this.remissions.push(remisison);
                });
            }
            this.totalRemissions = remissionsTotal;
        });
    }
    calculateRefundAmount() {
        if (!this.isTurnOff) {
            let isNewPaymentGroup = false;
            this.paymentGroups.forEach((paymentGroup, index) => {
                let grpOutstandingAmount = 0.00, feesTotal = 0.00, paymentsTotal = 0.00, remissionsTotal = 0.00, fees = [];
                if (paymentGroup.fees) {
                    // this.isFeeRecordsExist = true;
                    paymentGroup.fees.forEach(fee => {
                        feesTotal = feesTotal + fee.calculated_amount;
                        this.isRemissionsMatch = false;
                        if (paymentGroup.remissions) {
                            paymentGroup.remissions.forEach(rem => {
                                if (rem.fee_code === fee.code) {
                                    this.isRemissionsMatch = true;
                                    fee['remissions'] = rem;
                                    // if(!fees.find(k => k.code=fee.code))
                                    // {
                                    fees.push(fee);
                                    //}
                                }
                            });
                        }
                        if (!this.isRemissionsMatch) {
                            fees.push(fee);
                        }
                        if (fee.date_created) {
                            isNewPaymentGroup = true;
                        }
                        else {
                            this.isHistoricGroupAvailable = true;
                            this.paymentGroups[index]['old'] = true;
                        }
                    });
                    this.paymentGroups[index].fees = fees;
                }
                if (paymentGroup.payments) {
                    paymentGroup.payments.forEach(payment => {
                        if (payment.status.toUpperCase() === 'SUCCESS') {
                            paymentsTotal = paymentsTotal + payment.amount;
                        }
                    });
                }
                if (paymentGroup.remissions) {
                    paymentGroup.remissions.forEach(remission => {
                        remissionsTotal = remissionsTotal + remission.hwf_amount;
                    });
                }
                grpOutstandingAmount = (feesTotal - remissionsTotal) - paymentsTotal;
                if (grpOutstandingAmount > 0 && isNewPaymentGroup) {
                    this.isAnyFeeGroupAvilable = true;
                    this.isFeeRecordsExist = true;
                    this.paymentRef = paymentGroup.payment_group_reference;
                }
                if (paymentGroup.fees && paymentGroup.fees.length > 0 && grpOutstandingAmount <= 0 && isNewPaymentGroup) {
                    this.isAnyFeeGroupAvilable = false;
                }
            });
            if ((!isNewPaymentGroup && this.isHistoricGroupAvailable) || (!isNewPaymentGroup && !this.isHistoricGroupAvailable)) {
                this.isAnyFeeGroupAvilable = false;
            }
        }
        else {
            let totalRefundAmount = 0, isFeeAmountZero = false;
            this.paymentGroups.forEach(paymentGroup => {
                let grpOutstandingAmount = 0.00, feesTotal = 0.00, paymentsTotal = 0.00, remissionsTotal = 0.00;
                if (paymentGroup.fees) {
                    this.isFeeRecordsExist = true;
                    paymentGroup.fees.forEach(fee => {
                        feesTotal = feesTotal + fee.calculated_amount;
                        if (fee.calculated_amount === 0) {
                            isFeeAmountZero = true;
                        }
                    });
                }
                if (paymentGroup.payments) {
                    paymentGroup.payments.forEach(payment => {
                        if (payment.status.toUpperCase() === 'SUCCESS') {
                            paymentsTotal = paymentsTotal + payment.amount;
                        }
                    });
                }
                if (paymentGroup.remissions) {
                    paymentGroup.remissions.forEach(remission => {
                        remissionsTotal = remissionsTotal + remission.hwf_amount;
                    });
                }
                grpOutstandingAmount = (feesTotal - remissionsTotal) - paymentsTotal;
                if (grpOutstandingAmount < 0) {
                    if (totalRefundAmount === 0) {
                        totalRefundAmount = grpOutstandingAmount;
                    }
                    else {
                        totalRefundAmount = (totalRefundAmount + grpOutstandingAmount);
                    }
                }
                else if (grpOutstandingAmount > 0 || (grpOutstandingAmount === 0 && isFeeAmountZero)) {
                    this.isGrpOutstandingAmtPositive = true;
                }
            });
            return totalRefundAmount * -1;
        }
    }
    getGroupOutstandingAmount(paymentGroup) {
        return this.bulkScaningPaymentService.calculateOutStandingAmount(paymentGroup);
    }
    redirectToFeeSearchPage(event) {
        event.preventDefault();
        let url = this.isBulkScanEnable ? '&isBulkScanning=Enable' : '&isBulkScanning=Disable';
        url += this.isTurnOff ? '&isTurnOff=Enable' : '&isTurnOff=Disable';
        url += this.isStrategicFixEnable ? '&isStFixEnable=Enable' : '&isStFixEnable=Disable';
        url += `&caseType=${this.caseType}`;
        this.router.navigateByUrl(`/fee-search?selectedOption=${this.selectedOption}&ccdCaseNumber=${this.ccdCaseNumber}${url}`);
    }
    addRemission(fee) {
        if (this.chkForAddRemission(fee.code)) {
            this.feeId = fee;
            this.viewStatus = 'addremission';
            this.paymentViewService.getApportionPaymentDetails(this.payment.reference).subscribe(paymentGroup => {
                this.paymentGroup = paymentGroup;
                this.paymentGroup.payments = this.paymentGroup.payments.filter(paymentGroupObj => paymentGroupObj['reference'].includes(this.paymentLibComponent.paymentReference));
                this.payment = this.paymentGroup.payments[0];
                // const paymentAllocation = this.paymentGroup.payments[0].payment_allocation;
                // this.isStatusAllocated = paymentAllocation.length > 0 && paymentAllocation[0].allocation_status === 'Allocated' || paymentAllocation.length === 0;
            }, (error) => this.errorMessage = error ? error.replace(/"/g, "") : "");
        }
    }
    addRefundForRemission(payment, remission, fees) {
        this.paymentViewService.getApportionPaymentDetails(payment.reference).subscribe(paymentGroup => {
            this.paymentGroup = paymentGroup;
            this.paymentGroup.payments = paymentGroup.payments.filter(paymentGroupObj => paymentGroupObj.reference === payment.reference);
            this.payment = this.paymentGroup.payments[0];
            this.remissions = remission;
            this.remissionFeeAmt = fees.filter(data => data.code === this.remissions['fee_code'])[0].net_amount;
            this.viewStatus = 'addrefundforremission';
            // const paymentAllocation = this.paymentGroup.payments[0].payment_allocation;
            // this.isStatusAllocated = paymentAllocation.length > 0 && paymentAllocation[0].allocation_status === 'Allocated' || paymentAllocation.length === 0;
        }, (error) => this.errorMessage = error);
    }
    redirectToremissionPage(event) {
        event.preventDefault();
        this.paymentLibComponent.viewName = 'remission';
    }
    goToServiceRequestPage() {
        this.paymentLibComponent.viewName = 'case-transactions';
        this.paymentLibComponent.TAKEPAYMENT = false;
        this.paymentLibComponent.SERVICEREQUEST = 'true';
        this.paymentLibComponent.isFromServiceRequestPage = true;
        window.location.reload();
    }
    redirectToReportsPage(event) {
        event.preventDefault();
        this.router.navigateByUrl(`/reports?selectedOption=${this.selectedOption}&ccdCaseNumber=${this.ccdCaseNumber}`);
    }
    loadFeeSummaryPage(paymentGroup) {
        this.paymentLibComponent.bspaymentdcn = null;
        this.paymentLibComponent.paymentGroupReference = paymentGroup.payment_group_reference;
        this.paymentLibComponent.isTurnOff = this.isTurnOff;
        this.paymentLibComponent.viewName = 'fee-summary';
    }
    goToPaymentViewComponent(paymentGroup) {
        this.paymentLibComponent.paymentMethod = paymentGroup.paymentMethod;
        this.paymentLibComponent.paymentGroupReference = paymentGroup.paymentGroupReference;
        this.paymentLibComponent.paymentReference = paymentGroup.paymentReference;
        this.paymentLibComponent.viewName = 'payment-view';
    }
    goToPayementView(paymentGroupReference, paymentReference, paymentMethod) {
        this.goToPaymentViewComponent({ paymentGroupReference, paymentReference, paymentMethod });
    }
    selectedUnprocessedFeeEvent(unprocessedRecordId) {
        if (unprocessedRecordId) {
            if (this.isTurnOff) {
                this.isAddFeeBtnEnabled = false;
            }
            this.isUnprocessedRecordSelected = true;
        }
        else {
            if (this.isTurnOff) {
                this.isAddFeeBtnEnabled = true;
            }
            this.isUnprocessedRecordSelected = false;
        }
    }
    getUnprocessedFeeCount(unProcessedRecordCount) {
        this.unprocessedRecordCount = unProcessedRecordCount;
    }
    calculateAmountDue(fee) {
        if (fee.date_created) {
            return fee.amount_due !== undefined ? fee.amount_due : fee.net_amount;
        }
        else {
            return "0.00";
        }
    }
    confirmRemoveFee(fee) {
        this.isRemoveBtnDisabled = false;
        this.feeId = fee;
        this.viewStatus = 'feeRemovalConfirmation';
    }
    cancelRemoval() {
        this.viewStatus = 'main';
    }
    removeFee(fee) {
        this.isRemoveBtnDisabled = true;
        this.paymentViewService.deleteFeeFromPaymentGroup(fee).subscribe((success) => {
            window.location.reload();
        }, (error) => {
            this.errorMessage = error;
            this.isRemoveBtnDisabled = false;
        });
    }
    isCheckAmountdueExist(amountDue) {
        return typeof amountDue === 'undefined';
    }
    issueRefund(payment) {
        if (payment !== null && payment !== undefined) {
            if (this.chkIssueRefundBtnEnable(payment)) {
                this.viewStatus = 'issuerefund';
                this.payment = payment;
                this.paymentLibComponent.isFromServiceRequestPage = true;
                this.isRefundRemission = true;
            }
        }
    }
    chkForAddRemission(feeCode) {
        if (this.chkForPBAPayment() && this.check4AllowedRoles2AccessRefund()) {
            if (this.orderDetail[0]['remissions'].length > 0) {
                for (const remission of this.orderDetail[0]['remissions']) {
                    if (remission.fee_code === feeCode) {
                        return false;
                    }
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    chkForPBAPayment() {
        if (this.orderDetail !== null && this.orderDetail !== undefined) {
            this.orderDetail.forEach(orderDetail => {
                if (orderDetail.payments) {
                    orderDetail.payments.forEach(payment => {
                        if (payment.method.toLocaleLowerCase() === 'payment by account' && this.allowFurtherAccessAfter4Days(payment)) {
                            this.isPBA = true;
                        }
                    });
                }
            });
            if (this.isPBA) {
                return true;
            }
            else {
                return false;
            }
            ;
        }
    }
    chkIssueRefundBtnEnable(payment) {
        if (payment !== null && payment !== undefined) {
            return payment.issue_refund && payment.refund_enable;
        }
        else {
            return false;
        }
        // if (this.check4AllowedRoles2AccessRefund() && this.allowFurtherAccessAfter4Days(payment) &&
        //   payment.method === 'payment by account' && payment.status.toLocaleLowerCase() === 'success') {
        //   this.isIssueRefunfBtnEnable = true;
        // }
        // if (this.isIssueRefunfBtnEnable) {
        //   return true;
        // } else {
        //   return false;
        // };
    }
    chkIsRefundRemissionBtnEnable() {
        if (this.orderDetail !== null && this.orderDetail !== undefined) {
            this.paymentLibComponent.isFromServiceRequestPage = true;
            this.orderDetail.forEach(orderDetail => {
                if (orderDetail.payments) {
                    orderDetail.payments.forEach(payment => {
                        if (payment.method.toLocaleLowerCase() === 'payment by account' && payment.status.toLocaleLowerCase() === 'success' && this.allowFurtherAccessAfter4Days(payment)) {
                            this.isRefundRemissionBtnEnable = true;
                        }
                    });
                }
            });
            if (this.isRefundRemissionBtnEnable) {
                return true;
            }
            else {
                return false;
            }
            ;
        }
    }
    check4AllowedRoles2AccessRefund = () => {
        return this.allowedRolesToAccessRefund.some(role => this.LOGGEDINUSERROLES.indexOf(role) !== -1);
    };
    check4AllowedRoles2AccessPBApayment = () => {
        return this.isEligible4PBAPayment.some(role => this.LOGGEDINUSERROLES.indexOf(role) !== -1);
    };
    allowFurtherAccessAfter4Days = (payment) => {
        if (payment !== null && payment !== undefined) {
            let tmp4DayAgo = new Date();
            tmp4DayAgo.setDate(tmp4DayAgo.getDate() - 4);
            return tmp4DayAgo >= new Date(payment.date_created);
        }
    };
    loadPBAAccountPage(orderRef) {
        this.paymentLibComponent.pbaPayOrderRef = orderRef;
        this.paymentLibComponent.viewName = 'pba-payment';
    }
    static ɵfac = function CaseTransactionsComponent_Factory(t) { return new (t || CaseTransactionsComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.PaymentViewService), i0.ɵɵdirectiveInject(i3.BulkScaningPaymentService), i0.ɵɵdirectiveInject(i4.CaseTransactionsService), i0.ɵɵdirectiveInject(i5.PaymentLibComponent), i0.ɵɵdirectiveInject(i6.OrderslistService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseTransactionsComponent, selectors: [["ccpay-case-transactions"]], inputs: { LOGGEDINUSERROLES: "LOGGEDINUSERROLES", isTakePayment: "isTakePayment", isFromServiceRequestPage: "isFromServiceRequestPage" }, decls: 12, vars: 8, consts: [[4, "ngIf"], ["type", "hidden", "value", "FEEREMOVALCONFIRMATION_2", 1, "iFrameDrivenImageValue"], ["myInput", ""], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "fee", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "paymentGroupRef", "isFromServiceRequestPage", "payment", "ccdCaseNumber", 4, "ngIf"], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "isFromServiceRequestPage", "payment", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "paymentGroupRef", "ccdCaseNumber", 4, "ngIf"], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "payment", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "feeamount", "remission", "isFromServiceRequestPage", "ccdCaseNumber", 4, "ngIf"], ["class", "govuk-grid-row govuk-grid__surplus-payments", 4, "ngIf"], ["class", "govuk-grid-row", 4, "ngIf"], [1, "govuk-grid-row"], ["class", " govuk-!-margin-top-9", 4, "ngIf"], [1, "govuk-grid-column-two-thirds"], [1, "govuk-heading-xl"], ["class", "govuk-grid-column-two-thirds govuk-!-padding-bottom-6 govuk-!-padding-top-6", 4, "ngIf"], [1, "govuk-grid-column-full", "govuk-!-padding-bottom-3"], [1, "govuk-section-break", "govuk-section-break--visible"], [1, "govuk-table"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["scope", "col", 1, "govuk-table__header"], ["class", "govuk-table__header govuk-table__header--custom", "scope", "col", 4, "ngIf"], [1, "govuk-table__body"], [1, "totalpayments", "govuk-table__row"], [1, "govuk-table__cell", "summary-table-font"], ["class", "govuk-table__cell case-transaction__color summary-table-font", 4, "ngIf"], ["class", "govuk-grid-column-two-thirds", 4, "ngIf"], [1, "govuk-grid-column-two-thirds", "govuk-!-padding-bottom-6", "govuk-!-padding-top-6"], [1, "heading-medium"], ["scope", "col", 1, "govuk-table__header", "govuk-table__header--custom"], [1, "govuk-table__cell", "case-transaction__color", "summary-table-font"], ["type", "submit", 3, "disabled", "ngClass", "click"], [1, "govuk-!-margin-top-9"], [1, "govuk-grid-column-full"], ["class", "govuk-table__body", 4, "ngFor", "ngForOf"], ["class", "govuk-table__body", 4, "ngIf"], ["class", "hmcts-banner", 4, "ngIf"], ["class", "panel panel-no--style", 4, "ngIf"], ["class", "govuk-table__row", 4, "ngFor", "ngForOf"], [1, "govuk-table__cell"], ["class", "govuk-table__cell govuk-!-font-weight-bold", 4, "ngIf"], ["class", "govuk-table__cell", 4, "ngIf"], [1, "govuk-table__cell", "govuk-!-font-weight-bold"], [3, "ngClass", "click"], ["colspan", "7", 1, "govuk-table__cell"], [1, "hmcts-banner"], ["fill", "currentColor", "role", "presentation", "focusable", "false", "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 25 25", "height", "25", "width", "25", 1, "hmcts-banner__icon"], ["d", "M13.7,18.5h-2.4v-2.4h2.4V18.5z M12.5,13.7c-0.7,0-1.2-0.5-1.2-1.2V7.7c0-0.7,0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2v4.8\n                C13.7,13.2,13.2,13.7,12.5,13.7z M12.5,0.5c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S19.1,0.5,12.5,0.5z"], [1, "hmcts-banner__message"], [1, "hmcts-banner__assistive"], [1, "panel", "panel-no--style"], ["scope", "col", 1, "govuk-table__header", "col-28"], ["scope", "col", 1, "govuk-table__header", "col-15"], [1, "govuk-table__cell", "whitespace-inherit"], ["href", "javascript:void(0)", 3, "click"], [1, "channel", "govuk-table__cell", "whitespace-inherit"], [1, "govuk-table__cell", "capitalize", "whitespace-inherit"], ["colspan", "5", 1, "govuk-table__cell"], ["align", "right", 1, "govuk-grid-column-one-third"], [1, "button", 3, "ngClass", "click"], [1, "govuk-grid-column-two-thirds", "govuk-!-padding-bottom-6"], [4, "ngFor", "ngForOf"], [3, "IS_BUTTON_ENABLE", "LEVEL", "PAYMENTSLENGTH", "PAYMENTREF", "ISTURNOFF", "ISSFENABLE", "FEE_RECORDS_EXISTS", "IS_OS_AMT_AVAILABLE", "getUnprocessedFeeCount", "selectedUnprocessedFeeEvent", 4, "ngIf"], [1, "heading-small"], ["colspan", "6", 1, "govuk-table__cell"], [1, "govuk-grid-column-full", "govuk-grid-column-full--gr"], [1, "feeclass"], ["scope", "col", 1, "groupamount", "govuk-table__header"], ["class", "govuk-inset-text govuk-inset-text__no-border", 4, "ngIf"], [1, "govuk-table__cell", "govuk-table__cell--col1"], [1, "govuk-table__cell", "govuk-table__cell--col2"], [1, "govuk-table__cell", "govuk-table__cell--col3", "align-center"], [1, "govuk-table__cell", "govuk-table__cell--col4"], [1, "govuk-table__cell", "govuk-table__cell--col5"], ["class", "govuk-table__cell govuk-table__cell--col6 govuk-table__custom--col6", 4, "ngIf"], [1, "govuk-table__cell", "govuk-table__cell--col6", "govuk-table__custom--col6"], [1, "govuk-inset-text", "govuk-inset-text__no-border"], [1, "govuk-hidetext"], [1, "summary"], [1, "panel", "panel-border-narrow"], [3, "IS_BUTTON_ENABLE", "LEVEL", "PAYMENTSLENGTH", "PAYMENTREF", "ISTURNOFF", "ISSFENABLE", "FEE_RECORDS_EXISTS", "IS_OS_AMT_AVAILABLE", "getUnprocessedFeeCount", "selectedUnprocessedFeeEvent"], [1, "govuk-grid-row", "govuk-grid__surplus-payments"], [1, "govuk-grid-column-full", "govuk-grid__surplus-payments-col1"], [3, "IS_BUTTON_ENABLE", "LEVEL", "ISTURNOFF", "ISSFENABLE", "FEE_RECORDS_EXISTS", "IS_OS_AMT_AVAILABLE", "PAYMENTSLENGTH", "PAYMENTREF", "getUnprocessedFeeCount", "selectedUnprocessedFeeEvent", 4, "ngIf"], [3, "IS_BUTTON_ENABLE", "LEVEL", "ISTURNOFF", "ISSFENABLE", "FEE_RECORDS_EXISTS", "IS_OS_AMT_AVAILABLE", "PAYMENTSLENGTH", "PAYMENTREF", "getUnprocessedFeeCount", "selectedUnprocessedFeeEvent"], ["scope", "col", 1, "govuk-table__header", "col-13"], ["scope", "col", 1, "govuk-table__header", "col-10"], ["scope", "col", 1, "govuk-table__header", "col-14"], ["scope", "col", 1, "govuk-table__header", "col-20"], ["scope", "col", 1, "govuk-table__header", "col-9"], ["class", "govuk-table", 3, "IS_BUTTON_ENABLE", "LEVEL", "ISTURNOFF", "ISSFENABLE", "FEE_RECORDS_EXISTS", "IS_OS_AMT_AVAILABLE", "PAYMENTSLENGTH", "PAYMENTREF", "getUnprocessedFeeCount", "selectedUnprocessedFeeEvent", 4, "ngIf"], [1, "govuk-table__cell", "col-13", "whitespace-inherit"], [1, "govuk-table__cell", "col-10", "whitespace-inherit"], [1, "govuk-table__cell", "col-17", "whitespace-inherit"], [1, "govuk-table__cell", "col-24", "whitespace-inherit"], [1, "govuk-table", 3, "IS_BUTTON_ENABLE", "LEVEL", "ISTURNOFF", "ISSFENABLE", "FEE_RECORDS_EXISTS", "IS_OS_AMT_AVAILABLE", "PAYMENTSLENGTH", "PAYMENTREF", "getUnprocessedFeeCount", "selectedUnprocessedFeeEvent"], [1, "govuk-grid-column-two-thirds", "govuk-heading-l", "govuk-!-margin-top-0"], ["class", " govuk-!-margin-bottom-6 alignself", 4, "ngIf"], ["class", "govuk-!-margin-bottom-3 col-55 alignself", 4, "ngIf"], ["scope", "col", 1, "govuk-table__header", "col-25"], ["class", "govuk-table__header govuk-table__header--custom col-25", "scope", "col", 4, "ngIf"], ["type", "hidden", "value", "ORDERIDDETAILS", 1, "iFrameDrivenImageValue"], [1, "paymentrequest"], ["scope", "col", 1, "govuk-table__header", "col-18"], ["scope", "col", 1, "govuk-table__header", "col-21"], ["scope", "col", 1, "govuk-table__header", "col"], ["class", "govuk-table__body alignleft", 4, "ngIf"], [3, "click"], [3, "IS_BUTTON_ENABLE", "LEVEL", "PAYMENTSLENGTH", "ISTURNOFF", "ISSFENABLE", "PAYMENTREF", "FEE_RECORDS_EXISTS", "IS_OS_AMT_AVAILABLE", "getUnprocessedFeeCount", "selectedUnprocessedFeeEvent", 4, "ngIf"], [1, "govuk-!-margin-bottom-6", "alignself"], [1, "govuk-!-margin-bottom-3", "col-55", "alignself"], ["scope", "col", 1, "govuk-table__header", "govuk-table__header--custom", "col-25"], ["class", "govuk-table__cell whitespace-inherit", 4, "ngIf"], [1, "alignright"], [1, "govuk-table__body", "alignleft"], ["colspan", "6"], [3, "IS_BUTTON_ENABLE", "LEVEL", "PAYMENTSLENGTH", "ISTURNOFF", "ISSFENABLE", "PAYMENTREF", "FEE_RECORDS_EXISTS", "IS_OS_AMT_AVAILABLE", "getUnprocessedFeeCount", "selectedUnprocessedFeeEvent"], [1, "govuk-table__cell", "col-14", "whitespace-inherit"], [3, "ccdCaseNumber", "isTurnOff", "orderParty", "LOGGEDINUSERROLES"], [1, "govuk-grid-column-full", 3, "ngClass"], ["class", "govuk-grid-column-full", 4, "ngIf"], ["scope", "col", 1, "govuk-table__header", "col-24"], ["class", "govuk-table__cell  whitespace-inherit", 4, "ngIf"], [1, "govuk-table__cell", "of-visible"], ["href", "javascript:void(0)", 3, "click", 4, "ngIf"], ["colspan", "7", 1, "alignleft"], [1, "govuk-heading-l", "govuk-heading-lw"], ["scope", "col", 1, "govuk-table__header", "col-17"], ["class", "govuk-table", 3, "IS_BUTTON_ENABLE", "LEVEL", "ISTURNOFF", "ISSFENABLE", "PAYMENTSLENGTH", "PAYMENTREF", "FEE_RECORDS_EXISTS", "IS_OS_AMT_AVAILABLE", "getUnprocessedFeeCount", "selectedUnprocessedFeeEvent", 4, "ngIf"], [1, "govuk-table", 3, "IS_BUTTON_ENABLE", "LEVEL", "ISTURNOFF", "ISSFENABLE", "PAYMENTSLENGTH", "PAYMENTREF", "FEE_RECORDS_EXISTS", "IS_OS_AMT_AVAILABLE", "getUnprocessedFeeCount", "selectedUnprocessedFeeEvent"], [3, "ccdCaseNumber", "orderParty"], [3, "viewStatus", "orderRef", "orderStatus", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "paymentGroupList", "LOGGEDINUSERROLES", "ccdCaseNumber", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal", "isServiceRequest", "goToServiceRquestComponent"], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "fee", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "paymentGroupRef", "isFromServiceRequestPage", "payment", "ccdCaseNumber"], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "isFromServiceRequestPage", "payment", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "paymentGroupRef", "ccdCaseNumber"], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "payment", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "feeamount", "remission", "isFromServiceRequestPage", "ccdCaseNumber"], [1, "govuk-warning-text"], ["aria-hidden", "true", 1, "govuk-warning-text__icon"], [1, "govuk-warning-text__text"], [1, "govuk-warning-text__assistive"], [1, "govuk-button-grb"], ["novalidate", ""], ["type", "submit", 1, "button", "govuk-button--secondary", 3, "click"], ["type", "submit", 1, "button", 3, "disabled", "ngClass", "click"]], template: function CaseTransactionsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div")(1, "main");
            i0.ɵɵtemplate(2, CaseTransactionsComponent_ng_container_2_Template, 5, 4, "ng-container", 0);
            i0.ɵɵtemplate(3, CaseTransactionsComponent_ng_container_3_Template, 72, 36, "ng-container", 0);
            i0.ɵɵtemplate(4, CaseTransactionsComponent_ng_container_4_Template, 7, 5, "ng-container", 0);
            i0.ɵɵelement(5, "input", 1, 2);
            i0.ɵɵtemplate(7, CaseTransactionsComponent_ng_container_7_Template, 2, 14, "ng-container", 0);
            i0.ɵɵtemplate(8, CaseTransactionsComponent_ccpay_add_remission_8_Template, 1, 12, "ccpay-add-remission", 3);
            i0.ɵɵtemplate(9, CaseTransactionsComponent_ccpay_add_remission_9_Template, 1, 11, "ccpay-add-remission", 4);
            i0.ɵɵtemplate(10, CaseTransactionsComponent_ccpay_add_remission_10_Template, 1, 12, "ccpay-add-remission", 5);
            i0.ɵɵtemplate(11, CaseTransactionsComponent_ng_container_11_Template, 14, 2, "ng-container", 0);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "main1");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "main" && !ctx.isTurnOff && ctx.takePayment);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.takePayment && ctx.viewStatus === "main");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "order-full-view");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "addremission" && ctx.feeId);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "issuerefund" && ctx.payment);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "addrefundforremission" && ctx.payment);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "feeRemovalConfirmation");
        } }, dependencies: [i7.NgClass, i7.NgForOf, i7.NgIf, i8.ɵNgNoValidate, i8.NgControlStatusGroup, i8.NgForm, i9.UnprocessedPaymentsComponent, i10.AddRemissionComponent, i11.RefundStatusComponent, i12.ServiceRequestComponent, i7.LowerCasePipe, i7.CurrencyPipe, i7.DatePipe, i13.CcdHyphensPipe], styles: [".govuk-grid-column-full--gr[_ngcontent-%COMP%]{position:relative;margin-bottom:10px}.disable[_ngcontent-%COMP%]{text-decoration:none;cursor:default;color:#fff;background-color:gray;pointer-events:none}.govuk-grid__surplus-payments[_ngcontent-%COMP%]{margin:20px 0}.govuk-grid__surplus-payments[_ngcontent-%COMP%] > .govuk-grid-column-full[_ngcontent-%COMP%]{padding:0}.govuk-grid__surplus-payments-col1[_ngcontent-%COMP%]{margin-bottom:10px}.govuk-inset-text__no-border[_ngcontent-%COMP%]{border-left:0px}.govuk-hidetext[_ngcontent-%COMP%]{font-size:22px;padding-bottom:10px}.lowercase[_ngcontent-%COMP%]{text-transform:lowercase}.channel[_ngcontent-%COMP%]:first-letter{text-transform:uppercase}.govuk-heading-xl[_ngcontent-%COMP%]{font-size:48px;margin-bottom:1px}.govuk-section-break--visible[_ngcontent-%COMP%]{border-bottom:2px solid black}.totalpayments.govuk-table__row[_ngcontent-%COMP%]{border-bottom:2px solid black!important}.govuk-inset-text[_ngcontent-%COMP%]{margin-left:1em}.govuk-button[_ngcontent-%COMP%]{font-size:19px;margin-bottom:0!important}.groupamount.govuk-table__header[_ngcontent-%COMP%], .govuk-table__cell.govuk-table__cell--col6.govuk-table__custom--col6[_ngcontent-%COMP%]{text-align:right}.feeclass[_ngcontent-%COMP%]{padding-left:.7em}.align-center[_ngcontent-%COMP%]{text-align:center}details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{display:list-item}.case-transaction__color[_ngcontent-%COMP%]{color:#a71414;font-weight:700;text-align:center}.capitalize[_ngcontent-%COMP%]:first-letter{text-transform:uppercase}.govuk-inset-text__no-left-margin[_ngcontent-%COMP%]{margin-left:0;padding-left:0}.whitespace-inherit[_ngcontent-%COMP%]{white-space:inherit!important}.govuk-section-records-break[_ngcontent-%COMP%]{margin:10px;border-bottom:2px solid black!important}.exisitng-fees[_ngcontent-%COMP%]{margin-left:12px}.add-telephony-payment[_ngcontent-%COMP%]{margin-top:-2em;margin-left:-2em}.govuk-table__header--custom[_ngcontent-%COMP%]{text-align:center}.disable-link[_ngcontent-%COMP%]{cursor:default;pointer-events:none;color:#8e8c8c}.panel-no--style[_ngcontent-%COMP%]{border-left-style:none}.col-28[_ngcontent-%COMP%]{width:28%!important}.col-8[_ngcontent-%COMP%]{width:8%!important}.col-60[_ngcontent-%COMP%]{width:60%!important}.col-32[_ngcontent-%COMP%]{width:32%!important}.col-34[_ngcontent-%COMP%]{width:34%!important}.col-15[_ngcontent-%COMP%]{width:15%!important;padding-right:0!important;padding-left:0!important}.col-16[_ngcontent-%COMP%]{width:16%!important}.col-14[_ngcontent-%COMP%]{width:14%!important}.col-17[_ngcontent-%COMP%]{width:17%!important}.col-12[_ngcontent-%COMP%]{width:12%!important}.col-9[_ngcontent-%COMP%]{width:9%!important}.col-10[_ngcontent-%COMP%]{width:10%!important}.col-11[_ngcontent-%COMP%]{width:11%!important}.col-13[_ngcontent-%COMP%]{width:13%!important}.col-21[_ngcontent-%COMP%]{width:21%!important}.col-20[_ngcontent-%COMP%]{width:20%!important}.col-24[_ngcontent-%COMP%]{width:24%!important}.govuk-table__cell[_ngcontent-%COMP%], .govuk-table__header[_ngcontent-%COMP%]{padding:10px 10px 10px 0}.col-27[_ngcontent-%COMP%]{width:27%!important}td[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden!important}.col-19[_ngcontent-%COMP%]{width:19%!important;padding-left:0!important}.col-18[_ngcontent-%COMP%]{width:18%!important;padding-left:0!important;padding-right:0!important}.col-37[_ngcontent-%COMP%]{width:37%!important}.col-55[_ngcontent-%COMP%]{width:55%!important}.govuk-table[_ngcontent-%COMP%]{margin-bottom:1px}.hmcts-banner[_ngcontent-%COMP%] > .hmcts-banner__message[_ngcontent-%COMP%]{font-size:19px;line-height:1.25}.summary-table-font[_ngcontent-%COMP%]{font-size:36px}.order-class[_ngcontent-%COMP%]{padding-top:3em}.govuk-table__header[_ngcontent-%COMP%]:last-child{text-align:right}.govuk-table__cell[_ngcontent-%COMP%]:last-child{text-align:right}.govuk-grid-column-two-thirds[_ngcontent-%COMP%]{width:64%!important;padding:0!important}.govuk-heading-l[_ngcontent-%COMP%]{font-size:36px;margin-bottom:10px}.govuk-heading-lw[_ngcontent-%COMP%]{width:70%}.paymentrequest[_ngcontent-%COMP%]{margin-top:1em}.mar-17[_ngcontent-%COMP%]{margin-left:17px}.col-61[_ngcontent-%COMP%]{width:61px!important;padding:0!important}.error[_ngcontent-%COMP%]{width:960px;margin:auto}.summarypage[_ngcontent-%COMP%]{padding-left:36em;margin-top:2em}.summarypagealign[_ngcontent-%COMP%]{width:100%;text-align:right;margin-top:2em}.govuk-inset-text[_ngcontent-%COMP%]{font-size:2.1875rem}table[_ngcontent-%COMP%]{table-layout:fixed;width:100%}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{word-wrap:break-word}.totalPay[_ngcontent-%COMP%]{padding-right:14px;float:right;margin-top:2em}.govuk-back-link[_ngcontent-%COMP%]{font-size:1.5rem!important}.totalfees[_ngcontent-%COMP%]{float:right;margin-top:2em}.refundBtn[_ngcontent-%COMP%]{text-align:right;width:18%}.col-25[_ngcontent-%COMP%]{width:25%!important}.of-visible[_ngcontent-%COMP%]{overflow:visible!important}.col-51[_ngcontent-%COMP%]{width:51%!important}.alignright[_ngcontent-%COMP%]{text-align:right}.alignleft[_ngcontent-%COMP%]{text-align:left}.alignself[_ngcontent-%COMP%]{align-self:flex-end}.maxwidth[_ngcontent-%COMP%]{width:100%}.govuk-padding-btm[_ngcontent-%COMP%]{padding-bottom:50px}.govuk-margin-btm-20px[_ngcontent-%COMP%]{margin-bottom:20px}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseTransactionsComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-case-transactions', template: "<!-- <div class=\"govuk-width-container\"> -->\n  <!-- <main class=\"govuk-main-wrapper\"> -->\n<div>\n  <main>\n    <ng-container  *ngIf=\"viewStatus === 'main1'\">\n      <div *ngIf=\"viewStatus === 'main1'&& !isTurnOff && takePayment\">\n          <div   *ngIf=\"takePayment\" class=\"govuk-grid-row\">\n\n            <div class=\"govuk-grid-column-two-thirds\">\n              <h1 class=\"govuk-heading-xl\">Case transactions</h1>\n            </div>\n          </div>\n\n          <div   *ngIf=\"takePayment\" class=\"govuk-grid-row\">\n            <div *ngIf='!isExceptionRecord' class=\"govuk-grid-column-two-thirds govuk-!-padding-bottom-6 govuk-!-padding-top-6\">\n              <h3 class=\"heading-medium\">CCD reference:</h3>\n              <span> {{ ccdCaseNumber | ccdHyphens }}</span>\n            </div>\n\n            <div *ngIf='isExceptionRecord' class=\"govuk-grid-column-two-thirds govuk-!-padding-bottom-6 govuk-!-padding-top-6\">\n              <h3 class=\"heading-medium\">Exception reference:</h3>\n              <span> {{ ccdCaseNumber | ccdHyphens }}</span>\n            </div>\n            <div class=\"govuk-grid-column-full govuk-!-padding-bottom-3\">\n              <hr class=\"govuk-section-break govuk-section-break--visible\">\n              <table class=\"govuk-table\">\n                <thead class=\"govuk-table__head\">\n                  <tr class=\"govuk-table__row\">\n                    <td class=\"govuk-table__header\" scope=\"col\">Total payments</td>\n                    <td class=\"govuk-table__header\" scope=\"col\">Total remissions</td>\n                    <td class=\"govuk-table__header\" scope=\"col\">Amount due</td>\n                    <td class=\"govuk-table__header govuk-table__header--custom\" scope=\"col\" *ngIf=\"isBulkScanEnable\">Unallocated payments</td>\n                  </tr>\n                </thead>\n                <tbody class=\"govuk-table__body\">\n                  <tr class=\"totalpayments govuk-table__row\">\n                    <td class=\"govuk-table__cell summary-table-font\">{{ totalPayments | currency :'GBP':'symbol':'1.2-2' }}</td>\n                    <td class=\"govuk-table__cell summary-table-font\">{{ totalRemissions | currency :'GBP':'symbol':'1.2-2' }}</td>\n                    <td class=\"govuk-table__cell summary-table-font\">{{ clAmountDue | currency :'GBP':'symbol':'1.2-2'}}</td>\n                    <td class=\"govuk-table__cell case-transaction__color summary-table-font\" *ngIf=\"isBulkScanEnable\">{{unprocessedRecordCount}}</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n\n            <div class=\"govuk-grid-column-two-thirds\" *ngIf=\"takePayment\">\n              <button type=\"submit\" (click)=\"redirectToFeeSearchPage($event)\"\n                [disabled]=\"!isAddFeeBtnEnabled\"\n                [ngClass]='!isAddFeeBtnEnabled ? \"govuk-button govuk-button--secondary govuk-button--disabled govuk-!-margin-right-1\" : \"govuk-button govuk-button--secondary govuk-!-margin-right-1\"'>\n                Take telephony payment\n              </button>\n          </div>\n\n          </div>\n          <div class=\"govuk-grid-row\">\n\n          </div>\n          <div  *ngIf=\"takePayment\" class=\" govuk-!-margin-top-9\">\n\n            <div class=\"govuk-grid-row\">\n              <div class=\"govuk-grid-column-full\">\n                  <h3 class=\"heading-medium\">Fees</h3>\n              </div>\n              <div class=\"govuk-grid-column-full\">\n                <table class=\"govuk-table\">\n                  <thead class=\"govuk-table__head\">\n                  <tr class=\"govuk-table__row\">\n                    <td class=\"govuk-table__header\" scope=\"col\">Code</td>\n                    <td class=\"govuk-table__header\" scope=\"col\">Description</td>\n                    <td class=\"govuk-table__header\" scope=\"col\">Volume</td>\n                    <td class=\"govuk-table__header\" scope=\"col\">Fee amount</td>\n                    <td class=\"govuk-table__header\" scope=\"col\">Calculated amount</td>\n                    <td class=\"govuk-table__header\" scope=\"col\">Amount due</td>\n                    <td class=\"govuk-table__header\" scope=\"col\">Action</td>\n\n                  </tr>\n                  </thead>\n                  <tbody class=\"govuk-table__body\" *ngFor=\"let paymentGroup of paymentGroups;\">\n                    <tr class=\"govuk-table__row\" *ngFor=\"let fee of paymentGroup.fees; let i = index;\">\n                      <td class=\"govuk-table__cell\">\t{{fee.code}} </td>\n                      <td class=\"govuk-table__cell\">{{fee.description}}</td>\n                      <td class=\"govuk-table__cell\">{{fee.volume? fee.volume : '-'}}</td>\n                      <td class=\"govuk-table__cell\">{{ fee.net_amount | currency:'GBP':'symbol-narrow':'1.2-2' }}</td>\n                      <td class=\"govuk-table__cell\">{{fee.calculated_amount | currency:'GBP':'symbol-narrow':'1.2-2' }}</td>\n                      <td class=\"govuk-table__cell govuk-!-font-weight-bold\"  [attr.rowspan]=\"paymentGroup.fees.length\" *ngIf=\"paymentGroup.old && i==0\"> {{getGroupOutstandingAmount(paymentGroup)| currency:'GBP':'symbol-narrow':'1.2-2'}}* </td>\n                      <td class=\"govuk-table__cell\" *ngIf=\"!paymentGroup.old\"> {{calculateAmountDue(fee) | currency:'GBP':'symbol-narrow':'1.2-2'}} </td>\n                      <td class=\"govuk-table__cell\" *ngIf=\"!paymentGroup.old\">\n                        <a (click)=\"confirmRemoveFee(fee.id)\" [ngClass]='!isCheckAmountdueExist(fee.amount_due) || fee.remissions ? \"disable-link\" : \"\"'>Remove</a>\n                      </td>\n                      <td class=\"govuk-table__cell\" *ngIf=\"paymentGroup.old\">\n                        <a (click)=\"confirmRemoveFee(fee.id)\" [ngClass]='paymentGroup.payments?.length > 0 || paymentGroup.remissions?.length > 0 ? \"disable-link\" : \"\"'>Remove</a>\n                    </td>\n                    </tr>\n                  </tbody>\n                  <tbody class=\"govuk-table__body\" *ngIf=\"paymentGroups?.length === 0\">\n                    <tr class=\"govuk-table__row\" >\n                      <td class=\"govuk-table__cell\" colspan=\"7\">No fees recorded</td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n            </div>\n            <div class=\"hmcts-banner\" *ngIf=\"isHistoricGroupAvailable\">\n              <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\">\n                  <path d=\"M13.7,18.5h-2.4v-2.4h2.4V18.5z M12.5,13.7c-0.7,0-1.2-0.5-1.2-1.2V7.7c0-0.7,0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2v4.8\n                C13.7,13.2,13.2,13.7,12.5,13.7z M12.5,0.5c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S19.1,0.5,12.5,0.5z\"></path>\n              </svg>\n              <div class=\"hmcts-banner__message\">\n                <span class=\"hmcts-banner__assistive\">information</span>\n                * These fees have already been processed offline. Check the notes in CCD for more information.\n              </div>\n            </div>\n            <div class=\"panel panel-no--style\" *ngIf=\"allPayments?.length > 0 || remissions?.length > 0\">\n                <!-- payments -->\n                <h3 class=\"heading-medium\">Payments</h3>\n                  <table class=\"govuk-table\">\n                    <thead class=\"govuk-table__head\">\n                      <tr class=\"govuk-table__row\">\n                          <td class=\"govuk-table__header col-28\" scope=\"col\">Payment reference</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Date created</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Channel</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Method</td>\n                          <td class=\"govuk-table__header col-15\" scope=\"col\">Amount</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Allocation status</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Payment status</td>\n                        </tr>\n                    </thead>\n                    <tbody class=\"govuk-table__body\" *ngIf=\"allPayments?.length > 0\">\n                      <tr class=\"govuk-table__row\"  *ngFor=\"let payment of allPayments\">\n                          <td class=\"govuk-table__cell whitespace-inherit\">\n                            <a href=\"javascript:void(0)\" (click)=\"goToPayementView(payment.paymentGroupReference, payment.reference, payment.method)\">{{ payment.reference }}</a>\n                          </td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ payment.date_created | date:'dd MMM yyyy' }}</td>\n                          <td class=\"channel govuk-table__cell whitespace-inherit\">{{ payment.channel | lowercase }}</td>\n                          <td class=\"govuk-table__cell capitalize whitespace-inherit\">{{ payment.method | lowercase}}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ payment.amount | currency:'GBP':'symbol-narrow':'1.2-2' }}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\"> {{getAllocationStatus(payment)}}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ payment.status }}</td>\n                        </tr>\n                    </tbody>\n                    <tbody class=\"govuk-table__body\" *ngIf=\"allPayments?.length === 0\">\n                      <td class=\"govuk-table__cell\" colspan=\"7\">No payments recorded</td>\n                    </tbody>\n                  </table>\n\n                  <!-- remissions -->\n                  <h3 class=\"heading-medium\">Remissions</h3>\n                  <table class=\"govuk-table\">\n                    <thead class=\"govuk-table__head\">\n                      <tr class=\"govuk-table__row\">\n                          <td class=\"govuk-table__header\" scope=\"col\">Remission reference</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Date created</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Remission code</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Fee code</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Remission amount</td>\n                        </tr>\n                    </thead>\n                    <tbody class=\"govuk-table__body\" *ngIf=\"remissions?.length > 0\">\n                      <tr class=\"govuk-table__row\" *ngFor=\"let remission of remissions\">\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ remission.remission_reference }}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ remission.date_created | date:'dd MMM yyyy' }}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ remission.hwf_reference }}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ remission.fee_code }}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ remission.hwf_amount | currency:'GBP':'symbol-narrow':'1.2-2'}}</td>\n                        </tr>\n                    </tbody>\n                    <tbody class=\"govuk-table__body\" *ngIf=\"remissions?.length === 0\">\n                      <td class=\"govuk-table__cell\" colspan=\"5\">No remissions recorded</td>\n                    </tbody>\n                  </table>\n            </div>\n          </div>\n      </div>\n\n      <div  *ngIf=\"takePayment && isTurnOff\">\n      <div class=\"govuk-grid-row\">\n        <div class=\"govuk-grid-column-two-thirds\">\n          <h1 class=\"govuk-heading-xl\">Case transactions</h1>\n        </div>\n\n        <div  class=\"govuk-grid-column-one-third\" align=\"right\" >\n          <a [ngClass]=\"{ 'disable': !isAddFeeBtnEnabled} \" (click)=\"redirectToFeeSearchPage($event)\" class=\"button\">Add a new fee</a>\n        </div>\n      </div>\n\n      <div class=\"govuk-grid-row\">\n        <div class=\"govuk-grid-column-two-thirds govuk-!-padding-bottom-6\">\n          <h3 class=\"heading-medium\">CCD reference:</h3>\n          <span> {{ ccdCaseNumber | ccdHyphens }}</span>\n        </div>\n\n        <div class=\"govuk-grid-column-full govuk-!-padding-bottom-3\">\n          <hr class=\"govuk-section-break govuk-section-break--visible\">\n          <table class=\"govuk-table\">\n            <thead class=\"govuk-table__head\">\n              <tr class=\"govuk-table__row\">\n                <td class=\"govuk-table__header\" scope=\"col\">Total payments</td>\n                <td class=\"govuk-table__header\" scope=\"col\">Total remissions</td>\n                <td class=\"govuk-table__header\" scope=\"col\">Amount due</td>\n              </tr>\n            </thead>\n            <tbody class=\"govuk-table__body\">\n              <tr class=\"totalpayments govuk-table__row\">\n                <td class=\"govuk-table__cell\">{{ totalPayments | currency :'GBP':'symbol':'1.2-2' }}</td>\n                <td class=\"govuk-table__cell\">{{ totalRemissions | currency :'GBP':'symbol':'1.2-2' }}</td>\n                <td class=\"govuk-table__cell\">{{ (totalFees - totalRemissions) - totalPayments | currency :'GBP':'symbol':'1.2-2'}}</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n\n      <!-- No fees start -->\n      <div *ngIf=\"paymentGroups?.length === 0\">\n        <div class=\"govuk-grid-row\">\n          <div class=\"govuk-grid-column-full\">\n            <span class=\"heading-small\">Existing fees</span>\n          </div>\n\n          <div class=\"govuk-grid-column-full\">\n            <table class=\"govuk-table\">\n              <thead class=\"govuk-table__head\">\n              <tr class=\"govuk-table__row\">\n                <td class=\"govuk-table__header\" scope=\"col\">Code</td>\n                <td class=\"govuk-table__header\" scope=\"col\">Description</td>\n                <td class=\"govuk-table__header\" scope=\"col\">Volume</td>\n                <td class=\"govuk-table__header\" scope=\"col\">Fee amount</td>\n                <td class=\"govuk-table__header\" scope=\"col\">Calculated amount</td>\n                <td class=\"govuk-table__header\" scope=\"col\">Group amount outstanding</td>\n              </tr>\n              </thead>\n              <tbody class=\"govuk-table__body\">\n              <tr class=\"govuk-table__row\">\n                <td class=\"govuk-table__cell\" colspan=\"6\">No fees recorded</td>\n              </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n\n      <!-- No fees end -->\n\n      <div *ngFor=\"let paymentGroup of paymentGroups\">\n\n      <div class=\"govuk-grid-row\">\n        <div class=\"govuk-grid-column-full govuk-grid-column-full--gr\">\n          <span class=\"heading-medium\">Group reference: {{paymentGroup.payment_group_reference}}</span>\n        </div>\n      </div>\n        <div class=\"govuk-grid-row\">\n\n          <!--New Code start-->\n\n          <div class=\"govuk-grid-column-full\">\n            <span class=\"heading-small\">Exisiting fees</span>\n          </div>\n          <div class=feeclass>\n          <table class=\"govuk-table\">\n            <thead class=\"govuk-table__head\">\n            <tr class=\"govuk-table__row\">\n              <td class=\"govuk-table__header\" scope=\"col\">Code</td>\n              <td class=\"govuk-table__header\" scope=\"col\">Description</td>\n              <td class=\"govuk-table__header\" scope=\"col\">Volume</td>\n              <td class=\"govuk-table__header\" scope=\"col\">Fee amount</td>\n              <td class=\"govuk-table__header\" scope=\"col\">Calculated amount</td>\n              <td class=\"groupamount govuk-table__header\" scope=\"col\">Group amount outstanding</td>\n            </tr>\n            </thead>\n            <tbody class=\"govuk-table__body\" >\n            <tr class=\"govuk-table__row\"  *ngFor=\"let fee of paymentGroup.fees;  let i = index;\">\n              <td class=\"govuk-table__cell govuk-table__cell--col1\">{{fee.code}}</td>\n              <td class=\"govuk-table__cell govuk-table__cell--col2\"> {{fee.description}} </td>\n              <td class=\"govuk-table__cell govuk-table__cell--col3 align-center\"> {{fee.volume? fee.volume : '-'}} </td>\n              <td class=\"govuk-table__cell govuk-table__cell--col4\"> {{ fee.net_amount | currency:'GBP':'symbol-narrow':'1.2-2' }} </td>\n              <td class=\"govuk-table__cell govuk-table__cell--col5\"> {{fee.calculated_amount | currency:'GBP':'symbol-narrow':'1.2-2' }} </td>\n              <td class=\"govuk-table__cell govuk-table__cell--col6 govuk-table__custom--col6\" [attr.rowspan]=\"paymentGroup.fees.length\" *ngIf=\"i==0\">\n                {{getGroupOutstandingAmount(paymentGroup) | currency:'GBP':'symbol-narrow':'1.2-2' }} </td>\n            </tr>\n            </tbody>\n            <tbody class=\"govuk-table__body\" *ngIf=\"paymentGroup.fees.length==0\">\n            <td class=\"govuk-table__cell\" colspan=\"6\">No payments recorded</td>\n            </tbody>\n          </table>\n        </div>\n        </div>\n      <div class=\"govuk-inset-text govuk-inset-text__no-border\" *ngIf=\"paymentGroup.payments || paymentGroup.remissions\">\n        <details>\n          <summary class=\"govuk-hidetext\">\n          <span class=\"summary\">Allocated payments and remissions</span>\n          </summary>\n\n            <div class=\"panel panel-border-narrow\">\n                <!-- payments -->\n                <span class=\"heading-medium\">Payments</span>\n                  <table class=\"govuk-table\">\n                    <thead class=\"govuk-table__head\">\n                      <tr class=\"govuk-table__row\">\n                          <td class=\"govuk-table__header\" scope=\"col\">Payment reference</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Date created</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Channel</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Method</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Amount</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Allocation status</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Status</td>\n                        </tr>\n                    </thead>\n                    <tbody class=\"govuk-table__body\" *ngIf=\"paymentGroup.payments?.length > 0\">\n                      <tr class=\"govuk-table__row\"  *ngFor=\"let payment of paymentGroup.payments\">\n                          <td class=\"govuk-table__cell whitespace-inherit\">\n                            <a href=\"javascript:void(0)\" (click)=\"goToPayementView(paymentGroup.payment_group_reference, payment.reference, payment.method)\">{{ payment.reference }}</a>\n                          </td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ payment.date_created | date:'dd MMM yyyy' }}</td>\n                          <td class=\"channel govuk-table__cell whitespace-inherit\">{{ payment.channel | lowercase }}</td>\n                          <td class=\"govuk-table__cell capitalize whitespace-inherit\">{{ payment.method | lowercase}}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ payment.amount }}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\"> {{getAllocationStatus(payment)}}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ payment.status }}</td>\n                        </tr>\n                    </tbody>\n                    <tbody class=\"govuk-table__body\" *ngIf=\"paymentGroup.payments?.length === 0\">\n                      <td class=\"govuk-table__cell\" colspan=\"6\">No payments recorded</td>\n                    </tbody>\n                  </table>\n\n                  <!-- remissions -->\n                  <span class=\"heading-medium\">Remissions</span>\n                  <table class=\"govuk-table\">\n                    <thead class=\"govuk-table__head\">\n                      <tr class=\"govuk-table__row\">\n                          <td class=\"govuk-table__header\" scope=\"col\">Remission reference</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Date created</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Remission code</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Fee applied against</td>\n                          <td class=\"govuk-table__header\" scope=\"col\">Remission amount</td>\n                        </tr>\n                    </thead>\n                    <tbody class=\"govuk-table__body\" *ngIf=\"paymentGroup.remissions?.length > 0\">\n                      <tr class=\"govuk-table__row\" *ngFor=\"let remission of paymentGroup.remissions\">\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ remission.remission_reference }}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ remission.date_created | date:'dd MMM' }}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ remission.hwf_reference }}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ remission.fee_code }}</td>\n                          <td class=\"govuk-table__cell whitespace-inherit\">{{ remission.hwf_amount }}</td>\n                        </tr>\n                    </tbody>\n                    <tbody class=\"govuk-table__body\" *ngIf=\"paymentGroup.remissions?.length === 0\">\n                      <td class=\"govuk-table__cell\" colspan=\"5\">No remissions recorded</td>\n                    </tbody>\n                  </table>\n            </div>\n      </details>\n\n\n          <div *ngIf=\"takePayment\">\n              <button type=\"submit\" (click)=\"loadFeeSummaryPage(paymentGroup)\"\n                [disabled]=\"(getGroupOutstandingAmount(paymentGroup) <= 0 || isUnprocessedRecordSelected)\"\n                [ngClass]='(getGroupOutstandingAmount(paymentGroup) <= 0 || isUnprocessedRecordSelected) ? \"govuk-button govuk-button--secondary govuk-button--disabled govuk-!-margin-right-1\" : \"govuk-button govuk-button--secondary govuk-!-margin-right-1\"'>\n                  Add telephone payment\n              </button>\n          </div>\n        </div>\n      </div>\n        <ccpay-app-unprocessed-payments\n        *ngIf=\"isBulkScanEnable\"\n        [IS_BUTTON_ENABLE]=\"takePayment\"\n        [LEVEL]=\"5\"\n        [PAYMENTSLENGTH]=\"allPayments?.length\"\n        [PAYMENTREF]=\"paymentRef\"\n        [ISTURNOFF]=\"isTurnOff\"\n        [ISSFENABLE]=\"isStrategicFixEnable\"\n        [FEE_RECORDS_EXISTS]=\"isFeeRecordsExist\"\n        (getUnprocessedFeeCount) = \"getUnprocessedFeeCount($event)\"\n        [IS_OS_AMT_AVAILABLE]=\"isGrpOutstandingAmtPositive\"\n        (selectedUnprocessedFeeEvent) = \"selectedUnprocessedFeeEvent($event)\">\n      </ccpay-app-unprocessed-payments>\n      <div class=\"govuk-grid-row govuk-grid__surplus-payments\"  *ngIf=\"totalRefundAmount > 0 && takePayment\">\n        <div class=\"govuk-grid-column-full govuk-grid__surplus-payments-col1\">\n          <h3 class=\"heading-medium\">Surplus payments</h3>\n        </div>\n        <div class=\"govuk-grid-column-full\">\n          Total surplus payments received: {{totalRefundAmount | currency :'GBP':'symbol':'1.2-2'}}\n        </div>\n      </div>\n      </div>\n\n      <div  *ngIf=\"takePayment\">\n        <ccpay-app-unprocessed-payments\n        *ngIf=\"isBulkScanEnable && !takePayment\"\n        [IS_BUTTON_ENABLE]=\"takePayment\"\n        [LEVEL]=\"1\"\n        [ISTURNOFF]=\"isTurnOff\"\n        [ISSFENABLE]=\"isStrategicFixEnable\"\n        [FEE_RECORDS_EXISTS]=\"isFeeRecordsExist\"\n        [IS_OS_AMT_AVAILABLE]=\"isGrpOutstandingAmtPositive\"\n        (getUnprocessedFeeCount) = \"getUnprocessedFeeCount($event)\"\n        [PAYMENTSLENGTH]=\"allPayments?.length\"\n        [PAYMENTREF]=\"paymentRef\"\n        (selectedUnprocessedFeeEvent) = \"selectedUnprocessedFeeEvent($event)\">\n        </ccpay-app-unprocessed-payments>\n      </div>\n\n      <div *ngIf=\"!takePayment\" class=\"govuk-grid-row govuk-grid__surplus-payments\">\n\n        <div class=\"govuk-grid-column-full\">\n\n          <span class=\"heading-medium\">Payments</span>\n          <table class=\"govuk-table\">\n              <thead class=\"govuk-table__head\">\n                <tr class=\"govuk-table__row\">\n                    <td class=\"govuk-table__header col-13\" scope=\"col\">Status</td>\n                    <td class=\"govuk-table__header col-10\" scope=\"col\">Amount</td>\n                    <td class=\"govuk-table__header col-14\" scope=\"col\">Date allocated</td>\n                    <td class=\"govuk-table__header col-20\" scope=\"col\">Request reference</td>\n                    <td class=\"govuk-table__header col-9\" scope=\"col\"></td>\n                    <td class=\"govuk-table__header\" scope=\"col\"></td>\n                  </tr>\n              </thead>\n              <tbody class=\"govuk-table__body\" *ngIf=\"allPayments?.length > 0\">\n                <tr class=\"govuk-table__row\"  *ngFor=\"let payment of allPayments\">\n                    <td class=\"govuk-table__cell col-13 whitespace-inherit\">{{ payment.status }}</td>\n                    <td class=\"govuk-table__cell col-10 whitespace-inherit\">{{ payment.amount | currency :'GBP':'symbol':'1.2-2' }}</td>\n                    <td class=\"govuk-table__cell col-17 whitespace-inherit\">{{ payment.date_created | date:'dd MMM yyyy HH:mm:ss' }}</td>\n                    <td class=\"govuk-table__cell col-24 whitespace-inherit\">{{ payment.paymentGroupReference }}</td>\n                    <td class=\"govuk-table__cell col-13 whitespace-inherit\"></td>\n                    <td class=\"govuk-table__cell whitespace-inherit\">\n                        <a href=\"javascript:void(0)\" (click)=\"goToPayementView(payment.paymentGroupReference, payment.reference, payment.method)\">Review</a>\n                      </td>\n                  </tr>\n              </tbody>\n\n            </table>\n            <ccpay-app-unprocessed-payments class=\"govuk-table\"\n            *ngIf=\"isBulkScanEnable && !takePayment\"\n            [IS_BUTTON_ENABLE]=\"takePayment\"\n            [LEVEL]=\"2\"\n            [ISTURNOFF]=\"isTurnOff\"\n            [ISSFENABLE]=\"isStrategicFixEnable\"\n            [FEE_RECORDS_EXISTS]=\"isFeeRecordsExist\"\n            [IS_OS_AMT_AVAILABLE]=\"isGrpOutstandingAmtPositive\"\n            [PAYMENTSLENGTH]=\"allPayments?.length\"\n            [PAYMENTREF]=\"paymentRef\"\n            (getUnprocessedFeeCount) = \"getUnprocessedFeeCount($event)\"\n            (selectedUnprocessedFeeEvent) = \"selectedUnprocessedFeeEvent($event)\">\n        </ccpay-app-unprocessed-payments>\n        </div>\n      </div>\n    </ng-container>\n\n<!--Order Case Transactions Page-->\n   <ng-container *ngIf=\"viewStatus === 'main' && !isTurnOff && takePayment\">\n      <div>\n\n          <div>\n              <h1 class=\"govuk-grid-column-two-thirds govuk-heading-l govuk-!-margin-top-0\">Case transactions</h1>\n              <ng-container *ngIf='!isExceptionRecord' class=\" govuk-!-margin-bottom-6 alignself\">\n                 <b> Case reference: </b>{{ ccdCaseNumber | ccdHyphens }}\n              </ng-container>\n              <ng-container *ngIf='isExceptionRecord' class=\"govuk-!-margin-bottom-3 col-55 alignself\" >\n                  <b> Exception reference:</b>{{ ccdCaseNumber | ccdHyphens }}\n              </ng-container>\n              <div>\n              <table class=\"govuk-table\">\n                <thead class=\"govuk-table__head\">\n                  <tr class=\"govuk-table__row\">\n                    <td class=\"govuk-table__header col-25\" scope=\"col\">Total payments</td>\n                    <td class=\"govuk-table__header govuk-table__header--custom col-25\" scope=\"col\" *ngIf=\"isBulkScanEnable\">Unallocated payments</td>\n                    <td class=\"govuk-table__header col-25\" scope=\"col\">Total remissions</td>\n                    <td class=\"govuk-table__header col-20\" scope=\"col\">Amount due</td>\n                    <td class=\"govuk-table__header col-20\" scope=\"col\">Over payment</td>\n                  </tr>\n                </thead>\n                <tbody class=\"govuk-table__body\">\n                  <tr class=\"totalpayments govuk-table__row\">\n                    <td class=\"govuk-table__cell summary-table-font\">{{ totalPayments | currency :'GBP':'symbol':'1.2-2' }}</td>\n                    <td class=\"govuk-table__cell case-transaction__color summary-table-font\" *ngIf=\"isBulkScanEnable\">{{unprocessedRecordCount}}</td>\n\n                    <td class=\"govuk-table__cell summary-table-font\">{{ totalRemissions | currency :'GBP':'symbol':'1.2-2' }}</td>\n                    <td class=\"govuk-table__cell summary-table-font\">{{ clAmountDue | currency :'GBP':'symbol':'1.2-2'}}</td>\n                    <td class=\"govuk-table__cell summary-table-font\">{{ overPaymentAmount | currency :'GBP':'symbol':'1.2-2'}}</td>\n\n                     </tr>\n                </tbody>\n              </table>\n              </div>\n          </div>\n          <input #myInput type='hidden' class='iFrameDrivenImageValue' value='ORDERIDDETAILS'>\n\n            <!--Payment Request-->\n          <div class=\"paymentrequest\">\n              <span class=\"heading-medium\">Service requests</span>\n              <ng-container>\n              <table class=\"govuk-table\">\n                  <thead class=\"govuk-table__head\">\n                  <tr class=\"govuk-table__row\">\n                    <td class=\"govuk-table__header  col-14\" scope=\"col\">Status</td>\n                    <td class=\"govuk-table__header  col-10\" scope=\"col\">Amount</td>\n                    <td class=\"govuk-table__header  col-18\" scope=\"col\">Party</td>\n                    <td class=\"govuk-table__header  col-21\" scope=\"col\">Request reference</td>\n                    <td class=\"govuk-table__header  col-9\" scope=\"col\"></td>\n                    <td class=\"govuk-table__header col\" scope=\"col\"></td>\n                  </tr>\n                  </thead>\n                  <tbody class=\"govuk-table__body\"  *ngIf=\"orderLevelFees?.length > 0\">\n                    <tr *ngFor=\"let orderRef of orderLevelFees;let i = index;\">\n                      <td class=\"govuk-table__cell whitespace-inherit\">{{orderRef.orderStatus}}</td>\n                      <td class=\"govuk-table__cell whitespace-inherit\">{{ orderRef.orderTotalFees | currency :'GBP':'symbol':'1.2-2' }}</td>\n                      <td *ngIf=\"cpoDetails !== null\" class=\"govuk-table__cell whitespace-inherit\">{{cpoDetails['responsibleParty']}}</td>\n                      <td *ngIf=\"cpoDetails === null\" class=\"govuk-table__cell whitespace-inherit\"></td>\n                      <td class=\"govuk-table__cell whitespace-inherit\">{{orderRef.orderRefId}}</td>\n                      <td class=\"govuk-table__cell\">\n                              <a href=\"javascript:void(0)\" (click)=\"goToOrderViewDetailSection(orderRef)\">Review</a>\n                      </td>\n                      <td  class=\"alignright\">\n\n                        <button type=\"submit\" (click)=\"redirectToOrderFeeSearchPage($event,orderRef)\"\n                        [disabled]=\"!orderRef.orderAddBtnEnable\"\n                        [ngClass]='!orderRef.orderAddBtnEnable ? \"govuk-button govuk-button--secondary govuk-button--disabled govuk-!-margin-right-1\" : \"govuk-button govuk-button--secondary govuk-!-margin-right-1\"'>\n                        Take telephony payment\n                      </button></td>\n                    </tr>\n                  </tbody>\n                  <tbody class=\"govuk-table__body alignleft\" *ngIf=\"orderLevelFees?.length === 0\">\n                    <td colspan=\"6\">No service requests on this case.</td>\n                  </tbody>\n              </table>\n            </ng-container>\n              <!-- <ng-container *ngIf=\"orderLevelFees?.length === 0\">\n                  <br/>No service requests on this case.<br/>\n              </ng-container> -->\n              <span>\n                  <br/>\n                  <a (click)=\"redirectToFeeSearchPage($event)\"\n                    [class.disable-link]=\"!isAddFeeBtnEnabled\">Create service request and pay</a><br/>\n            </span>\n          </div>\n          <div>\n              <span class=\"heading-medium\"><br/>Payments</span>\n              <ccpay-app-unprocessed-payments\n              *ngIf=\"isBulkScanEnable\"\n              [IS_BUTTON_ENABLE]=\"takePayment\"\n              [LEVEL]=\"3\"\n              [PAYMENTSLENGTH]=\"allPayments?.length\"\n              [ISTURNOFF]=\"isTurnOff\"\n              [ISSFENABLE]=\"isStrategicFixEnable\"\n              [PAYMENTREF]=\"paymentRef\"\n              [FEE_RECORDS_EXISTS]=\"isFeeRecordsExist\"\n              (getUnprocessedFeeCount) = \"getUnprocessedFeeCount($event)\"\n              [IS_OS_AMT_AVAILABLE]=\"isGrpOutstandingAmtPositive\"\n              (selectedUnprocessedFeeEvent) = \"selectedUnprocessedFeeEvent($event)\">\n               </ccpay-app-unprocessed-payments>\n\n              <ng-container>\n              <table class=\"govuk-table\">\n                  <thead class=\"govuk-table__head\">\n                  </thead>\n                  <tbody class=\"govuk-table__body\" *ngIf=\"allPayments?.length > 0\">\n                    <tr class=\"govuk-table__row\"  *ngFor=\"let payment of allPayments\">\n                        <td class=\"govuk-table__cell col-14 whitespace-inherit\">{{ payment.status }}</td>\n                        <td class=\"govuk-table__cell col-10 whitespace-inherit\">{{ payment.amount | currency :'GBP':'symbol':'1.2-2' }}</td>\n                        <td class=\"govuk-table__cell col-17 whitespace-inherit\">{{ payment.date_created | date:'dd MMM yyyy' }}</td>\n                        <td class=\"govuk-table__cell col-24 whitespace-inherit\">{{ payment.paymentGroupReference }}</td>\n                        <td class=\"govuk-table__cell col-13 whitespace-inherit\"></td>\n                        <td class=\"govuk-table__cell whitespace-inherit\">\n                            <a href=\"javascript:void(0)\" (click)=\"goToPayementView(payment.paymentGroupReference, payment.reference, payment.method)\">Review</a>\n                          </td>\n                      </tr>\n                  </tbody>\n\n                  <tbody class=\"govuk-table__body\" *ngIf=\"allPayments?.length === 0 && unprocessedRecordCount <= 0\">\n                    <td colspan=\"6\">No payments recorded</td>\n                  </tbody>\n                </table>\n\n              </ng-container>\n\n          </div>\n          <div *ngIf=\"!check4AllowedRoles2AccessPBApayment()\">\n              <span class=\"heading-medium\"><br/>Refunds</span>\n              <ccpay-refund-status\n              [ccdCaseNumber]=\"ccdCaseNumber\"\n              [isTurnOff]=\"isTurnOff\"\n              [orderParty]=\"orderParty\"\n              [LOGGEDINUSERROLES]=\"LOGGEDINUSERROLES\"\n              ></ccpay-refund-status>\n          </div>\n      </div>\n   </ng-container>\n\n   <ng-container *ngIf=\"!takePayment && viewStatus === 'main'\">\n      <div  class=\"govuk-grid-column-full\" [ngClass]='serviceRequestValue!== \"false\" ? \"govuk-margin-btm-20px\" : \"\"'>\n        <!-- <span *ngIf=\"serviceRequestValue === 'false'\" class=\"heading-medium\">Service requests</span> -->\n        <ng-container *ngIf=\"!(orderLevelFees?.length === 0 && !isAnyFeeGroupAvilable) && serviceRequestValue !== 'false' \">\n          <table class=\"govuk-table\">\n              <thead class=\"govuk-table__head\">\n              <tr class=\"govuk-table__row\">\n                <td class=\"govuk-table__header col-14\" scope=\"col\">Status</td>\n                <td class=\"govuk-table__header col-18\" scope=\"col\">Amount</td>\n                <td class=\"govuk-table__header col-18\" scope=\"col\">Party</td>\n                <td class=\"govuk-table__header col-24\" scope=\"col\">Request reference\t</td>\n                <td class=\"govuk-table__header col-9\" scope=\"col\"></td>\n                <td class=\"govuk-table__header\" scope=\"col\"></td>\n              </tr>\n              </thead>\n              <tbody class=\"govuk-table__body\" *ngIf=\"orderLevelFees?.length > 0\">\n                <tr class=\"govuk-table__row\"  *ngFor=\"let orderRef of orderLevelFees;let i = index;\">\n                  <td class=\"govuk-table__cell whitespace-inherit\">{{orderRef.orderStatus}}</td>\n                  <td class=\"govuk-table__cell whitespace-inherit\">{{orderRef.orderTotalFees | currency :'GBP':'symbol':'1.2-2'}}</td>\n                  <td *ngIf=\"cpoDetails !== null\" class=\"govuk-table__cell  whitespace-inherit\">{{cpoDetails['responsibleParty']}}</td>\n                  <td *ngIf=\"cpoDetails === null\" class=\"govuk-table__cell  whitespace-inherit\"></td>\n                  <td class=\"govuk-table__cell whitespace-inherit\">{{orderRef.orderRefId}}</td>\n                  <td class=\"govuk-table__cell of-visible\"> <a href=\"javascript:void(0)\" (click)=\"loadPBAAccountPage(orderRef)\" *ngIf=\"serviceRequestValue !== 'false' && check4AllowedRoles2AccessPBApayment() && orderRef.orderStatus === 'Not paid'\"> Pay now</a></td>\n                  <td class=\"govuk-table__cell\">\n                      <a href=\"javascript:void(0)\" (click)=\"goToOrderViewDetailSection(orderRef)\">Review</a>\n                </td>\n                </tr>\n              </tbody>\n              <tbody class=\"govuk-table__body\" *ngIf=\"orderLevelFees?.length === 0 && serviceRequestValue === 'false'\">\n                <tr class=\"govuk-table__row\" >\n                  <td class=\"alignleft\" colspan=\"7\">No service requests on this case.</td>\n                </tr>\n              </tbody>\n          </table>\n        </ng-container>\n        <ng-container *ngIf=\"orderLevelFees?.length === 0 && serviceRequestValue !== 'false' && !isAnyFeeGroupAvilable\">\n          <h1 class=\"govuk-heading-l govuk-heading-lw\">If you are expecting to pay and are not able to see a service request,</h1>\n          <p>please refresh and try in some time.</p>\n        </ng-container>\n    <!-- </div> -->\n        </div>\n        <div class=\"govuk-grid-column-full\">\n            <div  *ngIf=\"serviceRequestValue === 'false'\">\n            <span class=\"heading-medium\"><br/>Payments</span>\n            <ng-container >\n              <table class=\"govuk-table\">\n              <thead class=\"govuk-table__head\">\n                <tr class=\"govuk-table__row\">\n                    <td class=\"govuk-table__header col-14\" scope=\"col\">Status</td>\n                    <td class=\"govuk-table__header col-10\" scope=\"col\">Amount</td>\n                    <td class=\"govuk-table__header col-17\" scope=\"col\">Date</td>\n                    <td class=\"govuk-table__header col-24\" scope=\"col\">Payment reference</td>\n                    <td class=\"govuk-table__header col-13\" scope=\"col\"></td>\n                    <td class=\"govuk-table__header\" scope=\"col\"></td>\n                  </tr>\n              </thead>\n              <tbody class=\"govuk-table__body\" *ngIf=\"allPayments?.length > 0\">\n                <tr class=\"govuk-table__row\"  *ngFor=\"let payment of allPayments\">\n                    <td class=\"govuk-table__cell whitespace-inherit\">{{ payment.status }}</td>\n                    <td class=\"govuk-table__cell whitespace-inherit\">{{ payment.amount | currency :'GBP':'symbol':'1.2-2' }}</td>\n                    <td class=\"govuk-table__cell whitespace-inherit\">{{ payment.date_created | date:'dd MMM yyyy' }}</td>\n                    <td class=\"govuk-table__cell whitespace-inherit\">{{ payment?.reference }}</td>\n                    <td class=\"govuk-table__cell whitespace-inherit\"></td>\n                    <td class=\"govuk-table__cell whitespace-inherit\">\n                        <a href=\"javascript:void(0)\" (click)=\"goToPayementView(payment.paymentGroupReference, payment.reference, payment.method)\">Review</a>\n                      </td>\n                  </tr>\n              </tbody>\n\n              <tbody class=\"govuk-table__body\" *ngIf=\"allPayments?.length === 0\">\n                <td colspan=\"6\">No payments recorded</td>\n              </tbody>\n              </table>\n              <ccpay-app-unprocessed-payments class=\"govuk-table\"\n            *ngIf=\"isBulkScanEnable && !takePayment\"\n            [IS_BUTTON_ENABLE]=\"takePayment\"\n            [LEVEL]=\"4\"\n            [ISTURNOFF]=\"isTurnOff\"\n            [ISSFENABLE]=\"isStrategicFixEnable\"\n            [PAYMENTSLENGTH]=\"allPayments?.length\"\n            [PAYMENTREF]=\"paymentRef\"\n            (getUnprocessedFeeCount) = \"getUnprocessedFeeCount($event)\"\n            [FEE_RECORDS_EXISTS]=\"isAnyFeeGroupAvilable\"\n            [IS_OS_AMT_AVAILABLE]=\"isGrpOutstandingAmtPositive\"\n            (selectedUnprocessedFeeEvent) = \"selectedUnprocessedFeeEvent($event)\">\n              </ccpay-app-unprocessed-payments>\n            </ng-container>\n\n          </div>\n        </div>\n        <div class=\"govuk-grid-column-full\" *ngIf=\"!check4AllowedRoles2AccessPBApayment()\">\n            <span class=\"heading-medium\"><br/>Refunds</span>\n            <ccpay-refund-status\n            [ccdCaseNumber]=\"ccdCaseNumber\"\n            [orderParty] =\"orderParty\"\n             ></ccpay-refund-status>\n        </div>\n\n   </ng-container>\n\n\n<input #myInput type='hidden' class='iFrameDrivenImageValue' value='FEEREMOVALCONFIRMATION_2'>\n\n<!-- Order Full View Details-->\n<ng-container *ngIf=\"viewStatus === 'order-full-view'\">\n  <ccpay-service-request\n  [viewStatus] = \"viewStatus\"\n  [orderRef] = \"orderRef\"\n  [orderStatus] = \"orderStatus\"\n  [orderCreated] = \"orderCreated\"\n  [orderParty] = \"orderParty\"\n  [orderCCDEvent] = \"orderCCDEvent\"\n  [orderDetail] = \"orderDetail\"\n  [paymentGroupList] = \"paymentGroups\"\n  [LOGGEDINUSERROLES] = \"LOGGEDINUSERROLES\"\n  [ccdCaseNumber] = \"ccdCaseNumber\"\n  [orderFeesTotal] = \"orderFeesTotal\"\n  [orderTotalPayments] = \"orderTotalPayments\"\n  [orderRemissionTotal] = \"orderRemissionTotal\"\n  [isServiceRequest] = \"serviceRequestValue\"\n  (goToServiceRquestComponent) = \"goToServiceRequestPage()\"\n  ></ccpay-service-request>\n\n</ng-container>\n<ccpay-add-remission *ngIf=\"viewStatus === 'addremission' && feeId\"\n[isTurnOff]=\"isTurnOff\"\n[isStrategicFixEnable]=\"isStrategicFixEnable\"\n[viewCompStatus]= \"viewStatus\"\n[fee]=\"feeId\"\n[orderStatus] =\"orderStatus\"\n[paidAmount]= \"orderTotalPayments\"\n[isRefundRemission]=\"isRefundRemission\"\n[caseType]=\"caseType\"\n[paymentGroupRef]=\"orderRef\"\n[isFromServiceRequestPage] = \"true\"\n[payment] = \"payment\"\n[ccdCaseNumber]=\"ccdCaseNumber\"></ccpay-add-remission>\n\n<ccpay-add-remission *ngIf=\"viewStatus === 'issuerefund' && payment\"\n[isTurnOff]=\"isTurnOff\"\n[isStrategicFixEnable]=\"isStrategicFixEnable\"\n[viewCompStatus]= \"viewStatus\"\n[isFromServiceRequestPage] = \"true\"\n[payment]=\"payment\"\n[orderStatus] =\"orderStatus\"\n[paidAmount]= \"orderTotalPayments\"\n[isRefundRemission]=\"isRefundRemission\"\n[caseType]=\"caseType\"\n[paymentGroupRef]=\"orderRef\"\n[ccdCaseNumber]=\"ccdCaseNumber\"></ccpay-add-remission>\n<ccpay-add-remission *ngIf=\"viewStatus === 'addrefundforremission' && payment\"\n[isTurnOff]=\"isTurnOff\"\n[isStrategicFixEnable]=\"isStrategicFixEnable\"\n[viewCompStatus]= \"viewStatus\"\n[payment]=\"payment\"\n[orderStatus] =\"orderStatus\"\n[paidAmount]= \"orderTotalPayments\"\n[isRefundRemission]=\"isRefundRemission\"\n[caseType]=\"caseType\"\n[feeamount]=\"remissionFeeAmt\"\n[remission] = \"remissions\"\n[isFromServiceRequestPage]=\"true\"\n[ccdCaseNumber]=\"ccdCaseNumber\"></ccpay-add-remission>\n\n<ng-container *ngIf=\"viewStatus === 'feeRemovalConfirmation'\">\n  <div class=\"govuk-warning-text\">\n    <span class=\"govuk-warning-text__icon\" aria-hidden=\"true\">!</span>\n    <strong class=\"govuk-warning-text__text\">\n      <span class=\"govuk-warning-text__assistive\">Warning</span>\n      Are you sure you want to delete this fee?\n    </strong>\n  </div>\n  <div class=\"govuk-button-grb\">\n    <form novalidate>\n      <button type=\"submit\" class=\"button govuk-button--secondary\" (click)=\"cancelRemoval()\">\n        Cancel\n      </button>\n      <button type=\"submit\" class=\"button\"\n      [disabled]=\"isRemoveBtnDisabled\"\n      [ngClass]='isRemoveBtnDisabled ? \"button button--disabled govuk-!-margin-right-1\" : \"button govuk-!-margin-right-1\"'\n      (click)=\"removeFee(feeId)\">\n        Remove\n      </button>\n    </form>\n  </div>\n</ng-container>\n</main>\n</div>\n<!-- </main> -->\n<!-- </div class=\"govuk-width-container\"> -->\n", styles: [".govuk-grid-column-full--gr{position:relative;margin-bottom:10px}.disable{text-decoration:none;cursor:default;color:#fff;background-color:gray;pointer-events:none}.govuk-grid__surplus-payments{margin:20px 0}.govuk-grid__surplus-payments>.govuk-grid-column-full{padding:0}.govuk-grid__surplus-payments-col1{margin-bottom:10px}.govuk-inset-text__no-border{border-left:0px}.govuk-hidetext{font-size:22px;padding-bottom:10px}.lowercase{text-transform:lowercase}.channel:first-letter{text-transform:uppercase}.govuk-heading-xl{font-size:48px;margin-bottom:1px}.govuk-section-break--visible{border-bottom:2px solid black}.totalpayments.govuk-table__row{border-bottom:2px solid black!important}.govuk-inset-text{margin-left:1em}.govuk-button{font-size:19px;margin-bottom:0!important}.groupamount.govuk-table__header,.govuk-table__cell.govuk-table__cell--col6.govuk-table__custom--col6{text-align:right}.feeclass{padding-left:.7em}.align-center{text-align:center}details summary{display:list-item}.case-transaction__color{color:#a71414;font-weight:700;text-align:center}.capitalize:first-letter{text-transform:uppercase}.govuk-inset-text__no-left-margin{margin-left:0;padding-left:0}.whitespace-inherit{white-space:inherit!important}.govuk-section-records-break{margin:10px;border-bottom:2px solid black!important}.exisitng-fees{margin-left:12px}.add-telephony-payment{margin-top:-2em;margin-left:-2em}.govuk-table__header--custom{text-align:center}.disable-link{cursor:default;pointer-events:none;color:#8e8c8c}.panel-no--style{border-left-style:none}.col-28{width:28%!important}.col-8{width:8%!important}.col-60{width:60%!important}.col-32{width:32%!important}.col-34{width:34%!important}.col-15{width:15%!important;padding-right:0!important;padding-left:0!important}.col-16{width:16%!important}.col-14{width:14%!important}.col-17{width:17%!important}.col-12{width:12%!important}.col-9{width:9%!important}.col-10{width:10%!important}.col-11{width:11%!important}.col-13{width:13%!important}.col-21{width:21%!important}.col-20{width:20%!important}.col-24{width:24%!important}.govuk-table__cell,.govuk-table__header{padding:10px 10px 10px 0}.col-27{width:27%!important}td{white-space:nowrap;overflow:hidden!important}.col-19{width:19%!important;padding-left:0!important}.col-18{width:18%!important;padding-left:0!important;padding-right:0!important}.col-37{width:37%!important}.col-55{width:55%!important}.govuk-table{margin-bottom:1px}.hmcts-banner>.hmcts-banner__message{font-size:19px;line-height:1.25}.summary-table-font{font-size:36px}.order-class{padding-top:3em}.govuk-table__header:last-child{text-align:right}.govuk-table__cell:last-child{text-align:right}.govuk-grid-column-two-thirds{width:64%!important;padding:0!important}.govuk-heading-l{font-size:36px;margin-bottom:10px}.govuk-heading-lw{width:70%}.paymentrequest{margin-top:1em}.mar-17{margin-left:17px}.col-61{width:61px!important;padding:0!important}.error{width:960px;margin:auto}.summarypage{padding-left:36em;margin-top:2em}.summarypagealign{width:100%;text-align:right;margin-top:2em}.govuk-inset-text{font-size:2.1875rem}table{table-layout:fixed;width:100%}th,td{word-wrap:break-word}.totalPay{padding-right:14px;float:right;margin-top:2em}.govuk-back-link{font-size:1.5rem!important}.totalfees{float:right;margin-top:2em}.refundBtn{text-align:right;width:18%}.col-25{width:25%!important}.of-visible{overflow:visible!important}.col-51{width:51%!important}.alignright{text-align:right}.alignleft{text-align:left}.alignself{align-self:flex-end}.maxwidth{width:100%}.govuk-padding-btm{padding-bottom:50px}.govuk-margin-btm-20px{margin-bottom:20px}\n"] }]
    }], function () { return [{ type: i1.Router }, { type: i2.PaymentViewService }, { type: i3.BulkScaningPaymentService }, { type: i4.CaseTransactionsService }, { type: i5.PaymentLibComponent }, { type: i6.OrderslistService }]; }, { LOGGEDINUSERROLES: [{
            type: Input,
            args: ['LOGGEDINUSERROLES']
        }], isTakePayment: [{
            type: Input
        }], isFromServiceRequestPage: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS10cmFuc2FjdGlvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9jb21wb25lbnRzL2Nhc2UtdHJhbnNhY3Rpb25zL2Nhc2UtdHJhbnNhY3Rpb25zLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9jYXNlLXRyYW5zYWN0aW9ucy9jYXNlLXRyYW5zYWN0aW9ucy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUNyRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUM3RyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQU10RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7SUNOL0IsOEJBQWtELGNBQUEsYUFBQTtJQUdqQixpQ0FBaUI7SUFBQSxpQkFBSyxFQUFBLEVBQUE7OztJQUtyRCwrQkFBb0gsYUFBQTtJQUN2Riw4QkFBYztJQUFBLGlCQUFLO0lBQzlDLDRCQUFNO0lBQUMsWUFBZ0M7O0lBQUEsaUJBQU8sRUFBQTs7O0lBQXZDLGVBQWdDO0lBQWhDLDJFQUFnQzs7O0lBR3pDLCtCQUFtSCxhQUFBO0lBQ3RGLG9DQUFvQjtJQUFBLGlCQUFLO0lBQ3BELDRCQUFNO0lBQUMsWUFBZ0M7O0lBQUEsaUJB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QWEsQ0FBQztJQUNwRCxDQUFDO21GQWwwQlUseUJBQXlCOzZEQUF6Qix5QkFBeUI7WUNuQnRDLDJCQUFLLFdBQUE7WUFFRCw0RkE0YmU7WUFHaEIsOEZBeUllO1lBRWYsNEZBa0dlO1lBR2xCLDhCQUE4RjtZQUc5Riw2RkFtQmU7WUFDZiwyR0FZc0Q7WUFFdEQsMkdBV3NEO1lBQ3RELDZHQVlzRDtZQUV0RCwrRkFxQmU7WUFDZixpQkFBTyxFQUFBOztZQXB3QmEsZUFBNEI7WUFBNUIsaURBQTRCO1lBK2I5QixlQUF3RDtZQUF4RCxxRkFBd0Q7WUEySXhELGVBQTJDO1lBQTNDLG9FQUEyQztZQXdHOUMsZUFBc0M7WUFBdEMsMkRBQXNDO1lBb0IvQixlQUE0QztZQUE1QyxxRUFBNEM7WUFjNUMsZUFBNkM7WUFBN0Msc0VBQTZDO1lBWTdDLGVBQXVEO1lBQXZELGdGQUF1RDtZQWM5RCxlQUE2QztZQUE3QyxrRUFBNkM7Ozt1RkQ3dEIvQyx5QkFBeUI7Y0FMckMsU0FBUzsyQkFDRSx5QkFBeUI7ME9BS1AsaUJBQWlCO2tCQUE1QyxLQUFLO21CQUFDLG1CQUFtQjtZQUNqQixhQUFhO2tCQUFyQixLQUFLO1lBQ0csd0JBQXdCO2tCQUFoQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXltZW50TGliQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcGF5bWVudC1saWIuY29tcG9uZW50JztcbmltcG9ydCB7IElQYXltZW50R3JvdXAgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lQYXltZW50R3JvdXAnO1xuaW1wb3J0IHsgQ2FzZVRyYW5zYWN0aW9uc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jYXNlLXRyYW5zYWN0aW9ucy9jYXNlLXRyYW5zYWN0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IEJ1bGtTY2FuaW5nUGF5bWVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9idWxrLXNjYW5pbmctcGF5bWVudC9idWxrLXNjYW5pbmctcGF5bWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IFBheW1lbnRWaWV3U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BheW1lbnQtdmlldy9wYXltZW50LXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBPcmRlcnNsaXN0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29yZGVyc2xpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBJRmVlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JRmVlJztcbmltcG9ydCB7IElQYXltZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUGF5bWVudCc7XG5pbXBvcnQgeyBJUmVtaXNzaW9uIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUmVtaXNzaW9uJztcbmltcG9ydCB7IElQYXltZW50VmlldyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVBheW1lbnRWaWV3JztcbmltcG9ydCB7IElPcmRlclJlZmVyZW5jZUZlZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSU9yZGVyUmVmZXJlbmNlRmVlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmNvbnN0IEJTX0VOQUJMRV9GTEFHID0gJ2J1bGstc2Nhbi1lbmFibGluZy1mZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjcGF5LWNhc2UtdHJhbnNhY3Rpb25zJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhc2UtdHJhbnNhY3Rpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FzZS10cmFuc2FjdGlvbnMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhc2VUcmFuc2FjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoJ0xPR0dFRElOVVNFUlJPTEVTJykgTE9HR0VESU5VU0VSUk9MRVM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBpc1Rha2VQYXltZW50OiBib29sZWFuO1xuICBASW5wdXQoKSBpc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2U6IGJvb2xlYW47XG4gIHRha2VQYXltZW50OiBib29sZWFuO1xuICBjY2RDYXNlTnVtYmVyOiBzdHJpbmc7XG4gIGV4Y1JlZmVyZW5jZTogc3RyaW5nO1xuICBwYXltZW50R3JvdXBzOiBhbnlbXSA9IFtdO1xuICBwYXltZW50czogSVBheW1lbnRbXSA9IFtdO1xuICBub25QYXltZW50czogSVBheW1lbnRbXSA9IFtdO1xuICBhbGxQYXltZW50czogSVBheW1lbnRbXSA9IFtdO1xuICByZW1pc3Npb25zOiBJUmVtaXNzaW9uW10gPSBbXTtcbiAgZmVlczogSUZlZVtdID0gW107XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICB0b3RhbEZlZXM6IG51bWJlcjtcbiAgdG90YWxQYXltZW50czogbnVtYmVyID0gMDtcbiAgdG90YWxOb25PZmZQYXltZW50czogbnVtYmVyO1xuICB0b3RhbFJlbWlzc2lvbnM6IG51bWJlciA9IDA7XG4gIHNlbGVjdGVkT3B0aW9uOiBzdHJpbmc7XG4gIGRjbk51bWJlcjogc3RyaW5nO1xuICBwYXltZW50UmVmOiBzdHJpbmc7XG4gIGlzVHVybk9mZjogYm9vbGVhbjtcbiAgaXNSZWZ1bmRSZW1pc3Npb246IGJvb2xlYW4gPSB0cnVlO1xuICBpc1N0cmF0ZWdpY0ZpeEVuYWJsZTogYm9vbGVhbjtcbiAgaXNBZGRGZWVCdG5FbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgaXNFeGNlcHRpb25SZWNvcmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNVbnByb2Nlc3NlZFJlY29yZFNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGV4Y2VwdGlvblJlY29yZFJlZmVyZW5jZTogc3RyaW5nO1xuICBpc0FueUZlZUdyb3VwQXZpbGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICBpc0hpc3RvcmljR3JvdXBBdmFpbGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNCdWxrU2NhbkVuYWJsZTtcbiAgaXNSZW1pc3Npb25zTWF0Y2g6IGJvb2xlYW47XG4gIHZpZXdTdGF0dXMgPSAnbWFpbic7XG4gIGlzUmVtb3ZlQnRuRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZmVlSWQ6IElGZWU7XG4gIGNsQW1vdW50RHVlOiBudW1iZXIgPSAwO1xuICBvdmVyUGF5bWVudEFtb3VudDogbnVtYmVyID0gMDtcbiAgdW5wcm9jZXNzZWRSZWNvcmRDb3VudDogbnVtYmVyO1xuICBpc0ZlZVJlY29yZHNFeGlzdDogYm9vbGVhbiA9IGZhbHNlO1xuICBpc0dycE91dHN0YW5kaW5nQW10UG9zaXRpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdG90YWxSZWZ1bmRBbW91bnQ6IG51bWJlcjtcbiAgY2FzZVR5cGU6IFN0cmluZztcbiAgLy8gbHNDY2ROdW1iZXI6IGFueSA9IGxzLmdldDxhbnk+KCdjY2ROdW1iZXInKTtcbiAgcGF5bWVudDogSVBheW1lbnQ7XG4gIHBheW1lbnRHcm91cDogSVBheW1lbnRHcm91cDtcbiAgcGF5bWVudFZpZXc6IElQYXltZW50VmlldztcblxuICAvL09yZGVyIGNoYW5nZXNcbiAgb3JkZXJEZXRhaWw6IGFueVtdID0gW107XG5cbiAgaXNBZGRSZW1pc3Npb25FbmFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgb3JkZXJSZW1pc3Npb25EZXRhaWxzOiBhbnlbXSA9IFtdO1xuICBvcmRlckxldmVsRmVlczogSU9yZGVyUmVmZXJlbmNlRmVlW10gPSBbXTtcbiAgaXNwYXltZW50R3JvdXBBcGlzdWNjZXNzOiBib29sZWFuID0gZmFsc2U7XG4gIGNwb0RldGFpbHM6IGFueSA9IG51bGw7XG4gIG9yZGVyUmVmOiBzdHJpbmc7XG4gIG9yZGVyU3RhdHVzOiBzdHJpbmc7XG4gIG9yZGVyUGFydHk6IHN0cmluZztcbiAgb3JkZXJDcmVhdGVkOiBEYXRlO1xuICBvcmRlckNDREV2ZW50OiBzdHJpbmc7XG4gIHNlcnZpY2VSZXF1ZXN0VmFsdWU6IHN0cmluZztcbiAgb3JkZXJBZGRCdG5FbmFibGU6IGJvb2xlYW47XG4gIG9yZGVyRmVlc1RvdGFsOiBudW1iZXIgPSAwLjAwO1xuICBvcmRlclJlbWlzc2lvblRvdGFsOiBudW1iZXIgPSAwLjAwO1xuICBvcmRlclRvdGFsUGF5bWVudHM6IG51bWJlciA9IDAuMDA7XG4gIG9yZGVyUGVuZGluZ1BheW1lbnRzOiBudW1iZXIgPSAwLjAwO1xuICBpc0NQT0Rvd246IGJvb2xlYW47XG4gIHRlc3Q6IGJvb2xlYW47XG4gIGlzUEJBOiBib29sZWFuID0gZmFsc2U7XG4gIGlzSXNzdWVSZWZ1bmZCdG5FbmFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNBZGRSZW1pc3Npb25CdG5FbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGlzUmVmdW5kUmVtaXNzaW9uQnRuRW5hYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIGFsbG93ZWRSb2xlc1RvQWNjZXNzUmVmdW5kID0gWydwYXltZW50cy1yZWZ1bmQtYXBwcm92ZXInLCAncGF5bWVudHMtcmVmdW5kJ107XG4gIGlzRWxpZ2libGU0UEJBUGF5bWVudCA9IFsncHVpLWZpbmFuY2UtbWFuYWdlcicsICdwdWktdXNlci1tYW5hZ2VyJywgJ3B1aS1vcmdhbmlzYXRpb24tbWFuYWdlcicsICdwdWktY2FzZS1tYW5hZ2VyJ107XG4gIGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgLy9pc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2U6IGJvb2xlYW47XG4gIG5hdmlnYXRpb25wYWdlOiBzdHJpbmc7XG4gIHJlbWlzc2lvbkZlZUFtdDogbnVtYmVyO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgcGF5bWVudFZpZXdTZXJ2aWNlOiBQYXltZW50Vmlld1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBidWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlOiBCdWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FzZVRyYW5zYWN0aW9uc1NlcnZpY2U6IENhc2VUcmFuc2FjdGlvbnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGF5bWVudExpYkNvbXBvbmVudDogUGF5bWVudExpYkNvbXBvbmVudCxcbiAgICBwcml2YXRlIE9yZGVyc2xpc3RTZXJ2aWNlOiBPcmRlcnNsaXN0U2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubmF2aWdhdGlvbnBhZ2UgID0gJyc7XG4gICAgaWYodGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRwYXltZW50UGFnZVZpZXcoKSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRwYXltZW50UGFnZVZpZXcoKS5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMucGF5bWVudFZpZXcgPSBkYXRhKTtcbiAgICB9XG4gICAgaWYoKHRoaXMuTE9HR0VESU5VU0VSUk9MRVMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLkxPR0dFRElOVVNFUlJPTEVTLmxlbmd0aCA9PT0gMCApJiZ0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLmdldFVzZXJSb2xlc0xpc3QoKSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRVc2VyUm9sZXNMaXN0KCkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLkxPR0dFRElOVVNFUlJPTEVTID0gZGF0YSk7XG4gICAgfVxuICAgIGlmKHRoaXMuT3JkZXJzbGlzdFNlcnZpY2UuZ2V0bmF2aWdhdGlvblBhZ2VWYWx1ZSgpICE9PSBudWxsKSB7XG4gICAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLmdldG5hdmlnYXRpb25QYWdlVmFsdWUoKS5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMubmF2aWdhdGlvbnBhZ2UgPSBkYXRhKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXltZW50VmlldyAhPT0gdW5kZWZpbmVkICYmIHRoaXMucGF5bWVudFZpZXcgIT09IG51bGwgJiYgdGhpcy5wYXltZW50Vmlldy5wYXltZW50X2dyb3VwX3JlZmVyZW5jZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMubmF2aWdhdGlvbnBhZ2UgPT09ICdwYXltZW50ZGV0YWlsc3BhZ2UnKSB7XG4gICAgICB0aGlzLmdvVG9QYXllbWVudFZpZXcodGhpcy5wYXltZW50Vmlldy5wYXltZW50X2dyb3VwX3JlZmVyZW5jZSwgdGhpcy5wYXltZW50Vmlldy5yZWZlcmVuY2UsIHRoaXMucGF5bWVudFZpZXcubWV0aG9kKTtcbiAgICB9XG4gICAgdGhpcy5pc0dycE91dHN0YW5kaW5nQW10UG9zaXRpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmNjZENhc2VOdW1iZXIgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuQ0NEX0NBU0VfTlVNQkVSO1xuICAgIHRoaXMuY2FzZVR5cGUgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuQ0FTRVRZUEU7XG4gICAgaWYgKHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5DQ0RfQ0FTRV9OVU1CRVIgPT09ICcnKSB7XG4gICAgICB0aGlzLmNjZENhc2VOdW1iZXIgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuRVhDX1JFRkVSRU5DRTtcbiAgICB9XG4gICAgdGhpcy5leGNSZWZlcmVuY2UgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuRVhDX1JFRkVSRU5DRTtcbiAgICB0aGlzLnRha2VQYXltZW50ID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlRBS0VQQVlNRU5UO1xuXG4gICAgY29uc3Qgc2VydmljZVJlcXVlc3QgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuU0VSVklDRVJFUVVFU1Q7XG4gICAgaWYgKCBzZXJ2aWNlUmVxdWVzdCAhPT0gdW5kZWZpbmVkICYmIHNlcnZpY2VSZXF1ZXN0LnRvU3RyaW5nKCkgPT09ICd0cnVlJyApIHtcbiAgICAgIHRoaXMuc2VydmljZVJlcXVlc3RWYWx1ZSA9ICd0cnVlJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXJ2aWNlUmVxdWVzdFZhbHVlID0gJ2ZhbHNlJztcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2UgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5pc0J1bGtTY2FuRW5hYmxlID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTQlNFTkFCTEU7XG4gICAgdGhpcy5kY25OdW1iZXIgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuRENOX05VTUJFUjtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlNFTEVDVEVEX09QVElPTi50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgIHRoaXMuaXNUdXJuT2ZmID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTVFVSTk9GRjtcbiAgICB0aGlzLmlzU3RyYXRlZ2ljRml4RW5hYmxlID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTU0ZFTkFCTEU7XG4gICAgaWYgKCF0aGlzLmlzVHVybk9mZikge1xuICAgICAgLy8gaWYgKHRoaXMubHNDY2ROdW1iZXIgIT09IHRoaXMuY2NkQ2FzZU51bWJlcikge1xuICAgICAgLy8gICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGAvY2NkLXNlYXJjaD90YWtlUGF5bWVudD10cnVlYCk7XG4gICAgICAvLyB9XG5cbiAgICAgIHRoaXMuY2FzZVRyYW5zYWN0aW9uc1NlcnZpY2UuZ2V0UGF5bWVudEdyb3Vwcyh0aGlzLmNjZENhc2VOdW1iZXIpLnN1YnNjcmliZShcbiAgICAgICAgcGF5bWVudEdyb3VwcyA9PiB7XG4gICAgICAgICAgdGhpcy5pc0FueUZlZUdyb3VwQXZpbGFibGUgPXRydWU7XG4gICAgICAgICAgdGhpcy5wYXltZW50R3JvdXBzID0gcGF5bWVudEdyb3Vwc1sncGF5bWVudF9ncm91cHMnXTtcbiAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUFtb3VudHMoKTtcbiAgICAgICAgICB0aGlzLmNhbGN1bGF0ZU9yZGVyRmVlc0Ftb3VudHMoKTtcbiAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVJlZnVuZEFtb3VudCgpO1xuICAgICAgICAgIGlmICh0aGlzLmlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZSkge1xuICAgICAgICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRTZWxlY3RlZE9yZGVyUmVmSWQoKS5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMub3JkZXJSZWYgPSBkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuZ29Ub09yZGVyVmlld0RldGFpbFNlY3Rpb24odGhpcy5vcmRlclJlZik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLmdldFBhcnR5RGV0YWlscyh0aGlzLmNjZENhc2VOdW1iZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3BvRGV0YWlscyA9IEpTT04ucGFyc2UocmVzcG9uc2UpLmNvbnRlbnRbMF07XG5cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+ZXJyb3IgPyBlcnJvci5yZXBsYWNlKC9cIi9nLFwiXCIpIDogXCJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ1BPRG93biA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICB9XG5cblxuICAgICAgICB9LFxuICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gPGFueT5lcnJvciA/IGVycm9yLnJlcGxhY2UoL1wiL2csXCJcIikgOiBcIlwiO1xuICAgICAgICAgIHRoaXMuaXNBbnlGZWVHcm91cEF2aWxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zZXREZWZhdWx0cygpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhc2VUcmFuc2FjdGlvbnNTZXJ2aWNlLmdldFBheW1lbnRHcm91cHModGhpcy5jY2RDYXNlTnVtYmVyKS5zdWJzY3JpYmUoXG4gICAgICAgIHBheW1lbnRHcm91cHMgPT4ge1xuICAgICAgICAgIHRoaXMuaXNBbnlGZWVHcm91cEF2aWxhYmxlID10cnVlO1xuICAgICAgICAgIHRoaXMucGF5bWVudEdyb3VwcyA9IHBheW1lbnRHcm91cHNbJ3BheW1lbnRfZ3JvdXBzJ107XG4gICAgICAgICAgdGhpcy5jYWxjdWxhdGVBbW91bnRzKCk7XG4gICAgICAgICAgdGhpcy5jYWxjdWxhdGVPcmRlckZlZXNBbW91bnRzKCk7XG4gICAgICAgICAgdGhpcy50b3RhbFJlZnVuZEFtb3VudCA9IHRoaXMuY2FsY3VsYXRlUmVmdW5kQW1vdW50KCk7XG4gICAgICAgICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UuZ2V0UGFydHlEZXRhaWxzKHRoaXMuY2NkQ2FzZU51bWJlcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmNwb0RldGFpbHMgPSBKU09OLnBhcnNlKHJlc3BvbnNlKS5jb250ZW50WzBdO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8YW55PmVycm9yID8gZXJyb3IucmVwbGFjZSgvXCIvZyxcIlwiKSA6IFwiXCI7XG4gICAgICAgICAgICAgIHRoaXMuc2V0RGVmYXVsdHMoKTtcbiAgICAgICAgICAgICAgdGhpcy5pc0NQT0Rvd24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+ZXJyb3IgPyBlcnJvci5yZXBsYWNlKC9cIi9nLFwiXCIpIDogXCJcIjtcbiAgICAgICAgICB0aGlzLmlzQW55RmVlR3JvdXBBdmlsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2V0RGVmYXVsdHMoKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiggdGhpcy5wYXltZW50R3JvdXBzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY2hlY2tGb3JFeGNlcHRpb25SZWNvcmQoKTtcbiAgICB9XG5cbiAgICBpZih0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLmdldGlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZXMoKSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRpc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2VzKCkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLmlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZSA9IGRhdGEpO1xuICAgIH1cblxuICB9XG5cbiAgc2V0RGVmYXVsdHMoKTogdm9pZCB7XG4gICAgdGhpcy50b3RhbFBheW1lbnRzID0gMC4wMDtcbiAgICB0aGlzLnRvdGFsUmVtaXNzaW9ucyA9IDAuMDA7XG4gICAgdGhpcy50b3RhbE5vbk9mZlBheW1lbnRzID0gMC4wMDtcbiAgICB0aGlzLnRvdGFsRmVlcyA9IDAuMDA7XG4gIH1cblxuICBnZXRBbGxvY2F0aW9uU3RhdHVzKHBheW1lbnRzOiBhbnkpIHtcblxuICAgIGxldCBwYXltZW50QWxsb2NhdGlvbiA9IHBheW1lbnRzLnBheW1lbnRfYWxsb2NhdGlvbixcbiAgICAgIGlzQWxsb2NhdGlvblN0YXR1c0V4aXN0ID0gcGF5bWVudEFsbG9jYXRpb24ubGVuZ3RoID4gMDtcbiAgICByZXR1cm4gaXNBbGxvY2F0aW9uU3RhdHVzRXhpc3QgPyBwYXltZW50QWxsb2NhdGlvblswXS5hbGxvY2F0aW9uX3N0YXR1cyA6ICctJztcbiAgICAvL3JldHVybiBcIi1cIjtcblxuICB9XG5cbiAgY2hlY2tGb3JFeGNlcHRpb25SZWNvcmQoKTogdm9pZCB7XG5cbiAgICBpZiAodGhpcy5wYXltZW50R3JvdXBzLmxlbmd0aCA9PT0gMCAmJiAodGhpcy5zZWxlY3RlZE9wdGlvbi50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnY2Nkb3JleGNlcHRpb24nIHx8IHRoaXMuc2VsZWN0ZWRPcHRpb24udG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ3JjJykpIHtcbiAgICAgIHRoaXMuYnVsa1NjYW5pbmdQYXltZW50U2VydmljZS5nZXRCU1BheW1lbnRzQnlDQ0QodGhpcy5jY2RDYXNlTnVtYmVyKS5zdWJzY3JpYmUoXG4gICAgICAgIHJlY29yZERhdGEgPT4ge1xuICAgICAgICAgIGlmIChyZWNvcmREYXRhWydkYXRhJ10gJiYgcmVjb3JkRGF0YVsnZGF0YSddLmV4Y2VwdGlvbl9yZWNvcmRfcmVmZXJlbmNlICYmIHJlY29yZERhdGFbJ2RhdGEnXS5leGNlcHRpb25fcmVjb3JkX3JlZmVyZW5jZS5sZW5ndGggPiAwICYmIHJlY29yZERhdGFbJ2RhdGEnXS5jY2RfcmVmZXJlbmNlID4gMCkge1xuICAgICAgICAgICAgdGhpcy5pc0V4Y2VwdGlvblJlY29yZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0FkZEZlZUJ0bkVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyZWNvcmREYXRhWydkYXRhJ10gJiYgcmVjb3JkRGF0YVsnZGF0YSddLmV4Y2VwdGlvbl9yZWNvcmRfcmVmZXJlbmNlICYmIHJlY29yZERhdGFbJ2RhdGEnXS5leGNlcHRpb25fcmVjb3JkX3JlZmVyZW5jZS5sZW5ndGggPiAwICYmIHJlY29yZERhdGFbJ2RhdGEnXS5jY2RfcmVmZXJlbmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNFeGNlcHRpb25SZWNvcmQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pc0FkZEZlZUJ0bkVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmVjb3JkRGF0YVsnZGF0YSddICYmIHJlY29yZERhdGFbJ2RhdGEnXS5leGNlcHRpb25fcmVjb3JkX3JlZmVyZW5jZSAmJiByZWNvcmREYXRhWydkYXRhJ10uZXhjZXB0aW9uX3JlY29yZF9yZWZlcmVuY2UubGVuZ3RoID09PSB1bmRlZmluZWQgJiYgcmVjb3JkRGF0YVsnZGF0YSddLmNjZF9yZWZlcmVuY2UgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmlzRXhjZXB0aW9uUmVjb3JkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzQWRkRmVlQnRuRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXltZW50R3JvdXBzLmxlbmd0aCA9PT0gMCAmJiB0aGlzLnNlbGVjdGVkT3B0aW9uLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICdkY24nKSB7XG4gICAgICBpZiAodGhpcy5wYXltZW50TGliQ29tcG9uZW50LkNDRF9DQVNFX05VTUJFUi5sZW5ndGggPiAwICYmIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5FWENfUkVGRVJFTkNFLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5pc0V4Y2VwdGlvblJlY29yZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQWRkRmVlQnRuRW5hYmxlZCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5DQ0RfQ0FTRV9OVU1CRVIubGVuZ3RoID09PSAwICYmIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5FWENfUkVGRVJFTkNFLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5pc0V4Y2VwdGlvblJlY29yZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNBZGRGZWVCdG5FbmFibGVkID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzRXhjZXB0aW9uUmVjb3JkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNBZGRGZWVCdG5FbmFibGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucGF5bWVudEdyb3Vwcy5sZW5ndGggPiAwKVxuICAgICAgdGhpcy5wYXltZW50R3JvdXBzLmZvckVhY2gocGF5bWVudEdyb3VwID0+IHtcbiAgICAgICAgaWYgKHBheW1lbnRHcm91cC5wYXltZW50cykge1xuICAgICAgICAgIHBheW1lbnRHcm91cC5wYXltZW50cy5mb3JFYWNoKHBheW1lbnQgPT4ge1xuICAgICAgICAgICAgaWYgKHBheW1lbnQuY2FzZV9yZWZlcmVuY2UgIT09IHVuZGVmaW5lZCAmJiBwYXltZW50LmNjZF9jYXNlX251bWJlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXNFeGNlcHRpb25SZWNvcmQgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLmlzQWRkRmVlQnRuRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5pc0V4Y2VwdGlvblJlY29yZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLmlzQWRkRmVlQnRuRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBjYWxjdWxhdGVPcmRlckZlZXNBbW91bnRzKCk6IHZvaWQge1xuICAgIGxldCBmZWVzVG90YWwgPSAwLjAwO1xuICAgIHRoaXMucGF5bWVudEdyb3Vwcy5mb3JFYWNoKHBheW1lbnRHcm91cCA9PiB7XG4gICAgICB0aGlzLnJlc2V0T3JkZXJWYXJpYWJsZXMoKTtcbiAgICAgIGlmIChwYXltZW50R3JvdXAuZmVlcykge1xuICAgICAgICBwYXltZW50R3JvdXAuZmVlcy5mb3JFYWNoKGZlZSA9PiB7XG4gICAgICAgICAgdGhpcy5vcmRlckZlZXNUb3RhbCA9IHRoaXMub3JkZXJGZWVzVG90YWwgKyBmZWUuY2FsY3VsYXRlZF9hbW91bnRcbiAgICAgICAgICB0aGlzLm92ZXJQYXltZW50QW1vdW50ID0gdGhpcy5vdmVyUGF5bWVudEFtb3VudCArIGZlZS5vdmVyX3BheW1lbnRcbiAgICAgICAgfVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBpZiAocGF5bWVudEdyb3VwLnJlbWlzc2lvbnMpIHtcbiAgICAgICAgcGF5bWVudEdyb3VwLnJlbWlzc2lvbnMuZm9yRWFjaChyZW1pc3Npb24gPT4ge1xuICAgICAgICAgIHRoaXMub3JkZXJSZW1pc3Npb25Ub3RhbCA9IHRoaXMub3JkZXJSZW1pc3Npb25Ub3RhbCArIHJlbWlzc2lvbi5od2ZfYW1vdW50O1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBheW1lbnRHcm91cC5wYXltZW50cykge1xuICAgICAgICBjb25zdCBpc0ZlZU92ZXJQYXltZW50RXhpc3QgPSB0aGlzLm92ZXJQYXltZW50QW1vdW50ID09PSAwO1xuICAgICAgICBwYXltZW50R3JvdXAucGF5bWVudHMuZm9yRWFjaChwYXltZW50ID0+IHtcbiAgICAgICAgICBpZihpc0ZlZU92ZXJQYXltZW50RXhpc3QpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlclBheW1lbnRBbW91bnQgPSB0aGlzLm92ZXJQYXltZW50QW1vdW50ICsgcGF5bWVudC5vdmVyX3BheW1lbnRcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBheW1lbnQuc3RhdHVzLnRvVXBwZXJDYXNlKCkgPT09ICdTVUNDRVNTJykge1xuICAgICAgICAgICAgdGhpcy5vcmRlclRvdGFsUGF5bWVudHMgPSB0aGlzLm9yZGVyVG90YWxQYXltZW50cyArIHBheW1lbnQuYW1vdW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMub3JkZXJQZW5kaW5nUGF5bWVudHMgPSAodGhpcy5vcmRlckZlZXNUb3RhbCAtIHRoaXMub3JkZXJSZW1pc3Npb25Ub3RhbCkgLSB0aGlzLm9yZGVyVG90YWxQYXltZW50cztcbiAgICAgIGlmIChwYXltZW50R3JvdXAuc2VydmljZV9yZXF1ZXN0X3N0YXR1cyA9PT0gJ1BhaWQnKSB7XG4gICAgICAgIHRoaXMub3JkZXJTdGF0dXMgPSBwYXltZW50R3JvdXAuc2VydmljZV9yZXF1ZXN0X3N0YXR1cztcbiAgICAgICAgdGhpcy5vcmRlckFkZEJ0bkVuYWJsZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChwYXltZW50R3JvdXAuc2VydmljZV9yZXF1ZXN0X3N0YXR1cyA9PT0gJ1BhcnRpYWxseSBwYWlkJyB8fCBwYXltZW50R3JvdXAuc2VydmljZV9yZXF1ZXN0X3N0YXR1cyA9PT0gJ05vdCBwYWlkJykge1xuICAgICAgICB0aGlzLm9yZGVyU3RhdHVzID0gcGF5bWVudEdyb3VwLnNlcnZpY2VfcmVxdWVzdF9zdGF0dXM7XG4gICAgICAgIHRoaXMub3JkZXJBZGRCdG5FbmFibGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChwYXltZW50R3JvdXAuc2VydmljZV9yZXF1ZXN0X3N0YXR1cyA9PT0gJ0Rpc3B1dGVkJyl7XG4gICAgICAgIHRoaXMub3JkZXJTdGF0dXMgPSBwYXltZW50R3JvdXAuc2VydmljZV9yZXF1ZXN0X3N0YXR1cztcbiAgICAgICAgdGhpcy5vcmRlckFkZEJ0bkVuYWJsZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vdGhpcy5vcmRlckxldmVsRmVlcy5wdXNoKHtvcmRlclJlZklkOnBheW1lbnRHcm91cFsncGF5bWVudF9ncm91cF9yZWZlcmVuY2UnXSxvcmRlclRvdGFsRmVlczogdGhpcy5vcmRlckZlZXNUb3RhbCxvcmRlclN0YXR1czogdGhpcy5vcmRlclN0YXR1cyxvcmRlclBhcnR5OidTYW50b3NoJywgb3JkZXJDQ0RFdmVudDonQ2FzZSBDcmVhdGlvbicsb3JkZXJDcmVhdGVkOiBuZXcgRGF0ZSgpLCBvcmRlckFkZEJ0bkVuYWJsZTogdGhpcy5vcmRlckFkZEJ0bkVuYWJsZX0pOyB0aGlzLmNwb0RldGFpbHNbJ2NyZWF0ZWRUaW1lc3RhbXAnXVxuICAgICAgaWYgKHRoaXMuY3BvRGV0YWlscyAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLm9yZGVyTGV2ZWxGZWVzLnB1c2goeyBvcmRlclJlZklkOiBwYXltZW50R3JvdXBbJ3BheW1lbnRfZ3JvdXBfcmVmZXJlbmNlJ10sIG9yZGVyVG90YWxGZWVzOiB0aGlzLm9yZGVyRmVlc1RvdGFsLCBvcmRlclN0YXR1czogdGhpcy5vcmRlclN0YXR1cywgb3JkZXJQYXJ0eTogdGhpcy5jcG9EZXRhaWxzWydyZXNwb25zaWJsZVBhcnR5J10sIG9yZGVyQ0NERXZlbnQ6IHRoaXMuY3BvRGV0YWlsc1snYWN0aW9uJ10sIG9yZGVyQ3JlYXRlZDogcGF5bWVudEdyb3VwWydkYXRlX2NyZWF0ZWQnXSwgb3JkZXJBZGRCdG5FbmFibGU6IHRoaXMub3JkZXJBZGRCdG5FbmFibGUgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3JkZXJMZXZlbEZlZXMucHVzaCh7IG9yZGVyUmVmSWQ6IHBheW1lbnRHcm91cFsncGF5bWVudF9ncm91cF9yZWZlcmVuY2UnXSwgb3JkZXJUb3RhbEZlZXM6IHRoaXMub3JkZXJGZWVzVG90YWwsIG9yZGVyU3RhdHVzOiB0aGlzLm9yZGVyU3RhdHVzLCBvcmRlclBhcnR5OiAnJywgb3JkZXJDQ0RFdmVudDogJycsIG9yZGVyQ3JlYXRlZDogcGF5bWVudEdyb3VwWydkYXRlX2NyZWF0ZWQnXSwgb3JkZXJBZGRCdG5FbmFibGU6IHRoaXMub3JkZXJBZGRCdG5FbmFibGUgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9yZGVyU3RhdHVzICE9PSAnUGFpZCcpIHtcbiAgICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRPcmRlcnNMaXN0KHRoaXMub3JkZXJMZXZlbEZlZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJlc2V0T3JkZXJWYXJpYWJsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5vcmRlckZlZXNUb3RhbCA9IDAuMDA7XG4gICAgdGhpcy5vcmRlclRvdGFsUGF5bWVudHMgPSAwLjAwO1xuICAgIHRoaXMub3JkZXJSZW1pc3Npb25Ub3RhbCA9IDAuMDA7XG4gICAgdGhpcy5vcmRlclBlbmRpbmdQYXltZW50cyA9IDAuMDA7XG4gICAgdGhpcy5pc0FkZEZlZUJ0bkVuYWJsZWQgPSB0cnVlO1xuXG4gIH07XG5cbiAgZ29Ub09yZGVyVmlld0RldGFpbFNlY3Rpb24ob3JkZXJSZWZlcmVuY2VPYmo6IGFueSkge1xuICAgIGlmICh0aGlzLmlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZSkge1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRPcmRlclJlZklkKG9yZGVyUmVmZXJlbmNlT2JqKTtcbiAgICAgIHRoaXMub3JkZXJSZWYgPSBvcmRlclJlZmVyZW5jZU9iajtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRPcmRlclJlZklkKG9yZGVyUmVmZXJlbmNlT2JqLm9yZGVyUmVmSWQpO1xuICAgICAgdGhpcy5vcmRlclJlZiA9IG9yZGVyUmVmZXJlbmNlT2JqLm9yZGVyUmVmSWQ7XG4gICAgfVxuXG4gICAgdGhpcy5vcmRlckZlZXNUb3RhbCA9IDAuMDA7XG4gICAgdGhpcy5vcmRlclJlbWlzc2lvblRvdGFsID0gMC4wMDtcbiAgICB0aGlzLm9yZGVyVG90YWxQYXltZW50cyA9IDAuMDA7XG4gICAgdGhpcy5vcmRlclBlbmRpbmdQYXltZW50cyA9IDAuMDA7XG5cbiAgICB0aGlzLm9yZGVyRGV0YWlsID0gdGhpcy5wYXltZW50R3JvdXBzLmZpbHRlcih4ID0+IHgucGF5bWVudF9ncm91cF9yZWZlcmVuY2UgPT09IHRoaXMub3JkZXJSZWYpO1xuICAgIHRoaXMub3JkZXJEZXRhaWwuZm9yRWFjaChvcmRlckRldGFpbCA9PiB7XG4gICAgICBpZiAob3JkZXJEZXRhaWwuZmVlcykge1xuICAgICAgICBvcmRlckRldGFpbC5mZWVzLmZvckVhY2goZmVlID0+IHtcbiAgICAgICAgICB0aGlzLm9yZGVyRmVlc1RvdGFsID0gdGhpcy5vcmRlckZlZXNUb3RhbCArIGZlZS5jYWxjdWxhdGVkX2Ftb3VudDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAob3JkZXJEZXRhaWwucmVtaXNzaW9ucykge1xuICAgICAgICBvcmRlckRldGFpbC5yZW1pc3Npb25zLmZvckVhY2gocmVtaXNzaW9uID0+IHtcbiAgICAgICAgICB0aGlzLm9yZGVyUmVtaXNzaW9uVG90YWwgPSB0aGlzLm9yZGVyUmVtaXNzaW9uVG90YWwgKyByZW1pc3Npb24uaHdmX2Ftb3VudDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChvcmRlckRldGFpbC5wYXltZW50cykge1xuICAgICAgICAgIHRoaXMucGF5bWVudCA9IG9yZGVyRGV0YWlsLnBheW1lbnRzWzBdO1xuICAgICAgICAgIG9yZGVyRGV0YWlsLnBheW1lbnRzLmZvckVhY2gocGF5bWVudCA9PiB7XG4gICAgICAgICAgICBpZiAocGF5bWVudC5zdGF0dXMudG9VcHBlckNhc2UoKSA9PT0gJ1NVQ0NFU1MnKSB7XG4gICAgICAgICAgICAgIHRoaXMub3JkZXJUb3RhbFBheW1lbnRzID0gdGhpcy5vcmRlclRvdGFsUGF5bWVudHMgKyBwYXltZW50LmFtb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5vcmRlclN0YXR1cyA9IG9yZGVyRGV0YWlsLnNlcnZpY2VfcmVxdWVzdF9zdGF0dXM7XG4gICAgfSk7XG4gICAgLy90aGlzLm9yZGVyUGVuZGluZ1BheW1lbnRzID0gKHRoaXMub3JkZXJGZWVzVG90YWwgLSB0aGlzLm9yZGVyUmVtaXNzaW9uVG90YWwpIC0gdGhpcy5vcmRlclRvdGFsUGF5bWVudHM7XG4gICAgLy8gdGhpcy5vcmRlclJlZiA9IG9yZGVyUmVmZXJlbmNlT2JqLm9yZGVyUmVmSWQ7XG4gICAgLy8gaWYgKHRoaXMub3JkZXJQZW5kaW5nUGF5bWVudHMgPD0gMC4wMCkge1xuICAgIC8vICAgdGhpcy5vcmRlclN0YXR1cyA9ICdQYWlkJztcbiAgICAvLyB9IGVsc2UgaWYgKHRoaXMub3JkZXJGZWVzVG90YWwgPiAwICYmICh0aGlzLm9yZGVyVG90YWxQYXltZW50cyA+IDAgfHwgdGhpcy5vcmRlclJlbWlzc2lvblRvdGFsID4gMCkgJiYgKHRoaXMub3JkZXJUb3RhbFBheW1lbnRzIDwgdGhpcy5vcmRlclBlbmRpbmdQYXltZW50cykpIHtcbiAgICAvLyAgIHRoaXMub3JkZXJTdGF0dXMgPSAnUGFydGlhbGx5IHBhaWQnXG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHRoaXMub3JkZXJTdGF0dXMgPSAnTm90IHBhaWQnXG4gICAgLy8gfVxuXG5cbiAgICBpZiAodGhpcy5jcG9EZXRhaWxzICE9PSBudWxsKSB7XG4gICAgICB0aGlzLm9yZGVyUGFydHkgPSB0aGlzLmNwb0RldGFpbHNbJ3Jlc3BvbnNpYmxlUGFydHknXTtcbiAgICAgIHRoaXMub3JkZXJDcmVhdGVkID0gdGhpcy5jcG9EZXRhaWxzWydjcmVhdGVkVGltZXN0YW1wJ107XG4gICAgICB0aGlzLm9yZGVyQ0NERXZlbnQgPSB0aGlzLmNwb0RldGFpbHNbJ2FjdGlvbiddO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9yZGVyUGFydHkgPSAnJztcbiAgICAgIHRoaXMub3JkZXJDQ0RFdmVudCA9ICcnO1xuICAgICAgdGhpcy5vcmRlckNyZWF0ZWQgPSBvcmRlclJlZmVyZW5jZU9iai5vcmRlckNyZWF0ZWQ7XG4gICAgfVxuICAgIHRoaXMudmlld1N0YXR1cyA9ICdvcmRlci1mdWxsLXZpZXcnO1xuICB9XG5cbiAgcmVkaXJlY3RUb09yZGVyRmVlU2VhcmNoUGFnZShldmVudDogYW55LCBvcmRlcmVmOiBhbnkpIHtcbiAgICBpZihvcmRlcmVmLm9yZGVyQWRkQnRuRW5hYmxlKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuYnNwYXltZW50ZGNuID0gbnVsbDtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQucGF5bWVudEdyb3VwUmVmZXJlbmNlID0gb3JkZXJlZi5vcmRlclJlZklkO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc1R1cm5PZmYgPSB0aGlzLmlzVHVybk9mZjtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAnZmVlLXN1bW1hcnknO1xuICAgIH1cbiAgfVxuXG5cblxuXG4gIGNhbGN1bGF0ZUFtb3VudHMoKTogdm9pZCB7XG4gICAgbGV0IGZlZXNUb3RhbCA9IDAuMDAsXG4gICAgICBwYXltZW50c1RvdGFsID0gMC4wMCxcbiAgICAgIHJlbWlzc2lvbnNUb3RhbCA9IDAuMDAsXG4gICAgICBub25PZmZMaW5lUGF5bWVudCA9IDAuMDA7XG5cbiAgICB0aGlzLnBheW1lbnRHcm91cHMuZm9yRWFjaChwYXltZW50R3JvdXAgPT4ge1xuICAgICAgaWYgKHBheW1lbnRHcm91cC5mZWVzKSB7XG4gICAgICAgIHBheW1lbnRHcm91cC5mZWVzLmZvckVhY2goZmVlID0+IHtcbiAgICAgICAgICAvLyBuZXcgZmVhdHVyZSBBcHBvcnRpb25tZW50IHRvZ2dsZSBjaGFuZ2VzXG4gICAgICAgICAgaWYgKCF0aGlzLmlzVHVybk9mZikge1xuICAgICAgICAgICAgaWYgKGZlZS5kYXRlX2NyZWF0ZWQpIHtcbiAgICAgICAgICAgICAgbGV0IGEgPSBmZWUuYW1vdW50X2R1ZSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICBsZXQgYiA9IGZlZS5hbW91bnRfZHVlIDw9IDA7XG4gICAgICAgICAgICAgIHRoaXMuY2xBbW91bnREdWUgPSBhID8gdGhpcy5jbEFtb3VudER1ZSArIGZlZS5uZXRfYW1vdW50IDogYiA/IHRoaXMuY2xBbW91bnREdWUgKyAwIDogdGhpcy5jbEFtb3VudER1ZSArIGZlZS5hbW91bnRfZHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmVlWydwYXltZW50X2dyb3VwX3JlZmVyZW5jZSddID0gcGF5bWVudEdyb3VwWydwYXltZW50X2dyb3VwX3JlZmVyZW5jZSddO1xuICAgICAgICAgICAgdGhpcy5mZWVzLnB1c2goZmVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmVlc1RvdGFsID0gZmVlc1RvdGFsICsgZmVlLmNhbGN1bGF0ZWRfYW1vdW50O1xuICAgICAgICAgICAgdGhpcy5mZWVzLnB1c2goZmVlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc1R1cm5PZmYpIHtcbiAgICAgICAgdGhpcy50b3RhbEZlZXMgPSBmZWVzVG90YWw7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXltZW50R3JvdXAucGF5bWVudHMpIHtcbiAgICAgICAgcGF5bWVudEdyb3VwLnBheW1lbnRzLmZvckVhY2gocGF5bWVudCA9PiB7XG4gICAgICAgICAgLy8gbmV3IGZlYXR1cmUgQXBwb3J0aW9ubWVudCB0b2dnbGUgY2hhbmdlc1xuICAgICAgICAgIGlmICghdGhpcy5pc1R1cm5PZmYpIHtcbiAgICAgICAgICAgIGxldCBhbGxvY2F0aW9uTGVuID0gcGF5bWVudC5wYXltZW50X2FsbG9jYXRpb247XG5cbiAgICAgICAgICAgIGlmIChwYXltZW50LnN0YXR1cy50b1VwcGVyQ2FzZSgpID09PSAnU1VDQ0VTUycpIHtcbiAgICAgICAgICAgICAgcGF5bWVudHNUb3RhbCA9IHBheW1lbnRzVG90YWwgKyBwYXltZW50LmFtb3VudDtcbiAgICAgICAgICAgICAgaWYgKGFsbG9jYXRpb25MZW4ubGVuZ3RoID09PSAwIHx8IGFsbG9jYXRpb25MZW4ubGVuZ3RoID4gMCAmJiBhbGxvY2F0aW9uTGVuWzBdLmFsbG9jYXRpb25fc3RhdHVzID09PSAnQWxsb2NhdGVkJykge1xuICAgICAgICAgICAgICAgIG5vbk9mZkxpbmVQYXltZW50ID0gbm9uT2ZmTGluZVBheW1lbnQgKyBwYXltZW50LmFtb3VudDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoYWxsb2NhdGlvbkxlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub25QYXltZW50cy5wdXNoKHBheW1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsb2NhdGlvbkxlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5wYXltZW50cy5wdXNoKHBheW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF5bWVudC5wYXltZW50R3JvdXBSZWZlcmVuY2UgPSBwYXltZW50R3JvdXAucGF5bWVudF9ncm91cF9yZWZlcmVuY2VcbiAgICAgICAgICAgIHRoaXMuYWxsUGF5bWVudHMucHVzaChwYXltZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHBheW1lbnQuc3RhdHVzLnRvVXBwZXJDYXNlKCkgPT09ICdTVUNDRVNTJykge1xuICAgICAgICAgICAgICBwYXltZW50c1RvdGFsID0gcGF5bWVudHNUb3RhbCArIHBheW1lbnQuYW1vdW50O1xuICAgICAgICAgICAgICB0aGlzLnBheW1lbnRzLnB1c2gocGF5bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXltZW50LnBheW1lbnRHcm91cFJlZmVyZW5jZSA9IHBheW1lbnRHcm91cC5wYXltZW50X2dyb3VwX3JlZmVyZW5jZVxuICAgICAgICAgICAgdGhpcy5hbGxQYXltZW50cy5wdXNoKHBheW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLnRvdGFsUGF5bWVudHMgPSBwYXltZW50c1RvdGFsO1xuICAgICAgLy8gbmV3IGZlYXR1cmUgQXBwb3J0aW9ubWVudCB0b2dnbGUgY2hhbmdlc1xuICAgICAgaWYgKCF0aGlzLmlzVHVybk9mZikge1xuICAgICAgICB0aGlzLnRvdGFsTm9uT2ZmUGF5bWVudHMgPSBub25PZmZMaW5lUGF5bWVudDtcbiAgICAgIH1cblxuICAgICAgaWYgKHBheW1lbnRHcm91cC5yZW1pc3Npb25zKSB7XG4gICAgICAgIHBheW1lbnRHcm91cC5yZW1pc3Npb25zLmZvckVhY2gocmVtaXNpc29uID0+IHtcbiAgICAgICAgICByZW1pc3Npb25zVG90YWwgPSByZW1pc3Npb25zVG90YWwgKyByZW1pc2lzb24uaHdmX2Ftb3VudDtcbiAgICAgICAgICB0aGlzLnJlbWlzc2lvbnMucHVzaChyZW1pc2lzb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMudG90YWxSZW1pc3Npb25zID0gcmVtaXNzaW9uc1RvdGFsO1xuICAgIH0pO1xuXG4gIH1cblxuICBjYWxjdWxhdGVSZWZ1bmRBbW91bnQoKSB7XG4gICAgaWYgKCF0aGlzLmlzVHVybk9mZikge1xuICAgICAgbGV0IGlzTmV3UGF5bWVudEdyb3VwID0gZmFsc2U7XG5cbiAgICAgIHRoaXMucGF5bWVudEdyb3Vwcy5mb3JFYWNoKChwYXltZW50R3JvdXAsIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCBncnBPdXRzdGFuZGluZ0Ftb3VudCA9IDAuMDAsXG4gICAgICAgICAgZmVlc1RvdGFsID0gMC4wMCxcbiAgICAgICAgICBwYXltZW50c1RvdGFsID0gMC4wMCxcbiAgICAgICAgICByZW1pc3Npb25zVG90YWwgPSAwLjAwLFxuICAgICAgICAgIGZlZXMgPSBbXTtcblxuICAgICAgICBpZiAocGF5bWVudEdyb3VwLmZlZXMpIHtcbiAgICAgICAgICAvLyB0aGlzLmlzRmVlUmVjb3Jkc0V4aXN0ID0gdHJ1ZTtcbiAgICAgICAgICBwYXltZW50R3JvdXAuZmVlcy5mb3JFYWNoKGZlZSA9PiB7XG4gICAgICAgICAgICBmZWVzVG90YWwgPSBmZWVzVG90YWwgKyBmZWUuY2FsY3VsYXRlZF9hbW91bnQ7XG5cbiAgICAgICAgICAgIHRoaXMuaXNSZW1pc3Npb25zTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwYXltZW50R3JvdXAucmVtaXNzaW9ucykge1xuICAgICAgICAgICAgICBwYXltZW50R3JvdXAucmVtaXNzaW9ucy5mb3JFYWNoKHJlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlbS5mZWVfY29kZSA9PT0gZmVlLmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZW1pc3Npb25zTWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgZmVlWydyZW1pc3Npb25zJ10gPSByZW07XG4gICAgICAgICAgICAgICAgICAvLyBpZighZmVlcy5maW5kKGsgPT4gay5jb2RlPWZlZS5jb2RlKSlcbiAgICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAgIGZlZXMucHVzaChmZWUpO1xuICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5pc1JlbWlzc2lvbnNNYXRjaCkge1xuICAgICAgICAgICAgICBmZWVzLnB1c2goZmVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZlZS5kYXRlX2NyZWF0ZWQpIHtcbiAgICAgICAgICAgICAgaXNOZXdQYXltZW50R3JvdXAgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5pc0hpc3RvcmljR3JvdXBBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLnBheW1lbnRHcm91cHNbaW5kZXhdWydvbGQnXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5wYXltZW50R3JvdXBzW2luZGV4XS5mZWVzID0gZmVlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bWVudEdyb3VwLnBheW1lbnRzKSB7XG4gICAgICAgICAgcGF5bWVudEdyb3VwLnBheW1lbnRzLmZvckVhY2gocGF5bWVudCA9PiB7XG4gICAgICAgICAgICBpZiAocGF5bWVudC5zdGF0dXMudG9VcHBlckNhc2UoKSA9PT0gJ1NVQ0NFU1MnKSB7XG4gICAgICAgICAgICAgIHBheW1lbnRzVG90YWwgPSBwYXltZW50c1RvdGFsICsgcGF5bWVudC5hbW91bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGF5bWVudEdyb3VwLnJlbWlzc2lvbnMpIHtcbiAgICAgICAgICBwYXltZW50R3JvdXAucmVtaXNzaW9ucy5mb3JFYWNoKHJlbWlzc2lvbiA9PiB7XG4gICAgICAgICAgICByZW1pc3Npb25zVG90YWwgPSByZW1pc3Npb25zVG90YWwgKyByZW1pc3Npb24uaHdmX2Ftb3VudDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBncnBPdXRzdGFuZGluZ0Ftb3VudCA9IChmZWVzVG90YWwgLSByZW1pc3Npb25zVG90YWwpIC0gcGF5bWVudHNUb3RhbDtcbiAgICAgICAgaWYgKGdycE91dHN0YW5kaW5nQW1vdW50ID4gMCAmJiBpc05ld1BheW1lbnRHcm91cCkge1xuICAgICAgICAgIHRoaXMuaXNBbnlGZWVHcm91cEF2aWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmlzRmVlUmVjb3Jkc0V4aXN0ID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnBheW1lbnRSZWYgPSBwYXltZW50R3JvdXAucGF5bWVudF9ncm91cF9yZWZlcmVuY2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheW1lbnRHcm91cC5mZWVzICYmIHBheW1lbnRHcm91cC5mZWVzLmxlbmd0aCA+IDAgJiYgZ3JwT3V0c3RhbmRpbmdBbW91bnQgPD0gMCAmJiBpc05ld1BheW1lbnRHcm91cCkge1xuICAgICAgICAgIHRoaXMuaXNBbnlGZWVHcm91cEF2aWxhYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKCghaXNOZXdQYXltZW50R3JvdXAgJiYgdGhpcy5pc0hpc3RvcmljR3JvdXBBdmFpbGFibGUpIHx8ICghaXNOZXdQYXltZW50R3JvdXAgJiYgIXRoaXMuaXNIaXN0b3JpY0dyb3VwQXZhaWxhYmxlKSkge1xuICAgICAgICB0aGlzLmlzQW55RmVlR3JvdXBBdmlsYWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdG90YWxSZWZ1bmRBbW91bnQgPSAwLFxuICAgICAgICBpc0ZlZUFtb3VudFplcm8gPSBmYWxzZTtcbiAgICAgIHRoaXMucGF5bWVudEdyb3Vwcy5mb3JFYWNoKHBheW1lbnRHcm91cCA9PiB7XG4gICAgICAgIGxldCBncnBPdXRzdGFuZGluZ0Ftb3VudCA9IDAuMDAsXG4gICAgICAgICAgZmVlc1RvdGFsID0gMC4wMCxcbiAgICAgICAgICBwYXltZW50c1RvdGFsID0gMC4wMCxcbiAgICAgICAgICByZW1pc3Npb25zVG90YWwgPSAwLjAwO1xuICAgICAgICBpZiAocGF5bWVudEdyb3VwLmZlZXMpIHtcbiAgICAgICAgICB0aGlzLmlzRmVlUmVjb3Jkc0V4aXN0ID0gdHJ1ZTtcbiAgICAgICAgICBwYXltZW50R3JvdXAuZmVlcy5mb3JFYWNoKGZlZSA9PiB7XG4gICAgICAgICAgICBmZWVzVG90YWwgPSBmZWVzVG90YWwgKyBmZWUuY2FsY3VsYXRlZF9hbW91bnQ7XG4gICAgICAgICAgICBpZiAoZmVlLmNhbGN1bGF0ZWRfYW1vdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgIGlzRmVlQW1vdW50WmVybyA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBheW1lbnRHcm91cC5wYXltZW50cykge1xuICAgICAgICAgIHBheW1lbnRHcm91cC5wYXltZW50cy5mb3JFYWNoKHBheW1lbnQgPT4ge1xuICAgICAgICAgICAgaWYgKHBheW1lbnQuc3RhdHVzLnRvVXBwZXJDYXNlKCkgPT09ICdTVUNDRVNTJykge1xuICAgICAgICAgICAgICBwYXltZW50c1RvdGFsID0gcGF5bWVudHNUb3RhbCArIHBheW1lbnQuYW1vdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBheW1lbnRHcm91cC5yZW1pc3Npb25zKSB7XG4gICAgICAgICAgcGF5bWVudEdyb3VwLnJlbWlzc2lvbnMuZm9yRWFjaChyZW1pc3Npb24gPT4ge1xuICAgICAgICAgICAgcmVtaXNzaW9uc1RvdGFsID0gcmVtaXNzaW9uc1RvdGFsICsgcmVtaXNzaW9uLmh3Zl9hbW91bnQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZ3JwT3V0c3RhbmRpbmdBbW91bnQgPSAoZmVlc1RvdGFsIC0gcmVtaXNzaW9uc1RvdGFsKSAtIHBheW1lbnRzVG90YWw7XG4gICAgICAgIGlmIChncnBPdXRzdGFuZGluZ0Ftb3VudCA8IDApIHtcbiAgICAgICAgICBpZiAodG90YWxSZWZ1bmRBbW91bnQgPT09IDApIHtcbiAgICAgICAgICAgIHRvdGFsUmVmdW5kQW1vdW50ID0gZ3JwT3V0c3RhbmRpbmdBbW91bnQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvdGFsUmVmdW5kQW1vdW50ID0gKHRvdGFsUmVmdW5kQW1vdW50ICsgZ3JwT3V0c3RhbmRpbmdBbW91bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChncnBPdXRzdGFuZGluZ0Ftb3VudCA+IDAgfHwgKGdycE91dHN0YW5kaW5nQW1vdW50ID09PSAwICYmIGlzRmVlQW1vdW50WmVybykpIHtcbiAgICAgICAgICB0aGlzLmlzR3JwT3V0c3RhbmRpbmdBbXRQb3NpdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRvdGFsUmVmdW5kQW1vdW50ICogLTE7XG4gICAgfVxuICB9XG5cbiAgZ2V0R3JvdXBPdXRzdGFuZGluZ0Ftb3VudChwYXltZW50R3JvdXA6IElQYXltZW50R3JvdXApOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmJ1bGtTY2FuaW5nUGF5bWVudFNlcnZpY2UuY2FsY3VsYXRlT3V0U3RhbmRpbmdBbW91bnQocGF5bWVudEdyb3VwKTtcbiAgfVxuXG4gIHJlZGlyZWN0VG9GZWVTZWFyY2hQYWdlKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmlzQnVsa1NjYW5FbmFibGUgPyAnJmlzQnVsa1NjYW5uaW5nPUVuYWJsZScgOiAnJmlzQnVsa1NjYW5uaW5nPURpc2FibGUnO1xuICAgIHVybCArPSB0aGlzLmlzVHVybk9mZiA/ICcmaXNUdXJuT2ZmPUVuYWJsZScgOiAnJmlzVHVybk9mZj1EaXNhYmxlJztcbiAgICB1cmwgKz0gdGhpcy5pc1N0cmF0ZWdpY0ZpeEVuYWJsZSA/ICcmaXNTdEZpeEVuYWJsZT1FbmFibGUnIDogJyZpc1N0Rml4RW5hYmxlPURpc2FibGUnO1xuICAgIHVybCArPSBgJmNhc2VUeXBlPSR7dGhpcy5jYXNlVHlwZX1gXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChgL2ZlZS1zZWFyY2g/c2VsZWN0ZWRPcHRpb249JHt0aGlzLnNlbGVjdGVkT3B0aW9ufSZjY2RDYXNlTnVtYmVyPSR7dGhpcy5jY2RDYXNlTnVtYmVyfSR7dXJsfWApO1xuICB9XG5cbiAgYWRkUmVtaXNzaW9uKGZlZTogSUZlZSkge1xuICAgIGlmKHRoaXMuY2hrRm9yQWRkUmVtaXNzaW9uKGZlZS5jb2RlKSkge1xuICAgIHRoaXMuZmVlSWQgPSBmZWU7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJ2FkZHJlbWlzc2lvbic7XG4gICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UuZ2V0QXBwb3J0aW9uUGF5bWVudERldGFpbHModGhpcy5wYXltZW50LnJlZmVyZW5jZSkuc3Vic2NyaWJlKFxuICAgICAgcGF5bWVudEdyb3VwID0+IHtcbiAgICAgICAgdGhpcy5wYXltZW50R3JvdXAgPSBwYXltZW50R3JvdXA7XG5cbiAgICAgICAgdGhpcy5wYXltZW50R3JvdXAucGF5bWVudHMgPSB0aGlzLnBheW1lbnRHcm91cC5wYXltZW50cy5maWx0ZXJcbiAgICAgICAgICAocGF5bWVudEdyb3VwT2JqID0+IHBheW1lbnRHcm91cE9ialsncmVmZXJlbmNlJ10uaW5jbHVkZXModGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRSZWZlcmVuY2UpKTtcbiAgICAgICAgdGhpcy5wYXltZW50ID0gdGhpcy5wYXltZW50R3JvdXAucGF5bWVudHNbMF07XG4gICAgICAgIC8vIGNvbnN0IHBheW1lbnRBbGxvY2F0aW9uID0gdGhpcy5wYXltZW50R3JvdXAucGF5bWVudHNbMF0ucGF5bWVudF9hbGxvY2F0aW9uO1xuICAgICAgICAvLyB0aGlzLmlzU3RhdHVzQWxsb2NhdGVkID0gcGF5bWVudEFsbG9jYXRpb24ubGVuZ3RoID4gMCAmJiBwYXltZW50QWxsb2NhdGlvblswXS5hbGxvY2F0aW9uX3N0YXR1cyA9PT0gJ0FsbG9jYXRlZCcgfHwgcGF5bWVudEFsbG9jYXRpb24ubGVuZ3RoID09PSAwO1xuICAgICAgfSxcbiAgICAgIChlcnJvcjogYW55KSA9PiB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yPyBlcnJvci5yZXBsYWNlKC9cIi9nLFwiXCIpIDogXCJcIlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBhZGRSZWZ1bmRGb3JSZW1pc3Npb24ocGF5bWVudDogSVBheW1lbnQsIHJlbWlzc2lvbjogSVJlbWlzc2lvbltdLGZlZXM6YW55KSB7XG4gICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLmdldEFwcG9ydGlvblBheW1lbnREZXRhaWxzKHBheW1lbnQucmVmZXJlbmNlKS5zdWJzY3JpYmUoXG4gICAgICBwYXltZW50R3JvdXAgPT4ge1xuICAgICAgICB0aGlzLnBheW1lbnRHcm91cCA9IHBheW1lbnRHcm91cDtcbiAgICAgICAgdGhpcy5wYXltZW50R3JvdXAucGF5bWVudHMgPSBwYXltZW50R3JvdXAucGF5bWVudHMuZmlsdGVyXG4gICAgICAgICAgKHBheW1lbnRHcm91cE9iaiA9PiBwYXltZW50R3JvdXBPYmoucmVmZXJlbmNlID09PSBwYXltZW50LnJlZmVyZW5jZSk7XG4gICAgICAgIHRoaXMucGF5bWVudCA9IHRoaXMucGF5bWVudEdyb3VwLnBheW1lbnRzWzBdO1xuICAgICAgICB0aGlzLnJlbWlzc2lvbnMgPSByZW1pc3Npb247XG4gICAgICAgIHRoaXMucmVtaXNzaW9uRmVlQW10ID0gZmVlcy5maWx0ZXIoZGF0YT0+ZGF0YS5jb2RlID09PSB0aGlzLnJlbWlzc2lvbnNbJ2ZlZV9jb2RlJ10pWzBdLm5ldF9hbW91bnQ7XG4gICAgICAgIHRoaXMudmlld1N0YXR1cyA9ICdhZGRyZWZ1bmRmb3JyZW1pc3Npb24nO1xuICAgICAgICAvLyBjb25zdCBwYXltZW50QWxsb2NhdGlvbiA9IHRoaXMucGF5bWVudEdyb3VwLnBheW1lbnRzWzBdLnBheW1lbnRfYWxsb2NhdGlvbjtcbiAgICAgICAgLy8gdGhpcy5pc1N0YXR1c0FsbG9jYXRlZCA9IHBheW1lbnRBbGxvY2F0aW9uLmxlbmd0aCA+IDAgJiYgcGF5bWVudEFsbG9jYXRpb25bMF0uYWxsb2NhdGlvbl9zdGF0dXMgPT09ICdBbGxvY2F0ZWQnIHx8IHBheW1lbnRBbGxvY2F0aW9uLmxlbmd0aCA9PT0gMDtcbiAgICAgIH0sXG4gICAgICAoZXJyb3I6IGFueSkgPT4gdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvclxuICAgICk7XG4gIH1cblxuICByZWRpcmVjdFRvcmVtaXNzaW9uUGFnZShldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAncmVtaXNzaW9uJ1xuICB9XG4gIGdvVG9TZXJ2aWNlUmVxdWVzdFBhZ2UoKSB7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ2Nhc2UtdHJhbnNhY3Rpb25zJztcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPSBmYWxzZTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuU0VSVklDRVJFUVVFU1QgPSAndHJ1ZSc7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZSA9IHRydWU7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG4gIHJlZGlyZWN0VG9SZXBvcnRzUGFnZShldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGAvcmVwb3J0cz9zZWxlY3RlZE9wdGlvbj0ke3RoaXMuc2VsZWN0ZWRPcHRpb259JmNjZENhc2VOdW1iZXI9JHt0aGlzLmNjZENhc2VOdW1iZXJ9YCk7XG4gIH1cblxuICBsb2FkRmVlU3VtbWFyeVBhZ2UocGF5bWVudEdyb3VwOiBJUGF5bWVudEdyb3VwKSB7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmJzcGF5bWVudGRjbiA9IG51bGw7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRHcm91cFJlZmVyZW5jZSA9IHBheW1lbnRHcm91cC5wYXltZW50X2dyb3VwX3JlZmVyZW5jZTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNUdXJuT2ZmID0gdGhpcy5pc1R1cm5PZmY7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ2ZlZS1zdW1tYXJ5JztcbiAgfVxuXG4gIGdvVG9QYXltZW50Vmlld0NvbXBvbmVudChwYXltZW50R3JvdXA6IGFueSkge1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5wYXltZW50TWV0aG9kID0gcGF5bWVudEdyb3VwLnBheW1lbnRNZXRob2Q7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRHcm91cFJlZmVyZW5jZSA9IHBheW1lbnRHcm91cC5wYXltZW50R3JvdXBSZWZlcmVuY2U7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRSZWZlcmVuY2UgPSBwYXltZW50R3JvdXAucGF5bWVudFJlZmVyZW5jZTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAncGF5bWVudC12aWV3JztcbiAgfVxuXG4gIGdvVG9QYXllbWVudFZpZXcocGF5bWVudEdyb3VwUmVmZXJlbmNlOiBzdHJpbmcsIHBheW1lbnRSZWZlcmVuY2U6IHN0cmluZywgcGF5bWVudE1ldGhvZDogc3RyaW5nKSB7XG4gICAgdGhpcy5nb1RvUGF5bWVudFZpZXdDb21wb25lbnQoeyBwYXltZW50R3JvdXBSZWZlcmVuY2UsIHBheW1lbnRSZWZlcmVuY2UsIHBheW1lbnRNZXRob2QgfSk7XG4gIH1cblxuICBzZWxlY3RlZFVucHJvY2Vzc2VkRmVlRXZlbnQodW5wcm9jZXNzZWRSZWNvcmRJZDogc3RyaW5nKSB7XG4gICAgaWYgKHVucHJvY2Vzc2VkUmVjb3JkSWQpIHtcbiAgICAgIGlmICh0aGlzLmlzVHVybk9mZikge1xuICAgICAgICB0aGlzLmlzQWRkRmVlQnRuRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5pc1VucHJvY2Vzc2VkUmVjb3JkU2VsZWN0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5pc1R1cm5PZmYpIHtcbiAgICAgICAgdGhpcy5pc0FkZEZlZUJ0bkVuYWJsZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5pc1VucHJvY2Vzc2VkUmVjb3JkU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnZXRVbnByb2Nlc3NlZEZlZUNvdW50KHVuUHJvY2Vzc2VkUmVjb3JkQ291bnQ6IG51bWJlcikge1xuICAgIHRoaXMudW5wcm9jZXNzZWRSZWNvcmRDb3VudCA9IHVuUHJvY2Vzc2VkUmVjb3JkQ291bnQ7XG4gIH1cblxuICBjYWxjdWxhdGVBbW91bnREdWUoZmVlOiBJRmVlKSB7XG5cbiAgICBpZiAoZmVlLmRhdGVfY3JlYXRlZCkge1xuICAgICAgcmV0dXJuIGZlZS5hbW91bnRfZHVlICE9PSB1bmRlZmluZWQgPyBmZWUuYW1vdW50X2R1ZSA6IGZlZS5uZXRfYW1vdW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCIwLjAwXCI7XG4gICAgfVxuICB9XG5cbiAgY29uZmlybVJlbW92ZUZlZShmZWU6IElGZWUpIHtcbiAgICB0aGlzLmlzUmVtb3ZlQnRuRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmZlZUlkID0gZmVlO1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICdmZWVSZW1vdmFsQ29uZmlybWF0aW9uJztcbiAgfVxuXG4gIGNhbmNlbFJlbW92YWwoKSB7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJ21haW4nO1xuICB9XG5cbiAgcmVtb3ZlRmVlKGZlZTogYW55KSB7XG4gICAgdGhpcy5pc1JlbW92ZUJ0bkRpc2FibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnBheW1lbnRWaWV3U2VydmljZS5kZWxldGVGZWVGcm9tUGF5bWVudEdyb3VwKGZlZSkuc3Vic2NyaWJlKFxuICAgICAgKHN1Y2Nlc3M6IGFueSkgPT4ge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgICAgdGhpcy5pc1JlbW92ZUJ0bkRpc2FibGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGlzQ2hlY2tBbW91bnRkdWVFeGlzdChhbW91bnREdWU6IGFueSkge1xuICAgIHJldHVybiB0eXBlb2YgYW1vdW50RHVlID09PSAndW5kZWZpbmVkJztcbiAgfVxuXG4gIGlzc3VlUmVmdW5kKHBheW1lbnQ6IElQYXltZW50KSB7XG4gICAgaWYgKHBheW1lbnQgIT09IG51bGwgJiYgcGF5bWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYodGhpcy5jaGtJc3N1ZVJlZnVuZEJ0bkVuYWJsZShwYXltZW50KSkge1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICdpc3N1ZXJlZnVuZCc7XG4gICAgdGhpcy5wYXltZW50ID0gcGF5bWVudDtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNGcm9tU2VydmljZVJlcXVlc3RQYWdlID0gdHJ1ZTtcbiAgICB0aGlzLmlzUmVmdW5kUmVtaXNzaW9uID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgfVxuXG4gIGNoa0ZvckFkZFJlbWlzc2lvbihmZWVDb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5jaGtGb3JQQkFQYXltZW50KCkgJiYgdGhpcy5jaGVjazRBbGxvd2VkUm9sZXMyQWNjZXNzUmVmdW5kKCkpIHtcbiAgICAgIGlmICh0aGlzLm9yZGVyRGV0YWlsWzBdWydyZW1pc3Npb25zJ10ubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IHJlbWlzc2lvbiBvZiB0aGlzLm9yZGVyRGV0YWlsWzBdWydyZW1pc3Npb25zJ10pIHtcbiAgICAgICAgICBpZiAocmVtaXNzaW9uLmZlZV9jb2RlID09PSBmZWVDb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNoa0ZvclBCQVBheW1lbnQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMub3JkZXJEZXRhaWwgIT09IG51bGwgJiYgIHRoaXMub3JkZXJEZXRhaWwgIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMub3JkZXJEZXRhaWwuZm9yRWFjaChvcmRlckRldGFpbCA9PiB7XG4gICAgICBpZiAob3JkZXJEZXRhaWwucGF5bWVudHMpIHtcbiAgICAgICAgb3JkZXJEZXRhaWwucGF5bWVudHMuZm9yRWFjaChwYXltZW50ID0+IHtcbiAgICAgICAgICBpZiAocGF5bWVudC5tZXRob2QudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ3BheW1lbnQgYnkgYWNjb3VudCcgJiYgdGhpcy5hbGxvd0Z1cnRoZXJBY2Nlc3NBZnRlcjREYXlzKHBheW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmlzUEJBID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0aGlzLmlzUEJBKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH1cbiAgfVxuXG4gIGNoa0lzc3VlUmVmdW5kQnRuRW5hYmxlKHBheW1lbnQ6IElQYXltZW50KTogYm9vbGVhbiB7XG4gICAgaWYgKHBheW1lbnQgIT09IG51bGwgJiYgcGF5bWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcGF5bWVudC5pc3N1ZV9yZWZ1bmQgJiYgcGF5bWVudC5yZWZ1bmRfZW5hYmxlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gaWYgKHRoaXMuY2hlY2s0QWxsb3dlZFJvbGVzMkFjY2Vzc1JlZnVuZCgpICYmIHRoaXMuYWxsb3dGdXJ0aGVyQWNjZXNzQWZ0ZXI0RGF5cyhwYXltZW50KSAmJlxuICAgIC8vICAgcGF5bWVudC5tZXRob2QgPT09ICdwYXltZW50IGJ5IGFjY291bnQnICYmIHBheW1lbnQuc3RhdHVzLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICdzdWNjZXNzJykge1xuICAgIC8vICAgdGhpcy5pc0lzc3VlUmVmdW5mQnRuRW5hYmxlID0gdHJ1ZTtcbiAgICAvLyB9XG4gICAgLy8gaWYgKHRoaXMuaXNJc3N1ZVJlZnVuZkJ0bkVuYWJsZSkge1xuICAgIC8vICAgcmV0dXJuIHRydWU7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHJldHVybiBmYWxzZTtcbiAgICAvLyB9O1xuICB9XG5cbiAgY2hrSXNSZWZ1bmRSZW1pc3Npb25CdG5FbmFibGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMub3JkZXJEZXRhaWwgIT09IG51bGwgJiYgIHRoaXMub3JkZXJEZXRhaWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZSA9IHRydWU7XG4gICAgdGhpcy5vcmRlckRldGFpbC5mb3JFYWNoKG9yZGVyRGV0YWlsID0+IHtcbiAgICAgIGlmIChvcmRlckRldGFpbC5wYXltZW50cykge1xuICAgICAgICBvcmRlckRldGFpbC5wYXltZW50cy5mb3JFYWNoKHBheW1lbnQgPT4ge1xuICAgICAgICAgIGlmIChwYXltZW50Lm1ldGhvZC50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAncGF5bWVudCBieSBhY2NvdW50JyAmJiBwYXltZW50LnN0YXR1cy50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnc3VjY2VzcycgJiYgdGhpcy5hbGxvd0Z1cnRoZXJBY2Nlc3NBZnRlcjREYXlzKHBheW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmlzUmVmdW5kUmVtaXNzaW9uQnRuRW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0aGlzLmlzUmVmdW5kUmVtaXNzaW9uQnRuRW5hYmxlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH1cbiAgfVxuXG4gIGNoZWNrNEFsbG93ZWRSb2xlczJBY2Nlc3NSZWZ1bmQgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHRoaXMuYWxsb3dlZFJvbGVzVG9BY2Nlc3NSZWZ1bmQuc29tZShyb2xlID0+XG4gICAgICB0aGlzLkxPR0dFRElOVVNFUlJPTEVTLmluZGV4T2Yocm9sZSkgIT09IC0xXG4gICAgKTtcbiAgfVxuICBjaGVjazRBbGxvd2VkUm9sZXMyQWNjZXNzUEJBcGF5bWVudCA9ICgpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gdGhpcy5pc0VsaWdpYmxlNFBCQVBheW1lbnQuc29tZShyb2xlID0+XG4gICAgICB0aGlzLkxPR0dFRElOVVNFUlJPTEVTLmluZGV4T2Yocm9sZSkgIT09IC0xXG4gICAgKTtcbiAgfVxuXG4gIGFsbG93RnVydGhlckFjY2Vzc0FmdGVyNERheXMgPSAocGF5bWVudDogSVBheW1lbnQpOiBib29sZWFuID0+IHtcbiAgICBpZiAocGF5bWVudCAhPT0gbnVsbCAmJiBwYXltZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICBsZXQgdG1wNERheUFnbyA9IG5ldyBEYXRlKCk7XG4gICAgdG1wNERheUFnby5zZXREYXRlKHRtcDREYXlBZ28uZ2V0RGF0ZSgpIC0gNCk7XG4gICAgcmV0dXJuIHRtcDREYXlBZ28gPj0gbmV3IERhdGUocGF5bWVudC5kYXRlX2NyZWF0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIGxvYWRQQkFBY2NvdW50UGFnZShvcmRlclJlZjogSVBheW1lbnQpIHtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQucGJhUGF5T3JkZXJSZWYgPSBvcmRlclJlZjtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAncGJhLXBheW1lbnQnO1xuICB9XG59XG4iLCI8IS0tIDxkaXYgY2xhc3M9XCJnb3Z1ay13aWR0aC1jb250YWluZXJcIj4gLS0+XG4gIDwhLS0gPG1haW4gY2xhc3M9XCJnb3Z1ay1tYWluLXdyYXBwZXJcIj4gLS0+XG48ZGl2PlxuICA8bWFpbj5cbiAgICA8bmctY29udGFpbmVyICAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdtYWluMSdcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJ2aWV3U3RhdHVzID09PSAnbWFpbjEnJiYgIWlzVHVybk9mZiAmJiB0YWtlUGF5bWVudFwiPlxuICAgICAgICAgIDxkaXYgICAqbmdJZj1cInRha2VQYXltZW50XCIgY2xhc3M9XCJnb3Z1ay1ncmlkLXJvd1wiPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tdHdvLXRoaXJkc1wiPlxuICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLXhsXCI+Q2FzZSB0cmFuc2FjdGlvbnM8L2gxPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2ICAgKm5nSWY9XCJ0YWtlUGF5bWVudFwiIGNsYXNzPVwiZ292dWstZ3JpZC1yb3dcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9JyFpc0V4Y2VwdGlvblJlY29yZCcgY2xhc3M9XCJnb3Z1ay1ncmlkLWNvbHVtbi10d28tdGhpcmRzIGdvdnVrLSEtcGFkZGluZy1ib3R0b20tNiBnb3Z1ay0hLXBhZGRpbmctdG9wLTZcIj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiaGVhZGluZy1tZWRpdW1cIj5DQ0QgcmVmZXJlbmNlOjwvaDM+XG4gICAgICAgICAgICAgIDxzcGFuPiB7eyBjY2RDYXNlTnVtYmVyIHwgY2NkSHlwaGVucyB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPSdpc0V4Y2VwdGlvblJlY29yZCcgY2xhc3M9XCJnb3Z1ay1ncmlkLWNvbHVtbi10d28tdGhpcmRzIGdvdnVrLSEtcGFkZGluZy1ib3R0b20tNiBnb3Z1ay0hLXBhZGRpbmctdG9wLTZcIj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiaGVhZGluZy1tZWRpdW1cIj5FeGNlcHRpb24gcmVmZXJlbmNlOjwvaDM+XG4gICAgICAgICAgICAgIDxzcGFuPiB7eyBjY2RDYXNlTnVtYmVyIHwgY2NkSHlwaGVucyB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGwgZ292dWstIS1wYWRkaW5nLWJvdHRvbS0zXCI+XG4gICAgICAgICAgICAgIDxociBjbGFzcz1cImdvdnVrLXNlY3Rpb24tYnJlYWsgZ292dWstc2VjdGlvbi1icmVhay0tdmlzaWJsZVwiPlxuICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPlRvdGFsIHBheW1lbnRzPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+VG90YWwgcmVtaXNzaW9uczwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkFtb3VudCBkdWU8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGdvdnVrLXRhYmxlX19oZWFkZXItLWN1c3RvbVwiIHNjb3BlPVwiY29sXCIgKm5nSWY9XCJpc0J1bGtTY2FuRW5hYmxlXCI+VW5hbGxvY2F0ZWQgcGF5bWVudHM8L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJ0b3RhbHBheW1lbnRzIGdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgc3VtbWFyeS10YWJsZS1mb250XCI+e3sgdG90YWxQYXltZW50cyB8IGN1cnJlbmN5IDonR0JQJzonc3ltYm9sJzonMS4yLTInIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgc3VtbWFyeS10YWJsZS1mb250XCI+e3sgdG90YWxSZW1pc3Npb25zIHwgY3VycmVuY3kgOidHQlAnOidzeW1ib2wnOicxLjItMicgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBzdW1tYXJ5LXRhYmxlLWZvbnRcIj57eyBjbEFtb3VudER1ZSB8IGN1cnJlbmN5IDonR0JQJzonc3ltYm9sJzonMS4yLTInfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBjYXNlLXRyYW5zYWN0aW9uX19jb2xvciBzdW1tYXJ5LXRhYmxlLWZvbnRcIiAqbmdJZj1cImlzQnVsa1NjYW5FbmFibGVcIj57e3VucHJvY2Vzc2VkUmVjb3JkQ291bnR9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLXR3by10aGlyZHNcIiAqbmdJZj1cInRha2VQYXltZW50XCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIChjbGljayk9XCJyZWRpcmVjdFRvRmVlU2VhcmNoUGFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWlzQWRkRmVlQnRuRW5hYmxlZFwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPSchaXNBZGRGZWVCdG5FbmFibGVkID8gXCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnkgZ292dWstYnV0dG9uLS1kaXNhYmxlZCBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCIgOiBcImdvdnVrLWJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeSBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCInPlxuICAgICAgICAgICAgICAgIFRha2UgdGVsZXBob255IHBheW1lbnRcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1yb3dcIj5cblxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgICpuZ0lmPVwidGFrZVBheW1lbnRcIiBjbGFzcz1cIiBnb3Z1ay0hLW1hcmdpbi10b3AtOVwiPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1yb3dcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+RmVlczwvaDM+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tZnVsbFwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cImdvdnVrLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5Db2RlPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+RGVzY3JpcHRpb248L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5Wb2x1bWU8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5GZWUgYW1vdW50PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+Q2FsY3VsYXRlZCBhbW91bnQ8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5BbW91bnQgZHVlPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+QWN0aW9uPC90ZD5cblxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiICpuZ0Zvcj1cImxldCBwYXltZW50R3JvdXAgb2YgcGF5bWVudEdyb3VwcztcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICpuZ0Zvcj1cImxldCBmZWUgb2YgcGF5bWVudEdyb3VwLmZlZXM7IGxldCBpID0gaW5kZXg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj5cdHt7ZmVlLmNvZGV9fSA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3tmZWUuZGVzY3JpcHRpb259fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57e2ZlZS52b2x1bWU/IGZlZS52b2x1bWUgOiAnLSd9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57eyBmZWUubmV0X2Ftb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7ZmVlLmNhbGN1bGF0ZWRfYW1vdW50IHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiICBbYXR0ci5yb3dzcGFuXT1cInBheW1lbnRHcm91cC5mZWVzLmxlbmd0aFwiICpuZ0lmPVwicGF5bWVudEdyb3VwLm9sZCAmJiBpPT0wXCI+IHt7Z2V0R3JvdXBPdXRzdGFuZGluZ0Ftb3VudChwYXltZW50R3JvdXApfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJ319KiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCIgKm5nSWY9XCIhcGF5bWVudEdyb3VwLm9sZFwiPiB7e2NhbGN1bGF0ZUFtb3VudER1ZShmZWUpIHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMid9fSA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCIgKm5nSWY9XCIhcGF5bWVudEdyb3VwLm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cImNvbmZpcm1SZW1vdmVGZWUoZmVlLmlkKVwiIFtuZ0NsYXNzXT0nIWlzQ2hlY2tBbW91bnRkdWVFeGlzdChmZWUuYW1vdW50X2R1ZSkgfHwgZmVlLnJlbWlzc2lvbnMgPyBcImRpc2FibGUtbGlua1wiIDogXCJcIic+UmVtb3ZlPC9hPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIiAqbmdJZj1cInBheW1lbnRHcm91cC5vbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJjb25maXJtUmVtb3ZlRmVlKGZlZS5pZClcIiBbbmdDbGFzc109J3BheW1lbnRHcm91cC5wYXltZW50cz8ubGVuZ3RoID4gMCB8fCBwYXltZW50R3JvdXAucmVtaXNzaW9ucz8ubGVuZ3RoID4gMCA/IFwiZGlzYWJsZS1saW5rXCIgOiBcIlwiJz5SZW1vdmU8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAqbmdJZj1cInBheW1lbnRHcm91cHM/Lmxlbmd0aCA9PT0gMFwiPlxuICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCIgPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCIgY29sc3Bhbj1cIjdcIj5ObyBmZWVzIHJlY29yZGVkPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJobWN0cy1iYW5uZXJcIiAqbmdJZj1cImlzSGlzdG9yaWNHcm91cEF2YWlsYWJsZVwiPlxuICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaG1jdHMtYmFubmVyX19pY29uXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiBmb2N1c2FibGU9XCJmYWxzZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI1IDI1XCIgaGVpZ2h0PVwiMjVcIiB3aWR0aD1cIjI1XCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEzLjcsMTguNWgtMi40di0yLjRoMi40VjE4LjV6IE0xMi41LDEzLjdjLTAuNywwLTEuMi0wLjUtMS4yLTEuMlY3LjdjMC0wLjcsMC41LTEuMiwxLjItMS4yczEuMiwwLjUsMS4yLDEuMnY0LjhcbiAgICAgICAgICAgICAgICBDMTMuNywxMy4yLDEzLjIsMTMuNywxMi41LDEzLjd6IE0xMi41LDAuNWMtNi42LDAtMTIsNS40LTEyLDEyczUuNCwxMiwxMiwxMnMxMi01LjQsMTItMTJTMTkuMSwwLjUsMTIuNSwwLjV6XCI+PC9wYXRoPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhtY3RzLWJhbm5lcl9fbWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaG1jdHMtYmFubmVyX19hc3Npc3RpdmVcIj5pbmZvcm1hdGlvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAqIFRoZXNlIGZlZXMgaGF2ZSBhbHJlYWR5IGJlZW4gcHJvY2Vzc2VkIG9mZmxpbmUuIENoZWNrIHRoZSBub3RlcyBpbiBDQ0QgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtbm8tLXN0eWxlXCIgKm5nSWY9XCJhbGxQYXltZW50cz8ubGVuZ3RoID4gMCB8fCByZW1pc3Npb25zPy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICAgICAgPCEtLSBwYXltZW50cyAtLT5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bVwiPlBheW1lbnRzPC9oMz5cbiAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cImdvdnVrLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC0yOFwiIHNjb3BlPVwiY29sXCI+UGF5bWVudCByZWZlcmVuY2U8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5EYXRlIGNyZWF0ZWQ8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5DaGFubmVsPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+TWV0aG9kPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtMTVcIiBzY29wZT1cImNvbFwiPkFtb3VudDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkFsbG9jYXRpb24gc3RhdHVzPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+UGF5bWVudCBzdGF0dXM8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAqbmdJZj1cImFsbFBheW1lbnRzPy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICAqbmdGb3I9XCJsZXQgcGF5bWVudCBvZiBhbGxQYXltZW50c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cImdvVG9QYXllbWVudFZpZXcocGF5bWVudC5wYXltZW50R3JvdXBSZWZlcmVuY2UsIHBheW1lbnQucmVmZXJlbmNlLCBwYXltZW50Lm1ldGhvZClcIj57eyBwYXltZW50LnJlZmVyZW5jZSB9fTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcGF5bWVudC5kYXRlX2NyZWF0ZWQgfCBkYXRlOidkZCBNTU0geXl5eScgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJjaGFubmVsIGdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7IHBheW1lbnQuY2hhbm5lbCB8IGxvd2VyY2FzZSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGNhcGl0YWxpemUgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcGF5bWVudC5tZXRob2QgfCBsb3dlcmNhc2V9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7IHBheW1lbnQuYW1vdW50IHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj4ge3tnZXRBbGxvY2F0aW9uU3RhdHVzKHBheW1lbnQpfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyBwYXltZW50LnN0YXR1cyB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiICpuZ0lmPVwiYWxsUGF5bWVudHM/Lmxlbmd0aCA9PT0gMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCIgY29sc3Bhbj1cIjdcIj5ObyBwYXltZW50cyByZWNvcmRlZDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuXG4gICAgICAgICAgICAgICAgICA8IS0tIHJlbWlzc2lvbnMgLS0+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bVwiPlJlbWlzc2lvbnM8L2gzPlxuICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPlJlbWlzc2lvbiByZWZlcmVuY2U8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5EYXRlIGNyZWF0ZWQ8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5SZW1pc3Npb24gY29kZTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkZlZSBjb2RlPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+UmVtaXNzaW9uIGFtb3VudDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiICpuZ0lmPVwicmVtaXNzaW9ucz8ubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIiAqbmdGb3I9XCJsZXQgcmVtaXNzaW9uIG9mIHJlbWlzc2lvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcmVtaXNzaW9uLnJlbWlzc2lvbl9yZWZlcmVuY2UgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyByZW1pc3Npb24uZGF0ZV9jcmVhdGVkIHwgZGF0ZTonZGQgTU1NIHl5eXknIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcmVtaXNzaW9uLmh3Zl9yZWZlcmVuY2UgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyByZW1pc3Npb24uZmVlX2NvZGUgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyByZW1pc3Npb24uaHdmX2Ftb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAqbmdJZj1cInJlbWlzc2lvbnM/Lmxlbmd0aCA9PT0gMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCIgY29sc3Bhbj1cIjVcIj5ObyByZW1pc3Npb25zIHJlY29yZGVkPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2ICAqbmdJZj1cInRha2VQYXltZW50ICYmIGlzVHVybk9mZlwiPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLWNvbHVtbi10d28tdGhpcmRzXCI+XG4gICAgICAgICAgPGgxIGNsYXNzPVwiZ292dWstaGVhZGluZy14bFwiPkNhc2UgdHJhbnNhY3Rpb25zPC9oMT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiAgY2xhc3M9XCJnb3Z1ay1ncmlkLWNvbHVtbi1vbmUtdGhpcmRcIiBhbGlnbj1cInJpZ2h0XCIgPlxuICAgICAgICAgIDxhIFtuZ0NsYXNzXT1cInsgJ2Rpc2FibGUnOiAhaXNBZGRGZWVCdG5FbmFibGVkfSBcIiAoY2xpY2spPVwicmVkaXJlY3RUb0ZlZVNlYXJjaFBhZ2UoJGV2ZW50KVwiIGNsYXNzPVwiYnV0dG9uXCI+QWRkIGEgbmV3IGZlZTwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLWNvbHVtbi10d28tdGhpcmRzIGdvdnVrLSEtcGFkZGluZy1ib3R0b20tNlwiPlxuICAgICAgICAgIDxoMyBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+Q0NEIHJlZmVyZW5jZTo8L2gzPlxuICAgICAgICAgIDxzcGFuPiB7eyBjY2RDYXNlTnVtYmVyIHwgY2NkSHlwaGVucyB9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGwgZ292dWstIS1wYWRkaW5nLWJvdHRvbS0zXCI+XG4gICAgICAgICAgPGhyIGNsYXNzPVwiZ292dWstc2VjdGlvbi1icmVhayBnb3Z1ay1zZWN0aW9uLWJyZWFrLS12aXNpYmxlXCI+XG4gICAgICAgICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgICAgICAgIDx0aGVhZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkXCI+XG4gICAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5Ub3RhbCBwYXltZW50czwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+VG90YWwgcmVtaXNzaW9uczwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+QW1vdW50IGR1ZTwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIj5cbiAgICAgICAgICAgICAgPHRyIGNsYXNzPVwidG90YWxwYXltZW50cyBnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57eyB0b3RhbFBheW1lbnRzIHwgY3VycmVuY3kgOidHQlAnOidzeW1ib2wnOicxLjItMicgfX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3sgdG90YWxSZW1pc3Npb25zIHwgY3VycmVuY3kgOidHQlAnOidzeW1ib2wnOicxLjItMicgfX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3sgKHRvdGFsRmVlcyAtIHRvdGFsUmVtaXNzaW9ucykgLSB0b3RhbFBheW1lbnRzIHwgY3VycmVuY3kgOidHQlAnOidzeW1ib2wnOicxLjItMid9fTwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cblxuICAgICAgPCEtLSBObyBmZWVzIHN0YXJ0IC0tPlxuICAgICAgPGRpdiAqbmdJZj1cInBheW1lbnRHcm91cHM/Lmxlbmd0aCA9PT0gMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1yb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tZnVsbFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWFkaW5nLXNtYWxsXCI+RXhpc3RpbmcgZmVlczwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLWNvbHVtbi1mdWxsXCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZVwiPlxuICAgICAgICAgICAgICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+Q29kZTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+RGVzY3JpcHRpb248L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPlZvbHVtZTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+RmVlIGFtb3VudDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+Q2FsY3VsYXRlZCBhbW91bnQ8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkdyb3VwIGFtb3VudCBvdXRzdGFuZGluZzwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCI+XG4gICAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiIGNvbHNwYW49XCI2XCI+Tm8gZmVlcyByZWNvcmRlZDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8IS0tIE5vIGZlZXMgZW5kIC0tPlxuXG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBwYXltZW50R3JvdXAgb2YgcGF5bWVudEdyb3Vwc1wiPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1yb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGwgZ292dWstZ3JpZC1jb2x1bW4tZnVsbC0tZ3JcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+R3JvdXAgcmVmZXJlbmNlOiB7e3BheW1lbnRHcm91cC5wYXltZW50X2dyb3VwX3JlZmVyZW5jZX19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1yb3dcIj5cblxuICAgICAgICAgIDwhLS1OZXcgQ29kZSBzdGFydC0tPlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGxcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVhZGluZy1zbWFsbFwiPkV4aXNpdGluZyBmZWVzPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9ZmVlY2xhc3M+XG4gICAgICAgICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgICAgICAgIDx0aGVhZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkXCI+XG4gICAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkNvZGU8L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5EZXNjcmlwdGlvbjwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPlZvbHVtZTwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkZlZSBhbW91bnQ8L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5DYWxjdWxhdGVkIGFtb3VudDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdyb3VwYW1vdW50IGdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkdyb3VwIGFtb3VudCBvdXRzdGFuZGluZzwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCIgPlxuICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICAqbmdGb3I9XCJsZXQgZmVlIG9mIHBheW1lbnRHcm91cC5mZWVzOyAgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstdGFibGVfX2NlbGwtLWNvbDFcIj57e2ZlZS5jb2RlfX08L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay10YWJsZV9fY2VsbC0tY29sMlwiPiB7e2ZlZS5kZXNjcmlwdGlvbn19IDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLXRhYmxlX19jZWxsLS1jb2wzIGFsaWduLWNlbnRlclwiPiB7e2ZlZS52b2x1bWU/IGZlZS52b2x1bWUgOiAnLSd9fSA8L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay10YWJsZV9fY2VsbC0tY29sNFwiPiB7eyBmZWUubmV0X2Ftb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInIH19IDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLXRhYmxlX19jZWxsLS1jb2w1XCI+IHt7ZmVlLmNhbGN1bGF0ZWRfYW1vdW50IHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgfX0gPC90ZD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstdGFibGVfX2NlbGwtLWNvbDYgZ292dWstdGFibGVfX2N1c3RvbS0tY29sNlwiIFthdHRyLnJvd3NwYW5dPVwicGF5bWVudEdyb3VwLmZlZXMubGVuZ3RoXCIgKm5nSWY9XCJpPT0wXCI+XG4gICAgICAgICAgICAgICAge3tnZXRHcm91cE91dHN0YW5kaW5nQW1vdW50KHBheW1lbnRHcm91cCkgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJyB9fSA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiICpuZ0lmPVwicGF5bWVudEdyb3VwLmZlZXMubGVuZ3RoPT0wXCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiIGNvbHNwYW49XCI2XCI+Tm8gcGF5bWVudHMgcmVjb3JkZWQ8L3RkPlxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstaW5zZXQtdGV4dCBnb3Z1ay1pbnNldC10ZXh0X19uby1ib3JkZXJcIiAqbmdJZj1cInBheW1lbnRHcm91cC5wYXltZW50cyB8fCBwYXltZW50R3JvdXAucmVtaXNzaW9uc1wiPlxuICAgICAgICA8ZGV0YWlscz5cbiAgICAgICAgICA8c3VtbWFyeSBjbGFzcz1cImdvdnVrLWhpZGV0ZXh0XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzdW1tYXJ5XCI+QWxsb2NhdGVkIHBheW1lbnRzIGFuZCByZW1pc3Npb25zPC9zcGFuPlxuICAgICAgICAgIDwvc3VtbWFyeT5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWJvcmRlci1uYXJyb3dcIj5cbiAgICAgICAgICAgICAgICA8IS0tIHBheW1lbnRzIC0tPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVhZGluZy1tZWRpdW1cIj5QYXltZW50czwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cImdvdnVrLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5QYXltZW50IHJlZmVyZW5jZTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkRhdGUgY3JlYXRlZDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkNoYW5uZWw8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5NZXRob2Q8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5BbW91bnQ8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5BbGxvY2F0aW9uIHN0YXR1czwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPlN0YXR1czwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiICpuZ0lmPVwicGF5bWVudEdyb3VwLnBheW1lbnRzPy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICAqbmdGb3I9XCJsZXQgcGF5bWVudCBvZiBwYXltZW50R3JvdXAucGF5bWVudHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnb1RvUGF5ZW1lbnRWaWV3KHBheW1lbnRHcm91cC5wYXltZW50X2dyb3VwX3JlZmVyZW5jZSwgcGF5bWVudC5yZWZlcmVuY2UsIHBheW1lbnQubWV0aG9kKVwiPnt7IHBheW1lbnQucmVmZXJlbmNlIH19PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyBwYXltZW50LmRhdGVfY3JlYXRlZCB8IGRhdGU6J2RkIE1NTSB5eXl5JyB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNoYW5uZWwgZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcGF5bWVudC5jaGFubmVsIHwgbG93ZXJjYXNlIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgY2FwaXRhbGl6ZSB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyBwYXltZW50Lm1ldGhvZCB8IGxvd2VyY2FzZX19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcGF5bWVudC5hbW91bnQgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj4ge3tnZXRBbGxvY2F0aW9uU3RhdHVzKHBheW1lbnQpfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyBwYXltZW50LnN0YXR1cyB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiICpuZ0lmPVwicGF5bWVudEdyb3VwLnBheW1lbnRzPy5sZW5ndGggPT09IDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiIGNvbHNwYW49XCI2XCI+Tm8gcGF5bWVudHMgcmVjb3JkZWQ8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgPC90YWJsZT5cblxuICAgICAgICAgICAgICAgICAgPCEtLSByZW1pc3Npb25zIC0tPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWFkaW5nLW1lZGl1bVwiPlJlbWlzc2lvbnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+UmVtaXNzaW9uIHJlZmVyZW5jZTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkRhdGUgY3JlYXRlZDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPlJlbWlzc2lvbiBjb2RlPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+RmVlIGFwcGxpZWQgYWdhaW5zdDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPlJlbWlzc2lvbiBhbW91bnQ8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAqbmdJZj1cInBheW1lbnRHcm91cC5yZW1pc3Npb25zPy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICpuZ0Zvcj1cImxldCByZW1pc3Npb24gb2YgcGF5bWVudEdyb3VwLnJlbWlzc2lvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcmVtaXNzaW9uLnJlbWlzc2lvbl9yZWZlcmVuY2UgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyByZW1pc3Npb24uZGF0ZV9jcmVhdGVkIHwgZGF0ZTonZGQgTU1NJyB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7IHJlbWlzc2lvbi5od2ZfcmVmZXJlbmNlIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcmVtaXNzaW9uLmZlZV9jb2RlIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcmVtaXNzaW9uLmh3Zl9hbW91bnQgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAqbmdJZj1cInBheW1lbnRHcm91cC5yZW1pc3Npb25zPy5sZW5ndGggPT09IDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiIGNvbHNwYW49XCI1XCI+Tm8gcmVtaXNzaW9ucyByZWNvcmRlZDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICA8L2RldGFpbHM+XG5cblxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJ0YWtlUGF5bWVudFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiAoY2xpY2spPVwibG9hZEZlZVN1bW1hcnlQYWdlKHBheW1lbnRHcm91cClcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIoZ2V0R3JvdXBPdXRzdGFuZGluZ0Ftb3VudChwYXltZW50R3JvdXApIDw9IDAgfHwgaXNVbnByb2Nlc3NlZFJlY29yZFNlbGVjdGVkKVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPScoZ2V0R3JvdXBPdXRzdGFuZGluZ0Ftb3VudChwYXltZW50R3JvdXApIDw9IDAgfHwgaXNVbnByb2Nlc3NlZFJlY29yZFNlbGVjdGVkKSA/IFwiZ292dWstYnV0dG9uIGdvdnVrLWJ1dHRvbi0tc2Vjb25kYXJ5IGdvdnVrLWJ1dHRvbi0tZGlzYWJsZWQgZ292dWstIS1tYXJnaW4tcmlnaHQtMVwiIDogXCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnkgZ292dWstIS1tYXJnaW4tcmlnaHQtMVwiJz5cbiAgICAgICAgICAgICAgICAgIEFkZCB0ZWxlcGhvbmUgcGF5bWVudFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgICAgPGNjcGF5LWFwcC11bnByb2Nlc3NlZC1wYXltZW50c1xuICAgICAgICAqbmdJZj1cImlzQnVsa1NjYW5FbmFibGVcIlxuICAgICAgICBbSVNfQlVUVE9OX0VOQUJMRV09XCJ0YWtlUGF5bWVudFwiXG4gICAgICAgIFtMRVZFTF09XCI1XCJcbiAgICAgICAgW1BBWU1FTlRTTEVOR1RIXT1cImFsbFBheW1lbnRzPy5sZW5ndGhcIlxuICAgICAgICBbUEFZTUVOVFJFRl09XCJwYXltZW50UmVmXCJcbiAgICAgICAgW0lTVFVSTk9GRl09XCJpc1R1cm5PZmZcIlxuICAgICAgICBbSVNTRkVOQUJMRV09XCJpc1N0cmF0ZWdpY0ZpeEVuYWJsZVwiXG4gICAgICAgIFtGRUVfUkVDT1JEU19FWElTVFNdPVwiaXNGZWVSZWNvcmRzRXhpc3RcIlxuICAgICAgICAoZ2V0VW5wcm9jZXNzZWRGZWVDb3VudCkgPSBcImdldFVucHJvY2Vzc2VkRmVlQ291bnQoJGV2ZW50KVwiXG4gICAgICAgIFtJU19PU19BTVRfQVZBSUxBQkxFXT1cImlzR3JwT3V0c3RhbmRpbmdBbXRQb3NpdGl2ZVwiXG4gICAgICAgIChzZWxlY3RlZFVucHJvY2Vzc2VkRmVlRXZlbnQpID0gXCJzZWxlY3RlZFVucHJvY2Vzc2VkRmVlRXZlbnQoJGV2ZW50KVwiPlxuICAgICAgPC9jY3BheS1hcHAtdW5wcm9jZXNzZWQtcGF5bWVudHM+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1yb3cgZ292dWstZ3JpZF9fc3VycGx1cy1wYXltZW50c1wiICAqbmdJZj1cInRvdGFsUmVmdW5kQW1vdW50ID4gMCAmJiB0YWtlUGF5bWVudFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tZnVsbCBnb3Z1ay1ncmlkX19zdXJwbHVzLXBheW1lbnRzLWNvbDFcIj5cbiAgICAgICAgICA8aDMgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bVwiPlN1cnBsdXMgcGF5bWVudHM8L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGxcIj5cbiAgICAgICAgICBUb3RhbCBzdXJwbHVzIHBheW1lbnRzIHJlY2VpdmVkOiB7e3RvdGFsUmVmdW5kQW1vdW50IHwgY3VycmVuY3kgOidHQlAnOidzeW1ib2wnOicxLjItMid9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgICpuZ0lmPVwidGFrZVBheW1lbnRcIj5cbiAgICAgICAgPGNjcGF5LWFwcC11bnByb2Nlc3NlZC1wYXltZW50c1xuICAgICAgICAqbmdJZj1cImlzQnVsa1NjYW5FbmFibGUgJiYgIXRha2VQYXltZW50XCJcbiAgICAgICAgW0lTX0JVVFRPTl9FTkFCTEVdPVwidGFrZVBheW1lbnRcIlxuICAgICAgICBbTEVWRUxdPVwiMVwiXG4gICAgICAgIFtJU1RVUk5PRkZdPVwiaXNUdXJuT2ZmXCJcbiAgICAgICAgW0lTU0ZFTkFCTEVdPVwiaXNTdHJhdGVnaWNGaXhFbmFibGVcIlxuICAgICAgICBbRkVFX1JFQ09SRFNfRVhJU1RTXT1cImlzRmVlUmVjb3Jkc0V4aXN0XCJcbiAgICAgICAgW0lTX09TX0FNVF9BVkFJTEFCTEVdPVwiaXNHcnBPdXRzdGFuZGluZ0FtdFBvc2l0aXZlXCJcbiAgICAgICAgKGdldFVucHJvY2Vzc2VkRmVlQ291bnQpID0gXCJnZXRVbnByb2Nlc3NlZEZlZUNvdW50KCRldmVudClcIlxuICAgICAgICBbUEFZTUVOVFNMRU5HVEhdPVwiYWxsUGF5bWVudHM/Lmxlbmd0aFwiXG4gICAgICAgIFtQQVlNRU5UUkVGXT1cInBheW1lbnRSZWZcIlxuICAgICAgICAoc2VsZWN0ZWRVbnByb2Nlc3NlZEZlZUV2ZW50KSA9IFwic2VsZWN0ZWRVbnByb2Nlc3NlZEZlZUV2ZW50KCRldmVudClcIj5cbiAgICAgICAgPC9jY3BheS1hcHAtdW5wcm9jZXNzZWQtcGF5bWVudHM+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiAqbmdJZj1cIiF0YWtlUGF5bWVudFwiIGNsYXNzPVwiZ292dWstZ3JpZC1yb3cgZ292dWstZ3JpZF9fc3VycGx1cy1wYXltZW50c1wiPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLWNvbHVtbi1mdWxsXCI+XG5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+UGF5bWVudHM8L3NwYW4+XG4gICAgICAgICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgICAgICAgICAgPHRoZWFkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLTEzXCIgc2NvcGU9XCJjb2xcIj5TdGF0dXM8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC0xMFwiIHNjb3BlPVwiY29sXCI+QW1vdW50PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtMTRcIiBzY29wZT1cImNvbFwiPkRhdGUgYWxsb2NhdGVkPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtMjBcIiBzY29wZT1cImNvbFwiPlJlcXVlc3QgcmVmZXJlbmNlPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtOVwiIHNjb3BlPVwiY29sXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCIgKm5nSWY9XCJhbGxQYXltZW50cz8ubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIiAgKm5nRm9yPVwibGV0IHBheW1lbnQgb2YgYWxsUGF5bWVudHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgY29sLTEzIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7IHBheW1lbnQuc3RhdHVzIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgY29sLTEwIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7IHBheW1lbnQuYW1vdW50IHwgY3VycmVuY3kgOidHQlAnOidzeW1ib2wnOicxLjItMicgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBjb2wtMTcgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcGF5bWVudC5kYXRlX2NyZWF0ZWQgfCBkYXRlOidkZCBNTU0geXl5eSBISDptbTpzcycgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBjb2wtMjQgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcGF5bWVudC5wYXltZW50R3JvdXBSZWZlcmVuY2UgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBjb2wtMTMgd2hpdGVzcGFjZS1pbmhlcml0XCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cImdvVG9QYXllbWVudFZpZXcocGF5bWVudC5wYXltZW50R3JvdXBSZWZlcmVuY2UsIHBheW1lbnQucmVmZXJlbmNlLCBwYXltZW50Lm1ldGhvZClcIj5SZXZpZXc8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8Y2NwYXktYXBwLXVucHJvY2Vzc2VkLXBheW1lbnRzIGNsYXNzPVwiZ292dWstdGFibGVcIlxuICAgICAgICAgICAgKm5nSWY9XCJpc0J1bGtTY2FuRW5hYmxlICYmICF0YWtlUGF5bWVudFwiXG4gICAgICAgICAgICBbSVNfQlVUVE9OX0VOQUJMRV09XCJ0YWtlUGF5bWVudFwiXG4gICAgICAgICAgICBbTEVWRUxdPVwiMlwiXG4gICAgICAgICAgICBbSVNUVVJOT0ZGXT1cImlzVHVybk9mZlwiXG4gICAgICAgICAgICBbSVNTRkVOQUJMRV09XCJpc1N0cmF0ZWdpY0ZpeEVuYWJsZVwiXG4gICAgICAgICAgICBbRkVFX1JFQ09SRFNfRVhJU1RTXT1cImlzRmVlUmVjb3Jkc0V4aXN0XCJcbiAgICAgICAgICAgIFtJU19PU19BTVRfQVZBSUxBQkxFXT1cImlzR3JwT3V0c3RhbmRpbmdBbXRQb3NpdGl2ZVwiXG4gICAgICAgICAgICBbUEFZTUVOVFNMRU5HVEhdPVwiYWxsUGF5bWVudHM/Lmxlbmd0aFwiXG4gICAgICAgICAgICBbUEFZTUVOVFJFRl09XCJwYXltZW50UmVmXCJcbiAgICAgICAgICAgIChnZXRVbnByb2Nlc3NlZEZlZUNvdW50KSA9IFwiZ2V0VW5wcm9jZXNzZWRGZWVDb3VudCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChzZWxlY3RlZFVucHJvY2Vzc2VkRmVlRXZlbnQpID0gXCJzZWxlY3RlZFVucHJvY2Vzc2VkRmVlRXZlbnQoJGV2ZW50KVwiPlxuICAgICAgICA8L2NjcGF5LWFwcC11bnByb2Nlc3NlZC1wYXltZW50cz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuPCEtLU9yZGVyIENhc2UgVHJhbnNhY3Rpb25zIFBhZ2UtLT5cbiAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3U3RhdHVzID09PSAnbWFpbicgJiYgIWlzVHVybk9mZiAmJiB0YWtlUGF5bWVudFwiPlxuICAgICAgPGRpdj5cblxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxoMSBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLXR3by10aGlyZHMgZ292dWstaGVhZGluZy1sIGdvdnVrLSEtbWFyZ2luLXRvcC0wXCI+Q2FzZSB0cmFuc2FjdGlvbnM8L2gxPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPSchaXNFeGNlcHRpb25SZWNvcmQnIGNsYXNzPVwiIGdvdnVrLSEtbWFyZ2luLWJvdHRvbS02IGFsaWduc2VsZlwiPlxuICAgICAgICAgICAgICAgICA8Yj4gQ2FzZSByZWZlcmVuY2U6IDwvYj57eyBjY2RDYXNlTnVtYmVyIHwgY2NkSHlwaGVucyB9fVxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj0naXNFeGNlcHRpb25SZWNvcmQnIGNsYXNzPVwiZ292dWstIS1tYXJnaW4tYm90dG9tLTMgY29sLTU1IGFsaWduc2VsZlwiID5cbiAgICAgICAgICAgICAgICAgIDxiPiBFeGNlcHRpb24gcmVmZXJlbmNlOjwvYj57eyBjY2RDYXNlTnVtYmVyIHwgY2NkSHlwaGVucyB9fVxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC0yNVwiIHNjb3BlPVwiY29sXCI+VG90YWwgcGF5bWVudHM8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGdvdnVrLXRhYmxlX19oZWFkZXItLWN1c3RvbSBjb2wtMjVcIiBzY29wZT1cImNvbFwiICpuZ0lmPVwiaXNCdWxrU2NhbkVuYWJsZVwiPlVuYWxsb2NhdGVkIHBheW1lbnRzPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtMjVcIiBzY29wZT1cImNvbFwiPlRvdGFsIHJlbWlzc2lvbnM8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC0yMFwiIHNjb3BlPVwiY29sXCI+QW1vdW50IGR1ZTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLTIwXCIgc2NvcGU9XCJjb2xcIj5PdmVyIHBheW1lbnQ8L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJ0b3RhbHBheW1lbnRzIGdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgc3VtbWFyeS10YWJsZS1mb250XCI+e3sgdG90YWxQYXltZW50cyB8IGN1cnJlbmN5IDonR0JQJzonc3ltYm9sJzonMS4yLTInIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgY2FzZS10cmFuc2FjdGlvbl9fY29sb3Igc3VtbWFyeS10YWJsZS1mb250XCIgKm5nSWY9XCJpc0J1bGtTY2FuRW5hYmxlXCI+e3t1bnByb2Nlc3NlZFJlY29yZENvdW50fX08L3RkPlxuXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHN1bW1hcnktdGFibGUtZm9udFwiPnt7IHRvdGFsUmVtaXNzaW9ucyB8IGN1cnJlbmN5IDonR0JQJzonc3ltYm9sJzonMS4yLTInIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgc3VtbWFyeS10YWJsZS1mb250XCI+e3sgY2xBbW91bnREdWUgfCBjdXJyZW5jeSA6J0dCUCc6J3N5bWJvbCc6JzEuMi0yJ319PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgc3VtbWFyeS10YWJsZS1mb250XCI+e3sgb3ZlclBheW1lbnRBbW91bnQgfCBjdXJyZW5jeSA6J0dCUCc6J3N5bWJvbCc6JzEuMi0yJ319PC90ZD5cblxuICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBjbGFzcz0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J09SREVSSURERVRBSUxTJz5cblxuICAgICAgICAgICAgPCEtLVBheW1lbnQgUmVxdWVzdC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYXltZW50cmVxdWVzdFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+U2VydmljZSByZXF1ZXN0czwvc3Bhbj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgIDx0aGVhZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgIGNvbC0xNFwiIHNjb3BlPVwiY29sXCI+U3RhdHVzPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciAgY29sLTEwXCIgc2NvcGU9XCJjb2xcIj5BbW91bnQ8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyICBjb2wtMThcIiBzY29wZT1cImNvbFwiPlBhcnR5PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciAgY29sLTIxXCIgc2NvcGU9XCJjb2xcIj5SZXF1ZXN0IHJlZmVyZW5jZTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgIGNvbC05XCIgc2NvcGU9XCJjb2xcIj48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbFwiIHNjb3BlPVwiY29sXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAgKm5nSWY9XCJvcmRlckxldmVsRmVlcz8ubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IG9yZGVyUmVmIG9mIG9yZGVyTGV2ZWxGZWVzO2xldCBpID0gaW5kZXg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3tvcmRlclJlZi5vcmRlclN0YXR1c319PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyBvcmRlclJlZi5vcmRlclRvdGFsRmVlcyB8IGN1cnJlbmN5IDonR0JQJzonc3ltYm9sJzonMS4yLTInIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nSWY9XCJjcG9EZXRhaWxzICE9PSBudWxsXCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57e2Nwb0RldGFpbHNbJ3Jlc3BvbnNpYmxlUGFydHknXX19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nSWY9XCJjcG9EZXRhaWxzID09PSBudWxsXCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7b3JkZXJSZWYub3JkZXJSZWZJZH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnb1RvT3JkZXJWaWV3RGV0YWlsU2VjdGlvbihvcmRlclJlZilcIj5SZXZpZXc8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgIGNsYXNzPVwiYWxpZ25yaWdodFwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiAoY2xpY2spPVwicmVkaXJlY3RUb09yZGVyRmVlU2VhcmNoUGFnZSgkZXZlbnQsb3JkZXJSZWYpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhb3JkZXJSZWYub3JkZXJBZGRCdG5FbmFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPSchb3JkZXJSZWYub3JkZXJBZGRCdG5FbmFibGUgPyBcImdvdnVrLWJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeSBnb3Z1ay1idXR0b24tLWRpc2FibGVkIGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTFcIiA6IFwiZ292dWstYnV0dG9uIGdvdnVrLWJ1dHRvbi0tc2Vjb25kYXJ5IGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTFcIic+XG4gICAgICAgICAgICAgICAgICAgICAgICBUYWtlIHRlbGVwaG9ueSBwYXltZW50XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keSBhbGlnbmxlZnRcIiAqbmdJZj1cIm9yZGVyTGV2ZWxGZWVzPy5sZW5ndGggPT09IDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCI2XCI+Tm8gc2VydmljZSByZXF1ZXN0cyBvbiB0aGlzIGNhc2UuPC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPCEtLSA8bmctY29udGFpbmVyICpuZ0lmPVwib3JkZXJMZXZlbEZlZXM/Lmxlbmd0aCA9PT0gMFwiPlxuICAgICAgICAgICAgICAgICAgPGJyLz5ObyBzZXJ2aWNlIHJlcXVlc3RzIG9uIHRoaXMgY2FzZS48YnIvPlxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj4gLS0+XG4gICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJyZWRpcmVjdFRvRmVlU2VhcmNoUGFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmRpc2FibGUtbGlua109XCIhaXNBZGRGZWVCdG5FbmFibGVkXCI+Q3JlYXRlIHNlcnZpY2UgcmVxdWVzdCBhbmQgcGF5PC9hPjxici8+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWFkaW5nLW1lZGl1bVwiPjxici8+UGF5bWVudHM8L3NwYW4+XG4gICAgICAgICAgICAgIDxjY3BheS1hcHAtdW5wcm9jZXNzZWQtcGF5bWVudHNcbiAgICAgICAgICAgICAgKm5nSWY9XCJpc0J1bGtTY2FuRW5hYmxlXCJcbiAgICAgICAgICAgICAgW0lTX0JVVFRPTl9FTkFCTEVdPVwidGFrZVBheW1lbnRcIlxuICAgICAgICAgICAgICBbTEVWRUxdPVwiM1wiXG4gICAgICAgICAgICAgIFtQQVlNRU5UU0xFTkdUSF09XCJhbGxQYXltZW50cz8ubGVuZ3RoXCJcbiAgICAgICAgICAgICAgW0lTVFVSTk9GRl09XCJpc1R1cm5PZmZcIlxuICAgICAgICAgICAgICBbSVNTRkVOQUJMRV09XCJpc1N0cmF0ZWdpY0ZpeEVuYWJsZVwiXG4gICAgICAgICAgICAgIFtQQVlNRU5UUkVGXT1cInBheW1lbnRSZWZcIlxuICAgICAgICAgICAgICBbRkVFX1JFQ09SRFNfRVhJU1RTXT1cImlzRmVlUmVjb3Jkc0V4aXN0XCJcbiAgICAgICAgICAgICAgKGdldFVucHJvY2Vzc2VkRmVlQ291bnQpID0gXCJnZXRVbnByb2Nlc3NlZEZlZUNvdW50KCRldmVudClcIlxuICAgICAgICAgICAgICBbSVNfT1NfQU1UX0FWQUlMQUJMRV09XCJpc0dycE91dHN0YW5kaW5nQW10UG9zaXRpdmVcIlxuICAgICAgICAgICAgICAoc2VsZWN0ZWRVbnByb2Nlc3NlZEZlZUV2ZW50KSA9IFwic2VsZWN0ZWRVbnByb2Nlc3NlZEZlZUV2ZW50KCRldmVudClcIj5cbiAgICAgICAgICAgICAgIDwvY2NwYXktYXBwLXVucHJvY2Vzc2VkLXBheW1lbnRzPlxuXG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cImdvdnVrLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCIgKm5nSWY9XCJhbGxQYXltZW50cz8ubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCIgICpuZ0Zvcj1cImxldCBwYXltZW50IG9mIGFsbFBheW1lbnRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBjb2wtMTQgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcGF5bWVudC5zdGF0dXMgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgY29sLTEwIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7IHBheW1lbnQuYW1vdW50IHwgY3VycmVuY3kgOidHQlAnOidzeW1ib2wnOicxLjItMicgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgY29sLTE3IHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7IHBheW1lbnQuZGF0ZV9jcmVhdGVkIHwgZGF0ZTonZGQgTU1NIHl5eXknIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGNvbC0yNCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyBwYXltZW50LnBheW1lbnRHcm91cFJlZmVyZW5jZSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBjb2wtMTMgd2hpdGVzcGFjZS1pbmhlcml0XCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ29Ub1BheWVtZW50VmlldyhwYXltZW50LnBheW1lbnRHcm91cFJlZmVyZW5jZSwgcGF5bWVudC5yZWZlcmVuY2UsIHBheW1lbnQubWV0aG9kKVwiPlJldmlldzwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPC90Ym9keT5cblxuICAgICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAqbmdJZj1cImFsbFBheW1lbnRzPy5sZW5ndGggPT09IDAgJiYgdW5wcm9jZXNzZWRSZWNvcmRDb3VudCA8PSAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiNlwiPk5vIHBheW1lbnRzIHJlY29yZGVkPC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cblxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCIhY2hlY2s0QWxsb3dlZFJvbGVzMkFjY2Vzc1BCQXBheW1lbnQoKVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+PGJyLz5SZWZ1bmRzPC9zcGFuPlxuICAgICAgICAgICAgICA8Y2NwYXktcmVmdW5kLXN0YXR1c1xuICAgICAgICAgICAgICBbY2NkQ2FzZU51bWJlcl09XCJjY2RDYXNlTnVtYmVyXCJcbiAgICAgICAgICAgICAgW2lzVHVybk9mZl09XCJpc1R1cm5PZmZcIlxuICAgICAgICAgICAgICBbb3JkZXJQYXJ0eV09XCJvcmRlclBhcnR5XCJcbiAgICAgICAgICAgICAgW0xPR0dFRElOVVNFUlJPTEVTXT1cIkxPR0dFRElOVVNFUlJPTEVTXCJcbiAgICAgICAgICAgICAgPjwvY2NwYXktcmVmdW5kLXN0YXR1cz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgPC9uZy1jb250YWluZXI+XG5cbiAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGFrZVBheW1lbnQgJiYgdmlld1N0YXR1cyA9PT0gJ21haW4nXCI+XG4gICAgICA8ZGl2ICBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGxcIiBbbmdDbGFzc109J3NlcnZpY2VSZXF1ZXN0VmFsdWUhPT0gXCJmYWxzZVwiID8gXCJnb3Z1ay1tYXJnaW4tYnRtLTIwcHhcIiA6IFwiXCInPlxuICAgICAgICA8IS0tIDxzcGFuICpuZ0lmPVwic2VydmljZVJlcXVlc3RWYWx1ZSA9PT0gJ2ZhbHNlJ1wiIGNsYXNzPVwiaGVhZGluZy1tZWRpdW1cIj5TZXJ2aWNlIHJlcXVlc3RzPC9zcGFuPiAtLT5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEob3JkZXJMZXZlbEZlZXM/Lmxlbmd0aCA9PT0gMCAmJiAhaXNBbnlGZWVHcm91cEF2aWxhYmxlKSAmJiBzZXJ2aWNlUmVxdWVzdFZhbHVlICE9PSAnZmFsc2UnIFwiPlxuICAgICAgICAgIDx0YWJsZSBjbGFzcz1cImdvdnVrLXRhYmxlXCI+XG4gICAgICAgICAgICAgIDx0aGVhZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkXCI+XG4gICAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC0xNFwiIHNjb3BlPVwiY29sXCI+U3RhdHVzPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC0xOFwiIHNjb3BlPVwiY29sXCI+QW1vdW50PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC0xOFwiIHNjb3BlPVwiY29sXCI+UGFydHk8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLTI0XCIgc2NvcGU9XCJjb2xcIj5SZXF1ZXN0IHJlZmVyZW5jZVx0PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC05XCIgc2NvcGU9XCJjb2xcIj48L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPjwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCIgKm5nSWY9XCJvcmRlckxldmVsRmVlcz8ubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIiAgKm5nRm9yPVwibGV0IG9yZGVyUmVmIG9mIG9yZGVyTGV2ZWxGZWVzO2xldCBpID0gaW5kZXg7XCI+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57e29yZGVyUmVmLm9yZGVyU3RhdHVzfX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3tvcmRlclJlZi5vcmRlclRvdGFsRmVlcyB8IGN1cnJlbmN5IDonR0JQJzonc3ltYm9sJzonMS4yLTInfX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkICpuZ0lmPVwiY3BvRGV0YWlscyAhPT0gbnVsbFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7Y3BvRGV0YWlsc1sncmVzcG9uc2libGVQYXJ0eSddfX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkICpuZ0lmPVwiY3BvRGV0YWlscyA9PT0gbnVsbFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgIHdoaXRlc3BhY2UtaW5oZXJpdFwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57e29yZGVyUmVmLm9yZGVyUmVmSWR9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBvZi12aXNpYmxlXCI+IDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwibG9hZFBCQUFjY291bnRQYWdlKG9yZGVyUmVmKVwiICpuZ0lmPVwic2VydmljZVJlcXVlc3RWYWx1ZSAhPT0gJ2ZhbHNlJyAmJiBjaGVjazRBbGxvd2VkUm9sZXMyQWNjZXNzUEJBcGF5bWVudCgpICYmIG9yZGVyUmVmLm9yZGVyU3RhdHVzID09PSAnTm90IHBhaWQnXCI+IFBheSBub3c8L2E+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnb1RvT3JkZXJWaWV3RGV0YWlsU2VjdGlvbihvcmRlclJlZilcIj5SZXZpZXc8L2E+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiICpuZ0lmPVwib3JkZXJMZXZlbEZlZXM/Lmxlbmd0aCA9PT0gMCAmJiBzZXJ2aWNlUmVxdWVzdFZhbHVlID09PSAnZmFsc2UnXCI+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiID5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImFsaWdubGVmdFwiIGNvbHNwYW49XCI3XCI+Tm8gc2VydmljZSByZXF1ZXN0cyBvbiB0aGlzIGNhc2UuPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwib3JkZXJMZXZlbEZlZXM/Lmxlbmd0aCA9PT0gMCAmJiBzZXJ2aWNlUmVxdWVzdFZhbHVlICE9PSAnZmFsc2UnICYmICFpc0FueUZlZUdyb3VwQXZpbGFibGVcIj5cbiAgICAgICAgICA8aDEgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLWwgZ292dWstaGVhZGluZy1sd1wiPklmIHlvdSBhcmUgZXhwZWN0aW5nIHRvIHBheSBhbmQgYXJlIG5vdCBhYmxlIHRvIHNlZSBhIHNlcnZpY2UgcmVxdWVzdCw8L2gxPlxuICAgICAgICAgIDxwPnBsZWFzZSByZWZyZXNoIGFuZCB0cnkgaW4gc29tZSB0aW1lLjwvcD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPCEtLSA8L2Rpdj4gLS0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tZnVsbFwiPlxuICAgICAgICAgICAgPGRpdiAgKm5nSWY9XCJzZXJ2aWNlUmVxdWVzdFZhbHVlID09PSAnZmFsc2UnXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+PGJyLz5QYXltZW50czwvc3Bhbj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgPlxuICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZVwiPlxuICAgICAgICAgICAgICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtMTRcIiBzY29wZT1cImNvbFwiPlN0YXR1czwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLTEwXCIgc2NvcGU9XCJjb2xcIj5BbW91bnQ8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC0xN1wiIHNjb3BlPVwiY29sXCI+RGF0ZTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLTI0XCIgc2NvcGU9XCJjb2xcIj5QYXltZW50IHJlZmVyZW5jZTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLTEzXCIgc2NvcGU9XCJjb2xcIj48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj48L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAqbmdJZj1cImFsbFBheW1lbnRzPy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICAqbmdGb3I9XCJsZXQgcGF5bWVudCBvZiBhbGxQYXltZW50c1wiPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyBwYXltZW50LnN0YXR1cyB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7IHBheW1lbnQuYW1vdW50IHwgY3VycmVuY3kgOidHQlAnOidzeW1ib2wnOicxLjItMicgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyBwYXltZW50LmRhdGVfY3JlYXRlZCB8IGRhdGU6J2RkIE1NTSB5eXl5JyB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7IHBheW1lbnQ/LnJlZmVyZW5jZSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnb1RvUGF5ZW1lbnRWaWV3KHBheW1lbnQucGF5bWVudEdyb3VwUmVmZXJlbmNlLCBwYXltZW50LnJlZmVyZW5jZSwgcGF5bWVudC5tZXRob2QpXCI+UmV2aWV3PC9hPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3Rib2R5PlxuXG4gICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCIgKm5nSWY9XCJhbGxQYXltZW50cz8ubGVuZ3RoID09PSAwXCI+XG4gICAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCI2XCI+Tm8gcGF5bWVudHMgcmVjb3JkZWQ8L3RkPlxuICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICA8Y2NwYXktYXBwLXVucHJvY2Vzc2VkLXBheW1lbnRzIGNsYXNzPVwiZ292dWstdGFibGVcIlxuICAgICAgICAgICAgKm5nSWY9XCJpc0J1bGtTY2FuRW5hYmxlICYmICF0YWtlUGF5bWVudFwiXG4gICAgICAgICAgICBbSVNfQlVUVE9OX0VOQUJMRV09XCJ0YWtlUGF5bWVudFwiXG4gICAgICAgICAgICBbTEVWRUxdPVwiNFwiXG4gICAgICAgICAgICBbSVNUVVJOT0ZGXT1cImlzVHVybk9mZlwiXG4gICAgICAgICAgICBbSVNTRkVOQUJMRV09XCJpc1N0cmF0ZWdpY0ZpeEVuYWJsZVwiXG4gICAgICAgICAgICBbUEFZTUVOVFNMRU5HVEhdPVwiYWxsUGF5bWVudHM/Lmxlbmd0aFwiXG4gICAgICAgICAgICBbUEFZTUVOVFJFRl09XCJwYXltZW50UmVmXCJcbiAgICAgICAgICAgIChnZXRVbnByb2Nlc3NlZEZlZUNvdW50KSA9IFwiZ2V0VW5wcm9jZXNzZWRGZWVDb3VudCgkZXZlbnQpXCJcbiAgICAgICAgICAgIFtGRUVfUkVDT1JEU19FWElTVFNdPVwiaXNBbnlGZWVHcm91cEF2aWxhYmxlXCJcbiAgICAgICAgICAgIFtJU19PU19BTVRfQVZBSUxBQkxFXT1cImlzR3JwT3V0c3RhbmRpbmdBbXRQb3NpdGl2ZVwiXG4gICAgICAgICAgICAoc2VsZWN0ZWRVbnByb2Nlc3NlZEZlZUV2ZW50KSA9IFwic2VsZWN0ZWRVbnByb2Nlc3NlZEZlZUV2ZW50KCRldmVudClcIj5cbiAgICAgICAgICAgICAgPC9jY3BheS1hcHAtdW5wcm9jZXNzZWQtcGF5bWVudHM+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGxcIiAqbmdJZj1cIiFjaGVjazRBbGxvd2VkUm9sZXMyQWNjZXNzUEJBcGF5bWVudCgpXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+PGJyLz5SZWZ1bmRzPC9zcGFuPlxuICAgICAgICAgICAgPGNjcGF5LXJlZnVuZC1zdGF0dXNcbiAgICAgICAgICAgIFtjY2RDYXNlTnVtYmVyXT1cImNjZENhc2VOdW1iZXJcIlxuICAgICAgICAgICAgW29yZGVyUGFydHldID1cIm9yZGVyUGFydHlcIlxuICAgICAgICAgICAgID48L2NjcGF5LXJlZnVuZC1zdGF0dXM+XG4gICAgICAgIDwvZGl2PlxuXG4gICA8L25nLWNvbnRhaW5lcj5cblxuXG48aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBjbGFzcz0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J0ZFRVJFTU9WQUxDT05GSVJNQVRJT05fMic+XG5cbjwhLS0gT3JkZXIgRnVsbCBWaWV3IERldGFpbHMtLT5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3U3RhdHVzID09PSAnb3JkZXItZnVsbC12aWV3J1wiPlxuICA8Y2NwYXktc2VydmljZS1yZXF1ZXN0XG4gIFt2aWV3U3RhdHVzXSA9IFwidmlld1N0YXR1c1wiXG4gIFtvcmRlclJlZl0gPSBcIm9yZGVyUmVmXCJcbiAgW29yZGVyU3RhdHVzXSA9IFwib3JkZXJTdGF0dXNcIlxuICBbb3JkZXJDcmVhdGVkXSA9IFwib3JkZXJDcmVhdGVkXCJcbiAgW29yZGVyUGFydHldID0gXCJvcmRlclBhcnR5XCJcbiAgW29yZGVyQ0NERXZlbnRdID0gXCJvcmRlckNDREV2ZW50XCJcbiAgW29yZGVyRGV0YWlsXSA9IFwib3JkZXJEZXRhaWxcIlxuICBbcGF5bWVudEdyb3VwTGlzdF0gPSBcInBheW1lbnRHcm91cHNcIlxuICBbTE9HR0VESU5VU0VSUk9MRVNdID0gXCJMT0dHRURJTlVTRVJST0xFU1wiXG4gIFtjY2RDYXNlTnVtYmVyXSA9IFwiY2NkQ2FzZU51bWJlclwiXG4gIFtvcmRlckZlZXNUb3RhbF0gPSBcIm9yZGVyRmVlc1RvdGFsXCJcbiAgW29yZGVyVG90YWxQYXltZW50c10gPSBcIm9yZGVyVG90YWxQYXltZW50c1wiXG4gIFtvcmRlclJlbWlzc2lvblRvdGFsXSA9IFwib3JkZXJSZW1pc3Npb25Ub3RhbFwiXG4gIFtpc1NlcnZpY2VSZXF1ZXN0XSA9IFwic2VydmljZVJlcXVlc3RWYWx1ZVwiXG4gIChnb1RvU2VydmljZVJxdWVzdENvbXBvbmVudCkgPSBcImdvVG9TZXJ2aWNlUmVxdWVzdFBhZ2UoKVwiXG4gID48L2NjcGF5LXNlcnZpY2UtcmVxdWVzdD5cblxuPC9uZy1jb250YWluZXI+XG48Y2NwYXktYWRkLXJlbWlzc2lvbiAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdhZGRyZW1pc3Npb24nICYmIGZlZUlkXCJcbltpc1R1cm5PZmZdPVwiaXNUdXJuT2ZmXCJcbltpc1N0cmF0ZWdpY0ZpeEVuYWJsZV09XCJpc1N0cmF0ZWdpY0ZpeEVuYWJsZVwiXG5bdmlld0NvbXBTdGF0dXNdPSBcInZpZXdTdGF0dXNcIlxuW2ZlZV09XCJmZWVJZFwiXG5bb3JkZXJTdGF0dXNdID1cIm9yZGVyU3RhdHVzXCJcbltwYWlkQW1vdW50XT0gXCJvcmRlclRvdGFsUGF5bWVudHNcIlxuW2lzUmVmdW5kUmVtaXNzaW9uXT1cImlzUmVmdW5kUmVtaXNzaW9uXCJcbltjYXNlVHlwZV09XCJjYXNlVHlwZVwiXG5bcGF5bWVudEdyb3VwUmVmXT1cIm9yZGVyUmVmXCJcbltpc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2VdID0gXCJ0cnVlXCJcbltwYXltZW50XSA9IFwicGF5bWVudFwiXG5bY2NkQ2FzZU51bWJlcl09XCJjY2RDYXNlTnVtYmVyXCI+PC9jY3BheS1hZGQtcmVtaXNzaW9uPlxuXG48Y2NwYXktYWRkLXJlbWlzc2lvbiAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdpc3N1ZXJlZnVuZCcgJiYgcGF5bWVudFwiXG5baXNUdXJuT2ZmXT1cImlzVHVybk9mZlwiXG5baXNTdHJhdGVnaWNGaXhFbmFibGVdPVwiaXNTdHJhdGVnaWNGaXhFbmFibGVcIlxuW3ZpZXdDb21wU3RhdHVzXT0gXCJ2aWV3U3RhdHVzXCJcbltpc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2VdID0gXCJ0cnVlXCJcbltwYXltZW50XT1cInBheW1lbnRcIlxuW29yZGVyU3RhdHVzXSA9XCJvcmRlclN0YXR1c1wiXG5bcGFpZEFtb3VudF09IFwib3JkZXJUb3RhbFBheW1lbnRzXCJcbltpc1JlZnVuZFJlbWlzc2lvbl09XCJpc1JlZnVuZFJlbWlzc2lvblwiXG5bY2FzZVR5cGVdPVwiY2FzZVR5cGVcIlxuW3BheW1lbnRHcm91cFJlZl09XCJvcmRlclJlZlwiXG5bY2NkQ2FzZU51bWJlcl09XCJjY2RDYXNlTnVtYmVyXCI+PC9jY3BheS1hZGQtcmVtaXNzaW9uPlxuPGNjcGF5LWFkZC1yZW1pc3Npb24gKm5nSWY9XCJ2aWV3U3RhdHVzID09PSAnYWRkcmVmdW5kZm9ycmVtaXNzaW9uJyAmJiBwYXltZW50XCJcbltpc1R1cm5PZmZdPVwiaXNUdXJuT2ZmXCJcbltpc1N0cmF0ZWdpY0ZpeEVuYWJsZV09XCJpc1N0cmF0ZWdpY0ZpeEVuYWJsZVwiXG5bdmlld0NvbXBTdGF0dXNdPSBcInZpZXdTdGF0dXNcIlxuW3BheW1lbnRdPVwicGF5bWVudFwiXG5bb3JkZXJTdGF0dXNdID1cIm9yZGVyU3RhdHVzXCJcbltwYWlkQW1vdW50XT0gXCJvcmRlclRvdGFsUGF5bWVudHNcIlxuW2lzUmVmdW5kUmVtaXNzaW9uXT1cImlzUmVmdW5kUmVtaXNzaW9uXCJcbltjYXNlVHlwZV09XCJjYXNlVHlwZVwiXG5bZmVlYW1vdW50XT1cInJlbWlzc2lvbkZlZUFtdFwiXG5bcmVtaXNzaW9uXSA9IFwicmVtaXNzaW9uc1wiXG5baXNGcm9tU2VydmljZVJlcXVlc3RQYWdlXT1cInRydWVcIlxuW2NjZENhc2VOdW1iZXJdPVwiY2NkQ2FzZU51bWJlclwiPjwvY2NwYXktYWRkLXJlbWlzc2lvbj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdmZWVSZW1vdmFsQ29uZmlybWF0aW9uJ1wiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0XCI+XG4gICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRfX2ljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj4hPC9zcGFuPlxuICAgIDxzdHJvbmcgY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRfX3RleHRcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0X19hc3Npc3RpdmVcIj5XYXJuaW5nPC9zcGFuPlxuICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGZlZT9cbiAgICA8L3N0cm9uZz5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1idXR0b24tZ3JiXCI+XG4gICAgPGZvcm0gbm92YWxpZGF0ZT5cbiAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnV0dG9uIGdvdnVrLWJ1dHRvbi0tc2Vjb25kYXJ5XCIgKGNsaWNrKT1cImNhbmNlbFJlbW92YWwoKVwiPlxuICAgICAgICBDYW5jZWxcbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b25cIlxuICAgICAgW2Rpc2FibGVkXT1cImlzUmVtb3ZlQnRuRGlzYWJsZWRcIlxuICAgICAgW25nQ2xhc3NdPSdpc1JlbW92ZUJ0bkRpc2FibGVkID8gXCJidXR0b24gYnV0dG9uLS1kaXNhYmxlZCBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCIgOiBcImJ1dHRvbiBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCInXG4gICAgICAoY2xpY2spPVwicmVtb3ZlRmVlKGZlZUlkKVwiPlxuICAgICAgICBSZW1vdmVcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZm9ybT5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbjwvbWFpbj5cbjwvZGl2PlxuPCEtLSA8L21haW4+IC0tPlxuPCEtLSA8L2RpdiBjbGFzcz1cImdvdnVrLXdpZHRoLWNvbnRhaW5lclwiPiAtLT5cbiJdfQ==