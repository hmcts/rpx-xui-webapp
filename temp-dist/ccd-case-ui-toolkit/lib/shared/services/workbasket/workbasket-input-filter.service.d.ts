import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { WorkbasketInputModel } from '../../domain';
import { HttpService } from '../http/http.service';
import * as i0 from "@angular/core";
export declare class WorkbasketInputFilterService {
    private readonly httpService;
    private readonly appConfig;
    static readonly V2_MEDIATYPE_WORKBASKET_INPUT_DETAILS = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-workbasket-input-details.v2+json;charset=UTF-8";
    private currentJurisdiction;
    private currentCaseType;
    constructor(httpService: HttpService, appConfig: AbstractAppConfig);
    getWorkbasketInputUrl(caseTypeId: string): string;
    getWorkbasketInputs(jurisdictionId: string, caseTypeId: string): Observable<WorkbasketInputModel[]>;
    isDataValid(jurisdictionId: string, caseTypeId: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkbasketInputFilterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WorkbasketInputFilterService>;
}
//# sourceMappingURL=workbasket-input-filter.service.d.ts.map