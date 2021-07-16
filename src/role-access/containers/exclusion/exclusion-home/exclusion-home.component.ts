import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  checkAnswersVisibilityStates,
  chooseExclusionStates,
  choosePersonRoleStates,
  describeExclusionVisibilityStates,
  findPersonVisibilityStates
} from '../../../constants';
import { ExclusionNavigationEvent, ExclusionState } from '../../../models';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import * as fromFeature from '../../../store';
import { CheckAnswersComponent } from '../check-answers/check-answers.component';
import { ChooseExclusionComponent } from '../choose-exclusion/choose-exclusion.component';
import { ChoosePersonRoleComponent } from '../choose-person-role/choose-person-role.component';
import { DescribeExclusionComponent } from '../describe-exclusion/describe-exclusion.component';
import { FindPersonComponent } from '../find-person/find-person.component';

@Component({
  selector: 'exui-exclusion-home',
  templateUrl: './exclusion-home.component.html',
  styleUrls: ['./exclusion-home.component.scss']
})
export class ExclusionHomeComponent implements OnInit, OnDestroy {
  @ViewChild('chooseExclusion', {read: ChooseExclusionComponent})
  public chooseExclusionComponent: ChooseExclusionComponent;

  @ViewChild('choosePersonRole', {read: ChoosePersonRoleComponent})
  public choosePersonRoleComponent: ChoosePersonRoleComponent;

  @ViewChild('findPerson', {read: FindPersonComponent})
  public findPersonComponent: FindPersonComponent;

  @ViewChild('describeExclusion', {read: DescribeExclusionComponent})
  public describeExclusionComponent: DescribeExclusionComponent;

  @ViewChild('checkAnswers', {read: CheckAnswersComponent})
  public checkAnswersComponent: CheckAnswersComponent;

  public navigationCurrentState: ExclusionState;
  private navigationCurrentStateSub: Subscription;

  public navEvent: ExclusionNavigation;

  public chooseExclusionStates = chooseExclusionStates;
  public choosePersonRoleStates = choosePersonRoleStates;
  public findPersonVisibilityStates = findPersonVisibilityStates;
  public describeExclusionVisibilityStates = describeExclusionVisibilityStates;
  public checkAnswersVisibilityStates = checkAnswersVisibilityStates;

  constructor(private readonly store: Store<fromFeature.State>,
              private readonly router: Router) {
  }

  public ngOnInit(): void {
    this.navigationCurrentStateSub = this.store.pipe(select(fromFeature.currentNavigation)).subscribe(
      state => this.navigationCurrentState = state
    );
  }

  public onNavEvent(event: ExclusionNavigationEvent) {
    this.navEvent = {
      event,
      timestamp: Date.now()
    };
    this.navigationHandler(event);
  }

  public isComponentVisible(currentNavigationState: ExclusionState, requiredNavigationState: ExclusionState[]): boolean {
    return requiredNavigationState.includes(currentNavigationState);
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent) {
    switch (navEvent) {
      case ExclusionNavigationEvent.BACK: {
        switch (this.navigationCurrentState) {
          case ExclusionState.CHOOSE_EXCLUSION:
            // TODO back to case detail tabs
            // this.router.navigateByUrl(`cases/case-details/${caseId}`).then(r => {
            //   return;
            // });
            break;
          case ExclusionState.CHOOSE_PERSON_ROLE:
            this.store.dispatch(new fromFeature.ChangeNavigation(ExclusionState.CHOOSE_EXCLUSION));
            break;
          case ExclusionState.FIND_PERSON:
            this.store.dispatch(new fromFeature.ChangeNavigation(ExclusionState.CHOOSE_PERSON_ROLE));
            break;
          case ExclusionState.DESCRIBE_EXCLUSION:
            // TODO if from exclude me
            // this.store.dispatch(new fromFeature.ChangeNavigation(ExclusionState.CHOOSE_EXCLUSION));
            // TODO if from exclude another person
            // this.store.dispatch(new fromFeature.ChangeNavigation(ExclusionState.FIND_PERSON));
            break;
          case ExclusionState.CHECK_ANSWERS:
            this.store.dispatch(new fromFeature.ChangeNavigation(ExclusionState.DESCRIBE_EXCLUSION));
            break;
          default:
            throw new Error('Invalid exclusion state');
        }
        break;
      }
      case ExclusionNavigationEvent.CONTINUE: {
        switch (this.navigationCurrentState) {
          case ExclusionState.CHOOSE_EXCLUSION:
            this.chooseExclusionComponent.navigationHandler(navEvent);
            break;
          case ExclusionState.CHOOSE_PERSON_ROLE:
            this.choosePersonRoleComponent.navigationHandler(navEvent);
            break;
          case ExclusionState.FIND_PERSON:
            this.findPersonComponent.navigationHandler(navEvent);
            break;
          case ExclusionState.DESCRIBE_EXCLUSION:
            this.describeExclusionComponent.navigationHandler(navEvent);
            break;
          default:
            throw new Error('Invalid exclusion state');
        }
        break;
      }
      case ExclusionNavigationEvent.CONFIRM_EXCLUSION: {
        switch (this.navigationCurrentState) {
          case ExclusionState.CHECK_ANSWERS:
            // TODO
            break;
          default:
            throw new Error('Invalid exclusion state');
        }
        break;
      }
      default:
        throw new Error('Invalid exclusion navigation event');
    }
  }

  public ngOnDestroy() {
    if (this.navigationCurrentStateSub) {
      this.navigationCurrentStateSub.unsubscribe();
    }
    this.store.dispatch(new fromFeature.Reset());
  }
}
