import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { CaseEventData } from '../../domain/case-event-data.model';
import { CaseView } from '../../domain/case-view/case-view.model';
import { Draft } from '../../domain/draft.model';
import { HttpErrorService, HttpService } from '../http';
import * as i0 from "@angular/core";
export declare class DraftService {
    private readonly http;
    private readonly appConfig;
    private readonly errorService;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<DraftService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DraftService>;
}
//# sourceMappingURL=draft.service.d.ts.map