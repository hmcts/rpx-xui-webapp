import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpService } from '../http/http.service';
import { WorkbasketInputModel } from '../../domain';
import { AbstractAppConfig } from '../../../app.config';
export declare class WorkbasketInputFilterService {
    private httpService;
    private appConfig;
    static readonly V2_MEDIATYPE_WORKBASKET_INPUT_DETAILS = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-workbasket-input-details.v2+json;charset=UTF-8";
    private currentJurisdiction;
    private currentCaseType;
    constructor(httpService: HttpService, appConfig: AbstractAppConfig);
    getWorkbasketInputUrl(caseTypeId: string): string;
    getWorkbasketInputs(jurisdictionId: string, caseTypeId: string): Observable<WorkbasketInputModel[]>;
    isDataValid(jurisdictionId: string, caseTypeId: string): boolean;
}
