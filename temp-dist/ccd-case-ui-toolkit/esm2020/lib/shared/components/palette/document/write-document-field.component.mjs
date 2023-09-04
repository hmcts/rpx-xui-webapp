import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AbstractAppConfig } from '../../../../app.config';
import { Constants } from '../../../commons/constants';
import { DocumentManagementService } from '../../../services/document-management/document-management.service';
import { CaseNotifier } from '../../case-editor/services/case.notifier';
import { DocumentDialogComponent } from '../../dialogs/document-dialog/document-dialog.component';
import { initDialog } from '../../helpers';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { FileUploadStateService } from './file-upload-state.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../../app.config";
import * as i2 from "../../case-editor/services/case.notifier";
import * as i3 from "../../../services/document-management/document-management.service";
import * as i4 from "@angular/material/dialog";
import * as i5 from "./file-upload-state.service";
const _c0 = ["fileInput"];
function WriteDocumentFieldComponent_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 12);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.caseField.hint_text));
} }
function WriteDocumentFieldComponent_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.fileUploadMessages));
} }
function WriteDocumentFieldComponent_ccd_read_document_field_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-read-document-field", 14);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseField", ctx_r2.caseField);
} }
const _c1 = function (a0) { return { "form-group-error bottom-30": a0 }; };
export class WriteDocumentFieldComponent extends AbstractFieldWriteComponent {
    constructor(appConfig, caseNotifier, documentManagement, dialog, fileUploadStateService) {
        super();
        this.appConfig = appConfig;
        this.caseNotifier = caseNotifier;
        this.documentManagement = documentManagement;
        this.dialog = dialog;
        this.fileUploadStateService = fileUploadStateService;
        this.valid = true;
    }
    clickout(event) {
        // Capturing the event of of the associated  ElementRef <input type="file" #fileInpu
        if (this.fileInput.nativeElement.contains(event.target)) {
            this.clickInsideTheDocument = true;
        }
        else {
            this.fileValidations();
        }
    }
    ngOnInit() {
        this.secureModeOn = this.appConfig.getDocumentSecureMode();
        this.dialogConfig = initDialog();
        // EUI-3403. The field was not being registered when there was no value and the field
        // itself was not mandatory, which meant that show_conditions would not be evaluated.
        // I've cleaned up the logic and it's now always registered.
        let document = this.caseField.value || { document_url: null, document_binary_url: null, document_filename: null };
        document = this.secureModeOn && !document.document_hash ? { ...document, document_hash: null } : document;
        if (this.isAMandatoryComponent()) {
            this.createDocumentFormWithValidator(document);
        }
        else {
            this.createDocumentForm(document);
        }
        if (this.appConfig.getDocumentSecureMode()) {
            this.subscribeToCaseDetails();
        }
    }
    ngOnDestroy() {
        if (this.fileUploadSubscription) {
            this.fileUploadSubscription.unsubscribe();
        }
        if (this.dialogSubscription) {
            this.dialogSubscription.unsubscribe();
        }
        if (this.caseEventSubscription) {
            this.caseEventSubscription.unsubscribe();
        }
    }
    isUploadInProgress() {
        return this.fileUploadStateService.isUploadInProgress();
    }
    cancelUpload() {
        if (this.fileUploadSubscription) {
            this.fileUploadSubscription.unsubscribe();
        }
        this.fileUploadStateService.setUploadInProgress(false);
        this.fileInput.nativeElement.value = '';
        this.resetUpload();
    }
    fileValidationsOnTab() {
        if (this.isAMandatoryComponent()) {
            if (this.validateFormUploadedDocument()) {
                this.displayFileUploadMessages(WriteDocumentFieldComponent.UPLOAD_ERROR_FILE_REQUIRED);
            }
        }
    }
    fileChangeEvent(fileInput) {
        if (fileInput.target.files[0]) {
            this.selectedFile = fileInput.target.files[0];
            this.displayFileUploadMessages(WriteDocumentFieldComponent.UPLOAD_WAITING_FILE_STATUS);
            const documentUpload = this.buildDocumentUploadData(this.selectedFile);
            this.fileUploadStateService.setUploadInProgress(true);
            this.fileUploadSubscription = this.documentManagement.uploadFile(documentUpload).subscribe({
                next: (resultDocument) => this.handleDocumentUploadResult(resultDocument),
                error: (error) => this.handleDocumentUploadError(error)
            });
        }
        else {
            this.resetUpload();
        }
    }
    openFileDialog() {
        this.fileInput.nativeElement.click();
    }
    fileSelectEvent() {
        if ((this.caseField.value && this.caseField.value.document_filename) ||
            (this.selectedFile && this.selectedFile.name)) {
            this.openDialog(this.dialogConfig);
        }
        else {
            this.openFileDialog();
        }
    }
    triggerReplace() {
        if (this.confirmReplaceResult === 'Replace') {
            this.openFileDialog();
        }
    }
    getUploadedFileName() {
        if (this.uploadedDocument) {
            return this.uploadedDocument.get(WriteDocumentFieldComponent.DOCUMENT_FILENAME).value;
        }
        else {
            return undefined;
        }
    }
    resetUpload() {
        this.selectedFile = null;
        if (this.isAMandatoryComponent()) {
            this.updateDocumentForm(null, null, null);
            this.displayFileUploadMessages(WriteDocumentFieldComponent.UPLOAD_ERROR_FILE_REQUIRED);
        }
        else {
            this.valid = true;
        }
    }
    fileValidations() {
        if (this.isAMandatoryComponent()) {
            if (this.clickInsideTheDocument && this.validateFormUploadedDocument() && !this.isUpLoadingAFile()) {
                this.displayFileUploadMessages(WriteDocumentFieldComponent.UPLOAD_ERROR_FILE_REQUIRED);
            }
        }
    }
    openDialog(dialogConfig) {
        const dialogRef = this.dialog.open(DocumentDialogComponent, dialogConfig);
        this.dialogSubscription = dialogRef.beforeClosed().subscribe(result => {
            this.confirmReplaceResult = result;
            this.triggerReplace();
        });
    }
    subscribeToCaseDetails() {
        this.caseEventSubscription = this.caseNotifier.caseView.subscribe({
            next: (caseDetails) => {
                this.caseDetails = caseDetails;
            }
        });
    }
    isAMandatoryComponent() {
        return this.caseField.display_context && this.caseField.display_context === Constants.MANDATORY;
    }
    displayFileUploadMessages(fileUploadMessage) {
        this.valid = false;
        this.fileUploadMessages = fileUploadMessage;
    }
    isUpLoadingAFile() {
        return this.fileUploadMessages === WriteDocumentFieldComponent.UPLOAD_WAITING_FILE_STATUS;
    }
    validateFormUploadedDocument() {
        if (!this.uploadedDocument) {
            return true;
        }
        let validation = !this.uploadedDocument.get(WriteDocumentFieldComponent.DOCUMENT_URL).valid &&
            !this.uploadedDocument.get(WriteDocumentFieldComponent.DOCUMENT_BINARY_URL).valid &&
            !this.uploadedDocument.get(WriteDocumentFieldComponent.DOCUMENT_FILENAME).valid;
        if (this.secureModeOn) {
            validation = validation && !this.uploadedDocument.get(WriteDocumentFieldComponent.DOCUMENT_HASH).valid;
        }
        return validation;
    }
    updateDocumentForm(url, binaryUrl, filename, documentHash) {
        this.uploadedDocument.get(WriteDocumentFieldComponent.DOCUMENT_URL).setValue(url);
        this.uploadedDocument.get(WriteDocumentFieldComponent.DOCUMENT_BINARY_URL).setValue(binaryUrl);
        this.uploadedDocument.get(WriteDocumentFieldComponent.DOCUMENT_FILENAME).setValue(filename);
        if (documentHash) {
            this.uploadedDocument.get(WriteDocumentFieldComponent.DOCUMENT_HASH).setValue(documentHash);
        }
    }
    createDocumentFormWithValidator(document) {
        let documentFormGroup = {
            document_url: new FormControl(document.document_url, Validators.required),
            document_binary_url: new FormControl(document.document_binary_url, Validators.required),
            document_filename: new FormControl(document.document_filename, Validators.required)
        };
        documentFormGroup = this.secureModeOn ? {
            ...documentFormGroup,
            ...{ document_hash: new FormControl(document.document_hash) }
        } : documentFormGroup;
        this.uploadedDocument = this.registerControl(new UntypedFormGroup(documentFormGroup), true);
    }
    createDocumentForm(document) {
        let documentFormGroup = {
            document_url: new FormControl(document.document_url),
            document_binary_url: new FormControl(document.document_binary_url),
            document_filename: new FormControl(document.document_filename)
        };
        documentFormGroup = this.secureModeOn ? {
            ...documentFormGroup,
            ...{ document_hash: new FormControl(document.document_hash) }
        } : documentFormGroup;
        this.uploadedDocument = this.registerControl(new UntypedFormGroup(documentFormGroup), true);
    }
    getErrorMessage(error) {
        // Document Management unavailable
        if (0 === error.status || 502 === error.status) {
            return WriteDocumentFieldComponent.UPLOAD_ERROR_NOT_AVAILABLE;
        }
        return error.error;
    }
    buildDocumentUploadData(selectedFile) {
        const documentUpload = new FormData();
        documentUpload.append('files', selectedFile, selectedFile.name);
        documentUpload.append('classification', 'PUBLIC');
        if (this.appConfig.getDocumentSecureMode()) {
            const caseTypeId = this.caseDetails &&
                this.caseDetails.case_type &&
                this.caseDetails.case_type.id ? this.caseDetails.case_type.id : null;
            const caseTypeJurisdictionId = this.caseDetails &&
                this.caseDetails.case_type &&
                this.caseDetails.case_type.jurisdiction &&
                this.caseDetails.case_type.jurisdiction.id ? this.caseDetails.case_type.jurisdiction.id : null;
            documentUpload.append('caseTypeId', caseTypeId);
            documentUpload.append('jurisdictionId', caseTypeJurisdictionId);
        }
        return documentUpload;
    }
    handleDocumentUploadResult(result) {
        if (!this.uploadedDocument) {
            if (this.secureModeOn) {
                this.createDocumentForm({ document_url: null, document_binary_url: null, document_filename: null, document_hash: null });
            }
            else {
                this.createDocumentForm({ document_url: null, document_binary_url: null, document_filename: null });
            }
        }
        const document = this.secureModeOn ? result.documents[0] : result._embedded.documents[0];
        if (this.secureModeOn) {
            this.updateDocumentForm(document._links.self.href, document._links.binary.href, document.originalDocumentName, document.hashToken);
        }
        else {
            this.updateDocumentForm(document._links.self.href, document._links.binary.href, document.originalDocumentName);
        }
        this.valid = true;
        this.fileUploadStateService.setUploadInProgress(false);
        // refresh replaced document info
        if (this.caseField.value) {
            this.caseField.value.document_binary_url = document._links.binary.href;
            this.caseField.value.document_filename = document.originalDocumentName;
            this.caseField.value.document_url = document._links.self.href;
            if (this.secureModeOn) {
                this.caseField.value.document_hash = document.hashToken;
            }
        }
    }
    handleDocumentUploadError(error) {
        this.fileUploadMessages = this.getErrorMessage(error);
        this.valid = false;
        this.fileUploadStateService.setUploadInProgress(false);
    }
}
WriteDocumentFieldComponent.DOCUMENT_URL = 'document_url';
WriteDocumentFieldComponent.DOCUMENT_BINARY_URL = 'document_binary_url';
WriteDocumentFieldComponent.DOCUMENT_FILENAME = 'document_filename';
WriteDocumentFieldComponent.DOCUMENT_HASH = 'document_hash';
WriteDocumentFieldComponent.UPLOAD_ERROR_FILE_REQUIRED = 'File required';
WriteDocumentFieldComponent.UPLOAD_ERROR_NOT_AVAILABLE = 'Document upload facility is not available at the moment';
WriteDocumentFieldComponent.UPLOAD_WAITING_FILE_STATUS = 'Uploading...';
WriteDocumentFieldComponent.ɵfac = function WriteDocumentFieldComponent_Factory(t) { return new (t || WriteDocumentFieldComponent)(i0.ɵɵdirectiveInject(i1.AbstractAppConfig), i0.ɵɵdirectiveInject(i2.CaseNotifier), i0.ɵɵdirectiveInject(i3.DocumentManagementService), i0.ɵɵdirectiveInject(i4.MatDialog), i0.ɵɵdirectiveInject(i5.FileUploadStateService)); };
WriteDocumentFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteDocumentFieldComponent, selectors: [["ccd-write-document-field"]], viewQuery: function WriteDocumentFieldComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileInput = _t.first);
    } }, hostBindings: function WriteDocumentFieldComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function WriteDocumentFieldComponent_click_HostBindingHandler($event) { return ctx.clickout($event); }, false, i0.ɵɵresolveDocument);
    } }, features: [i0.ɵɵInheritDefinitionFeature], decls: 19, vars: 22, consts: [[1, "form-group", 3, "ngClass"], [3, "for"], [1, "form-label"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [3, "caseField", 4, "ngIf"], [2, "position", "relative"], [3, "id", "click"], ["type", "file", 1, "form-control", "bottom-30", 3, "id", "accept", "keydown.Tab", "change"], ["fileInput", ""], [1, "form-group", "bottom-30"], ["type", "button", "aria-label", "Cancel upload", 1, "button", "button-secondary", 3, "disabled", "click"], [1, "form-hint"], [1, "error-message"], [3, "caseField"]], template: function WriteDocumentFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "label", 1)(2, "span", 2);
        i0.ɵɵpipe(3, "ccdFieldLabel");
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "rpxTranslate");
        i0.ɵɵpipe(6, "ccdFieldLabel");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(7, WriteDocumentFieldComponent_span_7_Template, 3, 3, "span", 3);
        i0.ɵɵtemplate(8, WriteDocumentFieldComponent_span_8_Template, 3, 3, "span", 4);
        i0.ɵɵelementStart(9, "div");
        i0.ɵɵtemplate(10, WriteDocumentFieldComponent_ccd_read_document_field_10_Template, 1, 1, "ccd-read-document-field", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6)(12, "div", 7);
        i0.ɵɵlistener("click", function WriteDocumentFieldComponent_Template_div_click_12_listener() { return ctx.fileSelectEvent(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "input", 8, 9);
        i0.ɵɵlistener("keydown.Tab", function WriteDocumentFieldComponent_Template_input_keydown_Tab_13_listener() { return ctx.fileValidationsOnTab(); })("change", function WriteDocumentFieldComponent_Template_input_change_13_listener($event) { return ctx.fileChangeEvent($event); });
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(15, "div", 10)(16, "button", 11);
        i0.ɵɵlistener("click", function WriteDocumentFieldComponent_Template_button_click_16_listener() { return ctx.cancelUpload(); });
        i0.ɵɵtext(17);
        i0.ɵɵpipe(18, "rpxTranslate");
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(20, _c1, !ctx.valid));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("for", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(3, 12, ctx.caseField));
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 14, i0.ɵɵpipeBind1(6, 16, ctx.caseField)));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.fileUploadMessages && !ctx.valid);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.caseField);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("id", ctx.createElementId("fileInputWrapper"));
        i0.ɵɵadvance(1);
        i0.ɵɵpropertyInterpolate("accept", ctx.caseField.field_type.regular_expression);
        i0.ɵɵproperty("id", ctx.id());
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("disabled", !ctx.isUploadInProgress());
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 18, "Cancel upload"));
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteDocumentFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-document-field', template: "<div class=\"form-group\" [ngClass]=\"{'form-group-error bottom-30': !valid}\">\n  <label [for]=\"id()\">\n    <span class=\"form-label\" attr.aria-label=\"{{caseField | ccdFieldLabel}}\">{{(caseField | ccdFieldLabel) | rpxTranslate}}</span>\n  </label>\n  <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate}}</span>\n  <span class=\"error-message\" *ngIf=\"fileUploadMessages && !valid\">{{fileUploadMessages | rpxTranslate}}</span>\n\n  <div>\n    <!--<span *ngIf=\"getUploadedFileName()\" class=\"text-16\">File name: {{getUploadedFileName()}}</span>-->\n    <ccd-read-document-field *ngIf=\"caseField\" [caseField]=\"caseField\"></ccd-read-document-field>\n  </div>\n\n  <div style='position:relative'>\n\n    <div [id]=\"createElementId('fileInputWrapper')\" (click)=\"fileSelectEvent()\"></div>\n    <input class=\"form-control bottom-30\" [id]=\"id()\" type=\"file\" (keydown.Tab)=\"fileValidationsOnTab()\" (change)=\"fileChangeEvent($event)\"\n           accept=\"{{caseField.field_type.regular_expression}}\" #fileInput/>\n  </div>\n</div>\n<div class=\"form-group bottom-30\">\n  <button class=\"button button-secondary\" type=\"button\" aria-label=\"Cancel upload\" (click)=\"cancelUpload()\" [disabled]=\"!isUploadInProgress()\">{{'Cancel upload' | rpxTranslate}}</button>\n</div>\n" }]
    }], function () { return [{ type: i1.AbstractAppConfig }, { type: i2.CaseNotifier }, { type: i3.DocumentManagementService }, { type: i4.MatDialog }, { type: i5.FileUploadStateService }]; }, { fileInput: [{
            type: ViewChild,
            args: ['fileInput', { static: false }]
        }], clickout: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtZG9jdW1lbnQtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZG9jdW1lbnQvd3JpdGUtZG9jdW1lbnQtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZG9jdW1lbnQvd3JpdGUtZG9jdW1lbnQtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxTQUFTLEVBQW1CLE1BQU0sMEJBQTBCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSXZELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQzlHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7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REFBa0M7UUFBQyxlQUFrQztRQUFsQyw2REFBa0M7O3VGREFwSywyQkFBMkI7Y0FKdkMsU0FBUzsyQkFDRSwwQkFBMEI7b01BWWMsU0FBUztrQkFBMUQsU0FBUzttQkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO1lBNEJsQyxRQUFRO2tCQURkLFlBQVk7bUJBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFic3RyYWN0QXBwQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vYXBwLmNvbmZpZyc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi8uLi8uLi9jb21tb25zL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDYXNlVmlldyB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcvY2FzZS12aWV3Lm1vZGVsJztcbmltcG9ydCB7IERvY3VtZW50RGF0YSwgRm9ybURvY3VtZW50IH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RvY3VtZW50L2RvY3VtZW50LWRhdGEubW9kZWwnO1xuaW1wb3J0IHsgSHR0cEVycm9yIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2h0dHAvaHR0cC1lcnJvci5tb2RlbCc7XG5pbXBvcnQgeyBEb2N1bWVudE1hbmFnZW1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvZG9jdW1lbnQtbWFuYWdlbWVudC9kb2N1bWVudC1tYW5hZ2VtZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FzZU5vdGlmaWVyIH0gZnJvbSAnLi4vLi4vY2FzZS1lZGl0b3Ivc2VydmljZXMvY2FzZS5ub3RpZmllcic7XG5pbXBvcnQgeyBEb2N1bWVudERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uLy4uL2RpYWxvZ3MvZG9jdW1lbnQtZGlhbG9nL2RvY3VtZW50LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgaW5pdERpYWxvZyB9IGZyb20gJy4uLy4uL2hlbHBlcnMnO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC13cml0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsZVVwbG9hZFN0YXRlU2VydmljZSB9IGZyb20gJy4vZmlsZS11cGxvYWQtc3RhdGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC13cml0ZS1kb2N1bWVudC1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93cml0ZS1kb2N1bWVudC1maWVsZC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBXcml0ZURvY3VtZW50RmllbGRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRE9DVU1FTlRfVVJMID0gJ2RvY3VtZW50X3VybCc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRE9DVU1FTlRfQklOQVJZX1VSTCA9ICdkb2N1bWVudF9iaW5hcnlfdXJsJztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBET0NVTUVOVF9GSUxFTkFNRSA9ICdkb2N1bWVudF9maWxlbmFtZSc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRE9DVU1FTlRfSEFTSCA9ICdkb2N1bWVudF9oYXNoJztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBVUExPQURfRVJST1JfRklMRV9SRVFVSVJFRCA9ICdGaWxlIHJlcXVpcmVkJztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBVUExPQURfRVJST1JfTk9UX0FWQUlMQUJMRSA9ICdEb2N1bWVudCB1cGxvYWQgZmFjaWxpdHkgaXMgbm90IGF2YWlsYWJsZSBhdCB0aGUgbW9tZW50JztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBVUExPQURfV0FJVElOR19GSUxFX1NUQVRVUyA9ICdVcGxvYWRpbmcuLi4nO1xuXG4gIEBWaWV3Q2hpbGQoJ2ZpbGVJbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgZmlsZUlucHV0OiBFbGVtZW50UmVmO1xuXG4gIHB1YmxpYyBzZWxlY3RlZEZpbGU6IEZpbGU7XG4gIHB1YmxpYyB2YWxpZCA9IHRydWU7XG4gIHB1YmxpYyBmaWxlVXBsb2FkTWVzc2FnZXM6IHN0cmluZztcbiAgcHVibGljIGNvbmZpcm1SZXBsYWNlUmVzdWx0OiBzdHJpbmc7XG4gIHB1YmxpYyBjbGlja0luc2lkZVRoZURvY3VtZW50OiBib29sZWFuO1xuXG4gIHB1YmxpYyBmaWxlVXBsb2FkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBkaWFsb2dTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIGNhc2VFdmVudFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgY2FzZURldGFpbHM6IENhc2VWaWV3O1xuICBwcml2YXRlIHVwbG9hZGVkRG9jdW1lbnQ6IFVudHlwZWRGb3JtR3JvdXA7XG4gIHByaXZhdGUgZGlhbG9nQ29uZmlnOiBNYXREaWFsb2dDb25maWc7XG4gIHByaXZhdGUgc2VjdXJlTW9kZU9uOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXBwQ29uZmlnOiBBYnN0cmFjdEFwcENvbmZpZyxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VOb3RpZmllcjogQ2FzZU5vdGlmaWVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZG9jdW1lbnRNYW5hZ2VtZW50OiBEb2N1bWVudE1hbmFnZW1lbnRTZXJ2aWNlLFxuICAgIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpbGVVcGxvYWRTdGF0ZVNlcnZpY2U6IEZpbGVVcGxvYWRTdGF0ZVNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBjbGlja291dChldmVudCkge1xuICAgIC8vIENhcHR1cmluZyB0aGUgZXZlbnQgb2Ygb2YgdGhlIGFzc29jaWF0ZWQgIEVsZW1lbnRSZWYgPGlucHV0IHR5cGU9XCJmaWxlXCIgI2ZpbGVJbnB1XG5cbiAgICBpZiAodGhpcy5maWxlSW5wdXQubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmNsaWNrSW5zaWRlVGhlRG9jdW1lbnQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbGVWYWxpZGF0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlY3VyZU1vZGVPbiA9IHRoaXMuYXBwQ29uZmlnLmdldERvY3VtZW50U2VjdXJlTW9kZSgpO1xuICAgIHRoaXMuZGlhbG9nQ29uZmlnID0gaW5pdERpYWxvZygpO1xuICAgIC8vIEVVSS0zNDAzLiBUaGUgZmllbGQgd2FzIG5vdCBiZWluZyByZWdpc3RlcmVkIHdoZW4gdGhlcmUgd2FzIG5vIHZhbHVlIGFuZCB0aGUgZmllbGRcbiAgICAvLyBpdHNlbGYgd2FzIG5vdCBtYW5kYXRvcnksIHdoaWNoIG1lYW50IHRoYXQgc2hvd19jb25kaXRpb25zIHdvdWxkIG5vdCBiZSBldmFsdWF0ZWQuXG4gICAgLy8gSSd2ZSBjbGVhbmVkIHVwIHRoZSBsb2dpYyBhbmQgaXQncyBub3cgYWx3YXlzIHJlZ2lzdGVyZWQuXG4gICAgbGV0IGRvY3VtZW50ID0gdGhpcy5jYXNlRmllbGQudmFsdWUgfHwgeyBkb2N1bWVudF91cmw6IG51bGwsIGRvY3VtZW50X2JpbmFyeV91cmw6IG51bGwsIGRvY3VtZW50X2ZpbGVuYW1lOiBudWxsIH07XG4gICAgZG9jdW1lbnQgPSB0aGlzLnNlY3VyZU1vZGVPbiAmJiAhZG9jdW1lbnQuZG9jdW1lbnRfaGFzaCA/IHsgLi4uZG9jdW1lbnQsIGRvY3VtZW50X2hhc2g6IG51bGwgfSA6IGRvY3VtZW50O1xuICAgIGlmICh0aGlzLmlzQU1hbmRhdG9yeUNvbXBvbmVudCgpKSB7XG4gICAgICB0aGlzLmNyZWF0ZURvY3VtZW50Rm9ybVdpdGhWYWxpZGF0b3IoZG9jdW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZURvY3VtZW50Rm9ybShkb2N1bWVudCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYXBwQ29uZmlnLmdldERvY3VtZW50U2VjdXJlTW9kZSgpKSB7XG4gICAgICB0aGlzLnN1YnNjcmliZVRvQ2FzZURldGFpbHMoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZmlsZVVwbG9hZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5maWxlVXBsb2FkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRpYWxvZ1N1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5kaWFsb2dTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2FzZUV2ZW50U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNhc2VFdmVudFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc1VwbG9hZEluUHJvZ3Jlc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZVVwbG9hZFN0YXRlU2VydmljZS5pc1VwbG9hZEluUHJvZ3Jlc3MoKTtcbiAgfVxuXG4gIHB1YmxpYyBjYW5jZWxVcGxvYWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZmlsZVVwbG9hZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5maWxlVXBsb2FkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5maWxlVXBsb2FkU3RhdGVTZXJ2aWNlLnNldFVwbG9hZEluUHJvZ3Jlc3MoZmFsc2UpO1xuICAgIHRoaXMuZmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB0aGlzLnJlc2V0VXBsb2FkKCk7XG4gIH1cblxuICBwdWJsaWMgZmlsZVZhbGlkYXRpb25zT25UYWIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNBTWFuZGF0b3J5Q29tcG9uZW50KCkpIHtcbiAgICAgIGlmICh0aGlzLnZhbGlkYXRlRm9ybVVwbG9hZGVkRG9jdW1lbnQoKSkge1xuICAgICAgICB0aGlzLmRpc3BsYXlGaWxlVXBsb2FkTWVzc2FnZXMoV3JpdGVEb2N1bWVudEZpZWxkQ29tcG9uZW50LlVQTE9BRF9FUlJPUl9GSUxFX1JFUVVJUkVEKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZmlsZUNoYW5nZUV2ZW50KGZpbGVJbnB1dDogYW55KTogdm9pZCB7XG5cbiAgICBpZiAoZmlsZUlucHV0LnRhcmdldC5maWxlc1swXSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEZpbGUgPSBmaWxlSW5wdXQudGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgdGhpcy5kaXNwbGF5RmlsZVVwbG9hZE1lc3NhZ2VzKFdyaXRlRG9jdW1lbnRGaWVsZENvbXBvbmVudC5VUExPQURfV0FJVElOR19GSUxFX1NUQVRVUyk7XG4gICAgICBjb25zdCBkb2N1bWVudFVwbG9hZDogRm9ybURhdGEgPSB0aGlzLmJ1aWxkRG9jdW1lbnRVcGxvYWREYXRhKHRoaXMuc2VsZWN0ZWRGaWxlKTtcbiAgICAgIHRoaXMuZmlsZVVwbG9hZFN0YXRlU2VydmljZS5zZXRVcGxvYWRJblByb2dyZXNzKHRydWUpO1xuXG4gICAgICB0aGlzLmZpbGVVcGxvYWRTdWJzY3JpcHRpb24gPSB0aGlzLmRvY3VtZW50TWFuYWdlbWVudC51cGxvYWRGaWxlKGRvY3VtZW50VXBsb2FkKS5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiAocmVzdWx0RG9jdW1lbnQ6IERvY3VtZW50RGF0YSkgPT4gdGhpcy5oYW5kbGVEb2N1bWVudFVwbG9hZFJlc3VsdChyZXN1bHREb2N1bWVudCksXG4gICAgICAgIGVycm9yOiAoZXJyb3I6IEh0dHBFcnJvcikgPT4gdGhpcy5oYW5kbGVEb2N1bWVudFVwbG9hZEVycm9yKGVycm9yKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVzZXRVcGxvYWQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb3BlbkZpbGVEaWFsb2coKTogdm9pZCB7XG4gICAgdGhpcy5maWxlSW5wdXQubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICB9XG5cbiAgcHVibGljIGZpbGVTZWxlY3RFdmVudCgpOiB2b2lkIHtcbiAgICBpZiAoKHRoaXMuY2FzZUZpZWxkLnZhbHVlICYmIHRoaXMuY2FzZUZpZWxkLnZhbHVlLmRvY3VtZW50X2ZpbGVuYW1lKSB8fFxuICAgICAgKHRoaXMuc2VsZWN0ZWRGaWxlICYmIHRoaXMuc2VsZWN0ZWRGaWxlLm5hbWUpKSB7XG4gICAgICB0aGlzLm9wZW5EaWFsb2codGhpcy5kaWFsb2dDb25maWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW5GaWxlRGlhbG9nKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRyaWdnZXJSZXBsYWNlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbmZpcm1SZXBsYWNlUmVzdWx0ID09PSAnUmVwbGFjZScpIHtcbiAgICAgIHRoaXMub3BlbkZpbGVEaWFsb2coKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0VXBsb2FkZWRGaWxlTmFtZSgpOiBhbnkge1xuICAgIGlmICh0aGlzLnVwbG9hZGVkRG9jdW1lbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnVwbG9hZGVkRG9jdW1lbnQuZ2V0KFdyaXRlRG9jdW1lbnRGaWVsZENvbXBvbmVudC5ET0NVTUVOVF9GSUxFTkFNRSkudmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldFVwbG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkRmlsZSA9IG51bGw7XG4gICAgaWYgKHRoaXMuaXNBTWFuZGF0b3J5Q29tcG9uZW50KCkpIHtcbiAgICAgIHRoaXMudXBkYXRlRG9jdW1lbnRGb3JtKG51bGwsIG51bGwsIG51bGwpO1xuICAgICAgdGhpcy5kaXNwbGF5RmlsZVVwbG9hZE1lc3NhZ2VzKFdyaXRlRG9jdW1lbnRGaWVsZENvbXBvbmVudC5VUExPQURfRVJST1JfRklMRV9SRVFVSVJFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsaWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmlsZVZhbGlkYXRpb25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzQU1hbmRhdG9yeUNvbXBvbmVudCgpKSB7XG4gICAgICBpZiAodGhpcy5jbGlja0luc2lkZVRoZURvY3VtZW50ICYmIHRoaXMudmFsaWRhdGVGb3JtVXBsb2FkZWREb2N1bWVudCgpICYmICF0aGlzLmlzVXBMb2FkaW5nQUZpbGUoKSkge1xuICAgICAgICB0aGlzLmRpc3BsYXlGaWxlVXBsb2FkTWVzc2FnZXMoV3JpdGVEb2N1bWVudEZpZWxkQ29tcG9uZW50LlVQTE9BRF9FUlJPUl9GSUxFX1JFUVVJUkVEKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9wZW5EaWFsb2coZGlhbG9nQ29uZmlnKTogdm9pZCB7XG4gICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihEb2N1bWVudERpYWxvZ0NvbXBvbmVudCwgZGlhbG9nQ29uZmlnKTtcbiAgICB0aGlzLmRpYWxvZ1N1YnNjcmlwdGlvbiA9IGRpYWxvZ1JlZi5iZWZvcmVDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMuY29uZmlybVJlcGxhY2VSZXN1bHQgPSByZXN1bHQ7XG4gICAgICB0aGlzLnRyaWdnZXJSZXBsYWNlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvQ2FzZURldGFpbHMoKTogdm9pZCB7XG4gICAgdGhpcy5jYXNlRXZlbnRTdWJzY3JpcHRpb24gPSB0aGlzLmNhc2VOb3RpZmllci5jYXNlVmlldy5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKGNhc2VEZXRhaWxzKSA9PiB7XG4gICAgICAgIHRoaXMuY2FzZURldGFpbHMgPSBjYXNlRGV0YWlscztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNBTWFuZGF0b3J5Q29tcG9uZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNhc2VGaWVsZC5kaXNwbGF5X2NvbnRleHQgJiYgdGhpcy5jYXNlRmllbGQuZGlzcGxheV9jb250ZXh0ID09PSBDb25zdGFudHMuTUFOREFUT1JZO1xuICB9XG5cbiAgcHJpdmF0ZSBkaXNwbGF5RmlsZVVwbG9hZE1lc3NhZ2VzKGZpbGVVcGxvYWRNZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnZhbGlkID0gZmFsc2U7XG4gICAgdGhpcy5maWxlVXBsb2FkTWVzc2FnZXMgPSBmaWxlVXBsb2FkTWVzc2FnZTtcbiAgfVxuXG4gIHByaXZhdGUgaXNVcExvYWRpbmdBRmlsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5maWxlVXBsb2FkTWVzc2FnZXMgPT09IFdyaXRlRG9jdW1lbnRGaWVsZENvbXBvbmVudC5VUExPQURfV0FJVElOR19GSUxFX1NUQVRVUztcbiAgfVxuICBwcml2YXRlIHZhbGlkYXRlRm9ybVVwbG9hZGVkRG9jdW1lbnQoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLnVwbG9hZGVkRG9jdW1lbnQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGxldCB2YWxpZGF0aW9uID0gIXRoaXMudXBsb2FkZWREb2N1bWVudC5nZXQoV3JpdGVEb2N1bWVudEZpZWxkQ29tcG9uZW50LkRPQ1VNRU5UX1VSTCkudmFsaWQgJiZcbiAgICAgICF0aGlzLnVwbG9hZGVkRG9jdW1lbnQuZ2V0KFdyaXRlRG9jdW1lbnRGaWVsZENvbXBvbmVudC5ET0NVTUVOVF9CSU5BUllfVVJMKS52YWxpZCAmJlxuICAgICAgIXRoaXMudXBsb2FkZWREb2N1bWVudC5nZXQoV3JpdGVEb2N1bWVudEZpZWxkQ29tcG9uZW50LkRPQ1VNRU5UX0ZJTEVOQU1FKS52YWxpZDtcblxuICAgIGlmICh0aGlzLnNlY3VyZU1vZGVPbikge1xuICAgICAgdmFsaWRhdGlvbiA9IHZhbGlkYXRpb24gJiYgIXRoaXMudXBsb2FkZWREb2N1bWVudC5nZXQoV3JpdGVEb2N1bWVudEZpZWxkQ29tcG9uZW50LkRPQ1VNRU5UX0hBU0gpLnZhbGlkO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVEb2N1bWVudEZvcm0odXJsOiBzdHJpbmcsIGJpbmFyeVVybDogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nLCBkb2N1bWVudEhhc2g/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnVwbG9hZGVkRG9jdW1lbnQuZ2V0KFdyaXRlRG9jdW1lbnRGaWVsZENvbXBvbmVudC5ET0NVTUVOVF9VUkwpLnNldFZhbHVlKHVybCk7XG4gICAgdGhpcy51cGxvYWRlZERvY3VtZW50LmdldChXcml0ZURvY3VtZW50RmllbGRDb21wb25lbnQuRE9DVU1FTlRfQklOQVJZX1VSTCkuc2V0VmFsdWUoYmluYXJ5VXJsKTtcbiAgICB0aGlzLnVwbG9hZGVkRG9jdW1lbnQuZ2V0KFdyaXRlRG9jdW1lbnRGaWVsZENvbXBvbmVudC5ET0NVTUVOVF9GSUxFTkFNRSkuc2V0VmFsdWUoZmlsZW5hbWUpO1xuICAgIGlmIChkb2N1bWVudEhhc2gpIHtcbiAgICAgIHRoaXMudXBsb2FkZWREb2N1bWVudC5nZXQoV3JpdGVEb2N1bWVudEZpZWxkQ29tcG9uZW50LkRPQ1VNRU5UX0hBU0gpLnNldFZhbHVlKGRvY3VtZW50SGFzaCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVEb2N1bWVudEZvcm1XaXRoVmFsaWRhdG9yKGRvY3VtZW50OiBGb3JtRG9jdW1lbnQpOiB2b2lkIHtcbiAgICBsZXQgZG9jdW1lbnRGb3JtR3JvdXAgPSB7XG4gICAgICBkb2N1bWVudF91cmw6IG5ldyBGb3JtQ29udHJvbChkb2N1bWVudC5kb2N1bWVudF91cmwsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgZG9jdW1lbnRfYmluYXJ5X3VybDogbmV3IEZvcm1Db250cm9sKGRvY3VtZW50LmRvY3VtZW50X2JpbmFyeV91cmwsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgZG9jdW1lbnRfZmlsZW5hbWU6IG5ldyBGb3JtQ29udHJvbChkb2N1bWVudC5kb2N1bWVudF9maWxlbmFtZSwgVmFsaWRhdG9ycy5yZXF1aXJlZClcbiAgICB9O1xuXG4gICAgZG9jdW1lbnRGb3JtR3JvdXAgPSB0aGlzLnNlY3VyZU1vZGVPbiA/IHtcbiAgICAgIC4uLmRvY3VtZW50Rm9ybUdyb3VwLFxuICAgICAgLi4ueyBkb2N1bWVudF9oYXNoOiBuZXcgRm9ybUNvbnRyb2woZG9jdW1lbnQuZG9jdW1lbnRfaGFzaCkgfVxuICAgIH0gOiBkb2N1bWVudEZvcm1Hcm91cDtcblxuICAgIHRoaXMudXBsb2FkZWREb2N1bWVudCA9IHRoaXMucmVnaXN0ZXJDb250cm9sKG5ldyBVbnR5cGVkRm9ybUdyb3VwKGRvY3VtZW50Rm9ybUdyb3VwKSwgdHJ1ZSkgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRG9jdW1lbnRGb3JtKGRvY3VtZW50OiBGb3JtRG9jdW1lbnQpOiB2b2lkIHtcbiAgICBsZXQgZG9jdW1lbnRGb3JtR3JvdXAgPSB7XG4gICAgICBkb2N1bWVudF91cmw6IG5ldyBGb3JtQ29udHJvbChkb2N1bWVudC5kb2N1bWVudF91cmwpLFxuICAgICAgZG9jdW1lbnRfYmluYXJ5X3VybDogbmV3IEZvcm1Db250cm9sKGRvY3VtZW50LmRvY3VtZW50X2JpbmFyeV91cmwpLFxuICAgICAgZG9jdW1lbnRfZmlsZW5hbWU6IG5ldyBGb3JtQ29udHJvbChkb2N1bWVudC5kb2N1bWVudF9maWxlbmFtZSlcbiAgICB9O1xuXG4gICAgZG9jdW1lbnRGb3JtR3JvdXAgPSB0aGlzLnNlY3VyZU1vZGVPbiA/IHtcbiAgICAgIC4uLmRvY3VtZW50Rm9ybUdyb3VwLFxuICAgICAgLi4ueyBkb2N1bWVudF9oYXNoOiBuZXcgRm9ybUNvbnRyb2woZG9jdW1lbnQuZG9jdW1lbnRfaGFzaCkgfVxuICAgIH0gOiBkb2N1bWVudEZvcm1Hcm91cDtcblxuICAgIHRoaXMudXBsb2FkZWREb2N1bWVudCA9IHRoaXMucmVnaXN0ZXJDb250cm9sKG5ldyBVbnR5cGVkRm9ybUdyb3VwKGRvY3VtZW50Rm9ybUdyb3VwKSwgdHJ1ZSkgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RXJyb3JNZXNzYWdlKGVycm9yOiBIdHRwRXJyb3IpOiBzdHJpbmcge1xuICAgIC8vIERvY3VtZW50IE1hbmFnZW1lbnQgdW5hdmFpbGFibGVcbiAgICBpZiAoMCA9PT0gZXJyb3Iuc3RhdHVzIHx8IDUwMiA9PT0gZXJyb3Iuc3RhdHVzKSB7XG4gICAgICByZXR1cm4gV3JpdGVEb2N1bWVudEZpZWxkQ29tcG9uZW50LlVQTE9BRF9FUlJPUl9OT1RfQVZBSUxBQkxFO1xuICAgIH1cbiAgICByZXR1cm4gZXJyb3IuZXJyb3I7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkRG9jdW1lbnRVcGxvYWREYXRhKHNlbGVjdGVkRmlsZTogRmlsZSk6IEZvcm1EYXRhIHtcbiAgICBjb25zdCBkb2N1bWVudFVwbG9hZDogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBkb2N1bWVudFVwbG9hZC5hcHBlbmQoJ2ZpbGVzJywgc2VsZWN0ZWRGaWxlLCBzZWxlY3RlZEZpbGUubmFtZSk7XG4gICAgZG9jdW1lbnRVcGxvYWQuYXBwZW5kKCdjbGFzc2lmaWNhdGlvbicsICdQVUJMSUMnKTtcblxuICAgIGlmICh0aGlzLmFwcENvbmZpZy5nZXREb2N1bWVudFNlY3VyZU1vZGUoKSkge1xuICAgICAgY29uc3QgY2FzZVR5cGVJZCA9IHRoaXMuY2FzZURldGFpbHMgJiZcbiAgICAgICAgdGhpcy5jYXNlRGV0YWlscy5jYXNlX3R5cGUgJiZcbiAgICAgICAgdGhpcy5jYXNlRGV0YWlscy5jYXNlX3R5cGUuaWQgPyB0aGlzLmNhc2VEZXRhaWxzLmNhc2VfdHlwZS5pZCA6IG51bGw7XG4gICAgICBjb25zdCBjYXNlVHlwZUp1cmlzZGljdGlvbklkID0gdGhpcy5jYXNlRGV0YWlscyAmJlxuICAgICAgICB0aGlzLmNhc2VEZXRhaWxzLmNhc2VfdHlwZSAmJlxuICAgICAgICB0aGlzLmNhc2VEZXRhaWxzLmNhc2VfdHlwZS5qdXJpc2RpY3Rpb24gJiZcbiAgICAgICAgdGhpcy5jYXNlRGV0YWlscy5jYXNlX3R5cGUuanVyaXNkaWN0aW9uLmlkID8gdGhpcy5jYXNlRGV0YWlscy5jYXNlX3R5cGUuanVyaXNkaWN0aW9uLmlkIDogbnVsbDtcbiAgICAgIGRvY3VtZW50VXBsb2FkLmFwcGVuZCgnY2FzZVR5cGVJZCcsIGNhc2VUeXBlSWQpO1xuICAgICAgZG9jdW1lbnRVcGxvYWQuYXBwZW5kKCdqdXJpc2RpY3Rpb25JZCcsIGNhc2VUeXBlSnVyaXNkaWN0aW9uSWQpO1xuICAgIH1cblxuICAgIHJldHVybiBkb2N1bWVudFVwbG9hZDtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRG9jdW1lbnRVcGxvYWRSZXN1bHQocmVzdWx0OiBEb2N1bWVudERhdGEpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudXBsb2FkZWREb2N1bWVudCkge1xuICAgICAgaWYgKHRoaXMuc2VjdXJlTW9kZU9uKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRG9jdW1lbnRGb3JtKHsgZG9jdW1lbnRfdXJsOiBudWxsLCBkb2N1bWVudF9iaW5hcnlfdXJsOiBudWxsLCBkb2N1bWVudF9maWxlbmFtZTogbnVsbCwgZG9jdW1lbnRfaGFzaDogbnVsbCB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRG9jdW1lbnRGb3JtKHsgZG9jdW1lbnRfdXJsOiBudWxsLCBkb2N1bWVudF9iaW5hcnlfdXJsOiBudWxsLCBkb2N1bWVudF9maWxlbmFtZTogbnVsbCB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkb2N1bWVudCA9IHRoaXMuc2VjdXJlTW9kZU9uID8gcmVzdWx0LmRvY3VtZW50c1swXSA6IHJlc3VsdC5fZW1iZWRkZWQuZG9jdW1lbnRzWzBdO1xuXG4gICAgaWYgKHRoaXMuc2VjdXJlTW9kZU9uKSB7XG4gICAgICB0aGlzLnVwZGF0ZURvY3VtZW50Rm9ybShcbiAgICAgICAgZG9jdW1lbnQuX2xpbmtzLnNlbGYuaHJlZixcbiAgICAgICAgZG9jdW1lbnQuX2xpbmtzLmJpbmFyeS5ocmVmLFxuICAgICAgICBkb2N1bWVudC5vcmlnaW5hbERvY3VtZW50TmFtZSxcbiAgICAgICAgZG9jdW1lbnQuaGFzaFRva2VuXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZURvY3VtZW50Rm9ybShcbiAgICAgICAgZG9jdW1lbnQuX2xpbmtzLnNlbGYuaHJlZixcbiAgICAgICAgZG9jdW1lbnQuX2xpbmtzLmJpbmFyeS5ocmVmLFxuICAgICAgICBkb2N1bWVudC5vcmlnaW5hbERvY3VtZW50TmFtZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy52YWxpZCA9IHRydWU7XG4gICAgdGhpcy5maWxlVXBsb2FkU3RhdGVTZXJ2aWNlLnNldFVwbG9hZEluUHJvZ3Jlc3MoZmFsc2UpO1xuXG4gICAgLy8gcmVmcmVzaCByZXBsYWNlZCBkb2N1bWVudCBpbmZvXG4gICAgaWYgKHRoaXMuY2FzZUZpZWxkLnZhbHVlKSB7XG4gICAgICB0aGlzLmNhc2VGaWVsZC52YWx1ZS5kb2N1bWVudF9iaW5hcnlfdXJsID0gZG9jdW1lbnQuX2xpbmtzLmJpbmFyeS5ocmVmO1xuICAgICAgdGhpcy5jYXNlRmllbGQudmFsdWUuZG9jdW1lbnRfZmlsZW5hbWUgPSBkb2N1bWVudC5vcmlnaW5hbERvY3VtZW50TmFtZTtcbiAgICAgIHRoaXMuY2FzZUZpZWxkLnZhbHVlLmRvY3VtZW50X3VybCA9IGRvY3VtZW50Ll9saW5rcy5zZWxmLmhyZWY7XG5cbiAgICAgIGlmICh0aGlzLnNlY3VyZU1vZGVPbikge1xuICAgICAgICB0aGlzLmNhc2VGaWVsZC52YWx1ZS5kb2N1bWVudF9oYXNoID0gZG9jdW1lbnQuaGFzaFRva2VuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRG9jdW1lbnRVcGxvYWRFcnJvcihlcnJvcjogSHR0cEVycm9yKTogdm9pZCB7XG4gICAgdGhpcy5maWxlVXBsb2FkTWVzc2FnZXMgPSB0aGlzLmdldEVycm9yTWVzc2FnZShlcnJvcik7XG4gICAgdGhpcy52YWxpZCA9IGZhbHNlO1xuICAgIHRoaXMuZmlsZVVwbG9hZFN0YXRlU2VydmljZS5zZXRVcGxvYWRJblByb2dyZXNzKGZhbHNlKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBbbmdDbGFzc109XCJ7J2Zvcm0tZ3JvdXAtZXJyb3IgYm90dG9tLTMwJzogIXZhbGlkfVwiPlxuICA8bGFiZWwgW2Zvcl09XCJpZCgpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJmb3JtLWxhYmVsXCIgYXR0ci5hcmlhLWxhYmVsPVwie3tjYXNlRmllbGQgfCBjY2RGaWVsZExhYmVsfX1cIj57eyhjYXNlRmllbGQgfCBjY2RGaWVsZExhYmVsKSB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8L2xhYmVsPlxuICA8c3BhbiBjbGFzcz1cImZvcm0taGludFwiICpuZ0lmPVwiY2FzZUZpZWxkLmhpbnRfdGV4dFwiPnt7Y2FzZUZpZWxkLmhpbnRfdGV4dCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImZpbGVVcGxvYWRNZXNzYWdlcyAmJiAhdmFsaWRcIj57e2ZpbGVVcGxvYWRNZXNzYWdlcyB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuXG4gIDxkaXY+XG4gICAgPCEtLTxzcGFuICpuZ0lmPVwiZ2V0VXBsb2FkZWRGaWxlTmFtZSgpXCIgY2xhc3M9XCJ0ZXh0LTE2XCI+RmlsZSBuYW1lOiB7e2dldFVwbG9hZGVkRmlsZU5hbWUoKX19PC9zcGFuPi0tPlxuICAgIDxjY2QtcmVhZC1kb2N1bWVudC1maWVsZCAqbmdJZj1cImNhc2VGaWVsZFwiIFtjYXNlRmllbGRdPVwiY2FzZUZpZWxkXCI+PC9jY2QtcmVhZC1kb2N1bWVudC1maWVsZD5cbiAgPC9kaXY+XG5cbiAgPGRpdiBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmUnPlxuXG4gICAgPGRpdiBbaWRdPVwiY3JlYXRlRWxlbWVudElkKCdmaWxlSW5wdXRXcmFwcGVyJylcIiAoY2xpY2spPVwiZmlsZVNlbGVjdEV2ZW50KClcIj48L2Rpdj5cbiAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYm90dG9tLTMwXCIgW2lkXT1cImlkKClcIiB0eXBlPVwiZmlsZVwiIChrZXlkb3duLlRhYik9XCJmaWxlVmFsaWRhdGlvbnNPblRhYigpXCIgKGNoYW5nZSk9XCJmaWxlQ2hhbmdlRXZlbnQoJGV2ZW50KVwiXG4gICAgICAgICAgIGFjY2VwdD1cInt7Y2FzZUZpZWxkLmZpZWxkX3R5cGUucmVndWxhcl9leHByZXNzaW9ufX1cIiAjZmlsZUlucHV0Lz5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJvdHRvbS0zMFwiPlxuICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1zZWNvbmRhcnlcIiB0eXBlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cIkNhbmNlbCB1cGxvYWRcIiAoY2xpY2spPVwiY2FuY2VsVXBsb2FkKClcIiBbZGlzYWJsZWRdPVwiIWlzVXBsb2FkSW5Qcm9ncmVzcygpXCI+e3snQ2FuY2VsIHVwbG9hZCcgfCBycHhUcmFuc2xhdGV9fTwvYnV0dG9uPlxuPC9kaXY+XG4iXX0=