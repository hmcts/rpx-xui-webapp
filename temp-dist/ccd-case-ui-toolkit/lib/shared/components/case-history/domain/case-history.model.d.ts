import { CaseTab } from '../../../domain/case-view/case-tab.model';
import { CaseViewEvent } from '../../../domain/case-view/case-view-event.model';
import { Jurisdiction } from '../../../domain/definition/jurisdiction.model';
export declare class CaseHistoryCaseType {
    id: string;
    name: string;
    description?: string;
    jurisdiction: Jurisdiction;
}
export declare class CaseHistory {
    case_id?: string;
    caseType: CaseHistoryCaseType;
    tabs: CaseTab[];
    event: CaseViewEvent;
}
//# sourceMappingURL=case-history.model.d.ts.map