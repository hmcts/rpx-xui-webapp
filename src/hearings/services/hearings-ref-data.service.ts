import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RefDataModel } from '../models/refData.model';

@Injectable({ providedIn: 'root' })
export class HearingsRefDataService {
  public constructor(private readonly http: HttpClient) { }

  public getPriorities(category: string, service: string): Observable<RefDataModel[]> {
    return this.http.get<RefDataModel[]>(`api/hearings/getRefData?category=${category}&service=${service}`);
  }
}
