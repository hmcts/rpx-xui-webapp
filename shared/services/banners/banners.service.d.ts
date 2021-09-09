import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpService } from '../http/http.service';
import { AbstractAppConfig } from '../../../app.config';
import { Banner } from '../../domain';
export declare class BannersService {
    private httpService;
    private appConfig;
    static readonly V2_MEDIATYPE_BANNERS = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-banners.v2+json;charset=UTF-8";
    constructor(httpService: HttpService, appConfig: AbstractAppConfig);
    getBanners(jurisdictionReferences: string[]): Observable<Banner[]>;
}
