// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { PaymentLibComponent } from '../../payment-lib.component';
import { Router } from '@angular/router';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { NotificationService } from '../../services/notification/notification.service';
import { OrderslistService } from '../../services/orderslist.service';
import { PostRefundRetroRemission } from '../../interfaces/PostRefundRetroRemission';
import * as i0 from "@angular/core";
import * as i1 from "../../payment-lib.component";
import * as i2 from "../../services/payment-view/payment-view.service";
import * as i3 from "../../services/orderslist.service";
import * as i4 from "../../services/notification/notification.service";
import * as i5 from "@angular/router";
function ServiceRequestComponent_ng_container_0_li_3_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 27)(1, "a", 28);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_0_li_3_Template_a_click_1_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r21 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r21.goToCaseTransationPage($event)); });
    i0.ɵɵtext(2, "Back");
    i0.ɵɵelementEnd()();
} }
function ServiceRequestComponent_ng_container_0_li_4_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 27)(1, "a", 29);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_0_li_4_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r24); const ctx_r23 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r23.goToServiceRequestPage()); });
    i0.ɵɵtext(2, "Back");
    i0.ɵɵelementEnd()();
} }
function ServiceRequestComponent_ng_container_0_td_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 30);
    i0.ɵɵtext(1, "Fee");
    i0.ɵɵelementEnd();
} }
function ServiceRequestComponent_ng_container_0_td_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 31);
    i0.ɵɵtext(1, "Fee");
    i0.ɵɵelementEnd();
} }
function ServiceRequestComponent_ng_container_0_td_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "td", 21);
} }
function ServiceRequestComponent_ng_container_0_tbody_49_tr_1_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 38);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r27 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(fee_r27.description);
} }
function ServiceRequestComponent_ng_container_0_tbody_49_tr_1_td_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 39);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r27 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(fee_r27.description);
} }
function ServiceRequestComponent_ng_container_0_tbody_49_tr_1_td_9_Template(rf, ctx) { if (rf & 1) {
    const _r36 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 40)(1, "button", 41);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_0_tbody_49_tr_1_td_9_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r36); const fee_r27 = i0.ɵɵnextContext().$implicit; const ctx_r34 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r34.addRemission(fee_r27)); });
    i0.ɵɵtext(2, " Add remission");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const fee_r27 = i0.ɵɵnextContext().$implicit;
    const ctx_r31 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", !ctx_r31.chkIsAddRemissionBtnEnable(fee_r27));
} }
function ServiceRequestComponent_ng_container_0_tbody_49_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 18);
    i0.ɵɵtemplate(1, ServiceRequestComponent_ng_container_0_tbody_49_tr_1_td_1_Template, 2, 1, "td", 34);
    i0.ɵɵtemplate(2, ServiceRequestComponent_ng_container_0_tbody_49_tr_1_td_2_Template, 2, 1, "td", 35);
    i0.ɵɵelementStart(3, "td", 36);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 36);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, ServiceRequestComponent_ng_container_0_tbody_49_tr_1_td_9_Template, 3, 1, "td", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r27 = ctx.$implicit;
    const ctx_r26 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r26.isServiceRequest === "false");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r26.isServiceRequest !== "false");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", fee_r27.volume ? fee_r27.volume : "-", " X ", i0.ɵɵpipeBind4(5, 6, fee_r27.calculated_amount / fee_r27.volume, "GBP", "symbol-narrow", "1.2-2"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(8, 11, fee_r27 == null ? null : fee_r27.net_amount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r26.isServiceRequest === "false");
} }
function ServiceRequestComponent_ng_container_0_tbody_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 32);
    i0.ɵɵtemplate(1, ServiceRequestComponent_ng_container_0_tbody_49_tr_1_Template, 10, 16, "tr", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const order_r25 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", order_r25.fees);
} }
function ServiceRequestComponent_ng_container_0_tbody_50_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 18)(1, "td", 43);
    i0.ɵɵtext(2, "No fees recorded");
    i0.ɵɵelementEnd()();
} }
function ServiceRequestComponent_ng_container_0_tbody_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 32);
    i0.ɵɵtemplate(1, ServiceRequestComponent_ng_container_0_tbody_50_tr_1_Template, 3, 0, "tr", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const order_r38 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (order_r38.fees == null ? null : order_r38.fees.length) === 0);
} }
function ServiceRequestComponent_ng_container_0_ng_container_55_div_1_tbody_13_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r48 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 18)(1, "td", 52);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 52);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 52);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 52);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 53)(11, "button", 41);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_0_ng_container_55_div_1_tbody_13_tr_1_Template_button_click_11_listener() { const restoredCtx = i0.ɵɵrestoreView(_r48); const remission_r45 = restoredCtx.$implicit; const order_r40 = i0.ɵɵnextContext(3).$implicit; const ctx_r46 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r46.addRefundForRemission(order_r40.payments[0], remission_r45, order_r40.fees)); });
    i0.ɵɵtext(12, " Add refund");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const remission_r45 = ctx.$implicit;
    const ctx_r44 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(remission_r45 == null ? null : remission_r45.hwf_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(remission_r45 == null ? null : remission_r45.remission_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(remission_r45 == null ? null : remission_r45.fee_code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(9, 5, remission_r45 == null ? null : remission_r45.hwf_amount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r44.chkIsAddRefundBtnEnable(remission_r45));
} }
function ServiceRequestComponent_ng_container_0_ng_container_55_div_1_tbody_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 32);
    i0.ɵɵtemplate(1, ServiceRequestComponent_ng_container_0_ng_container_55_div_1_tbody_13_tr_1_Template, 13, 10, "tr", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const order_r40 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", order_r40.remissions);
} }
function ServiceRequestComponent_ng_container_0_ng_container_55_div_1_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "span");
    i0.ɵɵtext(2, "No help with fees or remissions.");
    i0.ɵɵelementEnd()();
} }
function ServiceRequestComponent_ng_container_0_ng_container_55_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "table", 16)(2, "thead", 17)(3, "tr", 18)(4, "td", 45);
    i0.ɵɵtext(5, "Help with fees or remission code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 46);
    i0.ɵɵtext(7, "Reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 47);
    i0.ɵɵtext(9, "Fee");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 47);
    i0.ɵɵtext(11, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "td", 48);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(13, ServiceRequestComponent_ng_container_0_ng_container_55_div_1_tbody_13_Template, 2, 1, "tbody", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, ServiceRequestComponent_ng_container_0_ng_container_55_div_1_div_14_Template, 3, 0, "div", 0);
    i0.ɵɵelementStart(15, "div", 50)(16, "p");
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 50)(20, "p", 51);
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "currency");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const order_r40 = i0.ɵɵnextContext().$implicit;
    const ctx_r41 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(13);
    i0.ɵɵproperty("ngIf", (order_r40.remissions == null ? null : order_r40.remissions.length) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (order_r40.remissions == null ? null : order_r40.remissions.length) === 0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Total reductions: ", i0.ɵɵpipeBind4(18, 4, ctx_r41.orderRemissionTotal, "GBP", "symbol-narrow", "1.2-2"), "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Total fees to pay: ", i0.ɵɵpipeBind4(22, 9, ctx_r41.orderFeesTotal - ctx_r41.orderRemissionTotal, "GBP", "symbol-narrow", "1.2-2"), "");
} }
function ServiceRequestComponent_ng_container_0_ng_container_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ServiceRequestComponent_ng_container_0_ng_container_55_div_1_Template, 23, 14, "div", 44);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const order_r40 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", order_r40.remissions);
} }
function ServiceRequestComponent_ng_container_0_ng_container_56_div_1_tbody_12_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r58 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 18)(1, "td", 52)(2, "a", 57);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_0_ng_container_56_div_1_tbody_12_tr_1_Template_a_click_2_listener() { const restoredCtx = i0.ɵɵrestoreView(_r58); const payment_r56 = restoredCtx.$implicit; const ctx_r57 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r57.goToPayementView(payment_r56.paymentGroupReference, payment_r56.reference, payment_r56.method)); });
    i0.ɵɵtext(3, "Review");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td", 52);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 52);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 40)(11, "button", 41);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_0_ng_container_56_div_1_tbody_12_tr_1_Template_button_click_11_listener() { const restoredCtx = i0.ɵɵrestoreView(_r58); const payment_r56 = restoredCtx.$implicit; const ctx_r59 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r59.issueRefund(payment_r56)); });
    i0.ɵɵtext(12, "Issue refund");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const payment_r56 = ctx.$implicit;
    const ctx_r55 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 3, payment_r56 == null ? null : payment_r56.date_created, "dd MMM yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(9, 6, payment_r56 == null ? null : payment_r56.amount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r55.chkIsIssueRefundBtnEnable(payment_r56));
} }
function ServiceRequestComponent_ng_container_0_ng_container_56_div_1_tbody_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 32);
    i0.ɵɵtemplate(1, ServiceRequestComponent_ng_container_0_ng_container_56_div_1_tbody_12_tr_1_Template, 13, 11, "tr", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const order_r51 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", order_r51.payments);
} }
function ServiceRequestComponent_ng_container_0_ng_container_56_div_1_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "span", 58);
    i0.ɵɵtext(2, "No Payments recorded");
    i0.ɵɵelementEnd()();
} }
function ServiceRequestComponent_ng_container_0_ng_container_56_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "h3", 55);
    i0.ɵɵtext(2, "Payments");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "table", 16)(4, "thead", 17)(5, "tr", 18);
    i0.ɵɵelement(6, "td", 56);
    i0.ɵɵelementStart(7, "td", 21);
    i0.ɵɵtext(8, "Date created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 21);
    i0.ɵɵtext(10, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "td", 21);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(12, ServiceRequestComponent_ng_container_0_ng_container_56_div_1_tbody_12_Template, 2, 1, "tbody", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, ServiceRequestComponent_ng_container_0_ng_container_56_div_1_div_13_Template, 3, 0, "div", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const order_r51 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("ngIf", (order_r51.payments == null ? null : order_r51.payments.length) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", order_r51.payments === undefined || order_r51.payments === null);
} }
function ServiceRequestComponent_ng_container_0_ng_container_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ServiceRequestComponent_ng_container_0_ng_container_56_div_1_Template, 14, 2, "div", 54);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const order_r51 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", order_r51.payments);
} }
function ServiceRequestComponent_ng_container_0_div_57_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "p", 59);
    i0.ɵɵtext(2, "Total left to pay: ");
    i0.ɵɵelementStart(3, "b");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "currency");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r62 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(5, 1, ctx_r62.orderFeesTotal - ctx_r62.orderRemissionTotal - ctx_r62.orderTotalPayments, "GBP", "symbol-narrow", "1.2-2"));
} }
function ServiceRequestComponent_ng_container_0_div_57_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "p", 59);
    i0.ɵɵtext(2, "Total left to pay: ");
    i0.ɵɵelementStart(3, "b");
    i0.ɵɵtext(4, "0");
    i0.ɵɵelementEnd()()();
} }
function ServiceRequestComponent_ng_container_0_div_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, ServiceRequestComponent_ng_container_0_div_57_div_1_Template, 6, 6, "div", 0);
    i0.ɵɵtemplate(2, ServiceRequestComponent_ng_container_0_div_57_div_2_Template, 5, 0, "div", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r20.orderFeesTotal - ctx_r20.orderRemissionTotal - ctx_r20.orderTotalPayments > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r20.orderFeesTotal - ctx_r20.orderRemissionTotal - ctx_r20.orderTotalPayments < 0);
} }
function ServiceRequestComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 7)(2, "ol", 8);
    i0.ɵɵtemplate(3, ServiceRequestComponent_ng_container_0_li_3_Template, 3, 0, "li", 9);
    i0.ɵɵtemplate(4, ServiceRequestComponent_ng_container_0_li_4_Template, 3, 0, "li", 9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 10)(6, "div", 11)(7, "h1", 12);
    i0.ɵɵtext(8, "Service request");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "table")(10, "tbody")(11, "tr", 13)(12, "td", 14);
    i0.ɵɵtext(13, "Service request reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "tr", 13)(17, "td", 14);
    i0.ɵɵtext(18, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "tr", 13)(22, "td", 14);
    i0.ɵɵtext(23, "Date created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "td");
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "tr", 13)(28, "td", 14);
    i0.ɵɵtext(29, "Party");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "td");
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "tr", 13)(33, "td", 14);
    i0.ɵɵtext(34, "CCD event");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "td");
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(37, "div", 15)(38, "div", 11)(39, "table", 16)(40, "thead", 17)(41, "tr", 18);
    i0.ɵɵtemplate(42, ServiceRequestComponent_ng_container_0_td_42_Template, 2, 0, "td", 19);
    i0.ɵɵtemplate(43, ServiceRequestComponent_ng_container_0_td_43_Template, 2, 0, "td", 20);
    i0.ɵɵelementStart(44, "td", 21);
    i0.ɵɵtext(45, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "td", 21);
    i0.ɵɵtext(47, "Total");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(48, ServiceRequestComponent_ng_container_0_td_48_Template, 1, 0, "td", 22);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(49, ServiceRequestComponent_ng_container_0_tbody_49_Template, 2, 1, "tbody", 23);
    i0.ɵɵtemplate(50, ServiceRequestComponent_ng_container_0_tbody_50_Template, 2, 1, "tbody", 23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(51, "div", 24)(52, "p", 25);
    i0.ɵɵtext(53);
    i0.ɵɵpipe(54, "currency");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(55, ServiceRequestComponent_ng_container_0_ng_container_55_Template, 2, 1, "ng-container", 26);
    i0.ɵɵtemplate(56, ServiceRequestComponent_ng_container_0_ng_container_56_Template, 2, 1, "ng-container", 26);
    i0.ɵɵtemplate(57, ServiceRequestComponent_ng_container_0_div_57_Template, 3, 2, "div", 0);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.isServiceRequest === "false");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isServiceRequest !== "false");
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r0.orderRef);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.orderStatus);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(26, 16, ctx_r0.orderCreated, "dd MMMM yyyy"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.orderParty);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.orderCCDEvent);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r0.isServiceRequest === "false");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isServiceRequest !== "false");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r0.isServiceRequest === "false");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.orderDetail);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.orderDetail);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Total fees: ", i0.ɵɵpipeBind4(54, 19, ctx_r0.orderFeesTotal, "GBP", "symbol-narrow", "1.2-2"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.orderDetail);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.orderDetail);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isServiceRequest === "false");
} }
function ServiceRequestComponent_ccpay_add_remission_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-add-remission", 60);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("isTurnOff", ctx_r1.isTurnOff)("isStrategicFixEnable", ctx_r1.isStrategicFixEnable)("viewCompStatus", ctx_r1.viewStatus)("fee", ctx_r1.feeId)("orderStatus", ctx_r1.orderStatus)("paidAmount", ctx_r1.orderTotalPayments)("isRefundRemission", ctx_r1.isRefundRemission)("caseType", ctx_r1.caseType)("isServiceRequest", ctx_r1.isServiceRequest)("paymentGroupRef", ctx_r1.orderRef)("isFromServiceRequestPage", true)("payment", ctx_r1.payment)("ccdCaseNumber", ctx_r1.ccdCaseNumber)("orderRef", ctx_r1.orderRef)("orderStatus", ctx_r1.orderStatus)("orderCreated", ctx_r1.orderCreated)("orderParty", ctx_r1.orderParty)("orderCCDEvent", ctx_r1.orderCCDEvent)("orderDetail", ctx_r1.orderDetail)("LOGGEDINUSERROLES", ctx_r1.LOGGEDINUSERROLES)("takepayment", ctx_r1.takePayment)("orderFeesTotal", ctx_r1.orderFeesTotal)("orderTotalPayments", ctx_r1.orderTotalPayments)("orderRemissionTotal", ctx_r1.orderRemissionTotal);
} }
function ServiceRequestComponent_ccpay_add_remission_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-add-remission", 61);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("isTurnOff", ctx_r2.isTurnOff)("isStrategicFixEnable", ctx_r2.isStrategicFixEnable)("viewCompStatus", ctx_r2.viewStatus)("isFromServiceRequestPage", ctx_r2.isFromServiceRequestPage)("isFromPaymentDetailPage", ctx_r2.isFromPaymentDetailPage)("payment", ctx_r2.payment)("orderStatus", ctx_r2.orderStatus)("paidAmount", ctx_r2.orderTotalPayments)("isRefundRemission", ctx_r2.isRefundRemission)("caseType", ctx_r2.caseType)("paymentGroupRef", ctx_r2.orderRef)("ccdCaseNumber", ctx_r2.ccdCaseNumber)("orderRef", ctx_r2.orderRef)("orderStatus", ctx_r2.orderStatus)("orderCreated", ctx_r2.orderCreated)("orderParty", ctx_r2.orderParty)("orderCCDEvent", ctx_r2.orderCCDEvent)("orderDetail", ctx_r2.orderDetail)("isFullyRefund", ctx_r2.isFullyRefund)("fees", ctx_r2.paymentFees)("LOGGEDINUSERROLES", ctx_r2.LOGGEDINUSERROLES)("isFromRefundListPage", false)("takepayment", ctx_r2.takePayment)("orderFeesTotal", ctx_r2.orderFeesTotal)("orderTotalPayments", ctx_r2.orderTotalPayments)("orderRemissionTotal", ctx_r2.orderRemissionTotal);
} }
function ServiceRequestComponent_ccpay_add_remission_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-add-remission", 62);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("isTurnOff", ctx_r3.isTurnOff)("isStrategicFixEnable", ctx_r3.isStrategicFixEnable)("viewCompStatus", ctx_r3.viewStatus)("payment", ctx_r3.payment)("orderStatus", ctx_r3.orderStatus)("paidAmount", ctx_r3.orderTotalPayments)("isRefundRemission", ctx_r3.isRefundRemission)("caseType", ctx_r3.caseType)("feeamount", ctx_r3.remissionFeeAmt)("remission", ctx_r3.remissions)("isFromServiceRequestPage", ctx_r3.isServiceRequest)("ccdCaseNumber", ctx_r3.ccdCaseNumber)("orderRef", ctx_r3.orderRef)("orderStatus", ctx_r3.orderStatus)("orderCreated", ctx_r3.orderCreated)("orderParty", ctx_r3.orderParty)("orderCCDEvent", ctx_r3.orderCCDEvent)("orderDetail", ctx_r3.orderDetail)("LOGGEDINUSERROLES", ctx_r3.LOGGEDINUSERROLES)("takepayment", ctx_r3.takePayment)("orderFeesTotal", ctx_r3.orderFeesTotal)("orderTotalPayments", ctx_r3.orderTotalPayments)("orderRemissionTotal", ctx_r3.orderRemissionTotal);
} }
function ServiceRequestComponent_ccpay_payment_view_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-payment-view", 63);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("LOGGEDINUSERROLES", ctx_r4.LOGGEDINUSERROLES)("isTurnOff", ctx_r4.isTurnOff)("isTakePayment", ctx_r4.takePayment)("caseType", ctx_r4.caseType)("orderRef", ctx_r4.orderRef)("orderStatus", ctx_r4.orderStatus)("orderCreated", ctx_r4.orderCreated)("orderParty", ctx_r4.orderParty)("orderCCDEvent", ctx_r4.orderCCDEvent)("orderDetail", ctx_r4.orderDetail)("orderFeesTotal", ctx_r4.orderFeesTotal)("orderTotalPayments", ctx_r4.orderTotalPayments)("orderRemissionTotal", ctx_r4.orderRemissionTotal)("isServiceRequest", ctx_r4.isServiceRequest);
} }
function ServiceRequestComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    const _r65 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 64)(2, "span", 65);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong", 66)(5, "span", 67);
    i0.ɵɵtext(6, "Warning");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7, " Are you sure you want to delete this fee? ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 68)(9, "form", 69)(10, "button", 70);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_5_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r65); const ctx_r64 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r64.cancelRemoval()); });
    i0.ɵɵtext(11, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 71);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_5_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r65); const ctx_r66 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r66.removeFee(ctx_r66.feeId)); });
    i0.ɵɵtext(13, " Remove ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("disabled", ctx_r5.isRemoveBtnDisabled)("ngClass", ctx_r5.isRemoveBtnDisabled ? "button button--disabled govuk-!-margin-right-1" : "button govuk-!-margin-right-1");
} }
function ServiceRequestComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r69 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 72, 73);
    i0.ɵɵelementStart(3, "h1", 74);
    i0.ɵɵtext(4, "Issue refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h1", 55);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdHyphens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 75);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 76)(11, "fieldset", 77)(12, "legend", 78)(13, "h1", 55);
    i0.ɵɵtext(14, "Select payment to refund");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 79)(16, "div", 80)(17, "input", 81);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_7_Template_input_click_17_listener() { i0.ɵɵrestoreView(_r69); const ctx_r68 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r68.selectPymentOption("op")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "label", 82);
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 80)(22, "input", 83);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_7_Template_input_click_22_listener() { i0.ɵɵrestoreView(_r69); const ctx_r70 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r70.selectPymentOption("fp")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "label", 84);
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "number");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(26, "button", 85);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_7_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r69); const ctx_r71 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r71.goToPaymentViewComp()); });
    i0.ɵɵtext(27, " Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "button", 86);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_7_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r69); const ctx_r72 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r72.continuePayment(ctx_r72.paymentGroupList)); });
    i0.ɵɵtext(29, " Continue");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Case reference: ", i0.ɵɵpipeBind1(7, 6, ctx_r6.ccdCaseNumber), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Payment reference: ", ctx_r6.paymentGroupList == null ? null : ctx_r6.paymentGroupList.payments[0] == null ? null : ctx_r6.paymentGroupList.payments[0].reference, " ");
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1(" Over payment \u00A3", i0.ɵɵpipeBind2(20, 8, ctx_r6.getOverPaymentValue(), ".2"), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" Full payment \u00A3", i0.ɵɵpipeBind2(25, 11, ctx_r6.paymentGroupList == null ? null : ctx_r6.paymentGroupList.payments[0] == null ? null : ctx_r6.paymentGroupList.payments[0].amount, ".2"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r6.isContinueBtnDisabled)("ngClass", ctx_r6.isContinueBtnDisabled ? "button button--disabled govuk-!-margin-right-1 govuk-font19px" : "button govuk-!-margin-right-1 govuk-font19px");
} }
function ServiceRequestComponent_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    const _r75 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 87, 73);
    i0.ɵɵelementStart(3, "h1", 88);
    i0.ɵɵtext(4, "Issue refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2", 89);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdHyphens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 90);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "ccpay-contact-details", 91);
    i0.ɵɵlistener("assignContactDetails", function ServiceRequestComponent_ng_container_8_Template_ccpay_contact_details_assignContactDetails_10_listener($event) { i0.ɵɵrestoreView(_r75); const ctx_r74 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r74.getContactDetails($event)); })("redirectToIssueRefund", function ServiceRequestComponent_ng_container_8_Template_ccpay_contact_details_redirectToIssueRefund_10_listener($event) { i0.ɵɵrestoreView(_r75); const ctx_r76 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r76.gotoPaymentSelectPage($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p")(12, "a", 92);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_8_Template_a_click_12_listener($event) { i0.ɵɵrestoreView(_r75); const ctx_r77 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r77.goToCaseTransationPage($event)); });
    i0.ɵɵtext(13, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Case reference: ", i0.ɵɵpipeBind1(7, 3, ctx_r7.ccdCaseNumber), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Payment reference: ", ctx_r7.paymentGroupList == null ? null : ctx_r7.paymentGroupList.payments[0] == null ? null : ctx_r7.paymentGroupList.payments[0].reference, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("addressObj", ctx_r7.notification);
} }
function ServiceRequestComponent_ng_container_9_div_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 103)(1, "strong");
    i0.ɵɵtext(2, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r79 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r79.contactDetailsObj == null ? null : ctx_r79.contactDetailsObj.email == null ? null : ctx_r79.contactDetailsObj.email.trim(), " ");
} }
function ServiceRequestComponent_ng_container_9_div_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 103)(1, "strong");
    i0.ɵɵtext(2, "Post");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r80 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate5(" ", ctx_r80.contactDetailsObj == null ? null : ctx_r80.contactDetailsObj.address_line == null ? null : ctx_r80.contactDetailsObj.address_line.trim(), "\u00A0", ctx_r80.contactDetailsObj == null ? null : ctx_r80.contactDetailsObj.city == null ? null : ctx_r80.contactDetailsObj.city.trim(), "\u00A0", ctx_r80.contactDetailsObj == null ? null : ctx_r80.contactDetailsObj.county == null ? null : ctx_r80.contactDetailsObj.county.trim(), "\u00A0", ctx_r80.contactDetailsObj == null ? null : ctx_r80.contactDetailsObj.country == null ? null : ctx_r80.contactDetailsObj.country.trim(), "\u00A0", ctx_r80.contactDetailsObj == null ? null : ctx_r80.contactDetailsObj.postal_code == null ? null : ctx_r80.contactDetailsObj.postal_code.trim(), " ");
} }
function ServiceRequestComponent_ng_container_9_a_53_Template(rf, ctx) { if (rf & 1) {
    const _r85 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 104);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_9_a_53_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r85); const ctx_r84 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r84.showNotificationPreview()); });
    i0.ɵɵtext(1, " Preview ");
    i0.ɵɵelementEnd();
} }
function ServiceRequestComponent_ng_container_9_a_54_Template(rf, ctx) { if (rf & 1) {
    const _r87 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 104);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_9_a_54_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r87); const ctx_r86 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r86.hideNotificationPreview()); });
    i0.ɵɵtext(1, " Hide Preview ");
    i0.ɵɵelementEnd();
} }
function ServiceRequestComponent_ng_container_9_app_notification_preview_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-notification-preview", 105);
} if (rf & 2) {
    const ctx_r83 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("payment", ctx_r83.paymentGroupList.payments[0])("contactDetails", ctx_r83.contactDetailsObj)("refundReason", "RR037")("refundAmount", ctx_r83.getOverPaymentValue());
} }
function ServiceRequestComponent_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    const _r89 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 93, 73);
    i0.ɵɵelementStart(3, "div", 64)(4, "h1", 74);
    i0.ɵɵtext(5, " Check your answers");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "table", 94)(7, "tr", 18)(8, "td", 95);
    i0.ɵɵtext(9, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 36);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "tr", 18)(13, "td", 95);
    i0.ɵɵtext(14, "Payment amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 36);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "tr", 18)(19, "td", 95);
    i0.ɵɵtext(20, "Fee amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 36);
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "tr", 18)(25, "td", 95);
    i0.ɵɵtext(26, "Refund amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "td", 36);
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "tr", 18)(31, "td", 95);
    i0.ɵɵtext(32, "Refund reason");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "td", 36);
    i0.ɵɵtext(34, "Over payment");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "tr", 18)(36, "td", 95);
    i0.ɵɵtext(37, "Send to");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "td", 36);
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "tr", 18)(41, "td", 95);
    i0.ɵɵtext(42, "Send via");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "td", 52);
    i0.ɵɵtemplate(44, ServiceRequestComponent_ng_container_9_div_44_Template, 5, 1, "div", 96);
    i0.ɵɵtemplate(45, ServiceRequestComponent_ng_container_9_div_45_Template, 5, 5, "div", 96);
    i0.ɵɵelementStart(46, "a", 97);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_9_Template_a_click_46_listener() { i0.ɵɵrestoreView(_r89); const ctx_r88 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r88.gotoAddressPage(ctx_r88.contactDetailsObj)); });
    i0.ɵɵtext(47, "Change");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(48, "tr", 18)(49, "td", 95);
    i0.ɵɵtext(50, "Notification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "td", 36);
    i0.ɵɵtext(52);
    i0.ɵɵtemplate(53, ServiceRequestComponent_ng_container_9_a_53_Template, 2, 0, "a", 98);
    i0.ɵɵtemplate(54, ServiceRequestComponent_ng_container_9_a_54_Template, 2, 0, "a", 98);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(55, ServiceRequestComponent_ng_container_9_app_notification_preview_55_Template, 1, 4, "app-notification-preview", 99);
    i0.ɵɵelementStart(56, "button", 100);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_9_Template_button_click_56_listener() { i0.ɵɵrestoreView(_r89); const ctx_r90 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r90.gotoAddressPage(ctx_r90.contactDetailsObj)); });
    i0.ɵɵtext(57, "Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "button", 101);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_9_Template_button_click_58_listener() { i0.ɵɵrestoreView(_r89); const ctx_r91 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r91.processRefund()); });
    i0.ɵɵtext(59, " Submit refund ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "p")(61, "a", 102);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_9_Template_a_click_61_listener($event) { i0.ɵɵrestoreView(_r89); const ctx_r92 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r92.goToCaseTransationPage($event)); });
    i0.ɵɵtext(62, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r8.paymentGroupList.payments[0].reference);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(17, 12, ctx_r8.paymentGroupList.payments[0].amount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(23, 17, ctx_r8.paymentGroupList == null ? null : ctx_r8.paymentGroupList.fees[0] == null ? null : ctx_r8.paymentGroupList.fees[0].net_amount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(29, 22, ctx_r8.getOverPaymentValue(), "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r8.orderParty);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", (ctx_r8.contactDetailsObj == null ? null : ctx_r8.contactDetailsObj.notification_type) === "EMAIL");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r8.contactDetailsObj == null ? null : ctx_r8.contactDetailsObj.notification_type) === "LETTER");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", ctx_r8.templateInstructionType, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r8.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r8.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r8.notificationPreview);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r8.isContinueBtnDisabled ? "button button--disabled govuk-!-margin-right-1 govuk-font19px" : "button govuk-!-margin-right-1 govuk-font19px");
} }
function ServiceRequestComponent_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    const _r95 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 106, 73);
    i0.ɵɵelementStart(3, "div", 107)(4, "div")(5, "div", 108)(6, "h1", 109);
    i0.ɵɵtext(7, " Refund submitted ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 110)(9, "p", 111)(10, "strong");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(12, "h2", 88);
    i0.ɵɵtext(13, "What happens next");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 112);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p", 112)(18, "a", 113);
    i0.ɵɵlistener("click", function ServiceRequestComponent_ng_container_10_Template_a_click_18_listener($event) { i0.ɵɵrestoreView(_r95); const ctx_r94 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r94.goToCaseTransationPage($event)); });
    i0.ɵɵtext(19, " Return to case ");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate1("Refund reference: ", ctx_r9.refundReference, "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" A refund request for ", i0.ɵɵpipeBind4(16, 2, ctx_r9.refundAmount, "GBP", "symbol-narrow", "1.2-2"), " has been created and will be passed to a team leader to approve. ");
} }
function ServiceRequestComponent_ccpay_case_transactions_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-case-transactions", 114);
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵproperty("isFromServiceRequestPage", ctx_r10.isServiceRequest)("LOGGEDINUSERROLES", ctx_r10.LOGGEDINUSERROLES)("isTakePayment", ctx_r10.takePayment);
} }
export class ServiceRequestComponent {
    paymentLibComponent;
    paymentViewService;
    OrderslistService;
    notificationService;
    cd;
    router;
    LOGGEDINUSERROLES;
    viewStatus;
    orderDetail;
    orderRef;
    orderStatus;
    orderParty;
    orderCreated;
    orderCCDEvent;
    orderFeesTotal;
    orderTotalPayments;
    orderRemissionTotal;
    paymentGroupList;
    takePayment;
    ccdCaseNumber;
    isServiceRequest;
    goToServiceRquestComponent = new EventEmitter();
    viewCompStatus;
    servicerequest;
    paymentType;
    excReference;
    paymentGroups = [];
    payments = [];
    nonPayments = [];
    allPayments = [];
    remissions = [];
    paymentFees;
    fees;
    errorMessage;
    totalFees;
    totalPayments;
    totalNonOffPayments;
    totalRemissions;
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
    isRemoveBtnDisabled = false;
    feeId;
    clAmountDue = 0;
    unprocessedRecordCount;
    isFeeRecordsExist = false;
    isGrpOutstandingAmtPositive = false;
    totalRefundAmount;
    caseType;
    isConfirmationBtnDisabled;
    refundReference;
    refundAmount;
    payment;
    paymentGroup;
    paymentView;
    isAddRemissionEnable = false;
    orderRemissionDetails = [];
    orderLevelFees = [];
    cpoDetails = null;
    serviceRequestValue;
    orderAddBtnEnable;
    isFromPaymentDetailPage;
    contactDetailsObj;
    notification;
    isCPODown;
    test;
    isPBA = false;
    isIssueRefunfBtnEnable = false;
    isAddRemissionBtnEnabled = false;
    isRefundRemissionBtnEnable = false;
    allowedRolesToAccessRefund = ['payments-refund-approver', 'payments-refund'];
    isFromServiceRequestPage;
    navigationpage;
    remissionFeeAmt;
    isContinueBtnDisabled = true;
    isFullyRefund;
    templateInstructionType;
    notificationPreview;
    constructor(paymentLibComponent, paymentViewService, OrderslistService, notificationService, cd, router) {
        this.paymentLibComponent = paymentLibComponent;
        this.paymentViewService = paymentViewService;
        this.OrderslistService = OrderslistService;
        this.notificationService = notificationService;
        this.cd = cd;
        this.router = router;
    }
    ngOnInit() {
        this.isTurnOff = this.paymentLibComponent.ISTURNOFF;
        this.isServiceRequest = 'false';
        if (this.viewStatus === undefined) {
            this.viewStatus = this.paymentLibComponent.viewName;
        }
        if (this.paymentLibComponent.isFromServiceRequestPage && this.paymentLibComponent.isFromPaymentDetailPage) {
            this.OrderslistService.getorderRefs().subscribe((data) => this.orderRef = data);
            this.OrderslistService.getorderCCDEvents().subscribe((data) => this.orderCCDEvent = data);
            this.OrderslistService.getorderCreateds().subscribe((data) => this.orderCreated = data);
            this.OrderslistService.getorderDetail().subscribe((data) => this.orderDetail = data);
            this.OrderslistService.getorderPartys().subscribe((data) => this.orderParty = data);
            this.OrderslistService.getorderRemissionTotals().subscribe((data) => this.orderRemissionTotal = data);
            this.OrderslistService.getorderFeesTotals().subscribe((data) => this.orderFeesTotal = data);
            this.OrderslistService.getoorderTotalPaymentss().subscribe((data) => this.orderTotalPayments = data);
        }
        if (this.paymentLibComponent.isFromServiceRequestPage && this.paymentLibComponent.TAKEPAYMENT) {
            this.isServiceRequest = 'false';
        }
    }
    goToServiceRequestPage() {
        this.goToServiceRquestComponent.emit();
    }
    goToCaseTransationPage(event) {
        event.preventDefault();
        this.OrderslistService.setnavigationPage('servicerequestpage');
        this.OrderslistService.setisFromServiceRequestPage(false);
        this.paymentLibComponent.viewName = 'case-transactions';
        this.paymentLibComponent.ISBSENABLE = true;
        this.paymentLibComponent.isTakePayment = this.paymentLibComponent.TAKEPAYMENT;
        if (this.takePayment) {
            this.paymentLibComponent.isTakePayment = this.takePayment;
        }
        //this.paymentLibComponent.SERVICEREQUEST = "true";
        this.paymentLibComponent.isFromServiceRequestPage = false;
        if (this.isServiceRequest !== 'false') {
            this.paymentLibComponent.isFromServiceRequestPage = true;
        }
        this.paymentLibComponent.isFromRefundStatusPage = false;
        this.paymentLibComponent.viewName = 'case-transactions';
        this.resetOrderData();
        // Check we on XUI
        if (this.router.url.startsWith('/cases/case-details/')) {
            // Use ccpay-case-transactions component
            this.viewStatus = 'case-transactions';
        }
        else {
            // Reload Paybubble case-transactions page.
            let partUrl = this.paymentLibComponent.ISBSENABLE ? '&isBulkScanning=Enable' : '&isBulkScanning=Disable';
            partUrl += this.paymentLibComponent.ISTURNOFF ? '&isTurnOff=Enable' : '&isTurnOff=Disable';
            if (this.isServiceRequest === 'false') {
                partUrl += this.paymentLibComponent.TAKEPAYMENT ? '&takePayment=true' : '&takePayment=false';
            }
            partUrl += this.isStrategicFixEnable ? '&isStFixEnable=Enable' : '&isStFixEnable=Disable';
            partUrl += this.isServiceRequest !== 'false' ? '&servicerequest=true' : '&servicerequest=false';
            partUrl += `&caseType=${this.paymentLibComponent.CASETYPE}`;
            const url = `/payment-history/${this.paymentLibComponent.CCD_CASE_NUMBER}?view=case-transactions&selectedOption=${this.paymentLibComponent.SELECTED_OPTION}${partUrl}`;
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigateByUrl(url);
        }
    }
    addRemission(fee) {
        if (this.chkIsAddRemissionBtnEnable(fee)) {
            this.feeId = fee;
            this.viewStatus = 'addremission';
            this.payment = this.orderDetail[0].payments[0];
            this.paymentViewService.getApportionPaymentDetails(this.orderDetail[0].payments[0].reference).subscribe(paymentGroup => {
                this.paymentGroup = paymentGroup;
                this.paymentGroup.payments = this.paymentGroup.payments.filter(paymentGroupObj => paymentGroupObj['reference'].includes(this.paymentLibComponent.paymentReference));
                this.payment = this.paymentGroup.payments[0];
                //  const paymentAllocation = this.paymentGroup.payments[0].payment_allocation;
                //  this.isStatusAllocated = paymentAllocation.length > 0 && paymentAllocation[0].allocation_status === 'Allocated' || paymentAllocation.length === 0;
            }, (error) => this.errorMessage = error.replace(/"/g, ""));
        }
    }
    addRefundForRemission(payment, remission, fees) {
        this.paymentLibComponent.isFromServiceRequestPage = true;
        this.paymentViewService.getApportionPaymentDetails(payment.reference).subscribe(paymentGroup => {
            this.paymentGroup = paymentGroup;
            this.paymentGroup.payments = this.paymentGroup.payments.filter(paymentGroupObj => paymentGroupObj.reference === payment.reference);
            this.payment = this.paymentGroup.payments[0];
            this.remissions = remission;
            this.remissionFeeAmt = fees.filter(data => data.code === this.remissions['fee_code'])[0].net_amount;
            this.viewStatus = 'addrefundforremission';
            // const paymentAllocation = this.paymentGroup.payments[0].payment_allocation;
            // this.isStatusAllocated = paymentAllocation.length > 0 && paymentAllocation[0].allocation_status === 'Allocated' || paymentAllocation.length === 0;
        }, (error) => this.errorMessage = error);
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
    issueRefund(payment) {
        if (payment !== null && payment !== undefined) {
            if (this.chkIsIssueRefundBtnEnable(payment)) {
                this.paymentViewService.getApportionPaymentDetails(payment.reference).subscribe(paymentGroup => {
                    paymentGroup.payments = paymentGroup.payments.filter(paymentGroupObj => paymentGroupObj['reference'].includes(payment.reference));
                    if (payment.over_payment > 0) {
                        this.viewStatus = '';
                        this.payment = payment;
                        this.paymentGroupList = paymentGroup;
                        this.viewCompStatus = 'overpayment';
                    }
                    else {
                        this.viewStatus = 'issuerefund';
                        this.viewCompStatus = '';
                        this.paymentFees = paymentGroup.fees;
                        this.payment = payment;
                        this.paymentLibComponent.isFromServiceRequestPage = true;
                        this.isRefundRemission = true;
                    }
                }, (error) => this.errorMessage = error);
            }
        }
    }
    goToPayementView(paymentGroupReference, paymentReference, paymentMethod) {
        this.goToPaymentViewComponent({ paymentGroupReference, paymentReference, paymentMethod });
    }
    goToPaymentViewComponent(paymentGroup) {
        this.paymentLibComponent.paymentMethod = paymentGroup.paymentMethod;
        this.paymentLibComponent.isFromServiceRequestPage = true;
        this.paymentLibComponent.paymentGroupReference = paymentGroup.paymentGroupReference;
        this.paymentLibComponent.paymentReference = paymentGroup.paymentReference;
        this.OrderslistService.setOrderRef(this.orderRef);
        this.OrderslistService.setorderCCDEvent(this.orderCCDEvent);
        this.OrderslistService.setorderCreated(this.orderCreated);
        this.OrderslistService.setorderDetail(this.orderDetail);
        this.OrderslistService.setorderParty(this.orderParty);
        this.OrderslistService.setorderTotalPayments(this.orderTotalPayments);
        this.OrderslistService.setorderRemissionTotal(this.orderRemissionTotal);
        this.OrderslistService.setorderFeesTotal(this.orderFeesTotal);
        this.viewStatus = 'payment-view';
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
    selectPymentOption(paymentType) {
        this.paymentType = paymentType;
        this.isContinueBtnDisabled = false;
    }
    goToPaymentViewComp() {
        this.viewCompStatus = '';
        this.viewStatus = 'paymentview';
    }
    continuePayment(paymentgrp) {
        if (this.paymentType === 'op') {
            this.isFullyRefund = false;
            this.viewStatus = '';
            this.viewCompStatus = 'overPaymentAddressCapture';
        }
        else if (this.paymentType === 'fp') {
            this.isFullyRefund = true;
            this.paymentGroupList = paymentgrp;
            this.viewStatus = 'issuerefund';
            this.viewCompStatus = "";
            this.isRefundRemission = true;
            this.paymentLibComponent.isFromPaymentDetailPage = true;
            this.isFromPaymentDetailPage = true;
            this.isFromServiceRequestPage = this.paymentLibComponent.isFromServiceRequestPage;
        }
    }
    getContactDetails(obj) {
        this.contactDetailsObj = obj;
        this.viewStatus = '';
        this.viewCompStatus = 'overpaymentcheckandanswer';
        this.getTemplateInstructionType(this.paymentGroupList.payments[0]);
        this.notificationPreview = false;
    }
    gotoPaymentSelectPage(event) {
        event.preventDefault();
        this.viewStatus = '';
        this.viewCompStatus = 'overpayment';
    }
    gotoAddressPage(note) {
        if (note) {
            this.notification = { contact_details: note, notification_type: note.notification_type };
        }
        this.errorMessage = '';
        this.viewStatus = '';
        this.viewCompStatus = 'overPaymentAddressCapture';
    }
    processRefund() {
        this.isConfirmationBtnDisabled = true;
        this.errorMessage = '';
        const obj = this.paymentGroupList.fees[0];
        this.fees = [{ id: obj.id,
                code: obj.code,
                version: obj.version,
                apportion_amount: obj.apportion_amount,
                calculated_amount: obj.calculated_amount,
                updated_volume: obj.updated_volume ? obj.updated_volume : obj.volume,
                volume: obj.volume,
                refund_amount: this.getOverPaymentValue() }];
        const requestBody = new PostRefundRetroRemission(this.contactDetailsObj, this.fees, this.paymentGroupList.payments[0].reference, 'RR037', this.getOverPaymentValue(), 'op');
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
    getOverPaymentValue() {
        let feesOverPayment = 0;
        this.paymentGroupList.fees.forEach(fee => {
            feesOverPayment += fee.over_payment;
        });
        return feesOverPayment > 0 ? feesOverPayment : this.paymentGroupList.payments[0].over_payment;
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
    static ɵfac = function ServiceRequestComponent_Factory(t) { return new (t || ServiceRequestComponent)(i0.ɵɵdirectiveInject(i1.PaymentLibComponent), i0.ɵɵdirectiveInject(i2.PaymentViewService), i0.ɵɵdirectiveInject(i3.OrderslistService), i0.ɵɵdirectiveInject(i4.NotificationService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i5.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ServiceRequestComponent, selectors: [["ccpay-service-request"]], inputs: { LOGGEDINUSERROLES: "LOGGEDINUSERROLES", viewStatus: "viewStatus", orderDetail: "orderDetail", orderRef: "orderRef", orderStatus: "orderStatus", orderParty: "orderParty", orderCreated: "orderCreated", orderCCDEvent: "orderCCDEvent", orderFeesTotal: "orderFeesTotal", orderTotalPayments: "orderTotalPayments", orderRemissionTotal: "orderRemissionTotal", paymentGroupList: "paymentGroupList", takePayment: "takePayment", ccdCaseNumber: "ccdCaseNumber", isServiceRequest: "isServiceRequest" }, outputs: { goToServiceRquestComponent: "goToServiceRquestComponent" }, decls: 12, vars: 11, consts: [[4, "ngIf"], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "fee", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "isServiceRequest", "paymentGroupRef", "isFromServiceRequestPage", "payment", "ccdCaseNumber", "orderRef", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "LOGGEDINUSERROLES", "takepayment", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal", 4, "ngIf"], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "isFromServiceRequestPage", "isFromPaymentDetailPage", "payment", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "paymentGroupRef", "ccdCaseNumber", "orderRef", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "isFullyRefund", "fees", "LOGGEDINUSERROLES", "isFromRefundListPage", "takepayment", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal", 4, "ngIf"], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "payment", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "feeamount", "remission", "isFromServiceRequestPage", "ccdCaseNumber", "orderRef", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "LOGGEDINUSERROLES", "takepayment", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal", 4, "ngIf"], [3, "LOGGEDINUSERROLES", "isTurnOff", "isTakePayment", "caseType", "orderRef", "orderStatus", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal", "isServiceRequest", 4, "ngIf"], [1, "over-payment"], [3, "isFromServiceRequestPage", "LOGGEDINUSERROLES", "isTakePayment", 4, "ngIf"], [1, "govuk-breadcrumbs"], [1, "govuk-breadcrumbs__list"], ["class", "govuk-breadcrumbs__list-item", 4, "ngIf"], [1, "govuk-grid-column-full"], [1, "column"], [1, "heading-large", "govuk-!-margin-top-0"], [1, "section"], [1, "bold", "tb-col-w"], [1, "govuk-grid-column-full", "order-class"], [1, "govuk-table"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["class", "govuk-table__header col-51", "scope", "col", 4, "ngIf"], ["class", "govuk-table__header col-51", "scope", "col", "colspan", "2", 4, "ngIf"], ["scope", "col", 1, "govuk-table__header"], ["class", "govuk-table__header", "scope", "col", 4, "ngIf"], ["class", "govuk-table__body", 4, "ngFor", "ngForOf"], [1, "maxwidth"], [1, "totalfees"], [4, "ngFor", "ngForOf"], [1, "govuk-breadcrumbs__list-item"], ["href", "javascript:void(0)", 1, "govuk-back-link", 3, "click"], ["href", "javascript:void(0)", "id", "bckLnksize", 1, "govuk-back-link", 3, "click"], ["scope", "col", 1, "govuk-table__header", "col-51"], ["scope", "col", "colspan", "2", 1, "govuk-table__header", "col-51"], [1, "govuk-table__body"], ["class", "govuk-table__row", 4, "ngFor", "ngForOf"], ["class", "govuk-table__cell col-60 whitespace-inherit", 4, "ngIf"], ["class", "govuk-table__cell col-60 whitespace-inherit", "colspan", "2", 4, "ngIf"], [1, "govuk-table__cell"], ["class", "govuk-table__cell alignright", 4, "ngIf"], [1, "govuk-table__cell", "col-60", "whitespace-inherit"], ["colspan", "2", 1, "govuk-table__cell", "col-60", "whitespace-inherit"], [1, "govuk-table__cell", "alignright"], [1, "govuk-button", "govuk-button--secondary", 3, "disabled", "click"], ["class", "govuk-table__row", 4, "ngIf"], ["colspan", "7", 1, "govuk-table__cell", "alignleft"], ["class", "govuk-grid-column-full order-class", 4, "ngIf"], ["scope", "col", 1, "govuk-table__header", "col-24", "whitespace-inherit"], ["scope", "col", 1, "govuk-table__header", "col-27", "whitespace-inherit"], ["scope", "col", 1, "govuk-table__header", "whitespace-inherit"], ["scope", "col", 1, "govuk-table__header", "whitespace-inherit", "refundBtn"], ["class", "govuk-table__body", 4, "ngIf"], [1, "summarypagealign"], [1, "summarypage"], [1, "govuk-table__cell", "whitespace-inherit"], [1, "govuk-table__cell", "refundBtn", "whitespace-inherit"], ["class", "govuk-grid-column-full", 4, "ngIf"], [1, "heading-medium"], ["scope", "col", 1, "govuk-table__header", "col-25"], ["href", "javascript:void(0)", 3, "click"], [1, "mar-17"], [1, "totalPay"], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "fee", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "isServiceRequest", "paymentGroupRef", "isFromServiceRequestPage", "payment", "ccdCaseNumber", "orderRef", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "LOGGEDINUSERROLES", "takepayment", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal"], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "isFromServiceRequestPage", "isFromPaymentDetailPage", "payment", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "paymentGroupRef", "ccdCaseNumber", "orderRef", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "isFullyRefund", "fees", "LOGGEDINUSERROLES", "isFromRefundListPage", "takepayment", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal"], [3, "isTurnOff", "isStrategicFixEnable", "viewCompStatus", "payment", "orderStatus", "paidAmount", "isRefundRemission", "caseType", "feeamount", "remission", "isFromServiceRequestPage", "ccdCaseNumber", "orderRef", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "LOGGEDINUSERROLES", "takepayment", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal"], [3, "LOGGEDINUSERROLES", "isTurnOff", "isTakePayment", "caseType", "orderRef", "orderStatus", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal", "isServiceRequest"], [1, "govuk-warning-text"], ["aria-hidden", "true", 1, "govuk-warning-text__icon"], [1, "govuk-warning-text__text"], [1, "govuk-warning-text__assistive"], [1, "govuk-button-grb"], ["novalidate", ""], ["type", "submit", 1, "button", "govuk-button--secondary", 3, "click"], ["type", "submit", 1, "button", 3, "disabled", "ngClass", "click"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "OVERPAYMENTPAGE"], ["myInput", ""], [1, "heading-large"], ["id", "how-contacted-conditional-hint govuk-font19px", 1, "form-hint"], [1, "govuk-form-group"], [1, "govuk-fieldset"], [1, "govuk-fieldset__legend", "govuk-fieldset__legend--l"], ["data-module", "govuk-radios", 1, "govuk-radios"], [1, "govuk-radios__item"], ["id", "over-payment", "name", "over-payment", "type", "radio", "value", "op", 1, "govuk-radios__input", 3, "click"], ["for", "where-do-you-live", 1, "govuk-label", "govuk-radios__label", "govuk-font19px"], ["id", "full-payment", "name", "over-payment", "type", "radio", "value", "fp", 1, "govuk-radios__input", 3, "click"], ["for", "where-do-you-live-2", 1, "govuk-label", "govuk-radios__label", "govuk-font19px"], [1, "govuk-button", "govuk-button--secondary", "over-payment-alignment", "govuk-font19px", 3, "click"], [1, "govuk-button", 3, "disabled", "ngClass", "click"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "OVERPAYMENTADDRESSCAPTUREPAGE"], [1, "govuk-heading-l"], [1, "govuk-heading-m", "govuk-font19px"], ["id", "how-contacted-conditional-hint", 1, "govuk-hint", "govuk-font19px"], [3, "addressObj", "assignContactDetails", "redirectToIssueRefund"], ["data-module", "govuk-button", 1, "govuk-link", 3, "click"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "ADDREFUNDFORREMISSION"], [1, "govuk-table", "govuk-table-mb"], [1, "govuk-table__cell", "govuk-!-font-weight-bold"], ["class", "contactDetails-width", 4, "ngIf"], [1, "govuk-link", "right", 3, "click"], ["href", "Javascript:void(0)", "class", "govuk-link right", 3, "click", 4, "ngIf"], [3, "payment", "contactDetails", "refundReason", "refundAmount", 4, "ngIf"], ["type", "submit", 1, "button", "govuk-button--secondary", "over-payment-alignment", "govuk-font19px", 3, "click"], ["type", "submit", 3, "ngClass", "click"], ["href", "javascript:void(0)", "data-module", "govuk-button", 1, "govuk-link", "govuk-font19px", 3, "click"], [1, "contactDetails-width"], ["href", "Javascript:void(0)", 1, "govuk-link", "right", 3, "click"], [3, "payment", "contactDetails", "refundReason", "refundAmount"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "RETROREMISSIONREFUNDCONFIRMATIONPAGE"], [1, "govuk-grid-row", "pagesize"], [1, "govuk-panel", "govuk-panel--confirmation"], [1, "govuk-panel__title"], [1, "govuk-panel__body"], [1, "govuk-body", "white"], [1, "govuk-body"], ["href", "javascript:void(0)", "data-module", "govuk-button", 1, "govuk-link", "pointer", 3, "click"], [3, "isFromServiceRequestPage", "LOGGEDINUSERROLES", "isTakePayment"]], template: function ServiceRequestComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ServiceRequestComponent_ng_container_0_Template, 58, 24, "ng-container", 0);
            i0.ɵɵtemplate(1, ServiceRequestComponent_ccpay_add_remission_1_Template, 1, 24, "ccpay-add-remission", 1);
            i0.ɵɵtemplate(2, ServiceRequestComponent_ccpay_add_remission_2_Template, 1, 26, "ccpay-add-remission", 2);
            i0.ɵɵtemplate(3, ServiceRequestComponent_ccpay_add_remission_3_Template, 1, 23, "ccpay-add-remission", 3);
            i0.ɵɵtemplate(4, ServiceRequestComponent_ccpay_payment_view_4_Template, 1, 14, "ccpay-payment-view", 4);
            i0.ɵɵtemplate(5, ServiceRequestComponent_ng_container_5_Template, 14, 2, "ng-container", 0);
            i0.ɵɵelementStart(6, "div", 5);
            i0.ɵɵtemplate(7, ServiceRequestComponent_ng_container_7_Template, 30, 14, "ng-container", 0);
            i0.ɵɵtemplate(8, ServiceRequestComponent_ng_container_8_Template, 14, 5, "ng-container", 0);
            i0.ɵɵtemplate(9, ServiceRequestComponent_ng_container_9_Template, 63, 27, "ng-container", 0);
            i0.ɵɵtemplate(10, ServiceRequestComponent_ng_container_10_Template, 20, 7, "ng-container", 0);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(11, ServiceRequestComponent_ccpay_case_transactions_11_Template, 1, 3, "ccpay-case-transactions", 6);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "order-full-view");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "addremission" && ctx.feeId);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "issuerefund" && ctx.payment);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "addrefundforremission" && ctx.payment);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "payment-view");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "feeRemovalConfirmation");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.viewCompStatus === "overpayment");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewCompStatus === "overPaymentAddressCapture");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewCompStatus === "overpaymentcheckandanswer");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "refundconfirmationpage" && ctx.viewCompStatus !== "overpayment" && ctx.viewCompStatus !== "overPaymentAddressCapture" && ctx.viewCompStatus !== "overpaymentcheckandanswer");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "case-transactions");
        } }, styles: [".govuk-grid-column-full--gr[_ngcontent-%COMP%]{position:relative;margin-bottom:10px}.disable[_ngcontent-%COMP%]{text-decoration:none;cursor:default;color:#fff;background-color:gray;pointer-events:none}.pagesize[_ngcontent-%COMP%]{margin:2em;width:97%}.govuk-grid__surplus-payments[_ngcontent-%COMP%]{margin:20px 0}.govuk-grid__surplus-payments[_ngcontent-%COMP%] > .govuk-grid-column-full[_ngcontent-%COMP%]{padding:0}.govuk-grid__surplus-payments-col1[_ngcontent-%COMP%]{margin-bottom:10px}.govuk-inset-text__no-border[_ngcontent-%COMP%]{border-left:0px}.govuk-hidetext[_ngcontent-%COMP%]{font-size:22px;padding-bottom:10px}.lowercase[_ngcontent-%COMP%]{text-transform:lowercase}.channel[_ngcontent-%COMP%]:first-letter{text-transform:uppercase}.govuk-heading-xl[_ngcontent-%COMP%]{font-size:48px;margin-bottom:1px}.govuk-section-break--visible[_ngcontent-%COMP%]{border-bottom:2px solid black}.totalpayments.govuk-table__row[_ngcontent-%COMP%]{border-bottom:2px solid black!important}.govuk-inset-text[_ngcontent-%COMP%]{margin-left:1em}.govuk-button[_ngcontent-%COMP%]{font-size:19px;margin-bottom:0!important}.groupamount.govuk-table__header[_ngcontent-%COMP%], .govuk-table__cell.govuk-table__cell--col6.govuk-table__custom--col6[_ngcontent-%COMP%]{text-align:right}.feeclass[_ngcontent-%COMP%]{padding-left:.7em}.align-center[_ngcontent-%COMP%]{text-align:center}details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{display:list-item}.case-transaction__color[_ngcontent-%COMP%]{color:#a71414;font-weight:700;text-align:center}.capitalize[_ngcontent-%COMP%]:first-letter{text-transform:uppercase}.govuk-inset-text__no-left-margin[_ngcontent-%COMP%]{margin-left:0;padding-left:0}.whitespace-inherit[_ngcontent-%COMP%]{white-space:inherit!important}.govuk-section-records-break[_ngcontent-%COMP%]{margin:10px;border-bottom:2px solid black!important}.exisitng-fees[_ngcontent-%COMP%]{margin-left:12px}.add-telephony-payment[_ngcontent-%COMP%]{margin-top:-2em;margin-left:-2em}.govuk-table__header--custom[_ngcontent-%COMP%]{text-align:center}.disable-link[_ngcontent-%COMP%]{cursor:default;pointer-events:none;color:#8e8c8c}.panel-no--style[_ngcontent-%COMP%]{border-left-style:none}.col-28[_ngcontent-%COMP%]{width:28%!important}.col-8[_ngcontent-%COMP%]{width:8%!important}.col-60[_ngcontent-%COMP%]{width:60%!important}.col-32[_ngcontent-%COMP%]{width:32%!important}.col-34[_ngcontent-%COMP%]{width:34%!important}#bckLnksize[_ngcontent-%COMP%]{font-size:16px!important}.col-15[_ngcontent-%COMP%]{width:15%!important;padding-right:0!important;padding-left:0!important}.col-16[_ngcontent-%COMP%]{width:16%!important}.col-14[_ngcontent-%COMP%]{width:14%!important}.col-17[_ngcontent-%COMP%]{width:17%!important}.col-12[_ngcontent-%COMP%]{width:12%!important}.col-9[_ngcontent-%COMP%]{width:9%!important}.col-10[_ngcontent-%COMP%]{width:10%!important}.col-11[_ngcontent-%COMP%]{width:11%!important}.col-13[_ngcontent-%COMP%]{width:13%!important}.col-21[_ngcontent-%COMP%]{width:21%!important}.col-20[_ngcontent-%COMP%]{width:20%!important}.col-24[_ngcontent-%COMP%]{width:24%!important}.govuk-table__cell[_ngcontent-%COMP%], .govuk-table__header[_ngcontent-%COMP%]{padding:10px 10px 10px 0}.col-27[_ngcontent-%COMP%]{width:27%!important}td[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden!important}.col-19[_ngcontent-%COMP%]{width:19%!important;padding-left:0!important}.col-18[_ngcontent-%COMP%]{width:18%!important;padding-left:0!important;padding-right:0!important}.col-37[_ngcontent-%COMP%]{width:37%!important}.col-55[_ngcontent-%COMP%]{width:55%!important}.govuk-table[_ngcontent-%COMP%]{margin-bottom:1px}.hmcts-banner[_ngcontent-%COMP%] > .hmcts-banner__message[_ngcontent-%COMP%]{font-size:19px;line-height:1.25}.summary-table-font[_ngcontent-%COMP%]{font-size:36px}.order-class[_ngcontent-%COMP%]{padding-top:3em}.govuk-table__header[_ngcontent-%COMP%]:last-child{text-align:right}.govuk-table__cell[_ngcontent-%COMP%]:last-child{text-align:right}.govuk-grid-column-two-thirds[_ngcontent-%COMP%]{width:64%!important;padding:0!important}.govuk-heading-l[_ngcontent-%COMP%]{font-size:36px;margin-bottom:10px}.paymentrequest[_ngcontent-%COMP%]{margin-top:1em}.mar-17[_ngcontent-%COMP%]{margin-left:17px}.col-61[_ngcontent-%COMP%]{width:61px!important;padding:0!important}.error[_ngcontent-%COMP%]{width:960px;margin:auto}.summarypage[_ngcontent-%COMP%]{padding-left:36em;margin-top:2em}.summarypagealign[_ngcontent-%COMP%]{width:100%;text-align:right;margin-top:2em}.govuk-inset-text[_ngcontent-%COMP%]{font-size:2.1875rem}table[_ngcontent-%COMP%]{table-layout:fixed;width:100%}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{word-wrap:break-word}.totalPay[_ngcontent-%COMP%]{padding-right:14px;float:right;margin-top:2em}.govuk-back-link[_ngcontent-%COMP%]{font-size:1.5rem!important}.totalfees[_ngcontent-%COMP%]{float:right;margin-top:2em}.refundBtn[_ngcontent-%COMP%]{text-align:right;width:18%}.col-25[_ngcontent-%COMP%]{width:25%!important}.col-51[_ngcontent-%COMP%]{width:51%!important}.alignright[_ngcontent-%COMP%]{text-align:right}.alignleft[_ngcontent-%COMP%]{text-align:left}.alignself[_ngcontent-%COMP%]{align-self:flex-end}.maxwidth[_ngcontent-%COMP%]{width:100%}.over-payment[_ngcontent-%COMP%]   .govuk-table-mb[_ngcontent-%COMP%]{margin-bottom:20px}.over-payment[_ngcontent-%COMP%]   .contactDetails-width[_ngcontent-%COMP%]{width:70%}.over-payment[_ngcontent-%COMP%]   .margin-top10px[_ngcontent-%COMP%]{margin-top:20px}.over-payment[_ngcontent-%COMP%]   .govuk-font19px[_ngcontent-%COMP%]{font-size:19px!important}.over-payment[_ngcontent-%COMP%]   .margin-top--size[_ngcontent-%COMP%]{margin-top:-30px}.over-payment[_ngcontent-%COMP%]   .over-payment-alignment[_ngcontent-%COMP%]{margin-right:10px}.over-payment[_ngcontent-%COMP%]   .govuk-button[_ngcontent-%COMP%]{font-size:19px;float:left;margin-top:2em}.over-payment[_ngcontent-%COMP%]   td.govuk-table__cell[_ngcontent-%COMP%]{width:50%;text-align:left}.over-payment[_ngcontent-%COMP%]   .govuk-warning-text__text[_ngcontent-%COMP%], .over-payment[_ngcontent-%COMP%]   .govuk-label--s[_ngcontent-%COMP%], .over-payment[_ngcontent-%COMP%]   .hmcts-currency-input__symbol[_ngcontent-%COMP%]{font-size:19px;font-weight:400}.over-payment[_ngcontent-%COMP%]   .inline-error-class[_ngcontent-%COMP%]{outline:3px solid #a71414;outline-offset:0;border-color:#a71414}.over-payment[_ngcontent-%COMP%]   .inline-error-message[_ngcontent-%COMP%]{color:#a71414;border-color:#a71414;font-weight:700;margin-top:10px;font-size:20px}.over-payment[_ngcontent-%COMP%]   .govuk-button-group[_ngcontent-%COMP%]{padding-top:2em}.over-payment[_ngcontent-%COMP%]   .heading-medium[_ngcontent-%COMP%]{margin-top:.875em}.over-payment[_ngcontent-%COMP%]   .heading-large[_ngcontent-%COMP%]{margin-top:.25em}.over-payment[_ngcontent-%COMP%]   .govuk-panel--confirmation[_ngcontent-%COMP%]{color:#fff;background:#00703C}.over-payment[_ngcontent-%COMP%]   .govuk-panel__title[_ngcontent-%COMP%]{font-size:5rem}.over-payment[_ngcontent-%COMP%]   .govuk-body-m[_ngcontent-%COMP%], .over-payment[_ngcontent-%COMP%]   .govuk-body[_ngcontent-%COMP%]{font-size:2.1875rem}.over-payment[_ngcontent-%COMP%]   .govuk-link[_ngcontent-%COMP%]{cursor:pointer}.over-payment[_ngcontent-%COMP%]   .govuk-radios__conditional[_ngcontent-%COMP%]{padding-top:12px!important}.over-payment[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]{float:right;cursor:pointer}.over-payment[_ngcontent-%COMP%]   .radio[_ngcontent-%COMP%]{float:right}.over-payment[_ngcontent-%COMP%]   .white[_ngcontent-%COMP%]{color:#fff}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ServiceRequestComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-service-request', template: "<!-- Order Full View Details-->\n<ng-container *ngIf=\"viewStatus === 'order-full-view'\">\n  <div class=\"govuk-breadcrumbs\">\n      <ol class=\"govuk-breadcrumbs__list\">\n        <li class=\"govuk-breadcrumbs__list-item\" *ngIf=\"isServiceRequest === 'false'\">\n          <a href=\"javascript:void(0)\" (click)=\"goToCaseTransationPage($event)\" class=\"govuk-back-link\">Back</a>\n        </li>\n        <li class=\"govuk-breadcrumbs__list-item\" *ngIf=\"isServiceRequest !== 'false'\">\n          <a href=\"javascript:void(0)\" (click)=\"goToServiceRequestPage()\" id=\"bckLnksize\" class=\"govuk-back-link\">Back</a>\n        </li>\n      </ol>\n    </div>\n  <div class=\"govuk-grid-column-full\">\n      <div class=\"column\">\n        <h1 class=\"heading-large govuk-!-margin-top-0\">Service request</h1>\n      </div>\n      <table >\n          <tbody>\n            <tr class=\"section\">\n              <td class=\"bold tb-col-w\">Service request reference</td>\n              <td>{{orderRef}}</td>\n            </tr>\n            <tr class=\"section\">\n              <td class=\"bold tb-col-w\">Status</td>\n              <td>{{orderStatus}}</td>\n            </tr>\n            <tr class=\"section\">\n              <td class=\"bold tb-col-w\">Date created</td>\n              <td>{{orderCreated | date:'dd MMMM yyyy'}}</td>\n            </tr>\n            <tr class=\"section\">\n              <td class=\"bold tb-col-w\">Party</td>\n              <td>{{orderParty}}</td>\n            </tr>\n            <tr class=\"section\">\n              <td class=\"bold tb-col-w\">CCD event</td>\n              <td>{{orderCCDEvent}}</td>\n            </tr>\n          </tbody>\n        </table>\n  </div>\n\n  <div class=\"govuk-grid-column-full order-class\">\n      <div class=\"column\">\n        <table class=\"govuk-table \">\n          <thead class=\"govuk-table__head\">\n          <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__header col-51\" scope=\"col\" *ngIf=\"isServiceRequest === 'false'\">Fee</td>\n            <td class=\"govuk-table__header col-51\" scope=\"col\" colspan=\"2\" *ngIf=\"isServiceRequest !== 'false'\">Fee</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Amount</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Total</td>\n            <td  class=\"govuk-table__header\" scope=\"col\" *ngIf=\"isServiceRequest === 'false'\"></td>\n          </tr>\n          </thead>\n          <tbody class=\"govuk-table__body\" *ngFor=\"let order of orderDetail;\">\n            <tr class=\"govuk-table__row\" *ngFor=\"let fee of order.fees; let i = index;\">\n              <td class=\"govuk-table__cell col-60 whitespace-inherit\" *ngIf=\"isServiceRequest === 'false'\">{{fee.description}}</td>\n              <td class=\"govuk-table__cell col-60 whitespace-inherit\" colspan=\"2\" *ngIf=\"isServiceRequest !== 'false'\">{{fee.description}}</td>\n              <td class=\"govuk-table__cell\">{{fee.volume? fee.volume : '-'}} X {{ fee.calculated_amount/fee.volume| currency:'GBP':'symbol-narrow':'1.2-2' }}</td>\n              <td class=\"govuk-table__cell\">{{ fee?.net_amount | currency:'GBP':'symbol-narrow':'1.2-2' }}</td>\n              <td class=\"govuk-table__cell alignright\" *ngIf=\"isServiceRequest === 'false'\">\n                  <button [disabled]=\"!chkIsAddRemissionBtnEnable(fee)\"   (click)=\"addRemission(fee)\" class=\"govuk-button govuk-button--secondary\"> Add remission</button>\n              </td>\n\n            </tr>\n          </tbody>\n          <tbody class=\"govuk-table__body\" *ngFor=\"let order of orderDetail;\">\n            <tr class=\"govuk-table__row\" *ngIf=\"order.fees?.length === 0\" >\n              <td class=\"govuk-table__cell alignleft\" colspan=\"7\">No fees recorded</td>\n            </tr>\n          </tbody>\n        </table>\n\n      </div>\n      <div class=\"maxwidth\">\n          <p class=\"totalfees\">Total fees: {{orderFeesTotal | currency:'GBP':'symbol-narrow':'1.2-2' }}</p>\n      </div>\n  </div>\n   <!-- remissions -->\n<ng-container *ngFor=\"let order of orderDetail;\" >\n   <div class=\"govuk-grid-column-full order-class\" *ngIf=\"order.remissions\">\n   <table class=\"govuk-table\">\n     <thead class=\"govuk-table__head\">\n       <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__header col-24 whitespace-inherit\" scope=\"col\">Help with fees or remission code</td>\n           <td class=\"govuk-table__header col-27 whitespace-inherit\" scope=\"col\">Reference</td>\n           <td class=\"govuk-table__header whitespace-inherit\" scope=\"col\">Fee</td>\n           <td class=\"govuk-table__header whitespace-inherit\" scope=\"col\">Amount</td>\n           <td  class=\"govuk-table__header whitespace-inherit refundBtn\" scope=\"col\"></td>\n         </tr>\n     </thead>\n     <tbody  *ngIf=\"order.remissions?.length > 0\"  class=\"govuk-table__body\" >\n       <tr class=\"govuk-table__row\" *ngFor=\"let remission of order.remissions\">\n          <td class=\"govuk-table__cell whitespace-inherit\">{{ remission?.hwf_reference }}</td>\n           <td class=\"govuk-table__cell whitespace-inherit\">{{ remission?.remission_reference }}</td>\n           <td class=\"govuk-table__cell whitespace-inherit\">{{ remission?.fee_code }}</td>\n           <td class=\"govuk-table__cell whitespace-inherit\">{{ remission?.hwf_amount | currency:'GBP':'symbol-narrow':'1.2-2'}}</td>\n           <td class=\"govuk-table__cell refundBtn whitespace-inherit\"  >\n              <button  [disabled]=\"!chkIsAddRefundBtnEnable(remission)\" (click)=\"addRefundForRemission(order.payments[0],remission,order.fees)\" class=\"govuk-button govuk-button--secondary\"> Add refund</button>\n           </td>\n           <!-- <td  class=\"govuk-table__cell refundBtn whitespace-inherit\"  >\n\n         </td> -->\n         </tr>\n     </tbody>\n\n\n   </table>\n   <div *ngIf=\"order.remissions?.length === 0\">\n    <span >No help with fees or remissions.</span>\n </div>\n   <div class=\"summarypagealign\">\n      <p>Total reductions: {{orderRemissionTotal | currency:'GBP':'symbol-narrow':'1.2-2'  }}</p>\n  </div>\n  <div class=\"summarypagealign\">\n        <p class=\"summarypage\">Total fees to pay: {{(orderFeesTotal - orderRemissionTotal) | currency:'GBP':'symbol-narrow':'1.2-2'  }}</p>\n    </div>\n  </div>\n\n</ng-container>\n\n   <!--Payments-->\n  <ng-container *ngFor=\"let order of orderDetail;\" >\n   <div class=\"govuk-grid-column-full\" *ngIf=\"order.payments\">\n      <h3 class=\"heading-medium\">Payments</h3>\n   <table class=\"govuk-table \">\n      <thead class=\"govuk-table__head\">\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__header col-25\" scope=\"col\"></td>\n            <td class=\"govuk-table__header\" scope=\"col\">Date created</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Amount</td>\n            <td class=\"govuk-table__header\" scope=\"col\"></td>\n          </tr>\n      </thead>\n      <tbody  *ngIf=\"order.payments?.length > 0\" class=\"govuk-table__body\">\n        <tr class=\"govuk-table__row\"  *ngFor=\"let payment of order.payments\">\n            <td class=\"govuk-table__cell whitespace-inherit\">\n              <a href=\"javascript:void(0)\" (click)=\"goToPayementView(payment.paymentGroupReference, payment.reference, payment.method)\">Review</a>\n            </td>\n            <td class=\"govuk-table__cell whitespace-inherit\">{{ payment?.date_created | date:'dd MMM yyyy' }}</td>\n            <td class=\"govuk-table__cell whitespace-inherit\">{{ payment?.amount | currency:'GBP':'symbol-narrow':'1.2-2' }}</td>\n            <td class=\"govuk-table__cell alignright\">\n              <button [disabled]=\"!chkIsIssueRefundBtnEnable(payment)\"   (click)=\"issueRefund(payment)\" class=\"govuk-button govuk-button--secondary\">Issue refund</button>\n            </td>\n            <!-- <td  *ngIf=\"!chkIssueRefundBtnEnable(payment)\" class=\"govuk-table__cell\" style=\"text-align: right;\">\n            </td> -->\n          </tr>\n      </tbody>\n    </table>\n\n  <div *ngIf=\"order.payments === undefined || order.payments === null\">\n      <!-- <h3 class=\"heading-medium mar-17\">Payments</h3> -->\n            <span class=\"mar-17\" >No Payments recorded</span>\n  </div>\n</div>\n</ng-container>\n<div *ngIf=\"isServiceRequest === 'false'\">\n  <div *ngIf=\"((orderFeesTotal - orderRemissionTotal)- orderTotalPayments) > 0\" >\n      <p class=\"totalPay\">Total left to pay: <b>{{((orderFeesTotal - orderRemissionTotal)- orderTotalPayments )| currency:'GBP':'symbol-narrow':'1.2-2' }}</b> </p>\n  </div>\n  <div *ngIf=\"((orderFeesTotal - orderRemissionTotal)- orderTotalPayments) < 0\" >\n      <p class=\"totalPay\">Total left to pay: <b>0</b> </p>\n  </div>\n</div>\n</ng-container>\n\n<ccpay-add-remission *ngIf=\"viewStatus === 'addremission' && feeId\"\n[isTurnOff]=\"isTurnOff\"\n[isStrategicFixEnable]=\"isStrategicFixEnable\"\n[viewCompStatus]= \"viewStatus\"\n[fee]=\"feeId\"\n[orderStatus] =\"orderStatus\"\n[paidAmount]= \"orderTotalPayments\"\n[isRefundRemission]=\"isRefundRemission\"\n[caseType]=\"caseType\"\n[isServiceRequest] = \"isServiceRequest\"\n[paymentGroupRef]=\"orderRef\"\n[isFromServiceRequestPage] = \"true\"\n[payment] = \"payment\"\n[ccdCaseNumber]=\"ccdCaseNumber\"\n[orderRef] = \"orderRef\"\n[orderStatus] = \"orderStatus\"\n[orderCreated] = \"orderCreated\"\n[orderParty] = \"orderParty\"\n[orderCCDEvent] = \"orderCCDEvent\"\n[orderDetail] = \"orderDetail\"\n[LOGGEDINUSERROLES] = \"LOGGEDINUSERROLES\"\n[takepayment] = \"takePayment\"\n[orderFeesTotal] = \"orderFeesTotal\"\n[orderTotalPayments] = \"orderTotalPayments\"\n[orderRemissionTotal] = \"orderRemissionTotal\"\n></ccpay-add-remission>\n<ccpay-add-remission *ngIf=\"viewStatus === 'issuerefund' && payment\"\n[isTurnOff]=\"isTurnOff\"\n[isStrategicFixEnable]=\"isStrategicFixEnable\"\n[viewCompStatus]= \"viewStatus\"\n[isFromServiceRequestPage]=\"isFromServiceRequestPage\"\n[isFromPaymentDetailPage] = \"isFromPaymentDetailPage\"\n[payment]=\"payment\"\n[orderStatus] =\"orderStatus\"\n[paidAmount]= \"orderTotalPayments\"\n[isRefundRemission]=\"isRefundRemission\"\n[caseType]=\"caseType\"\n[paymentGroupRef]=\"orderRef\"\n[ccdCaseNumber]=\"ccdCaseNumber\"\n[orderRef] = \"orderRef\"\n[orderStatus] = \"orderStatus\"\n[orderCreated] = \"orderCreated\"\n[orderParty] = \"orderParty\"\n[orderCCDEvent] = \"orderCCDEvent\"\n[orderDetail] = \"orderDetail\"\n[isFullyRefund] = \"isFullyRefund\"\n[fees] = \"paymentFees\"\n[LOGGEDINUSERROLES] = \"LOGGEDINUSERROLES\"\n[isFromRefundListPage] = \"false\"\n[takepayment] = \"takePayment\"\n[orderFeesTotal] = \"orderFeesTotal\"\n[orderTotalPayments] = \"orderTotalPayments\"\n[orderRemissionTotal] = \"orderRemissionTotal\"></ccpay-add-remission>\n\n<ccpay-add-remission *ngIf=\"viewStatus === 'addrefundforremission' && payment\"\n[isTurnOff]=\"isTurnOff\"\n[isStrategicFixEnable]=\"isStrategicFixEnable\"\n[viewCompStatus]= \"viewStatus\"\n[payment]=\"payment\"\n[orderStatus] =\"orderStatus\"\n[paidAmount]= \"orderTotalPayments\"\n[isRefundRemission]=\"isRefundRemission\"\n[caseType]=\"caseType\"\n[feeamount]=\"remissionFeeAmt\"\n[remission] = \"remissions\"\n[isFromServiceRequestPage]=\"isServiceRequest\"\n[ccdCaseNumber]=\"ccdCaseNumber\"\n[orderRef] = \"orderRef\"\n[orderStatus] = \"orderStatus\"\n[orderCreated] = \"orderCreated\"\n[orderParty] = \"orderParty\"\n[orderCCDEvent] = \"orderCCDEvent\"\n[orderDetail] = \"orderDetail\"\n[LOGGEDINUSERROLES] = \"LOGGEDINUSERROLES\"\n[takepayment] = \"takePayment\"\n[orderFeesTotal] = \"orderFeesTotal\"\n[orderTotalPayments] = \"orderTotalPayments\"\n[orderRemissionTotal] = \"orderRemissionTotal\"></ccpay-add-remission>\n\n<ccpay-payment-view *ngIf=\"viewStatus === 'payment-view'\"\n[LOGGEDINUSERROLES] = \"LOGGEDINUSERROLES\"\n[isTurnOff] = \"isTurnOff\"\n[isTakePayment] = \"takePayment\"\n[caseType] = \"caseType\"\n[orderRef] = \"orderRef\"\n[orderStatus] = \"orderStatus\"\n[orderCreated] = \"orderCreated\"\n[orderParty] = \"orderParty\"\n[orderCCDEvent] = \"orderCCDEvent\"\n[orderDetail] = \"orderDetail\"\n[orderFeesTotal] = \"orderFeesTotal\"\n[orderTotalPayments] = \"orderTotalPayments\"\n[orderRemissionTotal] = \"orderRemissionTotal\"\n[isServiceRequest] = \"isServiceRequest\">\n</ccpay-payment-view>\n\n<ng-container *ngIf=\"viewStatus === 'feeRemovalConfirmation'\">\n<div class=\"govuk-warning-text\">\n  <span class=\"govuk-warning-text__icon\" aria-hidden=\"true\">!</span>\n  <strong class=\"govuk-warning-text__text\">\n    <span class=\"govuk-warning-text__assistive\">Warning</span>\n    Are you sure you want to delete this fee?\n  </strong>\n</div>\n<div class=\"govuk-button-grb\">\n  <form novalidate>\n    <button type=\"submit\" class=\"button govuk-button--secondary\" (click)=\"cancelRemoval()\">\n      Cancel\n    </button>\n    <button type=\"submit\" class=\"button\"\n    [disabled]=\"isRemoveBtnDisabled\"\n    [ngClass]='isRemoveBtnDisabled ? \"button button--disabled govuk-!-margin-right-1\" : \"button govuk-!-margin-right-1\"'\n    (click)=\"removeFee(feeId)\">\n      Remove\n    </button>\n  </form>\n</div>\n</ng-container>\n\n<div class=\"over-payment\">\n  <ng-container *ngIf=\"viewCompStatus === 'overpayment'\">\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='OVERPAYMENTPAGE'>\n    <h1 class=\"heading-large\">Issue refund</h1>\n    <h1 class=\"heading-medium\">Case reference: {{ccdCaseNumber | ccdHyphens }}</h1>\n    <span id=\"how-contacted-conditional-hint govuk-font19px\" class=\"form-hint\">\n      Payment reference: {{paymentGroupList?.payments[0]?.reference}}\n    </span>\n  <div class=\"govuk-form-group\">\n    <fieldset class=\"govuk-fieldset\">\n      <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--l\">\n        <h1 class=\"heading-medium\">Select payment to refund</h1>\n      </legend>\n      <div class=\"govuk-radios\" data-module=\"govuk-radios\">\n        <div class=\"govuk-radios__item\">\n          <input class=\"govuk-radios__input\" id=\"over-payment\" name=\"over-payment\" type=\"radio\" (click)=\"selectPymentOption('op')\" value=\"op\">\n          <label class=\"govuk-label govuk-radios__label govuk-font19px\" for=\"where-do-you-live\">\n            Over payment \u00A3{{getOverPaymentValue() | number:'.2'}}\n          </label>\n        </div>\n        <div class=\"govuk-radios__item\">\n          <input class=\"govuk-radios__input\" id=\"full-payment\" name=\"over-payment\" type=\"radio\" (click)=\"selectPymentOption('fp')\" value=\"fp\">\n          <label class=\"govuk-label govuk-radios__label govuk-font19px\" for=\"where-do-you-live-2\">\n            Full payment \u00A3{{paymentGroupList?.payments[0]?.amount | number:'.2'}}\n          </label>\n        </div>\n      </div>\n        <button class=\"govuk-button govuk-button--secondary over-payment-alignment govuk-font19px\"\n        (click)=\"goToPaymentViewComp()\"> Previous</button>\n        <button\n        (click)=\"continuePayment(paymentGroupList)\"\n        [disabled]=\"isContinueBtnDisabled\"\n        [ngClass]='isContinueBtnDisabled ? \"button button--disabled govuk-!-margin-right-1 govuk-font19px\" : \"button govuk-!-margin-right-1 govuk-font19px\"'\n        class=\"govuk-button\"> Continue</button>\n    </fieldset>\n  </div>\n  </ng-container>\n\n  <ng-container *ngIf=\"viewCompStatus === 'overPaymentAddressCapture'\">\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='OVERPAYMENTADDRESSCAPTUREPAGE'>\n    <h1 class=\"govuk-heading-l\">Issue refund</h1>\n    <h2 class=\"govuk-heading-m govuk-font19px\">Case reference: {{ccdCaseNumber | ccdHyphens }}</h2>\n    <span id=\"how-contacted-conditional-hint\" class=\"govuk-hint govuk-font19px\">\n      Payment reference: {{paymentGroupList?.payments[0]?.reference}}\n    </span>\n  <ccpay-contact-details\n  [addressObj] = notification\n  (assignContactDetails)=\"getContactDetails($event)\"\n  (redirectToIssueRefund)=\"gotoPaymentSelectPage($event)\" ></ccpay-contact-details>\n  <p>\n      <a (click)=\"goToCaseTransationPage($event)\" class=\"govuk-link\" data-module=\"govuk-button\">\n          Cancel\n      </a>\n  </p>\n  </ng-container>\n\n  <ng-container *ngIf=\"viewCompStatus === 'overpaymentcheckandanswer'\">\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='ADDREFUNDFORREMISSION'>\n    <div class=\"govuk-warning-text\">\n\n        <h1 class=\"heading-large\"> Check your answers</h1>\n    </div>\n    <table class=\"govuk-table govuk-table-mb\">\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment reference</td>\n            <td class=\"govuk-table__cell\">{{paymentGroupList.payments[0].reference}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment amount</td>\n            <td class=\"govuk-table__cell\">{{paymentGroupList.payments[0].amount | currency:'GBP':'symbol-narrow':'1.2-2'}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Fee amount</td>\n            <td class=\"govuk-table__cell\">{{paymentGroupList?.fees[0]?.net_amount | currency:'GBP':'symbol-narrow':'1.2-2'}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Refund amount</td>\n            <td class=\"govuk-table__cell\">{{getOverPaymentValue() | currency:'GBP':'symbol-narrow':'1.2-2'}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Refund reason</td>\n            <td class=\"govuk-table__cell\">Over payment</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Send to</td>\n          <td class=\"govuk-table__cell\">{{orderParty}}</td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n        <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Send via</td>\n        <td class=\"govuk-table__cell whitespace-inherit\">\n          <div *ngIf=\"contactDetailsObj?.notification_type === 'EMAIL'\" class=\"contactDetails-width\">\n            <strong>Email</strong>\n            <br/>\n            {{contactDetailsObj?.email?.trim()}}\n          </div>\n          <div *ngIf=\"contactDetailsObj?.notification_type === 'LETTER'\" class=\"contactDetails-width\">\n            <strong>Post</strong>\n            <br/>\n            {{contactDetailsObj?.address_line?.trim()}}&nbsp;{{contactDetailsObj?.city?.trim()}}&nbsp;{{contactDetailsObj?.county?.trim()}}&nbsp;{{contactDetailsObj?.country?.trim()}}&nbsp;{{contactDetailsObj?.postal_code?.trim()}}\n          </div>\n          <a (click)=\"gotoAddressPage(contactDetailsObj)\" class=\"govuk-link right\" >Change</a>\n        </td>\n      </tr>\n\n      <tr class=\"govuk-table__row\">\n        <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Notification</td>\n        <td class=\"govuk-table__cell\">{{templateInstructionType}}\n            <a *ngIf=\"!notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"showNotificationPreview()\">\n              Preview\n            </a>\n            <a *ngIf=\"notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"hideNotificationPreview()\">\n              Hide Preview\n            </a>\n        </td>\n      </tr>\n    </table>\n\n    <app-notification-preview *ngIf=\"notificationPreview\"\n    [payment]=\"paymentGroupList.payments[0]\"\n    [contactDetails]=\"contactDetailsObj\"\n    [refundReason]=\"'RR037'\"\n    [refundAmount]=\"getOverPaymentValue()\"></app-notification-preview>\n\n\n    <button type=\"submit\" class=\"button govuk-button--secondary over-payment-alignment govuk-font19px\" (click)=\"gotoAddressPage(contactDetailsObj)\">Previous</button>\n    <button type=\"submit\"\n    [ngClass]='isContinueBtnDisabled ? \"button button--disabled govuk-!-margin-right-1 govuk-font19px\" : \"button govuk-!-margin-right-1 govuk-font19px\"'\n    (click)=\"processRefund()\">\n      Submit refund\n    </button>\n    <p>\n        <a href=\"javascript:void(0)\"  (click)=\"goToCaseTransationPage($event)\" class=\"govuk-link govuk-font19px\" data-module=\"govuk-button\">\n            Cancel\n        </a>\n    </p>\n\n  </ng-container>\n  <ng-container *ngIf=\"viewStatus === 'refundconfirmationpage' && viewCompStatus !== 'overpayment' && viewCompStatus !== 'overPaymentAddressCapture' && viewCompStatus !== 'overpaymentcheckandanswer'\">\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='RETROREMISSIONREFUNDCONFIRMATIONPAGE'>\n    <div class=\"govuk-grid-row pagesize\">\n      <div >\n        <div class=\"govuk-panel govuk-panel--confirmation\">\n          <h1 class=\"govuk-panel__title\">\n            Refund submitted\n          </h1>\n\n          <div class=\"govuk-panel__body\">\n            <p class=\"govuk-body white\"><strong>Refund reference: {{refundReference}}</strong></p>\n          </div>\n\n        </div>\n        <h2 class=\"govuk-heading-l\">What happens next</h2>\n        <p class=\"govuk-body\">\n          A refund request for {{refundAmount  | currency:'GBP':'symbol-narrow':'1.2-2' }} has been created and will be passed to a team leader to approve.\n        </p>\n      <p class=\"govuk-body\">\n      <a href=\"javascript:void(0)\" (click)=\"goToCaseTransationPage($event)\" class=\"govuk-link pointer\" data-module=\"govuk-button\">\n        Return to case\n    </a>\n      </p>\n      </div>\n    </div>\n\n  </ng-container>\n  </div>\n\n<ccpay-case-transactions *ngIf=\"viewStatus === 'case-transactions'\"\n[isFromServiceRequestPage]=\"isServiceRequest\"\n[LOGGEDINUSERROLES] = \"LOGGEDINUSERROLES\"\n[isTakePayment] = \"takePayment\">\n</ccpay-case-transactions>\n", styles: [".govuk-grid-column-full--gr{position:relative;margin-bottom:10px}.disable{text-decoration:none;cursor:default;color:#fff;background-color:gray;pointer-events:none}.pagesize{margin:2em;width:97%}.govuk-grid__surplus-payments{margin:20px 0}.govuk-grid__surplus-payments>.govuk-grid-column-full{padding:0}.govuk-grid__surplus-payments-col1{margin-bottom:10px}.govuk-inset-text__no-border{border-left:0px}.govuk-hidetext{font-size:22px;padding-bottom:10px}.lowercase{text-transform:lowercase}.channel:first-letter{text-transform:uppercase}.govuk-heading-xl{font-size:48px;margin-bottom:1px}.govuk-section-break--visible{border-bottom:2px solid black}.totalpayments.govuk-table__row{border-bottom:2px solid black!important}.govuk-inset-text{margin-left:1em}.govuk-button{font-size:19px;margin-bottom:0!important}.groupamount.govuk-table__header,.govuk-table__cell.govuk-table__cell--col6.govuk-table__custom--col6{text-align:right}.feeclass{padding-left:.7em}.align-center{text-align:center}details summary{display:list-item}.case-transaction__color{color:#a71414;font-weight:700;text-align:center}.capitalize:first-letter{text-transform:uppercase}.govuk-inset-text__no-left-margin{margin-left:0;padding-left:0}.whitespace-inherit{white-space:inherit!important}.govuk-section-records-break{margin:10px;border-bottom:2px solid black!important}.exisitng-fees{margin-left:12px}.add-telephony-payment{margin-top:-2em;margin-left:-2em}.govuk-table__header--custom{text-align:center}.disable-link{cursor:default;pointer-events:none;color:#8e8c8c}.panel-no--style{border-left-style:none}.col-28{width:28%!important}.col-8{width:8%!important}.col-60{width:60%!important}.col-32{width:32%!important}.col-34{width:34%!important}#bckLnksize{font-size:16px!important}.col-15{width:15%!important;padding-right:0!important;padding-left:0!important}.col-16{width:16%!important}.col-14{width:14%!important}.col-17{width:17%!important}.col-12{width:12%!important}.col-9{width:9%!important}.col-10{width:10%!important}.col-11{width:11%!important}.col-13{width:13%!important}.col-21{width:21%!important}.col-20{width:20%!important}.col-24{width:24%!important}.govuk-table__cell,.govuk-table__header{padding:10px 10px 10px 0}.col-27{width:27%!important}td{white-space:nowrap;overflow:hidden!important}.col-19{width:19%!important;padding-left:0!important}.col-18{width:18%!important;padding-left:0!important;padding-right:0!important}.col-37{width:37%!important}.col-55{width:55%!important}.govuk-table{margin-bottom:1px}.hmcts-banner>.hmcts-banner__message{font-size:19px;line-height:1.25}.summary-table-font{font-size:36px}.order-class{padding-top:3em}.govuk-table__header:last-child{text-align:right}.govuk-table__cell:last-child{text-align:right}.govuk-grid-column-two-thirds{width:64%!important;padding:0!important}.govuk-heading-l{font-size:36px;margin-bottom:10px}.paymentrequest{margin-top:1em}.mar-17{margin-left:17px}.col-61{width:61px!important;padding:0!important}.error{width:960px;margin:auto}.summarypage{padding-left:36em;margin-top:2em}.summarypagealign{width:100%;text-align:right;margin-top:2em}.govuk-inset-text{font-size:2.1875rem}table{table-layout:fixed;width:100%}th,td{word-wrap:break-word}.totalPay{padding-right:14px;float:right;margin-top:2em}.govuk-back-link{font-size:1.5rem!important}.totalfees{float:right;margin-top:2em}.refundBtn{text-align:right;width:18%}.col-25{width:25%!important}.col-51{width:51%!important}.alignright{text-align:right}.alignleft{text-align:left}.alignself{align-self:flex-end}.maxwidth{width:100%}.over-payment .govuk-table-mb{margin-bottom:20px}.over-payment .contactDetails-width{width:70%}.over-payment .margin-top10px{margin-top:20px}.over-payment .govuk-font19px{font-size:19px!important}.over-payment .margin-top--size{margin-top:-30px}.over-payment .over-payment-alignment{margin-right:10px}.over-payment .govuk-button{font-size:19px;float:left;margin-top:2em}.over-payment td.govuk-table__cell{width:50%;text-align:left}.over-payment .govuk-warning-text__text,.over-payment .govuk-label--s,.over-payment .hmcts-currency-input__symbol{font-size:19px;font-weight:400}.over-payment .inline-error-class{outline:3px solid #a71414;outline-offset:0;border-color:#a71414}.over-payment .inline-error-message{color:#a71414;border-color:#a71414;font-weight:700;margin-top:10px;font-size:20px}.over-payment .govuk-button-group{padding-top:2em}.over-payment .heading-medium{margin-top:.875em}.over-payment .heading-large{margin-top:.25em}.over-payment .govuk-panel--confirmation{color:#fff;background:#00703C}.over-payment .govuk-panel__title{font-size:5rem}.over-payment .govuk-body-m,.over-payment .govuk-body{font-size:2.1875rem}.over-payment .govuk-link{cursor:pointer}.over-payment .govuk-radios__conditional{padding-top:12px!important}.over-payment .right{float:right;cursor:pointer}.over-payment .radio{float:right}.over-payment .white{color:#fff}\n"] }]
    }], function () { return [{ type: i1.PaymentLibComponent }, { type: i2.PaymentViewService }, { type: i3.OrderslistService }, { type: i4.NotificationService }, { type: i0.ChangeDetectorRef }, { type: i5.Router }]; }, { LOGGEDINUSERROLES: [{
            type: Input,
            args: ['LOGGEDINUSERROLES']
        }], viewStatus: [{
            type: Input,
            args: ['viewStatus']
        }], orderDetail: [{
            type: Input,
            args: ['orderDetail']
        }], orderRef: [{
            type: Input,
            args: ['orderRef']
        }], orderStatus: [{
            type: Input,
            args: ['orderStatus']
        }], orderParty: [{
            type: Input,
            args: ['orderParty']
        }], orderCreated: [{
            type: Input,
            args: ['orderCreated']
        }], orderCCDEvent: [{
            type: Input,
            args: ['orderCCDEvent']
        }], orderFeesTotal: [{
            type: Input,
            args: ['orderFeesTotal']
        }], orderTotalPayments: [{
            type: Input,
            args: ['orderTotalPayments']
        }], orderRemissionTotal: [{
            type: Input,
            args: ['orderRemissionTotal']
        }], paymentGroupList: [{
            type: Input,
            args: ['paymentGroupList']
        }], takePayment: [{
            type: Input,
            args: ['takePayment']
        }], ccdCaseNumber: [{
            type: Input,
            args: ['ccdCaseNumber']
        }], isServiceRequest: [{
            type: Input,
            args: ["isServiceRequest"]
        }], goToServiceRquestComponent: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS1yZXF1ZXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9zZXJ2aWNlLXJlcXVlc3Qvc2VydmljZS1yZXF1ZXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9zZXJ2aWNlLXJlcXVlc3Qvc2VydmljZS1yZXF1ZXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHVFQUF1RTtBQUN2RSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBT2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUV0RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7Ozs7Ozs7O0lDVjdFLDhCQUE4RSxZQUFBO0lBQy9DLHNMQUFTLGVBQUEsc0NBQThCLENBQUEsSUFBQztJQUF5QixvQkFBSTtJQUFBLGlCQUFJLEVBQUE7Ozs7SUFFeEcsOEJBQThFLFlBQUE7SUFDL0MsZ0xBQVMsZUFBQSxnQ0FBd0IsQ0FBQSxJQUFDO0lBQXlDLG9CQUFJO0lBQUEsaUJBQUksRUFBQTs7O0lBdUM5Ryw4QkFBd0Y7SUFBQSxtQkFBRztJQUFBLGlCQUFLOzs7SUFDaEcsOEJBQW9H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QUFDLGtCQUFrQjtZQUNmLDBCQUEwQjtrQkFBbkMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IFRISVNfRVhQUiB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGF5bWVudExpYkNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3BheW1lbnQtbGliLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJUGF5bWVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVBheW1lbnQnO1xuaW1wb3J0IHsgSVJlbWlzc2lvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVJlbWlzc2lvbic7XG5pbXBvcnQgeyBJUGF5bWVudFZpZXcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lQYXltZW50Vmlldyc7XG5pbXBvcnQgeyBJT3JkZXJSZWZlcmVuY2VGZWUgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lPcmRlclJlZmVyZW5jZUZlZSc7XG5pbXBvcnQgeyBJRmVlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JRmVlJztcbmltcG9ydCB7IElQYXltZW50R3JvdXAgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lQYXltZW50R3JvdXAnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFBheW1lbnRWaWV3U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BheW1lbnQtdmlldy9wYXltZW50LXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZGVyc2xpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvb3JkZXJzbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IElSZWZ1bmRDb250YWN0RGV0YWlscyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVJlZnVuZENvbnRhY3REZXRhaWxzJztcbmltcG9ydCB7IFBvc3RSZWZ1bmRSZXRyb1JlbWlzc2lvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvUG9zdFJlZnVuZFJldHJvUmVtaXNzaW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NwYXktc2VydmljZS1yZXF1ZXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlcnZpY2UtcmVxdWVzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlcnZpY2UtcmVxdWVzdC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VSZXF1ZXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCdMT0dHRURJTlVTRVJST0xFUycpIExPR0dFRElOVVNFUlJPTEVTOiBzdHJpbmdbXTtcbiAgQElucHV0KCd2aWV3U3RhdHVzJykgdmlld1N0YXR1czogc3RyaW5nO1xuICBASW5wdXQoJ29yZGVyRGV0YWlsJykgb3JkZXJEZXRhaWw6IGFueVtdO1xuICBASW5wdXQoJ29yZGVyUmVmJykgb3JkZXJSZWY6IHN0cmluZztcbiAgQElucHV0KCdvcmRlclN0YXR1cycpIG9yZGVyU3RhdHVzOiBzdHJpbmc7XG4gIEBJbnB1dCgnb3JkZXJQYXJ0eScpIG9yZGVyUGFydHk6IHN0cmluZztcbiAgQElucHV0KCdvcmRlckNyZWF0ZWQnKSBvcmRlckNyZWF0ZWQ6IERhdGU7XG4gIEBJbnB1dCgnb3JkZXJDQ0RFdmVudCcpIG9yZGVyQ0NERXZlbnQ6IHN0cmluZztcbiAgQElucHV0KCdvcmRlckZlZXNUb3RhbCcpIG9yZGVyRmVlc1RvdGFsOiBudW1iZXI7XG4gIEBJbnB1dCgnb3JkZXJUb3RhbFBheW1lbnRzJykgb3JkZXJUb3RhbFBheW1lbnRzOiBudW1iZXI7XG4gIEBJbnB1dCgnb3JkZXJSZW1pc3Npb25Ub3RhbCcpIG9yZGVyUmVtaXNzaW9uVG90YWw6IG51bWJlcjtcbiAgQElucHV0KCdwYXltZW50R3JvdXBMaXN0JykgcGF5bWVudEdyb3VwTGlzdDogSVBheW1lbnRHcm91cDtcbiAgQElucHV0KCd0YWtlUGF5bWVudCcpIHRha2VQYXltZW50OiBib29sZWFuO1xuICBASW5wdXQoJ2NjZENhc2VOdW1iZXInKSBjY2RDYXNlTnVtYmVyOiBib29sZWFuO1xuICBASW5wdXQoXCJpc1NlcnZpY2VSZXF1ZXN0XCIpIGlzU2VydmljZVJlcXVlc3Q6IHN0cmluZztcbiAgQE91dHB1dCgpIGdvVG9TZXJ2aWNlUnF1ZXN0Q29tcG9uZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB2aWV3Q29tcFN0YXR1cztcbiAgc2VydmljZXJlcXVlc3Q6IHN0cmluZztcbiAgcGF5bWVudFR5cGU6IHN0cmluZztcbiAgZXhjUmVmZXJlbmNlOiBzdHJpbmc7XG4gIHBheW1lbnRHcm91cHM6IGFueVtdID0gW107XG4gIHBheW1lbnRzOiBJUGF5bWVudFtdID0gW107XG4gIG5vblBheW1lbnRzOiBJUGF5bWVudFtdID0gW107XG4gIGFsbFBheW1lbnRzOiBJUGF5bWVudFtdID0gW107XG4gIHJlbWlzc2lvbnM6IElSZW1pc3Npb25bXSA9IFtdO1xuICBwYXltZW50RmVlczogSUZlZVtdO1xuICBmZWVzOiBhbnk7XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICB0b3RhbEZlZXM6IG51bWJlcjtcbiAgdG90YWxQYXltZW50czogbnVtYmVyO1xuICB0b3RhbE5vbk9mZlBheW1lbnRzOiBudW1iZXI7XG4gIHRvdGFsUmVtaXNzaW9uczogbnVtYmVyO1xuICBzZWxlY3RlZE9wdGlvbjogc3RyaW5nO1xuICBkY25OdW1iZXI6IHN0cmluZztcbiAgcGF5bWVudFJlZjogc3RyaW5nO1xuICBpc1R1cm5PZmY6IGJvb2xlYW47XG4gIGlzUmVmdW5kUmVtaXNzaW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgaXNTdHJhdGVnaWNGaXhFbmFibGU6IGJvb2xlYW47XG4gIGlzQWRkRmVlQnRuRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIGlzRXhjZXB0aW9uUmVjb3JkOiBib29sZWFuID0gZmFsc2U7XG4gIGlzVW5wcm9jZXNzZWRSZWNvcmRTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBleGNlcHRpb25SZWNvcmRSZWZlcmVuY2U6IHN0cmluZztcbiAgaXNBbnlGZWVHcm91cEF2aWxhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgaXNIaXN0b3JpY0dyb3VwQXZhaWxhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIGlzQnVsa1NjYW5FbmFibGU7XG4gIGlzUmVtaXNzaW9uc01hdGNoOiBib29sZWFuO1xuICBpc1JlbW92ZUJ0bkRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGZlZUlkOiBJRmVlO1xuICBjbEFtb3VudER1ZTogbnVtYmVyID0gMDtcbiAgdW5wcm9jZXNzZWRSZWNvcmRDb3VudDogbnVtYmVyO1xuICBpc0ZlZVJlY29yZHNFeGlzdDogYm9vbGVhbiA9IGZhbHNlO1xuICBpc0dycE91dHN0YW5kaW5nQW10UG9zaXRpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdG90YWxSZWZ1bmRBbW91bnQ6IE51bWJlcjtcbiAgY2FzZVR5cGU6IFN0cmluZztcbiAgaXNDb25maXJtYXRpb25CdG5EaXNhYmxlZDogYm9vbGVhbjtcbiAgcmVmdW5kUmVmZXJlbmNlOiBzdHJpbmc7XG4gIHJlZnVuZEFtb3VudDogc3RyaW5nO1xuICBwYXltZW50OiBJUGF5bWVudDtcbiAgcGF5bWVudEdyb3VwOiBJUGF5bWVudEdyb3VwO1xuICBwYXltZW50VmlldzogSVBheW1lbnRWaWV3O1xuXG4gIGlzQWRkUmVtaXNzaW9uRW5hYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIG9yZGVyUmVtaXNzaW9uRGV0YWlsczogYW55W10gPSBbXTtcbiAgb3JkZXJMZXZlbEZlZXM6IElPcmRlclJlZmVyZW5jZUZlZVtdID0gW107XG4gIGNwb0RldGFpbHM6IGFueSA9IG51bGw7XG4gIHNlcnZpY2VSZXF1ZXN0VmFsdWU6IHN0cmluZztcbiAgb3JkZXJBZGRCdG5FbmFibGU6IGJvb2xlYW47XG4gIGlzRnJvbVBheW1lbnREZXRhaWxQYWdlOiBib29sZWFuO1xuICBjb250YWN0RGV0YWlsc09iajogSVJlZnVuZENvbnRhY3REZXRhaWxzXG4gIG5vdGlmaWNhdGlvbjogYW55O1xuICBpc0NQT0Rvd246IGJvb2xlYW47XG4gIHRlc3Q6IGJvb2xlYW47XG4gIGlzUEJBOiBib29sZWFuID0gZmFsc2U7XG4gIGlzSXNzdWVSZWZ1bmZCdG5FbmFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNBZGRSZW1pc3Npb25CdG5FbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGlzUmVmdW5kUmVtaXNzaW9uQnRuRW5hYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIGFsbG93ZWRSb2xlc1RvQWNjZXNzUmVmdW5kID0gWydwYXltZW50cy1yZWZ1bmQtYXBwcm92ZXInLCAncGF5bWVudHMtcmVmdW5kJ107XG4gIGlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZTogYm9vbGVhbjtcbiAgbmF2aWdhdGlvbnBhZ2U6IHN0cmluZztcbiAgcmVtaXNzaW9uRmVlQW10OiBudW1iZXI7XG4gIGlzQ29udGludWVCdG5EaXNhYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIGlzRnVsbHlSZWZ1bmQ6IGJvb2xlYW47XG4gIHRlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlOiBzdHJpbmc7XG4gIG5vdGlmaWNhdGlvblByZXZpZXc6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYXltZW50TGliQ29tcG9uZW50OiBQYXltZW50TGliQ29tcG9uZW50LFxuICAgIHByaXZhdGUgcGF5bWVudFZpZXdTZXJ2aWNlOiBQYXltZW50Vmlld1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBPcmRlcnNsaXN0U2VydmljZTogT3JkZXJzbGlzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaXNUdXJuT2ZmID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTVFVSTk9GRjtcbiAgICB0aGlzLmlzU2VydmljZVJlcXVlc3QgPSAnZmFsc2UnO1xuICAgIGlmICh0aGlzLnZpZXdTdGF0dXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy52aWV3U3RhdHVzID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lO1xuICAgIH1cbiAgICBpZih0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNGcm9tU2VydmljZVJlcXVlc3RQYWdlICYmIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc0Zyb21QYXltZW50RGV0YWlsUGFnZSkge1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRvcmRlclJlZnMoKS5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMub3JkZXJSZWYgPSBkYXRhKTtcbiAgICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2UuZ2V0b3JkZXJDQ0RFdmVudHMoKS5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMub3JkZXJDQ0RFdmVudCA9IGRhdGEpO1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRvcmRlckNyZWF0ZWRzKCkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLm9yZGVyQ3JlYXRlZCA9IGRhdGEpO1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRvcmRlckRldGFpbCgpLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5vcmRlckRldGFpbCA9IGRhdGEpO1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRvcmRlclBhcnR5cygpLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5vcmRlclBhcnR5ID0gZGF0YSk7XG4gICAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLmdldG9yZGVyUmVtaXNzaW9uVG90YWxzKCkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLm9yZGVyUmVtaXNzaW9uVG90YWwgPSBkYXRhKTtcbiAgICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2UuZ2V0b3JkZXJGZWVzVG90YWxzKCkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLm9yZGVyRmVlc1RvdGFsID0gZGF0YSk7XG4gICAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLmdldG9vcmRlclRvdGFsUGF5bWVudHNzKCkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLm9yZGVyVG90YWxQYXltZW50cyA9IGRhdGEpO1xuICAgIH1cbiAgICBpZih0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNGcm9tU2VydmljZVJlcXVlc3RQYWdlICYmIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5UQUtFUEFZTUVOVCkge1xuICAgICAgdGhpcy5pc1NlcnZpY2VSZXF1ZXN0ID0gJ2ZhbHNlJztcbiAgICB9XG5cbiAgfVxuICBnb1RvU2VydmljZVJlcXVlc3RQYWdlKCkge1xuICAgIHRoaXMuZ29Ub1NlcnZpY2VScXVlc3RDb21wb25lbnQuZW1pdCgpO1xuICB9XG5cbiAgZ29Ub0Nhc2VUcmFuc2F0aW9uUGFnZShldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldG5hdmlnYXRpb25QYWdlKCdzZXJ2aWNlcmVxdWVzdHBhZ2UnKTtcbiAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldGlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZShmYWxzZSk7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ2Nhc2UtdHJhbnNhY3Rpb25zJztcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNCU0VOQUJMRSA9IHRydWU7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzVGFrZVBheW1lbnQgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQ7XG4gICAgaWYgKHRoaXMudGFrZVBheW1lbnQpIHtcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc1Rha2VQYXltZW50ID0gdGhpcy50YWtlUGF5bWVudDtcbiAgICB9XG4gICAgLy90aGlzLnBheW1lbnRMaWJDb21wb25lbnQuU0VSVklDRVJFUVVFU1QgPSBcInRydWVcIjtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNGcm9tU2VydmljZVJlcXVlc3RQYWdlID0gZmFsc2U7XG4gICAgaWYodGhpcy5pc1NlcnZpY2VSZXF1ZXN0ICE9PSAnZmFsc2UnKSB7XG4gICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNGcm9tU2VydmljZVJlcXVlc3RQYWdlID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzRnJvbVJlZnVuZFN0YXR1c1BhZ2UgPSBmYWxzZTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAnY2FzZS10cmFuc2FjdGlvbnMnO1xuICAgIHRoaXMucmVzZXRPcmRlckRhdGEoKTtcblxuICAgIC8vIENoZWNrIHdlIG9uIFhVSVxuICAgIGlmKHRoaXMucm91dGVyLnVybC5zdGFydHNXaXRoKCcvY2FzZXMvY2FzZS1kZXRhaWxzLycpKSB7XG4gICAgICAvLyBVc2UgY2NwYXktY2FzZS10cmFuc2FjdGlvbnMgY29tcG9uZW50XG4gICAgICB0aGlzLnZpZXdTdGF0dXMgPSAnY2FzZS10cmFuc2FjdGlvbnMnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZWxvYWQgUGF5YnViYmxlIGNhc2UtdHJhbnNhY3Rpb25zIHBhZ2UuXG4gICAgICBsZXQgIHBhcnRVcmwgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNCU0VOQUJMRSA/ICcmaXNCdWxrU2Nhbm5pbmc9RW5hYmxlJyA6ICcmaXNCdWxrU2Nhbm5pbmc9RGlzYWJsZSc7XG4gICAgICBwYXJ0VXJsICs9IHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5JU1RVUk5PRkYgPyAnJmlzVHVybk9mZj1FbmFibGUnIDogJyZpc1R1cm5PZmY9RGlzYWJsZSc7XG4gICAgICBpZih0aGlzLmlzU2VydmljZVJlcXVlc3QgPT09ICdmYWxzZScpIHtcbiAgICAgICAgcGFydFVybCArPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPyAnJnRha2VQYXltZW50PXRydWUnIDogJyZ0YWtlUGF5bWVudD1mYWxzZSc7XG4gICAgICB9XG4gICAgICBwYXJ0VXJsICs9IHRoaXMuaXNTdHJhdGVnaWNGaXhFbmFibGUgPyAnJmlzU3RGaXhFbmFibGU9RW5hYmxlJyA6ICcmaXNTdEZpeEVuYWJsZT1EaXNhYmxlJztcbiAgICAgIHBhcnRVcmwgKz0gdGhpcy5pc1NlcnZpY2VSZXF1ZXN0ICE9PSAnZmFsc2UnID8gJyZzZXJ2aWNlcmVxdWVzdD10cnVlJyA6ICcmc2VydmljZXJlcXVlc3Q9ZmFsc2UnO1xuICAgICAgcGFydFVybCArPSBgJmNhc2VUeXBlPSR7dGhpcy5wYXltZW50TGliQ29tcG9uZW50LkNBU0VUWVBFfWA7XG4gICAgICBjb25zdCB1cmwgPSBgL3BheW1lbnQtaGlzdG9yeS8ke3RoaXMucGF5bWVudExpYkNvbXBvbmVudC5DQ0RfQ0FTRV9OVU1CRVJ9P3ZpZXc9Y2FzZS10cmFuc2FjdGlvbnMmc2VsZWN0ZWRPcHRpb249JHt0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuU0VMRUNURURfT1BUSU9OfSR7cGFydFVybH1gO1xuICAgICAgdGhpcy5yb3V0ZXIucm91dGVSZXVzZVN0cmF0ZWd5LnNob3VsZFJldXNlUm91dGUgPSAoKSA9PiBmYWxzZTtcbiAgICAgIHRoaXMucm91dGVyLm9uU2FtZVVybE5hdmlnYXRpb24gPSAncmVsb2FkJztcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodXJsKTtcbiAgICB9XG4gIH1cblxuICBhZGRSZW1pc3Npb24oZmVlOiBJRmVlKSB7XG4gICAgaWYodGhpcy5jaGtJc0FkZFJlbWlzc2lvbkJ0bkVuYWJsZShmZWUpKSB7XG4gICAgdGhpcy5mZWVJZCA9IGZlZTtcbiAgICB0aGlzLnZpZXdTdGF0dXMgPSAnYWRkcmVtaXNzaW9uJztcbiAgICB0aGlzLnBheW1lbnQgPSB0aGlzLm9yZGVyRGV0YWlsWzBdLnBheW1lbnRzWzBdO1xuICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLmdldEFwcG9ydGlvblBheW1lbnREZXRhaWxzKHRoaXMub3JkZXJEZXRhaWxbMF0ucGF5bWVudHNbMF0ucmVmZXJlbmNlKS5zdWJzY3JpYmUoXG4gICAgICBwYXltZW50R3JvdXAgPT4ge1xuICAgICAgICB0aGlzLnBheW1lbnRHcm91cCA9IHBheW1lbnRHcm91cDtcblxuICAgICAgICB0aGlzLnBheW1lbnRHcm91cC5wYXltZW50cyA9IHRoaXMucGF5bWVudEdyb3VwLnBheW1lbnRzLmZpbHRlclxuICAgICAgICAgIChwYXltZW50R3JvdXBPYmogPT4gcGF5bWVudEdyb3VwT2JqWydyZWZlcmVuY2UnXS5pbmNsdWRlcyh0aGlzLnBheW1lbnRMaWJDb21wb25lbnQucGF5bWVudFJlZmVyZW5jZSkpO1xuICAgICAgICB0aGlzLnBheW1lbnQgPSB0aGlzLnBheW1lbnRHcm91cC5wYXltZW50c1swXTtcblxuICAgICAgICAgIC8vICBjb25zdCBwYXltZW50QWxsb2NhdGlvbiA9IHRoaXMucGF5bWVudEdyb3VwLnBheW1lbnRzWzBdLnBheW1lbnRfYWxsb2NhdGlvbjtcbiAgICAgICAgICAvLyAgdGhpcy5pc1N0YXR1c0FsbG9jYXRlZCA9IHBheW1lbnRBbGxvY2F0aW9uLmxlbmd0aCA+IDAgJiYgcGF5bWVudEFsbG9jYXRpb25bMF0uYWxsb2NhdGlvbl9zdGF0dXMgPT09ICdBbGxvY2F0ZWQnIHx8IHBheW1lbnRBbGxvY2F0aW9uLmxlbmd0aCA9PT0gMDtcblxuICAgICAgfSxcbiAgICAgIChlcnJvcjogYW55KSA9PiB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yLnJlcGxhY2UoL1wiL2csXCJcIilcbiAgICApO1xuICB9XG4gIH1cblxuICBhZGRSZWZ1bmRGb3JSZW1pc3Npb24ocGF5bWVudDogSVBheW1lbnQsIHJlbWlzc2lvbjogSVJlbWlzc2lvbltdLGZlZXM6YW55KSB7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZSA9IHRydWU7XG4gICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UuZ2V0QXBwb3J0aW9uUGF5bWVudERldGFpbHMocGF5bWVudC5yZWZlcmVuY2UpLnN1YnNjcmliZShcbiAgICAgIHBheW1lbnRHcm91cCA9PiB7XG4gICAgICAgIHRoaXMucGF5bWVudEdyb3VwID0gcGF5bWVudEdyb3VwO1xuICAgICAgICB0aGlzLnBheW1lbnRHcm91cC5wYXltZW50cyA9IHRoaXMucGF5bWVudEdyb3VwLnBheW1lbnRzLmZpbHRlclxuICAgICAgICAgIChwYXltZW50R3JvdXBPYmogPT4gcGF5bWVudEdyb3VwT2JqLnJlZmVyZW5jZSA9PT0gcGF5bWVudC5yZWZlcmVuY2UpO1xuICAgICAgICB0aGlzLnBheW1lbnQgPSB0aGlzLnBheW1lbnRHcm91cC5wYXltZW50c1swXTtcbiAgICAgICAgdGhpcy5yZW1pc3Npb25zID0gcmVtaXNzaW9uO1xuICAgICAgICB0aGlzLnJlbWlzc2lvbkZlZUFtdCA9IGZlZXMuZmlsdGVyKGRhdGE9PmRhdGEuY29kZSA9PT0gdGhpcy5yZW1pc3Npb25zWydmZWVfY29kZSddKVswXS5uZXRfYW1vdW50O1xuICAgICAgICB0aGlzLnZpZXdTdGF0dXMgPSAnYWRkcmVmdW5kZm9ycmVtaXNzaW9uJztcbiAgICAgICAgLy8gY29uc3QgcGF5bWVudEFsbG9jYXRpb24gPSB0aGlzLnBheW1lbnRHcm91cC5wYXltZW50c1swXS5wYXltZW50X2FsbG9jYXRpb247XG4gICAgICAgIC8vIHRoaXMuaXNTdGF0dXNBbGxvY2F0ZWQgPSBwYXltZW50QWxsb2NhdGlvbi5sZW5ndGggPiAwICYmIHBheW1lbnRBbGxvY2F0aW9uWzBdLmFsbG9jYXRpb25fc3RhdHVzID09PSAnQWxsb2NhdGVkJyB8fCBwYXltZW50QWxsb2NhdGlvbi5sZW5ndGggPT09IDA7XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3JcbiAgICApO1xuICB9XG4gIGNhbmNlbFJlbW92YWwoKSB7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJ21haW4nO1xuICB9XG5cbiAgcmVtb3ZlRmVlKGZlZTogYW55KSB7XG4gICAgdGhpcy5pc1JlbW92ZUJ0bkRpc2FibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnBheW1lbnRWaWV3U2VydmljZS5kZWxldGVGZWVGcm9tUGF5bWVudEdyb3VwKGZlZSkuc3Vic2NyaWJlKFxuICAgICAgKHN1Y2Nlc3M6IGFueSkgPT4ge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgICAgdGhpcy5pc1JlbW92ZUJ0bkRpc2FibGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGlzc3VlUmVmdW5kKHBheW1lbnQ6IElQYXltZW50KSB7XG4gICAgaWYgKHBheW1lbnQgIT09IG51bGwgJiYgcGF5bWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiggdGhpcy5jaGtJc0lzc3VlUmVmdW5kQnRuRW5hYmxlKHBheW1lbnQpKSB7XG4gICAgICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLmdldEFwcG9ydGlvblBheW1lbnREZXRhaWxzKHBheW1lbnQucmVmZXJlbmNlKS5zdWJzY3JpYmUoXG4gICAgICAgIHBheW1lbnRHcm91cCA9PiB7XG4gICAgICAgICAgcGF5bWVudEdyb3VwLnBheW1lbnRzID0gcGF5bWVudEdyb3VwLnBheW1lbnRzLmZpbHRlclxuICAgICAgICAgIChwYXltZW50R3JvdXBPYmogPT4gcGF5bWVudEdyb3VwT2JqWydyZWZlcmVuY2UnXS5pbmNsdWRlcyhwYXltZW50LnJlZmVyZW5jZSkpO1xuICAgICAgICAgIGlmKHBheW1lbnQub3Zlcl9wYXltZW50ID4gMCkge1xuICAgICAgICAgICAgdGhpcy52aWV3U3RhdHVzID0gJyc7XG4gICAgICAgICAgICB0aGlzLnBheW1lbnQgPSBwYXltZW50O1xuICAgICAgICAgICAgdGhpcy5wYXltZW50R3JvdXBMaXN0ID0gcGF5bWVudEdyb3VwO1xuICAgICAgICAgICAgdGhpcy52aWV3Q29tcFN0YXR1cyAgPSAnb3ZlcnBheW1lbnQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdTdGF0dXMgPSAnaXNzdWVyZWZ1bmQnO1xuICAgICAgICAgICAgdGhpcy52aWV3Q29tcFN0YXR1cyA9ICcnO1xuICAgICAgICAgICAgdGhpcy5wYXltZW50RmVlcyA9IHBheW1lbnRHcm91cC5mZWVzO1xuICAgICAgICAgICAgdGhpcy5wYXltZW50ID0gcGF5bWVudDtcbiAgICAgICAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2UgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pc1JlZnVuZFJlbWlzc2lvbiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoZXJyb3I6IGFueSkgPT4gdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdvVG9QYXllbWVudFZpZXcocGF5bWVudEdyb3VwUmVmZXJlbmNlOiBzdHJpbmcsIHBheW1lbnRSZWZlcmVuY2U6IHN0cmluZywgcGF5bWVudE1ldGhvZDogc3RyaW5nKSB7XG4gICAgdGhpcy5nb1RvUGF5bWVudFZpZXdDb21wb25lbnQoeyBwYXltZW50R3JvdXBSZWZlcmVuY2UsIHBheW1lbnRSZWZlcmVuY2UsIHBheW1lbnRNZXRob2QgfSk7XG4gIH1cblxuICBnb1RvUGF5bWVudFZpZXdDb21wb25lbnQocGF5bWVudEdyb3VwOiBhbnkpIHtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQucGF5bWVudE1ldGhvZCA9IHBheW1lbnRHcm91cC5wYXltZW50TWV0aG9kO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2UgPSB0cnVlO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5wYXltZW50R3JvdXBSZWZlcmVuY2UgPSBwYXltZW50R3JvdXAucGF5bWVudEdyb3VwUmVmZXJlbmNlO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5wYXltZW50UmVmZXJlbmNlID0gcGF5bWVudEdyb3VwLnBheW1lbnRSZWZlcmVuY2U7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRPcmRlclJlZih0aGlzLm9yZGVyUmVmKTtcbiAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldG9yZGVyQ0NERXZlbnQodGhpcy5vcmRlckNDREV2ZW50KTtcbiAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldG9yZGVyQ3JlYXRlZCh0aGlzLm9yZGVyQ3JlYXRlZCk7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRvcmRlckRldGFpbCh0aGlzLm9yZGVyRGV0YWlsKTtcbiAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldG9yZGVyUGFydHkodGhpcy5vcmRlclBhcnR5KTtcbiAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldG9yZGVyVG90YWxQYXltZW50cyh0aGlzLm9yZGVyVG90YWxQYXltZW50cyk7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRvcmRlclJlbWlzc2lvblRvdGFsKHRoaXMub3JkZXJSZW1pc3Npb25Ub3RhbCk7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRvcmRlckZlZXNUb3RhbCh0aGlzLm9yZGVyRmVlc1RvdGFsKTtcbiAgICB0aGlzLnZpZXdTdGF0dXMgPSAncGF5bWVudC12aWV3JztcbiAgfVxuXG4gIGNoa0lzSXNzdWVSZWZ1bmRCdG5FbmFibGUocGF5bWVudDogSVBheW1lbnQpOiBib29sZWFuIHtcbiAgICBpZiAocGF5bWVudCAhPT0gbnVsbCAmJiBwYXltZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBwYXltZW50Lmlzc3VlX3JlZnVuZCAmJiBwYXltZW50LnJlZnVuZF9lbmFibGVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNoa0lzQWRkUmVmdW5kQnRuRW5hYmxlKHJlbWlzc2lvbjogSVJlbWlzc2lvbik6IGJvb2xlYW4ge1xuICAgIGlmIChyZW1pc3Npb24gIT09IG51bGwgJiYgcmVtaXNzaW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiByZW1pc3Npb24uYWRkX3JlZnVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNoa0lzQWRkUmVtaXNzaW9uQnRuRW5hYmxlKGZlZTogSUZlZSk6IGJvb2xlYW4ge1xuICAgIGlmIChmZWUgIT09IG51bGwgJiYgZmVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmZWUuYWRkX3JlbWlzc2lvbiAmJiBmZWUucmVtaXNzaW9uX2VuYWJsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJlc2V0T3JkZXJEYXRhKCkge1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0T3JkZXJSZWYobnVsbCk7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRvcmRlckNDREV2ZW50KG51bGwpO1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0b3JkZXJDcmVhdGVkKG51bGwpO1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0b3JkZXJEZXRhaWwobnVsbCk7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRvcmRlclBhcnR5KG51bGwpO1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0b3JkZXJUb3RhbFBheW1lbnRzKG51bGwpO1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0b3JkZXJSZW1pc3Npb25Ub3RhbChudWxsKTtcbiAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldG9yZGVyRmVlc1RvdGFsKG51bGwpO1xuICB9XG5cbiAgc2VsZWN0UHltZW50T3B0aW9uKHBheW1lbnRUeXBlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnBheW1lbnRUeXBlID0gcGF5bWVudFR5cGU7XG4gICAgdGhpcy5pc0NvbnRpbnVlQnRuRGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBnb1RvUGF5bWVudFZpZXdDb21wKCkge1xuICAgIHRoaXMudmlld0NvbXBTdGF0dXMgID0gJyc7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJ3BheW1lbnR2aWV3JztcbiAgfVxuICBjb250aW51ZVBheW1lbnQocGF5bWVudGdycDogSVBheW1lbnRHcm91cCkge1xuXG4gICAgaWYgKHRoaXMucGF5bWVudFR5cGUgPT09ICdvcCcpIHtcbiAgICAgIHRoaXMuaXNGdWxseVJlZnVuZCA9IGZhbHNlXG4gICAgICB0aGlzLnZpZXdTdGF0dXMgPSAnJztcbiAgICAgIHRoaXMudmlld0NvbXBTdGF0dXMgID0gJ292ZXJQYXltZW50QWRkcmVzc0NhcHR1cmUnO1xuICAgIH0gZWxzZSBpZih0aGlzLnBheW1lbnRUeXBlID09PSAnZnAnKSB7XG4gICAgICB0aGlzLmlzRnVsbHlSZWZ1bmQgPSB0cnVlXG4gICAgICB0aGlzLnBheW1lbnRHcm91cExpc3QgPSBwYXltZW50Z3JwO1xuICAgICAgdGhpcy52aWV3U3RhdHVzID0gJ2lzc3VlcmVmdW5kJztcbiAgICAgIHRoaXMudmlld0NvbXBTdGF0dXMgPSBcIlwiO1xuICAgICAgdGhpcy5pc1JlZnVuZFJlbWlzc2lvbiA9IHRydWU7XG4gICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNGcm9tUGF5bWVudERldGFpbFBhZ2UgPSB0cnVlO1xuICAgICAgdGhpcy5pc0Zyb21QYXltZW50RGV0YWlsUGFnZSA9IHRydWU7XG4gICAgICB0aGlzLmlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZSA9IHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2U7XG4gICAgfVxuICB9XG4gIGdldENvbnRhY3REZXRhaWxzKG9iajpJUmVmdW5kQ29udGFjdERldGFpbHMpIHtcbiAgICB0aGlzLmNvbnRhY3REZXRhaWxzT2JqID0gb2JqO1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICcnO1xuICAgIHRoaXMudmlld0NvbXBTdGF0dXMgPSAnb3ZlcnBheW1lbnRjaGVja2FuZGFuc3dlcic7XG4gICAgdGhpcy5nZXRUZW1wbGF0ZUluc3RydWN0aW9uVHlwZSh0aGlzLnBheW1lbnRHcm91cExpc3QucGF5bWVudHNbMF0pO1xuICAgIHRoaXMubm90aWZpY2F0aW9uUHJldmlldyA9IGZhbHNlO1xuICB9XG4gIGdvdG9QYXltZW50U2VsZWN0UGFnZShldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICcnO1xuICAgIHRoaXMudmlld0NvbXBTdGF0dXMgID0gJ292ZXJwYXltZW50JztcbiAgfVxuICBnb3RvQWRkcmVzc1BhZ2Uobm90ZT86IElSZWZ1bmRDb250YWN0RGV0YWlscykge1xuICAgIGlmIChub3RlKSB7XG4gICAgICB0aGlzLm5vdGlmaWNhdGlvbiA9IHsgY29udGFjdF9kZXRhaWxzOiBub3RlLCBub3RpZmljYXRpb25fdHlwZTogbm90ZS5ub3RpZmljYXRpb25fdHlwZSB9O1xuICAgIH1cbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICcnO1xuICAgIHRoaXMudmlld0NvbXBTdGF0dXMgPSAnb3ZlclBheW1lbnRBZGRyZXNzQ2FwdHVyZSc7XG4gIH1cbiAgcHJvY2Vzc1JlZnVuZCgpIHtcbiAgICB0aGlzLmlzQ29uZmlybWF0aW9uQnRuRGlzYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgY29uc3Qgb2JqID0gdGhpcy5wYXltZW50R3JvdXBMaXN0LmZlZXNbMF07XG4gICAgdGhpcy5mZWVzICA9IFt7IGlkOiBvYmouaWQsXG4gICAgICBjb2RlOiBvYmouY29kZSxcbiAgICAgIHZlcnNpb246b2JqLnZlcnNpb24sXG4gICAgICBhcHBvcnRpb25fYW1vdW50OiBvYmouYXBwb3J0aW9uX2Ftb3VudCxcbiAgICAgIGNhbGN1bGF0ZWRfYW1vdW50OiBvYmouY2FsY3VsYXRlZF9hbW91bnQsXG4gICAgICB1cGRhdGVkX3ZvbHVtZTogb2JqLnVwZGF0ZWRfdm9sdW1lID8gb2JqLnVwZGF0ZWRfdm9sdW1lIDogb2JqLnZvbHVtZSxcbiAgICAgIHZvbHVtZTogb2JqLnZvbHVtZSxcbiAgICAgIHJlZnVuZF9hbW91bnQ6IHRoaXMuZ2V0T3ZlclBheW1lbnRWYWx1ZSgpIH1dO1xuICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gbmV3IFBvc3RSZWZ1bmRSZXRyb1JlbWlzc2lvbih0aGlzLmNvbnRhY3REZXRhaWxzT2JqLHRoaXMuZmVlcywgdGhpcy5wYXltZW50R3JvdXBMaXN0LnBheW1lbnRzWzBdLnJlZmVyZW5jZSwgJ1JSMDM3JyxcbiAgICB0aGlzLmdldE92ZXJQYXltZW50VmFsdWUoKSwgJ29wJyk7XG4gICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UucG9zdFJlZnVuZHNSZWFzb24ocmVxdWVzdEJvZHkpLnN1YnNjcmliZShcbiAgICAgIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBpZiAoSlNPTi5wYXJzZShyZXNwb25zZSkpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0NvbXBTdGF0dXMgID0gJyc7XG4gICAgICAgICAgICB0aGlzLnZpZXdTdGF0dXMgPSAncmVmdW5kY29uZmlybWF0aW9ucGFnZSc7XG4gICAgICAgICAgICB0aGlzLnJlZnVuZFJlZmVyZW5jZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpLnJlZnVuZF9yZWZlcmVuY2U7XG4gICAgICAgICAgICB0aGlzLnJlZnVuZEFtb3VudCA9IEpTT04ucGFyc2UocmVzcG9uc2UpLnJlZnVuZF9hbW91bnQ7XG4gICAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3I7XG4gICAgICAgIHRoaXMuaXNDb25maXJtYXRpb25CdG5EaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gIH1cblxuICBnZXRPdmVyUGF5bWVudFZhbHVlKCkge1xuICAgIGxldCBmZWVzT3ZlclBheW1lbnQgPSAwO1xuICAgIHRoaXMucGF5bWVudEdyb3VwTGlzdC5mZWVzLmZvckVhY2goZmVlID0+IHtcbiAgICAgIGZlZXNPdmVyUGF5bWVudCArPSBmZWUub3Zlcl9wYXltZW50O1xuICAgIH0pO1xuICAgIHJldHVybiBmZWVzT3ZlclBheW1lbnQgPiAwID8gZmVlc092ZXJQYXltZW50IDogdGhpcy5wYXltZW50R3JvdXBMaXN0LnBheW1lbnRzWzBdLm92ZXJfcGF5bWVudDtcblxuICB9XG5cbiAgZ2V0VGVtcGxhdGVJbnN0cnVjdGlvblR5cGUocGF5bWVudDogSVBheW1lbnQpOiB2b2lkIHtcblxuICAgIGlmIChwYXltZW50ID09IHVuZGVmaW5lZCB8fCBwYXltZW50ID09IG51bGwpIHtcbiAgICAgIHRoaXMudGVtcGxhdGVJbnN0cnVjdGlvblR5cGUgPSAnVGVtcGxhdGUnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlID0gdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmdldE5vdGlmaWNhdGlvbkluc3RydWN0aW9uVHlwZShwYXltZW50LmNoYW5uZWwsIHBheW1lbnQubWV0aG9kKTtcbiAgICB9XG5cbiAgfVxuXG4gIHNob3dOb3RpZmljYXRpb25QcmV2aWV3KCk6IHZvaWQge1xuICAgIHRoaXMubm90aWZpY2F0aW9uUHJldmlldyA9IHRydWU7XG4gIH1cblxuICBoaWRlTm90aWZpY2F0aW9uUHJldmlldygpOiB2b2lkIHtcbiAgICB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXcgPSBmYWxzZTtcbiAgfVxufVxuIiwiPCEtLSBPcmRlciBGdWxsIFZpZXcgRGV0YWlscy0tPlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdvcmRlci1mdWxsLXZpZXcnXCI+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1icmVhZGNydW1ic1wiPlxuICAgICAgPG9sIGNsYXNzPVwiZ292dWstYnJlYWRjcnVtYnNfX2xpc3RcIj5cbiAgICAgICAgPGxpIGNsYXNzPVwiZ292dWstYnJlYWRjcnVtYnNfX2xpc3QtaXRlbVwiICpuZ0lmPVwiaXNTZXJ2aWNlUmVxdWVzdCA9PT0gJ2ZhbHNlJ1wiPlxuICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ29Ub0Nhc2VUcmFuc2F0aW9uUGFnZSgkZXZlbnQpXCIgY2xhc3M9XCJnb3Z1ay1iYWNrLWxpbmtcIj5CYWNrPC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgICA8bGkgY2xhc3M9XCJnb3Z1ay1icmVhZGNydW1ic19fbGlzdC1pdGVtXCIgKm5nSWY9XCJpc1NlcnZpY2VSZXF1ZXN0ICE9PSAnZmFsc2UnXCI+XG4gICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnb1RvU2VydmljZVJlcXVlc3RQYWdlKClcIiBpZD1cImJja0xua3NpemVcIiBjbGFzcz1cImdvdnVrLWJhY2stbGlua1wiPkJhY2s8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L29sPlxuICAgIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tZnVsbFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLWxhcmdlIGdvdnVrLSEtbWFyZ2luLXRvcC0wXCI+U2VydmljZSByZXF1ZXN0PC9oMT5cbiAgICAgIDwvZGl2PlxuICAgICAgPHRhYmxlID5cbiAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImJvbGQgdGItY29sLXdcIj5TZXJ2aWNlIHJlcXVlc3QgcmVmZXJlbmNlPC90ZD5cbiAgICAgICAgICAgICAgPHRkPnt7b3JkZXJSZWZ9fTwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+U3RhdHVzPC90ZD5cbiAgICAgICAgICAgICAgPHRkPnt7b3JkZXJTdGF0dXN9fTwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+RGF0ZSBjcmVhdGVkPC90ZD5cbiAgICAgICAgICAgICAgPHRkPnt7b3JkZXJDcmVhdGVkIHwgZGF0ZTonZGQgTU1NTSB5eXl5J319PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImJvbGQgdGItY29sLXdcIj5QYXJ0eTwvdGQ+XG4gICAgICAgICAgICAgIDx0ZD57e29yZGVyUGFydHl9fTwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+Q0NEIGV2ZW50PC90ZD5cbiAgICAgICAgICAgICAgPHRkPnt7b3JkZXJDQ0RFdmVudH19PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGwgb3JkZXItY2xhc3NcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGUgXCI+XG4gICAgICAgICAgPHRoZWFkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC01MVwiIHNjb3BlPVwiY29sXCIgKm5nSWY9XCJpc1NlcnZpY2VSZXF1ZXN0ID09PSAnZmFsc2UnXCI+RmVlPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLTUxXCIgc2NvcGU9XCJjb2xcIiBjb2xzcGFuPVwiMlwiICpuZ0lmPVwiaXNTZXJ2aWNlUmVxdWVzdCAhPT0gJ2ZhbHNlJ1wiPkZlZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5BbW91bnQ8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+VG90YWw8L3RkPlxuICAgICAgICAgICAgPHRkICBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiICpuZ0lmPVwiaXNTZXJ2aWNlUmVxdWVzdCA9PT0gJ2ZhbHNlJ1wiPjwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCIgKm5nRm9yPVwibGV0IG9yZGVyIG9mIG9yZGVyRGV0YWlsO1wiPlxuICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICpuZ0Zvcj1cImxldCBmZWUgb2Ygb3JkZXIuZmVlczsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgY29sLTYwIHdoaXRlc3BhY2UtaW5oZXJpdFwiICpuZ0lmPVwiaXNTZXJ2aWNlUmVxdWVzdCA9PT0gJ2ZhbHNlJ1wiPnt7ZmVlLmRlc2NyaXB0aW9ufX08L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBjb2wtNjAgd2hpdGVzcGFjZS1pbmhlcml0XCIgY29sc3Bhbj1cIjJcIiAqbmdJZj1cImlzU2VydmljZVJlcXVlc3QgIT09ICdmYWxzZSdcIj57e2ZlZS5kZXNjcmlwdGlvbn19PC90ZD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57e2ZlZS52b2x1bWU/IGZlZS52b2x1bWUgOiAnLSd9fSBYIHt7IGZlZS5jYWxjdWxhdGVkX2Ftb3VudC9mZWUudm9sdW1lfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJyB9fTwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3sgZmVlPy5uZXRfYW1vdW50IHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgfX08L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBhbGlnbnJpZ2h0XCIgKm5nSWY9XCJpc1NlcnZpY2VSZXF1ZXN0ID09PSAnZmFsc2UnXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIFtkaXNhYmxlZF09XCIhY2hrSXNBZGRSZW1pc3Npb25CdG5FbmFibGUoZmVlKVwiICAgKGNsaWNrKT1cImFkZFJlbWlzc2lvbihmZWUpXCIgY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnlcIj4gQWRkIHJlbWlzc2lvbjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L3RkPlxuXG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAqbmdGb3I9XCJsZXQgb3JkZXIgb2Ygb3JkZXJEZXRhaWw7XCI+XG4gICAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCIgKm5nSWY9XCJvcmRlci5mZWVzPy5sZW5ndGggPT09IDBcIiA+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGFsaWdubGVmdFwiIGNvbHNwYW49XCI3XCI+Tm8gZmVlcyByZWNvcmRlZDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1heHdpZHRoXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJ0b3RhbGZlZXNcIj5Ub3RhbCBmZWVzOiB7e29yZGVyRmVlc1RvdGFsIHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgfX08L3A+XG4gICAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gICA8IS0tIHJlbWlzc2lvbnMgLS0+XG48bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBvcmRlciBvZiBvcmRlckRldGFpbDtcIiA+XG4gICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tZnVsbCBvcmRlci1jbGFzc1wiICpuZ0lmPVwib3JkZXIucmVtaXNzaW9uc1wiPlxuICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgPHRoZWFkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRcIj5cbiAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtMjQgd2hpdGVzcGFjZS1pbmhlcml0XCIgc2NvcGU9XCJjb2xcIj5IZWxwIHdpdGggZmVlcyBvciByZW1pc3Npb24gY29kZTwvdGQ+XG4gICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLTI3IHdoaXRlc3BhY2UtaW5oZXJpdFwiIHNjb3BlPVwiY29sXCI+UmVmZXJlbmNlPC90ZD5cbiAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciB3aGl0ZXNwYWNlLWluaGVyaXRcIiBzY29wZT1cImNvbFwiPkZlZTwvdGQ+XG4gICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgd2hpdGVzcGFjZS1pbmhlcml0XCIgc2NvcGU9XCJjb2xcIj5BbW91bnQ8L3RkPlxuICAgICAgICAgICA8dGQgIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciB3aGl0ZXNwYWNlLWluaGVyaXQgcmVmdW5kQnRuXCIgc2NvcGU9XCJjb2xcIj48L3RkPlxuICAgICAgICAgPC90cj5cbiAgICAgPC90aGVhZD5cbiAgICAgPHRib2R5ICAqbmdJZj1cIm9yZGVyLnJlbWlzc2lvbnM/Lmxlbmd0aCA+IDBcIiAgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiID5cbiAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCIgKm5nRm9yPVwibGV0IHJlbWlzc2lvbiBvZiBvcmRlci5yZW1pc3Npb25zXCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcmVtaXNzaW9uPy5od2ZfcmVmZXJlbmNlIH19PC90ZD5cbiAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcmVtaXNzaW9uPy5yZW1pc3Npb25fcmVmZXJlbmNlIH19PC90ZD5cbiAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcmVtaXNzaW9uPy5mZWVfY29kZSB9fTwvdGQ+XG4gICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7IHJlbWlzc2lvbj8uaHdmX2Ftb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInfX08L3RkPlxuICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCByZWZ1bmRCdG4gd2hpdGVzcGFjZS1pbmhlcml0XCIgID5cbiAgICAgICAgICAgICAgPGJ1dHRvbiAgW2Rpc2FibGVkXT1cIiFjaGtJc0FkZFJlZnVuZEJ0bkVuYWJsZShyZW1pc3Npb24pXCIgKGNsaWNrKT1cImFkZFJlZnVuZEZvclJlbWlzc2lvbihvcmRlci5wYXltZW50c1swXSxyZW1pc3Npb24sb3JkZXIuZmVlcylcIiBjbGFzcz1cImdvdnVrLWJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiPiBBZGQgcmVmdW5kPC9idXR0b24+XG4gICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgIDwhLS0gPHRkICBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHJlZnVuZEJ0biB3aGl0ZXNwYWNlLWluaGVyaXRcIiAgPlxuXG4gICAgICAgICA8L3RkPiAtLT5cbiAgICAgICAgIDwvdHI+XG4gICAgIDwvdGJvZHk+XG5cblxuICAgPC90YWJsZT5cbiAgIDxkaXYgKm5nSWY9XCJvcmRlci5yZW1pc3Npb25zPy5sZW5ndGggPT09IDBcIj5cbiAgICA8c3BhbiA+Tm8gaGVscCB3aXRoIGZlZXMgb3IgcmVtaXNzaW9ucy48L3NwYW4+XG4gPC9kaXY+XG4gICA8ZGl2IGNsYXNzPVwic3VtbWFyeXBhZ2VhbGlnblwiPlxuICAgICAgPHA+VG90YWwgcmVkdWN0aW9uczoge3tvcmRlclJlbWlzc2lvblRvdGFsIHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgIH19PC9wPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInN1bW1hcnlwYWdlYWxpZ25cIj5cbiAgICAgICAgPHAgY2xhc3M9XCJzdW1tYXJ5cGFnZVwiPlRvdGFsIGZlZXMgdG8gcGF5OiB7eyhvcmRlckZlZXNUb3RhbCAtIG9yZGVyUmVtaXNzaW9uVG90YWwpIHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgIH19PC9wPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuPC9uZy1jb250YWluZXI+XG5cbiAgIDwhLS1QYXltZW50cy0tPlxuICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBvcmRlciBvZiBvcmRlckRldGFpbDtcIiA+XG4gICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tZnVsbFwiICpuZ0lmPVwib3JkZXIucGF5bWVudHNcIj5cbiAgICAgIDxoMyBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+UGF5bWVudHM8L2gzPlxuICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGUgXCI+XG4gICAgICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC0yNVwiIHNjb3BlPVwiY29sXCI+PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkRhdGUgY3JlYXRlZDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5BbW91bnQ8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+PC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keSAgKm5nSWY9XCJvcmRlci5wYXltZW50cz8ubGVuZ3RoID4gMFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICAqbmdGb3I9XCJsZXQgcGF5bWVudCBvZiBvcmRlci5wYXltZW50c1wiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ29Ub1BheWVtZW50VmlldyhwYXltZW50LnBheW1lbnRHcm91cFJlZmVyZW5jZSwgcGF5bWVudC5yZWZlcmVuY2UsIHBheW1lbnQubWV0aG9kKVwiPlJldmlldzwvYT5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57eyBwYXltZW50Py5kYXRlX2NyZWF0ZWQgfCBkYXRlOidkZCBNTU0geXl5eScgfX08L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcGF5bWVudD8uYW1vdW50IHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgfX08L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgYWxpZ25yaWdodFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIFtkaXNhYmxlZF09XCIhY2hrSXNJc3N1ZVJlZnVuZEJ0bkVuYWJsZShwYXltZW50KVwiICAgKGNsaWNrKT1cImlzc3VlUmVmdW5kKHBheW1lbnQpXCIgY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnlcIj5Jc3N1ZSByZWZ1bmQ8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8IS0tIDx0ZCAgKm5nSWY9XCIhY2hrSXNzdWVSZWZ1bmRCdG5FbmFibGUocGF5bWVudClcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOiByaWdodDtcIj5cbiAgICAgICAgICAgIDwvdGQ+IC0tPlxuICAgICAgICAgIDwvdHI+XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+XG5cbiAgPGRpdiAqbmdJZj1cIm9yZGVyLnBheW1lbnRzID09PSB1bmRlZmluZWQgfHwgb3JkZXIucGF5bWVudHMgPT09IG51bGxcIj5cbiAgICAgIDwhLS0gPGgzIGNsYXNzPVwiaGVhZGluZy1tZWRpdW0gbWFyLTE3XCI+UGF5bWVudHM8L2gzPiAtLT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWFyLTE3XCIgPk5vIFBheW1lbnRzIHJlY29yZGVkPC9zcGFuPlxuICA8L2Rpdj5cbjwvZGl2PlxuPC9uZy1jb250YWluZXI+XG48ZGl2ICpuZ0lmPVwiaXNTZXJ2aWNlUmVxdWVzdCA9PT0gJ2ZhbHNlJ1wiPlxuICA8ZGl2ICpuZ0lmPVwiKChvcmRlckZlZXNUb3RhbCAtIG9yZGVyUmVtaXNzaW9uVG90YWwpLSBvcmRlclRvdGFsUGF5bWVudHMpID4gMFwiID5cbiAgICAgIDxwIGNsYXNzPVwidG90YWxQYXlcIj5Ub3RhbCBsZWZ0IHRvIHBheTogPGI+e3soKG9yZGVyRmVlc1RvdGFsIC0gb3JkZXJSZW1pc3Npb25Ub3RhbCktIG9yZGVyVG90YWxQYXltZW50cyApfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJyB9fTwvYj4gPC9wPlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cIigob3JkZXJGZWVzVG90YWwgLSBvcmRlclJlbWlzc2lvblRvdGFsKS0gb3JkZXJUb3RhbFBheW1lbnRzKSA8IDBcIiA+XG4gICAgICA8cCBjbGFzcz1cInRvdGFsUGF5XCI+VG90YWwgbGVmdCB0byBwYXk6IDxiPjA8L2I+IDwvcD5cbiAgPC9kaXY+XG48L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG48Y2NwYXktYWRkLXJlbWlzc2lvbiAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdhZGRyZW1pc3Npb24nICYmIGZlZUlkXCJcbltpc1R1cm5PZmZdPVwiaXNUdXJuT2ZmXCJcbltpc1N0cmF0ZWdpY0ZpeEVuYWJsZV09XCJpc1N0cmF0ZWdpY0ZpeEVuYWJsZVwiXG5bdmlld0NvbXBTdGF0dXNdPSBcInZpZXdTdGF0dXNcIlxuW2ZlZV09XCJmZWVJZFwiXG5bb3JkZXJTdGF0dXNdID1cIm9yZGVyU3RhdHVzXCJcbltwYWlkQW1vdW50XT0gXCJvcmRlclRvdGFsUGF5bWVudHNcIlxuW2lzUmVmdW5kUmVtaXNzaW9uXT1cImlzUmVmdW5kUmVtaXNzaW9uXCJcbltjYXNlVHlwZV09XCJjYXNlVHlwZVwiXG5baXNTZXJ2aWNlUmVxdWVzdF0gPSBcImlzU2VydmljZVJlcXVlc3RcIlxuW3BheW1lbnRHcm91cFJlZl09XCJvcmRlclJlZlwiXG5baXNGcm9tU2VydmljZVJlcXVlc3RQYWdlXSA9IFwidHJ1ZVwiXG5bcGF5bWVudF0gPSBcInBheW1lbnRcIlxuW2NjZENhc2VOdW1iZXJdPVwiY2NkQ2FzZU51bWJlclwiXG5bb3JkZXJSZWZdID0gXCJvcmRlclJlZlwiXG5bb3JkZXJTdGF0dXNdID0gXCJvcmRlclN0YXR1c1wiXG5bb3JkZXJDcmVhdGVkXSA9IFwib3JkZXJDcmVhdGVkXCJcbltvcmRlclBhcnR5XSA9IFwib3JkZXJQYXJ0eVwiXG5bb3JkZXJDQ0RFdmVudF0gPSBcIm9yZGVyQ0NERXZlbnRcIlxuW29yZGVyRGV0YWlsXSA9IFwib3JkZXJEZXRhaWxcIlxuW0xPR0dFRElOVVNFUlJPTEVTXSA9IFwiTE9HR0VESU5VU0VSUk9MRVNcIlxuW3Rha2VwYXltZW50XSA9IFwidGFrZVBheW1lbnRcIlxuW29yZGVyRmVlc1RvdGFsXSA9IFwib3JkZXJGZWVzVG90YWxcIlxuW29yZGVyVG90YWxQYXltZW50c10gPSBcIm9yZGVyVG90YWxQYXltZW50c1wiXG5bb3JkZXJSZW1pc3Npb25Ub3RhbF0gPSBcIm9yZGVyUmVtaXNzaW9uVG90YWxcIlxuPjwvY2NwYXktYWRkLXJlbWlzc2lvbj5cbjxjY3BheS1hZGQtcmVtaXNzaW9uICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ2lzc3VlcmVmdW5kJyAmJiBwYXltZW50XCJcbltpc1R1cm5PZmZdPVwiaXNUdXJuT2ZmXCJcbltpc1N0cmF0ZWdpY0ZpeEVuYWJsZV09XCJpc1N0cmF0ZWdpY0ZpeEVuYWJsZVwiXG5bdmlld0NvbXBTdGF0dXNdPSBcInZpZXdTdGF0dXNcIlxuW2lzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZV09XCJpc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2VcIlxuW2lzRnJvbVBheW1lbnREZXRhaWxQYWdlXSA9IFwiaXNGcm9tUGF5bWVudERldGFpbFBhZ2VcIlxuW3BheW1lbnRdPVwicGF5bWVudFwiXG5bb3JkZXJTdGF0dXNdID1cIm9yZGVyU3RhdHVzXCJcbltwYWlkQW1vdW50XT0gXCJvcmRlclRvdGFsUGF5bWVudHNcIlxuW2lzUmVmdW5kUmVtaXNzaW9uXT1cImlzUmVmdW5kUmVtaXNzaW9uXCJcbltjYXNlVHlwZV09XCJjYXNlVHlwZVwiXG5bcGF5bWVudEdyb3VwUmVmXT1cIm9yZGVyUmVmXCJcbltjY2RDYXNlTnVtYmVyXT1cImNjZENhc2VOdW1iZXJcIlxuW29yZGVyUmVmXSA9IFwib3JkZXJSZWZcIlxuW29yZGVyU3RhdHVzXSA9IFwib3JkZXJTdGF0dXNcIlxuW29yZGVyQ3JlYXRlZF0gPSBcIm9yZGVyQ3JlYXRlZFwiXG5bb3JkZXJQYXJ0eV0gPSBcIm9yZGVyUGFydHlcIlxuW29yZGVyQ0NERXZlbnRdID0gXCJvcmRlckNDREV2ZW50XCJcbltvcmRlckRldGFpbF0gPSBcIm9yZGVyRGV0YWlsXCJcbltpc0Z1bGx5UmVmdW5kXSA9IFwiaXNGdWxseVJlZnVuZFwiXG5bZmVlc10gPSBcInBheW1lbnRGZWVzXCJcbltMT0dHRURJTlVTRVJST0xFU10gPSBcIkxPR0dFRElOVVNFUlJPTEVTXCJcbltpc0Zyb21SZWZ1bmRMaXN0UGFnZV0gPSBcImZhbHNlXCJcblt0YWtlcGF5bWVudF0gPSBcInRha2VQYXltZW50XCJcbltvcmRlckZlZXNUb3RhbF0gPSBcIm9yZGVyRmVlc1RvdGFsXCJcbltvcmRlclRvdGFsUGF5bWVudHNdID0gXCJvcmRlclRvdGFsUGF5bWVudHNcIlxuW29yZGVyUmVtaXNzaW9uVG90YWxdID0gXCJvcmRlclJlbWlzc2lvblRvdGFsXCI+PC9jY3BheS1hZGQtcmVtaXNzaW9uPlxuXG48Y2NwYXktYWRkLXJlbWlzc2lvbiAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdhZGRyZWZ1bmRmb3JyZW1pc3Npb24nICYmIHBheW1lbnRcIlxuW2lzVHVybk9mZl09XCJpc1R1cm5PZmZcIlxuW2lzU3RyYXRlZ2ljRml4RW5hYmxlXT1cImlzU3RyYXRlZ2ljRml4RW5hYmxlXCJcblt2aWV3Q29tcFN0YXR1c109IFwidmlld1N0YXR1c1wiXG5bcGF5bWVudF09XCJwYXltZW50XCJcbltvcmRlclN0YXR1c10gPVwib3JkZXJTdGF0dXNcIlxuW3BhaWRBbW91bnRdPSBcIm9yZGVyVG90YWxQYXltZW50c1wiXG5baXNSZWZ1bmRSZW1pc3Npb25dPVwiaXNSZWZ1bmRSZW1pc3Npb25cIlxuW2Nhc2VUeXBlXT1cImNhc2VUeXBlXCJcbltmZWVhbW91bnRdPVwicmVtaXNzaW9uRmVlQW10XCJcbltyZW1pc3Npb25dID0gXCJyZW1pc3Npb25zXCJcbltpc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2VdPVwiaXNTZXJ2aWNlUmVxdWVzdFwiXG5bY2NkQ2FzZU51bWJlcl09XCJjY2RDYXNlTnVtYmVyXCJcbltvcmRlclJlZl0gPSBcIm9yZGVyUmVmXCJcbltvcmRlclN0YXR1c10gPSBcIm9yZGVyU3RhdHVzXCJcbltvcmRlckNyZWF0ZWRdID0gXCJvcmRlckNyZWF0ZWRcIlxuW29yZGVyUGFydHldID0gXCJvcmRlclBhcnR5XCJcbltvcmRlckNDREV2ZW50XSA9IFwib3JkZXJDQ0RFdmVudFwiXG5bb3JkZXJEZXRhaWxdID0gXCJvcmRlckRldGFpbFwiXG5bTE9HR0VESU5VU0VSUk9MRVNdID0gXCJMT0dHRURJTlVTRVJST0xFU1wiXG5bdGFrZXBheW1lbnRdID0gXCJ0YWtlUGF5bWVudFwiXG5bb3JkZXJGZWVzVG90YWxdID0gXCJvcmRlckZlZXNUb3RhbFwiXG5bb3JkZXJUb3RhbFBheW1lbnRzXSA9IFwib3JkZXJUb3RhbFBheW1lbnRzXCJcbltvcmRlclJlbWlzc2lvblRvdGFsXSA9IFwib3JkZXJSZW1pc3Npb25Ub3RhbFwiPjwvY2NwYXktYWRkLXJlbWlzc2lvbj5cblxuPGNjcGF5LXBheW1lbnQtdmlldyAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdwYXltZW50LXZpZXcnXCJcbltMT0dHRURJTlVTRVJST0xFU10gPSBcIkxPR0dFRElOVVNFUlJPTEVTXCJcbltpc1R1cm5PZmZdID0gXCJpc1R1cm5PZmZcIlxuW2lzVGFrZVBheW1lbnRdID0gXCJ0YWtlUGF5bWVudFwiXG5bY2FzZVR5cGVdID0gXCJjYXNlVHlwZVwiXG5bb3JkZXJSZWZdID0gXCJvcmRlclJlZlwiXG5bb3JkZXJTdGF0dXNdID0gXCJvcmRlclN0YXR1c1wiXG5bb3JkZXJDcmVhdGVkXSA9IFwib3JkZXJDcmVhdGVkXCJcbltvcmRlclBhcnR5XSA9IFwib3JkZXJQYXJ0eVwiXG5bb3JkZXJDQ0RFdmVudF0gPSBcIm9yZGVyQ0NERXZlbnRcIlxuW29yZGVyRGV0YWlsXSA9IFwib3JkZXJEZXRhaWxcIlxuW29yZGVyRmVlc1RvdGFsXSA9IFwib3JkZXJGZWVzVG90YWxcIlxuW29yZGVyVG90YWxQYXltZW50c10gPSBcIm9yZGVyVG90YWxQYXltZW50c1wiXG5bb3JkZXJSZW1pc3Npb25Ub3RhbF0gPSBcIm9yZGVyUmVtaXNzaW9uVG90YWxcIlxuW2lzU2VydmljZVJlcXVlc3RdID0gXCJpc1NlcnZpY2VSZXF1ZXN0XCI+XG48L2NjcGF5LXBheW1lbnQtdmlldz5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdmZWVSZW1vdmFsQ29uZmlybWF0aW9uJ1wiPlxuPGRpdiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dFwiPlxuICA8c3BhbiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dF9faWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiE8L3NwYW4+XG4gIDxzdHJvbmcgY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRfX3RleHRcIj5cbiAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dF9fYXNzaXN0aXZlXCI+V2FybmluZzwvc3Bhbj5cbiAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZmVlP1xuICA8L3N0cm9uZz5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi1ncmJcIj5cbiAgPGZvcm0gbm92YWxpZGF0ZT5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiIChjbGljayk9XCJjYW5jZWxSZW1vdmFsKClcIj5cbiAgICAgIENhbmNlbFxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnV0dG9uXCJcbiAgICBbZGlzYWJsZWRdPVwiaXNSZW1vdmVCdG5EaXNhYmxlZFwiXG4gICAgW25nQ2xhc3NdPSdpc1JlbW92ZUJ0bkRpc2FibGVkID8gXCJidXR0b24gYnV0dG9uLS1kaXNhYmxlZCBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCIgOiBcImJ1dHRvbiBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCInXG4gICAgKGNsaWNrKT1cInJlbW92ZUZlZShmZWVJZClcIj5cbiAgICAgIFJlbW92ZVxuICAgIDwvYnV0dG9uPlxuICA8L2Zvcm0+XG48L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG48ZGl2IGNsYXNzPVwib3Zlci1wYXltZW50XCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3Q29tcFN0YXR1cyA9PT0gJ292ZXJwYXltZW50J1wiPlxuICAgIDxpbnB1dCAjbXlJbnB1dCB0eXBlPSdoaWRkZW4nIGlkPSdpRnJhbWVEcml2ZW5JbWFnZVZhbHVlJyB2YWx1ZT0nT1ZFUlBBWU1FTlRQQUdFJz5cbiAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLWxhcmdlXCI+SXNzdWUgcmVmdW5kPC9oMT5cbiAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bVwiPkNhc2UgcmVmZXJlbmNlOiB7e2NjZENhc2VOdW1iZXIgfCBjY2RIeXBoZW5zIH19PC9oMT5cbiAgICA8c3BhbiBpZD1cImhvdy1jb250YWN0ZWQtY29uZGl0aW9uYWwtaGludCBnb3Z1ay1mb250MTlweFwiIGNsYXNzPVwiZm9ybS1oaW50XCI+XG4gICAgICBQYXltZW50IHJlZmVyZW5jZToge3twYXltZW50R3JvdXBMaXN0Py5wYXltZW50c1swXT8ucmVmZXJlbmNlfX1cbiAgICA8L3NwYW4+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gICAgPGZpZWxkc2V0IGNsYXNzPVwiZ292dWstZmllbGRzZXRcIj5cbiAgICAgIDxsZWdlbmQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldF9fbGVnZW5kIGdvdnVrLWZpZWxkc2V0X19sZWdlbmQtLWxcIj5cbiAgICAgICAgPGgxIGNsYXNzPVwiaGVhZGluZy1tZWRpdW1cIj5TZWxlY3QgcGF5bWVudCB0byByZWZ1bmQ8L2gxPlxuICAgICAgPC9sZWdlbmQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1yYWRpb3NcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19faXRlbVwiPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLXJhZGlvc19faW5wdXRcIiBpZD1cIm92ZXItcGF5bWVudFwiIG5hbWU9XCJvdmVyLXBheW1lbnRcIiB0eXBlPVwicmFkaW9cIiAoY2xpY2spPVwic2VsZWN0UHltZW50T3B0aW9uKCdvcCcpXCIgdmFsdWU9XCJvcFwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLXJhZGlvc19fbGFiZWwgZ292dWstZm9udDE5cHhcIiBmb3I9XCJ3aGVyZS1kby15b3UtbGl2ZVwiPlxuICAgICAgICAgICAgT3ZlciBwYXltZW50IMKje3tnZXRPdmVyUGF5bWVudFZhbHVlKCkgfCBudW1iZXI6Jy4yJ319XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2l0ZW1cIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2lucHV0XCIgaWQ9XCJmdWxsLXBheW1lbnRcIiBuYW1lPVwib3Zlci1wYXltZW50XCIgdHlwZT1cInJhZGlvXCIgKGNsaWNrKT1cInNlbGVjdFB5bWVudE9wdGlvbignZnAnKVwiIHZhbHVlPVwiZnBcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1yYWRpb3NfX2xhYmVsIGdvdnVrLWZvbnQxOXB4XCIgZm9yPVwid2hlcmUtZG8teW91LWxpdmUtMlwiPlxuICAgICAgICAgICAgRnVsbCBwYXltZW50IMKje3twYXltZW50R3JvdXBMaXN0Py5wYXltZW50c1swXT8uYW1vdW50IHwgbnVtYmVyOicuMid9fVxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnkgb3Zlci1wYXltZW50LWFsaWdubWVudCBnb3Z1ay1mb250MTlweFwiXG4gICAgICAgIChjbGljayk9XCJnb1RvUGF5bWVudFZpZXdDb21wKClcIj4gUHJldmlvdXM8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAoY2xpY2spPVwiY29udGludWVQYXltZW50KHBheW1lbnRHcm91cExpc3QpXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImlzQ29udGludWVCdG5EaXNhYmxlZFwiXG4gICAgICAgIFtuZ0NsYXNzXT0naXNDb250aW51ZUJ0bkRpc2FibGVkID8gXCJidXR0b24gYnV0dG9uLS1kaXNhYmxlZCBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xIGdvdnVrLWZvbnQxOXB4XCIgOiBcImJ1dHRvbiBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xIGdvdnVrLWZvbnQxOXB4XCInXG4gICAgICAgIGNsYXNzPVwiZ292dWstYnV0dG9uXCI+IENvbnRpbnVlPC9idXR0b24+XG4gICAgPC9maWVsZHNldD5cbiAgPC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3Q29tcFN0YXR1cyA9PT0gJ292ZXJQYXltZW50QWRkcmVzc0NhcHR1cmUnXCI+XG4gICAgPGlucHV0ICNteUlucHV0IHR5cGU9J2hpZGRlbicgaWQ9J2lGcmFtZURyaXZlbkltYWdlVmFsdWUnIHZhbHVlPSdPVkVSUEFZTUVOVEFERFJFU1NDQVBUVVJFUEFHRSc+XG4gICAgPGgxIGNsYXNzPVwiZ292dWstaGVhZGluZy1sXCI+SXNzdWUgcmVmdW5kPC9oMT5cbiAgICA8aDIgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLW0gZ292dWstZm9udDE5cHhcIj5DYXNlIHJlZmVyZW5jZToge3tjY2RDYXNlTnVtYmVyIHwgY2NkSHlwaGVucyB9fTwvaDI+XG4gICAgPHNwYW4gaWQ9XCJob3ctY29udGFjdGVkLWNvbmRpdGlvbmFsLWhpbnRcIiBjbGFzcz1cImdvdnVrLWhpbnQgZ292dWstZm9udDE5cHhcIj5cbiAgICAgIFBheW1lbnQgcmVmZXJlbmNlOiB7e3BheW1lbnRHcm91cExpc3Q/LnBheW1lbnRzWzBdPy5yZWZlcmVuY2V9fVxuICAgIDwvc3Bhbj5cbiAgPGNjcGF5LWNvbnRhY3QtZGV0YWlsc1xuICBbYWRkcmVzc09ial0gPSBub3RpZmljYXRpb25cbiAgKGFzc2lnbkNvbnRhY3REZXRhaWxzKT1cImdldENvbnRhY3REZXRhaWxzKCRldmVudClcIlxuICAocmVkaXJlY3RUb0lzc3VlUmVmdW5kKT1cImdvdG9QYXltZW50U2VsZWN0UGFnZSgkZXZlbnQpXCIgPjwvY2NwYXktY29udGFjdC1kZXRhaWxzPlxuICA8cD5cbiAgICAgIDxhIChjbGljayk9XCJnb1RvQ2FzZVRyYW5zYXRpb25QYWdlKCRldmVudClcIiBjbGFzcz1cImdvdnVrLWxpbmtcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWJ1dHRvblwiPlxuICAgICAgICAgIENhbmNlbFxuICAgICAgPC9hPlxuICA8L3A+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3Q29tcFN0YXR1cyA9PT0gJ292ZXJwYXltZW50Y2hlY2thbmRhbnN3ZXInXCI+XG4gICAgPGlucHV0ICNteUlucHV0IHR5cGU9J2hpZGRlbicgaWQ9J2lGcmFtZURyaXZlbkltYWdlVmFsdWUnIHZhbHVlPSdBRERSRUZVTkRGT1JSRU1JU1NJT04nPlxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRcIj5cblxuICAgICAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLWxhcmdlXCI+IENoZWNrIHlvdXIgYW5zd2VyczwvaDE+XG4gICAgPC9kaXY+XG4gICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGUgZ292dWstdGFibGUtbWJcIj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+UGF5bWVudCByZWZlcmVuY2U8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57e3BheW1lbnRHcm91cExpc3QucGF5bWVudHNbMF0ucmVmZXJlbmNlfX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5QYXltZW50IGFtb3VudDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7cGF5bWVudEdyb3VwTGlzdC5wYXltZW50c1swXS5hbW91bnQgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJ319PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+RmVlIGFtb3VudDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7cGF5bWVudEdyb3VwTGlzdD8uZmVlc1swXT8ubmV0X2Ftb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInfX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5SZWZ1bmQgYW1vdW50PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3tnZXRPdmVyUGF5bWVudFZhbHVlKCkgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJ319PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+UmVmdW5kIHJlYXNvbjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPk92ZXIgcGF5bWVudDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5TZW5kIHRvPC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7b3JkZXJQYXJ0eX19PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlNlbmQgdmlhPC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImNvbnRhY3REZXRhaWxzT2JqPy5ub3RpZmljYXRpb25fdHlwZSA9PT0gJ0VNQUlMJ1wiIGNsYXNzPVwiY29udGFjdERldGFpbHMtd2lkdGhcIj5cbiAgICAgICAgICAgIDxzdHJvbmc+RW1haWw8L3N0cm9uZz5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICB7e2NvbnRhY3REZXRhaWxzT2JqPy5lbWFpbD8udHJpbSgpfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY29udGFjdERldGFpbHNPYmo/Lm5vdGlmaWNhdGlvbl90eXBlID09PSAnTEVUVEVSJ1wiIGNsYXNzPVwiY29udGFjdERldGFpbHMtd2lkdGhcIj5cbiAgICAgICAgICAgIDxzdHJvbmc+UG9zdDwvc3Ryb25nPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIHt7Y29udGFjdERldGFpbHNPYmo/LmFkZHJlc3NfbGluZT8udHJpbSgpfX0mbmJzcDt7e2NvbnRhY3REZXRhaWxzT2JqPy5jaXR5Py50cmltKCl9fSZuYnNwO3t7Y29udGFjdERldGFpbHNPYmo/LmNvdW50eT8udHJpbSgpfX0mbmJzcDt7e2NvbnRhY3REZXRhaWxzT2JqPy5jb3VudHJ5Py50cmltKCl9fSZuYnNwO3t7Y29udGFjdERldGFpbHNPYmo/LnBvc3RhbF9jb2RlPy50cmltKCl9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxhIChjbGljayk9XCJnb3RvQWRkcmVzc1BhZ2UoY29udGFjdERldGFpbHNPYmopXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHJpZ2h0XCIgPkNoYW5nZTwvYT5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG5cbiAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+Tm90aWZpY2F0aW9uPC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57e3RlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlfX1cbiAgICAgICAgICAgIDxhICpuZ0lmPVwiIW5vdGlmaWNhdGlvblByZXZpZXdcIiBocmVmPVwiSmF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHJpZ2h0XCIgKGNsaWNrKT1cInNob3dOb3RpZmljYXRpb25QcmV2aWV3KClcIj5cbiAgICAgICAgICAgICAgUHJldmlld1xuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGEgKm5nSWY9XCJub3RpZmljYXRpb25QcmV2aWV3XCIgaHJlZj1cIkphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiZ292dWstbGluayByaWdodFwiIChjbGljayk9XCJoaWRlTm90aWZpY2F0aW9uUHJldmlldygpXCI+XG4gICAgICAgICAgICAgIEhpZGUgUHJldmlld1xuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3RhYmxlPlxuXG4gICAgPGFwcC1ub3RpZmljYXRpb24tcHJldmlldyAqbmdJZj1cIm5vdGlmaWNhdGlvblByZXZpZXdcIlxuICAgIFtwYXltZW50XT1cInBheW1lbnRHcm91cExpc3QucGF5bWVudHNbMF1cIlxuICAgIFtjb250YWN0RGV0YWlsc109XCJjb250YWN0RGV0YWlsc09ialwiXG4gICAgW3JlZnVuZFJlYXNvbl09XCInUlIwMzcnXCJcbiAgICBbcmVmdW5kQW1vdW50XT1cImdldE92ZXJQYXltZW50VmFsdWUoKVwiPjwvYXBwLW5vdGlmaWNhdGlvbi1wcmV2aWV3PlxuXG5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeSBvdmVyLXBheW1lbnQtYWxpZ25tZW50IGdvdnVrLWZvbnQxOXB4XCIgKGNsaWNrKT1cImdvdG9BZGRyZXNzUGFnZShjb250YWN0RGV0YWlsc09iailcIj5QcmV2aW91czwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiXG4gICAgW25nQ2xhc3NdPSdpc0NvbnRpbnVlQnRuRGlzYWJsZWQgPyBcImJ1dHRvbiBidXR0b24tLWRpc2FibGVkIGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTEgZ292dWstZm9udDE5cHhcIiA6IFwiYnV0dG9uIGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTEgZ292dWstZm9udDE5cHhcIidcbiAgICAoY2xpY2spPVwicHJvY2Vzc1JlZnVuZCgpXCI+XG4gICAgICBTdWJtaXQgcmVmdW5kXG4gICAgPC9idXR0b24+XG4gICAgPHA+XG4gICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAgKGNsaWNrKT1cImdvVG9DYXNlVHJhbnNhdGlvblBhZ2UoJGV2ZW50KVwiIGNsYXNzPVwiZ292dWstbGluayBnb3Z1ay1mb250MTlweFwiIGRhdGEtbW9kdWxlPVwiZ292dWstYnV0dG9uXCI+XG4gICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgPC9hPlxuICAgIDwvcD5cblxuICA8L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdyZWZ1bmRjb25maXJtYXRpb25wYWdlJyAmJiB2aWV3Q29tcFN0YXR1cyAhPT0gJ292ZXJwYXltZW50JyAmJiB2aWV3Q29tcFN0YXR1cyAhPT0gJ292ZXJQYXltZW50QWRkcmVzc0NhcHR1cmUnICYmIHZpZXdDb21wU3RhdHVzICE9PSAnb3ZlcnBheW1lbnRjaGVja2FuZGFuc3dlcidcIj5cbiAgICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBpZD0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J1JFVFJPUkVNSVNTSU9OUkVGVU5EQ09ORklSTUFUSU9OUEFHRSc+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93IHBhZ2VzaXplXCI+XG4gICAgICA8ZGl2ID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXBhbmVsIGdvdnVrLXBhbmVsLS1jb25maXJtYXRpb25cIj5cbiAgICAgICAgICA8aDEgY2xhc3M9XCJnb3Z1ay1wYW5lbF9fdGl0bGVcIj5cbiAgICAgICAgICAgIFJlZnVuZCBzdWJtaXR0ZWRcbiAgICAgICAgICA8L2gxPlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXBhbmVsX19ib2R5XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHkgd2hpdGVcIj48c3Ryb25nPlJlZnVuZCByZWZlcmVuY2U6IHt7cmVmdW5kUmVmZXJlbmNlfX08L3N0cm9uZz48L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxoMiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbFwiPldoYXQgaGFwcGVucyBuZXh0PC9oMj5cbiAgICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5XCI+XG4gICAgICAgICAgQSByZWZ1bmQgcmVxdWVzdCBmb3Ige3tyZWZ1bmRBbW91bnQgIHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgfX0gaGFzIGJlZW4gY3JlYXRlZCBhbmQgd2lsbCBiZSBwYXNzZWQgdG8gYSB0ZWFtIGxlYWRlciB0byBhcHByb3ZlLlxuICAgICAgICA8L3A+XG4gICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5cbiAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ29Ub0Nhc2VUcmFuc2F0aW9uUGFnZSgkZXZlbnQpXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHBvaW50ZXJcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWJ1dHRvblwiPlxuICAgICAgICBSZXR1cm4gdG8gY2FzZVxuICAgIDwvYT5cbiAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cblxuPGNjcGF5LWNhc2UtdHJhbnNhY3Rpb25zICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ2Nhc2UtdHJhbnNhY3Rpb25zJ1wiXG5baXNGcm9tU2VydmljZVJlcXVlc3RQYWdlXT1cImlzU2VydmljZVJlcXVlc3RcIlxuW0xPR0dFRElOVVNFUlJPTEVTXSA9IFwiTE9HR0VESU5VU0VSUk9MRVNcIlxuW2lzVGFrZVBheW1lbnRdID0gXCJ0YWtlUGF5bWVudFwiPlxuPC9jY3BheS1jYXNlLXRyYW5zYWN0aW9ucz5cbiJdfQ==