import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AppConstants } from '../../../app/app.constants';
import { SessionStorageService } from '../../../app/services';
import { Actions } from '../../../role-access/models';
import { ListConstants } from '../../components/constants';
import { CaseService, InfoMessage, InfoMessageType, SortOrder } from '../../enums';
import { Caseworker } from '../../interfaces/common';
import { Case, CaseFieldConfig, CaseServiceConfig, InvokedCaseAction } from '../../models/cases';
import { SortField } from '../../models/common';
import { Location, PaginationParameter, SearchCaseRequest, SortParameter } from '../../models/dtos';
import { CaseworkerDataService, InfoMessageCommService, LocationDataService, WASupportedJurisdictionsService, WorkAllocationCaseService } from '../../services';
import { getAssigneeName, handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../utils';

@Component({
  templateUrl: 'work-case-list-wrapper.component.html',
  providers: [InfoMessageCommService]
})
export class WorkCaseListWrapperComponent implements OnInit {

  public specificPage: string = '';
  public caseworkers: Caseworker[];
  public showSpinner$: Observable<boolean>;
  public sortedBy: SortField;
  public locations$: Observable<Location[]>;
  public waSupportedJurisdictions$: Observable<string[]>;
  public pagination: PaginationParameter;
  public isPaginationEnabled$: Observable<boolean>;
  public backUrl: string = null;
  private pCases: Case[];
  /**
   * Mock CaseServiceConfig.
   */
  private readonly defaultCaseServiceConfig: CaseServiceConfig = {
    service: CaseService.IAC,
    defaultSortDirection: SortOrder.ASC,
    defaultSortFieldName: 'startDate',
    fields: this.fields,
  };
  private pCasesTotal: number;

  /**
   * Take in the Router so we can navigate when actions are clicked.
   */
  constructor(
    protected readonly ref: ChangeDetectorRef,
    protected readonly caseService: WorkAllocationCaseService,
    protected readonly router: Router,
    protected readonly infoMessageCommService: InfoMessageCommService,
    protected readonly sessionStorageService: SessionStorageService,
    protected readonly alertService: AlertService,
    protected readonly caseworkerService: CaseworkerDataService,
    protected readonly loadingService: LoadingService,
    protected readonly locationService: LocationDataService,
    protected readonly featureToggleService: FeatureToggleService,
    protected readonly waSupportedJurisdictionsService: WASupportedJurisdictionsService
  ) {
    this.isPaginationEnabled$ = this.featureToggleService.isEnabled(AppConstants.FEATURE_NAMES.waMvpPaginationFeature);
  }

  public get cases(): Case[] {
    return this.pCases;
  }

  public set cases(value: Case[]) {
    this.pCases = value;
  }

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
    return this.router ? this.router.url : '/mywork';
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
      this.caseworkers = [...caseworkers];
    }, error => {
      handleFatalErrors(error.status, this.router);
    });
    // Try to get the sort order out of the session.
    const stored = this.sessionStorageService.getItem(this.sortSessionKey);
    if (stored) {
      const {fieldName, order} = JSON.parse(stored);
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
    return this.caseService.searchCase({searchRequest, view: this.view});
  }

  public performSearchPagination(): Observable<any> {
    const searchRequest = this.getSearchCaseRequestPagination();
    if (this.view === 'AllWorkCases') {
      return this.caseService.getCases({searchRequest, view: this.view});
    }
    return this.caseService.getMyCases({searchRequest, view: this.view});
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
    return {...this.pagination};
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
    this.sortedBy = {fieldName, order};
    this.sessionStorageService.setItem(this.sortSessionKey, JSON.stringify(this.sortedBy));

    this.loadCases();
  }

  /**
   * InvokedCaseAction from the Case List Component, so that we can handle the User's
   * action.
   */
  public onActionHandler(caseAction: InvokedCaseAction): void {
    const actionedCase = caseAction.invokedCase;
    const thisAction = caseAction.action;
    let actionUrl = '';
    if (thisAction.id === Actions.Reallocate) {
      actionUrl = `role-access/allocate-role/${thisAction.id}?caseId=${actionedCase.case_id}&roleCategory=${actionedCase.role_category}&assignmentId=${actionedCase.id}&caseType=${actionedCase.case_category}&jurisdiction=${actionedCase.jurisdiction}&userName=${actionedCase.assignee}&typeOfRole=${actionedCase.case_role}`;
    } else if (thisAction.id === Actions.Remove) {
      actionUrl = `role-access/allocate-role/${thisAction.id}?caseId=${actionedCase.case_id}&assignmentId=${actionedCase.id}&caseType=${actionedCase.case_category}&jurisdiction=${actionedCase.jurisdiction}&typeOfRole=${actionedCase.case_role}`;
    }
    this.router.navigateByUrl(actionUrl, {state: {backUrl: this.backUrl}});
  }

  public onPaginationHandler(pageNumber: number): void {
    this.pagination.page_number = pageNumber;
    this.doLoad();
  }

  // Do the actual load. This is separate as it's called from two methods.
  protected doLoad(): void {
    this.showSpinner$ = this.loadingService.isLoading;
    const loadingToken = this.loadingService.register();
    this.isPaginationEnabled$.pipe(mergeMap(enabled => enabled ? this.performSearchPagination() : this.performSearch())).subscribe(result => {
      this.loadingService.unregister(loadingToken);
      this.cases = result.cases;
      this.casesTotal = result.total_records;
      this.cases.forEach(item => item.assigneeName = getAssigneeName(this.caseworkers, item.assignee));
      this.ref.detectChanges();
    }, error => {
      this.loadingService.unregister(loadingToken);
      handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
    });
  }

  protected setUpLocationsAndJurisdictions(): void {
    this.locations$ = this.locationService.getLocations();
    this.waSupportedJurisdictions$ = this.waSupportedJurisdictionsService.getWASupportedJurisdictions();
  }

}
