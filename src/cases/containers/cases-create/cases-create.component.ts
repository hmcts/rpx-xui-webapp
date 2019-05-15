import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromCaseCreate from '../../store';
import {Store} from '@ngrx/store';
import * as fromCasesFeature from '../../../cases/store';
import {CreateCaseActionsModel} from '../../models/create-case-actions.model';
/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-create-case',
  template: `
    <exui-page-wrapper [title]="'Create Case'">
      <p>create-case container</p>
      <exui-ccd-connector *exuiFeatureToggle="'ccdCaseCreate'"
        [eventsBindings]="caseCreateEventsBindings"
        [store]="store"
        [fromFeatureStore]="fromCasesFeature">
          <ccd-case-create #ccdComponent
            [jurisdiction]="jurisdictionId"
            [caseType]="caseTypeId"
            [event]="eventTriggerId">
          </ccd-case-create>
      </exui-ccd-connector>
    </exui-page-wrapper>
  `,
  encapsulation: ViewEncapsulation.None
})
export class CasesCreateComponent implements OnInit {
  jurisdictionId = 'TEST';
  caseTypeId = 'TestAddressBookCase';
  eventTriggerId = 'createCase';
  caseCreateEventsBindings: CreateCaseActionsModel[];

  fromCasesFeature: any;

  constructor(private store: Store<fromCaseCreate.CasesState>) {}

  ngOnInit(): void {
    this.fromCasesFeature = fromCasesFeature;

    /**
     * Mapping CCD components eventsBindings to ExUI Actions
     */
    this.caseCreateEventsBindings = [
      {type: 'cancelled', action: 'ResetChange'},
      {type: 'submitted', action: 'ApplyChange'}
    ];

  }

}
