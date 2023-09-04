import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { Profile } from '../../domain/profile/profile.model';
import { HttpService } from '../http/http.service';
import * as i0 from "@angular/core";
export declare class ProfileService {
    private readonly httpService;
    private readonly appConfig;
    static readonly V2_MEDIATYPE_USER_PROFILE = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-user-profile.v2+json;charset=UTF-8";
    private static readonly URL;
    constructor(httpService: HttpService, appConfig: AbstractAppConfig);
    get(): Observable<Profile>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProfileService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProfileService>;
}
//# sourceMappingURL=profile.service.d.ts.map