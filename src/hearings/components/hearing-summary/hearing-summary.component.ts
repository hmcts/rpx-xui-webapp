import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {HearingConditions} from '../../models/hearingConditions';
import {Mode} from '../../models/hearings.enum';
import {Section} from '../../models/section';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-hearing-summary',
  templateUrl: './hearing-summary.component.html',
})
export class HearingSummaryComponent {

  @Input() public template: Section[];
  @Input() public mode: Mode;
  private hearingState$: Observable<fromHearingStore.State>;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly router: Router) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public changeAnswer(changeLink: string): void {
    const hearingCondition: HearingConditions = {
      mode: this.mode,
    };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
    this.router.navigateByUrl(changeLink);
  }
}
