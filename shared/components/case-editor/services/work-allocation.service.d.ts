import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../../app.config';
import { TaskSearchParameter } from '../../../domain';
import { AlertService, HttpErrorService, HttpService } from '../../../services';
export declare const MULTIPLE_TASKS_FOUND = "More than one task found!";
export declare class WorkAllocationService {
    private readonly http;
    private readonly appConfig;
    private readonly errorService;
    private readonly alertService;
    static IACCaseOfficer: string;
    static IACAdmOfficer: string;
    constructor(http: HttpService, appConfig: AbstractAppConfig, errorService: HttpErrorService, alertService: AlertService);
    /**
     * Call the API to get tasks matching the search criteria.
     * @param searchRequest The search parameters that specify which tasks to match.
     */
    searchTasks(searchRequest: TaskSearchParameter): Observable<object>;
    /**
     * Call the API to complete a task.
     * @param taskId specifies which task should be completed.
     */
    completeTask(taskId: string): Observable<any>;
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
}
