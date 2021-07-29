import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Answer, ExclusionNavigationEvent } from '../../models';
import { AnswerHeaderText, AnswerLabelText } from '../../models/enums';

@Component({
  selector: 'exui-delete-exclusion',
  templateUrl: './delete-exclusion.component.html'
})
export class DeleteExclusionComponent implements OnInit {

  public exclusionNavigationEvent = ExclusionNavigationEvent;
  public answers: Answer[] = [];
  public caption = AnswerHeaderText.DeleteExclusion;
  public heading = AnswerHeaderText.CheckAnswers;
  public hint = AnswerHeaderText.CheckInformation;
  public caseId: string;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  public ngOnInit(): void {
    // Get the role exclusions from the route, which will have been put there by the resolver.
    const roleExclusions = this.route.snapshot.data.roleExclusions;
    this.populateAnswers(roleExclusions);
    this.route.paramMap.subscribe(params => {
      this.caseId = params.get("caseId");
    });
    console.log(this.caseId);
  }

  private populateAnswers(exclusions: any[]) {
    for (const exclusion of exclusions) {
      this.answers.push({label: AnswerLabelText.Person, value: exclusion.name});
      this.answers.push({label: AnswerLabelText.DescribeExclusion, value: exclusion.notes});
      this.answers.push({label: AnswerLabelText.DateAdded, value: new Date(exclusion.added).toLocaleDateString('en-GB')});
    }
  }

  public onNavEvent(event: ExclusionNavigationEvent): void {
    const navEvent = {
      event,
      timestamp: Date.now()
    };
    this.navigationHandler(event);
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent): void {
    switch (navEvent) {
      case ExclusionNavigationEvent.DELETE_EXCLUSION: {
        this.store.dispatch(new fromFeature.DeleteExclusionAction(this.exclusionStateData));
        break;
      }
      case ExclusionNavigationEvent.CANCEL:
        this.router.navigateByUrl(`cases/case-details/${this.caseId}/roles-and-access`).then(r => {
          return;
        });
        break;
      default:
        throw new Error('Invalid option');
    }
  }
}
