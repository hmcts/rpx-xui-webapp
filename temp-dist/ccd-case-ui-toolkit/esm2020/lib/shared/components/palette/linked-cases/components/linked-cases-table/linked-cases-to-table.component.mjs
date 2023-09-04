import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CaseField } from '../../../../../domain/definition';
import { CasesService } from '../../../../case-editor/services/cases.service';
import { LinkedCasesService } from '../../services';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../services";
import * as i3 from "../../../../case-editor/services/cases.service";
function LinkedCasesToTableComponent_table_2_tr_14_td_18_span_1_a_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const case_r3 = i0.ɵɵnextContext(3).$implicit;
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵpropertyInterpolate1("href", "cases/case-details/", case_r3.caseReference, "", i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r9.getCaseRefereneLink(case_r3.caseReference));
} }
function LinkedCasesToTableComponent_table_2_tr_14_td_18_span_1_br_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "br");
} }
function LinkedCasesToTableComponent_table_2_tr_14_td_18_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdLinkCasesReasonValue");
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtemplate(4, LinkedCasesToTableComponent_table_2_tr_14_td_18_span_1_a_4_Template, 2, 2, "a", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, LinkedCasesToTableComponent_table_2_tr_14_td_18_span_1_br_5_Template, 1, 0, "br", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const reason_r6 = ctx.$implicit;
    const isLast_r8 = ctx.last;
    const ctx_r5 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 3, reason_r6.value), "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r5.hasLeadCaseOrConsolidated(reason_r6.value.Reason));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !isLast_r8);
} }
function LinkedCasesToTableComponent_table_2_tr_14_td_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtemplate(1, LinkedCasesToTableComponent_table_2_tr_14_td_18_span_1_Template, 6, 5, "span", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const case_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", case_r3.reasons);
} }
function LinkedCasesToTableComponent_table_2_tr_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 4)(1, "td")(2, "p", 9)(3, "a", 10)(4, "span", 11);
    i0.ɵɵtext(5);
    i0.ɵɵelement(6, "br");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "ccdCaseReference");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(9, "td")(10, "span", 12);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td")(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "td")(16, "span", 12);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(18, LinkedCasesToTableComponent_table_2_tr_14_td_18_Template, 2, 1, "td", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const case_r3 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵpropertyInterpolate1("href", "cases/case-details/", case_r3.caseReference, "", i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", case_r3.caseName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(8, 9, case_r3.caseReference), "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("title", case_r3.caseTypeDescription);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(case_r3.caseType);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(case_r3.service);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", case_r3.stateDescription);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(case_r3.state);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", case_r3 && case_r3.reasons);
} }
function LinkedCasesToTableComponent_table_2_tr_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 4)(1, "td", 17);
    i0.ɵɵtext(2, " None ");
    i0.ɵɵelementEnd()();
} }
function LinkedCasesToTableComponent_table_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 3)(1, "thead")(2, "tr", 4)(3, "th", 5);
    i0.ɵɵtext(4, "Case name and number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th", 5);
    i0.ɵɵtext(6, "Case type ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 5);
    i0.ɵɵtext(8, "Service");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 5);
    i0.ɵɵtext(10, "State");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 5);
    i0.ɵɵtext(12, "Reasons for case link");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "tbody", 6);
    i0.ɵɵtemplate(14, LinkedCasesToTableComponent_table_2_tr_14_Template, 19, 11, "tr", 7);
    i0.ɵɵtemplate(15, LinkedCasesToTableComponent_table_2_tr_15_Template, 3, 0, "tr", 8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r0.linkedCasesFromResponse);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.linkedCasesFromResponse.length === 0 && (!ctx_r0.isServerError && !ctx_r0.isServerReasonCodeError));
} }
export class LinkedCasesToTableComponent {
    constructor(route, linkedCasesService, casesService) {
        this.route = route;
        this.linkedCasesService = linkedCasesService;
        this.casesService = casesService;
        this.notifyAPIFailure = new EventEmitter(false);
        this.linkedCasesFromResponse = [];
        this.isServerError = false;
        this.isServerReasonCodeError = false;
        this.jurisdictionsResponse = [];
    }
    ngAfterViewInit() {
        let labelField = document.getElementsByClassName('govuk-heading-l');
        if (labelField && labelField.length) {
            labelField[0].replaceWith('');
        }
        labelField = document.getElementsByClassName('heading-h2');
        if (labelField && labelField.length) {
            labelField[0].replaceWith('');
        }
    }
    ngOnInit() {
        this.caseId = this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.case.case_id;
        this.getAllLinkedCaseInformation();
        if (this.route.snapshot.data.case) {
            this.linkedCasesService.caseDetails = this.route.snapshot.data.case;
        }
        this.isServerReasonCodeError = this.linkedCasesService.isServerReasonCodeError;
    }
    getCaseRefereneLink(caseRef) {
        return caseRef.slice(this.caseId.length - 4);
    }
    sortLinkedCasesByReasonCode(searchCasesResponse) {
        const topLevelresultArray = [];
        let secondLevelresultArray = [];
        searchCasesResponse.forEach((item) => {
            const reasons = item && item.reasons || [];
            const consolidatedStateReason = reasons.map(x => x).find(reason => reason === LinkedCasesToTableComponent.CASE_CONSOLIDATED_REASON_CODE);
            const progressedStateReason = reasons.map(x => x).find(reason => reason === LinkedCasesToTableComponent.CASE_PROGRESS_REASON_CODE);
            const arrayItem = { ...item };
            if (progressedStateReason) {
                topLevelresultArray.push(arrayItem);
            }
            else if (consolidatedStateReason) {
                secondLevelresultArray = [{ ...item }, ...secondLevelresultArray];
            }
            else {
                secondLevelresultArray.push({ ...item });
            }
        });
        return topLevelresultArray.concat(secondLevelresultArray);
    }
    getAllLinkedCaseInformation() {
        const searchCasesResponse = [];
        const caseFieldValue = this.caseField && this.caseField.id === 'caseLinks' ? this.caseField.value : [];
        // Generate the list of observables
        caseFieldValue.forEach(fieldValue => {
            if (fieldValue && fieldValue.id) {
                searchCasesResponse.push(this.casesService.getCaseViewV2(fieldValue.id));
            }
        });
        if (searchCasesResponse.length) {
            this.searchCasesByCaseIds(searchCasesResponse).subscribe((searchCases) => {
                let casesResponse = [];
                searchCases.forEach(response => {
                    casesResponse.push(this.mapResponse(response));
                });
                casesResponse = this.sortReasonCodes(casesResponse);
                this.linkedCasesFromResponse = this.sortLinkedCasesByReasonCode(casesResponse);
                this.isLoaded = true;
                const caseLinks = this.linkedCasesFromResponse.map(item => {
                    return {
                        caseReference: item.caseReference,
                        caseName: item.caseName,
                        caseService: item.service,
                        caseType: item.caseType,
                        unlink: false,
                        reasons: item.reasons && item.reasons.map(reason => {
                            return {
                                Reason: reason
                            };
                        }),
                    };
                });
                this.linkedCasesService.initialCaseLinks = caseLinks;
                this.linkedCasesService.linkedCases = caseLinks;
                this.isServerError = false;
            }, err => {
                this.isServerError = true;
                this.notifyAPIFailure.emit(true);
            });
        }
    }
    sortReasonCodes(searchCasesResponse) {
        searchCasesResponse.forEach((item) => {
            if (item?.reasons?.length) {
                item.reasons.forEach((reason) => {
                    reason.sortOrder = this.getReasonSortOrder(reason.value.Reason);
                });
                item.reasons = item.reasons.sort((a, b) => a.sortOrder - b.sortOrder);
                item.sortOrder = item.reasons[0].sortOrder;
            }
        });
        searchCasesResponse = searchCasesResponse?.sort((a, b) => a.sortOrder - b.sortOrder);
        return searchCasesResponse;
    }
    getReasonSortOrder(reasonCode) {
        if (reasonCode === LinkedCasesToTableComponent.CASE_PROGRESS_REASON_CODE) {
            return 1;
        }
        else if (reasonCode === LinkedCasesToTableComponent.CASE_CONSOLIDATED_REASON_CODE) {
            return 2;
        }
        return 3;
    }
    searchCasesByCaseIds(searchCasesResponse) {
        return forkJoin(searchCasesResponse);
    }
    hasLeadCaseOrConsolidated(reasonCode) {
        return reasonCode === LinkedCasesToTableComponent.CASE_PROGRESS_REASON_CODE ||
            reasonCode === LinkedCasesToTableComponent.CASE_CONSOLIDATED_REASON_CODE;
    }
    mapResponse(esSearchCasesResponse) {
        const caseInfo = this.caseField.value.find(item => item.value && item.value.CaseReference === esSearchCasesResponse.case_id);
        return caseInfo && {
            caseReference: esSearchCasesResponse.case_id,
            caseName: this.linkedCasesService.getCaseName(esSearchCasesResponse),
            caseType: esSearchCasesResponse.case_type.name || '',
            caseTypeDescription: esSearchCasesResponse.case_type.description || '',
            service: esSearchCasesResponse.case_type && esSearchCasesResponse.case_type.jurisdiction.description || '',
            state: esSearchCasesResponse.state.name || '',
            stateDescription: esSearchCasesResponse.state.description || '',
            reasons: caseInfo?.value?.ReasonForLink
        };
    }
}
LinkedCasesToTableComponent.CASE_CONSOLIDATED_REASON_CODE = 'CLRC015';
LinkedCasesToTableComponent.CASE_PROGRESS_REASON_CODE = 'CLRC016';
LinkedCasesToTableComponent.ɵfac = function LinkedCasesToTableComponent_Factory(t) { return new (t || LinkedCasesToTableComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.LinkedCasesService), i0.ɵɵdirectiveInject(i3.CasesService)); };
LinkedCasesToTableComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LinkedCasesToTableComponent, selectors: [["ccd-linked-cases-to-table"]], inputs: { caseField: "caseField" }, outputs: { notifyAPIFailure: "notifyAPIFailure" }, decls: 3, vars: 1, consts: [[1, "govuk-grid-row", "govuk-!-margin-bottom-2"], [1, "govuk-grid-column-full"], ["aria-describedby", "table to display cases linked TO", 4, "ngIf"], ["aria-describedby", "table to display cases linked TO"], [1, "govuk-table__row"], ["scope", "col", "width", "20%", 1, "govuk-table__header", "case-table-column"], [1, "govuk-table__body"], ["class", "govuk-table__row", 4, "ngFor", "ngForOf"], ["class", "govuk-table__row", 4, "ngIf"], [1, "govuk-body"], ["target", "_blank", "rel", "noopener", 3, "href"], [1, "govuk-link"], [3, "title"], [4, "ngIf"], [4, "ngFor", "ngForOf"], ["class", "govuk-!-padding-left-1", 3, "href", 4, "ngIf"], [1, "govuk-!-padding-left-1", 3, "href"], ["colspan", "5", 1, "govuk-table__cell"]], template: function LinkedCasesToTableComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
        i0.ɵɵtemplate(2, LinkedCasesToTableComponent_table_2_Template, 16, 2, "table", 2);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.linkedCasesFromResponse);
    } }, styles: [".case-table-column[_ngcontent-%COMP%]{min-width:20%;max-width:20%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LinkedCasesToTableComponent, [{
        type: Component,
        args: [{ selector: 'ccd-linked-cases-to-table', template: "<div class=\"govuk-grid-row govuk-!-margin-bottom-2\">\n  <div class=\"govuk-grid-column-full\">\n    <table *ngIf=\"linkedCasesFromResponse\" aria-describedby=\"table to display cases linked TO\">\n      <thead>\n        <tr class=\"govuk-table__row\">\n          <th scope=\"col\" class=\"govuk-table__header case-table-column\" width=\"20%\">Case name and number</th>\n          <th scope=\"col\" class=\"govuk-table__header case-table-column\" width=\"20%\">Case type </th>\n          <th scope=\"col\" class=\"govuk-table__header case-table-column\" width=\"20%\">Service</th>\n          <th scope=\"col\" class=\"govuk-table__header case-table-column\" width=\"20%\">State</th>\n          <th scope=\"col\" class=\"govuk-table__header case-table-column\" width=\"20%\">Reasons for case link</th>\n        </tr>\n      </thead>\n      <tbody class=\"govuk-table__body\">\n        <tr class=\"govuk-table__row\" *ngFor=\"let case of linkedCasesFromResponse\">\n          <td>\n            <p class=\"govuk-body\"><a target=\"_blank\" href=\"cases/case-details/{{case.caseReference}}\"\n                rel=\"noopener\"><span class=\"govuk-link\">{{case.caseName}} <br>\n                  {{case.caseReference | ccdCaseReference}}</span></a></p>\n          </td>\n          <td><span [title]=\"case.caseTypeDescription\">{{case.caseType}}</span></td>\n          <td><span>{{case.service}}</span></td>\n          <td><span [title]=\"case.stateDescription\">{{case.state}}</span>\n          </td>\n          <td *ngIf=\"case && case.reasons\">\n            <span *ngFor=\"let reason of case.reasons; let i = index; let isLast = last\">\n              {{reason.value | ccdLinkCasesReasonValue}}<span><a class=\"govuk-!-padding-left-1\"\n                  href=\"cases/case-details/{{ case.caseReference }}\"\n                  *ngIf=\"hasLeadCaseOrConsolidated(reason.value.Reason)\">{{getCaseRefereneLink(case.caseReference)}}</a></span>\n              <br *ngIf=\"!isLast\" />\n            </span>\n          </td>\n        </tr>\n        <tr class=\"govuk-table__row\" *ngIf=\"linkedCasesFromResponse.length === 0 && (!isServerError && !isServerReasonCodeError)\">\n          <td class=\"govuk-table__cell\" colspan=\"5\">\n            None\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n", styles: [".case-table-column{min-width:20%;max-width:20%}\n"] }]
    }], function () { return [{ type: i1.ActivatedRoute }, { type: i2.LinkedCasesService }, { type: i3.CasesService }]; }, { caseField: [{
            type: Input
        }], notifyAPIFailure: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2VkLWNhc2VzLXRvLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2xpbmtlZC1jYXNlcy9jb21wb25lbnRzL2xpbmtlZC1jYXNlcy10YWJsZS9saW5rZWQtY2FzZXMtdG8tdGFibGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbGlua2VkLWNhc2VzL2NvbXBvbmVudHMvbGlua2VkLWNhc2VzLXRhYmxlL2xpbmtlZC1jYXNlcy10by10YWJsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUU1QyxPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLGtDQUFrQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUU5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0lDa0JVLDZCQUVXO0lBQUEsWUFBMkM7SUFBQSxpQkFBSTs7OztJQUR0RyxxR0FBa0Q7SUFDSyxlQUEyQztJQUEzQyx1RUFBMkM7OztJQUN0RyxxQkFBc0I7OztJQUp4Qiw0QkFBNEU7SUFDMUUsWUFBMEM7O0lBQUEsNEJBQU07SUFBQSxvR0FFMEQ7SUFBQSxpQkFBTztJ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QUFHLFNBQVMsQ0FBQztBQUMxQyxxREFBeUIsR0FBRyxTQUFTLENBQUM7c0dBSG5ELDJCQUEyQjs4RUFBM0IsMkJBQTJCO1FDekJ4Qyw4QkFBb0QsYUFBQTtRQUVoRCxpRkFvQ1E7UUFDVixpQkFBTSxFQUFBOztRQXJDSSxlQUE2QjtRQUE3QixrREFBNkI7O3VGRHVCNUIsMkJBQTJCO2NBTHZDLFNBQVM7MkJBQ0UsMkJBQTJCOzZIQVU5QixTQUFTO2tCQURmLEtBQUs7WUFJQyxnQkFBZ0I7a0JBRHRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmb3JrSm9pbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2FzZVZpZXcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQ2FzZUZpZWxkLCBKdXJpc2RpY3Rpb24gfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb21haW4vZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBDYXNlc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jYXNlLWVkaXRvci9zZXJ2aWNlcy9jYXNlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENhc2VMaW5rLCBMaW5rUmVhc29uIH0gZnJvbSAnLi4vLi4vZG9tYWluL2xpbmtlZC1jYXNlcy5tb2RlbCc7XG5pbXBvcnQgeyBMaW5rZWRDYXNlc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcyc7XG5cbmludGVyZmFjZSBMaW5rZWRDYXNlc1Jlc3BvbnNlIHtcbiAgY2FzZVJlZmVyZW5jZTogc3RyaW5nO1xuICBjYXNlTmFtZTogc3RyaW5nO1xuICBjYXNlVHlwZTogc3RyaW5nO1xuICBjYXNlVHlwZURlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHNlcnZpY2U6IHN0cmluZztcbiAgc3RhdGU6IHN0cmluZztcbiAgc3RhdGVEZXNjcmlwdGlvbjogc3RyaW5nO1xuICByZWFzb25zOiBzdHJpbmdbXTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWxpbmtlZC1jYXNlcy10by10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9saW5rZWQtY2FzZXMtdG8tdGFibGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9saW5rZWQtY2FzZXMtdG8tdGFibGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5rZWRDYXNlc1RvVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENBU0VfQ09OU09MSURBVEVEX1JFQVNPTl9DT0RFID0gJ0NMUkMwMTUnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDQVNFX1BST0dSRVNTX1JFQVNPTl9DT0RFID0gJ0NMUkMwMTYnO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlRmllbGQ6IENhc2VGaWVsZDtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG5vdGlmeUFQSUZhaWx1cmU6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuICBwdWJsaWMgY2FzZURldGFpbHM6IENhc2VWaWV3O1xuICBwdWJsaWMgaXNMb2FkZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBsaW5rZWRDYXNlc0Zyb21SZXNwb25zZTogTGlua2VkQ2FzZXNSZXNwb25zZVtdID0gW107XG4gIHB1YmxpYyBjYXNlSWQ6IHN0cmluZztcbiAgcHVibGljIGlzU2VydmVyRXJyb3IgPSBmYWxzZTtcbiAgcHVibGljIGlzU2VydmVyUmVhc29uQ29kZUVycm9yID0gZmFsc2U7XG4gIHB1YmxpYyBqdXJpc2RpY3Rpb25zUmVzcG9uc2U6IEp1cmlzZGljdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBsaW5rZWRDYXNlc1NlcnZpY2U6IExpbmtlZENhc2VzU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VzU2VydmljZTogQ2FzZXNTZXJ2aWNlKSB7IH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGxldCBsYWJlbEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ292dWstaGVhZGluZy1sJyk7XG4gICAgaWYgKGxhYmVsRmllbGQgJiYgbGFiZWxGaWVsZC5sZW5ndGgpIHtcbiAgICAgIGxhYmVsRmllbGRbMF0ucmVwbGFjZVdpdGgoJycpO1xuICAgIH1cbiAgICBsYWJlbEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGVhZGluZy1oMicpO1xuICAgIGlmIChsYWJlbEZpZWxkICYmIGxhYmVsRmllbGQubGVuZ3RoKSB7XG4gICAgICBsYWJlbEZpZWxkWzBdLnJlcGxhY2VXaXRoKCcnKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jYXNlSWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90ICYmIHRoaXMucm91dGUuc25hcHNob3QuZGF0YSAmJiB0aGlzLnJvdXRlLnNuYXBzaG90LmRhdGEuY2FzZS5jYXNlX2lkO1xuICAgIHRoaXMuZ2V0QWxsTGlua2VkQ2FzZUluZm9ybWF0aW9uKCk7XG4gICAgaWYgKHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlKSB7XG4gICAgICB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5jYXNlRGV0YWlscyA9IHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlO1xuICAgIH1cbiAgICB0aGlzLmlzU2VydmVyUmVhc29uQ29kZUVycm9yID0gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuaXNTZXJ2ZXJSZWFzb25Db2RlRXJyb3I7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2FzZVJlZmVyZW5lTGluayhjYXNlUmVmOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjYXNlUmVmLnNsaWNlKHRoaXMuY2FzZUlkLmxlbmd0aCAtIDQpO1xuICB9XG5cbiAgcHVibGljIHNvcnRMaW5rZWRDYXNlc0J5UmVhc29uQ29kZShzZWFyY2hDYXNlc1Jlc3BvbnNlKTogTGlua2VkQ2FzZXNSZXNwb25zZVtdIHtcbiAgICBjb25zdCB0b3BMZXZlbHJlc3VsdEFycmF5ID0gW107XG4gICAgbGV0IHNlY29uZExldmVscmVzdWx0QXJyYXkgPSBbXTtcbiAgICBzZWFyY2hDYXNlc1Jlc3BvbnNlLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuICAgICAgY29uc3QgcmVhc29ucyA9IGl0ZW0gJiYgaXRlbS5yZWFzb25zIHx8IFtdO1xuICAgICAgY29uc3QgY29uc29saWRhdGVkU3RhdGVSZWFzb24gPSByZWFzb25zLm1hcCh4ID0+IHgpLmZpbmQoXG4gICAgICAgIHJlYXNvbiA9PiByZWFzb24gPT09IExpbmtlZENhc2VzVG9UYWJsZUNvbXBvbmVudC5DQVNFX0NPTlNPTElEQVRFRF9SRUFTT05fQ09ERVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHByb2dyZXNzZWRTdGF0ZVJlYXNvbiA9IHJlYXNvbnMubWFwKHggPT4geCkuZmluZChcbiAgICAgICAgcmVhc29uID0+IHJlYXNvbiA9PT0gTGlua2VkQ2FzZXNUb1RhYmxlQ29tcG9uZW50LkNBU0VfUFJPR1JFU1NfUkVBU09OX0NPREVcbiAgICAgICk7XG4gICAgICBjb25zdCBhcnJheUl0ZW0gPSB7IC4uLml0ZW0gfTtcbiAgICAgIGlmIChwcm9ncmVzc2VkU3RhdGVSZWFzb24pIHtcbiAgICAgICAgdG9wTGV2ZWxyZXN1bHRBcnJheS5wdXNoKGFycmF5SXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKGNvbnNvbGlkYXRlZFN0YXRlUmVhc29uKSB7XG4gICAgICAgIHNlY29uZExldmVscmVzdWx0QXJyYXkgPSBbeyAuLi5pdGVtIH0sIC4uLnNlY29uZExldmVscmVzdWx0QXJyYXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Vjb25kTGV2ZWxyZXN1bHRBcnJheS5wdXNoKHsgLi4uaXRlbSB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdG9wTGV2ZWxyZXN1bHRBcnJheS5jb25jYXQoc2Vjb25kTGV2ZWxyZXN1bHRBcnJheSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QWxsTGlua2VkQ2FzZUluZm9ybWF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHNlYXJjaENhc2VzUmVzcG9uc2UgPSBbXTtcbiAgICBjb25zdCBjYXNlRmllbGRWYWx1ZSA9IHRoaXMuY2FzZUZpZWxkICYmIHRoaXMuY2FzZUZpZWxkLmlkID09PSAnY2FzZUxpbmtzJyA/IHRoaXMuY2FzZUZpZWxkLnZhbHVlIDogW107XG4gICAgLy8gR2VuZXJhdGUgdGhlIGxpc3Qgb2Ygb2JzZXJ2YWJsZXNcbiAgICBjYXNlRmllbGRWYWx1ZS5mb3JFYWNoKGZpZWxkVmFsdWUgPT4ge1xuICAgICAgaWYgKGZpZWxkVmFsdWUgJiYgZmllbGRWYWx1ZS5pZCkge1xuICAgICAgICBzZWFyY2hDYXNlc1Jlc3BvbnNlLnB1c2godGhpcy5jYXNlc1NlcnZpY2UuZ2V0Q2FzZVZpZXdWMihmaWVsZFZhbHVlLmlkKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHNlYXJjaENhc2VzUmVzcG9uc2UubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNlYXJjaENhc2VzQnlDYXNlSWRzKHNlYXJjaENhc2VzUmVzcG9uc2UpLnN1YnNjcmliZSgoc2VhcmNoQ2FzZXM6IGFueSkgPT4ge1xuICAgICAgICBsZXQgY2FzZXNSZXNwb25zZSA9IFtdO1xuICAgICAgICBzZWFyY2hDYXNlcy5mb3JFYWNoKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBjYXNlc1Jlc3BvbnNlLnB1c2godGhpcy5tYXBSZXNwb25zZShyZXNwb25zZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2FzZXNSZXNwb25zZSA9IHRoaXMuc29ydFJlYXNvbkNvZGVzKGNhc2VzUmVzcG9uc2UpO1xuICAgICAgICB0aGlzLmxpbmtlZENhc2VzRnJvbVJlc3BvbnNlID0gdGhpcy5zb3J0TGlua2VkQ2FzZXNCeVJlYXNvbkNvZGUoY2FzZXNSZXNwb25zZSk7XG4gICAgICAgIHRoaXMuaXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICBjb25zdCBjYXNlTGlua3MgPSB0aGlzLmxpbmtlZENhc2VzRnJvbVJlc3BvbnNlLm1hcChpdGVtID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2FzZVJlZmVyZW5jZTogaXRlbS5jYXNlUmVmZXJlbmNlLFxuICAgICAgICAgICAgY2FzZU5hbWU6IGl0ZW0uY2FzZU5hbWUsXG4gICAgICAgICAgICBjYXNlU2VydmljZTogaXRlbS5zZXJ2aWNlLFxuICAgICAgICAgICAgY2FzZVR5cGU6IGl0ZW0uY2FzZVR5cGUsXG4gICAgICAgICAgICB1bmxpbms6IGZhbHNlLFxuICAgICAgICAgICAgcmVhc29uczogaXRlbS5yZWFzb25zICYmIGl0ZW0ucmVhc29ucy5tYXAocmVhc29uID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBSZWFzb246IHJlYXNvblxuICAgICAgICAgICAgICB9IGFzIExpbmtSZWFzb247XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB9IGFzIENhc2VMaW5rO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuaW5pdGlhbENhc2VMaW5rcyA9IGNhc2VMaW5rcztcbiAgICAgICAgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UubGlua2VkQ2FzZXMgPSBjYXNlTGlua3M7XG4gICAgICAgIHRoaXMuaXNTZXJ2ZXJFcnJvciA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGVyciA9PiB7XG4gICAgICAgICAgdGhpcy5pc1NlcnZlckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLm5vdGlmeUFQSUZhaWx1cmUuZW1pdCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc29ydFJlYXNvbkNvZGVzKHNlYXJjaENhc2VzUmVzcG9uc2UpOiBMaW5rZWRDYXNlc1Jlc3BvbnNlW10ge1xuICAgIHNlYXJjaENhc2VzUmVzcG9uc2UuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICBpZiAoaXRlbT8ucmVhc29ucz8ubGVuZ3RoKSB7XG4gICAgICAgIGl0ZW0ucmVhc29ucy5mb3JFYWNoKChyZWFzb24pID0+IHtcbiAgICAgICAgICByZWFzb24uc29ydE9yZGVyID0gdGhpcy5nZXRSZWFzb25Tb3J0T3JkZXIocmVhc29uLnZhbHVlLlJlYXNvbik7XG4gICAgICAgIH0pO1xuICAgICAgICBpdGVtLnJlYXNvbnMgPSBpdGVtLnJlYXNvbnMuc29ydCgoYSwgYikgPT4gYS5zb3J0T3JkZXIgLSBiLnNvcnRPcmRlcik7XG4gICAgICAgIGl0ZW0uc29ydE9yZGVyID0gaXRlbS5yZWFzb25zWzBdLnNvcnRPcmRlcjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzZWFyY2hDYXNlc1Jlc3BvbnNlID0gc2VhcmNoQ2FzZXNSZXNwb25zZT8uc29ydCgoYSwgYikgPT4gYS5zb3J0T3JkZXIgLSBiLnNvcnRPcmRlcik7XG4gICAgcmV0dXJuIHNlYXJjaENhc2VzUmVzcG9uc2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0UmVhc29uU29ydE9yZGVyKHJlYXNvbkNvZGU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgaWYgKHJlYXNvbkNvZGUgPT09IExpbmtlZENhc2VzVG9UYWJsZUNvbXBvbmVudC5DQVNFX1BST0dSRVNTX1JFQVNPTl9DT0RFKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKHJlYXNvbkNvZGUgPT09IExpbmtlZENhc2VzVG9UYWJsZUNvbXBvbmVudC5DQVNFX0NPTlNPTElEQVRFRF9SRUFTT05fQ09ERSkge1xuICAgICAgcmV0dXJuIDI7XG4gICAgfVxuICAgIHJldHVybiAzO1xuICB9XG5cbiAgcHVibGljIHNlYXJjaENhc2VzQnlDYXNlSWRzKHNlYXJjaENhc2VzUmVzcG9uc2U6IGFueVtdKTogT2JzZXJ2YWJsZTx1bmtub3duW10+IHtcbiAgICByZXR1cm4gZm9ya0pvaW4oc2VhcmNoQ2FzZXNSZXNwb25zZSk7XG4gIH1cblxuICBwdWJsaWMgaGFzTGVhZENhc2VPckNvbnNvbGlkYXRlZChyZWFzb25Db2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmVhc29uQ29kZSA9PT0gTGlua2VkQ2FzZXNUb1RhYmxlQ29tcG9uZW50LkNBU0VfUFJPR1JFU1NfUkVBU09OX0NPREUgfHxcbiAgICAgIHJlYXNvbkNvZGUgPT09IExpbmtlZENhc2VzVG9UYWJsZUNvbXBvbmVudC5DQVNFX0NPTlNPTElEQVRFRF9SRUFTT05fQ09ERTtcbiAgfVxuXG4gIHB1YmxpYyBtYXBSZXNwb25zZShlc1NlYXJjaENhc2VzUmVzcG9uc2UpOiBMaW5rZWRDYXNlc1Jlc3BvbnNlIHtcbiAgICBjb25zdCBjYXNlSW5mbyA9IHRoaXMuY2FzZUZpZWxkLnZhbHVlLmZpbmQoaXRlbSA9PiBpdGVtLnZhbHVlICYmIGl0ZW0udmFsdWUuQ2FzZVJlZmVyZW5jZSA9PT0gZXNTZWFyY2hDYXNlc1Jlc3BvbnNlLmNhc2VfaWQpO1xuICAgIHJldHVybiBjYXNlSW5mbyAmJiB7XG4gICAgICBjYXNlUmVmZXJlbmNlOiBlc1NlYXJjaENhc2VzUmVzcG9uc2UuY2FzZV9pZCxcbiAgICAgIGNhc2VOYW1lOiB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5nZXRDYXNlTmFtZShlc1NlYXJjaENhc2VzUmVzcG9uc2UpLFxuICAgICAgY2FzZVR5cGU6IGVzU2VhcmNoQ2FzZXNSZXNwb25zZS5jYXNlX3R5cGUubmFtZSB8fCAnJyxcbiAgICAgIGNhc2VUeXBlRGVzY3JpcHRpb246IGVzU2VhcmNoQ2FzZXNSZXNwb25zZS5jYXNlX3R5cGUuZGVzY3JpcHRpb24gfHwgJycsXG4gICAgICBzZXJ2aWNlOiBlc1NlYXJjaENhc2VzUmVzcG9uc2UuY2FzZV90eXBlICYmIGVzU2VhcmNoQ2FzZXNSZXNwb25zZS5jYXNlX3R5cGUuanVyaXNkaWN0aW9uLmRlc2NyaXB0aW9uIHx8ICcnLFxuICAgICAgc3RhdGU6IGVzU2VhcmNoQ2FzZXNSZXNwb25zZS5zdGF0ZS5uYW1lIHx8ICcnLFxuICAgICAgc3RhdGVEZXNjcmlwdGlvbjogZXNTZWFyY2hDYXNlc1Jlc3BvbnNlLnN0YXRlLmRlc2NyaXB0aW9uIHx8ICcnLFxuICAgICAgcmVhc29uczogY2FzZUluZm8/LnZhbHVlPy5SZWFzb25Gb3JMaW5rXG4gICAgfSBhcyBMaW5rZWRDYXNlc1Jlc3BvbnNlO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1yb3cgZ292dWstIS1tYXJnaW4tYm90dG9tLTJcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGxcIj5cbiAgICA8dGFibGUgKm5nSWY9XCJsaW5rZWRDYXNlc0Zyb21SZXNwb25zZVwiIGFyaWEtZGVzY3JpYmVkYnk9XCJ0YWJsZSB0byBkaXNwbGF5IGNhc2VzIGxpbmtlZCBUT1wiPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNhc2UtdGFibGUtY29sdW1uXCIgd2lkdGg9XCIyMCVcIj5DYXNlIG5hbWUgYW5kIG51bWJlcjwvdGg+XG4gICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNhc2UtdGFibGUtY29sdW1uXCIgd2lkdGg9XCIyMCVcIj5DYXNlIHR5cGUgPC90aD5cbiAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY2FzZS10YWJsZS1jb2x1bW5cIiB3aWR0aD1cIjIwJVwiPlNlcnZpY2U8L3RoPlxuICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjYXNlLXRhYmxlLWNvbHVtblwiIHdpZHRoPVwiMjAlXCI+U3RhdGU8L3RoPlxuICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjYXNlLXRhYmxlLWNvbHVtblwiIHdpZHRoPVwiMjAlXCI+UmVhc29ucyBmb3IgY2FzZSBsaW5rPC90aD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCIgKm5nRm9yPVwibGV0IGNhc2Ugb2YgbGlua2VkQ2FzZXNGcm9tUmVzcG9uc2VcIj5cbiAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj48YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiY2FzZXMvY2FzZS1kZXRhaWxzL3t7Y2FzZS5jYXNlUmVmZXJlbmNlfX1cIlxuICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyXCI+PHNwYW4gY2xhc3M9XCJnb3Z1ay1saW5rXCI+e3tjYXNlLmNhc2VOYW1lfX0gPGJyPlxuICAgICAgICAgICAgICAgICAge3tjYXNlLmNhc2VSZWZlcmVuY2UgfCBjY2RDYXNlUmVmZXJlbmNlfX08L3NwYW4+PC9hPjwvcD5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDx0ZD48c3BhbiBbdGl0bGVdPVwiY2FzZS5jYXNlVHlwZURlc2NyaXB0aW9uXCI+e3tjYXNlLmNhc2VUeXBlfX08L3NwYW4+PC90ZD5cbiAgICAgICAgICA8dGQ+PHNwYW4+e3tjYXNlLnNlcnZpY2V9fTwvc3Bhbj48L3RkPlxuICAgICAgICAgIDx0ZD48c3BhbiBbdGl0bGVdPVwiY2FzZS5zdGF0ZURlc2NyaXB0aW9uXCI+e3tjYXNlLnN0YXRlfX08L3NwYW4+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8dGQgKm5nSWY9XCJjYXNlICYmIGNhc2UucmVhc29uc1wiPlxuICAgICAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IHJlYXNvbiBvZiBjYXNlLnJlYXNvbnM7IGxldCBpID0gaW5kZXg7IGxldCBpc0xhc3QgPSBsYXN0XCI+XG4gICAgICAgICAgICAgIHt7cmVhc29uLnZhbHVlIHwgY2NkTGlua0Nhc2VzUmVhc29uVmFsdWV9fTxzcGFuPjxhIGNsYXNzPVwiZ292dWstIS1wYWRkaW5nLWxlZnQtMVwiXG4gICAgICAgICAgICAgICAgICBocmVmPVwiY2FzZXMvY2FzZS1kZXRhaWxzL3t7IGNhc2UuY2FzZVJlZmVyZW5jZSB9fVwiXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cImhhc0xlYWRDYXNlT3JDb25zb2xpZGF0ZWQocmVhc29uLnZhbHVlLlJlYXNvbilcIj57e2dldENhc2VSZWZlcmVuZUxpbmsoY2FzZS5jYXNlUmVmZXJlbmNlKX19PC9hPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJyICpuZ0lmPVwiIWlzTGFzdFwiIC8+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICpuZ0lmPVwibGlua2VkQ2FzZXNGcm9tUmVzcG9uc2UubGVuZ3RoID09PSAwICYmICghaXNTZXJ2ZXJFcnJvciAmJiAhaXNTZXJ2ZXJSZWFzb25Db2RlRXJyb3IpXCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIiBjb2xzcGFuPVwiNVwiPlxuICAgICAgICAgICAgTm9uZVxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=