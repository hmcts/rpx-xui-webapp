import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { CaseNotifier, LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store, select } from '@ngrx/store';
import moment from 'moment';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { UserRole } from '../../../app/models';
import { HearingConditions } from '../../../hearings/models/hearingConditions';
import { HearingListModel } from '../../../hearings/models/hearingList.model';
import { HearingListViewModel } from '../../../hearings/models/hearingListView.model';
import {
  Actions,
  EXUIDisplayStatusEnum,
  EXUISectionStatusEnum,
  HearingCategory,
  HearingSummaryEnum,
  Mode,
} from '../../../hearings/models/hearings.enum';
import { LovRefDataModel } from '../../../hearings/models/lovRefData.model';
import { LovRefDataService } from '../../../hearings/services/lov-ref-data.service';
import * as fromHearingStore from '../../../hearings/store';
import { SessionStorageService } from '../../../app/services';

@Component({
  standalone: false,
  selector: 'exui-case-hearings',
  templateUrl: './case-hearings.component.html',
  styleUrls: ['./case-hearings.component.scss'],
})
export class CaseHearingsComponent implements OnInit, OnDestroy {
  public hearingTypesRefData$: Observable<LovRefDataModel[]>;
  public upcomingHearings$: Observable<HearingListViewModel[]>;
  public currentCaseHearingsLoaded$: Observable<boolean>;
  public upcomingStatus: EXUISectionStatusEnum = EXUISectionStatusEnum.UPCOMING;

  public pastAndCancelledHearings$: Observable<HearingListViewModel[]>;
  public pastAndCancelledStatus: EXUISectionStatusEnum = EXUISectionStatusEnum.PAST_OR_CANCELLED;

  public listedHearings$: Observable<HearingListViewModel[]>;

  public hearingState$: Observable<fromHearingStore.State>;
  public hearingsActions: Actions[];
  public hearingListLastErrorState$: Observable<fromHearingStore.State>;
  public hearingValuesLastErrorState$: Observable<fromHearingStore.State>;
  public lastErrorSubscription: Subscription;
  public caseNotifierSubscription: Subscription;
  public hasRequestAction: boolean = false;
  public caseId: string = '';
  public jurisdictionId: string = '';
  public serverError: { id: string; message: string } = null;
  public isOgdRole: boolean;
  public showSpinner$: Observable<boolean>;
  public hearingStageOptions: LovRefDataModel[];
  public hearingValuesSubscription: Subscription;
  public refDataSubscription: Subscription;
  private userRoles: string[] = [];
  private spinnerEndAttempted = false;
  jurisdiction: string;
  caseType: string;

