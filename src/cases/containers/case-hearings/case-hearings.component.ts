import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRole } from '../../../app/models/user-details.model';
import { RoleCategoryMappingService } from '../../../app/services/role-category-mapping/role-category-mapping.service';
import * as fromAppStore from '../../../app/store';
import { CaseHearingModel } from '../../../hearings/models/caseHearing.model';
import { Actions, EXUISectionStatusEnum } from '../../../hearings/models/hearings.enum';
import * as fromHearingStore from '../../../hearings/store';

@Component({
  selector: 'exui-case-hearings',
  templateUrl: './case-hearings.component.html'
})
export class CaseHearingsComponent implements OnInit {
  public upcomingHearings$: Observable<CaseHearingModel[]>;
  public upcomingStatus: EXUISectionStatusEnum = EXUISectionStatusEnum.UPCOMING;
  public pastAndCancelledHearings$: Observable<CaseHearingModel[]>;
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
    this.upcomingHearings$ = this.getHearsListByStatus(EXUISectionStatusEnum.UPCOMING);
    this.pastAndCancelledHearings$ = this.getHearsListByStatus(EXUISectionStatusEnum.PAST_AND_CANCELLED);
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
}
