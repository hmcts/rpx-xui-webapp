import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { RefundsService } from '../../services/refunds/refunds.service';
import { OrderslistService } from '../../services/orderslist.service';
import { NotificationService } from '../../services/notification/notification.service';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "../../services/refunds/refunds.service";
import * as i2 from "../../services/payment-view/payment-view.service";
import * as i3 from "@angular/forms";
import * as i4 from "../../services/orderslist.service";
import * as i5 from "../../services/notification/notification.service";
import * as i6 from "../../payment-lib.component";
import * as i7 from "@angular/router";
import * as i8 from "@angular/common";
import * as i9 from "../notification-preview/notification-preview.component";
function ProcessRefundComponent_ng_container_0_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 41)(2, "h2", 42);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 43);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.errorMessage.title, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.errorMessage.body, " ");
} }
function ProcessRefundComponent_ng_container_0_div_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44)(1, "strong");
    i0.ɵɵtext(2, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.refundlistsource == null ? null : ctx_r2.refundlistsource.contact_details == null ? null : ctx_r2.refundlistsource.contact_details.email == null ? null : ctx_r2.refundlistsource.contact_details.email.trim(), " ");
} }
function ProcessRefundComponent_ng_container_0_div_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44)(1, "strong");
    i0.ɵɵtext(2, "Post");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate5(" ", ctx_r3.refundlistsource == null ? null : ctx_r3.refundlistsource.contact_details == null ? null : ctx_r3.refundlistsource.contact_details.address_line == null ? null : ctx_r3.refundlistsource.contact_details.address_line.trim(), " ", ctx_r3.refundlistsource == null ? null : ctx_r3.refundlistsource.contact_details == null ? null : ctx_r3.refundlistsource.contact_details.city == null ? null : ctx_r3.refundlistsource.contact_details.city.trim(), " ", ctx_r3.refundlistsource == null ? null : ctx_r3.refundlistsource.contact_details == null ? null : ctx_r3.refundlistsource.contact_details.county == null ? null : ctx_r3.refundlistsource.contact_details.county.trim(), " ", ctx_r3.refundlistsource == null ? null : ctx_r3.refundlistsource.contact_details == null ? null : ctx_r3.refundlistsource.contact_details.country == null ? null : ctx_r3.refundlistsource.contact_details.country.trim(), " ", ctx_r3.refundlistsource == null ? null : ctx_r3.refundlistsource.contact_details == null ? null : ctx_r3.refundlistsource.contact_details.postal_code == null ? null : ctx_r3.refundlistsource.contact_details.postal_code.trim(), " ");
} }
function ProcessRefundComponent_ng_container_0_a_56_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 45);
    i0.ɵɵlistener("click", function ProcessRefundComponent_ng_container_0_a_56_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r14.showNotificationPreview()); });
    i0.ɵɵtext(1, " Preview ");
    i0.ɵɵelementEnd();
} }
function ProcessRefundComponent_ng_container_0_a_57_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 45);
    i0.ɵɵlistener("click", function ProcessRefundComponent_ng_container_0_a_57_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r16.hideNotificationPreview()); });
    i0.ɵɵtext(1, " Hide Preview ");
    i0.ɵɵelementEnd();
} }
function ProcessRefundComponent_ng_container_0_app_notification_preview_58_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-notification-preview", 46);
    i0.ɵɵlistener("notificationPreviewEvent", function ProcessRefundComponent_ng_container_0_app_notification_preview_58_Template_app_notification_preview_notificationPreviewEvent_0_listener($event) { i0.ɵɵrestoreView(_r19); const ctx_r18 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r18.getNotificationPreviewObj($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("paymentReference", ctx_r6.refundlistsource == null ? null : ctx_r6.refundlistsource.payment_reference)("payment", ctx_r6.paymentObj)("contactDetails", ctx_r6.refundlistsource == null ? null : ctx_r6.refundlistsource.contact_details)("refundReason", ctx_r6.refundlistsource == null ? null : ctx_r6.refundlistsource.reason_code)("refundAmount", ctx_r6.refundlistsource == null ? null : ctx_r6.refundlistsource.amount)("refundReference", ctx_r6.refundlistsource == null ? null : ctx_r6.refundlistsource.refund_reference);
} }
function ProcessRefundComponent_ng_container_0_p_68_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Please select an action");
    i0.ɵɵelementEnd();
} }
function ProcessRefundComponent_ng_container_0_p_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 47);
    i0.ɵɵtemplate(1, ProcessRefundComponent_ng_container_0_p_68_span_1_Template, 2, 0, "span", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.refundActionsHasError);
} }
function ProcessRefundComponent_ng_container_0_div_69_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 48)(1, "input", 49);
    i0.ɵɵlistener("click", function ProcessRefundComponent_ng_container_0_div_69_Template_input_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r24); const refundAction_r21 = restoredCtx.$implicit; const ctx_r23 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r23.checkRefundActions(refundAction_r21.code)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 50);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 51);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const refundAction_r21 = ctx.$implicit;
    const i_r22 = ctx.index;
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("id", "refundAction-", i_r22, "");
    i0.ɵɵpropertyInterpolate("value", refundAction_r21.code);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("for", "refundAction-", i_r22, "");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", refundAction_r21.code, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", refundAction_r21.label, " ");
} }
function ProcessRefundComponent_ng_container_0_p_74_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Add a reason");
    i0.ɵɵelementEnd();
} }
function ProcessRefundComponent_ng_container_0_p_74_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Add a valid reason");
    i0.ɵɵelementEnd();
} }
function ProcessRefundComponent_ng_container_0_p_74_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Reason should be at least 3 characters.");
    i0.ɵɵelementEnd();
} }
function ProcessRefundComponent_ng_container_0_p_74_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Reason should be 255 characters or under.");
    i0.ɵɵelementEnd();
} }
function ProcessRefundComponent_ng_container_0_p_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 47);
    i0.ɵɵtemplate(1, ProcessRefundComponent_ng_container_0_p_74_span_1_Template, 2, 0, "span", 0);
    i0.ɵɵtemplate(2, ProcessRefundComponent_ng_container_0_p_74_span_2_Template, 2, 0, "span", 0);
    i0.ɵɵtemplate(3, ProcessRefundComponent_ng_container_0_p_74_span_3_Template, 2, 0, "span", 0);
    i0.ɵɵtemplate(4, ProcessRefundComponent_ng_container_0_p_74_span_4_Template, 2, 0, "span", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.isReasonFieldEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.isReasonFieldInvalid);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.reasonFieldMinHasError);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.reasonFieldMaxHasError);
} }
function ProcessRefundComponent_ng_container_0_p_82_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Please select a reject reason");
    i0.ɵɵelementEnd();
} }
function ProcessRefundComponent_ng_container_0_p_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 47);
    i0.ɵɵtemplate(1, ProcessRefundComponent_ng_container_0_p_82_span_1_Template, 2, 0, "span", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.refundRejectReasonHasError);
} }
function ProcessRefundComponent_ng_container_0_div_83_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 48)(1, "input", 52);
    i0.ɵɵlistener("click", function ProcessRefundComponent_ng_container_0_div_83_Template_input_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r33); const refundRejectReason_r30 = restoredCtx.$implicit; const ctx_r32 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r32.checkRefundActions(refundRejectReason_r30.code)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 50);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const refundRejectReason_r30 = ctx.$implicit;
    const j_r31 = ctx.index;
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("id", "refundRejectReason-", j_r31, "");
    i0.ɵɵpropertyInterpolate("value", refundRejectReason_r30.code);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("for", "refundRejectReason-", j_r31, "");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", refundRejectReason_r30.name, " ");
} }
function ProcessRefundComponent_ng_container_0_p_88_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter reason.");
    i0.ɵɵelementEnd();
} }
function ProcessRefundComponent_ng_container_0_p_88_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a valid reason");
    i0.ɵɵelementEnd();
} }
function ProcessRefundComponent_ng_container_0_p_88_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 47);
    i0.ɵɵtemplate(1, ProcessRefundComponent_ng_container_0_p_88_span_1_Template, 2, 0, "span", 0);
    i0.ɵɵtemplate(2, ProcessRefundComponent_ng_container_0_p_88_span_2_Template, 2, 0, "span", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r12.isReasonEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r12.isReasonInvalid);
} }
function ProcessRefundComponent_ng_container_0_div_97_Template(rf, ctx) { if (rf & 1) {
    const _r37 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 53)(1, "p")(2, "a", 54);
    i0.ɵɵlistener("click", function ProcessRefundComponent_ng_container_0_div_97_Template_a_click_2_listener() { i0.ɵɵrestoreView(_r37); const ctx_r36 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r36.loadRefundsHomePage()); });
    i0.ɵɵtext(3, "Cancel");
    i0.ɵɵelementEnd()()();
} }
const _c0 = function (a0) { return { "govuk-radios__conditional--hidden": a0 }; };
const _c1 = function (a0) { return { "form-group-error": a0 }; };
const _c2 = function (a0) { return { "inline-error-class": a0 }; };
function ProcessRefundComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r39 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 1)(2, "main", 2);
    i0.ɵɵtemplate(3, ProcessRefundComponent_ng_container_0_div_3_Template, 6, 2, "div", 0);
    i0.ɵɵelementStart(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "h1", 6);
    i0.ɵɵtext(8, "Review refund details");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "table")(10, "tbody")(11, "tr", 7)(12, "td", 8);
    i0.ɵɵtext(13, "Payment to be refunded");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 9);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "tr", 7)(18, "td", 8);
    i0.ɵɵtext(19, "Reason for refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "td", 9);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "tr", 7)(23, "td", 8);
    i0.ɵɵtext(24, "Amount to be refunded");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "td", 9);
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "tr", 7)(29, "td", 8);
    i0.ɵɵtext(30, "Sent to");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "td", 9);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "tr", 7)(34, "td", 8);
    i0.ɵɵtext(35, "Sent via");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "td", 9);
    i0.ɵɵtemplate(37, ProcessRefundComponent_ng_container_0_div_37_Template, 5, 1, "div", 10);
    i0.ɵɵtemplate(38, ProcessRefundComponent_ng_container_0_div_38_Template, 5, 5, "div", 10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "tr", 7)(40, "td", 8);
    i0.ɵɵtext(41, "Submitted by");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "td", 9);
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "tr", 7)(45, "td", 8);
    i0.ɵɵtext(46, "Date submitted");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "td", 9);
    i0.ɵɵtext(48);
    i0.ɵɵpipe(49, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "tr", 7)(51, "td", 8);
    i0.ɵɵtext(52, "Notification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "td");
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "td");
    i0.ɵɵtemplate(56, ProcessRefundComponent_ng_container_0_a_56_Template, 2, 0, "a", 11);
    i0.ɵɵtemplate(57, ProcessRefundComponent_ng_container_0_a_57_Template, 2, 0, "a", 11);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(58, ProcessRefundComponent_ng_container_0_app_notification_preview_58_Template, 1, 6, "app-notification-preview", 12);
    i0.ɵɵelement(59, "div");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "div", 13)(61, "form", 14)(62, "div", 15)(63, "fieldset", 16)(64, "legend", 17)(65, "h1", 18);
    i0.ɵɵtext(66, " What do you want to do with this refund? ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(67, "div", 19);
    i0.ɵɵtemplate(68, ProcessRefundComponent_ng_container_0_p_68_Template, 2, 1, "p", 20);
    i0.ɵɵtemplate(69, ProcessRefundComponent_ng_container_0_div_69_Template, 6, 5, "div", 21);
    i0.ɵɵelementStart(70, "div", 22)(71, "div", 23)(72, "label", 24);
    i0.ɵɵtext(73, " Add a reason ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(74, ProcessRefundComponent_ng_container_0_p_74_Template, 5, 4, "p", 20);
    i0.ɵɵelement(75, "textarea", 25);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(76, "div", 26)(77, "fieldset", 27)(78, "legend", 17)(79, "h2", 28);
    i0.ɵɵtext(80, " Why are you rejecting this refund? ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(81, "div", 19);
    i0.ɵɵtemplate(82, ProcessRefundComponent_ng_container_0_p_82_Template, 2, 1, "p", 20);
    i0.ɵɵtemplate(83, ProcessRefundComponent_ng_container_0_div_83_Template, 4, 4, "div", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "div", 29)(85, "div", 23)(86, "label", 24);
    i0.ɵɵtext(87, " Enter reason ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(88, ProcessRefundComponent_ng_container_0_p_88_Template, 3, 2, "p", 20);
    i0.ɵɵelement(89, "input", 30);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(90, "div", 31)(91, "button", 32);
    i0.ɵɵlistener("click", function ProcessRefundComponent_ng_container_0_Template_button_click_91_listener() { i0.ɵɵrestoreView(_r39); const ctx_r38 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r38.redirecttoRefundListPage()); });
    i0.ɵɵtext(92, " Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(93, "button", 33);
    i0.ɵɵlistener("click", function ProcessRefundComponent_ng_container_0_Template_button_click_93_listener() { i0.ɵɵrestoreView(_r39); const ctx_r40 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r40.processRefundSubmit()); });
    i0.ɵɵtext(94, " Submit ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(95, "br")(96, "br");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(97, ProcessRefundComponent_ng_container_0_div_97_Template, 4, 0, "div", 34);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(98, "main", 35)(99, "div", 36)(100, "div", 37)(101, "h1", 38);
    i0.ɵɵtext(102);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(103, "p", 39)(104, "a", 40);
    i0.ɵɵlistener("click", function ProcessRefundComponent_ng_container_0_Template_a_click_104_listener() { i0.ɵɵrestoreView(_r39); const ctx_r41 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r41.goToCaseReview()); });
    i0.ɵɵtext(105, "Return to case");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(45, _c0, ctx_r0.isSuccesspageEnable));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.errorMessage.showError);
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate2("", ctx_r0.refundlistsource == null ? null : ctx_r0.refundlistsource.refund_reference, " (", i0.ɵɵpipeBind4(16, 32, ctx_r0.refundlistsource.amount, "GBP", "symbol", "1.2-2"), ")");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.refundlistsource == null ? null : ctx_r0.refundlistsource.reason == null ? null : ctx_r0.refundlistsource.reason.trim());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(27, 37, ctx_r0.refundlistsource == null ? null : ctx_r0.refundlistsource.amount, "GBP", "symbol", "1.2-2"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.cpoDetails == null ? null : ctx_r0.cpoDetails.responsibleParty);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", (ctx_r0.refundlistsource == null ? null : ctx_r0.refundlistsource.contact_details == null ? null : ctx_r0.refundlistsource.contact_details.notification_type) === "EMAIL");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r0.refundlistsource == null ? null : ctx_r0.refundlistsource.contact_details == null ? null : ctx_r0.refundlistsource.contact_details.notification_type) === "LETTER");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.refundlistsource == null ? null : ctx_r0.refundlistsource.user_full_name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(49, 42, ctx_r0.refundlistsource == null ? null : ctx_r0.refundlistsource.date_created, "d MMMM yyyy"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.templateInstructionType);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r0.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.notificationPreview);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r0.processRefundForm);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(47, _c1, ctx_r0.refundActionsHasError));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.refundActionsHasError);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.refundActionList);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(49, _c0, !ctx_r0.isSendMeBackClicked));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r0.isReasonFieldEmpty || ctx_r0.isReasonFieldInvalid || ctx_r0.reasonFieldMinHasError || ctx_r0.reasonFieldMaxHasError);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(51, _c2, ctx_r0.isReasonFieldEmpty || ctx_r0.isReasonFieldInvalid || ctx_r0.reasonFieldMinHasError || ctx_r0.reasonFieldMaxHasError));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(53, _c0, !ctx_r0.isRejectClicked));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(55, _c1, ctx_r0.refundRejectReasonHasError));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.refundRejectReasonHasError);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.refundRejectReasonList);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(57, _c0, !ctx_r0.isOtherClicked));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r0.isReasonEmpty || ctx_r0.isReasonInvalid);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(59, _c2, ctx_r0.isReasonEmpty || ctx_r0.isReasonInvalid));
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", !ctx_r0.isFromRefundListPage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(61, _c0, !ctx_r0.isSuccesspageEnable));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.successMsg, " ");
} }
export class ProcessRefundComponent {
    RefundsService;
    paymentViewService;
    formBuilder;
    OrderslistService;
    notificationService;
    paymentLibComponent;
    router;
    activeRoute;
    refundReference;
    refundlistsource;
    processRefundForm;
    errorMessage = this.getErrorMessage(false, '', '', '');
    sendmeback = null;
    viewStatus;
    refundActionList = [];
    refundRejectReasonList = [];
    isSendMeBackClicked = false;
    isRejectClicked = false;
    isOtherClicked = false;
    isSuccesspageEnable = false;
    refundActionsHasError = false;
    refundRejectReasonHasError = false;
    isReasonFieldEmpty = false;
    isReasonFieldInvalid = false;
    reasonFieldMinHasError = false;
    reasonFieldMaxHasError = false;
    isReasonEmpty = false;
    isReasonInvalid = false;
    successMsg = null;
    navigationpage;
    ccdCaseNumber;
    isFromRefundListPage;
    cpoDetails = null;
    isCPODown;
    isConfirmButtondisabled = true;
    paymentObj;
    templateInstructionType;
    notificationPreview = false;
    notificationPreviewObj;
    constructor(RefundsService, paymentViewService, formBuilder, OrderslistService, notificationService, paymentLibComponent, router, activeRoute) {
        this.RefundsService = RefundsService;
        this.paymentViewService = paymentViewService;
        this.formBuilder = formBuilder;
        this.OrderslistService = OrderslistService;
        this.notificationService = notificationService;
        this.paymentLibComponent = paymentLibComponent;
        this.router = router;
        this.activeRoute = activeRoute;
    }
    ngOnInit() {
        this.viewStatus = 'RefundProcess';
        this.RefundsService.getRefundActions(this.refundReference).subscribe(refundActionList => {
            this.refundActionList = refundActionList;
        }, err => {
            this.errorMessage = this.getErrorMessage(true, err.statusCode, err.err, err);
        });
        this.processRefundForm = this.formBuilder.group({
            refundActionField: new FormControl('', Validators.compose([
                Validators.required
            ])),
            refundRejectReasonField: new FormControl('', Validators.compose([
                Validators.required
            ])),
            sendMeBackField: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
                Validators.pattern('^([a-zA-Z0-9\\s,\\.]*)$'),
            ])),
            enterReasonField: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(30),
                Validators.pattern('^([a-zA-Z0-9.\\s]*)$'),
            ])),
        });
        this.ccdCaseNumber = this.refundlistsource.ccd_case_number;
        if ((typeof this.paymentLibComponent.TAKEPAYMENT === 'string' && this.paymentLibComponent.TAKEPAYMENT === 'false') || (typeof this.paymentLibComponent.TAKEPAYMENT === 'boolean' && !this.paymentLibComponent.TAKEPAYMENT)) {
            this.isFromRefundListPage = true;
        }
        this.paymentViewService.getPartyDetails(this.ccdCaseNumber).subscribe(response => {
            this.cpoDetails = JSON.parse(response).content[0];
        }, (error) => {
            this.errorMessage = error.replace(/"/g, "");
            this.isCPODown = true;
        });
        this.getTemplateInstructionType(this.paymentObj, this.refundlistsource.payment_reference);
    }
    checkRefundActions(code) {
        this.refundActionsHasError = false;
        this.isReasonFieldEmpty = false;
        this.isReasonEmpty = false;
        this.isReasonInvalid = false;
        this.refundRejectReasonHasError = false;
        if (code === 'Return to caseworker') {
            this.isConfirmButtondisabled = true;
            this.isSendMeBackClicked = true;
            this.isRejectClicked = false;
            this.isOtherClicked = false;
        }
        else if (code === 'Approve') {
            this.isSendMeBackClicked = false;
            this.isConfirmButtondisabled = false;
            this.isRejectClicked = false;
            this.isOtherClicked = false;
        }
        else if (code === 'Reject') {
            this.isRejectClicked = true;
            this.isSendMeBackClicked = false;
            this.isOtherClicked = false;
            this.RefundsService.getRefundRejectReasons().subscribe(refundRejectReasonList => {
                this.refundRejectReasonList = refundRejectReasonList;
            }, err => {
                this.errorMessage = this.getErrorMessage(true, err.statusCode, err.err, err);
            });
        }
        else if (code === 'RE005') {
            this.isOtherClicked = true;
        }
        else if (code !== 'RE005') {
            this.isOtherClicked = false;
        }
    }
    getNotificationPreviewObj(notificationPreviewObj) {
        this.notificationPreviewObj = notificationPreviewObj;
    }
    processRefundSubmit() {
        let processRefundRequest;
        let status;
        this.resetForm([false, false, false, false, false, false, false, false], 'all');
        const controls = this.processRefundForm.controls;
        const processFormError = controls.sendMeBackField.errors;
        if (this.processRefundForm.dirty && controls.refundActionField.valid
            && (controls.refundActionField.value == 'Approve'
                || (controls.refundActionField.value == 'Reject' && controls.refundRejectReasonField.valid && controls.refundRejectReasonField.value != 'RE005')
                || (controls.refundActionField.value == 'Reject' && controls.refundRejectReasonField.value == 'RE005' && controls.enterReasonField.valid)
                || (controls.refundActionField.value == 'Return to caseworker' && controls.sendMeBackField.valid))) {
            if (controls.refundActionField.value === 'Approve') {
                status = 'APPROVE';
                if (this.notificationPreviewObj) {
                    processRefundRequest = {
                        code: '',
                        reason: '',
                        template_preview: {
                            body: this.notificationPreviewObj.body,
                            from: {
                                from_email_address: this.notificationPreviewObj.from.from_email_address,
                                from_mail_address: {
                                    address_line: this.notificationPreviewObj.from.from_mail_address.address_line,
                                    city: this.notificationPreviewObj.from.from_mail_address.city,
                                    country: this.notificationPreviewObj.from.from_mail_address.country,
                                    county: this.notificationPreviewObj.from.from_mail_address.county,
                                    postal_code: this.notificationPreviewObj.from.from_mail_address.postal_code
                                }
                            },
                            html: this.notificationPreviewObj.html,
                            id: this.notificationPreviewObj.template_id,
                            subject: this.notificationPreviewObj.subject,
                            template_type: this.notificationPreviewObj.template_type,
                            version: 0
                        }
                    };
                }
                else {
                    processRefundRequest = {
                        code: '',
                        reason: ''
                    };
                }
            }
            else if (controls.refundActionField.value === 'Reject') {
                status = 'REJECT';
                if (this.notificationPreviewObj) {
                    processRefundRequest = {
                        code: controls.refundRejectReasonField.value ? controls.refundRejectReasonField.value : '',
                        reason: controls.refundRejectReasonField.value == 'RE005' ? controls.enterReasonField.value : '',
                        template_preview: {
                            body: this.notificationPreviewObj.body,
                            from: {
                                from_email_address: this.notificationPreviewObj.from.from_email_address,
                                from_mail_address: {
                                    address_line: this.notificationPreviewObj.from.from_mail_address.address_line,
                                    city: this.notificationPreviewObj.from.from_mail_address.city,
                                    country: this.notificationPreviewObj.from.from_mail_address.country,
                                    county: this.notificationPreviewObj.from.from_mail_address.county,
                                    postal_code: this.notificationPreviewObj.from.from_mail_address.postal_code
                                }
                            },
                            html: this.notificationPreviewObj.html,
                            id: this.notificationPreviewObj.template_id,
                            subject: this.notificationPreviewObj.subject,
                            template_type: this.notificationPreviewObj.template_type,
                            version: 0
                        }
                    };
                }
                else {
                    processRefundRequest = {
                        code: controls.refundRejectReasonField.value ? controls.refundRejectReasonField.value : '',
                        reason: controls.refundRejectReasonField.value == 'RE005' ? controls.enterReasonField.value : ''
                    };
                }
            }
            else if (controls.refundActionField.value === 'Return to caseworker') {
                status = 'SENDBACK';
                if (this.notificationPreviewObj) {
                    processRefundRequest = {
                        code: '',
                        reason: controls.sendMeBackField.value,
                        template_preview: {
                            body: this.notificationPreviewObj.body,
                            from: {
                                from_email_address: this.notificationPreviewObj.from.from_email_address,
                                from_mail_address: {
                                    address_line: this.notificationPreviewObj.from.from_mail_address.address_line,
                                    city: this.notificationPreviewObj.from.from_mail_address.city,
                                    country: this.notificationPreviewObj.from.from_mail_address.country,
                                    county: this.notificationPreviewObj.from.from_mail_address.county,
                                    postal_code: this.notificationPreviewObj.from.from_mail_address.postal_code
                                }
                            },
                            html: this.notificationPreviewObj.html,
                            id: this.notificationPreviewObj.template_id,
                            subject: this.notificationPreviewObj.subject,
                            template_type: this.notificationPreviewObj.template_type,
                            version: 0
                        }
                    };
                }
                else {
                    processRefundRequest = {
                        code: '',
                        reason: controls.sendMeBackField.value
                    };
                }
            }
            this.RefundsService.patchRefundActions(processRefundRequest, this.refundReference, status).subscribe(response => {
                this.isSuccesspageEnable = true;
                // this.successMsg = JSON.parse(response)['data'];
                this.successMsg = response.replace(/['"]+/g, '');
            }, err => {
                this.errorMessage = this.getErrorMessage(true, err.statusCode, err.err, err);
            });
        }
        else {
            if (controls.refundActionField.value == "") {
                this.resetForm([true, false, false, false, false, false, false, false], 'action');
            }
            if (controls.refundActionField.value == 'Reject' && controls.refundRejectReasonField.value == "") {
                this.resetForm([false, true, false, false, false, false, false, false], 'rejectReason');
            }
            if (controls.refundActionField.value == 'Return to caseworker') {
                if (controls.sendMeBackField.value == '') {
                    this.resetForm([false, false, true, false, false, false, false, false], 'addAreason');
                }
                if (controls.sendMeBackField.value != '' && controls.sendMeBackField.invalid) {
                    this.resetForm([false, false, false, true, false, false, false, false], 'addAreason');
                }
                if (processFormError && processFormError.minlength && processFormError.minlength.actualLength < 3) {
                    this.resetForm([false, false, false, false, true, false, false, false], 'addAreason');
                }
                if (processFormError && processFormError.maxlength && processFormError.maxlength.actualLength > 255) {
                    this.resetForm([false, false, false, false, false, true, false, false], 'addAreason');
                }
            }
            if (controls.refundActionField.value == 'Reject' && controls.refundRejectReasonField.value == 'RE005') {
                if (controls.enterReasonField.value === "") {
                    this.resetForm([false, false, false, false, false, false, true, false], 'enterReason');
                }
                if (controls.enterReasonField.value !== "" && controls.enterReasonField.invalid) {
                    this.resetForm([false, false, false, false, false, false, false, true], 'enterReason');
                }
            }
        }
    }
    getErrorMessage(isErrorExist, status, errorMsg, err) {
        let bodyTxt = 'Please try again later';
        if (status !== 500) {
            if (errorMsg !== undefined) {
                bodyTxt = errorMsg;
            }
            else {
                bodyTxt = err;
            }
        }
        return {
            title: 'Something went wrong',
            body: bodyTxt,
            showError: isErrorExist
        };
    }
    loadRefundListPage() {
        this.OrderslistService.getnavigationPageValue().subscribe((data) => this.navigationpage = data);
        if (this.navigationpage === 'casetransactions') {
            // window.location.href='/refund-list?takePayment=false&refundlist=true';
            // // this.OrderslistService.setnavigationPage('casetransactions');
            // // this.OrderslistService.setisFromServiceRequestPage(false);
            // // this.paymentLibComponent.VIEW ='case-transactions';
            // // this.paymentLibComponent.viewName = 'case-transactions';
            // // this.paymentLibComponent.ISBSENABLE = true;
            // // this.paymentLibComponent.isRefundStatusView = false;
            this.paymentLibComponent.viewName = 'refundstatuslist';
            this.paymentLibComponent.isRefundStatusView = true;
        }
        else {
            this.paymentLibComponent.viewName = 'refundstatuslist';
            this.paymentLibComponent.isRefundStatusView = true;
        }
    }
    loadRefundsHomePage() {
        if (typeof this.paymentLibComponent.TAKEPAYMENT === 'string' && this.paymentLibComponent.TAKEPAYMENT === 'false') {
            //window.location.href='/refund-list?takePayment=false&refundlist=true';
            this.paymentLibComponent.viewName = 'refund-list';
        }
        else {
            this.OrderslistService.setnavigationPage('casetransactions');
            this.OrderslistService.setisFromServiceRequestPage(false);
            this.paymentLibComponent.VIEW = 'case-transactions';
            this.paymentLibComponent.viewName = 'case-transactions';
            this.paymentLibComponent.ISBSENABLE = true;
            this.paymentLibComponent.isRefundStatusView = false;
        }
    }
    redirecttoRefundListPage() {
        if ((typeof this.paymentLibComponent.TAKEPAYMENT === 'string' && this.paymentLibComponent.TAKEPAYMENT === 'false') || (typeof this.paymentLibComponent.TAKEPAYMENT === 'boolean' && !this.paymentLibComponent.TAKEPAYMENT)) {
            // window.location.href='/refund-list?takePayment=false&refundlist=true';
            this.paymentLibComponent.viewName = 'refund-list';
        }
        else {
            this.loadRefundListPage();
        }
    }
    loadCaseTransactionPage() {
        this.OrderslistService.setnavigationPage('casetransactions');
        this.OrderslistService.setisFromServiceRequestPage(false);
        this.paymentLibComponent.viewName = 'case-transactions';
        this.paymentLibComponent.ISBSENABLE = true;
        this.paymentLibComponent.isRefundStatusView = false;
    }
    resetForm(vals, field) {
        if (field === 'action' || field === 'all') {
            this.refundActionsHasError = vals[0];
        }
        if (field === 'rejectReason' || field === 'all') {
            this.refundRejectReasonHasError = vals[1];
        }
        if (field === 'addAreason' || field === 'all') {
            this.isReasonFieldEmpty = vals[2];
            this.isReasonFieldInvalid = vals[3];
            this.reasonFieldMinHasError = vals[4];
            this.reasonFieldMaxHasError = vals[5];
        }
        if (field === 'enterReason' || field === 'all') {
            this.isReasonEmpty = vals[6];
            this.isReasonInvalid = vals[7];
        }
    }
    goToCaseReview() {
        const isPayBubble = this.paymentLibComponent.isFromPayBubble;
        if (isPayBubble) {
            this.loadCaseTransactionPage();
        }
        else {
            this.router.navigate([`/cases/case-details/${this.ccdCaseNumber}`], { relativeTo: this.activeRoute });
        }
    }
    getTemplateInstructionType(payment, paymentReference) {
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
    showNotificationPreview() {
        this.notificationPreview = true;
    }
    hideNotificationPreview() {
        this.notificationPreview = false;
    }
    static ɵfac = function ProcessRefundComponent_Factory(t) { return new (t || ProcessRefundComponent)(i0.ɵɵdirectiveInject(i1.RefundsService), i0.ɵɵdirectiveInject(i2.PaymentViewService), i0.ɵɵdirectiveInject(i3.FormBuilder), i0.ɵɵdirectiveInject(i4.OrderslistService), i0.ɵɵdirectiveInject(i5.NotificationService), i0.ɵɵdirectiveInject(i6.PaymentLibComponent), i0.ɵɵdirectiveInject(i7.Router), i0.ɵɵdirectiveInject(i7.ActivatedRoute)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProcessRefundComponent, selectors: [["ccpay-process-refund"]], inputs: { refundReference: "refundReference", refundlistsource: "refundlistsource" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "govuk-width-container"], ["id", "main-content", "role", "main", 1, "govuk-main-wrapper", "govuk-!-padding-top-0", 3, "ngClass"], [1, "payment-view-alignment"], [1, "govuk-grid-row"], [1, "column"], [1, "heading-large", "govuk-!-margin-top-0"], [1, "section"], [1, "bold", "tb-col-w"], ["colspan", "2"], ["class", "contactDetails-width font-size-19px", 4, "ngIf"], ["href", "Javascript:void(0)", "class", "govuk-link pointer right", 3, "click", 4, "ngIf"], [3, "paymentReference", "payment", "contactDetails", "refundReason", "refundAmount", "refundReference", "notificationPreviewEvent", 4, "ngIf"], [1, "process-refund__panel"], ["novalidate", "", 3, "formGroup"], [1, ""], ["aria-describedby", "sign-in-hint", 1, "govuk-fieldset"], [1, "govuk-fieldset__legend", "govuk-fieldset__legend--l"], [1, "heading-large"], [1, "govuk-radios", 3, "ngClass"], ["class", "inline-error-message", 4, "ngIf"], ["class", "govuk-radios__item", 4, "ngFor", "ngForOf"], [1, "govuk-radios__conditional", 3, "ngClass"], [1, "govuk-form-group"], ["for", "contact-by-text", 1, "govuk-label", "process-refund-font"], ["id", "sendmeback", "name", "sendMeBackField", "formControlName", "sendMeBackField", "rows", "5", 1, "govuk-textarea", "govuk-!-width-one-third", "reason-font", 3, "ngClass"], [3, "ngClass"], [1, "govuk-fieldset"], [1, "heading-medium"], ["id", "conditional-contact-3", 1, "govuk-radios__conditional", 3, "ngClass"], ["id", "otherReason", "formControlName", "enterReasonField", "name", "enterReasonField", "type", "text", 1, "govuk-input", "govuk-!-width-one-third", "reason-font", 3, "ngClass"], [1, "govuk-button-group"], [1, "govuk-button", "govuk-button--secondary", "marginright", 3, "click"], ["data-module", "govuk-button", 1, "govuk-button", "button", 3, "click"], ["class", "govuk-button-group margin", 4, "ngIf"], ["id", "main-content", "role", "main", 1, "govuk-main-wrapper", "govuk-main-wrapper--l", "success-page-padding--top25", 3, "ngClass"], [1, "govuk-grid-row", "pagesize"], [1, "govuk-panel", "govuk-panel-refund--confirmation"], [1, "heading-xlarge"], [1, "govuk-body", "process-refund-font"], ["href", "Javascript:void(0)", 1, "govuk-link", "pointer", 3, "click"], ["role", "group", "aria-labelledby", "failure-error-summary-heading", "tabindex", "-1", 1, "error-summary"], ["id", "failure-error-summary-heading", 1, "heading-medium", "error-summary-heading"], [1, "govuk-error-summary__body", "process-refund-font"], [1, "contactDetails-width", "font-size-19px"], ["href", "Javascript:void(0)", 1, "govuk-link", "pointer", "right", 3, "click"], [3, "paymentReference", "payment", "contactDetails", "refundReason", "refundAmount", "refundReference", "notificationPreviewEvent"], [1, "inline-error-message"], [1, "govuk-radios__item"], ["name", "refundActionField", "type", "radio", "formControlName", "refundActionField", 1, "govuk-radios__input", 3, "id", "value", "click"], [1, "govuk-label", "govuk-radios__label", "process-refund-font", 3, "for"], ["id", "sign-in-item-hint", 1, "govuk-hint", "govuk-radios__hint", "process-refund-font"], ["formControlName", "refundRejectReasonField", "name", "refundRejectReasonField", "type", "radio", 1, "govuk-radios__input", 3, "id", "value", "click"], [1, "govuk-button-group", "margin"], ["data-module", "govuk-button", 1, "govuk-link", "pointer", 3, "click"]], template: function ProcessRefundComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ProcessRefundComponent_ng_container_0_Template, 106, 63, "ng-container", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "RefundProcess");
        } }, dependencies: [i8.NgClass, i8.NgForOf, i8.NgIf, i3.ɵNgNoValidate, i3.DefaultValueAccessor, i3.RadioControlValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.FormGroupDirective, i3.FormControlName, i9.NotificationPreviewComponent, i8.CurrencyPipe, i8.DatePipe], styles: [".tb-col-w[_ngcontent-%COMP%]{width:330px}.tr-border[_ngcontent-%COMP%]{border-bottom:2px solid}.payment-view-alignment[_ngcontent-%COMP%]{margin-left:30px}.govuk-button[_ngcontent-%COMP%]{float:left!important;font-size:19px;margin-top:2em!important}.remission[_ngcontent-%COMP%]{margin-bottom:7em}.process-refund-font[_ngcontent-%COMP%]{font-size:19px!important}.govuk-radios__conditional--hidden[_ngcontent-%COMP%]{display:none}.inline-error-message[_ngcontent-%COMP%]{color:#c11717;font-weight:700;margin-top:10px;border-color:#c11717}.inline-error-class[_ngcontent-%COMP%]{outline:3px solid #c11717;outline-offset:0;border-color:#c11717}.form-group-error[_ngcontent-%COMP%]{border-left:5px solid #c11717;padding-left:15px}.govuk-panel-refund--confirmation[_ngcontent-%COMP%]{color:#fff;background:#00703c}.process-refund__panel[_ngcontent-%COMP%]{margin-left:25px;margin-top:30px}.button-margin--left25[_ngcontent-%COMP%]{margin-left:25px}.success-page-padding--top25[_ngcontent-%COMP%]{padding-top:25px}.margin[_ngcontent-%COMP%]{margin-top:5em}.marginright[_ngcontent-%COMP%]{margin-right:1.5em}.govuk-textarea[_ngcontent-%COMP%]{line-height:2.25}.reason-font[_ngcontent-%COMP%]{font-size:19px!important}.pointer[_ngcontent-%COMP%]{cursor:pointer}.right[_ngcontent-%COMP%]{float:right}.pagesize[_ngcontent-%COMP%]{margin:2em;width:97%}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProcessRefundComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-process-refund', template: "<ng-container *ngIf=\"viewStatus === 'RefundProcess'\">\n<div class=\"govuk-width-container\">\n\n  <main class=\"govuk-main-wrapper govuk-!-padding-top-0\" [ngClass]=\"{'govuk-radios__conditional--hidden': isSuccesspageEnable}\" id=\"main-content\" role=\"main\">\n    <div *ngIf=\"errorMessage.showError\">\n      <div class=\"error-summary\" role=\"group\" aria-labelledby=\"failure-error-summary-heading\" tabindex=\"-1\">\n        <h2 class=\"heading-medium error-summary-heading\" id=\"failure-error-summary-heading\">\n          {{errorMessage.title}}\n        </h2>\n        <div class=\"govuk-error-summary__body process-refund-font\">\n          {{errorMessage.body}}\n        </div>\n      </div>\n    </div>\n\n    <div class=\"payment-view-alignment\">\n\n      <div class=\"govuk-grid-row\">\n        <div class=\"column\">\n          <h1 class=\"heading-large govuk-!-margin-top-0\">Review refund details</h1>\n        </div>\n      </div>\n      <table>\n        <tbody>\n\n        <tr class=\"section\">\n          <td class=\"bold tb-col-w\">Payment to be refunded</td>\n          <td colspan=\"2\">{{refundlistsource?.refund_reference}} ({{refundlistsource.amount  | currency :'GBP':'symbol':'1.2-2'  }})</td>\n        </tr>\n        <tr class=\"section\">\n          <td class=\"bold tb-col-w\">Reason for refund</td>\n          <td colspan=\"2\">{{refundlistsource?.reason?.trim()}}</td>\n        </tr>\n        <tr class=\"section\">\n            <td class=\"bold tb-col-w\">Amount to be refunded</td>\n            <td colspan=\"2\">{{refundlistsource?.amount | currency :'GBP':'symbol':'1.2-2' }}</td>\n        </tr>\n        <tr class=\"section\">\n          <td class=\"bold tb-col-w\">Sent to</td>\n          <td colspan=\"2\">{{cpoDetails?.responsibleParty}}</td>\n        </tr>\n        <tr class=\"section\">\n          <td class=\"bold tb-col-w\">Sent via</td>\n          <td colspan=\"2\">\n          <div *ngIf=\"refundlistsource?.contact_details?.notification_type === 'EMAIL'\" class=\"contactDetails-width font-size-19px\">\n            <strong>Email</strong>\n            <br/>\n            {{refundlistsource?.contact_details?.email?.trim()}}\n          </div>\n          <div *ngIf=\"refundlistsource?.contact_details?.notification_type === 'LETTER'\" class=\"contactDetails-width font-size-19px\">\n            <strong>Post</strong>\n            <br/>\n            {{refundlistsource?.contact_details?.address_line?.trim()}} {{refundlistsource?.contact_details?.city?.trim()}} {{refundlistsource?.contact_details?.county?.trim()}} {{refundlistsource?.contact_details?.country?.trim()}} {{refundlistsource?.contact_details?.postal_code?.trim()}}\n          </div> \n          </td>\n        </tr>\n        <tr class=\"section\">\n            <td class=\"bold tb-col-w\">Submitted by</td>\n            <td colspan=\"2\">{{refundlistsource?.user_full_name}}</td>\n\n        </tr>\n        <tr class=\"section\">\n            <td class=\"bold tb-col-w\">Date submitted</td>\n            <td colspan=\"2\">{{refundlistsource?.date_created | date:'d MMMM yyyy' }}</td>\n        </tr>\n        <tr class=\"section\">\n          <td class=\"bold tb-col-w\">Notification</td>\n          <td>{{templateInstructionType}}</td>\n          <td>\n            <a *ngIf=\"!notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link pointer right\" (click)=\"showNotificationPreview()\">\n              Preview\n            </a>\n            <a *ngIf=\"notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link pointer right\" (click)=\"hideNotificationPreview()\">\n              Hide Preview\n            </a>\n        </td>\n\n      </tr>\n\n        </tbody>\n      </table>\n\n      <app-notification-preview *ngIf=\"notificationPreview\" [paymentReference]=\"refundlistsource?.payment_reference\"\n        [payment]=\"paymentObj\"\n        [contactDetails]=\"refundlistsource?.contact_details\"\n        [refundReason]=\"refundlistsource?.reason_code\" [refundAmount]=\"refundlistsource?.amount\"\n        [refundReference]=\"refundlistsource?.refund_reference\"\n        (notificationPreviewEvent) = \"getNotificationPreviewObj($event)\">\n      </app-notification-preview>\n\n      <div>\n      </div>\n    </div>\n    <div class=\"process-refund__panel\">\n      <form [formGroup]=\"processRefundForm\" novalidate>\n        <div class=\"\">\n        <fieldset class=\"govuk-fieldset\" aria-describedby=\"sign-in-hint\">\n          <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--l\">\n            <h1 class=\"heading-large\">\n              What do you want to do with this refund?\n            </h1>\n          </legend>\n          <div class=\"govuk-radios\"  [ngClass]=\"{'form-group-error': refundActionsHasError}\">\n            <p class=\"inline-error-message\"\n            *ngIf=\"refundActionsHasError\">\n            <span *ngIf=\"refundActionsHasError\">Please select an action</span>\n          </p>\n            <div class=\"govuk-radios__item\" *ngFor=\"let refundAction of refundActionList; let i = index;\">\n              <input class=\"govuk-radios__input\" \n              id=\"refundAction-{{i}}\" \n              name=\"refundActionField\"\n              type=\"radio\"\n              formControlName=\"refundActionField\"\n              (click)=\"checkRefundActions(refundAction.code)\"\n                value=\"{{refundAction.code}}\">\n              <label class=\"govuk-label govuk-radios__label process-refund-font\" for=\"refundAction-{{i}}\">\n                {{refundAction.code}}\n              </label>\n              <div id=\"sign-in-item-hint\" class=\"govuk-hint govuk-radios__hint process-refund-font\">\n                {{refundAction.label}}\n              </div>\n            </div>\n            <div class=\"govuk-radios__conditional\" [ngClass]=\"{'govuk-radios__conditional--hidden': !isSendMeBackClicked}\">\n              <div class=\"govuk-form-group\">\n                <label class=\"govuk-label process-refund-font\" for=\"contact-by-text\">\n                  Add a reason\n                </label>\n                <p class=\"inline-error-message\"\n                *ngIf=\"isReasonFieldEmpty || isReasonFieldInvalid || reasonFieldMinHasError || reasonFieldMaxHasError\">\n                <span *ngIf=\"isReasonFieldEmpty\">Add a reason</span>\n                <span *ngIf=\"isReasonFieldInvalid\">Add a valid reason</span>\n                <span *ngIf=\"reasonFieldMinHasError\">Reason should be at least 3 characters.</span>\n                <span *ngIf=\"reasonFieldMaxHasError\">Reason should be 255 characters or under.</span>\n              </p>\n                <textarea class=\"govuk-textarea govuk-!-width-one-third reason-font\"\n                [ngClass]=\"{'inline-error-class': isReasonFieldEmpty || isReasonFieldInvalid || reasonFieldMinHasError || reasonFieldMaxHasError}\"\n                  id=\"sendmeback\"\n                  name=\"sendMeBackField\" \n                  formControlName=\"sendMeBackField\"\n                rows=\"5\"></textarea>\n              \n              </div>\n\n            </div>\n  \n          </div>\n      \n        </fieldset>\n      </div>\n\n      <div [ngClass]=\"{'govuk-radios__conditional--hidden': !isRejectClicked}\">\n        <fieldset class=\"govuk-fieldset\">\n          <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--l\">\n            <h2 class=\"heading-medium\">\n              Why are you rejecting this refund?\n            </h2>\n          </legend>\n          <div class=\"govuk-radios\" [ngClass]=\"{'form-group-error': refundRejectReasonHasError}\">\n            <p class=\"inline-error-message\"\n            *ngIf=\"refundRejectReasonHasError\">\n            <span *ngIf=\"refundRejectReasonHasError\">Please select a reject reason</span>\n          </p>\n            <div class=\"govuk-radios__item\" *ngFor=\"let refundRejectReason of refundRejectReasonList; let j = index;\">\n              <input class=\"govuk-radios__input\" \n              id=\"refundRejectReason-{{j}}\"\n              formControlName=\"refundRejectReasonField\"\n              name=\"refundRejectReasonField\"\n              (click)=\"checkRefundActions(refundRejectReason.code)\"\n              type=\"radio\" value=\"{{refundRejectReason.code}}\">\n              <label class=\"govuk-label govuk-radios__label process-refund-font\" for=\"refundRejectReason-{{j}}\">\n                {{refundRejectReason.name}}\n              </label>\n            </div>\n            </div>\n      <div class=\"govuk-radios__conditional\" [ngClass]=\"{'govuk-radios__conditional--hidden': !isOtherClicked}\" id=\"conditional-contact-3\">\n        <div class=\"govuk-form-group\">\n          <label class=\"govuk-label process-refund-font \" for=\"contact-by-text\">\n            Enter reason\n          </label>\n          <p class=\"inline-error-message\" *ngIf=\"isReasonEmpty || isReasonInvalid\">\n            <span *ngIf=\"isReasonEmpty\">Enter reason.</span>\n            <span *ngIf=\"isReasonInvalid\">Enter a valid reason</span>\n          </p>\n          <input class=\"govuk-input govuk-!-width-one-third reason-font\" id=\"otherReason\" \n          [ngClass]=\"{'inline-error-class': isReasonEmpty || isReasonInvalid}\"\n          formControlName=\"enterReasonField\" name=\"enterReasonField\" type=\"text\"></div>\n        \n      </div>\n      \n        </fieldset>\n      </div>\n\n      <div class=\"govuk-button-group\">\n        <button (click)=\"redirecttoRefundListPage()\" class=\"govuk-button govuk-button--secondary marginright\"> Previous</button>\n        <button (click)=\"processRefundSubmit()\" class=\"govuk-button button\"\n          data-module=\"govuk-button\">\n          Submit \n        </button>\n      <br/><br/>\n    </div>\n   \n  <div *ngIf=\"!isFromRefundListPage\" class=\"govuk-button-group margin\">\n\n  <p><a (click)=\"loadRefundsHomePage()\" class=\"govuk-link pointer\" data-module=\"govuk-button\">Cancel</a></p>\n</div>\n</form>\n  </div>\n \n\n  </main>\n \n  <main class=\"govuk-main-wrapper govuk-main-wrapper--l success-page-padding--top25\" [ngClass]=\"{'govuk-radios__conditional--hidden': !isSuccesspageEnable}\" id=\"main-content\" role=\"main\" >\n    <div class=\"govuk-grid-row pagesize\">\n        <div class=\"govuk-panel govuk-panel-refund--confirmation\">\n          <h1 class=\"heading-xlarge\">\n            {{successMsg}}\n          </h1>\n        </div>\n        <p class=\"govuk-body process-refund-font\">\n        <a href=\"Javascript:void(0)\" (click)=\"goToCaseReview()\" class=\"govuk-link pointer\">Return to case</a>\n        </p>\n      </div>\n  </main>\n</div>\n</ng-container>\n\n", styles: [".tb-col-w{width:330px}.tr-border{border-bottom:2px solid}.payment-view-alignment{margin-left:30px}.govuk-button{float:left!important;font-size:19px;margin-top:2em!important}.remission{margin-bottom:7em}.process-refund-font{font-size:19px!important}.govuk-radios__conditional--hidden{display:none}.inline-error-message{color:#c11717;font-weight:700;margin-top:10px;border-color:#c11717}.inline-error-class{outline:3px solid #c11717;outline-offset:0;border-color:#c11717}.form-group-error{border-left:5px solid #c11717;padding-left:15px}.govuk-panel-refund--confirmation{color:#fff;background:#00703c}.process-refund__panel{margin-left:25px;margin-top:30px}.button-margin--left25{margin-left:25px}.success-page-padding--top25{padding-top:25px}.margin{margin-top:5em}.marginright{margin-right:1.5em}.govuk-textarea{line-height:2.25}.reason-font{font-size:19px!important}.pointer{cursor:pointer}.right{float:right}.pagesize{margin:2em;width:97%}\n"] }]
    }], function () { return [{ type: i1.RefundsService }, { type: i2.PaymentViewService }, { type: i3.FormBuilder }, { type: i4.OrderslistService }, { type: i5.NotificationService }, { type: i6.PaymentLibComponent }, { type: i7.Router }, { type: i7.ActivatedRoute }]; }, { refundReference: [{
            type: Input
        }], refundlistsource: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy1yZWZ1bmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9jb21wb25lbnRzL3Byb2Nlc3MtcmVmdW5kL3Byb2Nlc3MtcmVmdW5kLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9wcm9jZXNzLXJlZnVuZC9wcm9jZXNzLXJlZnVuZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFhLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFLdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDdkYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBQyxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7O0lDUHBELDJCQUFvQyxjQUFBLGFBQUE7SUFHOUIsWUFDRjtJQUFBLGlCQUFLO0lBQ0wsK0JBQTJEO0lBQ3pELFlBQ0Y7SUFBQSxpQkFBTSxFQUFBLEVBQUE7OztJQUpKLGVBQ0Y7SUFERSwwREFDRjtJQUVFLGVBQ0Y7SUFERSx5REFDRjs7O0lBaUNFLCtCQUEwSCxhQUFBO0lBQ2hILHFCQUFLO0lBQUEsaUJBQVM7SUFDdEIscUJBQUs7SUFDTCxZQUNGO0lBQUEsaUJBQU07OztJQURKLGVBQ0Y7SUFERSxzUEFDRjs7O0lBQ0EsK0JBQTJILGFBQUE7SUFDakgsb0JBQUk7SUFBQSxpQkFBUztJQUNyQixxQkFBSztJQUNMLFlBQ0Y7SUFBQSxpQkFBTTs7O0lBREosZUFDRjtJQURFLG9vQ0FDRjs7OztJQWdCRSw2QkFBK0g7SUFBcEMsK0tBQVMsZUFBQSxpQ0FBeUIsQ0FBQSxJQUFDO0lBQzVILHlCQUNGO0lBQUEsaUJBQUk7Ozs7SUFDSiw2QkFBOEg7SUFBcEMsK0tBQVMsZUFBQSxpQ0FBeUIsQ0FBQSxJQUFDO0lBQzNILDhCQUNGO0lBQUEsaUJBQUk7Ozs7SUFRVixvREFLbUU7SUFBakUseVFBQThCLGVBQUEseUNBQWlDLENBQUEsSUFBQztJQUNsRSxpQkFBMkI7OztJQU4yQixxSEFBd0QsOEJBQUEsb0dBQUEsOEZBQUEseUZBQUEsc0dBQUE7OztJQXVCeEcsNEJBQW9DO0lBQUEsdUNBQXVCO0lBQUEsaUJBQU87OztJQUZsRSw2QkFDOEI7SUFDOUIsNkZBQWtFO0lBQ3BFLGlCQUFJOzs7SUFESyxlQUEyQjtJQUEzQixtREFBMkI7Ozs7SUFFbEMsK0JBQThGLGdCQUFBO0lBTTVGLHlQQUFTLGVBQUEsaURBQXFDLENBQUEsSUFBQztJQUwvQyxpQkFNZ0M7SUFDaEMsaUNBQTRGO0lBQzFGLFlBQ0Y7SUFBQSxpQkFBUTtJQUNSLCtCQUFzRjtJQUNwRixZQUNGO0lBQUEsaUJBQU0sRUFBQTs7OztJQVhOLGVBQXVCO0lBQXZCLDJEQUF1QjtJQUtyQix3REFBNkI7SUFDb0MsZUFBd0I7SUFBeEIsNERBQXdCO0lBQ3pGLGVBQ0Y7SUFERSxzREFDRjtJQUVFLGVBQ0Y7SUFERSx1REFDRjs7O0lBU0UsNEJBQWlDO0lBQUEsNEJBQVk7SUFBQSxpQkFBTzs7O0lBQ3BELDRCQUFtQztJQUFBLGtDQUFrQjtJQUFBLGlCQUFPOzs7SUFDNUQsNEJBQXFDO0lBQUEsdURBQXVDO0lBQUEsaUJBQU87OztJQUNuRiw0QkFBcUM7SUFBQSx5REFBeUM7SUFBQSxpQkFBTzs7O0lBTHJGLDZCQUN1RztJQUN2Ryw2RkFBb0Q7SUFDcEQsNkZBQTREO0lBQzVELDZGQUFtRjtJQUNuRiw2RkFBcUY7SUFDdkYsaUJBQUk7OztJQUpLLGVBQXdCO0lBQXhCLGdEQUF3QjtJQUN4QixlQUEwQjtJQUExQixrREFBMEI7SUFDMUIsZUFBNEI7SUFBNUIsb0RBQTRCO0lBQzVCLGVBQTRCO0lBQTVCLG9EQUE0Qjs7O0lBNEJ2Qyw0QkFBeUM7SUFBQSw2Q0FBNkI7SUFBQSxpQkFBTzs7O0lBRjdFLDZCQUNtQztJQUNuQyw2RkFBNkU7SUFDL0UsaUJBQUk7OztJQURLLGVBQWdDO0lBQWhDLHlEQUFnQzs7OztJQUV2QywrQkFBMEcsZ0JBQUE7SUFLeEcsK1BBQVMsZUFBQSx1REFBMkMsQ0FBQSxJQUFDO0lBSnJELGlCQUtpRDtJQUNqRCxpQ0FBa0c7SUFDaEcsWUFDRjtJQUFBLGlCQUFRLEVBQUE7Ozs7SUFQUixlQUE2QjtJQUE3QixpRUFBNkI7SUFJaEIsOERBQW1DO0lBQ21CLGVBQThCO0lBQTlCLGtFQUE4QjtJQUMvRixlQUNGO0lBREUsNERBQ0Y7OztJQVNGLDRCQUE0QjtJQUFBLDZCQUFhO0lBQUEsaUJBQU87OztJQUNoRCw0QkFBOEI7SUFBQSxvQ0FBb0I7SUFBQSxpQkFBTzs7O0lBRjNELDZCQUF5RTtJQUN2RSw2RkFBZ0Q7SUFDaEQsNkZBQXlEO0lBQzNELGlCQUFJOzs7SUFGSyxlQUFtQjtJQUFuQiw0Q0FBbUI7SUFDbkIsZUFBcUI7SUFBckIsOENBQXFCOzs7O0lBb0J0QywrQkFBcUUsUUFBQSxZQUFBO0lBRS9ELGlMQUFTLGVBQUEsNkJBQXFCLENBQUEsSUFBQztJQUF1RCxzQkFBTTtJQUFBLGlCQUFJLEVBQUEsRUFBQTs7Ozs7OztJQTNNeEcsNkJBQXFEO0lBQ3JELDhCQUFtQyxjQUFBO0lBRy9CLHNGQVNNO0lBRU4sOEJBQW9DLGFBQUEsYUFBQSxZQUFBO0lBSWlCLHFDQUFxQjtJQUFBLGlCQUFLLEVBQUEsRUFBQTtJQUc3RSw2QkFBTyxhQUFBLGFBQUEsYUFBQTtJQUl1Qix1Q0FBc0I7SUFBQSxpQkFBSztJQUNyRCw4QkFBZ0I7SUFBQSxhQUEwRzs7SUFBQSxpQkFBSyxFQUFBO0lBRWpJLDhCQUFvQixhQUFBO0lBQ1Esa0NBQWlCO0lBQUEsaUJBQUs7SUFDaEQsOEJBQWdCO0lBQUEsYUFBb0M7SUFBQSxpQkFBSyxFQUFBO0lBRTNELDhCQUFvQixhQUFBO0lBQ1Usc0NBQXFCO0lBQUEsaUJBQUs7SUFDcEQsOEJBQWdCO0lBQUEsYUFBZ0U7O0lBQUEsaUJBQUssRUFBQTtJQUV6Riw4QkFBb0IsYUFBQTtJQUNRLHdCQUFPO0lBQUEsaUJBQUs7SUFDdEMsOEJBQWdCO0lBQUEsYUFBZ0M7SUFBQSxpQkFBSyxFQUFBO0lBRXZELDhCQUFvQixhQUFBO0lBQ1EseUJBQVE7SUFBQSxpQkFBSztJQUN2Qyw4QkFBZ0I7SUFDaEIseUZBSU07SUFDTix5RkFJTTtJQUNOLGlCQUFLLEVBQUE7SUFFUCw4QkFBb0IsYUFBQTtJQUNVLDZCQUFZO0lBQUEsaUJBQUs7SUFDM0MsOEJBQWdCO0lBQUEsYUFBb0M7SUFBQSxpQkFBSyxFQUFBO0lBRzdELDhCQUFvQixhQUFBO0lBQ1UsK0JBQWM7SUFBQSxpQkFBSztJQUM3Qyw4QkFBZ0I7SUFBQSxhQUF3RDs7SUFBQSxpQkFBSyxFQUFBO0lBRWpGLDhCQUFvQixhQUFBO0lBQ1EsNkJBQVk7SUFBQSxpQkFBSztJQUMzQywyQkFBSTtJQUFBLGFBQTJCO0lBQUEsaUJBQUs7SUFDcEMsMkJBQUk7SUFDRixxRkFFSTtJQUNKLHFGQUVJO0lBQ1IsaUJBQUssRUFBQSxFQUFBLEVBQUE7SUFPUCxtSUFNMkI7SUFFM0IsdUJBQ007SUFDUixpQkFBTTtJQUNOLGdDQUFtQyxnQkFBQSxlQUFBLG9CQUFBLGtCQUFBLGNBQUE7SUFNekIsMkRBQ0Y7SUFBQSxpQkFBSyxFQUFBO0lBRVAsZ0NBQW1GO0lBQ2pGLHFGQUdFO0lBQ0YseUZBY007SUFDTixnQ0FBK0csZUFBQSxpQkFBQTtJQUd6RywrQkFDRjtJQUFBLGlCQUFRO0lBQ1IscUZBTUU7SUFDRixnQ0FLb0I7SUFFdEIsaUJBQU0sRUFBQSxFQUFBLEVBQUEsRUFBQTtJQVNkLGdDQUF5RSxvQkFBQSxrQkFBQSxjQUFBO0lBSWpFLHFEQUNGO0lBQUEsaUJBQUssRUFBQTtJQUVQLGdDQUF1RjtJQUNyRixxRkFHRTtJQUNGLHlGQVVNO0lBQ04saUJBQU07SUFDWixnQ0FBcUksZUFBQSxpQkFBQTtJQUcvSCwrQkFDRjtJQUFBLGlCQUFRO0lBQ1IscUZBR0k7SUFDSiw2QkFFdUU7SUFBQSxpQkFBTSxFQUFBLEVBQUEsRUFBQTtJQU9qRixnQ0FBZ0Msa0JBQUE7SUFDdEIsK0tBQVMsZUFBQSxrQ0FBMEIsQ0FBQSxJQUFDO0lBQTJELDBCQUFRO0lBQUEsaUJBQVM7SUFDeEgsbUNBQzZCO0lBRHJCLCtLQUFTLGVBQUEsNkJBQXFCLENBQUEsSUFBQztJQUVyQyx5QkFDRjtJQUFBLGlCQUFTO0lBQ1gsc0JBQUssVUFBQTtJQUNQLGlCQUFNO0lBRVIseUZBR0k7SUFDTixpQkFBTyxFQUFBLEVBQUE7SUFNTCxpQ0FBMEwsZUFBQSxnQkFBQSxlQUFBO0lBSWhMLGNBQ0Y7SUFBQSxpQkFBSyxFQUFBO0lBRVAsK0JBQTBDLGNBQUE7SUFDYiwyS0FBUyxlQUFBLHdCQUFnQixDQUFBLElBQUM7SUFBNEIsZ0NBQWM7SUFBQSxpQkFBSSxFQUFBLEVBQUEsRUFBQSxFQUFBO0lBSzdHLDBCQUFlOzs7SUE3TjBDLGVBQXNFO0lBQXRFLGlGQUFzRTtJQUNySCxlQUE0QjtJQUE1QixvREFBNEI7SUF1QlosZ0JBQTBHO0lBQTFHLHlNQUEwRztJQUkxRyxlQUFvQztJQUFwQyxvSkFBb0M7SUFJbEMsZUFBZ0U7SUFBaEUsK0lBQWdFO0lBSWxFLGVBQWdDO0lBQWhDLDJGQUFnQztJQUsxQyxlQUFzRTtJQUF0RSxnTUFBc0U7SUFLdEUsZUFBdUU7SUFBdkUsaU1BQXVFO0lBUzNELGVBQW9DO0lBQXBDLHFHQUFvQztJQUtwQyxlQUF3RDtJQUF4RCwwSUFBd0Q7SUFJdEUsZUFBMkI7SUFBM0Isb0RBQTJCO0lBRXpCLGVBQTBCO0lBQTFCLGtEQUEwQjtJQUcxQixlQUF5QjtJQUF6QixpREFBeUI7SUFVUixlQUF5QjtJQUF6QixpREFBeUI7SUFZOUMsZUFBK0I7SUFBL0Isb0RBQStCO0lBUU4sZUFBdUQ7SUFBdkQsbUZBQXVEO0lBRS9FLGVBQTJCO0lBQTNCLG1EQUEyQjtJQUc2QixlQUFxQjtJQUFyQixpREFBcUI7SUFldkMsZUFBdUU7SUFBdkUsa0ZBQXVFO0lBTXpHLGVBQW9HO0lBQXBHLGlKQUFvRztJQU9yRyxlQUFrSTtJQUFsSSxpTEFBa0k7SUFldkksZUFBbUU7SUFBbkUsOEVBQW1FO0lBTzFDLGVBQTREO0lBQTVELHdGQUE0RDtJQUVuRixlQUFnQztJQUFoQyx3REFBZ0M7SUFHOEIsZUFBMkI7SUFBM0IsdURBQTJCO0lBWXpELGVBQWtFO0lBQWxFLDZFQUFrRTtJQUtwRSxlQUFzQztJQUF0QyxxRUFBc0M7SUFLdkUsZUFBb0U7SUFBcEUscUdBQW9FO0lBaUJ0RSxlQUEyQjtJQUEzQixtREFBMkI7SUFVa0QsZUFBdUU7SUFBdkUsa0ZBQXVFO0lBSWhKLGVBQ0Y7SUFERSxrREFDRjs7QURyTVYsTUFBTSxPQUFPLHNCQUFzQjtJQW1DYjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBekNYLGVBQWUsQ0FBUztJQUN4QixnQkFBZ0IsQ0FBYztJQUV2QyxpQkFBaUIsQ0FBWTtJQUU3QixZQUFZLEdBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4RCxVQUFVLEdBQVcsSUFBSSxDQUFDO0lBQzFCLFVBQVUsQ0FBUztJQUNuQixnQkFBZ0IsR0FBb0IsRUFBRSxDQUFDO0lBQ3ZDLHNCQUFzQixHQUEwQixFQUFFLENBQUM7SUFDbkQsbUJBQW1CLEdBQVksS0FBSyxDQUFDO0lBQ3JDLGVBQWUsR0FBWSxLQUFLLENBQUM7SUFDakMsY0FBYyxHQUFZLEtBQUssQ0FBQztJQUNoQyxtQkFBbUIsR0FBWSxLQUFLLENBQUM7SUFFckMscUJBQXFCLEdBQVksS0FBSyxDQUFDO0lBQ3ZDLDBCQUEwQixHQUFZLEtBQUssQ0FBQztJQUM1QyxrQkFBa0IsR0FBWSxLQUFLLENBQUM7SUFDcEMsb0JBQW9CLEdBQVksS0FBSyxDQUFDO0lBQ3RDLHNCQUFzQixHQUFZLEtBQUssQ0FBQztJQUN4QyxzQkFBc0IsR0FBWSxLQUFLLENBQUM7SUFDeEMsYUFBYSxHQUFZLEtBQUssQ0FBQztJQUMvQixlQUFlLEdBQVksS0FBSyxDQUFDO0lBQ2pDLFVBQVUsR0FBVyxJQUFJLENBQUM7SUFDMUIsY0FBYyxDQUFTO0lBQ3ZCLGFBQWEsQ0FBUztJQUN0QixvQkFBb0IsQ0FBVTtJQUM5QixVQUFVLEdBQU8sSUFBSSxDQUFDO0lBQ3RCLFNBQVMsQ0FBVTtJQUNuQix1QkFBdUIsR0FBWSxJQUFJLENBQUM7SUFDeEMsVUFBVSxDQUFXO0lBQ3JCLHVCQUF1QixDQUFTO0lBQ2hDLG1CQUFtQixHQUFZLEtBQUssQ0FBQztJQUNyQyxzQkFBc0IsQ0FBdUI7SUFDN0MsWUFBb0IsY0FBOEIsRUFDOUIsa0JBQXNDLEVBQ3RDLFdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxtQkFBd0MsRUFDeEMsbUJBQXdDLEVBQ3hDLE1BQWMsRUFDZCxXQUEyQjtRQVAzQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO0lBQy9DLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxDQUNsRSxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBUSxnQkFBZ0IsQ0FBQztRQUNoRCxDQUFDLEVBQ0QsR0FBRyxDQUFDLEVBQUU7WUFDSixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvRSxDQUFDLENBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUM5QyxpQkFBaUIsRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDeEQsVUFBVSxDQUFDLFFBQVE7YUFDcEIsQ0FBQyxDQUFDO1lBQ0gsdUJBQXVCLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0JBQzlELFVBQVUsQ0FBQyxRQUFRO2FBQ3BCLENBQUMsQ0FBQztZQUNILGVBQWUsRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDdEQsVUFBVSxDQUFDLFFBQVE7Z0JBQ25CLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztnQkFDekIsVUFBVSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQzthQUU5QyxDQUFDLENBQUM7WUFDSCxnQkFBZ0IsRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDdkQsVUFBVSxDQUFDLFFBQVE7Z0JBQ25CLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO2dCQUN4QixVQUFVLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO2FBQzNDLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQztRQUUzRCxJQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsRUFBRztZQUMzTixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUNwRSxRQUFRLENBQUMsRUFBRTtZQUNULElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEQsQ0FBQyxFQUNELENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDYixJQUFJLENBQUMsWUFBWSxHQUFRLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVELGtCQUFrQixDQUFDLElBQVk7UUFDN0IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUM7UUFDeEMsSUFBRyxJQUFJLEtBQUssc0JBQXNCLEVBQUU7WUFDbEMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztZQUNwQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBRTdCO2FBQU0sSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzdCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFDakMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztZQUNyQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztTQUU3QjthQUFNLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUM1QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxTQUFTLENBQ3BELHNCQUFzQixDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxzQkFBc0IsR0FBUSxzQkFBc0IsQ0FBQztZQUM1RCxDQUFDLEVBQ0QsR0FBRyxDQUFDLEVBQUU7Z0JBQ0osSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDL0UsQ0FBQyxDQUNGLENBQUM7U0FDSDthQUFNLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM1QjthQUFNLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFRCx5QkFBeUIsQ0FBQyxzQkFBNkM7UUFDckUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO0lBQ3ZELENBQUM7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxvQkFBb0IsQ0FBQztRQUN6QixJQUFJLE1BQU0sQ0FBQztRQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEYsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztRQUNqRCxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBRXpELElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSztlQUMvRCxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLElBQUksU0FBUzttQkFDOUMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsdUJBQXVCLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDO21CQUM3SSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLElBQUksT0FBTyxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7bUJBQ3RJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEtBQUssSUFBSSxzQkFBc0IsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDcEcsSUFBSSxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBQztnQkFDakQsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDbkIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7b0JBQy9CLG9CQUFvQixHQUFHO3dCQUNyQixJQUFJLEVBQUUsRUFBRTt3QkFDUixNQUFNLEVBQUUsRUFBRTt3QkFDVixnQkFBZ0IsRUFBRTs0QkFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJOzRCQUN0QyxJQUFJLEVBQUU7Z0NBQ0osa0JBQWtCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxrQkFBa0I7Z0NBQ3ZFLGlCQUFpQixFQUFFO29DQUNqQixZQUFZLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZO29DQUM3RSxJQUFJLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJO29DQUM3RCxPQUFPLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPO29DQUNuRSxNQUFNLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNO29DQUNqRSxXQUFXLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXO2lDQUM1RTs2QkFDRjs0QkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUk7NEJBQ3RDLEVBQUUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVzs0QkFDM0MsT0FBTyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPOzRCQUM1QyxhQUFhLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWE7NEJBQ3hELE9BQU8sRUFBRSxDQUFDO3lCQUNYO3FCQUNGLENBQUM7aUJBRUg7cUJBQU07b0JBQ0wsb0JBQW9CLEdBQUc7d0JBQ3JCLElBQUksRUFBRSxFQUFFO3dCQUNSLE1BQU0sRUFBRSxFQUFFO3FCQUNYLENBQUM7aUJBQ0g7YUFDRjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUN4RCxNQUFNLEdBQUcsUUFBUSxDQUFDO2dCQUVsQixJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtvQkFDL0Isb0JBQW9CLEdBQUc7d0JBQ3JCLElBQUksRUFBRSxRQUFRLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUMxRixNQUFNLEVBQUUsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ2hHLGdCQUFnQixFQUFFOzRCQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUk7NEJBQ3RDLElBQUksRUFBRTtnQ0FDSixrQkFBa0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGtCQUFrQjtnQ0FDdkUsaUJBQWlCLEVBQUU7b0NBQ2pCLFlBQVksRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVk7b0NBQzdFLElBQUksRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUk7b0NBQzdELE9BQU8sRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU87b0NBQ25FLE1BQU0sRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU07b0NBQ2pFLFdBQVcsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVc7aUNBQzVFOzZCQUNGOzRCQUNELElBQUksRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSTs0QkFDdEMsRUFBRSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXOzRCQUMzQyxPQUFPLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU87NEJBQzVDLGFBQWEsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYTs0QkFDeEQsT0FBTyxFQUFFLENBQUM7eUJBQ1g7cUJBQ0YsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxvQkFBb0IsR0FBRzt3QkFDckIsSUFBSSxFQUFFLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQzFGLE1BQU0sRUFBRSxRQUFRLENBQUMsdUJBQXVCLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtxQkFDakcsQ0FBQztpQkFDSDthQUdGO2lCQUFNLElBQUksUUFBUSxDQUFDLGlCQUFpQixDQUFDLEtBQUssS0FBSyxzQkFBc0IsRUFBRTtnQkFDdEUsTUFBTSxHQUFHLFVBQVUsQ0FBQztnQkFFcEIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7b0JBQy9CLG9CQUFvQixHQUFHO3dCQUNyQixJQUFJLEVBQUUsRUFBRTt3QkFDUixNQUFNLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLO3dCQUN0QyxnQkFBZ0IsRUFBRTs0QkFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJOzRCQUN0QyxJQUFJLEVBQUU7Z0NBQ0osa0JBQWtCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxrQkFBa0I7Z0NBQ3ZFLGlCQUFpQixFQUFFO29DQUNqQixZQUFZLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZO29DQUM3RSxJQUFJLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJO29DQUM3RCxPQUFPLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPO29DQUNuRSxNQUFNLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNO29DQUNqRSxXQUFXLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXO2lDQUM1RTs2QkFDRjs0QkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUk7NEJBQ3RDLEVBQUUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVzs0QkFDM0MsT0FBTyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPOzRCQUM1QyxhQUFhLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWE7NEJBQ3hELE9BQU8sRUFBRSxDQUFDO3lCQUNYO3FCQUNGLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsb0JBQW9CLEdBQUc7d0JBQ3JCLElBQUksRUFBRSxFQUFFO3dCQUNSLE1BQU0sRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUs7cUJBQ3ZDLENBQUM7aUJBRUg7YUFHRjtZQUNELElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ2xHLFFBQVEsQ0FBQyxFQUFFO2dCQUNULElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7Z0JBQ2hDLGtEQUFrRDtnQkFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNuRCxDQUFDLEVBQ0QsR0FBRyxDQUFDLEVBQUU7Z0JBQ0osSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDL0UsQ0FBQyxDQUNGLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBRyxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNuRjtZQUNELElBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEtBQUssSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLHVCQUF1QixDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUU7Z0JBQy9GLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7YUFDekY7WUFDRCxJQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLElBQUksc0JBQXNCLEVBQUU7Z0JBQzdELElBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFHO29CQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO2lCQUN2RjtnQkFDRCxJQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRztvQkFDNUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztpQkFDdkY7Z0JBQ0QsSUFBRyxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLElBQUksZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUc7b0JBQ2pHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7aUJBQ3ZGO2dCQUNELElBQUcsZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsU0FBUyxJQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxFQUFHO29CQUNuRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO2lCQUN2RjthQUNGO1lBQ0QsSUFBRyxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsdUJBQXVCLENBQUMsS0FBSyxJQUFJLE9BQU8sRUFBRTtnQkFDcEcsSUFBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtvQkFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztpQkFDeEY7Z0JBQ0QsSUFBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxLQUFJLEVBQUUsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO29CQUM3RSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2lCQUN4RjthQUNGO1NBQ0Y7SUFFSCxDQUFDO0lBQ0QsZUFBZSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUc7UUFDakQsSUFBSSxPQUFPLEdBQUcsd0JBQXdCLENBQUM7UUFDdkMsSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO1lBQ2xCLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDMUIsT0FBTyxHQUFHLFFBQVEsQ0FBQzthQUNwQjtpQkFBTTtnQkFDTCxPQUFPLEdBQUcsR0FBRyxDQUFDO2FBQ2Y7U0FFRjtRQUNELE9BQU87WUFDTCxLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLElBQUksRUFBRSxPQUFPO1lBQ2IsU0FBUyxFQUFFLFlBQVk7U0FDeEIsQ0FBQztJQUNKLENBQUM7SUFDRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2hHLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxrQkFBa0IsRUFBRTtZQUM5Qyx5RUFBeUU7WUFDekUsbUVBQW1FO1lBQ25FLGdFQUFnRTtZQUNoRSx5REFBeUQ7WUFDekQsOERBQThEO1lBQzlELGlEQUFpRDtZQUNqRCwwREFBMEQ7WUFDMUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQztZQUN2RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQ3BEO2FBQU07WUFDTCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDO1lBQ3ZELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDcEQ7SUFDSCxDQUFDO0lBQ0QsbUJBQW1CO1FBQ2pCLElBQUcsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxLQUFLLE9BQU8sRUFBRTtZQUMvRyx3RUFBd0U7WUFDeEUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7U0FDbEQ7YUFDSTtZQUNKLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxpQkFBaUIsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxHQUFFLG1CQUFtQixDQUFDO1lBQ25ELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEdBQUcsbUJBQW1CLENBQUM7WUFDeEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDM0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztTQUNwRDtJQUNKLENBQUM7SUFDRix3QkFBd0I7UUFDdEIsSUFBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsS0FBSyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLEVBQUc7WUFDNU4seUVBQXlFO1lBQ3pFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDO1NBQ2pEO2FBQ0k7WUFDSixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMxQjtJQUNGLENBQUM7SUFDRCx1QkFBdUI7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEdBQUcsbUJBQW1CLENBQUM7UUFDeEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDM0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUN0RCxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLO1FBQ25CLElBQUcsS0FBSyxLQUFHLFFBQVEsSUFBSSxLQUFLLEtBQUcsS0FBSyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEM7UUFDRCxJQUFHLEtBQUssS0FBRyxjQUFjLElBQUksS0FBSyxLQUFHLEtBQUssRUFBRTtZQUMxQyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsSUFBRyxLQUFLLEtBQUcsWUFBWSxJQUFJLEtBQUssS0FBRyxLQUFLLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QztRQUNELElBQUcsS0FBSyxLQUFHLGFBQWEsSUFBSSxLQUFLLEtBQUcsS0FBSyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztJQUVELGNBQWM7UUFDWixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDO1FBQzdELElBQUcsV0FBVyxFQUFFO1lBQ2QsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsdUJBQXVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDO1NBQ3JHO0lBQ0gsQ0FBQztJQUVELDBCQUEwQixDQUFDLE9BQWlCLEVBQUUsZ0JBQXdCO1FBRXBFLElBQUksT0FBTyxJQUFJLFNBQVMsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksZ0JBQWdCLEVBQUU7WUFFcEYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxDQUNuRSxPQUFPLENBQUMsRUFBRTtnQkFDUixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUM7Z0JBQzdDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxSSxDQUFDLEVBQ0QsQ0FBQyxLQUFVLEVBQUUsRUFBRTtnQkFDYixJQUFJLENBQUMsdUJBQXVCLEdBQUcsVUFBVSxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFBO1NBQ0w7YUFBTTtZQUNMLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsOEJBQThCLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekg7SUFDSCxDQUFDO0lBRUQsdUJBQXVCO1FBQ3JCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUVELHVCQUF1QjtRQUNyQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7Z0ZBdFpVLHNCQUFzQjs2REFBdEIsc0JBQXNCO1lDbkJuQyw0RkFnT2U7O1lBaE9BLHlEQUFvQzs7O3VGRG1CdEMsc0JBQXNCO2NBTGxDLFNBQVM7MkJBQ0Usc0JBQXNCO2tSQUt2QixlQUFlO2tCQUF2QixLQUFLO1lBQ0csZ0JBQWdCO2tCQUF4QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1JlZnVuZHNTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWZ1bmRzL3JlZnVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBJUmVmdW5kQWN0aW9uIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUmVmdW5kQWN0aW9uJztcbmltcG9ydCB7IElSZWZ1bmRMaXN0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUmVmdW5kTGlzdCc7XG5pbXBvcnQgeyBJUGF5bWVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVBheW1lbnQnO1xuaW1wb3J0IHsgSVJlZnVuZFJlamVjdFJlYXNvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVJlZnVuZFJlamVjdFJlYXNvbic7XG5pbXBvcnQgeyBPcmRlcnNsaXN0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29yZGVyc2xpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFBheW1lbnRWaWV3U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BheW1lbnQtdmlldy9wYXltZW50LXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBQYXltZW50TGliQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcGF5bWVudC1saWIuY29tcG9uZW50JztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJTm90aWZpY2F0aW9uUHJldmlldyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSU5vdGlmaWNhdGlvblByZXZpZXcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY3BheS1wcm9jZXNzLXJlZnVuZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9jZXNzLXJlZnVuZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Byb2Nlc3MtcmVmdW5kLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9jZXNzUmVmdW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcmVmdW5kUmVmZXJlbmNlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJlZnVuZGxpc3Rzb3VyY2U6IElSZWZ1bmRMaXN0O1xuXG4gIHByb2Nlc3NSZWZ1bmRGb3JtOiBGb3JtR3JvdXA7XG5cbiAgZXJyb3JNZXNzYWdlID0gIHRoaXMuZ2V0RXJyb3JNZXNzYWdlKGZhbHNlLCAnJywgJycsICcnKTtcbiAgc2VuZG1lYmFjazogc3RyaW5nID0gbnVsbDtcbiAgdmlld1N0YXR1czogc3RyaW5nO1xuICByZWZ1bmRBY3Rpb25MaXN0OiBJUmVmdW5kQWN0aW9uW10gPSBbXTsgXG4gIHJlZnVuZFJlamVjdFJlYXNvbkxpc3Q6IElSZWZ1bmRSZWplY3RSZWFzb25bXSA9IFtdOyBcbiAgaXNTZW5kTWVCYWNrQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1JlamVjdENsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNPdGhlckNsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNTdWNjZXNzcGFnZUVuYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHJlZnVuZEFjdGlvbnNIYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICByZWZ1bmRSZWplY3RSZWFzb25IYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1JlYXNvbkZpZWxkRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNSZWFzb25GaWVsZEludmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVhc29uRmllbGRNaW5IYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICByZWFzb25GaWVsZE1heEhhc0Vycm9yOiBib29sZWFuID0gZmFsc2U7XG4gIGlzUmVhc29uRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNSZWFzb25JbnZhbGlkOiBib29sZWFuID0gZmFsc2U7XG4gIHN1Y2Nlc3NNc2c6IHN0cmluZyA9IG51bGw7XG4gIG5hdmlnYXRpb25wYWdlOiBzdHJpbmc7XG4gIGNjZENhc2VOdW1iZXI6IHN0cmluZztcbiAgaXNGcm9tUmVmdW5kTGlzdFBhZ2U6IGJvb2xlYW47XG4gIGNwb0RldGFpbHM6YW55ID0gbnVsbDtcbiAgaXNDUE9Eb3duOiBib29sZWFuO1xuICBpc0NvbmZpcm1CdXR0b25kaXNhYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIHBheW1lbnRPYmo6IElQYXltZW50O1xuICB0ZW1wbGF0ZUluc3RydWN0aW9uVHlwZTogc3RyaW5nO1xuICBub3RpZmljYXRpb25QcmV2aWV3OiBib29sZWFuID0gZmFsc2U7XG4gIG5vdGlmaWNhdGlvblByZXZpZXdPYmo6IElOb3RpZmljYXRpb25QcmV2aWV3O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIFJlZnVuZHNTZXJ2aWNlOiBSZWZ1bmRzU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwYXltZW50Vmlld1NlcnZpY2U6IFBheW1lbnRWaWV3U2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgT3JkZXJzbGlzdFNlcnZpY2U6IE9yZGVyc2xpc3RTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgcGF5bWVudExpYkNvbXBvbmVudDogUGF5bWVudExpYkNvbXBvbmVudCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICdSZWZ1bmRQcm9jZXNzJztcbiAgICB0aGlzLlJlZnVuZHNTZXJ2aWNlLmdldFJlZnVuZEFjdGlvbnModGhpcy5yZWZ1bmRSZWZlcmVuY2UpLnN1YnNjcmliZShcbiAgICAgIHJlZnVuZEFjdGlvbkxpc3QgPT4ge1xuICAgICAgICB0aGlzLnJlZnVuZEFjdGlvbkxpc3QgPSA8YW55PnJlZnVuZEFjdGlvbkxpc3Q7XG4gICAgICB9LFxuICAgICAgZXJyID0+IHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmdldEVycm9yTWVzc2FnZSh0cnVlLCBlcnIuc3RhdHVzQ29kZSwgZXJyLmVyciwgZXJyKTtcbiAgICAgIH1cbiAgICApO1xuICAgIHRoaXMucHJvY2Vzc1JlZnVuZEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHJlZnVuZEFjdGlvbkZpZWxkOiBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWRcbiAgICAgIF0pKSxcbiAgICAgIHJlZnVuZFJlamVjdFJlYXNvbkZpZWxkOiBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWRcbiAgICAgIF0pKSxcbiAgICAgIHNlbmRNZUJhY2tGaWVsZDogbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBWYWxpZGF0b3JzLm1pbkxlbmd0aCgzKSxcbiAgICAgICAgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMjU1KSxcbiAgICAgICAgVmFsaWRhdG9ycy5wYXR0ZXJuKCdeKFthLXpBLVowLTlcXFxccyxcXFxcLl0qKSQnKSxcblxuICAgICAgXSkpLFxuICAgICAgZW50ZXJSZWFzb25GaWVsZDogbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBWYWxpZGF0b3JzLm1heExlbmd0aCgzMCksXG4gICAgICAgIFZhbGlkYXRvcnMucGF0dGVybignXihbYS16QS1aMC05LlxcXFxzXSopJCcpLFxuICAgICAgXSkpLFxuICAgIH0pO1xuICAgdGhpcy5jY2RDYXNlTnVtYmVyID0gdGhpcy5yZWZ1bmRsaXN0c291cmNlLmNjZF9jYXNlX251bWJlcjtcblxuICAgaWYoKHR5cGVvZiB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPT09ICdzdHJpbmcnICYmIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5UQUtFUEFZTUVOVCA9PT0gJ2ZhbHNlJykgfHwgKHR5cGVvZiB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPT09ICdib29sZWFuJyAmJiAhdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlRBS0VQQVlNRU5UKSApIHtcbiAgICB0aGlzLmlzRnJvbVJlZnVuZExpc3RQYWdlID0gdHJ1ZTtcbiAgIH1cbiAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLmdldFBhcnR5RGV0YWlscyh0aGlzLmNjZENhc2VOdW1iZXIpLnN1YnNjcmliZShcbiAgICByZXNwb25zZSA9PiB7XG4gICAgICB0aGlzLmNwb0RldGFpbHMgPSBKU09OLnBhcnNlKHJlc3BvbnNlKS5jb250ZW50WzBdO1xuXG4gICAgfSxcbiAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8YW55PmVycm9yLnJlcGxhY2UoL1wiL2csXCJcIik7XG4gICAgICB0aGlzLmlzQ1BPRG93biA9IHRydWU7XG4gICAgfVxuICApO1xuICB0aGlzLmdldFRlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlKHRoaXMucGF5bWVudE9iaix0aGlzLnJlZnVuZGxpc3Rzb3VyY2UucGF5bWVudF9yZWZlcmVuY2UpO1xuICB9XG4gIFxuICBjaGVja1JlZnVuZEFjdGlvbnMoY29kZTogc3RyaW5nKSB7XG4gICAgdGhpcy5yZWZ1bmRBY3Rpb25zSGFzRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmVhc29uRmllbGRFbXB0eSA9IGZhbHNlO1xuICAgIHRoaXMuaXNSZWFzb25FbXB0eSA9IGZhbHNlO1xuICAgIHRoaXMuaXNSZWFzb25JbnZhbGlkID0gZmFsc2U7XG4gICAgdGhpcy5yZWZ1bmRSZWplY3RSZWFzb25IYXNFcnJvciA9IGZhbHNlO1xuICAgIGlmKGNvZGUgPT09ICdSZXR1cm4gdG8gY2FzZXdvcmtlcicpIHtcbiAgICAgIHRoaXMuaXNDb25maXJtQnV0dG9uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5pc1NlbmRNZUJhY2tDbGlja2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNSZWplY3RDbGlja2VkID0gZmFsc2U7XG4gICAgICB0aGlzLmlzT3RoZXJDbGlja2VkID0gZmFsc2U7XG5cbiAgICB9IGVsc2UgaWYgKGNvZGUgPT09ICdBcHByb3ZlJykge1xuICAgICAgdGhpcy5pc1NlbmRNZUJhY2tDbGlja2VkID0gZmFsc2U7XG4gICAgICB0aGlzLmlzQ29uZmlybUJ1dHRvbmRpc2FibGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmlzUmVqZWN0Q2xpY2tlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5pc090aGVyQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgfSBlbHNlIGlmIChjb2RlID09PSAnUmVqZWN0Jykge1xuICAgICAgdGhpcy5pc1JlamVjdENsaWNrZWQgPSB0cnVlO1xuICAgICAgdGhpcy5pc1NlbmRNZUJhY2tDbGlja2VkID0gZmFsc2U7XG4gICAgICB0aGlzLmlzT3RoZXJDbGlja2VkID0gZmFsc2U7XG4gICAgICB0aGlzLlJlZnVuZHNTZXJ2aWNlLmdldFJlZnVuZFJlamVjdFJlYXNvbnMoKS5zdWJzY3JpYmUoXG4gICAgICAgIHJlZnVuZFJlamVjdFJlYXNvbkxpc3QgPT4ge1xuICAgICAgICAgIHRoaXMucmVmdW5kUmVqZWN0UmVhc29uTGlzdCA9IDxhbnk+cmVmdW5kUmVqZWN0UmVhc29uTGlzdDtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZ2V0RXJyb3JNZXNzYWdlKHRydWUsIGVyci5zdGF0dXNDb2RlLCBlcnIuZXJyLCBlcnIpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gJ1JFMDA1Jykge1xuICAgICAgdGhpcy5pc090aGVyQ2xpY2tlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChjb2RlICE9PSAnUkUwMDUnKSB7XG4gICAgICB0aGlzLmlzT3RoZXJDbGlja2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ2V0Tm90aWZpY2F0aW9uUHJldmlld09iaihub3RpZmljYXRpb25QcmV2aWV3T2JqIDogSU5vdGlmaWNhdGlvblByZXZpZXcpe1xuICAgIHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iaiA9IG5vdGlmaWNhdGlvblByZXZpZXdPYmo7XG4gIH1cblxuICBwcm9jZXNzUmVmdW5kU3VibWl0KCkge1xuICAgIGxldCBwcm9jZXNzUmVmdW5kUmVxdWVzdDtcbiAgICBsZXQgc3RhdHVzO1xuICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLCAnYWxsJyk7XG4gICAgY29uc3QgY29udHJvbHMgPSB0aGlzLnByb2Nlc3NSZWZ1bmRGb3JtLmNvbnRyb2xzO1xuICAgIGNvbnN0IHByb2Nlc3NGb3JtRXJyb3IgPSBjb250cm9scy5zZW5kTWVCYWNrRmllbGQuZXJyb3JzO1xuXG4gICAgaWYgKHRoaXMucHJvY2Vzc1JlZnVuZEZvcm0uZGlydHkgJiYgY29udHJvbHMucmVmdW5kQWN0aW9uRmllbGQudmFsaWQgXG4gICAgICAmJiAoY29udHJvbHMucmVmdW5kQWN0aW9uRmllbGQudmFsdWUgPT0gJ0FwcHJvdmUnXG4gICAgICB8fCAoY29udHJvbHMucmVmdW5kQWN0aW9uRmllbGQudmFsdWUgPT0gJ1JlamVjdCcgJiYgY29udHJvbHMucmVmdW5kUmVqZWN0UmVhc29uRmllbGQudmFsaWQgJiYgY29udHJvbHMucmVmdW5kUmVqZWN0UmVhc29uRmllbGQudmFsdWUgIT0gJ1JFMDA1JylcbiAgICAgIHx8IChjb250cm9scy5yZWZ1bmRBY3Rpb25GaWVsZC52YWx1ZSA9PSAnUmVqZWN0JyAmJiBjb250cm9scy5yZWZ1bmRSZWplY3RSZWFzb25GaWVsZC52YWx1ZSA9PSAnUkUwMDUnICYmIGNvbnRyb2xzLmVudGVyUmVhc29uRmllbGQudmFsaWQpXG4gICAgICB8fCAoY29udHJvbHMucmVmdW5kQWN0aW9uRmllbGQudmFsdWUgPT0gJ1JldHVybiB0byBjYXNld29ya2VyJyAmJiBjb250cm9scy5zZW5kTWVCYWNrRmllbGQudmFsaWQpKSkge1xuICAgICAgaWYgKGNvbnRyb2xzLnJlZnVuZEFjdGlvbkZpZWxkLnZhbHVlID09PSAnQXBwcm92ZScpe1xuICAgICAgICBzdGF0dXMgPSAnQVBQUk9WRSc7XG4gICAgICAgIGlmICh0aGlzLm5vdGlmaWNhdGlvblByZXZpZXdPYmopIHtcbiAgICAgICAgICBwcm9jZXNzUmVmdW5kUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIGNvZGU6ICcnLFxuICAgICAgICAgICAgcmVhc29uOiAnJyxcbiAgICAgICAgICAgIHRlbXBsYXRlX3ByZXZpZXc6IHtcbiAgICAgICAgICAgICAgYm9keTogdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3T2JqLmJvZHksXG4gICAgICAgICAgICAgIGZyb206IHtcbiAgICAgICAgICAgICAgICBmcm9tX2VtYWlsX2FkZHJlc3M6IHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iai5mcm9tLmZyb21fZW1haWxfYWRkcmVzcyxcbiAgICAgICAgICAgICAgICBmcm9tX21haWxfYWRkcmVzczoge1xuICAgICAgICAgICAgICAgICAgYWRkcmVzc19saW5lOiB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXdPYmouZnJvbS5mcm9tX21haWxfYWRkcmVzcy5hZGRyZXNzX2xpbmUsXG4gICAgICAgICAgICAgICAgICBjaXR5OiB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXdPYmouZnJvbS5mcm9tX21haWxfYWRkcmVzcy5jaXR5LFxuICAgICAgICAgICAgICAgICAgY291bnRyeTogdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3T2JqLmZyb20uZnJvbV9tYWlsX2FkZHJlc3MuY291bnRyeSxcbiAgICAgICAgICAgICAgICAgIGNvdW50eTogdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3T2JqLmZyb20uZnJvbV9tYWlsX2FkZHJlc3MuY291bnR5LFxuICAgICAgICAgICAgICAgICAgcG9zdGFsX2NvZGU6IHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iai5mcm9tLmZyb21fbWFpbF9hZGRyZXNzLnBvc3RhbF9jb2RlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBodG1sOiB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXdPYmouaHRtbCxcbiAgICAgICAgICAgICAgaWQ6IHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iai50ZW1wbGF0ZV9pZCxcbiAgICAgICAgICAgICAgc3ViamVjdDogdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3T2JqLnN1YmplY3QsXG4gICAgICAgICAgICAgIHRlbXBsYXRlX3R5cGU6IHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iai50ZW1wbGF0ZV90eXBlLFxuICAgICAgICAgICAgICB2ZXJzaW9uOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb2Nlc3NSZWZ1bmRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgY29kZTogJycsXG4gICAgICAgICAgICByZWFzb246ICcnXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjb250cm9scy5yZWZ1bmRBY3Rpb25GaWVsZC52YWx1ZSA9PT0gJ1JlamVjdCcpIHtcbiAgICAgICAgc3RhdHVzID0gJ1JFSkVDVCc7XG5cbiAgICAgICAgaWYgKHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iaikge1xuICAgICAgICAgIHByb2Nlc3NSZWZ1bmRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgY29kZTogY29udHJvbHMucmVmdW5kUmVqZWN0UmVhc29uRmllbGQudmFsdWUgPyBjb250cm9scy5yZWZ1bmRSZWplY3RSZWFzb25GaWVsZC52YWx1ZSA6ICcnLFxuICAgICAgICAgICAgcmVhc29uOiBjb250cm9scy5yZWZ1bmRSZWplY3RSZWFzb25GaWVsZC52YWx1ZSA9PSAnUkUwMDUnID8gY29udHJvbHMuZW50ZXJSZWFzb25GaWVsZC52YWx1ZSA6ICcnLFxuICAgICAgICAgICAgdGVtcGxhdGVfcHJldmlldzoge1xuICAgICAgICAgICAgICBib2R5OiB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXdPYmouYm9keSxcbiAgICAgICAgICAgICAgZnJvbToge1xuICAgICAgICAgICAgICAgIGZyb21fZW1haWxfYWRkcmVzczogdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3T2JqLmZyb20uZnJvbV9lbWFpbF9hZGRyZXNzLFxuICAgICAgICAgICAgICAgIGZyb21fbWFpbF9hZGRyZXNzOiB7XG4gICAgICAgICAgICAgICAgICBhZGRyZXNzX2xpbmU6IHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iai5mcm9tLmZyb21fbWFpbF9hZGRyZXNzLmFkZHJlc3NfbGluZSxcbiAgICAgICAgICAgICAgICAgIGNpdHk6IHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iai5mcm9tLmZyb21fbWFpbF9hZGRyZXNzLmNpdHksXG4gICAgICAgICAgICAgICAgICBjb3VudHJ5OiB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXdPYmouZnJvbS5mcm9tX21haWxfYWRkcmVzcy5jb3VudHJ5LFxuICAgICAgICAgICAgICAgICAgY291bnR5OiB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXdPYmouZnJvbS5mcm9tX21haWxfYWRkcmVzcy5jb3VudHksXG4gICAgICAgICAgICAgICAgICBwb3N0YWxfY29kZTogdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3T2JqLmZyb20uZnJvbV9tYWlsX2FkZHJlc3MucG9zdGFsX2NvZGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGh0bWw6IHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iai5odG1sLFxuICAgICAgICAgICAgICBpZDogdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3T2JqLnRlbXBsYXRlX2lkLFxuICAgICAgICAgICAgICBzdWJqZWN0OiB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXdPYmouc3ViamVjdCxcbiAgICAgICAgICAgICAgdGVtcGxhdGVfdHlwZTogdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3T2JqLnRlbXBsYXRlX3R5cGUsXG4gICAgICAgICAgICAgIHZlcnNpb246IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb2Nlc3NSZWZ1bmRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgY29kZTogY29udHJvbHMucmVmdW5kUmVqZWN0UmVhc29uRmllbGQudmFsdWUgPyBjb250cm9scy5yZWZ1bmRSZWplY3RSZWFzb25GaWVsZC52YWx1ZSA6ICcnLFxuICAgICAgICAgICAgcmVhc29uOiBjb250cm9scy5yZWZ1bmRSZWplY3RSZWFzb25GaWVsZC52YWx1ZSA9PSAnUkUwMDUnID8gY29udHJvbHMuZW50ZXJSZWFzb25GaWVsZC52YWx1ZSA6ICcnXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgXG4gICAgICB9IGVsc2UgaWYgKGNvbnRyb2xzLnJlZnVuZEFjdGlvbkZpZWxkLnZhbHVlID09PSAnUmV0dXJuIHRvIGNhc2V3b3JrZXInKSB7XG4gICAgICAgIHN0YXR1cyA9ICdTRU5EQkFDSyc7XG5cbiAgICAgICAgaWYgKHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iaikge1xuICAgICAgICAgIHByb2Nlc3NSZWZ1bmRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgY29kZTogJycsXG4gICAgICAgICAgICByZWFzb246IGNvbnRyb2xzLnNlbmRNZUJhY2tGaWVsZC52YWx1ZSxcbiAgICAgICAgICAgIHRlbXBsYXRlX3ByZXZpZXc6IHtcbiAgICAgICAgICAgICAgYm9keTogdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3T2JqLmJvZHksXG4gICAgICAgICAgICAgIGZyb206IHtcbiAgICAgICAgICAgICAgICBmcm9tX2VtYWlsX2FkZHJlc3M6IHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iai5mcm9tLmZyb21fZW1haWxfYWRkcmVzcyxcbiAgICAgICAgICAgICAgICBmcm9tX21haWxfYWRkcmVzczoge1xuICAgICAgICAgICAgICAgICAgYWRkcmVzc19saW5lOiB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXdPYmouZnJvbS5mcm9tX21haWxfYWRkcmVzcy5hZGRyZXNzX2xpbmUsXG4gICAgICAgICAgICAgICAgICBjaXR5OiB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXdPYmouZnJvbS5mcm9tX21haWxfYWRkcmVzcy5jaXR5LFxuICAgICAgICAgICAgICAgICAgY291bnRyeTogdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3T2JqLmZyb20uZnJvbV9tYWlsX2FkZHJlc3MuY291bnRyeSxcbiAgICAgICAgICAgICAgICAgIGNvdW50eTogdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3T2JqLmZyb20uZnJvbV9tYWlsX2FkZHJlc3MuY291bnR5LFxuICAgICAgICAgICAgICAgICAgcG9zdGFsX2NvZGU6IHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iai5mcm9tLmZyb21fbWFpbF9hZGRyZXNzLnBvc3RhbF9jb2RlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBodG1sOiB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXdPYmouaHRtbCxcbiAgICAgICAgICAgICAgaWQ6IHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iai50ZW1wbGF0ZV9pZCxcbiAgICAgICAgICAgICAgc3ViamVjdDogdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3T2JqLnN1YmplY3QsXG4gICAgICAgICAgICAgIHRlbXBsYXRlX3R5cGU6IHRoaXMubm90aWZpY2F0aW9uUHJldmlld09iai50ZW1wbGF0ZV90eXBlLFxuICAgICAgICAgICAgICB2ZXJzaW9uOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9jZXNzUmVmdW5kUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIGNvZGU6ICcnLFxuICAgICAgICAgICAgcmVhc29uOiBjb250cm9scy5zZW5kTWVCYWNrRmllbGQudmFsdWVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH1cblxuICAgICAgXG4gICAgICB9XG4gICAgICB0aGlzLlJlZnVuZHNTZXJ2aWNlLnBhdGNoUmVmdW5kQWN0aW9ucyhwcm9jZXNzUmVmdW5kUmVxdWVzdCwgdGhpcy5yZWZ1bmRSZWZlcmVuY2UsIHN0YXR1cykuc3Vic2NyaWJlKFxuICAgICAgICByZXNwb25zZSA9PiB7XG4gICAgICAgICAgdGhpcy5pc1N1Y2Nlc3NwYWdlRW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgICAvLyB0aGlzLnN1Y2Nlc3NNc2cgPSBKU09OLnBhcnNlKHJlc3BvbnNlKVsnZGF0YSddO1xuICAgICAgICAgIHRoaXMuc3VjY2Vzc01zZyA9IHJlc3BvbnNlLnJlcGxhY2UoL1snXCJdKy9nLCAnJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmdldEVycm9yTWVzc2FnZSh0cnVlLCBlcnIuc3RhdHVzQ29kZSwgZXJyLmVyciwgZXJyKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoY29udHJvbHMucmVmdW5kQWN0aW9uRmllbGQudmFsdWUgPT0gXCJcIikge1xuICAgICAgICB0aGlzLnJlc2V0Rm9ybShbdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLCAnYWN0aW9uJyk7XG4gICAgICB9XG4gICAgICBpZihjb250cm9scy5yZWZ1bmRBY3Rpb25GaWVsZC52YWx1ZSA9PSAnUmVqZWN0JyAmJiBjb250cm9scy5yZWZ1bmRSZWplY3RSZWFzb25GaWVsZC52YWx1ZSA9PSBcIlwiKSB7XG4gICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sICdyZWplY3RSZWFzb24nKTtcbiAgICAgIH1cbiAgICAgIGlmKGNvbnRyb2xzLnJlZnVuZEFjdGlvbkZpZWxkLnZhbHVlID09ICdSZXR1cm4gdG8gY2FzZXdvcmtlcicpIHtcbiAgICAgICAgaWYoY29udHJvbHMuc2VuZE1lQmFja0ZpZWxkLnZhbHVlID09ICcnICkge1xuICAgICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sICdhZGRBcmVhc29uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY29udHJvbHMuc2VuZE1lQmFja0ZpZWxkLnZhbHVlICE9ICcnICYmIGNvbnRyb2xzLnNlbmRNZUJhY2tGaWVsZC5pbnZhbGlkICkge1xuICAgICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sICdhZGRBcmVhc29uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYocHJvY2Vzc0Zvcm1FcnJvciAmJiBwcm9jZXNzRm9ybUVycm9yLm1pbmxlbmd0aCAmJiBwcm9jZXNzRm9ybUVycm9yLm1pbmxlbmd0aC5hY3R1YWxMZW5ndGggPCAzICkge1xuICAgICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sICdhZGRBcmVhc29uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYocHJvY2Vzc0Zvcm1FcnJvciAmJiBwcm9jZXNzRm9ybUVycm9yLm1heGxlbmd0aCAmJiBwcm9jZXNzRm9ybUVycm9yLm1heGxlbmd0aC5hY3R1YWxMZW5ndGggPiAyNTUgKSB7XG4gICAgICAgICAgdGhpcy5yZXNldEZvcm0oW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlXSwgJ2FkZEFyZWFzb24nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoY29udHJvbHMucmVmdW5kQWN0aW9uRmllbGQudmFsdWUgPT0gJ1JlamVjdCcgJiYgY29udHJvbHMucmVmdW5kUmVqZWN0UmVhc29uRmllbGQudmFsdWUgPT0gJ1JFMDA1Jykge1xuICAgICAgICBpZihjb250cm9scy5lbnRlclJlYXNvbkZpZWxkLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgdGhpcy5yZXNldEZvcm0oW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlXSwgJ2VudGVyUmVhc29uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY29udHJvbHMuZW50ZXJSZWFzb25GaWVsZC52YWx1ZSE9PSBcIlwiICYmIGNvbnRyb2xzLmVudGVyUmVhc29uRmllbGQuaW52YWxpZCkge1xuICAgICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZV0sICdlbnRlclJlYXNvbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cbiAgZ2V0RXJyb3JNZXNzYWdlKGlzRXJyb3JFeGlzdCwgc3RhdHVzLCBlcnJvck1zZywgZXJyKSB7XG4gICAgbGV0IGJvZHlUeHQgPSAnUGxlYXNlIHRyeSBhZ2FpbiBsYXRlcic7XG4gICAgaWYgKHN0YXR1cyAhPT0gNTAwKSB7XG4gICAgICBpZiAoZXJyb3JNc2cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBib2R5VHh0ID0gZXJyb3JNc2c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2R5VHh0ID0gZXJyO1xuICAgICAgfVxuICAgICAgXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyxcbiAgICAgIGJvZHk6IGJvZHlUeHQsXG4gICAgICBzaG93RXJyb3I6IGlzRXJyb3JFeGlzdFxuICAgIH07XG4gIH1cbiAgbG9hZFJlZnVuZExpc3RQYWdlKCkge1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2UuZ2V0bmF2aWdhdGlvblBhZ2VWYWx1ZSgpLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5uYXZpZ2F0aW9ucGFnZSA9IGRhdGEpO1xuICAgIGlmICh0aGlzLm5hdmlnYXRpb25wYWdlID09PSAnY2FzZXRyYW5zYWN0aW9ucycpIHtcbiAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmPScvcmVmdW5kLWxpc3Q/dGFrZVBheW1lbnQ9ZmFsc2UmcmVmdW5kbGlzdD10cnVlJztcbiAgICAgIC8vIC8vIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0bmF2aWdhdGlvblBhZ2UoJ2Nhc2V0cmFuc2FjdGlvbnMnKTtcbiAgICAgIC8vIC8vIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0aXNGcm9tU2VydmljZVJlcXVlc3RQYWdlKGZhbHNlKTtcbiAgICAgIC8vIC8vIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5WSUVXID0nY2FzZS10cmFuc2FjdGlvbnMnO1xuICAgICAgLy8gLy8gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ2Nhc2UtdHJhbnNhY3Rpb25zJztcbiAgICAgIC8vIC8vIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5JU0JTRU5BQkxFID0gdHJ1ZTtcbiAgICAgIC8vIC8vIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc1JlZnVuZFN0YXR1c1ZpZXcgPSBmYWxzZTtcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC52aWV3TmFtZSA9ICdyZWZ1bmRzdGF0dXNsaXN0JztcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc1JlZnVuZFN0YXR1c1ZpZXcgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAncmVmdW5kc3RhdHVzbGlzdCc7XG4gICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNSZWZ1bmRTdGF0dXNWaWV3ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgbG9hZFJlZnVuZHNIb21lUGFnZSgpIHtcbiAgICBpZih0eXBlb2YgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlRBS0VQQVlNRU5UID09PSAnc3RyaW5nJyAmJiB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPT09ICdmYWxzZScpIHtcbiAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWY9Jy9yZWZ1bmQtbGlzdD90YWtlUGF5bWVudD1mYWxzZSZyZWZ1bmRsaXN0PXRydWUnO1xuICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ3JlZnVuZC1saXN0JztcbiAgICAgfVxuICAgICBlbHNlIHtcbiAgICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0bmF2aWdhdGlvblBhZ2UoJ2Nhc2V0cmFuc2FjdGlvbnMnKTtcbiAgICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0aXNGcm9tU2VydmljZVJlcXVlc3RQYWdlKGZhbHNlKTtcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5WSUVXID0nY2FzZS10cmFuc2FjdGlvbnMnO1xuICAgICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ2Nhc2UtdHJhbnNhY3Rpb25zJztcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5JU0JTRU5BQkxFID0gdHJ1ZTtcbiAgICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc1JlZnVuZFN0YXR1c1ZpZXcgPSBmYWxzZTtcbiAgICAgfVxuICB9XG4gcmVkaXJlY3R0b1JlZnVuZExpc3RQYWdlKCkge1xuICAgaWYoKHR5cGVvZiB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPT09ICdzdHJpbmcnICYmIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5UQUtFUEFZTUVOVCA9PT0gJ2ZhbHNlJykgfHwgKHR5cGVvZiB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPT09ICdib29sZWFuJyAmJiAhdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlRBS0VQQVlNRU5UKSApIHtcbiAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmPScvcmVmdW5kLWxpc3Q/dGFrZVBheW1lbnQ9ZmFsc2UmcmVmdW5kbGlzdD10cnVlJztcbiAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC52aWV3TmFtZSA9ICdyZWZ1bmQtbGlzdCc7XG4gICB9XG4gICBlbHNlIHtcbiAgICB0aGlzLmxvYWRSZWZ1bmRMaXN0UGFnZSgpO1xuICAgfVxuICB9XG4gIGxvYWRDYXNlVHJhbnNhY3Rpb25QYWdlKCkge1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0bmF2aWdhdGlvblBhZ2UoJ2Nhc2V0cmFuc2FjdGlvbnMnKTtcbiAgICB0aGlzLk9yZGVyc2xpc3RTZXJ2aWNlLnNldGlzRnJvbVNlcnZpY2VSZXF1ZXN0UGFnZShmYWxzZSk7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ2Nhc2UtdHJhbnNhY3Rpb25zJztcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuSVNCU0VOQUJMRSA9IHRydWU7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzUmVmdW5kU3RhdHVzVmlldyA9IGZhbHNlO1xuICB9XG5cbiAgcmVzZXRGb3JtKHZhbHMsIGZpZWxkKSB7XG4gICAgaWYoZmllbGQ9PT0nYWN0aW9uJyB8fCBmaWVsZD09PSdhbGwnKSB7XG4gICAgICB0aGlzLnJlZnVuZEFjdGlvbnNIYXNFcnJvciA9IHZhbHNbMF07XG4gICAgfVxuICAgIGlmKGZpZWxkPT09J3JlamVjdFJlYXNvbicgfHwgZmllbGQ9PT0nYWxsJykge1xuICAgICAgdGhpcy5yZWZ1bmRSZWplY3RSZWFzb25IYXNFcnJvciA9IHZhbHNbMV07XG4gICAgfVxuICAgIGlmKGZpZWxkPT09J2FkZEFyZWFzb24nIHx8IGZpZWxkPT09J2FsbCcpIHtcbiAgICAgIHRoaXMuaXNSZWFzb25GaWVsZEVtcHR5ID0gdmFsc1syXTtcbiAgICAgIHRoaXMuaXNSZWFzb25GaWVsZEludmFsaWQgPSB2YWxzWzNdO1xuICAgICAgdGhpcy5yZWFzb25GaWVsZE1pbkhhc0Vycm9yID0gdmFsc1s0XTtcbiAgICAgIHRoaXMucmVhc29uRmllbGRNYXhIYXNFcnJvciA9IHZhbHNbNV07XG4gICAgfVxuICAgIGlmKGZpZWxkPT09J2VudGVyUmVhc29uJyB8fCBmaWVsZD09PSdhbGwnKSB7XG4gICAgICB0aGlzLmlzUmVhc29uRW1wdHkgPSB2YWxzWzZdO1xuICAgICAgdGhpcy5pc1JlYXNvbkludmFsaWQgPSB2YWxzWzddO1xuICAgIH1cbiAgfVxuXG4gIGdvVG9DYXNlUmV2aWV3KCkge1xuICAgIGNvbnN0IGlzUGF5QnViYmxlID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzRnJvbVBheUJ1YmJsZTtcbiAgICBpZihpc1BheUJ1YmJsZSkge1xuICAgICAgdGhpcy5sb2FkQ2FzZVRyYW5zYWN0aW9uUGFnZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYC9jYXNlcy9jYXNlLWRldGFpbHMvJHt0aGlzLmNjZENhc2VOdW1iZXJ9YF0sIHtyZWxhdGl2ZVRvOiB0aGlzLmFjdGl2ZVJvdXRlfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VGVtcGxhdGVJbnN0cnVjdGlvblR5cGUocGF5bWVudDogSVBheW1lbnQsIHBheW1lbnRSZWZlcmVuY2U6IHN0cmluZyk6IHZvaWQge1xuXG4gICAgaWYgKHBheW1lbnQgPT0gdW5kZWZpbmVkIHx8IHBheW1lbnQgPT0gbnVsbCB8fCBwYXltZW50LnJlZmVyZW5jZSAhPSBwYXltZW50UmVmZXJlbmNlKSB7XG5cbiAgICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLmdldFBheW1lbnREZXRhaWxzKHBheW1lbnRSZWZlcmVuY2UpLnN1YnNjcmliZShcbiAgICAgICAgcGF5bWVudCA9PiB7XG4gICAgICAgICAgdGhpcy5wYXltZW50T2JqID0gcGF5bWVudDtcbiAgICAgICAgICB0aGlzLnBheW1lbnRPYmoucmVmZXJlbmNlID0gcGF5bWVudFJlZmVyZW5jZTtcbiAgICAgICAgICB0aGlzLnRlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlID0gdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmdldE5vdGlmaWNhdGlvbkluc3RydWN0aW9uVHlwZSh0aGlzLnBheW1lbnRPYmouY2hhbm5lbCwgdGhpcy5wYXltZW50T2JqLm1ldGhvZCk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy50ZW1wbGF0ZUluc3RydWN0aW9uVHlwZSA9ICdUZW1wbGF0ZSc7XG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGVtcGxhdGVJbnN0cnVjdGlvblR5cGUgPSB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZ2V0Tm90aWZpY2F0aW9uSW5zdHJ1Y3Rpb25UeXBlKHBheW1lbnQuY2hhbm5lbCwgcGF5bWVudC5tZXRob2QpO1xuICAgIH1cbiAgfVxuXG4gIHNob3dOb3RpZmljYXRpb25QcmV2aWV3KCk6IHZvaWQge1xuICAgIHRoaXMubm90aWZpY2F0aW9uUHJldmlldyA9IHRydWU7XG4gIH1cblxuICBoaWRlTm90aWZpY2F0aW9uUHJldmlldygpOiB2b2lkIHtcbiAgICB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXcgPSBmYWxzZTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdSZWZ1bmRQcm9jZXNzJ1wiPlxuPGRpdiBjbGFzcz1cImdvdnVrLXdpZHRoLWNvbnRhaW5lclwiPlxuXG4gIDxtYWluIGNsYXNzPVwiZ292dWstbWFpbi13cmFwcGVyIGdvdnVrLSEtcGFkZGluZy10b3AtMFwiIFtuZ0NsYXNzXT1cInsnZ292dWstcmFkaW9zX19jb25kaXRpb25hbC0taGlkZGVuJzogaXNTdWNjZXNzcGFnZUVuYWJsZX1cIiBpZD1cIm1haW4tY29udGVudFwiIHJvbGU9XCJtYWluXCI+XG4gICAgPGRpdiAqbmdJZj1cImVycm9yTWVzc2FnZS5zaG93RXJyb3JcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci1zdW1tYXJ5XCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZmFpbHVyZS1lcnJvci1zdW1tYXJ5LWhlYWRpbmdcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICAgIDxoMiBjbGFzcz1cImhlYWRpbmctbWVkaXVtIGVycm9yLXN1bW1hcnktaGVhZGluZ1wiIGlkPVwiZmFpbHVyZS1lcnJvci1zdW1tYXJ5LWhlYWRpbmdcIj5cbiAgICAgICAgICB7e2Vycm9yTWVzc2FnZS50aXRsZX19XG4gICAgICAgIDwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X19ib2R5IHByb2Nlc3MtcmVmdW5kLWZvbnRcIj5cbiAgICAgICAgICB7e2Vycm9yTWVzc2FnZS5ib2R5fX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJwYXltZW50LXZpZXctYWxpZ25tZW50XCI+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLXJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgPGgxIGNsYXNzPVwiaGVhZGluZy1sYXJnZSBnb3Z1ay0hLW1hcmdpbi10b3AtMFwiPlJldmlldyByZWZ1bmQgZGV0YWlsczwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8dGFibGU+XG4gICAgICAgIDx0Ym9keT5cblxuICAgICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPlBheW1lbnQgdG8gYmUgcmVmdW5kZWQ8L3RkPlxuICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMlwiPnt7cmVmdW5kbGlzdHNvdXJjZT8ucmVmdW5kX3JlZmVyZW5jZX19ICh7e3JlZnVuZGxpc3Rzb3VyY2UuYW1vdW50ICB8IGN1cnJlbmN5IDonR0JQJzonc3ltYm9sJzonMS4yLTInICB9fSk8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPlJlYXNvbiBmb3IgcmVmdW5kPC90ZD5cbiAgICAgICAgICA8dGQgY29sc3Bhbj1cIjJcIj57e3JlZnVuZGxpc3Rzb3VyY2U/LnJlYXNvbj8udHJpbSgpfX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+QW1vdW50IHRvIGJlIHJlZnVuZGVkPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMlwiPnt7cmVmdW5kbGlzdHNvdXJjZT8uYW1vdW50IHwgY3VycmVuY3kgOidHQlAnOidzeW1ib2wnOicxLjItMicgfX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPlNlbnQgdG88L3RkPlxuICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMlwiPnt7Y3BvRGV0YWlscz8ucmVzcG9uc2libGVQYXJ0eX19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImJvbGQgdGItY29sLXdcIj5TZW50IHZpYTwvdGQ+XG4gICAgICAgICAgPHRkIGNvbHNwYW49XCIyXCI+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cInJlZnVuZGxpc3Rzb3VyY2U/LmNvbnRhY3RfZGV0YWlscz8ubm90aWZpY2F0aW9uX3R5cGUgPT09ICdFTUFJTCdcIiBjbGFzcz1cImNvbnRhY3REZXRhaWxzLXdpZHRoIGZvbnQtc2l6ZS0xOXB4XCI+XG4gICAgICAgICAgICA8c3Ryb25nPkVtYWlsPC9zdHJvbmc+XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAge3tyZWZ1bmRsaXN0c291cmNlPy5jb250YWN0X2RldGFpbHM/LmVtYWlsPy50cmltKCl9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJyZWZ1bmRsaXN0c291cmNlPy5jb250YWN0X2RldGFpbHM/Lm5vdGlmaWNhdGlvbl90eXBlID09PSAnTEVUVEVSJ1wiIGNsYXNzPVwiY29udGFjdERldGFpbHMtd2lkdGggZm9udC1zaXplLTE5cHhcIj5cbiAgICAgICAgICAgIDxzdHJvbmc+UG9zdDwvc3Ryb25nPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIHt7cmVmdW5kbGlzdHNvdXJjZT8uY29udGFjdF9kZXRhaWxzPy5hZGRyZXNzX2xpbmU/LnRyaW0oKX19IHt7cmVmdW5kbGlzdHNvdXJjZT8uY29udGFjdF9kZXRhaWxzPy5jaXR5Py50cmltKCl9fSB7e3JlZnVuZGxpc3Rzb3VyY2U/LmNvbnRhY3RfZGV0YWlscz8uY291bnR5Py50cmltKCl9fSB7e3JlZnVuZGxpc3Rzb3VyY2U/LmNvbnRhY3RfZGV0YWlscz8uY291bnRyeT8udHJpbSgpfX0ge3tyZWZ1bmRsaXN0c291cmNlPy5jb250YWN0X2RldGFpbHM/LnBvc3RhbF9jb2RlPy50cmltKCl9fVxuICAgICAgICAgIDwvZGl2PiBcbiAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+U3VibWl0dGVkIGJ5PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMlwiPnt7cmVmdW5kbGlzdHNvdXJjZT8udXNlcl9mdWxsX25hbWV9fTwvdGQ+XG5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPkRhdGUgc3VibWl0dGVkPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMlwiPnt7cmVmdW5kbGlzdHNvdXJjZT8uZGF0ZV9jcmVhdGVkIHwgZGF0ZTonZCBNTU1NIHl5eXknIH19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImJvbGQgdGItY29sLXdcIj5Ob3RpZmljYXRpb248L3RkPlxuICAgICAgICAgIDx0ZD57e3RlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlfX08L3RkPlxuICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgIDxhICpuZ0lmPVwiIW5vdGlmaWNhdGlvblByZXZpZXdcIiBocmVmPVwiSmF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHBvaW50ZXIgcmlnaHRcIiAoY2xpY2spPVwic2hvd05vdGlmaWNhdGlvblByZXZpZXcoKVwiPlxuICAgICAgICAgICAgICBQcmV2aWV3XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YSAqbmdJZj1cIm5vdGlmaWNhdGlvblByZXZpZXdcIiBocmVmPVwiSmF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHBvaW50ZXIgcmlnaHRcIiAoY2xpY2spPVwiaGlkZU5vdGlmaWNhdGlvblByZXZpZXcoKVwiPlxuICAgICAgICAgICAgICBIaWRlIFByZXZpZXdcbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC90ZD5cblxuICAgICAgPC90cj5cblxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC90YWJsZT5cblxuICAgICAgPGFwcC1ub3RpZmljYXRpb24tcHJldmlldyAqbmdJZj1cIm5vdGlmaWNhdGlvblByZXZpZXdcIiBbcGF5bWVudFJlZmVyZW5jZV09XCJyZWZ1bmRsaXN0c291cmNlPy5wYXltZW50X3JlZmVyZW5jZVwiXG4gICAgICAgIFtwYXltZW50XT1cInBheW1lbnRPYmpcIlxuICAgICAgICBbY29udGFjdERldGFpbHNdPVwicmVmdW5kbGlzdHNvdXJjZT8uY29udGFjdF9kZXRhaWxzXCJcbiAgICAgICAgW3JlZnVuZFJlYXNvbl09XCJyZWZ1bmRsaXN0c291cmNlPy5yZWFzb25fY29kZVwiIFtyZWZ1bmRBbW91bnRdPVwicmVmdW5kbGlzdHNvdXJjZT8uYW1vdW50XCJcbiAgICAgICAgW3JlZnVuZFJlZmVyZW5jZV09XCJyZWZ1bmRsaXN0c291cmNlPy5yZWZ1bmRfcmVmZXJlbmNlXCJcbiAgICAgICAgKG5vdGlmaWNhdGlvblByZXZpZXdFdmVudCkgPSBcImdldE5vdGlmaWNhdGlvblByZXZpZXdPYmooJGV2ZW50KVwiPlxuICAgICAgPC9hcHAtbm90aWZpY2F0aW9uLXByZXZpZXc+XG5cbiAgICAgIDxkaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicHJvY2Vzcy1yZWZ1bmRfX3BhbmVsXCI+XG4gICAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cInByb2Nlc3NSZWZ1bmRGb3JtXCIgbm92YWxpZGF0ZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cIlwiPlxuICAgICAgICA8ZmllbGRzZXQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJzaWduLWluLWhpbnRcIj5cbiAgICAgICAgICA8bGVnZW5kIGNsYXNzPVwiZ292dWstZmllbGRzZXRfX2xlZ2VuZCBnb3Z1ay1maWVsZHNldF9fbGVnZW5kLS1sXCI+XG4gICAgICAgICAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLWxhcmdlXCI+XG4gICAgICAgICAgICAgIFdoYXQgZG8geW91IHdhbnQgdG8gZG8gd2l0aCB0aGlzIHJlZnVuZD9cbiAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgPC9sZWdlbmQ+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc1wiICBbbmdDbGFzc109XCJ7J2Zvcm0tZ3JvdXAtZXJyb3InOiByZWZ1bmRBY3Rpb25zSGFzRXJyb3J9XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImlubGluZS1lcnJvci1tZXNzYWdlXCJcbiAgICAgICAgICAgICpuZ0lmPVwicmVmdW5kQWN0aW9uc0hhc0Vycm9yXCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cInJlZnVuZEFjdGlvbnNIYXNFcnJvclwiPlBsZWFzZSBzZWxlY3QgYW4gYWN0aW9uPC9zcGFuPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2l0ZW1cIiAqbmdGb3I9XCJsZXQgcmVmdW5kQWN0aW9uIG9mIHJlZnVuZEFjdGlvbkxpc3Q7IGxldCBpID0gaW5kZXg7XCI+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLXJhZGlvc19faW5wdXRcIiBcbiAgICAgICAgICAgICAgaWQ9XCJyZWZ1bmRBY3Rpb24te3tpfX1cIiBcbiAgICAgICAgICAgICAgbmFtZT1cInJlZnVuZEFjdGlvbkZpZWxkXCJcbiAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwicmVmdW5kQWN0aW9uRmllbGRcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwiY2hlY2tSZWZ1bmRBY3Rpb25zKHJlZnVuZEFjdGlvbi5jb2RlKVwiXG4gICAgICAgICAgICAgICAgdmFsdWU9XCJ7e3JlZnVuZEFjdGlvbi5jb2RlfX1cIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstcmFkaW9zX19sYWJlbCBwcm9jZXNzLXJlZnVuZC1mb250XCIgZm9yPVwicmVmdW5kQWN0aW9uLXt7aX19XCI+XG4gICAgICAgICAgICAgICAge3tyZWZ1bmRBY3Rpb24uY29kZX19XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJzaWduLWluLWl0ZW0taGludFwiIGNsYXNzPVwiZ292dWstaGludCBnb3Z1ay1yYWRpb3NfX2hpbnQgcHJvY2Vzcy1yZWZ1bmQtZm9udFwiPlxuICAgICAgICAgICAgICAgIHt7cmVmdW5kQWN0aW9uLmxhYmVsfX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2NvbmRpdGlvbmFsXCIgW25nQ2xhc3NdPVwieydnb3Z1ay1yYWRpb3NfX2NvbmRpdGlvbmFsLS1oaWRkZW4nOiAhaXNTZW5kTWVCYWNrQ2xpY2tlZH1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBwcm9jZXNzLXJlZnVuZC1mb250XCIgZm9yPVwiY29udGFjdC1ieS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICBBZGQgYSByZWFzb25cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiaW5saW5lLWVycm9yLW1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwiaXNSZWFzb25GaWVsZEVtcHR5IHx8IGlzUmVhc29uRmllbGRJbnZhbGlkIHx8IHJlYXNvbkZpZWxkTWluSGFzRXJyb3IgfHwgcmVhc29uRmllbGRNYXhIYXNFcnJvclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNSZWFzb25GaWVsZEVtcHR5XCI+QWRkIGEgcmVhc29uPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNSZWFzb25GaWVsZEludmFsaWRcIj5BZGQgYSB2YWxpZCByZWFzb248L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJyZWFzb25GaWVsZE1pbkhhc0Vycm9yXCI+UmVhc29uIHNob3VsZCBiZSBhdCBsZWFzdCAzIGNoYXJhY3RlcnMuPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwicmVhc29uRmllbGRNYXhIYXNFcnJvclwiPlJlYXNvbiBzaG91bGQgYmUgMjU1IGNoYXJhY3RlcnMgb3IgdW5kZXIuPC9zcGFuPlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZ292dWstdGV4dGFyZWEgZ292dWstIS13aWR0aC1vbmUtdGhpcmQgcmVhc29uLWZvbnRcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnaW5saW5lLWVycm9yLWNsYXNzJzogaXNSZWFzb25GaWVsZEVtcHR5IHx8IGlzUmVhc29uRmllbGRJbnZhbGlkIHx8IHJlYXNvbkZpZWxkTWluSGFzRXJyb3IgfHwgcmVhc29uRmllbGRNYXhIYXNFcnJvcn1cIlxuICAgICAgICAgICAgICAgICAgaWQ9XCJzZW5kbWViYWNrXCJcbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJzZW5kTWVCYWNrRmllbGRcIiBcbiAgICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInNlbmRNZUJhY2tGaWVsZFwiXG4gICAgICAgICAgICAgICAgcm93cz1cIjVcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICBcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgW25nQ2xhc3NdPVwieydnb3Z1ay1yYWRpb3NfX2NvbmRpdGlvbmFsLS1oaWRkZW4nOiAhaXNSZWplY3RDbGlja2VkfVwiPlxuICAgICAgICA8ZmllbGRzZXQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldFwiPlxuICAgICAgICAgIDxsZWdlbmQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldF9fbGVnZW5kIGdvdnVrLWZpZWxkc2V0X19sZWdlbmQtLWxcIj5cbiAgICAgICAgICAgIDxoMiBjbGFzcz1cImhlYWRpbmctbWVkaXVtXCI+XG4gICAgICAgICAgICAgIFdoeSBhcmUgeW91IHJlamVjdGluZyB0aGlzIHJlZnVuZD9cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPC9sZWdlbmQ+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc1wiIFtuZ0NsYXNzXT1cInsnZm9ybS1ncm91cC1lcnJvcic6IHJlZnVuZFJlamVjdFJlYXNvbkhhc0Vycm9yfVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJpbmxpbmUtZXJyb3ItbWVzc2FnZVwiXG4gICAgICAgICAgICAqbmdJZj1cInJlZnVuZFJlamVjdFJlYXNvbkhhc0Vycm9yXCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cInJlZnVuZFJlamVjdFJlYXNvbkhhc0Vycm9yXCI+UGxlYXNlIHNlbGVjdCBhIHJlamVjdCByZWFzb248L3NwYW4+XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19faXRlbVwiICpuZ0Zvcj1cImxldCByZWZ1bmRSZWplY3RSZWFzb24gb2YgcmVmdW5kUmVqZWN0UmVhc29uTGlzdDsgbGV0IGogPSBpbmRleDtcIj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstcmFkaW9zX19pbnB1dFwiIFxuICAgICAgICAgICAgICBpZD1cInJlZnVuZFJlamVjdFJlYXNvbi17e2p9fVwiXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInJlZnVuZFJlamVjdFJlYXNvbkZpZWxkXCJcbiAgICAgICAgICAgICAgbmFtZT1cInJlZnVuZFJlamVjdFJlYXNvbkZpZWxkXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImNoZWNrUmVmdW5kQWN0aW9ucyhyZWZ1bmRSZWplY3RSZWFzb24uY29kZSlcIlxuICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIiB2YWx1ZT1cInt7cmVmdW5kUmVqZWN0UmVhc29uLmNvZGV9fVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1yYWRpb3NfX2xhYmVsIHByb2Nlc3MtcmVmdW5kLWZvbnRcIiBmb3I9XCJyZWZ1bmRSZWplY3RSZWFzb24te3tqfX1cIj5cbiAgICAgICAgICAgICAgICB7e3JlZnVuZFJlamVjdFJlYXNvbi5uYW1lfX1cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zX19jb25kaXRpb25hbFwiIFtuZ0NsYXNzXT1cInsnZ292dWstcmFkaW9zX19jb25kaXRpb25hbC0taGlkZGVuJzogIWlzT3RoZXJDbGlja2VkfVwiIGlkPVwiY29uZGl0aW9uYWwtY29udGFjdC0zXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgcHJvY2Vzcy1yZWZ1bmQtZm9udCBcIiBmb3I9XCJjb250YWN0LWJ5LXRleHRcIj5cbiAgICAgICAgICAgIEVudGVyIHJlYXNvblxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPHAgY2xhc3M9XCJpbmxpbmUtZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwiaXNSZWFzb25FbXB0eSB8fCBpc1JlYXNvbkludmFsaWRcIj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNSZWFzb25FbXB0eVwiPkVudGVyIHJlYXNvbi48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cImlzUmVhc29uSW52YWxpZFwiPkVudGVyIGEgdmFsaWQgcmVhc29uPC9zcGFuPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1pbnB1dCBnb3Z1ay0hLXdpZHRoLW9uZS10aGlyZCByZWFzb24tZm9udFwiIGlkPVwib3RoZXJSZWFzb25cIiBcbiAgICAgICAgICBbbmdDbGFzc109XCJ7J2lubGluZS1lcnJvci1jbGFzcyc6IGlzUmVhc29uRW1wdHkgfHwgaXNSZWFzb25JbnZhbGlkfVwiXG4gICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwiZW50ZXJSZWFzb25GaWVsZFwiIG5hbWU9XCJlbnRlclJlYXNvbkZpZWxkXCIgdHlwZT1cInRleHRcIj48L2Rpdj5cbiAgICAgICAgXG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1idXR0b24tZ3JvdXBcIj5cbiAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwicmVkaXJlY3R0b1JlZnVuZExpc3RQYWdlKClcIiBjbGFzcz1cImdvdnVrLWJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeSBtYXJnaW5yaWdodFwiPiBQcmV2aW91czwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIChjbGljayk9XCJwcm9jZXNzUmVmdW5kU3VibWl0KClcIiBjbGFzcz1cImdvdnVrLWJ1dHRvbiBidXR0b25cIlxuICAgICAgICAgIGRhdGEtbW9kdWxlPVwiZ292dWstYnV0dG9uXCI+XG4gICAgICAgICAgU3VibWl0IFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDxici8+PGJyLz5cbiAgICA8L2Rpdj5cbiAgIFxuICA8ZGl2ICpuZ0lmPVwiIWlzRnJvbVJlZnVuZExpc3RQYWdlXCIgY2xhc3M9XCJnb3Z1ay1idXR0b24tZ3JvdXAgbWFyZ2luXCI+XG5cbiAgPHA+PGEgKGNsaWNrKT1cImxvYWRSZWZ1bmRzSG9tZVBhZ2UoKVwiIGNsYXNzPVwiZ292dWstbGluayBwb2ludGVyXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj5DYW5jZWw8L2E+PC9wPlxuPC9kaXY+XG48L2Zvcm0+XG4gIDwvZGl2PlxuIFxuXG4gIDwvbWFpbj5cbiBcbiAgPG1haW4gY2xhc3M9XCJnb3Z1ay1tYWluLXdyYXBwZXIgZ292dWstbWFpbi13cmFwcGVyLS1sIHN1Y2Nlc3MtcGFnZS1wYWRkaW5nLS10b3AyNVwiIFtuZ0NsYXNzXT1cInsnZ292dWstcmFkaW9zX19jb25kaXRpb25hbC0taGlkZGVuJzogIWlzU3VjY2Vzc3BhZ2VFbmFibGV9XCIgaWQ9XCJtYWluLWNvbnRlbnRcIiByb2xlPVwibWFpblwiID5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1yb3cgcGFnZXNpemVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXBhbmVsIGdvdnVrLXBhbmVsLXJlZnVuZC0tY29uZmlybWF0aW9uXCI+XG4gICAgICAgICAgPGgxIGNsYXNzPVwiaGVhZGluZy14bGFyZ2VcIj5cbiAgICAgICAgICAgIHt7c3VjY2Vzc01zZ319XG4gICAgICAgICAgPC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzPVwiZ292dWstYm9keSBwcm9jZXNzLXJlZnVuZC1mb250XCI+XG4gICAgICAgIDxhIGhyZWY9XCJKYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ29Ub0Nhc2VSZXZpZXcoKVwiIGNsYXNzPVwiZ292dWstbGluayBwb2ludGVyXCI+UmV0dXJuIHRvIGNhc2U8L2E+XG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICA8L21haW4+XG48L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG4iXX0=