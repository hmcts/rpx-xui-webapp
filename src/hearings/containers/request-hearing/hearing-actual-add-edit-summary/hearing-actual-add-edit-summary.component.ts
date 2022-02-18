import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {ACTION, Mode} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import {HEARING_ACTUAL_ADD_EDIT_SUMMARY_TEMPLATE} from '../../../templates/hearing-actual-add-edit-summary.template';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-actual-add-edit',
  templateUrl: './hearing-actual-add-edit-summary.component.html',
})
export class HearingActualAddEditSummaryComponent extends RequestHearingPageFlow implements OnDestroy {

  public template = HEARING_ACTUAL_ADD_EDIT_SUMMARY_TEMPLATE;
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
