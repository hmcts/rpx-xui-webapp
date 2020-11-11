import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskSearchParameters } from 'api/workAllocation/interfaces/taskSearchParameter';
import { Observable } from 'rxjs';

const BASE_URL: string = '/workallocation/task/';

@Injectable()
export class WorkAllocationTaskService {

  constructor(private readonly http: HttpClient) {}

  /**
   * Call the API to complete a task.
   * @param taskId specifies which task should be completed.
   */
  public completeTask(taskId: string): Observable<any> {
    return this.http.post<any>(`${BASE_URL}${taskId}/complete`, {});
  }

  public postTask(task: TaskSearchParameters): Observable<any> {
    return this.http.post<any>(`${BASE_URL}`, task);
  }

  public unclaimTask(taskId: string): Observable<any> {
    return this.http.post<any>(`${BASE_URL}${taskId}/unclaim`, {});
  }
}
