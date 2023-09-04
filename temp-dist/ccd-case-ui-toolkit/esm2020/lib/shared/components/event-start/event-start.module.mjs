import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { MultipleTasksExistComponent } from './components/multiple-tasks-exist/multiple-tasks-exist.component';
import { NoTasksAvailableComponent } from './components/no-tasks-available/no-tasks-available.component';
import { TaskAssignedComponent } from './components/task-assigned/task-assigned.component';
import { TaskCancelledComponent } from './components/task-cancelled/task-cancelled.component';
import { TaskConflictComponent } from './components/task-conflict/task-conflict.component';
import { TaskUnassignedComponent } from './components/task-unassigned/task-unassigned.component';
import { EventStartGuard } from './event-guard/event-start.guard';
import { EventStartComponent } from './event-start.component';
import { EventTasksResolverService } from './resolvers/event-tasks-resolver.service';
import { EventStartStateMachineService } from './services';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class EventStartModule {
}
EventStartModule.ɵfac = function EventStartModule_Factory(t) { return new (t || EventStartModule)(); };
EventStartModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: EventStartModule });
EventStartModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        EventStartGuard,
        EventTasksResolverService,
        EventStartStateMachineService
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventStartModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    RouterModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    EventStartComponent,
                    MultipleTasksExistComponent,
                    NoTasksAvailableComponent,
                    TaskAssignedComponent,
                    TaskCancelledComponent,
                    TaskConflictComponent,
                    TaskUnassignedComponent
                ],
                providers: [
                    EventStartGuard,
                    EventTasksResolverService,
                    EventStartStateMachineService
                ],
                exports: [
                    EventStartComponent,
                    TaskAssignedComponent,
                    TaskUnassignedComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(EventStartModule, { declarations: [EventStartComponent,
        MultipleTasksExistComponent,
        NoTasksAvailableComponent,
        TaskAssignedComponent,
        TaskCancelledComponent,
        TaskConflictComponent,
        TaskUnassignedComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule, i1.RpxTranslationModule], exports: [EventStartComponent,
        TaskAssignedComponent,
        TaskUnassignedComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtc3RhcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2V2ZW50LXN0YXJ0L2V2ZW50LXN0YXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFDL0csT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDekcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDM0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDM0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDakcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLFlBQVksQ0FBQzs7O0FBNkIzRCxNQUFNLE9BQU8sZ0JBQWdCOztnRkFBaEIsZ0JBQWdCO2tFQUFoQixnQkFBZ0I7dUVBWGhCO1FBQ1QsZUFBZTtRQUNmLHlCQUF5QjtRQUN6Qiw2QkFBNkI7S0FDOUIsWUFsQkMsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osb0JBQW9CLENBQUMsUUFBUSxFQUFFO3VGQXNCdEIsZ0JBQWdCO2NBM0I1QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osbUJBQW1CO29CQUNuQixZQUFZO29CQUNaLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtpQkFDaEM7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLG1CQUFtQjtvQkFDbkIsMkJBQTJCO29CQUMzQix5QkFBeUI7b0JBQ3pCLHFCQUFxQjtvQkFDckIsc0JBQXNCO29CQUN0QixxQkFBcUI7b0JBQ3JCLHVCQUF1QjtpQkFDeEI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGVBQWU7b0JBQ2YseUJBQXlCO29CQUN6Qiw2QkFBNkI7aUJBQzlCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsdUJBQXVCO2lCQUN4QjthQUNGOzt3RkFDWSxnQkFBZ0IsbUJBbkJ6QixtQkFBbUI7UUFDbkIsMkJBQTJCO1FBQzNCLHlCQUF5QjtRQUN6QixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLHFCQUFxQjtRQUNyQix1QkFBdUIsYUFadkIsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixZQUFZLHNDQWtCWixtQkFBbUI7UUFDbkIscUJBQXFCO1FBQ3JCLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBScHhUcmFuc2xhdGlvbk1vZHVsZSB9IGZyb20gJ3JweC14dWktdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgTXVsdGlwbGVUYXNrc0V4aXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL211bHRpcGxlLXRhc2tzLWV4aXN0L211bHRpcGxlLXRhc2tzLWV4aXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb1Rhc2tzQXZhaWxhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25vLXRhc2tzLWF2YWlsYWJsZS9uby10YXNrcy1hdmFpbGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IFRhc2tBc3NpZ25lZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90YXNrLWFzc2lnbmVkL3Rhc2stYXNzaWduZWQuY29tcG9uZW50JztcbmltcG9ydCB7IFRhc2tDYW5jZWxsZWRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGFzay1jYW5jZWxsZWQvdGFzay1jYW5jZWxsZWQuY29tcG9uZW50JztcbmltcG9ydCB7IFRhc2tDb25mbGljdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90YXNrLWNvbmZsaWN0L3Rhc2stY29uZmxpY3QuY29tcG9uZW50JztcbmltcG9ydCB7IFRhc2tVbmFzc2lnbmVkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Rhc2stdW5hc3NpZ25lZC90YXNrLXVuYXNzaWduZWQuY29tcG9uZW50JztcbmltcG9ydCB7IEV2ZW50U3RhcnRHdWFyZCB9IGZyb20gJy4vZXZlbnQtZ3VhcmQvZXZlbnQtc3RhcnQuZ3VhcmQnO1xuaW1wb3J0IHsgRXZlbnRTdGFydENvbXBvbmVudCB9IGZyb20gJy4vZXZlbnQtc3RhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IEV2ZW50VGFza3NSZXNvbHZlclNlcnZpY2UgfSBmcm9tICcuL3Jlc29sdmVycy9ldmVudC10YXNrcy1yZXNvbHZlci5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50U3RhcnRTdGF0ZU1hY2hpbmVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgUnB4VHJhbnNsYXRpb25Nb2R1bGUuZm9yQ2hpbGQoKVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBFdmVudFN0YXJ0Q29tcG9uZW50LFxuICAgIE11bHRpcGxlVGFza3NFeGlzdENvbXBvbmVudCxcbiAgICBOb1Rhc2tzQXZhaWxhYmxlQ29tcG9uZW50LFxuICAgIFRhc2tBc3NpZ25lZENvbXBvbmVudCxcbiAgICBUYXNrQ2FuY2VsbGVkQ29tcG9uZW50LFxuICAgIFRhc2tDb25mbGljdENvbXBvbmVudCxcbiAgICBUYXNrVW5hc3NpZ25lZENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBFdmVudFN0YXJ0R3VhcmQsXG4gICAgRXZlbnRUYXNrc1Jlc29sdmVyU2VydmljZSxcbiAgICBFdmVudFN0YXJ0U3RhdGVNYWNoaW5lU2VydmljZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRXZlbnRTdGFydENvbXBvbmVudCxcbiAgICBUYXNrQXNzaWduZWRDb21wb25lbnQsXG4gICAgVGFza1VuYXNzaWduZWRDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBFdmVudFN0YXJ0TW9kdWxlIHt9XG4iXX0=