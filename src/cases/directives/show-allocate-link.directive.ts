import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CaseRole } from 'api/workAllocation2/interfaces/caseRole';
import { TypeOfRole } from 'src/role-access/models';
import { UserType } from '../../../api/user/interfaces/user-type';

@Directive({
  selector: '[exuiShowAllocateLink]'
})
export class ShowAllocateLinkDirective implements OnInit {
  private static CASE_MANAGERS_LIMIT = 1;
  @Input() public showAllocateRoleLink: boolean = false;
  @Input() public roles: CaseRole[];
  @Input() public userType: UserType;

  constructor(private element: ElementRef<HTMLElement>) {
  }

  private static canDisplayLink(roles: CaseRole[], userType: string, showAllocateRoleLink: boolean): boolean {
    const show = false;
    if (!showAllocateRoleLink || userType === UserType.LEGAL_OPS && ShowAllocateLinkDirective.hasExceededNumberCaseManagerRoles(roles)) {
      return show;
    }
    return true;
  }

  private static hasExceededNumberCaseManagerRoles(roles: CaseRole[]): boolean {
    const caseManagers = roles.filter((role: CaseRole) => role.role === TypeOfRole.CASE_MANAGER);
    return caseManagers.length >= ShowAllocateLinkDirective.CASE_MANAGERS_LIMIT;
  }

  public ngOnInit(): void {
    if (!ShowAllocateLinkDirective.canDisplayLink(this.roles, this.userType, this.showAllocateRoleLink)) {
      const host = this.element.nativeElement;
      host.style.display = 'none';
    }
  }
}
