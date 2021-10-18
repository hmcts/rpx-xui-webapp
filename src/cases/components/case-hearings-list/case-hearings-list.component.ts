import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseHearingModel } from '../../../hearings/models/caseHearing.model';
import { Actions, HearingsSectionStatusEnum } from '../../../hearings/models/hearings.enum';

@Component({
  selector: 'exui-case-hearings-list',
  templateUrl: './case-hearings-list.component.html',
  styleUrls: ['./case-hearings-list.component.scss']
})

export class CaseHearingsListComponent implements OnInit {

  @Input()
  public status: HearingsSectionStatusEnum;

  @Input()
  public hearingsList$: Observable<CaseHearingModel[]>;

  @Input()
  public actions: Actions[];

  public hasUpdateAction: boolean = false;
  public hasDeleteAction: boolean = false;
  public hasReadOnlyAction: boolean = false;

  public ngOnInit(): void {
    if (this.status === HearingsSectionStatusEnum.PAST_AND_CANCELLED) {
      this.hasReadOnlyAction = true;
    } else {
      if (this.actions.includes(Actions.Update)) {
        this.hasUpdateAction = true;
      }
      if (this.actions.includes(Actions.Delete)) {
        this.hasDeleteAction = true;
      }
      if (this.actions.length === 1 && this.actions.includes(Actions.Read)) {
        this.hasReadOnlyAction = true;
      }
    }
  }

}
