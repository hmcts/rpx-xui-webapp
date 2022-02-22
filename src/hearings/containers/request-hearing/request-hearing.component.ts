import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {ACTION} from '../../models/hearings.enum';
import {HearingsService} from '../../services/hearings.service';
import * as fromHearingStore from '../../store';
import {AbstractPageFlow} from '../../utils/abstract-page-flow';

@Component({
  selector: 'exui-request-hearing',
  templateUrl: './request-hearing.component.html',
  styleUrls: ['./request-hearing.component.scss']
})
export class RequestHearingComponent implements OnDestroy {

  private static HEARING_CREATE_EDIT_SUMMARY = 'hearing-create-edit-summary';
  private static HEARING_CONFIRMATION = 'hearing-confirmation';
  private static HEARING_ACTUALS_CONFIRMATION = 'hearing-actual-add-edit';

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly pageFlow: AbstractPageFlow,
              private readonly hearingsService: HearingsService) {
  }

  public onBack(): void {
    this.hearingsService.navigateAction(ACTION.BACK);
  }

  public onContinue(): void {
    this.hearingsService.navigateAction(ACTION.CONTINUE);
  }

  public onSubmit(): void {
    this.hearingsService.navigateAction(ACTION.SUBMIT);
  }

  public get isCheckAnswerPage(): boolean {
    return this.pageFlow.getCurrentPage() === RequestHearingComponent.HEARING_CREATE_EDIT_SUMMARY;
  }

  public get isConfirmationPage(): boolean {
    return this.pageFlow.getCurrentPage() === RequestHearingComponent.HEARING_CONFIRMATION;
  }

  public get isHearingActualPage(): boolean {
    return this.pageFlow.getCurrentPage() === RequestHearingComponent.HEARING_ACTUALS_CONFIRMATION;
  }

  public ngOnDestroy(): void {
    this.hearingStore.dispatch(new fromHearingStore.ResetHearingRequest());
    this.hearingStore.dispatch(new fromHearingStore.ResetHearingValues());
    this.hearingStore.dispatch(new fromHearingStore.ResetHearingConditions());
  }
}
