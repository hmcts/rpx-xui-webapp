import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';

import { Answer, ExclusionNavigationEvent, RoleExclusion } from '../../models';
import { AnswerHeaderText, AnswerLabelText, ExclusionMessageText } from '../../models/enums';
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
  public exclusionId: string;
  public caseId: string;
  public roleExclusion: RoleExclusion;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly roleExclusionsService: RoleExclusionsService) {}

  public ngOnInit(): void {
    // Get the role exclusions from the route, which will have been put there by the resolver.
    const caseDetails = this.route.snapshot.data.case as CaseView;
    console.log(caseDetails)
    this.route.queryParamMap.subscribe(queryMap => {
      this.exclusionId = queryMap.get('exclusionId');
      this.caseId = queryMap.get('caseId');
      this.roleExclusionsService.getCurrentUserRoleExclusions(this.caseId, 'Asylum', 'IA', this.exclusionId).subscribe(exclusions => {
        this.roleExclusion = exclusions.find(excl => excl.id === this.exclusionId);
        this.populateAnswers(this.roleExclusion);
      });
    });
  }

  private populateAnswers(exclusion: RoleExclusion): void {
    this.answers.push({label: AnswerLabelText.Person, value: exclusion.name});
    this.answers.push({label: AnswerLabelText.DescribeExclusion, value: exclusion.notes});
    this.answers.push({label: AnswerLabelText.DateAdded, value: new Date(exclusion.added).toLocaleDateString('en-GB')});
  }

  public onNavEvent(navEvent: ExclusionNavigationEvent): void {
    const goToCaseUrl = `cases/case-details/${this.caseId}/roles-and-access`;
    switch (navEvent) {
      case ExclusionNavigationEvent.DELETE_EXCLUSION: {
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
