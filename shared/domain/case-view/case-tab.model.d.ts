import { Orderable } from '../order';
import { CaseField } from '../definition';
export declare class CaseTab implements Orderable {
    id: string;
    label: string;
    order?: number;
    fields: CaseField[];
    show_condition?: string;
}
