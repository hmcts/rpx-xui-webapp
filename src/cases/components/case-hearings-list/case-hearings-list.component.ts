import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HearingConditions } from '../../../hearings/models/hearingConditions';
import { HearingListViewModel } from '../../../hearings/models/hearingListView.model';
import { Actions, EXUIDisplayStatusEnum, EXUISectionStatusEnum, Mode } from '../../../hearings/models/hearings.enum';
import * as fromHearingStore from '../../../hearings/store';

@Component({
  selector: 'exui-case-hearings-list',
  templateUrl: './case-hearings-list.component.html',
  styleUrls: ['./case-hearings-list.component.scss']
})

export class CaseHearingsListComponent implements OnInit {
  @Input()
  public status: EXUISectionStatusEnum;

  @Input()
  public hearingList$: Observable<HearingListViewModel[]>;

  @Input()
  public actions: Actions[];
  public caseId: string;
  public hasUpdateAction: boolean = false;
  public hasDeleteAction: boolean = false;
  public hasReadOnlyAction: boolean = false;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {
    this.caseId = this.activatedRoute.snapshot.params.cid;
  }

  public ngOnInit(): void {
    if (this.status === EXUISectionStatusEnum.PAST_AND_CANCELLED) {
      this.hasReadOnlyAction = true;
    }
    if (this.status === EXUISectionStatusEnum.UPCOMING) {
      if (this.actions.includes(Actions.UPDATE)) {
        this.hasUpdateAction = true;
      }
      if (this.actions.includes(Actions.DELETE)) {
        this.hasDeleteAction = true;
      }
      if (this.actions.length === 1 && this.actions.includes(Actions.READ)) {
        this.hasReadOnlyAction = true;
      }
    }
  }

  public isAwaitingActual(exuiDisplayStatus: EXUIDisplayStatusEnum): boolean {
    return exuiDisplayStatus === EXUIDisplayStatusEnum.AWAITING_ACTUALS;
  }

  public isNonCancellable(exuiDisplayStatus: EXUIDisplayStatusEnum): boolean {
    return exuiDisplayStatus === EXUIDisplayStatusEnum.CANCELLATION_REQUESTED
      || exuiDisplayStatus === EXUIDisplayStatusEnum.FAILURE;
  }

  public isManageLinksEnabled(hearingGroupRequestId: string): boolean {
    return !!hearingGroupRequestId;
  }

  public viewAndEdit(hearingID: string): void {
    this.hearingStore.dispatch(new fromHearingStore.LoadHearingValues(this.caseId));
    this.hearingStore.dispatch(new fromHearingStore.LoadHearingRequest(hearingID));
    const hearingCondition: HearingConditions = {
      mode: Mode.VIEW,
    };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
    this.router.navigate(['/', 'hearings', 'request', 'hearing-view-edit-summary']);
  }

  public viewDetails(hearing: HearingListViewModel): void {
    if (hearing.exuiDisplayStatus === EXUIDisplayStatusEnum.CANCELLATION_REQUESTED) {
      this.hearingStore.dispatch(new fromHearingStore.LoadHearingRequest(hearing.hearingID));
      this.router.navigate(['/', 'hearings', 'request', 'hearing-cancellation-summary']);
    } else if (hearing.exuiDisplayStatus === EXUIDisplayStatusEnum.CANCELLED) {
      this.hearingStore.dispatch(new fromHearingStore.LoadHearingRequest(hearing.hearingID));
      this.router.navigate(['/', 'hearings', 'request', 'hearing-cancelled-summary']);
    } else {
      this.router.navigate(['/', 'hearings', 'view']);
    }
  }

  public addAndEdit(hearingID: string): void {
    this.router.navigate(['/', 'hearings', 'actuals', hearingID, 'hearing-actual-add-edit-summary']);
  }
}
