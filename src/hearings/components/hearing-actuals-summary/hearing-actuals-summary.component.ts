import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActualsSection } from '../../models/actualsSection';
import { Mode } from '../../models/hearings.enum';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-hearing-actuals-summary',
  templateUrl: './hearing-actuals-summary.component.html',
  styleUrls: ['./hearing-actuals-summary.component.scss']
})
export class HearingActualsSummaryComponent implements OnInit {

  @Input() public template: ActualsSection[];
  @Input() public mode: Mode;
  public hearingState$: Observable<fromHearingStore.State>;
  public id: string;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly route: ActivatedRoute) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
  }
}

