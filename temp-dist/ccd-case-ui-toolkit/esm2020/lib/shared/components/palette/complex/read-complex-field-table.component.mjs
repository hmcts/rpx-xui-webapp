import { Component, Input } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
function ReadComplexFieldTableComponent_ng_container_9_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "tr", 7)(2, "td", 8)(3, "span", 2);
    i0.ɵɵelement(4, "ccd-field-read", 9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const field_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("hidden", field_r1.hidden);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("topLevelFormGroup", ctx_r2.topLevelFormGroup)("caseField", field_r1)("context", ctx_r2.context);
} }
function ReadComplexFieldTableComponent_ng_container_9_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 10)(1, "th", 11)(2, "span", 2);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "td")(6, "span", 2);
    i0.ɵɵelement(7, "ccd-field-read", 9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const field_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("hidden", field_r1.hidden);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 5, field_r1.label));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("topLevelFormGroup", ctx_r4.topLevelFormGroup)("caseField", field_r1)("context", ctx_r4.context);
} }
function ReadComplexFieldTableComponent_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ReadComplexFieldTableComponent_ng_container_9_ng_container_1_Template, 5, 4, "ng-container", 5);
    i0.ɵɵpipe(2, "ccdIsCompound");
    i0.ɵɵtemplate(3, ReadComplexFieldTableComponent_ng_container_9_ng_template_3_Template, 8, 7, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const field_r1 = ctx.$implicit;
    const _r3 = i0.ɵɵreference(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(2, 2, field_r1))("ngIfElse", _r3);
} }
export class ReadComplexFieldTableComponent extends AbstractFieldReadComponent {
    constructor() {
        super(...arguments);
        this.caseFields = [];
    }
}
ReadComplexFieldTableComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadComplexFieldTableComponent_BaseFactory; return function ReadComplexFieldTableComponent_Factory(t) { return (ɵReadComplexFieldTableComponent_BaseFactory || (ɵReadComplexFieldTableComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadComplexFieldTableComponent)))(t || ReadComplexFieldTableComponent); }; }();
ReadComplexFieldTableComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadComplexFieldTableComponent, selectors: [["ccd-read-complex-field-table"]], inputs: { caseFields: "caseFields" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 11, vars: 9, consts: [[1, "complex-panel"], [1, "complex-panel-title"], [1, "text-16"], ["aria-describedby", "complex field table", 1, "complex-panel-table"], [4, "ngFor", "ngForOf"], [4, "ngIf", "ngIfElse"], ["SimpleRow", ""], [1, "complex-panel-compound-field", 3, "hidden"], ["colspan", "2"], [3, "topLevelFormGroup", "caseField", "context"], [1, "complex-panel-simple-field", 3, "hidden"], ["id", "complex-panel-simple-field-label"]], template: function ReadComplexFieldTableComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "dl", 1)(2, "dt")(3, "span", 2);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelement(6, "dd");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "table", 3)(8, "tbody");
        i0.ɵɵtemplate(9, ReadComplexFieldTableComponent_ng_container_9_Template, 5, 4, "ng-container", 4);
        i0.ɵɵpipe(10, "ccdReadFieldsFilter");
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 2, ctx.caseField.label));
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind4(10, 4, ctx.caseField, false, undefined, true));
    } }, styles: [".complex-panel[_ngcontent-%COMP%]{margin:13px 0;border:1px solid #bfc1c3}.complex-panel[_ngcontent-%COMP%]   .complex-panel-title[_ngcontent-%COMP%]{background-color:#dee0e2;padding:5px 5px 2px;border-bottom:1px solid #bfc1c3;display:block;color:#0b0c0c;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel[_ngcontent-%COMP%]   .complex-panel-title[_ngcontent-%COMP%]{font-size:19px;line-height:1.3157894737}}.complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{vertical-align:top}.complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > th[_ngcontent-%COMP%], .complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > td[_ngcontent-%COMP%]{border-bottom:none}.complex-panel[_ngcontent-%COMP%]   .complex-panel-simple-field[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding-left:5px;width:295px}.complex-panel[_ngcontent-%COMP%]   .complex-panel-compound-field[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:5px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadComplexFieldTableComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-complex-field-table', template: "<div class=\"complex-panel\">\n  <dl class=\"complex-panel-title\"><dt><span class=\"text-16\">{{caseField.label | rpxTranslate}}</span></dt><dd></dd></dl>\n  <table class=\"complex-panel-table\" aria-describedby=\"complex field table\">\n    <tbody>\n      <ng-container *ngFor=\"let field of caseField | ccdReadFieldsFilter:false :undefined :true\">\n        <ng-container *ngIf=\"(field | ccdIsCompound); else SimpleRow\">\n          <tr class=\"complex-panel-compound-field\" [hidden]=\"field.hidden\">\n            <td colspan=\"2\">\n              <span class=\"text-16\">\n                <ccd-field-read [topLevelFormGroup]=\"topLevelFormGroup\"\n                  [caseField]=\"field\" [context]=\"context\"></ccd-field-read>\n              </span>\n            </td>\n          </tr>\n        </ng-container>\n        <ng-template #SimpleRow>\n          <tr class=\"complex-panel-simple-field\" [hidden]=\"field.hidden\">\n            <th id=\"complex-panel-simple-field-label\"><span class=\"text-16\">{{field.label | rpxTranslate}}</span></th>\n            <td>\n                <span class=\"text-16\">\n                  <ccd-field-read [topLevelFormGroup]=\"topLevelFormGroup\"\n                    [caseField]=\"field\" [context]=\"context\"></ccd-field-read>\n                </span>\n            </td>\n          </tr>\n        </ng-template>\n      </ng-container>\n    </tbody>\n  </table>\n</div>\n", styles: [".complex-panel{margin:13px 0;border:1px solid #bfc1c3}.complex-panel .complex-panel-title{background-color:#dee0e2;padding:5px 5px 2px;border-bottom:1px solid #bfc1c3;display:block;color:#0b0c0c;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel .complex-panel-title{font-size:19px;line-height:1.3157894737}}.complex-panel .complex-panel-table>tbody>tr>th{vertical-align:top}.complex-panel .complex-panel-table>tbody>tr:last-child>th,.complex-panel .complex-panel-table>tbody>tr:last-child>td{border-bottom:none}.complex-panel .complex-panel-simple-field th{padding-left:5px;width:295px}.complex-panel .complex-panel-compound-field td{padding:5px}\n"] }]
    }], null, { caseFields: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1jb21wbGV4LWZpZWxkLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2NvbXBsZXgvcmVhZC1jb21wbGV4LWZpZWxkLXRhYmxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2NvbXBsZXgvcmVhZC1jb21wbGV4LWZpZWxkLXRhYmxlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7OztJQ0dqRiw2QkFBOEQ7SUFDNUQsNkJBQWlFLFlBQUEsY0FBQTtJQUczRCxvQ0FDMkQ7SUFDN0QsaUJBQU8sRUFBQSxFQUFBO0lBR2IsMEJBQWU7Ozs7SUFSNEIsZUFBdUI7SUFBdkIsd0NBQXVCO0lBRzFDLGVBQXVDO0lBQXZDLDREQUF1Qyx1QkFBQSwyQkFBQTs7O0lBTzdELDhCQUErRCxhQUFBLGNBQUE7SUFDRyxZQUE4Qjs7SUFBQSxpQkFBTyxFQUFBO0lBQ3JHLDBCQUFJLGNBQUE7SUFFRSxvQ0FDMkQ7SUFDN0QsaUJBQU8sRUFBQSxFQUFBOzs7O0lBTjBCLHdDQUF1QjtJQUNJLGVBQThCO0lBQTlCLDBEQUE4QjtJQUd4RSxlQUF1QztJQUF2Qyw0REFBdUMsdUJBQUEsMkJBQUE7OztJQWhCbkUsNkJBQTJGO0lBQ3pGLGdIQVNlOztJQUNmLCtJQVVjO0lBQ2hCLDBCQUFlOzs7O0lBckJFLGVBQStCO0lBQS9CLHFEQUErQixpQkFBQTs7QURJdEQsTUFBTSxPQUFPLDhCQUErQixTQUFRLDBCQUEwQjtJQUw5RTs7UUFPUyxlQUFVLEdBQWdCLEVBQUUsQ0FBQztLQUNyQzs7OFNBSFksOEJBQThCLFNBQTlCLDhCQUE4QjtpRkFBOUIsOEJBQThCO1FDVDNDLDhCQUEyQixZQUFBLFNBQUEsY0FBQTtRQUNpQyxZQUFrQzs7UUFBQSxpQkFBTyxFQUFBO1FBQUsscUJBQVM7UUFBQSxpQkFBSztRQUN0SCxnQ0FBMEUsWUFBQTtRQUV0RSxpR0FzQmU7O1FBQ2pCLGlCQUFRLEVBQUEsRUFBQTs7UUExQmdELGVBQWtDO1FBQWxDLCtEQUFrQztRQUd4RCxlQUF5RDtRQUF6RCxzRkFBeUQ7O3VGREtsRiw4QkFBOEI7Y0FMMUMsU0FBUzsyQkFDRSw4QkFBOEI7Z0JBTWpDLFVBQVU7a0JBRGhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtcmVhZC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtcmVhZC1jb21wbGV4LWZpZWxkLXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlYWQtY29tcGxleC1maWVsZC10YWJsZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVhZC1jb21wbGV4LWZpZWxkLXRhYmxlLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSZWFkQ29tcGxleEZpZWxkVGFibGVDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlRmllbGRzOiBDYXNlRmllbGRbXSA9IFtdO1xufVxuIiwiPGRpdiBjbGFzcz1cImNvbXBsZXgtcGFuZWxcIj5cbiAgPGRsIGNsYXNzPVwiY29tcGxleC1wYW5lbC10aXRsZVwiPjxkdD48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57e2Nhc2VGaWVsZC5sYWJlbCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPjwvZHQ+PGRkPjwvZGQ+PC9kbD5cbiAgPHRhYmxlIGNsYXNzPVwiY29tcGxleC1wYW5lbC10YWJsZVwiIGFyaWEtZGVzY3JpYmVkYnk9XCJjb21wbGV4IGZpZWxkIHRhYmxlXCI+XG4gICAgPHRib2R5PlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGQgb2YgY2FzZUZpZWxkIHwgY2NkUmVhZEZpZWxkc0ZpbHRlcjpmYWxzZSA6dW5kZWZpbmVkIDp0cnVlXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIoZmllbGQgfCBjY2RJc0NvbXBvdW5kKTsgZWxzZSBTaW1wbGVSb3dcIj5cbiAgICAgICAgICA8dHIgY2xhc3M9XCJjb21wbGV4LXBhbmVsLWNvbXBvdW5kLWZpZWxkXCIgW2hpZGRlbl09XCJmaWVsZC5oaWRkZW5cIj5cbiAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtMTZcIj5cbiAgICAgICAgICAgICAgICA8Y2NkLWZpZWxkLXJlYWQgW3RvcExldmVsRm9ybUdyb3VwXT1cInRvcExldmVsRm9ybUdyb3VwXCJcbiAgICAgICAgICAgICAgICAgIFtjYXNlRmllbGRdPVwiZmllbGRcIiBbY29udGV4dF09XCJjb250ZXh0XCI+PC9jY2QtZmllbGQtcmVhZD5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNTaW1wbGVSb3c+XG4gICAgICAgICAgPHRyIGNsYXNzPVwiY29tcGxleC1wYW5lbC1zaW1wbGUtZmllbGRcIiBbaGlkZGVuXT1cImZpZWxkLmhpZGRlblwiPlxuICAgICAgICAgICAgPHRoIGlkPVwiY29tcGxleC1wYW5lbC1zaW1wbGUtZmllbGQtbGFiZWxcIj48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57e2ZpZWxkLmxhYmVsIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+PC90aD5cbiAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtMTZcIj5cbiAgICAgICAgICAgICAgICAgIDxjY2QtZmllbGQtcmVhZCBbdG9wTGV2ZWxGb3JtR3JvdXBdPVwidG9wTGV2ZWxGb3JtR3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICBbY2FzZUZpZWxkXT1cImZpZWxkXCIgW2NvbnRleHRdPVwiY29udGV4dFwiPjwvY2NkLWZpZWxkLXJlYWQ+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC90Ym9keT5cbiAgPC90YWJsZT5cbjwvZGl2PlxuIl19