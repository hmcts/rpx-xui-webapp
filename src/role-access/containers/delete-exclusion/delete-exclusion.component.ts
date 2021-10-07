import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

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
    const paramMap$ = this.route.queryParamMap;
    paramMap$.pipe(mergeMap(queryMap => {
        return this.getExclusionFromQuery(queryMap);
      })).subscribe(exclusions => {
          this.roleExclusion = exclusions.find(excl => excl.id === this.exclusionId);
          this.populateAnswers(this.roleExclusion);
      });
  }

  public getExclusionFromQuery(queryMap: ParamMap) {
    this.exclusionId = queryMap.get('exclusionId');
    this.caseId = queryMap.get('caseId');
    const jurisdiction = queryMap.get('jurisdiction');
    const caseType = queryMap.get('caseType');
    return this.roleExclusionsService.getCurrentUserRoleExclusions(this.caseId, caseType, jurisdiction, this.exclusionId);
  }

  public populateAnswers(exclusion: RoleExclusion): void {
    this.answers.push({label: AnswerLabelText.Person, value: exclusion.name});
    this.answers.push({label: AnswerLabelText.DescribeExclusion, value: exclusion.notes ? exclusion.notes : ''});
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
