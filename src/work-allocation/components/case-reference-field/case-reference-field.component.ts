import {Component, Input, OnChanges} from '@angular/core';

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
    let href = undefined;
    if (this.caseReference) {
      // Get rid of the spaces in the caseReference.
      const caseId = this.caseReference.replace(/\s/g, '');
      if (caseId) {
        href = `/cases/case-details/${caseId}`;
      }
    }
    this.pHref = href;
  }

  public get href(): string {
    return this.pHref;
  }
}
