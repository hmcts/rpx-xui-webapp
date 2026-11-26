import { Injectable, OnDestroy } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivityService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { AppConstants } from '../../app/app.constants';

@Injectable()
export class ActivityResolver implements Resolve<boolean>, OnDestroy {
  private readonly activityModeSubscription: Subscription;

  constructor(
    private readonly activityService: ActivityService,
    private readonly featureToggleService: FeatureToggleService
  ) {
    this.activityModeSubscription = this.featureToggleService
      .getValue<string>(AppConstants.ACTIVITY_TRACKER_MODE, undefined)
      .pipe(
        filter((mode) => !!mode),
        distinctUntilChanged()
      )
      .subscribe((mode) => {
        this.activityService.mode = this.getActivityMode(mode);
      });
  }

  public resolve(): Observable<boolean> {
    return of(this.isActivityEnabled);
  }

  public ngOnDestroy(): void {
    this.activityModeSubscription.unsubscribe();
  }

  private get isActivityEnabled(): boolean {
    return this.activityService.mode !== ActivityService.MODES.off;
  }

  private getActivityMode(mode: string): (typeof ActivityService.MODES)[keyof typeof ActivityService.MODES] {
    const modeValues = Object.values(ActivityService.MODES) as string[];
    if (modeValues.includes(mode)) {
      return mode as (typeof ActivityService.MODES)[keyof typeof ActivityService.MODES];
    }

    return ActivityService.MODES[mode as keyof typeof ActivityService.MODES] || ActivityService.MODES.off;
  }
}
