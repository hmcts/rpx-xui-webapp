import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import { UserDetails } from '@hmcts/rpx-xui-common-lib/lib/models/user-details.model';
import { Observable } from 'rxjs';


@Injectable()
export class CaseShareService {
    constructor(private readonly http: HttpClient) {}

    public getShareCases(shareCases: SharedCase[]): Observable<SharedCase[]> {
        return this.http.get<SharedCase[]>(`api/caseshare/cases`);
    }
    public getUsersFromOrg(orgId: string): Observable<UserDetails[]> {
        return this.http.get<UserDetails[]>(`api/caseshare/orgs/${orgId}`);
    }

  public assignUsersWithCases(sharedCases: SharedCase[]): Observable<SharedCase[]> {
      const ret: Observable<SharedCase[]> = this.http.post<SharedCase[]>(`api/caseshare/case-assignments`, {sharedCases});
      ret.subscribe(cases => { console.log('service layer --- ' + JSON.stringify(cases) ) });
      return ret;
  }
}
