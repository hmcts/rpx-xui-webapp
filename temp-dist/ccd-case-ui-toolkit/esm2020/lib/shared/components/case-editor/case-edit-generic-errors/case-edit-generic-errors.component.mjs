import { Component, Input } from '@angular/core';
import { HttpError } from '../../../domain';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function CaseEditGenericErrorsComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "h1", 2);
    i0.ɵɵtext(2, " Something went wrong ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 3)(4, "p");
    i0.ɵɵtext(5, "We're working to fix the problem. Try again shortly.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p")(7, "a", 4);
    i0.ɵɵtext(8, "Contact us");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " if you're still having problems.");
    i0.ɵɵelementEnd()()();
} }
function CaseEditGenericErrorsComponent_div_1_ul_5_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fieldError_r4 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(fieldError_r4.message);
} }
function CaseEditGenericErrorsComponent_div_1_ul_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 7);
    i0.ɵɵtemplate(1, CaseEditGenericErrorsComponent_div_1_ul_5_li_1_Template, 2, 1, "li", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.error.details.field_errors);
} }
function CaseEditGenericErrorsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "h3", 5);
    i0.ɵɵtext(2, " The event could not be created ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, CaseEditGenericErrorsComponent_div_1_ul_5_Template, 2, 1, "ul", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.error.message);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.error.details == null ? null : ctx_r1.error.details.field_errors);
} }
export class CaseEditGenericErrorsComponent {
}
CaseEditGenericErrorsComponent.ɵfac = function CaseEditGenericErrorsComponent_Factory(t) { return new (t || CaseEditGenericErrorsComponent)(); };
CaseEditGenericErrorsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseEditGenericErrorsComponent, selectors: [["ccd-case-edit-generic-errors"]], inputs: { error: "error" }, features: [i0.ɵɵProvidersFeature([])], decls: 2, vars: 2, consts: [["class", "error-summary", "role", "group", "aria-labelledby", "edit-case-event_error-summary-heading", "tabindex", "-1", 4, "ngIf"], ["role", "group", "aria-labelledby", "edit-case-event_error-summary-heading", "tabindex", "-1", 1, "error-summary"], ["id", "edit-case-event_error-summary-heading", 1, "heading-h1", "error-summary-heading"], ["id", "edit-case-event_error-summary-body", 1, "govuk-error-summary__body"], ["href", "get-help", "target", "_blank"], ["id", "edit-case-event_error-summary-heading", 1, "heading-h3", "error-summary-heading"], ["class", "error-summary-list", 4, "ngIf"], [1, "error-summary-list"], ["class", "ccd-error-summary-li", 4, "ngFor", "ngForOf"], [1, "ccd-error-summary-li"]], template: function CaseEditGenericErrorsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseEditGenericErrorsComponent_div_0_Template, 10, 0, "div", 0);
        i0.ɵɵtemplate(1, CaseEditGenericErrorsComponent_div_1_Template, 6, 2, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.error && (!(ctx.error.callbackErrors || ctx.error.callbackWarnings || ctx.error.details) && !ctx.error.message));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.error && (ctx.error.details || ctx.error.message));
    } }, dependencies: [i1.NgForOf, i1.NgIf], styles: ["#fieldset-case-data[_ngcontent-%COMP%]{margin-bottom:30px}#fieldset-case-data[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{width:1%;white-space:nowrap;vertical-align:top}.compound-field[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:0}#confirmation-header[_ngcontent-%COMP%]{width:630px;background-color:#17958b;border:solid 1px #979797;color:#fff;text-align:center}#confirmation-body[_ngcontent-%COMP%]{width:630px;background-color:#fff}.valign-top[_ngcontent-%COMP%]{vertical-align:top}.summary-fields[_ngcontent-%COMP%]{margin-bottom:30px}.summary-fields[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .summary-fields[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-bottom:0px}a.disabled[_ngcontent-%COMP%]{pointer-events:none;cursor:default}.case-field-label[_ngcontent-%COMP%]{width:45%}.case-field-content[_ngcontent-%COMP%]{width:50%}.case-field-change[_ngcontent-%COMP%]{width:5%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseEditGenericErrorsComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-edit-generic-errors', providers: [], template: "<!-- Generic error heading and error message to be displayed only if there are no specific callback errors or warnings, or no error details -->\n<div *ngIf=\"error && (!(error.callbackErrors || error.callbackWarnings || error.details) && !error.message)\" class=\"error-summary\" role=\"group\" aria-labelledby=\"edit-case-event_error-summary-heading\" tabindex=\"-1\">\n    <h1 class=\"heading-h1 error-summary-heading\" id=\"edit-case-event_error-summary-heading\">\n      Something went wrong\n    </h1>\n    <div class=\"govuk-error-summary__body\" id=\"edit-case-event_error-summary-body\">\n      <p>We're working to fix the problem. Try again shortly.</p>\n      <p><a href=\"get-help\" target=\"_blank\">Contact us</a> if you're still having problems.</p>\n    </div>\n  </div>\n  <!-- Event error heading and error message to be displayed if there are specific error details -->\n  <div *ngIf=\"error && (error.details || error.message)\" class=\"error-summary\" role=\"group\" aria-labelledby=\"edit-case-event_error-summary-heading\" tabindex=\"-1\">\n    <h3 class=\"heading-h3 error-summary-heading\" id=\"edit-case-event_error-summary-heading\">\n      The event could not be created\n    </h3>\n    <p>{{error.message}}</p>\n    <ul *ngIf=\"error.details?.field_errors\" class=\"error-summary-list\">\n      <li *ngFor=\"let fieldError of error.details.field_errors\" class=\"ccd-error-summary-li\">{{fieldError.message}}</li>\n    </ul>\n  </div>\n  ", styles: ["#fieldset-case-data{margin-bottom:30px}#fieldset-case-data th{width:1%;white-space:nowrap;vertical-align:top}.compound-field td{padding:0}#confirmation-header{width:630px;background-color:#17958b;border:solid 1px #979797;color:#fff;text-align:center}#confirmation-body{width:630px;background-color:#fff}.valign-top{vertical-align:top}.summary-fields{margin-bottom:30px}.summary-fields tbody tr th,.summary-fields tbody tr td{border-bottom:0px}a.disabled{pointer-events:none;cursor:default}.case-field-label{width:45%}.case-field-content{width:50%}.case-field-change{width:5%}\n"] }]
    }], null, { error: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1lZGl0LWdlbmVyaWMtZXJyb3JzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWVkaXQtZ2VuZXJpYy1lcnJvcnMvY2FzZS1lZGl0LWdlbmVyaWMtZXJyb3JzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWVkaXQtZ2VuZXJpYy1lcnJvcnMvY2FzZS1lZGl0LWdlbmVyaWMtZXJyb3JzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztJQ0Q1Qyw4QkFBc04sWUFBQTtJQUVoTixzQ0FDRjtJQUFBLGlCQUFLO0lBQ0wsOEJBQStFLFFBQUE7SUFDMUUsb0VBQW9EO0lBQUEsaUJBQUk7SUFDM0QseUJBQUcsV0FBQTtJQUFtQywwQkFBVTtJQUFBLGlCQUFJO0lBQUMsaURBQWdDO0lBQUEsaUJBQUksRUFBQSxFQUFBOzs7SUFVekYsNkJBQXVGO0lBQUEsWUFBc0I7SUFBQSxpQkFBSzs7O0lBQTNCLGVBQXNCO0lBQXRCLDJDQUFzQjs7O0lBRC9HLDZCQUFtRTtJQUNqRSx3RkFBa0g7SUFDcEgsaUJBQUs7OztJQUR3QixlQUE2QjtJQUE3QiwyREFBNkI7OztJQU41RCw4QkFBZ0ssWUFBQTtJQUU1SixnREFDRjtJQUFBLGlCQUFLO0lBQ0wseUJBQUc7SUFBQSxZQUFpQjtJQUFBLGlCQUFJO0lBQ3hCLG1GQUVLO0lBQ1AsaUJBQU07OztJQUpELGVBQWlCO0lBQWpCLDBDQUFpQjtJQUNmLGVBQWlDO0lBQWpDLDhGQUFpQzs7QUROMUMsTUFBTSxPQUFPLDhCQUE4Qjs7NEdBQTlCLDhCQUE4QjtpRkFBOUIsOEJBQThCLDhHQUY5QixFQUFFO1FDUGYsZ0ZBUVE7UUFFTiwrRUFRTTs7UUFsQkYsMElBQXFHO1FBVW5HLGVBQStDO1FBQS9DLDRFQUErQzs7dUZERDFDLDhCQUE4QjtjQU4xQyxTQUFTOzJCQUNFLDhCQUE4QixhQUc3QixFQUFFO2dCQUdHLEtBQUs7a0JBQXBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEh0dHBFcnJvciB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1jYXNlLWVkaXQtZ2VuZXJpYy1lcnJvcnMnLFxuICB0ZW1wbGF0ZVVybDogJ2Nhc2UtZWRpdC1nZW5lcmljLWVycm9ycy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuLi9jYXNlLWVkaXQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIENhc2VFZGl0R2VuZXJpY0Vycm9yc0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBlcnJvcjogSHR0cEVycm9yO1xufVxuIiwiPCEtLSBHZW5lcmljIGVycm9yIGhlYWRpbmcgYW5kIGVycm9yIG1lc3NhZ2UgdG8gYmUgZGlzcGxheWVkIG9ubHkgaWYgdGhlcmUgYXJlIG5vIHNwZWNpZmljIGNhbGxiYWNrIGVycm9ycyBvciB3YXJuaW5ncywgb3Igbm8gZXJyb3IgZGV0YWlscyAtLT5cbjxkaXYgKm5nSWY9XCJlcnJvciAmJiAoIShlcnJvci5jYWxsYmFja0Vycm9ycyB8fCBlcnJvci5jYWxsYmFja1dhcm5pbmdzIHx8IGVycm9yLmRldGFpbHMpICYmICFlcnJvci5tZXNzYWdlKVwiIGNsYXNzPVwiZXJyb3Itc3VtbWFyeVwiIHJvbGU9XCJncm91cFwiIGFyaWEtbGFiZWxsZWRieT1cImVkaXQtY2FzZS1ldmVudF9lcnJvci1zdW1tYXJ5LWhlYWRpbmdcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgPGgxIGNsYXNzPVwiaGVhZGluZy1oMSBlcnJvci1zdW1tYXJ5LWhlYWRpbmdcIiBpZD1cImVkaXQtY2FzZS1ldmVudF9lcnJvci1zdW1tYXJ5LWhlYWRpbmdcIj5cbiAgICAgIFNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgPC9oMT5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fYm9keVwiIGlkPVwiZWRpdC1jYXNlLWV2ZW50X2Vycm9yLXN1bW1hcnktYm9keVwiPlxuICAgICAgPHA+V2UncmUgd29ya2luZyB0byBmaXggdGhlIHByb2JsZW0uIFRyeSBhZ2FpbiBzaG9ydGx5LjwvcD5cbiAgICAgIDxwPjxhIGhyZWY9XCJnZXQtaGVscFwiIHRhcmdldD1cIl9ibGFua1wiPkNvbnRhY3QgdXM8L2E+IGlmIHlvdSdyZSBzdGlsbCBoYXZpbmcgcHJvYmxlbXMuPC9wPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPCEtLSBFdmVudCBlcnJvciBoZWFkaW5nIGFuZCBlcnJvciBtZXNzYWdlIHRvIGJlIGRpc3BsYXllZCBpZiB0aGVyZSBhcmUgc3BlY2lmaWMgZXJyb3IgZGV0YWlscyAtLT5cbiAgPGRpdiAqbmdJZj1cImVycm9yICYmIChlcnJvci5kZXRhaWxzIHx8IGVycm9yLm1lc3NhZ2UpXCIgY2xhc3M9XCJlcnJvci1zdW1tYXJ5XCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZWRpdC1jYXNlLWV2ZW50X2Vycm9yLXN1bW1hcnktaGVhZGluZ1wiIHRhYmluZGV4PVwiLTFcIj5cbiAgICA8aDMgY2xhc3M9XCJoZWFkaW5nLWgzIGVycm9yLXN1bW1hcnktaGVhZGluZ1wiIGlkPVwiZWRpdC1jYXNlLWV2ZW50X2Vycm9yLXN1bW1hcnktaGVhZGluZ1wiPlxuICAgICAgVGhlIGV2ZW50IGNvdWxkIG5vdCBiZSBjcmVhdGVkXG4gICAgPC9oMz5cbiAgICA8cD57e2Vycm9yLm1lc3NhZ2V9fTwvcD5cbiAgICA8dWwgKm5nSWY9XCJlcnJvci5kZXRhaWxzPy5maWVsZF9lcnJvcnNcIiBjbGFzcz1cImVycm9yLXN1bW1hcnktbGlzdFwiPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBmaWVsZEVycm9yIG9mIGVycm9yLmRldGFpbHMuZmllbGRfZXJyb3JzXCIgY2xhc3M9XCJjY2QtZXJyb3Itc3VtbWFyeS1saVwiPnt7ZmllbGRFcnJvci5tZXNzYWdlfX08L2xpPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuICAiXX0=