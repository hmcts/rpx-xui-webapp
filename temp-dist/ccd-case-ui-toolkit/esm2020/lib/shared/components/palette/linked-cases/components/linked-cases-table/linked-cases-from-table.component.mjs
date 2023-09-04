import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseField } from '../../../../../domain/definition';
import { CasesService } from '../../../../case-editor/services/cases.service';
import { LinkedCasesService } from '../../services';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../../case-editor/services/cases.service";
import * as i3 from "../../services";
function LinkedCasesFromTableComponent_a_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 2);
    i0.ɵɵlistener("click", function LinkedCasesFromTableComponent_a_0_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onClick()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.showHideLinkText);
} }
function LinkedCasesFromTableComponent_table_1_tbody_13_tr_1_td_18_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdLinkCasesFromReasonValue");
    i0.ɵɵelement(3, "br");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const reason_r11 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, reason_r11), " ");
} }
function LinkedCasesFromTableComponent_table_1_tbody_13_tr_1_td_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 14);
    i0.ɵɵtemplate(1, LinkedCasesFromTableComponent_table_1_tbody_13_tr_1_td_18_span_1_Template, 4, 3, "span", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const details_r9 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", details_r9.reasons);
} }
function LinkedCasesFromTableComponent_table_1_tbody_13_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 5)(1, "td", 11)(2, "p", 12)(3, "a", 13)(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelement(6, "br");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "ccdCaseReference");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(9, "td", 14)(10, "span", 15);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td", 14)(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "td", 14)(16, "span", 15);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(18, LinkedCasesFromTableComponent_table_1_tbody_13_tr_1_td_18_Template, 2, 1, "td", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const case_r7 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵpropertyInterpolate1("href", "cases/case-details/", case_r7.caseReference, "", i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", case_r7.caseNameHmctsInternal, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(8, 9, case_r7.caseReference), "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("title", case_r7.ccdCaseTypeDescription);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(case_r7.ccdCaseType);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(case_r7.ccdJurisdiction);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", case_r7.stateDescription);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(case_r7.state);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", case_r7.linkDetails);
} }
function LinkedCasesFromTableComponent_table_1_tbody_13_tr_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 5)(1, "td", 18);
    i0.ɵɵtext(2, " None ");
    i0.ɵɵelementEnd()();
} }
function LinkedCasesFromTableComponent_table_1_tbody_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 8);
    i0.ɵɵtemplate(1, LinkedCasesFromTableComponent_table_1_tbody_13_tr_1_Template, 19, 11, "tr", 9);
    i0.ɵɵtemplate(2, LinkedCasesFromTableComponent_table_1_tbody_13_tr_2_Template, 3, 0, "tr", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r4.getLinkedCasesResponse);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.noLinkedCases);
} }
function LinkedCasesFromTableComponent_table_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 3)(1, "thead", 4)(2, "tr", 5)(3, "th", 6);
    i0.ɵɵtext(4, "Case name and number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th", 6);
    i0.ɵɵtext(6, "Case type ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 6);
    i0.ɵɵtext(8, "Service");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 6);
    i0.ɵɵtext(10, "State");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 6);
    i0.ɵɵtext(12, "Reasons for case link");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(13, LinkedCasesFromTableComponent_table_1_tbody_13_Template, 3, 2, "tbody", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(13);
    i0.ɵɵproperty("ngIf", ctx_r1.getLinkedCasesResponse && (!ctx_r1.isServerError && !ctx_r1.isServerReasonCodeError));
} }
export class LinkedCasesFromTableComponent {
    constructor(route, casesService, linkedCasesService) {
        this.route = route;
        this.casesService = casesService;
        this.linkedCasesService = linkedCasesService;
        this.notifyAPIFailure = new EventEmitter(false);
        this.showHideLinkText = 'Show';
        this.noLinkedCases = true;
        this.isServerError = false;
        this.isServerReasonCodeError = false;
    }
    ngAfterViewInit() {
        const labelField = document.getElementsByClassName('case-viewer-label');
        if (labelField && labelField.length) {
            labelField[0].replaceWith('');
        }
    }
    ngOnInit() {
        this.fetchPageData();
        if (this.route.snapshot.data.case) {
            this.linkedCasesService.caseDetails = this.route.snapshot.data.case;
        }
        this.isServerReasonCodeError = this.linkedCasesService.isServerReasonCodeError;
    }
    fetchPageData() {
        this.caseId = this.route.snapshot.data.case.case_id;
        this.getLinkedCases().subscribe({
            next: response => {
                this.isServerError = false;
                this.getLinkedCasesResponse = response.linkedCases && response.linkedCases.map(item => {
                    const mappedCasetype = this.mapLookupIDToValueFromJurisdictions('CASE_TYPE', item.ccdCaseType);
                    const mappedCasetypeDescription = this.mapLookupIDToValueFromJurisdictions('CASE_TYPE_DESCRIPTION', item.ccdCaseType);
                    const mappedCaseState = this.mapLookupIDToValueFromJurisdictions('STATE', item.state);
                    const mappedCaseStateDescription = this.mapLookupIDToValueFromJurisdictions('STATE_DESCRIPTION', item.state);
                    const mappedCaseService = this.mapLookupIDToValueFromJurisdictions('JURISDICTION', item.ccdJurisdiction);
                    return {
                        ...item,
                        ccdCaseType: mappedCasetype,
                        ccdCaseTypeDescription: mappedCasetypeDescription,
                        ccdJurisdiction: mappedCaseService,
                        state: mappedCaseState,
                        stateDescription: mappedCaseStateDescription,
                        caseNameHmctsInternal: item.caseNameHmctsInternal || LinkedCasesFromTableComponent.CASE_NAME_MISSING_TEXT,
                        linkDetails: item.linkDetails
                    };
                });
                this.noLinkedCases = !response.linkedCases || !response.linkedCases.length;
            },
            error: () => {
                this.isServerError = true;
                this.notifyAPIFailure.emit(true);
            }
        });
    }
    getLinkedCases() {
        return this.casesService.getLinkedCases(this.caseId);
    }
    mapLookupIDToValueFromJurisdictions(fieldName, fieldValue) {
        return this.linkedCasesService.mapLookupIDToValueFromJurisdictions(fieldName, fieldValue);
    }
    onClick() {
        this.showHideLinkText = this.showHideLinkText === 'Show'
            ? 'Hide'
            : 'Show';
    }
}
LinkedCasesFromTableComponent.CASE_NAME_MISSING_TEXT = 'Case name missing';
LinkedCasesFromTableComponent.ɵfac = function LinkedCasesFromTableComponent_Factory(t) { return new (t || LinkedCasesFromTableComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.CasesService), i0.ɵɵdirectiveInject(i3.LinkedCasesService)); };
LinkedCasesFromTableComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LinkedCasesFromTableComponent, selectors: [["ccd-linked-cases-from-table"]], inputs: { caseField: "caseField" }, outputs: { notifyAPIFailure: "notifyAPIFailure" }, decls: 2, vars: 2, consts: [["id", "show-hide-link", "class", "govuk-link", "href", "javascript:void(0)", 3, "click", 4, "ngIf"], ["aria-describedby", "table to display cases linked from", 4, "ngIf"], ["id", "show-hide-link", "href", "javascript:void(0)", 1, "govuk-link", 3, "click"], ["aria-describedby", "table to display cases linked from"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["scope", "col", "width", "20%", 1, "govuk-table__header", "case-table-column"], ["class", "govuk-table__body", 4, "ngIf"], [1, "govuk-table__body"], ["class", "govuk-table__row", 4, "ngFor", "ngForOf"], ["class", "govuk-table__row", 4, "ngIf"], [1, "govuk-table__header", "case-table-column", "width-20"], [1, "govuk-body"], ["target", "_blank", "rel", "noopener", 1, "govuk-link", 3, "href"], [1, "case-table-column"], [3, "title"], ["class", "case-table-column", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], ["colspan", "5", 1, "govuk-table__cell"]], template: function LinkedCasesFromTableComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, LinkedCasesFromTableComponent_a_0_Template, 2, 1, "a", 0);
        i0.ɵɵtemplate(1, LinkedCasesFromTableComponent_table_1_Template, 14, 1, "table", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.noLinkedCases && !ctx.isServerError);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.getLinkedCasesResponse && ctx.showHideLinkText === "Hide" || ctx.noLinkedCases);
    } }, styles: [".case-table-column[_ngcontent-%COMP%]{min-width:20%;max-width:20%}.heading-h2[_ngcontent-%COMP%]{margin-bottom:0}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LinkedCasesFromTableComponent, [{
        type: Component,
        args: [{ selector: 'ccd-linked-cases-from-table', template: "<a *ngIf=\"!noLinkedCases && !isServerError\" id=\"show-hide-link\" class=\"govuk-link\" href=\"javascript:void(0)\"\n  (click)=\"onClick()\">{{showHideLinkText}}</a>\n<table *ngIf=\"(getLinkedCasesResponse && showHideLinkText === 'Hide') || noLinkedCases\"\n  aria-describedby=\"table to display cases linked from\">\n  <thead class=\"govuk-table__head\">\n    <tr class=\"govuk-table__row\">\n      <th scope=\"col\" class=\"govuk-table__header case-table-column\" width=\"20%\">Case name and number</th>\n      <th scope=\"col\" class=\"govuk-table__header case-table-column\" width=\"20%\">Case type </th>\n      <th scope=\"col\" class=\"govuk-table__header case-table-column\" width=\"20%\">Service</th>\n      <th scope=\"col\" class=\"govuk-table__header case-table-column\" width=\"20%\">State</th>\n      <th scope=\"col\" class=\"govuk-table__header case-table-column\" width=\"20%\">Reasons for case link</th>\n    </tr>\n  </thead>\n  <tbody class=\"govuk-table__body\" *ngIf=\"getLinkedCasesResponse && (!isServerError && !isServerReasonCodeError)\">\n    <tr class=\"govuk-table__row\" *ngFor=\"let case of getLinkedCasesResponse\">\n      <td class=\"govuk-table__header case-table-column width-20\">\n        <p class=\"govuk-body\"><a target=\"_blank\" class=\"govuk-link\" href=\"cases/case-details/{{case.caseReference}}\"\n            rel=\"noopener\"><span>{{case.caseNameHmctsInternal}} <br>\n              {{case.caseReference | ccdCaseReference}}</span></a></p>\n      </td>\n      <td class=\"case-table-column\"><span [title]=\"case.ccdCaseTypeDescription\">{{case.ccdCaseType}}</span></td>\n      <td class=\"case-table-column\"><span>{{case.ccdJurisdiction}}</span></td>\n      <td class=\"case-table-column\"><span [title]=\"case.stateDescription\">{{case.state}}</span></td>\n      <td class=\"case-table-column\" *ngFor=\"let details of case.linkDetails\">\n        <span *ngFor=\"let reason of details.reasons; let i = index; let isLast = last\">\n          {{reason | ccdLinkCasesFromReasonValue}} <br>\n        </span>\n      </td>\n    </tr>\n    <tr class=\"govuk-table__row\" *ngIf=\"noLinkedCases\">\n      <td class=\"govuk-table__cell\" colspan=\"5\">\n        None\n      </td>\n    </tr>\n    </tbody>  \n</table>\n", styles: [".case-table-column{min-width:20%;max-width:20%}.heading-h2{margin-bottom:0}\n"] }]
    }], function () { return [{ type: i1.ActivatedRoute }, { type: i2.CasesService }, { type: i3.LinkedCasesService }]; }, { caseField: [{
            type: Input
        }], notifyAPIFailure: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2VkLWNhc2VzLWZyb20tdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbGlua2VkLWNhc2VzL2NvbXBvbmVudHMvbGlua2VkLWNhc2VzLXRhYmxlL2xpbmtlZC1jYXNlcy1mcm9tLXRhYmxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2xpbmtlZC1jYXNlcy9jb21wb25lbnRzL2xpbmtlZC1jYXNlcy10YWJsZS9saW5rZWQtY2FzZXMtZnJvbS10YWJsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRTdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUU5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztJQ1JwRCw0QkFDc0I7SUFBcEIsbUtBQVMsZUFBQSxnQkFBUyxDQUFBLElBQUM7SUFBQyxZQUFvQjtJQUFBLGlCQUFJOzs7SUFBeEIsZUFBb0I7SUFBcEIsNkNBQW9COzs7SUF1QmxDLDRCQUErRTtJQUM3RSxZQUF5Qzs7SUFBQSxxQkFBSTtJQUMvQyxpQkFBTzs7O0lBREwsZUFBeUM7SUFBekMsaUVBQXlDOzs7SUFGN0MsOEJBQXVFO0lBQ3JFLDZHQUVPO0lBQ1QsaUJBQUs7OztJQUhzQixlQUFvQjtJQUFwQiw0Q0FBb0I7OztJQVZqRCw2QkFBeUUsYUFBQSxZQUFBLFlBQUEsV0FBQTtJQUc1QyxZQUErQjtJQUFBLHFCQUFJO0lBQ3RELFlBQXlDOztJQUFBLGlCQUFPLEVBQUEsRUFBQSxFQUFBO0lBRXhELDhCQUE4QixnQkFBQTtJQUE0QyxhQUFvQjtJQUFBLGlCQUFPLEVBQUE7SUFDckcsK0JBQThCLFlBQUE7SUFBTSxhQUF3QjtJQUFBLGlCQUFPLEVBQUE7SUFDbkUsK0JBQThCLGdCQUFBO0lBQXNDLGFBQWM7SUFBQSxpQkFBTyxFQUFBO0lBQ3pGLHFHQUlLO0lBQ1AsaUJBQUs7OztJQVoyRCxlQUFnRDtJQUFoRCxxR0FBZ0Q7SUFDbkYsZUFBK0I7SUFBL0IsNkRBQStCO0lBQ2xELGVBQXlDO0lBQXpDLDJFQUF5QztJQUViLGVBQXFDO0lBQXJDLHNEQUFxQztJQUFDLGVBQW9CO0lBQXBCLHlDQUFvQjtJQUMxRCxlQUF3QjtJQUF4Qiw2Q0FBd0I7SUFDeEIsZUFBK0I7SUFBL0IsZ0RBQStCO0lBQUMsZUFBYztJQUFkLG1DQUFjO0lBQ2hDLGVBQW1CO0lBQW5CLDZDQUFtQjs7O0lBTXZFLDZCQUFtRCxhQUFBO0lBRS9DLHNCQUNGO0lBQUEsaUJBQUssRUFBQTs7O0lBbkJULGdDQUFnSDtJQUM5RywrRkFjSztJQUNMLDhGQUlLO0lBQ0wsaUJBQVE7OztJQXBCc0MsZUFBeUI7SUFBekIsdURBQXlCO0lBZXpDLGVBQW1CO0lBQW5CLDJDQUFtQjs7O0lBM0JyRCxnQ0FDd0QsZUFBQSxZQUFBLFlBQUE7SUFHd0Isb0NBQW9CO0lBQUEsaUJBQUs7SUFDbkcsNkJBQTBFO0lBQUEsMEJBQVU7SUFBQSxpQkFBSztJQUN6Riw2QkFBMEU7SUFBQSx1QkFBTztJQUFBLGlCQUFLO0lBQ3RGLDZCQUEwRTtJQUFBLHNCQUFLO0lBQUEsaUJBQUs7SUFDcEYsOEJBQTBFO0lBQUEsc0NBQXFCO0lBQUEsaUJBQUssRUFBQSxFQUFBO0lBR3hHLDRGQXFCVTtJQUNaLGlCQUFROzs7SUF0QjRCLGdCQUE0RTtJQUE1RSxrSEFBNEU7O0FER2hILE1BQU0sT0FBTyw2QkFBNkI7SUFvQnhDLFlBQ21CLEtBQXFCLEVBQ3JCLFlBQTBCLEVBQzFCLGtCQUFzQztRQUZ0QyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBaEJsRCxxQkFBZ0IsR0FBMEIsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFRbEUscUJBQWdCLEdBQUcsTUFBTSxDQUFDO1FBQzFCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLDRCQUF1QixHQUFHLEtBQUssQ0FBQztJQU92QyxDQUFDO0lBRU0sZUFBZTtRQUNwQixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN4RSxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQ25DLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDakMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3JFO1FBQ0QsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQztJQUNqRixDQUFDO0lBRU0sYUFBYTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3BELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDOUIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsUUFBUSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDcEYsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQy9GLE1BQU0seUJBQXlCLEdBQUcsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDdEgsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3RGLE1BQU0sMEJBQTBCLEdBQUcsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDN0csTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsbUNBQW1DLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDekcsT0FBTzt3QkFDTCxHQUFHLElBQUk7d0JBQ1AsV0FBVyxFQUFFLGNBQWM7d0JBQzNCLHNCQUFzQixFQUFFLHlCQUF5Qjt3QkFDakQsZUFBZSxFQUFFLGlCQUFpQjt3QkFDbEMsS0FBSyxFQUFFLGVBQWU7d0JBQ3RCLGdCQUFnQixFQUFFLDBCQUEwQjt3QkFDNUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixJQUFJLDZCQUE2QixDQUFDLHNCQUFzQjt3QkFDekcsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO3FCQUNWLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDN0UsQ0FBQztZQUNELEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxjQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFTSxtQ0FBbUMsQ0FBQyxTQUFTLEVBQUUsVUFBVTtRQUM5RCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxtQ0FBbUMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixLQUFLLE1BQU07WUFDdEQsQ0FBQyxDQUFDLE1BQU07WUFDUixDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ2IsQ0FBQzs7QUFwRnVCLG9EQUFzQixHQUFHLG1CQUFtQixDQUFDOzBHQUQxRCw2QkFBNkI7Z0ZBQTdCLDZCQUE2QjtRQ2hCMUMsMEVBQzhDO1FBQzlDLG1GQWlDUTs7UUFuQ0osK0RBQXNDO1FBRWxDLGVBQThFO1FBQTlFLHlHQUE4RTs7dUZEY3pFLDZCQUE2QjtjQU56QyxTQUFTOzJCQUNFLDZCQUE2Qjs2SEFTaEMsU0FBUztrQkFEZixLQUFLO1lBSUMsZ0JBQWdCO2tCQUR0QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2FzZVZpZXcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24nO1xuaW1wb3J0IHsgTG92UmVmRGF0YU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2VydmljZXMvY29tbW9uLWRhdGEtc2VydmljZS9jb21tb24tZGF0YS1zZXJ2aWNlJztcbmltcG9ydCB7IENhc2VzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2Nhc2UtZWRpdG9yL3NlcnZpY2VzL2Nhc2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FzZUxpbmtSZXNwb25zZSwgTGlua2VkQ2FzZXNSZXNwb25zZSB9IGZyb20gJy4uLy4uL2RvbWFpbi9saW5rZWQtY2FzZXMubW9kZWwnO1xuaW1wb3J0IHsgTGlua2VkQ2FzZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtbGlua2VkLWNhc2VzLWZyb20tdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGlua2VkLWNhc2VzLWZyb20tdGFibGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9saW5rZWQtY2FzZXMtZnJvbS10YWJsZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgTGlua2VkQ2FzZXNGcm9tVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDQVNFX05BTUVfTUlTU0lOR19URVhUID0gJ0Nhc2UgbmFtZSBtaXNzaW5nJztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgY2FzZUZpZWxkOiBDYXNlRmllbGQ7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBub3RpZnlBUElGYWlsdXJlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgcHVibGljIGNhc2VEZXRhaWxzOiBDYXNlVmlldztcbiAgcHVibGljIHBhcmVudFVybDogc3RyaW5nO1xuICBwdWJsaWMgaXNMb2FkZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBnZXRMaW5rZWRDYXNlc1Jlc3BvbnNlOiBDYXNlTGlua1Jlc3BvbnNlW107XG4gIHB1YmxpYyBsaW5rZWRDYXNlUmVhc29uczogTG92UmVmRGF0YU1vZGVsW107XG5cbiAgcHVibGljIGNhc2VJZDogc3RyaW5nO1xuICBwdWJsaWMgc2hvd0hpZGVMaW5rVGV4dCA9ICdTaG93JztcbiAgcHVibGljIG5vTGlua2VkQ2FzZXMgPSB0cnVlO1xuICBwdWJsaWMgaXNTZXJ2ZXJFcnJvciA9IGZhbHNlO1xuICBwdWJsaWMgaXNTZXJ2ZXJSZWFzb25Db2RlRXJyb3IgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VzU2VydmljZTogQ2FzZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGlua2VkQ2FzZXNTZXJ2aWNlOiBMaW5rZWRDYXNlc1NlcnZpY2UsXG4gICAgKSB7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGxhYmVsRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjYXNlLXZpZXdlci1sYWJlbCcpO1xuICAgIGlmIChsYWJlbEZpZWxkICYmIGxhYmVsRmllbGQubGVuZ3RoKSB7XG4gICAgICBsYWJlbEZpZWxkWzBdLnJlcGxhY2VXaXRoKCcnKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5mZXRjaFBhZ2VEYXRhKCk7XG4gICAgaWYgKHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlKSB7XG4gICAgICB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5jYXNlRGV0YWlscyA9IHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlO1xuICAgIH1cbiAgICB0aGlzLmlzU2VydmVyUmVhc29uQ29kZUVycm9yID0gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuaXNTZXJ2ZXJSZWFzb25Db2RlRXJyb3I7XG4gIH1cblxuICBwdWJsaWMgZmV0Y2hQYWdlRGF0YSgpIHtcbiAgICB0aGlzLmNhc2VJZCA9IHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlLmNhc2VfaWQ7XG4gICAgdGhpcy5nZXRMaW5rZWRDYXNlcygpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiByZXNwb25zZSA9PiB7XG4gICAgICAgIHRoaXMuaXNTZXJ2ZXJFcnJvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdldExpbmtlZENhc2VzUmVzcG9uc2UgPSByZXNwb25zZS5saW5rZWRDYXNlcyAmJiByZXNwb25zZS5saW5rZWRDYXNlcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgY29uc3QgbWFwcGVkQ2FzZXR5cGUgPSB0aGlzLm1hcExvb2t1cElEVG9WYWx1ZUZyb21KdXJpc2RpY3Rpb25zKCdDQVNFX1RZUEUnLCBpdGVtLmNjZENhc2VUeXBlKTtcbiAgICAgICAgICBjb25zdCBtYXBwZWRDYXNldHlwZURlc2NyaXB0aW9uID0gdGhpcy5tYXBMb29rdXBJRFRvVmFsdWVGcm9tSnVyaXNkaWN0aW9ucygnQ0FTRV9UWVBFX0RFU0NSSVBUSU9OJywgaXRlbS5jY2RDYXNlVHlwZSk7XG4gICAgICAgICAgY29uc3QgbWFwcGVkQ2FzZVN0YXRlID0gdGhpcy5tYXBMb29rdXBJRFRvVmFsdWVGcm9tSnVyaXNkaWN0aW9ucygnU1RBVEUnLCBpdGVtLnN0YXRlKTtcbiAgICAgICAgICBjb25zdCBtYXBwZWRDYXNlU3RhdGVEZXNjcmlwdGlvbiA9IHRoaXMubWFwTG9va3VwSURUb1ZhbHVlRnJvbUp1cmlzZGljdGlvbnMoJ1NUQVRFX0RFU0NSSVBUSU9OJywgaXRlbS5zdGF0ZSk7XG4gICAgICAgICAgY29uc3QgbWFwcGVkQ2FzZVNlcnZpY2UgPSB0aGlzLm1hcExvb2t1cElEVG9WYWx1ZUZyb21KdXJpc2RpY3Rpb25zKCdKVVJJU0RJQ1RJT04nLCBpdGVtLmNjZEp1cmlzZGljdGlvbik7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICBjY2RDYXNlVHlwZTogbWFwcGVkQ2FzZXR5cGUsXG4gICAgICAgICAgICBjY2RDYXNlVHlwZURlc2NyaXB0aW9uOiBtYXBwZWRDYXNldHlwZURlc2NyaXB0aW9uLFxuICAgICAgICAgICAgY2NkSnVyaXNkaWN0aW9uOiBtYXBwZWRDYXNlU2VydmljZSxcbiAgICAgICAgICAgIHN0YXRlOiBtYXBwZWRDYXNlU3RhdGUsXG4gICAgICAgICAgICBzdGF0ZURlc2NyaXB0aW9uOiBtYXBwZWRDYXNlU3RhdGVEZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGNhc2VOYW1lSG1jdHNJbnRlcm5hbDogaXRlbS5jYXNlTmFtZUhtY3RzSW50ZXJuYWwgfHwgTGlua2VkQ2FzZXNGcm9tVGFibGVDb21wb25lbnQuQ0FTRV9OQU1FX01JU1NJTkdfVEVYVCxcbiAgICAgICAgICAgIGxpbmtEZXRhaWxzOiBpdGVtLmxpbmtEZXRhaWxzXG4gICAgICAgICAgfSBhcyBDYXNlTGlua1Jlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub0xpbmtlZENhc2VzID0gIXJlc3BvbnNlLmxpbmtlZENhc2VzIHx8ICFyZXNwb25zZS5saW5rZWRDYXNlcy5sZW5ndGg7XG4gICAgICB9LFxuICAgICAgZXJyb3I6ICgpID0+IHtcbiAgICAgICAgdGhpcy5pc1NlcnZlckVycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub3RpZnlBUElGYWlsdXJlLmVtaXQodHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlua2VkQ2FzZXMoKTogT2JzZXJ2YWJsZTxMaW5rZWRDYXNlc1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY2FzZXNTZXJ2aWNlLmdldExpbmtlZENhc2VzKHRoaXMuY2FzZUlkKTtcbiAgfVxuXG4gIHB1YmxpYyBtYXBMb29rdXBJRFRvVmFsdWVGcm9tSnVyaXNkaWN0aW9ucyhmaWVsZE5hbWUsIGZpZWxkVmFsdWUpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5tYXBMb29rdXBJRFRvVmFsdWVGcm9tSnVyaXNkaWN0aW9ucyhmaWVsZE5hbWUsIGZpZWxkVmFsdWUpO1xuICB9XG5cbiAgcHVibGljIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5zaG93SGlkZUxpbmtUZXh0ID0gdGhpcy5zaG93SGlkZUxpbmtUZXh0ID09PSAnU2hvdydcbiAgICAgID8gJ0hpZGUnXG4gICAgICA6ICdTaG93JztcbiAgfVxufVxuIiwiPGEgKm5nSWY9XCIhbm9MaW5rZWRDYXNlcyAmJiAhaXNTZXJ2ZXJFcnJvclwiIGlkPVwic2hvdy1oaWRlLWxpbmtcIiBjbGFzcz1cImdvdnVrLWxpbmtcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCJcbiAgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPnt7c2hvd0hpZGVMaW5rVGV4dH19PC9hPlxuPHRhYmxlICpuZ0lmPVwiKGdldExpbmtlZENhc2VzUmVzcG9uc2UgJiYgc2hvd0hpZGVMaW5rVGV4dCA9PT0gJ0hpZGUnKSB8fCBub0xpbmtlZENhc2VzXCJcbiAgYXJpYS1kZXNjcmliZWRieT1cInRhYmxlIHRvIGRpc3BsYXkgY2FzZXMgbGlua2VkIGZyb21cIj5cbiAgPHRoZWFkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRcIj5cbiAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICA8dGggc2NvcGU9XCJjb2xcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY2FzZS10YWJsZS1jb2x1bW5cIiB3aWR0aD1cIjIwJVwiPkNhc2UgbmFtZSBhbmQgbnVtYmVyPC90aD5cbiAgICAgIDx0aCBzY29wZT1cImNvbFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjYXNlLXRhYmxlLWNvbHVtblwiIHdpZHRoPVwiMjAlXCI+Q2FzZSB0eXBlIDwvdGg+XG4gICAgICA8dGggc2NvcGU9XCJjb2xcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY2FzZS10YWJsZS1jb2x1bW5cIiB3aWR0aD1cIjIwJVwiPlNlcnZpY2U8L3RoPlxuICAgICAgPHRoIHNjb3BlPVwiY29sXCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNhc2UtdGFibGUtY29sdW1uXCIgd2lkdGg9XCIyMCVcIj5TdGF0ZTwvdGg+XG4gICAgICA8dGggc2NvcGU9XCJjb2xcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY2FzZS10YWJsZS1jb2x1bW5cIiB3aWR0aD1cIjIwJVwiPlJlYXNvbnMgZm9yIGNhc2UgbGluazwvdGg+XG4gICAgPC90cj5cbiAgPC90aGVhZD5cbiAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIiAqbmdJZj1cImdldExpbmtlZENhc2VzUmVzcG9uc2UgJiYgKCFpc1NlcnZlckVycm9yICYmICFpc1NlcnZlclJlYXNvbkNvZGVFcnJvcilcIj5cbiAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCIgKm5nRm9yPVwibGV0IGNhc2Ugb2YgZ2V0TGlua2VkQ2FzZXNSZXNwb25zZVwiPlxuICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjYXNlLXRhYmxlLWNvbHVtbiB3aWR0aC0yMFwiPlxuICAgICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj48YSB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImdvdnVrLWxpbmtcIiBocmVmPVwiY2FzZXMvY2FzZS1kZXRhaWxzL3t7Y2FzZS5jYXNlUmVmZXJlbmNlfX1cIlxuICAgICAgICAgICAgcmVsPVwibm9vcGVuZXJcIj48c3Bhbj57e2Nhc2UuY2FzZU5hbWVIbWN0c0ludGVybmFsfX0gPGJyPlxuICAgICAgICAgICAgICB7e2Nhc2UuY2FzZVJlZmVyZW5jZSB8IGNjZENhc2VSZWZlcmVuY2V9fTwvc3Bhbj48L2E+PC9wPlxuICAgICAgPC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cImNhc2UtdGFibGUtY29sdW1uXCI+PHNwYW4gW3RpdGxlXT1cImNhc2UuY2NkQ2FzZVR5cGVEZXNjcmlwdGlvblwiPnt7Y2FzZS5jY2RDYXNlVHlwZX19PC9zcGFuPjwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJjYXNlLXRhYmxlLWNvbHVtblwiPjxzcGFuPnt7Y2FzZS5jY2RKdXJpc2RpY3Rpb259fTwvc3Bhbj48L3RkPlxuICAgICAgPHRkIGNsYXNzPVwiY2FzZS10YWJsZS1jb2x1bW5cIj48c3BhbiBbdGl0bGVdPVwiY2FzZS5zdGF0ZURlc2NyaXB0aW9uXCI+e3tjYXNlLnN0YXRlfX08L3NwYW4+PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cImNhc2UtdGFibGUtY29sdW1uXCIgKm5nRm9yPVwibGV0IGRldGFpbHMgb2YgY2FzZS5saW5rRGV0YWlsc1wiPlxuICAgICAgICA8c3BhbiAqbmdGb3I9XCJsZXQgcmVhc29uIG9mIGRldGFpbHMucmVhc29uczsgbGV0IGkgPSBpbmRleDsgbGV0IGlzTGFzdCA9IGxhc3RcIj5cbiAgICAgICAgICB7e3JlYXNvbiB8IGNjZExpbmtDYXNlc0Zyb21SZWFzb25WYWx1ZX19IDxicj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIiAqbmdJZj1cIm5vTGlua2VkQ2FzZXNcIj5cbiAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCIgY29sc3Bhbj1cIjVcIj5cbiAgICAgICAgTm9uZVxuICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICAgIDwvdGJvZHk+ICBcbjwvdGFibGU+XG4iXX0=