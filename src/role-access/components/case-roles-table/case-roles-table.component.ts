import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { CaseRole, RoleCategory } from '../../models';

interface Item extends CaseRole {
  open: boolean;
}

@Component({
  selector: 'exui-case-roles-table',
  templateUrl: './case-roles-table.component.html',
  styleUrls: ['./case-roles-table.component.scss']
})
export class CaseRolesTableComponent {
  public items: Item[] = [];
  @Input() public caseDetails: CaseView;
  @Input() public showAllocateRoleLink: boolean;
  @Input() public roleCategory: RoleCategory = RoleCategory.LEGAL_OPERATIONS;

  constructor() {
  }

  private _roles: CaseRole[] = [];

  get roles(): CaseRole[] {
    return this._roles;
  }

  @Input() set roles(value: CaseRole[]) {
    this.items = value.map((role) => ({...role, open: false}));
    this._roles = value;
  }

  public queryParams(caseRole: CaseRole): any {
    return {
      caseId: this.caseDetails.case_id,
      assignmentId: caseRole.id,
      caseType: this.caseDetails.case_type.id,
      jurisdiction: this.caseDetails.case_type.jurisdiction.id,
      typeOfRole: caseRole.roleName,
      roleCategory: caseRole.roleCategory,
      actorId: caseRole.actorId
    };
  }
}
