import { AfterViewInit, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CaseView } from '../../../../../domain';
import { CaseField } from '../../../../../domain/definition';
import { LovRefDataModel } from '../../../../../services/common-data-service/common-data-service';
import { CasesService } from '../../../../case-editor/services/cases.service';
import { CaseLinkResponse, LinkedCasesResponse } from '../../domain/linked-cases.model';
import { LinkedCasesService } from '../../services';
import * as i0 from "@angular/core";
export declare class LinkedCasesFromTableComponent implements OnInit, AfterViewInit {
    private readonly route;
    private readonly casesService;
    private readonly linkedCasesService;
    private static readonly CASE_NAME_MISSING_TEXT;
    caseField: CaseField;
    notifyAPIFailure: EventEmitter<boolean>;
    caseDetails: CaseView;
    parentUrl: string;
    isLoaded: boolean;
    getLinkedCasesResponse: CaseLinkResponse[];
    linkedCaseReasons: LovRefDataModel[];
    caseId: string;
    showHideLinkText: string;
    noLinkedCases: boolean;
    isServerError: boolean;
    isServerReasonCodeError: boolean;
    constructor(route: ActivatedRoute, casesService: CasesService, linkedCasesService: LinkedCasesService);
    ngAfterViewInit(): void;
    ngOnInit(): void;
    fetchPageData(): void;
    getLinkedCases(): Observable<LinkedCasesResponse>;
    mapLookupIDToValueFromJurisdictions(fieldName: any, fieldValue: any): string;
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LinkedCasesFromTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LinkedCasesFromTableComponent, "ccd-linked-cases-from-table", never, { "caseField": "caseField"; }, { "notifyAPIFailure": "notifyAPIFailure"; }, never, never, false, never>;
}
//# sourceMappingURL=linked-cases-from-table.component.d.ts.map