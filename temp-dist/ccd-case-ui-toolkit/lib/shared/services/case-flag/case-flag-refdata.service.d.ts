import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { FlagType, HmctsServiceDetail } from '../../domain/case-flag';
import { HttpService } from '../http';
import { RefdataCaseFlagType } from './refdata-case-flag-type.enum';
import * as i0 from "@angular/core";
export declare class CaseFlagRefdataService {
    private readonly http;
    private readonly appConfig;
    constructor(http: HttpService, appConfig: AbstractAppConfig);
    /**
     * Retrieves the Case Flag types for an HMCTS service.
     *
     * @param serviceId The HMCTS Service Code for a jurisdiction or service. **Note:** This is _not_ the service name
     * @param flagType `PARTY` for party-level flags; `CASE` for case-level
     * @param welshRequired `true` if Welsh language versions of flags are required; `false` otherwise (future feature)
     * @returns An `Observable` of an array of flag types
     */
    getCaseFlagsRefdata(serviceId: string, flagType?: RefdataCaseFlagType, welshRequired?: boolean): Observable<FlagType[]>;
    /**
     * Retrieves the HMCTS service details for a jurisdiction or service, including service codes. More than one
     * service code may be present. For example, the Divorce jurisdiction/service has corresponding service codes of
     * "ABA1" and "ABA2".
     *
     * @param serviceNames The service name(s) to look up, comma-separated if more than one
     * @returns An `Observable` of an array of service details
     */
    getHmctsServiceDetailsByServiceName(serviceNames?: string): Observable<HmctsServiceDetail[]>;
    /**
     * Retrieves the HMCTS service details for a case type, including service code. For example, the
     * "FinancialRemedyContested" case type is associated with the Divorce jurisdiction/service and service code "ABA2".
     *
     * Note that a case type might not be associated with any service codes of a jurisdiction or service.
     *
     * @param caseTypeId The case type ID to look up
     * @returns An `Observable` of an array of service details
     */
    getHmctsServiceDetailsByCaseType(caseTypeId?: string): Observable<HmctsServiceDetail[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseFlagRefdataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CaseFlagRefdataService>;
}
//# sourceMappingURL=case-flag-refdata.service.d.ts.map