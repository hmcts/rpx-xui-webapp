import { Jurisdiction, CaseTab, CaseViewEvent } from '../../../domain';
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
