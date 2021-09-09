import { OnInit, OnDestroy } from '@angular/core';
import { CaseView, CasePrintDocument } from '../../../domain';
import { CaseNotifier, CasesService } from '../../case-editor';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../services';
export declare class CasePrinterComponent implements OnInit, OnDestroy {
    private caseNotifier;
    private casesService;
    private alertService;
    private static readonly ERROR_MESSAGE;
    caseDetails: CaseView;
    documents: CasePrintDocument[];
    caseSubscription: Subscription;
    constructor(caseNotifier: CaseNotifier, casesService: CasesService, alertService: AlertService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isDataLoaded(): boolean;
}
