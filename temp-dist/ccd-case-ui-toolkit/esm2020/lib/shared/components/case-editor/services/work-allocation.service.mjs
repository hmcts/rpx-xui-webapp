import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AbstractAppConfig } from '../../../../app.config';
import { AlertService, HttpErrorService, HttpService, SessionStorageService } from '../../../services';
import * as i0 from "@angular/core";
import * as i1 from "../../../services";
import * as i2 from "../../../../app.config";
export const MULTIPLE_TASKS_FOUND = 'More than one task found!';
export class WorkAllocationService {
    constructor(http, appConfig, errorService, alertService, sessionStorageService) {
        this.http = http;
        this.appConfig = appConfig;
        this.errorService = errorService;
        this.alertService = alertService;
        this.sessionStorageService = sessionStorageService;
        // Check to see if work allocation is enabled
    }
    /**
     * Call the API to get tasks matching the search criteria.
     * @param searchRequest The search parameters that specify which tasks to match.
     */
    searchTasks(searchRequest) {
        // Do not need to check if WA enabled as parent method will do that
        const url = `${this.appConfig.getWorkAllocationApiUrl()}/searchForCompletable`;
        return this.http
            .post(url, { searchRequest }, null, false)
            .pipe(map(response => response), catchError(error => {
            this.errorService.setError(error);
            // explicitly eat away 401 error and 400 error
            if (error && error.status && (error.status === 401 || error.status === 400)) {
                // do nothing
                console.log('error status 401 or 400', error);
            }
            else {
                return throwError(error);
            }
        }));
    }
    isWAEnabled(jurisdiction, caseType) {
        this.features = this.appConfig.getWAServiceConfig();
        let enabled = false;
        if (!jurisdiction || !caseType) {
            const caseInfo = JSON.parse(this.sessionStorageService.getItem('caseInfo'));
            jurisdiction = caseInfo.jurisdiction;
            caseType = caseInfo.caseType;
        }
        if (!this.features || !this.features.configurations) {
            return false;
        }
        this.features.configurations.forEach(serviceConfig => {
            if (serviceConfig.serviceName === jurisdiction && (serviceConfig.caseTypes.indexOf(caseType) !== -1)) {
                enabled = true;
            }
        });
        return enabled;
    }
    /**
     * Call the API to assign a task.
     * @param taskId specifies which task should be assigned.
     * @param userId specifies the user the task should be assigned to.
     */
    assignTask(taskId, userId) {
        if (!this.isWAEnabled()) {
            return of(null);
        }
        const url = `${this.appConfig.getWorkAllocationApiUrl()}/task/${taskId}/assign`;
        return this.http
            .post(url, { userId })
            .pipe(catchError(error => {
            this.errorService.setError(error);
            return throwError(error);
        }));
    }
    /**
     * Call the API to complete a task.
     * @param taskId specifies which task should be completed.
     */
    completeTask(taskId) {
        if (!this.isWAEnabled()) {
            return of(null);
        }
        const url = `${this.appConfig.getWorkAllocationApiUrl()}/task/${taskId}/complete`;
        return this.http
            .post(url, {})
            .pipe(catchError(error => {
            this.errorService.setError(error);
            // this will subscribe to get the user details and decide whether to display an error message
            this.http.get(this.appConfig.getUserInfoApiUrl()).pipe(map(response => response)).subscribe((response) => {
                this.handleTaskCompletionError(response);
            });
            return throwError(error);
        }));
    }
    /**
     * Call the API to assign and complete a task.
     * @param taskId specifies which task should be completed.
     */
    assignAndCompleteTask(taskId) {
        if (!this.isWAEnabled()) {
            return of(null);
        }
        const url = `${this.appConfig.getWorkAllocationApiUrl()}/task/${taskId}/complete`;
        return this.http
            .post(url, {
            completion_options: {
                assign_and_complete: true
            }
        })
            .pipe(catchError(error => {
            this.errorService.setError(error);
            // this will subscribe to get the user details and decide whether to display an error message
            this.http.get(this.appConfig.getUserInfoApiUrl()).pipe(map(response => response)).subscribe((response) => {
                this.handleTaskCompletionError(response);
            });
            return throwError(error);
        }));
    }
    /**
     * Handles the response from the observable to get the user details when task is completed.
     * @param response is the response given from the observable which contains the user detaild.
     */
    handleTaskCompletionError(response) {
        const userDetails = response;
        if (this.userIsCaseworker(userDetails.userInfo.roles)) {
            // when submitting the completion of task if not yet rendered cases/case confirm then preserve the alert for re-rendering
            this.alertService.setPreserveAlerts(true, ['cases/case', 'submit']);
            this.alertService.warning({ phrase: 'A task could not be completed successfully. Please complete the task associated with the case manually.' });
        }
    }
    /**
     * Returns true if the user's role is equivalent to a caseworker.
     * @param roles is the list of roles found from the current user.
     */
    userIsCaseworker(roles) {
        const lowerCaseRoles = roles.map(role => role.toLowerCase());
        // When/if lib & target permanently change to es2016, replace indexOf with includes
        return (lowerCaseRoles.indexOf(WorkAllocationService.iACCaseOfficer) !== -1)
            || (lowerCaseRoles.indexOf(WorkAllocationService.iACAdmOfficer) !== -1);
    }
    /**
     * Look for open tasks for a case and event combination. There are 5 possible scenarios:
     *   1. No tasks found                              => Success.
     *   2. One task found => Mark as done              => Success.
     *   3. One task found => Mark as done throws error => Failure.
     *   4. More than one task found                    => Failure.
     *   5. Search call throws an error                 => Failure.
     * @param ccdId The ID of the case to find tasks for.
     * @param eventId The ID of the event to find tasks for.
     */
    completeAppropriateTask(ccdId, eventId, jurisdiction, caseTypeId) {
        if (!this.isWAEnabled(jurisdiction, caseTypeId)) {
            return of(null);
        }
        const taskSearchParameter = {
            ccdId,
            eventId,
            jurisdiction,
            caseTypeId
        };
        return this.searchTasks(taskSearchParameter)
            .pipe(map((response) => {
            const tasks = response.tasks;
            if (tasks && tasks.length > 0) {
                if (tasks.length === 1) {
                    this.completeTask(tasks[0].id).subscribe();
                }
                else {
                    // This is a problem. Throw an appropriate error.
                    throw new Error(MULTIPLE_TASKS_FOUND);
                }
            }
            return true; // All good. Nothing to see here.
        }), catchError(error => {
            // Simply rethrow it.
            return throwError(error);
        }));
    }
    /**
     * Return tasks for case and event.
     */
    getTasksByCaseIdAndEventId(eventId, caseId, caseType, jurisdiction) {
        const defaultPayload = {
            task_required_for_event: false,
            tasks: []
        };
        if (!this.isWAEnabled()) {
            return of(defaultPayload);
        }
        return this.http.get(`${this.appConfig.getWorkAllocationApiUrl()}/case/tasks/${caseId}/event/${eventId}/caseType/${caseType}/jurisdiction/${jurisdiction}`);
    }
    /**
     * Call the API to get a task
     */
    getTask(taskId) {
        if (!this.isWAEnabled()) {
            return of({ task: null });
        }
        return this.http.get(`${this.appConfig.getWorkAllocationApiUrl()}/task/${taskId}`);
    }
}
WorkAllocationService.iACCaseOfficer = 'caseworker-ia-caseofficer';
WorkAllocationService.iACAdmOfficer = 'caseworker-ia-admofficer';
WorkAllocationService.ɵfac = function WorkAllocationService_Factory(t) { return new (t || WorkAllocationService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AbstractAppConfig), i0.ɵɵinject(i1.HttpErrorService), i0.ɵɵinject(i1.AlertService), i0.ɵɵinject(i1.SessionStorageService)); };
WorkAllocationService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WorkAllocationService, factory: WorkAllocationService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkAllocationService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.AbstractAppConfig }, { type: i1.HttpErrorService }, { type: i1.AlertService }, { type: i1.SessionStorageService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay1hbGxvY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS1lZGl0b3Ivc2VydmljZXMvd29yay1hbGxvY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7QUFFdkcsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsMkJBQTJCLENBQUM7QUFHaEUsTUFBTSxPQUFPLHFCQUFxQjtJQU1oQyxZQUNtQixJQUFpQixFQUNqQixTQUE0QixFQUM1QixZQUE4QixFQUM5QixZQUEwQixFQUMxQixxQkFBNEM7UUFKNUMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFtQjtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBa0I7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUU3RCw2Q0FBNkM7SUFDL0MsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFdBQVcsQ0FBQyxhQUFrQztRQUNuRCxtRUFBbUU7UUFDbkUsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFF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QUFvQjtRQUN2RyxNQUFNLGNBQWMsR0FBZ0I7WUFDbEMsdUJBQXVCLEVBQUUsS0FBSztZQUM5QixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsZUFBZSxNQUFNLFVBQVUsT0FBTyxhQUFhLFFBQVEsaUJBQWlCLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDOUosQ0FBQztJQUVGOztPQUVHO0lBQ0ksT0FBTyxDQUFDLE1BQWM7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN2QixPQUFPLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsU0FBUyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7O0FBdk5jLG9DQUFjLEdBQUcsMkJBQTJCLENBQUM7QUFDN0MsbUNBQWEsR0FBRywwQkFBMEIsQ0FBQzswRkFGOUMscUJBQXFCOzJFQUFyQixxQkFBcUIsV0FBckIscUJBQXFCO3VGQUFyQixxQkFBcUI7Y0FEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBYnN0cmFjdEFwcENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgVGFza1NlYXJjaFBhcmFtZXRlciwgV0FGZWF0dXJlQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluJztcbmltcG9ydCB7IFVzZXJEZXRhaWxzIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL3VzZXIvdXNlci1kZXRhaWxzLm1vZGVsJztcbmltcG9ydCB7IFRhc2tSZXNwb25lIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL3dvcmstYWxsb2NhdGlvbi90YXNrLXJlc3BvbnNlLm1vZGVsJztcbmltcG9ydCB7IFRhc2tQYXlsb2FkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL3dvcmstYWxsb2NhdGlvbi9UYXNrUGF5bG9hZCc7XG5pbXBvcnQgeyBBbGVydFNlcnZpY2UsIEh0dHBFcnJvclNlcnZpY2UsIEh0dHBTZXJ2aWNlLCBTZXNzaW9uU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcyc7XG5cbmV4cG9ydCBjb25zdCBNVUxUSVBMRV9UQVNLU19GT1VORCA9ICdNb3JlIHRoYW4gb25lIHRhc2sgZm91bmQhJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdvcmtBbGxvY2F0aW9uU2VydmljZSB7XG4gIHB1YmxpYyBzdGF0aWMgaUFDQ2FzZU9mZmljZXIgPSAnY2FzZXdvcmtlci1pYS1jYXNlb2ZmaWNlcic7XG4gIHB1YmxpYyBzdGF0aWMgaUFDQWRtT2ZmaWNlciA9ICdjYXNld29ya2VyLWlhLWFkbW9mZmljZXInO1xuXG4gIHByaXZhdGUgZmVhdHVyZXM6IFdBRmVhdHVyZUNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IGh0dHA6IEh0dHBTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXBwQ29uZmlnOiBBYnN0cmFjdEFwcENvbmZpZyxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVycm9yU2VydmljZTogSHR0cEVycm9yU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFsZXJ0U2VydmljZTogQWxlcnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlOiBTZXNzaW9uU3RvcmFnZVNlcnZpY2VcbiAgKSB7XG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdvcmsgYWxsb2NhdGlvbiBpcyBlbmFibGVkXG4gIH1cblxuICAvKipcbiAgICogQ2FsbCB0aGUgQVBJIHRvIGdldCB0YXNrcyBtYXRjaGluZyB0aGUgc2VhcmNoIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gc2VhcmNoUmVxdWVzdCBUaGUgc2VhcmNoIHBhcmFtZXRlcnMgdGhhdCBzcGVjaWZ5IHdoaWNoIHRhc2tzIHRvIG1hdGNoLlxuICAgKi9cbiAgcHVibGljIHNlYXJjaFRhc2tzKHNlYXJjaFJlcXVlc3Q6IFRhc2tTZWFyY2hQYXJhbWV0ZXIpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuICAgIC8vIERvIG5vdCBuZWVkIHRvIGNoZWNrIGlmIFdBIGVuYWJsZWQgYXMgcGFyZW50IG1ldGhvZCB3aWxsIGRvIHRoYXRcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFwcENvbmZpZy5nZXRXb3JrQWxsb2NhdGlvbkFwaVVybCgpfS9zZWFyY2hGb3JDb21wbGV0YWJsZWA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3QodXJsLCB7c2VhcmNoUmVxdWVzdH0sIG51bGwsIGZhbHNlKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChyZXNwb25zZSA9PiByZXNwb25zZSksXG4gICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNldEVycm9yKGVycm9yKTtcbiAgICAgICAgICAvLyBleHBsaWNpdGx5IGVhdCBhd2F5IDQwMSBlcnJvciBhbmQgNDAwIGVycm9yXG4gICAgICAgICAgaWYgKGVycm9yICYmIGVycm9yLnN0YXR1cyAmJiAoZXJyb3Iuc3RhdHVzID09PSA0MDEgfHwgZXJyb3Iuc3RhdHVzID09PSA0MDApKSB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3Igc3RhdHVzIDQwMSBvciA0MDAnLCBlcnJvcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1dBRW5hYmxlZChqdXJpc2RpY3Rpb24/OiBzdHJpbmcsIGNhc2VUeXBlPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdGhpcy5mZWF0dXJlcyA9IHRoaXMuYXBwQ29uZmlnLmdldFdBU2VydmljZUNvbmZpZygpO1xuICAgIGxldCBlbmFibGVkID0gZmFsc2U7XG4gICAgaWYgKCFqdXJpc2RpY3Rpb24gfHwgIWNhc2VUeXBlKSB7XG4gICAgICBjb25zdCBjYXNlSW5mbyA9IEpTT04ucGFyc2UodGhpcy5zZXNzaW9uU3RvcmFnZVNlcnZpY2UuZ2V0SXRlbSgnY2FzZUluZm8nKSk7XG4gICAgICBqdXJpc2RpY3Rpb24gPSBjYXNlSW5mby5qdXJpc2RpY3Rpb247XG4gICAgICBjYXNlVHlwZSA9IGNhc2VJbmZvLmNhc2VUeXBlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuZmVhdHVyZXMgfHwgIXRoaXMuZmVhdHVyZXMuY29uZmlndXJhdGlvbnMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5mZWF0dXJlcy5jb25maWd1cmF0aW9ucy5mb3JFYWNoKHNlcnZpY2VDb25maWcgPT4ge1xuICAgICAgaWYgKHNlcnZpY2VDb25maWcuc2VydmljZU5hbWUgPT09IGp1cmlzZGljdGlvbiAmJiAoc2VydmljZUNvbmZpZy5jYXNlVHlwZXMuaW5kZXhPZihjYXNlVHlwZSkgIT09IC0xKSkge1xuICAgICAgICAgIGVuYWJsZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBlbmFibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgdGhlIEFQSSB0byBhc3NpZ24gYSB0YXNrLlxuICAgKiBAcGFyYW0gdGFza0lkIHNwZWNpZmllcyB3aGljaCB0YXNrIHNob3VsZCBiZSBhc3NpZ25lZC5cbiAgICogQHBhcmFtIHVzZXJJZCBzcGVjaWZpZXMgdGhlIHVzZXIgdGhlIHRhc2sgc2hvdWxkIGJlIGFzc2lnbmVkIHRvLlxuICAgKi9cbiAgcHVibGljIGFzc2lnblRhc2sodGFza0lkOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAoIXRoaXMuaXNXQUVuYWJsZWQoKSkge1xuICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFwcENvbmZpZy5nZXRXb3JrQWxsb2NhdGlvbkFwaVVybCgpfS90YXNrLyR7dGFza0lkfS9hc3NpZ25gO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0KHVybCwge3VzZXJJZH0pXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2Uuc2V0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCB0aGUgQVBJIHRvIGNvbXBsZXRlIGEgdGFzay5cbiAgICogQHBhcmFtIHRhc2tJZCBzcGVjaWZpZXMgd2hpY2ggdGFzayBzaG91bGQgYmUgY29tcGxldGVkLlxuICAgKi9cbiAgcHVibGljIGNvbXBsZXRlVGFzayh0YXNrSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgaWYgKCF0aGlzLmlzV0FFbmFibGVkKCkpIHtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5hcHBDb25maWcuZ2V0V29ya0FsbG9jYXRpb25BcGlVcmwoKX0vdGFzay8ke3Rhc2tJZH0vY29tcGxldGVgO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0KHVybCwge30pXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2Uuc2V0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgIC8vIHRoaXMgd2lsbCBzdWJzY3JpYmUgdG8gZ2V0IHRoZSB1c2VyIGRldGFpbHMgYW5kIGRlY2lkZSB3aGV0aGVyIHRvIGRpc3BsYXkgYW4gZXJyb3IgbWVzc2FnZVxuICAgICAgICAgIHRoaXMuaHR0cC5nZXQodGhpcy5hcHBDb25maWcuZ2V0VXNlckluZm9BcGlVcmwoKSkucGlwZShtYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UpKS5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVRhc2tDb21wbGV0aW9uRXJyb3IocmVzcG9uc2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCB0aGUgQVBJIHRvIGFzc2lnbiBhbmQgY29tcGxldGUgYSB0YXNrLlxuICAgKiBAcGFyYW0gdGFza0lkIHNwZWNpZmllcyB3aGljaCB0YXNrIHNob3VsZCBiZSBjb21wbGV0ZWQuXG4gICAqL1xuICBwdWJsaWMgYXNzaWduQW5kQ29tcGxldGVUYXNrKHRhc2tJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAoIXRoaXMuaXNXQUVuYWJsZWQoKSkge1xuICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFwcENvbmZpZy5nZXRXb3JrQWxsb2NhdGlvbkFwaVVybCgpfS90YXNrLyR7dGFza0lkfS9jb21wbGV0ZWA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3QodXJsLCB7XG4gICAgICAgIGNvbXBsZXRpb25fb3B0aW9uczoge1xuICAgICAgICAgIGFzc2lnbl9hbmRfY29tcGxldGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5zZXRFcnJvcihlcnJvcik7XG4gICAgICAgICAgLy8gdGhpcyB3aWxsIHN1YnNjcmliZSB0byBnZXQgdGhlIHVzZXIgZGV0YWlscyBhbmQgZGVjaWRlIHdoZXRoZXIgdG8gZGlzcGxheSBhbiBlcnJvciBtZXNzYWdlXG4gICAgICAgICAgdGhpcy5odHRwLmdldCh0aGlzLmFwcENvbmZpZy5nZXRVc2VySW5mb0FwaVVybCgpKS5waXBlKG1hcChyZXNwb25zZSA9PiByZXNwb25zZSkpLnN1YnNjcmliZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVGFza0NvbXBsZXRpb25FcnJvcihyZXNwb25zZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSByZXNwb25zZSBmcm9tIHRoZSBvYnNlcnZhYmxlIHRvIGdldCB0aGUgdXNlciBkZXRhaWxzIHdoZW4gdGFzayBpcyBjb21wbGV0ZWQuXG4gICAqIEBwYXJhbSByZXNwb25zZSBpcyB0aGUgcmVzcG9uc2UgZ2l2ZW4gZnJvbSB0aGUgb2JzZXJ2YWJsZSB3aGljaCBjb250YWlucyB0aGUgdXNlciBkZXRhaWxkLlxuICAgKi9cbiAgcHVibGljIGhhbmRsZVRhc2tDb21wbGV0aW9uRXJyb3IocmVzcG9uc2U6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHVzZXJEZXRhaWxzID0gcmVzcG9uc2UgYXMgVXNlckRldGFpbHM7XG4gICAgaWYgKHRoaXMudXNlcklzQ2FzZXdvcmtlcih1c2VyRGV0YWlscy51c2VySW5mby5yb2xlcykpIHtcbiAgICAgIC8vIHdoZW4gc3VibWl0dGluZyB0aGUgY29tcGxldGlvbiBvZiB0YXNrIGlmIG5vdCB5ZXQgcmVuZGVyZWQgY2FzZXMvY2FzZSBjb25maXJtIHRoZW4gcHJlc2VydmUgdGhlIGFsZXJ0IGZvciByZS1yZW5kZXJpbmdcbiAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLnNldFByZXNlcnZlQWxlcnRzKHRydWUsIFsnY2FzZXMvY2FzZScsICdzdWJtaXQnXSk7XG4gICAgICB0aGlzLmFsZXJ0U2VydmljZS53YXJuaW5nKHsgcGhyYXNlOidBIHRhc2sgY291bGQgbm90IGJlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuIFBsZWFzZSBjb21wbGV0ZSB0aGUgdGFzayBhc3NvY2lhdGVkIHdpdGggdGhlIGNhc2UgbWFudWFsbHkuJ30pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHVzZXIncyByb2xlIGlzIGVxdWl2YWxlbnQgdG8gYSBjYXNld29ya2VyLlxuICAgKiBAcGFyYW0gcm9sZXMgaXMgdGhlIGxpc3Qgb2Ygcm9sZXMgZm91bmQgZnJvbSB0aGUgY3VycmVudCB1c2VyLlxuICAgKi9cbiAgcHVibGljIHVzZXJJc0Nhc2V3b3JrZXIocm9sZXM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbG93ZXJDYXNlUm9sZXMgPSByb2xlcy5tYXAocm9sZSA9PiByb2xlLnRvTG93ZXJDYXNlKCkpO1xuICAgIC8vIFdoZW4vaWYgbGliICYgdGFyZ2V0IHBlcm1hbmVudGx5IGNoYW5nZSB0byBlczIwMTYsIHJlcGxhY2UgaW5kZXhPZiB3aXRoIGluY2x1ZGVzXG4gICAgcmV0dXJuIChsb3dlckNhc2VSb2xlcy5pbmRleE9mKFdvcmtBbGxvY2F0aW9uU2VydmljZS5pQUNDYXNlT2ZmaWNlcikgIT09IC0xKVxuICAgICAgfHwgKGxvd2VyQ2FzZVJvbGVzLmluZGV4T2YoV29ya0FsbG9jYXRpb25TZXJ2aWNlLmlBQ0FkbU9mZmljZXIpICE9PSAtMSk7XG4gIH1cblxuICAvKipcbiAgICogTG9vayBmb3Igb3BlbiB0YXNrcyBmb3IgYSBjYXNlIGFuZCBldmVudCBjb21iaW5hdGlvbi4gVGhlcmUgYXJlIDUgcG9zc2libGUgc2NlbmFyaW9zOlxuICAgKiAgIDEuIE5vIHRhc2tzIGZvdW5kICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gU3VjY2Vzcy5cbiAgICogICAyLiBPbmUgdGFzayBmb3VuZCA9PiBNYXJrIGFzIGRvbmUgICAgICAgICAgICAgID0+IFN1Y2Nlc3MuXG4gICAqICAgMy4gT25lIHRhc2sgZm91bmQgPT4gTWFyayBhcyBkb25lIHRocm93cyBlcnJvciA9PiBGYWlsdXJlLlxuICAgKiAgIDQuIE1vcmUgdGhhbiBvbmUgdGFzayBmb3VuZCAgICAgICAgICAgICAgICAgICAgPT4gRmFpbHVyZS5cbiAgICogICA1LiBTZWFyY2ggY2FsbCB0aHJvd3MgYW4gZXJyb3IgICAgICAgICAgICAgICAgID0+IEZhaWx1cmUuXG4gICAqIEBwYXJhbSBjY2RJZCBUaGUgSUQgb2YgdGhlIGNhc2UgdG8gZmluZCB0YXNrcyBmb3IuXG4gICAqIEBwYXJhbSBldmVudElkIFRoZSBJRCBvZiB0aGUgZXZlbnQgdG8gZmluZCB0YXNrcyBmb3IuXG4gICAqL1xuICBwdWJsaWMgY29tcGxldGVBcHByb3ByaWF0ZVRhc2soY2NkSWQ6IHN0cmluZywgZXZlbnRJZDogc3RyaW5nLCBqdXJpc2RpY3Rpb246IHN0cmluZywgY2FzZVR5cGVJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAoIXRoaXMuaXNXQUVuYWJsZWQoanVyaXNkaWN0aW9uLCBjYXNlVHlwZUlkKSkge1xuICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgIH1cbiAgICBjb25zdCB0YXNrU2VhcmNoUGFyYW1ldGVyOiBUYXNrU2VhcmNoUGFyYW1ldGVyID0ge1xuICAgICAgY2NkSWQsXG4gICAgICBldmVudElkLFxuICAgICAganVyaXNkaWN0aW9uLFxuICAgICAgY2FzZVR5cGVJZFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoVGFza3ModGFza1NlYXJjaFBhcmFtZXRlcilcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zdCB0YXNrczogYW55W10gPSByZXNwb25zZS50YXNrcztcbiAgICAgICAgICBpZiAodGFza3MgJiYgdGFza3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHRhc2tzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlVGFzayh0YXNrc1swXS5pZCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgcHJvYmxlbS4gVGhyb3cgYW4gYXBwcm9wcmlhdGUgZXJyb3IuXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihNVUxUSVBMRV9UQVNLU19GT1VORCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBBbGwgZ29vZC4gTm90aGluZyB0byBzZWUgaGVyZS5cbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgIC8vIFNpbXBseSByZXRocm93IGl0LlxuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRhc2tzIGZvciBjYXNlIGFuZCBldmVudC5cbiAgICovXG4gIHB1YmxpYyBnZXRUYXNrc0J5Q2FzZUlkQW5kRXZlbnRJZChldmVudElkOiBzdHJpbmcsIGNhc2VJZDogc3RyaW5nLCBjYXNlVHlwZTogc3RyaW5nLCBqdXJpc2RpY3Rpb246IHN0cmluZyk6IE9ic2VydmFibGU8VGFza1BheWxvYWQ+IHtcbiAgICBjb25zdCBkZWZhdWx0UGF5bG9hZDogVGFza1BheWxvYWQgPSB7XG4gICAgICB0YXNrX3JlcXVpcmVkX2Zvcl9ldmVudDogZmFsc2UsXG4gICAgICB0YXNrczogW11cbiAgICB9O1xuICAgIGlmICghdGhpcy5pc1dBRW5hYmxlZCgpKSB7XG4gICAgICByZXR1cm4gb2YoZGVmYXVsdFBheWxvYWQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLmFwcENvbmZpZy5nZXRXb3JrQWxsb2NhdGlvbkFwaVVybCgpfS9jYXNlL3Rhc2tzLyR7Y2FzZUlkfS9ldmVudC8ke2V2ZW50SWR9L2Nhc2VUeXBlLyR7Y2FzZVR5cGV9L2p1cmlzZGljdGlvbi8ke2p1cmlzZGljdGlvbn1gKTtcbiAgfVxuXG4gLyoqXG4gICogQ2FsbCB0aGUgQVBJIHRvIGdldCBhIHRhc2tcbiAgKi9cbiBwdWJsaWMgZ2V0VGFzayh0YXNrSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8VGFza1Jlc3BvbmU+IHtcbiAgaWYgKCF0aGlzLmlzV0FFbmFibGVkKCkpIHtcbiAgICByZXR1cm4gb2Yoe3Rhc2s6IG51bGx9KTtcbiAgfVxuICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLmFwcENvbmZpZy5nZXRXb3JrQWxsb2NhdGlvbkFwaVVybCgpfS90YXNrLyR7dGFza0lkfWApO1xuIH1cbn1cbiJdfQ==