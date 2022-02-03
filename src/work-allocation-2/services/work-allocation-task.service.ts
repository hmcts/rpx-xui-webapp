import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchTaskRequest, TaskSearchParameters } from '../models/dtos';
import { Task } from '../models/tasks';
import { TaskRole } from '../models/tasks/TaskRole';

const BASE_URL: string = '/workallocation2/task';
export enum ACTION {
  ASSIGN = 'assign',
  CANCEL = 'cancel',
  CLAIM = 'claim',
  COMPLETE = 'complete',
  UNCLAIM = 'unclaim'
}

@Injectable({ providedIn: 'root' })
export class WorkAllocationTaskService {

  constructor(private readonly http: HttpClient) {}

  /**
   * Call the API to complete a task.
   * @param taskId specifies which task should be completed.
   */
  public completeTask(taskId: string, hasNoAssigneeOnComplete: boolean): Observable<Response> {
    return this.performActionOnTask(taskId, ACTION.COMPLETE, hasNoAssigneeOnComplete);
  }

  public cancelTask(taskId: string): Observable<Response> {
    return this.performActionOnTask(taskId, ACTION.CANCEL);
  }

  /**
   * Call the API to assign a task to a user.
   * @param taskId specifies which task should be assigned.
   * @param user specifies who this task should be assigned to.
   */
  public assignTask(taskId: string, user: any): Observable<Response> {
    // Make a POST with the specified assignee in the payload.
    return this.http.post<any>(this.getActionUrl(taskId, ACTION.ASSIGN),  user );
  }

  public postTask(task: TaskSearchParameters): Observable<Response> {
    return this.http.post<any>(`${BASE_URL}`, task);
  }

  public searchTask(body: { searchRequest: SearchTaskRequest, view: string }): Observable<Task[]> {
    return this.http.post<any>(`${BASE_URL}`, body);
  }

  public claimTask(taskId: string): Observable<Response> {
    return this.performActionOnTask(taskId, ACTION.CLAIM);
  }

  public unclaimTask(taskId: string): Observable<Response> {
    return this.performActionOnTask(taskId, ACTION.UNCLAIM);
  }

  public getTask(taskId: string): Observable<Task> {
    const url = `${BASE_URL}/${taskId}`;
    return this.http.get<Task>(url);
  }

  public getTaskRoles(taskId: string): Observable<TaskRole[]> {
    const url = `${BASE_URL}/${taskId}/roles`;
    return this.http.get<TaskRole[]>(url);
  }

  public performActionOnTask(taskId: string, action: ACTION, hasNoAssigneeOnComplete?: boolean): Observable<Response> {
    // Make a POST with an empty payload.
    return this.http.post<any>(this.getActionUrl(taskId, action), {hasNoAssigneeOnComplete});
  }

  public getActionUrl(taskId: string, action: ACTION): string {
    return `${BASE_URL}/${taskId}/${action}`;
  }
}
