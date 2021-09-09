import { Orderable } from '../order';
export declare class FixedListItem implements Orderable {
    code: string;
    label: string;
    order?: number;
}
