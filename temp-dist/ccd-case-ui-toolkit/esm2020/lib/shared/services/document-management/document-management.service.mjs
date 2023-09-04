import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { AbstractAppConfig } from '../../../app.config';
import { HttpService } from '../http';
import * as i0 from "@angular/core";
import * as i1 from "../http";
import * as i2 from "../../../app.config";
export class DocumentManagementService {
    constructor(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    uploadFile(formData) {
        const url = this.getDocStoreUrl();
        // Do not set any headers, such as "Accept" or "Content-Type", with null values; this is not permitted with the
        // Angular HttpClient in @angular/common/http. Just create and pass a new HttpHeaders object. Angular will add the
        // correct headers and values automatically
        const headers = new HttpHeaders();
        return this.http
            .post(url, formData, { headers, observe: 'body' })
            .pipe(delay(DocumentManagementService.RESPONSE_DELAY));
    }
    getMediaViewerInfo(documentFieldValue) {
        const mediaViewerInfo = {
            document_binary_url: this.transformDocumentUrl(documentFieldValue.document_binary_url),
            document_filename: documentFieldValue.document_filename,
            content_type: this.getContentType(documentFieldValue),
            annotation_api_url: this.appConfig.getAnnotationApiUrl(),
            case_id: documentFieldValue.id,
            case_jurisdiction: documentFieldValue.jurisdiction
        };
        return JSON.stringify(mediaViewerInfo);
    }
    getContentType(documentFieldValue) {
        let fileExtension = '<unknown>';
        if (documentFieldValue.document_filename) {
            const position = documentFieldValue.document_filename.lastIndexOf('.');
            if (position === documentFieldValue.document_filename.length) {
                fileExtension = '';
            }
            else if (position >= 0) {
                fileExtension = documentFieldValue.document_filename.slice(position + 1);
            }
        }
        if (this.isImage(fileExtension)) {
            return DocumentManagementService.IMAGE;
        }
        else if (this.isWord(fileExtension)) {
            return DocumentManagementService.WORD;
        }
        else if (this.isExcel(fileExtension)) {
            return DocumentManagementService.EXCEL;
        }
        else if (this.isPowerpoint(fileExtension)) {
            return DocumentManagementService.POWERPOINT;
        }
        else if (fileExtension.toLowerCase() === 'txt') {
            return DocumentManagementService.TXT;
        }
        else if (fileExtension.toLowerCase() === 'rtf') {
            return DocumentManagementService.RTF;
        }
        else if (fileExtension.toLowerCase() === 'pdf') {
            return DocumentManagementService.PDF;
        }
        else {
            return fileExtension;
        }
    }
    isImage(imageType) {
        return DocumentManagementService.imagesList.find(e => e === imageType) !== undefined;
    }
    isWord(wordType) {
        return DocumentManagementService.wordList.find(e => e === wordType) !== undefined;
    }
    isExcel(excelType) {
        return DocumentManagementService.excelList.find(e => e === excelType) !== undefined;
    }
    isPowerpoint(powerpointType) {
        return DocumentManagementService.powerpointList.find(e => e === powerpointType) !== undefined;
    }
    transformDocumentUrl(documentBinaryUrl) {
        const remoteHrsPattern = new RegExp(this.appConfig.getRemoteHrsUrl());
        documentBinaryUrl = documentBinaryUrl.replace(remoteHrsPattern, this.appConfig.getHrsUrl());
        const remoteDocumentManagementPattern = new RegExp(this.appConfig.getRemoteDocumentManagementUrl());
        return documentBinaryUrl.replace(remoteDocumentManagementPattern, this.getDocStoreUrl());
    }
    getDocStoreUrl() {
        return this.appConfig.getDocumentSecureMode() ? this.appConfig.getDocumentManagementUrlV2() : this.appConfig.getDocumentManagementUrl();
    }
}
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
DocumentManagementService.ɵfac = function DocumentManagementService_Factory(t) { return new (t || DocumentManagementService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AbstractAppConfig)); };
DocumentManagementService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DocumentManagementService, factory: DocumentManagementService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DocumentManagementService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtbWFuYWdlbWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9kb2N1bWVudC1tYW5hZ2VtZW50L2RvY3VtZW50LW1hbmFnZW1lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7OztBQUd0QyxNQUFNLE9BQU8seUJBQXlCO0lBa0JwQyxZQUE2QixJQUFpQixFQUFtQixTQUE0QjtRQUFoRSxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQW1CLGNBQVMsR0FBVCxTQUFTLENBQW1CO0lBQUcsQ0FBQztJQUUxRixVQUFVLENBQUMsUUFBa0I7UUFDbEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2xDLCtHQUErRztRQUMvRyxrSEFBa0g7UUFDbEgsMkNBQTJDO1FBQzNDLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUMsQ0FBQzthQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLGtCQUFrQixDQUFDLGtC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QUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNsRixrQ0FBUSxHQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDcEQsbUNBQVMsR0FBYSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3JELHdDQUFjLEdBQWEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztrR0FoQnZFLHlCQUF5QjsrRUFBekIseUJBQXlCLFdBQXpCLHlCQUF5Qjt1RkFBekIseUJBQXlCO2NBRHJDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWJzdHJhY3RBcHBDb25maWcgfSBmcm9tICcuLi8uLi8uLi9hcHAuY29uZmlnJztcbmltcG9ydCB7IERvY3VtZW50RGF0YSB9IGZyb20gJy4uLy4uL2RvbWFpbi9kb2N1bWVudC9kb2N1bWVudC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vaHR0cCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb2N1bWVudE1hbmFnZW1lbnRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgUERGID0gJ3BkZic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElNQUdFID0gJ2ltYWdlJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgV09SRCA9ICd3b3JkJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRVhDRUwgPSAnZXhjZWwnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBQT1dFUlBPSU5UID0gJ3Bvd2VycG9pbnQnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBUWFQgPSAndHh0JztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgUlRGID0gJ3J0Zic7XG5cbiAgLy8gVGhpcyBkZWxheSBoYXMgYmVlbiBhZGRlZCB0byBnaXZlIGVub3VnaCB0aW1lIHRvIHRoZSB1c2VyIG9uIHRoZSBVSSB0byBzZWUgdGhlIGluZm8gbWVzc2FnZXMgb24gdGhlIGRvY3VtZW50IHVwbG9hZFxuICAvLyBmaWVsZCBmb3IgY2FzZXMgd2hlbiB1cGxvYWRzIGFyZSB2ZXJ5IGZhc3QuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFJFU1BPTlNFX0RFTEFZID0gMTAwMDtcblxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBpbWFnZXNMaXN0OiBzdHJpbmdbXSA9IFsnR0lGJywgJ0pQRycsICdKUEVHJywgJ1BORycsICdnaWYnLCAnanBnJywgJ2pwZWcnLCAncG5nJ107XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHdvcmRMaXN0OiBzdHJpbmdbXSA9IFsnRE9DJywgJ0RPQ1gnLCAnZG9jJywgJ2RvY3gnXTtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgZXhjZWxMaXN0OiBzdHJpbmdbXSA9IFsnWExTJywgJ1hMU1gnLCAneGxzJywgJ3hsc3gnXTtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgcG93ZXJwb2ludExpc3Q6IHN0cmluZ1tdID0gWydQUFQnLCAnUFBUWCcsICdwcHQnLCAncHB0eCddO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaHR0cDogSHR0cFNlcnZpY2UsIHByaXZhdGUgcmVhZG9ubHkgYXBwQ29uZmlnOiBBYnN0cmFjdEFwcENvbmZpZykge31cblxuICBwdWJsaWMgdXBsb2FkRmlsZShmb3JtRGF0YTogRm9ybURhdGEpOiBPYnNlcnZhYmxlPERvY3VtZW50RGF0YT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0RG9jU3RvcmVVcmwoKTtcbiAgICAvLyBEbyBub3Qgc2V0IGFueSBoZWFkZXJzLCBzdWNoIGFzIFwiQWNjZXB0XCIgb3IgXCJDb250ZW50LVR5cGVcIiwgd2l0aCBudWxsIHZhbHVlczsgdGhpcyBpcyBub3QgcGVybWl0dGVkIHdpdGggdGhlXG4gICAgLy8gQW5ndWxhciBIdHRwQ2xpZW50IGluIEBhbmd1bGFyL2NvbW1vbi9odHRwLiBKdXN0IGNyZWF0ZSBhbmQgcGFzcyBhIG5ldyBIdHRwSGVhZGVycyBvYmplY3QuIEFuZ3VsYXIgd2lsbCBhZGQgdGhlXG4gICAgLy8gY29ycmVjdCBoZWFkZXJzIGFuZCB2YWx1ZXMgYXV0b21hdGljYWxseVxuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdCh1cmwsIGZvcm1EYXRhLCB7aGVhZGVycywgb2JzZXJ2ZTogJ2JvZHknfSlcbiAgICAgIC5waXBlKGRlbGF5KERvY3VtZW50TWFuYWdlbWVudFNlcnZpY2UuUkVTUE9OU0VfREVMQVkpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNZWRpYVZpZXdlckluZm8oZG9jdW1lbnRGaWVsZFZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICAgIGNvbnN0IG1lZGlhVmlld2VySW5mbyA9IHtcbiAgICAgICAgZG9jdW1lbnRfYmluYXJ5X3VybDogdGhpcy50cmFuc2Zvcm1Eb2N1bWVudFVybChkb2N1bWVudEZpZWxkVmFsdWUuZG9jdW1lbnRfYmluYXJ5X3VybCksXG4gICAgICAgIGRvY3VtZW50X2ZpbGVuYW1lOiBkb2N1bWVudEZpZWxkVmFsdWUuZG9jdW1lbnRfZmlsZW5hbWUsXG4gICAgICAgIGNvbnRlbnRfdHlwZTogdGhpcy5nZXRDb250ZW50VHlwZShkb2N1bWVudEZpZWxkVmFsdWUpLFxuICAgICAgICBhbm5vdGF0aW9uX2FwaV91cmw6IHRoaXMuYXBwQ29uZmlnLmdldEFubm90YXRpb25BcGlVcmwoKSxcbiAgICAgICAgY2FzZV9pZDogZG9jdW1lbnRGaWVsZFZhbHVlLmlkLFxuICAgICAgICBjYXNlX2p1cmlzZGljdGlvbjogZG9jdW1lbnRGaWVsZFZhbHVlLmp1cmlzZGljdGlvblxuICAgICAgfTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobWVkaWFWaWV3ZXJJbmZvKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb250ZW50VHlwZShkb2N1bWVudEZpZWxkVmFsdWU6IGFueSk6IHN0cmluZyB7XG4gICAgbGV0IGZpbGVFeHRlbnNpb24gPSAnPHVua25vd24+JztcbiAgICBpZiAoZG9jdW1lbnRGaWVsZFZhbHVlLmRvY3VtZW50X2ZpbGVuYW1lKSB7XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGRvY3VtZW50RmllbGRWYWx1ZS5kb2N1bWVudF9maWxlbmFtZS5sYXN0SW5kZXhPZignLicpO1xuICAgICAgaWYgKHBvc2l0aW9uID09PSBkb2N1bWVudEZpZWxkVmFsdWUuZG9jdW1lbnRfZmlsZW5hbWUubGVuZ3RoKSB7XG4gICAgICAgIGZpbGVFeHRlbnNpb24gPSAnJztcbiAgICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPj0gMCkge1xuICAgICAgICBmaWxlRXh0ZW5zaW9uID0gZG9jdW1lbnRGaWVsZFZhbHVlLmRvY3VtZW50X2ZpbGVuYW1lLnNsaWNlKHBvc2l0aW9uICsgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmlzSW1hZ2UoZmlsZUV4dGVuc2lvbikpIHtcbiAgICAgIHJldHVybiBEb2N1bWVudE1hbmFnZW1lbnRTZXJ2aWNlLklNQUdFO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc1dvcmQoZmlsZUV4dGVuc2lvbikpIHtcbiAgICAgIHJldHVybiBEb2N1bWVudE1hbmFnZW1lbnRTZXJ2aWNlLldPUkQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRXhjZWwoZmlsZUV4dGVuc2lvbikpIHtcbiAgICAgIHJldHVybiBEb2N1bWVudE1hbmFnZW1lbnRTZXJ2aWNlLkVYQ0VMO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc1Bvd2VycG9pbnQoZmlsZUV4dGVuc2lvbikpIHtcbiAgICAgIHJldHVybiBEb2N1bWVudE1hbmFnZW1lbnRTZXJ2aWNlLlBPV0VSUE9JTlQ7XG4gICAgfSBlbHNlIGlmIChmaWxlRXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCkgPT09ICd0eHQnKSB7XG4gICAgICByZXR1cm4gRG9jdW1lbnRNYW5hZ2VtZW50U2VydmljZS5UWFQ7XG4gICAgfSBlbHNlIGlmIChmaWxlRXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCkgPT09ICdydGYnKSB7XG4gICAgICByZXR1cm4gRG9jdW1lbnRNYW5hZ2VtZW50U2VydmljZS5SVEY7XG4gICAgfSBlbHNlIGlmIChmaWxlRXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCkgPT09ICdwZGYnKSB7XG4gICAgICByZXR1cm4gRG9jdW1lbnRNYW5hZ2VtZW50U2VydmljZS5QREY7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmaWxlRXh0ZW5zaW9uO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0ltYWdlKGltYWdlVHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIERvY3VtZW50TWFuYWdlbWVudFNlcnZpY2UuaW1hZ2VzTGlzdC5maW5kKGUgPT4gZSA9PT0gaW1hZ2VUeXBlKSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIGlzV29yZCh3b3JkVHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIERvY3VtZW50TWFuYWdlbWVudFNlcnZpY2Uud29yZExpc3QuZmluZChlID0+IGUgPT09IHdvcmRUeXBlKSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIGlzRXhjZWwoZXhjZWxUeXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gRG9jdW1lbnRNYW5hZ2VtZW50U2VydmljZS5leGNlbExpc3QuZmluZChlID0+IGUgPT09IGV4Y2VsVHlwZSkgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBpc1Bvd2VycG9pbnQocG93ZXJwb2ludFR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBEb2N1bWVudE1hbmFnZW1lbnRTZXJ2aWNlLnBvd2VycG9pbnRMaXN0LmZpbmQoZSA9PiBlID09PSBwb3dlcnBvaW50VHlwZSkgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNmb3JtRG9jdW1lbnRVcmwoZG9jdW1lbnRCaW5hcnlVcmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgcmVtb3RlSHJzUGF0dGVybiA9IG5ldyBSZWdFeHAodGhpcy5hcHBDb25maWcuZ2V0UmVtb3RlSHJzVXJsKCkpO1xuICAgIGRvY3VtZW50QmluYXJ5VXJsID0gZG9jdW1lbnRCaW5hcnlVcmwucmVwbGFjZShyZW1vdGVIcnNQYXR0ZXJuLCB0aGlzLmFwcENvbmZpZy5nZXRIcnNVcmwoKSk7XG4gICAgY29uc3QgcmVtb3RlRG9jdW1lbnRNYW5hZ2VtZW50UGF0dGVybiA9IG5ldyBSZWdFeHAodGhpcy5hcHBDb25maWcuZ2V0UmVtb3RlRG9jdW1lbnRNYW5hZ2VtZW50VXJsKCkpO1xuICAgIHJldHVybiBkb2N1bWVudEJpbmFyeVVybC5yZXBsYWNlKHJlbW90ZURvY3VtZW50TWFuYWdlbWVudFBhdHRlcm4sIHRoaXMuZ2V0RG9jU3RvcmVVcmwoKSk7XG4gIH1cblxuICBwcml2YXRlIGdldERvY1N0b3JlVXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXBwQ29uZmlnLmdldERvY3VtZW50U2VjdXJlTW9kZSgpID8gdGhpcy5hcHBDb25maWcuZ2V0RG9jdW1lbnRNYW5hZ2VtZW50VXJsVjIoKSA6IHRoaXMuYXBwQ29uZmlnLmdldERvY3VtZW50TWFuYWdlbWVudFVybCgpO1xuICB9XG59XG4iXX0=