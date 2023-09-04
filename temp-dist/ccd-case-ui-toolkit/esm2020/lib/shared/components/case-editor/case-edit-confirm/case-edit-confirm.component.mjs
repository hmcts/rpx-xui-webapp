import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldsUtils } from '../../../services/fields/fields.utils';
import { CaseEditComponent } from '../case-edit/case-edit.component';
import * as i0 from "@angular/core";
import * as i1 from "../case-edit/case-edit.component";
import * as i2 from "@angular/router";
function CaseEditConfirmComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div");
} }
function CaseEditConfirmComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-markdown", 8);
    i0.ɵɵpipe(1, "ccdCaseTitle");
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("content", i0.ɵɵpipeBind3(1, 1, ctx_r2.getCaseTitle(), ctx_r2.caseFields, ctx_r2.editForm.controls["data"]));
} }
function CaseEditConfirmComponent_ng_template_6_h2_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2", 10);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdCaseReference");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("#", i0.ɵɵpipeBind1(2, 1, ctx_r7.getCaseId()), "");
} }
function CaseEditConfirmComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CaseEditConfirmComponent_ng_template_6_h2_0_Template, 3, 3, "h2", 9);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", ctx_r4.getCaseId());
} }
function CaseEditConfirmComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "ccd-markdown", 8);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("content", i0.ɵɵpipeBind1(2, 1, ctx_r5.confirmation.getHeader()));
} }
function CaseEditConfirmComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelement(1, "ccd-markdown", 8);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("content", i0.ɵɵpipeBind1(2, 1, ctx_r6.confirmation.getBody()));
} }
export class CaseEditConfirmComponent {
    constructor(caseEdit, router) {
        this.caseEdit = caseEdit;
        this.router = router;
        this.triggerText = 'Close and Return to case details';
        this.formGroup = new FormControl();
        this.eventTrigger = this.caseEdit.eventTrigger;
        this.editForm = this.caseEdit.form;
        this.caseFields = this.getCaseFields();
        if (this.caseEdit.confirmation) {
            this.confirmation = this.caseEdit.confirmation;
        }
        else {
            this.router.navigate(['/']);
        }
    }
    submit() {
        this.caseEdit.submitted.emit({ caseId: this.confirmation.getCaseId(), status: this.confirmation.getStatus() });
    }
    getCaseId() {
        return this.caseEdit?.caseDetails?.case_id || '';
    }
    getCaseTitle() {
        return (this.caseEdit.caseDetails && this.caseEdit.caseDetails.state &&
            this.caseEdit.caseDetails.state.title_display ? this.caseEdit.caseDetails.state.title_display : '');
    }
    getCaseFields() {
        if (this.caseEdit.caseDetails) {
            return FieldsUtils.getCaseFields(this.caseEdit.caseDetails);
        }
        return this.eventTrigger.case_fields;
    }
}
CaseEditConfirmComponent.ɵfac = function CaseEditConfirmComponent_Factory(t) { return new (t || CaseEditConfirmComponent)(i0.ɵɵdirectiveInject(i1.CaseEditComponent), i0.ɵɵdirectiveInject(i2.Router)); };
CaseEditConfirmComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseEditConfirmComponent, selectors: [["ng-component"]], decls: 14, vars: 12, consts: [[1, "heading-h1"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["titleBlock", ""], ["idBlock", ""], [3, "formGroup", "submit"], ["id", "confirmation-header", 4, "ngIf"], ["id", "confirmation-body", 4, "ngIf"], ["type", "submit", "data-ng-click", "submit()", 1, "button"], [3, "content"], ["class", "heading-h2", 4, "ngIf"], [1, "heading-h2"], ["id", "confirmation-header"], ["id", "confirmation-body"]], template: function CaseEditConfirmComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "h1", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, CaseEditConfirmComponent_div_3_Template, 1, 0, "div", 1);
        i0.ɵɵtemplate(4, CaseEditConfirmComponent_ng_template_4_Template, 2, 5, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(6, CaseEditConfirmComponent_ng_template_6_Template, 1, 1, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementStart(8, "form", 4);
        i0.ɵɵlistener("submit", function CaseEditConfirmComponent_Template_form_submit_8_listener() { return ctx.submit(); });
        i0.ɵɵtemplate(9, CaseEditConfirmComponent_div_9_Template, 3, 3, "div", 5);
        i0.ɵɵtemplate(10, CaseEditConfirmComponent_div_10_Template, 3, 3, "div", 6);
        i0.ɵɵelementStart(11, "button", 7);
        i0.ɵɵtext(12);
        i0.ɵɵpipe(13, "rpxTranslate");
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(5);
        const _r3 = i0.ɵɵreference(7);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 8, ctx.eventTrigger.name));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.getCaseTitle())("ngIfThen", _r1)("ngIfElse", _r3);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("formGroup", ctx.formGroup);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.confirmation.getHeader());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.confirmation.getBody());
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 10, ctx.triggerText));
    } }, styles: ["#fieldset-case-data[_ngcontent-%COMP%]{margin-bottom:30px}#fieldset-case-data[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{width:1%;white-space:nowrap;vertical-align:top}.compound-field[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:0}#confirmation-header[_ngcontent-%COMP%]{width:630px;background-color:#17958b;border:solid 1px #979797;color:#fff;text-align:center}#confirmation-body[_ngcontent-%COMP%]{width:630px;background-color:#fff}.valign-top[_ngcontent-%COMP%]{vertical-align:top}.summary-fields[_ngcontent-%COMP%]{margin-bottom:30px}.summary-fields[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .summary-fields[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-bottom:0px}a.disabled[_ngcontent-%COMP%]{pointer-events:none;cursor:default}.case-field-label[_ngcontent-%COMP%]{width:45%}.case-field-content[_ngcontent-%COMP%]{width:50%}.case-field-change[_ngcontent-%COMP%]{width:5%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseEditConfirmComponent, [{
        type: Component,
        args: [{ template: "<!-- Current Page && Event trigger name -->\n<h1 class=\"heading-h1\">{{ eventTrigger.name | rpxTranslate}}</h1>\n\n<!--Case ID or Title -->\n<div *ngIf=\"getCaseTitle(); then titleBlock; else idBlock\"></div>\n<ng-template #titleBlock>\n  <ccd-markdown [content]=\"getCaseTitle() | ccdCaseTitle: caseFields : editForm.controls['data']\"></ccd-markdown>\n</ng-template>\n<ng-template #idBlock>\n  <h2 *ngIf=\"getCaseId()\" class=\"heading-h2\">#{{ getCaseId() | ccdCaseReference }}</h2>\n</ng-template>\n\n<form [formGroup]=\"formGroup\" (submit)=\"submit()\">\n  <div id=\"confirmation-header\" *ngIf=\"confirmation.getHeader()\">\n    <ccd-markdown [content]=\"confirmation.getHeader() | rpxTranslate\"></ccd-markdown>\n  </div>\n  <div id=\"confirmation-body\" *ngIf=\"confirmation.getBody()\">\n    <ccd-markdown [content]=\"confirmation.getBody() | rpxTranslate\"></ccd-markdown>\n  </div>\n  <button type=\"submit\" class=\"button\" data-ng-click=\"submit()\">{{triggerText | rpxTranslate}}</button>\n</form>\n", styles: ["#fieldset-case-data{margin-bottom:30px}#fieldset-case-data th{width:1%;white-space:nowrap;vertical-align:top}.compound-field td{padding:0}#confirmation-header{width:630px;background-color:#17958b;border:solid 1px #979797;color:#fff;text-align:center}#confirmation-body{width:630px;background-color:#fff}.valign-top{vertical-align:top}.summary-fields{margin-bottom:30px}.summary-fields tbody tr th,.summary-fields tbody tr td{border-bottom:0px}a.disabled{pointer-events:none;cursor:default}.case-field-label{width:45%}.case-field-content{width:50%}.case-field-change{width:5%}\n"] }]
    }], function () { return [{ type: i1.CaseEditComponent }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1lZGl0LWNvbmZpcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Nhc2UtZWRpdG9yL2Nhc2UtZWRpdC1jb25maXJtL2Nhc2UtZWRpdC1jb25maXJtLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWVkaXQtY29uZmlybS9jYXNlLWVkaXQtY29uZmlybS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFdBQVcsRUFBb0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFJekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7OztJQ0hyRSxzQkFBaUU7OztJQUUvRCxrQ0FBK0c7Ozs7SUFBakcsMEhBQWlGOzs7SUFHL0YsOEJBQTJDO0lBQUEsWUFBcUM7O0lBQUEsaUJBQUs7OztJQUExQyxlQUFxQztJQUFyQyx3RUFBcUM7OztJQUFoRixxRkFBcUY7OztJQUFoRix5Q0FBaUI7OztJQUl0QiwrQkFBK0Q7SUFDN0Qsa0NBQWlGOztJQUNuRixpQkFBTTs7O0lBRFUsZUFBbUQ7SUFBbkQsK0VBQW1EOzs7SUFFbkUsK0JBQTJEO0lBQ3pELGtDQUErRTs7SUFDakYsaUJBQU07OztJQURVLGVBQWlEO0lBQWpELDZFQUFpRDs7QURIbkUsTUFBTSxPQUFPLHdCQUF3QjtJQVFuQyxZQUE2QixRQUEyQixFQUFtQixNQUFjO1FBQTVELGFBQVEsR0FBUixRQUFRLENBQW1CO1FBQW1CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFObEYsZ0JBQVcsR0FBRyxrQ0FBa0MsQ0FBQztRQUNqRCxjQUFTLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQU1uQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTtZQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO1NBQ2hEO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBRU0sU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRU0sWUFBWTtRQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4RyxDQUFDO0lBRU8sYUFBYTtRQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQzdCLE9BQU8sV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzdEO1FBRUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztJQUN2QyxDQUFDOztnR0F0Q1Usd0JBQXdCOzJFQUF4Qix3QkFBd0I7UUNickMsNkJBQXVCO1FBQUEsWUFBcUM7O1FBQUEsaUJBQUs7UUFHakUseUVBQWlFO1FBQ2pFLDBIQUVjO1FBQ2QsMEhBRWM7UUFFZCwrQkFBa0Q7UUFBcEIscUdBQVUsWUFBUSxJQUFDO1FBQy9DLHlFQUVNO1FBQ04sMkVBRU07UUFDTixrQ0FBOEQ7UUFBQSxhQUE4Qjs7UUFBQSxpQkFBUyxFQUFBOzs7O1FBbEJoRixlQUFxQztRQUFyQyxpRUFBcUM7UUFHdEQsZUFBc0I7UUFBdEIseUNBQXNCLGlCQUFBLGlCQUFBO1FBUXRCLGVBQXVCO1FBQXZCLHlDQUF1QjtRQUNJLGVBQThCO1FBQTlCLG1EQUE4QjtRQUdoQyxlQUE0QjtRQUE1QixpREFBNEI7UUFHSyxlQUE4QjtRQUE5Qiw2REFBOEI7O3VGRExqRix3QkFBd0I7Y0FKcEMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBDYXNlRXZlbnRUcmlnZ2VyIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2Nhc2Utdmlldy9jYXNlLWV2ZW50LXRyaWdnZXIubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS1maWVsZC5tb2RlbCc7XG5pbXBvcnQgeyBGaWVsZHNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2ZpZWxkcy9maWVsZHMudXRpbHMnO1xuaW1wb3J0IHsgQ2FzZUVkaXRDb21wb25lbnQgfSBmcm9tICcuLi9jYXNlLWVkaXQvY2FzZS1lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maXJtYXRpb24gfSBmcm9tICcuLi9kb21haW4vY29uZmlybWF0aW9uLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAnLi9jYXNlLWVkaXQtY29uZmlybS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4uL2Nhc2UtZWRpdC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FzZUVkaXRDb25maXJtQ29tcG9uZW50IHtcbiAgcHVibGljIGV2ZW50VHJpZ2dlcjogQ2FzZUV2ZW50VHJpZ2dlcjtcbiAgcHVibGljIHRyaWdnZXJUZXh0ID0gJ0Nsb3NlIGFuZCBSZXR1cm4gdG8gY2FzZSBkZXRhaWxzJztcbiAgcHVibGljIGZvcm1Hcm91cCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICBwdWJsaWMgY29uZmlybWF0aW9uOiBDb25maXJtYXRpb247XG4gIHB1YmxpYyBjYXNlRmllbGRzOiBDYXNlRmllbGRbXTtcbiAgcHVibGljIGVkaXRGb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgY2FzZUVkaXQ6IENhc2VFZGl0Q29tcG9uZW50LCBwcml2YXRlIHJlYWRvbmx5IHJvdXRlcjogUm91dGVyKSB7XG4gICAgdGhpcy5ldmVudFRyaWdnZXIgPSB0aGlzLmNhc2VFZGl0LmV2ZW50VHJpZ2dlcjtcbiAgICB0aGlzLmVkaXRGb3JtID0gdGhpcy5jYXNlRWRpdC5mb3JtO1xuICAgIHRoaXMuY2FzZUZpZWxkcyA9IHRoaXMuZ2V0Q2FzZUZpZWxkcygpO1xuICAgIGlmICh0aGlzLmNhc2VFZGl0LmNvbmZpcm1hdGlvbikge1xuICAgICAgdGhpcy5jb25maXJtYXRpb24gPSB0aGlzLmNhc2VFZGl0LmNvbmZpcm1hdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdWJtaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jYXNlRWRpdC5zdWJtaXR0ZWQuZW1pdCh7IGNhc2VJZDogdGhpcy5jb25maXJtYXRpb24uZ2V0Q2FzZUlkKCksIHN0YXR1czogdGhpcy5jb25maXJtYXRpb24uZ2V0U3RhdHVzKCkgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2FzZUlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY2FzZUVkaXQ/LmNhc2VEZXRhaWxzPy5jYXNlX2lkIHx8ICcnO1xuICB9XG5cbiAgcHVibGljIGdldENhc2VUaXRsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5jYXNlRWRpdC5jYXNlRGV0YWlscyAmJiB0aGlzLmNhc2VFZGl0LmNhc2VEZXRhaWxzLnN0YXRlICYmXG4gICAgICB0aGlzLmNhc2VFZGl0LmNhc2VEZXRhaWxzLnN0YXRlLnRpdGxlX2Rpc3BsYXkgPyB0aGlzLmNhc2VFZGl0LmNhc2VEZXRhaWxzLnN0YXRlLnRpdGxlX2Rpc3BsYXkgOiAnJyk7XG4gIH1cblxuICBwcml2YXRlIGdldENhc2VGaWVsZHMoKTogQ2FzZUZpZWxkW10ge1xuICAgIGlmICh0aGlzLmNhc2VFZGl0LmNhc2VEZXRhaWxzKSB7XG4gICAgICByZXR1cm4gRmllbGRzVXRpbHMuZ2V0Q2FzZUZpZWxkcyh0aGlzLmNhc2VFZGl0LmNhc2VEZXRhaWxzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5ldmVudFRyaWdnZXIuY2FzZV9maWVsZHM7XG4gIH1cbn1cbiIsIjwhLS0gQ3VycmVudCBQYWdlICYmIEV2ZW50IHRyaWdnZXIgbmFtZSAtLT5cbjxoMSBjbGFzcz1cImhlYWRpbmctaDFcIj57eyBldmVudFRyaWdnZXIubmFtZSB8IHJweFRyYW5zbGF0ZX19PC9oMT5cblxuPCEtLUNhc2UgSUQgb3IgVGl0bGUgLS0+XG48ZGl2ICpuZ0lmPVwiZ2V0Q2FzZVRpdGxlKCk7IHRoZW4gdGl0bGVCbG9jazsgZWxzZSBpZEJsb2NrXCI+PC9kaXY+XG48bmctdGVtcGxhdGUgI3RpdGxlQmxvY2s+XG4gIDxjY2QtbWFya2Rvd24gW2NvbnRlbnRdPVwiZ2V0Q2FzZVRpdGxlKCkgfCBjY2RDYXNlVGl0bGU6IGNhc2VGaWVsZHMgOiBlZGl0Rm9ybS5jb250cm9sc1snZGF0YSddXCI+PC9jY2QtbWFya2Rvd24+XG48L25nLXRlbXBsYXRlPlxuPG5nLXRlbXBsYXRlICNpZEJsb2NrPlxuICA8aDIgKm5nSWY9XCJnZXRDYXNlSWQoKVwiIGNsYXNzPVwiaGVhZGluZy1oMlwiPiN7eyBnZXRDYXNlSWQoKSB8IGNjZENhc2VSZWZlcmVuY2UgfX08L2gyPlxuPC9uZy10ZW1wbGF0ZT5cblxuPGZvcm0gW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIiAoc3VibWl0KT1cInN1Ym1pdCgpXCI+XG4gIDxkaXYgaWQ9XCJjb25maXJtYXRpb24taGVhZGVyXCIgKm5nSWY9XCJjb25maXJtYXRpb24uZ2V0SGVhZGVyKClcIj5cbiAgICA8Y2NkLW1hcmtkb3duIFtjb250ZW50XT1cImNvbmZpcm1hdGlvbi5nZXRIZWFkZXIoKSB8IHJweFRyYW5zbGF0ZVwiPjwvY2NkLW1hcmtkb3duPlxuICA8L2Rpdj5cbiAgPGRpdiBpZD1cImNvbmZpcm1hdGlvbi1ib2R5XCIgKm5nSWY9XCJjb25maXJtYXRpb24uZ2V0Qm9keSgpXCI+XG4gICAgPGNjZC1tYXJrZG93biBbY29udGVudF09XCJjb25maXJtYXRpb24uZ2V0Qm9keSgpIHwgcnB4VHJhbnNsYXRlXCI+PC9jY2QtbWFya2Rvd24+XG4gIDwvZGl2PlxuICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvblwiIGRhdGEtbmctY2xpY2s9XCJzdWJtaXQoKVwiPnt7dHJpZ2dlclRleHQgfCBycHhUcmFuc2xhdGV9fTwvYnV0dG9uPlxuPC9mb3JtPlxuIl19