import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActionBindingModel} from '../../models/create-case-actions.model';
import {Jurisdiction, SearchResultView, SearchResultViewColumn} from '@hmcts/ccd-case-ui-toolkit';
import * as fromCasesFeature from '../../store';
import {mocked} from '../../models/search-filter-dummy-data-to-delete';
import {Store, select} from '@ngrx/store';
import * as fromCaseCreate from '../../store/reducers';
import * as fromSearch from '../../store/';
/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-search-case',
  templateUrl: 'case-search.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CaseSearchComponent implements OnInit {
  caseSearchEventsBindings: ActionBindingModel[];
  caseSearchResultEventsBindings: ActionBindingModel[];

  fromCasesFeature: any;
  jurisdictions: Jurisdiction[];

  jurisdiction: any;
  caseType: any;
  caseState: any;
  caseFilterFG: any;
  resultView: any;
  page: any;
  paginationMetadata: any;
  metadataFields: [];

  constructor(private store: Store<fromCaseCreate.State>) {}

  ngOnInit(): void {
    this.store
    .pipe(select(fromSearch.getSearchState))
    .subscribe(state => {
      this.caseType = state.caseType;
      this.jurisdiction = state.jurisdiction;
      this.paginationMetadata = state.metadataFields;

    });

    this.fromCasesFeature = fromCasesFeature;
    this.jurisdictions = [ mocked.juristdiction1, mocked.juristdiction2 ];
    this.caseSearchEventsBindings = [
      {type: 'onJurisdiction', action: 'JurisdictionSelected'},
      {type: 'onApply', action: 'Applied'},
      {type: 'onReset', action: 'Reset'}
    ];

    this.caseSearchResultEventsBindings = [
      {type: 'onChangePage', action: 'changePage' }
    ];
  }

  getResultView(): SearchResultView {
    const result = new SearchResultView();
    result.columns = [];
    return result;
  }

  setTempPayload(payload) {
    this.caseFilterFG = payload.formGroup;
    console.log(payload);
  }

}
