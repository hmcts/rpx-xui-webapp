import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskSearchParameters } from 'api/workAllocation/interfaces/taskSearchParameter';
import { Observable } from 'rxjs';

import { Assignee } from './../models/dtos/task';

const BASE_URL: string = '/workallocation/task/';
enum ACTION {
  ASSIGN = 'assign',
  CANCEL = 'cancel',
  CLAIM = 'claim',
  COMPLETE = 'complete',
  UNCLAIM = 'unclaim'
}

@Injectable()
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


  /**
   * Call the API to assign a task to a user.
   * @param taskId specifies which task should be assigned.
   * @param assignee specifies who this task should be assigned to.
   */
  public assignTask(taskId: string, assignee: Assignee): Observable<any> {
    // Make a POST with the specified assignee in the payload.
    return this.http.post<any>(this.getActionUrl(taskId, ACTION.ASSIGN), assignee);
  }

  public postTask(task: TaskSearchParameters): Observable<any> {
    return this.http.post<any>(`${BASE_URL}`, task);
  }

  public unclaimTask(taskId: string): Observable<any> {
    return this.http.post<any>(this.getActionUrl(taskId, ACTION.UNCLAIM), {});
  }

  private getActionUrl(taskId: string, action: ACTION): string {
    return `${BASE_URL}${taskId}/${action}`;
  }
}
