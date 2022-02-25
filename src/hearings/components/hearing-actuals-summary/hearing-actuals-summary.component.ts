import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ActualsSection} from '../../models/actualsSection';
import {Mode} from '../../models/hearings.enum';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-hearing-actuals-summary',
  templateUrl: './hearing-actuals-summary.component.html',
})
export class HearingActualsSummaryComponent {

  @Input() public template: ActualsSection[];
  @Input() public mode: Mode;
  public hearingState$: Observable<fromHearingStore.State>;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly router: Router) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }
}

