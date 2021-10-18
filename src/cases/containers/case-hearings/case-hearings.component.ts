import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CaseHearingModel } from '../../../hearings/models/caseHearing.model';
import { Actions, HearingsSectionStatusEnum } from '../../../hearings/models/hearings.enum';
import * as fromFeature from '../../../hearings/store';

@Component({
  selector: 'exui-case-hearings',
  templateUrl: './case-hearings.component.html'
})
export class CaseHearingsComponent implements OnInit {
  public upcomingHearings$: Observable<CaseHearingModel[]>;
  public upcomingHearingsActions: Actions[] = [Actions.View, Actions.Change, Actions.Cancel];
  public upcomingStatus: HearingsSectionStatusEnum = HearingsSectionStatusEnum.UPCOMING;
  public pastAndCancelledHearings$: Observable<CaseHearingModel[]>;
  public pastAndCancelledActions: Actions[] = [Actions.View];
  public pastAndCancelledStatus: HearingsSectionStatusEnum = HearingsSectionStatusEnum.PAST_AND_CANCELLED;

  constructor(private readonly store: Store<fromFeature.State>,
              private readonly activatedRoute: ActivatedRoute
              ) {
    const caseID = this.activatedRoute.snapshot.params.cid;
    this.store.dispatch(new fromFeature.LoadAllHearings(caseID));
  }

  public ngOnInit(): void {
    this.upcomingHearings$ = this.getHearsListByStatus(HearingsSectionStatusEnum.UPCOMING);
    this.pastAndCancelledHearings$ = this.getHearsListByStatus(HearingsSectionStatusEnum.PAST_AND_CANCELLED);
  }

  public getHearsListByStatus(status: string): Observable<CaseHearingModel[]> {   
    return this.store.pipe(select(fromFeature.getHearingsList)).pipe(
      map(hearingsStateData => {
          console.log('hearing', hearingsStateData);
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
