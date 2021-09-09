import { Orderable } from '../order';
export declare class CaseState implements Orderable {
    id: string;
    name: string;
    description: string;
    order?: number;
}
