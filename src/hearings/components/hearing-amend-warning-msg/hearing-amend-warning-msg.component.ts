import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { KEY_MODE } from '../../models/hearingConditions';
import { Mode } from '../../models/hearings.enum';
import * as fromHearingStore from '../../store';
import { HearingsUtils } from '../../utils/hearings.utils';

@Component({
  standalone: false,

  selector: 'exui-hearing-amend-warning-msg',
  templateUrl: './hearing-amend-warning-msg.component.html'

})
export class HearingAmendWarningMsgComponent implements OnInit, OnDestroy {
  @Input() public warningMsg: string = '';
  public hearingConditionsSub: Subscription;
  public isViewEditMode: boolean = false;
  constructor(private readonly hearingStore: Store<fromHearingStore.State>) {}

  public ngOnInit(): void {
    this.hearingConditionsSub = this.hearingStore.pipe(select(fromHearingStore.getHearingConditions)).subscribe(
      (hearingConditions) => {
        this.isViewEditMode = HearingsUtils.hasPropertyAndValue(
          hearingConditions, KEY_MODE, Mode.VIEW_EDIT);
      });
  }

  public ngOnDestroy(): void {
    if (this.hearingConditionsSub) {
      this.hearingConditionsSub.unsubscribe();
    }
  }
}
