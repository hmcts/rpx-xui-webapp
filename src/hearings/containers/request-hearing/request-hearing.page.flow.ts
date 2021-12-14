import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {HearingRequestMainModel} from '../../models/hearingRequestMain.model';
import {ACTION} from '../../models/hearings.enum';
import {HearingsService} from '../../services/hearings.service';
import * as fromHearingStore from '../../store';

export abstract class RequestHearingPageFlow {
  protected navigationSub: Subscription;
  protected hearingRequestMainModel: HearingRequestMainModel;

  public constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
                     protected readonly hearingsService: HearingsService) {
    this.navigationSub = this.hearingsService.navigateAction$.subscribe(
      (action: ACTION) => this.executeAction(action)
    );
    this.hearingStore.pipe(select(fromHearingStore.getHearingRequest)).subscribe(
      hearingRequest => {
        this.hearingRequestMainModel = hearingRequest.hearingRequestMainModel;
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
  }

  protected abstract executeAction(action: ACTION): void;
}
