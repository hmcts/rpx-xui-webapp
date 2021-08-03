import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  checkAnswersVisibilityStates,
  chooseAllocateToVisibilityStates,
  chooseDurationVisibilityStates,
  chooseRoleVisibilityStates,
  searchPersonVisibilityStates
} from '../../../constants/allocate-role-page-visibility-states';
import { AllocateRoleState } from '../../../models';
import { AllocateRoleNavigationEvent } from '../../../models/allocate-role-navigation-event.enum';
import { AllocateRoleNavigation } from '../../../models/allocate-role-navigation.interface';
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

  public allocateRoleStateDataSub: Subscription;

  public navigationCurrentState: AllocateRoleState;
  public caseId: string;

  constructor(private readonly store: Store<fromFeature.State>,
              private readonly router: Router) { }

  public ngOnInit(): void {
    this.allocateRoleStateDataSub = this.store.pipe(select(fromFeature.getAllocateRoleState)).subscribe(
      allocateRoleStateData => {
        this.navigationCurrentState = allocateRoleStateData.state;
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
            this.store.dispatch(new fromFeature.AllocateRoleChangeNavigation(AllocateRoleState.CHOOSE_ALLOCATE_TO));
            break;
          default:
            throw new Error('Invalid exclusion state');
        }
        break;
      }
      case AllocateRoleNavigationEvent.CONTINUE: {
        switch (this.navigationCurrentState) {
          case AllocateRoleState.CHOOSE_ROLE:
            this.chooseRoleComponent.navigationHandler(navEvent);
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
    if (this.allocateRoleStateDataSub) {
      this.allocateRoleStateDataSub.unsubscribe();
    }
    this.store.dispatch(new fromFeature.AllocateRoleReset());
  }
}
