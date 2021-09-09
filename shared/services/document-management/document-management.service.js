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
var http_1 = require("../http");
var app_config_1 = require("../../../app.config");
var operators_1 = require("rxjs/internal/operators");
var http_2 = require("@angular/common/http");
var DocumentManagementService = /** @class */ (function () {
    function DocumentManagementService(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    DocumentManagementService_1 = DocumentManagementService;
    DocumentManagementService.prototype.uploadFile = function (formData) {
        var url = this.appConfig.getDocumentManagementUrl();
        // Do not set any headers, such as "Accept" or "Content-Type", with null values; this is not permitted with the
        // Angular HttpClient in @angular/common/http. Just create and pass a new HttpHeaders object. Angular will add the
        // correct headers and values automatically
        var headers = new http_2.HttpHeaders();
        return this.http
            .post(url, formData, { headers: headers, observe: 'body' })
            .pipe(operators_1.delay(DocumentManagementService_1.RESPONSE_DELAY))
            .pipe();
    };
    DocumentManagementService.prototype.secureUploadFile = function (formData) {
        var url = this.appConfig.getDocumentManagementUrlV2();
        var headers = new http_2.HttpHeaders();
        return this.http
            .post(url, formData, { headers: headers, observe: 'body' })
            .pipe(operators_1.delay(DocumentManagementService_1.RESPONSE_DELAY))
            .pipe();
    };
    DocumentManagementService.prototype.getMediaViewerInfo = function (documentFieldValue) {
        var mediaViewerInfo = {
            document_binary_url: this.transformDocumentUrl(documentFieldValue.document_binary_url),
            document_filename: documentFieldValue.document_filename,
            content_type: this.getContentType(documentFieldValue),
            annotation_api_url: this.appConfig.getAnnotationApiUrl(),
            case_id: documentFieldValue.id,
            case_jurisdiction: documentFieldValue.jurisdiction
        };
        return JSON.stringify(mediaViewerInfo);
    };
    DocumentManagementService.prototype.getContentType = function (documentFieldValue) {
        var fileExtension = '<unknown>';
        if (documentFieldValue.document_filename) {
            var position = documentFieldValue.document_filename.lastIndexOf('.');
            if (position === documentFieldValue.document_filename.length) {
                fileExtension = '';
            }
            else if (position >= 0) {
                fileExtension = documentFieldValue.document_filename.slice(position + 1);
            }
        }
        if (this.isImage(fileExtension)) {
            return DocumentManagementService_1.IMAGE;
        }
        else if (this.isWord(fileExtension)) {
            return DocumentManagementService_1.WORD;
        }
        else if (this.isExcel(fileExtension)) {
            return DocumentManagementService_1.EXCEL;
        }
        else if (this.isPowerpoint(fileExtension)) {
            return DocumentManagementService_1.POWERPOINT;
        }
        else if (fileExtension.toLowerCase() === 'txt') {
            return DocumentManagementService_1.TXT;
        }
        else if (fileExtension.toLowerCase() === 'rtf') {
            return DocumentManagementService_1.RTF;
        }
        else if (fileExtension.toLowerCase() === 'pdf') {
            return DocumentManagementService_1.PDF;
        }
        else {
            return fileExtension;
        }
    };
    DocumentManagementService.prototype.isImage = function (imageType) {
        return DocumentManagementService_1.imagesList.find(function (e) { return e === imageType; }) !== undefined;
    };
    DocumentManagementService.prototype.isWord = function (wordType) {
        return DocumentManagementService_1.wordList.find(function (e) { return e === wordType; }) !== undefined;
    };
    DocumentManagementService.prototype.isExcel = function (excelType) {
        return DocumentManagementService_1.excelList.find(function (e) { return e === excelType; }) !== undefined;
    };
    DocumentManagementService.prototype.isPowerpoint = function (powerpointType) {
        return DocumentManagementService_1.powerpointList.find(function (e) { return e === powerpointType; }) !== undefined;
    };
    DocumentManagementService.prototype.transformDocumentUrl = function (documentBinaryUrl) {
        var remoteHrsPattern = new RegExp(this.appConfig.getRemoteHrsUrl());
        documentBinaryUrl = documentBinaryUrl.replace(remoteHrsPattern, this.appConfig.getHrsUrl());
        var remoteDocumentManagementPattern = new RegExp(this.appConfig.getRemoteDocumentManagementUrl());
        return documentBinaryUrl.replace(remoteDocumentManagementPattern, this.appConfig.getDocumentManagementUrl());
    };
    var DocumentManagementService_1;
    DocumentManagementService.PDF = 'pdf';
    DocumentManagementService.IMAGE = 'image';
    DocumentManagementService.WORD = 'word';
    DocumentManagementService.EXCEL = 'excel';
    DocumentManagementService.POWERPOINT = 'powerpoint';
    DocumentManagementService.TXT = 'txt';
    DocumentManagementService.RTF = 'rtf';
    // This delay has been added to give enough time to the user on the UI to see the info messages on the document upload
    // field for cases when uploads are very fast.
    DocumentManagementService.RESPONSE_DELAY = 1000;
    DocumentManagementService.imagesList = ['GIF', 'JPG', 'JPEG', 'PNG', 'gif', 'jpg', 'jpeg', 'png'];
    DocumentManagementService.wordList = ['DOC', 'DOCX', 'doc', 'docx'];
    DocumentManagementService.excelList = ['XLS', 'XLSX', 'xls', 'xlsx'];
    DocumentManagementService.powerpointList = ['PPT', 'PPTX', 'ppt', 'pptx'];
    DocumentManagementService = DocumentManagementService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpService, app_config_1.AbstractAppConfig])
    ], DocumentManagementService);
    return DocumentManagementService;
}());
exports.DocumentManagementService = DocumentManagementService;
//# sourceMappingURL=document-management.service.js.map