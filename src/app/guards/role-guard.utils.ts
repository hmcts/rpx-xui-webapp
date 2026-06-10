import { Router } from '@angular/router';
import { safeJsonParse } from '@hmcts/ccd-case-ui-toolkit';
import { UserInfo } from '../models';
import { SessionStorageService } from '../services';

export const canActivateForRole = (sessionStorageService: SessionStorageService, router: Router, role: string): boolean => {
  const userInfoStr = sessionStorageService.getItem('userDetails');
  if (userInfoStr) {
    const userInfo = safeJsonParse<UserInfo>(userInfoStr, null);
    if (!userInfo) {
      return false;
    }
    const roleExists = userInfo?.roles.includes(role);
    if (!roleExists) {
      router.navigateByUrl('/cases');
    }
    return roleExists;
  }
  return false;
};
