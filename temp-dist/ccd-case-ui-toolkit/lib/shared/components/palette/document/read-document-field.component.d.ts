import { OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentManagementService } from '../../../services/document-management';
import { WindowService } from '../../../services/window';
import { CasesService } from '../../case-editor/services/cases.service';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
export declare class ReadDocumentFieldComponent extends AbstractFieldReadComponent implements OnDestroy {
    private readonly windowService;
    private readonly documentManagement;
    private readonly router;
    private readonly route;
    private readonly casesService;
    caseViewSubscription: Subscription;
    constructor(windowService: WindowService, documentManagement: DocumentManagementService, router: Router, route: ActivatedRoute, casesService: CasesService);
    showMediaViewer(): void;
    openMediaViewer(documentFieldValue: any): void;
    getMediaViewerUrl(): string;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReadDocumentFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReadDocumentFieldComponent, "ccd-read-document-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=read-document-field.component.d.ts.map