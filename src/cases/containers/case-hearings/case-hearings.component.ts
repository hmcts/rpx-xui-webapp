import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserRole} from '../../../app/models/user-details.model';
import {RoleCategoryMappingService} from '../../../app/services/role-category-mapping/role-category-mapping.service';
import * as fromAppStore from '../../../app/store';
import {CaseHearingModel} from '../../../hearings/models/caseHearing.model';
import {CaseHearingViewModel} from '../../../hearings/models/caseHearingView.model';
import {Actions, EXUISectionStatusEnum} from '../../../hearings/models/hearings.enum';
import * as fromHearingStore from '../../../hearings/store';

@Component({
  selector: 'exui-case-hearings',
  templateUrl: './case-hearings.component.html'
})
export class CaseHearingsComponent implements OnInit {
  public upcomingHearings$: Observable<CaseHearingViewModel[]>;
  public upcomingStatus: EXUISectionStatusEnum = EXUISectionStatusEnum.UPCOMING;
  public pastAndCancelledHearings$: Observable<CaseHearingViewModel[]>;
  public pastAndCancelledStatus: EXUISectionStatusEnum = EXUISectionStatusEnum.PAST_AND_CANCELLED;
  public hearingsActions: Actions[] = [Actions.READ];
  public userRoles: Observable<string[]>;
  public hasRequestAction: boolean = false;

  constructor(private readonly appStore: Store<fromAppStore.State>,
              private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly activatedRoute: ActivatedRoute,
              private readonly roleCategoryMappingService: RoleCategoryMappingService) {
    const caseID = this.activatedRoute.snapshot.params.cid;
    this.userRoles = this.appStore.pipe(select(fromAppStore.getUserDetails)).pipe(
      map(userDetails => userDetails.userInfo.roles)
    );
    this.hearingStore.dispatch(new fromHearingStore.LoadAllHearings(caseID));
  }

  public ngOnInit(): void {
    this.upcomingHearings$ = this.getHearingListByStatus(EXUISectionStatusEnum.UPCOMING);
    this.pastAndCancelledHearings$ = this.getHearingListByStatus(EXUISectionStatusEnum.PAST_AND_CANCELLED);
    this.roleCategoryMappingService.isJudicialOrLegalOpsCategory(this.userRoles).subscribe(
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

  public getHearingListByStatus(status: string): Observable<CaseHearingViewModel[]> {
    return this.hearingStore.pipe(select(fromHearingStore.getHearingsList)).pipe(
      map(hearingsStateData => {
          if (hearingsStateData && hearingsStateData.caseHearingsMainModel && hearingsStateData.caseHearingsMainModel.caseHearings) {
            const caseHearingModels: CaseHearingModel[] = hearingsStateData.caseHearingsMainModel.caseHearings.filter(hearing =>
              hearing.exuiSectionStatus === status
            );
            const caseHearingViewModels: CaseHearingViewModel[] = this.calculateEarliestHearingDate(caseHearingModels);
            return this.sortHearingsByHearingAndRequestDate(caseHearingViewModels);
          } else {
            return [];
          }
        }
      )
    );
  }

  public calculateEarliestHearingDate(hearings: CaseHearingModel[]): CaseHearingViewModel[] {
    const viewModels: CaseHearingViewModel[] = [];
    hearings.forEach((hearing) => {
      const viewModel = {} as CaseHearingViewModel;
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

  public sortHearingsByHearingAndRequestDate(arrayToBeSorted: CaseHearingViewModel[]): CaseHearingViewModel[] {
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

}
