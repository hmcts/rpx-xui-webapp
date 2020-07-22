import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CaseState, CaseType, Jurisdiction, PaginationMetadata, SearchResultView, WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { DefinitionsService } from '@hmcts/ccd-case-ui-toolkit/dist/shared/services/definitions/definitions.service';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { ActionBindingModel } from 'src/cases/models/create-case-actions.model';
import * as fromCasesFeature from '../../store';
import * as fromCaseList from '../../store/reducers';
import { SearchFilterService } from '../../../cases/services';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';

/**
 * Entry component wrapper for Case List
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-case-list',
  templateUrl: 'case-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['case-list.component.scss']
})
export class CaseListComponent implements OnInit, OnDestroy {
  public defaults: any;
  public caseListFilterEventsBindings: ActionBindingModel[];
  public fromCasesFeature: any;

  public jurisdiction$: Observable<Jurisdiction>;
  public caseType$: Observable<CaseType>;
  public caseState$: Observable<CaseState>;
  public resultView$: Observable<SearchResultView>;
  public paginationMetadata$: Observable<PaginationMetadata>;
  public metadataFields$: Observable<string[]>;
  public caseFilterToggle$: Observable<boolean>;
  public jurisdictionsBehaviourSubject$: BehaviorSubject<Jurisdiction[]> = new BehaviorSubject<Jurisdiction[]>([]);

  public fg: FormGroup;

  public jurisdiction: Jurisdiction;
  public caseType: CaseType;
  public caseState: CaseState;
  public resultView: SearchResultView;
  public paginationMetadata: PaginationMetadata = new PaginationMetadata();
  public metadataFields: string[];

  public filterSubscription: Subscription;
  public resultSubscription: Subscription;
  public caseFilterToggleSubscription: Subscription;

  public resultsArr: any[] = [];

  public paginationSize: number;
  public selected: any;
  public showFilter: boolean;
  public toggleButtonName: string;
  public state: any;
  public savedQueryParams: any;
  public page: number;
  public paginationSubscription: Subscription;
  public isVisible: boolean;
  public jurisdictions: Jurisdiction[];

  public elasticSearchFlag: boolean = false;
  public elasticSearchFlagSubsription: Subscription;

  constructor(
    public store: Store<fromCaseList.State>,
    private appConfig: AppConfig,
    private definitionsService: DefinitionsService,
    private windowService: WindowService,
    private searchFilterService: SearchFilterService,
    private featureToggleService: FeatureToggleService,
  ) {
    this.elasticSearchFlagSubsription = this.featureToggleService.isEnabled('elastic-search').subscribe(value => this.elasticSearchFlag = value);
  }

  public ngOnInit() {

    this.isVisible = false;
    this.page = 1;
    this.resultView = null;

    this.definitionsService.getJurisdictions('read').subscribe(this.jurisdictionsBehaviourSubject$);

    this.jurisdictionsBehaviourSubject$.subscribe( jurisdictions => {
      this.isVisible = jurisdictions.length > 0;
      this.jurisdictions = jurisdictions;
    });

    this.setCaseListFilterDefaults();

    this.fromCasesFeature = fromCasesFeature;
    this.caseListFilterEventsBindings = [
      { type: 'onApply', action: 'FindCaselistPaginationMetadata' },
      { type: 'onReset', action: 'CaseListReset' }
     ];

    this.paginationSize = this.appConfig.getPaginationPageSize();

    this.jurisdiction$ = this.store.pipe(select(fromCasesFeature.caselistFilterJurisdiction));
    this.caseType$ = this.store.pipe(select(fromCasesFeature.caselistFilterCaseType));
    this.caseState$ = this.store.pipe(select(fromCasesFeature.caselistFilterCaseState));
    this.metadataFields$ = this.store.pipe(select(fromCasesFeature.caselistFilterMetadataFields));
    this.filterSubscription = combineLatest([
      this.jurisdiction$,
      this.caseType$,
      this.caseState$,
      this.metadataFields$
    ]).subscribe(result => this.onFilterSubscriptionHandler(result));

    this.caseFilterToggle$ = this.store.pipe(select(fromCasesFeature.getCaselistFilterToggle));
    this.caseFilterToggleSubscription = this.caseFilterToggle$.subscribe( (result: boolean) => this.onToogleHandler(result));

    this.listenToPaginationMetadata();

    this.resultView$ = this.store.pipe(select(fromCasesFeature.caselistFilterResultView));
    this.resultSubscription = this.resultView$.subscribe(resultView =>
      this.onResultsViewHandler(resultView));


    if (!this.elasticSearchFlag) {
      this.findCaseListPaginationMetadata(this.getEvent());
    } else {
      this.getElasticSearchResults(this.getEvent());
    }
  }

  public listenToPaginationMetadata = () => {
    this.paginationMetadata$ = this.store.pipe(select(fromCasesFeature.getCaselistFilterPaginationMetadata));
    this.paginationSubscription = this.paginationMetadata$.subscribe(paginationMetadata =>
      this.onPaginationSubscribeHandler(paginationMetadata));
  }

  public doesIdExist(arr = [], id): boolean {
    return arr.some(element => element.id === id);
  }

  public setCaseListFilterDefaults = () => {
    this.jurisdictionsBehaviourSubject$
      .subscribe(jurisdictions => {
        if (jurisdictions.length > 0) {
          this.savedQueryParams = JSON.parse(localStorage.getItem('savedQueryParams'));
          if (this.savedQueryParams && this.savedQueryParams.jurisdiction && !this.doesIdExist(this.jurisdictions, this.savedQueryParams.jurisdiction)) {
            this.windowService.removeLocalStorage('savedQueryParams');
          }
          if (this.savedQueryParams) {
            this.defaults = {
              jurisdiction_id: this.savedQueryParams.jurisdiction,
              case_type_id: this.savedQueryParams['case-type'],
              state_id: this.savedQueryParams['case-state']
            };
          } else if (jurisdictions[0] && jurisdictions[0].id && jurisdictions[0].caseTypes[0] && jurisdictions[0].caseTypes[0].states[0]) {
            this.defaults = {
              jurisdiction_id: jurisdictions[0].id,
              case_type_id: jurisdictions[0].caseTypes[0].id,
              state_id: jurisdictions[0].caseTypes[0].states[0].id
            };
          }
        }
      });
  }

  /**
   * result
   * @param result - [
   * { id: 'PROBATE' },
   * { id: 'GrantOfRepresentation' },
   * { id: 'SolAppUpdated' },
   * ['[CASE_REFERENCE]']
   * ]
   */
  public onFilterSubscriptionHandler = result => {

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
  }

  public onToogleHandler = showFilter => {

    this.showFilter = showFilter;
    this.toggleButtonName = this.getToggleButtonName(this.showFilter);
  }

  public onResultsViewHandler = resultView => {
    if (this.elasticSearchFlag) {
      const paginationDataFromResult: PaginationMetadata = {
        total_results_count: resultView.total,
        total_pages_count: Math.ceil(resultView.total / this.appConfig.getPaginationPageSize())
      }
      this.onPaginationSubscribeHandler(paginationDataFromResult);
    }

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
  }

  /**
   * Handles the return of Pagination Metadata.
   *
   * @param result - {total_pages_count: 33, total_results_count: 811}
   */
  public onPaginationSubscribeHandler = paginationMetadata => {

    if (typeof paginationMetadata !== 'undefined'  && typeof paginationMetadata.total_pages_count !== 'undefined') {
      this.paginationMetadata.total_pages_count = paginationMetadata.total_pages_count;
      this.paginationMetadata.total_results_count = paginationMetadata.total_results_count;

      const event = this.getEvent();
      if (event != null && !this.elasticSearchFlag) {
        this.store.dispatch(new fromCasesFeature.ApplyCaselistFilter(event));
      }
    }
  }

  getEvent() {
    let formGroupFromLS = null;
    let jurisdictionFromLS = null;
    let caseStateGroupFromLS = null;
    let caseTypeGroupFromLS = null;
    this.setCaseListFilterDefaults();
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

    const metadataFieldsGroupFromLS = ['[CASE_REFERENCE]', '[CREATED_DATE]'];

    if (formGroupFromLS && jurisdictionFromLS && caseTypeGroupFromLS && metadataFieldsGroupFromLS && caseStateGroupFromLS) {
      return this.createEvent(jurisdictionFromLS, caseTypeGroupFromLS, caseStateGroupFromLS, metadataFieldsGroupFromLS,
                                formGroupFromLS, this.page);
    } else {
      return null;
    }
  }

  /**
   * createEvent
   *
   * We should think about calling this function makePaginationMetadataQuery as it looks like it's only being used to construct the
   * Case List Pagination Metadata payload?
   */
  public createEvent = (jurisdiction, caseType, caseState, metadataFields, formGroupValues, page) => {
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
  public getToggleButtonName = (showFilter: boolean): string => showFilter ? 'Hide Filter' : 'Show Filter';

  public findCaseListPaginationMetadata(event) {
    if (event != null) {
      this.store.dispatch(new fromCasesFeature.FindCaselistPaginationMetadata(event));
    }
  }
  public getElasticSearchResults(event) {
    if (event != null) {
      this.store.dispatch(new fromCasesFeature.ApplyCaselistFilterForES(event));
    }
  }

  /**
   * applyChangePage
   *
   * Change the page number and call findCaseListPaginationMetadata()
   * to dispatch an Action to get the Pagination Metadata for the next page.
   */
  public applyChangePage(event) {
    this.page = event.selected.page;
    if (!this.elasticSearchFlag) {
      this.findCaseListPaginationMetadata(this.getEvent());
    } else {
      this.getElasticSearchResults(this.getEvent());
    }
  }

  /**
   * applyFilter
   *
   * Change the page number and call findCaseListPaginationMetadata()
   * to dispatch an Action to get the Pagination Metadata for the filter selection.
   */
  public applyFilter(event) {
    this.page = event.selected.page;
    this.selected = event.selected;
    if (!this.elasticSearchFlag) {
      this.findCaseListPaginationMetadata(this.getEvent());
    } else {
      this.getElasticSearchResults(this.getEvent());
    }
  }

  public toggleFilter() {
    this.store.dispatch(new fromCasesFeature.CaseFilterToggle(!this.showFilter));
  }

  public ngOnDestroy() {
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
    if (this.elasticSearchFlagSubsription) {
      this.elasticSearchFlagSubsription.unsubscribe();
    }
  }
 }
