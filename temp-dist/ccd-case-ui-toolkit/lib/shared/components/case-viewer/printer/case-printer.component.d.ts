import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CasePrintDocument } from '../../../domain/case-view/case-print-document.model';
import { CaseView } from '../../../domain/case-view/case-view.model';
import { AlertService } from '../../../services/alert/alert.service';
import { CaseNotifier } from '../../case-editor/services/case.notifier';
import { CasesService } from '../../case-editor/services/cases.service';
import * as i0 from "@angular/core";
export declare class CasePrinterComponent implements OnInit, OnDestroy {
    private readonly caseNotifier;
    private readonly casesService;
    private readonly alertService;
    private readonly ERROR_MESSAGE;
    caseDetails: CaseView;
    documents: CasePrintDocument[];
    caseSubscription: Subscription;
    constructor(caseNotifier: CaseNotifier, casesService: CasesService, alertService: AlertService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isDataLoaded(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CasePrinterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CasePrinterComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=case-printer.component.d.ts.map