import { Injectable } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRole } from '../../models';

export interface RoleMapping {
  JUDICIAL_ROLE_LIST: string[];
  LEGAL_OPS_ROLE_LIST: string[];
  OGD_ROLE_LIST: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RoleCategoryMappingService {
  private static readonly ROLE_MAPPING_KEY: string = 'mc-user-role-mapping';
  private readonly roleMappings$: Observable<RoleMapping>;

  constructor(private readonly featureToggleService: FeatureToggleService) {
    this.roleMappings$ = this.featureToggleService.getValueOnce<RoleMapping>(RoleCategoryMappingService.ROLE_MAPPING_KEY, null);
  }

  // noinspection JSUnusedGlobalSymbols
  public isJudicialCategory(userRoles$: Observable<string[]>): Observable<boolean> {
    return combineLatest([this.roleMappings$, userRoles$]).pipe(
      // @ts-ignore
      map(([roleMappings, userRoles]: [RoleMapping, string[]]) =>
        userRoles.some(userRole => roleMappings.JUDICIAL_ROLE_LIST.some(role => role === userRole))
      )
    );
  }

  // noinspection JSUnusedGlobalSymbols
  public isLegalOpsCategory(userRoles$: Observable<string[]>): Observable<boolean> {
    return combineLatest([this.roleMappings$, userRoles$]).pipe(
      // @ts-ignore
      map(([roleMappings, userRoles]: [RoleMapping, string[]]) =>
        userRoles.some(userRole => roleMappings.LEGAL_OPS_ROLE_LIST.some(role => role === userRole))
      )
    );
  }

  // noinspection JSUnusedGlobalSymbols
  public getUserRoleCategory(userRoles$: Observable<string[]>): Observable<UserRole> {
    return combineLatest([this.roleMappings$, userRoles$]).pipe(
      // @ts-ignore
      map(([roleMappings, userRoles]: [RoleMapping, string[]]) => {
          if (userRoles.some(userRole => roleMappings.JUDICIAL_ROLE_LIST.some(role => role === userRole))) {
            return UserRole.Judicial;
          } else if (userRoles.some(userRole => roleMappings.OGD_ROLE_LIST.some(role => role === userRole))) {
            return UserRole.Ogd;
          } else if (userRoles.some(userRole => roleMappings.LEGAL_OPS_ROLE_LIST.some(role => role === userRole))) {
            return UserRole.LegalOps;
          } else {
            return UserRole.Admin;
          }
        }
      ));
  }
}
