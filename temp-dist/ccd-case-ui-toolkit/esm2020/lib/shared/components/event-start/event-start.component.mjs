import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '../../services/session/session-storage.service';
import { EventStartStateMachineService } from './services/event-start-state-machine.service';
import * as i0 from "@angular/core";
import * as i1 from "./services/event-start-state-machine.service";
import * as i2 from "@angular/router";
import * as i3 from "../../services/session/session-storage.service";
export class EventStartComponent {
    constructor(service, router, route, sessionStorageService) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.sessionStorageService = sessionStorageService;
    }
    ngOnInit() {
        // Get task and case id payload from route data
        const tasks = this.route.snapshot.data.tasks;
        const caseId = this.route.snapshot.data.case.case_id;
        const eventId = this.route.snapshot.queryParams['eventId'];
        const taskId = this.route.snapshot.queryParams['taskId'];
        // Setup the context
        this.context = {
            tasks,
            caseId,
            eventId,
            taskId,
            router: this.router,
            route: this.route,
            sessionStorageService: this.sessionStorageService
        };
        // Initialise state machine
        this.service = new EventStartStateMachineService();
        this.stateMachine = this.service.initialiseStateMachine(this.context);
        // Create states
        this.service.createStates(this.stateMachine);
        // Add transitions for the states
        this.service.addTransitions();
        // Start state machine
        this.service.startStateMachine(this.stateMachine);
    }
}
EventStartComponent.ɵfac = function EventStartComponent_Factory(t) { return new (t || EventStartComponent)(i0.ɵɵdirectiveInject(i1.EventStartStateMachineService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i3.SessionStorageService)); };
EventStartComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventStartComponent, selectors: [["ccd-event-start"]], decls: 0, vars: 0, template: function EventStartComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventStartComponent, [{
        type: Component,
        args: [{ selector: 'ccd-event-start', template: "" }]
    }], function () { return [{ type: i1.EventStartStateMachineService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: i3.SessionStorageService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtc3RhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2V2ZW50LXN0YXJ0L2V2ZW50LXN0YXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHekQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFFdkYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sOENBQThDLENBQUM7Ozs7O0FBTTdGLE1BQU0sT0FBTyxtQkFBbUI7SUFLOUIsWUFBb0IsT0FBc0MsRUFDdkMsTUFBYyxFQUNkLEtBQXFCLEVBQ3JCLHFCQUE0QztRQUgzQyxZQUFPLEdBQVAsT0FBTyxDQUErQjtRQUN2QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtJQUMvRCxDQUFDO0lBRU0sUUFBUTtRQUNiLCtDQUErQztRQUMvQyxNQUFNLEtBQUssR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3JELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3JELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFekQsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDYixLQUFLO1lBQ0wsTUFBTTtZQUNOLE9BQU87WUFDUCxNQUFNO1lBQ04sTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCO1NBQ2xELENBQUM7UUFFRiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLDZCQUE2QixFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0RSxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdDLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzlCLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwRCxDQUFDOztzRkF0Q1UsbUJBQW1CO3NFQUFuQixtQkFBbUI7dUZBQW5CLG1CQUFtQjtjQUovQixTQUFTOzJCQUNFLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN0YXRlTWFjaGluZSB9IGZyb20gJ0BlZGl1bS9mc20nO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gJy4uLy4uL2RvbWFpbi93b3JrLWFsbG9jYXRpb24vVGFzayc7XG5pbXBvcnQgeyBTZXNzaW9uU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zZXNzaW9uL3Nlc3Npb24tc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50U3RhcnRTdGF0ZU1hY2hpbmVDb250ZXh0IH0gZnJvbSAnLi9tb2RlbHMvZXZlbnQtc3RhcnQtc3RhdGUtbWFjaGluZS1jb250ZXh0Lm1vZGVsJztcbmltcG9ydCB7IEV2ZW50U3RhcnRTdGF0ZU1hY2hpbmVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ldmVudC1zdGFydC1zdGF0ZS1tYWNoaW5lLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtZXZlbnQtc3RhcnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZXZlbnQtc3RhcnQuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEV2ZW50U3RhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBzdGF0ZU1hY2hpbmU6IFN0YXRlTWFjaGluZTtcbiAgcHVibGljIGNvbnRleHQ6IEV2ZW50U3RhcnRTdGF0ZU1hY2hpbmVDb250ZXh0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogRXZlbnRTdGFydFN0YXRlTWFjaGluZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlc3Npb25TdG9yYWdlU2VydmljZTogU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gR2V0IHRhc2sgYW5kIGNhc2UgaWQgcGF5bG9hZCBmcm9tIHJvdXRlIGRhdGFcbiAgICBjb25zdCB0YXNrczogVGFza1tdID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5kYXRhLnRhc2tzO1xuICAgIGNvbnN0IGNhc2VJZCA9IHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlLmNhc2VfaWQ7XG4gICAgY29uc3QgZXZlbnRJZCA9IHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXNbJ2V2ZW50SWQnXTtcbiAgICBjb25zdCB0YXNrSWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zWyd0YXNrSWQnXTtcblxuICAgIC8vIFNldHVwIHRoZSBjb250ZXh0XG4gICAgdGhpcy5jb250ZXh0ID0ge1xuICAgICAgdGFza3MsXG4gICAgICBjYXNlSWQsXG4gICAgICBldmVudElkLFxuICAgICAgdGFza0lkLFxuICAgICAgcm91dGVyOiB0aGlzLnJvdXRlcixcbiAgICAgIHJvdXRlOiB0aGlzLnJvdXRlLFxuICAgICAgc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlOiB0aGlzLnNlc3Npb25TdG9yYWdlU2VydmljZVxuICAgIH07XG5cbiAgICAvLyBJbml0aWFsaXNlIHN0YXRlIG1hY2hpbmVcbiAgICB0aGlzLnNlcnZpY2UgPSBuZXcgRXZlbnRTdGFydFN0YXRlTWFjaGluZVNlcnZpY2UoKTtcbiAgICB0aGlzLnN0YXRlTWFjaGluZSA9IHRoaXMuc2VydmljZS5pbml0aWFsaXNlU3RhdGVNYWNoaW5lKHRoaXMuY29udGV4dCk7XG4gICAgLy8gQ3JlYXRlIHN0YXRlc1xuICAgIHRoaXMuc2VydmljZS5jcmVhdGVTdGF0ZXModGhpcy5zdGF0ZU1hY2hpbmUpO1xuICAgIC8vIEFkZCB0cmFuc2l0aW9ucyBmb3IgdGhlIHN0YXRlc1xuICAgIHRoaXMuc2VydmljZS5hZGRUcmFuc2l0aW9ucygpO1xuICAgIC8vIFN0YXJ0IHN0YXRlIG1hY2hpbmVcbiAgICB0aGlzLnNlcnZpY2Uuc3RhcnRTdGF0ZU1hY2hpbmUodGhpcy5zdGF0ZU1hY2hpbmUpO1xuICB9XG59XG4iXX0=