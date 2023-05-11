import { Component, Input, OnInit } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../../app/app.constants';

@Component({
  selector: 'exui-priority-field',
  templateUrl: './priority-field.component.html'
})
export class PriorityFieldComponent implements OnInit {
  // Current Input
  @Input() public priorityDate: Date;
  @Input() public majorPriority?: number;

  // Legacy input
  @Input() public dueDate: Date;

  @Input() public jurisdiction: string;

  public isRelease4$: Observable<boolean>;

  constructor(private featureToggleService: FeatureToggleService) {}

  public ngOnInit() {
    this.isRelease4$ = this.featureToggleService
      .getValue(AppConstants.FEATURE_NAMES.waServiceConfig, null)
      .pipe(
        map((features) => {
          const jurisdictionConfig = features.configurations.find((config) => config.serviceName === this.jurisdiction);
          return parseInt(jurisdictionConfig?.releaseVersion, 10) >= 4;
        })
      );
  }
}

