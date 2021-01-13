import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import * as fromRoot from '../../../app/store';
import * as fromCases from '../../../cases/store';
import {ActionBindingModel} from '../../models/create-case-actions.model';
import * as fromCaseCreate from '../../store';
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
  public caseCreateInputs: {jurisdictionId: string; caseTypeId: string; eventId: string};

  public caseCreateEventsBindings: ActionBindingModel[];
  public fromCasesFeature: any;
  public $inputSubscription: Subscription;

  constructor(private readonly store: Store<fromCaseCreate.State>) {
  }

  public ngOnInit(): void {
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

  public ngOnDestroy(): void {
    this.$inputSubscription.unsubscribe();
  }

}
