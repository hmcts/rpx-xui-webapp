"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var case_edit_component_1 = require("../case-edit/case-edit.component");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var material_1 = require("@angular/material");
var form_value_service_1 = require("../../../services/form/form-value.service");
var page_validation_service_1 = require("../services/page-validation.service");
var save_or_discard_dialog_1 = require("../../dialogs/save-or-discard-dialog");
var form_error_service_1 = require("../../../services/form/form-error.service");
var draft_model_1 = require("../../../domain/draft.model");
var fields_1 = require("../../../services/fields");
var case_field_service_1 = require("../../../services/case-fields/case-field.service");
var CaseEditPageComponent = /** @class */ (function () {
    function CaseEditPageComponent(caseEdit, route, formValueService, formErrorService, cdRef, pageValidationService, dialog, caseFieldService) {
        this.caseEdit = caseEdit;
        this.route = route;
        this.formValueService = formValueService;
        this.formErrorService = formErrorService;
        this.cdRef = cdRef;
        this.pageValidationService = pageValidationService;
        this.dialog = dialog;
        this.caseFieldService = caseFieldService;
        this.callbackErrorsSubject = new rxjs_1.Subject();
        this.ignoreWarning = false;
        this.triggerTextStart = CaseEditPageComponent_1.TRIGGER_TEXT_START;
        this.triggerTextIgnoreWarnings = CaseEditPageComponent_1.TRIGGER_TEXT_CONTINUE;
        this.isSubmitting = false;
        this.formValuesChanged = false;
        this.pageChangeSubject = new rxjs_1.Subject();
        this.validationErrors = [];
        this.hasPreviousPage$ = new rxjs_1.BehaviorSubject(false);
    }
    CaseEditPageComponent_1 = CaseEditPageComponent;
    CaseEditPageComponent.scrollToTop = function () {
        window.scrollTo(0, 0);
    };
    CaseEditPageComponent.setFocusToTop = function () {
        var topContainer = document.getElementById('top');
        if (topContainer) {
            topContainer.focus();
        }
    };
    CaseEditPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initDialog();
        this.eventTrigger = this.caseEdit.eventTrigger;
        this.editForm = this.caseEdit.form;
        this.wizard = this.caseEdit.wizard;
        this.caseFields = this.getCaseFields();
        this.triggerText = this.getTriggerText();
        this.route.params
            .subscribe(function (params) {
            var pageId = params['page'];
            if (!_this.currentPage || pageId !== _this.currentPage.id) {
                var page = _this.caseEdit.getPage(pageId);
                if (page) {
                    _this.currentPage = page;
                }
                else {
                    if (_this.currentPage) {
                        return _this.next();
                    }
                    else {
                        return _this.first();
                    }
                }
                _this.hasPreviousPage$.next(_this.caseEdit.hasPrevious(_this.currentPage.id));
            }
        });
        CaseEditPageComponent_1.setFocusToTop();
    };
    CaseEditPageComponent.prototype.ngAfterViewChecked = function () {
        this.cdRef.detectChanges();
    };
    CaseEditPageComponent.prototype.applyValuesChanged = function (valuesChanged) {
        this.formValuesChanged = valuesChanged;
    };
    CaseEditPageComponent.prototype.first = function () {
        return this.caseEdit.first();
    };
    CaseEditPageComponent.prototype.currentPageIsNotValid = function () {
        return !this.pageValidationService.isPageValid(this.currentPage, this.editForm);
    };
    /**
     * caseEventData.event_data contains all the values from the previous pages so we set caseEventData.data = caseEventData.event_data
     * This builds the form with data from the previous pages
     * EUI-3732 - Breathing space data not persisted on Previous button click with ExpUI Demo
     */
    CaseEditPageComponent.prototype.toPreviousPage = function () {
        this.validationErrors = [];
        var caseEventData = this.buildCaseEventData();
        caseEventData.data = caseEventData.event_data;
        this.updateFormData(caseEventData);
        this.previous();
        CaseEditPageComponent_1.setFocusToTop();
    };
    // Adding validation message to show it as Error Summary
    CaseEditPageComponent.prototype.generateErrorMessage = function (fields, container) {
        var _this = this;
        var group = container || this.editForm.controls['data'];
        fields.filter(function (casefield) { return !_this.caseFieldService.isReadOnly(casefield); })
            .filter(function (casefield) { return !_this.pageValidationService.isHidden(casefield, _this.editForm); })
            .forEach(function (casefield) {
            var fieldElement = group.get(casefield.id);
            if (fieldElement) {
                var label = casefield.label || 'Field';
                var id = casefield.id;
                if (fieldElement['component'] && fieldElement['component'].parent) {
                    id = "" + fieldElement['component'].idPrefix + id;
                }
                if (fieldElement.hasError('required')) {
                    _this.validationErrors.push({ id: id, message: label + " is required" });
                    fieldElement.markAsDirty();
                }
                else if (fieldElement.hasError('pattern')) {
                    _this.validationErrors.push({ id: id, message: label + " is not valid" });
                    fieldElement.markAsDirty();
                }
                else if (fieldElement.hasError('minlength')) {
                    _this.validationErrors.push({ id: id, message: label + " is below the minimum length" });
                    fieldElement.markAsDirty();
                }
                else if (fieldElement.hasError('maxlength')) {
                    _this.validationErrors.push({ id: id, message: label + " exceeds the maximum length" });
                    fieldElement.markAsDirty();
                }
                else if (fieldElement.invalid) {
                    if (casefield.isComplex()) {
                        _this.generateErrorMessage(casefield.field_type.complex_fields, fieldElement);
                    }
                    else if (casefield.isCollection() && casefield.field_type.collection_field_type.type === 'Complex') {
                        var fieldArray = fieldElement;
                        fieldArray.controls.forEach(function (c) {
                            _this.generateErrorMessage(casefield.field_type.collection_field_type.complex_fields, c.get('value'));
                        });
                    }
                    else {
                        _this.validationErrors.push({ id: id, message: "Select or fill the required " + casefield.label + " field" });
                        fieldElement.markAsDirty();
                    }
                }
            }
        });
        CaseEditPageComponent_1.scrollToTop();
    };
    CaseEditPageComponent.prototype.navigateToErrorElement = function (elementId) {
        if (elementId) {
            var htmlElement = document.getElementById(elementId);
            if (htmlElement) {
                htmlElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                htmlElement.focus();
            }
        }
    };
    CaseEditPageComponent.prototype.submit = function () {
        var _this = this;
        this.validationErrors = [];
        if (this.currentPageIsNotValid()) {
            this.generateErrorMessage(this.currentPage.case_fields);
        }
        if (!this.isSubmitting && !this.currentPageIsNotValid()) {
            this.isSubmitting = true;
            this.error = null;
            var caseEventData = this.buildCaseEventData();
            this.caseEdit.validate(caseEventData, this.currentPage.id)
                .subscribe(function (jsonData) {
                if (jsonData) {
                    _this.updateFormData(jsonData);
                }
                _this.saveDraft();
                _this.next();
            }, function (error) { return _this.handleError(error); });
            CaseEditPageComponent_1.scrollToTop();
        }
        CaseEditPageComponent_1.setFocusToTop();
    };
    CaseEditPageComponent.prototype.updateFormData = function (jsonData) {
        for (var _i = 0, _a = Object.keys(jsonData.data); _i < _a.length; _i++) {
            var caseFieldId = _a[_i];
            if (this.pageWithFieldExists(caseFieldId)) {
                this.updateEventTriggerCaseFields(caseFieldId, jsonData, this.caseEdit.eventTrigger);
                this.updateFormControlsValue(this.editForm, caseFieldId, jsonData.data[caseFieldId]);
            }
        }
    };
    // we do the check, becasue the data comes from the external source
    CaseEditPageComponent.prototype.pageWithFieldExists = function (caseFieldId) {
        return this.wizard.findWizardPage(caseFieldId);
    };
    CaseEditPageComponent.prototype.updateEventTriggerCaseFields = function (caseFieldId, jsonData, eventTrigger) {
        if (eventTrigger.case_fields) {
            eventTrigger.case_fields
                .filter(function (element) { return element.id === caseFieldId; })
                .forEach(function (element) { return element.value = jsonData.data[caseFieldId]; });
        }
    };
    CaseEditPageComponent.prototype.updateFormControlsValue = function (formGroup, caseFieldId, value) {
        var theControl = formGroup.controls['data'].get(caseFieldId);
        if (theControl) {
            theControl.patchValue(value);
        }
    };
    CaseEditPageComponent.prototype.callbackErrorsNotify = function (errorContext) {
        this.ignoreWarning = errorContext.ignore_warning;
        this.triggerText = errorContext.trigger_text;
    };
    CaseEditPageComponent.prototype.next = function () {
        this.resetErrors();
        this.isSubmitting = false;
        this.formValuesChanged = false;
        this.pageChangeSubject.next(true);
        return this.caseEdit.next(this.currentPage.id);
    };
    CaseEditPageComponent.prototype.previous = function () {
        this.resetErrors();
        this.saveDraft();
        this.formValuesChanged = false;
        this.pageChangeSubject.next(true);
        return this.caseEdit.previous(this.currentPage.id);
    };
    CaseEditPageComponent.prototype.hasPrevious = function () {
        return this.caseEdit.hasPrevious(this.currentPage.id);
    };
    CaseEditPageComponent.prototype.cancel = function () {
        var _this = this;
        if (this.eventTrigger.can_save_draft) {
            if (this.formValuesChanged) {
                var dialogRef = this.dialog.open(save_or_discard_dialog_1.SaveOrDiscardDialogComponent, this.dialogConfig);
                dialogRef.afterClosed().subscribe(function (result) {
                    if (result === 'Discard') {
                        _this.discard();
                    }
                    else if (result === 'Save') {
                        var draftCaseEventData = _this.formValueService.sanitise(_this.editForm.value);
                        if (_this.route.snapshot.queryParamMap.get(case_edit_component_1.CaseEditComponent.ORIGIN_QUERY_PARAM) === 'viewDraft') {
                            _this.caseEdit.cancelled.emit({ status: CaseEditPageComponent_1.RESUMED_FORM_SAVE, data: draftCaseEventData });
                        }
                        else {
                            _this.caseEdit.cancelled.emit({ status: CaseEditPageComponent_1.NEW_FORM_SAVE, data: draftCaseEventData });
                        }
                    }
                });
            }
            else {
                this.discard();
            }
        }
        else {
            this.caseEdit.cancelled.emit();
        }
    };
    CaseEditPageComponent.prototype.submitting = function () {
        return this.isSubmitting;
    };
    CaseEditPageComponent.prototype.getCaseId = function () {
        return (this.caseEdit.caseDetails ? this.caseEdit.caseDetails.case_id : '');
    };
    CaseEditPageComponent.prototype.getCaseTitle = function () {
        return (this.caseEdit.caseDetails && this.caseEdit.caseDetails.state &&
            this.caseEdit.caseDetails.state.title_display ? this.caseEdit.caseDetails.state.title_display : '');
    };
    CaseEditPageComponent.prototype.getCancelText = function () {
        return this.eventTrigger.can_save_draft ? 'Return to case list' : 'Cancel';
    };
    CaseEditPageComponent.prototype.getTriggerText = function () {
        return this.eventTrigger && this.eventTrigger.can_save_draft
            ? CaseEditPageComponent_1.TRIGGER_TEXT_SAVE
            : CaseEditPageComponent_1.TRIGGER_TEXT_START;
    };
    CaseEditPageComponent.prototype.initDialog = function () {
        this.dialogConfig = new material_1.MatDialogConfig();
        this.dialogConfig.disableClose = true;
        this.dialogConfig.autoFocus = true;
        this.dialogConfig.ariaLabel = 'Label';
        this.dialogConfig.height = '245px';
        this.dialogConfig.width = '550px';
        this.dialogConfig.panelClass = 'dialog';
        this.dialogConfig.closeOnNavigation = false;
        this.dialogConfig.position = {
            top: window.innerHeight / 2 - 120 + 'px', left: window.innerWidth / 2 - 275 + 'px'
        };
    };
    CaseEditPageComponent.prototype.discard = function () {
        if (this.route.snapshot.queryParamMap.get(case_edit_component_1.CaseEditComponent.ORIGIN_QUERY_PARAM) === 'viewDraft') {
            this.caseEdit.cancelled.emit({ status: CaseEditPageComponent_1.RESUMED_FORM_DISCARD });
        }
        else {
            this.caseEdit.cancelled.emit({ status: CaseEditPageComponent_1.NEW_FORM_DISCARD });
        }
    };
    CaseEditPageComponent.prototype.handleError = function (error) {
        this.isSubmitting = false;
        this.error = error;
        this.callbackErrorsSubject.next(this.error);
        if (this.error.details) {
            this.formErrorService
                .mapFieldErrors(this.error.details.field_errors, this.editForm.controls['data'], 'validation');
        }
    };
    CaseEditPageComponent.prototype.resetErrors = function () {
        this.error = null;
        this.ignoreWarning = false;
        this.triggerText = this.getTriggerText();
        this.callbackErrorsSubject.next(null);
    };
    CaseEditPageComponent.prototype.saveDraft = function () {
        var _this = this;
        if (this.eventTrigger.can_save_draft) {
            var draftCaseEventData = this.formValueService.sanitise(this.editForm.value);
            draftCaseEventData.event_token = this.eventTrigger.event_token;
            draftCaseEventData.ignore_warning = this.ignoreWarning;
            this.caseEdit.saveDraft(draftCaseEventData).subscribe(function (draft) { return _this.eventTrigger.case_id = draft_model_1.DRAFT_PREFIX + draft.id; }, function (error) { return _this.handleError(error); });
        }
    };
    CaseEditPageComponent.prototype.getCaseFields = function () {
        if (this.caseEdit.caseDetails) {
            return fields_1.FieldsUtils.getCaseFields(this.caseEdit.caseDetails);
        }
        return this.eventTrigger.case_fields;
    };
    CaseEditPageComponent.prototype.getCaseFieldsFromCurrentAndPreviousPages = function () {
        var _this = this;
        var result = [];
        this.wizard.pages.forEach(function (page) {
            if (page.order <= _this.currentPage.order) {
                page.case_fields.forEach(function (field) { return result.push(field); });
            }
        });
        return result;
    };
    CaseEditPageComponent.prototype.buildCaseEventData = function () {
        var formValue = this.editForm.value;
        // Get the CaseEventData for the current page.
        var pageFields = this.currentPage.case_fields;
        var pageEventData = this.getFilteredCaseEventData(pageFields, formValue, true);
        // Get the CaseEventData for the entire form (all pages).
        var allCaseFields = this.getCaseFieldsFromCurrentAndPreviousPages();
        var formEventData = this.getFilteredCaseEventData(allCaseFields, formValue, false, true);
        // Now here's the key thing - the pageEventData has a property called `event_data` and
        // we need THAT to be the value of the entire form: `formEventData.data`.
        pageEventData.event_data = formEventData.data;
        // Finalise the CaseEventData object.
        pageEventData.event_token = this.eventTrigger.event_token;
        pageEventData.ignore_warning = this.ignoreWarning;
        // Finally, try to set up the case_reference.
        if (this.caseEdit.caseDetails) {
            pageEventData.case_reference = this.caseEdit.caseDetails.case_id;
        }
        // Return the now hopefully sane CaseEventData.
        return pageEventData;
    };
    /**
     * Abstracted this method from buildCaseEventData to remove duplication.
     * @param caseFields The fields to filter the data by.
     * @param formValue The original value of the form.
     * @param clearEmpty Whether or not to clear out empty values.
     * @param clearNonCase Whether or not to clear out fields that are not part of the case.
     * @returns CaseEventData for the specified parameters.
     */
    CaseEditPageComponent.prototype.getFilteredCaseEventData = function (caseFields, formValue, clearEmpty, clearNonCase) {
        if (clearEmpty === void 0) { clearEmpty = false; }
        if (clearNonCase === void 0) { clearNonCase = false; }
        // Get the data for the fields specified.
        var formFields = this.formValueService.filterCurrentPageFields(caseFields, formValue);
        // Sort out the dynamic lists.
        this.formValueService.sanitiseDynamicLists(caseFields, formFields);
        // Get hold of the CaseEventData.
        var caseEventData = this.formValueService.sanitise(formFields);
        // Tidy it up before we return it.
        this.formValueService.removeUnnecessaryFields(caseEventData.data, caseFields, clearEmpty, clearNonCase);
        return caseEventData;
    };
    var CaseEditPageComponent_1;
    CaseEditPageComponent.RESUMED_FORM_DISCARD = 'RESUMED_FORM_DISCARD';
    CaseEditPageComponent.NEW_FORM_DISCARD = 'NEW_FORM_DISCARD';
    CaseEditPageComponent.NEW_FORM_SAVE = 'NEW_FORM_CHANGED_SAVE';
    CaseEditPageComponent.RESUMED_FORM_SAVE = 'RESUMED_FORM_SAVE';
    CaseEditPageComponent.TRIGGER_TEXT_START = 'Continue';
    CaseEditPageComponent.TRIGGER_TEXT_SAVE = 'Save and continue';
    CaseEditPageComponent.TRIGGER_TEXT_CONTINUE = 'Ignore Warning and Continue';
    CaseEditPageComponent = CaseEditPageComponent_1 = __decorate([
        core_1.Component({
            selector: 'ccd-case-edit-page',
            template: "\n    <ng-container *ngIf=\"currentPage\">\n      <h1 *ngIf=\"!currentPage.label\" class=\"govuk-heading-l\">{{eventTrigger.name}}</h1>\n      <ng-container *ngIf=\"currentPage.label\">\n        <span class=\"govuk-caption-l\">{{ eventTrigger.name}}</span>\n        <h1 class=\"govuk-heading-l\">{{currentPage.label}}</h1>\n      </ng-container>\n    </ng-container>\n\n    <!--Case ID or Title -->\n    <div *ngIf=\"getCaseTitle(); then titleBlock; else idBlock\"></div>\n    <ng-template #titleBlock>\n      <h2 class=\"heading-h2\" [innerHTML]=\"getCaseTitle() | ccdCaseTitle: caseFields : editForm.controls['data']\"></h2>\n    </ng-template>\n    <ng-template #idBlock>\n      <h2 *ngIf=\"getCaseId()\" class=\"heading-h2\">#{{ getCaseId() | ccdCaseReference }}</h2>\n    </ng-template>\n\n    <!-- Error message summary -->\n    <div *ngIf=\"validationErrors.length > 0\" class=\"govuk-error-summary\" aria-labelledby=\"error-summary-title\" role=\"alert\" tabindex=\"-1\" data-module=\"govuk-error-summary\">\n      <h2 class=\"govuk-error-summary__title\" id=\"error-summary-title\">\n        There is a problem\n      </h2>\n      <div *ngFor=\"let validationError of validationErrors\" class=\"govuk-error-summary__body\">\n        <ul class=\"govuk-list govuk-error-summary__list\">\n          <li>\n            <a (click)=\"navigateToErrorElement(validationError.id)\" class=\"validation-error\">{{validationError.message}}</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n\n    <!-- Generic error heading and error message to be displayed only if there are no specific callback errors or warnings, or no error details -->\n    <div *ngIf=\"error && !(error.callbackErrors || error.callbackWarnings || error.details)\" class=\"error-summary\"\n         role=\"status\" aria-labelledby=\"edit-case-event_error-summary-heading\" tabindex=\"-1\">\n\n      <h1 class=\"heading-h1 error-summary-heading\" id=\"edit-case-event_error-summary-heading\">\n        Something went wrong\n      </h1>\n      <div class=\"govuk-error-summary__body\" id=\"edit-case-event_error-summary-body\">\n        <p>We're working to fix the problem. Try again shortly.</p>\n        <p><a href=\"get-help\" target=\"_blank\">Contact us</a> if you're still having problems.</p>\n      </div>\n    </div>\n    <!-- Event error heading and error message to be displayed if there are specific error details -->\n    <div *ngIf=\"error && error.details\" class=\"error-summary\" role=\"status\"\n         aria-labelledby=\"edit-case-event_error-summary-heading\" tabindex=\"-1\">\n      <h3 class=\"heading-h3 error-summary-heading\" id=\"edit-case-event_error-summary-heading-3\">\n        The event could not be created\n      </h3>\n      <p>{{error.message}}</p>\n      <ul *ngIf=\"error.details?.field_errors\" class=\"error-summary-list\">\n        <li *ngFor=\"let fieldError of error.details.field_errors\" class=\"ccd-error-summary-li\">{{fieldError.message}}</li>\n      </ul>\n    </div>\n    <ccd-callback-errors\n      [triggerTextContinue]=\"triggerTextStart\"\n      [triggerTextIgnore]=\"triggerTextIgnoreWarnings\"\n      [callbackErrorsSubject]=\"callbackErrorsSubject\"\n      (callbackErrorsContext)=\"callbackErrorsNotify($event)\">\n    </ccd-callback-errors>\n    <div class=\"width-50\">\n      <form *ngIf=\"currentPage\" class=\"form\" [formGroup]=\"editForm\" (submit)=\"submit()\">\n        <fieldset id=\"fieldset-case-data\">\n          <!-- single column -->\n          <ccd-case-edit-form id='caseEditForm' *ngIf=\"!currentPage.isMultiColumn()\" [fields]=\"currentPage.getCol1Fields()\"\n                              [formGroup]=\"editForm.controls['data']\" [caseFields]=\"caseFields\"\n                              [pageChangeSubject]=\"pageChangeSubject\"\n                              (valuesChanged)=\"applyValuesChanged($event)\"></ccd-case-edit-form>\n          <!-- two columns -->\n          <div *ngIf=\"currentPage.isMultiColumn()\" class=\"grid-row\">\n            <div class=\"column-two-thirds rightBorderSeparator\">\n              <ccd-case-edit-form id='caseEditForm1' [fields]=\"currentPage.getCol1Fields()\"\n                                  [formGroup]=\"editForm.controls['data']\" [caseFields]=\"caseFields\"></ccd-case-edit-form>\n            </div>\n            <div class=\"column-one-third\">\n              <ccd-case-edit-form id='caseEditForm2' [fields]=\"currentPage.getCol2Fields()\"\n                                  [formGroup]=\"editForm.controls['data']\" [caseFields]=\"caseFields\"></ccd-case-edit-form>\n            </div>\n          </div>\n        </fieldset>\n\n        <div class=\"form-group form-group-related\">\n          <button class=\"button button-secondary\" type=\"button\" [disabled]=\"!(hasPreviousPage$ | async)\" (click)=\"toPreviousPage()\">\n            Previous\n          </button>\n          <button class=\"button\" type=\"submit\" [disabled]=\"submitting()\">{{triggerText}}</button>\n        </div>\n\n        <p class=\"cancel\"><a (click)=\"cancel()\" href=\"javascript:void(0)\">{{getCancelText()}}</a></p>\n\n      </form>\n    </div>\n  ",
            styles: ["\n    .rightBorderSeparator{border-right-width:4px;border-right-color:#ffcc02;border-right-style:solid}.validation-error{cursor:pointer;text-decoration:underline;color:#d4351c}\n  "]
        }),
        __metadata("design:paramtypes", [case_edit_component_1.CaseEditComponent,
            router_1.ActivatedRoute,
            form_value_service_1.FormValueService,
            form_error_service_1.FormErrorService,
            core_1.ChangeDetectorRef,
            page_validation_service_1.PageValidationService,
            material_1.MatDialog,
            case_field_service_1.CaseFieldService])
    ], CaseEditPageComponent);
    return CaseEditPageComponent;
}());
exports.CaseEditPageComponent = CaseEditPageComponent;
//# sourceMappingURL=case-edit-page.component.js.map