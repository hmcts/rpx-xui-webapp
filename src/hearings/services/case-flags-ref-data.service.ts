import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CaseFlagsRefDataService {
  public constructor(private readonly http: HttpClient) {}

  public getCaseFlagsRefData(serviceId: string): Observable<any> {
    return this.http.get<any>(`api/prd/caseFlag/getCaseFlagRefData?serviceId=${serviceId}`);
  }
}
