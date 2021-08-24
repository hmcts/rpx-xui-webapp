import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseRole, RemoveAllocationNavigationEvent } from '../../../role-access/models/case-role.interface';
import { Answer } from '../../../role-access/models';
import { catchError } from 'rxjs/operators';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../../work-allocation-2/utils';
import { EMPTY } from 'rxjs';
import { AllocateRoleService } from '../../../role-access/services/allocate-role.service';

@Component({
  selector: 'exui-remove-role',
  templateUrl: './remove-role.component.html'
})
export class RemoveRoleComponent implements OnInit {

  public removeAllocationNavigationEvent = RemoveAllocationNavigationEvent;
  public answers: Answer[] = [];
  public caption = null;
  public heading = 'Remove allocation';
  public hint = 'This will remove the role allocation. You may need to unassign or reassign associated tasks too.';
  public infoMessage = 'You\'ve removed a role allocation. You may need to unassign or reassign associated tasks too.';
  public caseId: string;
  public roleId: string;


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
              messageText: this.infoMessage
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
