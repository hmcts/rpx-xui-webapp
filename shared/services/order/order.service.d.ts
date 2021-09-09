import { Orderable } from '../../domain/order/orderable.model';
export declare class OrderService {
    /**
     * @deprecated Use `sort` function instead or `compareAsc`
     * @type {(a:Orderable, b:Orderable)=>number}
     */
    sortAsc: (a: Orderable, b: Orderable) => number;
    private static readonly DEFAULT_COMPARE_FUNCTION;
    /**
     * Clone and sort array. Ascending order used by default.
     *
     * @param array Array to sort
     * @returns {Orderable[]} Sorted clone array.
     */
    sort<T extends Orderable>(array: T[], sortingFunction?: (a: Orderable, b: Orderable) => number): T[];
}
