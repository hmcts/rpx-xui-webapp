import { Orderable } from '../../../domain/order/orderable.model';
import { Field } from '../../../domain/search/field.model';
export declare class SearchInput implements Orderable {
    label: string;
    order: number;
    field: Field;
    metadata?: boolean;
    display_context_parameter?: string;
    constructor(label: string, order: number, field: Field, metadata?: boolean, display_context_parameter?: string);
}
//# sourceMappingURL=search-input.model.d.ts.map