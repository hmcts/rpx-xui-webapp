import { Component, Input } from '@angular/core';
import { RefundsService } from '../../services/refunds/refunds.service';
import { NotificationService } from '../../services/notification/notification.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { OrderslistService } from '../../services/orderslist.service';
import { IPutNotificationRequest } from '../../interfaces/IPutNotificationRequest';
import { IResubmitRefundRequest } from '../../interfaces/IResubmitRefundRequest';
import { PaymentLibComponent } from '../../payment-lib.component';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../services/refunds/refunds.service";
import * as i3 from "../../services/notification/notification.service";
import * as i4 from "../../payment-lib.component";
import * as i5 from "../../services/orderslist.service";
import * as i6 from "../../services/payment-view/payment-view.service";
import * as i7 from "@angular/common";
import * as i8 from "../contact-details/contact-details.component";
import * as i9 from "../add-remission/add-remission.component";
import * as i10 from "../notification-preview/notification-preview.component";
import * as i11 from "../../pipes/ccd-hyphens.pipe";
function RefundStatusComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 1)(2, "h2", 2);
    i0.ɵɵtext(3, " Error in processing the request ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 3);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.errorMessage, " ");
} }
function RefundStatusComponent_ng_container_1_tbody_15_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 6)(1, "td", 16);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 17);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 16);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 16);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 16);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 16)(14, "a", 18);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_1_tbody_15_tr_1_Template_a_click_14_listener() { const restoredCtx = i0.ɵɵrestoreView(_r17); const refundList_r15 = restoredCtx.$implicit; const ctx_r16 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r16.goToRefundView(refundList_r15, "casetransactions")); });
    i0.ɵɵtext(15, "Review");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const refundList_r15 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(refundList_r15 == null ? null : refundList_r15.refund_status["name"]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u00A3", i0.ɵɵpipeBind2(5, 5, refundList_r15 == null ? null : refundList_r15.amount, ".2"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(8, 8, refundList_r15 == null ? null : refundList_r15.date_updated, "dd MMM yyyy"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(refundList_r15 == null ? null : refundList_r15.refund_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", refundList_r15 == null ? null : refundList_r15.reason, "");
} }
function RefundStatusComponent_ng_container_1_tbody_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 14);
    i0.ɵɵtemplate(1, RefundStatusComponent_ng_container_1_tbody_15_tr_1_Template, 16, 11, "tr", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r12.rejectedRefundList);
} }
function RefundStatusComponent_ng_container_1_tbody_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 14)(1, "td", 19);
    i0.ɵɵtext(2, "No refunds recorded");
    i0.ɵɵelementEnd()();
} }
function RefundStatusComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "table", 4)(2, "thead", 5)(3, "tr", 6)(4, "td", 7);
    i0.ɵɵtext(5, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 8);
    i0.ɵɵtext(7, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 9);
    i0.ɵɵtext(9, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 10);
    i0.ɵɵtext(11, "Refund reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 11);
    i0.ɵɵtext(13, "Reason");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(14, "td", 12);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(15, RefundStatusComponent_ng_container_1_tbody_15_Template, 2, 1, "tbody", 13);
    i0.ɵɵtemplate(16, RefundStatusComponent_ng_container_1_tbody_16_Template, 3, 0, "tbody", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("ngIf", (ctx_r1.rejectedRefundList == null ? null : ctx_r1.rejectedRefundList.length) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r1.rejectedRefundList == null ? null : ctx_r1.rejectedRefundList.length) === 0);
} }
function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "strong");
    i0.ɵɵtext(2, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const notification_r23 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", notification_r23 == null ? null : notification_r23.contact_details == null ? null : notification_r23.contact_details.email == null ? null : notification_r23.contact_details.email.trim(), " ");
} }
function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "strong");
    i0.ɵɵtext(2, "Post");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const notification_r23 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate5(" ", notification_r23 == null ? null : notification_r23.contact_details == null ? null : notification_r23.contact_details.address_line == null ? null : notification_r23.contact_details.address_line.trim(), " ", notification_r23 == null ? null : notification_r23.contact_details == null ? null : notification_r23.contact_details.city == null ? null : notification_r23.contact_details.city.trim(), " ", notification_r23 == null ? null : notification_r23.contact_details == null ? null : notification_r23.contact_details.county == null ? null : notification_r23.contact_details.county.trim(), " ", notification_r23 == null ? null : notification_r23.contact_details == null ? null : notification_r23.contact_details.country == null ? null : notification_r23.contact_details.country.trim(), " ", notification_r23 == null ? null : notification_r23.contact_details == null ? null : notification_r23.contact_details.postal_code == null ? null : notification_r23.contact_details.postal_code.trim(), " ");
} }
function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_10_a_7_Template(rf, ctx) { if (rf & 1) {
    const _r36 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 34);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_10_a_7_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r36); const i_r24 = i0.ɵɵnextContext(2).index; const ctx_r34 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r34.showNotificationSentView(i_r24)); });
    i0.ɵɵtext(1, "View");
    i0.ɵɵelementEnd();
} }
function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_10_a_8_Template(rf, ctx) { if (rf & 1) {
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 34);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_10_a_8_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r38); const ctx_r37 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r37.hideNotificationSentView()); });
    i0.ɵɵtext(1, "Hide");
    i0.ɵɵelementEnd();
} }
function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_10_Template(rf, ctx) { if (rf & 1) {
    const _r41 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 16)(1, "a", 34);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_10_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r41); const notification_r23 = i0.ɵɵnextContext().$implicit; const ctx_r39 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r39.putResend(notification_r23)); });
    i0.ɵɵtext(2, "Resend");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, "\u00A0\u00A0|\u00A0\u00A0");
    i0.ɵɵelementStart(4, "a", 34);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_10_Template_a_click_4_listener() { i0.ɵɵrestoreView(_r41); const notification_r23 = i0.ɵɵnextContext().$implicit; const ctx_r42 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r42.gotoEditAddressDetails(notification_r23)); });
    i0.ɵɵtext(5, "Edit details");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6, "\u00A0\u00A0|\u00A0\u00A0");
    i0.ɵɵtemplate(7, RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_10_a_7_Template, 2, 0, "a", 35);
    i0.ɵɵtemplate(8, RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_10_a_8_Template, 2, 0, "a", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r24 = i0.ɵɵnextContext().index;
    const ctx_r27 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", !ctx_r27.notificationSentView || i_r24 != ctx_r27.notificationSentViewIndex);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", i_r24 === ctx_r27.notificationSentViewIndex && ctx_r27.notificationSentView);
} }
function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_11_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r49 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 34);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_11_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r49); const i_r24 = i0.ɵɵnextContext(2).index; const ctx_r47 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r47.showNotificationSentView(i_r24)); });
    i0.ɵɵtext(1, "View");
    i0.ɵɵelementEnd();
} }
function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_11_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r51 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 34);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_11_a_2_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r51); const ctx_r50 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r50.hideNotificationSentView()); });
    i0.ɵɵtext(1, "Hide");
    i0.ɵɵelementEnd();
} }
function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 16);
    i0.ɵɵtemplate(1, RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_11_a_1_Template, 2, 0, "a", 35);
    i0.ɵɵtemplate(2, RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_11_a_2_Template, 2, 0, "a", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r24 = i0.ɵɵnextContext().index;
    const ctx_r28 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r28.notificationSentView || i_r24 != ctx_r28.notificationSentViewIndex);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", i_r24 === ctx_r28.notificationSentViewIndex && ctx_r28.notificationSentView);
} }
function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_tr_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 36);
    i0.ɵɵelement(2, "app-notification-preview", 37);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const notification_r23 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("previewJourney", "Notifications sent")("notificationSent", notification_r23 == null ? null : notification_r23.sent_notification);
} }
function RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "tr", 6)(2, "td", 16);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 16);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 32);
    i0.ɵɵtemplate(8, RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_div_8_Template, 5, 1, "div", 0);
    i0.ɵɵtemplate(9, RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_div_9_Template, 5, 5, "div", 0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_10_Template, 9, 2, "td", 33);
    i0.ɵɵtemplate(11, RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_td_11_Template, 3, 2, "td", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_tr_12_Template, 3, 2, "tr", 0);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const notification_r23 = ctx.$implicit;
    const i_r24 = ctx.index;
    const ctx_r22 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 7, notification_r23.date_created, "dd MMMM yyyy HH:mm:ss"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r22.orderParty);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", (notification_r23 == null ? null : notification_r23.notification_type) === "EMAIL");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (notification_r23 == null ? null : notification_r23.notification_type) === "LETTER");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", i_r24 === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", i_r24 > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", i_r24 === ctx_r22.notificationSentViewIndex && ctx_r22.notificationSentView);
} }
function RefundStatusComponent_ng_container_2_tbody_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 14);
    i0.ɵɵtemplate(1, RefundStatusComponent_ng_container_2_tbody_46_ng_container_1_Template, 13, 10, "ng-container", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r18.notificationList);
} }
function RefundStatusComponent_ng_container_2_tbody_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 14)(1, "tr", 6)(2, "td", 38);
    i0.ɵɵtext(3, "No record found ... ");
    i0.ɵɵelementEnd()()();
} }
function RefundStatusComponent_ng_container_2_div_52_tbody_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 14)(1, "tr", 6)(2, "td", 16);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td", 16);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 16);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 16);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const refundStatusHistory_r55 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(refundStatusHistory_r55.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(6, 4, refundStatusHistory_r55.date_created, "dd MMMM yyyy HH:mm:ss"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(refundStatusHistory_r55.created_by);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(refundStatusHistory_r55.notes);
} }
function RefundStatusComponent_ng_container_2_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "table", 4)(2, "thead", 5)(3, "tr", 6)(4, "td", 28);
    i0.ɵɵtext(5, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 29);
    i0.ɵɵtext(7, "Date and time");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 30);
    i0.ɵɵtext(9, "Users");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 30);
    i0.ɵɵtext(11, "Notes");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(12, RefundStatusComponent_ng_container_2_div_52_tbody_12_Template, 11, 7, "tbody", 39);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("ngForOf", ctx_r20.refundStatusHistories);
} }
function RefundStatusComponent_ng_container_2_ng_container_53_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r59 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "br");
    i0.ɵɵelementStart(2, "button", 40);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_2_ng_container_53_div_1_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r59); const ctx_r58 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r58.gotoReviewAndReSubmitPage()); });
    i0.ɵɵtext(3, "Change refund details");
    i0.ɵɵelementEnd()();
} }
function RefundStatusComponent_ng_container_2_ng_container_53_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r61 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "br");
    i0.ɵɵelementStart(2, "button", 41);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_2_ng_container_53_div_2_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r61); const ctx_r60 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r60.goToRefundProcessComponent(ctx_r60.refundlist.refund_reference, ctx_r60.refundlist)); });
    i0.ɵɵtext(3, "Process refund");
    i0.ɵɵelementEnd()();
} }
function RefundStatusComponent_ng_container_2_ng_container_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, RefundStatusComponent_ng_container_2_ng_container_53_div_1_Template, 4, 0, "div", 0);
    i0.ɵɵtemplate(2, RefundStatusComponent_ng_container_2_ng_container_53_div_2_Template, 4, 0, "div", 0);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r21 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r21.refundButtonState === "Update required");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r21.isProcessRefund && !ctx_r21.isLastUpdatedByCurrentUser && ctx_r21.refundButtonState === "Sent for approval");
} }
function RefundStatusComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r63 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 20)(2, "ol", 21)(3, "li", 22)(4, "a", 23);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_2_Template_a_click_4_listener() { i0.ɵɵrestoreView(_r63); const ctx_r62 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r62.loadRefundListPage()); });
    i0.ɵɵtext(5, "Back");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(6, "h2", 24);
    i0.ɵɵtext(7, "Refund details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "table")(9, "tbody")(10, "tr", 25)(11, "td", 26);
    i0.ɵɵtext(12, "Refund reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "tr", 25)(16, "td", 26);
    i0.ɵɵtext(17, "Payment to be refunded");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "tr", 25)(21, "td", 26);
    i0.ɵɵtext(22, "Reason for refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "td");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "tr", 25)(26, "td", 26);
    i0.ɵɵtext(27, "Amount refunded");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "td");
    i0.ɵɵtext(29);
    i0.ɵɵpipe(30, "number");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(31, "div");
    i0.ɵɵelement(32, "br");
    i0.ɵɵelementStart(33, "h2", 27);
    i0.ɵɵtext(34, "Notifications sent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "table", 4)(36, "thead", 5)(37, "tr", 6)(38, "td", 28);
    i0.ɵɵtext(39, "Date and time");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "td", 29);
    i0.ɵɵtext(41, "Sent to");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "td", 30);
    i0.ɵɵtext(43, "Sent via");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "td", 30);
    i0.ɵɵtext(45, "Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(46, RefundStatusComponent_ng_container_2_tbody_46_Template, 2, 1, "tbody", 13);
    i0.ɵɵtemplate(47, RefundStatusComponent_ng_container_2_tbody_47_Template, 4, 0, "tbody", 13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "div");
    i0.ɵɵelement(49, "br");
    i0.ɵɵelementStart(50, "h2", 27);
    i0.ɵɵtext(51, "Refund status history");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(52, RefundStatusComponent_ng_container_2_div_52_Template, 13, 1, "div", 0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(53, RefundStatusComponent_ng_container_2_ng_container_53_Template, 3, 2, "ng-container", 0);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵtextInterpolate(ctx_r2.refundlist == null ? null : ctx_r2.refundlist.refund_reference);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.refundlist == null ? null : ctx_r2.refundlist.payment_reference);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.refundlist == null ? null : ctx_r2.refundlist.reason);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("\u00A3", i0.ɵɵpipeBind2(30, 8, ctx_r2.refundlist == null ? null : ctx_r2.refundlist.amount, ".2"), "");
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("ngIf", ctx_r2.notificationList);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r2.notificationList);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r2.refundStatusHistories);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.viewName === "refundview" && !ctx_r2.isFromPayBubble && !ctx_r2.isResendOperationSuccess && !ctx_r2.isEditDetailsClicked);
} }
function RefundStatusComponent_ng_container_3_a_25_Template(rf, ctx) { if (rf & 1) {
    const _r73 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 55);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_3_a_25_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r73); const ctx_r72 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r72.gotoRefundReasonPage(ctx_r72.refundlist == null ? null : ctx_r72.refundlist.reason)); });
    i0.ɵɵtext(1, "Change");
    i0.ɵɵelementEnd();
} }
function RefundStatusComponent_ng_container_3_a_32_Template(rf, ctx) { if (rf & 1) {
    const _r75 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 55);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_3_a_32_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r75); const ctx_r74 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r74.gotoAmountPage()); });
    i0.ɵɵtext(1, "Change");
    i0.ɵɵelementEnd();
} }
function RefundStatusComponent_ng_container_3_div_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 56)(1, "strong");
    i0.ɵɵtext(2, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r66 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r66.refundlist == null ? null : ctx_r66.refundlist.contact_details == null ? null : ctx_r66.refundlist.contact_details.email == null ? null : ctx_r66.refundlist.contact_details.email.trim(), " ");
} }
function RefundStatusComponent_ng_container_3_div_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 56)(1, "strong");
    i0.ɵɵtext(2, "Post");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r67 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate5(" ", ctx_r67.refundlist == null ? null : ctx_r67.refundlist.contact_details == null ? null : ctx_r67.refundlist.contact_details.address_line == null ? null : ctx_r67.refundlist.contact_details.address_line.trim(), " ", ctx_r67.refundlist == null ? null : ctx_r67.refundlist.contact_details == null ? null : ctx_r67.refundlist.contact_details.city == null ? null : ctx_r67.refundlist.contact_details.city.trim(), " ", ctx_r67.refundlist == null ? null : ctx_r67.refundlist.contact_details == null ? null : ctx_r67.refundlist.contact_details.county == null ? null : ctx_r67.refundlist.contact_details.county.trim(), " ", ctx_r67.refundlist == null ? null : ctx_r67.refundlist.contact_details == null ? null : ctx_r67.refundlist.contact_details.country == null ? null : ctx_r67.refundlist.contact_details.country.trim(), " ", ctx_r67.refundlist == null ? null : ctx_r67.refundlist.contact_details == null ? null : ctx_r67.refundlist.contact_details.postal_code == null ? null : ctx_r67.refundlist.contact_details.postal_code.trim(), " ");
} }
function RefundStatusComponent_ng_container_3_a_44_Template(rf, ctx) { if (rf & 1) {
    const _r77 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 57);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_3_a_44_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r77); const ctx_r76 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r76.gotoEditDetailsPage(ctx_r76.refundlist == null ? null : ctx_r76.refundlist.contact_details, "reviewandsubmitEditview")); });
    i0.ɵɵtext(1, " Change ");
    i0.ɵɵelementEnd();
} }
function RefundStatusComponent_ng_container_3_a_50_Template(rf, ctx) { if (rf & 1) {
    const _r79 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 57);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_3_a_50_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r79); const ctx_r78 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r78.showNotificationPreview()); });
    i0.ɵɵtext(1, " Preview ");
    i0.ɵɵelementEnd();
} }
function RefundStatusComponent_ng_container_3_a_51_Template(rf, ctx) { if (rf & 1) {
    const _r81 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 57);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_3_a_51_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r81); const ctx_r80 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r80.hideNotificationPreview()); });
    i0.ɵɵtext(1, " Hide Preview ");
    i0.ɵɵelementEnd();
} }
function RefundStatusComponent_ng_container_3_app_notification_preview_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-notification-preview", 58);
} if (rf & 2) {
    const ctx_r71 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("paymentReference", ctx_r71.refundlist == null ? null : ctx_r71.refundlist.payment_reference)("payment", ctx_r71.paymentObj)("contactDetails", ctx_r71.refundlist == null ? null : ctx_r71.refundlist.contact_details)("refundReason", ctx_r71.refundlist == null ? null : ctx_r71.refundlist.reason_code)("refundAmount", ctx_r71.changedAmount ? ctx_r71.changedAmount : ctx_r71.refundlist == null ? null : ctx_r71.refundlist.amount)("refundReference", ctx_r71.refundlist == null ? null : ctx_r71.refundlist.refund_reference);
} }
function RefundStatusComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r83 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 42)(2, "h1", 43);
    i0.ɵɵtext(3, "Check your answers");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "table", 4)(5, "tr", 6)(6, "td", 44);
    i0.ɵɵtext(7, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 45);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "tr", 6)(11, "td", 44);
    i0.ɵɵtext(12, "Reason for return");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 45);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "tr", 6)(16, "td", 44);
    i0.ɵɵtext(17, "Refund reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td", 45);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "tr", 6)(21, "td", 44);
    i0.ɵɵtext(22, "Reason for refund");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "td", 45);
    i0.ɵɵtext(24);
    i0.ɵɵtemplate(25, RefundStatusComponent_ng_container_3_a_25_Template, 2, 0, "a", 46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "tr", 6)(27, "td", 44);
    i0.ɵɵtext(28, "Refund amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "td", 45);
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "number");
    i0.ɵɵtemplate(32, RefundStatusComponent_ng_container_3_a_32_Template, 2, 0, "a", 46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "tr", 6)(34, "td", 44);
    i0.ɵɵtext(35, "Send to");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "td", 45);
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "tr", 6)(39, "td", 44);
    i0.ɵɵtext(40, "Send via");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "td", 16);
    i0.ɵɵtemplate(42, RefundStatusComponent_ng_container_3_div_42_Template, 5, 1, "div", 47);
    i0.ɵɵtemplate(43, RefundStatusComponent_ng_container_3_div_43_Template, 5, 5, "div", 47);
    i0.ɵɵtemplate(44, RefundStatusComponent_ng_container_3_a_44_Template, 2, 0, "a", 48);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "tr", 6)(46, "td", 44);
    i0.ɵɵtext(47, "Notification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "td", 45);
    i0.ɵɵtext(49);
    i0.ɵɵtemplate(50, RefundStatusComponent_ng_container_3_a_50_Template, 2, 0, "a", 49);
    i0.ɵɵtemplate(51, RefundStatusComponent_ng_container_3_a_51_Template, 2, 0, "a", 49);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(52, RefundStatusComponent_ng_container_3_app_notification_preview_52_Template, 1, 6, "app-notification-preview", 50);
    i0.ɵɵelementStart(53, "div", 51)(54, "button", 52);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_3_Template_button_click_54_listener($event) { i0.ɵɵrestoreView(_r83); const ctx_r82 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r82.gotoReviewDetailsPage($event)); });
    i0.ɵɵtext(55, " Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "button", 53);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_3_Template_button_click_56_listener() { i0.ɵɵrestoreView(_r83); const ctx_r84 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r84.gotoReviewRefundConfirmationPage()); });
    i0.ɵɵtext(57, " Submit refund ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(58, "p")(59, "a", 54);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_3_Template_a_click_59_listener() { i0.ɵɵrestoreView(_r83); const ctx_r85 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r85.loadRefundListPage()); });
    i0.ɵɵtext(60, "Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", ctx_r3.refundlist == null ? null : ctx_r3.refundlist.payment_reference, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.refundreason);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r3.refundlist == null ? null : ctx_r3.refundlist.refund_reference, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r3.refundlist == null ? null : ctx_r3.refundlist.reason == null ? null : ctx_r3.refundlist.reason.trim(), " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r3.refundlist == null ? null : ctx_r3.refundlist.reason) !== "Retrospective remission" && (ctx_r3.refundlist == null ? null : ctx_r3.refundlist.reason) !== "Overpayment");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("\u00A3", ctx_r3.changedAmount ? ctx_r3.changedAmount : i0.ɵɵpipeBind2(31, 16, ctx_r3.refundlist == null ? null : ctx_r3.refundlist.amount, ".2"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", (ctx_r3.refundlist == null ? null : ctx_r3.refundlist.reason) !== "Overpayment");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r3.orderParty, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", (ctx_r3.refundlist == null ? null : ctx_r3.refundlist.contact_details == null ? null : ctx_r3.refundlist.contact_details.notification_type) === "EMAIL");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r3.refundlist == null ? null : ctx_r3.refundlist.contact_details == null ? null : ctx_r3.refundlist.contact_details.notification_type) === "LETTER");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r3.refundlist == null ? null : ctx_r3.refundlist.contact_details) != null);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r3.templateInstructionType, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r3.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.notificationPreview);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r3.isRefundBtnDisabled);
} }
function RefundStatusComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    const _r88 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 59, 60);
    i0.ɵɵelementStart(3, "h1", 24);
    i0.ɵɵtext(4, "Edit contact details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2", 61);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdHyphens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 62);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "ccpay-contact-details", 63);
    i0.ɵɵlistener("assignContactDetailsInFefundsList", function RefundStatusComponent_ng_container_4_Template_ccpay_contact_details_assignContactDetailsInFefundsList_10_listener($event) { i0.ɵɵrestoreView(_r88); const ctx_r87 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r87.getContactDetailsForRefundList($event)); })("redirectToIssueRefund", function RefundStatusComponent_ng_container_4_Template_ccpay_contact_details_redirectToIssueRefund_10_listener($event) { i0.ɵɵrestoreView(_r88); const ctx_r89 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r89.gotoRefundReviewAndSubmitViewPageCancelBtnClicked($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p")(12, "a", 64);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_4_Template_a_click_12_listener() { i0.ɵɵrestoreView(_r88); const ctx_r90 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r90.loadRefundListPage()); });
    i0.ɵɵtext(13, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Case reference: ", i0.ɵɵpipeBind1(7, 4, ctx_r4.ccdCaseNumber), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Refund reference: ", ctx_r4.refundlist == null ? null : ctx_r4.refundlist.refund_reference, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("isEditOperationInRefundList", ctx_r4.isEditDetailsClicked)("addressObj", ctx_r4.notification);
} }
function RefundStatusComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    const _r92 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccpay-add-remission", 65);
    i0.ɵɵlistener("refundListReason", function RefundStatusComponent_ng_container_5_Template_ccpay_add_remission_refundListReason_1_listener($event) { i0.ɵɵrestoreView(_r92); const ctx_r91 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r91.getRefundListReason($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("isFromRefundListPage", true)("viewCompStatus", ctx_r5.viewName)("isRefundRemission", true)("isFromRefundStatusPage", true)("changeRefundReason", ctx_r5.changeRefundReason)("ccdCaseNumber", ctx_r5.ccdCaseNumber)("refundPaymentReference", ctx_r5.refundlist == null ? null : ctx_r5.refundlist.payment_reference);
} }
function RefundStatusComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    const _r94 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccpay-add-remission", 66);
    i0.ɵɵlistener("refundListAmount", function RefundStatusComponent_ng_container_6_Template_ccpay_add_remission_refundListAmount_1_listener($event) { i0.ɵɵrestoreView(_r94); const ctx_r93 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r93.getRefundAmount($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("isFromRefundListPage", true)("viewCompStatus", ctx_r6.viewName)("isRefundRemission", true)("ccdCaseNumber", ctx_r6.ccdCaseNumber)("refundPaymentReference", ctx_r6.refundlist == null ? null : ctx_r6.refundlist.payment_reference);
} }
function RefundStatusComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r96 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccpay-add-remission", 67);
    i0.ɵɵlistener("refundListAmount", function RefundStatusComponent_ng_container_7_Template_ccpay_add_remission_refundListAmount_1_listener($event) { i0.ɵɵrestoreView(_r96); const ctx_r95 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r95.getRefundAmount($event)); })("refundFees", function RefundStatusComponent_ng_container_7_Template_ccpay_add_remission_refundFees_1_listener($event) { i0.ɵɵrestoreView(_r96); const ctx_r97 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r97.getRefundFees($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("isFromRefundListPage", true)("viewCompStatus", ctx_r7.viewName)("isRefundRemission", true)("isFromServiceRequestPage", true)("ccdCaseNumber", ctx_r7.ccdCaseNumber)("refundPaymentReference", ctx_r7.refundlist == null ? null : ctx_r7.refundlist.payment_reference)("isFromRefundStatusPage", true);
} }
function RefundStatusComponent_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    const _r99 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 68)(2, "div")(3, "div", 69)(4, "h1", 70);
    i0.ɵɵtext(5, " Refund submitted ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 71)(7, "p", 72)(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(10, "h2", 24);
    i0.ɵɵtext(11, "What happens next");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p", 73);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p", 73)(16, "a", 74);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_8_Template_a_click_16_listener() { i0.ɵɵrestoreView(_r99); const ctx_r98 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r98.loadRefundListPage()); });
    i0.ɵɵtext(17, "Return to case");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("Refund reference:", ctx_r8.refundReference, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" A refund request for ", i0.ɵɵpipeBind4(14, 2, ctx_r8.refundAmount, "GBP", "symbol-narrow", "1.2-2"), " has been created and will be passed to a team leader to approve. ");
} }
function RefundStatusComponent_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    const _r101 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 68)(2, "div")(3, "div", 69)(4, "h1", 70);
    i0.ɵɵtext(5, " Notification sent ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 71)(7, "p", 72)(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(10, "p", 73)(11, "a", 74);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_9_Template_a_click_11_listener() { i0.ɵɵrestoreView(_r101); const ctx_r100 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r100.loadRefundListPage()); });
    i0.ɵɵtext(12, "Return to case");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("Refund reference: ", ctx_r9.refundlist == null ? null : ctx_r9.refundlist.refund_reference, " ");
} }
function RefundStatusComponent_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    const _r104 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 59, 60);
    i0.ɵɵelementStart(3, "h1", 24);
    i0.ɵɵtext(4, "Edit contact details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2", 61);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdHyphens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 62);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "ccpay-contact-details", 63);
    i0.ɵɵlistener("assignContactDetailsInFefundsList", function RefundStatusComponent_ng_container_10_Template_ccpay_contact_details_assignContactDetailsInFefundsList_10_listener($event) { i0.ɵɵrestoreView(_r104); const ctx_r103 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r103.getContactDetails($event)); })("redirectToIssueRefund", function RefundStatusComponent_ng_container_10_Template_ccpay_contact_details_redirectToIssueRefund_10_listener($event) { i0.ɵɵrestoreView(_r104); const ctx_r105 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r105.gotoRefundViewPageCancelBtnClicked($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p")(12, "a", 64);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_10_Template_a_click_12_listener() { i0.ɵɵrestoreView(_r104); const ctx_r106 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r106.loadRefundListPage()); });
    i0.ɵɵtext(13, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Case reference: ", i0.ɵɵpipeBind1(7, 4, ctx_r10.ccdCaseNumber), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Refund reference: ", ctx_r10.refundlist == null ? null : ctx_r10.refundlist.refund_reference, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("isEditOperationInRefundList", ctx_r10.isEditDetailsClicked)("addressObj", ctx_r10.notification);
} }
function RefundStatusComponent_ng_container_11_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 56)(1, "strong");
    i0.ɵɵtext(2, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r108 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r108.addressDetails == null ? null : ctx_r108.addressDetails.email == null ? null : ctx_r108.addressDetails.email.trim(), " ");
} }
function RefundStatusComponent_ng_container_11_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 56)(1, "strong");
    i0.ɵɵtext(2, "Post");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r109 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate5(" ", ctx_r109.addressDetails == null ? null : ctx_r109.addressDetails.address_line == null ? null : ctx_r109.addressDetails.address_line.trim(), " ", ctx_r109.addressDetails == null ? null : ctx_r109.addressDetails.city == null ? null : ctx_r109.addressDetails.city.trim(), " ", ctx_r109.addressDetails == null ? null : ctx_r109.addressDetails.county == null ? null : ctx_r109.addressDetails.county.trim(), " ", ctx_r109.addressDetails == null ? null : ctx_r109.addressDetails.country == null ? null : ctx_r109.addressDetails.country.trim(), " ", ctx_r109.addressDetails == null ? null : ctx_r109.addressDetails.postal_code == null ? null : ctx_r109.addressDetails.postal_code.trim(), " ");
} }
function RefundStatusComponent_ng_container_11_a_28_Template(rf, ctx) { if (rf & 1) {
    const _r114 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 57);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_11_a_28_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r114); const ctx_r113 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r113.showNotificationPreview()); });
    i0.ɵɵtext(1, " Preview ");
    i0.ɵɵelementEnd();
} }
function RefundStatusComponent_ng_container_11_a_29_Template(rf, ctx) { if (rf & 1) {
    const _r116 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 57);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_11_a_29_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r116); const ctx_r115 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r115.hideNotificationPreview()); });
    i0.ɵɵtext(1, " Hide Preview ");
    i0.ɵɵelementEnd();
} }
function RefundStatusComponent_ng_container_11_app_notification_preview_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-notification-preview", 58);
} if (rf & 2) {
    const ctx_r112 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("paymentReference", ctx_r112.refundlist == null ? null : ctx_r112.refundlist.payment_reference)("payment", ctx_r112.paymentObj)("contactDetails", ctx_r112.addressDetails)("refundReason", ctx_r112.refundlist == null ? null : ctx_r112.refundlist.reason_code)("refundAmount", ctx_r112.refundlist == null ? null : ctx_r112.refundlist.amount)("refundReference", ctx_r112.refundlist == null ? null : ctx_r112.refundlist.refund_reference);
} }
function RefundStatusComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    const _r118 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 75, 60);
    i0.ɵɵelementStart(3, "h1", 24);
    i0.ɵɵtext(4, "Check your answers");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "dl", 76)(6, "div", 77)(7, "dt", 78);
    i0.ɵɵtext(8, " Refund reference ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "dd", 79);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "span", 80);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 77)(13, "dt", 78);
    i0.ɵɵtext(14, " Send via ");
    i0.ɵɵelement(15, "br");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "dd", 79);
    i0.ɵɵtemplate(17, RefundStatusComponent_ng_container_11_div_17_Template, 5, 1, "div", 47);
    i0.ɵɵtemplate(18, RefundStatusComponent_ng_container_11_div_18_Template, 5, 5, "div", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "dd", 80)(20, "a", 81);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_11_Template_a_click_20_listener() { i0.ɵɵrestoreView(_r118); const ctx_r117 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r117.gotoEditDetailsPage(ctx_r117.addressDetails, "refundEditView")); });
    i0.ɵɵtext(21, " Change ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "div", 77)(23, "dt", 78);
    i0.ɵɵtext(24, " Notification ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "dd", 79);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span", 80);
    i0.ɵɵtemplate(28, RefundStatusComponent_ng_container_11_a_28_Template, 2, 0, "a", 49);
    i0.ɵɵtemplate(29, RefundStatusComponent_ng_container_11_a_29_Template, 2, 0, "a", 49);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(30, RefundStatusComponent_ng_container_11_app_notification_preview_30_Template, 1, 6, "app-notification-preview", 50);
    i0.ɵɵelementStart(31, "div", 51)(32, "button", 52);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_11_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r118); const ctx_r119 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r119.gotoEditDetailsPage(ctx_r119.addressDetails, "refundEditView")); });
    i0.ɵɵtext(33, " Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "button", 82);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_11_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r118); const ctx_r120 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r120.submitEditDetail()); });
    i0.ɵɵtext(35, " Send notification ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "p")(37, "a", 64);
    i0.ɵɵlistener("click", function RefundStatusComponent_ng_container_11_Template_a_click_37_listener() { i0.ɵɵrestoreView(_r118); const ctx_r121 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r121.loadRefundListPage()); });
    i0.ɵɵtext(38, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1(" ", ctx_r11.refundlist == null ? null : ctx_r11.refundlist.refund_reference, " ");
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", (ctx_r11.addressDetails == null ? null : ctx_r11.addressDetails.notification_type) === "EMAIL");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r11.addressDetails == null ? null : ctx_r11.addressDetails.notification_type) === "LETTER");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1(" ", ctx_r11.templateInstructionType, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r11.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.notificationPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.notificationPreview);
} }
export class RefundStatusComponent {
    formBuilder;
    refundService;
    notificationService;
    paymentLibComponent;
    OrderslistService;
    paymentViewService;
    LOGGEDINUSERROLES = [];
    API_ROOT;
    ccdCaseNumber;
    isTurnOff;
    orderParty;
    refundStatusForm;
    selectedRefundReason;
    rejectedRefundList = [];
    notificationList;
    notification;
    approvalStatus = 'Sent for approval';
    rejectStatus = 'Update required';
    errorMessage = null;
    viewName;
    refundReason;
    refundlist;
    bsPaymentDcnNumber;
    isCallFromRefundList;
    refundButtonState = '';
    isAmountEmpty = false;
    isReasonEmpty = false;
    amountHasError = false;
    isRemissionLessThanFeeError = false;
    refundHasError = false;
    refundReasons = [];
    refundStatusHistories;
    refundNotifications;
    isResendOperationSuccess = false;
    isEditDetailsClicked = false;
    isEditAddressDeatilsClicked = false;
    addressDetails;
    refundReference;
    refundAmount;
    refundCode;
    isRefundBtnDisabled = true;
    isFromPayBubble = false;
    oldRefundReason;
    refundreason;
    navigationpage;
    isLastUpdatedByCurrentUser = true;
    isProcessRefund = false;
    changedAmount;
    isRemissionsMatch;
    payment;
    changeRefundReason;
    fees;
    refundFees;
    paymentObj;
    templateInstructionType;
    notificationSentViewIndex = -1;
    notificationPreview = false;
    notificationSentView = false;
    allowedRolesToAccessRefund = ['payments-refund-approver', 'payments-refund', 'payments'];
    constructor(formBuilder, refundService, notificationService, paymentLibComponent, OrderslistService, paymentViewService) {
        this.formBuilder = formBuilder;
        this.refundService = refundService;
        this.notificationService = notificationService;
        this.paymentLibComponent = paymentLibComponent;
        this.OrderslistService = OrderslistService;
        this.paymentViewService = paymentViewService;
    }
    ngOnInit() {
        this.resetRemissionForm([false, false, false, false], 'All');
        this.bsPaymentDcnNumber = this.paymentLibComponent.bspaymentdcn;
        this.isCallFromRefundList = this.paymentLibComponent.isCallFromRefundList;
        if (this.API_ROOT == 'api/payment-history') {
            this.isFromPayBubble = true;
        }
        if (this.paymentLibComponent.isRefundStatusView) {
            this.viewName = 'refundview';
            this.OrderslistService.getRefundView().subscribe((data) => this.refundlist = data);
            this.OrderslistService.getCCDCaseNumberforRefund.subscribe((data) => this.ccdCaseNumber = data);
        }
        else {
            this.viewName = 'refundstatuslist';
            this.refundService.getRefundStatusList(this.ccdCaseNumber).subscribe(refundList => {
                this.rejectedRefundList = refundList['refund_list'];
            }),
                (error) => {
                    this.errorMessage = error.replace(/"/g, "");
                };
        }
        this.refundStatusForm = this.formBuilder.group({
            amount: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')
            ])),
            refundReason: new FormControl('', Validators.compose([Validators.required])),
            reason: new FormControl()
        });
        if (this.refundlist !== undefined) {
            this.getRefundsNotification();
            this.getRefundsStatusHistoryList();
            if (this.LOGGEDINUSERROLES.some(i => i.includes('payments-refund-approver'))) {
                this.isProcessRefund = true;
                this.refundButtonState = this.refundlist.refund_status.name;
                return;
            }
            if (this.LOGGEDINUSERROLES.some(i => i.includes('payments-refund'))) {
                this.isProcessRefund = false;
                this.refundButtonState = this.refundlist.refund_status.name;
            }
        }
    }
    getRefundsStatusHistoryList() {
        if (this.refundlist !== undefined) {
            this.refundService.getRefundStatusHistory(this.refundlist.refund_reference).subscribe(statusHistoryList => {
                this.refundStatusHistories = statusHistoryList.status_history_dto_list;
                this.isLastUpdatedByCurrentUser = statusHistoryList.last_updated_by_current_user;
            }),
                (error) => {
                    this.errorMessage = error.replace(/"/g, "");
                };
        }
    }
    getRefundsNotification() {
        this.notificationService.getRefundNotification(this.refundlist.refund_reference).subscribe(refundsNotification => {
            this.notificationList = refundsNotification['notifications'];
        }),
            (error) => {
                this.errorMessage = error.replace(/"/g, "");
            };
    }
    goToRefundView(refundlist, navigationpage) {
        this.OrderslistService.setRefundView(refundlist);
        this.OrderslistService.setCCDCaseNumber(this.ccdCaseNumber);
        this.paymentLibComponent.viewName = 'refundstatuslist';
        this.paymentLibComponent.isRefundStatusView = true;
        this.refundlist = refundlist;
        this.OrderslistService.setnavigationPage(navigationpage);
    }
    loadCaseTransactionPage() {
        this.OrderslistService.setnavigationPage('casetransactions');
        this.OrderslistService.setisFromServiceRequestPage(false);
        this.paymentLibComponent.viewName = 'case-transactions';
        this.paymentLibComponent.ISBSENABLE = true;
        this.paymentLibComponent.isRefundStatusView = false;
    }
    loadRefundListPage() {
        this.OrderslistService.getnavigationPageValue().subscribe((data) => this.navigationpage = data);
        if (this.navigationpage === 'casetransactions') {
            this.loadCaseTransactionPage();
        }
        else {
            this.paymentLibComponent.viewName = 'refund-list';
        }
    }
    gotoReviewDetailsPage(event) {
        // event.preventDefault();
        this.errorMessage = false;
        this.paymentLibComponent.isRefundStatusView = true;
        this.ngOnInit();
    }
    gotoReviewAndReSubmitPage() {
        this.viewName = 'reviewandsubmitview';
        this.getTemplateInstructionType(this.paymentObj, this.refundlist.payment_reference);
        this.oldRefundReason = this.refundlist.reason;
        this.changedAmount = this.refundlist.amount;
        this.refundreason = this.refundStatusHistories.filter(data => data.status.toLowerCase() === 'update required')[0].notes;
        this.refundService.getRefundReasons().subscribe(refundReasons => {
            this.refundReasons = refundReasons;
        });
    }
    gotoRefundReasonPage(refundReason) {
        this.isRefundBtnDisabled = false;
        this.paymentLibComponent.REFUNDLIST = "true";
        this.paymentLibComponent.isFromRefundStatusPage = true;
        this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
        this.errorMessage = false;
        this.changeRefundReason = refundReason;
        this.viewName = 'issuerefundpage1';
    }
    gotoAmountPage() {
        this.errorMessage = false;
        this.paymentLibComponent.REFUNDLIST = "true";
        this.isRefundBtnDisabled = false;
        this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
        this.paymentLibComponent.isFromRefundStatusPage = true;
        if (this.refundlist.reason == 'Retrospective remission') {
            this.viewName = 'processretroremissonpage';
        }
        else {
            this.viewName = 'issuerefund';
        }
    }
    goToReviewAndSubmitView() {
        const remissionctrls = this.refundStatusForm.controls;
        if (this.refundStatusForm.dirty) {
            if (remissionctrls['amount'].value == '') {
                this.resetRemissionForm([true, false, false, false], 'amount');
            }
            else if (remissionctrls['amount'].value != '' && remissionctrls['amount'].invalid) {
                this.resetRemissionForm([false, true, false, false], 'amount');
            }
            else if (remissionctrls['reason'].value == '') {
                this.resetRemissionForm([false, false, false, true], 'reason');
            }
            else {
                this.refundlist.reason = remissionctrls['reason'].value;
                this.viewName = 'reviewandsubmitview';
            }
        }
    }
    resetRemissionForm(val, field) {
        if (field === 'All') {
            this.isAmountEmpty = val[0];
            this.amountHasError = val[1];
            this.isRemissionLessThanFeeError = val[2];
            this.isReasonEmpty = val[3];
        }
        else if (field === 'amount' || field === 'All') {
            this.isAmountEmpty = val[0];
            this.amountHasError = val[1];
            this.isRemissionLessThanFeeError = val[2];
        }
        else if (field === 'reason' || field === 'All') {
            this.isReasonEmpty = val[3];
        }
    }
    selectRadioButton(key, value) {
        this.refundHasError = false;
        this.selectedRefundReason = key;
        if (key === 'Other') {
            this.refundHasError = false;
            this.refundReason = key;
        }
    }
    getRefundListReason(refundListReason) {
        if (this.paymentLibComponent.isFromRefundStatusPage && !this.paymentLibComponent.iscancelClicked) {
            if (refundListReason.reason != undefined && refundListReason.reason != null && refundListReason.reason != this.refundlist.reason) {
                this.refundlist.reason = refundListReason.reason;
                this.refundlist.reason_code = refundListReason.code.split('-')[0].trim();
                this.refundlist.code = refundListReason.code;
                this.refundCode = refundListReason.code;
            }
        }
        else {
            this.isRefundBtnDisabled = true;
        }
        this.notificationPreview = false;
        this.viewName = 'reviewandsubmitview';
        this.paymentLibComponent.CCD_CASE_NUMBER = this.ccdCaseNumber;
    }
    getRefundAmount(amount) {
        if (this.paymentLibComponent.isFromRefundStatusPage && !this.paymentLibComponent.iscancelClicked) {
            if (amount > 0) {
                this.changedAmount = amount;
                // this.refundlist.amount = amount;
            }
        }
        else {
            this.isRefundBtnDisabled = true;
        }
        this.notificationPreview = false;
        this.viewName = 'reviewandsubmitview';
        this.paymentLibComponent.CCD_CASE_NUMBER = this.ccdCaseNumber;
    }
    getRefundFees(fees) {
        this.fees = fees;
        this.refundFees = this.fees.map(obj => ({
            fee_id: obj.id,
            code: obj.code,
            version: obj.version,
            volume: obj.updated_volume ? obj.updated_volume : obj.volume,
            refund_amount: obj.refund_amount
        }));
    }
    gotoReviewRefundConfirmationPage() {
        // if (this.oldRefundReason === this.refundlist.reason) {
        //   this.refundCode = '';
        // }
        if (this.refundFees === undefined) {
            this.refundFees = this.refundlist['refund_fees'];
        }
        if (this.refundlist.reason == 'Retrospective remission') {
            this.refundFees[0].refund_amount = this.changedAmount;
        }
        this.refundCode = this.refundlist.code;
        const resubmitRequest = new IResubmitRefundRequest(this.refundCode, this.changedAmount, this.refundlist.contact_details, this.refundFees);
        this.refundService.patchResubmitRefund(resubmitRequest, this.refundlist.refund_reference).subscribe(response => {
            if (JSON.parse(response)) {
                this.refundReference = JSON.parse(response).refund_reference;
                this.refundAmount = JSON.parse(response).refund_amount;
                this.viewName = 'reviewrefundconfirmationpage';
            }
        }, (error) => {
            this.errorMessage = error.replace(/"/g, "");
        });
    }
    gotoEditAddressDetails(note) {
        this.notification = note;
        this.isEditDetailsClicked = true;
        this.viewName = 'refundEditView';
    }
    getContactDetails(obj) {
        this.addressDetails = obj;
        this.getTemplateInstructionType(this.paymentObj, this.refundlist.payment_reference);
        this.notificationPreview = false;
        this.viewName = 'revieweditdetailsconfirmationpage';
    }
    getContactDetailsForRefundList(obj) {
        this.refundlist.contact_details = obj;
        this.getTemplateInstructionType(this.paymentObj, this.refundlist.payment_reference);
        this.notificationPreview = false;
        this.isEditDetailsClicked = false;
        this.isRefundBtnDisabled = false;
        this.viewName = 'reviewandsubmitview';
    }
    gotoEditDetailsPage(note, view) {
        if (note) {
            this.notification = { contact_details: note, notification_type: note.notification_type };
        }
        this.isEditDetailsClicked = true;
        this.viewName = view;
    }
    submitEditDetail() {
        this.isResendOperationSuccess = false;
        const contactDetails = this.addressDetails.notification_type === 'EMAIL' ? this.addressDetails.email :
            {
                address_line: this.addressDetails.address_line,
                city: this.addressDetails.city,
                county: this.addressDetails.county,
                country: this.addressDetails.country,
                postal_code: this.addressDetails.postal_code,
            };
        const resendRequest = new IPutNotificationRequest(contactDetails, this.addressDetails.notification_type);
        this.refundService.putResendOrEdit(resendRequest, this.refundlist.refund_reference, this.addressDetails.notification_type).subscribe((response) => {
            this.isResendOperationSuccess = response;
        }, (error) => {
            this.isResendOperationSuccess = false;
            this.errorMessage = error.replace(/"/g, "");
        });
    }
    putResend(notification) {
        this.isResendOperationSuccess = false;
        const contactDetails = notification.notification_type === 'EMAIL' ? notification.contact_details.email :
            {
                address_line: notification.contact_details.address_line,
                city: notification.contact_details.city,
                county: notification.contact_details.county,
                country: notification.contact_details.country,
                postal_code: notification.contact_details.postal_code,
            };
        const resendRequest = new IPutNotificationRequest(contactDetails, notification.notification_type);
        this.refundService.putResendOrEdit(resendRequest, this.refundlist.refund_reference, notification.notification_type).subscribe((response) => {
            this.isResendOperationSuccess = response;
        }, (error) => {
            this.isResendOperationSuccess = false;
            this.errorMessage = error.replace(/"/g, "");
        });
    }
    gotoRefundViewPageCancelBtnClicked(event) {
        event.preventDefault();
        this.isEditDetailsClicked = false;
        this.viewName = 'refundview';
    }
    gotoRefundReviewAndSubmitViewPageCancelBtnClicked(event) {
        event.preventDefault();
        this.isEditDetailsClicked = false;
        this.viewName = 'reviewandsubmitview';
    }
    goToRefundProcessComponent(refundReference, refundList) {
        this.paymentLibComponent.refundlistsource = refundList;
        this.paymentLibComponent.refundReference = refundReference;
        this.paymentLibComponent.isFromPayBubble = true;
        this.paymentLibComponent.viewName = 'process-refund';
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
    showNotificationSentView(index) {
        this.notificationSentViewIndex = index;
        this.notificationSentView = true;
    }
    hideNotificationSentView() {
        this.notificationSentViewIndex = -1;
        this.notificationSentView = false;
    }
    static ɵfac = function RefundStatusComponent_Factory(t) { return new (t || RefundStatusComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.RefundsService), i0.ɵɵdirectiveInject(i3.NotificationService), i0.ɵɵdirectiveInject(i4.PaymentLibComponent), i0.ɵɵdirectiveInject(i5.OrderslistService), i0.ɵɵdirectiveInject(i6.PaymentViewService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RefundStatusComponent, selectors: [["ccpay-refund-status"]], inputs: { LOGGEDINUSERROLES: "LOGGEDINUSERROLES", API_ROOT: "API_ROOT", ccdCaseNumber: "ccdCaseNumber", isTurnOff: "isTurnOff", orderParty: "orderParty" }, decls: 12, vars: 12, consts: [[4, "ngIf"], ["role", "group", "aria-labelledby", "failure-error-summary-heading", "tabindex", "-1", 1, "error-summary"], ["id", "failure-error-summary-heading", 1, "heading-medium", "error-summary-heading"], [1, "govuk-error-summary__body"], [1, "govuk-table"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["scope", "col", 1, "govuk-table__header", "col-16"], ["scope", "col", 1, "govuk-table__header", "col-11"], ["scope", "col", 1, "govuk-table__header", "col-18"], ["scope", "col", 1, "govuk-table__header", "col-25"], ["scope", "col", 1, "govuk-table__header", "col-24"], ["scope", "col", 1, "govuk-table__header"], ["class", "govuk-table__body", 4, "ngIf"], [1, "govuk-table__body"], ["class", "govuk-table__row", 4, "ngFor", "ngForOf"], [1, "govuk-table__cell", "whitespace-inherit"], [1, "channel", "govuk-table__cell", "whitespace-inherit"], ["href", "javascript:void(0)", 3, "click"], ["colspan", "6", 1, "govuk-table__cell"], [1, "govuk-breadcrumbs"], [1, "govuk-breadcrumbs__list"], [1, "govuk-breadcrumbs__list-item"], ["href", "javascript:void(0)", 1, "govuk-back-link", "govuk-label", 3, "click"], [1, "govuk-heading-l"], [1, "section"], [1, "bold", "tb-col-w"], [1, "govuk-heading-m"], ["scope", "col", 1, "govuk-table__header", "col-24", "whitespace-inherit"], ["scope", "col", 1, "govuk-table__header", "col-27", "whitespace-inherit"], ["scope", "col", 1, "govuk-table__header", "whitespace-inherit"], [4, "ngFor", "ngForOf"], [1, "govuk-table__cell", "whitespace-inherit", "col-40"], ["class", "govuk-table__cell whitespace-inherit", 4, "ngIf"], ["href", "Javascript:void(0);", 3, "click"], ["href", "Javascript:void(0);", 3, "click", 4, "ngIf"], ["colspan", "4", 1, "govuk-table__cell"], [3, "previewJourney", "notificationSent"], ["colspan", "4", 1, "govuk-table__cell", "whitespace-inherit"], ["class", "govuk-table__body", 4, "ngFor", "ngForOf"], ["type", "submit", 1, "button", "govuk-button--secondary", "btnmargin", 3, "click"], ["type", "submit", 1, "button", "govuk-button--secondary", 3, "click"], [1, "govuk-warning-text"], [1, "heading-large"], [1, "govuk-table__cell", "govuk-!-font-weight-bold"], [1, "govuk-table__cell"], ["class", "govuk-link right", 3, "click", 4, "ngIf"], ["class", "contactDetails-width font-size-19px", 4, "ngIf"], ["class", "govuk-link", "href", "Javascript:void(0)", "class", "govuk-link right", 3, "click", 4, "ngIf"], ["href", "Javascript:void(0)", "class", "govuk-link right", 3, "click", 4, "ngIf"], [3, "paymentReference", "payment", "contactDetails", "refundReason", "refundAmount", "refundReference", 4, "ngIf"], [1, "govuk-button-group"], [1, "govuk-button", "govuk-button--secondary", 3, "click"], ["data-module", "govuk-button", 1, "govuk-button", "button", 3, "disabled", "click"], ["href", "javascript:void(0)", "data-module", "govuk-button", 1, "govuk-link", 3, "click"], [1, "govuk-link", "right", 3, "click"], [1, "contactDetails-width", "font-size-19px"], ["href", "Javascript:void(0)", 1, "govuk-link", "right", 3, "click"], [3, "paymentReference", "payment", "contactDetails", "refundReason", "refundAmount", "refundReference"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "EDITDETAILSPAGE"], ["myInput", ""], [1, "govuk-heading-m", "govuk-font19px"], [1, "govuk-hint", "font-size-19px"], [3, "isEditOperationInRefundList", "addressObj", "assignContactDetailsInFefundsList", "redirectToIssueRefund"], ["data-module", "govuk-button", 1, "govuk-link", 3, "click"], [3, "isFromRefundListPage", "viewCompStatus", "isRefundRemission", "isFromRefundStatusPage", "changeRefundReason", "ccdCaseNumber", "refundPaymentReference", "refundListReason"], [3, "isFromRefundListPage", "viewCompStatus", "isRefundRemission", "ccdCaseNumber", "refundPaymentReference", "refundListAmount"], [3, "isFromRefundListPage", "viewCompStatus", "isRefundRemission", "isFromServiceRequestPage", "ccdCaseNumber", "refundPaymentReference", "isFromRefundStatusPage", "refundListAmount", "refundFees"], [1, "govuk-grid-row", "pagesize"], [1, "govuk-panel", "govuk-panel--confirmation"], [1, "govuk-panel__title"], [1, "govuk-panel__body"], [1, "govuk-body", "white"], [1, "govuk-body"], ["href", "javascript:void(0)", 1, "govuk-link", 3, "click"], ["type", "hidden", "id", "iFrameDrivenImageValue", "value", "EDITDETAILSCHECKANDANSWERPAGE"], [1, "govuk-summary-list"], [1, "govuk-summary-list__row", "font-size-19px"], [1, "govuk-summary-list__key"], [1, "govuk-summary-list__value"], [1, "govuk-summary-list__actions"], ["href", "Javascript:void(0)", 1, "govuk-link", 3, "click"], ["data-module", "govuk-button", 1, "govuk-button", "button", 3, "click"]], template: function RefundStatusComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, RefundStatusComponent_div_0_Template, 6, 1, "div", 0);
            i0.ɵɵtemplate(1, RefundStatusComponent_ng_container_1_Template, 17, 2, "ng-container", 0);
            i0.ɵɵtemplate(2, RefundStatusComponent_ng_container_2_Template, 54, 11, "ng-container", 0);
            i0.ɵɵtemplate(3, RefundStatusComponent_ng_container_3_Template, 61, 19, "ng-container", 0);
            i0.ɵɵtemplate(4, RefundStatusComponent_ng_container_4_Template, 14, 6, "ng-container", 0);
            i0.ɵɵtemplate(5, RefundStatusComponent_ng_container_5_Template, 2, 7, "ng-container", 0);
            i0.ɵɵtemplate(6, RefundStatusComponent_ng_container_6_Template, 2, 5, "ng-container", 0);
            i0.ɵɵtemplate(7, RefundStatusComponent_ng_container_7_Template, 2, 7, "ng-container", 0);
            i0.ɵɵtemplate(8, RefundStatusComponent_ng_container_8_Template, 18, 7, "ng-container", 0);
            i0.ɵɵtemplate(9, RefundStatusComponent_ng_container_9_Template, 13, 1, "ng-container", 0);
            i0.ɵɵtemplate(10, RefundStatusComponent_ng_container_10_Template, 14, 6, "ng-container", 0);
            i0.ɵɵtemplate(11, RefundStatusComponent_ng_container_11_Template, 39, 7, "ng-container", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "refundstatuslist" && ctx.rejectedRefundList && !ctx.isResendOperationSuccess && !ctx.isEditDetailsClicked);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "refundview" && !ctx.isResendOperationSuccess && !ctx.isEditDetailsClicked);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "reviewandsubmitview" && !ctx.isResendOperationSuccess && !ctx.isEditDetailsClicked);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "reviewandsubmitEditview" && ctx.isEditDetailsClicked);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "issuerefundpage1" && !ctx.isResendOperationSuccess && !ctx.isEditDetailsClicked);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "processretroremissonpage" && !ctx.isResendOperationSuccess && !ctx.isEditDetailsClicked);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "issuerefund" && !ctx.isResendOperationSuccess && !ctx.isEditDetailsClicked);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "reviewrefundconfirmationpage" && !ctx.isResendOperationSuccess && !ctx.isEditDetailsClicked);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.isResendOperationSuccess);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "refundEditView" && ctx.isEditDetailsClicked);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewName === "revieweditdetailsconfirmationpage" && !ctx.isResendOperationSuccess && ctx.isEditDetailsClicked);
        } }, dependencies: [i7.NgForOf, i7.NgIf, i8.ContactDetailsComponent, i9.AddRemissionComponent, i10.NotificationPreviewComponent, i7.DecimalPipe, i7.CurrencyPipe, i7.DatePipe, i11.CcdHyphensPipe], styles: [".right[_ngcontent-%COMP%]{float:right!important}.button[_ngcontent-%COMP%]{margin-bottom:3em;font-size:19px}.cancelbtn[_ngcontent-%COMP%]{font-size:19px;font-weight:400}.btnmargin[_ngcontent-%COMP%]{margin-bottom:2em}.govuk-button--secondary[_ngcontent-%COMP%]{background-color:#dee0e2;box-shadow:0 2px #858688;color:#0b0c0c;margin-right:.5em}.govuk-warning-text__text[_ngcontent-%COMP%], .govuk-label--s[_ngcontent-%COMP%], .hmcts-currency-input__symbol[_ngcontent-%COMP%]{font-size:19px;font-weight:400}.inline-error-class[_ngcontent-%COMP%]{outline:3px solid #a71414;outline-offset:0}.inline-error-message[_ngcontent-%COMP%]{color:#a71414;font-weight:700;margin-top:10px;font-size:20px}.govuk-button[_ngcontent-%COMP%], .govuk-link[_ngcontent-%COMP%]{margin-right:1em;font-size:19px;font-weight:200}.govuk-button-group[_ngcontent-%COMP%]{padding-top:2em}.heading-medium[_ngcontent-%COMP%]{margin-top:.875em}.heading-large[_ngcontent-%COMP%]{margin-top:.25em}.govuk-panel--confirmation[_ngcontent-%COMP%]{color:#fff;background:#00703C}.govuk-heading-l[_ngcontent-%COMP%]{font-size:36px}.govuk-heading-m[_ngcontent-%COMP%]{font-size:24px}.govuk-panel__title[_ngcontent-%COMP%]{font-size:5rem}.govuk-body-m[_ngcontent-%COMP%], .govuk-body[_ngcontent-%COMP%]{font-size:2.1875rem}.govuk-input--width-10[_ngcontent-%COMP%]{max-width:36ex}.col-14[_ngcontent-%COMP%]{width:14%!important}.col-10[_ngcontent-%COMP%]{width:10%!important}.col-11[_ngcontent-%COMP%]{width:11%!important}.col-18[_ngcontent-%COMP%]{width:18%!important}.col-21[_ngcontent-%COMP%]{width:21%!important}.col-9[_ngcontent-%COMP%]{width:9%!important}.col-40[_ngcontent-%COMP%]{width:40%!important}.col-15[_ngcontent-%COMP%]{width:15%!important}.col-16[_ngcontent-%COMP%]{width:16%!important}.col-25[_ngcontent-%COMP%]{width:25%!important}.col-24[_ngcontent-%COMP%]{width:24%!important}.govuk-error-summary__title[_ngcontent-%COMP%]{font-size:24px!important}.govuk-error-summary__body[_ngcontent-%COMP%]{font-size:19px!important}.font-size-19px[_ngcontent-%COMP%]{font-size:19px}.white[_ngcontent-%COMP%]{color:#fff}.pagesize[_ngcontent-%COMP%]{margin:2em;width:97%}.govuk-link[_ngcontent-%COMP%]{cursor:pointer}.contactDetails-width[_ngcontent-%COMP%]{width:70%}.whitespace-inherit[_ngcontent-%COMP%]{white-space:inherit!important}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RefundStatusComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-refund-status', template: "\n<div *ngIf=\"errorMessage\">\n  <div class=\"error-summary\" role=\"group\" aria-labelledby=\"failure-error-summary-heading\" tabindex=\"-1\">\n    <h2 class=\"heading-medium error-summary-heading\" id=\"failure-error-summary-heading\">\n      Error in processing the request\n    </h2>\n    <div class=\"govuk-error-summary__body\">\n      {{ errorMessage }}\n    </div>\n  </div>\n</div>\n\n<ng-container *ngIf=\"viewName==='refundstatuslist' && rejectedRefundList && !isResendOperationSuccess && !isEditDetailsClicked\">\n  <!-- payments -->\n\n  <table class=\"govuk-table\">\n    <thead class=\"govuk-table__head\">\n      <tr class=\"govuk-table__row\">\n        <td class=\"govuk-table__header col-16\" scope=\"col\">Status</td>\n        <td class=\"govuk-table__header col-11\" scope=\"col\">Amount</td>\n        <td class=\"govuk-table__header col-18\" scope=\"col\">Date</td>\n        <td class=\"govuk-table__header col-25\" scope=\"col\">Refund reference</td>\n        <td class=\"govuk-table__header col-24 \" scope=\"col\">Reason</td>\n        <td class=\"govuk-table__header\" scope=\"col\"></td>\n      </tr>\n    </thead>\n    <tbody class=\"govuk-table__body\" *ngIf=\"rejectedRefundList?.length > 0\">\n      <tr class=\"govuk-table__row\" *ngFor=\"let refundList of rejectedRefundList\">\n        <td class=\"govuk-table__cell whitespace-inherit\">{{ refundList?.refund_status['name'] }}</td>\n        <td class=\"channel govuk-table__cell whitespace-inherit\">\u00A3{{ refundList?.amount | number:'.2' }}</td>\n        <td class=\"govuk-table__cell  whitespace-inherit\">{{ refundList?.date_updated | date:'dd MMM yyyy'}}\n        </td>\n        <td class=\"govuk-table__cell whitespace-inherit\">{{ refundList?.refund_reference }}</td>\n        <td class=\"govuk-table__cell whitespace-inherit\"> {{refundList?.reason}}</td>\n        <td class=\"govuk-table__cell whitespace-inherit\">\n          <a href=\"javascript:void(0)\" (click)=\"goToRefundView(refundList,'casetransactions')\">Review</a>\n        </td>\n      </tr>\n    </tbody>\n    <tbody class=\"govuk-table__body\" *ngIf=\"rejectedRefundList?.length === 0\">\n      <td class=\"govuk-table__cell\" colspan=\"6\">No refunds recorded</td>\n    </tbody>\n  </table>\n</ng-container>\n\n<ng-container *ngIf=\"viewName==='refundview' && !isResendOperationSuccess && !isEditDetailsClicked\">\n  <div class=\"govuk-breadcrumbs\">\n    <ol class=\"govuk-breadcrumbs__list\">\n      <li class=\"govuk-breadcrumbs__list-item\">\n        <a  href=\"javascript:void(0)\" (click)=\"loadRefundListPage()\" class=\"govuk-back-link govuk-label\">Back</a>\n      </li>\n    </ol>\n  </div>\n  <h2 class=\"govuk-heading-l\">Refund details</h2>\n  <table>\n    \n    <tbody>\n      <tr class=\"section\">\n        <td class=\"bold tb-col-w\">Refund reference</td>\n        <td>{{ refundlist?.refund_reference }}</td>\n      </tr>\n      <tr class=\"section\">\n        <td class=\"bold tb-col-w\">Payment to be refunded</td>\n        <td>{{refundlist?.payment_reference }}</td>\n      </tr>\n      <tr class=\"section\">\n        <td class=\"bold tb-col-w\">Reason for refund</td>\n        <td>{{ refundlist?.reason }}</td>\n      </tr>\n      <tr class=\"section\">\n        <td class=\"bold tb-col-w\">Amount refunded</td>\n        <td>\u00A3{{refundlist?.amount | number:'.2' }}</td>\n      </tr>\n\n    </tbody>\n  </table>\n\n\n    <!-- Notification sent details -->\n    <div>\n      <br />\n      <h2 class=\"govuk-heading-m\">Notifications sent</h2>\n      <table class=\"govuk-table\">\n        <thead class=\"govuk-table__head\">\n          <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__header col-24 whitespace-inherit\" scope=\"col\">Date and time</td>\n            <td class=\"govuk-table__header col-27 whitespace-inherit\" scope=\"col\">Sent to</td>\n            <td class=\"govuk-table__header whitespace-inherit\" scope=\"col\">Sent via</td>\n            <td class=\"govuk-table__header whitespace-inherit\" scope=\"col\">Actions</td>\n          </tr>\n        </thead>\n        <tbody class=\"govuk-table__body\" *ngIf=\"notificationList\">\n          <ng-container *ngFor=\"let notification of notificationList; let i = index;\">\n            <tr class=\"govuk-table__row\">\n              <td class=\"govuk-table__cell whitespace-inherit\">{{notification.date_created | date:'dd MMMM yyyy HH:mm:ss'}}</td>\n              <td class=\"govuk-table__cell whitespace-inherit\">{{orderParty}}</td>\n              <td class=\"govuk-table__cell whitespace-inherit col-40\">\n                <div *ngIf=\"notification?.notification_type === 'EMAIL'\">\n                  <strong>Email</strong><br>\n                  {{notification?.contact_details?.email?.trim()}}\n                </div>\n                <div *ngIf=\"notification?.notification_type === 'LETTER'\">\n                  <strong>Post</strong><br>\n                  {{notification?.contact_details?.address_line?.trim()}} {{notification?.contact_details?.city?.trim()}} {{notification?.contact_details?.county?.trim()}} {{notification?.contact_details?.country?.trim()}} {{notification?.contact_details?.postal_code?.trim()}}\n                </div>\n              </td>\n              <td class=\"govuk-table__cell whitespace-inherit\" *ngIf=\"i === 0\"><a href=\"Javascript:void(0);\" (click)=\"putResend(notification)\">Resend</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href=\"Javascript:void(0);\" (click)=\"gotoEditAddressDetails(notification)\">Edit details</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a *ngIf=\"!notificationSentView || i != notificationSentViewIndex\" href=\"Javascript:void(0);\" (click)=\"showNotificationSentView(i)\">View</a><a *ngIf=\"i === notificationSentViewIndex && notificationSentView\" href=\"Javascript:void(0);\" (click)=\"hideNotificationSentView()\">Hide</a></td>\n              <td class=\"govuk-table__cell whitespace-inherit\" *ngIf=\"i > 0\"><a *ngIf=\"!notificationSentView || i != notificationSentViewIndex\" href=\"Javascript:void(0);\" (click)=\"showNotificationSentView(i)\">View</a><a *ngIf=\"i === notificationSentViewIndex && notificationSentView\" href=\"Javascript:void(0);\" (click)=\"hideNotificationSentView()\">Hide</a></td>\n            </tr>\n            <tr *ngIf=\"i === notificationSentViewIndex && notificationSentView\">\n              <td class=\"govuk-table__cell\" colspan=\"4\">\n                <app-notification-preview\n                  [previewJourney]=\"'Notifications sent'\" [notificationSent]=\"notification?.sent_notification\">\n                </app-notification-preview>\n              </td>\n            </tr>\n          </ng-container>\n\n        </tbody>\n        <tbody class=\"govuk-table__body\" *ngIf=\"!notificationList\">\n          <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell whitespace-inherit\" colspan=\"4\">No record found ... </td>\n          </tr>\n        </tbody>\n      </table>  \n    </div>\n  <!-- Status history -->\n  <div>\n    <br />\n    <h2 class=\"govuk-heading-m\">Refund status history</h2>\n    <div *ngIf=\"refundStatusHistories\">\n    <table class=\"govuk-table\">\n      <thead class=\"govuk-table__head\">\n        <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__header col-24 whitespace-inherit\" scope=\"col\">Status</td>\n          <td class=\"govuk-table__header col-27 whitespace-inherit\" scope=\"col\">Date and time</td>\n          <td class=\"govuk-table__header whitespace-inherit\" scope=\"col\">Users</td>\n          <td class=\"govuk-table__header whitespace-inherit\" scope=\"col\">Notes</td>\n        </tr>\n      </thead>\n      <tbody class=\"govuk-table__body\" *ngFor=\"let refundStatusHistory of refundStatusHistories;\">\n        <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell whitespace-inherit\">{{refundStatusHistory.status}}</td>\n          <td class=\"govuk-table__cell whitespace-inherit\">\n             {{refundStatusHistory.date_created | date:'dd MMMM yyyy HH:mm:ss'}}\n           </td>\n          <td class=\"govuk-table__cell whitespace-inherit\">{{refundStatusHistory.created_by}}</td>\n          <td class=\"govuk-table__cell whitespace-inherit\">{{refundStatusHistory.notes}}</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n\n  </div>\n\n  <ng-container *ngIf=\"viewName==='refundview' && !isFromPayBubble && !isResendOperationSuccess && !isEditDetailsClicked\">\n    <div  *ngIf=\"refundButtonState==='Update required'\" >\n      <!-- <div *ngIf=\"refundButtonState==='sent back'\"> -->\n      <br />\n      <button type=\"submit\" class=\"button govuk-button--secondary btnmargin\"\n        (click)=\"gotoReviewAndReSubmitPage()\">Change refund details</button>\n    </div>\n    <div *ngIf=\"isProcessRefund && !isLastUpdatedByCurrentUser && refundButtonState==='Sent for approval'\" >\n      <!-- <div *ngIf=\"isProcessRefund && !isLastUpdatedByCurrentUser && refundButtonState==='sent for approval'\"> -->\n      <br />\n      <button type=\"submit\" class=\"button govuk-button--secondary\"\n        (click)=\"goToRefundProcessComponent(refundlist.refund_reference,refundlist)\">Process refund</button>\n    </div>\n  </ng-container>\n\n\n</ng-container>\n\n<ng-container *ngIf=\"viewName==='reviewandsubmitview' && !isResendOperationSuccess && !isEditDetailsClicked\">\n  <!-- <div class=\"govuk-breadcrumbs\">\n    <ol class=\"govuk-breadcrumbs__list\">\n      <li class=\"govuk-breadcrumbs__list-item\">\n        <a (click)=\"gotoReviewDetailsPage($event)\" class=\"govuk-back-link govuk-label\">Back</a>\n      </li>\n    </ol>\n  </div> -->\n  <div class=\"govuk-warning-text\">\n    <h1 class=\"heading-large\">Check your answers</h1>\n  </div>\n  <table class=\"govuk-table\">\n    <tr class=\"govuk-table__row\">\n      <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Payment reference</td>\n      <td class=\"govuk-table__cell\">{{ refundlist?.payment_reference}} </td>\n    </tr>\n    <tr class=\"govuk-table__row\">\n      <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Reason for return</td>\n      <td class=\"govuk-table__cell\">{{refundreason}}</td>\n    </tr>\n    <tr class=\"govuk-table__row\">\n      <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Refund reference</td>\n      <td class=\"govuk-table__cell\">{{ refundlist?.refund_reference}} </td>\n    </tr>\n    <tr class=\"govuk-table__row\">\n      <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Reason for refund</td>\n      <td class=\"govuk-table__cell\">{{ refundlist?.reason?.trim()}}\n        <a (click)=\"gotoRefundReasonPage(refundlist?.reason)\" *ngIf=\"refundlist?.reason !== 'Retrospective remission' && refundlist?.reason !== 'Overpayment'\"\n          class=\"govuk-link right\">Change</a>\n      </td>\n\n      <!-- <td class=\"govuk-table__cell\">{{ refundlist?.reason }}</td>\n      <a (click)=\"gotoRefundReasonPage()\" class=\"govuk-link right\">Change</a> -->\n    </tr>\n    <tr class=\"govuk-table__row\">\n      <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Refund amount</td>\n      <td class=\"govuk-table__cell\">\u00A3{{ changedAmount ? changedAmount : refundlist?.amount | number:'.2' }}\n        <a (click)=\"gotoAmountPage()\" *ngIf=\"refundlist?.reason !== 'Overpayment'\"\n          class=\"govuk-link right\">Change</a>\n      </td>\n\n    </tr>\n    <tr class=\"govuk-table__row\">\n      <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Send to</td>\n      <td class=\"govuk-table__cell\">{{orderParty}} </td>\n    </tr>\n    <tr class=\"govuk-table__row\">\n      <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Send via</td>\n      <td class=\"govuk-table__cell whitespace-inherit\">\n        <div *ngIf=\"refundlist?.contact_details?.notification_type === 'EMAIL'\" class=\"contactDetails-width font-size-19px\">\n          <strong>Email</strong>\n          <br/>\n          {{refundlist?.contact_details?.email?.trim()}}\n        </div>\n        <div *ngIf=\"refundlist?.contact_details?.notification_type === 'LETTER'\" class=\"contactDetails-width font-size-19px\">\n          <strong>Post</strong>\n          <br/>\n          {{refundlist?.contact_details?.address_line?.trim()}} {{refundlist?.contact_details?.city?.trim()}} {{refundlist?.contact_details?.county?.trim()}} {{refundlist?.contact_details?.country?.trim()}} {{refundlist?.contact_details?.postal_code?.trim()}}\n        </div> \n        <a class=\"govuk-link\" href=\"Javascript:void(0)\" *ngIf=\"refundlist?.contact_details !=null\"  class=\"govuk-link right\" (click)=\"gotoEditDetailsPage(refundlist?.contact_details, 'reviewandsubmitEditview')\">\n          Change\n        </a>\n      </td>\n    </tr> \n\n    <tr class=\"govuk-table__row\">\n      <td class=\"govuk-table__cell govuk-!-font-weight-bold\">Notification</td>\n      <td class=\"govuk-table__cell\">{{templateInstructionType}} \n          <a *ngIf=\"!notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"showNotificationPreview()\">\n            Preview\n          </a>\n          <a *ngIf=\"notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"hideNotificationPreview()\">\n            Hide Preview\n          </a>\n      </td>\n    </tr>\n  </table>\n  <app-notification-preview *ngIf=\"notificationPreview\" \n  [paymentReference]=\"refundlist?.payment_reference\"\n  [payment]=\"paymentObj\" \n  [contactDetails]=\"refundlist?.contact_details\"\n  [refundReason]=\"refundlist?.reason_code\"\n  [refundAmount]=\"changedAmount ? changedAmount : refundlist?.amount\"\n  [refundReference]=\"refundlist?.refund_reference\"></app-notification-preview>\n\n  <div class=\"govuk-button-group\">\n    <button (click)=\"gotoReviewDetailsPage($event)\" class=\"govuk-button govuk-button--secondary\"> Previous</button>\n    <button [disabled]=\"isRefundBtnDisabled\" (click)=\"gotoReviewRefundConfirmationPage()\" class=\"govuk-button button\"\n      data-module=\"govuk-button\">\n      Submit refund\n    </button>\n</div>\n<p><a href=\"javascript:void(0)\" (click)=\"loadRefundListPage()\" class=\"govuk-link\" data-module=\"govuk-button\">Cancel</a></p>\n  <!-- <div class=\"govuk-button-group\">\n    <button [disabled]=\"isRefundBtnDisabled\" (click)=\"gotoReviewRefundConfirmationPage()\" class=\"govuk-button button\"\n      data-module=\"govuk-button\">\n      Submit refund\n    </button>\n  </div> -->\n  <!-- <p>\n    <a (click)=\"loadRefundListPage()\" href=\"\" class=\"cancelbtn\">Cancel</a>\n  </p> -->\n</ng-container>\n\n<ng-container *ngIf=\"viewName === 'reviewandsubmitEditview' && isEditDetailsClicked\">\n  <input #myInput type='hidden' id='iFrameDrivenImageValue' value='EDITDETAILSPAGE'>      \n    <h1 class=\"govuk-heading-l\">Edit contact details</h1>\n    <h2 class=\"govuk-heading-m govuk-font19px\">Case reference: {{ccdCaseNumber | ccdHyphens }}</h2>\n    <span class=\"govuk-hint font-size-19px\">\n      Refund reference: {{ refundlist?.refund_reference}}\n    </span>\n    <ccpay-contact-details\n    [isEditOperationInRefundList] = isEditDetailsClicked\n    [addressObj] = notification\n    (assignContactDetailsInFefundsList)=\"getContactDetailsForRefundList($event)\"\n    (redirectToIssueRefund)=\"gotoRefundReviewAndSubmitViewPageCancelBtnClicked($event)\" ></ccpay-contact-details>\n  <p>\n      <a (click)=\"loadRefundListPage()\" class=\"govuk-link\" data-module=\"govuk-button\">\n          Cancel\n      </a>\n  </p>\n\n</ng-container>\n\n<ng-container *ngIf=\"viewName === 'issuerefundpage1' && !isResendOperationSuccess && !isEditDetailsClicked\">\n  <ccpay-add-remission [isFromRefundListPage]=\"true\" [viewCompStatus]=\"viewName\" [isRefundRemission]=\"true\" [isFromRefundStatusPage] = \"true\"\n   [changeRefundReason]= \"changeRefundReason\" [ccdCaseNumber]=\"ccdCaseNumber\" (refundListReason)=\"getRefundListReason($event)\" [refundPaymentReference]= \"refundlist?.payment_reference\" ></ccpay-add-remission>\n</ng-container>\n\n<ng-container *ngIf=\"viewName === 'processretroremissonpage' && !isResendOperationSuccess && !isEditDetailsClicked\">\n  <ccpay-add-remission [isFromRefundListPage]=\"true\" [viewCompStatus]=\"viewName\" [isRefundRemission]=\"true\"\n    [ccdCaseNumber]=\"ccdCaseNumber\" [refundPaymentReference]= \"refundlist?.payment_reference\" (refundListAmount)=\"getRefundAmount($event)\"></ccpay-add-remission>\n</ng-container>\n\n<ng-container *ngIf=\"viewName === 'issuerefund' && !isResendOperationSuccess && !isEditDetailsClicked\">\n  <ccpay-add-remission [isFromRefundListPage]=\"true\" [viewCompStatus]=\"viewName\" [isRefundRemission]=\"true\" [isFromServiceRequestPage] = \"true\"\n    [ccdCaseNumber]=\"ccdCaseNumber\" [refundPaymentReference]= \"refundlist?.payment_reference\" [isFromRefundStatusPage]=\"true\"  (refundListAmount)=\"getRefundAmount($event)\"  (refundFees)=\"getRefundFees($event)\"></ccpay-add-remission>\n</ng-container>\n\n<ng-container *ngIf=\"viewName === 'reviewrefundconfirmationpage' && !isResendOperationSuccess && !isEditDetailsClicked\">\n  <div class=\"govuk-grid-row pagesize\">\n    <div>\n      <div class=\"govuk-panel govuk-panel--confirmation\">\n        <h1 class=\"govuk-panel__title\">\n          Refund submitted\n        </h1>\n\n        <div class=\"govuk-panel__body\">\n          <p class=\"govuk-body white\"><strong>Refund reference:{{refundReference}} </strong></p>\n        </div>\n\n      </div>\n\n      <h2 class=\"govuk-heading-l\">What happens next</h2>\n      <p class=\"govuk-body\">\n        A refund request for {{refundAmount| currency:'GBP':'symbol-narrow':'1.2-2'}} has been created and will be passed to a team leader to approve.\n      </p>\n\n      <p class=\"govuk-body\">\n        <a href=\"javascript:void(0)\" (click)=\"loadRefundListPage()\" class=\"govuk-link\">Return to case</a>\n      </p>\n    </div>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"isResendOperationSuccess\">\n  <div class=\"govuk-grid-row pagesize\">\n    <div>\n      <div class=\"govuk-panel govuk-panel--confirmation\">\n        <h1 class=\"govuk-panel__title\">\n          Notification sent\n        </h1>\n\n        <div class=\"govuk-panel__body\">\n          <p class=\"govuk-body white\"><strong>Refund reference: {{ refundlist?.refund_reference}} </strong></p>\n        </div>\n\n      </div>\n      <p class=\"govuk-body\">\n        <a href=\"javascript:void(0)\" (click)=\"loadRefundListPage()\" class=\"govuk-link\">Return to case</a>\n      </p>\n    </div>\n  </div>\n</ng-container>\n<ng-container *ngIf=\"viewName === 'refundEditView' && isEditDetailsClicked\">\n  <input #myInput type='hidden' id='iFrameDrivenImageValue' value='EDITDETAILSPAGE'>      \n    <h1 class=\"govuk-heading-l\">Edit contact details</h1>\n    <h2 class=\"govuk-heading-m govuk-font19px\">Case reference: {{ccdCaseNumber | ccdHyphens }}</h2>\n    <span class=\"govuk-hint font-size-19px\">\n      Refund reference: {{ refundlist?.refund_reference}}\n    </span>\n    <ccpay-contact-details\n    [isEditOperationInRefundList] = isEditDetailsClicked\n    [addressObj] = notification\n    (assignContactDetailsInFefundsList)=\"getContactDetails($event)\"\n    (redirectToIssueRefund)=\"gotoRefundViewPageCancelBtnClicked($event)\" ></ccpay-contact-details>\n  <p>\n      <a (click)=\"loadRefundListPage()\" class=\"govuk-link\" data-module=\"govuk-button\">\n          Cancel\n      </a>\n  </p>\n\n</ng-container>\n<ng-container *ngIf=\"viewName === 'revieweditdetailsconfirmationpage' && !isResendOperationSuccess && isEditDetailsClicked\">\n  <input #myInput type='hidden' id='iFrameDrivenImageValue' value='EDITDETAILSCHECKANDANSWERPAGE'>      \n    <h1 class=\"govuk-heading-l\">Check your answers</h1>\n    <dl class=\"govuk-summary-list\">\n      <div class=\"govuk-summary-list__row font-size-19px\">\n        <dt class=\"govuk-summary-list__key\">\n          Refund reference\n        </dt>\n        <dd class=\"govuk-summary-list__value\">\n          {{ refundlist?.refund_reference}}\n        </dd>\n        <span class=\"govuk-summary-list__actions\"></span> \n      </div>\n      <div class=\"govuk-summary-list__row font-size-19px\">\n        <dt class=\"govuk-summary-list__key\">\n          Send via\n          <br/>\n        </dt>\n        <dd class=\"govuk-summary-list__value\">\n          <div *ngIf=\"addressDetails?.notification_type === 'EMAIL'\" class=\"contactDetails-width font-size-19px\">\n            <strong>Email</strong>\n            <br/>\n            {{addressDetails?.email?.trim()}}\n          </div>\n          <div *ngIf=\"addressDetails?.notification_type === 'LETTER'\" class=\"contactDetails-width font-size-19px\">\n            <strong>Post</strong>\n            <br/>\n            {{addressDetails?.address_line?.trim()}} {{addressDetails?.city?.trim()}} {{addressDetails?.county?.trim()}} {{addressDetails?.country?.trim()}} {{addressDetails?.postal_code?.trim()}}\n          </div>        \n        </dd>\n        <dd class=\"govuk-summary-list__actions\">\n          <a class=\"govuk-link\" href=\"Javascript:void(0)\" (click)=\"gotoEditDetailsPage(addressDetails, 'refundEditView')\">\n            Change\n          </a>\n        </dd>\n      </div>\n      <div class=\"govuk-summary-list__row font-size-19px\">\n        <dt class=\"govuk-summary-list__key\">\n          Notification\n        </dt>\n        <dd class=\"govuk-summary-list__value\">\n          {{templateInstructionType}} \n        </dd>\n        <span class=\"govuk-summary-list__actions\">\n          <a *ngIf=\"!notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"showNotificationPreview()\">\n            Preview\n          </a>\n          <a *ngIf=\"notificationPreview\" href=\"Javascript:void(0)\" class=\"govuk-link right\" (click)=\"hideNotificationPreview()\">\n            Hide Preview\n          </a>\n        </span> \n      </div>\n    </dl>\n\n    <app-notification-preview *ngIf=\"notificationPreview\" [paymentReference]=\"refundlist?.payment_reference\"\n    [payment]=\"paymentObj\"\n    [contactDetails]=\"addressDetails\"\n    [refundReason]=\"refundlist?.reason_code\"\n    [refundAmount]=\"refundlist?.amount\"\n    [refundReference]=\"refundlist?.refund_reference\">\n  </app-notification-preview>\n\n\n\n    <div class=\"govuk-button-group\">\n      <button (click)=\"gotoEditDetailsPage(addressDetails, 'refundEditView')\" class=\"govuk-button govuk-button--secondary\"> Previous</button>\n      <button (click)=\"submitEditDetail()\" class=\"govuk-button button\"\n        data-module=\"govuk-button\">\n          Send notification\n      </button>\n  </div>\n  <p>\n      <a (click)=\"loadRefundListPage()\" class=\"govuk-link\" data-module=\"govuk-button\">\n          Cancel\n      </a>\n  </p>\n\n</ng-container>\n", styles: [".right{float:right!important}.button{margin-bottom:3em;font-size:19px}.cancelbtn{font-size:19px;font-weight:400}.btnmargin{margin-bottom:2em}.govuk-button--secondary{background-color:#dee0e2;box-shadow:0 2px #858688;color:#0b0c0c;margin-right:.5em}.govuk-warning-text__text,.govuk-label--s,.hmcts-currency-input__symbol{font-size:19px;font-weight:400}.inline-error-class{outline:3px solid #a71414;outline-offset:0}.inline-error-message{color:#a71414;font-weight:700;margin-top:10px;font-size:20px}.govuk-button,.govuk-link{margin-right:1em;font-size:19px;font-weight:200}.govuk-button-group{padding-top:2em}.heading-medium{margin-top:.875em}.heading-large{margin-top:.25em}.govuk-panel--confirmation{color:#fff;background:#00703C}.govuk-heading-l{font-size:36px}.govuk-heading-m{font-size:24px}.govuk-panel__title{font-size:5rem}.govuk-body-m,.govuk-body{font-size:2.1875rem}.govuk-input--width-10{max-width:36ex}.col-14{width:14%!important}.col-10{width:10%!important}.col-11{width:11%!important}.col-18{width:18%!important}.col-21{width:21%!important}.col-9{width:9%!important}.col-40{width:40%!important}.col-15{width:15%!important}.col-16{width:16%!important}.col-25{width:25%!important}.col-24{width:24%!important}.govuk-error-summary__title{font-size:24px!important}.govuk-error-summary__body{font-size:19px!important}.font-size-19px{font-size:19px}.white{color:#fff}.pagesize{margin:2em;width:97%}.govuk-link{cursor:pointer}.contactDetails-width{width:70%}.whitespace-inherit{white-space:inherit!important}\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.RefundsService }, { type: i3.NotificationService }, { type: i4.PaymentLibComponent }, { type: i5.OrderslistService }, { type: i6.PaymentViewService }]; }, { LOGGEDINUSERROLES: [{
            type: Input,
            args: ['LOGGEDINUSERROLES']
        }], API_ROOT: [{
            type: Input,
            args: ['API_ROOT']
        }], ccdCaseNumber: [{
            type: Input
        }], isTurnOff: [{
            type: Input
        }], orderParty: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmdW5kLXN0YXR1cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wYXltZW50LWxpYi9zcmMvbGliL2NvbXBvbmVudHMvcmVmdW5kLXN0YXR1cy9yZWZ1bmQtc3RhdHVzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9yZWZ1bmQtc3RhdHVzL3JlZnVuZC1zdGF0dXMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxXQUFXLEVBQWEsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR2pGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBR25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDOzs7Ozs7Ozs7Ozs7OztJQ1h0RiwyQkFBMEIsYUFBQSxZQUFBO0lBR3BCLGlEQUNGO0lBQUEsaUJBQUs7SUFDTCw4QkFBdUM7SUFDckMsWUFDRjtJQUFBLGlCQUFNLEVBQUEsRUFBQTs7O0lBREosZUFDRjtJQURFLG9EQUNGOzs7O0lBbUJFLDZCQUEyRSxhQUFBO0lBQ3hCLFlBQXVDO0lBQUEsaUJBQUs7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VzdHLHFCQUFxQjtjQUxqQyxTQUFTOzJCQUNFLHFCQUFxQjtnT0FLSCxpQkFBaUI7a0JBQTVDLEtBQUs7bUJBQUMsbUJBQW1CO1lBQ1AsUUFBUTtrQkFBMUIsS0FBSzttQkFBQyxVQUFVO1lBQ1IsYUFBYTtrQkFBckIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWZ1bmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZnVuZHMvcmVmdW5kcy5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJUmVmdW5kTGlzdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVJlZnVuZExpc3QnO1xuaW1wb3J0IHsgSVJlZnVuZHNOb3RpZmljYXRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUmVmdW5kc05vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgT3JkZXJzbGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vcmRlcnNsaXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgSVB1dE5vdGlmaWNhdGlvblJlcXVlc3QgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lQdXROb3RpZmljYXRpb25SZXF1ZXN0JztcbmltcG9ydCB7IElSZWZ1bmRDb250YWN0RGV0YWlscyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVJlZnVuZENvbnRhY3REZXRhaWxzJztcbmltcG9ydCB7IElSZWZ1bmRTdGF0dXMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lSZWZ1bmRTdGF0dXMnO1xuaW1wb3J0IHsgSVJlc3VibWl0UmVmdW5kUmVxdWVzdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVJlc3VibWl0UmVmdW5kUmVxdWVzdCc7XG5pbXBvcnQgeyBQYXltZW50TGliQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcGF5bWVudC1saWIuY29tcG9uZW50JztcbmltcG9ydCB7IFBheW1lbnRWaWV3U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BheW1lbnQtdmlldy9wYXltZW50LXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBJUGF5bWVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVBheW1lbnQnO1xuaW1wb3J0IHsgSUZlZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSUZlZSc7XG5pbXBvcnQgeyBJUmVmdW5kRmVlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUmVmdW5kRmVlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NwYXktcmVmdW5kLXN0YXR1cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZWZ1bmQtc3RhdHVzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVmdW5kLXN0YXR1cy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVmdW5kU3RhdHVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCdMT0dHRURJTlVTRVJST0xFUycpIExPR0dFRElOVVNFUlJPTEVTOiBzdHJpbmdbXSA9IFtdO1xuICBASW5wdXQoJ0FQSV9ST09UJykgQVBJX1JPT1Q6IHN0cmluZztcbiAgQElucHV0KCkgY2NkQ2FzZU51bWJlcjogc3RyaW5nO1xuICBASW5wdXQoKSBpc1R1cm5PZmY6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG9yZGVyUGFydHk6IHN0cmluZztcbiAgcmVmdW5kU3RhdHVzRm9ybTogRm9ybUdyb3VwO1xuICBzZWxlY3RlZFJlZnVuZFJlYXNvbjogc3RyaW5nO1xuICByZWplY3RlZFJlZnVuZExpc3Q6IElSZWZ1bmRMaXN0W10gPSBbXTtcbiAgbm90aWZpY2F0aW9uTGlzdDogYW55O1xuICBub3RpZmljYXRpb246YW55O1xuICBhcHByb3ZhbFN0YXR1cyA9ICdTZW50IGZvciBhcHByb3ZhbCc7XG4gIHJlamVjdFN0YXR1cyA9ICdVcGRhdGUgcmVxdWlyZWQnO1xuICBlcnJvck1lc3NhZ2UgPSBudWxsO1xuICB2aWV3TmFtZTogc3RyaW5nO1xuICByZWZ1bmRSZWFzb246IHN0cmluZztcbiAgcmVmdW5kbGlzdDogSVJlZnVuZExpc3Q7XG4gIGJzUGF5bWVudERjbk51bWJlcjogc3RyaW5nO1xuICBpc0NhbGxGcm9tUmVmdW5kTGlzdDogYm9vbGVhbjtcbiAgcmVmdW5kQnV0dG9uU3RhdGU6IHN0cmluZyA9ICcnO1xuICBpc0Ftb3VudEVtcHR5OiBib29sZWFuID0gZmFsc2U7XG4gIGlzUmVhc29uRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgYW1vdW50SGFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNSZW1pc3Npb25MZXNzVGhhbkZlZUVycm9yOiBib29sZWFuID0gZmFsc2U7XG4gIHJlZnVuZEhhc0Vycm9yOiBib29sZWFuID0gZmFsc2U7XG4gIHJlZnVuZFJlYXNvbnM6IGFueVtdID0gW107XG4gIHJlZnVuZFN0YXR1c0hpc3RvcmllczogSVJlZnVuZFN0YXR1c1tdO1xuICByZWZ1bmROb3RpZmljYXRpb25zOiBJUmVmdW5kU3RhdHVzW107XG4gIGlzUmVzZW5kT3BlcmF0aW9uU3VjY2VzczogYm9vbGVhbiA9IGZhbHNlO1xuICBpc0VkaXREZXRhaWxzQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpc0VkaXRBZGRyZXNzRGVhdGlsc0NsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgYWRkcmVzc0RldGFpbHM6IElSZWZ1bmRDb250YWN0RGV0YWlscztcbiAgcmVmdW5kUmVmZXJlbmNlOiBzdHJpbmc7XG4gIHJlZnVuZEFtb3VudDogc3RyaW5nO1xuICByZWZ1bmRDb2RlOiBzdHJpbmc7XG4gIGlzUmVmdW5kQnRuRGlzYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBpc0Zyb21QYXlCdWJibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgb2xkUmVmdW5kUmVhc29uOiBzdHJpbmc7XG4gIHJlZnVuZHJlYXNvbjogc3RyaW5nO1xuICBuYXZpZ2F0aW9ucGFnZTogc3RyaW5nO1xuICBpc0xhc3RVcGRhdGVkQnlDdXJyZW50VXNlcjogYm9vbGVhbiA9IHRydWU7XG4gIGlzUHJvY2Vzc1JlZnVuZDogYm9vbGVhbiA9IGZhbHNlO1xuICBjaGFuZ2VkQW1vdW50OiBudW1iZXI7XG4gIGlzUmVtaXNzaW9uc01hdGNoOiBib29sZWFuO1xuICBwYXltZW50OiBJUGF5bWVudDtcbiAgY2hhbmdlUmVmdW5kUmVhc29uOiBzdHJpbmc7XG4gIGZlZXM6IElGZWUgW107XG4gIHJlZnVuZEZlZXM6IElSZWZ1bmRGZWVbXTtcbiAgcGF5bWVudE9iajogSVBheW1lbnQ7XG4gIHRlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlOiBzdHJpbmc7XG4gIG5vdGlmaWNhdGlvblNlbnRWaWV3SW5kZXg6IG51bWJlciA9IC0xO1xuICBub3RpZmljYXRpb25QcmV2aWV3OiBib29sZWFuID0gZmFsc2U7XG4gIG5vdGlmaWNhdGlvblNlbnRWaWV3OiBib29sZWFuID0gZmFsc2U7XG4gIGFsbG93ZWRSb2xlc1RvQWNjZXNzUmVmdW5kID0gWydwYXltZW50cy1yZWZ1bmQtYXBwcm92ZXInLCAncGF5bWVudHMtcmVmdW5kJywgJ3BheW1lbnRzJ107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSByZWZ1bmRTZXJ2aWNlOiBSZWZ1bmRzU2VydmljZSxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYXltZW50TGliQ29tcG9uZW50OiBQYXltZW50TGliQ29tcG9uZW50LFxuICAgIHByaXZhdGUgT3JkZXJzbGlzdFNlcnZpY2U6IE9yZGVyc2xpc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGF5bWVudFZpZXdTZXJ2aWNlOiBQYXltZW50Vmlld1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5yZXNldFJlbWlzc2lvbkZvcm0oW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSwgJ0FsbCcpO1xuICAgIHRoaXMuYnNQYXltZW50RGNuTnVtYmVyID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmJzcGF5bWVudGRjbjtcbiAgICB0aGlzLmlzQ2FsbEZyb21SZWZ1bmRMaXN0ID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzQ2FsbEZyb21SZWZ1bmRMaXN0O1xuICAgIGlmKHRoaXMuQVBJX1JPT1QgPT0gJ2FwaS9wYXltZW50LWhpc3RvcnknKSB7XG4gICAgICB0aGlzLmlzRnJvbVBheUJ1YmJsZSA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNSZWZ1bmRTdGF0dXNWaWV3KSB7XG4gICAgICB0aGlzLnZpZXdOYW1lID0gJ3JlZnVuZHZpZXcnO1xuICAgICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRSZWZ1bmRWaWV3KCkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLnJlZnVuZGxpc3QgPSBkYXRhKTtcbiAgICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2UuZ2V0Q0NEQ2FzZU51bWJlcmZvclJlZnVuZC5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMuY2NkQ2FzZU51bWJlciA9IGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdOYW1lID0gJ3JlZnVuZHN0YXR1c2xpc3QnO1xuICAgICAgdGhpcy5yZWZ1bmRTZXJ2aWNlLmdldFJlZnVuZFN0YXR1c0xpc3QodGhpcy5jY2RDYXNlTnVtYmVyKS5zdWJzY3JpYmUoXG4gICAgICAgIHJlZnVuZExpc3QgPT4ge1xuICAgICAgICAgIHRoaXMucmVqZWN0ZWRSZWZ1bmRMaXN0ID0gcmVmdW5kTGlzdFsncmVmdW5kX2xpc3QnXTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yLnJlcGxhY2UoL1wiL2csIFwiXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuXG4gICAgICB0aGlzLnJlZnVuZFN0YXR1c0Zvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgYW1vdW50OiBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oJ15bMC05XSsoXFwuWzAtOV17MSwyfSk/JCcpXG4gICAgICAgIF0pKSxcbiAgICAgICAgcmVmdW5kUmVhc29uOiBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZF0pKSxcbiAgICAgICAgcmVhc29uOiBuZXcgRm9ybUNvbnRyb2woKVxuICAgICAgfSk7XG5cbiAgICAgIGlmKHRoaXMucmVmdW5kbGlzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZ2V0UmVmdW5kc05vdGlmaWNhdGlvbigpO1xuICAgICAgICB0aGlzLmdldFJlZnVuZHNTdGF0dXNIaXN0b3J5TGlzdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLkxPR0dFRElOVVNFUlJPTEVTLnNvbWUoaSA9PiBpLmluY2x1ZGVzKCdwYXltZW50cy1yZWZ1bmQtYXBwcm92ZXInKSkpIHtcbiAgICAgICAgICB0aGlzLmlzUHJvY2Vzc1JlZnVuZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5yZWZ1bmRCdXR0b25TdGF0ZSA9IHRoaXMucmVmdW5kbGlzdC5yZWZ1bmRfc3RhdHVzLm5hbWU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuTE9HR0VESU5VU0VSUk9MRVMuc29tZShpID0+IGkuaW5jbHVkZXMoJ3BheW1lbnRzLXJlZnVuZCcpKSkge1xuICAgICAgICAgIHRoaXMuaXNQcm9jZXNzUmVmdW5kID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5yZWZ1bmRCdXR0b25TdGF0ZSA9IHRoaXMucmVmdW5kbGlzdC5yZWZ1bmRfc3RhdHVzLm5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICB9XG5cbiAgZ2V0UmVmdW5kc1N0YXR1c0hpc3RvcnlMaXN0KCkge1xuICAgIGlmKHRoaXMucmVmdW5kbGlzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5yZWZ1bmRTZXJ2aWNlLmdldFJlZnVuZFN0YXR1c0hpc3RvcnkodGhpcy5yZWZ1bmRsaXN0LnJlZnVuZF9yZWZlcmVuY2UpLnN1YnNjcmliZShcbiAgICAgIHN0YXR1c0hpc3RvcnlMaXN0ID0+IHtcbiAgICAgICAgdGhpcy5yZWZ1bmRTdGF0dXNIaXN0b3JpZXMgPSBzdGF0dXNIaXN0b3J5TGlzdC5zdGF0dXNfaGlzdG9yeV9kdG9fbGlzdDtcbiAgICAgICAgdGhpcy5pc0xhc3RVcGRhdGVkQnlDdXJyZW50VXNlciA9IHN0YXR1c0hpc3RvcnlMaXN0Lmxhc3RfdXBkYXRlZF9ieV9jdXJyZW50X3VzZXI7XG4gICAgICB9XG4gICAgKSxcbiAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3IucmVwbGFjZSgvXCIvZyxcIlwiKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZ2V0UmVmdW5kc05vdGlmaWNhdGlvbigpIHtcbiAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZ2V0UmVmdW5kTm90aWZpY2F0aW9uKHRoaXMucmVmdW5kbGlzdC5yZWZ1bmRfcmVmZXJlbmNlKS5zdWJzY3JpYmUoXG4gICAgICByZWZ1bmRzTm90aWZpY2F0aW9uID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25MaXN0ID0gcmVmdW5kc05vdGlmaWNhdGlvblsnbm90aWZpY2F0aW9ucyddO1xuICAgICAgfVxuICAgICksXG4gICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3IucmVwbGFjZSgvXCIvZyxcIlwiKTtcbiAgICB9OyBcbiAgfVxuXG4gIGdvVG9SZWZ1bmRWaWV3KHJlZnVuZGxpc3Q6IElSZWZ1bmRMaXN0LCBuYXZpZ2F0aW9ucGFnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRSZWZ1bmRWaWV3KHJlZnVuZGxpc3QpO1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0Q0NEQ2FzZU51bWJlcih0aGlzLmNjZENhc2VOdW1iZXIpO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC52aWV3TmFtZSA9ICdyZWZ1bmRzdGF0dXNsaXN0JztcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNSZWZ1bmRTdGF0dXNWaWV3ID0gdHJ1ZTtcbiAgICB0aGlzLnJlZnVuZGxpc3QgPSByZWZ1bmRsaXN0O1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0bmF2aWdhdGlvblBhZ2UobmF2aWdhdGlvbnBhZ2UpO1xuICB9XG5cbiAgbG9hZENhc2VUcmFuc2FjdGlvblBhZ2UoKSB7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5zZXRuYXZpZ2F0aW9uUGFnZSgnY2FzZXRyYW5zYWN0aW9ucycpO1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0aXNGcm9tU2VydmljZVJlcXVlc3RQYWdlKGZhbHNlKTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAnY2FzZS10cmFuc2FjdGlvbnMnO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5JU0JTRU5BQkxFID0gdHJ1ZTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNSZWZ1bmRTdGF0dXNWaWV3ID0gZmFsc2U7XG4gIH1cblxuICBsb2FkUmVmdW5kTGlzdFBhZ2UoKSB7XG4gICAgdGhpcy5PcmRlcnNsaXN0U2VydmljZS5nZXRuYXZpZ2F0aW9uUGFnZVZhbHVlKCkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLm5hdmlnYXRpb25wYWdlID0gZGF0YSk7XG4gICAgaWYgKHRoaXMubmF2aWdhdGlvbnBhZ2UgPT09ICdjYXNldHJhbnNhY3Rpb25zJykge1xuICAgICAgdGhpcy5sb2FkQ2FzZVRyYW5zYWN0aW9uUGFnZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAncmVmdW5kLWxpc3QnO1xuICAgIH1cbiAgfVxuXG4gIGdvdG9SZXZpZXdEZXRhaWxzUGFnZShldmVudDphbnkpIHtcbiAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBmYWxzZTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNSZWZ1bmRTdGF0dXNWaWV3ID0gdHJ1ZTtcbiAgICB0aGlzLm5nT25Jbml0KCk7XG4gIH1cblxuICBnb3RvUmV2aWV3QW5kUmVTdWJtaXRQYWdlKCkge1xuICAgIHRoaXMudmlld05hbWUgPSAncmV2aWV3YW5kc3VibWl0dmlldyc7XG4gICAgdGhpcy5nZXRUZW1wbGF0ZUluc3RydWN0aW9uVHlwZSh0aGlzLnBheW1lbnRPYmosIHRoaXMucmVmdW5kbGlzdC5wYXltZW50X3JlZmVyZW5jZSk7XG4gICAgdGhpcy5vbGRSZWZ1bmRSZWFzb24gPSB0aGlzLnJlZnVuZGxpc3QucmVhc29uO1xuICAgIHRoaXMuY2hhbmdlZEFtb3VudCA9IHRoaXMucmVmdW5kbGlzdC5hbW91bnQ7XG4gICAgdGhpcy5yZWZ1bmRyZWFzb24gPSB0aGlzLnJlZnVuZFN0YXR1c0hpc3Rvcmllcy5maWx0ZXIoZGF0YSA9PiBkYXRhLnN0YXR1cy50b0xvd2VyQ2FzZSgpID09PSAndXBkYXRlIHJlcXVpcmVkJylbMF0ubm90ZXM7XG4gICAgdGhpcy5yZWZ1bmRTZXJ2aWNlLmdldFJlZnVuZFJlYXNvbnMoKS5zdWJzY3JpYmUoXG4gICAgICByZWZ1bmRSZWFzb25zID0+IHtcbiAgICAgICAgdGhpcy5yZWZ1bmRSZWFzb25zID0gcmVmdW5kUmVhc29ucztcbiAgICAgIH0pO1xuICB9XG4gIGdvdG9SZWZ1bmRSZWFzb25QYWdlKHJlZnVuZFJlYXNvbjpzdHJpbmcpIHtcbiAgICB0aGlzLmlzUmVmdW5kQnRuRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuUkVGVU5ETElTVCA9IFwidHJ1ZVwiO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc0Zyb21SZWZ1bmRTdGF0dXNQYWdlID0gdHJ1ZTtcbiAgICB0aGlzLmNjZENhc2VOdW1iZXIgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuQ0NEX0NBU0VfTlVNQkVSO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZmFsc2U7XG4gICAgdGhpcy5jaGFuZ2VSZWZ1bmRSZWFzb24gPSByZWZ1bmRSZWFzb247XG4gICAgdGhpcy52aWV3TmFtZSA9ICdpc3N1ZXJlZnVuZHBhZ2UxJztcbiAgfVxuXG4gIGdvdG9BbW91bnRQYWdlKCkge1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZmFsc2U7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlJFRlVORExJU1QgPSBcInRydWVcIjtcbiAgICB0aGlzLmlzUmVmdW5kQnRuRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNjZENhc2VOdW1iZXIgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuQ0NEX0NBU0VfTlVNQkVSO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc0Zyb21SZWZ1bmRTdGF0dXNQYWdlID0gdHJ1ZTtcbiAgICBpZih0aGlzLnJlZnVuZGxpc3QucmVhc29uID09ICdSZXRyb3NwZWN0aXZlIHJlbWlzc2lvbicpIHtcbiAgICB0aGlzLnZpZXdOYW1lID0gJ3Byb2Nlc3NyZXRyb3JlbWlzc29ucGFnZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld05hbWUgPSAnaXNzdWVyZWZ1bmQnO1xuICAgIH1cbiAgfVxuXG4gIGdvVG9SZXZpZXdBbmRTdWJtaXRWaWV3KCkge1xuICAgIGNvbnN0IHJlbWlzc2lvbmN0cmxzID0gdGhpcy5yZWZ1bmRTdGF0dXNGb3JtLmNvbnRyb2xzXG4gICAgaWYgKHRoaXMucmVmdW5kU3RhdHVzRm9ybS5kaXJ0eSkge1xuICAgICAgaWYgKHJlbWlzc2lvbmN0cmxzWydhbW91bnQnXS52YWx1ZSA9PSAnJykge1xuICAgICAgICB0aGlzLnJlc2V0UmVtaXNzaW9uRm9ybShbdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sICdhbW91bnQnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHJlbWlzc2lvbmN0cmxzWydhbW91bnQnXS52YWx1ZSAhPSAnJyAmJiByZW1pc3Npb25jdHJsc1snYW1vdW50J10uaW52YWxpZCkge1xuICAgICAgICB0aGlzLnJlc2V0UmVtaXNzaW9uRm9ybShbZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZV0sICdhbW91bnQnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHJlbWlzc2lvbmN0cmxzWydyZWFzb24nXS52YWx1ZSA9PSAnJykge1xuICAgICAgICB0aGlzLnJlc2V0UmVtaXNzaW9uRm9ybShbZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZV0sICdyZWFzb24nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVmdW5kbGlzdC5yZWFzb24gPSByZW1pc3Npb25jdHJsc1sncmVhc29uJ10udmFsdWU7XG4gICAgICAgIHRoaXMudmlld05hbWUgPSAncmV2aWV3YW5kc3VibWl0dmlldyc7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICByZXNldFJlbWlzc2lvbkZvcm0odmFsLCBmaWVsZCkge1xuICAgIGlmIChmaWVsZCA9PT0gJ0FsbCcpIHtcbiAgICAgIHRoaXMuaXNBbW91bnRFbXB0eSA9IHZhbFswXTtcbiAgICAgIHRoaXMuYW1vdW50SGFzRXJyb3IgPSB2YWxbMV07XG4gICAgICB0aGlzLmlzUmVtaXNzaW9uTGVzc1RoYW5GZWVFcnJvciA9IHZhbFsyXTtcbiAgICAgIHRoaXMuaXNSZWFzb25FbXB0eSA9IHZhbFszXTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkID09PSAnYW1vdW50JyB8fCBmaWVsZCA9PT0gJ0FsbCcpIHtcbiAgICAgIHRoaXMuaXNBbW91bnRFbXB0eSA9IHZhbFswXTtcbiAgICAgIHRoaXMuYW1vdW50SGFzRXJyb3IgPSB2YWxbMV07XG4gICAgICB0aGlzLmlzUmVtaXNzaW9uTGVzc1RoYW5GZWVFcnJvciA9IHZhbFsyXTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkID09PSAncmVhc29uJyB8fCBmaWVsZCA9PT0gJ0FsbCcpIHtcbiAgICAgIHRoaXMuaXNSZWFzb25FbXB0eSA9IHZhbFszXTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RSYWRpb0J1dHRvbihrZXksIHZhbHVlKSB7XG4gICAgdGhpcy5yZWZ1bmRIYXNFcnJvciA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWRSZWZ1bmRSZWFzb24gPSBrZXk7XG4gICAgaWYgKGtleSA9PT0gJ090aGVyJykge1xuICAgICAgdGhpcy5yZWZ1bmRIYXNFcnJvciA9IGZhbHNlO1xuICAgICAgdGhpcy5yZWZ1bmRSZWFzb24gPSBrZXk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UmVmdW5kTGlzdFJlYXNvbihyZWZ1bmRMaXN0UmVhc29uOiBhbnkpIHtcbiAgICBpZiAodGhpcy5wYXltZW50TGliQ29tcG9uZW50LmlzRnJvbVJlZnVuZFN0YXR1c1BhZ2UgJiYgIXRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc2NhbmNlbENsaWNrZWQpIHtcbiAgICAgIGlmKHJlZnVuZExpc3RSZWFzb24ucmVhc29uICE9IHVuZGVmaW5lZCAmJiByZWZ1bmRMaXN0UmVhc29uLnJlYXNvbiAhPSBudWxsICYmIHJlZnVuZExpc3RSZWFzb24ucmVhc29uICE9IHRoaXMucmVmdW5kbGlzdC5yZWFzb24pe1xuICAgICAgICB0aGlzLnJlZnVuZGxpc3QucmVhc29uID0gcmVmdW5kTGlzdFJlYXNvbi5yZWFzb247XG4gICAgICAgIHRoaXMucmVmdW5kbGlzdC5yZWFzb25fY29kZSA9IHJlZnVuZExpc3RSZWFzb24uY29kZS5zcGxpdCgnLScpWzBdLnRyaW0oKTtcbiAgICAgICAgdGhpcy5yZWZ1bmRsaXN0LmNvZGUgPSByZWZ1bmRMaXN0UmVhc29uLmNvZGU7XG4gICAgICAgIHRoaXMucmVmdW5kQ29kZSA9IHJlZnVuZExpc3RSZWFzb24uY29kZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1JlZnVuZEJ0bkRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3ID0gZmFsc2U7XG4gICAgdGhpcy52aWV3TmFtZSA9ICdyZXZpZXdhbmRzdWJtaXR2aWV3JztcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuQ0NEX0NBU0VfTlVNQkVSID0gdGhpcy5jY2RDYXNlTnVtYmVyO1xuICB9XG5cbiAgZ2V0UmVmdW5kQW1vdW50KGFtb3VudDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5pc0Zyb21SZWZ1bmRTdGF0dXNQYWdlICYmICF0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNjYW5jZWxDbGlja2VkKSB7XG4gICAgICBpZiAoYW1vdW50ID4gMCkge1xuICAgICAgICB0aGlzLmNoYW5nZWRBbW91bnQgPSBhbW91bnQ7XG4gICAgICAgIC8vIHRoaXMucmVmdW5kbGlzdC5hbW91bnQgPSBhbW91bnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNSZWZ1bmRCdG5EaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMubm90aWZpY2F0aW9uUHJldmlldyA9IGZhbHNlO1xuICAgIHRoaXMudmlld05hbWUgPSAncmV2aWV3YW5kc3VibWl0dmlldyc7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LkNDRF9DQVNFX05VTUJFUiA9IHRoaXMuY2NkQ2FzZU51bWJlcjtcbiAgfVxuXG4gIGdldFJlZnVuZEZlZXMoZmVlczogSUZlZVtdKVxuICB7XG4gICAgdGhpcy5mZWVzID0gZmVlcztcbiAgICB0aGlzLnJlZnVuZEZlZXMgPSB0aGlzLmZlZXMubWFwKG9iaiA9PiAoe1xuICAgICAgZmVlX2lkOiBvYmouaWQsXG4gICAgICBjb2RlOiBvYmouY29kZSxcbiAgICAgIHZlcnNpb246IG9iai52ZXJzaW9uLFxuICAgICAgdm9sdW1lOiBvYmoudXBkYXRlZF92b2x1bWUgPyBvYmoudXBkYXRlZF92b2x1bWUgOiBvYmoudm9sdW1lLFxuICAgICAgcmVmdW5kX2Ftb3VudDogb2JqLnJlZnVuZF9hbW91bnRcbiAgICB9KSk7XG4gIH1cblxuICBnb3RvUmV2aWV3UmVmdW5kQ29uZmlybWF0aW9uUGFnZSgpIHtcbiAgICAvLyBpZiAodGhpcy5vbGRSZWZ1bmRSZWFzb24gPT09IHRoaXMucmVmdW5kbGlzdC5yZWFzb24pIHtcbiAgICAvLyAgIHRoaXMucmVmdW5kQ29kZSA9ICcnO1xuICAgIC8vIH1cbiAgICBpZiAodGhpcy5yZWZ1bmRGZWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMucmVmdW5kRmVlcyA9IHRoaXMucmVmdW5kbGlzdFsncmVmdW5kX2ZlZXMnXTtcbiAgICB9XG4gICAgaWYodGhpcy5yZWZ1bmRsaXN0LnJlYXNvbiA9PSAnUmV0cm9zcGVjdGl2ZSByZW1pc3Npb24nKSB7XG4gICAgICB0aGlzLnJlZnVuZEZlZXNbMF0ucmVmdW5kX2Ftb3VudCA9IHRoaXMuY2hhbmdlZEFtb3VudDtcbiAgICB9XG4gICAgdGhpcy5yZWZ1bmRDb2RlID0gdGhpcy5yZWZ1bmRsaXN0LmNvZGU7XG4gICAgY29uc3QgcmVzdWJtaXRSZXF1ZXN0ID0gbmV3IElSZXN1Ym1pdFJlZnVuZFJlcXVlc3QodGhpcy5yZWZ1bmRDb2RlLCAgdGhpcy5jaGFuZ2VkQW1vdW50LCB0aGlzLnJlZnVuZGxpc3QuY29udGFjdF9kZXRhaWxzLCB0aGlzLnJlZnVuZEZlZXMpO1xuICAgIHRoaXMucmVmdW5kU2VydmljZS5wYXRjaFJlc3VibWl0UmVmdW5kKHJlc3VibWl0UmVxdWVzdCwgdGhpcy5yZWZ1bmRsaXN0LnJlZnVuZF9yZWZlcmVuY2UpLnN1YnNjcmliZShcbiAgICAgIHJlc3BvbnNlID0+IHtcbiAgICAgICAgaWYgKEpTT04ucGFyc2UocmVzcG9uc2UpKSB7XG4gICAgICAgICAgdGhpcy5yZWZ1bmRSZWZlcmVuY2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKS5yZWZ1bmRfcmVmZXJlbmNlO1xuICAgICAgICAgIHRoaXMucmVmdW5kQW1vdW50ID0gSlNPTi5wYXJzZShyZXNwb25zZSkucmVmdW5kX2Ftb3VudDtcbiAgICAgICAgICB0aGlzLnZpZXdOYW1lID0gJ3Jldmlld3JlZnVuZGNvbmZpcm1hdGlvbnBhZ2UnO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvci5yZXBsYWNlKC9cIi9nLFwiXCIpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBnb3RvRWRpdEFkZHJlc3NEZXRhaWxzKG5vdGU6IElSZWZ1bmRzTm90aWZpY2F0aW9ucykge1xuICAgIHRoaXMubm90aWZpY2F0aW9uID0gbm90ZTtcbiAgICB0aGlzLmlzRWRpdERldGFpbHNDbGlja2VkID0gdHJ1ZTtcbiAgICB0aGlzLnZpZXdOYW1lID0gJ3JlZnVuZEVkaXRWaWV3J1xuICB9XG4gIGdldENvbnRhY3REZXRhaWxzKG9iajpJUmVmdW5kQ29udGFjdERldGFpbHMpIHtcbiAgICB0aGlzLmFkZHJlc3NEZXRhaWxzID0gb2JqO1xuICAgIHRoaXMuZ2V0VGVtcGxhdGVJbnN0cnVjdGlvblR5cGUodGhpcy5wYXltZW50T2JqLHRoaXMucmVmdW5kbGlzdC5wYXltZW50X3JlZmVyZW5jZSk7XG4gICAgdGhpcy5ub3RpZmljYXRpb25QcmV2aWV3ID0gZmFsc2U7XG4gICAgdGhpcy52aWV3TmFtZSA9ICdyZXZpZXdlZGl0ZGV0YWlsc2NvbmZpcm1hdGlvbnBhZ2UnO1xuICB9XG4gIGdldENvbnRhY3REZXRhaWxzRm9yUmVmdW5kTGlzdChvYmo6SVJlZnVuZENvbnRhY3REZXRhaWxzKSB7XG4gICAgdGhpcy5yZWZ1bmRsaXN0LmNvbnRhY3RfZGV0YWlscyA9IG9iajtcbiAgICB0aGlzLmdldFRlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlKHRoaXMucGF5bWVudE9iaix0aGlzLnJlZnVuZGxpc3QucGF5bWVudF9yZWZlcmVuY2UpO1xuICAgIHRoaXMubm90aWZpY2F0aW9uUHJldmlldyA9IGZhbHNlO1xuICAgIHRoaXMuaXNFZGl0RGV0YWlsc0NsaWNrZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmVmdW5kQnRuRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnZpZXdOYW1lID0gJ3Jldmlld2FuZHN1Ym1pdHZpZXcnO1xuICB9XG4gIGdvdG9FZGl0RGV0YWlsc1BhZ2Uobm90ZT86IGFueSwgdmlldz86IHN0cmluZykge1xuICAgIGlmKG5vdGUpIHtcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uID0geyBjb250YWN0X2RldGFpbHM6IG5vdGUsIG5vdGlmaWNhdGlvbl90eXBlOiBub3RlLm5vdGlmaWNhdGlvbl90eXBlIH07XG4gICAgfVxuICAgIHRoaXMuaXNFZGl0RGV0YWlsc0NsaWNrZWQgPSB0cnVlO1xuICAgIHRoaXMudmlld05hbWUgPSB2aWV3O1xuICB9XG4gIHN1Ym1pdEVkaXREZXRhaWwoKSB7XG4gICAgdGhpcy5pc1Jlc2VuZE9wZXJhdGlvblN1Y2Nlc3MgPSBmYWxzZTtcbiAgICBjb25zdCBjb250YWN0RGV0YWlscyA9IHRoaXMuYWRkcmVzc0RldGFpbHMubm90aWZpY2F0aW9uX3R5cGUgPT09ICdFTUFJTCcgPyB0aGlzLmFkZHJlc3NEZXRhaWxzLmVtYWlsIDpcbiAgICAgIHtcbiAgICAgICAgYWRkcmVzc19saW5lOiB0aGlzLmFkZHJlc3NEZXRhaWxzLmFkZHJlc3NfbGluZSxcbiAgICAgICAgY2l0eTogdGhpcy5hZGRyZXNzRGV0YWlscy5jaXR5LFxuICAgICAgICBjb3VudHk6IHRoaXMuYWRkcmVzc0RldGFpbHMuY291bnR5LFxuICAgICAgICBjb3VudHJ5OiB0aGlzLmFkZHJlc3NEZXRhaWxzLmNvdW50cnksXG4gICAgICAgIHBvc3RhbF9jb2RlOiB0aGlzLmFkZHJlc3NEZXRhaWxzLnBvc3RhbF9jb2RlLFxuICAgICAgfTtcbiAgICBjb25zdCByZXNlbmRSZXF1ZXN0ID0gbmV3IElQdXROb3RpZmljYXRpb25SZXF1ZXN0KGNvbnRhY3REZXRhaWxzLCB0aGlzLmFkZHJlc3NEZXRhaWxzLm5vdGlmaWNhdGlvbl90eXBlKTtcblxuICAgIHRoaXMucmVmdW5kU2VydmljZS5wdXRSZXNlbmRPckVkaXQocmVzZW5kUmVxdWVzdCwgdGhpcy5yZWZ1bmRsaXN0LnJlZnVuZF9yZWZlcmVuY2UsIHRoaXMuYWRkcmVzc0RldGFpbHMubm90aWZpY2F0aW9uX3R5cGUpLnN1YnNjcmliZShcbiAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLmlzUmVzZW5kT3BlcmF0aW9uU3VjY2VzcyA9IHJlc3BvbnNlO1xuICAgICAgfSxcbiAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuaXNSZXNlbmRPcGVyYXRpb25TdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3IucmVwbGFjZSgvXCIvZyxcIlwiKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG4gIHB1dFJlc2VuZChub3RpZmljYXRpb246IElSZWZ1bmRzTm90aWZpY2F0aW9ucykge1xuICAgIHRoaXMuaXNSZXNlbmRPcGVyYXRpb25TdWNjZXNzID0gZmFsc2U7XG4gICAgY29uc3QgY29udGFjdERldGFpbHMgPSBub3RpZmljYXRpb24ubm90aWZpY2F0aW9uX3R5cGUgPT09ICdFTUFJTCcgPyBub3RpZmljYXRpb24uY29udGFjdF9kZXRhaWxzLmVtYWlsIDpcbiAgICAgIHtcbiAgICAgICAgYWRkcmVzc19saW5lIDpub3RpZmljYXRpb24uY29udGFjdF9kZXRhaWxzLmFkZHJlc3NfbGluZSxcbiAgICAgICAgY2l0eTogbm90aWZpY2F0aW9uLmNvbnRhY3RfZGV0YWlscy5jaXR5LFxuICAgICAgICBjb3VudHk6IG5vdGlmaWNhdGlvbi5jb250YWN0X2RldGFpbHMuY291bnR5LFxuICAgICAgICBjb3VudHJ5OiBub3RpZmljYXRpb24uY29udGFjdF9kZXRhaWxzLmNvdW50cnksXG4gICAgICAgIHBvc3RhbF9jb2RlOiBub3RpZmljYXRpb24uY29udGFjdF9kZXRhaWxzLnBvc3RhbF9jb2RlLFxuICAgICAgfTtcbiAgICBjb25zdCByZXNlbmRSZXF1ZXN0ID0gbmV3IElQdXROb3RpZmljYXRpb25SZXF1ZXN0KGNvbnRhY3REZXRhaWxzLCBub3RpZmljYXRpb24ubm90aWZpY2F0aW9uX3R5cGUpO1xuXG4gICAgdGhpcy5yZWZ1bmRTZXJ2aWNlLnB1dFJlc2VuZE9yRWRpdChyZXNlbmRSZXF1ZXN0LCB0aGlzLnJlZnVuZGxpc3QucmVmdW5kX3JlZmVyZW5jZSwgbm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbl90eXBlKS5zdWJzY3JpYmUoXG4gICAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5pc1Jlc2VuZE9wZXJhdGlvblN1Y2Nlc3MgPSByZXNwb25zZTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmlzUmVzZW5kT3BlcmF0aW9uU3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yLnJlcGxhY2UoL1wiL2csXCJcIik7XG4gICAgICB9XG4gICAgKTtcblxuICB9XG5cbiAgZ290b1JlZnVuZFZpZXdQYWdlQ2FuY2VsQnRuQ2xpY2tlZChldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuaXNFZGl0RGV0YWlsc0NsaWNrZWQgPSBmYWxzZTtcbiAgICB0aGlzLnZpZXdOYW1lICA9ICdyZWZ1bmR2aWV3JztcbiAgfVxuXG4gIGdvdG9SZWZ1bmRSZXZpZXdBbmRTdWJtaXRWaWV3UGFnZUNhbmNlbEJ0bkNsaWNrZWQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmlzRWRpdERldGFpbHNDbGlja2VkID0gZmFsc2U7XG4gICAgdGhpcy52aWV3TmFtZSAgPSAncmV2aWV3YW5kc3VibWl0dmlldyc7XG4gIH1cblxuICBnb1RvUmVmdW5kUHJvY2Vzc0NvbXBvbmVudChyZWZ1bmRSZWZlcmVuY2U6IHN0cmluZywgcmVmdW5kTGlzdDogSVJlZnVuZExpc3QpIHtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQucmVmdW5kbGlzdHNvdXJjZSA9IHJlZnVuZExpc3Q7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnJlZnVuZFJlZmVyZW5jZSA9IHJlZnVuZFJlZmVyZW5jZTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNGcm9tUGF5QnViYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAncHJvY2Vzcy1yZWZ1bmQnO1xuICB9XG5cbiAgZ2V0VGVtcGxhdGVJbnN0cnVjdGlvblR5cGUocGF5bWVudDogSVBheW1lbnQsIHBheW1lbnRSZWZlcmVuY2U6IHN0cmluZyk6IHZvaWQge1xuXG4gICAgaWYgKHBheW1lbnQgPT0gdW5kZWZpbmVkIHx8IHBheW1lbnQgPT0gbnVsbCB8fCBwYXltZW50LnJlZmVyZW5jZSAhPSBwYXltZW50UmVmZXJlbmNlKSB7XG5cbiAgICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLmdldFBheW1lbnREZXRhaWxzKHBheW1lbnRSZWZlcmVuY2UpLnN1YnNjcmliZShcbiAgICAgICAgcGF5bWVudCA9PiB7XG4gICAgICAgICAgdGhpcy5wYXltZW50T2JqID0gcGF5bWVudDtcbiAgICAgICAgICB0aGlzLnBheW1lbnRPYmoucmVmZXJlbmNlID0gcGF5bWVudFJlZmVyZW5jZTtcbiAgICAgICAgICB0aGlzLnRlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlID0gdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmdldE5vdGlmaWNhdGlvbkluc3RydWN0aW9uVHlwZSh0aGlzLnBheW1lbnRPYmouY2hhbm5lbCwgdGhpcy5wYXltZW50T2JqLm1ldGhvZCk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy50ZW1wbGF0ZUluc3RydWN0aW9uVHlwZSA9ICdUZW1wbGF0ZSc7XG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGVtcGxhdGVJbnN0cnVjdGlvblR5cGUgPSB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZ2V0Tm90aWZpY2F0aW9uSW5zdHJ1Y3Rpb25UeXBlKHBheW1lbnQuY2hhbm5lbCwgcGF5bWVudC5tZXRob2QpO1xuICAgIH1cbiAgfVxuXG4gIHNob3dOb3RpZmljYXRpb25QcmV2aWV3KCk6IHZvaWQge1xuICAgIHRoaXMubm90aWZpY2F0aW9uUHJldmlldyA9IHRydWU7XG4gIH1cblxuICBoaWRlTm90aWZpY2F0aW9uUHJldmlldygpOiB2b2lkIHtcbiAgICB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXcgPSBmYWxzZTtcbiAgfVxuXG4gIHNob3dOb3RpZmljYXRpb25TZW50VmlldyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5ub3RpZmljYXRpb25TZW50Vmlld0luZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5ub3RpZmljYXRpb25TZW50VmlldyA9IHRydWU7XG4gIH1cblxuICBoaWRlTm90aWZpY2F0aW9uU2VudFZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy5ub3RpZmljYXRpb25TZW50Vmlld0luZGV4ID0gLTE7XG4gICAgdGhpcy5ub3RpZmljYXRpb25TZW50VmlldyA9IGZhbHNlO1xuICB9XG5cbn1cbiIsIlxuPGRpdiAqbmdJZj1cImVycm9yTWVzc2FnZVwiPlxuICA8ZGl2IGNsYXNzPVwiZXJyb3Itc3VtbWFyeVwiIHJvbGU9XCJncm91cFwiIGFyaWEtbGFiZWxsZWRieT1cImZhaWx1cmUtZXJyb3Itc3VtbWFyeS1oZWFkaW5nXCIgdGFiaW5kZXg9XCItMVwiPlxuICAgIDxoMiBjbGFzcz1cImhlYWRpbmctbWVkaXVtIGVycm9yLXN1bW1hcnktaGVhZGluZ1wiIGlkPVwiZmFpbHVyZS1lcnJvci1zdW1tYXJ5LWhlYWRpbmdcIj5cbiAgICAgIEVycm9yIGluIHByb2Nlc3NpbmcgdGhlIHJlcXVlc3RcbiAgICA8L2gyPlxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X19ib2R5XCI+XG4gICAgICB7eyBlcnJvck1lc3NhZ2UgfX1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdOYW1lPT09J3JlZnVuZHN0YXR1c2xpc3QnICYmIHJlamVjdGVkUmVmdW5kTGlzdCAmJiAhaXNSZXNlbmRPcGVyYXRpb25TdWNjZXNzICYmICFpc0VkaXREZXRhaWxzQ2xpY2tlZFwiPlxuICA8IS0tIHBheW1lbnRzIC0tPlxuXG4gIDx0YWJsZSBjbGFzcz1cImdvdnVrLXRhYmxlXCI+XG4gICAgPHRoZWFkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRcIj5cbiAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtMTZcIiBzY29wZT1cImNvbFwiPlN0YXR1czwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLTExXCIgc2NvcGU9XCJjb2xcIj5BbW91bnQ8L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC0xOFwiIHNjb3BlPVwiY29sXCI+RGF0ZTwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLTI1XCIgc2NvcGU9XCJjb2xcIj5SZWZ1bmQgcmVmZXJlbmNlPC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtMjQgXCIgc2NvcGU9XCJjb2xcIj5SZWFzb248L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj48L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCIgKm5nSWY9XCJyZWplY3RlZFJlZnVuZExpc3Q/Lmxlbmd0aCA+IDBcIj5cbiAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIiAqbmdGb3I9XCJsZXQgcmVmdW5kTGlzdCBvZiByZWplY3RlZFJlZnVuZExpc3RcIj5cbiAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgd2hpdGVzcGFjZS1pbmhlcml0XCI+e3sgcmVmdW5kTGlzdD8ucmVmdW5kX3N0YXR1c1snbmFtZSddIH19PC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwiY2hhbm5lbCBnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj7Co3t7IHJlZnVuZExpc3Q/LmFtb3VudCB8IG51bWJlcjonLjInIH19PC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7IHJlZnVuZExpc3Q/LmRhdGVfdXBkYXRlZCB8IGRhdGU6J2RkIE1NTSB5eXl5J319XG4gICAgICAgIDwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPnt7IHJlZnVuZExpc3Q/LnJlZnVuZF9yZWZlcmVuY2UgfX08L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj4ge3tyZWZ1bmRMaXN0Py5yZWFzb259fTwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPlxuICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ29Ub1JlZnVuZFZpZXcocmVmdW5kTGlzdCwnY2FzZXRyYW5zYWN0aW9ucycpXCI+UmV2aWV3PC9hPlxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3Rib2R5PlxuICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCIgKm5nSWY9XCJyZWplY3RlZFJlZnVuZExpc3Q/Lmxlbmd0aCA9PT0gMFwiPlxuICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIiBjb2xzcGFuPVwiNlwiPk5vIHJlZnVuZHMgcmVjb3JkZWQ8L3RkPlxuICAgIDwvdGJvZHk+XG4gIDwvdGFibGU+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdOYW1lPT09J3JlZnVuZHZpZXcnICYmICFpc1Jlc2VuZE9wZXJhdGlvblN1Y2Nlc3MgJiYgIWlzRWRpdERldGFpbHNDbGlja2VkXCI+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1icmVhZGNydW1ic1wiPlxuICAgIDxvbCBjbGFzcz1cImdvdnVrLWJyZWFkY3J1bWJzX19saXN0XCI+XG4gICAgICA8bGkgY2xhc3M9XCJnb3Z1ay1icmVhZGNydW1ic19fbGlzdC1pdGVtXCI+XG4gICAgICAgIDxhICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cImxvYWRSZWZ1bmRMaXN0UGFnZSgpXCIgY2xhc3M9XCJnb3Z1ay1iYWNrLWxpbmsgZ292dWstbGFiZWxcIj5CYWNrPC9hPlxuICAgICAgPC9saT5cbiAgICA8L29sPlxuICA8L2Rpdj5cbiAgPGgyIGNsYXNzPVwiZ292dWstaGVhZGluZy1sXCI+UmVmdW5kIGRldGFpbHM8L2gyPlxuICA8dGFibGU+XG4gICAgXG4gICAgPHRib2R5PlxuICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+UmVmdW5kIHJlZmVyZW5jZTwvdGQ+XG4gICAgICAgIDx0ZD57eyByZWZ1bmRsaXN0Py5yZWZ1bmRfcmVmZXJlbmNlIH19PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgICAgIDx0ZCBjbGFzcz1cImJvbGQgdGItY29sLXdcIj5QYXltZW50IHRvIGJlIHJlZnVuZGVkPC90ZD5cbiAgICAgICAgPHRkPnt7cmVmdW5kbGlzdD8ucGF5bWVudF9yZWZlcmVuY2UgfX08L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0ciBjbGFzcz1cInNlY3Rpb25cIj5cbiAgICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPlJlYXNvbiBmb3IgcmVmdW5kPC90ZD5cbiAgICAgICAgPHRkPnt7IHJlZnVuZGxpc3Q/LnJlYXNvbiB9fTwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+QW1vdW50IHJlZnVuZGVkPC90ZD5cbiAgICAgICAgPHRkPsKje3tyZWZ1bmRsaXN0Py5hbW91bnQgfCBudW1iZXI6Jy4yJyB9fTwvdGQ+XG4gICAgICA8L3RyPlxuXG4gICAgPC90Ym9keT5cbiAgPC90YWJsZT5cblxuXG4gICAgPCEtLSBOb3RpZmljYXRpb24gc2VudCBkZXRhaWxzIC0tPlxuICAgIDxkaXY+XG4gICAgICA8YnIgLz5cbiAgICAgIDxoMiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbVwiPk5vdGlmaWNhdGlvbnMgc2VudDwvaDI+XG4gICAgICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZVwiPlxuICAgICAgICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLTI0IHdoaXRlc3BhY2UtaW5oZXJpdFwiIHNjb3BlPVwiY29sXCI+RGF0ZSBhbmQgdGltZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC0yNyB3aGl0ZXNwYWNlLWluaGVyaXRcIiBzY29wZT1cImNvbFwiPlNlbnQgdG88L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciB3aGl0ZXNwYWNlLWluaGVyaXRcIiBzY29wZT1cImNvbFwiPlNlbnQgdmlhPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgd2hpdGVzcGFjZS1pbmhlcml0XCIgc2NvcGU9XCJjb2xcIj5BY3Rpb25zPC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiICpuZ0lmPVwibm90aWZpY2F0aW9uTGlzdFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG5vdGlmaWNhdGlvbiBvZiBub3RpZmljYXRpb25MaXN0OyBsZXQgaSA9IGluZGV4O1wiPlxuICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57e25vdGlmaWNhdGlvbi5kYXRlX2NyZWF0ZWQgfCBkYXRlOidkZCBNTU1NIHl5eXkgSEg6bW06c3MnfX08L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57e29yZGVyUGFydHl9fTwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdCBjb2wtNDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwibm90aWZpY2F0aW9uPy5ub3RpZmljYXRpb25fdHlwZSA9PT0gJ0VNQUlMJ1wiPlxuICAgICAgICAgICAgICAgICAgPHN0cm9uZz5FbWFpbDwvc3Ryb25nPjxicj5cbiAgICAgICAgICAgICAgICAgIHt7bm90aWZpY2F0aW9uPy5jb250YWN0X2RldGFpbHM/LmVtYWlsPy50cmltKCl9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJub3RpZmljYXRpb24/Lm5vdGlmaWNhdGlvbl90eXBlID09PSAnTEVUVEVSJ1wiPlxuICAgICAgICAgICAgICAgICAgPHN0cm9uZz5Qb3N0PC9zdHJvbmc+PGJyPlxuICAgICAgICAgICAgICAgICAge3tub3RpZmljYXRpb24/LmNvbnRhY3RfZGV0YWlscz8uYWRkcmVzc19saW5lPy50cmltKCl9fSB7e25vdGlmaWNhdGlvbj8uY29udGFjdF9kZXRhaWxzPy5jaXR5Py50cmltKCl9fSB7e25vdGlmaWNhdGlvbj8uY29udGFjdF9kZXRhaWxzPy5jb3VudHk/LnRyaW0oKX19IHt7bm90aWZpY2F0aW9uPy5jb250YWN0X2RldGFpbHM/LmNvdW50cnk/LnRyaW0oKX19IHt7bm90aWZpY2F0aW9uPy5jb250YWN0X2RldGFpbHM/LnBvc3RhbF9jb2RlPy50cmltKCl9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIiAqbmdJZj1cImkgPT09IDBcIj48YSBocmVmPVwiSmF2YXNjcmlwdDp2b2lkKDApO1wiIChjbGljayk9XCJwdXRSZXNlbmQobm90aWZpY2F0aW9uKVwiPlJlc2VuZDwvYT4mbmJzcDsmbmJzcDt8Jm5ic3A7Jm5ic3A7PGEgaHJlZj1cIkphdmFzY3JpcHQ6dm9pZCgwKTtcIiAoY2xpY2spPVwiZ290b0VkaXRBZGRyZXNzRGV0YWlscyhub3RpZmljYXRpb24pXCI+RWRpdCBkZXRhaWxzPC9hPiZuYnNwOyZuYnNwO3wmbmJzcDsmbmJzcDs8YSAqbmdJZj1cIiFub3RpZmljYXRpb25TZW50VmlldyB8fCBpICE9IG5vdGlmaWNhdGlvblNlbnRWaWV3SW5kZXhcIiBocmVmPVwiSmF2YXNjcmlwdDp2b2lkKDApO1wiIChjbGljayk9XCJzaG93Tm90aWZpY2F0aW9uU2VudFZpZXcoaSlcIj5WaWV3PC9hPjxhICpuZ0lmPVwiaSA9PT0gbm90aWZpY2F0aW9uU2VudFZpZXdJbmRleCAmJiBub3RpZmljYXRpb25TZW50Vmlld1wiIGhyZWY9XCJKYXZhc2NyaXB0OnZvaWQoMCk7XCIgKGNsaWNrKT1cImhpZGVOb3RpZmljYXRpb25TZW50VmlldygpXCI+SGlkZTwvYT48L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIiAqbmdJZj1cImkgPiAwXCI+PGEgKm5nSWY9XCIhbm90aWZpY2F0aW9uU2VudFZpZXcgfHwgaSAhPSBub3RpZmljYXRpb25TZW50Vmlld0luZGV4XCIgaHJlZj1cIkphdmFzY3JpcHQ6dm9pZCgwKTtcIiAoY2xpY2spPVwic2hvd05vdGlmaWNhdGlvblNlbnRWaWV3KGkpXCI+VmlldzwvYT48YSAqbmdJZj1cImkgPT09IG5vdGlmaWNhdGlvblNlbnRWaWV3SW5kZXggJiYgbm90aWZpY2F0aW9uU2VudFZpZXdcIiBocmVmPVwiSmF2YXNjcmlwdDp2b2lkKDApO1wiIChjbGljayk9XCJoaWRlTm90aWZpY2F0aW9uU2VudFZpZXcoKVwiPkhpZGU8L2E+PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHIgKm5nSWY9XCJpID09PSBub3RpZmljYXRpb25TZW50Vmlld0luZGV4ICYmIG5vdGlmaWNhdGlvblNlbnRWaWV3XCI+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCIgY29sc3Bhbj1cIjRcIj5cbiAgICAgICAgICAgICAgICA8YXBwLW5vdGlmaWNhdGlvbi1wcmV2aWV3XG4gICAgICAgICAgICAgICAgICBbcHJldmlld0pvdXJuZXldPVwiJ05vdGlmaWNhdGlvbnMgc2VudCdcIiBbbm90aWZpY2F0aW9uU2VudF09XCJub3RpZmljYXRpb24/LnNlbnRfbm90aWZpY2F0aW9uXCI+XG4gICAgICAgICAgICAgICAgPC9hcHAtbm90aWZpY2F0aW9uLXByZXZpZXc+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCIgKm5nSWY9XCIhbm90aWZpY2F0aW9uTGlzdFwiPlxuICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiIGNvbHNwYW49XCI0XCI+Tm8gcmVjb3JkIGZvdW5kIC4uLiA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPiAgXG4gICAgPC9kaXY+XG4gIDwhLS0gU3RhdHVzIGhpc3RvcnkgLS0+XG4gIDxkaXY+XG4gICAgPGJyIC8+XG4gICAgPGgyIGNsYXNzPVwiZ292dWstaGVhZGluZy1tXCI+UmVmdW5kIHN0YXR1cyBoaXN0b3J5PC9oMj5cbiAgICA8ZGl2ICpuZ0lmPVwicmVmdW5kU3RhdHVzSGlzdG9yaWVzXCI+XG4gICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgIDx0aGVhZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkXCI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC0yNCB3aGl0ZXNwYWNlLWluaGVyaXRcIiBzY29wZT1cImNvbFwiPlN0YXR1czwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtMjcgd2hpdGVzcGFjZS1pbmhlcml0XCIgc2NvcGU9XCJjb2xcIj5EYXRlIGFuZCB0aW1lPC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIHdoaXRlc3BhY2UtaW5oZXJpdFwiIHNjb3BlPVwiY29sXCI+VXNlcnM8L3RkPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgd2hpdGVzcGFjZS1pbmhlcml0XCIgc2NvcGU9XCJjb2xcIj5Ob3RlczwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAqbmdGb3I9XCJsZXQgcmVmdW5kU3RhdHVzSGlzdG9yeSBvZiByZWZ1bmRTdGF0dXNIaXN0b3JpZXM7XCI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57e3JlZnVuZFN0YXR1c0hpc3Rvcnkuc3RhdHVzfX08L3RkPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPlxuICAgICAgICAgICAgIHt7cmVmdW5kU3RhdHVzSGlzdG9yeS5kYXRlX2NyZWF0ZWQgfCBkYXRlOidkZCBNTU1NIHl5eXkgSEg6bW06c3MnfX1cbiAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57e3JlZnVuZFN0YXR1c0hpc3RvcnkuY3JlYXRlZF9ieX19PC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj57e3JlZnVuZFN0YXR1c0hpc3Rvcnkubm90ZXN9fTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3TmFtZT09PSdyZWZ1bmR2aWV3JyAmJiAhaXNGcm9tUGF5QnViYmxlICYmICFpc1Jlc2VuZE9wZXJhdGlvblN1Y2Nlc3MgJiYgIWlzRWRpdERldGFpbHNDbGlja2VkXCI+XG4gICAgPGRpdiAgKm5nSWY9XCJyZWZ1bmRCdXR0b25TdGF0ZT09PSdVcGRhdGUgcmVxdWlyZWQnXCIgPlxuICAgICAgPCEtLSA8ZGl2ICpuZ0lmPVwicmVmdW5kQnV0dG9uU3RhdGU9PT0nc2VudCBiYWNrJ1wiPiAtLT5cbiAgICAgIDxiciAvPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnkgYnRubWFyZ2luXCJcbiAgICAgICAgKGNsaWNrKT1cImdvdG9SZXZpZXdBbmRSZVN1Ym1pdFBhZ2UoKVwiPkNoYW5nZSByZWZ1bmQgZGV0YWlsczwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJpc1Byb2Nlc3NSZWZ1bmQgJiYgIWlzTGFzdFVwZGF0ZWRCeUN1cnJlbnRVc2VyICYmIHJlZnVuZEJ1dHRvblN0YXRlPT09J1NlbnQgZm9yIGFwcHJvdmFsJ1wiID5cbiAgICAgIDwhLS0gPGRpdiAqbmdJZj1cImlzUHJvY2Vzc1JlZnVuZCAmJiAhaXNMYXN0VXBkYXRlZEJ5Q3VycmVudFVzZXIgJiYgcmVmdW5kQnV0dG9uU3RhdGU9PT0nc2VudCBmb3IgYXBwcm92YWwnXCI+IC0tPlxuICAgICAgPGJyIC8+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiXG4gICAgICAgIChjbGljayk9XCJnb1RvUmVmdW5kUHJvY2Vzc0NvbXBvbmVudChyZWZ1bmRsaXN0LnJlZnVuZF9yZWZlcmVuY2UscmVmdW5kbGlzdClcIj5Qcm9jZXNzIHJlZnVuZDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cblxuXG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdOYW1lPT09J3Jldmlld2FuZHN1Ym1pdHZpZXcnICYmICFpc1Jlc2VuZE9wZXJhdGlvblN1Y2Nlc3MgJiYgIWlzRWRpdERldGFpbHNDbGlja2VkXCI+XG4gIDwhLS0gPGRpdiBjbGFzcz1cImdvdnVrLWJyZWFkY3J1bWJzXCI+XG4gICAgPG9sIGNsYXNzPVwiZ292dWstYnJlYWRjcnVtYnNfX2xpc3RcIj5cbiAgICAgIDxsaSBjbGFzcz1cImdvdnVrLWJyZWFkY3J1bWJzX19saXN0LWl0ZW1cIj5cbiAgICAgICAgPGEgKGNsaWNrKT1cImdvdG9SZXZpZXdEZXRhaWxzUGFnZSgkZXZlbnQpXCIgY2xhc3M9XCJnb3Z1ay1iYWNrLWxpbmsgZ292dWstbGFiZWxcIj5CYWNrPC9hPlxuICAgICAgPC9saT5cbiAgICA8L29sPlxuICA8L2Rpdj4gLS0+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRcIj5cbiAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLWxhcmdlXCI+Q2hlY2sgeW91ciBhbnN3ZXJzPC9oMT5cbiAgPC9kaXY+XG4gIDx0YWJsZSBjbGFzcz1cImdvdnVrLXRhYmxlXCI+XG4gICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+UGF5bWVudCByZWZlcmVuY2U8L3RkPlxuICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57eyByZWZ1bmRsaXN0Py5wYXltZW50X3JlZmVyZW5jZX19IDwvdGQ+XG4gICAgPC90cj5cbiAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5SZWFzb24gZm9yIHJldHVybjwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7cmVmdW5kcmVhc29ufX08L3RkPlxuICAgIDwvdHI+XG4gICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+UmVmdW5kIHJlZmVyZW5jZTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7IHJlZnVuZGxpc3Q/LnJlZnVuZF9yZWZlcmVuY2V9fSA8L3RkPlxuICAgIDwvdHI+XG4gICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+UmVhc29uIGZvciByZWZ1bmQ8L3RkPlxuICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57eyByZWZ1bmRsaXN0Py5yZWFzb24/LnRyaW0oKX19XG4gICAgICAgIDxhIChjbGljayk9XCJnb3RvUmVmdW5kUmVhc29uUGFnZShyZWZ1bmRsaXN0Py5yZWFzb24pXCIgKm5nSWY9XCJyZWZ1bmRsaXN0Py5yZWFzb24gIT09ICdSZXRyb3NwZWN0aXZlIHJlbWlzc2lvbicgJiYgcmVmdW5kbGlzdD8ucmVhc29uICE9PSAnT3ZlcnBheW1lbnQnXCJcbiAgICAgICAgICBjbGFzcz1cImdvdnVrLWxpbmsgcmlnaHRcIj5DaGFuZ2U8L2E+XG4gICAgICA8L3RkPlxuXG4gICAgICA8IS0tIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3sgcmVmdW5kbGlzdD8ucmVhc29uIH19PC90ZD5cbiAgICAgIDxhIChjbGljayk9XCJnb3RvUmVmdW5kUmVhc29uUGFnZSgpXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHJpZ2h0XCI+Q2hhbmdlPC9hPiAtLT5cbiAgICA8L3RyPlxuICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIGdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPlJlZnVuZCBhbW91bnQ8L3RkPlxuICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj7Co3t7IGNoYW5nZWRBbW91bnQgPyBjaGFuZ2VkQW1vdW50IDogcmVmdW5kbGlzdD8uYW1vdW50IHwgbnVtYmVyOicuMicgfX1cbiAgICAgICAgPGEgKGNsaWNrKT1cImdvdG9BbW91bnRQYWdlKClcIiAqbmdJZj1cInJlZnVuZGxpc3Q/LnJlYXNvbiAhPT0gJ092ZXJwYXltZW50J1wiXG4gICAgICAgICAgY2xhc3M9XCJnb3Z1ay1saW5rIHJpZ2h0XCI+Q2hhbmdlPC9hPlxuICAgICAgPC90ZD5cblxuICAgIDwvdHI+XG4gICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGwgZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+U2VuZCB0bzwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7b3JkZXJQYXJ0eX19IDwvdGQ+XG4gICAgPC90cj5cbiAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5TZW5kIHZpYTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInJlZnVuZGxpc3Q/LmNvbnRhY3RfZGV0YWlscz8ubm90aWZpY2F0aW9uX3R5cGUgPT09ICdFTUFJTCdcIiBjbGFzcz1cImNvbnRhY3REZXRhaWxzLXdpZHRoIGZvbnQtc2l6ZS0xOXB4XCI+XG4gICAgICAgICAgPHN0cm9uZz5FbWFpbDwvc3Ryb25nPlxuICAgICAgICAgIDxici8+XG4gICAgICAgICAge3tyZWZ1bmRsaXN0Py5jb250YWN0X2RldGFpbHM/LmVtYWlsPy50cmltKCl9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInJlZnVuZGxpc3Q/LmNvbnRhY3RfZGV0YWlscz8ubm90aWZpY2F0aW9uX3R5cGUgPT09ICdMRVRURVInXCIgY2xhc3M9XCJjb250YWN0RGV0YWlscy13aWR0aCBmb250LXNpemUtMTlweFwiPlxuICAgICAgICAgIDxzdHJvbmc+UG9zdDwvc3Ryb25nPlxuICAgICAgICAgIDxici8+XG4gICAgICAgICAge3tyZWZ1bmRsaXN0Py5jb250YWN0X2RldGFpbHM/LmFkZHJlc3NfbGluZT8udHJpbSgpfX0ge3tyZWZ1bmRsaXN0Py5jb250YWN0X2RldGFpbHM/LmNpdHk/LnRyaW0oKX19IHt7cmVmdW5kbGlzdD8uY29udGFjdF9kZXRhaWxzPy5jb3VudHk/LnRyaW0oKX19IHt7cmVmdW5kbGlzdD8uY29udGFjdF9kZXRhaWxzPy5jb3VudHJ5Py50cmltKCl9fSB7e3JlZnVuZGxpc3Q/LmNvbnRhY3RfZGV0YWlscz8ucG9zdGFsX2NvZGU/LnRyaW0oKX19XG4gICAgICAgIDwvZGl2PiBcbiAgICAgICAgPGEgY2xhc3M9XCJnb3Z1ay1saW5rXCIgaHJlZj1cIkphdmFzY3JpcHQ6dm9pZCgwKVwiICpuZ0lmPVwicmVmdW5kbGlzdD8uY29udGFjdF9kZXRhaWxzICE9bnVsbFwiICBjbGFzcz1cImdvdnVrLWxpbmsgcmlnaHRcIiAoY2xpY2spPVwiZ290b0VkaXREZXRhaWxzUGFnZShyZWZ1bmRsaXN0Py5jb250YWN0X2RldGFpbHMsICdyZXZpZXdhbmRzdWJtaXRFZGl0dmlldycpXCI+XG4gICAgICAgICAgQ2hhbmdlXG4gICAgICAgIDwvYT5cbiAgICAgIDwvdGQ+XG4gICAgPC90cj4gXG5cbiAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCBnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj5Ob3RpZmljYXRpb248L3RkPlxuICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57e3RlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlfX0gXG4gICAgICAgICAgPGEgKm5nSWY9XCIhbm90aWZpY2F0aW9uUHJldmlld1wiIGhyZWY9XCJKYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cImdvdnVrLWxpbmsgcmlnaHRcIiAoY2xpY2spPVwic2hvd05vdGlmaWNhdGlvblByZXZpZXcoKVwiPlxuICAgICAgICAgICAgUHJldmlld1xuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8YSAqbmdJZj1cIm5vdGlmaWNhdGlvblByZXZpZXdcIiBocmVmPVwiSmF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHJpZ2h0XCIgKGNsaWNrKT1cImhpZGVOb3RpZmljYXRpb25QcmV2aWV3KClcIj5cbiAgICAgICAgICAgIEhpZGUgUHJldmlld1xuICAgICAgICAgIDwvYT5cbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgPC90YWJsZT5cbiAgPGFwcC1ub3RpZmljYXRpb24tcHJldmlldyAqbmdJZj1cIm5vdGlmaWNhdGlvblByZXZpZXdcIiBcbiAgW3BheW1lbnRSZWZlcmVuY2VdPVwicmVmdW5kbGlzdD8ucGF5bWVudF9yZWZlcmVuY2VcIlxuICBbcGF5bWVudF09XCJwYXltZW50T2JqXCIgXG4gIFtjb250YWN0RGV0YWlsc109XCJyZWZ1bmRsaXN0Py5jb250YWN0X2RldGFpbHNcIlxuICBbcmVmdW5kUmVhc29uXT1cInJlZnVuZGxpc3Q/LnJlYXNvbl9jb2RlXCJcbiAgW3JlZnVuZEFtb3VudF09XCJjaGFuZ2VkQW1vdW50ID8gY2hhbmdlZEFtb3VudCA6IHJlZnVuZGxpc3Q/LmFtb3VudFwiXG4gIFtyZWZ1bmRSZWZlcmVuY2VdPVwicmVmdW5kbGlzdD8ucmVmdW5kX3JlZmVyZW5jZVwiPjwvYXBwLW5vdGlmaWNhdGlvbi1wcmV2aWV3PlxuXG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1idXR0b24tZ3JvdXBcIj5cbiAgICA8YnV0dG9uIChjbGljayk9XCJnb3RvUmV2aWV3RGV0YWlsc1BhZ2UoJGV2ZW50KVwiIGNsYXNzPVwiZ292dWstYnV0dG9uIGdvdnVrLWJ1dHRvbi0tc2Vjb25kYXJ5XCI+IFByZXZpb3VzPC9idXR0b24+XG4gICAgPGJ1dHRvbiBbZGlzYWJsZWRdPVwiaXNSZWZ1bmRCdG5EaXNhYmxlZFwiIChjbGljayk9XCJnb3RvUmV2aWV3UmVmdW5kQ29uZmlybWF0aW9uUGFnZSgpXCIgY2xhc3M9XCJnb3Z1ay1idXR0b24gYnV0dG9uXCJcbiAgICAgIGRhdGEtbW9kdWxlPVwiZ292dWstYnV0dG9uXCI+XG4gICAgICBTdWJtaXQgcmVmdW5kXG4gICAgPC9idXR0b24+XG48L2Rpdj5cbjxwPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwibG9hZFJlZnVuZExpc3RQYWdlKClcIiBjbGFzcz1cImdvdnVrLWxpbmtcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWJ1dHRvblwiPkNhbmNlbDwvYT48L3A+XG4gIDwhLS0gPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi1ncm91cFwiPlxuICAgIDxidXR0b24gW2Rpc2FibGVkXT1cImlzUmVmdW5kQnRuRGlzYWJsZWRcIiAoY2xpY2spPVwiZ290b1Jldmlld1JlZnVuZENvbmZpcm1hdGlvblBhZ2UoKVwiIGNsYXNzPVwiZ292dWstYnV0dG9uIGJ1dHRvblwiXG4gICAgICBkYXRhLW1vZHVsZT1cImdvdnVrLWJ1dHRvblwiPlxuICAgICAgU3VibWl0IHJlZnVuZFxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj4gLS0+XG4gIDwhLS0gPHA+XG4gICAgPGEgKGNsaWNrKT1cImxvYWRSZWZ1bmRMaXN0UGFnZSgpXCIgaHJlZj1cIlwiIGNsYXNzPVwiY2FuY2VsYnRuXCI+Q2FuY2VsPC9hPlxuICA8L3A+IC0tPlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3TmFtZSA9PT0gJ3Jldmlld2FuZHN1Ym1pdEVkaXR2aWV3JyAmJiBpc0VkaXREZXRhaWxzQ2xpY2tlZFwiPlxuICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBpZD0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J0VESVRERVRBSUxTUEFHRSc+ICAgICAgXG4gICAgPGgxIGNsYXNzPVwiZ292dWstaGVhZGluZy1sXCI+RWRpdCBjb250YWN0IGRldGFpbHM8L2gxPlxuICAgIDxoMiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbSBnb3Z1ay1mb250MTlweFwiPkNhc2UgcmVmZXJlbmNlOiB7e2NjZENhc2VOdW1iZXIgfCBjY2RIeXBoZW5zIH19PC9oMj5cbiAgICA8c3BhbiBjbGFzcz1cImdvdnVrLWhpbnQgZm9udC1zaXplLTE5cHhcIj5cbiAgICAgIFJlZnVuZCByZWZlcmVuY2U6IHt7IHJlZnVuZGxpc3Q/LnJlZnVuZF9yZWZlcmVuY2V9fVxuICAgIDwvc3Bhbj5cbiAgICA8Y2NwYXktY29udGFjdC1kZXRhaWxzXG4gICAgW2lzRWRpdE9wZXJhdGlvbkluUmVmdW5kTGlzdF0gPSBpc0VkaXREZXRhaWxzQ2xpY2tlZFxuICAgIFthZGRyZXNzT2JqXSA9IG5vdGlmaWNhdGlvblxuICAgIChhc3NpZ25Db250YWN0RGV0YWlsc0luRmVmdW5kc0xpc3QpPVwiZ2V0Q29udGFjdERldGFpbHNGb3JSZWZ1bmRMaXN0KCRldmVudClcIlxuICAgIChyZWRpcmVjdFRvSXNzdWVSZWZ1bmQpPVwiZ290b1JlZnVuZFJldmlld0FuZFN1Ym1pdFZpZXdQYWdlQ2FuY2VsQnRuQ2xpY2tlZCgkZXZlbnQpXCIgPjwvY2NwYXktY29udGFjdC1kZXRhaWxzPlxuICA8cD5cbiAgICAgIDxhIChjbGljayk9XCJsb2FkUmVmdW5kTGlzdFBhZ2UoKVwiIGNsYXNzPVwiZ292dWstbGlua1wiIGRhdGEtbW9kdWxlPVwiZ292dWstYnV0dG9uXCI+XG4gICAgICAgICAgQ2FuY2VsXG4gICAgICA8L2E+XG4gIDwvcD5cblxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3TmFtZSA9PT0gJ2lzc3VlcmVmdW5kcGFnZTEnICYmICFpc1Jlc2VuZE9wZXJhdGlvblN1Y2Nlc3MgJiYgIWlzRWRpdERldGFpbHNDbGlja2VkXCI+XG4gIDxjY3BheS1hZGQtcmVtaXNzaW9uIFtpc0Zyb21SZWZ1bmRMaXN0UGFnZV09XCJ0cnVlXCIgW3ZpZXdDb21wU3RhdHVzXT1cInZpZXdOYW1lXCIgW2lzUmVmdW5kUmVtaXNzaW9uXT1cInRydWVcIiBbaXNGcm9tUmVmdW5kU3RhdHVzUGFnZV0gPSBcInRydWVcIlxuICAgW2NoYW5nZVJlZnVuZFJlYXNvbl09IFwiY2hhbmdlUmVmdW5kUmVhc29uXCIgW2NjZENhc2VOdW1iZXJdPVwiY2NkQ2FzZU51bWJlclwiIChyZWZ1bmRMaXN0UmVhc29uKT1cImdldFJlZnVuZExpc3RSZWFzb24oJGV2ZW50KVwiIFtyZWZ1bmRQYXltZW50UmVmZXJlbmNlXT0gXCJyZWZ1bmRsaXN0Py5wYXltZW50X3JlZmVyZW5jZVwiID48L2NjcGF5LWFkZC1yZW1pc3Npb24+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdOYW1lID09PSAncHJvY2Vzc3JldHJvcmVtaXNzb25wYWdlJyAmJiAhaXNSZXNlbmRPcGVyYXRpb25TdWNjZXNzICYmICFpc0VkaXREZXRhaWxzQ2xpY2tlZFwiPlxuICA8Y2NwYXktYWRkLXJlbWlzc2lvbiBbaXNGcm9tUmVmdW5kTGlzdFBhZ2VdPVwidHJ1ZVwiIFt2aWV3Q29tcFN0YXR1c109XCJ2aWV3TmFtZVwiIFtpc1JlZnVuZFJlbWlzc2lvbl09XCJ0cnVlXCJcbiAgICBbY2NkQ2FzZU51bWJlcl09XCJjY2RDYXNlTnVtYmVyXCIgW3JlZnVuZFBheW1lbnRSZWZlcmVuY2VdPSBcInJlZnVuZGxpc3Q/LnBheW1lbnRfcmVmZXJlbmNlXCIgKHJlZnVuZExpc3RBbW91bnQpPVwiZ2V0UmVmdW5kQW1vdW50KCRldmVudClcIj48L2NjcGF5LWFkZC1yZW1pc3Npb24+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdOYW1lID09PSAnaXNzdWVyZWZ1bmQnICYmICFpc1Jlc2VuZE9wZXJhdGlvblN1Y2Nlc3MgJiYgIWlzRWRpdERldGFpbHNDbGlja2VkXCI+XG4gIDxjY3BheS1hZGQtcmVtaXNzaW9uIFtpc0Zyb21SZWZ1bmRMaXN0UGFnZV09XCJ0cnVlXCIgW3ZpZXdDb21wU3RhdHVzXT1cInZpZXdOYW1lXCIgW2lzUmVmdW5kUmVtaXNzaW9uXT1cInRydWVcIiBbaXNGcm9tU2VydmljZVJlcXVlc3RQYWdlXSA9IFwidHJ1ZVwiXG4gICAgW2NjZENhc2VOdW1iZXJdPVwiY2NkQ2FzZU51bWJlclwiIFtyZWZ1bmRQYXltZW50UmVmZXJlbmNlXT0gXCJyZWZ1bmRsaXN0Py5wYXltZW50X3JlZmVyZW5jZVwiIFtpc0Zyb21SZWZ1bmRTdGF0dXNQYWdlXT1cInRydWVcIiAgKHJlZnVuZExpc3RBbW91bnQpPVwiZ2V0UmVmdW5kQW1vdW50KCRldmVudClcIiAgKHJlZnVuZEZlZXMpPVwiZ2V0UmVmdW5kRmVlcygkZXZlbnQpXCI+PC9jY3BheS1hZGQtcmVtaXNzaW9uPlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3TmFtZSA9PT0gJ3Jldmlld3JlZnVuZGNvbmZpcm1hdGlvbnBhZ2UnICYmICFpc1Jlc2VuZE9wZXJhdGlvblN1Y2Nlc3MgJiYgIWlzRWRpdERldGFpbHNDbGlja2VkXCI+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLXJvdyBwYWdlc2l6ZVwiPlxuICAgIDxkaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcGFuZWwgZ292dWstcGFuZWwtLWNvbmZpcm1hdGlvblwiPlxuICAgICAgICA8aDEgY2xhc3M9XCJnb3Z1ay1wYW5lbF9fdGl0bGVcIj5cbiAgICAgICAgICBSZWZ1bmQgc3VibWl0dGVkXG4gICAgICAgIDwvaDE+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXBhbmVsX19ib2R5XCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5IHdoaXRlXCI+PHN0cm9uZz5SZWZ1bmQgcmVmZXJlbmNlOnt7cmVmdW5kUmVmZXJlbmNlfX0gPC9zdHJvbmc+PC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxoMiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbFwiPldoYXQgaGFwcGVucyBuZXh0PC9oMj5cbiAgICAgIDxwIGNsYXNzPVwiZ292dWstYm9keVwiPlxuICAgICAgICBBIHJlZnVuZCByZXF1ZXN0IGZvciB7e3JlZnVuZEFtb3VudHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbC1uYXJyb3cnOicxLjItMid9fSBoYXMgYmVlbiBjcmVhdGVkIGFuZCB3aWxsIGJlIHBhc3NlZCB0byBhIHRlYW0gbGVhZGVyIHRvIGFwcHJvdmUuXG4gICAgICA8L3A+XG5cbiAgICAgIDxwIGNsYXNzPVwiZ292dWstYm9keVwiPlxuICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cImxvYWRSZWZ1bmRMaXN0UGFnZSgpXCIgY2xhc3M9XCJnb3Z1ay1saW5rXCI+UmV0dXJuIHRvIGNhc2U8L2E+XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJpc1Jlc2VuZE9wZXJhdGlvblN1Y2Nlc3NcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93IHBhZ2VzaXplXCI+XG4gICAgPGRpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1wYW5lbCBnb3Z1ay1wYW5lbC0tY29uZmlybWF0aW9uXCI+XG4gICAgICAgIDxoMSBjbGFzcz1cImdvdnVrLXBhbmVsX190aXRsZVwiPlxuICAgICAgICAgIE5vdGlmaWNhdGlvbiBzZW50XG4gICAgICAgIDwvaDE+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXBhbmVsX19ib2R5XCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5IHdoaXRlXCI+PHN0cm9uZz5SZWZ1bmQgcmVmZXJlbmNlOiB7eyByZWZ1bmRsaXN0Py5yZWZ1bmRfcmVmZXJlbmNlfX0gPC9zdHJvbmc+PC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5cbiAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJsb2FkUmVmdW5kTGlzdFBhZ2UoKVwiIGNsYXNzPVwiZ292dWstbGlua1wiPlJldHVybiB0byBjYXNlPC9hPlxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdOYW1lID09PSAncmVmdW5kRWRpdFZpZXcnICYmIGlzRWRpdERldGFpbHNDbGlja2VkXCI+XG4gIDxpbnB1dCAjbXlJbnB1dCB0eXBlPSdoaWRkZW4nIGlkPSdpRnJhbWVEcml2ZW5JbWFnZVZhbHVlJyB2YWx1ZT0nRURJVERFVEFJTFNQQUdFJz4gICAgICBcbiAgICA8aDEgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLWxcIj5FZGl0IGNvbnRhY3QgZGV0YWlsczwvaDE+XG4gICAgPGgyIGNsYXNzPVwiZ292dWstaGVhZGluZy1tIGdvdnVrLWZvbnQxOXB4XCI+Q2FzZSByZWZlcmVuY2U6IHt7Y2NkQ2FzZU51bWJlciB8IGNjZEh5cGhlbnMgfX08L2gyPlxuICAgIDxzcGFuIGNsYXNzPVwiZ292dWstaGludCBmb250LXNpemUtMTlweFwiPlxuICAgICAgUmVmdW5kIHJlZmVyZW5jZToge3sgcmVmdW5kbGlzdD8ucmVmdW5kX3JlZmVyZW5jZX19XG4gICAgPC9zcGFuPlxuICAgIDxjY3BheS1jb250YWN0LWRldGFpbHNcbiAgICBbaXNFZGl0T3BlcmF0aW9uSW5SZWZ1bmRMaXN0XSA9IGlzRWRpdERldGFpbHNDbGlja2VkXG4gICAgW2FkZHJlc3NPYmpdID0gbm90aWZpY2F0aW9uXG4gICAgKGFzc2lnbkNvbnRhY3REZXRhaWxzSW5GZWZ1bmRzTGlzdCk9XCJnZXRDb250YWN0RGV0YWlscygkZXZlbnQpXCJcbiAgICAocmVkaXJlY3RUb0lzc3VlUmVmdW5kKT1cImdvdG9SZWZ1bmRWaWV3UGFnZUNhbmNlbEJ0bkNsaWNrZWQoJGV2ZW50KVwiID48L2NjcGF5LWNvbnRhY3QtZGV0YWlscz5cbiAgPHA+XG4gICAgICA8YSAoY2xpY2spPVwibG9hZFJlZnVuZExpc3RQYWdlKClcIiBjbGFzcz1cImdvdnVrLWxpbmtcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWJ1dHRvblwiPlxuICAgICAgICAgIENhbmNlbFxuICAgICAgPC9hPlxuICA8L3A+XG5cbjwvbmctY29udGFpbmVyPlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdOYW1lID09PSAncmV2aWV3ZWRpdGRldGFpbHNjb25maXJtYXRpb25wYWdlJyAmJiAhaXNSZXNlbmRPcGVyYXRpb25TdWNjZXNzICYmIGlzRWRpdERldGFpbHNDbGlja2VkXCI+XG4gIDxpbnB1dCAjbXlJbnB1dCB0eXBlPSdoaWRkZW4nIGlkPSdpRnJhbWVEcml2ZW5JbWFnZVZhbHVlJyB2YWx1ZT0nRURJVERFVEFJTFNDSEVDS0FOREFOU1dFUlBBR0UnPiAgICAgIFxuICAgIDxoMSBjbGFzcz1cImdvdnVrLWhlYWRpbmctbFwiPkNoZWNrIHlvdXIgYW5zd2VyczwvaDE+XG4gICAgPGRsIGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X19yb3cgZm9udC1zaXplLTE5cHhcIj5cbiAgICAgICAgPGR0IGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X19rZXlcIj5cbiAgICAgICAgICBSZWZ1bmQgcmVmZXJlbmNlXG4gICAgICAgIDwvZHQ+XG4gICAgICAgIDxkZCBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fdmFsdWVcIj5cbiAgICAgICAgICB7eyByZWZ1bmRsaXN0Py5yZWZ1bmRfcmVmZXJlbmNlfX1cbiAgICAgICAgPC9kZD5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay1zdW1tYXJ5LWxpc3RfX2FjdGlvbnNcIj48L3NwYW4+IFxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X19yb3cgZm9udC1zaXplLTE5cHhcIj5cbiAgICAgICAgPGR0IGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X19rZXlcIj5cbiAgICAgICAgICBTZW5kIHZpYVxuICAgICAgICAgIDxici8+XG4gICAgICAgIDwvZHQ+XG4gICAgICAgIDxkZCBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fdmFsdWVcIj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiYWRkcmVzc0RldGFpbHM/Lm5vdGlmaWNhdGlvbl90eXBlID09PSAnRU1BSUwnXCIgY2xhc3M9XCJjb250YWN0RGV0YWlscy13aWR0aCBmb250LXNpemUtMTlweFwiPlxuICAgICAgICAgICAgPHN0cm9uZz5FbWFpbDwvc3Ryb25nPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIHt7YWRkcmVzc0RldGFpbHM/LmVtYWlsPy50cmltKCl9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJhZGRyZXNzRGV0YWlscz8ubm90aWZpY2F0aW9uX3R5cGUgPT09ICdMRVRURVInXCIgY2xhc3M9XCJjb250YWN0RGV0YWlscy13aWR0aCBmb250LXNpemUtMTlweFwiPlxuICAgICAgICAgICAgPHN0cm9uZz5Qb3N0PC9zdHJvbmc+XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAge3thZGRyZXNzRGV0YWlscz8uYWRkcmVzc19saW5lPy50cmltKCl9fSB7e2FkZHJlc3NEZXRhaWxzPy5jaXR5Py50cmltKCl9fSB7e2FkZHJlc3NEZXRhaWxzPy5jb3VudHk/LnRyaW0oKX19IHt7YWRkcmVzc0RldGFpbHM/LmNvdW50cnk/LnRyaW0oKX19IHt7YWRkcmVzc0RldGFpbHM/LnBvc3RhbF9jb2RlPy50cmltKCl9fVxuICAgICAgICAgIDwvZGl2PiAgICAgICAgXG4gICAgICAgIDwvZGQ+XG4gICAgICAgIDxkZCBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fYWN0aW9uc1wiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiZ292dWstbGlua1wiIGhyZWY9XCJKYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ290b0VkaXREZXRhaWxzUGFnZShhZGRyZXNzRGV0YWlscywgJ3JlZnVuZEVkaXRWaWV3JylcIj5cbiAgICAgICAgICAgIENoYW5nZVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kZD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fcm93IGZvbnQtc2l6ZS0xOXB4XCI+XG4gICAgICAgIDxkdCBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fa2V5XCI+XG4gICAgICAgICAgTm90aWZpY2F0aW9uXG4gICAgICAgIDwvZHQ+XG4gICAgICAgIDxkZCBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fdmFsdWVcIj5cbiAgICAgICAgICB7e3RlbXBsYXRlSW5zdHJ1Y3Rpb25UeXBlfX0gXG4gICAgICAgIDwvZGQ+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X19hY3Rpb25zXCI+XG4gICAgICAgICAgPGEgKm5nSWY9XCIhbm90aWZpY2F0aW9uUHJldmlld1wiIGhyZWY9XCJKYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cImdvdnVrLWxpbmsgcmlnaHRcIiAoY2xpY2spPVwic2hvd05vdGlmaWNhdGlvblByZXZpZXcoKVwiPlxuICAgICAgICAgICAgUHJldmlld1xuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8YSAqbmdJZj1cIm5vdGlmaWNhdGlvblByZXZpZXdcIiBocmVmPVwiSmF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJnb3Z1ay1saW5rIHJpZ2h0XCIgKGNsaWNrKT1cImhpZGVOb3RpZmljYXRpb25QcmV2aWV3KClcIj5cbiAgICAgICAgICAgIEhpZGUgUHJldmlld1xuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9zcGFuPiBcbiAgICAgIDwvZGl2PlxuICAgIDwvZGw+XG5cbiAgICA8YXBwLW5vdGlmaWNhdGlvbi1wcmV2aWV3ICpuZ0lmPVwibm90aWZpY2F0aW9uUHJldmlld1wiIFtwYXltZW50UmVmZXJlbmNlXT1cInJlZnVuZGxpc3Q/LnBheW1lbnRfcmVmZXJlbmNlXCJcbiAgICBbcGF5bWVudF09XCJwYXltZW50T2JqXCJcbiAgICBbY29udGFjdERldGFpbHNdPVwiYWRkcmVzc0RldGFpbHNcIlxuICAgIFtyZWZ1bmRSZWFzb25dPVwicmVmdW5kbGlzdD8ucmVhc29uX2NvZGVcIlxuICAgIFtyZWZ1bmRBbW91bnRdPVwicmVmdW5kbGlzdD8uYW1vdW50XCJcbiAgICBbcmVmdW5kUmVmZXJlbmNlXT1cInJlZnVuZGxpc3Q/LnJlZnVuZF9yZWZlcmVuY2VcIj5cbiAgPC9hcHAtbm90aWZpY2F0aW9uLXByZXZpZXc+XG5cblxuXG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi1ncm91cFwiPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZ290b0VkaXREZXRhaWxzUGFnZShhZGRyZXNzRGV0YWlscywgJ3JlZnVuZEVkaXRWaWV3JylcIiBjbGFzcz1cImdvdnVrLWJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiPiBQcmV2aW91czwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwic3VibWl0RWRpdERldGFpbCgpXCIgY2xhc3M9XCJnb3Z1ay1idXR0b24gYnV0dG9uXCJcbiAgICAgICAgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj5cbiAgICAgICAgICBTZW5kIG5vdGlmaWNhdGlvblxuICAgICAgPC9idXR0b24+XG4gIDwvZGl2PlxuICA8cD5cbiAgICAgIDxhIChjbGljayk9XCJsb2FkUmVmdW5kTGlzdFBhZ2UoKVwiIGNsYXNzPVwiZ292dWstbGlua1wiIGRhdGEtbW9kdWxlPVwiZ292dWstYnV0dG9uXCI+XG4gICAgICAgICAgQ2FuY2VsXG4gICAgICA8L2E+XG4gIDwvcD5cblxuPC9uZy1jb250YWluZXI+XG4iXX0=