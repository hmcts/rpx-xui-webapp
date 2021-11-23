import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefDataModel } from 'api/hearings/models/refData.model';
import { Observable } from 'rxjs';
import { CaseHearingsMainModel } from '../models/caseHearingsMain.model';

@Injectable()
export class HearingsService {

  constructor(private readonly http: HttpClient) {}

  public getAllHearings(caseId: string): Observable<CaseHearingsMainModel> {
    return this.http.get<CaseHearingsMainModel>(`api/hearings/getHearings?caseId=${caseId}`);
  }
}
