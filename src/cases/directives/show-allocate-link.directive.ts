import { Directive, ElementRef, Input, OnInit } from '@angular/core';
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

  constructor(private readonly element: ElementRef<HTMLElement>) {}

  private static canDisplayLink(roles: CaseRole[], roleCategory: RoleCategory, showAllocateRoleLink: boolean): boolean {
    const show = false;
    // TODO(EXUI-2073): Decision needed for roleCategory === <NEW_CATEGORY>.
    // QUESTION: On the case "Roles and access" page, should the "Allocate role" link be shown for <NEW_CATEGORY> now, or hidden until the full allocation journey is ready?
    // CONTEXT: This directive runs on the allocate-role anchor and is the last UI gate before navigation into /role-access/allocate-role routes.
    // CONTEXT: Logic currently blocks only when showAllocateRoleLink is false or LEGAL_OPERATIONS already has a case-manager; every other category is allowed through.
    // CONTEXT: The check does not validate downstream journey support, so a new/unhandled category can still expose the link and then fail later in category-based switches (for example invalid role category/user type branches).
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
      const host = this.element.nativeElement;
      host.style.display = 'none';
    }
  }
}
