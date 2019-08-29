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
  caseFilterToggle$: Observable<boolean>;

  fg: FormGroup;

  jurisdiction: Jurisdiction;
  caseType: CaseType;
  caseState: CaseState;
  resultView: SearchResultView;
  paginationMetadata: PaginationMetadata = new PaginationMetadata();
  metadataFields: string[];

  filterSubscription: Subscription;
  resultSubscription: Subscription;
  paginationSubscription: Subscription;
  caseFilterToggleSubscription: Subscription;

  resultsArr: any[] = [];

  paginationSize: number;
  page: number;
  showFilter: boolean;
  state: any;
  toggleButtonName: string;

  constructor(
    public store: Store<fromCasesFeature.State>,
    private appConfig: AppConfig
  ) {

  }

  ngOnInit(): void {
    this.page = 1;
    this.resultView = null;
    this.fromCasesFeature = fromCasesFeature;
    this.caseSearchFilterEventsBindings = [
      { type: 'onApply', action: 'FindSearchPaginationMetadata' },
      { type: 'onReset', action: 'Reset' }
    ];

    this.paginationSize = this.appConfig.getPaginationPageSize();

    this.jurisdiction$ = this.store.pipe(select(fromCasesFeature.searchFilterJurisdiction));
    this.caseType$ = this.store.pipe(select(fromCasesFeature.searchFilterCaseType));
    this.caseState$ = this.store.pipe(select(fromCasesFeature.searchFilterCaseState));
    this.resultView$ = this.store.pipe(select(fromCasesFeature.searchFilterResultView));
    this.metadataFields$ = this.store.pipe(select(fromCasesFeature.searchFilterMetadataFields));
    this.paginationMetadata$ = this.store.pipe(select(fromCasesFeature.getSearchFilterPaginationMetadata));
    this.caseFilterToggle$ = this.store.pipe(select(fromCasesFeature.getSearchFilterToggle));
    this.filterSubscription = combineLatest([
      this.jurisdiction$,
      this.caseType$,
      this.caseState$,
      this.metadataFields$,
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

    this.caseFilterToggleSubscription = this.caseFilterToggle$.subscribe( result => {
      if(result){
        this.toggleButtonName = 'Hide Filter';
      } else {
        this.toggleButtonName = 'Show Filter';
      }
      this.showFilter = result;
    });

    this.paginationSubscription = this.paginationMetadata$.subscribe(result => {
      if (typeof result !== 'undefined'  && typeof result.total_pages_count !== 'undefined') {
        this.paginationMetadata.total_pages_count = result.total_pages_count;
        this.paginationMetadata.total_results_count = result.total_results_count;
        const event = this.getEvent();
        if ( event != null) {
          this.store.dispatch(new fromCasesFeature.ApplySearchFilter(event));
        }
      }
    });
    this.resultSubscription = this.resultView$.subscribe(resultView => {
      this.resultsArr = resultView.results;
      this.resultView = {
        ...resultView,
        columns: resultView.columns ? resultView.columns : [],
        results: resultView.results ? resultView.results.map(item => {
          return {
            ...item,
            hydrated_case_fields: null
          };
        }) : [],
        hasDrafts: resultView.hasDrafts ? resultView.hasDrafts : () => false
      };
    });
    this.checkLSAndTrigger();
  }
  getEvent() {
    let event = null;
    const formGroupFromLS = JSON.parse(localStorage.getItem('search-form-group-value'));
    const jurisdictionFromLS = JSON.parse(localStorage.getItem('search-jurisdiction'));
    const caseTypeGroupFromLS = JSON.parse(localStorage.getItem('search-caseType'));
    const metadataFieldsGroupFromLS = JSON.parse(localStorage.getItem('search-metadata-fields'));

    if (formGroupFromLS && jurisdictionFromLS && caseTypeGroupFromLS && metadataFieldsGroupFromLS) {
      event = {
        selected: {
          jurisdiction: jurisdictionFromLS,
          caseType: caseTypeGroupFromLS,
          metadataFields: metadataFieldsGroupFromLS,
          formGroup: {
            value: formGroupFromLS
          },
          page: this.page,
          view: 'SEARCH'
        }
      };
    }
    return event;
  }
  checkLSAndTrigger() {
    const event = this.getEvent();
    if ( event != null) {
      this.store.dispatch(new fromCasesFeature.FindSearchPaginationMetadata(event));
    }
  }

  toggleFilter() {
    const toggle = this.showFilter === false;
    this.store.dispatch(new fromCasesFeature.SearchFilterToggle(toggle))
  }

  applyChangePage(event) {
    this.page = event.selected.page;
    this.checkLSAndTrigger();
  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    if (this.resultSubscription) {
      this.resultSubscription.unsubscribe();
    }
    if (this.paginationSubscription) {
      this.paginationSubscription.unsubscribe();
    }
    if(this.caseFilterToggleSubscription) {
      this.caseFilterToggleSubscription.unsubscribe();
    }
  }

}
