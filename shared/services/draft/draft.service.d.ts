import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { HttpService, HttpErrorService } from '../http';
import { CaseEventData, Draft, CaseView } from '../../domain';
export declare class DraftService {
    private http;
    private appConfig;
    private errorService;
    static readonly V2_MEDIATYPE_DRAFT_CREATE = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-draft-create.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_DRAFT_UPDATE = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-draft-update.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_DRAFT_READ = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-draft-read.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_DRAFT_DELETE = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-draft-delete.v2+json;charset=UTF-8";
    constructor(http: HttpService, appConfig: AbstractAppConfig, errorService: HttpErrorService);
    createDraft(ctid: string, eventData: CaseEventData): Observable<Draft>;
    updateDraft(ctid: string, draftId: string, eventData: CaseEventData): Observable<Draft>;
    getDraft(draftId: string): Observable<CaseView>;
    deleteDraft(draftId: string): Observable<{} | any>;
    createOrUpdateDraft(caseTypeId: string, draftId: string, caseEventData: CaseEventData): Observable<Draft>;
}
