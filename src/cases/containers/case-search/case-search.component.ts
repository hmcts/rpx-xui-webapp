import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCasesFeature from '../../store';
import { Jurisdiction, CaseType, CaseState, SearchResultView, PaginationMetadata } from '@hmcts/ccd-case-ui-toolkit';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { ActionBindingModel } from 'src/cases/models/create-case-actions.model';

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

  resultsArr: any[] = [];

  paginationSize: number;

  state: any;

  constructor(
    public store: Store<fromCasesFeature.State>,
    private appConfig: AppConfig
  ) {

  }

  ngOnInit(): void {
    this.fromCasesFeature = fromCasesFeature;
    this.caseSearchEventsBindings = [
      { type: 'onJurisdiction', action: 'JurisdictionSelected' },
      { type: 'onApply', action: 'ApplySearchFilter' },
      { type: 'onReset', action: 'Reset' }
    ];
    this.state = this.store.pipe(select(fromCasesFeature.getSearchState));
    this.paginationSize = this.appConfig.getPaginationPageSize();

    this.state.subscribe(st => {
      if (st.resultView) {
        this.jurisdiction = st.jurisdiction.value as Jurisdiction;
        this.caseType = st.caseType.value as CaseType;
        this.metadataFields = st.metadataFields.value as Array<string>;
        this.caseState = this.caseType.states[0];
        this.paginationMetadata = new PaginationMetadata();
        const data = st.resultView;
        this.paginationMetadata.total_results_count = data.results.length;
        this.paginationMetadata.total_pages_count = Math.ceil(data.results.length / this.paginationSize);
        this.resultsArr = data.results;
        this.resultView = {
          ...data,
          results: data.results.slice(0, this.paginationSize),
          hasDrafts: data.hasDrafts ? data.hasDrafts : () => false
        };
      }
    });
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

  applySearchFilter(event) {
    this.store.dispatch(new fromCasesFeature.ApplySearchFilter(event));
  }

}
