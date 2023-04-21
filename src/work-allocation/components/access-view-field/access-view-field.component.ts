import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exui-access-view-field',
  templateUrl: './access-view-field.component.html',
  styleUrls: ['access-view-field.component.scss']
})
export class AccessViewFieldComponent {
  /**
   * The role assignment id to use for the route
   */
  @Input() public id: string;
  @Input() public workField: any;

  constructor(private readonly router: Router) {}

  public viewRejection(): void {
    const thisRole = this.workField;
    const queryParams = {
      caseName: thisRole.case_name,
      caseReference: thisRole.case_id,
      roleCategory: thisRole.role_category,
      jurisdiction: thisRole.jurisdictionId,
      // date of role created is actually date rejected, not originally requested
      dateRejected: thisRole.dateSubmitted,
      infoRequired: thisRole.infoRequired,
      reviewer: thisRole.reviewer,
      dateSubmitted: thisRole.requestDate,
      specificAccessReason: thisRole.specificAccessReason,
      reviewerRoleCategory: thisRole.reviewerRoleCategory,
      infoRequiredComment: thisRole.infoRequiredComment,
      endDate: thisRole.endDate
    };
    this.router.navigate(['/role-access/rejected-request'], { queryParams });
  }
}
