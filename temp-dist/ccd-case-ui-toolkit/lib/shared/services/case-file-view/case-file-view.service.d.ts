import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { CategoriesAndDocuments } from '../../domain/case-file-view';
import { HttpService } from '../http';
import * as i0 from "@angular/core";
export declare class CaseFileViewService {
    private readonly http;
    private readonly appConfig;
    constructor(http: HttpService, appConfig: AbstractAppConfig);
    /**
     * Retrieves the categories and documents for a case.
     *
     * @param caseRef 16-digit Case Reference number of the case
     * @returns An `Observable` of the `CategoriesAndDocuments` for the case
     */
    getCategoriesAndDocuments(caseRef: string): Observable<CategoriesAndDocuments>;
    updateDocumentCategory(caseRef: string, caseVersion: number, attributePath: string, categoryId: string): Observable<CategoriesAndDocuments>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseFileViewService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CaseFileViewService>;
}
//# sourceMappingURL=case-file-view.service.d.ts.map