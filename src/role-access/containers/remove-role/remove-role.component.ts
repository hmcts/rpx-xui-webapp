import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { handleFatalErrors } from '../../../work-allocation-2/utils';
import { Answer, CaseRole, RemoveAllocationNavigationEvent } from '../../models';
import { RemoveRoleText } from '../../models/enums/answer-text';
import { AllocateRoleService } from '../../services/allocate-role.service';

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

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly allocateRoleService: AllocateRoleService) {}

  public ngOnInit(): void {
    const roles = this.route.snapshot.data.roles as CaseRole[];
    this.caseId = this.route.snapshot.queryParams.caseId;
    this.assignmentId = this.route.snapshot.queryParams.assignmentId;
    const currentRole = roles.find(assignment => assignment.id === this.assignmentId);
    const personDetails = `${currentRole.name}\n${currentRole.email}`;
    this.answers.push({label: 'Type of role', value: currentRole.role});
    this.answers.push({label: 'Person', value: personDetails});
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
