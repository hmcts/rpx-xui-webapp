import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CaseView } from '../../../domain/case-view/case-view.model';
import { AlertService } from '../../../services/alert/alert.service';
import { DraftService } from '../../../services/draft/draft.service';
import { NavigationNotifierService } from '../../../services/navigation/navigation-notifier.service';
import { CaseNotifier } from '../../case-editor/services/case.notifier';
import { CasesService } from '../../case-editor/services/cases.service';
import * as i0 from "@angular/core";
export declare class CaseViewComponent implements OnInit, OnDestroy {
    private readonly navigationNotifierService;
    private readonly caseNotifier;
    private readonly casesService;
    private readonly draftService;
    private readonly alertService;
    case: string;
    hasPrint: boolean;
    hasEventSelector: boolean;
    navigationTriggered: EventEmitter<any>;
    navigationSubscription: Subscription;
    caseDetails: CaseView;
    constructor(navigationNotifierService: NavigationNotifierService, caseNotifier: CaseNotifier, casesService: CasesService, draftService: DraftService, alertService: AlertService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isDataLoaded(): boolean;
    private getCaseView;
    private getDraft;
    private checkErrorGettingCaseView;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseViewComponent, "ccd-case-view", never, { "case": "case"; "hasPrint": "hasPrint"; "hasEventSelector": "hasEventSelector"; }, { "navigationTriggered": "navigationTriggered"; }, never, never, false, never>;
}
//# sourceMappingURL=case-view.component.d.ts.map