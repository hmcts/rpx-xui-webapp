import { Reset } from './../../store/actions/case-search.action';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActionBindingModel } from '../../models/create-case-actions.model';
import { Store, select } from '@ngrx/store';
import * as fromCasesFeature from '../../store';
import * as fromCaseCreate from '../../store/reducers';
import { Jurisdiction, CaseType, CaseState, SearchResultView, PaginationMetadata, SearchService } from '@hmcts/ccd-case-ui-toolkit';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';

/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-search-case',
  templateUrl: 'case-search.component.html',
  styleUrls: ['case-search.component.scss'],
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

  paginationSize: number;

  constructor(
    public store: Store<fromCasesFeature.State>,
    private searchService: SearchService,
    private appConfig: AppConfig
  ) {

    const state = this.store.pipe(select(fromCasesFeature.getSearchState));
    this.paginationSize = this.appConfig.getPaginationPageSize();

    state.subscribe(st => {
      this.assignData(st);
    });
  }

  assignData(st) {
    if (typeof st !== 'undefined' && st !== null) {
      this.jurisdiction = st.jurisdiction.value as Jurisdiction;
      this.caseType = st.caseType.value as CaseType;
      this.metadataFields = st.metadataFields.value as Array<string>;
      this.caseState = this.caseType.states[0];
      const lfg = JSON.parse(localStorage.getItem('search-form-group-value'));
      const search = this.searchService.search(this.jurisdiction.id, this.caseType.id, this.metadataFields, lfg, null);
      search.subscribe(
        data => {
          this.assignResult(data);
        });

    } else if (st === null) {
      this.resultView = null;
    }
  }
  assignResult(data) {
    this.paginationMetadata = new PaginationMetadata();
    this.paginationMetadata.total_results_count = data.results.length;
    this.paginationMetadata.total_pages_count = Math.ceil(data.results.length / this.paginationSize);
    this.resultsArr = data.results;
    this.resultView = {
      ...data,
      results: data.results.slice(0, this.paginationSize)
    };
  }
  ngOnInit(): void {
    this.fromCasesFeature = fromCasesFeature;
    this.caseSearchEventsBindings = [
      { type: 'onJurisdiction', action: 'JurisdictionSelected' },
      { type: 'onApply', action: 'Applied' },
      { type: 'onReset', action: 'Reset' }
    ];
  }

  applyChangePage(selected) {
    const startingPoint = (selected.page - 1) * this.paginationSize;
    const endingPoint = startingPoint + this.paginationSize;
    const newArr = this.resultsArr.slice(startingPoint, endingPoint);

    this.resultView = {
      ...this.resultView,
      results: newArr,
      hasDrafts: this.resultView.hasDrafts
    };

  }

  getFormGroup(payload) {
    this.fg = payload.formGroup;
  }
}
