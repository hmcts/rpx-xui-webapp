import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HearingListViewModel} from '../../../hearings/models/hearingListView.model';
import {Actions, EXUISectionStatusEnum} from '../../../hearings/models/hearings.enum';

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
}
