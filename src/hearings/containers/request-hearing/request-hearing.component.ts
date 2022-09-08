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
  private static HEARING_VIEW_EDIT_SUMMARY = 'hearing-view-edit-summary';
  private static HEARING_CHANGE_REASON = 'hearing-change-reason';
  private static HEARING_CONFIRMATION = 'hearing-confirmation';

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

  public submitNewRequest(): void {
    this.hearingsService.navigateAction(ACTION.SUBMIT);
  }

  public submitUpdatedRequest(): void {
    this.hearingsService.navigateAction(ACTION.VIEW_EDIT_REASON);
  }

  public submitChangeRequest(): void {
    this.hearingsService.navigateAction(ACTION.VIEW_EDIT_SUBMIT);
  }

  public get isSummary(): boolean {
    return this.isCreateEditSummary || this.isViewEditSummary;
  }

  public get isCreateEditSummary(): boolean {
    return this.pageFlow.getCurrentPage() === RequestHearingComponent.HEARING_CREATE_EDIT_SUMMARY;
  }

  public get isViewEditSummary(): boolean {
    return this.pageFlow.getCurrentPage() === RequestHearingComponent.HEARING_VIEW_EDIT_SUMMARY;
  }

  public get isViewEditReason(): boolean {
    return this.pageFlow.getCurrentPage() === RequestHearingComponent.HEARING_CHANGE_REASON;
  }

  public get isConfirmationPage(): boolean {
    return this.pageFlow.getCurrentPage() === RequestHearingComponent.HEARING_CONFIRMATION;
  }

  public ngOnDestroy(): void {
    this.hearingStore.dispatch(new fromHearingStore.ResetHearingRequest());
    this.hearingStore.dispatch(new fromHearingStore.ResetHearingValues());
    this.hearingStore.dispatch(new fromHearingStore.ResetHearingConditions());
  }
}
