import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function PbaDetailsComponent_tr_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 1);
    i0.ɵɵtext(2, "PBA account name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.payment.organisation_name);
} }
function PbaDetailsComponent_tr_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 1);
    i0.ɵɵtext(2, "PBA number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.payment.account_number);
} }
function PbaDetailsComponent_tr_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 1);
    i0.ɵɵtext(2, "Customer internal reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.payment.customer_reference);
} }
export class PbaDetailsComponent {
    payment;
    constructor() { }
    ngOnInit() {
    }
    static ɵfac = function PbaDetailsComponent_Factory(t) { return new (t || PbaDetailsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PbaDetailsComponent, selectors: [["ccpay-pba-details"]], inputs: { payment: "payment" }, decls: 18, vars: 6, consts: [[1, "heading-large"], [1, "bold", "tb-col-w"], [1, "capitalize"], [4, "ngIf"]], template: function PbaDetailsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h2", 0);
            i0.ɵɵtext(1, "Payment method");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "table")(3, "tbody")(4, "tr")(5, "td", 1);
            i0.ɵɵtext(6, "Method");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "td", 2);
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "lowercase");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "tr")(11, "td", 1);
            i0.ɵɵtext(12, "Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "td");
            i0.ɵɵtext(14, "Credit");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(15, PbaDetailsComponent_tr_15_Template, 5, 1, "tr", 3);
            i0.ɵɵtemplate(16, PbaDetailsComponent_tr_16_Template, 5, 1, "tr", 3);
            i0.ɵɵtemplate(17, PbaDetailsComponent_tr_17_Template, 5, 1, "tr", 3);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 4, ctx.payment.method));
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.payment.organisation_name);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.payment.account_number);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.payment.customer_reference);
        } }, dependencies: [i1.NgIf, i1.LowerCasePipe], styles: [".capitalize[_ngcontent-%COMP%]:first-letter{text-transform:uppercase}.tb-col-w[_ngcontent-%COMP%]{width:330px}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PbaDetailsComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-pba-details', template: "\n  <h2 class=\"heading-large\">Payment method</h2>\n  <table>\n    <tbody>\n    <tr>\n      <td class=\"bold tb-col-w\">Method</td>\n      <td class=\"capitalize\">{{ payment.method | lowercase}}</td>\n    </tr>\n    <tr>\n      <td class=\"bold tb-col-w\">Type</td>\n      <td>Credit</td>\n    </tr>\n    <tr *ngIf=\"payment.organisation_name\">\n      <td class=\"bold tb-col-w\">PBA account name</td>\n      <td>{{ payment.organisation_name }}</td>\n    </tr>\n    <tr *ngIf=\"payment.account_number\">\n      <td class=\"bold tb-col-w\">PBA number</td>\n      <td>{{ payment.account_number }}</td>\n    </tr>\n    <tr *ngIf=\"payment.customer_reference\">\n      <td class=\"bold tb-col-w\">Customer internal reference</td>\n      <td>{{ payment.customer_reference }}</td>\n    </tr>\n    </tbody>\n  </table>\n", styles: [".capitalize:first-letter{text-transform:uppercase}.tb-col-w{width:330px}\n"] }]
    }], function () { return []; }, { payment: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGJhLWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9jb21wb25lbnRzL3BiYS1kZXRhaWxzL3BiYS1kZXRhaWxzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9wYmEtZGV0YWlscy9wYmEtZGV0YWlscy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQzs7OztJQ1lyRCwwQkFBc0MsWUFBQTtJQUNWLGdDQUFnQjtJQUFBLGlCQUFLO0lBQy9DLDBCQUFJO0lBQUEsWUFBK0I7SUFBQSxpQkFBSyxFQUFBOzs7SUFBcEMsZUFBK0I7SUFBL0Isc0RBQStCOzs7SUFFckMsMEJBQW1DLFlBQUE7SUFDUCwwQkFBVTtJQUFBLGlCQUFLO0lBQ3pDLDBCQUFJO0lBQUEsWUFBNEI7SUFBQSxpQkFBSyxFQUFBOzs7SUFBakMsZUFBNEI7SUFBNUIsbURBQTRCOzs7SUFFbEMsMEJBQXVDLFlBQUE7SUFDWCwyQ0FBMkI7SUFBQSxpQkFBSztJQUMxRCwwQkFBSTtJQUFBLFlBQWdDO0lBQUEsaUJBQUssRUFBQTs7O0lBQXJDLGVBQWdDO0lBQWhDLHVEQUFnQzs7QURkMUMsTUFBTSxPQUFPLG1CQUFtQjtJQUNyQixPQUFPLENBQVc7SUFFM0IsZ0JBQWdCLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7NkVBTlUsbUJBQW1COzZEQUFuQixtQkFBbUI7WUNQOUIsNkJBQTBCO1lBQUEsOEJBQWM7WUFBQSxpQkFBSztZQUM3Qyw2QkFBTyxZQUFBLFNBQUEsWUFBQTtZQUd1QixzQkFBTTtZQUFBLGlCQUFLO1lBQ3JDLDZCQUF1QjtZQUFBLFlBQStCOztZQUFBLGlCQUFLLEVBQUE7WUFFN0QsMkJBQUksYUFBQTtZQUN3QixxQkFBSTtZQUFBLGlCQUFLO1lBQ25DLDJCQUFJO1lBQUEsdUJBQU07WUFBQSxpQkFBSyxFQUFBO1lBRWpCLG9FQUdLO1lBQ0wsb0VBR0s7WUFDTCxvRUFHSztZQUNMLGlCQUFRLEVBQUE7O1lBbEJpQixlQUErQjtZQUEvQiw4REFBK0I7WUFNbkQsZUFBK0I7WUFBL0Isb0RBQStCO1lBSS9CLGVBQTRCO1lBQTVCLGlEQUE0QjtZQUk1QixlQUFnQztZQUFoQyxxREFBZ0M7Ozt1RkRaNUIsbUJBQW1CO2NBTC9CLFNBQVM7MkJBQ0UsbUJBQW1CO3NDQUtwQixPQUFPO2tCQUFmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElQYXltZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUGF5bWVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjcGF5LXBiYS1kZXRhaWxzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BiYS1kZXRhaWxzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGJhLWRldGFpbHMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBiYURldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwYXltZW50OiBJUGF5bWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsIlxuICA8aDIgY2xhc3M9XCJoZWFkaW5nLWxhcmdlXCI+UGF5bWVudCBtZXRob2Q8L2gyPlxuICA8dGFibGU+XG4gICAgPHRib2R5PlxuICAgIDx0cj5cbiAgICAgIDx0ZCBjbGFzcz1cImJvbGQgdGItY29sLXdcIj5NZXRob2Q8L3RkPlxuICAgICAgPHRkIGNsYXNzPVwiY2FwaXRhbGl6ZVwiPnt7IHBheW1lbnQubWV0aG9kIHwgbG93ZXJjYXNlfX08L3RkPlxuICAgIDwvdHI+XG4gICAgPHRyPlxuICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPlR5cGU8L3RkPlxuICAgICAgPHRkPkNyZWRpdDwvdGQ+XG4gICAgPC90cj5cbiAgICA8dHIgKm5nSWY9XCJwYXltZW50Lm9yZ2FuaXNhdGlvbl9uYW1lXCI+XG4gICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+UEJBIGFjY291bnQgbmFtZTwvdGQ+XG4gICAgICA8dGQ+e3sgcGF5bWVudC5vcmdhbmlzYXRpb25fbmFtZSB9fTwvdGQ+XG4gICAgPC90cj5cbiAgICA8dHIgKm5nSWY9XCJwYXltZW50LmFjY291bnRfbnVtYmVyXCI+XG4gICAgICA8dGQgY2xhc3M9XCJib2xkIHRiLWNvbC13XCI+UEJBIG51bWJlcjwvdGQ+XG4gICAgICA8dGQ+e3sgcGF5bWVudC5hY2NvdW50X251bWJlciB9fTwvdGQ+XG4gICAgPC90cj5cbiAgICA8dHIgKm5nSWY9XCJwYXltZW50LmN1c3RvbWVyX3JlZmVyZW5jZVwiPlxuICAgICAgPHRkIGNsYXNzPVwiYm9sZCB0Yi1jb2wtd1wiPkN1c3RvbWVyIGludGVybmFsIHJlZmVyZW5jZTwvdGQ+XG4gICAgICA8dGQ+e3sgcGF5bWVudC5jdXN0b21lcl9yZWZlcmVuY2UgfX08L3RkPlxuICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbiAgPC90YWJsZT5cbiJdfQ==