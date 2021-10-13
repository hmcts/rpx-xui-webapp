import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { handleFatalErrors } from '../../../work-allocation-2/utils';
import { Answer, CaseRole, RemoveAllocationNavigationEvent } from '../../models';
import { RemoveRoleText } from '../../models/enums/answer-text';
import { AllocateRoleService } from '../../services';

@Component({
  selector: 'exui-remove-role',
  templateUrl: './remove-role.component.html'
})
export class RemoveRoleComponent implements OnInit {

  public removeAllocationNavigationEvent = RemoveAllocationNavigationEvent;
  public answers: Answer[] = [];
  public caption = null;
  public caseId: string;
  public assignmentId: string;
  public heading = RemoveRoleText.heading;
  public hint = RemoveRoleText.hint;
  public roleAssignment: CaseRole;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly allocateRoleService: AllocateRoleService) {}

  public ngOnInit(): void {
    const paramMap$ = this.route.queryParamMap;
    paramMap$.pipe(mergeMap(queryMap => {
        return this.getRoleAssignmentFromQuery(queryMap);
      })).subscribe(roleAssignments => {
        this.roleAssignment = roleAssignments.find(assignment => assignment.id === this.assignmentId);
        this.populateAnswers(this.roleAssignment);
      });
  }

  public populateAnswers(assignment: CaseRole): void {
    this.answers.push({label: 'Type of role', value: assignment.name});
    this.answers.push({label: 'Person', value: assignment.email});
  }

  public getRoleAssignmentFromQuery(queryMap: ParamMap): Observable<CaseRole[]> {
    this.assignmentId = queryMap.get('assignmentId');
    this.caseId = queryMap.get('caseId');
    const jurisdiction = queryMap.get('jurisdiction');
    const caseType = queryMap.get('caseType');
    return this.allocateRoleService.getCaseRoles(this.caseId, jurisdiction, caseType, this.assignmentId);
  }

  public onNavEvent(navEvent: RemoveAllocationNavigationEvent): void {
    const goToCaseUrl = `cases/case-details/${this.caseId}/roles-and-access`;
    switch (navEvent) {
      case RemoveAllocationNavigationEvent.REMOVE_ROLE_ALLOCATION: {
        this.allocateRoleService.removeAllocation(this.assignmentId).subscribe(() =>
        this.router.navigate([goToCaseUrl], {
          state: {
              showMessage: true,
              messageText: RemoveRoleText.infoMessage
            }
          }),
        error => {
          console.log(error);
          handleFatalErrors(error.status, this.router);
        }
      );
        break;
      }
      case RemoveAllocationNavigationEvent.CANCEL: {
        this.router.navigateByUrl(goToCaseUrl);
        return;
      }
      default: {
        throw new Error('Invalid option');
      }
    }
  }
}
