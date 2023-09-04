import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CaseTab } from '../../domain/case-view/case-tab.model';
import { CaseView } from '../../domain/case-view/case-view.model';
import { AlertService } from '../../services/alert/alert.service';
import { OrderService } from '../../services/order/order.service';
import { CaseNotifier } from '../case-editor/services/case.notifier';
import { CaseHistory } from './domain/case-history.model';
import { CaseHistoryService } from './services/case-history.service';
import * as i0 from "@angular/core";
export declare class CaseHistoryComponent implements OnInit, OnDestroy {
    private readonly route;
    private readonly alertService;
    private readonly orderService;
    private readonly caseNotifier;
    private readonly caseHistoryService;
    static readonly PARAM_EVENT_ID = "eid";
    private static readonly ERROR_MESSAGE;
    event: string;
    caseHistory: CaseHistory;
    caseDetails: CaseView;
    tabs: CaseTab[];
    caseSubscription: Subscription;
    constructor(route: ActivatedRoute, alertService: AlertService, orderService: OrderService, caseNotifier: CaseNotifier, caseHistoryService: CaseHistoryService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isDataLoaded(): boolean;
    private sortTabFieldsAndFilterTabs;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseHistoryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseHistoryComponent, "ccd-case-history", never, { "event": "event"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=case-history.component.d.ts.map