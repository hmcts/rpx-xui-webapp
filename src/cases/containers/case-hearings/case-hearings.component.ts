import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CaseHearingViewModel } from 'src/hearings/viewModel/case-hearing-view.model';
import { UserRole } from '../../../app/models/user-details.model';
import { RoleCategoryMappingService } from '../../../app/services/role-category-mapping/role-category-mapping.service';
import * as fromAppStore from '../../../app/store';
import { CaseHearingModel } from '../../../hearings/models/caseHearing.model';
import { Actions, EXUISectionStatusEnum, HearingListingStatusEnum } from '../../../hearings/models/hearings.enum';
import * as fromHearingStore from '../../../hearings/store';
import * as moment from 'moment';

@Component({
  selector: 'exui-case-hearings',
  templateUrl: './case-hearings.component.html'
})
export class CaseHearingsComponent implements OnInit, OnDestroy {
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
    this.getHearsListByStatus(EXUISectionStatusEnum.UPCOMING).subscribe(hearings => {
      if (hearings.length) {
        const viewModels: CaseHearingViewModel[] = this.convertServiceToVM(hearings);

        this.upcomingHearings$ = of(viewModels.sort((a, b) => {
          return new Date(a.hearingRequestDateTime) > new Date(b.hearingRequestDateTime) ? 1 : -1;
        }).sort((a, b) => {
          return new Date(a.creationDateTime) > new Date(b.creationDateTime) ? 1 : -1;
        }).sort((a) => {
          return a.hearingListingStatus === HearingListingStatusEnum.AWAITING_LISTING ? -1 : 1;
        }));
      }
    });

    this.getHearsListByStatus(EXUISectionStatusEnum.PAST_AND_CANCELLED).subscribe(hearings => {
      if (hearings.length) {
        const viewModels: CaseHearingViewModel[] = this.convertServiceToVM(hearings);
        this.pastAndCancelledHearings$ = of(viewModels.sort((a, b) => {
          return new Date(a.hearingRequestDateTime) > new Date(b.hearingRequestDateTime) ? 1 : -1;
          }).sort((a) => {
            return !a.hearingRequestDateTime ? 1 : -1;
          }).sort((a, b) => {
            return new Date(a.creationDateTime) < new Date(b.creationDateTime) ? 1 : -1;
          }).sort((a) => {
            return a.hearingRequestDateTime ? 1 : -1;
          }));
      }
    });

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

  public convertServiceToVM(hearings: CaseHearingModel[]) {
    const viewModels: CaseHearingViewModel[] = [];
    hearings.forEach((hearing) => {
      const viewModel = {} as CaseHearingViewModel;
      Object.keys(hearing).forEach(key => viewModel[key] = hearing[key]);

      if (hearing.hearingDaySchedule && hearing.hearingDaySchedule.length) {
        let moments = hearing.hearingDaySchedule.map(d => moment(d.hearingStartDateTime));
        viewModel.creationDateTime = moment.max(moments).toString();
      }
      viewModels.push(viewModel);
    });

    return viewModels;
  }

  public getHearsListByStatus(status: string): Observable<CaseHearingModel[]> {
    return this.hearingStore.pipe(select(fromHearingStore.getHearingsList)).pipe(
      map(hearingsStateData => {
          if (hearingsStateData && hearingsStateData.caseHearingsMainModel && hearingsStateData.caseHearingsMainModel.caseHearings) {
            return hearingsStateData.caseHearingsMainModel.caseHearings.filter(hearing =>
              hearing.exuiSectionStatus === status
            );
          } else {
            return [];
          }
        }
      )
    );
  }

  public ngOnDestroy(): void {
    this.hearingStore.dispatch(new fromHearingStore.Reset());
  }
}
