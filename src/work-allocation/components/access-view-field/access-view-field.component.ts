import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { AppConstants } from '../../../app/app.constants';

@Component({
  selector: 'exui-access-view-field',
  templateUrl: './access-view-field.component.html',
  styleUrls: ['access-view-field.component.scss']
})
export class AccessViewFieldComponent implements OnChanges {
  /**
   * The role assignment id to use for the route
   */
  @Input() public id: string;
  @Input() public role: string;
  @Input() public workField: any;

  constructor(private readonly router: Router) {}

  private pHref: string;
  public ngOnChanges(): void {
    let href: string;
    console.log(this.workField, 'workField')
    if (this.id) {
      // Get rid of the spaces in the caseReference.
      const roleId = this.id;
      if (roleId) {
        href = `/role-access/rejected-request`;
      }
    }
    this.pHref = href;
  }

  public viewRejection(): void {
    const thisRole = this.workField;
    const queryParams = {caseName: thisRole.case_name,
        caseReference: thisRole.case_id,
        roleCategory: thisRole.role_category,
        jurisdiction: thisRole.jurisdictionId,
        // date of role created is actually date rejected, not originally requested
        dateRejected: thisRole.dateSubmitted,
        infoRequired: thisRole.infoRequired,
        reviewer: thisRole.reviewer,
        dateSubmitted: thisRole.requestDate,
        specificAccessReason: thisRole.specificAccessReason};
    console.log(queryParams, 'asjfoiafo');
    this.router.navigate([`/role-access/rejected-request`], {queryParams});
  }

  public get href(): string {
    return this.pHref;
  }
}
