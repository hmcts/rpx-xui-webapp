import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
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
  @Input() public roleType: string = 'legal ops';
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
}
