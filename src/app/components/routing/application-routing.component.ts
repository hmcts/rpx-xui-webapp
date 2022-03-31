import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { WorkAllocationFeatureService } from '../../../work-allocation-2/services';
import * as fromActions from '../../store';

@Component({ templateUrl: './application-routing.component.html'})
export class ApplicationRoutingComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly workAllocationFeatureService: WorkAllocationFeatureService,
    private readonly store: Store<fromActions.State>
  ) {}
  public static defaultWAPage = '/work/my-work/list';
  public static defaultPage = '/cases';
  public ngOnInit(): void {
    this.workAllocationFeatureService.getActiveWAFeature().subscribe((currentWAFeatureName) =>
        this.navigateUrlBasedOnFeatureToggle(currentWAFeatureName)
      );
  }

  public navigateUrlBasedOnFeatureToggle(currentWAFeatureName: string): void {
    currentWAFeatureName === 'WorkAllocationRelease2'
      ? this.navigateBasedOnUserRole()
      : this.router.navigate([ApplicationRoutingComponent.defaultPage]);
  }

  public navigateBasedOnUserRole() {
    const userDetails$ = this.store.pipe(select(fromActions.getUserDetails));
    userDetails$.subscribe(userDetails => {
      userDetails && userDetails.userInfo && userDetails.userInfo.roles &&
      (userDetails.userInfo.roles.includes('caseworker-ia-iacjudge')
      || userDetails.userInfo.roles.includes('caseworker-ia-caseofficer')
      || userDetails.userInfo.roles.includes('caseworker-ia-admofficer'))
      ? this.router.navigate([ApplicationRoutingComponent.defaultWAPage]) : this.router.navigate([ApplicationRoutingComponent.defaultPage]);
    });
  }

}
