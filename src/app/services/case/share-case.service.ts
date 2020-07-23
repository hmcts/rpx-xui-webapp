import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import { UserDetails } from '@hmcts/rpx-xui-common-lib/lib/models/user-details.model';
import { Observable } from 'rxjs';

@Injectable()
export class CaseShareService {
    constructor(private readonly http: HttpClient) {}

  public getUsersFromOrg(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`api/caseshare/users`);
  }

  public getShareCases(shareCases: SharedCase[]): Observable<SharedCase[]> {
    const caseIds = shareCases.map(aCase => aCase.caseId).join(',');
    const options = {
      params: {
        case_ids: caseIds
      }
    };
    return this.http.get<SharedCase[]>(`api/caseshare/cases`, options);
  }

  public assignUsersWithCases(sharedCases: SharedCase[]): Observable<SharedCase[]> {
      return this.http.post<SharedCase[]>(`api/caseshare/case-assignments`, {sharedCases});
  }
}
