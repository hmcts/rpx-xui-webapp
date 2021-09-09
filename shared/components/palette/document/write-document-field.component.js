"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var app_config_1 = require("../../../../app.config");
var constants_1 = require("../../../commons/constants");
var document_management_service_1 = require("../../../services/document-management/document-management.service");
var case_notifier_1 = require("../../case-editor/services/case.notifier");
var document_dialog_component_1 = require("../../dialogs/document-dialog/document-dialog.component");
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var file_upload_state_service_1 = require("./file-upload-state.service");
var WriteDocumentFieldComponent = /** @class */ (function (_super) {
    __extends(WriteDocumentFieldComponent, _super);
    function WriteDocumentFieldComponent(appConfig, caseNotifier, documentManagement, dialog, fileUploadStateService) {
        var _this = _super.call(this) || this;
        _this.appConfig = appConfig;
        _this.caseNotifier = caseNotifier;
        _this.documentManagement = documentManagement;
        _this.dialog = dialog;
        _this.fileUploadStateService = fileUploadStateService;
        _this.valid = true;
        return _this;
    }
    WriteDocumentFieldComponent_1 = WriteDocumentFieldComponent;
    WriteDocumentFieldComponent.prototype.clickout = function (event) {
        // Capturing the event of of the associated  ElementRef <input type="file" #fileInpu
        if (this.fileInput.nativeElement.contains(event.target)) {
            this.clickInsideTheDocument = true;
        }
        else {
            this.fileValidations();
        }
    };
    WriteDocumentFieldComponent.prototype.ngOnInit = function () {
        this.secureModeOn = this.appConfig.getDocumentSecureMode();
        this.initDialog();
        // EUI-3403. The field was not being registered when there was no value and the field
        // itself was not mandatory, which meant that show_conditions would not be evaluated.
        // I've cleaned up the logic and it's now always registered.
        var document = this.caseField.value || { document_url: null, document_binary_url: null, document_filename: null };
        document = this.secureModeOn && !document.document_hash ? __assign({}, document, { document_hash: null }) : document;
        if (this.isAMandatoryComponent()) {
            this.createDocumentFormWithValidator(document);
        }
        else {
            this.createDocumentForm(document);
        }
        if (this.appConfig.getDocumentSecureMode()) {
            this.subscribeToCaseDetails();
        }
    };
    WriteDocumentFieldComponent.prototype.ngOnDestroy = function () {
        if (this.fileUploadSubscription) {
            this.fileUploadSubscription.unsubscribe();
        }
        if (this.dialogSubscription) {
            this.dialogSubscription.unsubscribe();
        }
        if (this.caseEventSubscription) {
            this.caseEventSubscription.unsubscribe();
        }
    };
    WriteDocumentFieldComponent.prototype.isUploadInProgress = function () {
        return this.fileUploadStateService.isUploadInProgress();
    };
    WriteDocumentFieldComponent.prototype.cancelUpload = function () {
        if (this.fileUploadSubscription) {
            this.fileUploadSubscription.unsubscribe();
        }
        this.fileUploadStateService.setUploadInProgress(false);
        this.fileInput.nativeElement.value = '';
        this.resetUpload();
    };
    WriteDocumentFieldComponent.prototype.resetUpload = function () {
        this.selectedFile = null;
        if (this.isAMandatoryComponent()) {
            this.updateDocumentForm(null, null, null);
            this.displayFileUploadMessages(WriteDocumentFieldComponent_1.UPLOAD_ERROR_FILE_REQUIRED);
        }
        else {
            this.valid = true;
        }
    };
    WriteDocumentFieldComponent.prototype.fileValidations = function () {
        if (this.isAMandatoryComponent()) {
            if (this.clickInsideTheDocument && this.validateFormUploadedDocument() && !this.isUpLoadingAFile()) {
                this.displayFileUploadMessages(WriteDocumentFieldComponent_1.UPLOAD_ERROR_FILE_REQUIRED);
            }
        }
    };
    WriteDocumentFieldComponent.prototype.fileValidationsOnTab = function () {
        if (this.isAMandatoryComponent()) {
            if (this.validateFormUploadedDocument()) {
                this.displayFileUploadMessages(WriteDocumentFieldComponent_1.UPLOAD_ERROR_FILE_REQUIRED);
            }
        }
    };
    WriteDocumentFieldComponent.prototype.fileChangeEvent = function (fileInput) {
        var _this = this;
        if (fileInput.target.files[0]) {
            this.selectedFile = fileInput.target.files[0];
            this.displayFileUploadMessages(WriteDocumentFieldComponent_1.UPLOAD_WAITING_FILE_STATUS);
            var documentUpload = this.buildDocumentUploadData(this.selectedFile);
            this.fileUploadStateService.setUploadInProgress(true);
            var uploadFile = this.secureModeOn ?
                this.documentManagement.secureUploadFile(documentUpload) :
                this.documentManagement.uploadFile(documentUpload);
            this.fileUploadSubscription = uploadFile.subscribe({
                next: function (resultDocument) { return _this.handleDocumentUploadResult(resultDocument); },
                error: function (error) { return _this.handleDocumentUploadError(error); }
            });
        }
        else {
            this.resetUpload();
        }
    };
    WriteDocumentFieldComponent.prototype.openFileDialog = function () {
        this.fileInput.nativeElement.click();
    };
    WriteDocumentFieldComponent.prototype.fileSelectEvent = function () {
        if ((this.caseField.value && this.caseField.value.document_filename) ||
            (this.selectedFile && this.selectedFile.name)) {
            this.openDialog(this.dialogConfig);
        }
        else {
            this.openFileDialog();
        }
    };
    WriteDocumentFieldComponent.prototype.openDialog = function (dialogConfig) {
        var _this = this;
        var dialogRef = this.dialog.open(document_dialog_component_1.DocumentDialogComponent, dialogConfig);
        this.dialogSubscription = dialogRef.beforeClosed().subscribe(function (result) {
            _this.confirmReplaceResult = result;
            _this.triggerReplace();
        });
    };
    WriteDocumentFieldComponent.prototype.triggerReplace = function () {
        if (this.confirmReplaceResult === 'Replace') {
            this.openFileDialog();
        }
    };
    WriteDocumentFieldComponent.prototype.getUploadedFileName = function () {
        if (this.uploadedDocument) {
            return this.uploadedDocument.get(WriteDocumentFieldComponent_1.DOCUMENT_FILENAME).value;
        }
        else {
            return undefined;
        }
    };
    WriteDocumentFieldComponent.prototype.initDialog = function () {
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
    WriteDocumentFieldComponent.prototype.subscribeToCaseDetails = function () {
        var _this = this;
        this.caseEventSubscription = this.caseNotifier.caseView.subscribe({
            next: function (caseDetails) {
                _this.caseDetails = caseDetails;
            }
        });
    };
    WriteDocumentFieldComponent.prototype.isAMandatoryComponent = function () {
        return this.caseField.display_context && this.caseField.display_context === constants_1.Constants.MANDATORY;
    };
    WriteDocumentFieldComponent.prototype.displayFileUploadMessages = function (fileUploadMessage) {
        this.valid = false;
        this.fileUploadMessages = fileUploadMessage;
    };
    WriteDocumentFieldComponent.prototype.isUpLoadingAFile = function () {
        return this.fileUploadMessages === WriteDocumentFieldComponent_1.UPLOAD_WAITING_FILE_STATUS;
    };
    WriteDocumentFieldComponent.prototype.validateFormUploadedDocument = function () {
        if (!this.uploadedDocument) {
            return true;
        }
        var validation = !this.uploadedDocument.get(WriteDocumentFieldComponent_1.DOCUMENT_URL).valid &&
            !this.uploadedDocument.get(WriteDocumentFieldComponent_1.DOCUMENT_BINARY_URL).valid &&
            !this.uploadedDocument.get(WriteDocumentFieldComponent_1.DOCUMENT_FILENAME).valid;
        if (this.secureModeOn) {
            validation = validation && !this.uploadedDocument.get(WriteDocumentFieldComponent_1.DOCUMENT_HASH).valid;
        }
        return validation;
    };
    WriteDocumentFieldComponent.prototype.updateDocumentForm = function (url, binaryUrl, filename, documentHash) {
        this.uploadedDocument.get(WriteDocumentFieldComponent_1.DOCUMENT_URL).setValue(url);
        this.uploadedDocument.get(WriteDocumentFieldComponent_1.DOCUMENT_BINARY_URL).setValue(binaryUrl);
        this.uploadedDocument.get(WriteDocumentFieldComponent_1.DOCUMENT_FILENAME).setValue(filename);
        if (documentHash) {
            this.uploadedDocument.get(WriteDocumentFieldComponent_1.DOCUMENT_HASH).setValue(documentHash);
        }
    };
    WriteDocumentFieldComponent.prototype.createDocumentFormWithValidator = function (document) {
        var documentFormGroup = {
            document_url: new forms_1.FormControl(document.document_url, forms_1.Validators.required),
            document_binary_url: new forms_1.FormControl(document.document_binary_url, forms_1.Validators.required),
            document_filename: new forms_1.FormControl(document.document_filename, forms_1.Validators.required)
        };
        documentFormGroup = this.secureModeOn ? __assign({}, documentFormGroup, { document_hash: new forms_1.FormControl(document.document_hash, forms_1.Validators.required) }) : documentFormGroup;
        this.uploadedDocument = this.registerControl(new forms_1.FormGroup(documentFormGroup), true);
    };
    WriteDocumentFieldComponent.prototype.createDocumentForm = function (document) {
        var documentFormGroup = {
            document_url: new forms_1.FormControl(document.document_url),
            document_binary_url: new forms_1.FormControl(document.document_binary_url),
            document_filename: new forms_1.FormControl(document.document_filename)
        };
        documentFormGroup = this.secureModeOn ? __assign({}, documentFormGroup, { document_hash: new forms_1.FormControl(document.document_hash) }) : documentFormGroup;
        this.uploadedDocument = this.registerControl(new forms_1.FormGroup(documentFormGroup), true);
    };
    WriteDocumentFieldComponent.prototype.getErrorMessage = function (error) {
        // Document Management unavailable
        if (0 === error.status || 502 === error.status) {
            return WriteDocumentFieldComponent_1.UPLOAD_ERROR_NOT_AVAILABLE;
        }
        return error.error;
    };
    WriteDocumentFieldComponent.prototype.buildDocumentUploadData = function (selectedFile) {
        var documentUpload = new FormData();
        documentUpload.append('files', selectedFile, selectedFile.name);
        documentUpload.append('classification', 'PUBLIC');
        if (this.appConfig.getDocumentSecureMode()) {
            var caseTypeId = this.caseDetails &&
                this.caseDetails.case_type &&
                this.caseDetails.case_type.id ? this.caseDetails.case_type.id : null;
            var caseTypeJurisdictionId = this.caseDetails &&
                this.caseDetails.case_type &&
                this.caseDetails.case_type.jurisdiction &&
                this.caseDetails.case_type.jurisdiction.id ? this.caseDetails.case_type.jurisdiction.id : null;
            documentUpload.append('caseTypeId', caseTypeId);
            documentUpload.append('jurisdictionId', caseTypeJurisdictionId);
        }
        return documentUpload;
    };
    WriteDocumentFieldComponent.prototype.handleDocumentUploadResult = function (result) {
        if (!this.uploadedDocument) {
            if (this.secureModeOn) {
                this.createDocumentForm({ document_url: null, document_binary_url: null, document_filename: null, document_hash: null });
            }
            else {
                this.createDocumentForm({ document_url: null, document_binary_url: null, document_filename: null });
            }
        }
        var document = this.secureModeOn ? result.documents[0] : result._embedded.documents[0];
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
    };
    WriteDocumentFieldComponent.prototype.handleDocumentUploadError = function (error) {
        this.fileUploadMessages = this.getErrorMessage(error);
        this.valid = false;
        this.fileUploadStateService.setUploadInProgress(false);
    };
    var WriteDocumentFieldComponent_1;
    WriteDocumentFieldComponent.DOCUMENT_URL = 'document_url';
    WriteDocumentFieldComponent.DOCUMENT_BINARY_URL = 'document_binary_url';
    WriteDocumentFieldComponent.DOCUMENT_FILENAME = 'document_filename';
    WriteDocumentFieldComponent.DOCUMENT_HASH = 'document_hash';
    WriteDocumentFieldComponent.UPLOAD_ERROR_FILE_REQUIRED = 'File required';
    WriteDocumentFieldComponent.UPLOAD_ERROR_NOT_AVAILABLE = 'Document upload facility is not available at the moment';
    WriteDocumentFieldComponent.UPLOAD_WAITING_FILE_STATUS = 'Uploading...';
    __decorate([
        core_1.ViewChild('fileInput'),
        __metadata("design:type", core_1.ElementRef)
    ], WriteDocumentFieldComponent.prototype, "fileInput", void 0);
    __decorate([
        core_1.HostListener('document:click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], WriteDocumentFieldComponent.prototype, "clickout", null);
    WriteDocumentFieldComponent = WriteDocumentFieldComponent_1 = __decorate([
        core_1.Component({
            selector: 'ccd-write-document-field',
            template: "\n    <div class=\"form-group\" [ngClass]=\"{'form-group-error bottom-30': !valid}\">\n      <label [for]=\"id()\">\n        <span class=\"form-label\" attr.aria-label=\"{{caseField | ccdFieldLabel}}\">{{caseField | ccdFieldLabel}}</span>\n      </label>\n      <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text}}</span>\n      <span class=\"error-message\" *ngIf=\"fileUploadMessages && !valid\">{{fileUploadMessages}}</span>\n\n      <div>\n        <!--<span *ngIf=\"getUploadedFileName()\" class=\"text-16\">File name: {{getUploadedFileName()}}</span>-->\n        <ccd-read-document-field *ngIf=\"caseField\" [caseField]=\"caseField\"></ccd-read-document-field>\n      </div>\n\n      <div style='position:relative'>\n\n        <div [id]=\"createElementId('fileInputWrapper')\" (click)=\"fileSelectEvent()\"></div>\n        <input class=\"form-control bottom-30\" [id]=\"id()\" type=\"file\" (keydown.Tab)=\"fileValidationsOnTab()\" (change)=\"fileChangeEvent($event)\"\n               accept=\"{{caseField.field_type.regular_expression}}\" #fileInput/>\n      </div>\n    </div>\n    <div class=\"form-group bottom-30\">\n      <button class=\"button button-secondary\" type=\"button\" aria-label=\"Cancel upload\" (click)=\"cancelUpload()\" [disabled]=\"!isUploadInProgress()\">Cancel upload</button>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [app_config_1.AbstractAppConfig,
            case_notifier_1.CaseNotifier,
            document_management_service_1.DocumentManagementService,
            material_1.MatDialog,
            file_upload_state_service_1.FileUploadStateService])
    ], WriteDocumentFieldComponent);
    return WriteDocumentFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteDocumentFieldComponent = WriteDocumentFieldComponent;
//# sourceMappingURL=write-document-field.component.js.map