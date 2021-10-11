import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CaseHearingModel } from '../../../hearings/models/caseHearing.model';
import * as fromFeature from '../../../hearings/store';

@Component({
  selector: 'exui-case-hearings',
  templateUrl: './case-hearings.component.html'
})
export class CaseHearingsComponent implements OnInit {

  public upcomingHearings$: Observable<CaseHearingModel[]>;
  public pastAndCancelledHearings$: Observable<CaseHearingModel[]>;

  constructor(private readonly store: Store<fromFeature.State>,
              private readonly activatedRoute: ActivatedRoute) {
    const caseID = this.activatedRoute.snapshot.params.cid;
    this.store.dispatch(new fromFeature.LoadAllHearings(caseID));
  }

  public ngOnInit(): void {
    this.upcomingHearings$ = this.getHearsListByStatus('Upcoming');
    this.pastAndCancelledHearings$ = this.getHearsListByStatus('Past and cancelled');
  }

  public getHearsListByStatus(status: string): Observable<CaseHearingModel[]> {
    return this.store.pipe(select(fromFeature.getHearingsList)).pipe(
      map(hearingsStateData => {
          if (hearingsStateData && hearingsStateData.caseHearingsMainModel && hearingsStateData.caseHearingsMainModel.caseHearings) {
            return hearingsStateData.caseHearingsMainModel.caseHearings.filter(hearing =>
              hearing.hmcStatus === status
            );
          } else {
            return [];
          }
        }
      )
    );
  }

}
