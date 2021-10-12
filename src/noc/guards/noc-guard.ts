import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, LD_FLAG_MC_APPLICATION_THEMES } from '../../app/app.constants';
import { Theme } from '../../app/containers';
import { UserDetails } from '../../app/models/user-details.model';
import * as fromActions from '../../app/store';

@Injectable()
export class NocGuard implements CanActivate {
  public static defaultUrl: string = '/cases';

  constructor(private readonly router: Router,
              private readonly store: Store<fromActions.State>,
              private readonly featureToggleService: FeatureToggleService) {
  }

  public canActivate(): Observable<boolean> {
    const userDetails$: Observable<UserDetails> = this.store.pipe(select(fromActions.getUserDetails));
    const nocFeatureToggle$: Observable<boolean> = this.featureToggleService.getValueOnce(AppConstants.FEATURE_NAMES.noticeOfChange, false);
    const nocTheme$: Observable<Theme> = this.featureToggleService
      .getValueOnce<Theme[]>(LD_FLAG_MC_APPLICATION_THEMES, AppConstants.APPLICATION_USER_THEMES).pipe(map(themes => {
        return themes.find(theme => theme.navigationItems.some(navigationItem => navigationItem.href === '/noc'));
      }));
    const userTheme$ = combineLatest([userDetails$, nocFeatureToggle$, nocTheme$]);
    return userTheme$.pipe(map(([userDetails, nocFeatureToggle, nocTheme]) => {
      let isActivate: boolean = nocFeatureToggle;
      if (isActivate) {
        isActivate = nocTheme.roles.some(role => userDetails.userInfo.roles.includes(role));
      }
      return isActivate;
    })).pipe(tap(isActivate => {
      if (!isActivate) {
        this.router.navigate([NocGuard.defaultUrl]);
      }
    }));
  }
}
