import { AppConfig } from './../../../app/services/ccd-config/ccd-case.config';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActionBindingModel } from 'src/cases/models/create-case-actions.model';
import * as fromCasesFeature from '../../store';
import * as fromCaseList from '../../store/reducers';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Jurisdiction, CaseType, CaseState, SearchResultView, PaginationMetadata } from '@hmcts/ccd-case-ui-toolkit';
import { FormGroup } from '@angular/forms';

/**
 * Entry component wrapper for Case List
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-case-list',
  templateUrl: 'case-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['case-list-filter.component.scss']
})
export class CaseListComponent implements OnInit, OnDestroy {
  defaults: any;
  caseListFilterEventsBindings: ActionBindingModel[];
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
  caseFilterToggleSubscription: Subscription;

  resultsArr: any[] = [];

  paginationSize: number;
  selected: any;
  showFilter: boolean;
  toggleButtonName: string;
  state: any;
  savedQueryParams: any;
  page: number;
  paginationSubscription: Subscription;
  constructor(
    public store: Store<fromCaseList.State>,
    private appConfig: AppConfig
  ) { }

  ngOnInit() {
    this.page = 1;
    this.resultView = null;
    this.savedQueryParams = JSON.parse(localStorage.getItem('savedQueryParams'));
    if (this.savedQueryParams) {
      this.defaults = {
        jurisdiction_id: this.savedQueryParams.jurisdiction_id,
        case_type_id: this.savedQueryParams.case_type_id,
        state_id: this.savedQueryParams['case-state']
      };
    } else {
      this.defaults = {
        jurisdiction_id: '',
        case_type_id: '',
        state_id: ''
      };
    }

    this.fromCasesFeature = fromCasesFeature;
    this.caseListFilterEventsBindings = [
      { type: 'onApply', action: 'FindCaselistPaginationMetadata' },
      { type: 'onReset', action: 'CaseListReset' }
     ];

    this.paginationSize = this.appConfig.getPaginationPageSize();

    this.jurisdiction$ = this.store.pipe(select(fromCasesFeature.caselistFilterJurisdiction));
    this.caseType$ = this.store.pipe(select(fromCasesFeature.caselistFilterCaseType));
    this.caseState$ = this.store.pipe(select(fromCasesFeature.caselistFilterCaseState));
    this.resultView$ = this.store.pipe(select(fromCasesFeature.caselistFilterResultView));
    this.metadataFields$ = this.store.pipe(select(fromCasesFeature.caselistFilterMetadataFields));
    this.paginationMetadata$ = this.store.pipe(select(fromCasesFeature.getCaselistFilterPaginationMetadata));
    this.caseFilterToggle$ = this.store.pipe(select(fromCasesFeature.getCaselistFilterToggle));

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

    this.caseFilterToggleSubscription = this.caseFilterToggle$.subscribe( (result: boolean) => {
      this.showFilter = result;
      this.toggleButtonName = this.getToggleButtonName(this.showFilter);
    });

    this.paginationSubscription = this.paginationMetadata$.subscribe(result => {
      if (typeof result !== 'undefined'  && typeof result.total_pages_count !== 'undefined') {
        this.paginationMetadata.total_pages_count = result.total_pages_count;
        this.paginationMetadata.total_results_count = result.total_results_count;
        const event = this.getEvent();
        if ( event != null) {
          this.store.dispatch(new fromCasesFeature.ApplyCaselistFilter(event));
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
    let formGroupFromLS = null;
    let jurisdictionFromLS = null;
    let caseStateGroupFromLS = null;
    let caseTypeGroupFromLS = null;
    if (this.selected) {
      formGroupFromLS = this.selected.formGroup.value;
      jurisdictionFromLS = { id: this.selected.jurisdiction.id};
      caseTypeGroupFromLS = { id: this.selected.caseType.id };
      caseStateGroupFromLS = { id: this.selected.caseState.id };
    } else {
      this.savedQueryParams = JSON.parse(localStorage.getItem('savedQueryParams'));
      formGroupFromLS = JSON.parse(localStorage.getItem('workbasket-filter-form-group-value'));
      jurisdictionFromLS = { id: this.savedQueryParams.jurisdiction};
      caseTypeGroupFromLS = { id: this.savedQueryParams['case-type'] };
      caseStateGroupFromLS = { id: this.savedQueryParams['case-state'] };
    }
    const metadataFieldsGroupFromLS = ['[CASE_REFERENCE]'];
    if (formGroupFromLS && jurisdictionFromLS && caseTypeGroupFromLS && metadataFieldsGroupFromLS && caseStateGroupFromLS) {
      event = {
        selected: {
          jurisdiction: jurisdictionFromLS,
          caseType: caseTypeGroupFromLS,
          caseState: caseStateGroupFromLS,
          metadataFields: metadataFieldsGroupFromLS,
          formGroup: {
            value: formGroupFromLS
          },
          page: this.page,
          view: 'WORKBASKET'
        }
      };
    }
    return event;
  }

  getToggleButtonName(showFilter: boolean): string {
    return showFilter ? 'Hide Filter' : 'Show Filter';
  }

  checkLSAndTrigger() {
    const event = this.getEvent();
    if ( event != null) {
      this.store.dispatch(new fromCasesFeature.FindCaselistPaginationMetadata(event));
    }
  }

  applyChangePage(event) {
    this.page = event.selected.page;
    this.checkLSAndTrigger();
  }

  applyFilter(event) {
    this.page = event.selected.page;
    this.selected = event.selected;
    this.checkLSAndTrigger();
  }

  toggleFilter() {
    this.store.dispatch(new fromCasesFeature.CaseFilterToggle(!this.showFilter));
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
    if (this.caseFilterToggleSubscription) {
      this.caseFilterToggleSubscription.unsubscribe();
    }
  }

 }
