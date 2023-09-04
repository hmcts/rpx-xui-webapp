import { Component, Input } from '@angular/core';
import { StatusHistoryService } from '../../services/status-history/status-history.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import * as i0 from "@angular/core";
import * as i1 from "../../services/status-history/status-history.service";
import * as i2 from "../../payment-lib.component";
import * as i3 from "@angular/common";
function StatusHistoryComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "h2", 5);
    i0.ɵɵtext(2, " Payment status history could not be retrieved ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 6);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.errorMessage, " ");
} }
function StatusHistoryComponent_div_4_th_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵtext(1, "Amount");
    i0.ɵɵelementEnd();
} }
function StatusHistoryComponent_div_4_tr_10_td_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("\u00A3", i0.ɵɵpipeBind2(2, 1, ctx_r5.statuses.amount, ".2"), "");
} }
function StatusHistoryComponent_div_4_tr_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, StatusHistoryComponent_div_4_tr_10_td_3_Template, 3, 4, "td", 3);
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const status_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(status_r4.status);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.isTakePayment);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 3, status_r4.date_created, "dd MMMM yyyy HH:mm:ss"));
} }
function StatusHistoryComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "table")(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, StatusHistoryComponent_div_4_th_6_Template, 2, 0, "th", 3);
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Date and time");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "tbody");
    i0.ɵɵtemplate(10, StatusHistoryComponent_div_4_tr_10_Template, 7, 6, "tr", 7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r1.isTakePayment);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.statuses.status_histories);
} }
export class StatusHistoryComponent {
    statusHistoryService;
    paymentLibComponent;
    isTakePayment;
    pageTitle = 'Payment status history';
    statuses;
    errorMessage;
    constructor(statusHistoryService, paymentLibComponent) {
        this.statusHistoryService = statusHistoryService;
        this.paymentLibComponent = paymentLibComponent;
    }
    ngOnInit() {
        this.statusHistoryService.getPaymentStatusesByReference(this.paymentLibComponent.paymentReference, this.paymentLibComponent.paymentMethod).subscribe(statuses => this.statuses = statuses, (error) => this.errorMessage = error.replace(/"/g, ""));
    }
    static ɵfac = function StatusHistoryComponent_Factory(t) { return new (t || StatusHistoryComponent)(i0.ɵɵdirectiveInject(i1.StatusHistoryService), i0.ɵɵdirectiveInject(i2.PaymentLibComponent)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StatusHistoryComponent, selectors: [["ccpay-payment-statuses"]], inputs: { isTakePayment: "isTakePayment" }, decls: 5, vars: 3, consts: [[1, "column"], [1, "heading-medium"], ["class", "error-summary", "role", "group", "aria-labelledby", "failure-error-summary-heading", "tabindex", "-1", 4, "ngIf"], [4, "ngIf"], ["role", "group", "aria-labelledby", "failure-error-summary-heading", "tabindex", "-1", 1, "error-summary"], ["id", "failure-error-summary-heading", 1, "heading-medium", "error-summary-heading"], [1, "govuk-error-summary__body"], [4, "ngFor", "ngForOf"]], template: function StatusHistoryComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h2", 1);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(3, StatusHistoryComponent_div_3_Template, 5, 1, "div", 2);
            i0.ɵɵtemplate(4, StatusHistoryComponent_div_4_Template, 11, 2, "div", 3);
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.pageTitle);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.errorMessage && ctx.statuses);
        } }, dependencies: [i3.NgForOf, i3.NgIf, i3.DecimalPipe, i3.DatePipe] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StatusHistoryComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-payment-statuses', template: "<div class=\"column\">\n  <h2 class=\"heading-medium\">{{ pageTitle }}</h2>\n</div>\n\n\n<div class=\"error-summary\" role=\"group\" aria-labelledby=\"failure-error-summary-heading\" tabindex=\"-1\" *ngIf=\"errorMessage\">\n  <h2 class=\"heading-medium error-summary-heading\" id=\"failure-error-summary-heading\">\n    Payment status history could not be retrieved\n  </h2>\n  <div class=\"govuk-error-summary__body\">\n    {{ errorMessage }}\n  </div>\n</div>\n\n<div *ngIf=\"!errorMessage && statuses\">\n  <table>\n      <thead>\n        <tr>\n          <th>Status</th>\n          <th *ngIf=\"isTakePayment\">Amount</th>\n          <th>Date and time</th>\n        </tr>\n      </thead> \n      <tbody>\n        <tr *ngFor=\"let status of statuses.status_histories\">\n          <td>{{ status.status }}</td>\n          <td *ngIf=\"isTakePayment\">\u00A3{{ statuses.amount | number:'.2' }}</td>\n          <td>{{ status.date_created | date:'dd MMMM yyyy HH:mm:ss'}}</td>\n        </tr>\n    </tbody>\n  </table>\n</div>\n" }]
    }], function () { return [{ type: i1.StatusHistoryService }, { type: i2.PaymentLibComponent }]; }, { isTakePayment: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWhpc3RvcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9jb21wb25lbnRzL3N0YXR1cy1oaXN0b3J5L3N0YXR1cy1oaXN0b3J5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9zdGF0dXMtaGlzdG9yeS9zdGF0dXMtaGlzdG9yeS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUM1RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7O0lDRWxFLDhCQUEySCxZQUFBO0lBRXZILCtEQUNGO0lBQUEsaUJBQUs7SUFDTCw4QkFBdUM7SUFDckMsWUFDRjtJQUFBLGlCQUFNLEVBQUE7OztJQURKLGVBQ0Y7SUFERSxvREFDRjs7O0lBUVEsMEJBQTBCO0lBQUEsc0JBQU07SUFBQSxpQkFBSzs7O0lBT3JDLDBCQUEwQjtJQUFBLFlBQW9DOztJQUFBLGlCQUFLOzs7SUFBekMsZUFBb0M7SUFBcEMsdUZBQW9DOzs7SUFGaEUsMEJBQXFELFNBQUE7SUFDL0MsWUFBbUI7SUFBQSxpQkFBSztJQUM1QixpRkFBbUU7SUFDbkUsMEJBQUk7SUFBQSxZQUF1RDs7SUFBQSxpQkFBSyxFQUFBOzs7O0lBRjVELGVBQW1CO0lBQW5CLHNDQUFtQjtJQUNsQixlQUFtQjtJQUFuQiwyQ0FBbUI7SUFDcEIsZUFBdUQ7SUFBdkQsMkZBQXVEOzs7SUFickUsMkJBQXVDLFlBQUEsWUFBQSxTQUFBLFNBQUE7SUFJekIsc0JBQU07SUFBQSxpQkFBSztJQUNmLDJFQUFxQztJQUNyQywwQkFBSTtJQUFBLDZCQUFhO0lBQUEsaUJBQUssRUFBQSxFQUFBO0lBRzFCLDZCQUFPO0lBQ0wsNkVBSUs7SUFDVCxpQkFBUSxFQUFBLEVBQUE7OztJQVZHLGVBQW1CO0lBQW5CLDJDQUFtQjtJQUtILGVBQTRCO0lBQTVCLDBEQUE0Qjs7QURkM0QsTUFBTSxPQUFPLHNCQUFzQjtJQU1iO0lBQ0E7SUFOWCxhQUFhLENBQVU7SUFDaEMsU0FBUyxHQUFXLHdCQUF3QixDQUFDO0lBQzdDLFFBQVEsQ0FBbUI7SUFDM0IsWUFBWSxDQUFTO0lBRXJCLFlBQW9CLG9CQUEwQyxFQUMxQyxtQkFBd0M7UUFEeEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO0lBQUksQ0FBQztJQUVqRSxRQUFRO1FBQ04sSUFBSSxDQUFDLG9CQUFvQixDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUNsSixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxFQUNwQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBUSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FDaEUsQ0FBQztJQUVKLENBQUM7Z0ZBZlUsc0JBQXNCOzZEQUF0QixzQkFBc0I7WUNWbkMsOEJBQW9CLFlBQUE7WUFDUyxZQUFlO1lBQUEsaUJBQUssRUFBQTtZQUlqRCx1RUFPTTtZQUVOLHdFQWlCTTs7WUE5QnVCLGVBQWU7WUFBZixtQ0FBZTtZQUkyRCxlQUFrQjtZQUFsQix1Q0FBa0I7WUFTbkgsZUFBK0I7WUFBL0Isd0RBQStCOzs7dUZESnhCLHNCQUFzQjtjQUxsQyxTQUFTOzJCQUNFLHdCQUF3Qjt5R0FLekIsYUFBYTtrQkFBckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVN0YXR1c0hpc3RvcmllcyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVN0YXR1c0hpc3Rvcmllcyc7XG5pbXBvcnQgeyBTdGF0dXNIaXN0b3J5U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3N0YXR1cy1oaXN0b3J5L3N0YXR1cy1oaXN0b3J5LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGF5bWVudExpYkNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3BheW1lbnQtbGliLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjcGF5LXBheW1lbnQtc3RhdHVzZXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vc3RhdHVzLWhpc3RvcnkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zdGF0dXMtaGlzdG9yeS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU3RhdHVzSGlzdG9yeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGlzVGFrZVBheW1lbnQ6IGJvb2xlYW47XG4gIHBhZ2VUaXRsZTogc3RyaW5nID0gJ1BheW1lbnQgc3RhdHVzIGhpc3RvcnknO1xuICBzdGF0dXNlczogSVN0YXR1c0hpc3RvcmllcztcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGF0dXNIaXN0b3J5U2VydmljZTogU3RhdHVzSGlzdG9yeVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgcGF5bWVudExpYkNvbXBvbmVudDogUGF5bWVudExpYkNvbXBvbmVudCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdGF0dXNIaXN0b3J5U2VydmljZS5nZXRQYXltZW50U3RhdHVzZXNCeVJlZmVyZW5jZSh0aGlzLnBheW1lbnRMaWJDb21wb25lbnQucGF5bWVudFJlZmVyZW5jZSwgdGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRNZXRob2QpLnN1YnNjcmliZShcbiAgICAgIHN0YXR1c2VzID0+IHRoaXMuc3RhdHVzZXMgPSBzdGF0dXNlcyxcbiAgICAgIChlcnJvcjogYW55KSA9PiB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+ZXJyb3IucmVwbGFjZSgvXCIvZyxcIlwiKVxuICAgICk7XG4gICAgXG4gIH1cblxufVxuIiwiPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICA8aDIgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bVwiPnt7IHBhZ2VUaXRsZSB9fTwvaDI+XG48L2Rpdj5cblxuXG48ZGl2IGNsYXNzPVwiZXJyb3Itc3VtbWFyeVwiIHJvbGU9XCJncm91cFwiIGFyaWEtbGFiZWxsZWRieT1cImZhaWx1cmUtZXJyb3Itc3VtbWFyeS1oZWFkaW5nXCIgdGFiaW5kZXg9XCItMVwiICpuZ0lmPVwiZXJyb3JNZXNzYWdlXCI+XG4gIDxoMiBjbGFzcz1cImhlYWRpbmctbWVkaXVtIGVycm9yLXN1bW1hcnktaGVhZGluZ1wiIGlkPVwiZmFpbHVyZS1lcnJvci1zdW1tYXJ5LWhlYWRpbmdcIj5cbiAgICBQYXltZW50IHN0YXR1cyBoaXN0b3J5IGNvdWxkIG5vdCBiZSByZXRyaWV2ZWRcbiAgPC9oMj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX2JvZHlcIj5cbiAgICB7eyBlcnJvck1lc3NhZ2UgfX1cbiAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiAqbmdJZj1cIiFlcnJvck1lc3NhZ2UgJiYgc3RhdHVzZXNcIj5cbiAgPHRhYmxlPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPlN0YXR1czwvdGg+XG4gICAgICAgICAgPHRoICpuZ0lmPVwiaXNUYWtlUGF5bWVudFwiPkFtb3VudDwvdGg+XG4gICAgICAgICAgPHRoPkRhdGUgYW5kIHRpbWU8L3RoPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD4gXG4gICAgICA8dGJvZHk+XG4gICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgc3RhdHVzIG9mIHN0YXR1c2VzLnN0YXR1c19oaXN0b3JpZXNcIj5cbiAgICAgICAgICA8dGQ+e3sgc3RhdHVzLnN0YXR1cyB9fTwvdGQ+XG4gICAgICAgICAgPHRkICpuZ0lmPVwiaXNUYWtlUGF5bWVudFwiPsKje3sgc3RhdHVzZXMuYW1vdW50IHwgbnVtYmVyOicuMicgfX08L3RkPlxuICAgICAgICAgIDx0ZD57eyBzdGF0dXMuZGF0ZV9jcmVhdGVkIHwgZGF0ZTonZGQgTU1NTSB5eXl5IEhIOm1tOnNzJ319PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICA8L3Rib2R5PlxuICA8L3RhYmxlPlxuPC9kaXY+XG4iXX0=