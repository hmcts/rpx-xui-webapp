import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AppConstants } from '../../../app/app.constants';
import { SessionStorageService } from '../../../app/services';
import { ListConstants } from '../../components/constants';
import { CaseActionIds, CaseService, InfoMessage, InfoMessageType, SortOrder } from '../../enums';
import { Caseworker } from '../../interfaces/common';
import { Case, CaseFieldConfig, CaseServiceConfig, InvokedCaseAction } from '../../models/cases';
import { SortField } from '../../models/common';
import { PaginationParameter, SearchCaseRequest, SortParameter } from '../../models/dtos';
import { CaseworkerDataService, InfoMessageCommService, WorkAllocationCaseService } from '../../services';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../utils';

@Component({
  templateUrl: 'work-case-list-wrapper.component.html',
  providers: [InfoMessageCommService]
})
export class WorkCaseListWrapperComponent implements OnInit {

  public specificPage: string = '';
  public caseworkers: Caseworker[];
  public showSpinner$: Observable<boolean>;
  public sortedBy: SortField;
  public pagination: PaginationParameter;
  public isPaginationEnabled$: Observable<boolean>;
  private pCases: Case[];
  /**
   * Mock CaseServiceConfig.
   */
  private readonly defaultCaseServiceConfig: CaseServiceConfig = {
    service: CaseService.IAC,
    defaultSortDirection: SortOrder.ASC,
    defaultSortFieldName: 'start_date',
    fields: this.fields,
  };

  /**
   * Take in the Router so we can navigate when actions are clicked.
   */
  constructor(
    protected ref: ChangeDetectorRef,
    protected caseService: WorkAllocationCaseService,
    protected router: Router,
    protected infoMessageCommService: InfoMessageCommService,
    protected sessionStorageService: SessionStorageService,
    protected alertService: AlertService,
    protected caseworkerService: CaseworkerDataService,
    protected loadingService: LoadingService,
    protected featureToggleService: FeatureToggleService
  ) {
    this.isPaginationEnabled$ = this.featureToggleService.isEnabled(AppConstants.FEATURE_NAMES.waMvpPaginationFeature);
  }

  public get cases(): Case[] {
    return this.pCases;
  }

  public set cases(value: Case[]) {
    this.pCases = value;
  }

  private pCasesTotal: number;
  public get casesTotal(): number {
    return this.pCasesTotal;
  }
  public set casesTotal(value: number) {
    this.pCasesTotal = value;
  }

  public get fields(): CaseFieldConfig[] {
    return [];
  }

  public get caseServiceConfig(): CaseServiceConfig {
    return this.defaultCaseServiceConfig;
  }

  public get emptyMessage(): string {
    return ListConstants.EmptyMessage.Default;
  }

  /**
   * To be overridden.
   */
  public get sortSessionKey(): string {
    return 'sortSessionKey';
  }

  /**
   * To be overridden.
   */
  public get view(): string {
    return 'default';
  }

  public get returnUrl(): string {
    return this.router ? this.router.url : '/my-work';
  }

  /**
   * Flag to indicate whether or not we've arrived here following a bad
   * request with a flag having been set on another route. The flag is
   * passed through the router and so is held in window.history.state.
   */
  private get wasBadRequest(): boolean {
    if (window && window.history && window.history.state) {
      return !!window.history.state.badRequest;
    }
    return false;
  }

  public ngOnInit(): void {
    this.setupCaseWorkers();
    this.loadCases();
  }

  public setupCaseWorkers(): void {
    this.caseworkerService.getAll().subscribe(caseworkers => {
      this.caseworkers = [ ...caseworkers ];
    }, error => {
      handleFatalErrors(error.status, this.router);
    });
    // Try to get the sort order out of the session.
    const stored = this.sessionStorageService.getItem(this.sortSessionKey);
    if (stored) {
      const { fieldName, order } = JSON.parse(stored);
      this.sortedBy = {
        fieldName,
        order: order as SortOrder
      };
    } else {
      // Otherwise, set up the default sorting.
      this.sortedBy = {
        fieldName: this.caseServiceConfig.defaultSortFieldName,
        order: this.caseServiceConfig.defaultSortDirection
      };
    }

    this.isPaginationEnabled$.subscribe({
      next: (result: boolean) => {
        if (!result) {
          this.pagination = null;
        } else {
          this.pagination = {
            page_number: 1,
            page_size: 25
          };
        }
      }
    });
  }

