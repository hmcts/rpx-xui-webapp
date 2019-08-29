import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromCaseProgress from '../../store';
import * as fromCases from '../../store';
import { Subscription } from 'rxjs';
import { ActionBindingModel } from 'src/cases/models/create-case-actions.model';

/**
 * Case Progress Component
 * It consumes ccd-case-progress component
 * param caseId
 * param eventId
 */

@Component({
  selector: 'exui-case-progress',
  templateUrl: './case-progress.component.html'
})
export class CaseProgressComponent implements OnInit {
  caseProgressInputs: { caseId: string; eventId: string };

  caseProgressBindings: ActionBindingModel[];
  fromCasesFeature: any;
  $inputSubscription: Subscription;

  constructor(private store: Store<fromCaseProgress.State>) { }

  ngOnInit(): void {
    this.fromCasesFeature = fromCases;
    this.store.pipe(select(fromCases.getCreateCaseFilterState))
      .subscribe(caseProgressInput => {

      });
    /**
     * Mapping CCD components eventsBindings to ExUI Actions
     */
    this.caseProgressBindings = [
      { type: 'cancelled', action: 'ProgressCaseReset' },
      { type: 'submitted', action: 'ApplyChange' }
    ];

  }

}
