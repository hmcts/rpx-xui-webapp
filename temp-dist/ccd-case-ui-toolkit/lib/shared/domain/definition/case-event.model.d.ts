import { Orderable } from '../order';
import { AccessControlList } from './access-control-list.model';
import { EventCaseField } from './event-case-field.model';
export declare class CaseEvent implements Orderable {
    id: string;
    name: string;
    post_state: string;
    pre_states: string[];
    case_fields: EventCaseField[];
    description: string;
    order?: number;
    acls?: AccessControlList[];
}
//# sourceMappingURL=case-event.model.d.ts.map