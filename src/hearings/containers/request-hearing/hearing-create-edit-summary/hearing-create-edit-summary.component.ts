import { Component, OnDestroy } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { ACTION, Mode } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { HEARING_CREATE_EDIT_SUMMARY_TEMPLATE } from '../../../templates/hearing-create-edit-summary.template';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-create-edit-summary',
  templateUrl: './hearing-create-edit-summary.component.html'
})
export class HearingCreateEditSummaryComponent extends RequestHearingPageFlow implements OnDestroy {
  public template = HEARING_CREATE_EDIT_SUMMARY_TEMPLATE;
  public mode = Mode.CREATE_EDIT;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              protected readonly featureToggleService: FeatureToggleService) {
    super(hearingStore, hearingsService, featureToggleService);
  }

  public executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
