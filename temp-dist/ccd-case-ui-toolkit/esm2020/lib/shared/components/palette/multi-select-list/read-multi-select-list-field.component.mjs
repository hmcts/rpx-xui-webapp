import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "rpx-xui-translation";
import * as i3 from "../fixed-list/fixed-list.pipe";
function ReadMultiSelectListFieldComponent_table_0_tr_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelement(1, "th", 3);
    i0.ɵɵelementStart(2, "td")(3, "span", 4);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "rpxTranslate");
    i0.ɵɵpipe(6, "ccdFixedList");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const value_r2 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 1, i0.ɵɵpipeBind2(6, 3, value_r2, ctx_r1.caseField.field_type.fixed_list_items)));
} }
function ReadMultiSelectListFieldComponent_table_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 1);
    i0.ɵɵpipe(1, "rpxTranslate");
    i0.ɵɵelementStart(2, "tbody");
    i0.ɵɵtemplate(3, ReadMultiSelectListFieldComponent_table_0_tr_3_Template, 7, 6, "tr", 2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-describedby", i0.ɵɵpipeBind1(1, 2, "multi selection table"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r0.caseField.value);
} }
export class ReadMultiSelectListFieldComponent extends AbstractFieldReadComponent {
}
ReadMultiSelectListFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadMultiSelectListFieldComponent_BaseFactory; return function ReadMultiSelectListFieldComponent_Factory(t) { return (ɵReadMultiSelectListFieldComponent_BaseFactory || (ɵReadMultiSelectListFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadMultiSelectListFieldComponent)))(t || ReadMultiSelectListFieldComponent); }; }();
ReadMultiSelectListFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadMultiSelectListFieldComponent, selectors: [["ccd-read-multi-select-list-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["class", "multi-select-list-field-table", 4, "ngIf"], [1, "multi-select-list-field-table"], [4, "ngFor", "ngForOf"], [2, "display", "none"], [1, "text-16"]], template: function ReadMultiSelectListFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ReadMultiSelectListFieldComponent_table_0_Template, 4, 4, "table", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.caseField.value && ctx.caseField.value.length);
    } }, dependencies: [i1.NgForOf, i1.NgIf, i2.RpxTranslatePipe, i3.FixedListPipe], styles: [".multi-select-list-field-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] > td[_ngcontent-%COMP%]{padding:5px 0}.multi-select-list-field-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child > td[_ngcontent-%COMP%]{border-bottom:none}.multi-select-list-field-table[_ngcontent-%COMP%]   td.collection-actions[_ngcontent-%COMP%]{width:1px;white-space:nowrap}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadMultiSelectListFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-multi-select-list-field', template: "<table *ngIf=\"caseField.value && caseField.value.length\" class=\"multi-select-list-field-table\"\n       [attr.aria-describedby]=\"'multi selection table' | rpxTranslate\">\n  <tbody>\n    <tr *ngFor=\"let value of caseField.value\">\n      <th style=\"display: none;\"></th>\n      <td><span class=\"text-16\">{{ value | ccdFixedList:caseField.field_type.fixed_list_items | rpxTranslate}}</span></td>\n    </tr>\n  </tbody>\n</table>\n", styles: [".multi-select-list-field-table tr>td{padding:5px 0}.multi-select-list-field-table tr:last-child>td{border-bottom:none}.multi-select-list-field-table td.collection-actions{width:1px;white-space:nowrap}\n"] }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1tdWx0aS1zZWxlY3QtbGlzdC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9tdWx0aS1zZWxlY3QtbGlzdC9yZWFkLW11bHRpLXNlbGVjdC1saXN0LWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL211bHRpLXNlbGVjdC1saXN0L3JlYWQtbXVsdGktc2VsZWN0LWxpc3QtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7Ozs7SUNFckYsMEJBQTBDO0lBQ3hDLHdCQUFnQztJQUNoQywwQkFBSSxjQUFBO0lBQXNCLFlBQThFOzs7SUFBQSxpQkFBTyxFQUFBLEVBQUE7Ozs7SUFBckYsZUFBOEU7SUFBOUUsd0hBQThFOzs7SUFMOUcsZ0NBQ3dFOztJQUN0RSw2QkFBTztJQUNMLHdGQUdLO0lBQ1AsaUJBQVEsRUFBQTs7O0lBTkgsaUZBQWdFO0lBRTdDLGVBQWtCO0lBQWxCLGdEQUFrQjs7QURLNUMsTUFBTSxPQUFPLGlDQUFrQyxTQUFRLDBCQUEwQjs7NlRBQXBFLGlDQUFpQyxTQUFqQyxpQ0FBaUM7b0ZBQWpDLGlDQUFpQztRQ1I5QyxzRkFRUTs7UUFSQSx3RUFBK0M7O3VGRFExQyxpQ0FBaUM7Y0FMN0MsU0FBUzsyQkFDRSxrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC1yZWFkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1yZWFkLW11bHRpLXNlbGVjdC1saXN0LWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlYWQtbXVsdGktc2VsZWN0LWxpc3QtZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL211bHRpLXNlbGVjdC1saXN0LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSZWFkTXVsdGlTZWxlY3RMaXN0RmllbGRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB7fVxuIiwiPHRhYmxlICpuZ0lmPVwiY2FzZUZpZWxkLnZhbHVlICYmIGNhc2VGaWVsZC52YWx1ZS5sZW5ndGhcIiBjbGFzcz1cIm11bHRpLXNlbGVjdC1saXN0LWZpZWxkLXRhYmxlXCJcbiAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidtdWx0aSBzZWxlY3Rpb24gdGFibGUnIHwgcnB4VHJhbnNsYXRlXCI+XG4gIDx0Ym9keT5cbiAgICA8dHIgKm5nRm9yPVwibGV0IHZhbHVlIG9mIGNhc2VGaWVsZC52YWx1ZVwiPlxuICAgICAgPHRoIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj48L3RoPlxuICAgICAgPHRkPjxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7IHZhbHVlIHwgY2NkRml4ZWRMaXN0OmNhc2VGaWVsZC5maWVsZF90eXBlLmZpeGVkX2xpc3RfaXRlbXMgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj48L3RkPlxuICAgIDwvdHI+XG4gIDwvdGJvZHk+XG48L3RhYmxlPlxuIl19