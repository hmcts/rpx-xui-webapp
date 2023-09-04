import { Component, EventEmitter, Output } from '@angular/core';
import { LinkedCasesPages } from '../../enums';
import { LinkedCasesService } from '../../services/linked-cases.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/linked-cases.service";
function CheckYourAnswersComponent_table_4_tr_9_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 7)(1, "td", 14);
    i0.ɵɵtext(2);
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "ccdCaseReference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 14)(7, "a", 15);
    i0.ɵɵlistener("click", function CheckYourAnswersComponent_table_4_tr_9_Template_a_click_7_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r7.onChange()); });
    i0.ɵɵtext(8, "Change");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const case_r6 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", case_r6.caseName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 2, case_r6.caseReference), " ");
} }
function CheckYourAnswersComponent_table_4_tr_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 7)(1, "td", 16);
    i0.ɵɵtext(2, " None ");
    i0.ɵɵelementEnd()();
} }
function CheckYourAnswersComponent_table_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 13)(1, "caption", 5);
    i0.ɵɵtext(2, "Cases to unlink");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "thead", 6)(4, "tr", 7)(5, "th", 8);
    i0.ɵɵtext(6, "Case name and number");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "th", 8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "tbody", 10);
    i0.ɵɵtemplate(9, CheckYourAnswersComponent_table_4_tr_9_Template, 9, 4, "tr", 11);
    i0.ɵɵtemplate(10, CheckYourAnswersComponent_table_4_tr_10_Template, 3, 0, "tr", 12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngForOf", ctx_r0.casesToUnlink);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.casesToUnlink.length);
} }
function CheckYourAnswersComponent_th_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "th", 8);
} }
function CheckYourAnswersComponent_tr_17_span_8_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdLinkCasesReasonValue");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const reason_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, reason_r12), " ");
} }
function CheckYourAnswersComponent_tr_17_span_8_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdLinkCasesReasonValue");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const reason_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, reason_r12.Reason.value), " ");
} }
function CheckYourAnswersComponent_tr_17_span_8_br_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "br");
} }
function CheckYourAnswersComponent_tr_17_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtemplate(1, CheckYourAnswersComponent_tr_17_span_8_span_1_Template, 3, 3, "span", 19);
    i0.ɵɵtemplate(2, CheckYourAnswersComponent_tr_17_span_8_span_2_Template, 3, 3, "span", 19);
    i0.ɵɵtemplate(3, CheckYourAnswersComponent_tr_17_span_8_br_3_Template, 1, 0, "br", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const isLast_r13 = ctx.last;
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.isLinkCasesJourney);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r10.isLinkCasesJourney);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !isLast_r13);
} }
function CheckYourAnswersComponent_tr_17_td_10_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 14)(1, "a", 15);
    i0.ɵɵlistener("click", function CheckYourAnswersComponent_tr_17_td_10_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r20); const ctx_r19 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r19.onChange()); });
    i0.ɵɵtext(2, "Change");
    i0.ɵɵelementEnd()();
} }
function CheckYourAnswersComponent_tr_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 7)(1, "td", 14)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelement(4, "br");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "ccdCaseReference");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td", 14);
    i0.ɵɵtemplate(8, CheckYourAnswersComponent_tr_17_span_8_Template, 4, 3, "span", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "td", 14);
    i0.ɵɵtemplate(10, CheckYourAnswersComponent_tr_17_td_10_Template, 3, 0, "td", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const case_r9 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", case_r9.caseName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 4, case_r9.caseReference), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", case_r9.reasons);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.isLinkCasesJourney);
} }
function CheckYourAnswersComponent_tr_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 7)(1, "td", 20);
    i0.ɵɵtext(2, " None ");
    i0.ɵɵelementEnd()();
} }
export class CheckYourAnswersComponent {
    constructor(linkedCasesService) {
        this.linkedCasesService = linkedCasesService;
        this.linkedCasesStateEmitter = new EventEmitter();
    }
    ngOnInit() {
        this.isLinkCasesJourney = this.linkedCasesService.isLinkedCasesEventTrigger;
        this.linkedCasesTableCaption = this.linkedCasesService.isLinkedCasesEventTrigger ? 'Proposed case links' : 'Linked cases';
        this.linkedCases = this.linkedCasesService.linkedCases.filter(linkedCase => !linkedCase.unlink);
        this.casesToUnlink = this.linkedCasesService.linkedCases.filter(linkedCase => linkedCase.unlink && linkedCase.unlink === true);
    }
    onChange() {
        this.linkedCasesService.editMode = true;
        this.linkedCasesStateEmitter.emit({
            currentLinkedCasesPage: LinkedCasesPages.CHECK_YOUR_ANSWERS,
            navigateToPreviousPage: true,
            navigateToNextPage: true
        });
    }
}
CheckYourAnswersComponent.ɵfac = function CheckYourAnswersComponent_Factory(t) { return new (t || CheckYourAnswersComponent)(i0.ɵɵdirectiveInject(i1.LinkedCasesService)); };
CheckYourAnswersComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CheckYourAnswersComponent, selectors: [["ccd-linked-cases-check-your-answers"]], outputs: { linkedCasesStateEmitter: "linkedCasesStateEmitter" }, decls: 19, vars: 5, consts: [[1, "govuk-grid-row"], [1, "govuk-grid-column-full"], [1, "govuk-heading-xl"], ["id", "cases-to-unlink-table", "class", "govuk-table", 4, "ngIf"], ["id", "linked-cases-table", 1, "govuk-table"], [1, "govuk-table__caption", "govuk-table__caption--m"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["scope", "col", 1, "govuk-table__header"], ["scope", "col", "class", "govuk-table__header", 4, "ngIf"], [1, "govuk-table__body"], ["class", "govuk-table__row", 4, "ngFor", "ngForOf"], ["class", "govuk-table__row", 4, "ngIf"], ["id", "cases-to-unlink-table", 1, "govuk-table"], [1, "govuk-table__cell"], ["href", "javascript:void(0)", 1, "govuk-link", "govuk-link--no-visited-state", "float-right", 3, "click"], ["colspan", "2", 1, "govuk-table__cell"], [4, "ngFor", "ngForOf"], ["class", "govuk-table__cell", 4, "ngIf"], [4, "ngIf"], ["colspan", "4", 1, "govuk-table__cell"]], template: function CheckYourAnswersComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        i0.ɵɵtext(3, "Check your answers");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, CheckYourAnswersComponent_table_4_Template, 11, 2, "table", 3);
        i0.ɵɵelementStart(5, "table", 4)(6, "caption", 5);
        i0.ɵɵtext(7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "thead", 6)(9, "tr", 7)(10, "th", 8);
        i0.ɵɵtext(11, "Case name and number");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(12, "th", 8);
        i0.ɵɵtext(13, "Reasons for case link");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(14, "th", 8);
        i0.ɵɵtemplate(15, CheckYourAnswersComponent_th_15_Template, 1, 0, "th", 9);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(16, "tbody", 10);
        i0.ɵɵtemplate(17, CheckYourAnswersComponent_tr_17_Template, 11, 6, "tr", 11);
        i0.ɵɵtemplate(18, CheckYourAnswersComponent_tr_18_Template, 3, 0, "tr", 12);
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", !ctx.isLinkCasesJourney);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(ctx.linkedCasesTableCaption);
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("ngIf", ctx.isLinkCasesJourney);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.linkedCases);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.linkedCases.length);
    } }, styles: [".float-right[_ngcontent-%COMP%]{float:right}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CheckYourAnswersComponent, [{
        type: Component,
        args: [{ selector: 'ccd-linked-cases-check-your-answers', template: "<div class=\"govuk-grid-row\">\n  <div class=\"govuk-grid-column-full\">\n    <h1 class=\"govuk-heading-xl\">Check your answers</h1>\n    <!-- Top table for manage link cases journey -->\n    <table id=\"cases-to-unlink-table\" class=\"govuk-table\" *ngIf=\"!isLinkCasesJourney\">\n      <caption class=\"govuk-table__caption govuk-table__caption--m\">Cases to unlink</caption>\n      <thead class=\"govuk-table__head\">\n        <tr class=\"govuk-table__row\">\n          <th scope=\"col\" class=\"govuk-table__header\">Case name and number</th>\n          <th scope=\"col\" class=\"govuk-table__header\"></th>\n        </tr>\n      </thead>\n      <tbody class=\"govuk-table__body\">\n        <tr class=\"govuk-table__row\" *ngFor=\"let case of casesToUnlink\">\n          <td class=\"govuk-table__cell\">\n            {{case.caseName}}  <br> {{case.caseReference | ccdCaseReference}}\n          </td>\n          <td class=\"govuk-table__cell\">\n            <a href=\"javascript:void(0)\" class=\"govuk-link govuk-link--no-visited-state float-right\" (click)=\"onChange()\">Change</a>\n          </td>\n        </tr>\n        <tr class=\"govuk-table__row\" *ngIf=\"!casesToUnlink.length\">\n          <td class=\"govuk-table__cell\" colspan=\"2\">\n            None\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    <!-- Table for both link case and manage link case journeys -->\n    <table id=\"linked-cases-table\" class=\"govuk-table\">\n      <caption class=\"govuk-table__caption govuk-table__caption--m\">{{linkedCasesTableCaption}}</caption>\n      <thead class=\"govuk-table__head\">\n        <tr class=\"govuk-table__row\">\n          <th scope=\"col\" class=\"govuk-table__header\">Case name and number</th>\n          <th scope=\"col\" class=\"govuk-table__header\">Reasons for case link</th>\n          <th scope=\"col\" class=\"govuk-table__header\"></th>\n          <th scope=\"col\" class=\"govuk-table__header\" *ngIf=\"isLinkCasesJourney\"></th>\n        </tr>\n      </thead>\n      <tbody class=\"govuk-table__body\">\n        <tr class=\"govuk-table__row\" *ngFor=\"let case of linkedCases\">\n          <td class=\"govuk-table__cell\">\n            <span>{{case.caseName}}  <br> {{case.caseReference | ccdCaseReference}} </span>\n          </td>\n          <td class=\"govuk-table__cell\">\n            <span *ngFor=\"let reason of case.reasons; last as isLast\">\n              <span *ngIf=\"isLinkCasesJourney\">\n                {{reason | ccdLinkCasesReasonValue}}\n              </span>\n              <span *ngIf=\"!isLinkCasesJourney\">\n                {{reason.Reason.value | ccdLinkCasesReasonValue}}\n              </span>\n              <br *ngIf=\"!isLast\">\n            </span>\n          </td>\n          <td class=\"govuk-table__cell\"></td>\n          <td class=\"govuk-table__cell\" *ngIf=\"isLinkCasesJourney\">\n            <a href=\"javascript:void(0)\" class=\"govuk-link govuk-link--no-visited-state float-right\" (click)=\"onChange()\">Change</a>\n          </td>\n        </tr>\n        <tr class=\"govuk-table__row\" *ngIf=\"!linkedCases.length\">\n          <td class=\"govuk-table__cell\" colspan=\"4\">\n            None\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n", styles: [".float-right{float:right}\n"] }]
    }], function () { return [{ type: i1.LinkedCasesService }]; }, { linkedCasesStateEmitter: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2steW91ci1hbnN3ZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2xpbmtlZC1jYXNlcy9jb21wb25lbnRzL2NoZWNrLXlvdXItYW5zd2Vycy9jaGVjay15b3VyLWFuc3dlcnMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbGlua2VkLWNhc2VzL2NvbXBvbmVudHMvY2hlY2steW91ci1hbnN3ZXJzL2NoZWNrLXlvdXItYW5zd2Vycy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7OztJQ1VqRSw2QkFBZ0UsYUFBQTtJQUU1RCxZQUFtQjtJQUFBLHFCQUFJO0lBQUMsWUFDMUI7O0lBQUEsaUJBQUs7SUFDTCw4QkFBOEIsWUFBQTtJQUM2RCx5S0FBUyxlQUFBLGlCQUFVLENBQUEsSUFBQztJQUFDLHNCQUFNO0lBQUEsaUJBQUksRUFBQSxFQUFBOzs7SUFIeEgsZUFBbUI7SUFBbkIsaURBQW1CO0lBQUssZUFDMUI7SUFEMEIsNEVBQzFCOzs7SUFLRiw2QkFBMkQsYUFBQTtJQUV2RCxzQkFDRjtJQUFBLGlCQUFLLEVBQUE7OztJQXBCWCxpQ0FBa0YsaUJBQUE7SUFDbEIsK0JBQWU7SUFBQSxpQkFBVTtJQUN2RixnQ0FBaUMs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Q0FBcUI7UUFBQSxpQkFBSztRQUN0RSx5QkFBaUQ7UUFDakQsMEVBQTRFO1FBQzlFLGlCQUFLLEVBQUE7UUFFUCxrQ0FBaUM7UUFDL0IsNEVBbUJLO1FBQ0wsMkVBSUs7UUFDUCxpQkFBUSxFQUFBLEVBQUEsRUFBQTs7UUE3RDZDLGVBQXlCO1FBQXpCLDhDQUF5QjtRQTBCaEIsZUFBMkI7UUFBM0IsaURBQTJCO1FBTXhDLGVBQXdCO1FBQXhCLDZDQUF3QjtRQUl6QixlQUFjO1FBQWQseUNBQWM7UUFvQjlCLGVBQXlCO1FBQXpCLDhDQUF5Qjs7dUZEbERsRCx5QkFBeUI7Y0FMckMsU0FBUzsyQkFDRSxxQ0FBcUM7cUVBT3hDLHVCQUF1QjtrQkFEN0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZUxpbmssIExpbmtlZENhc2VzU3RhdGUgfSBmcm9tICcuLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgTGlua2VkQ2FzZXNQYWdlcyB9IGZyb20gJy4uLy4uL2VudW1zJztcbmltcG9ydCB7IExpbmtlZENhc2VzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xpbmtlZC1jYXNlcy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWxpbmtlZC1jYXNlcy1jaGVjay15b3VyLWFuc3dlcnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hlY2steW91ci1hbnN3ZXJzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2hlY2steW91ci1hbnN3ZXJzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tZb3VyQW5zd2Vyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBsaW5rZWRDYXNlc1N0YXRlRW1pdHRlcjogRXZlbnRFbWl0dGVyPExpbmtlZENhc2VzU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxMaW5rZWRDYXNlc1N0YXRlPigpO1xuXG4gIHB1YmxpYyBsaW5rZWRDYXNlczogQ2FzZUxpbmtbXTtcbiAgcHVibGljIGNhc2VzVG9Vbmxpbms6IENhc2VMaW5rW107XG4gIHB1YmxpYyBpc0xpbmtDYXNlc0pvdXJuZXk6IGJvb2xlYW47XG4gIHB1YmxpYyBsaW5rZWRDYXNlc1RhYmxlQ2FwdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGlua2VkQ2FzZXNTZXJ2aWNlOiBMaW5rZWRDYXNlc1NlcnZpY2UpIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzTGlua0Nhc2VzSm91cm5leSA9IHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmlzTGlua2VkQ2FzZXNFdmVudFRyaWdnZXI7XG4gICAgdGhpcy5saW5rZWRDYXNlc1RhYmxlQ2FwdGlvbiA9IHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmlzTGlua2VkQ2FzZXNFdmVudFRyaWdnZXIgPyAnUHJvcG9zZWQgY2FzZSBsaW5rcycgOiAnTGlua2VkIGNhc2VzJztcbiAgICB0aGlzLmxpbmtlZENhc2VzID0gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UubGlua2VkQ2FzZXMuZmlsdGVyKGxpbmtlZENhc2UgPT4gIWxpbmtlZENhc2UudW5saW5rKTtcbiAgICB0aGlzLmNhc2VzVG9VbmxpbmsgPSB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5saW5rZWRDYXNlcy5maWx0ZXIobGlua2VkQ2FzZSA9PiBsaW5rZWRDYXNlLnVubGluayAmJiBsaW5rZWRDYXNlLnVubGluayA9PT0gdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgb25DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuZWRpdE1vZGUgPSB0cnVlO1xuICAgIHRoaXMubGlua2VkQ2FzZXNTdGF0ZUVtaXR0ZXIuZW1pdCh7XG4gICAgICBjdXJyZW50TGlua2VkQ2FzZXNQYWdlOiBMaW5rZWRDYXNlc1BhZ2VzLkNIRUNLX1lPVVJfQU5TV0VSUyxcbiAgICAgIG5hdmlnYXRlVG9QcmV2aW91c1BhZ2U6IHRydWUsXG4gICAgICBuYXZpZ2F0ZVRvTmV4dFBhZ2U6IHRydWVcbiAgICB9KTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93XCI+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLWNvbHVtbi1mdWxsXCI+XG4gICAgPGgxIGNsYXNzPVwiZ292dWstaGVhZGluZy14bFwiPkNoZWNrIHlvdXIgYW5zd2VyczwvaDE+XG4gICAgPCEtLSBUb3AgdGFibGUgZm9yIG1hbmFnZSBsaW5rIGNhc2VzIGpvdXJuZXkgLS0+XG4gICAgPHRhYmxlIGlkPVwiY2FzZXMtdG8tdW5saW5rLXRhYmxlXCIgY2xhc3M9XCJnb3Z1ay10YWJsZVwiICpuZ0lmPVwiIWlzTGlua0Nhc2VzSm91cm5leVwiPlxuICAgICAgPGNhcHRpb24gY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2FwdGlvbiBnb3Z1ay10YWJsZV9fY2FwdGlvbi0tbVwiPkNhc2VzIHRvIHVubGluazwvY2FwdGlvbj5cbiAgICAgIDx0aGVhZCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkXCI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIj5DYXNlIG5hbWUgYW5kIG51bWJlcjwvdGg+XG4gICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCI+PC90aD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCIgKm5nRm9yPVwibGV0IGNhc2Ugb2YgY2FzZXNUb1VubGlua1wiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+XG4gICAgICAgICAgICB7e2Nhc2UuY2FzZU5hbWV9fSAgPGJyPiB7e2Nhc2UuY2FzZVJlZmVyZW5jZSB8IGNjZENhc2VSZWZlcmVuY2V9fVxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cImdvdnVrLWxpbmsgZ292dWstbGluay0tbm8tdmlzaXRlZC1zdGF0ZSBmbG9hdC1yaWdodFwiIChjbGljayk9XCJvbkNoYW5nZSgpXCI+Q2hhbmdlPC9hPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIiAqbmdJZj1cIiFjYXNlc1RvVW5saW5rLmxlbmd0aFwiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCIgY29sc3Bhbj1cIjJcIj5cbiAgICAgICAgICAgIE5vbmVcbiAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90Ym9keT5cbiAgICA8L3RhYmxlPlxuICAgIDwhLS0gVGFibGUgZm9yIGJvdGggbGluayBjYXNlIGFuZCBtYW5hZ2UgbGluayBjYXNlIGpvdXJuZXlzIC0tPlxuICAgIDx0YWJsZSBpZD1cImxpbmtlZC1jYXNlcy10YWJsZVwiIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgIDxjYXB0aW9uIGNsYXNzPVwiZ292dWstdGFibGVfX2NhcHRpb24gZ292dWstdGFibGVfX2NhcHRpb24tLW1cIj57e2xpbmtlZENhc2VzVGFibGVDYXB0aW9ufX08L2NhcHRpb24+XG4gICAgICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCI+Q2FzZSBuYW1lIGFuZCBudW1iZXI8L3RoPlxuICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiPlJlYXNvbnMgZm9yIGNhc2UgbGluazwvdGg+XG4gICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCI+PC90aD5cbiAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiAqbmdJZj1cImlzTGlua0Nhc2VzSm91cm5leVwiPjwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICpuZ0Zvcj1cImxldCBjYXNlIG9mIGxpbmtlZENhc2VzXCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj5cbiAgICAgICAgICAgIDxzcGFuPnt7Y2FzZS5jYXNlTmFtZX19ICA8YnI+IHt7Y2FzZS5jYXNlUmVmZXJlbmNlIHwgY2NkQ2FzZVJlZmVyZW5jZX19IDwvc3Bhbj5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdGb3I9XCJsZXQgcmVhc29uIG9mIGNhc2UucmVhc29uczsgbGFzdCBhcyBpc0xhc3RcIj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc0xpbmtDYXNlc0pvdXJuZXlcIj5cbiAgICAgICAgICAgICAgICB7e3JlYXNvbiB8IGNjZExpbmtDYXNlc1JlYXNvblZhbHVlfX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFpc0xpbmtDYXNlc0pvdXJuZXlcIj5cbiAgICAgICAgICAgICAgICB7e3JlYXNvbi5SZWFzb24udmFsdWUgfCBjY2RMaW5rQ2FzZXNSZWFzb25WYWx1ZX19XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJyICpuZ0lmPVwiIWlzTGFzdFwiPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj48L3RkPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCIgKm5nSWY9XCJpc0xpbmtDYXNlc0pvdXJuZXlcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cImdvdnVrLWxpbmsgZ292dWstbGluay0tbm8tdmlzaXRlZC1zdGF0ZSBmbG9hdC1yaWdodFwiIChjbGljayk9XCJvbkNoYW5nZSgpXCI+Q2hhbmdlPC9hPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIiAqbmdJZj1cIiFsaW5rZWRDYXNlcy5sZW5ndGhcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiIGNvbHNwYW49XCI0XCI+XG4gICAgICAgICAgICBOb25lXG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGJvZHk+XG4gICAgPC90YWJsZT5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==