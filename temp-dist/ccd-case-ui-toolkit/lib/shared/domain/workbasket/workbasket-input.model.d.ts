import { Orderable } from '../order/orderable.model';
import { Field } from '../search/field.model';
export declare class WorkbasketInputModel implements Orderable {
    label: string;
    order: number;
    field: Field;
    metadata?: boolean;
    display_context_parameter?: string;
}
export declare class WorkbasketInput {
    workbasketInputs: WorkbasketInputModel[];
}
//# sourceMappingURL=workbasket-input.model.d.ts.map