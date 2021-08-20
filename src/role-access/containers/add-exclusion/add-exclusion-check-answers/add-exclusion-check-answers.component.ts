import { Component, Input, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Answer, ExcludeOption, ExclusionNavigationEvent, ExclusionState, ExclusionStateData } from '../../../models';
import { AnswerHeaderText, AnswerLabelText } from '../../../models/enums';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-add-exclusion-check-answers',
  templateUrl: './add-exclusion-check-answers.component.html'
})
export class AddExclusionCheckAnswersComponent implements OnDestroy {

  @Input() public navEvent: ExclusionNavigation;

  public answers: Answer[] = [];
  public caption = AnswerHeaderText.AddExclusion;
  public heading = AnswerHeaderText.CheckAnswers;
  public hint = AnswerHeaderText.CheckInformation;
  public storeSubscription: Subscription;

  private exclusionStateData: ExclusionStateData;

  constructor(private readonly store: Store<fromFeature.State>) {
    this.storeSubscription = this.store.pipe(select(fromFeature.getRoleAccessState)).subscribe(
      exclusion => this.setAnswersFromExclusionStore(exclusion));
  }

  public ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent) {
    switch (navEvent) {
      case ExclusionNavigationEvent.CONFIRM_EXCLUSION:
        this.store.dispatch(new fromFeature.ConfirmExclusionAction(this.exclusionStateData));
        break;
      default:
        throw new Error('Invalid option');
    }
  }

  public onNavigate(action) {
    this.store.dispatch(new fromFeature.ChangeNavigation(action));
  }

  private setAnswersFromExclusionStore(exclusion: ExclusionStateData): void {
    this.exclusionStateData = exclusion;
    this.answers = [];
    this.answers.push({ label: AnswerLabelText.WhoFor, value: exclusion.exclusionOption, action: ExclusionState.CHOOSE_EXCLUSION });
    if (exclusion.exclusionOption === ExcludeOption.EXCLUDE_ANOTHER_PERSON) {
      this.answers.push({ label: AnswerLabelText.PersonRole, value: exclusion.personRole, action: ExclusionState.CHOOSE_PERSON_ROLE });
      let personDetails = exclusion.person.name;
      if (exclusion.person.email) {
        personDetails += `\n${exclusion.person.email}`;
      }
      this.answers.push({ label: AnswerLabelText.Person, value: personDetails, action: ExclusionState.FIND_PERSON });
    }
    this.answers.push({ label: AnswerLabelText.DescribeExclusion, value: exclusion.exclusionDescription, action: ExclusionState.DESCRIBE_EXCLUSION });
  }
}

