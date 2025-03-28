import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserRole } from '../../app/models';
import { SessionStorageService } from '../../app/services';
import * as fromAppStore from '../../app/store';
import { HearingsGuard } from './hearings-guard';
import { CaseNotifier } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class HearingsViewGuard extends HearingsGuard {
  constructor(protected readonly appStore: Store<fromAppStore.State>,
              protected readonly caseNotifier: CaseNotifier,
              protected readonly featureToggleService: FeatureToggleService,
              protected readonly router: Router) {
    super(appStore, caseNotifier, featureToggleService);
  }

  public canActivate(): Observable<boolean> {
    return super.hasMatchedPermissions().pipe(
      switchMap((hasMatchedPermissions) => {
        if (hasMatchedPermissions) {
          return this.userRoles$.pipe(
            map((userRoles) =>
              userRoles.includes(UserRole.HearingViewer) ||
              userRoles.includes(UserRole.ListedHearingViewer) ||
              userRoles.includes(UserRole.HearingManager)
            )
          );
        }

        return of(false);
      })
    ).pipe(tap((canActive) => {
      if (!canActive) {
        this.router.navigate([HearingsGuard.DEFAULT_URL]);
      }
    }));
  }
}
