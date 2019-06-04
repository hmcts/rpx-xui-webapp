import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromCaseCreate from '../../store';
import {select, Store} from '@ngrx/store';
import * as fromCasesFeature from '../../../cases/store';
import * as fromRoot from '../../../app/store';
import {ActionBindingModel} from '../../models/create-case-actions.model';
import {Subscription} from 'rxjs';
/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-create-case',
  template: `
    <exui-page-wrapper>
      <div *ngIf="caseCreateInputs.jurisdictionId">
        <exui-ccd-connector
          *exuiFeatureToggle="'ccdCaseCreate'"
          [eventsBindings]="caseCreateEventsBindings"
          [store]="store"
          [fromFeatureStore]="fromCasesFeature">
          <ccd-case-create
            #ccdComponent
            [jurisdiction]="caseCreateInputs.jurisdictionId"
            [caseType]="caseCreateInputs.caseTypeId"
            [event]="caseCreateInputs.eventId">
          </ccd-case-create>
        </exui-ccd-connector>
      </div>
    </exui-page-wrapper>
  `,
  encapsulation: ViewEncapsulation.None
})
export class CasesCreateComponent implements OnInit, OnDestroy{
  caseCreateInputs: {jurisdictionId: string; caseTypeId: string; eventId: string}

  caseCreateEventsBindings: ActionBindingModel[];
  fromCasesFeature: any;
  $inputSubscription: Subscription;

  constructor(private store: Store<fromCaseCreate.State>) {}

  ngOnInit(): void {
    this.fromCasesFeature = fromCasesFeature;
    this.$inputSubscription = this.store.pipe(select(fromCasesFeature.getCreateCaseFilterState))
      .subscribe(caseFilterInput => {
        if (!caseFilterInput.jurisdictionId) {
          this.store.dispatch(new fromRoot.Go({
            path: ['/cases/case-filter'],
          }));
          return;
        }
        this.caseCreateInputs = caseFilterInput;
      });
    /**
     * Mapping CCD components eventsBindings to ExUI Actions
     */
    this.caseCreateEventsBindings = [
      {type: 'cancelled', action: 'ResetChange'},
      {type: 'submitted', action: 'ApplyChange'}
    ];

  }

  ngOnDestroy(): void {
    this.$inputSubscription.unsubscribe();
  }

}
