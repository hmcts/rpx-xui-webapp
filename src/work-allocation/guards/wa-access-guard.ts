import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppConstants } from '../../app/app.constants';

@Injectable()
export class WorkAllocationAccessGuard {
  public static defaultUrl: string = '/cases';
  constructor(private readonly featureToggleService: FeatureToggleService,
              private readonly router: Router) {}

  public static navigateUrl(isfeatureEnabled: boolean, router: Router, url: string): void {
    if (!isfeatureEnabled) {
      router.navigate([url]);
    }
  }

  public canActivate(): Observable<boolean> {
    // waAccess feature flag removed - EXUI-2615: always allow
    return of(true);
  }
}
