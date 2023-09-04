import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PaymentLibComponent } from '../../payment-lib.component';
import { NotificationService } from '../../services/notification/notification.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../services/notification/notification.service";
import * as i3 from "../../payment-lib.component";
import * as i4 from "@angular/common";
function ContactDetailsComponent_div_14_p_8_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a email address.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_14_p_8_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a valid email address.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_14_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtemplate(1, ContactDetailsComponent_div_14_p_8_span_1_Template, 2, 0, "span", 26);
    i0.ɵɵtemplate(2, ContactDetailsComponent_div_14_p_8_span_2_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.isEmailEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.emailHasError);
} }
const _c0 = function (a0) { return { "inline-error-class": a0 }; };
function ContactDetailsComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18)(1, "form", 19)(2, "div", 2)(3, "label", 20)(4, "span", 21);
    i0.ɵɵtext(5, "Information about this refund will be sent to this email address.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(6, "div", 22)(7, "input", 23);
    i0.ɵɵtemplate(8, ContactDetailsComponent_div_14_p_8_Template, 3, 2, "p", 24);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroup", ctx_r0.emailAddressForm);
    i0.ɵɵadvance(6);
    i0.ɵɵpropertyInterpolate("value", ctx_r0.addressObj == null ? null : ctx_r0.addressObj.contact_details == null ? null : ctx_r0.addressObj.contact_details.email);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c0, ctx_r0.isEmailEmpty || ctx_r0.emailHasError));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isEmailEmpty || ctx_r0.emailHasError);
} }
function ContactDetailsComponent_div_19_p_9_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a postcode.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_19_p_9_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a valid postcode.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_19_p_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtemplate(1, ContactDetailsComponent_div_19_p_9_span_1_Template, 2, 0, "span", 26);
    i0.ɵɵtemplate(2, ContactDetailsComponent_div_19_p_9_span_2_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.isPostcodeEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.postcodeHasError);
} }
function ContactDetailsComponent_div_19_div_13_option_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 42);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const address_r12 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", address_r12.DPA);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", address_r12.DPA.ADDRESS, "");
} }
function ContactDetailsComponent_div_19_div_13_p_5_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Please select an address.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_19_div_13_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtemplate(1, ContactDetailsComponent_div_19_div_13_p_5_span_1_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.isAddressBoxEmpty);
} }
function ContactDetailsComponent_div_19_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 38)(1, "label", 39);
    i0.ɵɵtext(2, " Pick an address ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 40);
    i0.ɵɵlistener("ngModelChange", function ContactDetailsComponent_div_19_div_13_Template_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r14.postcodeAddress = $event); });
    i0.ɵɵtemplate(4, ContactDetailsComponent_div_19_div_13_option_4_Template, 2, 2, "option", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, ContactDetailsComponent_div_19_div_13_p_5_Template, 2, 1, "p", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r7.postcodeAddress)("ngClass", i0.ɵɵpureFunction1(4, _c0, ctx_r7.isAddressBoxEmpty));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r7.addressPostcodeList);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.isAddressBoxEmpty);
} }
function ContactDetailsComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "form", 19)(2, "label", 28)(3, "span", 21);
    i0.ɵɵtext(4, "Information about this refund will be sent to this address.");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, "Postcode ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 29)(7, "div", 30);
    i0.ɵɵelement(8, "input", 31);
    i0.ɵɵtemplate(9, ContactDetailsComponent_div_19_p_9_Template, 3, 2, "p", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 15)(11, "button", 32);
    i0.ɵɵlistener("click", function ContactDetailsComponent_div_19_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r16.postcodeValidation("FA")); });
    i0.ɵɵtext(12, " Find address ");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(13, ContactDetailsComponent_div_19_div_13_Template, 6, 6, "div", 33);
    i0.ɵɵelementStart(14, "details", 34)(15, "summary", 35)(16, "span", 36)(17, "a", 37);
    i0.ɵɵlistener("click", function ContactDetailsComponent_div_19_Template_a_click_17_listener() { i0.ɵɵrestoreView(_r17); const ctx_r18 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r18.selectContactOption("Postcode", "true")); });
    i0.ɵɵtext(18, " Enter address manually");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroup", ctx_r1.postCodeForm);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c0, ctx_r1.isPostcodeEmpty || ctx_r1.postcodeHasError));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.isPostcodeEmpty || ctx_r1.postcodeHasError);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.isShowPickAddress);
} }
function ContactDetailsComponent_div_20_p_10_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a Building and street.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_20_p_10_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a valid Building and street.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_20_p_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtemplate(1, ContactDetailsComponent_div_20_p_10_span_1_Template, 2, 0, "span", 26);
    i0.ɵɵtemplate(2, ContactDetailsComponent_div_20_p_10_span_2_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r19.isaddressLine1Empty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r19.addressLine1HasError);
} }
function ContactDetailsComponent_div_20_p_16_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a valid Building and street line 2 of 2.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_20_p_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtemplate(1, ContactDetailsComponent_div_20_p_16_span_1_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r20.addressLine2HasError);
} }
function ContactDetailsComponent_div_20_p_21_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a town or city.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_20_p_21_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a town or city.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_20_p_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtemplate(1, ContactDetailsComponent_div_20_p_21_span_1_Template, 2, 0, "span", 26);
    i0.ɵɵtemplate(2, ContactDetailsComponent_div_20_p_21_span_2_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r21 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r21.isTownOrCityEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r21.townOrCityHasError);
} }
function ContactDetailsComponent_div_20_p_26_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a County.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_20_p_26_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a valid County.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_20_p_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtemplate(1, ContactDetailsComponent_div_20_p_26_span_1_Template, 2, 0, "span", 26);
    i0.ɵɵtemplate(2, ContactDetailsComponent_div_20_p_26_span_2_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r22.isCountyEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r22.countyHasError);
} }
function ContactDetailsComponent_div_20_p_31_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a postcode.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_20_p_31_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a valid postcode.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_20_p_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtemplate(1, ContactDetailsComponent_div_20_p_31_span_1_Template, 2, 0, "span", 26);
    i0.ɵɵtemplate(2, ContactDetailsComponent_div_20_p_31_span_2_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r23 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r23.isMPostcodeEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r23.mpostcodeHasError);
} }
function ContactDetailsComponent_div_20_p_40_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Select a Country.");
    i0.ɵɵelementEnd();
} }
function ContactDetailsComponent_div_20_p_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtemplate(1, ContactDetailsComponent_div_20_p_40_span_1_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r24 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r24.isCountryEmpty);
} }
function ContactDetailsComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43)(1, "form", 19)(2, "div", 2)(3, "label", 44)(4, "span", 21);
    i0.ɵɵtext(5, "Information about this refund will be sent to this address.");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6, "Building and street ");
    i0.ɵɵelementStart(7, "span", 45);
    i0.ɵɵtext(8, "line 1 of 2");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(9, "input", 46);
    i0.ɵɵtemplate(10, ContactDetailsComponent_div_20_p_10_Template, 3, 2, "p", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 2)(12, "label", 47)(13, "span", 48);
    i0.ɵɵtext(14, "Building and street line 2 of 2");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(15, "input", 49);
    i0.ɵɵtemplate(16, ContactDetailsComponent_div_20_p_16_Template, 2, 1, "p", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 2)(18, "label", 50);
    i0.ɵɵtext(19, " Town or city ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(20, "input", 51);
    i0.ɵɵtemplate(21, ContactDetailsComponent_div_20_p_21_Template, 3, 2, "p", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 2)(23, "label", 52);
    i0.ɵɵtext(24, " County ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 53);
    i0.ɵɵtemplate(26, ContactDetailsComponent_div_20_p_26_Template, 3, 2, "p", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 2)(28, "label", 28);
    i0.ɵɵtext(29, " Postcode ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 54);
    i0.ɵɵtemplate(31, ContactDetailsComponent_div_20_p_31_Template, 3, 2, "p", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "div", 2)(33, "label", 39);
    i0.ɵɵtext(34, " Country ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "select", 55)(36, "option", 56);
    i0.ɵɵtext(37, "Please select");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "option", 57);
    i0.ɵɵtext(39, "United Kingdom");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(40, ContactDetailsComponent_div_20_p_40_Template, 2, 1, "p", 24);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroup", ctx_r2.manualAddressForm);
    i0.ɵɵadvance(8);
    i0.ɵɵpropertyInterpolate("value", ctx_r2.addressObj == null ? null : ctx_r2.addressObj.contact_details == null ? null : ctx_r2.addressObj.contact_details.address_line);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(18, _c0, ctx_r2.isaddressLine1Empty || ctx_r2.addressLine1HasError));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.isaddressLine1Empty || ctx_r2.addressLine1HasError);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(20, _c0, ctx_r2.addressLine2HasError));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.addressLine2HasError);
    i0.ɵɵadvance(4);
    i0.ɵɵpropertyInterpolate("value", ctx_r2.addressObj == null ? null : ctx_r2.addressObj.contact_details == null ? null : ctx_r2.addressObj.contact_details.city);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(22, _c0, ctx_r2.isTownOrCityEmpty || ctx_r2.townOrCityHasError));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.isTownOrCityEmpty || ctx_r2.townOrCityHasError);
    i0.ɵɵadvance(4);
    i0.ɵɵpropertyInterpolate("value", ctx_r2.addressObj == null ? null : ctx_r2.addressObj.contact_details == null ? null : ctx_r2.addressObj.contact_details.county);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(24, _c0, ctx_r2.isCountyEmpty || ctx_r2.countyHasError));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.isCountyEmpty || ctx_r2.countyHasError);
    i0.ɵɵadvance(4);
    i0.ɵɵpropertyInterpolate("value", ctx_r2.addressObj == null ? null : ctx_r2.addressObj.contact_details == null ? null : ctx_r2.addressObj.contact_details.postal_code);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(26, _c0, ctx_r2.isMPostcodeEmpty || ctx_r2.mpostcodeHasError));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.isMPostcodeEmpty || ctx_r2.mpostcodeHasError);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(28, _c0, ctx_r2.isCountryEmpty));
    i0.ɵɵadvance(3);
    i0.ɵɵpropertyInterpolate("selected", (ctx_r2.addressObj == null ? null : ctx_r2.addressObj.contact_details == null ? null : ctx_r2.addressObj.contact_details.country) ? "selected" : "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.isCountryEmpty);
} }
export class ContactDetailsComponent {
    formBuilder;
    notificationService;
    paymentLibComponent;
    isEditOperation;
    isEditOperationInRefundList;
    addressObj;
    assignContactDetails = new EventEmitter();
    assignContactDetailsInFefundsList = new EventEmitter();
    redirectToIssueRefund = new EventEmitter();
    pageTitle = 'Payment status history';
    errorMessage;
    isEmailSAddressClicked = true;
    isShowPickAddress = false;
    isPostcodeClicked = false;
    isManualAddressClicked = false;
    emailAddressForm;
    postCodeForm;
    manualAddressForm;
    addressPostcodeList = [];
    postcodeAddress;
    isAddressBoxEmpty = false;
    isEmailEmpty = false;
    emailHasError = false;
    isPostcodeEmpty = false;
    postcodeHasError = false;
    isaddressLine1Empty = false;
    addressLine1HasError = false;
    addressLine2HasError = false;
    isTownOrCityEmpty = false;
    townOrCityHasError = false;
    isCountyEmpty = false;
    countyHasError = false;
    isMPostcodeEmpty = false;
    mpostcodeHasError = false;
    isCountryEmpty = false;
    constructor(formBuilder, notificationService, paymentLibComponent) {
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.paymentLibComponent = paymentLibComponent;
    }
    ngOnInit() {
        this.resetForm([false, false, false, false, false, false, false, false, false, false, false, false, false, false], 'all');
        this.emailAddressForm = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('.+@+.+\\.+.+')
            ]))
        });
        this.postCodeForm = this.formBuilder.group({
            postcode: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^([A-Za-z]{1,2}[0-9]{1,2}[A-Za-z]{0,1} ?[0-9][A-Za-z]{2})')
            ]))
        });
        this.manualAddressForm = this.formBuilder.group({
            addressl1: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9\\s,\'-]*$')
            ])),
            addressl2: new FormControl('', Validators.compose([
                Validators.pattern('^[a-zA-Z0-9\\s,\'-]*$')
            ])),
            townorcity: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9\\s,\'-]*$')
            ])),
            county: new FormControl('', Validators.compose([
                Validators.pattern('^[a-zA-Z0-9\\s,\'-]*$')
            ])),
            mpostcode: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^([A-Za-z]{1,2}[0-9]{1,2}[A-Za-z]{0,1} ?[0-9][A-Za-z]{2})')
            ])),
            country: new FormControl('', Validators.compose([
                Validators.required
            ]))
        });
        if (this.addressObj !== undefined && this.addressObj !== '') {
            this.setEditDetails();
        }
        if (this.isEditOperationInRefundList === undefined) {
            this.isEditOperationInRefundList = false;
        }
    }
    setEditDetails() {
        if (this.addressObj.notification_type === 'EMAIL') {
            this.isEmailSAddressClicked = true;
            this.isPostcodeClicked = false;
            this.isManualAddressClicked = false;
            this.emailAddressForm.setValue({ email: this.addressObj.contact_details.email });
        }
        else if (this.addressObj.notification_type === 'LETTER') {
            this.isEmailSAddressClicked = false;
            this.isPostcodeClicked = true;
            this.isManualAddressClicked = true;
            this.manualAddressForm.patchValue({
                addressl1: this.addressObj.contact_details.address_line,
                townorcity: this.addressObj.contact_details.city,
                county: this.addressObj.contact_details.county,
                country: this.addressObj.contact_details.country,
                mpostcode: this.addressObj.contact_details.postal_code
            });
        }
    }
    selectContactOption(type, isLinkedClied) {
        this.resetForm([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 'all');
        if (type === 'Email' && isLinkedClied === 'false') {
            this.isEmailSAddressClicked = true;
            this.isPostcodeClicked = false;
            this.isManualAddressClicked = false;
        }
        else if (type === 'Postcode' && isLinkedClied === 'false') {
            this.isEmailSAddressClicked = false;
            this.isPostcodeClicked = true;
            this.isManualAddressClicked = false;
        }
        else if (type === 'Postcode' && isLinkedClied === 'true') {
            this.isEmailSAddressClicked = false;
            this.isPostcodeClicked = true;
            this.isManualAddressClicked = true;
        }
    }
    finalFormSubmit() {
        this.resetForm([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 'all');
        if (this.isEmailSAddressClicked) {
            const emailField = this.emailAddressForm.controls.email;
            if (this.emailAddressForm.valid) {
                if (!this.isEditOperationInRefundList) {
                    this.assignContactDetails.emit({
                        email: emailField.value,
                        notification_type: 'EMAIL'
                    });
                }
                else {
                    this.assignContactDetailsInFefundsList.emit({
                        email: emailField.value,
                        notification_type: 'EMAIL'
                    });
                }
            }
            else {
                if (emailField.value == '') {
                    this.resetForm([true, false, false, false, false, false, false, false, false, false, false, false, false, false], 'email');
                }
                if (emailField.value != '' && emailField.invalid) {
                    this.resetForm([false, true, false, false, false, false, false, false, false, false, false, false, false, false], 'email');
                }
            }
        }
        else if (this.isPostcodeClicked && !this.isManualAddressClicked) {
            this.postcodeValidation('FS');
        }
        else if (this.isPostcodeClicked && this.isManualAddressClicked) {
            const fieldCtrls = this.manualAddressForm.controls;
            if (this.manualAddressForm.valid) {
                if (!this.isEditOperationInRefundList) {
                    this.assignContactDetails.emit({
                        address_line: fieldCtrls.addressl1.value + ' ' + fieldCtrls.addressl2.value,
                        city: fieldCtrls.townorcity.value,
                        county: fieldCtrls.county.value,
                        postal_code: fieldCtrls.mpostcode.value,
                        country: fieldCtrls.country.value,
                        notification_type: 'LETTER'
                    });
                }
                else {
                    this.assignContactDetailsInFefundsList.emit({
                        address_line: fieldCtrls.addressl1.value + ' ' + fieldCtrls.addressl2.value,
                        city: fieldCtrls.townorcity.value,
                        county: fieldCtrls.county.value,
                        postal_code: fieldCtrls.mpostcode.value,
                        country: fieldCtrls.country.value,
                        notification_type: 'LETTER'
                    });
                }
            }
            else {
                if (fieldCtrls.addressl1.value == '') {
                    this.resetForm([false, false, false, false, true, false, false, false, false, false, false, false, false, false], 'address1');
                }
                if (fieldCtrls.addressl1.value != '' && fieldCtrls.addressl1.invalid) {
                    this.resetForm([false, false, false, false, false, true, false, false, false, false, false, false, false, false], 'address1');
                }
                if (fieldCtrls.addressl2.value != '' && fieldCtrls.addressl2.invalid) {
                    this.resetForm([false, false, false, false, false, false, true, false, false, false, false, false, false, false], 'address2');
                }
                if (fieldCtrls.townorcity.value == '') {
                    this.resetForm([false, false, false, false, false, false, false, true, false, false, false, false, false, false], 'town');
                }
                if (fieldCtrls.townorcity.value != '' && fieldCtrls.townorcity.invalid) {
                    this.resetForm([false, false, false, false, false, false, false, false, true, false, false, false, false, false], 'town');
                }
                if (fieldCtrls.county.value == '') {
                    this.resetForm([false, false, false, false, false, false, false, false, false, true, false, false, false, false], 'county');
                }
                if (fieldCtrls.county.value != '' && fieldCtrls.county.invalid) {
                    this.resetForm([false, false, false, false, false, false, false, false, false, false, true, false, false, false], 'county');
                }
                if (fieldCtrls.mpostcode.value == '') {
                    this.resetForm([false, false, false, false, false, false, false, false, false, false, false, true, false, false], 'mpostcode');
                }
                if (fieldCtrls.mpostcode.value != '' && fieldCtrls.mpostcode.invalid) {
                    this.resetForm([false, false, false, false, false, false, false, false, false, false, false, false, true, false], 'mpostcode');
                }
                if (fieldCtrls.country.value == '') {
                    this.resetForm([false, false, false, false, false, false, false, false, false, false, false, false, false, true], 'country');
                }
            }
        }
    }
    postcodeValidation(str) {
        this.resetForm([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], 'all');
        const postcodeField = this.postCodeForm.controls.postcode;
        if (this.postCodeForm.valid) {
            if (str === 'FA') {
                this.notificationService.getAddressByPostcode(postcodeField.value).subscribe(refundsNotification => {
                    this.addressPostcodeList = refundsNotification['results'];
                    this.isShowPickAddress = refundsNotification['header'].totalresults > 0;
                    if (!this.isShowPickAddress) {
                        this.resetForm([false, false, false, true, false, false, false, false, false, false, false, false, false], 'postcode');
                    }
                }),
                    (error) => {
                        this.isShowPickAddress = false;
                        this.errorMessage = error.replace(/"/g, "");
                    };
            }
            else if (str === 'FS') {
                if (this.postcodeAddress !== undefined && this.postcodeAddress) {
                    this.isAddressBoxEmpty = false;
                    let addressLine = "";
                    let addressArray = this.postcodeAddress.ADDRESS.split(",");
                    for (let i = 0; i < addressArray.length - 2; i++) {
                        addressLine += addressArray[i];
                    }
                    const addressObject = {
                        address_line: addressLine,
                        city: this.postcodeAddress.POST_TOWN,
                        county: this.postcodeAddress.LOCAL_CUSTODIAN_CODE_DESCRIPTION,
                        postal_code: this.postcodeAddress.POSTCODE,
                        country: 'United Kingdom',
                        notification_type: 'LETTER'
                    };
                    if (!this.isEditOperationInRefundList) {
                        this.assignContactDetails.emit(addressObject);
                    }
                    else {
                        this.assignContactDetailsInFefundsList.emit(addressObject);
                    }
                }
                else {
                    this.isAddressBoxEmpty = true;
                }
            }
        }
        else {
            if (postcodeField.value == '') {
                this.resetForm([false, false, true, false, false, false, false, false, false, false, false, false, false], 'postcode');
            }
            if (postcodeField.value != '' && postcodeField.invalid) {
                this.resetForm([false, false, false, true, false, false, false, false, false, false, false, false, false], 'postcode');
            }
        }
    }
    redirection(event) {
        this.redirectToIssueRefund.emit(event);
    }
    resetForm(val, field) {
        if (field === 'email' || field === 'all') {
            this.isEmailEmpty = val[0];
            this.emailHasError = val[1];
        }
        if (field === 'postcode' || field === 'all') {
            this.isPostcodeEmpty = val[2];
            this.postcodeHasError = val[3];
        }
        if (field === 'address1' || field === 'all') {
            this.isaddressLine1Empty = val[4];
            this.addressLine1HasError = val[5];
        }
        if (field === 'address2' || field === 'all') {
            this.addressLine2HasError = val[6];
        }
        if (field === 'town' || field === 'all') {
            this.isTownOrCityEmpty = val[7];
            this.townOrCityHasError = val[8];
        }
        if (field === 'county' || field === 'all') {
            this.isCountyEmpty = val[9];
            this.countyHasError = val[10];
        }
        if (field === 'mpostcode' || field === 'all') {
            this.isMPostcodeEmpty = val[11];
            this.mpostcodeHasError = val[12];
        }
        if (field === 'country' || field === 'all') {
            this.isCountryEmpty = val[13];
        }
    }
    static ɵfac = function ContactDetailsComponent_Factory(t) { return new (t || ContactDetailsComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.NotificationService), i0.ɵɵdirectiveInject(i3.PaymentLibComponent)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ContactDetailsComponent, selectors: [["ccpay-contact-details"]], inputs: { isEditOperation: "isEditOperation", isEditOperationInRefundList: "isEditOperationInRefundList", addressObj: "addressObj" }, outputs: { assignContactDetails: "assignContactDetails", assignContactDetailsInFefundsList: "assignContactDetailsInFefundsList", redirectToIssueRefund: "redirectToIssueRefund" }, decls: 28, vars: 6, consts: [[1, "govuk-fieldset", "contact-details--size"], [1, "govuk-section-break", "govuk-section-break--m", "govuk-section-break--visible"], [1, "govuk-form-group"], [1, "govuk-fieldset__legend", "govuk-fieldset__legend--s", "govuk-font19px"], ["id", "contact-hint", 1, "govuk-hint", "govuk-font19px"], [1, "govuk-fieldset"], ["data-module", "govuk-radios", 1, "govuk-radios", "govuk-radios--conditional"], [1, "govuk-radios__item"], ["id", "contact", "name", "contact", "type", "radio", "value", "email", "aria-controls", "conditional-contact", "aria-expanded", "true", 1, "govuk-radios__input", 3, "checked", "click"], ["for", "contact", 1, "govuk-label", "govuk-radios__label", "govuk-font19px"], ["class", "govuk-radios__conditional", "id", "conditional-contact-email", 4, "ngIf"], ["id", "contact-2", "name", "contact", "type", "radio", "value", "post", "aria-controls", "conditional-contact-2", "aria-expanded", "false", 1, "govuk-radios__input", 3, "checked", "click"], ["for", "contact-2", 1, "govuk-label", "govuk-radios__label", "govuk-font19px"], ["class", "govuk-radios__conditional", "id", "conditional-contact-postcode", 4, "ngIf"], ["class", "govuk-radios__conditional", "id", "conditional-contact-manual", 4, "ngIf"], [1, "govuk-button-group"], ["type", "submit", 1, "button", "govuk-button--secondary", "govuk-font19px", 3, "click"], ["type", "submit", 1, "button", "govuk-button", "govuk-font19px", 3, "click"], ["id", "conditional-contact-email", 1, "govuk-radios__conditional"], ["novalidate", "", 3, "formGroup"], ["for", "email", 1, "govuk-label"], [1, "govuk-hint", "govuk-font19px"], ["id", "email-hint", 1, "govuk-hint"], ["id", "email", "name", "", "type", "email", "formControlName", "email", "aria-describedby", "email-hint", 1, "govuk-input", "govuk-font19px", 3, "ngClass", "value"], ["class", "inline-error-message", 4, "ngIf"], [1, "inline-error-message"], [4, "ngIf"], ["id", "conditional-contact-postcode", 1, "govuk-radios__conditional"], ["for", "address-postcode", 1, "govuk-label", "govuk-font19px"], [1, "postcode-align-css"], [1, "govuk-form-group", "govuk-margin-right-10px"], ["id", "address-postcode", "name", "address-postcode", "formControlName", "postcode", "type", "text", "autocomplete", "postal-code", 1, "govuk-input", "govuk-input--width-10", 3, "ngClass"], ["data-module", "govuk-button", 1, "govuk-button", "govuk-button--secondary", "govuk-font19px", 3, "click"], ["class", "govuk-form-group govuk-margin-btm-20px", 4, "ngIf"], ["data-module", "govuk-details", 1, "govuk-details"], [1, "govuk-details__summary"], [1, "govuk-details__summary-text", "govuk-font19px"], ["href", "Javascript:void(0);", 3, "click"], [1, "govuk-form-group", "govuk-margin-btm-20px"], ["for", "country", 1, "govuk-label", "govuk-font19px"], ["id", "postcodeAddress", "name", "postcodeAddress", 1, "govuk-select", "govuk-font19px", 3, "ngModel", "ngClass", "ngModelChange"], [3, "ngValue", 4, "ngFor", "ngForOf"], [3, "ngValue"], ["id", "conditional-contact-manual", 1, "govuk-radios__conditional"], ["for", "address-line-1", 1, "govuk-label", "govuk-font19px"], [1, "govuk-visually-hidden"], ["id", "address-line-1", "name", "address-line-1", "formControlName", "addressl1", "type", "text", "autocomplete", "address-line1", 1, "govuk-input", "govuk-font19px", 3, "ngClass", "value"], ["for", "address-line-2", 1, "govuk-label"], [1, "govuk-visually-hidden", "govuk-font19px"], ["id", "address-line-2", "name", "address-line-2", "formControlName", "addressl2", "type", "text", "autocomplete", "address-line2", 1, "govuk-input", "govuk-font19px", 3, "ngClass"], ["for", "address-town", 1, "govuk-label", "govuk-font19px"], ["id", "address-town", "name", "address-town", "formControlName", "townorcity", "type", "text", "autocomplete", "address-level2", 1, "govuk-input", "govuk-!-width-two-thirds", "govuk-font19px", 3, "ngClass", "value"], ["for", "address-county", 1, "govuk-label", "govuk-font19px"], ["id", "address-county", "formControlName", "county", "name", "address-county", "type", "text", 1, "govuk-input", "govuk-!-width-two-thirds", "govuk-font19px", 3, "ngClass", "value"], ["id", "address-postcode", "formControlName", "mpostcode", "name", "address-postcode", "type", "text", "autocomplete", "postal-code", 1, "govuk-input", "govuk-input--width-10", "govuk-font19px", 3, "ngClass", "value"], ["id", "country", "name", "country", "formControlName", "country", 1, "govuk-select", "govuk-font19px", 3, "ngClass"], ["value", "", "selected", "selected"], ["value", "United Kingdom", 3, "selected"]], template: function ContactDetailsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "fieldset", 0);
            i0.ɵɵelement(1, "hr", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "legend", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 4);
            i0.ɵɵtext(6, " Notifications will be sent via email or post when this refund is issued or rejected. You can only choose one option. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div", 2)(8, "fieldset", 5)(9, "div", 6)(10, "div", 7)(11, "input", 8);
            i0.ɵɵlistener("click", function ContactDetailsComponent_Template_input_click_11_listener() { return ctx.selectContactOption("Email", "false"); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "label", 9);
            i0.ɵɵtext(13, " Email ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(14, ContactDetailsComponent_div_14_Template, 9, 6, "div", 10);
            i0.ɵɵelementStart(15, "div", 7)(16, "input", 11);
            i0.ɵɵlistener("click", function ContactDetailsComponent_Template_input_click_16_listener() { return ctx.selectContactOption("Postcode", "false"); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "label", 12);
            i0.ɵɵtext(18, " Post ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(19, ContactDetailsComponent_div_19_Template, 19, 6, "div", 13);
            i0.ɵɵtemplate(20, ContactDetailsComponent_div_20_Template, 41, 30, "div", 14);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelement(21, "hr", 1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 15)(23, "button", 16);
            i0.ɵɵlistener("click", function ContactDetailsComponent_Template_button_click_23_listener($event) { return ctx.redirection($event); });
            i0.ɵɵtext(24, " Previous ");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(25, "\n\u00A0\n");
            i0.ɵɵelementStart(26, "button", 17);
            i0.ɵɵlistener("click", function ContactDetailsComponent_Template_button_click_26_listener() { return ctx.finalFormSubmit(); });
            i0.ɵɵtext(27, " Continue\n");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", ctx.isEditOperation ? "Edit contact information" : "Contact information", " ");
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("checked", ctx.isEmailSAddressClicked);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.isEmailSAddressClicked);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("checked", ctx.isPostcodeClicked);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.isPostcodeClicked && !ctx.isManualAddressClicked);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.isPostcodeClicked && ctx.isManualAddressClicked);
        } }, dependencies: [i4.NgClass, i4.NgForOf, i4.NgIf, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.NgModel, i1.FormGroupDirective, i1.FormControlName], styles: [".govuk-font19px[_ngcontent-%COMP%]{font-size:19px}.inline-error-class[_ngcontent-%COMP%]{outline:3px solid #a71414;outline-offset:0}.inline-error-message[_ngcontent-%COMP%]{color:#a71414;font-weight:700;margin-top:10px}.contact-details--size[_ngcontent-%COMP%]{width:50%}.postcode-align-css[_ngcontent-%COMP%]{display:flex;flex-direction:row}.govuk-margin-right-10px[_ngcontent-%COMP%]{margin-right:10px}.govuk-margin-btm-20px[_ngcontent-%COMP%]{margin-bottom:20px!important}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContactDetailsComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-contact-details', template: "<fieldset class=\"govuk-fieldset contact-details--size\">\n  <hr class=\"govuk-section-break govuk-section-break--m govuk-section-break--visible\">\n  <div class=\"govuk-form-group\">\n    <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--s govuk-font19px\">\n      {{ isEditOperation ? 'Edit contact information' : 'Contact information' }}\n    </legend>\n    <div id=\"contact-hint\" class=\"govuk-hint govuk-font19px\">\n      Notifications will be sent via email or post when this refund is issued or rejected. You can only choose one option.\n    </div>\n    <div class=\"govuk-form-group\">\n      <fieldset class=\"govuk-fieldset\">\n        <div class=\"govuk-radios govuk-radios--conditional\" data-module=\"govuk-radios\">\n          <div class=\"govuk-radios__item\">\n            <input class=\"govuk-radios__input\" id=\"contact\" name=\"contact\" (click)=\"selectContactOption('Email', 'false')\" type=\"radio\" value=\"email\" [checked]=\"isEmailSAddressClicked\"  aria-controls=\"conditional-contact\" aria-expanded=\"true\">\n            <label class=\"govuk-label govuk-radios__label govuk-font19px\" for=\"contact\">\n              Email\n            </label>\n          </div>\n          <div class=\"govuk-radios__conditional\" id=\"conditional-contact-email\" *ngIf=\"isEmailSAddressClicked\">\n            <form [formGroup]=\"emailAddressForm\" novalidate>\n            <div class=\"govuk-form-group\">\n              <label class=\"govuk-label \" for=\"email\">\n                <span class=\"govuk-hint govuk-font19px\">Information about this refund will be sent to this email address.</span>\n              </label>\n\n              <div id=\"email-hint\" class=\"govuk-hint\">\n              </div>\n              <input class=\"govuk-input govuk-font19px\" id=\"email\" name=\"\" type=\"email\" [ngClass]=\"{ 'inline-error-class': isEmailEmpty || emailHasError }\" value=\"{{addressObj?.contact_details?.email}}\" formControlName=\"email\" aria-describedby=\"email-hint\">\n              <p class=\"inline-error-message\" *ngIf=\"isEmailEmpty || emailHasError\">\n                <span *ngIf=\"isEmailEmpty\">Enter a email address.</span>\n                <span *ngIf=\"emailHasError\">Enter a valid email address.</span>\n              </p>\n            </div>\n            </form>\n          </div>\n          <div class=\"govuk-radios__item\">\n            <input class=\"govuk-radios__input\" id=\"contact-2\" name=\"contact\" (click)=\"selectContactOption('Postcode', 'false')\" type=\"radio\" [checked]=\"isPostcodeClicked\" value=\"post\" aria-controls=\"conditional-contact-2\" aria-expanded=\"false\">\n            <label class=\"govuk-label govuk-radios__label govuk-font19px\" for=\"contact-2\">\n              Post\n            </label>\n          </div>\n          <div class=\"govuk-radios__conditional\" id=\"conditional-contact-postcode\" *ngIf=\"isPostcodeClicked && !isManualAddressClicked\">\n            <form [formGroup]=\"postCodeForm\" novalidate>\n              <label class=\"govuk-label govuk-font19px\" for=\"address-postcode\">\n                <span class=\"govuk-hint govuk-font19px\">Information about this refund will be sent to this address.</span>Postcode\n              </label>\n              <div class=\"postcode-align-css\">\n              <div class=\"govuk-form-group govuk-margin-right-10px\">\n              <input class=\"govuk-input govuk-input--width-10\" id=\"address-postcode\" name=\"address-postcode\" [ngClass]=\"{ 'inline-error-class': isPostcodeEmpty || postcodeHasError }\" formControlName=\"postcode\" type=\"text\" autocomplete=\"postal-code\">\n              <p class=\"inline-error-message\" *ngIf=\"isPostcodeEmpty || postcodeHasError\">\n                <span *ngIf=\"isPostcodeEmpty\">Enter a postcode.</span>\n                <span *ngIf=\"postcodeHasError\">Enter a valid postcode.</span>\n              </p>\n            </div>\n            <div class=\"govuk-button-group\">\n              <button class=\"govuk-button govuk-button--secondary govuk-font19px\" (click)=\"postcodeValidation('FA')\" data-module=\"govuk-button\">\n                Find address\n              </button>\n            </div>\n          </div>\n            </form>\n            <div class=\"govuk-form-group govuk-margin-btm-20px\" *ngIf=\"isShowPickAddress\">\n              <label class=\"govuk-label govuk-font19px\" for=\"country\">\n                Pick an address\n              </label>\n              <select class=\"govuk-select govuk-font19px\" [(ngModel)]=\"postcodeAddress\" id=\"postcodeAddress\" [ngClass]=\"{ 'inline-error-class': isAddressBoxEmpty }\" name=\"postcodeAddress\">\n                <option *ngFor=\"let address of addressPostcodeList;\" [ngValue]=\"address.DPA\" > {{address.DPA.ADDRESS}}</option>\n              </select> \n              <p class=\"inline-error-message\" *ngIf=\"isAddressBoxEmpty\">\n                <span *ngIf=\"isAddressBoxEmpty\">Please select an address.</span>\n              </p>\n            </div>\n            <details class=\"govuk-details\" data-module=\"govuk-details\">\n              <summary class=\"govuk-details__summary\">\n                <span class=\"govuk-details__summary-text govuk-font19px\">\n                  <a href=\"Javascript:void(0);\" (click)=\"selectContactOption('Postcode', 'true')\">  Enter address manually</a>\n                </span>\n              </summary>\n            </details>\n          </div>\n          <div class=\"govuk-radios__conditional\" id=\"conditional-contact-manual\" *ngIf=\"isPostcodeClicked && isManualAddressClicked\">\n            <form [formGroup]=\"manualAddressForm\" novalidate>\n\n            <div class=\"govuk-form-group\">\n              <label class=\"govuk-label govuk-font19px\" for=\"address-line-1\">\n                <span class=\"govuk-hint govuk-font19px\">Information about this refund will be sent to this address.</span>Building and street <span class=\"govuk-visually-hidden\">line 1 of 2</span>\n              </label>\n              <input class=\"govuk-input govuk-font19px\" id=\"address-line-1\" name=\"address-line-1\" [ngClass]=\"{ 'inline-error-class': isaddressLine1Empty || addressLine1HasError }\" value=\"{{addressObj?.contact_details?.address_line}}\" formControlName=\"addressl1\" type=\"text\" autocomplete=\"address-line1\">\n              <p class=\"inline-error-message\" *ngIf=\"isaddressLine1Empty || addressLine1HasError\">\n                <span *ngIf=\"isaddressLine1Empty\">Enter a Building and street.</span>\n                <span *ngIf=\"addressLine1HasError\">Enter a valid Building and street.</span>\n              </p>  \n            </div>\n            <div class=\"govuk-form-group\">\n              <label class=\"govuk-label\" for=\"address-line-2\">\n                <span class=\"govuk-visually-hidden govuk-font19px\">Building and street line 2 of 2</span>\n              </label>\n              <input class=\"govuk-input govuk-font19px\" id=\"address-line-2\" name=\"address-line-2\" [ngClass]=\"{ 'inline-error-class': addressLine2HasError}\" formControlName=\"addressl2\" type=\"text\" autocomplete=\"address-line2\">\n              <p class=\"inline-error-message\" *ngIf=\"addressLine2HasError\">\n                <span *ngIf=\"addressLine2HasError\">Enter a valid Building and street line 2 of 2.</span>\n              </p>  \n            </div>\n            <div class=\"govuk-form-group\">\n              <label class=\"govuk-label govuk-font19px\" for=\"address-town\">\n                Town or city\n              </label>\n              <input class=\"govuk-input govuk-!-width-two-thirds govuk-font19px\" id=\"address-town\" name=\"address-town\" [ngClass]=\"{ 'inline-error-class': isTownOrCityEmpty || townOrCityHasError}\" value=\"{{addressObj?.contact_details?.city}}\" formControlName=\"townorcity\" type=\"text\" autocomplete=\"address-level2\">\n              <p class=\"inline-error-message\" *ngIf=\"isTownOrCityEmpty || townOrCityHasError\">\n                <span *ngIf=\"isTownOrCityEmpty\">Enter a town or city.</span>\n                <span *ngIf=\"townOrCityHasError\">Enter a town or city.</span>\n              </p>  \n            </div>\n            <div class=\"govuk-form-group\">\n              <label class=\"govuk-label govuk-font19px\" for=\"address-county\">\n                County\n              </label>\n              <input class=\"govuk-input govuk-!-width-two-thirds govuk-font19px\" id=\"address-county\" [ngClass]=\"{ 'inline-error-class': isCountyEmpty || countyHasError}\" value=\"{{addressObj?.contact_details?.county}}\" formControlName=\"county\" name=\"address-county\" type=\"text\">\n              <p class=\"inline-error-message\" *ngIf=\"isCountyEmpty || countyHasError\">\n                <span *ngIf=\"isCountyEmpty\">Enter a County.</span>\n                <span *ngIf=\"countyHasError\">Enter a valid County.</span>\n              </p>  \n            </div>\n            <div class=\"govuk-form-group\">\n              <label class=\"govuk-label govuk-font19px\" for=\"address-postcode\">\n                Postcode\n              </label>\n              <input class=\"govuk-input govuk-input--width-10 govuk-font19px\" id=\"address-postcode\" formControlName=\"mpostcode\" name=\"address-postcode\" [ngClass]=\"{ 'inline-error-class': isMPostcodeEmpty || mpostcodeHasError}\" value=\"{{addressObj?.contact_details?.postal_code}}\" type=\"text\" autocomplete=\"postal-code\">\n              <p class=\"inline-error-message\" *ngIf=\"isMPostcodeEmpty || mpostcodeHasError\">\n                <span *ngIf=\"isMPostcodeEmpty\">Enter a postcode.</span>\n                <span *ngIf=\"mpostcodeHasError\">Enter a valid postcode.</span>\n              </p>  \n            </div>\n            <div class=\"govuk-form-group\">\n              <label class=\"govuk-label govuk-font19px\" for=\"country\">\n                Country\n              </label>\n              <select class=\"govuk-select govuk-font19px\" id=\"country\" name=\"country\" [ngClass]=\"{'inline-error-class': isCountryEmpty}\" formControlName=\"country\">\n                <option value=\"\" selected=\"selected\">Please select</option>\n                <option value=\"United Kingdom\" selected=\"{{ addressObj?.contact_details?.country ? 'selected' : '' }}\">United Kingdom</option>\n              </select>\n              <p class=\"inline-error-message\" *ngIf=\"isCountryEmpty\">\n                <span *ngIf=\"isCountryEmpty\">Select a Country.</span>\n              </p>  \n            </div>\n            </form>\n          </div>\n        </div>\n      </fieldset>\n    </div>\n    <!---FORM--->\n  </div>\n\n<hr class=\"govuk-section-break govuk-section-break--m govuk-section-break--visible\">\n</fieldset>\n<div class=\"govuk-button-group\">\n<button type=\"submit\" class=\"button govuk-button--secondary govuk-font19px\" (click)=\"redirection($event)\"> Previous </button>\n&nbsp;\n<button type=\"submit\" class=\"button govuk-button govuk-font19px\" (click)=\"finalFormSubmit()\">\n  Continue\n</button>\n</div>", styles: [".govuk-font19px{font-size:19px}.inline-error-class{outline:3px solid #a71414;outline-offset:0}.inline-error-message{color:#a71414;font-weight:700;margin-top:10px}.contact-details--size{width:50%}.postcode-align-css{display:flex;flex-direction:row}.govuk-margin-right-10px{margin-right:10px}.govuk-margin-btm-20px{margin-bottom:20px!important}\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.NotificationService }, { type: i3.PaymentLibComponent }]; }, { isEditOperation: [{
            type: Input,
            args: ['isEditOperation']
        }], isEditOperationInRefundList: [{
            type: Input,
            args: ['isEditOperationInRefundList']
        }], addressObj: [{
            type: Input,
            args: ['addressObj']
        }], assignContactDetails: [{
            type: Output
        }], assignContactDetailsInFefundsList: [{
            type: Output
        }], redirectToIssueRefund: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9jb250YWN0LWRldGFpbHMvY29udGFjdC1kZXRhaWxzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9jb250YWN0LWRldGFpbHMvY29udGFjdC1kZXRhaWxzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0RBQWtELENBQUM7Ozs7Ozs7SUMwQnZFLDRCQUEyQjtJQUFBLHNDQUFzQjtJQUFBLGlCQUFPOzs7SUFDeEQsNEJBQTRCO0lBQUEsNENBQTRCO0lBQUEsaUJBQU87OztJQUZqRSw2QkFBc0U7SUFDcEUsc0ZBQXdEO0lBQ3hELHNGQUErRDtJQUNqRSxpQkFBSTs7O0lBRkssZUFBa0I7SUFBbEIsMENBQWtCO0lBQ2xCLGVBQW1CO0lBQW5CLDJDQUFtQjs7OztJQVpoQywrQkFBcUcsZUFBQSxhQUFBLGdCQUFBLGVBQUE7SUFJdkQsaUZBQWlFO0lBQUEsaUJBQU8sRUFBQTtJQUdsSCwwQkFDTSxnQkFBQTtJQUVOLDRFQUdJO0lBQ04saUJBQU0sRUFBQSxFQUFBOzs7SUFiQSxlQUE4QjtJQUE5QixtREFBOEI7SUFRNEcsZUFBOEM7SUFBOUMsZ0tBQThDO0lBQWxILGlHQUFt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QzFGLDRCQUNGO1lBQUEsaUJBQVMsRUFBQTs7WUEzSkgsZUFDRjtZQURFLHlHQUNGO1lBUWtKLGVBQWtDO1lBQWxDLG9EQUFrQztZQUt2RyxlQUE0QjtZQUE1QixpREFBNEI7WUFrQmdDLGVBQTZCO1lBQTdCLCtDQUE2QjtZQUt0RixlQUFrRDtZQUFsRCwyRUFBa0Q7WUF1Q3BELGVBQWlEO1lBQWpELDBFQUFpRDs7O3VGRHRFdEgsdUJBQXVCO2NBTG5DLFNBQVM7MkJBQ0UsdUJBQXVCO2tJQUtQLGVBQWU7a0JBQXhDLEtBQUs7bUJBQUMsaUJBQWlCO1lBQ2MsMkJBQTJCO2tCQUFoRSxLQUFLO21CQUFDLDZCQUE2QjtZQUNmLFVBQVU7a0JBQTlCLEtBQUs7bUJBQUMsWUFBWTtZQUNULG9CQUFvQjtrQkFBN0IsTUFBTTtZQUNHLGlDQUFpQztrQkFBMUMsTUFBTTtZQUNHLHFCQUFxQjtrQkFBOUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUGF5bWVudExpYkNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3BheW1lbnQtbGliLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NwYXktY29udGFjdC1kZXRhaWxzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnRhY3QtZGV0YWlscy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbnRhY3QtZGV0YWlscy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29udGFjdERldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoJ2lzRWRpdE9wZXJhdGlvbicpIGlzRWRpdE9wZXJhdGlvbjogYm9vbGVhbjtcbiAgQElucHV0KCdpc0VkaXRPcGVyYXRpb25JblJlZnVuZExpc3QnKSBpc0VkaXRPcGVyYXRpb25JblJlZnVuZExpc3Q6IGJvb2xlYW47XG4gIEBJbnB1dCgnYWRkcmVzc09iaicpIGFkZHJlc3NPYmo6IGFueTtcbiAgQE91dHB1dCgpIGFzc2lnbkNvbnRhY3REZXRhaWxzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFzc2lnbkNvbnRhY3REZXRhaWxzSW5GZWZ1bmRzTGlzdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZWRpcmVjdFRvSXNzdWVSZWZ1bmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwYWdlVGl0bGU6IHN0cmluZyA9ICdQYXltZW50IHN0YXR1cyBoaXN0b3J5JztcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gIGlzRW1haWxTQWRkcmVzc0NsaWNrZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBpc1Nob3dQaWNrQWRkcmVzczogIGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNQb3N0Y29kZUNsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNNYW51YWxBZGRyZXNzQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBlbWFpbEFkZHJlc3NGb3JtOiBGb3JtR3JvdXA7XG4gIHBvc3RDb2RlRm9ybTogRm9ybUdyb3VwO1xuICBtYW51YWxBZGRyZXNzRm9ybTogRm9ybUdyb3VwO1xuICBhZGRyZXNzUG9zdGNvZGVMaXN0OmFueVtdID0gW107XG4gIHBvc3Rjb2RlQWRkcmVzczphbnk7XG4gIGlzQWRkcmVzc0JveEVtcHR5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgaXNFbWFpbEVtcHR5OiBib29sZWFuID0gZmFsc2U7XG4gIGVtYWlsSGFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNQb3N0Y29kZUVtcHR5OiBib29sZWFuID0gZmFsc2U7XG4gIHBvc3Rjb2RlSGFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNhZGRyZXNzTGluZTFFbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xuICBhZGRyZXNzTGluZTFIYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICBhZGRyZXNzTGluZTJIYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1Rvd25PckNpdHlFbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xuICB0b3duT3JDaXR5SGFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNDb3VudHlFbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xuICBjb3VudHlIYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICBpc01Qb3N0Y29kZUVtcHR5OiBib29sZWFuID0gZmFsc2U7XG4gIG1wb3N0Y29kZUhhc0Vycm9yOiBib29sZWFuID0gZmFsc2U7XG4gIGlzQ291bnRyeUVtcHR5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwYXltZW50TGliQ29tcG9uZW50OiBQYXltZW50TGliQ29tcG9uZW50KSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlc2V0Rm9ybShbZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLCAnYWxsJyk7XG5cbiAgICB0aGlzLmVtYWlsQWRkcmVzc0Zvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGVtYWlsOiBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgIFZhbGlkYXRvcnMucGF0dGVybignLitAKy4rXFxcXC4rLisnKVxuICAgICAgXSkpXG4gICAgfSk7XG4gICAgdGhpcy5wb3N0Q29kZUZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHBvc3Rjb2RlOiBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgIFZhbGlkYXRvcnMucGF0dGVybignXihbQS1aYS16XXsxLDJ9WzAtOV17MSwyfVtBLVphLXpdezAsMX0gP1swLTldW0EtWmEtel17Mn0pJylcbiAgICAgIF0pKVxuICAgIH0pO1xuICAgIHRoaXMubWFudWFsQWRkcmVzc0Zvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGFkZHJlc3NsMTogbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oJ15bYS16QS1aMC05XFxcXHMsXFwnLV0qJCcpXG4gICAgICBdKSksXG4gICAgICBhZGRyZXNzbDI6IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgVmFsaWRhdG9ycy5wYXR0ZXJuKCdeW2EtekEtWjAtOVxcXFxzLFxcJy1dKiQnKVxuICAgICAgXSkpLFxuICAgICAgdG93bm9yY2l0eTogbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oJ15bYS16QS1aMC05XFxcXHMsXFwnLV0qJCcpXG4gICAgICBdKSksXG4gICAgICBjb3VudHk6IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgVmFsaWRhdG9ycy5wYXR0ZXJuKCdeW2EtekEtWjAtOVxcXFxzLFxcJy1dKiQnKVxuICAgICAgXSkpLFxuICAgICAgbXBvc3Rjb2RlOiBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgIFZhbGlkYXRvcnMucGF0dGVybignXihbQS1aYS16XXsxLDJ9WzAtOV17MSwyfVtBLVphLXpdezAsMX0gP1swLTldW0EtWmEtel17Mn0pJylcbiAgICAgIF0pKSxcbiAgICAgIGNvdW50cnk6IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZFxuICAgICAgXSkpXG4gICAgfSk7XG4gICAgaWYodGhpcy5hZGRyZXNzT2JqICE9PSB1bmRlZmluZWQgJiYgdGhpcy5hZGRyZXNzT2JqICE9PSAnJykge1xuICAgICAgdGhpcy5zZXRFZGl0RGV0YWlscygpO1xuICAgIH1cbiAgICBpZih0aGlzLmlzRWRpdE9wZXJhdGlvbkluUmVmdW5kTGlzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmlzRWRpdE9wZXJhdGlvbkluUmVmdW5kTGlzdCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBzZXRFZGl0RGV0YWlscygpIHtcbiAgICBpZih0aGlzLmFkZHJlc3NPYmoubm90aWZpY2F0aW9uX3R5cGUgPT09ICdFTUFJTCcpIHtcbiAgICAgIHRoaXMuaXNFbWFpbFNBZGRyZXNzQ2xpY2tlZCA9IHRydWU7XG4gICAgICB0aGlzLmlzUG9zdGNvZGVDbGlja2VkID0gZmFsc2U7XG4gICAgICB0aGlzLmlzTWFudWFsQWRkcmVzc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW1haWxBZGRyZXNzRm9ybS5zZXRWYWx1ZSh7IGVtYWlsOiB0aGlzLmFkZHJlc3NPYmouY29udGFjdF9kZXRhaWxzLmVtYWlsIH0pO1xuICAgIH0gZWxzZSBpZih0aGlzLmFkZHJlc3NPYmoubm90aWZpY2F0aW9uX3R5cGUgPT09ICdMRVRURVInKSB7XG4gICAgICB0aGlzLmlzRW1haWxTQWRkcmVzc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNQb3N0Y29kZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgdGhpcy5pc01hbnVhbEFkZHJlc3NDbGlja2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMubWFudWFsQWRkcmVzc0Zvcm0ucGF0Y2hWYWx1ZSh7IFxuICAgICAgICBhZGRyZXNzbDE6IHRoaXMuYWRkcmVzc09iai5jb250YWN0X2RldGFpbHMuYWRkcmVzc19saW5lLFxuICAgICAgICB0b3dub3JjaXR5OiB0aGlzLmFkZHJlc3NPYmouY29udGFjdF9kZXRhaWxzLmNpdHksXG4gICAgICAgIGNvdW50eTogdGhpcy5hZGRyZXNzT2JqLmNvbnRhY3RfZGV0YWlscy5jb3VudHksXG4gICAgICAgIGNvdW50cnk6IHRoaXMuYWRkcmVzc09iai5jb250YWN0X2RldGFpbHMuY291bnRyeSxcbiAgICAgICAgbXBvc3Rjb2RlOiB0aGlzLmFkZHJlc3NPYmouY29udGFjdF9kZXRhaWxzLnBvc3RhbF9jb2RlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RDb250YWN0T3B0aW9uKHR5cGUsIGlzTGlua2VkQ2xpZWQpIHtcbiAgICB0aGlzLnJlc2V0Rm9ybShbZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLCAnYWxsJyk7XG4gICAgaWYoIHR5cGUgPT09ICdFbWFpbCcgJiYgaXNMaW5rZWRDbGllZCA9PT0gJ2ZhbHNlJyl7XG4gICAgICB0aGlzLmlzRW1haWxTQWRkcmVzc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgdGhpcy5pc1Bvc3Rjb2RlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5pc01hbnVhbEFkZHJlc3NDbGlja2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmKHR5cGUgPT09ICdQb3N0Y29kZScgJiYgaXNMaW5rZWRDbGllZCA9PT0gJ2ZhbHNlJykge1xuICAgICAgdGhpcy5pc0VtYWlsU0FkZHJlc3NDbGlja2VkID0gZmFsc2U7XG4gICAgICB0aGlzLmlzUG9zdGNvZGVDbGlja2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNNYW51YWxBZGRyZXNzQ2xpY2tlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZih0eXBlID09PSAnUG9zdGNvZGUnICYmIGlzTGlua2VkQ2xpZWQgPT09ICd0cnVlJykge1xuICAgICAgdGhpcy5pc0VtYWlsU0FkZHJlc3NDbGlja2VkID0gZmFsc2U7XG4gICAgICB0aGlzLmlzUG9zdGNvZGVDbGlja2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNNYW51YWxBZGRyZXNzQ2xpY2tlZCA9IHRydWU7XG5cbiAgICB9XG4gIH1cblxuICBmaW5hbEZvcm1TdWJtaXQoKSB7XG4gICAgdGhpcy5yZXNldEZvcm0oW2ZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSwgJ2FsbCcpO1xuICAgIGlmKCB0aGlzLmlzRW1haWxTQWRkcmVzc0NsaWNrZWQgKXtcbiAgICAgIGNvbnN0IGVtYWlsRmllbGQgPSB0aGlzLmVtYWlsQWRkcmVzc0Zvcm0uY29udHJvbHMuZW1haWw7XG4gICAgICBpZiAodGhpcy5lbWFpbEFkZHJlc3NGb3JtLnZhbGlkKSB7XG4gICAgICAgIGlmKCF0aGlzLmlzRWRpdE9wZXJhdGlvbkluUmVmdW5kTGlzdCkge1xuICAgICAgICB0aGlzLmFzc2lnbkNvbnRhY3REZXRhaWxzLmVtaXQoIHtcbiAgICAgICAgICBlbWFpbDogZW1haWxGaWVsZC52YWx1ZSxcbiAgICAgICAgICBub3RpZmljYXRpb25fdHlwZTogJ0VNQUlMJ1xuICAgICAgICB9ICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFzc2lnbkNvbnRhY3REZXRhaWxzSW5GZWZ1bmRzTGlzdC5lbWl0KHtcbiAgICAgICAgICBlbWFpbDogZW1haWxGaWVsZC52YWx1ZSxcbiAgICAgICAgICBub3RpZmljYXRpb25fdHlwZTogJ0VNQUlMJ1xuICAgICAgICB9ICk7XG4gICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiggZW1haWxGaWVsZC52YWx1ZSA9PSAnJyApIHtcbiAgICAgICAgICB0aGlzLnJlc2V0Rm9ybShbdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sICdlbWFpbCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVtYWlsRmllbGQudmFsdWUgIT0gJycgJiYgZW1haWxGaWVsZC5pbnZhbGlkICkge1xuICAgICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSx0cnVlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSwgJ2VtYWlsJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoIHRoaXMuaXNQb3N0Y29kZUNsaWNrZWQgJiYgIXRoaXMuaXNNYW51YWxBZGRyZXNzQ2xpY2tlZCApIHtcbiAgICAgIHRoaXMucG9zdGNvZGVWYWxpZGF0aW9uKCdGUycpO1xuICAgIH0gZWxzZSBpZih0aGlzLmlzUG9zdGNvZGVDbGlja2VkICYmIHRoaXMuaXNNYW51YWxBZGRyZXNzQ2xpY2tlZCkge1xuICAgICAgY29uc3QgZmllbGRDdHJscyA9IHRoaXMubWFudWFsQWRkcmVzc0Zvcm0uY29udHJvbHM7XG4gICAgICBpZiAodGhpcy5tYW51YWxBZGRyZXNzRm9ybS52YWxpZCkge1xuICAgICAgICBpZighdGhpcy5pc0VkaXRPcGVyYXRpb25JblJlZnVuZExpc3QpIHtcbiAgICAgICAgdGhpcy5hc3NpZ25Db250YWN0RGV0YWlscy5lbWl0KHtcbiAgICAgICAgICBhZGRyZXNzX2xpbmU6IGZpZWxkQ3RybHMuYWRkcmVzc2wxLnZhbHVlKycgJytmaWVsZEN0cmxzLmFkZHJlc3NsMi52YWx1ZSxcbiAgICAgICAgICBjaXR5OiBmaWVsZEN0cmxzLnRvd25vcmNpdHkudmFsdWUsXG4gICAgICAgICAgY291bnR5OiBmaWVsZEN0cmxzLmNvdW50eS52YWx1ZSxcbiAgICAgICAgICBwb3N0YWxfY29kZTogZmllbGRDdHJscy5tcG9zdGNvZGUudmFsdWUsXG4gICAgICAgICAgY291bnRyeTogZmllbGRDdHJscy5jb3VudHJ5LnZhbHVlLFxuICAgICAgICAgIG5vdGlmaWNhdGlvbl90eXBlOiAnTEVUVEVSJ1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXNzaWduQ29udGFjdERldGFpbHNJbkZlZnVuZHNMaXN0LmVtaXQoe1xuICAgICAgICAgIGFkZHJlc3NfbGluZTogZmllbGRDdHJscy5hZGRyZXNzbDEudmFsdWUrJyAnK2ZpZWxkQ3RybHMuYWRkcmVzc2wyLnZhbHVlLFxuICAgICAgICAgIGNpdHk6IGZpZWxkQ3RybHMudG93bm9yY2l0eS52YWx1ZSxcbiAgICAgICAgICBjb3VudHk6IGZpZWxkQ3RybHMuY291bnR5LnZhbHVlLFxuICAgICAgICAgIHBvc3RhbF9jb2RlOiBmaWVsZEN0cmxzLm1wb3N0Y29kZS52YWx1ZSxcbiAgICAgICAgICBjb3VudHJ5OiBmaWVsZEN0cmxzLmNvdW50cnkudmFsdWUsXG4gICAgICAgICAgbm90aWZpY2F0aW9uX3R5cGU6ICdMRVRURVInXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoIGZpZWxkQ3RybHMuYWRkcmVzc2wxLnZhbHVlID09ICcnICkge1xuICAgICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSwgJ2FkZHJlc3MxJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZmllbGRDdHJscy5hZGRyZXNzbDEudmFsdWUgIT0gJycgJiYgZmllbGRDdHJscy5hZGRyZXNzbDEuaW52YWxpZCApIHtcbiAgICAgICAgICB0aGlzLnJlc2V0Rm9ybShbZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sICdhZGRyZXNzMScpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGZpZWxkQ3RybHMuYWRkcmVzc2wyLnZhbHVlICE9ICcnICYmIGZpZWxkQ3RybHMuYWRkcmVzc2wyLmludmFsaWQgKSB7XG4gICAgICAgICAgdGhpcy5yZXNldEZvcm0oW2ZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLCAnYWRkcmVzczInKTtcbiAgICAgICAgfVxuICAgICAgICBpZiggZmllbGRDdHJscy50b3dub3JjaXR5LnZhbHVlID09ICcnICkge1xuICAgICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSwgJ3Rvd24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZihmaWVsZEN0cmxzLnRvd25vcmNpdHkudmFsdWUgIT0gJycgJiYgZmllbGRDdHJscy50b3dub3JjaXR5LmludmFsaWQgKSB7XG4gICAgICAgICAgdGhpcy5yZXNldEZvcm0oW2ZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLCAndG93bicpO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBmaWVsZEN0cmxzLmNvdW50eS52YWx1ZSA9PSAnJyApIHtcbiAgICAgICAgICB0aGlzLnJlc2V0Rm9ybShbZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sICdjb3VudHknKTtcbiAgICAgICAgfVxuICAgICAgICBpZihmaWVsZEN0cmxzLmNvdW50eS52YWx1ZSAhPSAnJyAmJiBmaWVsZEN0cmxzLmNvdW50eS5pbnZhbGlkICkge1xuICAgICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSwgJ2NvdW50eScpO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBmaWVsZEN0cmxzLm1wb3N0Y29kZS52YWx1ZSA9PSAnJyApIHtcbiAgICAgICAgICB0aGlzLnJlc2V0Rm9ybShbZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZV0sICdtcG9zdGNvZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZihmaWVsZEN0cmxzLm1wb3N0Y29kZS52YWx1ZSAhPSAnJyAmJiBmaWVsZEN0cmxzLm1wb3N0Y29kZS5pbnZhbGlkICkge1xuICAgICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlXSwgJ21wb3N0Y29kZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBmaWVsZEN0cmxzLmNvdW50cnkudmFsdWUgPT0gJycgKSB7XG4gICAgICAgICAgdGhpcy5yZXNldEZvcm0oW2ZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLHRydWVdLCAnY291bnRyeScpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIHBvc3Rjb2RlVmFsaWRhdGlvbihzdHIpIHtcbiAgICB0aGlzLnJlc2V0Rm9ybShbZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLCAnYWxsJyk7XG4gICAgY29uc3QgcG9zdGNvZGVGaWVsZCA9IHRoaXMucG9zdENvZGVGb3JtLmNvbnRyb2xzLnBvc3Rjb2RlO1xuICAgIGlmICh0aGlzLnBvc3RDb2RlRm9ybS52YWxpZCkge1xuICAgICAgaWYoc3RyID09PSAnRkEnKSB7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5nZXRBZGRyZXNzQnlQb3N0Y29kZShwb3N0Y29kZUZpZWxkLnZhbHVlKS5zdWJzY3JpYmUoXG4gICAgICAgICAgcmVmdW5kc05vdGlmaWNhdGlvbiA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3NQb3N0Y29kZUxpc3QgPSByZWZ1bmRzTm90aWZpY2F0aW9uWydyZXN1bHRzJ107XG4gICAgICAgICAgICB0aGlzLmlzU2hvd1BpY2tBZGRyZXNzID0gcmVmdW5kc05vdGlmaWNhdGlvblsnaGVhZGVyJ10udG90YWxyZXN1bHRzID4gMDtcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzU2hvd1BpY2tBZGRyZXNzKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSwgJ3Bvc3Rjb2RlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICApLFxuICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNTaG93UGlja0FkZHJlc3MgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yLnJlcGxhY2UoL1wiL2csXCJcIik7XG4gICAgICAgIH07IFxuICAgICAgfSBlbHNlIGlmIChzdHIgPT09ICdGUycpIHtcbiAgICAgICAgaWYodGhpcy5wb3N0Y29kZUFkZHJlc3MgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnBvc3Rjb2RlQWRkcmVzcykge1xuICAgICAgICAgIHRoaXMuaXNBZGRyZXNzQm94RW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgYWRkcmVzc0xpbmU9XCJcIjtcbiAgICAgICAgICBsZXQgYWRkcmVzc0FycmF5ID0gdGhpcy5wb3N0Y29kZUFkZHJlc3MuQUREUkVTUy5zcGxpdChcIixcIik7XG4gICAgICAgICAgZm9yKCBsZXQgaT0wOyBpPGFkZHJlc3NBcnJheS5sZW5ndGgtMjsgaSsrICkge1xuICAgICAgICAgICAgYWRkcmVzc0xpbmUgKz1hZGRyZXNzQXJyYXlbaV07IFxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBhZGRyZXNzT2JqZWN0ID0ge1xuICAgICAgICAgICAgYWRkcmVzc19saW5lOiBhZGRyZXNzTGluZSxcbiAgICAgICAgICAgIGNpdHk6IHRoaXMucG9zdGNvZGVBZGRyZXNzLlBPU1RfVE9XTixcbiAgICAgICAgICAgIGNvdW50eTogdGhpcy5wb3N0Y29kZUFkZHJlc3MuTE9DQUxfQ1VTVE9ESUFOX0NPREVfREVTQ1JJUFRJT04sXG4gICAgICAgICAgICBwb3N0YWxfY29kZTogdGhpcy5wb3N0Y29kZUFkZHJlc3MuUE9TVENPREUsXG4gICAgICAgICAgICBjb3VudHJ5OiAnVW5pdGVkIEtpbmdkb20nLFxuICAgICAgICAgICAgbm90aWZpY2F0aW9uX3R5cGU6ICdMRVRURVInXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZighdGhpcy5pc0VkaXRPcGVyYXRpb25JblJlZnVuZExpc3QpIHtcbiAgICAgICAgICB0aGlzLmFzc2lnbkNvbnRhY3REZXRhaWxzLmVtaXQoYWRkcmVzc09iamVjdCk7XG4gICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgIHRoaXMuYXNzaWduQ29udGFjdERldGFpbHNJbkZlZnVuZHNMaXN0LmVtaXQoYWRkcmVzc09iamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlzQWRkcmVzc0JveEVtcHR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiggcG9zdGNvZGVGaWVsZC52YWx1ZSA9PSAnJyApIHtcbiAgICAgICAgdGhpcy5yZXNldEZvcm0oW2ZhbHNlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLCAncG9zdGNvZGUnKTtcbiAgICAgIH1cbiAgICAgIGlmKHBvc3Rjb2RlRmllbGQudmFsdWUgIT0gJycgJiYgcG9zdGNvZGVGaWVsZC5pbnZhbGlkICkge1xuICAgICAgICB0aGlzLnJlc2V0Rm9ybShbZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sICdwb3N0Y29kZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZWRpcmVjdGlvbihldmVudDphbnkpIHtcbiAgICB0aGlzLnJlZGlyZWN0VG9Jc3N1ZVJlZnVuZC5lbWl0KGV2ZW50KTtcbiAgfVxuICByZXNldEZvcm0odmFsLCBmaWVsZCkge1xuICAgIGlmKGZpZWxkPT09J2VtYWlsJyB8fCBmaWVsZD09PSdhbGwnKSB7XG4gICAgICB0aGlzLmlzRW1haWxFbXB0eSA9IHZhbFswXTtcbiAgICAgIHRoaXMuZW1haWxIYXNFcnJvciA9IHZhbFsxXTtcbiAgICB9XG4gICAgaWYoZmllbGQ9PT0ncG9zdGNvZGUnIHx8IGZpZWxkPT09J2FsbCcpIHtcbiAgICAgIHRoaXMuaXNQb3N0Y29kZUVtcHR5ID0gdmFsWzJdO1xuICAgICAgdGhpcy5wb3N0Y29kZUhhc0Vycm9yID0gdmFsWzNdO1xuICAgIH1cbiAgICBpZihmaWVsZD09PSdhZGRyZXNzMScgfHwgZmllbGQ9PT0nYWxsJykge1xuICAgICAgdGhpcy5pc2FkZHJlc3NMaW5lMUVtcHR5ID0gdmFsWzRdO1xuICAgICAgdGhpcy5hZGRyZXNzTGluZTFIYXNFcnJvciA9IHZhbFs1XTtcbiAgICB9XG4gICAgaWYoZmllbGQ9PT0nYWRkcmVzczInIHx8IGZpZWxkPT09J2FsbCcpIHtcbiAgICAgIHRoaXMuYWRkcmVzc0xpbmUySGFzRXJyb3IgPSB2YWxbNl07XG4gICAgfVxuICAgIGlmKGZpZWxkPT09J3Rvd24nIHx8IGZpZWxkPT09J2FsbCcpIHtcbiAgICAgIHRoaXMuaXNUb3duT3JDaXR5RW1wdHkgPSB2YWxbN107XG4gICAgICB0aGlzLnRvd25PckNpdHlIYXNFcnJvciA9IHZhbFs4XTtcbiAgICB9XG4gICAgaWYoZmllbGQ9PT0nY291bnR5JyB8fCBmaWVsZD09PSdhbGwnKSB7XG4gICAgICB0aGlzLmlzQ291bnR5RW1wdHkgPSB2YWxbOV07XG4gICAgICB0aGlzLmNvdW50eUhhc0Vycm9yID0gdmFsWzEwXTtcbiAgICB9XG4gICAgaWYoZmllbGQ9PT0nbXBvc3Rjb2RlJyB8fCBmaWVsZD09PSdhbGwnKSB7XG4gICAgICB0aGlzLmlzTVBvc3Rjb2RlRW1wdHkgPSB2YWxbMTFdO1xuICAgICAgdGhpcy5tcG9zdGNvZGVIYXNFcnJvciA9IHZhbFsxMl07XG4gICAgfVxuICAgIGlmKGZpZWxkPT09J2NvdW50cnknIHx8IGZpZWxkPT09J2FsbCcpIHtcbiAgICAgIHRoaXMuaXNDb3VudHJ5RW1wdHkgPSB2YWxbMTNdO1xuICAgIH1cbiAgXG4gIH1cbn1cbiIsIjxmaWVsZHNldCBjbGFzcz1cImdvdnVrLWZpZWxkc2V0IGNvbnRhY3QtZGV0YWlscy0tc2l6ZVwiPlxuICA8aHIgY2xhc3M9XCJnb3Z1ay1zZWN0aW9uLWJyZWFrIGdvdnVrLXNlY3Rpb24tYnJlYWstLW0gZ292dWstc2VjdGlvbi1icmVhay0tdmlzaWJsZVwiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiPlxuICAgIDxsZWdlbmQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldF9fbGVnZW5kIGdvdnVrLWZpZWxkc2V0X19sZWdlbmQtLXMgZ292dWstZm9udDE5cHhcIj5cbiAgICAgIHt7IGlzRWRpdE9wZXJhdGlvbiA/ICdFZGl0IGNvbnRhY3QgaW5mb3JtYXRpb24nIDogJ0NvbnRhY3QgaW5mb3JtYXRpb24nIH19XG4gICAgPC9sZWdlbmQ+XG4gICAgPGRpdiBpZD1cImNvbnRhY3QtaGludFwiIGNsYXNzPVwiZ292dWstaGludCBnb3Z1ay1mb250MTlweFwiPlxuICAgICAgTm90aWZpY2F0aW9ucyB3aWxsIGJlIHNlbnQgdmlhIGVtYWlsIG9yIHBvc3Qgd2hlbiB0aGlzIHJlZnVuZCBpcyBpc3N1ZWQgb3IgcmVqZWN0ZWQuIFlvdSBjYW4gb25seSBjaG9vc2Ugb25lIG9wdGlvbi5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiPlxuICAgICAgPGZpZWxkc2V0IGNsYXNzPVwiZ292dWstZmllbGRzZXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvcyBnb3Z1ay1yYWRpb3MtLWNvbmRpdGlvbmFsXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1yYWRpb3NcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zX19pdGVtXCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2lucHV0XCIgaWQ9XCJjb250YWN0XCIgbmFtZT1cImNvbnRhY3RcIiAoY2xpY2spPVwic2VsZWN0Q29udGFjdE9wdGlvbignRW1haWwnLCAnZmFsc2UnKVwiIHR5cGU9XCJyYWRpb1wiIHZhbHVlPVwiZW1haWxcIiBbY2hlY2tlZF09XCJpc0VtYWlsU0FkZHJlc3NDbGlja2VkXCIgIGFyaWEtY29udHJvbHM9XCJjb25kaXRpb25hbC1jb250YWN0XCIgYXJpYS1leHBhbmRlZD1cInRydWVcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLXJhZGlvc19fbGFiZWwgZ292dWstZm9udDE5cHhcIiBmb3I9XCJjb250YWN0XCI+XG4gICAgICAgICAgICAgIEVtYWlsXG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2NvbmRpdGlvbmFsXCIgaWQ9XCJjb25kaXRpb25hbC1jb250YWN0LWVtYWlsXCIgKm5nSWY9XCJpc0VtYWlsU0FkZHJlc3NDbGlja2VkXCI+XG4gICAgICAgICAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cImVtYWlsQWRkcmVzc0Zvcm1cIiBub3ZhbGlkYXRlPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgXCIgZm9yPVwiZW1haWxcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLWhpbnQgZ292dWstZm9udDE5cHhcIj5JbmZvcm1hdGlvbiBhYm91dCB0aGlzIHJlZnVuZCB3aWxsIGJlIHNlbnQgdG8gdGhpcyBlbWFpbCBhZGRyZXNzLjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZW1haWwtaGludFwiIGNsYXNzPVwiZ292dWstaGludFwiPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstaW5wdXQgZ292dWstZm9udDE5cHhcIiBpZD1cImVtYWlsXCIgbmFtZT1cIlwiIHR5cGU9XCJlbWFpbFwiIFtuZ0NsYXNzXT1cInsgJ2lubGluZS1lcnJvci1jbGFzcyc6IGlzRW1haWxFbXB0eSB8fCBlbWFpbEhhc0Vycm9yIH1cIiB2YWx1ZT1cInt7YWRkcmVzc09iaj8uY29udGFjdF9kZXRhaWxzPy5lbWFpbH19XCIgZm9ybUNvbnRyb2xOYW1lPVwiZW1haWxcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiZW1haWwtaGludFwiPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cImlubGluZS1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJpc0VtYWlsRW1wdHkgfHwgZW1haWxIYXNFcnJvclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNFbWFpbEVtcHR5XCI+RW50ZXIgYSBlbWFpbCBhZGRyZXNzLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImVtYWlsSGFzRXJyb3JcIj5FbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuPC9zcGFuPlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zX19pdGVtXCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2lucHV0XCIgaWQ9XCJjb250YWN0LTJcIiBuYW1lPVwiY29udGFjdFwiIChjbGljayk9XCJzZWxlY3RDb250YWN0T3B0aW9uKCdQb3N0Y29kZScsICdmYWxzZScpXCIgdHlwZT1cInJhZGlvXCIgW2NoZWNrZWRdPVwiaXNQb3N0Y29kZUNsaWNrZWRcIiB2YWx1ZT1cInBvc3RcIiBhcmlhLWNvbnRyb2xzPVwiY29uZGl0aW9uYWwtY29udGFjdC0yXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1yYWRpb3NfX2xhYmVsIGdvdnVrLWZvbnQxOXB4XCIgZm9yPVwiY29udGFjdC0yXCI+XG4gICAgICAgICAgICAgIFBvc3RcbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19fY29uZGl0aW9uYWxcIiBpZD1cImNvbmRpdGlvbmFsLWNvbnRhY3QtcG9zdGNvZGVcIiAqbmdJZj1cImlzUG9zdGNvZGVDbGlja2VkICYmICFpc01hbnVhbEFkZHJlc3NDbGlja2VkXCI+XG4gICAgICAgICAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cInBvc3RDb2RlRm9ybVwiIG5vdmFsaWRhdGU+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLWZvbnQxOXB4XCIgZm9yPVwiYWRkcmVzcy1wb3N0Y29kZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstaGludCBnb3Z1ay1mb250MTlweFwiPkluZm9ybWF0aW9uIGFib3V0IHRoaXMgcmVmdW5kIHdpbGwgYmUgc2VudCB0byB0aGlzIGFkZHJlc3MuPC9zcGFuPlBvc3Rjb2RlXG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0Y29kZS1hbGlnbi1jc3NcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXAgZ292dWstbWFyZ2luLXJpZ2h0LTEwcHhcIj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstaW5wdXQgZ292dWstaW5wdXQtLXdpZHRoLTEwXCIgaWQ9XCJhZGRyZXNzLXBvc3Rjb2RlXCIgbmFtZT1cImFkZHJlc3MtcG9zdGNvZGVcIiBbbmdDbGFzc109XCJ7ICdpbmxpbmUtZXJyb3ItY2xhc3MnOiBpc1Bvc3Rjb2RlRW1wdHkgfHwgcG9zdGNvZGVIYXNFcnJvciB9XCIgZm9ybUNvbnRyb2xOYW1lPVwicG9zdGNvZGVcIiB0eXBlPVwidGV4dFwiIGF1dG9jb21wbGV0ZT1cInBvc3RhbC1jb2RlXCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiaW5saW5lLWVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImlzUG9zdGNvZGVFbXB0eSB8fCBwb3N0Y29kZUhhc0Vycm9yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc1Bvc3Rjb2RlRW1wdHlcIj5FbnRlciBhIHBvc3Rjb2RlLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInBvc3Rjb2RlSGFzRXJyb3JcIj5FbnRlciBhIHZhbGlkIHBvc3Rjb2RlLjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnkgZ292dWstZm9udDE5cHhcIiAoY2xpY2spPVwicG9zdGNvZGVWYWxpZGF0aW9uKCdGQScpXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj5cbiAgICAgICAgICAgICAgICBGaW5kIGFkZHJlc3NcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwIGdvdnVrLW1hcmdpbi1idG0tMjBweFwiICpuZ0lmPVwiaXNTaG93UGlja0FkZHJlc3NcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstZm9udDE5cHhcIiBmb3I9XCJjb3VudHJ5XCI+XG4gICAgICAgICAgICAgICAgUGljayBhbiBhZGRyZXNzXG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJnb3Z1ay1zZWxlY3QgZ292dWstZm9udDE5cHhcIiBbKG5nTW9kZWwpXT1cInBvc3Rjb2RlQWRkcmVzc1wiIGlkPVwicG9zdGNvZGVBZGRyZXNzXCIgW25nQ2xhc3NdPVwieyAnaW5saW5lLWVycm9yLWNsYXNzJzogaXNBZGRyZXNzQm94RW1wdHkgfVwiIG5hbWU9XCJwb3N0Y29kZUFkZHJlc3NcIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBhZGRyZXNzIG9mIGFkZHJlc3NQb3N0Y29kZUxpc3Q7XCIgW25nVmFsdWVdPVwiYWRkcmVzcy5EUEFcIiA+IHt7YWRkcmVzcy5EUEEuQUREUkVTU319PC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PiBcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJpbmxpbmUtZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwiaXNBZGRyZXNzQm94RW1wdHlcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImlzQWRkcmVzc0JveEVtcHR5XCI+UGxlYXNlIHNlbGVjdCBhbiBhZGRyZXNzLjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGV0YWlscyBjbGFzcz1cImdvdnVrLWRldGFpbHNcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgPHN1bW1hcnkgY2xhc3M9XCJnb3Z1ay1kZXRhaWxzX19zdW1tYXJ5XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay1kZXRhaWxzX19zdW1tYXJ5LXRleHQgZ292dWstZm9udDE5cHhcIj5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJKYXZhc2NyaXB0OnZvaWQoMCk7XCIgKGNsaWNrKT1cInNlbGVjdENvbnRhY3RPcHRpb24oJ1Bvc3Rjb2RlJywgJ3RydWUnKVwiPiAgRW50ZXIgYWRkcmVzcyBtYW51YWxseTwvYT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3VtbWFyeT5cbiAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zX19jb25kaXRpb25hbFwiIGlkPVwiY29uZGl0aW9uYWwtY29udGFjdC1tYW51YWxcIiAqbmdJZj1cImlzUG9zdGNvZGVDbGlja2VkICYmIGlzTWFudWFsQWRkcmVzc0NsaWNrZWRcIj5cbiAgICAgICAgICAgIDxmb3JtIFtmb3JtR3JvdXBdPVwibWFudWFsQWRkcmVzc0Zvcm1cIiBub3ZhbGlkYXRlPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1mb250MTlweFwiIGZvcj1cImFkZHJlc3MtbGluZS0xXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay1oaW50IGdvdnVrLWZvbnQxOXB4XCI+SW5mb3JtYXRpb24gYWJvdXQgdGhpcyByZWZ1bmQgd2lsbCBiZSBzZW50IHRvIHRoaXMgYWRkcmVzcy48L3NwYW4+QnVpbGRpbmcgYW5kIHN0cmVldCA8c3BhbiBjbGFzcz1cImdvdnVrLXZpc3VhbGx5LWhpZGRlblwiPmxpbmUgMSBvZiAyPC9zcGFuPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1pbnB1dCBnb3Z1ay1mb250MTlweFwiIGlkPVwiYWRkcmVzcy1saW5lLTFcIiBuYW1lPVwiYWRkcmVzcy1saW5lLTFcIiBbbmdDbGFzc109XCJ7ICdpbmxpbmUtZXJyb3ItY2xhc3MnOiBpc2FkZHJlc3NMaW5lMUVtcHR5IHx8IGFkZHJlc3NMaW5lMUhhc0Vycm9yIH1cIiB2YWx1ZT1cInt7YWRkcmVzc09iaj8uY29udGFjdF9kZXRhaWxzPy5hZGRyZXNzX2xpbmV9fVwiIGZvcm1Db250cm9sTmFtZT1cImFkZHJlc3NsMVwiIHR5cGU9XCJ0ZXh0XCIgYXV0b2NvbXBsZXRlPVwiYWRkcmVzcy1saW5lMVwiPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cImlubGluZS1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJpc2FkZHJlc3NMaW5lMUVtcHR5IHx8IGFkZHJlc3NMaW5lMUhhc0Vycm9yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc2FkZHJlc3NMaW5lMUVtcHR5XCI+RW50ZXIgYSBCdWlsZGluZyBhbmQgc3RyZWV0Ljwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFkZHJlc3NMaW5lMUhhc0Vycm9yXCI+RW50ZXIgYSB2YWxpZCBCdWlsZGluZyBhbmQgc3RyZWV0Ljwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9wPiAgXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsXCIgZm9yPVwiYWRkcmVzcy1saW5lLTJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXZpc3VhbGx5LWhpZGRlbiBnb3Z1ay1mb250MTlweFwiPkJ1aWxkaW5nIGFuZCBzdHJlZXQgbGluZSAyIG9mIDI8L3NwYW4+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLWlucHV0IGdvdnVrLWZvbnQxOXB4XCIgaWQ9XCJhZGRyZXNzLWxpbmUtMlwiIG5hbWU9XCJhZGRyZXNzLWxpbmUtMlwiIFtuZ0NsYXNzXT1cInsgJ2lubGluZS1lcnJvci1jbGFzcyc6IGFkZHJlc3NMaW5lMkhhc0Vycm9yfVwiIGZvcm1Db250cm9sTmFtZT1cImFkZHJlc3NsMlwiIHR5cGU9XCJ0ZXh0XCIgYXV0b2NvbXBsZXRlPVwiYWRkcmVzcy1saW5lMlwiPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cImlubGluZS1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJhZGRyZXNzTGluZTJIYXNFcnJvclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWRkcmVzc0xpbmUySGFzRXJyb3JcIj5FbnRlciBhIHZhbGlkIEJ1aWxkaW5nIGFuZCBzdHJlZXQgbGluZSAyIG9mIDIuPC9zcGFuPlxuICAgICAgICAgICAgICA8L3A+ICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstZm9udDE5cHhcIiBmb3I9XCJhZGRyZXNzLXRvd25cIj5cbiAgICAgICAgICAgICAgICBUb3duIG9yIGNpdHlcbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstaW5wdXQgZ292dWstIS13aWR0aC10d28tdGhpcmRzIGdvdnVrLWZvbnQxOXB4XCIgaWQ9XCJhZGRyZXNzLXRvd25cIiBuYW1lPVwiYWRkcmVzcy10b3duXCIgW25nQ2xhc3NdPVwieyAnaW5saW5lLWVycm9yLWNsYXNzJzogaXNUb3duT3JDaXR5RW1wdHkgfHwgdG93bk9yQ2l0eUhhc0Vycm9yfVwiIHZhbHVlPVwie3thZGRyZXNzT2JqPy5jb250YWN0X2RldGFpbHM/LmNpdHl9fVwiIGZvcm1Db250cm9sTmFtZT1cInRvd25vcmNpdHlcIiB0eXBlPVwidGV4dFwiIGF1dG9jb21wbGV0ZT1cImFkZHJlc3MtbGV2ZWwyXCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiaW5saW5lLWVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImlzVG93bk9yQ2l0eUVtcHR5IHx8IHRvd25PckNpdHlIYXNFcnJvclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNUb3duT3JDaXR5RW1wdHlcIj5FbnRlciBhIHRvd24gb3IgY2l0eS48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0b3duT3JDaXR5SGFzRXJyb3JcIj5FbnRlciBhIHRvd24gb3IgY2l0eS48L3NwYW4+XG4gICAgICAgICAgICAgIDwvcD4gIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1mb250MTlweFwiIGZvcj1cImFkZHJlc3MtY291bnR5XCI+XG4gICAgICAgICAgICAgICAgQ291bnR5XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLWlucHV0IGdvdnVrLSEtd2lkdGgtdHdvLXRoaXJkcyBnb3Z1ay1mb250MTlweFwiIGlkPVwiYWRkcmVzcy1jb3VudHlcIiBbbmdDbGFzc109XCJ7ICdpbmxpbmUtZXJyb3ItY2xhc3MnOiBpc0NvdW50eUVtcHR5IHx8IGNvdW50eUhhc0Vycm9yfVwiIHZhbHVlPVwie3thZGRyZXNzT2JqPy5jb250YWN0X2RldGFpbHM/LmNvdW50eX19XCIgZm9ybUNvbnRyb2xOYW1lPVwiY291bnR5XCIgbmFtZT1cImFkZHJlc3MtY291bnR5XCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJpbmxpbmUtZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwiaXNDb3VudHlFbXB0eSB8fCBjb3VudHlIYXNFcnJvclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNDb3VudHlFbXB0eVwiPkVudGVyIGEgQ291bnR5Ljwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50eUhhc0Vycm9yXCI+RW50ZXIgYSB2YWxpZCBDb3VudHkuPC9zcGFuPlxuICAgICAgICAgICAgICA8L3A+ICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstZm9udDE5cHhcIiBmb3I9XCJhZGRyZXNzLXBvc3Rjb2RlXCI+XG4gICAgICAgICAgICAgICAgUG9zdGNvZGVcbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstaW5wdXQgZ292dWstaW5wdXQtLXdpZHRoLTEwIGdvdnVrLWZvbnQxOXB4XCIgaWQ9XCJhZGRyZXNzLXBvc3Rjb2RlXCIgZm9ybUNvbnRyb2xOYW1lPVwibXBvc3Rjb2RlXCIgbmFtZT1cImFkZHJlc3MtcG9zdGNvZGVcIiBbbmdDbGFzc109XCJ7ICdpbmxpbmUtZXJyb3ItY2xhc3MnOiBpc01Qb3N0Y29kZUVtcHR5IHx8IG1wb3N0Y29kZUhhc0Vycm9yfVwiIHZhbHVlPVwie3thZGRyZXNzT2JqPy5jb250YWN0X2RldGFpbHM/LnBvc3RhbF9jb2RlfX1cIiB0eXBlPVwidGV4dFwiIGF1dG9jb21wbGV0ZT1cInBvc3RhbC1jb2RlXCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiaW5saW5lLWVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImlzTVBvc3Rjb2RlRW1wdHkgfHwgbXBvc3Rjb2RlSGFzRXJyb3JcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImlzTVBvc3Rjb2RlRW1wdHlcIj5FbnRlciBhIHBvc3Rjb2RlLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1wb3N0Y29kZUhhc0Vycm9yXCI+RW50ZXIgYSB2YWxpZCBwb3N0Y29kZS48L3NwYW4+XG4gICAgICAgICAgICAgIDwvcD4gIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1mb250MTlweFwiIGZvcj1cImNvdW50cnlcIj5cbiAgICAgICAgICAgICAgICBDb3VudHJ5XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJnb3Z1ay1zZWxlY3QgZ292dWstZm9udDE5cHhcIiBpZD1cImNvdW50cnlcIiBuYW1lPVwiY291bnRyeVwiIFtuZ0NsYXNzXT1cInsnaW5saW5lLWVycm9yLWNsYXNzJzogaXNDb3VudHJ5RW1wdHl9XCIgZm9ybUNvbnRyb2xOYW1lPVwiY291bnRyeVwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBzZWxlY3RlZD1cInNlbGVjdGVkXCI+UGxlYXNlIHNlbGVjdDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJVbml0ZWQgS2luZ2RvbVwiIHNlbGVjdGVkPVwie3sgYWRkcmVzc09iaj8uY29udGFjdF9kZXRhaWxzPy5jb3VudHJ5ID8gJ3NlbGVjdGVkJyA6ICcnIH19XCI+VW5pdGVkIEtpbmdkb208L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiaW5saW5lLWVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImlzQ291bnRyeUVtcHR5XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc0NvdW50cnlFbXB0eVwiPlNlbGVjdCBhIENvdW50cnkuPC9zcGFuPlxuICAgICAgICAgICAgICA8L3A+ICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgPC9kaXY+XG4gICAgPCEtLS1GT1JNLS0tPlxuICA8L2Rpdj5cblxuPGhyIGNsYXNzPVwiZ292dWstc2VjdGlvbi1icmVhayBnb3Z1ay1zZWN0aW9uLWJyZWFrLS1tIGdvdnVrLXNlY3Rpb24tYnJlYWstLXZpc2libGVcIj5cbjwvZmllbGRzZXQ+XG48ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCI+XG48YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeSBnb3Z1ay1mb250MTlweFwiIChjbGljayk9XCJyZWRpcmVjdGlvbigkZXZlbnQpXCI+IFByZXZpb3VzIDwvYnV0dG9uPlxuJm5ic3A7XG48YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24gZ292dWstZm9udDE5cHhcIiAoY2xpY2spPVwiZmluYWxGb3JtU3VibWl0KClcIj5cbiAgQ29udGludWVcbjwvYnV0dG9uPlxuPC9kaXY+Il19