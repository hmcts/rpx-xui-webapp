import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PaymentLibComponent } from '../../payment-lib.component';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { UnsolicitedPaymentsRequest } from '../../interfaces/UnsolicitedPaymentsRequest';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { AllocatePaymentRequest } from '../../interfaces/AllocatePaymentRequest';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../services/payment-view/payment-view.service";
import * as i3 from "../../payment-lib.component";
import * as i4 from "../../services/bulk-scaning-payment/bulk-scaning-payment.service";
import * as i5 from "@angular/common";
import * as i6 from "../error-banner/error-banner.component";
function MarkUnsolicitedPaymentComponent_div_1_ccpay_error_banner_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-error-banner", 27);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("errorMessage", ctx_r3.errorMessage);
} }
function MarkUnsolicitedPaymentComponent_div_1_p_38_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a reason for marking this payment as transferred.");
    i0.ɵɵelementEnd();
} }
function MarkUnsolicitedPaymentComponent_div_1_p_38_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a valid reason");
    i0.ɵɵelementEnd();
} }
function MarkUnsolicitedPaymentComponent_div_1_p_38_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Reason should be at least 3 characters.");
    i0.ɵɵelementEnd();
} }
function MarkUnsolicitedPaymentComponent_div_1_p_38_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Reason should be 255 characters or under.");
    i0.ɵɵelementEnd();
} }
function MarkUnsolicitedPaymentComponent_div_1_p_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 28);
    i0.ɵɵtemplate(1, MarkUnsolicitedPaymentComponent_div_1_p_38_span_1_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(2, MarkUnsolicitedPaymentComponent_div_1_p_38_span_2_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(3, MarkUnsolicitedPaymentComponent_div_1_p_38_span_3_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(4, MarkUnsolicitedPaymentComponent_div_1_p_38_span_4_Template, 2, 0, "span", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.isReasonEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.reasonHasError);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.reasonMinHasError);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.reasonMaxHasError);
} }
function MarkUnsolicitedPaymentComponent_div_1_option_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const siteID_r12 = ctx.$implicit;
    i0.ɵɵpropertyInterpolate("value", siteID_r12.siteId);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", siteID_r12.siteName, " (", siteID_r12.siteId, ")");
} }
function MarkUnsolicitedPaymentComponent_div_1_p_46_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Please select Receiving Site ID");
    i0.ɵɵelementEnd();
} }
function MarkUnsolicitedPaymentComponent_div_1_p_46_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Please select a valid Receiving Site ID");
    i0.ɵɵelementEnd();
} }
function MarkUnsolicitedPaymentComponent_div_1_p_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 28);
    i0.ɵɵtemplate(1, MarkUnsolicitedPaymentComponent_div_1_p_46_span_1_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(2, MarkUnsolicitedPaymentComponent_div_1_p_46_span_2_Template, 2, 0, "span", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.isResponsibleOfficeEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.responsibleOfficeHasError);
} }
const _c0 = function (a0) { return { "inline-error-class": a0 }; };
function MarkUnsolicitedPaymentComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, MarkUnsolicitedPaymentComponent_div_1_ccpay_error_banner_1_Template, 1, 1, "ccpay-error-banner", 2);
    i0.ɵɵelementStart(2, "h1", 3);
    i0.ɵɵtext(3, "Mark payment as transferred");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 4);
    i0.ɵɵelement(5, "hr", 5);
    i0.ɵɵelementStart(6, "table", 6)(7, "thead", 7)(8, "tr", 8)(9, "td", 9);
    i0.ɵɵtext(10, "Payment asset number (DCN)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 9);
    i0.ɵɵtext(12, "Banked date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 9);
    i0.ɵɵtext(14, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 9);
    i0.ɵɵtext(16, "Method");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "tbody", 10)(18, "tr", 8)(19, "td", 11);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 11);
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "td", 11);
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "td", 12);
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "lowercase");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(30, "form", 13);
    i0.ɵɵelement(31, "input", 14, 15);
    i0.ɵɵelementStart(33, "div", 16)(34, "label", 17);
    i0.ɵɵtext(35, " Reason for payment being marked as transferred ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "textarea", 18);
    i0.ɵɵtext(37, "        ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(38, MarkUnsolicitedPaymentComponent_div_1_p_38_Template, 5, 4, "p", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 16)(40, "label", 20);
    i0.ɵɵtext(41, " Receiving Site ID (Receiving court/Bulk centre site ID) ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "select", 21);
    i0.ɵɵlistener("change", function MarkUnsolicitedPaymentComponent_div_1_Template_select_change_42_listener($event) { i0.ɵɵrestoreView(_r16); const ctx_r15 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r15.selectchange($event)); });
    i0.ɵɵelementStart(43, "option", 22);
    i0.ɵɵtext(44, "Please select");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(45, MarkUnsolicitedPaymentComponent_div_1_option_45_Template, 2, 3, "option", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(46, MarkUnsolicitedPaymentComponent_div_1_p_46_Template, 3, 2, "p", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div", 24)(48, "button", 25);
    i0.ɵɵlistener("click", function MarkUnsolicitedPaymentComponent_div_1_Template_button_click_48_listener() { i0.ɵɵrestoreView(_r16); const ctx_r17 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r17.saveAndContinue()); });
    i0.ɵɵtext(49, " Confirm ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "button", 26);
    i0.ɵɵlistener("click", function MarkUnsolicitedPaymentComponent_div_1_Template_button_click_50_listener() { i0.ɵɵrestoreView(_r16); const ctx_r18 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r18.cancelMarkUnsolicitedPayments("cancel")); });
    i0.ɵɵtext(51, " Cancel ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.errorMessage.showError);
    i0.ɵɵadvance(19);
    i0.ɵɵtextInterpolate(ctx_r0.unassignedRecord.dcn_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(23, 11, ctx_r0.unassignedRecord.date_banked, "dd MMM yyyy"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(26, 14, ctx_r0.unassignedRecord.amount, "GBP", "symbol", "1.2-2"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(29, 19, ctx_r0.trimUnderscore(ctx_r0.unassignedRecord.payment_method)), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r0.markPaymentUnsolicitedForm);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(21, _c0, ctx_r0.reasonHasError || ctx_r0.reasonMinHasError || ctx_r0.reasonMaxHasError));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.isReasonEmpty || ctx_r0.reasonHasError || ctx_r0.reasonMinHasError || ctx_r0.reasonMaxHasError);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r0.siteIDList);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isResponsibleOfficeEmpty || ctx_r0.responsibleOfficeHasError);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isContinueButtondisabled);
} }
function MarkUnsolicitedPaymentComponent_ng_container_2_ccpay_error_banner_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-error-banner", 27);
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("errorMessage", ctx_r19.errorMessage);
} }
function MarkUnsolicitedPaymentComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, MarkUnsolicitedPaymentComponent_ng_container_2_ccpay_error_banner_1_Template, 1, 1, "ccpay-error-banner", 2);
    i0.ɵɵelementStart(2, "div", 30)(3, "span", 31);
    i0.ɵɵtext(4, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong", 32)(6, "span", 33);
    i0.ɵɵtext(7, "Warning");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "h1", 34);
    i0.ɵɵtext(9, " Are you sure you want to mark this payment as transferred? ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(10, "input", 35, 15);
    i0.ɵɵelementStart(12, "div", 4);
    i0.ɵɵelement(13, "hr", 5);
    i0.ɵɵelementStart(14, "table", 6)(15, "thead", 7)(16, "tr", 8)(17, "td", 9);
    i0.ɵɵtext(18, "Reason");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 9);
    i0.ɵɵtext(20, "Receiving site ID");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "tbody", 10)(22, "tr", 8)(23, "td", 11);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "td", 11);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(27, "div", 24)(28, "button", 25);
    i0.ɵɵlistener("click", function MarkUnsolicitedPaymentComponent_ng_container_2_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r22); const ctx_r21 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r21.confirmPayments()); });
    i0.ɵɵtext(29, " Confirm ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 26);
    i0.ɵɵlistener("click", function MarkUnsolicitedPaymentComponent_ng_container_2_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r22); const ctx_r23 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r23.cancelMarkUnsolicitedPayments()); });
    i0.ɵɵtext(31, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.errorMessage.showError);
    i0.ɵɵadvance(23);
    i0.ɵɵtextInterpolate(ctx_r1.reason);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.selectedSiteName);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isConfirmButtondisabled);
} }
function MarkUnsolicitedPaymentComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 36, 15);
    i0.ɵɵelementStart(3, "div", 30)(4, "span", 31);
    i0.ɵɵtext(5, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong", 32)(7, "span", 33);
    i0.ɵɵtext(8, "Warning");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " Are you sure you want to cancel? ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 24)(11, "button", 37);
    i0.ɵɵlistener("click", function MarkUnsolicitedPaymentComponent_ng_container_3_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r26); const ctx_r25 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r25.gotoCasetransationPage()); });
    i0.ɵɵtext(12, " Yes ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 26);
    i0.ɵɵlistener("click", function MarkUnsolicitedPaymentComponent_ng_container_3_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r26); const ctx_r27 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r27.cancelMarkUnsolicitedPayments()); });
    i0.ɵɵtext(14, " No ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} }
export class MarkUnsolicitedPaymentComponent {
    formBuilder;
    paymentViewService;
    paymentLibComponent;
    bulkScaningPaymentService;
    caseType;
    markPaymentUnsolicitedForm;
    viewStatus;
    reasonHasError = false;
    isReasonEmpty = false;
    reasonMinHasError = false;
    reasonMaxHasError = false;
    responsibleOfficeHasError = false;
    isResponsibleOfficeEmpty = false;
    errorMessage = this.getErrorMessage(false);
    ccdCaseNumber;
    bspaymentdcn;
    unassignedRecord;
    siteID = null;
    reason;
    responsiblePerson;
    responsibleOffice;
    emailId;
    isConfirmButtondisabled = false;
    isContinueButtondisabled = false;
    ccdReference = null;
    exceptionReference = null;
    selectedSiteId;
    selectedSiteName;
    isStrategicFixEnable = true;
    siteIDList;
    constructor(formBuilder, paymentViewService, paymentLibComponent, bulkScaningPaymentService) {
        this.formBuilder = formBuilder;
        this.paymentViewService = paymentViewService;
        this.paymentLibComponent = paymentLibComponent;
        this.bulkScaningPaymentService = bulkScaningPaymentService;
    }
    ngOnInit() {
        this.resetForm([false, false, false, false, false, false], 'all');
        this.viewStatus = 'mainForm';
        this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
        this.bspaymentdcn = this.paymentLibComponent.bspaymentdcn;
        this.isStrategicFixEnable = this.paymentLibComponent.ISSFENABLE;
        this.getUnassignedPayment();
        this.paymentViewService.getSiteID().subscribe(siteids => {
            this.isContinueButtondisabled = false;
            this.errorMessage = this.getErrorMessage(false);
            this.siteIDList = JSON.parse(siteids);
        }, err => {
            window.scrollTo(0, 0);
            this.isContinueButtondisabled = true;
            this.errorMessage = this.getErrorMessage(true);
        });
        this.markPaymentUnsolicitedForm = this.formBuilder.group({
            reason: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
                Validators.pattern('^([a-zA-Z0-9\\s,\\.]*)$')
            ])),
            responsibleOffice: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^([a-zA-Z0-9\\s\\n,\\.-:]*)$')
            ])),
            responsiblePerson: new FormControl(''),
            emailId: new FormControl('')
        });
    }
    trimUnderscore(method) {
        return this.bulkScaningPaymentService.removeUnwantedString(method, ' ');
    }
    confirmPayments() {
        this.isConfirmButtondisabled = true;
        const controls = this.markPaymentUnsolicitedForm.controls;
        if (!this.isStrategicFixEnable) {
            let allocatedRequest = {
                allocation_status: 'Transferred',
                payment_allocation_status: {
                    description: '',
                    name: 'Transferred'
                },
                unidentified_reason: controls.reason.value,
                receiving_office: this.selectedSiteId,
                user_id: this.caseType,
            };
            const postStrategicBody = new AllocatePaymentRequest(this.ccdReference, this.unassignedRecord, this.caseType, this.exceptionReference, allocatedRequest);
            this.bulkScaningPaymentService.postBSWoPGStrategic(postStrategicBody).subscribe(res => {
                this.errorMessage = this.getErrorMessage(false);
                let response = JSON.parse(res);
                if (response.success) {
                    this.gotoCasetransationPage();
                }
            }, (error) => {
                this.errorMessage = this.getErrorMessage(true);
                this.isConfirmButtondisabled = false;
            });
        }
        else {
            // controls.responsibleOffice.setValue('P219');
            this.bulkScaningPaymentService.patchBSChangeStatus(this.unassignedRecord.dcn_reference, 'PROCESSED').subscribe(res1 => {
                this.errorMessage = this.getErrorMessage(false);
                const response1 = JSON.parse(res1), requestBody = new AllocatePaymentRequest(this.ccdReference, this.unassignedRecord, this.siteID, this.exceptionReference);
                this.paymentViewService.postBSPayments(requestBody).subscribe(res2 => {
                    this.errorMessage = this.getErrorMessage(false);
                    const response2 = JSON.parse(res2), reqBody = new UnsolicitedPaymentsRequest(response2['data'].payment_group_reference, response2['data'].reference, controls.reason.value, this.selectedSiteId, controls.responsiblePerson.value, controls.emailId.value);
                    if (response2.success) {
                        this.paymentViewService.postBSUnsolicitedPayments(reqBody).subscribe(res3 => {
                            this.errorMessage = this.getErrorMessage(false);
                            const response3 = JSON.parse(res3);
                            if (response3.success) {
                                this.gotoCasetransationPage();
                            }
                        }, (error) => {
                            this.bulkScaningPaymentService.patchBSChangeStatus(this.unassignedRecord.dcn_reference, 'COMPLETE').subscribe();
                            this.errorMessage = this.getErrorMessage(true);
                            this.isConfirmButtondisabled = false;
                        });
                    }
                }, (error) => {
                    this.bulkScaningPaymentService.patchBSChangeStatus(this.unassignedRecord.dcn_reference, 'COMPLETE').subscribe();
                    this.errorMessage = this.getErrorMessage(true);
                    this.isConfirmButtondisabled = false;
                });
            }, (error) => {
                this.errorMessage = this.getErrorMessage(true);
                this.isConfirmButtondisabled = false;
            });
        }
    }
    saveAndContinue() {
        this.resetForm([false, false, false, false, false, false], 'all');
        const formerror = this.markPaymentUnsolicitedForm.controls.reason.errors;
        const reasonField = this.markPaymentUnsolicitedForm.controls.reason;
        //const officeIdField = this.selectedSiteId;
        const officeIdField = this.markPaymentUnsolicitedForm.controls.responsibleOffice;
        if (this.markPaymentUnsolicitedForm.dirty && this.markPaymentUnsolicitedForm.valid) {
            const controls = this.markPaymentUnsolicitedForm.controls;
            this.emailId = controls.emailId.value;
            this.responsibleOffice = officeIdField.value;
            this.responsiblePerson = controls.responsiblePerson.value;
            this.reason = controls.reason.value;
            this.viewStatus = 'unsolicitedContinueConfirm';
        }
        else {
            if (reasonField.value == '') {
                this.resetForm([true, false, false, false, false, false], 'reason');
            }
            if (reasonField.value != '' && this.markPaymentUnsolicitedForm.controls.reason.invalid) {
                this.resetForm([false, true, false, false, false, false], 'reason');
            }
            if (formerror && formerror.minlength && formerror.minlength.actualLength < 3) {
                this.resetForm([false, false, true, false, false, false], 'reason');
            }
            if (formerror && formerror.maxlength && formerror.maxlength.actualLength > 255) {
                this.resetForm([false, false, false, true, false, false], 'reason');
            }
            if (officeIdField.value == '') {
                this.resetForm([false, false, false, false, true, false], 'responsibleOffice');
            }
            if (officeIdField.value != '' && officeIdField.invalid) {
                this.resetForm([false, false, false, false, false, true], 'responsibleOffice');
            }
        }
    }
    resetForm(val, field) {
        if (field === 'reason' || field === 'all') {
            this.isReasonEmpty = val[0];
            this.reasonHasError = val[1];
            this.reasonMinHasError = val[2];
            this.reasonMaxHasError = val[3];
        }
        if (field === 'responsibleOffice' || field === 'all') {
            this.isResponsibleOfficeEmpty = val[4];
            this.responsibleOfficeHasError = val[5];
        }
    }
    cancelMarkUnsolicitedPayments(type) {
        if (type && type === 'cancel') {
            if (this.checkingFormValue()) {
                this.viewStatus = 'unsolicitedCancelConfirm';
            }
            else {
                this.gotoCasetransationPage();
            }
        }
        else {
            this.markPaymentUnsolicitedForm.controls.responsibleOffice.setValue('');
            this.viewStatus = 'mainForm';
        }
    }
    checkingFormValue() {
        const formFields = this.markPaymentUnsolicitedForm.value;
        let valueExists = false;
        for (var field in formFields) {
            if (formFields.hasOwnProperty(field) && formFields[field] !== "") {
                valueExists = true;
                break;
            }
        }
        return valueExists;
    }
    gotoCasetransationPage() {
        this.paymentLibComponent.viewName = 'case-transactions';
        this.paymentLibComponent.TAKEPAYMENT = true;
        this.paymentLibComponent.ISBSENABLE = true;
    }
    getUnassignedPayment() {
        this.bulkScaningPaymentService.getBSPaymentsByDCN(this.bspaymentdcn).subscribe(unassignedPayments => {
            this.unassignedRecord = unassignedPayments['data'].payments.filter(payment => {
                return payment && payment.dcn_reference == this.bspaymentdcn;
            })[0];
            this.siteID = unassignedPayments['data'].responsible_service_id;
            const beCcdNumber = unassignedPayments['data'].ccd_reference, beExceptionNumber = unassignedPayments['data'].exception_record_reference, exceptionReference = beCcdNumber ? beCcdNumber === this.ccdCaseNumber ? null : this.ccdCaseNumber : this.ccdCaseNumber;
            this.ccdReference = beCcdNumber ? beCcdNumber : null;
            this.exceptionReference = beExceptionNumber ? beExceptionNumber : exceptionReference;
        }, (error) => {
            this.errorMessage = this.getErrorMessage(true);
        });
    }
    getErrorMessage(isErrorExist) {
        return {
            title: "Something went wrong.",
            body: "Please try again later.",
            showError: isErrorExist
        };
    }
    selectchange(args) {
        this.selectedSiteId = args.target.value;
        this.selectedSiteName = args.target.options[args.target.selectedIndex].text;
    }
    static ɵfac = function MarkUnsolicitedPaymentComponent_Factory(t) { return new (t || MarkUnsolicitedPaymentComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.PaymentViewService), i0.ɵɵdirectiveInject(i3.PaymentLibComponent), i0.ɵɵdirectiveInject(i4.BulkScaningPaymentService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MarkUnsolicitedPaymentComponent, selectors: [["app-mark-unsolicited-payment"]], inputs: { caseType: "caseType" }, decls: 4, vars: 3, consts: [[1, "mkpay-unidentified"], [4, "ngIf"], [3, "errorMessage", 4, "ngIf"], [1, "heading-large"], [1, "govuk-grid-column-full", "govuk-!-padding-bottom-3"], [1, "govuk-section-break", "govuk-section-break--visible"], [1, "govuk-table"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["scope", "col", 1, "govuk-table__header"], [1, "govuk-table__body"], [1, "govuk-table__cell"], [1, "capitalize", "govuk-table__cell"], ["novalidate", "", 3, "formGroup"], ["type", "hidden", "value", "MARKTRANSFERRED", 1, "iFrameDrivenImageValue"], ["myInput", ""], [1, "govuk-form-group"], ["for", "reason", 1, "govuk-label", "custom-govuk-label", "custom-govuk-label"], ["name", "reason", "id", "reason", "rows", "5", "formControlName", "reason", 1, "form-control", "form-control-3-4", 3, "ngClass"], ["class", "inline-error-message", 4, "ngIf"], ["for", "responsibleOffice", 1, "govuk-label", "custom-govuk-label"], ["id", "responsibleOffice", "formControlName", "responsibleOffice", 1, "form-control", "short-input", 3, "change"], ["value", "", "selected", "selected"], [3, "value", 4, "ngFor", "ngForOf"], [1, "govuk-button--group"], ["type", "submit", 1, "button", 3, "disabled", "click"], ["type", "button", 1, "button", "govuk-button--secondary", 3, "click"], [3, "errorMessage"], [1, "inline-error-message"], [3, "value"], [1, "govuk-warning-text"], ["aria-hidden", "true", 1, "govuk-warning-text__icon"], [1, "govuk-warning-text__text"], [1, "govuk-warning-text__assistive"], [1, "heading-small"], ["type", "hidden", "value", "TRANSFERREDCONFIRMATION", 1, "iFrameDrivenImageValue"], ["type", "hidden", "value", "CANCELTRANSFERRED", 1, "iFrameDrivenImageValue"], ["type", "submit", 1, "button", 3, "click"]], template: function MarkUnsolicitedPaymentComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, MarkUnsolicitedPaymentComponent_div_1_Template, 52, 23, "div", 1);
            i0.ɵɵtemplate(2, MarkUnsolicitedPaymentComponent_ng_container_2_Template, 32, 4, "ng-container", 1);
            i0.ɵɵtemplate(3, MarkUnsolicitedPaymentComponent_ng_container_3_Template, 15, 0, "ng-container", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "mainForm");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "unsolicitedContinueConfirm");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "unsolicitedCancelConfirm");
        } }, dependencies: [i5.NgClass, i5.NgForOf, i5.NgIf, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, i6.ErrorBannerComponent, i5.LowerCasePipe, i5.CurrencyPipe, i5.DatePipe], styles: [".mkpay-unidentified[_ngcontent-%COMP%]{margin:10px 0 20px}.mkpay-unidentified[_ngcontent-%COMP%]   .govuk-button--secondary[_ngcontent-%COMP%]{margin-left:10px;background-color:#b3b8bdf2}.mkpay-unidentified[_ngcontent-%COMP%]   .inline-error-class[_ngcontent-%COMP%]{outline:3px solid #a71414;outline-offset:0}.mkpay-unidentified[_ngcontent-%COMP%]   .inline-error-message[_ngcontent-%COMP%]{color:#a71414;font-weight:700;margin-top:10px}.lowercase[_ngcontent-%COMP%]{text-transform:lowercase}.capitalize[_ngcontent-%COMP%]{text-transform:capitalize}.custom-govuk-label[_ngcontent-%COMP%], .govuk-warning-text__text[_ngcontent-%COMP%]{font-size:19px}#responsibleOffice[_ngcontent-%COMP%]{color:#000;width:75%;font-weight:white}select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{background:white}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MarkUnsolicitedPaymentComponent, [{
        type: Component,
        args: [{ selector: 'app-mark-unsolicited-payment', template: "<div class=\"mkpay-unidentified\">\n  <div *ngIf=\"viewStatus === 'mainForm'\">\n  <ccpay-error-banner *ngIf=\"errorMessage.showError\" [errorMessage]=\"errorMessage\"></ccpay-error-banner>\n  <h1 class=\"heading-large\">Mark payment as transferred</h1>\n  <div class=\"govuk-grid-column-full govuk-!-padding-bottom-3\">\n    <hr class=\"govuk-section-break govuk-section-break--visible\">\n    <table class=\"govuk-table\">\n      <thead class=\"govuk-table__head\">\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__header\" scope=\"col\">Payment asset number (DCN)</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Banked date</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Amount</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Method</td>\n        </tr>\n      </thead>\n      <tbody class=\"govuk-table__body\">\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell\">{{unassignedRecord.dcn_reference}}</td>\n            <td class=\"govuk-table__cell\"> {{unassignedRecord.date_banked | date:'dd MMM yyyy'}}</td>\n            <td class=\"govuk-table__cell\"> {{unassignedRecord.amount | currency :'GBP':'symbol':'1.2-2'}}</td>\n            <td class=\"capitalize govuk-table__cell\"> {{trimUnderscore(unassignedRecord.payment_method) | lowercase}}  </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  \n  <form [formGroup]=\"markPaymentUnsolicitedForm\" novalidate>\n    <input #myInput type='hidden' class='iFrameDrivenImageValue' value='MARKTRANSFERRED'>\n    <div class=\"govuk-form-group\">\n      <label class=\"govuk-label custom-govuk-label custom-govuk-label\" for=\"reason\">\n        Reason for payment being marked as transferred   \n      </label>\n        <textarea class=\"form-control form-control-3-4\" [ngClass]=\"{'inline-error-class': reasonHasError || reasonMinHasError || reasonMaxHasError}\" name=\"reason\" id=\"reason\" rows=\"5\" formControlName=\"reason\">\n        </textarea>\n        <p class=\"inline-error-message\" *ngIf=\"isReasonEmpty || reasonHasError || reasonMinHasError || reasonMaxHasError\">\n          <span *ngIf=\"isReasonEmpty\">Enter a reason for marking this payment as transferred.</span>\n          <span *ngIf=\"reasonHasError\">Enter a valid reason</span>\n          <span *ngIf=\"reasonMinHasError\">Reason should be at least 3 characters.</span>\n          <span *ngIf=\"reasonMaxHasError\">Reason should be 255 characters or under.</span>\n        </p>\n    </div>\n    <div class=\"govuk-form-group\">\n      <label class=\"govuk-label custom-govuk-label\" for=\"responsibleOffice\">\n        Receiving Site ID (Receiving court/Bulk centre site ID)    \n      </label>\n      <select class=\"form-control short-input\" id=\"responsibleOffice\" formControlName=\"responsibleOffice\" (change)=\"selectchange($event)\">\n        <option value=\"\" selected='selected'>Please select</option>\n        <option  *ngFor=\"let siteID of siteIDList;\" value=\"{{siteID.siteId}}\">{{siteID.siteName}} ({{siteID.siteId}})</option>\n      </select>\n      <p class=\"inline-error-message\" *ngIf=\"isResponsibleOfficeEmpty || responsibleOfficeHasError\">\n        <span *ngIf=\"isResponsibleOfficeEmpty\">Please select Receiving Site ID</span>\n        <span *ngIf=\"responsibleOfficeHasError\">Please select a valid Receiving Site ID</span>\n      </p>\n    </div>\n   <div class=\"govuk-button--group\">\n      <button type=\"submit\" [disabled]=\"isContinueButtondisabled\" class=\"button\" (click)=\"saveAndContinue()\">\n        Confirm\n      </button>\n      <button type=\"button\" class=\"button govuk-button--secondary\" (click)=\"cancelMarkUnsolicitedPayments('cancel')\">\n        Cancel\n      </button>\n    </div>\n  </form>\n  \n</div>\n       <ng-container *ngIf=\"viewStatus === 'unsolicitedContinueConfirm'\">\n          <ccpay-error-banner *ngIf=\"errorMessage.showError\" [errorMessage]=\"errorMessage\"></ccpay-error-banner>\n      <div class=\"govuk-warning-text\">\n        <span class=\"govuk-warning-text__icon\" aria-hidden=\"true\">!</span>\n        <strong class=\"govuk-warning-text__text\">\n        <span class=\"govuk-warning-text__assistive\">Warning</span>\n        <h1 class=\"heading-small\"> Are you sure you want to mark this payment as transferred? </h1>\n        </strong>\n        <input #myInput type='hidden' class='iFrameDrivenImageValue' value='TRANSFERREDCONFIRMATION'>\n        <div class=\"govuk-grid-column-full govuk-!-padding-bottom-3\">\n          <hr class=\"govuk-section-break govuk-section-break--visible\">\n          <table class=\"govuk-table\">\n            <thead class=\"govuk-table__head\">\n            <tr class=\"govuk-table__row\">\n              <td class=\"govuk-table__header\" scope=\"col\">Reason</td>\n              <td class=\"govuk-table__header\" scope=\"col\">Receiving site ID</td>\n            </tr>\n            </thead>\n            <tbody class=\"govuk-table__body\">\n            <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell\">{{reason}}</td>\n            <td class=\"govuk-table__cell\">{{selectedSiteName}}</td>\n            </tr>\n            </tbody>\n          </table>\n        </div>\n\n      </div>\n      <div class=\"govuk-button--group\">\n        <button type=\"submit\" class=\"button\" [disabled]=\"isConfirmButtondisabled\" (click)=\"confirmPayments()\">\n          Confirm\n        </button>\n        <button type=\"button\" class=\"button govuk-button--secondary\" (click)=\"cancelMarkUnsolicitedPayments()\">\n          Cancel\n        </button>\n      </div>\n    </ng-container>\n      <ng-container *ngIf=\"viewStatus === 'unsolicitedCancelConfirm'\">\n        <input #myInput type='hidden' class='iFrameDrivenImageValue' value='CANCELTRANSFERRED'>\n      <div class=\"govuk-warning-text\">\n        <span class=\"govuk-warning-text__icon\" aria-hidden=\"true\">!</span>\n        <strong class=\"govuk-warning-text__text\">\n        <span class=\"govuk-warning-text__assistive\">Warning</span>\n          Are you sure you want to cancel?\n        </strong>\n      </div>\n      <div class=\"govuk-button--group\">\n        <button type=\"submit\" class=\"button\" (click)=\"gotoCasetransationPage()\">\n          Yes\n        </button>\n        <button type=\"button\" class=\"button govuk-button--secondary\" (click)=\"cancelMarkUnsolicitedPayments()\">\n          No\n        </button>\n      </div>\n    </ng-container>\n</div>", styles: [".mkpay-unidentified{margin:10px 0 20px}.mkpay-unidentified .govuk-button--secondary{margin-left:10px;background-color:#b3b8bdf2}.mkpay-unidentified .inline-error-class{outline:3px solid #a71414;outline-offset:0}.mkpay-unidentified .inline-error-message{color:#a71414;font-weight:700;margin-top:10px}.lowercase{text-transform:lowercase}.capitalize{text-transform:capitalize}.custom-govuk-label,.govuk-warning-text__text{font-size:19px}#responsibleOffice{color:#000;width:75%;font-weight:white}select option{background:white}\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.PaymentViewService }, { type: i3.PaymentLibComponent }, { type: i4.BulkScaningPaymentService }]; }, { caseType: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyay11bnNvbGljaXRlZC1wYXltZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9tYXJrLXVuc29saWNpdGVkLXBheW1lbnQvbWFyay11bnNvbGljaXRlZC1wYXltZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9tYXJrLXVuc29saWNpdGVkLXBheW1lbnQvbWFyay11bnNvbGljaXRlZC1wYXltZW50LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQWEsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBRTdHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7Ozs7Ozs7SUNML0UseUNBQXNHOzs7SUFBbkQsa0RBQTZCOzs7SUFpQ3hFLDRCQUE0QjtJQUFBLHVFQUF1RDtJQUFBLGlCQUFPOzs7SUFDMUYsNEJBQTZCO0lBQUEsb0NBQW9CO0lBQUEsaUJBQU87OztJQUN4RCw0QkFBZ0M7SUFBQSx1REFBdUM7SUFBQSxpQkFBTzs7O0lBQzlFLDRCQUFnQztJQUFBLHlEQUF5QztJQUFBLGlCQUFPOzs7SUFKbEYsNkJBQWtI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QUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDeEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzlFLENBQUM7eUZBNVBVLCtCQUErQjs2REFBL0IsK0JBQStCO1lDaEI1Qyw4QkFBZ0M7WUFDOUIsa0ZBK0RJO1lBQ0MsbUdBb0NZO1lBQ2IsbUdBaUJhO1lBQ25CLGlCQUFNOztZQXZIRSxlQUErQjtZQUEvQixvREFBK0I7WUFnRWpCLGVBQWlEO1lBQWpELHNFQUFpRDtZQXFDbEQsZUFBK0M7WUFBL0Msb0VBQStDOzs7dUZEdEZ2RCwrQkFBK0I7Y0FMM0MsU0FBUzsyQkFDRSw4QkFBOEI7eUtBSy9CLFFBQVE7a0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUGF5bWVudExpYkNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3BheW1lbnQtbGliLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCdWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYnVsay1zY2FuaW5nLXBheW1lbnQvYnVsay1zY2FuaW5nLXBheW1lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBJQlNQYXltZW50cyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSUJTUGF5bWVudHMnO1xuaW1wb3J0IHsgVW5zb2xpY2l0ZWRQYXltZW50c1JlcXVlc3QgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL1Vuc29saWNpdGVkUGF5bWVudHNSZXF1ZXN0JztcbmltcG9ydCB7IFBheW1lbnRWaWV3U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BheW1lbnQtdmlldy9wYXltZW50LXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBBbGxvY2F0ZVBheW1lbnRSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9BbGxvY2F0ZVBheW1lbnRSZXF1ZXN0JztcbmltcG9ydCB7IEVycm9ySGFuZGxlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zaGFyZWQvZXJyb3ItaGFuZGxlci5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWFyay11bnNvbGljaXRlZC1wYXltZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hcmstdW5zb2xpY2l0ZWQtcGF5bWVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hcmstdW5zb2xpY2l0ZWQtcGF5bWVudC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtVbnNvbGljaXRlZFBheW1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBjYXNlVHlwZTogc3RyaW5nO1xuICBtYXJrUGF5bWVudFVuc29saWNpdGVkRm9ybTogRm9ybUdyb3VwO1xuICB2aWV3U3RhdHVzOiBzdHJpbmc7XG4gIHJlYXNvbkhhc0Vycm9yOiBib29sZWFuID0gZmFsc2U7XG4gIGlzUmVhc29uRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVhc29uTWluSGFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVhc29uTWF4SGFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVzcG9uc2libGVPZmZpY2VIYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1Jlc3BvbnNpYmxlT2ZmaWNlRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZXJyb3JNZXNzYWdlID0gdGhpcy5nZXRFcnJvck1lc3NhZ2UoZmFsc2UpO1xuICBjY2RDYXNlTnVtYmVyOiBzdHJpbmc7XG4gIGJzcGF5bWVudGRjbjogc3RyaW5nO1xuICB1bmFzc2lnbmVkUmVjb3JkOiBJQlNQYXltZW50cztcbiAgc2l0ZUlEOiBzdHJpbmcgPSBudWxsO1xuICByZWFzb246IHN0cmluZztcbiAgcmVzcG9uc2libGVQZXJzb246IHN0cmluZztcbiAgcmVzcG9uc2libGVPZmZpY2U6IHN0cmluZztcbiAgZW1haWxJZDogc3RyaW5nO1xuICBpc0NvbmZpcm1CdXR0b25kaXNhYmxlZDogQm9vbGVhbiA9IGZhbHNlO1xuICBpc0NvbnRpbnVlQnV0dG9uZGlzYWJsZWQ6IEJvb2xlYW4gPSBmYWxzZTtcbiAgY2NkUmVmZXJlbmNlOiBzdHJpbmcgPSBudWxsO1xuICBleGNlcHRpb25SZWZlcmVuY2U6IHN0cmluZyA9IG51bGw7XG4gIHNlbGVjdGVkU2l0ZUlkOiBzdHJpbmc7XG4gIHNlbGVjdGVkU2l0ZU5hbWU6IHN0cmluZztcbiAgaXNTdHJhdGVnaWNGaXhFbmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICBzaXRlSURMaXN0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICBwcml2YXRlIHBheW1lbnRWaWV3U2VydmljZTogUGF5bWVudFZpZXdTZXJ2aWNlLFxuICBwcml2YXRlIHBheW1lbnRMaWJDb21wb25lbnQ6IFBheW1lbnRMaWJDb21wb25lbnQsXG4gIHByaXZhdGUgYnVsa1NjYW5pbmdQYXltZW50U2VydmljZTogQnVsa1NjYW5pbmdQYXltZW50U2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZXNldEZvcm0oW2ZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSwgJ2FsbCcpO1xuICAgIHRoaXMudmlld1N0YXR1cyA9ICdtYWluRm9ybSc7XG4gICAgdGhpcy5jY2RDYXNlTnVtYmVyID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LkNDRF9DQVNFX05VTUJFUjtcbiAgICB0aGlzLmJzcGF5bWVudGRjbiA9IHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5ic3BheW1lbnRkY247XG4gICAgdGhpcy5pc1N0cmF0ZWdpY0ZpeEVuYWJsZSA9IHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5JU1NGRU5BQkxFO1xuICAgIHRoaXMuZ2V0VW5hc3NpZ25lZFBheW1lbnQoKTtcblxuICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLmdldFNpdGVJRCgpLnN1YnNjcmliZShcbiAgICAgIHNpdGVpZHMgPT4ge1xuICAgICAgICB0aGlzLmlzQ29udGludWVCdXR0b25kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZ2V0RXJyb3JNZXNzYWdlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zaXRlSURMaXN0ID0gSlNPTi5wYXJzZShzaXRlaWRzKTtcbiAgICAgIH0sXG4gICAgICBlcnIgPT4ge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIHRoaXMuaXNDb250aW51ZUJ1dHRvbmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmdldEVycm9yTWVzc2FnZSh0cnVlKTtcbiAgICAgIH1cbiAgICApO1xuICAgIFxuICAgIHRoaXMubWFya1BheW1lbnRVbnNvbGljaXRlZEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHJlYXNvbjogbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBWYWxpZGF0b3JzLm1pbkxlbmd0aCgzKSxcbiAgICAgICAgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMjU1KSxcbiAgICAgICAgVmFsaWRhdG9ycy5wYXR0ZXJuKCdeKFthLXpBLVowLTlcXFxccyxcXFxcLl0qKSQnKVxuICAgICAgXSkpLFxuICAgICAgcmVzcG9uc2libGVPZmZpY2U6IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgVmFsaWRhdG9ycy5wYXR0ZXJuKCdeKFthLXpBLVowLTlcXFxcc1xcXFxuLFxcXFwuLTpdKikkJylcbiAgICAgIF0pKSxcbiAgICAgIHJlc3BvbnNpYmxlUGVyc29uOiBuZXcgRm9ybUNvbnRyb2woJycpLFxuICAgICAgZW1haWxJZDogbmV3IEZvcm1Db250cm9sKCcnKVxuICAgIH0pO1xuICB9XG4gIHRyaW1VbmRlcnNjb3JlKG1ldGhvZDogc3RyaW5nKXtcbiAgICByZXR1cm4gdGhpcy5idWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlLnJlbW92ZVVud2FudGVkU3RyaW5nKG1ldGhvZCwnICcpO1xuICB9XG4gIGNvbmZpcm1QYXltZW50cygpIHtcbiAgICB0aGlzLmlzQ29uZmlybUJ1dHRvbmRpc2FibGVkID0gdHJ1ZTtcbiAgICBjb25zdCBjb250cm9scyA9IHRoaXMubWFya1BheW1lbnRVbnNvbGljaXRlZEZvcm0uY29udHJvbHM7XG4gICAgaWYoIXRoaXMuaXNTdHJhdGVnaWNGaXhFbmFibGUpIHtcbiAgICAgIGxldCBhbGxvY2F0ZWRSZXF1ZXN0ID0ge1xuICAgICAgICBhbGxvY2F0aW9uX3N0YXR1czonVHJhbnNmZXJyZWQnLFxuICAgICAgICBwYXltZW50X2FsbG9jYXRpb25fc3RhdHVzOiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgIG5hbWU6ICdUcmFuc2ZlcnJlZCdcbiAgICAgICAgfSxcbiAgICAgICAgdW5pZGVudGlmaWVkX3JlYXNvbjogY29udHJvbHMucmVhc29uLnZhbHVlLFxuICAgICAgICByZWNlaXZpbmdfb2ZmaWNlOiB0aGlzLnNlbGVjdGVkU2l0ZUlkLFxuICAgICAgICB1c2VyX2lkOiB0aGlzLmNhc2VUeXBlLFxuICAgICAgfVxuICAgICAgY29uc3QgcG9zdFN0cmF0ZWdpY0JvZHkgPSBuZXcgQWxsb2NhdGVQYXltZW50UmVxdWVzdFxuICAgICAgKHRoaXMuY2NkUmVmZXJlbmNlLCB0aGlzLnVuYXNzaWduZWRSZWNvcmQsIHRoaXMuY2FzZVR5cGUsIHRoaXMuZXhjZXB0aW9uUmVmZXJlbmNlLCBhbGxvY2F0ZWRSZXF1ZXN0KTtcbiAgICAgIHRoaXMuYnVsa1NjYW5pbmdQYXltZW50U2VydmljZS5wb3N0QlNXb1BHU3RyYXRlZ2ljKHBvc3RTdHJhdGVnaWNCb2R5KS5zdWJzY3JpYmUoXG4gICAgICAgIHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmdldEVycm9yTWVzc2FnZShmYWxzZSk7XG4gICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgIHRoaXMuZ290b0Nhc2V0cmFuc2F0aW9uUGFnZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZ2V0RXJyb3JNZXNzYWdlKHRydWUpO1xuICAgICAgICAgIHRoaXMuaXNDb25maXJtQnV0dG9uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAvLyBjb250cm9scy5yZXNwb25zaWJsZU9mZmljZS5zZXRWYWx1ZSgnUDIxOScpO1xuICAgIHRoaXMuYnVsa1NjYW5pbmdQYXltZW50U2VydmljZS5wYXRjaEJTQ2hhbmdlU3RhdHVzKHRoaXMudW5hc3NpZ25lZFJlY29yZC5kY25fcmVmZXJlbmNlLCAnUFJPQ0VTU0VEJykuc3Vic2NyaWJlKFxuICAgICAgcmVzMSA9PiB7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdGhpcy5nZXRFcnJvck1lc3NhZ2UoZmFsc2UpO1xuICAgICAgICBjb25zdCByZXNwb25zZTEgPSBKU09OLnBhcnNlKHJlczEpLFxuICAgICAgICAgcmVxdWVzdEJvZHkgPSBuZXcgQWxsb2NhdGVQYXltZW50UmVxdWVzdFxuICAgICAgICAgKHRoaXMuY2NkUmVmZXJlbmNlLCB0aGlzLnVuYXNzaWduZWRSZWNvcmQsIHRoaXMuc2l0ZUlELCB0aGlzLmV4Y2VwdGlvblJlZmVyZW5jZSlcbiAgICAgICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UucG9zdEJTUGF5bWVudHMocmVxdWVzdEJvZHkpLnN1YnNjcmliZShcbiAgICAgICAgICByZXMyID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdGhpcy5nZXRFcnJvck1lc3NhZ2UoZmFsc2UpO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UyID0gSlNPTi5wYXJzZShyZXMyKSxcbiAgICAgICAgICAgIHJlcUJvZHkgPSBuZXcgVW5zb2xpY2l0ZWRQYXltZW50c1JlcXVlc3RcbiAgICAgICAgICAgIChyZXNwb25zZTJbJ2RhdGEnXS5wYXltZW50X2dyb3VwX3JlZmVyZW5jZSwgcmVzcG9uc2UyWydkYXRhJ10ucmVmZXJlbmNlLCBjb250cm9scy5yZWFzb24udmFsdWUsIHRoaXMuc2VsZWN0ZWRTaXRlSWQsIGNvbnRyb2xzLnJlc3BvbnNpYmxlUGVyc29uLnZhbHVlLCBjb250cm9scy5lbWFpbElkLnZhbHVlKTtcbiAgICAgICAgICAgICBpZiAocmVzcG9uc2UyLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgdGhpcy5wYXltZW50Vmlld1NlcnZpY2UucG9zdEJTVW5zb2xpY2l0ZWRQYXltZW50cyhyZXFCb2R5KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgcmVzMyA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZ2V0RXJyb3JNZXNzYWdlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlMyA9IEpTT04ucGFyc2UocmVzMyk7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb3RvQ2FzZXRyYW5zYXRpb25QYWdlKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5idWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlLnBhdGNoQlNDaGFuZ2VTdGF0dXModGhpcy51bmFzc2lnbmVkUmVjb3JkLmRjbl9yZWZlcmVuY2UsICdDT01QTEVURScpLnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmdldEVycm9yTWVzc2FnZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaXNDb25maXJtQnV0dG9uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5idWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlLnBhdGNoQlNDaGFuZ2VTdGF0dXModGhpcy51bmFzc2lnbmVkUmVjb3JkLmRjbl9yZWZlcmVuY2UsICdDT01QTEVURScpLnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmdldEVycm9yTWVzc2FnZSh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuaXNDb25maXJtQnV0dG9uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmdldEVycm9yTWVzc2FnZSh0cnVlKTtcbiAgICAgICAgdGhpcy5pc0NvbmZpcm1CdXR0b25kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICk7XG4gICAgfVxuICB9XG4gc2F2ZUFuZENvbnRpbnVlKCkge1xuICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sICdhbGwnKTtcbiAgICAgICAgY29uc3QgZm9ybWVycm9yID0gdGhpcy5tYXJrUGF5bWVudFVuc29saWNpdGVkRm9ybS5jb250cm9scy5yZWFzb24uZXJyb3JzO1xuICAgICAgICBjb25zdCByZWFzb25GaWVsZCA9IHRoaXMubWFya1BheW1lbnRVbnNvbGljaXRlZEZvcm0uY29udHJvbHMucmVhc29uO1xuICAgICAgICAvL2NvbnN0IG9mZmljZUlkRmllbGQgPSB0aGlzLnNlbGVjdGVkU2l0ZUlkO1xuICAgICAgICBjb25zdCBvZmZpY2VJZEZpZWxkICA9IHRoaXMubWFya1BheW1lbnRVbnNvbGljaXRlZEZvcm0uY29udHJvbHMucmVzcG9uc2libGVPZmZpY2U7XG4gICAgaWYgKHRoaXMubWFya1BheW1lbnRVbnNvbGljaXRlZEZvcm0uZGlydHkgJiYgdGhpcy5tYXJrUGF5bWVudFVuc29saWNpdGVkRm9ybS52YWxpZCkge1xuICAgICAgY29uc3QgY29udHJvbHMgPSB0aGlzLm1hcmtQYXltZW50VW5zb2xpY2l0ZWRGb3JtLmNvbnRyb2xzO1xuICAgICAgdGhpcy5lbWFpbElkID0gY29udHJvbHMuZW1haWxJZC52YWx1ZTtcbiAgICAgIHRoaXMucmVzcG9uc2libGVPZmZpY2UgPSBvZmZpY2VJZEZpZWxkLnZhbHVlO1xuICAgICAgdGhpcy5yZXNwb25zaWJsZVBlcnNvbiA9IGNvbnRyb2xzLnJlc3BvbnNpYmxlUGVyc29uLnZhbHVlO1xuICAgICAgdGhpcy5yZWFzb24gPSBjb250cm9scy5yZWFzb24udmFsdWU7XG4gICAgICB0aGlzLnZpZXdTdGF0dXMgPSAndW5zb2xpY2l0ZWRDb250aW51ZUNvbmZpcm0nO1xuICAgIH1lbHNlIHtcbiAgICAgIGlmKCByZWFzb25GaWVsZC52YWx1ZSA9PSAnJyApIHtcbiAgICAgICAgdGhpcy5yZXNldEZvcm0oW3RydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLCAncmVhc29uJyk7XG4gICAgICB9XG4gICAgICBpZihyZWFzb25GaWVsZC52YWx1ZSAhPSAnJyAmJiB0aGlzLm1hcmtQYXltZW50VW5zb2xpY2l0ZWRGb3JtLmNvbnRyb2xzLnJlYXNvbi5pbnZhbGlkICkge1xuICAgICAgICB0aGlzLnJlc2V0Rm9ybShbZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sICdyZWFzb24nKTtcbiAgICAgIH1cbiAgICAgIGlmKGZvcm1lcnJvciAmJiBmb3JtZXJyb3IubWlubGVuZ3RoICYmIGZvcm1lcnJvci5taW5sZW5ndGguYWN0dWFsTGVuZ3RoIDwgMyApIHtcbiAgICAgICAgdGhpcy5yZXNldEZvcm0oW2ZhbHNlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLCAncmVhc29uJyk7XG4gICAgICB9XG4gICAgICBpZihmb3JtZXJyb3IgJiYgZm9ybWVycm9yLm1heGxlbmd0aCAmJiBmb3JtZXJyb3IubWF4bGVuZ3RoLmFjdHVhbExlbmd0aCA+IDI1NSApIHtcbiAgICAgICAgdGhpcy5yZXNldEZvcm0oW2ZhbHNlLGZhbHNlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2VdLCAncmVhc29uJyk7XG4gICAgICB9XG4gICAgICBpZihvZmZpY2VJZEZpZWxkLnZhbHVlID09ICcnKSB7XG4gICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlXSwgJ3Jlc3BvbnNpYmxlT2ZmaWNlJyk7XG4gICAgICB9XG4gICAgICBpZihvZmZpY2VJZEZpZWxkLnZhbHVlICE9ICcnICYmIG9mZmljZUlkRmllbGQuaW52YWxpZCkge1xuICAgICAgICB0aGlzLnJlc2V0Rm9ybShbZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZV0sJ3Jlc3BvbnNpYmxlT2ZmaWNlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0Rm9ybSh2YWwsIGZpZWxkKSB7XG4gICAgaWYoZmllbGQ9PT0ncmVhc29uJyB8fCBmaWVsZD09PSdhbGwnKSB7XG4gICAgICB0aGlzLmlzUmVhc29uRW1wdHkgPSB2YWxbMF07XG4gICAgICB0aGlzLnJlYXNvbkhhc0Vycm9yID0gdmFsWzFdO1xuICAgICAgdGhpcy5yZWFzb25NaW5IYXNFcnJvciA9IHZhbFsyXTtcbiAgICAgIHRoaXMucmVhc29uTWF4SGFzRXJyb3IgPSB2YWxbM107XG4gICAgfVxuICAgIGlmKGZpZWxkPT09J3Jlc3BvbnNpYmxlT2ZmaWNlJyB8fCBmaWVsZD09PSdhbGwnKSB7XG4gICAgICB0aGlzLmlzUmVzcG9uc2libGVPZmZpY2VFbXB0eSA9IHZhbFs0XTtcbiAgICAgIHRoaXMucmVzcG9uc2libGVPZmZpY2VIYXNFcnJvciA9IHZhbFs1XTtcbiAgICB9XG4gIH1cblxuY2FuY2VsTWFya1Vuc29saWNpdGVkUGF5bWVudHModHlwZT86c3RyaW5nKXtcbiAgICBpZih0eXBlICYmIHR5cGUgPT09ICdjYW5jZWwnKSB7XG4gICAgICBpZih0aGlzLmNoZWNraW5nRm9ybVZhbHVlKCkpe1xuICAgICAgICB0aGlzLnZpZXdTdGF0dXMgPSAndW5zb2xpY2l0ZWRDYW5jZWxDb25maXJtJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZ290b0Nhc2V0cmFuc2F0aW9uUGFnZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1hcmtQYXltZW50VW5zb2xpY2l0ZWRGb3JtLmNvbnRyb2xzLnJlc3BvbnNpYmxlT2ZmaWNlLnNldFZhbHVlKCcnKTtcbiAgICAgIHRoaXMudmlld1N0YXR1cyA9ICdtYWluRm9ybSc7XG4gICAgfVxuICB9XG4gIGNoZWNraW5nRm9ybVZhbHVlKCl7XG4gICAgY29uc3QgZm9ybUZpZWxkcyA9IHRoaXMubWFya1BheW1lbnRVbnNvbGljaXRlZEZvcm0udmFsdWU7XG4gICAgbGV0IHZhbHVlRXhpc3RzID0gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBmaWVsZCBpbiBmb3JtRmllbGRzKSB7XG4gICAgICBpZiAoZm9ybUZpZWxkcy5oYXNPd25Qcm9wZXJ0eShmaWVsZCkgJiYgZm9ybUZpZWxkc1tmaWVsZF0gIT09XCJcIikge1xuICAgICAgICB2YWx1ZUV4aXN0cyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVFeGlzdHM7XG4gIH1cbiAgZ290b0Nhc2V0cmFuc2F0aW9uUGFnZSgpIHtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAnY2FzZS10cmFuc2FjdGlvbnMnO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5UQUtFUEFZTUVOVCA9IHRydWU7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTQlNFTkFCTEUgPSB0cnVlO1xuICB9XG4gICBnZXRVbmFzc2lnbmVkUGF5bWVudCgpIHtcbiAgICB0aGlzLmJ1bGtTY2FuaW5nUGF5bWVudFNlcnZpY2UuZ2V0QlNQYXltZW50c0J5RENOKHRoaXMuYnNwYXltZW50ZGNuKS5zdWJzY3JpYmUoXG4gICAgICB1bmFzc2lnbmVkUGF5bWVudHMgPT4ge1xuICAgICAgICBcbiAgICAgIHRoaXMudW5hc3NpZ25lZFJlY29yZCA9IHVuYXNzaWduZWRQYXltZW50c1snZGF0YSddLnBheW1lbnRzLmZpbHRlcihwYXltZW50ID0+IHtcbiAgICAgICAgcmV0dXJuIHBheW1lbnQgJiYgcGF5bWVudC5kY25fcmVmZXJlbmNlID09IHRoaXMuYnNwYXltZW50ZGNuO1xuICAgICAgfSlbMF07XG4gICAgICAgdGhpcy5zaXRlSUQgPSB1bmFzc2lnbmVkUGF5bWVudHNbJ2RhdGEnXS5yZXNwb25zaWJsZV9zZXJ2aWNlX2lkO1xuICAgICAgICBjb25zdCBiZUNjZE51bWJlciA9IHVuYXNzaWduZWRQYXltZW50c1snZGF0YSddLmNjZF9yZWZlcmVuY2UsXG4gICAgICAgICBiZUV4Y2VwdGlvbk51bWJlciA9IHVuYXNzaWduZWRQYXltZW50c1snZGF0YSddLmV4Y2VwdGlvbl9yZWNvcmRfcmVmZXJlbmNlLFxuICAgICAgICAgZXhjZXB0aW9uUmVmZXJlbmNlID0gYmVDY2ROdW1iZXIgPyBiZUNjZE51bWJlciA9PT0gdGhpcy5jY2RDYXNlTnVtYmVyID8gbnVsbCA6IHRoaXMuY2NkQ2FzZU51bWJlciA6IHRoaXMuY2NkQ2FzZU51bWJlcjtcbiAgICAgICAgdGhpcy5jY2RSZWZlcmVuY2UgPSBiZUNjZE51bWJlciA/IGJlQ2NkTnVtYmVyIDogbnVsbDtcbiAgICAgICAgdGhpcy5leGNlcHRpb25SZWZlcmVuY2UgPSBiZUV4Y2VwdGlvbk51bWJlciA/IGJlRXhjZXB0aW9uTnVtYmVyIDogZXhjZXB0aW9uUmVmZXJlbmNlO1xuICAgIH0sXG4gICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZ2V0RXJyb3JNZXNzYWdlKHRydWUpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBnZXRFcnJvck1lc3NhZ2UoaXNFcnJvckV4aXN0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiBcIlNvbWV0aGluZyB3ZW50IHdyb25nLlwiLFxuICAgICAgYm9keTogXCJQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLlwiLFxuICAgICAgc2hvd0Vycm9yOiBpc0Vycm9yRXhpc3RcbiAgICB9O1xuICB9XG5cbiAgc2VsZWN0Y2hhbmdlKGFyZ3MpeyBcbiAgICB0aGlzLnNlbGVjdGVkU2l0ZUlkID0gYXJncy50YXJnZXQudmFsdWU7IFxuICAgIHRoaXMuc2VsZWN0ZWRTaXRlTmFtZSA9IGFyZ3MudGFyZ2V0Lm9wdGlvbnNbYXJncy50YXJnZXQuc2VsZWN0ZWRJbmRleF0udGV4dDsgXG4gIH0gXG5cbn1cbiIsIjxkaXYgY2xhc3M9XCJta3BheS11bmlkZW50aWZpZWRcIj5cbiAgPGRpdiAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICdtYWluRm9ybSdcIj5cbiAgPGNjcGF5LWVycm9yLWJhbm5lciAqbmdJZj1cImVycm9yTWVzc2FnZS5zaG93RXJyb3JcIiBbZXJyb3JNZXNzYWdlXT1cImVycm9yTWVzc2FnZVwiPjwvY2NwYXktZXJyb3ItYmFubmVyPlxuICA8aDEgY2xhc3M9XCJoZWFkaW5nLWxhcmdlXCI+TWFyayBwYXltZW50IGFzIHRyYW5zZmVycmVkPC9oMT5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGwgZ292dWstIS1wYWRkaW5nLWJvdHRvbS0zXCI+XG4gICAgPGhyIGNsYXNzPVwiZ292dWstc2VjdGlvbi1icmVhayBnb3Z1ay1zZWN0aW9uLWJyZWFrLS12aXNpYmxlXCI+XG4gICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgIDx0aGVhZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkXCI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPlBheW1lbnQgYXNzZXQgbnVtYmVyIChEQ04pPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkJhbmtlZCBkYXRlPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkFtb3VudDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5NZXRob2Q8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3t1bmFzc2lnbmVkUmVjb3JkLmRjbl9yZWZlcmVuY2V9fTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPiB7e3VuYXNzaWduZWRSZWNvcmQuZGF0ZV9iYW5rZWQgfCBkYXRlOidkZCBNTU0geXl5eSd9fTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPiB7e3VuYXNzaWduZWRSZWNvcmQuYW1vdW50IHwgY3VycmVuY3kgOidHQlAnOidzeW1ib2wnOicxLjItMid9fTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJjYXBpdGFsaXplIGdvdnVrLXRhYmxlX19jZWxsXCI+IHt7dHJpbVVuZGVyc2NvcmUodW5hc3NpZ25lZFJlY29yZC5wYXltZW50X21ldGhvZCkgfCBsb3dlcmNhc2V9fSAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGJvZHk+XG4gICAgPC90YWJsZT5cbiAgPC9kaXY+XG4gIFxuICA8Zm9ybSBbZm9ybUdyb3VwXT1cIm1hcmtQYXltZW50VW5zb2xpY2l0ZWRGb3JtXCIgbm92YWxpZGF0ZT5cbiAgICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBjbGFzcz0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J01BUktUUkFOU0ZFUlJFRCc+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIj5cbiAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGN1c3RvbS1nb3Z1ay1sYWJlbCBjdXN0b20tZ292dWstbGFiZWxcIiBmb3I9XCJyZWFzb25cIj5cbiAgICAgICAgUmVhc29uIGZvciBwYXltZW50IGJlaW5nIG1hcmtlZCBhcyB0cmFuc2ZlcnJlZCAgIFxuICAgICAgPC9sYWJlbD5cbiAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC0zLTRcIiBbbmdDbGFzc109XCJ7J2lubGluZS1lcnJvci1jbGFzcyc6IHJlYXNvbkhhc0Vycm9yIHx8IHJlYXNvbk1pbkhhc0Vycm9yIHx8IHJlYXNvbk1heEhhc0Vycm9yfVwiIG5hbWU9XCJyZWFzb25cIiBpZD1cInJlYXNvblwiIHJvd3M9XCI1XCIgZm9ybUNvbnRyb2xOYW1lPVwicmVhc29uXCI+XG4gICAgICAgIDwvdGV4dGFyZWE+XG4gICAgICAgIDxwIGNsYXNzPVwiaW5saW5lLWVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImlzUmVhc29uRW1wdHkgfHwgcmVhc29uSGFzRXJyb3IgfHwgcmVhc29uTWluSGFzRXJyb3IgfHwgcmVhc29uTWF4SGFzRXJyb3JcIj5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cImlzUmVhc29uRW1wdHlcIj5FbnRlciBhIHJlYXNvbiBmb3IgbWFya2luZyB0aGlzIHBheW1lbnQgYXMgdHJhbnNmZXJyZWQuPC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwicmVhc29uSGFzRXJyb3JcIj5FbnRlciBhIHZhbGlkIHJlYXNvbjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cInJlYXNvbk1pbkhhc0Vycm9yXCI+UmVhc29uIHNob3VsZCBiZSBhdCBsZWFzdCAzIGNoYXJhY3RlcnMuPC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwicmVhc29uTWF4SGFzRXJyb3JcIj5SZWFzb24gc2hvdWxkIGJlIDI1NSBjaGFyYWN0ZXJzIG9yIHVuZGVyLjwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBjdXN0b20tZ292dWstbGFiZWxcIiBmb3I9XCJyZXNwb25zaWJsZU9mZmljZVwiPlxuICAgICAgICBSZWNlaXZpbmcgU2l0ZSBJRCAoUmVjZWl2aW5nIGNvdXJ0L0J1bGsgY2VudHJlIHNpdGUgSUQpICAgIFxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgc2hvcnQtaW5wdXRcIiBpZD1cInJlc3BvbnNpYmxlT2ZmaWNlXCIgZm9ybUNvbnRyb2xOYW1lPVwicmVzcG9uc2libGVPZmZpY2VcIiAoY2hhbmdlKT1cInNlbGVjdGNoYW5nZSgkZXZlbnQpXCI+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBzZWxlY3RlZD0nc2VsZWN0ZWQnPlBsZWFzZSBzZWxlY3Q8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiAgKm5nRm9yPVwibGV0IHNpdGVJRCBvZiBzaXRlSURMaXN0O1wiIHZhbHVlPVwie3tzaXRlSUQuc2l0ZUlkfX1cIj57e3NpdGVJRC5zaXRlTmFtZX19ICh7e3NpdGVJRC5zaXRlSWR9fSk8L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgICAgPHAgY2xhc3M9XCJpbmxpbmUtZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwiaXNSZXNwb25zaWJsZU9mZmljZUVtcHR5IHx8IHJlc3BvbnNpYmxlT2ZmaWNlSGFzRXJyb3JcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJpc1Jlc3BvbnNpYmxlT2ZmaWNlRW1wdHlcIj5QbGVhc2Ugc2VsZWN0IFJlY2VpdmluZyBTaXRlIElEPC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cInJlc3BvbnNpYmxlT2ZmaWNlSGFzRXJyb3JcIj5QbGVhc2Ugc2VsZWN0IGEgdmFsaWQgUmVjZWl2aW5nIFNpdGUgSUQ8L3NwYW4+XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLS1ncm91cFwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgW2Rpc2FibGVkXT1cImlzQ29udGludWVCdXR0b25kaXNhYmxlZFwiIGNsYXNzPVwiYnV0dG9uXCIgKGNsaWNrKT1cInNhdmVBbmRDb250aW51ZSgpXCI+XG4gICAgICAgIENvbmZpcm1cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnlcIiAoY2xpY2spPVwiY2FuY2VsTWFya1Vuc29saWNpdGVkUGF5bWVudHMoJ2NhbmNlbCcpXCI+XG4gICAgICAgIENhbmNlbFxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZm9ybT5cbiAgXG48L2Rpdj5cbiAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ3Vuc29saWNpdGVkQ29udGludWVDb25maXJtJ1wiPlxuICAgICAgICAgIDxjY3BheS1lcnJvci1iYW5uZXIgKm5nSWY9XCJlcnJvck1lc3NhZ2Uuc2hvd0Vycm9yXCIgW2Vycm9yTWVzc2FnZV09XCJlcnJvck1lc3NhZ2VcIj48L2NjcGF5LWVycm9yLWJhbm5lcj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRfX2ljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj4hPC9zcGFuPlxuICAgICAgICA8c3Ryb25nIGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0X190ZXh0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0X19hc3Npc3RpdmVcIj5XYXJuaW5nPC9zcGFuPlxuICAgICAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLXNtYWxsXCI+IEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBtYXJrIHRoaXMgcGF5bWVudCBhcyB0cmFuc2ZlcnJlZD8gPC9oMT5cbiAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgIDxpbnB1dCAjbXlJbnB1dCB0eXBlPSdoaWRkZW4nIGNsYXNzPSdpRnJhbWVEcml2ZW5JbWFnZVZhbHVlJyB2YWx1ZT0nVFJBTlNGRVJSRURDT05GSVJNQVRJT04nPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tZnVsbCBnb3Z1ay0hLXBhZGRpbmctYm90dG9tLTNcIj5cbiAgICAgICAgICA8aHIgY2xhc3M9XCJnb3Z1ay1zZWN0aW9uLWJyZWFrIGdvdnVrLXNlY3Rpb24tYnJlYWstLXZpc2libGVcIj5cbiAgICAgICAgICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZVwiPlxuICAgICAgICAgICAgPHRoZWFkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+UmVhc29uPC90ZD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+UmVjZWl2aW5nIHNpdGUgSUQ8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiPlxuICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57e3JlYXNvbn19PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3tzZWxlY3RlZFNpdGVOYW1lfX08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi0tZ3JvdXBcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b25cIiBbZGlzYWJsZWRdPVwiaXNDb25maXJtQnV0dG9uZGlzYWJsZWRcIiAoY2xpY2spPVwiY29uZmlybVBheW1lbnRzKClcIj5cbiAgICAgICAgICBDb25maXJtXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiIChjbGljayk9XCJjYW5jZWxNYXJrVW5zb2xpY2l0ZWRQYXltZW50cygpXCI+XG4gICAgICAgICAgQ2FuY2VsXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ3Vuc29saWNpdGVkQ2FuY2VsQ29uZmlybSdcIj5cbiAgICAgICAgPGlucHV0ICNteUlucHV0IHR5cGU9J2hpZGRlbicgY2xhc3M9J2lGcmFtZURyaXZlbkltYWdlVmFsdWUnIHZhbHVlPSdDQU5DRUxUUkFOU0ZFUlJFRCc+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0X19pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+ITwvc3Bhbj5cbiAgICAgICAgPHN0cm9uZyBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dF9fdGV4dFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dF9fYXNzaXN0aXZlXCI+V2FybmluZzwvc3Bhbj5cbiAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2FuY2VsP1xuICAgICAgICA8L3N0cm9uZz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi0tZ3JvdXBcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b25cIiAoY2xpY2spPVwiZ290b0Nhc2V0cmFuc2F0aW9uUGFnZSgpXCI+XG4gICAgICAgICAgWWVzXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiIChjbGljayk9XCJjYW5jZWxNYXJrVW5zb2xpY2l0ZWRQYXltZW50cygpXCI+XG4gICAgICAgICAgTm9cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PiJdfQ==