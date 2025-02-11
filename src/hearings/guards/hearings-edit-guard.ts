import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserRole } from '../../app/models';
import { SessionStorageService } from '../../app/services';
import * as fromAppStore from '../../app/store';
import { HearingsGuard } from './hearings-guard';
import { HearingJuristictionConfigService } from 'src/app/services/hearing-juristiction-config/hearing-juristiction-config.service';

@Injectable()
export class HearingsEditGuard extends HearingsGuard {
  constructor(protected readonly appStore: Store<fromAppStore.State>,
              protected readonly sessionStorageService: SessionStorageService,
              protected readonly hearingJuristictionConfigService: HearingJuristictionConfigService,
              protected readonly router: Router) {
    super(appStore, sessionStorageService, hearingJuristictionConfigService);
  }

  public canActivate(): Observable<boolean> {
    return super.hasMatchedPermissions().pipe(
      switchMap((hasMatchedPermissions) => {
        if (hasMatchedPermissions) {
          return this.userRoles$.pipe(
            map((userRoles) => userRoles.includes(UserRole.HearingManager))
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
