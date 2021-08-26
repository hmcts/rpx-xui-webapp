import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseRole, RemoveAllocationNavigationEvent } from '../../../role-access/models/case-role.interface';
import { Answer } from '../../../role-access/models';
import { handleFatalErrors } from '../../../work-allocation-2/utils';
import { AllocateRoleService } from '../../../role-access/services/allocate-role.service';
import { RemoveRoleText } from '../../../role-access/models/enums/answer-text';

@Component({
  selector: 'exui-remove-role',
  templateUrl: './remove-role.component.html'
})
export class RemoveRoleComponent implements OnInit {

  public removeAllocationNavigationEvent = RemoveAllocationNavigationEvent;
  public answers: Answer[] = [];
  public caption = null;
  public caseId: string;
  public roleId: string;
  public heading = RemoveRoleText.heading;
  public hint = RemoveRoleText.hint;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly allocateRoleService: AllocateRoleService) {}

  public ngOnInit(): void {
    const roles = this.route.snapshot.data.roles as CaseRole[];
    this.route.paramMap.subscribe(params => {
      this.caseId = params.get('cid');
      this.roleId = params.get('roleId');
      const currentRole = roles.find(role => role.id === this.roleId);
      this.answers.push({label: 'Type of role', value: currentRole.role});
      this.answers.push({label: 'Person', value: currentRole.name, secondValue: currentRole.email});
    });
  }

  public onNavEvent(navEvent: RemoveAllocationNavigationEvent): void {
    const goToCaseUrl = `cases/case-details/${this.caseId}/roles-and-access`;
    switch (navEvent) {
      case RemoveAllocationNavigationEvent.REMOVE_ROLE_ALLOCATION: {
        this.allocateRoleService.removeAllocation(this.caseId, this.roleId).subscribe(() =>
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
