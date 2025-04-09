import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserRole } from '../../app/models';
import * as fromAppStore from '../../app/store';
import { HearingsGuard } from './hearings-guard';
import { HearingJurisdictionConfigService } from 'src/app/services/hearing-jurisdiction-config/hearing-jurisdiction-config.service';

@Injectable()
export class HearingsViewGuard extends HearingsGuard {
  constructor(protected readonly appStore: Store<fromAppStore.State>,
              protected readonly hearingStore: Store<fromAppStore.State>,
              protected readonly hearingJurisdictionConfigService: HearingJurisdictionConfigService,
              protected readonly router: Router) {
    super(appStore, hearingJurisdictionConfigService, hearingStore, router);
    console.log('HearingsViewGuard');
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
