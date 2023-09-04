import { AfterViewInit, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CaseView } from '../../../../../domain';
import { CaseField, Jurisdiction } from '../../../../../domain/definition';
import { CasesService } from '../../../../case-editor/services/cases.service';
import { LinkedCasesService } from '../../services';
import * as i0 from "@angular/core";
interface LinkedCasesResponse {
    caseReference: string;
    caseName: string;
    caseType: string;
    caseTypeDescription: string;
    service: string;
    state: string;
    stateDescription: string;
    reasons: string[];
}
export declare class LinkedCasesToTableComponent implements OnInit, AfterViewInit {
    private readonly route;
    private readonly linkedCasesService;
    private readonly casesService;
    private static readonly CASE_CONSOLIDATED_REASON_CODE;
    private static readonly CASE_PROGRESS_REASON_CODE;
    caseField: CaseField;
    notifyAPIFailure: EventEmitter<boolean>;
    caseDetails: CaseView;
    isLoaded: boolean;
    linkedCasesFromResponse: LinkedCasesResponse[];
    caseId: string;
    isServerError: boolean;
    isServerReasonCodeError: boolean;
    jurisdictionsResponse: Jurisdiction[];
    constructor(route: ActivatedRoute, linkedCasesService: LinkedCasesService, casesService: CasesService);
    ngAfterViewInit(): void;
    ngOnInit(): void;
    getCaseRefereneLink(caseRef: string): string;
    sortLinkedCasesByReasonCode(searchCasesResponse: any): LinkedCasesResponse[];
    getAllLinkedCaseInformation(): void;
    sortReasonCodes(searchCasesResponse: any): LinkedCasesResponse[];
    getReasonSortOrder(reasonCode: string): number;
    searchCasesByCaseIds(searchCasesResponse: any[]): Observable<unknown[]>;
    hasLeadCaseOrConsolidated(reasonCode: string): boolean;
    mapResponse(esSearchCasesResponse: any): LinkedCasesResponse;
    static ɵfac: i0.ɵɵFactoryDeclaration<LinkedCasesToTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LinkedCasesToTableComponent, "ccd-linked-cases-to-table", never, { "caseField": "caseField"; }, { "notifyAPIFailure": "notifyAPIFailure"; }, never, never, false, never>;
}
export {};
//# sourceMappingURL=linked-cases-to-table.component.d.ts.map