import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { CaseTab, CaseView } from '../../domain';
import { CaseNotifier } from '../case-editor';
import { OrderService } from '../../services';
import * as i0 from "@angular/core";
export declare class CaseViewerComponent implements OnInit, OnDestroy {
    private readonly route;
    private readonly caseNotifier;
    private readonly appConfig;
    private readonly orderService;
    static readonly METADATA_FIELD_ACCESS_PROCESS_ID = "[ACCESS_PROCESS]";
    static readonly METADATA_FIELD_ACCESS_GRANTED_ID = "[ACCESS_GRANTED]";
    static readonly NON_STANDARD_USER_ACCESS_TYPES: string[];
    static readonly BASIC_USER_ACCESS_TYPES = "BASIC";
    hasPrint: boolean;
    hasEventSelector: boolean;
    prependedTabs: CaseTab[];
    appendedTabs: CaseTab[];
    caseDetails: CaseView;
    caseSubscription: Subscription;
    userAccessType: string;
    accessGranted: boolean;
    constructor(route: ActivatedRoute, caseNotifier: CaseNotifier, appConfig: AbstractAppConfig, orderService: OrderService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    loadCaseDetails(): void;
    setUserAccessType(caseDetails: CaseView): void;
    isDataLoaded(): boolean;
    hasStandardAccess(): boolean;
    private suffixDuplicateTabs;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseViewerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseViewerComponent, "ccd-case-viewer", never, { "hasPrint": "hasPrint"; "hasEventSelector": "hasEventSelector"; "prependedTabs": "prependedTabs"; "appendedTabs": "appendedTabs"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=case-viewer.component.d.ts.map