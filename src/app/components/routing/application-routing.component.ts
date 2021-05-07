import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { WorkAllocationFeatureService } from '../../../work-allocation-2/services/work-allocation-feature.service';
import * as fromActions from '../../store';

@Component({ templateUrl: './application-routing.component.html'})
export class ApplicationRoutingComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly workAllocationFeatureService: WorkAllocationFeatureService,
    private readonly store: Store<fromActions.State>
  ) {}

  public ngOnInit(): void {
    this.workAllocationFeatureService.getActiveWAFeature().subscribe((currentWAFeatureName) =>
        this.navigateUrlBasedOnFeatureToggle(currentWAFeatureName)
      );
  }

  public navigateUrlBasedOnFeatureToggle(currentWAFeatureName: string): void {
    currentWAFeatureName === 'WorkAllocationRelease2'
      ? this.navigateBasedOnUserRole()
      : this.router.navigate(['/cases']);
  }

  public navigateBasedOnUserRole() {
    const userDetails$ = this.store.pipe(select(fromActions.getUserDetails));
    userDetails$.subscribe(userDetails => {
      userDetails && userDetails.userInfo && userDetails.userInfo.roles && userDetails.userInfo.roles.includes('caseworker-ia-iacjudge') ? this.router.navigate(['/mywork']) : this.router.navigate(['/cases']);
    })
  }
}