  constructor(
    private readonly hearingStore: Store<fromHearingStore.State>,
    private readonly router: Router,
    private readonly lovRefDataService: LovRefDataService,
    private readonly loadingService: LoadingService,
    private readonly sessionSvc: SessionStorageService,
    private readonly caseNotifier: CaseNotifier
  ) {
    this.hearingListLastErrorState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingListLastError));
    this.hearingValuesLastErrorState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingValuesLastError));
  }

  /* 
    Reload hearings in case of error
    There is a possibility case ID not present for reload but hearing list load would also fail indicating issue to user
  */
  public reloadHearings() {
    this.loadHearingsForCurrentCase();
    this.hearingStore.dispatch(
      new fromHearingStore.LoadHearingValues({
        jurisdictionId: this.jurisdiction,
        caseReference: this.caseId,
        caseType: this.caseType,
      })
    );
  }

  public ngOnInit(): void {
    this.showSpinner$ = this.loadingService.isLoading;
    const loadingToken = this.loadingService.register();

    // Get case ID from route (if provided)
    this.caseId = this.getCaseIdFromRouterState();

    if (this.caseId && this.caseId !== '') {
      // caseId exists, starting setup immediately
      this.startHearingSetupForCase(loadingToken);
    } else if (this.router.navigated) {
      // navigation has already finished, but no case ID found in route - should never happen
      // give error in unlikely scenario (to ensure subscribing to router events does not miss the NavigationEnd event)
      this.serverError = { id: 'backendError', message: HearingSummaryEnum.BackendError };
      this.loadingService.unregister(loadingToken);
    } else {
      // navigation has not finished yet, ensure it has before getting case ID
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(() => this.getCaseIdFromRouterState()),
          filter((cid) => !!cid),
          take(1)
        )
        .subscribe((cid) => {
          // case ID found after navigation end, now starting setup
          this.caseId = cid;
          this.startHearingSetupForCase(loadingToken);
        });
    }

    this.hearingValuesSubscription = this.hearingStore
      .pipe(select(fromHearingStore.getHearingValuesModel))
      .subscribe((serviceHearingValuesModel) => {
        if (serviceHearingValuesModel && serviceHearingValuesModel.hmctsServiceID) {
          this.refDataSubscription = this.lovRefDataService
            .getListOfValues(HearingCategory.HearingType, serviceHearingValuesModel.hmctsServiceID, false)
            .subscribe((hearingStageOptions) => {
              this.hearingStageOptions = hearingStageOptions;
            });
        }
      });
    this.lastErrorSubscription = combineLatest([this.hearingListLastErrorState$, this.hearingValuesLastErrorState$]).subscribe({
      next: ([hearingListlastError, hearingValuesLastError]: [fromHearingStore.State, fromHearingStore.State]) => {
        if (hearingListlastError || hearingValuesLastError) {
          this.serverError = {
            id: 'backendError',
            message: HearingSummaryEnum.BackendError,
          };
          window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        } else {
          // Reset the error context if there is no error on subsequent requests
          this.serverError = null;
        }
        this.endSpinnerOnCompleteLoad(loadingToken);
      },
      error: () => {
        this.endSpinnerOnCompleteLoad(loadingToken);
      },
      complete: () => {
        this.endSpinnerOnCompleteLoad(loadingToken);
      },
    });
    this.upcomingHearings$ = this.getHearingListByStatus(EXUISectionStatusEnum.UPCOMING);
    this.pastAndCancelledHearings$ = this.getHearingListByStatus(EXUISectionStatusEnum.PAST_OR_CANCELLED);
    this.listedHearings$ = this.getHearingListByStatus(EXUIDisplayStatusEnum.LISTED);
    this.currentCaseHearingsLoaded$ = this.hearingStore.pipe(
      select(fromHearingStore.getHearingList),
      map((hearingListStateData) => hearingListStateData?.hearingListMainModel?.caseRef === this.caseId)
    );
    this.userRoles = [];
    const detailsStr = this.sessionSvc.getItem('userDetails');
    if (detailsStr) {
      const details = safeJsonParse<any>(detailsStr, null);
      if (details && details.hasOwnProperty('roles')) {
        this.userRoles = details['roles'] as string[];
      }
    }
    this.isOgdRole = false;
    if (this.userRoles && this.userRoles.includes(UserRole.HearingManager)) {
      this.hearingsActions = [Actions.READ, Actions.CREATE, Actions.UPDATE, Actions.DELETE];
      this.hasRequestAction = true;
    } else if (this.userRoles.includes(UserRole.HearingViewer)) {
      this.hearingsActions = [Actions.READ];
    } else if (this.userRoles.includes(UserRole.ListedHearingViewer)) {
      this.hearingsActions = [Actions.READ];
      this.isOgdRole = true;
    } else {
      this.hearingsActions = [];
    }
  }

  public getHearingListByStatus(status: EXUISectionStatusEnum | EXUIDisplayStatusEnum): Observable<HearingListViewModel[]> {
    return this.hearingStore.pipe(select(fromHearingStore.getHearingList)).pipe(
      map((hearingListStateData) => {
        if (
          hearingListStateData &&
          hearingListStateData.hearingListMainModel &&
          hearingListStateData.hearingListMainModel.caseRef === this.caseId &&
          hearingListStateData.hearingListMainModel.caseHearings
        ) {
          let caseHearingModels: HearingListModel[] = [];
          if (Object.values(EXUISectionStatusEnum).includes(status as EXUISectionStatusEnum)) {
            caseHearingModels = hearingListStateData.hearingListMainModel.caseHearings.filter(
              (hearing) => hearing.exuiSectionStatus === status
            );
          }
          if (Object.values(EXUIDisplayStatusEnum).includes(status as EXUIDisplayStatusEnum)) {
            caseHearingModels = hearingListStateData.hearingListMainModel.caseHearings.filter(
              (hearing) => hearing.exuiDisplayStatus === status
            );
          }
          const caseHearingViewModels: HearingListViewModel[] = this.calculateEarliestHearingDate(caseHearingModels);
          return this.sortHearingsByHearingAndRequestDate(caseHearingViewModels);
        }
        return [];
      })
    );
  }

  public calculateEarliestHearingDate(hearings: HearingListModel[]): HearingListViewModel[] {
    const viewModels: HearingListViewModel[] = [];
    hearings.forEach((hearing) => {
      const viewModel = {} as HearingListViewModel;
      viewModel.earliestHearingStartDateTime = null;
      Object.keys(hearing).forEach((key) => (viewModel[key] = hearing[key]));
      if (hearing.hearingDaySchedule && hearing.hearingDaySchedule.length) {
        const moments = hearing.hearingDaySchedule.map((d) => d.hearingStartDateTime !== null && moment(d.hearingStartDateTime));
        if (moments.length > 1 || (moments.length === 1 && moments[0])) {
          viewModel.earliestHearingStartDateTime = moment.min(moments).toString();
        }
      }
      viewModels.push(viewModel);
    });
    return viewModels;
  }

  public sortHearingsByHearingAndRequestDate(arrayToBeSorted: HearingListViewModel[]): HearingListViewModel[] {
    return arrayToBeSorted.sort((a, b) => {
      if (a.earliestHearingStartDateTime === b.earliestHearingStartDateTime) {
        return new Date(a.hearingRequestDateTime) > new Date(b.hearingRequestDateTime) ? -1 : 1;
      } else if (a.earliestHearingStartDateTime === null) {
        return -1;
      } else if (b.earliestHearingStartDateTime === null) {
        return 1;
      }
      return new Date(a.earliestHearingStartDateTime) > new Date(b.earliestHearingStartDateTime) ? -1 : 1;
    });
  }

  public createHearingRequest(): void {
    const hearingCondition: HearingConditions = {
      mode: Mode.CREATE,
      isInit: true,
      caseId: this.caseId,
    };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
    this.router.navigate(['/', 'hearings', 'request']);
  }

  public ngOnDestroy(): void {
    if (this.lastErrorSubscription) {
      this.lastErrorSubscription.unsubscribe();
    }
    if (this.hearingValuesSubscription) {
      this.hearingValuesSubscription.unsubscribe();
    }
    if (this.refDataSubscription) {
      this.refDataSubscription.unsubscribe();
    }
    if (this.caseNotifierSubscription) {
      this.caseNotifierSubscription.unsubscribe();
    }
  }

  /* 
    Case hearings tab setup - uses case details to set page (loadingToken unregistered in case of error or once setup complete)
  */
  private startHearingSetupForCase(loadingToken: string): void {
    this.caseNotifierSubscription = this.caseNotifier.caseView
      .pipe(
        filter(
          (caseDetails) => !!caseDetails?.case_id && !!caseDetails?.case_type?.id && !!caseDetails?.case_type?.jurisdiction?.id
        ),
        take(1)
      )
      .subscribe((caseDetails) => {
        // Confirm case ID from notifier matches route
        if (this.caseId && caseDetails.case_id && this.caseId !== caseDetails.case_id) {
          this.serverError = { id: 'backendError', message: HearingSummaryEnum.BackendError };
          this.loadingService.unregister(loadingToken);
          return;
        }

        this.caseType = caseDetails.case_type.id;
        this.jurisdiction = caseDetails.case_type.jurisdiction.id;

        this.loadHearingsForCurrentCase();

        this.hearingStore.dispatch(
          new fromHearingStore.StoreJurisdictionAndCaseRef({
            jurisdictionId: this.jurisdiction,
            caseReference: this.caseId,
            caseType: this.caseType,
          })
        );
        this.hearingStore.dispatch(new fromHearingStore.ResetHearingValues());
        this.hearingStore.dispatch(
          new fromHearingStore.LoadHearingValues({
            jurisdictionId: this.jurisdiction,
            caseReference: this.caseId,
            caseType: this.caseType,
          })
        );
        this.endSpinnerOnCompleteLoad(loadingToken);
      });
  }

  private loadHearingsForCurrentCase(): void {
    this.hearingStore.dispatch(new fromHearingStore.ResetHearingList());
    this.hearingStore.dispatch(new fromHearingStore.LoadAllHearings(this.caseId));
  }

  /* 
    Get case ID from route snapshot - accounts for case ID being in any level of route
    Route is only source of truth for case ID and is present to user
  */
  private getCaseIdFromRouterState(): string {
    return this.findRouteParameter(this.router.routerState.snapshot.root, 'cid') || '';
  }

  /* 
    Loop through route snapshot tree to find parameter
  */
  private findRouteParameter(node: ActivatedRouteSnapshot | null, key: string): string | null {
    if (!node) {
      return null;
    }
    const value = node.paramMap.get(key);
    if (value) {
      return value;
    }
    for (const child of node.children) {
      const childValue = this.findRouteParameter(child, key);
      if (childValue) {
        return childValue;
      }
    }
    return null;
  }

  /* 
    Ensure spinner is stopped after all loading complete
  */
  private endSpinnerOnCompleteLoad(loadingToken: string): void {
    if (!this.spinnerEndAttempted) {
      this.spinnerEndAttempted = true;
    } else {
      this.loadingService.unregister(loadingToken);
    }
  }
}
