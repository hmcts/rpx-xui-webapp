import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { DocumentData } from '../../domain/document/document-data.model';
import { HttpService } from '../http';
import * as i0 from "@angular/core";
export declare class DocumentManagementService {
    private readonly http;
    private readonly appConfig;
    private static readonly PDF;
    private static readonly IMAGE;
    private static readonly WORD;
    private static readonly EXCEL;
    private static readonly POWERPOINT;
    private static readonly TXT;
    private static readonly RTF;
    private static readonly RESPONSE_DELAY;
    private static readonly imagesList;
    private static readonly wordList;
    private static readonly excelList;
    private static readonly powerpointList;
    constructor(http: HttpService, appConfig: AbstractAppConfig);
    uploadFile(formData: FormData): Observable<DocumentData>;
    getMediaViewerInfo(documentFieldValue: any): string;
    getContentType(documentFieldValue: any): string;
    isImage(imageType: string): boolean;
    isWord(wordType: string): boolean;
    isExcel(excelType: string): boolean;
    isPowerpoint(powerpointType: string): boolean;
    private transformDocumentUrl;
    private getDocStoreUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<DocumentManagementService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DocumentManagementService>;
}
//# sourceMappingURL=document-management.service.d.ts.map