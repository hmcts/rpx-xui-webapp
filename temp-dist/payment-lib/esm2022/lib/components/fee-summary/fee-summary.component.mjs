import { Component, Input } from '@angular/core';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { PaymentToPayhubRequest } from '../../interfaces/PaymentToPayhubRequest';
import { PayhubAntennaRequest } from '../../interfaces/PayhubAntennaRequest';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { OrderslistService } from '../../services/orderslist.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../services/bulk-scaning-payment/bulk-scaning-payment.service";
import * as i3 from "@angular/common";
import * as i4 from "../../services/payment-view/payment-view.service";
import * as i5 from "../../payment-lib.component";
import * as i6 from "../../services/orderslist.service";
import * as i7 from "@angular/forms";
import * as i8 from "../add-remission/add-remission.component";
import * as i9 from "../../pipes/ccd-hyphens.pipe";
function FeeSummaryComponent_div_0_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 8)(1, "a", 9);
    i0.ɵɵlistener("click", function FeeSummaryComponent_div_0_li_2_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r7.loadCaseTransactionPage()); });
    i0.ɵɵtext(2, "Back");
    i0.ɵɵelementEnd()();
} }
function FeeSummaryComponent_div_0_li_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 8)(1, "a", 9);
    i0.ɵɵlistener("click", function FeeSummaryComponent_div_0_li_3_Template_a_click_1_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r9.redirectToFeeSearchPage($event, "summary")); });
    i0.ɵɵtext(2, "Back");
    i0.ɵɵelementEnd()();
} }
function FeeSummaryComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5)(1, "ol", 6);
    i0.ɵɵtemplate(2, FeeSummaryComponent_div_0_li_2_Template, 3, 0, "li", 7);
    i0.ɵɵtemplate(3, FeeSummaryComponent_div_0_li_3_Template, 3, 0, "li", 7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r0.isTurnOff);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isTurnOff);
} }
function FeeSummaryComponent_div_1_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 26)(2, "h2", 27);
    i0.ɵɵtext(3, " Payment Group details could not be retrieved ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 28);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r12.errorMessage, " ");
} }
function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_3_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 47);
    i0.ɵɵlistener("click", function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_3_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r33); const fee_r20 = i0.ɵɵnextContext(2).$implicit; const ctx_r31 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r31.confirmRemoveFee(fee_r20.id)); });
    i0.ɵɵelement(1, "br");
    i0.ɵɵtext(2, "Remove");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r20 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r30 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("ngClass", ctx_r30.isPaymentExist || fee_r20.remissions ? "disable-link" : "");
} }
function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 45);
    i0.ɵɵtemplate(1, FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_3_a_1_Template, 3, 1, "a", 46);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r20 = i0.ɵɵnextContext().$implicit;
    const ctx_r22 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r22.isPaymentExist || !fee_r20.remissions);
} }
function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_4_Template(rf, ctx) { if (rf & 1) {
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 45)(1, "a", 48);
    i0.ɵɵlistener("click", function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_4_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r38); const fee_r20 = i0.ɵɵnextContext().$implicit; const ctx_r36 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r36.confirmRemoveFee(fee_r20.id)); });
    i0.ɵɵtext(2, "Remove");
    i0.ɵɵelementEnd()();
} }
function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_a_5_Template(rf, ctx) { if (rf & 1) {
    const _r41 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 49);
    i0.ɵɵlistener("click", function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_a_5_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r41); const fee_r20 = i0.ɵɵnextContext().$implicit; const ctx_r39 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r39.addRemission(fee_r20)); });
    i0.ɵɵtext(1, " Add help with fees or remission ");
    i0.ɵɵelementEnd();
} }
function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_a_6_Template(rf, ctx) { if (rf & 1) {
    const _r44 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 49);
    i0.ɵɵlistener("click", function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_a_6_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r44); const fee_r20 = i0.ɵɵnextContext().$implicit; const ctx_r42 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r42.addRemission(fee_r20)); });
    i0.ɵɵtext(1, " Add help with fees or remission ");
    i0.ɵɵelementEnd();
} }
function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_7_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r20 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r45 = i0.ɵɵnextContext(4);
    let tmp_0_0;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("Remission,", (tmp_0_0 = ctx_r45.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_0_0.hwf_reference, "");
} }
function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "br");
    i0.ɵɵtemplate(2, FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_7_div_2_Template, 2, 1, "div", 44);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r20 = i0.ɵɵnextContext().$implicit;
    const ctx_r26 = i0.ɵɵnextContext(4);
    let tmp_0_0;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ((tmp_0_0 = ctx_r26.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_0_0.hwf_amount) > 0);
} }
function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_td_8_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "br");
    i0.ɵɵelementStart(2, "div", 50);
    i0.ɵɵtext(3, "1");
    i0.ɵɵelementEnd()();
} }
function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_td_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 39);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_td_8_span_2_Template, 4, 0, "span", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r20 = i0.ɵɵnextContext().$implicit;
    const ctx_r27 = i0.ɵɵnextContext(4);
    let tmp_1_0;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", fee_r20.volume, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ((tmp_1_0 = ctx_r27.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_1_0.hwf_amount) > 0);
} }
function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵelement(1, "br")(2, "br");
    i0.ɵɵelementEnd();
} }
function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "br");
    i0.ɵɵelementStart(2, "div", 51);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const fee_r20 = i0.ɵɵnextContext().$implicit;
    const ctx_r29 = i0.ɵɵnextContext(4);
    let tmp_0_0;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" -", ((tmp_0_0 = ctx_r29.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_0_0.hwf_amount) ? i0.ɵɵpipeBind4(4, 1, (tmp_0_0 = ctx_r29.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_0_0.hwf_amount, "GBP", "symbol-narrow", "1.2-2") : "-", " ");
} }
function FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 31)(1, "td", 39);
    i0.ɵɵtext(2);
    i0.ɵɵtemplate(3, FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_3_Template, 2, 1, "span", 40);
    i0.ɵɵtemplate(4, FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_4_Template, 3, 0, "span", 40);
    i0.ɵɵtemplate(5, FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_a_5_Template, 2, 0, "a", 41);
    i0.ɵɵtemplate(6, FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_a_6_Template, 2, 0, "a", 41);
    i0.ɵɵtemplate(7, FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_7_Template, 3, 1, "span", 2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_td_8_Template, 3, 2, "td", 42);
    i0.ɵɵelementStart(9, "td", 43);
    i0.ɵɵelement(10, "br");
    i0.ɵɵtemplate(11, FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_div_11_Template, 3, 0, "div", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 43);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "currency");
    i0.ɵɵtemplate(15, FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_span_15_Template, 5, 6, "span", 2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const fee_r20 = ctx.$implicit;
    const ctx_r19 = i0.ɵɵnextContext(4);
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_7_0;
    let tmp_9_0;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", fee_r20.description, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r19.isPaymentExist || (((tmp_1_0 = ctx_r19.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_1_0.hwf_amount) === 0 || !((tmp_1_0 = ctx_r19.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_1_0.hwf_amount))) && !ctx_r19.isTurnOff);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (!ctx_r19.isPaymentExist || (((tmp_2_0 = ctx_r19.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_2_0.hwf_amount) === 0 || !((tmp_2_0 = ctx_r19.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_2_0.hwf_amount))) && ctx_r19.isTurnOff);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (((tmp_3_0 = ctx_r19.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_3_0.hwf_amount) === 0 || !((tmp_3_0 = ctx_r19.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_3_0.hwf_amount)) && !ctx_r19.isPaymentExist && !ctx_r19.isTurnOff);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (((tmp_4_0 = ctx_r19.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_4_0.hwf_amount) === 0 || !((tmp_4_0 = ctx_r19.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_4_0.hwf_amount)) && ctx_r19.isTurnOff);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ((tmp_5_0 = ctx_r19.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_5_0.hwf_amount) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", fee_r20.volume && fee_r20.volume > 0);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ((tmp_7_0 = ctx_r19.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_7_0.hwf_amount) > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(14, 10, fee_r20.calculated_amount, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ((tmp_9_0 = ctx_r19.getRemissionByFeeCode(fee_r20.code)) == null ? null : tmp_9_0.hwf_amount) > 0);
} }
function FeeSummaryComponent_div_1_table_12_tbody_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 37);
    i0.ɵɵtemplate(1, FeeSummaryComponent_div_1_table_12_tbody_10_tr_1_Template, 16, 15, "tr", 38);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r18.paymentGroup.fees);
} }
function FeeSummaryComponent_div_1_table_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 29)(1, "thead", 30)(2, "tr", 31)(3, "th", 32);
    i0.ɵɵtext(4, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th", 33);
    i0.ɵɵtext(6, "Quantity");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "th", 34);
    i0.ɵɵelementStart(8, "th", 35);
    i0.ɵɵtext(9, "Amount");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(10, FeeSummaryComponent_div_1_table_12_tbody_10_Template, 2, 1, "tbody", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngIf", ctx_r13.paymentGroup.fees);
} }
function FeeSummaryComponent_div_1_button_14_Template(rf, ctx) { if (rf & 1) {
    const _r52 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 52);
    i0.ɵɵlistener("click", function FeeSummaryComponent_div_1_button_14_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r52); const ctx_r51 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r51.redirectToFeeSearchPage($event, "summary")); });
    i0.ɵɵtext(1, " Add fee ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r14.isPaymentExist)("ngClass", ctx_r14.isPaymentExist ? "govuk-button govuk-button--secondary button--disabled" : "govuk-button govuk-button--secondary");
} }
function FeeSummaryComponent_div_1_a_15_Template(rf, ctx) { if (rf & 1) {
    const _r54 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 53);
    i0.ɵɵlistener("click", function FeeSummaryComponent_div_1_a_15_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r54); const ctx_r53 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r53.redirectToFeeSearchPage($event, "summary")); });
    i0.ɵɵtext(1, "Add a new fee");
    i0.ɵɵelementEnd();
} }
function FeeSummaryComponent_div_1_button_21_Template(rf, ctx) { if (rf & 1) {
    const _r56 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 54);
    i0.ɵɵlistener("click", function FeeSummaryComponent_div_1_button_21_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r56); const ctx_r55 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r55.takePayment()); });
    i0.ɵɵtext(1, " Take payment ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r16.totalFee <= 0 || ctx_r16.isConfirmationBtnDisabled)("ngClass", ctx_r16.totalFee <= 0 || !ctx_r16.platForm || !ctx_r16.service || ctx_r16.isConfirmationBtnDisabled ? "button button--disabled govuk-!-margin-right-1" : "button govuk-!-margin-right-1");
} }
function FeeSummaryComponent_div_1_button_22_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, " Allocate payment ");
    i0.ɵɵelementEnd();
} }
function FeeSummaryComponent_div_1_button_22_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, " Continue ");
    i0.ɵɵelementEnd();
} }
function FeeSummaryComponent_div_1_button_22_Template(rf, ctx) { if (rf & 1) {
    const _r60 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 55);
    i0.ɵɵlistener("click", function FeeSummaryComponent_div_1_button_22_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r60); const ctx_r59 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r59.goToAllocatePage(ctx_r59.outStandingAmount, ctx_r59.isFeeAmountZero)); });
    i0.ɵɵtemplate(1, FeeSummaryComponent_div_1_button_22_span_1_Template, 2, 0, "span", 2);
    i0.ɵɵtemplate(2, FeeSummaryComponent_div_1_button_22_span_2_Template, 2, 0, "span", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r17.outStandingAmount > 0 || ctx_r17.isFeeAmountZero && ctx_r17.outStandingAmount === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r17.outStandingAmount < 0 || !ctx_r17.isFeeAmountZero && ctx_r17.outStandingAmount === 0);
} }
function FeeSummaryComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "main", 11);
    i0.ɵɵelement(2, "input", 12, 13);
    i0.ɵɵelementStart(4, "div", 14)(5, "h1", 15);
    i0.ɵɵtext(6, "Summary ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 16);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "ccdHyphens");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, FeeSummaryComponent_div_1_div_10_Template, 6, 1, "div", 2);
    i0.ɵɵelementStart(11, "div", 17);
    i0.ɵɵtemplate(12, FeeSummaryComponent_div_1_table_12_Template, 11, 1, "table", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 19);
    i0.ɵɵtemplate(14, FeeSummaryComponent_div_1_button_14_Template, 2, 2, "button", 20);
    i0.ɵɵtemplate(15, FeeSummaryComponent_div_1_a_15_Template, 2, 0, "a", 21);
    i0.ɵɵelementStart(16, "div", 22)(17, "p", 23);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "currency");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "div");
    i0.ɵɵtemplate(21, FeeSummaryComponent_div_1_button_21_Template, 2, 2, "button", 24);
    i0.ɵɵtemplate(22, FeeSummaryComponent_div_1_button_22_Template, 3, 2, "button", 25);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("Case reference:", i0.ɵɵpipeBind1(9, 8, ctx_r1.ccdCaseNumber), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.errorMessage);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.errorMessage && ctx_r1.paymentGroup);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.isTurnOff);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.isTurnOff);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Total to pay: ", i0.ɵɵpipeBind4(19, 10, ctx_r1.outStandingAmount, "GBP", "symbol-narrow", "1.2-2"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r1.bsPaymentDcnNumber);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.bsPaymentDcnNumber);
} }
function FeeSummaryComponent_ng_container_2_button_14_Template(rf, ctx) { if (rf & 1) {
    const _r64 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 65);
    i0.ɵɵlistener("click", function FeeSummaryComponent_ng_container_2_button_14_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r64); const ctx_r63 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r63.removeFee(ctx_r63.currentFee)); });
    i0.ɵɵtext(1, " Remove ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r62 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r62.isRemoveBtnDisabled ? "button button--disabled govuk-!-margin-right-1" : "button govuk-!-margin-right-1");
} }
function FeeSummaryComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r66 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 56, 13);
    i0.ɵɵelementStart(3, "div", 57)(4, "span", 58);
    i0.ɵɵtext(5, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong", 59)(7, "span", 60);
    i0.ɵɵtext(8, "Warning");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " Are you sure you want to delete this fee? ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 61)(11, "form", 62)(12, "button", 63);
    i0.ɵɵlistener("click", function FeeSummaryComponent_ng_container_2_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r66); const ctx_r65 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r65.cancelRemission()); });
    i0.ɵɵtext(13, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, FeeSummaryComponent_ng_container_2_button_14_Template, 2, 1, "button", 64);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngIf", !ctx_r2.isRemoveBtnDisabled);
} }
function FeeSummaryComponent_ccpay_add_remission_3_Template(rf, ctx) { if (rf & 1) {
    const _r68 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccpay-add-remission", 66);
    i0.ɵɵlistener("cancelRemission", function FeeSummaryComponent_ccpay_add_remission_3_Template_ccpay_add_remission_cancelRemission_0_listener() { i0.ɵɵrestoreView(_r68); const ctx_r67 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r67.cancelRemission()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("isTurnOff", ctx_r3.isTurnOff)("isStrategicFixEnable", ctx_r3.isStrategicFixEnable)("fee", ctx_r3.currentFee)("caseType", ctx_r3.caseType)("ccdCaseNumber", ctx_r3.ccdCaseNumber)("paymentGroupRef", ctx_r3.paymentGroupRef);
} }
function FeeSummaryComponent_input_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 67, 13);
} }
const BS_ENABLE_FLAG = 'bulk-scan-enabling-fe';
export class FeeSummaryComponent {
    router;
    bulkScaningPaymentService;
    location;
    paymentViewService;
    paymentLibComponent;
    OrderslistService;
    paymentGroupRef;
    ccdCaseNumber;
    isTurnOff;
    caseType;
    bsPaymentDcnNumber;
    paymentGroup;
    errorMessage;
    viewStatus = 'main';
    currentFee;
    totalFee;
    payhubHtml;
    service = "";
    platForm = "";
    upPaymentErrorMessage;
    selectedOption;
    isBackButtonEnable = true;
    outStandingAmount;
    isFeeAmountZero = false;
    totalAfterRemission = 0;
    isConfirmationBtnDisabled = false;
    isRemoveBtnDisabled = false;
    isPaymentExist = false;
    isRemissionsExist = false;
    isRemissionsMatch = false;
    isStrategicFixEnable;
    constructor(router, bulkScaningPaymentService, location, paymentViewService, paymentLibComponent, OrderslistService) {
        this.router = router;
        this.bulkScaningPaymentService = bulkScaningPaymentService;
        this.location = location;
        this.paymentViewService = paymentViewService;
        this.paymentLibComponent = paymentLibComponent;
        this.OrderslistService = OrderslistService;
    }
    ngOnInit() {
        this.viewStatus = 'main';
        this.caseType = this.paymentLibComponent.CASETYPE;
        this.bsPaymentDcnNumber = this.paymentLibComponent.bspaymentdcn;
        this.selectedOption = this.paymentLibComponent.SELECTED_OPTION.toLocaleLowerCase();
        this.isStrategicFixEnable = this.paymentLibComponent.ISSFENABLE;
        this.OrderslistService.setCaseType(this.paymentLibComponent.CASETYPE);
        this.platForm = 'Antenna';
        this.paymentViewService.getBSfeature().subscribe(features => {
            let result = JSON.parse(features).filter(feature => feature.uid === BS_ENABLE_FLAG);
            this.paymentLibComponent.ISBSENABLE = result[0] ? result[0].enable : false;
        }, err => {
            this.paymentLibComponent.ISBSENABLE = false;
        });
        if (this.bsPaymentDcnNumber) {
            this.getUnassignedPaymentlist();
        }
        this.getPaymentGroup();
    }
    getUnassignedPaymentlist() {
        if (this.selectedOption === 'dcn') {
            this.bulkScaningPaymentService.getBSPaymentsByDCN(this.paymentLibComponent.DCN_NUMBER).subscribe(unassignedPayments => {
                if (unassignedPayments['data'].payments) {
                    this.service = unassignedPayments['data'].responsible_service_id;
                }
                else {
                    this.upPaymentErrorMessage = 'error';
                }
            }, (error) => this.upPaymentErrorMessage = error);
        }
        else {
            this.bulkScaningPaymentService.getBSPaymentsByCCD(this.ccdCaseNumber).subscribe(unassignedPayments => {
                if (unassignedPayments['data'].payments) {
                    this.service = unassignedPayments['data'].responsible_service_id;
                }
                else {
                    this.upPaymentErrorMessage = 'error';
                }
            }, (error) => this.upPaymentErrorMessage = error);
        }
    }
    getRemissionByFeeCode(feeCode) {
        if (this.paymentGroup && this.paymentGroup.remissions && this.paymentGroup.remissions.length > 0) {
            for (const remission of this.paymentGroup.remissions) {
                if (remission.fee_code === feeCode) {
                    return remission;
                }
            }
        }
        return null;
    }
    addRemission(fee) {
        this.currentFee = fee;
        this.viewStatus = 'add_remission';
    }
    getPaymentGroup() {
        let fees = [];
        this.paymentViewService.getPaymentGroupDetails(this.paymentGroupRef).subscribe(paymentGroup => {
            this.paymentGroup = paymentGroup;
            this.isPaymentExist = paymentGroup.payments ? paymentGroup.payments.length > 0 : false;
            this.isRemissionsExist = paymentGroup.remissions ? paymentGroup.remissions.length > 0 : false;
            if (paymentGroup.fees) {
                paymentGroup.fees.forEach(fee => {
                    this.totalAfterRemission = this.totalAfterRemission + fee.net_amount;
                    if (fee.calculated_amount === 0) {
                        this.isFeeAmountZero = true;
                    }
                    if (paymentGroup.remissions) {
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
                    }
                    else {
                        fees.push(fee);
                    }
                });
                paymentGroup.fees = fees;
            }
            this.outStandingAmount = this.bulkScaningPaymentService.calculateOutStandingAmount(paymentGroup);
        }, (error) => this.errorMessage = error.replace(/"/g, ""));
    }
    confirmRemoveFee(fee) {
        this.isRemoveBtnDisabled = false;
        this.currentFee = fee;
        this.viewStatus = 'feeRemovalConfirmation';
    }
    removeFee(fee) {
        this.isRemoveBtnDisabled = true;
        this.paymentViewService.deleteFeeFromPaymentGroup(fee).subscribe((success) => {
            if (this.paymentGroup.fees && this.paymentGroup.fees.length > 1) {
                this.totalAfterRemission = 0;
                this.getPaymentGroup();
                this.viewStatus = 'main';
                return;
            }
            this.loadCaseTransactionPage();
        }, (error) => {
            this.errorMessage = error;
            this.isRemoveBtnDisabled = false;
        });
    }
    loadCaseTransactionPage() {
        this.paymentLibComponent.TAKEPAYMENT = true;
        this.paymentLibComponent.viewName = 'case-transactions';
        this.paymentViewService.getBSfeature().subscribe(features => {
            let result = JSON.parse(features).filter(feature => feature.uid === BS_ENABLE_FLAG);
            this.paymentLibComponent.ISBSENABLE = result[0] ? result[0].enable : false;
        }, err => {
            this.paymentLibComponent.ISBSENABLE = false;
        });
        let partUrl = `selectedOption=${this.paymentLibComponent.SELECTED_OPTION}`;
        partUrl += this.bsPaymentDcnNumber ? `&dcn=${this.bsPaymentDcnNumber}` : '';
        partUrl += this.paymentLibComponent.ISBSENABLE ? '&isBulkScanning=Enable' : '&isBulkScanning=Disable';
        partUrl += this.paymentLibComponent.ISTURNOFF ? '&isTurnOff=Enable' : '&isTurnOff=Disable';
        partUrl += this.paymentLibComponent.ISSFENABLE ? '&isStFixEnable=Enable' : '&isStFixEnable=Disable';
        partUrl += `&caseType=${this.paymentLibComponent.CASETYPE}`;
        let url = `/payment-history/${this.ccdCaseNumber}?view=case-transactions&takePayment=true&${partUrl}`;
        this.router.navigateByUrl(url);
    }
    cancelRemission() {
        this.viewStatus = 'main';
    }
    redirectToFeeSearchPage(event, page) {
        event.preventDefault();
        let partUrl = this.bsPaymentDcnNumber ? `&dcn=${this.bsPaymentDcnNumber}` : '';
        partUrl += this.paymentLibComponent.ISBSENABLE ? '&isBulkScanning=Enable' : '&isBulkScanning=Disable';
        partUrl += this.paymentLibComponent.ISTURNOFF ? '&isTurnOff=Enable' : '&isTurnOff=Disable';
        partUrl += this.paymentLibComponent.ISSFENABLE ? '&isStFixEnable=Enable' : '&isStFixEnable=Disable';
        partUrl += `&caseType=${this.paymentLibComponent.CASETYPE}`;
        if (this.viewStatus === 'feeRemovalConfirmation' || this.viewStatus === 'add_remission') {
            this.viewStatus = 'main';
            return;
        }
        let url = `/fee-search?ccdCaseNumber=${this.ccdCaseNumber}&selectedOption=${this.paymentLibComponent.SELECTED_OPTION}&paymentGroupRef=${this.paymentGroupRef}${partUrl}`;
        this.router.navigateByUrl(url);
    }
    takePayment() {
        this.isConfirmationBtnDisabled = true;
        const requestBody = new PaymentToPayhubRequest(this.ccdCaseNumber, this.outStandingAmount, this.caseType), antennaReqBody = new PayhubAntennaRequest(this.ccdCaseNumber, this.outStandingAmount, this.caseType);
        if (this.platForm === 'Antenna') {
            this.paymentViewService.postPaymentAntennaToPayHub(antennaReqBody, this.paymentGroupRef).subscribe(response => {
                this.isBackButtonEnable = false;
                window.location.href = '/makePaymentByTelephoneyProvider';
            }, (error) => {
                this.errorMessage = error;
                this.isConfirmationBtnDisabled = false;
                this.router.navigateByUrl('/pci-pal-failure');
            });
        }
    }
    goToAllocatePage(outStandingAmount, isFeeAmountZero) {
        if (outStandingAmount > 0 || (outStandingAmount === 0 && isFeeAmountZero)) {
            this.paymentLibComponent.paymentGroupReference = this.paymentGroupRef;
            this.paymentLibComponent.viewName = 'allocate-payments';
        }
        else {
            this.loadCaseTransactionPage();
        }
    }
    isCheckAmountdueExist(amountDue) {
        return typeof amountDue === 'undefined';
    }
    static ɵfac = function FeeSummaryComponent_Factory(t) { return new (t || FeeSummaryComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.BulkScaningPaymentService), i0.ɵɵdirectiveInject(i3.Location), i0.ɵɵdirectiveInject(i4.PaymentViewService), i0.ɵɵdirectiveInject(i5.PaymentLibComponent), i0.ɵɵdirectiveInject(i6.OrderslistService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FeeSummaryComponent, selectors: [["ccpay-fee-summary"]], inputs: { paymentGroupRef: "paymentGroupRef", ccdCaseNumber: "ccdCaseNumber", isTurnOff: "isTurnOff", caseType: "caseType" }, decls: 5, vars: 5, consts: [["class", "govuk-breadcrumbs", 4, "ngIf"], ["class", "fee-summary", 4, "ngIf"], [4, "ngIf"], [3, "isTurnOff", "isStrategicFixEnable", "fee", "caseType", "ccdCaseNumber", "paymentGroupRef", "cancelRemission", 4, "ngIf"], ["type", "hidden", "class", "iFrameDrivenImageValue", "value", "PCIPAL", 4, "ngIf"], [1, "govuk-breadcrumbs"], [1, "govuk-breadcrumbs__list"], ["class", "govuk-breadcrumbs__list-item", 4, "ngIf"], [1, "govuk-breadcrumbs__list-item"], [1, "govuk-back-link", "govuk-label", 3, "click"], [1, "fee-summary"], [1, "govuk-main-wrapper"], ["type", "hidden", "value", "FEESUMMARY", 1, "iFrameDrivenImageValue"], ["myInput", ""], [1, "summaryheader"], [1, "heading-large", "govuk-!-margin-top-3", "govuk-!-margin-bottom-4"], [1, "govuk-!-margin-top-5", "caseref"], [1, "govuk-!-margin-top-3"], ["class", "govuk-table  govuk-!-margin-bottom-2", 4, "ngIf"], [1, "addfee"], [3, "disabled", "ngClass", "click", 4, "ngIf"], ["class", "govuk-button govuk-button--secondary", 3, "click", 4, "ngIf"], [1, "feeAddButton"], [1, "paddigleft", "govuk-!-margin-top-2"], ["type", "submit", 3, "disabled", "ngClass", "click", 4, "ngIf"], ["type", "button", "class", "button govuk-!-margin-right-1", 3, "click", 4, "ngIf"], ["role", "group", "aria-labelledby", "failure-error-summary-heading", "tabindex", "-1", 1, "error-summary"], ["id", "failure-error-summary-heading", 1, "heading-medium", "error-summary-heading"], [1, "govuk-error-summary__body"], [1, "govuk-table", "govuk-!-margin-bottom-2"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["scope", "col", 1, "class600"], ["scope", "col", 1, "class60"], ["scope", "col", 1, "class80"], ["scope", "col", 1, "class100"], ["class", "govuk-table__body", 4, "ngIf"], [1, "govuk-table__body"], ["class", "govuk-table__row", 4, "ngFor", "ngForOf"], [1, "govuk-table__cell"], ["class", "no-border", 4, "ngIf"], ["class", "remissionActive", 3, "click", 4, "ngIf"], ["class", "govuk-table__cell", 4, "ngIf"], [1, "govuk-table__cell", "alignright"], ["class", "govuk-table__cell_border", 4, "ngIf"], [1, "no-border"], [3, "ngClass", "click", 4, "ngIf"], [3, "ngClass", "click"], [3, "click"], [1, "remissionActive", 3, "click"], [1, "govuk-table__cell_border"], [1, "govuk-table__cell_rmborder", "alignright"], [3, "disabled", "ngClass", "click"], [1, "govuk-button", "govuk-button--secondary", 3, "click"], ["type", "submit", 3, "disabled", "ngClass", "click"], ["type", "button", 1, "button", "govuk-!-margin-right-1", 3, "click"], ["type", "hidden", "value", "FEEREMOVALCONFIRMATION_1", 1, "iFrameDrivenImageValue"], [1, "govuk-warning-text"], ["aria-hidden", "true", 1, "govuk-warning-text__icon"], [1, "govuk-warning-text__text"], [1, "govuk-warning-text__assistive"], [1, "govuk-button-grb"], ["novalidate", ""], ["type", "submit", 1, "button", "govuk-button--secondary", 3, "click"], ["type", "submit", "class", "button", 3, "ngClass", "click", 4, "ngIf"], ["type", "submit", 1, "button", 3, "ngClass", "click"], [3, "isTurnOff", "isStrategicFixEnable", "fee", "caseType", "ccdCaseNumber", "paymentGroupRef", "cancelRemission"], ["type", "hidden", "value", "PCIPAL", 1, "iFrameDrivenImageValue"]], template: function FeeSummaryComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, FeeSummaryComponent_div_0_Template, 4, 2, "div", 0);
            i0.ɵɵtemplate(1, FeeSummaryComponent_div_1_Template, 23, 15, "div", 1);
            i0.ɵɵtemplate(2, FeeSummaryComponent_ng_container_2_Template, 15, 1, "ng-container", 2);
            i0.ɵɵtemplate(3, FeeSummaryComponent_ccpay_add_remission_3_Template, 1, 6, "ccpay-add-remission", 3);
            i0.ɵɵtemplate(4, FeeSummaryComponent_input_4_Template, 2, 0, "input", 4);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.isBackButtonEnable);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "main");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "feeRemovalConfirmation");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "add_remission" && ctx.currentFee);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "payhub_view" && ctx.payhubHtml);
        } }, dependencies: [i3.NgClass, i3.NgForOf, i3.NgIf, i7.ɵNgNoValidate, i7.NgControlStatusGroup, i7.NgForm, i8.AddRemissionComponent, i3.CurrencyPipe, i9.CcdHyphensPipe], styles: [".fee-summary[_ngcontent-%COMP%]   .grey-text[_ngcontent-%COMP%]{color:#6b7376;font-weight:500}.fee-summary[_ngcontent-%COMP%]   .govuk-table[_ngcontent-%COMP%]{margin-bottom:0}.fee-summary[_ngcontent-%COMP%]   .no-border[_ngcontent-%COMP%]{border:none;border-bottom:none}.fee-summary[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .fee-summary[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:19px;vertical-align:top}.fee-summary[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .no-padding[_ngcontent-%COMP%], .fee-summary[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .no-padding[_ngcontent-%COMP%]{padding:0}.fee-summary[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .subcolumn-1[_ngcontent-%COMP%], .fee-summary[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .subcolumn-1[_ngcontent-%COMP%]{width:45%}.fee-summary[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .subcolumn-2[_ngcontent-%COMP%], .fee-summary[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .subcolumn-2[_ngcontent-%COMP%]{width:25%;text-align:right}.fee-summary[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .subcolumn-3[_ngcontent-%COMP%], .fee-summary[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .subcolumn-3[_ngcontent-%COMP%]{width:30%;text-align:center}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:700}.govuk-button-grb[_ngcontent-%COMP%]{padding-bottom:20px}.govuk-button-grb[_ngcontent-%COMP%]   .govuk-button--secondary[_ngcontent-%COMP%]{background-color:#dee0e2;box-shadow:0 2px #858688;color:#0b0c0c;margin-right:10px}.govuk-form-group--mg[_ngcontent-%COMP%]{margin-top:10px!important}.govuk-fieldset__heading--fz[_ngcontent-%COMP%]{font-size:16px}.remissionDisable[_ngcontent-%COMP%]{color:gray;cursor:default}.heading-xlarge[_ngcontent-%COMP%]{margin:0 0 14px -20px}.govuk-select--custom[_ngcontent-%COMP%]{width:50%}.disable-link[_ngcontent-%COMP%]{cursor:default;pointer-events:none;color:#8e8c8c}.govuk-table__header[_ngcontent-%COMP%], .govuk-table__cell_border[_ngcontent-%COMP%]{padding:10px 0 0;border-top:1px solid #bfc1c3;text-align:left}.govuk-table__header[_ngcontent-%COMP%], .govuk-table__cell[_ngcontent-%COMP%]{padding:10px 0}.govuk-table__header[_ngcontent-%COMP%], .govuk-table__cell_rmborder[_ngcontent-%COMP%]{padding:10px 0 0;border-top:1px solid #bfc1c3;text-align:left}.govuk-table__fessheader[_ngcontent-%COMP%]{font-weight:700}.govuk-button[_ngcontent-%COMP%]{font-size:19px}.feeAddButton[_ngcontent-%COMP%]{padding-left:65rem}.remissionActive[_ngcontent-%COMP%]{padding-left:10px}.paddigleft[_ngcontent-%COMP%]{padding-left:2em}.govuk-back-link[_ngcontent-%COMP%]{font-size:1.5rem!important}.govuk-warning-text__text[_ngcontent-%COMP%]{font-size:19px}.summaryheader[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;width:960px}.class600[_ngcontent-%COMP%]{width:600px}.class60[_ngcontent-%COMP%]{width:60px}.class80[_ngcontent-%COMP%]{width:80px;text-align:right}.class100[_ngcontent-%COMP%]{width:100px;text-align:right}.alignright[_ngcontent-%COMP%]{text-align:right}.caseref[_ngcontent-%COMP%]{align-self:flex-end}.addfee[_ngcontent-%COMP%]{display:flex;flex-direction:row}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FeeSummaryComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-fee-summary', template: "\n<div class=\"govuk-breadcrumbs\" *ngIf=\"isBackButtonEnable\">\n  <ol class=\"govuk-breadcrumbs__list\">\n    <li class=\"govuk-breadcrumbs__list-item\" *ngIf=\"!isTurnOff\">\n      <a (click)=\"loadCaseTransactionPage()\" class=\"govuk-back-link govuk-label\">Back</a>\n    </li>\n    <li class=\"govuk-breadcrumbs__list-item\" *ngIf=\"isTurnOff\">\n        <a (click)=\"redirectToFeeSearchPage($event,'summary')\" class=\"govuk-back-link govuk-label\">Back</a>\n      </li>\n  </ol>\n</div>\n<div class=\"fee-summary\" *ngIf=\"viewStatus === 'main'\">\n    <main class=\"govuk-main-wrapper\">\n      <input #myInput type='hidden' class='iFrameDrivenImageValue' value='FEESUMMARY'>\n      <div class=\"summaryheader\">\n          <h1 class=\"heading-large govuk-!-margin-top-3 govuk-!-margin-bottom-4\">Summary </h1>\n          <p class=\"govuk-!-margin-top-5 caseref\">Case reference:{{ccdCaseNumber | ccdHyphens}}</p>\n        </div>\n\n  <!-- <div class=\"govuk-grid-row\">\n    <div class=\"govuk-grid-column-two-thirds\">\n      <h1 class=\"heading-xlarge\">Fee Summary</h1>\n    </div>\n\n\n    \u00A0<div\u00A0class=\"govuk-grid-column-one-third\"\u00A0align=\"right\">\n      \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0<button\u00A0 *ngIf=\"!isTurnOff\" (click)=\"redirectToFeeSearchPage($event,'summary')\"\n      \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0[disabled]=\"isPaymentExist\"\n      \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0[ngClass]='isPaymentExist ?\u00A0\"button\u00A0button--disabled govuk-!-margin-right-1\"\u00A0:\u00A0\"button govuk-!-margin-right-1\"'>\n              Add a new fee\n            </button>\n\n            <a *ngIf=\"isTurnOff\" (click)=\"redirectToFeeSearchPage($event,'summary')\" class=\"button\">Add a new fee</a>\n    </div>\n  </div> -->\n\n\n  <div *ngIf=\"errorMessage\">\n    <div class=\"error-summary\" role=\"group\" aria-labelledby=\"failure-error-summary-heading\" tabindex=\"-1\">\n      <h2 class=\"heading-medium error-summary-heading\" id=\"failure-error-summary-heading\">\n        Payment Group details could not be retrieved\n      </h2>\n      <div class=\"govuk-error-summary__body\">\n        {{ errorMessage }}\n      </div>\n    </div>\n  </div>\n\n  <div class=\"govuk-!-margin-top-3\">\n      <table class=\"govuk-table  govuk-!-margin-bottom-2\" *ngIf=\"!errorMessage && paymentGroup\">\n          <thead class=\"govuk-table__head\">\n              <tr class=\"govuk-table__row\">\n                  <th class=\"govuk-table__header\" scope=\"col\" class=\"class600\">Description</th>\n                  <th class=\"govuk-table__header\" scope=\"col\" class=\"class60\">Quantity</th>\n                  <th class=\"govuk-table__header\" scope=\"col\" class=\"class80\"></th>\n                  <th class=\"govuk-table__header\" scope=\"col\" class=\"class100\">Amount</th>\n              </tr>\n          </thead>\n\n          <tbody class=\"govuk-table__body\" *ngIf=\"paymentGroup.fees\">\n              <tr class=\"govuk-table__row\" *ngFor=\"let fee of paymentGroup.fees; let i = index;\">\n                      <td class=\"govuk-table__cell\">{{ fee.description }}\n\n                          <span class=\"no-border\" *ngIf=\"(isPaymentExist || (getRemissionByFeeCode(fee.code)?.hwf_amount === 0 || !getRemissionByFeeCode(fee.code)?.hwf_amount)) && !isTurnOff\">\n\n\n                              <a (click)=\"confirmRemoveFee(fee.id)\" *ngIf=\"(!isPaymentExist || !fee.remissions)\" [ngClass]='isPaymentExist || fee.remissions? \"disable-link\" : \"\"'> <br>Remove</a>\n                          </span>\n\n                          <span class=\"no-border\" *ngIf=\"(!isPaymentExist || (getRemissionByFeeCode(fee.code)?.hwf_amount === 0 || !getRemissionByFeeCode(fee.code)?.hwf_amount)) && isTurnOff \">\n                              <a (click)=\"confirmRemoveFee(fee.id)\">Remove</a>\n                            </span>\n\n                            <a (click)=\"addRemission(fee)\" class=\"remissionActive\"  *ngIf=\"(getRemissionByFeeCode(fee.code)?.hwf_amount === 0 || !getRemissionByFeeCode(fee.code)?.hwf_amount) && !isPaymentExist && !isTurnOff\">\n                                  Add help with fees or remission\n                            </a>\n                            <a (click)=\"addRemission(fee)\" class=\"remissionActive\"   *ngIf=\"(getRemissionByFeeCode(fee.code)?.hwf_amount === 0 || !getRemissionByFeeCode(fee.code)?.hwf_amount) && isTurnOff\">\n                                  Add help with fees or remission\n                            </a>\n                            <span *ngIf = \"getRemissionByFeeCode(fee.code)?.hwf_amount > 0\">\n                              <br>\n                                <div class=\"govuk-table__cell_border\" *ngIf = \"getRemissionByFeeCode(fee.code)?.hwf_amount > 0\">Remission,{{ getRemissionByFeeCode(fee.code)?.hwf_reference }}</div>\n                            </span>\n                      </td>\n\n                      <td class=\"govuk-table__cell\" *ngIf=\"fee.volume && fee.volume > 0\">\n                          {{ fee.volume }}\n                          <span  *ngIf = \"getRemissionByFeeCode(fee.code)?.hwf_amount > 0\">\n                             <br>\n                             <div class=\"govuk-table__cell_border\">1</div>\n                          </span>\n                      </td>\n\n                      <td  class=\"govuk-table__cell alignright\">\n                       <br>\n                        <div *ngIf = \"getRemissionByFeeCode(fee.code)?.hwf_amount > 0\" class=\"govuk-table__cell_border\"> <br><br></div>\n                      </td>\n                      <td class=\"govuk-table__cell alignright\" >\n                        {{ fee.calculated_amount | currency:'GBP':'symbol-narrow':'1.2-2' }}\n                        <span *ngIf = \"getRemissionByFeeCode(fee.code)?.hwf_amount > 0\">\n                            <br>\n                            <div class=\"govuk-table__cell_rmborder alignright\">\n                                -{{ getRemissionByFeeCode(fee.code)?.hwf_amount? ( getRemissionByFeeCode(fee.code)?.hwf_amount  | currency:'GBP':'symbol-narrow':'1.2-2') : '-' }}\n                              </div>\n                            </span>\n                      </td>\n\n\n              </tr>\n              <!-- <tr>\n                  <td *ngIf = \"getRemissionByFeeCode(fee.code)?.hwf_amount > 0\">\n                      <br>\n                        <div class=\"govuk-table__cell_border\" *ngIf = \"getRemissionByFeeCode(fee.code)?.hwf_amount > 0\">Remission,{{ getRemissionByFeeCode(fee.code)?.hwf_reference }}</div>\n                    </td>\n                    <td *ngIf = \"getRemissionByFeeCode(fee.code)?.hwf_amount ===''\">\n                        <div class=\"govuk-table__cell_border\"></div>\n                    </td>\n                    <td *ngIf = \"getRemissionByFeeCode(fee.code)?.hwf_amount === ''\">\n                        <br>\n                          <div class=\"govuk-table__cell_border\" *ngIf = \"getRemissionByFeeCode(fee.code)?.hwf_amount === ''\"></div>\n                      </td>\n                      <td>\n                          <br>\n                            <div class=\"govuk-table__cell_border\" style=\"text-align: right;\">\n                                -{{ getRemissionByFeeCode(fee.code)?.hwf_amount? ( getRemissionByFeeCode(fee.code)?.hwf_amount  | currency:'GBP':'symbol-narrow':'1.2-2') : '-' }}\n                              </div>\n                        </td>\n              </tr> -->\n          </tbody>\n      </table>\n  </div>\n  <div class=\"addfee\">\n      <button  *ngIf=\"!isTurnOff\" (click)=\"redirectToFeeSearchPage($event,'summary')\"\n              [disabled]=\"isPaymentExist\"\n              [ngClass]='isPaymentExist ? \"govuk-button govuk-button--secondary button--disabled\" : \"govuk-button govuk-button--secondary\"'>\n                Add fee\n      </button>\n    <a *ngIf=\"isTurnOff\" (click)=\"redirectToFeeSearchPage($event,'summary')\" class=\"govuk-button govuk-button--secondary\">Add a new fee</a>\n   <div  class=\"feeAddButton\">\n          <p class=\"paddigleft govuk-!-margin-top-2\">Total to pay: {{ outStandingAmount | currency:'GBP':'symbol-narrow':'1.2-2'}}</p>\n    </div>\n  </div>\n<!--\n  <div class=\"govuk-form-group govuk-form-group--mg\" *ngIf=\"!bsPaymentDcnNumber\">\n      <label class=\"govuk-label custom-govuk-label govuk-fieldset__heading--fz\" for=\"responsibleOffice\">\n        <strong>What service is this fee for?</strong>\n      </label>\n      <select class=\"govuk-select govuk-select--custom\" id=\"responsibleOffice\" [(ngModel)]=\"service\" name=\"responsibleOffice\">\n        <option value=\"\" selected='selected'>Please select</option>\n        <option value=\"AA07\">Divorce</option>\n        <option value=\"AA09\">Financial Remedy</option>\n        <option value=\"AA08\">Probate</option>\n      </select>\n  </div> -->\n\n  <div>\n      <button *ngIf=\"!bsPaymentDcnNumber\" type=\"submit\" (click)=\"takePayment()\"\n      [disabled]=\"totalFee <= 0 || isConfirmationBtnDisabled\"\n      [ngClass]='totalFee <= 0 || !platForm || !service || isConfirmationBtnDisabled? \"button button--disabled govuk-!-margin-right-1\" : \"button govuk-!-margin-right-1\"'>\n        Take payment\n    </button>\n    <button *ngIf=\"bsPaymentDcnNumber\" type=\"button\" (click)=\"goToAllocatePage(outStandingAmount, isFeeAmountZero)\" class=\"button govuk-!-margin-right-1\">\n      <span *ngIf=\"outStandingAmount > 0 || (isFeeAmountZero && outStandingAmount === 0)\">\n        Allocate payment\n      </span>\n      <span *ngIf=\"outStandingAmount < 0 || (!isFeeAmountZero && outStandingAmount === 0)\">\n        Continue\n      </span>\n    </button>\n  </div>\n\n</main>\n</div>\n\n  <ng-container *ngIf=\"viewStatus === 'feeRemovalConfirmation'\">\n    <input #myInput type='hidden' class='iFrameDrivenImageValue' value='FEEREMOVALCONFIRMATION_1'>\n      <div class=\"govuk-warning-text\">\n        <span class=\"govuk-warning-text__icon\" aria-hidden=\"true\">!</span>\n        <strong class=\"govuk-warning-text__text\">\n          <span class=\"govuk-warning-text__assistive\">Warning</span>\n          Are you sure you want to delete this fee?\n        </strong>\n      </div>\n      <div class=\"govuk-button-grb\">\n        <form novalidate>\n          <button type=\"submit\" class=\"button govuk-button--secondary\" (click)=\"cancelRemission()\">\n            Cancel\n          </button>\n          <button type=\"submit\" class=\"button\"\n          *ngIf =\"!isRemoveBtnDisabled\"\n          [ngClass]='isRemoveBtnDisabled ? \"button button--disabled govuk-!-margin-right-1\" : \"button govuk-!-margin-right-1\"'\n          (click)=\"removeFee(currentFee)\">\n            Remove\n          </button>\n        </form>\n      </div>\n    </ng-container>\n<ccpay-add-remission *ngIf=\"viewStatus === 'add_remission' && currentFee\"\n [isTurnOff]=\"isTurnOff\"\n [isStrategicFixEnable]=\"isStrategicFixEnable\"\n [fee]=\"currentFee\"\n [caseType]=\"caseType\"\n [ccdCaseNumber]=\"ccdCaseNumber\"\n [paymentGroupRef]=\"paymentGroupRef\"\n (cancelRemission)=\"cancelRemission()\"></ccpay-add-remission>\n <input *ngIf=\"viewStatus === 'payhub_view' && payhubHtml\" #myInput type='hidden' class='iFrameDrivenImageValue' value='PCIPAL'>\n", styles: [".fee-summary .grey-text{color:#6b7376;font-weight:500}.fee-summary .govuk-table{margin-bottom:0}.fee-summary .no-border{border:none;border-bottom:none}.fee-summary table th,.fee-summary table td{font-size:19px;vertical-align:top}.fee-summary table th .no-padding,.fee-summary table td .no-padding{padding:0}.fee-summary table th .subcolumn-1,.fee-summary table td .subcolumn-1{width:45%}.fee-summary table th .subcolumn-2,.fee-summary table td .subcolumn-2{width:25%;text-align:right}.fee-summary table th .subcolumn-3,.fee-summary table td .subcolumn-3{width:30%;text-align:center}table th{font-weight:700}.govuk-button-grb{padding-bottom:20px}.govuk-button-grb .govuk-button--secondary{background-color:#dee0e2;box-shadow:0 2px #858688;color:#0b0c0c;margin-right:10px}.govuk-form-group--mg{margin-top:10px!important}.govuk-fieldset__heading--fz{font-size:16px}.remissionDisable{color:gray;cursor:default}.heading-xlarge{margin:0 0 14px -20px}.govuk-select--custom{width:50%}.disable-link{cursor:default;pointer-events:none;color:#8e8c8c}.govuk-table__header,.govuk-table__cell_border{padding:10px 0 0;border-top:1px solid #bfc1c3;text-align:left}.govuk-table__header,.govuk-table__cell{padding:10px 0}.govuk-table__header,.govuk-table__cell_rmborder{padding:10px 0 0;border-top:1px solid #bfc1c3;text-align:left}.govuk-table__fessheader{font-weight:700}.govuk-button{font-size:19px}.feeAddButton{padding-left:65rem}.remissionActive{padding-left:10px}.paddigleft{padding-left:2em}.govuk-back-link{font-size:1.5rem!important}.govuk-warning-text__text{font-size:19px}.summaryheader{display:flex;flex-direction:row;justify-content:space-between;width:960px}.class600{width:600px}.class60{width:60px}.class80{width:80px;text-align:right}.class100{width:100px;text-align:right}.alignright{text-align:right}.caseref{align-self:flex-end}.addfee{display:flex;flex-direction:row}\n"] }]
    }], function () { return [{ type: i1.Router }, { type: i2.BulkScaningPaymentService }, { type: i3.Location }, { type: i4.PaymentViewService }, { type: i5.PaymentLibComponent }, { type: i6.OrderslistService }]; }, { paymentGroupRef: [{
            type: Input
        }], ccdCaseNumber: [{
            type: Input
        }], isTurnOff: [{
            type: Input
        }], caseType: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVlLXN1bW1hcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9jb21wb25lbnRzL2ZlZS1zdW1tYXJ5L2ZlZS1zdW1tYXJ5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9mZWUtc3VtbWFyeS9mZWUtc3VtbWFyeS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN0RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUM3RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUdsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUU3RSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7Ozs7Ozs7O0lDVGxFLDZCQUE0RCxXQUFBO0lBQ3ZELGlLQUFTLGVBQUEsZ0NBQXlCLENBQUEsSUFBQztJQUFxQyxvQkFBSTtJQUFBLGlCQUFJLEVBQUE7Ozs7SUFFckYsNkJBQTJELFdBQUE7SUFDcEQsd0tBQVMsZUFBQSx1Q0FBK0IsU0FBUyxDQUFDLENBQUEsSUFBQztJQUFxQyxvQkFBSTtJQUFBLGlCQUFJLEVBQUE7OztJQU4zRyw4QkFBMEQs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QVE7a0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElQYXltZW50R3JvdXAgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lQYXltZW50R3JvdXAnO1xuaW1wb3J0IHsgUGF5bWVudFZpZXdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcGF5bWVudC12aWV3L3BheW1lbnQtdmlldy5zZXJ2aWNlJztcbmltcG9ydCB7IEJ1bGtTY2FuaW5nUGF5bWVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9idWxrLXNjYW5pbmctcGF5bWVudC9idWxrLXNjYW5pbmctcGF5bWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IFBheW1lbnRMaWJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9wYXltZW50LWxpYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgSVJlbWlzc2lvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVJlbWlzc2lvbic7XG5pbXBvcnQgeyBJRmVlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JRmVlJztcbmltcG9ydCB7IFBheW1lbnRUb1BheWh1YlJlcXVlc3QgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL1BheW1lbnRUb1BheWh1YlJlcXVlc3QnO1xuaW1wb3J0IHsgUGF5aHViQW50ZW5uYVJlcXVlc3QgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL1BheWh1YkFudGVubmFSZXF1ZXN0JztcbmltcG9ydCB7IFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPcmRlcnNsaXN0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29yZGVyc2xpc3Quc2VydmljZSc7XG5cbmNvbnN0IEJTX0VOQUJMRV9GTEFHID0gJ2J1bGstc2Nhbi1lbmFibGluZy1mZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjcGF5LWZlZS1zdW1tYXJ5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZlZS1zdW1tYXJ5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmVlLXN1bW1hcnkuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEZlZVN1bW1hcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwYXltZW50R3JvdXBSZWY6IHN0cmluZztcbiAgQElucHV0KCkgY2NkQ2FzZU51bWJlcjogc3RyaW5nO1xuICBASW5wdXQoKSBpc1R1cm5PZmY6IHN0cmluZztcbiAgQElucHV0KCkgY2FzZVR5cGU6IHN0cmluZztcblxuXG4gIGJzUGF5bWVudERjbk51bWJlcjogc3RyaW5nO1xuICBwYXltZW50R3JvdXA6IElQYXltZW50R3JvdXA7XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICB2aWV3U3RhdHVzID0gJ21haW4nO1xuICBjdXJyZW50RmVlOiBJRmVlO1xuICB0b3RhbEZlZTogbnVtYmVyO1xuICBwYXlodWJIdG1sOiBTYWZlSHRtbDtcbiAgc2VydmljZTogc3RyaW5nID0gXCJcIjtcbiAgcGxhdEZvcm06IHN0cmluZyA9IFwiXCI7XG4gIHVwUGF5bWVudEVycm9yTWVzc2FnZTogc3RyaW5nO1xuICBzZWxlY3RlZE9wdGlvbjpzdHJpbmc7XG4gIGlzQmFja0J1dHRvbkVuYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIG91dFN0YW5kaW5nQW1vdW50OiBudW1iZXI7XG4gIGlzRmVlQW1vdW50WmVybzogYm9vbGVhbiA9IGZhbHNlO1xuICB0b3RhbEFmdGVyUmVtaXNzaW9uOiBudW1iZXIgPSAwO1xuICBpc0NvbmZpcm1hdGlvbkJ0bkRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGlzUmVtb3ZlQnRuRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNQYXltZW50RXhpc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNSZW1pc3Npb25zRXhpc3Q6IEJvb2xlYW4gPSBmYWxzZTtcbiAgaXNSZW1pc3Npb25zTWF0Y2ggPSBmYWxzZTtcbiAgaXNTdHJhdGVnaWNGaXhFbmFibGU6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIGJ1bGtTY2FuaW5nUGF5bWVudFNlcnZpY2U6IEJ1bGtTY2FuaW5nUGF5bWVudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgcHJpdmF0ZSBwYXltZW50Vmlld1NlcnZpY2U6IFBheW1lbnRWaWV3U2VydmljZSxcbiAgICBwcml2YXRlIHBheW1lbnRMaWJDb21wb25lbnQ6IFBheW1lbnRMaWJDb21wb25lbnQsXG4gICAgcHJpdmF0ZSBPcmRlcnNsaXN0U2VydmljZTogT3JkZXJzbGlzdFNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICdtYWluJztcbiAgICB0aGlzLmNhc2VUeXBlID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LkNBU0VUWVBFO1xuICAgIHRoaXMuYnNQYXltZW50RGNuTnVtYmVyID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmJzcGF5bWVudGRjbjtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlNFTEVDVEVEX09QVElPTi50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgIHRoaXMuaXNTdHJhdGVnaWNGaXhFbmFibGUgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNTRkVOQUJMRTtcbiAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldENhc2VUeXBlKHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5DQVNFVFlQRSk7XG5cbiAgICAgIHRoaXMucGxhdEZvcm0gPSAnQW50ZW5uYSc7XG5cbiAgICB0aGlzLnBheW1lbnRWaWV3U2VydmljZS5nZXRCU2ZlYXR1cmUoKS5zdWJzY3JpYmUoXG4gICAgICBmZWF0dXJlcyA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGZlYXR1cmVzKS5maWx0ZXIoZmVhdHVyZSA9PiBmZWF0dXJlLnVpZCA9PT0gQlNfRU5BQkxFX0ZMQUcpO1xuICAgICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNCU0VOQUJMRSA9IHJlc3VsdFswXSA/IHJlc3VsdFswXS5lbmFibGUgOiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBlcnIgPT4ge1xuICAgICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNCU0VOQUJMRSA9IGZhbHNlO1xuICAgICAgfVxuICAgICk7XG4gICAgaWYgKHRoaXMuYnNQYXltZW50RGNuTnVtYmVyKSB7XG4gICAgICB0aGlzLmdldFVuYXNzaWduZWRQYXltZW50bGlzdCgpO1xuICAgIH1cbiAgICB0aGlzLmdldFBheW1lbnRHcm91cCgpO1xuICB9XG5cbiAgICBnZXRVbmFzc2lnbmVkUGF5bWVudGxpc3QoKSB7XG4gICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9uID09PSAnZGNuJykge1xuICAgICAgICB0aGlzLmJ1bGtTY2FuaW5nUGF5bWVudFNlcnZpY2UuZ2V0QlNQYXltZW50c0J5RENOKHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5EQ05fTlVNQkVSKS5zdWJzY3JpYmUoXG4gICAgICAgIHVuYXNzaWduZWRQYXltZW50cyA9PiB7XG4gICAgICAgICAgaWYodW5hc3NpZ25lZFBheW1lbnRzWydkYXRhJ10ucGF5bWVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZSA9IHVuYXNzaWduZWRQYXltZW50c1snZGF0YSddLnJlc3BvbnNpYmxlX3NlcnZpY2VfaWQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBQYXltZW50RXJyb3JNZXNzYWdlID0gJ2Vycm9yJztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcjogYW55KSA9PiB0aGlzLnVwUGF5bWVudEVycm9yTWVzc2FnZSA9IGVycm9yXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYnVsa1NjYW5pbmdQYXltZW50U2VydmljZS5nZXRCU1BheW1lbnRzQnlDQ0QodGhpcy5jY2RDYXNlTnVtYmVyKS5zdWJzY3JpYmUoXG4gICAgICAgIHVuYXNzaWduZWRQYXltZW50cyA9PiB7XG4gICAgICAgICAgaWYodW5hc3NpZ25lZFBheW1lbnRzWydkYXRhJ10ucGF5bWVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZSA9IHVuYXNzaWduZWRQYXltZW50c1snZGF0YSddLnJlc3BvbnNpYmxlX3NlcnZpY2VfaWQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBQYXltZW50RXJyb3JNZXNzYWdlID0gJ2Vycm9yJztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcjogYW55KSA9PiB0aGlzLnVwUGF5bWVudEVycm9yTWVzc2FnZSA9IGVycm9yXG4gICAgICApO1xuICAgIH1cblxuICB9XG5cbiAgZ2V0UmVtaXNzaW9uQnlGZWVDb2RlKGZlZUNvZGU6IHN0cmluZyk6IElSZW1pc3Npb24ge1xuICAgIGlmICh0aGlzLnBheW1lbnRHcm91cCAmJiB0aGlzLnBheW1lbnRHcm91cC5yZW1pc3Npb25zICYmIHRoaXMucGF5bWVudEdyb3VwLnJlbWlzc2lvbnMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChjb25zdCByZW1pc3Npb24gb2YgdGhpcy5wYXltZW50R3JvdXAucmVtaXNzaW9ucykge1xuICAgICAgICBpZiAocmVtaXNzaW9uLmZlZV9jb2RlID09PSBmZWVDb2RlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlbWlzc2lvbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGFkZFJlbWlzc2lvbihmZWU6IElGZWUpIHtcbiAgICB0aGlzLmN1cnJlbnRGZWUgPSBmZWU7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJ2FkZF9yZW1pc3Npb24nO1xuICB9XG5cbiAgZ2V0UGF5bWVudEdyb3VwKCkge1xuICAgIGxldCBmZWVzID0gW107XG4gICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UuZ2V0UGF5bWVudEdyb3VwRGV0YWlscyh0aGlzLnBheW1lbnRHcm91cFJlZikuc3Vic2NyaWJlKFxuICAgICAgcGF5bWVudEdyb3VwID0+IHtcbiAgICAgICAgdGhpcy5wYXltZW50R3JvdXAgPSBwYXltZW50R3JvdXA7XG4gICAgICAgIHRoaXMuaXNQYXltZW50RXhpc3QgPSBwYXltZW50R3JvdXAucGF5bWVudHMgPyBwYXltZW50R3JvdXAucGF5bWVudHMubGVuZ3RoID4gMCA6IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUmVtaXNzaW9uc0V4aXN0ID0gcGF5bWVudEdyb3VwLnJlbWlzc2lvbnMgPyBwYXltZW50R3JvdXAucmVtaXNzaW9ucy5sZW5ndGggPiAwIDogZmFsc2U7XG5cbiAgICAgICAgaWYgKHBheW1lbnRHcm91cC5mZWVzKSB7XG4gICAgICAgICAgcGF5bWVudEdyb3VwLmZlZXMuZm9yRWFjaChmZWUgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnRvdGFsQWZ0ZXJSZW1pc3Npb24gID0gdGhpcy50b3RhbEFmdGVyUmVtaXNzaW9uICArIGZlZS5uZXRfYW1vdW50O1xuICAgICAgICAgICAgICBpZihmZWUuY2FsY3VsYXRlZF9hbW91bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRmVlQW1vdW50WmVybyA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYocGF5bWVudEdyb3VwLnJlbWlzc2lvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUmVtaXNzaW9uc01hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcGF5bWVudEdyb3VwLnJlbWlzc2lvbnMuZm9yRWFjaChyZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgaWYocmVtLmZlZV9jb2RlID09PSBmZWUuY29kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVtaXNzaW9uc01hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZmVlWydyZW1pc3Npb25zJ10gPSByZW07XG4gICAgICAgICAgICAgICAgICAgIGZlZXMucHVzaChmZWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNSZW1pc3Npb25zTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgIGZlZXMucHVzaChmZWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZlZXMucHVzaChmZWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHBheW1lbnRHcm91cC5mZWVzID0gZmVlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3V0U3RhbmRpbmdBbW91bnQgPSB0aGlzLmJ1bGtTY2FuaW5nUGF5bWVudFNlcnZpY2UuY2FsY3VsYXRlT3V0U3RhbmRpbmdBbW91bnQocGF5bWVudEdyb3VwKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3I6IGFueSkgPT4gdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvci5yZXBsYWNlKC9cIi9nLFwiXCIpXG4gICAgKTtcbiAgfVxuXG4gIGNvbmZpcm1SZW1vdmVGZWUoZmVlOiBJRmVlKXtcbiAgICB0aGlzLmlzUmVtb3ZlQnRuRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmN1cnJlbnRGZWUgPSBmZWU7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJ2ZlZVJlbW92YWxDb25maXJtYXRpb24nO1xuICB9XG5cbiAgcmVtb3ZlRmVlKGZlZTogYW55KXtcbiAgICB0aGlzLmlzUmVtb3ZlQnRuRGlzYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLmRlbGV0ZUZlZUZyb21QYXltZW50R3JvdXAoZmVlKS5zdWJzY3JpYmUoXG4gICAgICAoc3VjY2VzczogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMucGF5bWVudEdyb3VwLmZlZXMgJiYgdGhpcy5wYXltZW50R3JvdXAuZmVlcy5sZW5ndGggPiAxKXtcbiAgICAgICAgICB0aGlzLnRvdGFsQWZ0ZXJSZW1pc3Npb24gPSAwO1xuICAgICAgICAgIHRoaXMuZ2V0UGF5bWVudEdyb3VwKCk7XG4gICAgICAgICAgdGhpcy52aWV3U3RhdHVzID0gJ21haW4nO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5sb2FkQ2FzZVRyYW5zYWN0aW9uUGFnZSgpO1xuICAgICAgfSxcbiAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgICAgICB0aGlzLmlzUmVtb3ZlQnRuRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiBsb2FkQ2FzZVRyYW5zYWN0aW9uUGFnZSgpIHtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPSB0cnVlO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC52aWV3TmFtZSA9ICdjYXNlLXRyYW5zYWN0aW9ucyc7XG4gICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UuZ2V0QlNmZWF0dXJlKCkuc3Vic2NyaWJlKFxuICAgICAgZmVhdHVyZXMgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShmZWF0dXJlcykuZmlsdGVyKGZlYXR1cmUgPT4gZmVhdHVyZS51aWQgPT09IEJTX0VOQUJMRV9GTEFHKTtcbiAgICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTQlNFTkFCTEUgPSByZXN1bHRbMF0gPyByZXN1bHRbMF0uZW5hYmxlIDogZmFsc2U7XG4gICAgICB9LFxuICAgICAgZXJyID0+IHtcbiAgICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTQlNFTkFCTEUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgbGV0IHBhcnRVcmwgPSBgc2VsZWN0ZWRPcHRpb249JHt0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuU0VMRUNURURfT1BUSU9OfWA7XG4gICAgICBwYXJ0VXJsICs9dGhpcy5ic1BheW1lbnREY25OdW1iZXIgPyBgJmRjbj0ke3RoaXMuYnNQYXltZW50RGNuTnVtYmVyfWAgOiAnJztcbiAgICAgIHBhcnRVcmwgKz10aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNCU0VOQUJMRSA/ICcmaXNCdWxrU2Nhbm5pbmc9RW5hYmxlJyA6ICcmaXNCdWxrU2Nhbm5pbmc9RGlzYWJsZSc7XG4gICAgICBwYXJ0VXJsICs9dGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTVFVSTk9GRiA/ICcmaXNUdXJuT2ZmPUVuYWJsZScgOiAnJmlzVHVybk9mZj1EaXNhYmxlJztcbiAgICAgIHBhcnRVcmwgKz10aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNTRkVOQUJMRSA/ICcmaXNTdEZpeEVuYWJsZT1FbmFibGUnIDogJyZpc1N0Rml4RW5hYmxlPURpc2FibGUnO1xuICAgICAgcGFydFVybCArPWAmY2FzZVR5cGU9JHt0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuQ0FTRVRZUEV9YDtcblxuICAgIGxldCB1cmwgPSBgL3BheW1lbnQtaGlzdG9yeS8ke3RoaXMuY2NkQ2FzZU51bWJlcn0/dmlldz1jYXNlLXRyYW5zYWN0aW9ucyZ0YWtlUGF5bWVudD10cnVlJiR7cGFydFVybH1gO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodXJsKTtcbiAgfVxuICBjYW5jZWxSZW1pc3Npb24oKSB7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJ21haW4nO1xuICB9XG4gIHJlZGlyZWN0VG9GZWVTZWFyY2hQYWdlKGV2ZW50OiBhbnksIHBhZ2U/OiBzdHJpbmcpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBwYXJ0VXJsID10aGlzLmJzUGF5bWVudERjbk51bWJlciA/IGAmZGNuPSR7dGhpcy5ic1BheW1lbnREY25OdW1iZXJ9YCA6ICcnO1xuICAgICAgcGFydFVybCArPXRoaXMucGF5bWVudExpYkNvbXBvbmVudC5JU0JTRU5BQkxFID8gJyZpc0J1bGtTY2FubmluZz1FbmFibGUnIDogJyZpc0J1bGtTY2FubmluZz1EaXNhYmxlJztcbiAgICAgIHBhcnRVcmwgKz10aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNUVVJOT0ZGID8gJyZpc1R1cm5PZmY9RW5hYmxlJyA6ICcmaXNUdXJuT2ZmPURpc2FibGUnO1xuICAgICAgcGFydFVybCArPXRoaXMucGF5bWVudExpYkNvbXBvbmVudC5JU1NGRU5BQkxFID8gJyZpc1N0Rml4RW5hYmxlPUVuYWJsZScgOiAnJmlzU3RGaXhFbmFibGU9RGlzYWJsZSc7XG4gICAgICBwYXJ0VXJsICs9YCZjYXNlVHlwZT0ke3RoaXMucGF5bWVudExpYkNvbXBvbmVudC5DQVNFVFlQRX1gO1xuXG4gICAgaWYodGhpcy52aWV3U3RhdHVzID09PSAnZmVlUmVtb3ZhbENvbmZpcm1hdGlvbicgfHwgdGhpcy52aWV3U3RhdHVzID09PSAnYWRkX3JlbWlzc2lvbicpIHtcbiAgICAgIHRoaXMudmlld1N0YXR1cyA9ICdtYWluJztcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHVybCA9IGAvZmVlLXNlYXJjaD9jY2RDYXNlTnVtYmVyPSR7dGhpcy5jY2RDYXNlTnVtYmVyfSZzZWxlY3RlZE9wdGlvbj0ke3RoaXMucGF5bWVudExpYkNvbXBvbmVudC5TRUxFQ1RFRF9PUFRJT059JnBheW1lbnRHcm91cFJlZj0ke3RoaXMucGF5bWVudEdyb3VwUmVmfSR7cGFydFVybH1gO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodXJsKTtcbiAgfVxuICB0YWtlUGF5bWVudCgpIHtcbiAgICB0aGlzLmlzQ29uZmlybWF0aW9uQnRuRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSBuZXcgUGF5bWVudFRvUGF5aHViUmVxdWVzdCh0aGlzLmNjZENhc2VOdW1iZXIsIHRoaXMub3V0U3RhbmRpbmdBbW91bnQsIHRoaXMuY2FzZVR5cGUpLFxuICAgICAgYW50ZW5uYVJlcUJvZHkgPSBuZXcgUGF5aHViQW50ZW5uYVJlcXVlc3QodGhpcy5jY2RDYXNlTnVtYmVyLCB0aGlzLm91dFN0YW5kaW5nQW1vdW50LCB0aGlzLmNhc2VUeXBlKTtcblxuICAgIGlmKHRoaXMucGxhdEZvcm0gPT09ICdBbnRlbm5hJykge1xuXG4gICAgICB0aGlzLnBheW1lbnRWaWV3U2VydmljZS5wb3N0UGF5bWVudEFudGVubmFUb1BheUh1YihhbnRlbm5hUmVxQm9keSwgdGhpcy5wYXltZW50R3JvdXBSZWYpLnN1YnNjcmliZShcbiAgICAgICAgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHRoaXMuaXNCYWNrQnV0dG9uRW5hYmxlPWZhbHNlO1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9tYWtlUGF5bWVudEJ5VGVsZXBob25leVByb3ZpZGVyJztcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yO1xuICAgICAgICAgIHRoaXMuaXNDb25maXJtYXRpb25CdG5EaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoJy9wY2ktcGFsLWZhaWx1cmUnKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgfVxuXG4gIGdvVG9BbGxvY2F0ZVBhZ2Uob3V0U3RhbmRpbmdBbW91bnQ6IG51bWJlciwgaXNGZWVBbW91bnRaZXJvOiBCb29sZWFuKSB7XG4gICAgaWYgKG91dFN0YW5kaW5nQW1vdW50ID4gMCB8fCAob3V0U3RhbmRpbmdBbW91bnQgPT09IDAgJiYgaXNGZWVBbW91bnRaZXJvKSkge1xuICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRHcm91cFJlZmVyZW5jZSA9IHRoaXMucGF5bWVudEdyb3VwUmVmO1xuICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ2FsbG9jYXRlLXBheW1lbnRzJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2FkQ2FzZVRyYW5zYWN0aW9uUGFnZSgpO1xuICAgIH1cbiAgfVxuICBpc0NoZWNrQW1vdW50ZHVlRXhpc3QoYW1vdW50RHVlOiBhbnkpIHtcbiAgICByZXR1cm4gdHlwZW9mIGFtb3VudER1ZSA9PT0gJ3VuZGVmaW5lZCc7XG4gIH1cbn1cbiIsIlxuPGRpdiBjbGFzcz1cImdvdnVrLWJyZWFkY3J1bWJzXCIgKm5nSWY9XCJpc0JhY2tCdXR0b25FbmFibGVcIj5cbiAgPG9sIGNsYXNzPVwiZ292dWstYnJlYWRjcnVtYnNfX2xpc3RcIj5cbiAgICA8bGkgY2xhc3M9XCJnb3Z1ay1icmVhZGNydW1ic19fbGlzdC1pdGVtXCIgKm5nSWY9XCIhaXNUdXJuT2ZmXCI+XG4gICAgICA8YSAoY2xpY2spPVwibG9hZENhc2VUcmFuc2FjdGlvblBhZ2UoKVwiIGNsYXNzPVwiZ292dWstYmFjay1saW5rIGdvdnVrLWxhYmVsXCI+QmFjazwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSBjbGFzcz1cImdvdnVrLWJyZWFkY3J1bWJzX19saXN0LWl0ZW1cIiAqbmdJZj1cImlzVHVybk9mZlwiPlxuICAgICAgICA8YSAoY2xpY2spPVwicmVkaXJlY3RUb0ZlZVNlYXJjaFBhZ2UoJGV2ZW50LCdzdW1tYXJ5JylcIiBjbGFzcz1cImdvdnVrLWJhY2stbGluayBnb3Z1ay1sYWJlbFwiPkJhY2s8L2E+XG4gICAgICA8L2xpPlxuICA8L29sPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZmVlLXN1bW1hcnlcIiAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdtYWluJ1wiPlxuICAgIDxtYWluIGNsYXNzPVwiZ292dWstbWFpbi13cmFwcGVyXCI+XG4gICAgICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBjbGFzcz0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J0ZFRVNVTU1BUlknPlxuICAgICAgPGRpdiBjbGFzcz1cInN1bW1hcnloZWFkZXJcIj5cbiAgICAgICAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLWxhcmdlIGdvdnVrLSEtbWFyZ2luLXRvcC0zIGdvdnVrLSEtbWFyZ2luLWJvdHRvbS00XCI+U3VtbWFyeSA8L2gxPlxuICAgICAgICAgIDxwIGNsYXNzPVwiZ292dWstIS1tYXJnaW4tdG9wLTUgY2FzZXJlZlwiPkNhc2UgcmVmZXJlbmNlOnt7Y2NkQ2FzZU51bWJlciB8IGNjZEh5cGhlbnN9fTwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgPCEtLSA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1yb3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tdHdvLXRoaXJkc1wiPlxuICAgICAgPGgxIGNsYXNzPVwiaGVhZGluZy14bGFyZ2VcIj5GZWUgU3VtbWFyeTwvaDE+XG4gICAgPC9kaXY+XG5cblxuICAgIMKgPGRpdsKgY2xhc3M9XCJnb3Z1ay1ncmlkLWNvbHVtbi1vbmUtdGhpcmRcIsKgYWxpZ249XCJyaWdodFwiPlxuICAgICAgwqDCoMKgwqDCoMKgPGJ1dHRvbsKgICpuZ0lmPVwiIWlzVHVybk9mZlwiIChjbGljayk9XCJyZWRpcmVjdFRvRmVlU2VhcmNoUGFnZSgkZXZlbnQsJ3N1bW1hcnknKVwiXG4gICAgICDCoMKgwqDCoMKgwqBbZGlzYWJsZWRdPVwiaXNQYXltZW50RXhpc3RcIlxuICAgICAgwqDCoMKgwqDCoMKgW25nQ2xhc3NdPSdpc1BheW1lbnRFeGlzdCA/wqBcImJ1dHRvbsKgYnV0dG9uLS1kaXNhYmxlZCBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCLCoDrCoFwiYnV0dG9uIGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTFcIic+XG4gICAgICAgICAgICAgIEFkZCBhIG5ldyBmZWVcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YSAqbmdJZj1cImlzVHVybk9mZlwiIChjbGljayk9XCJyZWRpcmVjdFRvRmVlU2VhcmNoUGFnZSgkZXZlbnQsJ3N1bW1hcnknKVwiIGNsYXNzPVwiYnV0dG9uXCI+QWRkIGEgbmV3IGZlZTwvYT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+IC0tPlxuXG5cbiAgPGRpdiAqbmdJZj1cImVycm9yTWVzc2FnZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJlcnJvci1zdW1tYXJ5XCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZmFpbHVyZS1lcnJvci1zdW1tYXJ5LWhlYWRpbmdcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICA8aDIgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bSBlcnJvci1zdW1tYXJ5LWhlYWRpbmdcIiBpZD1cImZhaWx1cmUtZXJyb3Itc3VtbWFyeS1oZWFkaW5nXCI+XG4gICAgICAgIFBheW1lbnQgR3JvdXAgZGV0YWlscyBjb3VsZCBub3QgYmUgcmV0cmlldmVkXG4gICAgICA8L2gyPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX2JvZHlcIj5cbiAgICAgICAge3sgZXJyb3JNZXNzYWdlIH19XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLSEtbWFyZ2luLXRvcC0zXCI+XG4gICAgICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZSAgZ292dWstIS1tYXJnaW4tYm90dG9tLTJcIiAqbmdJZj1cIiFlcnJvck1lc3NhZ2UgJiYgcGF5bWVudEdyb3VwXCI+XG4gICAgICAgICAgPHRoZWFkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCIgY2xhc3M9XCJjbGFzczYwMFwiPkRlc2NyaXB0aW9uPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiIGNsYXNzPVwiY2xhc3M2MFwiPlF1YW50aXR5PC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiIGNsYXNzPVwiY2xhc3M4MFwiPjwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIiBjbGFzcz1cImNsYXNzMTAwXCI+QW1vdW50PC90aD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuXG4gICAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAqbmdJZj1cInBheW1lbnRHcm91cC5mZWVzXCI+XG4gICAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIiAqbmdGb3I9XCJsZXQgZmVlIG9mIHBheW1lbnRHcm91cC5mZWVzOyBsZXQgaSA9IGluZGV4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3sgZmVlLmRlc2NyaXB0aW9uIH19XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuby1ib3JkZXJcIiAqbmdJZj1cIihpc1BheW1lbnRFeGlzdCB8fCAoZ2V0UmVtaXNzaW9uQnlGZWVDb2RlKGZlZS5jb2RlKT8uaHdmX2Ftb3VudCA9PT0gMCB8fCAhZ2V0UmVtaXNzaW9uQnlGZWVDb2RlKGZlZS5jb2RlKT8uaHdmX2Ftb3VudCkpICYmICFpc1R1cm5PZmZcIj5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwiY29uZmlybVJlbW92ZUZlZShmZWUuaWQpXCIgKm5nSWY9XCIoIWlzUGF5bWVudEV4aXN0IHx8ICFmZWUucmVtaXNzaW9ucylcIiBbbmdDbGFzc109J2lzUGF5bWVudEV4aXN0IHx8IGZlZS5yZW1pc3Npb25zPyBcImRpc2FibGUtbGlua1wiIDogXCJcIic+IDxicj5SZW1vdmU8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5vLWJvcmRlclwiICpuZ0lmPVwiKCFpc1BheW1lbnRFeGlzdCB8fCAoZ2V0UmVtaXNzaW9uQnlGZWVDb2RlKGZlZS5jb2RlKT8uaHdmX2Ftb3VudCA9PT0gMCB8fCAhZ2V0UmVtaXNzaW9uQnlGZWVDb2RlKGZlZS5jb2RlKT8uaHdmX2Ftb3VudCkpICYmIGlzVHVybk9mZiBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJjb25maXJtUmVtb3ZlRmVlKGZlZS5pZClcIj5SZW1vdmU8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cImFkZFJlbWlzc2lvbihmZWUpXCIgY2xhc3M9XCJyZW1pc3Npb25BY3RpdmVcIiAgKm5nSWY9XCIoZ2V0UmVtaXNzaW9uQnlGZWVDb2RlKGZlZS5jb2RlKT8uaHdmX2Ftb3VudCA9PT0gMCB8fCAhZ2V0UmVtaXNzaW9uQnlGZWVDb2RlKGZlZS5jb2RlKT8uaHdmX2Ftb3VudCkgJiYgIWlzUGF5bWVudEV4aXN0ICYmICFpc1R1cm5PZmZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZGQgaGVscCB3aXRoIGZlZXMgb3IgcmVtaXNzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJhZGRSZW1pc3Npb24oZmVlKVwiIGNsYXNzPVwicmVtaXNzaW9uQWN0aXZlXCIgICAqbmdJZj1cIihnZXRSZW1pc3Npb25CeUZlZUNvZGUoZmVlLmNvZGUpPy5od2ZfYW1vdW50ID09PSAwIHx8ICFnZXRSZW1pc3Npb25CeUZlZUNvZGUoZmVlLmNvZGUpPy5od2ZfYW1vdW50KSAmJiBpc1R1cm5PZmZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZGQgaGVscCB3aXRoIGZlZXMgb3IgcmVtaXNzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmID0gXCJnZXRSZW1pc3Npb25CeUZlZUNvZGUoZmVlLmNvZGUpPy5od2ZfYW1vdW50ID4gMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxfYm9yZGVyXCIgKm5nSWYgPSBcImdldFJlbWlzc2lvbkJ5RmVlQ29kZShmZWUuY29kZSk/Lmh3Zl9hbW91bnQgPiAwXCI+UmVtaXNzaW9uLHt7IGdldFJlbWlzc2lvbkJ5RmVlQ29kZShmZWUuY29kZSk/Lmh3Zl9yZWZlcmVuY2UgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cblxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCIgKm5nSWY9XCJmZWUudm9sdW1lICYmIGZlZS52b2x1bWUgPiAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGZlZS52b2x1bWUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gICpuZ0lmID0gXCJnZXRSZW1pc3Npb25CeUZlZUNvZGUoZmVlLmNvZGUpPy5od2ZfYW1vdW50ID4gMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbF9ib3JkZXJcIj4xPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuXG4gICAgICAgICAgICAgICAgICAgICAgPHRkICBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGFsaWducmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZiA9IFwiZ2V0UmVtaXNzaW9uQnlGZWVDb2RlKGZlZS5jb2RlKT8uaHdmX2Ftb3VudCA+IDBcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsX2JvcmRlclwiPiA8YnI+PGJyPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgYWxpZ25yaWdodFwiID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IGZlZS5jYWxjdWxhdGVkX2Ftb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZiA9IFwiZ2V0UmVtaXNzaW9uQnlGZWVDb2RlKGZlZS5jb2RlKT8uaHdmX2Ftb3VudCA+IDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsX3JtYm9yZGVyIGFsaWducmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLXt7IGdldFJlbWlzc2lvbkJ5RmVlQ29kZShmZWUuY29kZSk/Lmh3Zl9hbW91bnQ/ICggZ2V0UmVtaXNzaW9uQnlGZWVDb2RlKGZlZS5jb2RlKT8uaHdmX2Ftb3VudCAgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJykgOiAnLScgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuXG5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPCEtLSA8dHI+XG4gICAgICAgICAgICAgICAgICA8dGQgKm5nSWYgPSBcImdldFJlbWlzc2lvbkJ5RmVlQ29kZShmZWUuY29kZSk/Lmh3Zl9hbW91bnQgPiAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsX2JvcmRlclwiICpuZ0lmID0gXCJnZXRSZW1pc3Npb25CeUZlZUNvZGUoZmVlLmNvZGUpPy5od2ZfYW1vdW50ID4gMFwiPlJlbWlzc2lvbix7eyBnZXRSZW1pc3Npb25CeUZlZUNvZGUoZmVlLmNvZGUpPy5od2ZfcmVmZXJlbmNlIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdJZiA9IFwiZ2V0UmVtaXNzaW9uQnlGZWVDb2RlKGZlZS5jb2RlKT8uaHdmX2Ftb3VudCA9PT0nJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsX2JvcmRlclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgKm5nSWYgPSBcImdldFJlbWlzc2lvbkJ5RmVlQ29kZShmZWUuY29kZSk/Lmh3Zl9hbW91bnQgPT09ICcnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbF9ib3JkZXJcIiAqbmdJZiA9IFwiZ2V0UmVtaXNzaW9uQnlGZWVDb2RlKGZlZS5jb2RlKT8uaHdmX2Ftb3VudCA9PT0gJydcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbF9ib3JkZXJcIiBzdHlsZT1cInRleHQtYWxpZ246IHJpZ2h0O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAte3sgZ2V0UmVtaXNzaW9uQnlGZWVDb2RlKGZlZS5jb2RlKT8uaHdmX2Ftb3VudD8gKCBnZXRSZW1pc3Npb25CeUZlZUNvZGUoZmVlLmNvZGUpPy5od2ZfYW1vdW50ICB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInKSA6ICctJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPiAtLT5cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJhZGRmZWVcIj5cbiAgICAgIDxidXR0b24gICpuZ0lmPVwiIWlzVHVybk9mZlwiIChjbGljayk9XCJyZWRpcmVjdFRvRmVlU2VhcmNoUGFnZSgkZXZlbnQsJ3N1bW1hcnknKVwiXG4gICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc1BheW1lbnRFeGlzdFwiXG4gICAgICAgICAgICAgIFtuZ0NsYXNzXT0naXNQYXltZW50RXhpc3QgPyBcImdvdnVrLWJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeSBidXR0b24tLWRpc2FibGVkXCIgOiBcImdvdnVrLWJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiJz5cbiAgICAgICAgICAgICAgICBBZGQgZmVlXG4gICAgICA8L2J1dHRvbj5cbiAgICA8YSAqbmdJZj1cImlzVHVybk9mZlwiIChjbGljayk9XCJyZWRpcmVjdFRvRmVlU2VhcmNoUGFnZSgkZXZlbnQsJ3N1bW1hcnknKVwiIGNsYXNzPVwiZ292dWstYnV0dG9uIGdvdnVrLWJ1dHRvbi0tc2Vjb25kYXJ5XCI+QWRkIGEgbmV3IGZlZTwvYT5cbiAgIDxkaXYgIGNsYXNzPVwiZmVlQWRkQnV0dG9uXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJwYWRkaWdsZWZ0IGdvdnVrLSEtbWFyZ2luLXRvcC0yXCI+VG90YWwgdG8gcGF5OiB7eyBvdXRTdGFuZGluZ0Ftb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInfX08L3A+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPCEtLVxuICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cCBnb3Z1ay1mb3JtLWdyb3VwLS1tZ1wiICpuZ0lmPVwiIWJzUGF5bWVudERjbk51bWJlclwiPlxuICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgY3VzdG9tLWdvdnVrLWxhYmVsIGdvdnVrLWZpZWxkc2V0X19oZWFkaW5nLS1melwiIGZvcj1cInJlc3BvbnNpYmxlT2ZmaWNlXCI+XG4gICAgICAgIDxzdHJvbmc+V2hhdCBzZXJ2aWNlIGlzIHRoaXMgZmVlIGZvcj88L3N0cm9uZz5cbiAgICAgIDwvbGFiZWw+XG4gICAgICA8c2VsZWN0IGNsYXNzPVwiZ292dWstc2VsZWN0IGdvdnVrLXNlbGVjdC0tY3VzdG9tXCIgaWQ9XCJyZXNwb25zaWJsZU9mZmljZVwiIFsobmdNb2RlbCldPVwic2VydmljZVwiIG5hbWU9XCJyZXNwb25zaWJsZU9mZmljZVwiPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgc2VsZWN0ZWQ9J3NlbGVjdGVkJz5QbGVhc2Ugc2VsZWN0PC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJBQTA3XCI+RGl2b3JjZTwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQUEwOVwiPkZpbmFuY2lhbCBSZW1lZHk8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFBMDhcIj5Qcm9iYXRlPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgPC9kaXY+IC0tPlxuXG4gIDxkaXY+XG4gICAgICA8YnV0dG9uICpuZ0lmPVwiIWJzUGF5bWVudERjbk51bWJlclwiIHR5cGU9XCJzdWJtaXRcIiAoY2xpY2spPVwidGFrZVBheW1lbnQoKVwiXG4gICAgICBbZGlzYWJsZWRdPVwidG90YWxGZWUgPD0gMCB8fCBpc0NvbmZpcm1hdGlvbkJ0bkRpc2FibGVkXCJcbiAgICAgIFtuZ0NsYXNzXT0ndG90YWxGZWUgPD0gMCB8fCAhcGxhdEZvcm0gfHwgIXNlcnZpY2UgfHwgaXNDb25maXJtYXRpb25CdG5EaXNhYmxlZD8gXCJidXR0b24gYnV0dG9uLS1kaXNhYmxlZCBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCIgOiBcImJ1dHRvbiBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCInPlxuICAgICAgICBUYWtlIHBheW1lbnRcbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uICpuZ0lmPVwiYnNQYXltZW50RGNuTnVtYmVyXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJnb1RvQWxsb2NhdGVQYWdlKG91dFN0YW5kaW5nQW1vdW50LCBpc0ZlZUFtb3VudFplcm8pXCIgY2xhc3M9XCJidXR0b24gZ292dWstIS1tYXJnaW4tcmlnaHQtMVwiPlxuICAgICAgPHNwYW4gKm5nSWY9XCJvdXRTdGFuZGluZ0Ftb3VudCA+IDAgfHwgKGlzRmVlQW1vdW50WmVybyAmJiBvdXRTdGFuZGluZ0Ftb3VudCA9PT0gMClcIj5cbiAgICAgICAgQWxsb2NhdGUgcGF5bWVudFxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCJvdXRTdGFuZGluZ0Ftb3VudCA8IDAgfHwgKCFpc0ZlZUFtb3VudFplcm8gJiYgb3V0U3RhbmRpbmdBbW91bnQgPT09IDApXCI+XG4gICAgICAgIENvbnRpbnVlXG4gICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuXG48L21haW4+XG48L2Rpdj5cblxuICA8bmctY29udGFpbmVyICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ2ZlZVJlbW92YWxDb25maXJtYXRpb24nXCI+XG4gICAgPGlucHV0ICNteUlucHV0IHR5cGU9J2hpZGRlbicgY2xhc3M9J2lGcmFtZURyaXZlbkltYWdlVmFsdWUnIHZhbHVlPSdGRUVSRU1PVkFMQ09ORklSTUFUSU9OXzEnPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dF9faWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiE8L3NwYW4+XG4gICAgICAgIDxzdHJvbmcgY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRfX3RleHRcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dF9fYXNzaXN0aXZlXCI+V2FybmluZzwvc3Bhbj5cbiAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZmVlP1xuICAgICAgICA8L3N0cm9uZz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi1ncmJcIj5cbiAgICAgICAgPGZvcm0gbm92YWxpZGF0ZT5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiIChjbGljayk9XCJjYW5jZWxSZW1pc3Npb24oKVwiPlxuICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b25cIlxuICAgICAgICAgICpuZ0lmID1cIiFpc1JlbW92ZUJ0bkRpc2FibGVkXCJcbiAgICAgICAgICBbbmdDbGFzc109J2lzUmVtb3ZlQnRuRGlzYWJsZWQgPyBcImJ1dHRvbiBidXR0b24tLWRpc2FibGVkIGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTFcIiA6IFwiYnV0dG9uIGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTFcIidcbiAgICAgICAgICAoY2xpY2spPVwicmVtb3ZlRmVlKGN1cnJlbnRGZWUpXCI+XG4gICAgICAgICAgICBSZW1vdmVcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG48Y2NwYXktYWRkLXJlbWlzc2lvbiAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdhZGRfcmVtaXNzaW9uJyAmJiBjdXJyZW50RmVlXCJcbiBbaXNUdXJuT2ZmXT1cImlzVHVybk9mZlwiXG4gW2lzU3RyYXRlZ2ljRml4RW5hYmxlXT1cImlzU3RyYXRlZ2ljRml4RW5hYmxlXCJcbiBbZmVlXT1cImN1cnJlbnRGZWVcIlxuIFtjYXNlVHlwZV09XCJjYXNlVHlwZVwiXG4gW2NjZENhc2VOdW1iZXJdPVwiY2NkQ2FzZU51bWJlclwiXG4gW3BheW1lbnRHcm91cFJlZl09XCJwYXltZW50R3JvdXBSZWZcIlxuIChjYW5jZWxSZW1pc3Npb24pPVwiY2FuY2VsUmVtaXNzaW9uKClcIj48L2NjcGF5LWFkZC1yZW1pc3Npb24+XG4gPGlucHV0ICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ3BheWh1Yl92aWV3JyAmJiBwYXlodWJIdG1sXCIgI215SW5wdXQgdHlwZT0naGlkZGVuJyBjbGFzcz0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J1BDSVBBTCc+XG4iXX0=