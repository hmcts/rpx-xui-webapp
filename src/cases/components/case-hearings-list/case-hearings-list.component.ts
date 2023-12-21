import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HearingConditions } from '../../../hearings/models/hearingConditions';
import { HearingListViewModel } from '../../../hearings/models/hearingListView.model';
import { Actions, EXUIDisplayStatusEnum, EXUISectionStatusEnum, Mode } from '../../../hearings/models/hearings.enum';
import { LovRefDataModel } from '../../../hearings/models/lovRefData.model';
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
  public hearingStageOptions: LovRefDataModel[];

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
    if (this.status === EXUISectionStatusEnum.PAST_OR_CANCELLED) {
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

  public isLinkableStatus(exuiDisplayStatus: EXUIDisplayStatusEnum) {
    return exuiDisplayStatus === EXUIDisplayStatusEnum.AWAITING_LISTING
      || exuiDisplayStatus === EXUIDisplayStatusEnum.UPDATE_REQUESTED
      || exuiDisplayStatus === EXUIDisplayStatusEnum.LISTED;
  }

  public addAndEdit(hearingID: string): void {
    this.router.navigate(['/', 'hearings', 'actuals', hearingID, 'hearing-actual-add-edit-summary']);
  }

  public cancelHearing(hearingID: string): void {
    this.router.navigate(['/', 'hearings', 'cancel', hearingID]);
  }

  public linkHearing(hearingID: string): void {
    this.router.navigate(['/', 'hearings', 'link', this.caseId, hearingID]);
  }

  public manageLinks(hearing: HearingListViewModel): void {
    this.hearingStore.dispatch(new fromHearingStore.LoadServiceLinkedCases({
      caseReference: this.caseId,
      hearingId: hearing.hearingID
    }));
    this.hearingStore.dispatch(new fromHearingStore.LoadLinkedHearingGroup({ groupId: hearing.hearingGroupRequestId }));
    this.router.navigate(['/', 'hearings', 'manage-links', this.caseId, hearing.hearingGroupRequestId, hearing.hearingID]);
  }

  public viewAndEdit(hearingID: string): void {
    const hearingCondition: HearingConditions = {
      mode: Mode.VIEW
    };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
    this.LoadHearingRequestAndRedirect(hearingID, '/hearings/request/hearing-view-edit-summary');
  }

  public viewDetails(hearing: HearingListViewModel): void {
    switch (hearing.exuiDisplayStatus) {
      case EXUIDisplayStatusEnum.AWAITING_LISTING:
      case EXUIDisplayStatusEnum.UPDATE_REQUESTED:
      case EXUIDisplayStatusEnum.LISTED:
        this.LoadHearingRequestAndRedirect(hearing.hearingID, '/hearings/view/hearing-view-summary');
        break;
      case EXUIDisplayStatusEnum.CANCELLATION_REQUESTED:
        this.LoadHearingRequestAndRedirect(hearing.hearingID, '/hearings/view/hearing-cancellation-summary');
        break;
      case EXUIDisplayStatusEnum.CANCELLED:
        this.LoadHearingRequestAndRedirect(hearing.hearingID, `/hearings/view/hearing-cancelled-summary/${hearing.hearingID}`);
        break;
      case EXUIDisplayStatusEnum.COMPLETED:
        this.LoadHearingRequestAndRedirect(hearing.hearingID, `/hearings/view/hearing-completed-summary/${hearing.hearingID}`);
        break;
      case EXUIDisplayStatusEnum.ADJOURNED:
        this.LoadHearingRequestAndRedirect(hearing.hearingID, `/hearings/view/hearing-adjourned-summary/${hearing.hearingID}`);
        break;
      case EXUIDisplayStatusEnum.AWAITING_ACTUALS:
        this.LoadHearingRequestAndRedirect(hearing.hearingID, `/hearings/view/hearing-view-actuals-summary/${hearing.hearingID}`);
        break;
      case EXUIDisplayStatusEnum.FAILURE:
        this.LoadHearingRequestAndRedirect(hearing.hearingID, `/hearings/view/hearing-request-failed-summary/${hearing.hearingID}`);
        break;
      default:
        this.router.navigate(['/', 'hearings', 'view']);
        break;
    }
  }

  public LoadHearingRequestAndRedirect(hearingID: string, targetURL: string) {
    this.hearingStore.dispatch(new fromHearingStore.LoadHearingRequest({ hearingID, targetURL }));
  }
}
