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
  @Input() public jurisdiction: string;
  @Input() public caseType: string;

  private pHref: string;
  public ngOnChanges(): void {
    let href: string;
    if (this.caseId) {
      if (this.caseId && this.jurisdiction && this.caseType) {
        // in future required functionality, this should link to Tasks tab on Case details page
        const jurisdiction = encodeURIComponent(this.jurisdiction);
        const caseType = encodeURIComponent(this.caseType);
        const caseId = encodeURIComponent(this.caseId);
        href = `${AppConstants.CASE_DETAILS_URL}${jurisdiction}/${caseType}/${caseId}/tasks`;
      }
    }
    this.pHref = href;
  }

  public get href(): string {
    return this.pHref;
  }
}
