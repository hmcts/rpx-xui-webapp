import { Component, Input } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { LocationInfo } from 'src/app/store/reducers/app-config.reducer';
import { UserType } from '../../../../api/user/interfaces/user-type';
import { CaseRole } from '../../../../api/workAllocation2/interfaces/caseRole';

@Component({
  selector: 'exui-roles-and-access',
  templateUrl: './roles-and-access.component.html'
})
export class RolesAndAccessComponent {
  public legalOps: UserType = UserType.LEGAL_OPS;
  public judicial: UserType = UserType.JUDICIAL;
  @Input() public showAllocateRoleLink: boolean = false;
  @Input() public caseDetails: CaseView;
  @Input() public locationInfo: LocationInfo;
  @Input() public roles: CaseRole[] = [];
}
