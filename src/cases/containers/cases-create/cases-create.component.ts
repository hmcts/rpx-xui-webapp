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
      </ccd-search-filters>
                          (onJurisdiction)="jurisdictionSelected($event)">
                          (onReset)="reset()"
                          (onApply)="applied($event)"
                          [jurisdictions]="jurisdictions"
      <ccd-search-filters [autoApply]="true"
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
export class CasesCreateComponent {
  // TODO move this to store or better place
  jurisdictionId = 'TEST';
  caseTypeId = 'TestAddressBookCase';
  eventTriggerId = 'createCase';
  caseCreateEventsBindings: CreateCaseActionsModel[];

  fromCasesFeature: any;

  constructor(private store: Store<fromCaseCreate.CasesState>) {}
  //For Searchfilters only
  readonly CASE_TYPE_1: CaseType = {
    id: 'CT0',
    name: 'Case type 0',
    description: '',
    states: [],
    events: [],
    case_fields: [],
    jurisdiction: null
  };
  readonly CASE_TYPE_2: CaseType = {
    id: 'CT2',
    name: 'Case type 2',
    description: '',
    states: [],
    events: [],
    case_fields: [],
    jurisdiction: null
  };
  readonly CASE_TYPE_3: CaseType = {
    name: 'Case type 3',
    id: 'CT3',
    description: '',
    states: [],
    events: [],
    case_fields: [],
    jurisdiction: null
  };
  readonly JURISDICTION_1: Jurisdiction = {
    id: 'J1',
    name: 'Jurisdiction 1',
    description: '',
    caseTypes: [this.CASE_TYPE_1, this.CASE_TYPE_2]
  };
  readonly JURISDICTION_2: Jurisdiction = {
    id: 'J2',
    name: 'Jurisdiction 2',
    description: '',
    caseTypes: [this.CASE_TYPE_3]
  };
  jurisdictions: Jurisdiction[];

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

  chooseEvent() {
    this.caseType = JSON.parse(this.caseSelected);
    this.logger.info(this.caseType);
  }

}
