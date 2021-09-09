import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { HttpService } from '../http';
import { RequestOptionsBuilder, SearchView } from '../request';
import { SearchInput } from '../../components/search-filters';
import { SearchResultView } from '../../domain/search';
import { LoadingService } from '../loading';
export declare class SearchService {
    private appConfig;
    private httpService;
    private requestOptionsBuilder;
    private loadingService;
    static readonly V2_MEDIATYPE_SEARCH_INPUTS = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-search-input-details.v2+json;charset=UTF-8";
    static readonly VIEW_SEARCH = "SEARCH";
    static readonly VIEW_WORKBASKET = "WORKBASKET";
    static readonly FIELD_PREFIX = "case.";
    private currentJurisdiction;
    private currentCaseType;
    constructor(appConfig: AbstractAppConfig, httpService: HttpService, requestOptionsBuilder: RequestOptionsBuilder, loadingService: LoadingService);
    search(jurisdictionId: string, caseTypeId: string, metaCriteria: object, caseCriteria: object, view?: SearchView): Observable<SearchResultView>;
    searchCases(caseTypeId: string, metaCriteria: object, caseCriteria: object, view?: SearchView, sort?: {
        column: string;
        order: number;
    }): Observable<{}>;
    getSearchInputUrl(caseTypeId: string): string;
    getSearchInputs(jurisdictionId: string, caseTypeId: string): Observable<SearchInput[]>;
    isDataValid(jurisdictionId: string, caseTypeId: string): boolean;
}
