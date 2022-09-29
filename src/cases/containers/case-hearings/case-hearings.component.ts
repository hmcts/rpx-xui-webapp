import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import moment from 'moment';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserRole} from '../../../app/models';
import {RoleCategoryMappingService} from '../../../app/services/role-category-mapping/role-category-mapping.service';
import * as fromAppStore from '../../../app/store';
import {HearingConditions} from '../../../hearings/models/hearingConditions';
import {HearingListModel} from '../../../hearings/models/hearingList.model';
import {HearingListViewModel} from '../../../hearings/models/hearingListView.model';
import {
  Actions,
  EXUIDisplayStatusEnum,
  EXUISectionStatusEnum,
  HearingSummaryEnum,
  Mode
} from '../../../hearings/models/hearings.enum';
import * as fromHearingStore from '../../../hearings/store';

@Component({
  selector: 'exui-case-hearings',
  templateUrl: './case-hearings.component.html',
  styleUrls: ['./case-hearings.component.scss']
})
export class CaseHearingsComponent implements OnInit, OnDestroy {
  public upcomingHearings$: Observable<HearingListViewModel[]>;
  public upcomingStatus: EXUISectionStatusEnum = EXUISectionStatusEnum.UPCOMING;

  public pastAndCancelledHearings$: Observable<HearingListViewModel[]>;
  public pastAndCancelledStatus: EXUISectionStatusEnum = EXUISectionStatusEnum.PAST_OR_CANCELLED;

  public listedHearings$: Observable<HearingListViewModel[]>;

  public hearingState$: Observable<fromHearingStore.State>;
  public hearingsActions: Actions[] = [Actions.READ];
  public userRoles$: Observable<string[]>;
  public hearingListLastErrorState$: Observable<fromHearingStore.State>;
  public hearingValuesLastErrorState$: Observable<fromHearingStore.State>;
  public lastErrorSubscription: Subscription;
  public roleCatSubscription: Subscription;
  public hasRequestAction: boolean = false;
  public caseId: string = '';
  public serverError: { id: string, message: string } = null;
  public isOgdRole$: Observable<boolean>;

  constructor(private readonly appStore: Store<fromAppStore.State>,
              private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly activatedRoute: ActivatedRoute,
              private readonly roleCategoryMappingService: RoleCategoryMappingService,
              private readonly router: Router) {
    this.caseId = this.activatedRoute.snapshot.params.cid;
    this.userRoles$ = this.appStore.pipe(select(fromAppStore.getUserDetails)).pipe(
      map(userDetails => userDetails.userInfo.roles)
    );
    this.hearingStore.dispatch(new fromHearingStore.LoadAllHearings(this.caseId));
    this.hearingListLastErrorState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingListLastError));
    this.hearingValuesLastErrorState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingValuesLastError));
  }

  public reloadHearings() {
    this.hearingStore.dispatch(new fromHearingStore.LoadAllHearings(this.caseId));
    this.hearingStore.dispatch(new fromHearingStore.LoadHearingValues(this.caseId));
  }

  public ngOnInit(): void {
    this.hearingStore.dispatch(new fromHearingStore.LoadHearingValues(this.caseId));
    this.lastErrorSubscription = combineLatest([
      this.hearingListLastErrorState$,
      this.hearingValuesLastErrorState$
    ]).subscribe(([hearingListlastError, hearingValuesLastError]: [fromHearingStore.State, fromHearingStore.State]) => {
      if (hearingListlastError || hearingValuesLastError) {
        this.serverError = {
          id: 'backendError', message: HearingSummaryEnum.BackendError
        };
        window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
      } else {
        // Reset the error context if there is no error on subsequent requests
        this.serverError = null;
      }
    });

    this.upcomingHearings$ = this.getHearingListByStatus(EXUISectionStatusEnum.UPCOMING);
    this.pastAndCancelledHearings$ = this.getHearingListByStatus(EXUISectionStatusEnum.PAST_OR_CANCELLED);
    this.listedHearings$ = this.getHearingListByStatus(EXUIDisplayStatusEnum.LISTED);

    this.roleCatSubscription = this.roleCategoryMappingService.getUserRoleCategory(this.userRoles$).subscribe(
      userRole => {
        if (userRole === UserRole.LegalOps) {
          this.hearingsActions = [...this.hearingsActions, Actions.CREATE, Actions.UPDATE, Actions.DELETE];
        }
      }
    );
    if (this.hearingsActions.includes(Actions.CREATE)) {
      this.hasRequestAction = true;
    }
    this.isOgdRole$ = this.roleCategoryMappingService.getUserRoleCategory(this.userRoles$).pipe(map(userRole => userRole === UserRole.Ogd));
  }

  public getHearingListByStatus(status: EXUISectionStatusEnum | EXUIDisplayStatusEnum): Observable<HearingListViewModel[]> {
    return this.hearingStore.pipe(select(fromHearingStore.getHearingList)).pipe(
      map(hearingListStateData => {
          if (hearingListStateData && hearingListStateData.hearingListMainModel && hearingListStateData.hearingListMainModel.caseHearings) {
            let caseHearingModels: HearingListModel[] = [];
            // if (Object.values(EXUISectionStatusEnum).includes(status)) {
            //   caseHearingModels = hearingListStateData.hearingListMainModel.caseHearings.filter(hearing =>
            //     hearing.exuiSectionStatus === status
            //   );
            // }
            // if (Object.values(EXUIDisplayStatusEnum).includes(status)) {
            //   caseHearingModels = hearingListStateData.hearingListMainModel.caseHearings.filter(hearing =>
            //     hearing.exuiDisplayStatus === status
            //   );
            // }
            const caseHearingViewModels: HearingListViewModel[] = this.calculateEarliestHearingDate(caseHearingModels);
            return this.sortHearingsByHearingAndRequestDate(caseHearingViewModels);
          } else {
            return [];
          }
        }
      )
    );
  }

  public calculateEarliestHearingDate(hearings: HearingListModel[]): HearingListViewModel[] {
    const viewModels: HearingListViewModel[] = [];
    hearings.forEach((hearing) => {
      const viewModel = {} as HearingListViewModel;
      Object.keys(hearing).forEach(key => viewModel[key] = hearing[key]);
      if (hearing.hearingDaySchedule && hearing.hearingDaySchedule.length) {
        const moments = hearing.hearingDaySchedule.map(d => moment(d.hearingStartDateTime));
        viewModel.earliestHearingStartDateTime = moment.min(moments).toString();
      } else {
        viewModel.earliestHearingStartDateTime = null;
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
      }
    );
  }

  public createHearingRequest(): void {
    const hearingCondition: HearingConditions = {
      mode: Mode.CREATE,
      isInit: true,
      caseId: this.caseId
    };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
    this.router.navigate(['/', 'hearings', 'request']);
  }

  public ngOnDestroy(): void {
    if (this.lastErrorSubscription) {
      this.lastErrorSubscription.unsubscribe();
    }
    if (this.roleCatSubscription) {
      this.roleCatSubscription.unsubscribe();
    }
  }
}
