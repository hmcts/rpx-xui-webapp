import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../models';
import { safeJsonParseFallback } from '@hmcts/ccd-case-ui-toolkit';
import { SessionStorageService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class CaseAllocatorGuard {
  constructor(
    private readonly sessionStorageService: SessionStorageService,
    private readonly router: Router
  ) {}

  public canActivate(): boolean {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo = safeJsonParseFallback<UserInfo>(userInfoStr, null);
      if (!userInfo) {
        return false;
      }
      const roleExists = userInfo?.roles.includes('case-allocator');
      if (!roleExists) {
        this.router.navigateByUrl('/cases');
      }
      return roleExists;
    }
    return false;
  }
}
