
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseHearingModel } from 'api/hearings/models/caseHearing.model';
import { select, Store } from '@ngrx/store';
import * as fromFeature from '../../../hearings/store';

@Component({
  selector: 'exui-case-hearings',
  templateUrl: './case-hearings.component.html',
  styles: [ `.header-container { margin-top: 30px; }` ]
})

export class CaseHearingsComponent implements OnInit {
  @Output() viewHearing = new EventEmitter<CaseHearingModel>();
  @Output() cancelHearing = new EventEmitter<CaseHearingModel>();
  @Output() requestHearing = new EventEmitter<any>();

  constructor(private readonly store: Store<fromFeature.State>,
              private readonly activatedRoute: ActivatedRoute) {
  }

  public combinedHearing = [];
  public groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
          map.set(key, [item]);
      } else {
          collection.push(item);
      }
    });
    return map;
  }

  public ngOnInit(): void {
    const caseID = this.activatedRoute.snapshot.params.cid;
    this.store.dispatch(new fromFeature.LoadAllHearings(caseID));
    this.store.pipe(select(fromFeature.getHearingsList)).subscribe(
      hearingsList => {
        if (hearingsList && hearingsList.caseHearingsMainModel) {
          const groupedHearing = this.groupBy(hearingsList.caseHearingsMainModel.caseHearings, hearing => hearing.hmcStatus);
          this.combinedHearing = [];
          Array.from(groupedHearing.values()).forEach(value => this.combinedHearing.push(value));
        }
      }
    );
  }
}
