import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { CaseRole, TypeOfRole } from '../../role-access/models';

@Directive({
  standalone: false,
  selector: '[exuiShowAllocateLink]',
})
export class ShowAllocateLinkDirective implements OnInit {
  private static readonly CASE_MANAGERS_LIMIT = 1;
  @Input() public showAllocateRoleLink: boolean = false;
  @Input() public roles: CaseRole[];
  @Input() public roleCategory: RoleCategory;
  @Input() public existingUsers: string[] = [];
  @HostBinding('hidden') public hidden = false;

  private static canDisplayLink(roles: CaseRole[], roleCategory: RoleCategory, showAllocateRoleLink: boolean): boolean {
    const show = false;
    if (
      !showAllocateRoleLink ||
      (roleCategory === RoleCategory.LEGAL_OPERATIONS && ShowAllocateLinkDirective.hasExceededNumberCaseManagerRoles(roles))
    ) {
      return show;
    }
    return true;
  }

  private static hasExceededNumberCaseManagerRoles(roles: CaseRole[]): boolean {
    const caseManagers = roles.filter((role: CaseRole) => role.roleName.toLowerCase() === TypeOfRole.CaseManager.toLowerCase());
    return caseManagers.length >= ShowAllocateLinkDirective.CASE_MANAGERS_LIMIT;
  }

  public ngOnInit(): void {
    if (!ShowAllocateLinkDirective.canDisplayLink(this.roles, this.roleCategory, this.showAllocateRoleLink)) {
      this.hidden = true;
    }
  }
}
