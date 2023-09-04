import { Observable } from 'rxjs';
import { CaseView } from '../../../../domain/case-view';
import { Jurisdiction } from '../../../../domain/definition/jurisdiction.model';
import { JurisdictionService, SearchService } from '../../../../services';
import { LovRefDataModel } from '../../../../services/common-data-service/common-data-service';
import { CaseLink, ESQueryType } from '../domain';
import * as i0 from "@angular/core";
export declare class LinkedCasesService {
    private readonly jurisdictionService;
    private readonly searchService;
    private static readonly CASE_NAME_MISSING_TEXT;
    caseFieldValue: any[];
    isLinkedCasesEventTrigger: boolean;
    caseDetails: CaseView;
    caseId: string;
    caseName: string;
    linkCaseReasons: LovRefDataModel[];
    linkedCases: CaseLink[];
    initialCaseLinks: CaseLink[];
    editMode: boolean;
    jurisdictionsResponse: Jurisdiction[];
    serverJurisdictionError: boolean;
    serverError: {
        id: string;
        message: string;
    };
    serverLinkedApiError: {
        id: string;
        message: string;
    };
    isServerReasonCodeError: boolean;
    caseJurisdictionID: any;
    constructor(jurisdictionService: JurisdictionService, searchService: SearchService);
    groupLinkedCasesByCaseType: (arrObj: any, key: any) => any;
    constructElasticSearchQuery(caseIds: any[], size: number): ESQueryType;
    mapResponse(esSearchCasesResponse: any): any;
    searchCasesByCaseIds(searchCasesResponse: any[]): Observable<unknown[]>;
    getAllLinkedCaseInformation(): void;
    mapLookupIDToValueFromJurisdictions(fieldName: any, fieldValue: any): string;
    getCaseName(searchCasesResponse: CaseView): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<LinkedCasesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LinkedCasesService>;
}
//# sourceMappingURL=linked-cases.service.d.ts.map