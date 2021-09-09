import { Observable } from 'rxjs';
import { HttpService, HttpErrorService } from '../../../services';
import { AbstractAppConfig } from '../../../../app.config';
import { CaseHistory } from '../domain';
export declare class CaseHistoryService {
    private httpService;
    private httpErrorService;
    private appConfig;
    static readonly V2_MEDIATYPE_CASE_EVENT_VIEW = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-event-view.v2+json;charset=UTF-8";
    constructor(httpService: HttpService, httpErrorService: HttpErrorService, appConfig: AbstractAppConfig);
    get(caseId: string, eventId: string): Observable<CaseHistory>;
}
