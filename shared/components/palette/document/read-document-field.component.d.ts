import { OnDestroy } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { Router, ActivatedRoute } from '@angular/router';
import { WindowService } from '../../../services/window';
import { DocumentManagementService } from '../../../services/document-management';
import { CasesService } from '../../case-editor/services/cases.service';
import { Subscription } from 'rxjs';
export declare class ReadDocumentFieldComponent extends AbstractFieldReadComponent implements OnDestroy {
    private windowService;
    private documentManagement;
    private router;
    private route;
    private casesService;
    caseViewSubscription: Subscription;
    constructor(windowService: WindowService, documentManagement: DocumentManagementService, router: Router, route: ActivatedRoute, casesService: CasesService);
    showMediaViewer(): void;
    openMediaViewer(documentFieldValue: any): void;
    getMediaViewerUrl(): string;
    ngOnDestroy(): void;
}
