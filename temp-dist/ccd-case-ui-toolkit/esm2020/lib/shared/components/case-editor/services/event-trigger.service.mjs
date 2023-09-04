import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class EventTriggerService {
    constructor() {
        this.eventTriggerSource = new Subject();
    }
    announceEventTrigger(eventTrigger) {
        this.eventTriggerSource.next(eventTrigger);
    }
}
EventTriggerService.ɵfac = function EventTriggerService_Factory(t) { return new (t || EventTriggerService)(); };
EventTriggerService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EventTriggerService, factory: EventTriggerService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventTriggerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtdHJpZ2dlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Nhc2UtZWRpdG9yL3NlcnZpY2VzL2V2ZW50LXRyaWdnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBTS9CLE1BQU0sT0FBTyxtQkFBbUI7SUFIaEM7UUFLUyx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztLQU03RDtJQUpRLG9CQUFvQixDQUFDLFlBQThCO1FBQ3hELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7c0ZBTlUsbUJBQW1CO3lFQUFuQixtQkFBbUIsV0FBbkIsbUJBQW1CLG1CQUZsQixNQUFNO3VGQUVQLG1CQUFtQjtjQUgvQixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYXNlRXZlbnRUcmlnZ2VyIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2Nhc2Utdmlldy9jYXNlLWV2ZW50LXRyaWdnZXIubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRXZlbnRUcmlnZ2VyU2VydmljZSB7XG5cbiAgcHVibGljIGV2ZW50VHJpZ2dlclNvdXJjZSA9IG5ldyBTdWJqZWN0PENhc2VFdmVudFRyaWdnZXI+KCk7XG5cbiAgcHVibGljIGFubm91bmNlRXZlbnRUcmlnZ2VyKGV2ZW50VHJpZ2dlcjogQ2FzZUV2ZW50VHJpZ2dlcikge1xuICAgIHRoaXMuZXZlbnRUcmlnZ2VyU291cmNlLm5leHQoZXZlbnRUcmlnZ2VyKTtcbiAgfVxuXG59XG4iXX0=