import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Answer, ExclusionNavigationEvent, RoleExclusion } from '../../models';
import { AnswerHeaderText, AnswerLabelText } from '../../models/enums';
import { ExclusionMessageText } from '../../models/enums/exclusion-text';
import { RoleExclusionsService } from '../../services';
import { handleError } from '../../utils';

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
  public roleExclusion: RoleExclusion;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private roleExclusionsService: RoleExclusionsService) {}

  public ngOnInit(): void {
    // Get the role exclusions from the route, which will have been put there by the resolver.
    const roleExclusions = this.route.snapshot.data.roleExclusions;
    // as mock data returns list, get first one for now
    this.roleExclusion = roleExclusions[0];
    this.populateAnswers(roleExclusions);
    this.route.paramMap.subscribe(params => {
      this.caseId = params.get('caseId');
    });
  }

  private populateAnswers(exclusions: RoleExclusion[]): void {
    for (const exclusion of exclusions) {
      this.answers.push({label: AnswerLabelText.Person, value: exclusion.name});
      this.answers.push({label: AnswerLabelText.DescribeExclusion, value: exclusion.notes});
      this.answers.push({label: AnswerLabelText.DateAdded, value: new Date(exclusion.added).toLocaleDateString('en-GB')});
    }
  }

  public onNavEvent(navEvent: ExclusionNavigationEvent): void {
    const goToCaseUrl = `cases/case-details/${this.caseId}/roles-and-access`;
    switch (navEvent) {
      case ExclusionNavigationEvent.DELETE_EXCLUSION: {
        // might need to pass in the case id
        this.roleExclusionsService.deleteExclusion(this.roleExclusion).subscribe(() => {
          // navigates to case details page for specific case id
          this.router.navigate([goToCaseUrl], {
            state: {
              showMessage: true,
              messageText: ExclusionMessageText.Delete}
            });
        }, error => {
          return handleError(error, this.router, goToCaseUrl);
        });
        break;
      }
      case ExclusionNavigationEvent.CANCEL: {
        this.router.navigateByUrl(goToCaseUrl);
        return;
      }
      default: {
        throw new Error('Invalid option');
      }
    }
  }
}
