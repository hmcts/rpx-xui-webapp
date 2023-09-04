import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { Banner } from '../../domain/definition/banner.model';
import { HttpService } from '../http/http.service';
import * as i0 from "@angular/core";
export declare class BannersService {
    private readonly httpService;
    private readonly appConfig;
    static readonly V2_MEDIATYPE_BANNERS = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-banners.v2+json;charset=UTF-8";
    constructor(httpService: HttpService, appConfig: AbstractAppConfig);
    getBanners(jurisdictionReferences: string[]): Observable<Banner[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BannersService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BannersService>;
}
//# sourceMappingURL=banners.service.d.ts.map