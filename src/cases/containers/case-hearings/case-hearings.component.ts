import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromFeature from '../../../hearings/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'exui-case-hearings',
  templateUrl: './case-hearings.component.html'
})
export class CaseHearingsComponent implements OnInit {

  constructor(private readonly store: Store<fromFeature.State>,
              private readonly activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const caseID = this.activatedRoute.snapshot.params.cid;
    this.store.dispatch(new fromFeature.LoadAllHearings(caseID));

    this.store.pipe(select(fromFeature.getHearingsList)).subscribe(
      hearingsList => console.log('hearingsList', hearingsList)
    );
  }

}
