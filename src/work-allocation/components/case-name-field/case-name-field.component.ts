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
    let jurisdictionId = this.jurisdiction;
    let caseTypeId = this.caseType;
    let caseId = this.caseId;
    if (caseId && jurisdictionId && caseTypeId) {
      jurisdictionId = encodeURIComponent(this.jurisdiction);
      caseTypeId = encodeURIComponent(this.caseType);
      caseId = encodeURIComponent(this.caseId);
      href = `${AppConstants.CASE_DETAILS_URL}${jurisdictionId}/${caseTypeId}/${caseId}`;
    }
    this.pHref = href;
  }

  public get href(): string {
    return this.pHref;
  }
}
