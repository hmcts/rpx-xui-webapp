import { Component, Input, OnInit } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { UserType } from '../../../../api/user/interfaces/user-type';
import { CaseRole } from '../../../../api/workAllocation2/interfaces/caseRole';
import { LocationInfo } from '../../../app/store/reducers/app-config.reducer';

@Component({
  selector: 'exui-roles-and-access',
  templateUrl: './roles-and-access.component.html'
})
export class RolesAndAccessComponent implements OnInit {
  public legalOps: UserType = UserType.LEGAL_OPS;
  public judicial: UserType = UserType.JUDICIAL;
  public caseId: string;

  @Input() public showAllocateRoleLink: boolean = false;
  @Input() public caseDetails: CaseView;
  @Input() public locationInfo: LocationInfo;
  @Input() public roles: CaseRole[] = [];


  public ngOnInit(): void {
    this.caseId = this.caseDetails.case_id;
  }

}
