import { Reset } from './../../store/actions/case-search.action';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActionBindingModel} from '../../models/create-case-actions.model';
import {Store, select} from '@ngrx/store';
import * as fromCasesFeature from '../../store';
import * as fromCaseCreate from '../../store/reducers';
import { Jurisdiction, CaseType, CaseState, SearchResultView, PaginationMetadata, SearchService } from '@hmcts/ccd-case-ui-toolkit';
import { FormGroup } from '@angular/forms';
import { AppConfig } from 'src/app/services/ccd-config/ccd-case.config';

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
  fromCasesFeature; any;

  jurisdiction: Jurisdiction;
  caseType: CaseType;
  caseState: CaseState;
  resultView: SearchResultView;
  paginationMetadata: PaginationMetadata;
  metadataFields: string[];
  fg: FormGroup;

  resultsArr: any[] = [];

  constructor(public store: Store<fromCasesFeature.State>,
              private appConfig: AppConfig,
              private searchService: SearchService) {

    const state = this.store.pipe(select(fromCasesFeature.getSearchState));

    state.subscribe(st => {
      if (typeof st !== 'undefined' ) {
        this.jurisdiction = st.jurisdiction.value as Jurisdiction;
        this.caseType = st.caseType.value as CaseType;
        this.metadataFields = st.metadataFields.value as Array<string>;
        this.caseState = this.caseType.states[0];
        if (st.searchResult !== null){
          this.paginationMetadata = new PaginationMetadata();
          this.paginationMetadata.total_results_count = st.searchResult.results.length;
          this.paginationMetadata.total_pages_count = Math.ceil(st.searchResult.results.length / 10);
          this.resultView = st.searchResult;
        }
      }
    });
  }

  ngOnInit(): void {
    this.fromCasesFeature = fromCasesFeature;
    this.caseSearchEventsBindings = [
      {type: 'onJurisdiction', action: 'JurisdictionSelected'},
      {type: 'onApply', action: 'Applied'},
      {type: 'onReset', action: 'Reset'}
    ];
  }

  getFormGroup(payload){
    this.fg = payload.formGroup;
  }
}
