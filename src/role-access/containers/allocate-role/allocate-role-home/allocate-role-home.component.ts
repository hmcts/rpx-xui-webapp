import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppUtils } from '../../../../app/app-utils';
import { UserRole } from '../../../../app/models/user-details.model';
import * as fromAppStore from '../../../../app/store';
import {
  checkAnswersVisibilityStates,
  chooseAllocateToVisibilityStates,
  chooseDurationVisibilityStates,
  chooseRoleVisibilityStates,
  searchPersonVisibilityStates
} from '../../../constants/allocate-role-page-visibility-states';
import { AllocateRoleNavigation, AllocateRoleNavigationEvent, AllocateRoleState, AllocateTo } from '../../../models';
import * as fromFeature from '../../../store';
import { AllocateRoleCheckAnswersComponent } from '../allocate-role-check-answers/allocate-role-check-answers.component';
import { AllocateRoleSearchPersonComponent } from '../allocate-role-search-person/allocate-role-search-person.component';
import { ChooseAllocateToComponent } from '../choose-allocate-to/choose-allocate-to.component';
import { ChooseDurationComponent } from '../choose-duration/choose-duration.component';
import { ChooseRoleComponent } from '../choose-role/choose-role.component';

@Component({
  selector: 'exui-allocate-role-home',
  templateUrl: './allocate-role-home.component.html',
})
export class AllocateRoleHomeComponent implements OnInit, OnDestroy {

  @ViewChild('chooseRole', {read: ChooseRoleComponent})
  public chooseRoleComponent: ChooseRoleComponent;

  @ViewChild('chooseAllocateTo', {read: ChooseAllocateToComponent})
  public chooseAllocateToComponent: ChooseAllocateToComponent;

  @ViewChild('searchPerson', {read: AllocateRoleSearchPersonComponent})
  public searchPersonComponent: AllocateRoleSearchPersonComponent;

  @ViewChild('chooseDuration', {read: ChooseDurationComponent})
  public chooseDurationComponent: ChooseDurationComponent;

  @ViewChild('checkAnswers', {read: AllocateRoleCheckAnswersComponent})
  public checkAnswersComponent: AllocateRoleCheckAnswersComponent;

  public chooseRoleVisibilityStates = chooseRoleVisibilityStates;
  public chooseAllocateToVisibilityStates = chooseAllocateToVisibilityStates;
  public searchPersonVisibilityStates = searchPersonVisibilityStates;
  public chooseDurationVisibilityStates = chooseDurationVisibilityStates;
  public checkAnswersVisibilityStates = checkAnswersVisibilityStates;

  public navEvent: AllocateRoleNavigation;

  public appStoreSub: Subscription;
  public allocateRoleStateDataSub: Subscription;

  public navigationCurrentState: AllocateRoleState;
  public allocateTo: AllocateTo;
  public caseId: string;
  public isLegalOpsOrJudicialRole: UserRole;

  constructor(private readonly appStore: Store<fromAppStore.State>,
              private readonly store: Store<fromFeature.State>,
              private readonly router: Router) { }

  public ngOnInit(): void {
    this.appStoreSub = this.appStore.pipe(select(fromAppStore.getUserDetails)).subscribe(
      userDetails => {
        this.isLegalOpsOrJudicialRole = AppUtils.isLegalOpsOrJudicial(userDetails.userInfo.roles);
      }
    );
    this.allocateRoleStateDataSub = this.store.pipe(select(fromFeature.getAllocateRoleState)).subscribe(
      allocateRoleStateData => {
        this.navigationCurrentState = allocateRoleStateData.state;
        this.allocateTo = allocateRoleStateData.allocateTo;
        this.caseId = allocateRoleStateData.caseId;
      }
    );
  }

  public isComponentVisible(currentNavigationState: AllocateRoleState, requiredNavigationState: AllocateRoleState[]): boolean {
    return requiredNavigationState.includes(currentNavigationState);
  }

  public onNavEvent(event: AllocateRoleNavigationEvent): void {
    this.navEvent = {
      event,
      timestamp: Date.now()
    };
    this.navigationHandler(event);
  }

