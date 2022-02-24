import { Component, Input } from '@angular/core';
import { CaseRole, RoleCategory } from '../../../role-access/models';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';

@Component({
    selector: 'exui-role-access-section',
    templateUrl: './role-access-section.component.html'
  })
export class RoleAccessSectionComponent {
    @Input() public title: string;
    @Input() namedRoles: CaseRole [];
    @Input() roles: CaseRole [];
    @Input() public caseDetails: CaseView;
    @Input() public showAllocateRoleLink: boolean = false;
    @Input() public roleRouterLink: string;
    @Input() public roleQueryParams: string;
    @Input() public roleCategory: string;
    @Input() public showAllocate: boolean;
    @Input() public linkText = 'Allocate a role';
}
