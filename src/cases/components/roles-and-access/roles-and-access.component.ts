import { Component, Input, OnInit } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { LocationInfo } from '../../../app/models/user-details.model';
import { CaseRole, RoleCategory, RoleExclusion } from '../../../role-access/models';

@Component({
  selector: 'exui-roles-and-access',
  templateUrl: './roles-and-access.component.html'
})
export class RolesAndAccessComponent implements OnInit {
  public legalOpsRoles: CaseRole[] = [];
  public judicialRoles: CaseRole[] = [];
  public legalOps: RoleCategory = RoleCategory.LEGAL_OPERATIONS;
  public judicial: RoleCategory = RoleCategory.JUDICIAL;
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
    this.legalOpsRoles = this.roles.filter(role => role.roleCategory === RoleCategory.LEGAL_OPERATIONS);
    this.judicialRoles = this.roles.filter(role => role.roleCategory === RoleCategory.JUDICIAL);
  }

  public ngOnInit(): void {
    this.caseId = this.caseDetails.case_id;
  }
}
