import { Component, Input, OnInit } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { UserType } from '../../../../api/user/interfaces/user-type';
import { CaseRole } from '../../../../api/workAllocation2/interfaces/caseRole';
import { LocationInfo } from '../../../app/models/user-details.model';
import { RoleExclusion, TypeOfRole } from '../../../role-access/models';

@Component({
  selector: 'exui-roles-and-access',
  templateUrl: './roles-and-access.component.html'
})
export class RolesAndAccessComponent implements OnInit {
  public legalOpsRoles: CaseRole[] = [];
  public judicialRoles: CaseRole[] = [];
  public legalOps: UserType = UserType.LEGAL_OPS;
  public judicial: UserType = UserType.JUDICIAL;
  public caseId: string;

  @Input() public exclusions: RoleExclusion[] = [];
  @Input() public showAllocateRoleLink: boolean = false;
  @Input() public caseDetails: CaseView;
  @Input() public locationInfo: LocationInfo;

  private pRoles: CaseRole[] = [];

  public get roles(): CaseRole[] {
    return this.pRoles;
  }

  @Input()
  public set roles(value: CaseRole[]) {
    this.pRoles = value;
    this.legalOpsRoles = this.roles.filter(role => role.role === TypeOfRole.CASE_MANAGER);
    this.judicialRoles = this.roles.filter(role => RolesAndAccessComponent.isJudicialRole(role));
  }

  public static isJudicialRole(caseRole: CaseRole): boolean {
    return caseRole.role === TypeOfRole.LEAD_JUDGE || caseRole.role === TypeOfRole.HEARING_JUDGE;
  }

  public ngOnInit(): void {
    this.caseId = this.caseDetails.case_id;
  }
}
