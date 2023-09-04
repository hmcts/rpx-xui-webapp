import { Component } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { AbstractAppConfig } from '../../../../app.config';
import { CaseEditDataService } from '../../../commons/case-edit-data';
import { CommonDataService } from '../../../services/common-data-service/common-data-service';
import { CasesService } from '../../case-editor/services/cases.service';
import { AbstractFieldWriteComponent } from '../base-field';
import { LinkedCasesEventTriggers, LinkedCasesPages } from './enums';
import { LinkedCasesService } from './services';
import * as i0 from "@angular/core";
import * as i1 from "../../../../app.config";
import * as i2 from "../../../services/common-data-service/common-data-service";
import * as i3 from "../../case-editor/services/cases.service";
import * as i4 from "./services";
import * as i5 from "../../../commons/case-edit-data";
function WriteLinkedCasesFieldComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccd-linked-cases-before-you-start", 3);
    i0.ɵɵlistener("linkedCasesStateEmitter", function WriteLinkedCasesFieldComponent_ng_container_2_Template_ccd_linked_cases_before_you_start_linkedCasesStateEmitter_1_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.onLinkedCasesStateEmitted($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function WriteLinkedCasesFieldComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccd-no-linked-cases", 3);
    i0.ɵɵlistener("linkedCasesStateEmitter", function WriteLinkedCasesFieldComponent_ng_container_3_Template_ccd_no_linked_cases_linkedCasesStateEmitter_1_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.onLinkedCasesStateEmitted($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function WriteLinkedCasesFieldComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccd-link-cases", 3);
    i0.ɵɵlistener("linkedCasesStateEmitter", function WriteLinkedCasesFieldComponent_ng_container_4_Template_ccd_link_cases_linkedCasesStateEmitter_1_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.onLinkedCasesStateEmitted($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function WriteLinkedCasesFieldComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccd-unlink-cases", 3);
    i0.ɵɵlistener("linkedCasesStateEmitter", function WriteLinkedCasesFieldComponent_ng_container_5_Template_ccd_unlink_cases_linkedCasesStateEmitter_1_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.onLinkedCasesStateEmitted($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function WriteLinkedCasesFieldComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccd-linked-cases-check-your-answers", 3);
    i0.ɵɵlistener("linkedCasesStateEmitter", function WriteLinkedCasesFieldComponent_ng_container_6_Template_ccd_linked_cases_check_your_answers_linkedCasesStateEmitter_1_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r13.onLinkedCasesStateEmitted($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
export class WriteLinkedCasesFieldComponent extends AbstractFieldWriteComponent {
    constructor(appConfig, commonDataService, casesService, linkedCasesService, caseEditDataService) {
        super();
        this.appConfig = appConfig;
        this.commonDataService = commonDataService;
        this.casesService = casesService;
        this.linkedCasesService = linkedCasesService;
        this.caseEditDataService = caseEditDataService;
        this.linkedCasesPages = LinkedCasesPages;
        this.linkedCasesEventTriggers = LinkedCasesEventTriggers;
        this.linkedCases = [];
    }
    ngOnInit() {
        // This is required to enable Continue button validation
        // Continue button should be enabled only at check your answers page
        this.caseEditDataService.setLinkedCasesJourneyAtFinalStep(false);
        // Clear validation errors
        this.caseEditDataService.clearFormValidationErrors();
        // Get linked case reasons from ref data
        this.getLinkedCaseReasons();
        this.linkedCasesService.editMode = false;
        this.caseEditDataService.caseDetails$.subscribe({
            next: caseDetails => this.initialiseCaseDetails(caseDetails)
        });
        this.caseEditDataService.caseEventTriggerName$.subscribe({
            next: name => this.linkedCasesService.isLinkedCasesEventTrigger = (name === LinkedCasesEventTriggers.LINK_CASES)
        });
        this.caseEditDataService.caseEditForm$.subscribe({
            next: editForm => this.caseEditForm = editForm
        });
    }
    initialiseCaseDetails(caseDetails) {
        if (caseDetails) {
            this.caseDetails = caseDetails;
            this.linkedCasesService.caseDetails = caseDetails;
            this.linkedCasesService.caseId = caseDetails.case_id;
            this.linkedCasesService.caseName = this.linkedCasesService.getCaseName(caseDetails);
            this.getLinkedCases();
        }
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
    onLinkedCasesStateEmitted(linkedCasesState) {
        // Clear validation errors
        this.caseEditDataService.clearFormValidationErrors();
        if (linkedCasesState.navigateToNextPage) {
            this.linkedCasesPage = this.getNextPage(linkedCasesState);
            this.proceedToNextPage();
        }
        else {
            if (linkedCasesState.errorMessages && linkedCasesState.errorMessages.length) {
                linkedCasesState.errorMessages.forEach((errorMessage, index) => {
                    this.caseEditDataService.addFormValidationError({ id: errorMessage.fieldId, message: errorMessage.description });
                });
            }
        }
    }
    getLinkedCaseReasons() {
        const reasonCodeAPIurl = `${this.appConfig.getRDCommonDataApiUrl()}/lov/categories/CaseLinkingReasonCode`;
        this.commonDataService.getRefData(reasonCodeAPIurl).subscribe({
            next: reasons => {
                // Sort in ascending order
                const linkCaseReasons = reasons.list_of_values.sort((a, b) => (a.value_en > b.value_en) ? 1 : -1);
                // Move Other option to the end of the list
                this.linkedCasesService.linkCaseReasons = linkCaseReasons?.filter(reason => reason.value_en !== 'Other');
                this.linkedCasesService.linkCaseReasons.push(linkCaseReasons?.find(reason => reason.value_en === 'Other'));
            }
        });
    }
    proceedToNextPage() {
        if (this.isAtFinalPage()) {
            // Continue button event must be allowed in final page
            this.caseEditDataService.setLinkedCasesJourneyAtFinalStep(true);
            // Trigger validation to clear the "notAtFinalPage" error if now at the final state
            this.formGroup.updateValueAndValidity();
            // update form value
            this.submitLinkedCases();
        }
        else {
            // Continue button event must not be allowed if not in final page
            this.caseEditDataService.setLinkedCasesJourneyAtFinalStep(false);
        }
    }
    submitLinkedCases() {
        if (!this.linkedCasesService.isLinkedCasesEventTrigger) {
            const unlinkedCaseRefereneIds = this.linkedCasesService.linkedCases.filter(item => item.unlink).map(item => item.caseReference);
            const caseFieldValue = this.linkedCasesService.caseFieldValue;
            this.linkedCasesService.caseFieldValue = caseFieldValue.filter(item => unlinkedCaseRefereneIds.indexOf(item.id) === -1);
        }
        this.formGroup.value.caseLinks = this.linkedCasesService.caseFieldValue;
        this.caseEditForm.controls['data'] = new UntypedFormGroup({ caseLinks: new FormControl(this.linkedCasesService.caseFieldValue || []) });
        this.caseEditDataService.setCaseEditForm(this.caseEditForm);
    }
    isAtFinalPage() {
        return this.linkedCasesPage === this.linkedCasesPages.CHECK_YOUR_ANSWERS;
    }
    getNextPage(linkedCasesState) {
        if ((this.linkedCasesPage === LinkedCasesPages.BEFORE_YOU_START) ||
            (linkedCasesState.currentLinkedCasesPage === LinkedCasesPages.CHECK_YOUR_ANSWERS && linkedCasesState.navigateToPreviousPage)) {
            return this.linkedCasesService.isLinkedCasesEventTrigger
                ? LinkedCasesPages.LINK_CASE
                : LinkedCasesPages.UNLINK_CASE;
        }
        return LinkedCasesPages.CHECK_YOUR_ANSWERS;
    }
    getLinkedCases() {
        this.casesService.getCaseViewV2(this.linkedCasesService.caseId).subscribe((caseView) => {
            const caseViewFiltered = caseView.tabs.filter(tab => {
                return tab.fields.some(({ field_type }) => field_type && field_type.collection_field_type && field_type.collection_field_type.id === 'CaseLink');
            });
            if (caseViewFiltered) {
                const caseLinkFieldValue = caseViewFiltered.map(filtered => filtered.fields?.length > 0 && filtered.fields.filter(field => field.id === 'caseLinks')[0].value);
                this.linkedCasesService.caseFieldValue = caseLinkFieldValue.length ? caseLinkFieldValue[0] : [];
                this.linkedCasesService.getAllLinkedCaseInformation();
            }
            // Initialise the first page to display
            this.linkedCasesPage = this.linkedCasesService.isLinkedCasesEventTrigger ||
                (this.linkedCasesService.caseFieldValue && this.linkedCasesService.caseFieldValue.length > 0
                    && !this.linkedCasesService.serverLinkedApiError)
                ? LinkedCasesPages.BEFORE_YOU_START
                : LinkedCasesPages.NO_LINKED_CASES;
        });
    }
}
WriteLinkedCasesFieldComponent.ɵfac = function WriteLinkedCasesFieldComponent_Factory(t) { return new (t || WriteLinkedCasesFieldComponent)(i0.ɵɵdirectiveInject(i1.AbstractAppConfig), i0.ɵɵdirectiveInject(i2.CommonDataService), i0.ɵɵdirectiveInject(i3.CasesService), i0.ɵɵdirectiveInject(i4.LinkedCasesService), i0.ɵɵdirectiveInject(i5.CaseEditDataService)); };
WriteLinkedCasesFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteLinkedCasesFieldComponent, selectors: [["ccd-write-linked-cases-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 7, vars: 7, consts: [[1, "form-group", "govuk-!-margin-bottom-2", 3, "formGroup"], [1, "govuk-form-group", 3, "ngSwitch"], [4, "ngSwitchCase"], [3, "linkedCasesStateEmitter"]], template: function WriteLinkedCasesFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
        i0.ɵɵtemplate(2, WriteLinkedCasesFieldComponent_ng_container_2_Template, 2, 0, "ng-container", 2);
        i0.ɵɵtemplate(3, WriteLinkedCasesFieldComponent_ng_container_3_Template, 2, 0, "ng-container", 2);
        i0.ɵɵtemplate(4, WriteLinkedCasesFieldComponent_ng_container_4_Template, 2, 0, "ng-container", 2);
        i0.ɵɵtemplate(5, WriteLinkedCasesFieldComponent_ng_container_5_Template, 2, 0, "ng-container", 2);
        i0.ɵɵtemplate(6, WriteLinkedCasesFieldComponent_ng_container_6_Template, 2, 0, "ng-container", 2);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.formGroup);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitch", ctx.linkedCasesPage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.linkedCasesPages.BEFORE_YOU_START);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.linkedCasesPages.NO_LINKED_CASES);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.linkedCasesPages.LINK_CASE);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.linkedCasesPages.UNLINK_CASE);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.linkedCasesPages.CHECK_YOUR_ANSWERS);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteLinkedCasesFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-linked-cases-field', template: "<div class=\"form-group govuk-!-margin-bottom-2\" [formGroup]=\"formGroup\">\n  <div class=\"govuk-form-group\" [ngSwitch]=\"linkedCasesPage\">\n    <ng-container *ngSwitchCase=\"linkedCasesPages.BEFORE_YOU_START\">\n      <ccd-linked-cases-before-you-start\n        (linkedCasesStateEmitter)=\"onLinkedCasesStateEmitted($event)\"></ccd-linked-cases-before-you-start>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"linkedCasesPages.NO_LINKED_CASES\">\n      <ccd-no-linked-cases\n        (linkedCasesStateEmitter)=\"onLinkedCasesStateEmitted($event)\"></ccd-no-linked-cases>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"linkedCasesPages.LINK_CASE\">\n      <ccd-link-cases\n        (linkedCasesStateEmitter)=\"onLinkedCasesStateEmitted($event)\"></ccd-link-cases>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"linkedCasesPages.UNLINK_CASE\">\n      <ccd-unlink-cases\n        (linkedCasesStateEmitter)=\"onLinkedCasesStateEmitted($event)\"></ccd-unlink-cases>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"linkedCasesPages.CHECK_YOUR_ANSWERS\">\n      <ccd-linked-cases-check-your-answers\n        (linkedCasesStateEmitter)=\"onLinkedCasesStateEmitted($event)\"></ccd-linked-cases-check-your-answers>\n    </ng-container>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i1.AbstractAppConfig }, { type: i2.CommonDataService }, { type: i3.CasesService }, { type: i4.LinkedCasesService }, { type: i5.CaseEditDataService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtbGlua2VkLWNhc2VzLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2xpbmtlZC1jYXNlcy93cml0ZS1saW5rZWQtY2FzZXMtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbGlua2VkLWNhc2VzL3dyaXRlLWxpbmtlZC1jYXNlcy1maWVsZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFHdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDOUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RCxPQUFPLEVBQTRCLHdCQUF3QixFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQy9GLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFlBQVksQ0FBQzs7Ozs7Ozs7O0lDVDVDLDZCQUFnRTtJQUM5RCw0REFDZ0U7SUFBOUQseVBBQTJCLGVBQUEsd0NBQWlDLENBQUEsSUFBQztJQUFDLGlCQUFvQztJQUN0RywwQkFB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QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNoRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQzthQUN2RDtZQUNELHVDQUF1QztZQUN2QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx5QkFBeUI7Z0JBQ3RFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDO3VCQUN2RixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQjtnQkFDbkMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OzRHQW5KVSw4QkFBOEI7aUZBQTlCLDhCQUE4QjtRQ2pCM0MsOEJBQXdFLGFBQUE7UUFFcEUsaUdBR2U7UUFDZixpR0FHZTtRQUNmLGlHQUdlO1FBQ2YsaUdBR2U7UUFDZixpR0FHZTtRQUNqQixpQkFBTSxFQUFBOztRQXRCd0MseUNBQXVCO1FBQ3ZDLGVBQTRCO1FBQTVCLDhDQUE0QjtRQUN6QyxlQUErQztRQUEvQyxvRUFBK0M7UUFJL0MsZUFBOEM7UUFBOUMsbUVBQThDO1FBSTlDLGVBQXdDO1FBQXhDLDZEQUF3QztRQUl4QyxlQUEwQztRQUExQywrREFBMEM7UUFJMUMsZUFBaUQ7UUFBakQsc0VBQWlEOzt1RkREdkQsOEJBQThCO2NBSjFDLFNBQVM7MkJBQ0UsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWJzdHJhY3RBcHBDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9hcHAuY29uZmlnJztcbmltcG9ydCB7IENhc2VFZGl0RGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb21tb25zL2Nhc2UtZWRpdC1kYXRhJztcbmltcG9ydCB7IEVycm9yTWVzc2FnZSB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbic7XG5pbXBvcnQgeyBDYXNlVmlldyB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcnO1xuaW1wb3J0IHsgQ29tbW9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9jb21tb24tZGF0YS1zZXJ2aWNlL2NvbW1vbi1kYXRhLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FzZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY2FzZS1lZGl0b3Ivc2VydmljZXMvY2FzZXMuc2VydmljZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLWZpZWxkJztcbmltcG9ydCB7IENhc2VMaW5rLCBMaW5rZWRDYXNlc1N0YXRlIH0gZnJvbSAnLi9kb21haW4nO1xuaW1wb3J0IHsgTGlua2VkQ2FzZXNFcnJvck1lc3NhZ2VzLCBMaW5rZWRDYXNlc0V2ZW50VHJpZ2dlcnMsIExpbmtlZENhc2VzUGFnZXMgfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7IExpbmtlZENhc2VzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2Qtd3JpdGUtbGlua2VkLWNhc2VzLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dyaXRlLWxpbmtlZC1jYXNlcy1maWVsZC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgV3JpdGVMaW5rZWRDYXNlc0ZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgcHVibGljIGNhc2VFZGl0Rm9ybTogVW50eXBlZEZvcm1Hcm91cDtcbiAgcHVibGljIGNhc2VEZXRhaWxzOiBDYXNlVmlldztcbiAgcHVibGljIGxpbmtlZENhc2VzUGFnZTogbnVtYmVyO1xuICBwdWJsaWMgbGlua2VkQ2FzZXNQYWdlcyA9IExpbmtlZENhc2VzUGFnZXM7XG4gIHB1YmxpYyBsaW5rZWRDYXNlc0V2ZW50VHJpZ2dlcnMgPSBMaW5rZWRDYXNlc0V2ZW50VHJpZ2dlcnM7XG4gIHB1YmxpYyBsaW5rZWRDYXNlczogQ2FzZUxpbmtbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXBwQ29uZmlnOiBBYnN0cmFjdEFwcENvbmZpZyxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbW1vbkRhdGFTZXJ2aWNlOiBDb21tb25EYXRhU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VzU2VydmljZTogQ2FzZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGlua2VkQ2FzZXNTZXJ2aWNlOiBMaW5rZWRDYXNlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXNlRWRpdERhdGFTZXJ2aWNlOiBDYXNlRWRpdERhdGFTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBUaGlzIGlzIHJlcXVpcmVkIHRvIGVuYWJsZSBDb250aW51ZSBidXR0b24gdmFsaWRhdGlvblxuICAgIC8vIENvbnRpbnVlIGJ1dHRvbiBzaG91bGQgYmUgZW5hYmxlZCBvbmx5IGF0IGNoZWNrIHlvdXIgYW5zd2VycyBwYWdlXG4gICAgdGhpcy5jYXNlRWRpdERhdGFTZXJ2aWNlLnNldExpbmtlZENhc2VzSm91cm5leUF0RmluYWxTdGVwKGZhbHNlKTtcbiAgICAvLyBDbGVhciB2YWxpZGF0aW9uIGVycm9yc1xuICAgIHRoaXMuY2FzZUVkaXREYXRhU2VydmljZS5jbGVhckZvcm1WYWxpZGF0aW9uRXJyb3JzKCk7XG4gICAgLy8gR2V0IGxpbmtlZCBjYXNlIHJlYXNvbnMgZnJvbSByZWYgZGF0YVxuICAgIHRoaXMuZ2V0TGlua2VkQ2FzZVJlYXNvbnMoKTtcbiAgICB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIHRoaXMuY2FzZUVkaXREYXRhU2VydmljZS5jYXNlRGV0YWlscyQuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IGNhc2VEZXRhaWxzID0+IHRoaXMuaW5pdGlhbGlzZUNhc2VEZXRhaWxzKGNhc2VEZXRhaWxzKVxuICAgIH0pO1xuICAgIHRoaXMuY2FzZUVkaXREYXRhU2VydmljZS5jYXNlRXZlbnRUcmlnZ2VyTmFtZSQuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IG5hbWUgPT4gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuaXNMaW5rZWRDYXNlc0V2ZW50VHJpZ2dlciA9IChuYW1lID09PSBMaW5rZWRDYXNlc0V2ZW50VHJpZ2dlcnMuTElOS19DQVNFUylcbiAgICB9KTtcbiAgICB0aGlzLmNhc2VFZGl0RGF0YVNlcnZpY2UuY2FzZUVkaXRGb3JtJC5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogZWRpdEZvcm0gPT4gdGhpcy5jYXNlRWRpdEZvcm0gPSBlZGl0Rm9ybVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGluaXRpYWxpc2VDYXNlRGV0YWlscyhjYXNlRGV0YWlsczogQ2FzZVZpZXcpOiB2b2lkIHtcbiAgICBpZiAoY2FzZURldGFpbHMpIHtcbiAgICAgIHRoaXMuY2FzZURldGFpbHMgPSBjYXNlRGV0YWlscztcbiAgICAgIHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmNhc2VEZXRhaWxzID0gY2FzZURldGFpbHM7XG4gICAgICB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5jYXNlSWQgPSBjYXNlRGV0YWlscy5jYXNlX2lkO1xuICAgICAgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuY2FzZU5hbWUgPSB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5nZXRDYXNlTmFtZShjYXNlRGV0YWlscyk7XG4gICAgICB0aGlzLmdldExpbmtlZENhc2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBsZXQgbGFiZWxGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dvdnVrLWhlYWRpbmctbCcpO1xuICAgIGlmIChsYWJlbEZpZWxkICYmIGxhYmVsRmllbGQubGVuZ3RoKSB7XG4gICAgICBsYWJlbEZpZWxkWzBdLnJlcGxhY2VXaXRoKCcnKTtcbiAgICB9XG4gICAgbGFiZWxGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hlYWRpbmctaDInKTtcbiAgICBpZiAobGFiZWxGaWVsZCAmJiBsYWJlbEZpZWxkLmxlbmd0aCkge1xuICAgICAgbGFiZWxGaWVsZFswXS5yZXBsYWNlV2l0aCgnJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uTGlua2VkQ2FzZXNTdGF0ZUVtaXR0ZWQobGlua2VkQ2FzZXNTdGF0ZTogTGlua2VkQ2FzZXNTdGF0ZSk6IHZvaWQge1xuICAgIC8vIENsZWFyIHZhbGlkYXRpb24gZXJyb3JzXG4gICAgdGhpcy5jYXNlRWRpdERhdGFTZXJ2aWNlLmNsZWFyRm9ybVZhbGlkYXRpb25FcnJvcnMoKTtcblxuICAgIGlmIChsaW5rZWRDYXNlc1N0YXRlLm5hdmlnYXRlVG9OZXh0UGFnZSkge1xuICAgICAgdGhpcy5saW5rZWRDYXNlc1BhZ2UgPSB0aGlzLmdldE5leHRQYWdlKGxpbmtlZENhc2VzU3RhdGUpO1xuICAgICAgdGhpcy5wcm9jZWVkVG9OZXh0UGFnZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobGlua2VkQ2FzZXNTdGF0ZS5lcnJvck1lc3NhZ2VzICYmIGxpbmtlZENhc2VzU3RhdGUuZXJyb3JNZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgbGlua2VkQ2FzZXNTdGF0ZS5lcnJvck1lc3NhZ2VzLmZvckVhY2goKGVycm9yTWVzc2FnZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICB0aGlzLmNhc2VFZGl0RGF0YVNlcnZpY2UuYWRkRm9ybVZhbGlkYXRpb25FcnJvcih7IGlkOiBlcnJvck1lc3NhZ2UuZmllbGRJZCwgbWVzc2FnZTogZXJyb3JNZXNzYWdlLmRlc2NyaXB0aW9uIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlua2VkQ2FzZVJlYXNvbnMoKTogdm9pZCB7XG4gICAgY29uc3QgcmVhc29uQ29kZUFQSXVybCA9IGAke3RoaXMuYXBwQ29uZmlnLmdldFJEQ29tbW9uRGF0YUFwaVVybCgpfS9sb3YvY2F0ZWdvcmllcy9DYXNlTGlua2luZ1JlYXNvbkNvZGVgO1xuICAgIHRoaXMuY29tbW9uRGF0YVNlcnZpY2UuZ2V0UmVmRGF0YShyZWFzb25Db2RlQVBJdXJsKS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogcmVhc29ucyA9PiB7XG4gICAgICAgIC8vIFNvcnQgaW4gYXNjZW5kaW5nIG9yZGVyXG4gICAgICAgIGNvbnN0IGxpbmtDYXNlUmVhc29ucyA9IHJlYXNvbnMubGlzdF9vZl92YWx1ZXMuc29ydCgoYSwgYikgPT4gKGEudmFsdWVfZW4gPiBiLnZhbHVlX2VuKSA/IDEgOiAtMSk7XG4gICAgICAgIC8vIE1vdmUgT3RoZXIgb3B0aW9uIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3RcbiAgICAgICAgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UubGlua0Nhc2VSZWFzb25zID0gbGlua0Nhc2VSZWFzb25zPy5maWx0ZXIocmVhc29uID0+IHJlYXNvbi52YWx1ZV9lbiAhPT0gJ090aGVyJyk7XG4gICAgICAgIHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmxpbmtDYXNlUmVhc29ucy5wdXNoKGxpbmtDYXNlUmVhc29ucz8uZmluZChyZWFzb24gPT4gcmVhc29uLnZhbHVlX2VuID09PSAnT3RoZXInKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcHJvY2VlZFRvTmV4dFBhZ2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNBdEZpbmFsUGFnZSgpKSB7XG4gICAgICAvLyBDb250aW51ZSBidXR0b24gZXZlbnQgbXVzdCBiZSBhbGxvd2VkIGluIGZpbmFsIHBhZ2VcbiAgICAgIHRoaXMuY2FzZUVkaXREYXRhU2VydmljZS5zZXRMaW5rZWRDYXNlc0pvdXJuZXlBdEZpbmFsU3RlcCh0cnVlKTtcbiAgICAgIC8vIFRyaWdnZXIgdmFsaWRhdGlvbiB0byBjbGVhciB0aGUgXCJub3RBdEZpbmFsUGFnZVwiIGVycm9yIGlmIG5vdyBhdCB0aGUgZmluYWwgc3RhdGVcbiAgICAgIHRoaXMuZm9ybUdyb3VwLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgIC8vIHVwZGF0ZSBmb3JtIHZhbHVlXG4gICAgICB0aGlzLnN1Ym1pdExpbmtlZENhc2VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENvbnRpbnVlIGJ1dHRvbiBldmVudCBtdXN0IG5vdCBiZSBhbGxvd2VkIGlmIG5vdCBpbiBmaW5hbCBwYWdlXG4gICAgICB0aGlzLmNhc2VFZGl0RGF0YVNlcnZpY2Uuc2V0TGlua2VkQ2FzZXNKb3VybmV5QXRGaW5hbFN0ZXAoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdWJtaXRMaW5rZWRDYXNlcygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmlzTGlua2VkQ2FzZXNFdmVudFRyaWdnZXIpIHtcbiAgICAgIGNvbnN0IHVubGlua2VkQ2FzZVJlZmVyZW5lSWRzID0gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UubGlua2VkQ2FzZXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS51bmxpbmspLm1hcChpdGVtID0+IGl0ZW0uY2FzZVJlZmVyZW5jZSk7XG4gICAgICBjb25zdCBjYXNlRmllbGRWYWx1ZSA9IHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmNhc2VGaWVsZFZhbHVlO1xuICAgICAgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuY2FzZUZpZWxkVmFsdWUgPSBjYXNlRmllbGRWYWx1ZS5maWx0ZXIoaXRlbSA9PiB1bmxpbmtlZENhc2VSZWZlcmVuZUlkcy5pbmRleE9mKGl0ZW0uaWQpID09PSAtMSk7XG4gICAgfVxuICAgIHRoaXMuZm9ybUdyb3VwLnZhbHVlLmNhc2VMaW5rcyA9IHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmNhc2VGaWVsZFZhbHVlO1xuICAgICh0aGlzLmNhc2VFZGl0Rm9ybS5jb250cm9sc1snZGF0YSddIGFzIGFueSkgPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7IGNhc2VMaW5rczogbmV3IEZvcm1Db250cm9sKHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmNhc2VGaWVsZFZhbHVlIHx8IFtdKSB9KTtcbiAgICB0aGlzLmNhc2VFZGl0RGF0YVNlcnZpY2Uuc2V0Q2FzZUVkaXRGb3JtKHRoaXMuY2FzZUVkaXRGb3JtKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0F0RmluYWxQYWdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxpbmtlZENhc2VzUGFnZSA9PT0gdGhpcy5saW5rZWRDYXNlc1BhZ2VzLkNIRUNLX1lPVVJfQU5TV0VSUztcbiAgfVxuXG4gIHB1YmxpYyBnZXROZXh0UGFnZShsaW5rZWRDYXNlc1N0YXRlOiBMaW5rZWRDYXNlc1N0YXRlKTogbnVtYmVyIHtcbiAgICBpZiAoKHRoaXMubGlua2VkQ2FzZXNQYWdlID09PSBMaW5rZWRDYXNlc1BhZ2VzLkJFRk9SRV9ZT1VfU1RBUlQpIHx8XG4gICAgICAobGlua2VkQ2FzZXNTdGF0ZS5jdXJyZW50TGlua2VkQ2FzZXNQYWdlID09PSBMaW5rZWRDYXNlc1BhZ2VzLkNIRUNLX1lPVVJfQU5TV0VSUyAmJiBsaW5rZWRDYXNlc1N0YXRlLm5hdmlnYXRlVG9QcmV2aW91c1BhZ2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuaXNMaW5rZWRDYXNlc0V2ZW50VHJpZ2dlclxuICAgICAgICA/IExpbmtlZENhc2VzUGFnZXMuTElOS19DQVNFXG4gICAgICAgIDogTGlua2VkQ2FzZXNQYWdlcy5VTkxJTktfQ0FTRTtcbiAgICB9XG4gICAgcmV0dXJuIExpbmtlZENhc2VzUGFnZXMuQ0hFQ0tfWU9VUl9BTlNXRVJTO1xuICB9XG5cbiAgcHVibGljIGdldExpbmtlZENhc2VzKCk6IHZvaWQge1xuICAgIHRoaXMuY2FzZXNTZXJ2aWNlLmdldENhc2VWaWV3VjIodGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuY2FzZUlkKS5zdWJzY3JpYmUoKGNhc2VWaWV3OiBDYXNlVmlldykgPT4ge1xuICAgICAgY29uc3QgY2FzZVZpZXdGaWx0ZXJlZCA9IGNhc2VWaWV3LnRhYnMuZmlsdGVyKHRhYiA9PiB7XG4gICAgICAgIHJldHVybiB0YWIuZmllbGRzLnNvbWUoXG4gICAgICAgICAgKHsgZmllbGRfdHlwZSB9KSA9PiBmaWVsZF90eXBlICYmIGZpZWxkX3R5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlICYmIGZpZWxkX3R5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlLmlkID09PSAnQ2FzZUxpbmsnXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICAgIGlmIChjYXNlVmlld0ZpbHRlcmVkKSB7XG4gICAgICAgIGNvbnN0IGNhc2VMaW5rRmllbGRWYWx1ZSA9IGNhc2VWaWV3RmlsdGVyZWQubWFwKGZpbHRlcmVkID0+XG4gICAgICAgICAgZmlsdGVyZWQuZmllbGRzPy5sZW5ndGggPiAwICYmIGZpbHRlcmVkLmZpZWxkcy5maWx0ZXIoZmllbGQgPT4gZmllbGQuaWQgPT09ICdjYXNlTGlua3MnKVswXS52YWx1ZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5jYXNlRmllbGRWYWx1ZSA9IGNhc2VMaW5rRmllbGRWYWx1ZS5sZW5ndGggPyBjYXNlTGlua0ZpZWxkVmFsdWVbMF0gOiBbXTtcbiAgICAgICAgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuZ2V0QWxsTGlua2VkQ2FzZUluZm9ybWF0aW9uKCk7XG4gICAgICB9XG4gICAgICAvLyBJbml0aWFsaXNlIHRoZSBmaXJzdCBwYWdlIHRvIGRpc3BsYXlcbiAgICAgIHRoaXMubGlua2VkQ2FzZXNQYWdlID0gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuaXNMaW5rZWRDYXNlc0V2ZW50VHJpZ2dlciB8fFxuICAgICAgICAodGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuY2FzZUZpZWxkVmFsdWUgJiYgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuY2FzZUZpZWxkVmFsdWUubGVuZ3RoID4gMFxuICAgICAgICAgICYmICF0aGlzLmxpbmtlZENhc2VzU2VydmljZS5zZXJ2ZXJMaW5rZWRBcGlFcnJvcilcbiAgICAgICAgPyBMaW5rZWRDYXNlc1BhZ2VzLkJFRk9SRV9ZT1VfU1RBUlRcbiAgICAgICAgOiBMaW5rZWRDYXNlc1BhZ2VzLk5PX0xJTktFRF9DQVNFUztcbiAgICB9KTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZ292dWstIS1tYXJnaW4tYm90dG9tLTJcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiIFtuZ1N3aXRjaF09XCJsaW5rZWRDYXNlc1BhZ2VcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJsaW5rZWRDYXNlc1BhZ2VzLkJFRk9SRV9ZT1VfU1RBUlRcIj5cbiAgICAgIDxjY2QtbGlua2VkLWNhc2VzLWJlZm9yZS15b3Utc3RhcnRcbiAgICAgICAgKGxpbmtlZENhc2VzU3RhdGVFbWl0dGVyKT1cIm9uTGlua2VkQ2FzZXNTdGF0ZUVtaXR0ZWQoJGV2ZW50KVwiPjwvY2NkLWxpbmtlZC1jYXNlcy1iZWZvcmUteW91LXN0YXJ0PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImxpbmtlZENhc2VzUGFnZXMuTk9fTElOS0VEX0NBU0VTXCI+XG4gICAgICA8Y2NkLW5vLWxpbmtlZC1jYXNlc1xuICAgICAgICAobGlua2VkQ2FzZXNTdGF0ZUVtaXR0ZXIpPVwib25MaW5rZWRDYXNlc1N0YXRlRW1pdHRlZCgkZXZlbnQpXCI+PC9jY2Qtbm8tbGlua2VkLWNhc2VzPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImxpbmtlZENhc2VzUGFnZXMuTElOS19DQVNFXCI+XG4gICAgICA8Y2NkLWxpbmstY2FzZXNcbiAgICAgICAgKGxpbmtlZENhc2VzU3RhdGVFbWl0dGVyKT1cIm9uTGlua2VkQ2FzZXNTdGF0ZUVtaXR0ZWQoJGV2ZW50KVwiPjwvY2NkLWxpbmstY2FzZXM+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwibGlua2VkQ2FzZXNQYWdlcy5VTkxJTktfQ0FTRVwiPlxuICAgICAgPGNjZC11bmxpbmstY2FzZXNcbiAgICAgICAgKGxpbmtlZENhc2VzU3RhdGVFbWl0dGVyKT1cIm9uTGlua2VkQ2FzZXNTdGF0ZUVtaXR0ZWQoJGV2ZW50KVwiPjwvY2NkLXVubGluay1jYXNlcz5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJsaW5rZWRDYXNlc1BhZ2VzLkNIRUNLX1lPVVJfQU5TV0VSU1wiPlxuICAgICAgPGNjZC1saW5rZWQtY2FzZXMtY2hlY2steW91ci1hbnN3ZXJzXG4gICAgICAgIChsaW5rZWRDYXNlc1N0YXRlRW1pdHRlcik9XCJvbkxpbmtlZENhc2VzU3RhdGVFbWl0dGVkKCRldmVudClcIj48L2NjZC1saW5rZWQtY2FzZXMtY2hlY2steW91ci1hbnN3ZXJzPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19