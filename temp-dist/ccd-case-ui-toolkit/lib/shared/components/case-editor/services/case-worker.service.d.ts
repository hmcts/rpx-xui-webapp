import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../../app.config';
import { CaseworkersByService } from '../../../domain/work-allocation/case-worker.model';
import { HttpErrorService } from '../../../services/http/http-error.service';
import { HttpService } from '../../../services/http/http.service';
import * as i0 from "@angular/core";
export declare class CaseworkerService {
    private readonly http;
    private readonly appConfig;
    private readonly errorService;
    constructor(http: HttpService, appConfig: AbstractAppConfig, errorService: HttpErrorService);
    getCaseworkers(serviceId: any): Observable<CaseworkersByService[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseworkerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CaseworkerService>;
}
//# sourceMappingURL=case-worker.service.d.ts.map