import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { HearingActualsMainModel } from '../../models/hearingActualsMainModel';
import { HearingsService } from '../../services/hearings.service';
import {ActualsSection} from '../../models/actualsSection';
import {Mode} from '../../models/hearings.enum';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-hearing-actuals-summary',
  templateUrl: './hearing-actuals-summary.component.html',
})
export class HearingActualsSummaryComponent implements OnInit {

  @Input() public template: ActualsSection[];
  @Input() public mode: Mode;
  private hearingState$: Observable<fromHearingStore.State>;
  public hearingActuals$: Observable<HearingActualsMainModel>;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService,
              private readonly router: Router) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    console.log('TEMPLATE', this.template);
    this.template.forEach(section => {
      console.log('SECTION', section);
    });

    // TODO: Get hearing actuals from store
    this.hearingActuals$ = this.hearingsService.getHearingActuals('1234');

    this.hearingState$.subscribe(x => {
      console.log('HEARING STATE', x);
    });

    this.hearingsService.getHearingActuals('1234').subscribe(x => {
      console.log('HEARING ACTUALS', x);
    });
  }
}
