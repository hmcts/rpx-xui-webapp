import { Orderable } from '../order';
export declare class CaseViewTrigger implements Orderable {
    static readonly DELETE = "DELETE";
    id: string;
    name: string;
    description: string;
    order?: number;
}
