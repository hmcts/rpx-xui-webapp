import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CaseRole, RoleCategory } from '../../../role-access/models';

@Component({
  selector: 'exui-allocate-a-role-link',
  templateUrl: './allocate-a-role-link.component.html',
  styleUrls: ['./allocate-a-role-link.component.scss']
})

export class AllocateARoleLinkComponent implements OnChanges {
    @Input() public routerLink: string;
    @Input() public queryParams: string;
    @Input() public showAllocateRoleLink = false;
    @Input() public roles: CaseRole[] = [];
    @Input() public roleCategory: RoleCategory;
    @Input() public linkText: string;
    @Input() public existingUsers: string[];
    public existingUsersParam: string;
    public ngOnChanges(): void {
      console.log("logged from allocate-a-role-link component");
      console.log(this.existingUsers);
      if (this.existingUsers) {
        this.existingUsersParam = this.existingUsers.join(',');
      }
      console.log(this.routerLink);
      console.log(this.existingUsersParam);
      console.log(this.queryParams);
    }
}
