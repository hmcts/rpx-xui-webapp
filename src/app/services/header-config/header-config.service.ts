import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EnvironmentService } from '../../shared/services/environment.service';
import { NavigationItem } from 'src/app/models';
import { getUserRolesExcludingSpecificAccessApprover } from '../../shared/utils/role.utils';

@Injectable({ providedIn: 'root' })
export class HeaderConfigService {
  constructor(private readonly environmentService: EnvironmentService) {}

  roleCfg: NavigationItem[] | undefined;

  constructHeaderConfig(userRoles: string[]): Observable<NavigationItem[]> {
    const sanitisedUserRoles = getUserRolesExcludingSpecificAccessApprover(userRoles);
    return this.environmentService.config$.pipe(
      map((config) => config.headerConfig),
      switchMap((headerCfg) => this.getRoleConfig(sanitisedUserRoles, headerCfg))
    );
  }

  private getRoleConfig(userRoles: string[], headerCfg: object): Observable<NavigationItem[]> {
    const configKeys = Object.keys(headerCfg);
    const defaultKey = '.+';
    const otherConfigKeys = configKeys.filter((config) => config !== defaultKey);
    let selectedConfig = otherConfigKeys.find((config) => {
      const rolePattern = new RegExp(config);
      return userRoles.some((role) => rolePattern.test(role));
    });
    if (!selectedConfig) {
      selectedConfig = defaultKey;
    }
    this.roleCfg = selectedConfig ? headerCfg[selectedConfig] : [];
    return of(this.roleCfg);
  }
}
