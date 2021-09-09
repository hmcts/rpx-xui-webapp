import { AbstractAppConfig } from '../../../app.config';
import { Observable } from 'rxjs';
import { HttpService } from '../http';
import { Profile } from '../../domain';
export declare class ProfileService {
    private httpService;
    private appConfig;
    static readonly V2_MEDIATYPE_USER_PROFILE = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-user-profile.v2+json;charset=UTF-8";
    private static readonly URL;
    constructor(httpService: HttpService, appConfig: AbstractAppConfig);
    get(): Observable<Profile>;
}
