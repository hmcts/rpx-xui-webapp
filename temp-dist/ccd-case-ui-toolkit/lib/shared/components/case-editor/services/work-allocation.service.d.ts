import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../../app.config';
import { TaskSearchParameter } from '../../../domain';
import { TaskRespone } from '../../../domain/work-allocation/task-response.model';
import { TaskPayload } from '../../../domain/work-allocation/TaskPayload';
import { AlertService, HttpErrorService, HttpService, SessionStorageService } from '../../../services';
import * as i0 from "@angular/core";
export declare const MULTIPLE_TASKS_FOUND = "More than one task found!";
export declare class WorkAllocationService {
    private readonly http;
    private readonly appConfig;
    private readonly errorService;
    private readonly alertService;
    private readonly sessionStorageService;
    static iACCaseOfficer: string;
    static iACAdmOfficer: string;
    private features;
    constructor(http: HttpService, appConfig: AbstractAppConfig, errorService: HttpErrorService, alertService: AlertService, sessionStorageService: SessionStorageService);
    /**
     * Call the API to get tasks matching the search criteria.
     * @param searchRequest The search parameters that specify which tasks to match.
     */
    searchTasks(searchRequest: TaskSearchParameter): Observable<object>;
    private isWAEnabled;
    /**
     * Call the API to assign a task.
     * @param taskId specifies which task should be assigned.
     * @param userId specifies the user the task should be assigned to.
     */
    assignTask(taskId: string, userId: string): Observable<any>;
    /**
     * Call the API to complete a task.
     * @param taskId specifies which task should be completed.
     */
    completeTask(taskId: string): Observable<any>;
    /**
     * Call the API to assign and complete a task.
     * @param taskId specifies which task should be completed.
     */
    assignAndCompleteTask(taskId: string): Observable<any>;
    /**
     * Handles the response from the observable to get the user details when task is completed.
     * @param response is the response given from the observable which contains the user detaild.
     */
    handleTaskCompletionError(response: any): void;
    /**
     * Returns true if the user's role is equivalent to a caseworker.
     * @param roles is the list of roles found from the current user.
     */
    userIsCaseworker(roles: string[]): boolean;
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
    completeAppropriateTask(ccdId: string, eventId: string, jurisdiction: string, caseTypeId: string): Observable<any>;
    /**
     * Return tasks for case and event.
     */
    getTasksByCaseIdAndEventId(eventId: string, caseId: string, caseType: string, jurisdiction: string): Observable<TaskPayload>;
    /**
     * Call the API to get a task
     */
    getTask(taskId: string): Observable<TaskRespone>;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkAllocationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WorkAllocationService>;
}
//# sourceMappingURL=work-allocation.service.d.ts.map