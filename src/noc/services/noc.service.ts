import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NocEvent, NocQuestion } from '../models';
import { NocApproveStatus } from '../models/noc-approve-status.interface';

@Injectable()
export class NocService {

  constructor(private readonly http: HttpClient) {}

  public getNoCQuestions(caseId: string): Observable<NocQuestion[]> {
    return this.http.get<NocQuestion[]>(`api/noc/nocQuestions?caseId=${caseId}`);
  }

  public validateNoCAnswers(nocEvent: NocEvent): Observable<boolean> {
    return this.http.post<boolean>('api/noc/validateNoCQuestions', nocEvent);
  }

  public submitNoCEvent(nocEvent: NocEvent): Observable<NocApproveStatus> {
    return this.http.post<NocApproveStatus>('api/noc/submitNoCEvents', nocEvent);
  }
}
