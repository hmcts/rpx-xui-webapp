import { OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { AlertService } from '../../../services/alert';
import { CaseView } from '../../../domain';
import { CasesService, CaseNotifier } from '../../case-editor';
import { DraftService } from '../../../services';
import { Subscription } from 'rxjs';
import { NavigationNotifierService } from '../../../services/navigation/navigation-notifier.service';
export declare class CaseViewComponent implements OnInit, OnDestroy {
    private navigationNotifierService;
    private caseNofitier;
    private casesService;
    private draftService;
    private alertService;
    case: string;
    hasPrint: boolean;
    hasEventSelector: boolean;
    navigationTriggered: EventEmitter<any>;
    navigationSubscription: Subscription;
    caseDetails: CaseView;
    constructor(navigationNotifierService: NavigationNotifierService, caseNofitier: CaseNotifier, casesService: CasesService, draftService: DraftService, alertService: AlertService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isDataLoaded(): boolean;
    private getCaseView;
    private getDraft;
    private checkAuthorizationError;
}
