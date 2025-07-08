import { Component, Input, OnChanges } from '@angular/core';

import { AppConstants } from '../../../app/app.constants';

@Component({
  selector: 'exui-case-reference-field',
  templateUrl: './case-reference-field.component.html',
  styleUrls: ['case-reference-field.component.scss']
})
export class CaseReferenceFieldComponent implements OnChanges {
  /**
   * The caseReference to use for display purposes.
   */
  @Input() public caseReference: string;
  @Input() public jurisdiction: string;
  @Input() public caseType: string;

  private pHref: string;
  public ngOnChanges(): void {
    let href: string;
    if (this.caseReference) {
      // Get rid of the spaces in the caseReference.
      const caseId = this.caseReference;
      const jurisdictionId = this.jurisdiction;
      const caseTypeId = this.caseType;
      if (caseId && jurisdictionId && caseTypeId) {
        href = `${AppConstants.CASE_DETAILS_URL}${jurisdictionId}/${caseTypeId}/${caseId}`;
      }
    }
    this.pHref = href;
  }

  public get href(): string {
    return this.pHref;
  }
}
