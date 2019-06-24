import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCasesFeature from '../../store';
import { Jurisdiction, CaseType, CaseState, SearchResultView, PaginationMetadata } from '@hmcts/ccd-case-ui-toolkit';
import { Subscription, Observable } from 'rxjs';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { ActionBindingModel } from '../../../cases/models/create-case-actions.model';
import { FormGroup } from '@angular/forms';

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
  caseSearchFilterEventsBindings: ActionBindingModel[];
  caseSearchResultEventsBindings: ActionBindingModel[];
  fromCasesFeature; any;

  jurisdiction$: Observable<Jurisdiction>;
  caseType$: Observable<CaseType>;
  caseState$: Observable<CaseState>;
  resultView$: Observable<SearchResultView>;
  paginationMetadata$: Observable<PaginationMetadata>;
  metadataFields$: Observable<string[]>;
  fg: FormGroup;

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
    this.caseSearchFilterEventsBindings = [
      { type: 'onApply', action: 'ApplySearchFilter' }
    ];
    this.caseSearchResultEventsBindings = [
      { type: 'changePage', action: '' }
    ];

    this.paginationSize = this.appConfig.getPaginationPageSize();

    this.jurisdiction$ = this.store.pipe(select(fromCasesFeature.searchFilterJurisdiction));
    this.caseType$ = this.store.pipe(select(fromCasesFeature.searchFilterCaseType));
    this.caseState$ = this.store.pipe(select(fromCasesFeature.searchFilterCaseState));
    this.resultView$ = this.store.pipe(select(fromCasesFeature.searchFilterResultView));
    this.metadataFields$ = this.store.pipe(select(fromCasesFeature.searchFilterMetadataFields));

    this.jurisdiction$.subscribe(jurisdiction => this.jurisdiction = {
      ...jurisdiction
    });
    this.caseType$.subscribe(caseType => this.caseType = {
      ...caseType
    });
    this.caseState$.subscribe(caseState => this.caseState = {
      ...caseState
    });

    this.metadataFields$.subscribe(metadataFields => this.metadataFields = {
      ...metadataFields
    });

    this.resultView$.subscribe(resultView => {

      this.paginationMetadata = new PaginationMetadata();
      const resultViewResultsLength = resultView.results ? resultView.results.length : 0;
      this.paginationMetadata.total_results_count = resultViewResultsLength;
      this.paginationMetadata.total_pages_count = Math.ceil(resultViewResultsLength / this.paginationSize);
      this.resultsArr = resultView.results;
      this.resultView = {
        ...resultView,
        columns: resultView.columns ? resultView.columns : [],
        results: resultView.results ? resultView.results.map(item => {
          return {
            ...item,
            hydrated_case_fields: null
          };
        }).slice(0, this.paginationSize) : [],
        hasDrafts: resultView.hasDrafts ? resultView.hasDrafts : () => false
      };
    });

  }

  applyChangePage(event) {
    if (this.resultsArr.length > 0) {
      const startingPoint = (event.selected.page - 1) * this.paginationSize;
      const endingPoint = startingPoint + this.paginationSize;
      const newArr = this.resultsArr.map(item => {
        return {
          ...item,
          hydrated_case_fields: null
        };
      }).slice(startingPoint, endingPoint);

      this.resultView = {
        ...this.resultView,
        results: newArr,
        hasDrafts: this.resultView.hasDrafts
      };
    }
  }

  applySearchFilter(event) {
    this.fg = {
      ...event.selected.formGroup
    };
    this.store.dispatch(new fromCasesFeature.ApplySearchFilter(event.selected));
  }

}
