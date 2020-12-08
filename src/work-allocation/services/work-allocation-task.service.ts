import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../models/tasks';
import { SearchTaskRequest } from './../models/dtos/search-task-request';
import { Assignee } from './../models/dtos/task';
import { TaskSearchParameters } from './../models/dtos/task-search-parameter';

const BASE_URL: string = '/workallocation/task/';
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
  public completeTask(taskId: string): Observable<any> {
    // Make a POST with an empty payload.
    return this.http.post<any>(this.getActionUrl(taskId, ACTION.COMPLETE), {});
  }

  public cancelTask(taskId: string): Observable<any> {
    return this.http.post<any>(this.getActionUrl(taskId, ACTION.CANCEL), {});
  }

  /**
   * Call the API to assign a task to a user.
   * @param taskId specifies which task should be assigned.
   * @param assignee specifies who this task should be assigned to.
   */
  public assignTask(taskId: string, assignee: Assignee): Observable<any> {
    // Make a POST with the specified assignee in the payload.
    return this.http.post<any>(this.getActionUrl(taskId, ACTION.ASSIGN), { assignee });
  }

  public postTask(task: TaskSearchParameters): Observable<any> {
    return this.http.post<any>(`${BASE_URL}`, task);
  }

  public searchTask(searchRequest: SearchTaskRequest): Observable<any> {
    return this.http.post<any>(`${BASE_URL}`, searchRequest);
  }

  // SHould we catch the error here, no, because the item that is using it should
  // be returned the data, and it should be handled there. otherwise this
  // func is side-effecting.
  public claimTask(taskId: string): Observable<any> {
    return this.http.post<any>(this.getActionUrl(taskId, ACTION.CLAIM), {});
  }

  public unclaimTask(taskId: string): Observable<any> {
    return this.http.post<any>(this.getActionUrl(taskId, ACTION.UNCLAIM), {});
  }

  public getTask(taskId: string): Observable<Task> {
    const url = `${BASE_URL}${taskId}`;
    return this.http.get<Task>(url);
  }

  public getActionUrl(taskId: string, action: ACTION): string {
    return `${BASE_URL}${taskId}/${action}`;
  }
}
