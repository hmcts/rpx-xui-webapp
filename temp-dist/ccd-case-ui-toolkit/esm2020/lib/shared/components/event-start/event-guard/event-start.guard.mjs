import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SessionStorageService } from '../../../services';
import { WorkAllocationService } from '../../case-editor';
import * as i0 from "@angular/core";
import * as i1 from "../../case-editor";
import * as i2 from "@angular/router";
import * as i3 from "../../../services";
export class EventStartGuard {
    constructor(workAllocationService, router, sessionStorageService) {
        this.workAllocationService = workAllocationService;
        this.router = router;
        this.sessionStorageService = sessionStorageService;
    }
    canActivate(route) {
        const caseId = route.params['cid'];
        const eventId = route.params['eid'];
        const taskId = route.queryParams['tid'];
        // TODO: NavigationExtras should be used once Angular upgrade changes have been incorporated
        const isComplete = route.queryParams['isComplete'];
        const caseInfoStr = this.sessionStorageService.getItem('caseInfo');
        if (caseInfoStr) {
            const caseInfo = JSON.parse(caseInfoStr);
            if (caseInfo && caseInfo.cid === caseId) {
                if (isComplete) {
                    return of(true);
                }
                return this.workAllocationService.getTasksByCaseIdAndEventId(eventId, caseId, caseInfo.caseType, caseInfo.jurisdiction).pipe(switchMap((payload) => this.checkForTasks(payload, caseId, eventId, taskId)));
            }
        }
        return of(false);
    }
    checkTaskInEventNotRequired(payload, caseId, taskId) {
        if (!payload || !payload.tasks) {
            return true;
        }
        const taskNumber = payload.tasks.length;
        if (taskNumber === 0) {
            // if there are no tasks just carry on
            return true;
        }
        // Get number of tasks assigned to user
        const userInfoStr = this.sessionStorageService.getItem('userDetails');
        const userInfo = JSON.parse(userInfoStr);
        const tasksAssignedToUser = payload.tasks.filter(x => x.task_state !== 'unassigned' && x.assignee === userInfo.id || x.assignee === userInfo.uid);
        if (tasksAssignedToUser.length === 0) {
            // if no tasks assigned to user carry on
            return true;
        }
        else if (tasksAssignedToUser.length > 1 && !taskId) {
            // if more than one task assigned to the user then give multiple tasks error
            this.router.navigate([`/cases/case-details/${caseId}/multiple-tasks-exist`]);
            return false;
        }
        else {
            let task;
            if (taskId) {
                task = payload.tasks.find(x => x.id === taskId);
            }
            else {
                task = tasksAssignedToUser[0];
            }
            // if one task assigned to user, allow user to complete event
            this.sessionStorageService.setItem('taskToComplete', JSON.stringify(task));
            return true;
        }
    }
    checkForTasks(payload, caseId, eventId, taskId) {
        // Clear taskToComplete from session as we will be starting the process for new task
        this.sessionStorageService.removeItem('taskToComplete');
        if (payload.task_required_for_event) {
            // There are some issues in EventTriggerResolver/CaseService and/or CCD for some events
            // which triggers the CanActivate guard again.
            // If event start is initiated again, then we do not need to perform state machine processing again.
            // https://tools.hmcts.net/jira/browse/EUI-5489
            if (this.router && this.router.url && this.router.url.includes('event-start')) {
                return of(true);
            }
            this.router.navigate([`/cases/case-details/${caseId}/event-start`], { queryParams: { caseId, eventId, taskId } });
            return of(false);
        }
        else {
            return of(this.checkTaskInEventNotRequired(payload, caseId, taskId));
        }
    }
}
EventStartGuard.ɵfac = function EventStartGuard_Factory(t) { return new (t || EventStartGuard)(i0.ɵɵinject(i1.WorkAllocationService), i0.ɵɵinject(i2.Router), i0.ɵɵinject(i3.SessionStorageService)); };
EventStartGuard.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EventStartGuard, factory: EventStartGuard.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventStartGuard, [{
        type: Injectable
    }], function () { return [{ type: i1.WorkAllocationService }, { type: i2.Router }, { type: i3.SessionStorageService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtc3RhcnQuZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvZXZlbnQtc3RhcnQvZXZlbnQtZ3VhcmQvZXZlbnQtc3RhcnQuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXVDLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlFLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7OztBQUcxRCxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUE2QixxQkFBNEMsRUFDdEQsTUFBYyxFQUNkLHFCQUE0QztRQUZsQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQ3RELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO0lBQy9ELENBQUM7SUFFTSxXQUFXLENBQUMsS0FBNkI7UUFDOUMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEMsNEZBQTRGO1FBQzVGLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENB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QixDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hELElBQUksT0FBTyxDQUFDLHVCQUF1QixFQUFFO1lBQ25DLHVGQUF1RjtZQUN2Riw4Q0FBOEM7WUFDOUMsb0dBQW9HO1lBQ3BHLCtDQUErQztZQUMvQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUM3RSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQjtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsdUJBQXVCLE1BQU0sY0FBYyxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsSCxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQjthQUFNO1lBQ0wsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7OzhFQWhGVSxlQUFlO3FFQUFmLGVBQWUsV0FBZixlQUFlO3VGQUFmLGVBQWU7Y0FEM0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIENhbkFjdGl2YXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRhc2tQYXlsb2FkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL3dvcmstYWxsb2NhdGlvbi9UYXNrUGF5bG9hZCc7XG5pbXBvcnQgeyBTZXNzaW9uU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBXb3JrQWxsb2NhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jYXNlLWVkaXRvcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFdmVudFN0YXJ0R3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgd29ya0FsbG9jYXRpb25TZXJ2aWNlOiBXb3JrQWxsb2NhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlc3Npb25TdG9yYWdlU2VydmljZTogU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlKSB7XG4gIH1cblxuICBwdWJsaWMgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBjYXNlSWQgPSByb3V0ZS5wYXJhbXNbJ2NpZCddO1xuICAgIGNvbnN0IGV2ZW50SWQgPSByb3V0ZS5wYXJhbXNbJ2VpZCddO1xuICAgIGNvbnN0IHRhc2tJZCA9IHJvdXRlLnF1ZXJ5UGFyYW1zWyd0aWQnXTtcblxuICAgIC8vIFRPRE86IE5hdmlnYXRpb25FeHRyYXMgc2hvdWxkIGJlIHVzZWQgb25jZSBBbmd1bGFyIHVwZ3JhZGUgY2hhbmdlcyBoYXZlIGJlZW4gaW5jb3Jwb3JhdGVkXG4gICAgY29uc3QgaXNDb21wbGV0ZSA9IHJvdXRlLnF1ZXJ5UGFyYW1zWydpc0NvbXBsZXRlJ107XG4gICAgY29uc3QgY2FzZUluZm9TdHIgPSB0aGlzLnNlc3Npb25TdG9yYWdlU2VydmljZS5nZXRJdGVtKCdjYXNlSW5mbycpO1xuICAgIGlmIChjYXNlSW5mb1N0cikge1xuICAgICAgY29uc3QgY2FzZUluZm8gPSBKU09OLnBhcnNlKGNhc2VJbmZvU3RyKTtcbiAgICAgIGlmIChjYXNlSW5mbyAmJiBjYXNlSW5mby5jaWQgPT09IGNhc2VJZCkge1xuICAgICAgICBpZiAoaXNDb21wbGV0ZSkge1xuICAgICAgICAgIHJldHVybiBvZih0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy53b3JrQWxsb2NhdGlvblNlcnZpY2UuZ2V0VGFza3NCeUNhc2VJZEFuZEV2ZW50SWQoZXZlbnRJZCwgY2FzZUlkLCBjYXNlSW5mby5jYXNlVHlwZSwgY2FzZUluZm8uanVyaXNkaWN0aW9uKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgocGF5bG9hZDogVGFza1BheWxvYWQpID0+IHRoaXMuY2hlY2tGb3JUYXNrcyhwYXlsb2FkLCBjYXNlSWQsIGV2ZW50SWQsIHRhc2tJZCkpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvZihmYWxzZSk7XG4gIH1cblxuICBwdWJsaWMgY2hlY2tUYXNrSW5FdmVudE5vdFJlcXVpcmVkKHBheWxvYWQ6IFRhc2tQYXlsb2FkLCBjYXNlSWQ6IHN0cmluZywgdGFza0lkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIXBheWxvYWQgfHwgIXBheWxvYWQudGFza3MpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCB0YXNrTnVtYmVyID0gcGF5bG9hZC50YXNrcy5sZW5ndGg7XG4gICAgaWYgKHRhc2tOdW1iZXIgPT09IDApIHtcbiAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyB0YXNrcyBqdXN0IGNhcnJ5IG9uXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gR2V0IG51bWJlciBvZiB0YXNrcyBhc3NpZ25lZCB0byB1c2VyXG4gICAgY29uc3QgdXNlckluZm9TdHIgPSB0aGlzLnNlc3Npb25TdG9yYWdlU2VydmljZS5nZXRJdGVtKCd1c2VyRGV0YWlscycpO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gSlNPTi5wYXJzZSh1c2VySW5mb1N0cik7XG4gICAgY29uc3QgdGFza3NBc3NpZ25lZFRvVXNlciA9IHBheWxvYWQudGFza3MuZmlsdGVyKHggPT5cbiAgICAgIHgudGFza19zdGF0ZSAhPT0gJ3VuYXNzaWduZWQnICYmIHguYXNzaWduZWUgPT09IHVzZXJJbmZvLmlkIHx8IHguYXNzaWduZWUgPT09IHVzZXJJbmZvLnVpZFxuICAgICk7XG5cbiAgICBpZiAodGFza3NBc3NpZ25lZFRvVXNlci5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIGlmIG5vIHRhc2tzIGFzc2lnbmVkIHRvIHVzZXIgY2Fycnkgb25cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGFza3NBc3NpZ25lZFRvVXNlci5sZW5ndGggPiAxICYmICF0YXNrSWQpIHtcbiAgICAgIC8vIGlmIG1vcmUgdGhhbiBvbmUgdGFzayBhc3NpZ25lZCB0byB0aGUgdXNlciB0aGVuIGdpdmUgbXVsdGlwbGUgdGFza3MgZXJyb3JcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtgL2Nhc2VzL2Nhc2UtZGV0YWlscy8ke2Nhc2VJZH0vbXVsdGlwbGUtdGFza3MtZXhpc3RgXSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0YXNrOiBhbnk7XG4gICAgICBpZiAodGFza0lkKSB7XG4gICAgICAgIHRhc2sgPSBwYXlsb2FkLnRhc2tzLmZpbmQoeCA9PiB4LmlkID09PSB0YXNrSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFzayA9IHRhc2tzQXNzaWduZWRUb1VzZXJbMF07XG4gICAgICB9XG4gICAgICAvLyBpZiBvbmUgdGFzayBhc3NpZ25lZCB0byB1c2VyLCBhbGxvdyB1c2VyIHRvIGNvbXBsZXRlIGV2ZW50XG4gICAgICB0aGlzLnNlc3Npb25TdG9yYWdlU2VydmljZS5zZXRJdGVtKCd0YXNrVG9Db21wbGV0ZScsIEpTT04uc3RyaW5naWZ5KHRhc2spKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tGb3JUYXNrcyhwYXlsb2FkOiBUYXNrUGF5bG9hZCwgY2FzZUlkOiBzdHJpbmcsIGV2ZW50SWQ6IHN0cmluZywgdGFza0lkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAvLyBDbGVhciB0YXNrVG9Db21wbGV0ZSBmcm9tIHNlc3Npb24gYXMgd2Ugd2lsbCBiZSBzdGFydGluZyB0aGUgcHJvY2VzcyBmb3IgbmV3IHRhc2tcbiAgICB0aGlzLnNlc3Npb25TdG9yYWdlU2VydmljZS5yZW1vdmVJdGVtKCd0YXNrVG9Db21wbGV0ZScpO1xuICAgIGlmIChwYXlsb2FkLnRhc2tfcmVxdWlyZWRfZm9yX2V2ZW50KSB7XG4gICAgICAvLyBUaGVyZSBhcmUgc29tZSBpc3N1ZXMgaW4gRXZlbnRUcmlnZ2VyUmVzb2x2ZXIvQ2FzZVNlcnZpY2UgYW5kL29yIENDRCBmb3Igc29tZSBldmVudHNcbiAgICAgIC8vIHdoaWNoIHRyaWdnZXJzIHRoZSBDYW5BY3RpdmF0ZSBndWFyZCBhZ2Fpbi5cbiAgICAgIC8vIElmIGV2ZW50IHN0YXJ0IGlzIGluaXRpYXRlZCBhZ2FpbiwgdGhlbiB3ZSBkbyBub3QgbmVlZCB0byBwZXJmb3JtIHN0YXRlIG1hY2hpbmUgcHJvY2Vzc2luZyBhZ2Fpbi5cbiAgICAgIC8vIGh0dHBzOi8vdG9vbHMuaG1jdHMubmV0L2ppcmEvYnJvd3NlL0VVSS01NDg5XG4gICAgICBpZiAodGhpcy5yb3V0ZXIgJiYgdGhpcy5yb3V0ZXIudXJsICYmIHRoaXMucm91dGVyLnVybC5pbmNsdWRlcygnZXZlbnQtc3RhcnQnKSkge1xuICAgICAgICByZXR1cm4gb2YodHJ1ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYC9jYXNlcy9jYXNlLWRldGFpbHMvJHtjYXNlSWR9L2V2ZW50LXN0YXJ0YF0sIHsgcXVlcnlQYXJhbXM6IHsgY2FzZUlkLCBldmVudElkLCB0YXNrSWQgfSB9KTtcbiAgICAgIHJldHVybiBvZihmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZih0aGlzLmNoZWNrVGFza0luRXZlbnROb3RSZXF1aXJlZChwYXlsb2FkLCBjYXNlSWQsIHRhc2tJZCkpO1xuICAgIH1cbiAgfVxufVxuIl19