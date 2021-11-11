import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseHearingViewModel } from '../../../models/case-hearing-view.model';
import { Actions, EXUISectionStatusEnum } from '../../../hearings/models/hearings.enum';
import * as moment from 'moment';
@Component({
  selector: 'exui-case-hearings-list',
  templateUrl: './case-hearings-list.component.html',
  styleUrls: ['./case-hearings-list.component.scss']
})

export class CaseHearingsListComponent implements OnInit {
  @Input()
  public status: EXUISectionStatusEnum;

  @Input()
  public hearingsList$: Observable<CaseHearingViewModel[]>;

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

  public get minimumDate(): string {
    return moment(new Date('01/01/1900')).format('l');
  }

  public minValueFilter(expression: string) {
    if (expression) {
      return expression === this.minimumDate ? '' : expression;
    }
  }
}
