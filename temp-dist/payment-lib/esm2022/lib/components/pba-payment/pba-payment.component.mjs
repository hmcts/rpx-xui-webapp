import { Component, Input } from '@angular/core';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { IserviceRequestCardPayment } from '../../interfaces/IserviceRequestCardPayment';
import { IserviceRequestPbaPayment } from '../../interfaces/IserviceRequestPbaPayment';
import * as i0 from "@angular/core";
import * as i1 from "../../payment-lib.component";
import * as i2 from "../../services/payment-view/payment-view.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
function PbaPaymentComponent_ng_container_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3)(1, "ol", 4)(2, "li", 5)(3, "a", 6);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_div_1_Template_a_click_3_listener() { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r10.gotoCasetransationPage()); });
    i0.ɵɵtext(4, "Back");
    i0.ɵɵelementEnd()()()();
} }
function PbaPaymentComponent_ng_container_0_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "h2", 15);
    i0.ɵɵtext(2, " There is a problem ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 16)(4, "ul", 17)(5, "li", 18);
    i0.ɵɵtext(6, " Your PBA account cannot be found. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "li", 18);
    i0.ɵɵtext(8, " If you know your organisation has a PBA, try again. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "li", 18);
    i0.ɵɵtext(10, " You can also pay by credit or debit card. ");
    i0.ɵɵelementEnd()()()();
} }
function PbaPaymentComponent_ng_container_0_div_2_div_8_div_7_option_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pbaAccount_r19 = ctx.$implicit;
    i0.ɵɵpropertyInterpolate("value", pbaAccount_r19);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(pbaAccount_r19);
} }
function PbaPaymentComponent_ng_container_0_div_2_div_8_div_7_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 19)(1, "label", 35);
    i0.ɵɵtext(2, " Enter a reference for your PBA account statements ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 36);
    i0.ɵɵtext(4, " This should be your own unique reference to identify the case. It will appear on your statements. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 37);
    i0.ɵɵlistener("change", function PbaPaymentComponent_ng_container_0_div_2_div_8_div_7_div_8_Template_input_change_5_listener($event) { i0.ɵɵrestoreView(_r21); const ctx_r20 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r20.selectpbaaccount($event)); });
    i0.ɵɵelementEnd()();
} }
function PbaPaymentComponent_ng_container_0_div_2_div_8_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 28)(1, "div", 29)(2, "label", 30);
    i0.ɵɵtext(3, " Select a PBA ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 31);
    i0.ɵɵlistener("change", function PbaPaymentComponent_ng_container_0_div_2_div_8_div_7_Template_select_change_4_listener($event) { i0.ɵɵrestoreView(_r23); const ctx_r22 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r22.selectpbaaccount($event)); });
    i0.ɵɵelementStart(5, "option", 32);
    i0.ɵɵtext(6, "Select option");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, PbaPaymentComponent_ng_container_0_div_2_div_8_div_7_option_7_Template, 2, 2, "option", 33);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, PbaPaymentComponent_ng_container_0_div_2_div_8_div_7_div_8_Template, 6, 0, "div", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r16.pbaAccountList);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r16.errorMsg && ctx_r16.selectedPbaAccount);
} }
function PbaPaymentComponent_ng_container_0_div_2_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 19)(1, "fieldset", 20)(2, "div", 21)(3, "div", 22)(4, "input", 23);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_div_2_div_8_Template_input_click_4_listener() { i0.ɵɵrestoreView(_r25); const ctx_r24 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r24.selectPaymentMethod("PBA")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "label", 24);
    i0.ɵɵtext(6, " Pay fee using Payment by Account (PBA) ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, PbaPaymentComponent_ng_container_0_div_2_div_8_div_7_Template, 9, 2, "div", 25);
    i0.ɵɵelementStart(8, "div", 22)(9, "input", 26);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_div_2_div_8_Template_input_click_9_listener() { i0.ɵɵrestoreView(_r25); const ctx_r26 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r26.selectPaymentMethod("CARD")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "label", 27);
    i0.ɵɵtext(11, " Pay by credit or debit card ");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r13.isPbaAccountSelected);
} }
function PbaPaymentComponent_ng_container_0_div_2_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 38)(1, "button", 39);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_div_2_div_9_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r28); const ctx_r27 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r27.gotoCasetransationPage()); });
    i0.ɵɵtext(2, " View Service Request ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 40);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_div_2_div_9_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r28); const ctx_r29 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r29.cardPayment()); });
    i0.ɵɵtext(4, " Pay by card ");
    i0.ɵɵelementEnd()();
} }
function PbaPaymentComponent_ng_container_0_div_2_div_10_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Continue");
    i0.ɵɵelementEnd();
} }
function PbaPaymentComponent_ng_container_0_div_2_div_10_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Confirm payment");
    i0.ɵɵelementEnd();
} }
function PbaPaymentComponent_ng_container_0_div_2_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 38)(1, "button", 41);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_div_2_div_10_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r33); const ctx_r32 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r32.saveAndContinue()); });
    i0.ɵɵtemplate(2, PbaPaymentComponent_ng_container_0_div_2_div_10_span_2_Template, 2, 0, "span", 0);
    i0.ɵɵtemplate(3, PbaPaymentComponent_ng_container_0_div_2_div_10_span_3_Template, 2, 0, "span", 0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r15.isContinueButtondisabled);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r15.isPBADropdownSelected);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.isPBADropdownSelected);
} }
function PbaPaymentComponent_ng_container_0_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtemplate(1, PbaPaymentComponent_ng_container_0_div_2_div_1_Template, 11, 0, "div", 8);
    i0.ɵɵelementStart(2, "div", 9)(3, "label", 10);
    i0.ɵɵtext(4, " Amount to pay ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 11);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, PbaPaymentComponent_ng_container_0_div_2_div_8_Template, 12, 1, "div", 12);
    i0.ɵɵtemplate(9, PbaPaymentComponent_ng_container_0_div_2_div_9_Template, 5, 0, "div", 13);
    i0.ɵɵtemplate(10, PbaPaymentComponent_ng_container_0_div_2_div_10_Template, 4, 3, "div", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.errorMsg);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(7, 5, ctx_r2.pbaPayOrderRef.orderTotalFees, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r2.errorMsg);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.errorMsg);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r2.errorMsg);
} }
function PbaPaymentComponent_ng_container_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 42)(2, "main", 43)(3, "div", 44)(4, "div", 45)(5, "span", 46);
    i0.ɵɵtext(6, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong", 47)(8, "span", 48);
    i0.ɵɵtext(9, "Warning");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "h2", 49);
    i0.ɵɵtext(11, "You don\u2019t have a registered PBA.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 50)(13, "h2", 51);
    i0.ɵɵtext(14, "Pay by credit or debit card");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p", 52);
    i0.ɵɵtext(16, " We recommend that you apply to get a new PBA to pay for fees. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p", 53);
    i0.ɵɵtext(18, " you can also pay by credit or debit card if you need to pay now ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p", 54)(20, "button", 40);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_ng_container_3_Template_button_click_20_listener() { i0.ɵɵrestoreView(_r35); const ctx_r34 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r34.cardPayment()); });
    i0.ɵɵtext(21, " Pay by card ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "div", 50)(23, "h2", 51);
    i0.ɵɵtext(24, "Register an existing PBA with MyHMCTS");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "p", 52);
    i0.ɵɵtext(26, " You may find it easier in future to pay by PBA, your organisation administrator will need to email ");
    i0.ɵɵelementStart(27, "a", 55);
    i0.ɵɵtext(28, "MyHMCTSsupport@justice.gov.uk");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(29, " to ask for your PBA to be registered with your MyHMCTS account. You should include your organisation name and PBA number. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "p", 52);
    i0.ɵɵtext(31, " It can then take up to 3 days for your account to be updated. You\u2019ll need to start your claim again to pay the fee. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div", 50)(33, "h2", 51);
    i0.ɵɵtext(34, "Apply to get a new PBA ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "p", 52);
    i0.ɵɵtext(36, " You\u2019ll need to provide details for you and your organisation, including the required credit limit for your account. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "p", 52);
    i0.ɵɵtext(38, " Once your account has been registered, you\u2019ll need to start your claim again to pay the fee. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "p", 52);
    i0.ɵɵtext(40, " Read more information on ");
    i0.ɵɵelementStart(41, "a", 56);
    i0.ɵɵtext(42, "registering for PBA");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(43, ". ");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementContainerEnd();
} }
function PbaPaymentComponent_ng_container_0_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    const _r37 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 42)(2, "main", 43)(3, "div", 44)(4, "div", 14)(5, "h2", 15);
    i0.ɵɵtext(6, " There is a problem ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 16)(8, "ul", 17)(9, "li", 18);
    i0.ɵɵtext(10, " You don't have enough funds in your PBA account to pay for this fee. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "li", 18);
    i0.ɵɵtext(12, " If you have already topped up your PBA account, wait up to 24 hours for the new balance to become available. ");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(13, "div", 50)(14, "h2", 51);
    i0.ɵɵtext(15, "Should you need any further advice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p", 52);
    i0.ɵɵtext(17, " Email ");
    i0.ɵɵelementStart(18, "a", 57);
    i0.ɵɵtext(19, "MiddleOffice.DDservices@liberata.com");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(20, " or call ");
    i0.ɵɵelementStart(21, "a", 58);
    i0.ɵɵtext(22, "01633 652 125");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(23, " (option 3) to try to fix the issue. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "p", 52);
    i0.ɵɵtext(25, " you can also pay by credit or debit card. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 38)(27, "button", 39);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_ng_container_4_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r37); const ctx_r36 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r36.gotoCasetransationPage()); });
    i0.ɵɵtext(28, " View Service Request ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "button", 40);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_ng_container_4_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r37); const ctx_r38 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r38.cardPayment()); });
    i0.ɵɵtext(30, " Pay by card ");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementContainerEnd();
} }
function PbaPaymentComponent_ng_container_0_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    const _r40 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 42)(2, "main", 43)(3, "div", 44)(4, "div", 14)(5, "h2", 15);
    i0.ɵɵtext(6, " There is a problem ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 16)(8, "ul", 17)(9, "li", 18);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(11, "div", 50)(12, "h2", 51);
    i0.ɵɵtext(13, "Should you need any further advice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 59);
    i0.ɵɵtext(15, " Email ");
    i0.ɵɵelementStart(16, "a", 57);
    i0.ɵɵtext(17, "MiddleOffice.DDservices@liberata.com");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(18, " or call ");
    i0.ɵɵelementStart(19, "a", 58);
    i0.ɵɵtext(20, "01633 652 125");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(21, " (option 3) to try to fix the issue. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p", 52);
    i0.ɵɵtext(23, " you can also pay by credit or debit card. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 38)(25, "button", 39);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_ng_container_5_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r40); const ctx_r39 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r39.gotoCasetransationPage()); });
    i0.ɵɵtext(26, " View Service Request ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "button", 40);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_ng_container_5_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r40); const ctx_r41 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r41.cardPayment()); });
    i0.ɵɵtext(28, " Pay by card ");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1(" Your PBA account (", ctx_r5.selectedPbaAccount, ") no longer exists. ");
} }
function PbaPaymentComponent_ng_container_0_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    const _r43 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 42)(2, "main", 43)(3, "div", 44)(4, "div", 14)(5, "h2", 15);
    i0.ɵɵtext(6, " There is a problem ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 16)(8, "ul", 17)(9, "li", 18);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(11, "div", 50)(12, "h2", 51);
    i0.ɵɵtext(13, "Should you need any further advice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 59);
    i0.ɵɵtext(15, " Email ");
    i0.ɵɵelementStart(16, "a", 57);
    i0.ɵɵtext(17, "MiddleOffice.DDservices@liberata.com");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(18, " or call ");
    i0.ɵɵelementStart(19, "a", 58);
    i0.ɵɵtext(20, "01633 652 125");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(21, " (option 3) to try to fix the issue. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p", 52);
    i0.ɵɵtext(23, " you can also pay by credit or debit card. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 38)(25, "button", 39);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_ng_container_6_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r43); const ctx_r42 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r42.gotoCasetransationPage()); });
    i0.ɵɵtext(26, " View Service Request ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "button", 40);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_ng_container_6_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r43); const ctx_r44 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r44.cardPayment()); });
    i0.ɵɵtext(28, " Pay by card ");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1(" Your PBA account (", ctx_r6.selectedPbaAccount, ") has been put on hold. ");
} }
function PbaPaymentComponent_ng_container_0_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r46 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 42)(2, "main", 43)(3, "div", 44)(4, "div", 50)(5, "h2", 60);
    i0.ɵɵtext(6, "Sorry, there is a problem with the service");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 52);
    i0.ɵɵtext(8, " Try again later. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 52);
    i0.ɵɵtext(10, " you can also pay by credit or debit card. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 38)(12, "button", 39);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_ng_container_7_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r46); const ctx_r45 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r45.gotoCasetransationPage()); });
    i0.ɵɵtext(13, " View Service Request ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 40);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_ng_container_7_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r46); const ctx_r47 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r47.cardPayment()); });
    i0.ɵɵtext(15, " Pay by card ");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementContainerEnd();
} }
function PbaPaymentComponent_ng_container_0_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    const _r49 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 42)(2, "main", 43)(3, "div", 44)(4, "div", 61)(5, "h1", 62);
    i0.ɵɵtext(6, " Payment successful ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 63);
    i0.ɵɵtext(8, " Your payment reference is ");
    i0.ɵɵelement(9, "br");
    i0.ɵɵelementStart(10, "strong");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "p", 52)(13, "a", 64);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_ng_container_8_Template_a_click_13_listener() { i0.ɵɵrestoreView(_r49); const ctx_r48 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r48.gotoCasetransationPage()); });
    i0.ɵɵtext(14, "View service requests");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r8.pbaAccountrPaymentResult.payment_reference);
} }
function PbaPaymentComponent_ng_container_0_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    const _r51 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 42)(2, "main", 43)(3, "div", 44)(4, "div", 50)(5, "h2", 60);
    i0.ɵɵtext(6, "Sorry, there is a problem with the service");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 52);
    i0.ɵɵtext(8, " Try again later. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 52)(10, "a", 64);
    i0.ɵɵlistener("click", function PbaPaymentComponent_ng_container_0_ng_container_9_Template_a_click_10_listener() { i0.ɵɵrestoreView(_r51); const ctx_r50 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r50.gotoCasetransationPage()); });
    i0.ɵɵtext(11, "View service requests");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementContainerEnd();
} }
function PbaPaymentComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, PbaPaymentComponent_ng_container_0_div_1_Template, 5, 0, "div", 1);
    i0.ɵɵtemplate(2, PbaPaymentComponent_ng_container_0_div_2_Template, 11, 10, "div", 2);
    i0.ɵɵtemplate(3, PbaPaymentComponent_ng_container_0_ng_container_3_Template, 44, 0, "ng-container", 0);
    i0.ɵɵtemplate(4, PbaPaymentComponent_ng_container_0_ng_container_4_Template, 31, 0, "ng-container", 0);
    i0.ɵɵtemplate(5, PbaPaymentComponent_ng_container_0_ng_container_5_Template, 29, 1, "ng-container", 0);
    i0.ɵɵtemplate(6, PbaPaymentComponent_ng_container_0_ng_container_6_Template, 29, 1, "ng-container", 0);
    i0.ɵɵtemplate(7, PbaPaymentComponent_ng_container_0_ng_container_7_Template, 16, 0, "ng-container", 0);
    i0.ɵɵtemplate(8, PbaPaymentComponent_ng_container_0_ng_container_8_Template, 15, 1, "ng-container", 0);
    i0.ɵɵtemplate(9, PbaPaymentComponent_ng_container_0_ng_container_9_Template, 12, 0, "ng-container", 0);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.errorMsg && !ctx_r0.isPBAAccountPaymentSuccess && !ctx_r0.isCardPaymentSuccess);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ((ctx_r0.pbaAccountList == null ? null : ctx_r0.pbaAccountList.length) > 0 || ctx_r0.errorMsg) && !ctx_r0.isInSufficiantFund && !ctx_r0.isPBAAccountNotExist && !ctx_r0.isPBAServerError && !ctx_r0.isPBAAccountHold && !ctx_r0.isPBAAccountPaymentSuccess && ctx_r0.isCardPaymentSuccess);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r0.pbaAccountList == null ? null : ctx_r0.pbaAccountList.length) <= 0 && !ctx_r0.errorMsg && ctx_r0.isGetPBAAccountSucceed && ctx_r0.isCardPaymentSuccess);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isInSufficiantFund && ctx_r0.isCardPaymentSuccess);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isPBAAccountNotExist && ctx_r0.isCardPaymentSuccess);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isPBAAccountHold && ctx_r0.isCardPaymentSuccess);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isPBAServerError && ctx_r0.isCardPaymentSuccess);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isPBAAccountPaymentSuccess && ctx_r0.isCardPaymentSuccess);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.isCardPaymentSuccess);
} }
const BS_ENABLE_FLAG = 'bulk-scan-enabling-fe';
export class PbaPaymentComponent {
    paymentLibComponent;
    paymentViewService;
    pbaPayOrderRef;
    viewStatus;
    pbaAccountList;
    isPBAAccountHold = false;
    errorMsg;
    isCardPaymentSuccess = true;
    isInSufficiantFund = false;
    isPBAAccountNotExist = false;
    isPBAServerError = false;
    isGetPBAAccountSucceed = false;
    selectedPbaAccount = '';
    pbaAccountRef = '';
    isPbaAccountSelected = false;
    isCardPaymentSelected = false;
    isPBADropdownSelected = false;
    isContinueButtondisabled = true;
    isPBAAccountPaymentSuccess = false;
    pbaAccountrPaymentResult;
    orgName = '';
    constructor(paymentLibComponent, paymentViewService) {
        this.paymentLibComponent = paymentLibComponent;
        this.paymentViewService = paymentViewService;
    }
    ngOnInit() {
        this.pbaPayOrderRef = this.paymentLibComponent.pbaPayOrderRef;
        this.viewStatus = 'pba-payment';
        this.errorMsg = null;
        this.paymentViewService.getPBAaccountDetails()
            .subscribe(result => {
            this.isGetPBAAccountSucceed = true;
            this.orgName = result.organisationEntityResponse.name;
            this.pbaAccountList = result.organisationEntityResponse.paymentAccount;
        }, error => {
            this.errorMsg = error;
        });
    }
    selectpbaaccount(args) {
        if (args.currentTarget.id === 'pbaAccountNumber') {
            this.isPBADropdownSelected = true;
            this.selectedPbaAccount = args.target.value;
        }
        if (args.currentTarget.id === 'pbaAccountRef') {
            this.pbaAccountRef = args.target.value;
        }
        if (this.selectedPbaAccount !== '' && this.pbaAccountRef !== "") {
            this.isContinueButtondisabled = false;
        }
        else {
            this.isContinueButtondisabled = true;
        }
    }
    saveAndContinue() {
        if (this.isPbaAccountSelected) {
            this.isInSufficiantFund = false;
            this.isPBAAccountNotExist = false;
            this.isPBAServerError = false;
            this.isPBAAccountPaymentSuccess = false;
            this.isContinueButtondisabled = true;
            if (this.pbaAccountList.indexOf(this.selectedPbaAccount) !== -1) {
                const requestBody = new IserviceRequestPbaPayment(this.selectedPbaAccount, this.pbaPayOrderRef.orderTotalFees, this.pbaAccountRef, this.orgName);
                setTimeout(() => {
                    this.paymentViewService.postPBAaccountPayment(this.pbaPayOrderRef.orderRefId, requestBody)
                        .subscribe(r => {
                        try {
                            this.pbaAccountrPaymentResult = JSON.parse(r);
                        }
                        catch (e) {
                            this.pbaAccountrPaymentResult = r;
                        }
                        this.isPBAAccountPaymentSuccess = true;
                    }, e => {
                        if (e.status == '402') {
                            this.isInSufficiantFund = true;
                        }
                        else if (e.status == '410') {
                            this.isPBAAccountNotExist = true;
                        }
                        else if (e.status == '412') {
                            this.isPBAAccountHold = true;
                        }
                        else {
                            this.isPBAServerError = true;
                        }
                    });
                }, 5000);
            }
            else {
                this.isPBAServerError = true;
            }
        }
        else if (this.isCardPaymentSelected) {
            this.cardPayment();
        }
    }
    cardPayment() {
        this.isCardPaymentSuccess = true;
        const requestBody = new IserviceRequestCardPayment(this.pbaPayOrderRef.orderTotalFees);
        this.paymentViewService.postWays2PayCardPayment(this.pbaPayOrderRef.orderRefId, requestBody)
            .subscribe(result => {
            const paymentUrl = JSON.parse(result).next_url;
            window.location.href = paymentUrl;
        }, error => {
            this.isCardPaymentSuccess = false;
        });
    }
    selectPaymentMethod(type) {
        if (type === 'PBA') {
            this.isPbaAccountSelected = true;
            this.isCardPaymentSelected = false;
            this.isPBADropdownSelected = false;
            this.isContinueButtondisabled = true;
            this.selectedPbaAccount = null;
        }
        else if (type === 'CARD') {
            this.isPbaAccountSelected = false;
            this.isCardPaymentSelected = true;
            this.isPBADropdownSelected = false;
            this.isContinueButtondisabled = false;
        }
    }
    gotoCasetransationPage() {
        this.paymentLibComponent.viewName = 'case-transactions';
        this.paymentLibComponent.TAKEPAYMENT = false;
        this.paymentLibComponent.ISBSENABLE = true;
        this.paymentLibComponent.isFromServiceRequestPage = true;
    }
    static ɵfac = function PbaPaymentComponent_Factory(t) { return new (t || PbaPaymentComponent)(i0.ɵɵdirectiveInject(i1.PaymentLibComponent), i0.ɵɵdirectiveInject(i2.PaymentViewService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PbaPaymentComponent, selectors: [["ccpay-pba-payment"]], inputs: { pbaPayOrderRef: "pbaPayOrderRef" }, decls: 1, vars: 1, consts: [[4, "ngIf"], ["class", "govuk-breadcrumbs", 4, "ngIf"], ["class", "pba-payment", 4, "ngIf"], [1, "govuk-breadcrumbs"], [1, "govuk-breadcrumbs__list"], [1, "govuk-breadcrumbs__list-item"], ["href", "javascript:void(0)", 1, "govuk-back-link", "pba-payments-16-font", 3, "click"], [1, "pba-payment"], ["class", "govuk-error-summary pba-payments-error-box--size", "aria-labelledby", "error-summary-title", 4, "ngIf"], [1, "govuk-form-group", "margin-top-10-px"], [1, "govuk-label", "pba-payments-govuk__label", "pba-payments-19-font"], [1, "pba-payments-19-font"], ["class", "govuk-form-group", 4, "ngIf"], ["class", "govuk-button--group", 4, "ngIf"], ["aria-labelledby", "error-summary-title", 1, "govuk-error-summary", "pba-payments-error-box--size"], ["id", "error-summary-title", 1, "govuk-error-summary__title", "govuk-error-summary__title-custom", "pba-payments-24-font"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"], [1, "pba-payments-error-16-font"], [1, "govuk-form-group"], ["aria-describedby", "contact-hint", 1, "govuk-fieldset"], ["data-module", "govuk-radios", 1, "govuk-radios"], [1, "govuk-radios__item"], ["id", "pbaAccount", "name", "paymentSelection", "type", "radio", "value", "PBA", "data-aria-controls", "pba-account", 1, "govuk-radios__input", 3, "click"], ["for", "pbaAccount", 1, "govuk-label", "govuk-radios__label", "pba-payments-19-font", "pba-payments-font-bld"], ["class", "govuk-radios__conditional", "id", "conditional-contact", 4, "ngIf"], ["id", "cardPayment", "name", "paymentSelection", "type", "radio", "value", "card", "data-aria-controls", "card-payment", 1, "govuk-radios__input", 3, "click"], ["for", "cardPayment", 1, "govuk-label", "govuk-radios__label", "pba-payments-19-font", "pba-payments-font-bld"], ["id", "conditional-contact", 1, "govuk-radios__conditional"], [1, "govuk-form-group", "pba-payments-select-box--size"], ["for", "pbaAccountNumber", 1, "govuk-label", "pba-payments-govuk__label", "pba-payments-19-font"], ["id", "pbaAccountNumber", 1, "form-control", "short-input", 3, "change"], ["value", "", "selected", "selected"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["for", "pbaAccountNumber", 1, "govuk-label", "pba-payments-govuk__label", "pba-payments-24-font"], ["id", "event-name-hint", 1, "govuk-hint", "pba-payments-19-font", "pba-payment-width"], ["id", "pbaAccountRef", "name", "pbaAccountRef", "type", "text", "aria-describedby", "pbaAccountRef-hint", 1, "govuk-input", "pba-payments-ref-box--size", "pba-payments-19-font", 3, "change"], [1, "govuk-button--group"], ["type", "button", 1, "button", "pba-payments-19-font", "govuk-button--secondary", "pba-payments-margin-10", 3, "click"], ["type", "submit", 1, "button", "pba-payments-19-font", "pba-payments-20-margin", 3, "click"], ["type", "submit", 1, "button", "pba-payments-19-font", "pba-payments-20-margin", 3, "disabled", "click"], [1, "govuk-width-container"], ["id", "main-content", "role", "main", 1, "govuk-main-wrapper", "govuk-main-wrapper--l"], [1, "govuk-grid-row"], [1, "govuk-warning-text"], ["aria-hidden", "true", 1, "govuk-warning-text__icon"], [1, "govuk-warning-text__text"], [1, "govuk-warning-text__assistive"], [1, "warning-heading-m"], [1, "pba-payments-margin-top-10"], [1, "heading-medium"], [1, "govuk-body", "pba-payments-19-font"], [1, "govuk-bod", "ypba-payments-19-font"], [1, "govuk-body"], ["href", "mailto: MyHMCTSsupport@justice.gov.uk"], ["target", "_blank", "href", "https://www.gov.uk/guidance/hmcts-payment-by-account-for-online-services"], ["href", "mailto:MiddleOffice.DDservices@liberata.com"], ["href", "tel:01633-652-125"], [1, "govuk-body", "pba-payments-19-font", "govuk-body-width"], [1, "pba-payments-heading-lg"], [1, "govuk-panel", "govuk-panel--confirmation", "pba-payments--confirmation"], [1, "govuk-panel__title", "pba-payments--title"], [1, "govuk-panel__body", "pba-payments__body"], ["href", "javascript:void(0)", 3, "click"]], template: function PbaPaymentComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, PbaPaymentComponent_ng_container_0_Template, 10, 9, "ng-container", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "pba-payment");
        } }, dependencies: [i3.NgForOf, i3.NgIf, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i3.CurrencyPipe], styles: [".pba-payments-govuk__label[_ngcontent-%COMP%]{font-weight:700;line-height:1.31578947}.pba-payments-19-font[_ngcontent-%COMP%]{font-size:19px}.pba-payments-font-bld[_ngcontent-%COMP%]{font-weight:700}.pba-payments-16-font[_ngcontent-%COMP%]{font-size:16px}.pba-payments-24-font[_ngcontent-%COMP%]{font-size:24px}.pba-payments-20-margin[_ngcontent-%COMP%]{margin-bottom:20px}.pba-payments-select-box--size[_ngcontent-%COMP%]{width:40%}.pba-payments-error-box--size[_ngcontent-%COMP%]{width:80%}.pba-payments-ref-box--size[_ngcontent-%COMP%]{width:60%}.pba-payments-error-16-font[_ngcontent-%COMP%]{font-size:16px;line-height:34px}.pba-payments-margin-10[_ngcontent-%COMP%]{margin-right:10px}.pba-payments-margin-top-10[_ngcontent-%COMP%]{margin-top:15px}.pba-payments-heading-lg[_ngcontent-%COMP%]{font-size:40px;font-weight:700;line-height:72px}.pba-payments--confirmation[_ngcontent-%COMP%]{background:#00703c!important}.pba-payments__body[_ngcontent-%COMP%]{font-size:36px!important}.pba-payments--title[_ngcontent-%COMP%]{font-size:48px!important}.warning-heading-m[_ngcontent-%COMP%]{font-size:29px;font-weight:700}.pba-payment-width[_ngcontent-%COMP%]{width:75%}.margin-top-10-px[_ngcontent-%COMP%]{margin-top:10px}.govuk-error-summary[_ngcontent-%COMP%]:focus{outline:3px solid #ffdd00}.govuk-body-width[_ngcontent-%COMP%]{width:750px}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PbaPaymentComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-pba-payment', template: "<ng-container *ngIf=\"viewStatus === 'pba-payment'\">\n\n  <div class=\"govuk-breadcrumbs\" *ngIf=\"!errorMsg && !isPBAAccountPaymentSuccess && !isCardPaymentSuccess\">\n    <ol class=\"govuk-breadcrumbs__list\">\n      <li class=\"govuk-breadcrumbs__list-item\">\n        <a href=\"javascript:void(0)\" (click)=\"gotoCasetransationPage()\" class=\"govuk-back-link pba-payments-16-font\">Back</a>\n      </li>\n    </ol>\n  </div>\n  <div class=\"pba-payment\" *ngIf=\"(pbaAccountList?.length > 0 || errorMsg) && !isInSufficiantFund && !isPBAAccountNotExist && !isPBAServerError && !isPBAAccountHold && !isPBAAccountPaymentSuccess && isCardPaymentSuccess\">\n    \n    <div *ngIf=\"errorMsg\" class=\"govuk-error-summary pba-payments-error-box--size\" aria-labelledby=\"error-summary-title\" >\n      <h2 class=\"govuk-error-summary__title govuk-error-summary__title-custom pba-payments-24-font\" id=\"error-summary-title\">\n        There is a problem\n      </h2>\n      <div class=\"govuk-error-summary__body\">\n        <ul class=\"govuk-list govuk-error-summary__list\">\n          <li class=\"pba-payments-error-16-font\">\n            Your PBA account cannot be found.\n          </li>\n          <li class=\"pba-payments-error-16-font\">\n            If you know your organisation has a PBA, try again.\n          </li>\n          <li class=\"pba-payments-error-16-font\">\n            You can also pay by credit or debit card.\n          </li>\n        </ul>\n      </div>\n    </div>\n    <!-- <h1 class=\"heading-medium margin-top-10-px\">Pay fee using Payment by Account (PBA)</h1> -->\n    <div class=\"govuk-form-group margin-top-10-px\">\n      <label class=\"govuk-label pba-payments-govuk__label pba-payments-19-font\">\n        Amount to pay \n      </label>\n      <span class=\"pba-payments-19-font\">{{pbaPayOrderRef.orderTotalFees | currency :'GBP':'symbol':'1.2-2'}}</span>\n    </div>\n\n    <div class=\"govuk-form-group\" *ngIf=\"!errorMsg\">\n      <fieldset class=\"govuk-fieldset\" aria-describedby=\"contact-hint\">\n        <div class=\"govuk-radios\" data-module=\"govuk-radios\">\n          <div class=\"govuk-radios__item\">\n            <input class=\"govuk-radios__input\" id=\"pbaAccount\" name=\"paymentSelection\" type=\"radio\" value=\"PBA\" (click)=\"selectPaymentMethod('PBA')\" data-aria-controls=\"pba-account\">\n            <label class=\"govuk-label govuk-radios__label pba-payments-19-font pba-payments-font-bld\" for=\"pbaAccount\">\n              Pay fee using Payment by Account (PBA)\n            </label>\n          </div>\n          <div class=\"govuk-radios__conditional\" id=\"conditional-contact\" *ngIf=\"isPbaAccountSelected\">\n            <div class=\"govuk-form-group pba-payments-select-box--size\">\n              <label class=\"govuk-label pba-payments-govuk__label pba-payments-19-font\" for=\"pbaAccountNumber\">\n                Select a PBA  \n              </label>\n              <select class=\"form-control short-input\" id=\"pbaAccountNumber\" (change)=\"selectpbaaccount($event)\">\n                <option value=\"\" selected='selected'>Select option</option>\n                <option  *ngFor=\"let pbaAccount of pbaAccountList;\" value=\"{{pbaAccount}}\">{{pbaAccount}}</option>\n              </select>\n            </div>\n            <div class=\"govuk-form-group\" *ngIf=\"!errorMsg && selectedPbaAccount\">\n              <label class=\"govuk-label pba-payments-govuk__label pba-payments-24-font\" for=\"pbaAccountNumber\">\n                Enter a reference for your PBA account statements \n              </label>\n              <div id=\"event-name-hint\" class=\"govuk-hint pba-payments-19-font pba-payment-width\">\n                This should be your own unique reference to identify the case. It will appear on your statements.\n            </div>\n            <input class=\"govuk-input pba-payments-ref-box--size pba-payments-19-font\" id=\"pbaAccountRef\" (change)=\"selectpbaaccount($event)\" name=\"pbaAccountRef\" type=\"text\" aria-describedby=\"pbaAccountRef-hint\">\n            </div>\n    \n          </div>\n          <div class=\"govuk-radios__item\">\n            <input class=\"govuk-radios__input\" id=\"cardPayment\" name=\"paymentSelection\" type=\"radio\" value=\"card\" (click)=\"selectPaymentMethod('CARD')\" data-aria-controls=\"card-payment\">\n            <label class=\"govuk-label govuk-radios__label pba-payments-19-font pba-payments-font-bld\" for=\"cardPayment\">\n              Pay by credit or debit card\n            </label>\n          </div>\n        </div>\n      </fieldset>\n    </div>\n\n    <div class=\"govuk-button--group\"  *ngIf=\"errorMsg\">\n      <button type=\"button\" class=\"button pba-payments-19-font govuk-button--secondary pba-payments-margin-10\" (click)=\"gotoCasetransationPage()\">\n        View Service Request\n      </button>\n      <button type=\"submit\" class=\"button pba-payments-19-font pba-payments-20-margin\" (click)=\"cardPayment()\">\n        Pay by card\n      </button>\n    </div>\n    <div class=\"govuk-button--group\"  *ngIf=\"!errorMsg\">\n      <button type=\"submit\" [disabled]=\"isContinueButtondisabled\" class=\"button pba-payments-19-font pba-payments-20-margin\" (click)=\"saveAndContinue()\">\n        <span *ngIf=\"!isPBADropdownSelected\">Continue</span>\n        <span *ngIf=\"isPBADropdownSelected\">Confirm payment</span>\n      </button>\n    </div>\n  </div>\n<ng-container *ngIf=\"pbaAccountList?.length <= 0 && !errorMsg && isGetPBAAccountSucceed && isCardPaymentSuccess\">\n  <div class=\"govuk-width-container\">\n    <main class=\"govuk-main-wrapper govuk-main-wrapper--l\" id=\"main-content\" role=\"main\">\n      <div class=\"govuk-grid-row\">\n        <div class=\"govuk-warning-text\">\n          <span class=\"govuk-warning-text__icon\" aria-hidden=\"true\">!</span>\n          <strong class=\"govuk-warning-text__text\">\n            <span class=\"govuk-warning-text__assistive\">Warning</span>\n            <h2 class=\"warning-heading-m\">You don\u2019t have a registered PBA.</h2>\n          </strong>\n        </div>\n        <div class=\"pba-payments-margin-top-10\">\n          <h2 class=\"heading-medium\">Pay by credit or debit card</h2>\n          <p class=\"govuk-body pba-payments-19-font\">\n            We recommend that you apply to get a new PBA to pay for fees.\n          </p>\n          <p class=\"govuk-bod ypba-payments-19-font\">\n            you can also pay by credit or debit card if you need to pay now\n          </p>\n          <p class=\"govuk-body\">\n            <button type=\"submit\" (click)=\"cardPayment()\" class=\"button pba-payments-19-font pba-payments-20-margin\">\n              Pay by card\n            </button>\n          </p>\n          \n        </div>\n        <div class=\"pba-payments-margin-top-10\">\n          <h2 class=\"heading-medium\">Register an existing PBA with MyHMCTS</h2>\n          <p class=\"govuk-body pba-payments-19-font\">\n            You may find it easier in future to pay by PBA, your organisation administrator will need to \n            email <a href=\"mailto: MyHMCTSsupport@justice.gov.uk\">MyHMCTSsupport@justice.gov.uk</a> to ask for your PBA to be registered with your \n            MyHMCTS account. You should include your organisation name and PBA number.\n          </p>\n          <p class=\"govuk-body pba-payments-19-font\">\n            It can then take up to 3 days for your account to be updated. You\u2019ll need to start your claim \n            again to pay the fee.\n          </p>\n        </div>\n        <div class=\"pba-payments-margin-top-10\">\n          <h2 class=\"heading-medium\">Apply to get a new PBA </h2>\n          <p class=\"govuk-body pba-payments-19-font\">\n            You\u2019ll need to provide details for you and your organisation, including the required credit\n             limit for your account.\n          </p>\n          <p class=\"govuk-body pba-payments-19-font\">\n            Once your account has been registered, you\u2019ll need to start your claim again to pay the fee.\n          </p>\n          <p class=\"govuk-body pba-payments-19-font\">\n            Read more information on <a target=\"_blank\" href=\"https://www.gov.uk/guidance/hmcts-payment-by-account-for-online-services\">registering for PBA</a>.\n          </p>\n        </div>\n      </div>\n    </main>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"isInSufficiantFund && isCardPaymentSuccess\">\n  <div class=\"govuk-width-container\">\n    <main class=\"govuk-main-wrapper govuk-main-wrapper--l\" id=\"main-content\" role=\"main\">\n      <div class=\"govuk-grid-row\">\n        <div class=\"govuk-error-summary pba-payments-error-box--size\" aria-labelledby=\"error-summary-title\">\n          <h2 class=\"govuk-error-summary__title govuk-error-summary__title-custom pba-payments-24-font\" id=\"error-summary-title\">\n            There is a problem\n          </h2>\n          <div class=\"govuk-error-summary__body\">\n            <ul class=\"govuk-list govuk-error-summary__list\">\n              <li class=\"pba-payments-error-16-font\">\n                You don't have enough funds in your PBA account to pay for this fee.\n              </li>\n              <li class=\"pba-payments-error-16-font\">\n                If you have already topped up your PBA account, wait up to 24 hours for the new balance to become available.\n              </li>\n            </ul>\n          </div>\n        </div>\n        <div class=\"pba-payments-margin-top-10\">\n          <h2 class=\"heading-medium\">Should you need any further advice</h2>\n          <p class=\"govuk-body pba-payments-19-font\">\n            Email <a href=\"mailto:MiddleOffice.DDservices@liberata.com\">MiddleOffice.DDservices@liberata.com</a> or call <a href=\"tel:01633-652-125\">01633 652 125</a> (option 3) to try to fix the issue.\n          </p>\n          <p class=\"govuk-body pba-payments-19-font\">\n            you can also pay by credit or debit card.\n          </p>\n          <div class=\"govuk-button--group\">\n            <button type=\"button\" class=\"button pba-payments-19-font govuk-button--secondary pba-payments-margin-10\" (click)=\"gotoCasetransationPage()\">\n              View Service Request\n            </button>\n            <button type=\"submit\" class=\"button pba-payments-19-font pba-payments-20-margin\" (click)=\"cardPayment()\">\n              Pay by card\n            </button>\n          </div>\n        </div>\n      </div>\n    </main>\n  </div>\n</ng-container>\n<ng-container *ngIf=\"isPBAAccountNotExist && isCardPaymentSuccess\">\n  <div class=\"govuk-width-container\">\n    <main class=\"govuk-main-wrapper govuk-main-wrapper--l\" id=\"main-content\" role=\"main\">\n      <div class=\"govuk-grid-row\">\n        <div class=\"govuk-error-summary pba-payments-error-box--size\" aria-labelledby=\"error-summary-title\">\n          <h2 class=\"govuk-error-summary__title govuk-error-summary__title-custom pba-payments-24-font\" id=\"error-summary-title\">\n            There is a problem\n          </h2>\n          <div class=\"govuk-error-summary__body\">\n            <ul class=\"govuk-list govuk-error-summary__list\">\n              <li class=\"pba-payments-error-16-font\">\n                Your PBA account ({{selectedPbaAccount}}) no longer exists.\n              </li>\n            </ul>\n          </div>\n        </div>\n        <div class=\"pba-payments-margin-top-10\">\n          <h2 class=\"heading-medium\">Should you need any further advice</h2>\n          <p class=\"govuk-body pba-payments-19-font govuk-body-width\">\n            Email <a href=\"mailto:MiddleOffice.DDservices@liberata.com\">MiddleOffice.DDservices@liberata.com</a> or call <a href=\"tel:01633-652-125\">01633 652 125</a> (option 3) to try to fix the issue.\n          </p>\n          <p class=\"govuk-body pba-payments-19-font\">\n            you can also pay by credit or debit card.\n          </p>\n          <div class=\"govuk-button--group\">\n            <button type=\"button\" class=\"button pba-payments-19-font govuk-button--secondary pba-payments-margin-10\" (click)=\"gotoCasetransationPage()\">\n              View Service Request\n            </button>\n            <button type=\"submit\" class=\"button pba-payments-19-font pba-payments-20-margin\" (click)=\"cardPayment()\">\n              Pay by card\n            </button>\n          </div>\n        </div>\n      </div>\n    </main>\n  </div>\n</ng-container>\n<ng-container *ngIf=\"isPBAAccountHold && isCardPaymentSuccess\">\n  <div class=\"govuk-width-container\">\n    <main class=\"govuk-main-wrapper govuk-main-wrapper--l\" id=\"main-content\" role=\"main\">\n      <div class=\"govuk-grid-row\">\n        <div class=\"govuk-error-summary pba-payments-error-box--size\" aria-labelledby=\"error-summary-title\">\n          <h2 class=\"govuk-error-summary__title govuk-error-summary__title-custom pba-payments-24-font\" id=\"error-summary-title\">\n            There is a problem\n          </h2>\n          <div class=\"govuk-error-summary__body\">\n            <ul class=\"govuk-list govuk-error-summary__list\">\n              <li class=\"pba-payments-error-16-font\">\n                Your PBA account ({{selectedPbaAccount}}) has been put on hold.\n              </li>\n            </ul>\n          </div>\n        </div>\n        <div class=\"pba-payments-margin-top-10\">\n          <h2 class=\"heading-medium\">Should you need any further advice</h2>\n          <p class=\"govuk-body pba-payments-19-font govuk-body-width\">\n            Email <a href=\"mailto:MiddleOffice.DDservices@liberata.com\">MiddleOffice.DDservices@liberata.com</a> or call <a href=\"tel:01633-652-125\">01633 652 125</a> (option 3) to try to fix the issue.\n          </p>\n          <p class=\"govuk-body pba-payments-19-font\">\n            you can also pay by credit or debit card.\n          </p>\n          <div class=\"govuk-button--group\">\n            <button type=\"button\" class=\"button pba-payments-19-font govuk-button--secondary pba-payments-margin-10\" (click)=\"gotoCasetransationPage()\">\n              View Service Request\n            </button>\n            <button type=\"submit\" class=\"button pba-payments-19-font pba-payments-20-margin\" (click)=\"cardPayment()\">\n              Pay by card\n            </button>\n          </div>\n        </div>\n      </div>\n    </main>\n  </div>\n</ng-container>\n<ng-container *ngIf=\"isPBAServerError && isCardPaymentSuccess\">\n  <div class=\"govuk-width-container\">\n    <main class=\"govuk-main-wrapper govuk-main-wrapper--l\" id=\"main-content\" role=\"main\">\n      <div class=\"govuk-grid-row\">\n        <div class=\"pba-payments-margin-top-10\">\n          <h2 class=\"pba-payments-heading-lg\">Sorry, there is a problem with the service</h2>\n          <p class=\"govuk-body pba-payments-19-font\">\n            Try again later.\n          </p>\n          <p class=\"govuk-body pba-payments-19-font\">\n            you can also pay by credit or debit card.\n          </p>\n          <div class=\"govuk-button--group\">\n            <button type=\"button\" class=\"button pba-payments-19-font govuk-button--secondary pba-payments-margin-10\" (click)=\"gotoCasetransationPage()\">\n              View Service Request\n            </button>\n            <button type=\"submit\" class=\"button pba-payments-19-font pba-payments-20-margin\" (click)=\"cardPayment()\">\n              Pay by card\n            </button>\n          </div>\n        </div>\n      </div>\n    </main>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"isPBAAccountPaymentSuccess && isCardPaymentSuccess\">\n  <div class=\"govuk-width-container\">\n    <main class=\"govuk-main-wrapper govuk-main-wrapper--l\" id=\"main-content\" role=\"main\">\n      <div class=\"govuk-grid-row\">\n        <div class=\"govuk-panel govuk-panel--confirmation pba-payments--confirmation\">\n          <h1 class=\"govuk-panel__title pba-payments--title\">\n              Payment successful\n          </h1>\n          <div class=\"govuk-panel__body pba-payments__body\">\n              Your payment reference is <br><strong>{{pbaAccountrPaymentResult.payment_reference}}</strong>\n          </div>\n      </div>\n      <p class=\"govuk-body pba-payments-19-font\">\n        <a href=\"javascript:void(0)\" (click)=\"gotoCasetransationPage()\">View service requests</a>\n      </p>\n      </div>\n    </main>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"!isCardPaymentSuccess\">\n  <div class=\"govuk-width-container\">\n    <main class=\"govuk-main-wrapper govuk-main-wrapper--l\" id=\"main-content\" role=\"main\">\n      <div class=\"govuk-grid-row\">\n        <div class=\"pba-payments-margin-top-10\">\n          <h2 class=\"pba-payments-heading-lg\">Sorry, there is a problem with the service</h2>\n          <p class=\"govuk-body pba-payments-19-font\">\n            Try again later.\n          </p>\n          <!-- <p class=\"govuk-body pba-payments-19-font\">\n            you can also <a href=\"javascript:void(0)\" (click)=\"cardPayment()\" >pay by credit or debit card</a>.\n          </p> -->\n          <p class=\"govuk-body pba-payments-19-font\">\n            <a href=\"javascript:void(0)\" (click)=\"gotoCasetransationPage()\">View service requests</a>\n          </p>\n        </div>\n      </div>\n    </main>\n  </div>\n</ng-container>\n</ng-container>\n\n\n\n", styles: [".pba-payments-govuk__label{font-weight:700;line-height:1.31578947}.pba-payments-19-font{font-size:19px}.pba-payments-font-bld{font-weight:700}.pba-payments-16-font{font-size:16px}.pba-payments-24-font{font-size:24px}.pba-payments-20-margin{margin-bottom:20px}.pba-payments-select-box--size{width:40%}.pba-payments-error-box--size{width:80%}.pba-payments-ref-box--size{width:60%}.pba-payments-error-16-font{font-size:16px;line-height:34px}.pba-payments-margin-10{margin-right:10px}.pba-payments-margin-top-10{margin-top:15px}.pba-payments-heading-lg{font-size:40px;font-weight:700;line-height:72px}.pba-payments--confirmation{background:#00703c!important}.pba-payments__body{font-size:36px!important}.pba-payments--title{font-size:48px!important}.warning-heading-m{font-size:29px;font-weight:700}.pba-payment-width{width:75%}.margin-top-10-px{margin-top:10px}.govuk-error-summary:focus{outline:3px solid #ffdd00}.govuk-body-width{width:750px}\n"] }]
    }], function () { return [{ type: i1.PaymentLibComponent }, { type: i2.PaymentViewService }]; }, { pbaPayOrderRef: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGJhLXBheW1lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9jb21wb25lbnRzL3BiYS1wYXltZW50L3BiYS1wYXltZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9wYmEtcGF5bWVudC9wYmEtcGF5bWVudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQzs7Ozs7Ozs7SUNGckYsOEJBQXlHLFlBQUEsWUFBQSxXQUFBO0lBR3RFLDZLQUFTLGVBQUEsZ0NBQXdCLENBQUEsSUFBQztJQUE4QyxvQkFBSTtJQUFBLGlCQUFJLEVBQUEsRUFBQSxFQUFBOzs7SUFNekgsK0JBQXNILGFBQUE7SUFFbEgsb0NBQ0Y7SUFBQSxpQkFBSztJQUNMLCtCQUF1QyxhQUFBLGFBQUE7SUFHakMsbURBQ0Y7SUFBQSxpQkFBSztJQUNMLDhCQUF1QztJQUNyQyxxRUFDRjtJQUFBLGlCQUFLO0lBQ0wsOEJBQXVDO0lBQ3JDLDREQUNGO0lBQUEsaUJBQUssRUFBQSxFQUFBLEVBQUE7OztJQTRCQyxrQ0FBMkU7SUFBQSxZQUFjO0lBQUEsaUJBQVM7OztJQUE5QyxpREFBc0I7SUFBQyxlQUFjO0lBQWQsb0NBQWM7Ozs7SUFHN0YsK0JBQXNFLGdCQUFBO0lB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QUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGF5bWVudFZpZXdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcGF5bWVudC12aWV3L3BheW1lbnQtdmlldy5zZXJ2aWNlJztcbmltcG9ydCB7IFBheW1lbnRMaWJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9wYXltZW50LWxpYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgSXNlcnZpY2VSZXF1ZXN0Q2FyZFBheW1lbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lzZXJ2aWNlUmVxdWVzdENhcmRQYXltZW50JztcbmltcG9ydCB7IElzZXJ2aWNlUmVxdWVzdFBiYVBheW1lbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lzZXJ2aWNlUmVxdWVzdFBiYVBheW1lbnQnO1xuXG5jb25zdCBCU19FTkFCTEVfRkxBRyA9ICdidWxrLXNjYW4tZW5hYmxpbmctZmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY3BheS1wYmEtcGF5bWVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYmEtcGF5bWVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BiYS1wYXltZW50LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGJhUGF5bWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHBiYVBheU9yZGVyUmVmOiBhbnk7XG4gIHZpZXdTdGF0dXM6IHN0cmluZztcbiAgcGJhQWNjb3VudExpc3Q6IHN0cmluZ1tdO1xuICBpc1BCQUFjY291bnRIb2xkOiBib29sZWFuID0gZmFsc2U7XG4gIGVycm9yTXNnOiBhbnk7XG4gIGlzQ2FyZFBheW1lbnRTdWNjZXNzOiBib29sZWFuID0gdHJ1ZTtcbiAgaXNJblN1ZmZpY2lhbnRGdW5kOiBib29sZWFuID0gZmFsc2U7XG4gIGlzUEJBQWNjb3VudE5vdEV4aXN0OiBib29sZWFuID0gZmFsc2U7XG4gIGlzUEJBU2VydmVyRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNHZXRQQkFBY2NvdW50U3VjY2VlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBzZWxlY3RlZFBiYUFjY291bnQ6IHN0cmluZyA9ICcnO1xuICBwYmFBY2NvdW50UmVmOiBzdHJpbmcgPSAnJztcbiAgaXNQYmFBY2NvdW50U2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNDYXJkUGF5bWVudFNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGlzUEJBRHJvcGRvd25TZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpc0NvbnRpbnVlQnV0dG9uZGlzYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBpc1BCQUFjY291bnRQYXltZW50U3VjY2VzczogYm9vbGVhbiA9IGZhbHNlO1xuICBwYmFBY2NvdW50clBheW1lbnRSZXN1bHQ6IGFueTtcbiAgb3JnTmFtZTogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSAgcGF5bWVudExpYkNvbXBvbmVudDogUGF5bWVudExpYkNvbXBvbmVudCxcbiAgICBwcml2YXRlIHBheW1lbnRWaWV3U2VydmljZTogUGF5bWVudFZpZXdTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGJhUGF5T3JkZXJSZWYgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQucGJhUGF5T3JkZXJSZWY7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJ3BiYS1wYXltZW50JztcbiAgICB0aGlzLmVycm9yTXNnID0gbnVsbDtcbiAgICB0aGlzLnBheW1lbnRWaWV3U2VydmljZS5nZXRQQkFhY2NvdW50RGV0YWlscygpXG4gICAgLnN1YnNjcmliZShcbiAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuaXNHZXRQQkFBY2NvdW50U3VjY2VlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub3JnTmFtZSA9IHJlc3VsdC5vcmdhbmlzYXRpb25FbnRpdHlSZXNwb25zZS5uYW1lO1xuICAgICAgICB0aGlzLnBiYUFjY291bnRMaXN0ID0gcmVzdWx0Lm9yZ2FuaXNhdGlvbkVudGl0eVJlc3BvbnNlLnBheW1lbnRBY2NvdW50O1xuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgfVxuICAgICk7XG5cbiAgfVxuICBzZWxlY3RwYmFhY2NvdW50KGFyZ3MpIHtcbiAgICBpZihhcmdzLmN1cnJlbnRUYXJnZXQuaWQgPT09ICdwYmFBY2NvdW50TnVtYmVyJykge1xuICAgICAgdGhpcy5pc1BCQURyb3Bkb3duU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zZWxlY3RlZFBiYUFjY291bnQgPSBhcmdzLnRhcmdldC52YWx1ZTsgXG4gICAgfVxuICAgIGlmKGFyZ3MuY3VycmVudFRhcmdldC5pZCA9PT0gJ3BiYUFjY291bnRSZWYnKSB7XG4gICAgICB0aGlzLnBiYUFjY291bnRSZWYgPSBhcmdzLnRhcmdldC52YWx1ZTsgXG4gICAgfVxuICAgIGlmKHRoaXMuc2VsZWN0ZWRQYmFBY2NvdW50ICE9PSAnJyAmJiB0aGlzLnBiYUFjY291bnRSZWYgIT09IFwiXCIpIHtcbiAgICAgIHRoaXMuaXNDb250aW51ZUJ1dHRvbmRpc2FibGVkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNDb250aW51ZUJ1dHRvbmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzYXZlQW5kQ29udGludWUoKSB7XG5cbiAgICBpZih0aGlzLmlzUGJhQWNjb3VudFNlbGVjdGVkKSB7XG4gICAgICB0aGlzLmlzSW5TdWZmaWNpYW50RnVuZCA9IGZhbHNlO1xuICAgICAgdGhpcy5pc1BCQUFjY291bnROb3RFeGlzdCA9IGZhbHNlO1xuICAgICAgdGhpcy5pc1BCQVNlcnZlckVycm9yID0gZmFsc2U7XG4gICAgICB0aGlzLmlzUEJBQWNjb3VudFBheW1lbnRTdWNjZXNzID0gZmFsc2U7XG4gICAgICB0aGlzLmlzQ29udGludWVCdXR0b25kaXNhYmxlZCA9IHRydWU7XG4gICAgICBpZiAoIHRoaXMucGJhQWNjb3VudExpc3QuaW5kZXhPZih0aGlzLnNlbGVjdGVkUGJhQWNjb3VudCkgIT09IC0xICkge1xuICAgICAgICBjb25zdCByZXF1ZXN0Qm9keSA9IG5ldyBJc2VydmljZVJlcXVlc3RQYmFQYXltZW50KFxuICAgICAgICB0aGlzLnNlbGVjdGVkUGJhQWNjb3VudCwgdGhpcy5wYmFQYXlPcmRlclJlZi5vcmRlclRvdGFsRmVlcywgdGhpcy5wYmFBY2NvdW50UmVmLCB0aGlzLm9yZ05hbWUpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLnBvc3RQQkFhY2NvdW50UGF5bWVudCh0aGlzLnBiYVBheU9yZGVyUmVmLm9yZGVyUmVmSWQsIHJlcXVlc3RCb2R5KVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgciA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGJhQWNjb3VudHJQYXltZW50UmVzdWx0ID0gSlNPTi5wYXJzZShyKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGJhQWNjb3VudHJQYXltZW50UmVzdWx0ID0gcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pc1BCQUFjY291bnRQYXltZW50U3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGUuc3RhdHVzID09ICc0MDInKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmlzSW5TdWZmaWNpYW50RnVuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGUuc3RhdHVzID09ICc0MTAnKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmlzUEJBQWNjb3VudE5vdEV4aXN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZS5zdGF0dXMgPT0gJzQxMicpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaXNQQkFBY2NvdW50SG9sZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaXNQQkFTZXJ2ZXJFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc1BCQVNlcnZlckVycm9yID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNDYXJkUGF5bWVudFNlbGVjdGVkKSB7XG4gICAgICB0aGlzLmNhcmRQYXltZW50KCk7XG4gICAgfVxuXG4gIH1cbiAgY2FyZFBheW1lbnQoKSB7XG4gICAgdGhpcy5pc0NhcmRQYXltZW50U3VjY2VzcyA9IHRydWU7XG4gICAgY29uc3QgcmVxdWVzdEJvZHkgPSBuZXcgSXNlcnZpY2VSZXF1ZXN0Q2FyZFBheW1lbnQgKFxuICAgICAgdGhpcy5wYmFQYXlPcmRlclJlZi5vcmRlclRvdGFsRmVlcyk7XG4gICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UucG9zdFdheXMyUGF5Q2FyZFBheW1lbnQodGhpcy5wYmFQYXlPcmRlclJlZi5vcmRlclJlZklkLCByZXF1ZXN0Qm9keSlcbiAgICAuc3Vic2NyaWJlKFxuICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgY29uc3QgcGF5bWVudFVybCA9IEpTT04ucGFyc2UocmVzdWx0KS5uZXh0X3VybDtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBwYXltZW50VXJsO1xuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5pc0NhcmRQYXltZW50U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgfVxuICAgICk7XG5cbiAgfVxuICBzZWxlY3RQYXltZW50TWV0aG9kKHR5cGU6IHN0cmluZykge1xuICAgIGlmKHR5cGUgPT09ICdQQkEnKSB7XG4gICAgICB0aGlzLmlzUGJhQWNjb3VudFNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNDYXJkUGF5bWVudFNlbGVjdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmlzUEJBRHJvcGRvd25TZWxlY3RlZCA9IGZhbHNlXG4gICAgICB0aGlzLmlzQ29udGludWVCdXR0b25kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLnNlbGVjdGVkUGJhQWNjb3VudCA9IG51bGw7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnQ0FSRCcpIHtcbiAgICAgIHRoaXMuaXNQYmFBY2NvdW50U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNDYXJkUGF5bWVudFNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNQQkFEcm9wZG93blNlbGVjdGVkID0gZmFsc2VcbiAgICAgIHRoaXMuaXNDb250aW51ZUJ1dHRvbmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGdvdG9DYXNldHJhbnNhdGlvblBhZ2UoKSB7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ2Nhc2UtdHJhbnNhY3Rpb25zJztcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPSBmYWxzZTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNCU0VOQUJMRSA9IHRydWU7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZSA9IHRydWU7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3U3RhdHVzID09PSAncGJhLXBheW1lbnQnXCI+XG5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWJyZWFkY3J1bWJzXCIgKm5nSWY9XCIhZXJyb3JNc2cgJiYgIWlzUEJBQWNjb3VudFBheW1lbnRTdWNjZXNzICYmICFpc0NhcmRQYXltZW50U3VjY2Vzc1wiPlxuICAgIDxvbCBjbGFzcz1cImdvdnVrLWJyZWFkY3J1bWJzX19saXN0XCI+XG4gICAgICA8bGkgY2xhc3M9XCJnb3Z1ay1icmVhZGNydW1ic19fbGlzdC1pdGVtXCI+XG4gICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ290b0Nhc2V0cmFuc2F0aW9uUGFnZSgpXCIgY2xhc3M9XCJnb3Z1ay1iYWNrLWxpbmsgcGJhLXBheW1lbnRzLTE2LWZvbnRcIj5CYWNrPC9hPlxuICAgICAgPC9saT5cbiAgICA8L29sPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInBiYS1wYXltZW50XCIgKm5nSWY9XCIocGJhQWNjb3VudExpc3Q/Lmxlbmd0aCA+IDAgfHwgZXJyb3JNc2cpICYmICFpc0luU3VmZmljaWFudEZ1bmQgJiYgIWlzUEJBQWNjb3VudE5vdEV4aXN0ICYmICFpc1BCQVNlcnZlckVycm9yICYmICFpc1BCQUFjY291bnRIb2xkICYmICFpc1BCQUFjY291bnRQYXltZW50U3VjY2VzcyAmJiBpc0NhcmRQYXltZW50U3VjY2Vzc1wiPlxuICAgIFxuICAgIDxkaXYgKm5nSWY9XCJlcnJvck1zZ1wiIGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeSBwYmEtcGF5bWVudHMtZXJyb3ItYm94LS1zaXplXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXJyb3Itc3VtbWFyeS10aXRsZVwiID5cbiAgICAgIDxoMiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX3RpdGxlIGdvdnVrLWVycm9yLXN1bW1hcnlfX3RpdGxlLWN1c3RvbSBwYmEtcGF5bWVudHMtMjQtZm9udFwiIGlkPVwiZXJyb3Itc3VtbWFyeS10aXRsZVwiPlxuICAgICAgICBUaGVyZSBpcyBhIHByb2JsZW1cbiAgICAgIDwvaDI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fYm9keVwiPlxuICAgICAgICA8dWwgY2xhc3M9XCJnb3Z1ay1saXN0IGdvdnVrLWVycm9yLXN1bW1hcnlfX2xpc3RcIj5cbiAgICAgICAgICA8bGkgY2xhc3M9XCJwYmEtcGF5bWVudHMtZXJyb3ItMTYtZm9udFwiPlxuICAgICAgICAgICAgWW91ciBQQkEgYWNjb3VudCBjYW5ub3QgYmUgZm91bmQuXG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGkgY2xhc3M9XCJwYmEtcGF5bWVudHMtZXJyb3ItMTYtZm9udFwiPlxuICAgICAgICAgICAgSWYgeW91IGtub3cgeW91ciBvcmdhbmlzYXRpb24gaGFzIGEgUEJBLCB0cnkgYWdhaW4uXG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGkgY2xhc3M9XCJwYmEtcGF5bWVudHMtZXJyb3ItMTYtZm9udFwiPlxuICAgICAgICAgICAgWW91IGNhbiBhbHNvIHBheSBieSBjcmVkaXQgb3IgZGViaXQgY2FyZC5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSA8aDEgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bSBtYXJnaW4tdG9wLTEwLXB4XCI+UGF5IGZlZSB1c2luZyBQYXltZW50IGJ5IEFjY291bnQgKFBCQSk8L2gxPiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cCBtYXJnaW4tdG9wLTEwLXB4XCI+XG4gICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBwYmEtcGF5bWVudHMtZ292dWtfX2xhYmVsIHBiYS1wYXltZW50cy0xOS1mb250XCI+XG4gICAgICAgIEFtb3VudCB0byBwYXkgXG4gICAgICA8L2xhYmVsPlxuICAgICAgPHNwYW4gY2xhc3M9XCJwYmEtcGF5bWVudHMtMTktZm9udFwiPnt7cGJhUGF5T3JkZXJSZWYub3JkZXJUb3RhbEZlZXMgfCBjdXJyZW5jeSA6J0dCUCc6J3N5bWJvbCc6JzEuMi0yJ319PC9zcGFuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIiAqbmdJZj1cIiFlcnJvck1zZ1wiPlxuICAgICAgPGZpZWxkc2V0IGNsYXNzPVwiZ292dWstZmllbGRzZXRcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiY29udGFjdC1oaW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1yYWRpb3NcIiBkYXRhLW1vZHVsZT1cImdvdnVrLXJhZGlvc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2l0ZW1cIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLXJhZGlvc19faW5wdXRcIiBpZD1cInBiYUFjY291bnRcIiBuYW1lPVwicGF5bWVudFNlbGVjdGlvblwiIHR5cGU9XCJyYWRpb1wiIHZhbHVlPVwiUEJBXCIgKGNsaWNrKT1cInNlbGVjdFBheW1lbnRNZXRob2QoJ1BCQScpXCIgZGF0YS1hcmlhLWNvbnRyb2xzPVwicGJhLWFjY291bnRcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLXJhZGlvc19fbGFiZWwgcGJhLXBheW1lbnRzLTE5LWZvbnQgcGJhLXBheW1lbnRzLWZvbnQtYmxkXCIgZm9yPVwicGJhQWNjb3VudFwiPlxuICAgICAgICAgICAgICBQYXkgZmVlIHVzaW5nIFBheW1lbnQgYnkgQWNjb3VudCAoUEJBKVxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zX19jb25kaXRpb25hbFwiIGlkPVwiY29uZGl0aW9uYWwtY29udGFjdFwiICpuZ0lmPVwiaXNQYmFBY2NvdW50U2VsZWN0ZWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwIHBiYS1wYXltZW50cy1zZWxlY3QtYm94LS1zaXplXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIHBiYS1wYXltZW50cy1nb3Z1a19fbGFiZWwgcGJhLXBheW1lbnRzLTE5LWZvbnRcIiBmb3I9XCJwYmFBY2NvdW50TnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgU2VsZWN0IGEgUEJBICBcbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBzaG9ydC1pbnB1dFwiIGlkPVwicGJhQWNjb3VudE51bWJlclwiIChjaGFuZ2UpPVwic2VsZWN0cGJhYWNjb3VudCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIHNlbGVjdGVkPSdzZWxlY3RlZCc+U2VsZWN0IG9wdGlvbjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gICpuZ0Zvcj1cImxldCBwYmFBY2NvdW50IG9mIHBiYUFjY291bnRMaXN0O1wiIHZhbHVlPVwie3twYmFBY2NvdW50fX1cIj57e3BiYUFjY291bnR9fTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIiAqbmdJZj1cIiFlcnJvck1zZyAmJiBzZWxlY3RlZFBiYUFjY291bnRcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgcGJhLXBheW1lbnRzLWdvdnVrX19sYWJlbCBwYmEtcGF5bWVudHMtMjQtZm9udFwiIGZvcj1cInBiYUFjY291bnROdW1iZXJcIj5cbiAgICAgICAgICAgICAgICBFbnRlciBhIHJlZmVyZW5jZSBmb3IgeW91ciBQQkEgYWNjb3VudCBzdGF0ZW1lbnRzIFxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZXZlbnQtbmFtZS1oaW50XCIgY2xhc3M9XCJnb3Z1ay1oaW50IHBiYS1wYXltZW50cy0xOS1mb250IHBiYS1wYXltZW50LXdpZHRoXCI+XG4gICAgICAgICAgICAgICAgVGhpcyBzaG91bGQgYmUgeW91ciBvd24gdW5pcXVlIHJlZmVyZW5jZSB0byBpZGVudGlmeSB0aGUgY2FzZS4gSXQgd2lsbCBhcHBlYXIgb24geW91ciBzdGF0ZW1lbnRzLlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1pbnB1dCBwYmEtcGF5bWVudHMtcmVmLWJveC0tc2l6ZSBwYmEtcGF5bWVudHMtMTktZm9udFwiIGlkPVwicGJhQWNjb3VudFJlZlwiIChjaGFuZ2UpPVwic2VsZWN0cGJhYWNjb3VudCgkZXZlbnQpXCIgbmFtZT1cInBiYUFjY291bnRSZWZcIiB0eXBlPVwidGV4dFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJwYmFBY2NvdW50UmVmLWhpbnRcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgIFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2l0ZW1cIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLXJhZGlvc19faW5wdXRcIiBpZD1cImNhcmRQYXltZW50XCIgbmFtZT1cInBheW1lbnRTZWxlY3Rpb25cIiB0eXBlPVwicmFkaW9cIiB2YWx1ZT1cImNhcmRcIiAoY2xpY2spPVwic2VsZWN0UGF5bWVudE1ldGhvZCgnQ0FSRCcpXCIgZGF0YS1hcmlhLWNvbnRyb2xzPVwiY2FyZC1wYXltZW50XCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1yYWRpb3NfX2xhYmVsIHBiYS1wYXltZW50cy0xOS1mb250IHBiYS1wYXltZW50cy1mb250LWJsZFwiIGZvcj1cImNhcmRQYXltZW50XCI+XG4gICAgICAgICAgICAgIFBheSBieSBjcmVkaXQgb3IgZGViaXQgY2FyZFxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2ZpZWxkc2V0PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi0tZ3JvdXBcIiAgKm5nSWY9XCJlcnJvck1zZ1wiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gcGJhLXBheW1lbnRzLTE5LWZvbnQgZ292dWstYnV0dG9uLS1zZWNvbmRhcnkgcGJhLXBheW1lbnRzLW1hcmdpbi0xMFwiIChjbGljayk9XCJnb3RvQ2FzZXRyYW5zYXRpb25QYWdlKClcIj5cbiAgICAgICAgVmlldyBTZXJ2aWNlIFJlcXVlc3RcbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b24gcGJhLXBheW1lbnRzLTE5LWZvbnQgcGJhLXBheW1lbnRzLTIwLW1hcmdpblwiIChjbGljayk9XCJjYXJkUGF5bWVudCgpXCI+XG4gICAgICAgIFBheSBieSBjYXJkXG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLS1ncm91cFwiICAqbmdJZj1cIiFlcnJvck1zZ1wiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgW2Rpc2FibGVkXT1cImlzQ29udGludWVCdXR0b25kaXNhYmxlZFwiIGNsYXNzPVwiYnV0dG9uIHBiYS1wYXltZW50cy0xOS1mb250IHBiYS1wYXltZW50cy0yMC1tYXJnaW5cIiAoY2xpY2spPVwic2F2ZUFuZENvbnRpbnVlKClcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXNQQkFEcm9wZG93blNlbGVjdGVkXCI+Q29udGludWU8L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiaXNQQkFEcm9wZG93blNlbGVjdGVkXCI+Q29uZmlybSBwYXltZW50PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInBiYUFjY291bnRMaXN0Py5sZW5ndGggPD0gMCAmJiAhZXJyb3JNc2cgJiYgaXNHZXRQQkFBY2NvdW50U3VjY2VlZCAmJiBpc0NhcmRQYXltZW50U3VjY2Vzc1wiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstd2lkdGgtY29udGFpbmVyXCI+XG4gICAgPG1haW4gY2xhc3M9XCJnb3Z1ay1tYWluLXdyYXBwZXIgZ292dWstbWFpbi13cmFwcGVyLS1sXCIgaWQ9XCJtYWluLWNvbnRlbnRcIiByb2xlPVwibWFpblwiPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dF9faWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiE8L3NwYW4+XG4gICAgICAgICAgPHN0cm9uZyBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dF9fdGV4dFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRfX2Fzc2lzdGl2ZVwiPldhcm5pbmc8L3NwYW4+XG4gICAgICAgICAgICA8aDIgY2xhc3M9XCJ3YXJuaW5nLWhlYWRpbmctbVwiPllvdSBkb27igJl0IGhhdmUgYSByZWdpc3RlcmVkIFBCQS48L2gyPlxuICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBiYS1wYXltZW50cy1tYXJnaW4tdG9wLTEwXCI+XG4gICAgICAgICAgPGgyIGNsYXNzPVwiaGVhZGluZy1tZWRpdW1cIj5QYXkgYnkgY3JlZGl0IG9yIGRlYml0IGNhcmQ8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzPVwiZ292dWstYm9keSBwYmEtcGF5bWVudHMtMTktZm9udFwiPlxuICAgICAgICAgICAgV2UgcmVjb21tZW5kIHRoYXQgeW91IGFwcGx5IHRvIGdldCBhIG5ldyBQQkEgdG8gcGF5IGZvciBmZWVzLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZCB5cGJhLXBheW1lbnRzLTE5LWZvbnRcIj5cbiAgICAgICAgICAgIHlvdSBjYW4gYWxzbyBwYXkgYnkgY3JlZGl0IG9yIGRlYml0IGNhcmQgaWYgeW91IG5lZWQgdG8gcGF5IG5vd1xuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIChjbGljayk9XCJjYXJkUGF5bWVudCgpXCIgY2xhc3M9XCJidXR0b24gcGJhLXBheW1lbnRzLTE5LWZvbnQgcGJhLXBheW1lbnRzLTIwLW1hcmdpblwiPlxuICAgICAgICAgICAgICBQYXkgYnkgY2FyZFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBiYS1wYXltZW50cy1tYXJnaW4tdG9wLTEwXCI+XG4gICAgICAgICAgPGgyIGNsYXNzPVwiaGVhZGluZy1tZWRpdW1cIj5SZWdpc3RlciBhbiBleGlzdGluZyBQQkEgd2l0aCBNeUhNQ1RTPC9oMj5cbiAgICAgICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHkgcGJhLXBheW1lbnRzLTE5LWZvbnRcIj5cbiAgICAgICAgICAgIFlvdSBtYXkgZmluZCBpdCBlYXNpZXIgaW4gZnV0dXJlIHRvIHBheSBieSBQQkEsIHlvdXIgb3JnYW5pc2F0aW9uIGFkbWluaXN0cmF0b3Igd2lsbCBuZWVkIHRvIFxuICAgICAgICAgICAgZW1haWwgPGEgaHJlZj1cIm1haWx0bzogTXlITUNUU3N1cHBvcnRAanVzdGljZS5nb3YudWtcIj5NeUhNQ1RTc3VwcG9ydEBqdXN0aWNlLmdvdi51azwvYT4gdG8gYXNrIGZvciB5b3VyIFBCQSB0byBiZSByZWdpc3RlcmVkIHdpdGggeW91ciBcbiAgICAgICAgICAgIE15SE1DVFMgYWNjb3VudC4gWW91IHNob3VsZCBpbmNsdWRlIHlvdXIgb3JnYW5pc2F0aW9uIG5hbWUgYW5kIFBCQSBudW1iZXIuXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxwIGNsYXNzPVwiZ292dWstYm9keSBwYmEtcGF5bWVudHMtMTktZm9udFwiPlxuICAgICAgICAgICAgSXQgY2FuIHRoZW4gdGFrZSB1cCB0byAzIGRheXMgZm9yIHlvdXIgYWNjb3VudCB0byBiZSB1cGRhdGVkLiBZb3XigJlsbCBuZWVkIHRvIHN0YXJ0IHlvdXIgY2xhaW0gXG4gICAgICAgICAgICBhZ2FpbiB0byBwYXkgdGhlIGZlZS5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGJhLXBheW1lbnRzLW1hcmdpbi10b3AtMTBcIj5cbiAgICAgICAgICA8aDIgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bVwiPkFwcGx5IHRvIGdldCBhIG5ldyBQQkEgPC9oMj5cbiAgICAgICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHkgcGJhLXBheW1lbnRzLTE5LWZvbnRcIj5cbiAgICAgICAgICAgIFlvdeKAmWxsIG5lZWQgdG8gcHJvdmlkZSBkZXRhaWxzIGZvciB5b3UgYW5kIHlvdXIgb3JnYW5pc2F0aW9uLCBpbmNsdWRpbmcgdGhlIHJlcXVpcmVkIGNyZWRpdFxuICAgICAgICAgICAgIGxpbWl0IGZvciB5b3VyIGFjY291bnQuXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxwIGNsYXNzPVwiZ292dWstYm9keSBwYmEtcGF5bWVudHMtMTktZm9udFwiPlxuICAgICAgICAgICAgT25jZSB5b3VyIGFjY291bnQgaGFzIGJlZW4gcmVnaXN0ZXJlZCwgeW914oCZbGwgbmVlZCB0byBzdGFydCB5b3VyIGNsYWltIGFnYWluIHRvIHBheSB0aGUgZmVlLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHkgcGJhLXBheW1lbnRzLTE5LWZvbnRcIj5cbiAgICAgICAgICAgIFJlYWQgbW9yZSBpbmZvcm1hdGlvbiBvbiA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cuZ292LnVrL2d1aWRhbmNlL2htY3RzLXBheW1lbnQtYnktYWNjb3VudC1mb3Itb25saW5lLXNlcnZpY2VzXCI+cmVnaXN0ZXJpbmcgZm9yIFBCQTwvYT4uXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbWFpbj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzSW5TdWZmaWNpYW50RnVuZCAmJiBpc0NhcmRQYXltZW50U3VjY2Vzc1wiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstd2lkdGgtY29udGFpbmVyXCI+XG4gICAgPG1haW4gY2xhc3M9XCJnb3Z1ay1tYWluLXdyYXBwZXIgZ292dWstbWFpbi13cmFwcGVyLS1sXCIgaWQ9XCJtYWluLWNvbnRlbnRcIiByb2xlPVwibWFpblwiPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5IHBiYS1wYXltZW50cy1lcnJvci1ib3gtLXNpemVcIiBhcmlhLWxhYmVsbGVkYnk9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCI+XG4gICAgICAgICAgPGgyIGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fdGl0bGUgZ292dWstZXJyb3Itc3VtbWFyeV9fdGl0bGUtY3VzdG9tIHBiYS1wYXltZW50cy0yNC1mb250XCIgaWQ9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCI+XG4gICAgICAgICAgICBUaGVyZSBpcyBhIHByb2JsZW1cbiAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X19ib2R5XCI+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJnb3Z1ay1saXN0IGdvdnVrLWVycm9yLXN1bW1hcnlfX2xpc3RcIj5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicGJhLXBheW1lbnRzLWVycm9yLTE2LWZvbnRcIj5cbiAgICAgICAgICAgICAgICBZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggZnVuZHMgaW4geW91ciBQQkEgYWNjb3VudCB0byBwYXkgZm9yIHRoaXMgZmVlLlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwYmEtcGF5bWVudHMtZXJyb3ItMTYtZm9udFwiPlxuICAgICAgICAgICAgICAgIElmIHlvdSBoYXZlIGFscmVhZHkgdG9wcGVkIHVwIHlvdXIgUEJBIGFjY291bnQsIHdhaXQgdXAgdG8gMjQgaG91cnMgZm9yIHRoZSBuZXcgYmFsYW5jZSB0byBiZWNvbWUgYXZhaWxhYmxlLlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYmEtcGF5bWVudHMtbWFyZ2luLXRvcC0xMFwiPlxuICAgICAgICAgIDxoMiBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+U2hvdWxkIHlvdSBuZWVkIGFueSBmdXJ0aGVyIGFkdmljZTwvaDI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5IHBiYS1wYXltZW50cy0xOS1mb250XCI+XG4gICAgICAgICAgICBFbWFpbCA8YSBocmVmPVwibWFpbHRvOk1pZGRsZU9mZmljZS5ERHNlcnZpY2VzQGxpYmVyYXRhLmNvbVwiPk1pZGRsZU9mZmljZS5ERHNlcnZpY2VzQGxpYmVyYXRhLmNvbTwvYT4gb3IgY2FsbCA8YSBocmVmPVwidGVsOjAxNjMzLTY1Mi0xMjVcIj4wMTYzMyA2NTIgMTI1PC9hPiAob3B0aW9uIDMpIHRvIHRyeSB0byBmaXggdGhlIGlzc3VlLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHkgcGJhLXBheW1lbnRzLTE5LWZvbnRcIj5cbiAgICAgICAgICAgIHlvdSBjYW4gYWxzbyBwYXkgYnkgY3JlZGl0IG9yIGRlYml0IGNhcmQuXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1idXR0b24tLWdyb3VwXCI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwYmEtcGF5bWVudHMtMTktZm9udCBnb3Z1ay1idXR0b24tLXNlY29uZGFyeSBwYmEtcGF5bWVudHMtbWFyZ2luLTEwXCIgKGNsaWNrKT1cImdvdG9DYXNldHJhbnNhdGlvblBhZ2UoKVwiPlxuICAgICAgICAgICAgICBWaWV3IFNlcnZpY2UgUmVxdWVzdFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBwYmEtcGF5bWVudHMtMTktZm9udCBwYmEtcGF5bWVudHMtMjAtbWFyZ2luXCIgKGNsaWNrKT1cImNhcmRQYXltZW50KClcIj5cbiAgICAgICAgICAgICAgUGF5IGJ5IGNhcmRcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbWFpbj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJpc1BCQUFjY291bnROb3RFeGlzdCAmJiBpc0NhcmRQYXltZW50U3VjY2Vzc1wiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstd2lkdGgtY29udGFpbmVyXCI+XG4gICAgPG1haW4gY2xhc3M9XCJnb3Z1ay1tYWluLXdyYXBwZXIgZ292dWstbWFpbi13cmFwcGVyLS1sXCIgaWQ9XCJtYWluLWNvbnRlbnRcIiByb2xlPVwibWFpblwiPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5IHBiYS1wYXltZW50cy1lcnJvci1ib3gtLXNpemVcIiBhcmlhLWxhYmVsbGVkYnk9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCI+XG4gICAgICAgICAgPGgyIGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fdGl0bGUgZ292dWstZXJyb3Itc3VtbWFyeV9fdGl0bGUtY3VzdG9tIHBiYS1wYXltZW50cy0yNC1mb250XCIgaWQ9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCI+XG4gICAgICAgICAgICBUaGVyZSBpcyBhIHByb2JsZW1cbiAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X19ib2R5XCI+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJnb3Z1ay1saXN0IGdvdnVrLWVycm9yLXN1bW1hcnlfX2xpc3RcIj5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicGJhLXBheW1lbnRzLWVycm9yLTE2LWZvbnRcIj5cbiAgICAgICAgICAgICAgICBZb3VyIFBCQSBhY2NvdW50ICh7e3NlbGVjdGVkUGJhQWNjb3VudH19KSBubyBsb25nZXIgZXhpc3RzLlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYmEtcGF5bWVudHMtbWFyZ2luLXRvcC0xMFwiPlxuICAgICAgICAgIDxoMiBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+U2hvdWxkIHlvdSBuZWVkIGFueSBmdXJ0aGVyIGFkdmljZTwvaDI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5IHBiYS1wYXltZW50cy0xOS1mb250IGdvdnVrLWJvZHktd2lkdGhcIj5cbiAgICAgICAgICAgIEVtYWlsIDxhIGhyZWY9XCJtYWlsdG86TWlkZGxlT2ZmaWNlLkREc2VydmljZXNAbGliZXJhdGEuY29tXCI+TWlkZGxlT2ZmaWNlLkREc2VydmljZXNAbGliZXJhdGEuY29tPC9hPiBvciBjYWxsIDxhIGhyZWY9XCJ0ZWw6MDE2MzMtNjUyLTEyNVwiPjAxNjMzIDY1MiAxMjU8L2E+IChvcHRpb24gMykgdG8gdHJ5IHRvIGZpeCB0aGUgaXNzdWUuXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxwIGNsYXNzPVwiZ292dWstYm9keSBwYmEtcGF5bWVudHMtMTktZm9udFwiPlxuICAgICAgICAgICAgeW91IGNhbiBhbHNvIHBheSBieSBjcmVkaXQgb3IgZGViaXQgY2FyZC5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHBiYS1wYXltZW50cy0xOS1mb250IGdvdnVrLWJ1dHRvbi0tc2Vjb25kYXJ5IHBiYS1wYXltZW50cy1tYXJnaW4tMTBcIiAoY2xpY2spPVwiZ290b0Nhc2V0cmFuc2F0aW9uUGFnZSgpXCI+XG4gICAgICAgICAgICAgIFZpZXcgU2VydmljZSBSZXF1ZXN0XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnV0dG9uIHBiYS1wYXltZW50cy0xOS1mb250IHBiYS1wYXltZW50cy0yMC1tYXJnaW5cIiAoY2xpY2spPVwiY2FyZFBheW1lbnQoKVwiPlxuICAgICAgICAgICAgICBQYXkgYnkgY2FyZFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9tYWluPlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzUEJBQWNjb3VudEhvbGQgJiYgaXNDYXJkUGF5bWVudFN1Y2Nlc3NcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLXdpZHRoLWNvbnRhaW5lclwiPlxuICAgIDxtYWluIGNsYXNzPVwiZ292dWstbWFpbi13cmFwcGVyIGdvdnVrLW1haW4td3JhcHBlci0tbFwiIGlkPVwibWFpbi1jb250ZW50XCIgcm9sZT1cIm1haW5cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLXJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeSBwYmEtcGF5bWVudHMtZXJyb3ItYm94LS1zaXplXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXJyb3Itc3VtbWFyeS10aXRsZVwiPlxuICAgICAgICAgIDxoMiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX3RpdGxlIGdvdnVrLWVycm9yLXN1bW1hcnlfX3RpdGxlLWN1c3RvbSBwYmEtcGF5bWVudHMtMjQtZm9udFwiIGlkPVwiZXJyb3Itc3VtbWFyeS10aXRsZVwiPlxuICAgICAgICAgICAgVGhlcmUgaXMgYSBwcm9ibGVtXG4gICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fYm9keVwiPlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwiZ292dWstbGlzdCBnb3Z1ay1lcnJvci1zdW1tYXJ5X19saXN0XCI+XG4gICAgICAgICAgICAgIDxsaSBjbGFzcz1cInBiYS1wYXltZW50cy1lcnJvci0xNi1mb250XCI+XG4gICAgICAgICAgICAgICAgWW91ciBQQkEgYWNjb3VudCAoe3tzZWxlY3RlZFBiYUFjY291bnR9fSkgaGFzIGJlZW4gcHV0IG9uIGhvbGQuXG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBiYS1wYXltZW50cy1tYXJnaW4tdG9wLTEwXCI+XG4gICAgICAgICAgPGgyIGNsYXNzPVwiaGVhZGluZy1tZWRpdW1cIj5TaG91bGQgeW91IG5lZWQgYW55IGZ1cnRoZXIgYWR2aWNlPC9oMj5cbiAgICAgICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHkgcGJhLXBheW1lbnRzLTE5LWZvbnQgZ292dWstYm9keS13aWR0aFwiPlxuICAgICAgICAgICAgRW1haWwgPGEgaHJlZj1cIm1haWx0bzpNaWRkbGVPZmZpY2UuRERzZXJ2aWNlc0BsaWJlcmF0YS5jb21cIj5NaWRkbGVPZmZpY2UuRERzZXJ2aWNlc0BsaWJlcmF0YS5jb208L2E+IG9yIGNhbGwgPGEgaHJlZj1cInRlbDowMTYzMy02NTItMTI1XCI+MDE2MzMgNjUyIDEyNTwvYT4gKG9wdGlvbiAzKSB0byB0cnkgdG8gZml4IHRoZSBpc3N1ZS5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5IHBiYS1wYXltZW50cy0xOS1mb250XCI+XG4gICAgICAgICAgICB5b3UgY2FuIGFsc28gcGF5IGJ5IGNyZWRpdCBvciBkZWJpdCBjYXJkLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLS1ncm91cFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gcGJhLXBheW1lbnRzLTE5LWZvbnQgZ292dWstYnV0dG9uLS1zZWNvbmRhcnkgcGJhLXBheW1lbnRzLW1hcmdpbi0xMFwiIChjbGljayk9XCJnb3RvQ2FzZXRyYW5zYXRpb25QYWdlKClcIj5cbiAgICAgICAgICAgICAgVmlldyBTZXJ2aWNlIFJlcXVlc3RcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b24gcGJhLXBheW1lbnRzLTE5LWZvbnQgcGJhLXBheW1lbnRzLTIwLW1hcmdpblwiIChjbGljayk9XCJjYXJkUGF5bWVudCgpXCI+XG4gICAgICAgICAgICAgIFBheSBieSBjYXJkXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L21haW4+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG48bmctY29udGFpbmVyICpuZ0lmPVwiaXNQQkFTZXJ2ZXJFcnJvciAmJiBpc0NhcmRQYXltZW50U3VjY2Vzc1wiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstd2lkdGgtY29udGFpbmVyXCI+XG4gICAgPG1haW4gY2xhc3M9XCJnb3Z1ay1tYWluLXdyYXBwZXIgZ292dWstbWFpbi13cmFwcGVyLS1sXCIgaWQ9XCJtYWluLWNvbnRlbnRcIiByb2xlPVwibWFpblwiPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYmEtcGF5bWVudHMtbWFyZ2luLXRvcC0xMFwiPlxuICAgICAgICAgIDxoMiBjbGFzcz1cInBiYS1wYXltZW50cy1oZWFkaW5nLWxnXCI+U29ycnksIHRoZXJlIGlzIGEgcHJvYmxlbSB3aXRoIHRoZSBzZXJ2aWNlPC9oMj5cbiAgICAgICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHkgcGJhLXBheW1lbnRzLTE5LWZvbnRcIj5cbiAgICAgICAgICAgIFRyeSBhZ2FpbiBsYXRlci5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5IHBiYS1wYXltZW50cy0xOS1mb250XCI+XG4gICAgICAgICAgICB5b3UgY2FuIGFsc28gcGF5IGJ5IGNyZWRpdCBvciBkZWJpdCBjYXJkLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLS1ncm91cFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gcGJhLXBheW1lbnRzLTE5LWZvbnQgZ292dWstYnV0dG9uLS1zZWNvbmRhcnkgcGJhLXBheW1lbnRzLW1hcmdpbi0xMFwiIChjbGljayk9XCJnb3RvQ2FzZXRyYW5zYXRpb25QYWdlKClcIj5cbiAgICAgICAgICAgICAgVmlldyBTZXJ2aWNlIFJlcXVlc3RcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b24gcGJhLXBheW1lbnRzLTE5LWZvbnQgcGJhLXBheW1lbnRzLTIwLW1hcmdpblwiIChjbGljayk9XCJjYXJkUGF5bWVudCgpXCI+XG4gICAgICAgICAgICAgIFBheSBieSBjYXJkXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L21haW4+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJpc1BCQUFjY291bnRQYXltZW50U3VjY2VzcyAmJiBpc0NhcmRQYXltZW50U3VjY2Vzc1wiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstd2lkdGgtY29udGFpbmVyXCI+XG4gICAgPG1haW4gY2xhc3M9XCJnb3Z1ay1tYWluLXdyYXBwZXIgZ292dWstbWFpbi13cmFwcGVyLS1sXCIgaWQ9XCJtYWluLWNvbnRlbnRcIiByb2xlPVwibWFpblwiPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1wYW5lbCBnb3Z1ay1wYW5lbC0tY29uZmlybWF0aW9uIHBiYS1wYXltZW50cy0tY29uZmlybWF0aW9uXCI+XG4gICAgICAgICAgPGgxIGNsYXNzPVwiZ292dWstcGFuZWxfX3RpdGxlIHBiYS1wYXltZW50cy0tdGl0bGVcIj5cbiAgICAgICAgICAgICAgUGF5bWVudCBzdWNjZXNzZnVsXG4gICAgICAgICAgPC9oMT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcGFuZWxfX2JvZHkgcGJhLXBheW1lbnRzX19ib2R5XCI+XG4gICAgICAgICAgICAgIFlvdXIgcGF5bWVudCByZWZlcmVuY2UgaXMgPGJyPjxzdHJvbmc+e3twYmFBY2NvdW50clBheW1lbnRSZXN1bHQucGF5bWVudF9yZWZlcmVuY2V9fTwvc3Ryb25nPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHkgcGJhLXBheW1lbnRzLTE5LWZvbnRcIj5cbiAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnb3RvQ2FzZXRyYW5zYXRpb25QYWdlKClcIj5WaWV3IHNlcnZpY2UgcmVxdWVzdHM8L2E+XG4gICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L21haW4+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNDYXJkUGF5bWVudFN1Y2Nlc3NcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLXdpZHRoLWNvbnRhaW5lclwiPlxuICAgIDxtYWluIGNsYXNzPVwiZ292dWstbWFpbi13cmFwcGVyIGdvdnVrLW1haW4td3JhcHBlci0tbFwiIGlkPVwibWFpbi1jb250ZW50XCIgcm9sZT1cIm1haW5cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLXJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGJhLXBheW1lbnRzLW1hcmdpbi10b3AtMTBcIj5cbiAgICAgICAgICA8aDIgY2xhc3M9XCJwYmEtcGF5bWVudHMtaGVhZGluZy1sZ1wiPlNvcnJ5LCB0aGVyZSBpcyBhIHByb2JsZW0gd2l0aCB0aGUgc2VydmljZTwvaDI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5IHBiYS1wYXltZW50cy0xOS1mb250XCI+XG4gICAgICAgICAgICBUcnkgYWdhaW4gbGF0ZXIuXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDwhLS0gPHAgY2xhc3M9XCJnb3Z1ay1ib2R5IHBiYS1wYXltZW50cy0xOS1mb250XCI+XG4gICAgICAgICAgICB5b3UgY2FuIGFsc28gPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJjYXJkUGF5bWVudCgpXCIgPnBheSBieSBjcmVkaXQgb3IgZGViaXQgY2FyZDwvYT4uXG4gICAgICAgICAgPC9wPiAtLT5cbiAgICAgICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHkgcGJhLXBheW1lbnRzLTE5LWZvbnRcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ290b0Nhc2V0cmFuc2F0aW9uUGFnZSgpXCI+VmlldyBzZXJ2aWNlIHJlcXVlc3RzPC9hPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L21haW4+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj5cblxuXG5cbiJdfQ==