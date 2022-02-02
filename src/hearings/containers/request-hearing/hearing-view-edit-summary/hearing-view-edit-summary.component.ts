import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {ACTION, Mode} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import {HEARING_VIEW_EDIT_SUMMARY_TEMPLATE} from '../../../templates/hearing-view-edit-summary.template';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-view-edit-summary',
  templateUrl: './hearing-view-edit-summary.component.html',
})
export class HearingViewEditSummaryComponent extends RequestHearingPageFlow implements OnDestroy {

  public template = HEARING_VIEW_EDIT_SUMMARY_TEMPLATE;
  public mode = Mode.VIEW_EDIT;

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
