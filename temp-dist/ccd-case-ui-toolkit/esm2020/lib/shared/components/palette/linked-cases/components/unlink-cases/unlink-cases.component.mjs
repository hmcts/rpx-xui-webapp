import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { CasesService } from '../../../../case-editor/services/cases.service';
import { LinkedCasesErrorMessages, LinkedCasesPages } from '../../enums/write-linked-cases-field.enum';
import { LinkedCasesService } from '../../services/linked-cases.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../../case-editor/services/cases.service";
import * as i3 from "../../services/linked-cases.service";
import * as i4 from "@angular/common";
import * as i5 from "../../../../../pipes/case-reference/case-reference.pipe";
function UnLinkCasesComponent_div_0_div_4_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11)(1, "span", 12);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.unlinkErrorMessage, " ");
} }
function UnLinkCasesComponent_div_0_div_4_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13)(1, "input", 14);
    i0.ɵɵlistener("change", function UnLinkCasesComponent_div_0_div_4_div_3_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r5.onChange($event.target)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 15);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "ccdCaseReference");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const case_r4 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("id", "case-reference-", case_r4.caseReference, "");
    i0.ɵɵproperty("value", case_r4.caseReference)("checked", case_r4.unlink);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("for", case_r4.caseReference);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2(" ", case_r4.caseName, " ", i0.ɵɵpipeBind1(4, 6, case_r4.caseReference), " ");
} }
const _c0 = function (a0) { return { "govuk-form-group--error": a0 }; };
function UnLinkCasesComponent_div_0_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtemplate(1, UnLinkCasesComponent_div_0_div_4_p_1_Template, 4, 1, "p", 8);
    i0.ɵɵelementStart(2, "div", 9);
    i0.ɵɵtemplate(3, UnLinkCasesComponent_div_0_div_4_div_3_Template, 5, 8, "div", 10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c0, ctx_r1.unlinkErrorMessage))("formGroup", ctx_r1.unlinkCaseForm);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.unlinkErrorMessage);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.linkedCases);
} }
function UnLinkCasesComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "h1", 3);
    i0.ɵɵtext(3, "Select the cases you want to unlink from this case");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, UnLinkCasesComponent_div_0_div_4_Template, 4, 6, "div", 4);
    i0.ɵɵelementStart(5, "div", 5)(6, "button", 6);
    i0.ɵɵlistener("click", function UnLinkCasesComponent_div_0_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.onNext()); });
    i0.ɵɵtext(7, "Next");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r0.unlinkCaseForm);
} }
export class UnLinkCasesComponent {
    constructor(fb, casesService, linkedCasesService) {
        this.fb = fb;
        this.casesService = casesService;
        this.linkedCasesService = linkedCasesService;
        this.linkedCasesStateEmitter = new EventEmitter();
        this.notifyAPIFailure = new EventEmitter(false);
        this.linkedCases = [];
        this.errorMessages = [];
        this.isServerError = false;
    }
    ngOnInit() {
        this.getLinkedCases();
    }
    getLinkedCases() {
        this.caseId = this.linkedCasesService.caseId;
        if (this.linkedCasesService.linkedCases.length > 0) {
            this.linkedCases = this.linkedCasesService.linkedCases;
            this.getAllLinkedCaseInformation();
        }
        else {
            this.casesService.getCaseViewV2(this.caseId).subscribe((caseView) => {
                const linkedCasesTab = caseView.tabs.find(tab => tab.id === UnLinkCasesComponent.LINKED_CASES_TAB_ID);
                if (linkedCasesTab) {
                    const linkedCases = linkedCasesTab.fields[0].value;
                    this.linkedCases = linkedCases;
                    this.linkedCasesService.linkedCases = linkedCases;
                    this.getAllLinkedCaseInformation();
                }
            });
        }
    }
    getAllLinkedCaseInformation() {
        const searchCasesResponse = [];
        this.linkedCases.forEach(linkedCase => {
            searchCasesResponse.push(this.casesService.getCaseViewV2(linkedCase.caseReference));
        });
        if (searchCasesResponse.length) {
            this.searchCasesByCaseIds(searchCasesResponse).subscribe((searchCases) => {
                searchCases.forEach((response) => {
                    const linkedCaseFromList = this.linkedCases.find(linkedCase => linkedCase.caseReference === response.case_id);
                    if (linkedCaseFromList) {
                        const caseName = this.linkedCasesService.getCaseName(response);
                        this.linkedCases.find(linkedCase => linkedCase.caseReference === response.case_id).caseName = caseName;
                    }
                });
                this.initForm();
                this.linkedCasesService.linkedCases = this.linkedCases;
                this.isServerError = false;
            }, err => {
                this.isServerError = true;
                this.notifyAPIFailure.emit(true);
            });
        }
    }
    searchCasesByCaseIds(searchCasesResponse) {
        return forkJoin(searchCasesResponse);
    }
    initForm() {
        this.unlinkCaseForm = this.fb.group({
            linkedCases: this.getLinkedCasesFormArray
        });
    }
    get getLinkedCasesFormArray() {
        const formFieldArray = this.linkedCases.map(val => this.fb.group({
            caseReference: val.caseReference,
            reasons: val.reasons,
            createdDateTime: val.createdDateTime,
            caseType: val.caseType,
            caseState: val.caseState,
            caseService: val.caseService,
            caseName: val.caseName || UnLinkCasesComponent.CASE_NAME_MISSING_TEXT,
            unlink: val.unlink
        }));
        return this.fb.array(formFieldArray);
    }
    onChange(caseSelected) {
        this.resetErrorMessages();
        const selectedCase = this.linkedCases.find(linkedCase => linkedCase.caseReference === caseSelected.value);
        if (selectedCase) {
            selectedCase.unlink = caseSelected.checked ? true : false;
        }
    }
    onNext() {
        this.resetErrorMessages();
        let navigateToNextPage = true;
        const casesMarkedToUnlink = this.linkedCases.find(linkedCase => linkedCase.unlink && linkedCase.unlink === true);
        if (!casesMarkedToUnlink) {
            this.errorMessages.push({
                title: 'case-selection',
                description: LinkedCasesErrorMessages.UnlinkCaseSelectionError,
                fieldId: `case-reference-${this.linkedCases[0].caseReference}`
            });
            this.unlinkErrorMessage = LinkedCasesErrorMessages.UnlinkCaseSelectionError;
            navigateToNextPage = false;
        }
        // Return linked cases state and error messages to the parent
        this.emitLinkedCasesState(navigateToNextPage);
    }
    // Return linked cases state and error messages to the parent
    emitLinkedCasesState(isNavigateToNextPage) {
        this.linkedCasesStateEmitter.emit({
            currentLinkedCasesPage: LinkedCasesPages.UNLINK_CASE,
            errorMessages: this.errorMessages,
            navigateToNextPage: isNavigateToNextPage,
        });
    }
    resetErrorMessages() {
        this.errorMessages = [];
        this.unlinkErrorMessage = null;
    }
}
UnLinkCasesComponent.LINKED_CASES_TAB_ID = 'linked_cases_sscs';
UnLinkCasesComponent.CASE_NAME_MISSING_TEXT = 'Case name missing';
UnLinkCasesComponent.ɵfac = function UnLinkCasesComponent_Factory(t) { return new (t || UnLinkCasesComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.CasesService), i0.ɵɵdirectiveInject(i3.LinkedCasesService)); };
UnLinkCasesComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UnLinkCasesComponent, selectors: [["ccd-unlink-cases"]], outputs: { linkedCasesStateEmitter: "linkedCasesStateEmitter", notifyAPIFailure: "notifyAPIFailure" }, decls: 1, vars: 1, consts: [["class", "govuk-grid-row", 4, "ngIf"], [1, "govuk-grid-row"], [1, "govuk-grid-column-full"], [1, "govuk-heading-xl"], ["class", "govuk-form-group form-group", 3, "ngClass", "formGroup", 4, "ngIf"], [1, "govuk-button-group"], ["type", "button", "id", "next-button", 1, "button", "button-primary", 3, "click"], [1, "govuk-form-group", "form-group", 3, "ngClass", "formGroup"], ["id", "unlink-cases-error", "class", "govuk-error-message", 4, "ngIf"], ["data-module", "govuk-checkboxes", 1, "govuk-checkboxes"], ["class", "govuk-checkboxes__item", 4, "ngFor", "ngForOf"], ["id", "unlink-cases-error", 1, "govuk-error-message"], [1, "govuk-visually-hidden"], [1, "govuk-checkboxes__item"], ["formArrayName", "linkedCases", "name", "linkedCases", "type", "checkbox", 1, "govuk-checkboxes__input", 3, "id", "value", "checked", "change"], [1, "govuk-label", "govuk-checkboxes__label", 3, "for"]], template: function UnLinkCasesComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, UnLinkCasesComponent_div_0_Template, 8, 1, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.linkedCases.length > 0);
    } }, dependencies: [i4.NgClass, i4.NgForOf, i4.NgIf, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormArrayName, i5.CaseReferencePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UnLinkCasesComponent, [{
        type: Component,
        args: [{ selector: 'ccd-unlink-cases', template: "<div class=\"govuk-grid-row\" *ngIf=\"linkedCases.length > 0\">\n  <div class=\"govuk-grid-column-full\">\n    <h1 class=\"govuk-heading-xl\">Select the cases you want to unlink from this case</h1>\n    <div class=\"govuk-form-group form-group\" [ngClass]=\"{'govuk-form-group--error': unlinkErrorMessage}\" [formGroup]=\"unlinkCaseForm\" *ngIf=\"unlinkCaseForm\">\n      <p id=\"unlink-cases-error\" class=\"govuk-error-message\" *ngIf=\"unlinkErrorMessage\">\n        <span class=\"govuk-visually-hidden\">Error:</span> {{unlinkErrorMessage}}\n      </p>\n      <div class=\"govuk-checkboxes\" data-module=\"govuk-checkboxes\">\n        <div class=\"govuk-checkboxes__item\" *ngFor=\"let case of linkedCases\">\n          <input class=\"govuk-checkboxes__input\" id=\"case-reference-{{case.caseReference}}\" formArrayName=\"linkedCases\" name=\"linkedCases\"\n            type=\"checkbox\" [value]=\"case.caseReference\" [checked]=\"case.unlink\" (change)=\"onChange($event.target)\">\n            <label class=\"govuk-label govuk-checkboxes__label\" for=\"{{case.caseReference}}\">\n              {{case.caseName }} {{case.caseReference | ccdCaseReference}}\n          </label>\n        </div>\n      </div>\n    </div>\n    <div class=\"govuk-button-group\">\n      <button class=\"button button-primary\" type=\"button\" id=\"next-button\" (click)=\"onNext()\">Next</button>\n    </div>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.CasesService }, { type: i3.LinkedCasesService }]; }, { linkedCasesStateEmitter: [{
            type: Output
        }], notifyAPIFailure: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5saW5rLWNhc2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2xpbmtlZC1jYXNlcy9jb21wb25lbnRzL3VubGluay1jYXNlcy91bmxpbmstY2FzZXMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbGlua2VkLWNhc2VzL2NvbXBvbmVudHMvdW5saW5rLWNhc2VzL3VubGluay1jYXNlcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFhLFdBQVcsRUFBb0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUU5RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN2RyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7Ozs7SUNIbkUsNkJBQWtGLGVBQUE7SUFDNUMsc0JBQU07SUFBQSxpQkFBTztJQUFDLFlBQ3BEO0lBQUEsaUJBQUk7OztJQURnRCxlQUNwRDtJQURvRCwwREFDcEQ7Ozs7SUFFRSwrQkFBcUUsZ0JBQUE7SUFFSSxxTEFBVSxlQUFBLDhCQUF1QixDQUFBLElBQUM7SUFEekcsaUJBQzBHO0lBQ3hHLGlDQUFnRjtJQUM5RSxZQUNKOztJQUFBLGlCQUFRLEVBQUE7OztJQUorQixlQUEwQztJQUExQyw2RUFBMEM7SUFDL0QsNkNBQTRCLDJCQUFBO0lBQ08sZUFBNEI7SUFBNUIsc0RBQTRCO0lBQzdFLGVBQ0o7SUFESSxtR0FDSjs7OztJQVZOLDhCQUF5SjtJQUN2Siw2RUFFSTtJQUNKLDhCQUE2RDtJQUMzRCxrRkFNTTtJQUNSLGlCQUFNLEVBQUE7OztJQVppQywrRUFBMkQsb0NBQUE7SUFDMUMsZUFBd0I7SUFBeEIsZ0RBQXdCO0lBSXpCLGVBQWM7SUFBZCw0Q0FBYzs7OztJQVIzRSw4QkFBMkQsYUFBQSxZQUFBO0lBRTFCLGtFQUFrRDtJQUFBLGlCQUFLO0lBQ3BGLDJFQWFNO0lBQ04sOEJBQWdDLGdCQUFBO0lBQ3VDLGlLQUFTLGVBQUEsZUFBUSxDQUFBLElBQUM7SUFBQyxvQkFBSTtJQUFBLGlCQUFTLEVBQUEsRUFBQSxFQUFBOzs7SUFmNEIsZUFBb0I7SUFBcEIsNENBQW9COztBRFUzSixNQUFNLE9BQU8sb0JBQW9CO0lBa0IvQixZQUE2QixFQUFlLEVBQ3pCLFlBQTBCLEVBQzFCLGtCQUFzQztRQUY1QixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ3pCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFkbEQsNEJBQXVCLEdBQW1DLElBQUksWUFBWSxFQUFvQixDQUFDO1FBRS9GLHFCQUFnQixHQUEwQixJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUlsRSxnQkFBVyxHQUFlLEVBQUUsQ0FBQztRQUM3QixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFHbkMsa0JBQWEsR0FBRyxLQUFLLENBQUM7SUFLN0IsQ0FBQztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLGNBQWM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztZQUN2RCxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztTQUNwQzthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQWtCLEVBQUUsRUFBRTtnQkFDNUUsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3RHLElBQUksY0FBYyxFQUFFO29CQUNsQixNQUFNLFdBQVcsR0FBZSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDL0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7b0JBQy9CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO29CQUNsRCxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztpQkFDcEM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVNLDJCQUEyQjtRQUNoQyxNQUFNLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNwQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDdEYsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLG1CQUFtQixDQUFDLE1BQU0sRUFBRTtZQUM5QixJQUFJLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFnQixFQUFFLEVBQUU7Z0JBQzVFLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFrQixFQUFFLEVBQUU7b0JBQ3pDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxLQUFLLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDOUcsSUFBSSxrQkFBa0IsRUFBRTt3QkFDdEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDL0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxLQUFLLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO3FCQUN4RztnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDN0IsQ0FBQyxFQUNDLEdBQUcsQ0FBQyxFQUFFO2dCQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDSCxDQUFDO0lBRU0sb0JBQW9CLENBQUMsbUJBQTBCO1FBQ3BELE9BQU8sUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2xDLFdBQVcsRUFBRSxJQUFJLENBQUMsdUJBQXVCO1NBQzFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFXLHVCQUF1QjtRQUNoQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQy9ELGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYTtZQUNoQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87WUFDcEIsZUFBZSxFQUFFLEdBQUcsQ0FBQyxlQUFlO1lBQ3BDLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtZQUN0QixTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQVM7WUFDeEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO1lBQzVCLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUSxJQUFJLG9CQUFvQixDQUFDLHNCQUFzQjtZQUNyRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07U0FDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxRQUFRLENBQUMsWUFBaUI7UUFDL0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxLQUFLLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRyxJQUFJLFlBQVksRUFBRTtZQUNoQixZQUFZLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQzNEO0lBQ0gsQ0FBQztJQUVNLE1BQU07UUFDWCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUM5QixNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ2pILElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztnQkFDdEIsS0FBSyxFQUFFLGdCQUFnQjtnQkFDdkIsV0FBVyxFQUFFLHdCQUF3QixDQUFDLHdCQUF3QjtnQkFDOUQsT0FBTyxFQUFFLGtCQUFrQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRTthQUMvRCxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsd0JBQXdCLENBQUMsd0JBQXdCLENBQUM7WUFDNUUsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1NBQzVCO1FBQ0QsNkRBQTZEO1FBQzdELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCw2REFBNkQ7SUFDdEQsb0JBQW9CLENBQUMsb0JBQTZCO1FBQ3ZELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUM7WUFDaEMsc0JBQXNCLEVBQUUsZ0JBQWdCLENBQUMsV0FBVztZQUNwRCxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsa0JBQWtCLEVBQUUsb0JBQW9CO1NBQ3pDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxrQkFBa0I7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDOztBQWpJdUIsd0NBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDMUMsMkNBQXNCLEdBQUcsbUJBQW1CLENBQUM7d0ZBSDFELG9CQUFvQjt1RUFBcEIsb0JBQW9CO1FDYmpDLHFFQXFCTTs7UUFyQnVCLGlEQUE0Qjs7dUZEYTVDLG9CQUFvQjtjQUpoQyxTQUFTOzJCQUNFLGtCQUFrQjswSEFTckIsdUJBQXVCO2tCQUQ3QixNQUFNO1lBR0EsZ0JBQWdCO2tCQUR0QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENhc2VWaWV3LCBFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQ2FzZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY2FzZS1lZGl0b3Ivc2VydmljZXMvY2FzZXMuc2VydmljZSc7XG5pbXBvcnQgeyBDYXNlTGluaywgTGlua2VkQ2FzZXNTdGF0ZSB9IGZyb20gJy4uLy4uL2RvbWFpbic7XG5pbXBvcnQgeyBMaW5rZWRDYXNlc0Vycm9yTWVzc2FnZXMsIExpbmtlZENhc2VzUGFnZXMgfSBmcm9tICcuLi8uLi9lbnVtcy93cml0ZS1saW5rZWQtY2FzZXMtZmllbGQuZW51bSc7XG5pbXBvcnQgeyBMaW5rZWRDYXNlc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9saW5rZWQtY2FzZXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC11bmxpbmstY2FzZXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vdW5saW5rLWNhc2VzLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBVbkxpbmtDYXNlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTElOS0VEX0NBU0VTX1RBQl9JRCA9ICdsaW5rZWRfY2FzZXNfc3Njcyc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENBU0VfTkFNRV9NSVNTSU5HX1RFWFQgPSAnQ2FzZSBuYW1lIG1pc3NpbmcnO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgbGlua2VkQ2FzZXNTdGF0ZUVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxMaW5rZWRDYXNlc1N0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TGlua2VkQ2FzZXNTdGF0ZT4oKTtcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBub3RpZnlBUElGYWlsdXJlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICBwdWJsaWMgdW5saW5rQ2FzZUZvcm06IFVudHlwZWRGb3JtR3JvdXA7XG4gIHB1YmxpYyBjYXNlSWQ6IHN0cmluZztcbiAgcHVibGljIGxpbmtlZENhc2VzOiBDYXNlTGlua1tdID0gW107XG4gIHB1YmxpYyBlcnJvck1lc3NhZ2VzOiBFcnJvck1lc3NhZ2VbXSA9IFtdO1xuICBwdWJsaWMgdW5saW5rRXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBpc0xvYWRlZDogYm9vbGVhbjtcbiAgcHVibGljIGlzU2VydmVyRXJyb3IgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VzU2VydmljZTogQ2FzZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGlua2VkQ2FzZXNTZXJ2aWNlOiBMaW5rZWRDYXNlc1NlcnZpY2UpIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmdldExpbmtlZENhc2VzKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlua2VkQ2FzZXMoKTogdm9pZCB7XG4gICAgdGhpcy5jYXNlSWQgPSB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5jYXNlSWQ7XG4gICAgaWYgKHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmxpbmtlZENhc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMubGlua2VkQ2FzZXMgPSB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5saW5rZWRDYXNlcztcbiAgICAgIHRoaXMuZ2V0QWxsTGlua2VkQ2FzZUluZm9ybWF0aW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FzZXNTZXJ2aWNlLmdldENhc2VWaWV3VjIodGhpcy5jYXNlSWQpLnN1YnNjcmliZSgoY2FzZVZpZXc6IENhc2VWaWV3KSA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmtlZENhc2VzVGFiID0gY2FzZVZpZXcudGFicy5maW5kKHRhYiA9PiB0YWIuaWQgPT09IFVuTGlua0Nhc2VzQ29tcG9uZW50LkxJTktFRF9DQVNFU19UQUJfSUQpO1xuICAgICAgICBpZiAobGlua2VkQ2FzZXNUYWIpIHtcbiAgICAgICAgICBjb25zdCBsaW5rZWRDYXNlczogQ2FzZUxpbmtbXSA9IGxpbmtlZENhc2VzVGFiLmZpZWxkc1swXS52YWx1ZTtcbiAgICAgICAgICB0aGlzLmxpbmtlZENhc2VzID0gbGlua2VkQ2FzZXM7XG4gICAgICAgICAgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UubGlua2VkQ2FzZXMgPSBsaW5rZWRDYXNlcztcbiAgICAgICAgICB0aGlzLmdldEFsbExpbmtlZENhc2VJbmZvcm1hdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0QWxsTGlua2VkQ2FzZUluZm9ybWF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHNlYXJjaENhc2VzUmVzcG9uc2UgPSBbXTtcbiAgICB0aGlzLmxpbmtlZENhc2VzLmZvckVhY2gobGlua2VkQ2FzZSA9PiB7XG4gICAgICBzZWFyY2hDYXNlc1Jlc3BvbnNlLnB1c2godGhpcy5jYXNlc1NlcnZpY2UuZ2V0Q2FzZVZpZXdWMihsaW5rZWRDYXNlLmNhc2VSZWZlcmVuY2UpKTtcbiAgICB9KTtcbiAgICBpZiAoc2VhcmNoQ2FzZXNSZXNwb25zZS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc2VhcmNoQ2FzZXNCeUNhc2VJZHMoc2VhcmNoQ2FzZXNSZXNwb25zZSkuc3Vic2NyaWJlKChzZWFyY2hDYXNlczogYW55KSA9PiB7XG4gICAgICAgIHNlYXJjaENhc2VzLmZvckVhY2goKHJlc3BvbnNlOiBDYXNlVmlldykgPT4ge1xuICAgICAgICAgIGNvbnN0IGxpbmtlZENhc2VGcm9tTGlzdCA9IHRoaXMubGlua2VkQ2FzZXMuZmluZChsaW5rZWRDYXNlID0+IGxpbmtlZENhc2UuY2FzZVJlZmVyZW5jZSA9PT0gcmVzcG9uc2UuY2FzZV9pZCk7XG4gICAgICAgICAgaWYgKGxpbmtlZENhc2VGcm9tTGlzdCkge1xuICAgICAgICAgICAgY29uc3QgY2FzZU5hbWUgPSB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5nZXRDYXNlTmFtZShyZXNwb25zZSk7XG4gICAgICAgICAgICB0aGlzLmxpbmtlZENhc2VzLmZpbmQobGlua2VkQ2FzZSA9PiBsaW5rZWRDYXNlLmNhc2VSZWZlcmVuY2UgPT09IHJlc3BvbnNlLmNhc2VfaWQpLmNhc2VOYW1lID0gY2FzZU5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbml0Rm9ybSgpO1xuICAgICAgICB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5saW5rZWRDYXNlcyA9IHRoaXMubGlua2VkQ2FzZXM7XG4gICAgICAgIHRoaXMuaXNTZXJ2ZXJFcnJvciA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICB0aGlzLmlzU2VydmVyRXJyb3IgPSB0cnVlO1xuICAgICAgICAgIHRoaXMubm90aWZ5QVBJRmFpbHVyZS5lbWl0KHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2VhcmNoQ2FzZXNCeUNhc2VJZHMoc2VhcmNoQ2FzZXNSZXNwb25zZTogYW55W10pOiBPYnNlcnZhYmxlPHVua25vd25bXT4ge1xuICAgIHJldHVybiBmb3JrSm9pbihzZWFyY2hDYXNlc1Jlc3BvbnNlKTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0Rm9ybSgpOiB2b2lkIHtcbiAgICB0aGlzLnVubGlua0Nhc2VGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICBsaW5rZWRDYXNlczogdGhpcy5nZXRMaW5rZWRDYXNlc0Zvcm1BcnJheVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldCBnZXRMaW5rZWRDYXNlc0Zvcm1BcnJheSgpOiBGb3JtQXJyYXkge1xuICAgIGNvbnN0IGZvcm1GaWVsZEFycmF5ID0gdGhpcy5saW5rZWRDYXNlcy5tYXAodmFsID0+IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgY2FzZVJlZmVyZW5jZTogdmFsLmNhc2VSZWZlcmVuY2UsXG4gICAgICByZWFzb25zOiB2YWwucmVhc29ucyxcbiAgICAgIGNyZWF0ZWREYXRlVGltZTogdmFsLmNyZWF0ZWREYXRlVGltZSxcbiAgICAgIGNhc2VUeXBlOiB2YWwuY2FzZVR5cGUsXG4gICAgICBjYXNlU3RhdGU6IHZhbC5jYXNlU3RhdGUsXG4gICAgICBjYXNlU2VydmljZTogdmFsLmNhc2VTZXJ2aWNlLFxuICAgICAgY2FzZU5hbWU6IHZhbC5jYXNlTmFtZSB8fCBVbkxpbmtDYXNlc0NvbXBvbmVudC5DQVNFX05BTUVfTUlTU0lOR19URVhULFxuICAgICAgdW5saW5rOiB2YWwudW5saW5rXG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzLmZiLmFycmF5KGZvcm1GaWVsZEFycmF5KTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNoYW5nZShjYXNlU2VsZWN0ZWQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMucmVzZXRFcnJvck1lc3NhZ2VzKCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRDYXNlID0gdGhpcy5saW5rZWRDYXNlcy5maW5kKGxpbmtlZENhc2UgPT4gbGlua2VkQ2FzZS5jYXNlUmVmZXJlbmNlID09PSBjYXNlU2VsZWN0ZWQudmFsdWUpO1xuICAgIGlmIChzZWxlY3RlZENhc2UpIHtcbiAgICAgIHNlbGVjdGVkQ2FzZS51bmxpbmsgPSBjYXNlU2VsZWN0ZWQuY2hlY2tlZCA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25OZXh0KCk6IHZvaWQge1xuICAgIHRoaXMucmVzZXRFcnJvck1lc3NhZ2VzKCk7XG4gICAgbGV0IG5hdmlnYXRlVG9OZXh0UGFnZSA9IHRydWU7XG4gICAgY29uc3QgY2FzZXNNYXJrZWRUb1VubGluayA9IHRoaXMubGlua2VkQ2FzZXMuZmluZChsaW5rZWRDYXNlID0+IGxpbmtlZENhc2UudW5saW5rICYmIGxpbmtlZENhc2UudW5saW5rID09PSB0cnVlKTtcbiAgICBpZiAoIWNhc2VzTWFya2VkVG9VbmxpbmspIHtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgdGl0bGU6ICdjYXNlLXNlbGVjdGlvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBMaW5rZWRDYXNlc0Vycm9yTWVzc2FnZXMuVW5saW5rQ2FzZVNlbGVjdGlvbkVycm9yLFxuICAgICAgICBmaWVsZElkOiBgY2FzZS1yZWZlcmVuY2UtJHt0aGlzLmxpbmtlZENhc2VzWzBdLmNhc2VSZWZlcmVuY2V9YFxuICAgICAgfSk7XG4gICAgICB0aGlzLnVubGlua0Vycm9yTWVzc2FnZSA9IExpbmtlZENhc2VzRXJyb3JNZXNzYWdlcy5VbmxpbmtDYXNlU2VsZWN0aW9uRXJyb3I7XG4gICAgICBuYXZpZ2F0ZVRvTmV4dFBhZ2UgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gUmV0dXJuIGxpbmtlZCBjYXNlcyBzdGF0ZSBhbmQgZXJyb3IgbWVzc2FnZXMgdG8gdGhlIHBhcmVudFxuICAgIHRoaXMuZW1pdExpbmtlZENhc2VzU3RhdGUobmF2aWdhdGVUb05leHRQYWdlKTtcbiAgfVxuXG4gIC8vIFJldHVybiBsaW5rZWQgY2FzZXMgc3RhdGUgYW5kIGVycm9yIG1lc3NhZ2VzIHRvIHRoZSBwYXJlbnRcbiAgcHVibGljIGVtaXRMaW5rZWRDYXNlc1N0YXRlKGlzTmF2aWdhdGVUb05leHRQYWdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5saW5rZWRDYXNlc1N0YXRlRW1pdHRlci5lbWl0KHtcbiAgICAgIGN1cnJlbnRMaW5rZWRDYXNlc1BhZ2U6IExpbmtlZENhc2VzUGFnZXMuVU5MSU5LX0NBU0UsXG4gICAgICBlcnJvck1lc3NhZ2VzOiB0aGlzLmVycm9yTWVzc2FnZXMsXG4gICAgICBuYXZpZ2F0ZVRvTmV4dFBhZ2U6IGlzTmF2aWdhdGVUb05leHRQYWdlLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJlc2V0RXJyb3JNZXNzYWdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBbXTtcbiAgICB0aGlzLnVubGlua0Vycm9yTWVzc2FnZSA9IG51bGw7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLXJvd1wiICpuZ0lmPVwibGlua2VkQ2FzZXMubGVuZ3RoID4gMFwiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tZnVsbFwiPlxuICAgIDxoMSBjbGFzcz1cImdvdnVrLWhlYWRpbmcteGxcIj5TZWxlY3QgdGhlIGNhc2VzIHlvdSB3YW50IHRvIHVubGluayBmcm9tIHRoaXMgY2FzZTwvaDE+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXAgZm9ybS1ncm91cFwiIFtuZ0NsYXNzXT1cInsnZ292dWstZm9ybS1ncm91cC0tZXJyb3InOiB1bmxpbmtFcnJvck1lc3NhZ2V9XCIgW2Zvcm1Hcm91cF09XCJ1bmxpbmtDYXNlRm9ybVwiICpuZ0lmPVwidW5saW5rQ2FzZUZvcm1cIj5cbiAgICAgIDxwIGlkPVwidW5saW5rLWNhc2VzLWVycm9yXCIgY2xhc3M9XCJnb3Z1ay1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJ1bmxpbmtFcnJvck1lc3NhZ2VcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay12aXN1YWxseS1oaWRkZW5cIj5FcnJvcjo8L3NwYW4+IHt7dW5saW5rRXJyb3JNZXNzYWdlfX1cbiAgICAgIDwvcD5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1jaGVja2JveGVzXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1jaGVja2JveGVzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1jaGVja2JveGVzX19pdGVtXCIgKm5nRm9yPVwibGV0IGNhc2Ugb2YgbGlua2VkQ2FzZXNcIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1jaGVja2JveGVzX19pbnB1dFwiIGlkPVwiY2FzZS1yZWZlcmVuY2Ute3tjYXNlLmNhc2VSZWZlcmVuY2V9fVwiIGZvcm1BcnJheU5hbWU9XCJsaW5rZWRDYXNlc1wiIG5hbWU9XCJsaW5rZWRDYXNlc1wiXG4gICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIiBbdmFsdWVdPVwiY2FzZS5jYXNlUmVmZXJlbmNlXCIgW2NoZWNrZWRdPVwiY2FzZS51bmxpbmtcIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudC50YXJnZXQpXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1jaGVja2JveGVzX19sYWJlbFwiIGZvcj1cInt7Y2FzZS5jYXNlUmVmZXJlbmNlfX1cIj5cbiAgICAgICAgICAgICAge3tjYXNlLmNhc2VOYW1lIH19IHt7Y2FzZS5jYXNlUmVmZXJlbmNlIHwgY2NkQ2FzZVJlZmVyZW5jZX19XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIGlkPVwibmV4dC1idXR0b25cIiAoY2xpY2spPVwib25OZXh0KClcIj5OZXh0PC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=