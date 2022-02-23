import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class CaseRolesTableComponent implements OnInit {
  public backUrl: string;
  public items: Item[] = [];
  @Input() public caseDetails: CaseView;
  @Input() public showAllocateRoleLink: boolean;
  @Input() public roleCategory: RoleCategory;
  public roleCategoryTitle: string;

  constructor(private readonly router: Router) {
  }

  private _roles: CaseRole[] = [];

  public get roles(): CaseRole[] {
    return this._roles;
  }

  @Input()
  public set roles(value: CaseRole[]) {
    if (value) {
      this.items = value.map((role) => ({ ...role, open: false }));
      this._roles = value;
    }
  }

  public ngOnInit(): void {
    this.backUrl = this.router.url;
    this.roleCategoryTitle = this.roleCategory === RoleCategory.JUDICIAL ? 'judicial' : (this.roleCategory === RoleCategory.ADMIN ? 'admin' : 'legal Ops');
  }

  public queryParams(caseRole: CaseRole): any {
    return {
      caseId: this.caseDetails.case_id,
      assignmentId: caseRole.id,
      caseType: this.caseDetails.case_type.id,
      jurisdiction: this.caseDetails.case_type.jurisdiction.id,
      typeOfRole: caseRole.roleId,
      roleCategory: caseRole.roleCategory,
      actorId: caseRole.actorId
    };
  }

  public openManageLink(items: Item[], item: Item): void {
    item.open = !item.open;
    for (const i of items) {
      if (i.id !== item.id) {
        i.open = false;
      }
    }
  }
}
