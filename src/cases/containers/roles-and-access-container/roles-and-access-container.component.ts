import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { CaseRole } from 'api/workAllocation2/interfaces/caseRole';

@Component({
  selector: 'exui-roles-and-access-container',
  templateUrl: './roles-and-access-container.component.html'
})
export class RolesAndAccessContainerComponent implements OnInit {
  public roles: CaseRole[] = [];
  public caseDetails: CaseView;

  constructor(private readonly route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.caseDetails = this.route.snapshot.data.case as CaseView;
    this.roles = this.route.snapshot.data.roles as CaseRole[];
  }

}
