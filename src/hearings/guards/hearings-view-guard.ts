import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {FeatureToggleService} from '@hmcts/rpx-xui-common-lib';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {UserRole} from '../../app/models';
import {SessionStorageService} from '../../app/services';
import {RoleCategoryMappingService} from '../../app/services/role-category-mapping/role-category-mapping.service';
import * as fromAppStore from '../../app/store';
import {HearingsGuard} from './hearings-guard';

@Injectable()
export class HearingsViewGuard extends HearingsGuard implements CanActivate {

  constructor(protected readonly appStore: Store<fromAppStore.State>,
              protected readonly sessionStorageService: SessionStorageService,
              protected readonly featureToggleService: FeatureToggleService,
              protected readonly roleCategoryMappingService: RoleCategoryMappingService,
              protected readonly router: Router) {
    super(appStore, sessionStorageService, featureToggleService);
  }

  public canActivate(): Observable<boolean> {
    return super.hasMatchedJurisdictionAndRole().pipe(
      switchMap(hasMatchedJurisdictionAndRole => {
        if (hasMatchedJurisdictionAndRole) {
          return this.roleCategoryMappingService.getUserRoleCategory(this.userRoles$).pipe(
            map(userRole => userRole === UserRole.Ogd || userRole === UserRole.LegalOps || userRole === UserRole.Judicial)
          );
        } else {
          return of(false);
        }
      })
    ).pipe(tap(canActive => {
      if (!canActive) {
        this.router.navigate([HearingsGuard.DEFAULT_URL]);
      }
    }));
  }
}
