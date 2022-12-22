import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { HearingRequestStateData } from '../../../models/hearingRequestStateData.model';
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
  public validationErrors: { id: string, message: string }[] = [];
  private initialAndCurrentStates$: Observable<[HearingRequestStateData, HearingRequestStateData]>;
  private initialAndCurrentStatesSubscription: Subscription;
  private notUpdatedMessage = 'The request has not been updated';

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
  }

  private getInitialAndCurrentState(): Observable<[HearingRequestStateData, HearingRequestStateData]> {
    const initialHearingState$ = this.hearingStore.select(fromHearingStore.getHearingRequestToCompare);
    const currentHearingState$ = this.hearingStore.select(fromHearingStore.getHearingRequest);
    return combineLatest([initialHearingState$, currentHearingState$]);
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.VIEW_EDIT_REASON) {
      this.initialAndCurrentStates$ = this.getInitialAndCurrentState();
      this.initialAndCurrentStatesSubscription = this.initialAndCurrentStates$.pipe(take(1)).subscribe(state => {
        const stateChanged = !_.isEqual(state[0], state[1]);
        if (stateChanged) {
          super.navigateAction(action);
        } else {
          this.validationErrors = [{id: 'no-update', message: this.notUpdatedMessage}];
        }
      });
    } else {
      super.navigateAction(action);
    }
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
    if (this.initialAndCurrentStatesSubscription) {
      this.initialAndCurrentStatesSubscription.unsubscribe();
    }
  }
}
