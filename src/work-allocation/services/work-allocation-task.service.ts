import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    // Make a POST with an empty payload.
    return this.http.post<any>(`${BASE_URL}${taskId}/complete`, {});
  }
}