  public navigationHandler(navEvent: AllocateRoleNavigationEvent): void {
    switch (navEvent) {
      case AllocateRoleNavigationEvent.BACK: {
        switch (this.navigationCurrentState) {
          case AllocateRoleState.CHOOSE_ALLOCATE_TO:
            this.store.dispatch(new fromFeature.AllocateRoleChangeNavigation(AllocateRoleState.CHOOSE_ROLE));
            break;
          case AllocateRoleState.SEARCH_PERSON:
            switch (this.isLegalOpsOrJudicialRole) {
              case UserRole.LegalOps:
                this.store.dispatch(new fromFeature.AllocateRoleChangeNavigation(AllocateRoleState.CHOOSE_ROLE));
                break;
              case UserRole.Judicial:
                this.store.dispatch(new fromFeature.AllocateRoleChangeNavigation(AllocateRoleState.CHOOSE_ALLOCATE_TO));
                break;
              default:
                throw new Error('Invalid user role');
            }
            break;
          case AllocateRoleState.CHOOSE_DURATION:
            switch (this.isLegalOpsOrJudicialRole) {
              case UserRole.LegalOps:
                this.store.dispatch(new fromFeature.AllocateRoleChangeNavigation(AllocateRoleState.SEARCH_PERSON));
                break;
              case UserRole.Judicial:
                switch (this.allocateTo) {
                  case AllocateTo.RESERVE_TO_ME:
                    this.store.dispatch(new fromFeature.AllocateRoleChangeNavigation(AllocateRoleState.CHOOSE_ALLOCATE_TO));
                    break;
                  case AllocateTo.ALLOCATE_TO_ANOTHER_PERSON:
                    this.store.dispatch(new fromFeature.AllocateRoleChangeNavigation(AllocateRoleState.SEARCH_PERSON));
                    break;
                  default:
                    throw new Error('Invalid allocate to');
                }
                break;
              default:
                throw new Error('Invalid user role');
            }
            break;
          case AllocateRoleState.CHECK_ANSWERS:
            this.store.dispatch(new fromFeature.AllocateRoleChangeNavigation(AllocateRoleState.CHOOSE_DURATION));
            break;
          default:
            throw new Error('Invalid exclusion state');
        }
        break;
      }
      case AllocateRoleNavigationEvent.CONTINUE: {
        switch (this.navigationCurrentState) {
          case AllocateRoleState.CHOOSE_ROLE:
            this.chooseRoleComponent.navigationHandler(navEvent, this.isLegalOpsOrJudicialRole);
            break;
          case AllocateRoleState.CHOOSE_ALLOCATE_TO:
            this.chooseAllocateToComponent.navigationHandler(navEvent);
            break;
          case AllocateRoleState.SEARCH_PERSON:
            this.searchPersonComponent.navigationHandler(navEvent);
            break;
          case AllocateRoleState.CHOOSE_DURATION:
            this.chooseDurationComponent.navigationHandler(navEvent);
            break;
          case AllocateRoleState.CHECK_ANSWERS:
            this.checkAnswersComponent.navigationHandler(navEvent);
            break;
          default:
            throw new Error('Invalid exclusion state');
        }
        break;
      }
      case AllocateRoleNavigationEvent.CONFIRM: {
        switch (this.navigationCurrentState) {
          case AllocateRoleState.CHECK_ANSWERS:
            this.checkAnswersComponent.navigationHandler(navEvent);
            break;
          default:
            throw new Error('Invalid exclusion state');
        }
        break;
      }
      case AllocateRoleNavigationEvent.CANCEL:
        this.router.navigateByUrl(`cases/case-details/${this.caseId}/roles-and-access`);
        break;
      default:
        throw new Error('Invalid exclusion navigation event');
    }
  }

  public ngOnDestroy(): void {
    if (this.appStoreSub) {
      this.appStoreSub.unsubscribe();
    }
    if (this.allocateRoleStateDataSub) {
      this.allocateRoleStateDataSub.unsubscribe();
    }
    this.store.dispatch(new fromFeature.AllocateRoleReset());
  }
}
