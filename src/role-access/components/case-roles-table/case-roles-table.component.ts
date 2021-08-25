import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { UserType } from 'api/user/interfaces/user-type';
import { Action } from '../../../role-access/models/case-role.interface';
import { CaseRole } from '../../../../api/workAllocation2/interfaces/caseRole';
import { LocationInfo } from '../../../app/store/reducers/app-config.reducer';

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
  @Input() public locationInfo: LocationInfo;
  @Input() public userType: UserType = UserType.LEGAL_OPS;
  @ViewChild('body') private tableBody: ElementRef;

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

  public getActionHref(action: Action, item: Item): string {
    return `role-access/${action.id}/${this.caseDetails.case_id}/${item.id}`;
  }
}
