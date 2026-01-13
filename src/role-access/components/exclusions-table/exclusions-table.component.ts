import { Component, Input } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { RoleExclusion } from '../../models';

@Component({
  standalone: false,
  selector: 'exui-exclusions-table',
  templateUrl: './exclusions-table.component.html',
  styleUrls: ['./exclusions-table.component.scss']
})
export class ExclusionsTableComponent {
  @Input() public caseDetails: CaseView;
  @Input() public exclusions: RoleExclusion [];
  @Input() public isCaseAllocator: boolean;

  public queryParams(exclusion: RoleExclusion): any {
    return {
      caseId: this.caseDetails.case_id,
      exclusionId: exclusion.id,
      caseType: this.caseDetails.case_type.id,
      jurisdiction: this.caseDetails.case_type.jurisdiction.id
    };
  }
}
