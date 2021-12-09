import { Component, Input, OnInit } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
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
  public jurisdiction: string;

  @Input() public exclusions: RoleExclusion[] = [];
  @Input() public showAllocateRoleLink: boolean = false;
  @Input() public caseDetails: CaseView;

  private pRoles: CaseRole[] = [];
  public jurisdictionFieldId = '[JURISDICTION]';
  public showLegalOpsAllocate: boolean;

  public get roles(): CaseRole[] {
    return this.pRoles;
  }

  @Input()
  public set roles(value: CaseRole[]) {
    this.pRoles = value;
    if (this.roles) {
      this.legalOpsRoles = this.roles.filter(role => role.roleCategory === RoleCategory.LEGAL_OPERATIONS);
      this.judicialRoles = this.roles.filter(role => role.roleCategory === RoleCategory.JUDICIAL);
    }
    this.showLegalOpsAllocate = this.showAllocateRoleLink && this.legalOpsRoles.length === 0;
  }

  public ngOnInit(): void {
    this.caseId = this.caseDetails.case_id;
    const jurisdictionField = this.caseDetails.metadataFields.find(field => field.id === this.jurisdictionFieldId);
    if (jurisdictionField) {
      this.jurisdiction = jurisdictionField.value;
    }
  }
}
