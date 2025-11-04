import { Component, Input, OnChanges } from '@angular/core';

import { AppConstants } from '../../../app/app.constants';

@Component({
  standalone: false,
  selector: 'exui-case-name-field',
  templateUrl: './case-name-field.component.html',
  styleUrls: ['case-name-field.component.scss']
})
export class CaseNameFieldComponent implements OnChanges {
  /**
   * The caseName to use for display purposes.
   */
  @Input() public caseName: string;
  @Input() public caseId: string;
  @Input() public jurisdiction: string;
  @Input() public caseType: string;
  @Input() public hasAccess: boolean = true;

  private pHref: string;
  public ngOnChanges(): void {
    let href: string;
    if (this.caseId) {
      if (this.caseId && this.jurisdiction && this.caseType) {
        const jurisdictionId = encodeURIComponent(this.jurisdiction);
        const caseTypeId = encodeURIComponent(this.caseType);
        const caseId = encodeURIComponent(this.caseId);
        href = `${AppConstants.CASE_DETAILS_URL}${jurisdictionId}/${caseTypeId}/${caseId}`;
      }
    }
    this.pHref = href;
  }

  public get href(): string {
    return this.pHref;
  }
}
