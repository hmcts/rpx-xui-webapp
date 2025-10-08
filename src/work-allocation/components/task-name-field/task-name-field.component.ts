import { Component, Input, OnChanges } from '@angular/core';

import { AppConstants } from '../../../app/app.constants';

@Component({
  standalone: false,

  selector: 'exui-task-name-field',
  templateUrl: './task-name-field.component.html',
  styleUrls: ['task-name-field.component.scss']

})
/**
 * Note: This class currently identical to case-name-field component however
 * desired future functionality as of links to EUI-3566 require link to Tasks tab of Case details page
 */
export class TaskNameFieldComponent implements OnChanges {
  /**
   * The caseName to use for display purposes.
   */
  @Input() public taskName: string;
  @Input() public caseId: string;

  private pHref: string;
  public ngOnChanges(): void {
    let href: string;
    if (this.caseId) {
      const caseId = this.caseId;
      if (caseId) {
        const encodedCaseId = encodeURIComponent(caseId);
        href = `${AppConstants.CASE_DETAILS_URL}${encodedCaseId}/tasks`;
      }
    }
    this.pHref = href;
  }

  public get href(): string {
    return this.pHref;
  }
}
