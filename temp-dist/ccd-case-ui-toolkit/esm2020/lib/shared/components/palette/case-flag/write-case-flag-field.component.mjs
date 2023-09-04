import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CaseEditDataService } from '../../../commons/case-edit-data/case-edit-data.service';
import { FieldsUtils } from '../../../services/fields';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { CaseFlagFieldState, CaseFlagStatus, CaseFlagText } from './enums';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../commons/case-edit-data/case-edit-data.service";
function WriteCaseFlagFieldComponent_div_0_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "ul", 6)(2, "li")(3, "a", 7);
    i0.ɵɵlistener("click", function WriteCaseFlagFieldComponent_div_0_div_4_Template_a_click_3_listener() { const restoredCtx = i0.ɵɵrestoreView(_r6); const errorMessage_r4 = restoredCtx.$implicit; const ctx_r5 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r5.navigateToErrorElement(errorMessage_r4.fieldId)); });
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "rpxTranslate");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const errorMessage_r4 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 1, errorMessage_r4.description));
} }
function WriteCaseFlagFieldComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2)(1, "h2", 3);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, WriteCaseFlagFieldComponent_div_0_div_4_Template, 6, 3, "div", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 2, "There is a problem"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.errorMessages);
} }
function WriteCaseFlagFieldComponent_div_1_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccd-select-flag-location", 12);
    i0.ɵɵlistener("caseFlagStateEmitter", function WriteCaseFlagFieldComponent_div_1_ng_container_5_Template_ccd_select_flag_location_caseFlagStateEmitter_1_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r11.onCaseFlagStateEmitted($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroup", ctx_r7.caseFlagParentFormGroup)("flagsData", ctx_r7.flagsData);
} }
function WriteCaseFlagFieldComponent_div_1_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccd-select-flag-type", 13);
    i0.ɵɵlistener("caseFlagStateEmitter", function WriteCaseFlagFieldComponent_div_1_ng_container_6_Template_ccd_select_flag_type_caseFlagStateEmitter_1_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r13.onCaseFlagStateEmitted($event)); })("flagCommentsOptionalEmitter", function WriteCaseFlagFieldComponent_div_1_ng_container_6_Template_ccd_select_flag_type_flagCommentsOptionalEmitter_1_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r15 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r15.onFlagCommentsOptionalEmitted($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroup", ctx_r8.caseFlagParentFormGroup)("jurisdiction", ctx_r8.jurisdiction)("caseTypeId", ctx_r8.caseTypeId)("hmctsServiceId", ctx_r8.hmctsServiceId);
} }
function WriteCaseFlagFieldComponent_div_1_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccd-search-language-interpreter", 14);
    i0.ɵɵlistener("caseFlagStateEmitter", function WriteCaseFlagFieldComponent_div_1_ng_container_7_Template_ccd_search_language_interpreter_caseFlagStateEmitter_1_listener($event) { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r16.onCaseFlagStateEmitted($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroup", ctx_r9.caseFlagParentFormGroup)("languages", ctx_r9.listOfValues)("flagCode", ctx_r9.flagCode);
} }
function WriteCaseFlagFieldComponent_div_1_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccd-add-comments", 15);
    i0.ɵɵlistener("caseFlagStateEmitter", function WriteCaseFlagFieldComponent_div_1_ng_container_8_Template_ccd_add_comments_caseFlagStateEmitter_1_listener($event) { i0.ɵɵrestoreView(_r19); const ctx_r18 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r18.onCaseFlagStateEmitted($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroup", ctx_r10.caseFlagParentFormGroup)("optional", ctx_r10.flagCommentsOptional);
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
function WriteCaseFlagFieldComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 9)(2, "div", 10);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, WriteCaseFlagFieldComponent_div_1_ng_container_5_Template, 2, 2, "ng-container", 11);
    i0.ɵɵtemplate(6, WriteCaseFlagFieldComponent_div_1_ng_container_6_Template, 2, 4, "ng-container", 11);
    i0.ɵɵtemplate(7, WriteCaseFlagFieldComponent_div_1_ng_container_7_Template, 2, 3, "ng-container", 11);
    i0.ɵɵtemplate(8, WriteCaseFlagFieldComponent_div_1_ng_container_8_Template, 2, 2, "ng-container", 11);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.formGroup);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitch", ctx_r1.fieldState);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c0, ctx_r1.errorMessages.length > 0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 8, ctx_r1.createFlagCaption), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngSwitchCase", ctx_r1.caseFlagFieldState.FLAG_LOCATION);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r1.caseFlagFieldState.FLAG_TYPE);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r1.caseFlagFieldState.FLAG_LANGUAGE_INTERPRETER);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r1.caseFlagFieldState.FLAG_COMMENTS);
} }
function WriteCaseFlagFieldComponent_div_2_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccd-manage-case-flags", 16);
    i0.ɵɵlistener("caseFlagStateEmitter", function WriteCaseFlagFieldComponent_div_2_ng_container_2_Template_ccd_manage_case_flags_caseFlagStateEmitter_1_listener($event) { i0.ɵɵrestoreView(_r23); const ctx_r22 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r22.onCaseFlagStateEmitted($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroup", ctx_r20.caseFlagParentFormGroup)("flagsData", ctx_r20.flagsData)("caseTitle", ctx_r20.caseTitle);
} }
function WriteCaseFlagFieldComponent_div_2_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ccd-update-flag", 17);
    i0.ɵɵlistener("caseFlagStateEmitter", function WriteCaseFlagFieldComponent_div_2_ng_container_3_Template_ccd_update_flag_caseFlagStateEmitter_1_listener($event) { i0.ɵɵrestoreView(_r25); const ctx_r24 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r24.onCaseFlagStateEmitted($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r21 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroup", ctx_r21.caseFlagParentFormGroup)("selectedFlag", ctx_r21.selectedFlag);
} }
function WriteCaseFlagFieldComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 9);
    i0.ɵɵtemplate(2, WriteCaseFlagFieldComponent_div_2_ng_container_2_Template, 2, 3, "ng-container", 11);
    i0.ɵɵtemplate(3, WriteCaseFlagFieldComponent_div_2_ng_container_3_Template, 2, 2, "ng-container", 11);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r2.formGroup);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitch", ctx_r2.fieldState);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r2.caseFlagFieldState.FLAG_MANAGE_CASE_FLAGS);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r2.caseFlagFieldState.FLAG_UPDATE);
} }
export class WriteCaseFlagFieldComponent extends AbstractFieldWriteComponent {
    constructor(route, caseEditDataService) {
        super();
        this.route = route;
        this.caseEditDataService = caseEditDataService;
        this.caseFlagFieldState = CaseFlagFieldState;
        this.errorMessages = [];
        this.caseFlagParentFormGroup = new UntypedFormGroup({});
        this.flagCommentsOptional = false;
        this.listOfValues = null;
        this.allCaseFlagStagesCompleted = false;
        this.updateMode = '#ARGUMENT(UPDATE)';
        // Code for "Other" flag type as defined in Reference Data
        this.otherFlagTypeCode = 'OT0001';
        this.caseNameMissing = 'Case name missing';
    }
    ngOnInit() {
        this.caseEditDataService.clearFormValidationErrors();
        // Check for existing FlagLauncher control in parent and remove it - this is the only way to ensure its invalidity
        // is set correctly at the start, when the component is reloaded and the control is re-registered. Otherwise, the
        // validator state gets carried over
        if (this.formGroup && this.formGroup.get(this.caseField.id)) {
            this.formGroup.removeControl(this.caseField.id);
        }
        // From this point, this.formGroup refers to the UntypedFormGroup for the FlagLauncher field, not the parent UntypedFormGroup
        this.formGroup = this.registerControl(new UntypedFormGroup({}, {
            validators: (_) => {
                if (!this.allCaseFlagStagesCompleted) {
                    // Return an error to mark the UntypedFormGroup as invalid if not all Case Flag stages have been completed
                    return { notAllCaseFlagStagesCompleted: true };
                }
                return null;
            }
        }), true);
        this.createFlagCaption = CaseFlagText.CAPTION;
        // Get the case type ID from the CaseView object in the snapshot data (required for retrieving the available flag
        // types for a case)
        if (this.route.snapshot.data.case && this.route.snapshot.data.case.case_type) {
            this.caseTypeId = this.route.snapshot.data.case.case_type.id;
            // Get the jurisdiction (required for retrieving the available flag types if unable to determine using case type ID)
            if (this.route.snapshot.data.case.case_type.jurisdiction) {
                this.jurisdiction = this.route.snapshot.data.case.case_type.jurisdiction.id;
            }
        }
        // Extract all flags-related data from the CaseEventTrigger object in the snapshot data
        if (this.route.snapshot.data.eventTrigger) {
            // Get the HMCTSServiceId from supplementary data, if it exists (required for retrieving the available flag types in
            // the first instance, only falling back on case type ID or jurisidiction if it's not present)
            if (this.route.snapshot.data.eventTrigger.supplementary_data
                && this.route.snapshot.data.eventTrigger.supplementary_data.HMCTSServiceId) {
                this.hmctsServiceId = this.route.snapshot.data.eventTrigger.supplementary_data.HMCTSServiceId;
            }
            if (this.route.snapshot.data.eventTrigger.case_fields) {
                this.flagsData = (this.route.snapshot.data.eventTrigger.case_fields)
                    .reduce((flags, caseField) => {
                    return FieldsUtils.extractFlagsDataFromCaseField(flags, caseField, caseField.id, caseField);
                }, []);
                // Set boolean indicating the display_context_parameter is "update"
                this.isDisplayContextParameterUpdate =
                    this.setDisplayContextParameterUpdate((this.route.snapshot.data.eventTrigger.case_fields));
                // Set starting field state
                this.fieldState = this.isDisplayContextParameterUpdate ? CaseFlagFieldState.FLAG_MANAGE_CASE_FLAGS : CaseFlagFieldState.FLAG_LOCATION;
                // Get case title, to be used by child components
                this.caseEditDataService.caseTitle$.subscribe({
                    next: title => {
                        this.caseTitle = title.length > 0 ? title : this.caseNameMissing;
                    }
                });
            }
        }
    }
    setDisplayContextParameterUpdate(caseFields) {
        return caseFields.some(caseField => FieldsUtils.isFlagLauncherCaseField(caseField) && caseField.display_context_parameter === this.updateMode);
    }
    onCaseFlagStateEmitted(caseFlagState) {
        this.caseEditDataService.clearFormValidationErrors();
        // If the current state is CaseFlagFieldState.FLAG_LOCATION and a flag location (a Flags instance) has been selected,
        // set the parent Case Flag UntypedFormGroup for this component's children by using the provided pathToFlagsFormGroup, and
        // set the selected flag location on this component
        if (caseFlagState.currentCaseFlagFieldState === CaseFlagFieldState.FLAG_LOCATION
            && caseFlagState.selectedFlagsLocation
            && caseFlagState.selectedFlagsLocation.pathToFlagsFormGroup) {
            this.setCaseFlagParentFormGroup(caseFlagState.selectedFlagsLocation.pathToFlagsFormGroup);
            this.selectedFlagsLocation = caseFlagState.selectedFlagsLocation;
        }
        // If the current state is CaseFlagFieldState.FLAG_TYPE, cache the flag name, path, hearing relevant indicator, code,
        // and "list of values" (currently applicable to language flag types)
        if (caseFlagState.currentCaseFlagFieldState === CaseFlagFieldState.FLAG_TYPE) {
            this.flagName = caseFlagState.flagName;
            this.flagPath = caseFlagState.flagPath;
            this.hearingRelevantFlag = caseFlagState.hearingRelevantFlag;
            this.flagCode = caseFlagState.flagCode;
            this.listOfValues = caseFlagState.listOfValues;
        }
        // If the current state is CaseFlagFieldState.FLAG_MANAGE_CASE_FLAGS and a flag has been selected, set the parent
        // Case Flag UntypedFormGroup for this component's children by using the provided pathToFlagsFormGroup
        if (caseFlagState.currentCaseFlagFieldState === CaseFlagFieldState.FLAG_MANAGE_CASE_FLAGS
            && caseFlagState.selectedFlag
            && caseFlagState.selectedFlag.pathToFlagsFormGroup) {
            this.setCaseFlagParentFormGroup(caseFlagState.selectedFlag.pathToFlagsFormGroup);
        }
        this.errorMessages = caseFlagState.errorMessages;
        this.selectedFlag = caseFlagState.selectedFlag;
        // Validation succeeded; proceed to next state or final review stage ("Check your answers")
        if (this.errorMessages.length === 0) {
            // If the current state is CaseFlagFieldState.FLAG_COMMENTS or CaseFlagFieldState.FLAG_UPDATE, move to final
            // review stage
            if (caseFlagState.currentCaseFlagFieldState === CaseFlagFieldState.FLAG_COMMENTS ||
                caseFlagState.currentCaseFlagFieldState === CaseFlagFieldState.FLAG_UPDATE) {
                this.moveToFinalReviewStage();
                // Don't move to next state if current state is CaseFlagFieldState.FLAG_TYPE and the flag type is a parent - this
                // means the user needs to select from the next set of flag types before they can move on
            }
            else if (!caseFlagState.isParentFlagType) {
                // Proceed to next state
                this.proceedToNextState();
            }
        }
    }
    proceedToNextState() {
        if (!this.isAtFinalState()) {
            // Skip the "language interpreter" state if current state is CaseFlagFieldState.FLAG_TYPE and the flag type doesn't
            // have a "list of values" - currently, this is present only for those flag types that require language interpreter
            // selection
            if (this.fieldState === CaseFlagFieldState.FLAG_TYPE && !this.listOfValues) {
                this.fieldState = CaseFlagFieldState.FLAG_COMMENTS;
            }
            else {
                this.fieldState++;
            }
        }
    }
    setFlagsCaseFieldValue() {
        // tslint:disable-next-line: switch-default
        switch (this.fieldState) {
            case CaseFlagFieldState.FLAG_COMMENTS:
                this.addFlagToCollection();
                break;
            case CaseFlagFieldState.FLAG_UPDATE:
                this.updateFlagInCollection();
                break;
        }
    }
    addFlagToCollection() {
        // Ensure no more than one new flag is being added at a time, by iterating through each Flags case field and removing
        // any previous entry from the details array where that entry has no id (hence it is new - and there should be only
        // one such entry). (This scenario occurs if the user repeats the Case Flag creation journey by using the "Change"
        // link and selects either the same flag location as before or a different one.)
        this.flagsData.forEach(instance => {
            // Use the pathToFlagsFormGroup property for each Flags case field to drill down to the correct part of the
            // CaseField value to remove the new value from
            let value = instance.caseField.value;
            const pathToValue = instance.pathToFlagsFormGroup;
            // Root-level Flags CaseFields don't have a dot-delimited path - just the CaseField ID itself - so don't drill down
            if (pathToValue.indexOf('.') > -1) {
                pathToValue.slice(pathToValue.indexOf('.') + 1).split('.').forEach(part => value = value[part]);
            }
            if (value && value.details && value.details.length > 0) {
                const indexOfNewFlagDetail = value.details.findIndex(element => !element.hasOwnProperty('id'));
                if (indexOfNewFlagDetail > -1) {
                    value.details.splice(indexOfNewFlagDetail, 1);
                }
            }
        });
        let flagsCaseFieldValue = this.selectedFlagsLocation.caseField.value;
        // Use the pathToFlagsFormGroup property from the selected flag location to drill down to the correct part of the
        // CaseField value to apply changes to
        const path = this.selectedFlagsLocation.pathToFlagsFormGroup;
        // Root-level Flags CaseFields don't have a dot-delimited path - just the CaseField ID itself - so don't drill down
        if (path.indexOf('.') > -1) {
            path.slice(path.indexOf('.') + 1).split('.').forEach(part => flagsCaseFieldValue = flagsCaseFieldValue[part]);
        }
        // If the CaseField for the selected flags location has no value, set it to an empty object so it can be populated
        // with flag details
        if (!flagsCaseFieldValue) {
            this.selectedFlagsLocation.caseField.value = {};
            flagsCaseFieldValue = this.selectedFlagsLocation.caseField.value;
        }
        // Create a details array if one does not exist
        if (!flagsCaseFieldValue.hasOwnProperty('details')) {
            flagsCaseFieldValue.details = [];
        }
        // Populate new FlagDetail instance and add to the Flags data within the CaseField instance of the selected flag
        // location
        flagsCaseFieldValue.details.push({ value: this.populateNewFlagDetailInstance() });
    }
    updateFlagInCollection() {
        // Ensure no more than one flag is being updated at a time, by iterating through each Flags case field and resetting
        // the comments, status, and date/time modified (if present) for each entry in the details array, with original values
        // from the corresponding formatted_value property. (This scenario occurs if the user repeats the Manage Case Flag
        // journey by using the "Change" link and selects a different flag to update.)
        this.flagsData.forEach(instance => {
            // Use the pathToFlagsFormGroup property for each Flags case field to drill down to the correct part of the
            // CaseField value for which to restore the original values
            let value = instance.caseField.value;
            let formattedValue = instance.caseField.formatted_value;
            const pathToValue = instance.pathToFlagsFormGroup;
            // Root-level Flags CaseFields don't have a dot-delimited path - just the CaseField ID itself - so don't drill down
            if (pathToValue.indexOf('.') > -1) {
                pathToValue.slice(pathToValue.indexOf('.') + 1).split('.').forEach(part => {
                    value = value[part];
                    if (formattedValue && FieldsUtils.isNonEmptyObject(formattedValue)) {
                        formattedValue = formattedValue[part];
                    }
                });
            }
            if (value && value.details && value.details.length > 0 && formattedValue && FieldsUtils.isNonEmptyObject(formattedValue)) {
                value.details.forEach(flagDetail => {
                    const originalFlagDetail = formattedValue.details.find(detail => detail.id === flagDetail.id);
                    if (originalFlagDetail) {
                        flagDetail.value.flagComment = originalFlagDetail.value.flagComment
                            ? originalFlagDetail.value.flagComment
                            : null;
                        flagDetail.value.status = originalFlagDetail.value.status;
                        flagDetail.value.dateTimeModified = originalFlagDetail.value.dateTimeModified
                            ? originalFlagDetail.value.dateTimeModified
                            : null;
                    }
                });
            }
        });
        let flagsCaseFieldValue = this.selectedFlag.caseField.value;
        // Use the pathToFlagsFormGroup property from the selected flag location to drill down to the correct part of the
        // CaseField value to apply changes to
        const path = this.selectedFlag.pathToFlagsFormGroup;
        // Root-level Flags CaseFields don't have a dot-delimited path - just the CaseField ID itself - so don't drill down
        if (path.indexOf('.') > -1) {
            path.slice(path.indexOf('.') + 1).split('.').forEach(part => flagsCaseFieldValue = flagsCaseFieldValue[part]);
        }
        if (flagsCaseFieldValue) {
            const flagDetailToUpdate = flagsCaseFieldValue.details.find(detail => detail.id === this.selectedFlag.flagDetailDisplay.flagDetail.id);
            if (flagDetailToUpdate) {
                flagDetailToUpdate.value.flagComment = this.caseFlagParentFormGroup.value.flagComments
                    ? this.caseFlagParentFormGroup.value.flagComments
                    : null;
                flagDetailToUpdate.value.status = this.selectedFlag.flagDetailDisplay.flagDetail.status;
                flagDetailToUpdate.value.dateTimeModified = new Date().toISOString();
            }
        }
    }
    isAtFinalState() {
        return this.isDisplayContextParameterUpdate
            ? this.fieldState === CaseFlagFieldState.FLAG_UPDATE
            : this.fieldState === CaseFlagFieldState.FLAG_COMMENTS;
    }
    navigateToErrorElement(elementId) {
        if (elementId) {
            const htmlElement = document.getElementById(elementId);
            if (htmlElement) {
                htmlElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                htmlElement.focus();
            }
        }
    }
    onFlagCommentsOptionalEmitted(_) {
        this.flagCommentsOptional = true;
    }
    /**
     * Set the parent {@link UntypedFormGroup} for this component's children, depending on the `Flags` {@link CaseField} instance
     * to which data should be attached. **Note:** The parent is not _this_ component's `UntypedFormGroup` (as might otherwise be
     * expected) because this component is not expected to have a value, given it is used for the empty `FlagLauncher` base
     * field type.
     *
     * @param pathToFlagsFormGroup The dot-delimited string that is the path to the `UntypedFormGroup` for a `Flags` instance
     */
    setCaseFlagParentFormGroup(pathToFlagsFormGroup) {
        this.caseFlagParentFormGroup = this.formGroup.parent.get(pathToFlagsFormGroup);
    }
    populateNewFlagDetailInstance() {
        return {
            name: this.flagName,
            // Currently, subTypeValue and subTypeKey are applicable only to language flag types
            subTypeValue: this.caseFlagParentFormGroup.value.languageSearchTerm
                ? this.caseFlagParentFormGroup.value.languageSearchTerm.value
                : this.caseFlagParentFormGroup.value.manualLanguageEntry
                    ? this.caseFlagParentFormGroup.value.manualLanguageEntry
                    : null,
            // For user-entered (i.e. non-Reference Data) languages, there is no key
            subTypeKey: this.caseFlagParentFormGroup.value.languageSearchTerm
                ? this.caseFlagParentFormGroup.value.languageSearchTerm.key
                : null,
            otherDescription: this.flagCode === this.otherFlagTypeCode && this.caseFlagParentFormGroup.value.otherFlagTypeDescription
                ? this.caseFlagParentFormGroup.value.otherFlagTypeDescription
                : null,
            flagComment: this.caseFlagParentFormGroup.value.flagComments ? this.caseFlagParentFormGroup.value.flagComments : null,
            dateTimeCreated: new Date().toISOString(),
            path: this.flagPath,
            hearingRelevant: this.hearingRelevantFlag ? 'Yes' : 'No',
            flagCode: this.flagCode,
            status: CaseFlagStatus.ACTIVE
        };
    }
    moveToFinalReviewStage() {
        this.setFlagsCaseFieldValue();
        // Clear the "notAllCaseFlagStagesCompleted" error
        this.allCaseFlagStagesCompleted = true;
        this.formGroup.updateValueAndValidity();
        this.caseEditDataService.setTriggerSubmitEvent(true);
    }
}
WriteCaseFlagFieldComponent.ɵfac = function WriteCaseFlagFieldComponent_Factory(t) { return new (t || WriteCaseFlagFieldComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.CaseEditDataService)); };
WriteCaseFlagFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteCaseFlagFieldComponent, selectors: [["ccd-write-case-flag-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 3, consts: [["class", "govuk-error-summary", "aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "govuk-error-summary", 4, "ngIf"], ["class", "form-group", 3, "formGroup", 4, "ngIf"], ["aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "govuk-error-summary", 1, "govuk-error-summary"], ["id", "error-summary-title", 1, "govuk-error-summary__title"], ["class", "govuk-error-summary__body", 4, "ngFor", "ngForOf"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"], [1, "validation-error", 3, "click"], [1, "form-group", 3, "formGroup"], [1, "govuk-form-group", 3, "ngSwitch"], ["id", "create-flag-caption", 1, "govuk-caption-l", 3, "ngClass"], [4, "ngSwitchCase"], [3, "formGroup", "flagsData", "caseFlagStateEmitter"], [3, "formGroup", "jurisdiction", "caseTypeId", "hmctsServiceId", "caseFlagStateEmitter", "flagCommentsOptionalEmitter"], [3, "formGroup", "languages", "flagCode", "caseFlagStateEmitter"], [3, "formGroup", "optional", "caseFlagStateEmitter"], [3, "formGroup", "flagsData", "caseTitle", "caseFlagStateEmitter"], [3, "formGroup", "selectedFlag", "caseFlagStateEmitter"]], template: function WriteCaseFlagFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, WriteCaseFlagFieldComponent_div_0_Template, 5, 4, "div", 0);
        i0.ɵɵtemplate(1, WriteCaseFlagFieldComponent_div_1_Template, 9, 12, "div", 1);
        i0.ɵɵtemplate(2, WriteCaseFlagFieldComponent_div_2_Template, 4, 4, "div", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.errorMessages.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isDisplayContextParameterUpdate);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isDisplayContextParameterUpdate);
    } }, styles: [".validation-error[_ngcontent-%COMP%]{cursor:pointer;text-decoration:underline;color:#d4351c}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteCaseFlagFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-case-flag-field', template: "<!-- Error message summary -->\n<div *ngIf=\"errorMessages.length > 0\" class=\"govuk-error-summary\" aria-labelledby=\"error-summary-title\" role=\"alert\" tabindex=\"-1\" data-module=\"govuk-error-summary\">\n  <h2 class=\"govuk-error-summary__title\" id=\"error-summary-title\">\n    {{'There is a problem' | rpxTranslate}}\n  </h2>\n  <div *ngFor=\"let errorMessage of errorMessages\" class=\"govuk-error-summary__body\">\n    <ul class=\"govuk-list govuk-error-summary__list\">\n      <li>\n        <a (click)=\"navigateToErrorElement(errorMessage.fieldId)\" class=\"validation-error\">{{errorMessage.description | rpxTranslate}}</a>\n      </li>\n    </ul>\n  </div>\n</div>\n<div *ngIf=\"!isDisplayContextParameterUpdate\" class=\"form-group\" [formGroup]=\"formGroup\">\n  <div class=\"govuk-form-group\" [ngSwitch]=\"fieldState\">\n    <div id=\"create-flag-caption\" class=\"govuk-caption-l\" [ngClass]=\"{'form-group-error': errorMessages.length > 0}\">\n      {{createFlagCaption | rpxTranslate}}\n    </div>\n    <ng-container *ngSwitchCase=\"caseFlagFieldState.FLAG_LOCATION\">\n      <ccd-select-flag-location [formGroup]=\"caseFlagParentFormGroup\" [flagsData]=\"flagsData\"\n        (caseFlagStateEmitter)=\"onCaseFlagStateEmitted($event)\"></ccd-select-flag-location>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"caseFlagFieldState.FLAG_TYPE\">\n      <ccd-select-flag-type [formGroup]=\"caseFlagParentFormGroup\" [jurisdiction]=\"jurisdiction\" [caseTypeId]=\"caseTypeId\"\n        [hmctsServiceId]=\"hmctsServiceId\"\n        (caseFlagStateEmitter)=\"onCaseFlagStateEmitted($event)\"\n        (flagCommentsOptionalEmitter)=\"onFlagCommentsOptionalEmitted($event)\"></ccd-select-flag-type>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"caseFlagFieldState.FLAG_LANGUAGE_INTERPRETER\">\n      <ccd-search-language-interpreter [formGroup]=\"caseFlagParentFormGroup\" [languages]=\"listOfValues\" [flagCode]=\"flagCode\"\n        (caseFlagStateEmitter)=\"onCaseFlagStateEmitted($event)\"></ccd-search-language-interpreter>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"caseFlagFieldState.FLAG_COMMENTS\">\n      <ccd-add-comments [formGroup]=\"caseFlagParentFormGroup\" [optional]=\"flagCommentsOptional\"\n        (caseFlagStateEmitter)=\"onCaseFlagStateEmitted($event)\"></ccd-add-comments>\n    </ng-container>\n  </div>\n</div>\n<div *ngIf=\"isDisplayContextParameterUpdate\" class=\"form-group\" [formGroup]=\"formGroup\">\n  <div class=\"govuk-form-group\" [ngSwitch]=\"fieldState\">\n    <ng-container *ngSwitchCase=\"caseFlagFieldState.FLAG_MANAGE_CASE_FLAGS\">\n      <ccd-manage-case-flags [formGroup]=\"caseFlagParentFormGroup\" [flagsData]=\"flagsData\" [caseTitle]=\"caseTitle\"\n        (caseFlagStateEmitter)=\"onCaseFlagStateEmitted($event)\"></ccd-manage-case-flags>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"caseFlagFieldState.FLAG_UPDATE\">\n      <ccd-update-flag [formGroup]=\"caseFlagParentFormGroup\" [selectedFlag]=\"selectedFlag\"\n        (caseFlagStateEmitter)=\"onCaseFlagStateEmitted($event)\"></ccd-update-flag>\n    </ng-container>\n  </div>\n</div>\n", styles: [".validation-error{cursor:pointer;text-decoration:underline;color:#d4351c}\n"] }]
    }], function () { return [{ type: i1.ActivatedRoute }, { type: i2.CaseEditDataService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtY2FzZS1mbGFnLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2Nhc2UtZmxhZy93cml0ZS1jYXNlLWZsYWctZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL3dyaXRlLWNhc2UtZmxhZy1maWVsZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQW1CLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBRTdGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUUzRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7O0lDSHpFLDhCQUFrRixZQUFBLFNBQUEsV0FBQTtJQUd6RSw2T0FBUyxlQUFBLHNEQUE0QyxDQUFBLElBQUM7SUFBMEIsWUFBMkM7O0lBQUEsaUJBQUksRUFBQSxFQUFBLEVBQUE7OztJQUEvQyxlQUEyQztJQUEzQyx1RUFBMkM7OztJQVB0SSw4QkFBcUssWUFBQTtJQUVqSyxZQUNGOztJQUFBLGlCQUFLO0lBQ0wsa0ZBTU07SUFDUixpQkFB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QUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7c0dBOVVVLDJCQUEyQjs4RUFBM0IsMkJBQTJCO1FDZHhDLDRFQVdNO1FBQ04sNkVBd0JNO1FBQ04sNEVBV007O1FBaERBLG1EQUE4QjtRQVk5QixlQUFzQztRQUF0QywyREFBc0M7UUF5QnRDLGVBQXFDO1FBQXJDLDBEQUFxQzs7dUZEdkI5QiwyQkFBMkI7Y0FMdkMsU0FBUzsyQkFDRSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENhc2VFZGl0RGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb21tb25zL2Nhc2UtZWRpdC1kYXRhL2Nhc2UtZWRpdC1kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkLCBFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi8uLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgRmllbGRzVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9maWVsZHMnO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC13cml0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FzZUZsYWdTdGF0ZSwgRmxhZ0RldGFpbCwgRmxhZ0RldGFpbERpc3BsYXlXaXRoRm9ybUdyb3VwUGF0aCwgRmxhZ1BhdGgsIEZsYWdzV2l0aEZvcm1Hcm91cFBhdGggfSBmcm9tICcuL2RvbWFpbic7XG5pbXBvcnQgeyBDYXNlRmxhZ0ZpZWxkU3RhdGUsIENhc2VGbGFnU3RhdHVzLCBDYXNlRmxhZ1RleHQgfSBmcm9tICcuL2VudW1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXdyaXRlLWNhc2UtZmxhZy1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93cml0ZS1jYXNlLWZsYWctZmllbGQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93cml0ZS1jYXNlLWZsYWctZmllbGQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBXcml0ZUNhc2VGbGFnRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXA7XG4gIHB1YmxpYyBmaWVsZFN0YXRlOiBudW1iZXI7XG4gIHB1YmxpYyBjYXNlRmxhZ0ZpZWxkU3RhdGUgPSBDYXNlRmxhZ0ZpZWxkU3RhdGU7XG4gIHB1YmxpYyBlcnJvck1lc3NhZ2VzOiBFcnJvck1lc3NhZ2VbXSA9IFtdO1xuICBwdWJsaWMgY3JlYXRlRmxhZ0NhcHRpb246IENhc2VGbGFnVGV4dDtcbiAgcHVibGljIGZsYWdzRGF0YTogRmxhZ3NXaXRoRm9ybUdyb3VwUGF0aFtdO1xuICBwdWJsaWMgc2VsZWN0ZWRGbGFnOiBGbGFnRGV0YWlsRGlzcGxheVdpdGhGb3JtR3JvdXBQYXRoO1xuICBwdWJsaWMgc2VsZWN0ZWRGbGFnc0xvY2F0aW9uOiBGbGFnc1dpdGhGb3JtR3JvdXBQYXRoO1xuICBwdWJsaWMgY2FzZUZsYWdQYXJlbnRGb3JtR3JvdXAgPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSk7XG4gIHB1YmxpYyBmbGFnQ29tbWVudHNPcHRpb25hbCA9IGZhbHNlO1xuICBwdWJsaWMganVyaXNkaWN0aW9uOiBzdHJpbmc7XG4gIHB1YmxpYyBjYXNlVHlwZUlkOiBzdHJpbmc7XG4gIHB1YmxpYyBobWN0c1NlcnZpY2VJZDogc3RyaW5nO1xuICBwdWJsaWMgZmxhZ05hbWU6IHN0cmluZztcbiAgcHVibGljIGZsYWdQYXRoOiBGbGFnUGF0aFtdO1xuICBwdWJsaWMgaGVhcmluZ1JlbGV2YW50RmxhZzogYm9vbGVhbjtcbiAgcHVibGljIGZsYWdDb2RlOiBzdHJpbmc7XG4gIHB1YmxpYyBsaXN0T2ZWYWx1ZXM6IHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfVtdID0gbnVsbDtcbiAgcHVibGljIGlzRGlzcGxheUNvbnRleHRQYXJhbWV0ZXJVcGRhdGU6IGJvb2xlYW47XG4gIHB1YmxpYyBjYXNlVGl0bGU6IHN0cmluZztcbiAgcHJpdmF0ZSBhbGxDYXNlRmxhZ1N0YWdlc0NvbXBsZXRlZCA9IGZhbHNlO1xuICBwcml2YXRlIHJlYWRvbmx5IHVwZGF0ZU1vZGUgPSAnI0FSR1VNRU5UKFVQREFURSknO1xuICAvLyBDb2RlIGZvciBcIk90aGVyXCIgZmxhZyB0eXBlIGFzIGRlZmluZWQgaW4gUmVmZXJlbmNlIERhdGFcbiAgcHJpdmF0ZSByZWFkb25seSBvdGhlckZsYWdUeXBlQ29kZSA9ICdPVDAwMDEnO1xuICBwdWJsaWMgcmVhZG9ubHkgY2FzZU5hbWVNaXNzaW5nID0gJ0Nhc2UgbmFtZSBtaXNzaW5nJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VFZGl0RGF0YVNlcnZpY2U6IENhc2VFZGl0RGF0YVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNhc2VFZGl0RGF0YVNlcnZpY2UuY2xlYXJGb3JtVmFsaWRhdGlvbkVycm9ycygpO1xuICAgIC8vIENoZWNrIGZvciBleGlzdGluZyBGbGFnTGF1bmNoZXIgY29udHJvbCBpbiBwYXJlbnQgYW5kIHJlbW92ZSBpdCAtIHRoaXMgaXMgdGhlIG9ubHkgd2F5IHRvIGVuc3VyZSBpdHMgaW52YWxpZGl0eVxuICAgIC8vIGlzIHNldCBjb3JyZWN0bHkgYXQgdGhlIHN0YXJ0LCB3aGVuIHRoZSBjb21wb25lbnQgaXMgcmVsb2FkZWQgYW5kIHRoZSBjb250cm9sIGlzIHJlLXJlZ2lzdGVyZWQuIE90aGVyd2lzZSwgdGhlXG4gICAgLy8gdmFsaWRhdG9yIHN0YXRlIGdldHMgY2FycmllZCBvdmVyXG4gICAgaWYgKHRoaXMuZm9ybUdyb3VwICYmIHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLmNhc2VGaWVsZC5pZCkpIHtcbiAgICAgIHRoaXMuZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2wodGhpcy5jYXNlRmllbGQuaWQpO1xuICAgIH1cbiAgICAvLyBGcm9tIHRoaXMgcG9pbnQsIHRoaXMuZm9ybUdyb3VwIHJlZmVycyB0byB0aGUgVW50eXBlZEZvcm1Hcm91cCBmb3IgdGhlIEZsYWdMYXVuY2hlciBmaWVsZCwgbm90IHRoZSBwYXJlbnQgVW50eXBlZEZvcm1Hcm91cFxuICAgIHRoaXMuZm9ybUdyb3VwID0gdGhpcy5yZWdpc3RlckNvbnRyb2wobmV3IFVudHlwZWRGb3JtR3JvdXAoe30sIHtcbiAgICAgIHZhbGlkYXRvcnM6IChfOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSB8IG51bGwgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuYWxsQ2FzZUZsYWdTdGFnZXNDb21wbGV0ZWQpIHtcbiAgICAgICAgICAvLyBSZXR1cm4gYW4gZXJyb3IgdG8gbWFyayB0aGUgVW50eXBlZEZvcm1Hcm91cCBhcyBpbnZhbGlkIGlmIG5vdCBhbGwgQ2FzZSBGbGFnIHN0YWdlcyBoYXZlIGJlZW4gY29tcGxldGVkXG4gICAgICAgICAgcmV0dXJuIHsgbm90QWxsQ2FzZUZsYWdTdGFnZXNDb21wbGV0ZWQ6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KSwgdHJ1ZSkgYXMgVW50eXBlZEZvcm1Hcm91cDtcblxuICAgIHRoaXMuY3JlYXRlRmxhZ0NhcHRpb24gPSBDYXNlRmxhZ1RleHQuQ0FQVElPTjtcbiAgICAvLyBHZXQgdGhlIGNhc2UgdHlwZSBJRCBmcm9tIHRoZSBDYXNlVmlldyBvYmplY3QgaW4gdGhlIHNuYXBzaG90IGRhdGEgKHJlcXVpcmVkIGZvciByZXRyaWV2aW5nIHRoZSBhdmFpbGFibGUgZmxhZ1xuICAgIC8vIHR5cGVzIGZvciBhIGNhc2UpXG4gICAgaWYgKHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlICYmIHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlLmNhc2VfdHlwZSkge1xuICAgICAgdGhpcy5jYXNlVHlwZUlkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5kYXRhLmNhc2UuY2FzZV90eXBlLmlkO1xuICAgICAgLy8gR2V0IHRoZSBqdXJpc2RpY3Rpb24gKHJlcXVpcmVkIGZvciByZXRyaWV2aW5nIHRoZSBhdmFpbGFibGUgZmxhZyB0eXBlcyBpZiB1bmFibGUgdG8gZGV0ZXJtaW5lIHVzaW5nIGNhc2UgdHlwZSBJRClcbiAgICAgIGlmICh0aGlzLnJvdXRlLnNuYXBzaG90LmRhdGEuY2FzZS5jYXNlX3R5cGUuanVyaXNkaWN0aW9uKSB7XG4gICAgICAgIHRoaXMuanVyaXNkaWN0aW9uID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5kYXRhLmNhc2UuY2FzZV90eXBlLmp1cmlzZGljdGlvbi5pZDtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gRXh0cmFjdCBhbGwgZmxhZ3MtcmVsYXRlZCBkYXRhIGZyb20gdGhlIENhc2VFdmVudFRyaWdnZXIgb2JqZWN0IGluIHRoZSBzbmFwc2hvdCBkYXRhXG4gICAgaWYgKHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5ldmVudFRyaWdnZXIpIHtcbiAgICAgIC8vIEdldCB0aGUgSE1DVFNTZXJ2aWNlSWQgZnJvbSBzdXBwbGVtZW50YXJ5IGRhdGEsIGlmIGl0IGV4aXN0cyAocmVxdWlyZWQgZm9yIHJldHJpZXZpbmcgdGhlIGF2YWlsYWJsZSBmbGFnIHR5cGVzIGluXG4gICAgICAvLyB0aGUgZmlyc3QgaW5zdGFuY2UsIG9ubHkgZmFsbGluZyBiYWNrIG9uIGNhc2UgdHlwZSBJRCBvciBqdXJpc2lkaWN0aW9uIGlmIGl0J3Mgbm90IHByZXNlbnQpXG4gICAgICBpZiAodGhpcy5yb3V0ZS5zbmFwc2hvdC5kYXRhLmV2ZW50VHJpZ2dlci5zdXBwbGVtZW50YXJ5X2RhdGFcbiAgICAgICAgJiYgdGhpcy5yb3V0ZS5zbmFwc2hvdC5kYXRhLmV2ZW50VHJpZ2dlci5zdXBwbGVtZW50YXJ5X2RhdGEuSE1DVFNTZXJ2aWNlSWQpIHtcbiAgICAgICAgdGhpcy5obWN0c1NlcnZpY2VJZCA9IHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5ldmVudFRyaWdnZXIuc3VwcGxlbWVudGFyeV9kYXRhLkhNQ1RTU2VydmljZUlkO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5yb3V0ZS5zbmFwc2hvdC5kYXRhLmV2ZW50VHJpZ2dlci5jYXNlX2ZpZWxkcykge1xuICAgICAgICB0aGlzLmZsYWdzRGF0YSA9ICgodGhpcy5yb3V0ZS5zbmFwc2hvdC5kYXRhLmV2ZW50VHJpZ2dlci5jYXNlX2ZpZWxkcykgYXMgQ2FzZUZpZWxkW10pXG4gICAgICAgICAgLnJlZHVjZSgoZmxhZ3MsIGNhc2VGaWVsZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEZpZWxkc1V0aWxzLmV4dHJhY3RGbGFnc0RhdGFGcm9tQ2FzZUZpZWxkKGZsYWdzLCBjYXNlRmllbGQsIGNhc2VGaWVsZC5pZCwgY2FzZUZpZWxkKTtcbiAgICAgICAgICB9LCBbXSk7XG5cbiAgICAgICAgLy8gU2V0IGJvb2xlYW4gaW5kaWNhdGluZyB0aGUgZGlzcGxheV9jb250ZXh0X3BhcmFtZXRlciBpcyBcInVwZGF0ZVwiXG4gICAgICAgIHRoaXMuaXNEaXNwbGF5Q29udGV4dFBhcmFtZXRlclVwZGF0ZSA9XG4gICAgICAgICAgdGhpcy5zZXREaXNwbGF5Q29udGV4dFBhcmFtZXRlclVwZGF0ZSgodGhpcy5yb3V0ZS5zbmFwc2hvdC5kYXRhLmV2ZW50VHJpZ2dlci5jYXNlX2ZpZWxkcykgYXMgQ2FzZUZpZWxkW10pO1xuXG4gICAgICAgIC8vIFNldCBzdGFydGluZyBmaWVsZCBzdGF0ZVxuICAgICAgICB0aGlzLmZpZWxkU3RhdGUgPSB0aGlzLmlzRGlzcGxheUNvbnRleHRQYXJhbWV0ZXJVcGRhdGUgPyBDYXNlRmxhZ0ZpZWxkU3RhdGUuRkxBR19NQU5BR0VfQ0FTRV9GTEFHUyA6IENhc2VGbGFnRmllbGRTdGF0ZS5GTEFHX0xPQ0FUSU9OO1xuICAgICAgICAvLyBHZXQgY2FzZSB0aXRsZSwgdG8gYmUgdXNlZCBieSBjaGlsZCBjb21wb25lbnRzXG4gICAgICAgIHRoaXMuY2FzZUVkaXREYXRhU2VydmljZS5jYXNlVGl0bGUkLnN1YnNjcmliZSh7XG4gICAgICAgICAgbmV4dDogdGl0bGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYXNlVGl0bGUgPSB0aXRsZS5sZW5ndGggPiAwID8gdGl0bGUgOiB0aGlzLmNhc2VOYW1lTWlzc2luZztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXREaXNwbGF5Q29udGV4dFBhcmFtZXRlclVwZGF0ZShjYXNlRmllbGRzOiBDYXNlRmllbGRbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjYXNlRmllbGRzLnNvbWUoXG4gICAgICBjYXNlRmllbGQgPT4gRmllbGRzVXRpbHMuaXNGbGFnTGF1bmNoZXJDYXNlRmllbGQoY2FzZUZpZWxkKSAmJiBjYXNlRmllbGQuZGlzcGxheV9jb250ZXh0X3BhcmFtZXRlciA9PT0gdGhpcy51cGRhdGVNb2RlKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNhc2VGbGFnU3RhdGVFbWl0dGVkKGNhc2VGbGFnU3RhdGU6IENhc2VGbGFnU3RhdGUpOiB2b2lkIHtcbiAgICB0aGlzLmNhc2VFZGl0RGF0YVNlcnZpY2UuY2xlYXJGb3JtVmFsaWRhdGlvbkVycm9ycygpO1xuICAgIC8vIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIENhc2VGbGFnRmllbGRTdGF0ZS5GTEFHX0xPQ0FUSU9OIGFuZCBhIGZsYWcgbG9jYXRpb24gKGEgRmxhZ3MgaW5zdGFuY2UpIGhhcyBiZWVuIHNlbGVjdGVkLFxuICAgIC8vIHNldCB0aGUgcGFyZW50IENhc2UgRmxhZyBVbnR5cGVkRm9ybUdyb3VwIGZvciB0aGlzIGNvbXBvbmVudCdzIGNoaWxkcmVuIGJ5IHVzaW5nIHRoZSBwcm92aWRlZCBwYXRoVG9GbGFnc0Zvcm1Hcm91cCwgYW5kXG4gICAgLy8gc2V0IHRoZSBzZWxlY3RlZCBmbGFnIGxvY2F0aW9uIG9uIHRoaXMgY29tcG9uZW50XG4gICAgaWYgKGNhc2VGbGFnU3RhdGUuY3VycmVudENhc2VGbGFnRmllbGRTdGF0ZSA9PT0gQ2FzZUZsYWdGaWVsZFN0YXRlLkZMQUdfTE9DQVRJT05cbiAgICAgICYmIGNhc2VGbGFnU3RhdGUuc2VsZWN0ZWRGbGFnc0xvY2F0aW9uXG4gICAgICAmJiBjYXNlRmxhZ1N0YXRlLnNlbGVjdGVkRmxhZ3NMb2NhdGlvbi5wYXRoVG9GbGFnc0Zvcm1Hcm91cCkge1xuICAgICAgdGhpcy5zZXRDYXNlRmxhZ1BhcmVudEZvcm1Hcm91cChjYXNlRmxhZ1N0YXRlLnNlbGVjdGVkRmxhZ3NMb2NhdGlvbi5wYXRoVG9GbGFnc0Zvcm1Hcm91cCk7XG4gICAgICB0aGlzLnNlbGVjdGVkRmxhZ3NMb2NhdGlvbiA9IGNhc2VGbGFnU3RhdGUuc2VsZWN0ZWRGbGFnc0xvY2F0aW9uO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgY3VycmVudCBzdGF0ZSBpcyBDYXNlRmxhZ0ZpZWxkU3RhdGUuRkxBR19UWVBFLCBjYWNoZSB0aGUgZmxhZyBuYW1lLCBwYXRoLCBoZWFyaW5nIHJlbGV2YW50IGluZGljYXRvciwgY29kZSxcbiAgICAvLyBhbmQgXCJsaXN0IG9mIHZhbHVlc1wiIChjdXJyZW50bHkgYXBwbGljYWJsZSB0byBsYW5ndWFnZSBmbGFnIHR5cGVzKVxuICAgIGlmIChjYXNlRmxhZ1N0YXRlLmN1cnJlbnRDYXNlRmxhZ0ZpZWxkU3RhdGUgPT09IENhc2VGbGFnRmllbGRTdGF0ZS5GTEFHX1RZUEUpIHtcbiAgICAgIHRoaXMuZmxhZ05hbWUgPSBjYXNlRmxhZ1N0YXRlLmZsYWdOYW1lO1xuICAgICAgdGhpcy5mbGFnUGF0aCA9IGNhc2VGbGFnU3RhdGUuZmxhZ1BhdGg7XG4gICAgICB0aGlzLmhlYXJpbmdSZWxldmFudEZsYWcgPSBjYXNlRmxhZ1N0YXRlLmhlYXJpbmdSZWxldmFudEZsYWc7XG4gICAgICB0aGlzLmZsYWdDb2RlID0gY2FzZUZsYWdTdGF0ZS5mbGFnQ29kZTtcbiAgICAgIHRoaXMubGlzdE9mVmFsdWVzID0gY2FzZUZsYWdTdGF0ZS5saXN0T2ZWYWx1ZXM7XG4gICAgfVxuICAgIC8vIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIENhc2VGbGFnRmllbGRTdGF0ZS5GTEFHX01BTkFHRV9DQVNFX0ZMQUdTIGFuZCBhIGZsYWcgaGFzIGJlZW4gc2VsZWN0ZWQsIHNldCB0aGUgcGFyZW50XG4gICAgLy8gQ2FzZSBGbGFnIFVudHlwZWRGb3JtR3JvdXAgZm9yIHRoaXMgY29tcG9uZW50J3MgY2hpbGRyZW4gYnkgdXNpbmcgdGhlIHByb3ZpZGVkIHBhdGhUb0ZsYWdzRm9ybUdyb3VwXG4gICAgaWYgKGNhc2VGbGFnU3RhdGUuY3VycmVudENhc2VGbGFnRmllbGRTdGF0ZSA9PT0gQ2FzZUZsYWdGaWVsZFN0YXRlLkZMQUdfTUFOQUdFX0NBU0VfRkxBR1NcbiAgICAgICYmIGNhc2VGbGFnU3RhdGUuc2VsZWN0ZWRGbGFnXG4gICAgICAmJiBjYXNlRmxhZ1N0YXRlLnNlbGVjdGVkRmxhZy5wYXRoVG9GbGFnc0Zvcm1Hcm91cCkge1xuICAgICAgdGhpcy5zZXRDYXNlRmxhZ1BhcmVudEZvcm1Hcm91cChjYXNlRmxhZ1N0YXRlLnNlbGVjdGVkRmxhZy5wYXRoVG9GbGFnc0Zvcm1Hcm91cCk7XG4gICAgfVxuXG4gICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gY2FzZUZsYWdTdGF0ZS5lcnJvck1lc3NhZ2VzO1xuICAgIHRoaXMuc2VsZWN0ZWRGbGFnID0gY2FzZUZsYWdTdGF0ZS5zZWxlY3RlZEZsYWc7XG4gICAgLy8gVmFsaWRhdGlvbiBzdWNjZWVkZWQ7IHByb2NlZWQgdG8gbmV4dCBzdGF0ZSBvciBmaW5hbCByZXZpZXcgc3RhZ2UgKFwiQ2hlY2sgeW91ciBhbnN3ZXJzXCIpXG4gICAgaWYgKHRoaXMuZXJyb3JNZXNzYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIENhc2VGbGFnRmllbGRTdGF0ZS5GTEFHX0NPTU1FTlRTIG9yIENhc2VGbGFnRmllbGRTdGF0ZS5GTEFHX1VQREFURSwgbW92ZSB0byBmaW5hbFxuICAgICAgLy8gcmV2aWV3IHN0YWdlXG4gICAgICBpZiAoY2FzZUZsYWdTdGF0ZS5jdXJyZW50Q2FzZUZsYWdGaWVsZFN0YXRlID09PSBDYXNlRmxhZ0ZpZWxkU3RhdGUuRkxBR19DT01NRU5UUyB8fFxuICAgICAgICBjYXNlRmxhZ1N0YXRlLmN1cnJlbnRDYXNlRmxhZ0ZpZWxkU3RhdGUgPT09IENhc2VGbGFnRmllbGRTdGF0ZS5GTEFHX1VQREFURSkge1xuICAgICAgICB0aGlzLm1vdmVUb0ZpbmFsUmV2aWV3U3RhZ2UoKTtcbiAgICAgICAgLy8gRG9uJ3QgbW92ZSB0byBuZXh0IHN0YXRlIGlmIGN1cnJlbnQgc3RhdGUgaXMgQ2FzZUZsYWdGaWVsZFN0YXRlLkZMQUdfVFlQRSBhbmQgdGhlIGZsYWcgdHlwZSBpcyBhIHBhcmVudCAtIHRoaXNcbiAgICAgICAgLy8gbWVhbnMgdGhlIHVzZXIgbmVlZHMgdG8gc2VsZWN0IGZyb20gdGhlIG5leHQgc2V0IG9mIGZsYWcgdHlwZXMgYmVmb3JlIHRoZXkgY2FuIG1vdmUgb25cbiAgICAgIH0gZWxzZSBpZiAoIWNhc2VGbGFnU3RhdGUuaXNQYXJlbnRGbGFnVHlwZSkge1xuICAgICAgICAvLyBQcm9jZWVkIHRvIG5leHQgc3RhdGVcbiAgICAgICAgdGhpcy5wcm9jZWVkVG9OZXh0U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcHJvY2VlZFRvTmV4dFN0YXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0F0RmluYWxTdGF0ZSgpKSB7XG4gICAgICAvLyBTa2lwIHRoZSBcImxhbmd1YWdlIGludGVycHJldGVyXCIgc3RhdGUgaWYgY3VycmVudCBzdGF0ZSBpcyBDYXNlRmxhZ0ZpZWxkU3RhdGUuRkxBR19UWVBFIGFuZCB0aGUgZmxhZyB0eXBlIGRvZXNuJ3RcbiAgICAgIC8vIGhhdmUgYSBcImxpc3Qgb2YgdmFsdWVzXCIgLSBjdXJyZW50bHksIHRoaXMgaXMgcHJlc2VudCBvbmx5IGZvciB0aG9zZSBmbGFnIHR5cGVzIHRoYXQgcmVxdWlyZSBsYW5ndWFnZSBpbnRlcnByZXRlclxuICAgICAgLy8gc2VsZWN0aW9uXG4gICAgICBpZiAodGhpcy5maWVsZFN0YXRlID09PSBDYXNlRmxhZ0ZpZWxkU3RhdGUuRkxBR19UWVBFICYmICF0aGlzLmxpc3RPZlZhbHVlcykge1xuICAgICAgICB0aGlzLmZpZWxkU3RhdGUgPSBDYXNlRmxhZ0ZpZWxkU3RhdGUuRkxBR19DT01NRU5UUztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmllbGRTdGF0ZSsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRGbGFnc0Nhc2VGaWVsZFZhbHVlKCk6IHZvaWQge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogc3dpdGNoLWRlZmF1bHRcbiAgICBzd2l0Y2ggKHRoaXMuZmllbGRTdGF0ZSkge1xuICAgICAgY2FzZSBDYXNlRmxhZ0ZpZWxkU3RhdGUuRkxBR19DT01NRU5UUzpcbiAgICAgICAgdGhpcy5hZGRGbGFnVG9Db2xsZWN0aW9uKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDYXNlRmxhZ0ZpZWxkU3RhdGUuRkxBR19VUERBVEU6XG4gICAgICAgIHRoaXMudXBkYXRlRmxhZ0luQ29sbGVjdGlvbigpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkRmxhZ1RvQ29sbGVjdGlvbigpOiB2b2lkIHtcbiAgICAvLyBFbnN1cmUgbm8gbW9yZSB0aGFuIG9uZSBuZXcgZmxhZyBpcyBiZWluZyBhZGRlZCBhdCBhIHRpbWUsIGJ5IGl0ZXJhdGluZyB0aHJvdWdoIGVhY2ggRmxhZ3MgY2FzZSBmaWVsZCBhbmQgcmVtb3ZpbmdcbiAgICAvLyBhbnkgcHJldmlvdXMgZW50cnkgZnJvbSB0aGUgZGV0YWlscyBhcnJheSB3aGVyZSB0aGF0IGVudHJ5IGhhcyBubyBpZCAoaGVuY2UgaXQgaXMgbmV3IC0gYW5kIHRoZXJlIHNob3VsZCBiZSBvbmx5XG4gICAgLy8gb25lIHN1Y2ggZW50cnkpLiAoVGhpcyBzY2VuYXJpbyBvY2N1cnMgaWYgdGhlIHVzZXIgcmVwZWF0cyB0aGUgQ2FzZSBGbGFnIGNyZWF0aW9uIGpvdXJuZXkgYnkgdXNpbmcgdGhlIFwiQ2hhbmdlXCJcbiAgICAvLyBsaW5rIGFuZCBzZWxlY3RzIGVpdGhlciB0aGUgc2FtZSBmbGFnIGxvY2F0aW9uIGFzIGJlZm9yZSBvciBhIGRpZmZlcmVudCBvbmUuKVxuICAgIHRoaXMuZmxhZ3NEYXRhLmZvckVhY2goaW5zdGFuY2UgPT4ge1xuICAgICAgLy8gVXNlIHRoZSBwYXRoVG9GbGFnc0Zvcm1Hcm91cCBwcm9wZXJ0eSBmb3IgZWFjaCBGbGFncyBjYXNlIGZpZWxkIHRvIGRyaWxsIGRvd24gdG8gdGhlIGNvcnJlY3QgcGFydCBvZiB0aGVcbiAgICAgIC8vIENhc2VGaWVsZCB2YWx1ZSB0byByZW1vdmUgdGhlIG5ldyB2YWx1ZSBmcm9tXG4gICAgICBsZXQgdmFsdWUgPSBpbnN0YW5jZS5jYXNlRmllbGQudmFsdWU7XG4gICAgICBjb25zdCBwYXRoVG9WYWx1ZSA9IGluc3RhbmNlLnBhdGhUb0ZsYWdzRm9ybUdyb3VwO1xuICAgICAgLy8gUm9vdC1sZXZlbCBGbGFncyBDYXNlRmllbGRzIGRvbid0IGhhdmUgYSBkb3QtZGVsaW1pdGVkIHBhdGggLSBqdXN0IHRoZSBDYXNlRmllbGQgSUQgaXRzZWxmIC0gc28gZG9uJ3QgZHJpbGwgZG93blxuICAgICAgaWYgKHBhdGhUb1ZhbHVlLmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHBhdGhUb1ZhbHVlLnNsaWNlKHBhdGhUb1ZhbHVlLmluZGV4T2YoJy4nKSArIDEpLnNwbGl0KCcuJykuZm9yRWFjaChwYXJ0ID0+IHZhbHVlID0gdmFsdWVbcGFydF0pO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmRldGFpbHMgJiYgdmFsdWUuZGV0YWlscy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGluZGV4T2ZOZXdGbGFnRGV0YWlsID0gdmFsdWUuZGV0YWlscy5maW5kSW5kZXgoZWxlbWVudCA9PiAhZWxlbWVudC5oYXNPd25Qcm9wZXJ0eSgnaWQnKSk7XG4gICAgICAgIGlmIChpbmRleE9mTmV3RmxhZ0RldGFpbCA+IC0xKSB7XG4gICAgICAgICAgdmFsdWUuZGV0YWlscy5zcGxpY2UoaW5kZXhPZk5ld0ZsYWdEZXRhaWwsIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGV0IGZsYWdzQ2FzZUZpZWxkVmFsdWUgPSB0aGlzLnNlbGVjdGVkRmxhZ3NMb2NhdGlvbi5jYXNlRmllbGQudmFsdWU7XG4gICAgLy8gVXNlIHRoZSBwYXRoVG9GbGFnc0Zvcm1Hcm91cCBwcm9wZXJ0eSBmcm9tIHRoZSBzZWxlY3RlZCBmbGFnIGxvY2F0aW9uIHRvIGRyaWxsIGRvd24gdG8gdGhlIGNvcnJlY3QgcGFydCBvZiB0aGVcbiAgICAvLyBDYXNlRmllbGQgdmFsdWUgdG8gYXBwbHkgY2hhbmdlcyB0b1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLnNlbGVjdGVkRmxhZ3NMb2NhdGlvbi5wYXRoVG9GbGFnc0Zvcm1Hcm91cDtcbiAgICAvLyBSb290LWxldmVsIEZsYWdzIENhc2VGaWVsZHMgZG9uJ3QgaGF2ZSBhIGRvdC1kZWxpbWl0ZWQgcGF0aCAtIGp1c3QgdGhlIENhc2VGaWVsZCBJRCBpdHNlbGYgLSBzbyBkb24ndCBkcmlsbCBkb3duXG4gICAgaWYgKHBhdGguaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgIHBhdGguc2xpY2UocGF0aC5pbmRleE9mKCcuJykgKyAxKS5zcGxpdCgnLicpLmZvckVhY2gocGFydCA9PiBmbGFnc0Nhc2VGaWVsZFZhbHVlID0gZmxhZ3NDYXNlRmllbGRWYWx1ZVtwYXJ0XSk7XG4gICAgfVxuICAgIC8vIElmIHRoZSBDYXNlRmllbGQgZm9yIHRoZSBzZWxlY3RlZCBmbGFncyBsb2NhdGlvbiBoYXMgbm8gdmFsdWUsIHNldCBpdCB0byBhbiBlbXB0eSBvYmplY3Qgc28gaXQgY2FuIGJlIHBvcHVsYXRlZFxuICAgIC8vIHdpdGggZmxhZyBkZXRhaWxzXG4gICAgaWYgKCFmbGFnc0Nhc2VGaWVsZFZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmxhZ3NMb2NhdGlvbi5jYXNlRmllbGQudmFsdWUgPSB7fTtcbiAgICAgIGZsYWdzQ2FzZUZpZWxkVmFsdWUgPSB0aGlzLnNlbGVjdGVkRmxhZ3NMb2NhdGlvbi5jYXNlRmllbGQudmFsdWU7XG4gICAgfVxuICAgIC8vIENyZWF0ZSBhIGRldGFpbHMgYXJyYXkgaWYgb25lIGRvZXMgbm90IGV4aXN0XG4gICAgaWYgKCFmbGFnc0Nhc2VGaWVsZFZhbHVlLmhhc093blByb3BlcnR5KCdkZXRhaWxzJykpIHtcbiAgICAgIGZsYWdzQ2FzZUZpZWxkVmFsdWUuZGV0YWlscyA9IFtdO1xuICAgIH1cbiAgICAvLyBQb3B1bGF0ZSBuZXcgRmxhZ0RldGFpbCBpbnN0YW5jZSBhbmQgYWRkIHRvIHRoZSBGbGFncyBkYXRhIHdpdGhpbiB0aGUgQ2FzZUZpZWxkIGluc3RhbmNlIG9mIHRoZSBzZWxlY3RlZCBmbGFnXG4gICAgLy8gbG9jYXRpb25cbiAgICBmbGFnc0Nhc2VGaWVsZFZhbHVlLmRldGFpbHMucHVzaCh7IHZhbHVlOiB0aGlzLnBvcHVsYXRlTmV3RmxhZ0RldGFpbEluc3RhbmNlKCkgfSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlRmxhZ0luQ29sbGVjdGlvbigpOiB2b2lkIHtcbiAgICAvLyBFbnN1cmUgbm8gbW9yZSB0aGFuIG9uZSBmbGFnIGlzIGJlaW5nIHVwZGF0ZWQgYXQgYSB0aW1lLCBieSBpdGVyYXRpbmcgdGhyb3VnaCBlYWNoIEZsYWdzIGNhc2UgZmllbGQgYW5kIHJlc2V0dGluZ1xuICAgIC8vIHRoZSBjb21tZW50cywgc3RhdHVzLCBhbmQgZGF0ZS90aW1lIG1vZGlmaWVkIChpZiBwcmVzZW50KSBmb3IgZWFjaCBlbnRyeSBpbiB0aGUgZGV0YWlscyBhcnJheSwgd2l0aCBvcmlnaW5hbCB2YWx1ZXNcbiAgICAvLyBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIGZvcm1hdHRlZF92YWx1ZSBwcm9wZXJ0eS4gKFRoaXMgc2NlbmFyaW8gb2NjdXJzIGlmIHRoZSB1c2VyIHJlcGVhdHMgdGhlIE1hbmFnZSBDYXNlIEZsYWdcbiAgICAvLyBqb3VybmV5IGJ5IHVzaW5nIHRoZSBcIkNoYW5nZVwiIGxpbmsgYW5kIHNlbGVjdHMgYSBkaWZmZXJlbnQgZmxhZyB0byB1cGRhdGUuKVxuICAgIHRoaXMuZmxhZ3NEYXRhLmZvckVhY2goaW5zdGFuY2UgPT4ge1xuICAgICAgLy8gVXNlIHRoZSBwYXRoVG9GbGFnc0Zvcm1Hcm91cCBwcm9wZXJ0eSBmb3IgZWFjaCBGbGFncyBjYXNlIGZpZWxkIHRvIGRyaWxsIGRvd24gdG8gdGhlIGNvcnJlY3QgcGFydCBvZiB0aGVcbiAgICAgIC8vIENhc2VGaWVsZCB2YWx1ZSBmb3Igd2hpY2ggdG8gcmVzdG9yZSB0aGUgb3JpZ2luYWwgdmFsdWVzXG4gICAgICBsZXQgdmFsdWUgPSBpbnN0YW5jZS5jYXNlRmllbGQudmFsdWU7XG4gICAgICBsZXQgZm9ybWF0dGVkVmFsdWUgPSBpbnN0YW5jZS5jYXNlRmllbGQuZm9ybWF0dGVkX3ZhbHVlO1xuICAgICAgY29uc3QgcGF0aFRvVmFsdWUgPSBpbnN0YW5jZS5wYXRoVG9GbGFnc0Zvcm1Hcm91cDtcbiAgICAgIC8vIFJvb3QtbGV2ZWwgRmxhZ3MgQ2FzZUZpZWxkcyBkb24ndCBoYXZlIGEgZG90LWRlbGltaXRlZCBwYXRoIC0ganVzdCB0aGUgQ2FzZUZpZWxkIElEIGl0c2VsZiAtIHNvIGRvbid0IGRyaWxsIGRvd25cbiAgICAgIGlmIChwYXRoVG9WYWx1ZS5pbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgICBwYXRoVG9WYWx1ZS5zbGljZShwYXRoVG9WYWx1ZS5pbmRleE9mKCcuJykgKyAxKS5zcGxpdCgnLicpLmZvckVhY2gocGFydCA9PiB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZVtwYXJ0XTtcbiAgICAgICAgICBpZiAoZm9ybWF0dGVkVmFsdWUgJiYgRmllbGRzVXRpbHMuaXNOb25FbXB0eU9iamVjdChmb3JtYXR0ZWRWYWx1ZSkpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0dGVkVmFsdWVbcGFydF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5kZXRhaWxzICYmIHZhbHVlLmRldGFpbHMubGVuZ3RoID4gMCAmJiBmb3JtYXR0ZWRWYWx1ZSAmJiBGaWVsZHNVdGlscy5pc05vbkVtcHR5T2JqZWN0KGZvcm1hdHRlZFZhbHVlKSkge1xuICAgICAgICB2YWx1ZS5kZXRhaWxzLmZvckVhY2goZmxhZ0RldGFpbCA9PiB7XG4gICAgICAgICAgY29uc3Qgb3JpZ2luYWxGbGFnRGV0YWlsID0gZm9ybWF0dGVkVmFsdWUuZGV0YWlscy5maW5kKGRldGFpbCA9PiBkZXRhaWwuaWQgPT09IGZsYWdEZXRhaWwuaWQpO1xuICAgICAgICAgIGlmIChvcmlnaW5hbEZsYWdEZXRhaWwpIHtcbiAgICAgICAgICAgIGZsYWdEZXRhaWwudmFsdWUuZmxhZ0NvbW1lbnQgPSBvcmlnaW5hbEZsYWdEZXRhaWwudmFsdWUuZmxhZ0NvbW1lbnRcbiAgICAgICAgICAgICAgPyBvcmlnaW5hbEZsYWdEZXRhaWwudmFsdWUuZmxhZ0NvbW1lbnRcbiAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgICAgZmxhZ0RldGFpbC52YWx1ZS5zdGF0dXMgPSBvcmlnaW5hbEZsYWdEZXRhaWwudmFsdWUuc3RhdHVzO1xuICAgICAgICAgICAgZmxhZ0RldGFpbC52YWx1ZS5kYXRlVGltZU1vZGlmaWVkID0gb3JpZ2luYWxGbGFnRGV0YWlsLnZhbHVlLmRhdGVUaW1lTW9kaWZpZWRcbiAgICAgICAgICAgICAgPyBvcmlnaW5hbEZsYWdEZXRhaWwudmFsdWUuZGF0ZVRpbWVNb2RpZmllZFxuICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsZXQgZmxhZ3NDYXNlRmllbGRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRGbGFnLmNhc2VGaWVsZC52YWx1ZTtcbiAgICAvLyBVc2UgdGhlIHBhdGhUb0ZsYWdzRm9ybUdyb3VwIHByb3BlcnR5IGZyb20gdGhlIHNlbGVjdGVkIGZsYWcgbG9jYXRpb24gdG8gZHJpbGwgZG93biB0byB0aGUgY29ycmVjdCBwYXJ0IG9mIHRoZVxuICAgIC8vIENhc2VGaWVsZCB2YWx1ZSB0byBhcHBseSBjaGFuZ2VzIHRvXG4gICAgY29uc3QgcGF0aCA9IHRoaXMuc2VsZWN0ZWRGbGFnLnBhdGhUb0ZsYWdzRm9ybUdyb3VwO1xuICAgIC8vIFJvb3QtbGV2ZWwgRmxhZ3MgQ2FzZUZpZWxkcyBkb24ndCBoYXZlIGEgZG90LWRlbGltaXRlZCBwYXRoIC0ganVzdCB0aGUgQ2FzZUZpZWxkIElEIGl0c2VsZiAtIHNvIGRvbid0IGRyaWxsIGRvd25cbiAgICBpZiAocGF0aC5pbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgcGF0aC5zbGljZShwYXRoLmluZGV4T2YoJy4nKSArIDEpLnNwbGl0KCcuJykuZm9yRWFjaChwYXJ0ID0+IGZsYWdzQ2FzZUZpZWxkVmFsdWUgPSBmbGFnc0Nhc2VGaWVsZFZhbHVlW3BhcnRdKTtcbiAgICB9XG4gICAgaWYgKGZsYWdzQ2FzZUZpZWxkVmFsdWUpIHtcbiAgICAgIGNvbnN0IGZsYWdEZXRhaWxUb1VwZGF0ZSA9IGZsYWdzQ2FzZUZpZWxkVmFsdWUuZGV0YWlscy5maW5kKFxuICAgICAgICBkZXRhaWwgPT4gZGV0YWlsLmlkID09PSB0aGlzLnNlbGVjdGVkRmxhZy5mbGFnRGV0YWlsRGlzcGxheS5mbGFnRGV0YWlsLmlkKTtcbiAgICAgIGlmIChmbGFnRGV0YWlsVG9VcGRhdGUpIHtcbiAgICAgICAgZmxhZ0RldGFpbFRvVXBkYXRlLnZhbHVlLmZsYWdDb21tZW50ID0gdGhpcy5jYXNlRmxhZ1BhcmVudEZvcm1Hcm91cC52YWx1ZS5mbGFnQ29tbWVudHNcbiAgICAgICAgICA/IHRoaXMuY2FzZUZsYWdQYXJlbnRGb3JtR3JvdXAudmFsdWUuZmxhZ0NvbW1lbnRzXG4gICAgICAgICAgOiBudWxsO1xuICAgICAgICBmbGFnRGV0YWlsVG9VcGRhdGUudmFsdWUuc3RhdHVzID0gdGhpcy5zZWxlY3RlZEZsYWcuZmxhZ0RldGFpbERpc3BsYXkuZmxhZ0RldGFpbC5zdGF0dXM7XG4gICAgICAgIGZsYWdEZXRhaWxUb1VwZGF0ZS52YWx1ZS5kYXRlVGltZU1vZGlmaWVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0F0RmluYWxTdGF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0Rpc3BsYXlDb250ZXh0UGFyYW1ldGVyVXBkYXRlXG4gICAgICA/IHRoaXMuZmllbGRTdGF0ZSA9PT0gQ2FzZUZsYWdGaWVsZFN0YXRlLkZMQUdfVVBEQVRFXG4gICAgICA6IHRoaXMuZmllbGRTdGF0ZSA9PT0gQ2FzZUZsYWdGaWVsZFN0YXRlLkZMQUdfQ09NTUVOVFM7XG4gIH1cblxuICBwdWJsaWMgbmF2aWdhdGVUb0Vycm9yRWxlbWVudChlbGVtZW50SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChlbGVtZW50SWQpIHtcbiAgICAgIGNvbnN0IGh0bWxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgICAgIGlmIChodG1sRWxlbWVudCkge1xuICAgICAgICBodG1sRWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInIH0pO1xuICAgICAgICBodG1sRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkZsYWdDb21tZW50c09wdGlvbmFsRW1pdHRlZChfOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmZsYWdDb21tZW50c09wdGlvbmFsID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHBhcmVudCB7QGxpbmsgVW50eXBlZEZvcm1Hcm91cH0gZm9yIHRoaXMgY29tcG9uZW50J3MgY2hpbGRyZW4sIGRlcGVuZGluZyBvbiB0aGUgYEZsYWdzYCB7QGxpbmsgQ2FzZUZpZWxkfSBpbnN0YW5jZVxuICAgKiB0byB3aGljaCBkYXRhIHNob3VsZCBiZSBhdHRhY2hlZC4gKipOb3RlOioqIFRoZSBwYXJlbnQgaXMgbm90IF90aGlzXyBjb21wb25lbnQncyBgVW50eXBlZEZvcm1Hcm91cGAgKGFzIG1pZ2h0IG90aGVyd2lzZSBiZVxuICAgKiBleHBlY3RlZCkgYmVjYXVzZSB0aGlzIGNvbXBvbmVudCBpcyBub3QgZXhwZWN0ZWQgdG8gaGF2ZSBhIHZhbHVlLCBnaXZlbiBpdCBpcyB1c2VkIGZvciB0aGUgZW1wdHkgYEZsYWdMYXVuY2hlcmAgYmFzZVxuICAgKiBmaWVsZCB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0gcGF0aFRvRmxhZ3NGb3JtR3JvdXAgVGhlIGRvdC1kZWxpbWl0ZWQgc3RyaW5nIHRoYXQgaXMgdGhlIHBhdGggdG8gdGhlIGBVbnR5cGVkRm9ybUdyb3VwYCBmb3IgYSBgRmxhZ3NgIGluc3RhbmNlXG4gICAqL1xuICBwdWJsaWMgc2V0Q2FzZUZsYWdQYXJlbnRGb3JtR3JvdXAocGF0aFRvRmxhZ3NGb3JtR3JvdXA6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY2FzZUZsYWdQYXJlbnRGb3JtR3JvdXAgPSB0aGlzLmZvcm1Hcm91cC5wYXJlbnQuZ2V0KHBhdGhUb0ZsYWdzRm9ybUdyb3VwKSBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICB9XG5cbiAgcHVibGljIHBvcHVsYXRlTmV3RmxhZ0RldGFpbEluc3RhbmNlKCk6IEZsYWdEZXRhaWwge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0aGlzLmZsYWdOYW1lLFxuICAgICAgLy8gQ3VycmVudGx5LCBzdWJUeXBlVmFsdWUgYW5kIHN1YlR5cGVLZXkgYXJlIGFwcGxpY2FibGUgb25seSB0byBsYW5ndWFnZSBmbGFnIHR5cGVzXG4gICAgICBzdWJUeXBlVmFsdWU6IHRoaXMuY2FzZUZsYWdQYXJlbnRGb3JtR3JvdXAudmFsdWUubGFuZ3VhZ2VTZWFyY2hUZXJtXG4gICAgICAgID8gdGhpcy5jYXNlRmxhZ1BhcmVudEZvcm1Hcm91cC52YWx1ZS5sYW5ndWFnZVNlYXJjaFRlcm0udmFsdWVcbiAgICAgICAgOiB0aGlzLmNhc2VGbGFnUGFyZW50Rm9ybUdyb3VwLnZhbHVlLm1hbnVhbExhbmd1YWdlRW50cnlcbiAgICAgICAgICA/IHRoaXMuY2FzZUZsYWdQYXJlbnRGb3JtR3JvdXAudmFsdWUubWFudWFsTGFuZ3VhZ2VFbnRyeVxuICAgICAgICAgIDogbnVsbCxcbiAgICAgIC8vIEZvciB1c2VyLWVudGVyZWQgKGkuZS4gbm9uLVJlZmVyZW5jZSBEYXRhKSBsYW5ndWFnZXMsIHRoZXJlIGlzIG5vIGtleVxuICAgICAgc3ViVHlwZUtleTogdGhpcy5jYXNlRmxhZ1BhcmVudEZvcm1Hcm91cC52YWx1ZS5sYW5ndWFnZVNlYXJjaFRlcm1cbiAgICAgICAgPyB0aGlzLmNhc2VGbGFnUGFyZW50Rm9ybUdyb3VwLnZhbHVlLmxhbmd1YWdlU2VhcmNoVGVybS5rZXlcbiAgICAgICAgOiBudWxsLFxuICAgICAgb3RoZXJEZXNjcmlwdGlvbjogdGhpcy5mbGFnQ29kZSA9PT0gdGhpcy5vdGhlckZsYWdUeXBlQ29kZSAmJiB0aGlzLmNhc2VGbGFnUGFyZW50Rm9ybUdyb3VwLnZhbHVlLm90aGVyRmxhZ1R5cGVEZXNjcmlwdGlvblxuICAgICAgICA/IHRoaXMuY2FzZUZsYWdQYXJlbnRGb3JtR3JvdXAudmFsdWUub3RoZXJGbGFnVHlwZURlc2NyaXB0aW9uXG4gICAgICAgIDogbnVsbCxcbiAgICAgIGZsYWdDb21tZW50OiB0aGlzLmNhc2VGbGFnUGFyZW50Rm9ybUdyb3VwLnZhbHVlLmZsYWdDb21tZW50cyA/IHRoaXMuY2FzZUZsYWdQYXJlbnRGb3JtR3JvdXAudmFsdWUuZmxhZ0NvbW1lbnRzIDogbnVsbCxcbiAgICAgIGRhdGVUaW1lQ3JlYXRlZDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgcGF0aDogdGhpcy5mbGFnUGF0aCxcbiAgICAgIGhlYXJpbmdSZWxldmFudDogdGhpcy5oZWFyaW5nUmVsZXZhbnRGbGFnID8gJ1llcycgOiAnTm8nLFxuICAgICAgZmxhZ0NvZGU6IHRoaXMuZmxhZ0NvZGUsXG4gICAgICBzdGF0dXM6IENhc2VGbGFnU3RhdHVzLkFDVElWRVxuICAgIH0gYXMgRmxhZ0RldGFpbDtcbiAgfVxuXG4gIHB1YmxpYyBtb3ZlVG9GaW5hbFJldmlld1N0YWdlKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0RmxhZ3NDYXNlRmllbGRWYWx1ZSgpO1xuICAgIC8vIENsZWFyIHRoZSBcIm5vdEFsbENhc2VGbGFnU3RhZ2VzQ29tcGxldGVkXCIgZXJyb3JcbiAgICB0aGlzLmFsbENhc2VGbGFnU3RhZ2VzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICB0aGlzLmZvcm1Hcm91cC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgdGhpcy5jYXNlRWRpdERhdGFTZXJ2aWNlLnNldFRyaWdnZXJTdWJtaXRFdmVudCh0cnVlKTtcbiAgfVxufVxuIiwiPCEtLSBFcnJvciBtZXNzYWdlIHN1bW1hcnkgLS0+XG48ZGl2ICpuZ0lmPVwiZXJyb3JNZXNzYWdlcy5sZW5ndGggPiAwXCIgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXJyb3Itc3VtbWFyeS10aXRsZVwiIHJvbGU9XCJhbGVydFwiIHRhYmluZGV4PVwiLTFcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWVycm9yLXN1bW1hcnlcIj5cbiAgPGgyIGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fdGl0bGVcIiBpZD1cImVycm9yLXN1bW1hcnktdGl0bGVcIj5cbiAgICB7eydUaGVyZSBpcyBhIHByb2JsZW0nIHwgcnB4VHJhbnNsYXRlfX1cbiAgPC9oMj5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgZXJyb3JNZXNzYWdlIG9mIGVycm9yTWVzc2FnZXNcIiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX2JvZHlcIj5cbiAgICA8dWwgY2xhc3M9XCJnb3Z1ay1saXN0IGdvdnVrLWVycm9yLXN1bW1hcnlfX2xpc3RcIj5cbiAgICAgIDxsaT5cbiAgICAgICAgPGEgKGNsaWNrKT1cIm5hdmlnYXRlVG9FcnJvckVsZW1lbnQoZXJyb3JNZXNzYWdlLmZpZWxkSWQpXCIgY2xhc3M9XCJ2YWxpZGF0aW9uLWVycm9yXCI+e3tlcnJvck1lc3NhZ2UuZGVzY3JpcHRpb24gfCBycHhUcmFuc2xhdGV9fTwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCIhaXNEaXNwbGF5Q29udGV4dFBhcmFtZXRlclVwZGF0ZVwiIGNsYXNzPVwiZm9ybS1ncm91cFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCIgW25nU3dpdGNoXT1cImZpZWxkU3RhdGVcIj5cbiAgICA8ZGl2IGlkPVwiY3JlYXRlLWZsYWctY2FwdGlvblwiIGNsYXNzPVwiZ292dWstY2FwdGlvbi1sXCIgW25nQ2xhc3NdPVwieydmb3JtLWdyb3VwLWVycm9yJzogZXJyb3JNZXNzYWdlcy5sZW5ndGggPiAwfVwiPlxuICAgICAge3tjcmVhdGVGbGFnQ2FwdGlvbiB8IHJweFRyYW5zbGF0ZX19XG4gICAgPC9kaXY+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiY2FzZUZsYWdGaWVsZFN0YXRlLkZMQUdfTE9DQVRJT05cIj5cbiAgICAgIDxjY2Qtc2VsZWN0LWZsYWctbG9jYXRpb24gW2Zvcm1Hcm91cF09XCJjYXNlRmxhZ1BhcmVudEZvcm1Hcm91cFwiIFtmbGFnc0RhdGFdPVwiZmxhZ3NEYXRhXCJcbiAgICAgICAgKGNhc2VGbGFnU3RhdGVFbWl0dGVyKT1cIm9uQ2FzZUZsYWdTdGF0ZUVtaXR0ZWQoJGV2ZW50KVwiPjwvY2NkLXNlbGVjdC1mbGFnLWxvY2F0aW9uPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImNhc2VGbGFnRmllbGRTdGF0ZS5GTEFHX1RZUEVcIj5cbiAgICAgIDxjY2Qtc2VsZWN0LWZsYWctdHlwZSBbZm9ybUdyb3VwXT1cImNhc2VGbGFnUGFyZW50Rm9ybUdyb3VwXCIgW2p1cmlzZGljdGlvbl09XCJqdXJpc2RpY3Rpb25cIiBbY2FzZVR5cGVJZF09XCJjYXNlVHlwZUlkXCJcbiAgICAgICAgW2htY3RzU2VydmljZUlkXT1cImhtY3RzU2VydmljZUlkXCJcbiAgICAgICAgKGNhc2VGbGFnU3RhdGVFbWl0dGVyKT1cIm9uQ2FzZUZsYWdTdGF0ZUVtaXR0ZWQoJGV2ZW50KVwiXG4gICAgICAgIChmbGFnQ29tbWVudHNPcHRpb25hbEVtaXR0ZXIpPVwib25GbGFnQ29tbWVudHNPcHRpb25hbEVtaXR0ZWQoJGV2ZW50KVwiPjwvY2NkLXNlbGVjdC1mbGFnLXR5cGU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiY2FzZUZsYWdGaWVsZFN0YXRlLkZMQUdfTEFOR1VBR0VfSU5URVJQUkVURVJcIj5cbiAgICAgIDxjY2Qtc2VhcmNoLWxhbmd1YWdlLWludGVycHJldGVyIFtmb3JtR3JvdXBdPVwiY2FzZUZsYWdQYXJlbnRGb3JtR3JvdXBcIiBbbGFuZ3VhZ2VzXT1cImxpc3RPZlZhbHVlc1wiIFtmbGFnQ29kZV09XCJmbGFnQ29kZVwiXG4gICAgICAgIChjYXNlRmxhZ1N0YXRlRW1pdHRlcik9XCJvbkNhc2VGbGFnU3RhdGVFbWl0dGVkKCRldmVudClcIj48L2NjZC1zZWFyY2gtbGFuZ3VhZ2UtaW50ZXJwcmV0ZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiY2FzZUZsYWdGaWVsZFN0YXRlLkZMQUdfQ09NTUVOVFNcIj5cbiAgICAgIDxjY2QtYWRkLWNvbW1lbnRzIFtmb3JtR3JvdXBdPVwiY2FzZUZsYWdQYXJlbnRGb3JtR3JvdXBcIiBbb3B0aW9uYWxdPVwiZmxhZ0NvbW1lbnRzT3B0aW9uYWxcIlxuICAgICAgICAoY2FzZUZsYWdTdGF0ZUVtaXR0ZXIpPVwib25DYXNlRmxhZ1N0YXRlRW1pdHRlZCgkZXZlbnQpXCI+PC9jY2QtYWRkLWNvbW1lbnRzPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cImlzRGlzcGxheUNvbnRleHRQYXJhbWV0ZXJVcGRhdGVcIiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiIFtuZ1N3aXRjaF09XCJmaWVsZFN0YXRlXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiY2FzZUZsYWdGaWVsZFN0YXRlLkZMQUdfTUFOQUdFX0NBU0VfRkxBR1NcIj5cbiAgICAgIDxjY2QtbWFuYWdlLWNhc2UtZmxhZ3MgW2Zvcm1Hcm91cF09XCJjYXNlRmxhZ1BhcmVudEZvcm1Hcm91cFwiIFtmbGFnc0RhdGFdPVwiZmxhZ3NEYXRhXCIgW2Nhc2VUaXRsZV09XCJjYXNlVGl0bGVcIlxuICAgICAgICAoY2FzZUZsYWdTdGF0ZUVtaXR0ZXIpPVwib25DYXNlRmxhZ1N0YXRlRW1pdHRlZCgkZXZlbnQpXCI+PC9jY2QtbWFuYWdlLWNhc2UtZmxhZ3M+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiY2FzZUZsYWdGaWVsZFN0YXRlLkZMQUdfVVBEQVRFXCI+XG4gICAgICA8Y2NkLXVwZGF0ZS1mbGFnIFtmb3JtR3JvdXBdPVwiY2FzZUZsYWdQYXJlbnRGb3JtR3JvdXBcIiBbc2VsZWN0ZWRGbGFnXT1cInNlbGVjdGVkRmxhZ1wiXG4gICAgICAgIChjYXNlRmxhZ1N0YXRlRW1pdHRlcik9XCJvbkNhc2VGbGFnU3RhdGVFbWl0dGVkKCRldmVudClcIj48L2NjZC11cGRhdGUtZmxhZz5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==