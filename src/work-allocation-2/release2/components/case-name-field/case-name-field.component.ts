import { Component, Input, OnChanges } from '@angular/core';

import { AppConstants } from '../../../../app/app.constants';

@Component({
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

  private pHref: string;
  public ngOnChanges(): void {
    let href: string;
    if (this.caseId) {
      const caseId = this.caseId;
      if (caseId) {
        href = `${AppConstants.CASE_DETAILS_URL}${caseId}`;
      }
    }
    this.pHref = href;
  }

  public get href(): string {
    return this.pHref;
  }
}
