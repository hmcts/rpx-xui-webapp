
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseHearingModel } from 'api/hearings/models/caseHearing.model';
import { CaseHearingsMainModel } from 'api/hearings/models/caseHearingsMain.model';
import { select, Store } from '@ngrx/store';
import * as fromFeature from '../../../hearings/store';
import { HearingsStateData } from 'src/hearings/models/hearingsStateData.model';

@Component({
  selector: 'exui-case-hearings',
  templateUrl: './case-hearings.component.html',
  styles:[`
    .header-container { margin-top: 30px; }
    .TORQUISE { background-color: purple; padding:5px }
    .GREEN { background-color: green; padding:5px }
    .GREY { background-color: grey; padding:5px }
    .RED { background-color: red; padding:5px}
  `]
})

export class CaseHearingsComponent implements OnInit {
 // @Input() caseHearing: CaseHearingsMainModel[];
  @Output() viewHearing = new EventEmitter<CaseHearingModel>();
  @Output() cancelHearing = new EventEmitter<CaseHearingModel>();
  @Output() requestHearing = new EventEmitter<any>();
  public hearingsList: HearingsStateData;

  constructor(private readonly store: Store<fromFeature.State>,
              private readonly activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const caseID = this.activatedRoute.snapshot.params.cid;
    this.store.dispatch(new fromFeature.LoadAllHearings(caseID));
    this.store.pipe(select(fromFeature.getHearingsList)).subscribe(
      hearingsList => {
        console.log('hearinglist', hearingsList.caseHearingsMainModel.caseHearings);
        this.hearingsList = hearingsList;
      }
    );
  }
}
