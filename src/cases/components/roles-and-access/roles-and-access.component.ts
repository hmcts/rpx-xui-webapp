import { Component, Input } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { CaseRole } from '../../../../api/workAllocation2/interfaces/caseRole';

@Component({
  selector: 'exui-roles-and-access',
  templateUrl: './roles-and-access.component.html'
})
export class RolesAndAccessComponent {
  @Input() public caseDetails: CaseView;
  @Input() public roles: CaseRole[] = [];
}
