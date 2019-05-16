import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActionBindingModel} from '../../models/create-case-actions.model';
import {Jurisdiction} from '@hmcts/ccd-case-ui-toolkit';
import * as fromCasesFeature from '../../store';
import {mocked} from '../../models/search-filter-dummy-data-to-delete';
import {Store} from '@ngrx/store';
import * as fromCaseCreate from '../../store/reducers';
/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-search-case',
  template: `<exui-page-wrapper [title]="'Search'">
    <exui-ccd-connector
      [eventsBindings]="caseSearchEventsBindings"
      [store]="store"
      [fromFeatureStore]="fromCasesFeature">
      <ccd-search-filters #ccdComponent
        [autoApply]="true"
        [jurisdictions]="jurisdictions">
      </ccd-search-filters>
    </exui-ccd-connector>
  </exui-page-wrapper>`,
  encapsulation: ViewEncapsulation.None
})
export class CaseSearchComponent implements OnInit {
  caseSearchEventsBindings: ActionBindingModel[];
  fromCasesFeature: any;
  jurisdictions: Jurisdiction[];
  constructor(private store: Store<fromCaseCreate.State>) {}

  ngOnInit(): void {
    this.fromCasesFeature = fromCasesFeature;
    this.jurisdictions = [ mocked.juristdiction1, mocked.juristdiction2 ];
    this.caseSearchEventsBindings = [
      {type: 'onJurisdiction', action: 'JurisdictionSelected'},
      {type: 'onApply', action: 'Applied'},
      {type: 'onReset', action: 'Reset'}
    ];
  }


}
