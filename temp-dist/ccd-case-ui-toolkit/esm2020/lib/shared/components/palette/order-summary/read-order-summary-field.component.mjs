import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
function ReadOrderSummaryFieldComponent_tr_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 5);
} if (rf & 2) {
    const feeValue_r1 = ctx.$implicit;
    i0.ɵɵproperty("feeValue", feeValue_r1);
} }
export class ReadOrderSummaryFieldComponent extends AbstractFieldReadComponent {
    getFees() {
        return this.caseField.value ? this.caseField.value.Fees : [];
    }
    getPaymentTotal() {
        return this.caseField.value ? this.caseField.value.PaymentTotal : '';
    }
}
ReadOrderSummaryFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadOrderSummaryFieldComponent_BaseFactory; return function ReadOrderSummaryFieldComponent_Factory(t) { return (ɵReadOrderSummaryFieldComponent_BaseFactory || (ɵReadOrderSummaryFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadOrderSummaryFieldComponent)))(t || ReadOrderSummaryFieldComponent); }; }();
ReadOrderSummaryFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadOrderSummaryFieldComponent, selectors: [["ccd-read-order-summary-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 26, vars: 20, consts: [[1, "order-summary-title"], ["id", "hiddenHeader", 2, "display", "none"], ["ccdReadOrderSummaryRow", "", 3, "feeValue", 4, "ngFor", "ngForOf"], [1, "payment-total"], [3, "amount"], ["ccdReadOrderSummaryRow", "", 3, "feeValue"]], template: function ReadOrderSummaryFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "table");
        i0.ɵɵpipe(4, "rpxTranslate");
        i0.ɵɵelementStart(5, "thead")(6, "tr");
        i0.ɵɵelement(7, "th", 1);
        i0.ɵɵelementStart(8, "td");
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "td");
        i0.ɵɵtext(12);
        i0.ɵɵpipe(13, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "td");
        i0.ɵɵtext(15);
        i0.ɵɵpipe(16, "rpxTranslate");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(17, "tbody");
        i0.ɵɵtemplate(18, ReadOrderSummaryFieldComponent_tr_18_Template, 1, 1, "tr", 2);
        i0.ɵɵelementStart(19, "tr");
        i0.ɵɵelement(20, "td");
        i0.ɵɵelementStart(21, "td", 3);
        i0.ɵɵtext(22);
        i0.ɵɵpipe(23, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "td");
        i0.ɵɵelement(25, "ccd-read-money-gbp-field", 4);
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 8, "Order Summary"));
        i0.ɵɵadvance(2);
        i0.ɵɵattribute("aria-describedby", i0.ɵɵpipeBind1(4, 10, "order summary table"));
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 12, "Code"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 14, "Description"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 16, "Amount"));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.getFees());
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 18, "Total"));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("amount", ctx.getPaymentTotal());
    } }, styles: [".order-summary-title[_ngcontent-%COMP%]{border:0;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:18px;line-height:1.2}@media (min-width: 641px){.order-summary-title[_ngcontent-%COMP%]{font-size:24px;line-height:1.25}}table[_ngcontent-%COMP%]{margin-bottom:23px}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{margin:0;border-bottom:1px solid #0b0c0c;padding-top:41px;padding-bottom:36px;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:14px;line-height:1.1428571429}@media (min-width: 641px){table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:16px;line-height:1.25}}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(3){text-align:right}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding-top:12px;padding-bottom:12px;margin:0;border-bottom:1px solid #0b0c0c;font-family:nta,Arial,sans-serif;font-weight:400;text-transform:none;font-size:14px;line-height:1.1428571429}@media (min-width: 641px){table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:16px;line-height:1.25}}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(1){width:20px}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(2){width:70%}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(3){text-align:right;width:10%}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%]:nth-child(1){border-bottom:0px}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%]:nth-child(2){font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:14px;line-height:1.1428571429;text-align:right;border-bottom:0px}@media (min-width: 641px){table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%]:nth-child(2){font-size:16px;line-height:1.25}}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadOrderSummaryFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-order-summary-field', template: "<div class=\"order-summary-title\">{{'Order Summary' | rpxTranslate}}</div>\n<table [attr.aria-describedby]=\"'order summary table' | rpxTranslate\">\n    <thead>\n      <tr>\n        <th id=\"hiddenHeader\" style=\"display: none;\"></th>\n        <td>{{'Code' | rpxTranslate}}</td>\n        <td>{{'Description' | rpxTranslate}}</td>\n        <td>{{'Amount' | rpxTranslate}}</td>\n      </tr>\n    </thead>\n    <tbody>\n        <tr ccdReadOrderSummaryRow *ngFor=\"let feeValue of getFees()\" [feeValue]=\"feeValue\"></tr>\n        <tr>\n            <td></td>\n            <td class=\"payment-total\">{{'Total' | rpxTranslate}}</td>\n            <td><ccd-read-money-gbp-field [amount]=\"getPaymentTotal()\"></ccd-read-money-gbp-field></td>\n        </tr>\n    </tbody>\n</table>\n", styles: [".order-summary-title{border:0;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:18px;line-height:1.2}@media (min-width: 641px){.order-summary-title{font-size:24px;line-height:1.25}}table{margin-bottom:23px}table thead tr td{margin:0;border-bottom:1px solid #0b0c0c;padding-top:41px;padding-bottom:36px;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:14px;line-height:1.1428571429}@media (min-width: 641px){table thead tr td{font-size:16px;line-height:1.25}}table thead tr td:nth-child(3){text-align:right}table tbody tr td{padding-top:12px;padding-bottom:12px;margin:0;border-bottom:1px solid #0b0c0c;font-family:nta,Arial,sans-serif;font-weight:400;text-transform:none;font-size:14px;line-height:1.1428571429}@media (min-width: 641px){table tbody tr td{font-size:16px;line-height:1.25}}table tbody tr td:nth-child(1){width:20px}table tbody tr td:nth-child(2){width:70%}table tbody tr td:nth-child(3){text-align:right;width:10%}table tbody tr:last-child td:nth-child(1){border-bottom:0px}table tbody tr:last-child td:nth-child(2){font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:14px;line-height:1.1428571429;text-align:right;border-bottom:0px}@media (min-width: 641px){table tbody tr:last-child td:nth-child(2){font-size:16px;line-height:1.25}}\n"] }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vcmRlci1zdW1tYXJ5LWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL29yZGVyLXN1bW1hcnkvcmVhZC1vcmRlci1zdW1tYXJ5LWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL29yZGVyLXN1bW1hcnkvcmVhZC1vcmRlci1zdW1tYXJ5LWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7O0lDVWpGLHdCQUF5Rjs7O0lBQTNCLHNDQUFxQjs7QURBM0YsTUFBTSxPQUFPLDhCQUErQixTQUFRLDBCQUEwQjtJQUVyRSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDL0QsQ0FBQztJQUVNLGVBQWU7UUFDcEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdkUsQ0FBQzs7OFNBUlUsOEJBQThCLFNBQTlCLDhCQUE4QjtpRkFBOUIsOEJBQThCO1FDWDNDLDhCQUFpQztRQUFBLFlBQWtDOztRQUFBLGlCQUFNO1FBQ3pFLDZCQUFzRTs7UUFDbEUsNkJBQU8sU0FBQTtRQUVILHdCQUFrRDtRQUNsRCwwQkFBSTtRQUFBLFlBQXlCOztRQUFBLGlCQUFLO1FBQ2xDLDJCQUFJO1FBQUEsYUFBZ0M7O1FBQUEsaUJBQUs7UUFDekMsMkJBQUk7UUFBQSxhQUEyQjs7UUFBQSxpQkFBSyxFQUFBLEVBQUE7UUFHeEMsOEJBQU87UUFDSCwrRUFBeUY7UUFDekYsMkJBQUk7UUFDQSxzQkFBUztRQUNULDhCQUEwQjtRQUFBLGFBQTBCOztRQUFBLGlCQUFLO1FBQ3pELDJCQUFJO1FBQUEsK0NBQWtGO1FBQUEsaUJBQUssRUFBQSxFQUFBLEVBQUE7O1FBZnRFLGVBQWtDO1FBQWxDLDJEQUFrQztRQUM1RCxlQUE4RDtRQUE5RCxnRkFBOEQ7UUFJekQsZUFBeUI7UUFBekIsb0RBQXlCO1FBQ3pCLGVBQWdDO1FBQWhDLDJEQUFnQztRQUNoQyxlQUEyQjtRQUEzQixzREFBMkI7UUFJaUIsZUFBWTtRQUFaLHVDQUFZO1FBRzlCLGVBQTBCO1FBQTFCLHFEQUEwQjtRQUN0QixlQUE0QjtRQUE1Qiw4Q0FBNEI7O3VGREp6RCw4QkFBOEI7Y0FQMUMsU0FBUzsyQkFDRSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC1yZWFkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZWVWYWx1ZSB9IGZyb20gJy4vZmVlLXZhbHVlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXJlYWQtb3JkZXItc3VtbWFyeS1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZWFkLW9yZGVyLXN1bW1hcnktZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICcuL3JlYWQtb3JkZXItc3VtbWFyeS1maWVsZC5zY3NzJ1xuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBSZWFkT3JkZXJTdW1tYXJ5RmllbGRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB7XG5cbiAgcHVibGljIGdldEZlZXMoKTogRmVlVmFsdWVbXSB7XG4gICAgcmV0dXJuIHRoaXMuY2FzZUZpZWxkLnZhbHVlID8gdGhpcy5jYXNlRmllbGQudmFsdWUuRmVlcyA6IFtdO1xuICB9XG5cbiAgcHVibGljIGdldFBheW1lbnRUb3RhbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNhc2VGaWVsZC52YWx1ZSA/IHRoaXMuY2FzZUZpZWxkLnZhbHVlLlBheW1lbnRUb3RhbCA6ICcnO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwib3JkZXItc3VtbWFyeS10aXRsZVwiPnt7J09yZGVyIFN1bW1hcnknIHwgcnB4VHJhbnNsYXRlfX08L2Rpdj5cbjx0YWJsZSBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidvcmRlciBzdW1tYXJ5IHRhYmxlJyB8IHJweFRyYW5zbGF0ZVwiPlxuICAgIDx0aGVhZD5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRoIGlkPVwiaGlkZGVuSGVhZGVyXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPjwvdGg+XG4gICAgICAgIDx0ZD57eydDb2RlJyB8IHJweFRyYW5zbGF0ZX19PC90ZD5cbiAgICAgICAgPHRkPnt7J0Rlc2NyaXB0aW9uJyB8IHJweFRyYW5zbGF0ZX19PC90ZD5cbiAgICAgICAgPHRkPnt7J0Ftb3VudCcgfCBycHhUcmFuc2xhdGV9fTwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+XG4gICAgPHRib2R5PlxuICAgICAgICA8dHIgY2NkUmVhZE9yZGVyU3VtbWFyeVJvdyAqbmdGb3I9XCJsZXQgZmVlVmFsdWUgb2YgZ2V0RmVlcygpXCIgW2ZlZVZhbHVlXT1cImZlZVZhbHVlXCI+PC90cj5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkPjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJwYXltZW50LXRvdGFsXCI+e3snVG90YWwnIHwgcnB4VHJhbnNsYXRlfX08L3RkPlxuICAgICAgICAgICAgPHRkPjxjY2QtcmVhZC1tb25leS1nYnAtZmllbGQgW2Ftb3VudF09XCJnZXRQYXltZW50VG90YWwoKVwiPjwvY2NkLXJlYWQtbW9uZXktZ2JwLWZpZWxkPjwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbjwvdGFibGU+XG4iXX0=