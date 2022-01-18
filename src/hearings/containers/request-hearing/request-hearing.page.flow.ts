import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {HearingListMainModel} from '../../models/hearingListMain.model';
import {HearingRequestMainModel} from '../../models/hearingRequestMain.model';
import {ACTION} from '../../models/hearings.enum';
import {ServiceHearingValuesModel} from '../../models/serviceHearingValues.model';
import {HearingsService} from '../../services/hearings.service';
import * as fromHearingStore from '../../store';

export abstract class RequestHearingPageFlow {
  public navigationSub: Subscription;
  public hearingStateSub: Subscription;
  public hearingListMainModel: HearingListMainModel;
  public serviceHearingValuesModel: ServiceHearingValuesModel;
  public hearingRequestMainModel: HearingRequestMainModel;

  public constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
                     protected readonly hearingsService: HearingsService) {
    this.navigationSub = this.hearingsService.navigateAction$.subscribe(
      (action: ACTION) => this.executeAction(action)
    );
    this.hearingStateSub = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState)).subscribe(
      hearingState => {
        this.hearingListMainModel = hearingState.hearingList.hearingListMainModel;
        this.serviceHearingValuesModel = hearingState.hearingValues.serviceHearingValuesModel;
        this.hearingRequestMainModel = hearingState.hearingRequest.hearingRequestMainModel;
      });
  }

  public navigateAction(action: ACTION): void {
    switch (action) {
      case ACTION.BACK:
        this.hearingStore.dispatch(new fromHearingStore.NavigateBackHearingRequest());
        break;
      case ACTION.CONTINUE:
        this.hearingStore.dispatch(new fromHearingStore.UpdateHearingRequest(this.hearingRequestMainModel));
        break;
      case ACTION.SUBMIT:
        this.hearingStore.dispatch(new fromHearingStore.SubmitHearingRequest(this.hearingRequestMainModel));
        break;
      default:
        throw new Error('Invalid navigate action');
    }
  }

  public unsubscribe(): void {
    if (this.navigationSub) {
      this.navigationSub.unsubscribe();
    }
    if (this.hearingStateSub) {
      this.hearingStateSub.unsubscribe();
    }
  }

  protected abstract executeAction(action: ACTION): void;
}
