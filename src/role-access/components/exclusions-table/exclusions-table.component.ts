import { Component, Input } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { RoleExclusion } from '../../models';

@Component({
  selector: 'exui-exclusions-table',
  templateUrl: './exclusions-table.component.html',
  styleUrls: ['./exclusions-table.component.scss']
})
export class ExclusionsTableComponent {
  @Input() public caseDetails: CaseView;
  @Input() public exclusions: RoleExclusion [];
}
