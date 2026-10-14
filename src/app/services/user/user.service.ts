import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails, UserInfo } from '../../../app/models/user-details.model';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { safeJsonParse } from '@hmcts/ccd-case-ui-toolkit';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly http: HttpClient,
    private readonly sessionStorageService: SessionStorageService
  ) {}

  public getUserDetails(refreshRoleAssignments: boolean = false): Observable<UserDetails> {
    return this.http.get<UserDetails>(`api/user/details?refreshRoleAssignments=${refreshRoleAssignments}`);
  }

  // TODO use the ccd-case-ui-toolkit version of this instead
  public getUserInfo(): UserInfo {
    // for some reason the userInfo is stored as userDetails which is very confusing especially since UserDetails wraps UserInfo
    const userInfo = this.sessionStorageService?.getItem('userDetails');
    return safeJsonParse(userInfo, null);
  }
}
