import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AlertService, Jurisdiction, LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService, FilterService, FilterSetting } from '@hmcts/rpx-xui-common-lib';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, filter, mergeMap, switchMap } from 'rxjs/operators';

import { UserInfo } from '../../../app/models';
import { SessionStorageService } from '../../../app/services';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { Actions, Role, RoleCategory } from '../../../role-access/models';
import { AllocateRoleService } from '../../../role-access/services';
import { ListConstants } from '../../components/constants';
import { CaseService, InfoMessage, InfoMessageType, SortOrder } from '../../enums';
import { Caseworker } from '../../interfaces/common';
import { Case, CaseFieldConfig, CaseServiceConfig, InvokedCaseAction } from '../../models/cases';
import { SortField } from '../../models/common';
import { Location, PaginationParameter, SearchCaseRequest, SortParameter } from '../../models/dtos';
import {
  CaseworkerDataService,
  LocationDataService,
  WASupportedJurisdictionsService,
  WorkAllocationCaseService
} from '../../services';
import { JurisdictionsService } from '../../services/juridictions.service';
import { getAssigneeName, handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../utils';

@Component({
  templateUrl: 'work-case-list-wrapper.component.html',
})
export class WorkCaseListWrapperComponent implements OnInit, OnDestroy {

  public specificPage: string = '';
  public caseworkers: Caseworker[] = [];
  public showSpinner$: Observable<boolean>;
  public sortedBy: SortField;
  public locations$: Observable<Location[]>;
  public waSupportedJurisdictions$: Observable<string[]>;
  public supportedJurisdictions: string[];
  public selectedServices: string[] = ['IA'];
  public pagination: PaginationParameter;
  public backUrl: string = null;
  public supportedRoles$: Observable<Role[]>;
  protected allJurisdictions: Jurisdiction[];
  protected allRoles: Role[];
  protected defaultLocation: string = 'all';
  private pCases: Case[];
  public selectedLocations: string[] = [];

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
  private pUniqueCases: number;
  public routeEventsSubscription: Subscription;

  // subscriptions
  private selectedLocationsSubscription: Subscription;

  /**
   * Take in the Router so we can navigate when actions are clicked.
   */
  constructor(
    protected readonly ref: ChangeDetectorRef,
    protected readonly caseService: WorkAllocationCaseService,
    protected readonly filterService: FilterService,
    protected readonly router: Router,
    protected readonly infoMessageCommService: InfoMessageCommService,
    protected readonly sessionStorageService: SessionStorageService,
    protected readonly alertService: AlertService,
    protected readonly caseworkerService: CaseworkerDataService,
    protected readonly loadingService: LoadingService,
    protected readonly locationService: LocationDataService,
    protected readonly featureToggleService: FeatureToggleService,
    protected readonly waSupportedJurisdictionsService: WASupportedJurisdictionsService,
    protected readonly jurisdictionsService: JurisdictionsService,
    protected readonly rolesService: AllocateRoleService
  ) {
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

  public get uniqueCases(): number {
    return this.pUniqueCases;
  }

  public set uniqueCases(value: number) {
    this.pUniqueCases = value;
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
    // get supported jurisdictions on initialisation in order to get caseworkers by these services
    this.waSupportedJurisdictions$ = this.waSupportedJurisdictionsService.getWASupportedJurisdictions();

    this.jurisdictionsService.getJurisdictions().subscribe(jur => this.allJurisdictions = jur);
    this.setupCaseWorkers();
    this.loadCases();
    this.addSelectedLocationsSubscriber();
  }

  public ngOnDestroy(): void {
    if (this.selectedLocationsSubscription) {
      this.selectedLocationsSubscription.unsubscribe();
    }
  }

  public addSelectedLocationsSubscriber() {
    this.selectedLocationsSubscription = this.filterService.getStream('locations').pipe(
      debounceTime(200),
      filter((f: FilterSetting) => f && f.hasOwnProperty('fields'))
    ).subscribe((f: FilterSetting) => {
      const newLocations = f.fields.find((field) => field.name === 'locations').value;
      this.selectedLocations = (newLocations).map(l => l.epimms_id);
      if (this.selectedLocations.length) {
        this.doLoad();
      }
    });
  }

  public setupCaseWorkers(): void {
    const caseworkersByService$ = this.waSupportedJurisdictions$.switchMap(jurisdictions =>
      this.caseworkerService.getCaseworkersForServices(jurisdictions)
    );
    this.waSupportedJurisdictions$.switchMap(jurisdictions =>
      this.rolesService.getValidRoles(jurisdictions)
    ).subscribe(roles => this.allRoles = roles);
    // currently get caseworkers for all supported services
    // in future change, could get caseworkers by specific service from filter changes
    // however regrdless would likely need this initialisation
    caseworkersByService$.subscribe(caseworkers => {
      this.caseworkers = caseworkers;
      const userInfoStr = this.sessionStorageService.getItem('userDetails');
      if (userInfoStr) {
        const userInfo: UserInfo = JSON.parse(userInfoStr);
        const userId = userInfo.id ? userInfo.id : userInfo.uid;
        const currentCW = this.caseworkers.find(cw => cw.idamId === userId);
        if (currentCW && currentCW.location && currentCW.location.id) {
          this.defaultLocation = currentCW.location.id;
        }
      }

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

    this.pagination = {
      page_number: 1,
      page_size: 25
    };
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
    if (this.view === 'AllWorkCases') {
      return this.caseService.getCases({searchRequest, view: this.view});
    } else if (this.view === 'MyCases') {
      return this.caseService.getMyCases({searchRequest, view: this.view});
    } else {
      return this.caseService.getMyAccess({searchRequest, view: this.view});
    }
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
    const actionedCase = caseAction.invokedCase;
    const thisAction = caseAction.action;
    let actionUrl = '';
    if (thisAction.id === Actions.Reallocate) {
      actionUrl = `role-access/allocate-role/${thisAction.id}?caseId=${actionedCase.case_id}&roleCategory=${actionedCase.role_category}&assignmentId=${actionedCase.id}&caseType=${actionedCase.case_type}&jurisdiction=${actionedCase.jurisdictionId}&actorId=${actionedCase.assignee}&typeOfRole=${actionedCase.case_role}`;
    } else if (thisAction.id === Actions.Remove) {
      actionUrl = `role-access/allocate-role/${thisAction.id}?caseId=${actionedCase.case_id}&assignmentId=${actionedCase.id}&caseType=${actionedCase.case_type}&jurisdiction=${actionedCase.jurisdictionId}&typeOfRole=${actionedCase.case_role}`;
    }
    this.router.navigateByUrl(actionUrl, { state: { backUrl: this.backUrl } });
  }

  public onPaginationHandler(pageNumber: number): void {
    this.pagination.page_number = pageNumber;
    this.doLoad();
  }

  // Do the actual load. This is separate as it's called from two methods.
  protected doLoad(): void {
    this.showSpinner$ = this.loadingService.isLoading;
    const loadingToken = this.loadingService.register();
    const casesSearch$ = this.performSearchPagination();
    const mappedSearchResult$ = casesSearch$.pipe(mergeMap(result => {
      if (result && result.cases) {
        const judicialUserIds = result.cases.filter(theCase => theCase.role_category === 'JUDICIAL').map(thisCase => thisCase.assignee);
        if (judicialUserIds && judicialUserIds.length > 0 && this.view !== 'MyCases') {
          // may want to determine judicial workers by services in filter
          return this.rolesService.getCaseRolesUserDetails(judicialUserIds, this.selectedServices).pipe(switchMap((judicialUserData) => {
            const judicialNamedCases = result.cases.map(judicialCase => {
              const currentCase = judicialCase;
              const theJUser = judicialUserData.find(judicialUser => judicialUser.sidam_id === judicialCase.assignee);
              if (theJUser) {
                currentCase.actorName = theJUser.known_as;
                return currentCase;
              }
              return currentCase;
            });
            result.cases = judicialNamedCases;
            return of(result);
          }));
        } else {
          return of(result);
        }
      } else {
        return of(result);
      }
    }));

    mappedSearchResult$.subscribe(result => {
      this.loadingService.unregister(loadingToken);
      this.cases = result.cases;
      this.casesTotal = result.total_records;
      this.uniqueCases = result.unique_cases;
      this.cases.forEach(item => {
        if (item.role_category !== RoleCategory.JUDICIAL) {
          item.actorName = getAssigneeName(this.caseworkers, item.assignee);
        }
        if (this.allJurisdictions && this.allJurisdictions.find(jur => jur.id === item.jurisdiction)) {
          item.jurisdiction = this.allJurisdictions.find(jur => jur.id === item.jurisdiction).name;
        }
        if (this.allRoles && this.allRoles.find(role => role.roleId === item.case_role)) {
          item.role = this.allRoles.find(role => role.roleId === item.case_role).roleName;
        }
      });
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
