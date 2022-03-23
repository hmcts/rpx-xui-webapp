import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRole } from '../../../app/models';
import { RoleCategoryMappingService } from '../../../app/services/role-category-mapping/role-category-mapping.service';
import * as fromAppStore from '../../../app/store';
import { HearingConditions } from '../../../hearings/models/hearingConditions';
import { HearingListModel } from '../../../hearings/models/hearingList.model';
import { HearingListViewModel } from '../../../hearings/models/hearingListView.model';
import { Actions, EXUISectionStatusEnum, HearingSummaryEnum, Mode } from '../../../hearings/models/hearings.enum';
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
  public pastAndCancelledStatus: EXUISectionStatusEnum = EXUISectionStatusEnum.PAST_AND_CANCELLED;
  public hearingState$: Observable<fromHearingStore.State>;
  public hearingsActions: Actions[] = [Actions.READ];
  public userRoles$: Observable<string[]>;
  public sub: Subscription;
  public hasRequestAction: boolean = false;
  public caseId: string = '';
  public serverError: { id: string, message: string } = null;

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
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public reloadHearings() {
    this.hearingStore.dispatch(new fromHearingStore.LoadAllHearings(this.caseId));
  }

  public ngOnInit(): void {
    this.sub = this.hearingState$.subscribe(state => {
      if (state && state.hearingList && state.hearingList.lastError) {
        this.serverError = {
          id: 'backendError', message: HearingSummaryEnum.BackendError
        };
        window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
      }
    });
    this.upcomingHearings$ = this.getHearingListByStatus(EXUISectionStatusEnum.UPCOMING);
    this.pastAndCancelledHearings$ = this.getHearingListByStatus(EXUISectionStatusEnum.PAST_AND_CANCELLED);
    this.roleCategoryMappingService.isJudicialOrLegalOpsCategory(this.userRoles$).subscribe(
      userRole => {
        if (userRole === UserRole.LegalOps) {
          this.hearingsActions = [...this.hearingsActions, Actions.CREATE, Actions.UPDATE, Actions.DELETE];
        }
      }
    );
    if (this.hearingsActions.includes(Actions.CREATE)) {
      this.hasRequestAction = true;
    }
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public getHearingListByStatus(status: EXUISectionStatusEnum): Observable<HearingListViewModel[]> {
    return this.hearingStore.pipe(select(fromHearingStore.getHearingList)).pipe(
      map(hearingListStateData => {
          if (hearingListStateData && hearingListStateData.hearingListMainModel && hearingListStateData.hearingListMainModel.caseHearings) {
            const caseHearingModels: HearingListModel[] = hearingListStateData.hearingListMainModel.caseHearings.filter(hearing =>
              hearing.exuiSectionStatus === status
            );
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
    this.hearingStore.dispatch(new fromHearingStore.LoadHearingValues(this.caseId));
    this.sub = this.hearingStore.select(fromHearingStore.getHearingValuesLastError).subscribe(
      error => {
        if (error) {
          this.router.navigate(['/', 'hearings', 'error']);
        } else {
          const hearingCondition: HearingConditions = {
            mode: Mode.CREATE,
            isInit: true,
            caseId: this.caseId
          };
          this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
          this.router.navigate(['/', 'hearings', 'request']);
        }
      }
    );
  }
}
