import { CaseView } from '../../../domain';
export declare class CaseNotifier {
    private caseViewSource;
    caseView: import("rxjs/internal/Observable").Observable<CaseView>;
    announceCase(c: CaseView): void;
}
