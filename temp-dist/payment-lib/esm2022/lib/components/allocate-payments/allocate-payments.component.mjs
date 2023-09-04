import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PaymentLibComponent } from '../../payment-lib.component';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { CaseTransactionsService } from '../../services/case-transactions/case-transactions.service';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { ErrorHandlerService } from '../../services/shared/error-handler.service';
import { AllocatePaymentRequest } from '../../interfaces/AllocatePaymentRequest';
import { IAllocationPaymentsRequest } from '../../interfaces/IAllocationPaymentsRequest';
import { OrderslistService } from '../../services/orderslist.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/shared/error-handler.service";
import * as i2 from "../../services/case-transactions/case-transactions.service";
import * as i3 from "@angular/forms";
import * as i4 from "../../services/payment-view/payment-view.service";
import * as i5 from "../../payment-lib.component";
import * as i6 from "../../services/bulk-scaning-payment/bulk-scaning-payment.service";
import * as i7 from "../../services/orderslist.service";
import * as i8 from "@angular/common";
import * as i9 from "../error-banner/error-banner.component";
import * as i10 from "../../pipes/key-value.pipe";
function AllocatePaymentsComponent_ng_container_1_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11)(1, "input", 12);
    i0.ɵɵlistener("click", function AllocatePaymentsComponent_ng_container_1_div_11_Template_input_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r7); const orderRef_r4 = restoredCtx.$implicit; const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.OrderListSelectEvent(orderRef_r4.orderRefId)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 13);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const orderRef_r4 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("value", orderRef_r4.orderTotalFees);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", i0.ɵɵpipeBind4(4, 3, orderRef_r4.orderTotalFees, "GBP", "symbol", "1.2-2"), "(", orderRef_r4.orderStatus, ")");
} }
function AllocatePaymentsComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 2)(2, "ol", 3)(3, "li", 4)(4, "a", 5);
    i0.ɵɵlistener("click", function AllocatePaymentsComponent_ng_container_1_Template_a_click_4_listener() { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r8.gotoCasetransationPage()); });
    i0.ɵɵtext(5, "Back");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(6, "div", 6)(7, "h1", 7);
    i0.ɵɵtext(8, "Select payment request");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 8);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(11, AllocatePaymentsComponent_ng_container_1_div_11_Template, 5, 8, "div", 9);
    i0.ɵɵelementStart(12, "div", 6)(13, "button", 10);
    i0.ɵɵlistener("click", function AllocatePaymentsComponent_ng_container_1_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r9); const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.redirectToOrderFeeSearchPage()); });
    i0.ɵɵtext(14, " Continue ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1("Case reference: ", ctx_r0.ccdReference, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.orderLevelFees);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isContinueButtondisabled);
} }
function AllocatePaymentsComponent_div_2_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2)(1, "ol", 3)(2, "li", 4)(3, "a", 24);
    i0.ɵɵlistener("click", function AllocatePaymentsComponent_div_2_div_3_Template_a_click_3_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r14.gotoSummaryPage($event)); });
    i0.ɵɵtext(4, "Back");
    i0.ɵɵelementEnd()()()();
} }
function AllocatePaymentsComponent_div_2_div_10_tr_20_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 41)(1, "div", 42)(2, "input", 43);
    i0.ɵɵlistener("click", function AllocatePaymentsComponent_div_2_div_10_tr_20_td_1_Template_input_click_2_listener() { i0.ɵɵrestoreView(_r25); const paymentGroup_r16 = i0.ɵɵnextContext(2).$implicit; const ctx_r23 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r23.selectedPaymentGroup(paymentGroup_r16)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "label", 44);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const i_r20 = i0.ɵɵnextContext().index;
    const paymentGroup_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("rowspan", paymentGroup_r16.fees.length);
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate1("id", "unpaiedFee-", i_r20, "");
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("for", "unpaiedFee-", i_r20, "");
} }
function AllocatePaymentsComponent_div_2_div_10_tr_20_td_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 45);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "currency");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const paymentGroup_r16 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("rowspan", paymentGroup_r16.fees.length);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(2, 2, ctx_r22.getGroupOutstandingAmount(paymentGroup_r16), "GBP", "symbol-narrow", "1.2-2"), " ");
} }
function AllocatePaymentsComponent_div_2_div_10_tr_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 29);
    i0.ɵɵtemplate(1, AllocatePaymentsComponent_div_2_div_10_tr_20_td_1_Template, 4, 3, "td", 34);
    i0.ɵɵelementStart(2, "td", 35);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td", 36);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 37);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 38);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 39);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, AllocatePaymentsComponent_div_2_div_10_tr_20_td_14_Template, 3, 7, "td", 40);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r19 = ctx.$implicit;
    const i_r20 = ctx.index;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", i_r20 == 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(fee_r19.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", fee_r19.description, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", fee_r19.volume ? fee_r19.volume : "-", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(10, 7, fee_r19.fee_amount, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(13, 12, fee_r19.calculated_amount, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", i_r20 == 0);
} }
function AllocatePaymentsComponent_div_2_div_10_tbody_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 31)(1, "td", 46);
    i0.ɵɵtext(2, "No payments recorded");
    i0.ɵɵelementEnd()();
} }
function AllocatePaymentsComponent_div_2_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "h3", 26);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "table", 27)(4, "thead", 28)(5, "tr", 29);
    i0.ɵɵelement(6, "td", 30);
    i0.ɵɵelementStart(7, "td", 30);
    i0.ɵɵtext(8, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 30);
    i0.ɵɵtext(10, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 30);
    i0.ɵɵtext(12, "Volume");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 30);
    i0.ɵɵtext(14, "Fee amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 30);
    i0.ɵɵtext(16, "Calculated amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 30);
    i0.ɵɵtext(18, "Group amount outstanding");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "tbody", 31);
    i0.ɵɵtemplate(20, AllocatePaymentsComponent_div_2_div_10_tr_20_Template, 15, 17, "tr", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, AllocatePaymentsComponent_div_2_div_10_tbody_21_Template, 3, 0, "tbody", 33);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const paymentGroup_r16 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Group reference: ", paymentGroup_r16.payment_group_reference, "");
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("ngForOf", paymentGroup_r16.fees);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", paymentGroup_r16.fees.length == 0);
} }
function AllocatePaymentsComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "input", 14, 15);
    i0.ɵɵtemplate(3, AllocatePaymentsComponent_div_2_div_3_Template, 5, 0, "div", 16);
    i0.ɵɵelementStart(4, "div", 17)(5, "h1", 18);
    i0.ɵɵtext(6, "Allocate payment to fee group");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "h2", 19);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, AllocatePaymentsComponent_div_2_div_10_Template, 22, 3, "div", 20);
    i0.ɵɵelementStart(11, "div", 21)(12, "button", 22);
    i0.ɵɵlistener("click", function AllocatePaymentsComponent_div_2_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r30); const ctx_r29 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r29.saveAndContinue()); });
    i0.ɵɵtext(13, " Continue ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 23);
    i0.ɵɵlistener("click", function AllocatePaymentsComponent_div_2_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r30); const ctx_r31 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r31.gotoCasetransationPage()); });
    i0.ɵɵtext(15, " Cancel ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.paymentRef);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("Amount left to be allocated: ", i0.ɵɵpipeBind4(9, 4, ctx_r1.unAllocatedPayment.amount, "GBP", "symbol-narrow", "1.2-2"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.paymentGroups);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isContinueButtondisabled);
} }
function AllocatePaymentsComponent_ng_container_3_ccpay_error_banner_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-error-banner", 61);
} if (rf & 2) {
    const ctx_r32 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("errorMessage", ctx_r32.errorMessage);
} }
function AllocatePaymentsComponent_ng_container_3_div_9_h3_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3", 63);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r38 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("Group reference: ", ctx_r38.paymentGroup.payment_group_reference, " ");
} }
function AllocatePaymentsComponent_ng_container_3_div_9_tr_18_td_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 65);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "currency");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r43 = i0.ɵɵnextContext(4);
    i0.ɵɵattribute("rowspan", ctx_r43.paymentGroup.fees.length);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(2, 2, ctx_r43.afterFeeAllocateOutstanding, "GBP", "symbol-narrow", "1.2-2"), " ");
} }
function AllocatePaymentsComponent_ng_container_3_div_9_tr_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 29)(1, "td", 35);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 36);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 37);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 38);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 39);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, AllocatePaymentsComponent_ng_container_3_div_9_tr_18_td_13_Template, 3, 7, "td", 64);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r41 = ctx.$implicit;
    const i_r42 = ctx.index;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(fee_r41.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", fee_r41.description, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", fee_r41.volume ? fee_r41.volume : "-", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(9, 6, fee_r41.fee_amount, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(12, 11, fee_r41.calculated_amount, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", i_r42 == 0);
} }
function AllocatePaymentsComponent_ng_container_3_div_9_tbody_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 31)(1, "td", 46);
    i0.ɵɵtext(2, "No payments recorded");
    i0.ɵɵelementEnd()();
} }
function AllocatePaymentsComponent_ng_container_3_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵtemplate(1, AllocatePaymentsComponent_ng_container_3_div_9_h3_1_Template, 2, 1, "h3", 62);
    i0.ɵɵelementStart(2, "table", 27)(3, "thead", 28)(4, "tr", 29)(5, "td", 30);
    i0.ɵɵtext(6, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 30);
    i0.ɵɵtext(8, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 30);
    i0.ɵɵtext(10, "Volume");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 30);
    i0.ɵɵtext(12, "Fee amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 30);
    i0.ɵɵtext(14, "Calculated amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 30);
    i0.ɵɵtext(16, "Amount Due");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "tbody", 31);
    i0.ɵɵtemplate(18, AllocatePaymentsComponent_ng_container_3_div_9_tr_18_Template, 14, 16, "tr", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, AllocatePaymentsComponent_ng_container_3_div_9_tbody_19_Template, 3, 0, "tbody", 33);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r34 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r34.isTurnOff);
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("ngForOf", ctx_r34.paymentGroup.fees);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r34.paymentGroup.fees.length == 0);
} }
function AllocatePaymentsComponent_ng_container_3_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 66)(1, "span", 67);
    i0.ɵɵtext(2, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 68)(4, "span", 69);
    i0.ɵɵtext(5, "Warning");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r35 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2(" ", ctx_r35.paymentSectionLabel.title, " ", i0.ɵɵpipeBind4(7, 2, ctx_r35.remainingAmount, "GBP", "symbol-narrow", "1.2-2"), " ");
} }
function AllocatePaymentsComponent_ng_container_3_div_11_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r51 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 75)(1, "input", 76);
    i0.ɵɵlistener("ngModelChange", function AllocatePaymentsComponent_ng_container_3_div_11_div_5_div_1_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r51); const ctx_r50 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r50.paymentReason = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 77);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const reason_r49 = ctx.$implicit;
    const ctx_r48 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("id", reason_r49.key);
    i0.ɵɵpropertyInterpolate("value", reason_r49.value);
    i0.ɵɵproperty("ngModel", ctx_r48.paymentReason);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", reason_r49.value, " ");
} }
function AllocatePaymentsComponent_ng_container_3_div_11_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtemplate(1, AllocatePaymentsComponent_ng_container_3_div_11_div_5_div_1_Template, 4, 4, "div", 74);
    i0.ɵɵpipe(2, "keyValue");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r44 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", ctx_r44.paymentReasonHasError ? "govuk-radios govuk-radios--conditional form-group-error" : "govuk-radios govuk-radios--conditional");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 2, ctx_r44.reasonList.overPayment));
} }
function AllocatePaymentsComponent_ng_container_3_div_11_div_6_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r55 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 75)(1, "input", 76);
    i0.ɵɵlistener("ngModelChange", function AllocatePaymentsComponent_ng_container_3_div_11_div_6_div_1_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r55); const ctx_r54 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r54.paymentReason = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 77);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const reason_r53 = ctx.$implicit;
    const ctx_r52 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("id", reason_r53.key);
    i0.ɵɵpropertyInterpolate("value", reason_r53.value);
    i0.ɵɵproperty("ngModel", ctx_r52.paymentReason);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", reason_r53.value, " ");
} }
function AllocatePaymentsComponent_ng_container_3_div_11_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtemplate(1, AllocatePaymentsComponent_ng_container_3_div_11_div_6_div_1_Template, 4, 4, "div", 74);
    i0.ɵɵpipe(2, "keyValue");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r45 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", ctx_r45.paymentReasonHasError ? "govuk-radios govuk-radios--conditional form-group-error" : "govuk-radios govuk-radios--conditional");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 2, ctx_r45.reasonList.shortFall));
} }
function AllocatePaymentsComponent_ng_container_3_div_11_div_11_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r59 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 75)(1, "input", 78);
    i0.ɵɵlistener("ngModelChange", function AllocatePaymentsComponent_ng_container_3_div_11_div_11_div_1_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r59); const ctx_r58 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r58.paymentExplanation = $event); })("click", function AllocatePaymentsComponent_ng_container_3_div_11_div_11_div_1_Template_input_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r59); const explanation_r57 = restoredCtx.$implicit; const ctx_r60 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r60.selectRadioButton(explanation_r57.key, "explanation")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 77);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const explanation_r57 = ctx.$implicit;
    const ctx_r56 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("id", explanation_r57.key);
    i0.ɵɵpropertyInterpolate("value", explanation_r57.value);
    i0.ɵɵproperty("ngModel", ctx_r56.paymentExplanation);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", explanation_r57.value, " ");
} }
function AllocatePaymentsComponent_ng_container_3_div_11_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtemplate(1, AllocatePaymentsComponent_ng_container_3_div_11_div_11_div_1_Template, 4, 4, "div", 74);
    i0.ɵɵpipe(2, "keyValue");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r46 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", ctx_r46.paymentExplanationHasError ? "govuk-radios govuk-radios--conditional form-group-error" : "govuk-radios govuk-radios--conditional");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 2, ctx_r46.explanationList.overPayment));
} }
function AllocatePaymentsComponent_ng_container_3_div_11_div_12_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r64 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 75)(1, "input", 78);
    i0.ɵɵlistener("ngModelChange", function AllocatePaymentsComponent_ng_container_3_div_11_div_12_div_1_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r64); const ctx_r63 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r63.paymentExplanation = $event); })("click", function AllocatePaymentsComponent_ng_container_3_div_11_div_12_div_1_Template_input_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r64); const explanation_r62 = restoredCtx.$implicit; const ctx_r65 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r65.selectRadioButton(explanation_r62.key, "explanation")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 77);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const explanation_r62 = ctx.$implicit;
    const ctx_r61 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("id", explanation_r62.key);
    i0.ɵɵpropertyInterpolate("value", explanation_r62.value);
    i0.ɵɵproperty("ngModel", ctx_r61.paymentExplanation);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", explanation_r62.value, " ");
} }
function AllocatePaymentsComponent_ng_container_3_div_11_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtemplate(1, AllocatePaymentsComponent_ng_container_3_div_11_div_12_div_1_Template, 4, 4, "div", 74);
    i0.ɵɵpipe(2, "keyValue");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r47 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", ctx_r47.paymentExplanationHasError ? "govuk-radios govuk-radios--conditional form-group-error" : "govuk-radios govuk-radios--conditional");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 2, ctx_r47.explanationList.shortFall));
} }
const _c0 = function (a0) { return { "inline-error-message": a0 }; };
function AllocatePaymentsComponent_ng_container_3_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 55)(1, "div", 55)(2, "fieldset", 70)(3, "span", 71);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AllocatePaymentsComponent_ng_container_3_div_11_div_5_Template, 3, 4, "div", 72);
    i0.ɵɵtemplate(6, AllocatePaymentsComponent_ng_container_3_div_11_div_6_Template, 3, 4, "div", 72);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 55)(8, "fieldset", 70)(9, "span", 71);
    i0.ɵɵtext(10, " Provide an explanatory note ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, AllocatePaymentsComponent_ng_container_3_div_11_div_11_Template, 3, 4, "div", 72);
    i0.ɵɵtemplate(12, AllocatePaymentsComponent_ng_container_3_div_11_div_12_Template, 3, 4, "div", 72);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r36 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c0, ctx_r36.paymentReasonHasError));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r36.paymentSectionLabel.reason, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r36.isRemainingAmountGtZero);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r36.isRemainingAmountLtZero);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c0, ctx_r36.paymentExplanationHasError));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r36.isRemainingAmountGtZero);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r36.isRemainingAmountLtZero);
} }
function AllocatePaymentsComponent_ng_container_3_p_19_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a explanation");
    i0.ɵɵelementEnd();
} }
function AllocatePaymentsComponent_ng_container_3_p_19_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a valid explanation");
    i0.ɵɵelementEnd();
} }
function AllocatePaymentsComponent_ng_container_3_p_19_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Explanation should be at least 3 characters.");
    i0.ɵɵelementEnd();
} }
function AllocatePaymentsComponent_ng_container_3_p_19_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Explanation should be 255 characters or under.");
    i0.ɵɵelementEnd();
} }
function AllocatePaymentsComponent_ng_container_3_p_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 79);
    i0.ɵɵtemplate(1, AllocatePaymentsComponent_ng_container_3_p_19_span_1_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(2, AllocatePaymentsComponent_ng_container_3_p_19_span_2_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(3, AllocatePaymentsComponent_ng_container_3_p_19_span_3_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(4, AllocatePaymentsComponent_ng_container_3_p_19_span_4_Template, 2, 0, "span", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r37 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r37.isPaymentDetailsEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r37.isPaymentDetailsInvalid);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r37.paymentDetailsMinHasError);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r37.paymentDetailsMaxHasError);
} }
const _c1 = function (a0) { return { "inline-error-class": a0 }; };
function AllocatePaymentsComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r71 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AllocatePaymentsComponent_ng_container_3_ccpay_error_banner_1_Template, 1, 1, "ccpay-error-banner", 47);
    i0.ɵɵelement(2, "input", 48, 15);
    i0.ɵɵelementStart(4, "h1", 18);
    i0.ɵɵtext(5, "Confirm allocation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 49);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, AllocatePaymentsComponent_ng_container_3_div_9_Template, 20, 3, "div", 50);
    i0.ɵɵtemplate(10, AllocatePaymentsComponent_ng_container_3_div_10_Template, 8, 7, "div", 51);
    i0.ɵɵtemplate(11, AllocatePaymentsComponent_ng_container_3_div_11_Template, 13, 11, "div", 52);
    i0.ɵɵelementStart(12, "form", 53)(13, "div", 54)(14, "div", 55)(15, "span", 56);
    i0.ɵɵtext(16, " Please enter details ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "textarea", 57);
    i0.ɵɵtext(18, "          ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, AllocatePaymentsComponent_ng_container_3_p_19_Template, 5, 4, "p", 58);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 59)(21, "button", 60);
    i0.ɵɵlistener("click", function AllocatePaymentsComponent_ng_container_3_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r71); const ctx_r70 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r70.confirmAllocatePayement()); });
    i0.ɵɵtext(22, " Confirm ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "button", 23);
    i0.ɵɵlistener("click", function AllocatePaymentsComponent_ng_container_3_Template_button_click_23_listener($event) { i0.ɵɵrestoreView(_r71); const ctx_r72 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r72.cancelAllocatePayment($event)); });
    i0.ɵɵtext(24, " Cancel ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.errorMessage.showError);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("value", ctx_r2.feedbackUrlLabel);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" Amount to be allocated: ", i0.ɵɵpipeBind4(8, 12, ctx_r2.amountForAllocation, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.paymentGroup);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.isRemainingAmountGtZero || ctx_r2.isRemainingAmountLtZero || ctx_r2.remainingAmount === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.isRemainingAmountGtZero || ctx_r2.isRemainingAmountLtZero);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroup", ctx_r2.overUnderPaymentForm);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r2.isMoreDetailsBoxHide ? "govuk-radios__conditional govuk-radios__conditional--hidden" : ctx_r2.isPaymentDetailsEmpty || ctx_r2.isPaymentDetailsInvalid || ctx_r2.paymentDetailsMinHasError || ctx_r2.paymentDetailsMaxHasError ? "govuk-radios__conditional inline-error-border" : "govuk-radios__conditional");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(17, _c1, ctx_r2.isPaymentDetailsEmpty || ctx_r2.isPaymentDetailsInvalid || ctx_r2.paymentDetailsMinHasError || ctx_r2.paymentDetailsMaxHasError));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.isPaymentDetailsEmpty || ctx_r2.isPaymentDetailsInvalid || ctx_r2.paymentDetailsMinHasError || ctx_r2.paymentDetailsMaxHasError);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.isConfirmButtondisabled)("ngClass", ctx_r2.isConfirmButtondisabled ? "button button--disabled" : "button");
} }
export class AllocatePaymentsComponent {
    errorHandlerService;
    caseTransactionsService;
    formBuilder;
    paymentViewService;
    paymentLibComponent;
    bulkScaningPaymentService;
    OrderslistService;
    isTurnOff;
    caseType;
    overUnderPaymentForm;
    viewStatus;
    ccdCaseNumber;
    bspaymentdcn;
    recordId;
    feedbackUrlLabel;
    unAllocatedPayment = {
        amount: 0
    };
    siteID = null;
    // errorMessage = this.errorHandlerService.getServerErrorMessage(false, false, '');
    errorMessage = null;
    paymentGroup;
    paymentGroups = [];
    remainingAmount;
    isRemainingAmountGtZero;
    isMoreDetailsBoxHide = true;
    isRemainingAmountLtZero;
    afterFeeAllocateOutstanding;
    amountForAllocation;
    isConfirmButtondisabled = false;
    isContinueButtondisabled = true;
    otherPaymentExplanation = null;
    selectedOption = null;
    isFeeAmountZero = false;
    paymentReasonHasError = false;
    paymentExplanationHasError = false;
    isPaymentDetailsEmpty = false;
    isPaymentDetailsInvalid = false;
    paymentDetailsMinHasError = false;
    paymentDetailsMaxHasError = false;
    isUserNameEmpty = false;
    isUserNameInvalid = false;
    ccdReference = null;
    exceptionReference = null;
    paymentReason = null;
    paymentExplanation = null;
    userName = null;
    paymentSectionLabel;
    paymentRef = null;
    isStrategicFixEnable = true;
    orderLevelFees = [];
    cookieUserName = [];
    enCookieUserName;
    userNameField = null;
    reasonList = {
        overPayment: {
            hwfReward: 'Help with Fees (HWF) awarded.  Please include the HWF reference number in the explanatory note',
            wrongFee: 'Incorrect payment received',
            notIssueCase: 'Unable to issue case',
            otherDeduction: 'Other'
        },
        shortFall: {
            helpWithFee: 'Help with Fees (HWF) application declined',
            wrongFee: 'Incorrect payment received',
            other: 'Other'
        }
    };
    explanationList = {
        overPayment: {
            referRefund: 'Details in case notes.  Refund due',
            noRefund: 'Details in case notes. No refund due',
            noCase: 'No case created.  Refund due',
            other: 'Other'
        },
        shortFall: {
            holdCase: 'I have put a stop on the case and contacted the applicant requesting the balance of payment',
            heldCase: 'I have put a stop on the case.  The applicant needs to be contacted to request the balance of payment',
            other: 'Other'
        }
    };
    refund = {
        reason: {
            duplicate: 'Duplicate payment',
            humanerror: 'Human error',
            caseWithdrawn: 'Case withdrawn',
            other: 'Other'
        }
    };
    constructor(errorHandlerService, caseTransactionsService, formBuilder, paymentViewService, paymentLibComponent, bulkScaningPaymentService, OrderslistService) {
        this.errorHandlerService = errorHandlerService;
        this.caseTransactionsService = caseTransactionsService;
        this.formBuilder = formBuilder;
        this.paymentViewService = paymentViewService;
        this.paymentLibComponent = paymentLibComponent;
        this.bulkScaningPaymentService = bulkScaningPaymentService;
        this.OrderslistService = OrderslistService;
    }
    ngOnInit() {
        this.viewStatus = 'mainForm';
        if (this.paymentLibComponent.paymentGroupReference !== null) {
            this.viewStatus = 'allocatePaymentConfirmation';
        }
        this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
        this.bspaymentdcn = this.paymentLibComponent.bspaymentdcn;
        this.paymentRef = this.paymentLibComponent.paymentGroupReference;
        this.selectedOption = this.paymentLibComponent.SELECTED_OPTION;
        this.isStrategicFixEnable = this.paymentLibComponent.ISSFENABLE;
        this.isTurnOff = this.paymentLibComponent.isTurnOff;
        this.overUnderPaymentForm = this.formBuilder.group({
            moreDetails: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
                Validators.pattern('^([a-zA-Z0-9\\s,\\.]*)$')
            ])),
            userName: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^([a-zA-Z0-9\\s]*)$')
            ])),
        });
        this.OrderslistService.getOrdersList().subscribe((data) => this.orderLevelFees = data.filter(data => data.orderStatus !== 'Paid'));
        this.OrderslistService.getCaseType().subscribe((data) => this.caseType = data);
        this.getUnassignedPayment();
    }
    getGroupOutstandingAmount(paymentGroup) {
        return this.bulkScaningPaymentService.calculateOutStandingAmount(paymentGroup);
    }
    getPaymentGroupDetails() {
        if (!this.isTurnOff) {
            this.paymentViewService.getPaymentGroupDetails(this.paymentRef).subscribe(paymentGroup => {
                this.errorMessage = this.errorHandlerService.getServerErrorMessage(false, false, '');
                this.paymentGroup = paymentGroup;
                this.saveAndContinue();
            }, (error) => {
                this.errorMessage = this.errorHandlerService.getServerErrorMessage(true, false, '');
            });
        }
        else {
            this.caseTransactionsService.getPaymentGroups(this.ccdCaseNumber).subscribe(paymentGroups => {
                this.errorMessage = this.errorHandlerService.getServerErrorMessage(false, false, '');
                this.paymentGroups = paymentGroups['payment_groups'].filter(paymentGroup => {
                    paymentGroup.fees.forEach(fee => {
                        if (fee.calculated_amount === 0) {
                            this.isFeeAmountZero = true;
                        }
                    });
                    let fstCon = this.getGroupOutstandingAmount(paymentGroup), scndCn = fstCon > 0 || (fstCon == 0 && this.isFeeAmountZero) && paymentGroup.payment_group_reference === this.paymentRef;
                    return this.paymentRef ? scndCn : fstCon > 0 || (fstCon == 0 && this.isFeeAmountZero);
                });
            }, (error) => {
                this.errorMessage = this.errorHandlerService.getServerErrorMessage(true, false, '');
            });
        }
    }
    selectedPaymentGroup(paymentGroup) {
        this.isContinueButtondisabled = false;
        this.paymentGroup = paymentGroup;
    }
    gotoCasetransationPage() {
        this.paymentLibComponent.viewName = 'case-transactions';
        this.paymentLibComponent.isTurnOff = this.isTurnOff;
        this.paymentLibComponent.TAKEPAYMENT = true;
        this.paymentLibComponent.ISBSENABLE = true;
    }
    gotoSummaryPage(event) {
        event.preventDefault();
        this.paymentLibComponent.viewName = 'fee-summary';
        this.paymentLibComponent.isTurnOff = this.isTurnOff;
        this.paymentLibComponent.TAKEPAYMENT = true;
        this.paymentLibComponent.ISBSENABLE = true;
    }
    cancelAllocatePayment(event) {
        event.preventDefault();
        this.resetForm([false, false, false, false, false, false, false, false], 'all');
        if (!this.isTurnOff) {
            this.paymentLibComponent.viewName = 'fee-summary';
            this.paymentLibComponent.isTurnOff = this.isTurnOff;
            this.paymentLibComponent.TAKEPAYMENT = true;
            this.paymentLibComponent.ISBSENABLE = true;
        }
        else {
            this.viewStatus = 'mainForm';
        }
    }
    confirmAllocatePayement() {
        this.enCookieUserName = document.cookie.split(";").find(row => row.includes("user-info")).split("=")[1].split(";");
        this.cookieUserName = JSON.parse(decodeURIComponent(this.enCookieUserName));
        const fullName = this.cookieUserName['forename'] + ' ' + this.cookieUserName['surname'];
        const paymentDetailsField = this.overUnderPaymentForm.controls.moreDetails, paymentFormError = this.overUnderPaymentForm.controls.moreDetails.errors, userNameField = fullName, isEmptyCondtion = this.paymentReason && this.paymentExplanation, isOtherOptionSelected = this.paymentExplanation === 'Other';
        this.resetForm([false, false, false, false, false, false, false, false], 'all');
        if ((!this.isRemainingAmountGtZero && !this.isRemainingAmountLtZero) || isEmptyCondtion && (!isOtherOptionSelected && userNameField.length > 0 || isOtherOptionSelected && userNameField.length > 0 && paymentDetailsField.valid)) {
            this.isConfirmButtondisabled = true;
            this.otherPaymentExplanation = this.paymentExplanation === 'Other' ? paymentDetailsField.value : this.paymentExplanation;
            this.userName = userNameField;
            this.finalServiceCall();
        }
        else {
            if (!this.paymentReason) {
                this.resetForm([true, false, false, false, false, false, false, false], 'reason');
            }
            if (!this.paymentExplanation) {
                this.resetForm([false, true, false, false, false, false, false, false], 'explanation');
            }
            if (this.paymentExplanation && isOtherOptionSelected) {
                if (paymentDetailsField.value == '') {
                    this.resetForm([false, false, true, false, false, false, false, false], 'other');
                }
                if (paymentDetailsField.value != '' && paymentDetailsField.invalid) {
                    this.resetForm([false, false, false, true, false, false, false, false], 'other');
                }
                if (paymentFormError && paymentFormError.minlength && paymentFormError.minlength.actualLength < 3) {
                    this.resetForm([false, false, false, false, true, false, false, false], 'other');
                }
                if (paymentFormError && paymentFormError.maxlength && paymentFormError.maxlength.actualLength > 255) {
                    this.resetForm([false, false, false, false, false, true, false, false], 'other');
                }
            }
            if (userNameField.length === 0) {
                this.resetForm([false, false, false, false, false, false, true, false], 'username');
            }
        }
    }
    resetForm(vals, field) {
        if (field === 'reason' || field === 'all') {
            this.paymentReasonHasError = vals[0];
        }
        if (field === 'explanation' || field === 'all') {
            this.paymentExplanationHasError = vals[1];
        }
        if (field === 'other' || field === 'all') {
            this.isPaymentDetailsEmpty = vals[2];
            this.isPaymentDetailsInvalid = vals[3];
            this.paymentDetailsMinHasError = vals[4];
            this.paymentDetailsMaxHasError = vals[5];
        }
        if (field === 'username' || field === 'all') {
            this.isUserNameEmpty = vals[6];
            this.isUserNameInvalid = vals[7];
        }
    }
    finalServiceCall() {
        if (!this.isStrategicFixEnable) {
            let allocatedRequest = {
                reason: this.paymentReason,
                allocation_status: 'Allocated',
                explanation: this.otherPaymentExplanation,
                payment_allocation_status: {
                    description: '',
                    name: 'Allocated'
                },
                payment_group_reference: this.paymentGroup.payment_group_reference,
                case_type: this.caseType,
                user_name: this.userName
            };
            const postStrategicBody = new AllocatePaymentRequest(this.ccdReference, this.unAllocatedPayment, this.caseType, this.exceptionReference, allocatedRequest);
            this.bulkScaningPaymentService.postBSPaymentStrategic(postStrategicBody, this.paymentGroup.payment_group_reference).subscribe(res => {
                this.errorMessage = this.errorHandlerService.getServerErrorMessage(false, false, '');
                let response = JSON.parse(res);
                if (response.success) {
                    this.gotoCasetransationPage();
                }
            }, (error) => {
                this.errorMessage = this.errorHandlerService.getServerErrorMessage(true, false, '');
                window.scrollTo(0, 0);
                this.isConfirmButtondisabled = false;
            });
        }
        else {
            this.bulkScaningPaymentService.patchBSChangeStatus(this.unAllocatedPayment.dcn_reference, 'PROCESSED').subscribe(res1 => {
                this.errorMessage = this.errorHandlerService.getServerErrorMessage(false, false, '');
                let response1 = JSON.parse(res1);
                if (response1.success) {
                    const requestBody = new AllocatePaymentRequest(this.ccdReference, this.unAllocatedPayment, this.siteID, this.exceptionReference);
                    this.bulkScaningPaymentService.postBSAllocatePayment(requestBody, this.paymentGroup.payment_group_reference).subscribe(res2 => {
                        this.errorMessage = this.errorHandlerService.getServerErrorMessage(false, false, '');
                        let response2 = JSON.parse(res2);
                        const reqBody = new IAllocationPaymentsRequest(response2['data'].payment_group_reference, response2['data'].reference, this.paymentReason, this.otherPaymentExplanation, this.userName);
                        if (response2.success) {
                            this.paymentViewService.postBSAllocationPayments(reqBody).subscribe(res3 => {
                                this.errorMessage = this.errorHandlerService.getServerErrorMessage(false, false, '');
                                let response3 = JSON.parse(res3);
                                if (response3.success) {
                                    this.gotoCasetransationPage();
                                }
                            }, (error) => {
                                this.bulkScaningPaymentService.patchBSChangeStatus(this.unAllocatedPayment.dcn_reference, 'COMPLETE').subscribe();
                                this.errorMessage = this.errorHandlerService.getServerErrorMessage(true, false, '');
                                window.scrollTo(0, 0);
                                this.isConfirmButtondisabled = false;
                            });
                        }
                    }, (error) => {
                        this.bulkScaningPaymentService.patchBSChangeStatus(this.unAllocatedPayment.dcn_reference, 'COMPLETE').subscribe();
                        this.errorMessage = this.errorHandlerService.getServerErrorMessage(true, false, '');
                        window.scrollTo(0, 0);
                        this.isConfirmButtondisabled = false;
                    });
                }
            }, (error) => {
                this.errorMessage = this.errorHandlerService.getServerErrorMessage(true, false, '');
                window.scrollTo(0, 0);
                this.isConfirmButtondisabled = false;
            });
        }
    }
    saveAndContinue() {
        if (this.paymentGroup) {
            this.isMoreDetailsBoxHide = true;
            this.overUnderPaymentForm.get('moreDetails').reset();
            this.overUnderPaymentForm.get('moreDetails').setValue('');
            this.overUnderPaymentForm.get('userName').reset();
            this.overUnderPaymentForm.get('userName').setValue('');
            this.paymentReason = '';
            this.paymentExplanation = '';
            let GroupOutstandingAmount = this.getGroupOutstandingAmount(this.paymentGroup);
            const remainingToBeAssigned = this.unAllocatedPayment.amount - GroupOutstandingAmount;
            this.isRemainingAmountGtZero = remainingToBeAssigned > 0;
            this.isRemainingAmountLtZero = remainingToBeAssigned < 0;
            this.paymentSectionLabel = this.isRemainingAmountGtZero ? {
                title: 'There is an Over payment of',
                reason: 'Provide a reason. This will be used in the Refund process.',
            } : this.isRemainingAmountLtZero ? {
                title: 'There is an Under payment of',
                reason: 'Provide a reason',
            } : {
                title: 'Amount left to be allocated',
                reason: '',
            };
            this.feedbackUrlLabel = this.isRemainingAmountGtZero ? 'CONFIRMALLOCATION_SURPLUS' : this.isRemainingAmountLtZero ? 'CONFIRMALLOCATION_SHORTFALL' : 'CONFIRMALLOCATION';
            this.remainingAmount = this.isRemainingAmountGtZero ? remainingToBeAssigned : this.isRemainingAmountLtZero ? remainingToBeAssigned * -1 : 0;
            this.afterFeeAllocateOutstanding = remainingToBeAssigned >= 0 ? 0 : (remainingToBeAssigned * -1);
            this.amountForAllocation = GroupOutstandingAmount >= this.unAllocatedPayment.amount ? this.unAllocatedPayment.amount : GroupOutstandingAmount;
            if (this.isTurnOff) {
                this.viewStatus = 'allocatePaymentConfirmation';
            }
        }
    }
    getUnassignedPayment() {
        this.bulkScaningPaymentService.getBSPaymentsByDCN(this.bspaymentdcn).subscribe(unassignedPayments => {
            this.errorMessage = this.errorHandlerService.getServerErrorMessage(false, false, '');
            this.unAllocatedPayment = unassignedPayments['data'].payments.filter(payment => {
                return payment && payment.dcn_reference == this.bspaymentdcn;
            })[0];
            this.siteID = unassignedPayments['data'].responsible_service_id;
            const beCcdNumber = unassignedPayments['data'].ccd_reference, beExceptionNumber = unassignedPayments['data'].exception_record_reference, exceptionReference = beCcdNumber ? beCcdNumber === this.ccdCaseNumber ? null : this.ccdCaseNumber : this.ccdCaseNumber;
            this.ccdReference = beCcdNumber ? beCcdNumber : null;
            this.exceptionReference = beExceptionNumber ? beExceptionNumber : exceptionReference;
            this.getPaymentGroupDetails();
        }, (error) => {
            this.errorMessage = this.errorHandlerService.getServerErrorMessage(true, false, '');
        });
    }
    selectRadioButton(key, type) {
        this.isMoreDetailsBoxHide = true;
        if (type === 'explanation' && key === 'other') {
            this.isPaymentDetailsEmpty = false;
            this.isPaymentDetailsInvalid = false;
            this.paymentDetailsMinHasError = false;
            this.paymentDetailsMaxHasError = false;
            this.isMoreDetailsBoxHide = false;
        }
    }
    OrderListSelectEvent(orderef) {
        this.isContinueButtondisabled = false;
        this.recordId = orderef;
    }
    redirectToOrderFeeSearchPage() {
        // this.paymentLibComponent.bspaymentdcn = null;
        this.paymentLibComponent.paymentGroupReference = this.recordId;
        this.paymentLibComponent.isTurnOff = this.isTurnOff;
        this.paymentLibComponent.viewName = 'fee-summary';
    }
    static ɵfac = function AllocatePaymentsComponent_Factory(t) { return new (t || AllocatePaymentsComponent)(i0.ɵɵdirectiveInject(i1.ErrorHandlerService), i0.ɵɵdirectiveInject(i2.CaseTransactionsService), i0.ɵɵdirectiveInject(i3.FormBuilder), i0.ɵɵdirectiveInject(i4.PaymentViewService), i0.ɵɵdirectiveInject(i5.PaymentLibComponent), i0.ɵɵdirectiveInject(i6.BulkScaningPaymentService), i0.ɵɵdirectiveInject(i7.OrderslistService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AllocatePaymentsComponent, selectors: [["app-allocate-payments"]], inputs: { isTurnOff: "isTurnOff", caseType: "caseType" }, decls: 4, vars: 3, consts: [[1, "allocate-payments"], [4, "ngIf"], [1, "govuk-breadcrumbs"], [1, "govuk-breadcrumbs__list"], [1, "govuk-breadcrumbs__list-item"], [1, "govuk-back-link", "govuk-label", 3, "click"], [1, "paymentrequest"], [1, "govuk-heading-xl", "govuk-!-margin-top-3", "govuk-!-margin-bottom-4"], [1, "govuk-!-margin-top-5", "casererf"], ["class", "multiple-choice unprocessed-payments--radio-button", 4, "ngFor", "ngForOf"], ["type", "submit", 1, "button", "allbtb", "button--disabled", "govuk-!-margin-right-1", 3, "disabled", "click"], [1, "multiple-choice", "unprocessed-payments--radio-button"], ["id", "'orderfee'+i+''", "aria-label", "orderLevelRecord", "name", "orderLevelRecord", "type", "radio", 3, "value", "click"], ["for", "radio-inline-1"], ["type", "hidden", "value", "ALLOCATEPAYMENTS", 1, "iFrameDrivenImageValue"], ["myInput", ""], ["class", "govuk-breadcrumbs", 4, "ngIf"], [1, "govuk-heading-section"], [1, "govuk-heading-xl"], [1, "govuk-heading-l"], ["class", "payment-group-section", 4, "ngFor", "ngForOf"], [1, "govuk-button-group-allocate"], ["type", "button", 1, "button", "govuk-!-margin-right-1", 3, "disabled", "click"], ["type", "button", 1, "button", "govuk-button--secondary", 3, "click"], ["href", "#", 1, "govuk-back-link", 3, "click"], [1, "payment-group-section"], [1, "govuk-heading-m"], [1, "govuk-table"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["scope", "col", 1, "govuk-table__header"], [1, "govuk-table__body"], ["class", "govuk-table__row", 4, "ngFor", "ngForOf"], ["class", "govuk-table__body", 4, "ngIf"], ["class", "govuk-table__cell govuk-table__cell--col1 govuk-table__custom--col1", 4, "ngIf"], [1, "govuk-table__cell", "govuk-table__cell--col1"], [1, "govuk-table__cell", "govuk-table__cell--col2"], [1, "govuk-table__cell", "govuk-table__cell--col3"], [1, "govuk-table__cell", "govuk-table__cell--col4"], [1, "govuk-table__cell", "govuk-table__cell--col5"], ["class", "govuk-table__cell govuk-table__cell--col6 govuk-table__custom--col6", 4, "ngIf"], [1, "govuk-table__cell", "govuk-table__cell--col1", "govuk-table__custom--col1"], [1, "multiple-choice"], ["name", "unassignedRecord", "type", "radio", 3, "id", "click"], [3, "for"], [1, "govuk-table__cell", "govuk-table__cell--col6", "govuk-table__custom--col6"], ["colspan", "6", 1, "govuk-table__cell"], [3, "errorMessage", 4, "ngIf"], ["type", "hidden", 1, "iFrameDrivenImageValue", 3, "value"], [1, "govuk-heading-l", "govuk-heading-l--custom"], ["class", "payment-group-section", 4, "ngIf"], ["class", "govuk-warning-text", 4, "ngIf"], ["class", "govuk-form-group", 4, "ngIf"], ["novalidate", "", 3, "formGroup"], ["id", "conditional-how-contacted-conditional-3", 3, "ngClass"], [1, "govuk-form-group"], ["id", "more-detail-hint", 1, "govuk-hint", "govuk-font__custom"], ["id", "moreDetails", "name", "moreDetails", "rows", "5", "formControlName", "moreDetails", 1, "govuk-textarea", 3, "ngClass"], ["class", "inline-error-message", 4, "ngIf"], [1, "govuk-button--group"], ["type", "submit", 3, "disabled", "ngClass", "click"], [3, "errorMessage"], ["class", "govuk-heading-m--custom", 4, "ngIf"], [1, "govuk-heading-m--custom"], ["class", "govuk-table__cell govuk-table__cell--col6", 4, "ngIf"], [1, "govuk-table__cell", "govuk-table__cell--col6"], [1, "govuk-warning-text"], ["aria-hidden", "true", 1, "govuk-warning-text__icon"], [1, "govuk-warning-text__text", "govuk-warning-text__custom"], [1, "govuk-warning-text__assistive"], ["aria-describedby", "how-contacted-conditional-hint", 1, "govuk-fieldset"], ["id", "how-contacted-conditional-hint", 1, "govuk-hint", 3, "ngClass"], ["data-module", "govuk-radios", 3, "ngClass", 4, "ngIf"], ["data-module", "govuk-radios", 3, "ngClass"], ["class", "govuk-radios__item", 4, "ngFor", "ngForOf"], [1, "govuk-radios__item"], ["name", "paymentReason", "type", "radio", 1, "govuk-radios__input", 3, "id", "ngModel", "value", "ngModelChange"], ["for", "how-contacted-conditional", 1, "govuk-label", "govuk-radios__label", "govuk-font__custom"], ["name", "paymentExplanation", "type", "radio", 1, "govuk-radios__input", 3, "id", "ngModel", "value", "ngModelChange", "click"], [1, "inline-error-message"]], template: function AllocatePaymentsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, AllocatePaymentsComponent_ng_container_1_Template, 15, 3, "ng-container", 1);
            i0.ɵɵtemplate(2, AllocatePaymentsComponent_div_2_Template, 16, 9, "div", 1);
            i0.ɵɵtemplate(3, AllocatePaymentsComponent_ng_container_3_Template, 25, 19, "ng-container", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "mainForm" && !ctx.isTurnOff);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "mainForm" && ctx.isTurnOff);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "mainForm" && ctx.isTurnOff || ctx.viewStatus === "allocatePaymentConfirmation");
        } }, dependencies: [i8.NgClass, i8.NgForOf, i8.NgIf, i3.ɵNgNoValidate, i3.DefaultValueAccessor, i3.RadioControlValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.NgModel, i3.FormGroupDirective, i3.FormControlName, i9.ErrorBannerComponent, i8.CurrencyPipe, i10.keyValuePipe], styles: [".allocate-payments[_ngcontent-%COMP%]{margin:20px 0}.allocate-payments[_ngcontent-%COMP%]   .govuk-table__cell--col1[_ngcontent-%COMP%], .allocate-payments[_ngcontent-%COMP%]   .govuk-table__cell--col3[_ngcontent-%COMP%]{width:10%}.allocate-payments[_ngcontent-%COMP%]   .govuk-table__cell--col2[_ngcontent-%COMP%], .allocate-payments[_ngcontent-%COMP%]   .govuk-table__cell--col6[_ngcontent-%COMP%]{width:25%}.allocate-payments[_ngcontent-%COMP%]   .govuk-table__cell--col4[_ngcontent-%COMP%], .allocate-payments[_ngcontent-%COMP%]   .govuk-table__cell--col5[_ngcontent-%COMP%]{width:15%}.allocate-payments[_ngcontent-%COMP%]   .govuk-button-group-allocate[_ngcontent-%COMP%]{display:flex;justify-content:flex-start}.allocate-payments[_ngcontent-%COMP%]   .govuk-button--secondary[_ngcontent-%COMP%]{margin-left:10px;background-color:#b3b8bdf2}.allocate-payments[_ngcontent-%COMP%]   .govuk-custom-warning__message[_ngcontent-%COMP%]{font-size:30px;position:relative;top:12px;font-weight:700}.allocate-payments[_ngcontent-%COMP%]   .govuk-warning-text-custom[_ngcontent-%COMP%]{margin-bottom:0!important;padding:10px 0 5px}.allocate-payments[_ngcontent-%COMP%]   .govuk-table__custom--col1[_ngcontent-%COMP%]{padding-top:0;padding-bottom:20px;padding-left:15px}.allocate-payments[_ngcontent-%COMP%]   .govuk-table__custom--col6[_ngcontent-%COMP%]{text-align:center}.allocate-payments[_ngcontent-%COMP%]   .govuk-list__custom[_ngcontent-%COMP%]{padding-left:20px}.allocate-payments[_ngcontent-%COMP%]   .govuk-warning-text__custom[_ngcontent-%COMP%], .allocate-payments[_ngcontent-%COMP%]   .govuk-list__custom[_ngcontent-%COMP%], .allocate-payments[_ngcontent-%COMP%]   .govuk-heading-m--custom[_ngcontent-%COMP%], .allocate-payments[_ngcontent-%COMP%]   .govuk-label--m[_ngcontent-%COMP%], .allocate-payments[_ngcontent-%COMP%]   .govuk-radios__item[_ngcontent-%COMP%], .allocate-payments[_ngcontent-%COMP%]   .govuk-hint[_ngcontent-%COMP%], .allocate-payments[_ngcontent-%COMP%]   .govuk-font__custom[_ngcontent-%COMP%]{font-size:19px}.allocate-payments[_ngcontent-%COMP%]   .govuk-radios__conditional--hidden[_ngcontent-%COMP%]{display:none}.allocate-payments[_ngcontent-%COMP%]   .form-group-error[_ngcontent-%COMP%]{border-left:5px solid #b10e1e;padding-left:15px}.allocate-payments[_ngcontent-%COMP%]   .inline-error-class[_ngcontent-%COMP%]{outline:3px solid #a71414;outline-offset:0}.allocate-payments[_ngcontent-%COMP%]   .inline-error-message[_ngcontent-%COMP%]{color:#a71414;font-weight:700;margin-top:10px}.allocate-payments[_ngcontent-%COMP%]   .inline-error-border[_ngcontent-%COMP%]{border-color:#a71414}.allbtb[_ngcontent-%COMP%]{margin-top:2em}.govuk-back-link[_ngcontent-%COMP%]{font-size:1.5rem!important}.multiple-choice[_ngcontent-%COMP%]{font-size:19px}.casererf[_ngcontent-%COMP%]{align-self:flex-end;font-size:19px}.paymentrequest[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;width:960px}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AllocatePaymentsComponent, [{
        type: Component,
        args: [{ selector: 'app-allocate-payments', template: "<div class=\"allocate-payments\">\n  <ng-container *ngIf=\"viewStatus === 'mainForm' && !isTurnOff\">\n\n      <div class=\"govuk-breadcrumbs\">\n          <ol class=\"govuk-breadcrumbs__list\">\n            <li class=\"govuk-breadcrumbs__list-item\">\n              <a (click)=\"gotoCasetransationPage()\" class=\"govuk-back-link govuk-label\">Back</a>\n            </li>\n          </ol>\n        </div>\n  \n    <div class=\"paymentrequest\">\n        <h1 class=\"govuk-heading-xl govuk-!-margin-top-3 govuk-!-margin-bottom-4\">Select payment request</h1>\n        <p class=\"govuk-!-margin-top-5 casererf\">Case reference: {{ccdReference}}</p>\n    </div>\n \n    <div  *ngFor=\"let orderRef of orderLevelFees; let i = index;\" class=\"multiple-choice unprocessed-payments--radio-button\">\n      <input id=\"'orderfee'+i+''\"\n      aria-label=\"orderLevelRecord\"\n      name=\"orderLevelRecord\"\n    \n      (click)=\"OrderListSelectEvent(orderRef.orderRefId)\"\n      type=\"radio\"\n      value=\"{{orderRef.orderTotalFees}}\" />\n      <label for=\"radio-inline-1\"> {{orderRef.orderTotalFees | currency :'GBP':'symbol':'1.2-2'}}({{orderRef.orderStatus}})</label>\n    </div>\n  \n    <div class=\"paymentrequest\">\n        <button [disabled]=\"isContinueButtondisabled\" type=\"submit\" (click)=\"redirectToOrderFeeSearchPage()\" class=\"button allbtb button--disabled govuk-!-margin-right-1\">\n          Continue\n        </button>\n      </div>\n   \n  </ng-container>\n\n   <div *ngIf=\"viewStatus==='mainForm' && isTurnOff\">\n    <input #myInput type='hidden' class='iFrameDrivenImageValue' value='ALLOCATEPAYMENTS'>\n    <div class=\"govuk-breadcrumbs\" *ngIf=\"paymentRef\">\n      <ol class=\"govuk-breadcrumbs__list\">\n        <li class=\"govuk-breadcrumbs__list-item\">\n          <a href=\"#\" (click)=\"gotoSummaryPage($event)\" class=\"govuk-back-link\">Back</a>\n        </li>\n      </ol>\n    </div>\n    <div class=\"govuk-heading-section\">\n      <h1 class=\"govuk-heading-xl\">Allocate payment to fee group</h1>\n      <h2 class=\"govuk-heading-l\">Amount left to be allocated:\n        {{ unAllocatedPayment.amount | currency:'GBP':'symbol-narrow':'1.2-2' }}</h2>\n    </div>\n    <div class=\"payment-group-section\" *ngFor=\"let paymentGroup of paymentGroups\">\n      <h3 class=\"govuk-heading-m\">Group reference: {{paymentGroup.payment_group_reference}}</h3>\n      <table class=\"govuk-table\">\n        <thead class=\"govuk-table__head\">\n          <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__header\" scope=\"col\"></td>\n            <td class=\"govuk-table__header\" scope=\"col\">Code</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Description</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Volume</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Fee amount</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Calculated amount</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Group amount outstanding</td>\n          </tr>\n        </thead>\n        <tbody class=\"govuk-table__body\">\n          <tr class=\"govuk-table__row\" *ngFor=\"let fee of paymentGroup.fees;  let i = index;\">\n            <td class=\"govuk-table__cell govuk-table__cell--col1 govuk-table__custom--col1\"\n              [attr.rowspan]=\"paymentGroup.fees.length\" *ngIf=\"i==0\">\n              <div class=\"multiple-choice\">\n                <input id=\"unpaiedFee-{{i}}\" name=\"unassignedRecord\" type=\"radio\"\n                  (click)=\"selectedPaymentGroup(paymentGroup)\" />\n                <label for=\"unpaiedFee-{{i}}\"></label>\n              </div>\n            </td>\n            <td class=\"govuk-table__cell govuk-table__cell--col1\">{{fee.code}}</td>\n            <td class=\"govuk-table__cell govuk-table__cell--col2\"> {{fee.description}} </td>\n            <td class=\"govuk-table__cell govuk-table__cell--col3\"> {{fee.volume? fee.volume : '-'}} </td>\n            <td class=\"govuk-table__cell govuk-table__cell--col4\">\n              {{ fee.fee_amount | currency:'GBP':'symbol-narrow':'1.2-2' }} </td>\n            <td class=\"govuk-table__cell govuk-table__cell--col5\">\n              {{fee.calculated_amount | currency:'GBP':'symbol-narrow':'1.2-2' }} </td>\n            <td class=\"govuk-table__cell govuk-table__cell--col6 govuk-table__custom--col6\"\n              [attr.rowspan]=\"paymentGroup.fees.length\" *ngIf=\"i==0\">\n              {{getGroupOutstandingAmount(paymentGroup) | currency:'GBP':'symbol-narrow':'1.2-2' }} </td>\n\n          </tr>\n\n        </tbody>\n        <tbody class=\"govuk-table__body\" *ngIf=\"paymentGroup.fees.length==0\">\n          <td class=\"govuk-table__cell\" colspan=\"6\">No payments recorded</td>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"govuk-button-group-allocate\">\n      <button type=\"button\" class=\"button govuk-!-margin-right-1\" [disabled]=\"isContinueButtondisabled\"\n        (click)=\"saveAndContinue()\">\n        Continue\n      </button>\n      <button type=\"button\" class=\"button govuk-button--secondary\" (click)=\"gotoCasetransationPage()\">\n        Cancel\n      </button>\n    </div>\n  </div>\n\n  <ng-container *ngIf=\"(viewStatus === 'mainForm' && isTurnOff) || viewStatus === 'allocatePaymentConfirmation'\">\n    <ccpay-error-banner *ngIf=\"errorMessage.showError\" [errorMessage]=\"errorMessage\"></ccpay-error-banner>\n    <input #myInput type='hidden' class='iFrameDrivenImageValue' value='{{feedbackUrlLabel}}'>\n    <h1 class=\"govuk-heading-xl\">Confirm allocation</h1>\n    <h2 class=\"govuk-heading-l govuk-heading-l--custom\">\n      Amount to be allocated: {{amountForAllocation | currency:'GBP':'symbol-narrow':'1.2-2'}}\n    </h2>\n    <div class=\"payment-group-section\" *ngIf=\"paymentGroup\">\n      <h3 class=\"govuk-heading-m--custom\" *ngIf=\"isTurnOff\">Group reference: {{paymentGroup.payment_group_reference}}\n      </h3>\n      <table class=\"govuk-table\">\n        <thead class=\"govuk-table__head\">\n          <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__header\" scope=\"col\">Code</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Description</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Volume</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Fee amount</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Calculated amount</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Amount Due</td>\n          </tr>\n        </thead>\n        <tbody class=\"govuk-table__body\">\n          <tr class=\"govuk-table__row\" *ngFor=\"let fee of paymentGroup.fees; let i = index;\">\n            <td class=\"govuk-table__cell govuk-table__cell--col1\">{{fee.code}}</td>\n            <td class=\"govuk-table__cell govuk-table__cell--col2\"> {{fee.description}} </td>\n            <td class=\"govuk-table__cell govuk-table__cell--col3\"> {{fee.volume? fee.volume : '-'}} </td>\n            <td class=\"govuk-table__cell govuk-table__cell--col4\">\n              {{ fee.fee_amount | currency:'GBP':'symbol-narrow':'1.2-2' }} </td>\n            <td class=\"govuk-table__cell govuk-table__cell--col5\">\n              {{fee.calculated_amount | currency:'GBP':'symbol-narrow':'1.2-2'}} </td>\n            <td class=\"govuk-table__cell govuk-table__cell--col6\" [attr.rowspan]=\"paymentGroup.fees.length\"\n              *ngIf=\"i==0\"> {{afterFeeAllocateOutstanding | currency:'GBP':'symbol-narrow':'1.2-2'}} </td>\n          </tr>\n        </tbody>\n        <tbody class=\"govuk-table__body\" *ngIf=\"paymentGroup.fees.length == 0\">\n          <td class=\"govuk-table__cell\" colspan=\"6\">No payments recorded</td>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"govuk-warning-text\" *ngIf=\"isRemainingAmountGtZero || isRemainingAmountLtZero || remainingAmount === 0\">\n      <span class=\"govuk-warning-text__icon\" aria-hidden=\"true\">!</span>\n      <strong class=\"govuk-warning-text__text govuk-warning-text__custom\">\n        <span class=\"govuk-warning-text__assistive\">Warning</span>\n        {{paymentSectionLabel.title}} {{ remainingAmount | currency:'GBP':'symbol-narrow':'1.2-2' }}\n      </strong>\n    </div>\n    <div class=\"govuk-form-group\" *ngIf=\"isRemainingAmountGtZero || isRemainingAmountLtZero\">\n      <div class=\"govuk-form-group\">\n        <fieldset class=\"govuk-fieldset\" aria-describedby=\"how-contacted-conditional-hint\">\n          <span id=\"how-contacted-conditional-hint\" class=\"govuk-hint\"\n            [ngClass]=\"{'inline-error-message': paymentReasonHasError}\">\n            {{paymentSectionLabel.reason}}\n          </span>\n          <div\n            [ngClass]=\"paymentReasonHasError ? 'govuk-radios govuk-radios--conditional form-group-error' : 'govuk-radios govuk-radios--conditional'\"\n            data-module=\"govuk-radios\" *ngIf=\"isRemainingAmountGtZero\">\n            <div class=\"govuk-radios__item\" *ngFor=\"let reason of reasonList.overPayment | keyValue\">\n              <input class=\"govuk-radios__input\" id=\"{{reason.key}}\" name=\"paymentReason\" type=\"radio\"\n                [(ngModel)]=\"paymentReason\" value={{reason.value}}>\n              <label class=\"govuk-label govuk-radios__label govuk-font__custom\" for=\"how-contacted-conditional\">\n                {{reason.value}}\n              </label>\n            </div>\n          </div>\n          <div\n            [ngClass]=\"paymentReasonHasError ? 'govuk-radios govuk-radios--conditional form-group-error' : 'govuk-radios govuk-radios--conditional'\"\n            data-module=\"govuk-radios\" *ngIf=\"isRemainingAmountLtZero\">\n            <div class=\"govuk-radios__item\" *ngFor=\"let reason of reasonList.shortFall | keyValue\">\n              <input class=\"govuk-radios__input\" id=\"{{reason.key}}\" name=\"paymentReason\" type=\"radio\"\n                [(ngModel)]=\"paymentReason\" value={{reason.value}}>\n              <label class=\"govuk-label govuk-radios__label govuk-font__custom\" for=\"how-contacted-conditional\">\n                {{reason.value}}\n              </label>\n            </div>\n          </div>\n        </fieldset>\n      </div>\n      <div class=\"govuk-form-group\">\n        <fieldset class=\"govuk-fieldset\" aria-describedby=\"how-contacted-conditional-hint\">\n          <span id=\"how-contacted-conditional-hint\" class=\"govuk-hint\"\n            [ngClass]=\"{'inline-error-message': paymentExplanationHasError}\">\n            Provide an explanatory note\n          </span>\n          <div\n            [ngClass]=\"paymentExplanationHasError ? 'govuk-radios govuk-radios--conditional form-group-error' : 'govuk-radios govuk-radios--conditional'\"\n            data-module=\"govuk-radios\" *ngIf=\"isRemainingAmountGtZero\">\n            <div class=\"govuk-radios__item\" *ngFor=\"let explanation of explanationList.overPayment | keyValue\">\n              <input class=\"govuk-radios__input\" id=\"{{explanation.key}}\" name=\"paymentExplanation\" type=\"radio\"\n                [(ngModel)]=\"paymentExplanation\" value={{explanation.value}}\n                (click)=\"selectRadioButton(explanation.key, 'explanation')\">\n              <label class=\"govuk-label govuk-radios__label govuk-font__custom\" for=\"how-contacted-conditional\">\n                {{explanation.value}}\n              </label>\n            </div>\n          </div>\n          <div\n            [ngClass]=\"paymentExplanationHasError ? 'govuk-radios govuk-radios--conditional form-group-error' : 'govuk-radios govuk-radios--conditional'\"\n            data-module=\"govuk-radios\" *ngIf=\"isRemainingAmountLtZero\">\n            <div class=\"govuk-radios__item\" *ngFor=\"let explanation of explanationList.shortFall | keyValue\">\n              <input class=\"govuk-radios__input\" id=\"{{explanation.key}}\" name=\"paymentExplanation\" type=\"radio\"\n                [(ngModel)]=\"paymentExplanation\" value={{explanation.value}}\n                (click)=\"selectRadioButton(explanation.key, 'explanation')\">\n              <label class=\"govuk-label govuk-radios__label govuk-font__custom\" for=\"how-contacted-conditional\">\n                {{explanation.value}}\n              </label>\n            </div>\n          </div>\n        </fieldset>\n      </div>\n    </div>\n\n    <form [formGroup]=\"overUnderPaymentForm\" novalidate>\n      <div\n        [ngClass]=\"isMoreDetailsBoxHide ? 'govuk-radios__conditional govuk-radios__conditional--hidden' : isPaymentDetailsEmpty || isPaymentDetailsInvalid || paymentDetailsMinHasError || paymentDetailsMaxHasError ? 'govuk-radios__conditional inline-error-border' : 'govuk-radios__conditional'\"\n        id=\"conditional-how-contacted-conditional-3\">\n        <div class=\"govuk-form-group\">\n          <span id=\"more-detail-hint\" class=\"govuk-hint govuk-font__custom\">\n            Please enter details\n          </span>\n          <textarea class=\"govuk-textarea\"\n            [ngClass]=\"{'inline-error-class': isPaymentDetailsEmpty || isPaymentDetailsInvalid || paymentDetailsMinHasError || paymentDetailsMaxHasError}\"\n            id=\"moreDetails\" name=\"moreDetails\" rows=\"5\" formControlName=\"moreDetails\">\n          </textarea>\n          <p class=\"inline-error-message\"\n            *ngIf=\"isPaymentDetailsEmpty || isPaymentDetailsInvalid || paymentDetailsMinHasError || paymentDetailsMaxHasError\">\n            <span *ngIf=\"isPaymentDetailsEmpty\">Enter a explanation</span>\n            <span *ngIf=\"isPaymentDetailsInvalid\">Enter a valid explanation</span>\n            <span *ngIf=\"paymentDetailsMinHasError\">Explanation should be at least 3 characters.</span>\n            <span *ngIf=\"paymentDetailsMaxHasError\">Explanation should be 255 characters or under.</span>\n          </p>\n        </div>\n      </div>\n      <div class=\"govuk-button--group\">\n        <button type=\"submit\" [disabled]=\"isConfirmButtondisabled\"\n          [ngClass]=\"isConfirmButtondisabled ? 'button button--disabled' : 'button'\"\n          (click)=\"confirmAllocatePayement()\">\n          Confirm\n        </button>\n        <button type=\"button\" class=\"button govuk-button--secondary\" (click)=\"cancelAllocatePayment($event)\">\n          Cancel\n        </button>\n      </div>\n    </form>\n  </ng-container>\n</div>", styles: [".allocate-payments{margin:20px 0}.allocate-payments .govuk-table__cell--col1,.allocate-payments .govuk-table__cell--col3{width:10%}.allocate-payments .govuk-table__cell--col2,.allocate-payments .govuk-table__cell--col6{width:25%}.allocate-payments .govuk-table__cell--col4,.allocate-payments .govuk-table__cell--col5{width:15%}.allocate-payments .govuk-button-group-allocate{display:flex;justify-content:flex-start}.allocate-payments .govuk-button--secondary{margin-left:10px;background-color:#b3b8bdf2}.allocate-payments .govuk-custom-warning__message{font-size:30px;position:relative;top:12px;font-weight:700}.allocate-payments .govuk-warning-text-custom{margin-bottom:0!important;padding:10px 0 5px}.allocate-payments .govuk-table__custom--col1{padding-top:0;padding-bottom:20px;padding-left:15px}.allocate-payments .govuk-table__custom--col6{text-align:center}.allocate-payments .govuk-list__custom{padding-left:20px}.allocate-payments .govuk-warning-text__custom,.allocate-payments .govuk-list__custom,.allocate-payments .govuk-heading-m--custom,.allocate-payments .govuk-label--m,.allocate-payments .govuk-radios__item,.allocate-payments .govuk-hint,.allocate-payments .govuk-font__custom{font-size:19px}.allocate-payments .govuk-radios__conditional--hidden{display:none}.allocate-payments .form-group-error{border-left:5px solid #b10e1e;padding-left:15px}.allocate-payments .inline-error-class{outline:3px solid #a71414;outline-offset:0}.allocate-payments .inline-error-message{color:#a71414;font-weight:700;margin-top:10px}.allocate-payments .inline-error-border{border-color:#a71414}.allbtb{margin-top:2em}.govuk-back-link{font-size:1.5rem!important}.multiple-choice{font-size:19px}.casererf{align-self:flex-end;font-size:19px}.paymentrequest{display:flex;flex-direction:row;justify-content:space-between;width:960px}\n"] }]
    }], function () { return [{ type: i1.ErrorHandlerService }, { type: i2.CaseTransactionsService }, { type: i3.FormBuilder }, { type: i4.PaymentViewService }, { type: i5.PaymentLibComponent }, { type: i6.BulkScaningPaymentService }, { type: i7.OrderslistService }]; }, { isTurnOff: [{
            type: Input
        }], caseType: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsb2NhdGUtcGF5bWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9jb21wb25lbnRzL2FsbG9jYXRlLXBheW1lbnRzL2FsbG9jYXRlLXBheW1lbnRzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9hbGxvY2F0ZS1wYXltZW50cy9hbGxvY2F0ZS1wYXltZW50cy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFhLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN0RixPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw0REFBNEQsQ0FBQztBQUNuRyxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxrRUFBa0UsQ0FBQztBQUMzRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUdsRixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUV2RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7SUNJbEUsK0JBQXlILGdCQUFBO0lBS3ZILHFQQUFTLGVBQUEsbURBQXlDLENBQUEsSUFBQztJQUpuRCxpQkFNc0M7SUFDdEMsaUNBQTRCO0lBQUMsWUFBd0Y7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QkFBeUI7Y0FMckMsU0FBUzsyQkFDRSx1QkFBdUI7aVJBS3hCLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBheW1lbnRMaWJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9wYXltZW50LWxpYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGF5bWVudFZpZXdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcGF5bWVudC12aWV3L3BheW1lbnQtdmlldy5zZXJ2aWNlJztcbmltcG9ydCB7Q2FzZVRyYW5zYWN0aW9uc1NlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhc2UtdHJhbnNhY3Rpb25zL2Nhc2UtdHJhbnNhY3Rpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHtCdWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9idWxrLXNjYW5pbmctcGF5bWVudC9idWxrLXNjYW5pbmctcGF5bWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IEVycm9ySGFuZGxlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zaGFyZWQvZXJyb3ItaGFuZGxlci5zZXJ2aWNlJztcbmltcG9ydCB7SVBheW1lbnRHcm91cH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUGF5bWVudEdyb3VwJztcbmltcG9ydCB7SUJTUGF5bWVudHN9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSUJTUGF5bWVudHMnO1xuaW1wb3J0IHtBbGxvY2F0ZVBheW1lbnRSZXF1ZXN0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0FsbG9jYXRlUGF5bWVudFJlcXVlc3QnO1xuaW1wb3J0IHtJQWxsb2NhdGlvblBheW1lbnRzUmVxdWVzdH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JQWxsb2NhdGlvblBheW1lbnRzUmVxdWVzdCc7XG5pbXBvcnQgeyBJT3JkZXJSZWZlcmVuY2VGZWUgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lPcmRlclJlZmVyZW5jZUZlZSc7XG5pbXBvcnQgeyBPcmRlcnNsaXN0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29yZGVyc2xpc3Quc2VydmljZSc7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtYWxsb2NhdGUtcGF5bWVudHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxsb2NhdGUtcGF5bWVudHMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hbGxvY2F0ZS1wYXltZW50cy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFsbG9jYXRlUGF5bWVudHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpc1R1cm5PZmY6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNhc2VUeXBlOiBzdHJpbmc7XG5cbiAgb3ZlclVuZGVyUGF5bWVudEZvcm06IEZvcm1Hcm91cDtcbiAgdmlld1N0YXR1czogc3RyaW5nO1xuICBjY2RDYXNlTnVtYmVyOiBzdHJpbmc7XG4gIGJzcGF5bWVudGRjbjogc3RyaW5nO1xuICByZWNvcmRJZDpzdHJpbmc7XG4gIGZlZWRiYWNrVXJsTGFiZWw6c3RyaW5nO1xuICB1bkFsbG9jYXRlZFBheW1lbnQ6IElCU1BheW1lbnRzID0ge1xuICAgIGFtb3VudDogMFxuICB9O1xuICBzaXRlSUQ6IHN0cmluZyA9IG51bGw7XG4gIC8vIGVycm9yTWVzc2FnZSA9IHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5nZXRTZXJ2ZXJFcnJvck1lc3NhZ2UoZmFsc2UsIGZhbHNlLCAnJyk7XG4gIGVycm9yTWVzc2FnZSA9IG51bGxcbiAgcGF5bWVudEdyb3VwOiBJUGF5bWVudEdyb3VwO1xuICBwYXltZW50R3JvdXBzOiBJUGF5bWVudEdyb3VwW10gPSBbXTtcbiAgcmVtYWluaW5nQW1vdW50OiBudW1iZXI7XG4gIGlzUmVtYWluaW5nQW1vdW50R3RaZXJvOiBib29sZWFuO1xuICBpc01vcmVEZXRhaWxzQm94SGlkZTogYm9vbGVhbiAgPSB0cnVlO1xuICBpc1JlbWFpbmluZ0Ftb3VudEx0WmVybzogYm9vbGVhbjtcbiAgYWZ0ZXJGZWVBbGxvY2F0ZU91dHN0YW5kaW5nOiBudW1iZXI7XG4gIGFtb3VudEZvckFsbG9jYXRpb246IG51bWJlcjtcbiAgaXNDb25maXJtQnV0dG9uZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNDb250aW51ZUJ1dHRvbmRpc2FibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgb3RoZXJQYXltZW50RXhwbGFuYXRpb246IHN0cmluZyA9IG51bGw7XG4gIHNlbGVjdGVkT3B0aW9uOiBzdHJpbmcgPSBudWxsO1xuICBpc0ZlZUFtb3VudFplcm86IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwYXltZW50UmVhc29uSGFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcGF5bWVudEV4cGxhbmF0aW9uSGFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNQYXltZW50RGV0YWlsc0VtcHR5OiBib29sZWFuID0gZmFsc2U7XG4gIGlzUGF5bWVudERldGFpbHNJbnZhbGlkOiBib29sZWFuID0gZmFsc2U7XG4gIHBheW1lbnREZXRhaWxzTWluSGFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcGF5bWVudERldGFpbHNNYXhIYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1VzZXJOYW1lRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNVc2VyTmFtZUludmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY2NkUmVmZXJlbmNlOiBzdHJpbmcgPSBudWxsO1xuICBleGNlcHRpb25SZWZlcmVuY2U6IHN0cmluZyA9IG51bGw7XG4gIHBheW1lbnRSZWFzb246IHN0cmluZyA9IG51bGw7XG4gIHBheW1lbnRFeHBsYW5hdGlvbjogc3RyaW5nID0gbnVsbDtcbiAgdXNlck5hbWU6IHN0cmluZyA9IG51bGw7XG4gIHBheW1lbnRTZWN0aW9uTGFiZWw6IGFueTtcbiAgcGF5bWVudFJlZjogc3RyaW5nID0gbnVsbDtcbiAgaXNTdHJhdGVnaWNGaXhFbmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICBvcmRlckxldmVsRmVlczogSU9yZGVyUmVmZXJlbmNlRmVlW10gPSBbXTtcbiAgY29va2llVXNlck5hbWU6IHN0cmluZ1tdID0gW107XG4gIGVuQ29va2llVXNlck5hbWU6IGFueTtcbiAgdXNlck5hbWVGaWVsZDogc3RyaW5nID0gbnVsbDtcblxuICByZWFzb25MaXN0OiB7IFtrZXk6IHN0cmluZ106IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfT0ge1xuICAgIG92ZXJQYXltZW50OiB7XG4gICAgICBod2ZSZXdhcmQ6ICdIZWxwIHdpdGggRmVlcyAoSFdGKSBhd2FyZGVkLiAgUGxlYXNlIGluY2x1ZGUgdGhlIEhXRiByZWZlcmVuY2UgbnVtYmVyIGluIHRoZSBleHBsYW5hdG9yeSBub3RlJyxcbiAgICAgIHdyb25nRmVlOiAnSW5jb3JyZWN0IHBheW1lbnQgcmVjZWl2ZWQnLFxuICAgICAgbm90SXNzdWVDYXNlOiAnVW5hYmxlIHRvIGlzc3VlIGNhc2UnLFxuICAgICAgb3RoZXJEZWR1Y3Rpb246ICdPdGhlcidcbiAgICB9LFxuICAgIHNob3J0RmFsbDoge1xuICAgICAgaGVscFdpdGhGZWU6ICdIZWxwIHdpdGggRmVlcyAoSFdGKSBhcHBsaWNhdGlvbiBkZWNsaW5lZCcsXG4gICAgICB3cm9uZ0ZlZTogJ0luY29ycmVjdCBwYXltZW50IHJlY2VpdmVkJyxcbiAgICAgIG90aGVyOiAnT3RoZXInXG4gICAgfVxuICB9XG4gIGV4cGxhbmF0aW9uTGlzdCA9IHtcbiAgICBvdmVyUGF5bWVudDoge1xuICAgICAgcmVmZXJSZWZ1bmQ6ICdEZXRhaWxzIGluIGNhc2Ugbm90ZXMuICBSZWZ1bmQgZHVlJyxcbiAgICAgIG5vUmVmdW5kOiAnRGV0YWlscyBpbiBjYXNlIG5vdGVzLiBObyByZWZ1bmQgZHVlJyxcbiAgICAgIG5vQ2FzZTogJ05vIGNhc2UgY3JlYXRlZC4gIFJlZnVuZCBkdWUnLFxuICAgICAgb3RoZXI6ICdPdGhlcidcbiAgICB9LFxuICAgIHNob3J0RmFsbDoge1xuICAgICAgaG9sZENhc2U6ICdJIGhhdmUgcHV0IGEgc3RvcCBvbiB0aGUgY2FzZSBhbmQgY29udGFjdGVkIHRoZSBhcHBsaWNhbnQgcmVxdWVzdGluZyB0aGUgYmFsYW5jZSBvZiBwYXltZW50JyxcbiAgICAgIGhlbGRDYXNlOiAnSSBoYXZlIHB1dCBhIHN0b3Agb24gdGhlIGNhc2UuICBUaGUgYXBwbGljYW50IG5lZWRzIHRvIGJlIGNvbnRhY3RlZCB0byByZXF1ZXN0IHRoZSBiYWxhbmNlIG9mIHBheW1lbnQnLFxuICAgICAgb3RoZXI6ICdPdGhlcidcbiAgICB9XG4gIH1cblxuICByZWZ1bmQgPSB7XG4gICAgcmVhc29uOiB7XG4gICAgICBkdXBsaWNhdGU6ICdEdXBsaWNhdGUgcGF5bWVudCcsXG4gICAgICBodW1hbmVycm9yOiAnSHVtYW4gZXJyb3InLFxuICAgICAgY2FzZVdpdGhkcmF3bjogJ0Nhc2Ugd2l0aGRyYXduJyxcbiAgICAgIG90aGVyOiAnT3RoZXInXG4gICAgfVxuICB9XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgcHJpdmF0ZSBlcnJvckhhbmRsZXJTZXJ2aWNlOiBFcnJvckhhbmRsZXJTZXJ2aWNlLFxuICBwcml2YXRlIGNhc2VUcmFuc2FjdGlvbnNTZXJ2aWNlOiBDYXNlVHJhbnNhY3Rpb25zU2VydmljZSxcbiAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gIHByaXZhdGUgcGF5bWVudFZpZXdTZXJ2aWNlOiBQYXltZW50Vmlld1NlcnZpY2UsXG4gIHByaXZhdGUgcGF5bWVudExpYkNvbXBvbmVudDogUGF5bWVudExpYkNvbXBvbmVudCxcbiAgcHJpdmF0ZSBidWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlOiBCdWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlLFxuICBwcml2YXRlIE9yZGVyc2xpc3RTZXJ2aWNlOiBPcmRlcnNsaXN0U2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJ21haW5Gb3JtJztcbiAgICBpZiAodGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRHcm91cFJlZmVyZW5jZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy52aWV3U3RhdHVzID0gJ2FsbG9jYXRlUGF5bWVudENvbmZpcm1hdGlvbic7XG4gICAgfVxuXG4gICAgdGhpcy5jY2RDYXNlTnVtYmVyID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LkNDRF9DQVNFX05VTUJFUjtcbiAgICB0aGlzLmJzcGF5bWVudGRjbiA9IHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5ic3BheW1lbnRkY247XG4gICAgdGhpcy5wYXltZW50UmVmID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRHcm91cFJlZmVyZW5jZTtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlNFTEVDVEVEX09QVElPTjtcbiAgICB0aGlzLmlzU3RyYXRlZ2ljRml4RW5hYmxlID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTU0ZFTkFCTEU7XG4gICAgdGhpcy5pc1R1cm5PZmYgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNUdXJuT2ZmO1xuICAgIHRoaXMub3ZlclVuZGVyUGF5bWVudEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIG1vcmVEZXRhaWxzOiBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDMpLFxuICAgICAgICBWYWxpZGF0b3JzLm1heExlbmd0aCgyNTUpLFxuICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oJ14oW2EtekEtWjAtOVxcXFxzLFxcXFwuXSopJCcpXG4gICAgICBdKSksXG4gICAgICB1c2VyTmFtZTogbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oJ14oW2EtekEtWjAtOVxcXFxzXSopJCcpXG4gICAgICBdKSksXG4gICAgfSk7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRPcmRlcnNMaXN0KCkuc3Vic2NyaWJlKCAoZGF0YSkgPT5cbiAgICB0aGlzLm9yZGVyTGV2ZWxGZWVzID0gZGF0YS5maWx0ZXIoZGF0YSA9PiBkYXRhLm9yZGVyU3RhdHVzICE9PSAnUGFpZCcpKTtcbiAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLmdldENhc2VUeXBlKCkuc3Vic2NyaWJlKCAoZGF0YSkgPT4gdGhpcy5jYXNlVHlwZSA9IGRhdGEpO1xuICAgIHRoaXMuZ2V0VW5hc3NpZ25lZFBheW1lbnQoKTtcbiAgfVxuICBnZXRHcm91cE91dHN0YW5kaW5nQW1vdW50KHBheW1lbnRHcm91cDogSVBheW1lbnRHcm91cCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYnVsa1NjYW5pbmdQYXltZW50U2VydmljZS5jYWxjdWxhdGVPdXRTdGFuZGluZ0Ftb3VudChwYXltZW50R3JvdXApO1xuICB9XG5cbiAgZ2V0UGF5bWVudEdyb3VwRGV0YWlscygpe1xuXG4gICAgaWYoIXRoaXMuaXNUdXJuT2ZmKXtcbiAgICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLmdldFBheW1lbnRHcm91cERldGFpbHModGhpcy5wYXltZW50UmVmKS5zdWJzY3JpYmUoXG4gICAgICAgIHBheW1lbnRHcm91cCA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmVycm9ySGFuZGxlclNlcnZpY2UuZ2V0U2VydmVyRXJyb3JNZXNzYWdlKGZhbHNlLCBmYWxzZSwgJycpO1xuICAgICAgICAgIHRoaXMucGF5bWVudEdyb3VwICA9IHBheW1lbnRHcm91cDtcbiAgICAgICAgICB0aGlzLnNhdmVBbmRDb250aW51ZSgpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdGhpcy5lcnJvckhhbmRsZXJTZXJ2aWNlLmdldFNlcnZlckVycm9yTWVzc2FnZSh0cnVlLCBmYWxzZSwgJycpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1lbHNlIHtcbiAgICAgIHRoaXMuY2FzZVRyYW5zYWN0aW9uc1NlcnZpY2UuZ2V0UGF5bWVudEdyb3Vwcyh0aGlzLmNjZENhc2VOdW1iZXIpLnN1YnNjcmliZShcbiAgICAgICAgcGF5bWVudEdyb3VwcyA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmVycm9ySGFuZGxlclNlcnZpY2UuZ2V0U2VydmVyRXJyb3JNZXNzYWdlKGZhbHNlLCBmYWxzZSwgJycpO1xuICAgICAgICB0aGlzLnBheW1lbnRHcm91cHMgPSBwYXltZW50R3JvdXBzWydwYXltZW50X2dyb3VwcyddLmZpbHRlcihwYXltZW50R3JvdXAgPT4ge1xuICAgICAgICAgICAgcGF5bWVudEdyb3VwLmZlZXMuZm9yRWFjaChmZWUgPT4ge1xuICAgICAgICAgICAgICBpZihmZWUuY2FsY3VsYXRlZF9hbW91bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRmVlQW1vdW50WmVybyA9IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgZnN0Q29uID0gdGhpcy5nZXRHcm91cE91dHN0YW5kaW5nQW1vdW50KDxJUGF5bWVudEdyb3VwPnBheW1lbnRHcm91cCksXG4gICAgICAgICAgICBzY25kQ24gPSBmc3RDb24gPiAwIHx8IChmc3RDb24gPT0gMCAmJiB0aGlzLmlzRmVlQW1vdW50WmVybykgJiYgcGF5bWVudEdyb3VwLnBheW1lbnRfZ3JvdXBfcmVmZXJlbmNlID09PSB0aGlzLnBheW1lbnRSZWY7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXltZW50UmVmID8gIHNjbmRDbiA6IGZzdENvbiA+IDAgfHwgKGZzdENvbiA9PSAwICYmIHRoaXMuaXNGZWVBbW91bnRaZXJvKTtcbiAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmVycm9ySGFuZGxlclNlcnZpY2UuZ2V0U2VydmVyRXJyb3JNZXNzYWdlKHRydWUsIGZhbHNlLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuXG4gIH1cblxuICBzZWxlY3RlZFBheW1lbnRHcm91cChwYXltZW50R3JvdXA6IElQYXltZW50R3JvdXApIHtcbiAgICB0aGlzLmlzQ29udGludWVCdXR0b25kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMucGF5bWVudEdyb3VwID0gcGF5bWVudEdyb3VwO1xuICB9XG5cbiAgZ290b0Nhc2V0cmFuc2F0aW9uUGFnZSgpIHtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAnY2FzZS10cmFuc2FjdGlvbnMnO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc1R1cm5PZmYgPSB0aGlzLmlzVHVybk9mZjtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPSB0cnVlO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5JU0JTRU5BQkxFID0gdHJ1ZTtcbiAgfVxuXG4gIGdvdG9TdW1tYXJ5UGFnZShldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAnZmVlLXN1bW1hcnknO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc1R1cm5PZmYgPSB0aGlzLmlzVHVybk9mZjtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPSB0cnVlO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5JU0JTRU5BQkxFID0gdHJ1ZTtcbiAgfVxuXG4gIGNhbmNlbEFsbG9jYXRlUGF5bWVudChldmVudDogYW55KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLCAnYWxsJyk7XG4gICAgaWYoIXRoaXMuaXNUdXJuT2ZmKXtcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC52aWV3TmFtZSA9ICdmZWUtc3VtbWFyeSc7XG4gICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNUdXJuT2ZmID0gdGhpcy5pc1R1cm5PZmY7XG4gICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPSB0cnVlO1xuICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTQlNFTkFCTEUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdTdGF0dXMgPSAnbWFpbkZvcm0nO1xuICAgIH1cbiAgfVxuICBjb25maXJtQWxsb2NhdGVQYXllbWVudCgpe1xuICAgIHRoaXMuZW5Db29raWVVc2VyTmFtZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIikuZmluZChyb3cgPT4gcm93LmluY2x1ZGVzKFwidXNlci1pbmZvXCIpKS5zcGxpdChcIj1cIilbMV0uc3BsaXQoXCI7XCIpO1xuICAgIHRoaXMuY29va2llVXNlck5hbWUgPSBKU09OLnBhcnNlKGRlY29kZVVSSUNvbXBvbmVudCh0aGlzLmVuQ29va2llVXNlck5hbWUpKTtcblxuICAgIGNvbnN0IGZ1bGxOYW1lID0gdGhpcy5jb29raWVVc2VyTmFtZVsnZm9yZW5hbWUnXSArICcgJyArIHRoaXMuY29va2llVXNlck5hbWVbJ3N1cm5hbWUnXTtcblxuICAgIGNvbnN0IHBheW1lbnREZXRhaWxzRmllbGQgPSB0aGlzLm92ZXJVbmRlclBheW1lbnRGb3JtLmNvbnRyb2xzLm1vcmVEZXRhaWxzLFxuICAgICAgcGF5bWVudEZvcm1FcnJvciA9IHRoaXMub3ZlclVuZGVyUGF5bWVudEZvcm0uY29udHJvbHMubW9yZURldGFpbHMuZXJyb3JzLFxuICAgICAgdXNlck5hbWVGaWVsZCA9IGZ1bGxOYW1lLFxuICAgICAgaXNFbXB0eUNvbmR0aW9uID0gdGhpcy5wYXltZW50UmVhc29uICYmIHRoaXMucGF5bWVudEV4cGxhbmF0aW9uLFxuICAgICAgaXNPdGhlck9wdGlvblNlbGVjdGVkID0gdGhpcy5wYXltZW50RXhwbGFuYXRpb24gPT09ICdPdGhlcic7XG5cbiAgICB0aGlzLnJlc2V0Rm9ybShbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSwgJ2FsbCcpO1xuICAgIGlmICggKCF0aGlzLmlzUmVtYWluaW5nQW1vdW50R3RaZXJvICYmICF0aGlzLmlzUmVtYWluaW5nQW1vdW50THRaZXJvKSB8fCBpc0VtcHR5Q29uZHRpb24gJiYgKCFpc090aGVyT3B0aW9uU2VsZWN0ZWQgJiYgdXNlck5hbWVGaWVsZC5sZW5ndGggPiAwIHx8IGlzT3RoZXJPcHRpb25TZWxlY3RlZCAmJiB1c2VyTmFtZUZpZWxkLmxlbmd0aCA+IDAgJiYgcGF5bWVudERldGFpbHNGaWVsZC52YWxpZCkpIHtcbiAgICAgIHRoaXMuaXNDb25maXJtQnV0dG9uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5vdGhlclBheW1lbnRFeHBsYW5hdGlvbiA9IHRoaXMucGF5bWVudEV4cGxhbmF0aW9uID09PSAnT3RoZXInID8gcGF5bWVudERldGFpbHNGaWVsZC52YWx1ZSA6IHRoaXMucGF5bWVudEV4cGxhbmF0aW9uO1xuICAgICAgdGhpcy51c2VyTmFtZSA9IHVzZXJOYW1lRmllbGQ7XG4gICAgICB0aGlzLmZpbmFsU2VydmljZUNhbGwoKTtcbiAgICB9ZWxzZSB7XG4gICAgICBpZighdGhpcy5wYXltZW50UmVhc29uKSB7XG4gICAgICAgIHRoaXMucmVzZXRGb3JtKFt0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sICdyZWFzb24nKTtcbiAgICAgIH1cbiAgICAgIGlmKCF0aGlzLnBheW1lbnRFeHBsYW5hdGlvbikge1xuICAgICAgICB0aGlzLnJlc2V0Rm9ybShbZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLCAnZXhwbGFuYXRpb24nKTtcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMucGF5bWVudEV4cGxhbmF0aW9uICYmIGlzT3RoZXJPcHRpb25TZWxlY3RlZCkge1xuICAgICAgICBpZihwYXltZW50RGV0YWlsc0ZpZWxkLnZhbHVlID09ICcnICkge1xuICAgICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sICdvdGhlcicpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHBheW1lbnREZXRhaWxzRmllbGQudmFsdWUgIT0gJycgJiYgcGF5bWVudERldGFpbHNGaWVsZC5pbnZhbGlkICkge1xuICAgICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sICdvdGhlcicpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHBheW1lbnRGb3JtRXJyb3IgJiYgcGF5bWVudEZvcm1FcnJvci5taW5sZW5ndGggJiYgcGF5bWVudEZvcm1FcnJvci5taW5sZW5ndGguYWN0dWFsTGVuZ3RoIDwgMyApIHtcbiAgICAgICAgICB0aGlzLnJlc2V0Rm9ybShbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLCAnb3RoZXInKTtcbiAgICAgICAgfVxuICAgICAgICBpZihwYXltZW50Rm9ybUVycm9yICYmIHBheW1lbnRGb3JtRXJyb3IubWF4bGVuZ3RoICYmIHBheW1lbnRGb3JtRXJyb3IubWF4bGVuZ3RoLmFjdHVhbExlbmd0aCA+IDI1NSApIHtcbiAgICAgICAgICB0aGlzLnJlc2V0Rm9ybShbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2VdLCAnb3RoZXInKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYodXNlck5hbWVGaWVsZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5yZXNldEZvcm0oW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlXSwgJ3VzZXJuYW1lJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0Rm9ybSh2YWxzLCBmaWVsZCkge1xuICAgIGlmKGZpZWxkPT09J3JlYXNvbicgfHwgZmllbGQ9PT0nYWxsJykge1xuICAgICAgdGhpcy5wYXltZW50UmVhc29uSGFzRXJyb3IgPSB2YWxzWzBdO1xuICAgIH1cbiAgICBpZihmaWVsZD09PSdleHBsYW5hdGlvbicgfHwgZmllbGQ9PT0nYWxsJykge1xuICAgICAgdGhpcy5wYXltZW50RXhwbGFuYXRpb25IYXNFcnJvciA9IHZhbHNbMV07XG4gICAgfVxuICAgIGlmKGZpZWxkPT09J290aGVyJyB8fCBmaWVsZD09PSdhbGwnKSB7XG4gICAgICB0aGlzLmlzUGF5bWVudERldGFpbHNFbXB0eSA9IHZhbHNbMl07XG4gICAgICB0aGlzLmlzUGF5bWVudERldGFpbHNJbnZhbGlkID0gdmFsc1szXTtcbiAgICAgIHRoaXMucGF5bWVudERldGFpbHNNaW5IYXNFcnJvciA9IHZhbHNbNF07XG4gICAgICB0aGlzLnBheW1lbnREZXRhaWxzTWF4SGFzRXJyb3IgPSB2YWxzWzVdO1xuICAgIH1cbiAgICBpZihmaWVsZD09PSd1c2VybmFtZScgfHwgZmllbGQ9PT0nYWxsJykge1xuICAgICAgdGhpcy5pc1VzZXJOYW1lRW1wdHkgPSB2YWxzWzZdO1xuICAgICAgdGhpcy5pc1VzZXJOYW1lSW52YWxpZCA9IHZhbHNbN107XG4gICAgfVxuICB9XG4gIGZpbmFsU2VydmljZUNhbGwoKSB7XG4gICAgaWYoIXRoaXMuaXNTdHJhdGVnaWNGaXhFbmFibGUpIHtcbiAgICAgIGxldCBhbGxvY2F0ZWRSZXF1ZXN0ID0ge1xuICAgICAgICByZWFzb246IHRoaXMucGF5bWVudFJlYXNvbixcbiAgICAgICAgYWxsb2NhdGlvbl9zdGF0dXM6J0FsbG9jYXRlZCcsXG4gICAgICAgIGV4cGxhbmF0aW9uOiB0aGlzLm90aGVyUGF5bWVudEV4cGxhbmF0aW9uLFxuICAgICAgICBwYXltZW50X2FsbG9jYXRpb25fc3RhdHVzOiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgIG5hbWU6ICdBbGxvY2F0ZWQnXG4gICAgICAgIH0sXG4gICAgICAgIHBheW1lbnRfZ3JvdXBfcmVmZXJlbmNlOiB0aGlzLnBheW1lbnRHcm91cC5wYXltZW50X2dyb3VwX3JlZmVyZW5jZSxcbiAgICAgICAgY2FzZV90eXBlOiB0aGlzLmNhc2VUeXBlLFxuICAgICAgICB1c2VyX25hbWU6IHRoaXMudXNlck5hbWVcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBvc3RTdHJhdGVnaWNCb2R5ID0gbmV3IEFsbG9jYXRlUGF5bWVudFJlcXVlc3RcbiAgICAgICh0aGlzLmNjZFJlZmVyZW5jZSwgdGhpcy51bkFsbG9jYXRlZFBheW1lbnQsIHRoaXMuY2FzZVR5cGUsIHRoaXMuZXhjZXB0aW9uUmVmZXJlbmNlLCBhbGxvY2F0ZWRSZXF1ZXN0KTtcbiAgICAgIHRoaXMuYnVsa1NjYW5pbmdQYXltZW50U2VydmljZS5wb3N0QlNQYXltZW50U3RyYXRlZ2ljKHBvc3RTdHJhdGVnaWNCb2R5ICwgdGhpcy5wYXltZW50R3JvdXAucGF5bWVudF9ncm91cF9yZWZlcmVuY2UpLnN1YnNjcmliZShcbiAgICAgICAgcmVzID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5nZXRTZXJ2ZXJFcnJvck1lc3NhZ2UoZmFsc2UsIGZhbHNlLCAnJyk7XG4gICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgIHRoaXMuZ290b0Nhc2V0cmFuc2F0aW9uUGFnZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5nZXRTZXJ2ZXJFcnJvck1lc3NhZ2UodHJ1ZSwgZmFsc2UsICcnKTtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICAgdGhpcy5pc0NvbmZpcm1CdXR0b25kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG4gICAgdGhpcy5idWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlLnBhdGNoQlNDaGFuZ2VTdGF0dXModGhpcy51bkFsbG9jYXRlZFBheW1lbnQuZGNuX3JlZmVyZW5jZSwgJ1BST0NFU1NFRCcpLnN1YnNjcmliZShcbiAgICAgIHJlczEgPT4ge1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5nZXRTZXJ2ZXJFcnJvck1lc3NhZ2UoZmFsc2UsIGZhbHNlLCAnJyk7XG4gICAgICAgIGxldCByZXNwb25zZTEgPSBKU09OLnBhcnNlKHJlczEpO1xuICAgICAgICBpZiAocmVzcG9uc2UxLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zdCByZXF1ZXN0Qm9keSA9IG5ldyBBbGxvY2F0ZVBheW1lbnRSZXF1ZXN0XG4gICAgICAgICAgKHRoaXMuY2NkUmVmZXJlbmNlLCB0aGlzLnVuQWxsb2NhdGVkUGF5bWVudCwgdGhpcy5zaXRlSUQsIHRoaXMuZXhjZXB0aW9uUmVmZXJlbmNlKTtcbiAgICAgICAgICB0aGlzLmJ1bGtTY2FuaW5nUGF5bWVudFNlcnZpY2UucG9zdEJTQWxsb2NhdGVQYXltZW50KHJlcXVlc3RCb2R5LCB0aGlzLnBheW1lbnRHcm91cC5wYXltZW50X2dyb3VwX3JlZmVyZW5jZSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgcmVzMiA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdGhpcy5lcnJvckhhbmRsZXJTZXJ2aWNlLmdldFNlcnZlckVycm9yTWVzc2FnZShmYWxzZSwgZmFsc2UsICcnKTtcbiAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlMiA9IEpTT04ucGFyc2UocmVzMik7XG4gICAgICAgICAgICAgIGNvbnN0IHJlcUJvZHkgPSBuZXcgSUFsbG9jYXRpb25QYXltZW50c1JlcXVlc3RcbiAgICAgICAgICAgICAgKHJlc3BvbnNlMlsnZGF0YSddLnBheW1lbnRfZ3JvdXBfcmVmZXJlbmNlLCByZXNwb25zZTJbJ2RhdGEnXS5yZWZlcmVuY2UsIHRoaXMucGF5bWVudFJlYXNvbiwgdGhpcy5vdGhlclBheW1lbnRFeHBsYW5hdGlvbiwgdGhpcy51c2VyTmFtZSk7XG4gICAgICAgICAgICAgIGlmIChyZXNwb25zZTIuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLnBvc3RCU0FsbG9jYXRpb25QYXltZW50cyhyZXFCb2R5KS5zdWJzY3JpYmUoXG5cbiAgICAgICAgICAgICAgICByZXMzID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdGhpcy5lcnJvckhhbmRsZXJTZXJ2aWNlLmdldFNlcnZlckVycm9yTWVzc2FnZShmYWxzZSwgZmFsc2UsICcnKTtcbiAgICAgICAgICAgICAgICAgIGxldCByZXNwb25zZTMgPSBKU09OLnBhcnNlKHJlczMpO1xuICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlMy5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5nb3RvQ2FzZXRyYW5zYXRpb25QYWdlKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5idWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlLnBhdGNoQlNDaGFuZ2VTdGF0dXModGhpcy51bkFsbG9jYXRlZFBheW1lbnQuZGNuX3JlZmVyZW5jZSwgJ0NPTVBMRVRFJykuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5nZXRTZXJ2ZXJFcnJvck1lc3NhZ2UodHJ1ZSwgZmFsc2UsICcnKTtcbiAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaXNDb25maXJtQnV0dG9uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuYnVsa1NjYW5pbmdQYXltZW50U2VydmljZS5wYXRjaEJTQ2hhbmdlU3RhdHVzKHRoaXMudW5BbGxvY2F0ZWRQYXltZW50LmRjbl9yZWZlcmVuY2UsICdDT01QTEVURScpLnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5nZXRTZXJ2ZXJFcnJvck1lc3NhZ2UodHJ1ZSwgZmFsc2UsICcnKTtcbiAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICAgICAgICB0aGlzLmlzQ29uZmlybUJ1dHRvbmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5nZXRTZXJ2ZXJFcnJvck1lc3NhZ2UodHJ1ZSwgZmFsc2UsICcnKTtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB0aGlzLmlzQ29uZmlybUJ1dHRvbmRpc2FibGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuICB9XG5cbiAgc2F2ZUFuZENvbnRpbnVlKCl7XG4gICAgaWYodGhpcy5wYXltZW50R3JvdXApIHtcbiAgICAgIHRoaXMuaXNNb3JlRGV0YWlsc0JveEhpZGUgPSB0cnVlO1xuICAgICAgdGhpcy5vdmVyVW5kZXJQYXltZW50Rm9ybS5nZXQoJ21vcmVEZXRhaWxzJykucmVzZXQoKTtcbiAgICAgIHRoaXMub3ZlclVuZGVyUGF5bWVudEZvcm0uZ2V0KCdtb3JlRGV0YWlscycpLnNldFZhbHVlKCcnKTtcbiAgICAgIHRoaXMub3ZlclVuZGVyUGF5bWVudEZvcm0uZ2V0KCd1c2VyTmFtZScpLnJlc2V0KCk7XG4gICAgICB0aGlzLm92ZXJVbmRlclBheW1lbnRGb3JtLmdldCgndXNlck5hbWUnKS5zZXRWYWx1ZSgnJyk7XG4gICAgICB0aGlzLnBheW1lbnRSZWFzb24gPSAnJztcbiAgICAgIHRoaXMucGF5bWVudEV4cGxhbmF0aW9uID0gJyc7XG4gICAgICBsZXQgR3JvdXBPdXRzdGFuZGluZ0Ftb3VudCA9IHRoaXMuZ2V0R3JvdXBPdXRzdGFuZGluZ0Ftb3VudCh0aGlzLnBheW1lbnRHcm91cCk7XG4gICAgICBjb25zdCByZW1haW5pbmdUb0JlQXNzaWduZWQgPSB0aGlzLnVuQWxsb2NhdGVkUGF5bWVudC5hbW91bnQgLSBHcm91cE91dHN0YW5kaW5nQW1vdW50O1xuICAgICAgdGhpcy5pc1JlbWFpbmluZ0Ftb3VudEd0WmVybyA9IHJlbWFpbmluZ1RvQmVBc3NpZ25lZCA+IDA7XG4gICAgICB0aGlzLmlzUmVtYWluaW5nQW1vdW50THRaZXJvID0gcmVtYWluaW5nVG9CZUFzc2lnbmVkIDwgMDtcbiAgICAgIHRoaXMucGF5bWVudFNlY3Rpb25MYWJlbCA9IHRoaXMuaXNSZW1haW5pbmdBbW91bnRHdFplcm8gPyB7XG4gICAgICAgICAgdGl0bGU6ICdUaGVyZSBpcyBhbiBPdmVyIHBheW1lbnQgb2YnLFxuICAgICAgICAgIHJlYXNvbjogJ1Byb3ZpZGUgYSByZWFzb24uIFRoaXMgd2lsbCBiZSB1c2VkIGluIHRoZSBSZWZ1bmQgcHJvY2Vzcy4nLFxuICAgICAgICB9OiB0aGlzLmlzUmVtYWluaW5nQW1vdW50THRaZXJvID8ge1xuICAgICAgICAgIHRpdGxlOiAnVGhlcmUgaXMgYW4gVW5kZXIgcGF5bWVudCBvZicsXG4gICAgICAgICAgcmVhc29uOiAnUHJvdmlkZSBhIHJlYXNvbicsXG4gICAgICAgIH06IHtcbiAgICAgICAgICB0aXRsZTonQW1vdW50IGxlZnQgdG8gYmUgYWxsb2NhdGVkJyxcbiAgICAgICAgICByZWFzb246JycsXG4gICAgICAgIH07XG4gICAgICB0aGlzLmZlZWRiYWNrVXJsTGFiZWwgPSB0aGlzLmlzUmVtYWluaW5nQW1vdW50R3RaZXJvID8gJ0NPTkZJUk1BTExPQ0FUSU9OX1NVUlBMVVMnIDogdGhpcy5pc1JlbWFpbmluZ0Ftb3VudEx0WmVybyA/ICdDT05GSVJNQUxMT0NBVElPTl9TSE9SVEZBTEwnIDogJ0NPTkZJUk1BTExPQ0FUSU9OJztcbiAgICAgIHRoaXMucmVtYWluaW5nQW1vdW50ID0gIHRoaXMuaXNSZW1haW5pbmdBbW91bnRHdFplcm8gPyByZW1haW5pbmdUb0JlQXNzaWduZWQgOiB0aGlzLmlzUmVtYWluaW5nQW1vdW50THRaZXJvID8gcmVtYWluaW5nVG9CZUFzc2lnbmVkICogLTEgOiAwO1xuICAgICAgdGhpcy5hZnRlckZlZUFsbG9jYXRlT3V0c3RhbmRpbmcgPSByZW1haW5pbmdUb0JlQXNzaWduZWQgPj0gMCA/IDAgOiAocmVtYWluaW5nVG9CZUFzc2lnbmVkICogLTEpO1xuICAgICAgdGhpcy5hbW91bnRGb3JBbGxvY2F0aW9uID0gR3JvdXBPdXRzdGFuZGluZ0Ftb3VudCA+PSB0aGlzLnVuQWxsb2NhdGVkUGF5bWVudC5hbW91bnQgPyB0aGlzLnVuQWxsb2NhdGVkUGF5bWVudC5hbW91bnQgOiBHcm91cE91dHN0YW5kaW5nQW1vdW50O1xuICAgICAgaWYodGhpcy5pc1R1cm5PZmYpe1xuICAgICAgICB0aGlzLnZpZXdTdGF0dXMgPSAnYWxsb2NhdGVQYXltZW50Q29uZmlybWF0aW9uJztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgIGdldFVuYXNzaWduZWRQYXltZW50KCkge1xuICAgIHRoaXMuYnVsa1NjYW5pbmdQYXltZW50U2VydmljZS5nZXRCU1BheW1lbnRzQnlEQ04odGhpcy5ic3BheW1lbnRkY24pLnN1YnNjcmliZShcbiAgICAgIHVuYXNzaWduZWRQYXltZW50cyA9PiB7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdGhpcy5lcnJvckhhbmRsZXJTZXJ2aWNlLmdldFNlcnZlckVycm9yTWVzc2FnZShmYWxzZSwgZmFsc2UsICcnKTtcbiAgICAgICAgdGhpcy51bkFsbG9jYXRlZFBheW1lbnQgPSB1bmFzc2lnbmVkUGF5bWVudHNbJ2RhdGEnXS5wYXltZW50cy5maWx0ZXIocGF5bWVudCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHBheW1lbnQgJiYgcGF5bWVudC5kY25fcmVmZXJlbmNlID09IHRoaXMuYnNwYXltZW50ZGNuO1xuICAgICAgICB9KVswXTtcbiAgICAgICAgdGhpcy5zaXRlSUQgPSB1bmFzc2lnbmVkUGF5bWVudHNbJ2RhdGEnXS5yZXNwb25zaWJsZV9zZXJ2aWNlX2lkO1xuICAgICAgICBjb25zdCBiZUNjZE51bWJlciA9IHVuYXNzaWduZWRQYXltZW50c1snZGF0YSddLmNjZF9yZWZlcmVuY2UsXG4gICAgICAgIGJlRXhjZXB0aW9uTnVtYmVyID0gdW5hc3NpZ25lZFBheW1lbnRzWydkYXRhJ10uZXhjZXB0aW9uX3JlY29yZF9yZWZlcmVuY2UsXG4gICAgICAgIGV4Y2VwdGlvblJlZmVyZW5jZSA9IGJlQ2NkTnVtYmVyID8gYmVDY2ROdW1iZXIgPT09IHRoaXMuY2NkQ2FzZU51bWJlciA/IG51bGwgOiB0aGlzLmNjZENhc2VOdW1iZXIgOiB0aGlzLmNjZENhc2VOdW1iZXI7XG4gICAgICAgdGhpcy5jY2RSZWZlcmVuY2UgPSBiZUNjZE51bWJlciA/IGJlQ2NkTnVtYmVyIDogbnVsbDtcbiAgICAgICB0aGlzLmV4Y2VwdGlvblJlZmVyZW5jZSA9IGJlRXhjZXB0aW9uTnVtYmVyID8gYmVFeGNlcHRpb25OdW1iZXIgOiBleGNlcHRpb25SZWZlcmVuY2U7XG4gICAgICAgdGhpcy5nZXRQYXltZW50R3JvdXBEZXRhaWxzKCk7XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmVycm9ySGFuZGxlclNlcnZpY2UuZ2V0U2VydmVyRXJyb3JNZXNzYWdlKHRydWUsIGZhbHNlLCAnJyk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuICBzZWxlY3RSYWRpb0J1dHRvbihrZXksIHR5cGUpIHtcbiAgICB0aGlzLmlzTW9yZURldGFpbHNCb3hIaWRlID0gdHJ1ZTtcbiAgICBpZiggdHlwZSA9PT0gJ2V4cGxhbmF0aW9uJyAmJiBrZXkgPT09ICdvdGhlcicgKXtcbiAgICAgIHRoaXMuaXNQYXltZW50RGV0YWlsc0VtcHR5ID0gZmFsc2U7XG4gICAgICB0aGlzLmlzUGF5bWVudERldGFpbHNJbnZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLnBheW1lbnREZXRhaWxzTWluSGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgIHRoaXMucGF5bWVudERldGFpbHNNYXhIYXNFcnJvciA9IGZhbHNlO1xuICAgICAgdGhpcy5pc01vcmVEZXRhaWxzQm94SGlkZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBPcmRlckxpc3RTZWxlY3RFdmVudChvcmRlcmVmOiBhbnkpe1xuICAgIHRoaXMuaXNDb250aW51ZUJ1dHRvbmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZWNvcmRJZD0gb3JkZXJlZjtcbiAgfVxuXG4gIHJlZGlyZWN0VG9PcmRlckZlZVNlYXJjaFBhZ2UoKSB7XG4gICAgLy8gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmJzcGF5bWVudGRjbiA9IG51bGw7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRHcm91cFJlZmVyZW5jZSA9IHRoaXMucmVjb3JkSWQ7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzVHVybk9mZiA9IHRoaXMuaXNUdXJuT2ZmO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC52aWV3TmFtZSA9ICdmZWUtc3VtbWFyeSc7XG59XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWxsb2NhdGUtcGF5bWVudHNcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdtYWluRm9ybScgJiYgIWlzVHVybk9mZlwiPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstYnJlYWRjcnVtYnNcIj5cbiAgICAgICAgICA8b2wgY2xhc3M9XCJnb3Z1ay1icmVhZGNydW1ic19fbGlzdFwiPlxuICAgICAgICAgICAgPGxpIGNsYXNzPVwiZ292dWstYnJlYWRjcnVtYnNfX2xpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICA8YSAoY2xpY2spPVwiZ290b0Nhc2V0cmFuc2F0aW9uUGFnZSgpXCIgY2xhc3M9XCJnb3Z1ay1iYWNrLWxpbmsgZ292dWstbGFiZWxcIj5CYWNrPC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L29sPlxuICAgICAgICA8L2Rpdj5cbiAgXG4gICAgPGRpdiBjbGFzcz1cInBheW1lbnRyZXF1ZXN0XCI+XG4gICAgICAgIDxoMSBjbGFzcz1cImdvdnVrLWhlYWRpbmcteGwgZ292dWstIS1tYXJnaW4tdG9wLTMgZ292dWstIS1tYXJnaW4tYm90dG9tLTRcIj5TZWxlY3QgcGF5bWVudCByZXF1ZXN0PC9oMT5cbiAgICAgICAgPHAgY2xhc3M9XCJnb3Z1ay0hLW1hcmdpbi10b3AtNSBjYXNlcmVyZlwiPkNhc2UgcmVmZXJlbmNlOiB7e2NjZFJlZmVyZW5jZX19PC9wPlxuICAgIDwvZGl2PlxuIFxuICAgIDxkaXYgICpuZ0Zvcj1cImxldCBvcmRlclJlZiBvZiBvcmRlckxldmVsRmVlczsgbGV0IGkgPSBpbmRleDtcIiBjbGFzcz1cIm11bHRpcGxlLWNob2ljZSB1bnByb2Nlc3NlZC1wYXltZW50cy0tcmFkaW8tYnV0dG9uXCI+XG4gICAgICA8aW5wdXQgaWQ9XCInb3JkZXJmZWUnK2krJydcIlxuICAgICAgYXJpYS1sYWJlbD1cIm9yZGVyTGV2ZWxSZWNvcmRcIlxuICAgICAgbmFtZT1cIm9yZGVyTGV2ZWxSZWNvcmRcIlxuICAgIFxuICAgICAgKGNsaWNrKT1cIk9yZGVyTGlzdFNlbGVjdEV2ZW50KG9yZGVyUmVmLm9yZGVyUmVmSWQpXCJcbiAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICB2YWx1ZT1cInt7b3JkZXJSZWYub3JkZXJUb3RhbEZlZXN9fVwiIC8+XG4gICAgICA8bGFiZWwgZm9yPVwicmFkaW8taW5saW5lLTFcIj4ge3tvcmRlclJlZi5vcmRlclRvdGFsRmVlcyB8IGN1cnJlbmN5IDonR0JQJzonc3ltYm9sJzonMS4yLTInfX0oe3tvcmRlclJlZi5vcmRlclN0YXR1c319KTwvbGFiZWw+XG4gICAgPC9kaXY+XG4gIFxuICAgIDxkaXYgY2xhc3M9XCJwYXltZW50cmVxdWVzdFwiPlxuICAgICAgICA8YnV0dG9uIFtkaXNhYmxlZF09XCJpc0NvbnRpbnVlQnV0dG9uZGlzYWJsZWRcIiB0eXBlPVwic3VibWl0XCIgKGNsaWNrKT1cInJlZGlyZWN0VG9PcmRlckZlZVNlYXJjaFBhZ2UoKVwiIGNsYXNzPVwiYnV0dG9uIGFsbGJ0YiBidXR0b24tLWRpc2FibGVkIGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTFcIj5cbiAgICAgICAgICBDb250aW51ZVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgXG4gIDwvbmctY29udGFpbmVyPlxuXG4gICA8ZGl2ICpuZ0lmPVwidmlld1N0YXR1cz09PSdtYWluRm9ybScgJiYgaXNUdXJuT2ZmXCI+XG4gICAgPGlucHV0ICNteUlucHV0IHR5cGU9J2hpZGRlbicgY2xhc3M9J2lGcmFtZURyaXZlbkltYWdlVmFsdWUnIHZhbHVlPSdBTExPQ0FURVBBWU1FTlRTJz5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstYnJlYWRjcnVtYnNcIiAqbmdJZj1cInBheW1lbnRSZWZcIj5cbiAgICAgIDxvbCBjbGFzcz1cImdvdnVrLWJyZWFkY3J1bWJzX19saXN0XCI+XG4gICAgICAgIDxsaSBjbGFzcz1cImdvdnVrLWJyZWFkY3J1bWJzX19saXN0LWl0ZW1cIj5cbiAgICAgICAgICA8YSBocmVmPVwiI1wiIChjbGljayk9XCJnb3RvU3VtbWFyeVBhZ2UoJGV2ZW50KVwiIGNsYXNzPVwiZ292dWstYmFjay1saW5rXCI+QmFjazwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvb2w+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWhlYWRpbmctc2VjdGlvblwiPlxuICAgICAgPGgxIGNsYXNzPVwiZ292dWstaGVhZGluZy14bFwiPkFsbG9jYXRlIHBheW1lbnQgdG8gZmVlIGdyb3VwPC9oMT5cbiAgICAgIDxoMiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbFwiPkFtb3VudCBsZWZ0IHRvIGJlIGFsbG9jYXRlZDpcbiAgICAgICAge3sgdW5BbGxvY2F0ZWRQYXltZW50LmFtb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInIH19PC9oMj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGF5bWVudC1ncm91cC1zZWN0aW9uXCIgKm5nRm9yPVwibGV0IHBheW1lbnRHcm91cCBvZiBwYXltZW50R3JvdXBzXCI+XG4gICAgICA8aDMgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLW1cIj5Hcm91cCByZWZlcmVuY2U6IHt7cGF5bWVudEdyb3VwLnBheW1lbnRfZ3JvdXBfcmVmZXJlbmNlfX08L2gzPlxuICAgICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgICAgPHRoZWFkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+Q29kZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5EZXNjcmlwdGlvbjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5Wb2x1bWU8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+RmVlIGFtb3VudDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5DYWxjdWxhdGVkIGFtb3VudDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5Hcm91cCBhbW91bnQgb3V0c3RhbmRpbmc8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGhlYWQ+XG4gICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCI+XG4gICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICpuZ0Zvcj1cImxldCBmZWUgb2YgcGF5bWVudEdyb3VwLmZlZXM7ICBsZXQgaSA9IGluZGV4O1wiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstdGFibGVfX2NlbGwtLWNvbDEgZ292dWstdGFibGVfX2N1c3RvbS0tY29sMVwiXG4gICAgICAgICAgICAgIFthdHRyLnJvd3NwYW5dPVwicGF5bWVudEdyb3VwLmZlZXMubGVuZ3RoXCIgKm5nSWY9XCJpPT0wXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdWx0aXBsZS1jaG9pY2VcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJ1bnBhaWVkRmVlLXt7aX19XCIgbmFtZT1cInVuYXNzaWduZWRSZWNvcmRcIiB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdGVkUGF5bWVudEdyb3VwKHBheW1lbnRHcm91cClcIiAvPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ1bnBhaWVkRmVlLXt7aX19XCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstdGFibGVfX2NlbGwtLWNvbDFcIj57e2ZlZS5jb2RlfX08L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstdGFibGVfX2NlbGwtLWNvbDJcIj4ge3tmZWUuZGVzY3JpcHRpb259fSA8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstdGFibGVfX2NlbGwtLWNvbDNcIj4ge3tmZWUudm9sdW1lPyBmZWUudm9sdW1lIDogJy0nfX0gPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLXRhYmxlX19jZWxsLS1jb2w0XCI+XG4gICAgICAgICAgICAgIHt7IGZlZS5mZWVfYW1vdW50IHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgfX0gPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLXRhYmxlX19jZWxsLS1jb2w1XCI+XG4gICAgICAgICAgICAgIHt7ZmVlLmNhbGN1bGF0ZWRfYW1vdW50IHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgfX0gPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLXRhYmxlX19jZWxsLS1jb2w2IGdvdnVrLXRhYmxlX19jdXN0b20tLWNvbDZcIlxuICAgICAgICAgICAgICBbYXR0ci5yb3dzcGFuXT1cInBheW1lbnRHcm91cC5mZWVzLmxlbmd0aFwiICpuZ0lmPVwiaT09MFwiPlxuICAgICAgICAgICAgICB7e2dldEdyb3VwT3V0c3RhbmRpbmdBbW91bnQocGF5bWVudEdyb3VwKSB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInIH19IDwvdGQ+XG5cbiAgICAgICAgICA8L3RyPlxuXG4gICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCIgKm5nSWY9XCJwYXltZW50R3JvdXAuZmVlcy5sZW5ndGg9PTBcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiIGNvbHNwYW49XCI2XCI+Tm8gcGF5bWVudHMgcmVjb3JkZWQ8L3RkPlxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwLWFsbG9jYXRlXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCIgW2Rpc2FibGVkXT1cImlzQ29udGludWVCdXR0b25kaXNhYmxlZFwiXG4gICAgICAgIChjbGljayk9XCJzYXZlQW5kQ29udGludWUoKVwiPlxuICAgICAgICBDb250aW51ZVxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiIChjbGljayk9XCJnb3RvQ2FzZXRyYW5zYXRpb25QYWdlKClcIj5cbiAgICAgICAgQ2FuY2VsXG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIih2aWV3U3RhdHVzID09PSAnbWFpbkZvcm0nICYmIGlzVHVybk9mZikgfHwgdmlld1N0YXR1cyA9PT0gJ2FsbG9jYXRlUGF5bWVudENvbmZpcm1hdGlvbidcIj5cbiAgICA8Y2NwYXktZXJyb3ItYmFubmVyICpuZ0lmPVwiZXJyb3JNZXNzYWdlLnNob3dFcnJvclwiIFtlcnJvck1lc3NhZ2VdPVwiZXJyb3JNZXNzYWdlXCI+PC9jY3BheS1lcnJvci1iYW5uZXI+XG4gICAgPGlucHV0ICNteUlucHV0IHR5cGU9J2hpZGRlbicgY2xhc3M9J2lGcmFtZURyaXZlbkltYWdlVmFsdWUnIHZhbHVlPSd7e2ZlZWRiYWNrVXJsTGFiZWx9fSc+XG4gICAgPGgxIGNsYXNzPVwiZ292dWstaGVhZGluZy14bFwiPkNvbmZpcm0gYWxsb2NhdGlvbjwvaDE+XG4gICAgPGgyIGNsYXNzPVwiZ292dWstaGVhZGluZy1sIGdvdnVrLWhlYWRpbmctbC0tY3VzdG9tXCI+XG4gICAgICBBbW91bnQgdG8gYmUgYWxsb2NhdGVkOiB7e2Ftb3VudEZvckFsbG9jYXRpb24gfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJ319XG4gICAgPC9oMj5cbiAgICA8ZGl2IGNsYXNzPVwicGF5bWVudC1ncm91cC1zZWN0aW9uXCIgKm5nSWY9XCJwYXltZW50R3JvdXBcIj5cbiAgICAgIDxoMyBjbGFzcz1cImdvdnVrLWhlYWRpbmctbS0tY3VzdG9tXCIgKm5nSWY9XCJpc1R1cm5PZmZcIj5Hcm91cCByZWZlcmVuY2U6IHt7cGF5bWVudEdyb3VwLnBheW1lbnRfZ3JvdXBfcmVmZXJlbmNlfX1cbiAgICAgIDwvaDM+XG4gICAgICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZVwiPlxuICAgICAgICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkNvZGU8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+RGVzY3JpcHRpb248L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+Vm9sdW1lPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkZlZSBhbW91bnQ8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+Q2FsY3VsYXRlZCBhbW91bnQ8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+QW1vdW50IER1ZTwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90aGVhZD5cbiAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIj5cbiAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCIgKm5nRm9yPVwibGV0IGZlZSBvZiBwYXltZW50R3JvdXAuZmVlczsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLXRhYmxlX19jZWxsLS1jb2wxXCI+e3tmZWUuY29kZX19PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLXRhYmxlX19jZWxsLS1jb2wyXCI+IHt7ZmVlLmRlc2NyaXB0aW9ufX0gPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLXRhYmxlX19jZWxsLS1jb2wzXCI+IHt7ZmVlLnZvbHVtZT8gZmVlLnZvbHVtZSA6ICctJ319IDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay10YWJsZV9fY2VsbC0tY29sNFwiPlxuICAgICAgICAgICAgICB7eyBmZWUuZmVlX2Ftb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInIH19IDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay10YWJsZV9fY2VsbC0tY29sNVwiPlxuICAgICAgICAgICAgICB7e2ZlZS5jYWxjdWxhdGVkX2Ftb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInfX0gPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLXRhYmxlX19jZWxsLS1jb2w2XCIgW2F0dHIucm93c3Bhbl09XCJwYXltZW50R3JvdXAuZmVlcy5sZW5ndGhcIlxuICAgICAgICAgICAgICAqbmdJZj1cImk9PTBcIj4ge3thZnRlckZlZUFsbG9jYXRlT3V0c3RhbmRpbmcgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJ319IDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAqbmdJZj1cInBheW1lbnRHcm91cC5mZWVzLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIiBjb2xzcGFuPVwiNlwiPk5vIHBheW1lbnRzIHJlY29yZGVkPC90ZD5cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvdGFibGU+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dFwiICpuZ0lmPVwiaXNSZW1haW5pbmdBbW91bnRHdFplcm8gfHwgaXNSZW1haW5pbmdBbW91bnRMdFplcm8gfHwgcmVtYWluaW5nQW1vdW50ID09PSAwXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dF9faWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiE8L3NwYW4+XG4gICAgICA8c3Ryb25nIGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0X190ZXh0IGdvdnVrLXdhcm5pbmctdGV4dF9fY3VzdG9tXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0X19hc3Npc3RpdmVcIj5XYXJuaW5nPC9zcGFuPlxuICAgICAgICB7e3BheW1lbnRTZWN0aW9uTGFiZWwudGl0bGV9fSB7eyByZW1haW5pbmdBbW91bnQgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJyB9fVxuICAgICAgPC9zdHJvbmc+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIiAqbmdJZj1cImlzUmVtYWluaW5nQW1vdW50R3RaZXJvIHx8IGlzUmVtYWluaW5nQW1vdW50THRaZXJvXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiPlxuICAgICAgICA8ZmllbGRzZXQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJob3ctY29udGFjdGVkLWNvbmRpdGlvbmFsLWhpbnRcIj5cbiAgICAgICAgICA8c3BhbiBpZD1cImhvdy1jb250YWN0ZWQtY29uZGl0aW9uYWwtaGludFwiIGNsYXNzPVwiZ292dWstaGludFwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J2lubGluZS1lcnJvci1tZXNzYWdlJzogcGF5bWVudFJlYXNvbkhhc0Vycm9yfVwiPlxuICAgICAgICAgICAge3twYXltZW50U2VjdGlvbkxhYmVsLnJlYXNvbn19XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInBheW1lbnRSZWFzb25IYXNFcnJvciA/ICdnb3Z1ay1yYWRpb3MgZ292dWstcmFkaW9zLS1jb25kaXRpb25hbCBmb3JtLWdyb3VwLWVycm9yJyA6ICdnb3Z1ay1yYWRpb3MgZ292dWstcmFkaW9zLS1jb25kaXRpb25hbCdcIlxuICAgICAgICAgICAgZGF0YS1tb2R1bGU9XCJnb3Z1ay1yYWRpb3NcIiAqbmdJZj1cImlzUmVtYWluaW5nQW1vdW50R3RaZXJvXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zX19pdGVtXCIgKm5nRm9yPVwibGV0IHJlYXNvbiBvZiByZWFzb25MaXN0Lm92ZXJQYXltZW50IHwga2V5VmFsdWVcIj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstcmFkaW9zX19pbnB1dFwiIGlkPVwie3tyZWFzb24ua2V5fX1cIiBuYW1lPVwicGF5bWVudFJlYXNvblwiIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJwYXltZW50UmVhc29uXCIgdmFsdWU9e3tyZWFzb24udmFsdWV9fT5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstcmFkaW9zX19sYWJlbCBnb3Z1ay1mb250X19jdXN0b21cIiBmb3I9XCJob3ctY29udGFjdGVkLWNvbmRpdGlvbmFsXCI+XG4gICAgICAgICAgICAgICAge3tyZWFzb24udmFsdWV9fVxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwicGF5bWVudFJlYXNvbkhhc0Vycm9yID8gJ2dvdnVrLXJhZGlvcyBnb3Z1ay1yYWRpb3MtLWNvbmRpdGlvbmFsIGZvcm0tZ3JvdXAtZXJyb3InIDogJ2dvdnVrLXJhZGlvcyBnb3Z1ay1yYWRpb3MtLWNvbmRpdGlvbmFsJ1wiXG4gICAgICAgICAgICBkYXRhLW1vZHVsZT1cImdvdnVrLXJhZGlvc1wiICpuZ0lmPVwiaXNSZW1haW5pbmdBbW91bnRMdFplcm9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2l0ZW1cIiAqbmdGb3I9XCJsZXQgcmVhc29uIG9mIHJlYXNvbkxpc3Quc2hvcnRGYWxsIHwga2V5VmFsdWVcIj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstcmFkaW9zX19pbnB1dFwiIGlkPVwie3tyZWFzb24ua2V5fX1cIiBuYW1lPVwicGF5bWVudFJlYXNvblwiIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJwYXltZW50UmVhc29uXCIgdmFsdWU9e3tyZWFzb24udmFsdWV9fT5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstcmFkaW9zX19sYWJlbCBnb3Z1ay1mb250X19jdXN0b21cIiBmb3I9XCJob3ctY29udGFjdGVkLWNvbmRpdGlvbmFsXCI+XG4gICAgICAgICAgICAgICAge3tyZWFzb24udmFsdWV9fVxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gICAgICAgIDxmaWVsZHNldCBjbGFzcz1cImdvdnVrLWZpZWxkc2V0XCIgYXJpYS1kZXNjcmliZWRieT1cImhvdy1jb250YWN0ZWQtY29uZGl0aW9uYWwtaGludFwiPlxuICAgICAgICAgIDxzcGFuIGlkPVwiaG93LWNvbnRhY3RlZC1jb25kaXRpb25hbC1oaW50XCIgY2xhc3M9XCJnb3Z1ay1oaW50XCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnaW5saW5lLWVycm9yLW1lc3NhZ2UnOiBwYXltZW50RXhwbGFuYXRpb25IYXNFcnJvcn1cIj5cbiAgICAgICAgICAgIFByb3ZpZGUgYW4gZXhwbGFuYXRvcnkgbm90ZVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBbbmdDbGFzc109XCJwYXltZW50RXhwbGFuYXRpb25IYXNFcnJvciA/ICdnb3Z1ay1yYWRpb3MgZ292dWstcmFkaW9zLS1jb25kaXRpb25hbCBmb3JtLWdyb3VwLWVycm9yJyA6ICdnb3Z1ay1yYWRpb3MgZ292dWstcmFkaW9zLS1jb25kaXRpb25hbCdcIlxuICAgICAgICAgICAgZGF0YS1tb2R1bGU9XCJnb3Z1ay1yYWRpb3NcIiAqbmdJZj1cImlzUmVtYWluaW5nQW1vdW50R3RaZXJvXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zX19pdGVtXCIgKm5nRm9yPVwibGV0IGV4cGxhbmF0aW9uIG9mIGV4cGxhbmF0aW9uTGlzdC5vdmVyUGF5bWVudCB8IGtleVZhbHVlXCI+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLXJhZGlvc19faW5wdXRcIiBpZD1cInt7ZXhwbGFuYXRpb24ua2V5fX1cIiBuYW1lPVwicGF5bWVudEV4cGxhbmF0aW9uXCIgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInBheW1lbnRFeHBsYW5hdGlvblwiIHZhbHVlPXt7ZXhwbGFuYXRpb24udmFsdWV9fVxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RSYWRpb0J1dHRvbihleHBsYW5hdGlvbi5rZXksICdleHBsYW5hdGlvbicpXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLXJhZGlvc19fbGFiZWwgZ292dWstZm9udF9fY3VzdG9tXCIgZm9yPVwiaG93LWNvbnRhY3RlZC1jb25kaXRpb25hbFwiPlxuICAgICAgICAgICAgICAgIHt7ZXhwbGFuYXRpb24udmFsdWV9fVxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwicGF5bWVudEV4cGxhbmF0aW9uSGFzRXJyb3IgPyAnZ292dWstcmFkaW9zIGdvdnVrLXJhZGlvcy0tY29uZGl0aW9uYWwgZm9ybS1ncm91cC1lcnJvcicgOiAnZ292dWstcmFkaW9zIGdvdnVrLXJhZGlvcy0tY29uZGl0aW9uYWwnXCJcbiAgICAgICAgICAgIGRhdGEtbW9kdWxlPVwiZ292dWstcmFkaW9zXCIgKm5nSWY9XCJpc1JlbWFpbmluZ0Ftb3VudEx0WmVyb1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19faXRlbVwiICpuZ0Zvcj1cImxldCBleHBsYW5hdGlvbiBvZiBleHBsYW5hdGlvbkxpc3Quc2hvcnRGYWxsIHwga2V5VmFsdWVcIj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstcmFkaW9zX19pbnB1dFwiIGlkPVwie3tleHBsYW5hdGlvbi5rZXl9fVwiIG5hbWU9XCJwYXltZW50RXhwbGFuYXRpb25cIiB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwicGF5bWVudEV4cGxhbmF0aW9uXCIgdmFsdWU9e3tleHBsYW5hdGlvbi52YWx1ZX19XG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFJhZGlvQnV0dG9uKGV4cGxhbmF0aW9uLmtleSwgJ2V4cGxhbmF0aW9uJylcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstcmFkaW9zX19sYWJlbCBnb3Z1ay1mb250X19jdXN0b21cIiBmb3I9XCJob3ctY29udGFjdGVkLWNvbmRpdGlvbmFsXCI+XG4gICAgICAgICAgICAgICAge3tleHBsYW5hdGlvbi52YWx1ZX19XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9maWVsZHNldD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJvdmVyVW5kZXJQYXltZW50Rm9ybVwiIG5vdmFsaWRhdGU+XG4gICAgICA8ZGl2XG4gICAgICAgIFtuZ0NsYXNzXT1cImlzTW9yZURldGFpbHNCb3hIaWRlID8gJ2dvdnVrLXJhZGlvc19fY29uZGl0aW9uYWwgZ292dWstcmFkaW9zX19jb25kaXRpb25hbC0taGlkZGVuJyA6IGlzUGF5bWVudERldGFpbHNFbXB0eSB8fCBpc1BheW1lbnREZXRhaWxzSW52YWxpZCB8fCBwYXltZW50RGV0YWlsc01pbkhhc0Vycm9yIHx8IHBheW1lbnREZXRhaWxzTWF4SGFzRXJyb3IgPyAnZ292dWstcmFkaW9zX19jb25kaXRpb25hbCBpbmxpbmUtZXJyb3ItYm9yZGVyJyA6ICdnb3Z1ay1yYWRpb3NfX2NvbmRpdGlvbmFsJ1wiXG4gICAgICAgIGlkPVwiY29uZGl0aW9uYWwtaG93LWNvbnRhY3RlZC1jb25kaXRpb25hbC0zXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgPHNwYW4gaWQ9XCJtb3JlLWRldGFpbC1oaW50XCIgY2xhc3M9XCJnb3Z1ay1oaW50IGdvdnVrLWZvbnRfX2N1c3RvbVwiPlxuICAgICAgICAgICAgUGxlYXNlIGVudGVyIGRldGFpbHNcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZ292dWstdGV4dGFyZWFcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieydpbmxpbmUtZXJyb3ItY2xhc3MnOiBpc1BheW1lbnREZXRhaWxzRW1wdHkgfHwgaXNQYXltZW50RGV0YWlsc0ludmFsaWQgfHwgcGF5bWVudERldGFpbHNNaW5IYXNFcnJvciB8fCBwYXltZW50RGV0YWlsc01heEhhc0Vycm9yfVwiXG4gICAgICAgICAgICBpZD1cIm1vcmVEZXRhaWxzXCIgbmFtZT1cIm1vcmVEZXRhaWxzXCIgcm93cz1cIjVcIiBmb3JtQ29udHJvbE5hbWU9XCJtb3JlRGV0YWlsc1wiPlxuICAgICAgICAgIDwvdGV4dGFyZWE+XG4gICAgICAgICAgPHAgY2xhc3M9XCJpbmxpbmUtZXJyb3ItbWVzc2FnZVwiXG4gICAgICAgICAgICAqbmdJZj1cImlzUGF5bWVudERldGFpbHNFbXB0eSB8fCBpc1BheW1lbnREZXRhaWxzSW52YWxpZCB8fCBwYXltZW50RGV0YWlsc01pbkhhc0Vycm9yIHx8IHBheW1lbnREZXRhaWxzTWF4SGFzRXJyb3JcIj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNQYXltZW50RGV0YWlsc0VtcHR5XCI+RW50ZXIgYSBleHBsYW5hdGlvbjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNQYXltZW50RGV0YWlsc0ludmFsaWRcIj5FbnRlciBhIHZhbGlkIGV4cGxhbmF0aW9uPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJwYXltZW50RGV0YWlsc01pbkhhc0Vycm9yXCI+RXhwbGFuYXRpb24gc2hvdWxkIGJlIGF0IGxlYXN0IDMgY2hhcmFjdGVycy48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cInBheW1lbnREZXRhaWxzTWF4SGFzRXJyb3JcIj5FeHBsYW5hdGlvbiBzaG91bGQgYmUgMjU1IGNoYXJhY3RlcnMgb3IgdW5kZXIuPC9zcGFuPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1idXR0b24tLWdyb3VwXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIFtkaXNhYmxlZF09XCJpc0NvbmZpcm1CdXR0b25kaXNhYmxlZFwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwiaXNDb25maXJtQnV0dG9uZGlzYWJsZWQgPyAnYnV0dG9uIGJ1dHRvbi0tZGlzYWJsZWQnIDogJ2J1dHRvbidcIlxuICAgICAgICAgIChjbGljayk9XCJjb25maXJtQWxsb2NhdGVQYXllbWVudCgpXCI+XG4gICAgICAgICAgQ29uZmlybVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnlcIiAoY2xpY2spPVwiY2FuY2VsQWxsb2NhdGVQYXltZW50KCRldmVudClcIj5cbiAgICAgICAgICBDYW5jZWxcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+Il19