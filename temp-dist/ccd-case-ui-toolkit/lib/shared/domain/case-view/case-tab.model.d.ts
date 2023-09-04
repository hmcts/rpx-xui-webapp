import { CaseField } from '../definition';
import { Orderable } from '../order';
export declare class CaseTab implements Orderable {
    id: string;
    label: string;
    order?: number;
    fields: CaseField[];
    show_condition?: string;
}
//# sourceMappingURL=case-tab.model.d.ts.map