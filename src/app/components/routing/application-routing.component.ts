import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { combineLatest, Observable, iif, Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import * as fromActions from '../../store';
import { AppUtils } from '../../app-utils';
import { AppConstants } from '../../app.constants';
@Component({ templateUrl: './application-routing.component.html' })
export class ApplicationRoutingComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly store: Store<fromActions.State>,
    private readonly featureToggleService: FeatureToggleService
  ) { }
  public static defaultWAPage = '/work/my-work/list';
  public static defaultPage = '/cases';
  public static bookingUrl: string = '../booking';
  private routingSubscription: Subscription;

  public ngOnInit() {
    this.navigateBasedOnUserRole();
  }

  public navigateBasedOnUserRole() {
    const userDetails$ = this.store.pipe(select(fromActions.getUserDetails));
    const bookingFeatureToggle$: Observable<boolean> = this.featureToggleService.getValueOnce(AppConstants.FEATURE_NAMES.booking, false);

    userDetails$
      .pipe(
        mergeMap(userDetails => iif(
          () => !!userDetails.userInfo,

          combineLatest([bookingFeatureToggle$]).pipe(
            tap(([bookingFeatureToggle]) => {
              if (bookingFeatureToggle && AppUtils.isBookableAndJudicialRole(userDetails)) {
                return this.router.navigate([ApplicationRoutingComponent.bookingUrl]);
              }
              userDetails && userDetails.userInfo && userDetails.userInfo.roles
              && !userDetails.userInfo.roles.includes('pui-case-manager')
              && (userDetails.userInfo.roles.includes('caseworker-ia-iacjudge')
                || userDetails.userInfo.roles.includes('caseworker-ia-caseofficer')
                || userDetails.userInfo.roles.includes('caseworker-ia-admofficer')
                || userDetails.userInfo.roles.includes('caseworker-civil'))
                ? this.router.navigate([ApplicationRoutingComponent.defaultWAPage])
                : this.router.navigate([ApplicationRoutingComponent.defaultPage]);
            })
          ),
          of(null).pipe(tap(() => this.router.navigate([ApplicationRoutingComponent.defaultPage])))
        ))
      ).subscribe();
  }

  public ngOnDestroy() {
    if (this.routingSubscription) {
      this.routingSubscription.unsubscribe();
    }
  }
}
