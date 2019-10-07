import { AppConfig } from './../../../app/services/ccd-config/ccd-case.config';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActionBindingModel } from 'src/cases/models/create-case-actions.model';
import * as fromCasesFeature from '../../store';
import * as fromCaseList from '../../store/reducers';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Jurisdiction, CaseType, CaseState, SearchResultView, PaginationMetadata } from '@hmcts/ccd-case-ui-toolkit';
import { FormGroup } from '@angular/forms';
import { DefinitionsService } from '@hmcts/ccd-case-ui-toolkit/dist/shared/services/definitions/definitions.service';

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
    private appConfig: AppConfig,
    private definitionsService: DefinitionsService,
  ) {
  }

  ngOnInit() {
    this.page = 1;
    this.resultView = null;
    this.savedQueryParams = JSON.parse(localStorage.getItem('savedQueryParams'));
    if (this.savedQueryParams) {
      this.defaults = {
        jurisdiction_id: this.savedQueryParams.jurisdiction,
        case_type_id: this.savedQueryParams['case-type'],
        state_id: this.savedQueryParams['case-state']
      };
    } else {
      this.definitionsService.getJurisdictions('read')
      .subscribe(jurisdictions => {
        if (jurisdictions[0] && jurisdictions[0].id && jurisdictions[0].caseTypes[0] && jurisdictions[0].caseTypes[0].states[0]) {
          this.defaults = {
            jurisdiction_id: jurisdictions[0].id,
            case_type_id: jurisdictions[0].caseTypes[0].id,
            state_id: jurisdictions[0].caseTypes[0].states[0].id
          };
        }
      });
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

    console.log('on init')
    // this.checkLSAndTrigger();
    this.findCaseListPaginationMetadata(this.getEvent());
  }

  getEvent() {
    let formGroupFromLS = null;
    let jurisdictionFromLS = null;
    let caseStateGroupFromLS = null;
    let caseTypeGroupFromLS = null;

    if (this.selected) {
      formGroupFromLS = this.selected.formGroup.value;
      jurisdictionFromLS = { id: this.selected.jurisdiction.id};
      caseTypeGroupFromLS = { id: this.selected.caseType.id };
      caseStateGroupFromLS = { id: this.selected.caseState.id };
    } else if (this.savedQueryParams) {
      this.savedQueryParams = JSON.parse(localStorage.getItem('savedQueryParams'));
      formGroupFromLS = JSON.parse(localStorage.getItem('workbasket-filter-form-group-value'));
      jurisdictionFromLS = { id: this.savedQueryParams.jurisdiction};
      caseTypeGroupFromLS = { id: this.savedQueryParams['case-type'] };
      caseStateGroupFromLS = { id: this.savedQueryParams['case-state'] };
    }

    const metadataFieldsGroupFromLS = ['[CASE_REFERENCE]'];

    if (formGroupFromLS && jurisdictionFromLS && caseTypeGroupFromLS && metadataFieldsGroupFromLS && caseStateGroupFromLS) {
      return this.createEvent(jurisdictionFromLS, caseTypeGroupFromLS, caseStateGroupFromLS, metadataFieldsGroupFromLS,
                                formGroupFromLS, this.page);
    } else {
      return null;
    }
  }

  /**
   * Wondering what this is used for?
   */
  createEvent = (jurisdiction, caseType, caseState, metadataFields, formGroupValues, page) => {
    return {
      selected: {
        jurisdiction,
        caseType,
        caseState,
        metadataFields,
        formGroup: {
          value: formGroupValues
        },
        page,
        view: 'WORKBASKET'
      }
    };
  }

  /**
   * Display the name seen on the toggle button.
   */
  getToggleButtonName = (showFilter: boolean): string => showFilter ? 'Hide Filter' : 'Show Filter';

  findCaseListPaginationMetadata(event) {
    if (event != null) {
      this.store.dispatch(new fromCasesFeature.FindCaselistPaginationMetadata(event));
    }
  }

  applyChangePage(event) {
    console.log('applyChangePage');
    this.page = event.selected.page;
    this.findCaseListPaginationMetadata(this.getEvent());
  }

  applyFilter(event) {
    console.log('applyChangePage');
    this.page = event.selected.page;
    this.selected = event.selected;
    this.findCaseListPaginationMetadata(this.getEvent());
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
