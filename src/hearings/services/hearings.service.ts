import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HearingListMainModel } from '../models/hearingListMain.model';

@Injectable()
export class HearingsService {

  constructor(private readonly http: HttpClient) {
  }

  public getAllHearings(caseId: string): Observable<HearingListMainModel> {
    return this.http.get<HearingListMainModel>(`api/hearings/getHearings?caseId=${caseId}`);
  }
}
