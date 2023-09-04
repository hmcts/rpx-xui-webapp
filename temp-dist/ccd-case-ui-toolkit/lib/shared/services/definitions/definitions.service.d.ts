import { Observable } from 'rxjs';
import { AbstractAppConfig as AppConfig } from '../../../app.config';
import { CaseTypeLite } from '../../domain/definition/case-type-lite.model';
import { Jurisdiction } from '../../domain/definition/jurisdiction.model';
import { HttpService } from '../http/http.service';
import * as i0 from "@angular/core";
export declare class DefinitionsService {
    private readonly http;
    private readonly appConfig;
    constructor(http: HttpService, appConfig: AppConfig);
    getCaseTypes(jurisdictionId: string, access: string): Observable<CaseTypeLite[]>;
    getJurisdictions(access: string): Observable<Jurisdiction[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefinitionsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DefinitionsService>;
}
//# sourceMappingURL=definitions.service.d.ts.map