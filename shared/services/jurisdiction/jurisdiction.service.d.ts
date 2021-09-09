import { Jurisdiction } from '../../domain';
export declare class JurisdictionService {
    private selectedJurisdictionSource;
    selectedJurisdiction: import("rxjs/internal/Observable").Observable<Jurisdiction>;
    announceSelectedJurisdiction(jurisdiction: Jurisdiction): void;
}