  /**
   * Load the cases to display in the component.
   */
  public loadCases(): void {
    if (this.wasBadRequest) {
      this.refreshCases();
    } else {
      this.doLoad();
    }
  }

  /**
   * On the return of the refreshed cases, we throw up a refresh message.
   */
  public refreshCases(): void {
    this.infoMessageCommService.addMessage({
      type: InfoMessageType.INFO,
      message: InfoMessage.LIST_OF_CASES_REFRESHED,
    });
    this.doLoad();
  }

  public performSearch(): Observable<any> {
    const searchRequest = this.getSearchCaseRequestPagination();
    return this.caseService.searchCase({ searchRequest, view: this.view });
  }

  public performSearchPagination(): Observable<any> {
    const searchRequest = this.getSearchCaseRequestPagination();
    return this.caseService.searchCaseWithPagination({ searchRequest, view: this.view });
  }

  /**
   * Get a search case request appropriate to the current view,
   * sort order, etc.
   */
   public getSearchCaseRequestPagination(): SearchCaseRequest {
    return {
      search_parameters: [],
      sorting_parameters: [this.getSortParameter()],
      pagination_parameters: this.getPaginationParameter()
    };
  }

  public getSortParameter(): SortParameter {
    return {
      sort_by: this.sortedBy.fieldName,
      sort_order: this.sortedBy.order
    };
  }

  public getPaginationParameter(): PaginationParameter {
    return { ...this.pagination };
  }

  /**
   * We need to sort the Case List based on the fieldName.
   *
   * Following on from this function we will need to retrieve the sorted cases from
   * the WA Api, once we have these then we need to set the cases and fields, and pass
   * these into the CaseListComponent.
   *
   * @param fieldName - ie. 'caseName'
   */
  public onSortHandler(fieldName: string): void {
    let order: SortOrder = SortOrder.ASC;
    if (this.sortedBy.fieldName === fieldName && this.sortedBy.order === SortOrder.ASC) {
      order = SortOrder.DESC;
    }
    this.sortedBy = { fieldName, order };
    this.sessionStorageService.setItem(this.sortSessionKey, JSON.stringify(this.sortedBy));

    this.loadCases();
  }

  /**
   * InvokedCaseAction from the Case List Component, so that we can handle the User's
   * action.
   */
  public onActionHandler(caseAction: InvokedCaseAction): void {
    if (caseAction.action.id === CaseActionIds.GO) {
      const goToCaseUrl = `/cases/case-details/${caseAction.invokedCase.case_id}`;
      this.router.navigate([goToCaseUrl]);
      return;
    }

    if (this.returnUrl.includes('manager') && caseAction.action.id === CaseActionIds.RELEASE) {
      this.specificPage = 'manager';
    }
    const state = {
      returnUrl: this.returnUrl,
      showAssigneeColumn: caseAction.action.id !== CaseActionIds.ASSIGN
    };
    const actionUrl = `/work/${caseAction.invokedCase.id}/${caseAction.action.id}/${this.specificPage}`;
    this.router.navigate([actionUrl], { state });
  }

  // Do the actual load. This is separate as it's called from two methods.
  private doLoad(): void {
    this.showSpinner$ = this.loadingService.isLoading;
    const loadingToken = this.loadingService.register();
    this.isPaginationEnabled$.pipe(mergeMap(enabled => enabled ? this.performSearchPagination() : this.performSearch())).subscribe(result => {
        this.loadingService.unregister(loadingToken);
        this.cases = result.cases;
        this.casesTotal = result.total_records;
        this.ref.detectChanges();
      }, error => {
        this.loadingService.unregister(loadingToken);
        handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
    });
  }

  public onPaginationHandler(pageNumber: number): void {
    this.pagination.page_number = pageNumber;
    this.doLoad();
  }

}
