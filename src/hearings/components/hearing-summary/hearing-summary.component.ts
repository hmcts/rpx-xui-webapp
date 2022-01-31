import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {HearingConditions} from '../../models/hearingConditions';
import {Mode} from '../../models/hearings.enum';
import {Section} from '../../models/section';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-hearing-summary',
  templateUrl: './hearing-summary.component.html',
  styleUrls: ['./hearing-summary.component.scss']
})
export class HearingSummaryComponent {

  @Input() public template: Section[];
  @Input() public mode: Mode;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly router: Router) {
  }

  public changeAnswer(changeLink: string): void {
    const hearingCondition: HearingConditions = {
      mode: this.mode,
    };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
    this.router.navigateByUrl(changeLink);
  }
}
