import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AddRemissionRequest } from '../../interfaces/AddRemissionRequest';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { RefundsService } from '../../services/refunds/refunds.service';
import { NotificationService } from '../../services/notification/notification.service';
import { AddRetroRemissionRequest } from '../../interfaces/AddRetroRemissionRequest';
import { PostRefundRetroRemission } from '../../interfaces/PostRefundRetroRemission';
import { PostIssueRefundRetroRemission } from '../../interfaces/PostIssueRefundRetroRemission';
import { ChangeDetectorRef } from '@angular/core';
import { OrderslistService } from '../../services/orderslist.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../services/payment-view/payment-view.service";
import * as i4 from "../../services/notification/notification.service";
import * as i5 from "../../payment-lib.component";
import * as i6 from "../../services/refunds/refunds.service";
import * as i7 from "../../services/orderslist.service";
function AddRemissionComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 2)(2, "h2", 3);
    i0.ɵɵtext(3, " Error in processing the request ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 4);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.errorMessage, " ");
} }
function AddRemissionComponent_div_2_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "li");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const err_r21 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(err_r21);
} }
function AddRemissionComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 2)(2, "h2", 3);
    i0.ɵɵtext(3, " Error in processing the request ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, AddRemissionComponent_div_2_div_4_Template, 3, 1, "div", 5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.errorMsg);
} }
function AddRemissionComponent_ng_container_3_p_14_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a remission code");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_3_p_14_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a vaild remission code");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_3_p_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 22);
    i0.ɵɵtemplate(1, AddRemissionComponent_ng_container_3_p_14_span_1_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(2, AddRemissionComponent_ng_container_3_p_14_span_2_Template, 2, 0, "span", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r24 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r24.isRemissionCodeEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r24.remissionCodeHasError);
} }
function AddRemissionComponent_ng_container_3_p_24_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a amount");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_3_p_24_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a vaild amount");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_3_p_24_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "The remission amount must be less than the total fee");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_3_p_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 22);
    i0.ɵɵtemplate(1, AddRemissionComponent_ng_container_3_p_24_span_1_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(2, AddRemissionComponent_ng_container_3_p_24_span_2_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(3, AddRemissionComponent_ng_container_3_p_24_span_3_Template, 2, 0, "span", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r25 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r25.isAmountEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r25.amountHasError);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r25.isRemissionLessThanFeeError);
} }
const _c0 = function (a0) { return { "inline-error-class": a0 }; };
function AddRemissionComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 6, 7);
    i0.ɵɵelementStart(3, "h1", 8);
    i0.ɵɵtext(4, "Add remission ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "form", 9)(6, "div", 10)(7, "form", 11)(8, "div", 10)(9, "label", 12);
    i0.ɵɵtext(10);
    i0.ɵɵelementStart(11, "span", 13);
    i0.ɵɵtext(12, "Enter remission for reference. For example: HWF-A1B-23C OR PA21-123456");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(13, "input", 14);
    i0.ɵɵtemplate(14, AddRemissionComponent_ng_container_3_p_14_Template, 3, 2, "p", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 10)(16, "label", 16);
    i0.ɵɵtext(17, " How much does the applicant need to pay? ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 17);
    i0.ɵɵtext(19, "in pounds");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 18)(21, "div", 19);
    i0.ɵɵtext(22, "\u00A3");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(23, "input", 20);
    i0.ɵɵtemplate(24, AddRemissionComponent_ng_container_3_p_24_Template, 4, 3, "p", 15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "button", 21);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_3_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r32); const ctx_r31 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r31.addRemission()); });
    i0.ɵɵtext(26, " Submit ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("formGroup", ctx_r2.remissionForm);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" Add remission to ", ctx_r2.fee == null ? null : ctx_r2.fee.code, ": ", ctx_r2.fee == null ? null : ctx_r2.fee.description, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c0, ctx_r2.isRemissionCodeEmpty || ctx_r2.remissionCodeHasError));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.isRemissionCodeEmpty || ctx_r2.remissionCodeHasError);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c0, ctx_r2.isAmountEmpty || ctx_r2.amountHasError || ctx_r2.isRemissionLessThanFeeError));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.isAmountEmpty || ctx_r2.amountHasError || ctx_r2.isRemissionLessThanFeeError);
} }
function AddRemissionComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 23, 7);
    i0.ɵɵelementStart(3, "div", 24)(4, "span", 25);
    i0.ɵɵtext(5, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong", 26)(7, "span", 27);
    i0.ɵɵtext(8, "Warning");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " Are you sure you want to add remission to this fee? ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "table", 28)(11, "tr", 29)(12, "td", 30);
    i0.ɵɵtext(13, "Remission code:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 31);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "tr", 29)(17, "td", 30);
    i0.ɵɵtext(18, "Fee code:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 31);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "tr", 29)(22, "td", 30);
    i0.ɵɵtext(23, "Fee description:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "td", 31);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "tr", 29)(27, "td", 30);
    i0.ɵɵtext(28, "Amount the applicant must pay:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "td", 31);
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "currency");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(32, "button", 32);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_4_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r35); const ctx_r34 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r34.cancelRemission.emit()); });
    i0.ɵɵtext(33, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "button", 33);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_4_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r35); const ctx_r36 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r36.confirmRemission()); });
    i0.ɵɵtext(35, " Confirm ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(15);
    i0.ɵɵtextInterpolate(ctx_r3.remissionForm.controls.remissionCode.value);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.fee.code);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.fee.description);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(31, 6, ctx_r3.remissionForm.controls.amount.value, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r3.isConfirmationBtnDisabled)("ngClass", ctx_r3.isConfirmationBtnDisabled ? "button button--disabled govuk-!-margin-right-1" : "button govuk-!-margin-right-1");
} }
function AddRemissionComponent_ng_container_5_p_17_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a remission code");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_5_p_17_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a vaild remission code");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_5_p_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 22);
    i0.ɵɵtemplate(1, AddRemissionComponent_ng_container_5_p_17_span_1_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(2, AddRemissionComponent_ng_container_5_p_17_span_2_Template, 2, 0, "span", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r38 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r38.isRemissionCodeEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r38.remissionCodeHasError);
} }
function AddRemissionComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    const _r42 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 34, 7);
    i0.ɵɵelementStart(3, "h1", 8);
    i0.ɵɵtext(4, "Process remission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h1", 35);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdHyphens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "h1", 8);
    i0.ɵɵtext(9, "Enter help with fees or remission reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "form", 9)(11, "div", 10)(12, "form", 11)(13, "div", 10)(14, "label", 12)(15, "span", 13);
    i0.ɵɵtext(16, "For example: HWF-A1B-23C OR PA21-123456");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(17, AddRemissionComponent_ng_container_5_p_17_Template, 3, 2, "p", 15);
    i0.ɵɵelement(18, "input", 14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 36)(20, "button", 37);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_5_Template_button_click_20_listener($event) { i0.ɵɵrestoreView(_r42); const ctx_r41 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r41.gotoServiceRequestPage($event)); });
    i0.ɵɵtext(21, " Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 38);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_5_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r42); const ctx_r43 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r43.addRemissionCode()); });
    i0.ɵɵtext(23, " Continue");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "p")(25, "a", 39);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_5_Template_a_click_25_listener($event) { i0.ɵɵrestoreView(_r42); const ctx_r44 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r44.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(26, "Cancel");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("#", i0.ɵɵpipeBind1(7, 4, ctx_r4.ccdCaseNumber), "");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("formGroup", ctx_r4.remissionForm);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r4.isRemissionCodeEmpty || ctx_r4.remissionCodeHasError);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c0, ctx_r4.isRemissionCodeEmpty || ctx_r4.remissionCodeHasError));
} }
function AddRemissionComponent_ng_container_6_h1_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 35);
    i0.ɵɵtext(1, " Enter the amount to be refunded ");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_6_h1_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 35);
    i0.ɵɵtext(1, " Enter the remission amount ");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_6_h1_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 35);
    i0.ɵɵtext(1, " Enter the amount ");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_6_p_19_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a amount");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_6_p_19_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a vaild amount");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_6_p_19_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "You cannot add a remission that's more than the fee amount.");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_6_p_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 22);
    i0.ɵɵtemplate(1, AddRemissionComponent_ng_container_6_p_19_span_1_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(2, AddRemissionComponent_ng_container_6_p_19_span_2_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(3, AddRemissionComponent_ng_container_6_p_19_span_3_Template, 2, 0, "span", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r49 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r49.isAmountEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r49.amountHasError);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r49.isRemissionLessThanFeeError);
} }
function AddRemissionComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    const _r54 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 40, 7);
    i0.ɵɵelementStart(3, "h1", 8);
    i0.ɵɵtext(4, "Process remission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h1", 35);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdHyphens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 10)(9, "form", 9)(10, "div", 10)(11, "form", 11)(12, "fieldset", 41)(13, "legend", 42);
    i0.ɵɵtemplate(14, AddRemissionComponent_ng_container_6_h1_14_Template, 2, 0, "h1", 43);
    i0.ɵɵtemplate(15, AddRemissionComponent_ng_container_6_h1_15_Template, 2, 0, "h1", 43);
    i0.ɵɵtemplate(16, AddRemissionComponent_ng_container_6_h1_16_Template, 2, 0, "h1", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 17);
    i0.ɵɵtext(18, "in pounds");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, AddRemissionComponent_ng_container_6_p_19_Template, 4, 3, "p", 15);
    i0.ɵɵelementStart(20, "div", 18)(21, "div", 19);
    i0.ɵɵtext(22, "\u00A3");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(23, "input", 44);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "div", 36)(25, "button", 37);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_6_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r54); const ctx_r53 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r53.gotoAddRetroRemissionCodePage()); });
    i0.ɵɵtext(26, " Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "button", 38);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_6_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r54); const ctx_r55 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r55.gotoCheckRetroRemissionPage(ctx_r55.payment)); });
    i0.ɵɵtext(28, " Continue");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "p")(30, "a", 45);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_6_Template_a_click_30_listener($event) { i0.ɵɵrestoreView(_r54); const ctx_r56 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r56.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(31, "Cancel");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("#", i0.ɵɵpipeBind1(7, 7, ctx_r5.ccdCaseNumber), "");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("formGroup", ctx_r5.remissionForm);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", (ctx_r5.remessionPayment == null ? null : ctx_r5.remessionPayment.status) === "Success" || ctx_r5.isFromRefundListPage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r5.remessionPayment == null ? null : ctx_r5.remessionPayment.status) !== "Success" && !ctx_r5.isFromRefundListPage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r5.remessionPayment == null ? null : ctx_r5.remessionPayment.status) === "undefined");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r5.isAmountEmpty || ctx_r5.amountHasError || ctx_r5.isRemissionLessThanFeeError);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c0, ctx_r5.isAmountEmpty || ctx_r5.amountHasError || ctx_r5.isRemissionLessThanFeeError));
} }
function AddRemissionComponent_ng_container_7_td_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 30);
    i0.ɵɵtext(1, "Refund amount");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_7_td_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 30);
    i0.ɵɵtext(1, "Remission amount");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r61 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 46, 7);
    i0.ɵɵelementStart(3, "div", 24)(4, "h1", 8);
    i0.ɵɵtext(5, " Check your answers");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "table", 28)(7, "tr", 29)(8, "td", 30);
    i0.ɵɵtext(9, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 31);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "tr", 29)(13, "td", 30);
    i0.ɵɵtext(14, "Payment amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 31);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "tr", 29)(19, "td", 30);
    i0.ɵɵtext(20, "Payment status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 31);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "tr", 29)(24, "td", 30);
    i0.ɵɵtext(25, "Fee");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "td", 31);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "tr", 29)(29, "td", 30);
    i0.ɵɵtext(30, "Fee amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "td", 31);
    i0.ɵɵtext(32);
    i0.ɵɵpipe(33, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "tr", 29)(35, "td", 30);
    i0.ɵɵtext(36, "Help with fees or remission reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "td", 31);
    i0.ɵɵtext(38);
    i0.ɵɵelementStart(39, "a", 47);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_7_Template_a_click_39_listener() { i0.ɵɵrestoreView(_r61); const ctx_r60 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r60.gotoProcessRetroRemissionPage()); });
    i0.ɵɵtext(40, "Change");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(41, "tr", 29);
    i0.ɵɵtemplate(42, AddRemissionComponent_ng_container_7_td_42_Template, 2, 0, "td", 48);
    i0.ɵɵtemplate(43, AddRemissionComponent_ng_container_7_td_43_Template, 2, 0, "td", 48);
    i0.ɵɵelementStart(44, "td", 31);
    i0.ɵɵtext(45);
    i0.ɵɵpipe(46, "currency");
    i0.ɵɵelementStart(47, "a", 47);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_7_Template_a_click_47_listener() { i0.ɵɵrestoreView(_r61); const ctx_r62 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r62.gotoAmountRetroRemission()); });
    i0.ɵɵtext(48, "Change");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(49, "button", 32);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_7_Template_button_click_49_listener() { i0.ɵɵrestoreView(_r61); const ctx_r63 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r63.gotoAmountRetroRemission()); });
    i0.ɵɵtext(50, "Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "button", 33);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_7_Template_button_click_51_listener() { i0.ɵɵrestoreView(_r61); const ctx_r64 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r64.confirmRetroRemission()); });
    i0.ɵɵtext(52, " Add remission ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "p")(54, "a", 45);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_7_Template_a_click_54_listener($event) { i0.ɵɵrestoreView(_r61); const ctx_r65 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r65.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(55, " Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r6.remessionPayment ? ctx_r6.remessionPayment.reference : " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("\u00A3", ctx_r6.remessionPayment ? ctx_r6.getFormattedCurrency(ctx_r6.remessionPayment.amount) : i0.ɵɵpipeBind4(17, 12, " ", "GBP", "symbol", "1.2-2"), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r6.remessionPayment ? ctx_r6.remessionPayment.status : "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r6.fee.code, " - ", ctx_r6.fee.description, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(33, 17, ctx_r6.fee.calculated_amount / ctx_r6.fee.volume, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r6.remissionForm.controls.remissionCode.value == null ? null : ctx_r6.remissionForm.controls.remissionCode.value.trim(), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r6.remessionPayment.status === "Success");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.remessionPayment.status !== "Success");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind4(46, 22, ctx_r6.remissionForm.controls.amount.value, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", ctx_r6.isConfirmationBtnDisabled)("ngClass", ctx_r6.isConfirmationBtnDisabled ? "button button--disabled govuk-!-margin-right-1" : "button govuk-!-margin-right-1");
} }
function AddRemissionComponent_ng_container_8_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 55)(1, "p", 54)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "currency");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r67 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("The amount to be refunded should be ", i0.ɵɵpipeBind4(4, 1, ctx_r67.remissionForm.controls.amount.value, "GBP", "symbol-narrow", "1.2-2"), "");
} }
function AddRemissionComponent_ng_container_8_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r70 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "button", 33);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_8_div_9_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r70); const ctx_r69 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r69.gotoProcessRetroRemission()); });
    i0.ɵɵtext(2, "Continue ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r68 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", !ctx_r68.isRemissionApplied)("ngClass", ctx_r68.isConfirmationBtnDisabled ? "button button--disabled govuk-!-margin-right-1" : "button govuk-!-margin-right-1");
} }
function AddRemissionComponent_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    const _r72 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 49, 7);
    i0.ɵɵelementStart(3, "div", 50)(4, "div")(5, "div", 51)(6, "h1", 52);
    i0.ɵɵtext(7, " Remission added ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, AddRemissionComponent_ng_container_8_div_8_Template, 5, 6, "div", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, AddRemissionComponent_ng_container_8_div_9_Template, 3, 2, "div", 1);
    i0.ɵɵelementStart(10, "p", 54)(11, "a", 39);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_8_Template_a_click_11_listener($event) { i0.ɵɵrestoreView(_r72); const ctx_r71 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r71.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(12, " Return to case ");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r7.remessionPayment.status === "Success");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.remessionPayment.status === "Success");
} }
function AddRemissionComponent_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    const _r75 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 56, 7);
    i0.ɵɵelementStart(3, "h1", 57);
    i0.ɵɵtext(4, "Process refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2", 58);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdHyphens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "ccpay-contact-details", 59);
    i0.ɵɵlistener("assignContactDetails", function AddRemissionComponent_ng_container_9_Template_ccpay_contact_details_assignContactDetails_8_listener($event) { i0.ɵɵrestoreView(_r75); const ctx_r74 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r74.getContactDetails($event, "checkaddRefundpage")); })("redirectToIssueRefund", function AddRemissionComponent_ng_container_9_Template_ccpay_contact_details_redirectToIssueRefund_8_listener($event) { i0.ɵɵrestoreView(_r75); const ctx_r76 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r76.gotoRemissionSuccess($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p")(10, "a", 60);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_9_Template_a_click_10_listener($event) { i0.ɵɵrestoreView(_r75); const ctx_r77 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r77.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(11, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Case reference: ", i0.ɵɵpipeBind1(7, 2, ctx_r8.ccdCaseNumber), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("addressObj", ctx_r8.notification);
} }
function AddRemissionComponent_ng_container_10_td_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 30);
    i0.ɵɵtext(1, "Refund amount");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_10_td_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 30);
    i0.ɵɵtext(1, "Remission amount");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_10_div_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65)(1, "strong");
    i0.ɵɵtext(2, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r81 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r81.contactDetailsObj == null ? null : ctx_r81.contactDetailsObj.email == null ? null : ctx_r81.contactDetailsObj.email.trim(), " ");
} }
function AddRemissionComponent_ng_container_10_div_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65)(1, "strong");
    i0.ɵɵtext(2, "Post");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r82 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate5(" ", ctx_r82.contactDetailsObj == null ? null : ctx_r82.contactDetailsObj.address_line == null ? null : ctx_r82.contactDetailsObj.address_line.trim(), "\u00A0", ctx_r82.contactDetailsObj == null ? null : ctx_r82.contactDetailsObj.city == null ? null : ctx_r82.contactDetailsObj.city.trim(), "\u00A0", ctx_r82.contactDetailsObj == null ? null : ctx_r82.contactDetailsObj.county == null ? null : ctx_r82.contactDetailsObj.county.trim(), "\u00A0", ctx_r82.contactDetailsObj == null ? null : ctx_r82.contactDetailsObj.country == null ? null : ctx_r82.contactDetailsObj.country.trim(), "\u00A0", ctx_r82.contactDetailsObj == null ? null : ctx_r82.contactDetailsObj.postal_code == null ? null : ctx_r82.contactDetailsObj.postal_code.trim(), " ");
} }
function AddRemissionComponent_ng_container_10_a_58_Template(rf, ctx) { if (rf & 1) {
    const _r87 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 66);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_10_a_58_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r87); const ctx_r86 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r86.showNotificationPreview()); });
    i0.ɵɵtext(1, " Preview ");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_10_a_59_Template(rf, ctx) { if (rf & 1) {
    const _r89 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 66);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_10_a_59_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r89); const ctx_r88 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r88.hideNotificationPreview()); });
    i0.ɵɵtext(1, " Hide Preview ");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_10_app_notification_preview_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-notification-preview", 67);
} if (rf & 2) {
    const ctx_r85 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("payment", ctx_r85.remessionPayment)("contactDetails", ctx_r85.contactDetailsObj)("refundReason", "RR036")("refundAmount", ctx_r85.remissionForm.controls.amount.value);
} }
function AddRemissionComponent_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    const _r91 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 46, 7);
    i0.ɵɵelementStart(3, "div", 24)(4, "h1", 8);
    i0.ɵɵtext(5, " Check your answers");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "table", 28)(7, "tr", 29)(8, "td", 30);
    i0.ɵɵtext(9, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 31);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "tr", 29)(13, "td", 30);
    i0.ɵɵtext(14, "Payment amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 31);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "tr", 29)(19, "td", 30);
    i0.ɵɵtext(20, "Payment status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 31);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "tr", 29)(24, "td", 30);
    i0.ɵɵtext(25, "Fee");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "td", 31);
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "tr", 29)(30, "td", 30);
    i0.ɵɵtext(31, "Help with fees or remission reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "td", 31);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "tr", 29);
    i0.ɵɵtemplate(35, AddRemissionComponent_ng_container_10_td_35_Template, 2, 0, "td", 48);
    i0.ɵɵtemplate(36, AddRemissionComponent_ng_container_10_td_36_Template, 2, 0, "td", 48);
    i0.ɵɵelementStart(37, "td", 31);
    i0.ɵɵtext(38);
    i0.ɵɵpipe(39, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "tr", 29)(41, "td", 30);
    i0.ɵɵtext(42, "Send to");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "td", 31);
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "tr", 29)(46, "td", 30);
    i0.ɵɵtext(47, "Send via");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "td", 61);
    i0.ɵɵtemplate(49, AddRemissionComponent_ng_container_10_div_49_Template, 5, 1, "div", 62);
    i0.ɵɵtemplate(50, AddRemissionComponent_ng_container_10_div_50_Template, 5, 5, "div", 62);
    i0.ɵɵelementStart(51, "a", 47);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_10_Template_a_click_51_listener() { i0.ɵɵrestoreView(_r91); const ctx_r90 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r90.gotoProcessRetroRemission(ctx_r90.contactDetailsObj)); });
    i0.ɵɵtext(52, "Change");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(53, "tr", 29)(54, "td", 30);
    i0.ɵɵtext(55, "Notification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "td", 31);
    i0.ɵɵtext(57);
    i0.ɵɵtemplate(58, AddRemissionComponent_ng_container_10_a_58_Template, 2, 0, "a", 63);
    i0.ɵɵtemplate(59, AddRemissionComponent_ng_container_10_a_59_Template, 2, 0, "a", 63);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(60, AddRemissionComponent_ng_container_10_app_notification_preview_60_Template, 1, 4, "app-notification-preview", 64);
    i0.ɵɵelementStart(61, "button", 32);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_10_Template_button_click_61_listener() { i0.ɵɵrestoreView(_r91); const ctx_r92 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r92.gotoProcessRetroRemission(ctx_r92.contactDetailsObj)); });
    i0.ɵɵtext(62, "Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "button", 33);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_10_Template_button_click_63_listener() { i0.ɵɵrestoreView(_r91); const ctx_r93 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r93.processRefund()); });
    i0.ɵɵtext(64, " Submit refund ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "p")(66, "a", 45);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_10_Template_a_click_66_listener($event) { i0.ɵɵrestoreView(_r91); const ctx_r94 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r94.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(67, " Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r9.remessionPayment ? ctx_r9.remessionPayment.reference : " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("\u00A3", ctx_r9.remessionPayment ? ctx_r9.getFormattedCurrency(ctx_r9.remessionPayment.amount) : i0.ɵɵpipeBind4(17, 19, " ", "GBP", "symbol", "1.2-2"), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r9.remessionPayment ? ctx_r9.remessionPayment.status : "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate3("", ctx_r9.fee.code, " - ", ctx_r9.fee.description, " (", i0.ɵɵpipeBind4(28, 24, ctx_r9.fee.calculated_amount / ctx_r9.fee.volume, "GBP", "symbol-narrow", "1.2-2"), ") ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r9.remissionForm.controls.remissionCode.value == null ? null : ctx_r9.remissionForm.controls.remissionCode.value.trim(), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r9.remessionPayment.status === "Success");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.remessionPayment.status !== "Success");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind4(39, 29, ctx_r9.remissionForm.controls.amount.value, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r9.orderParty);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", (ctx_r9.contactDetailsObj == null ? null : ctx_r9.contactDetailsObj.notification_type) === "EMAIL");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r9.contactDetailsObj == null ? null : ctx_r9.contactDetailsObj.notification_type) === "LETTER");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", ctx_r9.templateInstructionType, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r9.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.notificationPreview);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r9.isConfirmationBtnDisabled)("ngClass", ctx_r9.isConfirmationBtnDisabled ? "button button--disabled govuk-!-margin-right-1" : "button govuk-!-margin-right-1");
} }
function AddRemissionComponent_ng_container_11_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "h2", 57);
    i0.ɵɵtext(2, "What happens next");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 54);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r96 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" A refund request for ", i0.ɵɵpipeBind4(5, 1, ctx_r96.refundAmount, "GBP", "symbol-narrow", "1.2-2"), " has been created and will be passed to a team leader to approve. ");
} }
function AddRemissionComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    const _r98 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 68, 7);
    i0.ɵɵelementStart(3, "div", 50)(4, "div")(5, "div", 69)(6, "h1", 52);
    i0.ɵɵtext(7, " Refund submitted ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 55)(9, "p", 70)(10, "strong");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(12, AddRemissionComponent_ng_container_11_div_12_Template, 6, 6, "div", 1);
    i0.ɵɵelementStart(13, "p", 54)(14, "a", 39);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_11_Template_a_click_14_listener($event) { i0.ɵɵrestoreView(_r98); const ctx_r97 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r97.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(15, " Return to case ");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate1("Refund reference: ", ctx_r10.refundReference, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.isPaymentSuccess);
} }
function AddRemissionComponent_ng_container_12_tbody_29_tr_1_td_18_Template(rf, ctx) { if (rf & 1) {
    const _r111 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 90)(1, "div", 99)(2, "input", 100);
    i0.ɵɵlistener("keyup", function AddRemissionComponent_ng_container_12_tbody_29_tr_1_td_18_Template_input_keyup_2_listener($event) { i0.ɵɵrestoreView(_r111); const ctx_r110 = i0.ɵɵnextContext(); const fee_r105 = ctx_r110.$implicit; const i_r106 = ctx_r110.index; const ctx_r109 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r109.calAmtToRefund($event.target.value, fee_r105.controls["calculated_amount"].value, fee_r105.controls["volume"].value, i_r106)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r112 = i0.ɵɵnextContext();
    const i_r106 = ctx_r112.index;
    const fee_r105 = ctx_r112.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroupName", i_r106);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("id", "feeVolumeUpdated_", fee_r105.controls["id"].value, "");
    i0.ɵɵpropertyInterpolate("value", fee_r105.controls["updated_volume"].value);
    i0.ɵɵpropertyInterpolate1("name", "feeVolumeUpdated_", fee_r105.controls["id"].value, "");
} }
function AddRemissionComponent_ng_container_12_tbody_29_tr_1_td_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 90);
    i0.ɵɵelement(1, "input", 101);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r105 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("id", "VolumeUpdated_", fee_r105.controls["id"].value, "")("name", "VolumeUpdated_", fee_r105.controls["id"].value, "");
    i0.ɵɵpropertyInterpolate("value", fee_r105.controls["volume"].value);
} }
function AddRemissionComponent_ng_container_12_tbody_29_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r115 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 84)(1, "td", 31)(2, "div", 85)(3, "div", 86)(4, "input", 87);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_12_tbody_29_tr_1_Template_input_click_4_listener() { const restoredCtx = i0.ɵɵrestoreView(_r115); const i_r106 = restoredCtx.index; const fee_r105 = restoredCtx.$implicit; const ctx_r114 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r114.check_en(i_r106, fee_r105.controls["id"].value, fee_r105.controls["apportion_amount"].value, fee_r105.controls["volume"].value)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "label", 88)(6, "span", 89);
    i0.ɵɵtext(7, "Select");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(8, "td", 61);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 90)(11, "div", 91);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 90);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, AddRemissionComponent_ng_container_12_tbody_29_tr_1_td_18_Template, 3, 4, "td", 92);
    i0.ɵɵtemplate(19, AddRemissionComponent_ng_container_12_tbody_29_tr_1_td_19_Template, 2, 3, "td", 92);
    i0.ɵɵelementStart(20, "td", 93)(21, "div", 94)(22, "div", 19);
    i0.ɵɵtext(23, "\u00A3");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(24, "input", 95)(25, "input", 96)(26, "input", 97)(27, "input", 98);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const fee_r105 = ctx.$implicit;
    const i_r106 = ctx.index;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroupName", i_r106);
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate("id", fee_r105.controls["id"].value);
    i0.ɵɵpropertyInterpolate("value", fee_r105.controls["id"].value);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("for", fee_r105.controls["id"].value);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", fee_r105.controls["description"].value, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate1("id", "feeVOl_", fee_r105.controls["id"].value, "");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(fee_r105.controls["calculated_amount"].value / fee_r105.controls["volume"].value);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(14, 23, fee_r105.controls["calculated_amount"].value / fee_r105.controls["volume"].value, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind4(17, 28, fee_r105.controls["apportion_amount"].value, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", fee_r105.controls["volume"].value > 1);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", fee_r105.controls["volume"].value === 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroupName", i_r106);
    i0.ɵɵadvance(3);
    i0.ɵɵpropertyInterpolate1("id", "feeAmount_", fee_r105.controls["id"].value, "")("name", "feeAmount_", fee_r105.controls["id"].value, "");
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("id", "feeVolume_", fee_r105.controls["id"].value, "")("name", "feeVolume_", fee_r105.controls["id"].value, "");
    i0.ɵɵpropertyInterpolate("value", fee_r105.controls["volume"].value);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("id", "feeApportionAmount_", fee_r105.controls["id"].value, "")("name", "feeApportionAmount_", fee_r105.controls["id"].value, "");
    i0.ɵɵpropertyInterpolate("value", fee_r105.controls["apportion_amount"].value);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("id", "calculatedAmount_", fee_r105.controls["id"].value, "")("name", "calculatedAmount_", fee_r105.controls["id"].value, "");
    i0.ɵɵpropertyInterpolate("value", fee_r105.controls["calculated_amount"].value);
} }
function AddRemissionComponent_ng_container_12_tbody_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 82);
    i0.ɵɵtemplate(1, AddRemissionComponent_ng_container_12_tbody_29_tr_1_Template, 28, 33, "tr", 83);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r99 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r99.feesList == null ? null : ctx_r99.feesList.controls);
} }
function AddRemissionComponent_ng_container_12_tbody_30_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 29)(1, "td", 31)(2, "div", 103)(3, "div", 86);
    i0.ɵɵelement(4, "input", 104);
    i0.ɵɵelementStart(5, "label", 88)(6, "span", 89);
    i0.ɵɵtext(7, "Select");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(8, "td", 61);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 90)(11, "div", 91);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 90);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td", 90)(19, "div");
    i0.ɵɵelement(20, "input", 105);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "td", 93)(22, "div", 18)(23, "div", 19);
    i0.ɵɵtext(24, "\u00A3");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 106);
    i0.ɵɵpipe(26, "currency");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const fee_r117 = ctx.$implicit;
    const ctx_r116 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵpropertyInterpolate("id", fee_r117.id);
    i0.ɵɵpropertyInterpolate("value", fee_r117.id);
    i0.ɵɵproperty("checked", true);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("for", fee_r117.id);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", fee_r117.description, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate1("id", "feeVOl_", fee_r117.id, "");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(fee_r117.calculated_amount / fee_r117.volume);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(14, 15, fee_r117.calculated_amount / fee_r117.volume, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind4(17, 20, ctx_r116.payment.amount, "GBP", "symbol-narrow", "1.2-2"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵpropertyInterpolate1("id", "feeVolumeUpdated_", fee_r117.id, "");
    i0.ɵɵpropertyInterpolate("value", fee_r117.volume);
    i0.ɵɵpropertyInterpolate1("name", "feeVolumeUpdated_", fee_r117.id, "");
    i0.ɵɵadvance(5);
    i0.ɵɵpropertyInterpolate1("id", "feeAmount_", fee_r117.id, "")("name", "feeAmount_", fee_r117.id, "");
    i0.ɵɵpropertyInterpolate("value", i0.ɵɵpipeBind4(26, 25, ctx_r116.payment.amount, "GBP", "symbol-narrow", "1.2-2"));
} }
function AddRemissionComponent_ng_container_12_tbody_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 82);
    i0.ɵɵtemplate(1, AddRemissionComponent_ng_container_12_tbody_30_tr_1_Template, 27, 30, "tr", 102);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r100 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r100.fees);
} }
function AddRemissionComponent_ng_container_12_tbody_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 82)(1, "td", 107);
    i0.ɵɵtext(2, "No fees recorded");
    i0.ɵɵelementEnd()();
} }
function AddRemissionComponent_ng_container_12_a_33_Template(rf, ctx) { if (rf & 1) {
    const _r120 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 108);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_12_a_33_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r120); const ctx_r119 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r119.gotoServiceRequestPage($event)); });
    i0.ɵɵtext(1, " Previous ");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_12_a_34_Template(rf, ctx) { if (rf & 1) {
    const _r122 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 108);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_12_a_34_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r122); const ctx_r121 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r121.goToPaymentViewComponent()); });
    i0.ɵɵtext(1, " Previous ");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    const _r124 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 10)(2, "form", 11)(3, "h1", 8);
    i0.ɵɵtext(4, "Process refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2", 35);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdHyphens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 71);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "h3", 72);
    i0.ɵɵtext(11, "Select fees to be refunded");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div")(13, "table", 28)(14, "thead", 73)(15, "tr", 29)(16, "td", 74);
    i0.ɵɵtext(17, "Select");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td", 75);
    i0.ɵɵtext(19, "Fee description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "td", 76);
    i0.ɵɵtext(21, "Fee amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td", 76);
    i0.ɵɵtext(23, "Total paid");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "td", 76);
    i0.ɵɵtext(25, "Quantity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "td", 77);
    i0.ɵɵtext(27, "Amount to refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(28, "td", 78);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(29, AddRemissionComponent_ng_container_12_tbody_29_Template, 2, 1, "tbody", 79);
    i0.ɵɵtemplate(30, AddRemissionComponent_ng_container_12_tbody_30_Template, 2, 1, "tbody", 79);
    i0.ɵɵtemplate(31, AddRemissionComponent_ng_container_12_tbody_31_Template, 3, 0, "tbody", 79);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div", 36);
    i0.ɵɵtemplate(33, AddRemissionComponent_ng_container_12_a_33_Template, 2, 0, "a", 80);
    i0.ɵɵtemplate(34, AddRemissionComponent_ng_container_12_a_34_Template, 2, 0, "a", 80);
    i0.ɵɵelementStart(35, "button", 81);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_12_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r124); const ctx_r123 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r123.gotoIssuePage(ctx_r123.isFullyRefund)); });
    i0.ɵɵtext(36, " Continue ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "p")(38, "a", 60);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_12_Template_a_click_38_listener($event) { i0.ɵɵrestoreView(_r124); const ctx_r125 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r125.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(39, "Cancel");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r11.remissionForm);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Case reference:", i0.ɵɵpipeBind1(7, 9, ctx_r11.ccdCaseNumber), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Payment reference: ", ctx_r11.paymentReference, " ");
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("ngIf", !ctx_r11.isFullyRefund);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.isFullyRefund);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r11.fees == null ? null : ctx_r11.fees.length) === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r11.isFullyRefund);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.isFullyRefund);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r11.noneSelected());
} }
function AddRemissionComponent_ng_container_13_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 120);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r127 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" Payment reference: ", ctx_r127.paymentReference, " ");
} }
function AddRemissionComponent_ng_container_13_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 120);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r128 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" Payment reference: ", ctx_r128.refundPaymentReference, " ");
} }
function AddRemissionComponent_ng_container_13_p_18_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Select a reason why you\u2019re making this refund");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_13_p_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 22);
    i0.ɵɵtemplate(1, AddRemissionComponent_ng_container_13_p_18_span_1_Template, 2, 0, "span", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r129 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r129.refundHasError);
} }
function AddRemissionComponent_ng_container_13_div_21_div_4_p_4_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a reason why you\u2019re making this refund");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_13_div_21_div_4_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 22);
    i0.ɵɵtemplate(1, AddRemissionComponent_ng_container_13_div_21_div_4_p_4_span_1_Template, 2, 0, "span", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r137 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r137.isReasonEmpty);
} }
const _c1 = function (a0) { return { "form-group-error": a0 }; };
function AddRemissionComponent_ng_container_13_div_21_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 124)(1, "label", 125);
    i0.ɵɵtext(2, " Enter reason ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 126);
    i0.ɵɵtemplate(4, AddRemissionComponent_ng_container_13_div_21_div_4_p_4_Template, 2, 1, "p", 15);
    i0.ɵɵelement(5, "input", 127);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const refund_r134 = i0.ɵɵnextContext().$implicit;
    const ctx_r136 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("for", refund_r134.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c1, ctx_r136.isReasonEmpty));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r136.isReasonEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c0, ctx_r136.isReasonEmpty));
} }
function AddRemissionComponent_ng_container_13_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r141 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 121)(1, "input", 122);
    i0.ɵɵlistener("change", function AddRemissionComponent_ng_container_13_div_21_Template_input_change_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r141); const refund_r134 = restoredCtx.$implicit; const ctx_r140 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r140.selectRadioButton(refund_r134.code, refund_r134.name)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 123);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, AddRemissionComponent_ng_container_13_div_21_div_4_Template, 6, 8, "div", 119);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const refund_r134 = ctx.$implicit;
    const ctx_r130 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("id", refund_r134.name);
    i0.ɵɵpropertyInterpolate("value", refund_r134.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", refund_r134.name, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r130.isRefundReasonsSelected && ctx_r130.showReasonText && ctx_r130.selectedRefundReason === refund_r134.name);
} }
function AddRemissionComponent_ng_container_13_option_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 128);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const refund_r142 = ctx.$implicit;
    i0.ɵɵpropertyInterpolate("id", refund_r142.name);
    i0.ɵɵpropertyInterpolate("value", refund_r142.code);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(refund_r142.name);
} }
function AddRemissionComponent_ng_container_13_div_29_p_4_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a reason why you\u2019re making this refund");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_13_div_29_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 22);
    i0.ɵɵtemplate(1, AddRemissionComponent_ng_container_13_div_29_p_4_span_1_Template, 2, 0, "span", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r143 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r143.isReasonEmpty);
} }
function AddRemissionComponent_ng_container_13_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 124)(1, "div", 126)(2, "label", 129);
    i0.ɵɵtext(3, " Enter reason ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, AddRemissionComponent_ng_container_13_div_29_p_4_Template, 2, 1, "p", 15);
    i0.ɵɵelement(5, "input", 130);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r132 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c1, ctx_r132.isReasonEmpty));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r132.isReasonEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("maxlength", ctx_r132.reasonLength);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c0, ctx_r132.isReasonEmpty));
} }
function AddRemissionComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    const _r146 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 109, 7);
    i0.ɵɵelementStart(3, "h1", 8);
    i0.ɵɵtext(4, "Process refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h1", 35);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdHyphens");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, AddRemissionComponent_ng_container_13_span_8_Template, 2, 1, "span", 110);
    i0.ɵɵtemplate(9, AddRemissionComponent_ng_container_13_span_9_Template, 2, 1, "span", 110);
    i0.ɵɵelementStart(10, "h1", 8);
    i0.ɵɵtext(11, "Why are you making this refund? ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 10)(13, "form", 9)(14, "div", 10)(15, "form", 11)(16, "fieldset", 111)(17, "div", 112);
    i0.ɵɵtemplate(18, AddRemissionComponent_ng_container_13_p_18_Template, 2, 1, "p", 15);
    i0.ɵɵelementStart(19, "div", 113)(20, "div", 114);
    i0.ɵɵtemplate(21, AddRemissionComponent_ng_container_13_div_21_Template, 5, 4, "div", 115);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(22, "br");
    i0.ɵɵelementStart(23, "div")(24, "select", 116);
    i0.ɵɵlistener("change", function AddRemissionComponent_ng_container_13_Template_select_change_24_listener($event) { i0.ɵɵrestoreView(_r146); const ctx_r145 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r145.selectchange($event)); });
    i0.ɵɵelementStart(25, "option", 117);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(27, AddRemissionComponent_ng_container_13_option_27_Template, 2, 3, "option", 118);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(28, "br");
    i0.ɵɵtemplate(29, AddRemissionComponent_ng_container_13_div_29_Template, 6, 8, "div", 119);
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(30, "div", 36)(31, "button", 37);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_13_Template_button_click_31_listener() { i0.ɵɵrestoreView(_r146); const ctx_r147 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r147.gotoPartialFeeRefundScreen()); });
    i0.ɵɵtext(32, " Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "button", 38);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_13_Template_button_click_33_listener() { i0.ɵɵrestoreView(_r146); const ctx_r148 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r148.gotoIssueRefundConfirmation(ctx_r148.payment)); });
    i0.ɵɵtext(34, " Continue");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "p")(36, "a", 45);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_13_Template_a_click_36_listener($event) { i0.ɵɵrestoreView(_r146); const ctx_r149 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r149.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(37, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Case reference: ", i0.ɵɵpipeBind1(7, 12, ctx_r12.ccdCaseNumber), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r12.payment);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r12.refundPaymentReference);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("formGroup", ctx_r12.remissionForm);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r12.refundHasError ? "govuk-radios govuk-radios--conditional form-group-error" : "govuk-radios govuk-radios--conditional");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r12.refundHasError);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r12.commonRefundReasons);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("defaultSelected", true)("value", ctx_r12.default);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r12.default);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r12.refundReasons);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r12.showReasonText && !ctx_r12.isRefundReasonsSelected);
} }
function AddRemissionComponent_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    const _r152 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 131, 7);
    i0.ɵɵelementStart(3, "h1", 57);
    i0.ɵɵtext(4, "Process refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2", 58);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdHyphens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 132);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "ccpay-contact-details", 59);
    i0.ɵɵlistener("assignContactDetails", function AddRemissionComponent_ng_container_14_Template_ccpay_contact_details_assignContactDetails_10_listener($event) { i0.ɵɵrestoreView(_r152); const ctx_r151 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r151.getContactDetails($event, "checkissuerefundpage")); })("redirectToIssueRefund", function AddRemissionComponent_ng_container_14_Template_ccpay_contact_details_redirectToIssueRefund_10_listener() { i0.ɵɵrestoreView(_r152); const ctx_r153 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r153.gotoRefundReasonPage()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p")(12, "a", 60);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_14_Template_a_click_12_listener($event) { i0.ɵɵrestoreView(_r152); const ctx_r154 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r154.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(13, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Case reference: ", i0.ɵɵpipeBind1(7, 3, ctx_r13.ccdCaseNumber), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Payment reference: ", ctx_r13.paymentReference, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("addressObj", ctx_r13.notification);
} }
function AddRemissionComponent_ng_container_15_tr_25_Template(rf, ctx) { if (rf & 1) {
    const _r164 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 29)(1, "td", 30);
    i0.ɵɵtext(2, "Refund amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 31);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "currency");
    i0.ɵɵelementStart(6, "a", 47);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_15_tr_25_Template_a_click_6_listener() { i0.ɵɵrestoreView(_r164); const ctx_r163 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r163.changeRefundAmount()); });
    i0.ɵɵtext(7, "Change");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r156 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind4(5, 1, ctx_r156.totalRefundAmount, "GBP", "symbol-narrow", "1.2-2"), " ");
} }
function AddRemissionComponent_ng_container_15_tr_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 29)(1, "td", 30);
    i0.ɵɵtext(2, "Refund amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 31);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r157 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(5, 1, ctx_r157.payment.amount, "GBP", "symbol-narrow", "1.2-2"));
} }
function AddRemissionComponent_ng_container_15_div_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65)(1, "strong");
    i0.ɵɵtext(2, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r158 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r158.contactDetailsObj == null ? null : ctx_r158.contactDetailsObj.email == null ? null : ctx_r158.contactDetailsObj.email.trim(), " ");
} }
function AddRemissionComponent_ng_container_15_div_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65)(1, "strong");
    i0.ɵɵtext(2, "Post");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r159 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate5(" ", ctx_r159.contactDetailsObj == null ? null : ctx_r159.contactDetailsObj.address_line == null ? null : ctx_r159.contactDetailsObj.address_line.trim(), "\u00A0", ctx_r159.contactDetailsObj == null ? null : ctx_r159.contactDetailsObj.city == null ? null : ctx_r159.contactDetailsObj.city.trim(), "\u00A0", ctx_r159.contactDetailsObj == null ? null : ctx_r159.contactDetailsObj.county == null ? null : ctx_r159.contactDetailsObj.county.trim(), "\u00A0", ctx_r159.contactDetailsObj == null ? null : ctx_r159.contactDetailsObj.country == null ? null : ctx_r159.contactDetailsObj.country.trim(), "\u00A0", ctx_r159.contactDetailsObj == null ? null : ctx_r159.contactDetailsObj.postal_code == null ? null : ctx_r159.contactDetailsObj.postal_code.trim(), " ");
} }
function AddRemissionComponent_ng_container_15_a_45_Template(rf, ctx) { if (rf & 1) {
    const _r166 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 66);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_15_a_45_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r166); const ctx_r165 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r165.showNotificationPreview()); });
    i0.ɵɵtext(1, " Preview ");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_15_a_46_Template(rf, ctx) { if (rf & 1) {
    const _r168 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 66);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_15_a_46_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r168); const ctx_r167 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r167.hideNotificationPreview()); });
    i0.ɵɵtext(1, " Hide Preview ");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_15_app_notification_preview_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-notification-preview", 67);
} if (rf & 2) {
    const ctx_r162 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("payment", ctx_r162.payment)("contactDetails", ctx_r162.contactDetailsObj)("refundReason", ctx_r162.selectedRefundReasonCode)("refundAmount", ctx_r162.isFullyRefund ? ctx_r162.payment.amount : ctx_r162.totalRefundAmount);
} }
function AddRemissionComponent_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    const _r170 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 133, 7);
    i0.ɵɵelementStart(3, "div", 24)(4, "h1", 8);
    i0.ɵɵtext(5, " Check your answers");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "table", 28)(7, "tr", 29)(8, "td", 30);
    i0.ɵɵtext(9, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 31);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "tr", 29)(13, "td", 30);
    i0.ɵɵtext(14, "Payment amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 31);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "tr")(19, "td", 30);
    i0.ɵɵtext(20, "Reason for refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 31);
    i0.ɵɵtext(22);
    i0.ɵɵelementStart(23, "a", 47);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_15_Template_a_click_23_listener() { i0.ɵɵrestoreView(_r170); const ctx_r169 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r169.changeIssueRefundReason()); });
    i0.ɵɵtext(24, "Change");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(25, AddRemissionComponent_ng_container_15_tr_25_Template, 8, 6, "tr", 134);
    i0.ɵɵtemplate(26, AddRemissionComponent_ng_container_15_tr_26_Template, 6, 6, "tr", 134);
    i0.ɵɵelementStart(27, "tr", 29)(28, "td", 30);
    i0.ɵɵtext(29, "Send to");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "td", 31);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "tr", 29)(33, "td", 30);
    i0.ɵɵtext(34, "Send via");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "td", 61);
    i0.ɵɵtemplate(36, AddRemissionComponent_ng_container_15_div_36_Template, 5, 1, "div", 62);
    i0.ɵɵtemplate(37, AddRemissionComponent_ng_container_15_div_37_Template, 5, 5, "div", 62);
    i0.ɵɵelementStart(38, "a", 47);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_15_Template_a_click_38_listener() { i0.ɵɵrestoreView(_r170); const ctx_r171 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r171.gotoContactDetailsPage(ctx_r171.contactDetailsObj)); });
    i0.ɵɵtext(39, "Change");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(40, "tr", 29)(41, "td", 30);
    i0.ɵɵtext(42, "Notification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "td", 31);
    i0.ɵɵtext(44);
    i0.ɵɵtemplate(45, AddRemissionComponent_ng_container_15_a_45_Template, 2, 0, "a", 63);
    i0.ɵɵtemplate(46, AddRemissionComponent_ng_container_15_a_46_Template, 2, 0, "a", 63);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(47, AddRemissionComponent_ng_container_15_app_notification_preview_47_Template, 1, 4, "app-notification-preview", 64);
    i0.ɵɵelementStart(48, "div", 36)(49, "button", 32);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_15_Template_button_click_49_listener() { i0.ɵɵrestoreView(_r170); const ctx_r172 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r172.gotoContactDetailsPage(ctx_r172.contactDetailsObj)); });
    i0.ɵɵtext(50, " Previous ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "button", 33);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_15_Template_button_click_51_listener() { i0.ɵɵrestoreView(_r170); const ctx_r173 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r173.confirmIssueRefund(ctx_r173.isFullyRefund)); });
    i0.ɵɵtext(52, " Submit refund ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(53, "p")(54, "a", 60);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_15_Template_a_click_54_listener($event) { i0.ɵɵrestoreView(_r170); const ctx_r174 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r174.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(55, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r14.paymentReference);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(17, 14, ctx_r14.payment.amount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r14.displayRefundReason == null ? null : ctx_r14.displayRefundReason.trim(), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r14.isFullyRefund);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r14.isFullyRefund);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r14.orderParty);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", (ctx_r14.contactDetailsObj == null ? null : ctx_r14.contactDetailsObj.notification_type) === "EMAIL");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r14.contactDetailsObj == null ? null : ctx_r14.contactDetailsObj.notification_type) === "LETTER");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", ctx_r14.templateInstructionType, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r14.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r14.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r14.notificationPreview);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r14.isConfirmationBtnDisabled)("ngClass", ctx_r14.isConfirmationBtnDisabled ? "button button--disabled govuk-!-margin-right-1" : "button govuk-!-margin-right-1");
} }
function AddRemissionComponent_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    const _r177 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 56, 7);
    i0.ɵɵelementStart(3, "h1", 57);
    i0.ɵɵtext(4, "Process refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2", 58);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdHyphens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 132);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "ccpay-contact-details", 59);
    i0.ɵɵlistener("assignContactDetails", function AddRemissionComponent_ng_container_16_Template_ccpay_contact_details_assignContactDetails_10_listener($event) { i0.ɵɵrestoreView(_r177); const ctx_r176 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r176.getContactDetails($event, "addrefundcheckandanswer")); })("redirectToIssueRefund", function AddRemissionComponent_ng_container_16_Template_ccpay_contact_details_redirectToIssueRefund_10_listener($event) { i0.ɵɵrestoreView(_r177); const ctx_r178 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r178.gotoServiceRequestPage($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p")(12, "a", 60);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_16_Template_a_click_12_listener($event) { i0.ɵɵrestoreView(_r177); const ctx_r179 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r179.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(13, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Case reference: ", i0.ɵɵpipeBind1(7, 3, ctx_r15.ccdCaseNumber), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Payment reference: ", ctx_r15.paymentReference, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("addressObj", ctx_r15.notification);
} }
function AddRemissionComponent_ng_container_17_div_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65)(1, "strong");
    i0.ɵɵtext(2, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r181 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r181.contactDetailsObj == null ? null : ctx_r181.contactDetailsObj.email == null ? null : ctx_r181.contactDetailsObj.email.trim(), " ");
} }
function AddRemissionComponent_ng_container_17_div_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65)(1, "strong");
    i0.ɵɵtext(2, "Post");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r182 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate5(" ", ctx_r182.contactDetailsObj == null ? null : ctx_r182.contactDetailsObj.address_line == null ? null : ctx_r182.contactDetailsObj.address_line.trim(), "\u00A0", ctx_r182.contactDetailsObj == null ? null : ctx_r182.contactDetailsObj.city == null ? null : ctx_r182.contactDetailsObj.city.trim(), "\u00A0", ctx_r182.contactDetailsObj == null ? null : ctx_r182.contactDetailsObj.county == null ? null : ctx_r182.contactDetailsObj.county.trim(), "\u00A0", ctx_r182.contactDetailsObj == null ? null : ctx_r182.contactDetailsObj.country == null ? null : ctx_r182.contactDetailsObj.country.trim(), "\u00A0", ctx_r182.contactDetailsObj == null ? null : ctx_r182.contactDetailsObj.postal_code == null ? null : ctx_r182.contactDetailsObj.postal_code.trim(), " ");
} }
function AddRemissionComponent_ng_container_17_a_52_Template(rf, ctx) { if (rf & 1) {
    const _r187 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 66);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_17_a_52_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r187); const ctx_r186 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r186.showNotificationPreview()); });
    i0.ɵɵtext(1, " Preview ");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_17_a_53_Template(rf, ctx) { if (rf & 1) {
    const _r189 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 66);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_17_a_53_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r189); const ctx_r188 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r188.hideNotificationPreview()); });
    i0.ɵɵtext(1, " Hide Preview ");
    i0.ɵɵelementEnd();
} }
function AddRemissionComponent_ng_container_17_app_notification_preview_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-notification-preview", 137);
} if (rf & 2) {
    const ctx_r185 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("contactDetails", ctx_r185.contactDetailsObj)("paymentReference", ctx_r185.paymentReference)("payment", ctx_r185.paymentObj)("refundReason", "RR036")("refundAmount", ctx_r185.remission.hwf_amount);
} }
function AddRemissionComponent_ng_container_17_Template(rf, ctx) { if (rf & 1) {
    const _r191 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 135, 7);
    i0.ɵɵelementStart(3, "div", 24)(4, "h1", 8);
    i0.ɵɵtext(5, " Check your answers");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "table", 28)(7, "tr", 29)(8, "td", 30);
    i0.ɵɵtext(9, "Reason for refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 31);
    i0.ɵɵtext(11, "Retrospective remission");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "tr", 29)(13, "td", 30);
    i0.ɵɵtext(14, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 31);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "tr", 29)(18, "td", 30);
    i0.ɵɵtext(19, "Refund amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "td", 31);
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "tr", 29)(24, "td", 30);
    i0.ɵɵtext(25, "Fee code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "td", 31);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "tr", 29)(29, "td", 30);
    i0.ɵɵtext(30, "Fee amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "td", 31);
    i0.ɵɵtext(32);
    i0.ɵɵpipe(33, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "tr", 29)(35, "td", 30);
    i0.ɵɵtext(36, "Send to");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "td", 31);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "tr", 29)(40, "td", 30);
    i0.ɵɵtext(41, "Send via");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "td", 61);
    i0.ɵɵtemplate(43, AddRemissionComponent_ng_container_17_div_43_Template, 5, 1, "div", 62);
    i0.ɵɵtemplate(44, AddRemissionComponent_ng_container_17_div_44_Template, 5, 5, "div", 62);
    i0.ɵɵelementStart(45, "a", 47);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_17_Template_a_click_45_listener() { i0.ɵɵrestoreView(_r191); const ctx_r190 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r190.gotoAddressPage(ctx_r190.contactDetailsObj)); });
    i0.ɵɵtext(46, "Change");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(47, "tr", 29)(48, "td", 30);
    i0.ɵɵtext(49, "Notification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "td", 31);
    i0.ɵɵtext(51);
    i0.ɵɵtemplate(52, AddRemissionComponent_ng_container_17_a_52_Template, 2, 0, "a", 63);
    i0.ɵɵtemplate(53, AddRemissionComponent_ng_container_17_a_53_Template, 2, 0, "a", 63);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(54, AddRemissionComponent_ng_container_17_app_notification_preview_54_Template, 1, 5, "app-notification-preview", 136);
    i0.ɵɵelementStart(55, "div", 36)(56, "button", 32);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_17_Template_button_click_56_listener() { i0.ɵɵrestoreView(_r191); const ctx_r192 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r192.gotoAddressPage(ctx_r192.contactDetailsObj)); });
    i0.ɵɵtext(57, "Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "button", 33);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_17_Template_button_click_58_listener() { i0.ɵɵrestoreView(_r191); const ctx_r193 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r193.processRefund()); });
    i0.ɵɵtext(59, " Submit refund ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(60, "p")(61, "a", 45);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_17_Template_a_click_61_listener($event) { i0.ɵɵrestoreView(_r191); const ctx_r194 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r194.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(62, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext();
    i0.ɵɵadvance(16);
    i0.ɵɵtextInterpolate(ctx_r16.paymentReference);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(22, 13, ctx_r16.remission.hwf_amount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r16.remission.fee_code);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(33, 18, ctx_r16.feeamount, "GBP", "symbol-narrow", "1.2-2"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r16.orderParty);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", (ctx_r16.contactDetailsObj == null ? null : ctx_r16.contactDetailsObj.notification_type) === "EMAIL");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r16.contactDetailsObj == null ? null : ctx_r16.contactDetailsObj.notification_type) === "LETTER");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", ctx_r16.templateInstructionType, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r16.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r16.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r16.notificationPreview);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r16.isConfirmationBtnDisabled)("ngClass", ctx_r16.isConfirmationBtnDisabled ? "button button--disabled govuk-!-margin-right-1" : "button govuk-!-margin-right-1");
} }
function AddRemissionComponent_ng_container_18_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "h2", 57);
    i0.ɵɵtext(2, "What happens next");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 54);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r195 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" A refund request for ", i0.ɵɵpipeBind4(5, 1, ctx_r195.refundAmount, "GBP", "symbol-narrow", "1.2-2"), " has been passed to a team leader to approve. ");
} }
function AddRemissionComponent_ng_container_18_Template(rf, ctx) { if (rf & 1) {
    const _r197 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 50)(2, "div")(3, "div", 69)(4, "h1", 52);
    i0.ɵɵtext(5, " Refund submitted ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 55)(7, "p", 70)(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(10, AddRemissionComponent_ng_container_18_div_10_Template, 6, 6, "div", 1);
    i0.ɵɵelementStart(11, "p", 54)(12, "a", 39);
    i0.ɵɵlistener("click", function AddRemissionComponent_ng_container_18_Template_a_click_12_listener($event) { i0.ɵɵrestoreView(_r197); const ctx_r196 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r196.gotoCasetransationPageCancelBtnClicked($event)); });
    i0.ɵɵtext(13, " Return to case ");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("Refund reference: ", ctx_r17.refundReference, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r17.isPaymentSuccess);
} }
function AddRemissionComponent_ng_container_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "ccpay-service-request", 138);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("viewStatus", ctx_r18.viewStatus)("orderRef", ctx_r18.orderRef)("isServiceRequest", ctx_r18.isServiceRequest)("orderStatus", ctx_r18.orderStatus)("orderCreated", ctx_r18.orderCreated)("orderParty", ctx_r18.orderParty)("orderCCDEvent", ctx_r18.orderCCDEvent)("orderDetail", ctx_r18.orderDetail)("LOGGEDINUSERROLES", ctx_r18.LOGGEDINUSERROLES)("takePayment", ctx_r18.takePayment)("ccdCaseNumber", ctx_r18.ccdCaseNumber)("orderFeesTotal", ctx_r18.orderFeesTotal)("orderTotalPayments", ctx_r18.orderTotalPayments)("orderRemissionTotal", ctx_r18.orderRemissionTotal);
} }
function AddRemissionComponent_ng_container_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "ccpay-payment-view", 139);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("LOGGEDINUSERROLES", ctx_r19.LOGGEDINUSERROLES)("isTurnOff", ctx_r19.isTurnOff)("isTakePayment", ctx_r19.takePayment)("caseType", ctx_r19.caseType)("isServiceRequest", ctx_r19.isServiceRequest)("orderRef", ctx_r19.orderRef)("orderStatus", ctx_r19.orderStatus)("orderCreated", ctx_r19.orderCreated)("orderParty", ctx_r19.orderParty)("orderCCDEvent", ctx_r19.orderCCDEvent)("orderDetail", ctx_r19.orderDetail)("orderFeesTotal", ctx_r19.orderFeesTotal)("orderTotalPayments", ctx_r19.orderTotalPayments)("orderRemissionTotal", ctx_r19.orderRemissionTotal);
} }
const BS_ENABLE_FLAG = 'bulk-scan-enabling-fe';
const resolvedPromise = Promise.resolve(null);
export class AddRemissionComponent {
    formBuilder;
    router;
    paymentViewService;
    notificationService;
    paymentLibComponent;
    refundService;
    cd;
    OrderslistService;
    fee;
    fees;
    payment;
    remission;
    ccdCaseNumber;
    caseType;
    viewCompStatus;
    paymentGroupRef;
    isTurnOff;
    isRefundRemission;
    isStrategicFixEnable;
    paidAmount;
    isFromRefundListPage;
    isFromPaymentDetailPage;
    isFromServiceRequestPage;
    isFullyRefund;
    feeamount;
    refundPaymentReference;
    isFromRefundStatusPage;
    changeRefundReason;
    isServiceRequest;
    LOGGEDINUSERROLES;
    orderDetail;
    orderRef;
    orderStatus;
    orderParty;
    orderCreated;
    orderCCDEvent;
    takePayment;
    orderFeesTotal;
    orderTotalPayments;
    orderRemissionTotal;
    cancelRemission = new EventEmitter();
    //@Output() refundListReason: EventEmitter<any> = new EventEmitter({reason:string, code:string});
    refundListReason = new EventEmitter();
    refundListAmount = new EventEmitter();
    refundFees = new EventEmitter();
    refund = {
        reason: {
            duplicate: 'Duplicate payment',
            humanerror: 'Human error',
            caseWithdrawn: 'Case withdrawn',
            other: 'Other'
        }
    };
    contactDetailsObj;
    notification;
    remissionForm;
    hasErrors = false;
    viewStatus = 'main';
    errorMessage = null;
    option = null;
    isConfirmationBtnDisabled = false;
    bsPaymentDcnNumber;
    selectedValue = 'yes';
    amount;
    retroRemission = false;
    remissionReference = '';
    refundReference;
    refundAmount;
    paymentExplanationHasError = false;
    refundReason;
    selectedRefundReason;
    selectedRefundReasonCode;
    displayRefundReason;
    refundCode;
    remessionPayment;
    isRemissionCodeEmpty = false;
    remissionCodeHasError = false;
    isAmountEmpty = false;
    isReasonEmpty = false;
    amountHasError = false;
    isRemissionLessThanFeeError = false;
    refundHasError = false;
    isPaymentSuccess = false;
    isRemissionApplied = false;
    remissionamt;
    elementId;
    // refundReasons: any[] = [];
    commonRefundReasons = [];
    showReasonText;
    isRefundReasonsSelected;
    default;
    reasonLength;
    refundReasons;
    pattern1;
    pattern2;
    sendOrderDetail;
    sendOrderRef;
    paymentReference;
    class = '';
    errorMsg = new Array();
    totalRefundAmount;
    quantityUpdated;
    fullRefund;
    allowedRefundAmount;
    isRemissionsMatch;
    paymentFees;
    paymentGroup;
    isStatusAllocated;
    isFromCheckAnsPage;
    refundAmtForFeeVolumes;
    paymentObj;
    templateInstructionType;
    notificationPreview;
    component;
    constructor(formBuilder, router, paymentViewService, notificationService, paymentLibComponent, refundService, cd, OrderslistService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.paymentViewService = paymentViewService;
        this.notificationService = notificationService;
        this.paymentLibComponent = paymentLibComponent;
        this.refundService = refundService;
        this.cd = cd;
        this.OrderslistService = OrderslistService;
    }
    ngOnInit() {
        this.errorMessage = '';
        this.errorMsg = [];
        this.default = 'Select a different reason';
        this.pattern1 = '^([a-zA-Z0-9]{3})-([a-zA-Z0-9]{3})-([a-zA-Z0-9]{3})$';
        this.pattern2 = '^([A-Za-z]{2}[0-9]{2})-([0-9]{6})$';
        if (this.viewCompStatus !== '' && this.viewCompStatus !== undefined) {
            this.viewStatus = '';
        }
        if (this.remission) {
        }
        if (this.fee) {
            this.amount = (this.fee.volume * this.fee.calculated_amount);
        }
        if (this.payment) {
            this.paymentReference = this.payment.reference;
            this.remessionPayment = this.payment;
            if (this.payment.status === 'Success') {
                this.isPaymentSuccess = true;
            }
        }
        this.option = this.paymentLibComponent.SELECTED_OPTION;
        this.bsPaymentDcnNumber = this.paymentLibComponent.bspaymentdcn;
        this.remissionForm = this.formBuilder.group({
            remissionCode: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern(`(${this.pattern1})|(${this.pattern2})`)
            ])),
            amount: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')
            ])),
            refundReason: new FormControl('', Validators.compose([Validators.required])),
            refundDDReason: new FormControl('', Validators.compose([Validators.required])),
            reason: new FormControl(),
            feeAmount: new FormControl(),
            feesList: this.formBuilder.array([])
        });
        const remissionctrls = this.remissionForm.controls;
        remissionctrls['refundDDReason'].setValue('Select a different reason', { onlySelf: true });
        if (this.refundPaymentReference !== undefined && this.refundPaymentReference.length > 0) {
            this.paymentReference = this.refundPaymentReference;
        }
        else {
            this.paymentReference = (this.payment !== undefined) ? this.payment.reference : '';
        }
        if (this.isFromServiceRequestPage) {
            this.paymentViewService.getApportionPaymentDetails(this.paymentReference).subscribe(paymentGroup => {
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
                this.fees = fees;
                this.paymentGroup = paymentGroup;
                this.paymentGroup.payments = this.paymentGroup.payments.filter(paymentGroupObj => paymentGroupObj['reference'].includes(this.paymentLibComponent.paymentReference));
                // const paymentAllocation = this.paymentGroup.payments[0].payment_allocation;
                // this.isStatusAllocated = paymentAllocation.length > 0 && paymentAllocation[0].allocation_status === 'Allocated' || paymentAllocation.length === 0;
                this.refundFeesList();
            }, (error) => this.errorMessage = error);
        }
        if (this.fees && this.viewCompStatus === 'issuerefund') {
            this.refundFeesList();
        }
        if (this.viewCompStatus === '') {
            this.viewStatus = 'main';
        }
        if (this.viewCompStatus === 'issuerefundpage1') {
            this.refundService.getRefundReasons().subscribe(refundReasons => {
                this.refundReasons = refundReasons.filter((data) => data.recently_used === false);
                this.refundReasons = this.refundReasons.filter((data) => data.name !== 'Retrospective remission' && data.name !== 'Overpayment');
                this.cd.detectChanges();
                this.commonRefundReasons = refundReasons.filter((data) => data.recently_used === true);
                this.commonRefundReasons.sort((a, b) => a.toString().localeCompare(b));
                this.cd.detectChanges();
            });
            this.refundReason = this.changeRefundReason;
        }
        if (this.viewCompStatus === 'processretroremissonpage' && this.isFromRefundListPage) {
            this.viewStatus = 'processretroremissonpage';
        }
        if (this.orderDetail !== undefined) {
            this.paymentViewService.getApportionPaymentDetails(this.orderDetail[0].payments[0].reference).subscribe(paymentGroup => {
                this.fees = paymentGroup.fees;
                this.paymentReference = paymentGroup.payments[0].reference;
            }, (error) => this.errorMessage = error);
        }
    }
    goToPaymentViewComponent() {
        this.paymentLibComponent.paymentMethod = this.payment.method;
        this.paymentLibComponent.paymentGroupReference = this.paymentGroupRef;
        this.paymentLibComponent.paymentReference = this.paymentReference;
        //this.PaymentViewComponent.viewCompStatus = 'overpayment';
        this.paymentLibComponent.viewName = 'payment-view';
    }
    refundFeesList() {
        const creds = this.remissionForm.controls.feesList;
        // if(creds.controls.length > 0) {
        for (var i = 0; i < this.fees.length; i++) {
            creds.push(this.formBuilder.group({
                id: this.fees[i].id,
                code: this.fees[i].code,
                volume: this.fees[i].volume,
                calculated_amount: this.fees[i].calculated_amount,
                apportion_amount: this.fees[i].apportion_amount,
                ccd_case_number: this.fees[i].ccd_case_number,
                description: this.fees[i].description,
                net_amount: this.fees[i].net_amount,
                version: this.fees[i].version,
                refund_amount: [''],
                selected: [''],
                updated_volume: this.fees[i].volume
            }));
        }
        this.cd.detectChanges();
        //}
    }
    get feesList() {
        const dd = this.remissionForm.get('feesList');
        return this.remissionForm.get('feesList');
    }
    noneSelected() {
        if (this.isFullyRefund) {
            return false;
        }
        else {
            if (!this.feesList.controls.some(item => item.get('selected').value === true)) {
                this.errorMsg = [];
                [].forEach.call(document.querySelectorAll('input'), function (el) {
                    el.classList.remove('inline-error-class');
                });
            }
            return !this.feesList.controls.some(item => item.get('selected').value === true);
        }
    }
    check_en(i, v1, AppAmt, Volume) {
        const ele = document.getElementById(v1);
        const formArray = this.remissionForm.controls.feesList;
        if (ele.checked) {
            formArray.at(i).get('refund_amount').setValue(AppAmt);
            formArray.at(i).get('volume').setValue(Volume);
            formArray.at(i).get('selected').setValue(true);
            formArray.at(i).get('updated_volume').setValue(Volume);
            document.getElementById('feeAmount_' + v1).value = AppAmt;
            document.getElementById('feeAmount_' + v1).removeAttribute("disabled");
            if (Volume === 1) {
                document.getElementById('VolumeUpdated_' + v1).value = Volume;
            }
            else {
                document.getElementById('feeVolumeUpdated_' + v1).value = Volume;
            }
            if (document.getElementById('feeVolumeUpdated_' + v1) !== null) {
                document.getElementById('feeAmount_' + v1).removeAttribute("disabled");
                document.getElementById('feeVolumeUpdated_' + v1).removeAttribute("disabled");
            }
            this.cd.detectChanges();
        }
        else {
            this.errorMsg = [];
            document.getElementById('feeAmount_' + v1).setAttribute("disabled", "true");
            this.remissionForm.value.feesList[i]["refund_amount"] = '';
            this.remissionForm.value.feesList[i]["volume"] = '';
            this.remissionForm.value.feesList[i]["selected"] = false;
            document.getElementById('feeAmount_' + v1).value = '';
            if (Volume > 1) {
                this.remissionForm.value.feesList[i]["volume"] = '';
                document.getElementById('feeVolumeUpdated_' + v1).value = '';
            }
            if (document.getElementById('feeVolumeUpdated_' + v1) !== null) {
                document.getElementById('feeVolumeUpdated_' + v1).removeAttribute("disabled");
            }
            this.cd.detectChanges();
        }
    }
    addRemission() {
        this.resetRemissionForm([false, false, false, false, false, false], 'All');
        const remissionctrls = this.remissionForm.controls, isRemissionLessThanFee = this.fee.calculated_amount > remissionctrls.amount.value;
        this.remissionForm.controls['refundReason'].setErrors(null);
        this.remissionForm.controls['refundDDReason'].setErrors(null);
        if (this.remissionForm.dirty && this.remissionForm.valid && isRemissionLessThanFee) {
            this.viewStatus = 'confirmation';
        }
        else {
            if (remissionctrls['remissionCode'].value == '') {
                this.resetRemissionForm([true, false, false, false, false, false], 'remissionCode');
            }
            if (remissionctrls['remissionCode'].value != '' && remissionctrls['remissionCode'].invalid) {
                this.resetRemissionForm([false, true, false, false, false, false], 'remissionCode');
            }
            if (remissionctrls['amount'].value == '') {
                this.resetRemissionForm([false, false, true, false, false, false], 'amount');
            }
            if (remissionctrls['amount'].value != '' && remissionctrls['amount'].invalid) {
                this.resetRemissionForm([false, true, false, true, false, false], 'amount');
            }
            if (remissionctrls.amount.valid && !isRemissionLessThanFee) {
                this.resetRemissionForm([false, false, false, false, true, false], 'amount');
            }
        }
    }
    confirmRemission() {
        this.isConfirmationBtnDisabled = true;
        const newNetAmount = this.remissionForm.controls.amount.value, remissionAmount = this.fee.net_amount - newNetAmount, requestBody = new AddRemissionRequest(this.ccdCaseNumber, this.fee, remissionAmount, this.remissionForm.controls.remissionCode.value, this.caseType);
        this.paymentViewService.postPaymentGroupWithRemissions(decodeURIComponent(this.paymentGroupRef).trim(), this.fee.id, requestBody).subscribe(response => {
            if (JSON.parse(response).success) {
                let LDUrl = this.isTurnOff ? '&isTurnOff=Enable' : '&isTurnOff=Disable';
                LDUrl += `&caseType=${this.caseType}`;
                if (this.paymentLibComponent.bspaymentdcn) {
                    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                    this.router.onSameUrlNavigation = 'reload';
                    this.router.navigateByUrl(`/payment-history/${this.ccdCaseNumber}?view=fee-summary&selectedOption=${this.option}&paymentGroupRef=${this.paymentGroupRef}&dcn=${this.paymentLibComponent.bspaymentdcn}${LDUrl}`);
                }
                else {
                    this.gotoCasetransationPage();
                }
            }
        }, (error) => {
            this.errorMessage = error;
            this.isConfirmationBtnDisabled = false;
        });
    }
    resetRemissionForm(val, field) {
        if (field === 'All') {
            this.isRemissionCodeEmpty = val[0];
            this.remissionCodeHasError = val[1];
            this.isAmountEmpty = val[2];
            this.amountHasError = val[3];
            this.isRemissionLessThanFeeError = val[4];
            this.isReasonEmpty = val[5];
        }
        else if (field === 'remissionCode' || field === 'All') {
            this.isRemissionCodeEmpty = val[0];
            this.remissionCodeHasError = val[1];
        }
        else if (field === 'amount' || field === 'All') {
            this.isAmountEmpty = val[2];
            this.amountHasError = val[3];
            this.isRemissionLessThanFeeError = val[4];
        }
        else if (field === 'reason' || field === 'All') {
            this.isReasonEmpty = val[5];
        }
    }
    // Add retro remission changes
    addRemissionCode() {
        this.errorMessage = false;
        // this.isFromCheckAnsPage = true;
        this.errorMsg = [];
        this.viewStatus = '';
        this.isRefundRemission = false;
        this.resetRemissionForm([false, false, false, false, false, false], 'All');
        const remissionctrls = this.remissionForm.controls;
        // isRemissionLessThanFee = this.fee.calculated_amount >= remissionctrls.amount.value;
        this.remissionForm.controls['refundReason'].setErrors(null);
        this.remissionForm.controls['refundDDReason'].setErrors(null);
        this.remissionForm.controls['amount'].setErrors(null);
        if (this.remissionForm.dirty && this.remissionForm.valid) {
            if (!this.isFromCheckAnsPage) {
                this.viewCompStatus = '';
                this.viewStatus = "processretroremissonpage";
            }
            else {
                this.viewCompStatus = '';
                this.viewStatus = 'checkretroremissionpage';
            }
        }
        else {
            if (remissionctrls['remissionCode'].value == '') {
                this.resetRemissionForm([true, false, false, false, false], 'remissionCode');
            }
            if (remissionctrls['remissionCode'].value != '' && remissionctrls['remissionCode'].invalid) {
                this.resetRemissionForm([false, true, false, false, false], 'remissionCode');
            }
            if (remissionctrls['amount'].value == '') {
                this.resetRemissionForm([false, false, true, false, false], 'amount');
            }
            if (remissionctrls['amount'].value != '' && remissionctrls['amount'].invalid) {
                this.resetRemissionForm([false, true, false, true, false], 'amount');
            }
            if (remissionctrls['reason'].value == '') {
                this.resetRemissionForm([false, false, false, true, false, true], 'reason');
            }
            if (remissionctrls.amount.valid) {
                this.resetRemissionForm([false, false, false, false, true], 'amount');
            }
        }
    }
    gotoAddRetroRemissionCodePage() {
        this.errorMessage = false;
        this.isFromCheckAnsPage = false;
        this.errorMsg = [];
        if (this.isRefundRemission) {
            this.refundListAmount.emit();
            this.paymentLibComponent.isFromRefundStatusPage = true;
            return;
        }
        if (this.isFromRefundListPage) {
            this.paymentLibComponent.iscancelClicked = true;
            this.refundListReason.emit({ reason: this.selectedRefundReason, code: this.refundReason });
            this.paymentLibComponent.isFromRefundStatusPage = true;
            return;
        }
        this.viewStatus = '';
        this.selectedValue = 'yes';
        this.viewCompStatus = "addremission";
        this.isRefundRemission = true;
        this.errorMessage = '';
        this.errorMsg = [];
        if (this.isFromPaymentDetailPage) {
            this.paymentLibComponent.viewName = 'payment-view';
        }
    }
    gotoCheckRetroRemissionPage(payment) {
        this.paymentLibComponent.iscancelClicked = false;
        this.errorMessage = '';
        this.resetRemissionForm([false, false, false, false, false], 'All');
        if (!this.isRefundRemission) {
            var remissionctrls = this.remissionForm.controls, isRemissionLessThanFee = this.fee.calculated_amount >= remissionctrls.amount.value;
            if (this.remissionForm.dirty) {
                if (remissionctrls['amount'].value == '' || remissionctrls['amount'].value < 0) {
                    this.resetRemissionForm([false, false, true, false, false], 'amount');
                }
                else if (remissionctrls['amount'].value != '' && remissionctrls['amount'].invalid) {
                    this.resetRemissionForm([false, false, false, true, false], 'amount');
                }
                else if (remissionctrls.amount.valid && !isRemissionLessThanFee) {
                    this.resetRemissionForm([false, false, false, false, true], 'amount');
                }
                else {
                    this.viewCompStatus = '';
                    this.viewStatus = "checkretroremissionpage";
                }
            }
        }
        else {
            var remissionctrls = this.remissionForm.controls;
            //if (this.remissionForm.dirty ) {
            if (remissionctrls['amount'].value == '' || remissionctrls['amount'].value < 0) {
                this.resetRemissionForm([false, false, true, false, false], 'amount');
            }
            else {
                this.viewCompStatus = '';
                this.viewStatus = "checkretroremissionpage";
                this.refundListAmount.emit(remissionctrls['amount'].value);
            }
            //}
        }
    }
    gotoAmountRetroRemission() {
        this.isFromCheckAnsPage = false;
        this.viewStatus = 'processretroremissonpage';
        this.viewCompStatus = '';
        // this.isRefundRemission = true;
        this.errorMessage = '';
    }
    gotoProcessRetroRemissionPage() {
        this.isFromCheckAnsPage = true;
        this.viewStatus = '';
        this.viewCompStatus = 'addremission';
        this.isRefundRemission = true;
        this.errorMessage = '';
        this.errorMsg = [];
    }
    gotoProcessRetroRemission(note) {
        if (note) {
            this.notification = { contact_details: note, notification_type: note.notification_type };
        }
        this.isFromCheckAnsPage = true;
        this.viewStatus = 'remissionAddressPage';
        this.viewCompStatus = '';
        this.isRefundRemission = true;
        this.errorMessage = '';
    }
    confirmRetroRemission() {
        if (!this.isConfirmationBtnDisabled) {
            this.retroRemission = true;
            this.remissionamt = this.remissionForm.controls.amount.value;
            const requestBody = new AddRetroRemissionRequest(this.remissionamt, this.remissionForm.controls.remissionCode.value);
            this.paymentViewService.postPaymentGroupWithRetroRemissions(decodeURIComponent(this.paymentGroupRef).trim(), this.fee.id, requestBody).subscribe(response => {
                if (JSON.parse(response)) {
                    this.isRemissionApplied = true;
                    this.viewCompStatus = '';
                    this.viewStatus = 'retroremissionconfirmationpage';
                    this.remissionReference = JSON.parse(response).remission_reference;
                }
            }, (error) => {
                this.errorMessage = error;
                this.isConfirmationBtnDisabled = false;
                this.cd.detectChanges();
            });
        }
    }
    processRefund() {
        this.errorMessage = '';
        this.errorMsg = [];
        this.isConfirmationBtnDisabled = true;
        if (this.isRefundRemission) {
            this.retroRemission = true;
        }
        if (this.remissionReference === undefined || this.remissionReference === '') {
            this.remissionReference = this.remission.remission_reference;
        }
        const requestBody = new PostIssueRefundRetroRemission(this.remissionReference, this.contactDetailsObj);
        this.paymentViewService.postRefundRetroRemission(requestBody).subscribe(response => {
            if (JSON.parse(response)) {
                this.viewCompStatus = '';
                this.viewStatus = 'refundconfirmationpage';
                this.refundReference = JSON.parse(response).refund_reference;
                this.refundAmount = JSON.parse(response).refund_amount;
            }
        }, (error) => {
            this.errorMessage = error;
            this.isConfirmationBtnDisabled = false;
        });
    }
    // Issue Refund changes
    gotoIssueRefundConfirmation(payment) {
        this.paymentLibComponent.iscancelClicked = false;
        if (this.paymentLibComponent.REFUNDLIST === "true") {
            this.isFromRefundListPage = true;
        }
        this.totalRefundAmount = this.remissionForm.value.feesList.reduce((a, c) => a + c.refund_amount * c.selected, 0);
        this.errorMessage = '';
        this.errorMsg = [];
        this.refundReason = this.remissionForm.controls['refundReason'].value === null ? this.remissionForm.controls['refundDDReason'].value : this.remissionForm.controls['refundReason'].value;
        if (!this.refundReason || this.refundReason === 'Select a different reason') {
            this.refundHasError = true;
        }
        else if (this.selectedRefundReason.includes('Other') && (this.remissionForm.controls['reason'].value == '' || this.remissionForm.controls['reason'].value == null)) {
            this.resetRemissionForm([false, false, false, true, false, true], 'reason');
        }
        else if (this.selectedRefundReason.includes('Other') && this.remissionForm.controls['reason'].value !== '') {
            this.refundHasError = false;
            this.refundReason += '-' + this.remissionForm.controls['reason'].value;
            this.displayRefundReason = this.selectedRefundReason + '-' + this.remissionForm.controls['reason'].value;
            if (this.isFromRefundListPage) {
                this.refundListReason.emit({ reason: this.displayRefundReason, code: this.refundReason });
            }
            else {
                if (this.isFromCheckAnsPage) {
                    this.totalRefundAmount = this.remissionForm.value.feesList.reduce((a, c) => a + c.refund_amount * c.selected, 0);
                    this.isFromCheckAnsPage = false;
                    this.viewStatus = 'checkissuerefundpage';
                    this.viewCompStatus = '';
                    this.notificationPreview = false;
                    return;
                }
                this.viewCompStatus = '';
                this.viewStatus = 'contactDetailsPage';
            }
        }
        else {
            this.displayRefundReason = this.selectedRefundReason;
            if (this.isFromCheckAnsPage) {
                this.totalRefundAmount = this.remissionForm.value.feesList.reduce((a, c) => a + c.refund_amount * c.selected, 0);
                this.isFromCheckAnsPage = false;
                this.viewStatus = 'checkissuerefundpage';
                this.viewCompStatus = '';
                this.notificationPreview = false;
                return;
            }
            if (this.isFromRefundListPage) {
                this.paymentLibComponent.isFromRefundStatusPage = true;
                this.refundListReason.emit({ reason: this.selectedRefundReason, code: this.refundReason });
            }
            else {
                this.viewCompStatus = '';
                this.viewStatus = 'contactDetailsPage';
            }
        }
    }
    gotoIssueRefundPage() {
        this.errorMessage = '';
        this.viewCompStatus = 'issuerefund';
        this.viewStatus = '';
        this.isRefundRemission = true;
        this.errorMessage = false;
        this.errorMsg = [];
        this.refundHasError = false;
        this.isReasonEmpty = false;
    }
    gotoIssuePage(isFullyRefund) {
        if (isFullyRefund) {
            this.viewCompStatus = 'issuerefundpage1';
            this.getRefundReasons();
        }
        else {
            [].forEach.call(document.querySelectorAll('input'), function (el) {
                el.classList.remove('inline-error-class');
            });
            var checkboxs = document.getElementsByTagName('input');
            this.errorMessage = '';
            this.totalRefundAmount = 0;
            this.errorMsg = [];
            for (var j = 0; j < checkboxs.length; j++) {
                if (checkboxs[j].checked) {
                    this.fullRefund = false;
                    let quantity = +document.getElementById('feeVolume_' + checkboxs[j].value).value;
                    let amountToRefund = +document.getElementById('feeAmount_' + checkboxs[j].value).value;
                    let apportionAmount = +document.getElementById('feeApportionAmount_' + checkboxs[j].value).value;
                    let calculatedAmount = +document.getElementById('calculatedAmount_' + checkboxs[j].value).value;
                    if (amountToRefund === apportionAmount) {
                        this.fullRefund = true;
                    }
                    if (amountToRefund === 0) {
                        this.elementId = 'feeAmount_' + checkboxs[j].value;
                        this.errorMsg.push('You need to enter a refund amount');
                        this.getErrorClass(this.elementId);
                    }
                    if (quantity === 1) {
                        if (amountToRefund > 0 && amountToRefund > apportionAmount) {
                            this.elementId = 'feeAmount_' + checkboxs[j].value;
                            this.errorMsg.push('The amount you want to refund is more than the amount paid');
                            this.getErrorClass(this.elementId);
                        }
                    }
                    if (quantity > 1) {
                        this.quantityUpdated = +document.getElementById('feeVolumeUpdated_' + checkboxs[j].value).value;
                        if (this.quantityUpdated === 0) {
                            this.elementId = 'feeVolumeUpdated_' + checkboxs[j].value;
                            this.errorMsg.push('You need to enter quantity');
                            this.getErrorClass(this.elementId);
                        }
                        if (this.fullRefund && quantity !== this.quantityUpdated) {
                            this.elementId = 'feeVolumeUpdated_' + checkboxs[j].value;
                            this.errorMsg.push('The quantity you want to refund should be maximun available quantity');
                            this.getErrorClass(this.elementId);
                        }
                        if (!this.fullRefund && this.quantityUpdated > 0 && amountToRefund > 0) {
                            this.refundAmtForFeeVolumes = +document.getElementById('feeVOl_' + checkboxs[j].value).innerText;
                            this.allowedRefundAmount = this.quantityUpdated * this.refundAmtForFeeVolumes;
                            if (this.allowedRefundAmount !== amountToRefund) {
                                this.elementId = 'feeAmount_' + checkboxs[j].value;
                                this.errorMsg.push('The Amount to Refund should be equal to the product of Fee Amount and quantity');
                                this.getErrorClass(this.elementId);
                            }
                        }
                        if (!this.fullRefund && amountToRefund > apportionAmount) {
                            this.elementId = 'feeAmount_' + checkboxs[j].value;
                            this.errorMsg.push('The amount you want to refund is more than the amount paid');
                            this.getErrorClass(this.elementId);
                        }
                        if (!this.fullRefund && this.quantityUpdated > 0 && this.quantityUpdated > quantity) {
                            this.elementId = 'feeVolumeUpdated_' + checkboxs[j].value;
                            this.errorMsg.push('The quantity you want to refund is more than the available quantity');
                            this.getErrorClass(this.elementId);
                        }
                    }
                    //this.remissionForm.value.feesList.find(id=>id=checkboxs[j].value)['refund_amount'] = apportionAmount;
                }
            }
            if (this.errorMsg.length === 0) {
                if (this.isFromCheckAnsPage) {
                    this.isFromCheckAnsPage = false;
                    this.totalRefundAmount = this.remissionForm.value.feesList.reduce((a, c) => a + c.refund_amount * c.selected, 0);
                    this.fees = this.remissionForm.value.feesList.filter(value => value.selected === true);
                    this.viewStatus = 'checkissuerefundpage';
                    this.viewCompStatus = '';
                    this.notificationPreview = false;
                    return;
                }
                else if (this.isFromRefundStatusPage) {
                    var remissionctrls = this.remissionForm.controls;
                    this.totalRefundAmount = this.remissionForm.value.feesList.reduce((a, c) => a + c.refund_amount * c.selected, 0);
                    this.refundListAmount.emit(this.totalRefundAmount.toString());
                    this.fees = this.remissionForm.value.feesList.filter(value => value.selected === true);
                    this.refundFees.emit(this.fees);
                    return;
                }
                this.viewCompStatus = 'issuerefundpage1';
                this.getRefundReasons();
            }
        }
    }
    calAmtToRefund(value, amount, volume, i) {
        const volumeFee = amount / volume;
        const amtToRefund = value * volumeFee;
        const formArray = this.remissionForm.controls.feesList;
        formArray.at(i).get('refund_amount').setValue(amtToRefund);
        // formArray.at(i).get('volume').setValue(value);
        //  (<HTMLInputElement>document.getElementById('feeAmount_'+i)).value = +amtToRefund;
        //  const formControl = this.remissionForm.controls.feesList['volume'].at(i);
        //  formControl.setValue(value);
    }
    gotoContactDetailsPage(note) {
        if (note) {
            this.notification = { contact_details: note, notification_type: note.notification_type };
        }
        this.errorMessage = '';
        this.viewCompStatus = '';
        this.viewStatus = 'contactDetailsPage';
        this.isRefundRemission = true;
        this.errorMessage = false;
    }
    getRefundReasons() {
        if (this.viewCompStatus === 'issuerefundpage1') {
            this.refundService.getRefundReasons().subscribe(refundReasons => {
                this.refundReasons = refundReasons.filter((data) => data.recently_used === false);
                this.refundReasons = this.refundReasons.filter((data) => data.name !== 'Retrospective remission');
                this.cd.detectChanges();
                this.commonRefundReasons = refundReasons.filter((data) => data.recently_used === true);
                this.commonRefundReasons.sort((a, b) => a.toString().localeCompare(b));
                this.cd.detectChanges();
            });
        }
    }
    getErrorClass(elementId) {
        if (this.errorMsg.length > 0) {
            const ele = document.getElementById(elementId);
            ele.classList.add('inline-error-class');
        }
    }
    changeIssueRefundReason() {
        this.isFromCheckAnsPage = true;
        this.errorMessage = '';
        this.errorMsg = [];
        this.refundHasError = false;
        this.isReasonEmpty = false;
        this.viewCompStatus = 'issuerefundpage1';
        this.viewStatus = '';
        this.isRefundRemission = true;
    }
    confirmIssueRefund(isFullyRefund) {
        this.isConfirmationBtnDisabled = true;
        this.errorMessage = '';
        this.errorMsg = [];
        if (this.isRefundRemission) {
            this.retroRemission = true;
        }
        if (isFullyRefund) {
            this.totalRefundAmount = this.payment.amount;
        }
        if (!isFullyRefund) {
            this.fees = this.remissionForm.value.feesList.filter(value => value.selected === true);
        }
        this.fees = this.fees.map(obj => ({ id: obj.id,
            code: obj.code,
            version: obj.version,
            apportion_amount: obj.apportion_amount,
            calculated_amount: obj.calculated_amount,
            updated_volume: obj.updated_volume ? obj.updated_volume : obj.volume,
            refund_amount: obj.refund_amount ? obj.refund_amount : this.totalRefundAmount }));
        const requestBody = new PostRefundRetroRemission(this.contactDetailsObj, this.fees, this.payment.reference, this.refundReason, this.totalRefundAmount, 'op');
        this.paymentViewService.postRefundsReason(requestBody).subscribe(response => {
            if (JSON.parse(response)) {
                this.viewCompStatus = '';
                this.viewStatus = 'refundconfirmationpage';
                this.refundReference = JSON.parse(response).refund_reference;
                if (JSON.parse(response).refund_amount) {
                    this.refundAmount = JSON.parse(response).refund_amount;
                }
            }
        }, (error) => {
            this.errorMessage = error;
            this.isConfirmationBtnDisabled = false;
            this.cd.detectChanges();
        });
    }
    gotoRefundReasonPage() {
        this.viewStatus = '';
        this.viewCompStatus = 'issuerefundpage1';
    }
    // Retro Refund
    // confirmRetroRefund() {
    //   this.isConfirmationBtnDisabled = true;
    //   this.errorMessage = '';
    //   this.errorMsg = [];
    //   if( this.isRefundRemission) {
    //     this.retroRemission = true;
    //   }
    //   const requestBody = new PostRefundRetroRemission(this.payment.reference,'RR004-Retrospective remission', this.contactDetailsObj);
    //   this.paymentViewService.postRefundsReason(requestBody).subscribe(
    //     response => {
    //         if (JSON.parse(response)) {
    //           this.viewCompStatus  = '';
    //           this.viewStatus = 'retrorefundconfirmationpage';
    //           this.refundReference =JSON.parse(response).refund_reference;
    //           if(JSON.parse(response).refund_amount) {
    //             this.refundAmount = JSON.parse(response).refund_amount;
    //             }
    //         }
    //     },
    //     (error: any) => {
    //       this.errorMessage = error;
    //       this.isConfirmationBtnDisabled = false;
    //     });
    // }
    selectRadioButton(key, value) {
        localStorage.setItem("myradio", value);
        const remissionctrls = this.remissionForm.controls;
        remissionctrls['refundDDReason'].setValue('Select a different reason', { onlySelf: true });
        remissionctrls['reason'].reset();
        this.isRefundReasonsSelected = true;
        this.errorMessage = false;
        this.errorMsg = [];
        this.isReasonEmpty = false;
        this.showReasonText = false;
        this.refundHasError = false;
        this.selectedRefundReason = value;
        this.selectedRefundReasonCode = key;
        if (this.selectedRefundReason.includes('Other')) {
            this.showReasonText = true;
            this.refundHasError = false;
            this.refundReason = value;
        }
    }
    selectchange(args) {
        const remissionctrls = this.remissionForm.controls;
        remissionctrls['refundReason'].reset();
        remissionctrls['reason'].reset();
        this.isRefundReasonsSelected = false;
        this.showReasonText = false;
        this.refundHasError = false;
        this.selectedRefundReason = args.target.options[args.target.options.selectedIndex].id;
        this.selectedRefundReasonCode = args.target.options[args.target.options.selectedIndex].value;
        this.reasonLength = (29 - this.selectedRefundReason.split('- ')[1].length);
        if (this.selectedRefundReason.includes('Other')) {
            this.showReasonText = true;
            this.refundHasError = false;
            this.refundReason = args.target.options[args.target.options.selectedIndex].id;
        }
    }
    getContactDetails(obj, type) {
        this.contactDetailsObj = obj;
        this.viewCompStatus = '';
        this.notificationPreview = false;
        if (type == 'checkaddRefundpage') {
            this.getTemplateInstructionType(this.remessionPayment.reference, this.remessionPayment);
        }
        else if (type == 'checkissuerefundpage') {
            this.getTemplateInstructionType(this.payment.reference, this.payment);
        }
        else if (type == 'addrefundcheckandanswer') {
            this.getTemplateInstructionType(this.paymentReference, this.paymentObj);
        }
        this.viewStatus = type;
    }
    gotoPartialFeeRefundScreen() {
        if (this.isFromRefundStatusPage) {
            var remissionctrls = this.remissionForm.controls;
            this.refundListReason.emit({ reason: this.displayRefundReason, code: this.refundReason });
            return;
        }
        this.refundHasError = false;
        this.viewCompStatus = 'issuerefund';
        this.viewStatus = '';
    }
    gotoServiceRequestPage(event) {
        this.errorMessage = '';
        this.errorMsg = [];
        this.isFromCheckAnsPage = false;
        event.preventDefault();
        if (this.isFromRefundStatusPage) {
            var remissionctrls = this.remissionForm.controls;
            this.totalRefundAmount = 0;
            this.refundListAmount.emit(this.totalRefundAmount.toString());
            return;
        }
        if (this.isFromServiceRequestPage && !this.isFromPaymentDetailPage) {
            this.viewStatus = 'order-full-view';
            this.viewCompStatus = '';
        }
        else if (this.isFromRefundListPage) {
            this.paymentLibComponent.iscancelClicked = true;
            this.refundListReason.emit({ reason: this.selectedRefundReason, code: this.refundReason });
            this.paymentLibComponent.isFromRefundStatusPage = true;
        }
        else {
            this.paymentLibComponent.paymentMethod = this.payment.method;
            this.paymentLibComponent.paymentGroupReference = this.paymentLibComponent.paymentGroupReference;
            this.paymentLibComponent.paymentReference = this.payment.reference;
            this.paymentLibComponent.viewName = 'payment-view';
            this.OrderslistService.setOrderRef(this.orderRef);
            this.OrderslistService.setorderCCDEvent(this.orderCCDEvent);
            this.OrderslistService.setorderCreated(this.orderCreated);
            this.OrderslistService.setorderDetail(this.orderDetail);
            this.OrderslistService.setorderParty(this.orderParty);
            this.OrderslistService.setorderTotalPayments(this.orderTotalPayments);
            this.OrderslistService.setorderRemissionTotal(this.orderRemissionTotal);
            this.OrderslistService.setorderFeesTotal(this.orderFeesTotal);
            this.viewStatus = 'payment-view';
            this.sendOrderDetail = this.orderDetail;
            this.sendOrderRef = this.orderRef;
            if (this.LOGGEDINUSERROLES === undefined) {
                this.OrderslistService.getUserRolesList().subscribe((data) => this.LOGGEDINUSERROLES = data);
            }
            this.viewCompStatus = '';
        }
    }
    gotoAddressPage(note) {
        if (note) {
            this.notification = { contact_details: note, notification_type: note.notification_type };
        }
        this.errorMessage = '';
        this.viewCompStatus = 'addrefundforremission';
        this.viewStatus = '';
        this.isRefundRemission = true;
        this.errorMessage = false;
    }
    gotoRemissionSuccess(event) {
        event.preventDefault();
        this.errorMessage = '';
        this.viewCompStatus = '';
        this.viewStatus = 'retroremissionconfirmationpage';
        this.isRefundRemission = true;
        this.errorMessage = false;
    }
    gotoCasetransationPage() {
        this.OrderslistService.setnavigationPage('casetransactions');
        this.errorMessage = '';
        this.errorMsg = [];
        this.paymentLibComponent.viewName = 'case-transactions';
        this.paymentLibComponent.VIEW = 'case-transactions';
        this.paymentLibComponent.ISTURNOFF = this.isTurnOff;
        this.paymentLibComponent.isFromServiceRequestPage = true;
        this.resetOrderData();
        let partUrl = this.bsPaymentDcnNumber ? `&dcn=${this.bsPaymentDcnNumber}` : '';
        partUrl += this.paymentLibComponent.ISBSENABLE ? '&isBulkScanning=Enable' : '&isBulkScanning=Disable';
        partUrl += this.paymentLibComponent.ISTURNOFF ? '&isTurnOff=Enable' : '&isTurnOff=Disable';
        partUrl += this.isStrategicFixEnable ? '&isStFixEnable=Enable' : '&isStFixEnable=Disable';
        partUrl += `&caseType=${this.caseType}`;
        const url = `/payment-history/${this.ccdCaseNumber}?view=case-transactions&takePayment=${this.paymentLibComponent.TAKEPAYMENT}&selectedOption=${this.option}${partUrl}`;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl(url);
    }
    gotoCasetransationPageCancelBtnClicked(event) {
        event.preventDefault();
        this.errorMsg = [];
        if (this.paymentLibComponent.isFromServiceRequestPage !== undefined && !this.paymentLibComponent.isFromServiceRequestPage) {
            this.OrderslistService.setnavigationPage('casetransactions');
            this.OrderslistService.setisFromServiceRequestPage(false);
            this.paymentLibComponent.VIEW = 'case-transactions';
            this.paymentLibComponent.viewName = 'case-transactions';
            this.paymentLibComponent.ISBSENABLE = true;
            this.paymentLibComponent.isRefundStatusView = false;
        }
        else {
            if (this.paymentLibComponent.REFUNDLIST) {
                this.paymentLibComponent.viewName = 'refund-list';
                return;
            }
            if (this.paymentLibComponent.TAKEPAYMENT === undefined && this.paymentLibComponent.SERVICEREQUEST === undefined) {
                this.paymentLibComponent.SERVICEREQUEST = 'false';
            }
            this.OrderslistService.setisFromServiceRequestPage(false);
            this.OrderslistService.setpaymentPageView({ method: '', payment_group_reference: '', reference: '' });
            this.OrderslistService.setnavigationPage('casetransactions');
            this.errorMessage = '';
            this.paymentLibComponent.viewName = 'case-transactions';
            this.paymentLibComponent.ISTURNOFF = this.isTurnOff;
            this.paymentLibComponent.isFromServiceRequestPage = true;
            this.paymentLibComponent.ISBSENABLE = true;
            let partUrl = this.bsPaymentDcnNumber ? `&dcn=${this.bsPaymentDcnNumber}` : '';
            partUrl += this.paymentLibComponent.ISBSENABLE ? '&isBulkScanning=Enable' : '&isBulkScanning=Disable';
            partUrl += this.paymentLibComponent.ISTURNOFF ? '&isTurnOff=Enable' : '&isTurnOff=Disable';
            partUrl += this.isStrategicFixEnable ? '&isStFixEnable=Enable' : '&isStFixEnable=Disable';
            partUrl += `&caseType=${this.caseType}`;
            if (this.isFromPaymentDetailPage) {
                partUrl += this.paymentLibComponent.isFromPaymentDetailPage;
            }
            if (!this.paymentLibComponent.SERVICEREQUEST) {
                const url = `/payment-history/${this.ccdCaseNumber}?view=case-transactions&takePayment=${this.paymentLibComponent.TAKEPAYMENT}&selectedOption=${this.option}${partUrl}`;
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigateByUrl(url);
            }
            else {
                const url = `/payment-history/${this.ccdCaseNumber}?selectedOption=${this.option}${partUrl}`;
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigateByUrl(url);
            }
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
    changeRefundAmount() {
        this.isFromCheckAnsPage = true;
        this.viewCompStatus = 'issuerefund';
        this.viewStatus = '';
    }
    getFormattedCurrency(currency) {
        if (currency.toString().includes(".")) {
            return currency;
        }
        return currency.toString().concat(".00");
    }
    showNotificationPreview() {
        this.notificationPreview = true;
    }
    hideNotificationPreview() {
        this.notificationPreview = false;
    }
    getTemplateInstructionType(paymentReference, payment) {
        if (payment == undefined || payment == null || payment.reference != paymentReference) {
            this.paymentViewService.getPaymentDetails(paymentReference).subscribe(payment => {
                this.paymentObj = payment;
                this.paymentObj.reference = paymentReference;
                this.templateInstructionType = this.notificationService.getNotificationInstructionType(this.paymentObj.channel, this.paymentObj.method);
            }, (error) => {
                this.templateInstructionType = 'Template';
            });
        }
        else {
            this.templateInstructionType = this.notificationService.getNotificationInstructionType(payment.channel, payment.method);
        }
    }
    static ɵfac = function AddRemissionComponent_Factory(t) { return new (t || AddRemissionComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.PaymentViewService), i0.ɵɵdirectiveInject(i4.NotificationService), i0.ɵɵdirectiveInject(i5.PaymentLibComponent), i0.ɵɵdirectiveInject(i6.RefundsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i7.OrderslistService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AddRemissionComponent, selectors: [["ccpay-add-remission"]], inputs: { fee: "fee", fees: "fees", payment: "payment", remission: "remission", ccdCaseNumber: "ccdCaseNumber", caseType: "caseType", viewCompStatus: "viewCompStatus", paymentGroupRef: "paymentGroupRef", isTurnOff: "isTurnOff", isRefundRemission: "isRefundRemission", isStrategicFixEnable: "isStrategicFixEnable", paidAmount: "paidAmount", isFromRefundListPage: "isFromRefundListPage", isFromPaymentDetailPage: "isFromPaymentDetailPage", isFromServiceRequestPage: "isFromServiceRequestPage", isFullyRefund: "isFullyRefund", feeamount: "feeamount", refundPaymentReference: "refundPaymentReference", isFromRefundStatusPage: "isFromRefundStatusPage", changeRefundReason: "changeRefundReason", isServiceRequest: "isServiceRequest", LOGGEDINUSERROLES: "LOGGEDINUSERROLES", orderDetail: "orderDetail", orderRef: "orderRef", orderStatus: "orderStatus", orderParty: "orderParty", orderCreated: "orderCreated", orderCCDEvent: "orderCCDEvent", takePayment: ["takepayment", "takePayment"], orderFeesTotal: "orderFeesTotal", orderTotalPayments: "orderTotalPayments", orderRemissionTotal: "orderRemissionTotal" }, outputs: { cancelRemission: "cancelRemission", refundListReason: "refundListReason", refundListAmount: "refundListAmount", refundFees: "refundFees" }, decls: 21, vars: 20, consts: [[1, "add-remission", "pagesize"], [4, "ngIf"], ["role", "group", "aria-labelledby", "failure-error-summary-heading", "tabindex", "-1", 1, "error-summary"], ["id", "failure-error-summary-heading", 1, "heading-medium", "error-summary-heading"], [1, "govuk-error-summary__body"], ["class", "govuk-error-summary__body", 4, "ngFor", "ngForOf"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "ADDREMISSION"], ["myInput", ""], [1, "heading-large"], ["novalidate", ""], [1, "govuk-form-group"], ["novalidate", "", 3, "formGroup"], ["for", "remission-code", 1, "govuk-label", "govuk-label--s"], [1, "form-hint"], ["id", "remissionCode", "aria-label", "remissionCode", "name", "remissionCode", "type", "text", "formControlName", "remissionCode", 1, "govuk-input", "govuk-input--width-20", "govuk-!-margin-right-1", 3, "ngClass"], ["class", "inline-error-message", 4, "ngIf"], ["for", "amount", 1, "govuk-label", "govuk-label--s"], ["id", "amount-currency", 1, "govuk-visually-hidden"], [1, "hmcts-currency-input"], ["aria-hidden", "true", 1, "hmcts-currency-input__symbol"], ["id", "amount", "aria-label", "amount", "name", "amount", "type", "text", "aria-describedby", "amount-currency", "formControlName", "amount", 1, "govuk-input", "govuk-input--width-10", 3, "ngClass"], ["type", "submit", 1, "button", 3, "click"], [1, "inline-error-message"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "ADDREMISSIONCONFIRMATION"], [1, "govuk-warning-text"], ["aria-hidden", "true", 1, "govuk-warning-text__icon"], [1, "govuk-warning-text__text"], [1, "govuk-warning-text__assistive"], [1, "govuk-table"], [1, "govuk-table__row"], [1, "govuk-table__cell", "govuk-!-font-weight-bold"], [1, "govuk-table__cell"], ["type", "submit", 1, "button", "govuk-button--secondary", 3, "click"], ["type", "submit", 3, "disabled", "ngClass", "click"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "PROCESSADDRETROREMISSIONPAGE"], [1, "heading-medium"], [1, "govuk-button-group"], [1, "govuk-button", "govuk-button--secondary", 3, "click"], [1, "govuk-button", 3, "click"], ["href", "javascript:void(0)", "data-module", "govuk-button", 1, "govuk-link", "pointer", 3, "click"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "PROCESSRETROREMISSIONPAGE"], [1, "govuk-fieldset"], [1, "govuk-fieldset__legend", "govuk-fieldset__legend--m"], ["class", "heading-medium", 4, "ngIf"], ["id", "amount", "aria-label", "amount", "name", "amount", "type", "number", "aria-describedby", "amount-currency", "formControlName", "amount", 1, "govuk-input", "govuk-input--width-10", 3, "ngClass"], ["href", "javascript:void(0)", "data-module", "govuk-button", 1, "govuk-link", 3, "click"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "CHECKRETROREMISSIONCONFIRMATION"], [1, "govuk-link", "right", 3, "click"], ["class", "govuk-table__cell govuk-!-font-weight-bold", 4, "ngIf"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "RETROREMISSIONCONFIRMATIONPAGE"], [1, "govuk-grid-row"], [1, "govuk-panel", "govuk-panel-border--confirmation"], [1, "govuk-panel__title"], ["class", "govuk-panel__body", 4, "ngIf"], [1, "govuk-body"], [1, "govuk-panel__body"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "ADDRESSDETAILSRETROREMISSIONPAGE"], [1, "govuk-heading-l"], [1, "govuk-heading-m", "govuk-font19px"], [3, "addressObj", "assignContactDetails", "redirectToIssueRefund"], ["data-module", "govuk-button", 1, "govuk-link", 3, "click"], [1, "govuk-table__cell", "whitespace-inherit"], ["class", "contactDetails-width", 4, "ngIf"], ["href", "Javascript:void(0)", "class", "govuk-link right", 3, "click", 4, "ngIf"], [3, "payment", "contactDetails", "refundReason", "refundAmount", 4, "ngIf"], [1, "contactDetails-width"], ["href", "Javascript:void(0)", 1, "govuk-link", "right", 3, "click"], [3, "payment", "contactDetails", "refundReason", "refundAmount"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "RETROREMISSIONREFUNDCONFIRMATIONPAGE"], [1, "govuk-panel", "govuk-panel--confirmation"], [1, "govuk-body", "white"], ["id", "how-contacted-conditional-hint", 1, "form-hint", "govuk-font19px"], [1, "heading-small"], [1, "govuk-table__head"], ["scope", "col", 1, "govuk-table__header", "col-1"], ["scope", "col", 1, "govuk-table__header", "col-18"], ["scope", "col", 1, "govuk-table__header", "col-6"], ["scope", "col", 1, "govuk-table__header", "col-8"], ["scope", "col", 1, "govuk-table__header"], ["class", "govuk-table__body", 4, "ngIf"], ["draggable", "false", "class", "govuk-button govuk-button--secondary", "data-module", "govuk-button", 3, "click", 4, "ngIf"], [1, "govuk-button", 3, "disabled", "click"], [1, "govuk-table__body"], ["class", "govuk-table__row", "formArrayName", "feesList", 4, "ngFor", "ngForOf"], ["formArrayName", "feesList", 1, "govuk-table__row"], ["data-module", "govuk-checkboxes", 1, "govuk-checkboxes", "govuk-checkboxes--large", 3, "formGroupName"], [1, "govuk-checkboxes__item"], ["name", "organisation", "type", "checkbox", "formControlName", "selected", 1, "govuk-checkboxes__input", 3, "id", "value", "click"], [1, "govuk-label", "govuk-checkboxes__label", 3, "for"], [2, "display", "none"], [1, "govuk-table__cell", "whitespace-inherit", "left"], ["type", "hidden", 2, "display", "none", "background-color", "white", 3, "id"], ["class", "govuk-table__cell  whitespace-inherit left", 4, "ngIf"], ["scope", "row", 1, "govuk-table__cell", "whitespace-inherit", "center"], [1, "hmcts-currency-input", 3, "formGroupName"], ["disabled", "disabled", "type", "text", "aria-describedby", "amount-currency ", "pattern", "[0-9]*", "formControlName", "refund_amount", 1, "govuk-input", "govuk-input--width-10", 3, "id", "name"], ["type", "hidden", "formControlName", "volume", 3, "id", "name", "value"], ["type", "hidden", "formControlName", "apportion_amount", 3, "id", "name", "value"], ["type", "hidden", "formControlName", "calculated_amount", 3, "id", "name", "value"], [3, "formGroupName"], ["disabled", "disabled", "formControlName", "updated_volume", "type", "text", 1, "govuk-input", "govuk-input--width-4", "center", 3, "id", "value", "name", "keyup"], ["disabled", "disabled", "type", "text", 1, "govuk-input", "govuk-input--width-4", "center", 3, "id", "name", "value"], ["class", "govuk-table__row", 4, "ngFor", "ngForOf"], ["data-module", "govuk-checkboxes", 1, "govuk-checkboxes", "govuk-checkboxes--large"], ["name", "organisation", "type", "checkbox", "disabled", "disabled", 1, "govuk-checkboxes__input", 3, "id", "value", "checked"], ["disabled", "disabled", "type", "text", 1, "govuk-input", "govuk-input--width-4", "center", 3, "id", "value", "name"], ["disabled", "disabled", "type", "text", "aria-describedby", "amount-currency ", "pattern", "[0-9]*", 1, "govuk-input", "govuk-input--width-10", 3, "id", "name", "value"], ["colspan", "6", 1, "govuk-table__cell"], ["draggable", "false", "data-module", "govuk-button", 1, "govuk-button", "govuk-button--secondary", 3, "click"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "ISSUEREFUNDPAGE"], ["id", "how-contacted-conditional-hint govuk-font19px", "class", "form-hint", 4, "ngIf"], ["aria-describedby", "how-contacted-conditional-hint", 1, "govuk-fieldset"], ["data-module", "govuk-radios", 3, "ngClass"], [1, "container-fluid"], [1, "row"], ["class", "govuk-radios__item col-md-4", 4, "ngFor", "ngForOf"], ["formControlName", "refundDDReason", "id", "sort", 1, "govuk-select", 3, "change"], ["selected", "selected", 3, "defaultSelected", "value"], [3, "id", "value", 4, "ngFor", "ngForOf"], ["class", "govuk-radios__conditional", 4, "ngIf"], ["id", "how-contacted-conditional-hint govuk-font19px", 1, "form-hint"], [1, "govuk-radios__item", "col-md-4"], ["name", "refundReason", "type", "radio", "formControlName", "refundReason", 1, "govuk-radios__input", 3, "id", "value", "change"], ["for", "how-contacted-conditional", 1, "govuk-label--s", "govuk-radios__label", "govuk-font__custom"], [1, "govuk-radios__conditional"], [1, "govuk-label", "govuk-label--m", 3, "for"], [3, "ngClass"], ["id", "reason", "aria-label", "reason", "name", "reason", "type", "text", "aria-describedby", "reason", "maxlength", "30", "formControlName", "reason", 1, "govuk-input", "govuk-input--width-10", 3, "ngClass"], [3, "id", "value"], ["for", "amount", 1, "govuk-label", "govuk-label--m"], ["id", "reason", "aria-label", "reason", "name", "reason", "type", "text", "aria-describedby", "reason", "formControlName", "reason", 1, "govuk-input", "govuk-input--width-10", 3, "ngClass", "maxlength"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "CAPTUREADDRESSDETAILSPAGE"], ["id", "how-contacted-conditional-hint", 1, "govuk-hint", "govuk-font19px"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "CHECKISSUEREFUNDPAGE"], ["class", "govuk-table__row", 4, "ngIf"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "ADDREFUNDFORREMISSION"], [3, "contactDetails", "paymentReference", "payment", "refundReason", "refundAmount", 4, "ngIf"], [3, "contactDetails", "paymentReference", "payment", "refundReason", "refundAmount"], [3, "viewStatus", "orderRef", "isServiceRequest", "orderStatus", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "LOGGEDINUSERROLES", "takePayment", "ccdCaseNumber", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal"], [3, "LOGGEDINUSERROLES", "isTurnOff", "isTakePayment", "caseType", "isServiceRequest", "orderRef", "orderStatus", "orderCreated", "orderParty", "orderCCDEvent", "orderDetail", "orderFeesTotal", "orderTotalPayments", "orderRemissionTotal"]], template: function AddRemissionComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, AddRemissionComponent_div_1_Template, 6, 1, "div", 1);
            i0.ɵɵtemplate(2, AddRemissionComponent_div_2_Template, 5, 1, "div", 1);
            i0.ɵɵtemplate(3, AddRemissionComponent_ng_container_3_Template, 27, 11, "ng-container", 1);
            i0.ɵɵtemplate(4, AddRemissionComponent_ng_container_4_Template, 36, 11, "ng-container", 1);
            i0.ɵɵtemplate(5, AddRemissionComponent_ng_container_5_Template, 27, 8, "ng-container", 1);
            i0.ɵɵtemplate(6, AddRemissionComponent_ng_container_6_Template, 32, 11, "ng-container", 1);
            i0.ɵɵtemplate(7, AddRemissionComponent_ng_container_7_Template, 56, 27, "ng-container", 1);
            i0.ɵɵtemplate(8, AddRemissionComponent_ng_container_8_Template, 13, 2, "ng-container", 1);
            i0.ɵɵtemplate(9, AddRemissionComponent_ng_container_9_Template, 12, 4, "ng-container", 1);
            i0.ɵɵtemplate(10, AddRemissionComponent_ng_container_10_Template, 68, 34, "ng-container", 1);
            i0.ɵɵtemplate(11, AddRemissionComponent_ng_container_11_Template, 16, 2, "ng-container", 1);
            i0.ɵɵtemplate(12, AddRemissionComponent_ng_container_12_Template, 40, 11, "ng-container", 1);
            i0.ɵɵtemplate(13, AddRemissionComponent_ng_container_13_Template, 38, 14, "ng-container", 1);
            i0.ɵɵtemplate(14, AddRemissionComponent_ng_container_14_Template, 14, 5, "ng-container", 1);
            i0.ɵɵtemplate(15, AddRemissionComponent_ng_container_15_Template, 56, 19, "ng-container", 1);
            i0.ɵɵtemplate(16, AddRemissionComponent_ng_container_16_Template, 14, 5, "ng-container", 1);
            i0.ɵɵtemplate(17, AddRemissionComponent_ng_container_17_Template, 63, 23, "ng-container", 1);
            i0.ɵɵtemplate(18, AddRemissionComponent_ng_container_18_Template, 14, 2, "ng-container", 1);
            i0.ɵɵtemplate(19, AddRemissionComponent_ng_container_19_Template, 2, 14, "ng-container", 1);
            i0.ɵɵtemplate(20, AddRemissionComponent_ng_container_20_Template, 2, 14, "ng-container", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.errorMsg.length > 0);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "main" && !ctx.isRefundRemission);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "confirmation");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewCompStatus === "addremission");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "processretroremissonpage");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "checkretroremissionpage");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "retroremissionconfirmationpage");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "remissionAddressPage");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "checkaddRefundpage");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "refundconfirmationpage");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewCompStatus === "issuerefund" && ctx.isRefundRemission);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewCompStatus === "issuerefundpage1" && ctx.isRefundRemission);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "contactDetailsPage");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "checkissuerefundpage");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewCompStatus === "addrefundforremission");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "addrefundcheckandanswer");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "retrorefundconfirmationpage");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "order-full-view");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "payment-view");
        } }, styles: [".add-remission[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{margin:20px 2px;padding:.5em;font-size:19px;font-weight:200}.add-remission[_ngcontent-%COMP%]   td.govuk-table__cell[_ngcontent-%COMP%]{width:50%}.add-remission[_ngcontent-%COMP%]   .govuk-button--secondary[_ngcontent-%COMP%]{background-color:#dee0e2;box-shadow:0 2px #858688;color:#0b0c0c;margin-right:.5em}.add-remission[_ngcontent-%COMP%]   .govuk-warning-text__text[_ngcontent-%COMP%], .add-remission[_ngcontent-%COMP%]   .govuk-label--s[_ngcontent-%COMP%], .add-remission[_ngcontent-%COMP%]   .hmcts-currency-input__symbol[_ngcontent-%COMP%]{font-size:19px;font-weight:400}.add-remission[_ngcontent-%COMP%]   .inline-error-class[_ngcontent-%COMP%]{outline:3px solid #a71414;outline-offset:0;border-color:#a71414}.add-remission[_ngcontent-%COMP%]   .inline-error-message[_ngcontent-%COMP%]{color:#a71414;border-color:#a71414;font-weight:700;margin-top:10px;font-size:20px}.add-remission[_ngcontent-%COMP%]   .govuk-button[_ngcontent-%COMP%], .add-remission[_ngcontent-%COMP%]   .govuk-link[_ngcontent-%COMP%]{margin-right:1em;font-size:19px;font-weight:200}.add-remission[_ngcontent-%COMP%]   .govuk-button-group[_ngcontent-%COMP%]{padding-top:2em}.add-remission[_ngcontent-%COMP%]   .heading-medium[_ngcontent-%COMP%]{margin-top:.875em}.add-remission[_ngcontent-%COMP%]   .heading-large[_ngcontent-%COMP%]{margin-top:.25em}.add-remission[_ngcontent-%COMP%]   .govuk-panel--confirmation[_ngcontent-%COMP%]{color:#fff;background:#00703C}.add-remission[_ngcontent-%COMP%]   .govuk-panel__title[_ngcontent-%COMP%]{font-size:5rem}.add-remission[_ngcontent-%COMP%]   .govuk-body-m[_ngcontent-%COMP%], .add-remission[_ngcontent-%COMP%]   .govuk-body[_ngcontent-%COMP%]{font-size:2.1875rem}.add-remission[_ngcontent-%COMP%]   .govuk-radios__item[_ngcontent-%COMP%]{clear:initial!important;display:inline-block;width:45%!important}.add-remission[_ngcontent-%COMP%]   .govuk-radios__conditional[_ngcontent-%COMP%]{padding-top:12px!important}.add-remission[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]{float:right;cursor:pointer}.add-remission[_ngcontent-%COMP%]   .radio[_ngcontent-%COMP%]{float:right}.govuk-input[_ngcontent-%COMP%], .govuk-font19px[_ngcontent-%COMP%]{font-size:19px}.govuk-select[_ngcontent-%COMP%]{font-size:19px;font-weight:400}.govuk-input--width-10[_ngcontent-%COMP%]{max-width:50ex}.govuk-label--m[_ngcontent-%COMP%]{font-size:19px;font-weight:400}.govuk-error-summary__body[_ngcontent-%COMP%]{font-size:19px!important}.govuk-error-summary__title[_ngcontent-%COMP%]{font-size:24px!important}.white[_ngcontent-%COMP%]{color:#fff}.pagesize[_ngcontent-%COMP%]{margin:2em;width:97%}.pointer[_ngcontent-%COMP%]{cursor:pointer}.col-18[_ngcontent-%COMP%]{min-width:18em}.col-6[_ngcontent-%COMP%]{min-width:6em}.col-8[_ngcontent-%COMP%]{min-width:8em}.col-1[_ngcontent-%COMP%]{min-width:1em}.col-25[_ngcontent-%COMP%]{width:25%!important}.col-24[_ngcontent-%COMP%]{width:24%!important}.left[_ngcontent-%COMP%]{text-align:left}.center[_ngcontent-%COMP%]{text-align:center}.col-60[_ngcontent-%COMP%]{width:60%;text-align:left}.margin-top--size[_ngcontent-%COMP%]{margin-top:-30px}.contactDetails-width[_ngcontent-%COMP%]{width:70%}.right[_ngcontent-%COMP%]{cursor:pointer}.form-hint[_ngcontent-%COMP%]{font-size:19px!important}.govuk-panel-border--confirmation[_ngcontent-%COMP%]{color:#0b0c0c;border:5px solid #00703C}.whitespace-inherit[_ngcontent-%COMP%]{white-space:inherit!important}.govuk-link[_ngcontent-%COMP%]{cursor:pointer}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddRemissionComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-add-remission', template: "<div class=\"add-remission pagesize\">\n  <div *ngIf=\"errorMessage\">\n    <div class=\"error-summary\" role=\"group\" aria-labelledby=\"failure-error-summary-heading\" tabindex=\"-1\">\n      <h2 class=\"heading-medium error-summary-heading\" id=\"failure-error-summary-heading\">\n        Error in processing the request\n      </h2>\n      <div  class=\"govuk-error-summary__body\">\n        {{ errorMessage }}\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"errorMsg.length > 0\">\n    <div class=\"error-summary\" role=\"group\" aria-labelledby=\"failure-error-summary-heading\" tabindex=\"-1\">\n      <h2 class=\"heading-medium error-summary-heading\" id=\"failure-error-summary-heading\">\n        Error in processing the request\n      </h2>\n      <div *ngFor=\"let err of errorMsg; let i = index\" class=\"govuk-error-summary__body\">\n       \n        <li>{{err}}</li>\n      </div>\n    </div>\n  </div>\n\n<ng-container *ngIf=\"viewStatus === 'main' && !isRefundRemission \">\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='ADDREMISSION'>\n    <h1 class=\"heading-large\">Add remission </h1>\n    <form novalidate>\n      <div class=\"govuk-form-group\">\n        <form [formGroup]=\"remissionForm\" novalidate>\n          <div class=\"govuk-form-group\">\n            <label class=\"govuk-label govuk-label--s\" for=\"remission-code\">\n                Add remission to {{ fee?.code }}: {{ fee?.description }}\n              <span class=\"form-hint\">Enter remission for reference. For example: HWF-A1B-23C OR PA21-123456</span>\n            </label>\n            <input [ngClass]=\"{'inline-error-class': isRemissionCodeEmpty || remissionCodeHasError}\" class=\"govuk-input govuk-input--width-20 govuk-!-margin-right-1\" id=\"remissionCode\" aria-label=\"remissionCode\"  name=\"remissionCode\" type=\"text\" formControlName=\"remissionCode\">\n            <p class=\"inline-error-message\" *ngIf=\"isRemissionCodeEmpty || remissionCodeHasError\">\n              <span *ngIf=\"isRemissionCodeEmpty\">Enter a remission code</span>\n              <span *ngIf=\"remissionCodeHasError\">Enter a vaild remission code</span>\n            </p>\n          </div>\n          <div class=\"govuk-form-group\">\n            <label class=\"govuk-label govuk-label--s\" for=\"amount\">\n              How much does the applicant need to pay?\n            </label>\n\n            <div id=\"amount-currency\" class=\"govuk-visually-hidden\">in pounds</div>\n              <div class=\"hmcts-currency-input\">\n              <div class=\"hmcts-currency-input__symbol\" aria-hidden=\"true\">\u00A3</div>\n              <input class=\"govuk-input govuk-input--width-10\" [ngClass]=\"{'inline-error-class': isAmountEmpty || amountHasError || isRemissionLessThanFeeError}\" id=\"amount\" aria-label=\"amount\"  name=\"amount\" type=\"text\" aria-describedby=\"amount-currency\" formControlName=\"amount\">\n              <p class=\"inline-error-message\" *ngIf=\"isAmountEmpty || amountHasError || isRemissionLessThanFeeError\">\n                <span *ngIf=\"isAmountEmpty\">Enter a amount</span>\n                <span *ngIf=\"amountHasError\">Enter a vaild amount</span>\n                <span *ngIf=\"isRemissionLessThanFeeError\">The remission amount must be less than the total fee</span>\n              </p>\n            </div>\n          </div>\n        </form>\n        <button class=\"button\" type=\"submit\" (click)=\"addRemission()\">\n            Submit\n          </button>\n      </div>\n    </form>\n</ng-container>\n\n<ng-container *ngIf=\"viewStatus === 'confirmation'\">\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='ADDREMISSIONCONFIRMATION'> \n    <div class=\"govuk-warning-text\">\n      <span class=\"govuk-warning-text__icon\" aria-hidden=\"true\">!</span>\n      <strong class=\"govuk-warning-text__text\">\n        <span class=\"govuk-warning-text__assistive\">Warning</span>\n        Are you sure you want to add remission to this fee?\n      </strong>\n    </div>\n    <table class=\"govuk-table\">\n      <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Remission code:</td>\n          <td class=\"govuk-table__cell\">{{ remissionForm.controls.remissionCode.value }}</td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Fee code:</td>\n          <td class=\"govuk-table__cell\">{{ fee.code }}</td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Fee description:</td>\n          <td class=\"govuk-table__cell\">{{ fee.description }}</td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Amount the applicant must pay:</td>\n          <td class=\"govuk-table__cell\">{{  remissionForm.controls.amount.value  | currency:'GBP':'symbol-narrow':'1.2-2' }}</td>\n      </tr>\n    </table>\n\n    <button type=\"submit\" class=\"button govuk-button--secondary\" (click)=\"cancelRemission.emit()\">\n      Cancel\n    </button>\n    <button type=\"submit\"\n    [disabled]=\"isConfirmationBtnDisabled\"\n    [ngClass]='isConfirmationBtnDisabled ? \"button button--disabled govuk-!-margin-right-1\" : \"button govuk-!-margin-right-1\"'\n    (click)=\"confirmRemission()\">\n      Confirm\n    </button>\n\n</ng-container>\n\n<!-- Add retro remission changes-->\n\n<ng-container *ngIf=\"viewCompStatus === 'addremission'\">\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='PROCESSADDRETROREMISSIONPAGE'> \n    <h1 class=\"heading-large\">Process remission</h1>\n    <h1 class=\"heading-medium\">#{{ccdCaseNumber | ccdHyphens}}</h1>\n    <h1 class=\"heading-large\">Enter help with fees or remission reference</h1>\n    <form novalidate>\n        <div class=\"govuk-form-group\">\n          <form [formGroup]=\"remissionForm\" novalidate>\n            <div class=\"govuk-form-group\">\n              <label class=\"govuk-label govuk-label--s\" for=\"remission-code\">\n                <span class=\"form-hint\">For example: HWF-A1B-23C OR PA21-123456</span>\n              </label>\n              <p class=\"inline-error-message\" *ngIf=\"isRemissionCodeEmpty || remissionCodeHasError\">\n                <span *ngIf=\"isRemissionCodeEmpty\">Enter a remission code</span>\n                <span *ngIf=\"remissionCodeHasError\">Enter a vaild remission code</span>\n              </p>\n              <input [ngClass]=\"{'inline-error-class': isRemissionCodeEmpty || remissionCodeHasError}\" class=\"govuk-input govuk-input--width-20 govuk-!-margin-right-1\" id=\"remissionCode\" aria-label=\"remissionCode\"  name=\"remissionCode\" type=\"text\" formControlName=\"remissionCode\">\n           \n            </div>\n          \n          </form>\n          <div class=\"govuk-button-group\">\n              <button (click)=\"gotoServiceRequestPage($event)\" class=\"govuk-button govuk-button--secondary\"> Previous</button>\n              <button (click)=\"addRemissionCode()\" class=\"govuk-button\"> Continue</button>\n          </div>\n          <p><a href=\"javascript:void(0)\" (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link pointer\" data-module=\"govuk-button\">Cancel</a></p>\n        </div>\n    </form>\n\n</ng-container>\n\n<ng-container *ngIf=\"viewStatus === 'processretroremissonpage'\" >\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='PROCESSRETROREMISSIONPAGE'> \n    <h1 class=\"heading-large\">Process remission</h1>\n    <h1 class=\"heading-medium\">#{{ccdCaseNumber | ccdHyphens }}</h1>\n    <div class=\"govuk-form-group\">\n        <form novalidate>\n            <div class=\"govuk-form-group\">\n                <form [formGroup]=\"remissionForm\" novalidate>\n                    <fieldset class=\"govuk-fieldset\">\n                      <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--m\"> \n                          <h1 *ngIf=\"remessionPayment?.status === 'Success' ||   isFromRefundListPage\" class=\"heading-medium\">\n                              Enter the amount to be refunded\n                          </h1> \n                          <h1 *ngIf=\"remessionPayment?.status !== 'Success' && !isFromRefundListPage\" class=\"heading-medium\">\n                              Enter the remission amount\n                          </h1> \n                          <h1 *ngIf=\"remessionPayment?.status === 'undefined'\" class=\"heading-medium\">\n                              Enter the  amount\n                          </h1> \n                        </legend>\n                     <div id=\"amount-currency\" class=\"govuk-visually-hidden\">in pounds</div>\n                     <p class=\"inline-error-message\" *ngIf=\"isAmountEmpty || amountHasError || isRemissionLessThanFeeError\">\n                      <span *ngIf=\"isAmountEmpty\">Enter a amount</span>\n                      <span *ngIf=\"amountHasError\">Enter a vaild amount</span>\n                      <span *ngIf=\"isRemissionLessThanFeeError\">You cannot add a remission that's more than the fee amount.</span>\n                    </p>\n                        <div class=\"hmcts-currency-input\">\n                         \n                            <div class=\"hmcts-currency-input__symbol\" aria-hidden=\"true\">\u00A3</div>\n                            <input class=\"govuk-input govuk-input--width-10\" [ngClass]=\"{'inline-error-class': isAmountEmpty || amountHasError || isRemissionLessThanFeeError}\" id=\"amount\" aria-label=\"amount\"  name=\"amount\"  type=\"number\" aria-describedby=\"amount-currency\" formControlName=\"amount\">\n                            \n            \n                      </div>\n                    </fieldset>\n                </form>\n          \n                <div class=\"govuk-button-group\">\n                    <button (click)=\"gotoAddRetroRemissionCodePage()\" class=\"govuk-button govuk-button--secondary\"> Previous</button>\n                    <button (click)=\"gotoCheckRetroRemissionPage(payment)\" class=\"govuk-button\"> Continue</button>\n                \n                </div>\n                <p>\n                  <a href=\"javascript:void(0)\" (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link\" data-module=\"govuk-button\">Cancel</a>\n              </p>\n            </div>\n  \n        </form>\n    </div>\n</ng-container>\n<ng-container *ngIf=\"viewStatus === 'checkretroremissionpage'\">\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='CHECKRETROREMISSIONCONFIRMATION'> \n    <div class=\"govuk-warning-text\">\n        <h1 class=\"heading-large\"> Check your answers</h1>\n    </div>\n    <table class=\"govuk-table\">\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment reference</td>\n            <td class=\"govuk-table__cell\">{{remessionPayment ? remessionPayment.reference: ' '}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment amount</td>\n            <td class=\"govuk-table__cell\">\u00A3{{ remessionPayment ? getFormattedCurrency(remessionPayment.amount): ' ' | currency :'GBP':'symbol':'1.2-2'}} </td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment status</td>\n            <td class=\"govuk-table__cell\">{{remessionPayment ? remessionPayment.status: ''}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Fee</td>\n            <td class=\"govuk-table__cell\">{{ fee.code }} - {{ fee.description }} </td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Fee amount</td>\n          <td class=\"govuk-table__cell\">{{ fee.calculated_amount/fee.volume| currency:'GBP':'symbol-narrow':'1.2-2' }}</td>\n      </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Help with fees or remission reference</td>\n            <td class=\"govuk-table__cell\">{{ remissionForm.controls.remissionCode.value?.trim() }}\n             <a (click)=\"gotoProcessRetroRemissionPage()\" class=\"govuk-link right\" >Change</a>\n            </td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td *ngIf=\"remessionPayment.status === 'Success'\" class=\"govuk-table__cell govuk-!-font-weight-bold\">Refund amount</td>\n            <td *ngIf=\"remessionPayment.status !== 'Success'\" class=\"govuk-table__cell govuk-!-font-weight-bold\">Remission amount</td>\n            <td class=\"govuk-table__cell\">{{remissionForm.controls.amount.value  | currency:'GBP':'symbol-narrow':'1.2-2' }}\n                <a (click)=\"gotoAmountRetroRemission()\" class=\"govuk-link right\" >Change</a>\n            </td>\n        </tr>\n    </table>\n\n    <button type=\"submit\" class=\"button govuk-button--secondary\" (click)=\"gotoAmountRetroRemission()\">Previous</button>\n    <button type=\"submit\" [disabled]=\"isConfirmationBtnDisabled\" [ngClass]='isConfirmationBtnDisabled ? \"button button--disabled govuk-!-margin-right-1\" : \"button govuk-!-margin-right-1\"' (click)=\"confirmRetroRemission()\"> Add remission </button>\n    <p> <a href=\"javascript:void(0)\" (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link\" data-module=\"govuk-button\"> Cancel</a> </p>\n\n</ng-container>\n\n<ng-container *ngIf=\"viewStatus === 'retroremissionconfirmationpage'\">\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='RETROREMISSIONCONFIRMATIONPAGE'> \n  <div class=\"govuk-grid-row\">\n    <div >\n      <div class=\"govuk-panel govuk-panel-border--confirmation\">\n        <h1 class=\"govuk-panel__title\">\n          Remission added\n        </h1>\n        <div *ngIf=\"remessionPayment.status === 'Success'\" class=\"govuk-panel__body\">\n            <p class=\"govuk-body\"><strong>The amount to be refunded should be {{remissionForm.controls.amount.value | currency:'GBP':'symbol-narrow':'1.2-2' }}</strong></p>\n           \n          </div>\n        </div>\n        <div *ngIf=\"remessionPayment.status === 'Success'\" >\n            <button type=\"submit\" [disabled]=\"!isRemissionApplied\" [ngClass]='isConfirmationBtnDisabled ? \"button button--disabled govuk-!-margin-right-1\" : \"button govuk-!-margin-right-1\"' (click)=\"gotoProcessRetroRemission()\">Continue </button>\n          </div>\n          <p class=\"govuk-body\">\n          <a href=\"javascript:void(0)\" (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link pointer\" data-module=\"govuk-button\">\n            Return to case\n        </a>\n          </p>\n    </div>\n  </div>\n</ng-container>\n\n\n<ng-container *ngIf=\"viewStatus === 'remissionAddressPage'\">\n  <input #myInput type='hidden' id='iFrameDrivenImageValue' value='ADDRESSDETAILSRETROREMISSIONPAGE'>      \n    <h1 class=\"govuk-heading-l\">Process refund</h1>\n    <h2 class=\"govuk-heading-m govuk-font19px\">Case reference: {{ccdCaseNumber | ccdHyphens }}</h2>\n  <ccpay-contact-details\n  [addressObj] = notification\n  (assignContactDetails)=\"getContactDetails($event, 'checkaddRefundpage')\"\n  (redirectToIssueRefund)=\"gotoRemissionSuccess($event)\" ></ccpay-contact-details>\n  <p>\n      <a (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link\" data-module=\"govuk-button\">\n          Cancel\n      </a>\n  </p>\n\n</ng-container>\n\n<ng-container *ngIf=\"viewStatus === 'checkaddRefundpage'\">\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='CHECKRETROREMISSIONCONFIRMATION'> \n    <div class=\"govuk-warning-text\">\n        <h1 class=\"heading-large\"> Check your answers</h1>\n    </div>\n    <table class=\"govuk-table\">\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment reference</td>\n            <td class=\"govuk-table__cell\">{{remessionPayment ? remessionPayment.reference: ' '}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment amount</td>\n            <td class=\"govuk-table__cell\">\u00A3{{ remessionPayment ? getFormattedCurrency(remessionPayment.amount): ' ' | currency :'GBP':'symbol':'1.2-2'}} </td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment status</td>\n            <td class=\"govuk-table__cell\">{{remessionPayment ? remessionPayment.status: ''}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Fee</td>\n            <td class=\"govuk-table__cell\">{{ fee.code }} - {{ fee.description }} ({{ fee.calculated_amount/fee.volume| currency:'GBP':'symbol-narrow':'1.2-2' }}) </td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Help with fees or remission reference</td>\n            <td class=\"govuk-table__cell\">{{ remissionForm.controls.remissionCode.value?.trim() }}\n            </td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td *ngIf=\"remessionPayment.status === 'Success'\" class=\"govuk-table__cell govuk-!-font-weight-bold\">Refund amount</td>\n            <td *ngIf=\"remessionPayment.status !== 'Success'\" class=\"govuk-table__cell govuk-!-font-weight-bold\">Remission amount</td>\n            <td class=\"govuk-table__cell\">{{remissionForm.controls.amount.value  | currency:'GBP':'symbol-narrow':'1.2-2' }}\n            </td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Send to</td>\n          <td class=\"govuk-table__cell\">{{orderParty}}</td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n        <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Send via</td>\n        <td class=\"govuk-table__cell whitespace-inherit\">\n          <div *ngIf=\"contactDetailsObj?.notification_type === 'EMAIL'\" class=\"contactDetails-width\">\n            <strong>Email</strong>\n            <br/>\n            {{contactDetailsObj?.email?.trim()}}\n          </div>\n          <div *ngIf=\"contactDetailsObj?.notification_type === 'LETTER'\" class=\"contactDetails-width\">\n            <strong>Post</strong>\n            <br/>\n            {{contactDetailsObj?.address_line?.trim()}}&nbsp;{{contactDetailsObj?.city?.trim()}}&nbsp;{{contactDetailsObj?.county?.trim()}}&nbsp;{{contactDetailsObj?.country?.trim()}}&nbsp;{{contactDetailsObj?.postal_code?.trim()}}\n          </div>\n          <a (click)=\"gotoProcessRetroRemission(contactDetailsObj)\" class=\"govuk-link right\" >Change</a>\n        </td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n        <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Notification</td>\n        <td class=\"govuk-table__cell\">{{templateInstructionType}}\n            <a *ngIf=\"!notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"showNotificationPreview()\">\n              Preview\n            </a>\n            <a *ngIf=\"notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"hideNotificationPreview()\">\n              Hide Preview\n            </a>\n        </td>\n      </tr>\n    </table>\n\n    <app-notification-preview *ngIf=\"notificationPreview\" \n    [payment]=\"remessionPayment\" \n    [contactDetails]=\"contactDetailsObj\"\n    [refundReason]=\"'RR036'\"\n    [refundAmount]=\"remissionForm.controls.amount.value\"></app-notification-preview>\n\n    <button type=\"submit\" class=\"button govuk-button--secondary\" (click)=\"gotoProcessRetroRemission(contactDetailsObj)\">Previous</button>\n    <button type=\"submit\" [disabled]=\"isConfirmationBtnDisabled\" [ngClass]='isConfirmationBtnDisabled ? \"button button--disabled govuk-!-margin-right-1\" : \"button govuk-!-margin-right-1\"' (click)=\"processRefund()\"> Submit refund </button>\n    <p> <a href=\"javascript:void(0)\" (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link\" data-module=\"govuk-button\"> Cancel</a> </p>\n\n</ng-container>\n\n<ng-container *ngIf=\"viewStatus === 'refundconfirmationpage'\">\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='RETROREMISSIONREFUNDCONFIRMATIONPAGE'> \n    <div class=\"govuk-grid-row\">\n      <div >\n        <div class=\"govuk-panel govuk-panel--confirmation\">\n          <h1 class=\"govuk-panel__title\">\n            Refund submitted\n          </h1>\n\n          <div class=\"govuk-panel__body\">\n            <p class=\"govuk-body white\"><strong>Refund reference: {{refundReference}}</strong></p>\n          </div>\n\n        </div>\n        <div *ngIf=\"isPaymentSuccess\">\n        <h2 class=\"govuk-heading-l\">What happens next</h2>\n        <p class=\"govuk-body\">\n          A refund request for {{refundAmount  | currency:'GBP':'symbol-narrow':'1.2-2' }} has been created and will be passed to a team leader to approve.\n        </p>\n      </div>\n      <p class=\"govuk-body\">\n      <a href=\"javascript:void(0)\" (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link pointer\" data-module=\"govuk-button\">\n        Return to case\n    </a>\n      </p>\n      </div>\n    </div>\n  \n</ng-container>\n\n<!-- Issue Refund Section -->\n<ng-container *ngIf=\"viewCompStatus === 'issuerefund' && isRefundRemission\">\n  <div class=\"govuk-form-group\">\n    <form [formGroup]=\"remissionForm\" novalidate>\n    <h1 class=\"heading-large\">Process refund</h1>\n    <h2 class=\"heading-medium\">Case reference:{{ccdCaseNumber | ccdHyphens }}</h2>\n    <span id=\"how-contacted-conditional-hint\" class=\"form-hint govuk-font19px\">\n      Payment reference: {{paymentReference}}\n    </span>\n    <h3 class=\"heading-small\">Select fees to be refunded</h3>\n    <!--TABLE-->\n    <div>\n      <table class=\"govuk-table\">\n        <thead class=\"govuk-table__head\">\n          <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__header  col-1\" scope=\"col\">Select</td>\n            <td class=\"govuk-table__header col-18\" scope=\"col\">Fee description</td>\n            <td class=\"govuk-table__header col-6\" scope=\"col\">Fee amount</td>\n            <td class=\"govuk-table__header col-6\" scope=\"col\">Total paid</td>\n            <td class=\"govuk-table__header col-6\" scope=\"col\">Quantity</td>\n            <td class=\"govuk-table__header col-8\" scope=\"col\">Amount to refund</td>\n            <td class=\"govuk-table__header\" scope=\"col\"></td>\n          </tr>\n        </thead>\n        <tbody class=\"govuk-table__body\" *ngIf=\"!isFullyRefund\">\n          <tr class=\"govuk-table__row\" formArrayName=\"feesList\" *ngFor=\"let fee of feesList?.controls; let i = index\">\n            <td class=\"govuk-table__cell\">\n              <div  [formGroupName]=\"i\" class=\"govuk-checkboxes govuk-checkboxes--large\" data-module=\"govuk-checkboxes\">\n                <div class=\"govuk-checkboxes__item\">\n\n                  <input\n                  class=\"govuk-checkboxes__input\" \n                  (click)=\"check_en(i,fee.controls['id'].value,fee.controls['apportion_amount'].value,fee.controls['volume'].value)\" \n                  id=\"{{fee.controls['id'].value}}\" \n                  name=\"organisation\" \n                  type=\"checkbox\" \n                  value=\"{{fee.controls['id'].value}}\" \n                  formControlName=\"selected\" >\n                  <label class=\"govuk-label govuk-checkboxes__label\" for=\"{{fee.controls['id'].value}}\">\n                    <span style=\"display:none\">Select</span>\n                  </label>\n                </div>\n              </div>\n            </td>\n            <td class=\"govuk-table__cell  whitespace-inherit\">{{fee.controls['description'].value}} </td>\n            <td class=\"govuk-table__cell  whitespace-inherit left\" >\n              <div type=\"hidden\" style=\"display:none;background-color:white;\" id=\"feeVOl_{{fee.controls['id'].value}}\">{{ fee.controls['calculated_amount'].value / fee.controls['volume'].value }}</div>\n              {{ fee.controls['calculated_amount'].value / fee.controls['volume'].value | currency:'GBP':'symbol-narrow':'1.2-2' }}\n            </td>\n            <td class=\"govuk-table__cell  whitespace-inherit left\" >{{ fee.controls['apportion_amount'].value | currency:'GBP':'symbol-narrow':'1.2-2'}} </td>\n            <td class=\"govuk-table__cell  whitespace-inherit left\"  *ngIf=\"fee.controls['volume'].value >1\">\n              <div [formGroupName]=\"i\">\n              <input disabled=\"disabled\"  class=\"govuk-input govuk-input--width-4 center\"  id=\"feeVolumeUpdated_{{fee.controls['id'].value}}\" (keyup)=\"calAmtToRefund($event.target.value,fee.controls['calculated_amount'].value,fee.controls['volume'].value,i)\" value=\"{{fee.controls['updated_volume'].value}}\"  name=\"feeVolumeUpdated_{{fee.controls['id'].value}}\" formControlName=\"updated_volume\" type=\"text\" >\n            </div>\n            </td>\n            <td class=\"govuk-table__cell  whitespace-inherit left\"  *ngIf=\"fee.controls['volume'].value ===1\">\n              <input disabled=\"disabled\"  class=\"govuk-input govuk-input--width-4 center\"  id=\"VolumeUpdated_{{fee.controls['id'].value}}\" name=\"VolumeUpdated_{{fee.controls['id'].value}}\" type=\"text\"   value=\"{{fee.controls['volume'].value}}\">\n            </td>\n            <td class=\"govuk-table__cell  whitespace-inherit center\" scope=\"row\">\n            \n                <div  [formGroupName]=\"i\"  class=\"hmcts-currency-input\">\n                  \n                  <div class=\"hmcts-currency-input__symbol\" aria-hidden=\"true\">\u00A3</div>\n                  <input disabled=\"disabled\" class=\"govuk-input govuk-input--width-10\" id=\"feeAmount_{{fee.controls['id'].value}}\" name=\"feeAmount_{{fee.controls['id'].value}}\" type=\"text\" aria-describedby=\"amount-currency \"  pattern=\"[0-9]*\" formControlName=\"refund_amount\">\n                  <input id=\"feeVolume_{{fee.controls['id'].value}}\" name=\"feeVolume_{{fee.controls['id'].value}}\" value= \"{{fee.controls['volume'].value}}\" type=\"hidden\" formControlName=\"volume\">\n                  <input id=\"feeApportionAmount_{{fee.controls['id'].value}}\" name=\"feeApportionAmount_{{fee.controls['id'].value}}\" value= \"{{fee.controls['apportion_amount'].value}}\" type=\"hidden\" formControlName=\"apportion_amount\">\n                  <input id=\"calculatedAmount_{{fee.controls['id'].value}}\" name=\"calculatedAmount_{{fee.controls['id'].value}}\" value= \"{{fee.controls['calculated_amount'].value}}\" type=\"hidden\" formControlName=\"calculated_amount\">\n               </div> \n \n            </td>\n          </tr>\n        </tbody>\n        <tbody class=\"govuk-table__body\" *ngIf=\"isFullyRefund\">\n          <tr class=\"govuk-table__row\" *ngFor=\"let fee of fees; let i = index\">\n            <td class=\"govuk-table__cell\">\n              <div  class=\"govuk-checkboxes govuk-checkboxes--large\" data-module=\"govuk-checkboxes\">\n                <div class=\"govuk-checkboxes__item\">\n                  <input   \n                  class=\"govuk-checkboxes__input\" \n                \n                  id=\"{{fee.id}}\" \n                  name=\"organisation\" \n                  type=\"checkbox\" \n                  value=\"{{fee.id}}\"\n                  disabled=\"disabled\"\n                  [checked]=\"true\" >\n                  <label class=\"govuk-label govuk-checkboxes__label\" for=\"{{fee.id}}\">\n                    <span style=\"display:none\">Select</span>\n                  </label>\n                </div>\n              </div>\n            </td>\n            <td class=\"govuk-table__cell  whitespace-inherit\">{{fee.description}} </td>\n            <td class=\"govuk-table__cell  whitespace-inherit left\" >\n              <div type=\"hidden\" style=\"display:none;background-color:white;\" id=\"feeVOl_{{fee.id}}\">{{ fee.calculated_amount / fee.volume }}</div>\n              {{ fee.calculated_amount / fee.volume| currency:'GBP':'symbol-narrow':'1.2-2' }}\n            </td>\n            <td class=\"govuk-table__cell  whitespace-inherit left\" >{{ payment.amount | currency:'GBP':'symbol-narrow':'1.2-2'}} </td>\n            <td class=\"govuk-table__cell  whitespace-inherit left\">\n              <div >\n              <input disabled=\"disabled\"  class=\"govuk-input govuk-input--width-4 center\"  id=\"feeVolumeUpdated_{{fee.id}}\"  value=\"{{fee.volume}}\"  name=\"feeVolumeUpdated_{{fee.id}}\" type=\"text\" >\n            </div>\n            </td>\n        \n            <td class=\"govuk-table__cell  whitespace-inherit center\" scope=\"row\">\n            \n                <div class=\"hmcts-currency-input\">\n                  \n                  <div class=\"hmcts-currency-input__symbol\" aria-hidden=\"true\">\u00A3</div>\n                  <input disabled=\"disabled\" class=\"govuk-input govuk-input--width-10\" id=\"feeAmount_{{fee.id}}\" name=\"feeAmount_{{fee.id}}\" type=\"text\" aria-describedby=\"amount-currency \"  value=\"{{ payment.amount | currency:'GBP':'symbol-narrow':'1.2-2'}}\" pattern=\"[0-9]*\" >\n                </div> \n        \n            </td>\n          </tr>\n        </tbody>\n        <tbody class=\"govuk-table__body\" *ngIf=\"fees?.length === 0\">\n          <td class=\"govuk-table__cell\" colspan=\"6\">No fees recorded</td>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"govuk-button-group\">\n\n  \n  <a  (click)=\"gotoServiceRequestPage($event)\"  *ngIf=\"!isFullyRefund\" draggable=\"false\" class=\"govuk-button govuk-button--secondary\" data-module=\"govuk-button\">\n    Previous\n  </a>\n  <a  (click)=\"goToPaymentViewComponent()\"  *ngIf=\"isFullyRefund\" draggable=\"false\" class=\"govuk-button govuk-button--secondary\" data-module=\"govuk-button\">\n    Previous\n  </a>\n    \n  <button [disabled] = \"noneSelected()\" (click)=\"gotoIssuePage(isFullyRefund)\" class=\"govuk-button\">\n    Continue\n  </button>\n  \n    </div>\n    <p>\n      <a  (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link\" data-module=\"govuk-button\">Cancel</a>\n    </p>\n  </form>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"viewCompStatus === 'issuerefundpage1' && isRefundRemission\">\n\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='ISSUEREFUNDPAGE'> \n    <h1 class=\"heading-large\">Process refund</h1>\n    <h1 class=\"heading-medium\">Case reference: {{ccdCaseNumber | ccdHyphens }}</h1>\n    <span id=\"how-contacted-conditional-hint govuk-font19px\" *ngIf=\"payment\" class=\"form-hint\">\n      Payment reference: {{paymentReference}}\n    </span>\n    <span id=\"how-contacted-conditional-hint govuk-font19px\" *ngIf=\"refundPaymentReference\" class=\"form-hint\">\n      Payment reference: {{refundPaymentReference}}\n    </span>\n    <h1 class=\"heading-large\">Why are you making this refund?\n      </h1>\n     \n\n      <div class=\"govuk-form-group\">\n          <form novalidate>\n              <div class=\"govuk-form-group\">\n                <form [formGroup]=\"remissionForm\" novalidate>\n                  <fieldset class=\"govuk-fieldset\" aria-describedby=\"how-contacted-conditional-hint\">\n                     \n                        <div\n                          [ngClass]=\"refundHasError ? 'govuk-radios govuk-radios--conditional form-group-error' : 'govuk-radios govuk-radios--conditional'\"\n                          data-module=\"govuk-radios\" >\n                          <p class=\"inline-error-message\" *ngIf=\"refundHasError\">\n                            <span *ngIf=\"refundHasError\">Select a reason why you\u2019re making this refund</span>\n                          </p>\n\n                         \n\n                          <div class = \"container-fluid\">\n                            <div class=\"row\">\n                            <div class=\"govuk-radios__item col-md-4\" *ngFor=\"let refund of commonRefundReasons; let i = index;\">\n                              <!-- <div *ngIf = \"{{refund.name}} !== 'Retrospective remission'\"> -->\n                                <input   class=\"govuk-radios__input\" id=\"{{refund.name}}\" name=\"refundReason\" type=\"radio\"\n                                formControlName=\"refundReason\" value={{refund.code}}\n                                  (change)=\"selectRadioButton(refund.code, refund.name)\">\n                                <label class=\"govuk-label--s govuk-radios__label govuk-font__custom\" for=\"how-contacted-conditional\">\n                                  {{refund.name}}\n                                </label>\n\n                                <div class=\"govuk-radios__conditional\" *ngIf=\"isRefundReasonsSelected && showReasonText && selectedRefundReason === refund.name \" >\n                                    <label class=\"govuk-label govuk-label--m\" for=\"{{refund.name}}\">\n                                        Enter reason\n                                    </label>\n                                    <div [ngClass]=\"{'form-group-error': isReasonEmpty}\">\n                                    <p  class=\"inline-error-message\" *ngIf=\"isReasonEmpty\">\n                                        <span *ngIf=\"isReasonEmpty\">Enter a reason why you\u2019re making this refund</span>\n                                      </p>\n                                     \n                                  <input class=\"govuk-input govuk-input--width-10\" [ngClass]=\"{'inline-error-class': isReasonEmpty}\" id=\"reason\" aria-label=\"reason\"  name=\"reason\" type=\"text\" aria-describedby=\"reason\" maxlength=\"30\" formControlName=\"reason\">\n                                </div>\n                                </div>\n                              <!-- </div> -->\n                            </div>\n                            </div>\n                          </div>\n                          <br/>\n                          <div>\n                              <select formControlName=\"refundDDReason\" class=\"govuk-select\" id=\"sort\"  (change)=\"selectchange($event)\">\n                                <option selected='selected' [defaultSelected]=true [value]=\"default\" >{{default}}</option>  \n                                <!-- <option value=\"\" selected='selected'>Select a different reason</option> -->\n                                  <option  *ngFor=\"let refund of refundReasons;\" id=\"{{refund.name}}\"  value=\"{{refund.code}}\">{{refund.name}}</option>\n                                </select>\n                            \n                          </div>\n                              <br/>\n                              <div class=\"govuk-radios__conditional\" *ngIf=\"showReasonText &&  !isRefundReasonsSelected\" >\n                                <div [ngClass]=\"{'form-group-error': isReasonEmpty}\">\n                                  <label class=\"govuk-label govuk-label--m\" for=\"amount\">\n                                      Enter reason\n                                  </label>\n                                  <p class=\"inline-error-message\" *ngIf=\"isReasonEmpty\">\n                                      <span *ngIf=\"isReasonEmpty\">Enter a reason why you\u2019re making this refund</span>\n                                    </p>\n                                <input class=\"govuk-input govuk-input--width-10\" [ngClass]=\"{'inline-error-class': isReasonEmpty}\" id=\"reason\" aria-label=\"reason\"  name=\"reason\" type=\"text\" aria-describedby=\"reason\" maxlength=\"{{reasonLength}}\"  formControlName=\"reason\">\n                                </div>\n                              </div>\n\n                        \n                        </div>\n                  </fieldset>\n                </form>\n             </div>\n             </form>\n      </div>\n      <div class=\"govuk-button-group\">\n          <button  (click)=\"gotoPartialFeeRefundScreen()\" class=\"govuk-button govuk-button--secondary\"> Previous</button>\n          <button (click)=\"gotoIssueRefundConfirmation(payment)\" class=\"govuk-button\"> Continue</button>\n      </div>\n      <p>\n        <a href=\"javascript:void(0)\" (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link\" data-module=\"govuk-button\">\n            Cancel\n        </a>\n    </p>\n    \n</ng-container>\n<ng-container *ngIf=\"viewStatus === 'contactDetailsPage'\">\n  <input #myInput type='hidden' id='iFrameDrivenImageValue' value='CAPTUREADDRESSDETAILSPAGE'>      \n    <h1 class=\"govuk-heading-l\">Process refund</h1>\n    <h2 class=\"govuk-heading-m govuk-font19px\">Case reference: {{ccdCaseNumber | ccdHyphens }}</h2>\n    <span id=\"how-contacted-conditional-hint\" class=\"govuk-hint govuk-font19px\">\n      Payment reference: {{paymentReference}}\n    </span>\n  <ccpay-contact-details\n  [addressObj] = notification\n  (assignContactDetails)=\"getContactDetails($event, 'checkissuerefundpage')\"\n  (redirectToIssueRefund)=\"gotoRefundReasonPage()\" ></ccpay-contact-details>\n  <p>\n      <a (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link\" data-module=\"govuk-button\">\n          Cancel\n      </a>\n  </p>\n\n</ng-container>\n\n<ng-container *ngIf=\"viewStatus === 'checkissuerefundpage'\">\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='CHECKISSUEREFUNDPAGE'> \n    <div class=\"govuk-warning-text\">\n     \n        <h1 class=\"heading-large\"> Check your answers</h1>\n    </div>\n    <table class=\"govuk-table\">\n        \n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment reference</td>\n            <td class=\"govuk-table__cell\">{{paymentReference}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment amount</td>\n            <td class=\"govuk-table__cell\">{{payment.amount | currency:'GBP':'symbol-narrow':'1.2-2'}}</td>\n        </tr>\n        <tr>\n        <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Reason for refund</td>\n        <td class=\"govuk-table__cell\">{{ displayRefundReason?.trim()  }} \n         <a (click)=\"changeIssueRefundReason()\" class=\"govuk-link right\" >Change</a>\n        </td>\n      </tr>\n      <tr class=\"govuk-table__row\" *ngIf=\"!isFullyRefund\">\n        <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Refund amount</td>\n        <td class=\"govuk-table__cell\">{{totalRefundAmount | currency:'GBP':'symbol-narrow':'1.2-2'}}\n        <a (click)=\"changeRefundAmount()\" class=\"govuk-link right\" >Change</a>\n        </td>\n      </tr>\n      <tr class=\"govuk-table__row\" *ngIf=\"isFullyRefund\">\n        <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Refund amount</td>\n        <td class=\"govuk-table__cell\">{{payment.amount | currency:'GBP':'symbol-narrow':'1.2-2'}}</td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Send to</td>\n          <td class=\"govuk-table__cell\">{{orderParty}}</td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n        <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Send via</td>\n        <td class=\"govuk-table__cell whitespace-inherit\">\n          <div *ngIf=\"contactDetailsObj?.notification_type === 'EMAIL'\" class=\"contactDetails-width\">\n            <strong>Email</strong>\n            <br/>\n            {{contactDetailsObj?.email?.trim()}}\n          </div>\n          <div *ngIf=\"contactDetailsObj?.notification_type === 'LETTER'\" class=\"contactDetails-width\">\n            <strong>Post</strong>\n            <br/>\n            {{contactDetailsObj?.address_line?.trim()}}&nbsp;{{contactDetailsObj?.city?.trim()}}&nbsp;{{contactDetailsObj?.county?.trim()}}&nbsp;{{contactDetailsObj?.country?.trim()}}&nbsp;{{contactDetailsObj?.postal_code?.trim()}}\n          </div>\n          <a (click)=\"gotoContactDetailsPage(contactDetailsObj)\" class=\"govuk-link right\" >Change</a>\n        </td>\n      </tr>\n\n      <tr class=\"govuk-table__row\">\n        <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Notification</td>\n        <td class=\"govuk-table__cell\">{{templateInstructionType}}\n            <a *ngIf=\"!notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"showNotificationPreview()\">\n              Preview\n            </a>\n            <a *ngIf=\"notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"hideNotificationPreview()\">\n              Hide Preview\n            </a>\n        </td>\n      </tr>\n    </table>\n\n    <app-notification-preview *ngIf=\"notificationPreview\" \n    [payment]=\"payment\" \n    [contactDetails]=\"contactDetailsObj\"\n    [refundReason]=\"selectedRefundReasonCode\"\n    [refundAmount]=\"isFullyRefund ? payment.amount : totalRefundAmount\"></app-notification-preview>\n\n\n    <div class=\"govuk-button-group\">\n    <button type=\"submit\" class=\"button govuk-button--secondary\" (click)=\"gotoContactDetailsPage(contactDetailsObj)\"> Previous </button>\n    <button type=\"submit\"\n    [disabled]=\"isConfirmationBtnDisabled\"\n    [ngClass]='isConfirmationBtnDisabled ? \"button button--disabled govuk-!-margin-right-1\" : \"button govuk-!-margin-right-1\"'\n    (click)=\"confirmIssueRefund(isFullyRefund)\">\n      Submit refund\n    </button>\n    </div>\n    <p>\n        <a (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link\" data-module=\"govuk-button\">\n            Cancel\n        </a>\n    </p>\n\n</ng-container>\n\n<!--Retro Refund-->\n<ng-container *ngIf=\"viewCompStatus === 'addrefundforremission'\">\n  <input #myInput type='hidden' id='iFrameDrivenImageValue' value='ADDRESSDETAILSRETROREMISSIONPAGE'>      \n  <h1 class=\"govuk-heading-l\">Process refund</h1>\n  <h2 class=\"govuk-heading-m govuk-font19px\">Case reference: {{ccdCaseNumber | ccdHyphens }}</h2>\n  <span id=\"how-contacted-conditional-hint\" class=\"govuk-hint govuk-font19px\">\n    Payment reference: {{paymentReference}}\n  </span>\n<ccpay-contact-details \n[addressObj] = notification\n(assignContactDetails)=\"getContactDetails($event, 'addrefundcheckandanswer')\"\n(redirectToIssueRefund)=\"gotoServiceRequestPage($event)\" ></ccpay-contact-details>\n<p>\n    <a (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link\" data-module=\"govuk-button\">\n        Cancel\n    </a>\n</p>\n</ng-container>\n<ng-container *ngIf=\"viewStatus === 'addrefundcheckandanswer'\">\n    <input #myInput type='hidden' id='iFrameDrivenImageValue' value='ADDREFUNDFORREMISSION'> \n    <div class=\"govuk-warning-text\">\n     \n        <h1 class=\"heading-large\"> Check your answers</h1>\n    </div>\n    <table class=\"govuk-table\">\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Reason for refund</td>\n            <td class=\"govuk-table__cell\">Retrospective remission</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment reference</td>\n            <td class=\"govuk-table__cell\">{{paymentReference}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Refund amount</td>\n            <td class=\"govuk-table__cell\">{{remission.hwf_amount | currency:'GBP':'symbol-narrow':'1.2-2'}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Fee code</td>\n            <td class=\"govuk-table__cell\">{{remission.fee_code}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Fee amount</td>\n            <td class=\"govuk-table__cell\">{{feeamount | currency:'GBP':'symbol-narrow':'1.2-2'}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Send to</td>\n          <td class=\"govuk-table__cell\">{{orderParty}}</td>\n      </tr>\n      <tr class=\"govuk-table__row\">\n        <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Send via</td>\n        <td class=\"govuk-table__cell whitespace-inherit\">\n          <div *ngIf=\"contactDetailsObj?.notification_type === 'EMAIL'\" class=\"contactDetails-width\">\n            <strong>Email</strong>\n            <br/>\n            {{contactDetailsObj?.email?.trim()}}\n          </div>\n          <div *ngIf=\"contactDetailsObj?.notification_type === 'LETTER'\" class=\"contactDetails-width\">\n            <strong>Post</strong>\n            <br/>\n            {{contactDetailsObj?.address_line?.trim()}}&nbsp;{{contactDetailsObj?.city?.trim()}}&nbsp;{{contactDetailsObj?.county?.trim()}}&nbsp;{{contactDetailsObj?.country?.trim()}}&nbsp;{{contactDetailsObj?.postal_code?.trim()}}\n          </div>\n          <a (click)=\"gotoAddressPage(contactDetailsObj)\" class=\"govuk-link right\" >Change</a>\n        </td>\n      </tr>\n\n      <tr class=\"govuk-table__row\">\n        <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Notification</td>\n        <td class=\"govuk-table__cell\">{{templateInstructionType}}\n            <a *ngIf=\"!notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"showNotificationPreview()\">\n              Preview\n            </a>\n            <a *ngIf=\"notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"hideNotificationPreview()\">\n              Hide Preview\n            </a>\n        </td>\n      </tr>\n    </table>\n\n    <app-notification-preview *ngIf=\"notificationPreview\" \n    [contactDetails]=\"contactDetailsObj\"\n    [paymentReference]=\"paymentReference\"\n    [payment]=\"paymentObj\"\n    [refundReason]=\"'RR036'\"\n    [refundAmount]=\"remission.hwf_amount\"></app-notification-preview>\n\n    <div class=\"govuk-button-group\">\n    <button type=\"submit\" class=\"button govuk-button--secondary\" (click)=\"gotoAddressPage(contactDetailsObj)\">Previous</button>\n    <button type=\"submit\"\n    [disabled]=\"isConfirmationBtnDisabled\"\n    [ngClass]='isConfirmationBtnDisabled ? \"button button--disabled govuk-!-margin-right-1\" : \"button govuk-!-margin-right-1\"'\n    (click)=\"processRefund()\">\n      Submit refund\n    </button>\n    </div>\n    <p>\n        <a href=\"javascript:void(0)\"  (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link\" data-module=\"govuk-button\">\n            Cancel\n        </a>\n    </p>\n\n</ng-container>\n\n<ng-container *ngIf=\"viewStatus === 'retrorefundconfirmationpage'\">\n  <div class=\"govuk-grid-row\">\n    <div >\n      <div class=\"govuk-panel govuk-panel--confirmation\">\n        <h1 class=\"govuk-panel__title\">\n          Refund submitted\n        </h1>\n        \n        <div class=\"govuk-panel__body\">\n          <p class=\"govuk-body white\"><strong>Refund reference: {{refundReference}}</strong></p>\n        </div>\n  \n      </div>\n      <div *ngIf=\"isPaymentSuccess\">\n      <h2 class=\"govuk-heading-l\">What happens next</h2>\n      <p class=\"govuk-body\">\n        A refund request for {{ refundAmount| currency:'GBP':'symbol-narrow':'1.2-2'}} has been passed to a team leader to approve.\n      </p>\n    </div>\n    <p class=\"govuk-body\">\n    <a href=\"javascript:void(0)\" (click)=\"gotoCasetransationPageCancelBtnClicked($event)\" class=\"govuk-link pointer\" data-module=\"govuk-button\">\n      Return to case\n  </a>\n    </p>\n    </div>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"viewStatus === 'order-full-view'\">\n  <ccpay-service-request\n  [viewStatus] = \"viewStatus\"\n  [orderRef] = \"orderRef\"\n  [isServiceRequest]=\"isServiceRequest\"\n  [orderStatus] = \"orderStatus\"\n  [orderCreated] = \"orderCreated\"\n  [orderParty] = \"orderParty\"\n  [orderCCDEvent] = \"orderCCDEvent\"\n  [orderDetail] = \"orderDetail\"\n  [LOGGEDINUSERROLES] = \"LOGGEDINUSERROLES\"\n  [takePayment] = \"takePayment\"\n  [ccdCaseNumber] = \"ccdCaseNumber\"\n  [orderFeesTotal] = \"orderFeesTotal\"\n  [orderTotalPayments] = \"orderTotalPayments\"\n  [orderRemissionTotal] = \"orderRemissionTotal\">\n</ccpay-service-request>\n</ng-container>\n\n<ng-container *ngIf=\"viewStatus === 'payment-view'\">\n  <ccpay-payment-view \n  [LOGGEDINUSERROLES] = \"LOGGEDINUSERROLES\"\n  [isTurnOff] = \"isTurnOff\" \n  [isTakePayment] = \"takePayment\"  \n  [caseType] = \"caseType\"\n  [isServiceRequest]=\"isServiceRequest\"\n  [orderRef] = \"orderRef\"\n  [orderStatus] = \"orderStatus\"\n  [orderCreated] = \"orderCreated\"\n  [orderParty] = \"orderParty\"\n  [orderCCDEvent] = \"orderCCDEvent\"\n  [orderDetail] = \"orderDetail\"\n  [orderFeesTotal] = \"orderFeesTotal\"\n  [orderTotalPayments] = \"orderTotalPayments\"\n  [orderRemissionTotal] = \"orderRemissionTotal\"\n  >\n</ccpay-payment-view>\n</ng-container>\n\n</div>", styles: [".add-remission .button{margin:20px 2px;padding:.5em;font-size:19px;font-weight:200}.add-remission td.govuk-table__cell{width:50%}.add-remission .govuk-button--secondary{background-color:#dee0e2;box-shadow:0 2px #858688;color:#0b0c0c;margin-right:.5em}.add-remission .govuk-warning-text__text,.add-remission .govuk-label--s,.add-remission .hmcts-currency-input__symbol{font-size:19px;font-weight:400}.add-remission .inline-error-class{outline:3px solid #a71414;outline-offset:0;border-color:#a71414}.add-remission .inline-error-message{color:#a71414;border-color:#a71414;font-weight:700;margin-top:10px;font-size:20px}.add-remission .govuk-button,.add-remission .govuk-link{margin-right:1em;font-size:19px;font-weight:200}.add-remission .govuk-button-group{padding-top:2em}.add-remission .heading-medium{margin-top:.875em}.add-remission .heading-large{margin-top:.25em}.add-remission .govuk-panel--confirmation{color:#fff;background:#00703C}.add-remission .govuk-panel__title{font-size:5rem}.add-remission .govuk-body-m,.add-remission .govuk-body{font-size:2.1875rem}.add-remission .govuk-radios__item{clear:initial!important;display:inline-block;width:45%!important}.add-remission .govuk-radios__conditional{padding-top:12px!important}.add-remission .right{float:right;cursor:pointer}.add-remission .radio{float:right}.govuk-input,.govuk-font19px{font-size:19px}.govuk-select{font-size:19px;font-weight:400}.govuk-input--width-10{max-width:50ex}.govuk-label--m{font-size:19px;font-weight:400}.govuk-error-summary__body{font-size:19px!important}.govuk-error-summary__title{font-size:24px!important}.white{color:#fff}.pagesize{margin:2em;width:97%}.pointer{cursor:pointer}.col-18{min-width:18em}.col-6{min-width:6em}.col-8{min-width:8em}.col-1{min-width:1em}.col-25{width:25%!important}.col-24{width:24%!important}.left{text-align:left}.center{text-align:center}.col-60{width:60%;text-align:left}.margin-top--size{margin-top:-30px}.contactDetails-width{width:70%}.right{cursor:pointer}.form-hint{font-size:19px!important}.govuk-panel-border--confirmation{color:#0b0c0c;border:5px solid #00703C}.whitespace-inherit{white-space:inherit!important}.govuk-link{cursor:pointer}\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.Router }, { type: i3.PaymentViewService }, { type: i4.NotificationService }, { type: i5.PaymentLibComponent }, { type: i6.RefundsService }, { type: i0.ChangeDetectorRef }, { type: i7.OrderslistService }]; }, { fee: [{
            type: Input
        }], fees: [{
            type: Input
        }], payment: [{
            type: Input
        }], remission: [{
            type: Input
        }], ccdCaseNumber: [{
            type: Input
        }], caseType: [{
            type: Input
        }], viewCompStatus: [{
            type: Input
        }], paymentGroupRef: [{
            type: Input
        }], isTurnOff: [{
            type: Input
        }], isRefundRemission: [{
            type: Input
        }], isStrategicFixEnable: [{
            type: Input
        }], paidAmount: [{
            type: Input
        }], isFromRefundListPage: [{
            type: Input
        }], isFromPaymentDetailPage: [{
            type: Input
        }], isFromServiceRequestPage: [{
            type: Input
        }], isFullyRefund: [{
            type: Input,
            args: ['isFullyRefund']
        }], feeamount: [{
            type: Input
        }], refundPaymentReference: [{
            type: Input
        }], isFromRefundStatusPage: [{
            type: Input
        }], changeRefundReason: [{
            type: Input
        }], isServiceRequest: [{
            type: Input,
            args: ["isServiceRequest"]
        }], LOGGEDINUSERROLES: [{
            type: Input,
            args: ['LOGGEDINUSERROLES']
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
        }], takePayment: [{
            type: Input,
            args: ['takepayment']
        }], orderFeesTotal: [{
            type: Input,
            args: ['orderFeesTotal']
        }], orderTotalPayments: [{
            type: Input,
            args: ['orderTotalPayments']
        }], orderRemissionTotal: [{
            type: Input,
            args: ['orderRemissionTotal']
        }], cancelRemission: [{
            type: Output
        }], refundListReason: [{
            type: Output
        }], refundListAmount: [{
            type: Output
        }], refundFees: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXJlbWlzc2lvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wYXltZW50LWxpYi9zcmMvbGliL2NvbXBvbmVudHMvYWRkLXJlbWlzc2lvbi9hZGQtcmVtaXNzaW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9hZGQtcmVtaXNzaW9uL2FkZC1yZW1pc3Npb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsV0FBVyxFQUFhLFVBQVUsRUFBRSxXQUFXLEVBQWdDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0csT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUV2RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUVyRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUMvRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFaEQsT0FBTyxFQUFFLGlC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VTtrQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgRm9ybUNvbnRyb2wsIFJlcXVpcmVkVmFsaWRhdG9yLCBGb3JtQXJyYXkgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJRmVlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JRmVlJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQWRkUmVtaXNzaW9uUmVxdWVzdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvQWRkUmVtaXNzaW9uUmVxdWVzdCc7XG5pbXBvcnQgeyBQYXltZW50Vmlld1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9wYXltZW50LXZpZXcvcGF5bWVudC12aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGF5bWVudExpYkNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3BheW1lbnQtbGliLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IElQYXltZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUGF5bWVudCc7XG5pbXBvcnQgeyBSZWZ1bmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZnVuZHMvcmVmdW5kcy5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgSVJlZnVuZFJlYXNvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lSZWZ1bmRSZWFzb25zJztcbmltcG9ydCB7IEFkZFJldHJvUmVtaXNzaW9uUmVxdWVzdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvQWRkUmV0cm9SZW1pc3Npb25SZXF1ZXN0JztcbmltcG9ydCB7IElSZWZ1bmRDb250YWN0RGV0YWlscyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVJlZnVuZENvbnRhY3REZXRhaWxzJztcbmltcG9ydCB7IFBvc3RSZWZ1bmRSZXRyb1JlbWlzc2lvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvUG9zdFJlZnVuZFJldHJvUmVtaXNzaW9uJztcbmltcG9ydCB7IFBvc3RJc3N1ZVJlZnVuZFJldHJvUmVtaXNzaW9uIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9Qb3N0SXNzdWVSZWZ1bmRSZXRyb1JlbWlzc2lvbic7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElSZW1pc3Npb24gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lSZW1pc3Npb24nO1xuaW1wb3J0IHsgT3JkZXJzbGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vcmRlcnNsaXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgSVBheW1lbnRHcm91cCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVBheW1lbnRHcm91cCc7XG5cbmNvbnN0IEJTX0VOQUJMRV9GTEFHID0gJ2J1bGstc2Nhbi1lbmFibGluZy1mZSc7XG5jb25zdCByZXNvbHZlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjcGF5LWFkZC1yZW1pc3Npb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vYWRkLXJlbWlzc2lvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FkZC1yZW1pc3Npb24uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBZGRSZW1pc3Npb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBmZWU6IElGZWU7XG4gIEBJbnB1dCgpIGZlZXM6IGFueSBbXTtcbiAgQElucHV0KCkgcGF5bWVudDogSVBheW1lbnQ7XG4gIEBJbnB1dCgpIHJlbWlzc2lvbjogSVJlbWlzc2lvbjtcbiAgQElucHV0KCkgY2NkQ2FzZU51bWJlcjogc3RyaW5nO1xuICBASW5wdXQoKSBjYXNlVHlwZTogc3RyaW5nO1xuICBASW5wdXQoKSB2aWV3Q29tcFN0YXR1czogc3RyaW5nO1xuICBASW5wdXQoKSBwYXltZW50R3JvdXBSZWY6IHN0cmluZztcbiAgQElucHV0KCkgaXNUdXJuT2ZmOiBib29sZWFuO1xuICBASW5wdXQoKSBpc1JlZnVuZFJlbWlzc2lvbjogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNTdHJhdGVnaWNGaXhFbmFibGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHBhaWRBbW91bnQ6IGFueTtcbiAgQElucHV0KCkgaXNGcm9tUmVmdW5kTGlzdFBhZ2U6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzRnJvbVBheW1lbnREZXRhaWxQYWdlOiBib29sZWFuO1xuICBASW5wdXQoKSBpc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2U6IGJvb2xlYW47XG4gIEBJbnB1dCgnaXNGdWxseVJlZnVuZCcpIGlzRnVsbHlSZWZ1bmQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZlZWFtb3VudDogbnVtYmVyO1xuICBASW5wdXQoKSByZWZ1bmRQYXltZW50UmVmZXJlbmNlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlzRnJvbVJlZnVuZFN0YXR1c1BhZ2U6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNoYW5nZVJlZnVuZFJlYXNvbjogc3RyaW5nO1xuICBASW5wdXQoXCJpc1NlcnZpY2VSZXF1ZXN0XCIpIGlzU2VydmljZVJlcXVlc3Q6IHN0cmluZztcbiAgQElucHV0KCdMT0dHRURJTlVTRVJST0xFUycpIExPR0dFRElOVVNFUlJPTEVTOiBzdHJpbmdbXTtcbiAgQElucHV0KCdvcmRlckRldGFpbCcpIG9yZGVyRGV0YWlsOiBhbnlbXTtcbiAgQElucHV0KCdvcmRlclJlZicpIG9yZGVyUmVmOiBzdHJpbmc7XG4gIEBJbnB1dCgnb3JkZXJTdGF0dXMnKSBvcmRlclN0YXR1czogc3RyaW5nO1xuICBASW5wdXQoJ29yZGVyUGFydHknKSBvcmRlclBhcnR5OiBzdHJpbmc7XG4gIEBJbnB1dCgnb3JkZXJDcmVhdGVkJykgb3JkZXJDcmVhdGVkOiBEYXRlO1xuICBASW5wdXQoJ29yZGVyQ0NERXZlbnQnKSBvcmRlckNDREV2ZW50OiBzdHJpbmc7XG4gIEBJbnB1dCgndGFrZXBheW1lbnQnKSB0YWtlUGF5bWVudDogYm9vbGVhbjtcbiAgQElucHV0KCdvcmRlckZlZXNUb3RhbCcpIG9yZGVyRmVlc1RvdGFsOiBudW1iZXI7XG4gIEBJbnB1dCgnb3JkZXJUb3RhbFBheW1lbnRzJykgb3JkZXJUb3RhbFBheW1lbnRzOiBudW1iZXI7XG4gIEBJbnB1dCgnb3JkZXJSZW1pc3Npb25Ub3RhbCcpIG9yZGVyUmVtaXNzaW9uVG90YWw6IG51bWJlcjtcbiAgQE91dHB1dCgpIGNhbmNlbFJlbWlzc2lvbjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvL0BPdXRwdXQoKSByZWZ1bmRMaXN0UmVhc29uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoe3JlYXNvbjpzdHJpbmcsIGNvZGU6c3RyaW5nfSk7XG4gIEBPdXRwdXQoKSByZWZ1bmRMaXN0UmVhc29uID0gbmV3IEV2ZW50RW1pdHRlcjx7cmVhc29uOiBzdHJpbmcsIGNvZGU6IHN0cmluZ30+KCk7XG4gIEBPdXRwdXQoKSByZWZ1bmRMaXN0QW1vdW50OiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlZnVuZEZlZXM6IEV2ZW50RW1pdHRlcjxJRmVlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxJRmVlW10+KCk7XG4gIHJlZnVuZCA9IHtcbiAgICByZWFzb246IHtcbiAgICAgIGR1cGxpY2F0ZTogJ0R1cGxpY2F0ZSBwYXltZW50JyxcbiAgICAgIGh1bWFuZXJyb3I6ICdIdW1hbiBlcnJvcicsXG4gICAgICBjYXNlV2l0aGRyYXduOiAnQ2FzZSB3aXRoZHJhd24nLFxuICAgICAgb3RoZXI6ICdPdGhlcidcbiAgICB9XG4gIH1cbiAgY29udGFjdERldGFpbHNPYmo6IElSZWZ1bmRDb250YWN0RGV0YWlscztcbiAgbm90aWZpY2F0aW9uOiBhbnk7XG4gIHJlbWlzc2lvbkZvcm06IEZvcm1Hcm91cDtcbiAgaGFzRXJyb3JzID0gZmFsc2U7XG4gIHZpZXdTdGF0dXMgPSAnbWFpbic7XG4gIGVycm9yTWVzc2FnZSA9IG51bGw7XG4gIG9wdGlvbjogc3RyaW5nID0gbnVsbDtcbiAgaXNDb25maXJtYXRpb25CdG5EaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBic1BheW1lbnREY25OdW1iZXI6IHN0cmluZztcbiAgc2VsZWN0ZWRWYWx1ZSA9ICd5ZXMnO1xuICBhbW91bnQ6IGFueTtcbiAgcmV0cm9SZW1pc3Npb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVtaXNzaW9uUmVmZXJlbmNlOiBzdHJpbmcgPSAnJztcbiAgcmVmdW5kUmVmZXJlbmNlOiBzdHJpbmc7XG4gIHJlZnVuZEFtb3VudDogc3RyaW5nO1xuICBwYXltZW50RXhwbGFuYXRpb25IYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICByZWZ1bmRSZWFzb246c3RyaW5nO1xuICBzZWxlY3RlZFJlZnVuZFJlYXNvbjogc3RyaW5nO1xuICBzZWxlY3RlZFJlZnVuZFJlYXNvbkNvZGU6IHN0cmluZztcbiAgZGlzcGxheVJlZnVuZFJlYXNvbjogc3RyaW5nO1xuICByZWZ1bmRDb2RlOnN0cmluZztcbiAgcmVtZXNzaW9uUGF5bWVudDpJUGF5bWVudDtcbiAgaXNSZW1pc3Npb25Db2RlRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVtaXNzaW9uQ29kZUhhc0Vycm9yOiBib29sZWFuID0gZmFsc2U7XG4gIGlzQW1vdW50RW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNSZWFzb25FbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xuICBhbW91bnRIYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1JlbWlzc2lvbkxlc3NUaGFuRmVlRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVmdW5kSGFzRXJyb3I6Ym9vbGVhbiA9IGZhbHNlO1xuICBpc1BheW1lbnRTdWNjZXNzOiBib29sZWFuID0gZmFsc2U7XG4gIGlzUmVtaXNzaW9uQXBwbGllZDogYm9vbGVhbiA9IGZhbHNlO1xuICByZW1pc3Npb25hbXQ6bnVtYmVyO1xuICBlbGVtZW50SWQ6YW55O1xuICAvLyByZWZ1bmRSZWFzb25zOiBhbnlbXSA9IFtdO1xuICBjb21tb25SZWZ1bmRSZWFzb25zOiBhbnlbXSA9IFtdO1xuICBzaG93UmVhc29uVGV4dDogYm9vbGVhbjtcbiAgaXNSZWZ1bmRSZWFzb25zU2VsZWN0ZWQ6IGJvb2xlYW47XG4gIGRlZmF1bHQ6IHN0cmluZztcbiAgcmVhc29uTGVuZ3RoOiBudW1iZXI7XG4gIHJlZnVuZFJlYXNvbnM6SVJlZnVuZFJlYXNvbnNbXTtcbiAgcGF0dGVybjE6IHN0cmluZztcbiAgcGF0dGVybjI6IHN0cmluZztcbiAgc2VuZE9yZGVyRGV0YWlsOiBhbnlbXTtcbiAgc2VuZE9yZGVyUmVmOiBzdHJpbmc7XG4gIHBheW1lbnRSZWZlcmVuY2UgOiBzdHJpbmc7XG4gIGNsYXNzPScnO1xuICBlcnJvck1zZyA9IG5ldyBBcnJheSgpO1xuICB0b3RhbFJlZnVuZEFtb3VudDogbnVtYmVyO1xuICBxdWFudGl0eVVwZGF0ZWQ6IG51bWJlcjtcbiAgZnVsbFJlZnVuZDogYm9vbGVhbjtcbiAgYWxsb3dlZFJlZnVuZEFtb3VudDogbnVtYmVyO1xuICBpc1JlbWlzc2lvbnNNYXRjaDogYm9vbGVhbjtcbiAgcGF5bWVudEZlZXM6IElGZWVbXTtcbiAgcGF5bWVudEdyb3VwOiBJUGF5bWVudEdyb3VwO1xuICBpc1N0YXR1c0FsbG9jYXRlZDogYm9vbGVhbjtcbiAgaXNGcm9tQ2hlY2tBbnNQYWdlOiBib29sZWFuO1xuICByZWZ1bmRBbXRGb3JGZWVWb2x1bWVzOiBudW1iZXI7XG4gIHBheW1lbnRPYmo6IElQYXltZW50O1xuICB0ZW1wbGF0ZUluc3RydWN0aW9uVHlwZTogc3RyaW5nO1xuICBub3RpZmljYXRpb25QcmV2aWV3OiBib29sZWFuO1xuICBcbiAgY29tcG9uZW50OiB7IGFjY291bnRfbnVtYmVyOiBzdHJpbmc7IGFtb3VudDogbnVtYmVyOyBjYXNlX3JlZmVyZW5jZTogc3RyaW5nOyBjY2RfY2FzZV9udW1iZXI6IHN0cmluZzsgY2hhbm5lbDogc3RyaW5nOyBjdXJyZW5jeTogc3RyaW5nOyBjdXN0b21lcl9yZWZlcmVuY2U6IHN0cmluZzsgZGF0ZV9jcmVhdGVkOiBzdHJpbmc7IGRhdGVfdXBkYXRlZDogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nOyBtZXRob2Q6IHN0cmluZzsgb3JnYW5pc2F0aW9uX25hbWU6IHN0cmluZzsgcGF5bWVudF9hbGxvY2F0aW9uOiBhbnlbXTsgcmVmZXJlbmNlOiBzdHJpbmc7IHNlcnZpY2VfbmFtZTogc3RyaW5nOyBzaXRlX2lkOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBwYXltZW50Vmlld1NlcnZpY2U6IFBheW1lbnRWaWV3U2VydmljZSxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2UgOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgcGF5bWVudExpYkNvbXBvbmVudDogUGF5bWVudExpYkNvbXBvbmVudCxcbiAgICBwcml2YXRlIHJlZnVuZFNlcnZpY2U6IFJlZnVuZHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgT3JkZXJzbGlzdFNlcnZpY2U6IE9yZGVyc2xpc3RTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgIHRoaXMuZXJyb3JNc2cgPSBbXTtcbiAgICB0aGlzLmRlZmF1bHQgPSAnU2VsZWN0IGEgZGlmZmVyZW50IHJlYXNvbic7XG4gICAgdGhpcy5wYXR0ZXJuMSA9ICdeKFthLXpBLVowLTldezN9KS0oW2EtekEtWjAtOV17M30pLShbYS16QS1aMC05XXszfSkkJztcbiAgICB0aGlzLnBhdHRlcm4yID0gJ14oW0EtWmEtel17Mn1bMC05XXsyfSktKFswLTldezZ9KSQnO1xuICAgIGlmKHRoaXMudmlld0NvbXBTdGF0dXMgIT09ICcnICYmIHRoaXMudmlld0NvbXBTdGF0dXMgIT09IHVuZGVmaW5lZCl7XG4gICAgICB0aGlzLnZpZXdTdGF0dXMgPSAnJztcbiAgICAgIH1cbiAgICBpZih0aGlzLnJlbWlzc2lvbikge1xuICAgIH1cbiAgICBpZih0aGlzLmZlZSkge1xuICAgIHRoaXMuYW1vdW50ID0gKHRoaXMuZmVlLnZvbHVtZSAqIHRoaXMuZmVlLmNhbGN1bGF0ZWRfYW1vdW50KTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMucGF5bWVudCl7XG4gICAgICB0aGlzLnBheW1lbnRSZWZlcmVuY2UgPSB0aGlzLnBheW1lbnQucmVmZXJlbmNlO1xuICAgICAgdGhpcy5yZW1lc3Npb25QYXltZW50ID0gdGhpcy5wYXltZW50O1xuICAgICAgaWYodGhpcy5wYXltZW50LnN0YXR1cyA9PT0gJ1N1Y2Nlc3MnKSB7XG4gICAgICAgIHRoaXMuaXNQYXltZW50U3VjY2VzcyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMub3B0aW9uID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlNFTEVDVEVEX09QVElPTjtcbiAgICB0aGlzLmJzUGF5bWVudERjbk51bWJlciA9IHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5ic3BheW1lbnRkY247XG4gICAgdGhpcy5yZW1pc3Npb25Gb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICByZW1pc3Npb25Db2RlOiBuZXcgRm9ybUNvbnRyb2woJycsXG4gICAgICAgIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgIFZhbGlkYXRvcnMucGF0dGVybihgKCR7dGhpcy5wYXR0ZXJuMX0pfCgke3RoaXMucGF0dGVybjJ9KWApXG4gICAgICBdKVxuICAgICAgKSxcbiAgICAgIGFtb3VudDogbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oJ15bMC05XSsoXFwuWzAtOV17MSwyfSk/JCcpXG4gICAgICBdKSksXG4gICAgICByZWZ1bmRSZWFzb246IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtWYWxpZGF0b3JzLnJlcXVpcmVkXSkpLFxuICAgICAgcmVmdW5kRERSZWFzb246IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtWYWxpZGF0b3JzLnJlcXVpcmVkXSkpLFxuICAgICAgcmVhc29uOiBuZXcgRm9ybUNvbnRyb2woKSxcbiAgICAgIGZlZUFtb3VudDogbmV3IEZvcm1Db250cm9sKCksXG4gICAgICBmZWVzTGlzdDogdGhpcy5mb3JtQnVpbGRlci5hcnJheShbXSlcbiAgICB9KTtcbiAgICBjb25zdCByZW1pc3Npb25jdHJscz10aGlzLnJlbWlzc2lvbkZvcm0uY29udHJvbHM7XG4gICAgcmVtaXNzaW9uY3RybHNbJ3JlZnVuZEREUmVhc29uJ10uc2V0VmFsdWUoJ1NlbGVjdCBhIGRpZmZlcmVudCByZWFzb24nLCB7b25seVNlbGY6IHRydWV9KTtcbiAgICBpZih0aGlzLnJlZnVuZFBheW1lbnRSZWZlcmVuY2UgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlZnVuZFBheW1lbnRSZWZlcmVuY2UubGVuZ3RoID4wKSB7XG4gICAgICB0aGlzLnBheW1lbnRSZWZlcmVuY2UgPSB0aGlzLnJlZnVuZFBheW1lbnRSZWZlcmVuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXltZW50UmVmZXJlbmNlID0gKHRoaXMucGF5bWVudCAhPT0gdW5kZWZpbmVkKSA/IHRoaXMucGF5bWVudC5yZWZlcmVuY2UgOiAnJzsgXG4gICAgfVxuICAgIFxuXG4gICAgaWYodGhpcy5pc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2UpIHtcbiAgICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLmdldEFwcG9ydGlvblBheW1lbnREZXRhaWxzKHRoaXMucGF5bWVudFJlZmVyZW5jZSkuc3Vic2NyaWJlKFxuICAgICAgICBwYXltZW50R3JvdXAgPT4ge1xuICAgICAgICAgIGxldCBmZWVzID0gW107XG4gICAgICAgICAgcGF5bWVudEdyb3VwLmZlZXMuZm9yRWFjaChmZWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc1JlbWlzc2lvbnNNYXRjaCA9IGZhbHNlO1xuICBcbiAgICAgICAgICAgIHBheW1lbnRHcm91cC5yZW1pc3Npb25zLmZvckVhY2gocmVtID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlbS5mZWVfY29kZSA9PT0gZmVlLmNvZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUmVtaXNzaW9uc01hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmZWVbJ3JlbWlzc2lvbnMnXSA9IHJlbTtcbiAgICAgICAgICAgICAgICBmZWVzLnB1c2goZmVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNSZW1pc3Npb25zTWF0Y2gpIHtcbiAgICAgICAgICAgICAgZmVlcy5wdXNoKGZlZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcGF5bWVudEdyb3VwLmZlZXMgPSBmZWVzXG4gICAgICAgICAgdGhpcy5wYXltZW50RmVlcyA9ZmVlcztcbiAgICAgICAgICB0aGlzLmZlZXMgPSBmZWVzO1xuICAgICAgICAgIHRoaXMucGF5bWVudEdyb3VwID0gcGF5bWVudEdyb3VwO1xuICAgICAgICAgIFxuICAgICAgICAgIHRoaXMucGF5bWVudEdyb3VwLnBheW1lbnRzID0gdGhpcy5wYXltZW50R3JvdXAucGF5bWVudHMuZmlsdGVyXG4gICAgICAgICAgICAocGF5bWVudEdyb3VwT2JqID0+IHBheW1lbnRHcm91cE9ialsncmVmZXJlbmNlJ10uaW5jbHVkZXModGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRSZWZlcmVuY2UpKTtcbiAgICAgICAgICAvLyBjb25zdCBwYXltZW50QWxsb2NhdGlvbiA9IHRoaXMucGF5bWVudEdyb3VwLnBheW1lbnRzWzBdLnBheW1lbnRfYWxsb2NhdGlvbjtcbiAgICAgICAgICAvLyB0aGlzLmlzU3RhdHVzQWxsb2NhdGVkID0gcGF5bWVudEFsbG9jYXRpb24ubGVuZ3RoID4gMCAmJiBwYXltZW50QWxsb2NhdGlvblswXS5hbGxvY2F0aW9uX3N0YXR1cyA9PT0gJ0FsbG9jYXRlZCcgfHwgcGF5bWVudEFsbG9jYXRpb24ubGVuZ3RoID09PSAwO1xuICAgICAgICAgICB0aGlzLnJlZnVuZEZlZXNMaXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcjogYW55KSA9PiB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yXG4gICAgICApO1xuICAgIH1cblxuICAgIFxuICAgIGlmICh0aGlzLmZlZXMgJiYgdGhpcy52aWV3Q29tcFN0YXR1cyA9PT0gJ2lzc3VlcmVmdW5kJykge1xuICAgICAgdGhpcy5yZWZ1bmRGZWVzTGlzdCgpO1xuICAgIH1cblxuICAgIGlmKHRoaXMudmlld0NvbXBTdGF0dXMgPT09ICcnKXtcbiAgICB0aGlzLnZpZXdTdGF0dXMgPSAnbWFpbic7XG4gICAgfVxuIFxuICAgIGlmKHRoaXMudmlld0NvbXBTdGF0dXMgPT09ICdpc3N1ZXJlZnVuZHBhZ2UxJyl7XG4gICAgICB0aGlzLnJlZnVuZFNlcnZpY2UuZ2V0UmVmdW5kUmVhc29ucygpLnN1YnNjcmliZShcbiAgICAgICAgcmVmdW5kUmVhc29ucyA9PiB7XG4gICAgICAgICAgdGhpcy5yZWZ1bmRSZWFzb25zID0gcmVmdW5kUmVhc29ucy5maWx0ZXIoKGRhdGEpID0+IGRhdGEucmVjZW50bHlfdXNlZCA9PT0gZmFsc2UpO1xuICAgICAgICAgIHRoaXMucmVmdW5kUmVhc29ucyA9IHRoaXMucmVmdW5kUmVhc29ucy5maWx0ZXIoKGRhdGEpID0+IGRhdGEubmFtZSAhPT0gJ1JldHJvc3BlY3RpdmUgcmVtaXNzaW9uJyAmJiBkYXRhLm5hbWUgIT09ICdPdmVycGF5bWVudCcpO1xuICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIHRoaXMuY29tbW9uUmVmdW5kUmVhc29ucyA9IHJlZnVuZFJlYXNvbnMuZmlsdGVyKChkYXRhKSA9PiBkYXRhLnJlY2VudGx5X3VzZWQgPT09IHRydWUpO1xuICAgICAgICAgIHRoaXMuY29tbW9uUmVmdW5kUmVhc29ucy5zb3J0KChhLCBiKSA9PiBhLnRvU3RyaW5nKCkubG9jYWxlQ29tcGFyZShiKSk7XG4gICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0gKTtcbiAgICAgICAgdGhpcy5yZWZ1bmRSZWFzb24gPSB0aGlzLmNoYW5nZVJlZnVuZFJlYXNvbjtcbiAgICB9XG5cbiAgICBpZih0aGlzLnZpZXdDb21wU3RhdHVzID09PSAncHJvY2Vzc3JldHJvcmVtaXNzb25wYWdlJyAmJiB0aGlzLmlzRnJvbVJlZnVuZExpc3RQYWdlKXtcbiAgICAgIHRoaXMudmlld1N0YXR1cyA9ICdwcm9jZXNzcmV0cm9yZW1pc3NvbnBhZ2UnO1xuICAgIH1cbiAgICBpZih0aGlzLm9yZGVyRGV0YWlsICE9PSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UuZ2V0QXBwb3J0aW9uUGF5bWVudERldGFpbHModGhpcy5vcmRlckRldGFpbFswXS5wYXltZW50c1swXS5yZWZlcmVuY2UpLnN1YnNjcmliZShcbiAgICAgICAgcGF5bWVudEdyb3VwID0+IHtcbiAgICAgIHRoaXMuZmVlcyA9IHBheW1lbnRHcm91cC5mZWVzO1xuICAgICAgdGhpcy5wYXltZW50UmVmZXJlbmNlID0gcGF5bWVudEdyb3VwLnBheW1lbnRzWzBdLnJlZmVyZW5jZTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3I6IGFueSkgPT4gdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvclxuICAgICk7XG4gICAgfVxuXG4gIH1cbiAgZ29Ub1BheW1lbnRWaWV3Q29tcG9uZW50KCkge1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5wYXltZW50TWV0aG9kID0gdGhpcy5wYXltZW50Lm1ldGhvZDtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQucGF5bWVudEdyb3VwUmVmZXJlbmNlID0gdGhpcy5wYXltZW50R3JvdXBSZWY7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRSZWZlcmVuY2UgPSB0aGlzLnBheW1lbnRSZWZlcmVuY2U7XG4gICAgLy90aGlzLlBheW1lbnRWaWV3Q29tcG9uZW50LnZpZXdDb21wU3RhdHVzID0gJ292ZXJwYXltZW50JztcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAncGF5bWVudC12aWV3JztcbiAgfVxuICByZWZ1bmRGZWVzTGlzdCgpIHtcbiAgICBjb25zdCBjcmVkcyA9IHRoaXMucmVtaXNzaW9uRm9ybS5jb250cm9scy5mZWVzTGlzdCBhcyBGb3JtQXJyYXk7XG4gIC8vIGlmKGNyZWRzLmNvbnRyb2xzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5mZWVzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgY3JlZHMucHVzaCh0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICBpZDogdGhpcy5mZWVzW2ldLmlkLFxuICAgICAgICAgIGNvZGU6IHRoaXMuZmVlc1tpXS5jb2RlLFxuICAgICAgICAgIHZvbHVtZTogdGhpcy5mZWVzW2ldLnZvbHVtZSxcbiAgICAgICAgICBjYWxjdWxhdGVkX2Ftb3VudDogdGhpcy5mZWVzW2ldLmNhbGN1bGF0ZWRfYW1vdW50LFxuICAgICAgICAgIGFwcG9ydGlvbl9hbW91bnQ6IHRoaXMuZmVlc1tpXS5hcHBvcnRpb25fYW1vdW50LFxuICAgICAgICAgIGNjZF9jYXNlX251bWJlcjogdGhpcy5mZWVzW2ldLmNjZF9jYXNlX251bWJlcixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5mZWVzW2ldLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIG5ldF9hbW91bnQ6IHRoaXMuZmVlc1tpXS5uZXRfYW1vdW50LFxuICAgICAgICAgIHZlcnNpb246IHRoaXMuZmVlc1tpXS52ZXJzaW9uLFxuICAgICAgICAgIHJlZnVuZF9hbW91bnQgOiBbJyddLFxuICAgICAgICAgIHNlbGVjdGVkOlsnJ10gLFxuICAgICAgICAgIHVwZGF0ZWRfdm9sdW1lOiB0aGlzLmZlZXNbaV0udm9sdW1lXG4gICAgICAgIH0pKTtcbiAgIH1cbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgLy99XG4gIH1cblxuICBnZXQgZmVlc0xpc3QoKVxuICB7XG4gICAgY29uc3QgZGQgPXRoaXMucmVtaXNzaW9uRm9ybS5nZXQoJ2ZlZXNMaXN0JykgYXMgRm9ybUFycmF5IDtcbiAgICByZXR1cm4gdGhpcy5yZW1pc3Npb25Gb3JtLmdldCgnZmVlc0xpc3QnKSBhcyBGb3JtQXJyYXk7XG4gIH1cblxuICBub25lU2VsZWN0ZWQoKXtcbiAgICBpZih0aGlzLmlzRnVsbHlSZWZ1bmQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoIXRoaXMuZmVlc0xpc3QuY29udHJvbHMuc29tZShpdGVtID0+IGl0ZW0uZ2V0KCdzZWxlY3RlZCcpLnZhbHVlID09PSB0cnVlKSkge1xuICAgICAgICB0aGlzLmVycm9yTXNnID0gW107XG4gICAgICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdpbmxpbmUtZXJyb3ItY2xhc3MnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gICF0aGlzLmZlZXNMaXN0LmNvbnRyb2xzLnNvbWUoaXRlbSA9PiBpdGVtLmdldCgnc2VsZWN0ZWQnKS52YWx1ZSA9PT0gdHJ1ZSk7XG4gIH1cbiAgfVxuICAgIFxuICBjaGVja19lbiAoaSx2MTogYW55LCBBcHBBbXQsVm9sdW1lKSB7XG4gICAgY29uc3QgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodjEpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgZm9ybUFycmF5ID0gdGhpcy5yZW1pc3Npb25Gb3JtLmNvbnRyb2xzLmZlZXNMaXN0IGFzIEZvcm1BcnJheTtcbiAgXG4gICAgaWYoZWxlLmNoZWNrZWQpe1xuICAgICAgZm9ybUFycmF5LmF0KGkpLmdldCgncmVmdW5kX2Ftb3VudCcpLnNldFZhbHVlKEFwcEFtdCk7XG4gICAgICBmb3JtQXJyYXkuYXQoaSkuZ2V0KCd2b2x1bWUnKS5zZXRWYWx1ZShWb2x1bWUpO1xuICAgICAgZm9ybUFycmF5LmF0KGkpLmdldCgnc2VsZWN0ZWQnKS5zZXRWYWx1ZSh0cnVlKTtcbiAgICAgIGZvcm1BcnJheS5hdChpKS5nZXQoJ3VwZGF0ZWRfdm9sdW1lJykuc2V0VmFsdWUoVm9sdW1lKTtcbiAgICAgICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVlQW1vdW50XycrdjEpKS52YWx1ZSA9IEFwcEFtdDtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmZWVBbW91bnRfJyt2MSkucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7IFxuICAgICAgaWYoVm9sdW1lID09PSAxKSB7XG4gICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVm9sdW1lVXBkYXRlZF8nK3YxKSkudmFsdWUgPSBWb2x1bWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZlZVZvbHVtZVVwZGF0ZWRfJyt2MSkpLnZhbHVlID0gVm9sdW1lO1xuICAgICAgfVxuICAgIFxuICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmZWVWb2x1bWVVcGRhdGVkXycrdjEpICE9PSBudWxsKSB7XG4gICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmZWVBbW91bnRfJyt2MSkucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7IFxuICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVlVm9sdW1lVXBkYXRlZF8nK3YxKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTsgICBcbiAgICAgIH0gICBcbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpOyBcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lcnJvck1zZyA9IFtdOyAgXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVlQW1vdW50XycrdjEpLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTsgXG4gICAgICB0aGlzLnJlbWlzc2lvbkZvcm0udmFsdWUuZmVlc0xpc3RbaV1bXCJyZWZ1bmRfYW1vdW50XCJdID0gJyc7IFxuICAgICAgdGhpcy5yZW1pc3Npb25Gb3JtLnZhbHVlLmZlZXNMaXN0W2ldW1widm9sdW1lXCJdID0gJyc7IFxuICAgICAgdGhpcy5yZW1pc3Npb25Gb3JtLnZhbHVlLmZlZXNMaXN0W2ldW1wic2VsZWN0ZWRcIl0gPSBmYWxzZTsgXG4gICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZlZUFtb3VudF8nK3YxKSkudmFsdWUgPSAnJztcbiAgICAgIGlmKFZvbHVtZT4xKSB7XG4gICAgICAgIHRoaXMucmVtaXNzaW9uRm9ybS52YWx1ZS5mZWVzTGlzdFtpXVtcInZvbHVtZVwiXSA9ICcnOyBcbiAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZlZVZvbHVtZVVwZGF0ZWRfJyt2MSkpLnZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVlVm9sdW1lVXBkYXRlZF8nK3YxKSAhPT0gbnVsbCkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZlZVZvbHVtZVVwZGF0ZWRfJyt2MSkucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7ICBcbiAgICAgIH1cbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0gIFxuICB9XG5cblxuICBhZGRSZW1pc3Npb24oKSB7XG4gICAgdGhpcy5yZXNldFJlbWlzc2lvbkZvcm0oW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLCAnQWxsJyk7XG4gICAgY29uc3QgcmVtaXNzaW9uY3RybHM9dGhpcy5yZW1pc3Npb25Gb3JtLmNvbnRyb2xzLFxuICAgICAgaXNSZW1pc3Npb25MZXNzVGhhbkZlZSA9IHRoaXMuZmVlLmNhbGN1bGF0ZWRfYW1vdW50ID4gcmVtaXNzaW9uY3RybHMuYW1vdW50LnZhbHVlO1xuICAgICAgdGhpcy5yZW1pc3Npb25Gb3JtLmNvbnRyb2xzWydyZWZ1bmRSZWFzb24nXS5zZXRFcnJvcnMobnVsbCk7XG4gICAgICB0aGlzLnJlbWlzc2lvbkZvcm0uY29udHJvbHNbJ3JlZnVuZEREUmVhc29uJ10uc2V0RXJyb3JzKG51bGwpO1xuICAgIGlmICh0aGlzLnJlbWlzc2lvbkZvcm0uZGlydHkgJiYgdGhpcy5yZW1pc3Npb25Gb3JtLnZhbGlkICYmIGlzUmVtaXNzaW9uTGVzc1RoYW5GZWUpIHtcbiAgICAgIHRoaXMudmlld1N0YXR1cyA9ICdjb25maXJtYXRpb24nO1xuICAgIH1lbHNlIHtcblxuICAgICAgaWYocmVtaXNzaW9uY3RybHNbJ3JlbWlzc2lvbkNvZGUnXS52YWx1ZSA9PSAnJyApIHtcbiAgICAgICAgdGhpcy5yZXNldFJlbWlzc2lvbkZvcm0oW3RydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sICdyZW1pc3Npb25Db2RlJyk7XG4gICAgICB9XG4gICAgICBpZihyZW1pc3Npb25jdHJsc1sncmVtaXNzaW9uQ29kZSddLnZhbHVlICE9ICcnICYmIHJlbWlzc2lvbmN0cmxzWydyZW1pc3Npb25Db2RlJ10uaW52YWxpZCApIHtcbiAgICAgICAgdGhpcy5yZXNldFJlbWlzc2lvbkZvcm0oW2ZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sICdyZW1pc3Npb25Db2RlJyk7XG4gICAgICB9XG4gICAgICBpZihyZW1pc3Npb25jdHJsc1snYW1vdW50J10udmFsdWUgPT0gJycgKSB7XG4gICAgICAgIHRoaXMucmVzZXRSZW1pc3Npb25Gb3JtKFtmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLCAnYW1vdW50Jyk7XG4gICAgICB9XG4gICAgICBpZihyZW1pc3Npb25jdHJsc1snYW1vdW50J10udmFsdWUgIT0gJycgJiYgcmVtaXNzaW9uY3RybHNbJ2Ftb3VudCddLmludmFsaWQgKSB7XG4gICAgICAgIHRoaXMucmVzZXRSZW1pc3Npb25Gb3JtKFtmYWxzZSwgdHJ1ZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZV0sICdhbW91bnQnKTtcbiAgICAgIH1cbiAgICAgIGlmKHJlbWlzc2lvbmN0cmxzLmFtb3VudC52YWxpZCAmJiAhaXNSZW1pc3Npb25MZXNzVGhhbkZlZSl7XG4gICAgICAgIHRoaXMucmVzZXRSZW1pc3Npb25Gb3JtKFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2VdLCAnYW1vdW50Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uZmlybVJlbWlzc2lvbigpIHtcbiAgICB0aGlzLmlzQ29uZmlybWF0aW9uQnRuRGlzYWJsZWQgPSB0cnVlO1xuICAgIGNvbnN0IG5ld05ldEFtb3VudCA9IHRoaXMucmVtaXNzaW9uRm9ybS5jb250cm9scy5hbW91bnQudmFsdWUsXG4gICAgIHJlbWlzc2lvbkFtb3VudCA9IHRoaXMuZmVlLm5ldF9hbW91bnQgLSBuZXdOZXRBbW91bnQsXG4gICAgIHJlcXVlc3RCb2R5ID0gbmV3IEFkZFJlbWlzc2lvblJlcXVlc3RcbiAgICAodGhpcy5jY2RDYXNlTnVtYmVyLCB0aGlzLmZlZSwgcmVtaXNzaW9uQW1vdW50LCB0aGlzLnJlbWlzc2lvbkZvcm0uY29udHJvbHMucmVtaXNzaW9uQ29kZS52YWx1ZSwgdGhpcy5jYXNlVHlwZSk7XG4gICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UucG9zdFBheW1lbnRHcm91cFdpdGhSZW1pc3Npb25zKGRlY29kZVVSSUNvbXBvbmVudCh0aGlzLnBheW1lbnRHcm91cFJlZikudHJpbSgpLCB0aGlzLmZlZS5pZCwgcmVxdWVzdEJvZHkpLnN1YnNjcmliZShcbiAgICAgIHJlc3BvbnNlID0+IHtcbiAgICAgICAgaWYgKEpTT04ucGFyc2UocmVzcG9uc2UpLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBsZXQgTERVcmwgPSB0aGlzLmlzVHVybk9mZiA/ICcmaXNUdXJuT2ZmPUVuYWJsZScgOiAnJmlzVHVybk9mZj1EaXNhYmxlJ1xuICAgICAgICAgICAgTERVcmwgKz0gYCZjYXNlVHlwZT0ke3RoaXMuY2FzZVR5cGV9YFxuICAgICAgICAgIGlmICh0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuYnNwYXltZW50ZGNuKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5yb3V0ZVJldXNlU3RyYXRlZ3kuc2hvdWxkUmV1c2VSb3V0ZSA9ICgpID0+IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIub25TYW1lVXJsTmF2aWdhdGlvbiA9ICdyZWxvYWQnO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChgL3BheW1lbnQtaGlzdG9yeS8ke3RoaXMuY2NkQ2FzZU51bWJlcn0/dmlldz1mZWUtc3VtbWFyeSZzZWxlY3RlZE9wdGlvbj0ke3RoaXMub3B0aW9ufSZwYXltZW50R3JvdXBSZWY9JHt0aGlzLnBheW1lbnRHcm91cFJlZn0mZGNuPSR7dGhpcy5wYXltZW50TGliQ29tcG9uZW50LmJzcGF5bWVudGRjbn0ke0xEVXJsfWApO1xuICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ290b0Nhc2V0cmFuc2F0aW9uUGFnZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgICAgdGhpcy5pc0NvbmZpcm1hdGlvbkJ0bkRpc2FibGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHJlc2V0UmVtaXNzaW9uRm9ybSh2YWwsIGZpZWxkKXtcbiAgICBpZiAoZmllbGQ9PT0nQWxsJyl7XG4gICAgICB0aGlzLmlzUmVtaXNzaW9uQ29kZUVtcHR5ID0gdmFsWzBdO1xuICAgICAgdGhpcy5yZW1pc3Npb25Db2RlSGFzRXJyb3IgPSB2YWxbMV07XG4gICAgICB0aGlzLmlzQW1vdW50RW1wdHkgPSB2YWxbMl07XG4gICAgICB0aGlzLmFtb3VudEhhc0Vycm9yID0gdmFsWzNdO1xuICAgICAgdGhpcy5pc1JlbWlzc2lvbkxlc3NUaGFuRmVlRXJyb3IgPSB2YWxbNF07XG4gICAgICB0aGlzLmlzUmVhc29uRW1wdHkgPSB2YWxbNV07XG4gICAgfSBlbHNlIGlmKGZpZWxkPT09J3JlbWlzc2lvbkNvZGUnIHx8IGZpZWxkPT09J0FsbCcpIHtcbiAgICAgIHRoaXMuaXNSZW1pc3Npb25Db2RlRW1wdHkgPSB2YWxbMF07XG4gICAgICB0aGlzLnJlbWlzc2lvbkNvZGVIYXNFcnJvciA9IHZhbFsxXTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkPT09J2Ftb3VudCcgfHwgZmllbGQ9PT0nQWxsJyl7XG4gICAgICB0aGlzLmlzQW1vdW50RW1wdHkgPSB2YWxbMl07XG4gICAgICB0aGlzLmFtb3VudEhhc0Vycm9yID0gdmFsWzNdO1xuICAgICAgdGhpcy5pc1JlbWlzc2lvbkxlc3NUaGFuRmVlRXJyb3IgPSB2YWxbNF07XG4gICAgfSBlbHNlIGlmIChmaWVsZD09PSdyZWFzb24nIHx8IGZpZWxkPT09J0FsbCcpe1xuICAgICAgdGhpcy5pc1JlYXNvbkVtcHR5ID0gdmFsWzVdO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCByZXRybyByZW1pc3Npb24gY2hhbmdlc1xuICBhZGRSZW1pc3Npb25Db2RlKCkge1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZmFsc2U7XG4gICAgLy8gdGhpcy5pc0Zyb21DaGVja0Fuc1BhZ2UgPSB0cnVlO1xuICAgIHRoaXMuZXJyb3JNc2cgPSBbXTtcbiAgICB0aGlzLnZpZXdTdGF0dXMgPSAnJztcbiAgICB0aGlzLmlzUmVmdW5kUmVtaXNzaW9uID0gZmFsc2U7XG4gICAgdGhpcy5yZXNldFJlbWlzc2lvbkZvcm0oW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLCAnQWxsJyk7XG4gICAgY29uc3QgcmVtaXNzaW9uY3RybHM9dGhpcy5yZW1pc3Npb25Gb3JtLmNvbnRyb2xzXG4gICAgIC8vIGlzUmVtaXNzaW9uTGVzc1RoYW5GZWUgPSB0aGlzLmZlZS5jYWxjdWxhdGVkX2Ftb3VudCA+PSByZW1pc3Npb25jdHJscy5hbW91bnQudmFsdWU7XG4gICAgICB0aGlzLnJlbWlzc2lvbkZvcm0uY29udHJvbHNbJ3JlZnVuZFJlYXNvbiddLnNldEVycm9ycyhudWxsKTtcbiAgICAgIHRoaXMucmVtaXNzaW9uRm9ybS5jb250cm9sc1sncmVmdW5kRERSZWFzb24nXS5zZXRFcnJvcnMobnVsbCk7XG4gICAgICB0aGlzLnJlbWlzc2lvbkZvcm0uY29udHJvbHNbJ2Ftb3VudCddLnNldEVycm9ycyhudWxsKTtcbiAgICBpZiAodGhpcy5yZW1pc3Npb25Gb3JtLmRpcnR5ICYmIHRoaXMucmVtaXNzaW9uRm9ybS52YWxpZCApIHtcbiAgICAgIGlmICghdGhpcy5pc0Zyb21DaGVja0Fuc1BhZ2UpIHtcbiAgICAgICAgdGhpcy52aWV3Q29tcFN0YXR1cyA9ICcnO1xuICAgICAgICB0aGlzLnZpZXdTdGF0dXMgPSBcInByb2Nlc3NyZXRyb3JlbWlzc29ucGFnZVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52aWV3Q29tcFN0YXR1cyA9ICcnO1xuICAgICAgICB0aGlzLnZpZXdTdGF0dXMgPSAnY2hlY2tyZXRyb3JlbWlzc2lvbnBhZ2UnO1xuICAgICAgfVxuICAgICAgXG4gICAgfWVsc2Uge1xuXG4gICAgICBpZihyZW1pc3Npb25jdHJsc1sncmVtaXNzaW9uQ29kZSddLnZhbHVlID09ICcnICkge1xuICAgICAgICB0aGlzLnJlc2V0UmVtaXNzaW9uRm9ybShbdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLCAncmVtaXNzaW9uQ29kZScpO1xuICAgICAgfVxuICAgICAgaWYocmVtaXNzaW9uY3RybHNbJ3JlbWlzc2lvbkNvZGUnXS52YWx1ZSAhPSAnJyAmJiByZW1pc3Npb25jdHJsc1sncmVtaXNzaW9uQ29kZSddLmludmFsaWQgKSB7XG4gICAgICAgIHRoaXMucmVzZXRSZW1pc3Npb25Gb3JtKFtmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sICdyZW1pc3Npb25Db2RlJyk7XG4gICAgICB9XG4gICAgICBpZihyZW1pc3Npb25jdHJsc1snYW1vdW50J10udmFsdWUgPT0gJycgKSB7XG4gICAgICAgIHRoaXMucmVzZXRSZW1pc3Npb25Gb3JtKFtmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZV0sICdhbW91bnQnKTtcbiAgICAgIH1cbiAgICAgIGlmKHJlbWlzc2lvbmN0cmxzWydhbW91bnQnXS52YWx1ZSAhPSAnJyAmJiByZW1pc3Npb25jdHJsc1snYW1vdW50J10uaW52YWxpZCApIHtcbiAgICAgICAgdGhpcy5yZXNldFJlbWlzc2lvbkZvcm0oW2ZhbHNlLCB0cnVlLCBmYWxzZSwgdHJ1ZSwgZmFsc2VdLCAnYW1vdW50Jyk7XG4gICAgICB9XG4gICAgICBpZihyZW1pc3Npb25jdHJsc1sncmVhc29uJ10udmFsdWUgPT0gJycpIHtcbiAgICAgICAgdGhpcy5yZXNldFJlbWlzc2lvbkZvcm0oW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCB0cnVlXSwgJ3JlYXNvbicpO1xuICAgICAgfVxuICAgICAgaWYocmVtaXNzaW9uY3RybHMuYW1vdW50LnZhbGlkKXtcbiAgICAgICAgdGhpcy5yZXNldFJlbWlzc2lvbkZvcm0oW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlXSwgJ2Ftb3VudCcpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cblxuICBnb3RvQWRkUmV0cm9SZW1pc3Npb25Db2RlUGFnZSgpIHtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNGcm9tQ2hlY2tBbnNQYWdlID0gZmFsc2U7XG4gICAgdGhpcy5lcnJvck1zZyA9IFtdO1xuICAgIGlmKHRoaXMuaXNSZWZ1bmRSZW1pc3Npb24pIHtcbiAgICAgIHRoaXMucmVmdW5kTGlzdEFtb3VudC5lbWl0KCk7XG4gICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNGcm9tUmVmdW5kU3RhdHVzUGFnZSA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICggdGhpcy5pc0Zyb21SZWZ1bmRMaXN0UGFnZSApIHtcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc2NhbmNlbENsaWNrZWQgPSB0cnVlO1xuICAgICAgdGhpcy5yZWZ1bmRMaXN0UmVhc29uLmVtaXQoe3JlYXNvbjogdGhpcy5zZWxlY3RlZFJlZnVuZFJlYXNvbiwgY29kZTogdGhpcy5yZWZ1bmRSZWFzb259KTtcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc0Zyb21SZWZ1bmRTdGF0dXNQYWdlID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJyc7XG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gJ3llcyc7XG4gICAgdGhpcy52aWV3Q29tcFN0YXR1cyA9IFwiYWRkcmVtaXNzaW9uXCI7XG4gICAgdGhpcy5pc1JlZnVuZFJlbWlzc2lvbiA9IHRydWU7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnJztcbiAgICB0aGlzLmVycm9yTXNnID0gW107XG4gICAgaWYodGhpcy5pc0Zyb21QYXltZW50RGV0YWlsUGFnZSkge1xuICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ3BheW1lbnQtdmlldyc7XG4gICAgfVxuICB9XG5cbiAgZ290b0NoZWNrUmV0cm9SZW1pc3Npb25QYWdlKHBheW1lbnQ6IElQYXltZW50KSB7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzY2FuY2VsQ2xpY2tlZCA9IGZhbHNlO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgdGhpcy5yZXNldFJlbWlzc2lvbkZvcm0oW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sICdBbGwnKTtcbiAgICBpZiggIXRoaXMuaXNSZWZ1bmRSZW1pc3Npb24pIHtcbiAgICB2YXIgcmVtaXNzaW9uY3RybHM9dGhpcy5yZW1pc3Npb25Gb3JtLmNvbnRyb2xzLFxuICAgICAgaXNSZW1pc3Npb25MZXNzVGhhbkZlZSA9IHRoaXMuZmVlLmNhbGN1bGF0ZWRfYW1vdW50ID49IHJlbWlzc2lvbmN0cmxzLmFtb3VudC52YWx1ZTtcbiAgICBpZiAodGhpcy5yZW1pc3Npb25Gb3JtLmRpcnR5ICkge1xuICAgICAgaWYocmVtaXNzaW9uY3RybHNbJ2Ftb3VudCddLnZhbHVlID09ICcnIHx8IHJlbWlzc2lvbmN0cmxzWydhbW91bnQnXS52YWx1ZSA8IDApIHtcbiAgICAgICAgdGhpcy5yZXNldFJlbWlzc2lvbkZvcm0oW2ZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlXSwgJ2Ftb3VudCcpO1xuICAgICAgfSBlbHNlIGlmKHJlbWlzc2lvbmN0cmxzWydhbW91bnQnXS52YWx1ZSAhPSAnJyAmJiByZW1pc3Npb25jdHJsc1snYW1vdW50J10uaW52YWxpZCApIHtcbiAgICAgICAgdGhpcy5yZXNldFJlbWlzc2lvbkZvcm0oW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlXSwgJ2Ftb3VudCcpO1xuICAgICAgfSBlbHNlIGlmKHJlbWlzc2lvbmN0cmxzLmFtb3VudC52YWxpZCAmJiAhaXNSZW1pc3Npb25MZXNzVGhhbkZlZSl7XG4gICAgICAgIHRoaXMucmVzZXRSZW1pc3Npb25Gb3JtKFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZV0sICdhbW91bnQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy52aWV3Q29tcFN0YXR1cyA9ICcnO1xuICAgICAgICAgIHRoaXMudmlld1N0YXR1cyA9IFwiY2hlY2tyZXRyb3JlbWlzc2lvbnBhZ2VcIjtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIHJlbWlzc2lvbmN0cmxzPXRoaXMucmVtaXNzaW9uRm9ybS5jb250cm9scztcbiAgICAvL2lmICh0aGlzLnJlbWlzc2lvbkZvcm0uZGlydHkgKSB7XG4gICAgICBpZihyZW1pc3Npb25jdHJsc1snYW1vdW50J10udmFsdWUgPT0gJycgfHwgcmVtaXNzaW9uY3RybHNbJ2Ftb3VudCddLnZhbHVlIDwgMCApIHtcbiAgICAgICAgdGhpcy5yZXNldFJlbWlzc2lvbkZvcm0oW2ZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlXSwgJ2Ftb3VudCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZpZXdDb21wU3RhdHVzID0gJyc7XG4gICAgICAgICAgdGhpcy52aWV3U3RhdHVzID0gXCJjaGVja3JldHJvcmVtaXNzaW9ucGFnZVwiO1xuICAgICAgICAgIHRoaXMucmVmdW5kTGlzdEFtb3VudC5lbWl0KHJlbWlzc2lvbmN0cmxzWydhbW91bnQnXS52YWx1ZSk7XG4gICAgICB9XG4gICAgLy99XG5cbiAgfVxuICB9XG4gIGdvdG9BbW91bnRSZXRyb1JlbWlzc2lvbigpIHtcbiAgICB0aGlzLmlzRnJvbUNoZWNrQW5zUGFnZSA9IGZhbHNlO1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICdwcm9jZXNzcmV0cm9yZW1pc3NvbnBhZ2UnO1xuICAgIHRoaXMudmlld0NvbXBTdGF0dXMgPSAnJztcbiAgICAvLyB0aGlzLmlzUmVmdW5kUmVtaXNzaW9uID0gdHJ1ZTtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICB9XG4gIGdvdG9Qcm9jZXNzUmV0cm9SZW1pc3Npb25QYWdlKCkge1xuICAgIHRoaXMuaXNGcm9tQ2hlY2tBbnNQYWdlID0gdHJ1ZTtcbiAgICB0aGlzLnZpZXdTdGF0dXMgPSAnJztcbiAgICB0aGlzLnZpZXdDb21wU3RhdHVzID0gJ2FkZHJlbWlzc2lvbic7XG4gICAgdGhpcy5pc1JlZnVuZFJlbWlzc2lvbiA9IHRydWU7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnJztcbiAgICB0aGlzLmVycm9yTXNnID0gW107XG4gIH1cblxuICBnb3RvUHJvY2Vzc1JldHJvUmVtaXNzaW9uKG5vdGU/OiBJUmVmdW5kQ29udGFjdERldGFpbHMpIHtcbiAgICBpZihub3RlKSB7XG4gICAgICB0aGlzLm5vdGlmaWNhdGlvbiA9IHsgY29udGFjdF9kZXRhaWxzOiBub3RlLCBub3RpZmljYXRpb25fdHlwZTogbm90ZS5ub3RpZmljYXRpb25fdHlwZSB9O1xuICAgIH1cbiAgICB0aGlzLmlzRnJvbUNoZWNrQW5zUGFnZSA9IHRydWU7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJ3JlbWlzc2lvbkFkZHJlc3NQYWdlJztcbiAgICB0aGlzLnZpZXdDb21wU3RhdHVzID0gJyc7XG4gICAgdGhpcy5pc1JlZnVuZFJlbWlzc2lvbiA9IHRydWU7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnJztcbiAgfVxuXG4gIGNvbmZpcm1SZXRyb1JlbWlzc2lvbigpIHtcbiAgICBpZighdGhpcy5pc0NvbmZpcm1hdGlvbkJ0bkRpc2FibGVkKSB7XG4gICAgdGhpcy5yZXRyb1JlbWlzc2lvbiA9IHRydWU7XG4gICAgdGhpcy5yZW1pc3Npb25hbXQgPSB0aGlzLnJlbWlzc2lvbkZvcm0uY29udHJvbHMuYW1vdW50LnZhbHVlO1xuICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gbmV3IEFkZFJldHJvUmVtaXNzaW9uUmVxdWVzdCh0aGlzLnJlbWlzc2lvbmFtdCx0aGlzLnJlbWlzc2lvbkZvcm0uY29udHJvbHMucmVtaXNzaW9uQ29kZS52YWx1ZSApXG4gICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UucG9zdFBheW1lbnRHcm91cFdpdGhSZXRyb1JlbWlzc2lvbnMoZGVjb2RlVVJJQ29tcG9uZW50KHRoaXMucGF5bWVudEdyb3VwUmVmKS50cmltKCksIHRoaXMuZmVlLmlkLCByZXF1ZXN0Qm9keSkuc3Vic2NyaWJlKFxuICAgICAgcmVzcG9uc2UgPT4ge1xuICAgICAgICBpZiAoSlNPTi5wYXJzZShyZXNwb25zZSkpIHtcbiAgICAgICAgICB0aGlzLmlzUmVtaXNzaW9uQXBwbGllZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy52aWV3Q29tcFN0YXR1cyAgPSAnJztcbiAgICAgICAgICB0aGlzLnZpZXdTdGF0dXMgPSAncmV0cm9yZW1pc3Npb25jb25maXJtYXRpb25wYWdlJztcbiAgICAgICAgICB0aGlzLnJlbWlzc2lvblJlZmVyZW5jZSA9SlNPTi5wYXJzZShyZXNwb25zZSkucmVtaXNzaW9uX3JlZmVyZW5jZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3I7XG4gICAgICAgIHRoaXMuaXNDb25maXJtYXRpb25CdG5EaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NSZWZ1bmQoKSB7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnJztcbiAgICB0aGlzLmVycm9yTXNnID0gW107XG4gICAgdGhpcy5pc0NvbmZpcm1hdGlvbkJ0bkRpc2FibGVkID0gdHJ1ZTtcbiAgICBpZiggdGhpcy5pc1JlZnVuZFJlbWlzc2lvbikge1xuICAgICAgdGhpcy5yZXRyb1JlbWlzc2lvbiA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLnJlbWlzc2lvblJlZmVyZW5jZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucmVtaXNzaW9uUmVmZXJlbmNlID09PSAnJykge1xuICAgICAgdGhpcy5yZW1pc3Npb25SZWZlcmVuY2UgPSB0aGlzLnJlbWlzc2lvbi5yZW1pc3Npb25fcmVmZXJlbmNlO1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0Qm9keSA9IG5ldyBQb3N0SXNzdWVSZWZ1bmRSZXRyb1JlbWlzc2lvbih0aGlzLnJlbWlzc2lvblJlZmVyZW5jZSwgdGhpcy5jb250YWN0RGV0YWlsc09iaik7XG4gICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UucG9zdFJlZnVuZFJldHJvUmVtaXNzaW9uKHJlcXVlc3RCb2R5KS5zdWJzY3JpYmUoXG4gICAgICAgIHJlc3BvbnNlID0+IHtcbiAgICAgIGlmIChKU09OLnBhcnNlKHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgdGhpcy52aWV3Q29tcFN0YXR1cyAgPSAnJztcbiAgICAgICAgICAgIHRoaXMudmlld1N0YXR1cyA9ICdyZWZ1bmRjb25maXJtYXRpb25wYWdlJztcbiAgICAgICAgICAgIHRoaXMucmVmdW5kUmVmZXJlbmNlID0gSlNPTi5wYXJzZShyZXNwb25zZSkucmVmdW5kX3JlZmVyZW5jZTtcbiAgICAgICAgICAgIHRoaXMucmVmdW5kQW1vdW50ID0gSlNPTi5wYXJzZShyZXNwb25zZSkucmVmdW5kX2Ftb3VudDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3I7XG4gICAgICAgIHRoaXMuaXNDb25maXJtYXRpb25CdG5EaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgfSlcbiAgfVxuXG4gIC8vIElzc3VlIFJlZnVuZCBjaGFuZ2VzXG5cbiAgZ290b0lzc3VlUmVmdW5kQ29uZmlybWF0aW9uKHBheW1lbnQ6IElQYXltZW50KSB7XG4gICBcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNjYW5jZWxDbGlja2VkID0gZmFsc2U7XG4gICAgaWYodGhpcy5wYXltZW50TGliQ29tcG9uZW50LlJFRlVORExJU1QgPT09IFwidHJ1ZVwiKSB7XG4gICAgICB0aGlzLmlzRnJvbVJlZnVuZExpc3RQYWdlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLnRvdGFsUmVmdW5kQW1vdW50ID0gdGhpcy5yZW1pc3Npb25Gb3JtLnZhbHVlLmZlZXNMaXN0LnJlZHVjZSgoYSwgYykgPT4gYSArIGMucmVmdW5kX2Ftb3VudCAqIGMuc2VsZWN0ZWQsIDApO1xuXG5cbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgIHRoaXMuZXJyb3JNc2cgPSBbXTtcbiAgICB0aGlzLnJlZnVuZFJlYXNvbiA9IHRoaXMucmVtaXNzaW9uRm9ybS5jb250cm9sc1sncmVmdW5kUmVhc29uJ10udmFsdWUgPT09IG51bGwgPyB0aGlzLnJlbWlzc2lvbkZvcm0uY29udHJvbHNbJ3JlZnVuZEREUmVhc29uJ10udmFsdWUgOiB0aGlzLnJlbWlzc2lvbkZvcm0uY29udHJvbHNbJ3JlZnVuZFJlYXNvbiddLnZhbHVlO1xuICAgIGlmKCF0aGlzLnJlZnVuZFJlYXNvbiB8fCB0aGlzLnJlZnVuZFJlYXNvbiA9PT0gJ1NlbGVjdCBhIGRpZmZlcmVudCByZWFzb24nKSB7XG4gICAgICB0aGlzLnJlZnVuZEhhc0Vycm9yID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYodGhpcy5zZWxlY3RlZFJlZnVuZFJlYXNvbi5pbmNsdWRlcygnT3RoZXInKSAmJiAodGhpcy5yZW1pc3Npb25Gb3JtLmNvbnRyb2xzWydyZWFzb24nXS52YWx1ZSA9PSAnJyB8fCB0aGlzLnJlbWlzc2lvbkZvcm0uY29udHJvbHNbJ3JlYXNvbiddLnZhbHVlID09IG51bGwpKSB7XG4gICAgICAgIHRoaXMucmVzZXRSZW1pc3Npb25Gb3JtKFtmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgdHJ1ZV0sICdyZWFzb24nKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWRSZWZ1bmRSZWFzb24uaW5jbHVkZXMoJ090aGVyJykgJiYgdGhpcy5yZW1pc3Npb25Gb3JtLmNvbnRyb2xzWydyZWFzb24nXS52YWx1ZSAhPT0gJycpIHtcbiAgICAgIHRoaXMucmVmdW5kSGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVmdW5kUmVhc29uICs9ICAnLScgKyB0aGlzLnJlbWlzc2lvbkZvcm0uY29udHJvbHNbJ3JlYXNvbiddLnZhbHVlO1xuICAgICAgdGhpcy5kaXNwbGF5UmVmdW5kUmVhc29uID0gdGhpcy5zZWxlY3RlZFJlZnVuZFJlYXNvbiArICctJyArIHRoaXMucmVtaXNzaW9uRm9ybS5jb250cm9sc1sncmVhc29uJ10udmFsdWU7XG4gICAgICBpZiAoIHRoaXMuaXNGcm9tUmVmdW5kTGlzdFBhZ2UgKSB7XG4gICAgICAgIHRoaXMucmVmdW5kTGlzdFJlYXNvbi5lbWl0KHtyZWFzb246IHRoaXMuZGlzcGxheVJlZnVuZFJlYXNvbiwgY29kZTogdGhpcy5yZWZ1bmRSZWFzb259KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKHRoaXMuaXNGcm9tQ2hlY2tBbnNQYWdlKSB7XG4gICAgICAgICAgdGhpcy50b3RhbFJlZnVuZEFtb3VudCA9IHRoaXMucmVtaXNzaW9uRm9ybS52YWx1ZS5mZWVzTGlzdC5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLnJlZnVuZF9hbW91bnQgKiBjLnNlbGVjdGVkLCAwKTtcbiAgICAgICAgICB0aGlzLmlzRnJvbUNoZWNrQW5zUGFnZSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMudmlld1N0YXR1cyA9ICdjaGVja2lzc3VlcmVmdW5kcGFnZSc7XG4gICAgICAgICAgdGhpcy52aWV3Q29tcFN0YXR1cyA9ICcnO1xuICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uUHJldmlldyA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZpZXdDb21wU3RhdHVzID0gJyc7XG4gICAgICAgIHRoaXMudmlld1N0YXR1cyA9ICdjb250YWN0RGV0YWlsc1BhZ2UnO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzcGxheVJlZnVuZFJlYXNvbiA9IHRoaXMuc2VsZWN0ZWRSZWZ1bmRSZWFzb247XG4gICAgICBpZih0aGlzLmlzRnJvbUNoZWNrQW5zUGFnZSkge1xuICAgICAgICB0aGlzLnRvdGFsUmVmdW5kQW1vdW50ID0gdGhpcy5yZW1pc3Npb25Gb3JtLnZhbHVlLmZlZXNMaXN0LnJlZHVjZSgoYSwgYykgPT4gYSArIGMucmVmdW5kX2Ftb3VudCAqIGMuc2VsZWN0ZWQsIDApO1xuICAgICAgICB0aGlzLmlzRnJvbUNoZWNrQW5zUGFnZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpZXdTdGF0dXMgPSAnY2hlY2tpc3N1ZXJlZnVuZHBhZ2UnO1xuICAgICAgICB0aGlzLnZpZXdDb21wU3RhdHVzID0gJyc7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uUHJldmlldyA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIHRoaXMuaXNGcm9tUmVmdW5kTGlzdFBhZ2UgKSB7XG4gICAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc0Zyb21SZWZ1bmRTdGF0dXNQYWdlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWZ1bmRMaXN0UmVhc29uLmVtaXQoe3JlYXNvbjogdGhpcy5zZWxlY3RlZFJlZnVuZFJlYXNvbiwgY29kZTogdGhpcy5yZWZ1bmRSZWFzb259KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmlld0NvbXBTdGF0dXMgPSAnJztcbiAgICAgICAgdGhpcy52aWV3U3RhdHVzID0gJ2NvbnRhY3REZXRhaWxzUGFnZSc7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBnb3RvSXNzdWVSZWZ1bmRQYWdlKCkge1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgdGhpcy52aWV3Q29tcFN0YXR1cyA9ICdpc3N1ZXJlZnVuZCc7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJyc7XG4gICAgdGhpcy5pc1JlZnVuZFJlbWlzc2lvbiA9IHRydWU7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBmYWxzZTtcbiAgICB0aGlzLmVycm9yTXNnID0gW107XG4gICAgdGhpcy5yZWZ1bmRIYXNFcnJvciA9IGZhbHNlO1xuICAgIHRoaXMuaXNSZWFzb25FbXB0eSA9IGZhbHNlO1xuICB9XG5cbiAgZ290b0lzc3VlUGFnZShpc0Z1bGx5UmVmdW5kOiBhbnkpe1xuaWYoaXNGdWxseVJlZnVuZCkge1xuICB0aGlzLnZpZXdDb21wU3RhdHVzID0gJ2lzc3VlcmVmdW5kcGFnZTEnO1xuICB0aGlzLmdldFJlZnVuZFJlYXNvbnMoKTtcbn0gZWxzZSB7XG4gICAgW10uZm9yRWFjaC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JyksIGZ1bmN0aW9uIChlbCkge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaW5saW5lLWVycm9yLWNsYXNzJyk7XG4gICAgfSk7XG5cblx0ICB2YXIgY2hlY2tib3hzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0Jyk7XG5cdCAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnJztcbiAgICB0aGlzLnRvdGFsUmVmdW5kQW1vdW50ID0gMDtcbiAgICB0aGlzLmVycm9yTXNnID0gW107ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHRmb3IgKHZhciBqPTA7ajxjaGVja2JveHMubGVuZ3RoO2orKylcblx0XHRcdHtcblx0XHRcdFx0aWYoY2hlY2tib3hzW2pdLmNoZWNrZWQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLmZ1bGxSZWZ1bmQgPSBmYWxzZTtcblx0XHRcdFx0XHRsZXQgcXVhbnRpdHk6IG51bWJlciA9ICsoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZlZVZvbHVtZV8nK2NoZWNrYm94c1tqXS52YWx1ZSkpLnZhbHVlO1xuICAgICAgICAgIGxldCBhbW91bnRUb1JlZnVuZDogbnVtYmVyID0gKyg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVlQW1vdW50XycrY2hlY2tib3hzW2pdLnZhbHVlKSkudmFsdWU7XG5cdFx0XHRcdFx0bGV0IGFwcG9ydGlvbkFtb3VudDogbnVtYmVyID0gKyg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVlQXBwb3J0aW9uQW1vdW50XycrY2hlY2tib3hzW2pdLnZhbHVlKSkudmFsdWU7XG5cdFx0XHRcdFx0bGV0IGNhbGN1bGF0ZWRBbW91bnQ6IG51bWJlciA9ICsoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0ZWRBbW91bnRfJytjaGVja2JveHNbal0udmFsdWUpKS52YWx1ZTsgXG4gICAgICAgICBcbiAgICAgICAgICBpZiggYW1vdW50VG9SZWZ1bmQgPT09IGFwcG9ydGlvbkFtb3VudCkge1xuICAgICAgICAgICAgdGhpcy5mdWxsUmVmdW5kID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZihhbW91bnRUb1JlZnVuZCA9PT0gMCl7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRJZCA9ICdmZWVBbW91bnRfJytjaGVja2JveHNbal0udmFsdWU7XG4gICAgICAgICAgICB0aGlzLmVycm9yTXNnLnB1c2goJ1lvdSBuZWVkIHRvIGVudGVyIGEgcmVmdW5kIGFtb3VudCcpO1xuICAgICAgICAgICAgdGhpcy5nZXRFcnJvckNsYXNzKHRoaXMuZWxlbWVudElkKTtcblx0XHRcdFx0XHR9XG5cbiAgICAgICAgIFxuXG4gICAgICAgICAgaWYgKHF1YW50aXR5ID09PSAxKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmKGFtb3VudFRvUmVmdW5kID4gMCAmJiBhbW91bnRUb1JlZnVuZCA+IGFwcG9ydGlvbkFtb3VudCl7XG4gICAgICAgICAgICAgIHRoaXMuZWxlbWVudElkID0gJ2ZlZUFtb3VudF8nK2NoZWNrYm94c1tqXS52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZy5wdXNoKCdUaGUgYW1vdW50IHlvdSB3YW50IHRvIHJlZnVuZCBpcyBtb3JlIHRoYW4gdGhlIGFtb3VudCBwYWlkJyk7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0RXJyb3JDbGFzcyh0aGlzLmVsZW1lbnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBcblxuXHRcdFx0XHRcdGlmKHF1YW50aXR5ID4gMSkge1xuXG5cdFx0XHRcdFx0XHR0aGlzLnF1YW50aXR5VXBkYXRlZCA9ICsoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZlZVZvbHVtZVVwZGF0ZWRfJytjaGVja2JveHNbal0udmFsdWUpKS52YWx1ZTtcblxuICAgICAgICAgICAgaWYodGhpcy5xdWFudGl0eVVwZGF0ZWQgPT09IDApe1xuICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRJZCA9ICdmZWVWb2x1bWVVcGRhdGVkXycrY2hlY2tib3hzW2pdLnZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnLnB1c2goJ1lvdSBuZWVkIHRvIGVudGVyIHF1YW50aXR5JylcbiAgICAgICAgICAgICAgdGhpcy5nZXRFcnJvckNsYXNzKHRoaXMuZWxlbWVudElkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZnVsbFJlZnVuZCAmJiBxdWFudGl0eSAhPT0gdGhpcy5xdWFudGl0eVVwZGF0ZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5lbGVtZW50SWQgPSAnZmVlVm9sdW1lVXBkYXRlZF8nK2NoZWNrYm94c1tqXS52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZy5wdXNoKCdUaGUgcXVhbnRpdHkgeW91IHdhbnQgdG8gcmVmdW5kIHNob3VsZCBiZSBtYXhpbXVuIGF2YWlsYWJsZSBxdWFudGl0eScpO1xuICAgICAgICAgICAgICB0aGlzLmdldEVycm9yQ2xhc3ModGhpcy5lbGVtZW50SWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZnVsbFJlZnVuZCAmJiB0aGlzLnF1YW50aXR5VXBkYXRlZCA+IDAgJiYgYW1vdW50VG9SZWZ1bmQgPiAwKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVmdW5kQW10Rm9yRmVlVm9sdW1lcyA9ICsoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZlZVZPbF8nK2NoZWNrYm94c1tqXS52YWx1ZSkpLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgdGhpcy5hbGxvd2VkUmVmdW5kQW1vdW50ID0gdGhpcy5xdWFudGl0eVVwZGF0ZWQgKiB0aGlzLnJlZnVuZEFtdEZvckZlZVZvbHVtZXM7XG4gICAgICAgICAgICAgIGlmKCB0aGlzLmFsbG93ZWRSZWZ1bmRBbW91bnQgIT09IGFtb3VudFRvUmVmdW5kKSBcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudElkID0gJ2ZlZUFtb3VudF8nK2NoZWNrYm94c1tqXS52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnLnB1c2goJ1RoZSBBbW91bnQgdG8gUmVmdW5kIHNob3VsZCBiZSBlcXVhbCB0byB0aGUgcHJvZHVjdCBvZiBGZWUgQW1vdW50IGFuZCBxdWFudGl0eScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RXJyb3JDbGFzcyh0aGlzLmVsZW1lbnRJZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIXRoaXMuZnVsbFJlZnVuZCAmJiBhbW91bnRUb1JlZnVuZCA+IGFwcG9ydGlvbkFtb3VudClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGhpcy5lbGVtZW50SWQgPSAnZmVlQW1vdW50XycrY2hlY2tib3hzW2pdLnZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnLnB1c2goJ1RoZSBhbW91bnQgeW91IHdhbnQgdG8gcmVmdW5kIGlzIG1vcmUgdGhhbiB0aGUgYW1vdW50IHBhaWQnKTtcbiAgICAgICAgICAgICAgdGhpcy5nZXRFcnJvckNsYXNzKHRoaXMuZWxlbWVudElkKTtcbiAgICAgICAgICAgIH1cblx0XG4gICAgICAgICAgICBpZiggIXRoaXMuZnVsbFJlZnVuZCAmJiB0aGlzLnF1YW50aXR5VXBkYXRlZCA+MCAmJiB0aGlzLnF1YW50aXR5VXBkYXRlZCA+IHF1YW50aXR5KXtcbiAgICAgICAgICAgICAgdGhpcy5lbGVtZW50SWQgPSAnZmVlVm9sdW1lVXBkYXRlZF8nK2NoZWNrYm94c1tqXS52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZy5wdXNoKCdUaGUgcXVhbnRpdHkgeW91IHdhbnQgdG8gcmVmdW5kIGlzIG1vcmUgdGhhbiB0aGUgYXZhaWxhYmxlIHF1YW50aXR5Jyk7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0RXJyb3JDbGFzcyh0aGlzLmVsZW1lbnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy90aGlzLnJlbWlzc2lvbkZvcm0udmFsdWUuZmVlc0xpc3QuZmluZChpZD0+aWQ9Y2hlY2tib3hzW2pdLnZhbHVlKVsncmVmdW5kX2Ftb3VudCddID0gYXBwb3J0aW9uQW1vdW50O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cbiAgICAgIGlmKHRoaXMuZXJyb3JNc2cubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRnJvbUNoZWNrQW5zUGFnZSkge1xuICAgICAgICAgIHRoaXMuaXNGcm9tQ2hlY2tBbnNQYWdlID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy50b3RhbFJlZnVuZEFtb3VudCA9IHRoaXMucmVtaXNzaW9uRm9ybS52YWx1ZS5mZWVzTGlzdC5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLnJlZnVuZF9hbW91bnQgKiBjLnNlbGVjdGVkLCAwKTtcbiAgICAgICAgICB0aGlzLmZlZXMgPSB0aGlzLnJlbWlzc2lvbkZvcm0udmFsdWUuZmVlc0xpc3QuZmlsdGVyKHZhbHVlID0+IHZhbHVlLnNlbGVjdGVkPT09dHJ1ZSk7XG4gICAgICAgICAgdGhpcy52aWV3U3RhdHVzID0gJ2NoZWNraXNzdWVyZWZ1bmRwYWdlJ1xuICAgICAgICAgIHRoaXMudmlld0NvbXBTdGF0dXMgPSAnJztcbiAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXcgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0Zyb21SZWZ1bmRTdGF0dXNQYWdlKXtcbiAgICAgICAgICB2YXIgcmVtaXNzaW9uY3RybHM9dGhpcy5yZW1pc3Npb25Gb3JtLmNvbnRyb2xzO1xuICAgICAgICAgIHRoaXMudG90YWxSZWZ1bmRBbW91bnQgPSB0aGlzLnJlbWlzc2lvbkZvcm0udmFsdWUuZmVlc0xpc3QucmVkdWNlKChhLCBjKSA9PiBhICsgYy5yZWZ1bmRfYW1vdW50ICogYy5zZWxlY3RlZCwgMCk7XG4gICAgICAgICAgdGhpcy5yZWZ1bmRMaXN0QW1vdW50LmVtaXQodGhpcy50b3RhbFJlZnVuZEFtb3VudC50b1N0cmluZygpKTtcbiAgICAgICAgICB0aGlzLmZlZXMgPSB0aGlzLnJlbWlzc2lvbkZvcm0udmFsdWUuZmVlc0xpc3QuZmlsdGVyKHZhbHVlID0+IHZhbHVlLnNlbGVjdGVkPT09dHJ1ZSk7XG4gICAgICAgICAgdGhpcy5yZWZ1bmRGZWVzLmVtaXQodGhpcy5mZWVzKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52aWV3Q29tcFN0YXR1cyA9ICdpc3N1ZXJlZnVuZHBhZ2UxJztcbiAgICAgICAgdGhpcy5nZXRSZWZ1bmRSZWFzb25zKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2FsQW10VG9SZWZ1bmQodmFsdWUsYW1vdW50LHZvbHVtZSwgaTogYW55KSB7XG4gICAgIGNvbnN0IHZvbHVtZUZlZSA9IGFtb3VudC92b2x1bWU7XG4gICAgIGNvbnN0IGFtdFRvUmVmdW5kID0gdmFsdWUgKiB2b2x1bWVGZWU7XG4gICAgIGNvbnN0IGZvcm1BcnJheSA9IHRoaXMucmVtaXNzaW9uRm9ybS5jb250cm9scy5mZWVzTGlzdCBhcyBGb3JtQXJyYXk7XG4gICAgIGZvcm1BcnJheS5hdChpKS5nZXQoJ3JlZnVuZF9hbW91bnQnKS5zZXRWYWx1ZShhbXRUb1JlZnVuZCk7XG4gICAgLy8gZm9ybUFycmF5LmF0KGkpLmdldCgndm9sdW1lJykuc2V0VmFsdWUodmFsdWUpO1xuICAgLy8gICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVlQW1vdW50XycraSkpLnZhbHVlID0gK2FtdFRvUmVmdW5kO1xuICAgIC8vICBjb25zdCBmb3JtQ29udHJvbCA9IHRoaXMucmVtaXNzaW9uRm9ybS5jb250cm9scy5mZWVzTGlzdFsndm9sdW1lJ10uYXQoaSk7XG4gICAgLy8gIGZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlKTtcblxuICB9XG4gIGdvdG9Db250YWN0RGV0YWlsc1BhZ2Uobm90ZT86IElSZWZ1bmRDb250YWN0RGV0YWlscykge1xuICAgIGlmIChub3RlKSB7XG4gICAgICB0aGlzLm5vdGlmaWNhdGlvbiA9IHsgY29udGFjdF9kZXRhaWxzOiBub3RlLCBub3RpZmljYXRpb25fdHlwZTogbm90ZS5ub3RpZmljYXRpb25fdHlwZSB9O1xuICAgIH1cbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgIHRoaXMudmlld0NvbXBTdGF0dXMgPSAnJztcbiAgICB0aGlzLnZpZXdTdGF0dXMgPSAnY29udGFjdERldGFpbHNQYWdlJztcbiAgICB0aGlzLmlzUmVmdW5kUmVtaXNzaW9uID0gdHJ1ZTtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGZhbHNlO1xuICB9XG4gIFxuICBnZXRSZWZ1bmRSZWFzb25zKCl7XG4gIGlmKHRoaXMudmlld0NvbXBTdGF0dXMgPT09ICdpc3N1ZXJlZnVuZHBhZ2UxJyl7XG4gICAgdGhpcy5yZWZ1bmRTZXJ2aWNlLmdldFJlZnVuZFJlYXNvbnMoKS5zdWJzY3JpYmUoXG4gICAgICByZWZ1bmRSZWFzb25zID0+IHsgXG4gICAgICAgIHRoaXMucmVmdW5kUmVhc29ucyA9IHJlZnVuZFJlYXNvbnMuZmlsdGVyKChkYXRhKSA9PiBkYXRhLnJlY2VudGx5X3VzZWQgPT09IGZhbHNlKTtcbiAgICAgICAgdGhpcy5yZWZ1bmRSZWFzb25zID0gdGhpcy5yZWZ1bmRSZWFzb25zLmZpbHRlcigoZGF0YSkgPT4gZGF0YS5uYW1lICE9PSAnUmV0cm9zcGVjdGl2ZSByZW1pc3Npb24nKTtcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIHRoaXMuY29tbW9uUmVmdW5kUmVhc29ucyA9IHJlZnVuZFJlYXNvbnMuZmlsdGVyKChkYXRhKSA9PiBkYXRhLnJlY2VudGx5X3VzZWQgPT09IHRydWUpO1xuICAgICAgICB0aGlzLmNvbW1vblJlZnVuZFJlYXNvbnMuc29ydCgoYSwgYikgPT4gYS50b1N0cmluZygpLmxvY2FsZUNvbXBhcmUoYikpO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0gKTtcbiAgfVxufVxuICAgZ2V0RXJyb3JDbGFzcyhlbGVtZW50SWQpIHtcbiAgICAgaWYodGhpcy5lcnJvck1zZy5sZW5ndGggPiAwKSB7XG4gICAgICAgY29uc3QgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgICAgICBlbGUuY2xhc3NMaXN0LmFkZCgnaW5saW5lLWVycm9yLWNsYXNzJyk7XG4gICAgIH1cbiAgICAgIFxuICB9XG5cbiAgY2hhbmdlSXNzdWVSZWZ1bmRSZWFzb24oKSB7XG4gICAgdGhpcy5pc0Zyb21DaGVja0Fuc1BhZ2UgPSB0cnVlO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgdGhpcy5lcnJvck1zZyA9IFtdO1xuICAgIHRoaXMucmVmdW5kSGFzRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmVhc29uRW1wdHkgPSBmYWxzZTtcbiAgICB0aGlzLnZpZXdDb21wU3RhdHVzID0gJ2lzc3VlcmVmdW5kcGFnZTEnO1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICcnO1xuICAgIHRoaXMuaXNSZWZ1bmRSZW1pc3Npb24gPSB0cnVlO1xuICB9XG5cbiAgY29uZmlybUlzc3VlUmVmdW5kKGlzRnVsbHlSZWZ1bmQ6IGFueSkge1xuICAgIHRoaXMuaXNDb25maXJtYXRpb25CdG5EaXNhYmxlZCA9IHRydWU7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnJztcbiAgICB0aGlzLmVycm9yTXNnID0gW107XG4gICAgaWYoIHRoaXMuaXNSZWZ1bmRSZW1pc3Npb24pIHtcbiAgICAgIHRoaXMucmV0cm9SZW1pc3Npb24gPSB0cnVlO1xuICAgIH1cbiAgICBpZihpc0Z1bGx5UmVmdW5kKSB7XG4gICAgICB0aGlzLnRvdGFsUmVmdW5kQW1vdW50ID0gdGhpcy5wYXltZW50LmFtb3VudDtcbiAgICB9XG4gICAgaWYoIWlzRnVsbHlSZWZ1bmQpIHtcbiAgICAgIHRoaXMuZmVlcyA9IHRoaXMucmVtaXNzaW9uRm9ybS52YWx1ZS5mZWVzTGlzdC5maWx0ZXIodmFsdWUgPT4gdmFsdWUuc2VsZWN0ZWQ9PT10cnVlKTtcbiAgICB9XG4gICAgdGhpcy5mZWVzICA9IHRoaXMuZmVlcy5tYXAob2JqID0+ICh7IGlkOiBvYmouaWQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IG9iai5jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb246b2JqLnZlcnNpb24sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcG9ydGlvbl9hbW91bnQ6IG9iai5hcHBvcnRpb25fYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRfYW1vdW50OiBvYmouY2FsY3VsYXRlZF9hbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZF92b2x1bWU6IG9iai51cGRhdGVkX3ZvbHVtZSA/IG9iai51cGRhdGVkX3ZvbHVtZSA6IG9iai52b2x1bWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmdW5kX2Ftb3VudDpvYmoucmVmdW5kX2Ftb3VudCA/IG9iai5yZWZ1bmRfYW1vdW50IDogdGhpcy50b3RhbFJlZnVuZEFtb3VudCB9KSk7XG4gXG4gIFxuICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gbmV3IFBvc3RSZWZ1bmRSZXRyb1JlbWlzc2lvbih0aGlzLmNvbnRhY3REZXRhaWxzT2JqLCB0aGlzLmZlZXMsdGhpcy5wYXltZW50LnJlZmVyZW5jZSwgdGhpcy5yZWZ1bmRSZWFzb24sIFxuICAgICAgdGhpcy50b3RhbFJlZnVuZEFtb3VudCwgJ29wJyk7XG4gICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UucG9zdFJlZnVuZHNSZWFzb24ocmVxdWVzdEJvZHkpLnN1YnNjcmliZShcbiAgICAgIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBpZiAoSlNPTi5wYXJzZShyZXNwb25zZSkpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0NvbXBTdGF0dXMgID0gJyc7XG4gICAgICAgICAgICB0aGlzLnZpZXdTdGF0dXMgPSAncmVmdW5kY29uZmlybWF0aW9ucGFnZSc7XG4gICAgICAgICAgICB0aGlzLnJlZnVuZFJlZmVyZW5jZSA9SlNPTi5wYXJzZShyZXNwb25zZSkucmVmdW5kX3JlZmVyZW5jZTtcbiAgICAgICAgICAgIGlmKEpTT04ucGFyc2UocmVzcG9uc2UpLnJlZnVuZF9hbW91bnQpIHtcbiAgICAgICAgICAgIHRoaXMucmVmdW5kQW1vdW50ID0gSlNPTi5wYXJzZShyZXNwb25zZSkucmVmdW5kX2Ftb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgICAgdGhpcy5pc0NvbmZpcm1hdGlvbkJ0bkRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgfVxuXG4gIGdvdG9SZWZ1bmRSZWFzb25QYWdlICgpIHtcbiAgICB0aGlzLnZpZXdTdGF0dXMgPSAnJztcbiAgICB0aGlzLnZpZXdDb21wU3RhdHVzID0gJ2lzc3VlcmVmdW5kcGFnZTEnO1xuICAgIFxuICB9XG5cbi8vIFJldHJvIFJlZnVuZFxuXG4gIC8vIGNvbmZpcm1SZXRyb1JlZnVuZCgpIHtcbiAgLy8gICB0aGlzLmlzQ29uZmlybWF0aW9uQnRuRGlzYWJsZWQgPSB0cnVlO1xuICAvLyAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG4gIC8vICAgdGhpcy5lcnJvck1zZyA9IFtdO1xuICAvLyAgIGlmKCB0aGlzLmlzUmVmdW5kUmVtaXNzaW9uKSB7XG4gIC8vICAgICB0aGlzLnJldHJvUmVtaXNzaW9uID0gdHJ1ZTtcbiAgLy8gICB9XG5cbiAgLy8gICBjb25zdCByZXF1ZXN0Qm9keSA9IG5ldyBQb3N0UmVmdW5kUmV0cm9SZW1pc3Npb24odGhpcy5wYXltZW50LnJlZmVyZW5jZSwnUlIwMDQtUmV0cm9zcGVjdGl2ZSByZW1pc3Npb24nLCB0aGlzLmNvbnRhY3REZXRhaWxzT2JqKTtcbiAgLy8gICB0aGlzLnBheW1lbnRWaWV3U2VydmljZS5wb3N0UmVmdW5kc1JlYXNvbihyZXF1ZXN0Qm9keSkuc3Vic2NyaWJlKFxuICAvLyAgICAgcmVzcG9uc2UgPT4ge1xuICAvLyAgICAgICAgIGlmIChKU09OLnBhcnNlKHJlc3BvbnNlKSkge1xuICAvLyAgICAgICAgICAgdGhpcy52aWV3Q29tcFN0YXR1cyAgPSAnJztcbiAgLy8gICAgICAgICAgIHRoaXMudmlld1N0YXR1cyA9ICdyZXRyb3JlZnVuZGNvbmZpcm1hdGlvbnBhZ2UnO1xuICAvLyAgICAgICAgICAgdGhpcy5yZWZ1bmRSZWZlcmVuY2UgPUpTT04ucGFyc2UocmVzcG9uc2UpLnJlZnVuZF9yZWZlcmVuY2U7XG4gIC8vICAgICAgICAgICBpZihKU09OLnBhcnNlKHJlc3BvbnNlKS5yZWZ1bmRfYW1vdW50KSB7XG4gIC8vICAgICAgICAgICAgIHRoaXMucmVmdW5kQW1vdW50ID0gSlNPTi5wYXJzZShyZXNwb25zZSkucmVmdW5kX2Ftb3VudDtcbiAgLy8gICAgICAgICAgICAgfVxuICAvLyAgICAgICAgIH1cbiAgLy8gICAgIH0sXG4gIC8vICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAvLyAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yO1xuICAvLyAgICAgICB0aGlzLmlzQ29uZmlybWF0aW9uQnRuRGlzYWJsZWQgPSBmYWxzZTtcbiAgLy8gICAgIH0pO1xuICAvLyB9XG5cbiAgc2VsZWN0UmFkaW9CdXR0b24oa2V5LCB2YWx1ZSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibXlyYWRpb1wiLCB2YWx1ZSk7XG4gICAgY29uc3QgcmVtaXNzaW9uY3RybHM9dGhpcy5yZW1pc3Npb25Gb3JtLmNvbnRyb2xzO1xuICAgIHJlbWlzc2lvbmN0cmxzWydyZWZ1bmRERFJlYXNvbiddLnNldFZhbHVlKCdTZWxlY3QgYSBkaWZmZXJlbnQgcmVhc29uJywge29ubHlTZWxmOiB0cnVlfSk7XG4gICAgcmVtaXNzaW9uY3RybHNbJ3JlYXNvbiddLnJlc2V0KCk7XG4gICAgdGhpcy5pc1JlZnVuZFJlYXNvbnNTZWxlY3RlZCA9IHRydWU7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBmYWxzZTtcbiAgICB0aGlzLmVycm9yTXNnID0gW107XG4gICAgdGhpcy5pc1JlYXNvbkVtcHR5ID0gZmFsc2U7XG4gICAgdGhpcy5zaG93UmVhc29uVGV4dCA9IGZhbHNlO1xuICAgIHRoaXMucmVmdW5kSGFzRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGVkUmVmdW5kUmVhc29uID0gdmFsdWU7XG4gICAgdGhpcy5zZWxlY3RlZFJlZnVuZFJlYXNvbkNvZGUgPSBrZXk7XG4gICAgaWYodGhpcy5zZWxlY3RlZFJlZnVuZFJlYXNvbi5pbmNsdWRlcygnT3RoZXInKSkge1xuICAgICAgdGhpcy5zaG93UmVhc29uVGV4dCA9IHRydWU7XG4gICAgICB0aGlzLnJlZnVuZEhhc0Vycm9yID0gZmFsc2U7XG4gICAgICB0aGlzLnJlZnVuZFJlYXNvbiA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdGNoYW5nZShhcmdzKSB7XG4gICAgY29uc3QgcmVtaXNzaW9uY3RybHM9dGhpcy5yZW1pc3Npb25Gb3JtLmNvbnRyb2xzO1xuICAgIHJlbWlzc2lvbmN0cmxzWydyZWZ1bmRSZWFzb24nXS5yZXNldCgpO1xuICAgIHJlbWlzc2lvbmN0cmxzWydyZWFzb24nXS5yZXNldCgpO1xuICAgIHRoaXMuaXNSZWZ1bmRSZWFzb25zU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dSZWFzb25UZXh0ID0gZmFsc2U7XG4gICAgdGhpcy5yZWZ1bmRIYXNFcnJvciA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWRSZWZ1bmRSZWFzb24gPSBhcmdzLnRhcmdldC5vcHRpb25zW2FyZ3MudGFyZ2V0Lm9wdGlvbnMuc2VsZWN0ZWRJbmRleF0uaWQ7XG4gICAgdGhpcy5zZWxlY3RlZFJlZnVuZFJlYXNvbkNvZGUgPSBhcmdzLnRhcmdldC5vcHRpb25zW2FyZ3MudGFyZ2V0Lm9wdGlvbnMuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICAgdGhpcy5yZWFzb25MZW5ndGggPSAoMjktdGhpcy5zZWxlY3RlZFJlZnVuZFJlYXNvbi5zcGxpdCgnLSAnKVsxXS5sZW5ndGgpO1xuXG4gICAgaWYodGhpcy5zZWxlY3RlZFJlZnVuZFJlYXNvbi5pbmNsdWRlcygnT3RoZXInKSkge1xuICAgICAgdGhpcy5zaG93UmVhc29uVGV4dCA9IHRydWU7XG4gICAgICB0aGlzLnJlZnVuZEhhc0Vycm9yID0gZmFsc2U7XG4gICAgICB0aGlzLnJlZnVuZFJlYXNvbiA9IGFyZ3MudGFyZ2V0Lm9wdGlvbnNbYXJncy50YXJnZXQub3B0aW9ucy5zZWxlY3RlZEluZGV4XS5pZDtcbiAgICB9XG5cblxuICB9XG4gIGdldENvbnRhY3REZXRhaWxzKG9iajpJUmVmdW5kQ29udGFjdERldGFpbHMsIHR5cGUpIHtcbiAgICB0aGlzLmNvbnRhY3REZXRhaWxzT2JqID0gb2JqO1xuICAgIHRoaXMudmlld0NvbXBTdGF0dXMgPSAnJztcbiAgICB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXcgPSBmYWxzZTtcbiAgICBpZih0eXBlID09ICdjaGVja2FkZFJlZnVuZHBhZ2UnKXtcbiAgICAgIHRoaXMuZ2V0VGVtcGxhdGVJbnN0cnVjdGlvblR5cGUodGhpcy5yZW1lc3Npb25QYXltZW50LnJlZmVyZW5jZSx0aGlzLnJlbWVzc2lvblBheW1lbnQpO1xuICAgIH1lbHNlIGlmICh0eXBlID09ICdjaGVja2lzc3VlcmVmdW5kcGFnZScpe1xuICAgICAgdGhpcy5nZXRUZW1wbGF0ZUluc3RydWN0aW9uVHlwZSh0aGlzLnBheW1lbnQucmVmZXJlbmNlLCB0aGlzLnBheW1lbnQpO1xuICAgIH1lbHNlIGlmKHR5cGUgPT0gJ2FkZHJlZnVuZGNoZWNrYW5kYW5zd2VyJyl7XG4gICAgICB0aGlzLmdldFRlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlKHRoaXMucGF5bWVudFJlZmVyZW5jZSwgdGhpcy5wYXltZW50T2JqKTtcbiAgICB9XG4gICAgdGhpcy52aWV3U3RhdHVzID0gdHlwZTtcbiAgfVxuXG4gIGdvdG9QYXJ0aWFsRmVlUmVmdW5kU2NyZWVuKCkge1xuXG4gICAgaWYgKHRoaXMuaXNGcm9tUmVmdW5kU3RhdHVzUGFnZSl7XG4gICAgICB2YXIgcmVtaXNzaW9uY3RybHM9dGhpcy5yZW1pc3Npb25Gb3JtLmNvbnRyb2xzO1xuICAgICAgdGhpcy5yZWZ1bmRMaXN0UmVhc29uLmVtaXQoe3JlYXNvbjogdGhpcy5kaXNwbGF5UmVmdW5kUmVhc29uLCBjb2RlOiB0aGlzLnJlZnVuZFJlYXNvbn0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlZnVuZEhhc0Vycm9yID0gZmFsc2U7XG4gICAgdGhpcy52aWV3Q29tcFN0YXR1cyAgPSAnaXNzdWVyZWZ1bmQnO1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICcnO1xuICB9XG5cbiAgXG5cbiAgZ290b1NlcnZpY2VSZXF1ZXN0UGFnZShldmVudDogYW55KSB7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPScnO1xuICAgIHRoaXMuZXJyb3JNc2cgPSBbXTtcbiAgICB0aGlzLmlzRnJvbUNoZWNrQW5zUGFnZSA9IGZhbHNlO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGhpcy5pc0Zyb21SZWZ1bmRTdGF0dXNQYWdlKXtcbiAgICAgIHZhciByZW1pc3Npb25jdHJscz10aGlzLnJlbWlzc2lvbkZvcm0uY29udHJvbHM7XG4gICAgICB0aGlzLnRvdGFsUmVmdW5kQW1vdW50ID0gMDtcbiAgICAgIHRoaXMucmVmdW5kTGlzdEFtb3VudC5lbWl0KHRoaXMudG90YWxSZWZ1bmRBbW91bnQudG9TdHJpbmcoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZSAmJiAhdGhpcy5pc0Zyb21QYXltZW50RGV0YWlsUGFnZSkge1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICdvcmRlci1mdWxsLXZpZXcnO1xuICAgIHRoaXMudmlld0NvbXBTdGF0dXMgPSAnJztcbiAgICB9IGVsc2UgaWYgKCB0aGlzLmlzRnJvbVJlZnVuZExpc3RQYWdlICkge1xuICAgICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNjYW5jZWxDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWZ1bmRMaXN0UmVhc29uLmVtaXQoe3JlYXNvbjogdGhpcy5zZWxlY3RlZFJlZnVuZFJlYXNvbiwgY29kZTogdGhpcy5yZWZ1bmRSZWFzb259KTtcbiAgICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzRnJvbVJlZnVuZFN0YXR1c1BhZ2UgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQucGF5bWVudE1ldGhvZCA9IHRoaXMucGF5bWVudC5tZXRob2Q7XG4gICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQucGF5bWVudEdyb3VwUmVmZXJlbmNlID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRHcm91cFJlZmVyZW5jZVxuICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRSZWZlcmVuY2UgPSB0aGlzLnBheW1lbnQucmVmZXJlbmNlO1xuICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ3BheW1lbnQtdmlldyc7XG4gICAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldE9yZGVyUmVmKHRoaXMub3JkZXJSZWYpO1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRvcmRlckNDREV2ZW50KHRoaXMub3JkZXJDQ0RFdmVudCk7XG4gICAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldG9yZGVyQ3JlYXRlZCh0aGlzLm9yZGVyQ3JlYXRlZCk7XG4gICAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldG9yZGVyRGV0YWlsKHRoaXMub3JkZXJEZXRhaWwpO1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRvcmRlclBhcnR5KHRoaXMub3JkZXJQYXJ0eSk7XG4gICAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldG9yZGVyVG90YWxQYXltZW50cyh0aGlzLm9yZGVyVG90YWxQYXltZW50cyk7XG4gICAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldG9yZGVyUmVtaXNzaW9uVG90YWwodGhpcy5vcmRlclJlbWlzc2lvblRvdGFsKTtcbiAgICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0b3JkZXJGZWVzVG90YWwodGhpcy5vcmRlckZlZXNUb3RhbCk7XG4gICAgICB0aGlzLnZpZXdTdGF0dXMgPSAncGF5bWVudC12aWV3JztcbiAgICAgIHRoaXMuc2VuZE9yZGVyRGV0YWlsID0gdGhpcy5vcmRlckRldGFpbDtcbiAgICAgIHRoaXMuc2VuZE9yZGVyUmVmID0gdGhpcy5vcmRlclJlZjtcbiAgICAgIGlmKHRoaXMuTE9HR0VESU5VU0VSUk9MRVMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLmdldFVzZXJSb2xlc0xpc3QoKS5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMuTE9HR0VESU5VU0VSUk9MRVMgPSBkYXRhKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudmlld0NvbXBTdGF0dXMgPSAnJztcbiAgICB9XG5cbiAgfVxuICBnb3RvQWRkcmVzc1BhZ2Uobm90ZT86IElSZWZ1bmRDb250YWN0RGV0YWlscykge1xuICAgIGlmIChub3RlKSB7XG4gICAgICB0aGlzLm5vdGlmaWNhdGlvbiA9IHsgY29udGFjdF9kZXRhaWxzOiBub3RlLCBub3RpZmljYXRpb25fdHlwZTogbm90ZS5ub3RpZmljYXRpb25fdHlwZSB9O1xuICAgIH1cbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgIHRoaXMudmlld0NvbXBTdGF0dXMgPSAnYWRkcmVmdW5kZm9ycmVtaXNzaW9uJztcbiAgICB0aGlzLnZpZXdTdGF0dXMgPSAnJztcbiAgICB0aGlzLmlzUmVmdW5kUmVtaXNzaW9uID0gdHJ1ZTtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGZhbHNlO1xuICB9XG4gIGdvdG9SZW1pc3Npb25TdWNjZXNzKGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnJztcbiAgICB0aGlzLnZpZXdDb21wU3RhdHVzID0gJyc7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJ3JldHJvcmVtaXNzaW9uY29uZmlybWF0aW9ucGFnZSc7XG4gICAgdGhpcy5pc1JlZnVuZFJlbWlzc2lvbiA9IHRydWU7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBmYWxzZTtcbiAgfVxuXG4gIGdvdG9DYXNldHJhbnNhdGlvblBhZ2UoKSB7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRuYXZpZ2F0aW9uUGFnZSgnY2FzZXRyYW5zYWN0aW9ucycpO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgdGhpcy5lcnJvck1zZyA9IFtdO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC52aWV3TmFtZSA9ICdjYXNlLXRyYW5zYWN0aW9ucyc7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlZJRVcgPSAnY2FzZS10cmFuc2FjdGlvbnMnO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5JU1RVUk5PRkYgPSB0aGlzLmlzVHVybk9mZjtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNGcm9tU2VydmljZVJlcXVlc3RQYWdlID0gdHJ1ZTtcbiAgICB0aGlzLnJlc2V0T3JkZXJEYXRhKCk7XG4gICAgbGV0IHBhcnRVcmwgPSB0aGlzLmJzUGF5bWVudERjbk51bWJlciA/IGAmZGNuPSR7dGhpcy5ic1BheW1lbnREY25OdW1iZXJ9YCA6ICcnO1xuICAgICBwYXJ0VXJsICs9IHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5JU0JTRU5BQkxFID8gJyZpc0J1bGtTY2FubmluZz1FbmFibGUnIDogJyZpc0J1bGtTY2FubmluZz1EaXNhYmxlJztcbiAgICAgcGFydFVybCArPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNUVVJOT0ZGID8gJyZpc1R1cm5PZmY9RW5hYmxlJyA6ICcmaXNUdXJuT2ZmPURpc2FibGUnO1xuICAgICBwYXJ0VXJsICs9IHRoaXMuaXNTdHJhdGVnaWNGaXhFbmFibGUgPyAnJmlzU3RGaXhFbmFibGU9RW5hYmxlJyA6ICcmaXNTdEZpeEVuYWJsZT1EaXNhYmxlJztcbiAgICAgcGFydFVybCArPSBgJmNhc2VUeXBlPSR7dGhpcy5jYXNlVHlwZX1gO1xuICAgIGNvbnN0IHVybCA9IGAvcGF5bWVudC1oaXN0b3J5LyR7dGhpcy5jY2RDYXNlTnVtYmVyfT92aWV3PWNhc2UtdHJhbnNhY3Rpb25zJnRha2VQYXltZW50PSR7dGhpcy5wYXltZW50TGliQ29tcG9uZW50LlRBS0VQQVlNRU5UfSZzZWxlY3RlZE9wdGlvbj0ke3RoaXMub3B0aW9ufSR7cGFydFVybH1gO1xuICAgIHRoaXMucm91dGVyLnJvdXRlUmV1c2VTdHJhdGVneS5zaG91bGRSZXVzZVJvdXRlID0gKCkgPT4gZmFsc2U7XG4gICAgdGhpcy5yb3V0ZXIub25TYW1lVXJsTmF2aWdhdGlvbiA9ICdyZWxvYWQnO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodXJsKTtcbiAgfVxuXG4gIGdvdG9DYXNldHJhbnNhdGlvblBhZ2VDYW5jZWxCdG5DbGlja2VkKGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5lcnJvck1zZyA9IFtdO1xuICAgIGlmKCB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNGcm9tU2VydmljZVJlcXVlc3RQYWdlICE9PSB1bmRlZmluZWQgJiYgIXRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2UpIHtcbiAgICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0bmF2aWdhdGlvblBhZ2UoJ2Nhc2V0cmFuc2FjdGlvbnMnKTtcbiAgICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0aXNGcm9tU2VydmljZVJlcXVlc3RQYWdlKGZhbHNlKTtcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5WSUVXID0nY2FzZS10cmFuc2FjdGlvbnMnO1xuICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ2Nhc2UtdHJhbnNhY3Rpb25zJztcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5JU0JTRU5BQkxFID0gdHJ1ZTtcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc1JlZnVuZFN0YXR1c1ZpZXcgPSBmYWxzZTtcbiAgICB9IGVsc2UgeyAgXG5cbiAgICBpZiAodGhpcy5wYXltZW50TGliQ29tcG9uZW50LlJFRlVORExJU1QpIHtcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC52aWV3TmFtZSA9ICdyZWZ1bmQtbGlzdCc7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuU0VSVklDRVJFUVVFU1QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlNFUlZJQ0VSRVFVRVNUID0gJ2ZhbHNlJztcbiAgICB9XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRpc0Zyb21TZXJ2aWNlUmVxdWVzdFBhZ2UoZmFsc2UpO1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0cGF5bWVudFBhZ2VWaWV3KHttZXRob2Q6ICcnLHBheW1lbnRfZ3JvdXBfcmVmZXJlbmNlOiAnJywgcmVmZXJlbmNlOicnfSk7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRuYXZpZ2F0aW9uUGFnZSgnY2FzZXRyYW5zYWN0aW9ucycpO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ2Nhc2UtdHJhbnNhY3Rpb25zJztcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNUVVJOT0ZGID0gdGhpcy5pc1R1cm5PZmY7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZSA9IHRydWU7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTQlNFTkFCTEUgPSB0cnVlO1xuICAgIGxldCBwYXJ0VXJsID0gdGhpcy5ic1BheW1lbnREY25OdW1iZXIgPyBgJmRjbj0ke3RoaXMuYnNQYXltZW50RGNuTnVtYmVyfWAgOiAnJztcbiAgICAgcGFydFVybCArPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNCU0VOQUJMRSA/ICcmaXNCdWxrU2Nhbm5pbmc9RW5hYmxlJyA6ICcmaXNCdWxrU2Nhbm5pbmc9RGlzYWJsZSc7XG4gICAgIHBhcnRVcmwgKz0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTVFVSTk9GRiA/ICcmaXNUdXJuT2ZmPUVuYWJsZScgOiAnJmlzVHVybk9mZj1EaXNhYmxlJztcbiAgICAgcGFydFVybCArPSB0aGlzLmlzU3RyYXRlZ2ljRml4RW5hYmxlID8gJyZpc1N0Rml4RW5hYmxlPUVuYWJsZScgOiAnJmlzU3RGaXhFbmFibGU9RGlzYWJsZSc7XG4gICAgIHBhcnRVcmwgKz0gYCZjYXNlVHlwZT0ke3RoaXMuY2FzZVR5cGV9YDtcbiAgICAgaWYodGhpcy5pc0Zyb21QYXltZW50RGV0YWlsUGFnZSkge1xuICAgICAgIHBhcnRVcmwgKz0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzRnJvbVBheW1lbnREZXRhaWxQYWdlXG4gICAgIH1cblxuICAgICBpZighdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlNFUlZJQ0VSRVFVRVNUKSB7XG4gICAgICBjb25zdCB1cmwgPSBgL3BheW1lbnQtaGlzdG9yeS8ke3RoaXMuY2NkQ2FzZU51bWJlcn0/dmlldz1jYXNlLXRyYW5zYWN0aW9ucyZ0YWtlUGF5bWVudD0ke3RoaXMucGF5bWVudExpYkNvbXBvbmVudC5UQUtFUEFZTUVOVH0mc2VsZWN0ZWRPcHRpb249JHt0aGlzLm9wdGlvbn0ke3BhcnRVcmx9YDtcbiAgICAgIHRoaXMucm91dGVyLnJvdXRlUmV1c2VTdHJhdGVneS5zaG91bGRSZXVzZVJvdXRlID0gKCkgPT4gZmFsc2U7XG4gICAgICB0aGlzLnJvdXRlci5vblNhbWVVcmxOYXZpZ2F0aW9uID0gJ3JlbG9hZCc7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHVybCk7XG4gICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1cmwgPWAvcGF5bWVudC1oaXN0b3J5LyR7dGhpcy5jY2RDYXNlTnVtYmVyfT9zZWxlY3RlZE9wdGlvbj0ke3RoaXMub3B0aW9ufSR7cGFydFVybH1gO1xuICAgICAgdGhpcy5yb3V0ZXIucm91dGVSZXVzZVN0cmF0ZWd5LnNob3VsZFJldXNlUm91dGUgPSAoKSA9PiBmYWxzZTtcbiAgICAgIHRoaXMucm91dGVyLm9uU2FtZVVybE5hdmlnYXRpb24gPSAncmVsb2FkJztcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodXJsKTtcbiAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgcmVzZXRPcmRlckRhdGEoKSB7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRPcmRlclJlZihudWxsKTtcbiAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldG9yZGVyQ0NERXZlbnQobnVsbCk7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRvcmRlckNyZWF0ZWQobnVsbCk7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRvcmRlckRldGFpbChudWxsKTtcbiAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldG9yZGVyUGFydHkobnVsbCk7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRvcmRlclRvdGFsUGF5bWVudHMobnVsbCk7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRvcmRlclJlbWlzc2lvblRvdGFsKG51bGwpO1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0b3JkZXJGZWVzVG90YWwobnVsbCk7XG4gIH1cblxuICBjaGFuZ2VSZWZ1bmRBbW91bnQoKSB7ICBcbiAgICB0aGlzLmlzRnJvbUNoZWNrQW5zUGFnZSA9IHRydWU7XG4gICAgdGhpcy52aWV3Q29tcFN0YXR1cyA9ICdpc3N1ZXJlZnVuZCc7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJyc7XG4gIH1cblxuICBnZXRGb3JtYXR0ZWRDdXJyZW5jeShjdXJyZW5jeTpudW1iZXIpe1xuICAgIGlmKGN1cnJlbmN5LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCIuXCIpKXtcbiAgICAgIHJldHVybiBjdXJyZW5jeVxuICAgIH1cbiAgICAgcmV0dXJuIGN1cnJlbmN5LnRvU3RyaW5nKCkuY29uY2F0KFwiLjAwXCIpO1xuICB9XG5cbiAgc2hvd05vdGlmaWNhdGlvblByZXZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3ID0gdHJ1ZTtcbiAgfVxuXG4gIGhpZGVOb3RpZmljYXRpb25QcmV2aWV3KCk6IHZvaWQge1xuICAgIHRoaXMubm90aWZpY2F0aW9uUHJldmlldyA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0VGVtcGxhdGVJbnN0cnVjdGlvblR5cGUocGF5bWVudFJlZmVyZW5jZTogc3RyaW5nLCBwYXltZW50PzogSVBheW1lbnQpOiB2b2lkIHtcblxuICBpZiAocGF5bWVudCA9PSB1bmRlZmluZWQgfHwgcGF5bWVudCA9PSBudWxsIHx8IHBheW1lbnQucmVmZXJlbmNlICE9IHBheW1lbnRSZWZlcmVuY2UpIHtcbiAgICB0aGlzLnBheW1lbnRWaWV3U2VydmljZS5nZXRQYXltZW50RGV0YWlscyhwYXltZW50UmVmZXJlbmNlKS5zdWJzY3JpYmUoXG4gICAgICBwYXltZW50ID0+IHtcbiAgICAgICAgdGhpcy5wYXltZW50T2JqID0gcGF5bWVudDtcbiAgICAgICAgdGhpcy5wYXltZW50T2JqLnJlZmVyZW5jZSA9IHBheW1lbnRSZWZlcmVuY2U7XG4gICAgICAgIHRoaXMudGVtcGxhdGVJbnN0cnVjdGlvblR5cGUgPSB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZ2V0Tm90aWZpY2F0aW9uSW5zdHJ1Y3Rpb25UeXBlKHRoaXMucGF5bWVudE9iai5jaGFubmVsLCB0aGlzLnBheW1lbnRPYmoubWV0aG9kKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3I6IGFueSkgPT4geyBcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUluc3RydWN0aW9uVHlwZSA9ICdUZW1wbGF0ZSc7XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlID0gdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmdldE5vdGlmaWNhdGlvbkluc3RydWN0aW9uVHlwZShwYXltZW50LmNoYW5uZWwsIHBheW1lbnQubWV0aG9kKTtcbiAgICB9XG4gIH1cblxufVxuIiwiPGRpdiBjbGFzcz1cImFkZC1yZW1pc3Npb24gcGFnZXNpemVcIj5cbiAgPGRpdiAqbmdJZj1cImVycm9yTWVzc2FnZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJlcnJvci1zdW1tYXJ5XCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZmFpbHVyZS1lcnJvci1zdW1tYXJ5LWhlYWRpbmdcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICA8aDIgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bSBlcnJvci1zdW1tYXJ5LWhlYWRpbmdcIiBpZD1cImZhaWx1cmUtZXJyb3Itc3VtbWFyeS1oZWFkaW5nXCI+XG4gICAgICAgIEVycm9yIGluIHByb2Nlc3NpbmcgdGhlIHJlcXVlc3RcbiAgICAgIDwvaDI+XG4gICAgICA8ZGl2ICBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX2JvZHlcIj5cbiAgICAgICAge3sgZXJyb3JNZXNzYWdlIH19XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJlcnJvck1zZy5sZW5ndGggPiAwXCI+XG4gICAgPGRpdiBjbGFzcz1cImVycm9yLXN1bW1hcnlcIiByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsbGVkYnk9XCJmYWlsdXJlLWVycm9yLXN1bW1hcnktaGVhZGluZ1wiIHRhYmluZGV4PVwiLTFcIj5cbiAgICAgIDxoMiBjbGFzcz1cImhlYWRpbmctbWVkaXVtIGVycm9yLXN1bW1hcnktaGVhZGluZ1wiIGlkPVwiZmFpbHVyZS1lcnJvci1zdW1tYXJ5LWhlYWRpbmdcIj5cbiAgICAgICAgRXJyb3IgaW4gcHJvY2Vzc2luZyB0aGUgcmVxdWVzdFxuICAgICAgPC9oMj5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGVyciBvZiBlcnJvck1zZzsgbGV0IGkgPSBpbmRleFwiIGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fYm9keVwiPlxuICAgICAgIFxuICAgICAgICA8bGk+e3tlcnJ9fTwvbGk+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3U3RhdHVzID09PSAnbWFpbicgJiYgIWlzUmVmdW5kUmVtaXNzaW9uIFwiPlxuICAgIDxpbnB1dCAjbXlJbnB1dCB0eXBlPSdoaWRkZW4nIGlkPSdpRnJhbWVEcml2ZW5JbWFnZVZhbHVlJyB2YWx1ZT0nQUREUkVNSVNTSU9OJz5cbiAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLWxhcmdlXCI+QWRkIHJlbWlzc2lvbiA8L2gxPlxuICAgIDxmb3JtIG5vdmFsaWRhdGU+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiPlxuICAgICAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cInJlbWlzc2lvbkZvcm1cIiBub3ZhbGlkYXRlPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1sYWJlbC0tc1wiIGZvcj1cInJlbWlzc2lvbi1jb2RlXCI+XG4gICAgICAgICAgICAgICAgQWRkIHJlbWlzc2lvbiB0byB7eyBmZWU/LmNvZGUgfX06IHt7IGZlZT8uZGVzY3JpcHRpb24gfX1cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb3JtLWhpbnRcIj5FbnRlciByZW1pc3Npb24gZm9yIHJlZmVyZW5jZS4gRm9yIGV4YW1wbGU6IEhXRi1BMUItMjNDIE9SIFBBMjEtMTIzNDU2PC9zcGFuPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBbbmdDbGFzc109XCJ7J2lubGluZS1lcnJvci1jbGFzcyc6IGlzUmVtaXNzaW9uQ29kZUVtcHR5IHx8IHJlbWlzc2lvbkNvZGVIYXNFcnJvcn1cIiBjbGFzcz1cImdvdnVrLWlucHV0IGdvdnVrLWlucHV0LS13aWR0aC0yMCBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCIgaWQ9XCJyZW1pc3Npb25Db2RlXCIgYXJpYS1sYWJlbD1cInJlbWlzc2lvbkNvZGVcIiAgbmFtZT1cInJlbWlzc2lvbkNvZGVcIiB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cInJlbWlzc2lvbkNvZGVcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiaW5saW5lLWVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImlzUmVtaXNzaW9uQ29kZUVtcHR5IHx8IHJlbWlzc2lvbkNvZGVIYXNFcnJvclwiPlxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImlzUmVtaXNzaW9uQ29kZUVtcHR5XCI+RW50ZXIgYSByZW1pc3Npb24gY29kZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJyZW1pc3Npb25Db2RlSGFzRXJyb3JcIj5FbnRlciBhIHZhaWxkIHJlbWlzc2lvbiBjb2RlPC9zcGFuPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1sYWJlbC0tc1wiIGZvcj1cImFtb3VudFwiPlxuICAgICAgICAgICAgICBIb3cgbXVjaCBkb2VzIHRoZSBhcHBsaWNhbnQgbmVlZCB0byBwYXk/XG4gICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICA8ZGl2IGlkPVwiYW1vdW50LWN1cnJlbmN5XCIgY2xhc3M9XCJnb3Z1ay12aXN1YWxseS1oaWRkZW5cIj5pbiBwb3VuZHM8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhtY3RzLWN1cnJlbmN5LWlucHV0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJobWN0cy1jdXJyZW5jeS1pbnB1dF9fc3ltYm9sXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+wqM8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstaW5wdXQgZ292dWstaW5wdXQtLXdpZHRoLTEwXCIgW25nQ2xhc3NdPVwieydpbmxpbmUtZXJyb3ItY2xhc3MnOiBpc0Ftb3VudEVtcHR5IHx8IGFtb3VudEhhc0Vycm9yIHx8IGlzUmVtaXNzaW9uTGVzc1RoYW5GZWVFcnJvcn1cIiBpZD1cImFtb3VudFwiIGFyaWEtbGFiZWw9XCJhbW91bnRcIiAgbmFtZT1cImFtb3VudFwiIHR5cGU9XCJ0ZXh0XCIgYXJpYS1kZXNjcmliZWRieT1cImFtb3VudC1jdXJyZW5jeVwiIGZvcm1Db250cm9sTmFtZT1cImFtb3VudFwiPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cImlubGluZS1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJpc0Ftb3VudEVtcHR5IHx8IGFtb3VudEhhc0Vycm9yIHx8IGlzUmVtaXNzaW9uTGVzc1RoYW5GZWVFcnJvclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNBbW91bnRFbXB0eVwiPkVudGVyIGEgYW1vdW50PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYW1vdW50SGFzRXJyb3JcIj5FbnRlciBhIHZhaWxkIGFtb3VudDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImlzUmVtaXNzaW9uTGVzc1RoYW5GZWVFcnJvclwiPlRoZSByZW1pc3Npb24gYW1vdW50IG11c3QgYmUgbGVzcyB0aGFuIHRoZSB0b3RhbCBmZWU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b25cIiB0eXBlPVwic3VibWl0XCIgKGNsaWNrKT1cImFkZFJlbWlzc2lvbigpXCI+XG4gICAgICAgICAgICBTdWJtaXRcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZm9ybT5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ2NvbmZpcm1hdGlvbidcIj5cbiAgICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBpZD0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J0FERFJFTUlTU0lPTkNPTkZJUk1BVElPTic+IFxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0X19pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+ITwvc3Bhbj5cbiAgICAgIDxzdHJvbmcgY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRfX3RleHRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRfX2Fzc2lzdGl2ZVwiPldhcm5pbmc8L3NwYW4+XG4gICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBhZGQgcmVtaXNzaW9uIHRvIHRoaXMgZmVlP1xuICAgICAgPC9zdHJvbmc+XG4gICAgPC9kaXY+XG4gICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5SZW1pc3Npb24gY29kZTo8L3RkPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3sgcmVtaXNzaW9uRm9ybS5jb250cm9scy5yZW1pc3Npb25Db2RlLnZhbHVlIH19PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+RmVlIGNvZGU6PC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7IGZlZS5jb2RlIH19PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+RmVlIGRlc2NyaXB0aW9uOjwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57eyBmZWUuZGVzY3JpcHRpb24gfX08L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5BbW91bnQgdGhlIGFwcGxpY2FudCBtdXN0IHBheTo8L3RkPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3sgIHJlbWlzc2lvbkZvcm0uY29udHJvbHMuYW1vdW50LnZhbHVlICB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInIH19PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC90YWJsZT5cblxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnV0dG9uIGdvdnVrLWJ1dHRvbi0tc2Vjb25kYXJ5XCIgKGNsaWNrKT1cImNhbmNlbFJlbWlzc2lvbi5lbWl0KClcIj5cbiAgICAgIENhbmNlbFxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiXG4gICAgW2Rpc2FibGVkXT1cImlzQ29uZmlybWF0aW9uQnRuRGlzYWJsZWRcIlxuICAgIFtuZ0NsYXNzXT0naXNDb25maXJtYXRpb25CdG5EaXNhYmxlZCA/IFwiYnV0dG9uIGJ1dHRvbi0tZGlzYWJsZWQgZ292dWstIS1tYXJnaW4tcmlnaHQtMVwiIDogXCJidXR0b24gZ292dWstIS1tYXJnaW4tcmlnaHQtMVwiJ1xuICAgIChjbGljayk9XCJjb25maXJtUmVtaXNzaW9uKClcIj5cbiAgICAgIENvbmZpcm1cbiAgICA8L2J1dHRvbj5cblxuPC9uZy1jb250YWluZXI+XG5cbjwhLS0gQWRkIHJldHJvIHJlbWlzc2lvbiBjaGFuZ2VzLS0+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3Q29tcFN0YXR1cyA9PT0gJ2FkZHJlbWlzc2lvbidcIj5cbiAgICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBpZD0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J1BST0NFU1NBRERSRVRST1JFTUlTU0lPTlBBR0UnPiBcbiAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLWxhcmdlXCI+UHJvY2VzcyByZW1pc3Npb248L2gxPlxuICAgIDxoMSBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+I3t7Y2NkQ2FzZU51bWJlciB8IGNjZEh5cGhlbnN9fTwvaDE+XG4gICAgPGgxIGNsYXNzPVwiaGVhZGluZy1sYXJnZVwiPkVudGVyIGhlbHAgd2l0aCBmZWVzIG9yIHJlbWlzc2lvbiByZWZlcmVuY2U8L2gxPlxuICAgIDxmb3JtIG5vdmFsaWRhdGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJyZW1pc3Npb25Gb3JtXCIgbm92YWxpZGF0ZT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLWxhYmVsLS1zXCIgZm9yPVwicmVtaXNzaW9uLWNvZGVcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvcm0taGludFwiPkZvciBleGFtcGxlOiBIV0YtQTFCLTIzQyBPUiBQQTIxLTEyMzQ1Njwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJpbmxpbmUtZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwiaXNSZW1pc3Npb25Db2RlRW1wdHkgfHwgcmVtaXNzaW9uQ29kZUhhc0Vycm9yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc1JlbWlzc2lvbkNvZGVFbXB0eVwiPkVudGVyIGEgcmVtaXNzaW9uIGNvZGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJyZW1pc3Npb25Db2RlSGFzRXJyb3JcIj5FbnRlciBhIHZhaWxkIHJlbWlzc2lvbiBjb2RlPC9zcGFuPlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDxpbnB1dCBbbmdDbGFzc109XCJ7J2lubGluZS1lcnJvci1jbGFzcyc6IGlzUmVtaXNzaW9uQ29kZUVtcHR5IHx8IHJlbWlzc2lvbkNvZGVIYXNFcnJvcn1cIiBjbGFzcz1cImdvdnVrLWlucHV0IGdvdnVrLWlucHV0LS13aWR0aC0yMCBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCIgaWQ9XCJyZW1pc3Npb25Db2RlXCIgYXJpYS1sYWJlbD1cInJlbWlzc2lvbkNvZGVcIiAgbmFtZT1cInJlbWlzc2lvbkNvZGVcIiB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cInJlbWlzc2lvbkNvZGVcIj5cbiAgICAgICAgICAgXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi1ncm91cFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJnb3RvU2VydmljZVJlcXVlc3RQYWdlKCRldmVudClcIiBjbGFzcz1cImdvdnVrLWJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiPiBQcmV2aW91czwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJhZGRSZW1pc3Npb25Db2RlKClcIiBjbGFzcz1cImdvdnVrLWJ1dHRvblwiPiBDb250aW51ZTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxwPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ290b0Nhc2V0cmFuc2F0aW9uUGFnZUNhbmNlbEJ0bkNsaWNrZWQoJGV2ZW50KVwiIGNsYXNzPVwiZ292dWstbGluayBwb2ludGVyXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj5DYW5jZWw8L2E+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ3Byb2Nlc3NyZXRyb3JlbWlzc29ucGFnZSdcIiA+XG4gICAgPGlucHV0ICNteUlucHV0IHR5cGU9J2hpZGRlbicgaWQ9J2lGcmFtZURyaXZlbkltYWdlVmFsdWUnIHZhbHVlPSdQUk9DRVNTUkVUUk9SRU1JU1NJT05QQUdFJz4gXG4gICAgPGgxIGNsYXNzPVwiaGVhZGluZy1sYXJnZVwiPlByb2Nlc3MgcmVtaXNzaW9uPC9oMT5cbiAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bVwiPiN7e2NjZENhc2VOdW1iZXIgfCBjY2RIeXBoZW5zIH19PC9oMT5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiPlxuICAgICAgICA8Zm9ybSBub3ZhbGlkYXRlPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cInJlbWlzc2lvbkZvcm1cIiBub3ZhbGlkYXRlPlxuICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxsZWdlbmQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldF9fbGVnZW5kIGdvdnVrLWZpZWxkc2V0X19sZWdlbmQtLW1cIj4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxoMSAqbmdJZj1cInJlbWVzc2lvblBheW1lbnQ/LnN0YXR1cyA9PT0gJ1N1Y2Nlc3MnIHx8ICAgaXNGcm9tUmVmdW5kTGlzdFBhZ2VcIiBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbnRlciB0aGUgYW1vdW50IHRvIGJlIHJlZnVuZGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDE+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgKm5nSWY9XCJyZW1lc3Npb25QYXltZW50Py5zdGF0dXMgIT09ICdTdWNjZXNzJyAmJiAhaXNGcm9tUmVmdW5kTGlzdFBhZ2VcIiBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbnRlciB0aGUgcmVtaXNzaW9uIGFtb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gxPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGgxICpuZ0lmPVwicmVtZXNzaW9uUGF5bWVudD8uc3RhdHVzID09PSAndW5kZWZpbmVkJ1wiIGNsYXNzPVwiaGVhZGluZy1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVudGVyIHRoZSAgYW1vdW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDE+IFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sZWdlbmQ+XG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiYW1vdW50LWN1cnJlbmN5XCIgY2xhc3M9XCJnb3Z1ay12aXN1YWxseS1oaWRkZW5cIj5pbiBwb3VuZHM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiaW5saW5lLWVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImlzQW1vdW50RW1wdHkgfHwgYW1vdW50SGFzRXJyb3IgfHwgaXNSZW1pc3Npb25MZXNzVGhhbkZlZUVycm9yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc0Ftb3VudEVtcHR5XCI+RW50ZXIgYSBhbW91bnQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhbW91bnRIYXNFcnJvclwiPkVudGVyIGEgdmFpbGQgYW1vdW50PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNSZW1pc3Npb25MZXNzVGhhbkZlZUVycm9yXCI+WW91IGNhbm5vdCBhZGQgYSByZW1pc3Npb24gdGhhdCdzIG1vcmUgdGhhbiB0aGUgZmVlIGFtb3VudC48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJobWN0cy1jdXJyZW5jeS1pbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJobWN0cy1jdXJyZW5jeS1pbnB1dF9fc3ltYm9sXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+wqM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1pbnB1dCBnb3Z1ay1pbnB1dC0td2lkdGgtMTBcIiBbbmdDbGFzc109XCJ7J2lubGluZS1lcnJvci1jbGFzcyc6IGlzQW1vdW50RW1wdHkgfHwgYW1vdW50SGFzRXJyb3IgfHwgaXNSZW1pc3Npb25MZXNzVGhhbkZlZUVycm9yfVwiIGlkPVwiYW1vdW50XCIgYXJpYS1sYWJlbD1cImFtb3VudFwiICBuYW1lPVwiYW1vdW50XCIgIHR5cGU9XCJudW1iZXJcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiYW1vdW50LWN1cnJlbmN5XCIgZm9ybUNvbnRyb2xOYW1lPVwiYW1vdW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJnb3RvQWRkUmV0cm9SZW1pc3Npb25Db2RlUGFnZSgpXCIgY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnlcIj4gUHJldmlvdXM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZ290b0NoZWNrUmV0cm9SZW1pc3Npb25QYWdlKHBheW1lbnQpXCIgY2xhc3M9XCJnb3Z1ay1idXR0b25cIj4gQ29udGludWU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ290b0Nhc2V0cmFuc2F0aW9uUGFnZUNhbmNlbEJ0bkNsaWNrZWQoJGV2ZW50KVwiIGNsYXNzPVwiZ292dWstbGlua1wiIGRhdGEtbW9kdWxlPVwiZ292dWstYnV0dG9uXCI+Q2FuY2VsPC9hPlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgXG4gICAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdjaGVja3JldHJvcmVtaXNzaW9ucGFnZSdcIj5cbiAgICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBpZD0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J0NIRUNLUkVUUk9SRU1JU1NJT05DT05GSVJNQVRJT04nPiBcbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0XCI+XG4gICAgICAgIDxoMSBjbGFzcz1cImhlYWRpbmctbGFyZ2VcIj4gQ2hlY2sgeW91ciBhbnN3ZXJzPC9oMT5cbiAgICA8L2Rpdj5cbiAgICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZVwiPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5QYXltZW50IHJlZmVyZW5jZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7cmVtZXNzaW9uUGF5bWVudCA/IHJlbWVzc2lvblBheW1lbnQucmVmZXJlbmNlOiAnICd9fTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlBheW1lbnQgYW1vdW50PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+wqN7eyByZW1lc3Npb25QYXltZW50ID8gZ2V0Rm9ybWF0dGVkQ3VycmVuY3kocmVtZXNzaW9uUGF5bWVudC5hbW91bnQpOiAnICcgfCBjdXJyZW5jeSA6J0dCUCc6J3N5bWJvbCc6JzEuMi0yJ319IDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlBheW1lbnQgc3RhdHVzPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3tyZW1lc3Npb25QYXltZW50ID8gcmVtZXNzaW9uUGF5bWVudC5zdGF0dXM6ICcnfX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5GZWU8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57eyBmZWUuY29kZSB9fSAtIHt7IGZlZS5kZXNjcmlwdGlvbiB9fSA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+RmVlIGFtb3VudDwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57eyBmZWUuY2FsY3VsYXRlZF9hbW91bnQvZmVlLnZvbHVtZXwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgfX08L3RkPlxuICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+SGVscCB3aXRoIGZlZXMgb3IgcmVtaXNzaW9uIHJlZmVyZW5jZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7IHJlbWlzc2lvbkZvcm0uY29udHJvbHMucmVtaXNzaW9uQ29kZS52YWx1ZT8udHJpbSgpIH19XG4gICAgICAgICAgICAgPGEgKGNsaWNrKT1cImdvdG9Qcm9jZXNzUmV0cm9SZW1pc3Npb25QYWdlKClcIiBjbGFzcz1cImdvdnVrLWxpbmsgcmlnaHRcIiA+Q2hhbmdlPC9hPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgPHRkICpuZ0lmPVwicmVtZXNzaW9uUGF5bWVudC5zdGF0dXMgPT09ICdTdWNjZXNzJ1wiIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+UmVmdW5kIGFtb3VudDwvdGQ+XG4gICAgICAgICAgICA8dGQgKm5nSWY9XCJyZW1lc3Npb25QYXltZW50LnN0YXR1cyAhPT0gJ1N1Y2Nlc3MnXCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5SZW1pc3Npb24gYW1vdW50PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3tyZW1pc3Npb25Gb3JtLmNvbnRyb2xzLmFtb3VudC52YWx1ZSAgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJyB9fVxuICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJnb3RvQW1vdW50UmV0cm9SZW1pc3Npb24oKVwiIGNsYXNzPVwiZ292dWstbGluayByaWdodFwiID5DaGFuZ2U8L2E+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgIDwvdGFibGU+XG5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiIChjbGljayk9XCJnb3RvQW1vdW50UmV0cm9SZW1pc3Npb24oKVwiPlByZXZpb3VzPC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgW2Rpc2FibGVkXT1cImlzQ29uZmlybWF0aW9uQnRuRGlzYWJsZWRcIiBbbmdDbGFzc109J2lzQ29uZmlybWF0aW9uQnRuRGlzYWJsZWQgPyBcImJ1dHRvbiBidXR0b24tLWRpc2FibGVkIGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTFcIiA6IFwiYnV0dG9uIGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTFcIicgKGNsaWNrKT1cImNvbmZpcm1SZXRyb1JlbWlzc2lvbigpXCI+IEFkZCByZW1pc3Npb24gPC9idXR0b24+XG4gICAgPHA+IDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ290b0Nhc2V0cmFuc2F0aW9uUGFnZUNhbmNlbEJ0bkNsaWNrZWQoJGV2ZW50KVwiIGNsYXNzPVwiZ292dWstbGlua1wiIGRhdGEtbW9kdWxlPVwiZ292dWstYnV0dG9uXCI+IENhbmNlbDwvYT4gPC9wPlxuXG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdyZXRyb3JlbWlzc2lvbmNvbmZpcm1hdGlvbnBhZ2UnXCI+XG4gICAgPGlucHV0ICNteUlucHV0IHR5cGU9J2hpZGRlbicgaWQ9J2lGcmFtZURyaXZlbkltYWdlVmFsdWUnIHZhbHVlPSdSRVRST1JFTUlTU0lPTkNPTkZJUk1BVElPTlBBR0UnPiBcbiAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93XCI+XG4gICAgPGRpdiA+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcGFuZWwgZ292dWstcGFuZWwtYm9yZGVyLS1jb25maXJtYXRpb25cIj5cbiAgICAgICAgPGgxIGNsYXNzPVwiZ292dWstcGFuZWxfX3RpdGxlXCI+XG4gICAgICAgICAgUmVtaXNzaW9uIGFkZGVkXG4gICAgICAgIDwvaDE+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJyZW1lc3Npb25QYXltZW50LnN0YXR1cyA9PT0gJ1N1Y2Nlc3MnXCIgY2xhc3M9XCJnb3Z1ay1wYW5lbF9fYm9keVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5XCI+PHN0cm9uZz5UaGUgYW1vdW50IHRvIGJlIHJlZnVuZGVkIHNob3VsZCBiZSB7e3JlbWlzc2lvbkZvcm0uY29udHJvbHMuYW1vdW50LnZhbHVlIHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgfX08L3N0cm9uZz48L3A+XG4gICAgICAgICAgIFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInJlbWVzc2lvblBheW1lbnQuc3RhdHVzID09PSAnU3VjY2VzcydcIiA+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBbZGlzYWJsZWRdPVwiIWlzUmVtaXNzaW9uQXBwbGllZFwiIFtuZ0NsYXNzXT0naXNDb25maXJtYXRpb25CdG5EaXNhYmxlZCA/IFwiYnV0dG9uIGJ1dHRvbi0tZGlzYWJsZWQgZ292dWstIS1tYXJnaW4tcmlnaHQtMVwiIDogXCJidXR0b24gZ292dWstIS1tYXJnaW4tcmlnaHQtMVwiJyAoY2xpY2spPVwiZ290b1Byb2Nlc3NSZXRyb1JlbWlzc2lvbigpXCI+Q29udGludWUgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5XCI+XG4gICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnb3RvQ2FzZXRyYW5zYXRpb25QYWdlQ2FuY2VsQnRuQ2xpY2tlZCgkZXZlbnQpXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHBvaW50ZXJcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWJ1dHRvblwiPlxuICAgICAgICAgICAgUmV0dXJuIHRvIGNhc2VcbiAgICAgICAgPC9hPlxuICAgICAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cblxuXG48bmctY29udGFpbmVyICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ3JlbWlzc2lvbkFkZHJlc3NQYWdlJ1wiPlxuICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBpZD0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J0FERFJFU1NERVRBSUxTUkVUUk9SRU1JU1NJT05QQUdFJz4gICAgICBcbiAgICA8aDEgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLWxcIj5Qcm9jZXNzIHJlZnVuZDwvaDE+XG4gICAgPGgyIGNsYXNzPVwiZ292dWstaGVhZGluZy1tIGdvdnVrLWZvbnQxOXB4XCI+Q2FzZSByZWZlcmVuY2U6IHt7Y2NkQ2FzZU51bWJlciB8IGNjZEh5cGhlbnMgfX08L2gyPlxuICA8Y2NwYXktY29udGFjdC1kZXRhaWxzXG4gIFthZGRyZXNzT2JqXSA9IG5vdGlmaWNhdGlvblxuICAoYXNzaWduQ29udGFjdERldGFpbHMpPVwiZ2V0Q29udGFjdERldGFpbHMoJGV2ZW50LCAnY2hlY2thZGRSZWZ1bmRwYWdlJylcIlxuICAocmVkaXJlY3RUb0lzc3VlUmVmdW5kKT1cImdvdG9SZW1pc3Npb25TdWNjZXNzKCRldmVudClcIiA+PC9jY3BheS1jb250YWN0LWRldGFpbHM+XG4gIDxwPlxuICAgICAgPGEgKGNsaWNrKT1cImdvdG9DYXNldHJhbnNhdGlvblBhZ2VDYW5jZWxCdG5DbGlja2VkKCRldmVudClcIiBjbGFzcz1cImdvdnVrLWxpbmtcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWJ1dHRvblwiPlxuICAgICAgICAgIENhbmNlbFxuICAgICAgPC9hPlxuICA8L3A+XG5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ2NoZWNrYWRkUmVmdW5kcGFnZSdcIj5cbiAgICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBpZD0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J0NIRUNLUkVUUk9SRU1JU1NJT05DT05GSVJNQVRJT04nPiBcbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0XCI+XG4gICAgICAgIDxoMSBjbGFzcz1cImhlYWRpbmctbGFyZ2VcIj4gQ2hlY2sgeW91ciBhbnN3ZXJzPC9oMT5cbiAgICA8L2Rpdj5cbiAgICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZVwiPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5QYXltZW50IHJlZmVyZW5jZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7cmVtZXNzaW9uUGF5bWVudCA/IHJlbWVzc2lvblBheW1lbnQucmVmZXJlbmNlOiAnICd9fTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlBheW1lbnQgYW1vdW50PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+wqN7eyByZW1lc3Npb25QYXltZW50ID8gZ2V0Rm9ybWF0dGVkQ3VycmVuY3kocmVtZXNzaW9uUGF5bWVudC5hbW91bnQpOiAnICcgfCBjdXJyZW5jeSA6J0dCUCc6J3N5bWJvbCc6JzEuMi0yJ319IDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlBheW1lbnQgc3RhdHVzPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3tyZW1lc3Npb25QYXltZW50ID8gcmVtZXNzaW9uUGF5bWVudC5zdGF0dXM6ICcnfX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5GZWU8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57eyBmZWUuY29kZSB9fSAtIHt7IGZlZS5kZXNjcmlwdGlvbiB9fSAoe3sgZmVlLmNhbGN1bGF0ZWRfYW1vdW50L2ZlZS52b2x1bWV8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInIH19KSA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5IZWxwIHdpdGggZmVlcyBvciByZW1pc3Npb24gcmVmZXJlbmNlPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3sgcmVtaXNzaW9uRm9ybS5jb250cm9scy5yZW1pc3Npb25Db2RlLnZhbHVlPy50cmltKCkgfX1cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgIDx0ZCAqbmdJZj1cInJlbWVzc2lvblBheW1lbnQuc3RhdHVzID09PSAnU3VjY2VzcydcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlJlZnVuZCBhbW91bnQ8L3RkPlxuICAgICAgICAgICAgPHRkICpuZ0lmPVwicmVtZXNzaW9uUGF5bWVudC5zdGF0dXMgIT09ICdTdWNjZXNzJ1wiIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+UmVtaXNzaW9uIGFtb3VudDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7cmVtaXNzaW9uRm9ybS5jb250cm9scy5hbW91bnQudmFsdWUgIHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgfX1cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5TZW5kIHRvPC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7b3JkZXJQYXJ0eX19PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlNlbmQgdmlhPC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImNvbnRhY3REZXRhaWxzT2JqPy5ub3RpZmljYXRpb25fdHlwZSA9PT0gJ0VNQUlMJ1wiIGNsYXNzPVwiY29udGFjdERldGFpbHMtd2lkdGhcIj5cbiAgICAgICAgICAgIDxzdHJvbmc+RW1haWw8L3N0cm9uZz5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICB7e2NvbnRhY3REZXRhaWxzT2JqPy5lbWFpbD8udHJpbSgpfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY29udGFjdERldGFpbHNPYmo/Lm5vdGlmaWNhdGlvbl90eXBlID09PSAnTEVUVEVSJ1wiIGNsYXNzPVwiY29udGFjdERldGFpbHMtd2lkdGhcIj5cbiAgICAgICAgICAgIDxzdHJvbmc+UG9zdDwvc3Ryb25nPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIHt7Y29udGFjdERldGFpbHNPYmo/LmFkZHJlc3NfbGluZT8udHJpbSgpfX0mbmJzcDt7e2NvbnRhY3REZXRhaWxzT2JqPy5jaXR5Py50cmltKCl9fSZuYnNwO3t7Y29udGFjdERldGFpbHNPYmo/LmNvdW50eT8udHJpbSgpfX0mbmJzcDt7e2NvbnRhY3REZXRhaWxzT2JqPy5jb3VudHJ5Py50cmltKCl9fSZuYnNwO3t7Y29udGFjdERldGFpbHNPYmo/LnBvc3RhbF9jb2RlPy50cmltKCl9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxhIChjbGljayk9XCJnb3RvUHJvY2Vzc1JldHJvUmVtaXNzaW9uKGNvbnRhY3REZXRhaWxzT2JqKVwiIGNsYXNzPVwiZ292dWstbGluayByaWdodFwiID5DaGFuZ2U8L2E+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5Ob3RpZmljYXRpb248L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7dGVtcGxhdGVJbnN0cnVjdGlvblR5cGV9fVxuICAgICAgICAgICAgPGEgKm5nSWY9XCIhbm90aWZpY2F0aW9uUHJldmlld1wiIGhyZWY9XCJKYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cImdvdnVrLWxpbmsgcmlnaHRcIiAoY2xpY2spPVwic2hvd05vdGlmaWNhdGlvblByZXZpZXcoKVwiPlxuICAgICAgICAgICAgICBQcmV2aWV3XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YSAqbmdJZj1cIm5vdGlmaWNhdGlvblByZXZpZXdcIiBocmVmPVwiSmF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHJpZ2h0XCIgKGNsaWNrKT1cImhpZGVOb3RpZmljYXRpb25QcmV2aWV3KClcIj5cbiAgICAgICAgICAgICAgSGlkZSBQcmV2aWV3XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGFibGU+XG5cbiAgICA8YXBwLW5vdGlmaWNhdGlvbi1wcmV2aWV3ICpuZ0lmPVwibm90aWZpY2F0aW9uUHJldmlld1wiIFxuICAgIFtwYXltZW50XT1cInJlbWVzc2lvblBheW1lbnRcIiBcbiAgICBbY29udGFjdERldGFpbHNdPVwiY29udGFjdERldGFpbHNPYmpcIlxuICAgIFtyZWZ1bmRSZWFzb25dPVwiJ1JSMDM2J1wiXG4gICAgW3JlZnVuZEFtb3VudF09XCJyZW1pc3Npb25Gb3JtLmNvbnRyb2xzLmFtb3VudC52YWx1ZVwiPjwvYXBwLW5vdGlmaWNhdGlvbi1wcmV2aWV3PlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnlcIiAoY2xpY2spPVwiZ290b1Byb2Nlc3NSZXRyb1JlbWlzc2lvbihjb250YWN0RGV0YWlsc09iailcIj5QcmV2aW91czwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIFtkaXNhYmxlZF09XCJpc0NvbmZpcm1hdGlvbkJ0bkRpc2FibGVkXCIgW25nQ2xhc3NdPSdpc0NvbmZpcm1hdGlvbkJ0bkRpc2FibGVkID8gXCJidXR0b24gYnV0dG9uLS1kaXNhYmxlZCBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCIgOiBcImJ1dHRvbiBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCInIChjbGljayk9XCJwcm9jZXNzUmVmdW5kKClcIj4gU3VibWl0IHJlZnVuZCA8L2J1dHRvbj5cbiAgICA8cD4gPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnb3RvQ2FzZXRyYW5zYXRpb25QYWdlQ2FuY2VsQnRuQ2xpY2tlZCgkZXZlbnQpXCIgY2xhc3M9XCJnb3Z1ay1saW5rXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj4gQ2FuY2VsPC9hPiA8L3A+XG5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ3JlZnVuZGNvbmZpcm1hdGlvbnBhZ2UnXCI+XG4gICAgPGlucHV0ICNteUlucHV0IHR5cGU9J2hpZGRlbicgaWQ9J2lGcmFtZURyaXZlbkltYWdlVmFsdWUnIHZhbHVlPSdSRVRST1JFTUlTU0lPTlJFRlVORENPTkZJUk1BVElPTlBBR0UnPiBcbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1yb3dcIj5cbiAgICAgIDxkaXYgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcGFuZWwgZ292dWstcGFuZWwtLWNvbmZpcm1hdGlvblwiPlxuICAgICAgICAgIDxoMSBjbGFzcz1cImdvdnVrLXBhbmVsX190aXRsZVwiPlxuICAgICAgICAgICAgUmVmdW5kIHN1Ym1pdHRlZFxuICAgICAgICAgIDwvaDE+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcGFuZWxfX2JvZHlcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZ292dWstYm9keSB3aGl0ZVwiPjxzdHJvbmc+UmVmdW5kIHJlZmVyZW5jZToge3tyZWZ1bmRSZWZlcmVuY2V9fTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImlzUGF5bWVudFN1Y2Nlc3NcIj5cbiAgICAgICAgPGgyIGNsYXNzPVwiZ292dWstaGVhZGluZy1sXCI+V2hhdCBoYXBwZW5zIG5leHQ8L2gyPlxuICAgICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5cbiAgICAgICAgICBBIHJlZnVuZCByZXF1ZXN0IGZvciB7e3JlZnVuZEFtb3VudCAgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJyB9fSBoYXMgYmVlbiBjcmVhdGVkIGFuZCB3aWxsIGJlIHBhc3NlZCB0byBhIHRlYW0gbGVhZGVyIHRvIGFwcHJvdmUuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5XCI+XG4gICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cImdvdG9DYXNldHJhbnNhdGlvblBhZ2VDYW5jZWxCdG5DbGlja2VkKCRldmVudClcIiBjbGFzcz1cImdvdnVrLWxpbmsgcG9pbnRlclwiIGRhdGEtbW9kdWxlPVwiZ292dWstYnV0dG9uXCI+XG4gICAgICAgIFJldHVybiB0byBjYXNlXG4gICAgPC9hPlxuICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIFxuPC9uZy1jb250YWluZXI+XG5cbjwhLS0gSXNzdWUgUmVmdW5kIFNlY3Rpb24gLS0+XG48bmctY29udGFpbmVyICpuZ0lmPVwidmlld0NvbXBTdGF0dXMgPT09ICdpc3N1ZXJlZnVuZCcgJiYgaXNSZWZ1bmRSZW1pc3Npb25cIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIj5cbiAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cInJlbWlzc2lvbkZvcm1cIiBub3ZhbGlkYXRlPlxuICAgIDxoMSBjbGFzcz1cImhlYWRpbmctbGFyZ2VcIj5Qcm9jZXNzIHJlZnVuZDwvaDE+XG4gICAgPGgyIGNsYXNzPVwiaGVhZGluZy1tZWRpdW1cIj5DYXNlIHJlZmVyZW5jZTp7e2NjZENhc2VOdW1iZXIgfCBjY2RIeXBoZW5zIH19PC9oMj5cbiAgICA8c3BhbiBpZD1cImhvdy1jb250YWN0ZWQtY29uZGl0aW9uYWwtaGludFwiIGNsYXNzPVwiZm9ybS1oaW50IGdvdnVrLWZvbnQxOXB4XCI+XG4gICAgICBQYXltZW50IHJlZmVyZW5jZToge3twYXltZW50UmVmZXJlbmNlfX1cbiAgICA8L3NwYW4+XG4gICAgPGgzIGNsYXNzPVwiaGVhZGluZy1zbWFsbFwiPlNlbGVjdCBmZWVzIHRvIGJlIHJlZnVuZGVkPC9oMz5cbiAgICA8IS0tVEFCTEUtLT5cbiAgICA8ZGl2PlxuICAgICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgICAgPHRoZWFkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyICBjb2wtMVwiIHNjb3BlPVwiY29sXCI+U2VsZWN0PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLTE4XCIgc2NvcGU9XCJjb2xcIj5GZWUgZGVzY3JpcHRpb248L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtNlwiIHNjb3BlPVwiY29sXCI+RmVlIGFtb3VudDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC02XCIgc2NvcGU9XCJjb2xcIj5Ub3RhbCBwYWlkPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLTZcIiBzY29wZT1cImNvbFwiPlF1YW50aXR5PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLThcIiBzY29wZT1cImNvbFwiPkFtb3VudCB0byByZWZ1bmQ8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+PC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiICpuZ0lmPVwiIWlzRnVsbHlSZWZ1bmRcIj5cbiAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCIgZm9ybUFycmF5TmFtZT1cImZlZXNMaXN0XCIgKm5nRm9yPVwibGV0IGZlZSBvZiBmZWVzTGlzdD8uY29udHJvbHM7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+XG4gICAgICAgICAgICAgIDxkaXYgIFtmb3JtR3JvdXBOYW1lXT1cImlcIiBjbGFzcz1cImdvdnVrLWNoZWNrYm94ZXMgZ292dWstY2hlY2tib3hlcy0tbGFyZ2VcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWNoZWNrYm94ZXNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstY2hlY2tib3hlc19faXRlbVwiPlxuXG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZ292dWstY2hlY2tib3hlc19faW5wdXRcIiBcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGVja19lbihpLGZlZS5jb250cm9sc1snaWQnXS52YWx1ZSxmZWUuY29udHJvbHNbJ2FwcG9ydGlvbl9hbW91bnQnXS52YWx1ZSxmZWUuY29udHJvbHNbJ3ZvbHVtZSddLnZhbHVlKVwiIFxuICAgICAgICAgICAgICAgICAgaWQ9XCJ7e2ZlZS5jb250cm9sc1snaWQnXS52YWx1ZX19XCIgXG4gICAgICAgICAgICAgICAgICBuYW1lPVwib3JnYW5pc2F0aW9uXCIgXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIiBcbiAgICAgICAgICAgICAgICAgIHZhbHVlPVwie3tmZWUuY29udHJvbHNbJ2lkJ10udmFsdWV9fVwiIFxuICAgICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwic2VsZWN0ZWRcIiA+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1jaGVja2JveGVzX19sYWJlbFwiIGZvcj1cInt7ZmVlLmNvbnRyb2xzWydpZCddLnZhbHVlfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj5TZWxlY3Q8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCAgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3tmZWUuY29udHJvbHNbJ2Rlc2NyaXB0aW9uJ10udmFsdWV9fSA8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgIHdoaXRlc3BhY2UtaW5oZXJpdCBsZWZ0XCIgPlxuICAgICAgICAgICAgICA8ZGl2IHR5cGU9XCJoaWRkZW5cIiBzdHlsZT1cImRpc3BsYXk6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1wiIGlkPVwiZmVlVk9sX3t7ZmVlLmNvbnRyb2xzWydpZCddLnZhbHVlfX1cIj57eyBmZWUuY29udHJvbHNbJ2NhbGN1bGF0ZWRfYW1vdW50J10udmFsdWUgLyBmZWUuY29udHJvbHNbJ3ZvbHVtZSddLnZhbHVlIH19PC9kaXY+XG4gICAgICAgICAgICAgIHt7IGZlZS5jb250cm9sc1snY2FsY3VsYXRlZF9hbW91bnQnXS52YWx1ZSAvIGZlZS5jb250cm9sc1sndm9sdW1lJ10udmFsdWUgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJyB9fVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsICB3aGl0ZXNwYWNlLWluaGVyaXQgbGVmdFwiID57eyBmZWUuY29udHJvbHNbJ2FwcG9ydGlvbl9hbW91bnQnXS52YWx1ZSB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInfX0gPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsICB3aGl0ZXNwYWNlLWluaGVyaXQgbGVmdFwiICAqbmdJZj1cImZlZS5jb250cm9sc1sndm9sdW1lJ10udmFsdWUgPjFcIj5cbiAgICAgICAgICAgICAgPGRpdiBbZm9ybUdyb3VwTmFtZV09XCJpXCI+XG4gICAgICAgICAgICAgIDxpbnB1dCBkaXNhYmxlZD1cImRpc2FibGVkXCIgIGNsYXNzPVwiZ292dWstaW5wdXQgZ292dWstaW5wdXQtLXdpZHRoLTQgY2VudGVyXCIgIGlkPVwiZmVlVm9sdW1lVXBkYXRlZF97e2ZlZS5jb250cm9sc1snaWQnXS52YWx1ZX19XCIgKGtleXVwKT1cImNhbEFtdFRvUmVmdW5kKCRldmVudC50YXJnZXQudmFsdWUsZmVlLmNvbnRyb2xzWydjYWxjdWxhdGVkX2Ftb3VudCddLnZhbHVlLGZlZS5jb250cm9sc1sndm9sdW1lJ10udmFsdWUsaSlcIiB2YWx1ZT1cInt7ZmVlLmNvbnRyb2xzWyd1cGRhdGVkX3ZvbHVtZSddLnZhbHVlfX1cIiAgbmFtZT1cImZlZVZvbHVtZVVwZGF0ZWRfe3tmZWUuY29udHJvbHNbJ2lkJ10udmFsdWV9fVwiIGZvcm1Db250cm9sTmFtZT1cInVwZGF0ZWRfdm9sdW1lXCIgdHlwZT1cInRleHRcIiA+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCAgd2hpdGVzcGFjZS1pbmhlcml0IGxlZnRcIiAgKm5nSWY9XCJmZWUuY29udHJvbHNbJ3ZvbHVtZSddLnZhbHVlID09PTFcIj5cbiAgICAgICAgICAgICAgPGlucHV0IGRpc2FibGVkPVwiZGlzYWJsZWRcIiAgY2xhc3M9XCJnb3Z1ay1pbnB1dCBnb3Z1ay1pbnB1dC0td2lkdGgtNCBjZW50ZXJcIiAgaWQ9XCJWb2x1bWVVcGRhdGVkX3t7ZmVlLmNvbnRyb2xzWydpZCddLnZhbHVlfX1cIiBuYW1lPVwiVm9sdW1lVXBkYXRlZF97e2ZlZS5jb250cm9sc1snaWQnXS52YWx1ZX19XCIgdHlwZT1cInRleHRcIiAgIHZhbHVlPVwie3tmZWUuY29udHJvbHNbJ3ZvbHVtZSddLnZhbHVlfX1cIj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCAgd2hpdGVzcGFjZS1pbmhlcml0IGNlbnRlclwiIHNjb3BlPVwicm93XCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2ICBbZm9ybUdyb3VwTmFtZV09XCJpXCIgIGNsYXNzPVwiaG1jdHMtY3VycmVuY3ktaW5wdXRcIj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhtY3RzLWN1cnJlbmN5LWlucHV0X19zeW1ib2xcIiBhcmlhLWhpZGRlbj1cInRydWVcIj7CozwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0IGRpc2FibGVkPVwiZGlzYWJsZWRcIiBjbGFzcz1cImdvdnVrLWlucHV0IGdvdnVrLWlucHV0LS13aWR0aC0xMFwiIGlkPVwiZmVlQW1vdW50X3t7ZmVlLmNvbnRyb2xzWydpZCddLnZhbHVlfX1cIiBuYW1lPVwiZmVlQW1vdW50X3t7ZmVlLmNvbnRyb2xzWydpZCddLnZhbHVlfX1cIiB0eXBlPVwidGV4dFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJhbW91bnQtY3VycmVuY3kgXCIgIHBhdHRlcm49XCJbMC05XSpcIiBmb3JtQ29udHJvbE5hbWU9XCJyZWZ1bmRfYW1vdW50XCI+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJmZWVWb2x1bWVfe3tmZWUuY29udHJvbHNbJ2lkJ10udmFsdWV9fVwiIG5hbWU9XCJmZWVWb2x1bWVfe3tmZWUuY29udHJvbHNbJ2lkJ10udmFsdWV9fVwiIHZhbHVlPSBcInt7ZmVlLmNvbnRyb2xzWyd2b2x1bWUnXS52YWx1ZX19XCIgdHlwZT1cImhpZGRlblwiIGZvcm1Db250cm9sTmFtZT1cInZvbHVtZVwiPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZmVlQXBwb3J0aW9uQW1vdW50X3t7ZmVlLmNvbnRyb2xzWydpZCddLnZhbHVlfX1cIiBuYW1lPVwiZmVlQXBwb3J0aW9uQW1vdW50X3t7ZmVlLmNvbnRyb2xzWydpZCddLnZhbHVlfX1cIiB2YWx1ZT0gXCJ7e2ZlZS5jb250cm9sc1snYXBwb3J0aW9uX2Ftb3VudCddLnZhbHVlfX1cIiB0eXBlPVwiaGlkZGVuXCIgZm9ybUNvbnRyb2xOYW1lPVwiYXBwb3J0aW9uX2Ftb3VudFwiPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiY2FsY3VsYXRlZEFtb3VudF97e2ZlZS5jb250cm9sc1snaWQnXS52YWx1ZX19XCIgbmFtZT1cImNhbGN1bGF0ZWRBbW91bnRfe3tmZWUuY29udHJvbHNbJ2lkJ10udmFsdWV9fVwiIHZhbHVlPSBcInt7ZmVlLmNvbnRyb2xzWydjYWxjdWxhdGVkX2Ftb3VudCddLnZhbHVlfX1cIiB0eXBlPVwiaGlkZGVuXCIgZm9ybUNvbnRyb2xOYW1lPVwiY2FsY3VsYXRlZF9hbW91bnRcIj5cbiAgICAgICAgICAgICAgIDwvZGl2PiBcbiBcbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAqbmdJZj1cImlzRnVsbHlSZWZ1bmRcIj5cbiAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCIgKm5nRm9yPVwibGV0IGZlZSBvZiBmZWVzOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPlxuICAgICAgICAgICAgICA8ZGl2ICBjbGFzcz1cImdvdnVrLWNoZWNrYm94ZXMgZ292dWstY2hlY2tib3hlcy0tbGFyZ2VcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWNoZWNrYm94ZXNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstY2hlY2tib3hlc19faXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPGlucHV0ICAgXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImdvdnVrLWNoZWNrYm94ZXNfX2lucHV0XCIgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBpZD1cInt7ZmVlLmlkfX1cIiBcbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJvcmdhbmlzYXRpb25cIiBcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiIFxuICAgICAgICAgICAgICAgICAgdmFsdWU9XCJ7e2ZlZS5pZH19XCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgW2NoZWNrZWRdPVwidHJ1ZVwiID5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLWNoZWNrYm94ZXNfX2xhYmVsXCIgZm9yPVwie3tmZWUuaWR9fVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPlNlbGVjdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsICB3aGl0ZXNwYWNlLWluaGVyaXRcIj57e2ZlZS5kZXNjcmlwdGlvbn19IDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCAgd2hpdGVzcGFjZS1pbmhlcml0IGxlZnRcIiA+XG4gICAgICAgICAgICAgIDxkaXYgdHlwZT1cImhpZGRlblwiIHN0eWxlPVwiZGlzcGxheTpub25lO2JhY2tncm91bmQtY29sb3I6d2hpdGU7XCIgaWQ9XCJmZWVWT2xfe3tmZWUuaWR9fVwiPnt7IGZlZS5jYWxjdWxhdGVkX2Ftb3VudCAvIGZlZS52b2x1bWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAge3sgZmVlLmNhbGN1bGF0ZWRfYW1vdW50IC8gZmVlLnZvbHVtZXwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMicgfX1cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCAgd2hpdGVzcGFjZS1pbmhlcml0IGxlZnRcIiA+e3sgcGF5bWVudC5hbW91bnQgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJ319IDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCAgd2hpdGVzcGFjZS1pbmhlcml0IGxlZnRcIj5cbiAgICAgICAgICAgICAgPGRpdiA+XG4gICAgICAgICAgICAgIDxpbnB1dCBkaXNhYmxlZD1cImRpc2FibGVkXCIgIGNsYXNzPVwiZ292dWstaW5wdXQgZ292dWstaW5wdXQtLXdpZHRoLTQgY2VudGVyXCIgIGlkPVwiZmVlVm9sdW1lVXBkYXRlZF97e2ZlZS5pZH19XCIgIHZhbHVlPVwie3tmZWUudm9sdW1lfX1cIiAgbmFtZT1cImZlZVZvbHVtZVVwZGF0ZWRfe3tmZWUuaWR9fVwiIHR5cGU9XCJ0ZXh0XCIgPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICBcbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsICB3aGl0ZXNwYWNlLWluaGVyaXQgY2VudGVyXCIgc2NvcGU9XCJyb3dcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJobWN0cy1jdXJyZW5jeS1pbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG1jdHMtY3VycmVuY3ktaW5wdXRfX3N5bWJvbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPsKjPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIGNsYXNzPVwiZ292dWstaW5wdXQgZ292dWstaW5wdXQtLXdpZHRoLTEwXCIgaWQ9XCJmZWVBbW91bnRfe3tmZWUuaWR9fVwiIG5hbWU9XCJmZWVBbW91bnRfe3tmZWUuaWR9fVwiIHR5cGU9XCJ0ZXh0XCIgYXJpYS1kZXNjcmliZWRieT1cImFtb3VudC1jdXJyZW5jeSBcIiAgdmFsdWU9XCJ7eyBwYXltZW50LmFtb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInfX1cIiBwYXR0ZXJuPVwiWzAtOV0qXCIgPlxuICAgICAgICAgICAgICAgIDwvZGl2PiBcbiAgICAgICAgXG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCIgKm5nSWY9XCJmZWVzPy5sZW5ndGggPT09IDBcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiIGNvbHNwYW49XCI2XCI+Tm8gZmVlcyByZWNvcmRlZDwvdGQ+XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1idXR0b24tZ3JvdXBcIj5cblxuICBcbiAgPGEgIChjbGljayk9XCJnb3RvU2VydmljZVJlcXVlc3RQYWdlKCRldmVudClcIiAgKm5nSWY9XCIhaXNGdWxseVJlZnVuZFwiIGRyYWdnYWJsZT1cImZhbHNlXCIgY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnlcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWJ1dHRvblwiPlxuICAgIFByZXZpb3VzXG4gIDwvYT5cbiAgPGEgIChjbGljayk9XCJnb1RvUGF5bWVudFZpZXdDb21wb25lbnQoKVwiICAqbmdJZj1cImlzRnVsbHlSZWZ1bmRcIiBkcmFnZ2FibGU9XCJmYWxzZVwiIGNsYXNzPVwiZ292dWstYnV0dG9uIGdvdnVrLWJ1dHRvbi0tc2Vjb25kYXJ5XCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj5cbiAgICBQcmV2aW91c1xuICA8L2E+XG4gICAgXG4gIDxidXR0b24gW2Rpc2FibGVkXSA9IFwibm9uZVNlbGVjdGVkKClcIiAoY2xpY2spPVwiZ290b0lzc3VlUGFnZShpc0Z1bGx5UmVmdW5kKVwiIGNsYXNzPVwiZ292dWstYnV0dG9uXCI+XG4gICAgQ29udGludWVcbiAgPC9idXR0b24+XG4gIFxuICAgIDwvZGl2PlxuICAgIDxwPlxuICAgICAgPGEgIChjbGljayk9XCJnb3RvQ2FzZXRyYW5zYXRpb25QYWdlQ2FuY2VsQnRuQ2xpY2tlZCgkZXZlbnQpXCIgY2xhc3M9XCJnb3Z1ay1saW5rXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj5DYW5jZWw8L2E+XG4gICAgPC9wPlxuICA8L2Zvcm0+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3Q29tcFN0YXR1cyA9PT0gJ2lzc3VlcmVmdW5kcGFnZTEnICYmIGlzUmVmdW5kUmVtaXNzaW9uXCI+XG5cbiAgICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBpZD0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J0lTU1VFUkVGVU5EUEFHRSc+IFxuICAgIDxoMSBjbGFzcz1cImhlYWRpbmctbGFyZ2VcIj5Qcm9jZXNzIHJlZnVuZDwvaDE+XG4gICAgPGgxIGNsYXNzPVwiaGVhZGluZy1tZWRpdW1cIj5DYXNlIHJlZmVyZW5jZToge3tjY2RDYXNlTnVtYmVyIHwgY2NkSHlwaGVucyB9fTwvaDE+XG4gICAgPHNwYW4gaWQ9XCJob3ctY29udGFjdGVkLWNvbmRpdGlvbmFsLWhpbnQgZ292dWstZm9udDE5cHhcIiAqbmdJZj1cInBheW1lbnRcIiBjbGFzcz1cImZvcm0taGludFwiPlxuICAgICAgUGF5bWVudCByZWZlcmVuY2U6IHt7cGF5bWVudFJlZmVyZW5jZX19XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuIGlkPVwiaG93LWNvbnRhY3RlZC1jb25kaXRpb25hbC1oaW50IGdvdnVrLWZvbnQxOXB4XCIgKm5nSWY9XCJyZWZ1bmRQYXltZW50UmVmZXJlbmNlXCIgY2xhc3M9XCJmb3JtLWhpbnRcIj5cbiAgICAgIFBheW1lbnQgcmVmZXJlbmNlOiB7e3JlZnVuZFBheW1lbnRSZWZlcmVuY2V9fVxuICAgIDwvc3Bhbj5cbiAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLWxhcmdlXCI+V2h5IGFyZSB5b3UgbWFraW5nIHRoaXMgcmVmdW5kP1xuICAgICAgPC9oMT5cbiAgICAgXG5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgPGZvcm0gbm92YWxpZGF0ZT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cInJlbWlzc2lvbkZvcm1cIiBub3ZhbGlkYXRlPlxuICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzPVwiZ292dWstZmllbGRzZXRcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiaG93LWNvbnRhY3RlZC1jb25kaXRpb25hbC1oaW50XCI+XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwicmVmdW5kSGFzRXJyb3IgPyAnZ292dWstcmFkaW9zIGdvdnVrLXJhZGlvcy0tY29uZGl0aW9uYWwgZm9ybS1ncm91cC1lcnJvcicgOiAnZ292dWstcmFkaW9zIGdvdnVrLXJhZGlvcy0tY29uZGl0aW9uYWwnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1tb2R1bGU9XCJnb3Z1ay1yYWRpb3NcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiaW5saW5lLWVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cInJlZnVuZEhhc0Vycm9yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJyZWZ1bmRIYXNFcnJvclwiPlNlbGVjdCBhIHJlYXNvbiB3aHkgeW914oCZcmUgbWFraW5nIHRoaXMgcmVmdW5kPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID0gXCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19faXRlbSBjb2wtbWQtNFwiICpuZ0Zvcj1cImxldCByZWZ1bmQgb2YgY29tbW9uUmVmdW5kUmVhc29uczsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gPGRpdiAqbmdJZiA9IFwie3tyZWZ1bmQubmFtZX19ICE9PSAnUmV0cm9zcGVjdGl2ZSByZW1pc3Npb24nXCI+IC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgICBjbGFzcz1cImdvdnVrLXJhZGlvc19faW5wdXRcIiBpZD1cInt7cmVmdW5kLm5hbWV9fVwiIG5hbWU9XCJyZWZ1bmRSZWFzb25cIiB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJyZWZ1bmRSZWFzb25cIiB2YWx1ZT17e3JlZnVuZC5jb2RlfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cInNlbGVjdFJhZGlvQnV0dG9uKHJlZnVuZC5jb2RlLCByZWZ1bmQubmFtZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwtLXMgZ292dWstcmFkaW9zX19sYWJlbCBnb3Z1ay1mb250X19jdXN0b21cIiBmb3I9XCJob3ctY29udGFjdGVkLWNvbmRpdGlvbmFsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tyZWZ1bmQubmFtZX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19fY29uZGl0aW9uYWxcIiAqbmdJZj1cImlzUmVmdW5kUmVhc29uc1NlbGVjdGVkICYmIHNob3dSZWFzb25UZXh0ICYmIHNlbGVjdGVkUmVmdW5kUmVhc29uID09PSByZWZ1bmQubmFtZSBcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1sYWJlbC0tbVwiIGZvcj1cInt7cmVmdW5kLm5hbWV9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVudGVyIHJlYXNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieydmb3JtLWdyb3VwLWVycm9yJzogaXNSZWFzb25FbXB0eX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwICBjbGFzcz1cImlubGluZS1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJpc1JlYXNvbkVtcHR5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc1JlYXNvbkVtcHR5XCI+RW50ZXIgYSByZWFzb24gd2h5IHlvdeKAmXJlIG1ha2luZyB0aGlzIHJlZnVuZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLWlucHV0IGdvdnVrLWlucHV0LS13aWR0aC0xMFwiIFtuZ0NsYXNzXT1cInsnaW5saW5lLWVycm9yLWNsYXNzJzogaXNSZWFzb25FbXB0eX1cIiBpZD1cInJlYXNvblwiIGFyaWEtbGFiZWw9XCJyZWFzb25cIiAgbmFtZT1cInJlYXNvblwiIHR5cGU9XCJ0ZXh0XCIgYXJpYS1kZXNjcmliZWRieT1cInJlYXNvblwiIG1heGxlbmd0aD1cIjMwXCIgZm9ybUNvbnRyb2xOYW1lPVwicmVhc29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gPC9kaXY+IC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgZm9ybUNvbnRyb2xOYW1lPVwicmVmdW5kRERSZWFzb25cIiBjbGFzcz1cImdvdnVrLXNlbGVjdFwiIGlkPVwic29ydFwiICAoY2hhbmdlKT1cInNlbGVjdGNoYW5nZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gc2VsZWN0ZWQ9J3NlbGVjdGVkJyBbZGVmYXVsdFNlbGVjdGVkXT10cnVlIFt2YWx1ZV09XCJkZWZhdWx0XCIgPnt7ZGVmYXVsdH19PC9vcHRpb24+ICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSA8b3B0aW9uIHZhbHVlPVwiXCIgc2VsZWN0ZWQ9J3NlbGVjdGVkJz5TZWxlY3QgYSBkaWZmZXJlbnQgcmVhc29uPC9vcHRpb24+IC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gICpuZ0Zvcj1cImxldCByZWZ1bmQgb2YgcmVmdW5kUmVhc29ucztcIiBpZD1cInt7cmVmdW5kLm5hbWV9fVwiICB2YWx1ZT1cInt7cmVmdW5kLmNvZGV9fVwiPnt7cmVmdW5kLm5hbWV9fTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19fY29uZGl0aW9uYWxcIiAqbmdJZj1cInNob3dSZWFzb25UZXh0ICYmICAhaXNSZWZ1bmRSZWFzb25zU2VsZWN0ZWRcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieydmb3JtLWdyb3VwLWVycm9yJzogaXNSZWFzb25FbXB0eX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1sYWJlbC0tbVwiIGZvcj1cImFtb3VudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbnRlciByZWFzb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiaW5saW5lLWVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImlzUmVhc29uRW1wdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc1JlYXNvbkVtcHR5XCI+RW50ZXIgYSByZWFzb24gd2h5IHlvdeKAmXJlIG1ha2luZyB0aGlzIHJlZnVuZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstaW5wdXQgZ292dWstaW5wdXQtLXdpZHRoLTEwXCIgW25nQ2xhc3NdPVwieydpbmxpbmUtZXJyb3ItY2xhc3MnOiBpc1JlYXNvbkVtcHR5fVwiIGlkPVwicmVhc29uXCIgYXJpYS1sYWJlbD1cInJlYXNvblwiICBuYW1lPVwicmVhc29uXCIgdHlwZT1cInRleHRcIiBhcmlhLWRlc2NyaWJlZGJ5PVwicmVhc29uXCIgbWF4bGVuZ3RoPVwie3tyZWFzb25MZW5ndGh9fVwiICBmb3JtQ29udHJvbE5hbWU9XCJyZWFzb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi1ncm91cFwiPlxuICAgICAgICAgIDxidXR0b24gIChjbGljayk9XCJnb3RvUGFydGlhbEZlZVJlZnVuZFNjcmVlbigpXCIgY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnlcIj4gUHJldmlvdXM8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJnb3RvSXNzdWVSZWZ1bmRDb25maXJtYXRpb24ocGF5bWVudClcIiBjbGFzcz1cImdvdnVrLWJ1dHRvblwiPiBDb250aW51ZTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8cD5cbiAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnb3RvQ2FzZXRyYW5zYXRpb25QYWdlQ2FuY2VsQnRuQ2xpY2tlZCgkZXZlbnQpXCIgY2xhc3M9XCJnb3Z1ay1saW5rXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj5cbiAgICAgICAgICAgIENhbmNlbFxuICAgICAgICA8L2E+XG4gICAgPC9wPlxuICAgIFxuPC9uZy1jb250YWluZXI+XG48bmctY29udGFpbmVyICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ2NvbnRhY3REZXRhaWxzUGFnZSdcIj5cbiAgPGlucHV0ICNteUlucHV0IHR5cGU9J2hpZGRlbicgaWQ9J2lGcmFtZURyaXZlbkltYWdlVmFsdWUnIHZhbHVlPSdDQVBUVVJFQUREUkVTU0RFVEFJTFNQQUdFJz4gICAgICBcbiAgICA8aDEgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLWxcIj5Qcm9jZXNzIHJlZnVuZDwvaDE+XG4gICAgPGgyIGNsYXNzPVwiZ292dWstaGVhZGluZy1tIGdvdnVrLWZvbnQxOXB4XCI+Q2FzZSByZWZlcmVuY2U6IHt7Y2NkQ2FzZU51bWJlciB8IGNjZEh5cGhlbnMgfX08L2gyPlxuICAgIDxzcGFuIGlkPVwiaG93LWNvbnRhY3RlZC1jb25kaXRpb25hbC1oaW50XCIgY2xhc3M9XCJnb3Z1ay1oaW50IGdvdnVrLWZvbnQxOXB4XCI+XG4gICAgICBQYXltZW50IHJlZmVyZW5jZToge3twYXltZW50UmVmZXJlbmNlfX1cbiAgICA8L3NwYW4+XG4gIDxjY3BheS1jb250YWN0LWRldGFpbHNcbiAgW2FkZHJlc3NPYmpdID0gbm90aWZpY2F0aW9uXG4gIChhc3NpZ25Db250YWN0RGV0YWlscyk9XCJnZXRDb250YWN0RGV0YWlscygkZXZlbnQsICdjaGVja2lzc3VlcmVmdW5kcGFnZScpXCJcbiAgKHJlZGlyZWN0VG9Jc3N1ZVJlZnVuZCk9XCJnb3RvUmVmdW5kUmVhc29uUGFnZSgpXCIgPjwvY2NwYXktY29udGFjdC1kZXRhaWxzPlxuICA8cD5cbiAgICAgIDxhIChjbGljayk9XCJnb3RvQ2FzZXRyYW5zYXRpb25QYWdlQ2FuY2VsQnRuQ2xpY2tlZCgkZXZlbnQpXCIgY2xhc3M9XCJnb3Z1ay1saW5rXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj5cbiAgICAgICAgICBDYW5jZWxcbiAgICAgIDwvYT5cbiAgPC9wPlxuXG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdjaGVja2lzc3VlcmVmdW5kcGFnZSdcIj5cbiAgICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBpZD0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J0NIRUNLSVNTVUVSRUZVTkRQQUdFJz4gXG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dFwiPlxuICAgICBcbiAgICAgICAgPGgxIGNsYXNzPVwiaGVhZGluZy1sYXJnZVwiPiBDaGVjayB5b3VyIGFuc3dlcnM8L2gxPlxuICAgIDwvZGl2PlxuICAgIDx0YWJsZSBjbGFzcz1cImdvdnVrLXRhYmxlXCI+XG4gICAgICAgIFxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5QYXltZW50IHJlZmVyZW5jZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7cGF5bWVudFJlZmVyZW5jZX19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+UGF5bWVudCBhbW91bnQ8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57e3BheW1lbnQuYW1vdW50IHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMid9fTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0cj5cbiAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+UmVhc29uIGZvciByZWZ1bmQ8L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7IGRpc3BsYXlSZWZ1bmRSZWFzb24/LnRyaW0oKSAgfX0gXG4gICAgICAgICA8YSAoY2xpY2spPVwiY2hhbmdlSXNzdWVSZWZ1bmRSZWFzb24oKVwiIGNsYXNzPVwiZ292dWstbGluayByaWdodFwiID5DaGFuZ2U8L2E+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICpuZ0lmPVwiIWlzRnVsbHlSZWZ1bmRcIj5cbiAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+UmVmdW5kIGFtb3VudDwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3t0b3RhbFJlZnVuZEFtb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInfX1cbiAgICAgICAgPGEgKGNsaWNrKT1cImNoYW5nZVJlZnVuZEFtb3VudCgpXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHJpZ2h0XCIgPkNoYW5nZTwvYT5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCIgKm5nSWY9XCJpc0Z1bGx5UmVmdW5kXCI+XG4gICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlJlZnVuZCBhbW91bnQ8L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7cGF5bWVudC5hbW91bnQgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJ319PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+U2VuZCB0bzwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57e29yZGVyUGFydHl9fTwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5TZW5kIHZpYTwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJjb250YWN0RGV0YWlsc09iaj8ubm90aWZpY2F0aW9uX3R5cGUgPT09ICdFTUFJTCdcIiBjbGFzcz1cImNvbnRhY3REZXRhaWxzLXdpZHRoXCI+XG4gICAgICAgICAgICA8c3Ryb25nPkVtYWlsPC9zdHJvbmc+XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAge3tjb250YWN0RGV0YWlsc09iaj8uZW1haWw/LnRyaW0oKX19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImNvbnRhY3REZXRhaWxzT2JqPy5ub3RpZmljYXRpb25fdHlwZSA9PT0gJ0xFVFRFUidcIiBjbGFzcz1cImNvbnRhY3REZXRhaWxzLXdpZHRoXCI+XG4gICAgICAgICAgICA8c3Ryb25nPlBvc3Q8L3N0cm9uZz5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICB7e2NvbnRhY3REZXRhaWxzT2JqPy5hZGRyZXNzX2xpbmU/LnRyaW0oKX19Jm5ic3A7e3tjb250YWN0RGV0YWlsc09iaj8uY2l0eT8udHJpbSgpfX0mbmJzcDt7e2NvbnRhY3REZXRhaWxzT2JqPy5jb3VudHk/LnRyaW0oKX19Jm5ic3A7e3tjb250YWN0RGV0YWlsc09iaj8uY291bnRyeT8udHJpbSgpfX0mbmJzcDt7e2NvbnRhY3REZXRhaWxzT2JqPy5wb3N0YWxfY29kZT8udHJpbSgpfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YSAoY2xpY2spPVwiZ290b0NvbnRhY3REZXRhaWxzUGFnZShjb250YWN0RGV0YWlsc09iailcIiBjbGFzcz1cImdvdnVrLWxpbmsgcmlnaHRcIiA+Q2hhbmdlPC9hPlxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cblxuICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5Ob3RpZmljYXRpb248L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7dGVtcGxhdGVJbnN0cnVjdGlvblR5cGV9fVxuICAgICAgICAgICAgPGEgKm5nSWY9XCIhbm90aWZpY2F0aW9uUHJldmlld1wiIGhyZWY9XCJKYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cImdvdnVrLWxpbmsgcmlnaHRcIiAoY2xpY2spPVwic2hvd05vdGlmaWNhdGlvblByZXZpZXcoKVwiPlxuICAgICAgICAgICAgICBQcmV2aWV3XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YSAqbmdJZj1cIm5vdGlmaWNhdGlvblByZXZpZXdcIiBocmVmPVwiSmF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHJpZ2h0XCIgKGNsaWNrKT1cImhpZGVOb3RpZmljYXRpb25QcmV2aWV3KClcIj5cbiAgICAgICAgICAgICAgSGlkZSBQcmV2aWV3XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGFibGU+XG5cbiAgICA8YXBwLW5vdGlmaWNhdGlvbi1wcmV2aWV3ICpuZ0lmPVwibm90aWZpY2F0aW9uUHJldmlld1wiIFxuICAgIFtwYXltZW50XT1cInBheW1lbnRcIiBcbiAgICBbY29udGFjdERldGFpbHNdPVwiY29udGFjdERldGFpbHNPYmpcIlxuICAgIFtyZWZ1bmRSZWFzb25dPVwic2VsZWN0ZWRSZWZ1bmRSZWFzb25Db2RlXCJcbiAgICBbcmVmdW5kQW1vdW50XT1cImlzRnVsbHlSZWZ1bmQgPyBwYXltZW50LmFtb3VudCA6IHRvdGFsUmVmdW5kQW1vdW50XCI+PC9hcHAtbm90aWZpY2F0aW9uLXByZXZpZXc+XG5cblxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1idXR0b24tZ3JvdXBcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiIChjbGljayk9XCJnb3RvQ29udGFjdERldGFpbHNQYWdlKGNvbnRhY3REZXRhaWxzT2JqKVwiPiBQcmV2aW91cyA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIlxuICAgIFtkaXNhYmxlZF09XCJpc0NvbmZpcm1hdGlvbkJ0bkRpc2FibGVkXCJcbiAgICBbbmdDbGFzc109J2lzQ29uZmlybWF0aW9uQnRuRGlzYWJsZWQgPyBcImJ1dHRvbiBidXR0b24tLWRpc2FibGVkIGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTFcIiA6IFwiYnV0dG9uIGdvdnVrLSEtbWFyZ2luLXJpZ2h0LTFcIidcbiAgICAoY2xpY2spPVwiY29uZmlybUlzc3VlUmVmdW5kKGlzRnVsbHlSZWZ1bmQpXCI+XG4gICAgICBTdWJtaXQgcmVmdW5kXG4gICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPHA+XG4gICAgICAgIDxhIChjbGljayk9XCJnb3RvQ2FzZXRyYW5zYXRpb25QYWdlQ2FuY2VsQnRuQ2xpY2tlZCgkZXZlbnQpXCIgY2xhc3M9XCJnb3Z1ay1saW5rXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj5cbiAgICAgICAgICAgIENhbmNlbFxuICAgICAgICA8L2E+XG4gICAgPC9wPlxuXG48L25nLWNvbnRhaW5lcj5cblxuPCEtLVJldHJvIFJlZnVuZC0tPlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdDb21wU3RhdHVzID09PSAnYWRkcmVmdW5kZm9ycmVtaXNzaW9uJ1wiPlxuICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBpZD0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J0FERFJFU1NERVRBSUxTUkVUUk9SRU1JU1NJT05QQUdFJz4gICAgICBcbiAgPGgxIGNsYXNzPVwiZ292dWstaGVhZGluZy1sXCI+UHJvY2VzcyByZWZ1bmQ8L2gxPlxuICA8aDIgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLW0gZ292dWstZm9udDE5cHhcIj5DYXNlIHJlZmVyZW5jZToge3tjY2RDYXNlTnVtYmVyIHwgY2NkSHlwaGVucyB9fTwvaDI+XG4gIDxzcGFuIGlkPVwiaG93LWNvbnRhY3RlZC1jb25kaXRpb25hbC1oaW50XCIgY2xhc3M9XCJnb3Z1ay1oaW50IGdvdnVrLWZvbnQxOXB4XCI+XG4gICAgUGF5bWVudCByZWZlcmVuY2U6IHt7cGF5bWVudFJlZmVyZW5jZX19XG4gIDwvc3Bhbj5cbjxjY3BheS1jb250YWN0LWRldGFpbHMgXG5bYWRkcmVzc09ial0gPSBub3RpZmljYXRpb25cbihhc3NpZ25Db250YWN0RGV0YWlscyk9XCJnZXRDb250YWN0RGV0YWlscygkZXZlbnQsICdhZGRyZWZ1bmRjaGVja2FuZGFuc3dlcicpXCJcbihyZWRpcmVjdFRvSXNzdWVSZWZ1bmQpPVwiZ290b1NlcnZpY2VSZXF1ZXN0UGFnZSgkZXZlbnQpXCIgPjwvY2NwYXktY29udGFjdC1kZXRhaWxzPlxuPHA+XG4gICAgPGEgKGNsaWNrKT1cImdvdG9DYXNldHJhbnNhdGlvblBhZ2VDYW5jZWxCdG5DbGlja2VkKCRldmVudClcIiBjbGFzcz1cImdvdnVrLWxpbmtcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWJ1dHRvblwiPlxuICAgICAgICBDYW5jZWxcbiAgICA8L2E+XG48L3A+XG48L25nLWNvbnRhaW5lcj5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3U3RhdHVzID09PSAnYWRkcmVmdW5kY2hlY2thbmRhbnN3ZXInXCI+XG4gICAgPGlucHV0ICNteUlucHV0IHR5cGU9J2hpZGRlbicgaWQ9J2lGcmFtZURyaXZlbkltYWdlVmFsdWUnIHZhbHVlPSdBRERSRUZVTkRGT1JSRU1JU1NJT04nPiBcbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0XCI+XG4gICAgIFxuICAgICAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLWxhcmdlXCI+IENoZWNrIHlvdXIgYW5zd2VyczwvaDE+XG4gICAgPC9kaXY+XG4gICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+UmVhc29uIGZvciByZWZ1bmQ8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj5SZXRyb3NwZWN0aXZlIHJlbWlzc2lvbjwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlBheW1lbnQgcmVmZXJlbmNlPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3twYXltZW50UmVmZXJlbmNlfX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5SZWZ1bmQgYW1vdW50PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3tyZW1pc3Npb24uaHdmX2Ftb3VudCB8IGN1cnJlbmN5OidHQlAnOidzeW1ib2wtbmFycm93JzonMS4yLTInfX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5GZWUgY29kZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7cmVtaXNzaW9uLmZlZV9jb2RlfX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5GZWUgYW1vdW50PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3tmZWVhbW91bnQgfCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJ319PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlNlbmQgdG88L3RkPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3tvcmRlclBhcnR5fX08L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+U2VuZCB2aWE8L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY29udGFjdERldGFpbHNPYmo/Lm5vdGlmaWNhdGlvbl90eXBlID09PSAnRU1BSUwnXCIgY2xhc3M9XCJjb250YWN0RGV0YWlscy13aWR0aFwiPlxuICAgICAgICAgICAgPHN0cm9uZz5FbWFpbDwvc3Ryb25nPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIHt7Y29udGFjdERldGFpbHNPYmo/LmVtYWlsPy50cmltKCl9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJjb250YWN0RGV0YWlsc09iaj8ubm90aWZpY2F0aW9uX3R5cGUgPT09ICdMRVRURVInXCIgY2xhc3M9XCJjb250YWN0RGV0YWlscy13aWR0aFwiPlxuICAgICAgICAgICAgPHN0cm9uZz5Qb3N0PC9zdHJvbmc+XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAge3tjb250YWN0RGV0YWlsc09iaj8uYWRkcmVzc19saW5lPy50cmltKCl9fSZuYnNwO3t7Y29udGFjdERldGFpbHNPYmo/LmNpdHk/LnRyaW0oKX19Jm5ic3A7e3tjb250YWN0RGV0YWlsc09iaj8uY291bnR5Py50cmltKCl9fSZuYnNwO3t7Y29udGFjdERldGFpbHNPYmo/LmNvdW50cnk/LnRyaW0oKX19Jm5ic3A7e3tjb250YWN0RGV0YWlsc09iaj8ucG9zdGFsX2NvZGU/LnRyaW0oKX19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGEgKGNsaWNrKT1cImdvdG9BZGRyZXNzUGFnZShjb250YWN0RGV0YWlsc09iailcIiBjbGFzcz1cImdvdnVrLWxpbmsgcmlnaHRcIiA+Q2hhbmdlPC9hPlxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cblxuICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5Ob3RpZmljYXRpb248L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7dGVtcGxhdGVJbnN0cnVjdGlvblR5cGV9fVxuICAgICAgICAgICAgPGEgKm5nSWY9XCIhbm90aWZpY2F0aW9uUHJldmlld1wiIGhyZWY9XCJKYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cImdvdnVrLWxpbmsgcmlnaHRcIiAoY2xpY2spPVwic2hvd05vdGlmaWNhdGlvblByZXZpZXcoKVwiPlxuICAgICAgICAgICAgICBQcmV2aWV3XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YSAqbmdJZj1cIm5vdGlmaWNhdGlvblByZXZpZXdcIiBocmVmPVwiSmF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHJpZ2h0XCIgKGNsaWNrKT1cImhpZGVOb3RpZmljYXRpb25QcmV2aWV3KClcIj5cbiAgICAgICAgICAgICAgSGlkZSBQcmV2aWV3XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGFibGU+XG5cbiAgICA8YXBwLW5vdGlmaWNhdGlvbi1wcmV2aWV3ICpuZ0lmPVwibm90aWZpY2F0aW9uUHJldmlld1wiIFxuICAgIFtjb250YWN0RGV0YWlsc109XCJjb250YWN0RGV0YWlsc09ialwiXG4gICAgW3BheW1lbnRSZWZlcmVuY2VdPVwicGF5bWVudFJlZmVyZW5jZVwiXG4gICAgW3BheW1lbnRdPVwicGF5bWVudE9ialwiXG4gICAgW3JlZnVuZFJlYXNvbl09XCInUlIwMzYnXCJcbiAgICBbcmVmdW5kQW1vdW50XT1cInJlbWlzc2lvbi5od2ZfYW1vdW50XCI+PC9hcHAtbm90aWZpY2F0aW9uLXByZXZpZXc+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCI+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnlcIiAoY2xpY2spPVwiZ290b0FkZHJlc3NQYWdlKGNvbnRhY3REZXRhaWxzT2JqKVwiPlByZXZpb3VzPC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCJcbiAgICBbZGlzYWJsZWRdPVwiaXNDb25maXJtYXRpb25CdG5EaXNhYmxlZFwiXG4gICAgW25nQ2xhc3NdPSdpc0NvbmZpcm1hdGlvbkJ0bkRpc2FibGVkID8gXCJidXR0b24gYnV0dG9uLS1kaXNhYmxlZCBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCIgOiBcImJ1dHRvbiBnb3Z1ay0hLW1hcmdpbi1yaWdodC0xXCInXG4gICAgKGNsaWNrKT1cInByb2Nlc3NSZWZ1bmQoKVwiPlxuICAgICAgU3VibWl0IHJlZnVuZFxuICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxwPlxuICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgIChjbGljayk9XCJnb3RvQ2FzZXRyYW5zYXRpb25QYWdlQ2FuY2VsQnRuQ2xpY2tlZCgkZXZlbnQpXCIgY2xhc3M9XCJnb3Z1ay1saW5rXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj5cbiAgICAgICAgICAgIENhbmNlbFxuICAgICAgICA8L2E+XG4gICAgPC9wPlxuXG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdyZXRyb3JlZnVuZGNvbmZpcm1hdGlvbnBhZ2UnXCI+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLXJvd1wiPlxuICAgIDxkaXYgPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXBhbmVsIGdvdnVrLXBhbmVsLS1jb25maXJtYXRpb25cIj5cbiAgICAgICAgPGgxIGNsYXNzPVwiZ292dWstcGFuZWxfX3RpdGxlXCI+XG4gICAgICAgICAgUmVmdW5kIHN1Ym1pdHRlZFxuICAgICAgICA8L2gxPlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXBhbmVsX19ib2R5XCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5IHdoaXRlXCI+PHN0cm9uZz5SZWZ1bmQgcmVmZXJlbmNlOiB7e3JlZnVuZFJlZmVyZW5jZX19PC9zdHJvbmc+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgXG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJpc1BheW1lbnRTdWNjZXNzXCI+XG4gICAgICA8aDIgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLWxcIj5XaGF0IGhhcHBlbnMgbmV4dDwvaDI+XG4gICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5cbiAgICAgICAgQSByZWZ1bmQgcmVxdWVzdCBmb3Ige3sgcmVmdW5kQW1vdW50fCBjdXJyZW5jeTonR0JQJzonc3ltYm9sLW5hcnJvdyc6JzEuMi0yJ319IGhhcyBiZWVuIHBhc3NlZCB0byBhIHRlYW0gbGVhZGVyIHRvIGFwcHJvdmUuXG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5XCI+XG4gICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnb3RvQ2FzZXRyYW5zYXRpb25QYWdlQ2FuY2VsQnRuQ2xpY2tlZCgkZXZlbnQpXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHBvaW50ZXJcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWJ1dHRvblwiPlxuICAgICAgUmV0dXJuIHRvIGNhc2VcbiAgPC9hPlxuICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdvcmRlci1mdWxsLXZpZXcnXCI+XG4gIDxjY3BheS1zZXJ2aWNlLXJlcXVlc3RcbiAgW3ZpZXdTdGF0dXNdID0gXCJ2aWV3U3RhdHVzXCJcbiAgW29yZGVyUmVmXSA9IFwib3JkZXJSZWZcIlxuICBbaXNTZXJ2aWNlUmVxdWVzdF09XCJpc1NlcnZpY2VSZXF1ZXN0XCJcbiAgW29yZGVyU3RhdHVzXSA9IFwib3JkZXJTdGF0dXNcIlxuICBbb3JkZXJDcmVhdGVkXSA9IFwib3JkZXJDcmVhdGVkXCJcbiAgW29yZGVyUGFydHldID0gXCJvcmRlclBhcnR5XCJcbiAgW29yZGVyQ0NERXZlbnRdID0gXCJvcmRlckNDREV2ZW50XCJcbiAgW29yZGVyRGV0YWlsXSA9IFwib3JkZXJEZXRhaWxcIlxuICBbTE9HR0VESU5VU0VSUk9MRVNdID0gXCJMT0dHRURJTlVTRVJST0xFU1wiXG4gIFt0YWtlUGF5bWVudF0gPSBcInRha2VQYXltZW50XCJcbiAgW2NjZENhc2VOdW1iZXJdID0gXCJjY2RDYXNlTnVtYmVyXCJcbiAgW29yZGVyRmVlc1RvdGFsXSA9IFwib3JkZXJGZWVzVG90YWxcIlxuICBbb3JkZXJUb3RhbFBheW1lbnRzXSA9IFwib3JkZXJUb3RhbFBheW1lbnRzXCJcbiAgW29yZGVyUmVtaXNzaW9uVG90YWxdID0gXCJvcmRlclJlbWlzc2lvblRvdGFsXCI+XG48L2NjcGF5LXNlcnZpY2UtcmVxdWVzdD5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ3BheW1lbnQtdmlldydcIj5cbiAgPGNjcGF5LXBheW1lbnQtdmlldyBcbiAgW0xPR0dFRElOVVNFUlJPTEVTXSA9IFwiTE9HR0VESU5VU0VSUk9MRVNcIlxuICBbaXNUdXJuT2ZmXSA9IFwiaXNUdXJuT2ZmXCIgXG4gIFtpc1Rha2VQYXltZW50XSA9IFwidGFrZVBheW1lbnRcIiAgXG4gIFtjYXNlVHlwZV0gPSBcImNhc2VUeXBlXCJcbiAgW2lzU2VydmljZVJlcXVlc3RdPVwiaXNTZXJ2aWNlUmVxdWVzdFwiXG4gIFtvcmRlclJlZl0gPSBcIm9yZGVyUmVmXCJcbiAgW29yZGVyU3RhdHVzXSA9IFwib3JkZXJTdGF0dXNcIlxuICBbb3JkZXJDcmVhdGVkXSA9IFwib3JkZXJDcmVhdGVkXCJcbiAgW29yZGVyUGFydHldID0gXCJvcmRlclBhcnR5XCJcbiAgW29yZGVyQ0NERXZlbnRdID0gXCJvcmRlckNDREV2ZW50XCJcbiAgW29yZGVyRGV0YWlsXSA9IFwib3JkZXJEZXRhaWxcIlxuICBbb3JkZXJGZWVzVG90YWxdID0gXCJvcmRlckZlZXNUb3RhbFwiXG4gIFtvcmRlclRvdGFsUGF5bWVudHNdID0gXCJvcmRlclRvdGFsUGF5bWVudHNcIlxuICBbb3JkZXJSZW1pc3Npb25Ub3RhbF0gPSBcIm9yZGVyUmVtaXNzaW9uVG90YWxcIlxuICA+XG48L2NjcGF5LXBheW1lbnQtdmlldz5cbjwvbmctY29udGFpbmVyPlxuXG48L2Rpdj4iXX0=