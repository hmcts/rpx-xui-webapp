import { Component, Input, OnInit } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { LocationInfo } from 'src/app/store/reducers/app-config.reducer';
import { CaseRole } from '../../../../api/workAllocation2/interfaces/caseRole';

@Component({
  selector: 'exui-roles-and-access',
  templateUrl: './roles-and-access.component.html'
})
export class RolesAndAccessComponent implements OnInit {
  @Input() public caseDetails: CaseView;
  @Input() public locationInfo: LocationInfo;
  @Input() public roles: CaseRole[] = [];
  public caseId: string;

  public ngOnInit(): void {
    this.caseId = this.caseDetails.case_id;
  }

}
