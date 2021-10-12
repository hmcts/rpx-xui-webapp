import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseHearingModel } from '../../../hearings/models/caseHearing.model';
import { Actions } from '../../../hearings/models/hearings.enum';

@Component({
  selector: 'exui-case-hearings-list',
  templateUrl: './case-hearings-list.component.html',
  styleUrls: ['./case-hearings-list.component.scss']
})

export class CaseHearingsListComponent implements OnInit {

  @Input()
  public status: string;

  @Input()
  public hearingsList$: Observable<CaseHearingModel[]>;

  @Input()
  public actions: Actions[];

  public hasViewChangeAction: boolean = false;
  public hasCancelAction: boolean = false;
  public hasViewOnlyAction: boolean = false;

  public ngOnInit(): void {
    if (this.actions.includes(Actions.View) && this.actions.includes(Actions.Change)) {
      this.hasViewChangeAction = true;
    }
    if (this.actions.includes(Actions.Cancel)) {
      this.hasCancelAction = true;
    }
    if (this.actions.length === 1 && this.actions.includes(Actions.View)) {
      this.hasViewOnlyAction = true;
    }
  }

}
