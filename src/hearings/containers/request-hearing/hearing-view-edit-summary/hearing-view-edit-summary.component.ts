import {Component, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ACTION, HearingViewEditSummaryMessages, Mode} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import {HEARING_VIEW_EDIT_SUMMARY_TEMPLATE} from '../../../templates/hearing-view-edit-summary.template';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';
import * as _ from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { HearingRequestStateData } from 'src/hearings/models/hearingRequestStateData.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'exui-hearing-view-edit-summary',
  templateUrl: './hearing-view-edit-summary.component.html',
})
export class HearingViewEditSummaryComponent extends RequestHearingPageFlow implements OnDestroy {
  public template = HEARING_VIEW_EDIT_SUMMARY_TEMPLATE;
  public mode = Mode.VIEW_EDIT;
  public initialHearingState$: Observable<HearingRequestStateData>;
  public currentHearingState$: Observable<HearingRequestStateData>;
  public validationErrors: { id: string, message: string }[] = [];
  private initialAndCurrentStates$: Observable<[HearingRequestStateData, HearingRequestStateData]>;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
  }

  getInitialAndCurrentState() {
    const initialHearingState$ = this.hearingStore.select(fromHearingStore.getHearingRequestToCompare)
    const currentHearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingRequest))
    return combineLatest([initialHearingState$, currentHearingState$])
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.VIEW_EDIT_REASON || action === ACTION.VIEW_EDIT_SUBMIT) {
    this.initialAndCurrentStates$ = this.getInitialAndCurrentState();
    this.initialAndCurrentStates$.pipe(take(1)).subscribe(state => {
      const stateChanged = !_.isEqual(state[0], state[1]);
      if (stateChanged) {
        super.navigateAction(action);
      } else {
        this.validationErrors.push({id: 'no-update', message: HearingViewEditSummaryMessages.NOT_UPDATED});
      }
    });
    } else {
      super.navigateAction(action);
    }
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
