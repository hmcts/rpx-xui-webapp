import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {HearingConditions} from '../../../hearings/models/hearingConditions';
import {HearingListViewModel} from '../../../hearings/models/hearingListView.model';
import {Actions, EXUIDisplayStatusEnum, EXUISectionStatusEnum, Mode} from '../../../hearings/models/hearings.enum';
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
  public hasUpdateAction: boolean = false;
  public hasDeleteAction: boolean = false;
  public hasReadOnlyAction: boolean = false;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly router: Router) {
  }

  public ngOnInit(): void {
    if (this.status === EXUISectionStatusEnum.PAST_AND_CANCELLED) {
      this.hasReadOnlyAction = true;
    } else {
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

  public viewAndEdit(): void {
    const hearingCondition: HearingConditions = {
      mode: Mode.VIEW,
    };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
    this.router.navigate(['/', 'hearings', 'request', 'hearing-view-edit-summary']);
  }

  public addAndEdit(): void {
    const hearingCondition: HearingConditions = {
      mode: Mode.VIEW,
    };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
    this.router.navigate(['/', 'hearings', 'request', 'hearing-actual-add-edit']);
  }

  public hasAddEdit(hearing: HearingListViewModel): boolean {
    return hearing.exuiDisplayStatus === EXUIDisplayStatusEnum.AWAITING_HEARING_ACTUALS;
  }
}
