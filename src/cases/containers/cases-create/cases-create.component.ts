import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromCaseCreate from '../../store';
import {Store} from '@ngrx/store';
import * as fromCasesFeature from '../../../cases/store';
import {ActionBindingModel} from '../../models/create-case-actions.model';
import {mocked} from '../../models/search-filter-dummy-data-to-delete'
import {JurisdictionSelected} from '../../store/actions/case-search.action';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'app-create-case',
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
      <p>search-filter container</p>
      <exui-ccd-connector
        [eventsBindings]="caseSearchEventsBindings"
        [store]="store"
        [fromFeatureStore]="fromCasesFeature">
        <ccd-search-filters #ccdComponent
          [autoApply]="true"
          [jurisdictions]="jurisdictions">
        </ccd-search-filters>
      </exui-ccd-connector>
    </exui-page-wrapper>
  `,
  encapsulation: ViewEncapsulation.None
})
export class CasesCreateComponent implements OnInit {
  // TODO move this to store or better place
  jurisdictionId = 'TEST';
  caseTypeId = 'TestAddressBookCase';
  eventTriggerId = 'createCase';
  caseCreateEventsBindings: ActionBindingModel[];
  caseSearchEventsBindings: ActionBindingModel[];
  fromCasesFeature: any;
  jurisdictions: Jurisdiction[];

  constructor(private store: Store<fromCaseCreate.CasesState>) {}

  ngOnInit(): void {
    this.fromCasesFeature = fromCasesFeature;
    this.jurisdictions = [ mocked.juristdiction1, mocked.juristdiction2 ];

    /**
     * Mapping CCD components eventsBindings to ExUI Actions
     */
    this.caseCreateEventsBindings = [
      {type: 'cancelled', action: 'ResetChange'},
      {type: 'submitted', action: 'ApplyChange'}
    ];

    this.caseSearchEventsBindings = [
      {type: 'onJurisdiction', action: 'JurisdictionSelected'},
      {type: 'onApply', action: 'Applied'},
      {type: 'onReset', action: 'Reset'}
    ];

  }

}
