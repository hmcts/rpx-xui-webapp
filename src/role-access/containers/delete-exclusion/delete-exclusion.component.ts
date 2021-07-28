import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Answer, ExclusionNavigationEvent } from '../../models';
import { AnswerHeaderText, AnswerLabelText } from '../../models/enums';

@Component({
  selector: 'exui-delete-exclusion',
  templateUrl: './delete-exclusion.component.html'
})
export class DeleteExclusionComponent implements OnInit {

  @Output() public eventTrigger = new EventEmitter();

  public exclusionNavigationEvent = ExclusionNavigationEvent;
  public answers: Answer[] = [];
  public caption = AnswerHeaderText.DeleteExclusion;
  public heading = AnswerHeaderText.CheckAnswers;
  public hint = AnswerHeaderText.CheckInformation;

  constructor(private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    // Get the role exclusions from the route, which will have been put there by the resolver.
    const roleExclusions = this.route.snapshot.data.roleExclusions;
    this.populateAnswers(roleExclusions);
  }

  public onEventTrigger(event: ExclusionNavigationEvent) {
    this.eventTrigger.emit(event);
  }

  private populateAnswers(exclusions: any[]) {
    for (let exclusion of exclusions) {
      this.answers.push({label: AnswerLabelText.Person, value: exclusion.name});
      this.answers.push({label: AnswerLabelText.DescribeExclusion, value: exclusion.notes});
      this.answers.push({label: AnswerLabelText.DateAdded, value: new Date(exclusion.added).toLocaleDateString('en-GB')});
    }
  }
}
