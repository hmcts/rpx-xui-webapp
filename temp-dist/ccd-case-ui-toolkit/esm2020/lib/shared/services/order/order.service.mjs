import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
// @dynamic
export class OrderService {
    constructor() {
        /**
         * @deprecated Use `sort` function instead or `compareAsc`
         */
        this.sortAsc = OrderService.DEFAULT_COMPARE_FUNCTION;
    }
    /**
     * Clone and sort array. Ascending order used by default.
     *
     * @param array Array to sort
     * @returns Orderable[] Sorted clone array.
     */
    sort(array, sortingFunction = this.sortAsc) {
        return array
            .slice()
            .sort(sortingFunction);
    }
}
OrderService.DEFAULT_COMPARE_FUNCTION = (a, b) => {
    const aOrdered = a.order === 0 || a.order;
    const bOrdered = b.order === 0 || b.order;
    if (!aOrdered) {
        return !bOrdered ? 0 : 1;
    }
    if (!bOrdered) {
        return -1;
    }
    return a.order - b.order;
};
OrderService.ɵfac = function OrderService_Factory(t) { return new (t || OrderService)(); };
OrderService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OrderService, factory: OrderService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OrderService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvb3JkZXIvb3JkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQyxXQUFXO0FBRVgsTUFBTSxPQUFPLFlBQVk7SUFEekI7UUFHRTs7V0FFRztRQUNJLFlBQU8sR0FBd0MsWUFBWSxDQUFDLHdCQUF3QixDQUFDO0tBMkI3RjtJQVhDOzs7OztPQUtHO0lBQ0ksSUFBSSxDQUFzQixLQUFVLEVBQUUsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPO1FBQ3pFLE9BQU8sS0FBSzthQUNULEtBQUssRUFBRTthQUNQLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMzQixDQUFDOztBQXpCdUIscUNBQXdCLEdBQUcsQ0FBQyxDQUFZLEVBQUUsQ0FBWSxFQUFFLEVBQUU7SUFDaEYsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMxQyxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO0lBRTFDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxQjtJQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ1g7SUFFRCxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUMzQixDQUFDLENBQUE7d0VBbkJVLFlBQVk7a0VBQVosWUFBWSxXQUFaLFlBQVk7dUZBQVosWUFBWTtjQUR4QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJhYmxlIH0gZnJvbSAnLi4vLi4vZG9tYWluL29yZGVyL29yZGVyYWJsZS5tb2RlbCc7XG5cbi8vIEBkeW5hbWljXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3JkZXJTZXJ2aWNlIHtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBzb3J0YCBmdW5jdGlvbiBpbnN0ZWFkIG9yIGBjb21wYXJlQXNjYFxuICAgKi9cbiAgcHVibGljIHNvcnRBc2M6IChhOk9yZGVyYWJsZSwgYjpPcmRlcmFibGUpPT4gbnVtYmVyID0gT3JkZXJTZXJ2aWNlLkRFRkFVTFRfQ09NUEFSRV9GVU5DVElPTjtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9DT01QQVJFX0ZVTkNUSU9OID0gKGE6IE9yZGVyYWJsZSwgYjogT3JkZXJhYmxlKSA9PiB7XG4gICAgY29uc3QgYU9yZGVyZWQgPSBhLm9yZGVyID09PSAwIHx8IGEub3JkZXI7XG4gICAgY29uc3QgYk9yZGVyZWQgPSBiLm9yZGVyID09PSAwIHx8IGIub3JkZXI7XG5cbiAgICBpZiAoIWFPcmRlcmVkKSB7XG4gICAgICByZXR1cm4gIWJPcmRlcmVkID8gMCA6IDE7XG4gICAgfVxuXG4gICAgaWYgKCFiT3JkZXJlZCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHJldHVybiBhLm9yZGVyIC0gYi5vcmRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9uZSBhbmQgc29ydCBhcnJheS4gQXNjZW5kaW5nIG9yZGVyIHVzZWQgYnkgZGVmYXVsdC5cbiAgICpcbiAgICogQHBhcmFtIGFycmF5IEFycmF5IHRvIHNvcnRcbiAgICogQHJldHVybnMgT3JkZXJhYmxlW10gU29ydGVkIGNsb25lIGFycmF5LlxuICAgKi9cbiAgcHVibGljIHNvcnQ8VCBleHRlbmRzIE9yZGVyYWJsZT4oYXJyYXk6IFRbXSwgc29ydGluZ0Z1bmN0aW9uID0gdGhpcy5zb3J0QXNjKTogVFtdIHtcbiAgICByZXR1cm4gYXJyYXlcbiAgICAgIC5zbGljZSgpXG4gICAgICAuc29ydChzb3J0aW5nRnVuY3Rpb24pO1xuICB9XG59XG4iXX0=