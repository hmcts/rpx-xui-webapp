import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {

  public constructor(private readonly http: HttpClient) {
  }

  public getTypesOfWork(): Observable<any[]> {
    return this.http.get<any[]>(`/workallocation2/task/types-of-work`);
  }
}
