import { Component } from '@angular/core';
import { PaymentListService } from '../../services/payment-list/payment-list.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import * as i0 from "@angular/core";
import * as i1 from "../../services/payment-list/payment-list.service";
import * as i2 from "../../payment-lib.component";
import * as i3 from "@angular/common";
function PaymentListComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 2)(2, "h2", 3);
    i0.ɵɵtext(3, " Payments list could not be retrieved ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 4);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.errorMessage, " ");
} }
function PaymentListComponent_div_2_tr_17_td_18_div_5_div_1_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1, " Payment rejected due to payment method selected or payment information entered, for example, failed fraud check, a 3D Secure authentication failure, or the user does not have enough money in account ");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_div_2_tr_17_td_18_div_5_div_1_p_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1, " Payment was not confirmed and completed within 90 minutes of being created ");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_div_2_tr_17_td_18_div_5_div_1_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1, " User clicked on the \u201CCancel payment\u201D button during the payment journey ");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_div_2_tr_17_td_18_div_5_div_1_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1, " Multiple possible causes, for example a configuration problem with the payment provider, or incorrect login credentials ");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_div_2_tr_17_td_18_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, PaymentListComponent_div_2_tr_17_td_18_div_5_div_1_p_1_Template, 2, 0, "p", 10);
    i0.ɵɵtemplate(2, PaymentListComponent_div_2_tr_17_td_18_div_5_div_1_p_2_Template, 2, 0, "p", 10);
    i0.ɵɵtemplate(3, PaymentListComponent_div_2_tr_17_td_18_div_5_div_1_p_3_Template, 2, 0, "p", 10);
    i0.ɵɵtemplate(4, PaymentListComponent_div_2_tr_17_td_18_div_5_div_1_p_4_Template, 2, 0, "p", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const statusHistory_r9 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", statusHistory_r9.error_code === "P0010");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", statusHistory_r9.error_code === "P0020");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", statusHistory_r9.error_code === "P0030");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", statusHistory_r9.error_code === "P0050");
} }
function PaymentListComponent_div_2_tr_17_td_18_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵtemplate(1, PaymentListComponent_div_2_tr_17_td_18_div_5_div_1_Template, 5, 4, "div", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const payment_r3 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", payment_r3.status_histories);
} }
function PaymentListComponent_div_2_tr_17_td_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td")(1, "details")(2, "summary")(3, "span", 11);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(5, PaymentListComponent_div_2_tr_17_td_18_div_5_Template, 2, 1, "div", 12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const payment_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(payment_r3.status);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", payment_r3.status === "Failed");
} }
function PaymentListComponent_div_2_tr_17_td_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const payment_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", payment_r3.status, " ");
} }
function PaymentListComponent_div_2_tr_17_td_20_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13)(1, "p", 8);
    i0.ɵɵtext(2, "This means the transaction is being processed by Liberata.");
    i0.ɵɵelementEnd()();
} }
function PaymentListComponent_div_2_tr_17_td_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td")(1, "details")(2, "summary")(3, "span", 11);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(5, PaymentListComponent_div_2_tr_17_td_20_div_5_Template, 3, 0, "div", 12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const payment_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(payment_r3.status);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", payment_r3.status === "Pending");
} }
function PaymentListComponent_div_2_tr_17_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td", 8)(2, "a", 9);
    i0.ɵɵlistener("click", function PaymentListComponent_div_2_tr_17_Template_a_click_2_listener() { const restoredCtx = i0.ɵɵrestoreView(_r20); const payment_r3 = restoredCtx.$implicit; const ctx_r19 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r19.loadPaymentViewComponent(payment_r3.payment_group_reference, payment_r3.payment_reference, payment_r3.method)); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td", 8);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 8);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 8);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "titlecase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 8);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "titlecase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 8);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, PaymentListComponent_div_2_tr_17_td_18_Template, 6, 2, "td", 1);
    i0.ɵɵtemplate(19, PaymentListComponent_div_2_tr_17_td_19_Template, 2, 1, "td", 10);
    i0.ɵɵtemplate(20, PaymentListComponent_div_2_tr_17_td_20_Template, 6, 2, "td", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const payment_r3 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(payment_r3.payment_group_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(payment_r3.payment_reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 9, payment_r3.date_created, "dd MMM yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 12, payment_r3.channel));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 14, payment_r3.method));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\u00A3", i0.ɵɵpipeBind2(17, 16, payment_r3.amount, ".2"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", payment_r3.method === "card" && payment_r3.channel === "online");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", payment_r3.method === "card" && payment_r3.channel === "telephony");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", payment_r3.method === "payment by account");
} }
function PaymentListComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "table", 5)(2, "tr")(3, "th", 6);
    i0.ɵɵtext(4, "Payment group reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th", 6);
    i0.ɵɵtext(6, "Payment reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 6);
    i0.ɵɵtext(8, "Date created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 6);
    i0.ɵɵtext(10, "Channel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 6);
    i0.ɵɵtext(12, "Method");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 6);
    i0.ɵɵtext(14, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th", 6);
    i0.ɵɵtext(16, "Status");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(17, PaymentListComponent_div_2_tr_17_Template, 21, 19, "tr", 7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("ngForOf", ctx_r1.payments.payments);
} }
export class PaymentListComponent {
    paymentListService;
    paymentLibComponent;
    payments;
    errorMessage;
    code;
    constructor(paymentListService, paymentLibComponent) {
        this.paymentListService = paymentListService;
        this.paymentLibComponent = paymentLibComponent;
    }
    ngOnInit() {
        this.paymentListService.getPaymentByCcdCaseNumber(this.paymentLibComponent.CCD_CASE_NUMBER, this.paymentLibComponent.PAYMENT_METHOD)
            .subscribe(payments => this.payments = payments, (error) => this.errorMessage = error);
    }
    loadPaymentViewComponent(paymentGroupReference, paymentReference, paymentMethod) {
        this.paymentLibComponent.paymentMethod = paymentMethod;
        this.paymentLibComponent.paymentGroupReference = paymentGroupReference;
        this.paymentLibComponent.paymentReference = paymentReference;
        this.paymentLibComponent.viewName = 'payment-view';
    }
    static ɵfac = function PaymentListComponent_Factory(t) { return new (t || PaymentListComponent)(i0.ɵɵdirectiveInject(i1.PaymentListService), i0.ɵɵdirectiveInject(i2.PaymentLibComponent)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PaymentListComponent, selectors: [["ccpay-payment-list"]], decls: 3, vars: 2, consts: [[1, "govuk-width-container"], [4, "ngIf"], ["role", "group", "aria-labelledby", "failure-error-summary-heading", "tabindex", "-1", 1, "error-summary"], ["id", "failure-error-summary-heading", 1, "heading-medium", "error-summary-heading"], [1, "govuk-error-summary__body"], [1, "table"], [1, "bold", "font-xsmall"], [4, "ngFor", "ngForOf"], [1, "font-xsmall"], ["href", "javascript:void(0)", 3, "click"], ["class", "font-xsmall", 4, "ngIf"], [1, "summary", "font-xsmall"], ["class", "panel panel-border-narrow", 4, "ngIf"], [1, "panel", "panel-border-narrow"]], template: function PaymentListComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, PaymentListComponent_div_1_Template, 6, 1, "div", 1);
            i0.ɵɵtemplate(2, PaymentListComponent_div_2_Template, 18, 1, "div", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.errorMessage && ctx.payments);
        } }, dependencies: [i3.NgForOf, i3.NgIf, i3.DecimalPipe, i3.TitleCasePipe, i3.DatePipe] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaymentListComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-payment-list', template: "<div class=\"govuk-width-container\">\n\n  <div *ngIf=\"errorMessage\">\n    <div class=\"error-summary\" role=\"group\" aria-labelledby=\"failure-error-summary-heading\" tabindex=\"-1\">\n      <h2 class=\"heading-medium error-summary-heading\" id=\"failure-error-summary-heading\">\n        Payments list could not be retrieved\n      </h2>\n      <div class=\"govuk-error-summary__body\">\n        {{ errorMessage }}\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"!errorMessage && payments\">\n\n    <table class=\"table\">\n      <tr>\n        <th class=\"bold font-xsmall\">Payment group reference</th>\n        <th class=\"bold font-xsmall\">Payment reference</th>\n        <th class=\"bold font-xsmall\">Date created</th>\n        <th class=\"bold font-xsmall\">Channel</th>\n        <th class=\"bold font-xsmall\">Method</th>\n        <th class=\"bold font-xsmall\">Amount</th>\n        <th class=\"bold font-xsmall\">Status</th>\n      </tr>\n      <tr *ngFor=\"let payment of payments.payments\">\n        <td class=\"font-xsmall\">\n          <a href=\"javascript:void(0)\" (click)=\"loadPaymentViewComponent(payment.payment_group_reference, payment.payment_reference, payment.method)\">{{ payment.payment_group_reference }}</a>\n        <td class=\"font-xsmall\">{{ payment.payment_reference }}</td>\n        <td class=\"font-xsmall\">{{ payment.date_created | date:'dd MMM yyyy' }}</td>\n        <td class=\"font-xsmall\">{{ payment.channel | titlecase }}</td>\n        <td class=\"font-xsmall\">{{ payment.method | titlecase }}</td>\n        <td class=\"font-xsmall\">\u00A3{{ payment.amount | number:'.2' }}</td>\n        <td *ngIf=\"payment.method === 'card' && payment.channel === 'online'\">\n          <details>\n            <summary><span class=\"summary font-xsmall\">{{ payment.status }}</span></summary>\n            <div class=\"panel panel-border-narrow\" *ngIf=\"payment.status === 'Failed'\">\n              <div *ngFor=\"let statusHistory of payment.status_histories\">\n                <p class=\"font-xsmall\" *ngIf=\"statusHistory.error_code === 'P0010'\">\n                  Payment rejected due to payment method selected or payment information entered, for example, failed fraud check, a 3D Secure authentication failure, or the user does not have enough money in account\n                </p>\n                <p class=\"font-xsmall\" *ngIf=\"statusHistory.error_code === 'P0020'\">\n                  Payment was not confirmed and completed within 90 minutes of being created\n                </p>\n                <p class=\"font-xsmall\" *ngIf=\"statusHistory.error_code === 'P0030'\">\n                  User clicked on the \u201CCancel payment\u201D button during the payment journey\n                </p>\n                <p class=\"font-xsmall\" *ngIf=\"statusHistory.error_code === 'P0050'\">\n                  Multiple possible causes, for example a configuration problem with the payment provider, or incorrect login credentials\n                </p>\n              </div>\n            </div>\n          </details>\n        </td>\n        <td *ngIf=\"payment.method === 'card' && payment.channel === 'telephony'\" class=\"font-xsmall\">\n          {{ payment.status}}\n        </td>\n        <td *ngIf=\"payment.method === 'payment by account'\">\n          <details>\n            <summary><span class=\"summary font-xsmall\">{{ payment.status }}</span></summary>\n            <div class=\"panel panel-border-narrow\" *ngIf=\"payment.status === 'Pending'\">\n              <p class=\"font-xsmall\">This means the transaction is being processed by Liberata.</p>\n            </div>\n          </details>\n        </td>\n      </tr>\n    </table>\n\n  </div>\n\n</div>\n" }]
    }], function () { return [{ type: i1.PaymentListService }, { type: i2.PaymentLibComponent }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9wYXltZW50LWxpc3QvcGF5bWVudC1saXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9wYXltZW50LWxpc3QvcGF5bWVudC1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFFaEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFFcEYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7Ozs7OztJQ0Y5RCwyQkFBMEIsYUFBQSxZQUFBO0lBR3BCLHNEQUNGO0lBQUEsaUJBQUs7SUFDTCw4QkFBdUM7SUFDckMsWUFDRjtJQUFBLGlCQUFNLEVBQUEsRUFBQTs7O0lBREosZUFDRjtJQURFLG9EQUNGOzs7SUE2QlUsNEJBQW9FO0lBQ2xFLHdOQUNGO0lBQUEsaUJBQUk7OztJQUNKLDRCQUFvRTtJQUNsRSw0RkFDRjtJQUFBLGlCQUFJOzs7SUFDSiw0QkFBb0U7SUFDbEUsa0dBQ0Y7SUFBQSxpQkFBSTs7O0lBQ0osNEJBQW9FO0lBQ2xFLHlJQUNGO0lBQUEsaUJBQUk7OztJQVpOLDJCQUE0RDtJQUMxRCxnR0FFSTtJQUNKLGdHQUVJO0lBQ0osZ0dBRUk7SUFDSixnR0FFSTtJQUNOLGlCQUFNOzs7SUFab0IsZUFBMEM7SUFBMUMsOERBQTBDO0lBRzFDLGVBQTBDO0lBQTFDLDhEQUEwQztJQUcxQyxlQUEwQztJQUExQyw4REFBMEM7SUFHMUMsZUFBMEM7SUFBMUMsOERBQTBDOzs7SUFYdEUsK0JBQTJFO0lBQ3pFLDZGQWFNO0lBQ1Is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LGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDdkQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO1FBQ3ZFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUM3RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztJQUNyRCxDQUFDOzhFQXRCVSxvQkFBb0I7NkRBQXBCLG9CQUFvQjtZQ1pqQyw4QkFBbUM7WUFFakMscUVBU007WUFFTixzRUF1RE07WUFFUixpQkFBTTs7WUFwRUUsZUFBa0I7WUFBbEIsdUNBQWtCO1lBV2xCLGVBQStCO1lBQS9CLHdEQUErQjs7O3VGREQxQixvQkFBb0I7Y0FMaEMsU0FBUzsyQkFDRSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtQYXltZW50TGlzdFNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BheW1lbnQtbGlzdC9wYXltZW50LWxpc3Quc2VydmljZSc7XG5pbXBvcnQge0lQYXltZW50c30gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUGF5bWVudHMnO1xuaW1wb3J0IHtQYXltZW50TGliQ29tcG9uZW50fSBmcm9tICcuLi8uLi9wYXltZW50LWxpYi5jb21wb25lbnQnO1xuaW1wb3J0IHtJU3RhdHVzSGlzdG9yeX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JU3RhdHVzSGlzdG9yeSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjcGF5LXBheW1lbnQtbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYXltZW50LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wYXltZW50LWxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBheW1lbnRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcGF5bWVudHM6IElQYXltZW50cztcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBheW1lbnRMaXN0U2VydmljZTogUGF5bWVudExpc3RTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHBheW1lbnRMaWJDb21wb25lbnQ6IFBheW1lbnRMaWJDb21wb25lbnQpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGF5bWVudExpc3RTZXJ2aWNlLmdldFBheW1lbnRCeUNjZENhc2VOdW1iZXIodGhpcy5wYXltZW50TGliQ29tcG9uZW50LkNDRF9DQVNFX05VTUJFUiwgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LlBBWU1FTlRfTUVUSE9EKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgcGF5bWVudHMgPT4gdGhpcy5wYXltZW50cyA9IHBheW1lbnRzLFxuICAgICAgICAoZXJyb3I6IGFueSkgPT4gdGhpcy5lcnJvck1lc3NhZ2UgPSA8YW55PmVycm9yXG4gICAgICApO1xuICB9XG5cbiAgbG9hZFBheW1lbnRWaWV3Q29tcG9uZW50KHBheW1lbnRHcm91cFJlZmVyZW5jZTogc3RyaW5nLCBwYXltZW50UmVmZXJlbmNlOiBzdHJpbmcsIHBheW1lbnRNZXRob2Q6IHN0cmluZykge1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5wYXltZW50TWV0aG9kID0gcGF5bWVudE1ldGhvZDtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQucGF5bWVudEdyb3VwUmVmZXJlbmNlID0gcGF5bWVudEdyb3VwUmVmZXJlbmNlO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5wYXltZW50UmVmZXJlbmNlID0gcGF5bWVudFJlZmVyZW5jZTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWUgPSAncGF5bWVudC12aWV3JztcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImdvdnVrLXdpZHRoLWNvbnRhaW5lclwiPlxuXG4gIDxkaXYgKm5nSWY9XCJlcnJvck1lc3NhZ2VcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZXJyb3Itc3VtbWFyeVwiIHJvbGU9XCJncm91cFwiIGFyaWEtbGFiZWxsZWRieT1cImZhaWx1cmUtZXJyb3Itc3VtbWFyeS1oZWFkaW5nXCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgPGgyIGNsYXNzPVwiaGVhZGluZy1tZWRpdW0gZXJyb3Itc3VtbWFyeS1oZWFkaW5nXCIgaWQ9XCJmYWlsdXJlLWVycm9yLXN1bW1hcnktaGVhZGluZ1wiPlxuICAgICAgICBQYXltZW50cyBsaXN0IGNvdWxkIG5vdCBiZSByZXRyaWV2ZWRcbiAgICAgIDwvaDI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fYm9keVwiPlxuICAgICAgICB7eyBlcnJvck1lc3NhZ2UgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2ICpuZ0lmPVwiIWVycm9yTWVzc2FnZSAmJiBwYXltZW50c1wiPlxuXG4gICAgPHRhYmxlIGNsYXNzPVwidGFibGVcIj5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRoIGNsYXNzPVwiYm9sZCBmb250LXhzbWFsbFwiPlBheW1lbnQgZ3JvdXAgcmVmZXJlbmNlPC90aD5cbiAgICAgICAgPHRoIGNsYXNzPVwiYm9sZCBmb250LXhzbWFsbFwiPlBheW1lbnQgcmVmZXJlbmNlPC90aD5cbiAgICAgICAgPHRoIGNsYXNzPVwiYm9sZCBmb250LXhzbWFsbFwiPkRhdGUgY3JlYXRlZDwvdGg+XG4gICAgICAgIDx0aCBjbGFzcz1cImJvbGQgZm9udC14c21hbGxcIj5DaGFubmVsPC90aD5cbiAgICAgICAgPHRoIGNsYXNzPVwiYm9sZCBmb250LXhzbWFsbFwiPk1ldGhvZDwvdGg+XG4gICAgICAgIDx0aCBjbGFzcz1cImJvbGQgZm9udC14c21hbGxcIj5BbW91bnQ8L3RoPlxuICAgICAgICA8dGggY2xhc3M9XCJib2xkIGZvbnQteHNtYWxsXCI+U3RhdHVzPC90aD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgKm5nRm9yPVwibGV0IHBheW1lbnQgb2YgcGF5bWVudHMucGF5bWVudHNcIj5cbiAgICAgICAgPHRkIGNsYXNzPVwiZm9udC14c21hbGxcIj5cbiAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cImxvYWRQYXltZW50Vmlld0NvbXBvbmVudChwYXltZW50LnBheW1lbnRfZ3JvdXBfcmVmZXJlbmNlLCBwYXltZW50LnBheW1lbnRfcmVmZXJlbmNlLCBwYXltZW50Lm1ldGhvZClcIj57eyBwYXltZW50LnBheW1lbnRfZ3JvdXBfcmVmZXJlbmNlIH19PC9hPlxuICAgICAgICA8dGQgY2xhc3M9XCJmb250LXhzbWFsbFwiPnt7IHBheW1lbnQucGF5bWVudF9yZWZlcmVuY2UgfX08L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJmb250LXhzbWFsbFwiPnt7IHBheW1lbnQuZGF0ZV9jcmVhdGVkIHwgZGF0ZTonZGQgTU1NIHl5eXknIH19PC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwiZm9udC14c21hbGxcIj57eyBwYXltZW50LmNoYW5uZWwgfCB0aXRsZWNhc2UgfX08L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJmb250LXhzbWFsbFwiPnt7IHBheW1lbnQubWV0aG9kIHwgdGl0bGVjYXNlIH19PC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwiZm9udC14c21hbGxcIj7Co3t7IHBheW1lbnQuYW1vdW50IHwgbnVtYmVyOicuMicgfX08L3RkPlxuICAgICAgICA8dGQgKm5nSWY9XCJwYXltZW50Lm1ldGhvZCA9PT0gJ2NhcmQnICYmIHBheW1lbnQuY2hhbm5lbCA9PT0gJ29ubGluZSdcIj5cbiAgICAgICAgICA8ZGV0YWlscz5cbiAgICAgICAgICAgIDxzdW1tYXJ5PjxzcGFuIGNsYXNzPVwic3VtbWFyeSBmb250LXhzbWFsbFwiPnt7IHBheW1lbnQuc3RhdHVzIH19PC9zcGFuPjwvc3VtbWFyeT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1ib3JkZXItbmFycm93XCIgKm5nSWY9XCJwYXltZW50LnN0YXR1cyA9PT0gJ0ZhaWxlZCdcIj5cbiAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgc3RhdHVzSGlzdG9yeSBvZiBwYXltZW50LnN0YXR1c19oaXN0b3JpZXNcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImZvbnQteHNtYWxsXCIgKm5nSWY9XCJzdGF0dXNIaXN0b3J5LmVycm9yX2NvZGUgPT09ICdQMDAxMCdcIj5cbiAgICAgICAgICAgICAgICAgIFBheW1lbnQgcmVqZWN0ZWQgZHVlIHRvIHBheW1lbnQgbWV0aG9kIHNlbGVjdGVkIG9yIHBheW1lbnQgaW5mb3JtYXRpb24gZW50ZXJlZCwgZm9yIGV4YW1wbGUsIGZhaWxlZCBmcmF1ZCBjaGVjaywgYSAzRCBTZWN1cmUgYXV0aGVudGljYXRpb24gZmFpbHVyZSwgb3IgdGhlIHVzZXIgZG9lcyBub3QgaGF2ZSBlbm91Z2ggbW9uZXkgaW4gYWNjb3VudFxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImZvbnQteHNtYWxsXCIgKm5nSWY9XCJzdGF0dXNIaXN0b3J5LmVycm9yX2NvZGUgPT09ICdQMDAyMCdcIj5cbiAgICAgICAgICAgICAgICAgIFBheW1lbnQgd2FzIG5vdCBjb25maXJtZWQgYW5kIGNvbXBsZXRlZCB3aXRoaW4gOTAgbWludXRlcyBvZiBiZWluZyBjcmVhdGVkXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiZm9udC14c21hbGxcIiAqbmdJZj1cInN0YXR1c0hpc3RvcnkuZXJyb3JfY29kZSA9PT0gJ1AwMDMwJ1wiPlxuICAgICAgICAgICAgICAgICAgVXNlciBjbGlja2VkIG9uIHRoZSDigJxDYW5jZWwgcGF5bWVudOKAnSBidXR0b24gZHVyaW5nIHRoZSBwYXltZW50IGpvdXJuZXlcbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJmb250LXhzbWFsbFwiICpuZ0lmPVwic3RhdHVzSGlzdG9yeS5lcnJvcl9jb2RlID09PSAnUDAwNTAnXCI+XG4gICAgICAgICAgICAgICAgICBNdWx0aXBsZSBwb3NzaWJsZSBjYXVzZXMsIGZvciBleGFtcGxlIGEgY29uZmlndXJhdGlvbiBwcm9ibGVtIHdpdGggdGhlIHBheW1lbnQgcHJvdmlkZXIsIG9yIGluY29ycmVjdCBsb2dpbiBjcmVkZW50aWFsc1xuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgIDwvdGQ+XG4gICAgICAgIDx0ZCAqbmdJZj1cInBheW1lbnQubWV0aG9kID09PSAnY2FyZCcgJiYgcGF5bWVudC5jaGFubmVsID09PSAndGVsZXBob255J1wiIGNsYXNzPVwiZm9udC14c21hbGxcIj5cbiAgICAgICAgICB7eyBwYXltZW50LnN0YXR1c319XG4gICAgICAgIDwvdGQ+XG4gICAgICAgIDx0ZCAqbmdJZj1cInBheW1lbnQubWV0aG9kID09PSAncGF5bWVudCBieSBhY2NvdW50J1wiPlxuICAgICAgICAgIDxkZXRhaWxzPlxuICAgICAgICAgICAgPHN1bW1hcnk+PHNwYW4gY2xhc3M9XCJzdW1tYXJ5IGZvbnQteHNtYWxsXCI+e3sgcGF5bWVudC5zdGF0dXMgfX08L3NwYW4+PC9zdW1tYXJ5PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWJvcmRlci1uYXJyb3dcIiAqbmdJZj1cInBheW1lbnQuc3RhdHVzID09PSAnUGVuZGluZydcIj5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJmb250LXhzbWFsbFwiPlRoaXMgbWVhbnMgdGhlIHRyYW5zYWN0aW9uIGlzIGJlaW5nIHByb2Nlc3NlZCBieSBMaWJlcmF0YS48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGFibGU+XG5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuIl19