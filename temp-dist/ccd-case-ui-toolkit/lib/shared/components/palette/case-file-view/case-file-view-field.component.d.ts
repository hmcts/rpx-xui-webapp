import { AfterViewInit, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CaseField } from '../../../domain';
import { CaseFileViewDocument, CategoriesAndDocuments, DocumentTreeNode } from '../../../domain/case-file-view';
import { CaseFileViewService, DocumentManagementService, LoadingService, SessionStorageService } from '../../../services';
import * as i0 from "@angular/core";
export declare class CaseFileViewFieldComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly elementRef;
    private readonly route;
    private caseFileViewService;
    private documentManagementService;
    private readonly loadingService;
    private readonly sessionStorageService;
    static readonly PARAM_CASE_ID = "cid";
    allowMoving: boolean;
    categoriesAndDocuments$: Observable<CategoriesAndDocuments>;
    categoriesAndDocumentsSubscription: Subscription;
    getCategoriesAndDocumentsError: boolean;
    currentDocument: CaseFileViewDocument | undefined;
    errorMessages: string[];
    private caseVersion;
    caseField: CaseField;
    constructor(elementRef: ElementRef, route: ActivatedRoute, caseFileViewService: CaseFileViewService, documentManagementService: DocumentManagementService, loadingService: LoadingService, sessionStorageService: SessionStorageService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    setMediaViewerFile(document: DocumentTreeNode): void;
    moveDocument(data: {
        document: DocumentTreeNode;
        newCategory: string;
    }): void;
    reloadPage(): void;
    resetErrorMessages(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseFileViewFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseFileViewFieldComponent, "ccd-case-file-view-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=case-file-view-field.component.d.ts.map