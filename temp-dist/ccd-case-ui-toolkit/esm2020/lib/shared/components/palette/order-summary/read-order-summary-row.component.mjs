import { Component, Input } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { FeeValue } from './fee-value.model';
import * as i0 from "@angular/core";
const _c0 = ["ccdReadOrderSummaryRow", ""];
export class ReadOrderSummaryRowComponent extends AbstractFieldReadComponent {
    ngOnInit() {
        // We don't want to register this if we don't have a caseField
        if (this.caseField) {
            super.ngOnInit();
        }
    }
    getFeeAmount() {
        return this.feeValue.value ? this.feeValue.value.FeeAmount : '';
    }
}
ReadOrderSummaryRowComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadOrderSummaryRowComponent_BaseFactory; return function ReadOrderSummaryRowComponent_Factory(t) { return (ɵReadOrderSummaryRowComponent_BaseFactory || (ɵReadOrderSummaryRowComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadOrderSummaryRowComponent)))(t || ReadOrderSummaryRowComponent); }; }();
ReadOrderSummaryRowComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadOrderSummaryRowComponent, selectors: [["", "ccdReadOrderSummaryRow", ""]], inputs: { feeValue: "feeValue" }, features: [i0.ɵɵInheritDefinitionFeature], attrs: _c0, decls: 7, vars: 5, consts: [[3, "amount"]], template: function ReadOrderSummaryRowComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "td");
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "td");
        i0.ɵɵtext(3);
        i0.ɵɵpipe(4, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "td");
        i0.ɵɵelement(6, "ccd-read-money-gbp-field", 0);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.feeValue.value.FeeCode);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 3, ctx.feeValue.value.FeeDescription));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("amount", ctx.getFeeAmount());
    } }, styles: ["td[_ngcontent-%COMP%]{padding-top:12px;padding-bottom:12px;margin:0;border-bottom:1px solid #0b0c0c;font-family:nta,Arial,sans-serif;font-weight:400;text-transform:none;font-size:14px;line-height:1.1428571429}@media (min-width: 641px){td[_ngcontent-%COMP%]{font-size:16px;line-height:1.25}}td[_ngcontent-%COMP%]:nth-child(1){width:20px}td[_ngcontent-%COMP%]:nth-child(2){width:70%}td[_ngcontent-%COMP%]:nth-child(3){text-align:right;width:10%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadOrderSummaryRowComponent, [{
        type: Component,
        args: [{ selector: '[ccdReadOrderSummaryRow]', template: "<td>{{feeValue.value.FeeCode}}</td>\n<td>{{feeValue.value.FeeDescription | rpxTranslate}}</td>\n<td><ccd-read-money-gbp-field [amount]=\"getFeeAmount()\"></ccd-read-money-gbp-field></td>\n", styles: ["td{padding-top:12px;padding-bottom:12px;margin:0;border-bottom:1px solid #0b0c0c;font-family:nta,Arial,sans-serif;font-weight:400;text-transform:none;font-size:14px;line-height:1.1428571429}@media (min-width: 641px){td{font-size:16px;line-height:1.25}}td:nth-child(1){width:20px}td:nth-child(2){width:70%}td:nth-child(3){text-align:right;width:10%}\n"] }]
    }], null, { feeValue: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vcmRlci1zdW1tYXJ5LXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9vcmRlci1zdW1tYXJ5L3JlYWQtb3JkZXItc3VtbWFyeS1yb3cuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvb3JkZXItc3VtbWFyeS9yZWFkLW9yZGVyLXN1bW1hcnktcm93Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDekYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUFVN0MsTUFBTSxPQUFPLDRCQUE2QixTQUFRLDBCQUEwQjtJQUtuRSxRQUFRO1FBQ2IsOERBQThEO1FBQzlELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBRU0sWUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNsRSxDQUFDOztvU0FkVSw0QkFBNEIsU0FBNUIsNEJBQTRCOytFQUE1Qiw0QkFBNEI7UUNaekMsMEJBQUk7UUFBQSxZQUEwQjtRQUFBLGlCQUFLO1FBQ25DLDBCQUFJO1FBQUEsWUFBZ0Q7O1FBQUEsaUJBQUs7UUFDekQsMEJBQUk7UUFBQSw4Q0FBK0U7UUFBQSxpQkFBSzs7UUFGcEYsZUFBMEI7UUFBMUIsZ0RBQTBCO1FBQzFCLGVBQWdEO1FBQWhELDZFQUFnRDtRQUN0QixlQUF5QjtRQUF6QiwyQ0FBeUI7O3VGRFUxQyw0QkFBNEI7Y0FSeEMsU0FBUzsyQkFFRSwwQkFBMEI7Z0JBUzdCLFFBQVE7a0JBRGQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL2Fic3RyYWN0LWZpZWxkLXJlYWQuY29tcG9uZW50JztcbmltcG9ydCB7IEZlZVZhbHVlIH0gZnJvbSAnLi9mZWUtdmFsdWUubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIHNlbGVjdG9yOiAnW2NjZFJlYWRPcmRlclN1bW1hcnlSb3ddJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlYWQtb3JkZXItc3VtbWFyeS1yb3cuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICcuL3JlYWQtb3JkZXItc3VtbWFyeS1yb3cuc2NzcydcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUmVhZE9yZGVyU3VtbWFyeVJvd0NvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZmVlVmFsdWU6IEZlZVZhbHVlO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAvLyBXZSBkb24ndCB3YW50IHRvIHJlZ2lzdGVyIHRoaXMgaWYgd2UgZG9uJ3QgaGF2ZSBhIGNhc2VGaWVsZFxuICAgIGlmICh0aGlzLmNhc2VGaWVsZCkge1xuICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0RmVlQW1vdW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZmVlVmFsdWUudmFsdWUgPyB0aGlzLmZlZVZhbHVlLnZhbHVlLkZlZUFtb3VudCA6ICcnO1xuICB9XG59XG4iLCI8dGQ+e3tmZWVWYWx1ZS52YWx1ZS5GZWVDb2RlfX08L3RkPlxuPHRkPnt7ZmVlVmFsdWUudmFsdWUuRmVlRGVzY3JpcHRpb24gfCBycHhUcmFuc2xhdGV9fTwvdGQ+XG48dGQ+PGNjZC1yZWFkLW1vbmV5LWdicC1maWVsZCBbYW1vdW50XT1cImdldEZlZUFtb3VudCgpXCI+PC9jY2QtcmVhZC1tb25leS1nYnAtZmllbGQ+PC90ZD5cbiJdfQ==