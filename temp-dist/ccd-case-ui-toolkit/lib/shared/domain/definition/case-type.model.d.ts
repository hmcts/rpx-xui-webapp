import { CaseEvent } from './case-event.model';
import { CaseField } from './case-field.model';
import { CaseState } from './case-state.model';
import { Jurisdiction } from './jurisdiction.model';
export declare class CaseType {
    id: string;
    name: string;
    events: CaseEvent[];
    states: CaseState[];
    case_fields: CaseField[];
    description: string;
    jurisdiction: Jurisdiction;
    printEnabled?: boolean;
}
//# sourceMappingURL=case-type.model.d.ts.map