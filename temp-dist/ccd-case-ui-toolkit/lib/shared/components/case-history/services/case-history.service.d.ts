import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../../app.config';
import { HttpErrorService } from '../../../services/http/http-error.service';
import { HttpService } from '../../../services/http/http.service';
import { CaseHistory } from '../domain/case-history.model';
import * as i0 from "@angular/core";
export declare class CaseHistoryService {
    private readonly httpService;
    private readonly httpErrorService;
    private readonly appConfig;
    static readonly V2_MEDIATYPE_CASE_EVENT_VIEW = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-event-view.v2+json;charset=UTF-8";
    constructor(httpService: HttpService, httpErrorService: HttpErrorService, appConfig: AbstractAppConfig);
    get(caseId: string, eventId: string): Observable<CaseHistory>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseHistoryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CaseHistoryService>;
}
//# sourceMappingURL=case-history.service.d.ts.map