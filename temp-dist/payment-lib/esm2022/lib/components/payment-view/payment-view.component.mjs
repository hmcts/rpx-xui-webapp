import { Component, Input } from '@angular/core';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { NotificationService } from '../../services/notification/notification.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { PostRefundRetroRemission } from '../../interfaces/PostRefundRetroRemission';
import { ChangeDetectorRef } from '@angular/core';
import { OrderslistService } from '../../services/orderslist.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/payment-view/payment-view.service";
import * as i2 from "../../services/notification/notification.service";
import * as i3 from "../../payment-lib.component";
import * as i4 from "../../services/orderslist.service";
import * as i5 from "@angular/common";
import * as i6 from "../contact-details/contact-details.component";
import * as i7 from "../status-history/status-history.component";
import * as i8 from "../add-remission/add-remission.component";
import * as i9 from "../service-request/service-request.component";
import * as i10 from "../notification-preview/notification-preview.component";
import * as i11 from "../../pipes/ccd-hyphens.pipe";
import * as i12 from "../../pipes/capitalize.pipe";
function PaymentViewComponent_ng_container_1_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 10)(2, "h2", 11);
    i0.ɵɵtext(3, " Payment details could not be retrieved ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 12);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r10.errorMessage, " ");
} }
function PaymentViewComponent_ng_container_1_div_9_tr_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 19)(1, "td", 20);
    i0.ɵɵtext(2, "Over payment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 21);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("\u00A3", i0.ɵɵpipeBind2(5, 1, ctx_r13.getOverPaymentValue(), ".2"), "");
} }
function PaymentViewComponent_ng_container_1_div_9_tr_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 19)(1, "td", 20);
    i0.ɵɵtext(2, "Payment asset number(DCN)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 21);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r14.paymentGroup == null ? null : ctx_r14.paymentGroup.payments[0] == null ? null : ctx_r14.paymentGroup.payments[0].document_control_number);
} }
function PaymentViewComponent_ng_container_1_div_9_tr_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 19)(1, "td", 20);
    i0.ɵɵtext(2, "Banked date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 21);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, ctx_r15.paymentGroup == null ? null : ctx_r15.paymentGroup.payments[0] == null ? null : ctx_r15.paymentGroup.payments[0].banked_date, "dd MMM yyyy"));
} }
function PaymentViewComponent_ng_container_1_div_9_tr_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 19)(1, "td", 20);
    i0.ɵɵtext(2, "GovPay Transaction ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 21);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r16.paymentGroup == null ? null : ctx_r16.paymentGroup.payments[0] == null ? null : ctx_r16.paymentGroup.payments[0].external_reference);
} }
function PaymentViewComponent_ng_container_1_div_9_tr_34_td_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 21);
    i0.ɵɵtext(1, "Credit");
    i0.ɵɵelementEnd();
} }
function PaymentViewComponent_ng_container_1_div_9_tr_34_td_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 21);
    i0.ɵɵtext(1, "Card");
    i0.ɵɵelementEnd();
} }
function PaymentViewComponent_ng_container_1_div_9_tr_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 19)(1, "td", 20);
    i0.ɵɵtext(2, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, PaymentViewComponent_ng_container_1_div_9_tr_34_td_3_Template, 2, 0, "td", 27);
    i0.ɵɵtemplate(4, PaymentViewComponent_ng_container_1_div_9_tr_34_td_4_Template, 2, 0, "td", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", (ctx_r17.paymentGroup == null ? null : ctx_r17.paymentGroup.payments[0] == null ? null : ctx_r17.paymentGroup.payments[0].method) !== "card");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r17.paymentGroup == null ? null : ctx_r17.paymentGroup.payments[0] == null ? null : ctx_r17.paymentGroup.payments[0].method) === "card");
} }
function PaymentViewComponent_ng_container_1_div_9_tr_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 19)(1, "td", 20);
    i0.ɵɵtext(2, "Allocaton status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 21);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r18.paymentGroup == null ? null : ctx_r18.paymentGroup.payments[0] == null ? null : ctx_r18.paymentGroup.payments[0].payment_allocation[0] == null ? null : ctx_r18.paymentGroup.payments[0].payment_allocation[0].allocation_status);
} }
function PaymentViewComponent_ng_container_1_div_9_tr_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 20);
    i0.ɵɵtext(2, "PBA account name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 21);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r19.paymentGroup == null ? null : ctx_r19.paymentGroup.payments[0] == null ? null : ctx_r19.paymentGroup.payments[0].organisation_name);
} }
function PaymentViewComponent_ng_container_1_div_9_tr_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 20);
    i0.ɵɵtext(2, "PBA number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 21);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r20.paymentGroup == null ? null : ctx_r20.paymentGroup.payments[0] == null ? null : ctx_r20.paymentGroup.payments[0].account_number);
} }
function PaymentViewComponent_ng_container_1_div_9_tr_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 20);
    i0.ɵɵtext(2, "Customer internal reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 21);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r21 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r21.paymentGroup == null ? null : ctx_r21.paymentGroup.payments[0] == null ? null : ctx_r21.paymentGroup.payments[0].customer_reference);
} }
function PaymentViewComponent_ng_container_1_div_9_ccpay_payment_statuses_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-payment-statuses", 28);
} if (rf & 2) {
    const ctx_r22 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("isTakePayment", ctx_r22.isTakePayment);
} }
function PaymentViewComponent_ng_container_1_div_9_div_49_tbody_19_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "capitalize");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td")(15, "a", 31);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_1_div_9_div_49_tbody_19_tr_1_Template_a_click_15_listener() { const restoredCtx = i0.ɵɵrestoreView(_r32); const payment_r30 = restoredCtx.$implicit; const ctx_r31 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r31.goToPaymentFailuePage(payment_r30)); });
    i0.ɵɵtext(16, "Show detail");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const payment_r30 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 5, payment_r30.status));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\u00A3", i0.ɵɵpipeBind2(6, 7, payment_r30.disputed_amount, ".2"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 10, payment_r30.representment_date ? payment_r30.representment_date : payment_r30.failure_event_date_time, "dd MMM yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(payment_r30.payment_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(payment_r30.failure_type);
} }
function PaymentViewComponent_ng_container_1_div_9_div_49_tbody_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody");
    i0.ɵɵtemplate(1, PaymentViewComponent_ng_container_1_div_9_div_49_tbody_19_tr_1_Template, 17, 13, "tr", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r27 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r27.allPaymentsFailure);
} }
function PaymentViewComponent_ng_container_1_div_9_div_49_tbody_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody")(1, "tr")(2, "td", 32);
    i0.ɵɵtext(3, " No disputed payment history available. ");
    i0.ɵɵelementEnd()()();
} }
function PaymentViewComponent_ng_container_1_div_9_div_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 17)(2, "h2", 29);
    i0.ɵɵtext(3, "Disputed payment history");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div")(5, "table")(6, "thead")(7, "tr")(8, "th");
    i0.ɵɵtext(9, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th");
    i0.ɵɵtext(15, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th");
    i0.ɵɵtext(17, "Event");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(18, "th");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(19, PaymentViewComponent_ng_container_1_div_9_div_49_tbody_19_Template, 2, 1, "tbody", 1);
    i0.ɵɵtemplate(20, PaymentViewComponent_ng_container_1_div_9_div_49_tbody_20_Template, 4, 0, "tbody", 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(21, "br")(22, "br");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r23 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("ngIf", !ctx_r23.errorMsg && ctx_r23.allPaymentsFailure.length > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r23.errorMsg || ctx_r23.allPaymentsFailure.length === 0);
} }
function PaymentViewComponent_ng_container_1_div_9_div_50_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 17);
    i0.ɵɵelement(2, "br")(3, "br");
    i0.ɵɵelementStart(4, "h2", 42);
    i0.ɵɵtext(5, "Fee and remission details");
    i0.ɵɵelementEnd()()();
} }
const _c0 = function (a0) { return { "tr-border": a0 }; };
function PaymentViewComponent_ng_container_1_div_9_div_50_div_2_tr_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 46);
    i0.ɵɵtext(2, "Allocated amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 45);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const fee_r37 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c0, !fee_r37.remissions));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c0, !fee_r37.remissions));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("\u00A3", i0.ɵɵpipeBind2(5, 3, fee_r37 == null ? null : fee_r37.apportion_amount, ".2"), "");
} }
function PaymentViewComponent_ng_container_1_div_9_div_50_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r41 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "table", 43)(2, "tbody")(3, "tr", 19)(4, "td", 20);
    i0.ɵɵtext(5, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 21);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "tr", 19)(9, "td", 20);
    i0.ɵɵtext(10, "Fee code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 21);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "tr", 19)(14, "td", 44);
    i0.ɵɵtext(15, "Fee amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 45);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(19, PaymentViewComponent_ng_container_1_div_9_div_50_div_2_tr_19_Template, 6, 10, "tr", 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "button", 26);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_1_div_9_div_50_div_2_Template_button_click_20_listener() { const restoredCtx = i0.ɵɵrestoreView(_r41); const fee_r37 = restoredCtx.$implicit; const ctx_r40 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r40.addRemission(fee_r37)); });
    i0.ɵɵtext(21, " Add remission");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const fee_r37 = ctx.$implicit;
    const ctx_r34 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("Application for ", fee_r37.description, "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(fee_r37 == null ? null : fee_r37.code);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c0, !fee_r37.apportion_amount && !fee_r37.remissions && !ctx_r34.isTurnOff));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(12, _c0, !fee_r37.apportion_amount && !fee_r37.remissions && !ctx_r34.isTurnOff));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("\u00A3", i0.ɵɵpipeBind2(18, 7, fee_r37 == null ? null : fee_r37.calculated_amount, ".2"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", fee_r37.apportion_amount);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", !ctx_r34.chkIsAddRemissionBtnEnable(fee_r37));
} }
function PaymentViewComponent_ng_container_1_div_9_div_50_tbody_17_Template(rf, ctx) { if (rf & 1) {
    const _r44 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tbody", 47)(1, "tr", 36)(2, "td", 48);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td", 48);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 48);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 48);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 49)(12, "button", 26);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_1_div_9_div_50_tbody_17_Template_button_click_12_listener() { const restoredCtx = i0.ɵɵrestoreView(_r44); const remission_r42 = restoredCtx.$implicit; const ctx_r43 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r43.addRefundForRemission(ctx_r43.paymentGroup.payments[0], remission_r42, ctx_r43.paymentGroup.fees)); });
    i0.ɵɵtext(13, " Add refund");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const remission_r42 = ctx.$implicit;
    const ctx_r35 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(remission_r42 == null ? null : remission_r42.hwf_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(remission_r42 == null ? null : remission_r42.remission_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(remission_r42 == null ? null : remission_r42.fee_code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(10, 5, remission_r42 == null ? null : remission_r42.hwf_amount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r35.chkIsAddRefundBtnEnable(remission_r42));
} }
function PaymentViewComponent_ng_container_1_div_9_div_50_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "span", 50);
    i0.ɵɵtext(2, "No help with fees or remissions.");
    i0.ɵɵelementEnd()();
} }
function PaymentViewComponent_ng_container_1_div_9_div_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, PaymentViewComponent_ng_container_1_div_9_div_50_div_1_Template, 6, 0, "div", 1);
    i0.ɵɵtemplate(2, PaymentViewComponent_ng_container_1_div_9_div_50_div_2_Template, 22, 14, "div", 30);
    i0.ɵɵelementStart(3, "div", 33)(4, "div", 17)(5, "table", 34)(6, "thead", 35)(7, "tr", 36)(8, "td", 37);
    i0.ɵɵtext(9, "Help with fees or remission code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 38);
    i0.ɵɵtext(11, "Reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 39);
    i0.ɵɵtext(13, "Fee");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 39);
    i0.ɵɵtext(15, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "td", 40);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(17, PaymentViewComponent_ng_container_1_div_9_div_50_tbody_17_Template, 14, 10, "tbody", 41);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(18, PaymentViewComponent_ng_container_1_div_9_div_50_div_18_Template, 3, 0, "div", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r24 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r24.paymentGroup.fees.length > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r24.paymentGroup.fees);
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("ngForOf", ctx_r24.paymentGroup.remissions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r24.paymentGroup.remissions == null ? null : ctx_r24.paymentGroup.remissions.length) === 0);
} }
function PaymentViewComponent_ng_container_1_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r46 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelement(1, "input", 14, 15);
    i0.ɵɵelementStart(3, "div", 16)(4, "div", 17)(5, "h1", 18);
    i0.ɵɵtext(6, "Payment details");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "table")(8, "tbody")(9, "tr", 19)(10, "td", 20);
    i0.ɵɵtext(11, "Service request reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 21);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "tr", 19)(15, "td", 20);
    i0.ɵɵtext(16, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 21);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "tr", 19)(20, "td", 20);
    i0.ɵɵtext(21, "Payment amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td", 21);
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(25, PaymentViewComponent_ng_container_1_div_9_tr_25_Template, 6, 4, "tr", 22);
    i0.ɵɵtemplate(26, PaymentViewComponent_ng_container_1_div_9_tr_26_Template, 5, 1, "tr", 22);
    i0.ɵɵtemplate(27, PaymentViewComponent_ng_container_1_div_9_tr_27_Template, 6, 4, "tr", 22);
    i0.ɵɵtemplate(28, PaymentViewComponent_ng_container_1_div_9_tr_28_Template, 5, 1, "tr", 22);
    i0.ɵɵelementStart(29, "tr", 19)(30, "td", 20);
    i0.ɵɵtext(31, "Payment method");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "td", 23);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(34, PaymentViewComponent_ng_container_1_div_9_tr_34_Template, 5, 2, "tr", 22);
    i0.ɵɵelementStart(35, "tr", 19)(36, "td", 20);
    i0.ɵɵtext(37, "Channel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "td", 23);
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(40, PaymentViewComponent_ng_container_1_div_9_tr_40_Template, 5, 1, "tr", 22);
    i0.ɵɵtemplate(41, PaymentViewComponent_ng_container_1_div_9_tr_41_Template, 5, 1, "tr", 1);
    i0.ɵɵtemplate(42, PaymentViewComponent_ng_container_1_div_9_tr_42_Template, 5, 1, "tr", 1);
    i0.ɵɵtemplate(43, PaymentViewComponent_ng_container_1_div_9_tr_43_Template, 5, 1, "tr", 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "div");
    i0.ɵɵtemplate(45, PaymentViewComponent_ng_container_1_div_9_ccpay_payment_statuses_45_Template, 1, 1, "ccpay-payment-statuses", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "div", 25)(47, "button", 26);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_1_div_9_Template_button_click_47_listener() { i0.ɵɵrestoreView(_r46); const ctx_r45 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r45.issueRefund(ctx_r45.paymentGroup)); });
    i0.ɵɵtext(48, "Issue refund");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(49, PaymentViewComponent_ng_container_1_div_9_div_49_Template, 23, 2, "div", 1);
    i0.ɵɵtemplate(50, PaymentViewComponent_ng_container_1_div_9_div_50_Template, 19, 4, "div", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate(ctx_r11.serviceReference);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0] == null ? null : ctx_r11.paymentGroup.payments[0].reference);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("\u00A3", i0.ɵɵpipeBind2(24, 18, ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0] == null ? null : ctx_r11.paymentGroup.payments[0].amount, ".2"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", (ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0] == null ? null : ctx_r11.paymentGroup.payments[0].over_payment) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0]) && (ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0] == null ? null : ctx_r11.paymentGroup.payments[0].document_control_number) && !(ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0] == null ? null : ctx_r11.paymentGroup.payments[0].external_reference));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0]) && (ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0] == null ? null : ctx_r11.paymentGroup.payments[0].document_control_number) && !(ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0] == null ? null : ctx_r11.paymentGroup.payments[0].external_reference));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0]) && (ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0] == null ? null : ctx_r11.paymentGroup.payments[0].external_reference));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0] == null ? null : ctx_r11.paymentGroup.payments[0].method);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0] == null ? null : ctx_r11.paymentGroup.payments[0].method) === "payment by account");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0] == null ? null : ctx_r11.paymentGroup.payments[0].channel);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0] == null ? null : ctx_r11.paymentGroup.payments[0].payment_allocation[0]) !== undefined);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0].organisation_name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0].account_number);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0].customer_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r11.isStatusAllocated);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r11.chkIsIssueRefundBtnEnable(ctx_r11.paymentGroup == null ? null : ctx_r11.paymentGroup.payments[0]));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r11.ISPAYMENTSTATUSENABLED);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.checkForFees(ctx_r11.paymentGroup));
} }
function PaymentViewComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r48 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 3)(2, "div", 4)(3, "ol", 5)(4, "li", 6)(5, "a", 7);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_1_Template_a_click_5_listener($event) { i0.ɵɵrestoreView(_r48); const ctx_r47 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r47.goToCaseTransationPage($event)); });
    i0.ɵɵtext(6, "Back");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(7, "main", 8);
    i0.ɵɵtemplate(8, PaymentViewComponent_ng_container_1_div_8_Template, 6, 1, "div", 1);
    i0.ɵɵtemplate(9, PaymentViewComponent_ng_container_1_div_9_Template, 51, 21, "div", 9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r0.errorMessage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.errorMessage && (ctx_r0.paymentGroup == null ? null : ctx_r0.paymentGroup.payments[0]));
} }
function PaymentViewComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "ccpay-add-remission", 51);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("isTurnOff", ctx_r1.isTurnOff)("isStrategicFixEnable", ctx_r1.isStrategicFixEnable)("viewCompStatus", ctx_r1.viewStatus)("fee", ctx_r1.feeId)("payment", ctx_r1.payment)("orderStatus", ctx_r1.paymentGroup.payments[0].status)("paidAmount", ctx_r1.paymentGroup.payments[0].amount)("isRefundRemission", ctx_r1.isRefundRemission)("caseType", ctx_r1.caseType)("paymentGroupRef", ctx_r1.paymentGroup.payment_group_reference)("isFromPaymentDetailPage", true)("ccdCaseNumber", ctx_r1.ccdCaseNumber)("orderFeesTotal", ctx_r1.orderFeesTotal)("orderTotalPayments", ctx_r1.orderTotalPayments)("orderRemissionTotal", ctx_r1.orderRemissionTotal)("orderRef", ctx_r1.orderRef)("orderCreated", ctx_r1.orderCreated)("orderParty", ctx_r1.orderParty)("orderCCDEvent", ctx_r1.orderCCDEvent)("orderDetail", ctx_r1.orderDetail)("LOGGEDINUSERROLES", ctx_r1.LOGGEDINUSERROLES);
} }
function PaymentViewComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "ccpay-add-remission", 52);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("isTurnOff", ctx_r2.isTurnOff)("isStrategicFixEnable", ctx_r2.isStrategicFixEnable)("viewCompStatus", ctx_r2.viewStatus)("payment", ctx_r2.payment)("orderStatus", ctx_r2.orderStatus)("paidAmount", ctx_r2.orderTotalPayments)("isRefundRemission", ctx_r2.isRefundRemission)("caseType", ctx_r2.caseType)("feeamount", ctx_r2.remissionFeeAmt)("remission", ctx_r2.remissions)("isFromServiceRequestPage", false)("paymentGroupRef", ctx_r2.paymentGroup.payment_group_reference)("ccdCaseNumber", ctx_r2.ccdCaseNumber)("orderFeesTotal", ctx_r2.orderFeesTotal)("orderTotalPayments", ctx_r2.orderTotalPayments)("orderRemissionTotal", ctx_r2.orderRemissionTotal)("orderRef", ctx_r2.orderRef)("orderCreated", ctx_r2.orderCreated)("orderParty", ctx_r2.orderParty)("orderCCDEvent", ctx_r2.orderCCDEvent)("orderDetail", ctx_r2.orderDetail)("LOGGEDINUSERROLES", ctx_r2.LOGGEDINUSERROLES);
} }
function PaymentViewComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccpay-add-remission", 53);
    i0.ɵɵtext(2, " >");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("isTurnOff", ctx_r3.isTurnOff)("isStrategicFixEnable", ctx_r3.isStrategicFixEnable)("payment", ctx_r3.paymentGroup.payments[0])("viewCompStatus", ctx_r3.viewStatus)("orderStatus", ctx_r3.paymentGroup.payments[0].status)("paidAmount", ctx_r3.paymentGroup.payments[0].amount)("isRefundRemission", ctx_r3.isRefundRemission)("caseType", ctx_r3.caseType)("isFromServiceRequestPage", ctx_r3.isFromServiceRequestPage)("isFromPaymentDetailPage", ctx_r3.isFromPaymentDetailPage)("paymentGroupRef", ctx_r3.paymentGroup.payment_group_reference)("ccdCaseNumber", ctx_r3.ccdCaseNumber)("orderFeesTotal", ctx_r3.orderFeesTotal)("orderTotalPayments", ctx_r3.orderTotalPayments)("orderRemissionTotal", ctx_r3.orderRemissionTotal)("orderRef", ctx_r3.orderRef)("orderCreated", ctx_r3.orderCreated)("orderParty", ctx_r3.orderParty)("orderCCDEvent", ctx_r3.orderCCDEvent)("orderDetail", ctx_r3.orderDetail)("fees", ctx_r3.paymentFees)("isFullyRefund", ctx_r3.isFullyRefund)("LOGGEDINUSERROLES", ctx_r3.LOGGEDINUSERROLES);
} }
function PaymentViewComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    const _r50 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccpay-service-request", 54);
    i0.ɵɵlistener("goToServiceRquestComponent", function PaymentViewComponent_ng_container_5_Template_ccpay_service_request_goToServiceRquestComponent_1_listener() { i0.ɵɵrestoreView(_r50); const ctx_r49 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r49.goToServiceRequestPage()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("viewStatus", ctx_r4.viewStatus)("orderRef", ctx_r4.orderRef)("orderStatus", ctx_r4.orderStatus)("orderCreated", ctx_r4.orderCreated)("orderParty", ctx_r4.orderParty)("orderCCDEvent", ctx_r4.orderCCDEvent)("orderDetail", ctx_r4.orderDetail)("LOGGEDINUSERROLES", ctx_r4.LOGGEDINUSERROLES)("takePayment", ctx_r4.isTakePayment)("ccdCaseNumber", ctx_r4.ccdCaseNumber)("orderFeesTotal", ctx_r4.orderFeesTotal)("orderTotalPayments", ctx_r4.orderTotalPayments)("orderRemissionTotal", ctx_r4.orderRemissionTotal)("isServiceRequest", ctx_r4.isServiceRequest);
} }
function PaymentViewComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r53 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 55, 15);
    i0.ɵɵelementStart(3, "h1", 42);
    i0.ɵɵtext(4, "Issue refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h1", 29);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdHyphens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 56);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 57)(11, "fieldset", 58)(12, "legend", 59)(13, "h1", 29);
    i0.ɵɵtext(14, "Select payment to refund");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 60)(16, "div", 61)(17, "input", 62);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_7_Template_input_click_17_listener() { i0.ɵɵrestoreView(_r53); const ctx_r52 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r52.selectPymentOption("op")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "label", 63);
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 61)(22, "input", 64);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_7_Template_input_click_22_listener() { i0.ɵɵrestoreView(_r53); const ctx_r54 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r54.selectPymentOption("fp")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "label", 65);
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "number");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(26, "button", 66);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_7_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r53); const ctx_r55 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r55.goToPaymentViewComponent()); });
    i0.ɵɵtext(27, " Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "button", 67);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_7_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r53); const ctx_r56 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r56.continuePayment(ctx_r56.paymentGroup)); });
    i0.ɵɵtext(29, " Continue");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Case reference: ", i0.ɵɵpipeBind1(7, 6, ctx_r5.ccdCaseNumber), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Payment reference: ", ctx_r5.paymentGroup == null ? null : ctx_r5.paymentGroup.payments[0] == null ? null : ctx_r5.paymentGroup.payments[0].reference, " ");
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1(" Over payment \u00A3", i0.ɵɵpipeBind2(20, 8, ctx_r5.getOverPaymentValue(), ".2"), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" Full payment \u00A3", i0.ɵɵpipeBind2(25, 11, ctx_r5.paymentGroup == null ? null : ctx_r5.paymentGroup.payments[0] == null ? null : ctx_r5.paymentGroup.payments[0].amount, ".2"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r5.isContinueBtnDisabled)("ngClass", ctx_r5.isContinueBtnDisabled ? "button button--disabled govuk-!-margin-right-1 govuk-font19px" : "button govuk-!-margin-right-1 govuk-font19px");
} }
function PaymentViewComponent_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    const _r59 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 68, 15);
    i0.ɵɵelementStart(3, "h1", 69);
    i0.ɵɵtext(4, "Issue refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2", 70);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdHyphens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 71);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "ccpay-contact-details", 72);
    i0.ɵɵlistener("assignContactDetails", function PaymentViewComponent_ng_container_8_Template_ccpay_contact_details_assignContactDetails_10_listener($event) { i0.ɵɵrestoreView(_r59); const ctx_r58 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r58.getContactDetails($event)); })("redirectToIssueRefund", function PaymentViewComponent_ng_container_8_Template_ccpay_contact_details_redirectToIssueRefund_10_listener($event) { i0.ɵɵrestoreView(_r59); const ctx_r60 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r60.gotoPaymentSelectPage($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p")(12, "a", 73);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_8_Template_a_click_12_listener($event) { i0.ɵɵrestoreView(_r59); const ctx_r61 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r61.goToCaseTransationPage($event)); });
    i0.ɵɵtext(13, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Case reference: ", i0.ɵɵpipeBind1(7, 3, ctx_r6.ccdCaseNumber), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Payment reference: ", ctx_r6.paymentGroup == null ? null : ctx_r6.paymentGroup.payments[0] == null ? null : ctx_r6.paymentGroup.payments[0].reference, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("addressObj", ctx_r6.notification);
} }
function PaymentViewComponent_ng_container_9_div_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 85)(1, "strong");
    i0.ɵɵtext(2, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r63 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r63.contactDetailsObj == null ? null : ctx_r63.contactDetailsObj.email == null ? null : ctx_r63.contactDetailsObj.email.trim(), " ");
} }
function PaymentViewComponent_ng_container_9_div_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 85)(1, "strong");
    i0.ɵɵtext(2, "Post");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r64 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate5(" ", ctx_r64.contactDetailsObj == null ? null : ctx_r64.contactDetailsObj.address_line == null ? null : ctx_r64.contactDetailsObj.address_line.trim(), "\u00A0", ctx_r64.contactDetailsObj == null ? null : ctx_r64.contactDetailsObj.city == null ? null : ctx_r64.contactDetailsObj.city.trim(), "\u00A0", ctx_r64.contactDetailsObj == null ? null : ctx_r64.contactDetailsObj.county == null ? null : ctx_r64.contactDetailsObj.county.trim(), "\u00A0", ctx_r64.contactDetailsObj == null ? null : ctx_r64.contactDetailsObj.country == null ? null : ctx_r64.contactDetailsObj.country.trim(), "\u00A0", ctx_r64.contactDetailsObj == null ? null : ctx_r64.contactDetailsObj.postal_code == null ? null : ctx_r64.contactDetailsObj.postal_code.trim(), " ");
} }
function PaymentViewComponent_ng_container_9_a_53_Template(rf, ctx) { if (rf & 1) {
    const _r69 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 86);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_9_a_53_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r69); const ctx_r68 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r68.showNotificationPreview()); });
    i0.ɵɵtext(1, " Preview ");
    i0.ɵɵelementEnd();
} }
function PaymentViewComponent_ng_container_9_a_54_Template(rf, ctx) { if (rf & 1) {
    const _r71 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 86);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_9_a_54_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r71); const ctx_r70 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r70.hideNotificationPreview()); });
    i0.ɵɵtext(1, " Hide Preview ");
    i0.ɵɵelementEnd();
} }
function PaymentViewComponent_ng_container_9_app_notification_preview_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-notification-preview", 87);
} if (rf & 2) {
    const ctx_r67 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("payment", ctx_r67.paymentGroup.payments[0])("contactDetails", ctx_r67.contactDetailsObj)("refundReason", "RR037")("refundAmount", ctx_r67.getOverPaymentValue());
} }
function PaymentViewComponent_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    const _r73 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 74, 15);
    i0.ɵɵelementStart(3, "div", 75)(4, "h1", 42);
    i0.ɵɵtext(5, " Check your answers");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "table", 34)(7, "tr", 36)(8, "td", 76);
    i0.ɵɵtext(9, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 77);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "tr", 36)(13, "td", 76);
    i0.ɵɵtext(14, "Payment amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 77);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "tr", 36)(19, "td", 76);
    i0.ɵɵtext(20, "Fee amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 77);
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "tr", 36)(25, "td", 76);
    i0.ɵɵtext(26, "Refund amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "td", 77);
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "tr", 36)(31, "td", 76);
    i0.ɵɵtext(32, "Refund reason");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "td", 77);
    i0.ɵɵtext(34, "Over payment");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "tr", 36)(36, "td", 76);
    i0.ɵɵtext(37, "Send to");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "td", 77);
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "tr", 36)(41, "td", 76);
    i0.ɵɵtext(42, "Send via");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "td", 48);
    i0.ɵɵtemplate(44, PaymentViewComponent_ng_container_9_div_44_Template, 5, 1, "div", 78);
    i0.ɵɵtemplate(45, PaymentViewComponent_ng_container_9_div_45_Template, 5, 5, "div", 78);
    i0.ɵɵelementStart(46, "a", 79);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_9_Template_a_click_46_listener() { i0.ɵɵrestoreView(_r73); const ctx_r72 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r72.gotoAddressPage(ctx_r72.contactDetailsObj)); });
    i0.ɵɵtext(47, "Change");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(48, "tr", 36)(49, "td", 76);
    i0.ɵɵtext(50, "Notification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "td", 77);
    i0.ɵɵtext(52);
    i0.ɵɵtemplate(53, PaymentViewComponent_ng_container_9_a_53_Template, 2, 0, "a", 80);
    i0.ɵɵtemplate(54, PaymentViewComponent_ng_container_9_a_54_Template, 2, 0, "a", 80);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(55, PaymentViewComponent_ng_container_9_app_notification_preview_55_Template, 1, 4, "app-notification-preview", 81);
    i0.ɵɵelementStart(56, "button", 82);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_9_Template_button_click_56_listener() { i0.ɵɵrestoreView(_r73); const ctx_r74 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r74.gotoAddressPage(ctx_r74.contactDetailsObj)); });
    i0.ɵɵtext(57, "Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "button", 83);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_9_Template_button_click_58_listener() { i0.ɵɵrestoreView(_r73); const ctx_r75 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r75.processRefund()); });
    i0.ɵɵtext(59, " Submit refund ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "p")(61, "a", 84);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_9_Template_a_click_61_listener($event) { i0.ɵɵrestoreView(_r73); const ctx_r76 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r76.goToCaseTransationPage($event)); });
    i0.ɵɵtext(62, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate1(" ", ctx_r7.paymentGroup.payments[0].reference, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(17, 12, ctx_r7.paymentGroup.payments[0].amount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(23, 17, ctx_r7.paymentGroup == null ? null : ctx_r7.paymentGroup.fees[0] == null ? null : ctx_r7.paymentGroup.fees[0].net_amount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(29, 22, ctx_r7.getOverPaymentValue(), "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r7.orderParty);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", (ctx_r7.contactDetailsObj == null ? null : ctx_r7.contactDetailsObj.notification_type) === "EMAIL");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r7.contactDetailsObj == null ? null : ctx_r7.contactDetailsObj.notification_type) === "LETTER");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", ctx_r7.templateInstructionType, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r7.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.notificationPreview);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r7.isContinueBtnDisabled ? "button button--disabled govuk-!-margin-right-1 govuk-font19px" : "button govuk-!-margin-right-1 govuk-font19px");
} }
function PaymentViewComponent_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    const _r79 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 88, 15);
    i0.ɵɵelementStart(3, "div", 89)(4, "div")(5, "div", 90)(6, "h1", 91);
    i0.ɵɵtext(7, " Refund submitted ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 92)(9, "p", 93)(10, "strong");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(12, "h2", 69);
    i0.ɵɵtext(13, "What happens next");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 94);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p", 94)(18, "a", 95);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_10_Template_a_click_18_listener($event) { i0.ɵɵrestoreView(_r79); const ctx_r78 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r78.goToCaseTransationPage($event)); });
    i0.ɵɵtext(19, " Return to case ");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate1("Refund reference: ", ctx_r8.refundReference, "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" A refund request for ", i0.ɵɵpipeBind4(16, 2, ctx_r8.refundAmount, "GBP", "symbol-narrow", "1.2-2"), " has been created and will be passed to a team leader to approve. ");
} }
function PaymentViewComponent_ng_container_11_tr_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 19)(1, "td", 97);
    i0.ɵɵtext(2, "Has disputed amount debited");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r80 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("\t", ctx_r80.selectedPaymentsStatus.has_amount_debited, "");
} }
function PaymentViewComponent_ng_container_11_tr_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 19)(1, "td", 97);
    i0.ɵɵtext(2, "Status following representation of payment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r81 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("\t", ctx_r81.selectedPaymentsStatus.representment_status === "Yes" || ctx_r81.selectedPaymentsStatus.representment_status === "yes" ? "Success" : "Failure", "");
} }
function PaymentViewComponent_ng_container_11_tr_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 19)(1, "td", 97);
    i0.ɵɵtext(2, "Date payment represented");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r82 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("\t", i0.ɵɵpipeBind2(5, 1, ctx_r82.selectedPaymentsStatus.representment_date, "dd MMM yyyy HH:mm:ss"), "");
} }
function PaymentViewComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    const _r84 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 96)(2, "div", 4)(3, "ol", 5)(4, "li", 6)(5, "a", 7);
    i0.ɵɵlistener("click", function PaymentViewComponent_ng_container_11_Template_a_click_5_listener($event) { i0.ɵɵrestoreView(_r84); const ctx_r83 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r83.goBackToPaymentView($event)); });
    i0.ɵɵtext(6, "Back");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(7, "div", 16)(8, "div", 17)(9, "h1", 18);
    i0.ɵɵtext(10, "Failure event details");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "table")(12, "tbody")(13, "tr", 19)(14, "td", 97);
    i0.ɵɵtext(15, "Failure reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "tr", 19)(19, "td", 97);
    i0.ɵɵtext(20, "Failure reason");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td");
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "tr", 19)(24, "td", 97);
    i0.ɵɵtext(25, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "td");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "tr", 19)(29, "td", 97);
    i0.ɵɵtext(30, "Payment amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "td");
    i0.ɵɵtext(32);
    i0.ɵɵpipe(33, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "tr", 19)(35, "td", 97);
    i0.ɵɵtext(36, "Disputed amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "td");
    i0.ɵɵtext(38);
    i0.ɵɵpipe(39, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "tr", 19)(41, "td", 97);
    i0.ɵɵtext(42, "Additional information");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "td");
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "tr", 19)(46, "td", 97);
    i0.ɵɵtext(47, "Failure type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "td");
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "tr", 19)(51, "td", 97);
    i0.ɵɵtext(52, "Failure event date and time");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "td");
    i0.ɵɵtext(54);
    i0.ɵɵpipe(55, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(56, PaymentViewComponent_ng_container_11_tr_56_Template, 5, 1, "tr", 22);
    i0.ɵɵtemplate(57, PaymentViewComponent_ng_container_11_tr_57_Template, 5, 1, "tr", 22);
    i0.ɵɵtemplate(58, PaymentViewComponent_ng_container_11_tr_58_Template, 6, 4, "tr", 22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(59, "div");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance(17);
    i0.ɵɵtextInterpolate1("\t", ctx_r9.selectedPaymentsStatus.failure_reference, "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("\t", ctx_r9.selectedPaymentsStatus.failure_reason, "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r9.selectedPaymentsStatus.payment_reference);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" \u00A3", i0.ɵɵpipeBind2(33, 11, ctx_r9.paymentGroup == null ? null : ctx_r9.paymentGroup.payments[0] == null ? null : ctx_r9.paymentGroup.payments[0].amount, ".2"), "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("\t\u00A3", i0.ɵɵpipeBind2(39, 14, ctx_r9.selectedPaymentsStatus.disputed_amount, ".2"), "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("\t", ctx_r9.selectedPaymentsStatus.additional_reference, "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("\t", ctx_r9.selectedPaymentsStatus.failure_type, "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(55, 17, ctx_r9.selectedPaymentsStatus.failure_event_date_time, "dd MMM yyyy HH:mm:ss"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r9.selectedPaymentsStatus.has_amount_debited);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.selectedPaymentsStatus.representment_status);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.selectedPaymentsStatus.representment_date);
} }
const BS_ENABLE_FLAG = 'bulk-scan-enabling-fe';
export class PaymentViewComponent {
    paymentViewService;
    notificationService;
    paymentLibComponent;
    cd;
    OrderslistService;
    isTurnOff;
    isTakePayment;
    caseType;
    orderRef;
    orderStatus;
    orderTotalPayments;
    payment;
    LOGGEDINUSERROLES;
    ISPAYMENTSTATUSENABLED;
    orderParty;
    orderCreated;
    orderCCDEvent;
    orderFeesTotal;
    orderRemissionTotal;
    orderDetail;
    fees;
    isFullyRefund;
    isServiceRequest;
    errorMsg;
    paymentGroup;
    errorMessage;
    ccdCaseNumber;
    selectedOption;
    dcnNumber;
    isStatusAllocated;
    isRemissionsMatch;
    feeId;
    viewStatus;
    isRefundRemission = false;
    isStrategicFixEnable;
    isAddFeeBtnEnabled = false;
    isIssueRefunfBtnEnable = false;
    allowedRolesToAccessRefund = ['payments-refund-approver', 'payments-refund'];
    remissions = [];
    allPaymentsFailure = [];
    selectedPaymentsStatus;
    remissionFeeAmt;
    isRefundRemissionBtnEnable;
    serviceReference;
    isFromServiceRequestPage;
    isFromPaymentDetailPage;
    paymentFees;
    paymentType;
    isContinueBtnDisabled = true;
    viewCompStatus;
    contactDetailsObj;
    notification;
    isConfirmationBtnDisabled;
    refundReference;
    refundAmount;
    templateInstructionType;
    notificationPreview;
    constructor(paymentViewService, notificationService, paymentLibComponent, cd, OrderslistService) {
        this.paymentViewService = paymentViewService;
        this.notificationService = notificationService;
        this.paymentLibComponent = paymentLibComponent;
        this.cd = cd;
        this.OrderslistService = OrderslistService;
    }
    ngAfterContentChecked() {
        this.cd.detectChanges();
    }
    ngOnInit() {
        this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
        this.selectedOption = this.paymentLibComponent.SELECTED_OPTION;
        this.dcnNumber = this.paymentLibComponent.DCN_NUMBER;
        this.isTurnOff = this.paymentLibComponent.ISTURNOFF;
        this.serviceReference = this.paymentLibComponent.paymentGroupReference;
        this.viewStatus = 'paymentview';
        this.paymentViewService.getApportionPaymentDetails(this.paymentLibComponent.paymentReference).subscribe(paymentGroup => {
            let fees = [];
            paymentGroup.fees.forEach(fee => {
                this.isRemissionsMatch = false;
                paymentGroup.remissions.forEach(rem => {
                    if (rem.fee_code === fee.code) {
                        this.isRemissionsMatch = true;
                        fee['remissions'] = rem;
                        fees.push(fee);
                    }
                });
                if (!this.isRemissionsMatch) {
                    fees.push(fee);
                }
            });
            paymentGroup.fees = fees;
            this.paymentFees = fees;
            this.paymentGroup = paymentGroup;
            this.paymentGroup.payments = this.paymentGroup.payments.filter(paymentGroupObj => paymentGroupObj['reference'].includes(this.paymentLibComponent.paymentReference));
            const paymentAllocation = this.paymentGroup.payments[0].payment_allocation;
            this.isStatusAllocated = paymentAllocation.length > 0 && paymentAllocation[0].allocation_status === 'Allocated' || paymentAllocation.length === 0;
        }, (error) => this.errorMessage = error);
        this.paymentViewService.getPaymentFailure(this.paymentLibComponent.paymentReference).subscribe({
            next: (res) => {
                JSON.parse(res).payment_failure_list.reverse().forEach(payments => {
                    this.allPaymentsFailure.push(payments.payment_failure_initiated);
                    if (payments.payment_failure_closed) {
                        this.allPaymentsFailure.push(payments.payment_failure_closed);
                    }
                });
                this.allPaymentsFailure = this.allPaymentsFailure.reverse();
            },
            error: (e) => {
                this.allPaymentsFailure = [];
                this.errorMsg = "Server error";
            }
        });
    }
    get isCardPayment() {
        return this.paymentGroup.payments[0].method === 'card';
    }
    get isTelephonyPayment() {
        return this.paymentGroup.payments[0].channel === 'telephony';
    }
    goToPaymentList() {
        this.paymentLibComponent.viewName = 'payment-list';
    }
    getOverPaymentValue() {
        let feesOverPayment = 0;
        this.paymentGroup.fees.forEach(fee => {
            feesOverPayment += fee.over_payment;
        });
        return feesOverPayment > 0 ? feesOverPayment : this.paymentGroup.payments[0].over_payment;
    }
    goToServiceRequestPage() {
        this.paymentLibComponent.viewName = 'case-transactions';
        this.paymentLibComponent.TAKEPAYMENT = false;
        this.paymentLibComponent.SERVICEREQUEST = 'true';
        this.paymentLibComponent.isFromServiceRequestPage = true;
        window.location.reload();
    }
    goToCaseTransationPage(event) {
        event.preventDefault();
        if (!this.paymentLibComponent.isFromServiceRequestPage) {
            this.OrderslistService.setnavigationPage('casetransactions');
            this.OrderslistService.setisFromServiceRequestPage(false);
            this.paymentLibComponent.viewName = 'case-transactions';
            this.paymentLibComponent.ISBSENABLE = true;
            this.resetOrderData();
        }
        else {
            this.OrderslistService.getorderRefs().subscribe((data) => this.orderRef = data);
            this.OrderslistService.getorderCCDEvents().subscribe((data) => this.orderCCDEvent = data);
            this.OrderslistService.getorderCreateds().subscribe((data) => this.orderCreated = data);
            this.OrderslistService.getorderDetail().subscribe((data) => this.orderDetail = data);
            this.OrderslistService.getorderPartys().subscribe((data) => this.orderParty = data);
            this.OrderslistService.getorderRemissionTotals().subscribe((data) => this.orderRemissionTotal = data);
            this.OrderslistService.getorderFeesTotals().subscribe((data) => this.orderFeesTotal = data);
            this.OrderslistService.getoorderTotalPaymentss().subscribe((data) => this.orderTotalPayments = data);
            this.viewStatus = 'order-full-view';
        }
    }
    addRemission(fee) {
        if (this.chkIsAddRemissionBtnEnable(fee)) {
            this.feeId = fee;
            this.paymentViewService.getApportionPaymentDetails(this.paymentGroup.payments[0].reference).subscribe(paymentGroup => {
                this.paymentGroup = paymentGroup;
                this.paymentGroup.payments = this.paymentGroup.payments.filter(paymentGroupObj => paymentGroupObj['reference'].includes(this.paymentLibComponent.paymentReference));
                this.payment = this.paymentGroup.payments[0];
                this.paymentLibComponent.isFromPaymentDetailPage = true;
                this.viewStatus = 'addremission';
                this.isRefundRemission = true;
                this.cd.detectChanges();
            }, (error) => this.errorMessage = error);
        }
    }
    checkForFees(paymentGroup) {
        if (paymentGroup !== null && paymentGroup !== undefined) {
            if (paymentGroup.fees !== null && paymentGroup.fees !== undefined) {
                return true;
            }
        }
        return false;
    }
    processRefund() {
        this.isConfirmationBtnDisabled = true;
        this.errorMessage = '';
        const obj = this.paymentGroup.fees[0];
        this.fees = [{ id: obj.id,
                code: obj.code,
                version: obj.version,
                apportion_amount: obj.apportion_amount,
                calculated_amount: obj.calculated_amount,
                updated_volume: obj.updated_volume ? obj.updated_volume : obj.volume,
                volume: obj.volume,
                refund_amount: this.getOverPaymentValue() }];
        const requestBody = new PostRefundRetroRemission(this.contactDetailsObj, this.fees, this.paymentGroup.payments[0].reference, 'RR037', this.getOverPaymentValue(), 'op');
        this.paymentViewService.postRefundsReason(requestBody).subscribe(response => {
            if (JSON.parse(response)) {
                this.viewCompStatus = '';
                this.viewStatus = 'refundconfirmationpage';
                this.refundReference = JSON.parse(response).refund_reference;
                this.refundAmount = JSON.parse(response).refund_amount;
            }
        }, (error) => {
            this.errorMessage = error;
            this.isConfirmationBtnDisabled = false;
            this.cd.detectChanges();
        });
    }
    gotoAddressPage(note) {
        if (note) {
            this.notification = { contact_details: note, notification_type: note.notification_type };
        }
        this.errorMessage = '';
        this.viewCompStatus = 'overPaymentAddressCapture';
    }
    addRefundForRemission(payment, remission, fees) {
        //if(!this.chkIsIssueRefundBtnEnable(payment)) {
        this.paymentViewService.getApportionPaymentDetails(payment.reference).subscribe(paymentGroup => {
            this.paymentGroup = paymentGroup;
            this.paymentGroup.payments = this.paymentGroup.payments.filter(paymentGroupObj => paymentGroupObj['reference'].includes(payment.reference));
            this.payment = this.paymentGroup.payments[0];
            this.remissions = remission;
            this.remissionFeeAmt = fees.filter(data => data.code === this.remissions['fee_code'])[0].net_amount;
            this.viewStatus = 'addrefundforremission';
            // const paymentAllocation = this.paymentGroup.payments[0].payment_allocation;
            // this.isStatusAllocated = paymentAllocation.length > 0 && paymentAllocation[0].allocation_status === 'Allocated' || paymentAllocation.length === 0;
        }, (error) => this.errorMessage = error);
        //}
    }
    goToPaymentViewComponent() {
        this.viewCompStatus = '';
        this.viewStatus = 'paymentview';
    }
    issueRefund(paymentgrp) {
        if (paymentgrp !== null && paymentgrp !== undefined) {
            if (this.chkIsIssueRefundBtnEnable(paymentgrp.payments[0])) {
                if (paymentgrp.payments[0].over_payment > 0) {
                    this.viewCompStatus = 'overpayment';
                }
                else {
                    this.paymentGroup = paymentgrp;
                    this.viewStatus = 'issuerefund';
                    this.isRefundRemission = true;
                    this.paymentLibComponent.isFromPaymentDetailPage = true;
                    this.isFromPaymentDetailPage = true;
                    this.isFromServiceRequestPage = false;
                }
            }
        }
    }
    getRemissionByFeeCode(feeCode, remissions) {
        if (remissions && remissions.length > 0) {
            for (const remission of remissions) {
                if (remission.fee_code === feeCode) {
                    return remission;
                }
            }
        }
        return null;
    }
    chkIsIssueRefundBtnEnable(payment) {
        if (payment !== null && payment !== undefined) {
            return payment.issue_refund && payment.refund_enable;
        }
        else {
            return false;
        }
    }
    chkIsAddRefundBtnEnable(remission) {
        if (remission !== null && remission !== undefined) {
            return remission.add_refund;
        }
        else {
            return false;
        }
    }
    chkIsAddRemissionBtnEnable(fee) {
        if (fee !== null && fee !== undefined) {
            return fee.add_remission && fee.remission_enable;
        }
        else {
            return false;
        }
    }
    selectPymentOption(paymentType) {
        this.paymentType = paymentType;
        this.isContinueBtnDisabled = false;
    }
    continuePayment(paymentgrp) {
        if (this.paymentType === 'op') {
            this.isFullyRefund = false;
            this.viewCompStatus = 'overPaymentAddressCapture';
        }
        else if (this.paymentType === 'fp') {
            this.isFullyRefund = true;
            this.paymentGroup = paymentgrp;
            this.viewStatus = 'issuerefund';
            this.viewCompStatus = "";
            this.isRefundRemission = true;
            this.paymentLibComponent.isFromPaymentDetailPage = true;
            this.isFromPaymentDetailPage = true;
            this.isFromServiceRequestPage = this.paymentLibComponent.isFromServiceRequestPage;
        }
    }
    gotoPaymentSelectPage(event) {
        event.preventDefault();
        this.viewCompStatus = 'overpayment';
    }
    getContactDetails(obj) {
        this.contactDetailsObj = obj;
        this.notificationPreview = false;
        this.getTemplateInstructionType(this.paymentGroup.payments[0]);
        this.viewCompStatus = 'overpaymentcheckandanswer';
    }
    resetOrderData() {
        this.OrderslistService.setOrderRef(null);
        this.OrderslistService.setorderCCDEvent(null);
        this.OrderslistService.setorderCreated(null);
        this.OrderslistService.setorderDetail(null);
        this.OrderslistService.setorderParty(null);
        this.OrderslistService.setorderTotalPayments(null);
        this.OrderslistService.setorderRemissionTotal(null);
        this.OrderslistService.setorderFeesTotal(null);
    }
    goToPaymentFailuePage(payment) {
        this.viewStatus = 'payment-failure';
        this.selectedPaymentsStatus = payment;
    }
    goBackToPaymentView(event) {
        event.preventDefault();
        this.viewStatus = 'paymentview';
    }
    getTemplateInstructionType(payment) {
        if (payment == undefined || payment == null) {
            this.templateInstructionType = 'Template';
        }
        else {
            this.templateInstructionType = this.notificationService.getNotificationInstructionType(payment.channel, payment.method);
        }
    }
    showNotificationPreview() {
        this.notificationPreview = true;
    }
    hideNotificationPreview() {
        this.notificationPreview = false;
    }
    static ɵfac = function PaymentViewComponent_Factory(t) { return new (t || PaymentViewComponent)(i0.ɵɵdirectiveInject(i1.PaymentViewService), i0.ɵɵdirectiveInject(i2.NotificationService), i0.ɵɵdirectiveInject(i3.PaymentLibComponent), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i4.OrderslistService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PaymentViewComponent, selectors: [["ccpay-payment-view"]], inputs: { isTurnOff: "isTurnOff", isTakePayment: "isTakePayment", caseType: "caseType", orderRef: "orderRef", orderStatus: "orderStatus", orderTotalPayments: "orderTotalPayments", payment: "payment", LOGGEDINUSERROLES: "LOGGEDINUSERROLES", ISPAYMENTSTATUSENABLED: "ISPAYMENTSTATUSENABLED", orderParty: "orderParty", orderCreated: "orderCreated", orderCCDEvent: "orderCCDEvent", orderFeesTotal: "orderFeesTotal", orderRemissionTotal: "orderRemissionTotal", orderDetail: "orderDetail", isServiceRequest: "isServiceRequest" }, decls: 12, vars: 10, consts: [[1, "payment-view-section"], [4, "ngIf"], [1, "over-payment"], [1, "govuk-width-container"], [1, "govuk-breadcrumbs"], [1, "govuk-breadcrumbs__list"], [1, "govuk-breadcrumbs__list-item"], ["href", "javascript:void(0)", 1, "govuk-back-link", 3, "click"], ["id", "main-content", "role", "main", 1, "govuk-main-wrapper", "govuk-!-padding-top-0"], ["class", "payment-view-alignment", 4, "ngIf"], ["role", "group", "aria-labelledby", "failure-error-summary-heading", "tabindex", "-1", 1, "error-summary"], ["id", "failure-error-summary-heading", 1, "heading-medium", "error-summary-heading"], [1, "govuk-error-summary__body"], [1, "payment-view-alignment"], ["type", "hidden", "value", "PAYMENTDETAILS", 1, "iFrameDrivenImageValue"], ["myInput", ""], [1, "govuk-grid-row"], [1, "column"], [1, "heading-large", "govuk-!-margin-top-0"], [1, "section"], [1, "bold", "tb-col-w"], [1, "tb-col-w"], ["class", "section", 4, "ngIf"], [1, "tb-col-w", "text-transform"], [3, "isTakePayment", 4, "ngIf"], [1, "remission"], [1, "govuk-button", "govuk-button--secondary", 3, "disabled", "click"], ["class", "tb-col-w", 4, "ngIf"], [3, "isTakePayment"], [1, "heading-medium"], [4, "ngFor", "ngForOf"], ["href", "javascript:void(0)", 3, "click"], ["colspan", "6"], [1, "order-class"], [1, "govuk-table"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["scope", "col", 1, "govuk-table__header", "col-24", "whitespace-inherit"], ["scope", "col", 1, "govuk-table__header", "col-27", "whitespace-inherit"], ["scope", "col", 1, "govuk-table__header", "whitespace-inherit"], ["scope", "col", 1, "govuk-table__header", "whitespace-inherit", "refundBtn"], ["class", "govuk-table__body", 4, "ngFor", "ngForOf"], [1, "heading-large"], [1, "table"], [1, "bold", "tb-col-w", 3, "ngClass"], [3, "ngClass"], [1, "bold", "tb-col-w", "tr-border", 3, "ngClass"], [1, "govuk-table__body"], [1, "govuk-table__cell", "whitespace-inherit"], [1, "govuk-table__cell", "refundBtn", "whitespace-inherit"], [1, "mar-17"], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "fee", "payment", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "paymentGroupRef", "isFromPaymentDetailPage", "ccdCaseNumber", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal", "orderRef", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "LOGGEDINUSERROLES"], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "payment", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "feeamount", "remission", "isFromServiceRequestPage", "paymentGroupRef", "ccdCaseNumber", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal", "orderRef", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "LOGGEDINUSERROLES"], [3, "isTurnOff", "isStrategicFixEnable", "payment", "viewCompStatus", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "isFromServiceRequestPage", "isFromPaymentDetailPage", "paymentGroupRef", "ccdCaseNumber", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal", "orderRef", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "fees", "isFullyRefund", "LOGGEDINUSERROLES"], [3, "viewStatus", "orderRef", "orderStatus", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "LOGGEDINUSERROLES", "takePayment", "ccdCaseNumber", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal", "isServiceRequest", "goToServiceRquestComponent"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "OVERPAYMENTPAGE"], ["id", "how-contacted-conditional-hint govuk-font19px", 1, "form-hint"], [1, "govuk-form-group"], [1, "govuk-fieldset"], [1, "govuk-fieldset__legend", "govuk-fieldset__legend--l"], ["data-module", "govuk-radios", 1, "govuk-radios"], [1, "govuk-radios__item"], ["id", "over-payment", "name", "over-payment", "type", "radio", "value", "op", 1, "govuk-radios__input", 3, "click"], ["for", "where-do-you-live", 1, "govuk-label", "govuk-radios__label", "govuk-font19px"], ["id", "full-payment", "name", "over-payment", "type", "radio", "value", "fp", 1, "govuk-radios__input", 3, "click"], ["for", "where-do-you-live-2", 1, "govuk-label", "govuk-radios__label", "govuk-font19px"], [1, "govuk-button", "govuk-button--secondary", "over-payment-alignment", "govuk-font19px", 3, "click"], [1, "govuk-button", 3, "disabled", "ngClass", "click"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "OVERPAYMENTADDRESSCAPTUREPAGE"], [1, "govuk-heading-l"], [1, "govuk-heading-m", "govuk-font19px"], ["id", "how-contacted-conditional-hint", 1, "govuk-hint", "govuk-font19px"], [3, "addressObj", "assignContactDetails", "redirectToIssueRefund"], ["data-module", "govuk-button", 1, "govuk-link", 3, "click"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "ADDREFUNDFORREMISSION"], [1, "govuk-warning-text"], [1, "govuk-table__cell", "govuk-!-font-weight-bold"], [1, "govuk-table__cell"], ["class", "contactDetails-width", 4, "ngIf"], [1, "govuk-link", "right", 3, "click"], ["href", "Javascript:void(0)", "class", "govuk-link right", 3, "click", 4, "ngIf"], [3, "payment", "contactDetails", "refundReason", "refundAmount", 4, "ngIf"], ["type", "submit", 1, "button", "govuk-button--secondary", "over-payment-alignment", "govuk-font19px", 3, "click"], ["type", "submit", 3, "ngClass", "click"], ["href", "javascript:void(0)", "data-module", "govuk-button", 1, "govuk-link", "govuk-font19px", 3, "click"], [1, "contactDetails-width"], ["href", "Javascript:void(0)", 1, "govuk-link", "right", 3, "click"], [3, "payment", "contactDetails", "refundReason", "refundAmount"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "RETROREMISSIONREFUNDCONFIRMATIONPAGE"], [1, "govuk-grid-row", "pagesize"], [1, "govuk-panel", "govuk-panel--confirmation"], [1, "govuk-panel__title"], [1, "govuk-panel__body"], [1, "govuk-body", "white"], [1, "govuk-body"], ["href", "javascript:void(0)", "data-module", "govuk-button", 1, "govuk-link", "pointer", 3, "click"], [1, "payment-failure-alignment"], [1, "bold"]], template: function PaymentViewComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, PaymentViewComponent_ng_container_1_Template, 10, 2, "ng-container", 1);
            i0.ɵɵtemplate(2, PaymentViewComponent_ng_container_2_Template, 2, 21, "ng-container", 1);
            i0.ɵɵtemplate(3, PaymentViewComponent_ng_container_3_Template, 2, 22, "ng-container", 1);
            i0.ɵɵtemplate(4, PaymentViewComponent_ng_container_4_Template, 3, 23, "ng-container", 1);
            i0.ɵɵtemplate(5, PaymentViewComponent_ng_container_5_Template, 2, 14, "ng-container", 1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 2);
            i0.ɵɵtemplate(7, PaymentViewComponent_ng_container_7_Template, 30, 14, "ng-container", 1);
            i0.ɵɵtemplate(8, PaymentViewComponent_ng_container_8_Template, 14, 5, "ng-container", 1);
            i0.ɵɵtemplate(9, PaymentViewComponent_ng_container_9_Template, 63, 27, "ng-container", 1);
            i0.ɵɵtemplate(10, PaymentViewComponent_ng_container_10_Template, 20, 7, "ng-container", 1);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(11, PaymentViewComponent_ng_container_11_Template, 60, 20, "ng-container", 1);
        } if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "paymentview" && ctx.viewCompStatus !== "overpayment" && ctx.viewCompStatus !== "overPaymentAddressCapture" && ctx.viewCompStatus !== "overpaymentcheckandanswer");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "addremission" && ctx.feeId && ctx.viewCompStatus !== "overpayment" && ctx.viewCompStatus !== "overPaymentAddressCapture" && ctx.viewCompStatus !== "overpaymentcheckandanswer");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "addrefundforremission" && ctx.payment && ctx.viewCompStatus !== "overpayment" && ctx.viewCompStatus !== "overPaymentAddressCapture" && ctx.viewCompStatus !== "overpaymentcheckandanswer");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "issuerefund" && ctx.viewCompStatus !== "overpayment" && ctx.viewCompStatus !== "overPaymentAddressCapture" && ctx.viewCompStatus !== "overpaymentcheckandanswer");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "order-full-view" && ctx.viewCompStatus !== "overpayment" && ctx.viewCompStatus !== "overPaymentAddressCapture" && ctx.viewCompStatus !== "overpaymentcheckandanswer");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.viewCompStatus === "overpayment");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewCompStatus === "overPaymentAddressCapture");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewCompStatus === "overpaymentcheckandanswer");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "refundconfirmationpage" && ctx.viewCompStatus !== "overpayment" && ctx.viewCompStatus !== "overPaymentAddressCapture" && ctx.viewCompStatus !== "overpaymentcheckandanswer");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "payment-failure");
        } }, dependencies: [i5.NgClass, i5.NgForOf, i5.NgIf, i6.ContactDetailsComponent, i7.StatusHistoryComponent, i8.AddRemissionComponent, i9.ServiceRequestComponent, i10.NotificationPreviewComponent, i5.DecimalPipe, i5.CurrencyPipe, i5.DatePipe, i11.CcdHyphensPipe, i12.CapitalizePipe], styles: [".payment-view-section[_ngcontent-%COMP%]   .tb-col-w[_ngcontent-%COMP%]{width:330px}.payment-view-section[_ngcontent-%COMP%]   .tr-border[_ngcontent-%COMP%]{border-bottom:2px solid}.payment-view-section[_ngcontent-%COMP%]   .payment-view-alignment[_ngcontent-%COMP%]{margin-left:30px}.payment-view-section[_ngcontent-%COMP%]   .govuk-button[_ngcontent-%COMP%]{font-size:19px;float:left;margin-top:2em}.payment-view-section[_ngcontent-%COMP%]   .remission[_ngcontent-%COMP%]{margin-bottom:7em}.payment-view-section[_ngcontent-%COMP%]   .govuk-error-summary__title[_ngcontent-%COMP%]{font-size:24px!important}.payment-view-section[_ngcontent-%COMP%]   .govuk-table__cell[_ngcontent-%COMP%], .payment-view-section[_ngcontent-%COMP%]   .govuk-table__header[_ngcontent-%COMP%]{padding:0;line-height:1.3;vertical-align:middle}.payment-view-section[_ngcontent-%COMP%]   .govuk-table__row[_ngcontent-%COMP%]{line-height:1.3}.payment-view-section[_ngcontent-%COMP%]   .govuk-table__cell[_ngcontent-%COMP%]:last-child{text-align:right}.payment-view-section[_ngcontent-%COMP%]   .text-transform[_ngcontent-%COMP%]:first-letter{text-transform:capitalize}.payment-view-section[_ngcontent-%COMP%]   .govuk-link[_ngcontent-%COMP%]{cursor:pointer}.payment-view-section[_ngcontent-%COMP%]   .mar-17[_ngcontent-%COMP%]{font-size:19px!important}.over-payment[_ngcontent-%COMP%]   .pagesize[_ngcontent-%COMP%]{margin:2em;width:97%}.over-payment[_ngcontent-%COMP%]   .contactDetails-width[_ngcontent-%COMP%]{width:70%}.over-payment[_ngcontent-%COMP%]   .margin-top10px[_ngcontent-%COMP%]{margin-top:20px}.over-payment[_ngcontent-%COMP%]   .govuk-font19px[_ngcontent-%COMP%]{font-size:19px!important}.over-payment[_ngcontent-%COMP%]   .margin-top--size[_ngcontent-%COMP%]{margin-top:-30px}.over-payment[_ngcontent-%COMP%]   .over-payment-alignment[_ngcontent-%COMP%]{margin-right:10px}.over-payment[_ngcontent-%COMP%]   .govuk-button[_ngcontent-%COMP%]{font-size:19px;float:left;margin-top:2em}.over-payment[_ngcontent-%COMP%]   td.govuk-table__cell[_ngcontent-%COMP%]{width:50%}.over-payment[_ngcontent-%COMP%]   .govuk-warning-text__text[_ngcontent-%COMP%], .over-payment[_ngcontent-%COMP%]   .govuk-label--s[_ngcontent-%COMP%], .over-payment[_ngcontent-%COMP%]   .hmcts-currency-input__symbol[_ngcontent-%COMP%]{font-size:19px;font-weight:400}.over-payment[_ngcontent-%COMP%]   .inline-error-class[_ngcontent-%COMP%]{outline:3px solid #a71414;outline-offset:0;border-color:#a71414}.over-payment[_ngcontent-%COMP%]   .inline-error-message[_ngcontent-%COMP%]{color:#a71414;border-color:#a71414;font-weight:700;margin-top:10px;font-size:20px}.over-payment[_ngcontent-%COMP%]   .govuk-button-group[_ngcontent-%COMP%]{padding-top:2em}.over-payment[_ngcontent-%COMP%]   .heading-medium[_ngcontent-%COMP%]{margin-top:.875em}.over-payment[_ngcontent-%COMP%]   .heading-large[_ngcontent-%COMP%]{margin-top:.25em}.over-payment[_ngcontent-%COMP%]   .govuk-panel--confirmation[_ngcontent-%COMP%]{color:#fff;background:#00703C}.over-payment[_ngcontent-%COMP%]   .govuk-panel__title[_ngcontent-%COMP%]{font-size:5rem}.over-payment[_ngcontent-%COMP%]   .govuk-body-m[_ngcontent-%COMP%], .over-payment[_ngcontent-%COMP%]   .govuk-body[_ngcontent-%COMP%]{font-size:2.1875rem}.over-payment[_ngcontent-%COMP%]   .govuk-link[_ngcontent-%COMP%]{cursor:pointer}.over-payment[_ngcontent-%COMP%]   .govuk-radios__conditional[_ngcontent-%COMP%]{padding-top:12px!important}.over-payment[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]{float:right;cursor:pointer}.over-payment[_ngcontent-%COMP%]   .radio[_ngcontent-%COMP%]{float:right}.over-payment[_ngcontent-%COMP%]   .white[_ngcontent-%COMP%]{color:#fff}.whitespace-inherit[_ngcontent-%COMP%]{white-space:inherit!important}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaymentViewComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-payment-view', template: "<div class=\"payment-view-section\">\n<ng-container *ngIf=\"viewStatus === 'paymentview' && viewCompStatus !== 'overpayment' && viewCompStatus !== 'overPaymentAddressCapture' && viewCompStatus !== 'overpaymentcheckandanswer'\">\n<div class=\"govuk-width-container\">\n\n  <div  class=\"govuk-breadcrumbs\">\n    <ol class=\"govuk-breadcrumbs__list\">\n      <li class=\"govuk-breadcrumbs__list-item\">\n        <a href=\"javascript:void(0)\" (click)=\"goToCaseTransationPage($event)\" class=\"govuk-back-link\">Back</a>\n      </li>\n    </ol>\n  </div>\n\n  <main class=\"govuk-main-wrapper govuk-!-padding-top-0\" id=\"main-content\" role=\"main\">\n\n    <div *ngIf=\"errorMessage\">\n      <div class=\"error-summary\" role=\"group\" aria-labelledby=\"failure-error-summary-heading\" tabindex=\"-1\">\n        <h2 class=\"heading-medium error-summary-heading\" id=\"failure-error-summary-heading\">\n          Payment details could not be retrieved\n        </h2>\n        <div class=\"govuk-error-summary__body\">\n          {{ errorMessage }}\n        </div>\n      </div>\n    </div>\n\n    <div class=\"payment-view-alignment\" *ngIf=\"!errorMessage && paymentGroup?.payments[0]\">\n\n      <input #myInput type='hidden' class='iFrameDrivenImageValue' value='PAYMENTDETAILS'>\n      <div class=\"govuk-grid-row\">\n        <div class=\"column\">\n          <h1 class=\"heading-large govuk-!-margin-top-0\">Payment details</h1>\n        </div>\n      </div>\n      <table>\n        <tbody>\n\n        <tr class=\"section\">\n          <td class=\"bold tb-col-w\">Service request reference</td>\n          <td class=\"tb-col-w\">{{ serviceReference  }}</td>\n        </tr>\n        <tr class=\"section\">\n          <td class=\"bold tb-col-w\">Payment reference</td>\n          <td class=\"tb-col-w\">{{ paymentGroup?.payments[0]?.reference }}</td>\n        </tr>\n        <tr class=\"section\">\n          <td class=\"bold tb-col-w\">Payment amount</td>\n          <td class=\"tb-col-w\">\u00A3{{ paymentGroup?.payments[0]?.amount | number:'.2' }}</td>\n        </tr>\n        <tr class=\"section\" *ngIf=\"paymentGroup?.payments[0]?.over_payment > 0\">\n          <td class=\"bold tb-col-w\">Over payment</td>\n          <td class=\"tb-col-w\">\u00A3{{ getOverPaymentValue() | number:'.2' }}</td>\n        </tr>\n        <tr class=\"section\" *ngIf=\"paymentGroup?.payments[0] && paymentGroup?.payments[0]?.document_control_number && !paymentGroup?.payments[0]?.external_reference\">\n          <td class=\"bold tb-col-w\">Payment asset number(DCN)</td>\n          <td class=\"tb-col-w\">{{ paymentGroup?.payments[0]?.document_control_number }}</td>\n        </tr>\n        <tr class=\"section\" *ngIf=\"paymentGroup?.payments[0] && paymentGroup?.payments[0]?.document_control_number && !paymentGroup?.payments[0]?.external_reference\">\n          <td class=\"bold tb-col-w\">Banked date</td>\n          <td class=\"tb-col-w\">{{ paymentGroup?.payments[0]?.banked_date | date:'dd MMM yyyy' }}</td>\n        </tr>\n        <tr class=\"section\" *ngIf=\"paymentGroup?.payments[0] && paymentGroup?.payments[0]?.external_reference\">\n          <td class=\"bold tb-col-w\">GovPay Transaction ID</td>\n          <td class=\"tb-col-w\">{{ paymentGroup?.payments[0]?.external_reference }}</td>\n        </tr>\n        <tr class=\"section\" >\n            <td class=\"bold tb-col-w\">Payment method</td>\n            <td class=\"tb-col-w text-transform\">{{ paymentGroup?.payments[0]?.method  }}</td>\n        </tr>\n        <tr class=\"section\" *ngIf=\"paymentGroup?.payments[0]?.method === 'payment by account'\" >\n            <td class=\"bold tb-col-w\">Type</td>\n            <td class=\"tb-col-w\" *ngIf=\"paymentGroup?.payments[0]?.method !== 'card'\">Credit</td>\n            <td class=\"tb-col-w\" *ngIf=\"paymentGroup?.payments[0]?.method === 'card'\">Card</td>\n        </tr>\n        <tr class=\"section\">\n            <td class=\"bold tb-col-w\">Channel</td>\n            <td class=\"tb-col-w text-transform\">{{ paymentGroup?.payments[0]?.channel  }}</td>\n        </tr>\n        <!-- <tr class=\"section\">\n            <td class=\"bold tb-col-w\">Method</td>\n            <td *ngIf=\"paymentGroup?.payments[0]?.method !== 'card'\">{{ paymentGroup?.payments[0]?.method }}</td>\n            <td *ngIf=\"paymentGroup?.payments[0]?.method === 'card'\">CARD</td>\n        </tr> -->\n        <!-- <tr class=\"section\" *ngIf=\"paymentGroup?.payments[0]?.channel !== 'telephony'\">\n            <td class=\"bold tb-col-w\">Status</td>\n            <td>{{ paymentGroup?.payments[0]?.status }}</td>\n         </tr> -->\n        <tr class=\"section\" *ngIf=\"paymentGroup?.payments[0]?.payment_allocation[0] !== undefined\">\n            <td class=\"bold tb-col-w\">Allocaton status</td>\n            <td class=\"tb-col-w\">{{ paymentGroup?.payments[0]?.payment_allocation[0]?.allocation_status }}</td>\n          </tr>\n\n          <tr *ngIf=\"paymentGroup?.payments[0].organisation_name\">\n            <td class=\"bold tb-col-w\">PBA account name</td>\n            <td class=\"tb-col-w\">{{ paymentGroup?.payments[0]?.organisation_name }}</td>\n          </tr>\n\n          <tr *ngIf=\"paymentGroup?.payments[0].account_number\">\n            <td class=\"bold tb-col-w\">PBA number</td>\n            <td class=\"tb-col-w\">{{ paymentGroup?.payments[0]?.account_number }}</td>\n          </tr>\n\n          <tr *ngIf=\"paymentGroup?.payments[0].customer_reference\">\n            <td class=\"bold tb-col-w\">Customer internal reference</td>\n            <td class=\"tb-col-w\">{{ paymentGroup?.payments[0]?.customer_reference }}</td>\n          </tr>\n\n        </tbody>\n      </table>\n\n      <div>\n            <!-- Status histories -->\n      <ccpay-payment-statuses *ngIf=\"isStatusAllocated\" [isTakePayment]=\"isTakePayment\"></ccpay-payment-statuses>\n      </div>\n     <div class=\"remission\">\n        <button  [disabled]=\"!chkIsIssueRefundBtnEnable(paymentGroup?.payments[0])\"  (click)=\"issueRefund(paymentGroup)\" class=\"govuk-button govuk-button--secondary\">Issue refund</button>\n     </div>\n<div *ngIf=\"ISPAYMENTSTATUSENABLED\">\n     <div class=\"column\">\n      <h2 class=\"heading-medium\">Disputed payment history</h2>\n    </div>\n    \n    <div>\n      <table>\n          <thead>\n            <tr>\n              <th>Status</th>\n              <th>Amount</th>\n              <th>Date</th>\n              <th>Payment reference</th>\n              <th>Event</th>\n              <th></th>\n            </tr>\n          </thead> \n          <tbody *ngIf=\"!errorMsg && allPaymentsFailure.length > 0\">\n            <tr *ngFor=\"let payment of allPaymentsFailure\">\n              <td>{{ payment.status | capitalize }}</td>\n              <td>\u00A3{{ payment.disputed_amount | number:'.2' }}</td>\n              <td>{{(payment.representment_date ? payment.representment_date : payment.failure_event_date_time) | date:'dd MMM yyyy'}}</td>\n              <td>{{ payment.payment_reference }}</td>\n              <td >{{ payment.failure_type }}</td>\n              <td>\n                \n                <a href=\"javascript:void(0)\" (click)=\"goToPaymentFailuePage(payment)\">Show detail</a>\n\n              </td>\n            </tr>\n          </tbody>\n          <tbody  *ngIf=\"errorMsg || allPaymentsFailure.length === 0\">\n            <tr>\n              <td colspan=\"6\"> No disputed payment history available. </td>\n            </tr>\n        </tbody>\n      </table>\n    </div>\n    <br/>\n    <br/>\n  </div>\n      \n     <div  *ngIf=\"checkForFees(paymentGroup)\">\n      <div  *ngIf=\"paymentGroup.fees.length > 0\">\n        <div class=\"column\">\n          <br/>\n          <br/>\n          <h2 class=\"heading-large\">Fee and remission details</h2>\n\n        </div>\n      </div>\n\n      <div *ngFor=\"let fee of paymentGroup.fees\">\n        <table class=\"table\">\n          <tbody>\n          <tr class=\"section\">\n            <td class=\"bold tb-col-w\">Description</td>\n            <td class=\"tb-col-w\">Application for {{ fee.description }}</td>\n          </tr>\n          <tr class=\"section\">\n            <td class=\"bold tb-col-w\">Fee code</td>\n            <td class=\"tb-col-w\">{{ fee?.code }}</td>\n          </tr>\n          <tr class=\"section\">\n            <td class=\"bold tb-col-w\" [ngClass]=\"{'tr-border': !fee.apportion_amount && !fee.remissions && !isTurnOff }\">Fee amount</td>\n            <td [ngClass]=\"{'tr-border': !fee.apportion_amount && !fee.remissions && !isTurnOff}\">\u00A3{{ fee?.calculated_amount | number:'.2' }}</td>\n          </tr>\n\n          <tr *ngIf=\"fee.apportion_amount\">\n            <td class=\"bold tb-col-w tr-border\" [ngClass]=\"{'tr-border': !fee.remissions}\">Allocated amount</td>\n            <td [ngClass]=\"{'tr-border': !fee.remissions}\">\u00A3{{ fee?.apportion_amount | number:'.2' }}</td>\n          </tr>\n\n          </tbody>\n        </table>\n        <button [disabled]=\"!chkIsAddRemissionBtnEnable(fee)\" (click)=\"addRemission(fee)\" class=\"govuk-button govuk-button--secondary\"> Add remission</button>\n      </div>\n\n                <!-- remissions -->\n                <div class=\"order-class\">\n                  <div class=\"column\">\n    <table class=\"govuk-table\">\n      <thead class=\"govuk-table__head\">\n        <tr class=\"govuk-table__row\">\n           <td class=\"govuk-table__header col-24 whitespace-inherit\" scope=\"col\">Help with fees or remission code</td>\n            <td class=\"govuk-table__header col-27 whitespace-inherit\" scope=\"col\">Reference</td>\n            <td class=\"govuk-table__header whitespace-inherit\" scope=\"col\">Fee</td>\n            <td class=\"govuk-table__header whitespace-inherit\" scope=\"col\">Amount</td>\n            <td  class=\"govuk-table__header whitespace-inherit refundBtn\" scope=\"col\"></td>\n          </tr>\n      </thead>\n      <tbody class=\"govuk-table__body\"  *ngFor=\"let remission of paymentGroup.remissions\">\n        <tr class=\"govuk-table__row\">\n           <td class=\"govuk-table__cell whitespace-inherit\">{{ remission?.hwf_reference }}</td>\n            <td class=\"govuk-table__cell whitespace-inherit\">{{ remission?.remission_reference }}</td>\n            <td class=\"govuk-table__cell whitespace-inherit\">{{ remission?.fee_code }}</td>\n            <td class=\"govuk-table__cell whitespace-inherit\">{{ remission?.hwf_amount | currency:'GBP':'symbol-narrow':'1.2-2'}}</td>\n            <td class=\"govuk-table__cell refundBtn whitespace-inherit\"  >\n               <button  [disabled]=\"!chkIsAddRefundBtnEnable(remission)\" (click)=\"addRefundForRemission(paymentGroup.payments[0],remission,paymentGroup.fees)\" class=\"govuk-button govuk-button--secondary\"> Add refund</button>\n            </td>\n          </tr>\n      </tbody>\n\n\n    </table>\n                  </div></div>\n\n   <div *ngIf=\"paymentGroup.remissions?.length === 0\">\n      <span class=\"mar-17\" >No help with fees or remissions.</span>\n   </div>\n\n  </div>\n    </div>\n  </main>\n</div>\n\n</ng-container>\n<ng-container *ngIf=\"viewStatus === 'addremission' && feeId && viewCompStatus !== 'overpayment' && viewCompStatus !== 'overPaymentAddressCapture' && viewCompStatus !== 'overpaymentcheckandanswer'\">\n<ccpay-add-remission \n[isTurnOff]=\"isTurnOff\"\n[isStrategicFixEnable]=\"isStrategicFixEnable\"\n[viewCompStatus]= \"viewStatus\"\n[fee]=\"feeId\"\n[payment] = \"payment\"\n[orderStatus] =\"paymentGroup.payments[0].status\"\n[paidAmount]= \"paymentGroup.payments[0].amount\"\n[isRefundRemission]=\"isRefundRemission\"\n[caseType]=\"caseType\"\n[paymentGroupRef]=\"paymentGroup.payment_group_reference\"\n[isFromPaymentDetailPage] = \"true\"\n[ccdCaseNumber]=\"ccdCaseNumber\"\n[orderFeesTotal] = \"orderFeesTotal\"\n[orderTotalPayments] = \"orderTotalPayments\"\n[orderRemissionTotal] = \"orderRemissionTotal\"\n[orderRef] = \"orderRef\"\n[orderCreated] = \"orderCreated\"\n[orderParty] = \"orderParty\"\n[orderCCDEvent] = \"orderCCDEvent\"\n[orderDetail] = \"orderDetail\"\n[LOGGEDINUSERROLES] = \"LOGGEDINUSERROLES\"></ccpay-add-remission>\n</ng-container>\n\n<ng-container *ngIf=\"viewStatus === 'addrefundforremission' && payment && viewCompStatus !== 'overpayment' && viewCompStatus !== 'overPaymentAddressCapture' && viewCompStatus !== 'overpaymentcheckandanswer'\">\n\n<ccpay-add-remission\n[isTurnOff]=\"isTurnOff\"\n[isStrategicFixEnable]=\"isStrategicFixEnable\"\n[viewCompStatus]= \"viewStatus\"\n[payment]=\"payment\"\n[orderStatus] =\"orderStatus\"\n[paidAmount]= \"orderTotalPayments\"\n[isRefundRemission]=\"isRefundRemission\"\n[caseType]=\"caseType\"\n[feeamount]=\"remissionFeeAmt\"\n[remission] = \"remissions\"\n[isFromServiceRequestPage]=\"false\"\n[paymentGroupRef]=\"paymentGroup.payment_group_reference\"\n[ccdCaseNumber]=\"ccdCaseNumber\"\n[orderFeesTotal] = \"orderFeesTotal\"\n[orderTotalPayments] = \"orderTotalPayments\"\n[orderRemissionTotal] = \"orderRemissionTotal\"\n[orderRef] = \"orderRef\"\n[orderCreated] = \"orderCreated\"\n[orderParty] = \"orderParty\"\n[orderCCDEvent] = \"orderCCDEvent\"\n[orderDetail] = \"orderDetail\"\n[LOGGEDINUSERROLES] = \"LOGGEDINUSERROLES\"></ccpay-add-remission>\n</ng-container>\n\n<ng-container *ngIf=\"viewStatus === 'issuerefund' && viewCompStatus !== 'overpayment' && viewCompStatus !== 'overPaymentAddressCapture' && viewCompStatus !== 'overpaymentcheckandanswer'\">\n    <ccpay-add-remission \n    [isTurnOff]=\"isTurnOff\"\n    [isStrategicFixEnable]=\"isStrategicFixEnable\"\n    [payment] = 'paymentGroup.payments[0]'\n    [viewCompStatus]= \"viewStatus\"\n    [orderStatus] =\"paymentGroup.payments[0].status\"\n    [paidAmount]= \"paymentGroup.payments[0].amount\"\n    [isRefundRemission]=\"isRefundRemission\"\n    [caseType]=\"caseType\"\n    [isFromServiceRequestPage]=\"isFromServiceRequestPage\"\n    [isFromPaymentDetailPage] = \"isFromPaymentDetailPage\"\n    [paymentGroupRef]=\"paymentGroup.payment_group_reference\"\n    [ccdCaseNumber]=\"ccdCaseNumber\"\n    [orderFeesTotal] = \"orderFeesTotal\"\n    [orderTotalPayments] = \"orderTotalPayments\"\n    [orderRemissionTotal] = \"orderRemissionTotal\"\n    [orderRef] = \"orderRef\"\n    [orderCreated] = \"orderCreated\"\n    [orderParty] = \"orderParty\"\n    [orderCCDEvent] = \"orderCCDEvent\"\n    [orderDetail] = \"orderDetail\"\n    [fees] =\"paymentFees\"\n    [isFullyRefund] = \"isFullyRefund\"\n    [LOGGEDINUSERROLES] = \"LOGGEDINUSERROLES\">\n    \n  ></ccpay-add-remission>\n</ng-container>\n<ng-container *ngIf=\"viewStatus === 'order-full-view' && viewCompStatus !== 'overpayment' && viewCompStatus !== 'overPaymentAddressCapture' && viewCompStatus !== 'overpaymentcheckandanswer'\">\n  <ccpay-service-request\n  [viewStatus] = \"viewStatus\"\n  [orderRef] = \"orderRef\"\n  [orderStatus] = \"orderStatus\"\n  [orderCreated] = \"orderCreated\"\n  [orderParty] = \"orderParty\"\n  [orderCCDEvent] = \"orderCCDEvent\"\n  [orderDetail] = \"orderDetail\"\n  [LOGGEDINUSERROLES] = \"LOGGEDINUSERROLES\"\n  [takePayment] = \"isTakePayment\"\n  [ccdCaseNumber] = \"ccdCaseNumber\"\n  [orderFeesTotal] = \"orderFeesTotal\"\n  [orderTotalPayments] = \"orderTotalPayments\"\n  [orderRemissionTotal] = \"orderRemissionTotal\"\n  [isServiceRequest] = \"isServiceRequest\"\n  (goToServiceRquestComponent) = \"goToServiceRequestPage()\"\n>\n</ccpay-service-request>\n\n</ng-container>\n</div>\n<div class=\"over-payment\">\n<ng-container *ngIf=\"viewCompStatus === 'overpayment'\">\n  <input #myInput type='hidden' id='iFrameDrivenImageValue' value='OVERPAYMENTPAGE'> \n  <h1 class=\"heading-large\">Issue refund</h1>\n  <h1 class=\"heading-medium\">Case reference: {{ccdCaseNumber | ccdHyphens }}</h1>\n  <span id=\"how-contacted-conditional-hint govuk-font19px\" class=\"form-hint\">\n    Payment reference: {{paymentGroup?.payments[0]?.reference}}\n  </span>\n<div class=\"govuk-form-group\">\n  <fieldset class=\"govuk-fieldset\">\n    <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--l\">\n      <h1 class=\"heading-medium\">Select payment to refund</h1>\n    </legend>\n    <div class=\"govuk-radios\" data-module=\"govuk-radios\">\n      <div class=\"govuk-radios__item\">\n        <input class=\"govuk-radios__input\" id=\"over-payment\" name=\"over-payment\" type=\"radio\" (click)=\"selectPymentOption('op')\" value=\"op\">\n        <label class=\"govuk-label govuk-radios__label govuk-font19px\" for=\"where-do-you-live\">\n          Over payment \u00A3{{getOverPaymentValue() | number:'.2'}}\n        </label>\n      </div>\n      <div class=\"govuk-radios__item\">\n        <input class=\"govuk-radios__input\" id=\"full-payment\" name=\"over-payment\" type=\"radio\" (click)=\"selectPymentOption('fp')\" value=\"fp\">\n        <label class=\"govuk-label govuk-radios__label govuk-font19px\" for=\"where-do-you-live-2\">\n          Full payment \u00A3{{paymentGroup?.payments[0]?.amount | number:'.2'}}\n        </label>\n      </div>\n    </div>\n      <button class=\"govuk-button govuk-button--secondary over-payment-alignment govuk-font19px\"\n      (click)=\"goToPaymentViewComponent()\"> Previous</button>\n      <button \n      (click)=\"continuePayment(paymentGroup)\"\n      [disabled]=\"isContinueBtnDisabled\"\n      [ngClass]='isContinueBtnDisabled ? \"button button--disabled govuk-!-margin-right-1 govuk-font19px\" : \"button govuk-!-margin-right-1 govuk-font19px\"'\n      class=\"govuk-button\"> Continue</button>\n  </fieldset>\n</div>\n</ng-container>\n\n<ng-container *ngIf=\"viewCompStatus === 'overPaymentAddressCapture'\">\n  <input #myInput type='hidden' id='iFrameDrivenImageValue' value='OVERPAYMENTADDRESSCAPTUREPAGE'>      \n  <h1 class=\"govuk-heading-l\">Issue refund</h1>\n  <h2 class=\"govuk-heading-m govuk-font19px\">Case reference: {{ccdCaseNumber | ccdHyphens }}</h2>\n  <span id=\"how-contacted-conditional-hint\" class=\"govuk-hint govuk-font19px\">\n    Payment reference: {{paymentGroup?.payments[0]?.reference}}\n  </span>\n<ccpay-contact-details \n[addressObj] = notification\n(assignContactDetails)=\"getContactDetails($event)\"\n(redirectToIssueRefund)=\"gotoPaymentSelectPage($event)\" ></ccpay-contact-details>\n<p>\n    <a (click)=\"goToCaseTransationPage($event)\" class=\"govuk-link\" data-module=\"govuk-button\">\n        Cancel\n    </a>\n</p>\n</ng-container>\n\n<ng-container *ngIf=\"viewCompStatus === 'overpaymentcheckandanswer'\">\n  <input #myInput type='hidden' id='iFrameDrivenImageValue' value='ADDREFUNDFORREMISSION'> \n  <div class=\"govuk-warning-text\">\n   \n      <h1 class=\"heading-large\"> Check your answers</h1>\n  </div>\n  <table class=\"govuk-table\">\n      <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment reference</td>\n          <td class=\"govuk-table__cell\"> {{paymentGroup.payments[0].reference}} </td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment amount</td>\n          <td class=\"govuk-table__cell\">{{paymentGroup.payments[0].amount | currency:'GBP':'symbol-narrow':'1.2-2'}}</td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Fee amount</td>\n          <td class=\"govuk-table__cell\">{{paymentGroup?.fees[0]?.net_amount | currency:'GBP':'symbol-narrow':'1.2-2'}}</td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Refund amount</td>\n          <td class=\"govuk-table__cell\">{{getOverPaymentValue() | currency:'GBP':'symbol-narrow':'1.2-2'}}</td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Refund reason</td>\n          <td class=\"govuk-table__cell\">Over payment</td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n        <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Send to</td>\n        <td class=\"govuk-table__cell\">{{orderParty}}</td>\n    </tr>\n    <tr class=\"govuk-table__row\">\n      <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Send via</td>\n      <td class=\"govuk-table__cell whitespace-inherit\">\n        <div *ngIf=\"contactDetailsObj?.notification_type === 'EMAIL'\" class=\"contactDetails-width\">\n          <strong>Email</strong>\n          <br/>\n          {{contactDetailsObj?.email?.trim()}}\n        </div>\n        <div *ngIf=\"contactDetailsObj?.notification_type === 'LETTER'\" class=\"contactDetails-width\">\n          <strong>Post</strong>\n          <br/>\n          {{contactDetailsObj?.address_line?.trim()}}&nbsp;{{contactDetailsObj?.city?.trim()}}&nbsp;{{contactDetailsObj?.county?.trim()}}&nbsp;{{contactDetailsObj?.country?.trim()}}&nbsp;{{contactDetailsObj?.postal_code?.trim()}}\n        </div>\n        <a (click)=\"gotoAddressPage(contactDetailsObj)\" class=\"govuk-link right\" >Change</a>\n      </td>\n    </tr>\n\n    <tr class=\"govuk-table__row\">\n      <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Notification</td>\n      <td class=\"govuk-table__cell\">{{templateInstructionType}}\n          <a *ngIf=\"!notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"showNotificationPreview()\">\n            Preview\n          </a>\n          <a *ngIf=\"notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"hideNotificationPreview()\">\n            Hide Preview\n          </a>\n      </td>\n    </tr>\n  </table>\n\n  <app-notification-preview *ngIf=\"notificationPreview\" \n  [payment]=\"paymentGroup.payments[0]\" \n  [contactDetails]=\"contactDetailsObj\"\n  [refundReason]=\"'RR037'\"\n  [refundAmount]=\"getOverPaymentValue()\"></app-notification-preview>\n\n  <button type=\"submit\" class=\"button govuk-button--secondary over-payment-alignment govuk-font19px\" (click)=\"gotoAddressPage(contactDetailsObj)\">Previous</button>\n  <button type=\"submit\"\n  [ngClass]='isContinueBtnDisabled ? \"button button--disabled govuk-!-margin-right-1 govuk-font19px\" : \"button govuk-!-margin-right-1 govuk-font19px\"'\n  (click)=\"processRefund()\">\n    Submit refund\n  </button>\n  <p>\n      <a href=\"javascript:void(0)\"  (click)=\"goToCaseTransationPage($event)\" class=\"govuk-link govuk-font19px\" data-module=\"govuk-button\">\n          Cancel\n      </a>\n  </p>\n\n</ng-container>\n<ng-container *ngIf=\"viewStatus === 'refundconfirmationpage' && viewCompStatus !== 'overpayment' && viewCompStatus !== 'overPaymentAddressCapture' && viewCompStatus !== 'overpaymentcheckandanswer'\">\n  <input #myInput type='hidden' id='iFrameDrivenImageValue' value='RETROREMISSIONREFUNDCONFIRMATIONPAGE'> \n  <div class=\"govuk-grid-row pagesize\">\n    <div >\n      <div class=\"govuk-panel govuk-panel--confirmation\">\n        <h1 class=\"govuk-panel__title\">\n          Refund submitted\n        </h1>\n        \n        <div class=\"govuk-panel__body\">\n          <p class=\"govuk-body white\"><strong>Refund reference: {{refundReference}}</strong></p>\n        </div>\n  \n      </div>\n      <h2 class=\"govuk-heading-l\">What happens next</h2>\n      <p class=\"govuk-body\">\n        A refund request for {{refundAmount  | currency:'GBP':'symbol-narrow':'1.2-2' }} has been created and will be passed to a team leader to approve.\n      </p>\n    <p class=\"govuk-body\">\n    <a href=\"javascript:void(0)\" (click)=\"goToCaseTransationPage($event)\" class=\"govuk-link pointer\" data-module=\"govuk-button\">\n      Return to case\n  </a>\n    </p>\n    </div>\n  </div>\n\n</ng-container>\n</div>\n\n<ng-container *ngIf=\"viewStatus === 'payment-failure'\">\n  <div class=\"payment-failure-alignment\">\n    <div  class=\"govuk-breadcrumbs\">\n      <ol class=\"govuk-breadcrumbs__list\">\n        <li class=\"govuk-breadcrumbs__list-item\">\n          <a href=\"javascript:void(0)\" (click)=\"goBackToPaymentView($event)\" class=\"govuk-back-link\">Back</a>\n        </li>\n      </ol>\n    </div>\n    <div class=\"govuk-grid-row\">\n      <div class=\"column\">\n        <h1 class=\"heading-large govuk-!-margin-top-0\">Failure event details</h1>\n      </div>\n    </div>\n    <table>\n      <tbody>\n\n      <tr class=\"section\">\n        <td class=\"bold\">Failure reference</td>\n        <td>\t{{selectedPaymentsStatus.failure_reference}}</td>\n      </tr>\n      <tr class=\"section\">\n        <td class=\"bold\">Failure reason</td>\n        <td>\t{{selectedPaymentsStatus.failure_reason}}</td>\n      </tr>\n      <tr class=\"section\">\n          <td class=\"bold\">Payment reference</td>\n          <td>{{ selectedPaymentsStatus.payment_reference }}</td>\n      </tr>\n      <tr class=\"section\">\n          <td class=\"bold\">Payment amount</td>\n          <td> \u00A3{{ paymentGroup?.payments[0]?.amount | number:'.2' }}</td>\n\n      </tr>\n      <tr class=\"section\">\n          <td class=\"bold\">Disputed amount</td>\n          <td>\t\u00A3{{selectedPaymentsStatus.disputed_amount  | number:'.2'}}</td>\n      </tr>\n      <tr class=\"section\">\n        <td class=\"bold\">Additional information</td>\n        <td>\t{{selectedPaymentsStatus.additional_reference }}</td>\n      </tr>\n      <tr class=\"section\">\n        <td class=\"bold\">Failure type</td>\n        <td>\t{{ selectedPaymentsStatus.failure_type }}</td>\n      </tr>\n      <tr class=\"section\">\n        <td class=\"bold\">Failure event date and time</td>\n        <td> {{ selectedPaymentsStatus.failure_event_date_time | date:'dd MMM yyyy HH:mm:ss' }}</td>\n      </tr>\n      <tr class=\"section\" *ngIf=\"selectedPaymentsStatus.has_amount_debited\">\n        <td class=\"bold\">Has disputed amount debited</td>\n        <td>\t{{selectedPaymentsStatus.has_amount_debited}}</td>\n      </tr>\n      <tr class=\"section\" *ngIf=\"selectedPaymentsStatus.representment_status\">\n        <td class=\"bold\">Status following representation of payment</td>\n        <td>\t{{(selectedPaymentsStatus.representment_status === 'Yes' || selectedPaymentsStatus.representment_status === 'yes') ? 'Success' : 'Failure'}}</td>\n      </tr>\n      <tr class=\"section\" *ngIf=\"selectedPaymentsStatus.representment_date\">\n        <td class=\"bold\">Date payment represented</td>\n        <td>\t{{selectedPaymentsStatus.representment_date  | date:'dd MMM yyyy HH:mm:ss'}}</td>\n      </tr>\n      </tbody>\n    </table>\n\n    <div>\n    </div>\n  </div>\n</ng-container>\n", styles: [".payment-view-section .tb-col-w{width:330px}.payment-view-section .tr-border{border-bottom:2px solid}.payment-view-section .payment-view-alignment{margin-left:30px}.payment-view-section .govuk-button{font-size:19px;float:left;margin-top:2em}.payment-view-section .remission{margin-bottom:7em}.payment-view-section .govuk-error-summary__title{font-size:24px!important}.payment-view-section .govuk-table__cell,.payment-view-section .govuk-table__header{padding:0;line-height:1.3;vertical-align:middle}.payment-view-section .govuk-table__row{line-height:1.3}.payment-view-section .govuk-table__cell:last-child{text-align:right}.payment-view-section .text-transform:first-letter{text-transform:capitalize}.payment-view-section .govuk-link{cursor:pointer}.payment-view-section .mar-17{font-size:19px!important}.over-payment .pagesize{margin:2em;width:97%}.over-payment .contactDetails-width{width:70%}.over-payment .margin-top10px{margin-top:20px}.over-payment .govuk-font19px{font-size:19px!important}.over-payment .margin-top--size{margin-top:-30px}.over-payment .over-payment-alignment{margin-right:10px}.over-payment .govuk-button{font-size:19px;float:left;margin-top:2em}.over-payment td.govuk-table__cell{width:50%}.over-payment .govuk-warning-text__text,.over-payment .govuk-label--s,.over-payment .hmcts-currency-input__symbol{font-size:19px;font-weight:400}.over-payment .inline-error-class{outline:3px solid #a71414;outline-offset:0;border-color:#a71414}.over-payment .inline-error-message{color:#a71414;border-color:#a71414;font-weight:700;margin-top:10px;font-size:20px}.over-payment .govuk-button-group{padding-top:2em}.over-payment .heading-medium{margin-top:.875em}.over-payment .heading-large{margin-top:.25em}.over-payment .govuk-panel--confirmation{color:#fff;background:#00703C}.over-payment .govuk-panel__title{font-size:5rem}.over-payment .govuk-body-m,.over-payment .govuk-body{font-size:2.1875rem}.over-payment .govuk-link{cursor:pointer}.over-payment .govuk-radios__conditional{padding-top:12px!important}.over-payment .right{float:right;cursor:pointer}.over-payment .radio{float:right}.over-payment .white{color:#fff}.whitespace-inherit{white-space:inherit!important}\n"] }]
    }], function () { return [{ type: i1.PaymentViewService }, { type: i2.NotificationService }, { type: i3.PaymentLibComponent }, { type: i0.ChangeDetectorRef }, { type: i4.OrderslistService }]; }, { isTurnOff: [{
            type: Input
        }], isTakePayment: [{
            type: Input
        }], caseType: [{
            type: Input
        }], orderRef: [{
            type: Input
        }], orderStatus: [{
            type: Input
        }], orderTotalPayments: [{
            type: Input
        }], payment: [{
            type: Input
        }], LOGGEDINUSERROLES: [{
            type: Input
        }], ISPAYMENTSTATUSENABLED: [{
            type: Input
        }], orderParty: [{
            type: Input
        }], orderCreated: [{
            type: Input
        }], orderCCDEvent: [{
            type: Input
        }], orderFeesTotal: [{
            type: Input
        }], orderRemissionTotal: [{
            type: Input
        }], orderDetail: [{
            type: Input
        }], isServiceRequest: [{
            type: Input,
            args: ["isServiceRequest"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9wYXltZW50LXZpZXcvcGF5bWVudC12aWV3LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9wYXltZW50LXZpZXcvcGF5bWVudC12aWV3LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBS2xFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRXJGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0lDRWxFLDJCQUEwQixjQUFBLGFBQUE7SUFHcEIsd0RBQ0Y7SUFBQSxpQkFBSztJQUNMLCtCQUF1QztJQUNyQyxZQUNGO0lBQUEsaUJBQU0sRUFBQSxFQUFBOzs7SUFESixlQUNGO0lBREUscURBQ0Y7OztJQTJCQSw4QkFBd0UsYUFBQTtJQUM1Qyw0QkFBWTtJQUFBLGlCQUFLO0lBQzNDLDhCQUFxQjtJQUFBLFlBQTBDOztJQUFBLGlCQUFLLEVBQUE7OztJQUEvQyxlQUEwQztJQUExQyw4RkFBMEM7OztJQUVqRSw4QkFBOEosYUFBQTtJQUNsSSx5Q0FBeUI7SUFBQSxpQkFBSztJQUN4RCw4QkFBcUI7SUFBQSxZQUF3RDtJQUFBLGlCQUFLLEVBQUE7OztJQUE3RCxlQUF3RDtJQUF4RCxzS0FBd0Q7OztJQUUvRSw4QkFBOEosYUFBQTtJQUNsSSwyQkFBVztJQUFBLGlCQUFLO0lBQzFDLDhCQUFxQjtJQUFBLFlBQWlFOztJQUFBLGlCQUFLLEVBQUE7OztJQUF0RSxlQUFpRTtJQUFqRSwrTEFBaUU7OztJQUV4Riw4QkFBdUcsYUFBQTtJQUMzRSxxQ0FBcUI7SUFBQSxpQkFBSztJQUNwRCw4QkFBcUI7SUFBQSxZQUFtRDtJQUFBLGlCQUFLLEVBQUE7OztJQUF4RCxlQUFtRDtJQUFuRCxpS0FBbUQ7OztJQVF0RSw4QkFBMEU7SUFBQSxzQkFBTTtJQUFBLGlCQUFLOzs7SUFDckYsOEJBQTBFO0lBQUEsb0JBQUk7SUFBQSxpQkFBSzs7O0lBSHZGLDhCQUF3RixhQUFBO0lBQzFELG9CQUFJO0lBQUEsaUJBQUs7SUFDbkMsK0ZBQXFGO0lBQ3JGLCtGQUFtRjtJQUN2RixpQkFBSzs7O0lBRnFCLGVBQWtEO0lBQWxELG1LQUFrRDtJQUNsRCxlQUFrRDtJQUFsRCxtS0FBa0Q7OztJQWU1RSw4QkFBMkYsYUFBQTtJQUM3RCxnQ0FBZ0I7SUFBQSxpQkFBSztJQUMvQyw4QkFBcUI7SUFBQSxZQUF5RTtJQUFBLGlCQUFLLEVBQUE7OztJQUE5RSxlQUF5RTtJQUF6RSw4UEFBeUU7OztJQUdoRywwQkFBd0QsYUFBQTtJQUM1QixnQ0FBZ0I7SUFBQSxpQkFBSztJQUMvQyw4QkFBcUI7SUFBQSxZQUFrRDtJQUFBLGlCQUFLLEVBQUE7OztJQUF2RCxlQUFrRDtJQUFsRCxnS0FBa0Q7OztJQUd6RSwwQkFBcUQsYUFBQTtJQUN6QiwwQkFBVTtJQUFBLGlCQUFLO0lBQ3pDLDhCQUFxQjtJQUFBLFlBQStDO0lBQUEsaUJBQUssRUFBQTs7O0lBQXBELGVBQStDO0lBQS9DLDZKQUErQzs7O0lBR3RFLDBCQUF5RCxhQUFBO0lBQzdCLDJDQUEyQjtJQUFBLGlCQUFLO0lBQzFELDhCQUFxQjtJQUFBLFlBQW1EO0lBQUEsaUJBQUssRUFBQTs7O0lBQXhELGVBQW1EO0lBQW5ELGlLQUFtRDs7O0lBUTlFLDZDQUEyRzs7O0lBQXpELHFEQUErQjs7OztJQXVCM0UsMEJBQStDLFNBQUE7SUFDekMsWUFBaUM7O0lBQUEsaUJBQUs7SUFDMUMsMEJBQUk7SUFBQSxZQUE0Qzs7SUFBQSxpQkFBSztJQUNyRCwwQkFBSTtJQUFBLFlBQW9IOztJQUFBLGlCQUFLO0lBQzdILDJCQUFJO0lBQUEsYUFBK0I7SUFBQSxpQkFBSztJQUN4QywyQkFBSztJQUFBLGFBQTBCO0lBQUEsaUJBQUs7SUFDcEMsMkJBQUksYUFBQTtJQUUyQixtUUFBUyxlQUFBLDBDQUE4QixDQUFBLElBQUM7SUFBQyw0QkFBVztJQUFBLGlCQUFJLEVBQUEsRUFBQTs7O0lBUG5GLGVBQWlDO0lBQWpDLDhEQUFpQztJQUNqQyxlQUE0QztJQUE1Qyw0RkFBNEM7SUFDNUMsZUFBb0g7SUFBcEgsaUtBQW9IO0lBQ3BILGVBQStCO0lBQS9CLG1EQUErQjtJQUM5QixlQUEwQjtJQUExQiw4Q0FBMEI7OztJQU5uQyw2QkFBMEQ7SUFDeEQsMkdBV0s7SUFDUCxpQkFBUTs7O0lBWmtCLGVBQXFCO0lBQXJCLG9EQUFxQjs7O0lBYS9DLDZCQUE0RCxTQUFBLGFBQUE7SUFFdkMsd0RBQXVDO0lBQUEsaUJBQUssRUFBQSxFQUFBOzs7SUFqQzNFLDJCQUFvQyxjQUFBLGFBQUE7SUFFSCx3Q0FBd0I7SUFBQSxpQkFBSyxFQUFBO0lBRzFELDJCQUFLLFlBQUEsWUFBQSxTQUFBLFNBQUE7SUFJUyxzQkFBTTtJQUFBLGlCQUFLO0lBQ2YsMkJBQUk7SUFBQSx1QkFBTTtJQUFBLGlCQUFLO0lBQ2YsMkJBQUk7SUFBQSxxQkFBSTtJQUFBLGlCQUFLO0lBQ2IsMkJBQUk7SUFBQSxrQ0FBaUI7SUFBQSxpQkFBSztJQUMxQiwyQkFBSTtJQUFBLHNCQUFLO0lBQUEsaUJBQUs7SUFDZCxzQkFBUztJQUNYLGlCQUFLLEVBQUE7SUFFUCx1R0FhUTtJQUNSLHVHQUlNO0lBQ1YsaUJBQVEsRUFBQTtJQUVWLHNCQUFLLFVBQUE7SUFFUCxpQkFBTTs7O0lBdkJVLGdCQUFnRDtJQUFoRCxpRkFBZ0Q7SUFjL0MsZUFBaUQ7SUFBakQsa0ZBQWlEOzs7SUFZOUQsMkJBQTJDLGNBQUE7SUFFdkMscUJBQUssU0FBQTtJQUVMLDhCQUEwQjtJQUFBLHlDQUF5QjtJQUFBLGlCQUFLLEVBQUEsRUFBQTs7OztJQXFCeEQsMEJBQWlDLGFBQUE7SUFDZ0QsZ0NBQWdCO0lBQUEsaUJBQUs7SUFDcEcsOEJBQStDO0lBQUEsWUFBMEM7O0lBQUEsaUJBQUssRUFBQTs7O0lBRDFELGVBQTBDO0lBQTFDLHlFQUEwQztJQUMxRSxlQUEwQztJQUExQyx5RUFBMEM7SUFBQyxlQUEwQztJQUExQyxrSEFBMEM7Ozs7SUFsQi9GLDJCQUEyQyxnQkFBQSxZQUFBLGFBQUEsYUFBQTtJQUlYLDJCQUFXO0lBQUEsaUJBQUs7SUFDMUMsOEJBQXFCO0lBQUEsWUFBcUM7SUFBQSxpQkFBSyxFQUFBO0lBRWpFLDhCQUFvQixhQUFBO0lBQ1EseUJBQVE7SUFBQSxpQkFBSztJQUN2QywrQkFBcUI7SUFBQSxhQUFlO0lBQUEsaUJBQUssRUFBQTtJQUUzQywrQkFBb0IsY0FBQTtJQUMyRiwyQkFBVTtJQUFBLGlCQUFLO0lBQzVILCtCQUFzRjtJQUFBLGFBQTJDOztJQUFBLGlCQUFLLEVBQUE7SUFHeEksd0dBR0s7SUFFTCxpQkFBUSxFQUFBO0lBRVYsbUNBQStIO0lBQXpFLDRQQUFTLGVBQUEsNkJBQWlCLENBQUEsSUFBQztJQUErQywrQkFBYTtJQUFBLGlCQUFTLEVBQUE7Ozs7SUFsQjdILGVBQXFDO0lBQXJDLGtFQUFxQztJQUlyQyxlQUFlO0lBQWYsMkRBQWU7SUFHVixlQUFrRjtJQUFsRiw2SEFBa0Y7SUFDeEcsZUFBaUY7SUFBakYsNkhBQWlGO0lBQUMsZUFBMkM7SUFBM0Msb0hBQTJDO0lBRzlILGVBQTBCO0lBQTFCLCtDQUEwQjtJQU96QixlQUE2QztJQUE3Qyx1RUFBNkM7Ozs7SUFnQnZELGlDQUFvRixhQUFBLGFBQUE7SUFFOUIsWUFBOEI7SUFBQSxpQkFBSztJQUNuRiw4QkFBaUQ7SUFBQSxZQUFvQztJQUFBLGlCQUFLO0lBQzFGLDhCQUFpRDtJQUFBLFlBQXlCO0lBQUEsaUJBQUs7SUFDL0UsOEJBQWlEO0lBQUEsWUFBbUU7O0lBQUEsaUJBQUs7SUFDekgsK0JBQTZELGtCQUFBO0lBQ0EscVFBQVMsZUFBQSw0REFBNEMsQ0FBQyw0Q0FBOEIsQ0FBQSxJQUFDO0lBQStDLDRCQUFVO0lBQUEsaUJBQVMsRUFBQSxFQUFBLEVBQUE7Ozs7SUFMcEssZUFBOEI7SUFBOUIsZ0ZBQThCO0lBQzdCLGVBQW9DO0lBQXBDLHNGQUFvQztJQUNwQyxlQUF5QjtJQUF6QiwyRUFBeUI7SUFDekIsZUFBbUU7SUFBbkUscUlBQW1FO0lBRXhHLGVBQWdEO0lBQWhELDBFQUFnRDs7O0lBU3JFLDJCQUFtRCxlQUFBO0lBQzFCLGdEQUFnQztJQUFBLGlCQUFPLEVBQUE7OztJQWxFOUQsMkJBQXlDO0lBQ3hDLGlHQU9NO0lBRU4sb0dBd0JNO0lBR0ksK0JBQXlCLGNBQUEsZ0JBQUEsZ0JBQUEsYUFBQSxhQUFBO0lBS3dDLGdEQUFnQztJQUFBLGlCQUFLO0lBQzFHLCtCQUFzRTtJQUFBLDBCQUFTO0lBQUEsaUJBQUs7SUFDcEYsK0JBQStEO0lBQUEsb0JBQUc7SUFBQSxpQkFBSztJQUN2RSwrQkFBK0Q7SUFBQSx1QkFBTTtJQUFBLGlCQUFLO0lBQzFFLDBCQUErRTtJQUNqRixpQkFBSyxFQUFBO0lBRVQsMEdBVVE7SUFHVixpQkFBUSxFQUFBLEVBQUE7SUFHVCxtR0FFTTtJQUVQLGlCQUFNOzs7SUFwRUssZUFBa0M7SUFBbEMsMkRBQWtDO0lBU3BCLGVBQW9CO0lBQXBCLG1EQUFvQjtJQXVDZSxnQkFBMEI7SUFBMUIseURBQTBCO0lBZ0IvRSxlQUEyQztJQUEzQyxzSEFBMkM7Ozs7SUF0TWhELCtCQUF1RjtJQUVyRixnQ0FBb0Y7SUFDcEYsK0JBQTRCLGNBQUEsYUFBQTtJQUV1QiwrQkFBZTtJQUFBLGlCQUFLLEVBQUEsRUFBQTtJQUd2RSw2QkFBTyxZQUFBLGFBQUEsY0FBQTtJQUl1QiwwQ0FBeUI7SUFBQSxpQkFBSztJQUN4RCwrQkFBcUI7SUFBQSxhQUF1QjtJQUFBLGlCQUFLLEVBQUE7SUFFbkQsK0JBQW9CLGNBQUE7SUFDUSxrQ0FBaUI7SUFBQSxpQkFBSztJQUNoRCwrQkFBcUI7SUFBQSxhQUEwQztJQUFBLGlCQUFLLEVBQUE7SUFFdEUsK0JBQW9CLGNBQUE7SUFDUSwrQkFBYztJQUFBLGlCQUFLO0lBQzdDLCtCQUFxQjtJQUFBLGFBQXNEOztJQUFBLGlCQUFLLEVBQUE7SUFFbEYsMkZBR0s7SUFDTCwyRkFHSztJQUNMLDJGQUdLO0lBQ0wsMkZBR0s7SUFDTCwrQkFBcUIsY0FBQTtJQUNTLCtCQUFjO0lBQUEsaUJBQUs7SUFDN0MsK0JBQW9DO0lBQUEsYUFBd0M7SUFBQSxpQkFBSyxFQUFBO0lBRXJGLDJGQUlLO0lBQ0wsK0JBQW9CLGNBQUE7SUFDVSx3QkFBTztJQUFBLGlCQUFLO0lBQ3RDLCtCQUFvQztJQUFBLGFBQXlDO0lBQUEsaUJBQUssRUFBQTtJQVd0RiwyRkFHTztJQUVMLDBGQUdLO0lBRUwsMEZBR0s7SUFFTCwwRkFHSztJQUVQLGlCQUFRLEVBQUE7SUFHViw0QkFBSztJQUVMLG1JQUEyRztJQUMzRyxpQkFBTTtJQUNQLGdDQUF1QixrQkFBQTtJQUN5RCxvTEFBUyxlQUFBLHlDQUF5QixDQUFBLElBQUM7SUFBOEMsNkJBQVk7SUFBQSxpQkFBUyxFQUFBO0lBRTNMLDZGQXdDUTtJQUVILDZGQXFFRztJQUNKLGlCQUFNOzs7SUE5THFCLGdCQUF1QjtJQUF2Qiw4Q0FBdUI7SUFJdkIsZUFBMEM7SUFBMUMsd0pBQTBDO0lBSTFDLGVBQXNEO0lBQXRELGtNQUFzRDtJQUV4RCxlQUFpRDtJQUFqRCxrS0FBaUQ7SUFJakQsZUFBdUk7SUFBdkksdVlBQXVJO0lBSXZJLGVBQXVJO0lBQXZJLHVZQUF1STtJQUl2SSxlQUFnRjtJQUFoRixnUEFBZ0Y7SUFNN0QsZUFBd0M7SUFBeEMscUpBQXdDO0lBRTNELGVBQWdFO0lBQWhFLGlMQUFnRTtJQU83QyxlQUF5QztJQUF6QyxzSkFBeUM7SUFXNUQsZUFBb0U7SUFBcEUscUxBQW9FO0lBS2xGLGVBQWlEO0lBQWpELCtHQUFpRDtJQUtqRCxlQUE4QztJQUE5Qyw0R0FBOEM7SUFLOUMsZUFBa0Q7SUFBbEQsZ0hBQWtEO0lBVWxDLGVBQXVCO0lBQXZCLGdEQUF1QjtJQUdyQyxlQUFrRTtJQUFsRSxxSUFBa0U7SUFFN0UsZUFBNEI7SUFBNUIscURBQTRCO0lBMEN0QixlQUFnQztJQUFoQyxpRUFBZ0M7Ozs7SUE3SjVDLDZCQUEyTDtJQUMzTCw4QkFBbUMsYUFBQSxZQUFBLFlBQUEsV0FBQTtJQUtFLDZLQUFTLGVBQUEsc0NBQThCLENBQUEsSUFBQztJQUF5QixvQkFBSTtJQUFBLGlCQUFJLEVBQUEsRUFBQSxFQUFBO0lBSzVHLCtCQUFxRjtJQUVuRixvRkFTTTtJQUVOLHNGQTJNTTtJQUNSLGlCQUFPLEVBQUE7SUFHVCwwQkFBZTs7O0lBMU5MLGVBQWtCO0lBQWxCLDBDQUFrQjtJQVdhLGVBQWdEO0lBQWhELHFIQUFnRDs7O0lBZ056Riw2QkFBcU07SUFDck0sMENBcUJnRTtJQUNoRSwwQkFBZTs7O0lBckJmLGVBQXVCO0lBQXZCLDRDQUF1QixxREFBQSxxQ0FBQSxxQkFBQSwyQkFBQSx1REFBQSxzREFBQSwrQ0FBQSw2QkFBQSxnRUFBQSxpQ0FBQSx1Q0FBQSx5Q0FBQSxpREFBQSxtREFBQSw2QkFBQSxxQ0FBQSxpQ0FBQSx1Q0FBQSxtQ0FBQSwrQ0FBQTs7O0lBdUJ2Qiw2QkFBZ047SUFFaE4sMENBc0JnRTtJQUNoRSwwQkFBZTs7O0lBdEJmLGVBQXVCO0lBQXZCLDRDQUF1QixxREFBQSxxQ0FBQSwyQkFBQSxtQ0FBQSx5Q0FBQSwrQ0FBQSw2QkFBQSxxQ0FBQSxnQ0FBQSxtQ0FBQSxnRUFBQSx1Q0FBQSx5Q0FBQSxpREFBQSxtREFBQSw2QkFBQSxxQ0FBQSxpQ0FBQSx1Q0FBQSxtQ0FBQSwrQ0FBQTs7O0lBd0J2Qiw2QkFBMkw7SUFDdkwsK0NBdUIwQztJQUU1QyxrQkFBQztJQUFBLGlCQUFzQjtJQUN6QiwwQkFBZTs7O0lBekJYLGVBQXVCO0lBQXZCLDRDQUF1QixxREFBQSw0Q0FBQSxxQ0FBQSx1REFBQSxzREFBQSwrQ0FBQSw2QkFBQSw2REFBQSwyREFBQSxnRUFBQSx1Q0FBQSx5Q0FBQSxpREFBQSxtREFBQSw2QkFBQSxxQ0FBQSxpQ0FBQSx1Q0FBQSxtQ0FBQSw0QkFBQSx1Q0FBQSwrQ0FBQTs7OztJQTBCM0IsNkJBQStMO0lBQzdMLGlEQWdCRDtJQURDLHFPQUFnQyxlQUFBLGdDQUF3QixDQUFBLElBQUM7SUFFM0QsaUJBQXdCO0lBRXhCLDBCQUFlOzs7SUFsQmIsZUFBMkI7SUFBM0IsOENBQTJCLDZCQUFBLG1DQUFBLHFDQUFBLGlDQUFBLHVDQUFBLG1DQUFBLCtDQUFBLHFDQUFBLHVDQUFBLHlDQUFBLGlEQUFBLG1EQUFBLDZDQUFBOzs7O0lBcUI3Qiw2QkFBdUQ7SUFDckQsZ0NBQWtGO0lBQ2xGLDhCQUEwQjtJQUFBLDRCQUFZO0lBQUEsaUJBQUs7SUFDM0MsOEJBQTJCO0lBQUEsWUFBK0M7O0lBQUEsaUJBQUs7SUFDL0UsZ0NBQTJFO0lBQ3pFLFlBQ0Y7SUFBQSxpQkFBTztJQUNULGdDQUE4QixvQkFBQSxrQkFBQSxjQUFBO0lBR0cseUNBQXdCO0lBQUEsaUJBQUssRUFBQTtJQUUxRCxnQ0FBcUQsZUFBQSxpQkFBQTtJQUVxQyw0S0FBUyxlQUFBLDJCQUFtQixJQUFJLENBQUMsQ0FBQSxJQUFDO0lBQXhILGlCQUFvSTtJQUNwSSxrQ0FBc0Y7SUFDcEYsYUFDRjs7SUFBQSxpQkFBUSxFQUFBO0lBRVYsZ0NBQWdDLGlCQUFBO0lBQ3dELDRLQUFTLGVBQUEsMkJBQW1CLElBQUksQ0FBQyxDQUFBLElBQUM7SUFBeEgsaUJBQW9JO0lBQ3BJLGtDQUF3RjtJQUN0RixhQUNGOztJQUFBLGlCQUFRLEVBQUEsRUFBQTtJQUdWLG1DQUNxQztJQUFyQyw2S0FBUyxlQUFBLGtDQUEwQixDQUFBLElBQUM7SUFBRSwwQkFBUTtJQUFBLGlCQUFTO0lBQ3ZELG1DQUlxQjtJQUhyQiw2S0FBUyxlQUFBLDZDQUE2QixDQUFBLElBQUM7SUFHakIsMEJBQVE7SUFBQSxpQkFBUyxFQUFBLEVBQUE7SUFHN0MsMEJBQWU7OztJQWhDYyxlQUErQztJQUEvQyx5RkFBK0M7SUFFeEUsZUFDRjtJQURFLG1MQUNGO0lBVVEsZ0JBQ0Y7SUFERSw2R0FDRjtJQUtFLGVBQ0Y7SUFERSw4TUFDRjtJQU9GLGVBQWtDO0lBQWxDLHVEQUFrQyw0SkFBQTs7OztJQU94Qyw2QkFBcUU7SUFDbkUsZ0NBQWdHO0lBQ2hHLDhCQUE0QjtJQUFBLDRCQUFZO0lBQUEsaUJBQUs7SUFDN0MsOEJBQTJDO0lBQUEsWUFBK0M7O0lBQUEsaUJBQUs7SUFDL0YsZ0NBQTRFO0lBQzFFLFlBQ0Y7SUFBQSxpQkFBTztJQUNULGtEQUd5RDtJQUR6RCxnT0FBd0IsZUFBQSxpQ0FBeUIsQ0FBQSxJQUFDLHFOQUN6QixlQUFBLHFDQUE2QixDQUFBLElBREo7SUFDTyxpQkFBd0I7SUFDakYsMEJBQUcsYUFBQTtJQUNJLDhLQUFTLGVBQUEsc0NBQThCLENBQUEsSUFBQztJQUN2Qyx5QkFDSjtJQUFBLGlCQUFJLEVBQUE7SUFFUiwwQkFBZTs7O0lBYjhCLGVBQStDO0lBQS9DLHlGQUErQztJQUV4RixlQUNGO0lBREUsbUxBQ0Y7SUFFRixlQUEyQjtJQUEzQixnREFBMkI7OztJQTRDbkIsK0JBQTJGLGFBQUE7SUFDakYscUJBQUs7SUFBQSxpQkFBUztJQUN0QixxQkFBSztJQUNMLFlBQ0Y7SUFBQSxpQkFBTTs7O0lBREosZUFDRjtJQURFLG1LQUNGOzs7SUFDQSwrQkFBNEYsYUFBQTtJQUNsRixvQkFBSTtJQUFBLGlCQUFTO0lBQ3JCLHFCQUFLO0lBQ0wsWUFDRjtJQUFBLGlCQUFNOzs7SUFESixlQUNGO0lBREUseXZCQUNGOzs7O0lBUUUsNkJBQXVIO0lBQXBDLDZLQUFTLGVBQUEsaUNBQXlCLENBQUEsSUFBQztJQUNwSCx5QkFDRjtJQUFBLGlCQUFJOzs7O0lBQ0osNkJBQXNIO0lBQXBDLDZLQUFTLGVBQUEsaUNBQXlCLENBQUEsSUFBQztJQUNuSCw4QkFDRjtJQUFBLGlCQUFJOzs7SUFLWiwrQ0FJa0U7OztJQUhsRSwwREFBb0MsNkNBQUEseUJBQUEsK0NBQUE7Ozs7SUE5RHRDLDZCQUFxRTtJQUNuRSxnQ0FBd0Y7SUFDeEYsK0JBQWdDLGFBQUE7SUFFRCxtQ0FBa0I7SUFBQSxpQkFBSyxFQUFBO0lBRXRELGlDQUEyQixhQUFBLGFBQUE7SUFFb0MsaUNBQWlCO0lBQUEsaUJBQUs7SUFDN0UsK0JBQThCO0lBQUMsYUFBdUM7SUFBQSxpQkFBSyxFQUFBO0lBRS9FLCtCQUE2QixjQUFBO0lBQzhCLCtCQUFjO0lBQUEsaUJBQUs7SUFDMUUsK0JBQThCO0lBQUEsYUFBNEU7O0lBQUEsaUJBQUssRUFBQTtJQUVuSCwrQkFBNkIsY0FBQTtJQUM4QiwyQkFBVTtJQUFBLGlCQUFLO0lBQ3RFLCtCQUE4QjtJQUFBLGFBQThFOztJQUFBLGlCQUFLLEVBQUE7SUFFckgsK0JBQTZCLGNBQUE7SUFDOEIsOEJBQWE7SUFBQSxpQkFBSztJQUN6RSwrQkFBOEI7SUFBQSxhQUFrRTs7SUFBQSxpQkFBSyxFQUFBO0lBRXpHLCtCQUE2QixjQUFBO0lBQzhCLDhCQUFhO0lBQUEsaUJBQUs7SUFDekUsK0JBQThCO0lBQUEsNkJBQVk7SUFBQSxpQkFBSyxFQUFBO0lBRW5ELCtCQUE2QixjQUFBO0lBQzRCLHdCQUFPO0lBQUEsaUJBQUs7SUFDbkUsK0JBQThCO0lBQUEsYUFBYztJQUFBLGlCQUFLLEVBQUE7SUFFckQsK0JBQTZCLGNBQUE7SUFDNEIseUJBQVE7SUFBQSxpQkFBSztJQUNwRSwrQkFBaUQ7SUFDL0MsdUZBSU07SUFDTix1RkFJTTtJQUNOLDhCQUEwRTtJQUF2RSx3S0FBUyxlQUFBLGtEQUFrQyxDQUFBLElBQUM7SUFBMkIsdUJBQU07SUFBQSxpQkFBSSxFQUFBLEVBQUE7SUFJeEYsK0JBQTZCLGNBQUE7SUFDNEIsNkJBQVk7SUFBQSxpQkFBSztJQUN4RSwrQkFBOEI7SUFBQSxhQUMxQjtJQUFBLG1GQUVJO0lBQ0osbUZBRUk7SUFDUixpQkFBSyxFQUFBLEVBQUE7SUFJVCxpSUFJa0U7SUFFbEUsbUNBQWdKO0lBQTdDLDZLQUFTLGVBQUEsa0RBQWtDLENBQUEsSUFBQztJQUFDLHlCQUFRO0lBQUEsaUJBQVM7SUFDakssbUNBRTBCO0lBQTFCLDZLQUFTLGVBQUEsdUJBQWUsQ0FBQSxJQUFDO0lBQ3ZCLGdDQUNGO0lBQUEsaUJBQVM7SUFDVCwwQkFBRyxhQUFBO0lBQytCLDhLQUFTLGVBQUEsc0NBQThCLENBQUEsSUFBQztJQUNsRSx5QkFDSjtJQUFBLGlCQUFJLEVBQUE7SUFHViwwQkFBZTs7O0lBdEUwQixnQkFBdUM7SUFBdkMsMEVBQXVDO0lBSXhDLGVBQTRFO0lBQTVFLHFIQUE0RTtJQUk1RSxlQUE4RTtJQUE5RSx1TUFBOEU7SUFJOUUsZUFBa0U7SUFBbEUsMkdBQWtFO0lBUXBFLGdCQUFjO0lBQWQsdUNBQWM7SUFLdEMsZUFBc0Q7SUFBdEQseUhBQXNEO0lBS3RELGVBQXVEO0lBQXZELDBIQUF1RDtJQVdqQyxlQUMxQjtJQUQwQiw4REFDMUI7SUFBSSxlQUEwQjtJQUExQixrREFBMEI7SUFHMUIsZUFBeUI7SUFBekIsaURBQXlCO0lBT1YsZUFBeUI7SUFBekIsaURBQXlCO0lBUXBELGVBQW9KO0lBQXBKLHlLQUFvSjs7OztJQVd0Siw2QkFBc007SUFDcE0sZ0NBQXVHO0lBQ3ZHLCtCQUFxQyxVQUFBLGNBQUEsYUFBQTtJQUk3QixrQ0FDRjtJQUFBLGlCQUFLO0lBRUwsK0JBQStCLFlBQUEsY0FBQTtJQUNPLGFBQXFDO0lBQUEsaUJBQVMsRUFBQSxFQUFBLEVBQUE7SUFJdEYsK0JBQTRCO0lBQUEsa0NBQWlCO0lBQUEsaUJBQUs7SUFDbEQsOEJBQXNCO0lBQ3BCLGFBQ0Y7O0lBQUEsaUJBQUk7SUFDTiw4QkFBc0IsYUFBQTtJQUNPLCtLQUFTLGVBQUEsc0NBQThCLENBQUEsSUFBQztJQUNuRSxpQ0FDSjtJQUFBLGlCQUFJLEVBQUEsRUFBQSxFQUFBO0lBS04sMEJBQWU7OztJQWhCK0IsZ0JBQXFDO0lBQXJDLHVFQUFxQztJQU0zRSxlQUNGO0lBREUsa01BQ0Y7OztJQThEQSw4QkFBc0UsYUFBQTtJQUNuRCwyQ0FBMkI7SUFBQSxpQkFBSztJQUNqRCwwQkFBSTtJQUFDLFlBQTZDO0lBQUEsaUJBQUssRUFBQTs7O0lBQWxELGVBQTZDO0lBQTdDLGtGQUE2Qzs7O0lBRXBELDhCQUF3RSxhQUFBO0lBQ3JELDBEQUEwQztJQUFBLGlCQUFLO0lBQ2hFLDBCQUFJO0lBQUMsWUFBNEk7SUFBQSxpQkFBSyxFQUFBOzs7SUFBakosZUFBNEk7SUFBNUksdUxBQTRJOzs7SUFFbkosOEJBQXNFLGFBQUE7SUFDbkQsd0NBQXdCO0lBQUEsaUJBQUs7SUFDOUMsMEJBQUk7SUFBQyxZQUE0RTs7SUFBQSxpQkFBSyxFQUFBOzs7SUFBakYsZUFBNEU7SUFBNUUsZ0lBQTRFOzs7O0lBNUR6Riw2QkFBdUQ7SUFDckQsK0JBQXVDLGFBQUEsWUFBQSxZQUFBLFdBQUE7SUFJRiw4S0FBUyxlQUFBLG1DQUEyQixDQUFBLElBQUM7SUFBeUIsb0JBQUk7SUFBQSxpQkFBSSxFQUFBLEVBQUEsRUFBQTtJQUl6RywrQkFBNEIsY0FBQSxhQUFBO0lBRXVCLHNDQUFxQjtJQUFBLGlCQUFLLEVBQUEsRUFBQTtJQUc3RSw4QkFBTyxhQUFBLGNBQUEsY0FBQTtJQUljLGtDQUFpQjtJQUFBLGlCQUFLO0lBQ3ZDLDJCQUFJO0lBQUMsYUFBNEM7SUFBQSxpQkFBSyxFQUFBO0lBRXhELCtCQUFvQixjQUFBO0lBQ0QsK0JBQWM7SUFBQSxpQkFBSztJQUNwQywyQkFBSTtJQUFDLGFBQXlDO0lBQUEsaUJBQUssRUFBQTtJQUVyRCwrQkFBb0IsY0FBQTtJQUNDLGtDQUFpQjtJQUFBLGlCQUFLO0lBQ3ZDLDJCQUFJO0lBQUEsYUFBOEM7SUFBQSxpQkFBSyxFQUFBO0lBRTNELCtCQUFvQixjQUFBO0lBQ0MsK0JBQWM7SUFBQSxpQkFBSztJQUNwQywyQkFBSTtJQUFDLGFBQXNEOztJQUFBLGlCQUFLLEVBQUE7SUFHcEUsK0JBQW9CLGNBQUE7SUFDQyxnQ0FBZTtJQUFBLGlCQUFLO0lBQ3JDLDJCQUFJO0lBQUMsYUFBMEQ7O0lBQUEsaUJBQUssRUFBQTtJQUV4RSwrQkFBb0IsY0FBQTtJQUNELHVDQUFzQjtJQUFBLGlCQUFLO0lBQzVDLDJCQUFJO0lBQUMsYUFBZ0Q7SUFBQSxpQkFBSyxFQUFBO0lBRTVELCtCQUFvQixjQUFBO0lBQ0QsNkJBQVk7SUFBQSxpQkFBSztJQUNsQywyQkFBSTtJQUFDLGFBQXlDO0lBQUEsaUJBQUssRUFBQTtJQUVyRCwrQkFBb0IsY0FBQTtJQUNELDRDQUEyQjtJQUFBLGlCQUFLO0lBQ2pELDJCQUFJO0lBQUMsYUFBa0Y7O0lBQUEsaUJBQUssRUFBQTtJQUU5RixzRkFHSztJQUNMLHNGQUdLO0lBQ0wsc0ZBR0s7SUFDTCxpQkFBUSxFQUFBO0lBR1YsdUJBQ007SUFDUixpQkFBTTtJQUNSLDBCQUFlOzs7SUFqREYsZ0JBQTRDO0lBQTVDLGdGQUE0QztJQUk1QyxlQUF5QztJQUF6Qyw2RUFBeUM7SUFJeEMsZUFBOEM7SUFBOUMscUVBQThDO0lBSTdDLGVBQXNEO0lBQXRELGdNQUFzRDtJQUt0RCxlQUEwRDtJQUExRCxrSEFBMEQ7SUFJNUQsZUFBZ0Q7SUFBaEQsbUZBQWdEO0lBSWhELGVBQXlDO0lBQXpDLDJFQUF5QztJQUl6QyxlQUFrRjtJQUFsRixxSUFBa0Y7SUFFcEUsZUFBK0M7SUFBL0MsdUVBQStDO0lBSS9DLGVBQWlEO0lBQWpELHlFQUFpRDtJQUlqRCxlQUErQztJQUEvQyx1RUFBK0M7O0FEcmlCMUUsTUFBTSxjQUFjLEdBQUcsdUJBQXVCLENBQUM7QUFZL0MsTUFBTSxPQUFPLG9CQUFvQjtJQXFEWDtJQUNWO0lBQ0E7SUFDQTtJQUNBO0lBeERELFNBQVMsQ0FBVTtJQUNuQixhQUFhLENBQVU7SUFDdkIsUUFBUSxDQUFVO0lBQ2xCLFFBQVEsQ0FBUztJQUNqQixXQUFXLENBQVM7SUFDcEIsa0JBQWtCLENBQVM7SUFDM0IsT0FBTyxDQUFXO0lBQ2xCLGlCQUFpQixDQUFXO0lBQzVCLHNCQUFzQixDQUFTO0lBQy9CLFVBQVUsQ0FBUztJQUNuQixZQUFZLENBQU87SUFDbkIsYUFBYSxDQUFTO0lBQ3RCLGNBQWMsQ0FBUztJQUN2QixtQkFBbUIsQ0FBUztJQUM1QixXQUFXLENBQVE7SUFDNUIsSUFBSSxDQUFNO0lBQ1YsYUFBYSxDQUFVO0lBQ0ksZ0JBQWdCLENBQVM7SUFDcEQsUUFBUSxDQUFTO0lBQ2pCLFlBQVksQ0FBZ0I7SUFDNUIsWUFBWSxDQUFTO0lBQ3JCLGFBQWEsQ0FBUztJQUN0QixjQUFjLENBQVM7SUFDdkIsU0FBUyxDQUFTO0lBQ2xCLGlCQUFpQixDQUFVO0lBQzNCLGlCQUFpQixDQUFVO0lBQzNCLEtBQUssQ0FBTztJQUNaLFVBQVUsQ0FBUztJQUNuQixpQkFBaUIsR0FBWSxLQUFLLENBQUM7SUFDbkMsb0JBQW9CLENBQVU7SUFDOUIsa0JBQWtCLEdBQVksS0FBSyxDQUFDO0lBQ3BDLHNCQUFzQixHQUFZLEtBQUssQ0FBQztJQUN4QywwQkFBMEIsR0FBRyxDQUFDLDBCQUEwQixFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDN0UsVUFBVSxHQUFpQixFQUFFLENBQUM7SUFDOUIsa0JBQWtCLEdBQXNCLEVBQUUsQ0FBQztJQUMzQyxzQkFBc0IsQ0FBa0I7SUFDeEMsZUFBZSxDQUFTO0lBQ3hCLDBCQUEwQixDQUFVO0lBQ3BDLGdCQUFnQixDQUFTO0lBQ3pCLHdCQUF3QixDQUFVO0lBQ2xDLHVCQUF1QixDQUFVO0lBQ2pDLFdBQVcsQ0FBUztJQUNwQixXQUFXLENBQVM7SUFDcEIscUJBQXFCLEdBQVksSUFBSSxDQUFDO0lBQ3RDLGNBQWMsQ0FBUztJQUN2QixpQkFBaUIsQ0FBdUI7SUFDeEMsWUFBWSxDQUFNO0lBQ2xCLHlCQUF5QixDQUFVO0lBQ25DLGVBQWUsQ0FBUztJQUN4QixZQUFZLENBQVM7SUFDckIsdUJBQXVCLENBQVM7SUFDaEMsbUJBQW1CLENBQVU7SUFDN0IsWUFBb0Isa0JBQXNDLEVBQ2hELG1CQUF3QyxFQUN4QyxtQkFBd0MsRUFDeEMsRUFBcUIsRUFDckIsaUJBQW9DO1FBSjFCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDaEQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDOUMsQ0FBQztJQUVELHFCQUFxQjtRQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFQSxRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDO1FBQzlELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQztRQUMvRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7UUFDckQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1FBQ3BELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUM7UUFDdkUsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUM7UUFDaEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsQ0FDckcsWUFBWSxDQUFDLEVBQUU7WUFDYixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztnQkFFL0IsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3BDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFO3dCQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO3dCQUM5QixHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxDQUFDO3dCQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNoQjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO29CQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7WUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRSxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7WUFFakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUMzRCxlQUFlLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUN4RyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO1lBQzNFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixLQUFLLFdBQVcsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1FBRXBKLENBQUMsRUFDRCxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQzFDLENBQUM7UUFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVGLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUVqRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO29CQUNqRSxJQUFHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTt3QkFDbkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQztxQkFDOUQ7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM5RCxDQUFDO1lBQ0QsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUE7WUFDL0IsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNGLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUM7SUFDekQsQ0FBQztJQUVELElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLFdBQVcsQ0FBQztJQUMvRCxDQUFDO0lBRU0sZUFBZTtRQUNwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsbUJBQW1CO1FBQ2pCLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkMsZUFBZSxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLGVBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO0lBRTVGLENBQUM7SUFDRCxzQkFBc0I7UUFDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQztRQUN4RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUM3QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUNqRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNELHNCQUFzQixDQUFDLEtBQVU7UUFDL0IsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsd0JBQXdCLEVBQUU7WUFDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEdBQUcsbUJBQW1CLENBQUM7WUFDeEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDM0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUMxRixJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDeEYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNyRixJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3RHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUM1RixJQUFJLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNyRyxJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDO1NBQ3JDO0lBRUgsQ0FBQztJQUVELFlBQVksQ0FBQyxHQUFTO1FBQ3BCLElBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQ25HLFlBQVksQ0FBQyxFQUFFO2dCQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO2dCQUVqQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQzNELGVBQWUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUN4RyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO2dCQUN4RCxJQUFJLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztnQkFDOUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUMxQixDQUFDLEVBQ0QsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUMxQyxDQUFDO1NBQ0Q7SUFDSCxDQUFDO0lBRUQsWUFBWSxDQUFDLFlBQWlCO1FBQzVCLElBQUcsWUFBWSxLQUFLLElBQUksSUFBSSxZQUFZLEtBQUssU0FBUyxFQUN0RDtZQUNFLElBQUksWUFBWSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksWUFBWSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQ2pFLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FFRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELGFBQWE7UUFDWCxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2dCQUNkLE9BQU8sRUFBQyxHQUFHLENBQUMsT0FBTztnQkFDbkIsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLGdCQUFnQjtnQkFDdEMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLGlCQUFpQjtnQkFDeEMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNO2dCQUNwRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07Z0JBQ2xCLGFBQWEsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0MsTUFBTSxXQUFXLEdBQUcsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUNuSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUM5RCxRQUFRLENBQUMsRUFBRTtZQUNQLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBSSxFQUFFLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsd0JBQXdCLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQzthQUN4RDtRQUNMLENBQUMsRUFDRCxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLHlCQUF5QixHQUFHLEtBQUssQ0FBQztZQUN2QyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELGVBQWUsQ0FBQyxJQUE0QjtRQUMxQyxJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFGO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRywyQkFBMkIsQ0FBQztJQUNwRCxDQUFDO0lBQ0QscUJBQXFCLENBQUMsT0FBaUIsRUFBRSxTQUF1QixFQUFDLElBQVE7UUFDMUUsZ0RBQWdEO1FBQzdDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUM3RSxZQUFZLENBQUMsRUFBRTtZQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1lBRWpDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDM0QsZUFBZSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQSxFQUFFLENBQUEsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBQ2xHLElBQUksQ0FBQyxVQUFVLEdBQUcsdUJBQXVCLENBQUM7WUFDMUMsOEVBQThFO1lBQzlFLHFKQUFxSjtRQUN2SixDQUFDLEVBQ0QsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUMxQyxDQUFDO1FBQ0gsR0FBRztJQUNKLENBQUM7SUFFRCx3QkFBd0I7UUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBSSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUM7SUFDbEMsQ0FBQztJQUNELFdBQVcsQ0FBQyxVQUF5QjtRQUNuQyxJQUFJLFVBQVUsS0FBSyxJQUFJLElBQUssVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUNwRCxJQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pELElBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFO29CQUMxQyxJQUFJLENBQUMsY0FBYyxHQUFJLGFBQWEsQ0FBQztpQkFDdEM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7b0JBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDO29CQUNoQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO29CQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO29CQUN4RCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO29CQUNwQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDO2lCQUN2QzthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBQ0QscUJBQXFCLENBQUMsT0FBZSxFQUFFLFVBQXdCO1FBQzdELElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZDLEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFO2dCQUNsQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO29CQUNsQyxPQUFPLFNBQVMsQ0FBQztpQkFDbEI7YUFDRjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQseUJBQXlCLENBQUMsT0FBaUI7UUFDekMsSUFBSSxPQUFPLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDN0MsT0FBTyxPQUFPLENBQUMsWUFBWSxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUE7U0FDckQ7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRUQsdUJBQXVCLENBQUMsU0FBcUI7UUFDM0MsSUFBSSxTQUFTLEtBQUssSUFBSSxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDakQsT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDO1NBQzdCO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVELDBCQUEwQixDQUFDLEdBQVM7UUFDbEMsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDckMsT0FBTyxHQUFHLENBQUMsYUFBYSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztTQUNsRDthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUE7U0FDYjtJQUNMLENBQUM7SUFDQyxrQkFBa0IsQ0FBQyxXQUFtQjtRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxlQUFlLENBQUMsVUFBeUI7UUFFdkMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMxQixJQUFJLENBQUMsY0FBYyxHQUFJLDJCQUEyQixDQUFDO1NBQ3BEO2FBQU0sSUFBRyxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQTtZQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztZQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQztZQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7WUFDeEQsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztZQUNwQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixDQUFDO1NBQ25GO0lBQ0gsQ0FBQztJQUNELHFCQUFxQixDQUFDLEtBQVk7UUFDaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUksYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxHQUF5QjtRQUN6QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDO1FBQzdCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGNBQWMsR0FBRywyQkFBMkIsQ0FBQztJQUVwRCxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxPQUFZO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7UUFDcEMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLE9BQU8sQ0FBQztJQUN0QyxDQUFDO0lBQ0QsbUJBQW1CLENBQUMsS0FBVTtRQUM1QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUM7SUFDbEMsQ0FBQztJQUVELDBCQUEwQixDQUFDLE9BQWlCO1FBRTFDLElBQUksT0FBTyxJQUFJLFNBQVMsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1lBQzNDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxVQUFVLENBQUM7U0FDM0M7YUFBSTtZQUNILElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsOEJBQThCLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekg7SUFFSCxDQUFDO0lBRUQsdUJBQXVCO1FBQ3JCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUVELHVCQUF1QjtRQUNyQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7OEVBdFhVLG9CQUFvQjs2REFBcEIsb0JBQW9CO1lDckJqQyw4QkFBa0M7WUFDbEMsd0ZBdU9lO1lBQ2Ysd0ZBdUJlO1lBRWYsd0ZBeUJlO1lBRWYsd0ZBMkJlO1lBQ2Ysd0ZBb0JlO1lBQ2YsaUJBQU07WUFDTiw4QkFBMEI7WUFDMUIseUZBbUNlO1lBRWYsd0ZBZ0JlO1lBRWYseUZBK0VlO1lBQ2YsMEZBMEJlO1lBQ2YsaUJBQU07WUFFTiwyRkFvRWU7O1lBdmpCQSxlQUEwSztZQUExSywyTUFBMEs7WUF3TzFLLGVBQW9MO1lBQXBMLHlOQUFvTDtZQXlCcEwsZUFBK0w7WUFBL0wsb09BQStMO1lBMkIvTCxlQUEwSztZQUExSywyTUFBMEs7WUE0QjFLLGVBQThLO1lBQTlLLCtNQUE4SztZQXVCOUssZUFBc0M7WUFBdEMsMkRBQXNDO1lBcUN0QyxlQUFvRDtZQUFwRCx5RUFBb0Q7WUFrQnBELGVBQW9EO1lBQXBELHlFQUFvRDtZQWdGcEQsZUFBcUw7WUFBckwsc05BQXFMO1lBNkJyTCxlQUFzQztZQUF0QywyREFBc0M7Ozt1RkQvZHhDLG9CQUFvQjtjQU5oQyxTQUFTOzJCQUNFLG9CQUFvQjt5TUFNckIsU0FBUztrQkFBakIsS0FBSztZQUNHLGFBQWE7a0JBQXJCLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxrQkFBa0I7a0JBQTFCLEtBQUs7WUFDRyxPQUFPO2tCQUFmLEtBQUs7WUFDRyxpQkFBaUI7a0JBQXpCLEtBQUs7WUFDRyxzQkFBc0I7a0JBQTlCLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0csWUFBWTtrQkFBcEIsS0FBSztZQUNHLGFBQWE7a0JBQXJCLEtBQUs7WUFDRyxjQUFjO2tCQUF0QixLQUFLO1lBQ0csbUJBQW1CO2tCQUEzQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUdxQixnQkFBZ0I7a0JBQTFDLEtBQUs7bUJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXltZW50Vmlld1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9wYXltZW50LXZpZXcvcGF5bWVudC12aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBQYXltZW50TGliQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcGF5bWVudC1saWIuY29tcG9uZW50JztcbmltcG9ydCB7IElQYXltZW50R3JvdXAgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lQYXltZW50R3JvdXAnO1xuaW1wb3J0IHsgSUZlZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSUZlZSc7XG5pbXBvcnQgeyBJUGF5bWVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVBheW1lbnQnO1xuaW1wb3J0IHsgSVJlbWlzc2lvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVJlbWlzc2lvbic7XG5pbXBvcnQgeyBQb3N0UmVmdW5kUmV0cm9SZW1pc3Npb24gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL1Bvc3RSZWZ1bmRSZXRyb1JlbWlzc2lvbic7XG5jb25zdCBCU19FTkFCTEVfRkxBRyA9ICdidWxrLXNjYW4tZW5hYmxpbmctZmUnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElQYXltZW50RmFpbHVyZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVBheW1lbnRGYWlsdXJlJztcbmltcG9ydCB7IE9yZGVyc2xpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvb3JkZXJzbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IElSZWZ1bmRDb250YWN0RGV0YWlscyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVJlZnVuZENvbnRhY3REZXRhaWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NwYXktcGF5bWVudC12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BheW1lbnQtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BheW1lbnQtdmlldy5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgUGF5bWVudFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpc1R1cm5PZmY6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzVGFrZVBheW1lbnQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNhc2VUeXBlOiBib29sZWFuO1xuICBASW5wdXQoKSBvcmRlclJlZjogc3RyaW5nO1xuICBASW5wdXQoKSBvcmRlclN0YXR1czogc3RyaW5nO1xuICBASW5wdXQoKSBvcmRlclRvdGFsUGF5bWVudHM6IG51bWJlcjtcbiAgQElucHV0KCkgcGF5bWVudDogSVBheW1lbnQ7XG4gIEBJbnB1dCgpIExPR0dFRElOVVNFUlJPTEVTOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgSVNQQVlNRU5UU1RBVFVTRU5BQkxFRDogc3RyaW5nO1xuICBASW5wdXQoKSBvcmRlclBhcnR5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9yZGVyQ3JlYXRlZDogRGF0ZTtcbiAgQElucHV0KCkgb3JkZXJDQ0RFdmVudDogc3RyaW5nO1xuICBASW5wdXQoKSBvcmRlckZlZXNUb3RhbDogbnVtYmVyO1xuICBASW5wdXQoKSBvcmRlclJlbWlzc2lvblRvdGFsOiBudW1iZXI7XG4gIEBJbnB1dCgpIG9yZGVyRGV0YWlsOiBhbnlbXTtcbiAgZmVlczogYW55O1xuICBpc0Z1bGx5UmVmdW5kOiBib29sZWFuO1xuICBASW5wdXQoXCJpc1NlcnZpY2VSZXF1ZXN0XCIpIGlzU2VydmljZVJlcXVlc3Q6IHN0cmluZztcbiAgZXJyb3JNc2c6IHN0cmluZztcbiAgcGF5bWVudEdyb3VwOiBJUGF5bWVudEdyb3VwO1xuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgY2NkQ2FzZU51bWJlcjogc3RyaW5nO1xuICBzZWxlY3RlZE9wdGlvbjogc3RyaW5nO1xuICBkY25OdW1iZXI6IHN0cmluZztcbiAgaXNTdGF0dXNBbGxvY2F0ZWQ6IGJvb2xlYW47XG4gIGlzUmVtaXNzaW9uc01hdGNoOiBib29sZWFuO1xuICBmZWVJZDogSUZlZTtcbiAgdmlld1N0YXR1czogc3RyaW5nO1xuICBpc1JlZnVuZFJlbWlzc2lvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1N0cmF0ZWdpY0ZpeEVuYWJsZTogYm9vbGVhbjtcbiAgaXNBZGRGZWVCdG5FbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGlzSXNzdWVSZWZ1bmZCdG5FbmFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgYWxsb3dlZFJvbGVzVG9BY2Nlc3NSZWZ1bmQgPSBbJ3BheW1lbnRzLXJlZnVuZC1hcHByb3ZlcicsICdwYXltZW50cy1yZWZ1bmQnXTtcbiAgcmVtaXNzaW9uczogSVJlbWlzc2lvbltdID0gW107XG4gIGFsbFBheW1lbnRzRmFpbHVyZTogSVBheW1lbnRGYWlsdXJlW10gPSBbXTtcbiAgc2VsZWN0ZWRQYXltZW50c1N0YXR1czogSVBheW1lbnRGYWlsdXJlO1xuICByZW1pc3Npb25GZWVBbXQ6IG51bWJlcjtcbiAgaXNSZWZ1bmRSZW1pc3Npb25CdG5FbmFibGU6IGJvb2xlYW47XG4gIHNlcnZpY2VSZWZlcmVuY2U6IHN0cmluZztcbiAgaXNGcm9tU2VydmljZVJlcXVlc3RQYWdlOiBib29sZWFuO1xuICBpc0Zyb21QYXltZW50RGV0YWlsUGFnZTogYm9vbGVhbjtcbiAgcGF5bWVudEZlZXM6IElGZWVbXTtcbiAgcGF5bWVudFR5cGU6IHN0cmluZztcbiAgaXNDb250aW51ZUJ0bkRpc2FibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgdmlld0NvbXBTdGF0dXM6IHN0cmluZztcbiAgY29udGFjdERldGFpbHNPYmo6IElSZWZ1bmRDb250YWN0RGV0YWlsc1xuICBub3RpZmljYXRpb246IGFueTtcbiAgaXNDb25maXJtYXRpb25CdG5EaXNhYmxlZDogYm9vbGVhbjtcbiAgcmVmdW5kUmVmZXJlbmNlOiBzdHJpbmc7XG4gIHJlZnVuZEFtb3VudDogc3RyaW5nO1xuICB0ZW1wbGF0ZUluc3RydWN0aW9uVHlwZTogc3RyaW5nO1xuICBub3RpZmljYXRpb25QcmV2aWV3OiBib29sZWFuO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBheW1lbnRWaWV3U2VydmljZTogUGF5bWVudFZpZXdTZXJ2aWNlLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHBheW1lbnRMaWJDb21wb25lbnQ6IFBheW1lbnRMaWJDb21wb25lbnQsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBPcmRlcnNsaXN0U2VydmljZTogT3JkZXJzbGlzdFNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jY2RDYXNlTnVtYmVyID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LkNDRF9DQVNFX05VTUJFUjtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlNFTEVDVEVEX09QVElPTjtcbiAgICB0aGlzLmRjbk51bWJlciA9IHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5EQ05fTlVNQkVSO1xuICAgIHRoaXMuaXNUdXJuT2ZmID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTVFVSTk9GRjtcbiAgICB0aGlzLnNlcnZpY2VSZWZlcmVuY2UgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQucGF5bWVudEdyb3VwUmVmZXJlbmNlO1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICdwYXltZW50dmlldyc7XG4gICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UuZ2V0QXBwb3J0aW9uUGF5bWVudERldGFpbHModGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRSZWZlcmVuY2UpLnN1YnNjcmliZShcbiAgICAgIHBheW1lbnRHcm91cCA9PiB7XG4gICAgICAgIGxldCBmZWVzID0gW107XG4gICAgICAgIHBheW1lbnRHcm91cC5mZWVzLmZvckVhY2goZmVlID0+IHtcbiAgICAgICAgICB0aGlzLmlzUmVtaXNzaW9uc01hdGNoID0gZmFsc2U7XG5cbiAgICAgICAgICBwYXltZW50R3JvdXAucmVtaXNzaW9ucy5mb3JFYWNoKHJlbSA9PiB7XG4gICAgICAgICAgICBpZiAocmVtLmZlZV9jb2RlID09PSBmZWUuY29kZSkge1xuICAgICAgICAgICAgICB0aGlzLmlzUmVtaXNzaW9uc01hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgZmVlWydyZW1pc3Npb25zJ10gPSByZW07XG4gICAgICAgICAgICAgIGZlZXMucHVzaChmZWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICghdGhpcy5pc1JlbWlzc2lvbnNNYXRjaCkge1xuICAgICAgICAgICAgZmVlcy5wdXNoKGZlZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGF5bWVudEdyb3VwLmZlZXMgPSBmZWVzXG4gICAgICAgIHRoaXMucGF5bWVudEZlZXMgPWZlZXM7XG4gICAgICAgIHRoaXMucGF5bWVudEdyb3VwID0gcGF5bWVudEdyb3VwO1xuXG4gICAgICAgIHRoaXMucGF5bWVudEdyb3VwLnBheW1lbnRzID0gdGhpcy5wYXltZW50R3JvdXAucGF5bWVudHMuZmlsdGVyXG4gICAgICAgICAgKHBheW1lbnRHcm91cE9iaiA9PiBwYXltZW50R3JvdXBPYmpbJ3JlZmVyZW5jZSddLmluY2x1ZGVzKHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5wYXltZW50UmVmZXJlbmNlKSk7XG4gICAgICAgIGNvbnN0IHBheW1lbnRBbGxvY2F0aW9uID0gdGhpcy5wYXltZW50R3JvdXAucGF5bWVudHNbMF0ucGF5bWVudF9hbGxvY2F0aW9uO1xuICAgICAgICB0aGlzLmlzU3RhdHVzQWxsb2NhdGVkID0gcGF5bWVudEFsbG9jYXRpb24ubGVuZ3RoID4gMCAmJiBwYXltZW50QWxsb2NhdGlvblswXS5hbGxvY2F0aW9uX3N0YXR1cyA9PT0gJ0FsbG9jYXRlZCcgfHwgcGF5bWVudEFsbG9jYXRpb24ubGVuZ3RoID09PSAwO1xuXG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3JcbiAgICApO1xuICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLmdldFBheW1lbnRGYWlsdXJlKHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5wYXltZW50UmVmZXJlbmNlKS5zdWJzY3JpYmUoe1xuICAgICAgIG5leHQ6IChyZXMpID0+IHtcbiAgICAgICAgSlNPTi5wYXJzZShyZXMpLnBheW1lbnRfZmFpbHVyZV9saXN0LnJldmVyc2UoKS5mb3JFYWNoKHBheW1lbnRzID0+IHtcblxuICAgICAgICAgdGhpcy5hbGxQYXltZW50c0ZhaWx1cmUucHVzaChwYXltZW50cy5wYXltZW50X2ZhaWx1cmVfaW5pdGlhdGVkKTtcbiAgICAgICAgIGlmKHBheW1lbnRzLnBheW1lbnRfZmFpbHVyZV9jbG9zZWQpIHtcbiAgICAgICAgICB0aGlzLmFsbFBheW1lbnRzRmFpbHVyZS5wdXNoKHBheW1lbnRzLnBheW1lbnRfZmFpbHVyZV9jbG9zZWQpO1xuICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hbGxQYXltZW50c0ZhaWx1cmUgPSB0aGlzLmFsbFBheW1lbnRzRmFpbHVyZS5yZXZlcnNlKCk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IChlKSA9PiB7XG4gICAgICAgdGhpcy5hbGxQYXltZW50c0ZhaWx1cmUgPSBbXTtcbiAgICAgICB0aGlzLmVycm9yTXNnID0gXCJTZXJ2ZXIgZXJyb3JcIlxuICAgICAgfVxuICB9KVxuICB9XG5cbiAgZ2V0IGlzQ2FyZFBheW1lbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGF5bWVudEdyb3VwLnBheW1lbnRzWzBdLm1ldGhvZCA9PT0gJ2NhcmQnO1xuICB9XG5cbiAgZ2V0IGlzVGVsZXBob255UGF5bWVudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYXltZW50R3JvdXAucGF5bWVudHNbMF0uY2hhbm5lbCA9PT0gJ3RlbGVwaG9ueSc7XG4gIH1cblxuICBwdWJsaWMgZ29Ub1BheW1lbnRMaXN0KCk6IHZvaWQge1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC52aWV3TmFtZSA9ICdwYXltZW50LWxpc3QnO1xuICB9XG4gIGdldE92ZXJQYXltZW50VmFsdWUoKSB7XG4gICAgbGV0IGZlZXNPdmVyUGF5bWVudCA9IDA7XG4gICAgdGhpcy5wYXltZW50R3JvdXAuZmVlcy5mb3JFYWNoKGZlZSA9PiB7XG4gICAgICBmZWVzT3ZlclBheW1lbnQgKz0gZmVlLm92ZXJfcGF5bWVudDtcbiAgICB9KTtcbiAgICByZXR1cm4gZmVlc092ZXJQYXltZW50ID4gMCA/IGZlZXNPdmVyUGF5bWVudCA6IHRoaXMucGF5bWVudEdyb3VwLnBheW1lbnRzWzBdLm92ZXJfcGF5bWVudDtcblxuICB9XG4gIGdvVG9TZXJ2aWNlUmVxdWVzdFBhZ2UoKSB7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ2Nhc2UtdHJhbnNhY3Rpb25zJztcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPSBmYWxzZTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuU0VSVklDRVJFUVVFU1QgPSAndHJ1ZSc7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZSA9IHRydWU7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG4gIGdvVG9DYXNlVHJhbnNhdGlvblBhZ2UoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCF0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNGcm9tU2VydmljZVJlcXVlc3RQYWdlKSB7XG4gICAgICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0bmF2aWdhdGlvblBhZ2UoJ2Nhc2V0cmFuc2FjdGlvbnMnKTtcbiAgICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRpc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2UoZmFsc2UpO1xuICAgICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAnY2FzZS10cmFuc2FjdGlvbnMnO1xuICAgICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNCU0VOQUJMRSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzZXRPcmRlckRhdGEoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRvcmRlclJlZnMoKS5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMub3JkZXJSZWYgPSBkYXRhKTtcbiAgICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2UuZ2V0b3JkZXJDQ0RFdmVudHMoKS5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMub3JkZXJDQ0RFdmVudCA9IGRhdGEpO1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRvcmRlckNyZWF0ZWRzKCkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLm9yZGVyQ3JlYXRlZCA9IGRhdGEpO1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRvcmRlckRldGFpbCgpLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5vcmRlckRldGFpbCA9IGRhdGEpO1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRvcmRlclBhcnR5cygpLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5vcmRlclBhcnR5ID0gZGF0YSk7XG4gICAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLmdldG9yZGVyUmVtaXNzaW9uVG90YWxzKCkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLm9yZGVyUmVtaXNzaW9uVG90YWwgPSBkYXRhKTtcbiAgICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2UuZ2V0b3JkZXJGZWVzVG90YWxzKCkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLm9yZGVyRmVlc1RvdGFsID0gZGF0YSk7XG4gICAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLmdldG9vcmRlclRvdGFsUGF5bWVudHNzKCkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLm9yZGVyVG90YWxQYXltZW50cyA9IGRhdGEpO1xuICAgICAgdGhpcy52aWV3U3RhdHVzID0gJ29yZGVyLWZ1bGwtdmlldyc7XG4gICAgfVxuXG4gIH1cblxuICBhZGRSZW1pc3Npb24oZmVlOiBJRmVlKSB7XG4gICAgaWYodGhpcy5jaGtJc0FkZFJlbWlzc2lvbkJ0bkVuYWJsZShmZWUpKSB7XG4gICAgdGhpcy5mZWVJZCA9IGZlZTtcbiAgICB0aGlzLnBheW1lbnRWaWV3U2VydmljZS5nZXRBcHBvcnRpb25QYXltZW50RGV0YWlscyh0aGlzLnBheW1lbnRHcm91cC5wYXltZW50c1swXS5yZWZlcmVuY2UpLnN1YnNjcmliZShcbiAgICAgIHBheW1lbnRHcm91cCA9PiB7XG4gICAgICAgIHRoaXMucGF5bWVudEdyb3VwID0gcGF5bWVudEdyb3VwO1xuXG4gICAgICAgIHRoaXMucGF5bWVudEdyb3VwLnBheW1lbnRzID0gdGhpcy5wYXltZW50R3JvdXAucGF5bWVudHMuZmlsdGVyXG4gICAgICAgICAgKHBheW1lbnRHcm91cE9iaiA9PiBwYXltZW50R3JvdXBPYmpbJ3JlZmVyZW5jZSddLmluY2x1ZGVzKHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5wYXltZW50UmVmZXJlbmNlKSk7XG4gICAgICAgIHRoaXMucGF5bWVudCA9IHRoaXMucGF5bWVudEdyb3VwLnBheW1lbnRzWzBdO1xuICAgICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNGcm9tUGF5bWVudERldGFpbFBhZ2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnZpZXdTdGF0dXMgPSAnYWRkcmVtaXNzaW9uJztcbiAgICAgICAgdGhpcy5pc1JlZnVuZFJlbWlzc2lvbiA9IHRydWU7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSxcbiAgICAgIChlcnJvcjogYW55KSA9PiB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yXG4gICAgKTtcbiAgICB9XG4gIH1cblxuICBjaGVja0ZvckZlZXMocGF5bWVudEdyb3VwOiBhbnkpIHtcbiAgICBpZihwYXltZW50R3JvdXAgIT09IG51bGwgJiYgcGF5bWVudEdyb3VwICE9PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgaWYgKHBheW1lbnRHcm91cC5mZWVzICE9PSBudWxsICYmIHBheW1lbnRHcm91cC5mZWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHByb2Nlc3NSZWZ1bmQoKSB7XG4gICAgdGhpcy5pc0NvbmZpcm1hdGlvbkJ0bkRpc2FibGVkID0gdHJ1ZTtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgIGNvbnN0IG9iaiA9IHRoaXMucGF5bWVudEdyb3VwLmZlZXNbMF07XG4gICAgdGhpcy5mZWVzICA9IFt7IGlkOiBvYmouaWQsIFxuICAgICAgY29kZTogb2JqLmNvZGUsXG4gICAgICB2ZXJzaW9uOm9iai52ZXJzaW9uLCBcbiAgICAgIGFwcG9ydGlvbl9hbW91bnQ6IG9iai5hcHBvcnRpb25fYW1vdW50LFxuICAgICAgY2FsY3VsYXRlZF9hbW91bnQ6IG9iai5jYWxjdWxhdGVkX2Ftb3VudCxcbiAgICAgIHVwZGF0ZWRfdm9sdW1lOiBvYmoudXBkYXRlZF92b2x1bWUgPyBvYmoudXBkYXRlZF92b2x1bWUgOiBvYmoudm9sdW1lLFxuICAgICAgdm9sdW1lOiBvYmoudm9sdW1lLFxuICAgICAgcmVmdW5kX2Ftb3VudDogdGhpcy5nZXRPdmVyUGF5bWVudFZhbHVlKCkgfV07XG4gICAgY29uc3QgcmVxdWVzdEJvZHkgPSBuZXcgUG9zdFJlZnVuZFJldHJvUmVtaXNzaW9uKHRoaXMuY29udGFjdERldGFpbHNPYmosdGhpcy5mZWVzLCB0aGlzLnBheW1lbnRHcm91cC5wYXltZW50c1swXS5yZWZlcmVuY2UsICdSUjAzNycsIFxuICAgIHRoaXMuZ2V0T3ZlclBheW1lbnRWYWx1ZSgpLCAnb3AnKTtcbiAgICB0aGlzLnBheW1lbnRWaWV3U2VydmljZS5wb3N0UmVmdW5kc1JlYXNvbihyZXF1ZXN0Qm9keSkuc3Vic2NyaWJlKFxuICAgICAgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGlmIChKU09OLnBhcnNlKHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgdGhpcy52aWV3Q29tcFN0YXR1cyAgPSAnJztcbiAgICAgICAgICAgIHRoaXMudmlld1N0YXR1cyA9ICdyZWZ1bmRjb25maXJtYXRpb25wYWdlJztcbiAgICAgICAgICAgIHRoaXMucmVmdW5kUmVmZXJlbmNlID0gSlNPTi5wYXJzZShyZXNwb25zZSkucmVmdW5kX3JlZmVyZW5jZTtcbiAgICAgICAgICAgIHRoaXMucmVmdW5kQW1vdW50ID0gSlNPTi5wYXJzZShyZXNwb25zZSkucmVmdW5kX2Ftb3VudDtcbiAgICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgICAgdGhpcy5pc0NvbmZpcm1hdGlvbkJ0bkRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgfVxuICBnb3RvQWRkcmVzc1BhZ2Uobm90ZT86IElSZWZ1bmRDb250YWN0RGV0YWlscykge1xuICAgIGlmIChub3RlKSB7XG4gICAgICB0aGlzLm5vdGlmaWNhdGlvbiA9IHsgY29udGFjdF9kZXRhaWxzOiBub3RlLCBub3RpZmljYXRpb25fdHlwZTogbm90ZS5ub3RpZmljYXRpb25fdHlwZSB9O1xuICAgIH1cbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgIHRoaXMudmlld0NvbXBTdGF0dXMgPSAnb3ZlclBheW1lbnRBZGRyZXNzQ2FwdHVyZSc7XG4gIH1cbiAgYWRkUmVmdW5kRm9yUmVtaXNzaW9uKHBheW1lbnQ6IElQYXltZW50LCByZW1pc3Npb246IElSZW1pc3Npb25bXSxmZWVzOmFueSkge1xuIC8vaWYoIXRoaXMuY2hrSXNJc3N1ZVJlZnVuZEJ0bkVuYWJsZShwYXltZW50KSkge1xuICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLmdldEFwcG9ydGlvblBheW1lbnREZXRhaWxzKHBheW1lbnQucmVmZXJlbmNlKS5zdWJzY3JpYmUoXG4gICAgICBwYXltZW50R3JvdXAgPT4ge1xuICAgICAgICB0aGlzLnBheW1lbnRHcm91cCA9IHBheW1lbnRHcm91cDtcblxuICAgICAgICB0aGlzLnBheW1lbnRHcm91cC5wYXltZW50cyA9IHRoaXMucGF5bWVudEdyb3VwLnBheW1lbnRzLmZpbHRlclxuICAgICAgICAgIChwYXltZW50R3JvdXBPYmogPT4gcGF5bWVudEdyb3VwT2JqWydyZWZlcmVuY2UnXS5pbmNsdWRlcyhwYXltZW50LnJlZmVyZW5jZSkpO1xuICAgICAgICB0aGlzLnBheW1lbnQgPSB0aGlzLnBheW1lbnRHcm91cC5wYXltZW50c1swXTtcbiAgICAgICAgdGhpcy5yZW1pc3Npb25zID0gcmVtaXNzaW9uO1xuICAgICAgICB0aGlzLnJlbWlzc2lvbkZlZUFtdCA9IGZlZXMuZmlsdGVyKGRhdGE9PmRhdGEuY29kZSA9PT0gdGhpcy5yZW1pc3Npb25zWydmZWVfY29kZSddKVswXS5uZXRfYW1vdW50O1xuICAgICAgICB0aGlzLnZpZXdTdGF0dXMgPSAnYWRkcmVmdW5kZm9ycmVtaXNzaW9uJztcbiAgICAgICAgLy8gY29uc3QgcGF5bWVudEFsbG9jYXRpb24gPSB0aGlzLnBheW1lbnRHcm91cC5wYXltZW50c1swXS5wYXltZW50X2FsbG9jYXRpb247XG4gICAgICAgIC8vIHRoaXMuaXNTdGF0dXNBbGxvY2F0ZWQgPSBwYXltZW50QWxsb2NhdGlvbi5sZW5ndGggPiAwICYmIHBheW1lbnRBbGxvY2F0aW9uWzBdLmFsbG9jYXRpb25fc3RhdHVzID09PSAnQWxsb2NhdGVkJyB8fCBwYXltZW50QWxsb2NhdGlvbi5sZW5ndGggPT09IDA7XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3JcbiAgICApO1xuICAgLy99XG4gIH1cblxuICBnb1RvUGF5bWVudFZpZXdDb21wb25lbnQoKSB7XG4gICAgdGhpcy52aWV3Q29tcFN0YXR1cyAgPSAnJztcbiAgICB0aGlzLnZpZXdTdGF0dXMgPSAncGF5bWVudHZpZXcnO1xuICB9XG4gIGlzc3VlUmVmdW5kKHBheW1lbnRncnA6IElQYXltZW50R3JvdXApIHtcbiAgICBpZiAocGF5bWVudGdycCAhPT0gbnVsbCAmJiAgcGF5bWVudGdycCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZih0aGlzLmNoa0lzSXNzdWVSZWZ1bmRCdG5FbmFibGUocGF5bWVudGdycC5wYXltZW50c1swXSkpIHtcbiAgICAgICAgaWYocGF5bWVudGdycC5wYXltZW50c1swXS5vdmVyX3BheW1lbnQgPiAwKSB7XG4gICAgICAgICAgdGhpcy52aWV3Q29tcFN0YXR1cyAgPSAnb3ZlcnBheW1lbnQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGF5bWVudEdyb3VwID0gcGF5bWVudGdycDtcbiAgICAgICAgICB0aGlzLnZpZXdTdGF0dXMgPSAnaXNzdWVyZWZ1bmQnO1xuICAgICAgICAgIHRoaXMuaXNSZWZ1bmRSZW1pc3Npb24gPSB0cnVlO1xuICAgICAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc0Zyb21QYXltZW50RGV0YWlsUGFnZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5pc0Zyb21QYXltZW50RGV0YWlsUGFnZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5pc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2UgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXRSZW1pc3Npb25CeUZlZUNvZGUoZmVlQ29kZTogc3RyaW5nLCByZW1pc3Npb25zOiBJUmVtaXNzaW9uW10pOiBJUmVtaXNzaW9uIHtcbiAgICBpZiAocmVtaXNzaW9ucyAmJiByZW1pc3Npb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3QgcmVtaXNzaW9uIG9mIHJlbWlzc2lvbnMpIHtcbiAgICAgICAgaWYgKHJlbWlzc2lvbi5mZWVfY29kZSA9PT0gZmVlQ29kZSkge1xuICAgICAgICAgIHJldHVybiByZW1pc3Npb247XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjaGtJc0lzc3VlUmVmdW5kQnRuRW5hYmxlKHBheW1lbnQ6IElQYXltZW50KTogYm9vbGVhbiB7XG4gICAgaWYgKHBheW1lbnQgIT09IG51bGwgJiYgcGF5bWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcGF5bWVudC5pc3N1ZV9yZWZ1bmQgJiYgcGF5bWVudC5yZWZ1bmRfZW5hYmxlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjaGtJc0FkZFJlZnVuZEJ0bkVuYWJsZShyZW1pc3Npb246IElSZW1pc3Npb24pOiBib29sZWFuIHtcbiAgICBpZiAocmVtaXNzaW9uICE9PSBudWxsICYmIHJlbWlzc2lvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmVtaXNzaW9uLmFkZF9yZWZ1bmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjaGtJc0FkZFJlbWlzc2lvbkJ0bkVuYWJsZShmZWU6IElGZWUpOiBib29sZWFuIHtcbiAgICBpZiAoZmVlICE9PSBudWxsICYmIGZlZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmVlLmFkZF9yZW1pc3Npb24gJiYgZmVlLnJlbWlzc2lvbl9lbmFibGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn1cbiAgc2VsZWN0UHltZW50T3B0aW9uKHBheW1lbnRUeXBlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnBheW1lbnRUeXBlID0gcGF5bWVudFR5cGU7XG4gICAgdGhpcy5pc0NvbnRpbnVlQnRuRGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBjb250aW51ZVBheW1lbnQocGF5bWVudGdycDogSVBheW1lbnRHcm91cCkge1xuICAgIFxuICAgIGlmICh0aGlzLnBheW1lbnRUeXBlID09PSAnb3AnKSB7XG4gICAgICB0aGlzLmlzRnVsbHlSZWZ1bmQgPSBmYWxzZVxuICAgICAgdGhpcy52aWV3Q29tcFN0YXR1cyAgPSAnb3ZlclBheW1lbnRBZGRyZXNzQ2FwdHVyZSc7XG4gICAgfSBlbHNlIGlmKHRoaXMucGF5bWVudFR5cGUgPT09ICdmcCcpIHtcbiAgICAgIHRoaXMuaXNGdWxseVJlZnVuZCA9IHRydWVcbiAgICAgIHRoaXMucGF5bWVudEdyb3VwID0gcGF5bWVudGdycDtcbiAgICAgIHRoaXMudmlld1N0YXR1cyA9ICdpc3N1ZXJlZnVuZCc7XG4gICAgICB0aGlzLnZpZXdDb21wU3RhdHVzID0gXCJcIjtcbiAgICAgIHRoaXMuaXNSZWZ1bmRSZW1pc3Npb24gPSB0cnVlO1xuICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzRnJvbVBheW1lbnREZXRhaWxQYWdlID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNGcm9tUGF5bWVudERldGFpbFBhZ2UgPSB0cnVlO1xuICAgICAgdGhpcy5pc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2UgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNGcm9tU2VydmljZVJlcXVlc3RQYWdlO1xuICAgIH1cbiAgfVxuICBnb3RvUGF5bWVudFNlbGVjdFBhZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnZpZXdDb21wU3RhdHVzICA9ICdvdmVycGF5bWVudCc7XG4gIH1cbiAgZ2V0Q29udGFjdERldGFpbHMob2JqOklSZWZ1bmRDb250YWN0RGV0YWlscykge1xuICAgIHRoaXMuY29udGFjdERldGFpbHNPYmogPSBvYmo7XG4gICAgdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3ID0gZmFsc2U7XG4gICAgdGhpcy5nZXRUZW1wbGF0ZUluc3RydWN0aW9uVHlwZSh0aGlzLnBheW1lbnRHcm91cC5wYXltZW50c1swXSk7XG4gICAgdGhpcy52aWV3Q29tcFN0YXR1cyA9ICdvdmVycGF5bWVudGNoZWNrYW5kYW5zd2VyJztcbiAgICBcbiAgfVxuXG4gIHJlc2V0T3JkZXJEYXRhKCkge1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0T3JkZXJSZWYobnVsbCk7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRvcmRlckNDREV2ZW50KG51bGwpO1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0b3JkZXJDcmVhdGVkKG51bGwpO1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0b3JkZXJEZXRhaWwobnVsbCk7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRvcmRlclBhcnR5KG51bGwpO1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0b3JkZXJUb3RhbFBheW1lbnRzKG51bGwpO1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0b3JkZXJSZW1pc3Npb25Ub3RhbChudWxsKTtcbiAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldG9yZGVyRmVlc1RvdGFsKG51bGwpO1xuICB9XG5cbiAgZ29Ub1BheW1lbnRGYWlsdWVQYWdlKHBheW1lbnQ6IGFueSkge1xuICB0aGlzLnZpZXdTdGF0dXMgPSAncGF5bWVudC1mYWlsdXJlJztcbiAgdGhpcy5zZWxlY3RlZFBheW1lbnRzU3RhdHVzID0gcGF5bWVudDtcbiAgfVxuICBnb0JhY2tUb1BheW1lbnRWaWV3KGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICdwYXltZW50dmlldyc7XG4gIH1cblxuICBnZXRUZW1wbGF0ZUluc3RydWN0aW9uVHlwZShwYXltZW50OiBJUGF5bWVudCk6IHZvaWQge1xuXG4gICAgaWYgKHBheW1lbnQgPT0gdW5kZWZpbmVkIHx8IHBheW1lbnQgPT0gbnVsbCkge1xuICAgICAgdGhpcy50ZW1wbGF0ZUluc3RydWN0aW9uVHlwZSA9ICdUZW1wbGF0ZSc7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLnRlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlID0gdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmdldE5vdGlmaWNhdGlvbkluc3RydWN0aW9uVHlwZShwYXltZW50LmNoYW5uZWwsIHBheW1lbnQubWV0aG9kKTtcbiAgICB9XG4gICAgIFxuICB9XG5cbiAgc2hvd05vdGlmaWNhdGlvblByZXZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3ID0gdHJ1ZTtcbiAgfVxuXG4gIGhpZGVOb3RpZmljYXRpb25QcmV2aWV3KCk6IHZvaWQge1xuICAgIHRoaXMubm90aWZpY2F0aW9uUHJldmlldyA9IGZhbHNlO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwicGF5bWVudC12aWV3LXNlY3Rpb25cIj5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3U3RhdHVzID09PSAncGF5bWVudHZpZXcnICYmIHZpZXdDb21wU3RhdHVzICE9PSAnb3ZlcnBheW1lbnQnICYmIHZpZXdDb21wU3RhdHVzICE9PSAnb3ZlclBheW1lbnRBZGRyZXNzQ2FwdHVyZScgJiYgdmlld0NvbXBTdGF0dXMgIT09ICdvdmVycGF5bWVudGNoZWNrYW5kYW5zd2VyJ1wiPlxuPGRpdiBjbGFzcz1cImdvdnVrLXdpZHRoLWNvbnRhaW5lclwiPlxuXG4gIDxkaXYgIGNsYXNzPVwiZ292dWstYnJlYWRjcnVtYnNcIj5cbiAgICA8b2wgY2xhc3M9XCJnb3Z1ay1icmVhZGNydW1ic19fbGlzdFwiPlxuICAgICAgPGxpIGNsYXNzPVwiZ292dWstYnJlYWRjcnVtYnNfX2xpc3QtaXRlbVwiPlxuICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cImdvVG9DYXNlVHJhbnNhdGlvblBhZ2UoJGV2ZW50KVwiIGNsYXNzPVwiZ292dWstYmFjay1saW5rXCI+QmFjazwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC9vbD5cbiAgPC9kaXY+XG5cbiAgPG1haW4gY2xhc3M9XCJnb3Z1ay1tYWluLXdyYXBwZXIgZ292dWstIS1wYWRkaW5nLXRvcC0wXCIgaWQ9XCJtYWluLWNvbnRlbnRcIiByb2xlPVwibWFpblwiPlxuXG4gICAgPGRpdiAqbmdJZj1cImVycm9yTWVzc2FnZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXN1bW1hcnlcIiByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsbGVkYnk9XCJmYWlsdXJlLWVycm9yLXN1bW1hcnktaGVhZGluZ1wiIHRhYmluZGV4PVwiLTFcIj5cbiAgICAgICAgPGgyIGNsYXNzPVwiaGVhZGluZy1tZWRpdW0gZXJyb3Itc3VtbWFyeS1oZWFkaW5nXCIgaWQ9XCJmYWlsdXJlLWVycm9yLXN1bW1hcnktaGVhZGluZ1wiPlxuICAgICAgICAgIFBheW1lbnQgZGV0YWlscyBjb3VsZCBub3QgYmUgcmV0cmlldmVkXG4gICAgICAgIDwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X19ib2R5XCI+XG4gICAgICAgICAge3sgZXJyb3JNZXNzYWdlIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicGF5bWVudC12aWV3LWFsaWdubWVudFwiICpuZ0lmPVwiIWVycm9yTWVzc2FnZSAmJiBwYXltZW50R3JvdXA/LnBheW1lbnRzWzBdXCI+XG5cbiAgICAgIDxpbnB1dCAjbXlJbnB1dCB0eXBlPSdoaWRkZW4nIGNsYXNzPSdpRnJhbWVEcml2ZW5JbWFnZVZhbHVlJyB2YWx1ZT0nUEFZTUVOVERFVEFJTFMnPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLWxhcmdlIGdvdnVrLSEtbWFyZ2luLXRvcC0wXCI+UGF5bWVudCBkZXRhaWxzPC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDx0YWJsZT5cbiAgICAgICAgPHRib2R5PlxuXG4gICAgICAgIDx0ciBjbGFzcz1cInNlY3Rpb25cIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+U2VydmljZSByZXF1ZXN0IHJlZmVyZW5jZTwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwidGItY29sLXdcIj57eyBzZXJ2aWNlUmVmZXJlbmNlICB9fTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ciBjbGFzcz1cInNlY3Rpb25cIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+UGF5bWVudCByZWZlcmVuY2U8L3RkPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cInRiLWNvbC13XCI+e3sgcGF5bWVudEdyb3VwPy5wYXltZW50c1swXT8ucmVmZXJlbmNlIH19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImJvbGQgdGItY29sLXdcIj5QYXltZW50IGFtb3VudDwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwidGItY29sLXdcIj7Co3t7IHBheW1lbnRHcm91cD8ucGF5bWVudHNbMF0/LmFtb3VudCB8IG51bWJlcjonLjInIH19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiICpuZ0lmPVwicGF5bWVudEdyb3VwPy5wYXltZW50c1swXT8ub3Zlcl9wYXltZW50ID4gMFwiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImJvbGQgdGItY29sLXdcIj5PdmVyIHBheW1lbnQ8L3RkPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cInRiLWNvbC13XCI+wqN7eyBnZXRPdmVyUGF5bWVudFZhbHVlKCkgfCBudW1iZXI6Jy4yJyB9fTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ciBjbGFzcz1cInNlY3Rpb25cIiAqbmdJZj1cInBheW1lbnRHcm91cD8ucGF5bWVudHNbMF0gJiYgcGF5bWVudEdyb3VwPy5wYXltZW50c1swXT8uZG9jdW1lbnRfY29udHJvbF9udW1iZXIgJiYgIXBheW1lbnRHcm91cD8ucGF5bWVudHNbMF0/LmV4dGVybmFsX3JlZmVyZW5jZVwiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImJvbGQgdGItY29sLXdcIj5QYXltZW50IGFzc2V0IG51bWJlcihEQ04pPC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJ0Yi1jb2wtd1wiPnt7IHBheW1lbnRHcm91cD8ucGF5bWVudHNbMF0/LmRvY3VtZW50X2NvbnRyb2xfbnVtYmVyIH19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiICpuZ0lmPVwicGF5bWVudEdyb3VwPy5wYXltZW50c1swXSAmJiBwYXltZW50R3JvdXA/LnBheW1lbnRzWzBdPy5kb2N1bWVudF9jb250cm9sX251bWJlciAmJiAhcGF5bWVudEdyb3VwPy5wYXltZW50c1swXT8uZXh0ZXJuYWxfcmVmZXJlbmNlXCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPkJhbmtlZCBkYXRlPC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJ0Yi1jb2wtd1wiPnt7IHBheW1lbnRHcm91cD8ucGF5bWVudHNbMF0/LmJhbmtlZF9kYXRlIHwgZGF0ZTonZGQgTU1NIHl5eXknIH19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiICpuZ0lmPVwicGF5bWVudEdyb3VwPy5wYXltZW50c1swXSAmJiBwYXltZW50R3JvdXA/LnBheW1lbnRzWzBdPy5leHRlcm5hbF9yZWZlcmVuY2VcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+R292UGF5IFRyYW5zYWN0aW9uIElEPC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJ0Yi1jb2wtd1wiPnt7IHBheW1lbnRHcm91cD8ucGF5bWVudHNbMF0/LmV4dGVybmFsX3JlZmVyZW5jZSB9fTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ciBjbGFzcz1cInNlY3Rpb25cIiA+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+UGF5bWVudCBtZXRob2Q8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwidGItY29sLXcgdGV4dC10cmFuc2Zvcm1cIj57eyBwYXltZW50R3JvdXA/LnBheW1lbnRzWzBdPy5tZXRob2QgIH19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiICpuZ0lmPVwicGF5bWVudEdyb3VwPy5wYXltZW50c1swXT8ubWV0aG9kID09PSAncGF5bWVudCBieSBhY2NvdW50J1wiID5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImJvbGQgdGItY29sLXdcIj5UeXBlPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRiLWNvbC13XCIgKm5nSWY9XCJwYXltZW50R3JvdXA/LnBheW1lbnRzWzBdPy5tZXRob2QgIT09ICdjYXJkJ1wiPkNyZWRpdDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJ0Yi1jb2wtd1wiICpuZ0lmPVwicGF5bWVudEdyb3VwPy5wYXltZW50c1swXT8ubWV0aG9kID09PSAnY2FyZCdcIj5DYXJkPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPkNoYW5uZWw8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwidGItY29sLXcgdGV4dC10cmFuc2Zvcm1cIj57eyBwYXltZW50R3JvdXA/LnBheW1lbnRzWzBdPy5jaGFubmVsICB9fTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDwhLS0gPHRyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPk1ldGhvZDwvdGQ+XG4gICAgICAgICAgICA8dGQgKm5nSWY9XCJwYXltZW50R3JvdXA/LnBheW1lbnRzWzBdPy5tZXRob2QgIT09ICdjYXJkJ1wiPnt7IHBheW1lbnRHcm91cD8ucGF5bWVudHNbMF0/Lm1ldGhvZCB9fTwvdGQ+XG4gICAgICAgICAgICA8dGQgKm5nSWY9XCJwYXltZW50R3JvdXA/LnBheW1lbnRzWzBdPy5tZXRob2QgPT09ICdjYXJkJ1wiPkNBUkQ8L3RkPlxuICAgICAgICA8L3RyPiAtLT5cbiAgICAgICAgPCEtLSA8dHIgY2xhc3M9XCJzZWN0aW9uXCIgKm5nSWY9XCJwYXltZW50R3JvdXA/LnBheW1lbnRzWzBdPy5jaGFubmVsICE9PSAndGVsZXBob255J1wiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPlN0YXR1czwvdGQ+XG4gICAgICAgICAgICA8dGQ+e3sgcGF5bWVudEdyb3VwPy5wYXltZW50c1swXT8uc3RhdHVzIH19PC90ZD5cbiAgICAgICAgIDwvdHI+IC0tPlxuICAgICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCIgKm5nSWY9XCJwYXltZW50R3JvdXA/LnBheW1lbnRzWzBdPy5wYXltZW50X2FsbG9jYXRpb25bMF0gIT09IHVuZGVmaW5lZFwiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPkFsbG9jYXRvbiBzdGF0dXM8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwidGItY29sLXdcIj57eyBwYXltZW50R3JvdXA/LnBheW1lbnRzWzBdPy5wYXltZW50X2FsbG9jYXRpb25bMF0/LmFsbG9jYXRpb25fc3RhdHVzIH19PC90ZD5cbiAgICAgICAgICA8L3RyPlxuXG4gICAgICAgICAgPHRyICpuZ0lmPVwicGF5bWVudEdyb3VwPy5wYXltZW50c1swXS5vcmdhbmlzYXRpb25fbmFtZVwiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPlBCQSBhY2NvdW50IG5hbWU8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwidGItY29sLXdcIj57eyBwYXltZW50R3JvdXA/LnBheW1lbnRzWzBdPy5vcmdhbmlzYXRpb25fbmFtZSB9fTwvdGQ+XG4gICAgICAgICAgPC90cj5cblxuICAgICAgICAgIDx0ciAqbmdJZj1cInBheW1lbnRHcm91cD8ucGF5bWVudHNbMF0uYWNjb3VudF9udW1iZXJcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImJvbGQgdGItY29sLXdcIj5QQkEgbnVtYmVyPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRiLWNvbC13XCI+e3sgcGF5bWVudEdyb3VwPy5wYXltZW50c1swXT8uYWNjb3VudF9udW1iZXIgfX08L3RkPlxuICAgICAgICAgIDwvdHI+XG5cbiAgICAgICAgICA8dHIgKm5nSWY9XCJwYXltZW50R3JvdXA/LnBheW1lbnRzWzBdLmN1c3RvbWVyX3JlZmVyZW5jZVwiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPkN1c3RvbWVyIGludGVybmFsIHJlZmVyZW5jZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJ0Yi1jb2wtd1wiPnt7IHBheW1lbnRHcm91cD8ucGF5bWVudHNbMF0/LmN1c3RvbWVyX3JlZmVyZW5jZSB9fTwvdGQ+XG4gICAgICAgICAgPC90cj5cblxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC90YWJsZT5cblxuICAgICAgPGRpdj5cbiAgICAgICAgICAgIDwhLS0gU3RhdHVzIGhpc3RvcmllcyAtLT5cbiAgICAgIDxjY3BheS1wYXltZW50LXN0YXR1c2VzICpuZ0lmPVwiaXNTdGF0dXNBbGxvY2F0ZWRcIiBbaXNUYWtlUGF5bWVudF09XCJpc1Rha2VQYXltZW50XCI+PC9jY3BheS1wYXltZW50LXN0YXR1c2VzPlxuICAgICAgPC9kaXY+XG4gICAgIDxkaXYgY2xhc3M9XCJyZW1pc3Npb25cIj5cbiAgICAgICAgPGJ1dHRvbiAgW2Rpc2FibGVkXT1cIiFjaGtJc0lzc3VlUmVmdW5kQnRuRW5hYmxlKHBheW1lbnRHcm91cD8ucGF5bWVudHNbMF0pXCIgIChjbGljayk9XCJpc3N1ZVJlZnVuZChwYXltZW50R3JvdXApXCIgY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnlcIj5Jc3N1ZSByZWZ1bmQ8L2J1dHRvbj5cbiAgICAgPC9kaXY+XG48ZGl2ICpuZ0lmPVwiSVNQQVlNRU5UU1RBVFVTRU5BQkxFRFwiPlxuICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICA8aDIgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bVwiPkRpc3B1dGVkIHBheW1lbnQgaGlzdG9yeTwvaDI+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdj5cbiAgICAgIDx0YWJsZT5cbiAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0aD5TdGF0dXM8L3RoPlxuICAgICAgICAgICAgICA8dGg+QW1vdW50PC90aD5cbiAgICAgICAgICAgICAgPHRoPkRhdGU8L3RoPlxuICAgICAgICAgICAgICA8dGg+UGF5bWVudCByZWZlcmVuY2U8L3RoPlxuICAgICAgICAgICAgICA8dGg+RXZlbnQ8L3RoPlxuICAgICAgICAgICAgICA8dGg+PC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90aGVhZD4gXG4gICAgICAgICAgPHRib2R5ICpuZ0lmPVwiIWVycm9yTXNnICYmIGFsbFBheW1lbnRzRmFpbHVyZS5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHBheW1lbnQgb2YgYWxsUGF5bWVudHNGYWlsdXJlXCI+XG4gICAgICAgICAgICAgIDx0ZD57eyBwYXltZW50LnN0YXR1cyB8IGNhcGl0YWxpemUgfX08L3RkPlxuICAgICAgICAgICAgICA8dGQ+wqN7eyBwYXltZW50LmRpc3B1dGVkX2Ftb3VudCB8IG51bWJlcjonLjInIH19PC90ZD5cbiAgICAgICAgICAgICAgPHRkPnt7KHBheW1lbnQucmVwcmVzZW50bWVudF9kYXRlID8gcGF5bWVudC5yZXByZXNlbnRtZW50X2RhdGUgOiBwYXltZW50LmZhaWx1cmVfZXZlbnRfZGF0ZV90aW1lKSB8IGRhdGU6J2RkIE1NTSB5eXl5J319PC90ZD5cbiAgICAgICAgICAgICAgPHRkPnt7IHBheW1lbnQucGF5bWVudF9yZWZlcmVuY2UgfX08L3RkPlxuICAgICAgICAgICAgICA8dGQgPnt7IHBheW1lbnQuZmFpbHVyZV90eXBlIH19PC90ZD5cbiAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ29Ub1BheW1lbnRGYWlsdWVQYWdlKHBheW1lbnQpXCI+U2hvdyBkZXRhaWw8L2E+XG5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8dGJvZHkgICpuZ0lmPVwiZXJyb3JNc2cgfHwgYWxsUGF5bWVudHNGYWlsdXJlLmxlbmd0aCA9PT0gMFwiPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjZcIj4gTm8gZGlzcHV0ZWQgcGF5bWVudCBoaXN0b3J5IGF2YWlsYWJsZS4gPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuICAgIDxici8+XG4gICAgPGJyLz5cbiAgPC9kaXY+XG4gICAgICBcbiAgICAgPGRpdiAgKm5nSWY9XCJjaGVja0ZvckZlZXMocGF5bWVudEdyb3VwKVwiPlxuICAgICAgPGRpdiAgKm5nSWY9XCJwYXltZW50R3JvdXAuZmVlcy5sZW5ndGggPiAwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICA8YnIvPlxuICAgICAgICAgIDxici8+XG4gICAgICAgICAgPGgyIGNsYXNzPVwiaGVhZGluZy1sYXJnZVwiPkZlZSBhbmQgcmVtaXNzaW9uIGRldGFpbHM8L2gyPlxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGZlZSBvZiBwYXltZW50R3JvdXAuZmVlc1wiPlxuICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxuICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+RGVzY3JpcHRpb248L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwidGItY29sLXdcIj5BcHBsaWNhdGlvbiBmb3Ige3sgZmVlLmRlc2NyaXB0aW9uIH19PC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDx0ciBjbGFzcz1cInNlY3Rpb25cIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImJvbGQgdGItY29sLXdcIj5GZWUgY29kZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJ0Yi1jb2wtd1wiPnt7IGZlZT8uY29kZSB9fTwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCIgW25nQ2xhc3NdPVwieyd0ci1ib3JkZXInOiAhZmVlLmFwcG9ydGlvbl9hbW91bnQgJiYgIWZlZS5yZW1pc3Npb25zICYmICFpc1R1cm5PZmYgfVwiPkZlZSBhbW91bnQ8L3RkPlxuICAgICAgICAgICAgPHRkIFtuZ0NsYXNzXT1cInsndHItYm9yZGVyJzogIWZlZS5hcHBvcnRpb25fYW1vdW50ICYmICFmZWUucmVtaXNzaW9ucyAmJiAhaXNUdXJuT2ZmfVwiPsKje3sgZmVlPy5jYWxjdWxhdGVkX2Ftb3VudCB8IG51bWJlcjonLjInIH19PC90ZD5cbiAgICAgICAgICA8L3RyPlxuXG4gICAgICAgICAgPHRyICpuZ0lmPVwiZmVlLmFwcG9ydGlvbl9hbW91bnRcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImJvbGQgdGItY29sLXcgdHItYm9yZGVyXCIgW25nQ2xhc3NdPVwieyd0ci1ib3JkZXInOiAhZmVlLnJlbWlzc2lvbnN9XCI+QWxsb2NhdGVkIGFtb3VudDwvdGQ+XG4gICAgICAgICAgICA8dGQgW25nQ2xhc3NdPVwieyd0ci1ib3JkZXInOiAhZmVlLnJlbWlzc2lvbnN9XCI+wqN7eyBmZWU/LmFwcG9ydGlvbl9hbW91bnQgfCBudW1iZXI6Jy4yJyB9fTwvdGQ+XG4gICAgICAgICAgPC90cj5cblxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgICAgIDxidXR0b24gW2Rpc2FibGVkXT1cIiFjaGtJc0FkZFJlbWlzc2lvbkJ0bkVuYWJsZShmZWUpXCIgKGNsaWNrKT1cImFkZFJlbWlzc2lvbihmZWUpXCIgY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnlcIj4gQWRkIHJlbWlzc2lvbjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8IS0tIHJlbWlzc2lvbnMgLS0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9yZGVyLWNsYXNzXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgIDx0aGVhZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkXCI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtMjQgd2hpdGVzcGFjZS1pbmhlcml0XCIgc2NvcGU9XCJjb2xcIj5IZWxwIHdpdGggZmVlcyBvciByZW1pc3Npb24gY29kZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC0yNyB3aGl0ZXNwYWNlLWluaGVyaXRcIiBzY29wZT1cImNvbFwiPlJlZmVyZW5jZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIHdoaXRlc3BhY2UtaW5oZXJpdFwiIHNjb3BlPVwiY29sXCI+RmVlPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgd2hpdGVzcGFjZS1pbmhlcml0XCIgc2NvcGU9XCJjb2xcIj5BbW91bnQ8L3RkPlxuICAgICAgICAgICAgPHRkICBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgd2hpdGVzcGFjZS1pbmhlcml0IHJlZnVuZEJ0blwiIHNjb3BlPVwiY29sXCI+PC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCIgICpuZ0Zvcj1cImxldCByZW1pc3Npb24gb2YgcGF5bWVudEdyb3VwLnJlbWlzc2lvbnNcIj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyByZW1pc3Npb24/Lmh3Zl9yZWZlcmVuY2UgfX08L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcmVtaXNzaW9uPy5yZW1pc3Npb25fcmVmZXJlbmNlIH19PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7IHJlbWlzc2lvbj8uZmVlX2NvZGUgfX08L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcmVtaXNzaW9uPy5od2ZfYW1vdW50IHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMid9fTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCByZWZ1bmRCdG4gd2hpdGVzcGFjZS1pbmhlcml0XCIgID5cbiAgICAgICAgICAgICAgIDxidXR0b24gIFtkaXNhYmxlZF09XCIhY2hrSXNBZGRSZWZ1bmRCdG5FbmFibGUocmVtaXNzaW9uKVwiIChjbGljayk9XCJhZGRSZWZ1bmRGb3JSZW1pc3Npb24ocGF5bWVudEdyb3VwLnBheW1lbnRzWzBdLHJlbWlzc2lvbixwYXltZW50R3JvdXAuZmVlcylcIiBjbGFzcz1cImdvdnVrLWJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiPiBBZGQgcmVmdW5kPC9idXR0b24+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICA8L3Rib2R5PlxuXG5cbiAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+PC9kaXY+XG5cbiAgIDxkaXYgKm5nSWY9XCJwYXltZW50R3JvdXAucmVtaXNzaW9ucz8ubGVuZ3RoID09PSAwXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1hci0xN1wiID5ObyBoZWxwIHdpdGggZmVlcyBvciByZW1pc3Npb25zLjwvc3Bhbj5cbiAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L21haW4+XG48L2Rpdj5cblxuPC9uZy1jb250YWluZXI+XG48bmctY29udGFpbmVyICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ2FkZHJlbWlzc2lvbicgJiYgZmVlSWQgJiYgdmlld0NvbXBTdGF0dXMgIT09ICdvdmVycGF5bWVudCcgJiYgdmlld0NvbXBTdGF0dXMgIT09ICdvdmVyUGF5bWVudEFkZHJlc3NDYXB0dXJlJyAmJiB2aWV3Q29tcFN0YXR1cyAhPT0gJ292ZXJwYXltZW50Y2hlY2thbmRhbnN3ZXInXCI+XG48Y2NwYXktYWRkLXJlbWlzc2lvbiBcbltpc1R1cm5PZmZdPVwiaXNUdXJuT2ZmXCJcbltpc1N0cmF0ZWdpY0ZpeEVuYWJsZV09XCJpc1N0cmF0ZWdpY0ZpeEVuYWJsZVwiXG5bdmlld0NvbXBTdGF0dXNdPSBcInZpZXdTdGF0dXNcIlxuW2ZlZV09XCJmZWVJZFwiXG5bcGF5bWVudF0gPSBcInBheW1lbnRcIlxuW29yZGVyU3RhdHVzXSA9XCJwYXltZW50R3JvdXAucGF5bWVudHNbMF0uc3RhdHVzXCJcbltwYWlkQW1vdW50XT0gXCJwYXltZW50R3JvdXAucGF5bWVudHNbMF0uYW1vdW50XCJcbltpc1JlZnVuZFJlbWlzc2lvbl09XCJpc1JlZnVuZFJlbWlzc2lvblwiXG5bY2FzZVR5cGVdPVwiY2FzZVR5cGVcIlxuW3BheW1lbnRHcm91cFJlZl09XCJwYXltZW50R3JvdXAucGF5bWVudF9ncm91cF9yZWZlcmVuY2VcIlxuW2lzRnJvbVBheW1lbnREZXRhaWxQYWdlXSA9IFwidHJ1ZVwiXG5bY2NkQ2FzZU51bWJlcl09XCJjY2RDYXNlTnVtYmVyXCJcbltvcmRlckZlZXNUb3RhbF0gPSBcIm9yZGVyRmVlc1RvdGFsXCJcbltvcmRlclRvdGFsUGF5bWVudHNdID0gXCJvcmRlclRvdGFsUGF5bWVudHNcIlxuW29yZGVyUmVtaXNzaW9uVG90YWxdID0gXCJvcmRlclJlbWlzc2lvblRvdGFsXCJcbltvcmRlclJlZl0gPSBcIm9yZGVyUmVmXCJcbltvcmRlckNyZWF0ZWRdID0gXCJvcmRlckNyZWF0ZWRcIlxuW29yZGVyUGFydHldID0gXCJvcmRlclBhcnR5XCJcbltvcmRlckNDREV2ZW50XSA9IFwib3JkZXJDQ0RFdmVudFwiXG5bb3JkZXJEZXRhaWxdID0gXCJvcmRlckRldGFpbFwiXG5bTE9HR0VESU5VU0VSUk9MRVNdID0gXCJMT0dHRURJTlVTRVJST0xFU1wiPjwvY2NwYXktYWRkLXJlbWlzc2lvbj5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ2FkZHJlZnVuZGZvcnJlbWlzc2lvbicgJiYgcGF5bWVudCAmJiB2aWV3Q29tcFN0YXR1cyAhPT0gJ292ZXJwYXltZW50JyAmJiB2aWV3Q29tcFN0YXR1cyAhPT0gJ292ZXJQYXltZW50QWRkcmVzc0NhcHR1cmUnICYmIHZpZXdDb21wU3RhdHVzICE9PSAnb3ZlcnBheW1lbnRjaGVja2FuZGFuc3dlcidcIj5cblxuPGNjcGF5LWFkZC1yZW1pc3Npb25cbltpc1R1cm5PZmZdPVwiaXNUdXJuT2ZmXCJcbltpc1N0cmF0ZWdpY0ZpeEVuYWJsZV09XCJpc1N0cmF0ZWdpY0ZpeEVuYWJsZVwiXG5bdmlld0NvbXBTdGF0dXNdPSBcInZpZXdTdGF0dXNcIlxuW3BheW1lbnRdPVwicGF5bWVudFwiXG5bb3JkZXJTdGF0dXNdID1cIm9yZGVyU3RhdHVzXCJcbltwYWlkQW1vdW50XT0gXCJvcmRlclRvdGFsUGF5bWVudHNcIlxuW2lzUmVmdW5kUmVtaXNzaW9uXT1cImlzUmVmdW5kUmVtaXNzaW9uXCJcbltjYXNlVHlwZV09XCJjYXNlVHlwZVwiXG5bZmVlYW1vdW50XT1cInJlbWlzc2lvbkZlZUFtdFwiXG5bcmVtaXNzaW9uXSA9IFwicmVtaXNzaW9uc1wiXG5baXNGcm9tU2VydmljZVJlcXVlc3RQYWdlXT1cImZhbHNlXCJcbltwYXltZW50R3JvdXBSZWZdPVwicGF5bWVudEdyb3VwLnBheW1lbnRfZ3JvdXBfcmVmZXJlbmNlXCJcbltjY2RDYXNlTnVtYmVyXT1cImNjZENhc2VOdW1iZXJcIlxuW29yZGVyRmVlc1RvdGFsXSA9IFwib3JkZXJGZWVzVG90YWxcIlxuW29yZGVyVG90YWxQYXltZW50c10gPSBcIm9yZGVyVG90YWxQYXltZW50c1wiXG5bb3JkZXJSZW1pc3Npb25Ub3RhbF0gPSBcIm9yZGVyUmVtaXNzaW9uVG90YWxcIlxuW29yZGVyUmVmXSA9IFwib3JkZXJSZWZcIlxuW29yZGVyQ3JlYXRlZF0gPSBcIm9yZGVyQ3JlYXRlZFwiXG5bb3JkZXJQYXJ0eV0gPSBcIm9yZGVyUGFydHlcIlxuW29yZGVyQ0NERXZlbnRdID0gXCJvcmRlckNDREV2ZW50XCJcbltvcmRlckRldGFpbF0gPSBcIm9yZGVyRGV0YWlsXCJcbltMT0dHRURJTlVTRVJST0xFU10gPSBcIkxPR0dFRElOVVNFUlJPTEVTXCI+PC9jY3BheS1hZGQtcmVtaXNzaW9uPlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3U3RhdHVzID09PSAnaXNzdWVyZWZ1bmQnICYmIHZpZXdDb21wU3RhdHVzICE9PSAnb3ZlcnBheW1lbnQnICYmIHZpZXdDb21wU3RhdHVzICE9PSAnb3ZlclBheW1lbnRBZGRyZXNzQ2FwdHVyZScgJiYgdmlld0NvbXBTdGF0dXMgIT09ICdvdmVycGF5bWVudGNoZWNrYW5kYW5zd2VyJ1wiPlxuICAgIDxjY3BheS1hZGQtcmVtaXNzaW9uIFxuICAgIFtpc1R1cm5PZmZdPVwiaXNUdXJuT2ZmXCJcbiAgICBbaXNTdHJhdGVnaWNGaXhFbmFibGVdPVwiaXNTdHJhdGVnaWNGaXhFbmFibGVcIlxuICAgIFtwYXltZW50XSA9ICdwYXltZW50R3JvdXAucGF5bWVudHNbMF0nXG4gICAgW3ZpZXdDb21wU3RhdHVzXT0gXCJ2aWV3U3RhdHVzXCJcbiAgICBbb3JkZXJTdGF0dXNdID1cInBheW1lbnRHcm91cC5wYXltZW50c1swXS5zdGF0dXNcIlxuICAgIFtwYWlkQW1vdW50XT0gXCJwYXltZW50R3JvdXAucGF5bWVudHNbMF0uYW1vdW50XCJcbiAgICBbaXNSZWZ1bmRSZW1pc3Npb25dPVwiaXNSZWZ1bmRSZW1pc3Npb25cIlxuICAgIFtjYXNlVHlwZV09XCJjYXNlVHlwZVwiXG4gICAgW2lzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZV09XCJpc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2VcIlxuICAgIFtpc0Zyb21QYXltZW50RGV0YWlsUGFnZV0gPSBcImlzRnJvbVBheW1lbnREZXRhaWxQYWdlXCJcbiAgICBbcGF5bWVudEdyb3VwUmVmXT1cInBheW1lbnRHcm91cC5wYXltZW50X2dyb3VwX3JlZmVyZW5jZVwiXG4gICAgW2NjZENhc2VOdW1iZXJdPVwiY2NkQ2FzZU51bWJlclwiXG4gICAgW29yZGVyRmVlc1RvdGFsXSA9IFwib3JkZXJGZWVzVG90YWxcIlxuICAgIFtvcmRlclRvdGFsUGF5bWVudHNdID0gXCJvcmRlclRvdGFsUGF5bWVudHNcIlxuICAgIFtvcmRlclJlbWlzc2lvblRvdGFsXSA9IFwib3JkZXJSZW1pc3Npb25Ub3RhbFwiXG4gICAgW29yZGVyUmVmXSA9IFwib3JkZXJSZWZcIlxuICAgIFtvcmRlckNyZWF0ZWRdID0gXCJvcmRlckNyZWF0ZWRcIlxuICAgIFtvcmRlclBhcnR5XSA9IFwib3JkZXJQYXJ0eVwiXG4gICAgW29yZGVyQ0NERXZlbnRdID0gXCJvcmRlckNDREV2ZW50XCJcbiAgICBbb3JkZXJEZXRhaWxdID0gXCJvcmRlckRldGFpbFwiXG4gICAgW2ZlZXNdID1cInBheW1lbnRGZWVzXCJcbiAgICBbaXNGdWxseVJlZnVuZF0gPSBcImlzRnVsbHlSZWZ1bmRcIlxuICAgIFtMT0dHRURJTlVTRVJST0xFU10gPSBcIkxPR0dFRElOVVNFUlJPTEVTXCI+XG4gICAgXG4gID48L2NjcGF5LWFkZC1yZW1pc3Npb24+XG48L25nLWNvbnRhaW5lcj5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3U3RhdHVzID09PSAnb3JkZXItZnVsbC12aWV3JyAmJiB2aWV3Q29tcFN0YXR1cyAhPT0gJ292ZXJwYXltZW50JyAmJiB2aWV3Q29tcFN0YXR1cyAhPT0gJ292ZXJQYXltZW50QWRkcmVzc0NhcHR1cmUnICYmIHZpZXdDb21wU3RhdHVzICE9PSAnb3ZlcnBheW1lbnRjaGVja2FuZGFuc3dlcidcIj5cbiAgPGNjcGF5LXNlcnZpY2UtcmVxdWVzdFxuICBbdmlld1N0YXR1c10gPSBcInZpZXdTdGF0dXNcIlxuICBbb3JkZXJSZWZdID0gXCJvcmRlclJlZlwiXG4gIFtvcmRlclN0YXR1c10gPSBcIm9yZGVyU3RhdHVzXCJcbiAgW29yZGVyQ3JlYXRlZF0gPSBcIm9yZGVyQ3JlYXRlZFwiXG4gIFtvcmRlclBhcnR5XSA9IFwib3JkZXJQYXJ0eVwiXG4gIFtvcmRlckNDREV2ZW50XSA9IFwib3JkZXJDQ0RFdmVudFwiXG4gIFtvcmRlckRldGFpbF0gPSBcIm9yZGVyRGV0YWlsXCJcbiAgW0xPR0dFRElOVVNFUlJPTEVTXSA9IFwiTE9HR0VESU5VU0VSUk9MRVNcIlxuICBbdGFrZVBheW1lbnRdID0gXCJpc1Rha2VQYXltZW50XCJcbiAgW2NjZENhc2VOdW1iZXJdID0gXCJjY2RDYXNlTnVtYmVyXCJcbiAgW29yZGVyRmVlc1RvdGFsXSA9IFwib3JkZXJGZWVzVG90YWxcIlxuICBbb3JkZXJUb3RhbFBheW1lbnRzXSA9IFwib3JkZXJUb3RhbFBheW1lbnRzXCJcbiAgW29yZGVyUmVtaXNzaW9uVG90YWxdID0gXCJvcmRlclJlbWlzc2lvblRvdGFsXCJcbiAgW2lzU2VydmljZVJlcXVlc3RdID0gXCJpc1NlcnZpY2VSZXF1ZXN0XCJcbiAgKGdvVG9TZXJ2aWNlUnF1ZXN0Q29tcG9uZW50KSA9IFwiZ29Ub1NlcnZpY2VSZXF1ZXN0UGFnZSgpXCJcbj5cbjwvY2NwYXktc2VydmljZS1yZXF1ZXN0PlxuXG48L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cIm92ZXItcGF5bWVudFwiPlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdDb21wU3RhdHVzID09PSAnb3ZlcnBheW1lbnQnXCI+XG4gIDxpbnB1dCAjbXlJbnB1dCB0eXBlPSdoaWRkZW4nIGlkPSdpRnJhbWVEcml2ZW5JbWFnZVZhbHVlJyB2YWx1ZT0nT1ZFUlBBWU1FTlRQQUdFJz4gXG4gIDxoMSBjbGFzcz1cImhlYWRpbmctbGFyZ2VcIj5Jc3N1ZSByZWZ1bmQ8L2gxPlxuICA8aDEgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bVwiPkNhc2UgcmVmZXJlbmNlOiB7e2NjZENhc2VOdW1iZXIgfCBjY2RIeXBoZW5zIH19PC9oMT5cbiAgPHNwYW4gaWQ9XCJob3ctY29udGFjdGVkLWNvbmRpdGlvbmFsLWhpbnQgZ292dWstZm9udDE5cHhcIiBjbGFzcz1cImZvcm0taGludFwiPlxuICAgIFBheW1lbnQgcmVmZXJlbmNlOiB7e3BheW1lbnRHcm91cD8ucGF5bWVudHNbMF0/LnJlZmVyZW5jZX19XG4gIDwvc3Bhbj5cbjxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gIDxmaWVsZHNldCBjbGFzcz1cImdvdnVrLWZpZWxkc2V0XCI+XG4gICAgPGxlZ2VuZCBjbGFzcz1cImdvdnVrLWZpZWxkc2V0X19sZWdlbmQgZ292dWstZmllbGRzZXRfX2xlZ2VuZC0tbFwiPlxuICAgICAgPGgxIGNsYXNzPVwiaGVhZGluZy1tZWRpdW1cIj5TZWxlY3QgcGF5bWVudCB0byByZWZ1bmQ8L2gxPlxuICAgIDwvbGVnZW5kPlxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1yYWRpb3NcIiBkYXRhLW1vZHVsZT1cImdvdnVrLXJhZGlvc1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19faXRlbVwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2lucHV0XCIgaWQ9XCJvdmVyLXBheW1lbnRcIiBuYW1lPVwib3Zlci1wYXltZW50XCIgdHlwZT1cInJhZGlvXCIgKGNsaWNrKT1cInNlbGVjdFB5bWVudE9wdGlvbignb3AnKVwiIHZhbHVlPVwib3BcIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstcmFkaW9zX19sYWJlbCBnb3Z1ay1mb250MTlweFwiIGZvcj1cIndoZXJlLWRvLXlvdS1saXZlXCI+XG4gICAgICAgICAgT3ZlciBwYXltZW50IMKje3tnZXRPdmVyUGF5bWVudFZhbHVlKCkgfCBudW1iZXI6Jy4yJ319XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2l0ZW1cIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstcmFkaW9zX19pbnB1dFwiIGlkPVwiZnVsbC1wYXltZW50XCIgbmFtZT1cIm92ZXItcGF5bWVudFwiIHR5cGU9XCJyYWRpb1wiIChjbGljayk9XCJzZWxlY3RQeW1lbnRPcHRpb24oJ2ZwJylcIiB2YWx1ZT1cImZwXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLXJhZGlvc19fbGFiZWwgZ292dWstZm9udDE5cHhcIiBmb3I9XCJ3aGVyZS1kby15b3UtbGl2ZS0yXCI+XG4gICAgICAgICAgRnVsbCBwYXltZW50IMKje3twYXltZW50R3JvdXA/LnBheW1lbnRzWzBdPy5hbW91bnQgfCBudW1iZXI6Jy4yJ319XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnkgb3Zlci1wYXltZW50LWFsaWdubWVudCBnb3Z1ay1mb250MTlweFwiXG4gICAgICAoY2xpY2spPVwiZ29Ub1BheW1lbnRWaWV3Q29tcG9uZW50KClcIj4gUHJldmlvdXM8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gXG4gICAgICAoY2xpY2spPVwiY29udGludWVQYXltZW50KHBheW1lbnRHcm91cClcIlxuICAgICAgW2Rpc2FibGVkXT1cImlzQ29udGludWVCdG5EaXNhYmxlZFwiXG4gICAgICBbbmdDbGFzc109J2lzQ29udGludWVCdG5EaXNhYmxlZCA/IFwiYnV0dG9uIGJ1dHRvbi0tZGlzYWJsZWQgZ292dWstIS1tYXJnaW4tcmlnaHQtMSBnb3Z1ay1mb250MTlweFwiIDogXCJidXR0b24gZ292dWstIS1tYXJnaW4tcmlnaHQtMSBnb3Z1ay1mb250MTlweFwiJ1xuICAgICAgY2xhc3M9XCJnb3Z1ay1idXR0b25cIj4gQ29udGludWU8L2J1dHRvbj5cbiAgPC9maWVsZHNldD5cbjwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3Q29tcFN0YXR1cyA9PT0gJ292ZXJQYXltZW50QWRkcmVzc0NhcHR1cmUnXCI+XG4gIDxpbnB1dCAjbXlJbnB1dCB0eXBlPSdoaWRkZW4nIGlkPSdpRnJhbWVEcml2ZW5JbWFnZVZhbHVlJyB2YWx1ZT0nT1ZFUlBBWU1FTlRBRERSRVNTQ0FQVFVSRVBBR0UnPiAgICAgIFxuICA8aDEgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLWxcIj5Jc3N1ZSByZWZ1bmQ8L2gxPlxuICA8aDIgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLW0gZ292dWstZm9udDE5cHhcIj5DYXNlIHJlZmVyZW5jZToge3tjY2RDYXNlTnVtYmVyIHwgY2NkSHlwaGVucyB9fTwvaDI+XG4gIDxzcGFuIGlkPVwiaG93LWNvbnRhY3RlZC1jb25kaXRpb25hbC1oaW50XCIgY2xhc3M9XCJnb3Z1ay1oaW50IGdvdnVrLWZvbnQxOXB4XCI+XG4gICAgUGF5bWVudCByZWZlcmVuY2U6IHt7cGF5bWVudEdyb3VwPy5wYXltZW50c1swXT8ucmVmZXJlbmNlfX1cbiAgPC9zcGFuPlxuPGNjcGF5LWNvbnRhY3QtZGV0YWlscyBcblthZGRyZXNzT2JqXSA9IG5vdGlmaWNhdGlvblxuKGFzc2lnbkNvbnRhY3REZXRhaWxzKT1cImdldENvbnRhY3REZXRhaWxzKCRldmVudClcIlxuKHJlZGlyZWN0VG9Jc3N1ZVJlZnVuZCk9XCJnb3RvUGF5bWVudFNlbGVjdFBhZ2UoJGV2ZW50KVwiID48L2NjcGF5LWNvbnRhY3QtZGV0YWlscz5cbjxwPlxuICAgIDxhIChjbGljayk9XCJnb1RvQ2FzZVRyYW5zYXRpb25QYWdlKCRldmVudClcIiBjbGFzcz1cImdvdnVrLWxpbmtcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWJ1dHRvblwiPlxuICAgICAgICBDYW5jZWxcbiAgICA8L2E+XG48L3A+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdDb21wU3RhdHVzID09PSAnb3ZlcnBheW1lbnRjaGVja2FuZGFuc3dlcidcIj5cbiAgPGlucHV0ICNteUlucHV0IHR5cGU9J2hpZGRlbicgaWQ9J2lGcmFtZURyaXZlbkltYWdlVmFsdWUnIHZhbHVlPSdBRERSRUZVTkRGT1JSRU1JU1NJT04nPiBcbiAgPGRpdiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dFwiPlxuICAgXG4gICAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLWxhcmdlXCI+IENoZWNrIHlvdXIgYW5zd2VyczwvaDE+XG4gIDwvZGl2PlxuICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZVwiPlxuICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlBheW1lbnQgcmVmZXJlbmNlPC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPiB7e3BheW1lbnRHcm91cC5wYXltZW50c1swXS5yZWZlcmVuY2V9fSA8L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5QYXltZW50IGFtb3VudDwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57e3BheW1lbnRHcm91cC5wYXltZW50c1swXS5hbW91bnQgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJ319PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+RmVlIGFtb3VudDwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57e3BheW1lbnRHcm91cD8uZmVlc1swXT8ubmV0X2Ftb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInfX08L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5SZWZ1bmQgYW1vdW50PC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7Z2V0T3ZlclBheW1lbnRWYWx1ZSgpIHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMid9fTwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlJlZnVuZCByZWFzb248L3RkPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+T3ZlciBwYXltZW50PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlNlbmQgdG88L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7b3JkZXJQYXJ0eX19PC90ZD5cbiAgICA8L3RyPlxuICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlNlbmQgdmlhPC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiY29udGFjdERldGFpbHNPYmo/Lm5vdGlmaWNhdGlvbl90eXBlID09PSAnRU1BSUwnXCIgY2xhc3M9XCJjb250YWN0RGV0YWlscy13aWR0aFwiPlxuICAgICAgICAgIDxzdHJvbmc+RW1haWw8L3N0cm9uZz5cbiAgICAgICAgICA8YnIvPlxuICAgICAgICAgIHt7Y29udGFjdERldGFpbHNPYmo/LmVtYWlsPy50cmltKCl9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImNvbnRhY3REZXRhaWxzT2JqPy5ub3RpZmljYXRpb25fdHlwZSA9PT0gJ0xFVFRFUidcIiBjbGFzcz1cImNvbnRhY3REZXRhaWxzLXdpZHRoXCI+XG4gICAgICAgICAgPHN0cm9uZz5Qb3N0PC9zdHJvbmc+XG4gICAgICAgICAgPGJyLz5cbiAgICAgICAgICB7e2NvbnRhY3REZXRhaWxzT2JqPy5hZGRyZXNzX2xpbmU/LnRyaW0oKX19Jm5ic3A7e3tjb250YWN0RGV0YWlsc09iaj8uY2l0eT8udHJpbSgpfX0mbmJzcDt7e2NvbnRhY3REZXRhaWxzT2JqPy5jb3VudHk/LnRyaW0oKX19Jm5ic3A7e3tjb250YWN0RGV0YWlsc09iaj8uY291bnRyeT8udHJpbSgpfX0mbmJzcDt7e2NvbnRhY3REZXRhaWxzT2JqPy5wb3N0YWxfY29kZT8udHJpbSgpfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxhIChjbGljayk9XCJnb3RvQWRkcmVzc1BhZ2UoY29udGFjdERldGFpbHNPYmopXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHJpZ2h0XCIgPkNoYW5nZTwvYT5cbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cblxuICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPk5vdGlmaWNhdGlvbjwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7dGVtcGxhdGVJbnN0cnVjdGlvblR5cGV9fVxuICAgICAgICAgIDxhICpuZ0lmPVwiIW5vdGlmaWNhdGlvblByZXZpZXdcIiBocmVmPVwiSmF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHJpZ2h0XCIgKGNsaWNrKT1cInNob3dOb3RpZmljYXRpb25QcmV2aWV3KClcIj5cbiAgICAgICAgICAgIFByZXZpZXdcbiAgICAgICAgICA8L2E+XG4gICAgICAgICAgPGEgKm5nSWY9XCJub3RpZmljYXRpb25QcmV2aWV3XCIgaHJlZj1cIkphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiZ292dWstbGluayByaWdodFwiIChjbGljayk9XCJoaWRlTm90aWZpY2F0aW9uUHJldmlldygpXCI+XG4gICAgICAgICAgICBIaWRlIFByZXZpZXdcbiAgICAgICAgICA8L2E+XG4gICAgICA8L3RkPlxuICAgIDwvdHI+XG4gIDwvdGFibGU+XG5cbiAgPGFwcC1ub3RpZmljYXRpb24tcHJldmlldyAqbmdJZj1cIm5vdGlmaWNhdGlvblByZXZpZXdcIiBcbiAgW3BheW1lbnRdPVwicGF5bWVudEdyb3VwLnBheW1lbnRzWzBdXCIgXG4gIFtjb250YWN0RGV0YWlsc109XCJjb250YWN0RGV0YWlsc09ialwiXG4gIFtyZWZ1bmRSZWFzb25dPVwiJ1JSMDM3J1wiXG4gIFtyZWZ1bmRBbW91bnRdPVwiZ2V0T3ZlclBheW1lbnRWYWx1ZSgpXCI+PC9hcHAtbm90aWZpY2F0aW9uLXByZXZpZXc+XG5cbiAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnkgb3Zlci1wYXltZW50LWFsaWdubWVudCBnb3Z1ay1mb250MTlweFwiIChjbGljayk9XCJnb3RvQWRkcmVzc1BhZ2UoY29udGFjdERldGFpbHNPYmopXCI+UHJldmlvdXM8L2J1dHRvbj5cbiAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCJcbiAgW25nQ2xhc3NdPSdpc0NvbnRpbnVlQnRuRGlzYWJsZWQgPyBcImJ1dHRvbiBidXR0b24tLWRpc2FibGVkIGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTEgZ292dWstZm9udDE5cHhcIiA6IFwiYnV0dG9uIGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTEgZ292dWstZm9udDE5cHhcIidcbiAgKGNsaWNrKT1cInByb2Nlc3NSZWZ1bmQoKVwiPlxuICAgIFN1Ym1pdCByZWZ1bmRcbiAgPC9idXR0b24+XG4gIDxwPlxuICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiICAoY2xpY2spPVwiZ29Ub0Nhc2VUcmFuc2F0aW9uUGFnZSgkZXZlbnQpXCIgY2xhc3M9XCJnb3Z1ay1saW5rIGdvdnVrLWZvbnQxOXB4XCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj5cbiAgICAgICAgICBDYW5jZWxcbiAgICAgIDwvYT5cbiAgPC9wPlxuXG48L25nLWNvbnRhaW5lcj5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3U3RhdHVzID09PSAncmVmdW5kY29uZmlybWF0aW9ucGFnZScgJiYgdmlld0NvbXBTdGF0dXMgIT09ICdvdmVycGF5bWVudCcgJiYgdmlld0NvbXBTdGF0dXMgIT09ICdvdmVyUGF5bWVudEFkZHJlc3NDYXB0dXJlJyAmJiB2aWV3Q29tcFN0YXR1cyAhPT0gJ292ZXJwYXltZW50Y2hlY2thbmRhbnN3ZXInXCI+XG4gIDxpbnB1dCAjbXlJbnB1dCB0eXBlPSdoaWRkZW4nIGlkPSdpRnJhbWVEcml2ZW5JbWFnZVZhbHVlJyB2YWx1ZT0nUkVUUk9SRU1JU1NJT05SRUZVTkRDT05GSVJNQVRJT05QQUdFJz4gXG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLXJvdyBwYWdlc2l6ZVwiPlxuICAgIDxkaXYgPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXBhbmVsIGdvdnVrLXBhbmVsLS1jb25maXJtYXRpb25cIj5cbiAgICAgICAgPGgxIGNsYXNzPVwiZ292dWstcGFuZWxfX3RpdGxlXCI+XG4gICAgICAgICAgUmVmdW5kIHN1Ym1pdHRlZFxuICAgICAgICA8L2gxPlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXBhbmVsX19ib2R5XCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5IHdoaXRlXCI+PHN0cm9uZz5SZWZ1bmQgcmVmZXJlbmNlOiB7e3JlZnVuZFJlZmVyZW5jZX19PC9zdHJvbmc+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgXG4gICAgICA8L2Rpdj5cbiAgICAgIDxoMiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbFwiPldoYXQgaGFwcGVucyBuZXh0PC9oMj5cbiAgICAgIDxwIGNsYXNzPVwiZ292dWstYm9keVwiPlxuICAgICAgICBBIHJlZnVuZCByZXF1ZXN0IGZvciB7e3JlZnVuZEFtb3VudCAgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJyB9fSBoYXMgYmVlbiBjcmVhdGVkIGFuZCB3aWxsIGJlIHBhc3NlZCB0byBhIHRlYW0gbGVhZGVyIHRvIGFwcHJvdmUuXG4gICAgICA8L3A+XG4gICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5XCI+XG4gICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnb1RvQ2FzZVRyYW5zYXRpb25QYWdlKCRldmVudClcIiBjbGFzcz1cImdvdnVrLWxpbmsgcG9pbnRlclwiIGRhdGEtbW9kdWxlPVwiZ292dWstYnV0dG9uXCI+XG4gICAgICBSZXR1cm4gdG8gY2FzZVxuICA8L2E+XG4gICAgPC9wPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuPC9uZy1jb250YWluZXI+XG48L2Rpdj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdwYXltZW50LWZhaWx1cmUnXCI+XG4gIDxkaXYgY2xhc3M9XCJwYXltZW50LWZhaWx1cmUtYWxpZ25tZW50XCI+XG4gICAgPGRpdiAgY2xhc3M9XCJnb3Z1ay1icmVhZGNydW1ic1wiPlxuICAgICAgPG9sIGNsYXNzPVwiZ292dWstYnJlYWRjcnVtYnNfX2xpc3RcIj5cbiAgICAgICAgPGxpIGNsYXNzPVwiZ292dWstYnJlYWRjcnVtYnNfX2xpc3QtaXRlbVwiPlxuICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ29CYWNrVG9QYXltZW50VmlldygkZXZlbnQpXCIgY2xhc3M9XCJnb3Z1ay1iYWNrLWxpbmtcIj5CYWNrPC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgPC9vbD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1yb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgPGgxIGNsYXNzPVwiaGVhZGluZy1sYXJnZSBnb3Z1ay0hLW1hcmdpbi10b3AtMFwiPkZhaWx1cmUgZXZlbnQgZGV0YWlsczwvaDE+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8dGFibGU+XG4gICAgICA8dGJvZHk+XG5cbiAgICAgIDx0ciBjbGFzcz1cInNlY3Rpb25cIj5cbiAgICAgICAgPHRkIGNsYXNzPVwiYm9sZFwiPkZhaWx1cmUgcmVmZXJlbmNlPC90ZD5cbiAgICAgICAgPHRkPlx0e3tzZWxlY3RlZFBheW1lbnRzU3RhdHVzLmZhaWx1cmVfcmVmZXJlbmNlfX08L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0ciBjbGFzcz1cInNlY3Rpb25cIj5cbiAgICAgICAgPHRkIGNsYXNzPVwiYm9sZFwiPkZhaWx1cmUgcmVhc29uPC90ZD5cbiAgICAgICAgPHRkPlx0e3tzZWxlY3RlZFBheW1lbnRzU3RhdHVzLmZhaWx1cmVfcmVhc29ufX08L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0ciBjbGFzcz1cInNlY3Rpb25cIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJib2xkXCI+UGF5bWVudCByZWZlcmVuY2U8L3RkPlxuICAgICAgICAgIDx0ZD57eyBzZWxlY3RlZFBheW1lbnRzU3RhdHVzLnBheW1lbnRfcmVmZXJlbmNlIH19PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiYm9sZFwiPlBheW1lbnQgYW1vdW50PC90ZD5cbiAgICAgICAgICA8dGQ+IMKje3sgcGF5bWVudEdyb3VwPy5wYXltZW50c1swXT8uYW1vdW50IHwgbnVtYmVyOicuMicgfX08L3RkPlxuXG4gICAgICA8L3RyPlxuICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImJvbGRcIj5EaXNwdXRlZCBhbW91bnQ8L3RkPlxuICAgICAgICAgIDx0ZD5cdMKje3tzZWxlY3RlZFBheW1lbnRzU3RhdHVzLmRpc3B1dGVkX2Ftb3VudCAgfCBudW1iZXI6Jy4yJ319PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgICAgIDx0ZCBjbGFzcz1cImJvbGRcIj5BZGRpdGlvbmFsIGluZm9ybWF0aW9uPC90ZD5cbiAgICAgICAgPHRkPlx0e3tzZWxlY3RlZFBheW1lbnRzU3RhdHVzLmFkZGl0aW9uYWxfcmVmZXJlbmNlIH19PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgICAgIDx0ZCBjbGFzcz1cImJvbGRcIj5GYWlsdXJlIHR5cGU8L3RkPlxuICAgICAgICA8dGQ+XHR7eyBzZWxlY3RlZFBheW1lbnRzU3RhdHVzLmZhaWx1cmVfdHlwZSB9fTwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICA8dGQgY2xhc3M9XCJib2xkXCI+RmFpbHVyZSBldmVudCBkYXRlIGFuZCB0aW1lPC90ZD5cbiAgICAgICAgPHRkPiB7eyBzZWxlY3RlZFBheW1lbnRzU3RhdHVzLmZhaWx1cmVfZXZlbnRfZGF0ZV90aW1lIHwgZGF0ZTonZGQgTU1NIHl5eXkgSEg6bW06c3MnIH19PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCIgKm5nSWY9XCJzZWxlY3RlZFBheW1lbnRzU3RhdHVzLmhhc19hbW91bnRfZGViaXRlZFwiPlxuICAgICAgICA8dGQgY2xhc3M9XCJib2xkXCI+SGFzIGRpc3B1dGVkIGFtb3VudCBkZWJpdGVkPC90ZD5cbiAgICAgICAgPHRkPlx0e3tzZWxlY3RlZFBheW1lbnRzU3RhdHVzLmhhc19hbW91bnRfZGViaXRlZH19PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCIgKm5nSWY9XCJzZWxlY3RlZFBheW1lbnRzU3RhdHVzLnJlcHJlc2VudG1lbnRfc3RhdHVzXCI+XG4gICAgICAgIDx0ZCBjbGFzcz1cImJvbGRcIj5TdGF0dXMgZm9sbG93aW5nIHJlcHJlc2VudGF0aW9uIG9mIHBheW1lbnQ8L3RkPlxuICAgICAgICA8dGQ+XHR7eyhzZWxlY3RlZFBheW1lbnRzU3RhdHVzLnJlcHJlc2VudG1lbnRfc3RhdHVzID09PSAnWWVzJyB8fCBzZWxlY3RlZFBheW1lbnRzU3RhdHVzLnJlcHJlc2VudG1lbnRfc3RhdHVzID09PSAneWVzJykgPyAnU3VjY2VzcycgOiAnRmFpbHVyZSd9fTwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiICpuZ0lmPVwic2VsZWN0ZWRQYXltZW50c1N0YXR1cy5yZXByZXNlbnRtZW50X2RhdGVcIj5cbiAgICAgICAgPHRkIGNsYXNzPVwiYm9sZFwiPkRhdGUgcGF5bWVudCByZXByZXNlbnRlZDwvdGQ+XG4gICAgICAgIDx0ZD5cdHt7c2VsZWN0ZWRQYXltZW50c1N0YXR1cy5yZXByZXNlbnRtZW50X2RhdGUgIHwgZGF0ZTonZGQgTU1NIHl5eXkgSEg6bW06c3MnfX08L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDwvdGJvZHk+XG4gICAgPC90YWJsZT5cblxuICAgIDxkaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG4iXX0=