import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseRole, RemoveAllocationNavigationEvent } from '../../../role-access/models/case-role.interface';
import { Answer } from '../../../role-access/models';

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
  public caseId: string;
  public roleId: string;
  public role: CaseRole;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  public ngOnInit(): void {
    const roles = this.route.snapshot.data.roles as CaseRole[];
    this.route.paramMap.subscribe(params => {
      this.caseId = params.get('cid');
      this.roleId = params.get('roleId');
      this.role = roles.find(role => role.id === this.roleId);
      this.answers.push({label: 'Type of role', value: this.role.role});
      this.answers.push({label: 'Person', value: this.role.name});
    });
  }

  public onNavEvent(navEvent: RemoveAllocationNavigationEvent): void {
    const goToCaseUrl = `cases/case-details/${this.caseId}/roles-and-access`;
    switch (navEvent) {
      case RemoveAllocationNavigationEvent.REMOVE_ROLE_ALLOCATION: {
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
