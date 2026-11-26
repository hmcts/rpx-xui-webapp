import { CurrentUserService } from '@hmcts/ccd-case-ui-toolkit';
import { Router } from '@angular/router';

import { SessionStorageService } from '../services';

export const canActivateForRole = (sessionStorageService: SessionStorageService, router: Router, role: string): boolean => {
  const userInfo = CurrentUserService.readUserInfo(sessionStorageService);
  if (userInfo) {
    const roleExists = userInfo?.roles.includes(role);
    if (!roleExists) {
      router.navigateByUrl('/cases');
    }
    return roleExists;
  }
  return false;
};
