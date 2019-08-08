import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCasesFeature from '../../store';
import { Jurisdiction, CaseType, CaseState, SearchResultView, PaginationMetadata } from '@hmcts/ccd-case-ui-toolkit';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { ActionBindingModel } from '../../../cases/models/create-case-actions.model';
import { FormGroup } from '@angular/forms';

/**
 * Entry component wrapper for ccd-search-filters-wrapper ccd-search-result
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-search-case',
  templateUrl: 'case-search.component.html',
  styleUrls: ['case-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaseSearchComponent implements OnInit, OnDestroy {
  caseSearchFilterEventsBindings: ActionBindingModel[];
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

  filterSubscription: Subscription;
  resultSubscription: Subscription;

  resultsArr: any[] = [];

  paginationSize: number;

  state: any;

  constructor(
    public store: Store<fromCasesFeature.State>,
    private appConfig: AppConfig
  ) {

  }

  ngOnInit(): void {
    this.store.dispatch(new fromCasesFeature.Reset());
    this.fromCasesFeature = fromCasesFeature;
    this.caseSearchFilterEventsBindings = [
      { type: 'onApply', action: 'ApplySearchFilter' },
      { type: 'onReset', action: 'Reset' }
    ];

    this.paginationSize = this.appConfig.getPaginationPageSize();

    this.jurisdiction$ = this.store.pipe(select(fromCasesFeature.searchFilterJurisdiction));
    this.caseType$ = this.store.pipe(select(fromCasesFeature.searchFilterCaseType));
    this.caseState$ = this.store.pipe(select(fromCasesFeature.searchFilterCaseState));
    this.resultView$ = this.store.pipe(select(fromCasesFeature.searchFilterResultView));
    this.metadataFields$ = this.store.pipe(select(fromCasesFeature.searchFilterMetadataFields));

    this.filterSubscription = combineLatest([
      this.jurisdiction$,
      this.caseType$,
      this.caseState$,
      this.metadataFields$
    ]).subscribe(result => {
      this.jurisdiction = {
        ...result[0]
      };
      this.caseType = {
        ...result[1]
      };
      this.caseState = {
        ...result[2]
      };
      this.metadataFields = {
        ...result[3]
      };
    });

    this.resultSubscription = this.resultView$.subscribe(resultView => {

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

    this.checkLSAndTrigger();
  }

  checkLSAndTrigger() {

    const formGroupFromLS = JSON.parse(localStorage.getItem('search-form-group-value'));
    const jurisdictionFromLS = JSON.parse(localStorage.getItem('search-jurisdiction'));
    const caseTypeGroupFromLS = JSON.parse(localStorage.getItem('search-caseType'));
    const metadataFieldsGroupFromLS = JSON.parse(localStorage.getItem('search-metadata-fields'));

    if (formGroupFromLS && jurisdictionFromLS && caseTypeGroupFromLS && metadataFieldsGroupFromLS) {
      const event = {
        selected: {
          jurisdiction: jurisdictionFromLS,
          caseType: caseTypeGroupFromLS,
          metadataFields: metadataFieldsGroupFromLS,
          formGroup: {
            value: formGroupFromLS
          }
        }
      };

      this.store.dispatch(new fromCasesFeature.ApplySearchFilter(event));
    }
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

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    if (this.resultSubscription) {
      this.resultSubscription.unsubscribe();
    }
  }

}
