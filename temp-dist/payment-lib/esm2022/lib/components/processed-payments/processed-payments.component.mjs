import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../services/bulk-scaning-payment/bulk-scaning-payment.service";
import * as i3 from "@angular/common";
function ProcessedPaymentsComponent_tr_17_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 4)(1, "td", 9)(2, "a", 10);
    i0.ɵɵlistener("click", function ProcessedPaymentsComponent_tr_17_Template_a_click_2_listener() { const restoredCtx = i0.ɵɵrestoreView(_r4); const processedRecord_r2 = restoredCtx.$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.redirectToPaymentViewPage(processedRecord_r2.paymentGroupReference, processedRecord_r2.reference, processedRecord_r2.method)); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td", 9);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 9);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 11);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "lowercase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 11);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const processedRecord_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(processedRecord_r2.document_control_number);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(6, 5, processedRecord_r2.banked_date, "dd MMM yyyy"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(9, 8, processedRecord_r2.amount, "GBP", "symbol", "1.2-2"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(12, 13, ctx_r0.trimUnderscore(processedRecord_r2.method)), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", processedRecord_r2.payment_allocation[0] ? processedRecord_r2.payment_allocation[0].allocation_status : "-", " ");
} }
function ProcessedPaymentsComponent_tr_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 4)(1, "td", 12);
    i0.ɵɵtext(2, " No processed payments ");
    i0.ɵɵelementEnd()();
} }
export class ProcessedPaymentsComponent {
    router;
    bulkScaningPaymentService;
    NONPAYMENTS;
    goToPaymentViewComponent = new EventEmitter();
    constructor(router, bulkScaningPaymentService) {
        this.router = router;
        this.bulkScaningPaymentService = bulkScaningPaymentService;
    }
    ngOnInit() {
    }
    trimUnderscore(method) {
        return this.bulkScaningPaymentService.removeUnwantedString(method, ' ');
    }
    redirectToPaymentViewPage(paymentGroupReference, paymentReference, paymentMethod) {
        this.goToPaymentViewComponent.emit({ paymentGroupReference, paymentReference, paymentMethod });
    }
    static ɵfac = function ProcessedPaymentsComponent_Factory(t) { return new (t || ProcessedPaymentsComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.BulkScaningPaymentService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProcessedPaymentsComponent, selectors: [["ccpay-app-processed-payments"]], inputs: { NONPAYMENTS: "NONPAYMENTS" }, outputs: { goToPaymentViewComponent: "goToPaymentViewComponent" }, decls: 19, vars: 2, consts: [[1, "processed-payments", "govuk-grid-column-full", "govuk-!-padding-bottom-3"], [1, "heading-medium"], [1, "govuk-table"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["scope", "col", 1, "govuk-table__header"], [1, "govuk-table__body"], ["class", "govuk-table__row", 4, "ngFor", "ngForOf"], ["class", "govuk-table__row", 4, "ngIf"], [1, "govuk-table__cell"], ["href", "javascript:void(0)", 3, "click"], [1, "capitalize", "govuk-table__cell"], ["colspan", "5", 1, "govuk-table__cell"]], template: function ProcessedPaymentsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h3", 1);
            i0.ɵɵtext(2, "Processed payments");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "table", 2)(4, "thead", 3)(5, "tr", 4)(6, "td", 5);
            i0.ɵɵtext(7, "Payment asset number (DCN)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "td", 5);
            i0.ɵɵtext(9, "Banked date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "td", 5);
            i0.ɵɵtext(11, "Amount");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "td", 5);
            i0.ɵɵtext(13, "Method");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "td", 5);
            i0.ɵɵtext(15, "Allocation status");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(16, "tbody", 6);
            i0.ɵɵtemplate(17, ProcessedPaymentsComponent_tr_17_Template, 15, 15, "tr", 7);
            i0.ɵɵtemplate(18, ProcessedPaymentsComponent_tr_18_Template, 3, 0, "tr", 8);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(17);
            i0.ɵɵproperty("ngForOf", ctx.NONPAYMENTS);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.NONPAYMENTS.length === 0);
        } }, dependencies: [i3.NgForOf, i3.NgIf, i3.LowerCasePipe, i3.CurrencyPipe, i3.DatePipe], styles: [".lowercase[_ngcontent-%COMP%]{text-transform:lowercase}.capitalize[_ngcontent-%COMP%]:first-letter{text-transform:uppercase}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProcessedPaymentsComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-app-processed-payments', template: "<div class=\"processed-payments govuk-grid-column-full govuk-!-padding-bottom-3\">\n  <h3 class=\"heading-medium\">Processed payments</h3>\n    <table class=\"govuk-table\">\n      <thead class=\"govuk-table__head\">\n        <tr class=\"govuk-table__row\">\n            <td class=\"govuk-table__header\" scope=\"col\">Payment asset number (DCN)</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Banked date</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Amount</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Method</td>\n            <td class=\"govuk-table__header\" scope=\"col\">Allocation status</td>\n           </tr>\n      </thead>\n      <tbody class=\"govuk-table__body\" >\n        <tr class=\"govuk-table__row\" *ngFor=\"let processedRecord of NONPAYMENTS\">\n            <td class=\"govuk-table__cell\">\n                <a href=\"javascript:void(0)\" (click)=\"redirectToPaymentViewPage(processedRecord.paymentGroupReference, processedRecord.reference, processedRecord.method)\">{{processedRecord.document_control_number}}</a>\n            </td>\n            <td class=\"govuk-table__cell\"> {{processedRecord.banked_date | date:'dd MMM yyyy'}}</td>\n            <td class=\"govuk-table__cell\"> {{processedRecord.amount | currency :'GBP':'symbol':'1.2-2'}}</td>\n            <td class=\"capitalize govuk-table__cell\"> {{ trimUnderscore(processedRecord.method) | lowercase}}  </td>\n            <td class=\"capitalize govuk-table__cell\"> {{ processedRecord.payment_allocation[0] ? processedRecord.payment_allocation[0].allocation_status : '-' }}  </td>\n\n          </tr>\n          <tr class=\"govuk-table__row\" *ngIf=\"NONPAYMENTS.length === 0\">\n            <td class=\"govuk-table__cell\" colspan=\"5\">\n              No processed payments\n             </td>\n\n          </tr>\n\n      </tbody>\n    </table>\n</div>\n", styles: [".lowercase{text-transform:lowercase}.capitalize:first-letter{text-transform:uppercase}\n"] }]
    }], function () { return [{ type: i1.Router }, { type: i2.BulkScaningPaymentService }]; }, { NONPAYMENTS: [{
            type: Input,
            args: ['NONPAYMENTS']
        }], goToPaymentViewComponent: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc2VkLXBheW1lbnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9wcm9jZXNzZWQtcGF5bWVudHMvcHJvY2Vzc2VkLXBheW1lbnRzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9wcm9jZXNzZWQtcGF5bWVudHMvcHJvY2Vzc2VkLXBheW1lbnRzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFFN0csT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7O0lDVS9CLDZCQUF5RSxZQUFBLFlBQUE7SUFFcEMsd09BQVMsZUFBQSxtSUFBbUgsQ0FBQSxJQUFDO0lBQUMsWUFBMkM7SUFBQSxpQkFBSSxFQUFBO0lBRTlNLDZCQUE4QjtJQUFDLFlBQW9EOztJQUFBLGlCQUFLO0lBQ3hGLDZCQUE4QjtJQUFDLFlBQTZEOztJQUFBLGlCQUFLO0lBQ2pHLCtCQUF5QztJQUFDLGFBQXlEOztJQUFBLGlCQUFLO0lBQ3hHLCtCQUF5QztJQUFDLGFBQTZHO0lBQUEsaUJBQUssRUFBQTs7OztJQUxHLGVBQTJDO0lBQTNDLGdFQUEyQztJQUUzSyxlQUFvRDtJQUFwRCxtR0FBb0Q7SUFDcEQsZUFBNkQ7SUFBN0QseUdBQTZEO0lBQ2xELGVBQXlEO0lBQXpELHlHQUF5RDtJQUN6RCxlQUE2RztJQUE3Ryw0SUFBNkc7OztJQUd6Siw2QkFBOEQsYUFBQTtJQUUxRCx1Q0FDRDtJQUFBLGlCQUFLLEVBQUE7O0FEaEJsQixNQUFNLE9BQU8sMEJBQTBCO0lBTTNCO0lBQ0E7SUFMWSxXQUFXLENBQWE7SUFDcEMsd0JBQXdCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFM0UsWUFDVSxNQUFjLEVBQ2QseUJBQW9EO1FBRHBELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO0lBQ3hELENBQUM7SUFDTCxRQUFRO0lBQ1IsQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUFjO1FBQzNCLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBQyxHQUFHLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBQ0QseUJBQXlCLENBQUMscUJBQTZCLEVBQUUsZ0JBQXdCLEVBQUUsYUFBcUI7UUFDdEcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxFQUFDLHFCQUFxQixFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBQyxDQUFDLENBQUM7SUFDL0YsQ0FBQztvRkFqQlEsMEJBQTBCOzZEQUExQiwwQkFBMEI7WUNWdkMsOEJBQWdGLFlBQUE7WUFDbkQsa0NBQWtCO1lBQUEsaUJBQUs7WUFDaEQsZ0NBQTJCLGVBQUEsWUFBQSxZQUFBO1lBR3lCLDBDQUEwQjtZQUFBLGlCQUFLO1lBQzNFLDZCQUE0QztZQUFBLDJCQUFXO1lBQUEsaUJBQUs7WUFDNUQsOEJBQTRDO1lBQUEsdUJBQU07WUFBQSxpQkFBSztZQUN2RCw4QkFBNEM7WUFBQSx1QkFBTTtZQUFBLGlCQUFLO1lBQ3ZELDhCQUE0QztZQUFBLGtDQUFpQjtZQUFBLGlCQUFLLEVBQUEsRUFBQTtZQUd4RSxpQ0FBa0M7WUFDaEMsNkVBU087WUFDTCwyRUFLSztZQUVULGlCQUFRLEVBQUEsRUFBQTs7WUFqQm1ELGdCQUFjO1lBQWQseUNBQWM7WUFVdkMsZUFBOEI7WUFBOUIsbURBQThCOzs7dUZEYnpELDBCQUEwQjtjQUx0QyxTQUFTOzJCQUNFLDhCQUE4QjtpR0FNbEIsV0FBVztrQkFBaEMsS0FBSzttQkFBQyxhQUFhO1lBQ1Ysd0JBQXdCO2tCQUFqQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnVsa1NjYW5pbmdQYXltZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2J1bGstc2NhbmluZy1wYXltZW50L2J1bGstc2NhbmluZy1wYXltZW50LnNlcnZpY2UnO1xuaW1wb3J0IHtJUGF5bWVudH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUGF5bWVudCc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NwYXktYXBwLXByb2Nlc3NlZC1wYXltZW50cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9jZXNzZWQtcGF5bWVudHMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wcm9jZXNzZWQtcGF5bWVudHMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9jZXNzZWRQYXltZW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCdOT05QQVlNRU5UUycpIE5PTlBBWU1FTlRTOiBJUGF5bWVudFtdO1xuICBAT3V0cHV0KCkgZ29Ub1BheW1lbnRWaWV3Q29tcG9uZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgYnVsa1NjYW5pbmdQYXltZW50U2VydmljZTogQnVsa1NjYW5pbmdQYXltZW50U2VydmljZVxuICAgICkgeyB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgdHJpbVVuZGVyc2NvcmUobWV0aG9kOiBzdHJpbmcpe1xuICAgICAgcmV0dXJuIHRoaXMuYnVsa1NjYW5pbmdQYXltZW50U2VydmljZS5yZW1vdmVVbndhbnRlZFN0cmluZyhtZXRob2QsJyAnKTtcbiAgICB9XG4gICAgcmVkaXJlY3RUb1BheW1lbnRWaWV3UGFnZShwYXltZW50R3JvdXBSZWZlcmVuY2U6IHN0cmluZywgcGF5bWVudFJlZmVyZW5jZTogc3RyaW5nLCBwYXltZW50TWV0aG9kOiBzdHJpbmcpIHtcbiAgICAgIHRoaXMuZ29Ub1BheW1lbnRWaWV3Q29tcG9uZW50LmVtaXQoe3BheW1lbnRHcm91cFJlZmVyZW5jZSwgcGF5bWVudFJlZmVyZW5jZSwgcGF5bWVudE1ldGhvZH0pO1xuICAgIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJwcm9jZXNzZWQtcGF5bWVudHMgZ292dWstZ3JpZC1jb2x1bW4tZnVsbCBnb3Z1ay0hLXBhZGRpbmctYm90dG9tLTNcIj5cbiAgPGgzIGNsYXNzPVwiaGVhZGluZy1tZWRpdW1cIj5Qcm9jZXNzZWQgcGF5bWVudHM8L2gzPlxuICAgIDx0YWJsZSBjbGFzcz1cImdvdnVrLXRhYmxlXCI+XG4gICAgICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5QYXltZW50IGFzc2V0IG51bWJlciAoRENOKTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5CYW5rZWQgZGF0ZTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIj5BbW91bnQ8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHNjb3BlPVwiY29sXCI+TWV0aG9kPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiPkFsbG9jYXRpb24gc3RhdHVzPC90ZD5cbiAgICAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiID5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICpuZ0Zvcj1cImxldCBwcm9jZXNzZWRSZWNvcmQgb2YgTk9OUEFZTUVOVFNcIj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJyZWRpcmVjdFRvUGF5bWVudFZpZXdQYWdlKHByb2Nlc3NlZFJlY29yZC5wYXltZW50R3JvdXBSZWZlcmVuY2UsIHByb2Nlc3NlZFJlY29yZC5yZWZlcmVuY2UsIHByb2Nlc3NlZFJlY29yZC5tZXRob2QpXCI+e3twcm9jZXNzZWRSZWNvcmQuZG9jdW1lbnRfY29udHJvbF9udW1iZXJ9fTwvYT5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPiB7e3Byb2Nlc3NlZFJlY29yZC5iYW5rZWRfZGF0ZSB8IGRhdGU6J2RkIE1NTSB5eXl5J319PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+IHt7cHJvY2Vzc2VkUmVjb3JkLmFtb3VudCB8IGN1cnJlbmN5IDonR0JQJzonc3ltYm9sJzonMS4yLTInfX08L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FwaXRhbGl6ZSBnb3Z1ay10YWJsZV9fY2VsbFwiPiB7eyB0cmltVW5kZXJzY29yZShwcm9jZXNzZWRSZWNvcmQubWV0aG9kKSB8IGxvd2VyY2FzZX19ICA8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FwaXRhbGl6ZSBnb3Z1ay10YWJsZV9fY2VsbFwiPiB7eyBwcm9jZXNzZWRSZWNvcmQucGF5bWVudF9hbGxvY2F0aW9uWzBdID8gcHJvY2Vzc2VkUmVjb3JkLnBheW1lbnRfYWxsb2NhdGlvblswXS5hbGxvY2F0aW9uX3N0YXR1cyA6ICctJyB9fSAgPC90ZD5cblxuICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICpuZ0lmPVwiTk9OUEFZTUVOVFMubGVuZ3RoID09PSAwXCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiIGNvbHNwYW49XCI1XCI+XG4gICAgICAgICAgICAgIE5vIHByb2Nlc3NlZCBwYXltZW50c1xuICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICA8L3RyPlxuXG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+XG48L2Rpdj5cbiJdfQ==