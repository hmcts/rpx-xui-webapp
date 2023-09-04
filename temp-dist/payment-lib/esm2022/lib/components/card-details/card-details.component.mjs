import { Component } from '@angular/core';
import { CardDetailsService } from '../../services/card-details/card-details.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import * as i0 from "@angular/core";
import * as i1 from "../../services/card-details/card-details.service";
import * as i2 from "../../payment-lib.component";
import * as i3 from "@angular/common";
function CardDetailsComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1, " Payment method unavailable, The payment has either expired or unsuccessful.\n");
    i0.ɵɵelementEnd();
} }
function CardDetailsComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "table")(2, "tbody")(3, "tr")(4, "td", 5);
    i0.ɵɵtext(5, "Method");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7, "Card");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "tr")(9, "td", 5);
    i0.ɵɵtext(10, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate(ctx_r1.cardDetails.card_brand);
} }
export class CardDetailsComponent {
    cardDetailsService;
    paymentLibComponent;
    pageTitle = 'Card details';
    cardDetails;
    paymentReference;
    errorMessage;
    constructor(cardDetailsService, paymentLibComponent) {
        this.cardDetailsService = cardDetailsService;
        this.paymentLibComponent = paymentLibComponent;
    }
    ngOnInit() {
        this.cardDetailsService.getCardDetails(this.paymentLibComponent.paymentReference).subscribe(cardDetails => this.cardDetails = cardDetails, (error) => this.errorMessage = error);
    }
    get getPaymentReference() {
        return this.paymentReference;
    }
    static ɵfac = function CardDetailsComponent_Factory(t) { return new (t || CardDetailsComponent)(i0.ɵɵdirectiveInject(i1.CardDetailsService), i0.ɵɵdirectiveInject(i2.PaymentLibComponent)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CardDetailsComponent, selectors: [["ccpay-card-details"]], decls: 5, vars: 2, consts: [[1, "column"], [1, "heading-medium"], ["role", "group", "aria-labelledby", "failure-error-summary-heading", "tabindex", "-1", 4, "ngIf"], [4, "ngIf"], ["role", "group", "aria-labelledby", "failure-error-summary-heading", "tabindex", "-1"], [1, "bold", "tb-col-w"]], template: function CardDetailsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h2", 1);
            i0.ɵɵtext(2, "Payment method");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(3, CardDetailsComponent_div_3_Template, 2, 0, "div", 2);
            i0.ɵɵtemplate(4, CardDetailsComponent_div_4_Template, 13, 1, "div", 3);
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.errorMessage && ctx.cardDetails);
        } }, dependencies: [i3.NgIf], styles: [".tb-col-w[_ngcontent-%COMP%]{width:330px}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CardDetailsComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-card-details', template: "\n<div class=\"column\">\n  <h2 class=\"heading-medium\">Payment method</h2>\n</div>\n\n<div role=\"group\" aria-labelledby=\"failure-error-summary-heading\" tabindex=\"-1\" *ngIf=\"errorMessage\">\n    Payment method unavailable, The payment has either expired or unsuccessful.\n</div>\n\n<div *ngIf=\"!errorMessage && cardDetails\">\n\n<table>\n  <tbody>\n  <tr>\n    <td class=\"bold tb-col-w\">Method</td>\n    <td>Card</td>\n  </tr>\n  <tr>\n    <td class=\"bold tb-col-w\">Type</td>\n    <td>{{ cardDetails.card_brand }}</td>\n  </tr>\n  </tbody>\n</table>\n</div>\n\n", styles: [".tb-col-w{width:330px}\n"] }]
    }], function () { return [{ type: i1.CardDetailsService }, { type: i2.PaymentLibComponent }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9jYXJkLWRldGFpbHMvY2FyZC1kZXRhaWxzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9jYXJkLWRldGFpbHMvY2FyZC1kZXRhaWxzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFFdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7OztJQ0VsRSw4QkFBcUc7SUFDakcsOEZBQ0o7SUFBQSxpQkFBTTs7O0lBRU4sMkJBQTBDLFlBQUEsWUFBQSxTQUFBLFlBQUE7SUFLWixzQkFBTTtJQUFBLGlCQUFLO0lBQ3JDLDBCQUFJO0lBQUEsb0JBQUk7SUFBQSxpQkFBSyxFQUFBO0lBRWYsMEJBQUksWUFBQTtJQUN3QixxQkFBSTtJQUFBLGlCQUFLO0lBQ25DLDJCQUFJO0lBQUEsYUFBNEI7SUFBQSxpQkFBSyxFQUFBLEVBQUEsRUFBQSxFQUFBOzs7SUFBakMsZ0JBQTRCO0lBQTVCLG1EQUE0Qjs7QURUcEMsTUFBTSxPQUFPLG9CQUFvQjtJQU1YO0lBQ0E7SUFOcEIsU0FBUyxHQUFXLGNBQWMsQ0FBQztJQUNuQyxXQUFXLENBQWU7SUFDMUIsZ0JBQWdCLENBQVM7SUFDekIsWUFBWSxDQUFTO0lBRXJCLFlBQW9CLGtCQUFzQyxFQUN0QyxtQkFBd0M7UUFEeEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO0lBQUksQ0FBQztJQUVqRSxRQUFRO1FBQ04sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLENBQ3pGLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLEVBQzdDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFRLEtBQUssQ0FDL0MsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDOzhFQWxCVSxvQkFBb0I7NkRBQXBCLG9CQUFvQjtZQ1RqQyw4QkFBb0IsWUFBQTtZQUNTLDhCQUFjO1lBQUEsaUJBQUssRUFBQTtZQUdoRCxxRUFFTTtZQUVOLHNFQWNNOztZQWxCMkUsZUFBa0I7WUFBbEIsdUNBQWtCO1lBSTdGLGVBQWtDO1lBQWxDLDJEQUFrQzs7O3VGREMzQixvQkFBb0I7Y0FMaEMsU0FBUzsyQkFDRSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FyZERldGFpbHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2FyZC1kZXRhaWxzL2NhcmQtZGV0YWlscy5zZXJ2aWNlJztcbmltcG9ydCB7SUNhcmREZXRhaWxzfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lDYXJkRGV0YWlscyc7XG5pbXBvcnQgeyBQYXltZW50TGliQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcGF5bWVudC1saWIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NwYXktY2FyZC1kZXRhaWxzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhcmQtZGV0YWlscy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhcmQtZGV0YWlscy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FyZERldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwYWdlVGl0bGU6IHN0cmluZyA9ICdDYXJkIGRldGFpbHMnO1xuICBjYXJkRGV0YWlsczogSUNhcmREZXRhaWxzO1xuICBwYXltZW50UmVmZXJlbmNlOiBzdHJpbmc7XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FyZERldGFpbHNTZXJ2aWNlOiBDYXJkRGV0YWlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgcGF5bWVudExpYkNvbXBvbmVudDogUGF5bWVudExpYkNvbXBvbmVudCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jYXJkRGV0YWlsc1NlcnZpY2UuZ2V0Q2FyZERldGFpbHModGhpcy5wYXltZW50TGliQ29tcG9uZW50LnBheW1lbnRSZWZlcmVuY2UpLnN1YnNjcmliZShcbiAgICAgIGNhcmREZXRhaWxzID0+IHRoaXMuY2FyZERldGFpbHMgPSBjYXJkRGV0YWlscyxcbiAgICAgIChlcnJvcjogYW55KSA9PiB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+ZXJyb3JcbiAgICApO1xuICB9XG5cbiAgZ2V0IGdldFBheW1lbnRSZWZlcmVuY2UoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wYXltZW50UmVmZXJlbmNlO1xuICB9XG5cbn1cbiIsIlxuPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICA8aDIgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bVwiPlBheW1lbnQgbWV0aG9kPC9oMj5cbjwvZGl2PlxuXG48ZGl2IHJvbGU9XCJncm91cFwiIGFyaWEtbGFiZWxsZWRieT1cImZhaWx1cmUtZXJyb3Itc3VtbWFyeS1oZWFkaW5nXCIgdGFiaW5kZXg9XCItMVwiICpuZ0lmPVwiZXJyb3JNZXNzYWdlXCI+XG4gICAgUGF5bWVudCBtZXRob2QgdW5hdmFpbGFibGUsIFRoZSBwYXltZW50IGhhcyBlaXRoZXIgZXhwaXJlZCBvciB1bnN1Y2Nlc3NmdWwuXG48L2Rpdj5cblxuPGRpdiAqbmdJZj1cIiFlcnJvck1lc3NhZ2UgJiYgY2FyZERldGFpbHNcIj5cblxuPHRhYmxlPlxuICA8dGJvZHk+XG4gIDx0cj5cbiAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+TWV0aG9kPC90ZD5cbiAgICA8dGQ+Q2FyZDwvdGQ+XG4gIDwvdHI+XG4gIDx0cj5cbiAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+VHlwZTwvdGQ+XG4gICAgPHRkPnt7IGNhcmREZXRhaWxzLmNhcmRfYnJhbmQgfX08L3RkPlxuICA8L3RyPlxuICA8L3Rib2R5PlxuPC90YWJsZT5cbjwvZGl2PlxuXG4iXX0=