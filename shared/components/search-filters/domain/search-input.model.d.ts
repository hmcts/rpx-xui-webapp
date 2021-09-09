import { Orderable, Field } from '../../../domain';
export declare class SearchInput implements Orderable {
    label: string;
    order: number;
    field: Field;
    metadata?: boolean;
    display_context_parameter?: string;
    constructor(label: string, order: number, field: Field, metadata?: boolean, display_context_parameter?: string);
}
