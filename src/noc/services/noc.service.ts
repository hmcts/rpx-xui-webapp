import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NocEvent, NocQuestion } from '../models/noc.state';

@Injectable()
export class NocService {

  constructor(private readonly http: HttpClient) {}

  public getNoCQuestions(caseId: string): Observable<NocQuestion[]> {
    return this.http.get<NocQuestion[]>(`api/NoCQuestions?caseId=${caseId}`);
  }

  public validateNoCAnswers(nocEvent: NocEvent): Observable<boolean> {
    return null;
  }

  public submitNoCEvent(nocEvent: NocEvent): Observable<any> {
    return null;
  }
}
