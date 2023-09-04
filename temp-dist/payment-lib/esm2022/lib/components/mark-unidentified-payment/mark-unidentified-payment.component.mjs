import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PaymentLibComponent } from '../../payment-lib.component';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { UnidentifiedPaymentsRequest } from '../../interfaces/UnidentifiedPaymentsRequest';
import { AllocatePaymentRequest } from '../../interfaces/AllocatePaymentRequest';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../services/payment-view/payment-view.service";
import * as i3 from "../../payment-lib.component";
import * as i4 from "../../services/bulk-scaning-payment/bulk-scaning-payment.service";
import * as i5 from "@angular/common";
import * as i6 from "../error-banner/error-banner.component";
function MarkUnidentifiedPaymentComponent_div_1_p_40_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a reason for marking this payment as unidentified.");
    i0.ɵɵelementEnd();
} }
function MarkUnidentifiedPaymentComponent_div_1_p_40_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a vaild reason");
    i0.ɵɵelementEnd();
} }
function MarkUnidentifiedPaymentComponent_div_1_p_40_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Reason should be at least 3 characters.");
    i0.ɵɵelementEnd();
} }
function MarkUnidentifiedPaymentComponent_div_1_p_40_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Reason should be 255 characters or under.");
    i0.ɵɵelementEnd();
} }
function MarkUnidentifiedPaymentComponent_div_1_p_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtemplate(1, MarkUnidentifiedPaymentComponent_div_1_p_40_span_1_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(2, MarkUnidentifiedPaymentComponent_div_1_p_40_span_2_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(3, MarkUnidentifiedPaymentComponent_div_1_p_40_span_3_Template, 2, 0, "span", 1);
    i0.ɵɵtemplate(4, MarkUnidentifiedPaymentComponent_div_1_p_40_span_4_Template, 2, 0, "span", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.isInvesticationDetailEmpty);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.investicationDetailHasError);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.investicationDetailMinHasError);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.investicationDetailMaxHasError);
} }
const _c0 = function (a0) { return { "inline-error-class": a0 }; };
function MarkUnidentifiedPaymentComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "input", 2, 3);
    i0.ɵɵelementStart(3, "h1", 4);
    i0.ɵɵtext(4, "Mark payment as unidentified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 5);
    i0.ɵɵelement(6, "hr", 6);
    i0.ɵɵelementStart(7, "table", 7)(8, "thead", 8)(9, "tr", 9)(10, "td", 10);
    i0.ɵɵtext(11, "Payment asset number (DCN)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 10);
    i0.ɵɵtext(13, "Banked date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 10);
    i0.ɵɵtext(15, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 10);
    i0.ɵɵtext(17, "Method");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "tbody", 11)(19, "tr", 9)(20, "td", 12);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td", 12);
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "td", 12);
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "td", 13);
    i0.ɵɵtext(29);
    i0.ɵɵpipe(30, "lowercase");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(31, "form", 14)(32, "div", 15)(33, "p", 16);
    i0.ɵɵtext(34, " Give a reason for marking this payment as unidentified. ");
    i0.ɵɵelement(35, "br");
    i0.ɵɵtext(36, " Include any investigations you've made. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(37, "label", 17);
    i0.ɵɵelementStart(38, "textarea", 18);
    i0.ɵɵtext(39, "        ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(40, MarkUnidentifiedPaymentComponent_div_1_p_40_Template, 5, 4, "p", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "div", 20)(42, "button", 21);
    i0.ɵɵlistener("click", function MarkUnidentifiedPaymentComponent_div_1_Template_button_click_42_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.saveAndContinue()); });
    i0.ɵɵtext(43, " Continue ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "button", 22);
    i0.ɵɵlistener("click", function MarkUnidentifiedPaymentComponent_div_1_Template_button_click_44_listener() { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.cancelMarkUnidentifiedPayments("cancel")); });
    i0.ɵɵtext(45, " Cancel ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(21);
    i0.ɵɵtextInterpolate(ctx_r0.unassignedRecord.dcn_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(24, 7, ctx_r0.unassignedRecord.date_banked, "dd MMM yyyy"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(27, 10, ctx_r0.unassignedRecord.amount, "GBP", "symbol", "1.2-2"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(30, 15, ctx_r0.trimUnderscore(ctx_r0.unassignedRecord.payment_method)), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r0.markPaymentUnidentifiedForm);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(17, _c0, ctx_r0.isInvesticationDetailEmpty || ctx_r0.investicationDetailHasError || ctx_r0.investicationDetailMinHasError || ctx_r0.investicationDetailMaxHasError));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.isInvesticationDetailEmpty || ctx_r0.investicationDetailHasError || ctx_r0.investicationDetailMinHasError || ctx_r0.investicationDetailMaxHasError);
} }
function MarkUnidentifiedPaymentComponent_ng_container_2_ccpay_error_banner_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccpay-error-banner", 32);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("errorMessage", ctx_r12.errorMessage);
} }
function MarkUnidentifiedPaymentComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, MarkUnidentifiedPaymentComponent_ng_container_2_ccpay_error_banner_1_Template, 1, 1, "ccpay-error-banner", 24);
    i0.ɵɵelement(2, "input", 25, 3);
    i0.ɵɵelementStart(4, "div", 26)(5, "span", 27);
    i0.ɵɵtext(6, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong", 28)(8, "span", 29);
    i0.ɵɵtext(9, "Warning");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "h1", 30);
    i0.ɵɵtext(11, " Are you sure you want to mark this payment as unidentified? ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 5);
    i0.ɵɵelement(13, "hr", 6);
    i0.ɵɵelementStart(14, "table", 7)(15, "thead", 8)(16, "tr", 9)(17, "td", 10);
    i0.ɵɵtext(18, "Investigations");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "tbody", 11)(20, "tr", 9)(21, "td", 12);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(23, "div", 20)(24, "button", 31);
    i0.ɵɵlistener("click", function MarkUnidentifiedPaymentComponent_ng_container_2_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r14.confirmPayments()); });
    i0.ɵɵtext(25, " Confirm ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 22);
    i0.ɵɵlistener("click", function MarkUnidentifiedPaymentComponent_ng_container_2_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r15); const ctx_r16 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r16.cancelMarkUnidentifiedPayments()); });
    i0.ɵɵtext(27, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.errorMessage.showError);
    i0.ɵɵadvance(21);
    i0.ɵɵtextInterpolate(ctx_r1.investigationComment);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isConfirmButtondisabled);
} }
function MarkUnidentifiedPaymentComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 33, 3);
    i0.ɵɵelementStart(3, "div", 26)(4, "span", 27);
    i0.ɵɵtext(5, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong", 28)(7, "span", 29);
    i0.ɵɵtext(8, "Warning");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " Are you sure you want to cancel? ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 20)(11, "button", 21);
    i0.ɵɵlistener("click", function MarkUnidentifiedPaymentComponent_ng_container_3_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r19); const ctx_r18 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r18.gotoCasetransationPage()); });
    i0.ɵɵtext(12, " Yes ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 22);
    i0.ɵɵlistener("click", function MarkUnidentifiedPaymentComponent_ng_container_3_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r19); const ctx_r20 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r20.cancelMarkUnidentifiedPayments()); });
    i0.ɵɵtext(14, " No ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} }
export class MarkUnidentifiedPaymentComponent {
    formBuilder;
    paymentViewService;
    paymentLibComponent;
    bulkScaningPaymentService;
    caseType;
    markPaymentUnidentifiedForm;
    viewStatus;
    ccdCaseNumber;
    bspaymentdcn;
    isInvesticationDetailEmpty = false;
    investicationDetailHasError = false;
    investicationDetailMinHasError = false;
    investicationDetailMaxHasError = false;
    errorMessage = this.getErrorMessage(false);
    unassignedRecord;
    siteID = null;
    investigationComment;
    isConfirmButtondisabled = false;
    ccdReference = null;
    exceptionReference = null;
    isStrategicFixEnable = true;
    constructor(formBuilder, paymentViewService, paymentLibComponent, bulkScaningPaymentService) {
        this.formBuilder = formBuilder;
        this.paymentViewService = paymentViewService;
        this.paymentLibComponent = paymentLibComponent;
        this.bulkScaningPaymentService = bulkScaningPaymentService;
    }
    ngOnInit() {
        this.viewStatus = 'mainForm';
        this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
        this.bspaymentdcn = this.paymentLibComponent.bspaymentdcn;
        this.isStrategicFixEnable = this.paymentLibComponent.ISSFENABLE;
        this.getUnassignedPayment();
        this.markPaymentUnidentifiedForm = this.formBuilder.group({
            investicationDetail: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
                Validators.pattern('^([a-zA-Z0-9\\s,\\.]*)$')
            ]))
        });
    }
    getUnassignedPayment() {
        this.bulkScaningPaymentService.getBSPaymentsByDCN(this.bspaymentdcn).subscribe(unassignedPayments => {
            this.errorMessage = this.getErrorMessage(false);
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
    trimUnderscore(method) {
        return this.bulkScaningPaymentService.removeUnwantedString(method, ' ');
    }
    saveAndContinue() {
        this.resetForm([false, false, false, false]);
        const investicationField = this.markPaymentUnidentifiedForm.controls.investicationDetail;
        const formerror = investicationField.errors;
        if (this.markPaymentUnidentifiedForm.dirty && this.markPaymentUnidentifiedForm.valid) {
            this.investigationComment = this.markPaymentUnidentifiedForm.controls.investicationDetail.value;
            this.viewStatus = 'unidentifiedContinueConfirm';
        }
        else {
            if (investicationField.value == '') {
                this.resetForm([true, false, false, false]);
            }
            if (investicationField.value != '' && investicationField.invalid) {
                this.resetForm([false, true, false, false]);
            }
            if (formerror && formerror.minlength && formerror.minlength.actualLength < 3) {
                this.resetForm([false, false, true, false]);
            }
            if (formerror && formerror.maxlength && formerror.maxlength.actualLength > 255) {
                this.resetForm([false, false, false, true]);
            }
        }
    }
    resetForm(val) {
        this.isInvesticationDetailEmpty = val[0];
        this.investicationDetailHasError = val[1];
        this.investicationDetailMinHasError = val[2];
        this.investicationDetailMaxHasError = val[3];
    }
    confirmPayments() {
        this.isConfirmButtondisabled = true;
        const reason = this.markPaymentUnidentifiedForm.get('investicationDetail').value;
        if (!this.isStrategicFixEnable) {
            let allocatedRequest = {
                allocation_status: 'Unidentified',
                payment_allocation_status: {
                    description: '',
                    name: 'Unidentified'
                },
                unidentified_reason: reason,
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
            this.bulkScaningPaymentService.patchBSChangeStatus(this.unassignedRecord.dcn_reference, 'PROCESSED').subscribe(res1 => {
                this.errorMessage = this.getErrorMessage(false);
                const requestBody = new AllocatePaymentRequest(this.ccdReference, this.unassignedRecord, this.siteID, this.exceptionReference);
                this.paymentViewService.postBSPayments(requestBody).subscribe(res2 => {
                    this.errorMessage = this.getErrorMessage(false);
                    const response2 = JSON.parse(res2), reqBody = new UnidentifiedPaymentsRequest(response2['data'].payment_group_reference, response2['data'].reference, reason);
                    if (response2.success) {
                        this.paymentViewService.postBSUnidentifiedPayments(reqBody).subscribe(res3 => {
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
    cancelMarkUnidentifiedPayments(type) {
        if (type && type === 'cancel') {
            if (this.markPaymentUnidentifiedForm.get('investicationDetail').value !== "") {
                this.viewStatus = 'unidentifiedCancelConfirm';
            }
            else {
                this.gotoCasetransationPage();
            }
        }
        else {
            this.viewStatus = 'mainForm';
        }
    }
    gotoCasetransationPage() {
        this.paymentLibComponent.viewName = 'case-transactions';
        this.paymentLibComponent.TAKEPAYMENT = true;
        this.paymentLibComponent.ISBSENABLE = true;
    }
    getErrorMessage(isErrorExist) {
        return {
            title: "There is a problem with the service",
            body: "Try again later",
            showError: isErrorExist
        };
    }
    static ɵfac = function MarkUnidentifiedPaymentComponent_Factory(t) { return new (t || MarkUnidentifiedPaymentComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.PaymentViewService), i0.ɵɵdirectiveInject(i3.PaymentLibComponent), i0.ɵɵdirectiveInject(i4.BulkScaningPaymentService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MarkUnidentifiedPaymentComponent, selectors: [["app-mark-unidentified-payment"]], inputs: { caseType: "caseType" }, decls: 4, vars: 3, consts: [[1, "mkpay-unidentified"], [4, "ngIf"], ["type", "hidden", "value", "MARKUNIDENTIFIED", 1, "iFrameDrivenImageValue"], ["myInput", ""], [1, "heading-large"], [1, "govuk-grid-column-full", "govuk-!-padding-bottom-3"], [1, "govuk-section-break", "govuk-section-break--visible"], [1, "govuk-table"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["scope", "col", 1, "govuk-table__header"], [1, "govuk-table__body"], [1, "govuk-table__cell"], [1, "capitalize", "govuk-table__cell"], ["novalidate", "", 3, "formGroup"], [1, "govuk-form-group"], [1, "unidentifiedSubText"], ["for", "investicationDetail", 1, "heading-small"], ["name", "investicationDetail", "id", "investicationDetail", "rows", "5", "formControlName", "investicationDetail", 1, "form-control", "form-control-3-4", 3, "ngClass"], ["class", "inline-error-message", 4, "ngIf"], [1, "govuk-button--group"], ["type", "submit", 1, "button", 3, "click"], ["type", "button", 1, "button", "govuk-button--secondary", 3, "click"], [1, "inline-error-message"], [3, "errorMessage", 4, "ngIf"], ["type", "hidden", "value", "UNIDENTIFIEDCONFIRMATION", 1, "iFrameDrivenImageValue"], [1, "govuk-warning-text"], ["aria-hidden", "true", 1, "govuk-warning-text__icon"], [1, "govuk-warning-text__text"], [1, "govuk-warning-text__assistive"], [1, "heading-small"], ["type", "submit", 1, "button", 3, "disabled", "click"], [3, "errorMessage"], ["type", "hidden", "value", "CANCELUNIDENTIFIED", 1, "iFrameDrivenImageValue"]], template: function MarkUnidentifiedPaymentComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, MarkUnidentifiedPaymentComponent_div_1_Template, 46, 19, "div", 1);
            i0.ɵɵtemplate(2, MarkUnidentifiedPaymentComponent_ng_container_2_Template, 28, 3, "ng-container", 1);
            i0.ɵɵtemplate(3, MarkUnidentifiedPaymentComponent_ng_container_3_Template, 15, 0, "ng-container", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "mainForm");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "unidentifiedContinueConfirm");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewStatus === "unidentifiedCancelConfirm");
        } }, dependencies: [i5.NgClass, i5.NgIf, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, i6.ErrorBannerComponent, i5.LowerCasePipe, i5.CurrencyPipe, i5.DatePipe], styles: [".mkpay-unidentified[_ngcontent-%COMP%]{margin:10px 0 20px}.mkpay-unidentified[_ngcontent-%COMP%]   .govuk-button--group[_ngcontent-%COMP%]   .govuk-button--secondary[_ngcontent-%COMP%]{margin-left:10px;background-color:#b3b8bdf2}.mkpay-unidentified[_ngcontent-%COMP%]   .inline-error-class[_ngcontent-%COMP%]{outline:3px solid #a71414;outline-offset:0}.mkpay-unidentified[_ngcontent-%COMP%]   .inline-error-message[_ngcontent-%COMP%]{color:#a71414;font-weight:700;margin-top:10px}.govuk-grid-column-full[_ngcontent-%COMP%]{padding:0}.unidentifiedSubText[_ngcontent-%COMP%]{line-height:45px}.govuk-warning-text__text[_ngcontent-%COMP%]{font-size:19px}.lowercase[_ngcontent-%COMP%]{text-transform:lowercase}.capitalize[_ngcontent-%COMP%]{text-transform:capitalize}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MarkUnidentifiedPaymentComponent, [{
        type: Component,
        args: [{ selector: 'app-mark-unidentified-payment', template: "<div class=\"mkpay-unidentified\" >\n  <div *ngIf=\"viewStatus === 'mainForm'\">\n    <input #myInput  type='hidden' class='iFrameDrivenImageValue' value='MARKUNIDENTIFIED'>\n    <h1 class=\"heading-large\">Mark payment as unidentified</h1>\n\n    <div class=\"govuk-grid-column-full govuk-!-padding-bottom-3\">\n      <hr class=\"govuk-section-break govuk-section-break--visible\">\n      <table class=\"govuk-table\">\n        <thead class=\"govuk-table__head\">\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__header\" scope=\"col\">Payment asset number (DCN)</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Banked date</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Amount</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Method</td>\n           \n        </tr>\n      </thead>\n      <tbody class=\"govuk-table__body\">\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell\">{{unassignedRecord.dcn_reference}}</td>\n            <td class=\"govuk-table__cell\"> {{unassignedRecord.date_banked | date:'dd MMM yyyy'}}</td>\n            <td class=\"govuk-table__cell\"> {{unassignedRecord.amount | currency :'GBP':'symbol':'1.2-2'}}</td>\n            <td class=\"capitalize govuk-table__cell\"> {{trimUnderscore(unassignedRecord.payment_method) | lowercase}}  </td>\n        </tr>\n      </tbody>\n    </table>\n    </div>\n    <form [formGroup]=\"markPaymentUnidentifiedForm\" novalidate>\n      <div class=\"govuk-form-group\">\n        <p class=\"unidentifiedSubText\">\n          Give a reason for marking this payment as unidentified.\n          <br/>\n          Include any investigations you've made.\n        </p>\n        <label class=\"heading-small\" for=\"investicationDetail\">\n\n        </label>\n        <textarea class=\"form-control form-control-3-4\" [ngClass]=\"{'inline-error-class': isInvesticationDetailEmpty || investicationDetailHasError || investicationDetailMinHasError || investicationDetailMaxHasError}\" name=\"investicationDetail\" id=\"investicationDetail\" rows=\"5\" formControlName=\"investicationDetail\">\n        </textarea>\n        <p class=\"inline-error-message\" *ngIf=\"isInvesticationDetailEmpty || investicationDetailHasError || investicationDetailMinHasError || investicationDetailMaxHasError\">\n          <span *ngIf=\"isInvesticationDetailEmpty\">Enter a reason for marking this payment as unidentified.</span>\n          <span *ngIf=\"investicationDetailHasError\">Enter a vaild reason</span>\n          <span *ngIf=\"investicationDetailMinHasError\">Reason should be at least 3 characters.</span>\n          <span *ngIf=\"investicationDetailMaxHasError\">Reason should be 255 characters or under.</span>\n        </p>\n      </div>\n      <div class=\"govuk-button--group\">\n        <button type=\"submit\" class=\"button\" (click)=\"saveAndContinue()\">\n          Continue\n        </button>\n        <button type=\"button\" class=\"button govuk-button--secondary\" (click)=\"cancelMarkUnidentifiedPayments('cancel')\">\n          Cancel\n        </button>\n      </div>\n    </form>\n  </div>\n   <ng-container *ngIf=\"viewStatus === 'unidentifiedContinueConfirm'\">\n      <ccpay-error-banner *ngIf=\"errorMessage.showError\" [errorMessage]=\"errorMessage\"></ccpay-error-banner>\n      <input #myInput type='hidden' class='iFrameDrivenImageValue' value='UNIDENTIFIEDCONFIRMATION'>\n      <div class=\"govuk-warning-text\">\n        <span class=\"govuk-warning-text__icon\" aria-hidden=\"true\">!</span>\n        <strong class=\"govuk-warning-text__text\">\n        <span class=\"govuk-warning-text__assistive\">Warning</span>\n        <h1 class=\"heading-small\"> Are you sure you want to mark this payment as unidentified? </h1>\n         \n        </strong>\n\n        <div class=\"govuk-grid-column-full govuk-!-padding-bottom-3\">\n          <hr class=\"govuk-section-break govuk-section-break--visible\">\n          <table class=\"govuk-table\">\n            <thead class=\"govuk-table__head\">\n            <tr class=\"govuk-table__row\">\n              <td class=\"govuk-table__header\" scope=\"col\">Investigations</td>\n            </tr>\n            </thead>\n            <tbody class=\"govuk-table__body\">\n            <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__cell\">{{investigationComment}}</td>\n            </tr>\n            </tbody>\n          </table>\n        </div>\n\n      </div>\n      <div class=\"govuk-button--group\">\n        <button type=\"submit\" class=\"button\" [disabled]=\"isConfirmButtondisabled\" (click)=\"confirmPayments()\">\n          Confirm\n        </button>\n        <button type=\"button\" class=\"button govuk-button--secondary\" (click)=\"cancelMarkUnidentifiedPayments()\">\n          Cancel\n        </button>\n      </div>\n    </ng-container>\n      <ng-container *ngIf=\"viewStatus === 'unidentifiedCancelConfirm'\">\n        <input #myInput type='hidden' class='iFrameDrivenImageValue' value='CANCELUNIDENTIFIED'>\n      <div class=\"govuk-warning-text\">\n        <span class=\"govuk-warning-text__icon\" aria-hidden=\"true\">!</span>\n        <strong class=\"govuk-warning-text__text\">\n        <span class=\"govuk-warning-text__assistive\">Warning</span>\n          Are you sure you want to cancel?\n        </strong>\n      </div>\n      <div class=\"govuk-button--group\">\n        <button type=\"submit\" class=\"button\" (click)=\"gotoCasetransationPage()\">\n          Yes\n        </button>\n        <button type=\"button\" class=\"button govuk-button--secondary\" (click)=\"cancelMarkUnidentifiedPayments()\">\n          No\n        </button>\n      </div>\n    </ng-container>\n</div>\n", styles: [".mkpay-unidentified{margin:10px 0 20px}.mkpay-unidentified .govuk-button--group .govuk-button--secondary{margin-left:10px;background-color:#b3b8bdf2}.mkpay-unidentified .inline-error-class{outline:3px solid #a71414;outline-offset:0}.mkpay-unidentified .inline-error-message{color:#a71414;font-weight:700;margin-top:10px}.govuk-grid-column-full{padding:0}.unidentifiedSubText{line-height:45px}.govuk-warning-text__text{font-size:19px}.lowercase{text-transform:lowercase}.capitalize{text-transform:capitalize}\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.PaymentViewService }, { type: i3.PaymentLibComponent }, { type: i4.BulkScaningPaymentService }]; }, { caseType: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyay11bmlkZW50aWZpZWQtcGF5bWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wYXltZW50LWxpYi9zcmMvbGliL2NvbXBvbmVudHMvbWFyay11bmlkZW50aWZpZWQtcGF5bWVudC9tYXJrLXVuaWRlbnRpZmllZC1wYXltZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9tYXJrLXVuaWRlbnRpZmllZC1wYXltZW50L21hcmstdW5pZGVudGlmaWVkLXBheW1lbnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sa0VBQWtFLENBQUM7QUFFM0csT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDM0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUNBQXlDLENBQUM7Ozs7Ozs7OztJQ2lDdkUsNEJBQXlDO0lBQUEsd0VBQXdEO0lBQUEsaUJBQU87OztJQUN4Ryw0QkFBMEM7SUFBQSxvQ0FBb0I7SUFBQSxpQkFBTzs7O0lBQ3JFLDRCQUE2QztJQUFBLHVEQUF1QztJQUFBLGlCQUFPOzs7SUFDM0YsNEJBQTZDO0lBQUEseURBQXlDO0lBQUEsaUJBQU87OztJQUovRiw2QkFBc0s7SUFDcEssOEZBQXdHO0lBQ3hHLDhGQUFx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RTtZQUMxQixJQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxLQUFLLEtBQUcsRUFBRSxFQUFDO2dCQUN4RSxJQUFJLENBQUMsVUFBVSxHQUFHLDJCQUEyQixDQUFDO2FBQy9DO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2FBQy9CO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxHQUFHLG1CQUFtQixDQUFDO1FBQ3hELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzVDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzdDLENBQUM7SUFDRCxlQUFlLENBQUMsWUFBWTtRQUMxQixPQUFPO1lBQ0wsS0FBSyxFQUFFLHFDQUFxQztZQUM1QyxJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLFNBQVMsRUFBRSxZQUFZO1NBQ3hCLENBQUM7SUFDSixDQUFDOzBGQXhMVSxnQ0FBZ0M7NkRBQWhDLGdDQUFnQztZQ2Q3Qyw4QkFBaUM7WUFDL0IsbUZBc0RNO1lBQ0wsb0dBb0NnQjtZQUNiLG9HQWlCYTtZQUNuQixpQkFBTTs7WUE5R0UsZUFBK0I7WUFBL0Isb0RBQStCO1lBdURyQixlQUFrRDtZQUFsRCx1RUFBa0Q7WUFxQy9DLGVBQWdEO1lBQWhELHFFQUFnRDs7O3VGRC9FeEQsZ0NBQWdDO2NBTDVDLFNBQVM7MkJBQ0UsK0JBQStCO3lLQUtoQyxRQUFRO2tCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBheW1lbnRMaWJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9wYXltZW50LWxpYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGF5bWVudFZpZXdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcGF5bWVudC12aWV3L3BheW1lbnQtdmlldy5zZXJ2aWNlJztcbmltcG9ydCB7QnVsa1NjYW5pbmdQYXltZW50U2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvYnVsay1zY2FuaW5nLXBheW1lbnQvYnVsay1zY2FuaW5nLXBheW1lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBJQlNQYXltZW50cyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSUJTUGF5bWVudHMnO1xuaW1wb3J0IHsgVW5pZGVudGlmaWVkUGF5bWVudHNSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9VbmlkZW50aWZpZWRQYXltZW50c1JlcXVlc3QnO1xuaW1wb3J0IHsgQWxsb2NhdGVQYXltZW50UmVxdWVzdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvQWxsb2NhdGVQYXltZW50UmVxdWVzdCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tYXJrLXVuaWRlbnRpZmllZC1wYXltZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hcmstdW5pZGVudGlmaWVkLXBheW1lbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXJrLXVuaWRlbnRpZmllZC1wYXltZW50LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWFya1VuaWRlbnRpZmllZFBheW1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBjYXNlVHlwZTogc3RyaW5nO1xuICBtYXJrUGF5bWVudFVuaWRlbnRpZmllZEZvcm06IEZvcm1Hcm91cDtcbiAgdmlld1N0YXR1czogc3RyaW5nO1xuICBjY2RDYXNlTnVtYmVyOiBzdHJpbmc7XG4gIGJzcGF5bWVudGRjbjogc3RyaW5nO1xuICBpc0ludmVzdGljYXRpb25EZXRhaWxFbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xuICBpbnZlc3RpY2F0aW9uRGV0YWlsSGFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaW52ZXN0aWNhdGlvbkRldGFpbE1pbkhhc0Vycm9yOiBib29sZWFuID0gZmFsc2U7XG4gIGludmVzdGljYXRpb25EZXRhaWxNYXhIYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICBlcnJvck1lc3NhZ2UgPSB0aGlzLmdldEVycm9yTWVzc2FnZShmYWxzZSk7XG4gIHVuYXNzaWduZWRSZWNvcmQ6SUJTUGF5bWVudHM7XG4gIHNpdGVJRDogc3RyaW5nID0gbnVsbDtcbiAgaW52ZXN0aWdhdGlvbkNvbW1lbnQ6IHN0cmluZztcbiAgaXNDb25maXJtQnV0dG9uZGlzYWJsZWQ6Qm9vbGVhbiA9IGZhbHNlO1xuICBjY2RSZWZlcmVuY2U6IHN0cmluZyA9IG51bGw7XG4gIGV4Y2VwdGlvblJlZmVyZW5jZTogc3RyaW5nID0gbnVsbDtcbiAgaXNTdHJhdGVnaWNGaXhFbmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICBwcml2YXRlIHBheW1lbnRWaWV3U2VydmljZTogUGF5bWVudFZpZXdTZXJ2aWNlLFxuICBwcml2YXRlIHBheW1lbnRMaWJDb21wb25lbnQ6IFBheW1lbnRMaWJDb21wb25lbnQsXG4gIHByaXZhdGUgYnVsa1NjYW5pbmdQYXltZW50U2VydmljZTogQnVsa1NjYW5pbmdQYXltZW50U2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52aWV3U3RhdHVzID0gJ21haW5Gb3JtJztcbiAgICB0aGlzLmNjZENhc2VOdW1iZXIgPSB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuQ0NEX0NBU0VfTlVNQkVSO1xuICAgIHRoaXMuYnNwYXltZW50ZGNuID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LmJzcGF5bWVudGRjbjtcbiAgICB0aGlzLmlzU3RyYXRlZ2ljRml4RW5hYmxlID0gdGhpcy5wYXltZW50TGliQ29tcG9uZW50LklTU0ZFTkFCTEU7XG4gICAgdGhpcy5nZXRVbmFzc2lnbmVkUGF5bWVudCgpO1xuXG4gICAgdGhpcy5tYXJrUGF5bWVudFVuaWRlbnRpZmllZEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGludmVzdGljYXRpb25EZXRhaWw6IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoMyksXG4gICAgICAgIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDI1NSksXG4gICAgICAgIFZhbGlkYXRvcnMucGF0dGVybignXihbYS16QS1aMC05XFxcXHMsXFxcXC5dKikkJylcbiAgICAgIF0pKVxuICAgIH0pO1xuICB9XG4gZ2V0VW5hc3NpZ25lZFBheW1lbnQoKSB7XG4gICAgdGhpcy5idWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlLmdldEJTUGF5bWVudHNCeURDTih0aGlzLmJzcGF5bWVudGRjbikuc3Vic2NyaWJlKFxuICAgICAgdW5hc3NpZ25lZFBheW1lbnRzID0+IHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmdldEVycm9yTWVzc2FnZShmYWxzZSk7XG4gICAgICAgIHRoaXMudW5hc3NpZ25lZFJlY29yZCA9IHVuYXNzaWduZWRQYXltZW50c1snZGF0YSddLnBheW1lbnRzLmZpbHRlcihwYXltZW50ID0+IHtcbiAgICAgICAgICByZXR1cm4gcGF5bWVudCAmJiBwYXltZW50LmRjbl9yZWZlcmVuY2UgPT0gdGhpcy5ic3BheW1lbnRkY247XG4gICAgICAgIH0pWzBdO1xuICAgICAgICB0aGlzLnNpdGVJRCA9IHVuYXNzaWduZWRQYXltZW50c1snZGF0YSddLnJlc3BvbnNpYmxlX3NlcnZpY2VfaWQ7XG4gICAgICAgIGNvbnN0IGJlQ2NkTnVtYmVyID0gdW5hc3NpZ25lZFBheW1lbnRzWydkYXRhJ10uY2NkX3JlZmVyZW5jZSxcbiAgICAgICAgICBiZUV4Y2VwdGlvbk51bWJlciA9IHVuYXNzaWduZWRQYXltZW50c1snZGF0YSddLmV4Y2VwdGlvbl9yZWNvcmRfcmVmZXJlbmNlLFxuICAgICAgICAgIGV4Y2VwdGlvblJlZmVyZW5jZSA9IGJlQ2NkTnVtYmVyID8gYmVDY2ROdW1iZXIgPT09IHRoaXMuY2NkQ2FzZU51bWJlciA/IG51bGwgOiB0aGlzLmNjZENhc2VOdW1iZXIgOiB0aGlzLmNjZENhc2VOdW1iZXI7XG4gICAgICAgIHRoaXMuY2NkUmVmZXJlbmNlID0gYmVDY2ROdW1iZXIgPyBiZUNjZE51bWJlciA6IG51bGw7XG4gICAgICAgIHRoaXMuZXhjZXB0aW9uUmVmZXJlbmNlID0gYmVFeGNlcHRpb25OdW1iZXIgPyBiZUV4Y2VwdGlvbk51bWJlciA6IGV4Y2VwdGlvblJlZmVyZW5jZTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZ2V0RXJyb3JNZXNzYWdlKHRydWUpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbiAgdHJpbVVuZGVyc2NvcmUobWV0aG9kOiBzdHJpbmcpe1xuICAgIHJldHVybiB0aGlzLmJ1bGtTY2FuaW5nUGF5bWVudFNlcnZpY2UucmVtb3ZlVW53YW50ZWRTdHJpbmcobWV0aG9kLCcgJyk7XG4gIH1cbiBzYXZlQW5kQ29udGludWUoKSB7XG4gIHRoaXMucmVzZXRGb3JtKFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0pO1xuICBjb25zdCBpbnZlc3RpY2F0aW9uRmllbGQgPSB0aGlzLm1hcmtQYXltZW50VW5pZGVudGlmaWVkRm9ybS5jb250cm9scy5pbnZlc3RpY2F0aW9uRGV0YWlsO1xuICBjb25zdCBmb3JtZXJyb3IgPSBpbnZlc3RpY2F0aW9uRmllbGQuZXJyb3JzO1xuICAgIGlmICh0aGlzLm1hcmtQYXltZW50VW5pZGVudGlmaWVkRm9ybS5kaXJ0eSAmJiB0aGlzLm1hcmtQYXltZW50VW5pZGVudGlmaWVkRm9ybS52YWxpZCkge1xuICAgICAgdGhpcy5pbnZlc3RpZ2F0aW9uQ29tbWVudCA9IHRoaXMubWFya1BheW1lbnRVbmlkZW50aWZpZWRGb3JtLmNvbnRyb2xzLmludmVzdGljYXRpb25EZXRhaWwudmFsdWU7XG4gICAgICB0aGlzLnZpZXdTdGF0dXMgPSAndW5pZGVudGlmaWVkQ29udGludWVDb25maXJtJztcbiAgICB9ZWxzZSB7XG4gICAgICBpZihpbnZlc3RpY2F0aW9uRmllbGQudmFsdWUgPT0gJycgKSB7XG4gICAgICAgIHRoaXMucmVzZXRGb3JtKFt0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSk7XG4gICAgICB9XG4gICAgICBpZihpbnZlc3RpY2F0aW9uRmllbGQudmFsdWUgIT0gJycgJiYgaW52ZXN0aWNhdGlvbkZpZWxkLmludmFsaWQgKSB7XG4gICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlXSk7XG4gICAgICB9XG4gICAgICBpZihmb3JtZXJyb3IgJiYgZm9ybWVycm9yLm1pbmxlbmd0aCAmJiBmb3JtZXJyb3IubWlubGVuZ3RoLmFjdHVhbExlbmd0aCA8IDMgKSB7XG4gICAgICAgIHRoaXMucmVzZXRGb3JtKFtmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlXSk7XG4gICAgICB9XG4gICAgICBpZihmb3JtZXJyb3IgJiYgZm9ybWVycm9yLm1heGxlbmd0aCAmJiBmb3JtZXJyb3IubWF4bGVuZ3RoLmFjdHVhbExlbmd0aCA+IDI1NSApIHtcbiAgICAgICAgdGhpcy5yZXNldEZvcm0oW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWVdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVzZXRGb3JtKHZhbCkge1xuICAgICAgdGhpcy5pc0ludmVzdGljYXRpb25EZXRhaWxFbXB0eSA9IHZhbFswXTtcbiAgICAgIHRoaXMuaW52ZXN0aWNhdGlvbkRldGFpbEhhc0Vycm9yID0gdmFsWzFdO1xuICAgICAgdGhpcy5pbnZlc3RpY2F0aW9uRGV0YWlsTWluSGFzRXJyb3IgPSB2YWxbMl07XG4gICAgICB0aGlzLmludmVzdGljYXRpb25EZXRhaWxNYXhIYXNFcnJvciA9IHZhbFszXTtcbiAgfVxuICBjb25maXJtUGF5bWVudHMoKSB7XG4gICAgdGhpcy5pc0NvbmZpcm1CdXR0b25kaXNhYmxlZCA9IHRydWU7XG4gICAgY29uc3QgcmVhc29uID0gdGhpcy5tYXJrUGF5bWVudFVuaWRlbnRpZmllZEZvcm0uZ2V0KCdpbnZlc3RpY2F0aW9uRGV0YWlsJykudmFsdWU7XG5cbiAgICBpZighdGhpcy5pc1N0cmF0ZWdpY0ZpeEVuYWJsZSkge1xuICAgICAgbGV0IGFsbG9jYXRlZFJlcXVlc3QgPSB7XG4gICAgICAgIGFsbG9jYXRpb25fc3RhdHVzOidVbmlkZW50aWZpZWQnLFxuICAgICAgICBwYXltZW50X2FsbG9jYXRpb25fc3RhdHVzOiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgIG5hbWU6ICdVbmlkZW50aWZpZWQnXG4gICAgICAgIH0sXG4gICAgICAgIHVuaWRlbnRpZmllZF9yZWFzb246IHJlYXNvbixcbiAgICAgICAgdXNlcl9pZDogdGhpcy5jYXNlVHlwZSxcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBvc3RTdHJhdGVnaWNCb2R5ID0gbmV3IEFsbG9jYXRlUGF5bWVudFJlcXVlc3RcbiAgICAgICh0aGlzLmNjZFJlZmVyZW5jZSwgdGhpcy51bmFzc2lnbmVkUmVjb3JkLCB0aGlzLmNhc2VUeXBlLCB0aGlzLmV4Y2VwdGlvblJlZmVyZW5jZSwgYWxsb2NhdGVkUmVxdWVzdCk7XG4gICAgICB0aGlzLmJ1bGtTY2FuaW5nUGF5bWVudFNlcnZpY2UucG9zdEJTV29QR1N0cmF0ZWdpYyhwb3N0U3RyYXRlZ2ljQm9keSkuc3Vic2NyaWJlKFxuICAgICAgICByZXMgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdGhpcy5nZXRFcnJvck1lc3NhZ2UoZmFsc2UpO1xuICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzKTtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuZ290b0Nhc2V0cmFuc2F0aW9uUGFnZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZ2V0RXJyb3JNZXNzYWdlKHRydWUpO1xuICAgICAgICAgIHRoaXMuaXNDb25maXJtQnV0dG9uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmJ1bGtTY2FuaW5nUGF5bWVudFNlcnZpY2UucGF0Y2hCU0NoYW5nZVN0YXR1cyh0aGlzLnVuYXNzaWduZWRSZWNvcmQuZGNuX3JlZmVyZW5jZSwgJ1BST0NFU1NFRCcpLnN1YnNjcmliZShcbiAgICAgICAgICByZXMxID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdGhpcy5nZXRFcnJvck1lc3NhZ2UoZmFsc2UpO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSBuZXcgQWxsb2NhdGVQYXltZW50UmVxdWVzdFxuICAgICAgICAgICAgKHRoaXMuY2NkUmVmZXJlbmNlLCB0aGlzLnVuYXNzaWduZWRSZWNvcmQsIHRoaXMuc2l0ZUlELCB0aGlzLmV4Y2VwdGlvblJlZmVyZW5jZSlcbiAgICAgICAgICAgIHRoaXMucGF5bWVudFZpZXdTZXJ2aWNlLnBvc3RCU1BheW1lbnRzKHJlcXVlc3RCb2R5KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgIHJlczIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdGhpcy5nZXRFcnJvck1lc3NhZ2UoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlMiA9IEpTT04ucGFyc2UocmVzMiksXG4gICAgICAgICAgICAgICAgICByZXFCb2R5ID0gbmV3IFVuaWRlbnRpZmllZFBheW1lbnRzUmVxdWVzdFxuICAgICAgICAgICAgICAgICAgKHJlc3BvbnNlMlsnZGF0YSddLnBheW1lbnRfZ3JvdXBfcmVmZXJlbmNlLCByZXNwb25zZTJbJ2RhdGEnXS5yZWZlcmVuY2UsIHJlYXNvbik7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlMi5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnRWaWV3U2VydmljZS5wb3N0QlNVbmlkZW50aWZpZWRQYXltZW50cyhyZXFCb2R5KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIHJlczMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdGhpcy5nZXRFcnJvck1lc3NhZ2UoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlMyA9IEpTT04ucGFyc2UocmVzMyk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlMy5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdvdG9DYXNldHJhbnNhdGlvblBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWxrU2NhbmluZ1BheW1lbnRTZXJ2aWNlLnBhdGNoQlNDaGFuZ2VTdGF0dXModGhpcy51bmFzc2lnbmVkUmVjb3JkLmRjbl9yZWZlcmVuY2UsICdDT01QTEVURScpLnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdGhpcy5nZXRFcnJvck1lc3NhZ2UodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NvbmZpcm1CdXR0b25kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGtTY2FuaW5nUGF5bWVudFNlcnZpY2UucGF0Y2hCU0NoYW5nZVN0YXR1cyh0aGlzLnVuYXNzaWduZWRSZWNvcmQuZGNuX3JlZmVyZW5jZSwgJ0NPTVBMRVRFJykuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmdldEVycm9yTWVzc2FnZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ29uZmlybUJ1dHRvbmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmdldEVycm9yTWVzc2FnZSh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuaXNDb25maXJtQnV0dG9uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gIH1cbiAgY2FuY2VsTWFya1VuaWRlbnRpZmllZFBheW1lbnRzKHR5cGU/OnN0cmluZyl7XG4gICAgaWYodHlwZSAmJiB0eXBlID09PSAnY2FuY2VsJykge1xuICAgICAgICBpZih0aGlzLm1hcmtQYXltZW50VW5pZGVudGlmaWVkRm9ybS5nZXQoJ2ludmVzdGljYXRpb25EZXRhaWwnKS52YWx1ZSE9PVwiXCIpe1xuICAgICAgICAgIHRoaXMudmlld1N0YXR1cyA9ICd1bmlkZW50aWZpZWRDYW5jZWxDb25maXJtJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmdvdG9DYXNldHJhbnNhdGlvblBhZ2UoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdTdGF0dXMgPSAnbWFpbkZvcm0nO1xuICAgIH1cbiAgfVxuXG4gIGdvdG9DYXNldHJhbnNhdGlvblBhZ2UoKSB7XG4gICAgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnZpZXdOYW1lID0gJ2Nhc2UtdHJhbnNhY3Rpb25zJztcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuVEFLRVBBWU1FTlQgPSB0cnVlO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5JU0JTRU5BQkxFID0gdHJ1ZTtcbiAgfVxuICBnZXRFcnJvck1lc3NhZ2UoaXNFcnJvckV4aXN0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiBcIlRoZXJlIGlzIGEgcHJvYmxlbSB3aXRoIHRoZSBzZXJ2aWNlXCIsXG4gICAgICBib2R5OiBcIlRyeSBhZ2FpbiBsYXRlclwiLFxuICAgICAgc2hvd0Vycm9yOiBpc0Vycm9yRXhpc3RcbiAgICB9O1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibWtwYXktdW5pZGVudGlmaWVkXCIgPlxuICA8ZGl2ICpuZ0lmPVwidmlld1N0YXR1cyA9PT0gJ21haW5Gb3JtJ1wiPlxuICAgIDxpbnB1dCAjbXlJbnB1dCAgdHlwZT0naGlkZGVuJyBjbGFzcz0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J01BUktVTklERU5USUZJRUQnPlxuICAgIDxoMSBjbGFzcz1cImhlYWRpbmctbGFyZ2VcIj5NYXJrIHBheW1lbnQgYXMgdW5pZGVudGlmaWVkPC9oMT5cblxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLWNvbHVtbi1mdWxsIGdvdnVrLSEtcGFkZGluZy1ib3R0b20tM1wiPlxuICAgICAgPGhyIGNsYXNzPVwiZ292dWstc2VjdGlvbi1icmVhayBnb3Z1ay1zZWN0aW9uLWJyZWFrLS12aXNpYmxlXCI+XG4gICAgICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZVwiPlxuICAgICAgICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5QYXltZW50IGFzc2V0IG51bWJlciAoRENOKTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5CYW5rZWQgZGF0ZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5BbW91bnQ8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+TWV0aG9kPC90ZD5cbiAgICAgICAgICAgXG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57e3VuYXNzaWduZWRSZWNvcmQuZGNuX3JlZmVyZW5jZX19PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+IHt7dW5hc3NpZ25lZFJlY29yZC5kYXRlX2JhbmtlZCB8IGRhdGU6J2RkIE1NTSB5eXl5J319PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+IHt7dW5hc3NpZ25lZFJlY29yZC5hbW91bnQgfCBjdXJyZW5jeSA6J0dCUCc6J3N5bWJvbCc6JzEuMi0yJ319PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNhcGl0YWxpemUgZ292dWstdGFibGVfX2NlbGxcIj4ge3t0cmltVW5kZXJzY29yZSh1bmFzc2lnbmVkUmVjb3JkLnBheW1lbnRfbWV0aG9kKSB8IGxvd2VyY2FzZX19ICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90Ym9keT5cbiAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuICAgIDxmb3JtIFtmb3JtR3JvdXBdPVwibWFya1BheW1lbnRVbmlkZW50aWZpZWRGb3JtXCIgbm92YWxpZGF0ZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCI+XG4gICAgICAgIDxwIGNsYXNzPVwidW5pZGVudGlmaWVkU3ViVGV4dFwiPlxuICAgICAgICAgIEdpdmUgYSByZWFzb24gZm9yIG1hcmtpbmcgdGhpcyBwYXltZW50IGFzIHVuaWRlbnRpZmllZC5cbiAgICAgICAgICA8YnIvPlxuICAgICAgICAgIEluY2x1ZGUgYW55IGludmVzdGlnYXRpb25zIHlvdSd2ZSBtYWRlLlxuICAgICAgICA8L3A+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImhlYWRpbmctc21hbGxcIiBmb3I9XCJpbnZlc3RpY2F0aW9uRGV0YWlsXCI+XG5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC0zLTRcIiBbbmdDbGFzc109XCJ7J2lubGluZS1lcnJvci1jbGFzcyc6IGlzSW52ZXN0aWNhdGlvbkRldGFpbEVtcHR5IHx8IGludmVzdGljYXRpb25EZXRhaWxIYXNFcnJvciB8fCBpbnZlc3RpY2F0aW9uRGV0YWlsTWluSGFzRXJyb3IgfHwgaW52ZXN0aWNhdGlvbkRldGFpbE1heEhhc0Vycm9yfVwiIG5hbWU9XCJpbnZlc3RpY2F0aW9uRGV0YWlsXCIgaWQ9XCJpbnZlc3RpY2F0aW9uRGV0YWlsXCIgcm93cz1cIjVcIiBmb3JtQ29udHJvbE5hbWU9XCJpbnZlc3RpY2F0aW9uRGV0YWlsXCI+XG4gICAgICAgIDwvdGV4dGFyZWE+XG4gICAgICAgIDxwIGNsYXNzPVwiaW5saW5lLWVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImlzSW52ZXN0aWNhdGlvbkRldGFpbEVtcHR5IHx8IGludmVzdGljYXRpb25EZXRhaWxIYXNFcnJvciB8fCBpbnZlc3RpY2F0aW9uRGV0YWlsTWluSGFzRXJyb3IgfHwgaW52ZXN0aWNhdGlvbkRldGFpbE1heEhhc0Vycm9yXCI+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc0ludmVzdGljYXRpb25EZXRhaWxFbXB0eVwiPkVudGVyIGEgcmVhc29uIGZvciBtYXJraW5nIHRoaXMgcGF5bWVudCBhcyB1bmlkZW50aWZpZWQuPC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaW52ZXN0aWNhdGlvbkRldGFpbEhhc0Vycm9yXCI+RW50ZXIgYSB2YWlsZCByZWFzb248L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJpbnZlc3RpY2F0aW9uRGV0YWlsTWluSGFzRXJyb3JcIj5SZWFzb24gc2hvdWxkIGJlIGF0IGxlYXN0IDMgY2hhcmFjdGVycy48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJpbnZlc3RpY2F0aW9uRGV0YWlsTWF4SGFzRXJyb3JcIj5SZWFzb24gc2hvdWxkIGJlIDI1NSBjaGFyYWN0ZXJzIG9yIHVuZGVyLjwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLS1ncm91cFwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvblwiIChjbGljayk9XCJzYXZlQW5kQ29udGludWUoKVwiPlxuICAgICAgICAgIENvbnRpbnVlXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiIChjbGljayk9XCJjYW5jZWxNYXJrVW5pZGVudGlmaWVkUGF5bWVudHMoJ2NhbmNlbCcpXCI+XG4gICAgICAgICAgQ2FuY2VsXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9mb3JtPlxuICA8L2Rpdj5cbiAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3U3RhdHVzID09PSAndW5pZGVudGlmaWVkQ29udGludWVDb25maXJtJ1wiPlxuICAgICAgPGNjcGF5LWVycm9yLWJhbm5lciAqbmdJZj1cImVycm9yTWVzc2FnZS5zaG93RXJyb3JcIiBbZXJyb3JNZXNzYWdlXT1cImVycm9yTWVzc2FnZVwiPjwvY2NwYXktZXJyb3ItYmFubmVyPlxuICAgICAgPGlucHV0ICNteUlucHV0IHR5cGU9J2hpZGRlbicgY2xhc3M9J2lGcmFtZURyaXZlbkltYWdlVmFsdWUnIHZhbHVlPSdVTklERU5USUZJRURDT05GSVJNQVRJT04nPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dF9faWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiE8L3NwYW4+XG4gICAgICAgIDxzdHJvbmcgY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRfX3RleHRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay13YXJuaW5nLXRleHRfX2Fzc2lzdGl2ZVwiPldhcm5pbmc8L3NwYW4+XG4gICAgICAgIDxoMSBjbGFzcz1cImhlYWRpbmctc21hbGxcIj4gQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIG1hcmsgdGhpcyBwYXltZW50IGFzIHVuaWRlbnRpZmllZD8gPC9oMT5cbiAgICAgICAgIFxuICAgICAgICA8L3N0cm9uZz5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tZnVsbCBnb3Z1ay0hLXBhZGRpbmctYm90dG9tLTNcIj5cbiAgICAgICAgICA8aHIgY2xhc3M9XCJnb3Z1ay1zZWN0aW9uLWJyZWFrIGdvdnVrLXNlY3Rpb24tYnJlYWstLXZpc2libGVcIj5cbiAgICAgICAgICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZVwiPlxuICAgICAgICAgICAgPHRoZWFkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+SW52ZXN0aWdhdGlvbnM8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiPlxuICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57e2ludmVzdGlnYXRpb25Db21tZW50fX08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi0tZ3JvdXBcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b25cIiBbZGlzYWJsZWRdPVwiaXNDb25maXJtQnV0dG9uZGlzYWJsZWRcIiAoY2xpY2spPVwiY29uZmlybVBheW1lbnRzKClcIj5cbiAgICAgICAgICBDb25maXJtXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiIChjbGljayk9XCJjYW5jZWxNYXJrVW5pZGVudGlmaWVkUGF5bWVudHMoKVwiPlxuICAgICAgICAgIENhbmNlbFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdTdGF0dXMgPT09ICd1bmlkZW50aWZpZWRDYW5jZWxDb25maXJtJ1wiPlxuICAgICAgICA8aW5wdXQgI215SW5wdXQgdHlwZT0naGlkZGVuJyBjbGFzcz0naUZyYW1lRHJpdmVuSW1hZ2VWYWx1ZScgdmFsdWU9J0NBTkNFTFVOSURFTlRJRklFRCc+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0X19pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+ITwvc3Bhbj5cbiAgICAgICAgPHN0cm9uZyBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dF9fdGV4dFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dF9fYXNzaXN0aXZlXCI+V2FybmluZzwvc3Bhbj5cbiAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2FuY2VsP1xuICAgICAgICA8L3N0cm9uZz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi0tZ3JvdXBcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b25cIiAoY2xpY2spPVwiZ290b0Nhc2V0cmFuc2F0aW9uUGFnZSgpXCI+XG4gICAgICAgICAgWWVzXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBnb3Z1ay1idXR0b24tLXNlY29uZGFyeVwiIChjbGljayk9XCJjYW5jZWxNYXJrVW5pZGVudGlmaWVkUGF5bWVudHMoKVwiPlxuICAgICAgICAgIE5vXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbiJdfQ==