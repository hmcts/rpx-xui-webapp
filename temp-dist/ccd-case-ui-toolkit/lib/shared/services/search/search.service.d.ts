import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { SearchInput } from '../../components/search-filters';
import { SearchResultView } from '../../domain/search/search-result-view.model';
import { HttpService } from '../http/http.service';
import { LoadingService } from '../loading/loading.service';
import { RequestOptionsBuilder, SearchView } from '../request/request.options.builder';
import * as i0 from "@angular/core";
export declare class SearchService {
    private readonly appConfig;
    private readonly httpService;
    private readonly requestOptionsBuilder;
    private readonly loadingService;
    static readonly V2_MEDIATYPE_SEARCH_INPUTS = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-search-input-details.v2+json;charset=UTF-8";
    static readonly VIEW_WORKBASKET = "WORKBASKET";
    private currentJurisdiction;
    private currentCaseType;
    constructor(appConfig: AbstractAppConfig, httpService: HttpService, requestOptionsBuilder: RequestOptionsBuilder, loadingService: LoadingService);
    search(jurisdictionId: string, caseTypeId: string, metaCriteria: object, caseCriteria: object, view?: SearchView): Observable<SearchResultView>;
    searchCasesByIds(caseTypeId: string, filter: any, view?: SearchView, sort?: {
        column: string;
        order: number;
    }): Observable<{}>;
    searchCases(caseTypeId: string, metaCriteria: object, caseCriteria: object, view?: SearchView, sort?: {
        column: string;
        order: number;
    }): Observable<{}>;
    getSearchInputUrl(caseTypeId: string): string;
    getSearchInputs(jurisdictionId: string, caseTypeId: string): Observable<SearchInput[]>;
    isDataValid(jurisdictionId: string, caseTypeId: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SearchService>;
}
//# sourceMappingURL=search.service.d.ts.map