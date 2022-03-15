import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { HEARING_CANCELLATION_SUMMARY_TEMPLATE } from '../../../../hearings/templates/hearing-cancellation-summary.template';
import { ACTION, Mode } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-cancellation-summary',
  templateUrl: './hearing-cancellation-summary.component.html',
})
export class HearingCancellationSummaryComponent extends RequestHearingPageFlow implements OnDestroy {

  public template = HEARING_CANCELLATION_SUMMARY_TEMPLATE;
  public mode = Mode.VIEW;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
  }

  public executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
