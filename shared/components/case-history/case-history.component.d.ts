import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseHistory } from './domain';
import { Subscription } from 'rxjs';
import { CaseView, CaseTab } from '../../domain';
import { AlertService, OrderService } from '../../services';
import { CaseHistoryService } from './services/case-history.service';
import { CaseNotifier } from '../case-editor';
export declare class CaseHistoryComponent implements OnInit, OnDestroy {
    private route;
    private alertService;
    private orderService;
    private caseNotifier;
    private caseHistoryService;
    private static readonly ERROR_MESSAGE;
    static readonly PARAM_EVENT_ID = "eid";
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
}
