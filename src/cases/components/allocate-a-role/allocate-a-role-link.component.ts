import { Component, Input } from '@angular/core';
import { CaseRole, RoleCategory } from '../../../role-access/models';

@Component({
    selector: 'exui-allocate-a-role-link',
    templateUrl: './allocate-a-role-link.component.html',
    styleUrls: ['./allocate-a-role-link.component.scss']
  })

export class AllocateARoleLinkComponent {
    @Input() public routerLink: string;
    @Input() public queryParams: string;
    @Input() public showAllocateRoleLink = false;
    @Input() public roles: CaseRole[] = [];
    @Input() public roleCategory: RoleCategory;
    @Input() public linkText: string;
}
