import { Component, Input, OnChanges } from '@angular/core';

// Make the base URL for case details a constant.
// TODO: Put this somewhere more appopriate.
export const CASE_DETAILS_URL: string = '/cases/case-details/';

@Component({
  selector: 'exui-case-reference-field',
  templateUrl: './case-reference-field.component.html'
})
export class CaseReferenceFieldComponent implements OnChanges {
  /**
   * The caseReference to use for display purposes.
   */
  @Input() public caseReference: string;

  private pHref: string;
  public ngOnChanges(): void {
    let href: string;
    if (this.caseReference) {
      // Get rid of the spaces in the caseReference.
      const caseId = this.caseReference.replace(/\s/g, '');
      if (caseId) {
        href = `${CASE_DETAILS_URL}${caseId}`;
      }
    }
    this.pHref = href;
  }

  public get href(): string {
    return this.pHref;
  }
}
