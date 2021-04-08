import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromCaseCreate from '../../store';
import {select, Store} from '@ngrx/store';
import * as fromCases from '../../../cases/store';
import * as fromRoot from '../../../app/store';
import {ActionBindingModel} from '../../models/create-case-actions.model';
import {Subscription} from 'rxjs';
/**
 * Entry component wrapper for CddCreateCaseFilter
 * Smart Component consuming <ccd-case-create>
 * Initialized from routing
 */
@Component({
  selector: 'exui-create-case',
  templateUrl: './case-create.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CasesCreateComponent implements OnInit, OnDestroy {
  caseCreateInputs: {jurisdictionId: string; caseTypeId: string; eventId: string};

  caseCreateEventsBindings: ActionBindingModel[];
  fromCasesFeature: any;
  $inputSubscription: Subscription;

  constructor(private store: Store<fromCaseCreate.State>) {
  }

  ngOnInit(): void {
    this.fromCasesFeature = fromCases;
    // TODO try to be nice and remove subscription use pipe | instead
    this.$inputSubscription = this.store.pipe(select(fromCases.getCreateCaseFilterState))
      .subscribe(caseFilterInput => {
        // if state is reseated then redirect
        if (!caseFilterInput.jurisdictionId) {
          this.store.dispatch(new fromRoot.Go({
            path: ['/cases/case-list'],
          }));
          return;
        }
        this.caseCreateInputs = caseFilterInput;
      });
    /**
     * Mapping CCD components eventsBindings to ExUI Actions
     */
    this.caseCreateEventsBindings = [
      {type: 'cancelled', action: 'CreateCaseReset'},
      {type: 'submitted', action: 'ApplyChange'}
    ];

  }

  ngOnDestroy(): void {
    this.$inputSubscription.unsubscribe();
  }

}
