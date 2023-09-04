import { Observable } from 'rxjs';
import { Jurisdiction } from '../../domain/definition/jurisdiction.model';
import { JudicialUserModel } from '../../domain/jurisdiction';
import { HttpService } from '../http';
import * as i0 from "@angular/core";
export declare class JurisdictionService {
    private readonly httpService;
    private readonly selectedJurisdictionSource;
    readonly selectedJurisdiction: Observable<Jurisdiction>;
    constructor(httpService: HttpService);
    getJurisdictions(): Observable<Jurisdiction[]>;
    announceSelectedJurisdiction(jurisdiction: Jurisdiction): void;
    searchJudicialUsers(searchTerm: string, serviceId: string): Observable<JudicialUserModel[]>;
    searchJudicialUsersByPersonalCodes(personalCodes: string[]): Observable<JudicialUserModel[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JurisdictionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JurisdictionService>;
}
//# sourceMappingURL=jurisdiction.service.d.ts.map