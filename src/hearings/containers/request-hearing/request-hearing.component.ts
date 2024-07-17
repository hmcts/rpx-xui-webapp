import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ACTION, HearingRequestPageRouteNames } from '../../models/hearings.enum';
import { HearingsService } from '../../services/hearings.service';
import * as fromHearingStore from '../../store';
import { AbstractPageFlow } from '../../utils/abstract-page-flow';

@Component({
  selector: 'exui-request-hearing',
  templateUrl: './request-hearing.component.html',
  styleUrls: ['./request-hearing.component.scss']
})
export class RequestHearingComponent implements OnDestroy {
  public hasSubmitted = false;

  public action = ACTION;

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

  public submitRequest(action: ACTION): void {
    if (action === ACTION.VIEW_EDIT_REASON) {
      this.hearingsService.submitUpdatedRequestClicked = true;
    } else {
      // if we are submitting and awaiting backend process
      this.hasSubmitted = true;
    }
    this.hearingsService.navigateAction(action);
  }

  public get isSummary(): boolean {
    return this.isCreateEditSummary || this.isViewEditSummary;
  }

  public get isCreateEditSummary(): boolean {
    return this.pageFlow.getCurrentPage() === HearingRequestPageRouteNames.HEARING_CREATE_EDIT_SUMMARY;
  }

  public get isViewEditSummary(): boolean {
    return this.pageFlow.getCurrentPage() === HearingRequestPageRouteNames.HEARING_VIEW_EDIT_SUMMARY;
  }

  public get isEditSummary(): boolean {
    return this.pageFlow.getCurrentPage() === HearingRequestPageRouteNames.HEARING_EDIT_SUMMARY;
  }

  public get isViewEditReason(): boolean {
    return this.pageFlow.getCurrentPage() === HearingRequestPageRouteNames.HEARING_CHANGE_REASON;
  }

  public get isConfirmationPage(): boolean {
    return this.pageFlow.getCurrentPage() === HearingRequestPageRouteNames.HEARING_CONFIRMATION;
  }

  public get isChildPage(): boolean {
    return !this.isCreateEditSummary &&
      !this.isViewEditSummary &&
      !this.isEditSummary &&
      !this.isViewEditReason &&
      !this.isConfirmationPage;
  }

  public ngOnDestroy(): void {
    this.hearingStore.dispatch(new fromHearingStore.ResetHearingRequest());
    this.hearingStore.dispatch(new fromHearingStore.ResetHearingValues());
    this.hearingStore.dispatch(new fromHearingStore.ResetHearingConditions());
  }
}
