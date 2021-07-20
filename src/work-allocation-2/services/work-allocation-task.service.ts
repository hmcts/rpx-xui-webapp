import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchTaskRequest, TaskSearchParameters } from '../models/dtos';
import { Task } from '../models/tasks';

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
  public completeTask(taskId: string): Observable<Response> {
    return this.performActionOnTask(taskId, ACTION.COMPLETE);
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

  public searchTaskWithPagination(body: { searchRequest: SearchTaskRequest, view: string }): Observable<Task[]> {
    return this.http.post<any>(`/workallocation2/taskWithPagination`, body);
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

  public performActionOnTask(taskId: string, action: ACTION): Observable<Response> {
    // Make a POST with an empty payload.
    return this.http.post<any>(this.getActionUrl(taskId, action), {});
  }

  public getActionUrl(taskId: string, action: ACTION): string {
    return `${BASE_URL}/${taskId}/${action}`;
  }
}
