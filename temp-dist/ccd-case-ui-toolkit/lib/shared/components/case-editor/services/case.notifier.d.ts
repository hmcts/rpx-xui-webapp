import { CaseTab, CaseView } from '../../../domain';
import { CasesService } from './cases.service';
import * as i0 from "@angular/core";
export declare class CaseNotifier {
    private readonly casesService;
    static readonly CASE_NAME = "caseNameHmctsInternal";
    static readonly CASE_LOCATION = "caseManagementLocation";
    private readonly caseViewSource;
    caseView: import("rxjs").Observable<CaseView>;
    cachedCaseView: CaseView;
    constructor(casesService: CasesService);
    removeCachedCase(): void;
    announceCase(c: CaseView): void;
    fetchAndRefresh(cid: string): import("rxjs").Observable<CaseView>;
    setBasicFields(tabs: CaseTab[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseNotifier, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CaseNotifier>;
}
//# sourceMappingURL=case.notifier.d.ts.map