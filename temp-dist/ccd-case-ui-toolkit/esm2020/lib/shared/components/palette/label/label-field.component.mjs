import { Component, Input } from '@angular/core';
import { CaseField } from '../../../domain/definition/case-field.model';
import * as i0 from "@angular/core";
function LabelFieldComponent_ccd_markdown_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-markdown", 2);
    i0.ɵɵpipe(1, "rpxTranslate");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("content", i0.ɵɵpipeBind1(1, 2, ctx_r0.caseField.label))("markdownUseHrefAsRouterLink", ctx_r0.markdownUseHrefAsRouterLink);
} }
function LabelFieldComponent_ccd_markdown_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-markdown", 2);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("content", ctx_r1.caseField.value || ctx_r1.caseField.label)("markdownUseHrefAsRouterLink", ctx_r1.markdownUseHrefAsRouterLink);
} }
export class LabelFieldComponent {
    constructor() {
        this.caseFields = [];
        this.labelCanBeTranslated = false;
    }
}
LabelFieldComponent.ɵfac = function LabelFieldComponent_Factory(t) { return new (t || LabelFieldComponent)(); };
LabelFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LabelFieldComponent, selectors: [["ccd-label-field"]], inputs: { caseField: "caseField", caseFields: "caseFields", labelCanBeTranslated: "labelCanBeTranslated", markdownUseHrefAsRouterLink: "markdownUseHrefAsRouterLink" }, decls: 5, vars: 6, consts: [["ccdLabelSubstitutor", "", 1, "case-field", 3, "hidden", "caseField", "contextFields", "id"], [3, "content", "markdownUseHrefAsRouterLink", 4, "ngIf"], [3, "content", "markdownUseHrefAsRouterLink"]], template: function LabelFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "dl", 0)(1, "dt");
        i0.ɵɵtemplate(2, LabelFieldComponent_ccd_markdown_2_Template, 2, 4, "ccd-markdown", 1);
        i0.ɵɵtemplate(3, LabelFieldComponent_ccd_markdown_3_Template, 1, 2, "ccd-markdown", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵelement(4, "dd");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("hidden", ctx.caseField.hidden)("caseField", ctx.caseField)("contextFields", ctx.caseFields)("id", ctx.caseField.id);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.labelCanBeTranslated);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.labelCanBeTranslated);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LabelFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-label-field', template: "<dl [hidden]=\"caseField.hidden\" class=\"case-field\" ccdLabelSubstitutor [caseField]=\"caseField\" [contextFields]=\"caseFields\" [id]=\"caseField.id\">\n  <dt>\n    <ccd-markdown *ngIf=\"labelCanBeTranslated\" [content]=\"caseField.label | rpxTranslate\" [markdownUseHrefAsRouterLink]=\"markdownUseHrefAsRouterLink\">\n    </ccd-markdown>\n\n    <ccd-markdown *ngIf=\"!labelCanBeTranslated\" [content]=\"caseField.value || caseField.label\" [markdownUseHrefAsRouterLink]=\"markdownUseHrefAsRouterLink\">\n    </ccd-markdown>\n  </dt>\n  <dd></dd>\n</dl>\n" }]
    }], null, { caseField: [{
            type: Input
        }], caseFields: [{
            type: Input
        }], labelCanBeTranslated: [{
            type: Input
        }], markdownUseHrefAsRouterLink: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbGFiZWwvbGFiZWwtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbGFiZWwvbGFiZWwtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7OztJQ0NwRSxrQ0FDZTs7OztJQUQ0QixzRUFBMEMsbUVBQUE7OztJQUdyRixrQ0FDZTs7O0lBRDZCLDBFQUE4QyxtRUFBQTs7QURFOUYsTUFBTSxPQUFPLG1CQUFtQjtJQUpoQztRQVNTLGVBQVUsR0FBZ0IsRUFBRSxDQUFDO1FBRzdCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztLQUlyQzs7c0ZBWlksbUJBQW1CO3NFQUFuQixtQkFBbUI7UUNQaEMsNkJBQWdKLFNBQUE7UUFFNUksc0ZBQ2U7UUFFZixzRkFDZTtRQUNqQixpQkFBSztRQUNMLHFCQUFTO1FBQ1gsaUJBQUs7O1FBVEQsNkNBQTJCLDRCQUFBLGlDQUFBLHdCQUFBO1FBRVosZUFBMEI7UUFBMUIsK0NBQTBCO1FBRzFCLGVBQTJCO1FBQTNCLGdEQUEyQjs7dUZERWpDLG1CQUFtQjtjQUovQixTQUFTOzJCQUNFLGlCQUFpQjtnQkFLcEIsU0FBUztrQkFEZixLQUFLO1lBSUMsVUFBVTtrQkFEaEIsS0FBSztZQUlDLG9CQUFvQjtrQkFEMUIsS0FBSztZQUlDLDJCQUEyQjtrQkFEakMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhc2VGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2Nhc2UtZmllbGQubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtbGFiZWwtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGFiZWwtZmllbGQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgTGFiZWxGaWVsZENvbXBvbmVudCB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlRmllbGQ6IENhc2VGaWVsZDtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgY2FzZUZpZWxkczogQ2FzZUZpZWxkW10gPSBbXTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgbGFiZWxDYW5CZVRyYW5zbGF0ZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgbWFya2Rvd25Vc2VIcmVmQXNSb3V0ZXJMaW5rPzogYm9vbGVhbjtcbn1cbiIsIjxkbCBbaGlkZGVuXT1cImNhc2VGaWVsZC5oaWRkZW5cIiBjbGFzcz1cImNhc2UtZmllbGRcIiBjY2RMYWJlbFN1YnN0aXR1dG9yIFtjYXNlRmllbGRdPVwiY2FzZUZpZWxkXCIgW2NvbnRleHRGaWVsZHNdPVwiY2FzZUZpZWxkc1wiIFtpZF09XCJjYXNlRmllbGQuaWRcIj5cbiAgPGR0PlxuICAgIDxjY2QtbWFya2Rvd24gKm5nSWY9XCJsYWJlbENhbkJlVHJhbnNsYXRlZFwiIFtjb250ZW50XT1cImNhc2VGaWVsZC5sYWJlbCB8IHJweFRyYW5zbGF0ZVwiIFttYXJrZG93blVzZUhyZWZBc1JvdXRlckxpbmtdPVwibWFya2Rvd25Vc2VIcmVmQXNSb3V0ZXJMaW5rXCI+XG4gICAgPC9jY2QtbWFya2Rvd24+XG5cbiAgICA8Y2NkLW1hcmtkb3duICpuZ0lmPVwiIWxhYmVsQ2FuQmVUcmFuc2xhdGVkXCIgW2NvbnRlbnRdPVwiY2FzZUZpZWxkLnZhbHVlIHx8IGNhc2VGaWVsZC5sYWJlbFwiIFttYXJrZG93blVzZUhyZWZBc1JvdXRlckxpbmtdPVwibWFya2Rvd25Vc2VIcmVmQXNSb3V0ZXJMaW5rXCI+XG4gICAgPC9jY2QtbWFya2Rvd24+XG4gIDwvZHQ+XG4gIDxkZD48L2RkPlxuPC9kbD5cbiJdfQ==